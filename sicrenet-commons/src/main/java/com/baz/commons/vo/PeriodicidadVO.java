package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class PeriodicidadVO implements Serializable{
	
	 private static final long serialVersionUID = 1L; 

	 
	 private BigDecimal idPeriodicidad;
	 private String tipo;
	 private int estatus;
	 private String desEstatus;
	 
	 public PeriodicidadVO(){
		 
	 }
	 
	 

	public PeriodicidadVO(int estatus) {
		super();
		this.estatus = estatus;
	}



	public PeriodicidadVO(BigDecimal idPeriodicidad, String tipo, int estatus) {
		super();
		this.idPeriodicidad = idPeriodicidad;
		this.tipo = tipo;
		this.estatus = estatus;
	}



	public BigDecimal getIdPeriodicidad() {
		return idPeriodicidad;
	}

	public void setIdPeriodicidad(BigDecimal idPeriodicidad) {
		this.idPeriodicidad = idPeriodicidad;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
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
		result = prime * result + ((idPeriodicidad == null) ? 0 : idPeriodicidad.hashCode());
		result = prime * result + ((tipo == null) ? 0 : tipo.hashCode());
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
		PeriodicidadVO other = (PeriodicidadVO) obj;
		if (desEstatus == null) {
			if (other.desEstatus != null)
				return false;
		} else if (!desEstatus.equals(other.desEstatus))
			return false;
		if (estatus != other.estatus)
			return false;
		if (idPeriodicidad == null) {
			if (other.idPeriodicidad != null)
				return false;
		} else if (!idPeriodicidad.equals(other.idPeriodicidad))
			return false;
		if (tipo == null) {
			if (other.tipo != null)
				return false;
		} else if (!tipo.equals(other.tipo))
			return false;
		return true;
	}



	@Override
	public String toString() {
		return "PeriodicidadVO [idPeriodicidad=" + idPeriodicidad + ", tipo=" + tipo + ", estatus=" + estatus
				+ ", desEstatus=" + desEstatus + "]";
	}
	 
	 
	 
}
