package com.baz.ejb.service;


import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.domain.CatMonitor;
import com.baz.commons.util.ExcepcionSicrenet;

@Remote
public interface MantenimientoMonitorUsuariosService {

	
	
	public List<CatMonitor> cargaMonitorUsuarios() throws ExcepcionSicrenet ;

	
}
