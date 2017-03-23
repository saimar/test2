var pathname = window.location.pathname; // Returns path only
	pathname = pathname.substring(0,pathname.lastIndexOf('/'));
var SeguimientoAnalisisActual= function(selector,producto){
	//console.debug("SeguimientoAnalisisActual :: init()")

	//Genero un idUnico 
	var idUnico=$(selector).attr("ident");
	this.selector=$(selector).attr("id","aact_"+idUnico);
	this.selector="#"+this.selector.attr("id");

	this.dataAnalisisJSON=null;
	this.dataColoresGraficasJSON=null;
	this.dataChartOptionsJSON=null;
	this.interval=null;
	this.maxValue=0;   
	this.producto=producto;
	
	this.urlsRequest=[];
	this.hasReload=null;

	this.getData();
}
SeguimientoAnalisisActual.prototype.getData=function(){
	var self=this;

	//Se crea un objeto de la coleeccion que guardara la informacion para el renderizado
	this.queue=new QueueStatusCollection();

	this.queue.add({
		idRequest:"dataAnalisisAct",
		url:"",
		status:"200",
		time:"",
		message:"",
		reload:"",
		state:"",
		data:[],
		fechaInfo:""
	});
	this.queue.add({
		idRequest:"dataColoresGraficaAnalisisAct",
		url:"",
		status:"200",
		time:"",
		message:"",
		reload:"",
		state:"",
		data:[],
		fechaInfo:""
	});
	this.queue.add({
		idRequest:"dataChartOptionsAnalisisAct",
		url:"",
		status:"200",
		time:"",
		message:"",
		reload:"",
		state:"",
		data:[],
		fechaInfo:""
	});
	this.queue.on("add", function(data) {
		console.debug("add request ajax to collection!");
	});

	this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasControl?consulta=3&pais="+parseInt(idPais)+"&fecha="+fecha+"&producto="+this.producto+"&param1=",idRequest:"dataAnalisisAct"});
	this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=46",idRequest:"dataColoresGraficaAnalisisAct"});
	this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&chart=46&pais=0",idRequest:"dataChartOptionsAnalisisAct"});

}
SeguimientoAnalisisActual.prototype.render=function(){
	var self=this;

	//console.info(this.queue);

	if(this.queue.models.length===this.urlsRequest.length){

		_.each(this.queue.models,function(element,index){
			//console.info("*********Peticion "+index+"*********");
			if(_.findWhere(element,{idRequest:"dataAnalisisAct"})!=undefined)
				self.dataAnalisisJSON=_.findWhere(element,{idRequest:"dataAnalisisAct"}).data;
			if(_.findWhere(element,{idRequest:"dataColoresGraficaAnalisisAct"})!=undefined)	
				self.dataColoresGraficasJSON=_.findWhere(element,{idRequest:"dataColoresGraficaAnalisisAct"}).data;
			if(_.findWhere(element,{idRequest:"dataChartOptionsAnalisisAct"})!=undefined)
				self.dataChartOptionsJSON=_.findWhere(element,{idRequest:"dataChartOptionsAnalisisAct"}).data;
		});

		this.dataChartOptionsJSON=this.dataChartOptionsJSON.jsonResultTree;
		this.dataColoresGraficasJSON=this.dataColoresGraficasJSON.jsonResult;

		this.hasReload=this.dataChartOptionsJSON.options.pld.reload;;
		//Se construye el panel de 2 x 2
		if($(this.selector+" .nameScreen").length==1)
			$(this.selector).append('<div class="container-fluid background-degradado-2" style="height: 100%; padding-left: 1px; padding-right: 1px"><div class="row" style="height: 100%"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 1px; height: 100%"><div id="chart-container" style="height: 100%"></div><div id="chart-info" class="float-panel-top-left"> <table class="chart-legend-table"></table></div></div></div></div>');

		if(this.dataAnalisisJSON != undefined){
			if(this.dataAnalisisJSON.rowCount > 0){
			this.ObtenerData();


			//Selector unico 
			var $container='';
			if(typeof this.dataChartOptionsJSON.options.chart.renderTo=="string")
				$container = $(this.selector+" #"+this.dataChartOptionsJSON.options.chart.renderTo);
			else if(typeof this.dataChartOptionsJSON.options.chart.renderTo=="object")
				$container = $(this.selector+" #"+$(this.dataChartOptionsJSON.options.chart.renderTo).attr("id"));

			this.dataChartOptionsJSON.options.chart.renderTo=$container[0];

			
			this.dataChartOptionsJSON.options.title.text="";
			this.dataChartOptionsJSON.options.tooltip.pointFormat="{series.name}: <b>{point.percentage:.1f}%</b>";
			this.dataChartOptionsJSON.options.plotOptions.pie.dataLabels.enabled=true;
			this.dataChartOptionsJSON.options.plotOptions.pie.dataLabels.useHTML=true;
			this.dataChartOptionsJSON.options.plotOptions.pie.dataLabels.format= '<span class="font-style-content-pld" style="color:black" ><b>{point.name}</b>: {point.percentage:.1f} % </span>';
			this.dataChartOptionsJSON.options.plotOptions.pie.dataLabels.distance=-20;
			this.dataChartOptionsJSON.options.plotOptions.pie.size='90%';
			Math.easeOutBounce = function (pos) {
			    if ((pos) < (1 / 2.75)) {
			        return (7.5625 * pos * pos);
			    }
			    if (pos < (2 / 2.75)) {
			        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
			    }
			    if (pos < (2.5 / 2.75)) {
			        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
			    }
			    return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
			};
		
			//this.dataChartOptionsJSON.options.plotOptions.pie={size:'100%',dataLabels:{distance:0}};
			this.dataChartOptionsJSON.options.credits ={text : 'www.bancoazteca.com',href : 'http://www.bancoazteca.com.mx'};

			//--Create chart
			var myChart= new Highcharts.Chart(this.dataChartOptionsJSON.options);
			
			self.drawLegends();
		}else{
			$(this.selector+' .container-fluid').children().remove();
    			$(this.selector + ' .container-fluid').append('	<div class="row" style="height:100%;">'+
    														  '		<div class="col-md-12" style="height:100%;">'+
    														  '			<div class="row" style="height:50%;">'+
    														  '				<div class="col-md-12" style="padding-top:85px;">'+
    														  '					<center><i class="fa fa-exclamation-triangle fa-5x" style="color:#ff7800" ></i></center>'+
    														  '				</div>'+
    														  '			</div>'+
    														  '			<div class="row" style="height:50%;">'+
    														  '				<div class="col-md-12 font-style-headers-pld" style="text-align: center;">'+
    														  '					<h4>No se encuentra información para generar la gráfica</h4>'+
    														  '				</div>'+
    														  '			</div>'+
    														  '		</div>'+
    														  '	</div>');
		}
			
		}else{
    			$(this.selector + ' .container-fluid').children().remove();
    			$(this.selector + ' .container-fluid').append('	<div class="row" style="height:100%;">'+
    														  '		<div class="col-md-12" style="height:100%;">'+
    														  '			<div class="row" style="height:50%;">'+
    														  '				<div class="col-md-12" style="padding-top:85px;">'+
    														  '					<center><i class="fa fa-exclamation-triangle fa-5x" style="color:#ff7800" ></i></center>'+
    														  '				</div>'+
    														  '			</div>'+
    														  '			<div class="row" style="height:50%;">'+
    														  '				<div class="col-md-12 font-style-headers-pld" style="text-align: center;">'+
    														  '					<h4>No se encuentra información para generar la gráfica</h4>'+
    														  '				</div>'+
    														  '			</div>'+
    														  '		</div>'+
    														  '	</div>');
    		}
		

		//elimino los div con el nombre del panel
		$(this.selector+" .nameScreen").remove();

	}
}
SeguimientoAnalisisActual.prototype.ObtenerData=function(){
	var self=this;
	var data = [];
	self.maxValue=10;
	$.each(this.dataAnalisisJSON.queryResult, function(indexRow, objRow){
		if(self.maxValue < parseFloat(objRow.fields[(objRow.fields.length)-1]) ){
			self.maxValue = parseFloat(objRow.fields[(objRow.fields.length)-1] ) *1.1;
		}

		data.push({
			name: objRow.fields[1],
			y: objRow.fields[(objRow.fields.length)-1],
			color:self.dataColoresGraficasJSON[objRow.fields[0]-1].color,
			highlight: "#681D81",
		});
	});
	this.dataChartOptionsJSON.options.series[0].animation.duration=parseInt(this.dataChartOptionsJSON.options.series[0].animation.duration);
	this.dataChartOptionsJSON.options.series[0].data=data;
}

