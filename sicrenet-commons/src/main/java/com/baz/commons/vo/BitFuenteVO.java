/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.baz.commons.vo;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author B196785
 */

public class BitFuenteVO implements Serializable {

    private static final long serialVersionUID = 1L;

    private BigDecimal idBitfuente;

    private String fuente;

    private String periodo;

    private String finicio;

    private String ffin;

    private String estatus;

    private BigDecimal regs;

    private BigDecimal monto;

    private BigDecimal reprocesos;

    private String error;

    
    
	public BitFuenteVO(BigDecimal idBitfuente, String fuente, String periodo, String finicio, String ffin,
			String estatus, BigDecimal regs, BigDecimal monto, BigDecimal reprocesos, String error) {
		super();
		this.idBitfuente = idBitfuente;
		this.fuente = fuente;
		this.periodo = periodo;
		this.finicio = finicio;
		this.ffin = ffin;
		this.estatus = estatus;
		this.regs = regs;
		this.monto = monto;
		this.reprocesos = reprocesos;
		this.error = error;
	}

	public BigDecimal getIdBitfuente() {
		return idBitfuente;
	}

	public void setIdBitfuente(BigDecimal idBitfuente) {
		this.idBitfuente = idBitfuente;
	}

	public String getFuente() {
		return fuente;
	}

	public void setFuente(String fuente) {
		this.fuente = fuente;
	}

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	public String getFinicio() {
		return finicio;
	}

	public void setFinicio(String finicio) {
		this.finicio = finicio;
	}

	public String getFfin() {
		return ffin;
	}

	public void setFfin(String ffin) {
		this.ffin = ffin;
	}

	public String getEstatus() {
		return estatus;
	}

	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}

	public BigDecimal getRegs() {
		return regs;
	}

	public void setRegs(BigDecimal regs) {
		this.regs = regs;
	}

	public BigDecimal getMonto() {
		return monto;
	}

	public void setMonto(BigDecimal monto) {
		this.monto = monto;
	}

	public BigDecimal getReprocesos() {
		return reprocesos;
	}

	public void setReprocesos(BigDecimal reprocesos) {
		this.reprocesos = reprocesos;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}
	
   }
