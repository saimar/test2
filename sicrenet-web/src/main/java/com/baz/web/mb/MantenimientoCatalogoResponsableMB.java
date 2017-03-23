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
import com.baz.commons.vo.ResponsableVO;
import com.baz.ejb.service.MantenimientoCatalogoResponsableService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoResponsable")
@SessionScoped
public class MantenimientoCatalogoResponsableMB implements Serializable {

	/**
		 * 
		 */
	private static final long serialVersionUID = 1L;

	private List<ResponsableVO> listCatResponsable;
	private ResponsableVO seleccionadoResponsable;

	private ResponsableVO validaExisteAgrega;
	private ResponsableVO validaExisteActualiza;

	private BigDecimal idResponsable;

	private String numEmpleadoAgrega;
	private String nombreAgregar;
	private String extencionAgrega;
	private String ubicacionAgrega;

	private String numEmpleado;
	private String nombre;
	private String extencion;
	private String ubicacion;
	private int estatus;

	@EJB
	MantenimientoCatalogoResponsableService mantenimientoCatalogoResponsableService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {
		try {

			listCatResponsable = mantenimientoCatalogoResponsableService.cargaResponsableVO(0, 0);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Error.", "Error al cargar la Tabla");
		}

	}

	public void cargarTabla() throws ExcepcionSicrenet {
		try {

			listCatResponsable = mantenimientoCatalogoResponsableService.cargaResponsableVO(0, 0);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Error.", "Error al cargar la Tabla");
		}
	}

	public void CargaCatResponsableActualizar() throws ExcepcionSicrenet {

		nombre = seleccionadoResponsable.getNombre();
		numEmpleado = seleccionadoResponsable.getNumEmpleado();
		extencion = seleccionadoResponsable.getExtencion();
		ubicacion = seleccionadoResponsable.getUbicacion();
		estatus = seleccionadoResponsable.getEstatus();
		idResponsable = seleccionadoResponsable.getIdResponsable();
		
		System.out.println("MantenimientoCatalogoResponsableMB:::::CargaCatResponsableActualizar::::nombre" + nombre);
		System.out.println("MantenimientoCatalogoResponsableMB:::::CargaCatResponsableActualizar::::numEmpleado" + numEmpleado);
		System.out.println("MantenimientoCatalogoResponsableMB:::::CargaCatResponsableActualizar::::estatus" + estatus);
		System.out.println("MantenimientoCatalogoResponsableMB:::::CargaCatResponsableActualizar::::idResponsable" + idResponsable);

	}

