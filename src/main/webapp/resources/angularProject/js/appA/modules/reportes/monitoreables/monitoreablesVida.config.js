// =========================================================================
// Reportes/monitoreablesVida
// =========================================================================

require('./monitoreablesVida.js');

angular.module('ui.reportes.monitoreablesVida',[ 'pld.moduloReportes.monitoreablesVida'])
	   .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
				$stateProvider
				.state('monitoreablesVida',{
				 	abstract: true,
					url : '/monitoreablesVida',
					template : '<div ui-view></div>',
					resolve:{
						clean:  ['pldService',function(pldService){
				         	return  pldService.LimpiaDatosContenedor();
				        }],
						pldModel :['table',function(table) {
							return table.valuesDefault({
								rule : 17,
								tab:1,
								tipoReporte : 4,
								startMapping :'monitoreablesVida.principal',
								form : {fhini :undefined,fhfin:undefined},
								catTipoReporte:[],
							});
						}],
					},
					controller : 'monitoreablesVidaCtrl',
					ncyBreadcrumb: {
						skip: true
					}
				}).state('monitoreablesVida.principal',{
					url : '/principal',
					views:{'@':{
						templateUrl : 'resources/angularProject/views/appA/reportes/monitoreables/monitoreablesVida.principal.html',
						controller : 'monitoreablesVidaPrinCtrl'	}
					},
					ncyBreadcrumb: {
						label: '{{pldTittle.pageHeader.subtitle}}'
					}
				}).state('monitoreablesVida.principal.detalle',{
					url : '/detalle/:idDetalle',
					views:{
						'@':{
							templateUrl : 'resources/angularProject/views/appA/reportes/reportes.detalle.html',
					    	controller : 'monitoreablesVidaDetCtrl'
					    }
					},
					ncyBreadcrumb: {
					    label: 'Detalle '
					}
				});


	} ]);
