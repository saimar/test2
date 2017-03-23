package com.baz.commons.domain;

public class RelacionVistasArbol {
	
	private String vista;
	private int id;
	
	public RelacionVistasArbol(){
		
	}
	
	public RelacionVistasArbol(String vista, int id){
		this.vista=vista;
		this.id=id;
	}

	public String getVista() {
		return vista;
	}

	public void setVista(String vista) {
		this.vista = vista;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	 @Override
	    public String toString() {
	        return ""+id;
	    }
	 
	

}
