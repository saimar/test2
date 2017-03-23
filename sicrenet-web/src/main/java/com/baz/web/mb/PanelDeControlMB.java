package com.baz.web.mb;

import static com.baz.commons.util.ConstantUtil.CABECERA_FUENTE;
import static com.baz.commons.util.ConstantUtil.CABECERA_FUENTE_ESTILO;
import static com.baz.commons.util.ConstantUtil.CABECERA_PANEL_FUENTE;
import static com.baz.commons.util.ConstantUtil.CABECERA_PANEL_PROCESO;
import static com.baz.commons.util.ConstantUtil.CABECERA_PANEL_REPORTES;
import static com.baz.commons.util.ConstantUtil.CABECERA_PROCESOS;
import static com.baz.commons.util.ConstantUtil.CABECERA_REPORTES;
import static com.baz.commons.util.ConstantUtil.COMPLEMENTO_ESTATUS_FUENTE;
import static com.baz.commons.util.ConstantUtil.COMPLEMENTO_ESTATUS_PROCESO;
import static com.baz.commons.util.ConstantUtil.COMPLEMENTO_ESTATUS_REPORTES;
import static com.baz.commons.util.ConstantUtil.ESTATUS_NO_APLICA;
import static com.baz.commons.util.ConstantUtil.ETAPA_I;
import static com.baz.commons.util.ConstantUtil.FUENTEI;
import static com.baz.commons.util.ConstantUtil.FUENTEII;
import static com.baz.commons.util.ConstantUtil.FUENTEIII;
import static com.baz.commons.util.ConstantUtil.FUENTEIV;
import static com.baz.commons.util.ConstantUtil.FUENTEIX;
import static com.baz.commons.util.ConstantUtil.FUENTEV;
import static com.baz.commons.util.ConstantUtil.FUENTEVI;
import static com.baz.commons.util.ConstantUtil.FUENTEVII;
import static com.baz.commons.util.ConstantUtil.FUENTEVIII;
import static com.baz.commons.util.ConstantUtil.HEADERFASE;
import static com.baz.commons.util.ConstantUtil.TAMANO_ESTATUS_ESTILO;
import static com.baz.web.util.PanelDeControlUtil.acordionFase1;
import static com.baz.web.util.PanelDeControlUtil.acordionFase2;
import static com.baz.web.util.PanelDeControlUtil.acordionFase3;
import static com.baz.web.util.PanelDeControlUtil.acordionFase4;
import static com.baz.web.util.PanelDeControlUtil.acordionFase5;
import static com.baz.web.util.PanelDeControlUtil.acordionFase6;
import static com.baz.web.util.PanelDeControlUtil.acordionFase7;
import static com.baz.web.util.PanelDeControlUtil.acordionFase8;
import static com.baz.web.util.PanelDeControlUtil.acordionFase9;
import static com.baz.web.util.StyleUtil.getStyle;
import static com.baz.web.util.EventCedulaUtil.getEventDetalleReprocesos;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.el.ELContext;
import javax.el.ExpressionFactory;
import javax.el.MethodExpression;
import javax.faces.application.Application;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.component.UIComponent;
import javax.faces.component.html.HtmlOutputLabel;
import javax.faces.component.html.HtmlOutputText;
import javax.faces.context.FacesContext;
import org.primefaces.component.accordionpanel.AccordionPanel;
import org.primefaces.component.behavior.ajax.AjaxBehavior;
import org.primefaces.component.behavior.ajax.AjaxBehaviorListenerImpl;
import org.primefaces.component.column.Column;
import org.primefaces.component.commandlink.CommandLink;
import org.primefaces.component.fieldset.Fieldset;
import org.primefaces.component.graphicimage.GraphicImage;
import org.primefaces.component.inputtextarea.InputTextarea;
import org.primefaces.component.panel.Panel;
import org.primefaces.component.panelgrid.PanelGrid;
import org.primefaces.component.row.Row;
import org.primefaces.component.scrollpanel.ScrollPanel;
import org.primefaces.component.tabview.Tab;
import org.primefaces.context.RequestContext;
import org.primefaces.event.CellEditEvent;
import org.primefaces.event.RowEditEvent;
import org.primefaces.event.SelectEvent;

