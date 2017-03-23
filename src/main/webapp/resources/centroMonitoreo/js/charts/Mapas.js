var pathname = window.location.pathname; // Returns path only
	pathname = pathname.substring(0,pathname.lastIndexOf('/'));
	
var Mapas= function(selector,mapas,producto){
	console.debug("Mapas :: init()")
	
	 //Genero un idUnico 
	var idUnico=$(selector).attr("ident");
    this.selector=$(selector).attr("id","mps_"+idUnico);
    this.selector="#"+this.selector.attr("id");
    this.selectorUnico=this.selector;
    
 	//Obtencion del pais agregado al panel
    /*if($("#idPais").val()===undefined || $("#idPais").val()==="0"){
    	this.idPais=$(selector).attr("idPais");
    }else{
    	this.idPais=$("#idPais").val();
    }*/
    this.idPais=idPais;
    
    //Obtencion del producto agregado al panel
    /*if($("#idProducto").val()===undefined || $("#idProducto").val()==="0"){
    	this.producto=$(selector).attr("producto");
    }else{
    	this.producto=$("#idProducto").val();
    }*/
    this.producto=producto;
    
    this.paisIcon=$(selector).attr("pais");
    
	this.mapas = mapas;
	
	this.urlsRequest=[];
    this.hasReload=null;
	
	//Colors
	this.dataColoresGraficasJSON=null;
	this.dataColoresIndicadoresJSON=null;
	this.dataColoresElectoralesJSON=null;
	this.dataColoresMapaCtsActvApertJSON=null;
	this.dataColoresMapaAltaDenomJSON=null;
	this.dataColoresMapaOpSospJSON=null;
	this.dataColoresMapaRptReg10usdJSON=null;

	//Alertas
	this.dataMapaAlertaJSON=null;
	this.dataOpcAlertaJSON=null;

	//REPORTES
	this.dataMapaReporteJSON=null;
	this.dataOpcReporteJSON=null;

	//LISTAS NEGRAS
	this.dataMapaListasJSON=null;
	this.dataOpcListasJSON=null;

	//PEPS(descontinuado)
	this.dataMapaPEPSJSON=null;
	this.dataOpcPEPSJSON=null;

	//MATRIZ RIESGO POR ESTADO
	this.dataMapaMREstadoJSON=null;
	this.dataOpcMREstadoJSON=null;
	this.dataMRTipoRiesgoJSON=null;

	//MATRIZ RIESGO INACEPTABLES
	this.dataMapaMRInaceptablesJSON=null;
	this.dataOpcMRInaceptablesJSON=null;

	//MATRIZ RIESGO ALTO RIESGO
	this.dataMapaMRAltoRiesgoJSON=null;
	this.dataOpcMRAltoRiesgoJSON=null;

	//LAM RIESGO GEOGRAFICO
	this.dataMapaMRLRGeograficoJSON=null;
	this.dataOpcMRLRGeograficoJSON=null;

	//Capacitacion
	this.dataMapaCapacitacionJSON=null;
	this.dataOpcCapacitacionJSON=null;
	
	//Mapa Limites Efectivo
	this.dataMapaLimitesEfectivoJSON=null;
	this.dataOpcLimitesEfectivoJSON=null;
	this.panelDataLimitesEfectivoJSON=null;
	
	//Mapa Electoral
	this.dataMapaElectoralJSON=null;
	this.dataOpcElectoralJSON=null;
	
	//Mapa Clientes Activos y Aperturas
	this.dataMapaCtsActvApertJSON=null;
	this.dataOpcMapaCtsActvApertJSON=null;
	this.panelDataMapaCtsActvApertJSON=null;
	this.panelDataMapaAperturaSucursalJSON=null;
	
	//Mapa Billetes Alta Denominacion
	this.dataMapaAltaDenomJSON=null;
	this.dataOpcMapaAltaDenomJSON=null;
	this.panelDataMapaAltaDenomCantidadBJSON=null;
	
	//Mapa Operaciones Sospechosas
	this.dataMapaOpSospJSON=null;
	this.dataOpcMapaOpSospJSON=null;
	
	//Mapa Reportes Regulatorios
	this.dataMapaRptReg10usdJSON=null;
	this.dataOpcMapaRptReg10usdJSON=null;
	
	//Mapa RLD
	this.dataMapaRLDJSON=null;
	this.dataOpcRLDJSON=null;
	
	this.mapa =null
	this.interval=null;
	this.getData();
} 

