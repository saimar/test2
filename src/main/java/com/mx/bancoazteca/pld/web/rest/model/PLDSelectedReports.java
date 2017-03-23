package com.mx.bancoazteca.pld.web.rest.model;

import java.util.ArrayList;
import java.util.List;

public class PLDSelectedReports {
	
	private String tipoReporte;
	private String idReporte;
	private String trimestre;
	private String anio;
	private String analista;
	private String nombreAnalista;
	
	private List<String> seleccionados;
	
	public PLDSelectedReports(){
		this.seleccionados=new ArrayList<String>();
	}
	
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
	public String getTrimestre() {
		return trimestre;
	}
	public void setTrimestre(String trimestre) {
		this.trimestre = trimestre;
	}
	public String getAnio() {
		return anio;
	}
	public void setAnio(String anio) {
		this.anio = anio;
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
	
	public List<String> getSeleccionados() {
		return seleccionados;
	}
	public void setSeleccionados(List<String> seleccionados) {
		this.seleccionados = seleccionados;
	}
	@Override
	public String toString() {
		return "PLDSelectedReports [tipoReporte=" + tipoReporte + ", idReporte=" + idReporte + ", trimestre="
				+ trimestre + ", anio=" + anio + ", analista=" + analista + ", nombreAnalista=" + nombreAnalista
				+ ", seleccionados=" + seleccionados + "]";
	}
	
	
}
