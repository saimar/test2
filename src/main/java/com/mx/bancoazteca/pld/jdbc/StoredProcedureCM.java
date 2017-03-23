package com.mx.bancoazteca.pld.jdbc;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

@Repository
public class StoredProcedureCM extends StoredProcedure{
	
	private static final Logger LOG = LoggerFactory.getLogger(StoredProcedureCM.class);
	
	@Autowired
	@Qualifier("JDBCTemplateMonitoreo")
	protected JdbcTemplate jdbcTemplateCM;

	public StoredProcedureCM() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	//Metodo utilizado en el servicio rest del centro de monitoreo

	public ParentVO queryUpdateForTableVO(final String storedProcedure, final SqlParameterSource inputParam ){
		LOG.info("@Repository :: INSERT/UPDATE/DELETE :: queryUpdateForTableVO {} with  [{}]  ", storedProcedure, getImputParameters(inputParam));
	
		final SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplateCM).withProcedureName(storedProcedure);
		final String result1 = "#update-count-1";
		
		ParentVO response=new ParentVO();
		
		int registers=0;
		
		try{
			registers=(Integer) simpleJdbcCall.execute(inputParam).get(result1);
			LOG.info("Registros afectados: "+registers);
		
			if(registers>0){
				response.getState().enabledSuccessBD();
				response.getState().setMessage("Se actualizaron "+registers+" registros de la BD");
			}else{
				response.getState().enabledWarningNoData();
				response.getState().setMessage("No se actualizo ningun registro");
				response.getMessage().setInfo("Se actualizaron "+registers+" registros de la BD");
			}
		}catch(DataAccessException e){
			//e.printStackTrace();
			LOG.info("DataAccessException {}", e.getMessage());

			if( (e.getCause().getClass().getSimpleName().toString() ).equalsIgnoreCase("SQLServerException")) {
				response.getState().enabledWarningBD();
				response.getState().setMessage(e.getCause().getMessage());
				response.getMessage().setInfo("Ejecución incorrecta o incompleta de la consulta.");
			}else{
				response.getState().enabledErrorBD();
				response.getMessage().setInfo(e.getMessage());
				response.getMessage().setInfo("Se produjó un error en la consulta a la base de datos.");
			}
			response.getState().setMessage(e.getCause().getMessage());
			response.getMessage().setInfo(e.getMessage());
		}catch(ClassCastException e){			
			response.getState().enabledErrorBD();
			response.getMessage().setInfo(e.getMessage());
			LOG.info("@Repository :: TableVOGrafics :: queryForTableVOGrafics :: ClassCastException {}", e.getMessage());
		}catch(IllegalArgumentException e){
			response.getState().enabledErrorBD();
			response.getMessage().setInfo(e.getMessage());
			LOG.info("@Repository :: TableVOGrafics :: queryForTableVOGrafics :: IllegalArgumentException {}", e.getMessage());
		}catch(IllegalStateException e){
			response.getState().enabledErrorBD();
			response.getMessage().setInfo(e.getMessage());
			LOG.info("@Repository :: TableVOGrafics :: queryForTableVOGrafics :: IllegalStateException {}", e.getMessage());
		}catch(IndexOutOfBoundsException e){
			response.getState().enabledErrorBD();
			response.getMessage().setInfo(e.getMessage());
			LOG.info("@Repository :: TableVOGrafics :: queryForTableVOGrafics :: IndexOutOfBoundsException {}", e.getMessage());
		}/*catch(RuntimeException e){
			
			//e.printStackTrace();
			if(e.getMessage() == null){
				response.getState().enabledErrorApp();
				response.getState().setMessage(e.getCause().getMessage());
				response.getState().setMessage("Error interno del servidor, se generó una excepción");
			}else{
				LOG.info("Exception {} ", e.getMessage());
				response.getState().enabledErrorApp();
				response.getMessage().setInfo("Error interno del servidor, se generó una excepción");
				response.getState().setMessage(e.getCause().getMessage());
			}
			if(LOG.isDebugEnabled()){
				LOG.info(" @EXCEPTION :: "+this.getClass()+" :: Cause => {}", (e.getCause()==null)?"Error desconocido":e.getCause());
			}
		}	*/	
		return response;
	}
	
	@SuppressWarnings("unchecked")
	public TableVOGrafics queryForTableVOGrafics(final String storedProcedure, final SqlParameterSource inputParam ){
		LOG.info("@Repository TableVOGrafics queryForTableVOGrafics  ");
		LOG.info("@Repository TableVOGrafics queryForTableVOGrafics {} with  [{}]  ", storedProcedure, getImputParameters(inputParam));
		
		final SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplateCM).withProcedureName(storedProcedure);
		final String result1 = "#result-set-1";
		
		
		List<Map<String, Object>> query=null;
		TableVOGrafics table =new TableVOGrafics();
		try{
			Long execute_start = System.currentTimeMillis();
			
			
			
			query = (List<Map<String, Object>>)simpleJdbcCall.execute(inputParam).get(result1);
			
			Long execute_end = System.currentTimeMillis();
			
//			Long execute_time = execute_end - execute_start;
			LOG.info(" Query ejecutado:{call "+storedProcedure+"("+getImputParameters(inputParam)+") }  Tiempo de ejecucion :"+String.valueOf((execute_end-execute_start))+" ms " );
//			if(query!=null ){
//				LOG.info(" Service  strAutentificaUsuarioPLD  executed in {}  with {} rows ",String.valueOf((execute_time)),String.valueOf(query.size()) );
//			}
			if(query!=null && query.size()>0){
					
				table.setResultset(query);				
				table.getState().enabledSuccessBD();
			}else{
				table.getState().enabledWarningNoData();
				table.getState().setMessage("No se encontró información.");
				table.getMessage().setInfo("El SP: "+storedProcedure+" no devuelve valores con los parametros especificados.");
			}
		}catch(DataAccessException e){
			//e.printStackTrace();
			LOG.info("@Repository TableVOGrafics :: DataAccessException {}", e.getMessage());			
			if( (e.getCause().getClass().getSimpleName().toString() ).equalsIgnoreCase("SQLServerException")) {
				table.getState().enabledWarningBD();
				table.getState().setMessage(e.getCause().getMessage());
				table.getMessage().setInfo("Ejecución incorrecta o incompleta de la consulta.");
			}else{
				table.getState().enabledErrorBD();
				table.getMessage().setInfo(e.getMessage());
				table.getMessage().setInfo("Se produjó un error en la consulta a la base de datos.");
			}
		}catch(ClassCastException e){			
			table.getState().enabledErrorApp();
			table.getState().setMessage(e.getCause().getMessage());
			table.getState().setMessage("Error interno del servidor. No es posible convertir valor.");
			LOG.info("@Repository :: TableVOGrafics :: queryForTableVOGrafics :: ClassCastException {}", e.getMessage());
		}catch(IllegalArgumentException e){
			table.getState().enabledErrorApp();
			table.getState().setMessage(e.getCause().getMessage());
			table.getState().setMessage("Error interno del servidor.Argumento inválido.");
			LOG.info("@Repository :: TableVOGrafics :: queryForTableVOGrafics :: IllegalArgumentException {}", e.getMessage());
		}catch(IllegalStateException e){
			table.getState().enabledErrorApp();
			table.getState().setMessage(e.getCause().getMessage());
			table.getState().setMessage("Error interno del servidor.Argumento inválido.");
			LOG.info("@Repository :: TableVOGrafics :: queryForTableVOGrafics :: IllegalStateException {}", e.getMessage());
		}catch(IndexOutOfBoundsException e){
			table.getState().enabledErrorApp();
			table.getState().setMessage(e.getCause().getMessage());
			table.getState().setMessage("Error interno del servidor.Argumento inválido.");
			LOG.info("@Repository :: TableVOGrafics :: queryForTableVOGrafics :: IndexOutOfBoundsException {}", e.getMessage());
		}/*catch(RuntimeException e){
			//e.printStackTrace();
			LOG.error("@Repository TableVOGrafics :: Exception {} ", e.getMessage());
			table.getState().enabledErrorApp();
			table.getState().setMessage("Error interno del servidor, se generó una excepción");
			table.getMessage().setInfo(e.getCause().getMessage());
		}	*/
		//LOG.info("@Repository StoredProcedure queryForTableVO ::  return-table => {}",table.getState().toString());
		return table;
	}
}
