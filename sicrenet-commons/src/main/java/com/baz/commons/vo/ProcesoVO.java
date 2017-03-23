package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class ProcesoVO implements Serializable{

	
	 private static final long serialVersionUID = 1L;
	 
	  private BigDecimal idProceso;
	  private BigDecimal idNivel;
	  private BigDecimal idCedula;
	  private BigDecimal idFace;
	  private BigDecimal idEtapa;
	  private String store;
	  private float orden;
	  private String titulo;
	  private String nombre;
	  private int estatus;
	  private String desEstatus;
	  
	  
	  
	  public ProcesoVO(){
		  
	  }
	  
	  
	  
	  
	  
	public ProcesoVO(int estatus) {
		super();
		this.estatus = estatus;
	}





	public ProcesoVO(BigDecimal idProceso, BigDecimal idNivel, BigDecimal idCedula, BigDecimal idFace,
			BigDecimal idEtapa, String store, float orden, String titulo, String nombre) {
		super();
		this.idProceso = idProceso;
		this.idNivel = idNivel;
		this.idCedula = idCedula;
		this.idFace = idFace;
		this.idEtapa = idEtapa;
		this.store = store;
		this.orden = orden;
		this.titulo = titulo;
		this.nombre = nombre;
	}





	public BigDecimal getIdProceso() {
		return idProceso;
	}
	public void setIdProceso(BigDecimal idProceso) {
		this.idProceso = idProceso;
	}
	public BigDecimal getIdNivel() {
		return idNivel;
	}
	public void setIdNivel(BigDecimal idNivel) {
		this.idNivel = idNivel;
	}
	public BigDecimal getIdCedula() {
		return idCedula;
	}
	public void setIdCedula(BigDecimal idCedula) {
		this.idCedula = idCedula;
	}
	public BigDecimal getIdFace() {
		return idFace;
	}
	public void setIdFace(BigDecimal idFace) {
		this.idFace = idFace;
	}
	public BigDecimal getIdEtapa() {
		return idEtapa;
	}
	public void setIdEtapa(BigDecimal idEtapa) {
		this.idEtapa = idEtapa;
	}
	public String getStore() {
		return store;
	}
	public void setStore(String store) {
		this.store = store;
	}
	public float getOrden() {
		return orden;
	}
	public void setOrden(float orden) {
		this.orden = orden;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
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
		result = prime * result + ((idCedula == null) ? 0 : idCedula.hashCode());
		result = prime * result + ((idEtapa == null) ? 0 : idEtapa.hashCode());
		result = prime * result + ((idFace == null) ? 0 : idFace.hashCode());
		result = prime * result + ((idNivel == null) ? 0 : idNivel.hashCode());
		result = prime * result + ((idProceso == null) ? 0 : idProceso.hashCode());
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		result = prime * result + Float.floatToIntBits(orden);
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
		ProcesoVO other = (ProcesoVO) obj;
		if (desEstatus == null) {
			if (other.desEstatus != null)
				return false;
		} else if (!desEstatus.equals(other.desEstatus))
			return false;
		if (estatus != other.estatus)
			return false;
		if (idCedula == null) {
			if (other.idCedula != null)
				return false;
		} else if (!idCedula.equals(other.idCedula))
			return false;
		if (idEtapa == null) {
			if (other.idEtapa != null)
				return false;
		} else if (!idEtapa.equals(other.idEtapa))
			return false;
		if (idFace == null) {
			if (other.idFace != null)
				return false;
		} else if (!idFace.equals(other.idFace))
			return false;
		if (idNivel == null) {
			if (other.idNivel != null)
				return false;
		} else if (!idNivel.equals(other.idNivel))
			return false;
		if (idProceso == null) {
			if (other.idProceso != null)
				return false;
		} else if (!idProceso.equals(other.idProceso))
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		if (Float.floatToIntBits(orden) != Float.floatToIntBits(other.orden))
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
		return "ProcesoVO [idProceso=" + idProceso + ", idNivel=" + idNivel + ", idCedula=" + idCedula + ", idFace="
				+ idFace + ", idEtapa=" + idEtapa + ", store=" + store + ", orden=" + orden + ", titulo=" + titulo
				+ ", nombre=" + nombre + ", estatus=" + estatus + ", desEstatus=" + desEstatus + "]";
	}



	  
}
