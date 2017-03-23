$(function ($) {
    init();
});

function init(){
	if(navigator.appVersion.indexOf("MSIE 6.0") != -1){
		correctPNG();
	}
}


function MenuFormat(item){
	var menuUl = $(item).childNodes;
	
	for(i in menuUl){
		if(menuUl[i].tagName == "LI"){
		    
			menuUl[i].onmouseover = function() {
				//this.className = "menuUlLiOver";
				var subMenuL = this.childNodes;
				for(j in subMenuL){
					if(subMenuL[j].tagName == "DIV"){
						subMenuL[j].style.display ="block";
					}
				}
			}
			
			menuUl[i].onmouseout = function() {
				this.className = "menuUlLiOut";
				var subMenuL = this.childNodes;
				for(j in subMenuL){
					if(subMenuL[j].tagName == "DIV"){
						subMenuL[j].style.display ="none";
						
					}
				}
			}
			
			var subMenus = menuUl[i].getElementsByTagName('LI');
			
			for(j in subMenus){
				subMenus[j].onmouseover = function(){
					this.className = "menuUlLiOver";
					var subMenuL = this.childNodes;
					for(k in subMenuL){
						if(subMenuL[k].tagName == "DIV"){
							subMenuL[k].style.display ="block";
							
						}
					}
					
					
				}
				subMenus[j].onmouseout = function(){
					this.className = "menuUlLiOut";
					var subMenuL = this.childNodes;
					for(k in subMenuL){
						if(subMenuL[k].tagName == "DIV"){
							subMenuL[k].style.display ="none";
							
						}
					}
					
					
				}
			}
		}
	}
}



function correctPNG() // correctly handle PNG transparency in Win IE 5.5 or higher.
{
	for(var i=0; i<document.images.length; i++)
	{
		var img = document.images[i]
		var imgName = img.src.toUpperCase()
		if (imgName.substring(imgName.length-3, imgName.length) == "PNG" && document.images[i].className.indexOf("convert") != -1)
			{
			var imgID = (img.id) ? "id='" + img.id + "' " : ""
			var imgClass = (img.className) ? "class='" + img.className + "' " : ""
			var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
			var imgStyle = "display:inline-block;" + img.style.cssText 
			var imgAttribs = img.attributes;
			for (var j=0; j<imgAttribs.length; j++)
			{
				var imgAttrib = imgAttribs[j];
				if (imgAttrib.nodeName == "align")
				{ 
					if (imgAttrib.nodeValue == "left") imgStyle = "float:left;" + imgStyle
					if (imgAttrib.nodeValue == "right") imgStyle = "float:right;" + imgStyle
					break
				}
			}
			var strNewHTML = "<span " + imgID + imgClass + imgTitle
			strNewHTML += " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
			strNewHTML += "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
			strNewHTML += "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
			img.outerHTML = strNewHTML
			i = i-1
		}
	}
}


