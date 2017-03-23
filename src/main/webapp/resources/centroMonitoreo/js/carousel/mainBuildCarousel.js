  var scheduleBuildCarousel=null;
  var panelsCollection=null;
  var carouselCollection=null;
  var carouselName=$("#carouselName").val();
  var pathname = window.location.pathname; // Returns path only
  $(document).ready(function($scope){
	  	$("#fountainTextG").fadeIn(5000);
		//Get Data for carousel panel's
	  	pathname = pathname.substring(0,pathname.lastIndexOf('/'));
	  	console.debug("pathname::"+pathname);
		$.when(
				$.ajax({
					url:pathname+"/restModuloCentroMonitoreo/consulta/getPanels?consulta=1",
					datType:"JSON",
					success : function(data) {
						panelsCollection=JSON.parse(JSON.stringify(data));
					},
					error : function(objXMLHttpRequest) {
						console.log("Ha ocurrido un Error",objXMLHttpRequest);
					}
				}),
				$.ajax({
					url:pathname+"/restModuloCentroMonitoreo/consulta/getDataCarousel?consulta=4&carousel="+carouselName,
					datType:"JSON",
					success : function(data) {
						carouselCollection=JSON.parse(JSON.stringify(data));
					},
					error : function(objXMLHttpRequest) {
						console.log("Ha ocurrido un Error",objXMLHttpRequest);
					}
				})
		).then(function(){
			window.setTimeout(function(){var scheduleBuildCarousel=new ScheduleBuildCarousel(panelsCollection.jsonResult,carouselCollection.jsonResult)}, 5000)
		});			
  });
