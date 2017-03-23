package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.MenuVO;
import com.baz.dao.MantenimientoMenuDao;
import com.baz.ejb.service.MantenimientoMenuService;

@Stateless(name = "mantenimientoMenuServiceImpl")
public class MantenimientoMenuServiceImpl implements MantenimientoMenuService, Serializable {

	@Inject
	@Named("mantenimientoMenuDaoImpl")
	MantenimientoMenuDao mantenimientoMenuDao;

	private static final long serialVersionUID = 1L;

	public List<MenuVO> CargaListaMenu(int opcion, int idPadre, int idMenu, String usuario, int estatus)
			throws ExcepcionSicrenet {
		List<MenuVO> lisMenuPadre = new ArrayList<MenuVO>();

		lisMenuPadre = mantenimientoMenuDao.CargaListaMenu(opcion, idPadre, idMenu, usuario, estatus);
		return lisMenuPadre;
	}

	public MenuVO CargaMenu(int opcion, int idPadre, int idMenu, String usuario, int estatus) throws ExcepcionSicrenet {
		MenuVO menu = new MenuVO();

		menu = mantenimientoMenuDao.CargaMenu(opcion, idPadre, idMenu, usuario, estatus);
		return menu;
	}

	public void agregaNuevoMenu(MenuVO agregarMenu, int idPadre, String usuarioAlta) throws ExcepcionSicrenet {
		mantenimientoMenuDao.agregaNuevoMenu(agregarMenu, idPadre, usuarioAlta);
	}

	public void actualizaMenu(MenuVO actualizarMenu, String usuarioAlta) throws ExcepcionSicrenet {
		mantenimientoMenuDao.actualizaMenu(actualizarMenu, usuarioAlta);
	}

	public void eliminaMenu(int idMenu) throws ExcepcionSicrenet {
		mantenimientoMenuDao.eliminaMenu(idMenu);

	}

	public MenuVO cargarMenuValidateExiste(int opcion, String descripcion) throws ExcepcionSicrenet {
		MenuVO menu = new MenuVO();
		menu = mantenimientoMenuDao.cargarMenuValidateExiste(opcion, descripcion);
		return menu;
	}

	@Override
	public MenuVO cargarMenuPosicionMax(int opcion, int idPadre, int estatus) throws ExcepcionSicrenet {
		MenuVO menu = new MenuVO();
		menu = mantenimientoMenuDao.cargarMenuPosicionMax(opcion, idPadre, estatus);
		return menu;
	}
}

//
// public List<MenuVO> CargaMenuHijoAgregar(int idPadreAgregar) throws
// ExcepcionSicrenet {
// List<MenuVO> lisMenuHijo = new ArrayList<MenuVO>();
//
// lisMenuHijo=mantenimientoMenuDao.CargaMenuHijoAgregar(idPadreAgregar);
// return lisMenuHijo;
// }
//
// public List<CatMenu> getMenuActualizaPadre(int idPadre, int estatus) {
// CatMenu menu = new CatMenu();
// List<CatMenu> listMenuActualizaPadre =new ArrayList<CatMenu>();
//
// listMenuActualizaPadre=mantenimientoMenuDao.getMenuActualizaPadre(idPadre,
// estatus);
//
// return listMenuActualizaPadre;
// }
//
//
//
// public List<CatMenu> getMenuActualizaHijo(BigDecimal idPadre, int estatus) {
// CatMenu menu = new CatMenu();
// List<CatMenu> listMenuActualizaHijo =new ArrayList<CatMenu>();
//
// listMenuActualizaHijo=mantenimientoMenuDao.getMenuActualizahijo(idPadre,
// estatus);
//
// return listMenuActualizaHijo;
// }
//
//
// @Override
// public List<CatMenu> getMenuActualizaNieto(BigDecimal idPadre, int estatus) {
//
// List<CatMenu> listMenuActualizaNieto =new ArrayList<CatMenu>();
//
// listMenuActualizaNieto=mantenimientoMenuDao.getMenuActualizahijo(idPadre,
// estatus);
//
// return listMenuActualizaNieto;
// }
//
//
// @Override
// public CatMenu cargaDatosUltimoNivel(int idMenu) {
// CatMenu menu = new CatMenu();
// menu=mantenimientoMenuDao.cargaDatosUltimoNivel(idMenu);
// return menu;
// }
//
//
// @Override
// public CatMenu cargaDatosUltimoNivel2(int idMenu) {
// CatMenu menu = new CatMenu();
// menu=mantenimientoMenuDao.cargaDatosUltimoNivel2(idMenu);
// return menu;
// }
//
//
//
//
//
// @Override
// public MenuVO existeMenuAgrega(MenuVO existeMenuAgrega) throws
// ExcepcionSicrenet {
// MenuVO menu = new MenuVO();
// menu = mantenimientoMenuDao.existeMenuAgrega(existeMenuAgrega);
// return menu;
// }
//
//
//
//
//
//
