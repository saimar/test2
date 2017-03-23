package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;

public class CedulaVO implements Serializable {

	private static final long serialVersionUID = 1L;

	private BigDecimal idCedula;
	private String titulo;
	private String nombre;
	private String contenido;
	private String factor;
	private String proceso;
	private String desc_proc;
	private String fDescarga;
	private String fDespredefinida;
	private String rFInicio;
	private String rFFin;
	private String historico;
	private int estatus;
	private BigDecimal idResponsable;
	private BigDecimal idArea;
	private int idSistema;
	private String nombre_1;
	private String descripcion;
	private String layout;
	private String archivo;
	
	private String sistema;
	private String desEstatus;

	public CedulaVO() {

	}
	

	public CedulaVO(BigDecimal idCedula, String titulo, String nombre, String contenido, String factor, String proceso,
			String desc_proc, String fDescarga, String fDespredefinida, String rFInicio, String rFFin, String historico,
			int estatus, BigDecimal idResponsable, BigDecimal idArea, int idSistema, String nombre_1,
			String descripcion, String sistema, String layout, String archivo, String desEstatus) {
		
		this.idCedula = idCedula;
		this.titulo = titulo;
		this.nombre = nombre;
		this.contenido = contenido;
		this.factor = factor;
		this.proceso = proceso;
		this.desc_proc = desc_proc;
		this.fDescarga = fDescarga;
		this.fDespredefinida = fDespredefinida;
		this.rFInicio = rFInicio;
		this.rFFin = rFFin;
		this.historico = historico;
		this.estatus = estatus;
		this.idResponsable = idResponsable;
		this.idArea = idArea;
		this.idSistema = idSistema;
		this.nombre_1 = nombre_1;
		this.descripcion = descripcion;
		this.sistema = sistema;
		this.layout = layout;
		this.archivo = archivo;
		this.desEstatus = desEstatus;
	}

	
	

	public BigDecimal getIdCedula() {
		return idCedula;
	}

