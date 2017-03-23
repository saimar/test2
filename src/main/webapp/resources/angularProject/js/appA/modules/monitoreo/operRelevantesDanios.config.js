// =========================================================================
// monitoreo/operRelevantesDanios
// =========================================================================

require('./operRelevantesDanios.js');

angular.module('ui.monitoreo.operRelevantesDanios',[ 'pld.moduloMonitoreo.operRelevantesDanios'])//, 'pldModule.appA.Analisis', 'pldModule.appA.Reporte' ])
	   .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
				$stateProvider
					.state('operRelevantesDanios',{
						url : '/operRelevantesDanios',
						template : '<div ui-view></div>',
						controller : 'operRelevantesDaniosCtrl',
						data: {
			                pageTitle: 'Alertas Monitoreo',
			            },
						resolve:{

							clean:  ['pldService',function(pldService){
					         	return  pldService.LimpiaDatosContenedor();
					        }],
							pldModel :['table',function(table) {
								return table.valuesDefault({
									rule : 1,
									tipoReporte : 4,
									startMapping :'operRelevantesDanios.principal',
									form : {
										mes : undefined,
										anio : undefined,
									}
								});
							}],
						},
						ncyBreadcrumb: {
							skip: true
						}
					}).state('operRelevantesDanios.principal',
						{url : '/principal',
						views:{
							'@':{
							templateUrl : 'resources/angularProject/views/appA/monitoreo/monitoreo.principal.html',
							controller : 'operRelevantesDaniosPrinCtrl'}
						},
						ncyBreadcrumb: {
							label: 'Operaciones Relevantes'
						}
					}).state('operRelevantesDanios.principal.detalle',
						{url : '/detalle/:idDetalle',
						views:{
							'@':{
								templateUrl : 'resources/angularProject/views/appA/monitoreo/monitoreo.detalle.html',
								controller : 'operRelevantesDaniosDetCtrl'}
						},
						ncyBreadcrumb: {
							label: 'Detalle'
						}
					}).state('operRelevantesDanios.principal.analisis',
						{url : '/analisis/:noCliente',
						views:{
							'@':{
								templateUrl : 'resources/angularProject/views/commons/analisisTemplate.html',
								controller : 'AnalisisAppACtrl'}
						},
						ncyBreadcrumb: {
							label: 'Análisis'
						}
					}).state('operRelevantesDanios.principal.detalle.reporte',
						{url : '/reporte/',
						views:{
							'@':{
								templateUrl : 'resources/angularProject/views/commons/reporteTemplate.html',
								controller : 'ReporteAppACtrl'}
						},
						ncyBreadcrumb: {
							label: 'Reporte'
						}
					});

	} ]);
