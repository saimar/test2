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

function loadPageTableroReg() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    $(".periodo").datepicker();
    Waiting(true, "Cargando Información...");
    peticionAjax('TableroRegulatorios.aspx/getFechaActual', "POST", null,
            function (data) {
                if (data.d != "")
                    $("#txtFechaCorte").val(data.d);
                GetPeriodicidad();
            }, null);
}

function GetPeriodicidad() {
    Waiting(true, "Cargando Información...");
    peticionAjax('TableroRegulatorios.aspx/GetPeriodicidad', "POST", null,
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    var JSON = obtenerArregloDeJSON(data.d, false);
                    for (var i = 0; i < JSON.length; i++) {
                        var Item = JSON[i];
                        var opcion = new Option(Item.descripcion, Item.idPeriodicidad);
                        document.getElementById('sltPeriodicidad').options[document.getElementById('sltPeriodicidad').options.length] = opcion;
                        document.getElementById('sltPeriodicidad').options[document.getElementById('sltPeriodicidad').options.length - 1].title = Item.descripcion;
                    }
                }
                else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                CargarEstatusSegmentos(undefined, null, true);
            }, null);
}

function CargarEstatusSegmentos(event, obj, esLlamadaRecursiva) {
    if (event != undefined && obj != undefined && !changeFormatoFecha(event, obj)) { MostrarMsj("Fecha Invalida", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null); return };
    //    if (!esLlamadaRecursiva)
    Waiting(true, "Cargando Información...");
    var arrayPaises = new Array("1", "2", "4", "6", "7", "8", "11");
    for (var i = 0; i < arrayPaises.length; i++) {
        for (var ii = 0; ii < 9; ii++)
            $("#td_" + ii + "_" + arrayPaises[i]).attr("class", "EstatusGris");
        $("#hidden_" + arrayPaises[i]).val("0,0,0,0");
    }
    $("#divTitulo").html("TABLERO REGULATORIOS " + $("#sltPeriodicidad :selected").text().toUpperCase());
    peticionAjax('TableroRegulatorios.aspx/GetIndicadores', "POST", { idPeriodicidad: $("#sltPeriodicidad").val(), fechaCorte: $("#txtFechaCorte").val().split('/')[2] + $("#txtFechaCorte").val().split('/')[1] + $("#txtFechaCorte").val().split('/')[0] },
            function (data) {
                if (data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSON(data.d, false);
                        for (var i = 0; i < arrayPaises.length; i++) {
                            var arregloIndicadoresTemp = new Array();
                            var valorPaisAgregado = "";
                            for (var ii = 0; ii < JSON.length; ii++) {
                                if (arrayPaises[i] == JSON[ii].idPais) {
                                    arregloIndicadoresTemp.push(JSON[ii]);
                                    valorPaisAgregado = arrayPaises[i];
                                }
                                if (valorPaisAgregado != "" && valorPaisAgregado != JSON[ii].idPais)
                                    break;
                            }
                            var numRepPeriodo = 0; var numRepEnviados = 0; var numRepEnAtraso = 0; var numRepNoEntragados = 0;
                            if (arregloIndicadoresTemp.length > 0) {
                                numRepPeriodo = arregloIndicadoresTemp.length;
                                var segmento = arregloIndicadoresTemp[0].idSegmento;
                                var idEstatus = parseInt(arregloIndicadoresTemp[0].idEstatus);

                                numRepEnviados = numRepEnviados + (idEstatus == 1 ? 1 : 0);
                                numRepEnAtraso = numRepEnAtraso + (idEstatus == 2 ? 1 : 0);
                                numRepNoEntragados = numRepNoEntragados + (idEstatus == 3 || idEstatus == 4 ? 1 : 0);
                                for (var ii = 1; ii < arregloIndicadoresTemp.length; ii++) {
                                    numRepEnviados = numRepEnviados + (arregloIndicadoresTemp[ii].idEstatus == 1 ? 1 : 0);
                                    numRepEnAtraso = numRepEnAtraso + (arregloIndicadoresTemp[ii].idEstatus == 2 ? 1 : 0);
                                    numRepNoEntragados = numRepNoEntragados + (arregloIndicadoresTemp[ii].idEstatus == 3 || arregloIndicadoresTemp[ii].idEstatus == 4 ? 1 : 0);

                                    if (segmento == arregloIndicadoresTemp[ii].idSegmento)
                                        idEstatus = parseInt(arregloIndicadoresTemp[ii].idEstatus) > idEstatus ? parseInt(arregloIndicadoresTemp[ii].idEstatus) : idEstatus;

                                    else {
                                        $("#td_" + segmento + "_" + arrayPaises[i]).attr("class", DeterminaEstatusDeReporteXId(idEstatus + ""));
                                        segmento = arregloIndicadoresTemp[ii].idSegmento;
                                        idEstatus = parseInt(arregloIndicadoresTemp[ii].idEstatus);
                                    }
                                    if (ii == arregloIndicadoresTemp.length - 1)
                                        $("#td_" + segmento + "_" + arrayPaises[i]).attr("class", DeterminaEstatusDeReporteXId(idEstatus + ""));
                                }
                                if (0 == arregloIndicadoresTemp.length - 1)
                                    $("#td_" + segmento + "_" + arrayPaises[i]).attr("class", DeterminaEstatusDeReporteXId(idEstatus + ""));
                            }

                            $("#hidden_" + arrayPaises[i]).val(numRepPeriodo + "," + numRepEnviados + "," + numRepEnAtraso + "," + numRepNoEntragados);
                        }
                    }
                }
                else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                if (document.getElementById("divResumenYSegmentoEnvio").style.display != "none")
                    muestraResumenYSegmentoEnvio_Click(idPais2daVtn, definicionPais2daVtn, posicion2daVtn);
                if (esLlamadaRecursiva) {
                    setTimeout(mostrarPresentacionXPeriodicidad, 5000);
                    if (indexArreglo > -1) {
                        muestraResumenYSegmentoEnvio_Click(arregloParametrosPaises[indexArreglo].split(',')[0], arregloParametrosPaises[indexArreglo].split(',')[1], arregloParametrosPaises[indexArreglo].split(',')[2]);
                    }
                }
                Waiting(false, "Cargando Información...");
                //setTimeout(terminarWait, 600);
            }, null);
}

