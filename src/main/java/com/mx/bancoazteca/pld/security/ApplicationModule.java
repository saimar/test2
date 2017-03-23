package com.mx.bancoazteca.pld.security;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class ApplicationModule implements Serializable {
	private static final long serialVersionUID = 1L;

	private String rol;
	private Integer idModule;
	private Integer idParent;
	private Integer idOrder;
	private String description;
	private String image;
	private String mapping;
	private Boolean active;
	private String directory;
	private Integer IdPerfil;
	private String error;
	private List<ApplicationTool> tools;
	private List<ApplicationModule> children;

	public List<ApplicationModule> getChildren() {
		return children;
	}

	public void setChildren(List<ApplicationModule> children) {
		this.children = children;
	}

	public Integer getIdPerfil() {
		return IdPerfil;
	}

	public void setIdPerfil(Integer idPerfil) {
		IdPerfil = idPerfil;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public ApplicationModule() {
		super();
	}

	public Integer getIdModule() {
		return idModule;
	}

	public void setIdModule(Integer idModule) {
		this.idModule = idModule;
	}

	public Integer getIdParent() {
		return idParent;
	}

	public void setIdParent(Integer idParent) {
		this.idParent = idParent;
	}

	public Integer getIdOrder() {
		return idOrder;
	}

	public void setIdOrder(Integer idOrder) {
		this.idOrder = idOrder;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getMapping() {
		return mapping;
	}

	public void setMapping(String mapping) {
		this.mapping = mapping;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getDirectory() {
		return directory;
	}

	public void setDirectory(String directory) {
		this.directory = directory;
	}

	public List<ApplicationTool> getTools() {
		if (null == this.tools) {
			this.tools = new ArrayList<ApplicationTool>();
		}

		return this.tools;
	}
	

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	@Override
	public String toString() {
		return "ApplicationModule [rol=" + rol + ", idModule=" + idModule + ", idParent=" + idParent + ", idOrder="
				+ idOrder + ", description=" + description + ", image=" + image + ", mapping=" + mapping + ", active="
				+ active + ", directory=" + directory + ", IdPerfil=" + IdPerfil + ", error=" + error + ", tools="
				+ tools + ", children=" + children + "]";
	}

	

}