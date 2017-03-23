package com.mx.bancoazteca.pld.security;

import java.io.Serializable;

public class ApplicationTool implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Integer idModule;
	private Integer idTool;
	private String tool;
	private Integer privilege;
	private String level;
	
	public ApplicationTool() {
		super();
	}

	public Integer getIdModule() {
		return idModule;
	}

	public void setIdModule(Integer idModule) {
		this.idModule = idModule;
	}

	public Integer getIdTool() {
		return idTool;
	}

	public void setIdTool(Integer idTool) {
		this.idTool = idTool;
	}

	public String getTool() {
		return tool;
	}

	public void setTool(String tool) {
		this.tool = tool;
	}

	public Integer getPrivilege() {
		return privilege;
	}

	public void setPrivilege(Integer privilege) {
		this.privilege = privilege;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	@Override
	public String toString() {
		return "ApplicationTool [idModule=" + idModule + ", idTool=" + idTool
				+ ", tool=" + tool + ", privilege=" + privilege + ", level="
				+ level + "]";
	}
	
	

}