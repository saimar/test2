package com.baz.commons.domain;

import java.io.Serializable;

/**
 *
 * @author B196785
 */

public class CatPanelView implements Serializable{

	/*
	 * To change this license header, choose License Headers in Project Properties.
	 * To change this template file, choose Tools | Templates
	 * and open the template in the editor.
	 */
	
	  
	    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

		private int idFuente;

	    private int idAgrupador;

	    private int idNivel;

	    private int idCedula;

	    private String estatus;

	    private int idEtapa;

	    private int idFace;

	    private String nombre;

	    private String clase;


	    public CatPanelView() {
	    	System.out.println("se construye el primer objeto:::");
			// TODO Auto-generated constructor stub
		}

		public CatPanelView(int idFuente, int idAgrupador, int idNivel, int idCedula,
				String estatus, int idEtapa, int idFace, String nombre, String clase) {
			System.out.println("se construye el segundo objeto:::" + idFuente);
			this.idFuente = idFuente;
			this.idAgrupador = idAgrupador;
			this.idNivel = idNivel;
			this.idCedula = idCedula;
			this.estatus = estatus;
			this.idEtapa = idEtapa;
			this.idFace = idFace;
			this.nombre = nombre;
			this.clase = clase;
		}

		public int getIdFuente() {
	        return idFuente;
	    }

	    public void setIdFuente(int idFuente) {
	        this.idFuente = idFuente;
	    }

	    public int getIdAgrupador() {
	        return idAgrupador;
	    }

	    public void setIdAgrupador(int idAgrupador) {
	        this.idAgrupador = idAgrupador;
	    }

	    public int getIdNivel() {
	        return idNivel;
	    }

	    public void setIdNivel(int idNivel) {
	        this.idNivel = idNivel;
	    }

	    public int getIdCedula() {
	        return idCedula;
	    }

	    public void setIdCedula(int idCedula) {
	        this.idCedula = idCedula;
	    }

	    public String getEstatus() {
	        return estatus;
	    }

	    public void setEstatus(String estatus) {
	        this.estatus = estatus;
	    }

	    public int getIdEtapa() {
	        return idEtapa;
	    }

	    public void setIdEtapa(int idEtapa) {
	        this.idEtapa = idEtapa;
	    }

	    public int getIdFace() {
	        return idFace;
	    }

	    public void setIdFace(int idFace) {
	        this.idFace = idFace;
	    }



	    public String getNombre	() {
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

		public static long getSerialversionuid() {
			return serialVersionUID;
		}

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((clase == null) ? 0 : clase.hashCode());
			result = prime * result + ((estatus == null) ? 0 : estatus.hashCode());
			result = prime * result + idAgrupador;
			result = prime * result + idCedula;
			result = prime * result + idEtapa;
			result = prime * result + idFace;
			result = prime * result + idFuente;
			result = prime * result + idNivel;
			result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
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
			CatPanelView other = (CatPanelView) obj;
			if (clase == null) {
				if (other.clase != null)
					return false;
			} else if (!clase.equals(other.clase))
				return false;
			if (estatus == null) {
				if (other.estatus != null)
					return false;
			} else if (!estatus.equals(other.estatus))
				return false;
			if (idAgrupador != other.idAgrupador)
				return false;
			if (idCedula != other.idCedula)
				return false;
			if (idEtapa != other.idEtapa)
				return false;
			if (idFace != other.idFace)
				return false;
			if (idFuente != other.idFuente)
				return false;
			if (idNivel != other.idNivel)
				return false;
			if (nombre == null) {
				if (other.nombre != null)
					return false;
			} else if (!nombre.equals(other.nombre))
				return false;
			return true;
		}

		@Override
		public String toString() {
			return "CatPanelView [idFuente=" + idFuente + ", idAgrupador=" + idAgrupador + ", idNivel=" + idNivel
					+ ", idCedula=" + idCedula + ", estatus=" + estatus + ", idEtapa=" + idEtapa + ", idFace=" + idFace
					+ ", nombre=" + nombre + ", clase=" + clase + "]";
		}

	    
	}

