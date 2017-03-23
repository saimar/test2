package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class AreaVO implements Serializable {
			
	private static final long serialVersionUID = 1L;
		
	private BigDecimal id_area;
	private String descripcion;
	private int estatus;
	private String desEstatus;
	
	
	public AreaVO(){
		
	}
	
	public AreaVO(int estatus){
	this.estatus = estatus;
		
	}
	

	public AreaVO(BigDecimal id_area, String descripcion, int estatus, String desEstatus) {
		super();
		this.id_area = id_area;
		this.descripcion = descripcion;
		this.estatus = estatus;
		this.desEstatus = desEstatus;
	}

	public BigDecimal getId_area() {
		return id_area;
	}

	public void setId_area(BigDecimal id_area) {
		this.id_area = id_area;
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
		result = prime * result + ((id_area == null) ? 0 : id_area.hashCode());
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
		AreaVO other = (AreaVO) obj;
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
		if (id_area == null) {
			if (other.id_area != null)
				return false;
		} else if (!id_area.equals(other.id_area))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "AreaVO [id_area=" + id_area + ", descripcion=" + descripcion + ", estatus=" + estatus + ", desEstatus="
				+ desEstatus + "]";
	}
	
	

	
	
}
