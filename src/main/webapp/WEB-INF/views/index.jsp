<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="es" class="ie8" data-ng-app="blankonApp"> <![endif]-->
<!--[if IE 9]> <html lang="es" class="ie9" data-ng-app="blankonApp"> <![endif]-->
<!--[if !IE]><!--> <html lang="es" data-ng-app="pldApp"> <!--<![endif]-->


<%-- START @HEAD --%>
<head>
	<%-- START @META SECTION --%>
	<meta charset="utf-8">
	<meta name="viewport"	content="width=device-width, initial-scale=1, maximum-scale=1"/>
	
	<meta http-equiv='cache-control' content='no-cache'>
	<meta http-equiv='expires' content='0'>
	<meta http-equiv='pragma' content='no-cache'>
	
	<title data-ng-bind="$state.current.data.pageTitle + ' | PLD'"></title>
	<%--/ END META SECTION --%>
	
	<%-- / START VAR RESOURCES --%>
	
	
	<c:url var="appPath" value="/resources/angularProject"/>
	
	<c:set var="myVal" value="${currentUser.fullName}"/>
	<c:set var="myEmp" value="${currentUser.masterKey}"/>
	<c:set var="idPaises" value="${currentUser.idPais}"/>
	
	<c:set var="myUrl" value="<%=request.getContextPath()%>"/>
	
	<c:set var="tree" value="${currentUser}"/>
	<c:set var="version" value="${version}"/>
	<%-- / END VAR RESOURCES --%>
	
	<script>
		var user="${myEmp}";//Numero empleado
		var userName="${myVal}";//Nombre de usuario
		var url="${myUrl}";//contexto de la aplicacion
		var MonitoreoPath="${cmPath}";//ruta del centro de monitoreo
		var idPais="${idPaises}";//id pais de la aplicacion, se modifica en el archivo application.properties
		var tree= JSON.stringify(${tree});//variable con el arbol del menu lateral de la aplicacion
	</script>

 
      <link id="load_css_before"/>
    <link href="${appPath}/css/bundle.min.css" rel="stylesheet">
    <%--Condensado de los estilos de la aplicacion --%>
</head>
<body data-ng-controller="BlankonCtrl" class="page-session page-sound page-header-fixed page-sidebar-fixed">
	<!--[if lt IE 9]>
	<p class="upgrade-browser">Upps!! You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/" target="_blank">upgrade your browser</a> to improve your experience.</p>
	<![endif]-->
	<!-- START @WRAPPER -->

	{{currentUser}}
	<section id="wrapper">
	
		<%-- START @HEADER --%>
        <header data-ng-include="partialsPath+'/header.html'" id="header"></header> <%-- /#header --%>
        <%--/ END HEADER --%>
        
        <%--START @SIDEBAR LEFT --%>
        <aside data-sidebar-left-nicescroll data-sidebar-minimize data-ng-include="partialsPath+'/sidebar-left-2.html'" id="sidebar-left" class="sidebar-circle">
        </aside><%-- /#sidebar-left --%>
        <%--/ END SIDEBAR LEFT --%>
        
        <%-- START @PAGE CONTENT --%>
        <section id="page-content">
        
        	<%-- Start page header --%>
            <div class="header-content" data-ng-include="partialsPath+'/header-content.html'"></div><%-- /.header-content --%>
            <%--/ End page header --%>
            
            <%-- Start body content --%>
            <div data-ui-view class="body-content animated fadeIn" style="height:600px;"></div><%-- /.body-content --%>
            <%--/ End body content --%> 
            <%-- Start footer content --%>
            <footer class="footer-content" data-ng-include="partialsPath+'/footer.jsp'"></footer><%-- /.footer-content --%>
            <%--/ End footer content --%>
        
        </section><%-- /#page-content --%>
        <%--/ END PAGE CONTENT --%>
        
	</section><%-- /#wrapper --%>
    <%--/ END WRAPPER --%>

	<%-- START @BACK TOP --%>
	<div data-back-top id="back-top" class="animated pulse circle">
		<i class="fa fa-angle-up"></i>
	</div><%-- /#back-top --%>
	<%--/ END BACK TOP --%>
	
	<%-- START JAVASCRIPT SECTION (Load javascripts at bottom to reduce load time) --%>
  	
  	<%-- @CORE PLUGINS  CARGA LAS LIBRERIAS INICIALES PARA LA APLICACION--%>
	<script src="${appPath}/js_prod/corePlugins.js?v=${version}"></script>
	
	<%-- @CENTRO DE MONITOREO PLUGINS  CARGA LAS LIBRERIAS INICIALES NECESARIAS PARA DESPLEGAR LAS GRAFICAS DEL CENTRO DE MONITOREO--%>
	<script src="${appPath}/js_prod/cmPlugins.js?v=${version}"></script>
	<%-- @CARGA LOS MODULOS ANGULAR DEL PROYECTO--%>
	<script src="${appPath}/js_prod/appModules.js?v=${version}"></script>
	
	

</body>
</html>