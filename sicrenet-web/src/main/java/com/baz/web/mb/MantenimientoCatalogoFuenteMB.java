package com.baz.web.mb;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import org.primefaces.context.RequestContext;

import com.baz.commons.domain.CatUsuarios;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.CedulaVO;
import com.baz.commons.vo.FuenteVO;
import com.baz.commons.vo.NivelVO;
import com.baz.ejb.service.MantenimientoCatalogoFuenteService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoFuente")
@SessionScoped
public class MantenimientoCatalogoFuenteMB implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<CedulaVO> listaCedula;
	private List<FuenteVO> listaFuente;
	private List<NivelVO> listaNivel;
	private FuenteVO seleccionaFuente;
	private BigDecimal idFuente;
	private BigDecimal idCedulaAgrega;
	private BigDecimal idNievelAgregar;
	private String storeAgrega;
	private int estatusAgrega;
	private FuenteVO validaExisteAgrega;
	private FuenteVO validaExisteActualiza;
	private BigDecimal idCedulaActualiza;
	private int idNievelActualiza;
	private String storeActualiza;
	private int estatusActualiza;
	private Date fecha;

	@EJB
	MantenimientoCatalogoFuenteService mantenimientoCatologoFuenteService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {

		try {

			listaFuente = mantenimientoCatologoFuenteService.cargarCatalogoFuente(0, 0);
			listaCedula = mantenimientoCatologoFuenteService.cargarCatalogoCedula();
			listaNivel = mantenimientoCatologoFuenteService.cargarCatalogoNivel();

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void CargaFuenteActualizar() {

		idCedulaActualiza = seleccionaFuente.getIdCedula();
		idNievelActualiza = seleccionaFuente.getIdNivel().intValue();
		estatusActualiza = seleccionaFuente.getEstatus();

		System.out.println("ManteniminetoCatFuente::CargaFuenteActualiza::::idNivelActualiza::::" + idNievelActualiza);
		idFuente = seleccionaFuente.getIdFuente();
	}

	public void agregarCatalogoFuente() throws ExcepcionSicrenet {

		if (idNievelAgregar == null || idCedulaAgrega == null || storeAgrega == null
				|| storeAgrega.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden Estar Vacios");
		} else {

			FuenteVO agregarfuenteVO = new FuenteVO();
			try {

				agregarfuenteVO.setIdCedula(idCedulaAgrega);
				agregarfuenteVO.setIdNivel(idNievelAgregar);
				agregarfuenteVO.setStore(storeAgrega);

				validaExisteAgrega = mantenimientoCatologoFuenteService.cargarCatalogoFuenteValidateExiste(2,
						idCedulaAgrega.intValue());

				System.out.println("MantemininetoCatFuente::agregarCatFuente::::idCedulaAgrega" + idCedulaAgrega);
				System.out.println("MantemininetoCatFuente::agregarCatFuente::::idNievelAgregar" + idNievelAgregar);
				System.out.println("MantemininetoCatFuente::agregarCatFuente::::storeAgrega" + storeAgrega);

			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}

			if (validaExisteAgrega.getEstatus() == 0) {
				try {
					mantenimientoCatologoFuenteService.guardarCatalogoFuente(3, 0, idNievelAgregar.intValue(),
							idCedulaAgrega.intValue(), storeAgrega, 1, this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "AGREGADO!.", "Agregado Correctamente.");
					this.cerrarDialogAgregaFuente();
					this.CargaTablaCatFuente();
					this.limpiar();
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Fuente Existente.");
			}
		}
	}

	public void actualizaCatalogoFuente() throws ExcepcionSicrenet {

		if (idCedulaActualiza == null || idNievelActualiza == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios, Nombre y Descripcion");
		} else {

			FuenteVO actualizafuenteVO = new FuenteVO();
			try {
				actualizafuenteVO.setIdFuente(idFuente);
				actualizafuenteVO.setIdCedula(idCedulaActualiza);
				actualizafuenteVO.setIdNivel(new BigDecimal(idNievelActualiza));
				actualizafuenteVO.setEstatus(estatusActualiza);

				validaExisteActualiza = mantenimientoCatologoFuenteService.cargarCatalogoFuenteValidateExiste(4,
						idCedulaActualiza.intValue());
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}
			if (validaExisteActualiza.getEstatus() == 0) {
				try {
					mantenimientoCatologoFuenteService.guardarCatalogoFuente(5, idFuente.intValue(), idNievelActualiza,
							idCedulaActualiza.intValue(), null, estatusActualiza,
							this.getSessionObj().getNumempleado());

					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizarFuente();
					this.CargaTablaCatFuente();
					this.limpiar();
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR.", " Error al Actualizar.");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE.", "Fuente Existente.");
			}
		}
	}

	public void CargaTablaCatFuente() throws ExcepcionSicrenet {
		try {

			listaFuente = mantenimientoCatologoFuenteService.cargarCatalogoFuente(0, 0);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}

	public void limpiar() {
		setIdCedulaAgrega(null);
		setIdNievelAgregar(null);
		setIdCedulaActualiza(null);
		setIdNievelActualiza(0);
		setStoreActualiza("");
		setStoreAgrega("");
		setEstatusActualiza(0);
	}

	public CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("Usuario");
	}

	public void cerrarDialogAgregaFuente() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");
	}

	public void cerrarDialogActualizarFuente() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");
	}

	public List<CedulaVO> getListaCedula() {
		return listaCedula;
	}

	public void setListaCedula(List<CedulaVO> listaCedula) {
		this.listaCedula = listaCedula;
	}

	public List<FuenteVO> getListaFuente() {
		return listaFuente;
	}

	public void setListaFuente(List<FuenteVO> listaFuente) {
		this.listaFuente = listaFuente;
	}

	public FuenteVO getSeleccionaFuente() {
		return seleccionaFuente;
	}

	public void setSeleccionaFuente(FuenteVO seleccionaFuente) {
		this.seleccionaFuente = seleccionaFuente;
	}

	public List<NivelVO> getListaNivel() {
		return listaNivel;
	}

	public void setListaNivel(List<NivelVO> listaNivel) {
		this.listaNivel = listaNivel;
	}

	public BigDecimal getIdCedulaAgrega() {
		return idCedulaAgrega;
	}

	public void setIdCedulaAgrega(BigDecimal idCedulaAgrega) {
		this.idCedulaAgrega = idCedulaAgrega;
	}

	public BigDecimal getIdNievelAgregar() {
		return idNievelAgregar;
	}

	public void setIdNievelAgregar(BigDecimal idNievelAgregar) {
		this.idNievelAgregar = idNievelAgregar;
	}

	public BigDecimal getIdCedulaActualiza() {
		return idCedulaActualiza;
	}

	public void setIdCedulaActualiza(BigDecimal idCedulaActualiza) {
		this.idCedulaActualiza = idCedulaActualiza;
	}

	public int getIdNievelActualiza() {
		return idNievelActualiza;
	}

	public void setIdNievelActualiza(int idNievelActualiza) {
		this.idNievelActualiza = idNievelActualiza;
	}

	public String getStoreActualiza() {
		return storeActualiza;
	}

	public void setStoreActualiza(String storeActualiza) {
		this.storeActualiza = storeActualiza;
	}

	public int getEstatusActualiza() {
		return estatusActualiza;
	}

	public void setEstatusActualiza(int estatusActualiza) {
		this.estatusActualiza = estatusActualiza;
	}

	public String getStoreAgrega() {
		return storeAgrega;
	}

	public void setStoreAgrega(String storeAgrega) {
		this.storeAgrega = storeAgrega;
	}

	public int getEstatusAgrega() {
		return estatusAgrega;
	}

	public void setEstatusAgrega(int estatusAgrega) {
		this.estatusAgrega = estatusAgrega;
	}

	public BigDecimal getIdFuente() {
		return idFuente;
	}

	public void setIdFuente(BigDecimal idFuente) {
		this.idFuente = idFuente;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public FuenteVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(FuenteVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public FuenteVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(FuenteVO validaExisteActualiza) {
		this.validaExisteActualiza = validaExisteActualiza;
	}

}
