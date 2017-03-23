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
