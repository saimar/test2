package com.baz.web.util;

import static com.baz.commons.util.ConstantUtil.CLASS_BUTTON;
import static com.baz.commons.util.ConstantUtil.HEADERFASE;
import static com.baz.web.util.EventCedulaUtil.getEventCedulaFuente;
import static com.baz.web.util.EventCedulaUtil.getEventCedulaProceso;
import static com.baz.web.util.EventCedulaUtil.getEventCedulaFuenteCarga;

import org.primefaces.component.accordionpanel.AccordionPanel;
import org.primefaces.component.button.Button;
import org.primefaces.component.commandbutton.CommandButton;
import org.primefaces.component.panelgrid.PanelGrid;
import org.primefaces.component.tabview.Tab;

import com.baz.commons.domain.CatPanelView;

public class PanelDeControlUtil {
	
	public static  AccordionPanel acordionFase1(Long etapa, CatPanelView catPanelView, String idComponent) {

		AccordionPanel accordionPanel = new AccordionPanel();
		
//		accordionPanel.setStyleClass("custom ui-widget-header");
		Tab tab = new Tab();
		tab.setTitle("CONTROL DE CARGA");
//		tab.setTitleStyleClass("custom ui-widget-header");
		tab.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion = new PanelGrid();
		panelInternalAcordion.setColumns(1);
		CommandButton button = new CommandButton();
		button.setValue("Iniciar");
		button.addClientBehavior("click", getEventCedulaFuenteCarga(idComponent));
		button.setProcess("@this");
		button.setAjax(true);
		button.setImmediate(true);
//		button.setOnclick("PF('dlgCedulaCarga').show();");
		button.setUpdate(":form1:" + idComponent);
		button.setStyle(CLASS_BUTTON);
		panelInternalAcordion.getChildren().add(button);
		tab.getChildren().add(panelInternalAcordion);
		accordionPanel.getChildren().add(tab);

	
	
		Tab tab1 = new Tab();
		tab1.setTitle("CEDULA DE CARGA");
		tab1.setTitleStyle(HEADERFASE);
		
		PanelGrid panelInternalAcordion1 = new PanelGrid();
		CommandButton button1 = new CommandButton();
		button1.setValue("Cédula de Carga");
		button1.setStyle(CLASS_BUTTON);
		button1.addClientBehavior("click", getEventCedulaFuente(etapa, catPanelView.getIdCedula()));
//		button1.setOnclick("ShowDivDialogFuente()");
//		button1.setOncomplete("PF('dlgCedulaCarga').show();");
		button1.setOnclick("PF('dlgCedulaCarga').show();");
		button1.setUpdate(":form1:panelCedulaCarga");
//		button1.setOnstart("#{panelControl.setShowCedula(true)}");
		button1.setProcess("@this");
//		button1.setProcess("@form");
//		button1.
		button1.setAjax(true);
//		button1.setAsync(false);
		button1.setImmediate(true);
		
		panelInternalAcordion1.setColumns(1);
		panelInternalAcordion1.getChildren().add(button1);
		tab1.getChildren().add(panelInternalAcordion1);
		accordionPanel.getChildren().add(tab1);
		
//		Tab tab2 = new Tab();
//		tab2.setTitle("DETENER");
//		tab2.setTitleStyle(HEADERFASE);
//		PanelGrid panelInternalAcordion2 = new PanelGrid();
//		panelInternalAcordion2.setColumns(1);
//		Button button2 = new Button();
//		button2.setValue("Iniciar");
//		button2.setStyle(CLASS_BUTTON);
//		panelInternalAcordion2.getChildren().add(button2);
//		tab2.getChildren().add(panelInternalAcordion2);
//		accordionPanel.getChildren().add(tab2);
		
		Tab tab3 = new Tab();
		tab3.setTitle("CERRAR PROCESOS");
		tab3.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion3 = new PanelGrid();
		panelInternalAcordion3.setColumns(1);
		Button button3 = new Button();
		button3.setValue("Iniciar");
		button3.setStyle(CLASS_BUTTON);
		panelInternalAcordion3.getChildren().add(button3);
		tab3.getChildren().add(panelInternalAcordion3);
		accordionPanel.getChildren().add(tab3);
		
		return accordionPanel;
	}
	public static  AccordionPanel acordionFase2() {

		AccordionPanel accordionPanel = new AccordionPanel();
//		accordionPanel.setStyleClass("custom ui-widget-header");
		Tab tab = new Tab();
		tab.setTitle("REPROCESO");
//		tab.setTitleStyleClass("custom ui-widget-header");
		tab.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion = new PanelGrid();
		panelInternalAcordion.setColumns(1);
		Button button = new Button();
		button.setValue("Iniciar");
		button.setRendered(false);
		button.setStyle(CLASS_BUTTON);
		panelInternalAcordion.getChildren().add(button);
		tab.getChildren().add(panelInternalAcordion);
		accordionPanel.getChildren().add(tab);
		accordionPanel.setRendered(false);
		
		return accordionPanel;
	}
	
