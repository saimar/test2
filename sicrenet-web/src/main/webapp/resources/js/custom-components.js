jQuery.fn.extend({
	CDownloadButton: function(){
		var $container = jQuery(this).parents('.ui-layout-unit-content:first');
		var $button = jQuery(this).parents('button');
		
		$container.find('button').addClass('not-hover');
		
		$button.css({'background-color':'#1E7145!important','min-width':'92.5px','min-height':'122px'});
		$button.children('span.ui-icon').css({top:'14%',left:'10%',width:$button.width()-2,height:$button.height()-6});
		$container.on('mouseover',function(){
			$(this).animate({opacity: "hide"},{duration:50,complete:function(){ $(this).show(10); }});
		});
	}
});