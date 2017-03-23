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
@Table(name = "CAT_PAIS")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatPais.findAll", query = "SELECT c FROM CatPais c"),
    @NamedQuery(name = "CatPais.findByIdPais", query = "SELECT c FROM CatPais c WHERE c.idPais = :idPais"),
    @NamedQuery(name = "CatPais.findByDescripcion", query = "SELECT c FROM CatPais c WHERE c.nombre = :nombre"),
    @NamedQuery(name = "CatPais.findByUrl", query = "SELECT c FROM CatPais c WHERE c.url = :url"),
    @NamedQuery(name = "CatPais.findByPath", query = "SELECT c FROM CatPais c WHERE c.path = :path"),
    @NamedQuery(name = "CatPais.findByEstatus", query = "SELECT c FROM CatPais c WHERE c.estatus = :estatus")})
public class CatPais implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "ID_PAIS")
    private BigDecimal idPais;
    @Column(name = "NOMBRE")
    private String nombre;
    @Column(name = "URL")
    private String url;
    @Column(name = "PATH")
    private String path;
    @Column(name = "ESTATUS")
    private Long estatus;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idPais")
    private Collection<CatUsuarios> catUsuariosCollection;

    public CatPais() {
    }

    public CatPais(BigDecimal idPais) {
        this.idPais = idPais;
    }

    public BigDecimal getIdPais() {
        return idPais;
    }

    public void setIdPais(BigDecimal idPais) {
        this.idPais = idPais;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Long getEstatus() {
        return estatus;
    }

    public void setEstatus(Long estatus) {
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
        hash += (idPais != null ? idPais.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatPais)) {
            return false;
        }
        CatPais other = (CatPais) object;
        if ((this.idPais == null && other.idPais != null) || (this.idPais != null && !this.idPais.equals(other.idPais))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatPais[ idPais=" + idPais + " ]";
    }
    
}
