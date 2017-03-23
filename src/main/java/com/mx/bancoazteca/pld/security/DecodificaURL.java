package com.mx.bancoazteca.pld.security;

import java.io.IOException;
import java.io.StringReader;
import java.io.UnsupportedEncodingException;

import org.apache.commons.codec.binary.Base64;
import org.apache.xpath.XPathAPI;
import org.w3c.dom.Node;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import mx.com.bancoazteca.utils.exceptions.PLDException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.TransformerException;

public final class DecodificaURL {
	private DecodificaURL() {

	}

	public static final IUsuario decodifica(String token) throws PLDException 
			//throws InfoParametroURLInvalidoException 
	{
		
		IUsuario usuario= new Usuario();
		
		try {
			
			
			
			//System.out.println("a)--:["+token+"]");
			//String xmlURLDecoder = URLDecoder.decode(token, "UTF8");
			String xmlURLDecoder = token;
			byte xmlDecodeBuffer[] = Base64.decodeBase64(xmlURLDecoder);
			//System.out.println("b)--:["+xmlDecodeBuffer+"]");
			
			String xmlDecodeBufferEnString = new String(xmlDecodeBuffer, "windows-1252");
			//System.out.println("c)--:["+xmlDecodeBufferEnString+"]");

			String xmlString = xmlDecodeBufferEnString.replace("?".charAt(0), ">".charAt(0));
			
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			
			factory.setValidating(true);
			factory.setFeature("http://xml.org/sax/features/validation", false);
			
			factory.setFeature("http://javax.xml.XMLConstants/feature/secure-processing",true);
			
			factory.setFeature("http://xml.org/sax/features/external-general-entities",false);
			factory.setFeature("http://xml.org/sax/features/external-parameter-entities",false);
			factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl",true);
			
			
			
			DocumentBuilder builder = factory.newDocumentBuilder();
			
			
			
			org.w3c.dom.Document document = builder.parse(new InputSource(new StringReader(xmlString)));
			
			//DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			//dbf.setExpandEntityReferences(false);
			//DocumentBuilder db = dbf.newDocumentBuilder();
			//Document document = db.parse(xmlString);		       
			//Model model = (Model) u.unmarshal(documentt);
			
			//--LLave Maestra
			usuario.setUsrLLaveMaestra( value(document,"/users/user/@http_impersonate"));
			//--Nombre
			usuario.setNombreCompleto(value(document,"/users/user/@http_nombre"));
			//--apellidos
			//usuario.setNombreCompleto(value(document,"/users/user/@http_apellidos"));
			//--Compania
			usuario.setCompania(value(document,"/users/user/@http_compania"));
			//--Numero empleado
			usuario.setNumeroEmpleado(value(document,"/users/user/@http_numerodeempleado"));
			//--Mail
			usuario.setMail(value(document,"/users/user/@http_mail"));
			
			

		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			throw new PLDException(e.getMessage());
		} catch (SAXException e) {
			//e.printStackTrace();
			// TODO Auto-generated catch block
			//System.out.println("------------------------>"+e.getMessage());
			throw new PLDException(e.getMessage());
		} catch (IOException e) {
			//e.printStackTrace();
			// TODO Auto-generated catch block
			
			throw new PLDException(e.getMessage());
		} catch (ParserConfigurationException e) {
			//e.printStackTrace();
			// TODO Auto-generated catch block
			
			throw new PLDException( e.getMessage());
		} catch (TransformerException e) {
			//e.printStackTrace();
			// TODO Auto-generated catch block
			
			throw new PLDException(e.getMessage());
		}
		return usuario;			
	}
	
	private static String value(org.w3c.dom.Document document,String expresion) throws TransformerException{
		
		Node node = XPathAPI.selectSingleNode(document, expresion);
		
		return node.getNodeValue();
		
		
	}

}
