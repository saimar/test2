var jQuery=require('jquery');
window.jQuery=jQuery;//pasamos jquery al contexto
//var boostrap=require('bootstrap');
var angular=require('angular');
//var ActivityMonitor=require('angular-activity-monitor');
var breadcrumbs=require('angular-breadcrumb');
var uiRouter=require('angular-ui-router');
//var ngDialog=require('ng-dialog');
//var niceScroll=require('jquery.nicescroll');
//var autocomplete=require('jquery-autocomplete');
//var boostrapDatepicker=require('bootstrap-datepicker');

var app=require('./app.js');

app.value('jQuery', jQuery);

 require('./config.js');
 require('./directives.js');
 require('./controllers.js')
 require('./services.js');

 //directivas y tabla

 require('./directives/web-component-pld-commons.js');
 require('./components/angular-directive-pld-table.js');

 //serivicios

 require('./appA/services/service-appA-modulo-reportes.js');

 //modulos de la aplicacion
 require('./appA/modules/angular-module-pld-analisis.js');
 require('./appA/modules/angular-module-pld-reporte.js');

 require('./appA/modules/monitoreo/operRelevantesDanios.config.js');

 require('./appA/modules/reportes/monitoreables/monitoreablesVida.config.js');
 require('./appA/modules/reportes/preocupantes/preocupantesVida.config.js');
 require('./appA/modules/reportes/regulatorios/regulatoriosVida.config.js');
