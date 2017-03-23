$(document).ready(function () {
    var tabNames = ["PMC1Cartera", "PMC2Estatus", "PMC3MonedaFactorSistema", "PMC4SubProducto", "PMC5Fitir", "PMC6Facturacion"
    , "PMC7Metodologia", "PMC8Calificacion", "PMC9Negocio", "PMC10GeoComercial", "PMC11GeoPolitica"];

    $(".tab-menu > li").click(function (e) {
        for (var i = 0; i < tabNames.length; i++) {
            if (e.target.id == tabNames[i]) {
                activeTabIndex = i;

            } else {
                $("#" + tabNames[i]).removeClass("active");
                $("#" + tabNames[i] + "-tab").css("display", "none");
            }
        }
        $("#" + tabNames[activeTabIndex] + "-tab").fadeIn();
        $("#" + tabNames[activeTabIndex]).addClass("active");
        if (e.target.id == "PMC1Cartera")
            reSizeDivsApartados();
        if (e.target.id == "PMC2Estatus" && $('#divApartado1_2').html() == "")
            cargarPMC1Cartera(2, new Array("Riesgo", "Estatus Cartera", "Cartera", "", ""), new Array("Riesgo", "Estatus Cartera", "Cartera", "Clasificación", ""), false);
        if (e.target.id == "PMC3MonedaFactorSistema" && $('#divApartado1_3').html() == "")
            cargarPMC1Cartera(3, new Array("Moneda", "Factor", "", "", ""), new Array("Moneda", "Factor", "Sistema", "", ""), true);
        else if (e.target.id == "PMC4SubProducto" && $('#divApartado1_4').html() == "")
            cargarPMC1Cartera(4, new Array("Riesgo", "Cartera", "Clasificación", "Rubro", ""), new Array("Riesgo", "Cartera", "Clasificación", "Rubro", "Descripción Subproducto"), false);
        else if (e.target.id == "PMC5Fitir" && $('#divApartado1_5').html() == "")
            cargarPMC1Cartera(5, new Array("Riesgo", "Cartera", "Clasificación", "Rubro", ""), new Array("Riesgo", "Cartera", "Clasificación", "Rubro", "Descripción Fitir"), false);
        else if (e.target.id == "PMC6Facturacion" && $('#divApartado1_6').html() == "")
            cargarPMC1Cartera(6, new Array("Riesgo", "Cartera", "Clasificación", "", ""), new Array("Riesgo", "Cartera", "Clasificación", "Periodicidad", ""), false);
        else if (e.target.id == "PMC7Metodologia" && $('#divApartado1_7').html() == "")
            cargarPMC1Cartera(7, new Array("METODOLOGíA", "", "", "", ""), new Array("METODOLOGíA", "FUENTE DE CARTERA", "", "", ""), true);
        else if (e.target.id == "PMC8Calificacion" && $('#divApartado1_8').html() == "")
            cargarPMC1Cartera(8, new Array("Riesgo", "Cartera", "Clasificación", "", ""), new Array("Riesgo", "Cartera", "Clasificación", "Calificación", ""), false);
        else if (e.target.id == "PMC9Negocio" && $('#divApartado1_9').html() == "")
            cargarPMC1Cartera(9, new Array("Cartera", "Negocio", "", "", ""), new Array("Cartera", "Negocio", "Clasificación", "", ""), false);
        else if (e.target.id == "PMC10GeoComercial" && $('#divApartado1_10').html() == "")
            cargarPMC1Cartera(10, new Array("Cartera", "País", "División", "", ""), new Array("Cartera", "País", "División", "Región", ""), false);
        else if (e.target.id == "PMC11GeoPolitica" && $('#divApartado1_11').html() == "")
            cargarPMC1Cartera(11, new Array("Cartera", "País", "", "", ""), new Array("Cartera", "País", "Estado", "", ""), false);
        return false;
    });
});

function btnDetallesaldos_ReportesPMC() {
    WaitingVtn("divBloqVtnReportesPMC", true, true, "Cargando Información...");
    peticionAjax('PanelDeControl.aspx/GetFechaPeriodoAnteriorReportesPMC', "POST", { fechaPeriodo: /* '31/01/2014'*/fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], PeriocidadSet: periocidadSelectXUser },
    function (data) {
        fechaCorteAnterior = data.d.split(",")[2] + "," + data.d.split(",")[1] + "," + data.d.split(",")[0];
        var nombreMes = new Array("ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE");
        for (var i = 0; i < $('ul#ultabs li').length; i++) {
            $("#divApartado1_" + (i + 1)).html("");
            $("#divApartado2_" + (i + 1)).html("");
            $("#divApartado3_" + (i + 1)).html("");
            $("#divEncApartado1_" + (i + 1)).html("");
            $("#divEncApartado2_" + (i + 1)).html("");
            $("#divEncApartado3_" + (i + 1)).html("");
            $("#spTitleApartado1_" + (i + 1)).html(nombreMes[parseInt(fechaP.split(',')[1]) - 1] + " " + fechaP.split(',')[0]);
            $("#spTitleApartado2_" + (i + 1)).html(nombreMes[parseInt(fechaCorteAnterior.split(',')[1]) - 1] + " " + fechaCorteAnterior.split(',')[0]);
            $("#spTitleApartado3_" + (i + 1)).html("VARIACIÓN");
        }
        for (var i = 0; i < $('ul#ultabs li').length; i++) {
            if (i == 0) $($('ul#ultabs li')[i]).attr("class", "active");
            else $($('ul#ultabs li')[i]).removeAttr("class");
        }
        for (var i = 3; i < $("#tab-container").children().length; i++) {
            if (i == 3) {
                $($("#tab-container").children()[i]).attr("class", "tab-content active");
                $("#tab-container").children()[i].style.display = "block";
            }
            else {
                $($("#tab-container").children()[i]).attr("class", "tab-content");
                $("#tab-container").children()[i].style.display = "none";
            }
        }

        AgregarVtnFlotanteConHTML("divReportesPMC", "PMC", "DETALLE SALDOS", "", "", document.getElementById("shadows").offsetHeight - 100, $("#divPanelMain").width() - 50, false, false, "", "", null);
        document.getElementById("tab-container").style.width = "97%";
        document.getElementById("tab-container").style.height = "97%";
        reSizeDivsApartados();
        $("#divReportesPMC").on("dialogresize", function (event, ui) {
            document.getElementById("tab-container").style.width = "97%";
            document.getElementById("tab-container").style.height = "97%";
            reSizeDivsApartados();
        });
        cargarPMC1Cartera(1, new Array("Riesgo", "Cartera", "", "", ""), new Array("Riesgo", "Cartera", "Clasificacion", "", ""), true);
        //cargarPMC1Cartera(4, new Array("Riesgo", "Cartera", "Clasificación", "Rubro", ""), new Array("Riesgo", "Cartera", "Clasificación", "Rubro", "Descripción Subproducto"), false);
        //cargarPMC1Cartera(8, new Array("Riesgo", "Cartera", "Clasificación", "", ""), new Array("Riesgo", "Cartera", "Clasificación", "Calificación", ""), false);
    }, null);
}

