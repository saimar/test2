var QueueStatusCollection= Backbone.Collection.extend({
  url:"/updateQueue",
  model:QueueStatusModel
});

Backbone.sync = function(method, model,newData) {
	  //console.debug(model);
	  //console.debug(method + ": " + model.url);
	  //console.debug(newData);
	  var cIdModelo="";
	  _.forEach(model.models,function(item,index){
	      if(item.get("idRequest")===newData.idRequest){
	          cIdModelo=item.cid;
	          //console.debug(cIdModelo);
			  var modelo=model.get(cIdModelo);
			  //console.debug(modelo);
			  
			  if(newData.data===null)
				  newData.data=item.get("data")
			  
			  modelo.set(newData);
			  //console.debug(modelo);
	      }
	  });
	  
};
	
var PanelsCollection= Backbone.Collection.extend({
  model:PanelModel
});

var CarouselCollection= Backbone.Collection.extend({
  model:CarouselModel
});

var ColorDataCollection= Backbone.Collection.extend({
	  model:ColorData
	});

var CarouselsCollection= Backbone.Collection.extend({
  model:CarouselsModel
});

var PaisesCollection= Backbone.Collection.extend({
	  model:PaisesModel
});


//Collections Maps
var MapaCollection = Backbone.Collection.extend({
	model:MapaModel
	});

var PaisCollection=Backbone.Collection.extend({
	model:PaisModel
	});

var OptionsCollection=Backbone.Collection.extend({
	model:OptionsModel,
});

var GaugeCollection=Backbone.Collection.extend({
	model:GaugeModel,
});
