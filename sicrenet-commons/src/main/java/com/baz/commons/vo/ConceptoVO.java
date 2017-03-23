package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class ConceptoVO implements Serializable {

	
	private static final long serialVersionUID = 1L;
	
	
	private BigDecimal idConcepto;
	private String nombre;
	private int estatus;
	private String desEstatus;
	
	
	public ConceptoVO(){
		
	}
	

	public ConceptoVO(int estatus) {
		super();
		this.estatus = estatus;
	}


	public ConceptoVO(BigDecimal idConcepto, String nombre, int estatus, String desEstatus) {
		super();
		this.idConcepto = idConcepto;
		this.nombre = nombre;
		this.estatus = estatus;
		this.desEstatus = desEstatus;
	}


	public BigDecimal getIdConcepto() {
		return idConcepto;
	}


	public void setIdConcepto(BigDecimal idConcepto) {
		this.idConcepto = idConcepto;
	}


	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public int getEstatus() {
		return estatus;
	}


	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}


	public String getDesEstatus() {
		return desEstatus;
	}


	public void setDesEstatus(String desEstatus) {
		this.desEstatus = desEstatus;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((desEstatus == null) ? 0 : desEstatus.hashCode());
		result = prime * result + estatus;
		result = prime * result + ((idConcepto == null) ? 0 : idConcepto.hashCode());
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ConceptoVO other = (ConceptoVO) obj;
		if (desEstatus == null) {
			if (other.desEstatus != null)
				return false;
		} else if (!desEstatus.equals(other.desEstatus))
			return false;
		if (estatus != other.estatus)
			return false;
		if (idConcepto == null) {
			if (other.idConcepto != null)
				return false;
		} else if (!idConcepto.equals(other.idConcepto))
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		return true;
	}


	@Override
	public String toString() {
		return "ConceptoVO [idConcepto=" + idConcepto + ", nombre=" + nombre + ", estatus=" + estatus + ", desEstatus="
				+ desEstatus + "]";
	}
	
	
	
	
	
}
