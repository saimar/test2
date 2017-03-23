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
    $(".calendario").datepicker();
});

function funcionLoadMasterPage() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Excesos.aspx/DatosFecha", "POST", null, function (data) {
        if (data.d != "") {
            $(".calendario").val(data.d.split("%%&&")[1]);
        }
        WidtDatePicker();
        btnGenerarReporte_Click();
        //Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function btnGenerarReporte_Click() {
    $("#divGridDatosRCE").html("");
    $("#divGridDatosRFF").html("");
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Tesoreria.Graficas.Excesos.GeneraReportesExcesos(
   $("#txtFechaInicio").val(), $("#txtFechaFin").val(),
        function (response) {
            if (response.value.indexOf("Error") == -1 && response.value != "") {
                if (parseInt(response.value.split("%%&&")[2]) > 0)
                    $("#divGridDatosRCE").html(response.value.split("%%&&")[0]);
                else $("#divGridDatosRCE").html('<table style="width: 100%;" class="dataGrid"> <tr><th> RCE </th></tr><tr><td style="text-align: center">Sin Datos</td></tr></table>');
                if (parseInt(response.value.split("%%&&")[3]) > 0)
                    $("#divGridDatosRFF").html(response.value.split("%%&&")[1]);
                else $("#divGridDatosRFF").html('<table style="width: 100%;" class="dataGrid"> <tr><th> RFF </th></tr><tr><td style="text-align: center">Sin Datos</td></tr></table>');
                if (parseInt(response.value.split("%%&&")[2]) > 0 || parseInt(response.value.split("%%&&")[3]) > 0)
                    $("#spanMiles").html("(Cifras en Miles de Pesos)");
            } else
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    );
}
function ExportarAPdf() {
    Waiting(true, "Espere por favor. Cargando Información...");
    __doPostBack('PdfExcesos', '');
    setTimeout(terminarWait, 6000);
}

function ExportarAExcel() {
    Waiting(true, "Espere por favor. Cargando Información...");
    __doPostBack('ExcelExcesos', '');
    setTimeout(terminarWait, 6000);
}