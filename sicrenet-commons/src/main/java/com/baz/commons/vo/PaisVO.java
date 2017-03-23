package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class PaisVO implements Serializable {
	
	 private static final long serialVersionUID = 1L;
	 
	 
	 
	 private BigDecimal idPais;
	 private String descripcion;
	 private String url;
	 private String path;
	 private int estatus;
	 
	 public PaisVO(){
		 
		 
	 }
	 
	 

	public PaisVO(BigDecimal idPais, String descripcion, String url, String path) {
		super();
		this.idPais = idPais;
		this.descripcion = descripcion;
		this.url = url;
		this.path = path;
	}



	public BigDecimal getIdPais() {
		return idPais;
	}

	public void setIdPais(BigDecimal idPais) {
		this.idPais = idPais;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
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
		result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
		result = prime * result + estatus;
		result = prime * result + ((idPais == null) ? 0 : idPais.hashCode());
		result = prime * result + ((path == null) ? 0 : path.hashCode());
		result = prime * result + ((url == null) ? 0 : url.hashCode());
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
		PaisVO other = (PaisVO) obj;
		if (descripcion == null) {
			if (other.descripcion != null)
				return false;
		} else if (!descripcion.equals(other.descripcion))
			return false;
		if (estatus != other.estatus)
			return false;
		if (idPais == null) {
			if (other.idPais != null)
				return false;
		} else if (!idPais.equals(other.idPais))
			return false;
		if (path == null) {
			if (other.path != null)
				return false;
		} else if (!path.equals(other.path))
			return false;
		if (url == null) {
			if (other.url != null)
				return false;
		} else if (!url.equals(other.url))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "PaisVO [idPais=" + idPais + ", descripcion=" + descripcion + ", url=" + url + ", path=" + path
				+ ", estatus=" + estatus + "]";
	}
	 
	 

}
