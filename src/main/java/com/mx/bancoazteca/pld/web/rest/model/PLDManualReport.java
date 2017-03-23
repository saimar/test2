package com.mx.bancoazteca.pld.web.rest.model;

public class PLDManualReport {
	
	private String tiporeporte;
	private String idMovimiento;
	private String nuCliente;
	private String idAnalista;
	private String nombreAnalista;
	private String descripcion;
	private String razones;
	public String getTiporeporte() {
		return tiporeporte;
	}
	public void setTiporeporte(String tiporeporte) {
		this.tiporeporte = tiporeporte;
	}
	public String getIdMovimiento() {
		return idMovimiento;
	}
	public void setIdMovimiento(String idMovimiento) {
		this.idMovimiento = idMovimiento;
	}
	public String getNuCliente() {
		return nuCliente;
	}
	public void setNuCliente(String nuCliente) {
		this.nuCliente = nuCliente;
	}
	public String getIdAnalista() {
		return idAnalista;
	}
	public void setIdAnalista(String idAnalista) {
		this.idAnalista = idAnalista;
	}
	public String getNombreAnalista() {
		return nombreAnalista;
	}
	public void setNombreAnalista(String nombreAnalista) {
		this.nombreAnalista = nombreAnalista;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getRazones() {
		return razones;
	}
	public void setRazones(String razones) {
		this.razones = razones;
	}
	
	@Override
	public String toString() {
		return "manualReport [tiporeporte=" + tiporeporte + ", idMovimiento=" + idMovimiento + ", nuCliente="
				+ nuCliente + ", idAnalista=" + idAnalista + ", nombreAnalista=" + nombreAnalista + ", descripcion="
				+ descripcion + ", razones=" + razones + "]";
	}
	
}
