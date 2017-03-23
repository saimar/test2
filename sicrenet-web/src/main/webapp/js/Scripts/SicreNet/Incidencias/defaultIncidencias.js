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

function CargarInicial() {
    $(".calendario").datepicker();
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    sltTipoGrafica_OnChange($("#sltTipoGrafica"));
    GetPeriodicidad();
}

function GetPeriodicidad() {
    Waiting(true, "Cargando Información...");
    peticionAjax('Default.aspx/GetSistemas', "POST", null,
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    var JSON = obtenerArregloDeJSON(data.d, false);
                    var cad = '';
                    for (var i = 0; i < JSON.length; i++) {
                        if (i == 0)
                            cad += ' <input type="checkbox" value="Todos" id="chk-Todos" onchange="chkSistemas_OnChecked(this);"/>TODOS<br/>';
                        cad += '&nbsp&nbsp<input type="checkbox" value="' + JSON[i].FIIdSistema + '" id="chk-' + JSON[i].FVCDescripcion + '"  onchange="chkSistemas_OnChecked(this);"/>' + JSON[i].FVCDescripcion + '<br/>';
                    }
                    $("#divSistemas").html(cad);
                }
                else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Cargando Información...");
            }, null);
}

function chkSistemas_OnChecked(obj) { // here
    if ($(obj).attr("id").indexOf('Todos') != -1) {
        $("#divSistemas").find("input:checkbox").attr('checked', $(obj).is(":checked"));
    } else {
        var numChecked = 0;
        for (var i = 0; i < $("#divSistemas").find("input:checkbox").length; i++) {
            if ($($("#divSistemas").find("input:checkbox")[i]).attr("id").indexOf('Todos') == -1) {
                if ($($("#divSistemas").find("input:checkbox")[i]).is(":checked"))
                    numChecked++;
            }
        }
        $("#chk-Todos").attr('checked', numChecked == $("#divSistemas").find("input:checkbox").length - 1 ? true : false);
    }
}


function sltTipoGrafica_OnChange(obj) {
    $("#divTiposIncidencias").html("");
    $("#divGrafica").html("");
    if ($(obj).val() == "1") {
        $("#trSistema").show();
        $("#trFinPeriodo").hide();
        $("#spanInicioPeriodo").html("Seleccione una fecha:");
    }
    else {
        $("#trSistema").hide();
        $("#trFinPeriodo").show();
        $("#spanInicioPeriodo").html("Inicio del Periodo:");
    }
}

