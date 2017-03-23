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
import com.baz.commons.vo.PeriodicidadVO;
import com.baz.ejb.service.MantenimientoCatalogoPeriodicidadService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoPeriodicidad")
@SessionScoped
public class MantenimientoCatalogoPeriodicidadMB implements Serializable {

	/**
		 * 
		 */
	private static final long serialVersionUID = 1L;
	private List<PeriodicidadVO> listCatPeriodicidad;
	private PeriodicidadVO seleccionadoPeriodicidad;
	private PeriodicidadVO validaExisteAgrega;
	private PeriodicidadVO validaExisteActualiza;
	private BigDecimal idPeriodicidad;
	private String descripcion;
	private int estatus;
	private String descripcionAgregar;

	@EJB
	MantenimientoCatalogoPeriodicidadService mantenimientoCatalogoPeriodicidadService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {
		try {
			listCatPeriodicidad = mantenimientoCatalogoPeriodicidadService.cargarCatalogoPeriodicidad(0, 0, 0);
		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void cargarTabla() throws ExcepcionSicrenet {
		try {
			listCatPeriodicidad = mantenimientoCatalogoPeriodicidadService.cargarCatalogoPeriodicidad(0, 0, 0);
			} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}

	public void CargaCatPeriodicidadActualizar() throws ExcepcionSicrenet {
		descripcion = seleccionadoPeriodicidad.getTipo();
		idPeriodicidad = seleccionadoPeriodicidad.getIdPeriodicidad();
		estatus = seleccionadoPeriodicidad.getEstatus();
	}

	public void agregarCatPeriodicidad() throws ExcepcionSicrenet {
		if (descripcionAgregar == null || descripcionAgregar.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacio Tipo");
		} else {
			try {
				System.out.println("imprime::::::descripionExste:::" + descripcionAgregar);
				validaExisteAgrega = mantenimientoCatalogoPeriodicidadService.cargarCatalogoPeriodicidadValidateExiste(2, 0,
						descripcionAgregar);
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Validar Si Existe");
			}
			System.out.println("imprime::::::validaExiste.getEstatus():::" + validaExisteAgrega.getEstatus());
			if (validaExisteAgrega.getEstatus() == 0) {
				try {
					mantenimientoCatalogoPeriodicidadService.guardarCatalogoPeriodicidad(3, 0, descripcionAgregar, 1,
							this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "Agregado", "Ingresado Correctamente.");
					this.cerrarDialogAgregarPeriodicidad();
					this.cargarTabla();
					this.limpiar();
					System.out.println("MantenimientoCatalogoPeriodicidad::agregarCatPeriodicidad:::descripcionAgregar:::"
							+ descripcionAgregar);
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Periodicidad Existente.");
			}
		}
	}

	public void actualizarCatPeriodicidad() throws ExcepcionSicrenet {
		if (descripcion == null || descripcion.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios Tipo");
		} else {
			try {
				validaExisteActualiza = mantenimientoCatalogoPeriodicidadService.cargarCatalogoPeriodicidadValidateExiste(4,
						idPeriodicidad.intValue(), descripcion);
				System.out.println("MantenimientoCatlagoPeriodicidad::actualizarCatArea::::validaExisteActualiza::::"
						+ validaExisteActualiza.getEstatus());
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}
			if (validaExisteActualiza.getEstatus() == 0) {
				try {
					System.out.println("MantenimientoCatalogoPeriodicidad::actualizarCatPeriodicidad::::estatus::::" + estatus);
					mantenimientoCatalogoPeriodicidadService.guardarCatalogoPeriodicidad(5, idPeriodicidad.intValue(), descripcion,
							estatus, this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizarPeriodicidad();
					this.cargarTabla();
					this.limpiar();
					System.out.println(
							"MantenimientoCatalogoPeriodicidad::actualizarCatPeriodicidad::::descripcion::::" + getDescripcion());
					System.out.println("MantenimientoCatalogoPeriodicidad::actualizarCatPeriodicidad::::usuario::::"
							+ this.getSessionObj().getNumempleado());
					System.out
							.println("MantenimientoCatalogoPeriodicidad::actualizarCatNegocio::::idPeriodicidad::::" + idPeriodicidad);
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR.", " Error al Actualizar.");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE.", "Periodicidad Existente.");
			}
		}
	}

	public CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("Usuario");
	}

	public void cerrarDialogAgregarPeriodicidad() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");

	}

	public void cerrarDialogActualizarPeriodicidad() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");
	}

	public void limpiar() {
		setDescripcion("");
	}

	public List<PeriodicidadVO> getListCatPeriodicidad() {
		return listCatPeriodicidad;
	}

	public void setListCatPeriodicidad(List<PeriodicidadVO> listCatPeriodicidad) {
		this.listCatPeriodicidad = listCatPeriodicidad;
	}

	public PeriodicidadVO getSeleccionadoPeriodicidad() {
		return seleccionadoPeriodicidad;
	}

	public void setSeleccionadoPeriodicidad(PeriodicidadVO seleccionadoPeriodicidad) {
		this.seleccionadoPeriodicidad = seleccionadoPeriodicidad;
	}

	public PeriodicidadVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(PeriodicidadVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public PeriodicidadVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(PeriodicidadVO validaExisteActualiza) {
		this.validaExisteActualiza = validaExisteActualiza;
	}

	public BigDecimal getIdPeriodicidad() {
		return idPeriodicidad;
	}

	public void setIdPeriodicidad(BigDecimal idPeriodicidad) {
		this.idPeriodicidad = idPeriodicidad;
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
