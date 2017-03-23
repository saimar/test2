/**
 * @author-name OMAR J. BALBUENA Q.
 * @author B240089
 * @param $
 */
var ResponsiveCircliful = function(selector, options) {
	var component = "";

	/* CONSTANTS CSS */
	var defaultCSSOptions = {
		CLASS_CHARTIST_CHART : "ct-chart ct-perfect-fourth",
		CLASS_CIFRAS_BORDER: "cifras-component-border",
		CLASS_CIFRAS_INFO: "cifras-component-info",
		CLASS_FONT_CENTER: "font-center"
	};

	/* COMPONENT'S DEFAULT CONFIG */
	var defaultOptions = {
		container : "",
		chart : "",
		colorComponent : "",
		infoComponent: "",
		timer: "",
		timeLoading: 8		//milseconds
	};

	var methods = {
		init : function() {
			var classComponent = $(component.container).attr("class");
			$(component.container).attr(
					"class",
					classComponent + " "
							+ defaultCSSOptions.CLASS_CHARTIST_CHART);
			
			component.chart = new Chartist.Pie(component.container, {
				series : [ 100 ]
			}, {
				donut : true,
				donutWidth : 15,
				startAngle : 0,
				total : 100,
				showLabel : false
			});
		},
		renderComponent : function() {
			$(component.container + " div").remove();
			$(component.container + " table").remove();

			var heightContainer = $(component.container).css("height").replace("px", "");
			var widthContainer = $(component.container).css("width").replace("px", "");

			var widthCircle = 0;
			if (parseInt(heightContainer) > parseInt(widthContainer)) {
				widthCircle = widthContainer;
			} else {
				widthCircle = heightContainer;
			}

			var top = (heightContainer - widthCircle) / 2;
			var left = (widthContainer - widthCircle) / 2;

			$(component.container).append(
					"<div class='" + defaultCSSOptions.CLASS_CIFRAS_BORDER + "'></div>");
			$(component.container + " div." + defaultCSSOptions.CLASS_CIFRAS_BORDER).css({
				"border-color" : component.colorComponent,
				"height" : widthCircle + "px",
				"width" : widthCircle + "px",
				"top" : top + "px",
				"left" : left + "px"
			});
			
			$(component.container).append("<div class='" + defaultCSSOptions.CLASS_CIFRAS_INFO + "'></div>");
			$(component.container + " div." + defaultCSSOptions.CLASS_CIFRAS_INFO).append(component.infoComponent);
			
			var widthTable = $(component.container + " div." + defaultCSSOptions.CLASS_CIFRAS_INFO).width();
            var heightTable = $(component.container + " div." + defaultCSSOptions.CLASS_CIFRAS_INFO).height();

            var top = (heightContainer - heightTable) / 2;
            var left = (widthContainer - widthTable) / 2;

            $(component.container + " div." + defaultCSSOptions.CLASS_CIFRAS_INFO).css("top", top);
            $(component.container + " div." + defaultCSSOptions.CLASS_CIFRAS_INFO).css("left", left);
		},
		animate : function() {
			var counter = 0;
			
			component.timer = setInterval(function() {
				counter++;				
				
				if (counter > 100) {
					clearInterval(component.timer);
					methods.renderComponent();
					return;
				}				
				
				component.chart.update({
					series : [ counter ]
				});				
				
				$(component.container + " svg g path:eq(0)").css("stroke", component.colorComponent);
			}, component.timeLoading);
		}
	};

	// CONFIGURACIONES DEL PLUGIN
	component = $.extend(defaultOptions, options);

	// SE GUARDA EL SELECTOR DEL CONTEDOR
	// DONDE SE RENDERIZARA LA TABLA
	component.container = selector;

	methods.init();	
	methods.animate();	
};