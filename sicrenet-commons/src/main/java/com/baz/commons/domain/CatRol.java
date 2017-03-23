/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.baz.commons.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
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
@Table(name = "CAT_ROL")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatRol.findAll", query = "SELECT c FROM CatRol c"),
    @NamedQuery(name = "CatRol.findByIdrol", query = "SELECT c FROM CatRol c WHERE c.idrol = :idrol"),
    @NamedQuery(name = "CatRol.findByDescripcion", query = "SELECT c FROM CatRol c WHERE c.descripcion = :descripcion"),
    @NamedQuery(name = "CatRol.findByFalta", query = "SELECT c FROM CatRol c WHERE c.falta = :falta"),
    @NamedQuery(name = "CatRol.findByUalta", query = "SELECT c FROM CatRol c WHERE c.ualta = :ualta"),
    @NamedQuery(name = "CatRol.findByFmodifica", query = "SELECT c FROM CatRol c WHERE c.fmodifica = :fmodifica"),
    @NamedQuery(name = "CatRol.findByUmodifica", query = "SELECT c FROM CatRol c WHERE c.umodifica = :umodifica"),
    @NamedQuery(name = "CatRol.findByEstatus", query = "SELECT c FROM CatRol c WHERE c.estatus = :estatus")})
public class CatRol implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "IDROL")
    private BigDecimal idrol;
    @Column(name = "DESCRIPCION")
    private String descripcion;
    @Basic(optional = false)
    @Column(name = "FALTA")
    private String falta;
    @Column(name = "UALTA")
    private String ualta;
    @Column(name = "FMODIFICA")
    private String fmodifica;
    @Column(name = "UMODIFICA")
    private String umodifica;
    @Column(name = "ESTATUS")
    private BigInteger estatus;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idrol")
    private Collection<CatUsuarios> catUsuariosCollection;
    
    
    
    
    
    public CatRol() {
    }

    public CatRol(int idrol, String descripcion) {
		super();
		
		this.idrol = new BigDecimal(idrol);
		this.descripcion = descripcion;
		this.falta=null;
		this.ualta=null;
		this.fmodifica=null;
		this.umodifica=null;
		this.estatus=new BigInteger(String.valueOf(1));
		this.catUsuariosCollection=null;
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

    @XmlTransient
    public Collection<CatUsuarios> getCatUsuariosCollection() {
        return catUsuariosCollection;
    }

    public void setCatUsuariosCollection(Collection<CatUsuarios> catUsuariosCollection) {
        this.catUsuariosCollection = catUsuariosCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idrol != null ? idrol.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatRol)) {
            return false;
        }
        CatRol other = (CatRol) object;
        if ((this.idrol == null && other.idrol != null) || (this.idrol != null && !this.idrol.equals(other.idrol))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatRol[ idrol=" + idrol + " ]";
    }
    
}
