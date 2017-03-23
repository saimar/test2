package com.mx.bancoazteca.pld.web.rest.appA;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


import com.mx.bancoazteca.pld.jdbc.ISentenciasSQL;
import com.mx.bancoazteca.pld.jdbc.ParentVO;
import com.mx.bancoazteca.pld.jdbc.StoredProcedure;
import com.mx.bancoazteca.pld.jdbc.TableVO;
import com.mx.bancoazteca.pld.security.SpringSecurityUserContext;
import com.mx.bancoazteca.pld.table.manager.ParamNotFoundException;
import com.mx.bancoazteca.pld.table.manager.TableContainer;
import com.mx.bancoazteca.pld.web.rest.model.PldParams;

@Controller
@RequestMapping(value="/RestAppAModuloMonitoreo" )
public class RestAppAModuloMonitoreo {

	private static final Logger LOG = LoggerFactory.getLogger(RestAppAModuloMonitoreo.class);
	@Autowired
	StoredProcedure storedProcedure;
	@Autowired
	private SpringSecurityUserContext contextUser;
													   
@RequestMapping(value="/consulta/operacionesRelevantes",method=RequestMethod.POST)
	public ResponseEntity<ParentVO> consultaoperacionesRelevantes(@Valid @RequestBody PldParams params) {
		//SP: SEGD_ConsultaOperacionesRelevantes
		LOG.info("@Rest :: RestAppAModuloMonitoreo :: consultaoperacionesRelevantes :: {}",params);
		ParentVO result=new ParentVO();
	TableContainer container=contextUser.getCurrentContainer();
		try{
		SqlParameterSource inParamMap = new MapSqlParameterSource()
			.addValue("mes" , Integer.parseInt(params.getParam("mes")))
			.addValue("año" , Integer.parseInt(params.getParam("anio")));

		TableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.SEGD_OPERRELEVANTES, inParamMap);
		container.loadDataToContainer(params.getKeyTable(), table);
		result.setState(table.getState());
		result.setMessage(table.getMessage());
		}catch(ParamNotFoundException e){
		  LOG.info("@Rest :: RestAppAModuloMonitoreo :: consultaoperacionesRelevantes :: ParamNotFoudException :  {} ", e.getMessage());
		  result.getState().enabledErrorApp();
		  result.getState().setMessage("Parámetro inválido.");
		  result.getMessage().setInfo(e.getMsgException());
		}catch(Exception e){
		  LOG.info("@Rest :: RestAppAModuloMonitoreo :: consultaoperacionesRelevantes :: Exception :  {} ", e.getMessage());
		  result.getState().enabledErrorApp();
		  result.getState().setMessage("Error interno del servidor, se generó una excepción");
		  result.getMessage().setInfo(e.getMessage());
		}
		return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

}

@RequestMapping(value="/detalle/operacionesRelevantes",method=RequestMethod.POST)
public ResponseEntity<ParentVO> detalleoperacionesRelevantes(@Valid @RequestBody PldParams params) {
	//SP: SEGD_ConsultaOperacionesRelevantesDetalle
	LOG.info("@Rest :: RestAppAModuloMonitoreo :: detalleoperacionesRelevantes :: {}",params);
	ParentVO result=new ParentVO();
	TableContainer container=contextUser.getCurrentContainer();
	try{
	SqlParameterSource inParamMap = new MapSqlParameterSource()
		.addValue("idAlarma" , Integer.parseInt(params.getParam("idalarma")));

	TableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.SEGD_OPERRELEVANTES_DET, inParamMap);
	container.loadDataToContainer(params.getKeyTable(), table);
	result.setState(table.getState());
	result.setMessage(table.getMessage());
	}catch(ParamNotFoundException e){
	  LOG.info("@Rest :: RestAppAModuloMonitoreo :: detalleoperacionesRelevantes :: ParamNotFoudException :  {} ", e.getMessage());
	  result.getState().enabledErrorApp();
	  result.getState().setMessage("Parámetro inválido.");
	  result.getMessage().setInfo(e.getMsgException());
	}catch(Exception e){
	  LOG.info("@Rest :: RestAppAModuloMonitoreo :: detalleoperacionesRelevantes :: Exception :  {} ", e.getMessage());
	  result.getState().enabledErrorApp();
	  result.getState().setMessage("Error interno del servidor, se generó una excepción");
	  result.getMessage().setInfo(e.getMessage());
	}
	return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

}


