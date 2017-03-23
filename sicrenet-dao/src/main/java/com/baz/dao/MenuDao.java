package com.baz.dao;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.domain.CatMenu;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.MenuVO;

@Remote
public interface MenuDao {
	
	
public  List<CatMenu>  generaMenu(int idPadre, int  estatus);

public  List<MenuVO>  generaMenus(int idPadre, String usuario)  throws ExcepcionSicrenet;



}
