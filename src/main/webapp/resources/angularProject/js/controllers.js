// =========================================================================
// CONTROLLER APP
// =========================================================================


//var jQuery=require('jquery');

'use strict';

//var angular=require('angular');
//var ActivityMonitor=require('angular-activity-monitor');
//var ngDialog=require('ng-dialog');

(function(){
angular.module('pldController', ['ActivityMonitor','pldServices','ngDialog'])
	.controller('BlankonCtrl', ['$scope','$rootScope','$http','pldService','ActivityMonitor','$state','ngDialog','$timeout',function($scope,$rootScope, $http,pldService,ActivityMonitor,$state,ngDialog,$timeout) {
    	var self=this;
    	//variable que almacena el modulo de tools activo.
    	$scope.idModuloActual=0;

        // =========================================================================
        // SUPPORT IE
        // =========================================================================
        $scope.supportIE = function () {
            // IE mode
            var isIE8 = false;
            var isIE9 = false;
            var isIE10 = false;

            // initializes main settings for IE
            isIE8 = !! navigator.userAgent.match(/MSIE 8.0/);
            isIE9 = !! navigator.userAgent.match(/MSIE 9.0/);
            isIE10 = !! navigator.userAgent.match(/MSIE 10.0/);

            if (isIE10) {
                $('html').addClass('ie10'); // detect IE10 version
            }

            if (isIE10 || isIE9 || isIE8) {
                $('html').addClass('ie'); // detect IE8, IE9, IE10 version
            }

            // Fix input placeholder issue for IE8 and IE9
            if (isIE8 || isIE9) { // ie8 & ie9
                $('input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)').each(function () {
                    var input = $(this);

                    if (input.val() == '' && input.attr("placeholder") != '') {
                        input.addClass("placeholder").val(input.attr('placeholder'));
                    }

                    input.focus(function () {
                        if (input.val() == input.attr('placeholder')) {
                            input.val('');
                        }
                    });

                    input.blur(function () {
                        if (input.val() == '' || input.val() == input.attr('placeholder')) {
                            input.val(input.attr('placeholder'));
                        }
                    });
                });
            }
        };
      //=========================================================================
        //  CONSULTA DE NOTIFICACIONES SISTEMA
        //=========================================================================

      //-- obtenemos las notificaciones del sistema para todos los usuarios
    	pldService.ConsultaNotificaciones().then(function(data) {
    		$rootScope.alertsSystem=data.jsonResult;

		},function(parentVO){//Cuando la consulta es fallida recuperamos un ParentVO
			$rootScope.alertsSystem=[{Icono:'exclamation-triangle',Mensaje:'Error en la consulta de notificaciones.'}];

			if(parentVO.state!=undefined){
				$rootScope.alertsSystem.push({Icono:'exclamation-triangle',Mensaje:parentVO.state.message});
			}
			if(parentVO.message!=undefined){
				$rootScope.alertsSystem.push({Icono:'exclamation-triangle',Mensaje:parentVO.message.info});
			}
	    });


        //=========================================================================
        //  MANEJO DE MENUS DE NAVEGACION
        //=========================================================================
    	//actualiza el menu activo para la asignacion de tools
        //mantiene activo el mmenu seleccionado
    	 $scope.pldTittle = { pageTitle: "PLD | Seguros",pageHeader: {icon: "fa fa-home",title: "Inicio",subtitle: "",}};

    	 //Carga inicialmente el tutilo en la pantalla principal si hay un F5 recarga los valores desde el Backend
    	 pldService.ActualizaModuloActivo($scope.idModuloActual)
		 	.then(function(data){
		 		$scope.pldTittle=data;
		 		$scope.breadcrumbs=[{title:data.pageHeader.title, state:data.pageHeader.mapping.trim()},{title: data.pageHeader.subtitle,state:data.pageHeader.mapping.trim()}];
		 	},function(fail){
		 		 $scope.pldTittle = { pageTitle: "PLD | Seguros",pageHeader: {icon: "fa fa-home",title: "Inicio",subtitle: "",}};
		 	});


        $scope.cambiaBackground=function(moduloActual,mapeo){

             $('.sidebar-selected-item').removeClass('sidebar-selected-item');
             $('#'+moduloActual).addClass("sidebar-selected-item");
        	 if($scope.idModuloActual!=parseInt(moduloActual)){
        		 $scope.idModuloActual=parseInt(moduloActual);

        		pldService.ActualizaModuloActivo(moduloActual)
     		 	.then(function(data){
     		 		$scope.pldTittle=data;
     		 	},function(fail){
     		 		 $scope.pldTittle = { pageTitle: "PLD | Error",pageHeader: {icon: "fa fa-warning",title: "Error en carga de titulo",subtitle: fail.state.message,}};
     		 	});

        		 console.debug('redirecting to : '+mapeo.trim());
            	 $state.go(mapeo.trim());
        	 }

        }


        // =========================================================================
        // COOKIE SIDEBAR MINIMIZE
        // =========================================================================
        $scope.cookieSidebarMinimize = function () {

        	if(!$("body").hasClass("page-sidebar-minimize"))
        		$('body').addClass('active page-sidebar-minimize');
        	else
        		$("body").removeClass("page-sidebar-minimize");
        };


        // =========================================================================
        // SOUND PAGE
        // =========================================================================
//        $scope.soundPage = function () {
//            // Sounds setting
//            if($('.page-sound').length){
//                ion.sound({
//                    sounds: [
//                        {name: "beer_can_opening"},
//                        {name: "bell_ring", volume: 0.6},
//                        {name: "branch_break", volume: 0.3},
//                        {name: "button_click"},
//                        {name: "button_click_on"},
//                        {name: "button_push"},
//                        {name: "button_tiny", volume: 0.6},
//                        {name: "camera_flashing"},
//                        {name: "camera_flashing_2", volume: 0.6},
//                        {name: "cd_tray", volume: 0.6},
//                        {name: "computer_error"},
//                        {name: "door_bell"},
//                        {name: "door_bump", volume: 0.3},
//                        {name: "glass"},
//                        {name: "keyboard_desk"},
//                        {name: "light_bulb_breaking", volume: 0.6},
//                        {name: "metal_plate"},
//                        {name: "metal_plate_2"},
//                        {name: "pop_cork"},
//                        {name: "snap"},
//                        {name: "staple_gun"},
//                        {name: "tap", volume: 0.6},
//                        {name: "water_droplet"},
//                        {name: "water_droplet_2"},
//                        {name: "water_droplet_3", volume: 0.6}
//                    ],
//                    path: settings.pluginPath +"/ionsound/sounds/",
//                    preload: true
//                });
//
//                // Add effect sound water droplet type 3
//                $('.dropdown-toggle').on('click', function(){
//                    ion.sound.play("water_droplet_3");
//                });
//
//            }
//        };

        // =========================================================================
        // TOOLTIP
        // =========================================================================
        $scope.tooltip = function () {
            if($('[data-toggle=tooltip]').length){
                $('[data-toggle=tooltip]').tooltip({
                    animation: 'fade'
                });
            }
        };

        // =========================================================================
        // POPOVER
        // =========================================================================
        $scope.popover = function () {
            if($('[data-toggle=popover]').length){
                $('[data-toggle=popover]').popover();
            }
        };

        // =========================================================================
        // NAVBAR MESSAGES
        // =========================================================================
        $scope.navbarMessages = [];
        /*$http.get(settings.dataPath+'/partials/header/navbar-messages.json') // Simple GET request example :
            .success(function(data) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.navbarMessages = data;
            })
            .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });*/

        // =========================================================================
        // NAVBAR NOTIFICATIONS
        // =========================================================================
        $scope.navbarNotifications = [];
        /*$http.get(settings.dataPath+'/partials/header/navbar-notifications.json') // Simple GET request example :
            .success(function(data) {
                $scope.navbarNotifications = data;
            })
            .error(function(data, status, headers, config) {
                // Error actions
            });*/

        // =========================================================================
        // SIDEBAR RIGHT (PROFILE TAB)
        // =========================================================================
        $scope.profile = [];
        /*$http.get(settings.dataPath+'/partials/sidebar-right/profile.json') // Simple GET request example :
            .success(function(data) {
                $scope.profile = data;
            })
            .error(function(data, status, headers, config) {
                // Error actions
            });*/

        // =========================================================================
        // SIDEBAR RIGHT (PROFILE TAB)
        // =========================================================================
        $scope.chats = [];
        /*$http.get(settings.dataPath+'/partials/sidebar-right/chat.json') // Simple GET request example :
            .success(function(data) {
                $scope.chats = data;
            })
            .error(function(data, status, headers, config) {
                // Error actions
            });*/

        // =========================================================================
        // LOG EVENTS
        // =========================================================================
        // Log view event module loaded
//        $scope.$on('ocLazyLoad.moduleLoaded', function(e, params) {
//            console.log('event module loaded', params);
//        });
//
//        // Log view event component loaded
//        $scope.$on('ocLazyLoad.componentLoaded', function(e, params) {
//            console.log('event component loaded', params);
//        });
//
//        // Log view event file loaded
//        $scope.$on('ocLazyLoad.fileLoaded', function(e, file) {
//            console.log('event file loaded', file);
//        });
//
//    	$scope.$on('$viewContentLoaded', function(event, viewName, viewContent){
//  	  	});
//
//
//    	  /*
//         * Se activa la funcion de acordeon en el menu
//         */
//    	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
//    		// MINIMIZE
//            //$scope.cookieSidebarMinimize = function () {
//            	//console.info("ya cargo el acordeon");
//
//            //};
//          });


        $scope.active = true;
    	$scope.initSessionMonitor=function (){
    	  /* * */
      	  var vm = self;
	      var timeout =900;// 15 minutos de inactividad
	      var interval;
	      vm.countdown = timeout;
	      var countdownStop;

	      /* demo defaults */
	      ActivityMonitor.options.inactive = timeout;
	      ActivityMonitor.options.monitor = 0.1;
	      ActivityMonitor.options.warning = 0;


	        vm.countdown = timeout;
	        ActivityMonitor.off('inactive');
	        ActivityMonitor.off('activity');

	        /*Lanza mensaje de cierre de sesion*/
	          ActivityMonitor.on('inactive', function() {
		        	ngDialog.openConfirm({
		        	    template:'<div><div class="modal fade in" id="session-timeout-dialog" style="display: block; padding-right: 17px;" ng-init="start()">'+
		                    '<div class="modal-dialog">'+
		                    '<div class="modal-content">'+
		                    '<div class="modal-header">'+
		                    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
		                    '<h4 class="modal-title">Tu sesión esta por expirar !</h4></div>'+
		                    '<div class="modal-body"><p>Tu sesion se inhabilitara despues de {{counter}} segundos sin actividad</p></div>'+
		                    '<div class="modal-footer"><button id="session-timeout-dialog-logout" ng-click="confirm(salir)" type="button" class="btn btn-default">Salir</button>'+
		                    '<button id="session-timeout-dialog-keepalive" type="button" ng-click="stop();closeThisDialog();" class="btn btn-primary" data-dismiss="modal">Seguir conectado</button></div></div></div></div></div>',
		        	    plain:true,
		        	    controller: ['$scope','$timeout',function($scope,$timeout) {
		        	    	$scope.start = function() {// arranca el proceso
		        	    	    $scope.active = true;
		        	    	    $scope.counter=60;
		        	    	    $scope.countdown();
		        	    	};

		        	    	$scope.countdown = function () {//timer verificador
		        	    	    countdownStop = $timeout(function () {
		        	    	        if ($scope.counter == 0) {
		        	    	        	window.location = './salir';
		        	    	        }
		        	    	        else {
		        	    	            if ($scope.active) {
		        	    	                $scope.counter--;
		        	    	                $scope.countdown();
		        	    	            }
		        	    	        }
		        	    	    }, 1000);
		        	    	};

		        	    	$scope.stop = function () {// detiene el contador
		        	    	    $timeout.cancel(countdownStop);
		        	    	}

		        	    }]
		        	}).then(function (value) {//El usuario decide salir.
		        		window.location = './salir';
	                }, function (value) {//El usuario continua en la sesion
	                	pldService.ActualizaModuloActivo(0);//cuando se envia cero no actualiza el modulo en el BACKEND
	                	$scope.initSessionMonitor();
	                });

	        	});

	          /*Reinicia el conteo de inactividad*/
		        ActivityMonitor.on('activity', function() {
		          vm.countdown = timeout;
		        });
	        /***/
    	}

    	$scope.$on('$viewContentLoaded', function() {
    	 $scope.initSessionMonitor();
    	 //$scope.scrollTable();
    	});

    	 $scope.showHideMenuOption=function(elemento) {
    		 if($('#'+elemento).hasClass('active')){
    			 $('.sidebar-menu>li').removeClass("active");
        		 $('.sidebar-menu>li > ul > li').removeClass("active");
    			 $('#'+elemento).removeClass('active');
    			 angular.forEach($('#'+elemento).parents(),function(elem){ $(elem).removeClass("active") });
    		 }else{
    			 $('.sidebar-menu>li').removeClass("active");
        		 $('.sidebar-menu>li > ul > li').removeClass("active");
    			 $('#'+elemento).addClass('active');
    			 angular.forEach($('#'+elemento).parents(),function(elem){ $(elem).addClass("active")});
    		 }
    		 $scope.pldTittle = { pageTitle: "PLD | Inicio",pageHeader: {icon: "fa fa-home",title: "Inicio",subtitle: "",}};
    		//pldService.ActualizaModuloActivo(0,settings);

         };

         $scope.scrollTable = function(){
        	 $(document).ready(function() {
        			//$("#tablaEnvian").niceScroll({
        			$("div.panel-body>div.row").niceScroll({
        				cursorcolor : "#00F"
        			});
        		});
         }
         //varible en el scope para la ubicacion del footer, side-bar y headers
        $scope.partialsPath=$rootScope.settings.partialsPath;
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        $scope.supportIE(); // Call cookie sidebar minimize
        //$scope.cookieSidebarMinimize(); // Call cookie sidebar minimize
        //$scope.soundPage(); // Call sound page
        $scope.tooltip(); // Call tooltip
        $scope.popover(); // Call popover
    }]).filter('nospace', function () {
        return function (value) {
            return (!value) ? '' : value.replace(/ /g, '');
        };
    }).filter('nopoint', function () {
        return function (value) {
            return (!value) ? '' : value.split('.').join('').replace(/ /g, '');
        };
    });
})();
