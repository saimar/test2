package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.PeriodicidadVO;

@Remote
public interface MantenimientoCatalogoPeriodicidadService {

	public List<PeriodicidadVO> cargarCatalogoPeriodicidad(int opcion, int idPeriodicidad, int estatus) throws ExcepcionSicrenet;
	
	public void guardarCatalogoPeriodicidad(int opcion, int idPeriodicidad, String descripcion, int estatus, String usuario) throws ExcepcionSicrenet;
	
	public PeriodicidadVO cargarCatalogoPeriodicidadValidateExiste(int opcion, int idPeriodicidad, String descripcion)  throws ExcepcionSicrenet;
	
}