import com.baz.commons.domain.CatCedula;
import com.baz.commons.domain.CatPanelView;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.BitFuenteVO;
import com.baz.ejb.service.PanelDeControlService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name="panelControl")
@SessionScoped
public class PanelDeControlMB implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@EJB
	private PanelDeControlService panelDeControlService;
	private Date dateCorte;
	private ScrollPanel model;
	private String usuario;
	private boolean showCedula;
	private boolean showCedulaProceso;
	private List<CatCedula> listCatCedula;
	private List<BitFuenteVO> listBitFuente; 
	
	  @PostConstruct
	    public void init() {
		  RequestContext.getCurrentInstance().execute("Waiting(true, 'Cargando Información...');");
		  usuario = (String) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("username");
	      model = new ScrollPanel();
	      model.setId("panelRoot");
	      model.setRendered(true);
	      generarPanel(1L);
	      showCedula = false;
	      showCedulaProceso = false;
	    }
	  
		public PanelDeControlMB() {
		super();
		RequestContext.getCurrentInstance().execute("Waiting(false, 'Cargando Información...');");
		}

		/***
		*
		*/  
	  public void generarPanel(Long etapa){
		  System.out.println("PanelDeControlMB::generarPanel:::" + etapa);
		  switch (etapa.intValue()) {
		case 1:
			
			model.getChildren().clear();
			PanelGrid panelAll = new PanelGrid();
			panelAll.setId("idPanelGridBody");
//			HtmlOutputText htmlOutputLabel = new HtmlOutputText();
//			htmlOutputLabel.setValue("Search Template");
			
			Row rowHeaderEtapa = new Row();				
//			Column columnHeader = new Column();
//			columnHeader.setColspan(10);
//			columnHeader.getChildren().add(htmlOutputLabel);
			///
			
			Column columnEtapaFactores = new Column();
			columnEtapaFactores.setRowspan(2);
			
			columnEtapaFactores.setStyle("background: #626261; color: #FFF; " +
							"font-family: Verdana, Geneva, sans-serif;" +
							"font-size: 14px; text-align: center;");
			columnEtapaFactores.setColspan(1);
			HtmlOutputText htmlOutputLabelHeader = new HtmlOutputText();
			htmlOutputLabelHeader.setValue("Factores");
			htmlOutputLabelHeader.setStyle("background: #626261; color: #FFF; " +
					"font-family: Verdana, Geneva, sans-serif;" +
					"font-size: 14px; text-align: center;");
			columnEtapaFactores.getChildren().add(htmlOutputLabelHeader);
			
			Column columnEtapa1 = new Column();
			columnEtapa1.setColspan(3);
			columnEtapa1.setStyleClass("AcordeonAzul_2");
			columnEtapa1.setStyle("text-align: center; " + 
							"border: 1px solid rgb(37, 117, 236); " + 
							"font-family: times new roman; font-weight: bold; " + 
							"text-shadow: 2px 1px 1px Black;");
			HtmlOutputText htmlOutputLabel1 = new HtmlOutputText();
			htmlOutputLabel1.setValue("I");
			columnEtapa1.getChildren().add(htmlOutputLabel1);
			
			Column columnEtapa2 = new Column();
			columnEtapa2.setColspan(3);
			columnEtapa2.setStyleClass("AcordeonAmarillo_2");
			columnEtapa2.setStyle("text-align: center; "+
							"margin-left: -3px; border: 1px solid rgb(167, 126, 38); "+ 
							"font-family: times new roman; font-weight: bold; "+
							"text-shadow: 2px 1px 1px Black; min-width: 333px;");
			HtmlOutputText htmlOutputLabel2 = new HtmlOutputText();
			htmlOutputLabel2.setValue("II");
			columnEtapa2.getChildren().add(htmlOutputLabel2);
			
			
			Column columnEtapa3 = new Column();
			columnEtapa3.setColspan(3);
			columnEtapa3.setStyleClass("AcordeonNaranja_2");
			columnEtapa3.setStyle("text-align: center;  "+
							"margin-left: -3px; border: 1px solid rgb(182, 85, 18); "+ 
							"font-family: times new roman; font-weight: bold; "+
							"text-shadow: 2px 1px 1px Black; min-width: 332px;");
			HtmlOutputText htmlOutputLabel3 = new HtmlOutputText();
			htmlOutputLabel3.setValue("III");
			columnEtapa3.getChildren().add(htmlOutputLabel3);
						
			rowHeaderEtapa.getChildren().add(columnEtapaFactores);
			rowHeaderEtapa.getChildren().add(columnEtapa1);
			rowHeaderEtapa.getChildren().add(columnEtapa2);
			rowHeaderEtapa.getChildren().add(columnEtapa3);
			panelAll.getChildren().add(rowHeaderEtapa);
			
			Row rowFase = new Row();			
			Column columnFase1 = new Column();	
			columnFase1.setStyle("text-align: center; cursor: pointer;");
			columnFase1.setStyleClass("AcordeonAzul_1");
			CommandLink commandLink1 = new CommandLink();
			commandLink1.setUpdate(":form1:toggleable");
			commandLink1.setOnclick("Waiting(true, 'Cargando Información...');");
			commandLink1.setOncomplete("Waiting(false, 'Cargando Información...');");
			GraphicImage graphicImage1 = new GraphicImage();
			graphicImage1.setValue("../Images/PanelDeControl/F1.png");
			graphicImage1.setStyle("margin-right: 10px; width: 17px; height: 17px;");
			commandLink1.getChildren().add(graphicImage1);
			HtmlOutputLabel htmlOutputLabel1c = new HtmlOutputLabel();
			htmlOutputLabel1c.setValue("1");
			columnFase1.setColspan(1);
			columnFase1.getChildren().add(htmlOutputLabel1c);
			columnFase1.getChildren().add(commandLink1);
			
			Column columnFase2 = new Column();	
			columnFase2.setStyle("text-align: center; cursor: pointer;");
			columnFase2.setStyleClass("AcordeonAzul_2");
			CommandLink commandLink2 = new CommandLink();
			commandLink2.setUpdate(":form1:toggleable");
			
			commandLink2.setOnclick("Waiting(true, 'Cargando Información...');");
			commandLink2.setOncomplete("Waiting(false, 'Cargando Información...');");
			GraphicImage graphicImage2 = new GraphicImage();
			graphicImage2.setValue("../Images/PanelDeControl/icoAzul23.png");
			graphicImage2.setStyle("margin-right: 10px; width: 17px; height: 17px;");
			commandLink2.getChildren().add(graphicImage2);
			HtmlOutputLabel htmlOutputLabel2c = new HtmlOutputLabel();
			htmlOutputLabel2c.setValue("2");
			columnFase2.setColspan(1);
			columnFase2.getChildren().add(htmlOutputLabel2c);
			columnFase2.getChildren().add(commandLink2);
			
			Column columnFase3 = new Column();	
			columnFase3.setStyle("text-align: center; cursor: pointer;");
			columnFase3.setStyleClass("AcordeonAzul_3");
			CommandLink commandLink3 = new CommandLink();
			commandLink3.setUpdate(":form1:toggleable");
			commandLink3.setOnclick("Waiting(true, 'Cargando Información...');");
			commandLink3.setOncomplete("Waiting(false, 'Cargando Información...');");
			GraphicImage graphicImage3 = new GraphicImage();
			graphicImage3.setValue("../Images/PanelDeControl/icoAzul23.png");
			graphicImage3.setStyle("margin-right: 10px; width: 17px; height: 17px;");
			commandLink3.getChildren().add(graphicImage3);
			HtmlOutputLabel htmlOutputLabel3c = new HtmlOutputLabel();
			htmlOutputLabel3c.setValue("3");
			columnFase3.setColspan(1);
			columnFase3.getChildren().add(htmlOutputLabel3c);
			columnFase3.setColspan(1);
			columnFase3.getChildren().add(htmlOutputLabel3c);
			columnFase3.getChildren().add(commandLink3);
			
			Column columnFase4 = new Column();
			columnFase4.setStyle("text-align: center; cursor: pointer;");
			columnFase4.setStyleClass("AcordeonAmarillo_1");
			CommandLink commandLink4 = new CommandLink();
			commandLink4.setUpdate(":form1:toggleable");
			commandLink4.setOnclick("Waiting(true, 'Cargando Información...');");
			commandLink4.setOncomplete("Waiting(false, 'Cargando Información...');");
			GraphicImage graphicImage4 = new GraphicImage();
			graphicImage4.setValue("../Images/PanelDeControl/F4.png");
			graphicImage4.setStyle("margin-right: 10px; width: 17px; height: 17px;");
			commandLink4.getChildren().add(graphicImage4);
			HtmlOutputLabel htmlOutputLabel4c = new HtmlOutputLabel();
			htmlOutputLabel4c.setValue("4");
			columnFase4.setColspan(1);
			columnFase4.getChildren().add(htmlOutputLabel4c);
			columnFase4.getChildren().add(commandLink4);
			
			Column columnFase5 = new Column();			
			columnFase5.setStyle("text-align: center; cursor: pointer;");
			columnFase5.setStyleClass("AcordeonAmarillo_2");
			CommandLink commandLink5 = new CommandLink();
			commandLink5.setUpdate(":form1:toggleable");
			commandLink5.setOnclick("Waiting(true, 'Cargando Información...');");
			commandLink5.setOncomplete("Waiting(false, 'Cargando Información...');");
			GraphicImage graphicImage5 = new GraphicImage();
			graphicImage5.setValue("../Images/PanelDeControl/icoAmarillo23.png");
			graphicImage5.setStyle("margin-right: 10px; width: 17px; height: 17px;");
			commandLink5.getChildren().add(graphicImage5);
			HtmlOutputLabel htmlOutputLabel5c = new HtmlOutputLabel();
			htmlOutputLabel5c.setValue("5");
			columnFase5.setColspan(1);
			columnFase5.getChildren().add(htmlOutputLabel5c);
			columnFase5.getChildren().add(commandLink5);
			
			Column columnFase6 = new Column();			
			columnFase6.setStyle("text-align: center; cursor: pointer;");
			columnFase6.setStyleClass("AcordeonAmarillo_3");
			CommandLink commandLink6 = new CommandLink();
			commandLink6.setUpdate(":form1:toggleable");
			commandLink6.setOnclick("Waiting(true, 'Cargando Información...');");
			commandLink6.setOncomplete("Waiting(false, 'Cargando Información...');");
			GraphicImage graphicImage6 = new GraphicImage();
			graphicImage6.setValue("../Images/PanelDeControl/icoAmarillo23.png");
			graphicImage6.setStyle("margin-right: 10px; width: 17px; height: 17px;");
			commandLink6.getChildren().add(graphicImage6);
			HtmlOutputLabel htmlOutputLabel6c = new HtmlOutputLabel();
			htmlOutputLabel6c.setValue("6");
			columnFase6.setColspan(1);
			columnFase6.getChildren().add(htmlOutputLabel6c);
			columnFase6.getChildren().add(commandLink6);
			
			Column columnFase7 = new Column();	
			columnFase7.setStyle("text-align: center; cursor: pointer;");
			columnFase7.setStyleClass("AcordeonNaranja_1");
			CommandLink commandLink7 = new CommandLink();
			commandLink7.setUpdate(":form1:toggleable");
			commandLink7.setOnclick("Waiting(true, 'Cargando Información...');");
			commandLink7.setOncomplete("Waiting(false, 'Cargando Información...');");
			GraphicImage graphicImage7 = new GraphicImage();
			graphicImage7.setValue("../Images/PanelDeControl/F7.png");
			graphicImage7.setStyle("margin-right: 10px; width: 17px; height: 17px;");
			commandLink7.getChildren().add(graphicImage7);
			HtmlOutputLabel htmlOutputLabel7c = new HtmlOutputLabel();
			htmlOutputLabel7c.setValue("7");
			columnFase7.setColspan(1);
			columnFase7.getChildren().add(htmlOutputLabel7c);
			columnFase7.getChildren().add(commandLink7);
			
			Column columnFase8 = new Column();
			columnFase8.setStyle("text-align: center; cursor: pointer;");
			columnFase8.setStyleClass("AcordeonNaranja_2");
			CommandLink commandLink8 = new CommandLink();
			commandLink8.setUpdate(":form1:toggleable");
			commandLink8.setOnclick("Waiting(true, 'Cargando Información...');");
			commandLink8.setOncomplete("Waiting(false, 'Cargando Información...');");
			GraphicImage graphicImage8 = new GraphicImage();
			graphicImage8.setValue("../Images/PanelDeControl/icoNaranja23.png");
			graphicImage8.setStyle("margin-right: 10px; width: 17px; height: 17px;");
			commandLink8.getChildren().add(graphicImage8);
			HtmlOutputLabel htmlOutputLabel8c = new HtmlOutputLabel();
			htmlOutputLabel8c.setValue("8");
			columnFase8.setColspan(1);
			columnFase8.getChildren().add(htmlOutputLabel8c);
			columnFase8.getChildren().add(commandLink8);
			
			Column columnFase9 = new Column();
			columnFase9.setStyle("text-align: center; cursor: pointer;");
			columnFase9.setStyleClass("AcordeonNaranja_3");
			CommandLink commandLink9 = new CommandLink();
			commandLink9.setUpdate(":form1:toggleable");
			commandLink9.setOnclick("Waiting(true, 'Cargando Información...');");
			commandLink9.setOncomplete("Waiting(false, 'Cargando Información...');");
			GraphicImage graphicImage9 = new GraphicImage();
			graphicImage9.setValue("../Images/PanelDeControl/icoNaranja23.png");
			graphicImage9.setStyle("margin-right: 10px; width: 17px; height: 17px;");
			commandLink9.getChildren().add(graphicImage9);
			HtmlOutputLabel htmlOutputLabel9 = new HtmlOutputLabel();
			htmlOutputLabel9.setValue("9");
			columnFase9.setColspan(1);
			columnFase9.getChildren().add(htmlOutputLabel9);
			columnFase9.getChildren().add(commandLink9);
			
			rowFase.getChildren().add(columnFase1);
			rowFase.getChildren().add(columnFase2);
			rowFase.getChildren().add(columnFase3);
			rowFase.getChildren().add(columnFase4);
			rowFase.getChildren().add(columnFase5);
			rowFase.getChildren().add(columnFase6);
			rowFase.getChildren().add(columnFase7);
			rowFase.getChildren().add(columnFase8);
			rowFase.getChildren().add(columnFase9);
			panelAll.getChildren().add(rowFase);
//			rowHeader.getChildren().add(columnHeader);
//			panelAll.getFacets().put("header" , rowHeader);
//			panelGridCartera.getChildren().add(0,row);
//			panelAll.getChildren().addAll(((PanelGrid) FacesContext.getCurrentInstance().getViewRoot().findComponent(":form1:idPanelGridAll")) .getChildren());
//			panelAll = (PanelGrid) FacesContext.getCurrentInstance().getViewRoot().findComponent(":form1:idPanelGridAll") ;
//			panelAll.setId("idPanelGridAll");
		for( int h = 1 ; h <= 3 ; h++ ){
			List<CatPanelView> listPanelView = 

			new ArrayList<CatPanelView>();
			try{
			listPanelView = 
					panelDeControlService.obtenerEtapaUno(usuario, etapa.intValue(), h, 0, dateCorte);
			}catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
			}

			PanelGrid panelGridCartera = new PanelGrid();
			panelGridCartera.setId("idPanelGridCartera" + h);
//			panelGridCartera.setColumns(10);

		    	System.out.println("dentro del if mb::::");
		    	int idTemp = 0;
		    	for(CatPanelView catPanel : listPanelView){
					System.out.println("primer for mb::::" + catPanel.getNombre());
					
					if(null != catPanel.getNombre() && !"".equals(catPanel.getNombre().trim()) ){
						Row rowCartera = new Row();
						List<CatPanelView> listTemp = filterByIdAgrupador(catPanel.getIdAgrupador(), listPanelView);
						listTemp.add(0, listTemp.get(0));
						idTemp++;
					for (int i = 0; i < 10; i++) {
						Column columnCartera = new Column();
						System.out.println("segundo for mb1::::");		
						if( i < 4){
							System.out.println("segundo for mb before" +  listTemp.size());	
							catPanel = listTemp.get(i);
							System.out.println("segundo for mb after" + catPanel.getIdFuente());
							
						}
				System.out.println("segundo for mb::::");
				Fieldset fielSetCartera = new Fieldset();
				fielSetCartera.setId("fielSet" + i + "" + idTemp + h);
				fielSetCartera.setToggleable(i >= 1 && i <= 3 ? true : false);
				catPanel.setClase(catPanel.getClase() == null ||
						"".equals(catPanel.getClase().trim())? "EstatusGris" : catPanel.getClase());
				fielSetCartera.setStyleClass(i < 1 ? CABECERA_FUENTE: i >= 1 && i <= 3 ?
						catPanel.getClase() + COMPLEMENTO_ESTATUS_FUENTE : ESTATUS_NO_APLICA );
				fielSetCartera.setCollapsed(true);
				fielSetCartera.setToggleSpeed(600);
				fielSetCartera.setRendered(true);
				if(i == 2)
				fielSetCartera.addClientBehavior("toggle", getEventDetalleReprocesos(1L, 1));

				fielSetCartera.setLegend(i< 1 ? catPanel.getNombre() : "");
//				fielSetCartera.set
				///
//				AjaxBehavior ajax = new AjaxBehavior();
//				ajax.setOnstart("withDinamic()");
//				fielSetCartera.addClientBehavior("click", ajax);

				PanelGrid panelInternal = new PanelGrid();
				panelInternal.setColumnClasses("custom ui-panelgrid td");
				panelInternal.setId("panelInternal" + i + "" + idTemp + h);
				panelInternal.setColumns(2);
				
				System.out.println("clases del panel grid interno:::::" + panelInternal.getColumnClasses());
				HtmlOutputText outText = new HtmlOutputText();
				outText.setValue("Test1");
				outText.setId("outText"+i +"" + idTemp+h);
			
				panelInternal.getChildren().add(catPanel.getIdFace() == 1 
						? acordionFase1(etapa, catPanel, fielSetCartera.getId() ) : catPanel.getIdFace() == 2 
						? acordionFase2() : catPanel.getIdFace() == 3 
						? acordionFase3() : outText);
				fielSetCartera.getChildren().add(i >= 1 && i <= 3 ? panelInternal : outText);
//				panelGridCartera.getChildren().add(fielSetCartera);
				columnCartera.getChildren().add(fielSetCartera);
				rowCartera.getChildren().add(columnCartera);
				
				System.out.println("fin del segundo for mb::::"+catPanel.getIdFace() );
				
			}
					System.out.println("!!!!!!1");
					panelGridCartera.getChildren().add(rowCartera);
		    }
					System.out.println("!!!!!!2");
		    }
		   	System.out.println("!!!!!!3");
		    Panel modelCartera = new Panel();
		    modelCartera.setId("idPanelFuente" + h);
			modelCartera.setHeader(h == 1 ? FUENTEI : h == 2 ? FUENTEII : FUENTEIII);
			modelCartera.setStyleClass(CABECERA_PANEL_FUENTE);
			modelCartera.setRendered(true);
			
			//Implementacion de la nueva cabecera
			Row row = new Row();				
			Column column = new Column();
			column.setColspan(10);
			column.getChildren().add(modelCartera);
			row.getChildren().add(column);
			panelGridCartera.getChildren().add(0,row);
			panelGridCartera.setRendered(true);

			
			panelGridCartera.setColumnClasses("ui-panelgrid td");
//			panelGridCartera.setStyleClass("ui-panelgrid-blank");
			panelGridCartera.setStyleClass("ui-panel-grid-cartera");
			System.out.println("clases del panel grid cartera:::::" + panelGridCartera.getColumnClasses());
		    modelCartera.getChildren().add(panelGridCartera);
		    
		    
		    model.setStyleClass("customPanel ui-widget-header-fuente");
		    model.setRendered(true);
//			model.getChildren().add(modelCartera);
//			model.getChildren().add(panelGridCartera);
			
		    panelAll.setColumnClasses("ui-panelgrid td");
//			panelGridCartera.setStyleClass("ui-panelgrid-blank");
			panelAll.setStyleClass("ui-panel-grid-cartera");
			panelAll.getChildren().addAll(panelGridCartera.getChildren());
		}
		model.getChildren().add(panelAll);
			break;  
			
			case 2:
				
				model.getChildren().clear();
				for( int h = 1 ; h <= 3 ; h++ ){
					List<CatPanelView> listPanelView = 

					new ArrayList<CatPanelView>();
					try{
					listPanelView = 
							panelDeControlService.obtenerEtapaUno(usuario, etapa.intValue(), h, 0, dateCorte);
					}catch (ExcepcionSicrenet e) {
						MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
					}

					PanelGrid panelGridCartera = new PanelGrid();
					panelGridCartera.setColumns(10);

//					for(int j = 0 ; j < listPanelView.size() ; j++){
//						CatPanelView catPanel = listPanelView.get(j);
				    	System.out.println("dentro del if mb::::");
				    	int idTemp = 0;
				    	for(CatPanelView catPanel : listPanelView){
							System.out.println("primer for mb::::" + catPanel.getNombre());
							
							if(null != catPanel.getNombre() && !"".equals(catPanel.getNombre().trim()) ){
							 
								List<CatPanelView> listTemp = filterByIdAgrupador(catPanel.getIdAgrupador(), listPanelView);
								listTemp.add(0, listTemp.get(0));
								
							for (int i = 0; i < 10; i++) {
								idTemp++;
								if( i < 7)
									catPanel = listTemp.get(i);
						System.out.println("segundo for mb::::");
						Fieldset fielSetCartera = new Fieldset();
						fielSetCartera.setId("fielSet" + i + "" + idTemp + "" + h);
						fielSetCartera.setToggleable(i >= 4 && i <= 6 ? true : false);
						catPanel.setClase(catPanel.getClase() == null ||
								"".equals(catPanel.getClase().trim())? "EstatusGris" : catPanel.getClase());
						fielSetCartera.setStyleClass(i < 1 ? CABECERA_PROCESOS: i >= 1 && i <= 6 ?
								catPanel.getClase() + COMPLEMENTO_ESTATUS_PROCESO : ESTATUS_NO_APLICA );
						fielSetCartera.setCollapsed(true);
						fielSetCartera.setToggleSpeed(600);
						fielSetCartera.setRendered(true);
						fielSetCartera.setLegend(i< 1 ? catPanel.getNombre() : "");
						
						PanelGrid panelInternal = new PanelGrid();
						panelInternal.setId("panelInternal" + i + "" + idTemp + "" + h);
						panelInternal.setColumns(1);
						
						HtmlOutputText outText = new HtmlOutputText();
						outText.setValue("Test1");
						outText.setId("outText"+i +"" + idTemp + "" + h);
					
						panelInternal.getChildren().add(catPanel.getIdFace() == 4 
								? acordionFase4(etapa,catPanel) : catPanel.getIdFace() == 5
								? acordionFase5(catPanel) : catPanel.getIdFace() == 6 
								? acordionFase6(catPanel) : outText);
						fielSetCartera.getChildren().add(i >= 4 && i <= 6 ? panelInternal : outText);
						fielSetCartera.addClientBehavior("toggle", getEvent(etapa, catPanel, fielSetCartera.getId()));
						panelGridCartera.getChildren().add(fielSetCartera);
						System.out.println("fin del segundo for mb::::"+catPanel.getIdFace() );
						
					}
				    }
				    }
				    Panel modelCartera = new Panel();
				    modelCartera.setId("child" + h);
					modelCartera.setHeader(h == 1 ? FUENTEIV : h == 2 ? FUENTEV : FUENTEVI);
					modelCartera.setStyleClass(CABECERA_PANEL_PROCESO);
				    modelCartera.getChildren().add(panelGridCartera);
				    model.setStyleClass("customPanel ui-widget-header-proceso");
					model.getChildren().add(modelCartera);
						
				}
			break;
			case 3:
				model.getChildren().clear();
				for( int h = 1 ; h <= 3 ; h++ ){
					List<CatPanelView> listPanelView = 

					new ArrayList<CatPanelView>();
					try{
					listPanelView = 
							panelDeControlService.obtenerEtapaUno(usuario, etapa.intValue(), h, 0, dateCorte);
					System.out.println("valor de la lista Etapa 3:::" + listPanelView.size());
					}catch (ExcepcionSicrenet e) {
						MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
					}

					PanelGrid panelGridCartera = new PanelGrid();
					panelGridCartera.setColumns(10);

//					for(int j = 0 ; j < listPanelView.size() ; j++){
//						CatPanelView catPanel = listPanelView.get(j);
				    	System.out.println("dentro del if mb::::");
				    	int idTemp = 0;
				    	for(CatPanelView catPanel : listPanelView){
							System.out.println("primer for mb::::" + catPanel.getNombre());
							
							if(null != catPanel.getNombre() && !"".equals(catPanel.getNombre().trim()) ){
							 
								List<CatPanelView> listTemp = filterByIdAgrupador(catPanel.getIdAgrupador(), listPanelView);
								listTemp.add(0, listTemp.get(0));
								
							for (int i = 0; i < 10; i++) {
								idTemp++;
								if( i < 9)
									catPanel = listTemp.get(i);
						System.out.println("segundo for mb::::");
						Fieldset fielSetCartera = new Fieldset();
						fielSetCartera.setId("fielSet" + i + "" + idTemp + "" + h);
						fielSetCartera.setToggleable(i >= 7 && i <= 9 ? true : false);
						catPanel.setClase(catPanel.getClase() == null ||
								"".equals(catPanel.getClase().trim())? "EstatusGris" : catPanel.getClase());
						fielSetCartera.setStyleClass(i < 1 ? CABECERA_REPORTES: i >= 1 && i <= 9 ?
								catPanel.getClase() + COMPLEMENTO_ESTATUS_REPORTES : ESTATUS_NO_APLICA );
						fielSetCartera.setCollapsed(true);
						fielSetCartera.setToggleSpeed(600);
						fielSetCartera.setRendered(true);
						fielSetCartera.setLegend(i< 1 ? catPanel.getNombre() : "");
						
						PanelGrid panelInternal = new PanelGrid();
						panelInternal.setId("panelInternal" + i + "" + idTemp + "" + h);
						panelInternal.setColumns(1);
						
						HtmlOutputText outText = new HtmlOutputText();
						outText.setValue("Test1");
						outText.setId("outText"+i +"" + idTemp + "" + h);
					
						panelInternal.getChildren().add(catPanel.getIdFace() == 7 
								? acordionFase7(catPanel) : catPanel.getIdFace() == 8
								? acordionFase8(catPanel) : catPanel.getIdFace() == 9 
								? acordionFase9(catPanel) : outText);
						fielSetCartera.getChildren().add(i >= 7 && i <= 9 ? panelInternal : outText);
						fielSetCartera.addClientBehavior("toggle", getEvent(etapa, catPanel, fielSetCartera.getId()));
						panelGridCartera.getChildren().add(fielSetCartera);
						System.out.println("fin del segundo for mb::::"+catPanel.getIdFace() );
						
					}
				    }
				    }
				    Panel modelCartera = new Panel();
				    modelCartera.setId("child" + h);
					modelCartera.setHeader(h == 1 ? FUENTEVII : h == 2 ? FUENTEVIII : FUENTEIX);
					modelCartera.setStyleClass(CABECERA_PANEL_REPORTES);
				    modelCartera.getChildren().add(panelGridCartera);
				    model.setStyleClass("customPanel ui-widget-header-proceso");
//				    model.setStyleClass(CABECERA_PANEL_REPORTES);
					model.getChildren().add(modelCartera);
					
				}
			break;
		    
			default:
			break;
		}
		  
	  }
	  
		/***
		*
		*/
	public List<CatPanelView> filterByIdAgrupador(int id, List<CatPanelView> listFull) {
		ArrayList<CatPanelView> lista = new ArrayList<CatPanelView>();
		for (int i = 0; i < listFull.size(); i++) {
			CatPanelView catTemp =  listFull.get(i);
			if (id == catTemp.getIdAgrupador()) {
				lista.add(catTemp);
			}
		}
		return lista;
	}
	
	/***
	*
	*/
	public AjaxBehavior getEvent(Long etapa, CatPanelView catPanelEl, String idComponent){
		
		 System.out.println("Valor del parametro:::getEvent::::" + idComponent);
	      FacesContext context = FacesContext.getCurrentInstance();
	      ELContext elContext = context.getELContext();
	      Application app = context.getApplication();
	      ExpressionFactory expressionFactory = app.getExpressionFactory();
		
		  AjaxBehavior ajax = new AjaxBehavior();
		  ajax.setAsync(true);
//		  ajax.setUpdate(":form1:toggleable");
//		  ajax.setUpdate(etapa.intValue() == 4 ? ":form1:" + idComponent.substring(22,idComponent.indexOf("X")): ":form1:toggleable");
		  ajax.setUpdate(etapa.intValue() == 4 ? ":form1:" + idComponent.replace("X", ":"): ":form1:toggleable");
		  MethodExpression ex = expressionFactory.
				  createMethodExpression(elContext, "#{panelControl.executeFielSet(" + etapa + "," +catPanelEl.getIdFace()+",\""+idComponent+"\")}", null, 
						  new Class[]{Long.class, Long.class, String.class});
		  ajax.addAjaxBehaviorListener(new AjaxBehaviorListenerImpl(ex, ex));
		  ajax.setOnstart("Waiting(true, 'Cargando Información...')");
		  ajax.setOncomplete("Waiting(false, 'Cargando Información...')");
		  		  
		  return ajax;
	}
	
	public void executeFielSet(Long etapa, Long id, String idComponent) {
		RequestContext.getCurrentInstance().execute("Waiting(true, 'Cargando Información...')");	
		System.out.println("validar:::" + id + ":::idNumber::::" + idComponent);
		Fieldset fielsetTem = (Fieldset) FacesContext.getCurrentInstance().getViewRoot()
				.findComponent("form1:" + idComponent);

		if (etapa.intValue() == 2) {
			
			System.out.println("tamaño de la lista PanelII:::" + fielsetTem.getChildren().get(0).getChildren().size());
			if (fielsetTem.getChildren().get(0).getChildren().size() <= 1)
				fielsetTem.getChildren().get(0).getChildren().add(obtenerCarteras(etapa, id, idComponent));

		} else if(etapa.intValue() == 3) {

			System.out.println("tamaño de la lista PanelIII:::" + fielsetTem.getChildren().get(0).getChildren().size());
			if (fielsetTem.getChildren().get(0).getChildren().size() <= 1)
				fielsetTem.getChildren().get(0).getChildren().add(obtenerMetodologias(id, idComponent));
			
		}else if(etapa.intValue() == 4){
					fielsetTem = (Fieldset) FacesContext.getCurrentInstance().getViewRoot()
					.findComponent("form1:" + idComponent.replace("X", ":"));
			System.out.println("tamaño de la lista PanelII:::" + fielsetTem.getChildren().size());
			if (fielsetTem.getChildren().size() == 1)
				fielsetTem.getChildren().add(obtenerCarteras(etapa,id, idComponent));
		}
		RequestContext.getCurrentInstance().execute("Waiting(false, 'Cargando Información...')");	
	}
	
	/***
	*
	*/
	public UIComponent obtenerCarteras(Long etapa, Long idProceso, String idComponent){
		
		List<CatPanelView> listPanelView = 
		new ArrayList<CatPanelView>();
		
		try{
		listPanelView = 
				panelDeControlService.obtenerEtapaUno(usuario, 1, 1, idProceso.intValue(), dateCorte);
		}catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

		PanelGrid panelGridCartera = new PanelGrid();
		panelGridCartera.setId(idComponent + "PanelGridCartera");
		panelGridCartera.setColumns(4);

	    	System.out.println("dentro del if mb::::");
	    	int idTemp = 0;
	    	for(CatPanelView catPanel : listPanelView){
				System.out.println("primer for mb::::" + catPanel.getNombre());
				
				if(null != catPanel.getNombre() && !"".equals(catPanel.getNombre().trim()) ){
				 
					List<CatPanelView> listTemp = filterByIdAgrupador(catPanel.getIdAgrupador(), listPanelView);
					listTemp.add(0, listTemp.get(0));
				
				for (int i = 0; i < 4; i++) {
					idTemp++;
					if( i < 4)
						catPanel = listTemp.get(i);
			System.out.println("segundo for mb::::");

			Column fielSetCartera = new Column();
			fielSetCartera.setId(idComponent + "fielSet" + i + "" + idTemp);

			catPanel.setClase(catPanel.getClase() == null ||
					"".equals(catPanel.getClase().trim())? "EstatusGris" : catPanel.getClase());
			catPanel.setEstatus(catPanel.getEstatus() == null || "".equals(catPanel.getEstatus().trim()) 
					? "NO INICIADO" : catPanel.getEstatus() );

			fielSetCartera.setRendered(true);

			PanelGrid panelInternal = new PanelGrid();
			panelInternal.setId(idComponent + "panelInternal" + i + "" + idTemp );
			panelInternal.setColumns(1);
			
			HtmlOutputText outText = new HtmlOutputText();
			outText.setValue(i< 1 ? catPanel.getNombre() : catPanel.getEstatus());
			outText.setId(idComponent + "outText"+i +"" + idTemp);
			
			InputTextarea inputTextArea = new InputTextarea ();
			inputTextArea.setValue(i< 1 ? catPanel.getNombre() : "");
			inputTextArea.setId(idComponent + "inputTextArea"+i +"" + idTemp);
			inputTextArea.setDisabled(false);
			inputTextArea.setReadonly(true);
			inputTextArea.setStyle(getStyle(i< 1 ? "EstatusAzul" : catPanel.getClase()));
			inputTextArea.setStyle(inputTextArea.getStyle() + (i == 0 ? CABECERA_FUENTE_ESTILO : TAMANO_ESTATUS_ESTILO));

			fielSetCartera.getChildren().add(inputTextArea);
			
			panelGridCartera.getChildren().add(fielSetCartera);
			
			System.out.println("fin del segundo for mb::::"+catPanel.getIdFace() );
			
		}
	    }
	    }
	    Panel modelCartera = new Panel();
	    modelCartera.setId(idComponent +"Panel");
		modelCartera.setHeader(FUENTEI);
//		modelCartera.setStyleClass("customPanelFuente ui-widget-header");		
		panelGridCartera.setRendered(true);
	    modelCartera.getChildren().add(panelGridCartera);
	    modelCartera.setRendered(true);
	    
		AccordionPanel accordionPanel = new AccordionPanel();

		Tab tab = new Tab();
		tab.setTitle(FUENTEI);
		tab.setTitleStyle(HEADERFASE);
		tab.setClosable(true);
		tab.getChildren().add(panelGridCartera);
		accordionPanel.getChildren().add(tab);
		
	    UIComponent component = etapa.intValue() == 4 ? accordionPanel : accordionPanel;
		
	    return component;
	}
	
	/***
	*
	*/
	public AccordionPanel obtenerMetodologias(Long idProceso, String idComponent){		

			List<CatPanelView> listPanelView = new ArrayList<CatPanelView>();
			try{
			listPanelView = 
					panelDeControlService.obtenerEtapaUno(usuario, 2, 2, idProceso.intValue(), dateCorte);
			}catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
			}
			AccordionPanel accordionPanel = new AccordionPanel();
			accordionPanel.setId("accordionPanelEtapaIII" + idComponent);
			PanelGrid panelGridCartera = new PanelGrid();
			panelGridCartera.setColumns(7);
			panelGridCartera.setId("panelGridCartera" + 0 + "" + 4);
