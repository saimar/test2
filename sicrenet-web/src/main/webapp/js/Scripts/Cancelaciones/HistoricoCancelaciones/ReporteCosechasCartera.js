$(function () {
    $("#accordion").accordion();
});

function cargarAnioMesActual() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('HistoricoCancelaciones.aspx/DevuelveAñoActual', "POST", null, function DevuelveAñosMesActual_Finish(data) {
        var anioActual = parseInt(data.d.split(":")[0]);
        var mesActual = parseInt(data.d.split(":")[1]);
        cargarAniosYPeriodos(anioActual);
    }, null);
}

var arregloPeriodos;
function cargarAniosYPeriodos(anioActual) {
    peticionAjax("ReporteCosechasCartera.aspx/controlReporteCosechas", "POST", { opcion: "1", periodo: "0", devolverNumRegistros: false }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var arrayJSON = obtenerArregloDeJSON(data.d.split('%&&%')[0], false);
                var cad = '';
                for (var x = 0; x < arrayJSON.length; x++)
                    cad += '<option value="' + arrayJSON[x].anio + '">' + arrayJSON[x].anio + '</option>';
                $("#slcAnio").html(cad);
                $("#slcAnio").val(anioActual);

                arregloPeriodos = obtenerArregloDeJSON(data.d.split('%&&%')[1], false);
                cargarPeridosXAnioSeleccionado(anioActual);
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function cargarPeridosXAnioSeleccionado(anio) {
    var cad = '';
    var encontroAnio = false;
    for (var x = 0; x < arregloPeriodos.length; x++) {
        if (anio == arregloPeriodos[x].anio) {
            cad += '<option value="' + arregloPeriodos[x].periodo + '">' + arregloPeriodos[x].periodo + '</option>';
            encontroAnio = true;
        }
        if (encontroAnio && anio != arregloPeriodos[x].anio)
            break;
    }
    $("#slcPeriodo").html(cad);
    $("#slcPeriodo").val(arregloPeriodos[arregloPeriodos.length - 1].periodo);
}



function obtenerCifras() {
    Waiting(true, "Espere por favor. Cargando Información...");
    $('#divCifrasConsolidado').html("");
    peticionAjax("ReporteCosechasCartera.aspx/controlReporteCosechas", "POST", { opcion: "2", periodo: $("#slcPeriodo").val(), devolverNumRegistros: false }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var arrayJSON = obtenerArregloDeJSON(data.d, false);
                $('#divCifrasConsolidado').html(generarTablaDeRegistrosRepCose(arrayJSON));
                $("#btnDescargarConsolidado").show();
                //$('#divEncabezado').html(AgregaEncabezadoEstatico(arrayJSON));
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function descargarConsolidado() {
    descargarArchivoHistoricoAndXPeriodo($('#slcPeriodo').val());
}

function generarTablaDeRegistrosRepCose(listaDeJSON) {
    var cad = ''; //  '<input type="button" class="classButton" onClick="descargarConsolidado();" value="Descargar Consolidado"/>';
    cad += '<br /><br />';
    cad += ' <div id="divEncabezado" style="white-space: nowrap; margin-left: -1px;width: 100%;"></div>'
    cad += '<div id="divContenidoTabla" style="height:400px;overflow:auto;width: 100%;"><table id="tblDatosMain" class="dataGridDatos" style="width: 100%;">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        cad += '<th style="width:18%;">';
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
            var escantidad = parseFloat(json[element]).toString() != "NaN" && element != "Año" && element != "Mes"
        && element != "Periodo" && element != "Año de Formalización" && element != "Mes de Formalización" ? true : false;
            cad += '<td  style="width:18%;text-align:' + (escantidad ? "right" : "left") + '">';
            if (escantidad)
                cad += DevuelveCantidadSeparadaPorComas(parseFloat(json[element]).toFixed(2), false);
            else
                cad += json[element];
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div>';
    return cad;
}

function AgregaEncabezadoEstatico(listaDeJSON) {
    var cad = '<div id="divEncabezado"  style="display: inline-block; position: relative;table-layout:fixed">';
    cad += '<table id="tblEncabezado_MonitoreoOficio" style="width: 100%;table-layout:fixed">  <tbody>';
    cad += '<tr style="font-weight: bold; text-shadow: 2px 1px 1px black; font-size: 9px;height:25px;">';
    var auxJSON = listaDeJSON[0];
    var indiceColumnaEncabezado = 0;
    for (var encabezados in auxJSON) {
        if (encabezados != "") {
            cad += '<td style="white-space: pre-wrap;text-align: center; background: rgb(0, 128, 128);color: rgb(255, 255, 255);padding-bottom: 4px;';
            cad += "width:" + document.getElementById('tblDatosMain').rows[0].cells[indiceColumnaEncabezado].offsetWidth + "px";
            cad += '">';
            cad += encabezados.toString();
            cad += '</td>';
            indiceColumnaEncabezado++;
        }
    }
    cad += '</tr></tbody></table></div>';
    return cad;
}

function descargarArchivoHistoricoAndXPeriodo(periodo) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ReporteCosechasCartera.aspx/controlReporteCosechas", "POST", { opcion: "2", periodo: periodo, devolverNumRegistros: true }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "" && parseInt(data.d) > 0) {
                Waiting(true, "Espere por favor. Descargando archivo...");
                __doPostBack('pedirArchivoConsolidado', periodo);
                setTimeout(' Waiting(false, "Espere por favor. Cargando Información...");', 10000);
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}