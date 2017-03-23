var ScheduleBuildCarousel=function(panels,carouselCollectionRequest){
	var self=this;
	this.selector=null;

	this.panelsCollection=new PanelsCollection(panels);
	this.carouselCollection=new CarouselCollection(carouselCollectionRequest);
	this.chartsToRenderCollection=null;
	this.charts=[];
	this.position=0;
	this.playInterval=null;
	this.admin =new CarouselAdministrator();

	//AutoPaly
	self.animationPlay();

	$(".cubierta").addClass("opacity-in");
	this.renderItem();

	$(".btnBackward").click(function(){
		//Press Effect
		//Activate
		$(".btnBackward").addClass("hoverEffect");
		$(".btnBackward").attr("disabled", true);

		//Desactivate
		$(".btPlay").removeClass("hoverEffect");

		self.animationPause();

		if(self.position>0){
			self.position--;
		}else {
			self.position=self.carouselCollection.length-1;
		}
		self.animationCoverEffect();
	});

	$(".btnForward").click(function(){
		//Press Effect
		//Activate
		$(".btnForward").addClass("hoverEffect");
		$(".btnForward").attr("disabled", true);

		//Desactivate
		$(".btnPlay").removeClass("hoverEffect");

		self.animationPause();

		if(self.position<=self.carouselCollection.length-1){
			self.position++;
			if(self.position===self.carouselCollection.length){
				window.setTimeout(function(){location.reload()}, 2000);
			}
		}else{
			self.position=0;
		}

		self.animationCoverEffect();

		//self.animationPlay();
	});

	$(".btnPlay").click(function(){
		//Press Effect
		//Desactivate  
		$(".btnPause").removeClass("hoverEffect");
		self.animationPlay();
	});

	$(".btnPause").click(function(){
		//Press Effect
		//Desactivate
		$(".btnPlay").removeClass("hoverEffect");
		//Activate
		$(".btnPause").addClass("hoverEffect");

		self.animationPause();
	});
}
ScheduleBuildCarousel.prototype.animationCoverEffect=function(){
	var self=this;
	$(".cubierta").addClass("opacity-out");
	
	$("#fountainTextG").fadeIn(2000);

	var waitingInterval = setTimeout(showChartEfect, 2000);

	function showChartEfect() {

		$(".cubierta").removeClass("opacity-out");
		$(".cubierta").addClass("opacity-in");
		
		//Genero el item anterior
		self.renderItem();
		
		//Reactivated ctrl
		$(".btnForward").attr("disabled", false);
		$(".btnBackward").attr("disabled", false);


		//Clear interval
		clearTimeout(waitingInterval);
	}
}
ScheduleBuildCarousel.prototype.renderItem=function(){
	var self=this;
	
	//Se ejecutan los metodos destruir
	_.each(self.admin.items, function(item,indx){
	  item.destruir();
	});
	
	self.admin.cleanIntervalAdmin();
	self.admin =new CarouselAdministrator();

	//console.info("clearInterval Cifras Control");
	_.each($('.dynamicChartContainer div[screen=cc] #vt'),function(item,indx){ 
		$(item).vTicker("remove");
	})

	_.each($('.dynamicChartContainer div[screen=ind] #vt-ind'),function(item,indx){ 
		$(item).vTicker("remove");
	})

	//console.info("Stop Carousel Maps");
	$('.dynamicChartContainer div[screen=mps] #myCarousel').carousel('pause');

	$(".dynamicChartContainer").empty();

	//Se ponen en un input text hidden el idPais que se obtiene de la base de datos y que es pasado a una coleccion
	$(".dynamicChartContainer").append('<div class="item_'+this.position+'" style="height:100%">'+this.panelsCollection.findWhere({namePanel:self.carouselCollection.findWhere({position:self.position}).get("namePanel")}).get("data")+'</div><input id="idPais" type="hidden" value="'+self.carouselCollection.findWhere({position:self.position}).get("IdPais")+'">');

	//Se genera un padding para el panel
	var padding=$(".item_"+this.position).children().children();
	//For the columns
	_.each(padding.children(),function(cols,indx){
		$(cols).css("padding","0.5px");
		$(cols).css("background-color","rgb(80, 80, 80)");
		//For the rows
		_.each($(cols).children(),function(rows,indx){
			$(rows).css("padding","1px");
			$(rows).css("background-color","rgb(80, 80, 80)");
		});
	});
	
	var pathname = window.location.pathname; // Returns path only
	pathname = pathname.substring(0,pathname.lastIndexOf('/'));
	
	//Se agrega la bandera del pais a la barra de navegacion
	$.ajax({
		url:pathname+"/restModuloCentroMonitoreo/consulta/paisesImagenes",
		datType:"JSON",
		success : function(data) {
			//console.log("data",data);
			options=JSON.parse(JSON.stringify(data));
			$(".icon").empty();
			options.jsonResult.forEach(function(item,index){
				if(item.IdPais==parseInt(self.carouselCollection.findWhere({position:self.position}).get("IdPais")))
					$(".icon").append('<div class="col-md-6  col-md-6 col-sm-6 "><label class="footerChart">@Copyright BancoAzteca.com</label></div><div class="col-md-6  col-md-6 col-sm-6 "><img id="imgPais" class="animated bounceIn" src="../resources/img/paises/carousel/'+normalize(item.Descripcion)+'.png" ></div>');
			});
		},
		error : function(objXMLHttpRequest) {
			console.log("Ha ocurrido un Error",objXMLHttpRequest);
		}
	});



	//Remove Panel Name
	$(".dynamicChartContainer .hvr-sweep-to-right").remove();

	//Get atribute screen & render Chart
	$(".dynamicChartContainer div[screen]").each(
			function(indx,item){
				//Hide nameScreen Panel
				$("div.nameScreen").hide();
				self.renderChart($(this).attr("screen"),$(item).attr("ident"));
			}
	);

	//Ejecuto los metodos de renderizado por cada instancia guardada en el Administrador de Carousels
	this.charts.push(this.admin);
	this.admin.load();

}
ScheduleBuildCarousel.prototype.renderChart=function(nameChart,identificador){
	if($('.dynamicChartContainer div[screen='+nameChart+']').length>0){
		if(nameChart=="sa"){
			//this.charts.push(new SeguimientoAnalisis(".dynamicChartContainer div[screen=sa]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new SeguimientoAnalisis($item[0]));
		}
		if(nameChart=="pv"){
			/*var selector=".dynamicChartContainer div[screen=pv]";

			if($(selector+" .nameScreen").length==1)
				$(selector).append('<div id="container" class="container-fluid background-linear-gradient" style="height: 100%;color: #fff;padding:0px !important"></div>');

			this.charts.push(new ProveedoresAppView());*/
			
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new Proveedores($item[0]));
		}
		if(nameChart=="cp"){
			//this.charts.push(new CifrasProducto(".dynamicChartContainer div[screen=cp]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new CifrasProducto($item[0]));
		}
		if(nameChart=="pr"){
			//this.charts.push(new PlanesRemediacion(".dynamicChartContainer div[screen=pr]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new PlanesRemediacion($item[0]));
		}
		if(nameChart=="dl"){
			//this.charts.push(new DeteccionListas(".dynamicChartContainer div[screen=dl]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new DeteccionListas($item[0]));
		}
		if(nameChart=="mrn"){
			//this.charts.push(new MatrizRiesgoNivel(".dynamicChartContainer div[screen=mrn]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new MatrizRiesgoNivel($item[0]));
		}
		if(nameChart=="mrs"){
			//this.charts.push(new MatrizRiesgoStatus(".dynamicChartContainer div[screen=mrs]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new MatrizRiesgoStatus($item[0]));
		}
		if(nameChart=="mrtp"){
			//this.charts.push(new MatrizRiesgoTipoPersona(".dynamicChartContainer div[screen=mrtp]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new MatrizRiesgoTipoPersona($item[0]));
		}
		if(nameChart=="mro"){
			//this.charts.push(new MatrizRiesgoOperaciones(".dynamicChartContainer div[screen=mro]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new MatrizRiesgoOperaciones($item[0]));
		}
		if(nameChart=="in"){
			//this.charts.push(new Incidencias(".dynamicChartContainer div[screen=in]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new Incidencias($item[0]));
		}
		if(nameChart=="ind"){
			//this.charts.push(new Induccion(".dynamicChartContainer div[screen=ind]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new Induccion($item[0]));
		}
		if(nameChart=="peps"){
			//this.charts.push(new PEPS(".dynamicChartContainer div[screen=peps]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new PEPS($item[0]));
		}

		if(nameChart=="intInd"){
			this.charts.push(new PagosInternacionalesIndicadores(".dynamicChartContainer div[screen=intInd]"));
		}

		if(nameChart=="inter"){
			this.charts.push(new PagosInternacionales(".dynamicChartContainer div[screen=inter]"));
		}

		if(nameChart=="cc"){
			//this.charts.push(new CifrasControl(".dynamicChartContainer div[screen=cc]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new CifrasControl($item[0]));
		}
		if(nameChart=="aact"){
			//this.charts.push(new SeguimientoAnalisisActual(".dynamicChartContainer div[screen=aact]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new SeguimientoAnalisisActual($item[0]));
		}
		if(nameChart=="aa"){
			//this.charts.push(new SeguimientoAnalisisAnual(".dynamicChartContainer div[screen=aa]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new SeguimientoAnalisisAnual($item[0]));
		}
		if(nameChart=="mrp"){
			//this.charts.push(new MatrizRiesgoPorcentaje(".dynamicChartContainer div[screen=mrp]"));.
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new MatrizRiesgoPorcentaje($item[0]));
		}
		if(nameChart=="cap"){
			//this.charts.push(new Capacitacion(".dynamicChartContainer div[screen=cap]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new Capacitacion($item[0]));
		}
		if(nameChart=="time"){
			//this.charts.push(new Time(".dynamicChartContainer div[screen=time]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new Time($item[0]));
		}
		if(nameChart=="mps"){
			//this.charts.push(new Mapas(".dynamicChartContainer div[screen="+nameChart+"][ident='"+identificador+"']",['MapaAlerta','MapaReporte','MapaListas','MapaPEPS','MapaMREstado','MapaMRInaceptables','MapaMRAltoRiesgo','MREstado','MapaCapacitacion']));
			this.admin.add(new Mapas(".dynamicChartContainer div[screen="+nameChart+"][ident='"+identificador+"']",['MapaAlerta','MapaReporte','MapaListas','MapaPEPS','MapaMREstado','MapaMRInaceptables','MapaMRAltoRiesgo','MREstado','MapaCapacitacion']));
		}
		if(nameChart=="mpsAlms"){
			// this.charts.push(new Mapas(".dynamicChartContainer div[screen=mpsAlms]",['MapaAlerta','MapaReporte']));
			this.admin.add(new Mapas(".dynamicChartContainer div[screen="+nameChart+"][ident='"+identificador+"']",['MapaAlerta','MapaReporte']));
		}
		if(nameChart=="mpsCap"){
			//this.charts.push(new Mapas(".dynamicChartContainer div[screen=mpsCap]",['MapaCapacitacion']));
			this.admin.add(new Mapas(".dynamicChartContainer div[screen="+nameChart+"][ident='"+identificador+"']",['MapaCapacitacion']));
		}
		if(nameChart=="mpsLts"){
			// this.charts.push(new Mapas(".dynamicChartContainer div[screen=mpsLts]",['MapaListas','MapaPEPS']));
			this.admin.add(new Mapas(".dynamicChartContainer div[screen="+nameChart+"][ident='"+identificador+"']",['MapaListas','MapaPEPS']));
		}
		if(nameChart=="mpsRsg"){
			//this.charts.push(new Mapas(".dynamicChartContainer div[screen=mpsRsg]",['MapaMREstado','MapaMRInaceptables','MapaMRAltoRiesgo','MREstado']));
			this.admin.add(new Mapas(".dynamicChartContainer div[screen="+nameChart+"][ident='"+identificador+"']",['MapaMREstado','MapaMRInaceptables','MapaMRAltoRiesgo','MREstado']));
		}
		if(nameChart=="expHist"){
			//this.charts.push(new SeguimientoAnalisisActual(".dynamicChartContainer div[screen=aact]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new expHistograma($item[0]));
		}
		if(nameChart=="expUSD"){
			//this.charts.push(new SeguimientoAnalisisActual(".dynamicChartContainer div[screen=aact]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new ExportacionUSD($item[0]));
		}
		if(nameChart=="expLAM"){
			//this.charts.push(new SeguimientoAnalisisActual(".dynamicChartContainer div[screen=aact]"));
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new ExportacionLAM($item[0]));
		}
		if(nameChart=="cr"){
			//Se agrega el contenedor de la grafica
			/*var selector=".dynamicChartContainer div[screen=cr]";

      		if($(selector+" .nameScreen").length==1)
        		$(selector).append('<div class="container-fluid background-linear-gradient" style="height: 100%; padding-left: 1px; padding-right: 1px"><div class="row" style="height: 100%"><div id="mainColCR" class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 1px; height: 100%"><table id="tbl_info" class="table " style="text-align: left; height: 95%; background-color: transparent;color:#fff"><thead><tr id="tbl-info-tb-tr"><th class="font-sub-header" style="text-align: center;">Reporte</th><th class="font-sub-header" style="text-align: center;">Estatus</th>	<th class="font-sub-header" style="text-align: center;">Porcentaje</th></tr></thead><tbody id="tbl-inf-tb"></tbody><tfoot id="tf-info"><tr><td id="tf-td-info" colspan="4" style="text-align: left;height:45px"><table id="banner"	style="width: 100%; height: 100%; text-align: center; vertical-align: middle; background-color: transparent;"><tr><td><div id="text-banner" class="font-banner banner-static"></div></td></tr></table></td></tr></tfoot></table></div></div></div>');

      		$("#mainColCR").niceScroll({cursorcolor:"#556E88"});

      		this.charts.push(new CifrasReporteAppView());*/
			var $item=$('.dynamicChartContainer div[screen='+nameChart+'][ident="'+identificador+'"]')
			this.admin.add(new CifrasReporte($item[0]));
		}
		//eliminamos el borde para todos los div cuya clase es end-carousel
		$(".dynamicChartContainer div.end-carousel").css("border-style", "none");

	}

}

