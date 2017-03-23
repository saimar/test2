(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* ==========================================================================
 * Template: Blankon Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: Djava UI
 * Website: http://djavaui.com
 * Email: maildjavaui@gmail.com
 * ==========================================================================
*/


// var jQuery=require('jquery');
// window.jQuery=jQuery;//pasamos jquery al contexto
// window.$=jQuery;//pasamos jquery al contexto
// var boostrap=require('bootstrap');
// var angular=require('angular');
// var ActivityMonitor=require('angular-activity-monitor');
// var breadcrumbs=require('angular-breadcrumb');
// var uiRouter=require('angular-ui-router');
// var ngDialog=require('ng-dialog');
// var niceScroll=require('jquery.nicescroll');
// var autocomplete=require('jquery-autocomplete');
// var boostrapDatepicker=require('bootstrap-datepicker');


 require('./config.js');
 require('./directives.js');
 require('./controllers.js')
 require('./services.js');

 //directivas y tabla

 require('./directives/web-component-pld-commons.js');
 require('./components/angular-directive-pld-table.js');

 //serivicios

 require('./appA/services/service-appA-modulo-reportes.js');
 require('./appA/services/serviceAppAModuloMonitoreo.js');

 //modulos de la aplicacion
 require('./appA/modules/angular-module-pld-analisis.js');
 require('./appA/modules/angular-module-pld-reporte.js');

 require('./appA/modules/monitoreo/operRelevantesDanios.config.js');

 require('./appA/modules/reportes/monitoreables/monitoreablesVida.config.js');
 require('./appA/modules/reportes/preocupantes/preocupantesVida.config.js');
 require('./appA/modules/reportes/regulatorios/regulatoriosVida.config.js');

 	'use strict';
// =========================================================================
// BLANKON MODULE APP
// =========================================================================
var app =angular.module('pldApp', [
    'ui.router',
    'oc.lazyLoad',
    'angular-loading-bar',
    'ngSanitize',
    'ngAnimate',
    'ncy-angular-breadcrumb',

    'pldConfig',//configuracion de la aplicacion
    'pldServices',//servicios base de la aplicacion
    'pldDirective',//directivas base de la aplicacion
    'pldController',//eventos y variables globales de la app

    //==========================================================
    // Modulos de la aplicación
    //==========================================================


   'wcPldCommons',//directivas
   'pldComponentTable',//tabla

   'serviceAppAModuloReportes',
   'serviceAppAModuloMonitoreo',

   'pldModule.appA.Analisis',//modulo de analisis
   'pldModule.appA.Reporte',//modulo de reporte

  'ui.monitoreo.operRelevantesDanios',//modulo aplicacion

  /* 	REPORTES */
  'ui.reportes.monitoreablesVida',
  'ui.reportes.regulatoriosVida',
  'ui.reportes.preocupantesVida',

]);

},{"./appA/modules/angular-module-pld-analisis.js":2,"./appA/modules/angular-module-pld-reporte.js":3,"./appA/modules/monitoreo/operRelevantesDanios.config.js":4,"./appA/modules/reportes/monitoreables/monitoreablesVida.config.js":6,"./appA/modules/reportes/preocupantes/preocupantesVida.config.js":8,"./appA/modules/reportes/regulatorios/regulatoriosVida.config.js":10,"./appA/services/service-appA-modulo-reportes.js":12,"./appA/services/serviceAppAModuloMonitoreo.js":13,"./components/angular-directive-pld-table.js":14,"./config.js":15,"./controllers.js":16,"./directives.js":18,"./directives/web-component-pld-commons.js":19,"./services.js":20}],2:[function(require,module,exports){
/**
 * MUDULO ANALISIS PLATAFORMA DEX
 * 
 * Autor: 709870
 * 
 */

'use strict';
(function(){
    angular.module("pldModule.appA.Analisis", ['wcPldCommons'])
    .controller('AnalisisAppACtrl', ['$scope','$stateParams','$state','pldModel',
        function (scope,$stateParams,$state,pldModel) {
    	console.log('Analisis controller loaded ...');
//    	
//        console.info(pldModel);
//
//        if(pldModel.valuesTable.totalRows==0 ){//la vista principal esta vacia, producto de un F5
//            $state.go(pldModel.startMapping);//cuando se actualiza la pagina desde el detalle redirige a la ventana principal
//        }
//
//
//
//        scope.register = $stateParams.noCliente;
//        
//        scope.status=1;
//        scope.tipoTabla='observaciones';
//        scope.tab=1;
//        scope.tabHeader='Observaciones';
//        scope.tabHeader2=''
//
//        scope.catEstatus=[{EstatusAnalisis:'Analizado',Descripcion:'Analizado'},{EstatusAnalisis:'Descartado',Descripcion:'Descartado'}];
//        
//        //------table1
//        var tableParams={
//            params:{},keyTable:''
//        };
//        scope.reloadTable=false;
//        scope.messageConfiguration={
//            state:{success:false,show:false,styleMessage:'',message:'',styleIcon:'',},                      
//            showAnimation:false//muestra la animacion css
//        };
//        scope.tableData={
//            headers:[],jsonResult:[],rowCount:0
//        };
//        scope.configTable={
//            detalle:false,search:true, pages:true, excel:true,pagination:true,message:true,tableName:'Analisis-observaciones',
//            filters:{FechadeMarcado:'date',Monto:'currency',MontoUSD:'currency'}
//        };
//        scope.valuesTable={
//            tableMessage:{state:{success:false,show:false,styleMessage:'',message:'',styleIcon:''},
//            showAnimation:false,},              
//            headers  : [],
//            registers : [],
//            displayedPage : [],
//            reverse  : false,
//            paginated  : false,
//            range        : [],
//            pageSize     : 10,
//            currentPage : 0,
//            totalRows : 0,
//            columnToOrder: '',
//            searchText   : ''
//        };
//        
//        //------table2
//        var tableParams2={
//            params:{},keyTable:''
//        };
//        scope.reloadTable2=false;
//        scope.messageConfiguration2={
//            state:{success:false,show:false,styleMessage:'',message:'',styleIcon:'',},                      
//            showAnimation:false//muestra la animacion css
//        }
//        scope.tableData2={headers:[],jsonResult:[],rowCount:0};
//        scope.configTable2={
//            detalle:false,search:true, pages:true, excel:true,pagination:true,message:true,tableName:'Analisis-observaciones',
//            filters:{FechadeMarcado:'date',Monto:'currency',MontoUSD:'currency'}
//        };
//        scope.valuesTable2={
//            tableMessage:{state:{success:false,show:false,styleMessage:'',message:'',styleIcon:''},
//            showAnimation:false,},              
//            headers  : [],
//            registers : [],
//            displayedPage : [],
//            reverse  : false,
//            paginated  : false,
//            range        : [],
//            pageSize     : 10,
//            currentPage : 0,
//            totalRows : 0,
//            columnToOrder: '',
//            searchText   : ''
//        };
//
//        scope.messageDatosAnalisis={state : {success : false,show : false,styleMessage : '',message : '',styleIcon : ''},
//                                            showAnimation : false,};
//        
//        
//        scope.selectTab=function(tab){
//                    
//            if(tab!=undefined){
//                scope.tab=tab;
//            }
//
//            scope.valuesTable2={
//                tableMessage:{state:{success:false,show:false,styleMessage:'',message:'',styleIcon:''},
//                showAnimation:false,},              
//                headers  : [],
//                registers : [],
//                displayedPage : [],
//                reverse  : false,
//                paginated  : false,
//                range        : [],
//                pageSize     : 10,
//                currentPage : 0,
//                totalRows : 0,
//                columnToOrder: '',
//                searchText   : '',
//            };
//            
//            scope.valuesTable1={
//                tableMessage:{state:{success:false,show:false,styleMessage:'',message:'',styleIcon:''},
//                showAnimation:false,},              
//                headers  : [],
//                registers : [],
//                displayedPage : [],
//                reverse  : false,
//                paginated  : false,
//                range        : [],
//                pageSize     : 10,
//                currentPage : 0,
//                totalRows : 0,
//                columnToOrder: '',
//                searchText   : ''
//            };
//
//            scope.messageConfiguration.showAnimation=true;//muestra la animacion de "pld-message"
//            scope.messageConfiguration.state.show=false;//oculta los mensajes del "pld-message"
//            scope.tableData={headers:[],jsonResult:[],rowCount:0};//limpia los valores de la tabla
//            
//            scope.messageConfiguration2.showAnimation=true;//muestra la animacion de "pld-message"
//            scope.messageConfiguration2.state.show=false;//oculta los mensajes del "pld-message"
//            scope.tableData2={headers:[],jsonResult:[],rowCount:0};//limpia los valores de la tabla
//            
//            scope.messageDatosAnalisis.showAnimation = false;
//            scope.messageDatosAnalisis.state.show=false;
//            
//        
//        
//
//            scope.tabHeader='';
//            scope.tabHeader2='';
//            
//            scope.configTable.tableName='Analisis-observaciones'
//            tableParams.params={nucliente:scope.register};
//
//            switch (tab) {
//            case 1:
//                tableParams.keyTable='observaciones';
//                scope.tipoTabla='observaciones';
//                scope.tabHeader='Observaciones';
//                scope.callSingleTable();
//                break;
//            case 2:
//                tableParams.keyTable='reportesenviados';
//                scope.tipoTabla='reportesenviados';
//                scope.tabHeader='Reportes Enviados';
//                scope.callSingleTable();
//                break;
//            case 3:
//                tableParams.keyTable='coincidencialistanegra';
//                scope.tipoTabla='coincidencialistanegra';
//                scope.tabHeader='Listas Negras';
//                
//                tableParams2.params={nucliente:scope.register};
//                tableParams2.keyTable='coincidenciapeps';
//                scope.tipoTabla2='coincidenciapeps';        
//                scope.tabHeader2='PEPS';
//                
//                scope.callDoubleTable()
//                    
//                break;
//            case 4:
//                tableParams.params={nucliente:scope.register};
//                tableParams.keyTable='ultimos10pagos';
//                scope.tipoTabla='ultimos10pagos';
//                scope.tabHeader='Ultimos 10 Pagos';
//                scope.callSingleTable();
//                break;
//            default:
//                
//                scope.tipoTabla='observaciones';
//                scope.tabHeader='Observaciones';
//
//                break;
//            }
//        
//        }
//                
//        scope.callSingleTable = function (){
//            sgvModuloAnalisis.ConsultaAnalisis(tableParams,settings,scope.tipoTabla)
//            .then(function (tableVO) { 
//                scope.tableData = tableVO;
//                scope.messageConfiguration.showAnimation=false;
//                scope.reloadTable=true;
//            },function(parentVO){
//                scope.messageConfiguration=parentVO;
//                scope.messageConfiguration.showAnimation=false;//oculta la animación
//                scope.reloadTable=true;
//            });
//        }
//
//        scope.callDoubleTable = function (){
//            //--call first table
//            sgvModuloAnalisis.ConsultaAnalisis(tableParams,settings,scope.tipoTabla)
//            .then(function (tableVO) { 
//                scope.tableData = tableVO;
//                scope.messageConfiguration.showAnimation=false;
//                scope.reloadTable=true;
//            },function(parentVO){
//                scope.messageConfiguration=parentVO;
//                scope.messageConfiguration.showAnimation=false;//oculta la animación
//                scope.reloadTable=true;
//            }).then(
//                    //--call secon table
//                    sgvModuloAnalisis.ConsultaAnalisis(tableParams2,settings,scope.tipoTabla2)
//                    .then(function (tableVO) { 
//                        scope.tableData2 = tableVO;
//                        scope.messageConfiguration2.showAnimation=false;
//                        scope.reloadTable2=true;
//                    },function(parentVO){
//                        scope.messageConfiguration2=parentVO;
//                        scope.messageConfiguration2.showAnimation=false;//oculta la animación
//                        scope.reloadTable2=true;
//                    })
//            );
//        }
//        
//        scope.saveAnalisis=function(){
//            scope.messageConfiguration.showAnimation=true;//muestra la animacion de "pld-message"
//            scope.messageConfiguration.state.show=false;//oculta los mensajes del "pld-message"
//            scope.tableData={headers:[],jsonResult:[],rowCount:0};//limpia los valores de la tabla
//            
//            scope.messageDatosAnalisis.state.show=false;
//            scope.messageDatosAnalisis.showAnimation=true;
//
//            // consulta que recupera los datos del cliente
//            var analisis={
//
//                nuCliente         :scope.register, 
//                resultadoAnalisis :scope.status,
//                observaciones     :scope.observaciones,
//                idUsuario         :'',
//                nombreUsuario     :''
//                }
//            
//            sgvModuloAnalisis.NuevoAnalisis(analisis,settings)
//                .then(function(success){
//                    
//                    scope.selectTab(1);
//
//                    scope.messageDatosAnalisis.showAnimation=false;
//                    scope.messageDatosAnalisis=success;
//                    scope.messageDatosAnalisis.state.show=true;
//
//                    
//                    scope.observaciones='';
//                },function(fail){
//                    scope.messageConfiguration.showAnimation=false;
//                    scope.messageConfiguration=fail;
//                });
//        }
//
//        scope.selectTab(1);//realiza el llamado a las observaciones por default
        
    }]);
        		
})();
},{}],3:[function(require,module,exports){
/**
 * MUDULO REPORTE
 * 
 * Autor: 168833
 * 
 */

'use strict';
(function(){
    angular.module("pldModule.appA.Reporte", ['serviceAppAModuloReportes'])
        
    .controller('ReporteAppACtrl', ['$scope','appAModuloReportes','pldModel','$state','settings',function ($scope,appAModuloReportes,pldModel,$state,settings) {
        	console.debug('ReporteAppACtrl loaded ...');

        	//inicializacion de variables
        	$scope.dataReporte={jsonResult:[],jsonHeaders:{},rowCount:0};
        	$scope.descripcion='';
        	$scope.razones='';
        	$scope.tipoReporte=4;
        	
        	$scope.reported=pldModel.report.reported;
        	
        	
        	$scope.messageDatosReporte={state : {success : false,show : false,styleMessage : '',message : '',styleIcon : ''},
											showAnimation : false,};
        	
        	//Se genera un nuevo Reporte
        	
        	$scope.saveReport=function(){
        		
        		$scope.messageDatosReporte.state.show=false;
        		$scope.messageDatosReporte.showAnimation=true;
        		
        		var reportParams={
        				tiporeporte:$scope.tipoReporte,
        				idMovimiento:pldModel.report.idMovimiento,
        				nuCliente:pldModel.report.idCliente,
        				idAnalista:settings.user,//no analista
        				nombreAnalista:settings.userName,//nombre analista
        				descripcion:$scope.descripcion,
        				razones:$scope.razones,
        			};
        		
        		appAModuloReportes.generaReporteManual(reportParams)
        			.then(function(success){
        				$scope.messageDatosReporte.showAnimation=false;
            			$scope.messageDatosReporte=success;
            			$scope.messageDatosReporte.state.show=true;
            			$scope.reported=true;
        			},function(fail){
        				$scope.messageDatosReporte.showAnimation=false;
            			$scope.messageDatosReporte=fail;
        			})
        	}
        	
        	
        	
        	if(pldModel.report.idMovimiento==undefined || pldModel.report.idCliente==undefined){
        		$state.go(pldModel.startMapping);
        	}else{
        		
        		$scope.messageDatosReporte.state.show=false;
        		$scope.messageDatosReporte.showAnimation=true;
        		
        		appAModuloReportes.consultaDatosReporte({params:{idmovimiento:pldModel.report.idMovimiento,nucliente:pldModel.report.idCliente},keyTable:'dataReport'},settings)
        			.then(function(data){
        				//console.log(data);
        				$scope.dataReporte=data;
        				
        				$scope.descripcion=(data.jsonResult[0].Descripcion==null)?'':data.jsonResult[0].Descripcion;
        				$scope.razones=(data.jsonResult[0].Razones==null)?'':data.jsonResult[0].Razones;
        				$scope.messageDatosReporte=data;
        			},function(error){
        				$scope.messageDatosReporte=error;
        			}).then(function(){
        				appAModuloReportes.consultaReportado(pldModel.report.idMovimiento)
            			.then(function(data){
            				$scope.reported=(data.jsonResult[0].Existe==1)?true:false;
            				if($scope.reported==true)
            					$scope.messageDatosReporte={state : {success : false,show : true,styleMessage : 'alert-warning',message : 'Reporte generado',styleIcon : 'fa fa-toggle-on'},
    								message:{info:'El reporte de este movimiento ya fue generado'},
            						showAnimation : false,};
            			},function(error){
            				$scope.messageDatosReporte=error;
            				$scope.messageDatosReporte.showAnimation=false;
            			})
        			});
        		
        		
        		
        	}
        	
        	
        	
        	//-----------------  finalizan consultas iniciales.
        	
        }]);
        		
})();
},{}],4:[function(require,module,exports){
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

},{"./operRelevantesDanios.js":5}],5:[function(require,module,exports){
/**
 * monitoreo/operRelevantesDanios
 */

'use strict';
(function(){
    angular.module("pld.moduloMonitoreo.operRelevantesDanios", ['wcPldCommons','pldServices','serviceAppAModuloMonitoreo','pldComponentTable','pldServices','ngDialog'])
        
    .controller('operRelevantesDaniosCtrl', ['$scope',function ($scope) {
        	console.log('operRelevantesDaniosCtrl loaded . . .');
    }]).controller('operRelevantesDaniosPrinCtrl', ['$scope','$state','$stateParams','serviceAppAModuloMonitoreo','pldModel','pldService','ngDialog',function ($scope,$state,$stateParams,serviceAppAModuloMonitoreo,pldModel,pldService,ngDialog) {
        	
     	//inicializacion de variables controlador
    	$scope.rule=pldModel.rule;
		
		//variables de la tabla
		$scope.valuesTable=pldModel.valuesTable;
		$scope.reloadTable=false;
    	$scope.configTable={detalle:true,check:false,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'Elnombredemitabla',
    			filters:{FechaNacimiento:'date',Monto:'currency',MontoUSD:'currency'},disabledcollumns:['Mes','Ano']};
    	 $scope.data=undefined;
    	 $scope.message={state : { success : false,show : false,styleMessage : '',message : '',styleIcon : ''},
                 showAnimation : false},
                 
         $scope.myBlob=null;
    	
		
        	$scope.callData = function(){
        		
        		$scope.valuesTable.tableMessage.showAnimation=true;//se ingresa a la bandera interna de la animacion de la tabla
        		$scope.valuesTable.tableMessage.state.show=false;//se oculta el mensaje de error interno de la tabla
        		$scope.valuesTable.totalRows=0;//oculta la tabla

        			//SP: SEGD_ConsultaOperacionesRelevantes

        		var params={keyTable:'principal',params:{
        			mes : ($scope.mes!=null || $scope.mes!=undefined)?$scope.mes : 0,
        			anio : ($scope.anio!=null || $scope.anio!=undefined)?$scope.anio : 0,
        			}};
        		serviceAppAModuloMonitoreo.consultaoperacionesRelevantes(params)
        			.then(function (tableVO) {
        			  $scope.reloadTable=true;
        			},function(parentVO){
        			  $scope.valuesTable.tableMessage.showAnimation=false;
        			  $scope.valuesTable.tableMessage=parentVO;
        			});
            }
        	
        	$scope.callParameters = function(){
        		$scope.idparametro=1;//modificacion manual
        		
        		$scope.message.showAnimation=true;//se ingresa a la bandera interna de la animacion
        		$scope.message.state.show=false;//se oculta el mensaje de error interno de la tabla

        			//SP: SEGD_ConsultaParametros

        		var params={keyTable:'STP_CONSULTA_PARAMETROS_DANIOS',params:{
        			idparametro : ($scope.idparametro!=null || $scope.idparametro!=undefined)?$scope.idparametro : 0,
        			}};
        		serviceAppAModuloMonitoreo.consultaparametros(params)
        			.then(function (tableVO) {
        			  $scope.message.showAnimation=false;
        			  $scope.data=tableVO;
        			  /**********************/
        			  //modificacion manual
        			  $scope.w=tableVO.jsonResult[0].W;
        			  $scope.x=tableVO.jsonResult[0].X;
        			  $scope.y=tableVO.jsonResult[0].Y;
        			  $scope.z=tableVO.jsonResult[0].Z;
        			  
        			  /**********************/
        			},function(parentVO){
        			  $scope.message.showAnimation=false;
        			  $scope.message=parentVO;
        			});
        	}
        	
        	$scope.updateParameters = function (){
        		
        		$scope.nousuario='639424';//modificacion manual
        		$scope.usuario='Miguel Angel Diaz Figueroa';//modificacion manual
        		
        		$scope.message.showAnimation=true;//se ingresa a la bandera interna de la animacion
        		$scope.message.state.show=false;//se oculta el mensaje de error interno de la tabla

        			//SP: SEGD_ModificaParametros

        		var params={keyTable:'update',params:{
        			idparametro : ($scope.idparametro!=null || $scope.idparametro!=undefined)?$scope.idparametro : 0,
        			x : ($scope.x!=null || $scope.x!=undefined)?$scope.x : 0,
        			y : ($scope.y!=null || $scope.y!=undefined)?$scope.y : 0,
        			z : ($scope.z!=null || $scope.z!=undefined)?$scope.z : 0,
        			w : ($scope.w!=null || $scope.w!=undefined)?$scope.w : 0,
        			nousuario : ($scope.nousuario!=null || $scope.nousuario!=undefined)?$scope.nousuario : '',
        			usuario : ($scope.usuario!=null || $scope.usuario!=undefined)?$scope.usuario : '',
        			}};
        		serviceAppAModuloMonitoreo.actualizaparametros(params)
        			.then(function (result) {
        			  $scope.message.showAnimation=false;
        			  $scope.message=result;
        			  $scope.message.state.show=true;//habilita mostrar mensaje de exito
        			},function(parentVO){
        			  $scope.message.showAnimation=false;
        			  $scope.message=parentVO;
        			});
        	}
        	
        	
        	$scope.$on('callDetail', function (event, item) {
        		pldModel.valuesTable=$scope.valuesTable;
        		pldModel.valuesDetalle.totalRows=0;
        		$state.go('.detalle',{idDetalle:item.IdAlarma});
        		});
        	
        	$scope.$on('callAnalisis', function (event, item) {
        		pldModel.valuesTable=$scope.valuesTable;
        		$state.go('.analisis',{noCliente:item.IdCliente.trim()});
        		});
        	
        	$scope.downloadExcel=function(){
        		
        		var dialog = ngDialog.openConfirm({//mensaje de confirmacion
	            	  template:'<h5 align="center"><b>¿Desea descargar el archivo?</b></h5>'+
					  '<form name="myForm">'+
				  		'<div class="row"><div class="col-sm-12 col-md-12" align="center"><label>La descarga del archivo podría demorar algunos minutos.</label></div></div>'+
				  		'<div class="row">'+
				  				'<div class="  col-md-3 col-sm-6 col-xs-12 col-md-offset-3">'+
				  					'<button id="update" type="button" class="btn btn-success" ng-click="confirm()" ng-disabled="!myForm.$valid">Aceptar</button>'+
				  				'</div>'+
				  				'<div class="  col-md-3 col-sm-6 col-xs-12">'+
				  					'<button id="cancel" type="button" class="btn btn-warning" ng-click="closeThisDialog()">Cancelar</button>'+
				  				'</div>'+
				  		'</div>'+
				  '</form>',
	                  plain: true // se usa cuando se agrega un template           
	              }).then(function (){
	            	  console.info("::: ACEPTA DOWNLOAD ::: ");
	            	
	            	 
	            	  
	            	  pldService.DownloadExcelFromTable('STP_CONSULTA_PARAMETROS_DANIOS','','Parametros')//(Llave contenedor,textobusqueda,tituloExcel)
						.then(function(data){
							console.log('La descarga de datos exitosa :');
							//la variable myBlobObject debe ser asignada a la directiva <file-download>
							$scope.myBlob=new Blob(["\ufeff",data],{ encoding:"UTF-8",type:"application/vnd.ms-excel; charset=UTF-8"});
						},function(fail){//fallo la descarga de excel
							console.log('La descarga no pudo ser procesada');
							alert('La descarga no pudo ser procesada');
							$scope.myBlob=null;
						})
	            	  
	              },function(){ //se cancela la descarga de archivo excel           	  
	            	  console.debug("CANCELA DOWNLOAD");
	            	 
	              });
        	}
        	
        	//Lineas agregadas para carga de datos de manera automatica, estas lineas solo se agregaron con fines de cocumentacion
        	$scope.mes=2;//borrar
        	$scope.anio=2009;//borrar
        	$scope.callData();//borrar
        	$scope.callParameters();//borrar
        	
        	
        }]).controller('operRelevantesDaniosDetCtrl', ['$scope','$state','$stateParams','settings','serviceAppAModuloMonitoreo','pldModel',function ($scope,$state,$stateParams,settings,serviceAppAModuloMonitoreo,pldModel) {
        	
        
        	
    		$scope.rule=pldModel.rule;
    		//variables de la tabla
    		$scope.valuesDetalle=pldModel.valuesDetalle;
    		
        	$scope.reloadTable=false;
        	$scope.configTable={detalle:false,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'operRelevantesDanios-detalle',//trae el titulo de la directiva titulo
        			filters:{FechaInicioVigencia:'date',FechaFinVigencia:'date',Monto:'currency',MontoUSD:'currency'}};
        	
        	
        	$scope.callData = function(){
        		
        		$scope.valuesDetalle.tableMessage.showAnimation=true;//se ingresa a la bandera interna de la animacion de la tabla
        		$scope.valuesDetalle.tableMessage.state.show=false;//se oculta el mensaje de error interno de la tabla
        		$scope.valuesDetalle.totalRows=0;//oculta la tabla

        			//SP: SEGD_ConsultaOperacionesRelevantesDetalle
        		$scope.idalarma=$stateParams.idDetalle;
        		
        		var params={keyTable:'detalle',params:{
        			idalarma : ($scope.idalarma!=null || $scope.idalarma!=undefined)?$scope.idalarma : 0,
        			}};
        		serviceAppAModuloMonitoreo.detalleoperacionesRelevantes(params)
        			.then(function (tableVO) {
        			  $scope.reloadTable=true;
        			},function(parentVO){
        			  $scope.valuesDetalle.tableMessage.showAnimation=false;
        			  $scope.valuesDetalle.tableMessage=parentVO;
        			});
    		};
    		
    		$scope.$on('callReport', function (event, item) {
    			pldModel.report.idMovimiento=item.IdMovimiento;
    			pldModel.report.idCliente=item.IdCliente;
        		$state.go('.reporte');
        		});
    		
    		if(pldModel.valuesDetalle.totalRows==0){
    			if(pldModel.valuesTable.totalRows==0){//la vista principal esta vacia, producto de un F5
    				$state.go(pldModel.startMapping);//cuando se actualiza la pagina desde el detalle redirige a la ventana principal
    			}else{
    				$scope.callData();
    			}
    		}
 	
    }]);
        		
})();

},{}],6:[function(require,module,exports){
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

},{"./monitoreablesVida.js":7}],7:[function(require,module,exports){
/**
 * monitoreo/monitoreablesVida
 */

'use strict';
(function(){
    angular.module("pld.moduloReportes.monitoreablesVida", ['wcPldCommons','pldServices','serviceAppAModuloReportes','pldComponentTable','ngDialog'])

    .controller('monitoreablesVidaCtrl', ['$scope',function ($scope) {
        	console.debug('monitoreablesVidaCtrl loaded ...');
        }]).controller('monitoreablesVidaPrinCtrl',  ['$scope','$state','$stateParams','appAModuloReportes','pldModel','settings','ngDialog',function ($scope,$state,$stateParams,appAModuloReportes,pldModel,settings,ngDialog) {


      //inicializacion de variables controlador
      $scope.rule=pldModel.rule;//Se baja rule desde el PLDMODEL al scope

			$scope.fhini=pldModel.form.fhini;//Se baja fhini desde el PLDMODEL al scope
			$scope.fhfin=pldModel.form.fhfin;//Se baja fhfin desde el PLDMODEL al scope

			$scope.tab=pldModel.tab;////Se baja tab desde el PLDMODEL al scope
			$scope.catTipoReporte=[];//catalogo de tipos de reporte
			$scope.trimestres=[];//catalogo de trimestres

			$scope.tipoReporte=pldModel.tipoReporte;////Se baja tipoReporte desde el PLDMODEL al scope


			//variables de la tabla
			$scope.valuesTable=pldModel.valuesTable;//Se bajan los valores default de la tabla para ser asignados en la directiva de la tabla, esta variable debe ser unica por cada tabla a desplegar
			$scope.reloadTable=false;//bandera para recarga de datos
        	$scope.configTable={
        				detalle:false,//herramienta cargada manualmente muestra un detalle y esta deshabilitada
        				check:true,//herramienta cargada manualmente sirve para seleccionar todas las filas de la tabla y esta habilitada
        				reporte:false,//herramienta cargada manualmente sirve para desplegar el modulo de reporte manual y esta deshabilitada
        				search:true, //habilita la busqueda en la tabla
        				pages:true, //habilita la seleccion de tamaño de pagina
        				excel:true,//habilita la descarga de excel
        				pagination:true,//habilita los botones de paginación
        				tableName:'monitoreablesVida-generacion',//nombre del archivo excel a descargar
        			filters:{FechaDeteccion:'date',Monto:'currency'}};//filtros a asignar a las columnas con valores especiales

        	//	carga de catalogos

			appAModuloReportes.consultaTiposReporte(1)  //CARGA tipoReporte Monitoreables con 1
						.then(function(data){
							$scope.catTipoReporte=data.jsonResult;
							$scope.tipoReporte=data.jsonResult[0].IdTipoReporte;
						},function(error){
							$scope.valuesTable.tableMessage.state=error.state;
							$scope.valuesTable.tableMessage.message=error.message;
						});/*.then(appAModuloReportes.consultaTrimestres(settings)
								.then(function(data){
									$scope.trimestres=data.jsonResult;
								},function(error){
									$scope.valuesTable.tableMessage.state=error.state;
									$scope.valuesTable.tableMessage.message=error.message;
								}));*/


        	//Funciones del controlador


        	$scope.changeTab=function(tab){
        		console.log('changing tab  to. . . =>'+tab);
        		$scope.tab=tab;

        		//cleaning table Valores por deafult
        		$scope.valuesTable={
        				tableMessage : {state : {success : false,show : false,styleMessage : '',message : '',styleIcon : ''},
							showAnimation : false,},
						headers : [],
						registers : [],
						displayedPage : [],
						reverse : false,
						paginated : false,
						range : [],
						pageSize : 10,
						currentPage : 0,
						totalRows : 0,
						columnToOrder : '',
						searchText : '',};

        		switch (tab) {
				case 1://configuraciones de la tabla de acuerdo al tab
					$scope.configTable={detalle:false,check:true,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'monitoreablesVida-generacion',
	        			filters:{FechaDeteccion:'date',Monto:'currency'}};
					break;
				case 2:
					$scope.configTable={detalle:true,descartar:true,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'monitoreablesVida-consulta',
	        			filters:{FechaDeteccion:'date',Monto:'currency'}};
					break;
				case 3:
					$scope.configTable={detalle:true,respaldar:true,editar:false,search:true, pages:true, excel:true,pagination:true,tableName:'monitoreablesVida-descarga',
	        			filters:{Monto:'currency'}};
					break;
				case 4:
					$scope.configTable={detalle:true,editar:false,search:true, pages:true, excel:true,pagination:true,tableName:'monitoreablesVida-historico',
	        			filters:{Monto:'currency'}};
					break;
				default:
					break;
				}


        	};

        	$scope.endSelection=function(){//metodo que recupera los elementos seleccionados en la tabla

        		var dialog = ngDialog.openConfirm({
	            	  template:'<h5 align="center"><b>¿Desea generar el reporte de los elementos?</b></h5>'+
					  '<form name="myForm">'+
				  		'<div class="row"><div class="col-sm-12 col-md-12" align="center"><label>Esta acción iniciará el proceso de revisión de reportes para los elementos seleccionados.</label></div></div>'+
				  		'<div class="row">'+
				  				'<div class="  col-md-3 col-sm-6 col-xs-12 col-md-offset-3">'+
				  					'<button id="update" type="button" class="btn btn-success" ng-click="confirm()" ng-disabled="!myForm.$valid">Aceptar</button>'+
				  				'</div>'+
				  				'<div class="  col-md-3 col-sm-6 col-xs-12">'+
				  					'<button id="cancel" type="button" class="btn btn-warning" ng-click="closeThisDialog()">Cancelar</button>'+
				  				'</div>'+
				  		'</div>'+
				  '</form>',
	                  plain: true // se usa cuando se agrega un template
	              }).then(function (){
	            	  	console.info("::: ACEPTA DOWNLOAD ::: ");

	            	  	$scope.valuesTable.tableMessage.showAnimation=true;//se ingresa a la bandera interna de la animacion de la tabla
	            	  	$scope.valuesTable.tableMessage.state.show=false;//se oculta el mensaje de error interno de la tabla
	            	  	$scope.valuesTable.totalRows=0;//oculta la tabla

	            	  	var reportParams={
	            	  			tipoReporte:$scope.tipoReporte,
	            	  			idReporte:'',//El id de reporte se recupera en el backend
	            	  			trimestre:'',
	            	  			anio:'',
	            	  			analista:settings.user,
	            	  			nombreAnalista:settings.userName,
	            	  			seleccionados:[],
	            	  	};

	            	  	for(var index in $scope.valuesTable.registers){//se cerifican todos los elementos seleccionados de la tabla
            	  			if($scope.valuesTable.registers[index].check==true)
            	  				reportParams.seleccionados.push($scope.valuesTable.registers[index].IdTemporal);//se cerifican todos los elementos seleccionados de la tabla
            	  		}

	            	  	//reportParams.trimestre=$scope.trimestre;
            	  		//reportParams.anio=$scope.anio;

	            	  	appAModuloReportes.cargaSeleccionados(reportParams)
	          				.then(function (tableVO) {
	          					$scope.valuesTable.tableMessage.showAnimation=false;
	          					$scope.valuesTable.tableMessage=tableVO;
	          				},function(parentVO){
	          					$scope.valuesTable.tableMessage.showAnimation=false;
	          					$scope.valuesTable.tableMessage=parentVO;
	          				}).then(function(){
	          					$scope.callData();
	          				});

	              },function(){
	              	console.debug("CANCELA DOWNLOAD");
	              });

        	}

        	$scope.callData = function(){

        		$scope.valuesTable.tableMessage.showAnimation=true;//se ingresa a la bandera interna de la animacion de la tabla
        		$scope.valuesTable.tableMessage.state.show=false;//se oculta el mensaje de error interno de la tabla
        		$scope.valuesTable.totalRows=0;//oculta la tabla

        		pldModel.form.fhini=$scope.fhini;
        		pldModel.form.fhfin=$scope.fhfin;


        		switch ($scope.tab) { 
        	  	case 1://Generacion
        	  		var tableParams={params:{idtiporeportepld : $scope.tipoReporte,fechainicial : $scope.fhini,fechafinal : $scope.fhfin,trimestre : '',anio : '',},
        				keyTable:'principal',
			  		  };

        	  		appAModuloReportes.consultaMovimientosReportados(tableParams)
        	  			.then(function (tableVO) {
        	  				$scope.reloadTable=true;
        	  			},function(parentVO){
        	  				$scope.valuesTable.tableMessage.showAnimation=false;
          					$scope.valuesTable.tableMessage=parentVO;
        	  			});
        	  		break;
        	  	case 2://consulta
        	  		var tableParams={params:{idtiporeportepld:$scope.tipoReporte,fhinicial:$scope.fhini,fhfinal:$scope.fhfin,trimestre:'',anio:'',
        						},keyTable:'principal',};
        	  		appAModuloReportes.consultaReportes(tableParams)
    	  				.then(function (tableVO) {
    	  					$scope.reloadTable=true;
    	  				},function(parentVO){
    	  					$scope.valuesTable.tableMessage.showAnimation=false;
          					$scope.valuesTable.tableMessage=parentVO;
    	  				});
        	  		break;
        	  	case 3://descarga
        	  		var tableParams={params:{idtiporeportepld:$scope.tipoReporte,fhinicial:$scope.fhini,fhfinal:$scope.fhfin,trimestre:'',anio:'',
        						},keyTable:'principal',};
        	  		appAModuloReportes.consultaDescargaReportes(tableParams)
	  					.then(function (tableVO) {
	  						$scope.reloadTable=true;
	  					},function(parentVO){
	  						$scope.valuesTable.tableMessage.showAnimation=false;
          					$scope.valuesTable.tableMessage=parentVO;
	  					});
        	  		break;
        	  	case 4://historico
        	  		var tableParams={params:{idtiporeportepld:$scope.tipoReporte,fhinicial:$scope.fhini,fhfinal:$scope.fhfin,trimestre:'',anio:'',
        						},keyTable:'principal',};
        	  		appAModuloReportes.consultaReportesHistorial(tableParams)
        	  			.then(function (tableVO) {
        	  				$scope.reloadTable=true;
        	  			},function(parentVO){
        	  				$scope.valuesTable.tableMessage.showAnimation=false;
          					$scope.valuesTable.tableMessage=parentVO;
        	  			});
        	  		break;

        	  	default:
        	  		break;
        	  	}


            };



        	$scope.$on('callDetail', function (event, item) {// se atrapa el evento generado por el tool detalle
        		pldModel.valuesTable=$scope.valuesTable;
        		pldModel.valuesDetalle.totalRows=0;
        		pldModel.tab=$scope.tab;
        		pldModel.tipoReporte=$scope.tipoReporte;
        		$scope.$emit('pushNavigation',{title:'Detalle',state:'monitoreablesVida.detalle'});
        		$state.go('.detalle',{idDetalle:item.IdReporte});
        		});

        	 $scope.$on('callDiscart', function (event,item){// se atrapa el evento generado por el tool descartar

         		var dialog = ngDialog.openConfirm({
 	            	  template:'<h5 align="center"><b>¿Desea descartar el elemento seleccionado?</b></h5>'+
 					  '<form name="myForm">'+
 				  		'<div class="row"><div class="col-sm-12 col-md-12" align="center"><label>Esta sacará del proceso de revisión el elemento a descartar.</label></div></div>'+
 				  		'<div class="row">'+
 				  				'<div class="  col-md-3 col-sm-6 col-xs-12 col-md-offset-3">'+
 				  					'<button id="update" type="button" class="btn btn-success" ng-click="confirm()" ng-disabled="!myForm.$valid">Aceptar</button>'+
 				  				'</div>'+
 				  				'<div class="  col-md-3 col-sm-6 col-xs-12">'+
 				  					'<button id="cancel" type="button" class="btn btn-warning" ng-click="closeThisDialog()">Cancelar</button>'+
 				  				'</div>'+
 				  		'</div>'+
 				  '</form>',
 	                  plain: true // se usa cuando se agrega un template
 	              }).then(function (){
 	            	  	console.info("::: ACEPTA ::: ");

 	            	  	$scope.valuesTable.tableMessage.showAnimation=true;
 	            	  	$scope.valuesTable.tableMessage.state.show=false;
 	            	  	$scope.valuesTable.totalRows=0;//oculta la tabla

 	            	  	var reportParams={
 	            	  			tipoReporte:$scope.tipoReporte,
 	            	  			idReporte:item.IdReporte,
 	            	  			analista:settings.user,
 	            	  			nombreAnalista:settings.userName,
 	            	  	};

 	            	  	appAModuloReportes.descartaReporte(reportParams)
 	          				.then(function (tableVO) {
 	          					$scope.valuesTable.tableMessage.showAnimation=false;
 	          					$scope.valuesTable.tableMessage=tableVO;
 	          				},function(parentVO){
 	          					$scope.valuesTable.tableMessage.showAnimation=false;
 	          					$scope.valuesTable.tableMessage=parentVO;
 	          				}).then(function(){
 	          					$scope.callData();
 	          				});

 	              },function(){
 	              	console.debug("CANCELAR");
 	              });


         });

        	$scope.$on('callRespaldar', function (event, data) {// se atrapa el evento generado por el tool respaldar
        		pldModel.valuesTable=$scope.valuesTable;
        		ngDialog.openConfirm({ // openConfirm trabaja como una promesa por eso usamos then --v
					template: '<center><h3>Respaldar Reporte</h3>'+
							  '<form name="myForm">'+
							  		'<div class="row"><label>Ingrese el folio de acuse, y presione aceptar</label></div><br/>'+
							  		'<input type="text" autocomplete="off" class="form-control" id="folioAcuse" placeholder="Folio de Acuse" ng-model="folioAcuse"></br></br>'+
							  		'<div class="row">'+
					  					'<div class="  col-md-3 col-sm-6 col-xs-12 col-md-offset-3">'+
					  						'<button id="cancel" type="button" class="btn btn-danger" ng-click="closeThisDialog()">cancelar</button>'+
					  					'</div>'+
					  					'<div class="  col-md-3 col-sm-6 col-xs-12">'+
					  						'<button id="update" type="button" class="btn btn-success" ng-disabled="folioAcuse == undefined" ng-click="confirm(folioAcuse)">Aceptar</button>'+
					  					'</div>'+
					  				'</div>'+
							  '</form></center>',
					plain:true,
					closeByEscape: true,
					className: 'ngdialog-theme-default' })
					.then(function(folioAcuse){
						var tableParams={	tipoReporte: $scope.tipoReporte,
											folio:folioAcuse,
											idReporte:data.IdReporte,
											analista:settings.user,
											nombreAnalista:settings.userName,};

	        			appAModuloReportes.respaldaReporte(tableParams)//Factory que hace la consulta (VER DOCUMENTACION "Documentacionmonitoreo.pdf"
	        			.then(function (tableVO) {
	        				$scope.callData();
	        			},function(parentVO){
	        				$scope.callData();
	        			});
					});

        	});

        }]).controller('monitoreablesVidaDetCtrl', ['$scope','$state','$stateParams','appAModuloReportes','pldModel',function ($scope,$state,$stateParams,appAModuloReportes,pldModel) {

        	//$scope.$emit('changeNavigation',{level:1,breadcombs:{title:'detalle',state:'monitoreablesVida.detalle'}});

    		$scope.rule=pldModel.rule;
    		//variables de la tabla
    		$scope.valuesDetalle=pldModel.valuesDetalle;

        	$scope.reloadTable=false;
        	$scope.configTable={detalle:false,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'monitoreablesVida-detalle',//trae el titulo de la directiva titulo
        			filters:{Fechadenacimiento:'date',Fecha:'date',Monto:'currency',MontoUSD:'currency'}};


        	$scope.callData = function(){
        		$scope.valuesDetalle.tableMessage.showAnimation=true;
        		$scope.valuesDetalle.tableMessage.state.show=false;


        		if(pldModel.tab==4){
        			var tableParams={params:{idtiporeportepld:pldModel.tipoReporte,idreporte:$stateParams.idDetalle,},
        					keyTable:'detalle',};

            			appAModuloReportes.detalleReportesHistorial(tableParams)//Factory que hace la consulta (VER DOCUMENTACION "Documentacionmonitoreo.pdf"
            			.then(function (tableVO) {
            				$scope.reloadTable=true;
            			},function(parentVO){
            				$scope.reloadTable=true;
            			});

        		}else{
        			var tableParams={ params:{idtiporeportepld:pldModel.tipoReporte,idreporte:$stateParams.idDetalle},
		  					keyTable:'detalle',}
        			appAModuloReportes.detalleReportes(tableParams)
           				.then(function (tableVO) {
           					$scope.reloadTable=true;
           				},function(parentVO){
           					$scope.reloadTable=true;
           				});
        		}

    		};

    		$scope.$on('callReport', function (event, item) {
    			pldModel.report.idMovimiento=item.IdMovimiento;
    			pldModel.report.idCliente=item.IdCliente;

        		$state.go('.reporte');
        		});

    		if(pldModel.valuesDetalle.totalRows==0){
    			if(pldModel.valuesTable.totalRows==0){//la vista principal esta vacia, producto de un F5
    				$state.go(pldModel.startMapping);//cuando se actualiza la pagina desde el detalle redirige a la ventana principal
    			}else{
    				$scope.callData();
    			}
    		}

    }]);

})();

},{}],8:[function(require,module,exports){
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

},{"./preocupantesVida.js":9}],9:[function(require,module,exports){
/**
 * monitoreo/preocupantesVida
 */

'use strict';
(function(){
    angular.module("pld.moduloReportes.preocupantesVida", ['wcPldCommons','pldServices','serviceAppAModuloReportes','pldComponentTable','ngDialog'])
        
    .controller('preocupantesVidaCtrl', ['$scope',function ($scope) {
        	console.debug('preocupantesVidaCtrl loaded ...');
        }]).controller('preocupantesVidaPrinCtrl',  ['$scope','$state','$stateParams','appAModuloReportes','pldModel','settings','ngDialog',function ($scope,$state,$stateParams,appAModuloReportes,pldModel,settings,ngDialog) {
        	
        	
        	//inicializacion de variables controlador
        	$scope.rule=pldModel.rule;
			//$scope.trimestre=pldModel.form.trimestre;
			//$scope.anio=pldModel.form.anio;
			
			$scope.fhini=pldModel.form.fhini;
			$scope.fhfin=pldModel.form.fhfin;
			
			$scope.tab=pldModel.tab;
			$scope.catTipoReporte=[];
			$scope.trimestres=[];
			
			$scope.tipoReporte=pldModel.tipoReporte;
			
			
			//variables de la tabla
			$scope.valuesTable=pldModel.valuesTable;
			$scope.reloadTable=false;
        	$scope.configTable={detalle:false,check:true,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'preocupantesVida-generacion',
        			filters:{FechaDeteccion:'date',Monto:'currency'}};
        	
        	//	carga de catalogos
			
			appAModuloReportes.consultaTiposReporte(3)  //CARGA tipoReporte preocupantes con 3
						.then(function(data){
							$scope.catTipoReporte=data.jsonResult;
							$scope.tipoReporte=data.jsonResult[0].IdTipoReporte;
						},function(error){
							$scope.valuesTable.tableMessage.state=error.state;
							$scope.valuesTable.tableMessage.message=error.message;
						});/*.then(appAModuloReportes.consultaTrimestres(settings)
								.then(function(data){
									$scope.trimestres=data.jsonResult;
								},function(error){
									$scope.valuesTable.tableMessage.state=error.state;
									$scope.valuesTable.tableMessage.message=error.message;
								}));*/
        	
        	
        	//Funciones del controlador
			
			
        	$scope.changeTab=function(tab){
        		console.log('changing tab  to. . . =>'+tab);
        		$scope.tab=tab;
        		
        		//cleaning table
        		$scope.valuesTable={
        				tableMessage : {state : {success : false,show : false,styleMessage : '',message : '',styleIcon : ''},
							showAnimation : false,},
						headers : [],
						registers : [],
						displayedPage : [],
						reverse : false,
						paginated : false,
						range : [],
						pageSize : 10,
						currentPage : 0,
						totalRows : 0,
						columnToOrder : '',
						searchText : '',};
        		
        		switch (tab) {
				case 1:
					$scope.configTable={detalle:false,check:true,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'preocupantesVida-generacion',
	        			filters:{FechaDeteccion:'date',Monto:'currency'}};
					break;
				case 2:
					$scope.configTable={detalle:true,descartar:true,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'preocupantesVida-consulta',
	        			filters:{FechaDeteccion:'date',Monto:'currency'}};
					break;
				case 3:
					$scope.configTable={detalle:true,respaldar:true,editar:false,search:true, pages:true, excel:true,pagination:true,tableName:'preocupantesVida-descarga',
	        			filters:{Monto:'currency'}};
					break;
				case 4:
					$scope.configTable={detalle:true,editar:false,search:true, pages:true, excel:true,pagination:true,tableName:'preocupantesVida-historico',
	        			filters:{Monto:'currency'}};
					break;
				default:
					break;
				}

        		
        	};
        	
        	$scope.endSelection=function(){
        		
        		var dialog = ngDialog.openConfirm({
	            	  template:'<h5 align="center"><b>¿Desea generar el reporte de los elementos?</b></h5>'+
					  '<form name="myForm">'+
				  		'<div class="row"><div class="col-sm-12 col-md-12" align="center"><label>Esta acción iniciará el proceso de revisión de reportes para los elementos seleccionados.</label></div></div>'+
				  		'<div class="row">'+
				  				'<div class="  col-md-3 col-sm-6 col-xs-12 col-md-offset-3">'+
				  					'<button id="update" type="button" class="btn btn-success" ng-click="confirm()" ng-disabled="!myForm.$valid">Aceptar</button>'+
				  				'</div>'+
				  				'<div class="  col-md-3 col-sm-6 col-xs-12">'+
				  					'<button id="cancel" type="button" class="btn btn-warning" ng-click="closeThisDialog()">Cancelar</button>'+
				  				'</div>'+
				  		'</div>'+
				  '</form>',
	                  plain: true // se usa cuando se agrega un template           
	              }).then(function (){
	            	  	console.info("::: ACEPTA DOWNLOAD ::: ");
	            	  
	            	  	$scope.valuesTable.tableMessage.showAnimation=true;
	            	  	$scope.valuesTable.tableMessage.state.show=false;
	            	  	$scope.valuesTable.totalRows=0;//oculta la tabla
	            	  	
	            	  	var reportParams={
	            	  			tipoReporte:$scope.tipoReporte,
	            	  			idReporte:'',//El id de reporte se recupera en el backend
	            	  			trimestre:'',
	            	  			anio:'',
	            	  			analista:settings.user,
	            	  			nombreAnalista:settings.userName,
	            	  			seleccionados:[],	
	            	  	};
	            	  	
	            	  	for(var index in $scope.valuesTable.registers){
            	  			if($scope.valuesTable.registers[index].check==true)
            	  				reportParams.seleccionados.push($scope.valuesTable.registers[index].IdTemporal);
            	  		}
	            	  	
	            	  	//reportParams.trimestre=$scope.trimestre;
            	  		//reportParams.anio=$scope.anio;
	            	  	
	            	  	appAModuloReportes.cargaSeleccionados(reportParams)
	          				.then(function (tableVO) {
	          					$scope.valuesTable.tableMessage.showAnimation=false;
	          					$scope.valuesTable.tableMessage=tableVO;
	          				},function(parentVO){
	          					$scope.valuesTable.tableMessage.showAnimation=false;
	          					$scope.valuesTable.tableMessage=parentVO;
	          				}).then(function(){
	          					$scope.callData();
	          				});
	            	 	            	  
	              },function(){            	  
	              	console.debug("CANCELA DOWNLOAD");	              		
	              });
	
        	}

        	$scope.callData = function(){
        		
        		$scope.valuesTable.tableMessage.showAnimation=true;
        		$scope.valuesTable.tableMessage.state.show=false;
        		$scope.valuesTable.totalRows=0;//oculta la tabla
        		
        		//pldModel.form.trimestre=$scope.trimestre;
        		//pldModel.form.anio=$scope.anio;
        		pldModel.form.fhini=$scope.fhini;
        		pldModel.form.fhfin=$scope.fhfin;
        		
        		
        		switch ($scope.tab) {
        	  	case 1://Generacion
        	  		var tableParams={params:{idtiporeportepld : $scope.tipoReporte,fechainicial : $scope.fhini,fechafinal : $scope.fhfin,trimestre : '',anio : '',},
        				keyTable:'principal',
			  		  };
        	  		
        	  		appAModuloReportes.consultaMovimientosReportados(tableParams)
        	  			.then(function (tableVO) {
        	  				$scope.reloadTable=true;
        	  			},function(parentVO){
        	  				$scope.reloadTable=true;
        	  			});
        	  		break;
        	  	case 2://consulta
        	  		var tableParams={params:{idtiporeportepld:$scope.tipoReporte,fhinicial:$scope.fhini,fhfinal:$scope.fhfin,trimestre:'',anio:'',
        						},keyTable:'principal',};
        	  		appAModuloReportes.consultaReportes(tableParams)
    	  				.then(function (tableVO) {
    	  					$scope.reloadTable=true;	
    	  				},function(parentVO){
    	  					$scope.reloadTable=true;
    	  				});
        	  		break;
        	  	case 3://descarga
        	  		var tableParams={params:{idtiporeportepld:$scope.tipoReporte,fhinicial:$scope.fhini,fhfinal:$scope.fhfin,trimestre:'',anio:'',
        						},keyTable:'principal',};
        	  		appAModuloReportes.consultaDescargaReportes(tableParams)
	  					.then(function (tableVO) {
	  						$scope.reloadTable=true;	
	  					},function(parentVO){
	  						$scope.reloadTable=true;
	  					});
        	  		break;
        	  	case 4://historico
        	  		var tableParams={params:{idtiporeportepld:$scope.tipoReporte,fhinicial:$scope.fhini,fhfinal:$scope.fhfin,trimestre:'',anio:'',
        						},keyTable:'principal',};
        	  		appAModuloReportes.consultaReportesHistorial(tableParams)
        	  			.then(function (tableVO) {
        	  				$scope.reloadTable=true;	
        	  			},function(parentVO){
        	  				$scope.reloadTable=true;
        	  			});
        	  		break;
        	  		
        	  	default:
        	  		break;
        	  	}
        		

            };
            
            
        	
        	$scope.$on('callDetail', function (event, item) {
        		pldModel.valuesTable=$scope.valuesTable;
        		pldModel.valuesDetalle.totalRows=0;
        		pldModel.tab=$scope.tab;
        		pldModel.tipoReporte=$scope.tipoReporte;
        		$scope.$emit('pushNavigation',{title:'Detalle',state:'preocupantesVida.detalle'});
        		$state.go('.detalle',{idDetalle:item.IdReporte});
        		});
        	
        	 $scope.$on('callDiscart', function (event,item){
             	
         		var dialog = ngDialog.openConfirm({
 	            	  template:'<h5 align="center"><b>¿Desea descartar el elemento seleccionado?</b></h5>'+
 					  '<form name="myForm">'+
 				  		'<div class="row"><div class="col-sm-12 col-md-12" align="center"><label>Esta sacará del proceso de revisión el elemento a descartar.</label></div></div>'+
 				  		'<div class="row">'+
 				  				'<div class="  col-md-3 col-sm-6 col-xs-12 col-md-offset-3">'+
 				  					'<button id="update" type="button" class="btn btn-success" ng-click="confirm()" ng-disabled="!myForm.$valid">Aceptar</button>'+
 				  				'</div>'+
 				  				'<div class="  col-md-3 col-sm-6 col-xs-12">'+
 				  					'<button id="cancel" type="button" class="btn btn-warning" ng-click="closeThisDialog()">Cancelar</button>'+
 				  				'</div>'+
 				  		'</div>'+
 				  '</form>',
 	                  plain: true // se usa cuando se agrega un template           
 	              }).then(function (){
 	            	  	console.info("::: ACEPTA ::: ");
 	            	  
 	            	  	$scope.valuesTable.tableMessage.showAnimation=true;
 	            	  	$scope.valuesTable.tableMessage.state.show=false;
 	            	  	$scope.valuesTable.totalRows=0;//oculta la tabla
 	            	  	
 	            	  	var reportParams={
 	            	  			tipoReporte:$scope.tipoReporte,
 	            	  			idReporte:item.IdReporte,
 	            	  			analista:settings.user,
 	            	  			nombreAnalista:settings.userName,
 	            	  	};
 	            	  	
 	            	  	appAModuloReportes.descartaReporte(reportParams)
 	          				.then(function (tableVO) {
 	          					$scope.valuesTable.tableMessage.showAnimation=false;
 	          					$scope.valuesTable.tableMessage=tableVO;
 	          				},function(parentVO){
 	          					$scope.valuesTable.tableMessage.showAnimation=false;
 	          					$scope.valuesTable.tableMessage=parentVO;
 	          				}).then(function(){
 	          					$scope.callData();
 	          				});
 	            	 	            	  
 	              },function(){            	  
 	              	console.debug("CANCELAR");	              		
 	              });
 	
         	
         });
        	
        	$scope.$on('callRespaldar', function (event, data) {
        		pldModel.valuesTable=$scope.valuesTable;
        		ngDialog.openConfirm({ // openConfirm trabaja como una promesa por eso usamos then --v
					template: '<center><h3>Respaldar Reporte</h3>'+
							  '<form name="myForm">'+
							  		'<div class="row"><label>Ingrese el folio de acuse, y presione aceptar</label></div><br/>'+
							  		'<input type="text" autocomplete="off" class="form-control" id="folioAcuse" placeholder="Folio de Acuse" ng-model="folioAcuse"></br></br>'+
							  		'<div class="row">'+
					  					'<div class="  col-md-3 col-sm-6 col-xs-12 col-md-offset-3">'+
					  						'<button id="cancel" type="button" class="btn btn-danger" ng-click="closeThisDialog()">cancelar</button>'+
					  					'</div>'+
					  					'<div class="  col-md-3 col-sm-6 col-xs-12">'+
					  						'<button id="update" type="button" class="btn btn-success" ng-disabled="folioAcuse == undefined" ng-click="confirm(folioAcuse)">Aceptar</button>'+
					  					'</div>'+
					  				'</div>'+  		
							  '</form></center>',
					plain:true,
					closeByEscape: true,							
					className: 'ngdialog-theme-default' })
					.then(function(folioAcuse){
						var tableParams={	tipoReporte: $scope.tipoReporte, 
											folio:folioAcuse,
											idReporte:data.IdReporte,
											analista:settings.user,
											nombreAnalista:settings.userName,};	
						
	        			appAModuloReportes.respaldaReporte(tableParams)//Factory que hace la consulta (VER DOCUMENTACION "Documentacionmonitoreo.pdf"
	        			.then(function (tableVO) {	        				
	        				$scope.callData();
	        			},function(parentVO){
	        				$scope.callData();
	        			});
					});	

        	});
        	
        }]).controller('preocupantesVidaDetCtrl', ['$scope','$state','$stateParams','appAModuloReportes','pldModel',function ($scope,$state,$stateParams,appAModuloReportes,pldModel) {
        	
        	//$scope.$emit('changeNavigation',{level:1,breadcombs:{title:'detalle',state:'preocupantesVida.detalle'}});
        	
    		$scope.rule=pldModel.rule;
    		//variables de la tabla
    		$scope.valuesDetalle=pldModel.valuesDetalle;
    		
        	$scope.reloadTable=false;
        	$scope.configTable={detalle:false,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'preocupantesVida-detalle',//trae el titulo de la directiva titulo
        			filters:{Fechadenacimiento:'date',Fecha:'date',Monto:'currency',MontoUSD:'currency'}};
        	
        	
        	$scope.callData = function(){
        		$scope.valuesDetalle.tableMessage.showAnimation=true;
        		$scope.valuesDetalle.tableMessage.state.show=false;
        		
        		
        		if(pldModel.tab==4){
        			var tableParams={params:{idtiporeportepld:pldModel.tipoReporte,idreporte:$stateParams.idDetalle,},
        					keyTable:'detalle',};
            		    		
            			appAModuloReportes.detalleReportesHistorial(tableParams)//Factory que hace la consulta (VER DOCUMENTACION "Documentacionmonitoreo.pdf"
            			.then(function (tableVO) {
            				$scope.reloadTable=true;
            			},function(parentVO){
            				$scope.reloadTable=true;
            			});
        			
        		}else{
        			var tableParams={ params:{idtiporeportepld:pldModel.tipoReporte,idreporte:$stateParams.idDetalle},
		  					keyTable:'detalle',}
        			appAModuloReportes.detalleReportes(tableParams)
           				.then(function (tableVO) {
           					$scope.reloadTable=true;
           				},function(parentVO){
           					$scope.reloadTable=true;
           				});
        		}
        		

        		
    			
       		
    		};
    		
    		$scope.$on('callReport', function (event, item) {
    			pldModel.report.idMovimiento=item.IdMovimiento;
    			pldModel.report.idCliente=item.IdCliente;
        		
        		$state.go('.reporte');
        		});
    		
    		if(pldModel.valuesDetalle.totalRows==0){
    			if(pldModel.valuesTable.totalRows==0){//la vista principal esta vacia, producto de un F5
    				$state.go(pldModel.startMapping);//cuando se actualiza la pagina desde el detalle redirige a la ventana principal
    			}else{
    				$scope.callData();
    			}
    		}
 	
    }]);
        		
})();

},{}],10:[function(require,module,exports){
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

},{"./regulatoriosVida.js":11}],11:[function(require,module,exports){
/**
 * monitoreo/regulatoriosVida
 */

'use strict';
(function(){
    angular.module("pld.moduloReportes.regulatoriosVida", ['wcPldCommons','pldServices','serviceAppAModuloReportes','pldComponentTable','ngDialog'])
        
    .controller('regulatoriosVidaCtrl', ['$scope',function ($scope) {
        	console.debug('regulatoriosVidaCtrl loaded ...');
        }]).controller('regulatoriosVidaPrinCtrl', ['$scope','$state','$stateParams','appAModuloReportes','pldModel','settings','ngDialog',function ($scope,$state,$stateParams,appAModuloReportes,pldModel,settings,ngDialog) {
        	
        	
        	//inicializacion de variables controlador
        	$scope.rule=pldModel.rule;
			$scope.trimestre=pldModel.form.trimestre;
			$scope.anio=pldModel.form.anio;
			
			//$scope.fhini=pldModel.form.fhini;
			//$scope.fhfin=pldModel.form.fhfin;
			
			$scope.tab=pldModel.tab;
			$scope.catTipoReporte=[];
			$scope.trimestres=[];
			
			$scope.tipoReporte=pldModel.tipoReporte;
			
			
			//variables de la tabla
			$scope.valuesTable=pldModel.valuesTable;
			$scope.reloadTable=false;
        	$scope.configTable={detalle:false,check:false,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'regulatoriosVida-generacion',
        			filters:{FechaDeteccion:'date',Monto:'currency'}};
        	
        	//	carga de catalogos
			
			appAModuloReportes.consultaTiposReporte(2)  //CARGA tipoReporte regulatorios con 2
						.then(function(data){
							$scope.catTipoReporte=data.jsonResult;
							$scope.tipoReporte=data.jsonResult[0].IdTipoReporte;
						},function(error){
							$scope.valuesTable.tableMessage.state=error.state;
							$scope.valuesTable.tableMessage.message=error.message;
						}).then(appAModuloReportes.consultaTrimestres()
								.then(function(data){
									$scope.trimestres=data.jsonResult;
								},function(error){
									$scope.valuesTable.tableMessage.state=error.state;
									$scope.valuesTable.tableMessage.message=error.message;
								}));
        	
        	
        	//Funciones del controlador
			
			
        	$scope.changeTab=function(tab){
        		console.log('changing tab  to. . . =>'+tab);
        		$scope.tab=tab;
        		
        		//cleaning table
        		$scope.valuesTable={
        				tableMessage : {state : {success : false,show : false,styleMessage : '',message : '',styleIcon : ''},
							showAnimation : false,},
						headers : [],
						registers : [],
						displayedPage : [],
						reverse : false,
						paginated : false,
						range : [],
						pageSize : 10,
						currentPage : 0,
						totalRows : 0,
						columnToOrder : '',
						searchText : '',};
        		
        		switch (tab) {
				case 1:
					$scope.configTable={detalle:false,check:false,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'regulatoriosVida-generacion',
	        			filters:{FechaDeteccion:'date',Monto:'currency'}};
					break;
				case 2:
					$scope.configTable={detalle:true,descartar:true,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'regulatoriosVida-consulta',
	        			filters:{FechaDeteccion:'date',Monto:'currency'}};
					break;
				case 3:
					$scope.configTable={detalle:true,respaldar:true,editar:false,search:true, pages:true, excel:true,pagination:true,tableName:'regulatoriosVida-descarga',
	        			filters:{Monto:'currency'}};
					break;
				case 4:
					$scope.configTable={detalle:true,editar:false,search:true, pages:true, excel:true,pagination:true,tableName:'regulatoriosVida-historico',
	        			filters:{Monto:'currency'}};
					break;
				default:
					break;
				}

        		
        	};
        	
        	$scope.endSelection=function(){
        		
        		var dialog = ngDialog.openConfirm({
	            	  template:'<h5 align="center"><b>¿Desea generar el reporte de los elementos?</b></h5>'+
					  '<form name="myForm">'+
				  		'<div class="row"><div class="col-sm-12 col-md-12" align="center"><label>Esta acción iniciará el proceso de revisión de reportes para los elementos seleccionados.</label></div></div>'+
				  		'<div class="row">'+
				  				'<div class="  col-md-3 col-sm-6 col-xs-12 col-md-offset-3">'+
				  					'<button id="update" type="button" class="btn btn-success" ng-click="confirm()" ng-disabled="!myForm.$valid">Aceptar</button>'+
				  				'</div>'+
				  				'<div class="  col-md-3 col-sm-6 col-xs-12">'+
				  					'<button id="cancel" type="button" class="btn btn-warning" ng-click="closeThisDialog()">Cancelar</button>'+
				  				'</div>'+
				  		'</div>'+
				  '</form>',
	                  plain: true // se usa cuando se agrega un template           
	              }).then(function (){
	            	  	console.info("::: ACEPTA DOWNLOAD ::: ");
	            	  
	            	  	$scope.valuesTable.tableMessage.showAnimation=true;
	            	  	$scope.valuesTable.tableMessage.state.show=false;
	            	  	$scope.valuesTable.totalRows=0;//oculta la tabla
	            	  	
	            	  	var reportParams={
	            	  			tipoReporte:$scope.tipoReporte,
	            	  			idReporte:'',//El id de reporte se recupera en el backend
	            	  			trimestre:'',
	            	  			anio:'',
	            	  			analista:settings.user,
	            	  			nombreAnalista:settings.userName,
	            	  			seleccionados:[],	
	            	  	};
	            	  	
	            	  	/*for(var index in $scope.valuesTable.registers){
            	  			if($scope.valuesTable.registers[index].check==true)
            	  				reportParams.seleccionados.push($scope.valuesTable.registers[index].IdTemporal);
            	  		}*/
	            	  	
	            	  	reportParams.trimestre=$scope.trimestre;
            	  		reportParams.anio=$scope.anio;
	            	  	
	            	  	appAModuloReportes.cargaSeleccionados(reportParams)
	          				.then(function (tableVO) {
	          					$scope.valuesTable.tableMessage.showAnimation=false;
	          					$scope.valuesTable.tableMessage=tableVO;
	          				},function(parentVO){
	          					$scope.valuesTable.tableMessage.showAnimation=false;
	          					$scope.valuesTable.tableMessage=parentVO;
	          				}).then(function(){
	          					$scope.callData();
	          				});
	            	 	            	  
	              },function(){            	  
	              	console.debug("CANCELA DOWNLOAD");	              		
	              });
	
        	}

        	$scope.callData = function(){
        		
        		$scope.valuesTable.tableMessage.showAnimation=true;
        		$scope.valuesTable.tableMessage.state.show=false;
        		$scope.valuesTable.totalRows=0;//oculta la tabla
        		
        		pldModel.form.trimestre=$scope.trimestre;
        		pldModel.form.anio=$scope.anio;
        		//pldModel.form.fhini=$scope.fhini;
        		//pldModel.form.fhfin=$scope.fhfin;
        		
        		
        		switch ($scope.tab) {
        	  	case 1://Generacion
        	  		var tableParams={params:{idtiporeportepld : $scope.tipoReporte,fechainicial : '',fechafinal : '',trimestre : $scope.trimestre,anio : $scope.anio,},
        				keyTable:'principal',
			  		  };
        	  		
        	  		appAModuloReportes.consultaMovimientosReportados(tableParams)
        	  			.then(function (tableVO) {
        	  				$scope.reloadTable=true;
        	  			},function(parentVO){
        	  				$scope.reloadTable=true;
        	  			});
        	  		break;
        	  	case 2://consulta
        	  		var tableParams={params:{idtiporeportepld:$scope.tipoReporte,fechainicial : '',fechafinal : '',trimestre : $scope.trimestre,anio : $scope.anio,},
        						keyTable:'principal',};
        	  		appAModuloReportes.consultaReportes(tableParams)
    	  				.then(function (tableVO) {
    	  					$scope.reloadTable=true;	
    	  				},function(parentVO){
    	  					$scope.reloadTable=true;
    	  				});
        	  		break;
        	  	case 3://descarga
        	  		var tableParams={params:{idtiporeportepld:$scope.tipoReporte,fechainicial : '',fechafinal : '',trimestre : $scope.trimestre,anio : $scope.anio,},
        						keyTable:'principal',};
        	  		appAModuloReportes.consultaDescargaReportes(tableParams)
	  					.then(function (tableVO) {
	  						$scope.reloadTable=true;	
	  					},function(parentVO){
	  						$scope.reloadTable=true;
	  					});
        	  		break;
        	  	case 4://historico
        	  		var tableParams={params:{idtiporeportepld:$scope.tipoReporte,fechainicial : '',fechafinal : '',trimestre : $scope.trimestre,anio : $scope.anio,},
        						keyTable:'principal',};
        	  		appAModuloReportes.consultaReportesHistorial(tableParams)
        	  			.then(function (tableVO) {
        	  				$scope.reloadTable=true;	
        	  			},function(parentVO){
        	  				$scope.reloadTable=true;
        	  			});
        	  		break;
        	  		
        	  	default:
        	  		break;
        	  	}
        		

            };
            
            
        	
        	$scope.$on('callDetail', function (event, item) {
        		pldModel.valuesTable=$scope.valuesTable;
        		pldModel.valuesDetalle.totalRows=0;
        		pldModel.tab=$scope.tab;
        		pldModel.tipoReporte=$scope.tipoReporte;
        		$scope.$emit('pushNavigation',{title:'Detalle',state:'regulatoriosVida.detalle'});
        		$state.go('.detalle',{idDetalle:item.IdReporte});
        		});
        	
        	 $scope.$on('callDiscart', function (event,item){
             	
         		var dialog = ngDialog.openConfirm({
 	            	  template:'<h5 align="center"><b>¿Desea descartar el elemento seleccionado?</b></h5>'+
 					  '<form name="myForm">'+
 				  		'<div class="row"><div class="col-sm-12 col-md-12" align="center"><label>Esta sacará del proceso de revisión el elemento a descartar.</label></div></div>'+
 				  		'<div class="row">'+
 				  				'<div class="  col-md-3 col-sm-6 col-xs-12 col-md-offset-3">'+
 				  					'<button id="update" type="button" class="btn btn-success" ng-click="confirm()" ng-disabled="!myForm.$valid">Aceptar</button>'+
 				  				'</div>'+
 				  				'<div class="  col-md-3 col-sm-6 col-xs-12">'+
 				  					'<button id="cancel" type="button" class="btn btn-warning" ng-click="closeThisDialog()">Cancelar</button>'+
 				  				'</div>'+
 				  		'</div>'+
 				  '</form>',
 	                  plain: true // se usa cuando se agrega un template           
 	              }).then(function (){
 	            	  	console.info("::: ACEPTA ::: ");
 	            	  
 	            	  	$scope.valuesTable.tableMessage.showAnimation=true;
 	            	  	$scope.valuesTable.tableMessage.state.show=false;
 	            	  	$scope.valuesTable.totalRows=0;//oculta la tabla
 	            	  	
 	            	  	var reportParams={
 	            	  			tipoReporte:$scope.tipoReporte,
 	            	  			idReporte:item.IdReporte,
 	            	  			analista:settings.user,
 	            	  			nombreAnalista:settings.userName,
 	            	  	};
 	            	  	
 	            	  	appAModuloReportes.descartaReporte(reportParams)
 	          				.then(function (tableVO) {
 	          					$scope.valuesTable.tableMessage.showAnimation=false;
 	          					$scope.valuesTable.tableMessage=tableVO;
 	          				},function(parentVO){
 	          					$scope.valuesTable.tableMessage.showAnimation=false;
 	          					$scope.valuesTable.tableMessage=parentVO;
 	          				}).then(function(){
 	          					$scope.callData();
 	          				});
 	            	 	            	  
 	              },function(){            	  
 	              	console.debug("CANCELAR");	              		
 	              });
 	
         	
         });
        	
        	$scope.$on('callRespaldar', function (event, data) {
        		pldModel.valuesTable=$scope.valuesTable;
        		ngDialog.openConfirm({ // openConfirm trabaja como una promesa por eso usamos then --v
					template: '<center><h3>Respaldar Reporte</h3>'+
							  '<form name="myForm">'+
							  		'<div class="row"><label>Ingrese el folio de acuse, y presione aceptar</label></div><br/>'+
							  		'<input type="text" autocomplete="off" class="form-control" id="folioAcuse" placeholder="Folio de Acuse" ng-model="folioAcuse"></br></br>'+
							  		'<div class="row">'+
					  					'<div class="  col-md-3 col-sm-6 col-xs-12 col-md-offset-3">'+
					  						'<button id="cancel" type="button" class="btn btn-danger" ng-click="closeThisDialog()">cancelar</button>'+
					  					'</div>'+
					  					'<div class="  col-md-3 col-sm-6 col-xs-12">'+
					  						'<button id="update" type="button" class="btn btn-success" ng-disabled="folioAcuse == undefined" ng-click="confirm(folioAcuse)">Aceptar</button>'+
					  					'</div>'+
					  				'</div>'+  		
							  '</form></center>',
					plain:true,
					closeByEscape: true,							
					className: 'ngdialog-theme-default' })
					.then(function(folioAcuse){
						var tableParams={	tipoReporte: $scope.tipoReporte, 
											folio:folioAcuse,
											idReporte:data.IdReporte,
											analista:settings.user,
											nombreAnalista:settings.userName,};	
						
	        			appAModuloReportes.respaldaReporte(tableParams)//Factory que hace la consulta (VER DOCUMENTACION "Documentacionmonitoreo.pdf"
	        			.then(function (tableVO) {	        				
	        				$scope.callData();
	        			},function(parentVO){
	        				$scope.callData();
	        			});
					});	

        	});
        	
        }]).controller('regulatoriosVidaDetCtrl', ['$scope','$state','$stateParams','appAModuloReportes','pldModel',function ($scope,$state,$stateParams,appAModuloReportes,pldModel) {
        	
        	//$scope.$emit('changeNavigation',{level:1,breadcombs:{title:'detalle',state:'regulatoriosVida.detalle'}});
        	
    		$scope.rule=pldModel.rule;
    		//variables de la tabla
    		$scope.valuesDetalle=pldModel.valuesDetalle;
    		
        	$scope.reloadTable=false;
        	$scope.configTable={detalle:false,reporte:false,search:true, pages:true, excel:true,pagination:true,tableName:'regulatoriosVida-detalle',//trae el titulo de la directiva titulo
        			filters:{Fechadenacimiento:'date',Fecha:'date',Monto:'currency',MontoUSD:'currency'}};
        	
        	
        	$scope.callData = function(){
        		$scope.valuesDetalle.tableMessage.showAnimation=true;
        		$scope.valuesDetalle.tableMessage.state.show=false;
        		
        		
        		if(pldModel.tab==4){
        			var tableParams={params:{idtiporeportepld:pldModel.tipoReporte,idreporte:$stateParams.idDetalle,},
        					keyTable:'detalle',};
            		    		
            			appAModuloReportes.detalleReportesHistorial(tableParams)//Factory que hace la consulta (VER DOCUMENTACION "Documentacionmonitoreo.pdf"
            			.then(function (tableVO) {
            				$scope.reloadTable=true;
            			},function(parentVO){
            				$scope.reloadTable=true;
            			});
        			
        		}else{
        			var tableParams={ params:{idtiporeportepld:pldModel.tipoReporte,idreporte:$stateParams.idDetalle},
		  					keyTable:'detalle',}
        			appAModuloReportes.detalleReportes(tableParams)
           				.then(function (tableVO) {
           					$scope.reloadTable=true;
           				},function(parentVO){
           					$scope.reloadTable=true;
           				});
        		}
        		

        		
    			
       		
    		};
    		
    		$scope.$on('callReport', function (event, item) {
    			pldModel.report.idMovimiento=item.IdMovimiento;
    			pldModel.report.idCliente=item.IdCliente;
        		
        		$state.go('.reporte');
        		});
    		
    		if(pldModel.valuesDetalle.totalRows==0){
    			if(pldModel.valuesTable.totalRows==0){//la vista principal esta vacia, producto de un F5
    				$state.go(pldModel.startMapping);//cuando se actualiza la pagina desde el detalle redirige a la ventana principal
    			}else{
    				$scope.callData();
    			}
    		}
 	
    }]);
        		
})();

},{}],12:[function(require,module,exports){
/**
* Service para las operaciones del modulo Reportes
*/
(function(){
  angular.module('serviceAppAModuloReportes',[])
  .factory('appAModuloReportes',[ '$http', '$q', '$filter', function($http, $q, $filter) {
    //variable para manejo de errores
    var networkError={state:{success:false, show:true, message:'Error de conexión', styleMessage:'alert-danger', styleIcon:'fa fa-frown-o',},
    message:{show:false,	style:'message-info',info:'Error de conexión, es posible que no este conectado a la red o que el servidor no se encuentre disponible momentaneamente',}
  }
  //cvariable recuperada del Index y que agrega el contexto de la aplicacion.
  var context=url+'/restAppAModuloReportes';

  function consultaTiposReporte(catalogo){
    console.log('appAModuloReportes :: consultaDatosReporte :: RUNNING');
    var deferred = $q.defer();

    var cat=(catalogo==undefined || catalogo==null)?'':catalogo;
    // SP : SEGD_ConsultaCatTiposDeReporte
    // type : GET
    $http.get(context+'/consulta/tiposReporte?catalogo='+catalogo)
    .then(function onSuccess(data){
      console.debug('appAModuloReportes :: consultaTiposReporte :: SUCCESS');
      //console.log('data on service.');
      //console.log(data);
      deferred.resolve(data.data);
    },function onError(data,status){
      console.error('appAModuloReportes :: consultaTiposReporte :: ERROR');
      console.debug("HTML STATUS: "+status);
      if(status===0 || data.data==undefined){
        console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
        deferred.reject(networkError);
      }else{
        console.error(data);
        deferred.reject(data.data);}
      });

      return deferred.promise;
    }

    function consultaTrimestres(){
      console.log('appAModuloReportes :: consultaTrimestres :: RUNNING');
      var deferred = $q.defer();

      // SP : SEGD_ConsultaCatTrimestres
      // type : GET
      $http.get(context+'/consulta/Trimestres')
      .then(function onSuccess(data){
        console.debug('appAModuloReportes :: consultaTrimestres :: SUCCESS');
        deferred.resolve(data.data);
      },function onError(data,status){
        console.error('appAModuloReportes :: consultaTrimestres :: ERROR');
        console.debug("HTML STATUS: "+status);
        if(status===0 || data.data==undefined){
          console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
          deferred.reject(networkError);
        }else{
          console.error(data);
          deferred.reject(data.data);}
        });

        return deferred.promise;
      }

      function consultaReportado(movimiento){
        console.log('appAModuloReportes :: consultaReportado :: RUNNING');
        var deferred = $q.defer();

        var mov=(movimiento==undefined || movimiento==null)?'0':movimiento;
        // SP : SEGD_ConsultaSiMovimientoReportado
        // type : GET
        $http.get(context+'/consulta/Reportado?movimiento='+mov)
        .then(function onSuccess(data){
          console.debug('appAModuloReportes :: consultaReportado :: SUCCESS');
          deferred.resolve(data.data);
        },function onError(data,status){
          console.error('appAModuloReportes :: consultaReportado :: ERROR');
          console.debug("HTML STATUS: "+status);
          if(status===0 || data.data==undefined){
            console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
            deferred.reject(networkError);
          }else{
            console.error(data);
            deferred.reject(data.data);}
          });

          return deferred.promise;
        }

        function cargaSeleccionados(reportParams){
          console.log('appAModuloReportes :: cargaSeleccionados :: RUNNING');
          var deferred = $q.defer();

          // SP : SEGD_GeneraReporte
          // type : POST
          $http.post(context+'/carga/Seleccionados',reportParams)
          .then(function onSuccess(data){
            console.debug('appAModuloReportes :: cargaSeleccionados :: SUCCESS');
            deferred.resolve(data.data);
          },function onError(data,status){
            console.error('appAModuloReportes :: cargaSeleccionados :: ERROR');
            console.debug("HTML STATUS: "+status);
            if(status===0 || data.data==undefined){
              console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
              deferred.reject(networkError);
            }else{
              console.error(data);
              deferred.reject(data.data);}
            });

            return deferred.promise;
          }

          function consultaDatosReporte(tableparams){
            console.log('appAModuloReportes :: consultaDatosReporte :: RUNNING');
            var deferred = $q.defer();

            // SP : SEGD_ConsultaDatosParaReporte
            // type : POST
            $http.post(context+'/consulta/DatosReporte',tableparams)
            .then(function onSuccess(data){
              console.debug('appAModuloReportes :: consultaDatosReporte :: SUCCESS');
              deferred.resolve(data.data);
            },function onError(data,status){
              console.error('appAModuloReportes :: consultaDatosReporte :: ERROR');
              console.debug("HTML STATUS: "+status);
              if(status===0 || data.data==undefined){
                console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                deferred.reject(networkError);
              }else{
                console.error(data);
                deferred.reject(data.data);}
              });
              return deferred.promise;
            }


            function generaReporteManual(tableparams){
              console.log('appAModuloReportes :: generaReporteManual :: RUNNING');
              var deferred = $q.defer();

              // SP : SEGD_GuardaMovimientoReporte
              // type : POST
              $http.post(context+'/genera/ReporteManual',tableparams)
              .then(function onSuccess(data){
                console.debug('appAModuloReportes :: generaReporteManual :: SUCCESS');
                deferred.resolve(data.data);
              },function onError(data,status){
                console.error('appAModuloReportes :: generaReporteManual :: ERROR');
                console.debug("HTML STATUS: "+status);
                if(status===0 || data.data==undefined){
                  console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                  deferred.reject(networkError);
                }else{
                  console.error(data);
                  deferred.reject(data.data);}
                });

                return deferred.promise;
              }

              function consultaMovimientosReportados(tableparams){
                console.log('appAModuloReportes :: consultaMovimientosReportados :: RUNNING');
                var deferred = $q.defer();

                // SP : SEGD_ConsultaMovReportados
                // type : POST
                $http.post(context+'/consulta/MovimientosReportados',tableparams)
                .then(function onSuccess(data){
                  console.debug('appAModuloReportes :: consultaMovimientosReportados :: SUCCESS');
                  deferred.resolve(data.data);
                },function onError(data,status){
                  console.error('appAModuloReportes :: consultaMovimientosReportados :: ERROR');
                  console.debug("HTML STATUS: "+status);
                  if(status===0 || data.data==undefined){
                    console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                    deferred.reject(networkError);
                  }else{
                    console.error(data);
                    deferred.reject(data.data);}
                  });

                  return deferred.promise;
                }


                function consultaReportes(tableparams){
                  console.log('appAModuloReportes :: consultaReportes :: RUNNING');
                  var deferred = $q.defer();

                  // SP : SEGD_ConsultaReportes
                  // type : POST
                  $http.post(context+'/consulta/Reportes',tableparams)
                  .then(function onSuccess(data){
                    console.debug('appAModuloReportes :: consultaReportes :: SUCCESS');
                    deferred.resolve(data.data);
                  },function onError(data,status){
                    console.error('appAModuloReportes :: consultaReportes :: ERROR');
                    console.debug("HTML STATUS: "+status);
                    if(status===0 || data.data==undefined){
                      console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                      deferred.reject(networkError);
                    }else{
                      console.error(data);
                      deferred.reject(data.data);}
                    });

                    return deferred.promise;
                  }

                  function descartaReporte(report){
                    console.log('appAModuloReportes :: descartaReporte :: RUNNING');
                    var deferred = $q.defer();

                    // SP : SEGD_EliminaReporte
                    // type : POST
                    $http.post(context+'/descarta/Reporte',report)
                    .then(function onSuccess(data){
                      console.debug('appAModuloReportes :: descartaReporte :: SUCCESS');
                      deferred.resolve(data.data);
                    },function onError(data,status){
                      console.error('appAModuloReportes :: descartaReporte :: ERROR');
                      console.debug("HTML STATUS: "+status);
                      if(status===0 || data.data==undefined){
                        console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                        deferred.reject(networkError);
                      }else{
                        console.error(data);
                        deferred.reject(data.data);}
                      });

                      return deferred.promise;
                    }


                    function detalleReportes(tableparams){
                      console.log('appAModuloReportes :: detalleReportes :: RUNNING');
                      var deferred = $q.defer();

                      // SP : SEGD_ConsultaReportesDetalle
                      // type : POST
                      $http.post(context+'/detalle/Reportes',tableparams)
                      .then(function onSuccess(data){
                        console.debug('appAModuloReportes :: detalleReportes :: SUCCESS');
                        deferred.resolve(data.data);
                      },function onError(data,status){
                        console.error('appAModuloReportes :: detalleReportes :: ERROR');
                        console.debug("HTML STATUS: "+status);
                        if(status===0 || data.data==undefined){
                          console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                          deferred.reject(networkError);
                        }else{
                          console.error(data);
                          deferred.reject(data.data);}
                        });

                        return deferred.promise;
                      }


                      function consultaReportesHistorial(tableparams){
                        console.log('appAModuloReportes :: consultaReportesHistorial :: RUNNING');
                        var deferred = $q.defer();

                        // SP : SEGD_ConsultaReportesHistorial
                        // type : POST
                        $http.post(context+'/consulta/ReportesHistorial',tableparams)
                        .then(function onSuccess(data){
                          console.debug('appAModuloReportes :: consultaReportesHistorial :: SUCCESS');
                          deferred.resolve(data.data);
                        },function onError(data,status){
                          console.error('appAModuloReportes :: consultaReportesHistorial :: ERROR');
                          console.debug("HTML STATUS: "+status);
                          if(status===0 || data.data==undefined){
                            console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                            deferred.reject(networkError);
                          }else{
                            console.error(data);
                            deferred.reject(data.data);}
                          });

                          return deferred.promise;
                        }


                        function detalleReportesHistorial(tableparams){
                          console.log('appAModuloReportes :: detalleReportesHistorial :: RUNNING');
                          var deferred = $q.defer();

                          // SP : SEGD_ConsultaReportesHistorialDetalle
                          // type : POST
                          $http.post(context+'/detalle/ReportesHistorial',tableparams)
                          .then(function onSuccess(data){
                            console.debug('appAModuloReportes :: detalleReportesHistorial :: SUCCESS');
                            deferred.resolve(data.data);
                          },function onError(data,status){
                            console.error('appAModuloReportes :: detalleReportesHistorial :: ERROR');
                            console.debug("HTML STATUS: "+status);
                            if(status===0 || data.data==undefined){
                              console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                              deferred.reject(networkError);
                            }else{
                              console.error(data);
                              deferred.reject(data.data);}
                            });
                            return deferred.promise;
                          }


                          function consultaDescargaReportes(tableparams){
                            console.log('appAModuloReportes :: consultaDescargaReportes :: RUNNING');
                            var deferred = $q.defer();

                            // SP : SEGD_ConsultaReportesDescarga
                            // type : POST
                            $http.post(context+'/consulta/DescargaReportes',tableparams)
                            .then(function onSuccess(data){
                              console.debug('appAModuloReportes :: consultaDescargaReportes :: SUCCESS');
                              deferred.resolve(data.data);
                            },function onError(data,status){
                              console.error('appAModuloReportes :: consultaDescargaReportes :: ERROR');
                              console.debug("HTML STATUS: "+status);
                              if(status===0 || data.data==undefined){
                                console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                                deferred.reject(networkError);
                              }else{
                                console.error(data);
                                deferred.reject(data.data);}
                              });

                              return deferred.promise;
                            }


                            function consultaHistorialExcel(tableparams){
                              console.log('appAModuloReportes :: consultaHistorialExcel :: RUNNING');
                              var deferred = $q.defer();

                              // SP : SEGD_ReportesHistorialExcel
                              // type : POST
                              $http.post(context+'/consulta/HistorialExcel',tableparams)
                              .then(function onSuccess(data){
                                console.debug('appAModuloReportes :: consultaHistorialExcel :: SUCCESS');
                                deferred.resolve(data.data);
                              },function onError(data,status){
                                console.error('appAModuloReportes :: consultaHistorialExcel :: ERROR');
                                console.debug("HTML STATUS: "+status);
                                if(status===0 || data.data==undefined){
                                  console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                                  deferred.reject(networkError);
                                }else{
                                  console.error(data);
                                  deferred.reject(data.data);}
                                });
                                return deferred.promise;
                              }



                              function respaldaReporte(tableparams){
                                console.log('appAModuloReportes :: respaldaReporte :: RUNNING');
                                var deferred = $q.defer();

                                // SP : SEGD_RespaldaReporte
                                // type : POST
                                $http.post(context+'/respalda/RespaldaReportes',tableparams)
                                .then(function onSuccess(data){
                                  console.debug('appAModuloReportes :: respaldaReporte :: SUCCESS');
                                  deferred.resolve(data.data);
                                },function onError(data,status){
                                  console.error('appAModuloReportes :: respaldaReporte :: ERROR');
                                  console.debug("HTML STATUS: "+status);
                                  if(status===0 || data.data==undefined){
                                    console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                                    deferred.reject(networkError);
                                  }else{
                                    console.error(data);
                                    deferred.reject(data.data);}
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

},{}],13:[function(require,module,exports){
(function(){
	angular.module('serviceAppAModuloMonitoreo',[])
	.factory('serviceAppAModuloMonitoreo',[ '$http', '$q', function($http, $q) {
	//Variable para manejo de errores
	var networkError={state:{success:false, show:true, message:'Error de conexión', styleMessage:'alert-danger', styleIcon:'fa fa-frown-o',},
		message:{show:false,	style:'message-info',info:'Error de conexión, es posible que no este conectado a la red o que el servidor no se encuentre disponible momentaneamente',}
	}

	var context=url+'/RestAppAModuloMonitoreo';//variable recuperada de index.html y que agrega el contexto de la aplicacion.

	function consultaoperacionesRelevantes(params){
		console.log('serviceAppAModuloMonitoreo :: consultaoperacionesRelevantes :: RUNNING');
	 var deferred=$q.defer();
	 //SP: SEGD_ConsultaOperacionesRelevantes
	 //Type : POST

	$http.post(context+'/consulta/operacionesRelevantes',params)
	.then(function onSuccess(data){
		console.debug('serviceAppAModuloMonitoreo :: consultaoperacionesRelevantes :: SUCCESS');
		deferred.resolve(data.data);
	},function onError(data,status){
		console.error('serviceAppAModuloMonitoreo :: consultaoperacionesRelevantes :: ERROR');
		console.debug("HTML STATUS: "+status);
		console.error(data);
		(status===0 || data.data==undefined)?deferred.reject(networkError):deferred.reject(data.data);
	});

	return deferred.promise;
	}
	
	function detalleoperacionesRelevantes(params){
		console.log('serviceAppAModuloMonitoreo :: detalleoperacionesRelevantes :: RUNNING');
		 var deferred=$q.defer();
		 //SP: SEGD_ConsultaOperacionesRelevantesDetalle
		 //Type : POST

		$http.post(context+'/detalle/operacionesRelevantes',params)
		.then(function onSuccess(data){
			console.debug('serviceAppAModuloMonitoreo :: detalleoperacionesRelevantes :: SUCCESS');
			deferred.resolve(data.data);
		},function onError(data,status){
			console.error('serviceAppAModuloMonitoreo :: detalleoperacionesRelevantes :: ERROR');
			console.debug("HTML STATUS: "+status);
			console.error(data);
			(status===0 || data.data==undefined)?deferred.reject(networkError):deferred.reject(data.data);
		});

		return deferred.promise;
	}
	
	function consultaparametros(params){
		console.log('serviceAppAModuloMonitoreo :: consultaparametros :: RUNNING');
		 var deferred=$q.defer();
		 //SP: SEGD_ConsultaParametros
		 //Type : POST

		$http.post(context+'/consulta/parametros',params)
		.then(function onSuccess(data){
			console.debug('serviceAppAModuloMonitoreo :: consultaparametros :: SUCCESS');
			deferred.resolve(data.data);
		},function onError(data,status){
			console.error('serviceAppAModuloMonitoreo :: consultaparametros :: ERROR');
			console.debug("HTML STATUS: "+status);
			console.error(data);
			(status===0 || data.data==undefined)?deferred.reject(networkError):deferred.reject(data.data);
		});

		return deferred.promise;
	}
	function actualizaparametros(params){
		console.log('serviceAppAModuloMonitoreo :: actualizaparametros :: RUNNING');
		 var deferred=$q.defer();
		 //SP: SEGD_ModificaParametros
		 //Type : POST

		$http.post(context+'/actualiza/parametros',params)
		.then(function onSuccess(data){
			console.debug('serviceAppAModuloMonitoreo :: actualizaparametros :: SUCCESS');
			deferred.resolve(data.data);
		},function onError(data,status){
			console.error('serviceAppAModuloMonitoreo :: actualizaparametros :: ERROR');
			console.debug("HTML STATUS: "+status);
			console.error(data);
			(status===0 || data.data==undefined)?deferred.reject(networkError):deferred.reject(data.data);
		});

		return deferred.promise;
	}
return {
	consultaoperacionesRelevantes : consultaoperacionesRelevantes,
	detalleoperacionesRelevantes : detalleoperacionesRelevantes,
	consultaparametros :	consultaparametros,
	actualizaparametros : actualizaparametros,
	};

	}]);
})()
},{}],14:[function(require,module,exports){
/**
 * Directivas integradas en  tabla
 * 
 * Prevención de Lavado de Dinero -- Banco Azteca
 * 
 * Autor: 168833
 */



/****
 * key = Es la llave que asocia los datos en el contenedor del backend
 * 
 * option = configura las columnas que seran ordenables, habilita/ deshabilita descarga de excel, busqueda, pages etc
 * 
 * values =  variable que almacena las variables de la tabla, como son pagina actual, tamaño de pagina, ordenamiento, etc.
 * 
 * reload = bandera usada en la recarga de datos  a desplegar por la tabla.
 */



(function(){

angular.module('pldComponentTable', ['ngDialog','pldServices'])
.directive('pldAdvancedTable',['tableFactory','$rootScope','pldService','$filter','ngDialog',function(tableFactory,$rootScope,pldService,$filter,ngDialog){
		return{
			restrict : 'E',
			scope:{
				key:'=',//llave para recarga de datos desde el servidor, la llave deber ser asignada previamente en TableContainer.java
				options:'=',//configura las columnas que seran ordenables, habilita/ deshabilita descarga de excel, busqueda, pages etc
				values:'=',// almacena las variables de la tabla, como son pagina actual, tamaño de pagina, ordenamiento, etc.
				reload:'=',//bandera de recarga de datos desde el servidor < true=recarga datos  - false = no hay recarga de datos>
							//una vez que se asigna true se realiza un proceso de recarga de datos desde el servidor y de manera automatica la bandera se asigna de nuevo en false para permitir posteriores recargas.
				},
			link:function(scope,elem,atrs){
				/// START LINK FUNCTION
						
				scope.excelIcoPath=$rootScope.settings.imagePath+'/favicon/excel.png';//icono de descarga excel
				scope.myBlobObject =null;//Variable tipo blobObject para descarga de excel
				
				
				scope.callData=function(action){//Llamado a la carga de datos desde el servidor
					
					var tableParams={
	    				  	pageSize:scope.values.pageSize,//tamaño de pagina tabla
	    				  	currentPage:scope.values.currentPage,//pagina actual
	    				  	searchText:scope.values.searchText,//texto de busqueda
	    				  	collumToOrder:scope.values.columnToOrder,//columna a ordenar
	    				  	action:action,//indicador de accion para servidor Revisar IConstantesPLD
	    				  	reload:true,//bandera que indica la carga de datos desde la BD 
	    		  		  };
					
					scope.values.tableMessage.showAnimation=true;//habilitamos la bandera de la animacion de carga
	        		scope.values.tableMessage.state.show=false;//ocultamos mensajes
	        		scope.values.totalRows=0;//se hace cero los registros para ocultar los valores de la tabla
					
					
	        		pldService.getDataBykeyName(tableParams,scope.key)//Se realiza el llamado de los datos a traves de la Llave indicada en la directiva de la tabla
        			.then(function (tableVO) {//Se adjuntas las herramientas manuales
        				if(scope.options.detalle==true)
        					tableVO.jsonHeadersDesc.unshift({name:'Detalle',value:'Detalle',tool:'detalle',order:0});
        				if(scope.options.reporte==true)
        					tableVO.jsonHeadersDesc.unshift({name:'Reporte Análisis',value:'Reporte Análisis',tool:'reporteanalisis',order:0});
        				if(scope.options.editar==true)
        					tableVO.jsonHeadersDesc.unshift({name:'Editar',value:'Editar',tool:'editar',order:0});
        				if(scope.options.respaldar==true)
        					tableVO.jsonHeadersDesc.unshift({name:'Respaldar',value:'Respaldar',tool:'respaldar',order:0});
        				if(scope.options.check==true)
        					tableVO.jsonHeadersDesc.unshift({name:'Seleccionar',value:'Selec. todos',tool:'seleccionar',order:0});
        				if(scope.options.descartar==true)
        					tableVO.jsonHeadersDesc.unshift({name:'Descartar',value:'Descartar',tool:'descartar',order:0});
        				
        				//rutina para ocultar columnas de la tabla
        				if(scope.options.disabledcollumns!=null || scope.options.disabledcollumns!=null){
        					for(var index in scope.options.disabledcollumns){
        						var disabled=tableFactory.findIndexCollumn(tableVO.jsonHeadersDesc,scope.options.disabledcollumns[index]);
        						if(disabled!=-1)
        							tableVO.jsonHeadersDesc.splice(disabled,1);//elimina columna 
        					}	
        				}
            			
        				scope.values.totalRows=tableVO.rowCount;//se establece el numero total de registros de la consulta
            			scope.values.paginated=tableVO.paginated;//bandera que indica si los datos a cargar son paginados paginados>2000 registros se administra en el servidor Revisar TableContainer.java
            			
            			scope.pages=tableFactory.totalPages(scope.values.pageSize,scope.values.totalRows);//se calcula el numero de paginas a desplegar
            			scope.values.range=tableFactory.range(scope.values.currentPage,scope.pages);// se calulan los valores de la paginacion inferior
        				
            			scope.values.headers=tableVO.jsonHeadersDesc;// Se asignan los Headers de la tabla
            			if(tableVO.paginated){//respuesta paginada
            				scope.values.displayedPage=tableVO.jsonResult;//si la respuesta es paginada solo se ingresan los valores a displayedPage
            			}else{//respuesta no paginada
            				
            				scope.values.registers=tableVO.jsonResult;//en la carga de datos no paginada la pagina actual es por defualt 0
            				scope.values.displayedPage=tableFactory.pagination(0,scope.values.pageSize,scope.values.registers);//si la respuesta es no paginada los valores son divididos por pagina
            				//console.log('Registers: '+scope.values.registers.length);
            				//console.log('page reg: '+scope.values.displayedPage.length);
            				
            			}

            			scope.values.tableMessage.showAnimation=false;//se aculta la animacion de carga
            			scope.values.tableMessage.state=tableVO.state;//se insertan  el estado y mensage en la directiva de mensaje
            			scope.values.tableMessage.message=tableVO.message;
            			scope.reload=false;//La bandera de reload activada por el controlador se asigna nuevamente a false para la proxima carga de datos
            				            			
            		},function(parentVO){
            			//en caso de error todos los valores se reinician en sus valores defualt
            			scope.values.registers =[];
            			scope.values.displayedPage = [];
        				scope.values.headers  = [];
        				scope.values.reverse  = false;
        				scope.values.paginated  = false;
        				scope.values.range        = [];
        				scope.values.pageSize     = 10;
        				scope.values.currentPage = 0;
        				scope.values.totalRows = 0;
        				scope.values.columnToOrder= '';
        				scope.values.searchText   = '';
        				
        				scope.pages=0;
            			scope.values.tableMessage.showAnimation=false;//se oculta la animacion de carga
            			scope.values.tableMessage=parentVO;//se asignan mensaje y estado para ser desplegados por la tabla
            			scope.reload=false;//La bandera de reload activada por el controlador se asigna nuevamente a false para la proxima carga de datos
            		});
				}
				
				scope.callAction=function(action,page,column){//metodo que ejecuta acciones de busqueda,ordenamiento, paginacion, avance de paginas
										
					if(action=='R' || action=='S'){//en caso de recarga de datos o busqueda
						
						scope.values.registers =[];
            			scope.values.displayedPage = [];
        				scope.values.headers  = [];
        				scope.values.reverse  = false;
        				scope.values.paginated  = false;
        				scope.values.range        = [];
        				scope.values.pageSize     = 10;
        				scope.values.currentPage = 0;
        				scope.values.totalRows = 0;
        				scope.values.columnToOrder= '';
        				//scope.values.searchText= '';
        				scope.pages=0;
        				//si ek el texto de busqueda  viene vacio, indefinido o nulo se realiza una recarga de datos completa
        				action=(scope.values.searchText=='' || scope.values.searchText==undefined || scope.values.searchText==null)?'R':'S';
        				
        				scope.callData(action);//se cargan datos desde el servidor
					}else{
						switch (action) {
							case 'F'://primera pagina
								scope.values.currentPage=0;
								break;
							case 'P'://pagina anterior
								scope.values.currentPage=scope.values.currentPage-1;
								break;
							case 'N'://pagina siguiente
								scope.values.currentPage=scope.values.currentPage+1;
								break;
							case 'L'://ultima pagina
								scope.values.currentPage=scope.pages-1;
								break;
							case 'E'://pagina especifica o cambio de pagina 
								scope.values.currentPage=(page!=undefined)?page:0;
								break;
							case 'O'://ordering columns

									scope.values.reverse= !scope.values.reverse;//se modifica la bandeera de ordenamiento ascendente/descendente
									
									if(column.tool!=undefined){//si el dato es un tool no hay ordenamiento
										if(column.tool=='seleccionar'){
											for(var row in scope.values.registers){ //se habilitan/deshabilitan todas casillas de el tool seleccionar  con eñ valor del reverse 
												 scope.values.registers[row].check=scope.values.reverse;
											}
										}
									}else{
										if(scope.values.paginated==true){//si la respuesta es paginada el ordenamiento se realiza en el backend
											action=(scope.values.reverse==true)?'A':'D';
											scope.values.columnToOrder=column.value;//recupera el valor del header
										}else{//si la respuesta es NO paginada el ordenamiento se realiza en el front
											scope.values.registers = $filter('orderBy')(scope.values.registers,column.name,scope.values.reverse);
											
										}
									}
								break;
							default://respuesta default
								action='E';
								scope.values.currentPage=(page!=undefined)?page:0;
								break;
							}
						
						if(scope.values.paginated==true){//respuesta paginada
							scope.callData(action);
						}else{
							scope.pages=tableFactory.totalPages(scope.values.pageSize,scope.values.totalRows);
							scope.values.range=tableFactory.range(scope.values.currentPage,scope.pages);
							scope.values.displayedPage=tableFactory.pagination(scope.values.currentPage,scope.values.pageSize,scope.values.registers);
						}
					}
					
					
				}
				
				

				scope.$watch('reload',function(newValue, oldValue){//Observador que vigila el renderizado de datos por medio de la bandera reload
					
					if(newValue == true){
						//inicializa las variables
						scope.values.tableMessage={state:{success:false,show:false,styleMessage:'',message:'',styleIcon:''},showAnimation:false,};				
						
						scope.values.headers  = [];
						scope.values.registers = [];
						scope.values.displayedPage = [];
						
						scope.values.reverse  = false;
						scope.values.paginated  = false;
						scope.values.range        = [];
						scope.values.pageSize     = 10;
						scope.values.currentPage = 0;
						scope.values.totalRows = 0;
						scope.values.columnToOrder= '';
						scope.values.searchText   = '';
						
						scope.callAction('R');//Reload Data
					}else{
						console.debug('No hay cambios a desplegar . . .');
					}
				
				});
				
				scope.$watch('values.pageSize',function(newValue, oldValue){//observador que vigila si el tamaño de la pagina de la tabla es modificado
					scope.values.currentPage=(newValue!=oldValue)?0:scope.values.currentPage;
					
					if(scope.values.paginated==true){
						scope.values.pageSize=newValue;//se actualiza el tamaño de la pagina
						scope.callData('E');//se ejecuta la accion
					}else{
						scope.values.pageSize=newValue;//se actualiza el tamaño de la pagina
						scope.callAction('E',scope.values.currentPage);//se ejecuta la accion
					}
				
				});
				
							
				scope.getFile=function(){//metodo que se ejecuta al momento de realizar la descarga de excel
					
					var dialog = ngDialog.openConfirm({//mensaje de confirmacion
		            	  template:'<h5 align="center"><b>¿Desea descargar el archivo?</b></h5>'+
						  '<form name="myForm">'+
					  		'<div class="row"><div class="col-sm-12 col-md-12" align="center"><label>La descarga del archivo podría demorar algunos minutos.</label></div></div>'+
					  		'<div class="row">'+
					  				'<div class="  col-md-3 col-sm-6 col-xs-12 col-md-offset-3">'+
					  					'<button id="update" type="button" class="btn btn-success" ng-click="confirm()" ng-disabled="!myForm.$valid">Aceptar</button>'+
					  				'</div>'+
					  				'<div class="  col-md-3 col-sm-6 col-xs-12">'+
					  					'<button id="cancel" type="button" class="btn btn-warning" ng-click="closeThisDialog()">Cancelar</button>'+
					  				'</div>'+
					  		'</div>'+
					  '</form>',
		                  plain: true // se usa cuando se agrega un template           
		              }).then(function (){
		            	  console.info("::: ACEPTA DOWNLOAD ::: ");
		            	
		            	  var titulo=(scope.options.tableName!=undefined || scope.options.tableName!=null)?scope.options.tableName:'consultaPLD';//valor por defaul si no es definido el nombre de la descarga
		            	  
		            	  pldService.DownloadExcelFromTable(scope.key,scope.values.searchText,titulo+'-'+tableFactory.today())//ejecucion de servicio para la descarga de archivo excel por medio de la llave
							.then(function(data){
								console.log('La descarga de datos exitosa :');
								//la variable myBlobObject debe ser asignada a la directiva <file-download>
								scope.myBlobObject=new Blob(["\ufeff",data],{ encoding:"UTF-8",type:"application/vnd.ms-excel; charset=UTF-8"});
							},function(fail){//fallo la descarga de excel
								console.log('La descarga no pudo ser procesada');
								alert('La descarga no pudo ser procesada');
								scope.myBlobObject=null;
							})
		            	  
		              },function(){ //se cancela la descarga de archivo excel           	  
		            	  console.debug("CANCELA DOWNLOAD");
		            	 
		              });
				
				}

				//// END LINK FUNCTION
				},
				templateUrl:$rootScope.settings.viewPath+'/commons/tableTemplate.html',
				
    	}
    }])
    //================================================
    //DIRECTIVAS INTERNAS A LA TABLA
    //================================================
    .directive('tableSimpleCell',function() {//directiva que despliega datos simples y asigna un filtro a la columna. Nota la columna debe ser declarada el la  scope.options.filters
    	return {
    		restrict: 'E',
    		scope:{
    			filter:'=',//tipo de filtro a asignar
    			value:'=',//valor a desplegar
    		},
    		template:'<p ng-if="filter==\'currency\'">{{value | currency}}</p>'+
    				 '<p ng-if="filter==\'date\'">{{value | date:\'yyyy-MM-dd\'}}</p>'+
    				 '<p ng-if="filter==\'percent\'">{{value}}&nbsp;%</p>'+
    				 '<p ng-if="filter==undefined || filter==null">{{value}}</p>',
    		
    	}
    }).directive('tableToolCell',function() {//directiva que mapea  y renderiza los tools asignados en scope.options
    	return {
    		restrict: 'E',
    		scope:{
    			tool:'=',//tool a desplegar, se asigna desde los headers
    			row:'=',
    		},
    		template:'<tool-seleccionar ng-if="tool==\'seleccionar\'" row="row"></tool-seleccionar>'+
    				 '<tool-detalle ng-if="tool==\'detalle\'" row="row"></tool-detalle>'+
					 '<tool-editar ng-if="tool==\'editar\'" row="row"></tool-editar>'+					 
					 '<tool-reporte-analisis ng-if="tool==\'reporteanalisis\'" row="row"></tool-reporte-analisis>'+
					 '<tool-reporte-indicador ng-if="tool==\'reporte\'" row="row"></tool-reporte-indicador>'+
					 '<tool-analisis ng-if="tool==\'analisis\'" row="row"></tool-analisis>'+
					 '<tool-respaldar ng-if="tool==\'respaldar\'" row="row"></tool-respaldar>'+					 
    				 '<tool-riesgo ng-if="tool==\'riesgo\'" value="row.Riesgo"></tool-riesgo>'+
    				 '<tool-seguimiento ng-if="tool==\'seguimiento\'" value="row.Seguimiento"></tool-seguimiento>'+
    				 '<tool-aviso ng-if="tool==\'aviso\'" value="row.Seguimiento"></tool-aviso>'+
    				 '<tool-inusual ng-if="tool==\'inusual\'" value="row.Seguimiento"></tool-inusual>'+
    				 '<tool-lista-negra ng-if="tool==\'listanegra\'" value="row.ListaNegra"></tool-lista-negra>'+
    				 '<tool-descartar ng-if="tool==\'descartar\'" row="row"></tool-descartar>',
    		
    	}
    	})
    	//===============================================================
    	//DIRECTIVAS PARA HERAMIENTAS MANUALES CARGADAS EN scope.options
    	//=================================================================
    	.directive('toolSeleccionar',function(){//tool para seleecion de multiples casillas
			return{
					restrict:'AE',
					scope:{
						row:"="
					},
					link: function(scope, elem, atrs, ngModel){
						scope.row.check=(scope.row.check!=undefined)?scope.row.check:false;
					},
					template:
						'<div ng-show="row.check==0 || row.check==null" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-square-o" style="color: #F6BB42; font-size: 20px;" ng-click="row.check=!row.check"></i></a></div>'+
						'<div ng-show="row.check>0" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-check-square-o" style="color: #F6BB42; font-size: 20px;" ng-click="row.check=!row.check"></i></a></div>',
						
				}
    	}).directive('toolDetalle',function() {//tool para presentar un detalle genera un evento llamado "callDetail" que debe ser atrapado en el controlador
    	return {
    		restrict: 'E',
    		scope:{
    			row:'=',
    		},
    		template:'<a href="#" class="btn btn-success" ng-click="callDetail(row)">'+
						'<i class="fa fa-folder-open"></i>'+
					'</a>',
					link:function(scope,elem,atrs){
						 scope.callDetail=function(row){
							console.debug('calling detail . . .');
							scope.$emit('callDetail',row);
						 };
					}
    	}
    }).directive('toolEditar',function() {//tool para realizar la edicion de una fila genera un evento llamado "callEditar" que debe ser atrapado en el controlador
    	return {
    		restrict: 'E',
    		scope:{
    			row:'=',
    		},
    		template:'<a href="#" class="btn btn-success" ng-click="callEditar(row)">'+
						'<i class="fa fa-pencil-square-o"></i>'+
					'</a>',
					link:function(scope,elem,atrs){
						 scope.callEditar=function(row){
							//console.debug(row);
							scope.$emit('callEditar',row);
						 };
					}
    	}
    }).directive('toolDescartar',function() {//tool para descartar una fila de la tabla genera un evento llamado "callDiscart" que debe ser atrapado en el controlador
    	return {
    		restrict: 'E',
    		scope:{
    			row:'=',
    		},
    		template:'<a href="#" class="btn btn-success" ng-click="callDescartar(row)">'+
						'<i class="fa fa-trash-o"></i>'+
					'</a>',
					link:function(scope,elem,atrs){
						 scope.callDescartar=function(row){
							//console.debug(row);
							scope.$emit('callDiscart',row);
						 };
					}
    	}
	})
    .directive('toolRespaldar',function() {//tool para respldar una fila de la tabla genera un evento llamado "callRespaldar" que debe ser atrapado en el controlador
    	return {
    		restrict: 'E',
    		scope:{
    			row:'=',
    		},
    		template:'<a href="#" class="btn btn-success" ng-click="callRespaldar(row)">'+
						'<i class="fa fa-floppy-o"></i>'+
					'</a>',
					link:function(scope,elem,atrs){
						 scope.callRespaldar=function(row){
							console.debug(row);
							scope.$emit('callRespaldar',row);
						 };
					}
    	}
    }).directive('toolReporteAnalisis',function() {//tool para desplegar el moduilo de Reporte manual y genera un evento llamado "callReport" que debe ser atrapado en el controlador
    	return {
    		restrict: 'E',
    		scope:{
    			row:'=',
    		},
    		template:'<a href="#" class="btn btn-success" ng-click="callReport(row)">'+
						'<i class="fa fa-file-text"></i>'+
					'</a>',
					link:function(scope,elem,atrs){
						 scope.callReport=function(row){
							 console.debug('calling report . . .');
							scope.$emit('callReport',row);
						 };
					}
    	}
    })
    //=========================================================================
    	//DIRECTIVAS PARA HERAMIENTAS ASIGNADAS EN EL PORTAL DE ADMINISTRACION
    	//=====================================================================
    .directive('toolReporteIndicador',function(){
		return{
			restrict:'AE',
			scope:{
				value:"@"
			},
			link: function(scope, elem, atrs, ngModel){				
				scope.style="";			
					if(scope.value==0 || scope.value==null){									
						scope.style="color: #E9573F; font-size: 20px;"						
					}else if(scope.value==1){									
						scope.style="color: #E9573F; font-size: 20px;"						
					}else if(scope.value==2){									
						scope.style="color: #E9573F; font-size: 20px;"						
					}									
			},
			template:
				'<div ng-if="value ==0 || value ==null" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-square-o" style="{{style}}"></i></a></div>'+
				'<div ng-if="value ==1" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-check-square-o" style="{{style}}"></i></a></div>'+
				'<div ng-if="value ==2" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-times" style="{{style}}"></i></a></div>'
		}
	}).directive('toolRiesgo',['ngDialog',function(ngDialog){
		return{
			restrict:'E',
			scope:{
				value:"=",
			},			
			template:
				'<button  ng-if="value == \'A\'" type="button" class="btn redBtn"    data-tooltip data-toggle="tooltip" data-placement="top" data-title="Alto">{{value}}</button>'+
				'<button  ng-if="value  == \'M\'" type="button" class="btn yellowBtn"  data-tooltip data-toggle="tooltip" data-placement="top" data-title="Medio">{{value}}</button>'+
				'<button  ng-if="value  == \'B\'" type="button" class="btn greenBtn"  data-tooltip data-toggle="tooltip" data-placement="top" data-title="Bajo">{{value}}</button>'+
				'<button  ng-if="value  == null" type="button"  class="btn default" data-tooltip data-toggle="tooltip" data-placement="top" data-title="Sin Clasificar"><i class="fa fa-ban" aria-hidden="true"></i></button>',
			link:function(scope,element,atrs){ }
		}
	}])
	.directive('toolAnalisis',function(){
		return{
			restrict:'E',
			scope:{
				row:"="
			},
			link: function(scope, elem, atrs, ngModel){
					
				 scope.value=scope.row.Analisis;
					
				 scope.callAnalisis=function(row){
						scope.$emit('callAnalisis',row);
					 };								
			},
			template:
				'<div ng-if="value !=1 && value !=2" class="fa-hover col-md-3 col-sm-4"><a href="#" ng-click="callAnalisis(row)"><i class="fa fa-square-o" style="color: #8CC152; font-size: 20px;"></i></a></div>'+
				'<div ng-if="value ==1" class="fa-hover col-md-3 col-sm-4"><a href="#" ng-click="callAnalisis(row)"><i class="fa fa-check-square-o" style="color: #8CC152; font-size: 20px;"></i></a></div>'+
				'<div ng-if="value ==2" class="fa-hover col-md-3 col-sm-4"><a href="#" ng-click="callAnalisis(row)"><i class="fa fa-times" style="color: #8CC152; font-size: 20px;"></i></a></div>'
			
		}
	}).directive('toolListaNegra',function(){
		return{
			restrict:'AE',
			scope:{
				value:"="
			},
			link: function(scope, elem, atrs){	},
			template:
				'<div ng-if="value ==0 || value ==null" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-square-o" style="color: #2A2A2A; font-size: 20px;"></i></a></div>'+
				'<div ng-if="value ==1" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-check-square-o" style="color: #2A2A2A; font-size: 20px;"></i></a></div>'+
				'<div ng-if="value ==2" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-times" style="color: #2A2A2A; font-size: 20px;"></i></a></div>'
		}
	}).directive('toolInusual',function(){
		return{
			restrict:'AE',
			scope:{
				value:"="
			},
			link: function(scope, elem, atrs){	},
			template:
				'<div ng-if="value ==0 || value ==null" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-square-o" style="color: #F6BB42; font-size: 20px;"></i></a></div>'+
				'<div ng-if="value ==1" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-check-square-o" style="color: #F6BB42; font-size: 20px;"></i></a></div>'+
				'<div ng-if="value ==2" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-times" style="color: #F6BB42; font-size: 20px;"></i></a></div>'
		}
	}).directive('toolSeguimiento',function(){
		return{
			restrict:'AE',
			scope:{
				value:"=",
			},
			link:function(scope,element,atrs){
			
				},	
			template:
				'<div ng-if="value!=1" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-square-o" style="color: #00B1E1; font-size: 20px;"></i></a></div>'+
				'<div ng-if="value==1" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-check-square-o" style="color: #00B1E1; font-size: 20px;"></i></a></div>',
				
			
		}
	}).directive('toolAviso',function(){
		return{
			restrict:'AE',
			scope:{
				value:"="
			},
			link: function(scope, elem, atrs, ngModel){									
			},
			template:
				'<div ng-if="value ==0 || value ==null" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-square-o" style="color: #F6BB42; font-size: 20px;"></i></a></div>'+
				'<div ng-if="value ==1" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-check-square-o" style="color: #F6BB42; font-size: 20px;"></i></a></div>'+
				'<div ng-if="value ==2" class="fa-hover col-md-3 col-sm-4"><a href=#><i class="fa fa-times" style="color: #F6BB42; font-size: 20px;"></i></a></div>'
		}
	}).directive('tableSelectPages',function() {
    	return {
    		restrict: 'E',
    		scope:{
    			pageSize:'=',
    		},
    		template:'<select ng-model="pageSize">'+
				'	<option>10</option>'+
				'	<option>20</option>'+
				'	<option>50</option>'+
				'	<option>100</option>'+
				'	<option>200</option>'+
				'	</select>'
    	}
    }).factory('tableFactory',function (){//servicio factory que se encarga de procesar datos, y realizar calculos sencillos necesarios en la tabla
    	
    	var factory={};
		
		
		factory.pagination=function(current,pageSize,registers){//devuelve un arreglo con los registros a desplegar por la atabla
			var Rows=[];
			
			var pages=0;//number of pages
			
			pageSize=(pageSize>0)?pageSize:10;//evita divisiones por 0
			
			if(registers.length>0){
				
				if(registers.length%pageSize==0){
					pages=Math.round(registers.length/pageSize);
				}else{
					pages=Math.ceil(registers.length/pageSize);
				}
			
				if(pageSize*current<registers.length-pageSize)
					for(var i=pageSize*current;i<pageSize*current+pageSize;i++){
						Rows.push(registers[i]);
					}
				else{
					for(var i=(pages-1)*pageSize;i<registers.length;i++){
						Rows.push(registers[i]);
					}
				}

			}
			
			
			
	        return Rows;
		}
		
		factory.range=function(current,pages){//devuelve un arreglo con el rango de paginas a desplegar por la paginacion de la tabla
			var range=[];
			
			var init = 0;
			var top  = 0;
			if((current-3)<0){
				init = 0;
			} else{
				if((current+3)<pages){init = current-1;}
				else{init=pages-5;}
			}
			
			if((current+3)>pages){
				top = pages+1;
			} else{
				if((current-3)>0){top = current+3;}
				else{top=5}
			}
			
		    for (var i = init; i <=top; i++) {
		    	if (i > 0 && i < pages ) 
		    		range.push(i);
		    }
		   
			return range;
		}
		
		factory.today=function (){//funcion que regresa la fecha actual en formato mm/dd/yyyy
			var date = new Date();
			var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!
			var yyyy = date.getFullYear();

			if(dd<10) {
			    dd='0'+dd;
			} 

			if(mm<10) {
			    mm='0'+mm;
			} 
			
			var today = mm+'/'+dd+'/'+yyyy;
			
			return today;
		}
		
		factory.totalPages=function(pageSize,totalRows){//funcion que calcula el numero de paginas total de paginas a desplegar por la tabla
			var pages=0;
			
			pageSize=(pageSize>0)?pageSize:10;//evita divisiones por 0
			
			if(totalRows>0){
				
				if(totalRows%pageSize==0){
					pages=Math.round(totalRows/pageSize);//105
				}else{
					pages=Math.ceil(totalRows/pageSize);//105
				}
			
			return pages;
			
			}
		
		}
		
		factory.findIndexCollumn=function(array,collumn){
			for (var i in array){
				if(array[i].name==collumn)
					return i
			}
			return -1;
		}
		
		

		return factory;
	});
	
	
})();






},{}],15:[function(require,module,exports){
// =========================================================================
// CONFIGURATION ROUTE
// =========================================================================

'use strict';
require('./dashboard.js')
require('./appA/modules/monitoreo/operRelevantesDanios.js')
angular.module('pldConfig', ['pldServices','pldApp.dashboard'])



.factory('table', ['$rootScope', function($rootScope ) {

	var defaultValues={
            rule : 1,
            startMapping :'',
            report:{
                idMovimiento:undefined,
                idCliente:undefined,
                reported:false
            },
            valuesTable : {
                tableMessage : {
                    state : {
                        success : false,
                        show : false,
                        styleMessage : '',
                        message : '',
                        styleIcon : ''
                    },
                    showAnimation : false
                },
                headers : [],
                registers : [],
                displayedPage : [],
                reverse : false,
                paginated : false,
                range : [],
                pageSize : 10,
                currentPage : 0,
                totalRows : 0,
                columnToOrder : '',
                searchText : ''
            },
            valuesDetalle : {
                tableMessage : {
                    state : {
                        success : false,
                        show : false,
                        styleMessage : '',
                        message : '',
                        styleIcon : ''
                    },
                    showAnimation : false
                },
                headers : [],
                registers : [],
                displayedPage : [],
                reverse : false,
                paginated : false,
                range : [],
                pageSize : 10,
                currentPage : 0,
                totalRows : 0,
                columnToOrder : '',
                searchText : ''},

	};
	return {
	    valuesDefault : function(addedValues) {
	      return $.extend(JSON.parse(JSON.stringify(defaultValues)),addedValues);
	    }
	}

	}])
    // Setup global settings
    .factory('settings', ['$rootScope','pldService', function($rootScope,pldService) {

    	var jsonTree=jQuery.parseJSON(tree);
        var baseURL = url+'/resources/angularProject';//(window.location.href).replace(/^[^\/]+\/\/[^\/]+/,'').replace(/\/production\/admin\/.*$/,''), // Setting base url app
        var  settings = {
        		context                 : url,
                baseURL                 : baseURL,
                pluginPath              : baseURL+'/plugins/pld',
                imagePath         	    : baseURL+'/img',
                cssPath                 : baseURL+'/css',
                dataPath                : baseURL+'/data',
                viewPath              	: baseURL+'/views',
                partialsPath            : baseURL+'/partials',
                jsPath             		: baseURL+'/js',
                centroMonitoreoPath		: url+'/resources/centroMonitoreo',
                user					: user,
                userName				: userName,
                tree					: jsonTree,
        };

        $rootScope.settings = settings;
        return settings;
	}])

	//Configuracion del menu de navegación--breadcrumbs
    .config(['$breadcrumbProvider',function($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            prefixStateName: 'dashboard',
            template: 'bootstrap3',
            includeAbstract:true
        });
    }])

		 // Configuration angular loading bar- SOLO NECESARIA SI SE USA LAZY-LOAD
   .config(['cfpLoadingBarProvider',function(cfpLoadingBarProvider) {
		 cfpLoadingBarProvider.includeSpinner = true;

   }])


    // Configuracion inicial de rutas aplicacion
    .config(['$stateProvider','$locationProvider','$urlRouterProvider',function($stateProvider, $locationProvider, $urlRouterProvider) {
        // Redirect any unmatched url
        $urlRouterProvider.otherwise('dashboard');


        $stateProvider

        // =========================================================================
        // DASHBOARD
        // =========================================================================
        .state('dashboard', {
            url: '/dashboard',
            //template:'<h1>Dashboard</h1>',
            templateUrl: 'resources/angularProject/views/dashboard.jsp',
            data: {
                pageTitle: 'Inicio',
            },
            controller: 'DashboardCtrl',
            ncyBreadcrumb: {
                label: 'Inicio'
            },
           resolve: {
               deps: ['$ocLazyLoad', 'settings', function($ocLazyLoad, settings, pldMenu) {
                   ///COMPONENETS ADICIONALES DEL CENTRO DE MONITOREO
                   return $ocLazyLoad.load( // you can lazy load files for an existing module
                       [
                           {
                               insertBefore: '#load_css_before',
                               files: [
                                   settings.centroMonitoreoPath+'/css/app-2.css',
                                   settings.centroMonitoreoPath+'/css/maps/jquery-jvectormap-2.0.1.css',
                                   settings.centroMonitoreoPath+'/css/components/mapas.css',
                                   settings.centroMonitoreoPath+'/css/style.css',
                                   //settings.centroMonitoreoPath+'/css/cifrasControl.css',
                                   settings.centroMonitoreoPath+'/css/chartjs/chartist.min.css',
                                   //settings.centroMonitoreoPath+'/css/HoverMaster/css/hover.css',
                               ]
                           },
                           {
                               name: 'pldApp.dashboard',
                               files: [
                                   settings.pluginPath+'/jquery-easing-original/jquery.easing.1.3.min.js',//se ocupa en grafica seguimiento analisis actual
                               ]
                           }
                       ]
                   );
               }]
           }
        })
        /*
        	// =========================================================================
            // ERROR 400
            // =========================================================================
            .state('pageError403', {
                url: '/page-error-403',
               templateUrl: 'resources/segurosAzteca/views/pages/page-error-403.html',
                data: {
                    pageTitle: 'ERROR 403',
                    pageHeader: {
                        icon: 'fa fa-ban',
                        title: 'Error 403',
                        subtitle: 'access is denied'
                    },
                    breadcrumbs: [
                        {title: 'Pages'},{title: 'Error 403'}
                    ]
                },
                resolve: {
                    deps: ['$ocLazyLoad', 'settings', function($ocLazyLoad, settings) {

                        var cssPath = settings.cssPath; // Create variable css path

                        return $ocLazyLoad.load( // You can lazy load files for an existing module
                            [
                                {
                                    insertBefore: '#load_css_before',
                                    files: [
                                        //cssPath+'/pages/error-page.css'
                                    ]
                                }
                            ]
                        );
                    }]
                }
            })

            // =========================================================================
            // ERROR 404
            // =========================================================================
            .state('pageError404', {
                url: '/page-error-404',
               templateUrl: 'resources/segurosAzteca/views/pages/page-error-404.html',
                data: {
                    pageTitle: 'ERROR 404',
                    pageHeader: {
                        icon: 'fa fa-ban',
                        title: 'Error 404',
                        subtitle: 'page not found'
                    },
                    breadcrumbs: [
                        {title: 'Pages'},{title: 'Error 404'}
                    ]
                },
                resolve: {
                    deps: ['$ocLazyLoad', 'settings', function($ocLazyLoad, settings) {

                        var cssPath = settings.cssPath; // Create variable css path

                        return $ocLazyLoad.load( // You can lazy load files for an existing module
                            [
                                {
                                    insertBefore: '#load_css_before',
                                    files: [
                                        //cssPath+'/pages/error-page.css'
                                    ]
                                }
                            ]
                        );
                    }]
                }
            })

            // =========================================================================
            // ERROR 500
            // =========================================================================
            .state('pageError500', {
                url: '/page-error-500',
               templateUrl: 'resources/segurosAzteca/views/pages/page-error-500.html',
                data: {
                    pageTitle: 'ERROR 500',
                    pageHeader: {
                        icon: 'fa fa-ban',
                        title: 'Error 500',
                        subtitle: 'internal server error'
                    },
                    breadcrumbs: [
                        {title: 'Pages'},{title: 'Error 500'}
                    ]
                },
                resolve: {
                    deps: ['$ocLazyLoad', 'settings', function($ocLazyLoad, settings) {

                        var cssPath = settings.cssPath; // Create variable css path

                        return $ocLazyLoad.load( // You can lazy load files for an existing module
                            [
                                {
                                    insertBefore: '#load_css_before',
                                    files: [
                                        //cssPath+'/pages/error-page.css'
                                    ]
                                }
                            ]
                        );
                    }]
                }
            });*/

    }])

    // Init app run
    .run(['$rootScope','settings','$state','$location','$breadcrumb',function($rootScope, settings, $state, $location,$breadcrumb) {
        $rootScope.$state = $state; // state to be accessed from view
        $rootScope.$location = $location; // location to be accessed from view
        $rootScope.settings = settings; // global settings to be accessed from view
        //--Breadcrumb
        $rootScope.isActive = function(stateName) {
            return $state.includes(stateName);
        }
        $rootScope.getLastStepLabel = function() {
            return 'Angular-Breadcrumb';
        }

    }]);

},{"./appA/modules/monitoreo/operRelevantesDanios.js":5,"./dashboard.js":17}],16:[function(require,module,exports){
// =========================================================================
// CONTROLLER APP
// =========================================================================


//var jQuery=require('jquery');

'use strict';

//var angular=require('angular');
//var ActivityMonitor=require('angular-activity-monitor');
//var ngDialog=require('ng-dialog');

(function(){
angular.module('pldController', ['ActivityMonitor','pldServices','ngDialog'])
	.controller('BlankonCtrl', ['$scope','$rootScope','$http','pldService','ActivityMonitor','$state','ngDialog','$timeout',function($scope,$rootScope, $http,pldService,ActivityMonitor,$state,ngDialog,$timeout) {
    	var self=this;
    	//variable que almacena el modulo de tools activo.
    	$scope.idModuloActual=0;

        // =========================================================================
        // SUPPORT IE
        // =========================================================================
        $scope.supportIE = function () {
            // IE mode
            var isIE8 = false;
            var isIE9 = false;
            var isIE10 = false;

            // initializes main settings for IE
            isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
            isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
            isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);

            if (isIE10) {
                $('html').addClass('ie10'); // detect IE10 version
            }

            if (isIE10 || isIE9 || isIE8) {
                $('html').addClass('ie'); // detect IE8, IE9, IE10 version
            }

            // Fix input placeholder issue for IE8 and IE9
            if (isIE8 || isIE9) { // ie8 & ie9
                $('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {
                    var input = $(this);

                    if (input.val() == '' && input.attr("placeholder") != '') {
                        input.addClass("placeholder").val(input.attr('placeholder'));
                    }

                    input.focus(function () {
                        if (input.val() == input.attr('placeholder')) {
                            input.val('');
                        }
                    });

                    input.blur(function () {
                        if (input.val() == '' || input.val() == input.attr('placeholder')) {
                            input.val(input.attr('placeholder'));
                        }
                    });
                });
            }
        };
      //=========================================================================
        //  CONSULTA DE NOTIFICACIONES SISTEMA
        //=========================================================================

      //-- obtenemos las notificaciones del sistema para todos los usuarios
    	pldService.ConsultaNotificaciones().then(function(data) {
    		$rootScope.alertsSystem=data.jsonResult;

		},function(parentVO){//Cuando la consulta es fallida recuperamos un ParentVO
			$rootScope.alertsSystem=[{Icono:'exclamation-triangle',Mensaje:'Error en la consulta de notificaciones.'}];

			if(parentVO.state!=undefined){
				$rootScope.alertsSystem.push({Icono:'exclamation-triangle',Mensaje:parentVO.state.message});
			}
			if(parentVO.message!=undefined){
				$rootScope.alertsSystem.push({Icono:'exclamation-triangle',Mensaje:parentVO.message.info});
			}
	    });


        //=========================================================================
        //  MANEJO DE MENUS DE NAVEGACION
        //=========================================================================
    	//actualiza el menu activo para la asignacion de tools
        //mantiene activo el mmenu seleccionado
    	 $scope.pldTittle = { pageTitle: "PLD | Seguros",pageHeader: {icon: "fa fa-home",title: "Inicio",subtitle: "",}};

    	 //Carga inicialmente el tutilo en la pantalla principal si hay un F5 recarga los valores desde el Backend
    	 pldService.ActualizaModuloActivo($scope.idModuloActual)
		 	.then(function(data){
		 		$scope.pldTittle=data;
		 		$scope.breadcrumbs=[{title:data.pageHeader.title, state:data.pageHeader.mapping.trim()},{title: data.pageHeader.subtitle,state:data.pageHeader.mapping.trim()}];
		 	},function(fail){
		 		 $scope.pldTittle = { pageTitle: "PLD | Seguros",pageHeader: {icon: "fa fa-home",title: "Inicio",subtitle: "",}};
		 	});


        $scope.cambiaBackground=function(moduloActual,mapeo){

             $('.sidebar-selected-item').removeClass('sidebar-selected-item');
             $('#'+moduloActual).addClass("sidebar-selected-item");
        	 if($scope.idModuloActual!=parseInt(moduloActual)){
        		 $scope.idModuloActual=parseInt(moduloActual);

        		pldService.ActualizaModuloActivo(moduloActual)
     		 	.then(function(data){
     		 		$scope.pldTittle=data;
     		 	},function(fail){
     		 		 $scope.pldTittle = { pageTitle: "PLD | Error",pageHeader: {icon: "fa fa-warning",title: "Error en carga de titulo",subtitle: fail.state.message,}};
     		 	});

        		 console.debug('redirecting to : '+mapeo.trim());
            	 $state.go(mapeo.trim());
        	 }

        }


        // =========================================================================
        // COOKIE SIDEBAR MINIMIZE
        // =========================================================================
        $scope.cookieSidebarMinimize = function () {

        	if(!$("body").hasClass("page-sidebar-minimize"))
        		$('body').addClass('active page-sidebar-minimize');
        	else
        		$("body").removeClass("page-sidebar-minimize");
        };


        // =========================================================================
        // SOUND PAGE
        // =========================================================================
//        $scope.soundPage = function () {
//            // Sounds setting
//            if($('.page-sound').length){
//                ion.sound({
//                    sounds: [
//                        {name: "beer_can_opening"},
//                        {name: "bell_ring", volume: 0.6},
//                        {name: "branch_break", volume: 0.3},
//                        {name: "button_click"},
//                        {name: "button_click_on"},
//                        {name: "button_push"},
//                        {name: "button_tiny", volume: 0.6},
//                        {name: "camera_flashing"},
//                        {name: "camera_flashing_2", volume: 0.6},
//                        {name: "cd_tray", volume: 0.6},
//                        {name: "computer_error"},
//                        {name: "door_bell"},
//                        {name: "door_bump", volume: 0.3},
//                        {name: "glass"},
//                        {name: "keyboard_desk"},
//                        {name: "light_bulb_breaking", volume: 0.6},
//                        {name: "metal_plate"},
//                        {name: "metal_plate_2"},
//                        {name: "pop_cork"},
//                        {name: "snap"},
//                        {name: "staple_gun"},
//                        {name: "tap", volume: 0.6},
//                        {name: "water_droplet"},
//                        {name: "water_droplet_2"},
//                        {name: "water_droplet_3", volume: 0.6}
//                    ],
//                    path: settings.pluginPath +"/ionsound/sounds/",
//                    preload: true
//                });
//
//                // Add effect sound water droplet type 3
//                $('.dropdown-toggle').on('click', function(){
//                    ion.sound.play("water_droplet_3");
//                });
//
//            }
//        };

        // =========================================================================
        // TOOLTIP
        // =========================================================================
        $scope.tooltip = function () {
            if($('[data-toggle=tooltip]').length){
                $('[data-toggle=tooltip]').tooltip({
                    animation: 'fade'
                });
            }
        };

        // =========================================================================
        // POPOVER
        // =========================================================================
        $scope.popover = function () {
            if($('[data-toggle=popover]').length){
                $('[data-toggle=popover]').popover();
            }
        };

        // =========================================================================
        // NAVBAR MESSAGES
        // =========================================================================
        $scope.navbarMessages = [];
        /*$http.get(settings.dataPath+'/partials/header/navbar-messages.json') // Simple GET request example :
            .success(function(data) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.navbarMessages = data;
            })
            .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });*/

        // =========================================================================
        // NAVBAR NOTIFICATIONS
        // =========================================================================
        $scope.navbarNotifications = [];
        /*$http.get(settings.dataPath+'/partials/header/navbar-notifications.json') // Simple GET request example :
            .success(function(data) {
                $scope.navbarNotifications = data;
            })
            .error(function(data, status, headers, config) {
                // Error actions
            });*/

        // =========================================================================
        // SIDEBAR RIGHT (PROFILE TAB)
        // =========================================================================
        $scope.profile = [];
        /*$http.get(settings.dataPath+'/partials/sidebar-right/profile.json') // Simple GET request example :
            .success(function(data) {
                $scope.profile = data;
            })
            .error(function(data, status, headers, config) {
                // Error actions
            });*/

        // =========================================================================
        // SIDEBAR RIGHT (PROFILE TAB)
        // =========================================================================
        $scope.chats = [];
        /*$http.get(settings.dataPath+'/partials/sidebar-right/chat.json') // Simple GET request example :
            .success(function(data) {
                $scope.chats = data;
            })
            .error(function(data, status, headers, config) {
                // Error actions
            });*/

        // =========================================================================
        // LOG EVENTS
        // =========================================================================
        // Log view event module loaded
//        $scope.$on('ocLazyLoad.moduleLoaded', function(e, params) {
//            console.log('event module loaded', params);
//        });
//
//        // Log view event component loaded
//        $scope.$on('ocLazyLoad.componentLoaded', function(e, params) {
//            console.log('event component loaded', params);
//        });
//
//        // Log view event file loaded
//        $scope.$on('ocLazyLoad.fileLoaded', function(e, file) {
//            console.log('event file loaded', file);
//        });
//
//    	$scope.$on('$viewContentLoaded', function(event, viewName, viewContent){
//  	  	});
//
//
//    	  /*
//         * Se activa la funcion de acordeon en el menu
//         */
//    	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
//    		// MINIMIZE
//            //$scope.cookieSidebarMinimize = function () {
//            	//console.info("ya cargo el acordeon");
//
//            //};
//          });


        $scope.active = true;
    	$scope.initSessionMonitor=function (){
    	  /* * */
      	  var vm = self;
	      var timeout =900;// 15 minutos de inactividad
	      var interval;
	      vm.countdown = timeout;
	      var countdownStop;

	      /* demo defaults */
	      ActivityMonitor.options.inactive = timeout;
	      ActivityMonitor.options.monitor = 0.1;
	      ActivityMonitor.options.warning = 0;


	        vm.countdown = timeout;
	        ActivityMonitor.off('inactive');
	        ActivityMonitor.off('activity');

	        /*Lanza mensaje de cierre de sesion*/
	          ActivityMonitor.on('inactive', function() {
		        	ngDialog.openConfirm({
		        	    template:'<div><div class="modal fade in" id="session-timeout-dialog" style="display: block; padding-right: 17px;" ng-init="start()">'+
		                    '<div class="modal-dialog">'+
		                    '<div class="modal-content">'+
		                    '<div class="modal-header">'+
		                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
		                    '<h4 class="modal-title">Tu sesión esta por expirar !</h4></div>'+
		                    '<div class="modal-body"><p>Tu sesion se inhabilitara despues de {{counter}} segundos sin actividad</p></div>'+
		                    '<div class="modal-footer"><button id="session-timeout-dialog-logout" ng-click="confirm(salir)" type="button" class="btn btn-default">Salir</button>'+
		                    '<button id="session-timeout-dialog-keepalive" type="button" ng-click="stop();closeThisDialog();" class="btn btn-primary" data-dismiss="modal">Seguir conectado</button></div></div></div></div></div>',
		        	    plain:true,
		        	    controller: ['$scope','$timeout',function($scope,$timeout) {
		        	    	$scope.start = function() {// arranca el proceso
		        	    	    $scope.active = true;
		        	    	    $scope.counter=60;
		        	    	    $scope.countdown();
		        	    	};

		        	    	$scope.countdown = function () {//timer verificador
		        	    	    countdownStop = $timeout(function () {
		        	    	        if ($scope.counter == 0) {
		        	    	        	window.location = './salir';
		        	    	        }
		        	    	        else {
		        	    	            if ($scope.active) {
		        	    	                $scope.counter--;
		        	    	                $scope.countdown();
		        	    	            }
		        	    	        }
		        	    	    }, 1000);
		        	    	};

		        	    	$scope.stop = function () {// detiene el contador
		        	    	    $timeout.cancel(countdownStop);
		        	    	}

		        	    }]
		        	}).then(function (value) {//El usuario decide salir.
		        		window.location = './salir';
	                }, function (value) {//El usuario continua en la sesion
	                	pldService.ActualizaModuloActivo(0);//cuando se envia cero no actualiza el modulo en el BACKEND
	                	$scope.initSessionMonitor();
	                });

	        	});

	          /*Reinicia el conteo de inactividad*/
		        ActivityMonitor.on('activity', function() {
		          vm.countdown = timeout;
		        });
	        /***/
    	}

    	$scope.$on('$viewContentLoaded', function() {
    	 $scope.initSessionMonitor();
    	 //$scope.scrollTable();
    	});

    	 $scope.showHideMenuOption=function(elemento) {
    		 if($('#'+elemento).hasClass('active')){
    			 $('.sidebar-menu>li').removeClass("active");
        		 $('.sidebar-menu>li > ul > li').removeClass("active");
    			 $('#'+elemento).removeClass('active');
    			 angular.forEach($('#'+elemento).parents(),function(elem){ $(elem).removeClass("active") });
    		 }else{
    			 $('.sidebar-menu>li').removeClass("active");
        		 $('.sidebar-menu>li > ul > li').removeClass("active");
    			 $('#'+elemento).addClass('active');
    			 angular.forEach($('#'+elemento).parents(),function(elem){ $(elem).addClass("active")});
    		 }
    		 $scope.pldTittle = { pageTitle: "PLD | Inicio",pageHeader: {icon: "fa fa-home",title: "Inicio",subtitle: "",}};
    		//pldService.ActualizaModuloActivo(0,settings);

         };

         $scope.scrollTable = function(){
        	 $(document).ready(function() {
        			//$("#tablaEnvian").niceScroll({
        			$("div.panel-body>div.row").niceScroll({
        				cursorcolor : "#00F"
        			});
        		});
         }
         //varible en el scope para la ubicacion del footer, side-bar y headers
        $scope.partialsPath=$rootScope.settings.partialsPath;
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        $scope.supportIE(); // Call cookie sidebar minimize
        //$scope.cookieSidebarMinimize(); // Call cookie sidebar minimize
        //$scope.soundPage(); // Call sound page
        $scope.tooltip(); // Call tooltip
        $scope.popover(); // Call popover
    }]).filter('nospace', function () {
        return function (value) {
            return (!value) ? '' : value.replace(/ /g, '');
        };
    }).filter('nopoint', function () {
        return function (value) {
            return (!value) ? '' : value.split('.').join('').replace(/ /g, '');
        };
    });
})();

},{}],17:[function(require,module,exports){
/* ==========================================================================
 * TABLE OF CONTENT
 * ==========================================================================
 * - GRITTER NOTIFICATION
 * - VISITOR CHART & SERVER STATUS
 * - REAL TIME STATUS
 * - DEMO COUNT NUMBER
 * - SESSION TIMEOUT
 * --------------------------------------------------------------------------
 * Plugins used : Flot chart, Gritter notification
 ============================================================================ */

'use strict';
(function(){
    angular.module("pldApp.dashboard", [])

        // =========================================================================
        // GRITTER NOTIFICATION
        // =========================================================================
        // display marketing alert only once
    	// Destruye los obsejtos contruidos para mostrar las graficas del centro de monitoreo, cuando se pierde el foco de la pagina principal.
        .controller('DashboardCtrl',['$scope',function ($scope) {

        	console.debug('DashboardCtrl loaded...');
        	/*Destruye los intervalos de tiempo para las graficas*/
            $scope.$on("$destroy", function handleDestroyEvent() {
            			instanciaCM.destroy();
            			angular.forEach($('.dynamicChartContainer div[screen=cc] #vt'),function(item,indx){
                        	$(item).vTicker("remove");
                        })
                    }
                );

        	}]);// cierra controller



})();

},{}],18:[function(require,module,exports){
// =========================================================================
// DIRECTIVE APP
// =========================================================================
'use strict';
(function(){
angular.module('pldDirective', ['pldServices'])

	
    // =========================================================================
    // REFRESH PANEL
    // =========================================================================
    /*.directive('refreshPanel', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                element.click(function(){
                    var targetElement = $(this).parents('.panel').find('.panel-body');
                    targetElement.append('<div class="indicator"><span class="spinner"></span></div>');
                    setInterval(function(){
                        $.getJSON('assets/admin/data/reload-sample.json', function(json) {
                            $.each(json, function() {
                                // Retrieving data from json...
                                console.log('Retrieving data from json...');
                            });
                            targetElement.find('.indicator').hide();
                        });
                    },5000);
                });
            }
        };
    })*/

    // =========================================================================
    // COLLAPSE PANEL
    // =========================================================================
    .directive('collapsePanel', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                element.click(function(){
                    var targetCollapse = $(this).parents('.panel').find('.panel-body'),
                        targetCollapse2 = $(this).parents('.panel').find('.panel-sub-heading'),
                        targetCollapse3 = $(this).parents('.panel').find('.panel-footer')
                    if((targetCollapse.is(':visible'))) {
                        $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
                        targetCollapse.slideUp();
                        targetCollapse2.slideUp();
                        targetCollapse3.slideUp();
                    }else{
                        $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
                        targetCollapse.slideDown();
                        targetCollapse2.slideDown();
                        targetCollapse3.slideDown();
                    }
                });
            }
        };
    })

    // =========================================================================
    // REMOVE PANEL
    // =========================================================================
    .directive('removePanel', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                element.click(function(){
                    $(this).parents('.panel').fadeOut();
                });
            }
        };
    })

    // =========================================================================
    // EXPAND PANEL
    // =========================================================================
    .directive('expandPanel', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                element.click(function(){
                    if(element.parents(".panel").hasClass('panel-fullsize'))
                    {
                        $('body').find('.panel-fullsize-backdrop').remove();
                        element.data('bs.tooltip').options.title = 'Expand';
                        element.parents(".panel").removeClass('panel-fullsize');
                    }
                    else
                    {
                        $('body').append('<div class="panel-fullsize-backdrop"></div>');
                        element.data('bs.tooltip').options.title = 'Minimize';
                        element.parents(".panel").addClass('panel-fullsize');
                    }
                });
            }
        };
    })

    // =========================================================================
    // SEARCH PANEL
    // =========================================================================
    .directive('searchPanel', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                element.click(function(){
                    element.parents('.panel').find('.panel-search').toggle(100);
                    return false;
                });
            }
        };
    })

    // =========================================================================
    // TOOLTIP
    // =========================================================================
    .directive('tooltip', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                $(element).hover(function(){
                    // on mouseenter
                    $(element).tooltip('show');
                }, function(){
                    // on mouseleave
                    $(element).tooltip('hide');
                });
            }
        };
    })

    // =========================================================================
    // GO TO TOP TRIGGER
    // =========================================================================
    .directive('backTop', function(){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.hide();
                $(window).scroll(function () {
                    if ($(this).scrollTop() > 100) {
                        element.addClass('show animated pulse');
                    } else {
                        element.removeClass('show animated pulse');
                    }
                });
                // scroll body to 0px on click
                element.click(function () {
                    // Add sound
                   // ion.sound.play("cd_tray");
                    $('body,html').animate({
                        scrollTop: 0
                    }, 800);
                    return false;
                });
            }
        }
    })

    // =========================================================================
    // NICESCROLL
    // =========================================================================
    .directive('nicescroll', function(){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.niceScroll({
                    cursorwidth: '3px',
                    cursorborder: '0px'
                });
            }
        }
    })

    // =========================================================================
    // CHOSEN SELECT
    // =========================================================================
    .directive('chosenSelect', function(){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.chosen();
            }
        }
    })

    // =========================================================================
    // FULLSCREEN
    // =========================================================================
    .directive('fullscreen', function(){
        return {
            restrict: 'A',
            link: function (scope, element) {
                var state;
                element.on('click', function() {
                    state = !state;
                    if (state) {
                        // Trigger for fullscreen
                        // Add effect sound bell ring
//                        if($('.page-sound').length){
//                            ion.sound.play("bell_ring");
//                        }
                        $(this).toggleClass('fg-theme');
                        $(this).attr('data-original-title','Exit Fullscreen');
                        var docElement, request;
                        docElement = document.documentElement;
                        request = docElement.requestFullScreen || docElement.webkitRequestFullScreen || docElement.mozRequestFullScreen || docElement.msRequestFullScreen;
                        if(typeof request!="undefined" && request){
                            request.call(docElement);
                        }
                    } else {
                        // Trigger for exit fullscreen
                        // Add effect sound bell ring
//                        if($('.page-sound').length){
//                            ion.sound.play("bell_ring");
//                        }
                        $(this).removeClass('fg-theme');
                        $(this).attr('data-original-title','Fullscreen')
                        var docElement, request;
                        docElement = document;
                        request = docElement.cancelFullScreen|| docElement.webkitCancelFullScreen || docElement.mozCancelFullScreen || docElement.msCancelFullScreen || docElement.exitFullscreen;
                        if(typeof request!="undefined" && request){
                            request.call(docElement);
                        }
                    }
                });
            }
        }
    })

    // =========================================================================
    // CLEAR ALL COOKIE
    // =========================================================================
    .directive('resetSetting', function(){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('click', function(){
                    var cookies = $.cookie();
                    for(var cookie in cookies) {
                        $.removeCookie(cookie);
                    }
                    location.reload(true);
                });
            }
        }
    })

    // =========================================================================
    // BOX MODAL
    // =========================================================================
