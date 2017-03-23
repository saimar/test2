package com.mx.bancoazteca.pld.jdbc;


import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SqlOutParameter;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;

@Repository
public class StoredProcedure {
	
	private static final Logger LOG = LoggerFactory.getLogger(StoredProcedure.class);
	
	@Autowired
	@Qualifier("JDBCTemplateApp")
	protected JdbcTemplate jdbcTemplate;
	
	public StoredProcedure(){
		LOG.info("@Repository :: StoredProcedure");
	}
	
	public StoredProcedure(JdbcTemplate jdbcTemplate){
		LOG.info("@Repository :: StoredProcedure");
		this.jdbcTemplate=jdbcTemplate;
	}
	
	protected String getImputParameters(final SqlParameterSource inputParam) {
		String str = "";
		for (String name : ((MapSqlParameterSource) inputParam).getValues().keySet()) {
			str += "[" + name + "=" + inputParam.getValue(name) + "] ";
		}
		return str;
	}


	@SuppressWarnings("unchecked")	
	public TableVO queryForTableVO(final String storedProcedure, final SqlParameterSource inputParam ){
		//LOG.info("@Repository TableVO queryForTableVO  ");
		LOG.info("@Repository StoredProcedure queryForTableVO {} with  [{}]  ", storedProcedure, getImputParameters(inputParam));
		
		final SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName(storedProcedure);
		final String result1 = "#result-set-1";
		
		List<Map<String, Object>> query=null;
		TableVO table =new TableVO();
		try{
			Long execute_start = System.currentTimeMillis();
			//LOG.info("@Repository TableVO queryForTableVO :: before execute the call ");
			query = (List<Map<String, Object>>)simpleJdbcCall.execute(inputParam).get(result1);
			//LOG.info("@Repository TableVO queryForTableVO :: after execute the call ");
			Long execute_end = System.currentTimeMillis();
			//LOG.info("@Repository StoredProcedure queryForTableVO ::  executed in "+String.valueOf((execute_end-execute_start))+"  with " + query.size() +" rows " );
			LOG.info(" Query ejecutado:{call "+storedProcedure+"("+getImputParameters(inputParam)+") }  Tiempo de ejecucion :"+String.valueOf((execute_end-execute_start))+" ms " ); 
			
			if(query!=null){
				if(query.size()>0){
					if(query.size()<=jdbcTemplate.getMaxRows()-1){
						table.setResultset(query);
						table.getState().enabledSuccessBD();
					}else{
						query.clear();
						table.setResultset(query);
						table.getState().enabledErrorBD();
						table.getState().setMessage("Consulta demasiado extensa, el máximo de registros permitidos es "+jdbcTemplate.getMaxRows());
						table.getMessage().setInfo("Se ha sobrepasado el máximo de registros permitidos, realice nuevamente la acción restringiendo los campos de busqueda.");
					}
				}else{
					LOG.info("@Repository StoredProcedure queryForTableVO ::  WARNING! NO DATA\r " +"El SP: "+storedProcedure+" no devuelve valores con los parametros especificados.");
					table.getState().enabledWarningNoData();
					table.getState().setMessage("No se encontró información.");
					table.getMessage().setInfo("La consulta no devuelve valores con los parámetros especificados.");
				}
			}else{
				LOG.info("@Repository StoredProcedure queryForTableVO ::  WARNING! NO RESULT-SET\r " +"El SP: "+storedProcedure+" no regresa un resul-set");
				table.getState().enabledWarningNoData();
				table.getState().setMessage("No se encontró información.");
				table.getMessage().setInfo("La consulta no devuelve valores con los parámetros especificados.");
			}
		}catch(DataAccessException e){
			//e.printStackTrace();
			LOG.info("@Repository StoredProcedure queryForTableVO :: DataAccessException {}", e.getMessage());			
			if( (e.getCause().getClass().getSimpleName().toString() ).equalsIgnoreCase("SQLServerException")) {
				table.getState().enabledWarningBD();
				table.getState().setMessage(e.getCause().getMessage());
				table.getMessage().setInfo("Ejecución incorrecta o incompleta de la consulta.");
			}else{
				table.getState().enabledErrorBD();
				table.getState().setMessage(e.getMessage());
				table.getMessage().setInfo("Se produjó un error en la consulta a la base de datos.");
			}
		}catch(ClassCastException e){
			table.getState().enabledErrorApp();
			table.getState().setMessage(e.getCause().getMessage());
			table.getMessage().setInfo("Error interno del servidor. No es posible convertir valor.");
			LOG.info("@Repository :: StoredProcedure :: queryForTableVO :: ClassCastException {}", e.getMessage());
		}catch(RuntimeException e){
			table.getState().enabledErrorApp();
			table.getState().setMessage(e.getCause().getMessage());
			table.getMessage().setInfo("Error interno del servidor.Argumento inválido.");
			LOG.info("@Repository :: StoredProcedure :: queryForTableVO :: ClassCastException {}", e.getMessage());
		}
	 
		//LOG.info("@Repository StoredProcedure queryForTableVO ::  return-table => {}",table.getState().toString());
		return table;
	}
	
