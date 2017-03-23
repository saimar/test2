/*!
 * Sicrenet v1
 * Adrián Serna Romero de la Torre
 * Date: 2013.03.23
 * Funciones principales dom
 */
var Utils = (function (window, undefined) {
    var document = window.document;
    var isNumeric = function (n) { return !isNaN(parseFloat(n)) && isFinite(n); }
    return {
        dom: function (o) { return document.getElementById(o); },
        elm: function () { return document.documentElement; },
        winHeight: function (s) { return document.documentElement.clientHeight - (s || 0); },
        setCcsMarginLeft: function (o, s) { if (this.dom(o)) { this.dom(o).style.marginLeft = s; } },
        setCcsWidth: function (o, s) { if (this.dom(o)) { this.dom(o).style.width = isNumeric(s) ? s + 'px' : s; } },
        setCcsHeight: function (o, s) { if (this.dom(o)) { this.dom(o).style.height = isNumeric(s) ? s + 'px' : s; } },
        offSetWidth: function (o, s) { return this.dom(o).offsetWidth + (s || 0); },
        offSetHeight: function (o, s) { return this.dom(o).offsetHeight + (s || 0); },
        setWidthFromOffSet: function (o, o2, s) { this.setCcsWidth(o, (this.offSetWidth(o2, s))); },
        getWidth: function (o) { return this.dom(o).style.width; },
        getHeight: function (o) { return this.dom(o).stylet.height; }

    }
}(window));