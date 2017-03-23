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
    $($("#txtFecha").next()).attr("disabled", true);
    esPerfil17 = "NO";
});

var perfilUsuario = ""; var esGerente = false; var esAnalista = false; var esPerfil17 = "";
function GetPerfilUsuario() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    peticionAjax("BuscaCliente.aspx/GetPerfilUsuario", "POST", null, function (data) {
        perfilUsuario = data.d.split(',')[0];
        var userLogueado = data.d.split(',')[1];
        if (userLogueado == '585874' || perfilUsuario == "6"/*perfilUsuario == "6" || esPerfil17 == "SI"*/) {
            esAnalista = true;
            esGerente = false;
            //$("#btnRecuperarHistorial").hide();
        }
        if (perfilUsuario == "17" && userLogueado == '585874')
            esGerente = true;
        GetFechaCorte();
        WidtDatePicker();
        setTimeout(TamonioEncabezado, 100);
    }, null);
}


function TamonioEncabezado() {
    $(".dataTables_scrollHeadInner").attr("style", "");
    setTimeout(TamonioEncabezado, 100);
}

function GetFechaCorte() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('BuscaCliente.aspx/ObtenerFechaCorte', "POST", null, function (data) {
        ObtenerTabla(data.d);
        $("#txtFecha").val(data.d);
    }, null);
}

function ObtenerTabla(fechaCorte) {
    if (esGerente) {
        ListaCompletaRelacionadosOrCriterioBusqueda(1, fechaCorte, "");
    }
    else {
        CargaMarcados(fechaCorte, false);
    }
}

