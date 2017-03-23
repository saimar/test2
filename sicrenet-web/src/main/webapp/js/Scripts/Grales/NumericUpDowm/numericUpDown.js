/***************************************************************************
* numericUpDown.js                                                         *
* Copyright(C) Steven Kapaun 2013 - <http://thedynamiclink.com>            *
* created:  Mon, Jan 06 2014 at 07:42 PM CST                               *
* modified: Tue, Sep 09 2014 at 09:26 AM CDT                               *
*                                                                          *
* This program is free software: you can redistribute it and/or modify     *
* it under the terms of the GNU General Public License as published by     *
* the Free Software Foundation, either version 3 of the License, or        *
* (at your option) any later version. This program is distributed in       *
* the hope that it will be useful, but WITHOUT ANY WARRANTY; without       *
* even the implied warranty of MERCHANTABILITY or FITNESS FOR A            *
* PARTICULAR PURPOSE. See the GNU General Public License for more details. *
*                                                                          *
* You should have received a copy of the GNU General Public License        *
* along with this program. If not, see <http://www.gnu.org/licenses/>.     *
***************************************************************************/

/***********************************************************READ ME**************************************************************
* TESTED IN: Internet Explorer 11.0.9; FireFox 26.0.1; Chrome 31.0.1; NOT TESTED IN Safari                                      *
*                                                                                                                               *
* numericUpDown is a JavaScript custom class object to mimic a .NET numericUpDown, also known as a 'windows spin box' or        *
* 'spinner control' that displays numeric values.                                                                               *
* A numericUpDown control contains a single numeric value that can be incremented or decremented by clicking the up or down     *
* buttons of the control. The user can also use the up or down arrow keys to iterate the value of the control.                  *
* This control can be customize with a number of properties that is given by the prototype object. Among the many properties    *
* are Maximum, Minimum and InterceptArrowKeys.                                                                                  *
*                                                                                                                               *
* CONSTRUCTOR:                                                                                                                  *
*     The constructor of the numericUpDown class takes one argument of the type of String. It is the id of the input element    *
*     that is going to be the numericUpDown control.                                                                            *
*                                                                                                                               *
* PUBLIC PROPERTIES                                                                                                             *
*     The numericUpDown class has the following public properties:                                                              *
*     PROPERTY NAME             PERMISSIONS     DEFAULT VALUE                                                                   *
*     Default                   read/write      (integer) 0                                                                     *
*     Disabled                  read/write      (boolean) false                                                                 *
*     ID                        read/write      (string)  value given in constructor                                            *
*     Increment                 read/write      (integer) 1                                                                     *
*     InterceptArrowKeys        read/write      (boolean) true                                                                  *
*     Maximum                   read/write      (integer) 100                                                                   *
*     Minimum                   read/write      (integer) 0                                                                     *
*     Name                      read/write      (string)  value of the name attribute of the element                            *
*     Readonly                  read/write      (boolean) false                                                                 *
*     Value                     read-only       (integer) 0                                                                     *
**********************************************************END READ ME***********************************************************/

