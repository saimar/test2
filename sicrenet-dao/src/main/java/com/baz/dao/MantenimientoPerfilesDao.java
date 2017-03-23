package com.baz.dao;

import java.math.BigDecimal;
import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.domain.CatMantoMenuRol;
import com.baz.commons.domain.CatMantoMenuRolObj;
import com.baz.commons.domain.CatMenu;
import com.baz.commons.domain.CatPais;
import com.baz.commons.domain.CatRol;

@Remote
public interface MantenimientoPerfilesDao {
	public List<CatRol> getPerfiles();
	public List <CatMantoMenuRol> getMantoMenuRol(BigDecimal id);
	public void insertaPerfiles(String descripcion,List<Integer> idsMenusSeleccionados,List <Integer> idsObjetosSeleccionados);
	public void eliminaPerfil(BigDecimal id);
	public void editarPerfil(String descripcion,BigDecimal id,List<CatMantoMenuRol> vistasSeleccionadas,List<CatMantoMenuRolObj> objetosSeleccionados);
	public List <CatMenu> getMenus();
	public List <CatMantoMenuRolObj> getObjetos();
	public List <CatPais> getPaises();
	public List <CatMantoMenuRolObj> getObjetosManto(int idRol);
}