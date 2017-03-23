package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class NegocioVO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private BigDecimal idNegocio;
	private String descripcion;
	private int estatus;
	private String desEstatus;
	
	
	
	public NegocioVO(){
		
	}
	
	
	
	public NegocioVO(int estatus) {
		super();
		this.estatus = estatus;
	}



	public NegocioVO(BigDecimal idNegocio, String descripcion, int estatus) {
		super();
		this.idNegocio = idNegocio;
		this.descripcion = descripcion;
		this.estatus = estatus;
	}

	public BigDecimal getIdNegocio() {
		return idNegocio;
	}

	public void setIdNegocio(BigDecimal idNegocio) {
		this.idNegocio = idNegocio;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
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
		result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
		result = prime * result + estatus;
		result = prime * result + ((idNegocio == null) ? 0 : idNegocio.hashCode());
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
		NegocioVO other = (NegocioVO) obj;
		if (desEstatus == null) {
			if (other.desEstatus != null)
				return false;
		} else if (!desEstatus.equals(other.desEstatus))
			return false;
		if (descripcion == null) {
			if (other.descripcion != null)
				return false;
		} else if (!descripcion.equals(other.descripcion))
			return false;
		if (estatus != other.estatus)
			return false;
		if (idNegocio == null) {
			if (other.idNegocio != null)
				return false;
		} else if (!idNegocio.equals(other.idNegocio))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "NegocioVO [idNegocio=" + idNegocio + ", descripcion=" + descripcion + ", estatus=" + estatus
				+ ", desEstatus=" + desEstatus + "]";
	}

	
}
