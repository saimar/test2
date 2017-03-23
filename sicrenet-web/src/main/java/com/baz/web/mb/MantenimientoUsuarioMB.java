package com.baz.web.mb;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;

import org.primefaces.component.growl.Growl;
import org.primefaces.context.RequestContext;

import com.baz.commons.domain.CatUsuarios;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.commons.vo.PaisVO;
import com.baz.commons.vo.RolesVO;
import com.baz.commons.vo.UsuarioPaisVO;
import com.baz.commons.vo.UsuariosVO;
import com.baz.ejb.service.MantenimientoUsuarioService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name = "mantenimientoUser")

@SessionScoped
public class MantenimientoUsuarioMB implements Serializable {

	/**
		 * 
		 */
	private static final long serialVersionUID = 1L;

	@EJB
	MantenimientoUsuarioService mantenimientoUserService;

	private String numEmpleadoAgregaUsuarioNuevo;
	private String idRolOneMenuNuevoUsuario;
	private String RolAgregaUsuarioNuevo;
	private String centroCostosAgregaUsuarioNuevo;
	private String NombreAgregaUsuarioNuevo;
	private String apellido1AgregaUsuarioNuevo;
	private String apellido2AgregaUsuarioNuevo;
	private String direccionAgregaUsuarioNuevo;
	private String administracionAgregaUsuarioNuevo;
	private String correoAgregaUsuarioNuevo;
	private Boolean accesoDenegadoAgregarUsuarioNuevo;
	private int accesoDenegadoVariable;

	private String numeroEmpleado;

	private String idEmpleado;
	private RolesVO rol;
	private String rolDescripcion;
	private String centroCostos;
	private String nombre;
	private String apellido1;
	private String apellido2;
	private String direccion;
	private String administracion;
	private String correo;
	private Boolean accesoDenegado;
	private List<UsuariosVO> listUsuariosVO;
	private List<RolesVO> listaRoles;
	private UsuariosVO selecteduUser;
	private String idRolOneMenuActualizaUsuario;

	private UsuariosVO validateAgrega;
	private UsuariosVO validateActualiza;
	private int estatus;
	private List<PaisVO> listaPais;
	private PaisVO entidadPais;
	private BigDecimal idPaisAgrega;
	private BigDecimal idPaisActualiza;

	private Date fecha;
	
	
	private List<String> listaidpais;
	private List<String> listaidpaisActualiza = null;
	private List<UsuarioPaisVO> listaMantoUsuarioPais;
	private int estatusPais;
	

	@PostConstruct
	private void init() throws ExcepcionSicrenet {

		try {
			listUsuariosVO = mantenimientoUserService.getUsers();
			listaPais = mantenimientoUserService.CargaPais();
			listaRoles = mantenimientoUserService.CargaRoles();

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}

	}

	public void CargaUsuarios() throws ExcepcionSicrenet{
		try {
		idEmpleado = selecteduUser.getNumempleado();
		idRolOneMenuActualizaUsuario = String.valueOf(selecteduUser.getIdrol());
		centroCostos = selecteduUser.getCentrocostos();
		nombre = selecteduUser.getNombre();
		apellido1 = selecteduUser.getApaterno();
		apellido2 = selecteduUser.getAmaterno();
		direccion = selecteduUser.getDireccion();
		administracion = selecteduUser.getGerencia();
		correo = selecteduUser.getCorreo();
		accesoDenegado = selecteduUser.getBloqueo() == 0 ? true : false;
		estatus = selecteduUser.getStatus();
		idPaisActualiza = selecteduUser.getIdPais();
		
		listaMantoUsuarioPais = mantenimientoUserService.CargaUsuarioPais(1, idEmpleado,1);
		for(int i = 0;  i < listaMantoUsuarioPais.size(); i++){
			String result = listaMantoUsuarioPais.get(i).getIdPais() == null ? "" : listaMantoUsuarioPais.get(i).getIdPais().toString();
			System.out.println("MantenmientoUsuariosMB::::AgregarUsuario:::: listaidPaisActualiza::" +  result);
			listaidpaisActualiza.add(result);
			}
		
		
		
		
		
	
		

		System.out.println("carga:::::" + idEmpleado);
		System.out.println("apellido1:::::" + apellido1);
		System.out.println("apellido2:::::" + apellido2);
	} catch (ExcepcionSicrenet e) {
		MostrarMensajesUtil.agregarMensaje(1, "ERROR!.", "Error al cargar los Datos.");
	}
	}

