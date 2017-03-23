var IndicadorPLDJS = (function($) {
  var TIME_UPDATE_SHINE = 200; // milliseconds
  var INDEX_POSITION_BLUR = 2;

  var indicadores;
  var factorValue = 1; //1: INCREMENT ; -1 DECREMENT

  function init(shineLength) {
    indicadores = $('.indicador-intermitente');

    $.each(indicadores, function(index, value) {
      var boxShadowValue = "0px 0px 0px " + $(value).css("background-color");
      $(value).css("box-shadow", boxShadowValue);
    })

    setInterval(function() {
      applyGlowEffect(shineLength);
    }, TIME_UPDATE_SHINE);
  }

  function applyGlowEffect(shineLength) {
    var valueBlueGeneral = 0;
    $.each(indicadores, function(index, value) {
      //var boxShadowValue = "0px 0px " + shineLength + "px " + $(value).css("background-color");

      var indexStartProperties = $(value).css("box-shadow").indexOf(")") + 1;
      var propertiesBoxShadow = $(value).css("box-shadow").substr(indexStartProperties);
      //console.log("properties: "+propertiesBoxShadow);
      var valueBlur = propertiesBoxShadow.split("px")[INDEX_POSITION_BLUR];
      
      //console.log (valueBlur);
      valueBlur = parseInt(valueBlur) + parseInt(factorValue);
    
      //console.log (valueBlur + ":" + shineLength);
      
      valueBlueGeneral = valueBlur;
      
      var boxShadowValue = "0px 0px " + valueBlur + "px " + $(value).css("background-color");
      $(value).css("box-shadow", boxShadowValue);
      //console.log(boxShadowValue);
    });
    
    if (parseInt(valueBlueGeneral) == shineLength) {
        factorValue = -1;
      } else if (parseInt(valueBlueGeneral) == 1) {
        factorValue = 1;
      }
  }

  return {
    init: init
  };
})(jQuery);