package com.mx.bancoazteca.pld.table.manager;

import javax.validation.constraints.NotNull;

public class PaginationParams {
	
	
	//@Size(min=0,max=200)
	private int pageSize;
	//@Size(min=0,max=50000)
	private int currentPage;
	private String searchText;
	private String collumToOrder;
	@NotNull
	private String action;
	private boolean reload;
	
	
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public String getSearchText() {
		return searchText;
	}
	public void setSearchText(String searchText) {
		this.searchText = searchText;
	}
	public String getCollumToOrder() {
		return collumToOrder;
	}
	public void setCollumToOrder(String collumToOrder) {
		this.collumToOrder = collumToOrder;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public boolean isReload() {
		return reload;
	}
	public void setReload(boolean reload) {
		this.reload = reload;
	}
	
	@Override
	public String toString() {
		return "PaginationParams [pageSize=" + pageSize + ", currentPage=" + currentPage
				+ ", searchText=" + searchText + ", collumToOrder=" + collumToOrder + ", action=" + action + ", reload="
				+ reload + "]";
	}
	
}
