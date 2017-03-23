package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class EstatusVO implements Serializable {
	
	private static final long serialVersionUID = 1L;
	 
	private BigDecimal idEstatus;
	private String nombre;
	private String clase;
	private int estatus;
	private int valor;
	private String desEstatus;
	
	
	public EstatusVO(){
		
	}
	
	public EstatusVO(int estatus){
		this.estatus = estatus;
	}

	public EstatusVO(BigDecimal idEstatus, String nombre, String clase, String desEstatus) {
		super();
		this.idEstatus = idEstatus;
		this.nombre = nombre;
		this.clase = clase;
		this.desEstatus = desEstatus;
	}

	public BigDecimal getIdEstatus() {
		return idEstatus;
	}

	public void setIdEstatus(BigDecimal idEstatus) {
		this.idEstatus = idEstatus;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getClase() {
		return clase;
	}

	public void setClase(String clase) {
		this.clase = clase;
	}

	public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

	public int getValor() {
		return valor;
	}

	public void setValor(int valor) {
		this.valor = valor;
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
		result = prime * result + ((clase == null) ? 0 : clase.hashCode());
		result = prime * result + ((desEstatus == null) ? 0 : desEstatus.hashCode());
		result = prime * result + estatus;
		result = prime * result + ((idEstatus == null) ? 0 : idEstatus.hashCode());
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		result = prime * result + valor;
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
		EstatusVO other = (EstatusVO) obj;
		if (clase == null) {
			if (other.clase != null)
				return false;
		} else if (!clase.equals(other.clase))
			return false;
		if (desEstatus == null) {
			if (other.desEstatus != null)
				return false;
		} else if (!desEstatus.equals(other.desEstatus))
			return false;
		if (estatus != other.estatus)
			return false;
		if (idEstatus == null) {
			if (other.idEstatus != null)
				return false;
		} else if (!idEstatus.equals(other.idEstatus))
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		if (valor != other.valor)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "EstatusVO [idEstatus=" + idEstatus + ", nombre=" + nombre + ", clase=" + clase + ", estatus=" + estatus
				+ ", valor=" + valor + ", desEstatus=" + desEstatus + "]";
	}
	
	

}
