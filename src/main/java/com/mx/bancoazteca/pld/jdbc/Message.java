package com.mx.bancoazteca.pld.jdbc;

import java.io.Serializable;

public class Message implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7987606251138691708L;
	/*
	 * Bandera para indicar si se muestra un mensaje
	 */
	private Boolean show;
	/*
	 * Estilo para el mesaje (CSS).
	 */
	private String style;
	/*
	 * Mensaje que se va amostrar.
	 */
	private String info;

	public Message(){
		this.show = false;
		this.style = "message-info";
		this.info = "";
	}

	/**
	 * @param showMessageInfo
	 * @param styleMessage
	 * @param message
	 */
	public Message(Boolean show, String style, String info) {
		super();
		this.show = show;
		this.style = style;
		this.info = info;
	}

	/**
	 * @return the show
	 */
	public Boolean getShow() {
		return show;
	}

	/**
	 * @param show the show to set
	 */
	public void setShow(Boolean show) {
		this.show = show;
	}

	/**
	 * @return the style
	 */
	public String getStyle() {
		return style;
	}

	/**
	 * @param style the style to set
	 */
	public void setStyle(String style) {
		this.style = style;
	}

	/**
	 * @return the info
	 */
	public String getInfo() {
		return info;
	}

	/**
	 * @param info the info to set
	 */
	public void setInfo(String info) {
		this.info = info;
	}

	
}
