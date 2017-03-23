package com.mx.bancoazteca.pld.util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class QueryRow implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private List<Object> fields;

	public QueryRow(List<Object> fields) {
		super();
		this.fields = fields;
	}

	public QueryRow() {
		super();
	}

	public List<Object> getFields() {
		if (null == this.fields) {
			this.fields = new ArrayList<Object>();
		}
			
		return fields;
	}

	@Override
	public String toString() {
		return "QueryRow [fields=" + fields + "]";
	}
	
}