

function renderCustomMapPLD(data, options,optionsChart, data2) {
	console.info('->->->->->->->->->->->->-> into renderCustomMapPLD <-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-')
	console.info('->->->->->->->->->->->->-> '+options.tittleTable+' <-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-')
	    console.info(dataColoresIndicadoresJSON)
	    
	console.info(data)
	console.info(options)
	console.info(optionsChart)
	console.info(data2)
	
	console.info(data)
	console.info(data)
	 
     
    var mapObject = {};
    var markersJSON = [];
    var seriesJSON = {};
    var indicadoresJSON = {};
    var indicadoresMayoresJSON = [];

  

  if (data) {
    /* SE GENERAN LOS JSON PARA LOS MARCADORES Y LAS SERIES (ESTADOS)  */
    $.each(data, function(index, value) {
      var marker = {};
      var serie = {};

      if (value.indicador >= options.levelAlertVisible) {
        // SE CREA EL MARCADOR PARA EL ESTADO
        marker.name       = 'Alertas:'+value.alertas;
        marker.alertas    = value.alertas * 1;
		marker.indicador  = value.indicador;
		marker.icon       = value.icon;
        marker.style      = {};
        marker.coords     = [value.coorX, value.coorY];
        markersJSON.push(marker);
      }

      // SE AGREGA EL ESTADO DENTRO DE LA SERIE
      seriesJSON[value.idEstado] = value.alertas;

      // VALIDACION EN CASO DE QUE SE DESEE
      // MOSTRAR EN UNA TABLA LOS ESTADOS CON MAYOR RIESGO  
      if (options.showTableInfo) {
    	  var indMay={};
        if (value.indicador >= options.levelAlertTable) {
        	indMay.estado  = value.estado;
        	indMay.alertas = value.alertas;
        	indMay.indicador = value.indicador;
            indicadoresMayoresJSON.push(indMay);
        }
      }
    });
    
  

    /* SE CREA EL MAPA */
    mapObject = new jvm.WorldMap({
      map: options.map,
      //backgroundColor: options.background,
      container: $(options.container),
      series: {
        regions: [{
        	scale: ['#C8EEFF', '#0071A4'],
            normalizeFunction: 'polynomial',
          values: seriesJSON
        }]
      },
      regionStyle: {
        initial: {
          "stroke-width": 0.1,
        },
        hover: {
          cursor: 'pointer'
        }
      },
      markerStyle: {
        initial: {
          stroke: '#FF0000',
          "fill-opacity": 1,
          "stroke-width": 1,
          "stroke-opacity": 1,
          r: options.radioMarker,
        } ,hover: {
            fill: '#FFFF00',
            "stroke-width": 1,
            cursor: 'pointer'
          }
      }
    });

    //--Create standar markers
    if(options.mapType=='pulses'){
    	
    	drawPulses(options,markersJSON);
    }else  if(options.mapType=='dots'){
    	drawDots(options,markersJSON);
    	
    }else  if(options.mapType=='iconsFlag'){
    	drawIconsFlag(options,markersJSON);
    	
    }else  if(options.mapType=='iconsMaker'){
    	drawIconsMarker(options,markersJSON);
    	
    }else  if(options.mapType=='iconsPin'){
    	drawIconsPin(options, markersJSON)
    }else{
    	console.info('there is not rules for draw markers')
    }
    
  

    
    //Build table
    if (options.showTableInfo=="true") {
      var idTableIndicadores = 'indicadores-' + options.container.replace("#", "");
      
      // SE ELIMINA LA TABLA DONDE SE MOSTRARAN LOS ESTADOS CON MAYOR RIESGO SI ES QUE YA EXISTE
      $(options.container + " div.jvectormap-container #" + idTableIndicadores).remove();
      
      //TITLE
      console.info('......................................................TITLE')
	  var mapWidth  = $(options.container + " div.jvectormap-container").css("width").replace('px','');
	  var mapHeight = $(options.container + " div.jvectormap-container").css("height").replace('px','')
      var myTitle   ='<div class="font-sub-header" style="position:fixed; top: 15px; left: '+((mapWidth/2)-((mapWidth*.45)/2))+'px; width:'+(mapWidth*.45) +'px">'+options.tittleTable +'</div>';
	  console.info(myTitle)
	  console.info($(options.container + " div.jvectormap-container"))
	  $(options.container + " div.jvectormap-container").append(myTitle);

	  // LEGEND
      $(options.container + " div.jvectormap-container").append('<div id="' + idTableIndicadores + '" class="'+options.classChart+'"></div>');
      var table = "";
			table += '<table class="chart-legend-table">';
			table += '<tbody>';
			if(indicadoresMayoresJSON.length > 0){
				$.each(indicadoresMayoresJSON, function(index, obj) {
					
					if (index < 10){
						table += '<tr>  ';
						table += ' <td class="chart-legend-text"><span class="badge" style="background-color: '+dataColoresIndicadoresJSON[parseInt(obj.indicador)]+';">'+$.number(obj.alertas,0)+'</span></td> ';
						table += ' <td class="chart-legend-text">' + obj.estado + '</td> ';
						table += '</tr>  ';
					}
				});
			}
			table += '</tbody>';
			table += "<table>";
			$("#" + idTableIndicadores).append(table);
    }
    
    
    
    //Create marks with two icons
    if(options.hasSecondMarker){
    	drawTwoMarkers(data,options);	
	}else{
		console.info('there is not rules for draw chart')
	}
    
    
    //Build charts [bar|gauge]
	if(options.chart){
		drawCharts(data,options,data2)
	}else{
		console.info('there is not rules for draw chart')
	}
    
  }

  return mapObject;
};

