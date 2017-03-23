package com.mx.bancoazteca.pld.security;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;

import mx.com.bancoazteca.utils.exceptions.PLDException;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

	private static final Logger LOG = LoggerFactory.getLogger(CustomAuthenticationProvider.class);

	
	private final CustomUserService customUserService;
	
	@Autowired
	public  CustomAuthenticationProvider(CustomUserService customUserService){
		this.customUserService=customUserService;
	}

	public Authentication authenticate(Authentication authentication) throws AuthenticationException,BadCredentialsException {
		//LOG.info("@Component CustomAuthenticationProvider.authenticate()");
		CustomAuthentication customAuthentication = (CustomAuthentication) authentication;
		CustomUser user=null;
		
			
		try {
			user = this.customUserService.loadUserByUsername(customAuthentication.getToken(),customAuthentication.getHostName(), customAuthentication.getIp());
		
		} catch (PLDException e) {		
			//e.printStackTrace();
			LOG.info("CustomAuthenticationProvider :: authenticate :: Error al generar la autenticación => {}",e.getMessage());
			throw new BadCredentialsException(e.getMessage());
		}
			
		
		authentication = new PreAuthenticatedAuthenticationToken(user, customAuthentication.getToken(), user.getAuthorities());
		authentication.setAuthenticated(true);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		//System.out.println("------------------------------>");
		return authentication;
	}

	public boolean supports(Class<?> arg0) {
		return true;
	}

}