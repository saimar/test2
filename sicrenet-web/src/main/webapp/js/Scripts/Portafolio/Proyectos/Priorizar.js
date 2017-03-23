
/*--------------------------------------------- Priorizar -------------------------------------------------------------------------------------------------------*/
var existeItemsPriorizados = false;
function MenuPriorizar() {
    if ($("#slCatPais").val() == '-1') {
        MostrarMsj('Debe Seleccionar un solo País.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 115, null, null, null);
        return;
    }
    var cadena = '<div id="divBloqVtndvPriorizar" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvPriorizar" style="width:100%;height:100%;margin-top: 0px;"> ';
    cadena += '<img id="ImageExportExcel" style="margin-left:' + (navigator.appName.indexOf('Explorer') != -1 ? '90%;' : '41%;') + 'margin-top: -20px;position: absolute;" class="imgCrecerMedium" Title="Exporta a Excel" src="../../Images/Cancelaciones/Cargas/excelImg.jpeg" onclick="__doPostBack(\'ExcelS\',\'\')"  /><div style="width:100%;height:95%;margin-top: 10px;overflow:auto;"><table style="width:100%"><tr><td style="text-align:right;width:95%;"><br /></td></tr>';
    cadena += '<tr><td style="width:100%; text-align:center"><ul id="sortable" style="list-style:none; width:100%;cursor: move;"></ul></td></tr>';
    cadena += '<tr><td  style="width:100%; text-align:center"><br /><div id="dvReporteActividades" style="width:100%"></div></td></tr></table></div>';
    cadena += '</div></div>';
    $("#dvPriorizar").empty();
    AgregarVtnFlotante("dvPriorizar", "", "ACTIVIDADES PRIORIZADAS", "", cadena, 500, 650, false, false, "", "", null);
    $("#dvPriorizar").on("dialogclose", function (event, ui) {
        if (existeItemsPriorizados && $("#Checkbox1").is(":checked"))
            VerPorPrioridad();
        existeItemsPriorizados = false;
    });
    $("#sortable").sortable({
        update: function (event, ui) {
            GuardaPriorizacion();
            existeItemsPriorizados = true;
            ui.item.context.style.background = "";
        },
        stop: function (event, ui) { ui.item.context.style.background = ""; },
        activate: function (event, ui) {
            ui.item.context.style.background = "Brown";
        },
        placeholder: "ui-state-highlight",
        revert: true,
        opacity: 0.8
    });
    ObtenerActividades();
}

/*--------------------------------------------- Obtener Tabla con Información (Bitacora)-----------------------------------------------------------------------*/
function ObtenerActividades() {
    WaitingVtn("divBloqVtndvPriorizar", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    //posicion = 0;
    //Literal = '';
    var Parametros = { Opcion: 1, idPais: $("#slCatPais").val(), Actividad: '' };
    peticionAjax("Proyectos.aspx/ActividadesAPriorizar", "POST", Parametros, IntegraLista, null);
}
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
function IntegraLista(data) {
    if (data.d == "ERROR") {
        WaitingVtn("divBloqVtndvPriorizar", false, false, "Cargando Información...");
        MostrarMsj('Error al guardar.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 115, null, null, null);
        return;
    }
    var cad = '';
    var JSON = obtenerArregloDeJSON(data.d, false);
    for (var filas = 0; filas < JSON.length; filas++) {
        var json = JSON[filas];
        json != null ? cad += '<li class="ui-state-default" style="text-decoration: none" id=\'' + json.Id + '\'>' + json.Actividad + '</li>' : cad += '';
    }
    $('#sortable').html(cad);
    var Parametros = { Opcion: 2, idPais: $("#slCatPais").val(), Actividad: '' };
    // WaitingVtn("divBloqVtndvPriorizar", false, false, "Cargando Información...");
    peticionAjax("Proyectos.aspx/ActividadesAPriorizar", "POST", Parametros, ATablaPriorizada, null);
}
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
function GuardaPriorizacion() {
    WaitingVtn("divBloqVtndvPriorizar", true, true, "Guardando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var sortedIDs = $("#sortable").sortable("toArray").toString();
    var Parametros = { Opcion: 2, idPais: $("#slCatPais").val(), Actividad: sortedIDs.toString() };
    peticionAjax("Proyectos.aspx/ActividadesAPriorizar", "POST", Parametros, ATablaPriorizada, null);
}
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
function ATablaPriorizada(data) {
    var cad = '';
    var JSON = obtenerArregloDeJSON(data.d, false);
    cad = generarReporteActividades(JSON);
    $('#dvReporteActividades').html(cad);
    WaitingVtn("divBloqVtndvPriorizar", false, false, "Cargando Información...");
}
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
function generarReporteActividades(listaDeJSON) {
    var auxJSON = listaDeJSON[0];
    var cad = '<center><table id="tblReportAct" class="dataGridDatos" style="width:100%">';
    cad += '<thead>';
    cad += '<tr>';

    for (var encabezados in auxJSON) {
        if (encabezados.toString() == 'Id') {
            cad += '<th style="width:2%">';
        } else {
            cad += '<th style="width:10%">';
        }
        cad += encabezados.toString();
        cad += '</th>';
    }

    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';

    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var json = listaDeJSON[filas];
        cad += (filas % 2 == 0) ? '<tr class="rowAlt" >' : '<tr class="alternateRowAlt" >';

        for (var element in json) {
            cad += '<td style="text-align:center">';
            if (element == 'Prioridad') {
                cad += romanise(json[element].toString());
            } else {
                cad += json[element];
            }
            cad += '</td>';
        }

        cad += '</tr>';
    }

    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}

/*--------------------------------------------------------------  Numeros Romanos -----------------------------------------------------------------------*/

function romanise(valorEntero) {
    var roman = "";
    var ronumdashes = "";
    var persian = valorEntero;
    var buffer = 10 - persian.length;
    var units = new Array("", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX");
    var tens = new Array("", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC");
    var hundreds = new Array("", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM");
    var thousands = new Array("", "M", "MM", "MMM", "MV", "V", "VM", "VMM", "VMMM", "MX");
    var billionsdashes = new Array("", "=", "==", "===", "==", "=", "==", "===", "====", "==");

    while (buffer > 0) { persian = "0" + persian; buffer-- }

    romandashes = billionsdashes[persian.substring(0, 1)];
    var hundredmillionsdashes = new Array("", "=", "==", "===", "==", "=", "==", "===", "====", "==");
    romandashes += hundredmillionsdashes[persian.substring(1, 2)];
    var tenmillionsdashes = new Array("", "=", "==", "===", "==", "=", "==", "===", "====", "==");
    romandashes += tenmillionsdashes[persian.substring(2, 3)];
    var millionsdashes = new Array("", "_", "__", "___", "_=", "=", "=_", "=__", "=___", "_=");
    romandashes += millionsdashes[persian.substring(3, 4)];
    var hundredthousandsdashes = new Array("", "_", "__", "___", "__", "_", "__", "___", "____", "__");
    romandashes += hundredthousandsdashes[persian.substring(4, 5)];
    var tenthousandsdashes = new Array("", "_", "__", "___", "__", "_", "__", "___", "____", "__");
    romandashes += tenthousandsdashes[persian.substring(5, 6)];
    var thousandsdashes = new Array("", "", "", "", " _", "_", "_", "_", "_", " _");
    romandashes += thousandsdashes[persian.substring(6, 7)];

    roman = thousands[persian.substring(0, 1)];
    roman += hundreds[persian.substring(1, 2)];
    roman += tens[persian.substring(2, 3)];
    roman += thousands[persian.substring(3, 4)];
    roman += hundreds[persian.substring(4, 5)];
    roman += tens[persian.substring(5, 6)];
    roman += thousands[persian.substring(6, 7)];
    roman += hundreds[persian.substring(7, 8)];
    roman += tens[persian.substring(8, 9)];
    roman += units[persian.substring(9, 10)];
    return roman;
}

/*--------------------------------------------------------------Visualiza por Prioridad----------------------------------------------------------------------*/
function VerPorPrioridad() {
    if ($("#slCatPais").val() == '-1') { MostrarMsj('Debe Seleccionar un solo País.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 115, null, null, null); $("#Checkbox1").removeAttr('checked'); } else {

        if ($("#Checkbox1").attr('checked') != undefined) {
            DeshabilitaFiltros();
        } else {
            HabilitaFiltros();
        }
        CargaInfFiltrada(false);
    }
}

function DeshabilitaFiltros() {
    $("#datepicker3").val('');
    $("#datepicker3").val('');
    $("#InBuscaCoincidencias").val('');
    $("#slCatEstado").val('1');
    $("#slCatResponsable").val('-1');
    $("#slCatEstado").attr('disabled', true);
    $("#slCatResponsable").attr('disabled', true);
    $("#InBuscaCoincidencias").attr('disabled', true);
    $("#datepicker3").attr('disabled', true);
    $("#datepicker4").attr('disabled', true);
    $('.ui-datepicker-trigger').attr('disabled', 'disabled')
}

function HabilitaFiltros() {
    $("#slCatEstado").removeAttr('disabled');
    $("#slCatResponsable").removeAttr('disabled');
    $("#InBuscaCoincidencias").removeAttr('disabled');
    $("#datepicker3").removeAttr('disabled');
    $("#datepicker4").removeAttr('disabled');
    $('.ui-datepicker-trigger').removeAttr('disabled')
}