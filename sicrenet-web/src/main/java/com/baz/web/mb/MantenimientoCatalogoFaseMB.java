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
import com.baz.commons.vo.FasesVO;
import com.baz.ejb.service.MantenimientoCatalogoFaseService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoFace")

@SessionScoped
public class MantenimientoCatalogoFaseMB implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<FasesVO> listCatFace;
	private List<EtapasVO> lsitaEtapas;
	private FasesVO seleccionaFace;
	private BigDecimal id_face;
	private BigDecimal idFace;
	private String nombre;
	private String descripcion;
	private int estatus;
	private String idonemenuidEtapa;
	private FasesVO validaExisteAgrega;
	private FasesVO validaExisteActualiza;
	private String nombreAgrega;
	private String descripcionAgrega;
	private String idonemenuagregaridEtapa;

	@EJB
	MantenimientoCatalogoFaseService mantenimientoCatologoFaseService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {

		try {

			listCatFace = mantenimientoCatologoFaseService.cargarCatalogoFase(0, 0, 0);
			lsitaEtapas = mantenimientoCatologoFaseService.cargarCatalogoEtapas(1, 0, 1);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void cargaTablaFaces() throws ExcepcionSicrenet {

		try {

			listCatFace = mantenimientoCatologoFaseService.cargarCatalogoFase(0, 0, 0);

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}

	public void CargaFases() {

		nombre = seleccionaFace.getNombre();
		descripcion = seleccionaFace.getDescripcion();
		idonemenuidEtapa = String.valueOf(seleccionaFace.getIdEtapa());
		id_face = seleccionaFace.getIdFace();
		estatus = seleccionaFace.getEstatus();
		System.out.println("imprime:::idonemenuidEtapa::: " + idonemenuidEtapa);
		System.out.println("imprime:::id_face::::" + id_face);

	}

	public void AgregaFase() throws ExcepcionSicrenet {

		System.out.println("ManteniminetoCatalgoFase::::idonemenuagregaridEtapa:::" + idonemenuagregaridEtapa);

		if (nombreAgrega == null || nombreAgrega.trim().length() == 0 || descripcionAgrega == null
				|| descripcionAgrega.trim().length() == 0 || idonemenuagregaridEtapa == null
				|| idonemenuagregaridEtapa.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden Contener Vacio, Nombre y Descripcion");
		} else {

			try {


				validaExisteAgrega = mantenimientoCatologoFaseService.cargarCatalogoFaseValidateExiste(2, 0, nombreAgrega, descripcionAgrega);
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Validar Si Existe");
			}

			if (validaExisteAgrega.getEstatus() == 0) {
				try {

					mantenimientoCatologoFaseService.guardarCatalogoFase(3, 0, nombreAgrega, descripcionAgrega, Integer.valueOf(idonemenuagregaridEtapa), 1,
							this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "Agregado", "Ingresado Correctamente.");
					this.cerrarDialogAgregarFase();
					this.cargaTablaFaces();
					this.limpiar();

				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Fase Existente.");
			}

		}

	}

	public void ActualizaFase() throws ExcepcionSicrenet {

		System.out.println("MantenimientoCatalagoFaseMB:::ActualizaFase::::id_face::" + id_face);
		System.out.println("MantenimientoCatalagoFaseMB:::ActualizaFase::::idonemenuidEtapa::" + idonemenuidEtapa);
		if (nombre == null || nombre.trim().length() == 0 || descripcion == null || descripcion.trim().length() == 0
				|| idonemenuidEtapa == null || idonemenuidEtapa.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden ir Vacios, Nombre y Descripcion");
		} else {
		
			try {
				

				validaExisteActualiza = mantenimientoCatologoFaseService.cargarCatalogoFaseValidateExiste(4, id_face.intValue(), nombre, descripcion);
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Validar Si Existe");
			}

			if (validaExisteActualiza.getEstatus() == 0) {
				try {
					mantenimientoCatologoFaseService.guardarCatalogoFase(5, id_face.intValue(), nombre, descripcion, Integer.valueOf(idonemenuidEtapa), estatus, this.getSessionObj().getNumempleado());
					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizaFase();
					this.cargaTablaFaces();
					this.limpiar();
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Actualizar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Fase Existente.");
			}

		}

	}



	public void limpiar() {
		setNombre("");
		setDescripcion("");
		setNombreAgrega("");
		setDescripcionAgrega("");
		setNombreAgrega("");
		setDescripcionAgrega("");
		setIdonemenuagregaridEtapa("");
		setIdonemenuidEtapa("");
		setEstatus(0);

	}

	public void cerrarDialogAgregarFase() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");

	}

	public void cerrarDialogActualizaFase() throws ExcepcionSicrenet {

		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");

	}

	public CatUsuarios getSessionObj() {
		return (CatUsuarios) FacesContext.getCurrentInstance().getExternalContext().getSessionMap().get("Usuario");
	}

	public List<FasesVO> getListCatFace() {
		return listCatFace;
	}

	public void setListCatFace(List<FasesVO> listCatFace) {
		this.listCatFace = listCatFace;
	}

	public FasesVO getSeleccionaFace() {
		return seleccionaFace;
	}

	public void setSeleccionaFace(FasesVO seleccionaFace) {
		this.seleccionaFace = seleccionaFace;
	}

	public BigDecimal getId_face() {
		return id_face;
	}

	public void setId_face(BigDecimal id_face) {
		this.id_face = id_face;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getNombreAgrega() {
		return nombreAgrega;
	}

	public void setNombreAgrega(String nombreAgrega) {
		this.nombreAgrega = nombreAgrega;
	}

	public String getDescripcionAgrega() {
		return descripcionAgrega;
	}

	public void setDescripcionAgrega(String descripcionAgrega) {
		this.descripcionAgrega = descripcionAgrega;
	}

	public String getIdonemenuidEtapa() {
		return idonemenuidEtapa;
	}

	public void setIdonemenuidEtapa(String idonemenuidEtapa) {
		this.idonemenuidEtapa = idonemenuidEtapa;
	}

	public String getIdonemenuagregaridEtapa() {
		return idonemenuagregaridEtapa;
	}

	public void setIdonemenuagregaridEtapa(String idonemenuagregaridEtapa) {
		this.idonemenuagregaridEtapa = idonemenuagregaridEtapa;
	}

	public List<EtapasVO> getLsitaEtapas() {
		return lsitaEtapas;
	}

	public void setLsitaEtapas(List<EtapasVO> lsitaEtapas) {
		this.lsitaEtapas = lsitaEtapas;
	}

	public BigDecimal getIdFace() {
		return idFace;
	}

	public void setIdFace(BigDecimal idFace) {
		this.idFace = idFace;
	}

	public FasesVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(FasesVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public FasesVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(FasesVO validaExisteActualiza) {
		this.validaExisteActualiza = validaExisteActualiza;
	}

	public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

}
