package com.mx.bancoazteca.pld.table.manager;


/*Excepcion generica usada para la clase PaginationParams cuando un parametro no puede ser recuperado*/
public class ParamNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	private String msg;
	  public ParamNotFoundException(String msg) {
		  super(msg);
		  this.msg=msg;
	  }
	  
	  public ParamNotFoundException(String message,Throwable cause){
		  super(message, cause);
	  }
	  
	  public void setMsgException(String msgException){
		  this.msg=msgException;
	  }
	  
	  public String getMsgException() {
		  return msg;
	  }
	}