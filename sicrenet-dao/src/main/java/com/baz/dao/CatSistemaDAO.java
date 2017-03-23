package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.domain.CatSistema;
import com.baz.commons.util.ExcepcionSicrenet;

@Remote
public interface CatSistemaDAO {
	public List<CatSistema> obtenerSistema(int opcion, int idSistema ) throws ExcepcionSicrenet;
}
