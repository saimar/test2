/**
 * Service para las operaciones del modulo Reportes
 */
(function(){
	angular.module('serviceAppBModuloReportes',[])
	.factory('appBModuloReportes',[ '$http', '$q', '$filter', function($http, $q, $filter) {
		//variable para manejo de errores
		var networkError={state:{success:false, show:true, message:'Error de conexión', styleMessage:'alert-danger', styleIcon:'fa fa-frown-o',},
				message:{show:false,	style:'message-info',info:'Error de conexión, es posible que no este conectado a la red o que el servidor no se encuentre disponible momentaneamente',}
				}
		//cvariable recuperada del Index y que agrega el contexto de la aplicacion.
		var context=url+'/restAppBModuloReportes';
	
		function consultaTiposReporte(catalogo){
	  		console.log('appBModuloReportes :: consultaDatosReporte :: RUNNING');
	  		var deferred = $q.defer();
	  		
	  		var cat=(catalogo==undefined || catalogo==null)?'':catalogo;
	  			// SP : SEGD_ConsultaCatTiposDeReporte
	  			// type : GET
	  		$http.get(context+'/consulta/tiposReporte?catalogo='+catalogo)
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: consultaTiposReporte :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: consultaTiposReporte :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
		}
		
		function consultaTrimestres(){
	  		console.log('appBModuloReportes :: consultaTrimestres :: RUNNING');
	  		var deferred = $q.defer();
	  		
	  			// SP : SEGD_ConsultaCatTrimestres
	  			// type : GET
	  		$http.get(context+'/consulta/Trimestres')
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: consultaTrimestres :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: consultaTrimestres :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
		}
		
		function consultaReportado(movimiento){
	  		console.log('appBModuloReportes :: consultaReportado :: RUNNING');
	  		var deferred = $q.defer();
	  		
	  		var mov=(movimiento==undefined || movimiento==null)?'0':movimiento;
	  			// SP : SEGD_ConsultaSiMovimientoReportado
	  			// type : GET
	  		$http.get(context+'/consulta/Reportado?movimiento='+mov)
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: consultaReportado :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: consultaReportado :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
		}
		
		function cargaSeleccionados(reportParams){
	  		console.log('appBModuloReportes :: cargaSeleccionados :: RUNNING');
	  		var deferred = $q.defer();
	
	  			// SP : SEGD_GeneraReporte
	  			// type : POST
	  		$http.post(context+'/carga/Seleccionados',reportParams)
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: cargaSeleccionados :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: cargaSeleccionados :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
		}
	
		function consultaDatosReporte(tableparams){
	  		console.log('appBModuloReportes :: consultaDatosReporte :: RUNNING');
	  		var deferred = $q.defer();
	
	  			// SP : SEGD_ConsultaDatosParaReporte
	  			// type : POST
	  		$http.post(context+'/consulta/DatosReporte',tableparams)
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: consultaDatosReporte :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: consultaDatosReporte :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
		}


	function generaReporteManual(tableparams){
  		console.log('appBModuloReportes :: generaReporteManual :: RUNNING');
  		var deferred = $q.defer();

  			// SP : SEGD_GuardaMovimientoReporte
  			// type : POST
  		$http.post(context+'/genera/ReporteManual',tableparams)
  			.success(function(data) {
  				console.debug('appBModuloReportes :: generaReporteManual :: SUCCESS');
  				deferred.resolve(data);
  			}).error(function(data,status) {
  				console.error('appBModuloReportes :: generaReporteManual :: ERROR');
  				console.debug("HTML STATUS: "+status);
  				if(status===0){
  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
  					deferred.reject(networkError);
  				}else{
  					console.error(data);
  					deferred.reject(data);}
  			});

		return deferred.promise;
	}
		
	function consultaMovimientosReportados(tableparams){
	  		console.log('appBModuloReportes :: consultaMovimientosReportados :: RUNNING');
	  		var deferred = $q.defer();
	
	  			// SP : SEGD_ConsultaMovReportados
	  			// type : POST
	  		$http.post(context+'/consulta/MovimientosReportados',tableparams)
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: consultaMovimientosReportados :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: consultaMovimientosReportados :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
	}
	
	
	function consultaReportes(tableparams){
	  		console.log('appBModuloReportes :: consultaReportes :: RUNNING');
	  		var deferred = $q.defer();
	
	  			// SP : SEGD_ConsultaReportes
	  			// type : POST
	  		$http.post(context+'/consulta/Reportes',tableparams)
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: consultaReportes :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: consultaReportes :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
	}
	
	function descartaReporte(report){
  		console.log('appBModuloReportes :: descartaReporte :: RUNNING');
  		var deferred = $q.defer();

  			// SP : SEGD_EliminaReporte
  			// type : POST
  		$http.post(context+'/descarta/Reporte',report)
  			.success(function(data) {
  				console.debug('appBModuloReportes :: descartaReporte :: SUCCESS');
  				deferred.resolve(data);
  			}).error(function(data,status) {
  				console.error('appBModuloReportes :: descartaReporte :: ERROR');
  				console.debug("HTML STATUS: "+status);
  				if(status===0){
  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
  					deferred.reject(networkError);
  				}else{
  					console.error(data);
  					deferred.reject(data);}
  			});

		return deferred.promise;
	}
	
	
	function detalleReportes(tableparams){
	  		console.log('appBModuloReportes :: detalleReportes :: RUNNING');
	  		var deferred = $q.defer();
	
	  			// SP : SEGD_ConsultaReportesDetalle
	  			// type : POST
	  		$http.post(context+'/detalle/Reportes',tableparams)
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: detalleReportes :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: detalleReportes :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
	}
	
	
	function consultaReportesHistorial(tableparams){
	  		console.log('appBModuloReportes :: consultaReportesHistorial :: RUNNING');
	  		var deferred = $q.defer();
	
	  			// SP : SEGD_ConsultaReportesHistorial
	  			// type : POST
	  		$http.post(context+'/consulta/ReportesHistorial',tableparams)
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: consultaReportesHistorial :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: consultaReportesHistorial :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
	}
	
	
	function detalleReportesHistorial(tableparams){
	  		console.log('appBModuloReportes :: detalleReportesHistorial :: RUNNING');
	  		var deferred = $q.defer();
	
	  			// SP : SEGD_ConsultaReportesHistorialDetalle
	  			// type : POST
	  		$http.post(context+'/detalle/ReportesHistorial',tableparams)
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: detalleReportesHistorial :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: detalleReportesHistorial :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
	}
	
	
	function consultaDescargaReportes(tableparams){
	  		console.log('appBModuloReportes :: consultaDescargaReportes :: RUNNING');
	  		var deferred = $q.defer();
	
	  			// SP : SEGD_ConsultaReportesDescarga
	  			// type : POST
	  		$http.post(context+'/consulta/DescargaReportes',tableparams)
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: consultaDescargaReportes :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: consultaDescargaReportes :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
	}
	
	
	function consultaHistorialExcel(tableparams){
	  		console.log('appBModuloReportes :: consultaHistorialExcel :: RUNNING');
	  		var deferred = $q.defer();
	
	  			// SP : SEGD_ReportesHistorialExcel
	  			// type : POST
	  		$http.post(context+'/consulta/HistorialExcel',tableparams)
	  			.success(function(data) {
	  				console.debug('appBModuloReportes :: consultaHistorialExcel :: SUCCESS');
	  				deferred.resolve(data);
	  			}).error(function(data,status) {
	  				console.error('appBModuloReportes :: consultaHistorialExcel :: ERROR');
	  				console.debug("HTML STATUS: "+status);
	  				if(status===0){
	  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  					deferred.reject(networkError);
	  				}else{
	  					console.error(data);
	  					deferred.reject(data);}
	  			});
	
			return deferred.promise;
	}
	
	
	
	function respaldaReporte(tableparams){
  		console.log('appBModuloReportes :: respaldaReporte :: RUNNING');
  		var deferred = $q.defer();

  			// SP : SEGD_RespaldaReporte
  			// type : POST
  		$http.post(context+'/respalda/RespaldaReportes',tableparams)
  			.success(function(data) {
  				console.debug('appBModuloReportes :: respaldaReporte :: SUCCESS');
  				deferred.resolve(data);
  			}).error(function(data,status) {
  				console.error('appBModuloReportes :: respaldaReporte :: ERROR');
  				console.debug("HTML STATUS: "+status);
  				if(status===0){
  					console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
  					deferred.reject(networkError);
  				}else{
  					console.error(data);
  					deferred.reject(data);}
  			});

		return deferred.promise;
	}
	
	
	
	return {
		consultaTiposReporte : consultaTiposReporte,
		consultaTrimestres : consultaTrimestres,
		consultaReportado : consultaReportado,
		cargaSeleccionados : cargaSeleccionados,
		consultaDatosReporte : consultaDatosReporte,
		generaReporteManual : generaReporteManual,
		descartaReporte : descartaReporte,
		consultaMovimientosReportados : consultaMovimientosReportados,
		consultaReportes : consultaReportes,
		detalleReportes : detalleReportes,
		consultaReportesHistorial : consultaReportesHistorial,
		detalleReportesHistorial : detalleReportesHistorial,
		consultaDescargaReportes : consultaDescargaReportes,
		consultaHistorialExcel : consultaHistorialExcel,
		respaldaReporte : respaldaReporte,
	};
	
	}]);
})()
