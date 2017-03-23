package com.mx.bancoazteca.pld.web.rest.model;

public class PLDReportDiscarted {
	private String tipoReporte;
	private String idReporte;
	private String analista;
	private String nombreAnalista;
	public String getTipoReporte() {
		return tipoReporte;
	}
	public void setTipoReporte(String tipoReporte) {
		this.tipoReporte = tipoReporte;
	}
	public String getIdReporte() {
		return idReporte;
	}
	public void setIdReporte(String idReporte) {
		this.idReporte = idReporte;
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
	@Override
	public String toString() {
		return "PLDReportDiscarted [tipoReporte=" + tipoReporte + ", idReporte=" + idReporte + ", analista=" + analista
				+ ", nombreAnalista=" + nombreAnalista + "]";
	}
}
