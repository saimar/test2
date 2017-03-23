package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.ConceptoVO;
import com.baz.dao.MantenimientoCatalogoConceptoDao;
import com.baz.ejb.service.MantenimientoCatalogoConceptoService;

@Stateless(name = "mantenimientoCatalgoConceptoServiceImpl")
public class MantenimientoCatalogoConceptoServiceImpl implements MantenimientoCatalogoConceptoService, Serializable {

	@Inject
	@Named("mantenimientoCatalogoConceptoDaoImpl")
	MantenimientoCatalogoConceptoDao mantenimientoCatalogoConceptoDao;

	private static final long serialVersionUID = 1L;

	public List<ConceptoVO> cargaConceptoVO(int opcion, int idConcepto, int estatus) throws ExcepcionSicrenet {
		List<ConceptoVO> ConceptoVO = new ArrayList<ConceptoVO>();

		ConceptoVO = mantenimientoCatalogoConceptoDao.cargaConceptoVO(opcion, idConcepto, estatus);

		return ConceptoVO;
	}

	public void guardarCambiosAgregarActualizar(int opcion, int idConcepto, String descripcion, int estatus,
			String usuario) throws ExcepcionSicrenet {
		mantenimientoCatalogoConceptoDao.guardarCambiosAgregarActualizar(opcion, idConcepto, descripcion, estatus,
				usuario);

	}

	public ConceptoVO cargarCatalogoConceptoValidateExiste(int opcion, int idConcepto, String descripcion)
			throws ExcepcionSicrenet {

		ConceptoVO ConceptoVO = new ConceptoVO();

		ConceptoVO = mantenimientoCatalogoConceptoDao.cargarCatalogoConceptoValidateExiste(opcion, idConcepto,
				descripcion);

		return ConceptoVO;
	}

}
