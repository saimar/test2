function cargarAnios() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('HistoricoCancelaciones.aspx/DevuelveAñoActual', "POST", null, function DevuelveAñosMesActual_Finish(data) {
        var anioInicial = 2011;
        var anioFinal = parseInt(data.d.split(":")[0]);
        var cad = '';
        cad += '<option value="-1">Seleccione Año</option>';
        for (; anioInicial <= anioFinal; anioInicial++)
            cad += '<option value="' + anioInicial + '">' + anioInicial + '</option>';
        $('.slcAnio').html(cad);
        $('.slcAnio').val(anioFinal);
        cargarPeriodos($('.slcAnio').val(), parseInt(data.d.split(":")[1]));
        $('.slcAnio').change(function () {
            if ($(this).val() != '-1')
                cargarPeriodos($(this).val(), null);
            else
                alert('Debe de seleccionar un año');
        });
    }, null);
}


/***************************************************************  Peticiones Ajax  *********************************************************************/

function cargarPeriodos(value, periodoMes) {
    peticionAjax("HistoricoCancelaciones.aspx/obtenerPeriodos", "POST", { anio: value }, function (data) {
        var arrayJSON = obtenerArregloDeJSON(data.d, false);
        var cad = '';
        var idperiodo = "";
        for (var x = 0; x < arrayJSON.length; x++) {
            var json = arrayJSON[x];
            cad += '<option value="' + json.idPeriodo + '">';
            cad += json.descPeriodo;
            cad += '</option>';
            if (periodoMes != null && periodoMes == parseInt(json.Periodo))
                idperiodo = json.idPeriodo;
        }
        $("#slcPeriodo").html(cad);
        $("#slcPeriodo").val(idperiodo);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}



function obtenerCifras() {
    Waiting(true, "Espere por favor. Cargando Información...");
    $('#divCifrasConsolidado').html("");
    peticionAjax("HistoricoCancelaciones.aspx/obtenerCifras", "POST", { idPeriodo: $('#slcPeriodo').val() }, obtenerCifrasFinalizado, obtenerCifrasFinalizado);
}

function obtenerCifrasFinalizado(data) {
    Waiting(false, "Espere por favor. Cargando Información...");
    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    if (arrayJSON[0].SinDatos != undefined) {
        alert(arrayJSON[0].SinDatos.toString());
        return;
    }
    $('#divCifrasConsolidado').html(generarTablaDeRegistrosHistorico(arrayJSON));
    document.getElementById("divContenidoTabla").style.height = parseInt(document.getElementById("tblDatosMain").offsetHeight) <= 700 ? parseInt(document.getElementById("tblDatosMain").offsetHeight) + "px" : 700 + "px";
}

function descargarConsolidado() {
    Waiting(true, "Espere por favor. Descargando archivo...");
    __doPostBack('pedirArchivo', $('#slcPeriodo').val());
    setTimeout(' Waiting(false, "Espere por favor. Cargando Información...");', 10000);
}

/*********************************************************************************************************************************************************/
/***************************************************************  Elementos HTML  ************************************************************************/
function generarTablaDeRegistrosHistorico(listaDeJSON) {
    var cad = '<input type="button" class="classButton" onClick="descargarConsolidado();" value="Descargar Consolidado"/>';
    cad += '<br /><br />';
    cad += '<div id="divContenidoTabla" style="height:500px;overflow:auto"><table id="tblDatosMain" class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        cad += '<th style="width:18%">';
        cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '</tr>';
    cad += '</thead>';

    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length - 1; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td>';
            cad += format(json[element]);
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '<tfoot><tr class="rowPie">';
    var json = listaDeJSON[listaDeJSON.length - 1];
    var contador = 1;
    for (var element in json) {
        if (json[element] != '') {
            cad += '<td colspan="' + contador + '">';
            cad += format(json[element]);
            cad += '</td>';
            contador = 1;
        }
        else {
            contador++;
        }
    }
    cad += '</tr></tfoot>';

    cad += '</table></div>';
    return cad;
}

function format(num) {
    var result = '';
    if (!isNaN(num)) {
        var partes = num.split('.');
        var number = partes[0];
        while (number.length > 3) {
            result = ',' + number.substr(number.length - 3) + result;
            number = number.substring(0, number.length - 3);
        }
        result = number + result;

        if (partes.length == 2) {
            result = result + "." + partes[1];
        }

        return result;
    }
    return num;
}
/*********************************************************************************************************************************************************/
