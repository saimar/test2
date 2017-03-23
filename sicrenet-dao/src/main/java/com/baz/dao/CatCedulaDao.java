package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.CedulaVO;

@Remote
public interface CatCedulaDao {
	
	public List<CedulaVO> cargarCatalogoCedula() throws ExcepcionSicrenet;
	

}
