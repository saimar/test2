package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.CedulaVO;
import com.baz.commons.vo.ExtraccionVO;
import com.baz.commons.vo.NivelVO;
import com.baz.dao.CatCedulaDao;
import com.baz.dao.CatExtraccionDao;
import com.baz.dao.CatNivelDao;
import com.baz.dao.MantenimientoCatalogoExtraccionDao;
import com.baz.ejb.service.MantenimientoCatalogoExtraccionService;

@Stateless(name = "mantenimientoCatalgoExtraccionServiceImpl")
public class MantenimientoCatalogoExtraccionServiceImpl implements MantenimientoCatalogoExtraccionService, Serializable {

	@Inject
	@Named("mantenimientoCatalogoExtraccionDaoImpl")
	MantenimientoCatalogoExtraccionDao mantenimientoCatalogoExtraccionDao;
	@Inject
	@Named("catCedulaDaoImpl")
	CatCedulaDao catCedulaDao;
	@Inject
	@Named("catNivelDaoImpl")
	CatNivelDao catNivelDao;
	@Inject
	@Named("catExtraccionDaoImpl")
	CatExtraccionDao catExtraccionDao;
	private static final long serialVersionUID = 1L;

	public List<ExtraccionVO> cargarCatalogoExtraccion(int opcion, int idExtracion) throws ExcepcionSicrenet {
		List<ExtraccionVO> listExtraccionVO = new ArrayList<ExtraccionVO>();
		listExtraccionVO = catExtraccionDao.cargarCatalogoExtraccion(opcion, idExtracion);
		return listExtraccionVO;
	}

	public List<CedulaVO> cargarCatalogoCedula() throws ExcepcionSicrenet {
		List<CedulaVO> listCedulaVO = new ArrayList<CedulaVO>();
		listCedulaVO = catCedulaDao.cargarCatalogoCedula();
		return listCedulaVO;
	}

	public List<NivelVO> cargarCatalogoNivel() throws ExcepcionSicrenet {
		List<NivelVO> listNivelVO = new ArrayList<NivelVO>();
		listNivelVO = catNivelDao.cargarCatalogoNivel();
		return listNivelVO;
	}

	public void guardarCatalogoExtraccion(int opcion, int idExtracion, int idNivel, int idCedula, String store,
			int estatus, String usuario) throws ExcepcionSicrenet {
		mantenimientoCatalogoExtraccionDao.guardarCatalogoExtraccion(opcion, idExtracion, idNivel, idCedula, store, estatus, usuario);
				
	}
	
	public ExtraccionVO cargarCatalogoExtraccionValidateExiste(int opcion, int idCedula) throws ExcepcionSicrenet {
		ExtraccionVO ExtraccionVO = new ExtraccionVO();
		ExtraccionVO = mantenimientoCatalogoExtraccionDao.cargarCatalogoExtraccionValidateExiste(opcion, idCedula);
		return ExtraccionVO;
	}

	


	


	

}
