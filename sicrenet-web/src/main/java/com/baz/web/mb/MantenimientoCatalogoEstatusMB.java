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
import com.baz.commons.vo.EstatusVO;
import com.baz.ejb.service.MantenimientoCatalogoEstatusService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoEstatus")
@SessionScoped
public class MantenimientoCatalogoEstatusMB implements Serializable {

	/**
		 * 
		 */
	private static final long serialVersionUID = 1L;
	private List<EstatusVO> listCatEstatus;
	private EstatusVO seleccionadoEstatus;
	private EstatusVO validaExisteAgrega;
	private EstatusVO validaExisteActualiza;
	private BigDecimal idEstatus;
	private String nombre;
	private String clase;
	private int estatus;
	private String nombreAgregar;
	private String claseAgrega;

	@EJB
	MantenimientoCatalogoEstatusService mantenimientoCatalogoEstatusService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {
		try {
			listCatEstatus = mantenimientoCatalogoEstatusService.cargarCatalogoEstatus(0, 0, 0);
		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void cargarTabla() throws ExcepcionSicrenet {
		try {
			listCatEstatus = mantenimientoCatalogoEstatusService.cargarCatalogoEstatus(0, 0, 0);
			} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}

	public void CargaCatEstatusActualizar() throws ExcepcionSicrenet {
		nombre = seleccionadoEstatus.getNombre();
		clase = seleccionadoEstatus.getClase();
		idEstatus = seleccionadoEstatus.getIdEstatus();
		estatus = seleccionadoEstatus.getEstatus();
	}

	public void agregarCatEstatus() throws ExcepcionSicrenet {
		if (nombreAgregar == null || nombreAgregar.trim().length() == 0
				|| claseAgrega == null || claseAgrega.trim().length() == 0) 
		{
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios.");
		} else {
			try {
				
				validaExisteAgrega = mantenimientoCatalogoEstatusService.cargarCatalogoEstatusValidateExiste(2, 0,
						nombreAgregar);
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Validar Si Existe");
			}
			System.out.println("imprime::::::validaExiste.getEstatus():::" + validaExisteAgrega.getEstatus());
			if (validaExisteAgrega.getEstatus() == 0) {
				try {
					mantenimientoCatalogoEstatusService.guardarCatalogoEstatus(3, 0, nombreAgregar, claseAgrega, 1,
							this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "Agregado", "Ingresado Correctamente.");
					this.cerrarDialogAgregarEstatus();
					this.cargarTabla();
					this.limpiar();
					System.out.println("MantenimientoCatalogoEstatusMB::agregarCatEstatus:::nombreAgregar:::"
							+ nombreAgregar);
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Estatus Existente.");
			}
		}
	}

	public void actualizarCatEstatus() throws ExcepcionSicrenet {
		if (nombre == null || nombre.trim().length() == 0
				|| clase == null || clase.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios Tipo");
		} else {
			try {
				validaExisteActualiza = mantenimientoCatalogoEstatusService.cargarCatalogoEstatusValidateExiste(4,
						idEstatus.intValue(), nombre);
				System.out.println("MantenimientoCatalogoEstatusMB::actualizarCatEstatus::::validaExisteActualiza::::"
						+ validaExisteActualiza.getEstatus());
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}
			if (validaExisteActualiza.getEstatus() == 0) {
				try {
					System.out.println("MantenimientoCatalogoEstatusMB::actualizarCatEstatus::::estatus::::" + estatus);
					mantenimientoCatalogoEstatusService.guardarCatalogoEstatus(5, idEstatus.intValue(), nombre, clase,
							estatus, this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizarEstatus();
					this.cargarTabla();
					this.limpiar();
					} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR.", " Error al Actualizar.");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE.", "Estatus Existente.");
			}
		}
	}

	public CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("Usuario");
	}

	public void cerrarDialogAgregarEstatus() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");

	}

	public void cerrarDialogActualizarEstatus() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");
	}

	public void limpiar() {
		setNombre("");
		setClase("");
		setNombreAgregar("");
		setClaseAgrega("");
	}

	public List<EstatusVO> getListCatEstatus() {
		return listCatEstatus;
	}

	public void setListCatEstatus(List<EstatusVO> listCatEstatus) {
		this.listCatEstatus = listCatEstatus;
	}

	public EstatusVO getSeleccionadoEstatus() {
		return seleccionadoEstatus;
	}

	public void setSeleccionadoEstatus(EstatusVO seleccionadoEstatus) {
		this.seleccionadoEstatus = seleccionadoEstatus;
	}

	public EstatusVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(EstatusVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public EstatusVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(EstatusVO validaExisteActualiza) {
		this.validaExisteActualiza = validaExisteActualiza;
	}

	public BigDecimal getIdEstatus() {
		return idEstatus;
	}

	public void setIdEstatus(BigDecimal idEstatus) {
		this.idEstatus = idEstatus;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getClase() {
		return clase;
	}

	public void setClase(String clase) {
		this.clase = clase;
	}

	public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

	public String getNombreAgregar() {
		return nombreAgregar;
	}

	public void setNombreAgregar(String nombreAgregar) {
		this.nombreAgregar = nombreAgregar;
	}

	public String getClaseAgrega() {
		return claseAgrega;
	}

	public void setClaseAgrega(String claseAgrega) {
		this.claseAgrega = claseAgrega;
	}

	

}
