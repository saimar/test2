package com.mx.bancoazteca.pld.security;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

public class CustomAuthentication implements Authentication {

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String token;
	private String hostName;
	private String ip;
    
	public CustomAuthentication(String token,String hostName,String ip) {
        this.token = token;
        this.hostName = hostName;
        this.ip = ip;
    }

	
	public String getName() {
		// TODO Auto-generated method stub
		return null;
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		SimpleGrantedAuthority rol = new SimpleGrantedAuthority("ROLE_USER");
		Collection<SimpleGrantedAuthority> collection = new ArrayList<SimpleGrantedAuthority>();
		collection.add(rol);
		return collection;
	}

	public Object getCredentials() {
		return token;
	}

	public Object getDetails() {
		// TODO Auto-generated method stub
		return null;
	}

	public Object getPrincipal() {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean isAuthenticated() {
		// TODO Auto-generated method stub
		return false;
	}

	public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
		// TODO Auto-generated method stub

	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	public String getHostName() {
		return hostName;
	}

	public void setHostName(String hostName) {
		this.hostName = hostName;
	}
	
	public String getIp() {
		return ip;
	}

}