/* FUNCTION QUE INVIERTE UN JSON {KEY:VALUE} TO {VALUE:KEY} */
function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}


function drawPulses(options,markersJSON){
	
	console.info('Draw pulses')
	 var colorMarkers = {
    		"1": '#FFFF00',
    		"2": '#FACC2E',
    		"3": '#FF8000',
            "4": '#FE642E',
            "5": '#FF4000',
            "6": '#FE2E2E',
        	"7": '#FF0000'
    };
	 var delayAlert = {
			    "1": 3000,
			    "2": 2500,
			    "3": 2000,
			    "4": 1500,
			    "5": 1000,
			    "6": 500
			  };
	var indicadoresJSON = {};
   
   	var svg = d3.select(options.container + " div.jvectormap-container svg g");	

   	$.each(markersJSON, function(index, data) {
		svg.append("circle")
	   .attr("stroke-width", 1)
	   .attr("r", 5)
	   .attr("cx", data.coords[0])
	   .attr("cy", data.coords[1])
	   .style("fill", "#FE9A2E");
			
	    svg.append("circle")
	   .attr("stroke-width", 5)
	   .attr("r", 5)
	   .attr("cx", data.coords[0])
	   .attr("cy", data.coords[1])
	   .attr("class", "pulse " + data.indicador);
   	});

var circle = svg.selectAll(options.container + " div.jvectormap-container svg g circle.pulse");
	circle.each(function(d, i) {
		(function repeat() {
			d3.select(circle[0][i]).attr("stroke-width", 5)
			.attr("r", 2)
			.attr('opacity', 1)

			var idPulseMarker = $(circle[0][i]).attr('class').split(" ")[1];
			d3.select(circle[0][i]).transition()
			.duration(delayAlert[idPulseMarker])
			.attr("stroke-width", 0)
			.attr("opacity", 0.8)
			.attr("r", options.radioPulse)
			.attr("stroke", dataColoresIndicadoresJSON[idPulseMarker])
			.ease('sine')
			.each('end', repeat);
			console.info(options.radioPulse)
		})();
	});
}


//--
function drawDots(options,markersJSON){
	console.info('Draw marker dots')
	var svg = d3.select(options.container + " div.jvectormap-container svg g");
		
	var maxValue = (_.max(markersJSON, function(marker) {return marker.alertas;})).alertas;
	var minValue = (_.min(markersJSON, function(marker) {return marker.alertas;})).alertas;
	var boundaryMin = (Math.log(minValue))
	var boundary = ((Math.log(maxValue)) - (Math.log(minValue))) / 9;
	var boundaries = [];
	for (var iBoundary = 0; iBoundary < 10; iBoundary++) {
		boundaries[iBoundary] = Math.exp(boundaryMin + (boundary * iBoundary));
	}
	$.each(markersJSON, function(index, data) {
		var myBoundary = 0
		for (var iBoundary = 0; iBoundary < 10; iBoundary++) {
			if (data.alertas >= boundaries[iBoundary]) {
				myBoundary = iBoundary + 1;
			} else {
				break;
			}
		}
		markersJSON[index].r = myBoundary;
	});
	$.each(markersJSON, function(index, data) {
		
		svg.append("circle")
		.attr("stroke-width", 1)
		.attr("r", data.r + 5)
		.attr("cx", data.coords[0])
		.attr("cy", data.coords[1])
		.style("fill", "#F08080")
		.style("stroke", "#A52A2A")
		.style("opacity", 0.85)
		.append("title")
		.text(function(d) {
			return 'Alertas:' + data.alertas;
		});
	});
}

