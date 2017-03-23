

var fechaActual = "";
var fechaConsulta = "";
var Meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
function LlenaCombosAñioYMes() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('CuadreCubo.aspx/DevuelveAñosMesActual', "POST", null, function (data1) {
        if (data1.d == "" || data1.d == null) {
            Waiting(false, "Espere por favor. Cargando Información...");
            MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            return;
        }
        document.getElementById('sltAnio').options.length = 0;
        for (var i = 0; i < data1.d.split(":")[0].split(",").length; i++) {
            var opt = document.createElement('option');
            opt.value = data1.d.split(":")[0].split(",")[i];
            opt.innerHTML = data1.d.split(":")[0].split(",")[i];
            document.getElementById('sltAnio').appendChild(opt);
        }

        document.getElementById('sltMes').options.length = 0;

        for (var i = 1; i <= 12; i++) {
            var optionM = document.createElement('option');
            optionM.value = (i < 10 ? "0" + i : i);
            optionM.innerHTML = Meses[i - 1];
            document.getElementById('sltMes').appendChild(optionM);
        }
        $("#sltAnio").val(data1.d.split(":")[1].split("/")[1]);
        $("#sltMes").val(data1.d.split(":")[1].split("/")[0]);
        fechaActual = data1.d.split(":")[2];
        cargarTablas();
    }, null);
}

function sltMesAnio_OnChange(opcion) {
    if (opcion == "1") {
        document.getElementById('sltMes').options.length = 0;
        var mesesRecorrer = parseInt(fechaActual.split('/')[1]) == parseInt($("#sltAnio").val()) ? parseInt(fechaActual.split('/')[0]) : 12;
        for (var i = 1; i <= parseInt(mesesRecorrer); i++) {
            var optionM = document.createElement('option');
            optionM.value = (i < 10 ? "0" + i : i);
            optionM.innerHTML = Meses[i - 1];
            document.getElementById('sltMes').appendChild(optionM);
        }
        var mesSeleccionar = parseInt(fechaActual.split('/')[1]) == parseInt($("#sltAnio").val()) ? fechaActual.split('/')[0] : 1;
        $("#sltMes").val(mesSeleccionar);
    }
    cargarTablas();
}