function CargaMarcados(fechaCorte, cargoListaTotal) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('BuscaCliente.aspx/ConsultaRelMarcados', "POST", { fechaCorte: fechaCorte, nombreCliente: "" }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                var JSONMain = new Array();
                for (var i = 0; i < data.d.split("%%&&").length; i++) {
                    var JSON = new Array();
                    if (data.d.split("%%&&")[i] != "") {
                        JSON = obtenerArregloDeJSON(data.d.split("%%&&")[i], false);
                    }
                    JSONMain.push(JSON);
                }
                // document.getElementById("divTblDatos").style.height =
                $("#divTblDatos").html(CreaTablaBuscaCliente(JSONMain[0], JSONMain[1], JSONMain[2], "Moneda,Situación de la Deuda,Nombre del Cliente,Id Cliente,No. de disposición,Fecha de Formalización,Fecha de Vencimiento,Tasa (Tal del crédito),Fecha de Recibo No Pagado, Saldo Total, Pago Exigible,No. Recibos Impagados,Dias de Atraso"));
                !cargoListaTotal ? $("#dvDetalleMarcados").slideDown('slide') : null;
                document.getElementById("dvMarcados").style.height = (document.documentElement.clientHeight - 300) + "px";
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function ListaCompletaRelacionadosOrCriterioBusqueda(opcion, fechaCorte, nombreCliente) {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Calificacion.Indicadores.BuscaCliente.ListaCompletaRelacionadosOrCriterioBusqueda(opcion, fechaCorte, nombreCliente, function (response) {
        if (response.value.indexOf("Error") == -1) {
            if (response.value != "") {
                var JSON = obtenerArregloDeJSON(response.value, false);
                var arreglo = new Array();
                for (var i = 0; i < JSON.length; i++) {
                    var arreglov = new Array();
                    arreglov.push("<span id='spanloc_" + JSON[i].DNC_NOMCLIENTE + "' style='text-align:left;text-decoration: underline;color: rgb(0, 0, 255);cursor:pointer;' lang='" + (JSON[i].DNC_NOMCLIENTE + "%%&&" + fechaCorte) + "' onclick='DetalleClienteRelacionado_link(this);'>" + JSON[i].DNC_NOMCLIENTE + "</span>");
                    arreglo.push(arreglov);
                    arreglov = new Array();
                }
                $("#divGridViewDatos").slideDown("slide");
                initTable("tblRelacionados", arreglo);
                document.getElementById("tblRelacionados").style.width = "auto";
                document.getElementById("tblRelacionados_wrapper").style.width = (document.documentElement.clientWidth - 150) + "px";
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
        if (esAnalista)
            CargaMarcados(fechaCorte, true);
        else
            Waiting(false, "Espere por favor. Cargando Información...");
        $(".dataTables_scrollHeadInner").attr("style", "height:auto;");
    });
}


function initTable(tabla, arreglo) {
    return $('#' + tabla).dataTable({
        "aaData": arreglo,
        "aoColumns": [
            { "sTitle": "<div id='div_" + tabla + "_SortCampo1' lang='aa' onclick='CambiaImg_Click(this)'>NOMBRE DEL CLIENTE&nbsp&nbsp<img id='Img_" + tabla + "_SortCampo1' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" }
          ],
        "sPaginationType": "full_numbers",
        //"sScrollY": "50px",
        "sScrollX": "100%",
        "bDestroy": true,
        "aLengthMenu": [10, 20, 30, 40, 50],
        "iDisplayLength": 30
    });

}

function CambiaImg_Click(obj) {
    if ($(obj).attr("lang") == "aa") {
        document.getElementById('Img_' + $(obj).attr("id").split("_")[1] + "_" + $(obj).attr("id").split("_")[2]).setAttribute('src', '../../Images/Portafolio/Capbasviv/flechaOrderUp.png');
        $(obj).attr("lang", "ab");
    }
    else {
        document.getElementById('Img_' + $(obj).attr("id").split("_")[1] + "_" + $(obj).attr("id").split("_")[2]).setAttribute('src', '../../Images/Portafolio/Capbasviv/flechaOrder.png');
        $(obj).attr("lang", "aa");
    }
}

function CreaTablaBuscaCliente(listaDeJSON1, listaDeJSON2, listaDeJSON3, listaEncabezados) {
    var cad = '<center><div class="divContenidoTabla"><table id="tblDatosDetalleCliente" class="dataGridDatos" style="width: 100%;">';
    cad += '<thead>';
    cad += '<tr>';
    for (var i = 0; i < listaEncabezados.split(',').length; i++)
        cad += '<th style="text-align: center;">' + listaEncabezados.split(',')[i] + '</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    cad += listaDeJSON1.length > 0 ? CreaFilasTabla(listaDeJSON1, "rgba(248, 192, 200, 0.68)") : "";
    cad += listaDeJSON2.length > 0 ? CreaFilasTabla(listaDeJSON2, "rgba(248, 232, 152, 0.8)") : "";
    cad += listaDeJSON3.length > 0 ? CreaFilasTabla(listaDeJSON3, "rgba(125, 187, 138, 0.81)") : "";
    cad += '</tbody>';
    cad += '</table></div></center>';
    return cad;
}


function CreaFilasTabla(listaDeJSON, color) {
    var saldo = 0; var pagoExigible = 0;
    var cad = '';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        saldo += parseFloat(listaDeJSON[filas]["Saldo"]);
        pagoExigible += parseFloat(listaDeJSON[filas]["PagoExigible"]);
        for (var element in json) {
            if (element == "Saldo" || element == "PagoExigible") {
                cad += '<td style="text-align:right;">';
                cad += DevuelveCantidadSeparadaPorComas(json[element].indexOf('.00') == -1 ? json[element] : json[element].substring(0, json[element].length - 3));
                cad += '</td>'
            }
            else cad += '<td style="text-align:left;' + (element == "SituacionDeuda" ? ('background-color:' + color + ';"') : (element == "FNIdCliente" ? 'text-align:left;text-decoration: underline;color: rgb(0, 0, 255);cursor:pointer;"  onclick="linkDetalleCliente_Click(this)" title="De click para ver el Detalle Cliente"' : '"')) + ' lang="' + listaDeJSON[filas]["FVCNombreCliente"] + '">' + json[element] + '</td>';
        }
        cad += '</tr>';
    }
    cad += '<tr style="background:' + color + ';font-weight: bold;color: rgb(0, 0, 0);height: 20px;">';
    cad += '<td></td><td></td><td style="text-align:left;">Total</td><td></td><td></td><td></td><td></td><td></td><td></td>';
    cad += '<td style="text-align:right;">' + DevuelveCantidadSeparadaPorComas(saldo + "") + '</td>';
    cad += '<td style="text-align:right;">' + DevuelveCantidadSeparadaPorComas(pagoExigible + "") + '</td>';
    cad += '<td></td><td></td>';
    cad += ' </tr>';
    return cad;
}

function linkDetalleCliente_Click(obj) {
    var cadena = '<div id="divBloqVtnDetalleCliente" style="width:97.5%;height:80%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<center><div id="dvDetallVtnDetalleCliente" style="width:100%;height:85%;overflow: auto;">  ';
    cadena += '</div></center></div>';
    $("#divDetalleCliente").empty();
    AgregarVtnFlotante("divDetalleCliente", "", "DETALLE CLIENTE (" + $(obj).attr("lang") + ")", "", cadena, 150, 760, false, false, "", "", null);
    WaitingVtn("divBloqVtnDetalleCliente", true, true, "Espere por favor. Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "5%";
    peticionAjax("BuscaCliente.aspx/linkDetalleCliente_Click", "POST", { nombreCliente: $(obj).attr("lang"), fechaCorte: $("#txtFecha").val() }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                $("#dvDetallVtnDetalleCliente").html(data.d);
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        WaitingVtn("divBloqVtnDetalleCliente", false, false, "Espere por favor. Cargando Información...");
    }, null);
}

var arrayParametrosClasifClient = new Array();
function DetalleClienteRelacionado_link(obj) {
    $("#btnVerCronologia").val("Ver cronología");
    $("#divGdv_Crono").html("");
    $("#divTblCronologia").hide();
    btnCancelarDetalleCliente_Click();
    arrayParametrosClasifClient = new Array();
    if ($(obj).attr("lang").split("%%&&")[1] != "") {
        $("#divDatosRelacionados").html("");
        $("#btnUpdate").attr("lang", $(obj).attr("lang").split("%%&&")[0]);
        $("#spCliente").html(" Nombre: " + $(obj).attr("lang").split("%%&&")[0]);
        $("#spClienteClasificacion").html($(obj).attr("lang").split("%%&&")[0]);
        if (esAnalista) {
            $("#btnEditar").hide();
            $("#btnClasificar").hide();
            $("#btnMarcados").show();
            $("#btnRecuperarHistorial").hide();
            if (esGerente) {
                $("#btnEditar").show();
                $("#btnClasificar").show();
                $("#btnRecuperarHistorial").show();
            }
        }
        else {
            $("#btnEditar").show();
            $("#btnClasificar").show();
            $("#btnMarcados").hide();
            $("#btnSeguimiento").hide();
        }
        $("#divMain").slideUp('slide');
        $("#divRelacionados").slideDown('slide');

        var fechaInicio = '---';
        var fechaFin = '---';
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("BuscaCliente.aspx/DatosClienteRelacionado", "POST", { opcion: 11, nombreCliente: $(obj).attr("lang").split('%%&&')[0], fechaCorte: $("#txtFecha").val(), flag: 1 }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d != "") {
                    var JSON = obtenerArregloDeJSON(data.d, false);
                    if (JSON.length > 0) {
                        fechaInicio = JSON[0]["FDFechaInicio"];
                        fechaFin = JSON[0]["FDFechaFin"];
                        arrayParametrosClasifClient.push(JSON[0]["FITipoCliente"]);
                        arrayParametrosClasifClient.push(JSON[0]["FIClasCliente"]);
                        arrayParametrosClasifClient.push(JSON[0]["titulo_motivo"]);
                        arrayParametrosClasifClient.push(JSON[0]["FVCClientePadre"]);
                    }
                }
                $("#spFechaRelacion").html((!esAnalista ? "Relacionado desde: " : "Fecha de Seguimiento: ") + fechaInicio);
            }
            else
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            LlenarGridView($(obj).attr("lang").split('%%&&')[0]);
        }, null);
    }
}

