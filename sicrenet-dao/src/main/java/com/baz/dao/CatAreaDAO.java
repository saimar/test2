package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.domain.CatArea;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.AreaVO;

@Remote
public interface CatAreaDAO {
	public List<CatArea> obtenerAreaResponsable(int opcion, int idArea) throws ExcepcionSicrenet;

	public List<AreaVO> obtenerAreas(int opcion, int idArea, int estatus) throws ExcepcionSicrenet;

}
