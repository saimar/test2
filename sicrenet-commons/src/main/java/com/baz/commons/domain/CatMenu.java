/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.baz.commons.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author B196785
 */
@Entity
@Table(name = "CAT_MENU")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatMenu.findAll", query = "SELECT c FROM CatMenu c"),
    @NamedQuery(name = "CatMenu.findByIdmenu", query = "SELECT c FROM CatMenu c WHERE c.idmenu = :idmenu"),
    @NamedQuery(name = "CatMenu.findByIdpadre", query = "SELECT c FROM CatMenu c WHERE c.idpadre = :idpadre"),
    @NamedQuery(name = "CatMenu.findByDescripcion", query = "SELECT c FROM CatMenu c WHERE c.descripcion = :descripcion"),
    @NamedQuery(name = "CatMenu.findByUrl", query = "SELECT c FROM CatMenu c WHERE c.url = :url"),
    @NamedQuery(name = "CatMenu.findByPosicion", query = "SELECT c FROM CatMenu c WHERE c.posicion = :posicion"),
    @NamedQuery(name = "CatMenu.findByFalta", query = "SELECT c FROM CatMenu c WHERE c.falta = :falta"),
    @NamedQuery(name = "CatMenu.findByUalta", query = "SELECT c FROM CatMenu c WHERE c.ualta = :ualta"),
    @NamedQuery(name = "CatMenu.findByIdpadreEstatus", query = "SELECT c FROM CatMenu c WHERE c.idpadre = :idpadre AND "
														+ " c.estatus = :estatus"),
    @NamedQuery(name = "CatMenu.findByFmodifica", query = "SELECT c FROM CatMenu c WHERE c.fmodifica = :fmodifica"),
    @NamedQuery(name = "CatMenu.findByUmodifica", query = "SELECT c FROM CatMenu c WHERE c.umodifica = :umodifica"),
    @NamedQuery(name = "CatMenu.findByEstatus", query = "SELECT c FROM CatMenu c WHERE c.estatus = :estatus")})
	
public class CatMenu implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "IDMENU")
    private BigDecimal idmenu;
    @Column(name = "IDPADRE")
    private BigInteger idpadre;
    @Column(name = "DESCRIPCION")
    private String descripcion;
    @Column(name = "URL")
    private String url;
    @Column(name = "POSICION")
    private BigInteger posicion;
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
    private Long estatus;

  
    
    public CatMenu() {
    }
    
   
    public CatMenu(int idmenu, int idpadre, String descripcion, String url, int posicion) {
    	this.idmenu= new BigDecimal(idmenu);
    	this.idpadre= BigInteger.valueOf(idpadre);
    	this.descripcion= descripcion;
    	this.url= url;
    	this.posicion=  BigInteger.valueOf(posicion);
	}

    public CatMenu(BigDecimal idmenu) {
        this.idmenu = idmenu;
    }

    public CatMenu(BigDecimal idmenu, String falta) {
        this.idmenu = idmenu;
        this.falta = falta;
    }

   
	public BigDecimal getIdmenu() {
        return idmenu;
    }

    public void setIdmenu(BigDecimal idmenu) {
        this.idmenu = idmenu;
    }

    public BigInteger getIdpadre() {
        return idpadre;
    }

    public void setIdpadre(BigInteger idpadre) {
        this.idpadre = idpadre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public BigInteger getPosicion() {
        return posicion;
    }

    public void setPosicion(BigInteger posicion) {
        this.posicion = posicion;
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

    public Long getEstatus() {
        return estatus;
    }

    public void setEstatus(Long estatus) {
        this.estatus = estatus;
    }
    
    


	@Override
    public int hashCode() {
        int hash = 0;
        hash += (idmenu != null ? idmenu.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatMenu)) {
            return false;
        }
        CatMenu other = (CatMenu) object;
        if ((this.idmenu == null && other.idmenu != null) || (this.idmenu != null && !this.idmenu.equals(other.idmenu))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatMenu[ idmenu=" + idmenu + " ]";
    }
    
}
