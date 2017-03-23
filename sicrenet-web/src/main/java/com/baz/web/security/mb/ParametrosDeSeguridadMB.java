package com.baz.web.security.mb;
import java.io.Serializable;
import java.math.BigDecimal;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.component.UIComponent;
import javax.faces.component.html.HtmlOutputText;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.faces.validator.ValidatorException;
import javax.ws.rs.GET;

import org.primefaces.component.fieldset.Fieldset;
import org.primefaces.component.panel.Panel;
import org.primefaces.component.panelgrid.PanelGrid;

import com.baz.commons.domain.CatParametrosDeSeguridad;
import com.baz.commons.domain.CatRol;
import java.util.List;

import com.baz.ejb.service.MantenimientoParametrosDeSeguridadService;
import com.baz.ejb.service.MantenimientoPerfilesService;

@ManagedBean(name="parametrosDeSeguridadMB")
@RequestScoped

public class ParametrosDeSeguridadMB implements Serializable{

	@EJB
	MantenimientoParametrosDeSeguridadService mantenimientoParametrosDeSeguridadService;
	
	private List<CatParametrosDeSeguridad> listaParametrosDeSeguridad;
	private CatParametrosDeSeguridad parametrosDeSeguridad;
	private BigDecimal idparametros;
	private BigDecimal maxlongpass;
	private BigDecimal minlongpass;
	private BigDecimal diasvenpass;
	private BigDecimal maxusrintfallidos;
	private BigDecimal maxipintfallidos;
	private BigDecimal ipdiasbloqueo;
	private BigDecimal timeout;
	
	
	@PostConstruct
    public void init() {
		System.out.println("Entro a parametros de Seguridad");
        listaParametrosDeSeguridad=mantenimientoParametrosDeSeguridadService.getParametrosDeSeguridad();
        idparametros=listaParametrosDeSeguridad.get(0).getIdparametros();
        maxlongpass=listaParametrosDeSeguridad.get(0).getMaxlongpass();
        minlongpass=listaParametrosDeSeguridad.get(0).getMinlongpass();
        diasvenpass=listaParametrosDeSeguridad.get(0).getDiasvenpass();
        maxusrintfallidos=listaParametrosDeSeguridad.get(0).getMaxusrintfallidos();
        maxipintfallidos=listaParametrosDeSeguridad.get(0).getMaxipintfallidos();
        ipdiasbloqueo=listaParametrosDeSeguridad.get(0).getIpdiasbloqueo();
        timeout=listaParametrosDeSeguridad.get(0).getTimeout();
    }
	
	public void editarParametros(){
		mantenimientoParametrosDeSeguridadService.editarParametrosDeSeguridad(idparametros, maxlongpass, minlongpass, diasvenpass, maxusrintfallidos, maxipintfallidos, ipdiasbloqueo, timeout);
		listaParametrosDeSeguridad=mantenimientoParametrosDeSeguridadService.getParametrosDeSeguridad();
        idparametros=listaParametrosDeSeguridad.get(0).getIdparametros();
        maxlongpass=listaParametrosDeSeguridad.get(0).getMaxlongpass();
        minlongpass=listaParametrosDeSeguridad.get(0).getMinlongpass();
        diasvenpass=listaParametrosDeSeguridad.get(0).getDiasvenpass();
        maxusrintfallidos=listaParametrosDeSeguridad.get(0).getMaxusrintfallidos();
        maxipintfallidos=listaParametrosDeSeguridad.get(0).getMaxipintfallidos();
        ipdiasbloqueo=listaParametrosDeSeguridad.get(0).getIpdiasbloqueo();
        timeout=listaParametrosDeSeguridad.get(0).getTimeout();
	}
	
	public ParametrosDeSeguridadMB() {
		// TODO Auto-generated constructor stub
	}

	public List<CatParametrosDeSeguridad> getListaParametrosDeSeguridad() {
		return listaParametrosDeSeguridad;
	}

	public void setListaParametrosDeSeguridad(List<CatParametrosDeSeguridad> listaParametrosDeSeguridad) {
		this.listaParametrosDeSeguridad = listaParametrosDeSeguridad;
	}


	public BigDecimal getIdparametros() {
		return idparametros;
	}


	public void setIdparametros(BigDecimal idparametros) {
		this.idparametros = idparametros;
	}


	public BigDecimal getMaxlongpass() {
		return maxlongpass;
	}


	public void setMaxlongpass(BigDecimal maxlongpass) {
		this.maxlongpass = maxlongpass;
	}


	public BigDecimal getMinlongpass() {
		return minlongpass;
	}


	public void setMinlongpass(BigDecimal minlongpass) {
		this.minlongpass = minlongpass;
	}


	public BigDecimal getDiasvenpass() {
		return diasvenpass;
	}


	public void setDiasvenpass(BigDecimal diasvenpass) {
		this.diasvenpass = diasvenpass;
	}


	public BigDecimal getMaxusrintfallidos() {
		return maxusrintfallidos;
	}


	public void setMaxusrintfallidos(BigDecimal maxusrintfallidos) {
		this.maxusrintfallidos = maxusrintfallidos;
	}


	public BigDecimal getMaxipintfallidos() {
		return maxipintfallidos;
	}


	public void setMaxipintfallidos(BigDecimal maxipintfallidos) {
		this.maxipintfallidos = maxipintfallidos;
	}


	public BigDecimal getIpdiasbloqueo() {
		return ipdiasbloqueo;
	}


	public void setIpdiasbloqueo(BigDecimal ipdiasbloqueo) {
		this.ipdiasbloqueo = ipdiasbloqueo;
	}


	public BigDecimal getTimeout() {
		return timeout;
	}


	public void setTimeout(BigDecimal timeout) {
		this.timeout = timeout;
	}

	public CatParametrosDeSeguridad getParametrosDeSeguridad() {
		return parametrosDeSeguridad;
	}

	public void setParametrosDeSeguridad(CatParametrosDeSeguridad parametrosDeSeguridad) {
		this.parametrosDeSeguridad = parametrosDeSeguridad;
	}
	

}
