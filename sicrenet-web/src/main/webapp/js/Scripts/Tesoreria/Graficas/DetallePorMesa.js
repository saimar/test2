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
    $("#MainContent_ReportViewerJ_ctl01_ctl01_ctl02").parent().parent().parent().parent().hide();
    $("#MainContent_ReportViewerJ_ctl01_ctl06_ctl00").hide();
    var styleEnc = $("MainContent_ReportViewerJ_ctl01_ctl05_ctl00").parent().parent().parent().parent().parent().parent().attr("style");
    $("#MainContent_ReportViewerJ_ctl01_ctl05_ctl00").parent().parent().parent().parent().parent().parent().attr("style", styleEnc + ";background:Transparent;height: 29px;")
    document.getElementById("txtFecha").onchange = function () {
        if (nombreReporteG != "")
            ObtieneNombre(nombreReporteG);
    }
});

var nombreReporteG = "";
function funcionLoadMasterPage() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("DetallePorMesa.aspx/DatosFecha", "POST", null, function (data) {
        if (data.d != "") {
            $(".calendario").val(data.d.split("%%&&")[1] == "" ? data.d.split("%%&&")[0] : data.d.split("%%&&")[1]);
            nombreReporteG = data.d.split("%%&&")[2];
        }
        WidtDatePicker();
        Waiting(true, "Espere por favor. Cargando Información...");
        var obj = document.getElementById('ctl00$MainContent$ReportViewerJ$ctl00$ctl03$ctl01');
        var Controles = document.getElementById('ctl00$MainContent$ReportViewerJ$ctl00$ctl03$divDropDown');

        if (obj != null) {
            var oldLoc = null;

            if (obj.contentWindow)
                oldLoc = obj.contentWindow.document.location.toString();

            var form = document.getElementById('aspnetForm');
            form.appendChild(obj);

            if (oldLoc)
                obj.contentWindow.document.location = oldLoc;
        }
        if (Controles != null) {
            oldLoc = null;

            if (Controles.contentWindow)
                oldLoc = Controles.contentWindow.document.location.toString();

            form = document.getElementById('aspnetForm');
            form.appendChild(Controles);

            if (oldLoc)
                Controles.contentWindow.document.location = oldLoc;
        }

        GeneraTablaReportes();
    });
}

function GeneraTablaReportes() {
    $("#divDetalleReportes").html("");
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Tesoreria.Graficas.DetallePorMesa.GeneraTablaInfoReportes(
     $("#txtFecha").val(),
        function (response) {
            if (response.value.indexOf("Error") == -1 && response.value != "")
                $('#divDetalleReportes').html(response.value);
            else
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    );
}

function ObtieneNombre(NombreRep) {
    SicreNet.Tesoreria.Graficas.DetallePorMesa.ObtenerNombreReporte
    (
            NombreRep, $("#txtFecha").val(),
            function (response) {
                if (response.value.indexOf("Error") != -1) {
                    Waiting(true, "Espere por favor. Cargando Información...");
                    __doPostBack();
                }
            }
    );
}