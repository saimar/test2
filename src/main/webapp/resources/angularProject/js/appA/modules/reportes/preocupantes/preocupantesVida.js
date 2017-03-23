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
