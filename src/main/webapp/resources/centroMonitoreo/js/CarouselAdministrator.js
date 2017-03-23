var  CarouselAdministrator= function() {
	var self=this;
	this.instanceObj=null;
	this.items=[];
	this.idRequest=0;
	this.start_time=0;
	this.url="";
	this.xhrStatus="";
	this.timeResponse=0;
	this.messageText="";
	this.response=null;
	//this.i=1;
	this.ajax=[];
	this.intervalReload=null;
	this.ajaxCount=0;
}

CarouselAdministrator.prototype.add = function(obj){ 
	self.idRequest++;
	this.items.push(obj);
}

CarouselAdministrator.prototype.load = function(){
	var self=this;

	this.items.forEach(function(item,idx){
		//console.info(item)
		/* _.each(item.urlsRequest,function(url,index2){
			  self.sendPeticion(url);  
	  });*/
		_.each(item.urlsRequest,function(item2,index2){
			self.buildPeticion(item2.url,item2.idRequest);  
			self.idRequest++;
		});
		
		/*console.info("finish");
		console.info(self.ajax);
		
		if(item instanceof Mapas)
			self.executePeticionsMps(item,self.ajax);
		else*/
			self.executePeticions(item,self.ajax);
		
	});
}	

CarouselAdministrator.prototype.loadIndividual = function(){
	var self=this;

	this.items.forEach(function(item,idx){
		_.each(item.urlsRequest,function(item2,index2){
			self.buildPeticion(item2.url,item2.idRequest);  
			self.idRequest++;
		});
		
		self.executePeticionsIndividual(item,self.ajax);
	});
}	

CarouselAdministrator.prototype.buildPeticion=function(urlsSend,id){
	var self=this;
	start_time=0;
	self.ajax.push($.ajax({	
		url : urlsSend,
		datType : "JSON",
		timeout: 60000, 
		async: true,
		beforeSend: function (request, settings) {
			//--200  
			self.items.forEach(function(item,idx){
				_.each(item.queue.models,function(element,index){
					var ajaxPetition=_.findWhere(element,{idRequest:id});
					if(ajaxPetition!=undefined){
						if(ajaxPetition.status==="200"){
							//console.debug("The ajax request is avalible for "+ id + " url: "+urlsSend);
						}
					}
				});
			});
			//--102
			self.items.forEach(function(item,idx){
				_.each(item.queue.models,function(element,index){
					var ajaxPetition=_.findWhere(element,{idRequest:id});
					if(ajaxPetition!=undefined){
						if(ajaxPetition.status==="102"){
							//console.debug("¡Warning! the ajax request isn't avalible for "+ id + " url: "+urlsSend);
							console.debug("Aborting request...");
							request.abort();
							console.debug("¡Cancelled!");
						}
					}
				});
			});
			//--100
			self.items.forEach(function(item,idx){
				_.each(item.queue.models,function(element,index){
					var ajaxPetition=_.findWhere(element,{idRequest:id});
					if(ajaxPetition!=undefined){
						if(ajaxPetition.status==="100"){
							//console.debug("¡Warning! the ajax request isn't avalible for "+ id + " url: "+urlsSend);
							console.debug("Request empty...");
						}
					}
				});
			});
			//Fecha que controla el tiempo de la peticion
			start_time = new Date().getTime();
		},
		success : function(data,state,xhr) {
			if(xhr.readyState !=3){
				self.idResponse=id;
				self.response=JSON.parse(JSON.stringify(data));
				self.xhrStatus=data.state.statuCode!="REQUEST_TIMEOUT"?xhr.status:"400";
				self.timeResponse=(new Date().getTime() - start_time);
				self.messageText=xhr.statusText;
				self.state=data.rowCount<=0?"La consulta a la fuente no arrojo información para para generar la gráfica":"200:¡Completed! Load data ";
				self.updateDataObject();
			}
			
		},
		complete:function(xhr,state){
			//console.info("ESTADO "+self.i+" >>>>>>>>>>>>>>");
			//console.info(xhr.readyState);
			if(xhr.readyState==0){
				console.info("Cancelled");
				console.info(urlsSend);
				if($("div.end-carousel > .nameScreen").length>0){
					$("div.end-carousel > .nameScreen").parent().append('<div class="rowFlx container-fluid background-degradado-2" style="height: 100%;">'+
							'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0px;margin: 0px;height: 100%;">'+
							'	<div class="row">'+
							'		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-offset-3 col-sm-offset-3 col-md-offset-3col-lg-offset-3">'+
							'			<i class="fa fa-exclamation-triangle fa-6"></i>'+
							'		</div>'+
							'	</div>'+
							'	<div class="row">'+
							'		<div class="row col-lg-12 col-md-12 col-sm-12 col-xs-offset-3 col-sm-offset-3 col-md-offset-3col-lg-offset-3">'+
							'			<label>La peticion al recurso: "'+urlsSend+'" No ha sido respondida por el servidor. Por lo que fue cancelada</label>'+
							'		</div>'+
							'	</div>'+
							'</div>'+
							'</div>');
					$("div.end-carousel > .nameScreen").remove();
				}
				
			}
		},
		error:function (xhr, ajaxOptions, thrownError){
			switch (xhr.status) {

			case 404:
				self.idResponse=id;
				self.response=[];
				self.xhrStatus=xhr.status;
				self.timeResponse=(new Date().getTime() - start_time);
				self.messageText=xhr.statusText;
				self.state="¡Warning! Código de error "+xhr.status+": El recurso no esta disponible";
				self.updateDataObject();
				//clearInterval(self.intervalReload);
				break;

			case 0:
				self.idResponse=id;
				self.response=[];
				self.xhrStatus=xhr.status;
				self.timeResponse=(new Date().getTime() - start_time);
				self.messageText=xhr.statusText;
				self.state="¡Warning! Código de error "+xhr.status+": La peticion no ha sido respondida por el servidor";
				self.updateDataObject();
				clearInterval(self.intervalReload);
				break;
			default:
				self.idResponse=id;
		 		self.response=[];
		 		self.xhrStatus=xhr.status;
		 		self.timeResponse=(new Date().getTime() - start_time);
		 		self.messageText=xhr.statusText;
		 		self.state="¡Warning! Código de error "+xhr.status+": Ha ocurrido un error en el servidor ";
		 		self.updateDataObject();
		 		clearInterval(self.intervalReload);
		 		break;
			}
		}
	}));
}

