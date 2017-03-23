package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.CedulaVO;
import com.baz.commons.vo.FuenteVO;
import com.baz.commons.vo.NivelVO;
import com.baz.dao.CatCedulaDao;
import com.baz.dao.CatNivelDao;
import com.baz.dao.MantenimientoCatalogoFuenteDao;
import com.baz.ejb.service.MantenimientoCatalogoFuenteService;

@Stateless(name = "mantenimientoCatalgoFuenteServiceImpl")
public class MantenimientoCatalogoFuenteServiceImpl implements MantenimientoCatalogoFuenteService, Serializable {

	@Inject
	@Named("mantenimientoCatalogoFuenteDaoImpl")
	MantenimientoCatalogoFuenteDao mantenimientoCatalogoFuenteDao;
	@Inject
	@Named("catCedulaDaoImpl")
	CatCedulaDao catCedulaDao;
	@Inject
	@Named("catNivelDaoImpl")
	CatNivelDao catNivelDao;
	private static final long serialVersionUID = 1L;

	public List<FuenteVO> cargarCatalogoFuente(int opcion, int idFuente) throws ExcepcionSicrenet {
		List<FuenteVO> listFuenteVO = new ArrayList<FuenteVO>();
		listFuenteVO = mantenimientoCatalogoFuenteDao.cargarCatalogoFuente(opcion, idFuente);
		return listFuenteVO;
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

	public void guardarCatalogoFuente(int opcion, int idFuente, int idNivel, int idCedula, String store, int estatus,
			String usuario) throws ExcepcionSicrenet {
		
		 mantenimientoCatalogoFuenteDao.guardarCatalogoFuente(opcion, idFuente, idNivel, idCedula, store, estatus, usuario);
			
		
	}
	
	public FuenteVO cargarCatalogoFuenteValidateExiste(int opcion, int idCedula) throws ExcepcionSicrenet {
		FuenteVO FuenteVO = new FuenteVO();
		FuenteVO = mantenimientoCatalogoFuenteDao.cargarCatalogoFuenteValidateExiste(opcion, idCedula);
		return FuenteVO;
	}

}
