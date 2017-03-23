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
import org.springframework.web.bind.annotation.RequestParam;

import com.mx.bancoazteca.pld.jdbc.ISentenciasSQL;
import com.mx.bancoazteca.pld.jdbc.ParentVO;
import com.mx.bancoazteca.pld.jdbc.StoredProcedure;
import com.mx.bancoazteca.pld.jdbc.TableVO;
import com.mx.bancoazteca.pld.security.SpringSecurityUserContext;
import com.mx.bancoazteca.pld.table.manager.ParamNotFoundException;
import com.mx.bancoazteca.pld.table.manager.TableContainer;
import com.mx.bancoazteca.pld.web.rest.model.PLDManualReport;
import com.mx.bancoazteca.pld.web.rest.model.PLDReportDiscarted;
import com.mx.bancoazteca.pld.web.rest.model.PLDReportRespalded;
import com.mx.bancoazteca.pld.web.rest.model.PldParams;


@Controller
@RequestMapping(value="/restAppAModuloReportes" )
public class RestAppAModuloReportes {
	
	private static final Logger LOG = LoggerFactory.getLogger(RestAppAModuloReportes.class);
	@Autowired
	StoredProcedure storedProcedure;
	@Autowired
	private SpringSecurityUserContext contextUser;
	
	
	//Ejemplo de conuslta catalogos-peticion tipo GET
	@RequestMapping(value="/consulta/tiposReporte",method=RequestMethod.GET)
	public ResponseEntity<TableVO> consultaTipoReporte(@RequestParam(value = "catalogo", defaultValue = "") String catalogo) {
		//SP: SEGD_ConsultaCatTiposDeReporte
		LOG.info("@Rest :: RestAppAModuloReportes :: consultaTipoReporte :: {}",catalogo);
		TableVO table=new TableVO();
		try{

			SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("idPadre",catalogo);
			table=storedProcedure.queryForTableVO( ISentenciasSQL.STORED_SEGD_CAT_TIPO_REPORTE, inParamMap);
			table.buildJson();
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaTipoReporte :: Exception :  {} ", e.getMessage());
				table.getState().enabledErrorApp();
				table.getState().setMessage("Error interno del servidor, se generó una excepción");
				table.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<TableVO>(table, table.getState().getStatuCode());

	}
	//Ejemplo de conuslta catalogos-peticion tipo GET
	@RequestMapping(value="/consulta/Trimestres",method=RequestMethod.GET)
	public ResponseEntity<TableVO> consultaTrimestres() {
		//SP: SEGD_ConsultaCatTrimestres
		LOG.info("@Rest :: RestAppAModuloReportes :: consultaTrimestres");
		TableVO table=new TableVO();
		try{

			SqlParameterSource inParamMap = new MapSqlParameterSource();
			table=storedProcedure.queryForTableVO( ISentenciasSQL.STORED_SEGD_CAT_TRIMESTRE, inParamMap);
			table.buildJson();
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaTrimestres :: Exception :  {} ", e.getMessage());
				table.getState().enabledErrorApp();
				table.getState().setMessage("Error interno del servidor, se generó una excepción");
				table.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<TableVO>(table, table.getState().getStatuCode());

	}
	
	//Peticion tipo GET de datos simples-peticion tipo GET
	@RequestMapping(value="/consulta/Reportado",method=RequestMethod.GET)
	public ResponseEntity<TableVO> consultaReportado(@RequestParam(value = "movimiento", defaultValue = "0") String movimiento) {
		//SP: SEGD_ConsultaSiMovimientoReportado
		LOG.info("@Rest :: RestAppAModuloReportes :: consultaReportado :: {}",movimiento);
		TableVO table=new TableVO();
		try{

			SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("idMovimiento",movimiento);
			table=storedProcedure.queryForTableVO( ISentenciasSQL.STORED_SEGD_CONSULTA_REPORTADO, inParamMap);
			table.buildJson();
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaReportado :: Exception :  {} ", e.getMessage());
				table.getState().enabledErrorApp();
				table.getState().setMessage("Error interno del servidor, se generó una excepción");
				table.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<TableVO>(table, table.getState().getStatuCode());

	}

	//Peticion POST de datos para formulario
	@RequestMapping(value="/consulta/DatosReporte",method=RequestMethod.POST)
	public ResponseEntity<TableVO> consultaDatosReporte(@Valid @RequestBody PldParams params) {
		//SP: SEGD_ConsultaDatosParaReporte
		LOG.info("@Rest :: RestAppAModuloReportes :: consultaDatosReporte :: {}",params);
		TableVO table=new TableVO();
		try{

			SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("idMovimiento",Integer.parseInt(params.getParam("idmovimiento")!=null?params.getParam("idmovimiento"):"0"))
				.addValue("NuCliente",params.getParam("nucliente"));

			table=storedProcedure.queryForTableVO( ISentenciasSQL.STORED_SEGD_DATOS_REPORTE, inParamMap);
			table.buildJson();
		}catch(ParamNotFoundException e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaDatosReporte :: ParamNotFoudException :  {} ", e.getMessage());
				table.getState().enabledErrorApp();
				table.getState().setMessage("Parámetro inválido.");
				table.getMessage().setInfo(e.getMessage());
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaDatosReporte :: Exception :  {} ", e.getMessage());
				table.getState().enabledErrorApp();
				table.getState().setMessage("Error interno del servidor, se generó una excepción");
				table.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<TableVO>(table, table.getState().getStatuCode());

	}
	
	
	//Ejemplo de INSERT/UPDATE/DELETE datos
	@RequestMapping(value="/genera/ReporteManual",method=RequestMethod.POST)
	public ResponseEntity<ParentVO> generaReporteManual(@Valid @RequestBody PLDManualReport report) {
		//SP: SEGD_ConsultaDatosParaReporte
		LOG.info("@Rest :: RestAppAModuloReportes :: generaReporteManual :: {}",report);
		ParentVO result=new ParentVO();
		try{

			SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("IdTipoReportePLD",Integer.parseInt(report.getTiporeporte()!=null?report.getTiporeporte():"0"))
				.addValue("idMovimiento",report.getIdMovimiento())
				.addValue("NuCliente",report.getNuCliente())
				.addValue("idAnalista",Integer.parseInt(report.getIdAnalista()!=null?report.getIdAnalista():"0"))
				.addValue("nombreAnalista",report.getNombreAnalista())
				.addValue("descOperacion",report.getDescripcion())
				.addValue("razones",report.getRazones());
			
			result=storedProcedure.queryforUpdateInsertDelete( ISentenciasSQL.STORED_SEGD_GENERA_REPORTE, inParamMap);
			result.getState().setMessage("Generación de reporte exitosa");
			result.getMessage().setInfo("Se ha generadó el reporte satisfactoriamente");
			result.getState().setShow(true);
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: generaReporteManual :: Exception :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Error interno del servidor, se generó una excepción");
				result.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

	}
	

	//CONSULTA DE DATOS PARA DIRECTIVA TABLA
	@RequestMapping(value="/consulta/MovimientosReportados",method=RequestMethod.POST)
	public ResponseEntity<ParentVO> consultaMovimientosReportados(@Valid @RequestBody PldParams params) {
		//SP: SEGD_ConsultaMovReportados
		LOG.info("@Rest :: RestAppAModuloReportes :: consultaMovimientosReportados :: {}",params);
		ParentVO result=new ParentVO();
		TableContainer container=contextUser.getCurrentContainer();
		try{
				SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("IdTipoReportePLD",Integer.parseInt(params.getParam("idtiporeportepld")!=null?params.getParam("idtiporeportepld"):"0"))
				.addValue("fechaInicial",params.getParam("fechainicial"))
				.addValue("fechaFinal",params.getParam("fechafinal"))
				.addValue("trimestre",params.getParam("trimestre"))
				.addValue("año",params.getParam("anio"));

			TableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.STORED_SEGD_MOV_REPORTADOS, inParamMap);
			container.loadDataToContainer(params.getKeyTable(), table);
	 		result.setState(table.getState());
	 		result.setMessage(table.getMessage());
			//result.getState().enabledSuccessApp();
			//result.getState().setMessage("Consulta exitosa");
		}catch(ParamNotFoundException e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaMovimientosReportados :: ParamNotFoudException :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Parámetro inválido.");
				result.getMessage().setInfo(e.getMessage());
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaMovimientosReportados :: Exception :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Error interno del servidor, se generó una excepción");
				result.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

	}

	//CONSULTA DE DATOS PARA DIRECTIVA TABLA
	@RequestMapping(value="/consulta/Reportes",method=RequestMethod.POST)
	public ResponseEntity<ParentVO> consultaReportes(@Valid @RequestBody PldParams params) {
		//SP: SEGD_ConsultaReportes
		LOG.info("@Rest :: RestAppAModuloReportes :: consultaReportes :: {}",params);
		ParentVO result=new ParentVO();
		TableContainer container=contextUser.getCurrentContainer();
		try{
			SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("IdTipoReportePLD",params.isContains("idtiporeportepld")?params.getParam("idtiporeportepld"):null)
				.addValue("fhInicial",params.isContains("fhinicial")?params.getParam("fhinicial"):null)
				.addValue("fhFinal",params.isContains("fhfinal")?params.getParam("fhfinal"):null)
				.addValue("trimestre",params.isContains("trimestre")?params.getParam("trimestre"):null)
				.addValue("año",params.isContains("anio")?params.getParam("anio"):null);
			
			TableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.STORED_SEGD_REPORTES, inParamMap);
			container.loadDataToContainer(params.getKeyTable(), table);
			result.setState(table.getState());
	 		result.setMessage(table.getMessage());
			//result.getState().enabledSuccessApp();
			//result.getState().setMessage("Consulta exitosa");
		}catch(ParamNotFoundException e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaReportes :: ParamNotFoudException :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Parámetro inválido.");
				result.getMessage().setInfo(e.getMessage());
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaReportes :: Exception :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Error interno del servidor, se generó una excepción");
				result.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

	}
	//Ejemplo de INSERT/UPDATE/DELETE datos
	@RequestMapping(value="/descarta/Reporte",method=RequestMethod.POST)
	public ResponseEntity<ParentVO> descartaReporte(@Valid @RequestBody PLDReportDiscarted report) {
		//SP: SEGD_EliminaReporte
		LOG.info("@Rest :: RestAppAModuloReportes :: generaReporteManual :: {}",report);
		ParentVO result=new ParentVO();
		try{

			SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("id_Reporte",report.getIdReporte())
				.addValue("idTipoReporte",report.getTipoReporte())
				.addValue("IdUsuario",report.getAnalista())
				.addValue("NombreUsuario",report.getNombreAnalista());
				
			result=storedProcedure.queryforUpdateInsertDelete( ISentenciasSQL.STORED_SEGD_DESCARTA_REPORTE, inParamMap);
			result.getState().setMessage("Reporte descartado.");
			result.getMessage().setInfo("El reporte se decartó satisfactoriamente");
			result.getState().setShow(true);
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: generaReporteManual :: Exception :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Error interno del servidor, se generó una excepción");
				result.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

	}

	//CONSULTA DE DATOS PARA DIRECTIVA TABLA
	@RequestMapping(value="/detalle/Reportes",method=RequestMethod.POST)
	public ResponseEntity<ParentVO> detalleReportes(@Valid @RequestBody PldParams params) {
		//SP: SEGD_ConsultaReportesDetalle
		LOG.info("@Rest :: RestAppAModuloReportes :: detalleReportes :: {}",params);
		ParentVO result=new ParentVO();
		TableContainer container=contextUser.getCurrentContainer();
		try{

			SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("IdTipoReportePLD",Integer.parseInt(params.getParam("idtiporeportepld")!=null?params.getParam("idtiporeportepld"):"0"))
				.addValue("idReporte",Integer.parseInt(params.getParam("idreporte")!=null?params.getParam("idreporte"):"0"));

			TableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.STORED_SEGD_REPORTES_DET, inParamMap);
			container.loadDataToContainer(params.getKeyTable(), table);
	 		result.getState().enabledSuccessApp();
			result.getState().setMessage("Consulta exitosa");
		}catch(ParamNotFoundException e){
				LOG.info("@Rest :: RestAppAModuloReportes :: detalleReportes :: ParamNotFoudException :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Parámetro inválido.");
				result.getMessage().setInfo(e.getMessage());
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: detalleReportes :: Exception :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Error interno del servidor, se generó una excepción");
				result.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

	}

	//CONSULTA DE DATOS PARA DIRECTIVA TABLA
	@RequestMapping(value="/consulta/ReportesHistorial",method=RequestMethod.POST)
	public ResponseEntity<ParentVO> consultaReportesHistorial(@Valid @RequestBody PldParams params) {
		//SP: SEGD_ConsultaReportesHistorial
		LOG.info("@Rest :: RestAppAModuloReportes :: consultaReportesHistorial :: {}",params);
		ParentVO result=new ParentVO();
		TableContainer container=contextUser.getCurrentContainer();
		
		try{
			SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("IdTipoReportePLD",params.isContains("idtiporeportepld")?params.getParam("idtiporeportepld"):null)
				.addValue("fhInicial",params.isContains("fhinicial")?params.getParam("fhinicial"):null)
				.addValue("fhFinal",params.isContains("fhfinal")?params.getParam("fhfinal"):null)
				.addValue("trimestre",params.isContains("trimestre")?params.getParam("trimestre"):null)
				.addValue("año",params.isContains("anio")?params.getParam("anio"):null);
					
			TableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.STORED_SEGD_REP_HISTORIAL, inParamMap);
			container.loadDataToContainer(params.getKeyTable(), table);
	 		result.getState().enabledSuccessApp();
			result.getState().setMessage("Consulta exitosa");
		}catch(ParamNotFoundException e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaReportesHistorial :: ParamNotFoudException :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Parámetro inválido.");
				result.getMessage().setInfo(e.getMessage());
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaReportesHistorial :: Exception :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Error interno del servidor, se generó una excepción");
				result.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

	}

	//CONSULTA DE DATOS PARA DIRECTIVA TABLA
	@RequestMapping(value="/detalle/ReportesHistorial",method=RequestMethod.POST)
	public ResponseEntity<ParentVO> detalleReportesHistorial(@Valid @RequestBody PldParams params) {
		//SP: SEGD_ConsultaReportesHistorialDetalle
		LOG.info("@Rest :: RestAppAModuloReportes :: detalleReportesHistorial :: {}",params);
		ParentVO result=new ParentVO();
		TableContainer container=contextUser.getCurrentContainer();
		try{

			SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("IdTipoReportePLD",Integer.parseInt(params.getParam("idtiporeportepld")!=null?params.getParam("idtiporeportepld"):"0"))
				.addValue("idReporte",Integer.parseInt(params.getParam("idreporte")!=null?params.getParam("idreporte"):"0"));

			TableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.STORED_SEGD_REP_HISTORIAL_DET, inParamMap);
			container.loadDataToContainer(params.getKeyTable(), table);
	 		result.getState().enabledSuccessApp();
			result.getState().setMessage("Consulta exitosa");
		}catch(ParamNotFoundException e){
				LOG.info("@Rest :: RestAppAModuloReportes :: detalleReportesHistorial :: ParamNotFoudException :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Parámetro inválido.");
				result.getMessage().setInfo(e.getMessage());
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: detalleReportesHistorial :: Exception :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Error interno del servidor, se generó una excepción");
				result.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

	}


	
	//CONSULTA DE DATOS PARA DIRECTIVA TABLA
	@RequestMapping(value="/consulta/DescargaReportes",method=RequestMethod.POST)
	public ResponseEntity<ParentVO> consultaDescargaReportes(@Valid @RequestBody PldParams params) {
		//SP: SEGD_ConsultaReportesDescarga
		LOG.info("@Rest :: RestAppAModuloReportes :: consultaDescargaReportes :: {}",params);
		ParentVO result=new ParentVO();
		TableContainer container=contextUser.getCurrentContainer();
		try{
			SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("IdTipoReportePLD",params.isContains("idtiporeportepld")?params.getParam("idtiporeportepld"):null)
				.addValue("fhInicial",params.isContains("fhinicial")?params.getParam("fhinicial"):null)
				.addValue("fhFinal",params.isContains("fhfinal")?params.getParam("fhfinal"):null)
				.addValue("trimestre",params.isContains("trimestre")?params.getParam("trimestre"):null)
				.addValue("año",params.isContains("anio")?params.getParam("anio"):null);

			TableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.STORED_SEGD_DESCARGA_REPORTE, inParamMap);
			container.loadDataToContainer(params.getKeyTable(), table);
	 		result.getState().enabledSuccessApp();
			result.getState().setMessage("Consulta exitosa");
		}catch(ParamNotFoundException e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaDescargaReportes :: ParamNotFoudException :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Parámetro inválido.");
				result.getMessage().setInfo(e.getMessage());
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaDescargaReportes :: Exception :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Error interno del servidor, se generó una excepción");
				result.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

	}

	//CONSULTA DE DATOS PARA DIRECTIVA TABLA
	@RequestMapping(value="/consulta/HistorialExcel",method=RequestMethod.POST)
	public ResponseEntity<ParentVO> consultaHistorialExcel(@Valid @RequestBody PldParams params) {
		//SP: SEGD_ReportesHistorialExcel
		LOG.info("@Rest :: RestAppAModuloReportes :: consultaHistorialExcel :: {}",params);
		ParentVO result=new ParentVO();
		TableContainer container=contextUser.getCurrentContainer();
		try{

			SqlParameterSource inParamMap = new MapSqlParameterSource()
				.addValue("IdTipoReportePLD",Integer.parseInt(params.getParam("idtiporeportepld")!=null?params.getParam("idtiporeportepld"):"0"))
				.addValue("idReporte",Integer.parseInt(params.getParam("idreporte")!=null?params.getParam("idreporte"):"0"));

			TableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.STORED_SEGD_HISTORIAL_EXCEL, inParamMap);
			container.loadDataToContainer(params.getKeyTable(), table);
	 		result.getState().enabledSuccessApp();
			result.getState().setMessage("Consulta exitosa");
		}catch(ParamNotFoundException e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaHistorialExcel :: ParamNotFoudException :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Parámetro inválido.");
				result.getMessage().setInfo(e.getMessage());
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: consultaHistorialExcel :: Exception :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Error interno del servidor, se generó una excepción");
				result.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

	}
	//Ejemplo de INSERT/UPDATE/DELETE datos
	@RequestMapping(value="/respalda/RespaldaReportes",method=RequestMethod.POST)
	public ResponseEntity<ParentVO> respaldaReporte(@Valid @RequestBody PLDReportRespalded report) {
		//SP: SEGD_EliminaReporte
		LOG.info("@Rest :: RestAppAModuloReportes :: respaldaReporte :: {}",report);
		ParentVO result=new ParentVO();
		try{

			SqlParameterSource inParamMap = new MapSqlParameterSource()
					.addValue("IdTipoReportePLD",report.getTipoReporte())
					.addValue("idReporte",report.getIdReporte())
					.addValue("folio",report.getFolio())
					.addValue("idUsuario",report.getAnalista())
					.addValue("nombreUsuario",report.getNombreAnalista());
				
				result=storedProcedure.queryforUpdateInsertDelete( ISentenciasSQL.STORED_SEGD_RESPALDA_REPORTE, inParamMap);
				result.getState().setMessage("Respaldo de reporte exitoso");
				result.getMessage().setInfo("Se ha respaldado el reporte satisfactoriamente");
		}catch(Exception e){
				LOG.info("@Rest :: RestAppAModuloReportes :: respaldaReporte :: Exception :  {} ", e.getMessage());
				result.getState().enabledErrorApp();
				result.getState().setMessage("Error interno del servidor, se generó una excepción");
				result.getMessage().setInfo(e.getMessage());
		}
	 return new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());

	}
	
	
}
