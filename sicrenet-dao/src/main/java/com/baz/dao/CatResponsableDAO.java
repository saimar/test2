package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.domain.CatResponsable;
import com.baz.commons.util.ExcepcionSicrenet;

@Remote
public interface CatResponsableDAO {
	
	public List<CatResponsable> obtenerResponsable(int opcion, int idResponsable ) throws ExcepcionSicrenet;

}
