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
@Table(name = "CAT_PARAMETROS_SEGURIDAD")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatParametrosDeSeguridad.findAll", query = "SELECT c FROM CatParametrosDeSeguridad c"),
    @NamedQuery(name = "CatParametrosDeSeguridad.findByIdparametros", query = "SELECT c FROM CatParametrosDeSeguridad c WHERE c.idrol = :idrol"),
    @NamedQuery(name = "CatParametrosDeSeguridad.findByMaxlongpass", query = "SELECT c FROM CatParametrosDeSeguridad c WHERE c.descripcion = :descripcion"),
    @NamedQuery(name = "CatParametrosDeSeguridad.findByMinlongpAass", query = "SELECT c FROM CatParametrosDeSeguridad c WHERE c.falta = :falta"),
    @NamedQuery(name = "CatParametrosDeSeguridad.findByDiasvenpass", query = "SELECT c FROM CatParametrosDeSeguridad c WHERE c.ualta = :ualta"),
    @NamedQuery(name = "CatParametrosDeSeguridad.findByMaxusrintfallidos", query = "SELECT c FROM CatParametrosDeSeguridad c WHERE c.fmodifica = :fmodifica"),
    @NamedQuery(name = "CatParametrosDeSeguridad.findByMaxipintfallidos", query = "SELECT c FROM CatParametrosDeSeguridad c WHERE c.umodifica = :umodifica"),
    @NamedQuery(name = "CatParametrosDeSeguridad.findByIpdiasbloqueo", query = "SELECT c FROM CatParametrosDeSeguridad c WHERE c.umodifica = :umodifica"),
    @NamedQuery(name = "CatParametrosDeSeguridad.findByTimeout", query = "SELECT c FROM CatParametrosDeSeguridad c WHERE c.estatus = :estatus")})

public class CatParametrosDeSeguridad implements Serializable{
	
	 private static final long serialVersionUID = 1L;
	    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
	    @Id
	    @Basic(optional = false)
	    @Column(name = "IDPARAMETROS")
	    private BigDecimal idparametros;
	    @Column(name = "MAXLONGPASS")
	    private BigDecimal maxlongpass;
	    @Basic(optional = false)
	    @Column(name = "MINLONGPASS")
	    private BigDecimal minlongpass;
	    @Column(name = "DIASVENPASS")
	    private BigDecimal diasvenpass;
	    @Column(name = "MAXUSRINTFALLIDOS")
	    private BigDecimal maxusrintfallidos;
	    @Column(name = "MAXIPINTFALLIDOS")
	    private BigDecimal maxipintfallidos;
	    @Column(name = "IPDIASBLOQUEO")
	    private BigDecimal ipdiasbloqueo;
	    @Column(name = "TIMEOUT")
	    private BigDecimal timeout;
	    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idparametros")
	    private Collection<CatParametrosDeSeguridad> catParametrosDeSeguridadCollection;

	    public CatParametrosDeSeguridad() {
	    }
	    
	    public CatParametrosDeSeguridad(int idparametros,int maxlongpass,int minlongpass,int diasvenpass,
				int maxusrintfallidos,int maxipintfallidos,int ipdiasbloqueo,int timeout) {
	    	
	    	this.idparametros=new BigDecimal( idparametros);
	    	this.maxlongpass=new BigDecimal(maxlongpass);
	    	this.minlongpass=new BigDecimal(minlongpass);
	    	this.diasvenpass=new BigDecimal(diasvenpass);
	    	this.maxusrintfallidos=new BigDecimal(maxusrintfallidos);
	    	this.maxipintfallidos=new BigDecimal(maxipintfallidos);
	    	this.ipdiasbloqueo=new BigDecimal(ipdiasbloqueo);
	    	this.timeout=new BigDecimal(timeout);
	    
	    }
	
	    public BigDecimal getIdparametros() {
			return idparametros;
		}


		public void setIdparametros(BigDecimal idparametros) {
			this.idparametros = idparametros;
		}


		public BigDecimal getMaxlongpass() {
			return maxlongpass;
		}


		public void setMaxlongpass(BigDecimal maxlongpass) {
			this.maxlongpass = maxlongpass;
		}


		public BigDecimal getMinlongpass() {
			return minlongpass;
		}


		public void setMinlongpass(BigDecimal minlongpass) {
			this.minlongpass = minlongpass;
		}


		public BigDecimal getDiasvenpass() {
			return diasvenpass;
		}


		public void setDiasvenpass(BigDecimal diasvenpass) {
			this.diasvenpass = diasvenpass;
		}


		public BigDecimal getMaxusrintfallidos() {
			return maxusrintfallidos;
		}


		public void setMaxusrintfallidos(BigDecimal maxusrintfallidos) {
			this.maxusrintfallidos = maxusrintfallidos;
		}


		public BigDecimal getMaxipintfallidos() {
			return maxipintfallidos;
		}


		public void setMaxipintfallidos(BigDecimal maxipintfallidos) {
			this.maxipintfallidos = maxipintfallidos;
		}


		public BigDecimal getIpdiasbloqueo() {
			return ipdiasbloqueo;
		}


		public void setIpdiasbloqueo(BigDecimal ipdiasbloqueo) {
			this.ipdiasbloqueo = ipdiasbloqueo;
		}


		public BigDecimal getTimeout() {
			return timeout;
		}


		public void setTimeout(BigDecimal timeout) {
			this.timeout = timeout;
		}


	@XmlTransient
    public Collection<CatParametrosDeSeguridad> getCatParametrosDeSeguridadCollection() {
        return catParametrosDeSeguridadCollection;
    }

    public void setCatParametrosDeSeguridadCollection(Collection<CatParametrosDeSeguridad> catParametrosDeSeguridadCollection) {
        this.catParametrosDeSeguridadCollection = catParametrosDeSeguridadCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idparametros != null ? idparametros.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatParametrosDeSeguridad)) {
            return false;
        }
        CatParametrosDeSeguridad other = (CatParametrosDeSeguridad) object;
        if ((this.idparametros == null && other.idparametros != null) || (this.idparametros != null && !this.idparametros.equals(other.idparametros))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatParametrosDeSeguridad[ idparametros=" + idparametros + " ]";
    }

}
