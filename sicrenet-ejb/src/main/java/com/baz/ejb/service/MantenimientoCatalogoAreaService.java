package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.AreaVO;

@Remote
public interface MantenimientoCatalogoAreaService {

	public List<AreaVO> cargarCatalogoArea(int opcion, int idArea, int estatus) throws ExcepcionSicrenet;

	public void guardarCatalogoArea(int opcion, int idArea, String descripcion, int estatus, String usuario)
			throws ExcepcionSicrenet;

	public AreaVO cargarCatalogoAreaValidateExiste(int opcion, int idArea, String descripcion) throws ExcepcionSicrenet;

}
