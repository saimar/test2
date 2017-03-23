package com.baz.ejb.service;

import java.util.Date;
import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.domain.CatArea;
import com.baz.commons.domain.CatCedula;
import com.baz.commons.domain.CatPanelView;
import com.baz.commons.domain.CatResponsable;
import com.baz.commons.domain.CatSistema;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.BitFuenteVO;

@Remote
public interface PanelDeControlService {
	
	public List<CatPanelView> obtenerEtapaUno(String usuario, int opcion, int nivel, int idProceso, Date date) throws ExcepcionSicrenet;
	
	public CatCedula obtenerCedula(int opcion,  int id)throws ExcepcionSicrenet;
	
	public List<CatCedula> obtenerAgenda(int opcion,  int id)throws ExcepcionSicrenet;
	
	public void guardarCambiosCedula (CatCedula catCedula)throws ExcepcionSicrenet;
	
	public List<CatResponsable> obtenerResponsable (int opcion, int idResponsable) throws ExcepcionSicrenet;
	
	public List<CatArea> obtenerAreaResponsable (int opcion, int idArea) throws ExcepcionSicrenet;
	
	public List<CatSistema> obtenerSistema (int opcion, int idSistema) throws ExcepcionSicrenet;
	
	public void realizarCarga () throws ExcepcionSicrenet;
	
	public List<BitFuenteVO> obtenerDetalleReproceso(int opcion, int idFuente) throws ExcepcionSicrenet;

}
