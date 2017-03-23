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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "CAT_FACE")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatFace.findAll", query = "SELECT c FROM CatFace c"),
    @NamedQuery(name = "CatFace.findByIdFace", query = "SELECT c FROM CatFace c WHERE c.idFace = :idFace"),
    @NamedQuery(name = "CatFace.findByNombre", query = "SELECT c FROM CatFace c WHERE c.nombre = :nombre"),
    @NamedQuery(name = "CatFace.findByDescripcion", query = "SELECT c FROM CatFace c WHERE c.descripcion = :descripcion")})
public class CatFace implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "ID_FACE")
    private BigDecimal idFace;
    @Basic(optional = false)
    @Column(name = "NOMBRE")
    private String nombre;
    @Basic(optional = false)
    @Column(name = "DESCRIPCION")
    private String descripcion;
    @Column(name = "ESTATUS")
    private int estatus;
    @JoinColumn(name = "ID_ETAPA", referencedColumnName = "ID_ETAPA")
    @ManyToOne
    private CatEtapa idEtapa;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idFace")
    private Collection<CatFuente> catFuenteCollection;

    public CatFace() {
    }

    public CatFace(BigDecimal idFace) {
        this.idFace = idFace;
    }

    public CatFace(BigDecimal idFace, String nombre, String descripcion) {
        this.idFace = idFace;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
    public CatFace(BigDecimal idFace, String nombre, String descripcion, int estatus ) {
        this.idFace = idFace;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estatus = estatus;
    }

    public BigDecimal getIdFace() {
        return idFace;
    }

    public void setIdFace(BigDecimal idFace) {
        this.idFace = idFace;
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
    

    public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

	public CatEtapa getIdEtapa() {
        return idEtapa;
    }

    public void setIdEtapa(CatEtapa idEtapa) {
        this.idEtapa = idEtapa;
    }

    @XmlTransient
    public Collection<CatFuente> getCatFuenteCollection() {
        return catFuenteCollection;
    }

    public void setCatFuenteCollection(Collection<CatFuente> catFuenteCollection) {
        this.catFuenteCollection = catFuenteCollection;
    }

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((catFuenteCollection == null) ? 0 : catFuenteCollection.hashCode());
		result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
		result = prime * result + estatus;
		result = prime * result + ((idEtapa == null) ? 0 : idEtapa.hashCode());
		result = prime * result + ((idFace == null) ? 0 : idFace.hashCode());
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
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
		CatFace other = (CatFace) obj;
		if (catFuenteCollection == null) {
			if (other.catFuenteCollection != null)
				return false;
		} else if (!catFuenteCollection.equals(other.catFuenteCollection))
			return false;
		if (descripcion == null) {
			if (other.descripcion != null)
				return false;
		} else if (!descripcion.equals(other.descripcion))
			return false;
		if (estatus != other.estatus)
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
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "CatFace [idFace=" + idFace + ", nombre=" + nombre + ", descripcion=" + descripcion + ", estatus="
				+ estatus + ", idEtapa=" + idEtapa + ", catFuenteCollection=" + catFuenteCollection + "]";
	}

  
    
}