function drawIconsFlag(options,markersJSON){
	console.info('Draw marker flag icon ')
	var svg = d3.select(options.container + " div.jvectormap-container svg g");
	$.each(markersJSON, function(index, data){ 
      svg.append("image")
        .attr("x", data.coords[0]-4)
        .attr("y", data.coords[1]-16)
        .attr('width', 20)
        .attr('height', 20)
        .attr("xlink:href",miPath+'/app/resources/default/img/'+options.icon+data.indicador+'.png' );
    });
}


function drawIconsMarker(options,markersJSON){
	console.info('Draw marker icon ')
	var svg = d3.select(options.container + " div.jvectormap-container svg g");
	$.each(markersJSON, function(index, data){ 
      svg.append("image")
        .attr("x", data.coords[0]-10)
        .attr("y", data.coords[1]-18)
        .attr('width', 20)
        .attr('height', 20)
        .attr("xlink:href",miPath+'/app/resources/default/img/'+options.icon+data.indicador+'.png' );
    });
}

function  drawIconsPin(options, markersJSON){
	console.info('Draw marker pin icon ')
	var svg = d3.select(options.container + " div.jvectormap-container svg g");
	$.each(markersJSON, function(index, data){ 
      svg.append("image")
        .attr("x", data.coords[0]-6)
        .attr("y", data.coords[1]-18)
        .attr('width', 20)
        .attr('height', 20)
        .attr("xlink:href",miPath+'/app/resources/default/img/'+options.icon+data.indicador+'.png' );
    });
}

function drawCharts(data,options,data2){
	console.info('Draw chart ')
	var idTableIndicadores = 'indicadores-' + options.container.replace("#", "");
	var mapWidth  = $(options.container + " div.jvectormap-container").css("width").replace('px','');
	var mapHeight = $(options.container + " div.jvectormap-container").css("height").replace('px','')
	
	var idChart = 'chart-' + options.container.replace("#", "");
	$(options.container + " div.jvectormap-container").append('<div id="' + idChart + '" class=" ct-chart '+options.classChart+'" style="height: '+(parseInt(mapHeight)/4)+'px; width: '+(parseInt(mapHeight)/2)+'px; "></div>');
	
	if(options.chartType=='bar'){
		console.info('Type: Bar');
		var chartData=[]
		var chartData2=[]
		var chartLabel=[]
		console.info(data)
		$.each(data, function(indexR, dataR) {
			if (parseInt(dataR.alertas)>0){
				chartData2.push(parseInt(dataR.alertas));
				chartData.push([dataR.estado,parseInt(dataR.alertas)]);
				chartLabel.push(dataR.estado);
			}
		});					
		var maxItemsChart=5
		if(chartLabel.length <= maxItemsChart){
			maxItemsChart=chartLabel.length;
		}
	    var i = maxItemsChart;
	    setInterval(function () {
	    	if(i>=chartLabel.length){
	    		i=0
	    	}				    	
	    	chartData2.push(    chartData2.shift());
	    	chartLabel.push(    chartLabel.shift());
	    	
	    	new Chartist.Bar("#"+idChart, {
				  labels:chartLabel.slice(0, maxItemsChart),
				  series:[ 
				          chartData2.slice(0, maxItemsChart)
				           ]
				}, {
				  seriesBarDistance: 10,
				  reverseData: true,
				  horizontalBars: true,
				  axisY: {
				    offset: 70
				  }
				});						
	        i ++;
	    },1000);
	}else if(options.chartType=='gauge'){
		console.info('Type: gauge');
		var vItem= parseInt((parseInt(mapHeight)/4)-20);
	    var total=0;
	    var panelChart='<div class="'+options.classChart+'" style="display:table; height: '+vItem+'px; width: '+vItem+'px; "> '
	    $.each(data2.queryResult,function(ChartIndex,chartData){
		    	total+=parseInt( chartData.fields[1] );
		    	panelChart = panelChart+'<div id="' + idTableIndicadores + '-'+ChartIndex+'" class="ct-chart" style="height: '+vItem+'px; width: '+vItem+'px; "></div>'
		    })
		    panelChart = panelChart+'</div>'
		    $("#"+idChart).append(panelChart);
	    
		    $.each(data2.queryResult,function(chartIndex,chartData){
		    	var miNum = ( ((parseInt( chartData.fields[1]) * 100 )/total) )
		    	var g1 = new JustGage({
							id : idTableIndicadores + '-'+ chartIndex + '',
							title : chartData.fields[0] + ': '+ chartData.fields[1],
							value : miNum,
							min : 0,
							max : 100,
							decimals : 0,
							gaugeWidthScale : 0.6,
							textRenderer : function(value) {
								return '' + $.number(value, 2)+ ' %'
							},
							valueFontColor : '#FFFFFF',
							titleFontColor  : '#FFFFFF',
						});	
		    });
	}
}

