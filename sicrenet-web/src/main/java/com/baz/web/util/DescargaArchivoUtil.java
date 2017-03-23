package com.baz.web.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import org.primefaces.model.DefaultStreamedContent;
import org.primefaces.model.StreamedContent;

public class DescargaArchivoUtil {
	
	public static StreamedContent obtenerArchivo(FacesContext fc, String url){
		        
		    StreamedContent file=new DefaultStreamedContent();
		    File fileTemp = new File(url);
		    InputStream input = null;
			try {
				input = new FileInputStream(fileTemp);
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			System.out.println("nombre del objeto archivo::::" + fileTemp.getName());
		    ExternalContext externalContext = fc.getExternalContext();
		    file = new DefaultStreamedContent(input, externalContext.getMimeType(fileTemp.getName()), fileTemp.getName());
		    System.out.println("PREP = " + file.getName());
		    return file;
		    }
	}