SeguimientoAnalisisActual.prototype.drawLegends=function(){
	var self=this;
	//-- draw own legends
	$(self.selector+" .chart-legend-table").children().remove();
	var liAppend ="";
	$.each(this.dataAnalisisJSON.queryResult, function(indexRow, objRow){
		liAppend +='<tr>';
		liAppend +='<td class="chart-legend-text font-style-content-pld"> <span id="val-'+objRow.fields[0]+'" class="badge" style="background-color:'+self.dataColoresGraficasJSON[(objRow.fields[0])-1].color+'" >'+$.number(objRow.fields[(objRow.fields.length)-1],0)+'</span></td>';
		liAppend +='<td class="chart-legend-text font-style-content-pld">'+objRow.fields[1]+'</td> ';
		liAppend +='<tr>';
	});
	$(self.selector+" .chart-legend-table").append(liAppend);

	//--Animate legend
	var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
	$.each(this.dataAnalisisJSON.queryResult, function(indexRow, objRow){
		$(self.selector+' #val-'+objRow.fields[0]+'').animateNumber({
			number: objRow.fields[(objRow.fields.length)-1],
			numberStep: comma_separator_number_step,
		}, 800);
	});
}

SeguimientoAnalisisActual.prototype.reloadChart=function(){
	console.debug("Begin reloadChart :: SeguimientoAnalisisActual");
	var self=this;
	/**BORRAR***/
	this.dataChartOptionsJSON.options.pld.reload=true;
	this.dataChartOptionsJSON.options.pld.timeReload=1800;
	//--Reload data
	if(this.dataChartOptionsJSON.options.pld.reload && self.interval==null){
		self.interval=setInterval(function () {
			//self.getData();
			//alert("Reload");
			/*var admin =new CarouselAdministrator();
    	clearInterval(self.interval);
    	admin.add(new SeguimientoAnalisisActual(".renderChart",self.queue));
    	admin.load();
			 */
		},this.dataChartOptionsJSON.options.pld.timeReload);
	}
}

SeguimientoAnalisisActual.prototype.destruir=function(){
	console.debug("Destoying objects :: Seguimiento Analisis Actual");
	this.dataAnalisisJSON=null;
	this.dataColoresGraficasJSON=null;
	this.dataChartOptionsJSON=null;

	clearInterval(this.interval);
	this.interval=null;

}

SeguimientoAnalisisActual.prototype.msjError=function(error){
	$(this.selector).empty();
	$(this.selector).append('	<div class="row" style="height:100%;">'+
							'		<div class="col-md-12" style="height:100%;">'+
							'			<div class="row" style="height:50%;">'+
							'				<div class="col-md-12" style="padding-top:85px;">'+
							'					<center><i class="fa fa-exclamation-triangle fa-5x" style="color:#ff7800" ></i></center>'+
							'				</div>'+
							'			</div>'+
							'			<div class="row" style="height:50%;">'+
							'				<div class="col-md-12 font-style-headers-pld" style="text-align: center;">'+
							'					<h4>No se encuentra información para generar la gráfica</h4>'+
							'				</div>'+
							'			</div>'+
							'		</div>'+
							'	</div>');
	//elimino los div con el nombre del panel
	$(this.selector+" .nameScreen").remove();
}