	public void cargaTablaUsuarios() throws ExcepcionSicrenet {

		try {
			listUsuariosVO = mantenimientoUserService.getUsers();

		} catch (ExcepcionSicrenet e) {
			MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
		}
	}
	
	public void prueba(){
		System.out.println("MantenimientoUsuarios:::lista de usuarios:::listaidpais:::todos:::" + listaidpaisActualiza.size());
		
		for( int i = 0; i < listaidpaisActualiza.size(); i++){
			//listaidpais.get(i);
			System.out.println("MantenimientoUsuarios:::lista de usuarios:::listaidpais:::::" + listaidpaisActualiza.get(i));
		}
	}

	public void AgregaUsuario() throws ExcepcionSicrenet {

		if (numEmpleadoAgregaUsuarioNuevo == null || numEmpleadoAgregaUsuarioNuevo.trim().length() == 0
				|| idRolOneMenuNuevoUsuario == null || idRolOneMenuNuevoUsuario.trim().length() == 0
				|| centroCostosAgregaUsuarioNuevo == null || centroCostosAgregaUsuarioNuevo.trim().length() == 0
				|| NombreAgregaUsuarioNuevo == null || NombreAgregaUsuarioNuevo.trim().length() == 0
				|| apellido1AgregaUsuarioNuevo == null || apellido1AgregaUsuarioNuevo.trim().length() == 0
				|| apellido2AgregaUsuarioNuevo == null || apellido2AgregaUsuarioNuevo.trim().length() == 0
				|| direccionAgregaUsuarioNuevo == null || direccionAgregaUsuarioNuevo.trim().length() == 0
				|| administracionAgregaUsuarioNuevo == null || administracionAgregaUsuarioNuevo.trim().length() == 0
				|| correoAgregaUsuarioNuevo == null || correoAgregaUsuarioNuevo.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden Contener Vacio.");
		} else {
			UsuariosVO agregaUsu = new UsuariosVO();
			RolesVO rool = new RolesVO();
			PaisVO pais = new PaisVO();
			try {

				agregaUsu.setNumempleado(this.numEmpleadoAgregaUsuarioNuevo);
				rool.setIdrol(new BigDecimal(idRolOneMenuNuevoUsuario));
				agregaUsu.setCentrocostos(this.centroCostosAgregaUsuarioNuevo);
				agregaUsu.setNombre(this.NombreAgregaUsuarioNuevo);
				agregaUsu.setApaterno(this.apellido1AgregaUsuarioNuevo);
				agregaUsu.setAmaterno(this.apellido2AgregaUsuarioNuevo);
				agregaUsu.setDireccion(this.direccionAgregaUsuarioNuevo);
				agregaUsu.setGerencia(this.administracionAgregaUsuarioNuevo);
				agregaUsu.setCorreo(this.correoAgregaUsuarioNuevo);
				pais.setIdPais(idPaisAgrega);

				accesoDenegadoVariable = accesoDenegadoAgregarUsuarioNuevo == false ? 1 : 0;

				System.out.println("MantenimientoUsuarios:::idPaisAgrega:::" + idPaisAgrega);
				validateAgrega = mantenimientoUserService.cargarUsuariosExisteAgregar(agregaUsu);

				System.out.println("MantenimientoUsuarios:::validateAgrega:::" + validateAgrega.getEstatus());
			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR!.", "Error al validar si Existe.");
			}

			if (validateAgrega.getEstatus() == 0) {
				try {
					mantenimientoUserService.agregaUser(agregaUsu, rool, accesoDenegadoVariable,
							this.getSessionObj().getNumempleado(), pais, listaidpais);
					MostrarMensajesUtil.agregarMensaje(4, "INGRESADO.", "Agregado Correctamente.");
					
					
					
					this.cerrarDialogAgregarFase();
					this.limpiar();
					this.cargaTablaUsuarios();
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Agregar  " + e.getMessage());
				}
			} else {
				MostrarMensajesUtil.agregarMensaje(1, "EXISTE", "Fase Existente.");
			}

		}

	}

