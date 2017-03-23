package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.ConceptoVO;

@Remote
public interface MantenimientoCatalogoConceptoService {

	public List<ConceptoVO> cargaConceptoVO(int opcion, int idConcepto, int estatus) throws ExcepcionSicrenet;

	public void guardarCambiosAgregarActualizar(int opcion, int idConcepto, String descripcion, int estatus,
			String usuario) throws ExcepcionSicrenet;

	public ConceptoVO cargarCatalogoConceptoValidateExiste(int opcion, int idConcepto, String descripcion)
			throws ExcepcionSicrenet;

}
