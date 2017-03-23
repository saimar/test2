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

window.onunload = function () {
    Tools.eraseCookie("esCargaGrafica");
}

$(document).ready(function () {
    $(".calendario").datepicker();
});

function funcionLoadMasterPage() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("GraficasRCLCT.aspx/GetValorArgumentos", "POST", { opcion: 1 }, function (data) {
        if (data.d == "") {
            Tools.eraseCookie("esCargaGrafica");
            $("#MainContent_divGrafica").html("");
            $("#MainContent_divGrafica2").html("");
            $("#MainContent_divGridDatos").html("");
            $("#MainContent_spanTitulo").html("");
            $("#MainContent_spanMiles").html("");
        }
        else {
            document.getElementById($($("#MainContent_divGrafica").children(0)).attr("id")).style.width = "90%";
            document.getElementById($($("#MainContent_divGrafica2").children(0)).attr("id")).style.width = "90%";
        }
        sltPeriodo_SelectionChange();
        WidtDatePicker();
    });
}

var valorArgumentos = "";
function sltPeriodo_SelectionChange() {
    var agregarItemsComboAño = false;
    document.getElementById("sltaño").options.length = 0;
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("GraficasRCLCT.aspx/GetValorArgumentos", "POST", { opcion: 2 }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            valorArgumentos = data.d;
            if (valorArgumentos != "")
                $("#sltPeriodo").val(valorArgumentos.split('|')[1])

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
    peticionAjax("GraficasRCLCT.aspx/DatosFecha", "POST", null, function (data) {
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
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        //Waiting(false, "Espere por favor. Cargando Información...");
        valorArgumentos = "";
        mostrarTablaGrafica();
    });
}

function ddlSemanaMes_SelectedIndexChanged() {
    $("#MainContent_spanMiles").html("");
    $("#MainContent_spanTitulo").html("");
    $("#divGridDatos").html("");
}

function btnGraficar_Click() {
    Waiting(true, "Espere por favor. Cargando Información...");
    $("#MainContent_divGrafica").html("");
    $("#MainContent_divGrafica2").html("");
    $("#MainContent_divGridDatos").html("");
    $("#MainContent_spanTitulo").html("");
    $("#MainContent_spanMiles").html("");
    Tools.createCookie("esCargaGrafica", "true", 0);
    mostrarTablaGrafica();
    //   __doPostBack('cargarGrafica', $("#txtFecha").val() + "|" + $("#sltPeriodo").val() + "|" + $("#sltSemanaMes").val() + "|" + $("#sltaño").val());
}

function mostrarTablaGrafica() {
    Waiting(true, "Espere por favor. Cargando Información...");
    $("#container").html("");
    $("#container2").html("");
    var parametros = {
        fecha: $("#txtFecha").val() == "" ? valorFecha : $("#txtFecha").val(),
        sltPeriodo: $("#sltPeriodo").val(),
        sltSemanaMes: $("#sltSemanaMes").val(),
        sltAño: $("#sltaño").val()
    };
    peticionAjax('GraficasRCLCT.aspx/getTablaHTML', "POST", parametros, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                $("#MainContent_divGridDatos").html(data.d.split('%%&&')[0]);
                $("#MainContent_spanMiles").html(parseInt(data.d.split('%%&&')[1]) > 0 ? "(Cifras en Miles de Pesos)" : "");
            }
        }
        else {
            MostrarMsj("Error " + data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
        mostrarGrafica();
    }, null);
}


function mostrarGrafica() {
    peticionAjax('GraficasRCLCT.aspx/getDatosYSaveGrafica', "POST", null, function (data) {
        if (data.d != "") {
            var graficaJSON = data.d;
            var JSONRCE = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
            llenaArregloDeGrafica(JSONRCE, 'container');
            var JSONRFF = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
            llenaArregloDeGrafica(JSONRFF, 'container2');
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}
function llenaArregloDeGrafica(JSON, contenedor) {
    var arrayEncabezados = new Array();
    for (var encabezados in JSON[0]) {
        if (encabezados != "Fecha")
            arrayEncabezados.push(encabezados);
    }

    var arrayCategorias = new Array();
    for (var i = 0; i < JSON.length; i++) {
        arrayCategorias.push(JSON[i].Fecha);
    }

    var arrayEncabezadosValor = new Array();
    for (var ii = 0; ii < arrayEncabezados.length; ii++) {
        var arrayEncabezadosValorT = new Array();
        arrayEncabezadosValorT.name = replaceAll(arrayEncabezados[ii], "&#44", ",");
        var arregloValores = new Array();
        for (var i = 0; i < JSON.length; i++)
            arregloValores.push(parseInt(JSON[i][arrayEncabezados[ii]]));
        arrayEncabezadosValorT.data = arregloValores;
        arrayEncabezadosValor.push(arrayEncabezadosValorT);
    }
    crearGrafica(arrayCategorias, arrayEncabezadosValor, contenedor);
}

function crearGrafica(categorias, series, contenedor) {
    //  var chart = null;
    var options = {
        chart: {
            renderTo: contenedor,
            type: 'column',
            width: 550,
             options3d: {
                enabled: true,
                alpha: 6,
                beta: 7,
                depth: 200,
                viewDistance: 50
            },
        },
        credits: { enabled: false },
        title: {
            text: (contenedor=="container"?'RCE':'RFF')
        },
        xAxis: {
            categories: categorias,
            align: 'right'
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: series,

        navigation: {
            buttonOptions: {
                align: 'center'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        }

    };
    chart = new Highcharts.Chart(options);
}


function ExportarAPdf() {
    Waiting(true, "Espere por favor. Cargando Información...");
    __doPostBack('PdfRCLCT', '');
    setTimeout(terminarWait, 6000);
}

function ExportarAExcel() {
    Waiting(true, "Espere por favor. Cargando Información...");
    __doPostBack('ExcelRCLCT', '');
    setTimeout(terminarWait, 6000);
}