	public Growl timeGrowl() {
		Growl growl = new Growl(); // Growl is from
									// org.primefaces.component.growl.
		growl.setLife(1000);
		return growl;
	}

	public void ActualizaUsuarios() throws ExcepcionSicrenet {

		if (idEmpleado == null || idEmpleado.trim().length() == 0 || idRolOneMenuActualizaUsuario == null
				|| idRolOneMenuActualizaUsuario.trim().length() == 0 || centroCostos == null
				|| centroCostos.trim().length() == 0 || nombre == null || nombre.trim().length() == 0
				|| apellido1 == null || apellido1.trim().length() == 0 || apellido2 == null
				|| apellido2.trim().length() == 0 || direccion == null || direccion.trim().length() == 0
				|| administracion == null || administracion.trim().length() == 0 || correo == null
				|| correo.trim().length() == 0) {
			MostrarMensajesUtil.agregarMensaje(2, "VACIO.", "No Pueden Contener Vacio.");
		} else {

			try {
				UsuariosVO actualizaUsuario = new UsuariosVO();
				RolesVO rool = new RolesVO();
				PaisVO pais = new PaisVO();

				actualizaUsuario.setNumempleado(this.idEmpleado);
				rool.setIdrol(new BigDecimal(idRolOneMenuActualizaUsuario));
				actualizaUsuario.setCentrocostos(this.centroCostos);
				actualizaUsuario.setNombre(this.nombre);
				actualizaUsuario.setApaterno(this.apellido1);
				actualizaUsuario.setAmaterno(this.apellido2);
				actualizaUsuario.setDireccion(this.direccion);
				actualizaUsuario.setGerencia(this.administracion);
				actualizaUsuario.setCorreo(this.correo);
				accesoDenegadoVariable = accesoDenegado == false ? 1 : 0;
				actualizaUsuario.setStatus(estatus);
				pais.setIdPais(idPaisActualiza);

				System.out.println("MantenimientoUsuarioMB::ActualizaUsuario:::idPaisActualiza:::" + idPaisActualiza);
				System.out.println("MantenimientoUsuarioMB::ActualizaUsuario:::estatus:::" + estatus);

				System.out.println("MantenimientoUsuarioMB::ActualizaUsuario:::adminstracion:::" + administracion);
				System.out.println("MantenimientoUsuarioMB::ActualizaUsuario:::correo:::" + this.correo);
				System.out.println(this.idEmpleado);

				mantenimientoUserService.actualizaUser(actualizaUsuario, rool, accesoDenegadoVariable,
				this.getSessionObj().getNumempleado(), pais, listaidpaisActualiza, estatusPais);
				MostrarMensajesUtil.agregarMensaje(4, "ACTUALIZADO.", "Actualizado Correctamente.");
				this.cerrarDialogActualizaFase();
				this.limpiar();
				this.cargaTablaUsuarios();

			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "ERROR", "Error al Actualizar");
			}
		}

	}

	

	public void limpiar() {
		
		setListaidpaisActualiza(null);
		

		setNumEmpleadoAgregaUsuarioNuevo("");
		setIdRolOneMenuActualizaUsuario("");
		// setRolAgregaUsuarioNuevo("");
		setCentroCostosAgregaUsuarioNuevo("");
		setNombreAgregaUsuarioNuevo("");
		setApellido1AgregaUsuarioNuevo("");
		setApellido2AgregaUsuarioNuevo("");
		setDireccionAgregaUsuarioNuevo("");
		setAdministracionAgregaUsuarioNuevo("");
		setCorreoAgregaUsuarioNuevo("");
		setAccesoDenegadoAgregarUsuarioNuevo(false);
		// setAccesoDenegadoVariable(0);
		setListaDesplegableMenuRol("");

		setIdEmpleado("");
		setRolDescripcion("");
		setCentroCostos("");
		setNombre("");
		setApellido1("");
		setApellido2("");
		setDireccion("");
		setAdministracion("");
		setCorreo("");

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

	public String getIdEmpleado() {

		return idEmpleado;
	}

	public void setIdEmpleado(String idEmpleado) {

		this.idEmpleado = idEmpleado;
	}

	public RolesVO getRol() {
		return rol;
	}

	public void setRol(RolesVO rol) {
		this.rol = rol;
	}

	public String getRolDescripcion() {
		return rolDescripcion;
	}

	public void setRolDescripcion(String rolDescripcion) {
		this.rolDescripcion = rolDescripcion;
	}

	public String getCentroCostos() {
		return centroCostos;
	}

	public void setCentroCostos(String centroCostos) {
		this.centroCostos = centroCostos;
	}

	public String getNombre() {

		return nombre;
	}

	public void setNombre(String nombre) {

		this.nombre = nombre;
	}

	public String getApellido1() {
		return this.apellido1;
	}

	public void setApellido1(String apellido1) {
		this.apellido1 = apellido1;
	}

	public String getApellido2() {
		return apellido2;
	}

	public void setApellido2(String apellido2) {
		this.apellido2 = apellido2;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getAdministracion() {
		return administracion;
	}

	public void setAdministracion(String administracion) {
		this.administracion = administracion;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public Boolean getAccesoDenegado() {
		return accesoDenegado;
	}

	public void setAccesoDenegado(Boolean accesoDenegado) {
		this.accesoDenegado = accesoDenegado;
	}

	public List<UsuariosVO> getListUsuariosVO() {
		return listUsuariosVO;
	}

	public void setListUsuariosVO(List<UsuariosVO> listUsuariosVO) {
		this.listUsuariosVO = listUsuariosVO;
	}

	public UsuariosVO getSelecteduuser() {
		return selecteduUser;
	}

	public void setSelecteduuser(UsuariosVO selecteduuser) {
		this.selecteduUser = selecteduuser;
	}

	public String getNumEmpleadoAgregaUsuarioNuevo() {
		return numEmpleadoAgregaUsuarioNuevo;
	}

	public void setNumEmpleadoAgregaUsuarioNuevo(String numEmpleadoAgregaUsuarioNuevo) {
		this.numEmpleadoAgregaUsuarioNuevo = numEmpleadoAgregaUsuarioNuevo;
	}

	public String getRolAgregaUsuarioNuevo() {
		return RolAgregaUsuarioNuevo;
	}

	public void setRolAgregaUsuarioNuevo(String rolAgregaUsuarioNuevo) {
		RolAgregaUsuarioNuevo = rolAgregaUsuarioNuevo;
	}

	public String getCentroCostosAgregaUsuarioNuevo() {
		return centroCostosAgregaUsuarioNuevo;
	}

	public void setCentroCostosAgregaUsuarioNuevo(String centroCostosAgregaUsuarioNuevo) {
		this.centroCostosAgregaUsuarioNuevo = centroCostosAgregaUsuarioNuevo;
	}

	public String getNombreAgregaUsuarioNuevo() {
		return NombreAgregaUsuarioNuevo;
	}

	public void setNombreAgregaUsuarioNuevo(String nombreAgregaUsuarioNuevo) {
		NombreAgregaUsuarioNuevo = nombreAgregaUsuarioNuevo;
	}

	public String getApellido1AgregaUsuarioNuevo() {
		return apellido1AgregaUsuarioNuevo;
	}

	public void setApellido1AgregaUsuarioNuevo(String apellido1AgregaUsuarioNuevo) {
		this.apellido1AgregaUsuarioNuevo = apellido1AgregaUsuarioNuevo;
	}

	public String getApellido2AgregaUsuarioNuevo() {
		return apellido2AgregaUsuarioNuevo;
	}

	public void setApellido2AgregaUsuarioNuevo(String apellido2AgregaUsuarioNuevo) {
		this.apellido2AgregaUsuarioNuevo = apellido2AgregaUsuarioNuevo;
	}

	public String getDireccionAgregaUsuarioNuevo() {
		return direccionAgregaUsuarioNuevo;
	}

	public void setDireccionAgregaUsuarioNuevo(String direccionAgregaUsuarioNuevo) {
		this.direccionAgregaUsuarioNuevo = direccionAgregaUsuarioNuevo;
	}

	public String getAdministracionAgregaUsuarioNuevo() {
		return administracionAgregaUsuarioNuevo;
	}

	public void setAdministracionAgregaUsuarioNuevo(String administracionAgregaUsuarioNuevo) {
		this.administracionAgregaUsuarioNuevo = administracionAgregaUsuarioNuevo;
	}

	public String getCorreoAgregaUsuarioNuevo() {
		return correoAgregaUsuarioNuevo;
	}

	public void setCorreoAgregaUsuarioNuevo(String correoAgregaUsuarioNuevo) {
		this.correoAgregaUsuarioNuevo = correoAgregaUsuarioNuevo;
	}

	public List<RolesVO> getListaRoles() {
		return listaRoles;
	}

	public void setListaRoles(List<RolesVO> listaRoles) {
		this.listaRoles = listaRoles;
	}

	public String getListaDesplegableMenuRol() {
		return idRolOneMenuNuevoUsuario;
	}

	public void setListaDesplegableMenuRol(String listaDesplegableMenuRol) {
		this.idRolOneMenuNuevoUsuario = listaDesplegableMenuRol;
	}

	public String getIdRolOneMenuActualizaUsuario() {
		return idRolOneMenuActualizaUsuario;
	}

	public void setIdRolOneMenuActualizaUsuario(String idRolOneMenuActualizaUsuario) {
		this.idRolOneMenuActualizaUsuario = idRolOneMenuActualizaUsuario;
	}

	public Boolean getAccesoDenegadoAgregarUsuarioNuevo() {
		return accesoDenegadoAgregarUsuarioNuevo;
	}

	public void setAccesoDenegadoAgregarUsuarioNuevo(Boolean accesoDenegadoAgregarUsuarioNuevo) {
		this.accesoDenegadoAgregarUsuarioNuevo = accesoDenegadoAgregarUsuarioNuevo;
	}

	public int getAccesoDenegadoVariable() {
		return accesoDenegadoVariable;
	}

	public void setAccesoDenegadoVariable(int accesoDenegadoVariable) {
		this.accesoDenegadoVariable = accesoDenegadoVariable;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public String getNumeroEmpleado() {
		return numeroEmpleado;
	}

	public void setNumeroEmpleado(String numeroEmpleado) {
		this.numeroEmpleado = numeroEmpleado;
	}

	public UsuariosVO getValidateAgrega() {
		return validateAgrega;
	}

	public void setValidateAgrega(UsuariosVO validateAgrega) {
		this.validateAgrega = validateAgrega;
	}

	public UsuariosVO getValidateActualiza() {
		return validateActualiza;
	}

	public void setValidateActualiza(UsuariosVO validateActualiza) {
		this.validateActualiza = validateActualiza;
	}

	public int getEstatus() {
		return estatus;
	}

	public void setEstatus(int estatus) {
		this.estatus = estatus;
	}

	public List<PaisVO> getListaPais() {
		return listaPais;
	}

	public void setListaPais(List<PaisVO> listaPais) {
		this.listaPais = listaPais;
	}

	public PaisVO getEntidadPais() {
		return entidadPais;
	}

	public void setEntidadPais(PaisVO entidadPais) {
		this.entidadPais = entidadPais;
	}

	public BigDecimal getIdPaisAgrega() {
		return idPaisAgrega;
	}

	public void setIdPaisAgrega(BigDecimal idPaisAgrega) {
		this.idPaisAgrega = idPaisAgrega;
	}

	public BigDecimal getIdPaisActualiza() {
		return idPaisActualiza;
	}

	public void setIdPaisActualiza(BigDecimal idPaisActualiza) {
		this.idPaisActualiza = idPaisActualiza;
	}

	public List<String> getListaidpais() {
		return listaidpais;
	}

	public void setListaidpais(List<String> listaidpais) {
		this.listaidpais = listaidpais;
	}

	public List<String> getListaidpaisActualiza() {
		return listaidpaisActualiza;
	}

	public void setListaidpaisActualiza(List<String> listaidpaisActualiza) {
		this.listaidpaisActualiza = listaidpaisActualiza;
	}

	public List<UsuarioPaisVO> getListaMantoUsuarioPais() {
		return listaMantoUsuarioPais;
	}

	public void setListaMantoUsuarioPais(List<UsuarioPaisVO> listaMantoUsuarioPais) {
		this.listaMantoUsuarioPais = listaMantoUsuarioPais;
	}

	public int getEstatusPais() {
		return estatusPais;
	}

	public void setEstatusPais(int estatusPais) {
		this.estatusPais = estatusPais;
	}
	
	
}
