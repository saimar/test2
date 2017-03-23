package com.mx.bancoazteca.pld.security;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

public class Usuario implements IUsuario {

	public static final long serialVersionUID = 9L;
	
	//private static final Logger LOG = LoggerFactory.getLogger(Usuario.class);
	
	private String usrLLaveMaestra = null;
	private String nombreCompleto = null;
	private String compania = null;
	private String mail = null;
	private String ipAsignada = null;
	private String numeroEmpleado = null;
	public String getUsrLLaveMaestra() {
		return usrLLaveMaestra;
	}

	public void setUsrLLaveMaestra(String usrLLaveMaestra) {
		this.usrLLaveMaestra = usrLLaveMaestra;
	}

	public String getNombreCompleto() {
		return nombreCompleto;
	}

	public void setNombreCompleto(String nombreCompleto) {
		this.nombreCompleto = nombreCompleto;
	}

	public String getCompania() {
		return compania;
	}

	public void setCompania(String compania) {
		this.compania = compania;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getIpAsignada() {
		return ipAsignada;
	}

	public void setIpAsignada(String ipAsignada) {
		this.ipAsignada = ipAsignada;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setNumeroEmpleado(String numeroEmpleado) {
		this.numeroEmpleado=numeroEmpleado;
	}

	public String getNumeroEmpleado() {
		return numeroEmpleado;
	}

	public void setNombre(String s) {
		// TODO Auto-generated method stub
		
	}

	public String getNombre() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setApPaterno(String s) {
		// TODO Auto-generated method stub
		
	}

	public String getApPaterno() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setApMaterno(String s) {
		// TODO Auto-generated method stub
		
	}

	public String getApMaterno() {
		// TODO Auto-generated method stub
		return null;
	}

	public void setApCasada(String s) {
		// TODO Auto-generated method stub
		
	}

	public String getApCasada() {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean credencialExpiro() {
		// TODO Auto-generated method stub
		return false;
	}

}
