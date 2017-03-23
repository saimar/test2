package com.mx.bancoazteca.pld.web.controllers;



import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.mx.bancoazteca.pld.security.CustomAuthentication;
import com.mx.bancoazteca.pld.security.CustomAuthenticationProvider;



@Controller 
public class AutentificacionUsuario {

	private static final Logger LOG = LoggerFactory.getLogger(AutentificacionUsuario.class);
	
	@Autowired
	@Qualifier("customAuthenticationProvider")
	private CustomAuthenticationProvider customAuthenticationProvider;

	@RequestMapping(value = "/pldMessages", method = RequestMethod.GET )
	public ModelAndView  error() {
		LOG.info("@Controller /pldMessages");
		
		ModelAndView result = new ModelAndView("pldmessages");
		result.addObject("error", "Error PLD");
		result.addObject("mensaje", "Error en los permisos asignados");
		
		return result;	
	}
	
	
	@RequestMapping(value = "/accessDenied", method = RequestMethod.GET )
	public ModelAndView  pageNotFound(HttpServletRequest request, HttpServletResponse response) {
		LOG.info("@Controller accessDenied");

		ModelAndView result = new ModelAndView("accessDenied");		
		return result;	
	}
	
	@RequestMapping(value = "/autentificacionUsuario", method = RequestMethod.GET )
	public ModelAndView autentificacion(HttpServletRequest request, HttpServletResponse response)  {
		LOG.info("@Controller /app/autentificacionUsuario ");
		ModelAndView result = new ModelAndView();	
		try {
			String paramToken = request.getParameter("auth");
			LOG.info("Token Autentificacion usuario : "+paramToken);
			if (null != paramToken) {
				
				CustomAuthentication customAuthentication = new CustomAuthentication(paramToken,request.getRemoteHost(), request.getRemoteAddr());
				customAuthenticationProvider.authenticate(customAuthentication);
				result.setViewName("redirect:/admin");
				return result;//"redirect:/admin";
			} else {
				SecurityContextHolder.clearContext();
				LOG.info("@Controller :: AutentificacionUsuario :: Token no establecido");
				result.setViewName("pldmessages");
				result.addObject("error", "ERROR DE SESION");
				result.addObject("mensaje", "Token no establecido");
				return result;//"errorPld";	
			}
		} catch (BadCredentialsException e) {
			LOG.info("@Controller :: incidencia ::  BadCredentialsException ::errorPld");
			SecurityContextHolder.clearContext();			
			result.setViewName("pldmessages");
			result.addObject("error", "ERROR EN LAS CREDENCIALES DEL SISTEMA");
			result.addObject("mensaje",e.getMessage() );
			return result;//"errorPld";		
		}catch(ClassCastException e){
			LOG.info("@AutentificacionUsuario :: autentificacion :: ClassCastException {}", e.getMessage());
			result.setViewName("pldmessages");
			result.addObject("error", "Error en la conversión de datos");
			result.addObject("mensaje", e.getMessage());
			return result;//"errorPld";	
		}catch(IllegalArgumentException e){			
			LOG.info("@AutentificacionUsuario :: autentificacion :: IllegalArgumentException {}", e.getMessage());
			result.setViewName("pldmessages");
			result.addObject("error", "Argumento inválido");
			result.addObject("mensaje", e.getMessage());
			return result;//"errorPld";	
		}catch(IllegalStateException e){			
			LOG.info("@AutentificacionUsuario :: autentificacion :: IllegalStateException {}", e.getMessage());
			result.setViewName("pldmessages");
			result.addObject("error", "Estado inválido");
			result.addObject("mensaje", e.getMessage());
			return result;//"errorPld";	
		}catch(IndexOutOfBoundsException e){
			LOG.info("@AutentificacionUsuario :: autentificacion :: IndexOutOfBoundsException {}", e.getMessage());
			result.setViewName("pldmessages");
			result.addObject("error", "Indíce fuera de lugar");
			result.addObject("mensaje", e.getMessage());
			return result;//"errorPld";	
		}
		
	}
	
	
}
