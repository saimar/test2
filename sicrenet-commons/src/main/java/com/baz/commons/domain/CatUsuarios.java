/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.baz.commons.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author B196785
 */
@Entity
@Table(name = "CAT_USUARIOS")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "CatUsuarios.findAll", query = "SELECT c FROM CatUsuarios c"),
    @NamedQuery(name = "CatUsuarios.findByIdusuario", query = "SELECT c FROM CatUsuarios c WHERE c.idusuario = :idusuario"),
    @NamedQuery(name = "CatUsuarios.findByNombreAndPassword", query = "SELECT c FROM CatUsuarios c WHERE c.nombre = :nombre AND "
    		+ " c.idPass = :idPass"),
    @NamedQuery(name = "CatUsuarios.findByNombre", query = "SELECT c FROM CatUsuarios c WHERE c.nombre = :nombre"),
    @NamedQuery(name = "CatUsuarios.findByApaterno", query = "SELECT c FROM CatUsuarios c WHERE c.apaterno = :apaterno"),
    @NamedQuery(name = "CatUsuarios.findByAmaterno", query = "SELECT c FROM CatUsuarios c WHERE c.amaterno = :amaterno"),
    @NamedQuery(name = "CatUsuarios.findByNumempleado", query = "SELECT c FROM CatUsuarios c WHERE c.numempleado = :numempleado"),
    @NamedQuery(name = "CatUsuarios.findByDireccion", query = "SELECT c FROM CatUsuarios c WHERE c.direccion = :direccion"),
    @NamedQuery(name = "CatUsuarios.findByGerencia|", query = "SELECT c FROM CatUsuarios c WHERE c.gerencia = :gerencia"),
    @NamedQuery(name = "CatUsuarios.findByCentrocostos", query = "SELECT c FROM CatUsuarios c WHERE c.centrocostos = :centrocostos"),
    @NamedQuery(name = "CatUsuarios.findByCorreo", query = "SELECT c FROM CatUsuarios c WHERE c.correo = :correo"),
    @NamedQuery(name = "CatUsuarios.findByBloqueo", query = "SELECT c FROM CatUsuarios c WHERE c.bloqueo = :bloqueo"),
    @NamedQuery(name = "CatUsuarios.findBySesionactiva", query = "SELECT c FROM CatUsuarios c WHERE c.sesionactiva = :sesionactiva"),
    @NamedQuery(name = "CatUsuarios.findByFalta", query = "SELECT c FROM CatUsuarios c WHERE c.falta = :falta"),
    @NamedQuery(name = "CatUsuarios.findByUalta", query = "SELECT c FROM CatUsuarios c WHERE c.ualta = :ualta"),
    @NamedQuery(name = "CatUsuarios.findByFmodifica", query = "SELECT c FROM CatUsuarios c WHERE c.fmodifica = :fmodifica"),
    @NamedQuery(name = "CatUsuarios.findByUmodifica", query = "SELECT c FROM CatUsuarios c WHERE c.umodifica = :umodifica"),
    @NamedQuery(name = "CatUsuarios.findByEstatus", query = "SELECT c FROM CatUsuarios c WHERE c.estatus = :estatus"),
    @NamedQuery(name = "CatUsuarios.findByIdPass", query = "SELECT c FROM CatUsuarios c WHERE c.idPass = :idPass")})
public class CatUsuarios implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "IDUSUARIO")
    private BigDecimal idusuario;
    @Column(name = "NOMBRE")
    private String nombre;
    @Column(name = "APATERNO")
    private String apaterno;
    @Column(name = "AMATERNO")
    private String amaterno;
    @Column(name = "NUMEMPLEADO")
    private String numempleado;
    @Column(name = "DIRECCION")
    private String direccion;
    @Column(name = "GERENCIA")
    private String gerencia;
    @Column(name = "CENTROCOSTOS")
    private String centrocostos;
    @Column(name = "CORREO")
    private String correo;
    @Column(name = "BLOQUEO")
    private Long bloqueo;
    @Column(name = "SESIONACTIVA")
    private Long sesionactiva;
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
//    @Column(name = "ID_PASS")
//    private BigInteger idPass;
    @JoinColumn(name = "ID_PAIS", referencedColumnName = "ID_PAIS")
    @ManyToOne(optional = false)
    private CatPais idPais;
    @JoinColumn(name = "IDROL", referencedColumnName = "IDROL")
    @ManyToOne(optional = false)
    private CatRol idrol;
    @JoinColumn(name = "ID_PASS", referencedColumnName = "ID_PASS")
    @ManyToOne(optional = false)
    private MantoPassword idPass;

    
    public CatUsuarios() {
    }

    public CatUsuarios(BigDecimal idusuario) {
        this.idusuario = idusuario;
    }

    public CatUsuarios(String numempleado, String centroCostos, String nombre, String direccion, long bloqueo) {
     this.numempleado = numempleado;
     this.centrocostos = centroCostos;
     this.nombre = nombre;
     this.direccion = direccion;
     this.bloqueo = bloqueo;
    }

    public BigDecimal getIdusuario() {
        return idusuario;
    }

    public void setIdusuario(BigDecimal idusuario) {
        this.idusuario = idusuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApaterno() {
        return apaterno;
    }

    public void setApaterno(String apaterno) {
        this.apaterno = apaterno;
    }

    public String getAmaterno() {
        return amaterno;
    }

    public void setAmaterno(String amaterno) {
        this.amaterno = amaterno;
    }

    public String getNumempleado() {
        return numempleado;
    }

    public void setNumempleado(String numempleado) {
        this.numempleado = numempleado;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getGerencia() {
        return gerencia;
    }

    public void setGerencia(String gerencia) {
        this.gerencia = gerencia;
    }

    public String getCentrocostos() {
        return centrocostos;
    }

    public void setCentrocostos(String centrocostos) {
        this.centrocostos = centrocostos;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public Long getBloqueo() {
        return bloqueo;
    }

    public void setBloqueo(Long bloqueo) {
        this.bloqueo = bloqueo;
    }

    public Long getSesionactiva() {
        return sesionactiva;
    }

    public void setSesionactiva(Long sesionactiva) {
        this.sesionactiva = sesionactiva;
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

    public MantoPassword getIdPass() {
        return idPass;
    }

    public void setIdPass(MantoPassword idPass) {
        this.idPass = idPass;
    }

    public CatPais getIdPais() {
        return idPais;
    }

    public void setIdPais(CatPais idPais) {
        this.idPais = idPais;
    }

    public CatRol getIdrol() {
        return idrol;
    }

    public void setIdrol(CatRol idrol) {
        this.idrol = idrol;
    }
     
 

	@Override
    public int hashCode() {
        int hash = 0;
        hash += (idusuario != null ? idusuario.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof CatUsuarios)) {
            return false;
        }
        CatUsuarios other = (CatUsuarios) object;
        if ((this.idusuario == null && other.idusuario != null) || (this.idusuario != null && !this.idusuario.equals(other.idusuario))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.CatUsuarios[ idusuario=" + idusuario + " ]";
    }
    
}
