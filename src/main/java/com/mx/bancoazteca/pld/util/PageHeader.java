package com.mx.bancoazteca.pld.util;

public class PageHeader {

	public String icon;
	public String title;
	public String subtitle;
	public String mapping;
	
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSubtitle() {
		return subtitle;
	}
	public void setSubtitle(String subtitle) {
		this.subtitle = subtitle;
	}
	public String getMapping() {
		return mapping;
	}
	public void setMapping(String mapping) {
		this.mapping = mapping;
	}
	@Override
	public String toString() {
		return "[icon=" + icon + ", title=" + title + ", subtitle=" + subtitle + ", mapping=" + mapping+ "]";
	}
	
}
