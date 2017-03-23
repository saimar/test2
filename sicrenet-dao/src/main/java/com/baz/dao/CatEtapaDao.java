package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.EtapasVO;

@Remote
public interface CatEtapaDao {
	
	public List<EtapasVO> cargarCatalogoEtapas(int opcion, int idEtapa, int estatus) throws ExcepcionSicrenet;

}
