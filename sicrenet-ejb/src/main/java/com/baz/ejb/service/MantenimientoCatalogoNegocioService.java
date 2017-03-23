package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.NegocioVO;

@Remote
public interface MantenimientoCatalogoNegocioService {

	public List<NegocioVO> cargarCatalogoNegocio(int opcion, int idNegocio, int estatus) throws ExcepcionSicrenet;
		
	public void guardarCatalogoNegocio(int opcion, int idNegocio, String descripcion, int estatus, String usuario) throws ExcepcionSicrenet;
	
	public NegocioVO cargarCatalogoNegocioValidateExiste(int opcion, int idNegocio, String descripcion)  throws ExcepcionSicrenet;
	
}
