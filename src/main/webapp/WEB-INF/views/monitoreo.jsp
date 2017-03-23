<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="es" class="ie8" data-ng-app="blankonApp"> <![endif]-->
<!--[if IE 9]> <html lang="es" class="ie9" data-ng-app="blankonApp"> <![endif]-->
<!--[if !IE]><!--> <html lang="es" > <!--<![endif]-->



<!-- START @HEAD -->
<head>
	<!-- START @META SECTION -->
	<meta charset="utf-8">
	<meta name="viewport"	content="width=device-width, initial-scale=1, maximum-scale=1"/>
	<title data-ng-bind="$state.current.data.pageTitle + ' | PLD'"></title>
	<!--/ END META SECTION -->
	
	<!-- / START VAR RESOURCES -->
	<c:url var="pluginPath" value="/resources/angularProject/plugins/pld"/>
	<c:url var="cssPath" value="/resources/angularProject/css"/>
	<c:url var="appPath" value="/resources/angularProject"/>
	<c:url var="globalImagePath" value="/resources/angularProject/img"/>

	
    <link id="load_css_before"/>
    <link href="${cssPath}/bundle.css" rel="stylesheet">

</head>
  <body >

        <!--[if lt IE 9]>
        <p class="upgrade-browser">Upps!! You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/" target="_blank">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
		<center>
        <!-- START @SIGN WRAPPER -->
        <div id="sign-wrapper">
			<!-- START @ERROR PAGE -->
			<div class="error-wrapper">
			<img src="${globalImagePath}/logo2.png" />
			    <h2>Validacion por monitoreo!</h2>
			    <h3>la aplicacion desplego OK.</h3>
			    <h4></h4>
			</div>
			<!--/ END ERROR PAGE -->
			<!--/ END ERROR PAGE -->
			
        </div><!-- /#sign-wrapper -->
        </center>
        <!--/ END SIGN WRAPPER -->	
	</body>
</html>