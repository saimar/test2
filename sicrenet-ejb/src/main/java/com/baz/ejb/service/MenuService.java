package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.domain.CatMenu;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.MenuVO;

@Remote
public interface MenuService {
	public List<CatMenu>  generarMenu(int idPadre, int estatus);
	
	
	public  List<MenuVO>  generaMenus(int idPadre, String usuario)  throws ExcepcionSicrenet;


}
