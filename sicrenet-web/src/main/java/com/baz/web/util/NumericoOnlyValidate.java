package com.baz.web.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import javax.inject.Named;

@Named("validateOnlyNumerico")
@FacesValidator ("validateOnlyNumerico")
public class NumericoOnlyValidate implements Validator {

	
	
	private static final String EMAIL_PATTERN = "[0-9]{1,10}";

	private Pattern pattern;
	private Matcher matcher;

	public NumericoOnlyValidate(){
		  pattern = Pattern.compile(EMAIL_PATTERN);
	}

	@Override
	public void validate(FacesContext context, UIComponent component,
			Object value) throws ValidatorException {

		matcher = pattern.matcher(value.toString());
		if(!matcher.matches()){

			 MostrarMensajesUtil.agregarMensaje(1,"FORMATO INCORRECTO.","Caracter Solo Numerico.");
		}

	}

}
