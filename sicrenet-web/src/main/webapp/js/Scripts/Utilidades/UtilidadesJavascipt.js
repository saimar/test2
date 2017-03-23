function convertirArrayString2ArrayFloat(array) {
    for (var cont = 0; cont < array.length; cont++) {
        array[cont] = parseFloat(array[cont]);
    }

    return array;
}

function ReplaceAll(Source, stringToFind, stringToReplace) {
    var temp = Source;
    var index = temp.indexOf(stringToFind);
    while (index != -1) {
        temp = temp.replace(stringToFind, stringToReplace);
        index = temp.indexOf(stringToFind);
    }
    return temp;
}

function FechaYHoraServer() {
    var url = '<%=Page.Request.Url.AbsolutePath %>';
    var numeroDirectorios = url.toString().split('/').length;
    var directorio = '';
    if (numeroDirectorios > 2) {
        for (var i = 0; i < numeroDirectorios - 2; i++) {
            directorio += '../';
        }
    }
    directorio = directorio + 'WFHoraFecha.aspx/obtenerHora';
    peticionAjax(directorio,
                "POST",
                null,
                function (data) {
                    var arrayJSON = obtenerArregloDeJSON(data.d, false);
                    $('#divHora').html(arrayJSON[0]["Hora"].toString());
                    $('#divFecha').html(arrayJSON[1]["Fecha"].toString());
                },
               function (data) { /*alert('entra Error :(');*/ });
}



function SoloNumeros() {
    if (window.event.keyCode < 47 || window.event.keyCode > 57) {
        window.event.keyCode = 0;
    }
}
