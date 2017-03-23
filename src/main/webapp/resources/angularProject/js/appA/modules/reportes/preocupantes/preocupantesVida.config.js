// =========================================================================
// Reportes/preocupantesVida
// =========================================================================

require('./preocupantesVida.js');

angular.module('ui.reportes.preocupantesVida',[ 'pld.moduloReportes.preocupantesVida'])
	   .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
				$stateProvider
				.state('preocupantesVida',{
				 	abstract: true,
					url : '/preocupantesVida',
					template : '<div ui-view></div>',
					resolve:{
						clean:  ['pldService',function(pldService){
				         	return  pldService.LimpiaDatosContenedor();
				        }],
						pldModel :['table',function(table) {
							return table.valuesDefault({
								rule : 17,
								tab:1,
								tipoReporte : 7,
								startMapping :'preocupantesVida.principal',
								form : {fhini :undefined,fhfin:undefined},
								catTipoReporte:[],
							});
						}],
					},
					controller : 'preocupantesVidaCtrl',
					ncyBreadcrumb: {
						skip: true
					}
				}).state('preocupantesVida.principal',{
					url : '/principal',
					views:{'@':{
						templateUrl : 'resources/angularProject/views/appA/reportes/preocupantes/preocupantesVida.principal.html',
						controller : 'preocupantesVidaPrinCtrl'	}
					},
					ncyBreadcrumb: {
						label: '{{pldTittle.pageHeader.subtitle}}'
					}
				}).state('preocupantesVida.principal.detalle',{
					url : '/detalle/:idDetalle',
					views:{
						'@':{
							templateUrl : 'resources/angularProject/views/appA/reportes/reportes.detalle.html',
					    	controller : 'preocupantesVidaDetCtrl'
					    }
					},
					ncyBreadcrumb: {
					    label: 'Detalle '
					}
				});


	} ]);