@RequestMapping(value="/consulta/parametros",method=RequestMethod.POST)
public ResponseEntity<ParentVO> consultaparametros(@Valid @RequestBody PldParams params) {
	//SP: SEGD_ConsultaParametros
	LOG.info("@Rest :: RestAppAModuloXX :: consultaparametros :: {}",params);
	ParentVO result=new ParentVO();
TableContainer container=contextUser.getCurrentContainer();
	try{
	SqlParameterSource inParamMap = new MapSqlParameterSource()
		.addValue("idParametro" , Integer.parseInt(params.getParam("idparametro")));

	TableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.STP_CONSULTA_PARAMETROS_DANIOS, inParamMap);
	container.loadDataToContainer(params.getKeyTable(), table);
	table.buildJson();
	result=table;//aplicamos herencia para desplegar el resultado
	}catch(ParamNotFoundException e){
	  LOG.info("@Rest :: RestAppAModuloXX :: consultaparametros :: ParamNotFoudException :  {} ", e.getMessage());
	  result.getState().enabledErrorApp();
	  result.getState().setMessage("Parámetro inválido.");
	  result.getMessage().setInfo(e.getMsgException());
	}catch(Exception e){
	  LOG.info("@Rest :: RestAppAModuloXX :: consultaparametros :: Exception :  {} ", e.getMessage());
	  result.getState().enabledErrorApp();
	  result.getState().setMessage("Error interno del servidor, se generó una excepción");
	  result.getMessage().setInfo(e.getMessage());
	}
	return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

}


@RequestMapping(value="/actualiza/parametros",method=RequestMethod.POST)
public ResponseEntity<ParentVO> actualizaparametros(@Valid @RequestBody PldParams params) {
	//SP: SEGD_ModificaParametros
	LOG.info("@Rest :: RestAppAModuloMonitoreo :: actualizaparametros :: {}",params);
	ParentVO result=new ParentVO();
	try{
	SqlParameterSource inParamMap = new MapSqlParameterSource()
		.addValue("IdParametro" , Integer.parseInt(params.getParam("idparametro")))
		.addValue("X" , Integer.parseInt(params.getParam("x")))
		.addValue("Y" , Integer.parseInt(params.getParam("y")))
		.addValue("Z" , Integer.parseInt(params.getParam("z")))
		.addValue("W" , Integer.parseInt(params.getParam("w")))
		.addValue("NoUsuario" , params.getParam("nousuario"))
		.addValue("Usuario" , params.getParam("usuario"));

	result=storedProcedure.queryforUpdateInsertDelete( ISentenciasSQL.STP_ACTUALIZA_PARAMETROS_DANIOS, inParamMap);
	result.getState().setMessage("Actualización exitosa");//cambiar leyenda en esta seccion si se desea otro mensaje
	result.getState().setShow(true);//habilita la bandera para mostrar mensajes
	}catch(ParamNotFoundException e){
	  LOG.info("@Rest :: RestAppAModuloMonitoreo :: actualizaparametros :: ParamNotFoudException :  {} ", e.getMessage());
	  result.getState().enabledErrorApp();
	  result.getState().setMessage("Parámetro inválido.");
	  result.getMessage().setInfo(e.getMsgException());
	}catch(Exception e){
	  LOG.info("@Rest :: RestAppAModuloMonitoreo :: actualizaparametros :: Exception :  {} ", e.getMessage());
	  result.getState().enabledErrorApp();
	  result.getState().setMessage("Error interno del servidor, se generó una excepción");
	  result.getMessage().setInfo(e.getMessage());
	}
	return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

}




}