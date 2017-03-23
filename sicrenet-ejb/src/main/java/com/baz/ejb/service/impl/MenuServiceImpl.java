package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.dao.MenuDao;
import com.baz.commons.domain.CatMenu;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.MenuVO;
import com.baz.ejb.service.MenuService;

@Stateless(name="MenuServiceImpl")
public class MenuServiceImpl implements MenuService, Serializable {
	
	@Inject 
	@Named("MenuDaoImpl")
	MenuDao menuDao;
	
	public List<CatMenu> generarMenu(int idPadre, int estatus) {
		List<CatMenu> lsitCatMenu = menuDao.generaMenu(idPadre, estatus);
		return lsitCatMenu;
	}

	@Override
	public List<MenuVO> generaMenus(int idPadre, String usuario)  throws ExcepcionSicrenet{
		List<MenuVO> lsitCatMenu = menuDao.generaMenus(idPadre, usuario);
		return lsitCatMenu;
	}
	
	
}
