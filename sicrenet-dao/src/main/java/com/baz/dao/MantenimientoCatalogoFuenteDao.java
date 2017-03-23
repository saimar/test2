package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.FuenteVO;

@Remote
public interface MantenimientoCatalogoFuenteDao {

	
	
	public List<FuenteVO> cargarCatalogoFuente(int opcion, int idFuente) throws ExcepcionSicrenet;
	
	public FuenteVO guardarCatalogoFuente(int opcion, int idFuente, int idNivel, int idCedula, String store, int estatus, String usuario) throws ExcepcionSicrenet ;
	
	public FuenteVO cargarCatalogoFuenteValidateExiste(int opcion, int idCedula) throws ExcepcionSicrenet;
	
}
