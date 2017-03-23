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
@Table(name = "CAT_AREA")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatArea.findAll", query = "SELECT c FROM CatArea c"),
    @NamedQuery(name = "CatArea.findByIdArea", query = "SELECT c FROM CatArea c WHERE c.idArea = :idArea"),
    @NamedQuery(name = "CatArea.findByDescripcion", query = "SELECT c FROM CatArea c WHERE c.descripcion = :descripcion"),
    @NamedQuery(name = "CatArea.findByEstatus", query = "SELECT c FROM CatArea c WHERE c.estatus = :estatus"),
    @NamedQuery(name = "CatArea.findByFechaAlta", query = "SELECT c FROM CatArea c WHERE c.fechaAlta = :fechaAlta"),
    @NamedQuery(name = "CatArea.findByUsrAlta", query = "SELECT c FROM CatArea c WHERE c.usrAlta = :usrAlta"),
    @NamedQuery(name = "CatArea.findByFechaMod", query = "SELECT c FROM CatArea c WHERE c.fechaMod = :fechaMod"),
    @NamedQuery(name = "CatArea.findByUsrMod", query = "SELECT c FROM CatArea c WHERE c.usrMod = :usrMod")})
public class CatArea implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "ID_AREA")
    private BigDecimal idArea;
    @Column(name = "DESCRIPCION")
    private String descripcion;
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
//    @OneToMany(mappedBy = "idArea")
//    private Collection<CatCedula> catCedulaCollection;

    public CatArea() {
    }
    
    

    public CatArea(BigDecimal idArea, String descripcion) {
	super();
	this.idArea = idArea;
	this.descripcion = descripcion;
}



	public CatArea(BigDecimal idArea) {
        this.idArea = idArea;
    }

    public CatArea(BigDecimal idArea, short estatus) {
        this.idArea = idArea;
        this.estatus = estatus;
    }

    public BigDecimal getIdArea() {
        return idArea;
    }

    public void setIdArea(BigDecimal idArea) {
        this.idArea = idArea;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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
        hash += (idArea != null ? idArea.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatArea)) {
            return false;
        }
        CatArea other = (CatArea) object;
        if ((this.idArea == null && other.idArea != null) || (this.idArea != null && !this.idArea.equals(other.idArea))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatArea[ idArea=" + idArea + " ]";
    }
    
}
