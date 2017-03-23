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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author B196785
 */
@Entity
@Table(name = "MANTO_PASSWORD")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MantoPassword.findAll", query = "SELECT m FROM MantoPassword m"),
    @NamedQuery(name = "MantoPassword.findByIdPass", query = "SELECT m FROM MantoPassword m WHERE m.idPass = :idPass"),
    @NamedQuery(name = "MantoPassword.findByPass", query = "SELECT m FROM MantoPassword m WHERE m.pass = :pass"),
    @NamedQuery(name = "MantoPassword.findByPassvigente", query = "SELECT m FROM MantoPassword m WHERE m.passvigente = :passvigente"),
    @NamedQuery(name = "MantoPassword.findByEstatus", query = "SELECT m FROM MantoPassword m WHERE m.estatus = :estatus"),
    @NamedQuery(name = "MantoPassword.findByFmodifica", query = "SELECT m FROM MantoPassword m WHERE m.fmodifica = :fmodifica"),
    @NamedQuery(name = "MantoPassword.findByPass1", query = "SELECT m FROM MantoPassword m WHERE m.pass1 = :pass1"),
    @NamedQuery(name = "MantoPassword.findByPass2", query = "SELECT m FROM MantoPassword m WHERE m.pass2 = :pass2"),
    @NamedQuery(name = "MantoPassword.findByPass3", query = "SELECT m FROM MantoPassword m WHERE m.pass3 = :pass3"),
    @NamedQuery(name = "MantoPassword.findByPass4", query = "SELECT m FROM MantoPassword m WHERE m.pass4 = :pass4"),
    @NamedQuery(name = "MantoPassword.findByPass5", query = "SELECT m FROM MantoPassword m WHERE m.pass5 = :pass5"),
    @NamedQuery(name = "MantoPassword.findByPass6", query = "SELECT m FROM MantoPassword m WHERE m.pass6 = :pass6"),
    @NamedQuery(name = "MantoPassword.findByPass7", query = "SELECT m FROM MantoPassword m WHERE m.pass7 = :pass7"),
    @NamedQuery(name = "MantoPassword.findByPass8", query = "SELECT m FROM MantoPassword m WHERE m.pass8 = :pass8"),
    @NamedQuery(name = "MantoPassword.findByPass9", query = "SELECT m FROM MantoPassword m WHERE m.pass9 = :pass9"),
    @NamedQuery(name = "MantoPassword.findByPass10", query = "SELECT m FROM MantoPassword m WHERE m.pass10 = :pass10")})
public class MantoPassword implements Serializable {

    private static final long serialVersionUID = 1L;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Id
    @Basic(optional = false)
    @Column(name = "ID_PASS")
    private BigDecimal idPass;
    @Column(name = "PASS")
    private String pass;
    @Column(name = "PASSVIGENTE")
    private Long passvigente;
    @Column(name = "ESTATUS")
    private Long estatus;
    @Basic(optional = false)
    @Column(name = "FMODIFICA")
    private String fmodifica;
    @Column(name = "PASS1")
    private String pass1;
    @Column(name = "PASS2")
    private String pass2;
    @Column(name = "PASS3")
    private String pass3;
    @Column(name = "PASS4")
    private String pass4;
    @Column(name = "PASS5")
    private String pass5;
    @Column(name = "PASS6")
    private String pass6;
    @Column(name = "PASS7")
    private String pass7;
    @Column(name = "PASS8")
    private String pass8;
    @Column(name = "PASS9")
    private String pass9;
    @Column(name = "PASS10")
    private String pass10;

    public MantoPassword() {
    }

    public MantoPassword(BigDecimal idPass) {
        this.idPass = idPass;
    }

    public MantoPassword(BigDecimal idPass, String fmodifica) {
        this.idPass = idPass;
        this.fmodifica = fmodifica;
    }

    public BigDecimal getIdPass() {
        return idPass;
    }

    public void setIdPass(BigDecimal idPass) {
        this.idPass = idPass;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public Long getPassvigente() {
        return passvigente;
    }

    public void setPassvigente(Long passvigente) {
        this.passvigente = passvigente;
    }

    public Long getEstatus() {
        return estatus;
    }

    public void setEstatus(Long estatus) {
        this.estatus = estatus;
    }

    public String getFmodifica() {
        return fmodifica;
    }

    public void setFmodifica(String fmodifica) {
        this.fmodifica = fmodifica;
    }

    public String getPass1() {
        return pass1;
    }

    public void setPass1(String pass1) {
        this.pass1 = pass1;
    }

    public String getPass2() {
        return pass2;
    }

    public void setPass2(String pass2) {
        this.pass2 = pass2;
    }

    public String getPass3() {
        return pass3;
    }

    public void setPass3(String pass3) {
        this.pass3 = pass3;
    }

    public String getPass4() {
        return pass4;
    }

    public void setPass4(String pass4) {
        this.pass4 = pass4;
    }

    public String getPass5() {
        return pass5;
    }

    public void setPass5(String pass5) {
        this.pass5 = pass5;
    }

    public String getPass6() {
        return pass6;
    }

    public void setPass6(String pass6) {
        this.pass6 = pass6;
    }

    public String getPass7() {
        return pass7;
    }

    public void setPass7(String pass7) {
        this.pass7 = pass7;
    }

    public String getPass8() {
        return pass8;
    }

    public void setPass8(String pass8) {
        this.pass8 = pass8;
    }

    public String getPass9() {
        return pass9;
    }

    public void setPass9(String pass9) {
        this.pass9 = pass9;
    }

    public String getPass10() {
        return pass10;
    }

    public void setPass10(String pass10) {
        this.pass10 = pass10;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idPass != null ? idPass.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MantoPassword)) {
            return false;
        }
        MantoPassword other = (MantoPassword) object;
        if ((this.idPass == null && other.idPass != null) || (this.idPass != null && !this.idPass.equals(other.idPass))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.bancoazteca.reportes.domain.MantoPassword[ idPass=" + idPass + " ]";
    }
    
}