	public ParentVO queryforUpdateInsertDelete(final String storedProcedure, final SqlParameterSource inputParam ){
		LOG.info("@Repository :: StoredProcedure :: queryUpdateInsertDelete {} with  [{}]  ", storedProcedure, getImputParameters(inputParam));
	
		final SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName(storedProcedure);
		final String result1 = "#update-count-1";
		
		ParentVO response=new ParentVO();
		
		int registers=0;
		
		try{
			registers=(Integer) simpleJdbcCall.execute(inputParam).get(result1);
			LOG.info("Registros afectados: "+registers);
		
			if(registers>0){
				response.getState().enabledSuccessBD();
				response.getMessage().setInfo("Se modificaron "+registers+" registros de la BD");
			}else{
				response.getState().enabledWarningNoData();
				response.getState().setMessage("No se actualizó ningún registro");
				response.getMessage().setInfo("Se modificaron "+registers+" registros de la BD");
			}
		}catch(DataAccessException e){
			//e.printStackTrace();
			LOG.info("@Repository :: StoredProcedure :: queryUpdateInsertDelete :: DataAccessException {}", e.getMessage());

			if( (e.getCause().getClass().getSimpleName().toString() ).equalsIgnoreCase("SQLServerException")) {
				response.getState().enabledWarningBD();
				response.getState().setMessage(e.getCause().getMessage());
				response.getMessage().setInfo("Ejecución incorrecta o incompleta de la consulta.");
			}else{
				response.getState().enabledErrorBD();
				response.getState().setMessage(e.getMessage());
				response.getMessage().setInfo("Se produjó un error en la consulta a la base de datos.");
			}
			response.getState().setMessage(e.getCause().getMessage());
			response.getMessage().setInfo(e.getMessage());
		}catch(ClassCastException e){
			response.getState().enabledErrorApp();
			response.getState().setMessage(e.getCause().getMessage());
			response.getMessage().setInfo("Error interno del servidor. No es posible convertir valor.");
			LOG.info("@Repository :: StoredProcedure :: queryforUpdateInsertDelete :: ClassCastException {}", e.getMessage());
		}catch(RuntimeException e){
			response.getState().enabledErrorApp();
			response.getState().setMessage(e.getCause().getMessage());
			response.getMessage().setInfo("Error interno del servidor.Argumento inválido.");
			LOG.info("@Repository :: StoredProcedure :: queryforUpdateInsertDelete :: ClassCastException {}", e.getMessage());
		}		
		return response;
	}
	
