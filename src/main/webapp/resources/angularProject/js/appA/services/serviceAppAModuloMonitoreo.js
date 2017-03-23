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