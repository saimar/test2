package com.baz.dao;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.EtapasVO;

@Remote
public interface MantenimientoCatalogoEtapaDao {

	
	public EtapasVO guardaCalatogoEtapa(int opcion, int idEtapa, String nombre, String descripcion, int estatus,
			String usuario) throws ExcepcionSicrenet;

	public EtapasVO cargarCatalogoEtapasValidateExiste(int opcion, int idEtapa, String nombre, String descripcion)
			throws ExcepcionSicrenet;

}