function cargarTablas() {
    $('#divCifrasXMetodologias').html("");
    $('#divTblDiferMetCNBVInterna').html("");
    $('#divTblDifEntrMetCNBVCuboInterna').html("");
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("CuadreCubo.aspx/calificacionCuadreCubo", "POST", { anio: $("#sltAnio").val(), mes: $("#sltMes").val() }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var arrayDS = new Array();
                arrayDS.push(obtenerArregloDeJSON(data.d.split("%%&&")[0], false));
                arrayDS.push(obtenerArregloDeJSON(data.d.split("%%&&")[1], false));
                arrayDS.push(obtenerArregloDeJSON(data.d.split("%%&&")[2], false));
                $("#divCifrasXMetodologias").html(creaTablaCifrasXMetodologias(arrayDS));
                $("#divTblDiferMetCNBVInterna").html(creaTablaDiferMetCNBVInterna(arrayDS));
                $("#divTblDifEntrMetCNBVCuboInterna").html(creaTablaDifEntrMetCNBVCuboInterna(arrayDS));
            }
            else
                MostrarMsj("Sin Datos", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 200, 135, null, null, null);
        }
        else MostrarMsj(data.d.split(':')[1], "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function creaTablaCifrasXMetodologias(arrayDS) {
    var arrayDescDS = new Array("CNBV", "INTERNA", "CUBO");
    var cad = ' <table style=" width:100%;" id="tblMetodologia" class="dataGrid" >';
    cad += '<tr><th width="120px">METODOLOGÍA</th><th width="140px">SISTEMA</th><th width="140px">FACTURACIÓN</th>';
    cad += '<th width="140px">N° PEDIDOS</th><th width="140px">EI</th><th width="140px">RESERVA CNBV</th><th width="140px">MODELO INTERNO</th> </tr>';
    var contFilas = 0;
    for (var i = 0; i < arrayDS.length; i++) {
        cad += '<tr><td style=" vertical-align:middle; font-weight:bold; color:White; background:#009c96;text-align: center;">' + arrayDescDS[i] + '</td>';
        cad += '<td colspan="6" style=" border-width:0;" ><table style="width:100%" id="tbl' + arrayDescDS[i] + '" runat="server" cellpadding="0" cellspacing="0">';
        cad += '<tbody>';
        for (var filas = 0; filas < arrayDS[i].length; filas++) {
            cad += (contFilas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
            var json = arrayDS[i][filas];
            for (var element in json) {
                cad += parseFloat(json[element]).toString() != "NaN" ? ('<td style="text-align:right;width:140px;">' + DevuelveCantidadSeparadaPorComas(json[element])) : '<td style="text-align:center;width:140px;">' + json[element];
                cad += '</td>';
            }
            cad += '</tr>';
            contFilas++;
        }
        cad += '</tbody>';
        cad += '</table></td></tr>';
    }
    cad += '</table>';
    return cad;
}

function creaTablaDiferMetCNBVInterna(arrayDS) {
    var cad = '<table style=" width:100%;" id="tblDiferMetCNBVInterna" class="dataGrid" >';
    cad += '<tr><th width="120px">SISTEMA</th><th width="140px">FACTURACIÓN</th><th width="140px">N° PEDIDOS</th><th width="140px">EI</th></tr>';
    cad += '<tbody>';
    for (var filas = 0; filas < arrayDS[1].length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        cad += '<td style="text-align:center;width:140px;">' + arrayDS[1][filas].FVCSISTEMA + '</td>';
        cad += '<td style="text-align:center;width:140px;">' + arrayDS[1][filas].Facturacion + '</td>';
        for (var i = 0; i < arrayDS[0].length; i++) {
            if (arrayDS[0][i].sistema.toUpperCase() == arrayDS[1][filas].FVCSISTEMA.toUpperCase() && arrayDS[0][i].Periodicidad.toUpperCase() == arrayDS[1][filas].Facturacion.toUpperCase()) {
                cad += '<td style="text-align:right;width:140px;">' + DevuelveCantidadSeparadaPorComas((parseFloat(arrayDS[0][i].Pedidos) - parseFloat(arrayDS[1][filas].Pedidos)).toString()) + '</td>';
                cad += '<td style="text-align:right;width:140px;">' + DevuelveCantidadSeparadaPorComas((parseFloat(arrayDS[0][i].EI) - parseFloat(arrayDS[1][filas].EI)).toString()) + '</td>';
                break;
            }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table>';
    return cad;
}

function creaTablaDifEntrMetCNBVCuboInterna(arrayDS) {
    var cad = '<table style=" width:100%;" id="tblDifEntrMetCNBVCuboInterna" class="dataGrid" >';
    cad += '<tr><th rowspan="2" width="120px">SISTEMA</th><th rowspan="2" width="120px">FACTURACIÓN</th>';
    cad += '<th colspan="2" width="240px">N° PEDIDOS</th><th colspan="2" width="240px">EI</th><th colspan="2" width="240px">RESERVA</th></tr>';
    cad += '<tr><th width="120px">CNBV</th><th width="120px">INTERNA</th><th width="120px">CNBV</th>';
    cad += '<th width="120px">INTERNA</th><th width="120px">CNBV</th><th width="120px">INTERNA</th></tr>';
    cad += '<tbody>';
    for (var filas = 0; filas < arrayDS[2].length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        cad += '<td style="text-align:center;width:140px;">' + arrayDS[2][filas].sistema + '</td>';
        cad += '<td style="text-align:center;width:140px;">' + arrayDS[2][filas].facturacion + '</td>';

        var numPedidosCNVB = 0;
        var eiCNBV = 0;
        var reservaCNBV = 0;

        var numPedidosInterna = 0;
        var eiInterna = 0;
        var reservaInterna = 0;
        var indexCNVB = devuelvePosicionDeArregloxSistemaYFact("sistema", "Periodicidad", arrayDS[2][filas].sistema, arrayDS[2][filas].facturacion, arrayDS[0]);
        var indexInterna = devuelvePosicionDeArregloxSistemaYFact("FVCSISTEMA", "Facturacion", arrayDS[2][filas].sistema, arrayDS[2][filas].facturacion, arrayDS[1]);
        if (indexCNVB != -1) {
            numPedidosCNVB = parseFloat(arrayDS[2][filas].Column1) - parseFloat(arrayDS[0][indexCNVB].Pedidos);
            eiCNBV = parseFloat(arrayDS[2][filas].Column2) - parseFloat(arrayDS[0][indexCNVB].EI);
            reservaCNBV = parseFloat(arrayDS[2][filas].Column3) - parseFloat(arrayDS[0][indexCNVB].CNBV);
        }
        if (indexInterna != -1) {
            numPedidosInterna = parseFloat(arrayDS[2][filas].Column1) - parseFloat(arrayDS[1][indexInterna].Pedidos);
            eiInterna = parseFloat(arrayDS[2][filas].Column2) - parseFloat(arrayDS[1][indexInterna].EI);
            reservaInterna = parseFloat(arrayDS[2][filas].Column4) - parseFloat(arrayDS[1][indexInterna].ModInterno);
        }
        cad += '<td style="text-align:right;width:140px;">' + DevuelveCantidadSeparadaPorComas(numPedidosCNVB.toString()) + '</td>';
        cad += '<td style="text-align:right;width:140px;">' + DevuelveCantidadSeparadaPorComas(numPedidosInterna.toString()) + '</td>';
        cad += '<td style="text-align:right;width:140px;">' + DevuelveCantidadSeparadaPorComas(eiCNBV.toString()) + '</td>';
        cad += '<td style="text-align:right;width:140px;">' + DevuelveCantidadSeparadaPorComas(eiInterna.toString()) + '</td>';
        cad += '<td style="text-align:right;width:140px;">' + DevuelveCantidadSeparadaPorComas(reservaCNBV.toString()) + '</td>';
        cad += '<td style="text-align:right;width:140px;">' + DevuelveCantidadSeparadaPorComas(reservaInterna.toString()) + '</td>';
        //break;

        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table>';
    return cad;
}

function devuelvePosicionDeArregloxSistemaYFact(nomColsistema, nomColFacturacion, sistema, Facturacion, arregloRec) {
    var indexReturn = -1;
    for (var i = 0; i < arregloRec.length; i++) {
        if (arregloRec[i][nomColsistema].toUpperCase() == sistema.toUpperCase() && arregloRec[i][nomColFacturacion].toUpperCase() == Facturacion.toUpperCase()) {
            indexReturn = i;
            break;
        }
    }
    return indexReturn;
}