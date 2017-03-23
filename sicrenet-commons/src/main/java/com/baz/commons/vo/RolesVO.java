package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;

public class RolesVO implements Serializable {

	
	
	 private static final long serialVersionUID = 1L;
	   
	 
	   
	    private BigDecimal idrol;

	    private String descripcion;

	    private String falta;

	    private String ualta;

	    private String fmodifica;

	    private String umodifica;

	    private BigInteger estatus;


	    public RolesVO() {
	    }

	    public RolesVO( BigDecimal IDROL, String DESCRIPCION) {
	    	this.idrol = IDROL;
	    	this.descripcion = DESCRIPCION;
	    }

		public BigDecimal getIdrol() {
			return idrol;
		}

		public void setIdrol(BigDecimal idrol) {
			this.idrol = idrol;
		}

		public String getDescripcion() {
			return descripcion;
		}

		public void setDescripcion(String descripcion) {
			this.descripcion = descripcion;
		}

		public String getFalta() {
			return falta;
		}

		public void setFalta(String falta) {
			this.falta = falta;
		}

		public String getUalta() {
			return ualta;
		}

		public void setUalta(String ualta) {
			this.ualta = ualta;
		}

		public String getFmodifica() {
			return fmodifica;
		}

		public void setFmodifica(String fmodifica) {
			this.fmodifica = fmodifica;
		}

		public String getUmodifica() {
			return umodifica;
		}

		public void setUmodifica(String umodifica) {
			this.umodifica = umodifica;
		}

		public BigInteger getEstatus() {
			return estatus;
		}

		public void setEstatus(BigInteger estatus) {
			this.estatus = estatus;
		}

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
			result = prime * result + ((estatus == null) ? 0 : estatus.hashCode());
			result = prime * result + ((falta == null) ? 0 : falta.hashCode());
			result = prime * result + ((fmodifica == null) ? 0 : fmodifica.hashCode());
			result = prime * result + ((idrol == null) ? 0 : idrol.hashCode());
			result = prime * result + ((ualta == null) ? 0 : ualta.hashCode());
			result = prime * result + ((umodifica == null) ? 0 : umodifica.hashCode());
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
			RolesVO other = (RolesVO) obj;
			if (descripcion == null) {
				if (other.descripcion != null)
					return false;
			} else if (!descripcion.equals(other.descripcion))
				return false;
			if (estatus == null) {
				if (other.estatus != null)
					return false;
			} else if (!estatus.equals(other.estatus))
				return false;
			if (falta == null) {
				if (other.falta != null)
					return false;
			} else if (!falta.equals(other.falta))
				return false;
			if (fmodifica == null) {
				if (other.fmodifica != null)
					return false;
			} else if (!fmodifica.equals(other.fmodifica))
				return false;
			if (idrol == null) {
				if (other.idrol != null)
					return false;
			} else if (!idrol.equals(other.idrol))
				return false;
			if (ualta == null) {
				if (other.ualta != null)
					return false;
			} else if (!ualta.equals(other.ualta))
				return false;
			if (umodifica == null) {
				if (other.umodifica != null)
					return false;
			} else if (!umodifica.equals(other.umodifica))
				return false;
			return true;
		}

		@Override
		public String toString() {
			return "RolesVO [idrol=" + idrol + ", descripcion=" + descripcion + ", falta=" + falta + ", ualta=" + ualta
					+ ", fmodifica=" + fmodifica + ", umodifica=" + umodifica + ", estatus=" + estatus + "]";
		}
	    
	    
}