var numericIDs = [];     // DO NOT DELETE OR MODIFY THIS VARIABLE
var numericIDsIndex = 0; // DO NOT DELETE OR MODIFY THIS VARIABLE
var numericUpDown = function(elemID) {
        // Do not change the three variables below
        this._e = this.$(elemID);
        this._isMoseDown = false;
        this._numericID = numericIDsIndex;
        
        // Check to make sure that the element is an 'html-object/tag' and an 'INPUT' element and has the attribute type value of 'text'
        if(this._e.nodeType != 1 || this._e.nodeName != "INPUT" || this._e.getAttribute("type") != "text") {
                alert("Debug:\nnumericUpDown class object with ID: '"+elemID+"'\nYou can only add the numericUpDown control to an html-object/tag of <input type=\"text\" />.");
                return false;
        }
        
        // You may change these five variables below
        this._interceptArrowKeys = true;
        this._increment = 1;
        this._maximum = 100;
        this._minimum = 0;
        this._default = 0;
        
        numericIDs[this._numericID] = this;
        numericIDsIndex++;
        
        // Picture buttons src
        this._down1Src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAACSSURBVChTY1y9dvN/BjIAWKOHmwOUSxzYsesAQuO9e/egwviBkpISWCMLiMPGxsYgLi4OluiY+xJMI4OKZIgcCIDUggATmGBiAguAcF2mLMP7l1fgGMSHyYEwSC1cIwgwMjLC8YRGL4Z3Ly6DaWRxEIYBsEaQADMzMwpeOqcKQwyEYZrhNnJxcRGFYYDMeGRgAAAbsivGwqrdzwAAAABJRU5ErkJggg==";
        this._down2Src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAACBSURBVChTY1y9dvN/BjIAWKOHmwOUSxzYsesAQuO9e/egwviBkpISWCMLiMPGxgYWBIH5W6AMJJDoA2UAAUwtE5hgAlNgAFL0/uUVOEbWBAIwtQgdSKAoWYfh3YvLYBoXAGtkZGQEc5BBS3UklIUK4GpBgfPnzx+SMEgPmfHIwAAA7L9cRvPgSVEAAAAASUVORK5CYII=";
        this._up1Src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAACJSURBVChTY1y9dvN/BnIASOOfP39IwiA9TFD9DN++fSMKwwBY4////xn+/v2LgqNT2jDEQBikFq4RBEACMFxQv41BSEIXTCOLgzAMgDX++/eP4devX2DcNP0xg6C4DhyD+DA5EAapBQFwqHq4OTDcu3cPLEAIKCkpMezYdQChkRQA1wjlkwAYGAB78ruJciGeWwAAAABJRU5ErkJggg==";
        this._up2Src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAB+SURBVChTY1y9dvN/BnIASOOfP39IwiA9LFD9DFevXoWy8ANtbW0wzQQi/v/HdG1N63IoCxXA1II1ooO+uVcYhCR0wTQuANb4798/MAcE5m9hYBAU14FjEB8ZwNSCQ9XDzYHh3r17YAFCQElJiWHHrgMIjaQAuEYonwTAwAAAXTVjPLw/UYEAAAAASUVORK5CYII=";
        
        // Set the default value for the textbox
        this._e.value = this._default;
        
        // Set the onKeyDown and onKeyUp events for the textbox
        this._e.setAttribute("onkeydown", "numericIDs["+this._numericID+"].doKeyDown(event)");
        this._e.setAttribute("onkeyup", "numericIDs["+this._numericID+"].doKeyUp(event)");
        
        // Set the maxlength for the textbox
        var len = new String(this._maximum);
        len = len.length;
        this._e.setAttribute("maxlength", len);
        
        // Place the up/down picture buttons ontop of the textbox
        this.doButtons();
};
/**
 * numericUpDown.prototype
 * This allows the customization through properties.
 * e.g. myNumericUpDown1.Maximum = 1000; // this will set the textbox maximum integer to 1000
 * e.g. myNumericUpDown1.InterceptArrowKeys = false; // this will set the textbox to not intercept the up/down arrow keys to change its value
 * e.g. alert(myNumericUpDown1.Disabled); // this will alert either true or false
 */
numericUpDown.prototype = {
        get ID() { return this._e.getAttribute("id"); },
        set ID(val) { return this.setProperty("id", val); },
        
        get Name() { return this._e.getAttribute("name"); },
        set Name(val) { return this.setProperty("name", val); },
        
        get Value() { return parseInt(this._e.value); },
        set Value(val) { /* do nothing - readonly */ },
        
        get Readonly() { return (this._e.getAttribute("readonly")===null)?false:(this._e.getAttribute("readonly")=="")?false:true; },
        set Readonly(val) { return this.setProperty("readonly", val); },
        
        get InterceptArrowKeys() { return this._interceptArrowKeys; },
        set InterceptArrowKeys(val) { return this.setProperty("interceptarrowkeys", val); },
        
        get Increment() { return this._increment; },
        set Increment(val) { return this.setProperty("increment", val); },
        
        get Maximum() { return this._maximum; },
        set Maximum(val) { return this.setProperty("maximum", val); },
        
        get Minimum() { return this._minimum; },
        set Minimum(val) { return this.setProperty("minimum", val); },
        
        get Default() { return this._default; },
        set Default(val) { return this.setProperty("default", val); },
        
        get Disabled() { return this._e.disabled; },
        set Disabled(val) { return this.setProperty("disabled", val); }
};
/**
 * numericUpDown.setProperty(string prop, mixed val)
 * This is the function that sets the properties of the object through the use of the properties in the above prototype.
 */
