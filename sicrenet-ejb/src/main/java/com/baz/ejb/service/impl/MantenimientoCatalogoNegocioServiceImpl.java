package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.NegocioVO;
import com.baz.dao.MantenimientoCatalogoNegocioDao;
import com.baz.ejb.service.MantenimientoCatalogoNegocioService;


@Stateless(name="mantenimientoCatalgoNegocioServiceImpl")
public class MantenimientoCatalogoNegocioServiceImpl implements MantenimientoCatalogoNegocioService, Serializable {
	
	
	
	@Inject 
	@Named("mantenimientoCatalogoNegocioDaoImpl")
	MantenimientoCatalogoNegocioDao mantenimientoCatalogoNegocioDao;
	
	private static final long serialVersionUID = 1L;

	
	public List<NegocioVO> cargarCatalogoNegocio(int opcion, int idNegocio, int estatus) throws ExcepcionSicrenet {
		List<NegocioVO> listNegocioVO=new  ArrayList<NegocioVO>();
		listNegocioVO = mantenimientoCatalogoNegocioDao.cargarCatalogoNegocio(opcion, idNegocio, estatus);
		return listNegocioVO;
	}

	
	public void guardarCatalogoNegocio(int opcion, int idNegocio, String descripcion, int estatus, String usuario)
			throws ExcepcionSicrenet {
		mantenimientoCatalogoNegocioDao.guardarCatalogoNegocio(opcion, idNegocio, descripcion, estatus, usuario);
		
	}

	
	public NegocioVO cargarCatalogoNegocioValidateExiste(int opcion, int idNegocio, String descripcion)
			throws ExcepcionSicrenet {
		NegocioVO NegocioVO = new NegocioVO();
		NegocioVO = mantenimientoCatalogoNegocioDao.cargarCatalogoNegocioValidateExiste(opcion, idNegocio, descripcion);
		return NegocioVO;
	}



	
	
	

	

	
	

	
	
	
}
