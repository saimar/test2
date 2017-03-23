// =========================================================================
// CONFIGURATION ROUTE
// =========================================================================

'use strict';
require('./dashboard.js')
require('./appA/modules/monitoreo/operRelevantesDanios.js')
angular.module('pldConfig', ['pldServices','pldApp.dashboard'])



.factory('table', ['$rootScope', function($rootScope ) {

	var defaultValues={
            rule : 1,
            startMapping :'',
            report:{
                idMovimiento:undefined,
                idCliente:undefined,
                reported:false
            },
            valuesTable : {
                tableMessage : {
                    state : {
                        success : false,
                        show : false,
                        styleMessage : '',
                        message : '',
                        styleIcon : ''
                    },
                    showAnimation : false
                },
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
                searchText : ''
            },
            valuesDetalle : {
                tableMessage : {
                    state : {
                        success : false,
                        show : false,
                        styleMessage : '',
                        message : '',
                        styleIcon : ''
                    },
                    showAnimation : false
                },
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
                searchText : ''},

	};
	return {
	    valuesDefault : function(addedValues) {
	      return $.extend(JSON.parse(JSON.stringify(defaultValues)),addedValues);
	    }
	}

	}])
    // Setup global settings
    .factory('settings', ['$rootScope','pldService', function($rootScope,pldService) {

    	var jsonTree=jQuery.parseJSON(tree);
        var baseURL = url+'/resources/angularProject';//(window.location.href).replace(/^[^\/]+\/\/[^\/]+/,'').replace(/\/production\/admin\/.*$/,''), // Setting base url app
        var  settings = {
        		context                 : url,
                baseURL                 : baseURL,
                pluginPath              : baseURL+'/plugins/pld',
                imagePath         	    : baseURL+'/img',
                cssPath                 : baseURL+'/css',
                dataPath                : baseURL+'/data',
                viewPath              	: baseURL+'/views',
                partialsPath            : baseURL+'/partials',
                jsPath             		: baseURL+'/js',
                centroMonitoreoPath		: url+'/resources/centroMonitoreo',
                user					: user,
                userName				: userName,
                tree					: jsonTree,
        };

        $rootScope.settings = settings;
        return settings;
	}])

	//Configuracion del menu de navegación--breadcrumbs
    .config(['$breadcrumbProvider',function($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            prefixStateName: 'dashboard',
            template: 'bootstrap3',
            includeAbstract:true
        });
    }])

		 // Configuration angular loading bar- SOLO NECESARIA SI SE USA LAZY-LOAD
   .config(['cfpLoadingBarProvider',function(cfpLoadingBarProvider) {
		 cfpLoadingBarProvider.includeSpinner = true;

   }])


    // Configuracion inicial de rutas aplicacion
    .config(['$stateProvider','$locationProvider','$urlRouterProvider',function($stateProvider, $locationProvider, $urlRouterProvider) {
        // Redirect any unmatched url
        $urlRouterProvider.otherwise('dashboard');


        $stateProvider

        // =========================================================================
        // DASHBOARD
        // =========================================================================
        .state('dashboard', {
            url: '/dashboard',
            //template:'<h1>Dashboard</h1>',
            templateUrl: 'resources/angularProject/views/dashboard.jsp',
            data: {
                pageTitle: 'Inicio',
            },
            controller: 'DashboardCtrl',
            ncyBreadcrumb: {
                label: 'Inicio'
            },
           resolve: {
               deps: ['$ocLazyLoad', 'settings', function($ocLazyLoad, settings, pldMenu) {
                   ///COMPONENETS ADICIONALES DEL CENTRO DE MONITOREO
                   return $ocLazyLoad.load( // you can lazy load files for an existing module
                       [
                           {
                               insertBefore: '#load_css_before',
                               files: [
                                   settings.centroMonitoreoPath+'/css/app-2.css',
                                   settings.centroMonitoreoPath+'/css/maps/jquery-jvectormap-2.0.1.css',
                                   settings.centroMonitoreoPath+'/css/components/mapas.css',
                                   settings.centroMonitoreoPath+'/css/style.css',
                                   //settings.centroMonitoreoPath+'/css/cifrasControl.css',
                                   settings.centroMonitoreoPath+'/css/chartjs/chartist.min.css',
                                   //settings.centroMonitoreoPath+'/css/HoverMaster/css/hover.css',
                               ]
                           },
                           {
                               name: 'pldApp.dashboard',
                               files: [
                                   settings.pluginPath+'/jquery-easing-original/jquery.easing.1.3.min.js',//se ocupa en grafica seguimiento analisis actual
                               ]
                           }
                       ]
                   );
               }]
           }
        })
        /*
        	// =========================================================================
            // ERROR 400
            // =========================================================================
            .state('pageError403', {
                url: '/page-error-403',
               templateUrl: 'resources/segurosAzteca/views/pages/page-error-403.html',
                data: {
                    pageTitle: 'ERROR 403',
                    pageHeader: {
                        icon: 'fa fa-ban',
                        title: 'Error 403',
                        subtitle: 'access is denied'
                    },
                    breadcrumbs: [
                        {title: 'Pages'},{title: 'Error 403'}
                    ]
                },
                resolve: {
                    deps: ['$ocLazyLoad', 'settings', function($ocLazyLoad, settings) {

                        var cssPath = settings.cssPath; // Create variable css path

                        return $ocLazyLoad.load( // You can lazy load files for an existing module
                            [
                                {
                                    insertBefore: '#load_css_before',
                                    files: [
                                        //cssPath+'/pages/error-page.css'
                                    ]
                                }
                            ]
                        );
                    }]
                }
            })

            // =========================================================================
            // ERROR 404
            // =========================================================================
            .state('pageError404', {
                url: '/page-error-404',
               templateUrl: 'resources/segurosAzteca/views/pages/page-error-404.html',
                data: {
                    pageTitle: 'ERROR 404',
                    pageHeader: {
                        icon: 'fa fa-ban',
                        title: 'Error 404',
                        subtitle: 'page not found'
                    },
                    breadcrumbs: [
                        {title: 'Pages'},{title: 'Error 404'}
                    ]
                },
                resolve: {
                    deps: ['$ocLazyLoad', 'settings', function($ocLazyLoad, settings) {

                        var cssPath = settings.cssPath; // Create variable css path

                        return $ocLazyLoad.load( // You can lazy load files for an existing module
                            [
                                {
                                    insertBefore: '#load_css_before',
                                    files: [
                                        //cssPath+'/pages/error-page.css'
                                    ]
                                }
                            ]
                        );
                    }]
                }
            })

            // =========================================================================
            // ERROR 500
            // =========================================================================
            .state('pageError500', {
                url: '/page-error-500',
               templateUrl: 'resources/segurosAzteca/views/pages/page-error-500.html',
                data: {
                    pageTitle: 'ERROR 500',
                    pageHeader: {
                        icon: 'fa fa-ban',
                        title: 'Error 500',
                        subtitle: 'internal server error'
                    },
                    breadcrumbs: [
                        {title: 'Pages'},{title: 'Error 500'}
                    ]
                },
                resolve: {
                    deps: ['$ocLazyLoad', 'settings', function($ocLazyLoad, settings) {

                        var cssPath = settings.cssPath; // Create variable css path

                        return $ocLazyLoad.load( // You can lazy load files for an existing module
                            [
                                {
                                    insertBefore: '#load_css_before',
                                    files: [
                                        //cssPath+'/pages/error-page.css'
                                    ]
                                }
                            ]
                        );
                    }]
                }
            });*/

    }])

    // Init app run
    .run(['$rootScope','settings','$state','$location','$breadcrumb',function($rootScope, settings, $state, $location,$breadcrumb) {
        $rootScope.$state = $state; // state to be accessed from view
        $rootScope.$location = $location; // location to be accessed from view
        $rootScope.settings = settings; // global settings to be accessed from view
        //--Breadcrumb
        $rootScope.isActive = function(stateName) {
            return $state.includes(stateName);
        }
        $rootScope.getLastStepLabel = function() {
            return 'Angular-Breadcrumb';
        }

    }]);