var idPais2daVtn, definicionPais2daVtn, posicion2daVtn;
function muestraResumenYSegmentoEnvio_Click(idPais, definicionPais, posicion) {
    idPais2daVtn = idPais; definicionPais2daVtn = definicionPais; posicion2daVtn = posicion;
    var cad = '<table class="dataGridDatos" style="width: 100%;"><thead>';
    for (var i = 0; i < $('#tblHome tr').length; i++) {
        if (i == 0) {
            cad += ' <tr><th style="text-align: center; width: 11%;font-size:11px;color:Black">'
            + $('#tblHome tr')[i].cells[0].textContent + ' </th>';
            cad += ' <th title="' + definicionPais + '">' + $('#tblHome tr')[i].cells[posicion].innerHTML + ' </th> </tr></thead>';
        }
        else {
            cad += ' <tr style="height: 35px;"><td lang="aa" title="Ver Contenido Reportes Regulatorios y Estatus" style="font-weight: bold;text-shadow: 2px 1px 1px Gray;color: Black;cursor:pointer;text-align:left;font-size:11px;;background: rgba(0, 134, 120, 0.94)" ' +
                    'onclick="VercontendioReportesRegYEstatus(\'' + idPais + '\',\'' + $('#tblHome tr')[i].cells[0].id.split('_')[1] + '\',\'' + $('#tblHome tr')[i].cells[0].textContent.replace(new RegExp('\n', 'g'), '') + '\',this)">'
                     + '<img id="Img_' + $('#tblHome tr')[i].cells[0].id.split('_')[1] + '" src="../../Images/PanelDeControl/Expander/fDerechaG.png" style="vertical-align:middle;width:15px;height:15px;">'
                    + $('#tblHome tr')[i].cells[0].textContent + '</td>';
            cad += ' <td class="' + $('#tblHome tr')[i].cells[posicion].className + '"> </td></tr>'
            + '<tr ><td colspan="2" id="tdExpCollap_' + $('#tblHome tr')[i].cells[0].id.split('_')[1] + '" style="display:none"></td></tr>';
        }
    }
    cad += '</table>';
    $("#divTblDatosPaisSelect").html(cad);
    $("#divHome").slideUp('slide');
    $("#divResumenYSegmentoEnvio").slideDown('slide');

    //    $("#tdDato1").html(Math.floor((Math.random() * 200) + 1));
    //    $("#tdDato2").html(Math.floor((Math.random() * 200) + 1));
    //    $("#tdDato3").html(Math.floor((Math.random() * 50) + 1));
    //    $("#tdDato4").html(Math.floor((Math.random() * 10) + 1));
    $("#tdDato1").html($("#hidden_" + idPais).val().split(',')[0]);
    $("#tdDato2").html($("#hidden_" + idPais).val().split(',')[1]);
    $("#tdDato3").html($("#hidden_" + idPais).val().split(',')[2]);
    $("#tdDato4").html($("#hidden_" + idPais).val().split(',')[3]);
    var colors = Highcharts.getOptions().colors;
    crearGrafica(['Reportes del Periodo', 'Reportes Enviados', 'Reportes en Atraso', 'Reportes no Entregados'],
             [{ y: parseFloat($("#tdDato1").html()), color: colors[1] }, { y: parseFloat($("#tdDato2").html()), color: colors[2] },
             { y: parseFloat($("#tdDato3").html()), color: colors[3] }, { y: parseFloat($("#tdDato4").html()), color: colors[4]}])
}

