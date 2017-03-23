package com.baz.ejb.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.inject.Named;

import com.baz.commons.domain.CatArea;
import com.baz.commons.domain.CatCedula;
import com.baz.commons.domain.CatPanelView;
import com.baz.commons.domain.CatResponsable;
import com.baz.commons.domain.CatSistema;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.BitFuenteVO;
import com.baz.dao.CatAreaDAO;
import com.baz.dao.CatResponsableDAO;
import com.baz.dao.CatSistemaDAO;
import com.baz.dao.PanelDeControlDao;
import com.baz.ejb.service.PanelDeControlService;

@Stateless(name="panelDeControlServiceImpl")
public class PanelDeControlServiceImpl implements PanelDeControlService, Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Inject 
	@Named("panelDeControlDaoImpl")
	PanelDeControlDao panelDeControlDao;
	@Inject 
	@Named("catResponsableDAOImpl")
	CatResponsableDAO catResponsableDAO;
	@Inject 
	@Named("catAreaDAOImpl")
	CatAreaDAO catAreaDAO;
	@Inject
	@Named("catSistemaDAOImpl")
	CatSistemaDAO catSistemaDAO;
	
	@Override
	public List<CatPanelView> obtenerEtapaUno(String usuario,int opcion, int nivel, int idProceso, Date date) throws ExcepcionSicrenet {
		List<CatPanelView> listCatPanelView = null;//new ArrayList<CatPanelView>();
	listCatPanelView = panelDeControlDao.obtenerEtapaUno(usuario, opcion, nivel, date);
		System.out.println("PanelDeControlServiceImpl:::obtenerEtapaUno::"+listCatPanelView.size());
		return listCatPanelView;
	}
	
	public CatCedula obtenerCedula(int opcion, int id) throws ExcepcionSicrenet {
		List<CatCedula> listCatCedula = panelDeControlDao.obtenerCedula(opcion, id);
		CatCedula catCedula = listCatCedula.get(0);
		return catCedula;
	}

	public void guardarCambiosCedula(CatCedula catCedula) throws ExcepcionSicrenet {
	
		panelDeControlDao.guardarCambiosCedula(catCedula);
	}

	public List<CatResponsable> obtenerResponsable(int opcion, int idResponsable) throws ExcepcionSicrenet {
		List<CatResponsable> listCatResponsable = new ArrayList<CatResponsable>();
		listCatResponsable = catResponsableDAO.obtenerResponsable(opcion, idResponsable);
		return listCatResponsable;
	}

	public List<CatArea> obtenerAreaResponsable(int opcion, int idArea) throws ExcepcionSicrenet {
		List<CatArea> listCatAreaResponsable = new ArrayList<CatArea>();
		listCatAreaResponsable = catAreaDAO.obtenerAreaResponsable(opcion, idArea);
		return listCatAreaResponsable;
	}

	@Override
	public List<CatSistema> obtenerSistema(int opcion, int idSistema) throws ExcepcionSicrenet {
		List<CatSistema> listCatSistema = new ArrayList<CatSistema>();
		listCatSistema = catSistemaDAO.obtenerSistema(opcion, idSistema);
		return listCatSistema;
	}

	@Override
	public List<CatCedula> obtenerAgenda(int opcion, int id) throws ExcepcionSicrenet {
		List<CatCedula> listCatCedula = panelDeControlDao.obtenerCedula(opcion, id);
		System.out.println("valor de la lista en service::::" + listCatCedula.size());
		return listCatCedula;
	}

	
	public void realizarCarga() throws ExcepcionSicrenet {
	panelDeControlDao.realizarCarga();
	}

	@Override
	public List<BitFuenteVO> obtenerDetalleReproceso(int opcion, int idFuente) throws ExcepcionSicrenet {
		List<BitFuenteVO> listBitFuente = panelDeControlDao.obtenerDetalleReproceso(opcion, idFuente); 
		return listBitFuente;
	}

}
