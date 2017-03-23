var app = angular.module('myApp', []);
app.controller('myCtrl',['$scope','dbService',function($scope,dbService) {

    $scope.restname='RestAppAModuloXX';
    $scope.servicename='serviceAppAModuloXX'
    $scope.newservice={url:'',sp:'',constante:'',operacion:'t',params:[]};

    $scope.services=[];

    $scope.addService=function(){
      console.debug('addService called ...');
      var newservice=new Object();//se crea una nueva variable pues javascript mantiene la relacion por referencia
      newservice.url=$scope.newservice.url;
      newservice.sp=$scope.newservice.sp;
      newservice.constante=$scope.newservice.constante;
      newservice.operacion=$scope.newservice.operacion;

      dbService.consultaSpParams(newservice.sp)
         .then(function(params){
           console.debug('consulta exitosa de parametros.');
           console.debug(params);
           newservice.params=params;
           $scope.services.push(newservice);
         },function(error){
           alert('Error en la consulta de los parametros del Store procedure');
         })
         $scope.newservice.url='';
         $scope.newservice.sp='';
         $scope.newservice.constante='';
    };

    $scope.deleteService=function(index){
      console.debug('deleteService called ...');
      $scope.services.splice(index,1);//elimina el elemento deseado
    }

    //console.log($scope.java);

}]).directive('javaCode',['buildServices',function(buildServices){
    return {
      restrict: 'E',
      scope: {
        restname: '=',
        services:'=',
      },
      template:'<code><textarea ng-model="java" cols="135" rows="30"></textarea></code>',
      link: function(scope) {


        var javalines=[];

          var buildJavaCode=function(javalines,restname){
            var java='@Controller\r\n@RequestMapping(value="/'+restname+'" )'+
                        '\r\npublic class '+restname+' {'+
                        '\r\n\r\n\tprivate static final Logger LOG = LoggerFactory.getLogger('+restname+'.class);'+'\r\n\t@Autowired'+
                        '\r\n\tStoredProcedure storedProcedure;'+
                        '\r\n\t@Autowired'+
                        '\r\n\tprivate SpringSecurityUserContext contextUser;\r\n\r\n';;

            for(var index in javalines){
              java+=javalines[index];
            }

            java+='\r\n\r\n}';

            return java;
          };

          scope.java =buildJavaCode(javalines,scope.restname);

          scope.$watch('restname', function(newValue,oldValue) {
                    javalines=[];
                    for(var i in scope.services){
                        javalines.push(buildServices.buildJavaService(newValue,scope.services[i].url,scope.services[i].constante,scope.services[i].sp,scope.services[i].params,scope.services[i].operacion))
                      }
                    scope.java =(scope.services!=undefined)?buildJavaCode(javalines,newValue):'';
               });

          scope.$watch('services.length', function(newValue,oldValue) {
                     javalines=[];
                     for(var i in scope.services){
                       javalines.push(buildServices.buildJavaService(scope.restname,scope.services[i].url,scope.services[i].constante,scope.services[i].sp,scope.services[i].params,scope.services[i].operacion))
                     }
                    scope.java =(scope.services!=undefined)?buildJavaCode(javalines,scope.restname):'';
              });
      }

    }
}]).directive('angularService',['dbService','buildServices',function(dbService,buildServices){
    return {
      restrict: 'E',
      scope: {
        services:'=',
        servicename:'=',
        restname:'=',
      },
      template:'<code><textarea ng-model="factory" cols="135" rows="30"></textarea></code>',
      link: function(scope) {


        var angularlines=[];

          var buildAngularCode=function(javalines,servicename,restname){
            var factory='(function(){'+
                        '\r\n\tangular.module(\''+servicename+'\',[])'+
                        '\r\n\t.factory(\''+servicename+'\',[ \'$http\', \'$q\', function($http, $q) {'+
                        '\r\n\t//Variable para manejo de errores'+
                        '\r\n\tvar networkError={state:{success:false, show:true, message:\'Error de conexión\', styleMessage:\'alert-danger\', styleIcon:\'fa fa-frown-o\',},'+
                        '\r\n\t\tmessage:{show:false,	style:\'message-info\',info:\'Error de conexión, es posible que no este conectado a la red o que el servidor no se encuentre disponible momentaneamente\',}'+
                        '\r\n\t}'+
                        '\r\n\r\n\tvar context=url+\'/'+restname+'\';//variable recuperada de index.html y que agrega el contexto de la aplicacion.\r\n';

            for(var index in angularlines){
              factory+=angularlines[index];
            }

            factory+='\r\n'+buildServices.buildReturnFactory(scope.services);
            factory+='\r\n\r\n\t}]);\r\n})()';

            return factory;
          };

          scope.factory =buildAngularCode(angularlines,scope.servicename,scope.restname);

          scope.$watch('servicename', function(newValue,oldValue) {
                    angularlines=[];
                    for(var i in scope.services){

                        angularlines.push(buildServices.buildAngularCode(newValue,scope.services[i].url,scope.services[i].sp,scope.services[i].params));
                      }
                    scope.factory =(scope.services!=undefined)?buildAngularCode(angularlines,newValue,scope.restname):'';
               });

          scope.$watch('services.length', function(newValue,oldValue) {
                     angularlines=[];
                     for(var i in scope.services){
                       angularlines.push(buildServices.buildAngularCode(scope.servicename,scope.services[i].url,scope.services[i].sp,scope.services[i].params));
                     }
                    scope.factory =(scope.services!=undefined)?buildAngularCode(angularlines,scope.servicename,scope.restname):'';
              });
      }

    }
}]).directive('angularController',['dbService','buildServices',function(dbService,buildServices){
    return {
      restrict: 'E',
      scope: {
        services:'=',
        servicename:'=',
      },
      template:'<div ng-repeat="controller in controllers"><br/><code><textarea cols="135" rows="15" ng-model=controller></textarea></code><br/></div>',
      link: function(scope) {
        scope.controllers=[];

        scope.$watch('servicename', function(newValue,oldValue) {
              scope.controllers=[];
              for(var i in scope.services){
                  scope.controllers.push(buildServices.buildController(scope.services[i],scope.servicename));
              }

        });

        scope.$watch('services.length', function(newValue,oldValue) {
            scope.controllers=[];
            for(var i in scope.services){
                scope.controllers.push(buildServices.buildController(scope.services[i],scope.servicename));
              }
        });
      }

    }
}]).factory('dbService',[ '$http', '$q', function($http, $q){
  function consultaSpParams(sp){
      console.log("dbService :: consultaSpParams :: RUNNING");
        var deferred = $q.defer();

        // Limpia datos del contenedor
        // type : GET
        $http.get('../sp/info?spname='+sp)
           .then(function onSuccess(data){
             console.debug("dbService :: consultaSpParams :: SUCCESS");
            deferred.resolve(data.data);
          },function onError(error,status){
            console.error("dbService :: consultaSpParams :: ERROR");
             deferred.reject(error);
           });

    return deferred.promise;
    }

    return {
			consultaSpParams : consultaSpParams,
    }
}]).factory('buildServices',function(){
  function formatParameter(param){
    var spaces=new RegExp(' ','g');//expresion regular de espacio en blanco
    return param.toLowerCase().replace(spaces,'').replace('@','').replace('ño','nio').replace('ña','nia').replace('ñe','ne').replace('ñi','ni').replace('ñu','nu');
  }
  function isDatePresent(params){
    var present=false;
    for(var i in params){
      if(params[i].type==='date'){
        present=true;break;}
    }
    return present;
  }
 function isTimePresent(params){
    var present=false;
    for(var i in params){
      if(params[i].type==='time'){
        present=true;break;}
    }
    return present;
  }
  function getMethodName(url){
    var name=url.split('/');
    var comas=new RegExp(',','g');
    return name.join().replace(comas,'');
  }

  function addControllerParameter(param,i){
      var strConvertion='';

      var paramName=formatParameter(param.parameter);


      switch (param.type) {
        case "bit":
        strConvertion=paramName+' : ($scope.'+paramName+'!=null || $scope.'+paramName+'!=undefined)?'+'$scope.'+paramName+' : false,';
        break;
      case "char":
        strConvertion=paramName+' : ($scope.'+paramName+'!=null || $scope.'+paramName+'!=undefined)?'+'$scope.'+paramName+' : \'\',';
        break;
      case "date":
        strConvertion=paramName+' : ($scope.'+paramName+'!=null || $scope.'+paramName+'!=undefined)?'+'$scope.'+paramName+' : \'2000-01-01\',';
        break;
      case "decimal":
        strConvertion=paramName+' : ($scope.'+paramName+'!=null || $scope.'+paramName+'!=undefined)?'+'$scope.'+paramName+' : \'0.0\',';
        break;
      case "int":
        strConvertion=paramName+' : ($scope.'+paramName+'!=null || $scope.'+paramName+'!=undefined)?'+'$scope.'+paramName+' : 0,';
        break;
      case "smallint":
        strConvertion=paramName+' : ($scope.'+paramName+'!=null || $scope.'+paramName+'!=undefined)?'+'$scope.'+paramName+' : 0,';
        break;
      case "money":
        strConvertion=paramName+' : ($scope.'+paramName+'!=null || $scope.'+paramName+'!=undefined)?'+'$scope.'+paramName+' : \'0.0\',';
        break;
      case "numeric":
        strConvertion=paramName+' : ($scope.'+paramName+'!=null || $scope.'+paramName+'!=undefined)?'+'$scope.'+paramName+' : \'0.0\',';
        break;
      case "time":
        strConvertion=paramName+' : ($scope.'+paramName+'!=null || $scope.'+paramName+'!=undefined)?'+'$scope.'+paramName+' : \'00:00\',';
        break;
      case "varchar":
        strConvertion=paramName+' : ($scope.'+paramName+'!=null || $scope.'+paramName+'!=undefined)?'+'$scope.'+paramName+' : \'\',';
        break;
      default:
        console.debug('<< NO DATA TYPE FOUND >>');
        strConvertion+='<< NO FUE POSIBLE REALIZAR LA CONVERSION DEL PARAMETRO>>';
        break;

      }

      return strConvertion;
  }

  function addSqlParameterSource(param){
      var strConvertion='';

      var paramName=formatParameter(param.parameter);


      switch (param.type) {
        case "bit":
				strConvertion='.addValue("'+param.parameter.replace('@','')+'" , Boolean.valueOf(params.getParam("'+paramName+'")))';
				break;
			case "char":
				strConvertion='.addValue("'+param.parameter.replace('@','')+'" , params.getParam("'+paramName+'"))';
				break;
			case "date":
				strConvertion='.addValue("'+param.parameter.replace('@','')+'" , new java.sql.Date(fd.parse(params.getParam("'+paramName+'")).getTime()))';
				break;

			case "decimal":
				strConvertion='.addValue("'+param.parameter.replace('@','')+'" ,new java.math.BigDecimal(params.getParam("'+paramName+'")))';
				break;
			case "int":
			  strConvertion='.addValue("'+param.parameter.replace('@','')+'" , Integer.parseInt(params.getParam("'+paramName+'")))';
				break;
			case "smallint":
				strConvertion='.addValue("'+param.parameter.replace('@','')+'" , Short.parseShort(params.getParam("'+paramName+'")))';
				break;
			case "money":
				strConvertion='.addValue("'+param.parameter.replace('@','')+'" ,new java.math.BigDecimal(params.getParam("'+paramName+'")))';
				break;
			case "numeric":
        strConvertion='.addValue("'+param.parameter.replace('@','')+'" ,new java.math.BigDecimal(params.getParam("'+paramName+'")))';
				break;
			case "time":
				strConvertion='.addValue("'+param.parameter.replace('@','')+'" , new java.sql.Date(ft.parse(params.getParam("'+paramName+'")).getTime()))';
				// strConvertion="SimpleDateFormat sdf"+paramName+"=new SimpleDateFormat(\"HH:mm:ss\");"+//24 hour format
				// 			  "\r\n\tjava.util.Date mytime"+paramName+"= sdf"+paramName+".parse("+paramName+");"+
				// 			  "\r\n\tjava.sql.Time "+paramName+"2 = new java.sql.Time(mytime"+paramName+".getTime());";
				break;
			case "varchar":
				strConvertion='.addValue("'+param.parameter.replace('@','')+'" , params.getParam("'+paramName+'"))';
				break;
			default:
        console.debug('<< NO DATA TYPE FOUND >>');
				strConvertion+='<< NO FUE POSIBLE REALIZAR LA CONVERSION DEL PARAMETRO>>';
				break;

      }

      return strConvertion;
  }

  // <option value="t">Consulta tabla</option>
  // <option value="s">Consulta simple</option>
  // <option value="i">Inserción/actualización</option>


  function buildJavaService(restname,url,SPConstant,sp,params,type){
    var methodName=getMethodName(url);

    var queryRest='@RequestMapping(value="'+url+'",method=RequestMethod.POST)'+
						 '\r\npublic ResponseEntity<ParentVO> '+methodName+'(@Valid @RequestBody PldParams params) {'+
						 '\r\n	//SP: '+sp+
						 '\r\n	LOG.info("@Rest :: '+restname+' :: '+methodName+' :: {}",params);'+
						 '\r\n	ParentVO result=new ParentVO();';

      if(type=='t' || type=='s'  )//el table container solo se usa para consultas
        queryRest+='\r\nTableContainer container=contextUser.getCurrentContainer();';

			queryRest+='\r\n	try{';

    if(isDatePresent(params))
        queryRest+='\r\nSimpleDateFormat fd = new SimpleDateFormat("yyyy-MM-dd");\r\n';
    if(isTimePresent(params))
            queryRest+='\r\nSimpleDateFormat ft = new SimpleDateFormat("HH:mm:ss");\r\n';

    queryRest+='\r\n\tSqlParameterSource inParamMap = new MapSqlParameterSource()';

    for(var i in params){
      queryRest+='\r\n\t\t'+addSqlParameterSource(params[i]);
    }
    switch (type) {
      case 's'://simple
        queryRest+=';\r\n\r\n\tTableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.'+SPConstant+', inParamMap);'+
                  '\r\n\tcontainer.loadDataToContainer(params.getKeyTable(), table);'+
                  '\r\n\ttable.buildJson();'+
                  '\r\n\tresult=table;//aplicamos herencia para desplegar el resultado';
        break;
      case 'i'://insert,delete,update
        queryRest+=';\r\n\r\n\tresult=storedProcedure.queryforUpdateInsertDelete( ISentenciasSQL.'+SPConstant+', inParamMap);'+
                   '\r\n\tresult.getState().setMessage("Inserción exitosa");//cambiar leyenda en esta seccion si se desea otro mensaje'+
                   '\r\n\tresult.getState().setShow(true);//habilita la bandera para mostrar mensajes';
          break;
      case 'u'://insert,delete,update
        queryRest+=';\r\n\r\n\tresult=storedProcedure.queryforUpdateInsertDelete( ISentenciasSQL.'+SPConstant+', inParamMap);'+
                   '\r\n\tresult.getState().setMessage("Actualización exitosa");//cambiar leyenda en esta seccion si se desea otro mensaje'+
                   '\r\n\tresult.getState().setShow(true);//habilita la bandera para mostrar mensajes';
        break;
        case 'd'://insert,delete,update
          queryRest+=';\r\n\r\n\tresult=storedProcedure.queryforUpdateInsertDelete( ISentenciasSQL.'+SPConstant+', inParamMap);'+
                     '\r\n\tresult.getState().setMessage("Borrado exitoso");//cambiar leyenda en esta seccion si se desea otro mensaje'+
                     '\r\n\tresult.getState().setShow(true);//habilita la bandera para mostrar mensajes';
          break;
      default://case t table
      queryRest+=';\r\n\r\n\tTableVO table=storedProcedure.queryForTableVO( ISentenciasSQL.'+SPConstant+', inParamMap);'+
                  '\r\n\tcontainer.loadDataToContainer(params.getKeyTable(), table);'+
                  '\r\n\tresult.setState(table.getState());'+
                  '\r\n\tresult.setMessage(table.getMessage());';

    }

    queryRest+='\r\n\t}catch(ParamNotFoundException e){'+
            	'\r\n\t  LOG.info("@Rest :: '+restname+' :: '+methodName+' :: ParamNotFoudException :  {} \", e.getMessage());'+
            	'\r\n\t  result.getState().enabledErrorApp();'+
            	'\r\n\t  result.getState().setMessage("Parámetro inválido.");'+
              '\r\n\t  result.getMessage().setInfo(e.getMsgException());'+
            	'\r\n\t}catch(Exception e){'+
            	'\r\n\t  LOG.info("@Rest :: '+restname+' :: '+methodName+' :: Exception :  {} ", e.getMessage());'+
            	'\r\n\t  result.getState().enabledErrorApp();'+
              '\r\n\t  result.getState().setMessage("Error interno del servidor, se generó una excepción");'+
            	'\r\n\t  result.getMessage().setInfo(e.getMessage());'+
            	'\r\n\t}'+
            	'\r\n\treturn new ResponseEntity<ParentVO>(result, result.getState().getStatuCode());'+
            	'\r\n\r\n}\r\n';

    return queryRest;
    }

    function buildAngularCode(serviceName,url,sp,params){
      var methodName=getMethodName(url);

      var queryFactory='\r\nfunction '+methodName+'(';
      queryFactory+=(params.length>0)?'params':'';
      queryFactory+='){'+
  						 '\r\n\tconsole.log(\''+serviceName+' :: '+methodName+' :: RUNNING\');'+
               '\r\n\t var deferred=$q.defer();'+
  						 '\r\n\t //SP: '+sp+
               '\r\n\t //Type : POST'+
  						 '\r\n\r\n\t$http.post(context+\''+url+'\'';
      queryFactory+=(params.length>0)?',params':'';
      queryFactory+=')'+
  						 '\r\n\t.then(function onSuccess(data){'+
  						 '\r\n\t\tconsole.debug(\''+serviceName+' :: '+methodName+' :: SUCCESS\');'+
  						 '\r\n\t\tdeferred.resolve(data.data);'+
               '\r\n\t},function onError(data,status){'+
               '\r\n\t\tconsole.error(\''+serviceName+' :: '+methodName+' :: ERROR\');'+
               '\r\n\t\tconsole.debug("HTML STATUS: "+status);'+
               '\r\n\t\tconsole.error(data);'+
               '\r\n\t\t(status===0 || data.data==undefined)?deferred.reject(networkError):deferred.reject(data.data);'+
               '\r\n\t});\r\n'+
               '\r\n\treturn deferred.promise;'+
               '\r\n}';

      return queryFactory;
      }

    function buildReturnFactory(services){
      var ret='return {';

      for(var index in services){
        ret+='\r\n\t'+getMethodName(services[index].url)+' : '+getMethodName(services[index].url)+','
      }
      ret+='};';
      return ret;
    }


    function buildController(service,servicename){
      var controller='';
      if(service.operacion=='t'){
        controller='$scope.valuesTable.tableMessage.showAnimation=true;//se ingresa a la bandera interna de la animacion de la tabla'+
                      '\r\n$scope.valuesTable.tableMessage.state.show=false;//se oculta el mensaje de error interno de la tabla'+
                      '\r\n$scope.valuesTable.totalRows=0;//oculta la tabla'+
                      '\r\n\r\n\t//SP: '+service.sp+'\r\n';
      }else{
        controller='$scope.message.showAnimation=true;//se ingresa a la bandera interna de la animacion'+
                  '\r\n$scope.message.state.show=false;//se oculta el mensaje de error interno de la tabla'+
                  '\r\n\r\n\t//SP: '+service.sp+'\r\n';
      }
      if(service.params.length>0){
          switch (service.operacion) {
            case 'i':
                controller+='\r\nvar params={keyTable:\'insert\',params:{';
              break;
            case 'u':
                controller+='\r\nvar params={keyTable:\'update\',params:{';
              break;
            case 'd':
                controller+='\r\nvar params={keyTable:\'delete\',params:{';
              break;
            default://tabla dinamica y cosnulta simple --t
                controller+='\r\nvar params={keyTable:\''+service.constante+'\',params:{';
          }

          for(var i in service.params){
              controller+='\r\n\t'+addControllerParameter(service.params[i],i)
          }
          controller+='\r\n\t}};\r\n'+servicename+'.'+getMethodName(service.url)+'(params)';
      }else{
        controller+='\r\n'+servicename+'.'+getMethodName(service.url)+'()';
      }

      switch (service.operacion) {
        case 't':
          controller+='\r\n\t.then(function (tableVO) {'+
                    '\r\n\t  $scope.reloadTable=true;'+
                    '\r\n\t},function(parentVO){'+
                    '\r\n\t  $scope.valuesTable.tableMessage.showAnimation=false;'+
                    '\r\n\t  $scope.valuesTable.tableMessage=parentVO;'+
                    '\r\n\t});';
          break;
        case 's':
          controller+='\r\n\t.then(function (tableVO) {'+
                    '\r\n\t  $scope.message.showAnimation=false;'+
                    '\r\n\t  $scope.data=tableVO;'+
                    '\r\n\t},function(parentVO){'+
                    '\r\n\t  $scope.message.showAnimation=false;'+
                    '\r\n\t  $scope.message=parentVO;'+
                    '\r\n\t});';
          break;

        default://insert/update/delete son iguales
          controller+='\r\n\t.then(function (result) {'+
                    '\r\n\t  $scope.message.showAnimation=false;'+
                    '\r\n\t  $scope.message=result;'+
                    '\r\n\t},function(parentVO){'+
                    '\r\n\t  $scope.message.showAnimation=false;'+
                    '\r\n\t  $scope.message=parentVO;'+
                    '\r\n\t});';
        }

    return controller;
    };

    return {
			buildJavaService : buildJavaService,
      buildController : buildController,
      buildAngularCode : buildAngularCode,
      buildReturnFactory : buildReturnFactory

    }
});
