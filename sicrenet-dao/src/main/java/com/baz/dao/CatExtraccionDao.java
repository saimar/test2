package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.ExtraccionVO;

@Remote
public interface CatExtraccionDao {
	
	public List<ExtraccionVO> cargarCatalogoExtraccion(int opcion, int idExtracion) throws ExcepcionSicrenet;
	

}