numericUpDown.prototype.setProperty = function(prop, val) {
        switch(prop) {
                case "id":
                        this.$(this.ID+"_upPic").setAttribute("id", val+"_upPic");
                        this.$(this.ID+"_downPic").setAttribute("id", val+"_downPic");
                        this._e.setAttribute("id", val);
                        return val;
                        break;
                case "name": this._e.setAttribute("name", val); return val; break;
                case "readonly":
                        if(empty(val)) val = "false";
                        var testVal = new String(val);
                        switch(testVal.toLowerCase()) {
                                case "true": case "yes": case "1": val = true; break;
                                case "false": case "no": case null: val = false; break;
                                default: val = Boolean(testVal);
                        }
                        if(val===false)
                                this._e.removeAttribute("readonly");
                        else
                                this._e.setAttribute("readonly", "readonly");
                        return val;
                        break;
                case "increment":
                        // Turn into an integer
                        val = parseInt(val);
                        // If val is not an integer, return false
                        if(isNaN(val)) return false;
                        // Set the property
                        this._increment = val;
                        return val;
                        break;
                case "maximum":
                        // Turn into an integer
                        val = parseInt(val);
                        // If val is not an integer, return false
                        if(isNaN(val)) return false;
                        // Set the property
                        this._maximum = val;
                        val = new String(val);
                        // Get length of maximum e.g. if Maximum is 100, the len would be 3 and that would be the value for the maxlength attribute for the textbox
                        var len = val.length;
                        // Set the maxlength attribute
                        this._e.setAttribute("maxlength", len);
                        return val;
                        break;
                case "minimum":
                        // Turn into an integer
                        val = parseInt(val);
                        // If val is not an integer, return false
                        if(isNaN(val)) return false;
                        // Set the property
                        this._minimum = val;
                        // Get the value of the textbox
                        val = this.Value;
                        // If the value is not an integer, make it zero
                        if(isNaN(val)) val = 0;
                        // If the value is less then the minimum, make it the minimum
                        if(val < this._minimum) val = this._minimum;
                        // Set the value of the textbox
                        this._e.value = val;
                        return val;
                        break;
                case "default":
                        // Turn into an integer
                        val = parseInt(val);
                        // If val is not an integer, return false
                        if(isNaN(val)) return false;
                        // Get old default value
                        var oldDefault = this._default;
                        // Set the property
                        this._default = val;
                        // Get the value of the textbox
                        val = this.Value;
                        // If the value is the old default, change the value to the new default
                        if(val == oldDefault) this._e.value = this._default;
                        return val;
                        break;
                case "interceptarrowkeys":
                        if(empty(val)) val = "false";
                        var testVal = new String(val);
                        switch(testVal.toLowerCase()) {
                                case "true": case "yes": case "1": val = true; break;
                                case "false": case "no": case null: val = false; break;
                                default: val = Boolean(testVal);
                        }
                        this._interceptArrowKeys = val;
                        return val;
                        break;
                case "disabled":
                        if(empty(val)) val = "false";
                        var testVal = new String(val);
                        switch(testVal.toLowerCase()) {
                                case "true": case "yes": case "1": val = true; break;
                                case "false": case "no": case null: val = false; break;
                                default: val = Boolean(testVal);
                        }
                        this._disabled = val;
                        this._e.disabled = this._disabled;
                        this.$(this.ID+"_upPic").disabled = this._disabled;
                        this.$(this.ID+"_downPic").disabled = this._disabled;
                        return val;
                        break;
                default:
                        alert("ERROR:\n"+prop);
        }
};
/**
 * numericUpDown.$(string id)
 * Steven Kapaun
 * Returns an element object.
 */
numericUpDown.prototype.$ = function(id) { return document.getElementById(id); };
/**
 * numericUpDown.doButtons()
 * Steven Kapaun
 * Places the up/down picture buttons on the input textbox.
 */
