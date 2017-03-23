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
import com.baz.commons.vo.ProcesoVO;
import com.baz.dao.CatCedulaDao;
import com.baz.dao.CatNivelDao;
import com.baz.dao.MantenimientoCatalogoFuenteDao;
import com.baz.dao.MantenimientoCatalogoProcesoDao;
import com.baz.ejb.service.MantenimientoCatalogoFuenteService;
import com.baz.ejb.service.MantenimientoCatalogoProcesoService;

@Stateless(name = "mantenimientoCatalgoProcesoServiceImpl")
public class MantenimientoCatalogoProcesoServiceImpl implements MantenimientoCatalogoProcesoService, Serializable {

	@Inject
	@Named("mantenimientoCatalogoProcesoDaoImpl")
	MantenimientoCatalogoProcesoDao mantenimientoCatalogoProcesoDao;
	@Inject
	@Named("catCedulaDaoImpl")
	CatCedulaDao catCedulaDao;
	@Inject
	@Named("catNivelDaoImpl")
	CatNivelDao catNivelDao;
	private static final long serialVersionUID = 1L;

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

	public List<ProcesoVO> cargarCatalogoProceso(int opcion, int idProceso) throws ExcepcionSicrenet {
		List<ProcesoVO> listProcesoVO = new ArrayList<ProcesoVO>();
		listProcesoVO = mantenimientoCatalogoProcesoDao.cargarCatalogoProceso(opcion, idProceso);
		return listProcesoVO;
	}

	public ProcesoVO cargarCatalogoProcesoValidateExiste(int opcion, int idProceso, int idCedula)
			throws ExcepcionSicrenet {
		ProcesoVO ProcesoVO = new ProcesoVO();
		ProcesoVO = mantenimientoCatalogoProcesoDao.cargarCatalogoProcesoValidateExiste(opcion, idProceso, idCedula);
		return ProcesoVO;
	}

	public void guardarCatalogoProceso(int opcion, int idProceso, int idNivel, int idCedula, String store, int estatus,
			String usuario) throws ExcepcionSicrenet {
		mantenimientoCatalogoProcesoDao.guardarCatalogoProceso(opcion, idProceso, idNivel, idCedula, store, estatus,
				usuario);

	}

}
