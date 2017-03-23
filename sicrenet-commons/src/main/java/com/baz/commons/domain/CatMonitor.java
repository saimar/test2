package com.baz.commons.domain;

import java.io.Serializable;


public class CatMonitor implements Serializable {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
private String usuario;
private String nombre;
private String descripcion;
private String ip;
private String sesionActiva;
private String finicio;
private String tiempo;






public CatMonitor() {
	super();
	// TODO Auto-generated constructor stub
}




public CatMonitor(String usuario, String nombre, String descripcion, String ip, String sesionActiva, String finicio,
		String tiempo) {
	super();
	this.usuario = usuario;
	this.nombre = nombre;
	this.descripcion = descripcion;
	this.ip = ip;
	this.sesionActiva = sesionActiva;
	this.finicio = finicio;
	this.tiempo = tiempo;
}





public String getUsuario() {
	return usuario;
}

public void setUsuario(String usuario) {
	this.usuario = usuario;
}

public String getNombre() {
	return nombre;
}


public void setNombre(String nombre) {
	this.nombre = nombre;
}


public String getDescripcion() {
	return descripcion;
}


public void setDescripcion(String descripcion) {
	this.descripcion = descripcion;
}


public String getIp() {
	return ip;
}


public void setIp(String ip) {
	this.ip = ip;
}


public String getSesionActiva() {
	return sesionActiva;
}




public void setSesionActiva(String sesionActiva) {
	this.sesionActiva = sesionActiva;
}




public String getFinicio() {
	return finicio;
}


public void setFinicio(String finicio) {
	this.finicio = finicio;
}


public String getTiempo() {
	return tiempo;
}


public void setTiempo(String tiempo) {
	this.tiempo = tiempo;
}



}