function LlenarGridView(nombreCliente) {
    peticionAjax("BuscaCliente.aspx/DatosClienteRelacionado", "POST", { opcion: 7, nombreCliente: nombreCliente, fechaCorte: $("#txtFecha").val(), flag: 1 }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#divDatosRelacionados").html(CreaTablaConOtrosEncabezadosDetalleSeguimiento(JSON, "ESTATUS,ID CLIENTE,Sistema,PRODUCTO,CREDITO,IMPORTE CONCEDIDO,SALDO CAPITAL,INTERESES,ANTICIPOS,BASE CALIFICACIÓN"));
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        //Waiting(false, "Espere por favor. Cargando Información...");
        CargaDatosCronologia(nombreCliente);
    });
}

function CreaTablaConOtrosEncabezadosDetalleSeguimiento(listaDeJSON, listaEncabezados) {
    var agregarCheck = false;
    var importeConcedio = 0; var saldoActualCapital = 0; var intereses = 0; var anticipos = 0; var baseCalf = 0;
    var numNoEsCantidad = 0;
    for (var encabezados in listaDeJSON[0]) {
        if (encabezados == "FBCtaRelacionada") {
            agregarCheck = true;
            break;
        }
    }
    var cad = '<center><div class="divContenidoTabla"><table id="tblDatosDetalleCliente" class="dataGridDatos" style="width: 100%;">';
    cad += '<thead>';
    cad += '<tr>';
    cad += (agregarCheck ? '<th></th>' : '');
    for (var i = 0; i < listaEncabezados.split(',').length; i++)
        cad += '<th style="text-align: center;">' + listaEncabezados.split(',')[i] + '</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        cad += agregarCheck ? '<td style="text-align:left;" ><input class="chkEdit" type="checkbox" ' + (listaDeJSON[filas]["FBCtaRelacionada"] == "True" ? 'checked="checked"' : '') + ' disabled="disabled"></td>' : '';
        importeConcedio += parseFloat(listaDeJSON[filas]["ImporteConcedido"]);
        saldoActualCapital += parseFloat(listaDeJSON[filas]["SaldoActualCapital"]);
        intereses += parseFloat(listaDeJSON[filas]["Intereses"]);
        anticipos += parseFloat(listaDeJSON[filas]["Anticipos"]);
        baseCalf += parseFloat(listaDeJSON[filas]["Base Calificacion"]);
        numNoEsCantidad = 0;
        for (var element in json) {
            if (element != "FBCtaRelacionada") {
                if (element == "ImporteConcedido" || element == "SaldoActualCapital" || element == "Intereses" || element == "Anticipos" || element == "Base Calificacion") {
                    cad += '<td style="text-align:right;">';
                    cad += DevuelveCantidadSeparadaPorComas(json[element].indexOf('.00') == -1 ? json[element] : json[element].substring(0, json[element].length - 3));
                    cad += '</td>'
                }
                else {
                    cad += '<td style="text-align:left;" >' + json[element] + '</td>';
                    numNoEsCantidad++;
                }
            }
        }
        cad += '</tr>';
    }
    cad += '<tr style="background:rgb(239, 231, 214);font-weight: bold;color: rgb(0, 0, 0);height: 20px;">';
    cad += (agregarCheck ? '<td></td>' : '');
    for (var i = 0; i < numNoEsCantidad; i++)
        cad += '<td></td>';
    cad += '<td style="text-align:right;">' + DevuelveCantidadSeparadaPorComas(importeConcedio + "") + '</td>';
    cad += '<td style="text-align:right;">' + DevuelveCantidadSeparadaPorComas(saldoActualCapital + "") + '</td>';
    cad += '<td style="text-align:right;">' + DevuelveCantidadSeparadaPorComas(intereses + "") + '</td>';
    cad += '<td style="text-align:right;">' + DevuelveCantidadSeparadaPorComas(anticipos + "") + '</td>';
    cad += '<td style="text-align:right;">' + DevuelveCantidadSeparadaPorComas(baseCalf + "") + '</td>';
    cad += ' </tr>';
    cad += '</tbody>';

    cad += '</table></div></center>';
    return cad;
}


