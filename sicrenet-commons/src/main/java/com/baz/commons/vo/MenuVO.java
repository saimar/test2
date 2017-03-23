package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class MenuVO implements Serializable{
	
	 private static final long serialVersionUID = 1L;
	  
	    private BigDecimal idmenu;
	    
	    private int idpadre;

	    private String descripcion;

	    private String url;

	    private int posicion;

	    private String falta;

	    private String ualta;

	    private String fmodifica;

	    private String umodifica;

	    private Long estatus;

	    private String descripcionMenu;
	    
	    private BigDecimal idROL;
	    
	    private String descripcionRol;
	    
	    private int statusMenuRol;
	    
	    private int  status;
	    
	    
	    public MenuVO(){
	    	
	    }
	    

	    public MenuVO(int status){
	    	this.status = status;
	    }
	 
	  

	    public MenuVO(BigDecimal idmenu, String descripcionMenu, BigDecimal idRol, String descripcionRol, int estatusMenuRol, String url){
	    	this.idmenu = idmenu;
	    	this.descripcionMenu = descripcionMenu;
	    	this.idROL = idRol;
	    	this.descripcionRol = descripcionRol;
	    	this.statusMenuRol = estatusMenuRol;
	    	this.url = url;
	    }




		public MenuVO(BigDecimal idmenu, int idpadre, String descripcion, String url, int posicion) {
			this.idmenu = idmenu;
			this.idpadre = idpadre;
			this.descripcion = descripcion;
			this.url = url;
			this.posicion = posicion;
		}




		public BigDecimal getIdmenu() {
			return idmenu;
		}




		public void setIdmenu(BigDecimal idmenu) {
			this.idmenu = idmenu;
		}




		public int getIdpadre() {
			return idpadre;
		}




		public void setIdpadre(int idpadre) {
			this.idpadre = idpadre;
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




		public int getPosicion() {
			return posicion;
		}




		public void setPosicion(int posicion) {
			this.posicion = posicion;
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




		public Long getEstatus() {
			return estatus;
		}




		public void setEstatus(Long estatus) {
			this.estatus = estatus;
		}




		public String getDescripcionMenu() {
			return descripcionMenu;
		}




		public void setDescripcionMenu(String descripcionMenu) {
			this.descripcionMenu = descripcionMenu;
		}




		public BigDecimal getIdROL() {
			return idROL;
		}




		public void setIdROL(BigDecimal idROL) {
			this.idROL = idROL;
		}




		public String getDescripcionRol() {
			return descripcionRol;
		}




		public void setDescripcionRol(String descripcionRol) {
			this.descripcionRol = descripcionRol;
		}




		public int getStatusMenuRol() {
			return statusMenuRol;
		}




		public void setStatusMenuRol(int statusMenuRol) {
			this.statusMenuRol = statusMenuRol;
		}




		public int getStatus() {
			return status;
		}




		public void setStatus(int status) {
			this.status = status;
		}




		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
			result = prime * result + ((descripcionMenu == null) ? 0 : descripcionMenu.hashCode());
			result = prime * result + ((descripcionRol == null) ? 0 : descripcionRol.hashCode());
			result = prime * result + ((estatus == null) ? 0 : estatus.hashCode());
			result = prime * result + ((falta == null) ? 0 : falta.hashCode());
			result = prime * result + ((fmodifica == null) ? 0 : fmodifica.hashCode());
			result = prime * result + ((idROL == null) ? 0 : idROL.hashCode());
			result = prime * result + ((idmenu == null) ? 0 : idmenu.hashCode());
			result = prime * result + idpadre;
			result = prime * result + posicion;
			result = prime * result + status;
			result = prime * result + statusMenuRol;
			result = prime * result + ((ualta == null) ? 0 : ualta.hashCode());
			result = prime * result + ((umodifica == null) ? 0 : umodifica.hashCode());
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
			MenuVO other = (MenuVO) obj;
			if (descripcion == null) {
				if (other.descripcion != null)
					return false;
			} else if (!descripcion.equals(other.descripcion))
				return false;
			if (descripcionMenu == null) {
				if (other.descripcionMenu != null)
					return false;
			} else if (!descripcionMenu.equals(other.descripcionMenu))
				return false;
			if (descripcionRol == null) {
				if (other.descripcionRol != null)
					return false;
			} else if (!descripcionRol.equals(other.descripcionRol))
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
			if (idROL == null) {
				if (other.idROL != null)
					return false;
			} else if (!idROL.equals(other.idROL))
				return false;
			if (idmenu == null) {
				if (other.idmenu != null)
					return false;
			} else if (!idmenu.equals(other.idmenu))
				return false;
			if (idpadre != other.idpadre)
				return false;
			if (posicion != other.posicion)
				return false;
			if (status != other.status)
				return false;
			if (statusMenuRol != other.statusMenuRol)
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
			if (url == null) {
				if (other.url != null)
					return false;
			} else if (!url.equals(other.url))
				return false;
			return true;
		}




		@Override
		public String toString() {
			return "MenuVO [idmenu=" + idmenu + ", idpadre=" + idpadre + ", descripcion=" + descripcion + ", url=" + url
					+ ", posicion=" + posicion + ", falta=" + falta + ", ualta=" + ualta + ", fmodifica=" + fmodifica
					+ ", umodifica=" + umodifica + ", estatus=" + estatus + ", descripcionMenu=" + descripcionMenu
					+ ", idROL=" + idROL + ", descripcionRol=" + descripcionRol + ", statusMenuRol=" + statusMenuRol
					+ ", status=" + status + "]";
		}

		

		
	
		

}
