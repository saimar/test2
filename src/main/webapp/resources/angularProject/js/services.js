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