	public ParentVO queryForTruncate(final String storedProcedure, final SqlParameterSource inputParam ){
		LOG.info("@Repository :: StoredProcedure :: queryForTruncate {} with  [{}]  ", storedProcedure, getImputParameters(inputParam));
	
		final SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName(storedProcedure);
		final String result1 = "TRUNCATE";
		
		ParentVO response=new ParentVO();
		
		try{
			
			String truncate=simpleJdbcCall.execute(inputParam).get(result1)+"";
			LOG.info("Mensaje jdbcCall: "+truncate);
		
			response.getState().enabledSuccessBD();
			response.getState().setMessage("Truncado de tabla ::"+storedProcedure+" , info :"+truncate);
		}catch(DataAccessException e){
			//e.printStackTrace();
			LOG.info("@Repository :: StoredProcedure :: queryUpdateInsertDelete :: DataAccessException {}", e.getMessage());

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
			response.getState().enabledErrorApp();
			response.getState().setMessage(e.getCause().getMessage());
			response.getMessage().setInfo("Error interno del servidor. No es posible convertir valor.");
			LOG.info("@Repository :: StoredProcedure :: queryForTruncate :: ClassCastException {}", e.getMessage());
		}catch(RuntimeException e){
			response.getState().enabledErrorApp();
			response.getState().setMessage(e.getCause().getMessage());
			response.getMessage().setInfo("Error interno del servidor.Argumento inválido.");
			LOG.info("@Repository :: StoredProcedure :: queryForTruncate :: ClassCastException {}", e.getMessage());
		}	
		return response;
	}

	
	//insert batch example
	public ParentVO insertBatch(final String storedProcedure,final List<List<String>> registers){
		LOG.info("@Repository :: StoredProcedure :: insertBatch {} with  [{}]  ", storedProcedure, registers.toString());
	 ParentVO response=new ParentVO();
	 
	 String sqlStament=storedProcedure;
	 int i=1;
	
	 try{
		 
		 if(registers.size()>0){
		 while(i<registers.get(0).size()){
			 sqlStament+=" ?,";
			 i++;
		 }
		 sqlStament+=" ?";
		 
		 LOG.info("@Repository :: StoredProcedure :: insertBatch :: sqlStament => {}",sqlStament);

		 
		 int[] updateCounts =jdbcTemplate.batchUpdate(sqlStament, new BatchPreparedStatementSetter() {
		 
			 @Override
			 public void setValues(PreparedStatement ps, int i) throws SQLException {
			  //System.out.println("<< i ="+i+":: "+registers.get(i).toString()+" >>");
				 List<String> register=registers.get(i);
				 int j=1;
				 for(String value:register){
					 ps.setString(j,value);
					 j++;
				 }
			 }

			 @Override
			 public int getBatchSize() {
				 return registers.size();
			 }
		  
		 });
		 
		 response.getState().enabledSuccessBD();
		 response.getState().setMessage("Carga masiva exitosa.");
		 response.getMessage().setInfo(updateCounts.length+"");
		 LOG.info("@Repository :: StoredProcedure :: insertBatch :: Carga batch exitosa => "+updateCounts.length+" registros insertados");
		 }else{
			 LOG.info("@Repository :: StoredProcedure :: insertBatch :: No hay datos a insertar en la BD");
			 response.getState().enabledWarningNoData();
			 response.getState().setMessage("No hay datos a insertar en la BD.");
			 response.getMessage().setInfo("REGISTERS : "+registers.toString());
		 }
	 }catch(DataAccessException e){
		 //e.printStackTrace();
			LOG.info("@Repository :: StoredProcedure :: insertBatch :: DataAccessException {}", e.getMessage());

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
		}catch(IndexOutOfBoundsException e){
			//e.printStackTrace();
			response.getState().enabledErrorApp();
			response.getState().setMessage(e.getCause().getMessage());
			response.getState().setMessage("Error interno del servidor, el indice apunta fuera de los límites.");
			LOG.info("@Repository :: StoredProcedure :: insertBatch :: IndexOutOfBoundsException {}", e.getMessage());
			
		}catch(ClassCastException e){
			response.getState().enabledErrorApp();
			response.getState().setMessage(e.getCause().getMessage());
			response.getState().setMessage("Error interno del servidor. No es posible convertir valor.");
			LOG.info("@Repository :: StoredProcedure :: insertBatch :: ClassCastException {}", e.getMessage());
		}catch(RuntimeException e){
			response.getState().enabledErrorApp();
			response.getState().setMessage(e.getCause().getMessage());
			response.getState().setMessage("Error interno del servidor.Argumento inválido.");
			LOG.info("@Repository :: StoredProcedure :: insertBatch :: ClassCastException {}", e.getMessage());
		}
	 
		return response;
	}

	
	//insert batch example
		/*public ParentVO insertBatchCallable(final String storedProcedure,final List<List<String>> registers){
			LOG.info("@Repository :: StoredProcedure :: insertBatch {} with  [{}]  ", storedProcedure, registers.toString());
		 ParentVO response=new ParentVO();
		 
		 String sqlStament=storedProcedure+"(";
		 int i=1;
		
		 try{
			 
			 if(registers.size()>0){
			 while(i<registers.get(0).size()){
				 sqlStament+=" ?,";
				 i++;
			 }
			 sqlStament+=" ?, ?)";
			 
			 // StoredProcedure :: insertBatch :: sqlStament => SEGV_CargaMasivaPaises ?, ?, ?, ?, ? 
			 * @Pais varchar(100), 
			  * @TipoLista varchar(50),
			  * @Riesgo varchar(20),
			  * @NoUsuario int,
			  * @NombreUsuario varchar(150),
			  * @resultado int output*
			 
			 final String procedureCall = "{call "+sqlStament+" }";
			 LOG.info("@Repository :: StoredProcedure :: insertBatch :: sqlStament => {}",procedureCall);
			 
			 SqlParameter pais = new SqlParameter(Types.VARCHAR);
			 SqlParameter tipoLista = new SqlParameter(Types.VARCHAR);
			 SqlParameter riesgo = new SqlParameter(Types.VARCHAR);
			 SqlParameter noUsuario = new SqlParameter(Types.VARCHAR);
			 SqlParameter nombreUsuario = new SqlParameter(Types.VARCHAR);
			 SqlOutParameter outParameter = new SqlOutParameter("resultado", Types.VARCHAR);
			 		 
			 List<SqlParameter> paramList = new ArrayList<SqlParameter>();
				paramList.add(pais);
				paramList.add(tipoLista);
				paramList.add(riesgo);
				paramList.add(noUsuario);
				paramList.add(nombreUsuario);
				paramList.add(outParameter);	
				
				//System.out.println("**************** BLOQUE DE INSERCION *************************");				
				int totalRegistros=registers.size();
				int checksum=0;
				StringBuilder review=new StringBuilder();
				if(registers!=null && !registers.isEmpty()){
        		   for(List<String> lista:registers){        			   
        			   if(lista!=null && !lista.isEmpty()){
        				//   System.out.println(lista.toString());
        				   final String [] datos=lista.toString().substring(1, lista.toString().length()-1).split(",");        				   
        					Map<String, Object> resultMap = jdbcTemplate.call(new CallableStatementCreator() {
        						@Override
        						public CallableStatement createCallableStatement(Connection connection) throws SQLException {
        							CallableStatement callableStatement = connection.prepareCall(procedureCall);
        							callableStatement.setString(1, datos!=null?datos[0]!=null?datos[0].toString().trim():null:null);
        							callableStatement.setString(2, datos!=null?datos[1]!=null?datos[1].toString().trim():null:null);
        							callableStatement.setString(3, datos!=null?datos[2]!=null?datos[2].toString().trim():null:null);
        							callableStatement.setString(4, datos!=null?datos[3]!=null?datos[3].toString().trim():null:null);
        							callableStatement.setString(5, datos!=null?datos[4]!=null?datos[4].toString().trim():null:null);
        							callableStatement.registerOutParameter(6, Types.VARCHAR);
        							return callableStatement;
        	 
        						}
        					}, paramList);
        					
        					if(resultMap!=null && resultMap.get("resultado")!=null){
        						//System.out.println("Return out value:"+resultMap.get("resultado"));
        						if(resultMap.get("resultado").equals("1")){
        							checksum++;
        						}else{
        							review.append(datos!=null?datos[0]!=null?datos[0].toString().trim():"":"");
        							review.append(",");
        							review.append(datos!=null?datos[1]!=null?datos[1].toString().trim():"":"");
        							review.append(",");
        							review.append(datos!=null?datos[2]!=null?datos[2].toString().trim():"":"");        							
        							review.append("\n");
        						}
        							
        							
        					}
        					
        					
        			   }
        		   }
				}   
				//System.out.println("**************** BLOQUE DE INSERCION *************************");
	        	
			 response.getState().enabledSuccessBD();
			 response.getState().setMessage("Carga Masiva Completada.");
			 
			 if(checksum==totalRegistros)
				 response.getMessage().setInfo("Se insertaron "+checksum+" registros de un total de "+totalRegistros+".");
			 else
				response.getMessage().setInfo("Se insertaron "+checksum+" registros de un total de "+totalRegistros+".\n Los Siguientes registros, ya fueron incorporados previamente:\n"+review);
			 
			 LOG.info("@Repository :: StoredProcedure :: insertBatch :: Carga masiva exitosa => "+0+" registros insertados");
			 }else{
				 LOG.info("@Repository :: StoredProcedure :: insertBatch :: No hay datos a insertar en la BD");
				 response.getState().enabledWarningNoData();
				 response.getState().setMessage("No hay datos a insertar en la BD.");
				 response.getMessage().setInfo("REGISTERS : "+registers.toString());
			 }
		 }catch(DataAccessException e){
			 //e.printStackTrace();
				LOG.info("@Repository :: StoredProcedure :: insertBatch :: DataAccessException {}", e.getMessage());

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
			}catch(IndexOutOfBoundsException e){
				//e.printStackTrace();
				response.getState().enabledErrorApp();
				response.getState().setMessage(e.getCause().getMessage());
				response.getState().setMessage("Error interno del servidor, el indice apunta fuera de los límites.");
				LOG.info("@Repository :: StoredProcedure :: insertBatch :: IndexOutOfBoundsException {}", e.getMessage());
				
			}catch(ClassCastException e){
				response.getState().enabledErrorApp();
				response.getState().setMessage(e.getCause().getMessage());
				response.getState().setMessage("Error interno del servidor. No es posible convertir valor.");
				LOG.info("@Repository :: StoredProcedure :: insertBatch :: ClassCastException {}", e.getMessage());
			}catch(IllegalArgumentException e){
				response.getState().enabledErrorApp();
				response.getState().setMessage(e.getCause().getMessage());
				response.getState().setMessage("Error interno del servidor.Argumento inválido.");
				LOG.info("@Repository :: StoredProcedure :: insertBatch :: ClassCastException {}", e.getMessage());
			}
		 
			return response;
		}*/

