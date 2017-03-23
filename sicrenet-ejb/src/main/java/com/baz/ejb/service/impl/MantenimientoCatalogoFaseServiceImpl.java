package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.EtapasVO;
import com.baz.commons.vo.FasesVO;
import com.baz.dao.CatEtapaDao;
import com.baz.dao.MantenimientoCatalogoFaseDao;
import com.baz.ejb.service.MantenimientoCatalogoFaseService;

@Stateless(name = "mantenimientoCatalgoFaseServiceImpl")
public class MantenimientoCatalogoFaseServiceImpl implements MantenimientoCatalogoFaseService, Serializable {

	@Inject
	@Named("mantenimientoCatalogoFaseDaoImpl")
	MantenimientoCatalogoFaseDao mantenimientoCatalogoFaseDao;
	@Inject
	@Named("catEtapaDaoImpl")
	CatEtapaDao catEtapaDao;

	private static final long serialVersionUID = 1L;

	public List<FasesVO> cargarCatalogoFase(int opcion, int idFase, int estatus) throws ExcepcionSicrenet {
		List<FasesVO> listCatFace = new ArrayList<FasesVO>();
		listCatFace = mantenimientoCatalogoFaseDao.cargarCatalogoFase(opcion, idFase, estatus);
		return listCatFace;
	}

	public void guardarCatalogoFase(int opcion, int idFase, String nombre, String descripcion, int idEtapa, int estatus,
			String usuario) throws ExcepcionSicrenet {
		mantenimientoCatalogoFaseDao.guardarCatalogoFase(opcion, idFase, nombre, descripcion, idEtapa, estatus,
				usuario);
	}

	public FasesVO cargarCatalogoFaseValidateExiste(int opcion, int idFase, String nombre, String descripcion)
			throws ExcepcionSicrenet {
		FasesVO catFace = new FasesVO();

		catFace = mantenimientoCatalogoFaseDao.cargarCatalogoFaseValidateExiste(opcion, idFase, nombre, descripcion);

		return catFace;
	}

	public List<EtapasVO> cargarCatalogoEtapas(int opcion, int idEtapa, int estatus) throws ExcepcionSicrenet {
		List<EtapasVO> listCatEtapa = new ArrayList<EtapasVO>();
		listCatEtapa = catEtapaDao.cargarCatalogoEtapas(opcion, idEtapa, estatus);
		return listCatEtapa;
	}

}
