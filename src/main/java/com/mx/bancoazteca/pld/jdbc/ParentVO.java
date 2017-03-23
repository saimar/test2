package com.mx.bancoazteca.pld.jdbc;

import java.io.Serializable;

public class ParentVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3043233500676326179L;

	/*
	 * Estado del Value Object
	 */
	private State state;
	/*
	 * Mensaje del Value Object
	 */
	private Message message;
	
	/**
	 * Constructor
	 * Inicializa objetos 
	 */
	public ParentVO(){
		super();
		this.state = new State();
		this.message = new Message();
	}	

	/**
	 * @return the state
	 */
	public State getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(State state) {
		this.state = state;
	}

	/**
	 * @return the message
	 */
	public Message getMessage() {
		return message;
	}

	/**
	 * @param message the message to set
	 */
	public void setMessage(Message message) {
		this.message = message;
	}
	
	
}
