package com.baz.web.security.util;

import java.io.Serializable;

import javax.ejb.EJB;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.primefaces.context.RequestContext;

import com.baz.commons.domain.CatUsuarios;
import com.baz.commons.util.ExcepcionSicrenet;
import com.baz.ejb.service.LoginService;
import com.baz.web.util.MostrarMensajesUtil;

@ManagedBean(name="login")
@SessionScoped
@ApplicationScoped
public class LoginMB implements Serializable {

	private static final long serialVersionUID = 1094801825228386363L;
	
	@EJB
	LoginService loginService;
	
	
	private String pwd;
	private String msg;
	private String user="";
	private String perfil;
	private String ruta;
	private String fullname;
	
	private String NuevoPwd;
	private String RepiteNuevoPwd;
	private boolean validateNuevo;
	private boolean validate;
	
	private CatUsuarios usuario;;


	//validate login
	public String validateUsernamePassword() throws ExcepcionSicrenet  {
		try{
			
		System.out.println("user:::"+user+"::::password::::"+pwd);
		validate = loginService.validate(user.trim(),pwd.trim());
//		validateNuevo = loginService.validateNuevo(user.trim(), pwd.trim());
//		if  (validateNuevo == true ){
//		
//			
//			  this.nuevoUsuarioDialog();
//			System.out.println("LoginMB:::ValidateUsernamePassword:::NuevoUsuario");
//			
//		}
//		else 
		if (validate == true ) {
			HttpSession session = SessionUtils.getSession();
			session.setAttribute("username", user);
			
			perfil = loginService.getUsers().getIdrol().getDescripcion();
			ruta = obtenerRuta();
			usuario = loginService.getUsers();
			session.setAttribute("Usuario",usuario);
			fullname = usuario.getNombre() 
					+ " " + usuario.getApaterno()
					+ " " + usuario.getAmaterno(); 
			
		
			
			this.agregarMonitorSesion();
			
			
			return "success";
		} 
		 
		 else {
			FacesContext.getCurrentInstance().addMessage(
					null,
					new FacesMessage(FacesMessage.SEVERITY_WARN,
							"Usuario ó Contraseña Incorrecta.",
							"Por favor Ingrese Correctamente Usuario y Contraseña."));
		
			return "login";
	}
	} catch (ExcepcionSicrenet e) {
		MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
	}
		return null;

	
		
	}
	
	public void nuevoUsuarioDialog() throws ExcepcionSicrenet{
		 
		RequestContext requestContext = RequestContext.getCurrentInstance();  
		  requestContext.execute("PF('dlgAc').show();");

		}
	
	
	public void agregarMonitorSesion() throws ExcepcionSicrenet{
		
		try {

		loginService.agregarMonitorSesion(user, getmeuIP());
			this.limpiar();
			
					
				} catch (ExcepcionSicrenet e) {
					MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
				}

		
	}
	
	
	
	
	
	public String getmeuIP() {
		   FacesContext context = FacesContext.getCurrentInstance();
	        HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();
	        
	        return request.getRemoteAddr();
	        
 }
	  
	
	

	//logout event, invalidate session
	public String logout() throws ExcepcionSicrenet {
		HttpSession session = SessionUtils.getSession();
		session.invalidate();
		this.cerrarSesionMonitor();
		validateNuevo = false;
		return "logout";
	}
	
	
	
public void cerrarSesionMonitor()  throws ExcepcionSicrenet{
		
		try {

			loginService.cerrarSesionMonitor(user);
				
						
					} catch (ExcepcionSicrenet e) {
						MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
					}

	}

	public void actualizarContrasenaNuevoUsuario()  throws ExcepcionSicrenet{
		

			if(NuevoPwd.equals(RepiteNuevoPwd)){
		
			usuario = loginService.getUsers();
			
			try {
			
			loginService.actualizarContrasenaNuevo(usuario.getIdPass().getIdPass(),RepiteNuevoPwd,1);
			
			System.out.println("contraseña1::::" + NuevoPwd); 
			System.out.println("contraseña2::::" + RepiteNuevoPwd);
			validateNuevo = false;
			
			usuario = loginService.getUsers();
		

			} catch (ExcepcionSicrenet e) {
				MostrarMensajesUtil.agregarMensaje(1, "Excepcion", e.getMessage());
				
				
			}
			
			}else{
			FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Contraseña", "Contraseña no Coincide."));
			}
		
	}
	
	public String obtenerRuta(){
//		 ServletContext servletContext = (ServletContext) FacesContext.getCurrentInstance().getExternalContext().getContext();
//		 String realPath=(String) servletContext.getRealPath("/");
		HttpServletRequest request = (HttpServletRequest) FacesContext.getCurrentInstance().getExternalContext().getRequest();
//		String realPath = request.getRequestURL().toString();
		String realPath = request.getRequestURI();
//		 FacesContext.getCurrentInstance().getExternalContext().getRealPath();
		 return realPath;
	}
	
	public void limpiar(){
		setNuevoPwd("");
		setRepiteNuevoPwd("");
		RequestContext requestContext = RequestContext.getCurrentInstance();  
		  requestContext.execute("PF('dlgAc').hide();");
	}
	
	public String getRuta() {
		return ruta;
	}

	public void setRuta(String ruta) {
		this.ruta = ruta;
	}

	public String getPerfil() {
		return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}
	
	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	
	public CatUsuarios getUsuario() {
		return usuario;
	}

	public void setUsuario(CatUsuarios usuario) {
		this.usuario = usuario;
	}

	public String getNuevoPwd() {
		return NuevoPwd;
	}

	public void setNuevoPwd(String nuevoPwd) {
		NuevoPwd = nuevoPwd;
	}

	public String getRepiteNuevoPwd() {
		return RepiteNuevoPwd;
	}

	public void setRepiteNuevoPwd(String repiteNuevoPwd) {
		RepiteNuevoPwd = repiteNuevoPwd;
	}

	public boolean isValidateNuevo() {
		return validateNuevo;
	}

	public void setValidateNuevo(boolean validateNuevo) {
		this.validateNuevo = validateNuevo;
	}

	public boolean isValidate() {
		return validate;
	}

	public void setValidate(boolean validate) {
		this.validate = validate;
	}
	
}