package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.EstatusVO;

@Remote
public interface MantenimientoCatalogoEstatusDao {

	public List<EstatusVO> cargarCatalogoEstatus(int opcion, int idEstatus, int estatus) throws ExcepcionSicrenet;
		
	public void guardarCatalogoEstatus(int opcion, int idEstatus, String nombre, String clase, int estatus, String usuario) throws ExcepcionSicrenet;
	
	public EstatusVO cargarCatalogoEstatusValidateExiste(int opcion, int idEstatus, String nombre)  throws ExcepcionSicrenet;
	
}
