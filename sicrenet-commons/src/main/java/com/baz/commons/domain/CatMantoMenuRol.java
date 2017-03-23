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
* @author B197816
*/
@Entity
@Table(name = "MANTO_MENU_ROL")
@XmlRootElement
@NamedQueries({
   @NamedQuery(name = "CatMantoMenuRol.findAll", query = "SELECT c FROM CatMantoMenuRol c"),
   @NamedQuery(name = "CatMantoMenuRol.findByIdIdmanto_mr", query = "SELECT c FROM CatMantoMenuRol c WHERE c.idmanto_mr = :idmanto_mr"),
   @NamedQuery(name = "CatMantoMenuRol.findByIdrol", query = "SELECT c FROM CatMantoMenuRol c WHERE c.idrol = :idrol"),
   @NamedQuery(name = "CatMantoMenuRol.findByIdmenu", query = "SELECT c FROM CatMantoMenuRol c WHERE c.idmenu = :idmenu"),
   @NamedQuery(name = "CatMantoMenuRol.findByEstatus", query = "SELECT c FROM CatMantoMenuRol c WHERE c.estatus = :estatus")})
public class CatMantoMenuRol implements Serializable{

	private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "IDMANTO_MR")
    private BigDecimal idmanto_mr;
    @Column(name = "IDROL")
    private BigDecimal idrol;
    @Basic(optional = false)
    @Column(name = "IDMENU")
    private BigDecimal idmenu;
    @Column(name = "ESTATUS")
    private BigDecimal estatus;
    private String descripcion;
    
    public CatMantoMenuRol(){
    	
    }
    
    public CatMantoMenuRol(int idmanto_mr,int idrol, int idmenu, int estatus){
    	this.idmanto_mr=new BigDecimal(idmanto_mr);
    	this.idrol=new BigDecimal(idrol);
    	this.idmenu=new BigDecimal(idmenu);
    	this.estatus=new BigDecimal(estatus);
    }
	
    public CatMantoMenuRol(int idrol,int idmenu,String descripcion){
    	
    	this.idrol=new BigDecimal(idrol);
    	this.idmenu=new BigDecimal(idmenu);
    	this.descripcion=descripcion;
    }
    
    public CatMantoMenuRol(int idrol,int idmenu,String descripcion, int estatus){
    	
    	this.idrol=new BigDecimal(idrol);
    	this.idmenu=new BigDecimal(idmenu);
    	this.descripcion=descripcion;
    	this.estatus=new BigDecimal(estatus);
    }
    
    public BigDecimal getIdmanto_mr() {
		return idmanto_mr;
	}


	public void setIdmanto_mr(BigDecimal idmanto_mr) {
		this.idmanto_mr = idmanto_mr;
	}


	public BigDecimal getIdrol() {
		return idrol;
	}


	public void setIdrol(BigDecimal idrol) {
		this.idrol = idrol;
	}


	public BigDecimal getIdmenu() {
		return idmenu;
	}


	public void setIdmenu(BigDecimal idmenu) {
		this.idmenu = idmenu;
	}


	public BigDecimal getEstatus() {
		return estatus;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public void setEstatus(BigDecimal estatus) {
		this.estatus = estatus;
	}

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idmanto_mr != null ? idmanto_mr.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatMantoMenuRol)) {
            return false;
        }
        CatMantoMenuRol other = (CatMantoMenuRol) object;
        if ((this.idmanto_mr == null && other.idmanto_mr != null) || (this.idmanto_mr != null && !this.idmanto_mr.equals(other.idmanto_mr))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatManto_MenuRol[ idrol=" + idmanto_mr + " ]";
    }
    
    
}
