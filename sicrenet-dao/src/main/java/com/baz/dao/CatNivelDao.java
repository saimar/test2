package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.NivelVO;

@Remote
public interface CatNivelDao {

	
	public List<NivelVO> cargarCatalogoNivel() throws ExcepcionSicrenet;
	
}
