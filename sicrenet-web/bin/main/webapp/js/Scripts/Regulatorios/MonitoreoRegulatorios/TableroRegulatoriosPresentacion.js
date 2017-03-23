$(function ($) {
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        isRTL: false,
        startDate: '30/06/2008',
        showMonthAfterYear: false,
        yearSuffix: '',
        hideIfNoPrevNext: true,
        showAnim: 'slideDown',
        showOn: "both",
        showOtherMonths: true,
        showStatus: true,
        showWeek: true,
        firstDay: 1,
        numberOfMonths: 1,
        selectOtherMonths: true,
        daysOfWeekDisabled: "1,2,3,4,5,6"
        //changeMonth: true, 
        //changeYear: true,  
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

var opcionCargar;
var FechaActual = "";
function loadPageTableroReg() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    $(".periodo").datepicker();
    $(".ui-datepicker-trigger").attr("disabled", true);
    Waiting(true, "Cargando Información...");
    opcionCargar = Tools.readCookie("opcionPropuestaTableroRAZ");
    opcionCargar = opcionCargar == null ? 1 : opcionCargar;
    Tools.eraseCookie("opcionPropuestaTableroRAZ"); // Eliminar Cookie
    peticionAjax('TableroRegulatorios.aspx/getFechaActual', "POST", null,
            function (data) {
                if (data.d != "") {
                    FechaActual = data.d;
                    $("#txtFechaCorte").val(data.d);
                }
                cargarPais();
            }, null);
}

var JSONPaises;
function cargarPais() {
    Waiting(true, "Cargando Información...");
    peticionAjax('TableroRegulatorios.aspx/controlPaises', "POST", { idPais: 0, estatusPais: 1, opcion: 1 },
    function (data) {
        if (data.d != null && data.d.indexOf("ERRORCATCH") == -1)
            JSONPaises = obtenerArregloDeJSON(data.d, false);
        else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        cargarPeriodicidad();
    }, null);
}

var JSONPeriodicidad;
function cargarPeriodicidad() {
    peticionAjax('TableroRegulatorios.aspx/GetPeriodicidad', "POST", null,
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    JSONPeriodicidad = obtenerArregloDeJSON(data.d, false);
                    for (var i = 0; i < JSONPeriodicidad.length; i++) {
                        var Item = JSONPeriodicidad[i];
                        var opcion = new Option(Item.descripcion, Item.idPeriodicidad);
                        document.getElementById('sltPeriodicidad').options[document.getElementById('sltPeriodicidad').options.length] = opcion;
                        document.getElementById('sltPeriodicidad').options[document.getElementById('sltPeriodicidad').options.length - 1].title = Item.descripcion;
                    }
                }
                else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                cargarSegmentos();
            }, null);
}

