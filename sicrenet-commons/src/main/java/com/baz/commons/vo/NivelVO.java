package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;



public class NivelVO implements Serializable {

	 private static final long serialVersionUID = 1L; 
	 
	 private BigDecimal Id_Nivel;
	 private String Nombre;
	 private String Descripcion;
	 private BigDecimal Id_Etapa;
	 private int Estatus;
	 private String Fecha_Alta;
	 private String Usr_Alta;
	 private String Fecha_Mod;
	 private String Usr_Mod;
	 
	 private String nombre2;
	 
	 
      public NivelVO(){
		 
	 }
      
      public NivelVO(BigDecimal Id_Nivel, String Nombre, String Descripcion, BigDecimal Id_Etapa,String nombre2, int Estatus) {
    	
    	this.Id_Nivel  = Id_Nivel;
  		this.Nombre = Nombre;
  		this.Descripcion = Descripcion;
  		this.Id_Etapa = Id_Etapa;
  		this.nombre2 = nombre2;
  		this.Estatus = Estatus;
  	}
     
      public NivelVO(BigDecimal Id_Nivel, String Nombre, String Descripcion, BigDecimal Id_Etapa, int Estatus, String Fecha_Alta,
  			String Usr_Alta, String Fecha_Mod, String Usr_Mod) {
  		super();

  		this.Id_Nivel  = Id_Nivel;
  		this.Nombre = Nombre;
  		this.Descripcion = Descripcion;
  		this.Id_Etapa = Id_Etapa;
  		this.Estatus = Estatus;
  		this.Fecha_Alta = Fecha_Alta;
  		this.Usr_Alta = Usr_Alta;
  		this.Fecha_Mod = Fecha_Mod;
  		this.Fecha_Mod = Usr_Mod;
  	}

	public BigDecimal getId_Nivel() {
		return Id_Nivel;
	}

	public void setId_Nivel(BigDecimal id_Nivel) {
		Id_Nivel = id_Nivel;
	}

	public String getNombre() {
		return Nombre;
	}

	public void setNombre(String nombre) {
		Nombre = nombre;
	}

	public String getDescripcion() {
		return Descripcion;
	}

	public void setDescripcion(String descripcion) {
		Descripcion = descripcion;
	}

	public BigDecimal getId_Etapa() {
		return Id_Etapa;
	}

	public void setId_Etapa(BigDecimal id_Etapa) {
		Id_Etapa = id_Etapa;
	}

	public int getEstatus() {
		return Estatus;
	}

	public void setEstatus(int estatus) {
		Estatus = estatus;
	}

	public String getFecha_Alta() {
		return Fecha_Alta;
	}

	public void setFecha_Alta(String fecha_Alta) {
		Fecha_Alta = fecha_Alta;
	}

	public String getUsr_Alta() {
		return Usr_Alta;
	}

	public void setUsr_Alta(String usr_Alta) {
		Usr_Alta = usr_Alta;
	}

	public String getFecha_Mod() {
		return Fecha_Mod;
	}

	public void setFecha_Mod(String fecha_Mod) {
		Fecha_Mod = fecha_Mod;
	}

	public String getUsr_Mod() {
		return Usr_Mod;
	}

	public void setUsr_Mod(String usr_Mod) {
		Usr_Mod = usr_Mod;
	}

	public String getNombre2() {
		return nombre2;
	}

	public void setNombre2(String nombre2) {
		this.nombre2 = nombre2;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((Descripcion == null) ? 0 : Descripcion.hashCode());
		result = prime * result + Estatus;
		result = prime * result + ((Fecha_Alta == null) ? 0 : Fecha_Alta.hashCode());
		result = prime * result + ((Fecha_Mod == null) ? 0 : Fecha_Mod.hashCode());
		result = prime * result + ((Id_Etapa == null) ? 0 : Id_Etapa.hashCode());
		result = prime * result + ((Id_Nivel == null) ? 0 : Id_Nivel.hashCode());
		result = prime * result + ((Nombre == null) ? 0 : Nombre.hashCode());
		result = prime * result + ((Usr_Alta == null) ? 0 : Usr_Alta.hashCode());
		result = prime * result + ((Usr_Mod == null) ? 0 : Usr_Mod.hashCode());
		result = prime * result + ((nombre2 == null) ? 0 : nombre2.hashCode());
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
		NivelVO other = (NivelVO) obj;
		if (Descripcion == null) {
			if (other.Descripcion != null)
				return false;
		} else if (!Descripcion.equals(other.Descripcion))
			return false;
		if (Estatus != other.Estatus)
			return false;
		if (Fecha_Alta == null) {
			if (other.Fecha_Alta != null)
				return false;
		} else if (!Fecha_Alta.equals(other.Fecha_Alta))
			return false;
		if (Fecha_Mod == null) {
			if (other.Fecha_Mod != null)
				return false;
		} else if (!Fecha_Mod.equals(other.Fecha_Mod))
			return false;
		if (Id_Etapa == null) {
			if (other.Id_Etapa != null)
				return false;
		} else if (!Id_Etapa.equals(other.Id_Etapa))
			return false;
		if (Id_Nivel == null) {
			if (other.Id_Nivel != null)
				return false;
		} else if (!Id_Nivel.equals(other.Id_Nivel))
			return false;
		if (Nombre == null) {
			if (other.Nombre != null)
				return false;
		} else if (!Nombre.equals(other.Nombre))
			return false;
		if (Usr_Alta == null) {
			if (other.Usr_Alta != null)
				return false;
		} else if (!Usr_Alta.equals(other.Usr_Alta))
			return false;
		if (Usr_Mod == null) {
			if (other.Usr_Mod != null)
				return false;
		} else if (!Usr_Mod.equals(other.Usr_Mod))
			return false;
		if (nombre2 == null) {
			if (other.nombre2 != null)
				return false;
		} else if (!nombre2.equals(other.nombre2))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "NivelVO [Id_Nivel=" + Id_Nivel + ", Nombre=" + Nombre + ", Descripcion=" + Descripcion + ", Id_Etapa="
				+ Id_Etapa + ", Estatus=" + Estatus + ", Fecha_Alta=" + Fecha_Alta + ", Usr_Alta=" + Usr_Alta
				+ ", Fecha_Mod=" + Fecha_Mod + ", Usr_Mod=" + Usr_Mod + ", nombre2=" + nombre2 + "]";
	}
	
	
	 
	
}
