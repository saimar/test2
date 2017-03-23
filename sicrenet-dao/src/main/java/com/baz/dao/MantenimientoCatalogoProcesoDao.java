package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.ProcesoVO;

@Remote
public interface MantenimientoCatalogoProcesoDao {

	
	
	public List<ProcesoVO> cargarCatalogoProceso(int opcion, int idProceso) throws ExcepcionSicrenet;
	
	public ProcesoVO  guardarCatalogoProceso(int opcion, int idProceso, int idNivel, int idCedula, String store, int estatus, String usuario)  throws ExcepcionSicrenet;
	
	public ProcesoVO cargarCatalogoProcesoValidateExiste(int opcion, int idProceso, int idCedula) throws ExcepcionSicrenet;
	
}
