/*****Se crea una vista*****/
var ProveedoresAppView = Backbone.View.extend({
	el: '.dynamicChartContainer div[screen=pv] #tbl-inf-tb',
	template: _.template('<% _.each(items,function(item,index){ %>  '+
			'<tr style="height: 20%">'+
			'  	<td style="width: 40%;" ><div class="font-content"><span><%= item.Lista %></span>'+
			' <%if (item.ErrorF1==1) { %>'+
			' 	<div class="prov-content"> '+
			'		<i class="fa fa-exclamation-triangle fa-1x" style="color:yellow"></i>'+
			' 		<span>'+
			'			<%= item.DescripcionErrorF1 %>'+
			'		</span></div>'+
			' <%}%>'+
			' <%if (item.ErrorF2==1) { %>'+
			' 	<div class="prov-content"> '+
			'		<i class="fa fa-exclamation-triangle fa-1x" style="color:yellow"></i>'+
			' 		<span>'+
			'			<%= item.DescripcionErrorF2 %>'+
			'		</span></div>'+
			' <%}%>'+
			' <%if (item.ErrorF3==1) { %>'+
			' 	<div class="prov-content"> '+
			'		<i class="fa fa-exclamation-triangle fa-1x" style="color:yellow"></i>'+
			' 		<span>'+
			'			<%= item.DescripcionErrorF3 %>'+
			'		</span></div>'+
			' <%}%>'+
			' </td>'+
			'	<td style="width: 20%;" ><div class="circle" style="background-color:<%= item.Color1 %>"></div><span class="font-content"><div><%= item.HoraF1 %></span></div></td>'+
			'	<td style="width: 20%;" ><div class="circle" style="background-color:<%= item.Color2 %>"></div><span class="font-content"><div><%= item.HoraF2 %></span></div></td>'+
			'	<td style="width: 20%;" ><div class="circle" style="background-color:<%= item.Color3 %>"></div><span class="font-content"><div><%= item.HoraF3 %></span></div></td>'+
			'</tr> '+
	'<% }); %>'),
	initialize: function(){
	  this.dataProveedoresJSON;
	  this.coloresIndicadoresJSON;
	  this.ProveedoresOptionsJSON;
	  this.proveedoresCollection = null;
	  this.proveedoresAppView=null;
	  this.timer =null;

		this.getData();
	},
	getData : function(){
	  var self=this;
	  $.when(
	    $.ajax({
	      url:"../restModuloMonitoreo/consulta/proveedores?consulta=1&pais="+$("#idPais").val()+"&fecha="+$("#fecha").val()+"&producto=captacion",
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
	    })
	  ).then(function(){
		  	self.ProveedoresOptionsJSON=self.ProveedoresOptionsJSON.jsonResultTree;
		  	self.coloresIndicadoresJSON=self.coloresIndicadoresJSON.jsonResult;
			
		  	self.addColor();
			self.render();

			self.reloadChart();

			$(".dynamicChartContainer div[screen=pv] .nameScreen").remove();
	  });
	},
	render: function(){
		this.$el.children().remove();
		this.$el.html(this.template({items:this.dataProveedoresJSON.jsonResult}));//Donde model=Collection del tipo Model

	},
	addColor:function(){
		var self=this;
		/****add color elment by elment****/
		_.each(self.dataProveedoresJSON.jsonResult,function(item,index){
			if(index<self.dataProveedoresJSON.rowCount){
				item.Color1=self.coloresIndicadoresJSON[item.IDColorF1-1].color;
				item.Color2=self.coloresIndicadoresJSON[item.IDColorF2-1].color;
				item.Color3=self.coloresIndicadoresJSON[item.IDColorF3-1].color;
			}
		});
		/****add color elment by elment****/
	},
	reloadChart : function(){
	  var self=this;
	  console.debug("begin reload :: Proveedores");

	  //console.info(this.ProveedoresOptionsJSON.options.pld.reload);

	  if(this.ProveedoresOptionsJSON.options.pld.reload && this.timer==null){
	    this.timer =setInterval(function () {
	      //console.info('reloadData');
	      self.getData();
	    }, this.ProveedoresOptionsJSON.options.pld.timeReload );
	  }
	},
	destruir:function(){
	     console.debug("Destoying objects :: Proveedores")

	    if(this.proveedoresCollection!=null){
	      //--Reset collection
	      this.proveedoresCollection.reset();
	      //--full fill collection again
	      this.proveedoresCollection.add(this.dataProveedoresJSON)
	    }

	    clearInterval(this.timer);

	    this.timer=null;
	},
	msjError:function(){
		$(".dynamicChartContainer div[screen=pv]").empty();
	    $(".dynamicChartContainer div[screen=pv]").append('<div class="rowFlx container-fluid background-degradado-2" style="height: 100%;"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0px;margin: 0px;height: 100%;"><div class="row col-lg-12 col-md-12 col-sm-12 "><div style="color:#fff;float: right;" class="col-lg-6 col-md-6 col-sm-6"><i class="fa fa-exclamation-triangle fa-6"></i></div></div><div class="row col-lg-12 col-md-12 col-sm-12 "><div style="color:#fff;float: right;" class="col-lg-7 col-md-7 col-sm-7 "><label><h3>No se encontro informacion para los valores solicitados</h3></label></div></div></div></div>');
	    //elimino los div con el nombre del panel
	    $(".dynamicChartContainer div[screen=pv] .nameScreen").remove();
	}
});


