/**
 * All services
 */

(function(){
	angular.module('serviceCommons',[])
	.factory('commonsGet',[ '$http', '$q', function($http, $q) {
		
		var networkError={state:{success:false, show:true, message:'Error de conexión', styleMessage:'alert-danger', styleIcon:'fa fa-frown-o',},
				message:{show:false,	style:'message-info',info:'Error de conexión, es posible que no este conectado a la red o que el servidor no se encuentre disponible momentaneamente',}
				}

		function consultaReglasSistema(params,settings){
		  console.log("serviceCommons :: commonsGet :: consultaReglasSistema :: RUNNING");
		  var deferred = $q.defer();

		// SP : {call REM_ConsultaParametrosSP(?)}
		  // type : GET
		  $http.get(settings.context+'/restConsultasComunes/consulta/reglas/sistema',{params : {idParametro : params.id,}})
		  .success(function(data) {
		  console.debug("serviceCommons :: commonsGet :: consultaReglasSistema :: SUCCESS");
		  deferred.resolve(data);
		  }).error(function(data,status) {
		  console.error("serviceCommons :: commonsGet :: consultaReglasSistema :: ERROR");
		  console.debug("HTML STATUS: "+status);
	  		if(status===0){
	  			console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
	  			deferred.reject(networkError);
	  		}else{
	  			console.error(data);
	  			deferred.reject(data);
	  		}});

	return deferred.promise;
	}
	
		return {	
			consultaReglasSistema : consultaReglasSistema,
		};
	}]);
})()