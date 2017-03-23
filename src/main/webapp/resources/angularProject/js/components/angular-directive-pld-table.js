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





