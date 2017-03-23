package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class ReporteVO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private BigDecimal idReporte;
	private String nombreRep;
	private String descripcion;
	private BigDecimal idExtraccion;
	private String titulo;
	private String nombreCed;
	private String store;
	private int estatus;
	private String desEstatus;
	
	
	
	public ReporteVO(){
		
	}
	
	public ReporteVO(int estatus){
		this.estatus = estatus;
	}

	public ReporteVO(BigDecimal idReporte, String nombreRep, String descripcion, BigDecimal idExtraccion, String titulo,
			String nombreCed, String store, int estatus) {
		super();
		this.idReporte = idReporte;
		this.nombreRep = nombreRep;
		this.descripcion = descripcion;
		this.idExtraccion = idExtraccion;
		this.titulo = titulo;
		this.nombreCed = nombreCed;
		this.store = store;
		this.estatus = estatus;
	}

	public BigDecimal getIdReporte() {
		return idReporte;
	}

	public void setIdReporte(BigDecimal idReporte) {
		this.idReporte = idReporte;
	}

	public String getNombreRep() {
		return nombreRep;
	}

	public void setNombreRep(String nombreRep) {
		this.nombreRep = nombreRep;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public BigDecimal getIdExtraccion() {
		return idExtraccion;
	}

	public void setIdExtraccion(BigDecimal idExtraccion) {
		this.idExtraccion = idExtraccion;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getNombreCed() {
		return nombreCed;
	}

	public void setNombreCed(String nombreCed) {
		this.nombreCed = nombreCed;
	}

	public String getStore() {
		return store;
	}

	public void setStore(String store) {
		this.store = store;
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
		result = prime * result + ((idExtraccion == null) ? 0 : idExtraccion.hashCode());
		result = prime * result + ((idReporte == null) ? 0 : idReporte.hashCode());
		result = prime * result + ((nombreCed == null) ? 0 : nombreCed.hashCode());
		result = prime * result + ((nombreRep == null) ? 0 : nombreRep.hashCode());
		result = prime * result + ((store == null) ? 0 : store.hashCode());
		result = prime * result + ((titulo == null) ? 0 : titulo.hashCode());
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
		ReporteVO other = (ReporteVO) obj;
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
		if (idExtraccion == null) {
			if (other.idExtraccion != null)
				return false;
		} else if (!idExtraccion.equals(other.idExtraccion))
			return false;
		if (idReporte == null) {
			if (other.idReporte != null)
				return false;
		} else if (!idReporte.equals(other.idReporte))
			return false;
		if (nombreCed == null) {
			if (other.nombreCed != null)
				return false;
		} else if (!nombreCed.equals(other.nombreCed))
			return false;
		if (nombreRep == null) {
			if (other.nombreRep != null)
				return false;
		} else if (!nombreRep.equals(other.nombreRep))
			return false;
		if (store == null) {
			if (other.store != null)
				return false;
		} else if (!store.equals(other.store))
			return false;
		if (titulo == null) {
			if (other.titulo != null)
				return false;
		} else if (!titulo.equals(other.titulo))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ReporteVO [idReporte=" + idReporte + ", nombreRep=" + nombreRep + ", descripcion=" + descripcion
				+ ", idExtraccion=" + idExtraccion + ", titulo=" + titulo + ", nombreCed=" + nombreCed + ", store="
				+ store + ", estatus=" + estatus + ", desEstatus=" + desEstatus + "]";
	}
	
	
	
}