var JSONSegmentos;
function cargarSegmentos() {
    peticionAjax('TableroRegulatorios.aspx/controlSegmentos', "POST", { descSegmento: "", opcion: 1 },
                    function (dataS) {
                        if (dataS.d != null && dataS.d.indexOf("ERRORCATCH") == -1)
                            JSONSegmentos = obtenerArregloDeJSON(dataS.d, false);
                        else MostrarMsj(dataS.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                        cargarTablaDiapositiva(0);
                    }, null);
}

var arregloPaisesIndicadores = new Array();
function cargarTablaDiapositiva(indicePais) {

    peticionAjax('TableroRegulatorios.aspx/GetReportesInventario', "POST", { fechaCorte: /*"2015-01-31" */$("#txtFechaCorte").val().split('/')[2] + "-" + $("#txtFechaCorte").val().split('/')[1] + "-" + $("#txtFechaCorte").val().split('/')[0], idPais: JSONPaises[indicePais].idPais, opcion: 0, esEventoBtn: false },
        function (dataI) {
            var arregloPaisesIndicadoresTemp = new Array();
            var JSONInventarioTemp = new Array();
            arregloPaisesIndicadoresTemp["idPais"] = JSONPaises[indicePais].idPais;
            if (dataI.d.indexOf("ERRORCATCH") == -1) {
                if (dataI.d != null && dataI.d != "") {
                    var JSONInventario = obtenerArregloDeJSON(dataI.d.split("%%&&")[0], false);
                    for (var i = 0; i < JSONInventario.length; i++) {
                        if (JSONInventario[i].periodicidad == /*"3")*/$("#sltPeriodicidad").val())
                            JSONInventarioTemp.push(JSONInventario[i]);
                    }
                }
            }
            else MostrarMsj(dataI.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            arregloPaisesIndicadoresTemp["idPais"] = JSONPaises[indicePais].idPais;
            arregloPaisesIndicadoresTemp["indicadores"] = JSONInventarioTemp;

            arregloPaisesIndicadores.push(arregloPaisesIndicadoresTemp);
            if (indicePais + 1 < JSONPaises.length)
                cargarTablaDiapositiva(indicePais + 1);
            else {
                $("#divTblPrincipal").html("");
                if (opcionCargar == 1) $("#divTblPrincipal").html(creaTablaIndicadoresPaisesOpcion1y2(1));
                if (opcionCargar == 2) $("#divTblPrincipal").html(creaTablaIndicadoresPaisesOpcion1y2(2));
                if (opcionCargar == 3) { opcion3y4 = 3; indiceSegementoOpcion3y4 = 0; creaTablaIndicadoresPaisesOpcion3Y4(); }
                if (opcionCargar == 4) { opcion3y4 = 4; indiceSegementoOpcion3y4 = 0; creaTablaIndicadoresPaisesOpcion3Y4(); }
                if (opcionCargar == 1 || opcionCargar == 2) {
                    var descPeriodicidad = $("#sltPeriodicidad :selected").text().toUpperCase() == "DIARIA" ? "DIARIO" : $("#sltPeriodicidad :selected").text().toUpperCase();
                    $("#divTituloMR").html("TABLERO REGULATORIOS " + descPeriodicidad + " (" + $("#txtFechaCorte").val() + ")");
                    setTimeout(mostrarPresentacionXPeriodicidad, 10000);
                    arregloPaisesIndicadores = new Array();
                }
                Waiting(false, "Cargando Información...");
            }
        }, null);
}

function creaTablaIndicadoresPaisesOpcion1y2(opcion) {// Muestra Relación Periodicidad- Todos Paises
    var arregloColores = new Array("rgba(222, 184, 135, 0.7)", "rgba(100, 149, 237, 0.55)", "darkseagreen", "rgba(218, 165, 32, 0.67)", "rgba(165, 42, 42, 0.66)");
    var cad = '<table id="tblReporteInventario" class="dataGridDatos" style="width:100%;">';

    if (opcion == 1) {
        cad += creaTablaIndicadoresPaises2(0, Math.round(JSONPaises.length / 2), arregloPaisesIndicadores);
        cad += creaTablaIndicadoresPaises2(Math.round(JSONPaises.length / 2), JSONPaises.length, arregloPaisesIndicadores);
    }
    else
        cad += creaTablaIndicadoresPaises2(0, JSONPaises.length, arregloPaisesIndicadores);
    cad += '</table>';
    return cad;
}


var indiceSegementoOpcion3y4 = 0;
var opcion3y4;
function creaTablaIndicadoresPaisesOpcion3Y4() {// Muestra Relacion Periodicidad-Segmento-Todos Paises
    if (indiceSegementoOpcion3y4 < JSONSegmentos.length) {
        var descPeriodicidad = $("#sltPeriodicidad :selected").text().toUpperCase() == "DIARIA" ? "DIARIO" : $("#sltPeriodicidad :selected").text().toUpperCase();
        $("#divTituloMR").html("TABLERO REGULATORIOS " + descPeriodicidad + " (" + $("#txtFechaCorte").val() + ") - SEGMENTO " + devuelveNumReportesXSegmento(JSONSegmentos[indiceSegementoOpcion3y4].FIIdSegmento, arregloPaisesIndicadores[0].indicadores).split(',')[1].toUpperCase());
        var arregloColores = new Array("rgba(222, 184, 135, 0.7)", "rgba(100, 149, 237, 0.55)", "darkseagreen", "rgba(218, 165, 32, 0.67)", "rgba(165, 42, 42, 0.66)");
        var cad = '<table id="tblReporteInventario" class="dataGridDatos" style="width:100%;">';

        var arregloPaisesIndicadoresTemp = new Array();
        for (var i = 0; i < arregloPaisesIndicadores.length; i++) {
            var JSONInventarioTemp = new Array();
            var arregloPaisesIndicadoresTemp2 = new Array();
            arregloPaisesIndicadoresTemp2["idPais"] = arregloPaisesIndicadores[i].idPais;
            for (var ii = 0; ii < arregloPaisesIndicadores[i].indicadores.length; ii++) {
                if (JSONSegmentos[indiceSegementoOpcion3y4].FIIdSegmento == arregloPaisesIndicadores[i].indicadores[ii].IDSeg) {
                    JSONInventarioTemp.push(arregloPaisesIndicadores[i].indicadores[ii]);
                }
            }
            arregloPaisesIndicadoresTemp2["indicadores"] = JSONInventarioTemp;
            arregloPaisesIndicadoresTemp.push(arregloPaisesIndicadoresTemp2);
        }
        if (opcion3y4 == 3) {
            cad += creaTablaIndicadoresPaises2(0, Math.round(JSONPaises.length / 2), arregloPaisesIndicadoresTemp);
            cad += creaTablaIndicadoresPaises2(Math.round(JSONPaises.length / 2), JSONPaises.length, arregloPaisesIndicadoresTemp);
        }
        else
            cad += creaTablaIndicadoresPaises2(0, JSONPaises.length, arregloPaisesIndicadoresTemp);
        cad += '</table>';
        $("#divTblPrincipal").html(cad);
        indiceSegementoOpcion3y4 = indiceSegementoOpcion3y4 + 1;
        setTimeout(creaTablaIndicadoresPaisesOpcion3Y4, 5000);
    }
    else {
        setTimeout(mostrarPresentacionXPeriodicidad, 5000);
        arregloPaisesIndicadores = new Array();
    }
}

var arregloColores = new Array("rgba(222, 184, 135, 0.7)", "rgba(100, 149, 237, 0.55)", "darkseagreen", "rgba(218, 165, 32, 0.67)", "rgba(165, 42, 42, 0.66)");
function creaTablaIndicadoresPaises2(valorInicio, valorFin, arregloPaisesIndicadoresTemp) {
    var cad = '<tr>';
    for (var i = valorInicio; i < valorFin; i++) {
        if (JSONPaises[i] != null) {
            cad += '<th>Segmento</th>';
            cad += '<th>Reporte</th>';
            cad += '<th>';
            cad += '<center><img class="logoBanderaMonitRegulatorios" src="../../Images/PanelDeControl/BanderasRect/' + omitirAcentos(replaceAll(JSONPaises[i].descPais.toLowerCase(), " ", "")) + '.gif" /></center>';
            cad += '<input id="hidden_' + JSONPaises[i].idPais + '" type="hidden" />';
            cad += '</th>';
            cad += '<td style="width:5px"></td>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';


    var numMayorReportes = 0;
    for (var i = valorInicio; i < valorFin; i++)
        numMayorReportes = arregloPaisesIndicadoresTemp[i].indicadores.length > numMayorReportes ? arregloPaisesIndicadoresTemp[i].indicadores.length : numMayorReportes;

    for (var i = 0; i < numMayorReportes; i++) {
        //cad += (i % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">'; 
        cad += '<tr>';
        for (var ii = valorInicio; ii < valorFin; ii++) {
            if (arregloPaisesIndicadoresTemp[ii].indicadores[i] != undefined) {
                if (i == 0 || (i > 0 && arregloPaisesIndicadoresTemp[ii].indicadores[i].IDSeg != arregloPaisesIndicadoresTemp[ii].indicadores[i - 1].IDSeg)) {
                    var rowSpanSeg = devuelveNumReportesXSegmento(arregloPaisesIndicadoresTemp[ii].indicadores[i].IDSeg, arregloPaisesIndicadoresTemp[ii].indicadores);
                    cad += '<td rowspan="' + rowSpanSeg.split(',')[0] + '" style="background: #009c96 url(../../Images/Cancelaciones/SeguimientoCancelacion/HeaderDG.gif) repeat-x;color: White;text-align: center;" >' + rowSpanSeg.split(',')[1] + '</td>';
                }
                var colorBackground = parseInt(arregloPaisesIndicadoresTemp[ii].indicadores[i].IDSeg) < arregloColores.length ? arregloColores[parseInt(arregloPaisesIndicadoresTemp[ii].indicadores[i].IDSeg)] : arregloColores[parseInt(arregloPaisesIndicadoresTemp[ii].indicadores[i].IDSeg) - arregloColores.length];
                cad += '<td style="background:' + colorBackground + ';">' + arregloPaisesIndicadoresTemp[ii].indicadores[i].descrip + '</td>';
                cad += '<td class="' + DeterminaEstatusDeReporteXId(arregloPaisesIndicadoresTemp[ii].indicadores[i].estatus) + '"> </td>';
            }
            else
                cad += '<td colspan="3" style="text-align: center;">' + (i == 0 ? "Sin Reportes" : "") + '</td>';
            cad += '<td style="width:5px"></td>';
        }
        cad += '</tr>';
    }
    if (numMayorReportes == 0) {
        cad += '<tr>';
        for (var ii = valorInicio; ii < valorFin; ii++)
            cad += '<td colspan="3" style="text-align: center;">Sin Reportes</td> <td style="width:5px"></td>';
        cad += '</tr>';
    }
    else
        cad += '<tr style="height:5px;"><td colspan="' + 3 * valorFin + '"></td></tr>';
    return cad;
}


function devuelveNumReportesXSegmento(segmento, arregloIndicadores) {
    var numReportes = 0;
    for (var i = 0; i < arregloIndicadores.length; i++) {
        if (arregloIndicadores[i].IDSeg == segmento)
            numReportes++;
        if (arregloIndicadores[i].IDSeg != segmento && numReportes != 0)
            break;
    }

    var descSegmento = "";
    for (var i = 0; i < JSONSegmentos.length; i++) {
        if (JSONSegmentos[i].FIIdSegmento == segmento) {
            descSegmento = JSONSegmentos[i].FVCDescripcion;
            break;
        }
    }
    return numReportes + "," + descSegmento;
}

function DeterminaEstatusDeReporteXId(idItem) {
    var classColor = "EstatusGris";
    switch (idItem) {
        case "1": classColor = "EstatusVerde"; break;
        case "2": classColor = "EstatusAmarillo"; break;
        case "3": classColor = "EstatusRojo"; break;
        case "4": classColor = "EstatusNegro"; break;
    }
    return classColor;
}


var indexPeriodicidadSelect = 0;
function mostrarPresentacionXPeriodicidad() {
    if (indexPeriodicidadSelect < document.getElementById("sltPeriodicidad").options.length - 1)
        indexPeriodicidadSelect += 1;
    else
        indexPeriodicidadSelect = 0;
    $("#sltPeriodicidad").prop("selectedIndex", indexPeriodicidadSelect);
    if ($("#sltPeriodicidad").val() != "1" && $("#sltPeriodicidad").val() != "6") {
        var parametros = { PeriocidadSet: $("#sltPeriodicidad").val(), fechaCalMenos: '', fechaCalMas: '', aplicarMenos: false, aplicarMas: false, index: 0, fechaAnteriorMenos: '', arregloFechas: '', fechaswitch: '', fechaActualSelect: '' };
        peticionAjax("TableroRegulatorios.aspx/GetFechasDatePickerXPeriodo", "POST", parametros,
                      function GetFechasDatePickerXPeriodo_finish(data) {
                          peticionAjax("TableroRegulatorios.aspx/GetFechasNoSelect", "POST", null,
                          function GetFechasNoSelect_finish(data) {
                              $("#txtFechaCorte").attr("accesskey", data.d.split(":")[1]);
                              //$("#txtFechaCorte").datepicker({ beforeShowDay: renderCalendarCallback });
                              $("#txtFechaCorte").val(data.d.split(":")[0]);
                              cargarTablaDiapositiva(0);
                          });
                      }, null);
    }
    else {
        $("#txtFechaCorte").val(FechaActual);
        cargarTablaDiapositiva(0);
    }
}
 