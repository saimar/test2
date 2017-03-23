package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.CedulaVO;
import com.baz.commons.vo.FuenteVO;
import com.baz.commons.vo.NivelVO;
@Remote
public interface MantenimientoCatalogoFuenteService {
	
	
	public List<FuenteVO> cargarCatalogoFuente(int opcion, int idFuente) throws ExcepcionSicrenet;
	
	public List<CedulaVO> cargarCatalogoCedula() throws ExcepcionSicrenet;
	
	public List<NivelVO> cargarCatalogoNivel() throws ExcepcionSicrenet;
	

	
	
	public FuenteVO cargarCatalogoFuenteValidateExiste(int opcion, int idCedula) throws ExcepcionSicrenet;
	
	public void guardarCatalogoFuente(int opcion, int idFuente, int idNivel, int idCedula, String store, int estatus, String usuario) throws ExcepcionSicrenet ;
	
	
}
