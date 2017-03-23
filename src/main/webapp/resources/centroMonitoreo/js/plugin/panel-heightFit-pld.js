/**
 * @author-name	OMAR J. BALBUENA Q.
 * @author 		B240089
 * @param 		$
 */
(function($) {
  var BORDER_PANEL_OFFSET = 1;
  var panelObj = null;

  var panelResize = function(index) {
    var heightContainer = $(panelObj[index]).css('height').replace("px", "");
    var heightHeader = $(panelObj[index]).children(':first-child').css('height').replace("px", "");

    var heightBody = heightContainer - heightHeader;
    $(panelObj[index]).children(':last-child').css("height", heightBody - BORDER_PANEL_OFFSET);
  };

  $.fn.panelHeightFit = function() {
    
    if (panelObj == null) {
      panelObj = [this];
    } else {
      panelObj.push(this);
    }
    
    //console.log(panelObj)
    panelResize(panelObj.length - 1);

    $(window).resize(function() {
      for (var indexPanel = 0; indexPanel < panelObj.length; indexPanel++) {
        panelResize(indexPanel);
      }
    });
  };
}(jQuery));