	public static  AccordionPanel acordionFase3() {

		AccordionPanel accordionPanel = new AccordionPanel();

		Tab tab = new Tab();
		tab.setTitle("INCIDENCIAS");

		tab.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion = new PanelGrid();
		panelInternalAcordion.setColumns(1);
		Button button = new Button();
		button.setValue("Ver Detalles");
		button.setRendered(true);
		button.setStyle(CLASS_BUTTON);
		panelInternalAcordion.getChildren().add(button);
		tab.getChildren().add(panelInternalAcordion);
		accordionPanel.getChildren().add(tab);
		
		return accordionPanel;
	}
	
	public static  AccordionPanel acordionFase4(Long etapa, CatPanelView catPanelView) {

		AccordionPanel accordionPanel = new AccordionPanel();

		Tab tab = new Tab();
		tab.setTitle("CÉDULA PROCESO");

		tab.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion = new PanelGrid();
		panelInternalAcordion.setColumns(1);
		CommandButton button = new CommandButton();
		button.setValue("Cédula Proceso");
		button.setStyle(CLASS_BUTTON);
		button.addClientBehavior("click", getEventCedulaProceso(etapa, catPanelView.getIdCedula()));
		
		button.setOnclick("PF('dlgCedulaProceso').show();");
		button.setUpdate(":form1:panelCedulaProceso");
		button.setProcess("@this");
		button.setAjax(true);
		button.setAsync(false);
		button.setImmediate(true);
		panelInternalAcordion.getChildren().add(button);
		tab.getChildren().add(panelInternalAcordion);
		accordionPanel.getChildren().add(tab);
		
		Tab tab1 = new Tab();
		tab1.setTitle("CERRAR PROCESOS");
		tab1.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion1 = new PanelGrid();
		Button button1 = new Button();
		button1.setValue("Cerrar Proceso");
		button1.setStyle(CLASS_BUTTON);
		panelInternalAcordion1.setColumns(1);
		panelInternalAcordion1.getChildren().add(button1);
		tab1.getChildren().add(panelInternalAcordion1);
		accordionPanel.getChildren().add(tab1);
	
		return accordionPanel;
	}
	
	public static  AccordionPanel acordionFase5(CatPanelView catPanelView) {

		AccordionPanel accordionPanel = new AccordionPanel();

		Tab tab = new Tab();
		tab.setTitle("CONTROL DE CARGA");

		tab.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion = new PanelGrid();
		panelInternalAcordion.setColumns(1);
		Button button = new Button();
		button.setValue("Iniciar");
		button.setStyle(CLASS_BUTTON);
		panelInternalAcordion.getChildren().add(button);
		tab.getChildren().add(panelInternalAcordion);
		accordionPanel.getChildren().add(tab);
		
		return accordionPanel;
	}	
	
	public static  AccordionPanel acordionFase6(CatPanelView catPanelView) {

		AccordionPanel accordionPanel = new AccordionPanel();

		Tab tab = new Tab();
		tab.setTitle("CONTROL DE CARGA");

		tab.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion = new PanelGrid();
		panelInternalAcordion.setColumns(1);
		Button button = new Button();
		button.setValue("Iniciar");
		button.setStyle(CLASS_BUTTON);
		panelInternalAcordion.getChildren().add(button);
		tab.getChildren().add(panelInternalAcordion);
		accordionPanel.getChildren().add(tab);
	
		return accordionPanel;
	}	
	
