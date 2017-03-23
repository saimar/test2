/*Inicia Parte Backbone esta orientado a JSON*/
var QueueStatusModel= Backbone.Model.extend({
  defaults:{
	idRequest:"",
	url:"",
	status:"200",
	time:"",
	message:"",
	reload:"",
	state:"",
	data:[],
	fechaInfo:"",
	owner:""
  }
});

var PanelModel= Backbone.Model.extend({
  defaults:{
    data:"",
    idPanel:"",
    namePanel:""

  }
});


var CarouselModel= Backbone.Model.extend({
  defaults:{
	idCarousel:"",
	nameCarousel:"",
	idPanel:"",
	namePanel:"",
	duration:"",
	position:"",
	empleado:"",
	nombreEmpleado:""//,
    //idPais:""
  }
});

var CarouselsModel= Backbone.Model.extend({
  defaults:{
	description:"",
    nameCarousel:""
  }
});

var PaisesModel= Backbone.Model.extend({
	  defaults:{
		IdPais:"",
	    Descripcion:"",
	    Imagen:""
	  }
	});

//Model ColorData
var ColorData= Backbone.Model.extend({
	  defaults:{
		  Clasificacion:"",
		  Color:"",
		  DescripcionColor:"",
		  DescripcionIdOrden:"",
		  Estatus:"",
		  Id:"",
		  IdOrden:""
	  }
});

//Models Maps
var MapaModel = Backbone.Model.extend({
	defaults:{
		selectorUnico:"",
		idSelector: "",
		container: "",
		options:"",
		data:"",
		chartData:"",
		panelData:"",
		colors:""
	},
	validation: {
		container: {
	      required: true
	    },
	    options: {
	      required: true
	    },
	    data: {
	    	required: true
	    }
	  }
});

var PaisModel= Backbone.Model.extend({
	defaults:{
		Alertas		:0,
		Estado		:"",
		Zona		:0,
		Estado	:0,
		Indicador	:0,
		coorX		:0,
		coorY		:0,
		Indicador2	:0,
		Alertas		:0,
		icon		:"",
		secondIcon	:false,
		titleAlert	:""

	}
});

var OptionsModel= Backbone.Model.extend({
	defaults:{
		clasificacion		: "",					//--[1]
		background       	: "", 				  	//--[2]  Deprecated
		container        	: "#svg-map-alertas",	//--[3] Selector
		icon             	: "marker",          	//--[4] marker icon (.png)
		levelAlertTable  	: "2",					//--[5] indicator from the table is drawing
		levelAlertVisible	: "2",					//--[6] indicator from the marker is drawing
		map              	: "peru",				//--[7] map to draw
		mapType          	: "dots",				//--[8] map type [dots-icon-pulse]
		radioMarker      	: "4",					//--[9] marker radio for the pulse map type
		radioPulse       	: "20",					//--[10] marker radio for the pulse map type
		showTableInfo    	: false,				//--[11] table is drawing
		typeTableInfo		:"table",				//--[12] type table info [table,marker]
		tittleTable      	: "",	//--[13] title text map/table
		chart			 	: false,				//--[14]
		chartType		 	: "gauge",				//--[15] char type [gauge,bar]
		hasSecondMarker		: false,				//--[16] when there is a second marker
		icon2				: "marker2",          	//--[17] second icon marker (.png)
		markerType			: "icon",				//--[18] second icon marker (.png)
		classChart			: "",					//--[19] second icon marker (.png)
		titleAlert			: "",					//--[20] second icon marker (.png)
		titleAlert2			: "",					//--[21] second icon marker (.png)
		hasColorsByCountrys :false,					//--[22] color by country
		drawTop5			:true
	}
});


var GaugeModel = Backbone.Model.extend({});