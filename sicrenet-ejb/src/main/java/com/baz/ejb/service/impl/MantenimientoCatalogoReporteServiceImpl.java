package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.ExtraccionVO;
import com.baz.commons.vo.ReporteVO;
import com.baz.dao.CatExtraccionDao;
import com.baz.dao.MantenimientoCatalogoReporteDao;
import com.baz.ejb.service.MantenimientoCatalogoReporteService;

@Stateless(name = "mantenimientoCatalgoReporteServiceImpl")
public class MantenimientoCatalogoReporteServiceImpl implements MantenimientoCatalogoReporteService, Serializable {

	@Inject
	@Named("mantenimientoCatalogoReporteDaoImpl")
	MantenimientoCatalogoReporteDao mantenimientoCatalogoReporteDao;
	@Inject
	@Named("catExtraccionDaoImpl")
	CatExtraccionDao catExtraccionDao;
	private static final long serialVersionUID = 1L;

	

	public List<ReporteVO> cargarCatalogoReporte(int opcion, int idReporte) throws ExcepcionSicrenet {
		List<ReporteVO> listReporteVO = new ArrayList<ReporteVO>();
		listReporteVO= mantenimientoCatalogoReporteDao.cargarCatalogoReporte(opcion, idReporte);
		return listReporteVO;
	}

	public List<ExtraccionVO> cargarCatalogoExtraccion(int opcion, int idExtracion) throws ExcepcionSicrenet {
		List<ExtraccionVO> listExtraccionVO = new ArrayList<ExtraccionVO>();
		listExtraccionVO = catExtraccionDao.cargarCatalogoExtraccion(opcion, idExtracion);
		return listExtraccionVO;
	}

	
	public void guardarCatalogoReporte(int opcion, int idReporte, String nombre, String descripcion, int idExtraccion,
			String store, int estatus, String usuario) throws ExcepcionSicrenet {
	mantenimientoCatalogoReporteDao.guardarCatalogoReporte(opcion, idReporte, nombre, descripcion, idExtraccion, store, estatus, usuario);
		
	}

	
	public ReporteVO cargarCatalogoReporteValidateExiste(int opcion, int idReporte, String nombre, String descripcion)
			throws ExcepcionSicrenet {
		ReporteVO ReporteVO = new ReporteVO();
		ReporteVO = mantenimientoCatalogoReporteDao.cargarCatalogoReporteValidateExiste(opcion, idReporte, nombre, descripcion);
		return ReporteVO;
	}

	


	


	

}
