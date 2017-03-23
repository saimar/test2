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
@Table(name = "CAT_ETAPA")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatEtapa.findAll", query = "SELECT c FROM CatEtapa c"),
    @NamedQuery(name = "CatEtapa.findByIdEtapa", query = "SELECT c FROM CatEtapa c WHERE c.idEtapa = :idEtapa"),
    @NamedQuery(name = "CatEtapa.findByNombre", query = "SELECT c FROM CatEtapa c WHERE c.nombre = :nombre"),
    @NamedQuery(name = "CatEtapa.findByDescripcion", query = "SELECT c FROM CatEtapa c WHERE c.descripcion = :descripcion")})
public class CatEtapa implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "ID_ETAPA")
    private BigDecimal idEtapa;
    @Basic(optional = false)
    @Column(name = "NOMBRE")
    private String nombre;
    @Basic(optional = false)
    @Column(name = "DESCRIPCION")
    private String descripcion;
    @OneToMany(mappedBy = "idEtapa")
    private Collection<CatFace> catFaceCollection;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idEtapa")
    private Collection<CatFuente> catFuenteCollection;
    
    private int estatus;
    
    private String fechaAlta;
    
    private String userAlta;
    
    private String fechaModifica;
    
    private String usrModifica;
    
    
    public CatEtapa() {
    }

    public CatEtapa(BigDecimal idEtapa) {
        this.idEtapa = idEtapa;
    }

    public CatEtapa(BigDecimal idEtapa, String nombre, String descripcion) {
        this.idEtapa = idEtapa;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
    
    public CatEtapa(BigDecimal idEtapa, String nombre, String descripcion, int estatus){
    	this.idEtapa = idEtapa;
    	this.nombre = nombre;
    	this.descripcion = descripcion;
    	this.estatus = estatus;
    }

    public BigDecimal getIdEtapa() {
        return idEtapa;
    }

    public void setIdEtapa(BigDecimal idEtapa) {
        this.idEtapa = idEtapa;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    @XmlTransient
    public Collection<CatFace> getCatFaceCollection() {
        return catFaceCollection;
    }

    public void setCatFaceCollection(Collection<CatFace> catFaceCollection) {
        this.catFaceCollection = catFaceCollection;
    }

    @XmlTransient
    public Collection<CatFuente> getCatFuenteCollection() {
        return catFuenteCollection;
    }

    public void setCatFuenteCollection(Collection<CatFuente> catFuenteCollection) {
        this.catFuenteCollection = catFuenteCollection;
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

	public String getUserAlta() {
		return userAlta;
	}

	public void setUserAlta(String userAlta) {
		this.userAlta = userAlta;
	}

	public String getFechaModifica() {
		return fechaModifica;
	}

	public void setFechaModifica(String fechaModifica) {
		this.fechaModifica = fechaModifica;
	}

	public String getUsrModifica() {
		return usrModifica;
	}

	public void setUsrModifica(String usrModifica) {
		this.usrModifica = usrModifica;
	}

	@Override
    public int hashCode() {
        int hash = 0;
        hash += (idEtapa != null ? idEtapa.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatEtapa)) {
            return false;
        }
        CatEtapa other = (CatEtapa) object;
        if ((this.idEtapa == null && other.idEtapa != null) || (this.idEtapa != null && !this.idEtapa.equals(other.idEtapa))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatEtapa[ idEtapa=" + idEtapa + " ]";
    }
    
}
