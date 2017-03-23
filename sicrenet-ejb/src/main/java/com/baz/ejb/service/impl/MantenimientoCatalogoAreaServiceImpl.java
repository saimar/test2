package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.AreaVO;
import com.baz.dao.CatAreaDAO;
import com.baz.dao.MantenimientoCatalogoAreaDao;
import com.baz.ejb.service.MantenimientoCatalogoAreaService;

@Stateless(name = "mantenimientoCatalgoAreaServiceImpl")
public class MantenimientoCatalogoAreaServiceImpl implements MantenimientoCatalogoAreaService, Serializable {

	@Inject
	@Named("mantenimientoCatalogoAreaDaoImpl")
	MantenimientoCatalogoAreaDao mantenimientoCatalogoAreaDao;
	@Inject
	@Named("catAreaDAOImpl")
	CatAreaDAO catAreaDAO;

	private static final long serialVersionUID = 1L;

	public void guardarCatalogoArea(int opcion, int idArea, String descripcion, int estatus, String usuario)
			throws ExcepcionSicrenet {
		mantenimientoCatalogoAreaDao.guardarCatalogoArea(opcion, idArea, descripcion, estatus, usuario);

	}

	public List<AreaVO> cargarCatalogoArea(int opcion, int idArea, int estatus) throws ExcepcionSicrenet {
		List<AreaVO> listAreaVO = new ArrayList<AreaVO>();

		listAreaVO = catAreaDAO.obtenerAreas(opcion, idArea, estatus);

		return listAreaVO;
	}

	public AreaVO cargarCatalogoAreaValidateExiste(int opcion, int idArea, String descripcion)
			throws ExcepcionSicrenet {
		AreaVO AreaVO = new AreaVO();

		AreaVO = mantenimientoCatalogoAreaDao.cargarCatalogoAreaValidateExiste(opcion, idArea, descripcion);

		return AreaVO;
	}

}
