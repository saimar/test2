package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class ResponsableVO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private BigDecimal idResponsable;
	private String nombre;
	private String extencion;
	private int estatus;
	private String desEstatus;
	private String numEmpleado;
	private String ubicacion;
	
	
	
	
	public ResponsableVO(){
		
	}
	
	
	
	public ResponsableVO(int estatus) {
		super();
		this.estatus = estatus;
	}



	public ResponsableVO(BigDecimal idResponsable, String nombre, String extencion, int estatus, String desEstatus, String numEpleado, String ubicacion) {
		super();
		this.idResponsable = idResponsable;
		this.nombre = nombre;
		this.extencion = extencion;
		this.estatus = estatus;
		this.desEstatus = desEstatus;
		this.numEmpleado = numEpleado;
		this.ubicacion = ubicacion;
	}



	public BigDecimal getIdResponsable() {
		return idResponsable;
	}



	public void setIdResponsable(BigDecimal idResponsable) {
		this.idResponsable = idResponsable;
	}



	public String getNombre() {
		return nombre;
	}



	public void setNombre(String nombre) {
		this.nombre = nombre;
	}



	public String getExtencion() {
		return extencion;
	}



	public void setExtencion(String extencion) {
		this.extencion = extencion;
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



	public String getNumEmpleado() {
		return numEmpleado;
	}



	public void setNumEmpleado(String numEmpleado) {
		this.numEmpleado = numEmpleado;
	}



	public String getUbicacion() {
		return ubicacion;
	}



	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}



	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((desEstatus == null) ? 0 : desEstatus.hashCode());
		result = prime * result + estatus;
		result = prime * result + ((extencion == null) ? 0 : extencion.hashCode());
		result = prime * result + ((idResponsable == null) ? 0 : idResponsable.hashCode());
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		result = prime * result + ((numEmpleado == null) ? 0 : numEmpleado.hashCode());
		result = prime * result + ((ubicacion == null) ? 0 : ubicacion.hashCode());
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
		ResponsableVO other = (ResponsableVO) obj;
		if (desEstatus == null) {
			if (other.desEstatus != null)
				return false;
		} else if (!desEstatus.equals(other.desEstatus))
			return false;
		if (estatus != other.estatus)
			return false;
		if (extencion == null) {
			if (other.extencion != null)
				return false;
		} else if (!extencion.equals(other.extencion))
			return false;
		if (idResponsable == null) {
			if (other.idResponsable != null)
				return false;
		} else if (!idResponsable.equals(other.idResponsable))
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		if (numEmpleado == null) {
			if (other.numEmpleado != null)
				return false;
		} else if (!numEmpleado.equals(other.numEmpleado))
			return false;
		if (ubicacion == null) {
			if (other.ubicacion != null)
				return false;
		} else if (!ubicacion.equals(other.ubicacion))
			return false;
		return true;
	}



	@Override
	public String toString() {
		return "ResponsableVO [idResponsable=" + idResponsable + ", nombre=" + nombre + ", extencion=" + extencion
				+ ", estatus=" + estatus + ", desEstatus=" + desEstatus + ", numEmpleado=" + numEmpleado
				+ ", ubicacion=" + ubicacion + "]";
	}
	
	
	
	
	
	
}
