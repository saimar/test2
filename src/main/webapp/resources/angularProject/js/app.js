/* ==========================================================================
 * Template: Blankon Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: Djava UI
 * Website: http://djavaui.com
 * Email: maildjavaui@gmail.com
 * ==========================================================================
*/


// var jQuery=require('jquery');
// window.jQuery=jQuery;//pasamos jquery al contexto
// window.$=jQuery;//pasamos jquery al contexto
// var boostrap=require('bootstrap');
// var angular=require('angular');
// var ActivityMonitor=require('angular-activity-monitor');
// var breadcrumbs=require('angular-breadcrumb');
// var uiRouter=require('angular-ui-router');
// var ngDialog=require('ng-dialog');
// var niceScroll=require('jquery.nicescroll');
// var autocomplete=require('jquery-autocomplete');
// var boostrapDatepicker=require('bootstrap-datepicker');


 require('./config.js');
 require('./directives.js');
 require('./controllers.js')
 require('./services.js');

 //directivas y tabla

 require('./directives/web-component-pld-commons.js');
 require('./components/angular-directive-pld-table.js');

 //serivicios

 require('./appA/services/service-appA-modulo-reportes.js');
 require('./appA/services/serviceAppAModuloMonitoreo.js');

 //modulos de la aplicacion
 require('./appA/modules/angular-module-pld-analisis.js');
 require('./appA/modules/angular-module-pld-reporte.js');

 require('./appA/modules/monitoreo/operRelevantesDanios.config.js');

 require('./appA/modules/reportes/monitoreables/monitoreablesVida.config.js');
 require('./appA/modules/reportes/preocupantes/preocupantesVida.config.js');
 require('./appA/modules/reportes/regulatorios/regulatoriosVida.config.js');

 	'use strict';
// =========================================================================
// BLANKON MODULE APP
// =========================================================================
var app =angular.module('pldApp', [
    'ui.router',
    'oc.lazyLoad',
    'angular-loading-bar',
    'ngSanitize',
    'ngAnimate',
    'ncy-angular-breadcrumb',

    'pldConfig',//configuracion de la aplicacion
    'pldServices',//servicios base de la aplicacion
    'pldDirective',//directivas base de la aplicacion
    'pldController',//eventos y variables globales de la app

    //==========================================================
    // Modulos de la aplicación
    //==========================================================


   'wcPldCommons',//directivas
   'pldComponentTable',//tabla

   'serviceAppAModuloReportes',
   'serviceAppAModuloMonitoreo',

   'pldModule.appA.Analisis',//modulo de analisis
   'pldModule.appA.Reporte',//modulo de reporte

  'ui.monitoreo.operRelevantesDanios',//modulo aplicacion

  /* 	REPORTES */
  'ui.reportes.monitoreablesVida',
  'ui.reportes.regulatoriosVida',
  'ui.reportes.preocupantesVida',

]);