var prevLeft = 0;
function scrollear(obj) {
    document.getElementById('divApartado1_' + $(obj).attr("id").split('_')[1]).scrollTop = obj.scrollTop;
    document.getElementById('divApartado2_' + $(obj).attr("id").split('_')[1]).scrollTop = obj.scrollTop;
    document.getElementById('divApartado3_' + $(obj).attr("id").split('_')[1]).scrollTop = obj.scrollTop;
    var currentLeft = obj.scrollLeft;
    //$("#spTitleApartado1_3").html(prevLeft + "," + currentLeft);
    if ((prevLeft < currentLeft || prevLeft > currentLeft)) {
        document.getElementById('divApartado1_' + $(obj).attr("id").split('_')[1]).scrollLeft = obj.scrollLeft;
        document.getElementById('divApartado2_' + $(obj).attr("id").split('_')[1]).scrollLeft = obj.scrollLeft
        document.getElementById('divApartado3_' + $(obj).attr("id").split('_')[1]).scrollLeft = obj.scrollLeft

        document.getElementById("divEncabezado_1_" + $(obj).attr("id").split('_')[1])/*idReporte*/.style.marginLeft = -(obj.scrollLeft - 1) + 'px';
        document.getElementById("divEncabezado_2_" + $(obj).attr("id").split('_')[1]).style.marginLeft = -(obj.scrollLeft - 1) + 'px';
        document.getElementById("divEncabezado_3_" + $(obj).attr("id").split('_')[1]).style.marginLeft = -(obj.scrollLeft - 1) + 'px';
        prevLeft = currentLeft;
    }
}

function reSizeDivsApartados() {
    document.getElementById("tab-container").style.width = "97%";
    document.getElementById("tab-container").style.height = "97%";
    for (var i = 0; i < $('ul#ultabs li').length; i++) {
        document.getElementById("divApartado1_" + (i + 1)).style.height = ((document.getElementById("tab-container").offsetHeight - 205) / 3) + "px";
        document.getElementById("divApartado2_" + (i + 1)).style.height = ((document.getElementById("tab-container").offsetHeight - 205) / 3) + "px";
        document.getElementById("divApartado3_" + (i + 1)).style.height = ((document.getElementById("tab-container").offsetHeight - 205) / 3) + "px";
    }

    document.getElementById("divEncApartado1_3").style.width = (document.getElementById("divApartado1_3").offsetWidth - 15) + "px";
    document.getElementById("divEncApartado2_3").style.width = (document.getElementById("divApartado1_3").offsetWidth - 15) + "px";
    document.getElementById("divEncApartado3_3").style.width = (document.getElementById("divApartado1_3").offsetWidth - 15) + "px";

    //    $("#divReportesPMC").dialog("option", "height", document.getElementById("shadows").offsetHeight - 200);
    //    $("#divReportesPMC").dialog("option", "width", $("#divPanelMain").width() - 100);
    $("#divReportesPMC").parent().position({
        my: "center",
        at: "center",
        of: window
    });
}

function cargarPMC1Cartera(idReporte, lstListaCamposMerge, lstListaCamposComparar, aplicarGranTotal) {
    WaitingVtn("divBloqVtnReportesPMC", true, true, "Cargando Información...");
    if (idReporte == 7)
        SicreNet.SicreNet.PanelDeControl.PanelDeControl.CalificacionMuestraDetalleEtapa("2", fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], periocidadSelectXUser, PaisSelectXUser, function (response) {
            CargarReportePMC(idReporte, lstListaCamposMerge, lstListaCamposComparar, response, aplicarGranTotal);
        });
    else
        SicreNet.SicreNet.PanelDeControl.PanelDeControl.ReportesPMC(/*'31/05/2014'*/fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], periocidadSelectXUser, PaisSelectXUser, idReporte, function (response) {
            CargarReportePMC(idReporte, lstListaCamposMerge, lstListaCamposComparar, response, aplicarGranTotal);
        });
}

function CargarReportePMC(idReporte, lstListaCamposMerge, lstListaCamposComparar, data, aplicarGranTotal) {
    try {
        var dsNew = null;
        var numColumnas = 0;
        for (var i = 0; i < lstListaCamposComparar.length; i++)
            if (lstListaCamposComparar[i] != "")
                numColumnas++;
        if (data.value == "") {
            $('#divApartado1_' + idReporte).html("Sin Datos");
            $('#divApartado2_' + idReporte).html("Sin Datos");
            $('#divApartado3_' + idReporte).html("Sin Datos");
            WaitingVtn("divBloqVtnReportesPMC", false, false, "Cargando Información...");
            return;
        }

        var arrayJSONDetalleEI = obtenerArregloDeJSON(data.value.split("%&&%")[0], false);
        var arrayJSONDetalleEII = obtenerArregloDeJSON(data.value.split("%&&%")[1], false);
        var arrayJSONDetalleEIII = obtenerArregloDeJSON(data.value.split("%&&%")[2], false);
        if (data.value.split("%&&%")[0] == "") {
            $('#divApartado1_' + idReporte).html("Sin Datos");
            if (data.value.split("%&&%")[0] == "" && data.value.split("%&&%")[1] == "" && data.value.split("%&&%")[2] == "")
                WaitingVtn("divBloqVtnReportesPMC", false, false, "Cargando Información...");
        }
        else {
            var dataSet = new Array();

            dataSet.push(arrayJSONDetalleEI);
            dataSet.push(arrayJSONDetalleEII);
            dataSet.push(arrayJSONDetalleEIII);

            if (data.value.split("%&&%")[0] != "" && data.value.split("%&&%")[1] != "" && data.value.split("%&&%")[2] != "") {
                dsNew = VerificaTablasDiferentes(dataSet, new Array(lstListaCamposComparar[0], lstListaCamposComparar[1], lstListaCamposComparar[2], lstListaCamposComparar[3], lstListaCamposComparar[4]), aplicarGranTotal, idReporte);
                var cad = generarTablaDeRegistrosPMC(dsNew[0], "right", lstListaCamposMerge[0] + "," + lstListaCamposMerge[1] + "," + lstListaCamposMerge[2] + "," + lstListaCamposMerge[3] + "," + lstListaCamposMerge[4], "1", idReporte, lstListaCamposComparar[numColumnas - 1]);
            }
            else
                var cad = generarTablaDeRegistrosPMC(arrayJSONDetalleEI, "right", lstListaCamposMerge[0] + "," + lstListaCamposMerge[1] + "," + lstListaCamposMerge[2] + "," + lstListaCamposMerge[3] + "," + lstListaCamposMerge[4], "1", idReporte, lstListaCamposComparar[numColumnas - 1]);

            $('#divApartado1_' + idReporte).html(cad);
            if (data.value.split("%&&%")[0] != "" && data.value.split("%&&%")[1] != "" && data.value.split("%&&%")[2] != "")
                $('#divEncApartado1_' + idReporte).html(AgregaEncabezadoEstatico(dsNew[0], "1", idReporte));
            else
                $('#divEncApartado1_' + idReporte).html(AgregaEncabezadoEstatico(arrayJSONDetalleEI, "1", idReporte));
        }
        if (data.value.split("%&&%")[1] == "") {
            $('#divApartado2_' + idReporte).html("Sin Datos");
            if (data.value.split("%&&%")[1] == "" && data.value.split("%&&%")[2] == "")
                WaitingVtn("divBloqVtnReportesPMC", false, false, "Cargando Información...");
        }
        else {
            if (dsNew == null) {
                var cad = generarTablaDeRegistrosPMC(arrayJSONDetalleEII, "right", lstListaCamposMerge[0] + "," + lstListaCamposMerge[1] + "," + lstListaCamposMerge[2] + "," + lstListaCamposMerge[3] + "," + lstListaCamposMerge[4], "2", idReporte, lstListaCamposComparar[numColumnas - 1]);
                $('#divApartado2_' + idReporte).html(cad);
                $('#divEncApartado2_' + idReporte).html(AgregaEncabezadoEstatico(arrayJSONDetalleEII, "2", idReporte));
                if (data.value.split("%&&%")[0] == "" && data.value.split("%&&%")[2] == "")
                    WaitingVtn("divBloqVtnReportesPMC", false, false, "Cargando Información...");
            }
            else {
                var cad = generarTablaDeRegistrosPMC(dsNew[1], "right", lstListaCamposMerge[0] + "," + lstListaCamposMerge[1] + "," + lstListaCamposMerge[2] + "," + lstListaCamposMerge[3] + "," + lstListaCamposMerge[4], "2", idReporte, lstListaCamposComparar[numColumnas - 1]);
                $('#divApartado2_' + idReporte).html(cad);
                $('#divEncApartado2_' + idReporte).html(AgregaEncabezadoEstatico(dsNew[1], "2", idReporte));
            }
        }
        if (data.value.split("%&&%")[2] == "")
            $('#divApartado3_' + idReporte).html("Sin Datos");
        else {
            var cad = generarTablaDeRegistrosPMC(dsNew[2], "right", lstListaCamposMerge[0] + "," + lstListaCamposMerge[1] + "," + lstListaCamposMerge[2] + "," + lstListaCamposMerge[3] + "," + lstListaCamposMerge[4], "3", idReporte, lstListaCamposComparar[numColumnas - 1]);
            $('#divApartado3_' + idReporte).html(cad);
            $('#divEncApartado3_' + idReporte).html(AgregaEncabezadoEstatico(dsNew[2], "3", idReporte));
        }
        document.getElementById('divEncApartado2_' + idReporte).style.width = (document.getElementById("divApartado1_3").offsetWidth - 15) + "px";
        document.getElementById('divEncApartado3_' + idReporte).style.width = (document.getElementById("divApartado1_3").offsetWidth - 15) + "px";
        document.getElementById('divEncApartado1_' + idReporte).style.width = (document.getElementById("divApartado1_3").offsetWidth - 15) + "px";
        WaitingVtn("divBloqVtnReportesPMC", false, false, "Cargando Información...");
    } catch (e) {
        var error = e;
    }
}

