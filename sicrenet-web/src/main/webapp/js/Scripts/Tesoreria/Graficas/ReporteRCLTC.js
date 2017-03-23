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

$(function () {
    $(".calendario").datepicker();
});

function funcionLoadMasterPage() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ReporteRCLTC.aspx/GetValorArgumentos", "POST", { opcion: 1 }, function (data) {
        if (data.d == "") {
            Tools.eraseCookie("esCargaGrafica");
            $("#MainContent_divGrafica").html("");
            $("#MainContent_divGridDatos").html("");
            // $("#MainContent_spanTitulo").html("");
            $("#MainContent_spanMiles").html("");
        }
        WidtDatePicker();
        sltPeriodo_SelectionChange();
    });
}

var valorArgumentos = "";
function sltPeriodo_SelectionChange() {
    var agregarItemsComboAño = false;
    document.getElementById("sltaño").options.length = 0;
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ReporteRCLTC.aspx/GetValorArgumentos", "POST", { opcion: 2 }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            valorArgumentos = data.d;
            switch ($("#sltPeriodo").val()) {
                case "1":
                    $("#txtFecha").show();
                    $("#txtFecha").next().show();
                    $("#sltaño").hide();
                    $("#sltSemanaMes").hide();
                    $("#spanFecha").html("Seleccione una Fecha");
                    agregarItemsComboAño = false;
                    break;
                case "7":
                    $("#txtFecha").hide();
                    $("#txtFecha").next().hide();
                    $("#sltaño").show();
                    $("#sltSemanaMes").show();
                    $("#spanFecha").html("Seleccione una Semana");
                    agregarItemsComboAño = true;
                    break;
                case "30":
                    $("#txtFecha").hide();
                    $("#txtFecha").next().hide();
                    $("#sltaño").show();
                    $("#sltSemanaMes").show();
                    $("#spanFecha").html("Seleccione un Mes");
                    agregarItemsComboAño = true;
                    break;
            }
            sltaño_SelectionChange(agregarItemsComboAño);
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    });
}

function sltaño_SelectionChange(agregarItemsComboAño) {
    document.getElementById("sltSemanaMes").options.length = 0;
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ReporteRCLTC.aspx/DatosFecha", "POST", null, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                if (valorArgumentos != "")
                    $("#txtFecha").val(valorArgumentos.split('|')[0]);
                else
                    $("#txtFecha").val(data.d.split("%%&&")[1]);
                var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[2], false);
                var anio = data.d.split("%%&&")[0].split('/')[2];
                var mes = data.d.split("%%&&")[0].split('/')[1];
                if (agregarItemsComboAño) {
                    for (var i = 2011; i <= anio; i++) {
                        var opt = document.createElement("option");
                        opt.value = i.toString();
                        opt.innerHTML = i.toString();
                        document.getElementById("sltaño").appendChild(opt);
                    }
                    if (valorArgumentos != "")
                        $("#sltaño").val(valorArgumentos.split('|')[3]);
                    else
                        document.getElementById("sltaño").selectedIndex = document.getElementById("sltaño").options.length - 1;
                }
                var SemanaPasada = parseInt(JSON[0]["FisemanaLD"]) - 1;
                var MesPasado = mes - 1;
                var cambioValAño = false;
                if (MesPasado == 0 && $("#sltPeriodo").val() == "30" && $("#sltaño").val() == anio) {
                    $("#sltaño").val((parseInt(anio) - 1).toString());
                    cambioValAño = true;
                }
                else cambioValAño = false;
                var cambioValSemanaMes = false;
                if (SemanaPasada == 0 && $("#sltPeriodo").val() == "7" && $("#sltaño").val() == anio) {
                    $("#sltaño").val((parseInt(anio) - 1).toString());
                    cambioValSemanaMes = true;
                }
                else cambioValSemanaMes = false;

                var SemanaFinal = 0;
                var MesFinal = 0;
                if ($("#sltaño").val() == anio) {
                    SemanaFinal = SemanaPasada;
                    MesFinal = MesPasado;
                }
                else {
                    SemanaFinal = 52;
                    MesFinal = 12;
                }
                if (parseInt($("#sltaño").val()) == parseInt(JSON[0]["Año"]) && SemanaPasada == 0) {
                    $("#sltaño").val("2011");
                    SemanaFinal = 52;
                    MesFinal = 12;
                }
                if ($("#sltPeriodo").val() == "7") {
                    var Semana = 0;
                    if ($("#sltaño").val() == "2011") Semana = 9;
                    else Semana = 1;
                    for (Semana; Semana <= SemanaFinal; Semana++) {
                        var opt = document.createElement("option");
                        opt.value = Semana.toString();
                        opt.innerHTML = Semana.toString();
                        document.getElementById("sltSemanaMes").appendChild(opt);
                    }
                    if (valorArgumentos != "")
                        $("#sltSemanaMes").val(valorArgumentos.split('|')[2]);
                    else if (SemanaPasada == 0 && $("#sltPeriodo").val() == "7" && cambioValSemanaMes)
                        $("#sltSemanaMes").val(SemanaFinal.toString());
                    else if ($("#sltaño").val() == anio || (SemanaPasada == 0 && $("#sltaño").val() == (parseInt(anio) - 1).toString()))
                        $("#sltSemanaMes").val(SemanaFinal.toString());
                }
                if ($("#sltPeriodo").val() == "30") {
                    var arrarMeses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
                    var numMes = 0;
                    if ($("#sltaño").val() == "2011") numMes = 3;
                    else numMes = 1;
                    for (numMes; numMes < 13; numMes++) {
                        if (numMes <= MesFinal) {
                            var opt = document.createElement("option");
                            opt.value = numMes.toString();
                            opt.innerHTML = arrarMeses[numMes - 1].toString();
                            document.getElementById("sltSemanaMes").appendChild(opt);
                        }
                    }
                    if (valorArgumentos != "")
                        $("#sltSemanaMes").val(valorArgumentos.split('|')[2]);
                    else if (MesPasado == 0 && $("#sltPeriodo").val() == "30" && cambioValAño)
                        $("#sltSemanaMes").val(MesFinal.toString());
                    else if ($("#sltaño").val() == anio || (MesPasado == 0 && $("#sltaño").val() == (parseInt(anio) - 1).toString()))
                        $("#sltSemanaMes").val(MesFinal.toString());
                }
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
        valorArgumentos = "";
        CargarTablaDatos("", "", "");
        //Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function ddlSemanaMes_SelectedIndexChanged() {
    $("#spanMiles").html("");
    $("#divGridDatos").html("");

}

