package com.mx.bancoazteca.pld.web.rest.model;

public class PLDStatusLNPEPS {
	private String idAlarma;
	private String status;
	private String analista;
	private String nombreAnalista;
	private String observaciones;
	
	public String getIdAlarma() {
		return idAlarma;
	}
	public void setIdAlarma(String idAlarma) {
		this.idAlarma = idAlarma;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAnalista() {
		return analista;
	}
	public void setAnalista(String analista) {
		this.analista = analista;
	}
	public String getNombreAnalista() {
		return nombreAnalista;
	}
	public void setNombreAnalista(String nombreAnalista) {
		this.nombreAnalista = nombreAnalista;
	}
	public String getObservaciones() {
		return observaciones;
	}
	public void setObservaciones(String observaciones) {
		this.observaciones = observaciones;
	}
	
	@Override
	public String toString() {
		return "PLDStatusLNPEPS [idAlarma=" + idAlarma + ", status=" + status + ", analista=" + analista
				+ ", nombreAnalista=" + nombreAnalista + ", observaciones=" + observaciones + "]";
	}
}
