package com.mx.bancoazteca.pld.web.rest.centroMonitoreo;


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


import com.mx.bancoazteca.pld.jdbc.ISentenciasSQL;
import com.mx.bancoazteca.pld.jdbc.StoredProcedure;
import com.mx.bancoazteca.pld.jdbc.StoredProcedureCM;
import com.mx.bancoazteca.pld.jdbc.TableVO;
import com.mx.bancoazteca.pld.jdbc.TableVOGrafics;
import com.mx.bancoazteca.pld.security.ApplicationModule;
import com.mx.bancoazteca.pld.security.CustomUser;
import com.mx.bancoazteca.pld.security.SpringSecurityUserContext;
import com.mx.bancoazteca.pld.util.HerramientasPLD;



@Controller
@RequestMapping(value = "/restModuloCentroMonitoreo")
public class RestModuloCentroMonitoreo {

	private static final Logger LOG = LoggerFactory.getLogger(RestModuloCentroMonitoreo.class);

@Autowired
public StoredProcedureCM storedProcedureCM;

@Autowired
StoredProcedure storedProcedure;

@Autowired
private SpringSecurityUserContext contextUser;


@RequestMapping(value="/cosulta/panelAplicacion",method=RequestMethod.GET)
public ResponseEntity<List<Map<String, Object>>> consultaAplicaciones() {

	LOG.info("@Rest :: RestModuloCentroMonitoreo :: consultaAplicaciones");
	
	
	List<Map<String, Object>> modules=new ArrayList<Map<String,Object>>();
	
	try{
		CustomUser customUser = contextUser.getCurrentUser();
			
		TableVO table=null;
		SqlParameterSource inParamMap = null;
		
		if(customUser.getCredential()!=null && customUser.getCredential().getTreeModule()!=null)
		for(ApplicationModule module:customUser.getCredential().getTreeModule()){
			Map<String,Object> apps=new HashMap<String, Object>();
				if(module.getIdParent().toString().equalsIgnoreCase("0")){
					
						inParamMap = new MapSqlParameterSource()
							.addValue("Consulta",2)//Valor por default
							.addValue("IDPais",1)//ID MEXICO
							.addValue("IdNegocioF",module.getDirectory());//Se ampeo en el directorio la descripcion del producto

						table=storedProcedureCM.queryForTableVOGrafics( ISentenciasSQL.PLD_CONSULTA_PRODUCTO_X_ID, inParamMap);

						apps.put("producto",(String)table.getResultset().get(0).get("NegocioFinal"));
						inParamMap = new MapSqlParameterSource();
						if(module.getMapping().trim().equalsIgnoreCase("SGV")){
							table=storedProcedure.queryForTableVO(ISentenciasSQL.STORED_SEGV_DASHBORAD, inParamMap);
							apps.put("data",(String)table.getResultset().get(0).get("datos"));
							apps.put("idProducto",(String)module.getDirectory());
							
						}
						if(module.getMapping().trim().equalsIgnoreCase("SGD")){
							table=storedProcedure.queryForTableVO(ISentenciasSQL.STORED_SEGD_DASHBORAD, inParamMap);
							apps.put("data",(String)table.getResultset().get(0).get("datos"));
							apps.put("idProducto",(String)module.getDirectory());
						}
						modules.add(apps);
					}
		}
		return new ResponseEntity<List<Map<String, Object>>>(modules,HttpStatus.OK);
	}catch(Exception e){
		
		LOG.info("@Rest :: RestModuloCentroMonitoreo :: consultaAplicaciones :: Exception");
		Map<String,Object> error=new HashMap<String, Object>();
		error.put("message",e.getMessage());
		error.put("cause", e.getCause());
		modules.add(error);
		e.printStackTrace();
		return new ResponseEntity<List<Map<String, Object>>>(modules,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}



@RequestMapping(value="/consulta/colores",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> dataColoresIndicadoresJSON(
		@RequestParam(value="consulta", defaultValue="none") String consulta,
		@RequestParam(value="chart", defaultValue="none") String chart) {

	HttpStatus status = HttpStatus.OK; 
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta"  , consulta)
			.addValue("Clasificacion", chart);

	TableVOGrafics table=null;
	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.STORED_CATALOGO_COLORES, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}

@RequestMapping(value="/consulta/graficas",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> deteccionesListasOptions(
		@RequestParam(value="consulta", defaultValue="none") String consulta,
		@RequestParam(value="chart", defaultValue="none") String chart,
		@RequestParam(value="pais", defaultValue="1") String pais) {
	HttpStatus status = HttpStatus.OK; 

	if(pais.equals("none")||pais.length()==0)
		pais="NULL";

	SqlParameterSource  inParamMap = new MapSqlParameterSource()
			.addValue("Consulta", consulta)
			.addValue("Grafica", chart)
			.addValue("IdPais", pais);

	TableVOGrafics table=null;

	table =  storedProcedureCM.queryForTableVOGrafics( ISentenciasSQL.STORED_CONSULTA_GRAFICAS, inParamMap);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}
/*
@RequestMapping(value="/consulta/menuDinamico",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> menuDinamico(
		@RequestParam(value="consulta", defaultValue="none") String consulta,
		@RequestParam(value="pais", defaultValue="1") String pais) {
	HttpStatus status = HttpStatus.OK; 

	if(pais.equals("none")||pais.length()==0)
		pais="NULL";

	SqlParameterSource  inParamMap = new MapSqlParameterSource()
			.addValue("Consulta", consulta)
			.addValue("IdPais", pais);

	TableVOGrafics table=null;

	table =  storedProcedureCM.queryForTableVOGrafics( ISentenciasSQL.STORED_PLD_CONSULTACATALOGOSCM, inParamMap);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}*/
@RequestMapping(value="/consulta/proveedores",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> proveedores(
		@RequestParam(value="consulta", defaultValue="none") String consulta,
		@RequestParam(value="pais", defaultValue="1") String pais,
		@RequestParam(value="fecha", defaultValue="none") String fecha,
		@RequestParam(value="producto", defaultValue="none") String producto
		) {

	HttpStatus status = HttpStatus.OK;
	
	

			/*Descomentar para jetty*/
			
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta"  , consulta)
			.addValue("pais", pais)
			.addValue("fecha", fecha)
			.addValue("producto", HerramientasPLD.formateaUtf8ToISO(producto))
			.addValue("Param1", "")
			.addValue("Param2", "");

	TableVOGrafics table=null;

	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.STORED_CONSULTA_PROVEEDORES, inputParam);
	table.buildJson(); 
	table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}


@RequestMapping(value="/consulta/planesRemediacion",method=RequestMethod.GET )
public ResponseEntity<TableVO> planesRemediacion(
		@RequestParam(value="consulta", defaultValue="none") String consulta,
		@RequestParam(value="mes", defaultValue="") String mes,
		@RequestParam(value="anio", defaultValue="") String anio,
		@RequestParam(value="pais", defaultValue="") String pais
		) {
	
	TableVO table=null;
	
	
	try{
	
		CustomUser customUser = contextUser.getCurrentUser();
		List<Map<String, Object>> planesRemediacion=new ArrayList<Map<String,Object>>();
		
		SqlParameterSource inParamMap = null;
		
		TableVOGrafics data=null;
		if(customUser.getCredential()!=null && customUser.getCredential().getTreeModule()!=null)
		for(ApplicationModule module:customUser.getCredential().getTreeModule()){
			
				if(module.getIdParent().toString().equalsIgnoreCase("0")){
					
					inParamMap = new MapSqlParameterSource()
							.addValue("Consulta",2)//Valor por default
							.addValue("IDPais",1)//ID MEXICO
							.addValue("IdNegocioF",module.getDirectory());//Se ampeo en el directorio la descripcion del producto

						data=storedProcedureCM.queryForTableVOGrafics( ISentenciasSQL.PLD_CONSULTA_PRODUCTO_X_ID, inParamMap);

						String producto=(String)data.getResultset().get(0).get("NegocioFinal");
						
							SqlParameterSource  inputParam = new MapSqlParameterSource()
									.addValue("Consulta"  , consulta)
									.addValue("Mes"  , mes)
									.addValue("Año"  , anio)
									.addValue("pais"  ,pais)//La descripcion del pais se extrae en el front
									.addValue("Producto"  , producto);
							
							data =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.STORED_CONSULTA_PLANES_REMEDIACION, inputParam);
							
							planesRemediacion.addAll(data.getResultset());
						}
						
					}
		table=new TableVO(planesRemediacion);
		table.getState().enabledSuccessApp();
		table.buildJson();
		return new ResponseEntity<TableVO>(table, table.getState().getStatuCode());
	}catch(Exception e){
		table=new TableVO();
		table.getState().enabledErrorApp();
		table.getState().setMessage("Error en la aplicación se genero una excepción");
		return new ResponseEntity<TableVO>(table, table.getState().getStatuCode());
	}
	
}
/*
@RequestMapping(value="/consulta/monitorAlertas",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> monitorAlertas(
		@RequestParam(value="consulta", defaultValue="none") String consulta,
		@RequestParam(value="pais", defaultValue="-1") String pais,
		@RequestParam(value="fecha", defaultValue="none") String fecha,
		@RequestParam(value="producto", defaultValue="none") String producto
		) {

	HttpStatus status = HttpStatus.OK; 
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta"  , consulta)
			.addValue("Pais"  , pais)
			.addValue("Fecha"  , fecha)
			.addValue("Producto"  , producto)
			.addValue("Param1"  , "")
			.addValue("Param2"  , "");
	TableVOGrafics table=null;
	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.CONSULTA_MONITOR_ALERTAS, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}

@RequestMapping(value="/consulta/consultaAnalisis",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> consultaAnalisis(
		@RequestParam(value="consulta", defaultValue="none") String consulta,
		@RequestParam(value="pais", defaultValue="-1") String pais,
		@RequestParam(value="fecha", defaultValue="none") String fecha,
		@RequestParam(value="producto", defaultValue="none") String producto
		) {

	HttpStatus status = HttpStatus.OK; 
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta"  , consulta)
			.addValue("Pais"  , pais)
			.addValue("Fecha"  , fecha)
			.addValue("Producto"  , producto)
			.addValue("Param1"  , "")
			.addValue("Param2"  , "");

	TableVOGrafics table=null;

	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.STORED_CONSULTA_ANALISIS, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}
*/
@RequestMapping(value="/consulta/cifrasControl",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> cifrasControl(
		@RequestParam(value="consulta", defaultValue="none") String consulta,
		@RequestParam(value="pais", defaultValue="1") String pais,
		@RequestParam(value="fecha", defaultValue="none") String fecha,
		@RequestParam(value="producto", defaultValue="none") String producto,
		@RequestParam(value="param1", defaultValue="") String param1
		) {
	HttpStatus status = HttpStatus.OK; 
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta"  , consulta)
			.addValue("Pais"  , pais)
			.addValue("Fecha"  , fecha)
			.addValue("Producto"  , HerramientasPLD.formateaUtf8ToISO(producto))
			.addValue("Param1"  , param1)
			.addValue("Param2"  , "");

	TableVOGrafics table=null;

	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.STORED_CONSULTA_CIFRAS_CONTROL, inputParam);
	table.buildJson(); 
	table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}
/*
@RequestMapping(value="/consulta/matrizRiesgoLAM",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> matrizRiesgoLAM(
		@RequestParam(value="consulta", defaultValue="none") String consulta,
		@RequestParam(value="pais", defaultValue="-1") String pais,
		@RequestParam(value="fecha", defaultValue="none") String fecha,
		@RequestParam(value="producto", defaultValue="none") String producto
		) {
	HttpStatus status = HttpStatus.OK;
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta"  , consulta)
			.addValue("Pais"  , pais)
			.addValue("Fecha"  , fecha)
			.addValue("Producto"  , producto)
			.addValue("Param1"  , "")
			.addValue("Param2"  , "");

	TableVOGrafics table=null;
	
	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.STORED_CONSULTA_MATRIZ_RIESGO_LAM, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}

@RequestMapping(value="/consulta/capacitacion",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> capacitacion(
		@RequestParam(value="consulta", defaultValue="none") String consulta,
		@RequestParam(value="mes", defaultValue="-1") String mes,
		@RequestParam(value="anio", defaultValue="none") String anio,
		@RequestParam(value="pais", defaultValue="none") String pais
		) {
	HttpStatus status = HttpStatus.OK; 
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta"  , consulta)
			.addValue("Mes"  , mes)
			.addValue("Año"  , anio)
			.addValue("Param1"  , pais)
			.addValue("Param2"  , "");

	TableVOGrafics table=null;

	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.STORED_CONSULTA_CAPACITACION, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}

@RequestMapping(value="/consulta/paisesImagenes",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> paisesImagenes() {
	HttpStatus status = HttpStatus.OK; 
	 
	SqlParameterSource  inputParam = new MapSqlParameterSource();

	TableVOGrafics table=null;

	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.STORED_CATALOGO_PAISES, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}

@RequestMapping(value="/consulta/matrizRiesgo",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> matrizRiesgo(
		@RequestParam(value="consulta", defaultValue="none") String consulta,
		@RequestParam(value="pais", defaultValue="-1") String pais,
		@RequestParam(value="fecha", defaultValue="none") String fecha,
		@RequestParam(value="producto", defaultValue="none") String producto,
		@RequestParam(value="param1", defaultValue="none") String param1
		) {
	HttpStatus status = HttpStatus.OK; 

	if(param1.equals("none") ||param1.length()==0)
		param1="";

	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta"  , consulta)
			.addValue("Pais"  , pais)
			.addValue("Fecha"  , fecha)
			.addValue("Producto"  , producto)
			.addValue("Param1"  , param1)
			.addValue("Param2"  , "");


	TableVOGrafics table=null;
	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.STORED_CONSULTA_MATRIZ_RIESGO, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}

@RequestMapping(value="/consulta/opcionesMapas",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> opcionesMapas(
		@RequestParam(value="pais", defaultValue="-1") String pais,
		@RequestParam(value="typeMap", defaultValue="none") String typeMap
		){
	HttpStatus status = HttpStatus.OK; 
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("IdPais"  , pais)
			.addValue("TipoMapa"  , typeMap);

	TableVOGrafics table=null;
	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.STORED_OPCIONES_MAPAS, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}

@RequestMapping(value="/consulta/getPanels",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> getPanels(
		@RequestParam(value="consulta", defaultValue="-1") String consulta,
		@RequestParam(value="carousel", defaultValue="") String carousel
		){
	HttpStatus status = HttpStatus.OK; 
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta"  , consulta)
			.addValue("IdCarrusel"  , carousel);

	TableVOGrafics table=null;

	LOG.info("Rest Service :: GetPanels :: call PLD_ConsultaPerspectivas({})",consulta);

	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.PLD_CONSULTAPERSPECTIVAS, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}

@RequestMapping(value="/consulta/getDataCarousel",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> getDataCarousel(
		@RequestParam(value="consulta", defaultValue="-1") String consulta,
		@RequestParam(value="carousel", defaultValue="none") String carousel
		){
	HttpStatus status = HttpStatus.OK; 

	if(carousel.equals("none") ||carousel.length()==0)
		carousel="";
	 
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta"  , consulta)
			.addValue("IdCarrusel"  , carousel);

	TableVOGrafics table=null;

	LOG.info("Rest Service :: Get Data Carousel :: {call PLD_ConsultaPerspectivas("+consulta+","+carousel+")}");

	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.PLD_CONSULTAPERSPECTIVAS, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}	
@RequestMapping(value="/consulta/getDataCarousels",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> getDataCarousels(
		@RequestParam(value="consulta", defaultValue="-1") String consulta,
		@RequestParam(value="carousel", defaultValue="") String carousel
		){
	HttpStatus status = HttpStatus.OK; 
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta"  , consulta)
			.addValue("IdCarrusel"  , carousel);

	TableVOGrafics table=null;

	LOG.info("Rest Service :: Get Data Carousels :: {call PLD_ConsultaPerspectivas("+consulta+")}");
	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.PLD_CONSULTAPERSPECTIVAS, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}

@RequestMapping(value="/consulta/opcsGraficas",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> opcsGraficas(
		@RequestParam(value="consulta", defaultValue="-1") String consulta,
		@RequestParam(value="grafica", defaultValue="") String grafica,
		@RequestParam(value="pais", defaultValue="0") String pais
		) {

	HttpStatus status = HttpStatus.OK; 
	TableVOGrafics table=null;

	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta", consulta)
			.addValue("Grafica", grafica)
			.addValue("IdPais", pais);

	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.STORED_CONSULTA_GRAFICAS, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}	

@RequestMapping(value="/administracion/colores",method=RequestMethod.GET )
public ResponseEntity<TableVOGrafics> getDataColores(
		@RequestParam(value="consulta", defaultValue="-1") String consulta,
		@RequestParam(value="clasificacion", defaultValue="") String clasificacion
		){

	HttpStatus status = HttpStatus.OK; 
	SqlParameterSource  inputParam = new MapSqlParameterSource()
			.addValue("Consulta", consulta)
			.addValue("Clasificacion", clasificacion);

	TableVOGrafics table=null;

	table =  storedProcedureCM.queryForTableVOGrafics(ISentenciasSQL.PLD_CLASIFICACIONCATCOLORES, inputParam);
	table.buildJson(); table.buildJsonTree();
	return new ResponseEntity<TableVOGrafics>(table, status);
}


/***************************BEGIN Administration**********************************************
@RequestMapping(value="/administracion/deleteColores",method=RequestMethod.DELETE)
public ResponseEntity<ColoresVO> deleteCarousels(@RequestBody ColoresVO colores ){

	ParentVO table =null;

	SqlParameterSource  inParamMap = new MapSqlParameterSource()
			.addValue("option"				, colores.getConsulta())
			.addValue("Id"					, colores.getId())
			.addValue("Color"				, colores.getColor())
			.addValue("Estatus"				, colores.getStatus())
			.addValue("Clasificacion"		, colores.getClasificacion())
			.addValue("IdOrden"				, colores.getIdOrden())
			.addValue("DescripcionColor"	, colores.getDesColor())
			.addValue("DescripcionIdOrden"	, colores.getDesOrden());

	table = storedProcedureCM.queryUpdateForTableVO(ISentenciasSQL.PLD_COLORESAPLICACION, inParamMap);
	

	return new ResponseEntity<ColoresVO>(colores,HttpStatus.OK);
}


@RequestMapping(value="/administracion/saveColores",method=RequestMethod.POST)
public ResponseEntity<ColoresVO> saveColores(@RequestBody ColoresVO colores ){


	ParentVO table =null;
	SqlParameterSource  inParamMap = new MapSqlParameterSource()
			.addValue("option"				, colores.getConsulta())
			.addValue("Id"					, colores.getId())
			.addValue("Color"				, colores.getColor())
			.addValue("Estatus"				, colores.getStatus())
			.addValue("Clasificacion"		, colores.getClasificacion())
			.addValue("IdOrden"				, colores.getIdOrden())
			.addValue("DescripcionColor"	, colores.getDesColor())
			.addValue("DescripcionIdOrden"	, colores.getDesOrden());

	

	LOG.info("Rest Service :: SaveColores :: {call PLD_ActualizaCatColoresAplicacion("+colores.getConsulta()+","+colores.getId()+","+colores.getColor()+","+colores.getStatus()+","+colores.getClasificacion()+","+
			colores.getIdOrden()+","+colores.getDesColor()+","+colores.getDesOrden()+")}");

	table = storedProcedureCM.queryUpdateForTableVO(ISentenciasSQL.PLD_COLORESAPLICACION, inParamMap);

	return new ResponseEntity<ColoresVO>(colores,table.getState().getStatuCode());

}

@RequestMapping(value="/administracion/updateColores",method=RequestMethod.PUT)
public ResponseEntity<ParentVO> updateColores(@RequestBody ColoresVO colores ){

	ParentVO table=null;

	SqlParameterSource  inParamMap = new MapSqlParameterSource()
			.addValue("option"				, colores.getConsulta())
			.addValue("Id"					, colores.getId())
			.addValue("Color"				, colores.getColor())
			.addValue("Estatus"				, colores.getStatus())
			.addValue("Clasificacion"		, colores.getClasificacion())
			.addValue("IdOrden"				, colores.getIdOrden())
			.addValue("DescripcionColor"	, colores.getDesColor())
			.addValue("DescripcionIdOrden"	, colores.getDesOrden());

	

	LOG.info("Rest Service :: UpdateColores :: {call PLD_ActualizaCatColoresAplicacion("+colores.getConsulta()+","+colores.getId()+","+colores.getColor()+","+colores.getStatus()+","+colores.getClasificacion()+","+
			colores.getIdOrden()+","+colores.getDesColor()+","+colores.getDesOrden()+")}");

	table = storedProcedureCM.queryUpdateForTableVO(ISentenciasSQL.PLD_COLORESAPLICACION, inParamMap);

	return  new ResponseEntity<ParentVO>(HttpStatus.OK);

}


@RequestMapping(value="/administracion/saveOpcsGraficas",method=RequestMethod.POST)
public ResponseEntity<OpcionesGraficasVO> saveOpcsGraficas(@RequestBody OpcionesGraficasVO opcionesGraficas){

	ParentVO table = null;
	
		SqlParameterSource  inParamMap = new MapSqlParameterSource()
				.addValue("option"				, opcionesGraficas.getConsulta())
				.addValue("id"					, opcionesGraficas.getId())
				.addValue("idPadre"				, opcionesGraficas.getIdPadre())
				.addValue("grafica"				, opcionesGraficas.getGrafica())
				.addValue("nombre"				, opcionesGraficas.getNombre())
				.addValue("valor"				, opcionesGraficas.getValor())
				.addValue("activo"				, opcionesGraficas.getEstado())
				.addValue("TipoDato"			, opcionesGraficas.getTipoDato())
				.addValue("idPais"				, opcionesGraficas.getPais());

	
		LOG.info("Rest Service :: SaveColores :: {call PLD_ActualizaCatGraficas( "+opcionesGraficas+"}");

		table = storedProcedureCM.queryUpdateForTableVO(ISentenciasSQL.PLD_COLORESAPLICACION, inParamMap);

	
	return new ResponseEntity<OpcionesGraficasVO>(opcionesGraficas,HttpStatus.OK);

}*/
/***************************END Administration***********************************************/
/*
@ExceptionHandler(PLDNotFoundException.class)
@ResponseStatus(HttpStatus.NOT_FOUND)
public Error pldNotFound(PLDNotFoundException e) {
	return new Error("No se encontraron datos:"+e.getPLDMessage());
}*/
}