<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="es" class="ie8" data-ng-app="blankonApp"> <![endif]-->
<!--[if IE 9]> <html lang="es" class="ie9" data-ng-app="blankonApp"> <![endif]-->
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>ERROR: PLD REMESAS</title>

<%-- / START VAR RESOURCES --%>
	<c:url var="appPath" value="/resources/angularProject"/>
	<c:url var="cmPath" value="/resources/centroMonitoreo"/>
	<c:url var="globalImagePath" value="/resources/angularProject/img"/>
	

	
    <link id="load_css_before"/>
    	<link href="${appPath}/css/bundle.min.css" rel="stylesheet">
</head>
<body>
	<div id="sign-wrapper">
		<%-- START @ERROR PAGE --%>
		<div class="error-wrapper">
			<h1>${error}</h1>
			<h2>${mensaje}</h2>
			
			<div class="mid_center">


				<div class="col-xs-12 form-group pull-right top_search">
					<div class="input-group" style="margin: 2px auto;">
						<a href="http://iportal.socio.gs/"> 
						<img alt="ir al portal corporativo"
							src="http://iportal.socio.gs/images/grupo_salinas_logo.png"></a>
					</div>
				</div>
			</div>
		</div>
	</div>

</body>
</html>