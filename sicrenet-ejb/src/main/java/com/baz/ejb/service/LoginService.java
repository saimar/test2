package com.baz.ejb.service;

import java.math.BigDecimal;

import javax.ejb.Remote;

import com.baz.commons.domain.CatUsuarios;
import com.baz.commons.util.ExcepcionSicrenet;

@Remote
public interface LoginService {
	
	public boolean validate(String user, String pass)throws ExcepcionSicrenet;
	
	public boolean validateNuevo(String user, String pass)throws ExcepcionSicrenet;
	
	public CatUsuarios getUsers();
	
	public void setUsers(CatUsuarios users) ;
	
	public void agregarMonitorSesion(String numEmpleado, String IP) throws ExcepcionSicrenet;
	
	public void  cerrarSesionMonitor(String numEmpleado) throws ExcepcionSicrenet;
	
	public void actualizarContrasenaNuevo (BigDecimal idPass, String passwordNuevo1, int numeroVigente) throws ExcepcionSicrenet; 
	

	
}
