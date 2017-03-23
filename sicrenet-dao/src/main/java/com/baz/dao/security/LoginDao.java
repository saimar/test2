package com.baz.dao.security;

import java.math.BigDecimal;

import javax.ejb.Remote;

import com.baz.commons.domain.CatMonitor;
import com.baz.commons.domain.CatUsuarios;
import com.baz.commons.domain.MantoPassword;
import com.baz.commons.util.ExcepcionSicrenet;

@Remote
public interface LoginDao {
	
	public  CatUsuarios validate(String user, String password) throws ExcepcionSicrenet ;
	
	public CatMonitor agregarMonitorSesion(String numEmpleado, String IP) throws ExcepcionSicrenet;	
	
	public CatMonitor cerrarSesionMonitor(String numEmpleado) throws ExcepcionSicrenet;
	
	public MantoPassword actualizarContrasenaNuevo (BigDecimal idPass, String passwordNuevo1, int numeroVigente) throws ExcepcionSicrenet; 
	

	
}