function VercontendioReportesRegYEstatus(idPais, idSegmento, definicionSegmento, obj) {
    //$("#divResumenYSegmentoEnvio").slideUp('slide');
    //$("#divVerContenidoReportesRegYEstatus").slideDown('slide');

    if ($(obj).attr("lang") == "aa") {
        $("#tdExpCollap_" + idSegmento).show();
        document.getElementById("Img_" + idSegmento).setAttribute("src", "../../Images/PanelDeControl/Expander/fAbajoG.png");
        Waiting(true, "Cargando Información...");
        peticionAjax('TableroRegulatorios.aspx/GetReportesXSegmento', "POST", { idSegmento: idSegmento, idPeriodicidad: $("#sltPeriodicidad").val(), idPais: idPais, fechaCorte: $("#txtFechaCorte").val().split('/')[2] + "" + $("#txtFechaCorte").val().split('/')[1] + "" + $("#txtFechaCorte").val().split('/')[0] },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    var JSON = obtenerArregloDeJSON(data.d, false);
                    $("#tdExpCollap_" + idSegmento).html(generarTablaVerReportesRegEstatus(JSON, definicionSegmento, idPais, idSegmento));
                }
                else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                $(obj).attr("lang", "ab")
                setTimeout(terminarWait, 600);
            }, null);
    }
    else {
        $("#tdExpCollap_" + idSegmento).hide();
        document.getElementById("Img_" + idSegmento).setAttribute("src", "../../Images/PanelDeControl/Expander/fDerechaG.png");
        $(obj).attr("lang", "aa")
    }
}


function generarTablaVerReportesRegEstatus(listaDeJSON, defSegmento, idPais, idSegmento) {
    var cad = '<div  style="width:auto;"><table id="tblDatosRepReg"  style="width: 100%;" class="dataGridDatos">';
    //cad += '<thead><tr style="text-align:left;"><th style="text-align: center;" colspan="4">' + defSegmento + '</th></tr>';
    if (listaDeJSON[0] == null) {
        cad += '<tr><td style="text-align:center;">Sin Reportes</td></tr></table>';
        return cad;
    }
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    for (var encabezados in auxJSON) {
        if (encabezados != "FIIdReporte") {
            var width = 0;
            width = encabezados == "Serie" ? 15 : width;
            width = encabezados == "Reporte" ? 80 : width;
            width = encabezados == "Estatus" ? 5 : width;
            cad += '<th style="text-align: center;width:' + width + '%' + '">';
            cad += (encabezados == "FVCComentario" ? "Comentario" : encabezados.toString());
            cad += '</th>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += ((filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + ' onclick="mostrarFichaTecnica(\'' + idPais + '\',\'' + idSegmento + '\',\'' + listaDeJSON[filas].FIIdReporte + '\');"  title="Clic para Ver Ficha Técnica" style="cursor:pointer;" >';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element == 'Estatus') {
                cad += '<td style="text-align: center;"> <span class="' + DeterminaEstatusDeReporteXId(json[element]) + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>';
            }
            else if (element != 'FIIdReporte') {
                cad += '<td style="text-align:left;white-space: normal;">';
                cad += json[element];
            }
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div>';
    return cad;
}

function DeterminaEstatusDeReporteXId(idItem) {
    var classColor = "";
    switch (idItem) {
        case "1": classColor = "EstatusVerde"; break;
        case "2": classColor = "EstatusAmarillo"; break;
        case "3": classColor = "EstatusRojo"; break;
        case "4": classColor = "EstatusNegro"; break;
    }
    return classColor;
}

function crearGrafica(categories, dataS) {
    var colors = Highcharts.getOptions().colors,
           categories = categories,
           data = dataS;

    function setChart(name, categories, data, color) {
        chart.xAxis[0].setCategories(categories, false);
        chart.series[0].remove(false);
        chart.addSeries({
            name: name,
            data: data
        }, false);
        chart.redraw();
    }
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'column',
            width: 500,
            height: 220
        },
        credits: { enabled: false },
        title: { text: '' },
        subtitle: { text: '' },
        legend: { enabled: false },
        xAxis: { categories: categories },
        yAxis: { title: { text: ''} },
        tooltip: {
            formatter: function () {
                return '' +
                        this.x + ': ' + this.y;
            }
        },
        series: [{ name: name, data: data, colorByPoint: true}],
        exporting: { enabled: false }
    });
}

