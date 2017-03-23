package com.baz.dao;

import java.util.Date;
import java.util.List;

import javax.ejb.Remote;

import com.baz.commons.domain.CatCedula;
import com.baz.commons.domain.CatPanelView;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.BitFuenteVO;

@Remote
public interface PanelDeControlDao {

	public List<CatPanelView> obtenerEtapaUno(String usuario, int opcion, int nivel,Date date) throws ExcepcionSicrenet;
	
	public List<CatCedula> obtenerCedula(int opcion,  int id) throws ExcepcionSicrenet;
	
	public void guardarCambiosCedula (CatCedula catCedula) throws ExcepcionSicrenet;
	
	public void realizarCarga() throws ExcepcionSicrenet;
	
	public List<BitFuenteVO> obtenerDetalleReproceso(int opcion, int idFuente) throws ExcepcionSicrenet;
}
