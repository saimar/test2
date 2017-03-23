package com.baz.dao;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.ExtraccionVO;

@Remote
public interface MantenimientoCatalogoExtraccionDao {

	
	
	
	public void guardarCatalogoExtraccion(int opcion, int idExtracion, int idNivel, int idCedula, String store, int estatus, String usuario) throws ExcepcionSicrenet ;
	
	public ExtraccionVO cargarCatalogoExtraccionValidateExiste(int opcion, int idCedula) throws ExcepcionSicrenet;
	
}
