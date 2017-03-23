package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.FasesVO;

@Remote
public interface MantenimientoCatalogoFaseDao {

	public List<FasesVO> cargarCatalogoFase(int opcion, int idFase, int estatus) throws ExcepcionSicrenet;

	public FasesVO guardarCatalogoFase(int opcion, int idFase, String nombre, String descripcion, int idEtapa,
			int estatus, String usuario) throws ExcepcionSicrenet;

	public FasesVO cargarCatalogoFaseValidateExiste(int opcion, int idFase, String nombre, String descripcion)
			throws ExcepcionSicrenet;

}
