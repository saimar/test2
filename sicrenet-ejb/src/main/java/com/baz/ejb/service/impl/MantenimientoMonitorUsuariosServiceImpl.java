package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.domain.CatMonitor;
import com.baz.commons.domain.CatUsuarios;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.dao.MantenimientoMonitorUsuariosDao;
import com.baz.ejb.service.MantenimientoMonitorUsuariosService;


@Stateless(name="mantenimientoMonitorUsuariosServiceImpl")
public class MantenimientoMonitorUsuariosServiceImpl implements MantenimientoMonitorUsuariosService, Serializable {
	
	
	
	@Inject 
	@Named("mantenimientoMonitorUsuariosDaoImpl")
	MantenimientoMonitorUsuariosDao mantenimientoMonitoriUsuariosDao;
	
	
	private static final long serialVersionUID = 1L;

	
	

	public List<CatMonitor> cargaMonitorUsuarios() throws ExcepcionSicrenet{
		List<CatMonitor> lisMonitorUsuarios =new  ArrayList<CatMonitor>();
		
		
		lisMonitorUsuarios = mantenimientoMonitoriUsuariosDao.cargaMonitorUsuarios();
					return lisMonitorUsuarios;
	}
	
	

	
	
	
}