numericUpDown.prototype.doButtons = function() {
        var ele = window.getComputedStyle(this.$(this.ID), "");
        this._height = ele.getPropertyValue("height");
        this._height = parseInt(this._height.substring(0, this._height.length-2));
        this._width = ele.getPropertyValue("width");
        this._width = parseInt(this._width.substring(0, this._width.length-2));
        
        // Get the top position for the up button picture
        var upPicTop = this._e.offsetTop+(this._height/2-9)+2;
        // Get the left position for the up buttons picture
        var upPicLeft = this._e.offsetLeft+this._width-13;
        // Get the top position for the down button picture
        var downPicTop = upPicTop+9;
        // Get the left position for the down button picture
        var downPicLeft = upPicLeft;
        
        // Up button picture
        var upPic = document.createElement("img");
            upPic.setAttribute("id", this.ID+"_upPic");
            upPic.setAttribute("style", "position: absolute; top: "+upPicTop+"px; left: "+upPicLeft+"px; border: solid 0px #FFF;");
            upPic.setAttribute("src", this._up1Src);//"images/up1.png");
        // Down button picture
        var downPic = document.createElement("img");
            downPic.setAttribute("id", this.ID+"_downPic");
            downPic.setAttribute("style", "position: absolute; top: "+downPicTop+"px; left: "+downPicLeft+"px; border: solid 0px #FFF");
            downPic.setAttribute("src", this._down1Src);//"images/down1.png");
        // Get the parent element object for the updown
        var picParent = this._e.parentNode;
        // Append the up button picture
        picParent.appendChild(upPic);
        // Append the down button picture
        picParent.appendChild(downPic);
        
        this.$(this.ID+"_upPic").setAttribute("onmousedown", "numericIDs["+this._numericID+"].doMouseDown(event)");
        this.$(this.ID+"_downPic").setAttribute("onmousedown", "numericIDs["+this._numericID+"].doMouseDown(event)");
        
        this.$(this.ID+"_upPic").setAttribute("onmouseup", "numericIDs["+this._numericID+"].doMouseUp(event)");
        this.$(this.ID+"_downPic").setAttribute("onmouseup", "numericIDs["+this._numericID+"].doMouseUp(event)");
        
        if(this._e.disabled)
                this.Disabled = true;
};
/**
 * numericUpDown.incrementUp()
 * Steven Kapaun
 * Adds increment to the value of the textbox.
 */
numericUpDown.prototype.incrementUp = function() {
        var val = this.Value;
        if(isNaN(val)) val = 0;
        // If value is less than the Minimum, make it the Minimum
        if(val<this._minimum) val = this._minimum;
        // Add the increment
        val+=this._increment;
        // If value is greater than the Maximum, make it the Maximum
        if(val>this._maximum) val = this._maximum;
        // Set the value of the textbox
        this.$(this.ID).value = val;
};
/**
 * numericUpDown.incrementDown()
 * Steven Kapaun
 * Subtracts increment from the value of the textbox.
 */
numericUpDown.prototype.incrementDown = function() {
        var val = this.Value;
        if(isNaN(val)) val = 0;
        // If value is greater than the Maximum, make it the Maximum
        if(val>this._maximum) val = this._maximum;
        val-=this._increment;
        // If value is less than the Minimum, make it the Minimum
        if(val<this._minimum) val = this._minimum;
        // Set the value of the textbox
        this.$(this.ID).value = val;
};
/**
 * numericUpDown.doKeyDown(event e)
 * Steven Kapaun
 * Intercepts the up and down arrow keys onKeyDown event for the textbox.
 */
numericUpDown.prototype.doKeyDown = function(e) {
        var k = e.which;
        if(this._interceptArrowKeys) {
                // If key is the up arrow
                if(k == 38) {
                        this.$(this.ID+"_upPic").src = this._up2Src;//"images/up2.png";
                        this.incrementUp();
                }
                // If key is the down arrow
                else if(k == 40) {
                        this.$(this.ID+"_downPic").src = this._down2Src;//"images/down2.png";
                        this.incrementDown();
                }
                else
                        return false;
        }
};
/**
 * numericUpDown.doKeyUp()
 * Steven Kapaun
 * Handles the onKeyUp event to the textbox to change the up/down button pictures.
 */
numericUpDown.prototype.doKeyUp = function(e) {
        var k = e.which;
        if(this._interceptArrowKeys) {
                if(k == 38)
                        this.$(this.ID+"_upPic").src = this._up1Src;//"images/up1.png";
                else if(k == 40)
                        this.$(this.ID+"_downPic").src = this._down1Src;//"images/down1.png";
                else
                        return false;
                this._e.select();
        }
};
/**
 * numericUpDown.doMoseDown(event e)
 * Steven Kapaun
 * Handles the onMoseDown event for the up and down picture buttons.
 */
