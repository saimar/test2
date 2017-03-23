package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.PeriodicidadVO;

@Remote
public interface MantenimientoCatalogoPeriodicidadDao {

	public List<PeriodicidadVO> cargarCatalogoPeriodicidad(int opcion, int idPeriodicidad, int estatus) throws ExcepcionSicrenet;
		
	public PeriodicidadVO guardarCatalogoPeriodicidad(int opcion, int idPeriodicidad, String descripcion, int estatus, String usuario) throws ExcepcionSicrenet;
	
	public PeriodicidadVO cargarCatalogoPeriodicidadValidateExiste(int opcion, int idPeriodicidad, String descripcion)  throws ExcepcionSicrenet;
	
}
