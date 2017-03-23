var CifrasControl= function(selector,producto){
    console.debug("CifrasControl :: init() ")
    
    //Genero un idUnico 
    var idUnico=$(selector).attr("ident");
    this.selector=$(selector).attr("id","cc_"+idUnico);
    this.selector="#"+this.selector.attr("id");
    
    this.dataCifrasControlJSON=null;
    this.dataChartOptionsCifrasControlJSON=null;
    this.dataColoresIndicadoresCifrasControlJSON=null;
    this.interval=null;
    this.producto=producto;
    this.urlsRequest=[];
    this.hasReload=null;
    this.getData();
    this.height=null;
    
}
CifrasControl.prototype.getData=function(){
  var self=this;
//	Se crea un objeto de la coleeccion que guardara la informacion para el renderizado
	this.queue=new QueueStatusCollection();

	this.queue.add({
		idRequest:"dataCifrasControlJSON",
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
		idRequest:"dataChartOptionsCifrasControlJSON",
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
		idRequest:"dataColoresIndicadoresCifrasControlJSON",
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

	var pathname = window.location.pathname; // Returns path only
	pathname = pathname.substring(0,pathname.lastIndexOf('/'));
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    var fecha=yyyy+'-'+mm+'-'+dd;
	console.debug(this.producto)
	this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasControl?consulta=1&pais="+parseInt(idPais)+"&fecha="+fecha+"&producto="+this.producto,idRequest:"dataCifrasControlJSON"});
	this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&chart=4&pais=0",idRequest:"dataChartOptionsCifrasControlJSON"});
	this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=1001",idRequest:"dataColoresIndicadoresCifrasControlJSON"});
	
  /*Se realizan todas las peticiones ajax en paralelo obtiene todas esas llamadas y las devuelve en un único callback
  $.when(
    //Obtengo los datos
    $.ajax({
      url:"../restModuloMonitoreo/consulta/cifrasControl?consulta=1&pais="+$("#idPais").val()+"&fecha="+$("#fecha").val()+"&producto=remesas",
      datType:"JSON",
      contentType:"application/x-javascript; charset:ISO-8859-1",
      success : function(data) {
        //console.log("data",data);
        self.dataCifrasControlJSON=JSON.parse(JSON.stringify(data));
      },
        error : function(objXMLHttpRequest) {
        console.log("Ha ocurrido un Error",objXMLHttpRequest);
        self.msjError();
      }
    }),

    //Obtengo las opciones
    $.ajax({
      url:"../restModuloMonitoreo/consulta/graficas?consulta=2&chart=Cifras Control&pais=0",
      datType:"JSON",
      success : function(dataOptions) {
        //console.log("data Options",dataOptions);
        self.dataChartOptionsCifrasControlJSON=JSON.parse(JSON.stringify(dataOptions));
      },
      error : function(objXMLHttpRequest) {
        console.log("Ha ocurrido un Error al obtener las opciones",objXMLHttpRequest);
        self.msjError();
      }
    }),

    //Obtengo los colores
    $.ajax({
      url:"../restModuloMonitoreo/consulta/colores?consulta=3&chart=Indicadores",
      datType:"JSON",
      success : function(dataColors) {
        //console.log("data Colors",dataColors);
        self.dataColoresIndicadoresCifrasControlJSON=JSON.parse(JSON.stringify(dataColors));
      },
      error : function(objXMLHttpRequest) {
        console.log("Ha ocurrido un Error al obtener los colores",objXMLHttpRequest);
        self.msjError();
      }
    })
  ).then(function(){
    self.render();
    //self.reloadChart();
  });*/
}
CifrasControl.prototype.render=function(){
    var self=this;
    
    if(this.queue.models.length===this.urlsRequest.length){
    	_.each(this.queue.models,function(element,index){
    		//console.info("*********Peticion "+index+"*********");
    		if(_.findWhere(element,{idRequest:"dataCifrasControlJSON"})!=undefined)
    			self.dataCifrasControlJSON=_.findWhere(element,{idRequest:"dataCifrasControlJSON"}).data;
    		if(_.findWhere(element,{idRequest:"dataChartOptionsCifrasControlJSON"})!=undefined)	
    			self.dataChartOptionsCifrasControlJSON=_.findWhere(element,{idRequest:"dataChartOptionsCifrasControlJSON"}).data;
    		if(_.findWhere(element,{idRequest:"dataColoresIndicadoresCifrasControlJSON"})!=undefined)
    			self.dataColoresIndicadoresCifrasControlJSON=_.findWhere(element,{idRequest:"dataColoresIndicadoresCifrasControlJSON"}).data;
    	});
    }
    
    this.dataChartOptionsCifrasControlJSON=this.dataChartOptionsCifrasControlJSON.jsonResultTree;
    this.dataColoresIndicadoresCifrasControlJSON=this.dataColoresIndicadoresCifrasControlJSON.jsonResult;
    
    this.hasReload=this.dataChartOptionsCifrasControlJSON.options.pld.reload;
    
    //Se construye el panel de 2 x 2
    if($(this.selector+" .nameScreen").length==1)
      $(this.selector).append('<div class="container-fluid background-linear-gradient" style="height: 100%; color: #fff; padding: 1px;">'+
    		'	<div class="row" style="height: 100%">'+
    		'		<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"'+
    		'			style="padding: 0px; height: 100%">'+
    		'			<div class="row header-cifras-control" style="border-style: none;"></div>'+
    		'			<div id="vt" style="width: 100%;">'+
    		'				<ul style="width: 100%;"></ul>'+
    		'			</div>'+
    		'		</div>'+
    		'	</div>'+
    		'</div>');

      	if(this.dataCifrasControlJSON != undefined){
      		if (this.dataCifrasControlJSON.rowCount > 0) {
      		this.createHeaders();
      		this.renderPane();
      		} else {
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
      		

      	}else{
      		$('.container-fluid').children().remove();
      		$('.container-fluid').append('<table class="table" style="text-align:center;" ><tr ><td> <i class="fa fa-exclamation-triangle fa-5x" style="color:yellow" ></i> <h1>No se cargaron datos a mostrar</h1></td> </tr></table>');

      	}
      	$(window).resize(function() {
      		//$(self.selector+' #vt').vTicker("remove");
      		if($(self.selector+" .nameScreen").length>0){
      		//	self.renderPane();
      		}
		});
      	
     //elimino los div con el nombre del panel
     $(this.selector+" .nameScreen").hide();
}
CifrasControl.prototype.createHeaders=function(){
  var self=this;
	var miHeader ='';
	miHeader +='<table style="width: 100%; height: 100%; background-color: transparent;">';
	miHeader +=' <tr>';
	miHeader +='  <td class="td-1"></td>';
	miHeader +='  <td class="td-2 font-sub-header font-style-headers-pld">'+this.dataCifrasControlJSON.jsonHeadersDesc[1].name+'</td>';
	miHeader +='  <td class="td-3 font-sub-header font-style-headers-pld">'+this.dataCifrasControlJSON.jsonHeadersDesc[2].name+'</td>';
	miHeader +='  <td class="td-4 font-sub-header font-style-headers-pld">'+this.dataCifrasControlJSON.jsonHeadersDesc[3].name+'</td>';
	miHeader +='  <td class="td-5 font-sub-header font-style-headers-pld">'+this.dataCifrasControlJSON.jsonHeadersDesc[4].name+'</td>';
	miHeader +=' </tr>';
	miHeader +='</table>';
	$(this.selector+' .row.header-cifras-control').append(miHeader);
}

CifrasControl.prototype.renderPane=function(){
  var self=this;
	$(this.selector+' >ul').children().remove();
	self.height = parseInt($('.container-fluid').css('height').replace('px',''));
		
	$(this.selector+' .row .header-cifras-control').css('height',parseInt(self.height *.12))
	$(this.selector+' #vt').css('height',parseInt(self.height *.9))

	$.each(this.dataCifrasControlJSON.queryResult,function(indexObj,rowObj){
		var color=self.dataColoresIndicadoresCifrasControlJSON[parseInt(rowObj.fields[0])-1 ].color;
		var miRow ='';
		miRow +='<li >';
		miRow +='<table style="width: 100%; height: 100%; background-color: transparent;">';
		miRow +=' <tr>';
		miRow +='  <td class="td-1"><div class="circle-cifras-control" style="background-color: '+color+';box-shadow: 0px 0px 10px  '+color+';"></div></td>';
		miRow +='  <td class="td-2 font-content font-style-content-pld">'+rowObj.fields[1]+'</td>';
		miRow +='  <td class="td-3 font-content font-style-content-pld">'+$.number(rowObj.fields[2],0)+'</td>';
		miRow +='  <td class="td-4 font-content font-style-content-pld">'+$.number(rowObj.fields[3],2)+'</td>';
		miRow +='  <td class="td-5 font-content font-style-content-pld">'+$.number(rowObj.fields[4],2)+'</td>';
		miRow +=' </tr>';
		miRow +='</table>';
		miRow +='</li>';
    $(self.selector+' ul').append(miRow);
	});

	$(self.selector+' #vt').vTicker('init', {speed: 500,
	    pause: 3000,
	    showItems:5,
	    padding: 0});
}


CifrasControl.prototype.reloadChart=function(){
  console.debug("Begin reloadChart :: CifrasControl");
  var self=this;
}

CifrasControl.prototype.destruir=function(){
  console.debug("Destoying objects :: Cifras Control");
  var self=this;
  self.dataCifrasControlJSON=null;
  self.dataChartOptionsCifrasControlJSON=null;
  self.dataColoresIndicadoresCifrasControlJSON=null;
  self.interval=null;
  $(self.selector+' #vt').vTicker("remove");
  
//Se elimina la instancia en el evento rezise
  $(window).off("resize");
}

CifrasControl.prototype.msjError=function(){
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
