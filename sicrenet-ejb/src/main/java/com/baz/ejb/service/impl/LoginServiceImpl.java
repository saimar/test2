package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.math.BigDecimal;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.domain.CatUsuarios;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.dao.security.LoginDao;
import com.baz.ejb.service.LoginService;

@Stateless(name="LoginServiceImpl")
public class LoginServiceImpl implements LoginService, Serializable {
	
/**
	 * 
	 */
	private static final long serialVersionUID = -1658217550369684096L;


@Inject 
@Named("LoginDaoImpl")
LoginDao loginDao;

private CatUsuarios users ;
private boolean validateNuevo;


public boolean validate(String user, String pass) throws ExcepcionSicrenet{
	
	users = new CatUsuarios();
	boolean value = false;
	users = loginDao.validate(user,pass);
	System.out.println("EJB execute:::validate::users.getUname()"+users.getNombre());
	if(user.equals(users.getNumempleado()) && pass.equals(users.getIdPass().getPass()) && users.getIdPass().getEstatus() == 1 )
	{
		value  = true;
	} 
	return value;
}



public boolean validateNuevo(String user, String pass) throws ExcepcionSicrenet{
	
	users = new CatUsuarios();
	validateNuevo = false;
	users = loginDao.validate(user,pass);
	System.out.println("EJB execute:::validateNuevo::users.getUname()" + users.getNombre());
	System.out.println("EJB execute:::validateNuevo::pass" + pass);
		if(user.equals(users.getNumempleado())  && users.getIdPass().getEstatus() == 0 ){
		
			validateNuevo = true;
		System.out.println("LoginService::VlidateNuevo::::Contraseña:: " + pass);
	}
	return validateNuevo;
}

public CatUsuarios getUsers() {
	return users;
}

public void setUsers(CatUsuarios users) {
	this.users = users;
}
@Override
public void agregarMonitorSesion(String numEmpleado, String IP) throws ExcepcionSicrenet {
	loginDao.agregarMonitorSesion(numEmpleado, IP);
	
}

@Override
public void cerrarSesionMonitor(String numEmpleado) throws ExcepcionSicrenet {
	loginDao.cerrarSesionMonitor(numEmpleado);
	
}

@Override
public void actualizarContrasenaNuevo(BigDecimal idPass, String passwordNuevo1, int numeroVigente)
		throws ExcepcionSicrenet {
	loginDao.actualizarContrasenaNuevo(idPass, passwordNuevo1, numeroVigente);
	
	validateNuevo = false;
	users = null;
	
}

public boolean isValidateNuevo() {
	return validateNuevo;
}

public void setValidateNuevo(boolean validateNuevo) {
	this.validateNuevo = validateNuevo;
}


}
