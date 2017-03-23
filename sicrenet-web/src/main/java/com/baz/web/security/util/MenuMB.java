package com.baz.web.security.util;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import org.primefaces.model.menu.DefaultMenuItem;
import org.primefaces.model.menu.DefaultMenuModel;
import org.primefaces.model.menu.DefaultSubMenu;
import org.primefaces.model.menu.MenuModel;

import com.baz.commons.domain.CatMenu;
import com.baz.commons.domain.CatUsuarios;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.MenuVO;
import com.baz.ejb.service.MenuService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name="menu")
@SessionScoped
public class MenuMB {

	@EJB
	MenuService menuService;
	private MenuModel menumodel = new DefaultMenuModel();
	
	@PostConstruct
    private void init()
    {
		menumodel = generaerMenu();
    }

	public MenuModel generaerMenu()  {
		MenuModel model = new DefaultMenuModel();

		DefaultSubMenu menu = null;
		DefaultSubMenu subMenu = null;
		DefaultMenuItem menuItem = null;
		
		List<MenuVO> listMenuVO = new ArrayList<MenuVO>();
		LoginMB login = new LoginMB();
		
		try {

			
			listMenuVO = menuService.generaMenus(0, this.getSessionObj().getNumempleado());
			//listCatMenu = menuService.generarMenu(0,1);
			System.out.println("execute::generaerMenu" + listMenuVO.size());
			System.out.println("::generarNumEmpleadoSession::::" +  this.getSessionObj().getNumempleado());

				

		
		for (MenuVO menuVO : listMenuVO) {
			menu = new DefaultSubMenu(menuVO.getDescripcionMenu());
			menu.setId("menu" + menuVO.getDescripcionMenu());
			List<MenuVO> listCatSubMenu = new ArrayList<MenuVO>();
			System.out.println("valor id Menu:::" + menuVO.getIdmenu().intValue());
			
			
			
				listCatSubMenu = menuService.generaMenus(menuVO.getIdmenu().intValue(), this.getSessionObj().getNumempleado());
				//listCatSubMenu = menuService.generarMenu(catMenu.getIdmenu().intValue(),1);
				
				System.out.println("::generarNumEmpleadoSession::::" +  this.getSessionObj().getNumempleado());

			
			
			
			for(MenuVO catSubMenu : listCatSubMenu){
				subMenu = new DefaultSubMenu(catSubMenu.getDescripcionMenu());
				subMenu.setId("subMenu" + catSubMenu.getDescripcionMenu());
				System.out.println("subMenu" + catSubMenu.getDescripcionMenu());
				
				List<MenuVO> listMenuVOItem = new ArrayList<MenuVO>();
				System.out.println("valor id Menu:::" + catSubMenu.getIdmenu().intValue());
				
				
				
				
				listMenuVOItem = menuService.generaMenus(catSubMenu.getIdmenu().intValue(), this.getSessionObj().getNumempleado());
				//listCatMenuItem = menuService.generarMenu(catSubMenu.getIdmenu().intValue(),1);
				System.out.println("::generarNumEmpleadoSession::::" +  this.getSessionObj().getNumempleado());

				
				for(MenuVO MenuVOItem : listMenuVOItem){
					menuItem = new DefaultMenuItem(MenuVOItem.getDescripcionMenu());
					menuItem.setId("menuItem" + MenuVOItem.getDescripcionMenu());
					menuItem.setUrl(MenuVOItem.getUrl());
					subMenu.addElement(menuItem);
					
					System.out.println("MenuMB::::MenuVOItem::::URL::" + MenuVOItem.getUrl());
				
				
				}
				
				menu.addElement(subMenu);
			}
			
			model.addElement(menu);
		}} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
		// model.generateUniqueIds();
		return model;
	}
	
	public  CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get( "Usuario");
	}
	
	
	public MenuService getMenuService() {
		return menuService;
	}
	public void setMenuService(MenuService menuService) {
		this.menuService = menuService;
	}
	public MenuModel getMenumodel() {
		return menumodel;
	}
	public void setMenumodel(MenuModel menumodel) {
		this.menumodel = menumodel;
	}
	
}