	public static  AccordionPanel acordionFase7(CatPanelView catPanelView) {

		AccordionPanel accordionPanel = new AccordionPanel();

		Tab tab = new Tab();
		tab.setTitle("CONTROL REPORTES");

		tab.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion = new PanelGrid();
		panelInternalAcordion.setColumns(1);
		Button button = new Button();
		button.setValue("Iniciar Generar Reporte");
		button.setStyle(CLASS_BUTTON);
		panelInternalAcordion.getChildren().add(button);
		tab.getChildren().add(panelInternalAcordion);
		accordionPanel.getChildren().add(tab);
		
		Tab tab1 = new Tab();
		tab1.setTitle("CÉDULA REPORTES");
		tab1.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion1 = new PanelGrid();
		CommandButton button1 = new CommandButton();
		button1.setStyle(CLASS_BUTTON);
		button1.setValue("Cédula Reportes");
//		button1.addClientBehavior("click", getEventCedulaProceso(etapa, catPanelView.getIdCedula()));
//		button1.setOnclick("PF('dlgCedulaProceso').show();");
//		button1.setUpdate(":form1:panelCedulaProceso");
//		button1.setProcess("@this");
//		button1.setAjax(true);
//		button1.setAsync(false);
//		button1.setImmediate(true);
		panelInternalAcordion1.setColumns(1);
		panelInternalAcordion1.getChildren().add(button1);
		tab1.getChildren().add(panelInternalAcordion1);
		accordionPanel.getChildren().add(tab1);
		
		Tab tab2 = new Tab();
		tab2.setTitle("CERRAR PROCESOS");
		tab2.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion2 = new PanelGrid();
		Button button2 = new Button();
		button2.setValue("Cerrar Proceso");
		button2.setStyle(CLASS_BUTTON);
		panelInternalAcordion2.setColumns(1);
		panelInternalAcordion2.getChildren().add(button2);
		tab2.getChildren().add(panelInternalAcordion2);
		accordionPanel.getChildren().add(tab2);
	
		return accordionPanel;
	}
	
	public static  AccordionPanel acordionFase8(CatPanelView catPanelView) {

		AccordionPanel accordionPanel = new AccordionPanel();

		Tab tab = new Tab();
		tab.setTitle("DETALLE");

		tab.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion = new PanelGrid();
		panelInternalAcordion.setColumns(1);
		Button button = new Button();
		button.setValue("OMITIR VALIDACIÓN");
		button.setStyle(CLASS_BUTTON);
		panelInternalAcordion.getChildren().add(button);
		tab.getChildren().add(panelInternalAcordion);
		accordionPanel.getChildren().add(tab);
		
//		Tab tab1 = new Tab();
//		tab1.setTitle("CERRAR PROCESOS");
//		tab1.setTitleStyle(HEADERFASE);
//		PanelGrid panelInternalAcordion1 = new PanelGrid();
//		Button button1 = new Button();
//		button1.setValue("Cerrar Proceso");
//		panelInternalAcordion1.setColumns(1);
//		panelInternalAcordion1.getChildren().add(button1);
//		tab1.getChildren().add(panelInternalAcordion1);
//		accordionPanel.getChildren().add(tab1);
	
		return accordionPanel;
	}
	
	public static  AccordionPanel acordionFase9(CatPanelView catPanelView) {

		AccordionPanel accordionPanel = new AccordionPanel();

		Tab tab = new Tab();
		tab.setTitle("DETALLE");

		tab.setTitleStyle(HEADERFASE);
		PanelGrid panelInternalAcordion = new PanelGrid();
		panelInternalAcordion.setColumns(1);
		Button button = new Button();
		button.setValue("ENVIÓ AUTOMATICO");
		button.setStyle(CLASS_BUTTON);
		Button button1 = new Button();
		button1.setValue("ENVIÓ AUTOMATICO");
		button1.setStyle(CLASS_BUTTON);
		panelInternalAcordion.getChildren().add(button);
		tab.getChildren().add(panelInternalAcordion);
		accordionPanel.getChildren().add(tab);
		
//		Tab tab1 = new Tab();
//		tab1.setTitle("CERRAR PROCESOS");
//		tab1.setTitleStyle(HEADERFASE);
//		PanelGrid panelInternalAcordion1 = new PanelGrid();
//		Button button1 = new Button();
//		button1.setValue("Cerrar Proceso");
//		panelInternalAcordion1.setColumns(1);
//		panelInternalAcordion1.getChildren().add(button1);
//		tab1.getChildren().add(panelInternalAcordion1);
//		accordionPanel.getChildren().add(tab1);
	
		return accordionPanel;
	}
	

}
