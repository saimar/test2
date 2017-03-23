package com.baz.web.mb;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;

import org.primefaces.context.RequestContext;

import com.baz.commons.domain.CatMonitor;
import com.baz.commons.domain.CatRol;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.ejb.service.MantenimientoMonitorUsuariosService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoMonitorUsuarios")

@SessionScoped
public class MantenimientoMonitorUsuariosMB implements Serializable {

	/**
		 * 
		 */
	private static final long serialVersionUID = 1L;

	@EJB
	MantenimientoMonitorUsuariosService mantenimientoMonitorUsuariosService;

	private String numeroEmpleado;
	private String nombre;
	private CatRol rol;
	private String ip;
	private int sesion;

	private List<CatMonitor> listaUsuariosMonitor;

	private Date Fecha;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {

		try {

			listaUsuariosMonitor = mantenimientoMonitorUsuariosService.cargaMonitorUsuarios();

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void prueba() {
		System.out.println("ip::::" + getmeuIP());
		FacesContext.getCurrentInstance().addMessage(null,
				new FacesMessage(FacesMessage.SEVERITY_INFO, "Executed", "Using RemoteCommand."));

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('da').show();");
	}

	public String getmeuIP() {
		FacesContext context = FacesContext.getCurrentInstance();
		HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();

		return request.getRemoteAddr();

	}

	public String getNumeroEmpleado() {
		return numeroEmpleado;
	}

	public void setNumeroEmpleado(String numeroEmpleado) {
		this.numeroEmpleado = numeroEmpleado;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public CatRol getRol() {
		return rol;
	}

	public void setRol(CatRol rol) {
		this.rol = rol;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getSesion() {
		return sesion;
	}

	public void setSesion(int sesion) {
		this.sesion = sesion;
	}

	public List<CatMonitor> getListaUsuariosMonitor() {
		return listaUsuariosMonitor;
	}

	public void setListaUsuariosMonitor(List<CatMonitor> listaUsuariosMonitor) {
		this.listaUsuariosMonitor = listaUsuariosMonitor;
	}

	public Date getFecha() {
		return Fecha;
	}

	public void setFecha(Date fecha) {
		Fecha = fecha;
	}

}
