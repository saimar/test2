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
