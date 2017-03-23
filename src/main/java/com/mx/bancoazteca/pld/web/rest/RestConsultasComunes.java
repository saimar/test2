package com.mx.bancoazteca.pld.web.rest;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.mx.bancoazteca.pld.jdbc.*;
import com.mx.bancoazteca.pld.security.ApplicationModule;
import com.mx.bancoazteca.pld.security.CustomUser;
import com.mx.bancoazteca.pld.security.SpringSecurityUserContext;

@Controller
@RequestMapping(value = "/restConsultasComunes")
public class RestConsultasComunes {

private static final Logger LOG = LoggerFactory.getLogger(RestConsultasComunes.class);
@Autowired
StoredProcedure storedProcedure;

@Autowired
private SpringSecurityUserContext contextUser;


@RequestMapping(value="/consulta/parametrosSP",method=RequestMethod.GET)
public ResponseEntity<TableVO> ConsultaParametrosSP(
	@RequestParam(value="idParametro", defaultValue="") String idParametro,
	@RequestParam(value="pldsystem", defaultValue="") String pldsystem) {
	LOG.info("@Rest :: RestModuloComunes :: ConsultaParametrosSP");	
	//Store Procedure: REM_ConsultaParametrosSP
		TableVO  table=new TableVO();
		
		System.out.println("idParametro:::"+idParametro+" system:"+pldsystem);
		if(idParametro==null || idParametro.isEmpty()){
			System.out.println("entra en 1");
			Map mapa=new HashMap();
			try{
				CustomUser customUser = contextUser.getCurrentUser();
				if(customUser.getCredential()!=null && customUser.getCredential().getTreeModule()!=null)
				for(ApplicationModule module:customUser.getCredential().getTreeModule()){
					if(module.getChildren()!=null)
					for(ApplicationModule module1:module.getChildren()){
						if(module1.getChildren()!=null)
						for(ApplicationModule module2:module1.getChildren()){					
							if(module2.getIdModule()==customUser.getIdModuloActual()){
								mapa.put("regla", module2.getDescription().trim());
								mapa.put("descripcion", "");
								break;	
							}	
						}	
					}
				}
			}catch(ClassCastException e){
				LOG.info("@Rest :: RestModuloConsultas :: actualizaModuloActivo :: ClassCastException {}", e.getMessage());
			}catch(IllegalArgumentException e){			
				LOG.info("@Rest :: RestModuloConsultas :: actualizaModuloActivo :: IllegalArgumentException {}", e.getMessage());
			}catch(IndexOutOfBoundsException e){			
				LOG.info("@Rest :: RestModuloConsultas :: actualizaModuloActivo :: IndexOutOfBoundsException {}", e.getMessage());
			}
			
			List<Map<String, Object>> resultset=new ArrayList();
			resultset.add(mapa);
			table=new TableVO(resultset);
			table.getState().setStatuCode(HttpStatus.OK);
			table.buildJson();
		}else{			
			try{
				
				SqlParameterSource  inParamMap = new MapSqlParameterSource()
				.addValue("idParametro" , idParametro);
				if("SGV".equalsIgnoreCase(pldsystem))
					table=storedProcedure.queryForTableVO( ISentenciasSQL.STP_CONSULTA_PARAMETROS_VIDA, inParamMap);
				else if("SGD".equalsIgnoreCase(pldsystem))
					table=storedProcedure.queryForTableVO( ISentenciasSQL.STP_CONSULTA_PARAMETROS_DANIOS, inParamMap);
				
				if(table.getState().getSuccess() ) {
					table.buildJson();
				}
				
				}catch(ClassCastException e){
					table = new TableVO();
					table.getState().enabledErrorApp();
					table.getState().setMessage(e.getCause().getMessage());
					table.getState().setMessage("Error interno del servidor. No es posible convertir valor.");
					LOG.info("@Rest :: RestModuloComunes :: ConsultaParametrosSP :: ClassCastException {}", e.getMessage());
				}catch(IllegalArgumentException e){
					table = new TableVO();
					table.getState().enabledErrorApp();
					table.getState().setMessage(e.getCause().getMessage());
					table.getState().setMessage("Error interno del servidor.Argumento invalido.");
					LOG.info("@Rest :: RestModuloComunes :: ConsultaParametrosSP :: IllegalArgumentException {}", e.getMessage());
				}	
		}
		
		return new ResponseEntity<TableVO>(table, table.getState().getStatuCode());
}



}