/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.baz.commons.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
@Entity
@Table(name = "CAT_FUENTE")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatFuente.findAll", query = "SELECT c FROM CatFuente c"),
    @NamedQuery(name = "CatFuente.findByIdFuente", query = "SELECT c FROM CatFuente c WHERE c.idFuente = :idFuente"),
    @NamedQuery(name = "CatFuente.findByIdAgrupador", query = "SELECT c FROM CatFuente c WHERE c.idAgrupador = :idAgrupador"),
    @NamedQuery(name = "CatFuente.findByIdNivel", query = "SELECT c FROM CatFuente c WHERE c.idNivel = :idNivel"),
    @NamedQuery(name = "CatFuente.findByIdCedula", query = "SELECT c FROM CatFuente c WHERE c.idCedula = :idCedula"),
    @NamedQuery(name = "CatFuente.findByEstatus", query = "SELECT c FROM CatFuente c WHERE c.estatus = :estatus"),
    @NamedQuery(name = "CatFuente.findByFechaAlta", query = "SELECT c FROM CatFuente c WHERE c.fechaAlta = :fechaAlta"),
    @NamedQuery(name = "CatFuente.findByUsrAlta", query = "SELECT c FROM CatFuente c WHERE c.usrAlta = :usrAlta"),
    @NamedQuery(name = "CatFuente.findByFechaMod", query = "SELECT c FROM CatFuente c WHERE c.fechaMod = :fechaMod"),
    @NamedQuery(name = "CatFuente.findByUsrMod", query = "SELECT c FROM CatFuente c WHERE c.usrMod = :usrMod"),
    @NamedQuery(name = "CatFuente.findByStore", query = "SELECT c FROM CatFuente c WHERE c.store = :store"),
    @NamedQuery(name = "CatFuente.findByOrden", query = "SELECT c FROM CatFuente c WHERE c.orden = :orden")})
public class CatFuente implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "ID_FUENTE")
    private BigDecimal idFuente;
    @Basic(optional = false)
    @Column(name = "ID_AGRUPADOR")
    private BigInteger idAgrupador;
    @Basic(optional = false)
    @Column(name = "ID_NIVEL")
    private BigInteger idNivel;
    @Column(name = "ID_CEDULA")
    private BigInteger idCedula;
    @Basic(optional = false)
    @Column(name = "ESTATUS")
    private short estatus;
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
    @Column(name = "STORE")
    private String store;
    @Column(name = "ORDEN")
    private Double orden;
    @JoinColumn(name = "ID_ETAPA", referencedColumnName = "ID_ETAPA")
    @ManyToOne(optional = false)
    private CatEtapa idEtapa;
    @JoinColumn(name = "ID_FACE", referencedColumnName = "ID_FACE")
    @ManyToOne(optional = false)
    private CatFace idFace;

    public CatFuente() {
    }

    public CatFuente(BigDecimal idFuente) {
        this.idFuente = idFuente;
    }

    public CatFuente(BigDecimal idFuente, BigInteger idAgrupador, BigInteger idNivel, short estatus) {
        this.idFuente = idFuente;
        this.idAgrupador = idAgrupador;
        this.idNivel = idNivel;
        this.estatus = estatus;
    }

    public BigDecimal getIdFuente() {
        return idFuente;
    }

    public void setIdFuente(BigDecimal idFuente) {
        this.idFuente = idFuente;
    }

    public BigInteger getIdAgrupador() {
        return idAgrupador;
    }

    public void setIdAgrupador(BigInteger idAgrupador) {
        this.idAgrupador = idAgrupador;
    }

    public BigInteger getIdNivel() {
        return idNivel;
    }

    public void setIdNivel(BigInteger idNivel) {
        this.idNivel = idNivel;
    }

    public BigInteger getIdCedula() {
        return idCedula;
    }

    public void setIdCedula(BigInteger idCedula) {
        this.idCedula = idCedula;
    }

    public short getEstatus() {
        return estatus;
    }

    public void setEstatus(short estatus) {
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

    public String getStore() {
        return store;
    }

    public void setStore(String store) {
        this.store = store;
    }

    public Double getOrden() {
        return orden;
    }

    public void setOrden(Double orden) {
        this.orden = orden;
    }

    public CatEtapa getIdEtapa() {
        return idEtapa;
    }

    public void setIdEtapa(CatEtapa idEtapa) {
        this.idEtapa = idEtapa;
    }

    public CatFace getIdFace() {
        return idFace;
    }

    public void setIdFace(CatFace idFace) {
        this.idFace = idFace;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idFuente != null ? idFuente.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatFuente)) {
            return false;
        }
        CatFuente other = (CatFuente) object;
        if ((this.idFuente == null && other.idFuente != null) || (this.idFuente != null && !this.idFuente.equals(other.idFuente))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatFuente[ idFuente=" + idFuente + " ]";
    }
    
}