ScheduleBuildCarousel.prototype.animationPlay=function(){
	var self=this;

	//Se ejecutan los metodos destruir
	_.each(self.admin.items, function(item,indx){
	  item.destruir();
	});
	
	this.admin.cleanIntervalAdmin();
	this.admin =new CarouselAdministrator();

	console.info("Play");
	$(".btnPlay").addClass("hoverEffect");
	$(".btnPlay").attr("disabled", true);

	$(".btnPause").removeClass("hoverEffect");
	$(".btnPause").attr("disabled", false);

	this.playInterval = setInterval(function(){
		if(self.position<=self.carouselCollection.length-1){
			self.position++;
		}else{
			self.position=0;
		}

		if(self.position===self.carouselCollection.length){
			window.setTimeout(function(){location.reload()}, 2000);
		}
		
		self.animationCoverEffect();

		//Limpio el intervalo de la posicion anterior
		self.animationPause();

		//Recursividad para generar nuevo intervalo
		self.animationPlay();

	}, self.carouselCollection.findWhere({position:self.position}).get("duration"));
}
ScheduleBuildCarousel.prototype.animationPause=function(){
	console.info("Pause");
	//Activate
	$(".btnPause").addClass("hoverEffect");
	$(".btnPause").attr("disabled", true);

	//Desactivate
	$(".btnForward").removeClass("hoverEffect");
	$(".btnBackward").removeClass("hoverEffect");
	$(".btnPlay").attr("disabled", false);


	clearInterval(this.playInterval);
}

var normalize = (function() {
	  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
	      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
	      mapping = {};
	 
	  for(var i = 0, j = from.length; i < j; i++ )
	      mapping[ from.charAt( i ) ] = to.charAt( i );
	 
	  return function( str ) {
	      var ret = [];
	      for( var i = 0, j = str.length; i < j; i++ ) {
	          var c = str.charAt( i );
	          if( mapping.hasOwnProperty( str.charAt( i ) ) )
	              ret.push( mapping[ c ] );
	          else
	              ret.push( c );
	      }      
	      return ret.join( '' );
	  }
	 
	})();