function btnRegresar_Click() {
    $("#divResumenYSegmentoEnvio").slideUp('slide');
    $("#divResumenYSegmentoEnvio").hide();
    $("#divHome").slideDown('slide');
}

function btnRegresarVerRepRegStatus_Click() {
    $("#divVerContenidoReportesRegYEstatus").slideUp('slide');
    $("#divResumenYSegmentoEnvio").slideDown('slide');
}

function mostrarFichaTecnica(idPais, idSegmento, idReporte) {
    Waiting(true, "Cargando Información...");
    peticionAjax('TableroRegulatorios.aspx/GetFichaTecnica', "POST", { idPais: idPais, idReporte: idReporte, idSegmento: idSegmento, idPeriodicidad: $("#sltPeriodicidad").val() },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    var JSON = obtenerArregloDeJSON((data.d).split('&&&')[0], false);
                    //alert(document.getElementById("shadows").style.height);
                    var valorHeight = parseInt(document.getElementById("shadows").style.height.substring(0, 3)) > 720 ? 730 : 590;
                    AgregarVtnFlotante("divVerFichaTecnica", "", "FICHA TÉCNICA", "", generaTablaVerFichaTecnica(JSON), valorHeight, 800, false, false, "", "", null);
                }
                else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Cargando Información...");
            }, null);
}

function generaTablaVerFichaTecnica(listaJSON, listaJSON2) {
    var cad = '';
    cad += '<div style="overflow:auto;width:100%;height:95%;"><center><table id="tblContenidoFichaTecnica"  class="dataGridDatos" style="font-size:9px;height:99%;width:98%">';
    cad += '<thead>';
    cad += '<tr style="font-size:9px;">'

    var auxJSON = listaJSON[0];
    for (var e = 0; e < 2; e++) {
        var i = 0;
        for (var encabezados in auxJSON) {
            cad += '<th style="width:' + (i == 0 ? '15%' : '35%') + '">' + encabezados.toString() + '</th>';
            i++;
        }
    }

    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody style="font-size: 9px;">';

    var contador = 0;
    var numMitadFilas = Math.round(listaJSON.length / 2);
    for (var filas = 0; filas < numMitadFilas; filas++) {
        cad += (contador % 2 == 0) ? '<tr class="row" style="font-size: 9px;" >' : '<tr class="alternateRow" style="font-size: 9px;">';
        var json = listaJSON[filas];
        for (var element in json) {
            if (element == 'CONCEPTO') {
                cad += '<td style="text-align:left;width:15%;  height: 25x;font-size: 9px;font-weight: bold;background: rgba(0, 128, 0, 0.15);white-space: pre-wrap;">';
            } else {
                cad += '<td style="text-align:left;width:35%;  height: 25px;font-size: 9px;white-space: pre-wrap;">';
            }
            cad += json[element];
            cad += '</td>';
        }
        //filas++;
        json = listaJSON[numMitadFilas + filas];
        for (var element in json) {
            if (element == 'CONCEPTO') {
                cad += '<td style="text-align:left;width:15%;  height: 25x;font-size: 9px;font-weight: bold;background: rgba(0, 128, 0, 0.15);white-space: pre-wrap;">';
            } else {
                cad += '<td style="text-align:left;width:35%;  height: 25px;font-size: 9px;white-space: pre-wrap;">';
            }
            cad += json[element];
            cad += '</td>';
        }
        cad += '</tr>';
        contador++;
    }
    cad += '</tbody>';
    cad += '</table></center></div>'
    return cad;
}

var arregloParametrosPaises = new Array();
arregloParametrosPaises.push("1,México,1");
arregloParametrosPaises.push("2,Guatemala,2");
arregloParametrosPaises.push("4,Honduras,3");
arregloParametrosPaises.push("6,Perú,4");
arregloParametrosPaises.push("7,Panamá,5");
arregloParametrosPaises.push("8,El Salvador,6");
arregloParametrosPaises.push("11,Brasil,7");

var indexPeriodicidadSelect = 0; var indexArreglo = -1;
function mostrarPresentacionXPeriodicidad() {
    indexPeriodicidadSelect += 1;
    $("#sltPeriodicidad").prop("selectedIndex", indexPeriodicidadSelect);
    if (indexPeriodicidadSelect <= document.getElementById("sltPeriodicidad").options.length - 1)
        CargarEstatusSegmentos(undefined, null, true);
    else {
        indexPeriodicidadSelect = 0;
        $("#sltPeriodicidad").prop("selectedIndex", indexPeriodicidadSelect);

        indexArreglo += 1;
        CargarEstatusSegmentos(undefined, null, true);
        if (indexArreglo == arregloParametrosPaises.length) {
            indexArreglo = -1;
            btnRegresar_Click();
        }
    }
}