package com.baz.web.mb;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import com.baz.commons.domain.CatUsuarios;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.MenuVO;
import com.baz.ejb.service.MantenimientoMenuService;
import com.baz.web.util.MostrarMensajesUtil;


@ManagedBean(name = "mantenimientoMenu")

@SessionScoped
public class MantenimientoMenuMB implements Serializable {

	/**
		 * 
		 */
	private static final long serialVersionUID = 1L;

	@EJB
	MantenimientoMenuService mantenimientoMenuService;
	
	
	private List<MenuVO> listaPadreNivel1;
	private int idMenuPadreNivel1;
	private List<MenuVO> listaHijoNivel2;
	private int idMenuHijoNivel2;
	private List<MenuVO> listaNietoNivel3;
	private int idMenuNietoNivel3;
	private MenuVO comboPadreNivel1;
	private MenuVO comboHijoNivel2;
	private MenuVO comboNietoNivel3;
	private String urlPadre;
	
	//variables guardan idMenu
	private int idMenuGlobalA;
	
	private int estatus;
	private MenuVO validateAgrega;

	private List<MenuVO> listaMenuPadre;
	
	private boolean enebleMenu;
	private Boolean enableMenuVariable;
	
	private boolean eneblePanel;
	private Boolean enablePanelVariable;

	// agregar
	private BigInteger listaMenuPadreAgregarNuevoMenu;// idpadre
	private String urlNuevoMenu;
	private int posicionNuevoMenu;
	private String descripcionNuevoMenu;
	private String usuarioAlta;
	private int idPadreCondicion;// ipPadreCondicion 0
	private int idPadreCondicionHijo;
	private int idmenuActualizaMetodo;

	// actualizar
	private BigDecimal listaMenuPadreActualizaNuevoMenu;// idmenu padre para actualizar
	private BigDecimal listaMenuHijoActualizaNuevoMenu; // idmenu hijo para	actualizar
	private BigDecimal listaMenuNietoActualizaNuevoMenu; //id nieto para actualizar
	private int 	IdPadreActualizaCondicion;  //variable para Actualizar en los Niveles 
	private List<MenuVO> ListaMenuActualizaPadre;
	private MenuVO menuListaPadre; 
	private MenuVO menuListaPadre2;
	private MenuVO menuListaPadre3;
	private List<MenuVO> ListaMenuActualizaHijo;
	private List<MenuVO> ListaMenuActualizaNieto;
	private List<MenuVO> ListaMenuActualizaultimoNieto;
	private String urlActualizaMenu;
	private int posicionActualizaMenu;
	private String descripcionActulizaMenu;

	private BigDecimal variableIdmenuActualiza;
	
