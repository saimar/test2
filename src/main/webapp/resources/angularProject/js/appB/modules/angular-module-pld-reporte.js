/**
 * MUDULO REPORTE
 * 
 * Autor: 168833
 * 
 */

'use strict';
(function(){
    angular.module("pldModule.sgv.Reporte", ['serviceSgvModuloReportes'])
        
    .controller('ReporteVidaCtrl', ['$scope','settings','sgvModuloReportes','pldModel','$state',function ($scope,settings,sgvModuloReportes,pldModel,$state) {
        	console.debug('ReporteVidaCtrl loaded ...');

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
        				idAnalista:settings.user,
        				nombreAnalista:settings.userName,
        				descripcion:$scope.descripcion,
        				razones:$scope.razones,
        			};
        		
        		sgvModuloReportes.generaReporteManual(reportParams,settings)
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
        		
        		sgvModuloReportes.consultaDatosReporte({params:{idmovimiento:pldModel.report.idMovimiento,nucliente:pldModel.report.idCliente},keyTable:'dataReport'},settings)
        			.then(function(data){
        				//console.log(data);
        				$scope.dataReporte=data;
        				
        				$scope.descripcion=(data.jsonResult[0].Descripcion==null)?'':data.jsonResult[0].Descripcion;
        				$scope.razones=(data.jsonResult[0].Razones==null)?'':data.jsonResult[0].Razones;
        				$scope.messageDatosReporte=data;
        			},function(error){
        				$scope.messageDatosReporte=error;
        			}).then(function(){
        				sgvModuloReportes.consultaReportado(pldModel.report.idMovimiento,settings)
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