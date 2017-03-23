var AdministradorCarousel=function(){
	var self=this;
	console.debug("Lauching Carousel");
	//Programming Event play for carousel
	$('.btnPlay').click(function () {
		console.debug('play');
		self.playInterval = self.playCarousel();
	});
	
	//Programming Event play for carousel
	$('.btnPause').click(function () {
		console.debug('pause');
		clearInterval(self.playInterval);
	});
	
	//Programming Event backward for carousel
	$('.btnBackward').click(function () {
		console.debug('backward');
		clearInterval(self.playInterval);
		self.idPanel--;
		if(self.idPanel<0){
			self.idPanel=self.carousel.length-1;
			
			//Se eliminan todas las referencias al vTicker
			self.dropVTickerEvents();
			self.destruirObjetos();
			self.admin =new CarouselAdministrator();
			
			self.getChartNames();
			self.admin.load();
		}else{
			//Se eliminan todas las referencias al vTicker
			self.dropVTickerEvents();
			
			self.destruirObjetos();
			self.admin =new CarouselAdministrator();
			
			self.getChartNames();
			self.admin.load();
		}
	});
	
	//Programming Event forward for carousel
	$('.btnForward').click(function () {
		console.debug('forward');
		clearInterval(self.playInterval);
		self.idPanel++;
		if(self.idPanel<=self.carousel.length-1){
			
			
			//Se eliminan todas las referencias al vTicker
			self.dropVTickerEvents();
			
			self.destruirObjetos();
			self.admin =new CarouselAdministrator();
			
			self.getChartNames();
			self.admin.load();
		}else if( self.idPanel>self.carousel.length-1){
			self.idPanel=0;
			//Se eliminan todas las referencias al vTicker
			self.dropVTickerEvents();
			
			self.destruirObjetos();
			self.admin =new CarouselAdministrator();
			
			self.getChartNames();
			self.admin.load();
		}
	});
	
	this.idPanel=0;
	this.carousel=null;
	this.playInterval=null;
	this.admin = null;
	this.init();
}
AdministradorCarousel.prototype.destruirObjetos=function(){
	var self=this;
	//Se ejecutan los metodos destruir
	_.each(self.admin.items, function(item,indx){
		item.destruir();
		for (key in item){  
			delete item[key];
		}
		delete item;
	});
}

AdministradorCarousel.prototype.init=function(){
	var self=this;
	$.ajax({	
		url : "restModuloCentroMonitoreo/cosulta/panelAplicacion",
		datType : "JSON",
		timeout: 5000 
	}).success(function( data, textStatus, jqXHR ) {
		self.carousel=data;
		self.admin =new CarouselAdministrator();
		
		if(self.carousel.length>0){
			self.getChartNames();
			// lanza las cuatro graficas
			self.admin.load();
			
			self.playInterval = self.playCarousel();
			console.debug(self.playInterval);
		}
	}).fail(function() {
			$(".dynamicChartContainer > div.contenedor").append('	<div class="row" style="height:100%;">'+
					  '		<div class="col-md-12" style="height:100%;">'+
					  '			<div class="row" style="height:50%;">'+
					  '				<div class="col-md-12" style="padding-top:85px;">'+
					  '					<center><i class="fa fa-exclamation-triangle fa-5x" style="color:#ff7800" ></i></center>'+
					  '				</div>'+
					  '			</div>'+
					  '			<div class="row" style="height:50%;">'+
					  '				<div class="col-md-12 font-style-headers-pld" style="text-align: center;">'+
					  '					<h4>No se pudo cargar el dashboard</h4>'+
					  '				</div>'+
					  '			</div>'+
					  '		</div>'+
					  '	</div>')
	});
}

AdministradorCarousel.prototype.getChartNames=function(){
	var self=this;
	$("div.contenedor").append(this.carousel[this.idPanel].data);

	//Get atribute screen & render Chart
	$(".dynamicChartContainer div[screen]").each(function(indx,item){
		//Hide nameScreen Panel
		$("div.nameScreen").hide();
		self.genereteObjectChart($(this).attr("screen"),$(item).attr("ident"),self.carousel[self.idPanel].producto);
	});
}

AdministradorCarousel.prototype.genereteObjectChart=function(nameChart,identificador,producto){
	var self=this;
	if(nameChart=="mps"){
		//grafica 1	   
		this.admin.add(new Mapas(".dynamicChartContainer div[screen=mps][ident='1']",['MapaListas','MapaElectoral'],producto));
	}else if(nameChart=="pv"){
		//grafica 2
		var item=jQuery('.dynamicChartContainer div[screen=pv][ident="2"]')
		this.admin.add(new Proveedores(item[0],producto));
	}else if(nameChart=="cc"){
		//grafica 3
		var item=jQuery('.dynamicChartContainer div[screen=cc][ident="3"]')
		this.admin.add(new CifrasControl(item[0],producto)); 
	}else if(nameChart=="sa"){
		//grafica 4
		var item=jQuery('.dynamicChartContainer div[screen=sa][ident="4"]')
		this.admin.add(new SeguimientoAnalisisActual(item[0],producto));
	}
}

AdministradorCarousel.prototype.dropVTickerEvents=function(){
	_.each($('.dynamicChartContainer div[screen=cc] #vt'),function(item,indx){ 
		$(item).vTicker("remove");
	});
	_.each($("div#vt-peps-electorales"),function(item,indx){ 
		$(item).vTicker("remove");
	});

	_.each($("div#vt-datos-electorales"),function(item,indx){ 
		$(item).vTicker("remove");
	});
	_.each($("#svg-map-listas .maps-ln #vt"),function(item,indx){ 
		$(item).vTicker("remove");
	});

	//Se limpia el elemento donde se renderizan los items
	$("div.contenedor").empty();
}

AdministradorCarousel.prototype.playCarousel=function(){
	var self=this;
	return setInterval(function(){
		console.debug("Interval");
		
		//Se eliminan todas las referencias al vTicker
		self.dropVTickerEvents();
		
		//Se ejecutan los metodos destruir
		_.each(self.admin.items, function(item,indx){
		  item.destruir();
		  for (key in item){  
	          delete item[key];
	      }
	      delete item;
	    });
		
		self.admin =new CarouselAdministrator();
						
		self.idPanel++;
		if(self.idPanel===self.carousel.length){
			self.idPanel=0;
			
			self.getChartNames();
		
			// lanza las cuatro graficas
			 self.admin.load();
		}else{
			self.getChartNames();
		
			// lanza las cuatro graficas
			 self.admin.load();
		}
		
	}, 30000);
}
AdministradorCarousel.prototype.destroy=function(){
	console.debug("Destroying instance...")
	this.idPanel=0;
	this.carousel=null;
	clearInterval(this.playInterval);
	this.playInterval=null;
	this.admin = null;
}