function CargaDatosCronologia(nombreCliente) {
    peticionAjax("BuscaCliente.aspx/DatosClienteRelacionado", "POST", { opcion: 16, nombreCliente: nombreCliente, fechaCorte: $("#txtFecha").val(), flag: -1 }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#divGdv_Crono").html(CreaTablaCronologia(JSON, "CUENTA,FECHA"));
                document.getElementById("divTblCronologia").style.width = document.getElementById("divDatosRelacionados").offsetWidth + "px";
                $("#divTblCronologia").slideDown('slide');
                $("#btnVerCronologia").val("Ocultar cronología");
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function CreaTablaCronologia(listaDeJSON, listaEncabezados) {
    var cad = '<div class="divContenidoTabla" style="width:auto;"><table class="dataGridDatos" style="width: 100%;">';
    cad += '<thead>';
    var auxJSON = listaDeJSON[0];
    var y = 0;
    for (var encabezados in auxJSON) {
        if (encabezados != "Cuenta")
            y++;
    }
    cad += '<tr>';
    for (var i = 0; i < listaEncabezados.split(',').length; i++)
        cad += '<th style="text-align: center;" ' + (listaEncabezados.split(',')[i] == "FECHA" ? 'colspan="' + y + '"' : '') + ' >' + listaEncabezados.split(',')[i] + '</th>';
    cad += '</tr>';
    cad += '<tr>';

    for (var encabezados in auxJSON) {
        cad += '<th style="text-align: center;">';
        cad += encabezados == "Cuenta" ? " " : encabezados.toString();
        cad += '</th>';
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';

    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += filas == listaDeJSON.length - 1 ? ('<tr style="background:rgb(239, 231, 214);font-weight: bold;color: rgb(0, 0, 0);height: 20px;">') : ((filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">');
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td style="text-align:left">';
            cad += element == "Cuenta" ? json[element] : DevuelveCantidadSeparadaPorComas(json[element].indexOf('.00') == -1 ? json[element] : json[element].substring(0, json[element].length - 3));
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div>';
    return cad;
}

function bntRegresar_Click() {
    $("#divRelacionados").slideUp('slide');
    $("#divMain").slideDown('slide');
}

function btnEditarDetalleCliente_Click() {
    $("#btnUpdate").show();
    $("#btnCancelar").show();
    $("#btnEditar").hide();
    $(".chkEdit").attr("disabled", false);
}

function btnCancelarDetalleCliente_Click() {
    $("#btnUpdate").hide();
    $("#btnCancelar").hide();
    $("#btnEditar").show();
    $(".chkEdit").attr("disabled", true);
}

function btnActualizarDetalleCliente_Click(obj) {
    var cadenaCheck = "";
    $('#tblDatosDetalleCliente tr').each(function () {
        if ($(this.cells[0]).find('input:checkbox').is(":checked"))
            cadenaCheck += $(this.cells[5]).html() + ",";
    });
    cadenaCheck = cadenaCheck != "" ? cadenaCheck.substring(0, cadenaCheck.length - 1) : "";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("BuscaCliente.aspx/ActualizaClienteRelacionado", "POST", { nombreCliente: $("#btnUpdate").attr("lang"), NombrePersonarelacion: (arrayParametrosClasifClient.length > 0 ? arrayParametrosClasifClient[3] : ""), CveRelacionado: 0, checksActivos: cadenaCheck, fechaCorte: $("#txtFecha").val() }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d == "")
                btnCancelarDetalleCliente_Click();
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function bntRegresarClasficacion_Click() {
    $("#divClasificacionRelacionado").slideUp('slide');
    $("#divRelacionados").slideDown('slide');
}

function btnSeguimiento_Click() {
    GuardarInfoGralClasificacion($("#txtFecha").val(), $("#btnUpdate").attr("lang"), 0, "", 0, 3);
}

function btnRecuperarHistorial_Click() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("BuscaCliente.aspx/btnRecuperarHistorial_Click", "POST", null, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "" && parseInt(data.d) > 0) {
                __doPostBack('ExportarTxtHistorial', $("#txtFecha").val());
                setTimeout(terminarWait, 10000);
            }
            else
                MostrarMsj("No hay historial disponible.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function btnMarcados_Click() {
    $("#divFechaCorte").hide();
    $("#divDatosRelacionado").hide();
    $("#divMain").show();
    $("#divRelacionados").slideUp("slide");
    $("#dvDetalleMarcados").slideDown("slide");
    $("#btnRegresarDeVerMarcados").show();
}

function btnRegresarDeVerMarcados_Click() {
    $("#divFechaCorte").show();
    $("#divDatosRelacionado").show();
    $("#divMain").hide();
    $("#btnRegresarDeVerMarcados").hide();
    $("#dvDetalleMarcados").hide();
    $("#divRelacionados").slideDown("slide");
}

function btnVerCronologia_Click(obj) {
    if ($(obj).val() == "Ver cronología") {
        $(obj).val("Ocultar cronología");
        $("#divTblCronologia").slideDown('slide');
    }
    else {
        $(obj).val("Ver cronología");
        $("#divTblCronologia").slideUp('slide');
    }
}
//------------------------------------------------------------------------CLASIFICACION--------------------------------------------------
function btnClasificar_Click(obj) {
    $("#dvRelacionados").hide();
    $("#dvTipoRelacion").hide();
    $("#dvNuevaC").hide();
    $("#btnNuevaClasificacion").val("Nuevo");
    $("#divRelacionados").slideUp('slide');
    $("#divClasificacionRelacionado").slideDown('slide');
    document.getElementById("cmbClasificacion").options.length = 0;
    $("#spErrorClasificacion").html("");
    CargaCmbClasificacion();
}

function CargaCmbClasificacion() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("BuscaCliente.aspx/ObtenerCatalogoClasificacionAndTipoRelacion", "POST", { opcion: 3 }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                var valorSelect = document.getElementById("cmbClasificacion").options.length == 0 ? "" : $("#cmbClasificacion").val();
                document.getElementById("cmbClasificacion").options.length = 0;
                var cadena = "<option value='0'>Seleccione una Opción</option>";
                for (var i = 0; i < JSON.length; i++)
                    cadena += "<option value='" + JSON[i].FICve + "' " + (valorSelect == JSON[i].FICve ? 'selected="selected"' : "") + ">" + JSON[i].FVCDescripcion + "</option>";
                $("#cmbClasificacion").html(cadena);
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        valorSelect == "" ? CargarCmbTipoRelacion() : Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function CargarCmbTipoRelacion() {
    peticionAjax("BuscaCliente.aspx/ObtenerCatalogoClasificacionAndTipoRelacion", "POST", { opcion: 9 }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                document.getElementById("cmbTipoRelacion").options.length = 0;
                var cadena = "<option value='-1'>Seleccione una Opción</option>";
                for (var i = 0; i < JSON.length; i++)
                    cadena += "<option value='" + JSON[i].dcr_cve_credrelac + "'>" + JSON[i].dcr_titulo + "</option>";
                $("#cmbTipoRelacion").html(cadena);
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
        AsignaClasificacionCliente();
    });
}

function AsignaClasificacionCliente() {
    if (arrayParametrosClasifClient.length > 0) {
        switch (parseInt(arrayParametrosClasifClient[0])) {
            case 1:
                for (var i = 0; i < document.getElementById("cmbClasificacion").options.length; i++) {
                    if (document.getElementById("cmbClasificacion").options[i].value == arrayParametrosClasifClient[1])
                        $("#cmbClasificacion").val(arrayParametrosClasifClient[1]);
                }
                $("#cmbTipoRelacion").val("-1");
                $("#cmbRelacionados").val("0");
                break;
            case 2:
                for (var i = 0; i < document.getElementById("cmbClasificacion").options.length; i++) {
                    if (document.getElementById("cmbClasificacion").options[i].textContent == "Relacionados")
                        $("#cmbClasificacion").val(document.getElementById("cmbClasificacion").options[i].value);
                }
                $("#cmbRelacionados").val("1");
                $("#dvRelacionados").show();

                for (var i = 0; i < document.getElementById("cmbTipoRelacion").options.length; i++) {
                    if (document.getElementById("cmbTipoRelacion").options[i].textContent == arrayParametrosClasifClient[2])
                        $("#cmbTipoRelacion").val(document.getElementById("cmbTipoRelacion").options[i].value);
                }
                $("#txtPersonaRelacion").val(arrayParametrosClasifClient[3]);
                $("#dvTipoRelacion").show();
                break;
            case 3:
                for (var i = 0; i < document.getElementById("cmbClasificacion").options.length; i++) {
                    if (document.getElementById("cmbClasificacion").options[i].textContent == "Relacionados")
                        $("#cmbClasificacion").val(document.getElementById("cmbClasificacion").options[i].value);
                }
                $("#cmbRelacionados").val("2");
                $("#dvRelacionados").show();
                $("#cmbTipoRelacion").val("-1");
                break;
            default:
                $("#cmbTipoRelacion").val("-1");
                $("#cmbRelacionados").val("0");
                $("#cmbClasificacion").val("0");
                break;
        }
    }
    else {
        $("#cmbTipoRelacion").val("-1");
        $("#cmbRelacionados").val("0");
        $("#cmbClasificacion").val("0");
    }
}

function cmbClasificacion_OnChange() {
    if ($("#cmbClasificacion").val() == "5")
        $("#dvRelacionados").show();
    else {
        $("#dvRelacionados").hide();
        $("#cmbRelacionados").val("0");
        $("#dvTipoRelacion").hide();
        $("#cmbTipoRelacion").val("-1");
    }
}

function cmbRelacionados_OnChange() {
    if ($("#cmbRelacionados").val() == "1")
        $("#dvTipoRelacion").show();
    else {
        $("#dvTipoRelacion").hide();
    }
}

function MuestraNueva_Click() {
    $("#txtNuevaClass").val("");
    if (document.getElementById("dvNuevaC").style.display == "none") {
        $("#btnNuevaClasificacion").val("Cancelar Nuevo");
        $("#dvNuevaC").show();
    }
    else {
        $("#btnNuevaClasificacion").val("Nuevo");
        $("#dvNuevaC").hide();
    }
}

function BtnGuardarNuevo_Click() {
    var clasificacionNew = $("#txtNuevaClass").val().replace(/^\s+|\s+$/g, "");
    if (clasificacionNew != "") {
        var flag = 0;
        for (var i = 0; i < document.getElementById("cmbClasificacion").options.length; i++) {
            if (document.getElementById("cmbClasificacion").options[i].textContent.toUpperCase() == clasificacionNew.toUpperCase()) {
                flag = 1;
                break;
            }
        }
        if (flag == 1)
            MostrarMsj("Está clasificación ya se encuentra en la lista.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        else {
            peticionAjax("BuscaCliente.aspx/AgregarNuevaClasificacion", "POST", { nuevaClasificacion: clasificacionNew }, function (data) {
                if (data.d.indexOf("Error") == -1) {
                    if (data.d == "") {
                        $("#btnNuevaClasificacion").val("Nuevo");
                        $("#dvNuevaC").hide();
                        CargaCmbClasificacion();
                    }
                }
                else {
                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                    Waiting(false, "Espere por favor. Cargando Información...");
                }
            });
        }
    }
    else
        MostrarMsj("Ingrese una Nueva Clasificación.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
}

function BtnGuardarClasificacionInfo_Click() {
    MostrarMsj("¿Está seguro de guardar la información? ", "Mensaje", true, true, false, "Si", "No", "", 300, 120,
    function () {
        $("#divVentanaMensajes").dialog("close");
        if ($("#cmbClasificacion :selected").text() != "Relacionados" && $("#cmbClasificacion").val() != "0")
            GuardarInfoGralClasificacion($("#txtFecha").val(), $("#btnUpdate").attr("lang"), 0, "", $("#cmbClasificacion").val(), 0);
        else
            $("#spErrorClasificacion").html("Antes de guardar una clasificación seleccione una de la lista.");
        if ($("#cmbRelacionados").val() != "1" && $("#cmbClasificacion").val() != "0" && $("#cmbRelacionados").val() != "0")
            GuardarInfoGralClasificacion($("#txtFecha").val(), $("#btnUpdate").attr("lang"), 0, "", 5, 2);
        else
            $("#spErrorClasificacion").html("Seleccione una Relación de la lista.");
        if ($("#cmbTipoRelacion").val() != "-1")
            GuardarInfoGralClasificacion($("#txtFecha").val(), $("#btnUpdate").attr("lang"), $("#cmbTipoRelacion").val(), $("#txtPersonaRelacion").val(), 5, 1);
        else
            $("#spErrorClasificacion").html("Seleccione un Tipo de Relación de la lista.");
    }, function () {
        $("#divVentanaMensajes").dialog("close");
    }, null);
}

function GuardarInfoGralClasificacion(fechaCorte, nombreCliente, CveRelacionado, NombrePersonarelacion, clascliente, opcionIf) {
    $("#spErrorClasificacion").html("");
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("BuscaCliente.aspx/GuardarInfoGralClasificacionOrSeguimiento", "POST", { fechaCorte: fechaCorte, nombreCliente: nombreCliente, CveRelacionado: CveRelacionado, NombrePersonarelacion: NombrePersonarelacion, clascliente: clascliente, opcionIf: opcionIf }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d == "") {
                opcionIf != 3 ? bntRegresarClasficacion_Click() : "";
                opcionIf == 3 ? $("#btnMarcados").show() : null;
            }
            var obj1 = "spanloc_" + nombreCliente;
            var domObj = document.getElementById(obj1);
            DetalleClienteRelacionado_link(domObj);
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

//----------------------------------------------- CRITERIO  DE BUSQUEDA


function btnCriterioBusqueda_Click() {
    var cadena = '<div id="divBloqVtnEnvio" style="width:96%;height:84%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:50%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetallVtnEnvio" style="width:100%;height:100%;overflow: hidden;margin-top: 0px;">  ';
    cadena += '</br><table style="width: 97%;"><tr><td style="width:15%;"><span>Nombre del cliente:</span></td><td style="width:35%;"> <input type="text" id="txtFiltroBusqueda" style="width: 100%;"   onkeydown="return KeyPressTXTFiltroBusqueda(event)"/></td></tr></table>';
    cadena += '</div></div>';
    cadena += "<div><table style='width:98%;height:8%;'><tr style='height:1%'><span id='spanError' style='color:Red'></span></tr><tr><td style='text-align:left;width: 90%;'></td><td style='text-align:right'><input id='btnBuscarFiltro' type='button' class='classButton'  value='Buscar' onclick='btnBuscarFiltro_Click()'/></td></tr></table></div>";
    $("#divCriterioBusqueda").empty();
    AgregarVtnFlotante("divCriterioBusqueda", "", "CRITERIO DE BUSQUEDA", "", cadena, 130, 400, false, false, "", "", null);
}

function btnBuscarFiltro_Click() {
    if ($("#txtFiltroBusqueda").val().trim() != "") {
        $("#divCriterioBusqueda").dialog("close");
        if ($("#txtFiltroBusqueda").val().toUpperCase() == "TODOS")
            ListaCompletaRelacionadosOrCriterioBusqueda(1, $("#txtFecha").val(), "");
        else
            ListaCompletaRelacionadosOrCriterioBusqueda(4, $("#txtFecha").val(), $("#txtFiltroBusqueda").val());
        $("#btnRegresarDeBusqueda").show();
        if (!esGerente)
            $("#dvDetalleMarcados").slideUp("slide");
    }
    else {
        $("#spanError").html("Ingrese el nombre del cliente que desee buscar.");
    }
}

function KeyPressTXTFiltroBusqueda(evt) {
    if (evt.keyCode == 13) {
        //evt.keyCode = 0;
        btnBuscarFiltro_Click();
    }
}


function btnRegresarDeBusqueda_Click() {
    if (!esGerente) {
        $("#divGridViewDatos").slideUp("slide");
        $("#dvDetalleMarcados").slideDown("slide");
    }
    else
        ListaCompletaRelacionadosOrCriterioBusqueda(1, $("#txtFecha").val(), "");
    $("#btnRegresarDeBusqueda").hide();
}