package com.mx.bancoazteca.pld.web.rest.model;

import java.util.Map;

import com.mx.bancoazteca.pld.table.manager.ParamNotFoundException;

public class PldParams {
	private Map<String,String> params;
	private String keyTable;
	
	public String getKeyTable() {
		return keyTable;
	}

	public void setKeyTable(String keyTable) {
		this.keyTable = keyTable;
	}

	public Map<String, String> getParams() {
		return params;
	}

	public void setParams(Map<String, String> params) {
		this.params = params;
	}

	public String getParam(String key) throws ParamNotFoundException{
		if(this.params.get(key)!=null){
			return this.params.get(key);
		}else{
			throw new ParamNotFoundException("El parametro "+key+" no pudo ser asociado.");
			//return "El parametro no fue recuperado";
		}
	}
	
	public boolean isContains(String parameter){
		if(this.params.get(parameter)!=null){
			return true;
		}else{
			return false;
		}
	}

	@Override
	public String toString() {
		return "PldParams [params=" + params + ", keyTable=" + keyTable + "]";
	}
	
	
}
