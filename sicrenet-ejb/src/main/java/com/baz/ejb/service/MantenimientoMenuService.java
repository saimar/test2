package com.baz.ejb.service;

import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.MenuVO;
@Remote
public interface MantenimientoMenuService {

	
	
	public List<MenuVO> CargaListaMenu(int opcion, int idPadre, int idMenu, String usuario, int estatus) throws ExcepcionSicrenet; 
	
	public MenuVO CargaMenu(int opcion, int idPadre, int idMenu, String usuario, int estatus) throws ExcepcionSicrenet; 
	
	public void agregaNuevoMenu(MenuVO agregarMenu, int idPadre, String usuarioAlta) throws ExcepcionSicrenet;
	
	public void actualizaMenu(MenuVO actualizarMenu, String usuarioAlta) throws ExcepcionSicrenet;
	
	public void eliminaMenu(int idMenu) throws ExcepcionSicrenet;
		
	public MenuVO cargarMenuValidateExiste(int opcion, String descripcion) throws ExcepcionSicrenet; 
	
	public MenuVO cargarMenuPosicionMax(int opcion, int idPadre, int estatus) throws ExcepcionSicrenet;
	
	
	
	
//	
//	
//	
//	public List<MenuVO> CargaMenuHijoAgregar(int idPadreAgregar) throws ExcepcionSicrenet; 
//		
//		
//	public List<CatMenu> getMenuActualizaPadre(int idPadre, int estatus);
//	
//	public List<CatMenu> getMenuActualizaHijo(BigDecimal idPadre, int estatus);
//	
//	public List<CatMenu> getMenuActualizaNieto(BigDecimal idPadre, int estatus);
//	
//	public CatMenu cargaDatosUltimoNivel( int idMenu);
//	
//	public CatMenu cargaDatosUltimoNivel2( int idMenu);
	
}