CarouselAdministrator.prototype.updateDataObject=function(){
	var self=this;
	//console.info("debug");
	this.items.forEach(function(item,idx){
		item.queue.fetch({
			idRequest:self.idResponse,
			url:self.url,
			status:self.xhrStatus,
			time:self.timeResponse,
			message:self.messageText,
			reload:true,
			state:self.state,
			data:self.response,
			fechaInfo:new Date()
		});
	});
	//console.info("Termina guardado de la peticion");
}

CarouselAdministrator.prototype.executePeticions=function(item,ajaxRequests){
	var self=this;
	var timeOut=false;
	console.debug("Programming Peticion...");

	$.when.apply($,ajaxRequests).then(
			function(){
				console.debug("Executed!!!");
				$("#fountainTextG").fadeOut(60000);
				
				_.each(item.queue.models,function(element,index){
					if(parseInt(element.get("status"))!=400 && !timeOut){
						if(index==(item.queue.models.length-1)){
							item.render();
							if(item.hasReload){
								self.reloadDataObjects();
							}
						}
					}else{
						item.msjError("La peticion ha superado el tiempo de espera");
						timeOut=true;
					}
				});
				
				$(".jvectormap-label").remove();
			},function(){
						console.debug("Failure!!!");
						$("#fountainTextG").fadeOut(60000);
						
						_.each(item.queue.models,function(element,index){
							if(parseInt(element.get("status"))===404){
								item.msjError("El recurso Solicitado no esta disponible");
								timeOut=true;
							}else{
								if(index==item.queue.models.length-1){
									item.render();
									if(item.hasReload){
										self.reloadDataObjects();
									}	
								}
							}
						});
			});	
	self.ajax=[];
}


