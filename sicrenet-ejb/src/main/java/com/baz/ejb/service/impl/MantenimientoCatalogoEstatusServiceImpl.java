package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.Id;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.ConceptoVO;
import com.baz.commons.vo.EstatusVO;
import com.baz.commons.vo.ResponsableVO;
import com.baz.dao.MantenimientoCatalogoConceptoDao;
import com.baz.dao.MantenimientoCatalogoEstatusDao;
import com.baz.dao.MantenimientoCatalogoResponsableDao;
import com.baz.ejb.service.MantenimientoCatalogoConceptoService;
import com.baz.ejb.service.MantenimientoCatalogoEstatusService;
import com.baz.ejb.service.MantenimientoCatalogoResponsableService;

@Stateless(name = "mantenimientoCatalgoEstatusServiceImpl")
public class MantenimientoCatalogoEstatusServiceImpl implements MantenimientoCatalogoEstatusService, Serializable {

	@Inject
	@Named("mantenimientoCatalogoEstatusDaoImpl")
	MantenimientoCatalogoEstatusDao mantenimientoCatalogoEstatusDao;

	private static final long serialVersionUID = 1L;


	


	public List<EstatusVO> cargarCatalogoEstatus(int opcion, int idEstatus, int estatus) throws ExcepcionSicrenet {
		List<EstatusVO> EstatusVO = new ArrayList<EstatusVO>();

		EstatusVO = mantenimientoCatalogoEstatusDao.cargarCatalogoEstatus(opcion, idEstatus, estatus);

		return EstatusVO;
	}



	public void guardarCatalogoEstatus(int opcion, int idEstatus, String nombre, String clase, int estatus,
			String usuario) throws ExcepcionSicrenet {
		mantenimientoCatalogoEstatusDao.guardarCatalogoEstatus(opcion, idEstatus, nombre, clase, estatus, usuario);
		
	}



	public EstatusVO cargarCatalogoEstatusValidateExiste(int opcion, int idEstatus, String nombre)
			throws ExcepcionSicrenet {
		EstatusVO EstatusVO = new EstatusVO();

		EstatusVO = mantenimientoCatalogoEstatusDao.cargarCatalogoEstatusValidateExiste(opcion, idEstatus, nombre);
		return EstatusVO;
	}


}
