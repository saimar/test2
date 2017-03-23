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
import com.baz.commons.vo.ExtraccionVO;
import com.baz.commons.vo.ReporteVO;
import com.baz.ejb.service.MantenimientoCatalogoReporteService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoReporte")
@SessionScoped
public class MantenimientoCatalogoReporteMB implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<ReporteVO> listCatReporte;
	private List<ExtraccionVO> listCatExtraccion;
	private ReporteVO seleccionadoReporte;
	private ReporteVO validaExisteAgrega;
	private ReporteVO validaExisteActualiza;
	private BigDecimal idReporte;
	private BigDecimal idExtraccion;
	private String nombreReporte;
	private String descripcion;
	private String store;
	private int estatus;
	private String nombreReporteAgregar;
	private String descripcionAgregar;
	private BigDecimal idExtraccionAgrega;
	private String storeAgrega;

	@EJB
	MantenimientoCatalogoReporteService mantenimientoCatalogoReporteService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {
		try {

			listCatReporte = mantenimientoCatalogoReporteService.cargarCatalogoReporte(0, 0);
			listCatExtraccion = mantenimientoCatalogoReporteService.cargarCatalogoExtraccion(0, 0);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void cargarTabla() throws ExcepcionSicrenet {
		try {

			listCatReporte = mantenimientoCatalogoReporteService.cargarCatalogoReporte(0, 0);
			listCatExtraccion = mantenimientoCatalogoReporteService.cargarCatalogoExtraccion(0, 0);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion","Error al Cargar la Tabla.");
		}
	}

	public void CargaCatReporteActualizar() throws ExcepcionSicrenet {

		nombreReporte = seleccionadoReporte.getNombreRep();
		descripcion = seleccionadoReporte.getDescripcion();
		store = seleccionadoReporte.getStore();
		idReporte = seleccionadoReporte.getIdReporte();
		estatus = seleccionadoReporte.getEstatus();

	}

	public void agregarCatReporte() throws ExcepcionSicrenet {

		if (nombreReporteAgregar == null || nombreReporteAgregar.trim().length() == 0 || descripcionAgregar == null
				|| descripcionAgregar.trim().length() == 0
				|| storeAgrega == null || storeAgrega.trim().length() == 0
				|| idExtraccionAgrega == null) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios.");
		} else {

			try {

				validaExisteAgrega = mantenimientoCatalogoReporteService.cargarCatalogoReporteValidateExiste(2, 0,
						nombreReporteAgregar, descripcionAgregar);
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Validar Si Existe");
			}
			System.out.println("imprime::::::validaExiste.getEstatus():::" + validaExisteAgrega.getEstatus());

			if (validaExisteAgrega.getEstatus() == 0) {
				try {

					mantenimientoCatalogoReporteService.guardarCatalogoReporte(3, 0, nombreReporteAgregar, descripcionAgregar, idExtraccionAgrega.intValue(), store,
							1, this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "Agregado", "Ingresado Correctamente.");
					this.cerrarDialogAgregarReporte();
					this.cargarTabla();
					this.limpiar();

					System.out.println("MantenimientoCatalogoEtapa::agregarCatEtapa:::nombre:::" + nombreReporteAgregar);
					System.out.println("MantenimientoCatalogoEtapa::agregarCatEtapa:::descripcion:::" + descripcion);
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Reporte Existente.");
			}
		}
	}

	public void actualizarCatReporte() throws ExcepcionSicrenet {
		if (nombreReporte == null || nombreReporte.trim().length() == 0 || descripcion == null
				|| descripcion.trim().length() == 0
				|| store == null || store.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios.");
		} else {

			try {

				validaExisteActualiza = mantenimientoCatalogoReporteService.cargarCatalogoReporteValidateExiste(4,
						idReporte.intValue() ,nombreReporte, descripcion);
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}
			if (validaExisteActualiza.getEstatus() == 0) {
				try {

					mantenimientoCatalogoReporteService.guardarCatalogoReporte(5, idReporte.intValue(), nombreReporte,
							descripcion, 0, store, estatus, this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizarReporte();
					this.cargarTabla();
					this.limpiar();

					
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR.", " Error al Actualizar.");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE.", "Reporte Existente.");
			}
		}
	}

	public CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("Usuario");
	}

	public void cerrarDialogAgregarReporte() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");

	}

	public void cerrarDialogActualizarReporte() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");
	}

	public void limpiar() {
		setNombreReporte("");
		setDescripcion("");
		setNombreReporteAgregar("");
		setDescripcionAgregar("");
		setStore("");
		setStoreAgrega("");
		setIdExtraccionAgrega(null);
	}

	public List<ReporteVO> getListCatReporte() {
		return listCatReporte;
	}

	public void setListCatReporte(List<ReporteVO> listCatReporte) {
		this.listCatReporte = listCatReporte;
	}

	public ReporteVO getSeleccionadoReporte() {
		return seleccionadoReporte;
	}

	public void setSeleccionadoReporte(ReporteVO seleccionadoReporte) {
		this.seleccionadoReporte = seleccionadoReporte;
	}

	public ReporteVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(ReporteVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public ReporteVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(ReporteVO validaExisteActualiza) {
		this.validaExisteActualiza = validaExisteActualiza;
	}

	public BigDecimal getIdReporte() {
		return idReporte;
	}

	public void setIdReporte(BigDecimal idReporte) {
		this.idReporte = idReporte;
	}

	public BigDecimal getIdExtraccion() {
		return idExtraccion;
	}

	public void setIdExtraccion(BigDecimal idExtraccion) {
		this.idExtraccion = idExtraccion;
	}

	public String getNombreReporte() {
		return nombreReporte;
	}

	public void setNombreReporte(String nombreReporte) {
		this.nombreReporte = nombreReporte;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getStore() {
		return store;
	}

	public void setStore(String store) {
		this.store = store;
	}

	public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

	public String getNombreReporteAgregar() {
		return nombreReporteAgregar;
	}

	public void setNombreReporteAgregar(String nombreReporteAgregar) {
		this.nombreReporteAgregar = nombreReporteAgregar;
	}

	public String getDescripcionAgregar() {
		return descripcionAgregar;
	}

	public void setDescripcionAgregar(String descripcionAgregar) {
		this.descripcionAgregar = descripcionAgregar;
	}

	public BigDecimal getIdExtraccionAgrega() {
		return idExtraccionAgrega;
	}

	public void setIdExtraccionAgrega(BigDecimal idExtraccionAgrega) {
		this.idExtraccionAgrega = idExtraccionAgrega;
	}

	public String getStoreAgrega() {
		return storeAgrega;
	}

	public void setStoreAgrega(String storeAgrega) {
		this.storeAgrega = storeAgrega;
	}

	public List<ExtraccionVO> getListCatExtraccion() {
		return listCatExtraccion;
	}

	public void setListCatExtraccion(List<ExtraccionVO> listCatExtraccion) {
		this.listCatExtraccion = listCatExtraccion;
	}
	
	
	
}
