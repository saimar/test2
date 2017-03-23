package com.mx.bancoazteca.pld.monitoreo.bean;

public class OpcionesGraficasVO {
	String consulta; 		
	String id; 		
	String idPadre;	
	String grafica;
	String nombre;
	String valor;
	String estado;
	String tipoDato;
	String pais	;
	
	public String getConsulta() {
		return consulta;
	}
	public void setConsulta(String consulta) {
		this.consulta = consulta;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getIdPadre() {
		return idPadre;
	}
	public void setIdPadre(String idPadre) {
		this.idPadre = idPadre;
	}
	public String getGrafica() {
		return grafica;
	}
	public void setGrafica(String grafica) {
		this.grafica = grafica;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getValor() {
		return valor;
	}
	public void setValor(String valor) {
		this.valor = valor;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getTipoDato() {
		return tipoDato;
	}
	public void setTipoDato(String tipoDato) {
		this.tipoDato = tipoDato;
	}
	public String getPais() {
		return pais;
	}
	public void setPais(String pais) {
		this.pais = pais;
	}
	@Override
	public String toString() {
		return "OpcionesGraficasVO [consulta=" + consulta + ", id=" + id + ", idPadre=" + idPadre + ", grafica="
				+ grafica + ", nombre=" + nombre + ", valor=" + valor + ", estado=" + estado + ", tipoDato=" + tipoDato
				+ ", pais=" + pais + "]";
	}
	
}
