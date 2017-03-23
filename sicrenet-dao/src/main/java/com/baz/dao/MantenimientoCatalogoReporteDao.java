package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.ReporteVO;

@Remote
public interface MantenimientoCatalogoReporteDao {

	
	public List<ReporteVO> cargarCatalogoReporte(int opcion, int idReporte) throws ExcepcionSicrenet;
		
	public void guardarCatalogoReporte(int opcion, int idReporte, String nombre, String descripcion, int idExtraccion, String store, int estatus, String usuario) throws ExcepcionSicrenet ;
	
	public ReporteVO cargarCatalogoReporteValidateExiste(int opcion, int idReporte, String nombre, String descripcion) throws ExcepcionSicrenet;
	
}
