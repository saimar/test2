package com.baz.web.util;

import java.util.Iterator;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

/**
 * Clase util lanza los mensajes de excepcion a la pantalla.
 * @author B196785
 */
public class MostrarMensajesUtil {
    
     public static void agregarMensaje
                           (int tipoMensaje, String mensaje, String detalleMsj){
        FacesMessage.Severity severity;

        switch (tipoMensaje) {
            case 1:
                severity = FacesMessage.SEVERITY_ERROR;
                break;
            case 2:
                severity = FacesMessage.SEVERITY_FATAL;
                break;
            case 3:
                severity = FacesMessage.SEVERITY_WARN;
                break;
            default:
                severity = FacesMessage.SEVERITY_INFO;
                break;
        }

        Iterator<FacesMessage> faceMessages = 
                FacesContext.getCurrentInstance().getMessages();
        boolean messageExist = false;
        while (faceMessages.hasNext()) {
            FacesMessage facesMsg = faceMessages.next();
            if (severity == facesMsg.getSeverity() &&
                            mensaje.equals(facesMsg.getSummary()) &&
                            detalleMsj.equals(facesMsg.getDetail())) {
                messageExist = true;
                break;
            }
        }
        if (!messageExist) {
            FacesContext.getCurrentInstance()
                    .addMessage(null, new FacesMessage(
                            severity, mensaje, detalleMsj));
        }
        
    }
    
}
