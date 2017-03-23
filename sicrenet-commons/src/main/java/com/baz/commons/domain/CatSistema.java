/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.baz.commons.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author B196785
 */
@Entity
@Table(name = "CAT_SISTEMA")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatSistema.findAll", query = "SELECT c FROM CatSistema c"),
    @NamedQuery(name = "CatSistema.findByIdSist", query = "SELECT c FROM CatSistema c WHERE c.idSist = :idSist"),
    @NamedQuery(name = "CatSistema.findByNombre", query = "SELECT c FROM CatSistema c WHERE c.nombre = :nombre"),
    @NamedQuery(name = "CatSistema.findBySistema", query = "SELECT c FROM CatSistema c WHERE c.sistema = :sistema"),
    @NamedQuery(name = "CatSistema.findByEstatus", query = "SELECT c FROM CatSistema c WHERE c.estatus = :estatus"),
    @NamedQuery(name = "CatSistema.findByOrigen", query = "SELECT c FROM CatSistema c WHERE c.origen = :origen"),
    @NamedQuery(name = "CatSistema.findByFechaAlta", query = "SELECT c FROM CatSistema c WHERE c.fechaAlta = :fechaAlta"),
    @NamedQuery(name = "CatSistema.findByUsrAlta", query = "SELECT c FROM CatSistema c WHERE c.usrAlta = :usrAlta"),
    @NamedQuery(name = "CatSistema.findByFechaMod", query = "SELECT c FROM CatSistema c WHERE c.fechaMod = :fechaMod"),
    @NamedQuery(name = "CatSistema.findByUsrMod", query = "SELECT c FROM CatSistema c WHERE c.usrMod = :usrMod")})
public class CatSistema implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "ID_SIST")
    private BigDecimal idSist;
    @Basic(optional = false)
    @Column(name = "NOMBRE")
    private String nombre;
    @Basic(optional = false)
    @Column(name = "SISTEMA")
    private String sistema;
    @Basic(optional = false)
    @Column(name = "ESTATUS")
    private short estatus;
    @Column(name = "ORIGEN")
    private String origen;
    @Column(name = "FECHA_ALTA")
    private String fechaAlta;
    @Column(name = "USR_ALTA")
    private String usrAlta;
    @Column(name = "FECHA_MOD")
    private String fechaMod;
    @Column(name = "USR_MOD")
    private String usrMod;
//    @OneToMany(mappedBy = "idSist")
//    private Collection<CatCedula> catCedulaCollection;

    public CatSistema() {
    }

    public CatSistema(BigDecimal idSist) {
        this.idSist = idSist;
    }

    public CatSistema(BigDecimal idSist, String nombre, String sistema, short estatus) {
        this.idSist = idSist;
        this.nombre = nombre;
        this.sistema = sistema;
        this.estatus = estatus;
    }

    public BigDecimal getIdSist() {
        return idSist;
    }

    public void setIdSist(BigDecimal idSist) {
        this.idSist = idSist;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSistema() {
        return sistema;
    }

    public void setSistema(String sistema) {
        this.sistema = sistema;
    }

    public short getEstatus() {
        return estatus;
    }

    public void setEstatus(short estatus) {
        this.estatus = estatus;
    }

    public String getOrigen() {
        return origen;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
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

//    @XmlTransient
//    public Collection<CatCedula> getCatCedulaCollection() {
//        return catCedulaCollection;
//    }
//
//    public void setCatCedulaCollection(Collection<CatCedula> catCedulaCollection) {
//        this.catCedulaCollection = catCedulaCollection;
//    }

    public CatSistema(BigDecimal idSist, String nombre, String sistema, String origen) {
		super();
		this.idSist = idSist;
		this.nombre = nombre;
		this.sistema = sistema;
		this.origen = origen;
	}

	@Override
    public int hashCode() {
        int hash = 0;
        hash += (idSist != null ? idSist.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatSistema)) {
            return false;
        }
        CatSistema other = (CatSistema) object;
        if ((this.idSist == null && other.idSist != null) || (this.idSist != null && !this.idSist.equals(other.idSist))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatSistema[ idSist=" + idSist + " ]";
    }
    
}
