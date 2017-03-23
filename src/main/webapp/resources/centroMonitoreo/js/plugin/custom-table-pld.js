/**
 * @author-name OMAR J. BALBUENA Q.
 * @author B240089
 * @param $
 */
(function($) {
	var dataTable = "";

	/* CONSTANTS CSS */
	var defaultCSSOptions = {
		CLASS_TABLE_CONTAINER : "table-container",
		CLASS_TABLE_HEAD : "table-head",
		CLASS_TABLE_BODY : "table-body",
		CLASS_INDICADOR: "circle"
	};

	/* COMPONENT'S DEFAULT CONFIG */
	var defaultOptions = {
		container : "",
		data : "",
		fontHeader : "font-header",
		fontContent : "font-content",
		numberVisibleItems : 5,
		widthColumns: [],
		animate: false,
		columnNameIndicador : "Indicador",
		coloresIndicadores : {
			"1" : "#00A65A",
			"2" : "#D4BC2E",
			"3" : "#FF851B",
			"4" : "#FF4136"
		},
		coloresIndicadoresLighter : {
			"1" : "#00E200",
			"2" : "#FFDD0C",
			"3" : "#FFAB00",
			"4" : "#FF4136"
		}
	};

	var methods = {
		init : function() {
			// SE ELIMINA EL CONTENIDO DEL CONTENEDOR POR SI ACASO
			// LA TABLA YA EXISTE
			$(dataTable.container).html("");
			
			// SE ASIGNA CLASE CSS AL CONTENEDOR DE LA TABLA
			$(dataTable.container).attr("class",
					defaultCSSOptions.CLASS_TABLE_CONTAINER);

			// SE CREA EL CONTENEDOR DE LAS CABECERAS DE LA TABLA
			$(dataTable.container).append(
					"<div class='" + defaultCSSOptions.CLASS_TABLE_HEAD
							+ "'></di>");

			// SE CREA LA TABLA DONDE SE RENDERIZARAN LAS CABECERAS
			$(
					dataTable.container + " div."
							+ defaultCSSOptions.CLASS_TABLE_HEAD).append(
					"<table class='table'><thead><tr></tr></thead></table>");

			// SE CREA EL CONTENEDOR DEL CUERPO DE LA TABLA
			$(dataTable.container).append(
					"<div class='" + defaultCSSOptions.CLASS_TABLE_BODY
							+ "'></di>");

			// SE CREA LA LISTA DONDE SE RENDERIZARA EL CUERPO DE LA TABLA
			$(
					dataTable.container + " div."
							+ defaultCSSOptions.CLASS_TABLE_BODY).append(
					"<ul class='list-group'></ul>");
		},
		renderTable : function() {
			var widthColumnHead = [];

			// SE RENDERIZAN LAS CABECERAS
			var objContainer = $(dataTable.container + " div."
					+ defaultCSSOptions.CLASS_TABLE_HEAD + " table thead tr");
			var objData = dataTable.data.headers;

			$.each(objData, function(index, obj) {
				var columnName = obj.name;
				
				if (dataTable.columnNameIndicador.toLowerCase () == columnName.toLowerCase()) {
					columnName = "";
				}
				
				if (dataTable.widthColumns.length > 0 && dataTable.widthColumns != "") {
					$(objContainer).append("<th style='width: " + dataTable.widthColumns[index] + ";'>" + columnName + "</th>");
				} else {
					$(objContainer).append("<th>" + columnName + "</th>");
				}							
				$(objContainer).children(":last-child").attr("class",
						dataTable.fontHeader);
			});
			
			if (dataTable.widthColumns.length > 0 && dataTable.widthColumns != "") {
				widthColumnHead = dataTable.widthColumns;
			} else {
				// SE OBTIENE EL ANCHO DE CADA UNA DE LAS CABECERAS
				// MISMO QUE TRENDAS LAS COLUMNAS DEL CUERPO DE LA TABLA
				$.each(objContainer.children(), function(index, obj) {
					widthColumnHead.push($(obj).css("width"));
				});
			}
			
			// SE RENDERIZAN EL CUERPO DE LA TABLA
			objContainer = $(dataTable.container + " div."
					+ defaultCSSOptions.CLASS_TABLE_BODY + " ul");
			var objData = dataTable.data.queryResult;

			$.each(objData, function(indexRow, objRow) {
				$(objContainer).append(
						'<li class="list-group-item" style="height: ' + 100
								/ dataTable.numberVisibleItems + '%;"></li>');

				var rowContainer = $(objContainer).children("li:last-child")
						.append("<table class='table'></table>").children(
								":last-child");

				$(rowContainer).append("<tbody><tr></tr></tbody>");

				$.each(objRow.fields, function(indexColumn, objColumn) {
										
					if (dataTable.columnNameIndicador.toLowerCase () == dataTable.data.headers[indexColumn].name.toLowerCase()) {
						classIndicador = defaultCSSOptions.CLASS_INDICADOR;
						
						$(rowContainer).children('tbody').children('tr').append(
								"<td style='width: " + widthColumnHead[indexColumn] + ";'>" +
										"<div class='" + defaultCSSOptions.CLASS_INDICADOR + "'></div></td>");
						
						$(rowContainer).children('tbody')
							.children('tr')
							.children('td:last-child')
							.children('div')
							.playKeyframe([generateKeyFrameIndicador(objColumn, 
													dataTable.coloresIndicadores[objColumn],
													dataTable.coloresIndicadoresLighter[objColumn])]);
					} else {
						$(rowContainer).children('tbody').children('tr').append(
								"<td class='" + dataTable.fontContent 
										+ "' style='width: "
										+ widthColumnHead[indexColumn] + ";'>"
										+ objColumn + "</td>");
					}
								
				});
			});

			$(dataTable.container).panelHeightFit();
		}, 
		enableVNewsTicker: function () {
			$(dataTable.container + " div." + defaultCSSOptions.CLASS_TABLE_BODY).vTicker({
				speed: 500,
				pause: 3000,
				showItems: dataTable.numberVisibleItems,
				animation: 'fade',
				mousePause: false,
				height: 0,
				direction: 'up'
			});
		}
	};

	$.fn.customTableGenerator = function(options) {
		// CONFIGURACIONES DEL PLUGIN
		dataTable = $.extend(defaultOptions, options);

		// SE GUARDA EL SELECTOR DEL CONTEDOR
		// DONDE SE RENDERIZARA LA TABLA
		dataTable.container = this.selector;

		methods.init();
		methods.renderTable();
		
			
		if (dataTable.numberVisibleItems < dataTable.data.queryResult && dataTable.animate) {
			methods.enableVNewsTicker();
		}
		
		$(window).resize (function() {
			$(dataTable.container + " div." + defaultCSSOptions.CLASS_TABLE_BODY).vTicker('stop');
			methods.init();
			methods.renderTable();
			
			if (dataTable.numberVisibleItems < dataTable.data.queryResult && dataTable.animate) {
				methods.enableVNewsTicker();
			}
		});
	};
}(jQuery));