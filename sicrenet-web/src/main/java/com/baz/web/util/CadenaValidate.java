package com.baz.web.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import javax.inject.Named;

@Named
@FacesValidator("validateCadena")
public class CadenaValidate implements Validator {
//
//	@Override
//	public void validate(FacesContext arg0, UIComponent arg1, Object arg2) throws ValidatorException {
//		final String input = "Marc Louie, Garduque Bautista";
//	    final Pattern pattern = Pattern.compile("^[a-zA-Z]+$");
//	    if (!pattern.matcher(input).matches()) {
//	    	MostrarMensajesUtil.agregarMensaje(1,"FORMATO.","No es un Formato de Cadena123123.");
//	    }
//		
//	    
//	    
//	    
//	    
//	
//	}
//	

	private static final String EMAIL_PATTERN = "^[A-Za-z]+$";

	private Pattern pattern;
	private Matcher matcher;

	public CadenaValidate(){
		  pattern = Pattern.compile(EMAIL_PATTERN);
	}

	@Override
	public void validate(FacesContext context, UIComponent component,
			Object value) throws ValidatorException {

		matcher = pattern.matcher(value.toString());
		if(!matcher.matches()){

			MostrarMensajesUtil.agregarMensaje(1,"FORMATO INCORRECTO.","Caracter No Valido.");

		}

	}

}