var CifrasReporteAppView = Backbone.View.extend({
		el: '.dynamicChartContainer div[screen=cr] #tbl-inf-tb',
	    template: _.template('<% _.each(items,function(item,index){ %>  '+
	  		  '<tr> '+
	  		  '  <td style="vertical-align: middle;text-align: center;" class="font-content">  <span  ><%= item.Reporte %> </span></td>'+
	  		  '  <td style="vertical-align: middle;text-align: center;" class="font-content"> <span  ><%= item.Estatus %> </span></td>'+
	  		  '  <td style="vertical-align: middle;text-align: center;" class="font-content">'+
	  		  '    <span  ><%= item.Porcentaje 	 %></span>%'+
	  		  '	   <div class="progress progress-striped active" style="height: 0.5em">'+
	  		  '      <div class="progress-bar"  role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:<%= item.Porcentaje%>%; background-color:<%= item.Color%> "> </div>'+
	  		  '    </div>'+
	  		  '  </td>'+
	  		  '</tr> '+
	  		  '<% }); %>'),
	    initialize: function(){
				var self=this;
				//Asigno los atributos del modelo
				this.dataCReporteJSON=null;
				this.cifrasReporteOptionsJSON=null;
				this.dataColoresReporteJSON=null;
				this.alertasCReportesJSON=null;
				this.bannerTxt=[];
				this.bannerInterval=null;
				this.timer=null;
				this.getData();

			},
			getData : function(){
			  var self=this;
			  $.ajax({
			      url:"../restModuloMonitoreo/consulta/cifrasControl?consulta=9&pais="+$("#idPais").val()+"&fecha="+$("#fecha").val()+"&producto=captacion&param1",
			      datType:"JSON",
			      success : function(data) {
			        //console.log("data",data);
			        self.alertasCReportesJSON=JSON.parse(JSON.stringify(data));
			      },
			      error : function(objXMLHttpRequest) {
			    	console.log("Ha ocurrido un Error",objXMLHttpRequest);
			    	self.alertasCReportesJSON={jsonResult:[{Mensaje:"No existen mensajes actualmente en el sistema"}]};
			      }
			    })
			  $.when(
			    $.ajax({
			      url:"../restModuloMonitoreo/consulta/graficas?consulta=2&chart=Reporte Status&pais=0",
			      datType:"JSON",
			      success : function(data) {
			        //console.log("data",data);
			        self.cifrasReporteOptionsJSON=JSON.parse(JSON.stringify(data));
			      },
			      error : function(objXMLHttpRequest) {
			        console.log("Ha ocurrido un Error",objXMLHttpRequest);
			        self.msjError();
			      }
			    }),
			    $.ajax({
			      url:"../restModuloMonitoreo/consulta/colores?consulta=3&chart=ReporteStatus",
			      datType:"JSON",
			      success : function(data) {
			        //console.log("data",data);
			        self.dataColoresReporteJSON=JSON.parse(JSON.stringify(data));
			      },
			      error : function(objXMLHttpRequest) {
			        console.log("Ha ocurrido un Error",objXMLHttpRequest);
			        self.msjError();
			      }
			    }),
			    $.ajax({
			      url:"../restModuloMonitoreo/consulta/cifrasControl?consulta=4&pais="+$("#idPais").val()+"&fecha="+$("#fecha").val()+"&producto=captacion&param1",
			      datType:"JSON",
			      success : function(data) {
			        //console.log("data",data);
			        self.dataCReporteJSON=JSON.parse(JSON.stringify(data));
			      },
			      error : function(objXMLHttpRequest) {
			        console.log("Ha ocurrido un Error",objXMLHttpRequest);
			        self.msjError();
			      }
			    })
			  ).then(function(){
				  	self.cifrasReporteOptionsJSON=self.cifrasReporteOptionsJSON.jsonResultTree;
				  	self.dataColoresReporteJSON=self.dataColoresReporteJSON.jsonResult;
					self.addColor();

					self.render();

					self.createBanner();
					//add banner
		    	$( "#text-banner" ).html(self.bannerTxt[0]);
					//--change text banner
					if(self.bannerInterval==null){
						self.bannerInterval=setInterval(function () {
				 			$( "#text-banner" ).toggle("drop",function(){
					 			self.bannerTxt.push(self.bannerTxt.shift());
					 			$( "#text-banner" ).html(self.bannerTxt[0]);
					 			$( "#text-banner" ).toggle("drop");
							});
			 			},self.cifrasReporteOptionsJSON.options.pld.timeReloadBanner);
					}

					self.reloadChart();

					$(".dynamicChartContainer div[screen=cr] .nameScreen").remove();
			  });
			},
	    render: function(){
	    	  this.$el.children().remove();
	    	  this.$el.html(this.template({items:this.dataCReporteJSON.jsonResult}));
  				this.animateIcon();
	    },
			close:function(){
				clearInterval(this.bannerInterval);
			},
	  	//--Animate data icon
	    animateIcon:function(){
				var self=this;
				//console.info("Animate");

		 		var percent_number_step = $.animateNumber.numberStepFactories.append(' %');
	    	$.each(this.dataCReporteJSON, function(item){
	    		$('#val-'+item+'').animateNumber({
	    			number: item.Porcentaje,
	    			numberStep: percent_number_step,
	    		},self.cifrasReporteOptionsJSON.options.pld.timeAnimate);
	    	});
			},
	    createBanner:function(){
				var self=this;
	    	//console.info("Create banner");
	    	if(this.alertasCReportesJSON.jsonResult!=undefined){
	    		this.bannerTxt=[]
	    		_.each(this.alertasCReportesJSON.jsonResult,function(item){
	    				//console.info(item.Mensaje)
	    	    	self.bannerTxt.push('<i class="fa fa-exclamation-circle " style="color:#FFFF00"></i> &nbsp;&nbsp;'+item.Mensaje+' ')
	    		});
	    	}
      },
    	addColor:function(){
				var self=this;
    		/****add color elment by elment****/
    		_.each(self.dataCReporteJSON.jsonResult,function(item,index){
    				item.Color=self.dataColoresReporteJSON[(item.Indicador)-1].color;
			});
    		/****add color elment by elment****/
    },reloadChart:function(){
    	console.debug("begin reloadChart :: CifrasReporte");
		  var self= this;
		  //--define reload data interval
		  if(this.cifrasReporteOptionsJSON.options.pld.reload && this.timer==null){
				  this.timer =setInterval(function () {
		      //console.info('reloadData');
		      self.destruir();
		      self.getData();
		    },this.cifrasReporteOptionsJSON.options.pld.timeReload );
		  }
		},
		msjError:function(){
			$(".dynamicChartContainer div[screen=cr]").empty();
		    $(".dynamicChartContainer div[screen=cr]").append('<div class="rowFlx container-fluid background-degradado-2" style="height: 100%;"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0px;margin: 0px;height: 100%;"><div class="row col-lg-12 col-md-12 col-sm-12 "><div style="color:#fff;float: right;" class="col-lg-6 col-md-6 col-sm-6"><i class="fa fa-exclamation-triangle fa-6"></i></div></div><div class="row col-lg-12 col-md-12 col-sm-12 "><div style="color:#fff;float: right;" class="col-lg-7 col-md-7 col-sm-7 "><label><h3>No se encontro informacion para los valores solicitados</h3></label></div></div></div></div>');
		    //elimino los div con el nombre del panel
		    $(".dynamicChartContainer div[screen=cr] .nameScreen").remove();
		},
		destruir:function(){
		  console.debug("Destoying objects :: Cifras Reportes");
		  this.alertasCReportesJSON=null;
		  this.cifrasReporteOptionsJSON=null;
		  this.dataColoresReporteJSON=null;
		  this.dataCReporteJSON=null;

		  this.cifrasReporteCollection=null;
		  this.cifrasReporteAppView=null;

		  clearInterval(this.timer);
		  this.timer =null;

		  clearInterval(this.bannerInterval);
		  this.bannerInterval=null;
		}
});
