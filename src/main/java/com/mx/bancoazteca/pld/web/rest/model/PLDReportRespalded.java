package com.mx.bancoazteca.pld.web.rest.model;

public class PLDReportRespalded {
	
	private String tipoReporte;
	private String folio;
	private String idReporte;
	private String analista;
	private String nombreAnalista;
	public String getTipoReporte() {
		return tipoReporte;
	}
	public void setTipoReporte(String tipoReporte) {
		this.tipoReporte = tipoReporte;
	}
	
	public String getFolio() {
		return folio;
	}
	public void setFolio(String folio) {
		this.folio = folio;
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
		return "PLDReportRespalded [tipoReporte=" + tipoReporte + ", folio=" + folio + ", idReporte=" + idReporte
				+ ", analista=" + analista + ", nombreAnalista=" + nombreAnalista + "]";
	}
	
	

}
