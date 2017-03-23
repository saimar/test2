package com.baz.web.mb;

import static com.baz.web.util.DescargaArchivoUtil.obtenerArchivo;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import javax.faces.context.FacesContext;

import org.primefaces.component.selectonemenu.SelectOneMenu;
import org.primefaces.context.RequestContext;
import org.primefaces.model.StreamedContent;

import com.baz.commons.domain.CatCedula;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.ejb.service.PanelDeControlService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name="panelDeControlCedulaProcesoMB")
@ ViewScoped
public class PanelDeControlCedulaProcesoMB implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@EJB
	private PanelDeControlService panelDeControlService;
	
	private BigDecimal idCedula;
	private String titulo;
	private String nombre;
	private String descripcionProceso;
	private String rangoActivoD;
	private String rangoActivoA;
	private String historico;
	private String archivoMaestro;
	private boolean readOnly;
    private StreamedContent file;


	
	
	  @PostConstruct
	    public void init() {
		  this.readOnly = true;
//		  	obtenerCedula();
	    }
	
	  
	public void guardarCambiosCedula() {
		System.out.println("entering guardar cambios cedula:::");
		CatCedula catCedulaCambios = new CatCedula(idCedula, titulo, nombre, "", BigDecimal.valueOf(0L), "", "", "", "", descripcionProceso,
				"", "", rangoActivoD, rangoActivoA, historico,(short) 0, BigDecimal.valueOf(0L), BigDecimal.valueOf(0L), "", archivoMaestro);
		try {
			panelDeControlService.guardarCambiosCedula(catCedulaCambios);
		} catch (ExcepcionSicrenet e) {
			e.printStackTrace();
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}

	public void obtenerCedulaProceso(Long etapa, Long idCedula){
		try {
			System.out.println("Cedula de carga valores:::::::::::::" + etapa.intValue() +"::::"+idCedula.intValue());
			 
			CatCedula catCedula = panelDeControlService.obtenerCedula(etapa.intValue(), idCedula.intValue());
			System.out.println("valor de la cedula:::::::" + catCedula.getIdCedula() + "::::::::::::::::::::::::::valor::::idSistemaCatCedula:::::" + catCedula.getIdSistema());
			this.idCedula = catCedula.getIdCedula();
			this.titulo = catCedula.getTitulo();
			this.nombre = catCedula.getNombre();

			this.descripcionProceso = catCedula.getDescProc();

			this.rangoActivoD = catCedula.getRfinicio();
			this.rangoActivoA = catCedula.getRffin();
			this.historico = catCedula.getHistorico();
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

	public String getDescripcionProceso() {
		return descripcionProceso;
	}
	public void setDescripcionProceso(String descripcionProceso) {
		this.descripcionProceso = descripcionProceso;
	}

	public String getHistorico() {
		return historico;
	}
	public void setHistorico(String historico) {
		this.historico = historico;
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
    	this.file = obtenerArchivo(FacesContext.getCurrentInstance() ,archivoMaestro.trim());
        return file;
    }



	public BigDecimal getIdCedula() {
		return idCedula;
	}


	public void setIdCedula(BigDecimal idCedula) {
		this.idCedula = idCedula;
	}

	public void setFile(StreamedContent file) {
		this.file = file;
	}


}