function AgregaEncabezadoEstatico(listaDeJSON, idTabla, idReporte) {
    var cad = '<div id="divEncabezado_' + idTabla + '_' + idReporte + '"  style="display: inline-block; position: relative;table-layout:fixed">';
    cad += '<table id="tblEncabezado_' + idTabla + '" style="width: 100%;table-layout:fixed">  <tbody>';
    cad += '<tr style="font-weight: bold; text-shadow: 2px 1px 1px black; font-size: 9px;">';
    var auxJSON = listaDeJSON[0];
    var indiceColumnaEncabezado = 0;
    for (var encabezados in auxJSON) {
        if (encabezados != "Comentario" && encabezados != "clear" /*&& encabezados != "ID_Num"*/ && encabezados != "") {
            cad += '<td style="text-align: center; background: rgb(0, 128, 128);color: rgb(255, 255, 255);padding-bottom: 4px;';
            cad += "width:" + document.getElementById('tblDatos_' + idTabla + '_' + idReporte).rows[0].cells[indiceColumnaEncabezado].offsetWidth + "px";
            cad += '">';
            cad += encabezados.toString();
            cad += '</td>';
            indiceColumnaEncabezado++;
        }
    }
    cad += '</tr></tbody></table></div>';
    return cad;
}

function generarTablaDeRegistrosPMC(listaDeJSON, alineacion, lstnombreColumna, idTabla, idReporte, columnaTotalUltima) {
    var cad = '<div ><table id="tblDatos_' + idTabla + '_' + idReporte + '" class="dataGridDatos" style="width: 100%;table-layout:fixed">';
    cad += '<tbody>';

    var numColumnasSpan = 0;
    for (var i = 0; i < lstnombreColumna.split(",").length; i++)
        if (lstnombreColumna.split(",")[i] != "")
            numColumnasSpan++;

    var arrayNumItems = new Array(); var numeroitems = 0;
    var filaIniciaSpan = 0;
    if (lstnombreColumna != undefined) {
        for (var j = 0; j < numColumnasSpan; j++) {
            numeroitems = 0;
            for (var filas = 0; filas < listaDeJSON.length; filas++) {
                if (filas == 0 || (listaDeJSON[filas][lstnombreColumna.split(",")[j]] != listaDeJSON[filas - 1][lstnombreColumna.split(",")[j]] && listaDeJSON[filas][lstnombreColumna.split(",")[j]] != "")) {
                    if (filas > 0 && numeroitems > 0) {
                        arrayNumItems.push(lstnombreColumna.split(",")[j] + "," + listaDeJSON[filas - 1][lstnombreColumna.split(",")[j]] + "&&" + numeroitems + "," + filaIniciaSpan + ",false,1");
                        numeroitems = 0;
                    }
                    numeroitems++;
                    if ((filas == 0 || listaDeJSON[filas][lstnombreColumna.split(",")[j]] != listaDeJSON[filas - 1][lstnombreColumna.split(",")[j]]) || listaDeJSON[filas][lstnombreColumna.split(",")[j]].indexOf('Total') != -1) {
                        filaIniciaSpan = filas;
                        if (listaDeJSON[filas][lstnombreColumna.split(",")[j]].indexOf('Total') != -1 && numeroitems > 0) {
                            if (!ExisteFilaItemEnArreglo(arrayNumItems, filaIniciaSpan, listaDeJSON[filas][lstnombreColumna.split(",")[j]]))
                                arrayNumItems.push(lstnombreColumna.split(",")[j] + "," + listaDeJSON[filas][lstnombreColumna.split(",")[j]] + "&&" + numeroitems + "," + filaIniciaSpan + ",false," + (numColumnasSpan - j));
                            numeroitems = 0;
                        }
                    }
                }
                else {
                    numeroitems++;
                    if (listaDeJSON[filas][lstnombreColumna.split(",")[j]].indexOf('Total') != -1) {
                        filaIniciaSpan = filas;
                        if (!ExisteFilaItemEnArreglo(arrayNumItems, filaIniciaSpan, listaDeJSON[filas][lstnombreColumna.split(",")[j]]))
                            arrayNumItems.push(lstnombreColumna.split(",")[j] + "," + listaDeJSON[filas][lstnombreColumna.split(",")[j]] + "&&" + numeroitems + "," + filaIniciaSpan + ",false," + (numColumnasSpan - j));
                        numeroitems = 0;
                    }
                }
            }
            if (listaDeJSON[filas - 1][lstnombreColumna.split(",")[j]] == "" && filas - 1 == listaDeJSON.length - 1)
                numeroitems--;
            if (numeroitems > 0)
                arrayNumItems.push(lstnombreColumna.split(",")[j] + "," + listaDeJSON[filas - 1][lstnombreColumna.split(",")[j]] + "&&" + numeroitems + "," + filaIniciaSpan + ",false,1");
        }
    }

    var filasRecorridas = 0;
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += ((filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + (listaDeJSON[filas]["Comentario"] == "AgregadoO" ? ' style="background:none2;" lang="aa" ' : (listaDeJSON[filas]["Comentario"] == "AgregadoB" ? ' style="background:none1;" lang="ab" ' : '')) + ' id="tr_' + (filas + '_' + idReporte + '_' + idTabla) + '" onmouseover="mouseOverSombrearFila(this);" onmouseout="mouseOutSombrearFila(this);">';
        var json = listaDeJSON[filas];
        var iFila = 0;
        var esTotal = (listaDeJSON[filas][lstnombreColumna.split(",")[0]].toUpperCase().indexOf("TOTAL") != -1 || (lstnombreColumna.split(",")[1] == "" ? false : listaDeJSON[filas][lstnombreColumna.split(",")[1]].toUpperCase().indexOf("TOTAL") != -1) || (lstnombreColumna.split(",")[2] == "" ? false : listaDeJSON[filas][lstnombreColumna.split(",")[2]].toUpperCase().indexOf("TOTAL") != -1)
         || (lstnombreColumna.split(",")[3] == "" ? false : listaDeJSON[filas][lstnombreColumna.split(",")[3]].toUpperCase().indexOf("TOTAL") != -1) || (lstnombreColumna.split(",")[4] == "" ? false : listaDeJSON[filas][lstnombreColumna.split(",")[1]].toUpperCase().indexOf("TOTAL") != -1) || (listaDeJSON[filas][columnaTotalUltima].toUpperCase().indexOf("TOTAL") != -1));
        var esGranTotal = filas == listaDeJSON.length - 1 ? true : false;
        esTotal = esGranTotal ? false : esTotal;
        var agregoColSpanGranTotal = false;
        for (var element in json) {
            var indiceColumna = DevuelveIndexExisteItemEnArreglo(element + "," + json[element], arrayNumItems);
            var indiceFila = indiceColumna != -1 ? buscaIndiceFilaDeArreglo(filas, arrayNumItems, element + "," + json[element]) : "-1";
            var agregarTd = (element == lstnombreColumna.split(",")[0] || element == lstnombreColumna.split(",")[1] || (lstnombreColumna.split(",")[2] == "" ? false : element == lstnombreColumna.split(",")[2]) || (lstnombreColumna.split(",")[3] == "" ? false : element == lstnombreColumna.split(",")[3]) || (lstnombreColumna.split(",")[4] == "" ? false : element == lstnombreColumna.split(",")[4])) ? ((json[element] + "").indexOf("Total") == -1 ? true : (!agregoColSpanGranTotal ? true : false)) : true;
            if ((parseFloat(json[element])).toString() != "NaN" && element != "" && element != "Calificación" /*&& element != "ID_Num"*/) {
                cad += '<td style="' + (element != lstnombreColumna.split(",")[0] && element != lstnombreColumna.split(",")[1] && (lstnombreColumna.split(",")[2] == "" ? true : element != lstnombreColumna.split(",")[2]) && (lstnombreColumna.split(",")[3] == "" ? true : element != lstnombreColumna.split(",")[3]) && (lstnombreColumna.split(",")[4] == "" ? true : element != lstnombreColumna.split(",")[4]) ? 'width: 105px;max-width: 105px;word-wrap: break-word;' : 'width: 80px;max-width: 80px;');
                cad += 'text-align;text-align: right;max-height: 10px;height:10px;' + (json[element].toString().indexOf("-") != -1 ? 'font-weight: bold;color:Red;' : (esTotal ? 'font-weight: bold;color:Green;' : (esGranTotal ? 'font-weight: bold;color:Blue;' : ''))) + '">';
                cad += DevuelveCantidadSeparadaPorComas(json[element]);
            }
            else if (indiceColumna != -1 && indiceFila != "-1" && filas == parseInt(indiceFila.split(',')[1]) && arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[1].split(',')[2] == "false" && element != "" /*&& element != "ID_Num"*/) {
                cad += '<td valign="top" style="' + (element != lstnombreColumna.split(",")[0] && element != lstnombreColumna.split(",")[1] && (lstnombreColumna.split(",")[2] == "" ? true : element != lstnombreColumna.split(",")[2]) && (lstnombreColumna.split(",")[3] == "" ? true : element != lstnombreColumna.split(",")[3]) && (lstnombreColumna.split(",")[4] == "" ? true : element != lstnombreColumna.split(",")[4]) ? 'width: 105px;max-width: 105px;word-wrap: break-word;' : 'width: 80px;max-width: 80px;');
                cad += 'max-height: 10px;height:10px;text-align: center;padding:2px;color:White;background:#009c96 url(../../Images/Cancelaciones/SeguimientoCancelacion/HeaderDG.gif) repeat-x;" rowspan="' + arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[1].split(',')[0] + '" ' +
                    ('colspan="' + (arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[1].split(',')[3])) + '" >' + json[element] + ' </td>';
                arrayNumItems[parseInt(indiceFila.split(',')[0])] = arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[0] + "&&" + arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[1].split(',')[0] + "," + arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[1].split(',')[1] + ",true";
                agregoColSpanGranTotal = true;
            }
            else if (indiceColumna == -1 && element != "Comentario" && element != "clear" && element != "" /*&& element != "ID_Num"*/ && agregarTd) {
                cad += '<td style="' + (element != lstnombreColumna.split(",")[0] && element != lstnombreColumna.split(",")[1] && (lstnombreColumna.split(",")[2] == "" ? true : element != lstnombreColumna.split(",")[2]) && (lstnombreColumna.split(",")[3] == "" ? true : element != lstnombreColumna.split(",")[3]) && (lstnombreColumna.split(",")[4] == "" ? true : element != lstnombreColumna.split(",")[4]) ? 'width: 105px;max-width: 105px;word-wrap: break-word;' : 'width: 80px;max-width: 80px;');
                cad += 'text-align:left;font-weight:normal">';
                cad += json[element] != "" ? json[element] : "(Blank)";
            }
            cad += '</td>';
            iFila++;
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div>';
    return cad;
}

function ExisteFilaItemEnArreglo(arrayNumItems, idFila, item) {
    var existe = false;
    for (var i = 0; i < arrayNumItems.length; i++) {
        if (idFila == arrayNumItems[i].split('&&')[1].split(',')[1] && item == arrayNumItems[i].split('&&')[0].split(',')[1]) {
            existe = true;
            break;
        }
    }
    return existe;
}

function mouseOverSombrearFila(obj) {
    var idtr = $(obj).attr("id").split('_')[0] + "_" + $(obj).attr("id").split('_')[1] + "_" + $(obj).attr("id").split('_')[2];
    document.getElementById(idtr + "_1") != null ? (document.getElementById(idtr + "_1").style.background = 'rgb(95, 186, 216)') : null;
    document.getElementById(idtr + "_2") != null ? (document.getElementById(idtr + "_2").style.background = 'rgb(95, 186, 216)') : null;
    document.getElementById(idtr + "_3") != null ? (document.getElementById(idtr + "_3").style.background = 'rgb(95, 186, 216)') : null;
}

function mouseOutSombrearFila(obj) {
    var idtr = $(obj).attr("id").split('_')[0] + "_" + $(obj).attr("id").split('_')[1] + "_" + $(obj).attr("id").split('_')[2];
    $("#" + idtr + "_1").removeAttr("style")
    $("#" + idtr + "_2").removeAttr("style")
    $("#" + idtr + "_3").removeAttr("style")

    if (document.getElementById(idtr + "_1") != null && $("#" + idtr + "_1").attr("lang") != "" && $("#" + idtr + "_1").attr("lang") != undefined)
        document.getElementById(idtr + "_1").style.background = ($("#" + idtr + "_1").attr("lang") == "aa" ? "none2" : "none1");
    if (document.getElementById(idtr + "_2") != null && $("#" + idtr + "_2").attr("lang") != "" && $("#" + idtr + "_2").attr("lang") != undefined)
        document.getElementById(idtr + "_2").style.background = ($("#" + idtr + "_2").attr("lang") == "aa" ? "none2" : "none1");
    if (document.getElementById(idtr + "_3") != null && $("#" + idtr + "_3").attr("lang") != "" && $("#" + idtr + "_3").attr("lang") != undefined)
        document.getElementById(idtr + "_3").style.background = ($("#" + idtr + "_3").attr("lang") == "aa" ? "none2" : "none1");
}

function buscaIndiceFilaDeArreglo(fila, arregloIterar, nameCol) {
    var indiceFila = "-1";
    for (var i = 0; i < arregloIterar.length; i++) {
        if (arregloIterar[i].split('&&')[1].split(',')[1] == fila && nameCol == arregloIterar[i].split('&&')[0]) {
            indiceFila = i + "," + arregloIterar[i].split('&&')[1].split(',')[1];
            break;
        }
    }
    return indiceFila;
}

function VerificaTablasDiferentes(arrayDataSet, lstListaCampos, aplicarGranTotal, idReporte) {
    if (aplicarGranTotal) {
        for (var i = 0; i < arrayDataSet.length; i++) {
            arrayDataSet[i][arrayDataSet[i].length - 1][lstListaCampos[0]] = "Gran Total";
            arrayDataSet[i][arrayDataSet[i].length - 1][lstListaCampos[1]] = "Gran Total";
            arrayDataSet[i][arrayDataSet[i].length - 1][lstListaCampos[2]] = "Gran Total";
        }
    }
    var dsNew = new Array;
    strfilasAgregadasTbl3 = "";
    indiceMenorAgregadoTabla1 = 0;
    indiceMenorAgregadoTabla2 = 0;

    var newLstCampos = new Array();
    for (var i = 0; i < lstListaCampos.length; i++)
        newLstCampos.push(lstListaCampos[i]);

    newLstCampos.push(idReporte == 4 ? "Subproducto" : (idReporte == 5 ? "Fitir" : ""));
    newLstCampos.push(idReporte == 4 ? "Sistema" : (idReporte == 5 ? "Sistema" : ""));
    VerificaTablaQueTienePrimeroCambio(arrayDataSet[0], arrayDataSet[1], newLstCampos);

    if (idTablaUno <= idTablaDos) {
        var tbl2 = DevuelveTablaConNuevosRegistrosG(arrayDataSet[0], arrayDataSet[1], null, newLstCampos, 2, idReporte);
        var tbl1 = DevuelveTablaConNuevosRegistrosG(tbl2, arrayDataSet[0], null, newLstCampos, 1, idReporte);
    }
    else if (idTablaDos < idTablaUno) {
        var tbl1 = DevuelveTablaConNuevosRegistrosG(arrayDataSet[1], arrayDataSet[0], null, newLstCampos, 1, idReporte);
        var tbl2 = DevuelveTablaConNuevosRegistrosG(tbl1, arrayDataSet[1], null, newLstCampos, 2, idReporte);
    }
    //var tbl3 = GenerarTabla3(indiceMenorAgregadoTabla1 <= indiceMenorAgregadoTabla2 ? tbl1 : tbl2, indiceMenorAgregadoTabla1 <= indiceMenorAgregadoTabla2 ? tbl2 : tbl1, arrayDataSet[2], lstListaCampos, indiceMenorAgregadoTabla1 <= indiceMenorAgregadoTabla2 ? 1 : 2);
    //tbl3 = GenerarTabla3(indiceMenorAgregadoTabla1 <= indiceMenorAgregadoTabla2 ? tbl2 : tbl1, indiceMenorAgregadoTabla1 <= indiceMenorAgregadoTabla2 ? tbl1 : tbl2, tbl3, lstListaCampos, indiceMenorAgregadoTabla1 <= indiceMenorAgregadoTabla2 ? 2 : 1);
    var tbl3 = GeneraTabla3(tbl1, tbl2, newLstCampos);
    if (aplicarGranTotal)
        tbl3 = RecalcularTotalesTablaComparativo(tbl3, strfilasAgregadasTbl3, lstListaCampos);
    else if (!aplicarGranTotal) {
        var numColumnas = 0;
        for (var i = 0; i < lstListaCampos.length; i++)
            if (lstListaCampos[i] != "")
                numColumnas++;
        for (var i = numColumnas - 1; i >= 0; i--) {
            tbl1 = AgregarFilasTotales(tbl1, lstListaCampos, i < 2 ? "" : lstListaCampos[i - 2] + "," + (i - 2), i == 0 ? "" : lstListaCampos[i - 1], lstListaCampos[i], i == 0 ? lstListaCampos[1] : (i == numColumnas - 1 ? "" : lstListaCampos[i + 1]), i == 0 ? true : false, i <= 1 ? true : false, i <= 2 ? true : false, i <= 3 ? true : false, true, i == numColumnas - 1 ? false : true, i == 0 ? true : false, idReporte);
            tbl2 = AgregarFilasTotales(tbl2, lstListaCampos, i < 2 ? "" : lstListaCampos[i - 2] + "," + (i - 2), i == 0 ? "" : lstListaCampos[i - 1], lstListaCampos[i], i == 0 ? lstListaCampos[1] : (i == numColumnas - 1 ? "" : lstListaCampos[i + 1]), i == 0 ? true : false, i <= 1 ? true : false, i <= 2 ? true : false, i <= 3 ? true : false, true, i == numColumnas - 1 ? false : true, i == 0 ? true : false, idReporte);
            tbl3 = AgregarFilasTotales(tbl3, lstListaCampos, i < 2 ? "" : lstListaCampos[i - 2] + "," + (i - 2), i == 0 ? "" : lstListaCampos[i - 1], lstListaCampos[i], i == 0 ? lstListaCampos[1] : (i == numColumnas - 1 ? "" : lstListaCampos[i + 1]), i == 0 ? true : false, i <= 1 ? true : false, i <= 2 ? true : false, i <= 3 ? true : false, true, i == numColumnas - 1 ? false : true, i == 0 ? true : false, idReporte);
        }
        tbl1 = eliminarRegistrosNulos(tbl1);
        tbl2 = eliminarRegistrosNulos(tbl2);
        tbl3 = eliminarRegistrosNulos(tbl3);
    }
    dsNew.push(tbl1);
    dsNew.push(tbl2);
    dsNew.push(tbl3);
    return dsNew;
}

var idTablaUno = -1; var idTablaDos = -1;
function VerificaTablaQueTienePrimeroCambio(dt1, dt2, lstListaCampos) {
    idTablaUno = -1; idTablaDos = -1;
    for (var i = 0; i < dt1.length; i++) {
        var indiceFilaD = DevuelveIndiceRow(dt2, dt1[i][lstListaCampos[0]], dt1[i][lstListaCampos[1]], dt1[i][lstListaCampos[2]], dt1[i][lstListaCampos[3]], dt1[i][lstListaCampos[4]], dt1[i][lstListaCampos[5]], dt1[i][lstListaCampos[6]], lstListaCampos);
        if (indiceFilaD == -1) {
            idTablaUno = i;
            break;
        }
    }
    for (var i = 0; i < dt2.length; i++) {
        var indiceFilaD = DevuelveIndiceRow(dt1, dt2[i][lstListaCampos[0]], dt2[i][lstListaCampos[1]], dt2[i][lstListaCampos[2]], dt2[i][lstListaCampos[3]], dt2[i][lstListaCampos[4]], dt2[i][lstListaCampos[5]], dt2[i][lstListaCampos[6]], lstListaCampos);
        if (indiceFilaD == -1) {
            idTablaDos = i;
            break;
        }
    }
}

function eliminarRegistrosNulos(tbl) {
    var tblReturn = new Array();
    for (var i = 0; i < tbl.length; i++) {
        var esFilaNull = false;
        for (var encabezados in tbl[0]) {
            var valorCol = tbl[i][encabezados] + "";
            if (valorCol.indexOf("Fila NULL") != -1) {
                esFilaNull = true;
                break;
            }
        }
        if (!esFilaNull)
            tblReturn.push(tbl[i]);
    }
    return tblReturn;
}

var indiceMenorAgregadoTabla1 = 0; var indiceMenorAgregadoTabla2 = 0;
function DevuelveTablaConNuevosRegistrosG(dt1, dt2, dt3, lstListaCampos, idTabla, idReporte) {
    var entroAgregado = false;
    var arrayFilaNew = new Array();
    for (var i = 0; i < dt1.length; i++) {
        dt1[i][lstListaCampos[0]] = dt1[i][lstListaCampos[0]].toUpperCase();
        dt1[i][lstListaCampos[1]] = dt1[i][lstListaCampos[1]].toUpperCase();
        lstListaCampos[2] != "" ? dt1[i][lstListaCampos[2]] = dt1[i][lstListaCampos[2]].toUpperCase() : null;
        lstListaCampos[3] != "" ? dt1[i][lstListaCampos[3]] = dt1[i][lstListaCampos[3]].toUpperCase() : null;
        lstListaCampos[4] != "" ? dt1[i][lstListaCampos[4]] = dt1[i][lstListaCampos[4]].toUpperCase() : null;
        lstListaCampos[5] != "" ? dt1[i][lstListaCampos[5]] = dt1[i][lstListaCampos[5]].toUpperCase() : null;
        lstListaCampos[6] != "" ? dt1[i][lstListaCampos[6]] = dt1[i][lstListaCampos[6]].toUpperCase() : null;

        var indiceFilaD = DevuelveIndiceRow(dt2, dt1[i][lstListaCampos[0]], dt1[i][lstListaCampos[1]], dt1[i][lstListaCampos[2]], dt1[i][lstListaCampos[3]], dt1[i][lstListaCampos[4]], dt1[i][lstListaCampos[5]], dt1[i][lstListaCampos[6]], lstListaCampos);
        if (indiceFilaD == -1) {
            arrayFilaNew = new Array();
            arrayFilaNew[lstListaCampos[0]] = dt1[i][lstListaCampos[0]];
            arrayFilaNew[lstListaCampos[1]] = dt1[i][lstListaCampos[1]];
            lstListaCampos[2] != "" ? arrayFilaNew[lstListaCampos[2]] = dt1[i][lstListaCampos[2]] : null;
            lstListaCampos[3] != "" ? arrayFilaNew[lstListaCampos[3]] = dt1[i][lstListaCampos[3]] : null;
            lstListaCampos[4] != "" ? arrayFilaNew[lstListaCampos[4]] = dt1[i][lstListaCampos[4]] : null;
            lstListaCampos[5] != "" ? arrayFilaNew[lstListaCampos[5]] = dt1[i][lstListaCampos[5]] : null;
            lstListaCampos[6] != "" ? arrayFilaNew[lstListaCampos[6]] = dt1[i][lstListaCampos[6]] : null;
            for (var encabezados in dt1[0])
                if (encabezados != lstListaCampos[0] && encabezados != lstListaCampos[1] && (lstListaCampos[2] == "" ? true : encabezados != lstListaCampos[2])
                && (lstListaCampos[3] == "" ? true : encabezados != lstListaCampos[3]) && (lstListaCampos[4] == "" ? true : encabezados != lstListaCampos[4])
                && (lstListaCampos[5] == "" ? true : encabezados != lstListaCampos[5]) && (lstListaCampos[6] == "" ? true : encabezados != lstListaCampos[6]))
                    arrayFilaNew[encabezados] = "0";
            arrayFilaNew["Comentario"] = idTabla == 1 ? "AgregadoO" : "AgregadoB";
            if (idTabla == 1 && !entroAgregado)
                indiceMenorAgregadoTabla1 = i;
            else if (idTabla == 2 && !entroAgregado)
                indiceMenorAgregadoTabla2 = i;
            dt2.splice(i, 0, arrayFilaNew);
            entroAgregado = true;
        }
        else {
            arrayFilaNew = dt2[indiceFilaD];
            arrayFilaNew["Comentario"] = "";
            dt2[indiceFilaD] = arrayFilaNew;
        }
    }
    return dt2;
}

var strfilasAgregadasTbl3 = "";
function GenerarTabla3(tbl1, tbl2, dt3, lstListaCampos, idTabla) {
    var arrayFilaNew = new Array();
    for (var i = 0; i < tbl1.length; i++) {
        if (tbl1[i]["Comentario"] != undefined && tbl1[i]["Comentario"].indexOf("Agregado") != -1) {
            arrayFilaNew = new Array();
            arrayFilaNew[lstListaCampos[0]] = tbl1[i][lstListaCampos[0]];
            arrayFilaNew[lstListaCampos[1]] = tbl1[i][lstListaCampos[1]];
            lstListaCampos[2] != "" ? arrayFilaNew[lstListaCampos[2]] = tbl1[i][lstListaCampos[2]] : null;
            lstListaCampos[3] != "" ? arrayFilaNew[lstListaCampos[3]] = tbl1[i][lstListaCampos[3]] : null;
            lstListaCampos[4] != "" ? arrayFilaNew[lstListaCampos[4]] = tbl1[i][lstListaCampos[4]] : null;
            for (var encabezados in tbl1[0]) {
                if (encabezados != lstListaCampos[0] && encabezados != lstListaCampos[1] && (lstListaCampos[2] == "" ? true : encabezados != lstListaCampos[2])
                && (lstListaCampos[3] == "" ? true : encabezados != lstListaCampos[3]) && (lstListaCampos[4] == "" ? true : encabezados != lstListaCampos[4])) {
                    if (idTabla == 1)
                        arrayFilaNew[encabezados] = (-parseFloat(tbl2[i][encabezados])) + (parseFloat(tbl1[i][encabezados]));
                    else
                        arrayFilaNew[encabezados] = (-parseFloat(tbl1[i][encabezados])) + (parseFloat(tbl2[i][encabezados]));
                }
            }
            arrayFilaNew["Comentario"] = idTabla == 1 ? "AgregadoO" : "AgregadoB";
            strfilasAgregadasTbl3 += i + ",";
            dt3.splice(i, 0, arrayFilaNew);
        }
    }
    return dt3;
}

function GeneraTabla3(tbl1, tbl2, lstListaCampos) {
    var arrayFilaNew = new Array();
    var tbl3 = new Array();
    for (var i = 0; i < tbl1.length; i++) {
        arrayFilaNew = new Array();
        arrayFilaNew[lstListaCampos[0]] = tbl1[i][lstListaCampos[0]];
        arrayFilaNew[lstListaCampos[1]] = tbl1[i][lstListaCampos[1]];
        lstListaCampos[2] != "" ? arrayFilaNew[lstListaCampos[2]] = tbl1[i][lstListaCampos[2]] : null;
        lstListaCampos[3] != "" ? arrayFilaNew[lstListaCampos[3]] = tbl1[i][lstListaCampos[3]] : null;
        lstListaCampos[4] != "" ? arrayFilaNew[lstListaCampos[4]] = tbl1[i][lstListaCampos[4]] : null;
        lstListaCampos[5] != "" ? arrayFilaNew[lstListaCampos[5]] = tbl1[i][lstListaCampos[5]] : null;
        lstListaCampos[6] != "" ? arrayFilaNew[lstListaCampos[6]] = tbl1[i][lstListaCampos[6]] : null;
        for (var encabezados in tbl1[0]) {
            if (encabezados != lstListaCampos[0] && encabezados != lstListaCampos[1] && (lstListaCampos[2] == "" ? true : encabezados != lstListaCampos[2])
                && (lstListaCampos[3] == "" ? true : encabezados != lstListaCampos[3]) && (lstListaCampos[4] == "" ? true : encabezados != lstListaCampos[4])
                && (lstListaCampos[5] == "" ? true : encabezados != lstListaCampos[5]) && (lstListaCampos[6] == "" ? true : encabezados != lstListaCampos[6]))
                arrayFilaNew[encabezados] = (-parseFloat(tbl2[i][encabezados])) + (parseFloat(tbl1[i][encabezados]));

        }
        arrayFilaNew["Comentario"] = ""; //idTabla == 1 ? "AgregadoO" : "AgregadoB";
        // strfilasAgregadasTbl3 += i + ",";
        tbl3.push(arrayFilaNew);
    }
    return tbl3;
}

function RecalcularTotalesTablaComparativo(tbl, strfilasAgregadas, lstListaCampos) {
    if (strfilasAgregadas != "") {
        for (var i = 0; i < strfilasAgregadas.split(',').length - 1; i++) {
            var negocio = tbl[parseInt(strfilasAgregadas.split(',')[i])][lstListaCampos[1]];
            for (var encabezados in tbl[0]) {
                if (encabezados != lstListaCampos[0] && encabezados != lstListaCampos[1] && encabezados != lstListaCampos[2]
            && (lstListaCampos[3] == "" ? true : encabezados != lstListaCampos[3]) && (lstListaCampos[4] == "" ? true : encabezados != lstListaCampos[4])
            && encabezados != "Comentario") {
                    var suma = 0;
                    for (var ii = 0; ii < tbl.length; ii++) {
                        if (tbl[ii][lstListaCampos[1]] == negocio && tbl[ii][lstListaCampos[2]] != "Total")
                            suma += parseFloat(tbl[ii][encabezados]);
                        else if (tbl[ii][lstListaCampos[1]] == negocio && tbl[ii][lstListaCampos[2]] == "Total") {
                            tbl[ii][encabezados] = suma;
                            suma = 0;
                            break;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < strfilasAgregadas.split(',').length - 1; i++) {
            var cartera = tbl[parseInt(strfilasAgregadas.split(',')[i])][lstListaCampos[0]];
            for (var encabezados in tbl[0]) {
                if (encabezados != lstListaCampos[0] && encabezados != lstListaCampos[1] && encabezados != lstListaCampos[2]
            && (lstListaCampos[3] == "" ? true : encabezados != lstListaCampos[3]) && (lstListaCampos[4] == "" ? true : encabezados != lstListaCampos[4])
            && encabezados != "Comentario") {
                    var suma = 0;
                    for (var ii = 0; ii < tbl.length; ii++) {
                        if (tbl[ii][lstListaCampos[0]] == cartera && tbl[ii][lstListaCampos[1]] != "Total" && tbl[ii][lstListaCampos[2]] == "Total")
                            suma += parseFloat(tbl[ii][encabezados]);
                        else if (tbl[ii][lstListaCampos[0]] == cartera && tbl[ii][lstListaCampos[1]] == "Total" && tbl[ii][lstListaCampos[2]] == "Total") {
                            tbl[ii][encabezados] = suma;
                            suma = 0;
                            break;
                        }
                    }
                }
            }
        }
        for (var encabezados in tbl[0]) {
            if (encabezados != lstListaCampos[0] && encabezados != lstListaCampos[1] && encabezados != lstListaCampos[2]
        && (lstListaCampos[3] == "" ? true : encabezados != lstListaCampos[3]) && (lstListaCampos[4] == "" ? true : encabezados != lstListaCampos[4])
         && encabezados != "Comentario") {
                var suma = 0;
                for (var ii = 0; ii < tbl.length; ii++) {
                    if (((tbl[ii][lstListaCampos[1]] == "Total" || tbl[ii][lstListaCampos[1]] == "TOTAL:") && tbl[ii][lstListaCampos[0]] != "Gran Total") || (tbl[ii][lstListaCampos[1]] != "Gran Total" && lstListaCampos[0] == "TipoMoneda"))
                        suma += parseFloat(tbl[ii][encabezados]);
                    else if (tbl[ii][lstListaCampos[0]] == "Gran Total") {
                        tbl[ii][encabezados] = suma.toFixed(2);
                        suma = 0;
                        break;
                    }
                }
            }
        }
    }
    return tbl;
}

function DevuelveIndiceRow(dt, cartera, negocio, clasif, campo4, campo5, campo6, campo7, lstListaCampos) {
    var index = -1;
    for (var i = 0; i < dt.length; i++) {
        if (dt[i][lstListaCampos[0]].toUpperCase() == cartera.toUpperCase() &&
                    dt[i][lstListaCampos[1]].toUpperCase() == negocio.toUpperCase() &&
                     (lstListaCampos[2] == "" ? true : clasif.toUpperCase() == dt[i][lstListaCampos[2]].toUpperCase()) &&
                     (lstListaCampos[3] == "" ? true : campo4.toUpperCase() == dt[i][lstListaCampos[3]].toUpperCase()) &&
                     (lstListaCampos[4] == "" ? true : campo5.toUpperCase() == dt[i][lstListaCampos[4]].toUpperCase()) &&
                     (lstListaCampos[5] == "" ? true : campo6.toUpperCase() == dt[i][lstListaCampos[5]].toUpperCase()) &&
                     (lstListaCampos[6] == "" ? true : campo7.toUpperCase() == dt[i][lstListaCampos[6]].toUpperCase())) {
            index = i;
            break;
        }
    }
    return index;
}

function AgregarFilasTotales(tbl, lstListaCampos, campoEval0, campoEval1, campoEval2, campoEval3, escampo1Total, escampo2Total, escampo3Total, escampo4Total, escampo5Total, existeTotal, esGranTotal, idReporte) {
    var numTotalFilas = tbl.length
    var clasificacion = '';
    var descripcion0 = '';
    var tblReturn = new Array();
    var tblTotales = new Array();
    for (var i = 0; i < numTotalFilas; i++) {
        var copyFila = tbl[0];
        var descripcion = copyFila[campoEval2]
        var descripcion2 = copyFila[campoEval3]
        if ((clasificacion == '' || clasificacion == copyFila[campoEval1]) && (campoEval0 != "" ? (descripcion0 == '' || descripcion0 == copyFila[campoEval0.split(',')[0]]) : true) || esGranTotal) {
            tblReturn.push(copyFila);
            if (!existeTotal && (descripcion.indexOf("Total") == -1 && (campoEval3 == "" || descripcion2.indexOf("Total") == -1)))
                tblTotales.push(copyFila);
            else if (existeTotal && descripcion2.indexOf("Total") != -1)
                tblTotales.push(copyFila);
        }
        else {
            tblTotales = eliminarRegistrosNulos(tblTotales); //Agregada por esFilaNullReg
            if (tblTotales.length > 0) {
                tblReturn.push(devuelveFilaConSumaTotal(tblTotales, lstListaCampos, escampo1Total, escampo2Total, escampo3Total, escampo4Total, escampo5Total, campoEval1, esGranTotal, idReporte));
                if (campoEval0 != "" && descripcion0 != copyFila[campoEval0.split(',')[0]] && clasificacion == copyFila[campoEval1]) {
                    var idPosCol = parseInt(campoEval0.split(',')[1]);
                    tblReturn.push(devuelveFilaConSumaTotal(tblTotales, lstListaCampos, 0 >= idPosCol ? true : false, 1 >= idPosCol ? true : false, 2 >= idPosCol ? true : false, 3 >= idPosCol ? true : false, 4 >= idPosCol ? true : false, "Fila NULL", esGranTotal, idReporte));
                }
            }
            tblTotales = new Array();

            tblReturn.push(copyFila);
            if (!existeTotal && (descripcion.indexOf("Total") == -1 && (campoEval3 == "" || descripcion2.indexOf("Total") == -1)))
                tblTotales.push(copyFila);
            else if (existeTotal && descripcion2.indexOf("Total") != -1)
                tblTotales.push(copyFila);
        }
        clasificacion = copyFila[campoEval1];
        descripcion0 = copyFila[campoEval0.split(',')[0]];
        tbl.splice(0, 1);
    }

    tblTotales = eliminarRegistrosNulos(tblTotales); //Agregada por esFilaNullReg
    if (tblTotales.length > 0)
        tblReturn.push(devuelveFilaConSumaTotal(tblTotales, lstListaCampos, escampo1Total, escampo2Total, escampo3Total, escampo4Total, escampo5Total, campoEval1, esGranTotal, idReporte));
    return tblReturn;
}

function devuelveFilaConSumaTotal(tblTotales, lstListaCampos, escampo1Total, escampo2Total, escampo3Total, escampo4Total, escampo5Total, descripcionTotal, esGranTotal, idReporte) {
    var arrayFilaNew = new Array();
    try {
        !escampo1Total ? (arrayFilaNew[lstListaCampos[0]] = tblTotales[0][lstListaCampos[0]]) : (arrayFilaNew[lstListaCampos[0]] = esGranTotal ? "Gran Total" : ("Total " + descripcionTotal));
        !escampo2Total ? (arrayFilaNew[lstListaCampos[1]] = tblTotales[0][lstListaCampos[1]]) : (arrayFilaNew[lstListaCampos[1]] = esGranTotal ? "Gran Total" : ("Total " + descripcionTotal));
        !escampo3Total ? (arrayFilaNew[lstListaCampos[2]] = tblTotales[0][lstListaCampos[2]]) : (arrayFilaNew[lstListaCampos[2]] = esGranTotal ? "Gran Total" : ("Total " + descripcionTotal));
        !escampo4Total ? (lstListaCampos[3] != "" ? arrayFilaNew[lstListaCampos[3]] = tblTotales[0][lstListaCampos[3]] : null) : (arrayFilaNew[lstListaCampos[3]] = esGranTotal ? "Gran Total" : ("Total " + descripcionTotal));
        !escampo5Total ? (lstListaCampos[4] != "" ? arrayFilaNew[lstListaCampos[4]] = tblTotales[0][lstListaCampos[4]] : null) : (arrayFilaNew[lstListaCampos[4]] = esGranTotal ? "Gran Total" : ("Total " + descripcionTotal));

        for (var encabezados in tblTotales[0]) {
            if (encabezados != lstListaCampos[0] && encabezados != lstListaCampos[1] && encabezados != lstListaCampos[2]
                && (lstListaCampos[3] == "" ? true : encabezados != lstListaCampos[3]) && (lstListaCampos[4] == "" ? true : encabezados != lstListaCampos[4])
                 && encabezados != "Comentario") {
                if (encabezados == "Subproducto" || encabezados == "Fitir" || ((idReporte == 4 || idReporte == 5) && encabezados == "Sistema"))
                    arrayFilaNew[encabezados] = esGranTotal ? "Gran Total" : ("Total " + descripcionTotal);
                else
                    arrayFilaNew[encabezados] = devuelveSuma(tblTotales, encabezados);
            }
        }
    } catch (e) {

    }
    return arrayFilaNew;
}

function devuelveSuma(tbl, campo) {
    var suma = 0;
    for (var i = 0; i < tbl.length; i++) {
        //if (!esFilaNullReg(tbl[i], tbl[0]))
        suma += parseFloat(tbl[i][campo]);
    }
    return suma.toFixed(2);
}


//function esFilaNullReg(fila, totalEncabezados) {
//    var esFilaNull = false;
//    for (var encabezados in totalEncabezados) {
//        var valorCol = fila[encabezados] + "";
//        if (valorCol.indexOf("Fila NULL") != -1) {
//            esFilaNull = true;
//            break;
//        }
//    }
//    return esFilaNull;
//}