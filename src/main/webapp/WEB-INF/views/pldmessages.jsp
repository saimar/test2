<%@ page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="es">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title data-ng-bind="'Error PLD | PLD'"></title>

	<%-- / START VAR RESOURCES --%>
	<c:url var="appPath" value="/resources/angularProject"/>
	<c:url var="cmPath" value="/resources/centroMonitoreo"/>
	<c:url var="globalImagePath" value="/resources/angularProject/img"/>
	

	
    <link id="load_css_before"/>
    	<link href="${appPath}/css/bundle.min.css" rel="stylesheet">
</head>

<body>			
	<%-- page content --%>
	<center>
	<div class="row">
		<div class="col-md-12">
			<div class="col-middle">
				<div class="error-wrapper">
					<h1>${error}</h1>
					<br/>
					<p>${mensaje}</p>
					<p>
						inicia sesion desde el portal corporativo.</a>
					</p>
					<div class="mid_center">
							<div class="col-xs-12 form-group pull-right top_search">
								<div class="input-group" style="margin: 2px auto;">
									<a href="http://iportal.socio.gs/"> <img
										alt="ir al portal corporativo"
										src="http://iportal.socio.gs/images/grupo_salinas_logo.png">
									</a>
								</div>
							</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</center>
	<%-- /page content --%>

</body>
</html>
