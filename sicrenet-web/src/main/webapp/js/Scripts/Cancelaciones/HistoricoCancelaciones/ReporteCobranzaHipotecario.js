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
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

$(document).ready(function () {
    //$(".calendario").datepicker();
    $("#txtFecha").datepicker({ beforeShowDay: renderCalendarCallback });
});


function ObtenerFechaActual() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ReporteCobranzaHipotecario.aspx/DevuelveFechaActual", "POST", null, function (data) {
        $("#txtFecha").val(data.d);
        //WidtDatePicker();
        filtroFecha();
        consultarReporte();
    });
}

function filtroFecha() {
    var parametrosGetFechasDatePickerXPeriodo = { fechaCalMenos: '', fechaCalMas: '', aplicarMenos: false, aplicarMas: false, index: 0, fechaAnteriorMenos: '', arregloFechas: '', fechaswitch: '' };
    peticionAjax("ReporteCobranzaHipotecario.aspx/GetFechasDatePickerFiltro", "POST", parametrosGetFechasDatePickerXPeriodo,
                      function (data) {
                          peticionAjax("ReporteCobranzaHipotecario.aspx/GetFechasNoSelect", "POST", null,
                          function (data2) {
                              $("#txtFecha").attr("accesskey", data2.d.split(":")[2]);
                              // Waiting(false, "Espere por favor. Cargando Información...");
                          });
                      }, null);
}

function renderCalendarCallback(d) {
    var availableDates = new Array();
    var dmy = '';
    if (d.getDate() < 10) dmy += "0";
    dmy += d.getDate() + "/";
    if ((d.getMonth() + 1) <= 9)
        dmy = dmy + "0" + (d.getMonth() + 1) + "/" + d.getFullYear();
    else dmy = dmy + (d.getMonth() + 1) + "/" + d.getFullYear();
    if ($("#txtFecha").attr("accesskey") == undefined) return;
    if ($.inArray(dmy, $("#txtFecha").attr("accesskey").split(",")) != -1)
        return [true, "", ""];
    else
        return [false, "", ""];
}


function txtFecha_Onchange() {
    consultarReporte();
}

function consultarReporte() {
    Waiting(true, "Espere por favor. Cargando Información...");
    $("#divCifrasCobranzaHipo").html("");
    peticionAjax("ReporteCobranzaHipotecario.aspx/obtenerReporteCobranzaHipo", "POST", { fechaCorte: $("#txtFecha").val().split("/")[2] + $("#txtFecha").val().split("/")[1] + $("#txtFecha").val().split("/")[0] }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                $("#imgDescargarTxt").attr("alt", $("#txtFecha").val().split("/")[2] + $("#txtFecha").val().split("/")[1] + $("#txtFecha").val().split("/")[0]);
                $("#imgDescargarTxt").attr("title", "Clic para Descargar TXT. Fecha Corte:" + $("#txtFecha").val().split("/")[2] + $("#txtFecha").val().split("/")[1] + $("#txtFecha").val().split("/")[0]);
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#divCifrasCobranzaHipo").html(generarTablaDeRegistrosGenerica(JSON, "", "", "", "TblReporteCobranzaHipo", true, "100"));
                resizeTablaCobranzaHipo();
            }
        }
        else {
            MostrarMsj("Error:" + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function resizeTablaCobranzaHipo() {
    document.getElementById("divCifrasCobranzaHipo").style.height = document.documentElement.clientHeight - document.getElementById("divHeader").offsetHeight - 120 + "px"
    document.getElementById("divCifrasCobranzaHipo").style.width = document.getElementById("divHeader").offsetWidth - 25 + "px";
}

function img_DescargaTxt_Click() {
    __doPostBack('TxtReporteCobranzaHip', $("#imgDescargarTxt").attr("alt"));
}