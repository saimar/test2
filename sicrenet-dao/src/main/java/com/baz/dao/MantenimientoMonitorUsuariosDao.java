package com.baz.dao;


import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.domain.CatMonitor;
import com.baz.commons.util.ExcepcionSicrenet;

@Remote
public interface MantenimientoMonitorUsuariosDao {

	public List<CatMonitor> cargaMonitorUsuarios() throws ExcepcionSicrenet;

	 

	
}
