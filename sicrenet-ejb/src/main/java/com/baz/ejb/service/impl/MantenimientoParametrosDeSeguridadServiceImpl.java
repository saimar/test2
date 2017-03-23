package com.baz.ejb.service.impl;

import javax.ejb.Stateless;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.domain.CatParametrosDeSeguridad;
import com.baz.dao.MantenimientoParametrosDeSeguridadDao;
import com.baz.ejb.service.MantenimientoParametrosDeSeguridadService;

@Stateless(name="mantenimientoParametrosDeSeguridadServiceImpl")
public class MantenimientoParametrosDeSeguridadServiceImpl implements MantenimientoParametrosDeSeguridadService, Serializable{

	@Inject 
	@Named("mantenimientoParametrosDeSeguridadDaoImpl")
	MantenimientoParametrosDeSeguridadDao mantenimientoParametrosDeSeguridadDao;

	@Override
	public List<CatParametrosDeSeguridad> getParametrosDeSeguridad() {
		// TODO Auto-generated method stub
		System.out.println("Llego al servicio ");
		return mantenimientoParametrosDeSeguridadDao.getParametrosDeSeguridad();
	}

	@Override
	public void editarParametrosDeSeguridad(BigDecimal idparametros, BigDecimal maxlongpass, BigDecimal minlongpass,
			BigDecimal diasvenpass, BigDecimal maxusrintfallidos, BigDecimal maxipintfallidos, BigDecimal ipdiasbloqueo,
			BigDecimal timeout) {
		mantenimientoParametrosDeSeguridadDao.editarParametrosDeSeguridad(idparametros, maxlongpass, minlongpass, diasvenpass, maxusrintfallidos, maxipintfallidos, ipdiasbloqueo, timeout);
		// TODO Auto-generated method stub
		
	}
	
}
