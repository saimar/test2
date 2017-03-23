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
import com.baz.commons.vo.ResponsableVO;
import com.baz.dao.MantenimientoCatalogoConceptoDao;
import com.baz.dao.MantenimientoCatalogoResponsableDao;
import com.baz.ejb.service.MantenimientoCatalogoConceptoService;
import com.baz.ejb.service.MantenimientoCatalogoResponsableService;

@Stateless(name = "mantenimientoCatalgoResponsableServiceImpl")
public class MantenimientoCatalogoResponsableServiceImpl implements MantenimientoCatalogoResponsableService, Serializable {

	@Inject
	@Named("mantenimientoCatalogoResponsableDaoImpl")
	MantenimientoCatalogoResponsableDao mantenimientoCatalogoResponsableDao;

	private static final long serialVersionUID = 1L;


	public List<ResponsableVO> cargaResponsableVO(int opcion, int idResponsable) throws ExcepcionSicrenet {
		List<ResponsableVO> ResponsableVO = new ArrayList<ResponsableVO>();

		ResponsableVO = mantenimientoCatalogoResponsableDao.cargaResponsableVO(opcion, idResponsable);

		return ResponsableVO;
	}

	
	public void guardarCatalogoResponsable(int opcion, int idResponsable, ResponsableVO agregaResponsable,
			String usuario) throws ExcepcionSicrenet {
		mantenimientoCatalogoResponsableDao.guardarCatalogoResponsable(opcion, idResponsable, agregaResponsable, usuario);
		
	}

	
	public ResponsableVO cargarCatalogoResponsableValidateExiste(int opcion, int idResponsable, String numEmpleado)
			throws ExcepcionSicrenet {
		ResponsableVO ResponsableVO = new ResponsableVO();

		ResponsableVO = mantenimientoCatalogoResponsableDao.cargarCatalogoResponsableValidateExiste(opcion, idResponsable, numEmpleado);

		return ResponsableVO;
	}


}
