package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.ResponsableVO;

@Remote
public interface MantenimientoCatalogoResponsableService {

	
	public List<ResponsableVO> cargaResponsableVO(int opcion, int idResponsable) throws ExcepcionSicrenet;
	
	public void guardarCatalogoResponsable(int opcion, int idResponsable, ResponsableVO agregaResponsable, String usuario) throws ExcepcionSicrenet;
	
	public ResponsableVO cargarCatalogoResponsableValidateExiste(int opcion, int idResponsable, String numEmpleado) throws ExcepcionSicrenet;
	
	
}