CarouselAdministrator.prototype.executePeticionsIndividual=function(item,ajaxRequests){
	var self=this;
	var timeOut=false;
	console.debug("Programming Peticion...");
	
	$.when.apply($,ajaxRequests).done(
			function(){
				console.debug("Executed!!!");
				
					  //Individual
					  $(document).ajaxSuccess(function() {
								_.each(item.queue.models,function(element,index){
										if(element.get("status")!="400" && !timeOut){
											if(index==item.queue.models.length-1){
												item.render();
												if(item.hasReload){
													self.reloadDataObjects();
												}	
											}
										}else{
											item.msjError("La peticion ha superado el tiempo de espera");
											timeOut=true;
										}
								});
						});
			});	
			self.ajax=[];
}
CarouselAdministrator.prototype.buildPeticion=function(urlsSend,id){
	var self=this;
	start_time=0;
	self.ajax.push($.ajax({	
		url : urlsSend,
		datType : "JSON",
		timeout: 60000, 
		async: true,
		beforeSend: function (request, settings) {
			//--200  
			self.items.forEach(function(item,idx){
				_.each(item.queue.models,function(element,index){
					var ajaxPetition=_.findWhere(element,{idRequest:id});
					if(ajaxPetition!=undefined){
						if(ajaxPetition.status==="200"){
							//console.debug("The ajax request is avalible for "+ id + " url: "+urlsSend);
						}
					}
				});
			});
			//--102
			self.items.forEach(function(item,idx){
				_.each(item.queue.models,function(element,index){
					var ajaxPetition=_.findWhere(element,{idRequest:id});
					if(ajaxPetition!=undefined){
						if(ajaxPetition.status==="102"){
							//console.debug("¡Warning! the ajax request isn't avalible for "+ id + " url: "+urlsSend);
							console.debug("Aborting request...");
							request.abort();
							console.debug("¡Cancelled!");
						}
					}
				});
			});
			//--100
			self.items.forEach(function(item,idx){
				_.each(item.queue.models,function(element,index){
					var ajaxPetition=_.findWhere(element,{idRequest:id});
					if(ajaxPetition!=undefined){
						if(ajaxPetition.status==="100"){
							//console.debug("¡Warning! the ajax request isn't avalible for "+ id + " url: "+urlsSend);
							console.debug("Request empty...");
						}
					}
				});
			});
			//Fecha que controla el tiempo de la peticion
			start_time = new Date().getTime();
		},
		success : function(data,state,xhr) {
			if(xhr.readyState !=3){
				self.idResponse=id;
				self.response=JSON.parse(JSON.stringify(data));
				self.xhrStatus=data.state.statuCode!="REQUEST_TIMEOUT"?xhr.status:"400";
				self.timeResponse=(new Date().getTime() - start_time);
				self.messageText=xhr.statusText;
				self.state=data.rowCount<=0?"La consulta a la fuente no arrojo información para para generar la gráfica":"200:¡Completed! Load data ";
				self.updateDataObject();
			}
			
		},
		complete:function(xhr,state){
			//console.info("ESTADO "+self.i+" >>>>>>>>>>>>>>");
			//console.info(xhr.readyState);
			if(xhr.readyState==0){
				console.info("Cancelled");
				console.info(urlsSend);
				if($("div.end-carousel > .nameScreen").length>0){
					$("div.end-carousel > .nameScreen").parent().append('<div class="rowFlx container-fluid background-degradado-2" style="height: 100%;">'+
							'<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0px;margin: 0px;height: 100%;">'+
							'	<div class="row">'+
							'		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-offset-3 col-sm-offset-3 col-md-offset-3col-lg-offset-3">'+
							'			<i class="fa fa-exclamation-triangle fa-6"></i>'+
							'		</div>'+
							'	</div>'+
							'	<div class="row">'+
							'		<div class="row col-lg-12 col-md-12 col-sm-12 col-xs-offset-3 col-sm-offset-3 col-md-offset-3col-lg-offset-3">'+
							'			<label>La peticion al recurso: "'+urlsSend+'" No ha sido respondida por el servidor. Por lo que fue cancelada</label>'+
							'		</div>'+
							'	</div>'+
							'</div>'+
							'</div>');
					$("div.end-carousel > .nameScreen").remove();
				}
				
			}
		},
		error:function (xhr, ajaxOptions, thrownError){
			switch (xhr.status) {

			case 404:
				self.idResponse=id;
				self.response=[];
				self.xhrStatus=xhr.status;
				self.timeResponse=(new Date().getTime() - start_time);
				self.messageText=xhr.statusText;
				self.state="¡Warning! Código de error "+xhr.status+": El recurso no esta disponible";
				self.updateDataObject();
				//clearInterval(self.intervalReload);
				break;

			case 0:
				self.idResponse=id;
				self.response=[];
				self.xhrStatus=xhr.status;
				self.timeResponse=(new Date().getTime() - start_time);
				self.messageText=xhr.statusText;
				self.state="¡Warning! Código de error "+xhr.status+": La peticion no ha sido respondida por el servidor";
				self.updateDataObject();
				clearInterval(self.intervalReload);
				break;
			default:
				self.idResponse=id;
		 		self.response=[];
		 		self.xhrStatus=xhr.status;
		 		self.timeResponse=(new Date().getTime() - start_time);
		 		self.messageText=xhr.statusText;
		 		self.state="¡Warning! Código de error "+xhr.status+": Ha ocurrido un error en el servidor ";
		 		self.updateDataObject();
		 		clearInterval(self.intervalReload);
		 		break;
			}
		}
	}));
}
/*CarouselAdministrator.prototype.executePeticionsMps=function(item,ajaxRequests){
	var self=this;
	
	$(document).ajaxSuccess(function() {
		item.render();
		if(item.hasReload){
			self.reloadDataObjects();
		}
	});
	
	$(document).ajaxSuccess(function() {
		//console.info("items procesados "+c)
		if(item instanceof Mapas && item){	
			self.ajaxCount++;
			//Se pone mas UNO por que hay un ajax de imagenes que ejecuta el mapa
			if(self.ajaxCount==ajaxRequests.length+1){
				item.render();
				self.ajaxCount=0;
				if(item.hasReload){
					self.reloadDataObjects();
				}
			}
		}
	});
	self.ajax=[];
	
}*/
CarouselAdministrator.prototype.reloadDataObjects=function(){
	var self=this;
	if(self.intervalReload==null){
		self.intervalReload=setInterval(function () {
			self.load();
		},60000);
	}
}

CarouselAdministrator.prototype.cleanIntervalAdmin=function(){
	var self=this;
	self.idRequest=0;
	clearInterval(self.intervalReload);
}
