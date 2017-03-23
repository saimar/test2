package com.mx.bancoazteca.pld.util;

import java.io.Serializable;

public class ColumnHeader implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String 	name;
	private Integer type;

	public ColumnHeader() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "ColumnHeader [name=" + name + ", type=" + type + "]";
	}
	
}

