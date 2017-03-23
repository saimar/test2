package com.baz.web.util;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import javax.inject.Named;

@Named
@FacesValidator ("miValidador")
public class MiValidador implements Validator{

    public void validate(FacesContext arg0, UIComponent arg1, Object arg2)
    		 throws ValidatorException {
        if (!(arg2 instanceof Integer)) {
            throw new ValidatorException(new FacesMessage("Debe ser un entero"));
        }

        int valor = (Integer) arg2;

        if ((valor < -6) || (valor > 6)) {
            throw new ValidatorException(new FacesMessage(
                    "Debe estar entre -6 y 6"));
        }
    }
    
    
   
    }