//			for(int j = 0 ; j < listPanelView.size() ; j++){
//				CatPanelView catPanel = listPanelView.get(j);
		    	System.out.println("dentro del if mb::::");
		    	int idTemp = 0;
		    	for(CatPanelView catPanel : listPanelView){
					System.out.println("primer for mb::::" + catPanel.getNombre());
					
					if(null != catPanel.getNombre() && !"".equals(catPanel.getNombre().trim()) ){
					 
						List<CatPanelView> listTemp = filterByIdAgrupador(catPanel.getIdAgrupador(), listPanelView);
						listTemp.add(0, listTemp.get(0));
						
					for (int i = 0; i < 7; i++) {
						
						idTemp++;
						
						if( i < 7 ) catPanel = listTemp.get(i);
						
				System.out.println("segundo for mb::::");
				Fieldset fielSetCartera = new Fieldset();
				fielSetCartera.setId("fielSet" + i + "" + idTemp + "" + 4);
				fielSetCartera.setToggleable(i == 0 ? true : false);
				catPanel.setClase(catPanel.getClase() == null ||
						"".equals(catPanel.getClase().trim())? "EstatusGris" : catPanel.getClase());
				fielSetCartera.setStyleClass(i < 1 ? CABECERA_PROCESOS: i >= 1 && i <= 6 ?
						catPanel.getClase() + COMPLEMENTO_ESTATUS_PROCESO : ESTATUS_NO_APLICA );
				fielSetCartera.setCollapsed(true);
				fielSetCartera.setToggleSpeed(600);
				fielSetCartera.setRendered(true);
				fielSetCartera.setLegend(i< 1 ? catPanel.getNombre() : "");
				fielSetCartera.addClientBehavior("toggle", getEvent(4L, catPanel,accordionPanel.getId()+"X"+ fielSetCartera.getId()));
				System.out.println("valor del id buscado::::::::::::::::::::::::::::::::::::::::::::" + accordionPanel.getId()+"?"+ fielSetCartera.getId());
				PanelGrid panelInternal = new PanelGrid();
				panelInternal.setId("panelInternal" + i + "" + idTemp + "" + 2);
				panelInternal.setColumns(1);
				
				HtmlOutputText outText = new HtmlOutputText();
				outText.setValue(" ");
				outText.setId("outText"+i +"" + idTemp + "" + 2);
			
				panelInternal.getChildren().add(outText);
				fielSetCartera.getChildren().add(i >= 4 && i <= 6 ? panelInternal : outText);
				
				InputTextarea inputTextArea = new InputTextarea ();
				inputTextArea.setValue(i< 1 ? catPanel.getNombre() : "");
				inputTextArea.setId(idComponent + "inputTextArea"+i +"" + idTemp);
				inputTextArea.setDisabled(false);
				inputTextArea.setReadonly(true);
				inputTextArea.setStyle(getStyle(i< 1 ? "EstatusAzul" : catPanel.getClase()));
				inputTextArea.setStyle(inputTextArea.getStyle() + (i == 0 ? CABECERA_FUENTE_ESTILO : TAMANO_ESTATUS_ESTILO));
//				fielSetCartera.addClientBehavior("toggle", getEvent(2L, catPanel, fielSetCartera.getId()));
				panelGridCartera.getChildren().add(i == 0 ? fielSetCartera : inputTextArea);
				System.out.println("fin del segundo for mb::::"+catPanel.getIdFace() );
				
			}
		    }
		    }
		    Panel modelCartera = new Panel();
		    modelCartera.setId("child" + 2);
			modelCartera.setHeader(FUENTEIV);
			modelCartera.setStyleClass(CABECERA_PANEL_PROCESO);
		    modelCartera.getChildren().add(panelGridCartera);
