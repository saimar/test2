package com.baz.web.util;
import static com.baz.commons.util.ConstantUtil.ESTATUS_GRIS;
import static com.baz.commons.util.ConstantUtil.ESTATUS_AMARILLO;
import static com.baz.commons.util.ConstantUtil.ESTATUS_ROJO;
import static com.baz.commons.util.ConstantUtil.ESTATUS_NARANJA;
import static com.baz.commons.util.ConstantUtil.ESTATUS_VERDE;
import static com.baz.commons.util.ConstantUtil.ESTATUS_AZUL;
import static com.baz.commons.util.ConstantUtil.ESTATUS_MORADO;
import static com.baz.commons.util.ConstantUtil.ESTATUS_BLANCO;
import static com.baz.commons.util.ConstantUtil.ESTATUS_NEGRO;

public class StyleUtil {
	public static String getStyle(String styleClass) {
		String estatus = null;
		styleClass.trim();
		switch (styleClass) {
		
		case "EstatusGris":
			estatus =  ESTATUS_GRIS;
			break;
		case "EstatusAmarillo":
			estatus =  ESTATUS_AMARILLO;
			break;
		case "EstatusRojo":
			estatus =  ESTATUS_ROJO;
			break;
		case "EstatusNaranja":
			estatus =  ESTATUS_NARANJA;
			break;
		case "EstatusVerde":
			estatus =  ESTATUS_VERDE;
			break;
		case "EstatusAzul":
			estatus =  ESTATUS_AZUL;
			break;
		case "EstatusMorado":
			estatus =  ESTATUS_MORADO;
			break;
		case "EstatusBlanco":
			estatus =  ESTATUS_BLANCO;
			break;
		case "EstatusNegro":
			estatus =  ESTATUS_NEGRO;
			break;
			
		default:
			estatus =  ESTATUS_BLANCO;
			break;
		}
		return estatus;
	}
}
