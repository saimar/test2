package com.mx.bancoazteca.pld.web.rest;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.IOException;

import java.io.PrintWriter;
import java.net.URLConnection;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.util.FileCopyUtils;

import com.mx.bancoazteca.pld.jdbc.StoredProcedure;
import com.mx.bancoazteca.pld.jdbc.TableVO;
import com.mx.bancoazteca.pld.security.SpringSecurityUserContext;
import com.mx.bancoazteca.pld.util.IConstantesPLD;

@Controller
@RequestMapping(value = "/restDownload")
public class RestDownloadFile {
	 
	
	
	
	private static final Logger LOG = LoggerFactory.getLogger(RestDownloadFile.class);
	
	
	public static final String XLSX_MIME_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	public static final String PDF_MIME_TYPE = "application/pdf";
	public static final String XLS_MIME_TYPE = "application/vnd.ms-excel";
	
	//Layouts para cargas masivas
	private static final String PATH_EXCEL_USUARIO="/layoutFiles/layoutFiles/LayoutCargaUsuarios.xlsx";
	
	@Autowired
	StoredProcedure storedProcedure;
	@Autowired
	private SpringSecurityUserContext currentContext ;
	 @Autowired
	 private ServletContext servletContext;
	
	
	@RequestMapping(value = "/downloadExcelFile", method = RequestMethod.GET)
	public void downloadExcelFile(HttpServletResponse response,
			@RequestParam(value = "tipo", defaultValue = "") String tipo,//llave declarada en el TableContainer==> keyTable
			@RequestParam(value = "searchText", defaultValue = "") String searchText,
			@RequestParam(value = "titulo", defaultValue = "ConsultaPLD") String titulo)  throws IOException {

		LOG.info("@Rest :: RestDownloadFile :: downloadExcelFile : {}",titulo);
		
		TableVO table = null;
		
		//OutputStream outStream=null;
		PrintWriter out = null;
		
		try{
			table = currentContext.getCurrentContainer().getDataContainedFrom(tipo,searchText);
			
			if(table!=null){
			if (table.getState().getSuccess()) {
				
				response.setHeader("Expires", "0");
				response.setHeader("Cache-Control","must-revalidate, post-check=0, pre-check=0");
				response.setHeader("Pragma", "public");
				response.setContentType(XLS_MIME_TYPE+"; charset=UTF-8");
				response.setHeader("Content-disposition", "attachment;filename=ConsultaPLD.xls");
				response.setHeader("Pragma", "public");
				response.addHeader("Cache-Control", "post-check=0, pre-check=0,max-age=0");
				
		        out = response.getWriter();
				//out= new PrintWriter(System.out);
		        
		         out.print("<html>");
		         out.print("<body>");         
		         
		         out.print("<table>");
		         out.print("<tr><td></td></tr>");
		         out.print("<tr><td>");         
		         out.print("Seguros Azteca\n");
		         out.print("</td></tr>");
		        
		         out.print("<tr><td>");         
		         out.print("Prevencion de Lavado de Dinero\n");
		         out.print("</td></tr>");
		         
		         out.print("<tr style='background: #FFFFFF;color: #222222;	font: bold 15px tahoma;'><td>"); 
		         out.print(titulo);
		         out.print("</td></tr>");         
		         
//		         out.print("<tr><td>");         
//		         out.print(""+consulta.getTituloCompania()+"\n");
//		         out.print("</td></tr>");
		         
		        out.print("<tr><td></td></tr>");
		        out.print("<tr><td></td></tr>");
		        
		        out.print("</table>");

		         out.print("<table border='1'>");
		         out.print("<tr style='background: #203f5e;color: #FFFFFF;	font: bold 13px tahoma;'>");
		         
		         //Se contruyen las cabeceras de la tabla
		         for(String key : table.getResultset().get(0).keySet()){
		        	
		        	
		        	if(currentContext.getCurrentContainer().getModuleTools().get(sanitizeColumnName(key.toString()))!=null){
						int privilegio=(Integer)currentContext.getCurrentContainer().getModuleTools().get(sanitizeColumnName(key.toString()));
						if(privilegio!=0)
							out.print("<td nowrap='nowrap'>");
							out.print(key.toString());
							out.print("</td>");
		        	}else{
		        		out.print("<td nowrap='nowrap'>");
		        		out.print(key.toString());
		        		out.print("</td>");
		        	}
		        	
		         }
		         //Se construye la table con sus valores
		         int i=0;
		         for (Map<String, Object> map : table.getResultset()) {
		        	 i++;	
		        	 out.print("<tr style='FONT-WEIGHT:normal;FONT-SIZE: 12px;COLOR:#000000;FONT-FAMILY:Arial, Helvetica, sans-serif;background-color:#ffffff;'>");
						for (String key : map.keySet()) {
							String value = (map.get(key) != null ? map.get(key).toString() : " ");
							if(value.trim().equals("")){
								out.print("<td nowrap='nowrap'>");
								out.print(" ");
								out.print("</td>");
							}else{
								if(currentContext.getCurrentContainer().getModuleTools().get(sanitizeColumnName(key.toString()))!=null){
									int privilegio=(Integer)currentContext.getCurrentContainer().getModuleTools().get(sanitizeColumnName(key.toString()));
									if(privilegio!=0){
										out.print("<td nowrap='nowrap'>");
										out.print(value);
										out.print("</td>");
									}
										
					        	}else{
					        		out.print("<td nowrap='nowrap' style='mso-number-format:\"\\@\";'>");
					        		out.print(value);
					        		out.print("</td>");
					        	}
							}
						}
						 out.print("\n");
				            
				            if ((i % 1000) == 0) {
				               out.flush();// SE ESCRIBE EL CONTENIDO DEL ARCHIVO EN EL STREAM DE SALIDA
				               LOG.info("@Rest :: RestDownloadFile :: downloadExcelFile :: flushing "+i+" of "+table.getRowCount()+" registers");
				            }
				            out.print("</tr>");
						
					}
		         out.print("</table>");
			     out.print("</body>");
			     out.print("</html>");
			  
				
				
				// SE ESCRIBE EL CONTENIDO DEL ARCHIVO EN EL STREAM DE SALIDA
				//outStream = response.getOutputStream();
		        response.setStatus(HttpServletResponse.SC_OK);
				out.flush();
				out.close();
				return;  
				
			}else{
				if(table.getState().getStatuCode()==HttpStatus.BAD_REQUEST){
					LOG.error("@Rest :: RestDownloadFile :: downloadExcelFile :: NO HAY DATOS");
					response.sendError(HttpServletResponse.SC_BAD_REQUEST, "No hay datos en la consulta");
					return;
				}
				
				if(table.getState().getStatuCode()==HttpStatus.INTERNAL_SERVER_ERROR){
					LOG.error("@Rest :: RestDownloadFile :: downloadExcelFile :: Error en la consulta de la información a la BD");
					response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error en la consulta de la información a la BD");
					return;
				}
			}
			}else{
				LOG.error("@Rest :: RestDownloadFile :: downloadExcelFile :: Error en la aplicación");
				response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error en la aplicación");
				return;
			}
		}catch (DataAccessException e) {
			LOG.info(" @EXCEPTION :: "+this.getClass()+" :: Cause => {}", (e.getCause()==null)?"Error desconocido":e.getCause());
			LOG.error("@Rest :: RestDownloadFile :: downloadExcelFile :: SQLServerException");
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "SQLServerException");
			return;
		} catch (Exception e) {	
			
			
			LOG.info(" @EXCEPTION :: "+this.getClass()+" :: Cause => {}", (e.getCause()==null)?"Error desconocido":e.getCause());
			LOG.error("@Rest :: RestDownloadFile :: downloadExcelFile :: Error al generar el archivo excel");
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Server Error");
			return;
		} finally {
			if (out != null) {
				out.close();
			}			
		}
	}
	
	@RequestMapping(value = "/downloadLayoutFile/{layout}", method = RequestMethod.GET)
	public void downloadLayotFile(HttpServletRequest request,HttpServletResponse response,@PathVariable("layout") String layout) throws IOException{

		LOG.info("@Rest :: downloadLayotFile :: downloadExcelFile : {}",layout);
	
		try{
			File file = null;
			
			ClassLoader classloader = Thread.currentThread().getContextClassLoader();
						
			if(layout.equalsIgnoreCase(IConstantesPLD.LAYOUT_CARGA_USUARIOS)){
				file = new File(classloader.getResource(PATH_EXCEL_USUARIO).getFile());
			}
		
			
			if(!file.exists() || file==null){
	        	LOG.info("@Rest :: downloadLayotFile :: downloadExcelFile :  El archivo del layout {} no fue encontrado",layout);
	        	response.sendError(HttpServletResponse.SC_NOT_FOUND, "El archivo del layout no fue encontrado");
	            return;
	        }else{
	        	String mimeType= URLConnection.guessContentTypeFromName(file.getName());
	            if(mimeType==null){
	                System.out.println("mimetype is not detectable, will take default");
	                mimeType = "application/octet-stream";
	            }
	            LOG.info("@Rest :: downloadLayotFile :: downloadExcelFile :. mimetype => {}",mimeType);
	             
	            response.setContentType(mimeType);
	             
	            /* "Content-Disposition : inline" will show viewable types [like images/text/pdf/anything viewable by browser] right on browser 
	                while others(zip e.g) will be directly downloaded [may provide save as popup, based on your browser setting.]*/
	            response.setHeader("Content-Disposition", String.format("inline; filename=\"" + file.getName() +"\""));
	     
	             
	            /* "Content-Disposition : attachment" will be directly download, may provide save as popup, based on your browser setting*/
	            //response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
	             
	            response.setContentLength((int)file.length());
	     
	            InputStream inputStream = new BufferedInputStream(new FileInputStream(file));
	            //Copy bytes from source to destination(outputstream in this example), closes both streams.
	            FileCopyUtils.copy(inputStream, response.getOutputStream());
	            
	            response.setStatus(HttpServletResponse.SC_OK);
	        }
			
			return;
		}catch (Exception e) {	
			e.printStackTrace();
			LOG.info(" @EXCEPTION :: "+this.getClass()+" :: Cause => {}", (e.getCause()==null)?"Error desconocido":e.getCause());
			LOG.error("@Rest :: downloadLayotFile :: downloadExcelFile :: Error en la descarga del layout {}.",layout);
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error en la descarga del layout"+layout);
			return;
		} 		
		
	}
	
	protected String sanitizeColumnName(String value) {
		value = value.trim().replace(" ", "");
		value = value.trim().replace("á", "a");
		value = value.trim().replace("é", "e");
		value = value.trim().replace("í", "i");
		value = value.trim().replace("ó", "o");
		value = value.trim().replace("ú", "u");
		value = value.trim().replace("Á", "a");
		value = value.trim().replace("É", "e");
		value = value.trim().replace("Í", "i");
		value = value.trim().replace("Ó", "o");
		value = value.trim().replace("Ú", "u");
		value = value.trim().replace("Ñ", "n");
		value = value.trim().replace("ñ", "n");
		value = value.trim().replace("-", "");
		value = value.trim().replace("/", "");
		value = value.trim().replace("_", "");
		value = value.trim().replace("@", "");
		value = value.trim().replace("#", "");
		value = value.trim().replace("%", "");
		value = value.trim().replace("=", "");
		value = value.trim().replace("?", "");
		value = value.trim().replace("¿", "");
		value = value.trim().replace(".", "");
		value = value.trim().replace(",", "");
		value = value.trim().replace("(", "");
		value = value.trim().replace(")", "");

		return value;
	}
}