	// ELIMINA
	private BigDecimal idMenuEliminaMenu;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {
		try {
			
			listaPadreNivel1 = mantenimientoMenuService.CargaListaMenu(8, 0, 0, null, 1);
			ListaMenuActualizaPadre = mantenimientoMenuService.CargaListaMenu(8, 0, 0, null, 1);
			
			
		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

		
	}

	
	public void nivelHijo() throws ExcepcionSicrenet{
		try{ 
			System.out.println("idmenupadre::: " + idMenuPadreNivel1);
			
		listaHijoNivel2 = mantenimientoMenuService.CargaListaMenu(8, idMenuPadreNivel1, 0, null, 1);
		menuListaPadre = mantenimientoMenuService.cargarMenuPosicionMax(10, idMenuPadreNivel1, 1);
		posicionNuevoMenu = menuListaPadre.getStatus();
		setUrlNuevoMenu("../pages/NombrePagina.xhtml");
		System.out.println("IDPADRE::: " + idMenuPadreNivel1);
		System.out.println("MAXIMO POSICION::: " + menuListaPadre.getStatus());
		System.out.println("url agregar::: " + urlNuevoMenu);
		
		
		//posicionNuevoMenu = menuListaPadre.getEstatus().intValue();
		idMenuGlobalA = idMenuPadreNivel1;
	
		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}
	
	public void nivelNieto()  throws ExcepcionSicrenet{
		try{  
			listaNietoNivel3 = mantenimientoMenuService.CargaListaMenu(8, idMenuHijoNivel2, 0, null, 1);
			menuListaPadre2 = mantenimientoMenuService.cargarMenuPosicionMax(10, idMenuHijoNivel2, 1);
			posicionNuevoMenu = menuListaPadre2.getStatus();
			setUrlNuevoMenu("../pages/NombrePagina.xhtml");
			System.out.println("IDPADRE::: " + idMenuHijoNivel2);
			System.out.println("MAXIMO POSICION::: " + menuListaPadre2.getStatus());
			System.out.println("url agrega::: " + urlNuevoMenu);
			
			
			idMenuGlobalA = idMenuHijoNivel2;
		}catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	public void eneablePadre()  throws ExcepcionSicrenet{
		enableMenuVariable = enebleMenu == true ? true : false;
		urlNuevoMenu = enableMenuVariable == true ? "#" : "";
		
	}

	public void eneableActualizar()  throws ExcepcionSicrenet{
		enablePanelVariable = eneblePanel == true ? true : false;
	}


	public void llenaComboHijo()  throws ExcepcionSicrenet{
		try{
		ListaMenuActualizaHijo = mantenimientoMenuService.CargaListaMenu(8, listaMenuPadreActualizaNuevoMenu.intValue(), 0, null, 1);
		
		menuListaPadre = mantenimientoMenuService.CargaMenu(3, 0, listaMenuPadreActualizaNuevoMenu.intValue(), null, 1);
		variableIdmenuActualiza = listaMenuPadreActualizaNuevoMenu;
	
		urlActualizaMenu = menuListaPadre.getUrl();
		posicionActualizaMenu = menuListaPadre.getPosicion();
		descripcionActulizaMenu = menuListaPadre.getDescripcion();
		
		System.out.println("prueba:: idMenupadre:::" + listaMenuPadreActualizaNuevoMenu);
		System.out.println("prueba:: idpadre:::" + listaMenuHijoActualizaNuevoMenu);
		System.out.println("prueba:: urlPadre:::" + urlActualizaMenu);
		System.out.println("prueba:: PosicionPadre:::" + posicionActualizaMenu);
		System.out.println("prueba:: DescripcionPadre:::" + descripcionActulizaMenu);
	}catch (ExcepcionSicrenet e) {
		MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Cargar Menu.");
	}

	}

	public void llenaComboNieto()  throws ExcepcionSicrenet{
		try{
		ListaMenuActualizaNieto = mantenimientoMenuService.CargaListaMenu(8, listaMenuHijoActualizaNuevoMenu.intValue(), 0, null, 1);
		menuListaPadre2 = mantenimientoMenuService.CargaMenu(3, 0, listaMenuHijoActualizaNuevoMenu.intValue(), null, 1);
		idPadreCondicionHijo = listaMenuPadreActualizaNuevoMenu.intValue();
		variableIdmenuActualiza = listaMenuHijoActualizaNuevoMenu;
		
		
		
		
		
		
		urlActualizaMenu = menuListaPadre2.getUrl();
		posicionActualizaMenu = menuListaPadre2.getPosicion();
		descripcionActulizaMenu = menuListaPadre2.getDescripcion();
		
		System.out.println("prueba:: idpadreHIJO:::" + idPadreCondicionHijo);
		System.out.println("prueba:: idMenuHijo:::" + variableIdmenuActualiza);
		System.out.println("prueba:: urHijo:::" + urlActualizaMenu);
		System.out.println("prueba:: posiiconHijo:::" + posicionActualizaMenu);
		System.out.println("prueba:: DescripcionHijo:::" + descripcionActulizaMenu);
	}catch (ExcepcionSicrenet e) {
		MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Cargar Menu.");
	}

	}

	public void llenaComboultimoNieto() {
		try{
		ListaMenuActualizaultimoNieto = mantenimientoMenuService.CargaListaMenu(8, listaMenuNietoActualizaNuevoMenu.intValue(), 0, null, 1);
		menuListaPadre3 = mantenimientoMenuService.CargaMenu(3, 0, listaMenuNietoActualizaNuevoMenu.intValue(), null, 1);
		idPadreCondicionHijo = listaMenuHijoActualizaNuevoMenu.intValue();
		variableIdmenuActualiza = listaMenuNietoActualizaNuevoMenu;
		
		
		
		urlActualizaMenu = menuListaPadre3.getUrl();
		posicionActualizaMenu = menuListaPadre3.getPosicion();
		descripcionActulizaMenu = menuListaPadre3.getDescripcion();
		

		System.out.println("prueba:: idPadreNieto:::" + idPadreCondicionHijo);
		System.out.println("prueba:: idMenuNieto:::" + variableIdmenuActualiza);
		System.out.println("prueba:: urlNieto:::" + urlActualizaMenu);
		System.out.println("prueba:: posicionNieto:::" + posicionActualizaMenu);
		System.out.println("prueba:: DescripcionNieto:::" + descripcionActulizaMenu);
		
	}catch (ExcepcionSicrenet e) {
		MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Cargar Menu.");
	}


	}
	
	
	
	
	public void AgregaMenu() throws ExcepcionSicrenet {
		
		if ( urlNuevoMenu == null || urlNuevoMenu.trim().length() == 0
			|| descripcionNuevoMenu == null || descripcionNuevoMenu.trim().length() == 0 
			|| String.valueOf(posicionNuevoMenu).toString() == null || String.valueOf(posicionNuevoMenu).toString().trim().length() == 0
				){
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden Contener Vacio.");
		} else {
			MenuVO agregaMenu = new MenuVO();
			try{
		// agregaMenu.setIdpadre(this.listaMenuPadreAgregarNuevoMenu);
		
		agregaMenu.setUrl(this.urlNuevoMenu);
		agregaMenu.setPosicion(posicionNuevoMenu);
		agregaMenu.setDescripcion(this.descripcionNuevoMenu);
		idMenuGlobalA =	idMenuPadreNivel1 == 0 ? 0 : idMenuGlobalA;
		
		System.out.println(	"MantenimientoMnuMB::AgregaMenu:::idMenuHijoNivel2:::IdMenuAgregaru:::" + idMenuHijoNivel2);
		System.out.println("MantenimientoMnuMB::AgregaMenu:::idMenuGlobalA:::" + idMenuGlobalA);
		System.out.println("MantenimientoMnuMB::AgregaMenu::::::descripcionNuevoMenu:::" + this.descripcionNuevoMenu);
		System.out.println("MantenimientoMnuMB::AgregaMenu::::::urlNuevoMenu:::" + this.urlNuevoMenu);
		System.out.println("MantenimientoMnuMB::AgregaMenu::::::posicionNuevoMenu:::" + this.posicionNuevoMenu);
		System.out.println("MantenimientoMnuMB::AgregaMenu:::Usuario:::::" + this.getSessionObj().getNumempleado());
		
		validateAgrega = mantenimientoMenuService.cargarMenuValidateExiste(9, descripcionNuevoMenu);
		System.out.println("MantenimientoMnuMB::AgregaMenu:::validateAgrega:::::" + validateAgrega.getStatus());
		
		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar si Existe.");
		}
			if(validateAgrega.getStatus() == 0){
				try{
		

			mantenimientoMenuService.agregaNuevoMenu(agregaMenu, idMenuGlobalA, this.getSessionObj().getNumempleado());
			MostrarMensajesUtil.agregarMensaje(4, "INGRESADO.", "Agregado Correctamente.");
			this.limpiar();

			
		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
		}
		} else {
			MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Menu Existente.");
		}

	}
	

	}

	public void ActualizaMenu() throws ExcepcionSicrenet {
		
		if ( urlActualizaMenu == null || urlActualizaMenu.trim().length() == 0
			|| String.valueOf(posicionActualizaMenu).toString() == null || String.valueOf(posicionActualizaMenu).toString().trim().length() == 0
			|| descripcionActulizaMenu == null || descripcionActulizaMenu.trim().length() == 0
			|| listaMenuPadreActualizaNuevoMenu == null 
			|| listaMenuHijoActualizaNuevoMenu == null
			|| listaMenuNietoActualizaNuevoMenu == null){
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden Contener Vacio.");
		}else {
			MenuVO actualizaMenu = new MenuVO();
		
		try {

		
		// agregaMenu.setIdpadre(this.listaMenuPadreAgregarNuevoMenu);
		actualizaMenu.setUrl(this.urlActualizaMenu);
		actualizaMenu.setPosicion(posicionActualizaMenu);
		actualizaMenu.setDescripcion(this.descripcionActulizaMenu);
		actualizaMenu.setIdmenu(variableIdmenuActualiza);
		actualizaMenu.setIdpadre(IdPadreActualizaCondicion);
		
		IdPadreActualizaCondicion = listaMenuHijoActualizaNuevoMenu ==  null ? 0 : idPadreCondicionHijo;
		validateAgrega = mantenimientoMenuService.cargarMenuValidateExiste(9, descripcionActulizaMenu);
		
		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar si Existe.");
		}
			if(validateAgrega.getStatus() == 0){
				try{
		

		
		System.out.println("MantenimientoMnuMB::ActualizaMenu:::listaMenuPadreActualizaNuevoMenu::: IdMenuActualiza:::" +variableIdmenuActualiza);
		System.out.println("MantenimientoMnuMB::ActualizaMenu:::listaMenuHijoActualizaNuevoMenu:::IdPadreActualiza::::"+ idPadreCondicionHijo);
		System.out.println("MantenimientoMnuMB::ActualizaMenu:::listaMenuHijoActualizaNuevoMenu:::IdPadreCondicionActualiza::::"+ IdPadreActualizaCondicion);
				System.out.println("MantenimientoMnuMB::ActualizaMenu:::urlActualizaMenu:::" + urlActualizaMenu);
		System.out.println("MantenimientoMnuMB::ActualizaMenu:::descripcionActulizaMenu:::" + this.descripcionActulizaMenu);
		System.out.println("MantenimientoMnuMB::ActualizaMenu::::posicionActualizaMenu:::" + posicionActualizaMenu);

			mantenimientoMenuService.actualizaMenu(actualizaMenu, this.getSessionObj().getNumempleado());
			MostrarMensajesUtil.agregarMensaje(4, "Actualizado.", "Actualizado Correctamente.");
			this.limpiar();
		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "ERROR!", "Error al Actualizar");
		}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Menu Existente.");
			}

		}
		

		}

	public void EliminaMenu() throws ExcepcionSicrenet {
		
		if ( urlActualizaMenu == null || urlActualizaMenu.trim().length() == 0
				|| String.valueOf(posicionActualizaMenu).toString() == null || String.valueOf(posicionActualizaMenu).toString().trim().length() == 0
				|| descripcionActulizaMenu == null || descripcionActulizaMenu.trim().length() == 0
				|| listaMenuPadreActualizaNuevoMenu == null 
				|| listaMenuHijoActualizaNuevoMenu == null
				|| listaMenuNietoActualizaNuevoMenu == null){
				MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden Contener Vacio.");
			}else {
				
			
			try {

		idMenuEliminaMenu = listaMenuPadreActualizaNuevoMenu;

		System.out.println("MantenimientoMnuMB::ActualizaMenu:::listaMenuPadreActualizaNuevoMenu:::"
				+ listaMenuPadreActualizaNuevoMenu);
		System.out.println("MantenimientoMnuMB::ActualizaMenu:::listaMenuHijoActualizaNuevoMenu:::"
				+ listaMenuHijoActualizaNuevoMenu);
		System.out.println("MantenimientoMnuMB::ActualizaMenu:::urlActualizaMenu:::" + urlActualizaMenu);
		System.out.println(
				"MantenimientoMnuMB::ActualizaMenu::::::descripcionActulizaMenu:::" + this.descripcionActulizaMenu);
		System.out.println("MantenimientoMnuMB::ActualizaMenu::::posicionActualizaMenu:::" + posicionActualizaMenu);



			mantenimientoMenuService.eliminaMenu(variableIdmenuActualiza.intValue());
			MostrarMensajesUtil.agregarMensaje(4, "Eliminado.", "Eliminado Correctamente.");
			
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Actualizar");
			}
		} 

			}


	public void limpiar() {

		setListaMenuPadreAgregarNuevoMenu(null);
		setUrlNuevoMenu("");
		setPosicionNuevoMenu(0);
		setDescripcionNuevoMenu("");

		setListaMenuPadreActualizaNuevoMenu(null);
		setListaMenuHijoActualizaNuevoMenu(null);
		setListaMenuNietoActualizaNuevoMenu(null);
		setUrlActualizaMenu("");
		setPosicionActualizaMenu(0);
		setDescripcionActulizaMenu("");
		
		setIdMenuPadreNivel1(0);
		setIdMenuHijoNivel2(0);
		setIdMenuNietoNivel3(0);
		

	}

	public  CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get( "Usuario");
	}

	public List<MenuVO> getListaMenuPadre() {
		return listaMenuPadre;
	}

	public void setListaMenuPadre(List<MenuVO> listaMenuPadre) {
		this.listaMenuPadre = listaMenuPadre;
	}

	public BigInteger getListaMenuPadreAgregarNuevoMenu() {
		return listaMenuPadreAgregarNuevoMenu;
	}

	public void setListaMenuPadreAgregarNuevoMenu(BigInteger listaMenuPadreAgregarNuevoMenu) {
		this.listaMenuPadreAgregarNuevoMenu = listaMenuPadreAgregarNuevoMenu;
	}

	public String getUrlNuevoMenu() {
		return urlNuevoMenu;
	}

	public void setUrlNuevoMenu(String urlNuevoMenu) {
		this.urlNuevoMenu = urlNuevoMenu;
	}

	public int getPosicionNuevoMenu() {
		return posicionNuevoMenu;
	}

	public void setPosicionNuevoMenu(int posicionNuevoMenu) {
		this.posicionNuevoMenu = posicionNuevoMenu;
	}

	public String getDescripcionNuevoMenu() {
		return descripcionNuevoMenu;
	}

	public void setDescripcionNuevoMenu(String descripcionNuevoMenu) {
		this.descripcionNuevoMenu = descripcionNuevoMenu;
	}

	public int getIdPadreCondicion() {
		return idPadreCondicion;
	}

	public void setIdPadreCondicion(int idPadreCondicion) {
		this.idPadreCondicion = idPadreCondicion;
	}

	public String getUsuarioAlta() {
		return usuarioAlta;
	}

	public void setUsuarioAlta(String usuarioAlta) {
		this.usuarioAlta = usuarioAlta;
	}

	public BigDecimal getListaMenuPadreActualizaNuevoMenu() {
		return listaMenuPadreActualizaNuevoMenu;
	}

	public void setListaMenuPadreActualizaNuevoMenu(BigDecimal listaMenuPadreActualizaNuevoMenu) {
		this.listaMenuPadreActualizaNuevoMenu = listaMenuPadreActualizaNuevoMenu;
	}

	public List<MenuVO> getListaMenuActualizaPadre() {
		return ListaMenuActualizaPadre;
	}

	public void setListaMenuActualizaPadre(List<MenuVO> listaMenuActualizaPadre) {
		ListaMenuActualizaPadre = listaMenuActualizaPadre;
	}

	public List<MenuVO> getListaMenuActualizaHijo() {
		return ListaMenuActualizaHijo;
	}

	public void setListaMenuActualizaHijo(List<MenuVO> listaMenuActualizaHijo) {
		ListaMenuActualizaHijo = listaMenuActualizaHijo;
	}

	public MenuVO getMenuListaPadre() {
		return menuListaPadre;
	}

	public void setMenuListaPadre(MenuVO menuListaPadre) {
		this.menuListaPadre = menuListaPadre;
	}

	public BigDecimal getListaMenuNietoActualizaNuevoMenu() {
		return listaMenuNietoActualizaNuevoMenu;
	}

	public void setListaMenuNietoActualizaNuevoMenu(BigDecimal listaMenuNietoActualizaNuevoMenu) {
		this.listaMenuNietoActualizaNuevoMenu = listaMenuNietoActualizaNuevoMenu;
	}

	public List<MenuVO> getListaMenuActualizaNieto() {
		return ListaMenuActualizaNieto;
	}

	public void setListaMenuActualizaNieto(List<MenuVO> listaMenuActualizaNieto) {
		ListaMenuActualizaNieto = listaMenuActualizaNieto;
	}

	public BigDecimal getListaMenuHijoActualizaNuevoMenu() {
		return listaMenuHijoActualizaNuevoMenu;
	}

	public void setListaMenuHijoActualizaNuevoMenu(BigDecimal listaMenuHijoActualizaNuevoMenu) {
		this.listaMenuHijoActualizaNuevoMenu = listaMenuHijoActualizaNuevoMenu;
	}

	public String getUrlActualizaMenu() {
		return urlActualizaMenu;
	}

	public void setUrlActualizaMenu(String urlActualizaMenu) {
		this.urlActualizaMenu = urlActualizaMenu;
	}

	public MenuVO getMenuListaPadre2() {
		return menuListaPadre2;
	}

	public void setMenuListaPadre2(MenuVO menuListaPadre2) {
		this.menuListaPadre2 = menuListaPadre2;
	}

	public boolean isEnebleMenu() {
		return enebleMenu;
	}

	public void setEnebleMenu(boolean enebleMenu) {
		this.enebleMenu = enebleMenu;
	}

	public int getPosicionActualizaMenu() {
		return posicionActualizaMenu;
	}

	public void setPosicionActualizaMenu(int posicionActualizaMenu) {
		this.posicionActualizaMenu = posicionActualizaMenu;
	}

	public String getDescripcionActulizaMenu() {
		return descripcionActulizaMenu;
	}

	public void setDescripcionActulizaMenu(String descripcionActulizaMenu) {
		this.descripcionActulizaMenu = descripcionActulizaMenu;
	}

	public BigDecimal getIdMenuEliminaMenu() {
		return idMenuEliminaMenu;
	}

	public void setIdMenuEliminaMenu(BigDecimal idMenuEliminaMenu) {
		this.idMenuEliminaMenu = idMenuEliminaMenu;
	}

	public Boolean getEnableMenuVariable() {
		return enableMenuVariable;
	}

	public void setEnableMenuVariable(Boolean enableMenuVariable) {
		this.enableMenuVariable = enableMenuVariable;
	}

	public MenuVO getMenuListaPadre3() {
		return menuListaPadre3;
	}

	public void setMenuListaPadre3(MenuVO menuListaPadre3) {
		this.menuListaPadre3 = menuListaPadre3;
	}

	public List<MenuVO> getListaMenuActualizaultimoNieto() {
		return ListaMenuActualizaultimoNieto;
	}

	public void setListaMenuActualizaultimoNieto(List<MenuVO> listaMenuActualizaultimoNieto) {
		ListaMenuActualizaultimoNieto = listaMenuActualizaultimoNieto;
	}

	public boolean isEneblePanel() {
		return eneblePanel;
	}

	public void setEneblePanel(boolean eneblePanel) {
		this.eneblePanel = eneblePanel;
	}

	public Boolean getEnablePanelVariable() {
		return enablePanelVariable;
	}

	public void setEnablePanelVariable(Boolean enablePanelVariable) {
		this.enablePanelVariable = enablePanelVariable;
	}

	public int getIdPadreActualizaCondicion() {
		return IdPadreActualizaCondicion;
	}

	public void setIdPadreActualizaCondicion(int idPadreActualizaCondicion) {
		IdPadreActualizaCondicion = idPadreActualizaCondicion;
	}

	public int getIdPadreCondicionHijo() {
		return idPadreCondicionHijo;
	}

	public void setIdPadreCondicionHijo(int idPadreCondicionHijo) {
		this.idPadreCondicionHijo = idPadreCondicionHijo;
	}

	public int getIdmenuActualizaMetodo() {
		return idmenuActualizaMetodo;
	}

	public void setIdmenuActualizaMetodo(int idmenuActualizaMetodo) {
		this.idmenuActualizaMetodo = idmenuActualizaMetodo;
	}


	public List<MenuVO> getListaPadreNivel1() {
		return listaPadreNivel1;
	}


	public void setListaPadreNivel1(List<MenuVO> listaPadreNivel1) {
		this.listaPadreNivel1 = listaPadreNivel1;
	}


	public int getIdMenuPadreNivel1() {
		return idMenuPadreNivel1;
	}


	public void setIdMenuPadreNivel1(int idMenuPadreNivel1) {
		this.idMenuPadreNivel1 = idMenuPadreNivel1;
	}


	public List<MenuVO> getListaHijoNivel2() {
		return listaHijoNivel2;
	}


	public void setListaHijoNivel2(List<MenuVO> listaHijoNivel2) {
		this.listaHijoNivel2 = listaHijoNivel2;
	}


	public int getIdMenuHijoNivel2() {
		return idMenuHijoNivel2;
	}


	public void setIdMenuHijoNivel2(int idMenuHijoNivel2) {
		this.idMenuHijoNivel2 = idMenuHijoNivel2;
	}


	public List<MenuVO> getListaNietoNivel3() {
		return listaNietoNivel3;
	}


	public void setListaNietoNivel3(List<MenuVO> listaNietoNivel3) {
		this.listaNietoNivel3 = listaNietoNivel3;
	}


	public int getIdMenuNietoNivel3() {
		return idMenuNietoNivel3;
	}


	public void setIdMenuNietoNivel3(int idMenuNietoNivel3) {
		this.idMenuNietoNivel3 = idMenuNietoNivel3;
	}


	public MenuVO getComboPadreNivel1() {
		return comboPadreNivel1;
	}


	public void setComboPadreNivel1(MenuVO comboPadreNivel1) {
		this.comboPadreNivel1 = comboPadreNivel1;
	}


	public MenuVO getComboHijoNivel2() {
		return comboHijoNivel2;
	}


	public void setComboHijoNivel2(MenuVO comboHijoNivel2) {
		this.comboHijoNivel2 = comboHijoNivel2;
	}


	public MenuVO getComboNietoNivel3() {
		return comboNietoNivel3;
	}


	public void setComboNietoNivel3(MenuVO comboNietoNivel3) {
		this.comboNietoNivel3 = comboNietoNivel3;
	}


	public int getIdMenuGlobalA() {
		return idMenuGlobalA;
	}


	public void setIdMenuGlobalA(int idMenuGlobalA) {
		this.idMenuGlobalA = idMenuGlobalA;
	}


	public String getUrlPadre() {
		return urlPadre;
	}


	public void setUrlPadre(String urlPadre) {
		this.urlPadre = urlPadre;
	}


	public int getEstatus() {
		return estatus;
	}


	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}


	public MenuVO getValidateAgrega() {
		return validateAgrega;
	}


	public void setValidateAgrega(MenuVO validateAgrega) {
		this.validateAgrega = validateAgrega;
	}

	
	
	
}
