<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<c:url var="cmPath" value="/resources/centroMonitoreo"/>
<style>
@media ( max-width : 1600px) .panel-title {
	font-size:1vmin	!important;
	font-weight:800	!important;
}

.body-content {
	background-color: #eeeeef;
	padding: 0px;
	min-height: inherit;
	position: relative;
}

.panel-body {
	padding: 0px;
	color: #fff;
	font-size: 1vmin;
}

.btn-default {
	background-image: -webkit-linear-gradient(#020202, #101112 40%, #141618);
	background-image: -o-linear-gradient(#020202, #101112 40%, #141618);
	background-image: -webkit-gradient(linear, left top, left bottom, from(#020202),
		color-stop(40%, #101112), to(#141618));
	background-image: linear-gradient(#020202, #101112 40%, #141618);
	background-repeat: no-repeat;
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff020202',
		endColorstr='#ff141618', GradientType=0);
	-webkit-filter: none;
	filter: none;
}

.btn-default:hover {
	background-image: -webkit-linear-gradient(#020202, #101112 40%, #141618);
	background-image: -o-linear-gradient(#020202, #101112 40%, #141618);
	background-image: -webkit-gradient(linear, left top, left bottom, from(#020202),
		color-stop(40%, #101112), to(#141618));
	background-image: linear-gradient(#020202, #101112 40%, #141618);
	background-repeat: no-repeat;
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff020202',
		endColorstr='#ff141618', GradientType=0);
	-webkit-filter: none;
	filter: none;
}

.btn, .btn:hover {
	border-color: rgba(0, 0, 0, 0.6);
	text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
}

.btn-default:hover {
	color: #ffffff;
	background-color: #232628;
	border-color: #1e2023;
}

.btn:hover, .btn:focus, .btn.focus {
	color: #ffffff;
	text-decoration: none;
}
</style>

</head>
<body>
	<%-- Graficas Centro de Monitoreo --%>
	<script src="${cmPath}/js/charts/Mapas.js?v=${version}"></script>
	<script src="${cmPath}/js/charts/Proveedores.js?v=${version}"></script>
	<script src="${cmPath}/js/charts/CifrasControl.js?v=${version}"></script>
	<script src="${cmPath}/js/charts/SeguimientoAnalisisActual.js?v=${version}"></script>
	<%-- Administrador de vistas moviles --%>
	<script src="${cmPath}/js/carousel/AdministradorCarousel.js?v=${version}"></script>
	<script src="${cmPath}/js/CarouselAdministrator.js?v=${version}"></script>
	<script type="text/javascript">
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) { dd='0'+dd }
	if(mm<10) { mm='0'+mm }
	var fecha=yyyy+'-'+mm+'-'+dd;
	
		instanciaCM=new AdministradorCarousel();
	</script>
	<div class="row" style="height: 660px; width: 100%;">
		<div class="col-md-12" style="height: 100%; width: 100%;">
			<div class="dynamicChartContainer" style="height: 100%; width: 100%;">
				<div class="contenedor" style="height: 100%; width: 100%;">
					
				</div>
			</div>
			<!-- Controls -->
			<div class="navContainer" style=" width: 99%;">
				<ul class="pager">
					<li>
						<button type="button" class="btn btn-default btnBackward" aria-label="Left Align" style="background:#295179">
							<i class="fa fa-backward fa-3" style="color: #ceddeb"></i>
						</button>

						<button type="button" value="pausa" class="btn btn-default btnPause" aria-label="Left Align" style="background:#295179">
							<i class="fa fa-pause fa-3" style="color: #ceddeb"></i>
						</button>

						<button type="button" value="play" class="btn btn-default btnPlay"	aria-label="Left Align" style="background:#295179">
							<i class="fa fa-play fa-3" style="color: #ceddeb"></i>
						</button>

						<button type="button" value="siguiente"	class="btn btn-default btnForward" aria-label="Left Align" style="background:#295179">
							<i class="fa fa-forward fa-3" style="color: #ceddeb"></i>
						</button>
					</li>
				</ul>
			</div>
		</div>
	</div>

</body>
</html>