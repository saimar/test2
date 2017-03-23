function renderCustomMapPLDIcon(data, colorSeries, colorMarkers, options) {
  var mapObject = {};
  var markersJSON = [];
  var seriesJSON = {};
  var indicadoresJSON = {};
  var indicadoresMayoresJSON = [];

  var delayAlert = {
    "1": 3000,
    "2": 2500,
    "3": 2000,
    "4": 1500,
    "5": 1000,
    "6": 500
  };

  if (data) {
    /* SE GENERAN LOS JSON PARA LOS MARCADORES Y LAS SERIES (ESTADOS)  */
    $.each(data, function(index, value) {
    	console.info(options.container);
      var marker = {};
      var serie = {};

      if (value.indicador >= options.levelAlertVisible) {
        // SE CREA EL MARCADOR PARA EL ESTADO
        marker.name = 'Alertas:'+value.alertas;
        marker.style = {};
        marker.style.fill = colorMarkers[value.indicador];
        marker.coords = [value.coorX, value.coorY];
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
            indicadoresMayoresJSON.push(indMay);
        }
      }
      
    });

    $.each(colorMarkers, function(index, value) {
      indicadoresJSON[colorMarkers[index]] = index;
    })

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
          //"fill-opacity": 0.6,
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
      //,markers: markersJSON
    });

    // SE CREAN LOS PUNTOS PARA EL EFFECTO PULSE DE LOS INDICADORES
       var svg = d3.select(options.container + " div.jvectormap-container svg g");

    
    $.each(markersJSON, function(index, value) {
      
    	//console.info('['+value.coords[0]+','+value.coords[1]+']')
      
    	indicadorJSON = swap(colorMarkers);
    
      svg.append("image")
        //.attr("stroke-width", 5)
        //.attr("r", 15)
        .attr("x", value.coords[0]-7)
        .attr("y", value.coords[1]-7)
        .attr('width', 15)
        .attr('height', 15)
        .attr("xlink:href","default/image/flag0"+indicadorJSON[value.style.fill]+".png");
        //.attr('class', 'flagcolor');
        //.attr("class", "pulse " + indicadorJSON[value.style.fill]);
    });
    

    if (indicadoresMayoresJSON.length > 0) {
      var idTableIndicadores = 'indicadores-' + options.container.replace("#", "");
      
      // SE ELIMINA LA TABLA DONDE SE MOSTRARAN LOS ESTADOS CON MAYOR RIESGO SI ES QUE YA EXISTE
      $(options.container + " div.jvectormap-container #" + idTableIndicadores).remove();
      
      // SE CREA LA TABLA DONDE SE MOSTRARAN LOS ESTADOS CON MAYOR RIESGO
      $(options.container + " div.jvectormap-container").append('<div id="' + idTableIndicadores + '" style="position: absolute; top: 15px; right: 15px;"></div>');      

			
      var table = "";
			table += '<table class="table table-condensed">';
			table += '<thead><th colspan="2">' + options.tittleTable + '</th></thead>';
			table += '<tbody>';
			$.each(indicadoresMayoresJSON, function(index, obj) {
				if (index < 10)
					table += '<tr><td>' + obj.estado + '</td><td><span class="badge">'+obj.alertas+'</span></td></tr>';
			});

			table += '</tbody>';

			table += "<table>";

			$("#" + idTableIndicadores).append(table);


    }
  }

  return mapObject;
};

/* FUNCTION QUE INVIERTE UN JSON {KEY:VALUE} TO {VALUE:KEY}  */
function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}