Mapas.prototype.getData=function(){
	var self=this;
	
	this.queue=new QueueStatusCollection();
	
	//COLORS
	this.queue.add({
		idRequest:"dataColoresGraficasJSON",
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
		idRequest:"dataColoresIndicadoresJSON",
		url:"",
		status:"200",
		time:"",
		message:"",
		reload:"",
		state:"",
		data:[],
		fechaInfo:""
	});
	
	if(_.indexOf(this.mapas,'MapaElectoral')>=0){
		this.queue.add({
			idRequest:"dataColoresElectoralesJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:""
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=17",idRequest:"dataColoresElectoralesJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaListas')>=0){
		this.queue.add({
			idRequest:"dataColoresElectoralesLNJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:""
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=22",idRequest:"dataColoresElectoralesLNJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaLimitesEfectivo')>=0){
		this.queue.add({
			idRequest:"dataColoresLimitesEfectivoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:""
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=21",idRequest:"dataColoresLimitesEfectivoJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaCtsActvosApert')>=0){
		this.queue.add({
			idRequest:"dataColoresMapaCtsActvApertJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:""
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=60",idRequest:"dataColoresMapaCtsActvApertJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaAltaDenominacion')>=0){
		this.queue.add({
			idRequest:"dataColoresMapaAltaDenomJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:""
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=54",idRequest:"dataColoresMapaAltaDenomJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaOperacionesSospechosas')>=0){
		this.queue.add({
			idRequest:"dataColoresMapaOpSospJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:""
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=62",idRequest:"dataColoresMapaOpSospJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaRptReg10USD')>=0){
		this.queue.add({
			idRequest:"dataColoresMapaRptReg10usdJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:""
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=63",idRequest:"dataColoresMapaRptReg10usdJSON"});
	}
	
	//this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=Graficas",idRequest:"dataColoresGraficasJSON"});
	//this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=Indicadores",idRequest:"dataColoresIndicadoresJSON"});
	this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=1002",idRequest:"dataColoresGraficasJSON"});
	this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/colores?consulta=3&chart=1001",idRequest:"dataColoresIndicadoresJSON"});
	
	//Alertas
	if(_.indexOf(this.mapas,'MapaAlerta')>=0){
		this.queue.add({
			idRequest:"dataMapaAlertaJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"				
		});
		
		this.queue.add({
			idRequest:"dataOpcAlertaJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasControl?consulta=3&pais="+idPais+"&fecha="+fecha+"&producto="+this.producto+"&param1=",idRequest:"dataMapaAlertaJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+idPais+"&chart=Alertas",idRequest:"dataOpcAlertaJSON"});
	}
	
	
	
	//Alertas Reportes  this.urlsRequest.push({url:"",idRequest:""});
	if(_.indexOf(this.mapas,'MapaReporte')>=0){
		
		//Alertas Reportes
		this.queue.add({
			idRequest:"dataMapaReporteJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcReporteJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasControl?consulta=5&pais="+idPais+"&fecha="+fecha+"&producto="+this.producto+"&param1=",idRequest:"dataMapaReporteJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&chart=Alertas Reporte&pais="+idPais,idRequest:"dataOpcReporteJSON"});
	}
	
	//Mapa Listas  
	if(_.indexOf(this.mapas,'MapaListas')>=0){
		
		//Mapa Listas Request
		this.queue.add({
			idRequest:"dataMapaListasJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcListasJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});


		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/proveedores?consulta=2&pais="+idPais+"&fecha="+fecha+"&producto="+this.producto+"",idRequest:"dataMapaListasJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+idPais+"&chart=22",idRequest:"dataOpcListasJSON"});
	}
	//PEPS  
	if(_.indexOf(this.mapas,'MapaPEPS')>=0){
		
		//PEPS
		this.queue.add({
			idRequest:"dataMapaPEPSJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcPEPSJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/proveedores?consulta=6&pais="+idPais+"&fecha="+fecha+"&producto="+this.producto+"",idRequest:"dataMapaPEPSJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+idPais+"&chart=PEPS",idRequest:"dataOpcPEPSJSON"});
	}
	//Matriz de Riesgo por Estado  this.urlsRequest.push({url:"",idRequest:""});
	if(_.indexOf(this.mapas,'MapaMREstado')>=0){
		
		this.queue.add({
			idRequest:"dataMapaMREstadoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcMREstadoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		this.queue.add({
			idRequest:"dataMRTipoRiesgoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/matrizRiesgo?consulta=1&pais="+idPais+"&fecha="+fecha+"&producto="+this.producto+"&param1=",idRequest:"dataMapaMREstadoJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&chart=MR_riesgoEstado&pais="+idPais,idRequest:"dataOpcMREstadoJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/matrizRiesgo?consulta=5&pais="+idPais+"&fecha="+fecha+"&producto="+this.producto+"&param1=",idRequest:"dataMRTipoRiesgoJSON"});
	}
	if(_.indexOf(this.mapas,'MapaMRInaceptables')>=0){
		
		this.queue.add({
			idRequest:"dataMapaMRInaceptablesJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcMRInaceptablesJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/matrizRiesgo?consulta=1&pais="+idPais+"&fecha="+fecha+"&producto="+this.producto+"&param1=5",idRequest:"dataMapaMRInaceptablesJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+idPais+"&chart=MR_inaceptable",idRequest:"dataOpcMRInaceptablesJSON"});
	}
	
	
	if(_.indexOf(this.mapas,'MapaLimitesEfectivo')>=0){
		
		this.queue.add({
			idRequest:"dataMapaLimitesEfectivoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcLimitesEfectivoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		this.queue.add({
			idRequest:"panelDataLimitesEfectivoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/monitorAlertas?consulta=3&pais="+this.idPais+"&fecha="+$("#fecha").val()+"&producto="+this.producto,idRequest:"dataMapaLimitesEfectivoJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/monitorAlertas?consulta=4&pais="+this.idPais+"&fecha="+$("#fecha").val()+"&producto="+this.producto,idRequest:"panelDataLimitesEfectivoJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+this.idPais+"&chart=21",idRequest:"dataOpcLimitesEfectivoJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaElectoral')>=0){
		this.queue.add({
			idRequest:"dataCatalogoElectoralJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		this.queue.add({
			idRequest:"dataEleccionesEstadoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		this.queue.add({
			idRequest:"dataMapaElectoralJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcElectoralJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/proveedores?consulta=5&pais="+this.idPais+"&fecha="+fecha+"&producto="+this.producto,idRequest:"dataCatalogoElectoralJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/proveedores?consulta=7&pais="+this.idPais+"&fecha="+fecha+"&producto="+this.producto,idRequest:"dataEleccionesEstadoJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/proveedores?consulta=6&pais="+this.idPais+"&fecha="+fecha+"&producto="+this.producto,idRequest:"dataMapaElectoralJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+this.idPais+"&chart=17",idRequest:"dataOpcElectoralJSON"});
	}
	
	
	if(_.indexOf(this.mapas,'MapaMRAltoRiesgo')>=0){
		
		this.queue.add({
			idRequest:"dataMapaMRAltoRiesgoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcMRAltoRiesgoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/matrizRiesgo?consulta=1&pais="+idPais+"&fecha="+fecha+"&producto="+this.producto+"&param1=4",idRequest:"dataMapaMRAltoRiesgoJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+idPais+"&chart=MR_altoRiesgo",idRequest:"dataOpcMRAltoRiesgoJSON"});
	}
	
	
	if(_.indexOf(this.mapas,'MapaMRGeografico')>=0){
		
		this.queue.add({
			idRequest:"dataMapaMRLRGeograficoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcMRLRGeograficoJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/matrizRiesgoLAM?consulta=3&pais="+this.idPais+"&fecha="+$("#fecha").val()+"&producto="+this.producto+"&param1=",idRequest:"dataMapaMRLRGeograficoJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+this.idPais+"&chart=29",idRequest:"dataOpcMRLRGeograficoJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaCapacitacion')>=0){
		
		this.queue.add({
			idRequest:"dataMapaCapacitacionJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcCapacitacionJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		var fechaCap=$("#fecha").val().split("-");
		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/capacitacion?consulta=5&mes="+fechaCap[1]+"&anio="+fechaCap[0]+"&pais="+this.idPais,idRequest:"dataMapaCapacitacionJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&chart=3&pais="+this.idPais,idRequest:"dataOpcCapacitacionJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaCtsActvosApert')>=0){
		
		this.queue.add({
			idRequest:"dataMapaCtsActvApertJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcMapaCtsActvApertJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		this.queue.add({
			idRequest:"panelDataMapaCtsActvApertJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		
		this.queue.add({
			idRequest:"panelDataMapaAperturaSucursalJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasAlertas?consulta=3&pais="+this.idPais+"&fecha="+$("#fecha").val()+"&producto="+this.producto+"&param1=",idRequest:"panelDataMapaCtsActvApertJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasAlertas?consulta=4&pais="+this.idPais+"&fecha="+$("#fecha").val()+"&producto="+this.producto+"&param1=",idRequest:"panelDataMapaAperturaSucursalJSON"});
		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasAlertas?consulta=2&pais="+this.idPais+"&fecha="+$("#fecha").val()+"&producto="+this.producto+"&param1=",idRequest:"dataMapaCtsActvApertJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+this.idPais+"&chart=60",idRequest:"dataOpcMapaCtsActvApertJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaAltaDenominacion')>=0){
		
		this.queue.add({
			idRequest:"dataMapaAltaDenomJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcMapaAltaDenomJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		this.queue.add({
			idRequest:"panelDataMapaAltaDenomCantidadBJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasOperativas?consulta=3&pais="+this.idPais+"&fecha="+$("#fecha").val()+"&producto="+this.producto+"&param1=",idRequest:"panelDataMapaAltaDenomCantidadBJSON"});
		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasOperativas?consulta=2&pais="+this.idPais+"&fecha="+$("#fecha").val()+"&producto="+this.producto+"&param1=",idRequest:"dataMapaAltaDenomJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+this.idPais+"&chart=54",idRequest:"dataOpcMapaAltaDenomJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaOperacionesSospechosas')>=0){
		
		this.queue.add({
			idRequest:"dataMapaOpSospJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcMapaOpSospJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasOperativas?consulta=9&pais="+this.idPais+"&fecha="+$("#fecha").val()+"&producto="+this.producto+"&param1=",idRequest:"dataMapaOpSospJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+this.idPais+"&chart=62",idRequest:"dataOpcMapaOpSospJSON"});
	}
	
	if(_.indexOf(this.mapas,'MapaRptReg10USD')>=0){
		
		this.queue.add({
			idRequest:"dataMapaRptReg10usdJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});

		this.queue.add({
			idRequest:"dataOpcMapaRptReg10usdJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasOperativas?consulta=7&pais="+this.idPais+"&fecha="+$("#fecha").val()+"&producto="+this.producto+"&param1=",idRequest:"dataMapaRptReg10usdJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+this.idPais+"&chart=63",idRequest:"dataOpcMapaRptReg10usdJSON"});
	}
	
	//Rutas de Lavado de Dinero
	if(_.indexOf(this.mapas,'MapaRLD')>=0){
		this.queue.add({
			idRequest:"dataMapaRLDJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"				
		});
		
		this.queue.add({
			idRequest:"dataOpcRLDJSON",
			url:"",
			status:"200",
			time:"",
			message:"",
			reload:"",
			state:"",
			data:[],
			fechaInfo:"",
			owner:"mps"	
		});
		
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/cifrasControl?consulta=2&pais="+this.idPais+"&fecha="+$("#fecha").val()+"&producto="+this.producto+"&param1=",idRequest:"dataMapaRLDJSON"});
		this.urlsRequest.push({url:pathname+"/restModuloCentroMonitoreo/consulta/graficas?consulta=2&pais="+this.idPais+"&chart=48",idRequest:"dataOpcRLDJSON"});
	}
}

Mapas.prototype.render=function(){
	var self=this;
	var first=false;
	
	//Termina la carga de colores y pregunta Si state contiene un codigo 200 manda a llamar al otro metodo.
	if(this.queue.models.length===this.urlsRequest.length){
	    	_.each(this.queue.models,function(element,index){
	    		
	    		//Colores
	    		if(_.findWhere(element,{idRequest:"dataColoresGraficasJSON"})!=undefined){
	    			self.dataColoresGraficasJSON=_.findWhere(element,{idRequest:"dataColoresGraficasJSON"}).data;
	    			self.dataColoresGraficasJSON=self.dataColoresGraficasJSON.jsonResult;
	    			
	    		}
	    		if(_.findWhere(element,{idRequest:"dataColoresElectoralesJSON"})!=undefined){
	    			//Colores Electorales
    				self.dataColoresElectoralesJSON=_.findWhere(element,{idRequest:"dataColoresElectoralesJSON"}).data;
    				self.dataColoresElectoralesJSON=self.dataColoresElectoralesJSON.jsonResult;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"dataColoresElectoralesLNJSON"})!=undefined){
	    			//Colores Estados Listas Negras
    				self.dataColoresElectoralesLNJSON=_.findWhere(element,{idRequest:"dataColoresElectoralesLNJSON"}).data;
    				self.dataColoresElectoralesLNJSON=self.dataColoresElectoralesLNJSON.jsonResult;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"dataColoresLimitesEfectivoJSON"})!=undefined){
	    			//Colores Limites Efectivo
    				self.dataColoresLimitesEfectivoJSON=_.findWhere(element,{idRequest:"dataColoresLimitesEfectivoJSON"}).data;
    				self.dataColoresLimitesEfectivoJSON=self.dataColoresLimitesEfectivoJSON.jsonResult;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"dataColoresIndicadoresJSON"})!=undefined){
	    				self.dataColoresIndicadoresJSON=_.findWhere(element,{idRequest:"dataColoresIndicadoresJSON"}).data;
	    				self.dataColoresIndicadoresJSON=self.dataColoresIndicadoresJSON.jsonResult;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"dataColoresMapaCtsActvApertJSON"})!=undefined){
	    			//Colores Limites Efectivo
    				self.dataColoresMapaCtsActvApertJSON=_.findWhere(element,{idRequest:"dataColoresMapaCtsActvApertJSON"}).data;
    				self.dataColoresMapaCtsActvApertJSON=self.dataColoresMapaCtsActvApertJSON.jsonResult;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"dataColoresMapaAltaDenomJSON"})!=undefined){
	    			//Colores Billetes Alta Denominacion
    				self.dataColoresMapaAltaDenomJSON=_.findWhere(element,{idRequest:"dataColoresMapaAltaDenomJSON"}).data;
    				self.dataColoresMapaAltaDenomJSON=self.dataColoresMapaAltaDenomJSON.jsonResult;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"dataColoresMapaOpSospJSON"})!=undefined){
	    			//Colores Operaciones Sospechosas
    				self.dataColoresMapaOpSospJSON=_.findWhere(element,{idRequest:"dataColoresMapaOpSospJSON"}).data;
    				self.dataColoresMapaOpSospJSON=self.dataColoresMapaOpSospJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataColoresMapaRptReg10usdJSON"})!=undefined){
	    			//Colores Reportes Regulatorios 10 mil USD
    				self.dataColoresMapaRptReg10usdJSON=_.findWhere(element,{idRequest:"dataColoresMapaRptReg10usdJSON"}).data;
    				self.dataColoresMapaRptReg10usdJSON=self.dataColoresMapaRptReg10usdJSON.jsonResult;
	    		}
	    	});
	}
	self.mapa = new Mapa(self.dataColoresIndicadoresJSON,this.idPais);
	
	//Se construye el panel de 2 x 2
	if($(this.selector+" .nameScreen").length==1){
		var template=			'<div id="'+$(this.selector+" .nameScreen label").text().replace(/ /g,'')+'" class="container-fluid background-pantone-17914-c " style="height: 100%;">'+
								'	<div class="row" style="height: 100%;width:100%"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0px; height: 100%;">'+
								'		<div id="myCarouselMps_'+self.selectorUnico.replace("#","")+"_"+$(this.selector+" .nameScreen label").text().replace(/ /g,'')+'" class="carousel slide" data-ride="carousel">'+
								'			<ol class="carousel-indicators">'+
								'				<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>'+
								'				<li data-target="#carousel-example-generic" data-slide-to="1"></li>'+
								'				<li data-target="#carousel-example-generic" data-slide-to="2"></li>'+
								'			</ol>'+
								'			<div class="carousel-inner mps"></div>'+
								'				<nav class="controls-carousel-pld">'+
								'					<ul class="pager">'+
								'						<button type="button" class="btn btn-default" aria-label="Left Align" href="#myCarouselMps_'+self.selectorUnico.replace("#","")+"_"+$(this.selector+" .nameScreen label").text().replace(/ /g,'')+'" data-slide="prev">'+
								'							<i class="fa fa-backward " style="color:#FFF"></i>'+
								'						</button>'+
								'						<button type="button" class="btn btn-default" aria-label="Left Align" href="#myCarouselMps_'+self.selectorUnico.replace("#","")+"_"+$(this.selector+" .nameScreen label").text().replace(/ /g,'')+'" data-slide="pause">'+
								'							<i class="fa fa-pause " style="color:#FFF"></i>'+
								'						</button>'+
								'						<button type="button" class="btn btn-default" aria-label="Left Align" href="#myCarouselMps_'+self.selectorUnico.replace("#","")+"_"+$(this.selector+" .nameScreen label").text().replace(/ /g,'')+'" data-slide="cycle">'+
								'							<i class="fa fa-play " style="color:#FFF"></i>'+
								'						</button>'+
								'						<button type="button" class="btn btn-default" aria-label="Left Align" href="#myCarouselMps_'+self.selectorUnico.replace("#","")+"_"+$(this.selector+" .nameScreen label").text().replace(/ /g,'')+'" data-slide="next">'+
								'							<i class="fa fa-forward" style="color:#FFF"></i>'+
								'						</button>'+
								'					</ul>'+
								'				</nav>'+
								'			</div>'+
								'		</div>'+
								'	</div>'+
								'	<div id="paisFloat" style="position: relative;width:50px;height:50px">';
		  						if(self.paisIcon!=undefined){
		  							template+='		<img id="imgPais" class="animated bounceIn" src="resources/centroMonitoreo/imgpaises/individual/'+normalize(self.paisIcon)+'.png" ></div>';
		  						}
		  
		  						template+='	</div>'+
		  						'</div>';
		  						$(this.selector).append(template);
	}	

	this.setPositionIcon();
								

	
	var typMps=$(this.selectorUnico+" .nameScreen label").text().replace(/ /g,'');
	var $container=$(this.selector+" #"+typMps);
	this.selector=$container[0].id;
	
	$(this.selectorUnico+" #"+this.selector+" #myCarouselMps_"+self.selectorUnico.replace("#","")+"_"+this.selector).carousel({
		interval : 15000
	});

	//Despues de que avance el carousel
	$(this.selectorUnico+" #"+this.selector +" #myCarouselMps_"+self.selectorUnico.replace("#","")+"_"+this.selector).bind("slid.bs.carousel", function (e) {
		var mapId= $(self.selectorUnico+" #"+self.selector+' #'+e.relatedTarget.id).children()[0].id;
		self.mapa.drawSlidMap(self.selectorUnico,'#'+mapId,"#"+self.selector);
		$(".jvectormap-container").css("background-color","transparent");
	});
	
	//Antes de que avance el carousel se elimina el vTicker 
	$(this.selectorUnico+" #"+this.selector +" #myCarouselMps_"+self.selectorUnico.replace("#","")+"_"+this.selector).bind("slide.bs.carousel", function (e) {
		_.each($(self.selectorUnico+" #"+self.selector +" #svg-map-electoral .maps-peps #vt-peps-electorales"),function(item,indx){ 
			$(item).vTicker("remove");
		});
		
		_.each($(self.selectorUnico+" #"+self.selector +" #svg-map-electoral .maps-datos-electorales #vt-datos-electorales"),function(item,indx){ 
			$(item).vTicker("remove");
		});
		
		_.each($(self.selectorUnico+" #"+self.selector +" #svg-map-listas .maps-ln #vt"),function(item,indx){ 
			$(item).vTicker("remove");
		});
		
		_.each($(self.selectorUnico+" #"+self.selector +" #svg-map-limitesEfectivo .maps-lim-efvo #vt"),function(item,indx){ 
			$(item).vTicker("remove");
		});
		
		_.each($("#item-svg-map-electoral .maps-peps #vt-peps-electorales"),function(item,indx){ 
			$(item).vTicker("remove");
		});
		
		
	});
	var add=false;
	//Termina la carga de colores y pregunta Si state contiene un codigo 200 manda a llamar al otro metodo.
	if(this.queue.models.length===this.urlsRequest.length){
	    	_.each(this.queue.models,function(element,index){
	    		
	    		
	    		/**************************Alertas***********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaAlertaJSON"})!=undefined){	
	    				self.dataMapaAlertaJSON=_.findWhere(element,{idRequest:"dataMapaAlertaJSON"}).data;
	    				self.dataMapaAlertaJSON=self.dataMapaAlertaJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataOpcAlertaJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcAlertaJSON"}).status===200){
	    				self.dataOpcAlertaJSON=_.findWhere(element,{idRequest:"dataOpcAlertaJSON"}).data;
	    				self.dataOpcAlertaJSON=self.dataOpcAlertaJSON.jsonResultTree.options;
	    			}else{
	    				self.dataMapaAlertaJSON=[];
	    			}
	    			if(self.dataOpcAlertaJSON != undefined && self.dataMapaAlertaJSON != undefined){
	    				self.mapa.mapaC.add({selectorUnico:self.selectorUnico, idSelector:"#"+self.selector,idSelector:"#"+self.selector, container:self.dataOpcAlertaJSON.container, 			options:self.dataOpcAlertaJSON,  			data:self.dataMapaAlertaJSON,			chartData:null,panelData:null});
	    			}
	    		}
	    		
	    		/**********************************Alertas Reportes********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaReporteJSON"})!=undefined){	
	    				self.dataMapaReporteJSON=_.findWhere(element,{idRequest:"dataMapaReporteJSON"}).data;
	    				self.dataMapaReporteJSON=self.dataMapaReporteJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataOpcReporteJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcReporteJSON"}).status===200){
	    				self.dataOpcReporteJSON=_.findWhere(element,{idRequest:"dataOpcReporteJSON"}).data;
	    				self.dataOpcReporteJSON=self.dataOpcReporteJSON.jsonResultTree.options;
	    			}else{
	    				self.dataMapaReporteJSON=[];
	    			}
	    			if(self.dataOpcReporteJSON != undefined && self.dataMapaReporteJSON != undefined){
	    				self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container:self.dataOpcReporteJSON.container,			options:self.dataOpcReporteJSON, 			data:self.dataMapaReporteJSON,			chartData:null,panelData:null});
	    			}
	    		}
	    		
	    		/**********************************Listas Negras********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaListasJSON"})!=undefined){	
	    				self.dataMapaListasJSON=_.findWhere(element,{idRequest:"dataMapaListasJSON"}).data;
	    				self.dataMapaListasJSON=self.dataMapaListasJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataOpcListasJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcListasJSON"}).status===200){
	    				self.dataOpcListasJSON=_.findWhere(element,{idRequest:"dataOpcListasJSON"}).data;
	    				self.dataOpcListasJSON=self.dataOpcListasJSON.jsonResultTree.options;
	    			}else{
	    				self.dataMapaListasJSON=[];
	    			}
	    			if((self.dataOpcListasJSON != undefined && self.dataOpcListasJSON != '') && self.dataMapaListasJSON != undefined){
	    				self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container:self.dataOpcListasJSON.container,				options:self.dataOpcListasJSON,  			data:self.dataMapaListasJSON,			chartData:null,panelData:null,colors:self.dataColoresElectoralesLNJSON});
	    				// validar self.mapa.drawFirstMap(self.selector);
	    			}
	    		}
	    		/**********************************PEPES********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaPEPSJSON"})!=undefined){	
	    				self.dataMapaPEPSJSON=_.findWhere(element,{idRequest:"dataMapaPEPSJSON"}).data;
	    				self.dataMapaPEPSJSON=self.dataMapaPEPSJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataOpcPEPSJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcPEPSJSON"}).status===200){
	    				self.dataOpcPEPSJSON=_.findWhere(element,{idRequest:"dataOpcPEPSJSON"}).data;
	    				self.dataOpcPEPSJSON=self.dataOpcPEPSJSON.jsonResultTree.options;
	    			}else{
	    				self.dataMapaListasJSON=[];
	    			}
	    			if(self.dataOpcPEPSJSON != undefined && self.dataMapaPEPSJSON != undefined){
	    				self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container:self.dataOpcPEPSJSON.container,				options:self.dataOpcPEPSJSON,    			data:self.dataMapaPEPSJSON,				chartData:null,panelData:null});
	    				// validar self.mapa.drawFirstMap(self.selector);
	    			}
	    		}
	    		/**********************************Matirz de Riesgo por Estado********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaMREstadoJSON"})!=undefined){	
	    			self.dataMapaMREstadoJSON=_.findWhere(element,{idRequest:"dataMapaMREstadoJSON"}).data;
	    			self.dataMapaMREstadoJSON=self.dataMapaMREstadoJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataMRTipoRiesgoJSON"})!=undefined){	
	    			self.dataMRTipoRiesgoJSON=_.findWhere(element,{idRequest:"dataMRTipoRiesgoJSON"}).data;
	    			self.dataMRTipoRiesgoJSON=self.dataMRTipoRiesgoJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataOpcMREstadoJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcMREstadoJSON"}).status===200){
	    				self.dataOpcMREstadoJSON=_.findWhere(element,{idRequest:"dataOpcMREstadoJSON"}).data;
	    				self.dataOpcMREstadoJSON=self.dataOpcMREstadoJSON.jsonResultTree.options;
	    			}else{
	    				self.dataMapaMREstadoJSON=[];
	    			}
	    		}
	    		if(self.dataOpcMREstadoJSON != undefined && self.dataMapaMREstadoJSON != undefined){
    				if(self.dataMRTipoRiesgoJSON!=undefined || self.dataMRTipoRiesgoJSON!=null)
    					self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcMREstadoJSON.container,			options: self.dataOpcMREstadoJSON,    		data: self.dataMapaMREstadoJSON,			chartData: self.dataMRTipoRiesgoJSON,panelData:null});
    					self.dataMRTipoRiesgoJSON=null;
    			}
	    		
	    		/**********************************Matirz de Riesgo Geografico********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaMRLRGeograficoJSON"})!=undefined){	
	    			self.dataMapaMRLRGeograficoJSON=_.findWhere(element,{idRequest:"dataMapaMRLRGeograficoJSON"}).data;
	    			self.dataMapaMRLRGeograficoJSON=self.dataMapaMRLRGeograficoJSON.jsonResult;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"dataOpcMRLRGeograficoJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcMRLRGeograficoJSON"}).status===200){
	    				self.dataOpcMRLRGeograficoJSON=_.findWhere(element,{idRequest:"dataOpcMRLRGeograficoJSON"}).data;
	    				self.dataOpcMRLRGeograficoJSON=self.dataOpcMRLRGeograficoJSON.jsonResultTree.options;
	    			}else{
	    				self.dataMapaMRLRGeograficoJSON=[];
	    			}
	    		}
	    		if(self.dataOpcMRLRGeograficoJSON != undefined && self.dataMapaMRLRGeograficoJSON != undefined){
	    			self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcMRLRGeograficoJSON.container,			options: self.dataOpcMRLRGeograficoJSON,    		data: self.dataMapaMRLRGeograficoJSON,			chartData: null,panelData:null});
    				self.dataOpcMRLRGeograficoJSON=null;
    			}
	    		/**********************************INACEPTABLES********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaMRInaceptablesJSON"})!=undefined){	
	    				self.dataMapaMRInaceptablesJSON=_.findWhere(element,{idRequest:"dataMapaMRInaceptablesJSON"}).data;
	    				self.dataMapaMRInaceptablesJSON=self.dataMapaMRInaceptablesJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataOpcMRInaceptablesJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcMRInaceptablesJSON"}).status===200){
	    				self.dataOpcMRInaceptablesJSON=_.findWhere(element,{idRequest:"dataOpcMRInaceptablesJSON"}).data;
	    				self.dataOpcMRInaceptablesJSON=self.dataOpcMRInaceptablesJSON.jsonResultTree.options;
	    			}else{
	    				self.dataMapaMRInaceptablesJSON=[];
	    			}
	    			
	    			if(self.dataOpcMRInaceptablesJSON != undefined && self.dataMapaMRInaceptablesJSON != undefined){
	    				self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcMRInaceptablesJSON.container,	options: self.dataOpcMRInaceptablesJSON,		data: self.dataMapaMRInaceptablesJSON,	chartData:null,panelData:null});
	    			}
	    		}
	    		/**********************************Alto Riesgo********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaMRAltoRiesgoJSON"})!=undefined){	
	    				self.dataMapaMRAltoRiesgoJSON=_.findWhere(element,{idRequest:"dataMapaMRAltoRiesgoJSON"}).data;
	    				self.dataMapaMRAltoRiesgoJSON=self.dataMapaMRAltoRiesgoJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataOpcMRAltoRiesgoJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcMRAltoRiesgoJSON"}).status===200){
	    				self.dataOpcMRAltoRiesgoJSON=_.findWhere(element,{idRequest:"dataOpcMRAltoRiesgoJSON"}).data;
	    				self.dataOpcMRAltoRiesgoJSON=self.dataOpcMRAltoRiesgoJSON.jsonResultTree.options;
	    				
	    			}else{
	    				self.dataMapaMRAltoRiesgoJSON=[];
	    			}
	    			if(self.dataOpcMRAltoRiesgoJSON != undefined && self.dataMapaMRAltoRiesgoJSON != undefined){
	    				self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcMRAltoRiesgoJSON.container,		options: self.dataOpcMRAltoRiesgoJSON,    	data: self.dataMapaMRAltoRiesgoJSON,		chartData:null,panelData:null});
	    			}
	    		}
	    		/**********************************Capacitacion********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaCapacitacionJSON"})!=undefined){	
	    				self.dataMapaCapacitacionJSON=_.findWhere(element,{idRequest:"dataMapaCapacitacionJSON"}).data;
	    				self.dataMapaCapacitacionJSON=self.dataMapaCapacitacionJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataOpcCapacitacionJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcCapacitacionJSON"}).status===200){
	    				self.dataOpcCapacitacionJSON=_.findWhere(element,{idRequest:"dataOpcCapacitacionJSON"}).data;
	    				self.dataOpcCapacitacionJSON=self.dataOpcCapacitacionJSON.jsonResultTree.options;
	    				
	    			}else{
	    				self.dataMapaCapacitacionJSON=[];
	    				
	    			}
	    			
	    			if(self.dataOpcCapacitacionJSON != undefined && self.dataMapaCapacitacionJSON != undefined){
	    				self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcCapacitacionJSON.container,		options: self.dataOpcCapacitacionJSON,    	data: self.dataMapaCapacitacionJSON,		chartData:null,panelData:null});
	    			}
	    		}
	    		/**********************************Limites Efectivo********************************************/
	    		
	    		if(_.findWhere(element,{idRequest:"dataMapaLimitesEfectivoJSON"})!=undefined){
	    			self.dataMapaLimitesEfectivoJSON=_.findWhere(element,{idRequest:"dataMapaLimitesEfectivoJSON"}).data;
	    			self.dataMapaLimitesEfectivoJSON=self.dataMapaLimitesEfectivoJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"panelDataLimitesEfectivoJSON"})!=undefined){	
    				self.panelDataLimitesEfectivoJSON=_.findWhere(element,{idRequest:"panelDataLimitesEfectivoJSON"}).data;
    				self.panelDataLimitesEfectivoJSON=self.panelDataLimitesEfectivoJSON;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"dataOpcLimitesEfectivoJSON"})!=undefined){
	    			if(_.findWhere(element,{idRequest:"dataOpcLimitesEfectivoJSON"}).status===200){
	    				self.dataOpcLimitesEfectivoJSON=_.findWhere(element,{idRequest:"dataOpcLimitesEfectivoJSON"}).data;
	    				self.dataOpcLimitesEfectivoJSON=self.dataOpcLimitesEfectivoJSON.jsonResultTree.options;
	    			}else{
	    				self.dataMapaLimitesEfectivoJSON=[];
	    			}
	    		}
	    		if(!add){
	    			if(self.dataOpcLimitesEfectivoJSON != null && self.dataMapaLimitesEfectivoJSON != null && self.panelDataLimitesEfectivoJSON!=null){
	    				self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcLimitesEfectivoJSON.container,	options: self.dataOpcLimitesEfectivoJSON,		data: self.dataMapaLimitesEfectivoJSON,	chartData:null,panelData:self.panelDataLimitesEfectivoJSON,colors:self.dataColoresLimitesEfectivoJSON});
    					add=true;
	    			}
	    		}
	    		/**********************************Electoral********************************************/
	    		if(_.findWhere(element,{idRequest:"dataCatalogoElectoralJSON"})!=undefined){	
    				self.dataCatalogoElectoralJSON=_.findWhere(element,{idRequest:"dataCatalogoElectoralJSON"}).data;
    				self.dataCatalogoElectoralJSON=self.dataCatalogoElectoralJSON;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"dataEleccionesEstadoJSON"})!=undefined){	
    				self.dataEleccionesEstadoJSON=_.findWhere(element,{idRequest:"dataEleccionesEstadoJSON"}).data;
    				self.dataEleccionesEstadoJSON=self.dataEleccionesEstadoJSON;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"dataMapaElectoralJSON"})!=undefined){	
	    				self.dataMapaElectoralJSON=_.findWhere(element,{idRequest:"dataMapaElectoralJSON"}).data;
	    				self.dataMapaElectoralJSON=self.dataMapaElectoralJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataOpcElectoralJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcElectoralJSON"}).status===200){
	    				self.dataOpcElectoralJSON=_.findWhere(element,{idRequest:"dataOpcElectoralJSON"}).data;
	    				self.dataOpcElectoralJSON=self.dataOpcElectoralJSON.jsonResultTree.options;
	    			}else{
	    				self.dataMapaElectoralJSON=[];
	    			}
	    			if(parseInt(self.idPais)===1){
	    				if(self.dataOpcElectoralJSON != undefined && self.dataMapaElectoralJSON != undefined){
	    					self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcElectoralJSON.container,	options: self.dataOpcElectoralJSON,		data: self.dataMapaElectoralJSON,	chartData:self.dataEleccionesEstadoJSON,panelData:self.dataCatalogoElectoralJSON,colors:self.dataColoresElectoralesJSON});
	    				}
	    			}else{
	    				if(self.dataOpcElectoralJSON != undefined ){
	    					self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcElectoralJSON.container,	options: self.dataOpcElectoralJSON,		data: self.dataMapaElectoralJSON,	chartData:null,panelData:null,colors:self.dataColoresElectoralesJSON});
	    				}
	    			}
	    		}
	    		/**********************************Clientes Activos y Aperturas********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaCtsActvApertJSON"})!=undefined){	
    				self.dataMapaCtsActvApertJSON=_.findWhere(element,{idRequest:"dataMapaCtsActvApertJSON"}).data;
    				self.dataMapaCtsActvApertJSON=self.dataMapaCtsActvApertJSON.jsonResult;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"panelDataMapaCtsActvApertJSON"})!=undefined){	
    				self.panelDataMapaCtsActvApertJSON=_.findWhere(element,{idRequest:"panelDataMapaCtsActvApertJSON"}).data;
    				self.panelDataMapaCtsActvApertJSON=self.panelDataMapaCtsActvApertJSON;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"panelDataMapaAperturaSucursalJSON"})!=undefined){	
	    				self.panelDataMapaAperturaSucursalJSON=_.findWhere(element,{idRequest:"panelDataMapaAperturaSucursalJSON"}).data;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"dataOpcMapaCtsActvApertJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcMapaCtsActvApertJSON"}).status===200){
	    				self.dataOpcMapaCtsActvApertJSON=_.findWhere(element,{idRequest:"dataOpcMapaCtsActvApertJSON"}).data;
	    				self.dataOpcMapaCtsActvApertJSON=self.dataOpcMapaCtsActvApertJSON.jsonResultTree.options;
	    			}else{
	    				self.dataOpcMapaCtsActvApertJSON=[];
	    			}
	    		}
	    		
	    		if(self.dataOpcMapaCtsActvApertJSON != undefined && self.dataMapaCtsActvApertJSON != undefined && self.dataMapaCtsActvApertJSON!= undefined  && self.panelDataMapaAperturaSucursalJSON!=undefined){
					self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcMapaCtsActvApertJSON.container,	options: self.dataOpcMapaCtsActvApertJSON,		data: self.dataMapaCtsActvApertJSON,	chartData:self.panelDataMapaCtsActvApertJSON,panelData:self.panelDataMapaAperturaSucursalJSON,colors:self.dataColoresMapaCtsActvApertJSON});
					//Cuando se agregan se vacian para que no se vuelva a agregar
					self.dataOpcMapaCtsActvApertJSON =undefined;
	    		}
	    		
	    		/**********************************Billetes Alta Denominacion********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaAltaDenomJSON"})!=undefined){	
    				self.dataMapaAltaDenomJSON=_.findWhere(element,{idRequest:"dataMapaAltaDenomJSON"}).data;
    				self.dataMapaAltaDenomJSON=self.dataMapaAltaDenomJSON.jsonResult;
	    		}
	    		
	    		if(_.findWhere(element,{idRequest:"panelDataMapaAltaDenomCantidadBJSON"})!=undefined){	
    				self.panelDataMapaAltaDenomCantidadBJSON=_.findWhere(element,{idRequest:"panelDataMapaAltaDenomCantidadBJSON"}).data;
    				self.panelDataMapaAltaDenomCantidadBJSON=self.panelDataMapaAltaDenomCantidadBJSON;
	    		}
	    		
	    		
	    		if(_.findWhere(element,{idRequest:"dataOpcMapaAltaDenomJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcMapaAltaDenomJSON"}).status===200){
	    				self.dataOpcMapaAltaDenomJSON=_.findWhere(element,{idRequest:"dataOpcMapaAltaDenomJSON"}).data;
	    				self.dataOpcMapaAltaDenomJSON=self.dataOpcMapaAltaDenomJSON.jsonResultTree.options;
	    			}else{
	    				self.dataOpcMapaAltaDenomJSON=[];
	    			}
	    		}
	    		
	    		if(self.dataOpcMapaAltaDenomJSON != undefined && self.dataMapaAltaDenomJSON != undefined && self.panelDataMapaAltaDenomCantidadBJSON!= undefined ){
					self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcMapaAltaDenomJSON.container,	options: self.dataOpcMapaAltaDenomJSON,		data: self.dataMapaAltaDenomJSON,	chartData:null,panelData:self.panelDataMapaAltaDenomCantidadBJSON,colors:self.dataColoresMapaAltaDenomJSON});
					//Cuando se agregan se vacian para que no se vuelva a agregar
					self.dataOpcMapaAltaDenomJSON =undefined;
	    		}
	    		/**********************************Operaciones Sospechosas********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaOpSospJSON"})!=undefined){	
    				self.dataMapaOpSospJSON=_.findWhere(element,{idRequest:"dataMapaOpSospJSON"}).data;
    				self.dataMapaOpSospJSON=self.dataMapaOpSospJSON.jsonResult;
	    		}
	    		
	    		
	    		if(_.findWhere(element,{idRequest:"dataOpcMapaOpSospJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcMapaOpSospJSON"}).status===200){
	    				self.dataOpcMapaOpSospJSON=_.findWhere(element,{idRequest:"dataOpcMapaOpSospJSON"}).data;
	    				self.dataOpcMapaOpSospJSON=self.dataOpcMapaOpSospJSON.jsonResultTree.options;
	    			}else{
	    				self.dataOpcMapaOpSospJSON=[];
	    			}
	    		}
	    		
	    		if(self.dataOpcMapaOpSospJSON != undefined && self.dataMapaOpSospJSON != undefined){
					self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcMapaOpSospJSON.container,	options: self.dataOpcMapaOpSospJSON,		data: self.dataMapaOpSospJSON,	chartData:null,panelData:null,colors:self.dataColoresMapaOpSospJSON});
					//Cuando se agregan se vacian para que no se vuelva a agregar
					self.dataMapaOpSospJSON =undefined;
	    		}
	    		/**********************************Reportes Regulatorios 10 mil USD*******************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaRptReg10usdJSON"})!=undefined){	
    				self.dataMapaRptReg10usdJSON=_.findWhere(element,{idRequest:"dataMapaRptReg10usdJSON"}).data;
    				self.dataMapaRptReg10usdJSON=self.dataMapaRptReg10usdJSON.jsonResult;
	    		}
	    		
	    		
	    		if(_.findWhere(element,{idRequest:"dataOpcMapaRptReg10usdJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcMapaRptReg10usdJSON"}).status===200){
	    				self.dataOpcMapaRptReg10usdJSON=_.findWhere(element,{idRequest:"dataOpcMapaRptReg10usdJSON"}).data;
	    				self.dataOpcMapaRptReg10usdJSON=self.dataOpcMapaRptReg10usdJSON.jsonResultTree.options;
	    			}else{
	    				self.dataOpcMapaOpSospJSON=[];
	    			}
	    		}
	    		
	    		if(self.dataMapaRptReg10usdJSON != undefined && self.dataOpcMapaRptReg10usdJSON != undefined){
					self.mapa.mapaC.add({selectorUnico:self.selectorUnico,idSelector:"#"+self.selector,container: self.dataOpcMapaRptReg10usdJSON.container,	options: self.dataOpcMapaRptReg10usdJSON,		data: self.dataMapaRptReg10usdJSON,	chartData:null,panelData:null,colors:self.dataColoresMapaRptReg10usdJSON});
					//Cuando se agregan se vacian para que no se vuelva a agregar
					self.dataMapaRptReg10usdJSON =undefined;
	    		}
	    		
	    		/**************************Rutas Lavado de Dinero***********************************************/
	    		if(_.findWhere(element,{idRequest:"dataMapaRLDJSON"})!=undefined){	
	    				self.dataMapaRLDJSON=_.findWhere(element,{idRequest:"dataMapaRLDJSON"}).data;
	    				self.dataMapaRLDJSON=self.dataMapaRLDJSON.jsonResult;
	    		}
	    		if(_.findWhere(element,{idRequest:"dataOpcRLDJSON"})!=undefined){	
	    			if(_.findWhere(element,{idRequest:"dataOpcRLDJSON"}).status===200){
	    				self.dataOpcRLDJSON=_.findWhere(element,{idRequest:"dataOpcRLDJSON"}).data;
	    				self.dataOpcRLDJSON=self.dataOpcRLDJSON.jsonResultTree.options;
	    			}else{
	    				self.dataMapaRLDJSON=[];
	    			}
	    			if(self.dataOpcRLDJSON != undefined && self.dataMapaRLDJSON != undefined){
	    				self.mapa.mapaC.add({selectorUnico:self.selectorUnico, idSelector:"#"+self.selector,idSelector:"#"+self.selector, container:self.dataOpcRLDJSON.container, 			options:self.dataOpcRLDJSON,  			data:self.dataMapaRLDJSON,			chartData:null,panelData:null});
	    			}
	    		}
	    	});
	}
	var carouselSelector=this.selectorUnico+" #"+this.selector+" #myCarouselMps_"+self.selectorUnico.replace("#","")+"_"+this.selector;
	if(!first){
		if($(carouselSelector+" div.carousel-inner.mps").children().length>0){
		self.mapa.drawFirstMap(self.selectorUnico,self.selector);
		first=true;
		}else{
			$(this.selectorUnico+" #"+this.selector).empty();
			$(this.selectorUnico+" #"+this.selector).append('<div class="row" style="height:100%;">'+
															  '		<div class="col-md-12" style="height:100%;">'+
															  '			<div class="row" style="height:50%;">'+
															  '				<div class="col-md-12" style="padding-top:85px;">'+
															  '					<center><i class="fa fa-exclamation-triangle fa-5x" style="color:#ff7800" ></i></center>'+
															  '				</div>'+
															  '			</div>'+
															  '			<div class="row" style="height:50%;">'+
															  '				<div class="col-md-12 font-style-headers-pld" style="text-align: center;">'+
															  '					<h4>No se encuentra información para generar el mapa</h4>'+
															  '				</div>'+
															  '			</div>'+
															  '		</div>'+
															  '	</div>');
		}
		
		/*self.mapa.drawFirstMap(self.selectorUnico,self.selector);
		first=true;*/
	}
	
	//elimino los div con el nombre del panel
	$("#"+this.selector +"_1 .nameScreen").remove();
}

Mapas.prototype.setPositionIcon=function(){
	var self=this;
	//Obtengo la posicion absoluta del div.container-fluid
    var mainLeft	=$(this.selector+" div.container-fluid").offset().left;
   
    var leftPaisFloat=$(this.selector+" div.container-fluid").width() - $(this.selector+" div#paisFloat").width();
    
    $(this.selector+" div#paisFloat").css("left", leftPaisFloat);
    $(this.selector+" div#paisFloat").css("top"	, $(this.selector+" div.container-fluid").offset().top - ($(this.selector+" div#paisFloat").offset().top));
}

Mapas.prototype.reloadChart=function(){
	console.debug("Begin reloadChart :: Mapas");
	var self=this;
}

Mapas.prototype.destruir=function(){
	console.debug("Destoying objects :: Mapas");
}

Mapas.prototype.msjError=function(){
	$(this.selector).empty();
	$(this.selector).append('<div class="rowFlx container-fluid background-pantone-17914-c" style="height: 100%;"><div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0px;margin: 0px;height: 100%;"><div class="row col-lg-12 col-md-12 col-sm-12 "><div style="color:#fff;float: right;" class="col-lg-6 col-md-6 col-sm-6"><i class="fa fa-exclamation-triangle fa-6"></i></div></div><div class="row col-lg-12 col-md-12 col-sm-12 "><div style="color:#fff;float: right;" class="col-lg-7 col-md-7 col-sm-7 "><label><h3>No se encontro informacion para los valores solicitados</h3></label></div></div></div></div>');
	//elimino los div con el nombre del panel
	$(this.selector+" .nameScreen").remove();
}


//--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*-----
//--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*-----
//--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*-----
//--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*--*-----

//--Mapas Class --
var Mapa = function(colores,idPais){
	var self=this;
	//Se declaran los atributos de la clase
	this.mapaC     			= new MapaCollection();
	this.options   			= null;
	this.data      			= null;
	this.selector  			= null;
	this.markersMap   		= null;
	this.markersTable   	= null;
	this.tableHtml 			= null;
	this.coloresIndicadores	= colores;
	this.coloresZona		= null;
	this.cicle 				= null;
	this.idPais      		= idPais;
	
	this.mapaC.on( 'add', function(){
		var added = this.mapaC.at(this.mapaC.length-1).get("container");
		var idSelector = this.mapaC.at(this.mapaC.length-1).get("idSelector");
		var selectorUnico= this.mapaC.at(this.mapaC.length-1).get("selectorUnico");
		//console.info("added");
		//console.info(added);

		if(this.mapaC.at(this.mapaC.length-1).get("data")!="" && this.mapaC.at(this.mapaC.length-1).get("data")!=null){
			this.addItemCarousel(selectorUnico,added.replace("#",''),idSelector);
		}else{
			console.debug("Remove model cause there isn't data for "+this.mapaC.at(this.mapaC.length-1).get("container"))
			this.mapaC.remove(this.mapaC.at(this.mapaC.length-1))
		}
	} ,this);
}

Mapa.prototype.addItemCarousel = function(selectorUnico,selector,idSelector){
	var self=this;
	var active =  'active';
	if( this.mapaC.length>1 ){
		active=''
	}
	var _template= ''+
	'<div class="item '+active+'" id="item-'+selector+'">'+
	'  <div id="'+selector+'" class="mapDefinition" ></div>'+
	'</div>';
	$(selectorUnico+" "+idSelector+" .carousel-inner.mps").append(_template);
}

Mapa.prototype.drawFirstMap = function(selectorUnico,idSelector){
	var self=this;
	if(this.mapaC.length>0){
		this.drawSlidMap(selectorUnico,this.mapaC.at(0).get("container"),"#"+idSelector);
		$(".jvectormap-container").css("background-color","transparent");
	}
}

Mapa.prototype.drawSlidMap = function(selectorUnico,selector,idSelector){
	var self=this;
	var result=this.mapaC.findWhere({container:selector});
	this.options  	=  new OptionsModel(result.get("options"));
	this.data  		=  new PaisCollection(result.get("data"));
	self.selector 	=  selectorUnico+" "+idSelector+" "+result.get("container");
	self.coloresZona=result.get("colors");
	
	if(result.get("container")==="#svg-map-electoral" ){
		this.getColoresMapa(self.coloresZona,'Electoral');		
	};
	
	if(result.get("container")==="#svg-map-listas" ){
		this.getColoresMapa(self.coloresZona,'ListasNegras');		
	};
	
	if(result.get("container")==="#svg-map-limitesEfectivo" ){
		this.getColoresMapa(self.coloresZona,'LimitesEfectivo');		
	};
	
	if(result.get("container")==="#svg-map-ctsActvos" ){
		this.getColoresMapa(self.coloresZona,'ActivosAperturas');
	}	
	
	if(result.get("container")==="#svg-map-altaDenm" ){
		this.getColoresMapa(self.coloresZona,'AltaDenominacion');
	}
	
	if(result.get("container")==="#svg-map-op-sosp" ){
		this.getColoresMapa(self.coloresZona,'OpSospechosas');
	}
	
	if(result.get("container")==="#svg-map-rptReg-10milUSD" ){
		this.getColoresMapa(self.coloresZona,'RptReg10milUSD');
	}
	
	if(result.get("container")==="#svg-map-rld" ){
		this.getColoresMapa(self.coloresZona,'RutasLavadoDinero');
	}
	
	this.seriesJSON   = _.object(this.data.pluck('IdEstado'), this.data.pluck('Alertas'))
	this.markersMap   =  new PaisCollection();
	this.markersTable =  new PaisCollection()
	//this.markersMap   =  new PaisCollection(this.data.filter(function(item){return (item.get("Indicador")>=this.options.get("levelAlertVisible")&& item.get("Alertas")>0);},this));
	//this.markersTable =  new PaisCollection(this.data.filter(function(item){return (item.get("Indicador")>=this.options.get("levelAlertTable")&& item.get("Alertas")>0);},this));
	
	
	//Tablero de Alertas (por default) se hace el filtrado sobre una instancia nueva de paisCollection ya que de lo contrario el modelo seria el mismo y backbone no permite modelos duplicados
	this.markersTable.add(
			_.each(new PaisCollection(result.get("data")).filter(function(item){
								return (item.get("Indicador")>=this.options.get("levelAlertTable")&& item.get("Alertas")>0);
							},this
					),
					function(item){
						item.set({secondIcon:false,icon:this.options.get("icon"),titleAlert:this.options.get("titleAlert")})
					},this
			)
	);
	//Esta coleccion contiene la informacion para el renderizado del mapa y tabla
	this.markersMap.add(
			_.each(
					new PaisCollection(result.get("data")).filter(function(item){
								return (item.get("Indicador")>=this.options.get("levelAlertVisible")&& item.get("Alertas")>0);
							},this
					),
					function(item){
						item.set({secondIcon:false,icon:this.options.get("icon"),titleAlert:this.options.get("titleAlert")})
					},this
			)
	);

	if(this.options.get("hasSecondMarker")){
		this.markersTable.add(
				_.each(
						new PaisCollection(result.get("data")).filter(function(item){
									return (item.get("Indicador2")>=this.options.get("levelAlertTable")&& item.get("Alertas2")>0);}
								,this),
								function(item){
									item.set({secondIcon:true,icon:this.options.get("icon2"),titleAlert:this.options.get("titleAlert2")})
								},this
				)
		)
		this.markersMap.add(
				_.each(
						new PaisCollection(result.get("data")).filter(
								function(item){
									return (item.get("Indicador2")>=this.options.get("levelAlertTable")&& item.get("Alertas2")>0);
								},
								this),
								function(item){
									item.set({secondIcon:true,icon:this.options.get("icon2"),titleAlert:this.options.get("titleAlert2")})
								},this
				)
		)
	}

	//console.debug(this.markersMap.models)
	
	
	if(this.options.get("chart")){
		if(this.options.get("chartType")=="gauge"){
			this.dataGaugeChart= new GaugeCollection(result.get('chartData'));
		}
	}

	$(self.selector).children().remove();

	if(this.data.length>0){
		if(this.options != undefined)
		{
			this.draw();
			if(this.options.get("showTableInfo")){
				if(this.options.get("typeTableInfo")=="marker"){
					this.tableMarker();
				}else if(this.options.get("typeTableInfo")=="tableLimEfec"){
					this.panelData=result.get('panelData');
					this.tableLimitesEfectivo();
				}else if(this.options.get("typeTableInfo")=="tableLeyendaElectoral"){
					
					this.panelData=result.get('panelData');
					this.chartData=result.get('chartData');
					
					//Se valida que sea México ya que para LAM no hay calendario Electoral
					if(parseInt(self.idPais)===1){
						this.tableLeyendaElectoral();
						this.tableDatosElectorales();
					}
					
					//Se genera el panel con el detalle de las detecciones si es que hay detecciones
					if(this.markersMap.length > 0){
						this.tablePEPs();
					}
				}else if(this.options.get("typeTableInfo")=="tableLeyendaLN"){
					this.table();
					this.tableLN();
				}else if(this.options.get("typeTableInfo")=="ClientesActvosAper"){
					this.panelData=result.get('panelData');
					this.chartData=result.get('chartData');
					this.tablesCtsActvosApert();
					
					if(this.options.get("tableLegend")){
						var markersText=[this.options.get("markersText")];
						var legendText=[this.options.get("legendText")];
						this.tableLegend(self.coloresZona.slice(1,2),this.options.get("markerLegend"),this.markersMap.models.slice(0,1),markersText,legendText,this.options.get("classChart3"));
					}
					
				}else if(this.options.get("typeTableInfo")=="billeteAltaDenm"){
					this.panelData=result.get('panelData');
					this.tablesBilletesAltaDenm();
				}else if(this.options.get("typeTableInfo")=="opSospechosas"){
					this.tableOpSospechosas();
					if(this.options.get("tableLegend")){
						var markersText=[this.options.get("markersText")];
						var legendText=[this.options.get("legendText")+" (ROS)"];
						this.tableLegend(self.coloresZona.slice(1,2),this.options.get("markerLegend"),this.markersMap.models.slice(0,1),markersText,legendText,this.options.get("classChart3"));
					}
				}else if(this.options.get("typeTableInfo")=="rptReg10milUSD"){
					this.tableOpSospechosas();
					if(this.options.get("tableLegend")){
						var markersText=[this.options.get("markersText")];
						var legendText=[this.options.get("legendText")+" (ROS)"];
						this.tableLegend(self.coloresZona.slice(1,2),this.options.get("markerLegend"),this.markersMap.models.slice(0,1),markersText,legendText,this.options.get("classChart3"));
						//console.info(this.markersMap)
					}
				}else{
					this.table();
				}
			}
			
			if(this.options.get("markerType")=="dots"){
				this.drawMarkerDots();
			}
			else if(this.options.get("markerType")=="icon"){
				this.drawMarkerIcon();
			}
			else if(this.options.get("markerType")=="pulses"){
				this.drawMarkerDots();
			}else if(this.options.get("markerType")=="star"){
				this.drawMarkerStarIcon();
			}else if(this.options.get("markerType")=="routes"){
				this.drawMarkerRoutes();
			}

			if(this.options.get("chart")){
				if(this.options.get("chartType")=="gauge"){
					this.drawGaugeChart()
				}
				if(this.options.get("chartType")=="bar"){
					clearInterval(this.cicle);
					this.drawBarChart();
				}
			}

			this.title();

		}else{
			console.debug("there isn't options defined")
		}
	}else{
		console.debug("there isn't data defined")
	}

}
Mapa.prototype.getColoresMapa = function (colores,tipoMapa){
	 var self=this;
	 
	 this.ColorEstado=[];
	 this.seriesColorJSON=["#FFF"];//Se agrega este para el elmento 0 que no existe en el mapa; ya que si esta vacio truena
	 _.each(this.data.models,function(item,index){
		 if(tipoMapa==='Electoral')
			 self.ColorEstado.push({idEstado:item.get("IdEstado"),color:_.findWhere(colores,{IdOrden:item.get("IdColor")}).color});
		 else if(tipoMapa==='ListasNegras')
			 self.ColorEstado.push({idEstado:item.get("IdEstado"),color:_.findWhere(colores,{IdOrden:item.get("Indicador")}).color});
		 else if(tipoMapa==='LimitesEfectivo' || tipoMapa==='ActivosAperturas' || tipoMapa==='AltaDenominacion' || tipoMapa==='OpSospechosas' || tipoMapa==='RptReg10milUSD')
			 self.ColorEstado.push({idEstado:item.get("IdEstado"),color:_.findWhere(colores,{IdOrden:item.get("IndicadorZona")}).color});
		 else if(tipoMapa==='RutasLavadoDinero'){
			 /*Colores posibles
			  * cfd8dc gris
			  *e0e0e0 gris
			  *283593 azul
			  *4527a0 morado
			  *311b92 morado
			  *2c2c43 el d3
			  * */
			 
			 for(var i=0;i<32;i++)
				 self.ColorEstado.push({idEstado:i+1,color:"#2c2c43    "});
		 }
			 
	 });
	 var ColorEstadoOrdered=_.sortBy(self.ColorEstado, function(item){ 
		 return item.idEstado; 
	});
	 
	 _.each(ColorEstadoOrdered,function(item){
		 self.seriesColorJSON.push(item.color);	 
	 });
	
	 
}

Mapa.prototype.drawBarChart = function (){
	var self=this;
	var mapHeight = Number($(self.selector ).css("height").replace('px',''));
	$(self.selector).append("<div id='chart-bar' class='ct-chart  table-map '> <div>")
	$(self.selector+' #chart-bar').css('height', mapHeight*.30 );
	$(self.selector+' #chart-bar').css('width' , mapHeight*.50 );

	this.drawBarChartRedraw()
	var self=this;

	this.cicle = setInterval(function(){self.drawBarChartRedraw();},2000);

}

Mapa.prototype.drawBarChartRedraw = function(){
	var self=this;
	if ( typeof Chartist === 'undefined' ) return;

	if ( !$(self.selector+' #chart-bar').length)return;

	new Chartist.Bar(self.selector+" #chart-bar",
			{
		labels:this.markersMap.pluck("Estado").slice(0, 5),
		series:[ this.markersMap.pluck("Alertas").slice(0, 5)]
			},
			{
				seriesBarDistance: 10,
				reverseData: true,
				horizontalBars: true,
				axisY: {
					offset: 100
				}
			}
	);
	this.markersMap.add(this.markersMap.shift());
}

Mapa.prototype.drawBarChartStop =   function(){
	clearInterval(this.cicle);
}

Mapa.prototype.drawGaugeChart = function (){
	var self=this;
	var mapHeight = Number($(self.selector ).css("height").replace('px',''))/4;
	var template = _.template("<div class='table-map '>"+
							  "	<%items.forEach(function(item){ %>"+
							  " <div class='chart-gauge' style='height: 100px; width: 100px' id=\'<%=item.get('Riesgo').replace(' ','') %>\'></div>"+
							  "	<%}) %>"+
							  "</div>");
	$(self.selector).append(template({items:this.dataGaugeChart}));
	$('.chart-gauge').css('height', mapHeight );
	$('.chart-gauge').css('width' , mapHeight );
	
	//var colors=["#FF4136","#00A65A","#D4BC2E"];
	
	this.dataGaugeChart.each( function(item){
		var levelColor=[];
		levelColor.push(self.coloresIndicadores[item.get("Indicador")].color);
		var g = new JustGage({
			id: item.get("Riesgo").replace(/ /g,''),
			value:item.get("Total"),
			min: 0,
			max: this.dataGaugeChart.max("Total").get("Total"),
			title: item.get("Riesgo"),
			decimals : 0,
			gaugeWidthScale : 0.6,
			valueFontColor : '#FFF',
			titleFontColor  : '#FFF',
			levelColors: levelColor
		}); 
	},this)
}

Mapa.prototype.title = function (){
	var self=this;
	var title='<div class="title-map font-sub-header font-style-headers-pld">'+this.options.get('tittleTable')+'</div>';
	$(self.selector).append(title);
}

Mapa.prototype.drawMarkerDots = function (){
	var self=this;
	//console.info('Draw marker dots')
	var svg = d3.select(self.selector+" div.jvectormap-container svg g");
	//console.info(self.selector+" div.jvectormap-container svg g")
	//console.info(svg)
	/*var maxValue = this.markers.max("Alertas").get("Alertas")
		var minValue = this.markers.min("Alertas").get("Alertas")
		var boundaryMin = (Math.log(minValue))
		var boundary = ((Math.log(maxValue)) - (Math.log(minValue))) / 9;
		var boundaries = [];
		var radio = [];

		for (var iBoundary = 0; iBoundary < 10; iBoundary++) {
			boundaries.push(Math.exp(boundaryMin + (boundary * iBoundary)));
		}
		this.markers.each(function(item,index) {
			var myBoundary = 0
			for (var iBoundary = 0; iBoundary < 10; iBoundary++) {
				if (item.get("Alertas") >= boundaries[iBoundary]) {
					myBoundary = iBoundary + 1;
				} else {
					break;
				}
			}
			radio.push(myBoundary);
		});*/

	var radio = [1,4,7,10,12];
	this.markersMap.each(function(item) {
		//console.info(item.get("coorX"))
		//console.info(item.get("coorY"))
		svg.append("circle")
		.attr("stroke-width", 1)
		.attr("r", parseInt(item.get("Indicador")) + parseInt(radio[item.get("Indicador")]))
		.attr("cx", item.get("coorX"))
		.attr("cy", item.get("coorY"))
		.style("fill", "#F08080")
		.style("stroke", "#A52A2A")
		.style("opacity", 0.85)
		.append("title")
		.text(function(d) {
			return 'Alertas:' + item.get("Alertas");
		});
	},this);
}


Mapa.prototype.drawMarkerIcon = function (){
	var self=this;
	var svg    = d3.select(self.selector+" div.jvectormap-container svg g");

	var estado = 1;
	this.markersMap.each(function(item,indx) {
		if(self.options.get("drawTop5")){
			if(item.get("secondIcon")){
		
			estado=-1
			}
			svg.append("image")
			.attr("x", item.get("coorX")-((15/2)*estado))
			.attr("y", item.get("coorY")-(15/2))
			//.attr("x", item.get("coorX"))
			//.attr("y", item.get("coorY"))
			.attr('width', '15px')
			.attr('height', '15px')
			//.attr("xlink:href",'default/image/'+item.get("icon")+item.get("Indicador")+'.png' );
			.attr("xlink:href",'resources/centroMonitoreo/img/maps/'+item.get("icon")+item.get("Indicador")+'.png' );
		}else{
			if(indx===0){
				if(item.get("secondIcon")){
					estado=-1
				}
				svg.append("image")
					.attr("x", item.get("coorX")-((15/2)*estado))
					.attr("y", item.get("coorY")-(15/2))
					//.attr("x", item.get("coorX"))
					//.attr("y", item.get("coorY"))
					.attr('width', '15px')
					.attr('height', '15px')
					//.attr("xlink:href",'default/image/'+item.get("icon")+item.get("Indicador")+'.png' );
					.attr("xlink:href",'resources/centroMonitoreo/img/maps/'+item.get("icon")+item.get("Indicador")+'.png' );
			}
		}
	},this);
}

Mapa.prototype.tableMarker = function(){
	var self=this;
	var table2=		'<div id="labels" class="table-map" >';
		table2 +=	'	<%items.forEach(function(item){ %> ';
		table2 += 	'		<div class="row widget widget-stats bg-blue" style="width:250px">'
		table2 += 	'  			<div class="row stats-title"><span style="align:center"><%=item.get("titleAlert")%></span></div>'
		table2 += 	'  			<div class="row">'
		table2 += 	'  				<div class="col-md-8 stats-number">'
		table2 +=	'					$ <%=item.get("Alertas")%>'
		table2 +=	'				</div>'
		table2 += 	'  				<div class="col-md-4">'
		table2 += 	'    				<img src="'+'resources/centroMonitoreo/img/maps/<%=item.get("icon")%>.png"></img>'
		table2 += 	'  				</div>'
		table2 += 	'  			</div>'
		table2 += 	'  			<div class="row">'
		table2 += 	'					Ciudad: <%=item.get("Estado")%>'
		table2 += 	'  			</div>'
		table2 += 			'</div>'
		table2 += 	'	<%})%>'
		table2 += 	'</div>'
//													<div class='table-map '> <%items.forEach(function(item){ %> <div class='chart-gauge' style='height:100px;width:100px' id=\'<%=item.get('Riesgo').replace(' ','') %>\'></div> <%}) %> </div>
	var template = _.template(table2);
	var self=this
		$(self.selector).append(template({items:this.markersTable,self:this}));

	//$(this.selector).append('<div id="labels" class="map-chart-bottom-left" >'+table2+'</div>');
}

Mapa.prototype.table = function(){
	var self=this;
	var _templado = '<table class="table-map chart-legend-table">'+
					'	<%items.forEach(function(item){%> '+
					'		<%if(!item.get("secondIcon")){%> '+
					'			<tr>'+
					'				<td class="font-body-panel-map"><span class="badge info"><%=item.get("Alertas")%> <span></td>'+
					'				<td class="font-body-panel-map"><%=item.get("Estado")%> </td>'+
					'			</tr>'+
					'		<% }%>'+
					'	<% })%>'+
					'</table>';
	
	var template = _.template(_templado);
	this.tableHtml=template({items:this.markersMap});
	$(self.selector).append(this.tableHtml);
	/*var template= '<table class="table-map chart-legend-table">';
	_.each(this.markersMap.models,function(item,indx){
		if(item.get("secondIcon"))
			template+=	'<tr>'+
						'	<td class="chart-legend-text"><span class="badge info"><%=item.get("Alertas")%> <span></td>'+
						'	<td class="chart-legend-text"><%=item.get("Estado")%> </td>'+
						'</tr>';
	});
	template+='</table>';
	$(self.selector).append(template);*/
	/*var tableHtml = '<div class="map-chart-bottom-left panel panel-default animated slideInRight info-map maps-lim-efvo" style="width:40%;max-height:300px;">'+
					'	<div id="info-map-head" class="panel-heading panel-heading-map border-electoral">'+
					'	*'+	
					'	</div>'+
					'	<div class="panel-body">'+
					'	*'+
					'	</div>'+
					'</div>';
	
	$(self.selector).append(this.tableHtml);
*/

}

Mapa.prototype.tableLimitesEfectivo = function(){
	var self=this;
	var table = '<div class="'+this.options.get("classChart")+' panel panel-default animated slideInRight info-map maps-lim-efvo" style="width:40%;max-height:300px;">'+
				'	<div id="info-map-head" class="panel-heading panel-heading-map border-electoral">'+
				'		<div class="row heads-lim-efvo">';
	_.each(this.panelData.headers,function(item){
		table+=	'			<div class="col-md-3 font-headers-panel-map">'+item.name+'</div>';
	});
	
	table+=		'		</div>'+
				'	</div>'+
				'	<div class="panel-body">'+
				'		<div id="vt" style="width: 100%;">'+
				'			<ul style="width: 100%;">';

	$.each(this.panelData.jsonResult,function(index,item){
		table +='				<li >';
		table +='					<div class="row" style="background-color: transparent;">'+
				'						<div class="col-md-3 font-body-panel-map">'+item.Entidad+'</div>'+
				'						<div class="col-md-3 font-body-panel-map"><span class="badge info limites-efectivo-total-op">'+item.NumerodeOperaciones+'</span></div>'+
				'						<div class="col-md-3 font-body-panel-map"><span >$ '+$.number(item.MontoTotaldeOperaciones,2)+'</span></div>'+
				'						<div class="col-md-3 font-body-panel-map"><span >'+item.TipodePersona+'</span></div>'+
				'					</div>'+
				'				</li>';
	});
		table+=	'			</ul>'+
				'		</div>'+
				'	</div>'+
				'</div>';
		
	$(self.selector).append(table);
	
	
	self.height = parseInt($(this.selector+' .maps-lim-efvo').css('height').replace('px',''));
	
	$(this.selector+' .heads-lim-efvo').css('height',parseInt((self.height)*(0.10)))
	$(self.selector+' .maps-lim-efvo #vt').css('height',parseInt((self.height)*(0.8)))

	$(self.selector+' .maps-lim-efvo #vt').vTicker('init', {speed: self.options.get("speedTable"),
		pause: 3000,
		showItems:self.options.get("itemsChart"),
		padding: 0
	});	
	
	var legend = '<div class="'+this.options.get("classChart2")+' panel panel-default animated slideInRight info-map maps-legend-lim-efvo" style="width:30%;max-height:100px;">'+	
				 '	<div id="info-map-head" class="panel-heading panel-heading-map border-electoral">'+
				 '		<div class="row heads-legend-lim-efvo">'+
				 '		</div>'+
				 '	</div>'+
				 '	<div class="panel-body">'+
				 '		<div class="row">'+
				 '			<div class="col-md-4">'+
				 '				<img src="resources/centroMonitoreo/img/maps/pin2.png" style="height:20%;width:20%">'+
				 '			</div>'+
				 '			<div class="col-md-8">'+
				 '				Entidades Habituales que superan el Límite'+
				 '			</div>'+
				 '		</div>'+
				 '		<div class="row">'+
				 '			<div class="col-md-4">'+
				 '				<img src="resources/centroMonitoreo/img/maps/pin4.png" style="height:20%;width:20%">'+
				 '			</div>'+
				 '			<div class="col-md-8">'+
				 '				Nuevo Entidades que superan el Límite'+
				 '			</div>'+
				 '		</div>'+
				 '	</div>'+
				 '</div>';
	$(self.selector).append(legend);
}

Mapa.prototype.tableLeyendaElectoral= function(){
	var self=this;
	this.panelData;
	var _templado = '<div class="'+this.options.get("classChart")+' panel panel-default animated slideInRight info-map" style="width:35%;">'+
					'	<div id="info-map-head" class="panel-heading panel-heading-map border-electoral">'+
					'	</div>'+
					'	<div class="panel-body">';
	_.each(this.panelData.jsonResult,function(item){
		_templado +='		<div class="row">'+
					'			<div class="col-md-2 font-body-panel-map">'+
					'				<div style=";border: 0px solid;border-radius: 25px;background-color:'+_.findWhere(self.coloresZona,{IdOrden:item.IdTipoEleccion}).color+';height: 20px;width: 20px;"></div>'+
					'			</div>'+
					'			<div class="col-md-10 font-body-panel-map " style="text-align:left"><span>'+item.TipoEleccion+'</span></div>'+
					'		</div>';
	});
	_templado += 	'	</div>'+
					'</div>';
	
	var template = _.template(_templado);
	this.tableHtml=template();
	$(self.selector).append(this.tableHtml);
}

Mapa.prototype.tablePEPs= function(){
	var self=this;
	var table =	'<div class="'+this.options.get("classChart2")+' panel panel-default animated slideInRight info-map maps-peps" style="position:absolute; background-color: transparent;left: -8px;">'+
				'	<div id="info-map-head" class="panel-heading panel-heading-map" style="background-color: transparent;">'+
	 			'		<div class="row">'+
				'			<div class="col-md-7 font-headers-panel-map font-style-content-pld">Entidad</div>'+
				'			<div class="col-md-5 font-headers-panel-map font-style-content-pld">Detecciones</div>'+
				'		</div>'+
				'	</div>'+
				'	<div class="panel-body" style="background-color: transparent;">'+
				'		<div id="vt-peps-electorales" style="width: 100%;">'+
				'			<ul style="width: 100%;">';
				
	$.each(this.markersMap.models,function(index,item){
		table +=	'			<li >';
		table +=	'				<div class="row" style="background-color: transparent;left: -8px;">'+
					'					<div class="col-md-7 font-body-panel-map font-style-content-pld">'+item.get("Estado")+'</div>';
		if(item.get("Alertas") > 10 ){ 
			table+=	'					<div class="col-md-5 font-body-panel-map"><span class="badge info alertas-peps-mayor-10">'+item.get("Alertas")+'</span></div>';
		}else if(item.get("Alertas") >=5 && item.get("Alertas") <=9  ){ 
			table+=	'					<div class="col-md-5 font-body-panel-map"><span class="badge info alertas-peps-5-10">'+item.get("Alertas")+'</span></div>';
		}else if(item.get("Alertas") >=1 && item.get("Alertas") <=4  ){ 
			table+=	'					<div class="col-md-5 font-body-panel-map"><span class="badge info alertas-peps-mayor-1-5">'+item.get("Alertas")+'</span></div>';
		}
		table+='					</div>'+
			   '				</li>';
	});
		table+='			</ul>'+
				'		</div>'+
				'	</div>'+
				'</div>';
		
	//var container=$(self.selector)[0]
	//container.append(table);
	$("#item-svg-map-electoral ").find(".table-map-top-left").remove();
	
	$("#item-svg-map-electoral").append(table);
	
	
	self.height = parseInt($('#item-svg-map-electoral .maps-peps').css('height').replace('px',''));
	
	$('#item-svg-map-electoral .heads-peps').css('height',parseInt((self.height)*(0.60)))
	$('#item-svg-map-electoral .maps-peps #vt-peps-electorales').css('height',parseInt((self.height)*(0.8)))
	
	

	$("#item-svg-map-electoral"+' .maps-peps #vt-peps-electorales').vTicker('init', {speed: self.options.get("speedTable"),
		pause: 6000,
		showItems:self.options.get("itemsChart"),
		padding: 0
	});
	
	
}

Mapa.prototype.tableDatosElectorales= function(){
	var self=this;
	var table = '<div class="'+this.options.get("classChart3")+' panel panel-default animated slideInRight info-map  maps-datos-electorales" style="width:50%;height:auto;">'+
				'	<div id="info-map-head" class="panel-heading panel-heading-map">'+
				'		<div class="row ">';
	_.each(this.chartData.headers,function(item,indx){
		//console.debug(item.name);
		if(indx===0)
			table +='		<div class="col-md-3 font-headers-panel-map">'+item.name+'</div>';
		else if(indx===1)
			table +='		<div class="col-md-3 font-headers-panel-map">'+item.name+'</div>';
		else 
			table +='		<div class="col-md-2 font-headers-panel-map">'+item.name+'</div>';
	});
		table +='		</div>'+
				'	</div>'+
				'	<div class="panel-body">'+
				'		<div id="vt-datos-electorales" style="width: 100%;">'+
				'			<ul style="width: 100%;">';
	_.each(this.chartData.jsonResult,function(item){
		table +='				<li >';
		table +='					<div class="row" style="background-color: transparent;">'+
				'						<div class="col-md-3 font-body-panel-map text-nowrap">'+item.Entidad+'</div>'+
				'						<div class="col-md-3 font-body-panel-map text-nowrap"><span>'+item.EleccionAyuntamientos+'</span></div>'+
				'						<div class="col-md-2 font-body-panel-map text-nowrap"><span>'+item.DiputacionesMR+'</span></div>'+
				'						<div class="col-md-2 font-body-panel-map text-nowrap"><span>'+item.DiputacionesRP+'</span></div>'+
				'						<div class="col-md-2 font-body-panel-map text-nowrap"><span>'+item.EleccionGobernador+'</span></div>'
				'					</div>'+
				'				</li>'	
	});
		 table+='			</ul>'+
		 		'		</div>'+
		 		'	</div>'+
		 		'</div>';
	
	$(self.selector).append(table);
	
	self.height = parseInt($(this.selector+' div.panel-body').css('height').replace('px',''));
	
	$(self.selector+' div.panel-body div#vt-datos-electorales').css('height',parseInt(self.height *.3))

					
	$(self.selector+' div.panel-body div#vt-datos-electorales').vTicker('init', {speed: self.options.get("speedTable"),
		pause: 3000,
		showItems:self.options.get("itemsChart"),
		padding: 0
	});	
}

Mapa.prototype.draw = function(){
	var self=this;
	if(this.options.get("map")=='americaPLD'){
		var map=new jvm.WorldMap({
			container:$(self.selector),
			map: this.options.get("map"),
			focusOn: {
				x: 1,
				y: 1,
				scale: 1.5
			},
			zoomOnScroll:false,
			zoomButtons : false,
			panOnDrag:false,
			regionLabelStyle:{
				initial: {
					'font-family': 'Verdana',
					'font-size': '10',
					'font-weight': 'bold',
					cursor: 'default',
					fill: 'black'
				},
				hover: {
					cursor: 'pointer'
				}
			},
			onRegionOver:function(e,code){
				$("span#codeName").empty();
				$("span#codeName").append(code);
			},
			regionStyle:{
				initial: {
					fill: 'white ',"fill-opacity": 1,
					stroke: 'none',"stroke-width": 0,"stroke-opacity": 1
				},
				hover: {
					"fill-opacity": 0.8,
					cursor: 'pointer'
				},
				selected: {
					fill: 	'#2c2c43','fill-opacity': 1,
					stroke: '#343450','stroke-width': 1,'stroke-opacity': 1,
					
				},
				selectedHover: {
				}
			}
		});
		//console.info(map);
		var i=0;
		var regions=['US','JM','BR','BS','BZ','GT','GY','HT','HN','PR','PY','PA','PE','EC','MX','FK','NI','CO','CL','CR','CU','SR','BO','SV','DO','UY','TT','VE','AR'];
		//map.setSelectedRegions(['MX']);
		setInterval(function(){
			map.clearSelectedRegions();
			if(i<regions.length){
				map.setSelectedRegions(regions[i]);
				$("span#codeName").empty();
				$("span#codeName").append(map.getRegionName(regions[i]));
			}else{
				i=0;
				$("span#codeName").append(map.getRegionName(regions[i]));
			}
			i++;
		}, 3000);
		
		/*Inicia: Funcion que obtiene los puntos medios de todas la regiones del mapa
		var regions=map.regions;
		var centroides=[];
		_.each(regions,function(item,indx){
			var pais=item.config.name;
			var element = item.element.node;
			bbox = element.getBBox();
			point = [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
			centroides.push({pais:pais,coordenadas:point});
		});

		_.each(centroides,function(item,indx){
			console.info(item.pais);
			_.each(item.coordenadas,function(item2,indx2){
				console.info(item2);
			});
		});
		/*Termina: Funcion que obtiene los puntos medios de todas la regiones del mapa*/
		
	}else if(this.options.get("hasColorsByCountrys") && this.seriesColorJSON!=undefined){
		var mapObject = new jvm.WorldMap({
			map: this.options.get("map"),
			//backgroundColor: options.background,
			container: $(self.selector),
			zoomOnScroll:false,
			zoomButtons : false,
			panOnDrag:false,
			series: {
				regions: [{
					values: this.seriesColorJSON
				}]
			},
			regionStyle: {
				initial: {
					"stroke-width": 0.3,
					"stroke": '#203f5e',
				},
				hover: {
					cursor: 'pointer'
				}
			},
			markerStyle: {
				initial: {
					stroke: '#FF0000',
					"fill-opacity": 1,
					"stroke-width": 1,
					"stroke-opacity": 1,
					r: 4,
				} ,hover: {
					fill: '#FFFF00',
					"stroke-width": 1,
					cursor: 'pointer'
				}
			},
			labels: {
				regions:{
					render: function (code){
						var estado;
						_.each(self.markersMap.models,function(item){  
							if(item.get("IdEstado")===parseInt(code)){
								estado=item.get("Estado");
							} 
						});
						return estado;
					}
				}
			},
			onRegionLabelShow: function(e, el, code){
				e.preventDefault();
			}

		});
	}else{
		var mapObject = new jvm.WorldMap({
			map: this.options.get("map"),
			zoomOnScroll:false,
			zoomButtons : false,
			panOnDrag:false,
			//backgroundColor: options.background,
			container: $(self.selector),
			series: {
				regions: [{
					scale: ['#C8EEFF', '#0071A4'],
					normalizeFunction: 'polynomial',
					values: this.seriesJSON
				}]
			},
			regionStyle: {
				initial: {
					"stroke-width": 0.1,
				},
				hover: {
					cursor: 'pointer'
				}
			},
			markerStyle: {
				initial: {
					stroke: '#FF0000',
					"fill-opacity": 1,
					"stroke-width": 1,
					"stroke-opacity": 1,
					r: 4,
				} ,hover: {
					fill: '#FFFF00',
					"stroke-width": 1,
					cursor: 'pointer'
				}
			}

		});
	}
}

Mapa.prototype.drawMarkerStarIcon = function (){
	var self=this;
	var svg    = d3.select(self.selector+" div.jvectormap-container svg g");

	var estado = 1;

	this.markersMap.each(function(item) {
		if(item.get("secondIcon")){
			estado=0.8
		}
		if(item.get("Indicador2")!=1 && item.get("Indicador2")!=null){
			var marker=svg.append("image")
			.attr("x", item.get("coorX")-((15/2)*estado))
			.attr("y", item.get("coorY")-(15/2))
			.attr('width', '15px')
			.attr('height', '15px')
		
			if(self.options.get("drawFirstIcon") && item.get("icon")!="blackList-"){
				marker.attr("xlink:href",'resources/centroMonitoreo/img/maps/'+item.get("icon")+item.get("Indicador2")+'.png' );
			}else if(item.get("secondIcon") && item.get("icon")==="blackList-"){
				marker.attr("xlink:href",'resources/centroMonitoreo/img/maps/'+item.get("icon")+item.get("Indicador2")+'.png' );
			}
		}
	},this);
}
Mapa.prototype.drawPulses = function (){
	var self=this;
	//console.info('Draw pulses')
	var svg = d3.select('#map-1 div.jvectormap-container svg g');
	this.markersMap.forEach(function(item,index) {
		svg.append("circle")
		.attr("stroke-width", 1)
		.attr("r", 5)
		.attr("cx", item.X)
		.attr("cy", item.Y)
		.style("fill", "#FE9A2E");

		svg.append("circle")
		.attr("stroke-width", 5)
		.attr("r", 5)
		.attr("cx", item.X)
		.attr("cy", item.Y)
		.attr("class", "pulse " + item.Indicador);
	},this);

	var circle = svg.selectAll("#map-1 div.jvectormap-container svg g circle.pulse");
	circle.forEach(function(d, i) {
		(function repeat() {
			d3.select(circle[0][i]).attr("stroke-width", 5)
			.attr("r", 2)
			.attr('opacity', 1)

			var idPulseMarker = $(circle[0][i]).attr('class').split(" ")[1];
			d3.select(circle[0][i]).transition()
			//.duration(this.delayAlert[idPulseMarker])
			.duration(1000)
			.attr("stroke-width", 0)
			.attr("opacity", 0.8)
			.attr("r", 20)
			.attr("stroke", '#FFFF00')
			.ease('sine')
			.each('end', repeat);

		})();
	},this);
}

Mapa.prototype.tableLN= function(){
	var self=this;
	var table = '<div class="'+this.options.get("classChart2")+' panel panel-default animated slideInRight info-map maps-ln" style="width:auto;height:auto;margin-right:2%">'+
				'	<div id="info-map-head" class="panel-heading panel-heading-map">'+
				'		<div class="row">'+
				'			<div class="col-md-8 font-headers-panel-map">Entidad</div>'+
				'			<div class="col-md-4 font-headers-panel-map">Intentos</div>'+
				'		</div>'+
				'	</div>'+
				'	<div class="panel-body">'+
				'		<div id="vt" style="width: 100%;">'+
				'			<ul style="width: 100%;">';
				
	$.each(this.markersMap.models,function(index,item){ 
		if(item.get("secondIcon")){
			table +=	'		<li >';
			table +=	'			<div class="row" style="background-color: transparent;">'+
						'				<div class="col-md-8 font-body-panel-map">'+item.get("Estado")+'</div>';
			if(item.get("Alertas2") <=0){ 
				table+=	'				<div class="col-md-4 font-body-panel-map"><span class="badge info sin-intento-ln">'+item.get("Alertas2")+'</span></div>';
			}else if(item.get("Alertas2") >=1 && item.get("Alertas2") <=10   ){ 
				table+=	'				<div class="col-md-4 font-body-panel-map"><span class="badge info intento-ln-10">'+item.get("Alertas2")+'</span></div>';
			}else if(item.get("Alertas2") >=11 && item.get("Alertas2") <=20  ){ 
				table+=	'				<div class="col-md-4 font-body-panel-map"><span class="badge info intento-ln-20">'+item.get("Alertas2")+'</span></div>';
			}else if(item.get("Alertas2") >=21 && item.get("Alertas2") <=30 ){ 
				table+=	'				<div class="col-md-4 font-body-panel-map"><span class="badge info intento-ln-30">'+item.get("Alertas2")+'</span></div>';
			}else if(item.get("Alertas2") >=31 ){ 
				table+=	'				<div class="col-md-4 font-body-panel-map"><span class="badge info intento-ln-mas-30">'+item.get("Alertas2")+'</span></div>';
			}
				table+= '			</div>'+
					    '		</li>';
		}
	});
		table+=	'	 		</ul>'+
				'		</div>'+
				'	</div>'+
				'</div>';
		
	$(self.selector).append(table);
	
	
	self.height = parseInt($(this.selector+' div.panel-body').css('height').replace('px',''));
	
	$(self.selector+' div.panel-body div#vt').css('height',parseInt((self.height)*(.88)))

	if($(self.selector+' div.panel-body div#vt ul').children().length===0){
		$(self.selector+" .maps-ln").remove();
	}else{
		$(self.selector+' div.panel-body div#vt').vTicker('init', {speed: self.options.get("speedTable"),
			pause: 3000,
			showItems:self.options.get("itemsChart"),
			padding: 0
		});
	}
}

Mapa.prototype.tablesCtsActvosApert= function(){
	var self=this;
	var tableAperturas =	'<div class="'+this.options.get("classChart")+' panel panel-default animated slideInLeft info-map" style="width:auto;height:auto">'+
	     					'	<div id="info-map-head" class="panel-heading panel-heading-map">'+
	     					'		<div class="row" style="height: 100%">'+
							'			<div class="col-md-6 font-headers-panel-map">Clientes</div>'+
							'			<div class="col-md-3 font-headers-panel-map">'+this.chartData.headers[1].name+'</div>'+
							'			<div class="col-md-3 font-headers-panel-map">'+this.chartData.headers[2].name+'</div>'+
							'		</div>'+
	     					'	</div>'+
	     					'	<div class="panel-body">'+
	     					'		<div class="row" style="height: 100%">'+
							'			<div class="col-md-6 font-body-panel-map">'+this.chartData.jsonResult[0].Descripcion+'</div>'+
							'			<div class="col-md-3 font-body-panel-map">'+this.chartData.jsonResult[0].Dia+'</div>'+
							'			<div class="col-md-3 font-body-panel-map">'+this.chartData.jsonResult[0].Mes+'</div>'+
							'		</div>'+
							'	</div>'+
							'	<div class="panel-footer">'+
							'		<div class="row" style="height: 100%">'+
							'			<div class="col-md-6  font-body-panel-map">'+this.chartData.headers[3].name+'</div>'+
							'			<div class="col-md-6  font-body-panel-map">'+this.chartData.jsonResult[0].Activos+'</div>'+
							'		</div>'+
	     					'	</div>'+
	     					'</div>';
	$(self.selector).append(tableAperturas);
	var tableSucursal =	'<div class="'+this.options.get("classChart2")+' panel panel-default animated rotateInUpLeft info-map" style="max-width:30%;height:auto">'+
						'	<div id="info-map-head" class="panel-heading panel-heading-map">'+
						'		<div class="row" style="height: 100%">';
	_.each(this.panelData.headers,function(item,indx){
		tableSucursal +='			<div class="col-md-4 font-headers-panel-map">'+item.name+'</div>';
	});
		tableSucursal +='		</div>'+
						'	</div>'+
						'	<div class="panel-body">'+
	     				'		<div class="row" style="height: 100%">';
	_.each(this.panelData.jsonResult,function(item,indx){
		tableSucursal +='			<div class="col-md-4 font-body-panel-map">'+item.Departamento+'</div>'+
						'			<div class="col-md-4 font-body-panel-map">'+item.Sucursal+'</div>'+
						'			<div class="col-md-4 font-body-panel-map">'+item.Sucursal+'</div>';
	});	
	tableSucursal +=	'		</div>'+
						'	</div>'+
						'</div>';
	$(self.selector).append(tableSucursal);
}
Mapa.prototype.tableLegend= function(colors,marker,markersToDraw,markersText,Legendtext,alineacion){
	var self=this;
	
	var tableLegend='<div class="'+alineacion+' panel panel-default animated fadeInRight info-map" style="width:auto;height:auto;margin-right:2%">';
	
	if(marker){
		_.each(markersToDraw,function(item,indx){
			tableLegend+='	<div id="info-map-head" class="panel-heading panel-heading-map">'+
						 '	</div>'+
						 '	<div class="panel-body">'+
						 '		<div class="row flex-items-xs-middle" style="height: 100%">'+
			 			 '			<div class="col-md-4" style="height: 100%">'+ 
			 			 '			<img src="resources/centroMonitoreo/img/maps/'+item.get("icon")+item.get("Indicador")+'.png"'+' style="height:50px;width:50px">'+
			 			 '			</div>'+
			 			 '			<div class="col-md-8  font-body-panel-map" style="height: 100%">'+
			 			 			markersText[indx]+
			 			 '			</div>'+
			 			 '		</div>';
			 			 			
		});
	}
	_.each(colors,function(item,indx){
		tableLegend+='			<div class="row flex-items-xs-middle" style="height: 100%">'+
					 '				<div class="col-md-4" style="height: 100%">'+
					 '				<span class="badge" style="background-color:'+item.color+';border: 0px solid;border-radius: 25px;color:'+item.color+'">&nbsp;&nbsp;&nbsp;</span>'+	
					 '				</div>'+
					 '				<div class="col-md-8 font-body-panel-map" style="height: 100%">'+
					 				Legendtext[indx]+
					 '				</div>'+
					 '			</div>';
	});
	tableLegend+=	'		</div>'+
					'	</div>';
	
	$(self.selector).append(tableLegend);
}

Mapa.prototype.tablesBilletesAltaDenm= function(){
	var self=this;
	var tableCantBilletes = '<div class="'+this.options.get("classChart3")+' panel panel-default animated fadeInRight info-map" style="width:35%;height:auto;">'+
							'	<div id="info-map-head" class="panel-heading panel-heading-map">'+
							'		<div class="row" style="height: 100%">';
	_.each(this.panelData.headers,function(item){
		tableCantBilletes +='			<div class="col-md-3 font-headers-panel">'+item.name+'</div>';
	});
	tableCantBilletes +=	'		</div>'+
							'	</div>'+
							'	<div class="panel-body">'+
							'		<div class="row" style="height: 100%">';
	
	_.each(this.panelData.jsonResult,function(item){
		tableCantBilletes +='			<div class="col-md-3 font-body-panel-map">'+item.Departamento			+'</div>'+
							'			<div class="col-md-3 font-body-panel-map">'+item.Sucursal			+'</div>'+
							'			<div class="col-md-3 font-body-panel-map">'+item.Denominacion	+'</div>'+
							'			<div class="col-md-3 font-body-panel-map">'+item.TotaldeBilletes	+'</div>';
	});
	
	tableCantBilletes +=	'		</div>'+
							'	</div>'+
							'</div>';
	
	$(self.selector).append(tableCantBilletes);
	
	var tableBillSucursal =	'<div class="'+this.options.get("classChart2")+' panel panel-default animated rotateInUpLeft info-map" style="width:30%;height:auto;">'+
							'	<div id="info-map-head" class="panel-heading panel-heading-map">'+
							'		<div class="row" style="height: 100%">'+
							'			<div class="col-md-5 font-headers-panel-map">Departamento</div>'+
							'			<div class="col-md-7 font-headers-panel-map">'+
							'				<div class="row" style="height:50%">'+
							'					<div class="col-md-12">'+
							'						<span class="font-headers-panel-map">Denominación</span>'+
							'					</div>'+
							'				</div>'+
							'				<div class="row" style="height:50%">'+
							'					<div class="col-md-6"><span><span class="font-headers-panel-map">100 USD</span></div>'+
							'					<div class="col-md-6"><span><span class="font-headers-panel-map">50 USD</span></div>'+
							'				</div>'+
							'			</div>'+
							'		</div>'+
							'	</div>'+
							 '	<div class="panel-body">';

	_.each(this.markersMap.models,function(item){
		tableBillSucursal +='		<div class="row" style="height: 100%">'+
							'			<div class="col-md-5 font-body-panel-map">'+item.get("Estado")+'</div>'+
							'			<div class="col-md-7 font-body-panel-map">'+
							'				<div class="col-md-6 font-body-panel-map">'+item.get("50USD")+'</div>'+
							'				<div class="col-md-6 font-body-panel-map">'+item.get("100USD")+'</div>'+
							'			</div>'+	
							'		</div>';
							
							});
	tableBillSucursal +=	'	</div>'+
							'</div>';
						

	$(self.selector).append(tableBillSucursal);
}

Mapa.prototype.tableOpSospechosas= function(){
	var self=this;
	
	
	var date = moment($("#fecha").val()).format("YYYY/MM/DD");
        date = moment(date,"YYYY-MM-DD","es");
        					
	var tableOpSospechosas=	'<div class="'+this.options.get("classChart2")+' panel panel-default animated rotateInUpLeft info-map" style="width:40%;height:auto;">'+
							'	<div id="info-map-head" class="panel-heading panel-heading-map">'+
							'			<div class="row" style="height: 100%">'+
							'			<div class="col-md-3 font-headers-panel-map">font-headers-panel-mapto</div>'+
							'			<div class="col-md-2 font-headers-panel-map">No. de ROS</div>'+
							'			<div class="col-md-4 font-headers-panel-map">Monto</div>'+
							'			<div class="col-md-3 font-headers-panel-map">% '+date.format("MMMM")+' '+date.year()+'</div>'+
							'		</div>'+
							'	</div>'+
							'	<div class="panel-body">'+
							'		<div class="row" style="height: 100%">';
	
	_.each(this.markersMap.models,function(item){
		tableOpSospechosas +='			<div class="col-md-3 font-body-panel-map">'+item.get("Departamento")+'</div>'+
							'			<div class="col-md-2 font-body-panel-map">'+item.get("Alertas")+'</div>'+
							'			<div class="col-md-4 font-body-panel-map">$ '+$.number(item.get("Monto"),2)+'</div>'+
							'			<div class="col-md-3 font-body-panel-map">'+item.get("Porcentaje")+' %</div>';
	});
	
	tableOpSospechosas +=	'		</div>'+
							'	</div>'+
							'</div>';
						
	
	$(self.selector).append(tableOpSospechosas);
//	
//	var template=Handlebars.templates['user'];
//    document.getElementById("action").innerHTML = template(this.markersMap.toJSON());
//    
}

Mapa.prototype.drawMarkerRoutes= function (){
	var self=this;
	console.info('Draw marker Routes')
	self.svg = d3.select(self.selector+" div.jvectormap-container svg g");
	self.svg.append('defs');
	self.defs = d3.select(self.selector+" div.jvectormap-container svg g defs");
	//console.info(self.selector+" div.jvectormap-container svg g")
	//console.info(svg)
	
	/*Esto genera las coordenadas x,y dado un punto para ingresar al array	*/ 
	var ax=70.99499690532684;
	var ay=185.41497039794922;
	var bx=650;
	var by=362;

	var h=((Math.sqrt(Math.pow(by-ay,2)+ Math.pow(bx-ax,2)))*.3)*(-1) ;
	console.debug("h="+h);
	
	var dx=bx-h*(Math.sin( Math.atan((by-ay)/(bx-ax))- .63 ));
	console.debug("dx="+dx);
	var dy=by+h*(Math.cos(Math.atan((by-ay)/(bx-ax))- .63 ));
	console.debug("dy="+dy);
	
	var cx=ax-h*(Math.sin(Math.atan((by-ay)/(bx-ax))+ .63 ));
	console.debug("cx="+cx);
	var cy=ay+h*(Math.cos(Math.atan((by-ay)/(bx-ax)) + .63 ));
	console.debug("cy="+cy);
	/*FIN:Esto genera las coordenadas x,y dado un punto para ingresar al array	*/
	
	var routes=[{
		colorG1:"#00e676",	
		colorG2:"#00c853",
		colorL1:"#C0F395",
		colorL2:"#76ff03",
		points:[{
			ax:70.99499690532684,	
			ay:185.41497039794922,
			bx:450,
			by:250,
			h:-181.60015409117847,
			dx:590.4703397236996,
			dy:190.43416565840383,
			cx:340.7539415236956,
			cy:201.72904284876518
		},{
			ax:450,
			ay:250,
			bx:690,
			by:341,
			h:-77.00188309385686,
			dx:669.6407284050783,
			dy:266.7383675097011,
			cx:514.4775735487651,
			cy:207.90567129334903
			
		},{
			ax:690,
			ay:341,
			bx:473,
			by:373,
			h:-65.80402723238144,
			dx:426.8896121781616,
			dy:326.0531988851247,
			cx:720.5962596622451,
			cy:282.74161953263314
			
		}]
	},
	{
		colorG1:"#FD68FB",//clare	
		colorG2:"#FC01F8",//darkness
		colorL1:"#FF9CFE",//clare
		colorL2:"#FC01F8",//darkness
		points:[{
			ax:336,
			ay:339,
			bx:441,
			by:362,
			h:-32.24686031228467,
			dx:428.01732993217234,
			dy:332.48203465836554,
			cx:360.13344968253534,
			cy:317.61223231796885

		},{
			ax:441,
			ay:362,
			bx:426,
			by:401,
			h:-12.535549449465707,
			dx:413.8949267420076,
			dy:404.25686988051984,
			cx:434.197229563488,
			cy:351.47088254467076

		},{
			ax:426,
			ay:401,
			bx:368,
			by:173,
			h:-70.57846697116621,
			dx:413.0179627803557,
			dy:118.64281991211733,
			cx:491.52020035674667,
			cy:427.2378227986198
		}]
	},{
		colorG1:"#fff176",//clare	
		colorG2:"#ffff00",//darkness
		colorL1:"#ffff8d",//clare
		colorL2:"#ffea00",//darkness
		points:[{
			ax:93,
			ay:84,
			bx:381,
			by:362,
			h:-120.08546956230799,
			dx:397.4873871070214,
			dy:243.0517504694448,
			cx:211.29160127944556,
			cy:63.32109609421536  
		},{
			ax:381,
			ay:362,
			bx:501,
			by:366,
			h:-36.019994447528724,
			dx:480.7604217240529,
			dy:336.2040359912318,
			cx:403.1788442958963,
			cy:333.6179834102933

		},{
			ax:501,
			ay:366,
			bx:650,
			by:362,
			h:-44.71610448149525,
			dx:622.695596310006,
			dy:326.5881440879775,
			cx:526.3651376700449,
			cy:329.17419666891607
		}]
	}]
	
	/**Create Route path**/
	_.each(routes,function(element,index){
		var path="";	
		self.setRadialGradient(element.colorG1,element.colorG2,index);
		self.setLinearGradient(element.colorL1,element.colorL2,index);
		var idLinearGradient="#lineStella_"+index;
		_.each(element.points,function(item,indx){
			if(indx===0){
				path+="M"+item.ax+","+item.ay+
				"C"+item.cx+","+item.cy+","+item.dx+","+item.dy+","+item.bx+","+item.by;
				self.drawMarker3DRoutes(item.ax,item.ay,index);
			}else{  
				path+="C"+item.cx+","+item.cy+","+item.dx+","+item.dy+","+item.bx+","+item.by;
				self.drawMarker3DRoutes(item.ax,item.ay,index);
			}
			if(indx===element.points.length-1){
				path+="M"+item.bx+","+item.by+"Z";
				self.drawMarker3DRoutes(item.bx,item.by,index);
			}
		});

		//console.info(path);
		self.svg.append("path")
		.attr("d",path)
		.attr("id","path_"+index)
		.attr('class','ruta')
		.style('stroke',"url("+idLinearGradient+")")
		.style('stroke-width',1)
		.style('fill','transparent' )
	});
	
	//Cambio el color del stroke para los estados
	//$(".jvectormap-region").css({stroke:"#3d3d5d"});
	
	/**Create Route path**/
}
Mapa.prototype.drawMarker3DRoutes= function (ax,ay,index){
	var self=this;
	var idCircle3D="#Circle3D"+index;
	/**Generate Icon 3D**/
	self.svg.append("circle")	
	.attr("id","3DCircle")
	.attr('class','pointRoute')
	.attr("r",  2 )
	.attr("cx", ax)
	.attr("cy", ay)
	.style("fill","url("+idCircle3D+")");
	/**Generate Icon 3D**/
}

Mapa.prototype.setRadialGradient= function (colorG1,colorG2,index){
	var self=this;
	var idRadialGradient=" #Circle3D"+index;
	/**Begin Radial Gradient*/
	self.defs.append("radialGradient")
	.attr("id","Circle3D"+index)
	.attr("gradientUnits","objectBoundingBox")
	.attr("fx","30%")
	.attr("fy","30%")
	.append("stop")	
	.attr("offset","0%")
	.attr("style","stop-color:#FFFFFF");


	var gradiente= d3.select(self.selector+idRadialGradient);

	gradiente.append("stop")
	.attr("offset","40%")
	.attr("style","stop-color:"+colorG1);

	gradiente.append("stop")
	.attr("offset","100%")
	.attr("style","stop-color:"+colorG2);
	/**End Radial Gradient*/
}


Mapa.prototype.setLinearGradient= function (colorL1,colorL2,index){
	var self=this;
	var idLinearGradient=" #lineStella_"+index
	/**Begin Linear Gradient**/
	self.defs.append("linearGradient")
	.attr("id","lineStella_"+index)
	.attr("x1","0%")
	.attr("y1","0%")
	.attr("x2","100%")
	.attr("y2","0%")
	.append("stop")
	.attr("offset","0%")
	.attr("style","stop-color:"+colorL1+";stop-opacity:1");

	var gradienteLine= d3.select(self.selector+idLinearGradient);

	gradienteLine.append("stop")
	.attr("offset","100%")
	.attr("style","stop-color:"+colorL2+";stop-opacity:1");

	/**End Linear Gradient**/
}
