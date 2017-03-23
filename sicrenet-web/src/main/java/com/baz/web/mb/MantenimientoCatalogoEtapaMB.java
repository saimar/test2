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
import com.baz.commons.vo.EtapasVO;
import com.baz.ejb.service.MantenimientoCatalogoEtapaService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoEtapa")
@SessionScoped
public class MantenimientoCatalogoEtapaMB implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<EtapasVO> listCatEtapa;
	private EtapasVO seleccionadoEtapa;
	private EtapasVO validaExisteAgrega;
	private EtapasVO validaExisteActualiza;
	private BigDecimal idEtapa;
	private String nombreEtapa;
	private String descripcion;
	private int estatus;
	private String nombreEtapaAgregar;
	private String descripcionAgregar;

	@EJB
	MantenimientoCatalogoEtapaService mantenimientoCatalogoEtapaService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {
		try {

			listCatEtapa = mantenimientoCatalogoEtapaService.cargarCatalogoEtapas(0, 0, 0);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void cargarTabla() throws ExcepcionSicrenet {
		try {

			listCatEtapa = mantenimientoCatalogoEtapaService.cargarCatalogoEtapas(0, 0, 0);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}

	public void CargaCatEtapaActualizar() throws ExcepcionSicrenet {

		nombreEtapa = seleccionadoEtapa.getNombre();
		descripcion = seleccionadoEtapa.getDescripcion();
		idEtapa = seleccionadoEtapa.getId_etapa();
		estatus = seleccionadoEtapa.getEstatus();

	}

	public void agregarCatEtapa() throws ExcepcionSicrenet {

		if (nombreEtapaAgregar == null || nombreEtapaAgregar.trim().length() == 0 || descripcionAgregar == null
				|| descripcionAgregar.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios, Nombre y Descripcion");
		} else {

			try {

				System.out.println("imprime::::::nombreExste:::" + nombreEtapaAgregar);
				System.out.println("imprime::::::descripionExste:::" + descripcionAgregar);

				validaExisteAgrega = mantenimientoCatalogoEtapaService.cargarCatalogoEtapasValidateExiste(2, 0,
						nombreEtapaAgregar, descripcionAgregar);
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Validar Si Existe");
			}
			System.out.println("imprime::::::validaExiste.getEstatus():::" + validaExisteAgrega.getEstatus());

			if (validaExisteAgrega.getEstatus() == 0) {
				try {

					mantenimientoCatalogoEtapaService.guardaCalatogoEtapa(3, 0, nombreEtapaAgregar, descripcionAgregar,
							1, this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "Agregado", "Ingresado Correctamente.");
					this.cerrarDialogAgregarEtapa();
					this.cargarTabla();
					this.limpiar();

					System.out.println("MantenimientoCatalogoEtapa::agregarCatEtapa:::nombre:::" + nombreEtapa);
					System.out.println("MantenimientoCatalogoEtapa::agregarCatEtapa:::descripcion:::" + descripcion);
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Etapa Existente.");
			}
		}
	}

	public void actualizarCatEtapa() throws ExcepcionSicrenet {
		if (nombreEtapa == null || nombreEtapa.trim().length() == 0 || descripcion == null
				|| descripcion.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios, Nombre y Descripcion");
		} else {

			try {

				validaExisteActualiza = mantenimientoCatalogoEtapaService.cargarCatalogoEtapasValidateExiste(4,
						idEtapa.intValue(), nombreEtapa, descripcion);
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}
			if (validaExisteActualiza.getEstatus() == 0) {
				try {

					mantenimientoCatalogoEtapaService.guardaCalatogoEtapa(5, idEtapa.intValue(), nombreEtapa,
							descripcion, estatus, this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizarEtapa();
					this.cargarTabla();
					this.limpiar();

					System.out
							.println("MantenimientoCatlagoEtapa::actualizarCatEtapa::::nombreEtapa::::" + nombreEtapa);
					System.out
							.println("MantenimientoCatlagoEtapa::actualizarCatEtapa::::descripcion::::" + descripcion);
					System.out.println("MantenimientoCatlagoEtapa::actualizarCatEtapa::::usuario::::"
							+ this.getSessionObj().getNumempleado());
					System.out.println("MantenimientoCatlagoEtapa::actualizarCatEtapa::::idEtapa::::" + idEtapa);

					// System.out.println("MantenimientoCatlagoEtapa::actualizarCatEtapa::::idEtapa::::"
					// + seleccionadoEtapa.getIdEtapa());

				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR.", " Error al Actualizar.");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE.", "Etapa Existente.");
			}
		}
	}

	public CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("Usuario");
	}

	public void cerrarDialogAgregarEtapa() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");

	}

	public void cerrarDialogActualizarEtapa() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");
	}

	public void limpiar() {
		setNombreEtapa("");
		setDescripcion("");
	}

	public List<EtapasVO> getListCatEtapa() {
		return listCatEtapa;
	}

	public void setListCatEtapa(List<EtapasVO> listCatEtapa) {
		this.listCatEtapa = listCatEtapa;
	}

	public EtapasVO getSeleccionadoEtapa() {
		return seleccionadoEtapa;
	}

	public void setSeleccionadoEtapa(EtapasVO seleccionadoEtapa) {
		this.seleccionadoEtapa = seleccionadoEtapa;
	}

	public String getNombreEtapa() {
		return nombreEtapa;
	}

	public void setNombreEtapa(String nombreEtapa) {
		this.nombreEtapa = nombreEtapa;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getNombreEtapaAgregar() {
		return nombreEtapaAgregar;
	}

	public void setNombreEtapaAgregar(String nombreEtapaAgregar) {
		this.nombreEtapaAgregar = nombreEtapaAgregar;
	}

	public String getDescripcionAgregar() {
		return descripcionAgregar;
	}

	public void setDescripcionAgregar(String descripcionAgregar) {
		this.descripcionAgregar = descripcionAgregar;
	}

	public BigDecimal getIdEtapa() {
		return idEtapa;
	}

	public void setIdEtapa(BigDecimal idEtapa) {
		this.idEtapa = idEtapa;
	}

	public EtapasVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(EtapasVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public EtapasVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(EtapasVO validaExisteActualiza) {
		this.validaExisteActualiza = validaExisteActualiza;
	}

	public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

}
