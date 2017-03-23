
$(document).ready(function () {
    $('ul.menu li').live("click", function () {
        if ($(this).text() == "   Diario" || $(this).text() == "   Semanal" || $(this).text() == "   Mensual") {
            var periocidadSeleccionada = $(this).text() == "   Diario" ? 3 : ($(this).text() == "   Semanal" ? 2 : 1); 
            Tools.createCookie("opcionActivada", true, 0);
            //            periocidadSelectXUser = Tools.readCookie("periocidadSeleccionada");  
        }
    });
});

  

var Tools = {
    createCookie: function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    eraseCookie: function (name) {
        Tools.createCookie(name, "", -1);
    }
};


function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
} 