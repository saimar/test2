package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class FuenteVO implements Serializable {

	private static final long serialVersionUID = 1L;

	private BigDecimal idFuente;

	private BigDecimal idAgrupador;

	private BigDecimal idNivel;

	private BigDecimal idCedula;

	private BigDecimal idFace;

	private BigDecimal idEtapa;

	private int estatus;

	private String fechaAlta;

	private String usrAlta;

	private String fechaMod;

	private String usrMod;

	private String store;

	private float orden;

	private String idConcepto;

	private String titulo;

	private String nombre;
	
	private String nivel;
	private String etapa;
	private String desEstatus;

	public FuenteVO() {

	}
	
	public FuenteVO(int estatus) {
		this.estatus = estatus;
	}
	
	
	

	public FuenteVO(BigDecimal idFuente, String nombre, BigDecimal idNivel, String nivel, BigDecimal idCedula, BigDecimal idFace, 
			BigDecimal idEtapa, String etapa,
			String store, float orden, String titulo, int estatus, String desEstatus) {
		
		this.idFuente = idFuente;
		this.nombre = nombre;
		this.idNivel = idNivel;
		this.nivel = nivel;
		this.idCedula = idCedula;
		this.idFace = idFace;
		this.idEtapa = idEtapa;
		this.etapa = etapa; 
		this.store = store;
		this.orden = orden;
		this.titulo = titulo;
		this.estatus = estatus;
		this.desEstatus = desEstatus;
	}





	public BigDecimal getIdFuente() {
		return idFuente;
	}

	public void setIdFuente(BigDecimal idFuente) {
		this.idFuente = idFuente;
	}

	public BigDecimal getIdAgrupador() {
		return idAgrupador;
	}

	public void setIdAgrupador(BigDecimal idAgrupador) {
		this.idAgrupador = idAgrupador;
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

	public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

	public String getFechaAlta() {
		return fechaAlta;
	}

	public void setFechaAlta(String fechaAlta) {
		this.fechaAlta = fechaAlta;
	}

	public String getUsrAlta() {
		return usrAlta;
	}

	public void setUsrAlta(String usrAlta) {
		this.usrAlta = usrAlta;
	}

	public String getFechaMod() {
		return fechaMod;
	}

	public void setFechaMod(String fechaMod) {
		this.fechaMod = fechaMod;
	}

	public String getUsrMod() {
		return usrMod;
	}

	public void setUsrMod(String usrMod) {
		this.usrMod = usrMod;
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

	public String getIdConcepto() {
		return idConcepto;
	}

	public void setIdConcepto(String idConcepto) {
		this.idConcepto = idConcepto;
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





	public String getNivel() {
		return nivel;
	}





	public void setNivel(String nivel) {
		this.nivel = nivel;
	}





	public String getEtapa() {
		return etapa;
	}





	public void setEtapa(String etapa) {
		this.etapa = etapa;
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
		result = prime * result + ((etapa == null) ? 0 : etapa.hashCode());
		result = prime * result + ((fechaAlta == null) ? 0 : fechaAlta.hashCode());
		result = prime * result + ((fechaMod == null) ? 0 : fechaMod.hashCode());
		result = prime * result + ((idAgrupador == null) ? 0 : idAgrupador.hashCode());
		result = prime * result + ((idCedula == null) ? 0 : idCedula.hashCode());
		result = prime * result + ((idConcepto == null) ? 0 : idConcepto.hashCode());
		result = prime * result + ((idEtapa == null) ? 0 : idEtapa.hashCode());
		result = prime * result + ((idFace == null) ? 0 : idFace.hashCode());
		result = prime * result + ((idFuente == null) ? 0 : idFuente.hashCode());
		result = prime * result + ((idNivel == null) ? 0 : idNivel.hashCode());
		result = prime * result + ((nivel == null) ? 0 : nivel.hashCode());
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		result = prime * result + Float.floatToIntBits(orden);
		result = prime * result + ((store == null) ? 0 : store.hashCode());
		result = prime * result + ((titulo == null) ? 0 : titulo.hashCode());
		result = prime * result + ((usrAlta == null) ? 0 : usrAlta.hashCode());
		result = prime * result + ((usrMod == null) ? 0 : usrMod.hashCode());
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
		FuenteVO other = (FuenteVO) obj;
		if (desEstatus == null) {
			if (other.desEstatus != null)
				return false;
		} else if (!desEstatus.equals(other.desEstatus))
			return false;
		if (estatus != other.estatus)
			return false;
		if (etapa == null) {
			if (other.etapa != null)
				return false;
		} else if (!etapa.equals(other.etapa))
			return false;
		if (fechaAlta == null) {
			if (other.fechaAlta != null)
				return false;
		} else if (!fechaAlta.equals(other.fechaAlta))
			return false;
		if (fechaMod == null) {
			if (other.fechaMod != null)
				return false;
		} else if (!fechaMod.equals(other.fechaMod))
			return false;
		if (idAgrupador == null) {
			if (other.idAgrupador != null)
				return false;
		} else if (!idAgrupador.equals(other.idAgrupador))
			return false;
		if (idCedula == null) {
			if (other.idCedula != null)
				return false;
		} else if (!idCedula.equals(other.idCedula))
			return false;
		if (idConcepto == null) {
			if (other.idConcepto != null)
				return false;
		} else if (!idConcepto.equals(other.idConcepto))
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
		if (idFuente == null) {
			if (other.idFuente != null)
				return false;
		} else if (!idFuente.equals(other.idFuente))
			return false;
		if (idNivel == null) {
			if (other.idNivel != null)
				return false;
		} else if (!idNivel.equals(other.idNivel))
			return false;
		if (nivel == null) {
			if (other.nivel != null)
				return false;
		} else if (!nivel.equals(other.nivel))
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
		if (usrAlta == null) {
			if (other.usrAlta != null)
				return false;
		} else if (!usrAlta.equals(other.usrAlta))
			return false;
		if (usrMod == null) {
			if (other.usrMod != null)
				return false;
		} else if (!usrMod.equals(other.usrMod))
			return false;
		return true;
	}





	@Override
	public String toString() {
		return "FuenteVO [idFuente=" + idFuente + ", idAgrupador=" + idAgrupador + ", idNivel=" + idNivel
				+ ", idCedula=" + idCedula + ", idFace=" + idFace + ", idEtapa=" + idEtapa + ", estatus=" + estatus
				+ ", fechaAlta=" + fechaAlta + ", usrAlta=" + usrAlta + ", fechaMod=" + fechaMod + ", usrMod=" + usrMod
				+ ", store=" + store + ", orden=" + orden + ", idConcepto=" + idConcepto + ", titulo=" + titulo
				+ ", nombre=" + nombre + ", nivel=" + nivel + ", etapa=" + etapa + ", desEstatus=" + desEstatus + "]";
	}

	



	
}
