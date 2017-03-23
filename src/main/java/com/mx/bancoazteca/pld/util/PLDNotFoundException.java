package com.mx.bancoazteca.pld.util;

public class PLDNotFoundException extends Exception {
private static final long serialVersionUID = 1L;

private String msg;
  public PLDNotFoundException(String msg) {
	  this.msg = msg;
  }
  public String getPLDMessage() {
	  return msg;
  }
}
