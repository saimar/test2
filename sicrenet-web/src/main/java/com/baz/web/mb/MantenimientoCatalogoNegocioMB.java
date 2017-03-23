package com.baz.web.mb;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import org.primefaces.context.RequestContext;

import com.baz.commons.domain.CatUsuarios;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.NegocioVO;
import com.baz.ejb.service.MantenimientoCatalogoNegocioService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoNegocio")
@SessionScoped
public class MantenimientoCatalogoNegocioMB implements Serializable {

	/**
		 * 
		 */
	private static final long serialVersionUID = 1L;
	private List<NegocioVO> listCatNegocio;
	private NegocioVO seleccionadoNegocio;
	private NegocioVO validaExisteAgrega;
	private NegocioVO validaExisteActualiza;
	private BigDecimal idNegocio;
	private String descripcion;
	private int estatus;
	private String descripcionAgregar;

	@EJB
	MantenimientoCatalogoNegocioService mantenimientoCatalogoNegocioService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {
		try {
			listCatNegocio = mantenimientoCatalogoNegocioService.cargarCatalogoNegocio(0, 0, 0);
		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void cargarTabla() throws ExcepcionSicrenet {
		try {
			listCatNegocio = mantenimientoCatalogoNegocioService.cargarCatalogoNegocio(0, 0, 0);
		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}

	public void CargaCatNegocioActualizar() throws ExcepcionSicrenet {
		descripcion = seleccionadoNegocio.getDescripcion();
		idNegocio = seleccionadoNegocio.getIdNegocio();
		estatus = seleccionadoNegocio.getEstatus();
	}

	public void agregarCatNegocio() throws ExcepcionSicrenet {
		if (descripcionAgregar == null || descripcionAgregar.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacio Descripción");
		} else {
			try {
				System.out.println("imprime::::::descripionExste:::" + descripcionAgregar);
				validaExisteAgrega = mantenimientoCatalogoNegocioService.cargarCatalogoNegocioValidateExiste(4, 0,
						descripcionAgregar);
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Validar Si Existe");
			}
			System.out.println("imprime::::::validaExiste.getEstatus():::" + validaExisteAgrega.getEstatus());
			if (validaExisteAgrega.getEstatus() == 0) {
				try {
					mantenimientoCatalogoNegocioService.guardarCatalogoNegocio(3, 0, descripcionAgregar, 1,
							this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "Agregado", "Ingresado Correctamente.");
					this.cerrarDialogAgregarNegocio();
					this.cargarTabla();
					this.limpiar();
					System.out.println("MantenimientoCatalogoNegocio::agregarCatNegocio:::descripcionAgregar:::"
							+ descripcionAgregar);
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Negocio Existente.");
			}
		}
	}

	public void actualizarCatNegocio() throws ExcepcionSicrenet {
		if (descripcion == null || descripcion.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios Descripción");
		} else {
			try {
				validaExisteActualiza = mantenimientoCatalogoNegocioService.cargarCatalogoNegocioValidateExiste(4,
						idNegocio.intValue(), descripcion);
				System.out.println("MantenimientoCatlagoNegocio::actualizarCatArea::::validaExisteActualiza::::"
						+ validaExisteActualiza.getEstatus());
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}
			if (validaExisteActualiza.getEstatus() == 0) {
				try {
					System.out.println("MantenimientoCatalogoNegocio::actualizarCatNegocio::::estatus::::" + estatus);
					mantenimientoCatalogoNegocioService.guardarCatalogoNegocio(5, idNegocio.intValue(), descripcion,
							estatus, this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizarNegocio();
					this.cargarTabla();
					this.limpiar();
					System.out.println(
							"MantenimientoCatalogoNegocio::actualizarCatNegocio::::descripcion::::" + getDescripcion());
					System.out.println("MantenimientoCatalogoNegocio::actualizarCatNegocio::::usuario::::"
							+ this.getSessionObj().getNumempleado());
					System.out
							.println("MantenimientoCatalogoNegocio::actualizarCatNegocio::::idNegocio::::" + idNegocio);
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR.", " Error al Actualizar.");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE.", "Negocio Existente.");
			}
		}
	}

	public CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("Usuario");
	}

	public void cerrarDialogAgregarNegocio() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");

	}

	public void cerrarDialogActualizarNegocio() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");
	}

	public void limpiar() {
		setDescripcion("");
	}

	public List<NegocioVO> getListCatNegocio() {
		return listCatNegocio;
	}

	public void setListCatNegocio(List<NegocioVO> listCatNegocio) {
		this.listCatNegocio = listCatNegocio;
	}

	public NegocioVO getSeleccionadoNegocio() {
		return seleccionadoNegocio;
	}

	public void setSeleccionadoNegocio(NegocioVO seleccionadoNegocio) {
		this.seleccionadoNegocio = seleccionadoNegocio;
	}

	public NegocioVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(NegocioVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public NegocioVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(NegocioVO validaExisteActualiza) {
		this.validaExisteActualiza = validaExisteActualiza;
	}

	public BigDecimal getIdNegocio() {
		return idNegocio;
	}

	public void setIdNegocio(BigDecimal idNegocio) {
		this.idNegocio = idNegocio;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

	public String getDescripcionAgregar() {
		return descripcionAgregar;
	}

	public void setDescripcionAgregar(String descripcionAgregar) {
		this.descripcionAgregar = descripcionAgregar;
	}

}
