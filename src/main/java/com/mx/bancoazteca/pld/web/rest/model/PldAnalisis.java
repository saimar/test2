package com.mx.bancoazteca.pld.web.rest.model;

public class PldAnalisis {

	String nuCliente ;
	String resultadoAnalisis ;
	String observaciones ;
	Integer idUsuario ;
	String nombreUsuario ;
	
	public String getNuCliente() {
		return nuCliente;
	}
	public void setNuCliente(String nuCliente) {
		this.nuCliente = nuCliente;
	}
	public String getResultadoAnalisis() {
		return resultadoAnalisis;
	}
	public void setResultadoAnalisis(String resultadoAnalisis) {
		this.resultadoAnalisis = resultadoAnalisis;
	}
	public String getObservaciones() {
		return observaciones;
	}
	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}
	public Integer getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getNombreUsuario() {
		return nombreUsuario;
	}
	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}  
	
	@Override
	public String toString() {
		return "analisis [nuCliente=" + nuCliente + ", resultadoAnalisis=" + resultadoAnalisis +
				", observaciones="+ observaciones + ", idUsuario=" + idUsuario + ", nombreUsuario=" + nombreUsuario+ "]";
	}
	
	
}
