package com.mx.bancoazteca.pld.util;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Calendar;

import com.mx.bancoazteca.pld.security.IUsuario;



public final class GeneraIdentificador
{
  @SuppressWarnings("restriction")
public static final String generar(IUsuario user)
  {	
	  int value;
	  SecureRandom random;
		try {
			// Create a secure random number generator using the SHA1PRNG algorithm
			random = SecureRandom.getInstance("SHA1PRNG");
			value = random.nextInt();
			
		} catch (NoSuchAlgorithmException e) {
			//e.printStackTrace();

			sun.security.provider.SecureRandom r = new sun.security.provider.SecureRandom();
			byte [] b = new byte[4];
			r.engineNextBytes(b);
			value = ((0xFF & b[0]) << 24) | ((0xFF & b[1]) << 16) |
		            ((0xFF & b[2]) << 8) | (0xFF & b[3]);
		}
    
    
    int idAleatorio = Math.abs(value);
    String idCompuesto = user.getNumeroEmpleado().toUpperCase() + idAleatorio;
    return idCompuesto.trim();
  }
  
  public static final String porTiempo(IUsuario user)
  {
    Calendar cal = Calendar.getInstance();
    long timeID = cal.getTimeInMillis();
    String idCompuesto = user.getNumeroEmpleado().toUpperCase() + timeID;
    return idCompuesto.trim();
  }
}
