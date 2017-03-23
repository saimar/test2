package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.CedulaVO;
import com.baz.commons.vo.NivelVO;
import com.baz.commons.vo.ProcesoVO;
@Remote
public interface MantenimientoCatalogoProcesoService {
	
	
	public List<ProcesoVO> cargarCatalogoProceso(int opcion, int idProceso) throws ExcepcionSicrenet;
	
	public List<CedulaVO> cargarCatalogoCedula() throws ExcepcionSicrenet;
	
	public List<NivelVO> cargarCatalogoNivel() throws ExcepcionSicrenet;
	

	
	
	public ProcesoVO cargarCatalogoProcesoValidateExiste(int opcion, int idProceso, int idCedula) throws ExcepcionSicrenet;
	
	public void guardarCatalogoProceso(int opcion, int idProceso, int idNivel, int idCedula, String store, int estatus, String usuario) throws ExcepcionSicrenet ;
	
	
}
