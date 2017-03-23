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
import com.baz.commons.vo.AreaVO;
import com.baz.ejb.service.MantenimientoCatalogoAreaService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoArea")
@SessionScoped
public class MantenimientoCatalogoAreaMB implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<AreaVO> listCatArea;
	private AreaVO seleccionadoArea;
	private AreaVO validaExisteAgrega;
	private AreaVO validaExisteActualiza;
	private BigDecimal idArea;
	private String descripcion;
	private int estatus;
	private String descripcionAgregar;

	@EJB
	MantenimientoCatalogoAreaService mantenimientoCatalogoAreaService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {
		try {

			listCatArea = mantenimientoCatalogoAreaService.cargarCatalogoArea(0, 0, 1);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void cargarTabla() throws ExcepcionSicrenet {
		try {

			listCatArea = mantenimientoCatalogoAreaService.cargarCatalogoArea(0, 0, 1);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}

	public void CargaCatAreaActualizar() throws ExcepcionSicrenet {

		descripcion = seleccionadoArea.getDescripcion();
		idArea = seleccionadoArea.getId_area();
		estatus = seleccionadoArea.getEstatus();

	}

	public void agregarCatArea() throws ExcepcionSicrenet {

		if (descripcionAgregar == null || descripcionAgregar.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacio Descripción");
		} else {

			try {

				System.out.println("imprime::::::descripionExste:::" + descripcionAgregar);

				validaExisteAgrega = mantenimientoCatalogoAreaService.cargarCatalogoAreaValidateExiste(2, 0,
						descripcionAgregar);

			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Validar Si Existe");
			}
			System.out.println("imprime::::::validaExiste.getEstatus():::" + validaExisteAgrega.getEstatus());

			if (validaExisteAgrega.getEstatus() == 0) {
				try {

					mantenimientoCatalogoAreaService.guardarCatalogoArea(3, 0, descripcionAgregar, 1,
							this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "Agregado", "Ingresado Correctamente.");
					this.cerrarDialogAgregarArea();
					this.cargarTabla();
					this.limpiar();

					System.out.println(
							"MantenimientoCatalogoArea::agregarCatArea:::descripcionAgregar:::" + descripcionAgregar);
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Area Existente.");
			}
		}
	}

	public void actualizarCatArea() throws ExcepcionSicrenet {
		if (descripcion == null || descripcion.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios Descripcion");
		} else {

			try {

				validaExisteActualiza = mantenimientoCatalogoAreaService.cargarCatalogoAreaValidateExiste(4,
						idArea.intValue(), descripcion);
				System.out.println("MantenimientoCatlagoArea::actualizarCatArea::::validaExisteActualiza::::"
						+ validaExisteActualiza.getEstatus());

			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}
			if (validaExisteActualiza.getEstatus() == 0) {
				try {
					System.out.println("MantenimientoCatlagoArea::actualizarCatArea::::estatus::::" + estatus);

					mantenimientoCatalogoAreaService.guardarCatalogoArea(5, idArea.intValue(), descripcion,
							getEstatus(), this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizarArea();
					this.cargarTabla();
					this.limpiar();

					System.out.println(
							"MantenimientoCatlagoArea::actualizarCatArea::::descripcion::::" + getDescripcion());
					System.out.println("MantenimientoCatlagoArea::actualizarCatArea::::usuario::::"
							+ this.getSessionObj().getNumempleado());
					System.out.println("MantenimientoCatlagoArea::actualizarCatArea::::idArea::::" + idArea);

				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR.", " Error al Actualizar.");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE.", "Area Existente.");
			}
		}
	}

	public CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("Usuario");
	}

	public void cerrarDialogAgregarArea() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");

	}

	public void cerrarDialogActualizarArea() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");
	}

	public void limpiar() {
		setDescripcion("");
	}

	public List<AreaVO> getListCatArea() {
		return listCatArea;
	}

	public void setListCatArea(List<AreaVO> listCatArea) {
		this.listCatArea = listCatArea;
	}

	public AreaVO getSeleccionadoArea() {
		return seleccionadoArea;
	}

	public void setSeleccionadoArea(AreaVO seleccionadoArea) {
		this.seleccionadoArea = seleccionadoArea;
	}

	public AreaVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(AreaVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public AreaVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(AreaVO validaExisteActualiza) {
		this.validaExisteActualiza = validaExisteActualiza;
	}

	public BigDecimal getIdArea() {
		return idArea;
	}

	public void setIdArea(BigDecimal idArea) {
		this.idArea = idArea;
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
