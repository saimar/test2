package com.baz.web.mb;

import static com.baz.web.util.DescargaArchivoUtil.obtenerArchivo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.enterprise.context.SessionScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.primefaces.component.selectonemenu.SelectOneMenu;
import org.primefaces.context.RequestContext;
import org.primefaces.model.StreamedContent;

import com.baz.commons.domain.CatArea;
import com.baz.commons.domain.CatCedula;
import com.baz.commons.domain.CatResponsable;
import com.baz.commons.domain.CatSistema;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.ejb.service.PanelDeControlService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name="panelDeControlCedulaMB")
@ ViewScoped
public class PanelDeControlCedulaCargaMB implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 4656002781526478851L;
	@EJB
	private PanelDeControlService panelDeControlService;
	
	private BigDecimal idCedula;
	private String titulo;
	private String nombre;
	private String nombreSistemas;
	private String sistema;
	private BigDecimal idSistema;
	private String origen;
	private String contenido;
	private String factor;
	private String proceso;
	private String descripcionProceso;
	private String descargaPredefinidaD;
	private String descargaPredefinidaH;
	private String descargaPredefinidaM;
	private String descargaPredefinidaS;
	private String archivoDescargarD;
	private String archivoDescargarH;
	private String archivoDescargarM;
	private String rangoActivoD;
	private String rangoActivoA;
	private String archivoDescargarS;
	private String historico;
	private short estatus;
	private BigDecimal idArea;
	private BigDecimal idResponsable;
	private String layout;
	private String archivoMaestro;
	private boolean readOnly;
    private StreamedContent file;
    private StreamedContent archivoMuestra;
    private List<CatResponsable> listCatResponsable;
    private List<CatArea> listCatAreaResponsable;
    private List<CatSistema> listCatsistema;
    private String responsable;
	
	
	  @PostConstruct
	    public void init() {
		  this.readOnly = true;
//		  	obtenerCedula();
	    }
	
	  
	public void guardarCambiosCedula() {
		System.out.println("entering guardar cambios cedula:::");
		CatCedula catCedulaCambios = new CatCedula(idCedula, titulo, nombre, nombreSistemas, idSistema, origen, contenido, factor, proceso, descripcionProceso,
				descargaPredefinidaD + ":" + descargaPredefinidaH + ":" + descargaPredefinidaM + ":"+ descargaPredefinidaS,
				archivoDescargarD + ":" + archivoDescargarH + ":" + archivoDescargarM + ":" + archivoDescargarS,
				rangoActivoD, rangoActivoA, historico, estatus, idResponsable, idArea, layout, archivoMaestro);
		try {
			panelDeControlService.guardarCambiosCedula(catCedulaCambios);
		} catch (ExcepcionSicrenet e) {
			e.printStackTrace();
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}

	public void obtenerCedula(Long etapa, Long idCedula){
		try {
			System.out.println("Cedula de carga valores:::::::::::::" + etapa.intValue() +"::::"+idCedula.intValue());
			 
			CatCedula catCedula = panelDeControlService.obtenerCedula(etapa.intValue(), idCedula.intValue());
			System.out.println("valor de la cedula:::::::" + catCedula.getIdCedula() + "::::::::::::::::::::::::::valor::::idSistemaCatCedula:::::" + catCedula.getIdSistema());
			this.idCedula = catCedula.getIdCedula();
			this.titulo = catCedula.getTitulo();
			this.nombre = catCedula.getNombre();
			this.nombreSistemas = catCedula.getNombreSistema();
//			this.sistema = catCedula.get();
			this.idSistema = catCedula.getIdSistema();
			this.listCatsistema = panelDeControlService.obtenerSistema(etapa.intValue() , this.idSistema.intValue());
			this.origen = catCedula.getOrigen();
			this.contenido = catCedula.getContenido();
			this.factor = catCedula.getFactor();
			this.proceso = catCedula.getProceso();
			this.descripcionProceso = catCedula.getDescProc();
			String [] tempFechaDescarga = catCedula.getFdescarga().split(":");
//			descarga = catCedula.getNombre();
			this.descargaPredefinidaD = tempFechaDescarga[0];
			this.descargaPredefinidaH = tempFechaDescarga[1];
			this.descargaPredefinidaM = tempFechaDescarga[2];
			this.descargaPredefinidaS = tempFechaDescarga[3];
			String [] tempFechaDescargaPredefinida = catCedula.getFdespredefinida().split(":");
			this.archivoDescargarD = tempFechaDescargaPredefinida[0];
			this.archivoDescargarH = tempFechaDescargaPredefinida[1];
			this.archivoDescargarM = tempFechaDescargaPredefinida[2];
			this.archivoDescargarS = tempFechaDescargaPredefinida[3];
			this.rangoActivoD = catCedula.getRfinicio();
			this.rangoActivoA = catCedula.getRffin();
			this.historico = catCedula.getHistorico();
//			this.idResponsable = catCedula.getIdRespnsable();
			this.idResponsable = catCedula.getIdRespnsable();
			this.listCatResponsable =  panelDeControlService
					.obtenerResponsable(etapa.intValue(), idResponsable.intValue());
			System.out.println("valor de la lista responsable::::::::::::::::::::" + listCatResponsable.size());
			this.idArea = catCedula.getIdArea();
			this.listCatAreaResponsable = panelDeControlService.obtenerAreaResponsable(etapa.intValue(),this.idArea.intValue());
			this.layout = catCedula.getLayout();
			this.archivoMaestro = catCedula.getArchivoMaestro();
		} catch (ExcepcionSicrenet e) {
			e.printStackTrace();
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}
	public void updateDialog(){
		FacesContext context = FacesContext.getCurrentInstance();  
		RequestContext requestContext = RequestContext.getCurrentInstance();  
//	        requestContextcontext.update(":form1:idCdulaCarga");  
		SelectOneMenu selecOneMenu = (SelectOneMenu) context.getCurrentInstance().getViewRoot().findComponent(":form1:areResponsable");
		
		System.out.println("valor del select one menu:::::" + selecOneMenu.getValue());
		selecOneMenu.setValue("--Seleccionar--");
		requestContext.update(":form1:areResponsable");
		
	}
	public void readOnlyTrue(){
		this.readOnly = false;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getNombreSistema() {
		return nombreSistemas;
	}
	public void setNombreSistema(String nombreSistema) {
		this.nombreSistemas = nombreSistema;
	}
	public String getSistema() {
		return sistema;
	}
	public void setSistema(String sistema) {
		this.sistema = sistema;
	}
	public String getOrigen() {
		return origen;
	}
	public void setOrigen(String origen) {
		this.origen = origen;
	}
	public String getContenido() {
		return contenido;
	}
	public void setContenido(String contenido) {
		this.contenido = contenido;
	}
	public String getFactor() {
		return factor;
	}
	public void setFactor(String factor) {
		this.factor = factor;
	}
	public String getProceso() {
		return proceso;
	}
	public void setProceso(String proceso) {
		this.proceso = proceso;
	}
	public String getDescripcionProceso() {
		return descripcionProceso;
	}
	public void setDescripcionProceso(String descripcionProceso) {
		this.descripcionProceso = descripcionProceso;
	}
	public String getDescargaPredefinidaD() {
		return descargaPredefinidaD;
	}
	public void setDescargaPredefinidaD(String descargaPredefinidaD) {
		this.descargaPredefinidaD = descargaPredefinidaD;
	}
	public String getDescargaPredefinidaH() {
		return descargaPredefinidaH;
	}
	public void setDescargaPredefinidaH(String descargaPredefinidaH) {
		this.descargaPredefinidaH = descargaPredefinidaH;
	}
	public String getDescargaPredefinidaM() {
		return descargaPredefinidaM;
	}
	public void setDescargaPredefinidaM(String descargaPredefinidaM) {
		this.descargaPredefinidaM = descargaPredefinidaM;
	}
	public String getDescargaPredefinidaS() {
		return descargaPredefinidaS;
	}
	public void setDescargaPredefinidaS(String descargaPredefinidaS) {
		this.descargaPredefinidaS = descargaPredefinidaS;
	}
	public String getArchivoDescargarD() {
		return archivoDescargarD;
	}
	public void setArchivoDescargarD(String archivoDescargarD) {
		this.archivoDescargarD = archivoDescargarD;
	}
	public String getArchivoDescargarH() {
		return archivoDescargarH;
	}
	public void setArchivoDescargarH(String archivoDescargarH) {
		this.archivoDescargarH = archivoDescargarH;
	}
	public String getArchivoDescargarM() {
		return archivoDescargarM;
	}
	public void setArchivoDescargarM(String archivoDescargarM) {
		this.archivoDescargarM = archivoDescargarM;
	}
	public String getArchivoDescargarS() {
		return archivoDescargarS;
	}
	public void setArchivoDescargarS(String archivoDescargarS) {
		this.archivoDescargarS = archivoDescargarS;
	}
	public String getHistorico() {
		return historico;
	}
	public void setHistorico(String historico) {
		this.historico = historico;
	}
	public BigDecimal getIdAre() {
		return idArea;
	}
	public void setIdAre(BigDecimal idArea) {
		this.idArea = idArea;
	}
	public BigDecimal getIdResponsable() {
		return idResponsable;
	}
	public void setResponsable(BigDecimal responsable) {
		this.idResponsable =idResponsable;
	}
	public String getLayout() {
		return layout;
	}
	public void setLayout(String layout) {
		this.layout = layout;
	}
	public String getArchivoMaestro() {
		return archivoMaestro;
	}
	public void setArchivoMaestro(String archivoMaestro) {
		this.archivoMaestro = archivoMaestro;
	}
	public String getRangoActivoD() {
		return rangoActivoD;
	}
	public void setRangoActivoD(String rangoActivoD) {
		this.rangoActivoD = rangoActivoD;
	}
	public String getRangoActivoA() {
		return rangoActivoA;
	}
	
	public String getNombreSistemas() {
		return nombreSistemas;
	}

	public void setNombreSistemas(String nombreSistemas) {
		this.nombreSistemas = nombreSistemas;
	}

	public boolean isReadOnly() {
		return readOnly;
	}

	public void setReadOnly(boolean readOnly) {
		this.readOnly = readOnly;
	}

	public void setRangoActivoA(String rangoActivoA) {
		this.rangoActivoA = rangoActivoA;
	}
	   
    public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public StreamedContent getFile() {
    	this.file = obtenerArchivo(FacesContext.getCurrentInstance() ,layout.trim());
        return file;
    }
    public StreamedContent getArchivoMuestra() {
    	this.archivoMuestra = obtenerArchivo(FacesContext.getCurrentInstance() ,archivoMaestro.trim());
    	return archivoMuestra;
    }


	public BigDecimal getIdCedula() {
		return idCedula;
	}


	public void setIdCedula(BigDecimal idCedula) {
		this.idCedula = idCedula;
	}


	public BigDecimal getIdArea() {
		return idArea;
	}


	public void setIdArea(BigDecimal idArea) {
		this.idArea = idArea;
	}


	public List<CatResponsable> getListCatResponsable() {
		return listCatResponsable;
	}


	public void setListCatResponsable(List<CatResponsable> listCatResponsable) {
		this.listCatResponsable = listCatResponsable;
	}


	public void setIdResponsable(BigDecimal idResponsable) {
		this.idResponsable = idResponsable;
	}


	public void setFile(StreamedContent file) {
		this.file = file;
	}


	public void setArchivoMuestra(StreamedContent archivoMuestra) {
		this.archivoMuestra = archivoMuestra;
	}


	public short getEstatus() {
		return estatus;
	}


	public void setEstatus(short estatus) {
		this.estatus = estatus;
	}


	public String getResponsable() {
		return responsable;
	}
	
	public void setResponsable(String responsable) {
		this.responsable = responsable;
	}

	public List<CatArea> getListCatAreaResponsable() {
		return listCatAreaResponsable;
	}

	public void setListCatAreaResponsable(List<CatArea> listCatAreaResponsable) {
		this.listCatAreaResponsable = listCatAreaResponsable;
	}

	public BigDecimal getIdSistema() {
		return idSistema;
	}

	public void setIdSistema(BigDecimal idSistema) {
		this.idSistema = idSistema;
	}

	public List<CatSistema> getListCatsistema() {
		return listCatsistema;
	}

	public void setListCatsistema(List<CatSistema> listCatsistema) {
		this.listCatsistema = listCatsistema;
	}
  	
}
