package com.baz.dao;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.AreaVO;

@Remote
public interface MantenimientoCatalogoAreaDao {

	public void guardarCatalogoArea(int opcion, int idArea, String descripcion, int estatus, String usuario)
			throws ExcepcionSicrenet;

	public AreaVO cargarCatalogoAreaValidateExiste(int opcion, int idArea, String descripcion) throws ExcepcionSicrenet;

}
