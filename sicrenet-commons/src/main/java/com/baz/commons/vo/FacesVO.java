package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class FacesVO implements Serializable{

	
	 private static final long serialVersionUID = 1L;
	 
	 
	 	private BigDecimal idFace;
	  
	    private String nombre;

	    private String descripcion;

	    private BigDecimal idEtapa;

	    private int estatus;
	    
	    private String fecha_alta;
	    
	    private String usr_alta;
	    
	    private String fecha_mod;
	    
	    private String usr_mod;

	    private String desEstatus;
	    
	    public FacesVO(){
	    	
	    }
	      
	    
		public FacesVO(BigDecimal idFace, String nombre, String descripcion, BigDecimal idEtapa, int estatus,
				String fecha_alta, String usr_alta, String fecha_mod, String usr_mod) {
			super();
			this.idFace = idFace;
			this.nombre = nombre;
			this.descripcion = descripcion;
			this.idEtapa = idEtapa;
			this.estatus = estatus;
			this.fecha_alta = fecha_alta;
			this.usr_alta = usr_alta;
			this.fecha_mod = fecha_mod;
			this.usr_mod = usr_mod;
		}
		
		public FacesVO(BigDecimal idFace, String nombre, String descripcion, int estatus, BigDecimal idEtapa, String desEstatus) {
			super();
			this.idFace = idFace;
			this.nombre = nombre;
			this.descripcion = descripcion;
			this.estatus = estatus;
			this.idEtapa = idEtapa;
			this.desEstatus = desEstatus;
			
		}
		
		public FacesVO( int estatus) {
			this.estatus = estatus;
		}

		public BigDecimal getIdFace() {
			return idFace;
		}

		public void setIdFace(BigDecimal idFace) {
			this.idFace = idFace;
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

		public BigDecimal getIdEtapa() {
			return idEtapa;
		}

		public void setIdEtapa(BigDecimal idEtapa) {
			this.idEtapa = idEtapa;
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
			result = prime * result + ((idEtapa == null) ? 0 : idEtapa.hashCode());
			result = prime * result + ((idFace == null) ? 0 : idFace.hashCode());
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
			FacesVO other = (FacesVO) obj;
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
			return "FacesVO [idFace=" + idFace + ", nombre=" + nombre + ", descripcion=" + descripcion + ", idEtapa="
					+ idEtapa + ", estatus=" + estatus + ", fecha_alta=" + fecha_alta + ", usr_alta=" + usr_alta
					+ ", fecha_mod=" + fecha_mod + ", usr_mod=" + usr_mod + ", desEstatus=" + desEstatus + "]";
		}


	    

}