numericUpDown.prototype.doMouseDown = function(e) {
        // If no e.target, get the e.srcElement
        if(!e.target) { e.target = e.srcElement; }
        // Is it the up button or the down button
        var isUp = (e.target.getAttribute("id").indexOf("_up") != -1) ? true : false;
        // Set the _isMouseDown variable to True
        this._isMouseDown = true;
        if(isUp) {
                // Up picture button
                this.$(this.ID+"_upPic").src = this._up2Src;//"images/up2.png";
                // Increment up
                this.incrementUp();
                // Set time out for the rapid increment on mouse hold down
                setTimeout("numericIDs["+this._numericID+"].holdMouseDown('up')", 350);
        } else {
                // Down picture button
                this.$(this.ID+"_downPic").src = this._down2Src;//"images/down2.png";
                // Increment down
                this.incrementDown();
                // Set time out for the rapid increment on mouse hold down
                setTimeout("numericIDs["+this._numericID+"].holdMouseDown('down')", 350);
        }
};
/**
 * numericUpDown.doMoseUp(event e)
 * Steven Kapaun
 * Handles the onMoseUp event for the up and down picture buttons.
 */
numericUpDown.prototype.doMouseUp = function(e) {
        // If no e.target, get the e.srcElement
        if(!e.target) { e.target = e.srcElement; }
        // Is it the up button or the down button
        var isUp = (e.target.getAttribute("id").indexOf("_up") != -1) ? true : false;
        // Set the _isMouseDown variable to True
        this._isMouseDown = false;
        if(isUp)
                this.$(this.ID+"_upPic").src = this._up1Src;//"images/up1.png";
        else
                this.$(this.ID+"_downPic").src = this._down1Src;//"images/down1.png";
};
/**
 * numericUpDown.holdMouseDown(String action)
 * Steven Kapaun
 * Handles the rapid increment/decrement for the on mouse hold down
 */
numericUpDown.prototype.holdMouseDown = function(action) {
        // If the mouse is still held down
        if(this._isMouseDown) {
                // Up picture button, increment up
                if(action == "up")
                        this.incrementUp();
                // Down picture button, increment down
                else
                        this.incrementDown();
                // Function string for the setTimeout
                var func = "numericIDs["+this._numericID+"].holdMouseDown('"+action+"')";
                setTimeout(func, 50);
        }
};
/**
 * window.getComputedStyle(object el, String pseudo)
 * Function Author: GianFS
 * Function URL: http://stackoverflow.com/a/13159671
 * Function Date: Oct 21, 2012
 */
if (!window.getComputedStyle) {
       window.getComputedStyle = function(el, pseudo) {
           this.el = el;
               this.getPropertyValue = function(prop) {
               var re = /(\-([a-z]){1})/g;
               if (prop == 'float') prop = 'styleFloat';
               if (re.test(prop)) {
                   prop = prop.replace(re, function () {
                       return arguments[2].toUpperCase();
                   });
               }
               return el.currentStyle[prop] ? el.currentStyle[prop] : null;
           }
           return this;
       }
}
/**
 * empty(mixed mixed_var)
 * Function Author: Philippe Baumann
 * Function URL: http://phpjs.org/functions/empty/
 * Function Date: Unknown
 */
function empty (mixed_var) {
  // Checks if the argument variable is empty
  // undefined, null, false, number 0, empty string,
  // string "0", objects without properties and empty arrays
  // are considered empty
  //
  // From: http://phpjs.org/functions
  // +   original by: Philippe Baumann
  // +      input by: Onno Marsman
  // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: LH
  // +   improved by: Onno Marsman
  // +   improved by: Francesco
  // +   improved by: Marc Jansen
  // +      input by: Stoyan Kyosev (http://www.svest.org/)
  // +   improved by: Rafal Kukawski
  // *     example 1: empty(null);
  // *     returns 1: true
  // *     example 2: empty(undefined);
  // *     returns 2: true
  // *     example 3: empty([]);
  // *     returns 3: true
  // *     example 4: empty({});
  // *     returns 4: true
  // *     example 5: empty({'aFunc' : function () { alert('humpty'); } });
  // *     returns 5: false
  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, "", "0"];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixed_var === emptyValues[i]) {
      return true;
    }
  }

  if (typeof mixed_var === "object") {
    for (key in mixed_var) {
      // TODO: should we check for own properties only?
      //if (mixed_var.hasOwnProperty(key)) {
      return false;
      //}
    }
    return true;
  }

  return false;
}
