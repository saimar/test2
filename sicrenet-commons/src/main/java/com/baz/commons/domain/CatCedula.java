/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.baz.commons.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author B196785
 */



public class CatCedula implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation


    private BigDecimal idCedula;
    private String titulo;
    private String nombre;
    private String contenido;
    private String factor;
    private String proceso;
    private String descProc;
    private String fdescarga;
    private String fdespredefinida;
    private String rfinicio;
    private String rffin;
    private String historico;
    private Date fechaAlta;
    private String usrAlta;
    private Date fechaMod;
    private Short estatus;
    private String layout;
    private String archivoMaestro;
    private String usrMod;
    private BigDecimal idRespnsable;
    private BigDecimal idArea;
//    private String responsable;
//    private String areaResponsable;
    private String nombreSistema;
    private BigDecimal idSistema;
    private String origen;

    public CatCedula() {
    }
    
    

    public CatCedula(BigDecimal idCedula, String nombre, String fdescarga, String fdespredefinida) {
		super();
		this.idCedula = idCedula;
		this.nombre = nombre;
		this.fdescarga = fdescarga;
		this.fdespredefinida = fdespredefinida;
	}



	public CatCedula(BigDecimal idCedula, String titulo, String nombre, String nombreSistema, BigDecimal idSistema, String origen, 
    		String contenido, String factor, String proceso, String descProc, String fdescarga, String fdespredefinida, 
    		String rfinicio, String rffin, String historico,   short estatus,
    		BigDecimal idResponsable, BigDecimal idArea, String layout,
			String archivoMaestro ) {
		super();
		this.idCedula = idCedula;
		this.titulo = titulo;
		this.nombre = nombre;
		this.nombreSistema = nombreSistema;
		this.idSistema = idSistema;
		this.origen = origen;
		this.contenido = contenido;
		this.factor = factor;
		this.proceso = proceso;
		this.descProc = descProc;
		this.fdescarga = fdescarga;
		this.fdespredefinida = fdespredefinida;
		this.rfinicio = rfinicio;
		this.rffin = rffin;
		this.historico = historico;
		this.estatus = estatus;
		this.layout = layout;
		this.archivoMaestro = archivoMaestro;
		this.idArea = idArea;
		this.idRespnsable = idResponsable;
//		this.responsable = responsable;
//		this.areaResponsable = areaResponsable;
	}

    
    
	public CatCedula(BigDecimal idCedula) {
        this.idCedula = idCedula;
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

    public String getDescProc() {
        return descProc;
    }

    public void setDescProc(String descProc) {
        this.descProc = descProc;
    }

    public String getFdescarga() {
        return fdescarga;
    }

    public void setFdescarga(String fdescarga) {
        this.fdescarga = fdescarga;
    }

    public String getFdespredefinida() {
        return fdespredefinida;
    }

    public void setFdespredefinida(String fdespredefinida) {
        this.fdespredefinida = fdespredefinida;
    }

    public String getRfinicio() {
        return rfinicio;
    }

    public void setRfinicio(String rfinicio) {
        this.rfinicio = rfinicio;
    }

    public String getRffin() {
        return rffin;
    }

    public void setRffin(String rffin) {
        this.rffin = rffin;
    }

    public String getHistorico() {
        return historico;
    }

    public void setHistorico(String historico) {
        this.historico = historico;
    }

    public Date getFechaAlta() {
        return fechaAlta;
    }

    public void setFechaAlta(Date fechaAlta) {
        this.fechaAlta = fechaAlta;
    }

    public String getUsrAlta() {
        return usrAlta;
    }

    public void setUsrAlta(String usrAlta) {
        this.usrAlta = usrAlta;
    }

    public Date getFechaMod() {
        return fechaMod;
    }

    public void setFechaMod(Date fechaMod) {
        this.fechaMod = fechaMod;
    }

    public Short getEstatus() {
        return estatus;
    }

    public void setEstatus(Short estatus) {
        this.estatus = estatus;
    }

    public String getLayout() {
        return layout;
    }

    public void setLayout(String layout) {
        this.layout = layout;
    }

    public String getArchivoMaestro() {
        return archivoMaestro;
    }

    public void setArchivoMaestro(String archivoMaestro) {
        this.archivoMaestro = archivoMaestro;
    }

    public String getUsrMod() {
        return usrMod;
    }

    public void setUsrMod(String usrMod) {
        this.usrMod = usrMod;
    }

   

//	public String getResponsable() {
//		return responsable;
//	}
//
//	public void setResponsable(String responsable) {
//		this.responsable = responsable;
//	}
//
//	public String getAreaResponsable() {
//		return areaResponsable;
//	}
//
//	public void setAreaResponsable(String areaResponsable) {
//		this.areaResponsable = areaResponsable;
//	}

	public String getNombreSistema() {
		return nombreSistema;
	}

	public void setNombreSistema(String nombreSistema) {
		this.nombreSistema = nombreSistema;
	}

	public BigDecimal getIdSistema() {
		return idSistema;
	}

	public void setIdSistema(BigDecimal idSistema) {
		this.idSistema = idSistema;
	}

	public String getOrigen() {
		return origen;
	}

	public void setOrigen(String origen) {
		this.origen = origen;
	}

	public BigDecimal getIdRespnsable() {
		return idRespnsable;
	}

	public void setIdRespnsable(BigDecimal idRespnsable) {
		this.idRespnsable = idRespnsable;
	}

	public BigDecimal getIdArea() {
		return idArea;
	}

	public void setIdArea(BigDecimal idArea) {
		this.idArea = idArea;
	}
    
}
