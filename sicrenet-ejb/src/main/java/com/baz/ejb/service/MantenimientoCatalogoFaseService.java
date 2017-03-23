package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.EtapasVO;
import com.baz.commons.vo.FasesVO;

@Remote
public interface MantenimientoCatalogoFaseService {

	public List<FasesVO> cargarCatalogoFase(int opcion, int idFase, int estatus) throws ExcepcionSicrenet;

	public void guardarCatalogoFase(int opcion, int idFase, String nombre, String descripcion, int idEtapa, int estatus,
			String usuario) throws ExcepcionSicrenet;

	public FasesVO cargarCatalogoFaseValidateExiste(int opcion, int idFase, String nombre, String descripcion)
			throws ExcepcionSicrenet;

	public List<EtapasVO> cargarCatalogoEtapas(int opcion, int idEtapa, int estatus) throws ExcepcionSicrenet;

}