function btnGraficarIncidencias_Click() {
    $("#divTiposIncidencias").html("");
    $("#divGrafica").html("");
    var idsSistemasSelect = '';
    var descSistemasSelect = '';
    var descSistemasTotal = '';
    var ejecutarPeticion = false;
    $("#divSistemas").find("input:checkbox").css("outline", "1px solid transparent");
    $("#txtInicioPeriodo").css("border", "1px solid gray");
    $("#txtFinPeriodo").css("border", "1px solid gray");

    if ($("#sltTipoGrafica").val() == "1") {
        for (var i = 0; i < $("#divSistemas").find("input:checkbox").length; i++) {
            if ($($("#divSistemas").find("input:checkbox")[i]).attr("id").indexOf('Todos') == -1) {
                if ($($("#divSistemas").find("input:checkbox")[i]).is(":checked")) {
                    idsSistemasSelect += $($("#divSistemas").find("input:checkbox")[i]).val() + ',';
                    descSistemasSelect += $($("#divSistemas").find("input:checkbox")[i]).attr("id").split('-')[1] + ',';
                }
                descSistemasTotal += $($("#divSistemas").find("input:checkbox")[i]).attr("id").split('-')[1] + ',';
            }
        }
        if (idsSistemasSelect != "" && $("#txtInicioPeriodo").val() != "") {
            idsSistemasSelect = idsSistemasSelect.substring(0, idsSistemasSelect.length - 1);
            descSistemasSelect = descSistemasSelect.substring(0, descSistemasSelect.length - 1);
            descSistemasTotal = descSistemasTotal.substring(0, descSistemasTotal.length - 1);
            ejecutarPeticion = true;
        }
        else {

            if (idsSistemasSelect == "" && $("#txtInicioPeriodo").val() == "") {
                $("#divSistemas").find("input:checkbox").css("outline", "1px solid red");
                $("#txtInicioPeriodo").css("border", "1px solid red");
                MostrarMsj("Debe Seleccionar al menos un <span style='font-weight:bold'>Sistema </span> y una <span style='font-weight:bold'>Fecha</span> para Graficar sus Incidencias", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }
            else if (idsSistemasSelect == "") {
                $("#divSistemas").find("input:checkbox").css("outline", "1px solid red");
                MostrarMsj("Debe Seleccionar al menos un <span style='font-weight:bold'>Sistema </span> para Graficar sus Incidencias", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }
            else {
                $("#txtInicioPeriodo").css("border", "1px solid red");
                MostrarMsj("Debe Seleccionar una <span style='font-weight:bold'>Fecha</span> para Graficar sus Incidencias", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }
        }
    }
    else {
        if ($("#txtInicioPeriodo").val() != "" && $("#txtFinPeriodo").val() != "")
            ejecutarPeticion = true;
        else {
            if ($("#txtInicioPeriodo").val() == "" && $("#txtFinPeriodo").val() == "") {
                $("#txtInicioPeriodo").css("border", "1px solid red");
                $("#txtFinPeriodo").css("border", "1px solid red");
                MostrarMsj("Debe Seleccionar una <span style='font-weight:bold'>Fecha Inicial</span> y una <span style='font-weight:bold'>Fecha Final</span> para Graficar sus Incidencias", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }
            else if ($("#txtInicioPeriodo").val() == "") {
                $("#txtInicioPeriodo").css("border", "1px solid red");
                MostrarMsj("Debe Seleccionar una <span style='font-weight:bold'>Fecha Inicial</span> para Graficar sus Incidencias", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }
            else if ($("#txtFinPeriodo").val() == "") {
                $("#txtFinPeriodo").css("border", "1px solid red");
                MostrarMsj("Debe Seleccionar una <span style='font-weight:bold'>Fecha Final</span> para Graficar sus Incidencias", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }
        }
    }

    if (ejecutarPeticion) {
        peticionAjax('Default.aspx/GetDatosTablaYGrafica', "POST",
        { idsSistemasSelect: idsSistemasSelect, descSistemasSelect: descSistemasTotal, fechaInicioPeriodo: $("#txtInicioPeriodo").val(),
            fechaFinPeriodo: $("#txtFinPeriodo").val(), valSltTipoGrafica: $("#sltTipoGrafica").val()
        },
            function (data) {
                if (data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSONGrafica = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        var JSONTabla = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                        if (JSONGrafica[0] != null) {
                            var categorias = new Array();
                            var series = new Array();

                            if ($("#sltTipoGrafica").val() == "1") {
                                for (var i = 0; i < JSONGrafica.length; i++)
                                    categorias.push(JSONGrafica[i].Descripción);

                                for (var i = 0; i < descSistemasSelect.split(',').length; i++) {
                                    var arraySeriesTemp = new Array();
                                    var valorNumericSeries = new Array();
                                    var valorSaldoSeries = new Array();
                                    for (var ii = 0; ii < JSONGrafica.length; ii++) {
                                        valorNumericSeries.push(parseInt(JSONGrafica[ii][descSistemasSelect.split(',')[i] + "Pedidos"]));
                                        valorSaldoSeries.push(parseFloat(JSONGrafica[ii][descSistemasSelect.split(',')[i] + "Saldo"]));
                                    }
                                    arraySeriesTemp["name"] = descSistemasSelect.split(',')[i];
                                    arraySeriesTemp["data"] = valorNumericSeries;
                                    arraySeriesTemp["stack"] = valorSaldoSeries;
                                    series.push(arraySeriesTemp);
                                }
                            }
                            else {
                                var arraySeriesTemp = new Array();
                                var valorNumericSeries = new Array();
                                var valorSaldoSeries = new Array();
                                for (var i = 0; i < JSONGrafica.length; i++) {
                                    var arraySeriesTemp = new Array();
                                    categorias.push(JSONGrafica[i].fecha.split(' ')[0]);

                                    valorNumericSeries.push(parseInt(JSONGrafica[i].pedidos));
                                    valorSaldoSeries.push(JSONGrafica[i].saldo);
                                }
                                arraySeriesTemp["name"] = "Pedidos";
                                arraySeriesTemp["data"] = valorNumericSeries;
                                arraySeriesTemp["stack"] = valorSaldoSeries;
                                series.push(arraySeriesTemp);
                            }
                            crearGraficaPaso1(categorias, series);

                        }
                        if (JSONTabla[0] != null) {
                            $("#divTiposIncidencias").html(generarTablaDeRegistrosSinFoot1(JSONTabla, "left", "TblIncidenciasDefault"));
                         //   $("#divPrueba").html(generarTablaDeRegistrosSinFoot1(JSONGrafica, "left", "TblPrueba"));
                        }
                    }
                    else MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
                else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }, null);
    }
}

function createTablaIncidencias(JSON1, JSON2, descSistemasSelect) { // Pendiente
    var cad = '<div class="divContenidoTabla" style="width:auto;"><table id="TblIncidenciasDefault" style="width: 100%;" class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    for (var encabezados in JSON1[0]) {
        cad += '<th style="text-align: center;">';
        cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '<th style="text-align: center;">Pedidos</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < JSON1.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td style="text-align:left:">';
            cad += json[element];
            cad += '</td>';
        }
        var noPedidos = 0;
        var cadenaHijos = '';
        for (var i = 0; i < descSistemasSelect.split(',').length; i++) {
            cadenaHijos += '<tr style="display:none;">';
            noPedidos += parseInt(JSON2[filas][descSistemasSelect.split(',')[i] + "Pedidos"]);
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div>';

    cad += '';
    return cad;
}

function crearGraficaPaso1(categorias, series) {
    $('#divGrafica').highcharts({
        chart: {
            type: 'column',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 10,
                beta: 25,
                depth: 70
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: categorias
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Número de Pedidos'
            }
        },
        tooltip: {
            formatter: function () {
                var s = '<b>' + this.x + '</b><br/><span style="color:' + this.series.color + '">\u25CF</span>' + this.series.name
                s += '<br/>Pedidos: ' + DevuelveCantidadSeparadaPorComas(this.y, false);
                s += '<br/>Saldo: ' + DevuelveCantidadSeparadaPorComas(replaceAll(this.series.stackKey.split(',')[this.point.x], "column", ""), false);
                return s;
            }
        },
        credits: { enabled: false },
        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40
            }
        },
        series: series
    });
}