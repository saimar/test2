function peticionAjax(urlPeticion, tipoPeticion, parametros, funcionExito, funcionFalla) {
  //  alert(urlPeticion);
    var param = JSON2String(parametros);
    request = $.ajax({
        type: tipoPeticion,
        url: urlPeticion,
        data: param,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: funcionExito,
        error: funcionFalla
    });
    request = null;
    return param;
}

function JSON2String(json) {
    var cadena = '';
    for (clave in json) {
        var valor = json[clave];
        cadena += clave + ':'
        if (typeof (valor) == 'string')
            cadena += "'" + valor + "',"
        else
            cadena += valor + ','
    }
    var strLen = cadena.length;
    cadena = cadena.slice(0, strLen - 1);
    cadena = '{' + cadena + '}';
    return cadena;
} 

function obtenerArregloDeJSON(datos, imprimir) {
    var arrayJSON = datos.split("||");
    for (var x = 0; x < arrayJSON.length; x++) {
        arrayJSON[x] = $.parseJSON(arrayJSON[x].toString());
        if (imprimir == true) {
            ImprimirJSON(arrayJSON[x]);
        }
    }
    return arrayJSON;
}


function obtenerArregloDeJSON_CarEspecial(datos, imprimir) {
    var arrayJSON = datos.split("||");
    for (var x = 0; x < arrayJSON.length; x++) {
        arrayJSON[x] = $.parseJSON(arrayJSON[x].toString().replace(/--->/g, "'").replace(/&&/g, "\\\\"));
        //arrayJSON[x] = arrayJSON[x].toString().replace(/--->/g, "'");
        if (imprimir == true) {
            ImprimirJSON(arrayJSON[x]);
        }
    }
    return arrayJSON;
}



function obtenerArregloDeJSONModificado(data,imprimir) {
    var JSON = new Array(); 
    for (var i = 0; i < data.split("####|").length; i++) {
        var JSONTemp = new Array();
        for (var ii = 0; ii < data.split("####|")[i].split("%%%%|,").length; ii++) {
            JSONTemp[data.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[0]] = data.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[1];
        }
        JSON.push(JSONTemp);
    }
    delete JSON[JSON.length - 1];
    return JSON;
}

function ImprimirJSON(json) {
    var cad = '';
    for (clave in json) {
        cad += clave + ':' + json[clave] + '\n';
        alert(clave);
    }
   // alert(cad);
}


var WFHora = "";
function FechaYHoraServer() {
    directorio = WFHora + '.aspx/obtenerHora';
    //alert(directorio);
    peticionAjax(directorio,
                "POST",
                null,
                function (data) {
                    // alert(":)");
                    var arrayJSON = obtenerArregloDeJSON(data.d, false);
                    $('#divHora').html(arrayJSON[0]["Hora"].toString());
                    $('#divFecha').html(arrayJSON[1]["Fecha"].toString());
                },
               function (data) { /*alert('entra Error :(' + data.d);*/ });
                setTimeout(FechaYHoraServer, 60000);
}


 