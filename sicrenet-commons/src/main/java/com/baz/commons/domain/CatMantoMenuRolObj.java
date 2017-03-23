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
   @NamedQuery(name = "CatMantoMenuRolObj.findAll", query = "SELECT c FROM CatMantoMenuRolObj c"),
   @NamedQuery(name = "CatMantoMenuRolObj.findByIdIdmanto_rb", query = "SELECT c FROM CatMantoMenuRolObj c WHERE c.idmanto_rb = :idmanto_rb"),
   @NamedQuery(name = "CatMantoMenuRolObj.findByIdrol", query = "SELECT c FROM CatMantoMenuRolObj c WHERE c.idrol = :idrol"),
   @NamedQuery(name = "CatMantoMenuRolObj.findByIdobjeto", query = "SELECT c FROM CatMantoMenuRolObj c WHERE c.idobjeto = :idobjeto"),
   @NamedQuery(name = "CatMantoMenuRolObj.findByIdextraccion", query = "SELECT c FROM CatMantoMenuRolObj c WHERE c.idextraccion = :idextraccion"),
   @NamedQuery(name = "CatMantoMenuRolObj.findByDescripcion", query = "SELECT c FROM CatMantoMenuRolObj c WHERE c.descripcion = :descripcion"),
   @NamedQuery(name = "CatMantoMenuRolObj.findByEstatus", query = "SELECT c FROM CatMantoMenuRolObj c WHERE c.estatus = :estatus")})

public class CatMantoMenuRolObj implements Serializable{

	private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "IDMANTO_RB")
    private BigDecimal idmanto_rb;
    @Column(name = "IDROL")
    private BigDecimal idrol;
    @Basic(optional = false)
    @Column(name = "IDOBJETO")
    private BigDecimal idobjeto;
    @Column(name = "ESTATUS")
    private BigDecimal estatus;
    @Column(name = "ID_EXTRACCION")
    private BigDecimal idextraccion;
    @Column(name = "DESCRIPCION")
    private String descripcion;
    
    public CatMantoMenuRolObj(){
    	
    }
    
    public CatMantoMenuRolObj(int idmanto_rb,int idrol, int idobjeto, int estatus){
    	this.idmanto_rb=new BigDecimal(idmanto_rb);
    	this.idrol=new BigDecimal(idrol);
    	this.idobjeto=new BigDecimal(idobjeto);
    	this.estatus=new BigDecimal(estatus);
    }
	
    public CatMantoMenuRolObj(int idobjeto,String descripcion){
    	this.idobjeto=new BigDecimal(idobjeto);
    	this.descripcion=descripcion;
    }
    
    public CatMantoMenuRolObj(int idrol,int idobjeto,String descripcion, int estatus){
    	
    	this.idrol=new BigDecimal(idrol);
    	this.idobjeto=new BigDecimal(idobjeto);
    	this.descripcion=descripcion;
    	this.estatus=new BigDecimal(estatus);
    }
    
    public BigDecimal getIdmanto_rb() {
		return idmanto_rb;
	}

	public BigDecimal getIdrol() {
		return idrol;
	}

	public void setIdrol(BigDecimal idrol) {
		this.idrol = idrol;
	}

	public BigDecimal getIdobjeto() {
		return idobjeto;
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

    public BigDecimal getIdextraccion() {
		return idextraccion;
	}

	public void setIdextraccion(BigDecimal idextraccion) {
		this.idextraccion = idextraccion;
	}

	public void setIdmanto_rb(BigDecimal idmanto_rb) {
		this.idmanto_rb = idmanto_rb;
	}

	public void setIdobjeto(BigDecimal idobjeto) {
		this.idobjeto = idobjeto;
	}

	@Override
    public int hashCode() {
        int hash = 0;
        hash += (idmanto_rb != null ? idmanto_rb.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatMantoMenuRolObj)) {
            return false;
        }
        CatMantoMenuRolObj other = (CatMantoMenuRolObj) object;
        if ((this.idmanto_rb == null && other.idmanto_rb != null) || (this.idmanto_rb != null && !this.idmanto_rb.equals(other.idmanto_rb))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatManto_MenuRolObj[ idrol=" + idmanto_rb + " ]";
    }
    
    
}
