package com.mx.bancoazteca.pld.web.controllers;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mx.bancoazteca.pld.security.SpringSecurityUserContext;

@Controller
public class DefaultController {

	private static final Logger LOG = LoggerFactory.getLogger(DefaultController.class);
	

	@Autowired
	private SpringSecurityUserContext currentUser;

	@RequestMapping("/")
	public String welcome() {
		LOG.info("@mapping    --> /");
		return "index";
	}
	
	@RequestMapping("/monitoreo")
	public String monitoreo() {
		LOG.info("@mapping    --> /");
		return "monitoreo";
	}
	
	@RequestMapping("/endSesion")
	public String endSesion() {
		LOG.info("@mapping   --> Sesión invalida  ");
		return "endSession";
	}
	
	@RequestMapping("/pageNotFound")
	public ModelAndView pageNotFound(HttpServletRequest request, HttpServletResponse response) {
		//System.out.println(request.getParameter("message"));
		LOG.info("@mapping   --> Pagina no encontrada");
		
		ModelAndView result = new ModelAndView("pageNotFound");
	
		LOG.info("/ pageNotFound --> Message:"+request.getParameter("message"));
		result.addObject("error", request.getParameter("message"));
		result.addObject("mensaje", "La pagina no se encuentra ");
		
		return result;
	}

	@RequestMapping("/admin")
	public ModelAndView admin() {
		LOG.info("@mapping   --> /admin  ");
//		ModelAndView result = new ModelAndView("index");
		ModelAndView result = new ModelAndView();
		
		//System.out.println(currentUser);
		//System.out.println(currentUser.getCurrentUser());
		
		if(currentUser==null  ){
			result.setViewName("endSession");
			result.addObject("error", "ERROR DE SESION ");
			result.addObject("mensaje", "No has iniciado sesion o tu sesion ha caducado");
		}
		else if (currentUser.getCurrentUser()==null){
			result.setViewName("endSession");
			result.addObject("error", "SESION ");
			result.addObject("mensaje", "No has iniciado sesion o tu sesion ha caducado");
			
		}else{
			result.setViewName("index");
		result.addObject("currentUser", currentUser.getCurrentUser());
		result.addObject("modules", currentUser.getCurrentUser().getCredential().getModules());
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		Calendar cal = Calendar.getInstance();
		String iddate=dateFormat.format(cal.getTime());
		//System.out.println(iddate); //2014/08/06 16:00:22
		
		result.addObject("version",iddate );
		}
		return result;
	}

	
	@RequestMapping(value = "/salir")
	public ModelAndView salir(HttpServletRequest request, HttpServletResponse response) {
		LOG.info("@mapping   --> /salir  ");

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		 
		if (authentication != null) {
			new SecurityContextLogoutHandler().logout(request, response, authentication);
		}else{
			
		}
		
		ModelAndView result = new ModelAndView("salir");
		return result;
	}
	
	
}
