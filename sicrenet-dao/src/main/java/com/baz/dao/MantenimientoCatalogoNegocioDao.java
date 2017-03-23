package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.NegocioVO;

@Remote
public interface MantenimientoCatalogoNegocioDao {

	public List<NegocioVO> cargarCatalogoNegocio(int opcion, int idNegocio, int estatus) throws ExcepcionSicrenet;
		
	public NegocioVO guardarCatalogoNegocio(int opcion, int idNegocio, String descripcion, int estatus, String usuario) throws ExcepcionSicrenet;
	
	public NegocioVO cargarCatalogoNegocioValidateExiste(int opcion, int idNegocio, String descripcion)  throws ExcepcionSicrenet;
	
}
