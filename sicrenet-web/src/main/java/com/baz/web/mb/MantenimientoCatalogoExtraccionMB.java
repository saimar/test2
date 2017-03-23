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
import com.baz.commons.vo.ExtraccionVO;
import com.baz.commons.vo.NivelVO;
import com.baz.ejb.service.MantenimientoCatalogoExtraccionService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoExtraccion")
@SessionScoped
public class MantenimientoCatalogoExtraccionMB implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<CedulaVO> listaCedula;
	private List<ExtraccionVO> listaExtraccion;
	private List<NivelVO> listaNivel;
	private ExtraccionVO seleccionaExtraccion;
	private BigDecimal idExtraccion;
	private BigDecimal idCedulaAgrega;
	private BigDecimal idNievelAgregar;
	private String storeAgrega;
	private int estatusAgrega;
	private ExtraccionVO validaExisteAgrega;
	private ExtraccionVO validaExisteActualiza;
	private BigDecimal idCedulaActualiza;
	private int idNievelActualiza;
	private String storeActualiza;
	private int estatusActualiza;
	private Date fecha;

	@EJB
	MantenimientoCatalogoExtraccionService mantenimientoCatologoExtraccionService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {

		try {

			listaExtraccion = mantenimientoCatologoExtraccionService.cargarCatalogoExtraccion(0, 0);
			listaCedula = mantenimientoCatologoExtraccionService.cargarCatalogoCedula();
			listaNivel = mantenimientoCatologoExtraccionService.cargarCatalogoNivel();

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void CargaExtraccionActualizar() {

		idCedulaActualiza = seleccionaExtraccion.getIdCedula();
		idNievelActualiza = seleccionaExtraccion.getIdNivel().intValue();
		estatusActualiza = seleccionaExtraccion.getEstatus();

		
	}

	public void agregarCatalogoExtraccion() throws ExcepcionSicrenet {

		if (idNievelAgregar == null || idCedulaAgrega == null || storeAgrega == null
				|| storeAgrega.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden Estar Vacios");
		} else {

		
			try {


				validaExisteAgrega = mantenimientoCatologoExtraccionService.cargarCatalogoExtraccionValidateExiste(2,
						idCedulaAgrega.intValue());

				System.out.println("MantenimientoCatalogoExtraccionService::agregarCatalogoExtraccion::::idCedulaAgrega" + idCedulaAgrega);
				System.out.println("MantenimientoCatalogoExtraccionService::agregarCatalogoExtraccion::::idNievelAgregar" + idNievelAgregar);
				System.out.println("MantenimientoCatalogoExtraccionService::agregarCatalogoExtraccion::::storeAgrega" + storeAgrega);

			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}

			if (validaExisteAgrega.getEstatus() == 0) {
				try {
					mantenimientoCatologoExtraccionService.guardarCatalogoExtraccion(3, 0, idNievelAgregar.intValue(),
							idCedulaAgrega.intValue(), storeAgrega, 1, this.getSessionObj().getNumempleado());
					this.cerrarDialogAgregaExtraccion();
					this.CargaTablaCatExtraccion();
					this.limpiar();
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Extracción Existente.");
			}
		}
	}

	public void actualizaCatalogoExtraccion() throws ExcepcionSicrenet {

		if (idCedulaActualiza == null || idNievelActualiza == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios.");
		} else {

			
			try {
				

				validaExisteActualiza = mantenimientoCatologoExtraccionService.cargarCatalogoExtraccionValidateExiste(4,
						idCedulaActualiza.intValue());
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}
			if (validaExisteActualiza.getEstatus() == 0) {
				try {
					mantenimientoCatologoExtraccionService.guardarCatalogoExtraccion(5, idExtraccion.intValue(), idNievelActualiza,
							idCedulaActualiza.intValue(), null, estatusActualiza,
							this.getSessionObj().getNumempleado());

					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizarExtraccion();
					this.CargaTablaCatExtraccion();
					this.limpiar();
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR.", " Error al Actualizar.");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE.", "Extración Existente.");
			}
		}
	}

	public void CargaTablaCatExtraccion() throws ExcepcionSicrenet {
		try {

			listaExtraccion = mantenimientoCatologoExtraccionService.cargarCatalogoExtraccion(0, 0);
			
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

	public void cerrarDialogAgregaExtraccion() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");
	}

	public void cerrarDialogActualizarExtraccion() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");
	}

	public List<CedulaVO> getListaCedula() {
		return listaCedula;
	}

	public void setListaCedula(List<CedulaVO> listaCedula) {
		this.listaCedula = listaCedula;
	}

	public List<ExtraccionVO> getListaExtraccion() {
		return listaExtraccion;
	}

	public void setListaExtraccion(List<ExtraccionVO> listaExtraccion) {
		this.listaExtraccion = listaExtraccion;
	}

	public List<NivelVO> getListaNivel() {
		return listaNivel;
	}

	public void setListaNivel(List<NivelVO> listaNivel) {
		this.listaNivel = listaNivel;
	}

	public ExtraccionVO getSeleccionaExtraccion() {
		return seleccionaExtraccion;
	}

	public void setSeleccionaExtraccion(ExtraccionVO seleccionaExtraccion) {
		this.seleccionaExtraccion = seleccionaExtraccion;
	}

	public BigDecimal getIdExtraccion() {
		return idExtraccion;
	}

	public void setIdExtraccion(BigDecimal idExtraccion) {
		this.idExtraccion = idExtraccion;
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

	public ExtraccionVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(ExtraccionVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public ExtraccionVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(ExtraccionVO validaExisteActualiza) {
		this.validaExisteActualiza = validaExisteActualiza;
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

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	
}
