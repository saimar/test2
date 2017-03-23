package com.baz.web.util;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import javax.inject.Named;

@Named
@FacesValidator ("validateNumerico")
public class NumericoValidate implements Validator {

	@Override
	public void validate(FacesContext arg0, UIComponent arg1, Object arg2) throws ValidatorException {
		 String s = String.valueOf(arg2);
		 if (!s.matches("\\d\\d\\d\\d\\d\\d")){
			 MostrarMensajesUtil.agregarMensaje(1,"FORMATO INCORRECTO.","Caracter Solo Numerico de 6 Digitos.");
				
			 }
	}
	

}
