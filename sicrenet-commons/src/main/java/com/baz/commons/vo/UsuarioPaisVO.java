package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class UsuarioPaisVO implements Serializable{

	
	private static final long serialVersionUID = 1L;
	
	
	private BigDecimal idPais;
	private String pais;
	private String numEmpleado;
	private String nombreCompleto;
	private int estatus;
	
	
	public UsuarioPaisVO(){


	}
	

	public UsuarioPaisVO(int estatus) {
		super();
		this.estatus = estatus;
	}


	public UsuarioPaisVO(BigDecimal idPais, String pais, String numEmpleado, String nombreCompleto) {
		
		this.idPais = idPais;
		this.pais = pais;
		this.numEmpleado = numEmpleado;
		this.nombreCompleto = nombreCompleto;
	}
	
	

	public BigDecimal getIdPais() {
		return idPais;
	}

	public void setIdPais(BigDecimal idPais) {
		this.idPais = idPais;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getNumEmpleado() {
		return numEmpleado;
	}

	public void setNumEmpleado(String numEmpleado) {
		this.numEmpleado = numEmpleado;
	}

	public String getNombreCompleto() {
		return nombreCompleto;
	}

	public void setNombreCompleto(String nombreCompleto) {
		this.nombreCompleto = nombreCompleto;
	}

	public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + estatus;
		result = prime * result + ((idPais == null) ? 0 : idPais.hashCode());
		result = prime * result + ((nombreCompleto == null) ? 0 : nombreCompleto.hashCode());
		result = prime * result + ((numEmpleado == null) ? 0 : numEmpleado.hashCode());
		result = prime * result + ((pais == null) ? 0 : pais.hashCode());
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
		UsuarioPaisVO other = (UsuarioPaisVO) obj;
		if (estatus != other.estatus)
			return false;
		if (idPais == null) {
			if (other.idPais != null)
				return false;
		} else if (!idPais.equals(other.idPais))
			return false;
		if (nombreCompleto == null) {
			if (other.nombreCompleto != null)
				return false;
		} else if (!nombreCompleto.equals(other.nombreCompleto))
			return false;
		if (numEmpleado == null) {
			if (other.numEmpleado != null)
				return false;
		} else if (!numEmpleado.equals(other.numEmpleado))
			return false;
		if (pais == null) {
			if (other.pais != null)
				return false;
		} else if (!pais.equals(other.pais))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "UsuarioPaisVO [idPais=" + idPais + ", pais=" + pais + ", numEmpleado=" + numEmpleado
				+ ", nombreCompleto=" + nombreCompleto + ", estatus=" + estatus + "]";
	}

	
}
