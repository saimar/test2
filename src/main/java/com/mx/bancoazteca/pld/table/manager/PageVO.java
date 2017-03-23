package com.mx.bancoazteca.pld.table.manager;

import java.util.List;
import java.util.Map;

import com.mx.bancoazteca.pld.jdbc.TableVO;

public class PageVO extends TableVO{
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 6655098353343230042L;
	private int totalRows;
	private int maxPages;
	private boolean paginated;
	
	public PageVO() {
		super();
		this.paginated=true;
		// TODO Auto-generated constructor stub
	}
	public PageVO(List<Map<String, Object>> resultset) {
		super(resultset);
		// TODO Auto-generated constructor stub
	}
	public int getTotalRows() {
		return totalRows;
	}
	public void setTotalRows(int totalRows) {
		this.totalRows = totalRows;
	}

	public int getMaxPages() {
		return maxPages;
	}
	public void setMaxPages(int maxPages) {
		this.maxPages = maxPages;
	}

	public boolean isPaginated() {
		return paginated;
	}
	public void setPaginated(boolean paginated) {
		this.paginated = paginated;
	}
	@Override
	public String toString() {
		return "PageVO [totalRows=" + totalRows + ", maxPages=" + maxPages + ", paginated=" + paginated + "]";
	}
	
}
