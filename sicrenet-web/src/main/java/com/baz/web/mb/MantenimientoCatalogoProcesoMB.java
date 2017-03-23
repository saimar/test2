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
import com.baz.commons.vo.NivelVO;
import com.baz.commons.vo.ProcesoVO;
import com.baz.ejb.service.MantenimientoCatalogoProcesoService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoCatalogoProceso")
@SessionScoped
public class MantenimientoCatalogoProcesoMB implements Serializable {

	private static final long serialVersionUID = 1L;

	private List<CedulaVO> listaCedula;
	private List<ProcesoVO> listaProceso;
	private List<NivelVO> listaNivel;
	private ProcesoVO seleccionaProceso;
	private BigDecimal idProceso;
	private BigDecimal idCedulaAgrega;
	private BigDecimal idNievelAgregar;
	private String storeAgrega;
	private int estatusAgrega;
	private ProcesoVO validaExisteAgrega;
	private ProcesoVO validaExisteActualiza;
	private BigDecimal idCedulaActualiza;
	private int idNievelActualiza;
	private String storeActualiza;
	private int estatusActualiza;
	private Date fecha;

	@EJB
	MantenimientoCatalogoProcesoService mantenimientoCatologoProcesoService;

	@PostConstruct
	private void init() throws ExcepcionSicrenet {

		try {

			listaProceso = mantenimientoCatologoProcesoService.cargarCatalogoProceso(0, 0);
			listaCedula = mantenimientoCatologoProcesoService.cargarCatalogoCedula();
			listaNivel = mantenimientoCatologoProcesoService.cargarCatalogoNivel();

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void CargaProcesoActualizar() {

		idCedulaActualiza = seleccionaProceso.getIdCedula();
		idNievelActualiza = seleccionaProceso.getIdNivel().intValue();
		estatusActualiza = seleccionaProceso.getEstatus();
		idProceso = seleccionaProceso.getIdProceso();
		System.out.println("ManteniminetoCatFuente::CargaFuenteActualiza::::idNivelActualiza::::" + idNievelActualiza);
		
	}

	public void agregarCatalogoProceso() throws ExcepcionSicrenet {

		if (idNievelAgregar == null || idCedulaAgrega == null || storeAgrega == null
				|| storeAgrega.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden Estar Vacios");
		} else {

			
			try {


				validaExisteAgrega = mantenimientoCatologoProcesoService.cargarCatalogoProcesoValidateExiste(2, 0, idCedulaAgrega.intValue());

				System.out.println("MantemininetoCatFuente::agregarCatFuente::::idCedulaAgrega" + idCedulaAgrega);
				System.out.println("MantemininetoCatFuente::agregarCatFuente::::idNievelAgregar" + idNievelAgregar);
				System.out.println("MantemininetoCatFuente::agregarCatFuente::::storeAgrega" + storeAgrega);

			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}

			if (validaExisteAgrega.getEstatus() == 0) {
				try {
					mantenimientoCatologoProcesoService.guardarCatalogoProceso(3, 0, idNievelAgregar.intValue(),
							idCedulaAgrega.intValue(), storeAgrega, 1, this.getSessionObj().getNumempleado());
					this.cerrarDialogAgregaProceso();
					this.CargaTablaCatProceso();
					this.limpiar();
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Proceso Existente.");
			}
		}
	}

	public void actualizaCatalogoProceso() throws ExcepcionSicrenet {

		if (idCedulaActualiza == null || idNievelActualiza == 0 ) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Conterner Vacio");
		} else {

			try {
				

				validaExisteActualiza = mantenimientoCatologoProcesoService.cargarCatalogoProcesoValidateExiste(4, idProceso.intValue(),
						idCedulaActualiza.intValue());
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR.", "Error al Validar Si Existe");
			}
			if (validaExisteActualiza.getEstatus() == 0) {
				try {
					mantenimientoCatologoProcesoService.guardarCatalogoProceso(5, idProceso.intValue(), idNievelActualiza,
							idCedulaActualiza.intValue(), null, estatusActualiza,
							this.getSessionObj().getNumempleado());

					MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
					this.cerrarDialogActualizarProceso();
					this.CargaTablaCatProceso();
					this.limpiar();
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR.", " Error al Actualizar.");
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE.", "Proceso Existente.");
			}
		}
	}

	public void CargaTablaCatProceso() throws ExcepcionSicrenet {
		try {

			listaProceso = mantenimientoCatologoProcesoService.cargarCatalogoProceso(0, 0);
			
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

	public void cerrarDialogAgregaProceso() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg7').hide();");
	}

	public void cerrarDialogActualizarProceso() throws ExcepcionSicrenet {
		RequestContext requestContext = RequestContext.getCurrentInstance();
		requestContext.execute("PF('dlg6').hide();");
	}

	public List<CedulaVO> getListaCedula() {
		return listaCedula;
	}

	public void setListaCedula(List<CedulaVO> listaCedula) {
		this.listaCedula = listaCedula;
	}

	public List<ProcesoVO> getListaProceso() {
		return listaProceso;
	}

	public void setListaProceso(List<ProcesoVO> listaProceso) {
		this.listaProceso = listaProceso;
	}

	public List<NivelVO> getListaNivel() {
		return listaNivel;
	}

	public void setListaNivel(List<NivelVO> listaNivel) {
		this.listaNivel = listaNivel;
	}

	public ProcesoVO getSeleccionaProceso() {
		return seleccionaProceso;
	}

	public void setSeleccionaProceso(ProcesoVO seleccionaProceso) {
		this.seleccionaProceso = seleccionaProceso;
	}

	public BigDecimal getIdProceso() {
		return idProceso;
	}

	public void setIdProceso(BigDecimal idProceso) {
		this.idProceso = idProceso;
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

	public ProcesoVO getValidaExisteAgrega() {
		return validaExisteAgrega;
	}

	public void setValidaExisteAgrega(ProcesoVO validaExisteAgrega) {
		this.validaExisteAgrega = validaExisteAgrega;
	}

	public ProcesoVO getValidaExisteActualiza() {
		return validaExisteActualiza;
	}

	public void setValidaExisteActualiza(ProcesoVO validaExisteActualiza) {
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
