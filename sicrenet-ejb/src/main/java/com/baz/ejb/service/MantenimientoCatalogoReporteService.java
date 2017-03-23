package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.ExtraccionVO;
import com.baz.commons.vo.ReporteVO;
@Remote
public interface MantenimientoCatalogoReporteService {
	

	public List<ReporteVO> cargarCatalogoReporte(int opcion, int idReporte) throws ExcepcionSicrenet;
	
	public List<ExtraccionVO> cargarCatalogoExtraccion(int opcion, int idExtracion) throws ExcepcionSicrenet;
	
	
	public void guardarCatalogoReporte(int opcion, int idReporte, String nombre, String descripcion, int idExtraccion, String store, int estatus, String usuario) throws ExcepcionSicrenet ;
	
	public ReporteVO cargarCatalogoReporteValidateExiste(int opcion, int idReporte, String nombre, String descripcion) throws ExcepcionSicrenet;
	
	
	
}
