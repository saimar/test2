/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.baz.commons.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author B196785
 */
@Entity
@Table(name = "CAT_RESPONSABLE")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatResponsable.findAll", query = "SELECT c FROM CatResponsable c"),
    @NamedQuery(name = "CatResponsable.findByIdResp", query = "SELECT c FROM CatResponsable c WHERE c.idResp = :idResp"),
    @NamedQuery(name = "CatResponsable.findByNombre", query = "SELECT c FROM CatResponsable c WHERE c.nombre = :nombre"),
    @NamedQuery(name = "CatResponsable.findByExtencion", query = "SELECT c FROM CatResponsable c WHERE c.extencion = :extencion"),
    @NamedQuery(name = "CatResponsable.findByUbicacion", query = "SELECT c FROM CatResponsable c WHERE c.ubicacion = :ubicacion"),
    @NamedQuery(name = "CatResponsable.findByEstatus", query = "SELECT c FROM CatResponsable c WHERE c.estatus = :estatus"),
    @NamedQuery(name = "CatResponsable.findByFechaAlta", query = "SELECT c FROM CatResponsable c WHERE c.fechaAlta = :fechaAlta"),
    @NamedQuery(name = "CatResponsable.findByUsrAlta", query = "SELECT c FROM CatResponsable c WHERE c.usrAlta = :usrAlta"),
    @NamedQuery(name = "CatResponsable.findByFechaMod", query = "SELECT c FROM CatResponsable c WHERE c.fechaMod = :fechaMod"),
    @NamedQuery(name = "CatResponsable.findByUsrMod", query = "SELECT c FROM CatResponsable c WHERE c.usrMod = :usrMod"),
    @NamedQuery(name = "CatResponsable.findByNumeroempleado", query = "SELECT c FROM CatResponsable c WHERE c.numeroempleado = :numeroempleado")})
public class CatResponsable implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "ID_RESP")
    private BigDecimal idResp;
    @Basic(optional = false)
    @Column(name = "NOMBRE")
    private String nombre;
    @Basic(optional = false)
    @Column(name = "EXTENCION")
    private Long extencion;
    @Basic(optional = false)
    @Column(name = "UBICACION")
    private String ubicacion;
    @Basic(optional = false)
    @Column(name = "ESTATUS")
    private Long estatus;
    @Column(name = "FECHA_ALTA")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaAlta;
    @Column(name = "USR_ALTA")
    private String usrAlta;
    @Column(name = "FECHA_MOD")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaMod;
    @Column(name = "USR_MOD")
    private String usrMod;
    @Column(name = "NUMEROEMPLEADO")
    private String numeroempleado;
//    @OneToMany(mappedBy = "idResp")
//    private Collection<CatCedula> catCedulaCollection;

    public CatResponsable() {
    }

    public CatResponsable(BigDecimal idResp) {
        this.idResp = idResp;
    }

    public CatResponsable(BigDecimal idResp, String nombre, String numeroempleado, String ubicacion,  Long extencion, Long estatus) {
        this.idResp = idResp;
        this.nombre = nombre;
        this.extencion = extencion;
        this.ubicacion = ubicacion;
        this.estatus = estatus;
        this.numeroempleado = numeroempleado;
    }

    public BigDecimal getIdResp() {
        return idResp;
    }

    public void setIdResp(BigDecimal idResp) {
        this.idResp = idResp;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Long getExtencion() {
        return extencion;
    }

    public void setExtencion(Long extencion) {
        this.extencion = extencion;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public Long getEstatus() {
        return estatus;
    }

    public void setEstatus(Long estatus) {
        this.estatus = estatus;
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

    public String getUsrMod() {
        return usrMod;
    }

    public void setUsrMod(String usrMod) {
        this.usrMod = usrMod;
    }

    public String getNumeroempleado() {
        return numeroempleado;
    }

    public void setNumeroempleado(String numeroempleado) {
        this.numeroempleado = numeroempleado;
    }

//    @XmlTransient
//    public Collection<CatCedula> getCatCedulaCollection() {
//        return catCedulaCollection;
//    }
//
//    public void setCatCedulaCollection(Collection<CatCedula> catCedulaCollection) {
//        this.catCedulaCollection = catCedulaCollection;
//    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idResp != null ? idResp.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatResponsable)) {
            return false;
        }
        CatResponsable other = (CatResponsable) object;
        if ((this.idResp == null && other.idResp != null) || (this.idResp != null && !this.idResp.equals(other.idResp))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatResponsable[ idResp=" + idResp + " ]";
    }
    
}
