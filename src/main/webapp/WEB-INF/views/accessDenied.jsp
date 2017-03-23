<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<%--[if IE 8]> <html lang="es" class="ie8" data-ng-app="blankonApp"> <![endif]--%>
<%--[if IE 9]> <html lang="es" class="ie9" data-ng-app="blankonApp"> <![endif]--%>
<%--[if !IE]><%--%> <html lang="es" > <%--<![endif]--%>



<%-- START @HEAD --%>
<head>
	<%-- START @META SECTION --%>
	<meta charset="utf-8">
	<meta name="viewport"	content="width=device-width, initial-scale=1, maximum-scale=1"/>
	<title data-ng-bind="'Error Sesion | PLD'"></title>
	<%--/ END META SECTION --%>
	
	<c:url var="appPath" value="/resources/angularProject"/>
	<c:url var="cmPath" value="/resources/centroMonitoreo"/>
	<c:url var="globalImagePath" value="/resources/angularProject/img"/>
	
	<link id="load_css_before"/>
    	<link href="${appPath}/css/bundle.min.css" rel="stylesheet">
</head>
  <body class="page-session page-sound page-header-fixed page-sidebar-fixed" >
<center>
        <%--[if lt IE 9]>
        <p class="upgrade-browser">Upps!! You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/" target="_blank">upgrade your browser</a> to improve your experience.</p>
        <![endif]--%>

        <%-- START @SIGN WRAPPER --%>
        <div id="sign-wrapper">
			<%-- START @ERROR PAGE --%>
			<div class="error-wrapper">
			<img src="${globalImagePath}/logo2.png" />
			    <h2>Acceso denegado</h2>
			    <h3>Error al iniciar sesion o tu sesion ha expirado.</h3>
			    <h4>Si deseas entrar nuevamente hazlo desde el portal corporativo.</h4>
			    <div class="col-xs-12 form-group pull-right top_search">
					<div class="input-group" style="margin: 2px auto;">
						<a href="http://iportal.socio.gs/"> 
						<img alt="ir al portal corporativo"
							src="http://iportal.socio.gs/images/grupo_salinas_logo.png"></a>
					</div>
				</div>
			</div>
			<%--/ END ERROR PAGE --%>
			<%--/ END ERROR PAGE --%>
			
        </div><%-- /#sign-wrapper --%>
        <%--/ END SIGN WRAPPER --%>	
</center>        
</body>
</html>