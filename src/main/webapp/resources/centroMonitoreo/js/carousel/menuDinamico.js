
var MenuDinamico=function(){
	var self=this;
	this.dataItems=null;

	//Agrego el pais que se desea visualizar :3
	$("#pais").change(function() {
		self.getDataMenu();
	});

	$("#galleryMain").append("<h4>Favor de seleccionar un país...</h4>");
}

MenuDinamico.prototype.getDataMenu=function(idPais){
	var self=this;
	if(idPais==undefined || idPais==null){
		idPais=$("#pais").val();
	}	
	$.when(
			$.ajax({
				url:"../restModuloMonitoreo/consulta/menuDinamico?consulta=2&pais="+idPais,
				datType:"JSON",
				success : function(data) {
					//console.log("data",data);
					self.dataItems=JSON.parse(JSON.stringify(data));
				},
				error : function(objXMLHttpRequest) {
					console.log("Ha ocurrido un Error al obtener los datos",objXMLHttpRequest);
					self.msjError();
				}
			})
	).then(function(){
		$("#galleryMain").empty();
		self.dataItems.resultset.forEach(
				function(item,index){
					$("#galleryMain").append('<div class="col-md-55">'+
							'<div class="thumbnail">'+
							'<div class="image view view-first">'+
							'	<img style="width: 100%; display: block;"'+
							'		src="../resources/img/maps/screenshots/'+item.imagen+'"'+
							'		alt="image">'+
							'	<div class="mask">'+
							'		<p>'+item.nombreGrafica+'</p>'+
							'		<div class="tools tools-bottom">'+
							'			<a href="../app/panel-'+item.nombreURL+'-pld"><i class="fa fa-play"></i></a>'+
							'		</div>'+
							'	</div>'+
							'</div>'+
							'<div class="caption">'+
							'	<p>'+
							'		<strong>'+item.nombreGrafica+'</strong>'+
							'	</p>'+
							'	<p>'+item.descripcion+'</p>'+
							'</div>'+
							'</div>'+
					'</div>');
				}
		);

		$('.thumbnail a').each(function(){
			if(this.href.indexOf("?pais") !=-1){
				var cut=this.href.substring(this.href.indexOf("?pais"),this.href.length);
				this.href=this.href.replace(cut,"");
				this.href += '?pais='+$("#pais").val();
			}else{
				this.href += '?pais='+$("#pais").val();			
			}
		});
	});
}