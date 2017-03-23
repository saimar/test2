var pathname = window.location.pathname; // Returns path only
	pathname = pathname.substring(0,pathname.lastIndexOf('/'));
var Proveedores= function(selector,producto){
	console.debug("Proveedores:: init()");
	var self=this;

	//Genero un idUnico 
	var idUnico=$(selector).attr("ident");
	this.selector=$(selector).attr("id","pv_"+idUnico);
	this.selector="#"+this.selector.attr("id");

	this.dataProveedoresJSON;
	this.coloresIndicadoresProveedoresJSON;
	this.ProveedoresOptionsJSON;
	this.proveedoresCollection = null;
	this.proveedoresAppView=null;
	this.timer =null;
	this.producto=producto;
	
	this.urlsRequest=[];
	this.hasReload=null;
	this.getData();
}

Proveedores.prototype.getData = function(){
	var self=this;
	this.queue=new QueueStatusCollection();

	this.queue.add({
		idRequest:"dataProveedoresJSON",
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
		idRequest:"coloresIndicadoresProveedoresJSON",
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
		idRequest:"ProveedoresOptionsJSON",
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

	this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/proveedores?consulta=1&pais="+parseInt(idPais)+"&fecha="+fecha+"&producto="+this.producto,idRequest:"dataProveedoresJSON"});
	this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=10",idRequest:"coloresIndicadoresProveedoresJSON"});
	this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&chart=10&pais=0",idRequest:"ProveedoresOptionsJSON"});

	/*$.when(
	    $.ajax({
	      url:"../restModuloMonitoreo/consulta/proveedores?consulta=1&pais="+$("#idPais").val()+"&fecha="+$("#fecha").val()+"&producto=remesas",
	      datType:"JSON",
	      success : function(data) {
	        //console.log("data",data);
	        self.dataProveedoresJSON=JSON.parse(JSON.stringify(data));
	      },
	      error : function(objXMLHttpRequest) {
	        console.log("Ha ocurrido un Error",objXMLHttpRequest);
	        self.msjError();
	      }
	    }),
	    $.ajax({
	      url:"../restModuloMonitoreo/consulta/colores?consulta=3&chart=Descarga Proveedores",
	      datType:"JSON",
	      success : function(data) {
	        //console.log("data",data);
	        self.coloresIndicadoresJSON=JSON.parse(JSON.stringify(data));
	      },
	      error : function(objXMLHttpRequest) {
	        console.log("Ha ocurrido un Error",objXMLHttpRequest);
	        self.msjError();
	      }
	    }),
	    $.ajax({
	      url:"../restModuloMonitoreo/consulta/graficas?consulta=2&chart=Descarga Proveedores&pais=0",
	      datType:"JSON",
	      success : function(data) {
	        //console.log("data",data);
	        self.ProveedoresOptionsJSON=JSON.parse(JSON.stringify(data));
	      },
	      error : function(objXMLHttpRequest) {
	        console.log("Ha ocurrido un Error",objXMLHttpRequest);
	        self.msjError();
	      }
	    })*/
}

Proveedores.prototype.render = function(){
	var self=this;

	if(this.queue.models.length===this.urlsRequest.length){
		_.each(this.queue.models,function(element,index){
			//console.info("*********Peticion "+index+"*********");
			if(_.findWhere(element,{idRequest:"dataProveedoresJSON"})!=undefined)
				self.dataProveedoresJSON=_.findWhere(element,{idRequest:"dataProveedoresJSON"}).data;
			if(_.findWhere(element,{idRequest:"ProveedoresOptionsJSON"})!=undefined)	
				self.ProveedoresOptionsJSON=_.findWhere(element,{idRequest:"ProveedoresOptionsJSON"}).data;
			if(_.findWhere(element,{idRequest:"coloresIndicadoresProveedoresJSON"})!=undefined)
				self.coloresIndicadoresProveedoresJSON=_.findWhere(element,{idRequest:"coloresIndicadoresProveedoresJSON"}).data;
		});
	}

	if(this.dataProveedoresJSON!=undefined){
		if(this.dataProveedoresJSON.rowCount > 0) {
			
	this.ProveedoresOptionsJSON=this.ProveedoresOptionsJSON.jsonResultTree;
	this.coloresIndicadoresProveedoresJSON=this.coloresIndicadoresProveedoresJSON.jsonResult;
	this.dataProveedoresJSON=this.dataProveedoresJSON.jsonResult;
    
    
	if($(this.selector+" .nameScreen").length==1)
		$(this.selector).append('<div id="panelContainer" class="container-fluid background-linear-gradient">'+
				'<div class="row" style="width:100%;">'+
				'			<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" style="margin-top:5%" >'+
				'				<center><span class="font-sub-header font-style-headers-pld" >Lista</span></center>'+
				'			</div>'+
				'		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" style="margin-top:5%">'+
				'			<center><span class="font-sub-header font-style-headers-pld">Descarga</span></center>'+
				'		</div>'+
				'		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" style="margin-top:5%">'+
				'			<center><span class="font-sub-header font-style-headers-pld">Back</span></center>'+
				'		</div>'+
				'		<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" style="margin-top:5%">'+
				'			<center><span class="font-sub-header font-style-headers-pld">Front</span></center>'+
				'		</div>'+
				'</div>'+
			'</div>');


	this.addColor();

	var tbl='';
	
	_.each(self.dataProveedoresJSON,function(item,index){
		 tbl+='<div class="row" style="width:100%;">'+
					'	<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3" style="padding:10px" >'+
					'		<div class="row">'+
					'			<div class="font-content font-style-content-pld"><center><span>'+ item.Lista +'</span></center></div>'+
					'		</div>'+
					'		<div class="row">';
		 

		 				if (item.ErrorF1==1) {
		 					tbl+='<div class="prov-content font-style-content-pld">'+
		 							'<center><i class="fa fa-exclamation-triangle fa-2x" style="color:#c88a0a"></i></center>'+
		 							'<center><span class="font-content font-style-content-pld" >'+ item.DescripcionErrorF1 +'</span></center>'+
		 						'</div>';
		 				}		
		 				if (item.ErrorF2==1) {
		 					tbl+='<div class="prov-content font-style-content-pld">'+
		 							'<center><i class="fa fa-exclamation-triangle fa-1x" style="color:yellow"></i></center>'+
		 							'<center><span class="font-content font-style-content-pld">'+item.DescripcionErrorF2+'</span></center>'+
		 						'</div>';
		 				}
		 				if (item.ErrorF3==1) {
		 					tbl+='<div class="prov-content font-style-content-pld">'+
		 							'<center><i class="fa fa-exclamation-triangle fa-1x" style="color:yellow"></i></center>'+
		 							'<center><span class="font-content font-style-content-pld">'+ item.DescripcionErrorF3 +'</span></center>'+
		 						'</div>';
		 				}
		 				tbl+='</div>'+
		 				'</div>'+ 
		 				'<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'+
		 					'<div class="row" style="padding:10px">  		'+
		 						'<div class="col-md-12 col-md-offset-4">'+
		 							'<i class="fa fa-cloud-download fa-3x" aria-hidden="false" style="color:'+ item.Color1 +'"></i>'+
		 						'</div>  '+
		 						'<div class="col-md-12 col-md-offset-4">'+
		 							'<span class="font-content font-style-content-pld" style="padding:5px">'+ item.HoraF1 +'</span>'+	
		 						'</div>    '+
		 					'</div> '+
		 				'</div>'+
		 				'<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'+
		 					'<div class="row" style="padding:10px">  		'+
		 						'<div class="col-md-12 col-md-offset-4">'+
		 							'<i class="fa fa-database fa-3x" aria-hidden="false" style="color:'+ item.Color2 +'"></i>'+
		 						'</div>  '+
		 						'<div class="col-md-12 col-md-offset-4">'+
		 							'<span class="font-content font-style-content-pld" style="padding:5px">'+ item.HoraF2 +'</span>'+	
		 						'</div>    '+
		 					'</div> '+
		 				'</div>	'+
		 				'<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'+
		 					'<div class="row" style="padding:10px">  		'+
		 						'<div class="col-md-12 col-md-offset-4">'+
		 							'<i class="fa fa-desktop fa-3x" aria-hidden="false" style="color:'+ item.Color3 +'"></i>'+
		 						'</div>  '+
		 						'<div class="col-md-12 col-md-offset-4">'+
		 							'<span class="font-content font-style-content-pld" style="padding:5px">'+ item.HoraF3 +'</span>'+	
		 						'</div>    '+
		 					'</div> '+
		 				'</div>	'+
					'</div>';
	});

	$(this.selector+' #panelContainer').append(tbl);
			this.animatedAlerts();

		}else{
			$(this.selector).append('<div class="row" style="height:100%;">'+
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
		$(this.selector).append('<div class="row" style="height:100%;">'+
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

Proveedores.prototype.addColor = function(){
	var self=this;
	_.each(self.dataProveedoresJSON,function(item,index){
		if(index<self.dataProveedoresJSON.length){
			item.Color1=self.coloresIndicadoresProveedoresJSON[item.IDColorF1-1].color;
			item.Color2=self.coloresIndicadoresProveedoresJSON[item.IDColorF2-1].color;
			item.Color3=self.coloresIndicadoresProveedoresJSON[item.IDColorF3-1].color;
		}
	});
}

Proveedores.prototype.animatedAlerts = function(){
	var self=this;
	//Alerta rojo
	$(".fa.fa-cloud-download.fa-3x").each(function(){
		if($(this).css("color")=="rgb(255, 65, 54)"){
			$(this).addClass('animated shake');
		}
	});
	
	$(".fa.fa-database.fa-3x").each(function(){
		if($(this).css("color")=="rgb(255, 65, 54)"){
			$(this).addClass('animated shake');
		}
	});
	
	$(".fa.fa-desktop.fa-3x").each(function(){
		if($(this).css("color")=="rgb(255, 65, 54)"){
			$(this).addClass('animated shake');
		}
	});
	
	//Alerta amarillo
	$(".fa.fa-cloud-download.fa-3x").each(function(){
		if($(this).css("color")=="rgb(212, 188, 46)"){
			$(this).addClass('animated rubberBand');
		}
	});
	
	$(".fa.fa-database.fa-3x").each(function(){
		if($(this).css("color")=="rgb(212, 188, 46)"){
			$(this).addClass('animated rubberBand');
		}
	});
	
	$(".fa.fa-desktop.fa-3x").each(function(){
		if($(this).css("color")=="rgb(212, 188, 46)"){
			$(this).addClass('animated rubberBand');
		}
	});
	
	
	//Alerta verde
	$(".fa.fa-cloud-download.fa-3x").each(function(){
		if($(this).css("color")=="rgb(0, 166, 90)"){
			$(this).addClass('animated pulse');
		}
	});
	
	$(".fa.fa-database.fa-3x").each(function(){
		if($(this).css("color")=="rgb(0, 166, 90)"){
			$(this).addClass('animated pulse');
		}
	});
	
	$(".fa.fa-desktop.fa-3x").each(function(){
		if($(this).css("color")=="rgb(0, 166, 90)"){
			$(this).addClass('animated pulse');
		}
	});
	//$(this.selector+" #panelContainer").niceScroll({cursorcolor:"#556E88"});
}

Proveedores.prototype.destruir = function(){
	var self=this;
	console.debug("Destruir :: Proveedores");
	
	this.dataProveedoresJSON;
	this.coloresIndicadoresProveedoresJSON;
	this.ProveedoresOptionsJSON;
	this.proveedoresCollection = null;
	this.proveedoresAppView=null;
	this.timer =null;
	
	this.urlsRequest=[];
	this.hasReload=null;
}

Proveedores.prototype.msjError=function(){
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
