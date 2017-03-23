// =========================================================================
// Reportes/regulatoriosVida
// =========================================================================

require('./regulatoriosVida.js');

angular.module('ui.reportes.regulatoriosVida',[ 'pld.moduloReportes.regulatoriosVida'])
	   .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
				$stateProvider
				.state('regulatoriosVida',{
				 	abstract: true,
					url : '/regulatoriosVida',
					template : '<div ui-view></div>',
					resolve:{
						clean:  ['pldService',function(pldService){
				         	return  pldService.LimpiaDatosContenedor();
				        }],
						pldModel :['table',function(table) {
							return table.valuesDefault({
								rule : 17,
								tab:1,
								tipoReporte : 6,
								startMapping :'regulatoriosVida.principal',
								form : {trimestre :1,anio:undefined},
								catTipoReporte:[],
							});
						}],
					},
					controller : 'regulatoriosVidaCtrl',
					ncyBreadcrumb: {
						skip: true
					}
				}).state('regulatoriosVida.principal',{
					url : '/principal',
					views:{'@':{
						templateUrl : 'resources/angularProject/views/appA/reportes/regulatorios/regulatoriosVida.principal.html',
						controller : 'regulatoriosVidaPrinCtrl'	}
					},
					ncyBreadcrumb: {
						label: '{{pldTittle.pageHeader.subtitle}}'
					}
				}).state('regulatoriosVida.principal.detalle',{
					url : '/detalle/:idDetalle',
					views:{
						'@':{
							templateUrl : 'resources/angularProject/views/appA/reportes/reportes.detalle.html',
					    	controller : 'regulatoriosVidaDetCtrl'
					    }
					},
					ncyBreadcrumb: {
					    label: 'Detalle '
					}
				});


	} ]);
