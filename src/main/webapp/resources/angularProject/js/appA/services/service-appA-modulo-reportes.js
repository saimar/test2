/**
* Service para las operaciones del modulo Reportes
*/
(function(){
  angular.module('serviceAppAModuloReportes',[])
  .factory('appAModuloReportes',[ '$http', '$q', '$filter', function($http, $q, $filter) {
    //variable para manejo de errores
    var networkError={state:{success:false, show:true, message:'Error de conexión', styleMessage:'alert-danger', styleIcon:'fa fa-frown-o',},
    message:{show:false,	style:'message-info',info:'Error de conexión, es posible que no este conectado a la red o que el servidor no se encuentre disponible momentaneamente',}
  }
  //cvariable recuperada del Index y que agrega el contexto de la aplicacion.
  var context=url+'/restAppAModuloReportes';

  function consultaTiposReporte(catalogo){
    console.log('appAModuloReportes :: consultaDatosReporte :: RUNNING');
    var deferred = $q.defer();

    var cat=(catalogo==undefined || catalogo==null)?'':catalogo;
    // SP : SEGD_ConsultaCatTiposDeReporte
    // type : GET
    $http.get(context+'/consulta/tiposReporte?catalogo='+catalogo)
    .then(function onSuccess(data){
      console.debug('appAModuloReportes :: consultaTiposReporte :: SUCCESS');
      //console.log('data on service.');
      //console.log(data);
      deferred.resolve(data.data);
    },function onError(data,status){
      console.error('appAModuloReportes :: consultaTiposReporte :: ERROR');
      console.debug("HTML STATUS: "+status);
      if(status===0 || data.data==undefined){
        console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
        deferred.reject(networkError);
      }else{
        console.error(data);
        deferred.reject(data.data);}
      });

      return deferred.promise;
    }

    function consultaTrimestres(){
      console.log('appAModuloReportes :: consultaTrimestres :: RUNNING');
      var deferred = $q.defer();

      // SP : SEGD_ConsultaCatTrimestres
      // type : GET
      $http.get(context+'/consulta/Trimestres')
      .then(function onSuccess(data){
        console.debug('appAModuloReportes :: consultaTrimestres :: SUCCESS');
        deferred.resolve(data.data);
      },function onError(data,status){
        console.error('appAModuloReportes :: consultaTrimestres :: ERROR');
        console.debug("HTML STATUS: "+status);
        if(status===0 || data.data==undefined){
          console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
          deferred.reject(networkError);
        }else{
          console.error(data);
          deferred.reject(data.data);}
        });

        return deferred.promise;
      }

      function consultaReportado(movimiento){
        console.log('appAModuloReportes :: consultaReportado :: RUNNING');
        var deferred = $q.defer();

        var mov=(movimiento==undefined || movimiento==null)?'0':movimiento;
        // SP : SEGD_ConsultaSiMovimientoReportado
        // type : GET
        $http.get(context+'/consulta/Reportado?movimiento='+mov)
        .then(function onSuccess(data){
          console.debug('appAModuloReportes :: consultaReportado :: SUCCESS');
          deferred.resolve(data.data);
        },function onError(data,status){
          console.error('appAModuloReportes :: consultaReportado :: ERROR');
          console.debug("HTML STATUS: "+status);
          if(status===0 || data.data==undefined){
            console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
            deferred.reject(networkError);
          }else{
            console.error(data);
            deferred.reject(data.data);}
          });

          return deferred.promise;
        }

        function cargaSeleccionados(reportParams){
          console.log('appAModuloReportes :: cargaSeleccionados :: RUNNING');
          var deferred = $q.defer();

          // SP : SEGD_GeneraReporte
          // type : POST
          $http.post(context+'/carga/Seleccionados',reportParams)
          .then(function onSuccess(data){
            console.debug('appAModuloReportes :: cargaSeleccionados :: SUCCESS');
            deferred.resolve(data.data);
          },function onError(data,status){
            console.error('appAModuloReportes :: cargaSeleccionados :: ERROR');
            console.debug("HTML STATUS: "+status);
            if(status===0 || data.data==undefined){
              console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
              deferred.reject(networkError);
            }else{
              console.error(data);
              deferred.reject(data.data);}
            });

            return deferred.promise;
          }

          function consultaDatosReporte(tableparams){
            console.log('appAModuloReportes :: consultaDatosReporte :: RUNNING');
            var deferred = $q.defer();

            // SP : SEGD_ConsultaDatosParaReporte
            // type : POST
            $http.post(context+'/consulta/DatosReporte',tableparams)
            .then(function onSuccess(data){
              console.debug('appAModuloReportes :: consultaDatosReporte :: SUCCESS');
              deferred.resolve(data.data);
            },function onError(data,status){
              console.error('appAModuloReportes :: consultaDatosReporte :: ERROR');
              console.debug("HTML STATUS: "+status);
              if(status===0 || data.data==undefined){
                console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                deferred.reject(networkError);
              }else{
                console.error(data);
                deferred.reject(data.data);}
              });
              return deferred.promise;
            }


            function generaReporteManual(tableparams){
              console.log('appAModuloReportes :: generaReporteManual :: RUNNING');
              var deferred = $q.defer();

              // SP : SEGD_GuardaMovimientoReporte
              // type : POST
              $http.post(context+'/genera/ReporteManual',tableparams)
              .then(function onSuccess(data){
                console.debug('appAModuloReportes :: generaReporteManual :: SUCCESS');
                deferred.resolve(data.data);
              },function onError(data,status){
                console.error('appAModuloReportes :: generaReporteManual :: ERROR');
                console.debug("HTML STATUS: "+status);
                if(status===0 || data.data==undefined){
                  console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                  deferred.reject(networkError);
                }else{
                  console.error(data);
                  deferred.reject(data.data);}
                });

                return deferred.promise;
              }

              function consultaMovimientosReportados(tableparams){
                console.log('appAModuloReportes :: consultaMovimientosReportados :: RUNNING');
                var deferred = $q.defer();

                // SP : SEGD_ConsultaMovReportados
                // type : POST
                $http.post(context+'/consulta/MovimientosReportados',tableparams)
                .then(function onSuccess(data){
                  console.debug('appAModuloReportes :: consultaMovimientosReportados :: SUCCESS');
                  deferred.resolve(data.data);
                },function onError(data,status){
                  console.error('appAModuloReportes :: consultaMovimientosReportados :: ERROR');
                  console.debug("HTML STATUS: "+status);
                  if(status===0 || data.data==undefined){
                    console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                    deferred.reject(networkError);
                  }else{
                    console.error(data);
                    deferred.reject(data.data);}
                  });

                  return deferred.promise;
                }


                function consultaReportes(tableparams){
                  console.log('appAModuloReportes :: consultaReportes :: RUNNING');
                  var deferred = $q.defer();

                  // SP : SEGD_ConsultaReportes
                  // type : POST
                  $http.post(context+'/consulta/Reportes',tableparams)
                  .then(function onSuccess(data){
                    console.debug('appAModuloReportes :: consultaReportes :: SUCCESS');
                    deferred.resolve(data.data);
                  },function onError(data,status){
                    console.error('appAModuloReportes :: consultaReportes :: ERROR');
                    console.debug("HTML STATUS: "+status);
                    if(status===0 || data.data==undefined){
                      console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                      deferred.reject(networkError);
                    }else{
                      console.error(data);
                      deferred.reject(data.data);}
                    });

                    return deferred.promise;
                  }

                  function descartaReporte(report){
                    console.log('appAModuloReportes :: descartaReporte :: RUNNING');
                    var deferred = $q.defer();

                    // SP : SEGD_EliminaReporte
                    // type : POST
                    $http.post(context+'/descarta/Reporte',report)
                    .then(function onSuccess(data){
                      console.debug('appAModuloReportes :: descartaReporte :: SUCCESS');
                      deferred.resolve(data.data);
                    },function onError(data,status){
                      console.error('appAModuloReportes :: descartaReporte :: ERROR');
                      console.debug("HTML STATUS: "+status);
                      if(status===0 || data.data==undefined){
                        console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                        deferred.reject(networkError);
                      }else{
                        console.error(data);
                        deferred.reject(data.data);}
                      });

                      return deferred.promise;
                    }


                    function detalleReportes(tableparams){
                      console.log('appAModuloReportes :: detalleReportes :: RUNNING');
                      var deferred = $q.defer();

                      // SP : SEGD_ConsultaReportesDetalle
                      // type : POST
                      $http.post(context+'/detalle/Reportes',tableparams)
                      .then(function onSuccess(data){
                        console.debug('appAModuloReportes :: detalleReportes :: SUCCESS');
                        deferred.resolve(data.data);
                      },function onError(data,status){
                        console.error('appAModuloReportes :: detalleReportes :: ERROR');
                        console.debug("HTML STATUS: "+status);
                        if(status===0 || data.data==undefined){
                          console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                          deferred.reject(networkError);
                        }else{
                          console.error(data);
                          deferred.reject(data.data);}
                        });

                        return deferred.promise;
                      }


                      function consultaReportesHistorial(tableparams){
                        console.log('appAModuloReportes :: consultaReportesHistorial :: RUNNING');
                        var deferred = $q.defer();

                        // SP : SEGD_ConsultaReportesHistorial
                        // type : POST
                        $http.post(context+'/consulta/ReportesHistorial',tableparams)
                        .then(function onSuccess(data){
                          console.debug('appAModuloReportes :: consultaReportesHistorial :: SUCCESS');
                          deferred.resolve(data.data);
                        },function onError(data,status){
                          console.error('appAModuloReportes :: consultaReportesHistorial :: ERROR');
                          console.debug("HTML STATUS: "+status);
                          if(status===0 || data.data==undefined){
                            console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                            deferred.reject(networkError);
                          }else{
                            console.error(data);
                            deferred.reject(data.data);}
                          });

                          return deferred.promise;
                        }


                        function detalleReportesHistorial(tableparams){
                          console.log('appAModuloReportes :: detalleReportesHistorial :: RUNNING');
                          var deferred = $q.defer();

                          // SP : SEGD_ConsultaReportesHistorialDetalle
                          // type : POST
                          $http.post(context+'/detalle/ReportesHistorial',tableparams)
                          .then(function onSuccess(data){
                            console.debug('appAModuloReportes :: detalleReportesHistorial :: SUCCESS');
                            deferred.resolve(data.data);
                          },function onError(data,status){
                            console.error('appAModuloReportes :: detalleReportesHistorial :: ERROR');
                            console.debug("HTML STATUS: "+status);
                            if(status===0 || data.data==undefined){
                              console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                              deferred.reject(networkError);
                            }else{
                              console.error(data);
                              deferred.reject(data.data);}
                            });
                            return deferred.promise;
                          }


                          function consultaDescargaReportes(tableparams){
                            console.log('appAModuloReportes :: consultaDescargaReportes :: RUNNING');
                            var deferred = $q.defer();

                            // SP : SEGD_ConsultaReportesDescarga
                            // type : POST
                            $http.post(context+'/consulta/DescargaReportes',tableparams)
                            .then(function onSuccess(data){
                              console.debug('appAModuloReportes :: consultaDescargaReportes :: SUCCESS');
                              deferred.resolve(data.data);
                            },function onError(data,status){
                              console.error('appAModuloReportes :: consultaDescargaReportes :: ERROR');
                              console.debug("HTML STATUS: "+status);
                              if(status===0 || data.data==undefined){
                                console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                                deferred.reject(networkError);
                              }else{
                                console.error(data);
                                deferred.reject(data.data);}
                              });

                              return deferred.promise;
                            }


                            function consultaHistorialExcel(tableparams){
                              console.log('appAModuloReportes :: consultaHistorialExcel :: RUNNING');
                              var deferred = $q.defer();

                              // SP : SEGD_ReportesHistorialExcel
                              // type : POST
                              $http.post(context+'/consulta/HistorialExcel',tableparams)
                              .then(function onSuccess(data){
                                console.debug('appAModuloReportes :: consultaHistorialExcel :: SUCCESS');
                                deferred.resolve(data.data);
                              },function onError(data,status){
                                console.error('appAModuloReportes :: consultaHistorialExcel :: ERROR');
                                console.debug("HTML STATUS: "+status);
                                if(status===0 || data.data==undefined){
                                  console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                                  deferred.reject(networkError);
                                }else{
                                  console.error(data);
                                  deferred.reject(data.data);}
                                });
                                return deferred.promise;
                              }



                              function respaldaReporte(tableparams){
                                console.log('appAModuloReportes :: respaldaReporte :: RUNNING');
                                var deferred = $q.defer();

                                // SP : SEGD_RespaldaReporte
                                // type : POST
                                $http.post(context+'/respalda/RespaldaReportes',tableparams)
                                .then(function onSuccess(data){
                                  console.debug('appAModuloReportes :: respaldaReporte :: SUCCESS');
                                  deferred.resolve(data.data);
                                },function onError(data,status){
                                  console.error('appAModuloReportes :: respaldaReporte :: ERROR');
                                  console.debug("HTML STATUS: "+status);
                                  if(status===0 || data.data==undefined){
                                    console.debug('Error de conexión, es posible que no este conectado a la red o que el servidor no este disponible momentaneamente');
                                    deferred.reject(networkError);
                                  }else{
                                    console.error(data);
                                    deferred.reject(data.data);}
                                  });
                                  return deferred.promise;
                                }



	return {
		consultaTiposReporte : consultaTiposReporte,
	  consultaTrimestres : consultaTrimestres,
		consultaReportado : consultaReportado,
		cargaSeleccionados : cargaSeleccionados,
		consultaDatosReporte : consultaDatosReporte,
	  generaReporteManual : generaReporteManual,
		descartaReporte : descartaReporte,
		consultaMovimientosReportados : consultaMovimientosReportados,
		consultaReportes : consultaReportes,
		detalleReportes : detalleReportes,
		consultaReportesHistorial : consultaReportesHistorial,
		detalleReportesHistorial : detalleReportesHistorial,
		consultaDescargaReportes : consultaDescargaReportes,
		consultaHistorialExcel : consultaHistorialExcel,
		respaldaReporte : respaldaReporte,
	};

	}]);
})()
