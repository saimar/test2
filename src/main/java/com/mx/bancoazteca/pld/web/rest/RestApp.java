package com.mx.bancoazteca.pld.web.rest;


import java.util.HashMap;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.mx.bancoazteca.pld.jdbc.ParentVO;
import com.mx.bancoazteca.pld.jdbc.StoredProcedure;
import com.mx.bancoazteca.pld.jdbc.TableVO;
import com.mx.bancoazteca.pld.security.ApplicationModule;
import com.mx.bancoazteca.pld.security.ApplicationTool;
import com.mx.bancoazteca.pld.security.CustomUser;
import com.mx.bancoazteca.pld.security.SpringSecurityUserContext;
import com.mx.bancoazteca.pld.table.manager.PaginationParams;
import com.mx.bancoazteca.pld.table.manager.TableContainer;

@Controller
public class RestApp {
	
	private static final Logger LOG = LoggerFactory.getLogger(RestApp.class);
	
	@Autowired
	StoredProcedure storedProcedure;
	

	@Autowired
	private SpringSecurityUserContext contextUser;
	
	@RequestMapping(value = "/restSession")
	public ResponseEntity<CustomUser> session(){
		CustomUser customUser = contextUser.getCurrentUser();
		if(customUser!=null){
			return new ResponseEntity<CustomUser>(customUser,HttpStatus.OK);
		}else{
			return new ResponseEntity<CustomUser>(customUser,HttpStatus.UNAUTHORIZED);
		} 
	}
	
	@RequestMapping(value = "/actualizaModuloActivo", method = RequestMethod.GET)
	public ResponseEntity<Map<String,Object>> ActualizaModuloActivo(@RequestParam(value = "idModuloActual", defaultValue = "0") String idModulo) {
		
		Map<String,Object> response=new HashMap<String, Object>();
	
		LOG.info("@Rest :: RestApp :: ActualizaModuloActivo :: idModulo :: {}",idModulo);
	
		try{
			CustomUser customUser = contextUser.getCurrentUser();
			TableContainer tableContainer = contextUser.getCurrentContainer();
			//System.out.println("Seteando IdMoulo:::"+idModulo);
			
			if(!idModulo.equalsIgnoreCase("0")){
				customUser.setIdModuloActual(new Integer(idModulo));
				tableContainer.getModuleTools().clear();
				}
			
			
			if(customUser.getCredential()!=null && customUser.getCredential().getTreeModule()!=null)
			for(ApplicationModule module:customUser.getCredential().getTreeModule()){
				if(module.getChildren()!=null)
				for(ApplicationModule module1:module.getChildren()){
					if(module1.getChildren()!=null)
					for(ApplicationModule module2:module1.getChildren()){					
						if(module2.getIdModule()==customUser.getIdModuloActual()){
							
							
							Map<String,String> pageHeader=new HashMap<String, String>();
							pageHeader.put("icon",module2.getImage().trim());
							pageHeader.put("title", module1.getDescription().trim());
							pageHeader.put("subtitle",module2.getDescription().trim());
							pageHeader.put("mapping", module2.getMapping().trim());
							
							for(ApplicationTool tools:module2.getTools()){
								//LOG.info("Setting tool: "+tools.getTool()+", privilege:"+tools.getPrivilege());
								tableContainer.getModuleTools().put(tools.getTool(),tools.getPrivilege());
							}
							
							response.put("pageTitle",module1.getDescription().trim());//encabezado navegador
							response.put("pageHeader",pageHeader);//encabezado vista
							response.put("tools",tableContainer.getModuleTools());//tools asignadas
							
							break;	
						}	
					}	
				}
			}
			if(customUser.getIdModuloActual()!=0){
				return  new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
			}else{
				response.put("message", "Modulo no encontrado");
				return  new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
			}
			
			
		}catch(RuntimeException e){
			LOG.info("@Rest :: RestModuloConsultas :: actualizaModuloActivo :: ClassCastException {}", e.getMessage());
			ParentVO error=new ParentVO();
			error.getState().enabledErrorApp();
			error.getState().setMessage(e.getCause().toString());
			error.getMessage().setInfo(e.getMessage());
			response.put("state",error.getState());
			response.put("message", error.getMessage());
			
			return  new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		
	}
	
	@RequestMapping(value="/dataFromContainer/{keyName}",method=RequestMethod.POST)
	public ResponseEntity<TableVO> getDataBykeyName(@RequestBody PaginationParams params,@PathVariable("keyName") String keyName) {

		LOG.info("@Rest :: RestApp :: getDataBykeyName :: {} ",keyName);
		LOG.info("@Rest :: RestApp :: getDataBykeyName :: PaginationParams :: {}",params);
		
		TableVO table = null;
		
		try{
			TableContainer container=contextUser.getCurrentContainer();
			table=container.getDataByKeyName(keyName, params);
			
		}catch(Exception e){
			
			LOG.info("@Rest :: RestApp :: getDataBykeyName :: Exception :  {} ", e.getMessage());
			table=new TableVO();	
			table.getState().enabledErrorApp();
			table.getState().setMessage("Error interno del servidor, se generó una excepción");
			table.getMessage().setInfo(e.getMessage());
			return new ResponseEntity<TableVO>(table, table.getState().getStatuCode());
		}
		return new ResponseEntity<TableVO>(table, table.getState().getStatuCode());
	}
	
	@RequestMapping(value="/limpiaDatosContenedor",method=RequestMethod.GET)
	public void cleanContainer() {

		LOG.info("@Rest :: RestApp :: CleanContainer");
		contextUser.getCurrentContainer().cleanContainer();
	}
	
}
