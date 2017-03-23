package com.mx.bancoazteca.pld.jdbc;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.mx.bancoazteca.pld.util.ColumnHeader;
import com.mx.bancoazteca.pld.util.QueryRow;



public class TableVOGrafics extends TableVO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private List<QueryRow> queryResult = new ArrayList<QueryRow>();
	
	private List<ColumnHeader> headers = new ArrayList<ColumnHeader>();
	
	private JSONObject jsonResultTree= new JSONObject();
		
	public JSONObject getJsonResultTree() {
		return jsonResultTree;
	}

	public void setJsonResultTree(JSONObject jsonResultTree) {
		this.jsonResultTree = jsonResultTree;
	}
	
	public List<ColumnHeader> getHeaders() {
		return headers;
	}
	
	public void setHeaders(List<ColumnHeader> headers) {
		this.headers = headers;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public void buildJson() {
		
		this.setRowCount(resultset.size());
		if (resultset.size() > 0) {
			//--Result values
			for (Map<String, Object> map : resultset) {
				JSONObject obj = new JSONObject();
				QueryRow row= new QueryRow();
				//System.out.println("--------------");
				
				for (String key : map.keySet()) {
					Object objKey = (map.get(key) != null ? map.get(key) : null);
					obj.put(sanitizeColumnName(key), objKey);
					row.getFields().add(objKey);
				}
				
				this.queryResult.add(row);
				this.jsonResult.add(obj);
			}
			//--Columns names
			
			for (String key : resultset.get(0).keySet()) {
				
				this.jsonHeaders.put( this.sanitizeColumnName(key.toString()),key.toString());
				JSONObject header = new JSONObject();
				header.put("name", key.toString());
				header.put("value", this.sanitizeColumnName(key.toString()));
				this.jsonHeadersDesc.add(header);
				
				ColumnHeader myHeader= null;	
				myHeader= new ColumnHeader();				
				myHeader.setName(key.toString());
				myHeader.setType(1);
				this.getHeaders().add(myHeader);
			}
			
			
		} else {
			this.getState().enabledWarningNoData();
		}
	}
	
	public List<QueryRow> getQueryResult() {
		return queryResult;
	}
	
	public void buildJsonTree(){
		try{
			this.jsonResultTree = getJson(1,this.getResultset(),"1","0","options","",false);
		}catch(ClassCastException e){
			LOG.info("@Repository :: StoredProcedureDEX :: queryForTableVO :: ClassCastException {}", e.getMessage());
		}catch(IllegalArgumentException e){			
			LOG.info("@Repository :: StoredProcedureDEX :: queryForTableVO :: IllegalArgumentException {}", e.getMessage());
		}catch(IllegalStateException e){			
			LOG.info("@Repository :: StoredProcedureDEX :: queryForTableVO :: IllegalStateException {}", e.getMessage());
		}catch(IndexOutOfBoundsException e){
			LOG.info("@Repository :: StoredProcedureDEX :: queryForTableVO :: IndexOutOfBoundsException {}", e.getMessage());
		}/*catch(RuntimeException ex){
			//ex.printStackTrace();
			LOG.info("Exception {} ", ex.getMessage());
		}*/
	}
	
	
	@SuppressWarnings("unchecked")
	protected JSONObject getJson(int level,  List<Map<String, Object>> queryResult , String id,String idPadre,String data,String value,boolean isArray){
		
		JSONObject json = new JSONObject();
		
		JSONArray jsonArray   = new JSONArray();
		JSONObject jsonSimple = new JSONObject();

		for( Map<String, Object> queryRow : queryResult ){
			if(queryRow.get("idPadre")!=null ?queryRow.get("idPadre").toString().equalsIgnoreCase(id):false){
				String _id      = queryRow.get("id").toString();
				String _idPadre = queryRow.get("idPadre").toString();
				String _data    = queryRow.get("nombre").toString();
				String _value   = queryRow.get("valor").toString();
				
				boolean _isArray=false;
				if(_value.equalsIgnoreCase("array")){
					_isArray=true;
					_value="";
				}				
				if(isArray){
					//JSONObject jsonTmp = getJson(level+1, queryResult , _id,_idPadre,_data,_value,_isArray);
					//Object array=jsonTmp.get("array");
					jsonArray.add(getJson(level+1, queryResult , _id,_idPadre,_data,_value,_isArray).get("array"));
				}else{
					jsonSimple.putAll(getJson(level+1, queryResult , _id,_idPadre,_data,_value,_isArray));
				}
			}
		}
		if(isArray && jsonArray.size()>0){
			json.put( data,jsonArray);
		}else if (jsonSimple.size()>0){
			json.put( data,jsonSimple);
		}else{
			if(value.equalsIgnoreCase("true")||value.equalsIgnoreCase("false")){
				json.put( data, Boolean.valueOf(value));
			}else if(value.equalsIgnoreCase("null")){
				json.put( data, null);
			} else{
				json.put( data,value);
			}
		}
		return json;
	}
	

	
}