	/*Metodo personalizado para la generacion del reporte manual*/
	public TableVO queryForFlag(final String storedProcedure, final SqlParameterSource inputParam ){
		LOG.info("@Repository StoredProcedure queryForTableVO  ");
		LOG.info("@Repository StoredProcedure queryForTableVO {} with  [{}]  ", storedProcedure, getImputParameters(inputParam));
		
		final SimpleJdbcCall simpleJdbcCall = new SimpleJdbcCall(jdbcTemplate).withProcedureName(storedProcedure);
		final String result1 = "FlgRpt";
		
		boolean resultado=false;
		TableVO table =new TableVO();
		try{
			Long execute_start = System.currentTimeMillis();
			resultado = (Boolean)simpleJdbcCall.execute(inputParam).get(result1);
			
			Long execute_end = System.currentTimeMillis();
			LOG.info(" StoredProcedure "+storedProcedure+" executed in "+String.valueOf((execute_end-execute_start)/1000)+" ms with result:" + resultado);
			table.getState().setSuccess(!resultado);
			if(!resultado)
				table.getState().enabledSuccessBD();
			else
				table.getState().enabledError("El reporte para este MTCN ya existe", "alert-warning", "glyphicon glyphicon-exclamation-sign");
		}/*catch(NullPointerException e){
			//e.printStackTrace();
			table.getState().enabledErrorApp();
			table.getState().setMessage(e.getCause().getMessage());
			table.getState().setMessage("Error interno del servidor, se generó una referencia nula.");
			LOG.info("@Repository :: StoredProcedure :: queryForFlag :: NullPointerException {}", e.getMessage());
			
		}*/catch(ClassCastException e){
			table.getState().enabledErrorApp();
			table.getState().setMessage(e.getCause().getMessage());
			table.getState().setMessage("Error interno del servidor. No es posible convertir valor.");
			LOG.info("@Repository :: StoredProcedure :: queryForFlag :: ClassCastException {}", e.getMessage());
		}catch(IllegalArgumentException e){
			table.getState().enabledErrorApp();
			table.getState().setMessage(e.getCause().getMessage());
			table.getState().setMessage("Error interno del servidor.Argumento inválido.");
			LOG.info("@Repository :: StoredProcedure :: queryForFlag :: ClassCastException {}", e.getMessage());
		}catch(IllegalStateException e){
			table.getState().enabledErrorApp();
			table.getState().setMessage(e.getCause().getMessage());
			table.getState().setMessage("Error interno del servidor. No es posible convertir valor.");
			LOG.info("@Repository :: StoredProcedure :: queryForFlag :: ClassCastException {}", e.getMessage());
		}	

		return table;
	}
	
	
}
