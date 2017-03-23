/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mx.bancoazteca.pld.util;

import java.util.Calendar;
import java.util.GregorianCalendar;

import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;


import mx.com.bancoazteca.utils.fechas.Fechas;

/**
 *
 * @author b820694
 */
public class HerramientasPLD {
	
	
	public static String formateaUtf8ToISO(String valor){
		
		byte[] latin1 = null;
		
		byte[] utf8 = valor.getBytes();
		try {
			latin1 = new String(utf8, "UTF-8").getBytes("ISO-8859-1");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return new String(latin1);
		
		
	};

    public static String formatearFecha_ddMMMyyyy(String valor) {
        String fecha = null;

        if (valor.length() >= 10) {
            fecha = Fechas.formatear(valor, "dd/MM/yyyy");
        } else {
            fecha = valor;
        }

        return fecha;
    }

    public static String generaID() {
        
        Calendar c = new GregorianCalendar();
        
        String dia = Integer.toString(c.get(Calendar.DATE));
        String mes = Integer.toString(c.get(Calendar.MONTH));
        String anio = Integer.toString(c.get(Calendar.YEAR));
        String min = Integer.toString(c.get(Calendar.MINUTE));
        String seg = Integer.toString(c.get(Calendar.SECOND));
        
        dia = dia.length() == 1 ? "0"+dia : dia;
        mes = mes.length() == 1 ? "0"+mes : mes;
        min = min.length() == 1 ? "0"+min : min;
        seg = seg.length() == 1 ? "0"+seg : seg;
        
        String id = dia+mes+anio+min+seg;
        
        return id;
    }
    
     public static String validatesCrossSiteScripting(String value){
        String replaceValue = value;
         replaceValue = replaceValue.replace(">", "");
         replaceValue = replaceValue.replace("<", "");
         replaceValue = replaceValue.replace("\"", "");
         replaceValue = replaceValue.replace("'", "");
         replaceValue = replaceValue.replace("%", "");         
         return replaceValue;
     }
}
