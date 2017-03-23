function renderCustomMapPLD(data, colorSeries, colorMarkers, options) {
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
      var marker = {};
      var serie = {};

      if (value.indicador >= options.levelAlertVisible) {
        // SE CREA EL MARCADOR PARA EL ESTADO
        marker.name = 'Alertas:'+value.alertas;
        marker.style = {};
        marker.style.fill = colorMarkers[value.indicador];
        console.info(value.indicador)
        marker.coords = [value.coorX, value.coorY];
        markersJSON.push(marker);
      }

      // SE AGREGA EL ESTADO DENTRO DE LA SERIE
      seriesJSON[value.idEstado] = value.alertas;

      // VALIDACION EN CASO DE QUE SE DESEE
      // MOSTRAR EN UNA TABLA LOS ESTADOS CON MAYOR RIESGO  
      if (options.showTableInfo) {
        if (value.indicador >= options.levelAlertTable) {
          indicadoresMayoresJSON.push(value.estado);
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
      },
      markers: markersJSON
    });

    // SE CREAN LOS PUNTOS PARA EL EFFECTO PULSE DE LOS INDICADORES
    var svg = d3.select(options.container + " div.jvectormap-container svg g");

    $.each(markersJSON, function(index, value) {
      
    	console.info('['+value.coords[0]+','+value.coords[1]+']')
      
      
    	indicadorJSON = swap(colorMarkers);
    	console.info(indicadorJSON);
      svg.append("circle")
        .attr("stroke-width", 5)
        .attr("r", 5)
        .attr("cx", value.coords[0])
        .attr("cy", value.coords[1])
        .attr("class", "pulse " + indicadorJSON[value.style.fill]);
        console.info(indicadorJSON[value.style.fill]);
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
          .attr("stroke", colorMarkers[idPulseMarker])
          .ease('sine')
          .each('end', repeat);
      })();
    });


    if (indicadoresMayoresJSON.length > 0) {
      var idTableIndicadores = 'indicadores-' + options.container.replace("#", "");
      
      // SE ELIMINA LA TABLA DONDE SE MOSTRARAN LOS ESTADOS CON MAYOR RIESGO SI ES QUE YA EXISTE
      $(options.container + " div.jvectormap-container #" + idTableIndicadores).remove();
      
      // SE CREA LA TABLA DONDE SE MOSTRARAN LOS ESTADOS CON MAYOR RIESGO
      $(options.container + " div.jvectormap-container").append('<div id="' + idTableIndicadores + '" style="position: absolute; top: 15px; right: 15px;"></div>');
      
      var liAppend=""
      $.each(indicadoresMayoresJSON, function(index, value) {
    	  if(index<10)
    		  liAppend= liAppend + ' <a href="#" class="list-group-item ">  <span class="badge">42</span>'+value+'</li>';    	  
        });
      $("#" + idTableIndicadores).append('<ul class="list-group">'+liAppend+'</ul>');
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