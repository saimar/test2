/* ==========================================================================
 * TABLE OF CONTENT
 * ==========================================================================
 * - GRITTER NOTIFICATION
 * - VISITOR CHART & SERVER STATUS
 * - REAL TIME STATUS
 * - DEMO COUNT NUMBER
 * - SESSION TIMEOUT
 * --------------------------------------------------------------------------
 * Plugins used : Flot chart, Gritter notification
 ============================================================================ */

'use strict';
(function(){
    angular.module("pldApp.dashboard", [])

        // =========================================================================
        // GRITTER NOTIFICATION
        // =========================================================================
        // display marketing alert only once
    	// Destruye los obsejtos contruidos para mostrar las graficas del centro de monitoreo, cuando se pierde el foco de la pagina principal.
        .controller('DashboardCtrl',['$scope',function ($scope) {

        	console.debug('DashboardCtrl loaded...');
        	/*Destruye los intervalos de tiempo para las graficas*/
            $scope.$on("$destroy", function handleDestroyEvent() {
            			instanciaCM.destroy();
            			angular.forEach($('.dynamicChartContainer div[screen=cc] #vt'),function(item,indx){
                        	$(item).vTicker("remove");
                        })
                    }
                );

        	}]);// cierra controller



})();
