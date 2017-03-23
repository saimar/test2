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
import com.baz.commons.vo.ConceptoVO;
import com.baz.ejb.service.MantenimientoCatalogoConceptoService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoConcepto")
@SessionScoped
public class MantenimientoCatalogoConceptoMB implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<ConceptoVO> listCatConcepto;
	private ConceptoVO seleccionadoConcepto;
	private ConceptoVO validaExisteAgrega;
	private ConceptoVO validaExisteActualiza;
	private BigDecimal idConcepto;
	private String nombre;
	private int estatus;
	private String nombreAgregar;

	@EJB
	MantenimientoCatalogoConceptoService mantenimientoCatalogoConceptoService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {
		try {

			listCatConcepto = mantenimientoCatalogoConceptoService.cargaConceptoVO(0, 0, 1);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void cargarTabla() throws ExcepcionSicrenet {
		try {

			listCatConcepto = mantenimientoCatalogoConceptoService.cargaConceptoVO(0, 0, 1);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}

	public void CargaCatConceptoActualizar() throws ExcepcionSicrenet {

		nombre = seleccionadoConcepto.getNombre();
		idConcepto = seleccionadoConcepto.getIdConcepto();
		estatus = seleccionadoConcepto.getEstatus();

	}

	public void agregarCatConcepto() throws ExcepcionSicrenet {

		if (nombreAgregar == null || nombreAgregar.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacio Nombre");
		} else {
			ConceptoVO ConceptoVO = new ConceptoVO();
			try {

				ConceptoVO.setNombre(this.nombreAgregar);
				ConceptoVO.setIdConcepto(null);
				ConceptoVO.setEstatus(1);

				System.out.println("imprime::::::nombreAgregar:::" + nombreAgregar);

				validaExisteAgrega = mantenimientoCatalogoConceptoService.cargarCatalogoConceptoValidateExiste(4, 0,
						nombreAgregar);

			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Validar Si Existe");
			}
			System.out.println("imprime::::::validaExiste.getEstatus():::" + validaExisteAgrega.getEstatus());

			if (validaExisteAgrega.getEstatus() == 0) {
				try {

					mantenimientoCatalogoConceptoService.guardarCambiosAgregarActualizar(2, 0, nombreAgregar, 1,
							this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "Agregado", "Ingresado Correctamente.");
					this.cerrarDialogAgregarConcepto();
					this.cargarTabla();
					this.limpiar();

					System.out.println("MantenimientoCatalogoCONCEPTO::agregarCatConcepto:::descripcionAgregar:::"
							+ nombreAgregar);
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Concepto Existente.");
			}
		}
	}

	public void actualizarCatConcepto() throws ExcepcionSicrenet {
		if (nombre == null || nombre.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios Nombre");
		} else {

			try {

				validaExisteActualiza = mantenimientoCatalogoConceptoService.cargarCatalogoConceptoValidateExiste(5,
						idConcepto.intValue(), nombre);
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}
			if (validaExisteActualiza.getEstatus() == 0) {
				try {

					mantenimientoCatalogoConceptoService.guardarCambiosAgregarActualizar(3, idConcepto.intValue(),
							nombre, estatus, this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizarConcepto();
					this.cargarTabla();
					this.limpiar();

					System.out.println("MantenimientoCatlagoConcepto::actualizarCatConcepto::::nombre::::" + nombre);
					System.out.println("MantenimientoCatlagoConcepto::actualizarCatConcepto::::usuario::::"
							+ this.getSessionObj().getNumempleado());
					System.out.println(
							"MantenimientoCatlagoConcepto::actualizarCatConcepto::::idConcepto::::" + idConcepto);

				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR.", " Error al Actualizar.");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE.", "Concepto Existente.");
			}
		}
	}

	public CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("Usuario");
	}

	public void cerrarDialogAgregarConcepto() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");

	}

	public void cerrarDialogActualizarConcepto() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");
	}

	public void limpiar() {
		setNombre("");
	}

	public List<ConceptoVO> getListCatConcepto() {
		return listCatConcepto;
	}

	public void setListCatConcepto(List<ConceptoVO> listCatConcepto) {
		this.listCatConcepto = listCatConcepto;
	}

	public ConceptoVO getSeleccionadoConcepto() {
		return seleccionadoConcepto;
	}

	public void setSeleccionadoConcepto(ConceptoVO seleccionadoConcepto) {
		this.seleccionadoConcepto = seleccionadoConcepto;
	}

	public ConceptoVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(ConceptoVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public ConceptoVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(ConceptoVO validaExisteActualiza) {
		this.validaExisteActualiza = validaExisteActualiza;
	}

	public BigDecimal getIdConcepto() {
		return idConcepto;
	}

	public void setIdConcepto(BigDecimal idConcepto) {
		this.idConcepto = idConcepto;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
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

}
