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