function drawTwoMarkers(data,options){
	
	console.info('draw with two markers')
	var svg = d3.select(options.container + " div.jvectormap-container svg g");
	var markers2JSON=[];
	var tableMarkers=[];
	$.each(data, function(index, dataMarker) {
		var marker = {};
	    if (dataMarker.indicador >= options.levelAlertVisible) {
	        // SE CREA EL MARCADOR PARA EL ESTADO
	        marker.name       = 'Alertas:'+dataMarker.alertas2;
	        marker.alertas    = dataMarker.alertas * 1;
	        marker.alertas2   = dataMarker.alertas2 * 1;
	        marker.indicador  = dataMarker.indicador2;
	        marker.indicador2  = dataMarker.indicador2;
			marker.icon       = dataMarker.icon;
	        marker.style      = {};
	        //marker.style.fill = colorMarkers[dataMarker.indicador];
	        marker.coords     = [dataMarker.coorX, dataMarker.coorY];
	        markers2JSON.push(marker);
	      }
	    if(marker.indicador==4){
	    	tableMarkers.push(['markerFlagA.png',dataMarker.estado,dataMarker.alertas]);	
	    }
	    if(marker.indicador2==4){
	    	tableMarkers.push(['markerFlagB.png',dataMarker.estado,dataMarker.alertas2]);	
	    }
	});
	console.info(markers2JSON);
	  $.each(markers2JSON, function(index, data){ 
		  console.info(data);
		  if(data.indicador==4){
	      svg.append("image")
	        .attr("x", parseInt(data.coords[0])-10)
	        .attr("y", data.coords[1])
	        .attr('width', 32)
	        .attr('height', 32)
	        .attr("xlink:href",miPath+'/app/resources/default/img/markerFlagA.png' );
		  }
		  if(data.indicador2==4){
	      svg.append("image")
	        .attr("x", parseInt(data.coords[0])+10)
	        .attr("y", data.coords[1])
	        .attr('width', 32)
	        .attr('height', 32)
	        .attr("xlink:href",miPath+'/app/resources/default/img/markerFlagB.png' );
		  }
	    });
		var table2 ="";
		$.each(tableMarkers,function(index, marker){
		    table2 += '<div class="widget widget-stats bg-blue" style="width:250px">'
			table2 += '<div class="stats-icon stats-icon-lg"><img src="'+miPath+'/app/resources/default/img/'+marker[0]+'"></img></div>'
			table2 += '<div class="stats-title">Transaccion de mayor monto</div>'
			table2 += '<div class="stats-number">'+marker[2]+'</div>'
			table2 += '<div class="stats-progress progress">'
			table2 += '<div class="progress-bar" style="width: 99.1%;"></div>'
			table2 += '</div>'
			table2 += '<div class="stats-desc">'+marker[1]+'</div>'
			table2 += '</div>'
		});
	  $(options.container + " div.jvectormap-container").append('<div id="labels" class="map-chart-bottom-left" >'+table2+'</div>');
	  
}