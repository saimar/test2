package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.EtapasVO;
import com.baz.dao.CatEtapaDao;
import com.baz.dao.MantenimientoCatalogoEtapaDao;
import com.baz.ejb.service.MantenimientoCatalogoEtapaService;

@Stateless(name = "mantenimientoCatalgoEtapaServiceImpl")
public class MantenimientoCatalogoEtapaServiceImpl implements MantenimientoCatalogoEtapaService, Serializable {

	@Inject
	@Named("mantenimientoCatalogoEtapaDaoImpl")
	MantenimientoCatalogoEtapaDao mantenimientoCatalogoEtapaDao;
	@Inject
	@Named("catEtapaDaoImpl")
	CatEtapaDao catEtapaDao;

	private static final long serialVersionUID = 1L;

	public List<EtapasVO> cargarCatalogoEtapas(int opcion, int idEtapa, int estatus) throws ExcepcionSicrenet {
		List<EtapasVO> listCatEtapa = new ArrayList<EtapasVO>();
		listCatEtapa = catEtapaDao.cargarCatalogoEtapas(opcion, idEtapa, estatus);
		return listCatEtapa;
	}

	public void guardaCalatogoEtapa(int opcion, int idEtapa, String nombre, String descripcion, int estatus,
			String usuario) throws ExcepcionSicrenet {
		mantenimientoCatalogoEtapaDao.guardaCalatogoEtapa(opcion, idEtapa, nombre, descripcion, estatus, usuario);

	}

	public EtapasVO cargarCatalogoEtapasValidateExiste(int opcion, int idEtapa, String nombre, String descripcion)
			throws ExcepcionSicrenet {
		EtapasVO etapasVO = new EtapasVO();
		etapasVO = mantenimientoCatalogoEtapaDao.cargarCatalogoEtapasValidateExiste(opcion, idEtapa, nombre,
				descripcion);
		return etapasVO;
	}

}
