package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.EtapasVO;

@Remote
public interface MantenimientoCatalogoEtapaService {

	public List<EtapasVO> cargarCatalogoEtapas(int opcion, int idEtapa, int estatus) throws ExcepcionSicrenet;

	public void guardaCalatogoEtapa(int opcion, int idEtapa, String nombre, String descripcion, int estatus,
			String usuario) throws ExcepcionSicrenet;

	public EtapasVO cargarCatalogoEtapasValidateExiste(int opcion, int idEtapa, String nombre, String descripcion)
			throws ExcepcionSicrenet;

}
