package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class EtapasVO implements Serializable {

	
	 private static final long serialVersionUID = 1L;
	 
	 
	 private BigDecimal id_etapa;
	 private String nombre;
	 private String descripcion;
	 private int estatus;
	 private String fecha_alta;
	 private String usr_alta;
	 private String fecha_mod;
	 private String usr_mod;
	 
	 private String desEstatus;
	 
	 
	 
	 
	 public EtapasVO(){
		 
	 }
	 
	 
	public EtapasVO(BigDecimal id_etapa, String nombre, String descripcion, int estatus, String desEstatus) {
	
		this.id_etapa = id_etapa;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.estatus = estatus;
		this.desEstatus = desEstatus;
	}
	
	public EtapasVO(BigDecimal id_etapa, String nombre, String descripcion, int estatus) {
		
		this.id_etapa = id_etapa;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.estatus = estatus;
	}
	
	public EtapasVO (int estatus){
		this.estatus = estatus;
	}





	public EtapasVO(BigDecimal id_etapa, String nombre, String descripcion, int estatus, String fecha_alta,
			String usr_alta, String fecha_mod, String usr_mod) {
		super();
		this.id_etapa = id_etapa;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.estatus = estatus;
		this.fecha_alta = fecha_alta;
		this.usr_alta = usr_alta;
		this.fecha_mod = fecha_mod;
		this.usr_mod = usr_mod;
	}
	public BigDecimal getId_etapa() {
		return id_etapa;
	}
	public void setId_etapa(BigDecimal id_etapa) {
		this.id_etapa = id_etapa;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
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
	public String getFecha_alta() {
		return fecha_alta;
	}
	public void setFecha_alta(String fecha_alta) {
		this.fecha_alta = fecha_alta;
	}
	public String getUsr_alta() {
		return usr_alta;
	}
	public void setUsr_alta(String usr_alta) {
		this.usr_alta = usr_alta;
	}
	public String getFecha_mod() {
		return fecha_mod;
	}
	public void setFecha_mod(String fecha_mod) {
		this.fecha_mod = fecha_mod;
	}
	public String getUsr_mod() {
		return usr_mod;
	}
	public void setUsr_mod(String usr_mod) {
		this.usr_mod = usr_mod;
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
		result = prime * result + ((fecha_alta == null) ? 0 : fecha_alta.hashCode());
		result = prime * result + ((fecha_mod == null) ? 0 : fecha_mod.hashCode());
		result = prime * result + ((id_etapa == null) ? 0 : id_etapa.hashCode());
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		result = prime * result + ((usr_alta == null) ? 0 : usr_alta.hashCode());
		result = prime * result + ((usr_mod == null) ? 0 : usr_mod.hashCode());
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
		EtapasVO other = (EtapasVO) obj;
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
		if (fecha_alta == null) {
			if (other.fecha_alta != null)
				return false;
		} else if (!fecha_alta.equals(other.fecha_alta))
			return false;
		if (fecha_mod == null) {
			if (other.fecha_mod != null)
				return false;
		} else if (!fecha_mod.equals(other.fecha_mod))
			return false;
		if (id_etapa == null) {
			if (other.id_etapa != null)
				return false;
		} else if (!id_etapa.equals(other.id_etapa))
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		if (usr_alta == null) {
			if (other.usr_alta != null)
				return false;
		} else if (!usr_alta.equals(other.usr_alta))
			return false;
		if (usr_mod == null) {
			if (other.usr_mod != null)
				return false;
		} else if (!usr_mod.equals(other.usr_mod))
			return false;
		return true;
	}


	@Override
	public String toString() {
		return "EtapasVO [id_etapa=" + id_etapa + ", nombre=" + nombre + ", descripcion=" + descripcion + ", estatus="
				+ estatus + ", fecha_alta=" + fecha_alta + ", usr_alta=" + usr_alta + ", fecha_mod=" + fecha_mod
				+ ", usr_mod=" + usr_mod + ", desEstatus=" + desEstatus + "]";
	}



}