function btnVerReporte_Click() {
    CargarTablaDatos("", "", "");
}

function CargarTablaDatos(tdOrdenarT, sltComboRCET, sltComboRFFT) {
    $("#MainContent_divGridDatos").html("");
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Tesoreria.Graficas.ReporteRCLTC.btnVerReporte_Click(
    $("#txtFecha").val(), $("#sltPeriodo").val(), $("#sltSemanaMes").val(), $("#sltaño").val(), $("#sltConsumo").val(), tdOrdenarT, sltComboRCET, sltComboRFFT,
        function (response) {
            if (response.value.indexOf("Error") == -1 && response.value != "") {
                $("#MainContent_divGridDatos").html(response.value.split("%%&&")[0]);
                $("#MainContent_spanMiles").html(parseInt(response.value.split("%%&&")[1]) > 0 ? "(Cifras en Miles de Pesos)" : "");
                $("#ctl01_ddlRango1").val(sltComboRCET != "" ? sltComboRCET : $("#ctl01_ddlRango1").val());
                $("#ctl01_ddlRango2").val(sltComboRFFT != "" ? sltComboRFFT : $("#ctl01_ddlRango2").val());
                document.getElementById("respAjax") != null ? document.getElementById("respAjax").style.height = (parseInt(document.documentElement.clientHeight - 200) - parseInt(document.getElementById("divEncabezado").offsetHeight)) + "px" : null;
            } else
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);

            Waiting(false, "Espere por favor. Cargando Información...");
        }
    );
}

function obtenCad(filaN) {
    filaObtenida = filaN;
}

function RangoRCE(obj) {
    CargarTablaDatos("", $(obj).val(), "");
}

function RangoRFF(obj) {
    CargarTablaDatos("", "", $(obj).val());
}

function OrdernarTabla(obj) {
    CargarTablaDatos($(obj).attr("id").split("_")[1], $("#ctl01_ddlRango1").val(), $("#ctl01_ddlRango2").val());
}

function obtenerGriedD() {
    Waiting(true, "Espere por favor. Cargando Información...");
    fila = filaObtenida;
    var GaugeContainer1Manager = new DundasGauge.GaugeManager();
    GaugeContainer1Manager.gaugeContainerId = "GaugeContainer1";

    var GaugeContainer2Manager = new DundasGauge.GaugeManager();
    GaugeContainer2Manager.gaugeContainerId = "GaugeContainer2";

    var gaugeContainer = document.getElementById('ctl00$MainContent$GaugeContainer1');
    var gaugeContainer2 = document.getElementById('ctl00$MainContent$GaugeContainer2');

    Desc = fila.getElementsByTagName('td');
    var Cadena = Desc[0].innerHTML;

    $('#lbNombre').val(Desc[1].innerHTML);

    //Se modifico para que no tome en cuenta las columnas con imagenes
    for (i = 1; i < Desc.length - 9; i++) {
        Cadena += ';' + Desc[i].innerHTML;
    }

    for (i = 11; i < Desc.length - 1; i++) {
        Cadena += ';' + Desc[i].innerHTML;
    }

    $('#lbNombre').attr("disabled", "disabled");

    var LCRCE = Desc[2].innerHTML.replace(/^\s*|\s*$/g, "");
    var LCRFF = Desc[11].innerHTML.replace(/^\s*|\s*$/g, "");

    if (LCRCE != '-') {
        document.getElementById('dvGauge1').style.display = 'block';
        gaugeContainer.doCallback("DisplayName", Cadena);
    } else {
        document.getElementById('dvGauge1').style.display = 'none';
    }

    if (LCRFF != '-') {
        document.getElementById('divGauge2').style.display = 'block';
        gaugeContainer2.doCallback("DisplayName2", Cadena);
    }
    else {
        document.getElementById('divGauge2').style.display = 'none';
    }

    SicreNet.Tesoreria.Graficas.ReporteRCLTC.cargaDetalle
        (
           Cadena,
           function (response) {
               Waiting(false, "Espere por favor. Cargando Información...");
               $('#divDetalleCuenta').html(response.value);
               $("#dvDetalleCliente").dialog("option", "title", "");
               $("#dvDetalleCliente").dialog("option", "width", 680);
               $("#dvDetalleCliente").dialog("option", "height", 550);
               $("#dvDetalleCliente").dialog("open");
           }
        );
}

function ExportarAPdf() {
    Waiting(true, "Espere por favor. Cargando Información...");
    __doPostBack('PdfRCLTC', '');
    setTimeout(terminarWait, 10000);
}

function ExportarAExcel() {
    Waiting(true, "Espere por favor. Cargando Información...");
    __doPostBack('ExcelRCLTC', '');
    setTimeout(terminarWait, 6000);
}