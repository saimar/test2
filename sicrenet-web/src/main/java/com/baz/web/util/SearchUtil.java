package com.baz.web.util;

import java.util.List;

import com.baz.commons.domain.CatPanelView;

public class SearchUtil {
	
	public static CatPanelView findCustomerByid(String nombre, List<CatPanelView> listCatPanelView){    
	    for (CatPanelView catPanelView : listCatPanelView) {
	        if (nombre.equals(catPanelView.getNombre())) {
	            return catPanelView;
	        }
	    }
	    return null; 
	}
	
}
