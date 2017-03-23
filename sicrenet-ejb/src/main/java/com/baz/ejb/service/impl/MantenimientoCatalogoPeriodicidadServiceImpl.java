package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.PeriodicidadVO;
import com.baz.dao.MantenimientoCatalogoPeriodicidadDao;
import com.baz.ejb.service.MantenimientoCatalogoPeriodicidadService;


@Stateless(name="mantenimientoCatalgoPeriodicidadServiceImpl")
public class MantenimientoCatalogoPeriodicidadServiceImpl implements MantenimientoCatalogoPeriodicidadService, Serializable {
	
	
	
	@Inject 
	@Named("mantenimientoCatalogoPeriodicidadDaoImpl")
	MantenimientoCatalogoPeriodicidadDao mantenimientoCatalogoPeriodicidadDao;
	
	private static final long serialVersionUID = 1L;

	

	
	public List<PeriodicidadVO> cargarCatalogoPeriodicidad(int opcion, int idPeriodicidad, int estatus)
			throws ExcepcionSicrenet {
		List<PeriodicidadVO> listPeriodicidadVO=new  ArrayList<PeriodicidadVO>();
		listPeriodicidadVO = mantenimientoCatalogoPeriodicidadDao.cargarCatalogoPeriodicidad(opcion, idPeriodicidad, estatus);
		return listPeriodicidadVO;
	}


	
	public void guardarCatalogoPeriodicidad(int opcion, int idPeriodicidad, String descripcion, int estatus,
			String usuario) throws ExcepcionSicrenet {
		mantenimientoCatalogoPeriodicidadDao.guardarCatalogoPeriodicidad(opcion, idPeriodicidad, descripcion, estatus, usuario);
		
	}



	public PeriodicidadVO cargarCatalogoPeriodicidadValidateExiste(int opcion, int idPeriodicidad, String descripcion)
			throws ExcepcionSicrenet {
		PeriodicidadVO PeriodicidadVO = new PeriodicidadVO();
		PeriodicidadVO = mantenimientoCatalogoPeriodicidadDao.cargarCatalogoPeriodicidadValidateExiste(opcion, idPeriodicidad, descripcion);
		return PeriodicidadVO;
	}



	
	
	

	

	
	

	
	
	
}
