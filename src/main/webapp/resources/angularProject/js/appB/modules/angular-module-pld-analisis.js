/**
 * MUDULO ANALISIS PLATAFORMA DEX
 * 
 * Autor: 709870
 * 
 */

'use strict';
(function(){
    angular.module( 'pldModule.appA.Analisis', ['wcPldCommons','serviceSgvModuloAnalisis'])
    .controller('AnalisisVidaCtrl', ['$scope','settings','sgvModuloAnalisis','$stateParams','$state','pldModel',
        function (scope,settings,sgvModuloAnalisis,$stateParams,$state,pldModel) {
    	
    	
        console.info(pldModel);

        if(pldModel.valuesTable.totalRows==0 ){//la vista principal esta vacia, producto de un F5
            $state.go(pldModel.startMapping);//cuando se actualiza la pagina desde el detalle redirige a la ventana principal
        }



        scope.register = $stateParams.noCliente;
        
        scope.status=1;
        scope.tipoTabla='observaciones';
        scope.tab=1;
        scope.tabHeader='Observaciones';
        scope.tabHeader2=''

        scope.catEstatus=[{EstatusAnalisis:'Analizado',Descripcion:'Analizado'},{EstatusAnalisis:'Descartado',Descripcion:'Descartado'}];
        
        //------table1
        var tableParams={
            params:{},keyTable:''
        };
        scope.reloadTable=false;
        scope.messageConfiguration={
            state:{success:false,show:false,styleMessage:'',message:'',styleIcon:'',},                      
            showAnimation:false//muestra la animacion css
        };
        scope.tableData={
            headers:[],jsonResult:[],rowCount:0
        };
        scope.configTable={
            detalle:false,search:true, pages:true, excel:true,pagination:true,message:true,tableName:'Analisis-observaciones',
            filters:{FechadeMarcado:'date',Monto:'currency',MontoUSD:'currency'}
        };
        scope.valuesTable={
            tableMessage:{state:{success:false,show:false,styleMessage:'',message:'',styleIcon:''},
            showAnimation:false,},              
            headers  : [],
            registers : [],
            displayedPage : [],
            reverse  : false,
            paginated  : false,
            range        : [],
            pageSize     : 10,
            currentPage : 0,
            totalRows : 0,
            columnToOrder: '',
            searchText   : ''
        };
        
        //------table2
        var tableParams2={
            params:{},keyTable:''
        };
        scope.reloadTable2=false;
        scope.messageConfiguration2={
            state:{success:false,show:false,styleMessage:'',message:'',styleIcon:'',},                      
            showAnimation:false//muestra la animacion css
        }
        scope.tableData2={headers:[],jsonResult:[],rowCount:0};
        scope.configTable2={
            detalle:false,search:true, pages:true, excel:true,pagination:true,message:true,tableName:'Analisis-observaciones',
            filters:{FechadeMarcado:'date',Monto:'currency',MontoUSD:'currency'}
        };
        scope.valuesTable2={
            tableMessage:{state:{success:false,show:false,styleMessage:'',message:'',styleIcon:''},
            showAnimation:false,},              
            headers  : [],
            registers : [],
            displayedPage : [],
            reverse  : false,
            paginated  : false,
            range        : [],
            pageSize     : 10,
            currentPage : 0,
            totalRows : 0,
            columnToOrder: '',
            searchText   : ''
        };

        scope.messageDatosAnalisis={state : {success : false,show : false,styleMessage : '',message : '',styleIcon : ''},
                                            showAnimation : false,};
        
        
        scope.selectTab=function(tab){
                    
            if(tab!=undefined){
                scope.tab=tab;
            }

            scope.valuesTable2={
                tableMessage:{state:{success:false,show:false,styleMessage:'',message:'',styleIcon:''},
                showAnimation:false,},              
                headers  : [],
                registers : [],
                displayedPage : [],
                reverse  : false,
                paginated  : false,
                range        : [],
                pageSize     : 10,
                currentPage : 0,
                totalRows : 0,
                columnToOrder: '',
                searchText   : '',
            };
            
            scope.valuesTable1={
                tableMessage:{state:{success:false,show:false,styleMessage:'',message:'',styleIcon:''},
                showAnimation:false,},              
                headers  : [],
                registers : [],
                displayedPage : [],
                reverse  : false,
                paginated  : false,
                range        : [],
                pageSize     : 10,
                currentPage : 0,
                totalRows : 0,
                columnToOrder: '',
                searchText   : ''
            };

            scope.messageConfiguration.showAnimation=true;//muestra la animacion de "pld-message"
            scope.messageConfiguration.state.show=false;//oculta los mensajes del "pld-message"
            scope.tableData={headers:[],jsonResult:[],rowCount:0};//limpia los valores de la tabla
            
            scope.messageConfiguration2.showAnimation=true;//muestra la animacion de "pld-message"
            scope.messageConfiguration2.state.show=false;//oculta los mensajes del "pld-message"
            scope.tableData2={headers:[],jsonResult:[],rowCount:0};//limpia los valores de la tabla
            
            scope.messageDatosAnalisis.showAnimation = false;
            scope.messageDatosAnalisis.state.show=false;
            
        
        

            scope.tabHeader='';
            scope.tabHeader2='';
            
            scope.configTable.tableName='Analisis-observaciones'
            tableParams.params={nucliente:scope.register};

            switch (tab) {
            case 1:
                tableParams.keyTable='observaciones';
                scope.tipoTabla='observaciones';
                scope.tabHeader='Observaciones';
                scope.callSingleTable();
                break;
            case 2:
                tableParams.keyTable='reportesenviados';
                scope.tipoTabla='reportesenviados';
                scope.tabHeader='Reportes Enviados';
                scope.callSingleTable();
                break;
            case 3:
                tableParams.keyTable='coincidencialistanegra';
                scope.tipoTabla='coincidencialistanegra';
                scope.tabHeader='Listas Negras';
                
                tableParams2.params={nucliente:scope.register};
                tableParams2.keyTable='coincidenciapeps';
                scope.tipoTabla2='coincidenciapeps';        
                scope.tabHeader2='PEPS';
                
                scope.callDoubleTable()
                    
                break;
            case 4:
                tableParams.params={nucliente:scope.register};
                tableParams.keyTable='ultimos10pagos';
                scope.tipoTabla='ultimos10pagos';
                scope.tabHeader='Ultimos 10 Pagos';
                scope.callSingleTable();
                break;
            default:
                
                scope.tipoTabla='observaciones';
                scope.tabHeader='Observaciones';

                break;
            }
        
        }
                
        scope.callSingleTable = function (){
            sgvModuloAnalisis.ConsultaAnalisis(tableParams,settings,scope.tipoTabla)
            .then(function (tableVO) { 
                scope.tableData = tableVO;
                scope.messageConfiguration.showAnimation=false;
                scope.reloadTable=true;
            },function(parentVO){
                scope.messageConfiguration=parentVO;
                scope.messageConfiguration.showAnimation=false;//oculta la animación
                scope.reloadTable=true;
            });
        }

        scope.callDoubleTable = function (){
            //--call first table
            sgvModuloAnalisis.ConsultaAnalisis(tableParams,settings,scope.tipoTabla)
            .then(function (tableVO) { 
                scope.tableData = tableVO;
                scope.messageConfiguration.showAnimation=false;
                scope.reloadTable=true;
            },function(parentVO){
                scope.messageConfiguration=parentVO;
                scope.messageConfiguration.showAnimation=false;//oculta la animación
                scope.reloadTable=true;
            }).then(
                    //--call secon table
                    sgvModuloAnalisis.ConsultaAnalisis(tableParams2,settings,scope.tipoTabla2)
                    .then(function (tableVO) { 
                        scope.tableData2 = tableVO;
                        scope.messageConfiguration2.showAnimation=false;
                        scope.reloadTable2=true;
                    },function(parentVO){
                        scope.messageConfiguration2=parentVO;
                        scope.messageConfiguration2.showAnimation=false;//oculta la animación
                        scope.reloadTable2=true;
                    })
            );
        }
        
        scope.saveAnalisis=function(){
            scope.messageConfiguration.showAnimation=true;//muestra la animacion de "pld-message"
            scope.messageConfiguration.state.show=false;//oculta los mensajes del "pld-message"
            scope.tableData={headers:[],jsonResult:[],rowCount:0};//limpia los valores de la tabla
            
            scope.messageDatosAnalisis.state.show=false;
            scope.messageDatosAnalisis.showAnimation=true;

            // consulta que recupera los datos del cliente
            var analisis={

                nuCliente         :scope.register, 
                resultadoAnalisis :scope.status,
                observaciones     :scope.observaciones,
                idUsuario         :'',
                nombreUsuario     :''
                }
            
            sgvModuloAnalisis.NuevoAnalisis(analisis,settings)
                .then(function(success){
                    
                    scope.selectTab(1);

                    scope.messageDatosAnalisis.showAnimation=false;
                    scope.messageDatosAnalisis=success;
                    scope.messageDatosAnalisis.state.show=true;

                    
                    scope.observaciones='';
                },function(fail){
                    scope.messageConfiguration.showAnimation=false;
                    scope.messageConfiguration=fail;
                });
        }

        scope.selectTab(1);//realiza el llamado a las observaciones por default
        
    }]);
        		
})();