	public void agregarCatResponsable() throws ExcepcionSicrenet {

		if (nombreAgregar == null || nombreAgregar.trim().length() == 0 || numEmpleadoAgrega == null
				|| numEmpleadoAgrega.trim().length() == 0 || extencionAgrega == null
				|| extencionAgrega.trim().length() == 0 || ubicacionAgrega == null
				|| ubicacionAgrega.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacio");
		} else {
			ResponsableVO ResponsableVO = new ResponsableVO();
			try {

				ResponsableVO.setNombre(this.nombreAgregar);
				ResponsableVO.setNumEmpleado(this.numEmpleadoAgrega);
				ResponsableVO.setExtencion(this.extencionAgrega);
				ResponsableVO.setUbicacion(this.ubicacionAgrega);
				ResponsableVO.setEstatus(0);

				System.out.println("imprime::::::nombreAgregar:::" + nombreAgregar);

				validaExisteAgrega = mantenimientoCatalogoResponsableService.cargarCatalogoResponsableValidateExiste(3,
						0, numEmpleadoAgrega);

			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Validar Si Existe");
			}
			System.out.println("imprime::::::validaExiste.getEstatus():::" + validaExisteAgrega.getEstatus());

			if (validaExisteAgrega.getEstatus() == 0) {
				try {

					mantenimientoCatalogoResponsableService.guardarCatalogoResponsable(2, 0, ResponsableVO,
							this.getSessionObj().getNumempleado());
					System.out.println("MantenimientoCatalogoResponsableMB::agregarCatResponsable:::nombreAgregar:::"
							+ nombreAgregar);
					MostrarMensajesUtil.agregarMensaje(4, "Agregado", "Ingresado Correctamente.");
					this.cerrarDialogAgregarResponsable();
					this.cargarTabla();
					this.limpiar();

					
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Responsable Existente.");
			}
		}
	}

	public void actualizarCatResponsable() throws ExcepcionSicrenet {
		if (nombre == null || nombre.trim().length() == 0 || numEmpleado == null || numEmpleado.trim().length() == 0
				|| extencion == null || extencion.trim().length() == 0 || ubicacion == null
				|| ubicacion.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios");
		} else {
			ResponsableVO ResponsableVO = new ResponsableVO();

			try {
				ResponsableVO.setNombre(this.nombre);
				ResponsableVO.setNumEmpleado(this.numEmpleado);
				ResponsableVO.setExtencion(this.extencion);
				ResponsableVO.setUbicacion(this.ubicacion);
				ResponsableVO.setEstatus(estatus);

				validaExisteActualiza = mantenimientoCatalogoResponsableService
						.cargarCatalogoResponsableValidateExiste(3, 0, nombre);
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}
			if (validaExisteActualiza.getEstatus() == 0) {
				try {

					mantenimientoCatalogoResponsableService.guardarCatalogoResponsable(5, idResponsable.intValue(),
							ResponsableVO, this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizarResponsable();
					this.cargarTabla();
					this.limpiar();
					System.out.println(
							"MantenimientoCatalogoResponsableMB::actualizarCatResponsable::::nombre::::" + nombre);
					System.out.println("MantenimientoCatalogoResponsableMB::actualizarCatResponsable::::usuario::::"
							+ this.getSessionObj().getNumempleado());
					System.out
							.println("MantenimientoCatalogoResponsableMB::actualizarCatResponsable::::idResponsable::::"
									+ idResponsable);
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR.", " Error al Actualizar.");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE.", "Responsable Existente.");
			}
		}
	}

	public CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("Usuario");
	}

	public void cerrarDialogAgregarResponsable() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");

	}

	public void cerrarDialogActualizarResponsable() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");
	}

	public void limpiar() {
		setNombre("");
		setNombreAgregar("");
		setNumEmpleado("");
		setNumEmpleadoAgrega("");
		setExtencion("");
		setExtencionAgrega("");
		setUbicacion("");
		setUbicacionAgrega("");

	}

	public List<ResponsableVO> getListCatResponsable() {
		return listCatResponsable;
	}

	public void setListCatResponsable(List<ResponsableVO> listCatResponsable) {
		this.listCatResponsable = listCatResponsable;
	}

	public ResponsableVO getSeleccionadoResponsable() {
		return seleccionadoResponsable;
	}

	public void setSeleccionadoResponsable(ResponsableVO seleccionadoResponsable) {
		this.seleccionadoResponsable = seleccionadoResponsable;
	}

	public ResponsableVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(ResponsableVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public ResponsableVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(ResponsableVO validaExisteActualiza) {
		this.validaExisteActualiza = validaExisteActualiza;
	}

	public BigDecimal getIdResponsable() {
		return idResponsable;
	}

	public void setIdResponsable(BigDecimal idResponsable) {
		this.idResponsable = idResponsable;
	}

	public String getNumEmpleadoAgrega() {
		return numEmpleadoAgrega;
	}

	public void setNumEmpleadoAgrega(String numEmpleadoAgrega) {
		this.numEmpleadoAgrega = numEmpleadoAgrega;
	}

	public String getNombreAgregar() {
		return nombreAgregar;
	}

	public void setNombreAgregar(String nombreAgregar) {
		this.nombreAgregar = nombreAgregar;
	}

	public String getExtencionAgrega() {
		return extencionAgrega;
	}

	public void setExtencionAgrega(String extencionAgrega) {
		this.extencionAgrega = extencionAgrega;
	}

	public String getUbicacionAgrega() {
		return ubicacionAgrega;
	}

	public void setUbicacionAgrega(String ubicacionAgrega) {
		this.ubicacionAgrega = ubicacionAgrega;
	}

	public String getNumEmpleado() {
		return numEmpleado;
	}

	public void setNumEmpleado(String numEmpleado) {
		this.numEmpleado = numEmpleado;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getExtencion() {
		return extencion;
	}

	public void setExtencion(String extencion) {
		this.extencion = extencion;
	}

	public String getUbicacion() {
		return ubicacion;
	}

	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}

	public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

}
