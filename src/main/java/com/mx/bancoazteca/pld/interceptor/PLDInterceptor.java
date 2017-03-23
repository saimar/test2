package com.mx.bancoazteca.pld.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.mx.bancoazteca.pld.security.SpringSecurityUserContext;

public class PLDInterceptor implements HandlerInterceptor {

	@Autowired
	private SpringSecurityUserContext currentUser;
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
		return true;
	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView){
		
		if(currentUser.getCurrentUser()!=null){
			MDC.put("USER", currentUser.getCurrentUser().getNoEmpleado() );
		}else{
			MDC.put("USER", "000000" );
		}
	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex){
		

	}

}