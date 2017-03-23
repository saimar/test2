package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.CedulaVO;
import com.baz.commons.vo.ExtraccionVO;
import com.baz.commons.vo.NivelVO;
@Remote
public interface MantenimientoCatalogoExtraccionService {
	
	
	public List<ExtraccionVO> cargarCatalogoExtraccion(int opcion, int idExtracion) throws ExcepcionSicrenet;
	
	public List<CedulaVO> cargarCatalogoCedula() throws ExcepcionSicrenet;
	
	public List<NivelVO> cargarCatalogoNivel() throws ExcepcionSicrenet;
	

	
	
	public void guardarCatalogoExtraccion(int opcion, int idExtracion, int idNivel, int idCedula, String store, int estatus, String usuario) throws ExcepcionSicrenet ;
	
	public ExtraccionVO cargarCatalogoExtraccionValidateExiste(int opcion, int idCedula) throws ExcepcionSicrenet;
	
	
	
	
}