//		    model.setStyleClass("customPanel ui-widget-header-proceso");
//			model.getChildren().add(modelCartera);
			
//		}
		Tab tab = new Tab();
		tab.setTitle(FUENTEII);
		tab.setTitleStyle(HEADERFASE);
		tab.setClosable(true);
		tab.getChildren().add(panelGridCartera);
		accordionPanel.getChildren().add(tab);
	    return accordionPanel;
	}
	
	public void executeCarga(String idComponent){
		System.out.println("se ejecuta la carga:::::" );
		try{			
//			panelDeControlService.realizarCarga();
			Fieldset fielSetCartera  = (Fieldset) FacesContext.getCurrentInstance().getViewRoot().findComponent(":form1:" + idComponent);
			fielSetCartera.setStyleClass("EstatusAmarillo" + COMPLEMENTO_ESTATUS_FUENTE );
			
		}catch (Exception e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
	}
	}

	public void obtenerAgenda(){
		try{
			listCatCedula = panelDeControlService.obtenerAgenda(2, 0);
		}catch (Exception e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}
	
	   public void onRowCancel(RowEditEvent event) {
	        FacesMessage msg = new FacesMessage("Edit Cancelled", ((CatCedula) event.getObject()).getIdSistema().toString());
	        FacesContext.getCurrentInstance().addMessage(null, msg);
	    }
	     
	    public void onCellEdit(CellEditEvent event) {
	        Object oldValue = event.getOldValue();
	        Object newValue = event.getNewValue();
	         
	        if(newValue != null && !newValue.equals(oldValue)) {
	            FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_INFO, "Cell Changed", "Old: " + oldValue + ", New:" + newValue);
	            FacesContext.getCurrentInstance().addMessage(null, msg);
	        } 
	   }
	    
	public void obtenerDetalleReproceso(Long idFuente){
			try{
			listBitFuente = panelDeControlService.obtenerDetalleReproceso(1, idFuente.intValue());
		    }catch (Exception e) {

		}
	}
	public ScrollPanel getModel() {
		return model;
	}

	public void setModel(ScrollPanel model) {
		this.model = model;
	}

	private String fechaCorte;
	
	public Date getDateCorte() {
		return dateCorte;
	}

	public void setDateCorte(Date dateCorte) {
		this.dateCorte = dateCorte;
	}

	public String getFechaCorte() {
		return fechaCorte;
	}

	public void setFechaCorte(String fechaCorte) {
		this.fechaCorte = fechaCorte;
	}
	public void timeframeEndChanged(SelectEvent event) {
	    dateCorte = (Date)event.getObject();
	    generarPanel(1L);
	}

	public boolean isShowCedula() {
		return showCedula;
	}

	public void setShowCedula(boolean showCedula) {
		this.showCedula = showCedula;
	}

	public boolean isShowCedulaProceso() {
		return showCedulaProceso;
	}

	public void setShowCedulaProceso(boolean showCedulaProceso) {
		this.showCedulaProceso = showCedulaProceso;
	}

	public List<CatCedula> getListCatCedula() {
		return listCatCedula;
	}

	public void setListCatCedula(List<CatCedula> listCatCedula) {
		this.listCatCedula = listCatCedula;
	}

	public List<BitFuenteVO> getListBitFuente() {
		return listBitFuente;
	}

	public void setListBitFuente(List<BitFuenteVO> listBitFuente) {
		this.listBitFuente = listBitFuente;
	}
	
	
}
