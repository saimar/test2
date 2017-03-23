package com.mx.bancoazteca.pld.jdbc;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public class TableVO extends ParentVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6204165017474349751L;
	
	protected static final Logger LOG = LoggerFactory.getLogger(TableVO.class);
	

	/*
	 * Total de Filas de la Consulta
	 */
	protected int rowCount;

	protected JSONArray jsonResult = new JSONArray();

	protected JSONArray jsonHeadersDesc = new JSONArray();

	protected JSONObject jsonHeaders = new JSONObject();

	protected List<Map<String, Object>> resultset;
	
	private boolean paginated;
	
	
	public TableVO() {
		this.resultset=new ArrayList<Map<String,Object>>();
	}
	
	public TableVO(List<Map<String, Object>> resultset) {
		super();
		this.resultset=resultset;
		this.rowCount=resultset.size();
		//buildJson();
	}
	
	public void clear(){
		jsonResult.clear();
		jsonHeadersDesc.clear();
		jsonHeaders.clear();
	}
	/**
	 * @return the rowCount
	 */
	public int getRowCount() {
		return rowCount;
	}

	/**
	 * @param rowCount
	 *            the rowCount to set
	 */
	public void setRowCount(int rowCount) {
		this.rowCount = rowCount;
	}
	
		
	public JSONArray getJsonHeadersDesc() {

		return jsonHeadersDesc;
	}

	public JSONArray getJsonResult() {

		return jsonResult;
	}

	public JSONObject getJsonHeaders() {

		return jsonHeaders;
	}

	
	public List<Map<String, Object>> getResultset() {
		return resultset;
	}

	public void setResultset(List<Map<String, Object>> resultset) {
		this.resultset.clear();
		this.resultset = resultset;
		this.setRowCount(resultset.size());
		//buildJson();
	}
	
	public boolean isPaginated() {
		return paginated;
	}

	public void setPaginated(boolean paginated) {
		this.paginated = paginated;
	}

	@SuppressWarnings("unchecked")
	public void buildJson() {
		this.clear();
		this.setRowCount(resultset.size());
		if (resultset.size() > 0) {
			//--Result values
			for (Map<String, Object> map : resultset) {
				JSONObject obj = new JSONObject();
				
				for (String key : map.keySet()) {
					Object objKey = (map.get(key) != null ? map.get(key) : null);
					obj.put(sanitizeColumnName(key), objKey);
					
				}
				this.jsonResult.add(obj);
			}
			
			//--Columns names
			for (String key : resultset.get(0).keySet()) {
				
				this.jsonHeaders.put( this.sanitizeColumnName(key.toString()),key.toString());				
				JSONObject header = new JSONObject();
				header.put("name",this.sanitizeColumnName(key.toString()));
				header.put("value",key.toString());
				this.jsonHeadersDesc.add(header);
				
			}
			
		}
	}
	
	/**
	 * Se agrega la validacion de las herramientas, con esto se muestran o se ocultan
	 */
	@SuppressWarnings("unchecked")
	public void buildJson(Map<String, Object> moduleTools) {
		this.clear();
		this.setRowCount(resultset.size());
		if (resultset.size() > 0) {
			
			
			//--Build the result values
			for (Map<String, Object> map : resultset) {
				JSONObject obj = new JSONObject();
				for (String key : map.keySet()) {
					Object objKey = (map.get(key) != null ? map.get(key) : null);
					if(moduleTools.get(sanitizeColumnName(key))!=null){
						int privilegio=(Integer) moduleTools.get(sanitizeColumnName(key));
						if(privilegio!=0)
							obj.put(sanitizeColumnName(key), objKey);
					}else{
						obj.put(sanitizeColumnName(key), objKey);
					}
					
				}
				this.jsonResult.add(obj);
			}
			
			
			//build the headers
			
			for (String key : resultset.get(0).keySet()) {
				
				if(moduleTools.get(sanitizeColumnName(key))!=null){
					int privilegio=(Integer) moduleTools.get(sanitizeColumnName(key));
					if(privilegio!=0){
						this.jsonHeaders.put( this.sanitizeColumnName(key.toString()),key.toString());
						JSONObject header = new JSONObject();
						header.put("name",this.sanitizeColumnName(key.toString()));
						header.put("value",key.toString());
						header.put("tool",sanitizeColumnName(key).toLowerCase());
						this.jsonHeadersDesc.add(header);	
					}	
				}else{
					this.jsonHeaders.put( this.sanitizeColumnName(key.toString()),key.toString());
					JSONObject header = new JSONObject();
					header.put("name",this.sanitizeColumnName(key.toString()));
					header.put("value",key.toString());
					header.put("tool",null);
					this.jsonHeadersDesc.add(header);	
				}	
			}	
		}
	}
	
	
	
	@SuppressWarnings("unchecked")
	public void setHeader(String headerName,String tool) {
		this.jsonHeaders.put( this.sanitizeColumnName(headerName),headerName);
		
		JSONObject header = new JSONObject();	
		header.put("name", this.sanitizeColumnName(headerName));
		header.put("value",headerName);
		header.put("order",this.jsonHeaders.size());
		header.put("tool",tool);
		this.jsonHeadersDesc.add(header);
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

	@Override
	public String toString() {
		return "TableVO [rowCount=" + rowCount + ", jsonHeadersDesc=" + jsonHeadersDesc+
				", paginated=" + paginated + "]";
	}	
	
	
}
