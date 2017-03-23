package com.baz.ejb.service.impl;

import javax.ejb.Stateless;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.dao.MantenimientoPerfilesDao;
import com.baz.commons.domain.CatMantoMenuRol;
import com.baz.commons.domain.CatMantoMenuRolObj;
import com.baz.commons.domain.CatMenu;
import com.baz.commons.domain.CatPais;
import com.baz.commons.domain.CatRol;
import com.baz.ejb.service.MantenimientoPerfilesService;

@Stateless(name="mantenimientoPerfilesServiceImplements")
public class MantenimientoPerfilesServiceImplements implements MantenimientoPerfilesService, Serializable{

	
	@Inject 
	@Named("mantenimientoPerfileslDaoImpl")
	MantenimientoPerfilesDao mantenimientoPerfilesDao;
	
	@Override
	public List<CatRol> getPerfiles() {
		// TODO Auto-generated method stub
		//List<CatRol> listCatRol = new ArrayList<CatRol>();
		//listCatRol = mantenimientoPerfilesDao.getPerfiles();
		return  mantenimientoPerfilesDao.getPerfiles();
	}

	@Override
	public CatRol setPerfiles() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void insertaPerfiles(String descripcion,List<Integer> idsMenusSeleccionados,List<Integer> idsObjetosSeleccionados) {
		// TODO Auto-generated method stub
		mantenimientoPerfilesDao.insertaPerfiles(descripcion, idsMenusSeleccionados,idsObjetosSeleccionados);	
	}

	@Override
	public void eliminaPerfil(BigDecimal id) {
		// TODO Auto-generated method stub
		mantenimientoPerfilesDao.eliminaPerfil(id);
		
	}

	@Override
	public void editaPerfil(String descripcion,BigDecimal id,List<CatMantoMenuRol> vistasSeleccionadas,List<CatMantoMenuRolObj> objetosSeleccionados) {
		// TODO Auto-generated method stub
		mantenimientoPerfilesDao.editarPerfil(descripcion,id,vistasSeleccionadas,objetosSeleccionados);
	}

	@Override
	public List<CatMantoMenuRol> getMantoMenuRol(BigDecimal id) {
		//mantenimientoPerfilesDao.getMantoMenuRol(id);
		// TODO Auto-generated method stub
		return mantenimientoPerfilesDao.getMantoMenuRol(id);
	}

	@Override
	public List<CatMenu> getMenus() {
		// TODO Auto-generated method stub
		
		return mantenimientoPerfilesDao.getMenus();
	}

	@Override
	public List<CatMantoMenuRolObj> getObjetos() {
		// TODO Auto-generated method stub
		return mantenimientoPerfilesDao.getObjetos();
	}

	@Override
	public List<CatPais> getPaises() {
		// TODO Auto-generated method stub
		return mantenimientoPerfilesDao.getPaises();
	}

	@Override
	public List<CatMantoMenuRolObj> getObjetosManto(int idRol) {
		// TODO Auto-generated method stub
		return mantenimientoPerfilesDao.getObjetosManto(idRol);
	}
	
}
