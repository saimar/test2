package com.mx.bancoazteca.pld.jdbc;

import java.io.Serializable;

import org.springframework.http.HttpStatus;

public class State implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3043233500676326179L;
		
	/*
	 * Bandera para indicar exito en el servicio.
	 */
	private Boolean success;
	/*
	 * Bandera para mostrar el estado el servicio.
	 */
	private Boolean show;
	/*
	 * Estilo para el tipo de mensaje a mostrar (Error/Warning).
	 */	
	private String styleMessage;
	/*
	 *Mensaje que se va amostrar 
	 */
	private String message;
	/*
	 * Estilo para el tipo de icono a mostrar (Error/Warning).
	 */	
	private String styleIcon;
	/**
	 * numero de Status de error
	 */
	private HttpStatus statuCode;
	/**
	 * Contructor inicializa propiedades
	 */
	public State() {
		super();
		this.success = false;
		this.show = false;
		this.styleIcon = "fa fa-exclamation-circle";
		this.styleMessage = "alert-warning";
		this.message = "";
		this.statuCode=HttpStatus.INTERNAL_SERVER_ERROR;
	}
	
	/**
	 *  Activa el estado de error en base de datos
	 * 
	 */
	public void enabledErrorBD(){
		this.success = false;
		this.show = true;
		this.styleIcon = "fa fa-exclamation-circle";
		this.styleMessage = "alert-warning";
		this.message = "error.bd";
		this.statuCode=HttpStatus.INTERNAL_SERVER_ERROR;
	}
	
	/**
	 *  Activa el estado de warning en base de datos
	 * 
	 */
	public void enabledWarningBD(){
		this.success = false;
		this.show = true;
		this.styleIcon = "fa fa-exclamation-triangle";
		this.styleMessage = "alert-warning";
		this.message = "warning.bd";
		this.statuCode=HttpStatus.INTERNAL_SERVER_ERROR;
	}
	
	public void enabledWarningNoData(){
		this.success = false;
		this.show = true;
		this.styleIcon = "fa fa-info-circle";
		this.styleMessage = "alert-info";
		this.message = "warning.query.empty";	
		this.statuCode=HttpStatus.BAD_REQUEST;
	}
	
	/**
	 *  Activa el estado de error en el service
	 * 
	 */
	public void enabledErrorApp(){
		this.success = false;
		this.show = true;
		this.styleIcon = "fa fa-info-circle";
		this.styleMessage = "alert-danger";
		this.message = "error.app";
		this.statuCode=HttpStatus.INTERNAL_SERVER_ERROR;
	}
	
	/**
	 *  Activa el estado de warning en el service
	 * 
	 */
	public void enabledWarningApp(){
		this.success = false;
		this.show = true;
		this.styleIcon = "fa fa-exclamation-triangle";
		this.styleMessage = "alert-warning";
		this.message = "warning.app";	
		this.statuCode=HttpStatus.INTERNAL_SERVER_ERROR;
	}
	
	/**
	 *  Activa el estado de warning personalizando mensaje y estilo
	 * @return State
	 */	
	public State enabledWarning(String message,String style, String icon){
		this.success = false;
		this.show = true;
		this.styleIcon = icon;
		this.styleMessage = style;
		this.message = message;
		this.statuCode=HttpStatus.INTERNAL_SERVER_ERROR;
		return this;
	}
	
	/**
	 *  Activa el estado de error personalizando mensaje y estilo
	 * 
	 */
	public void enabledError(String message,String style, String icon){
		this.success = false;
		this.show = true;
		this.styleIcon = icon;
		this.styleMessage = style;
		this.message = message;	
		this.statuCode=HttpStatus.INTERNAL_SERVER_ERROR;
	}
	
	/**
	 *  Activa el estado de exito en la aplicacion
	 * 
	 */
	public void enabledSuccessApp(){
		this.success = true;
		this.show = true;
		this.styleIcon = "fa fa-check";
		this.styleMessage = "alert-success";
		this.message = "success.app";	
		this.statuCode=HttpStatus.OK;
	}
	
	/**
	 *  Activa el estado de exito en la base de datos
	 * 
	 */
	public void enabledSuccessBD(){
		this.success = true;
		this.show = true;
		this.styleIcon = "fa fa-check";
		this.styleMessage = "alert-success";
		this.message = "success.bd";
		this.statuCode=HttpStatus.OK;
	}
	
	/**
	 *  Activa el estado de succes personalizando mensaje y estilo
	 * @return State
	 */	
	public State enabledSuccess(String message,String style, String icon){
		this.success = true;
		this.show = true;
		this.styleIcon = icon;
		this.styleMessage = style;
		this.message = message;
		this.statuCode=HttpStatus.OK;
		return this;
	}
	
	/**
	 * @return the success
	 */
	public Boolean getSuccess() {
	
		if(success){
			this.show = false;			
		}	
		
		return success;
	}

	/**
	 * @param success the success to set
	 */
	public void setSuccess(Boolean success) {
		
		if(success){
			this.show = false;			
		}
		else{
			this.styleMessage = "alert-danger";
			this.message = "error.app";
			this.styleIcon = "icon-error";
			this.show = true;
		}
		
		this.success = success;
	}
	
	/**
	 * @return the show
	 */
	public Boolean getShow() {
		return show;
	}
	
	
	public void setShow(Boolean show) {
		this.show = show;
	}

	/**
	 * @return the styleMessage
	 */
	public String getStyleMessage() {
		return styleMessage;
	}

	/**
	 * @param styleMessage the styleMessage to set
	 */
	public void setStyleMessage(String styleMessage) {
		this.styleMessage = styleMessage;
	}

	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * @return the styleIcon
	 */
	public String getStyleIcon() {
		return styleIcon;
	}

	/**
	 * @param styleIcon the styleIcon to set
	 */
	public void setStyleIcon(String styleIcon) {
		this.styleIcon = styleIcon;
	}

	public HttpStatus getStatuCode() {
		return statuCode;
	}

	public void setStatuCode(HttpStatus statuCode) {
		this.statuCode = statuCode;
	}

	@Override
	public String toString() {
		return "State [success=" + success + ", show=" + show + ", styleMessage=" + styleMessage + ", message="
				+ message + ", styleIcon=" + styleIcon + ", statuCode=" + statuCode + "]";
	}	
	
	
		
}
