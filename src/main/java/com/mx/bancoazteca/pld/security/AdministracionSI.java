package com.mx.bancoazteca.pld.security;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import mx.com.bancoazteca.utils.exceptions.PLDException;






@Service
public class AdministracionSI {

	//private static final Logger LOG = LoggerFactory.getLogger(AdministracionSI.class);
	
	public AdministracionSI(){
		//LOG.info("@Service AdministracionSI()");
	}
	public IUsuario decodificaURL(String token) throws PLDException{
		//LOG.info("@Service AdministracionSI.decodificaURL()");

	        if(token == null || "null".equalsIgnoreCase(token) || "".equals(token))
	        {
	           // throw new InfoParametroURLInvalidoException("El parametro de autorizacion enviado por la URL es invalido. Por favor inicie sesion nuevamente.");
	        	throw new PLDException("El parametro de autorizacion enviado por la URL es invalido"); //PldException("PLD002", "El parametro de autorizacion enviado por la URL es invalido");
	        } else
	        {
	            IUsuario usr = DecodificaURL.decodifica(token);
	            return usr;
	        }
	    }
    
}