	public void setIdCedula(BigDecimal idCedula) {
		this.idCedula = idCedula;
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

	public String getContenido() {
		return contenido;
	}

	public void setContenido(String contenido) {
		this.contenido = contenido;
	}

	public String getFactor() {
		return factor;
	}

	public void setFactor(String factor) {
		this.factor = factor;
	}

	public String getProceso() {
		return proceso;
	}

	public void setProceso(String proceso) {
		this.proceso = proceso;
	}

	public String getDesc_proc() {
		return desc_proc;
	}

	public void setDesc_proc(String desc_proc) {
		this.desc_proc = desc_proc;
	}

	public String getfDescarga() {
		return fDescarga;
	}

	public void setfDescarga(String fDescarga) {
		this.fDescarga = fDescarga;
	}

	public String getfDespredefinida() {
		return fDespredefinida;
	}

	public void setfDespredefinida(String fDespredefinida) {
		this.fDespredefinida = fDespredefinida;
	}

	public String getrFInicio() {
		return rFInicio;
	}

	public void setrFInicio(String rFInicio) {
		this.rFInicio = rFInicio;
	}

	public String getrFFin() {
		return rFFin;
	}

	public void setrFFin(String rFFin) {
		this.rFFin = rFFin;
	}

	public String getHistorico() {
		return historico;
	}

	public void setHistorico(String historico) {
		this.historico = historico;
	}

	public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

	public BigDecimal getIdResponsable() {
		return idResponsable;
	}

	public void setIdResponsable(BigDecimal idResponsable) {
		this.idResponsable = idResponsable;
	}

	public BigDecimal getIdArea() {
		return idArea;
	}

	public void setIdArea(BigDecimal idArea) {
		this.idArea = idArea;
	}

	public int getIdSistema() {
		return idSistema;
	}

	public void setIdSistema(int idSistema) {
		this.idSistema = idSistema;
	}

	public String getNombre_1() {
		return nombre_1;
	}

	public void setNombre_1(String nombre_1) {
		this.nombre_1 = nombre_1;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getLayout() {
		return layout;
	}

	public void setLayout(String layout) {
		this.layout = layout;
	}

	public String getArchivo() {
		return archivo;
	}

	public void setArchivo(String archivo) {
		this.archivo = archivo;
	}


	public String getSistema() {
		return sistema;
	}


	public void setSistema(String sistema) {
		this.sistema = sistema;
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
		result = prime * result + ((archivo == null) ? 0 : archivo.hashCode());
		result = prime * result + ((contenido == null) ? 0 : contenido.hashCode());
		result = prime * result + ((desEstatus == null) ? 0 : desEstatus.hashCode());
		result = prime * result + ((desc_proc == null) ? 0 : desc_proc.hashCode());
		result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
		result = prime * result + estatus;
		result = prime * result + ((fDescarga == null) ? 0 : fDescarga.hashCode());
		result = prime * result + ((fDespredefinida == null) ? 0 : fDespredefinida.hashCode());
		result = prime * result + ((factor == null) ? 0 : factor.hashCode());
		result = prime * result + ((historico == null) ? 0 : historico.hashCode());
		result = prime * result + ((idArea == null) ? 0 : idArea.hashCode());
		result = prime * result + ((idCedula == null) ? 0 : idCedula.hashCode());
		result = prime * result + ((idResponsable == null) ? 0 : idResponsable.hashCode());
		result = prime * result + idSistema;
		result = prime * result + ((layout == null) ? 0 : layout.hashCode());
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		result = prime * result + ((nombre_1 == null) ? 0 : nombre_1.hashCode());
		result = prime * result + ((proceso == null) ? 0 : proceso.hashCode());
		result = prime * result + ((rFFin == null) ? 0 : rFFin.hashCode());
		result = prime * result + ((rFInicio == null) ? 0 : rFInicio.hashCode());
		result = prime * result + ((sistema == null) ? 0 : sistema.hashCode());
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
		CedulaVO other = (CedulaVO) obj;
		if (archivo == null) {
			if (other.archivo != null)
				return false;
		} else if (!archivo.equals(other.archivo))
			return false;
		if (contenido == null) {
			if (other.contenido != null)
				return false;
		} else if (!contenido.equals(other.contenido))
			return false;
		if (desEstatus == null) {
			if (other.desEstatus != null)
				return false;
		} else if (!desEstatus.equals(other.desEstatus))
			return false;
		if (desc_proc == null) {
			if (other.desc_proc != null)
				return false;
		} else if (!desc_proc.equals(other.desc_proc))
			return false;
		if (descripcion == null) {
			if (other.descripcion != null)
				return false;
		} else if (!descripcion.equals(other.descripcion))
			return false;
		if (estatus != other.estatus)
			return false;
		if (fDescarga == null) {
			if (other.fDescarga != null)
				return false;
		} else if (!fDescarga.equals(other.fDescarga))
			return false;
		if (fDespredefinida == null) {
			if (other.fDespredefinida != null)
				return false;
		} else if (!fDespredefinida.equals(other.fDespredefinida))
			return false;
		if (factor == null) {
			if (other.factor != null)
				return false;
		} else if (!factor.equals(other.factor))
			return false;
		if (historico == null) {
			if (other.historico != null)
				return false;
		} else if (!historico.equals(other.historico))
			return false;
		if (idArea == null) {
			if (other.idArea != null)
				return false;
		} else if (!idArea.equals(other.idArea))
			return false;
		if (idCedula == null) {
			if (other.idCedula != null)
				return false;
		} else if (!idCedula.equals(other.idCedula))
			return false;
		if (idResponsable == null) {
			if (other.idResponsable != null)
				return false;
		} else if (!idResponsable.equals(other.idResponsable))
			return false;
		if (idSistema != other.idSistema)
			return false;
		if (layout == null) {
			if (other.layout != null)
				return false;
		} else if (!layout.equals(other.layout))
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		if (nombre_1 == null) {
			if (other.nombre_1 != null)
				return false;
		} else if (!nombre_1.equals(other.nombre_1))
			return false;
		if (proceso == null) {
			if (other.proceso != null)
				return false;
		} else if (!proceso.equals(other.proceso))
			return false;
		if (rFFin == null) {
			if (other.rFFin != null)
				return false;
		} else if (!rFFin.equals(other.rFFin))
			return false;
		if (rFInicio == null) {
			if (other.rFInicio != null)
				return false;
		} else if (!rFInicio.equals(other.rFInicio))
			return false;
		if (sistema == null) {
			if (other.sistema != null)
				return false;
		} else if (!sistema.equals(other.sistema))
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
		return "CedulaVO [idCedula=" + idCedula + ", titulo=" + titulo + ", nombre=" + nombre + ", contenido="
				+ contenido + ", factor=" + factor + ", proceso=" + proceso + ", desc_proc=" + desc_proc
				+ ", fDescarga=" + fDescarga + ", fDespredefinida=" + fDespredefinida + ", rFInicio=" + rFInicio
				+ ", rFFin=" + rFFin + ", historico=" + historico + ", estatus=" + estatus + ", idResponsable="
				+ idResponsable + ", idArea=" + idArea + ", idSistema=" + idSistema + ", nombre_1=" + nombre_1
				+ ", descripcion=" + descripcion + ", layout=" + layout + ", archivo=" + archivo + ", sistema="
				+ sistema + ", desEstatus=" + desEstatus + "]";
	}

	
	
	

}
