package com.mx.bancoazteca.pld.web.controllers;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
public class TestConnection {

	private static final Logger LOG = LoggerFactory.getLogger(TestConnection.class);
	
	public TestConnection( JdbcTemplate jdbc){
		//LOG.info(" ->>> TestConnection <<<- ");
		//LOG.info("->"+jdbc);
		
//		try {
//			LOG.info( jdbc.getDataSource().getConnection().getMetaData().getURL());
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			//e.printStackTrace();
//		}
		Long execute_start = System.currentTimeMillis();
		List<Map<String,Object>> empRows = jdbc.queryForList("select top 1 * from sys.objects");
		Long execute_end = System.currentTimeMillis();
		LOG.info("Test conection to "+jdbc.getDataSource().getClass()+"  Tiempo de ejecucion :"+String.valueOf((execute_end-execute_start))+" ms " );
		
		for(Map<String,Object> empRow : empRows){
			//LOG.info("->>>"+empRow.get("NAME"));
		}
	}
	
}