//    .directive('setting', function(){
//        return {
//            restrict: 'A',
//            link: function (scope, element) {
//                element.on('click', function(){
//                    // Add sound
//                    //ion.sound.play('camera_flashing');
//                    bootbox.dialog({
//                        message: 'I am a custom dialog setting',
//                        title: 'Custom setting',
//                        className: 'modal-success modal-center',
//                        buttons: {
//                            success: {
//                                label: 'Success!',
//                                className: 'btn-success',
//                                callback: function() {
//                                    alert('You are so calm!');
//                                }
//                            },
//                            danger: {
//                                label: 'Danger!',
//                                className: 'btn-danger',
//                                callback: function() {
//                                    alert('You are so hot!');
//                                }
//                            },
//                            main: {
//                                label: 'Click ME!',
//                                className: 'btn-primary',
//                                callback: function() {
//                                    alert('Hello World');
//                                }
//                            }
//                        }
//                    });
//                });
//            }
//        }
//    })

    .directive('lockScreen', function(settings){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('click', function(){
                    // Add sound
                    //ion.sound.play('camera_flashing');
                    bootbox.dialog({
                        message: 'Locker with notification display, Receive your notifications directly on your lock screen',
                        title: 'Lock Screen',
                        className: 'modal-lilac modal-center',
                        buttons: {
                            danger: {
                                label: 'No',
                                className: 'btn-danger'
                            },
                            success: {
                                label: 'Yes',
                                className: 'btn-success',
                                callback: function() {
                                    window.location = '/salir';
                                }
                            }
                        }
                    });
                });
            }
        }
    })

    .directive('logout', function(settings){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.on('click', function(){
                    // Add sound
                    //ion.sound.play('camera_flashing');
                    bootbox.dialog({
                        message: 'Do you want to exit from Blankon?',
                        title: 'Logout',
                        className: 'modal-danger modal-center',
                        buttons: {
                            danger: {
                                label: 'No',
                                className: 'btn-danger'
                            },
                            success: {
                                label: 'Yes',
                                className: 'btn-success',
                                callback: function() {
                                    window.location = settings.baseURL+'/production/admin/angularjs/account.html#/sign-in';
                                }
                            }
                        }
                    });
                });
            }
        }
    })

    //---------------------------------------------------------------
    // SPARKLINE
    //---------------------------------------------------------------
    // average
    .directive('sparklineAverage', function(){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.sparkline('html',{type: 'bar', barColor: '#37BC9B', height: '30px'});
            }
        }
    })
    // traffic
    .directive('sparklineTraffic', function(){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.sparkline('html',{type: 'bar', barColor: '#8CC152', height: '30px'});
            }
        }
    })
    // disk
    .directive('sparklineDisk', function(){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.sparkline('html',{type: 'bar', barColor: '#E9573F', height: '30px'});
            }
        }
    })
    // average
    .directive('sparklineCpu', function(){
        return {
            restrict: 'A',
            link: function (scope, element) {
                element.sparkline('html',{type: 'bar', barColor: '#F6BB42', height: '30px'});
            }
        }
    })

    //---------------------------------------------------------------
    // HANDLE GLOBAL LINK CLICK
    //---------------------------------------------------------------
    .directive('a', function(){
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#' || element.data('toggle') || element.data('slide')) {
                    element.on('click', function(e) {
                        e.preventDefault(); // prevent link click for above criteria
                    });
                }
            }
        }
    })

    //---------------------------------------------------------------
    // DIRECTIVE HEADER
    //---------------------------------------------------------------
    // scroll on messages area
    .directive('navbarMessage', function () {
        return {
            restrict: 'A',
            controller: function ($scope) {
                $scope.messages = [
                    {
                        image: '',
                        name: 'john kribo',
                        message: 'I was impressed how fast the content is loaded. Congratulations. nice design.',
                        meta: {
                            reply: '',
                            attach: ''
                        },
                        time: ''
                    }
                ]
            }
            //link: function (scope, element) {
            //    element.niceScroll({
            //        cursorwidth: '3px',
            //        cursorborder: '0px'
            //    });
            //}
        };
    })

    //---------------------------------------------------------------
    // DIRECTIVE SIDEBAR LEFT
    //---------------------------------------------------------------
    // Add class active on current MENU selected
    .directive('activeMenu'['$location',function ($location) {
        return {
            link: function postLink(scope, element, attrs) {
                scope.$on("$stateChangeSuccess", function (event, current, previous) {
                    if(attrs.href!=undefined){// this directive is called twice for some reason
                        // this var grabs the tab-level off the attribute, or defaults to 1
                        var pathLevel = attrs.activeTab || 1,
                        // this var finds what the path is at the level specified
                            pathToCheck = $location.path().split('/')[pathLevel],
                        // this var finds grabs the same level of the href attribute
                            tabLink = attrs.href.split('/')[pathLevel];
                        // now compare the two:
                        if (pathToCheck === tabLink) {
                            if(element.closest('.submenu').length){
                                element.closest('.submenu').addClass('active');
                                element.closest('.submenu').parents('.submenu').addClass('active');
                                element.append('<span class="selected"></span>'); // add selected mark
                            }
                            element.parent().addClass("active"); // parent to get the <li>
                            element.append('<span class="selected"></span>'); // add selected mark
                        }
                        else {
                            element.parent().removeClass("active");
                            element.find('.selected').remove(); // remove element contain selected mark
                        }
                    }
                });
            }
        };
    }])
    .directive('pldMenu',['settings',function(settings){
    	return{
    		restrict:'A',
    		scope: {
				menu:'=',
			},
    		template:'<div>aqui</div>',
    		link:function(scope, element, attrs){
    			console.info("");
    		}
    	}
    }])
    // Trigger dropdown sidebar menu
    .directive('collapseMenu', ['$timeout','settings', function(timer,settings){
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                /* Create trigger click for open menu sidebar */
            	var addClickSubmenu = function(){
                	element.find('a').on('click', function() {
	                    var parentElementMenu = $(this).parent('li'),
	                        parentElementSubmenu = $(this).parent('.submenu'),
	                        nextElement = $(this).nextAll(),
	                        arrowIcon = $(this).find('.arrow'),
	                        plusIcon = $(this).find('.plus');
	
	                    /* Add effect sound button click */
//	                    if($('.page-sound').length){
//	                        ion.sound.play("button_click_on");
//	                    }
	                    parentElementMenu.siblings().removeClass('active');
	                    if(parentElementSubmenu.parent('ul').find('ul:visible')){
	                        parentElementSubmenu.parent('ul').find('ul:visible').slideUp('fast');
	                        parentElementSubmenu.parent('ul').find('.open').removeClass('open');
	                        parentElementSubmenu.siblings().children('a').find('.selected').remove();
	                        parentElementMenu.siblings().children('a').find('.selected').remove();
	                    }
	                    if(nextElement.is('ul:visible')) {
	                        arrowIcon.removeClass('open');
	                        plusIcon.removeClass('open');
	                        nextElement.slideUp('fast');
	                    }
	
	                    if(!nextElement.is('ul:visible')) {
	                        nextElement.slideDown('fast');
	                        parentElementMenu.children('a').append('<span class="selected"></span>'); // add selected mark
	                        parentElementSubmenu.addClass('active');
	                        parentElementSubmenu.children('a').append('<span class="selected"></span>');
	                        arrowIcon.addClass('open');
	                        plusIcon.addClass('open');
	                    }

                	})
            	};
            	  
                //timer(addClickSubmenu, 2000);
                

            }
        }
    }])

    // Setting sidebar nicescroll
    .directive('sidebarLeftNicescroll', function () {
        return {
            restrict: 'A',
            link: function () {
                // Optimalisation: Store the references outside the event handler:
                function checkHeightSidebar() {
                    // Check if there is class page-sidebar-fixed
                    if($('.page-sidebar-fixed').length){
                        // =========================================================================
                        // SIDEBAR LEFT
                        // =========================================================================
                        // Setting dinamic height sidebar menu
                        var heightSidebarLeft       = $(window).outerHeight() - $('#header').outerHeight() - $('.sidebar-footer').outerHeight() - $('.sidebar-content').outerHeight(),
                            heightSidebarRight      = $(window).outerHeight() - $('#sidebar-right .panel-heading').outerHeight(),
                            heightSidebarRightChat  = $(window).outerHeight() - $('#sidebar-right .panel-heading').outerHeight() - $('#sidebar-chat .form-horizontal').outerHeight();
                        $('#sidebar-left .sidebar-menu').height(heightSidebarLeft)
                            .niceScroll({
                                cursorwidth: '3px',
                                cursorborder: '0px',
                                railalign: 'left'
                            });

                        // =========================================================================
                        // SIDEBAR RIGHT PROFILE
                        // =========================================================================
                        $('#sidebar-profile .sidebar-menu').height(heightSidebarRight)
                            .niceScroll({
                                cursorwidth: '3px',
                                cursorborder: '0px'
                            });

                        // =========================================================================
                        // SIDEBAR RIGHT LAYOUT
                        // =========================================================================
                        $('#sidebar-layout .sidebar-menu').height(heightSidebarRight)
                            .niceScroll({
                                cursorwidth: '3px',
                                cursorborder: '0px'
                            });

                        // =========================================================================
                        // SIDEBAR RIGHT SETTING
                        // =========================================================================
                        $('#sidebar-setting .sidebar-menu').height(heightSidebarRight)
                            .niceScroll({
                                cursorwidth: '3px',
                                cursorborder: '0px'
                            });

                        // =========================================================================
                        // SIDEBAR RIGHT CHAT
                        // =========================================================================
                        $('#sidebar-chat .sidebar-menu').height(heightSidebarRightChat)
                            .niceScroll({
                                cursorwidth: '3px',
                                cursorborder: '0px'
                            });

                    }
                }
                // Execute on load
                checkHeightSidebar();
                // Bind event listener
                $(window).resize(checkHeightSidebar);
            }
        }
    })

    // Trigger sidebar left minimize
    .directive('sidebarMinimize', function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Optimalisation: Store the references outside the event handler:
                var $window = $(window),
                    sidebarMinimize = $('.navbar-minimize a'),
                    settingMinimize = $('.navbar-setting a'),
                    sidebarMobileLeftMinimize = $('.navbar-minimize-mobile.left'),
                    sidebarMobileRightMinimize = $('.navbar-minimize-mobile.right')
                function checkWidth() {
                    var windowsize = $window.width();
                    // Check if view screen on greater then 720px and smaller then 1024px
                    if (windowsize > 768 && windowsize <= 1024) {
                        $('body').addClass('page-sidebar-minimize-auto');
                    }
                    else if (windowsize <= 768) {
                        $('body').removeClass('page-sidebar-minimize');
                        $('body').removeClass('page-sidebar-minimize-auto');
                    }
                    else{
                        $('body').removeClass('page-sidebar-minimize-auto');
                    }
                }
                // Execute on load
                checkWidth();
                // Bind event listener
                $(window).resize(checkWidth);

                // When the minimize trigger is clicked
                sidebarMinimize.on('click',function(){

                    // Add effect sound button click
//                    if($('.page-sound').length){
//                        ion.sound.play("button_click");
//                    }

                    // Check class sidebar right show
                    if($('.page-sidebar-right-show').length){
                        $('body').removeClass('page-sidebar-right-show');
                    }

                    // Check class sidebar minimize auto
                    if($('.page-sidebar-minimize-auto').length){
                        $('body').removeClass('page-sidebar-minimize-auto');
                    }else{
                        // Toggle the class to the body
                        $('body').toggleClass('page-sidebar-minimize');
                    }
                    /*
                    // Check the current cookie value
                    // If the cookie is empty or set to not active, then add page_sidebar_minimize
                    if ($.cookie('page_sidebar_minimize') == "undefined" || $.cookie('page_sidebar_minimize') == "not_active") {

                        // Set cookie value to active
                        $.cookie('page_sidebar_minimize','active', {expires: 1});
                    }

                    // If the cookie was already set to active then remove it
                    else {

                        // Remove cookie with name page_sidebar_minimize
                        $.removeCookie('page_sidebar_minimize');

                        // Create cookie with value to not_active
                        $.cookie('page_sidebar_minimize','not_active',  {expires: 1});

                    }*/

                });

                settingMinimize.on('click',function(){
                    // Add effect sound button click
//                    if($('.page-sound').length){
//                        ion.sound.play("button_click");
//                    }
                    if($('.page-sidebar-minimize.page-sidebar-right-show').length){
                        $('body').toggleClass('page-sidebar-minimize page-sidebar-right-show');
                    }
                    else if($('.page-sidebar-minimize').length){
                        $('body').toggleClass('page-sidebar-right-show');
                    }else{
                        $('body').toggleClass('page-sidebar-minimize page-sidebar-right-show');
                    }
                });

                // This action available on mobile view
                sidebarMobileLeftMinimize.on('click',function(){
                    // Add effect sound button click
//                    if($('.page-sound').length){
//                        ion.sound.play("button_click");
//                    }
                    if($('body.page-sidebar-right-show').length){
                        $('body').removeClass('page-sidebar-right-show');
                        $('body').removeClass('page-sidebar-minimize');
                    }
                    $('body').toggleClass('page-sidebar-left-show');
                });
                sidebarMobileRightMinimize.on('click',function(){
                    // Add effect sound button click
//                    if($('.page-sound').length){
//                        ion.sound.play("button_click");
//                    }
                    if($('body.page-sidebar-left-show').length){
                        $('body').removeClass('page-sidebar-left-show');
                        $('body').removeClass('page-sidebar-minimize');
                    }
                    $('body').toggleClass('page-sidebar-right-show');
                });
            }
        }
    })

    //===============================================================
    // CHOOSE THEMES
    //===============================================================
    /*.directive('chooseThemes', function(){
        return {
            restrict: 'A',
            link: function (scope, element){
                var selectedTheme = element.find('.theme-design');
                // Check cookie for color schemes
                if ($.cookie('color_schemes')) {
                    $('link#theme').attr('href', 'assets/admin/css/themes/'+$.cookie('color_schemes')+'.theme.css');
                }
                // Check cookie for navbar color
                if ($.cookie('navbar_color')) {
                    $('.navbar-toolbar').attr('class', 'navbar navbar-toolbar navbar-'+$.cookie('navbar_color'));
                }
                // Check cookie for sidebar color
                if ($.cookie('sidebar_color')) {
                    // Check variant sidebar class
                    if($('#sidebar-left').hasClass('sidebar-box')){
                        $('#sidebar-left').attr('class','sidebar-box sidebar-'+$.cookie('sidebar_color'));
                    }
                    else if($('#sidebar-left').hasClass('sidebar-rounded')){
                        $('#sidebar-left').attr('class','sidebar-rounded sidebar-'+$.cookie('sidebar_color'));
                    }
                    else if($('#sidebar-left').hasClass('sidebar-circle')){
                        $('#sidebar-left').attr('class','sidebar-circle sidebar-'+$.cookie('sidebar_color'));
                    }
                    else if($('#sidebar-left').attr('class') == ''){
                        $('#sidebar-left').attr('class','sidebar-'+$.cookie('sidebar_color'));
                    }
                }

                selectedTheme.on('click',function(){

                    // Create variable name selector file css
                    var themename = $(this).find('.hide').text();

                    // Add effect sound
                    if($('.page-sound').length){
                        ion.sound.play("camera_flashing_2");
                    }

                    // Add attribut href css theme
                    $('link#theme').attr('href', 'assets/admin/css/themes/'+themename+'.theme.css');

                    // Set cookie theme name value to variable themename
                    $.cookie('color_schemes',themename, {expires: 1});

                });
            }
        };
    })*/

    //===============================================================
    // NAVBAR COLOR
    //===============================================================
    .directive('navbarColor', function(){
        return {
            restrict: 'A',
            link: function (scope, element){
                var selectedColor = element.find('.theme-navbar');
                selectedColor.on('click',function(){
                    // Create variable name selector file css
                    var classname = $(this).find('.hide').text();
                    // Add effect sound
                    if($('.page-sound').length){
                        ion.sound.play("camera_flashing_2");
                    }
                    // Add class navbar-color
                    $('.navbar-toolbar').attr('class', 'navbar navbar-toolbar navbar-'+classname);
                    // Set cookie theme name value to variable classname
                    $.cookie('navbar_color',classname, {expires: 1});
                });
            }
        };
    })

    //===============================================================
    // SIDEBAR COLOR
    //===============================================================
    .directive('sidebarColor', function(){
        return {
            restrict: 'A',
            link: function (scope, element){
                var selectedColor = element.find('.theme-sidebar');
                selectedColor.on('click',function(){
                    // Create variable name selector file css
                    var classname = $(this).find('.hide').text();
                    // Add effect sound
                    if($('.page-sound').length){
                        ion.sound.play("camera_flashing_2");
                    }
                    // Check variant sidebar class
                    if($('#sidebar-left').hasClass('sidebar-box')){
                        $('#sidebar-left').attr('class','sidebar-box sidebar-'+classname);
                    }
                    else if($('#sidebar-left').hasClass('sidebar-rounded')){
                        $('#sidebar-left').attr('class','sidebar-rounded sidebar-'+classname);
                    }
                    else if($('#sidebar-left').hasClass('sidebar-circle')){
                        $('#sidebar-left').attr('class','sidebar-circle sidebar-'+classname);
                    }
                    else if($('#sidebar-left').attr('class') == ''){
                        $('#sidebar-left').attr('class','sidebar-'+classname);
                    }
                    // Set cookie theme name value to variable classname
                    $.cookie('sidebar_color',classname, {expires: 1});
                });
            }
        };
    })

    // =========================================================================
    // COPYRIGHT YEAR
    // =========================================================================
    .directive('copyrightYear', function(){
        return {
            restrict: 'A',
            link: function (scope, element){
                var today = new Date();
                $(element).text(today.getFullYear());
            }
        };
    })
    
    
    //===============================================================
    // LAYOUT SETTING
    //===============================================================
    .directive('layoutSetting', function(){
        return {
            restrict: 'A',
            link: function (scope, element){
                var layoutSetting = $('.layout-setting').find('input'),
                    layoutHeaderSetting = $('.header-layout-setting').find('input'),
                    layoutSidebarSetting = $('.sidebar-layout-setting').find('input'),
                    layoutSidebarTypeSetting = $('.sidebar-type-setting').find('input'),
                    layoutFooterSetting = $('.footer-layout-setting').find('input');
                // Check cookie for layout setting
                if ($.cookie('layout_setting')) {
                    $('body').addClass($.cookie('layout_setting'));
                }

                // Check cookie for header layout setting
                if ($.cookie('header_layout_setting')) {
                    $('body').addClass($.cookie('header_layout_setting'));
                }

                // Check cookie for sidebar layout setting
                if ($.cookie('sidebar_layout_setting')) {
                    $('#sidebar-left').addClass($.cookie('sidebar_layout_setting'));
                }

                // Check cookie for sidebar type layout setting
                if ($.cookie('sidebar_type_setting')) {
                    $('#sidebar-left').addClass($.cookie('sidebar_type_setting'));
                }

                // Check cookie for footer layout setting
                if ($.cookie('footer_layout_setting')) {
                    $('body').addClass($.cookie('footer_layout_setting'));
                }

                // Check checked status input on layout setting
                if($('body').not('.page-boxed')){
                    $('.layout-setting li:eq(0) input').attr('checked','checked');
                }
                if($('body').hasClass('page-boxed')){
                    $('.layout-setting li:eq(1) input').attr('checked','checked');
                    $('body').removeClass('page-header-fixed');
                    $('body').removeClass('page-sidebar-fixed');
                    $('body').removeClass('page-footer-fixed');
                    $('.header-layout-setting li:eq(1) input').attr('disabled','disabled').next().css('text-decoration','line-through').parent('.rdio').attr({'data-toggle':'tooltip','data-container':'body','data-placement':'left','data-title':'Not working on page boxed'}).tooltip();
                    $('.sidebar-layout-setting li:eq(1) input').attr('disabled','disabled').next().css('text-decoration','line-through').parent('.rdio').attr({'data-toggle':'tooltip','data-container':'body','data-placement':'left','data-title':'Not working on page boxed'}).tooltip();
                    $('.footer-layout-setting li:eq(1) input').attr('disabled','disabled').next().css('text-decoration','line-through').parent('.rdio').attr({'data-toggle':'tooltip','data-container':'body','data-placement':'left','data-title':'Not working on page boxed'}).tooltip();
                }

                // Check checked status input on header layout setting
                if($('body').not('.page-header-fixed')){
                    $('.header-layout-setting li:eq(0) input').attr('checked','checked');
                }
                if($('body').hasClass('page-header-fixed')){
                    $('.header-layout-setting li:eq(1) input').attr('checked','checked');
                }

                // Check checked status input on sidebar layout setting
                if($('body').not('.page-sidebar-fixed')){
                    $('.sidebar-layout-setting li:eq(0) input').attr('checked','checked');
                }
                if($('body').hasClass('page-sidebar-fixed')){
                    $('.sidebar-layout-setting li:eq(1) input').attr('checked','checked');
                }

                // Check checked status input on sidebar type layout setting
                if($('#sidebar-left').not('.sidebar-box, .sidebar-rounded, .sidebar-circle')){
                    $('.sidebar-type-setting li:eq(0) input').attr('checked','checked');
                }
                if($('#sidebar-left').hasClass('sidebar-box')){
                    $('.sidebar-type-setting li:eq(1) input').attr('checked','checked');
                }
                if($('#sidebar-left').hasClass('sidebar-rounded')){
                    $('.sidebar-type-setting li:eq(2) input').attr('checked','checked');
                }
                if($('#sidebar-left').hasClass('sidebar-circle')){
                    $('.sidebar-type-setting li:eq(3) input').attr('checked','checked');
                }

                // Check checked status input on footer layout setting
                if($('body').not('.page-footer-fixed')){
                    $('.footer-layout-setting li:eq(0) input').attr('checked','checked');
                }
                if($('body').hasClass('page-footer-fixed')){
                    $('.footer-layout-setting li:eq(1) input').attr('checked','checked');
                }


                layoutSetting.change(function(){

                    // Create variable class name for layout setting
                    var classname = $(this).val();

                    // Add trigger change class on body HTML
                    if($('body').hasClass('page-boxed')){
                        $('body').removeClass('page-boxed');
                        $('body').removeClass('page-header-fixed');
                        $('body').removeClass('page-sidebar-fixed');
                        $('body').removeClass('page-footer-fixed');
                        $('.header-layout-setting li:eq(1) input').removeAttr('disabled').next().css('text-decoration','inherit').parent('.rdio').tooltip('destroy');
                        $('.sidebar-layout-setting li:eq(1) input').removeAttr('disabled').next().css('text-decoration','inherit').parent('.rdio').tooltip('destroy');
                        $('.footer-layout-setting li:eq(1) input').removeAttr('disabled').next().css('text-decoration','inherit').parent('.rdio').tooltip('destroy');
                    }else{
                        $('body').addClass($(this).val());
                        $('body').removeClass('page-header-fixed');
                        $('body').removeClass('page-sidebar-fixed');
                        $('body').removeClass('page-footer-fixed');
                        $('.header-layout-setting li:eq(1) input').attr('disabled','disabled').next().css('text-decoration','line-through').parent('.rdio').attr({'data-toggle':'tooltip','data-container':'body','data-placement':'left','data-title':'Not working on page boxed'}).tooltip();
                        $('.sidebar-layout-setting li:eq(1) input').attr('disabled','disabled').next().css('text-decoration','line-through').parent('.rdio').attr({'data-toggle':'tooltip','data-container':'body','data-placement':'left','data-title':'Not working on page boxed'}).tooltip();
                        $('.footer-layout-setting li:eq(1) input').attr('disabled','disabled').next().css('text-decoration','line-through').parent('.rdio').attr({'data-toggle':'tooltip','data-container':'body','data-placement':'left','data-title':'Not working on page boxed'}).tooltip();
                    }

                    // Set cookie theme name value to variable classname
                    $.cookie('layout_setting',classname, {expires: 1});

                });

                layoutHeaderSetting.change(function(){

                    // Create variable class name for layout setting
                    var classname = $(this).val();

                    // Add trigger change class on body HTML
                    if($('body').hasClass('page-header-fixed')){
                        $('body').removeClass('page-header-fixed');
                        $('body').addClass($(this).val());
                    }

                    $('body').addClass($(this).val());

                    // Set cookie theme name value to variable classname
                    $.cookie('header_setting',classname, {expires: 1});

                });

                layoutSidebarSetting.change(function(){

                    // Create variable class name for layout setting
                    var classname = $(this).val();

                    // Add trigger change class on body HTML
                    if($('body').hasClass('page-sidebar-fixed')){
                        $('body').removeClass('page-sidebar-fixed');
                        $('.header-layout-setting li:eq(0) input').removeAttr('disabled').next().css('text-decoration','inherit').parent('.rdio').tooltip('destroy');
                    }else{
                        $('body').addClass($(this).val());
                        $('body').addClass('page-header-fixed');
                        $('.header-layout-setting li:eq(0) input').attr('disabled','disabled').next().css('text-decoration','line-through').parent('.rdio').attr({'data-toggle':'tooltip','data-container':'body','data-placement':'left','data-title':'Not working on sidebar fixed'}).tooltip();
                        $('.header-layout-setting li:eq(1) input').attr('checked','checked');
                    }

                    // Set cookie theme name value to variable classname
                    $.cookie('sidebar_layout_setting',classname, {expires: 1});

                });

                layoutSidebarTypeSetting.change(function(){

                    // Create variable class name for layout setting
                    var classname = $(this).val();

                    // Add trigger change class on sidebar left element
                    if($('#sidebar-left').hasClass('sidebar-circle')){
                        $('#sidebar-left').removeClass('sidebar-circle');
                        $('#sidebar-left').addClass($(this).val());
                    }

                    if($('#sidebar-left').hasClass('sidebar-box')){
                        $('#sidebar-left').removeClass('sidebar-box');
                        $('#sidebar-left').addClass($(this).val());
                    }

                    if($('#sidebar-left').hasClass('sidebar-rounded')){
                        $('#sidebar-left').removeClass('sidebar-rounded');
                        $('#sidebar-left').addClass($(this).val());
                    }

                    $('#sidebar-left').addClass($(this).val());

                    // Set cookie theme name value to variable classname
                    $.cookie('sidebar_type_setting',classname, {expires: 1});

                });

                layoutFooterSetting.change(function(){

                    // Create variable class name for layout setting
                    var classname = $(this).val();

                    // Add trigger change class on body HTML
                    if($('body').hasClass('page-footer-fixed')){
                        $('body').removeClass('page-footer-fixed')
                    }else{
                        $('body').addClass($(this).val());
                    }

                    // Set cookie theme name value to variable classname
                    $.cookie('footer_layout_setting',classname, {expires: 1});

                });
            }
        };
    })
    .directive('loaded',function(){
    	return {
    		restrict: 'A',
            link: function (scope, element) {
            	$('.submenu > a').click(function() {
                    var parentElement = $(this).parent('.submenu'),
                        nextElement = $(this).nextAll(),
                        arrowIcon = $(this).find('.arrow'),
                        plusIcon = $(this).find('.plus');

                    // Add effect sound button click
//                    if($('.page-sound').length){
//                        ion.sound.play("button_click_on");
//                    }

                    if(parentElement.parent('ul').find('ul:visible')){
                        parentElement.parent('ul').find('ul:visible').slideUp('fast');
                        parentElement.parent('ul').find('.open').removeClass('open');
                    }

                    if(nextElement.is('ul:visible')) {
                        arrowIcon.removeClass('open');
                        plusIcon.removeClass('open');
                        nextElement.slideUp('fast');
                        arrowIcon.removeClass('fa-angle-double-down').addClass('fa-angle-double-right');
                    }

                    if(!nextElement.is('ul:visible')) {
                        arrowIcon.addClass('open');
                        plusIcon.addClass('open');
                        nextElement.slideDown('fast');
                        arrowIcon.removeClass('fa-angle-double-right').addClass('fa-angle-double-down');
                    }

                });
            }
    	}
    	})
    	// ========================================================================
	// DIRECTIVA PARA BUSQUEDA DE MENUS
	// ========================================================================
	.directive("menus",['pldService','$state',function(pldService,$state){
		return{	
			restrict: 'A',
			link: function(element,attr,scope){	
				var menusJson=[];
				//console.log("menu conversion");
				//console.debug(JSON.parse(scope.val));
				scope.jsonMenu = JSON.parse(scope.val);
				
				var menusJson=[];
				
				angular.forEach(scope.jsonMenu, function(menu){
					var modulo=menu.description.trim();
					angular.forEach(menu.children, function(seccion){
						angular.forEach(seccion.children, function(submodulo){
							
							var description=submodulo.description.trim();
							
							description=description.replace('á','a');
							description=description.replace('é','e');
							description=description.replace('í','i');
							description=description.replace('ó','o');
							description=description.replace('ú','u');
							description=description.replace('ü','u');
							
							menusJson.push({
						        desc: description+' - '+modulo,
						        path: submodulo.mapping.trim(),
						        idParent:submodulo.idParent,
						        idModule:submodulo.idModule,
						    });
							
						});							
					});
				});
								
				var optionsAutocomplete = {
					data:menusJson,					
					getValue:"desc",
					list:{
						//maxNumberOfElements: 5,
						match: {
							enabled: true
						},					
						onClickEvent: function() {
									
							var indexPara = $("#menus").getSelectedItemData().path.trim();
							var indexGo=indexPara.split('.').join('').replace(/ /g, '');
							
							angular.forEach($('.sidebar-menu li.active'),function(elem){ $(elem).removeClass('active') });
							angular.forEach($('#'+indexGo).parents(),function(elem){  if($(elem).hasClass("submenu")){$(elem).addClass("active")}  });
							$('.sidebar-selected-item').removeClass('sidebar-selected-item');
							$('#'+($("#menus").getSelectedItemData().idModule)).addClass("sidebar-selected-item");
							$("#menus")[0].value='';
							 
							
							 if(scope.idModuloActual!=parseInt($("#menus").getSelectedItemData().idModule)){
								 pldService.ActualizaModuloActivo($("#menus").getSelectedItemData().idModule)
								 .then(function(data){
									 //console.debug(scope);
					     		 		scope.pldTittle=data;
					     		 		$state.go(indexPara);
					     		 	},function(fail){
					     		 		scope.pldTittle = { pageTitle: "PLD | Error",pageHeader: {icon: "fa fa-warning",title: "Error en carga de titulo",subtitle: fail.state.message,}};
					     		 	});
							 }
							
						},
						onKeyEnterEvent: function() {
							
							var indexPara = $("#menus").getSelectedItemData().path.trim();							
							var indexGo=indexPara.split('.').join('').replace(/ /g, '');
							
							angular.forEach($('.sidebar-menu li.active'),function(elem){ $(elem).removeClass('active') });
							angular.forEach($('#'+indexGo).parents(),function(elem){  if($(elem).hasClass("submenu")){$(elem).addClass("active")}  });
							$('.sidebar-selected-item').removeClass('sidebar-selected-item');
							$('#'+($("#menus").getSelectedItemData().idModule)).addClass("sidebar-selected-item");
							$("#menus")[0].value='';
						
							 if(scope.idModuloActual!=parseInt($("#menus").getSelectedItemData().idModule)){
								 pldService.ActualizaModuloActivo($("#menus").getSelectedItemData().idModule)
								 .then(function(data){
									 	//console.debug(scope);
					     		 		scope.pldTittle=data;
					     		 		$state.go(indexPara);
					     		 	},function(fail){
					     		 		scope.pldTittle = { pageTitle: "PLD | Error",pageHeader: {icon: "fa fa-warning",title: "Error en carga de titulo",subtitle: fail.state.message,}};
					     		 	});
				
							 }
					}
				}
				
				};
				
				//console.log("optionsAutocomplete:-->");
				//console.log(optionsAutocomplete);
				$("#menus").easyAutocomplete(optionsAutocomplete);
		        
		        
				
			}
		}
	}])
    	//directiva para activacion del menu despues de finalizar el ng-repeat
        .directive('onFinishRender',['$timeout', function ($timeout) {
    	    return {
    	        restrict: 'A',
    	        link: function (scope, element, attr) {
    	            if (scope.$last === true) {
    	                $timeout(function () {
    	                    scope.$emit(attr.onFinishRender);
    	                });
    	            }
    	        }
    	    }
    	    
    	}]);

})();

},{}],19:[function(require,module,exports){
/**
 *
 */
(function(){
	angular.module('wcPldCommons', ["ngDialog"])
	.directive('fhCalendar', function () {//directiva calendario requiere  bootstrap-datepicker.js
            return {
                restrict: 'A',
                link: function (scope, element) {
                    element.datepicker({
                        format: 'yyyy-mm-dd',
                        todayBtn: 'linked'
                    });
                }
            }
        }).directive('mes',['settings',function(settings){//directiva para seleccion de mes
    		return{
    			restrict:'AE',
    			template:'<select id="mes" class="form-control" ng-model="mes" ng-options="item.Clave as item.Descripcion for item in meses"></select>',
    			link:function(scope,elem,atrs){

    				scope.meses=[{Clave:1,Descripcion:'Enero'},
    				             {Clave:2,Descripcion:'Febrero'},
    				             {Clave:3,Descripcion:'Marzo'},
    				             {Clave:4,Descripcion:'Abril'},
    				             {Clave:5,Descripcion:'Mayo'},
    				             {Clave:6,Descripcion:'Junio'},
    				             {Clave:7,Descripcion:'Julio'},
    				             {Clave:8,Descripcion:'Agosto'},
    				             {Clave:9,Descripcion:'Septiembre'},
    				             {Clave:10,Descripcion:'Octubre'},
    				             {Clave:11,Descripcion:'Noviembre'},
    				             {Clave:12,Descripcion:'Diciembre'}]
    				if(scope.mes==undefined || scope.mes==null)
    					scope.mes=1;
    			}
    		}
    	}]).directive('anio',function(){//directiva que muestra años desde el 2002 al año actual
    		return{
    			restrict:'AE',
    			template:'<select id="anio" class="form-control" ng-model="anio" ng-options="item.year as item.year  for item in anios"></select>',
    			link:function(scope,elem,atrs){
    				var currentYear= new Date().getFullYear();
    				var years=[];
    				if(scope.anio==undefined || scope.anio==null)
    					scope.anio=currentYear;

    				j=currentYear-2002;//2002 es el ultimo año a desplegar
    				for(var i=0;i<=j;i++){//SE GENERA LA LISTA DE AÑOS 15 AÑOS ATRAS
    					years[i]={year: currentYear-i};
    				}

    				scope.anios=years;
    			}

    		}
    	}).directive('riesgo',['ngDialog',function(ngDialog){//directiva para manejo de nivel de riesgo
    		return{
    			restrict:'AE',
    			scope:{
    				value:"@",
    			},
    			template:
    				'<a  ng-if="value  == \'A\'" type="button" class="btn redBtn rounded" data-tooltip data-toggle="tooltip" data-placement="top" data-title="Alto" style="color: black;"><i class="fa fa-thermometer-4" ></i>&nbsp;Alto</a>'+
    				'<a  ng-if="value  == \'M\'" type="button" class="btn yellowBtn rounded" data-tooltip data-toggle="tooltip" data-placement="top" data-title="Medio" style="color: black;"><i class="fa fa-thermometer-2"></i>&nbsp;Medio</a>'+
    				'<a  ng-if="value  == \'B\'" type="button" class="btn greenBtn rounded" data-tooltip data-toggle="tooltip" data-placement="top" data-title="Bajo" style="color: black;"><i class="fa fa-thermometer-0"></i>&nbsp;Bajo</a>',

    			}
    	}]).directive('pldMessage',['settings',function(settings){//directiva para manejo de mensajes
		return{
			restrict:'E',
			scope:{
				configuration:"=configuration",

			},
			template:'<div ng-show="configuration.state.show" class="alert {{configuration.state.styleMessage}}"  role="alert">'+
						'<span class="alert-icon"><i ng-class="configuration.state.styleIcon" class="fa-lg" aria-hidden="true"></i></span>'+
						'<div class="notification-info">'+
							'<a href="#">&nbsp;&nbsp;{{configuration.state.message}}</a>'+
							'<p>&nbsp;&nbsp;{{configuration.message.info}}</p>'+
						'</div></div>'+
					'<div ng-show="configuration.showAnimation" class="alert alert-info"> <center>'+
						'<h4>Procesando solicitud . . .</h4>'+
						'<img class="mr-15" data-ng-src="{{imgPath}}" alt="..." style="width:90px;height:90px;">'+
					'</center></div>',
			link:function(scope,elem,atrs,ngModel){
			scope.imgPath=settings.imagePath+'/loader/general/worldTurnning2.gif';
			}

		}
	}]).directive('fileDownload',function(){//Directiva para descarga de archivos
		return{
			restrict:'A',
			scope:{
				fileDownload:'=',//variable tipo BlobObject
				fileName:'=',//nombre del archivo con extension
			},

			link:function(scope,elem,atrs){

				scope.$watch('fileDownload',function(newValue, oldValue){

					if(newValue!=undefined && newValue!=null){
						console.debug('Downloading a new file');
						var isFirefox = typeof InstallTrigger !== 'undefined';
						var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
						var isIE = /*@cc_on!@*/false || !!document.documentMode;
						var isEdge = !isIE && !!window.StyleMedia;
						var isChrome = !!window.chrome && !!window.chrome.webstore;
						var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
						var isBlink = (isChrome || isOpera) && !!window.CSS;

						if(isFirefox || isIE || isChrome){
							if(isChrome){
								console.log('administrando descarga en Google Chrome');
								var url = window.URL || window.webkitURL;
				                var fileURL = url.createObjectURL(scope.fileDownload);
								var downloadLink = angular.element('<a></a>');//create a new  <a> tag element
		                        downloadLink.attr('href',fileURL);
		                        downloadLink.attr('download',scope.fileName);
		                        downloadLink.attr('target','_self');
		                        downloadLink[0].click();//call click function
			                    url.revokeObjectURL(fileURL);//revoke the object from URL
							}
							if(isIE){
								console.log('Administrando descarga de Internet Explorer>10');
						        window.navigator.msSaveOrOpenBlob(scope.fileDownload,scope.fileName);
							}
							if(isFirefox){
								console.log('administrando descarga en Mozilla Firefox');
								var url = window.URL || window.webkitURL;
				                var fileURL = url.createObjectURL(scope.fileDownload);
								var a=elem[0];//recover the <a> tag from directive
								a.href=fileURL;
								a.download=scope.fileName;
								a.target='_self';
								a.click();//we call click function
							}


						}else{
							alert('LO SENTIMOS EL NAVEGADOR NO ES COMPATIBLE');
						}
					}

					scope.fileDownload=undefined;//limpia la variable a fin de que no se produzcan segundas descargas inesperadas
				});

			}
		}
	});/*.directive('titulo',['catalogosGet','settings',function(catalogosGet,settings){
		return{
			restrict:'AE',
			scope: {
				regla:'=regla',
				pldsystem:'=pldsystem',
			},
			template:'<h3 id="titulo" class="panel-title">'+
					 	'<a href="#" ng-click="desc=!desc">'+
							'<i class="fa fa-question-circle"></i>'+
						'</a>&nbsp;&nbsp;{{myTitle}}'+
					 '</h3>'+
					 '<div ng-show="desc"><p>{{description}}</p></div>',
			link:function(scope,elem,atrs){
				scope.$watch('regla',function(newValue, oldValue){
					///console.info("cambio!!!!!!!!");
					if(newValue != undefined){
							catalogosGet.consultaParametrosSP({id:newValue,pldsystem:atrs.pldsystem},settings)
							.then(function (data) {
								//console.info("hay va el data");
								//console.info(data);
								scope.myTitle = data.jsonResult[0].Regla;
								var description=""+data.jsonResult[0].Descripcion;
								if(data.jsonResult[0].U>0)
								description=description.replace("U",data.jsonResult[0].U);
								if(data.jsonResult[0].V>0)
								description=description.replace("V",data.jsonResult[0].V);
								if(data.jsonResult[0].W>0)
								description=description.replace("W",data.jsonResult[0].W);
								if(data.jsonResult[0].X>0)
								description=description.replace("X",data.jsonResult[0].X);
								if(data.jsonResult[0].Y>0)
								description=description.replace("Y",data.jsonResult[0].Y);
								if(data.jsonResult[0].Z>0)
								description=description.replace("Z",data.jsonResult[0].Z);

								//console.info("descripcion::"+description)
								scope.description=description;


							},function(reason){
								console.debug('Failed: '+reason.message.info);
								scope.myTitle='Titulo  no encontrado';
								scope.descrption=reason.message.info;
							});
						}

				});
			},
		}
	}]);*/
})();

},{}],20:[function(require,module,exports){
/**
 * All services
 */
 //var angular=require('angular');

(function(){
	angular.module('pldServices',[])
		.factory('pldService',[ '$http', '$q', function($http, $q) {
			//variable para manejo de errores
			var networkError={state:{success:false, show:true, message:'Error de conexión', styleMessage:'alert-danger', styleIcon:'fa fa-frown-o',},
					message:{show:false,	style:'message-info',info:'Error de conexión, es posible que no este conectado a la red o que el servidor no se encuentre disponible momentaneamente',}
					}
			//cvariable recuperada del Index y que agrega el contexto de la aplicacion.
			var context=url;

			// =====================================================================================
			// ACTUALIZA EL MODULO ACTIVO Y FIJA LAS HERRAMIENTAS ASOCIADAS
			// =====================================================================================
			 function ActualizaModuloActivo(idModulo){
				console.log("pldServices :: ActualizaModuloActivo :: RUNNING");
				  var deferred = $q.defer();

				  // Limpia datos del contenedor
				  // type : GET
				  $http.get(context+'/actualizaModuloActivo?idModuloActual='+idModulo)
				  	 .then(function onSuccess(data){
				  		 console.debug("pldServices :: ActualizaModuloActivo :: SUCCESS");
						  deferred.resolve(data.data);
				  	 },function onError(data,status){
				  		console.error("pldServices :: ActualizaModuloActivo :: ERROR");
						console.debug("HTML STATUS: "+status);
					  		if(status===0 || data.data==undefined){
					  			console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
					  			deferred.reject(networkError);
					  		}else{
					  			console.error(data);
					  			 deferred.reject(data.data);
					  		}
				  	 });

			return deferred.promise;
			}


			 // =====================================================================================
			 //  LIMPIA LAS CONSULTAS ALMACENADAS EN EL CONTENEDOR DE DATOS  ASIGNADO A CADA USUARIO.
			 // =====================================================================================

			function LimpiaDatosContenedor(){
				  console.log("pldServices :: LimpiaDatosContenedor :: RUNNING");
				  var deferred = $q.defer();

				  // Limpia datos del contenedor
				  // type : GET
				  $http.get(context+'/limpiaDatosContenedor')
				  	.then(function onSuccess(data){
				  		 console.debug("pldServices :: LimpiaDatosContenedor :: SUCCESS");
						  deferred.resolve(data.data);
				  	},function onError(data,status){
				  		 console.error("pldServices :: LimpiaDatosContenedor :: ERROR");
						 console.debug("HTML STATUS: "+status);
					  		if(status===0 || data.data==undefined){
					  			console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
					  			deferred.reject(networkError);
					  		}else{
					  			console.error(data);
					  			 deferred.reject(data.data);
					  		}
				  	});

			return deferred.promise;
			}


			 // =============================================================================================
			 //  RECUPERA LA INFOMACION ALMACENADA EN EL CONTENEDOR DEL USUARIO POR MEDIO DE LA LLAVE ASIGNADA
			 // =============================================================================================

			function getDataBykeyName(tableparams,keyName){
				  console.log("pldServices :: getDataBykeyName :: RUNNING");
				  var deferred = $q.defer();
				  // type : POST

				  $http.post(context+'/dataFromContainer/'+keyName,tableparams)
				  	.then(function onSuccess(data){
				  		console.debug("pldServices :: getDataBykeyName :: SUCCESS");
				  		 deferred.resolve(data.data);
				  	},function onError(data,status){
				  		console.error("pldServices :: getDataBykeyName :: ERROR");
				  		console.debug("HTML STATUS: "+status);
				  		if(status===0 || data.data==undefined){
				  			console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
				  			deferred.reject(networkError);
				  		}else{
				  			console.error(data);
				  			 deferred.reject(data.data);
				  		}
				  	});

				return deferred.promise;
				}


			function ConsultaMenu(){
				console.log("pldServices :: menu  :: getMenu :: RUNNING");
				var deferred = $q.defer();

			  $http.get(context+'/restSession').then(function onSuccess(data){
				  console.debug("pldServices :: menu  :: getMenu :: SUCCESS");
				   deferred.resolve(data.data);
			  },function onError(data,status){
				  console.error("pldServices :: menu  :: getMenu :: ERROR");
				  console.debug("HTML STATUS: "+status);
				  if(status===0 || data.data==undefined){
			  			console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
			  			deferred.reject(networkError);
			  		}else{
			  			console.error(data);
			  			 deferred.reject(data.data);
			  		}
			  });

			  	return deferred.promise;
			}


			 // =============================================================================================================
			 //  SERVICIO QUE CONSULTA LA BD DE CENTRO DE MONITOREO, RECUPERA LAS NOTIFICACIONES DE LOS PLANES DE REMEDIACION.
			 // =============================================================================================================

			function ConsultaNotificaciones(){
			  console.log("pldServices :: ConsultaNotificaciones :: RUNNING");
			  var deferred = $q.defer();

			  // SP : {call PLD_ConsultaPlanRemediacion}
			  // type : GET
			  $http.get(context+'/restModuloCentroMonitoreo/consulta/planesRemediacion',{
				  params : {consulta : '5',mes : '',anio :	'',pais : 1}})
				  .then(function onSuccess(data){
					  console.debug("pldServices :: ConsultaNotificaciones :: SUCCESS");
				  	   deferred.resolve(data.data);
				  },function onError(data,status){
					  console.error("pldServices :: ConsultaNotificaciones :: ERROR");
					  console.debug("HTML STATUS: "+status);
				  if(status===0 || data.data==undefined){
			  			console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
			  			deferred.reject(networkError);
			  		}else{
			  			console.error(data);
			  			 deferred.reject(data.data);
			  		}
				  });

			return deferred.promise;

			}
			//.then(function onSuccess(data){},function onError(data,status){});
			// =============================================================================================================
			 //  SERVICIO PARA LA DESCARGA DE ARCHIVOS DE EXCEL DE TABLA DINAMICA
			 // =============================================================================================================
			// tipo: llave del contenedor
			// serachtext : texto de busqueda en la descarga
			// titulo : encabezado  del archivo excel
		function DownloadExcelFromTable(tipo,searchText,title){
			  console.log("pldServices :: DownloadExcelFromTable :: RUNNING");
			  var deferred = $q.defer();
			  // type : GET
			   $http.get(context+'/restDownload/downloadExcelFile',{
			   params : {
				   tipo : tipo,
				   searchText : searchText,
				   titulo : title,
		  		},
		  		responseType : 'arraybuffer',
			   }).then(function onSuccess(data){
				   console.debug("pldServices :: DownloadExcelFromTable :: SUCCESS");
					   deferred.resolve(data.data);
			   },function onError(data,status){
				   console.error("pldServices :: DownloadExcelFromTable :: ERROR");
					  console.debug("HTML STATUS: "+status);
					   deferred.reject(data.data);
			   });


			return deferred.promise;
			}
		// =============================================================================================================
		//  SERVICIO PARA LA DESCARGA DE ARCHIVOS LAYOUT EXCEL DE CARGAS MASIVAS
		// =============================================================================================================
		// tipo: llave del contenedor
		// serachtext : texto de busqueda en la descarga
		// titulo : encabezado  del archivo excel
		function DownloadExcelLayout(layoutName,settings){
			  console.log("pldServices :: DownloadExcelLayout :: RUNNING");
			  var deferred = $q.defer();

			  // type : GET
			  $http.get(context+'/resources/angularProject/layoutFiles/'+layoutName,{responseType : 'arraybuffer',})
			  	.then(function onSuccess(data){
			  		 console.debug("pldServices :: DownloadExcelLayout :: SUCCESS");
					  deferred.resolve(data.data);
			  	},function onError(data,status){
			  		console.error("pldServices :: DownloadExcelLayout :: ERROR");
					console.debug("HTML STATUS: "+status);
					 deferred.reject(data.data);
			  	});


			return deferred.promise;
			}

		// =============================================================================================================
		//  SERVICIO PARA LA CARGA DE ARCHIVOS LAYOUT EXCEL DE CARGAS MASIVAS AL BACKEND
		// =============================================================================================================
		// tipo: llave del contenedor
		// serachtext : texto de busqueda en la descarga
		// titulo : encabezado  del archivo excel
		function UploadExcelFile(file,user,moduleLayout) {
			var deferred = $q.defer();

			console.log("pldServices :: uploadExcelFile :: RUNNING");
				var url=context+'/restUpload/uploadExcelToValidation/';
				var fd = new FormData();
				fd.append('file', file);
				fd.append('moduleLayout', moduleLayout);
				fd.append('user', user);

						$http.post(url, fd, {
							transformRequest : angular.identity,
							headers : {
								'Content-Type' : undefined
							}})
							.then(function onSuccess(data){
								console.debug("pldServices :: uploadExcelFile :: SUCCESS");
								 deferred.resolve(data.data);
							},function onError(data,status){
								console.error("pldServices :: uploadExcelFile :: ERROR");
								console.debug("HTML STATUS: "+status);
								 deferred.reject(data.data);
							});

				return deferred.promise;

				}

		return {
			ActualizaModuloActivo : ActualizaModuloActivo,
			LimpiaDatosContenedor : LimpiaDatosContenedor,
			getDataBykeyName : getDataBykeyName,
			ConsultaMenu : ConsultaMenu,
		  ConsultaNotificaciones : ConsultaNotificaciones,
		  UploadExcelFile : UploadExcelFile,
		  DownloadExcelLayout : DownloadExcelLayout,
		  DownloadExcelFromTable : DownloadExcelFromTable,
		};
	}]);
})()

},{}]},{},[1]);
