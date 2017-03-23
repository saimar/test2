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

var EsAnalista = false;
var EsGerente = false;
var Estatus = false;
var fechaCorte = "";

$(function () {
    $(".calendario").datepicker();
    $($("#txtFecha").next()).attr("disabled", true);    
});

function GetFechaCorte() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('OtrosRelacionados.aspx/ObtenerFechaCorte', "POST", null, function (data) {
        fechaCorte = data.d;
        $("#txtFecha").val(data.d);
        DeterminaEsAnalista();
        WidtDatePicker();
    }, null);
}

function DeterminaEsAnalista() {
    peticionAjax("OtrosRelacionados.aspx/DeterminaEsAnalista", "POST", null, function (data) {
        EsAnalista = data.d;
        EsGerente = EsAnalista ? false : true;
        DeterminaEstatus();
    });
}

function DeterminaEstatus() {
    peticionAjax("OtrosRelacionados.aspx/DeterminaEstatus", "POST", null, function (data) {
        Estatus = data.d;
        $("#spStatus").html(Estatus ? "Abierto" : "Cerrado");
        ValidaVistaUsuario();
        if (EsGerente && !Estatus)
            PendientesxAutorizarOrListaIndividualesSeguimiento(12, $("#txtFecha").val(), "");
        else
            PendientesxAutorizarOrListaIndividualesSeguimiento(1, $("#txtFecha").val(), "");
    });
}

var agregarCheck = false;
function ValidaVistaUsuario() {
    if (EsGerente && !Estatus) {
        $("#btnRevision").hide();
        $("#btnAutorizar").show();
        $("#btnCriterioBusqueda").hide();
        agregarCheck = true;
    }
    if (EsGerente && Estatus) {
        $("#btnRevision").hide();
        $("#btnAutorizar").hide();
        $("#btnCriterioBusqueda").hide();
        agregarCheck = false;
    }

    if (EsAnalista && !Estatus) {
        $("#btnRevision").hide();
        $("#btnAutorizar").hide();
        $("#btnCriterioBusqueda").hide();
        agregarCheck = false;
    }
    if (EsAnalista && Estatus) {
        $("#btnRevision").show();
        $("#btnAutorizar").hide();
        $("#btnCriterioBusqueda").show();
        agregarCheck = false;
    }
}

function PendientesxAutorizarOrListaIndividualesSeguimiento(opcion, fecha, clienteABuscar) {
    $("#divGridViewDatos").html("");
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("OtrosRelacionados.aspx/PendientesxAutorizarOrListaIndividualesOtrosRelacionados", "POST", { opcion: opcion, fechaOperacion: fecha, clienteABuscar: clienteABuscar }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#divGridViewDatos").html(CreaTablaConOtrosEncabezadosSeguimiento(JSON, (agregarCheck ? "NOMBRE DEL CLIENTE,COMBO DE AUTORIZADO,RELACIONADO POR,CAUSA DE LA RELACIÓN" : "NOMBRE DEL CLIENTE,PERSONA QUE DA LA RELACIÓN")));
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function CreaTablaConOtrosEncabezadosSeguimiento(listaDeJSON, listaEncabezados) {
    var cad = '<center><div class="divContenidoTabla"><table id="TblDatosClientesOtros" class="dataGridDatos" style="width: 70%;">';
    cad += '<thead>';
    cad += '<tr>';
    for (var i = 0; i < listaEncabezados.split(',').length; i++)
        cad += '<th style="text-align: center;">' + listaEncabezados.split(',')[i] + '</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element == "DNC_NOMCLIENTE") {
                cad += '<td style="text-align:left;text-decoration: underline;color: rgb(0, 0, 255);cursor:pointer;" lang="' + (listaDeJSON[filas]["DNC_NOMCLIENTE"] + '%%&&' + fechaCorte) + '" onclick="VerDetalleCliente(this);">' + json[element] + '</td>';
                cad += agregarCheck ? '<td><input type="checkbox"/></td>' : '';
            }
            else
                cad += '<td style="text-align:left;" >' + json[element] + '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div></center>';
    return cad;
}

function VerDetalleCliente(obj) {
    $("#btnVerCronologia").val("Ver cronología");
    $("#divGdv_Crono").html("");
    $("#divDatosRelacionados").html("");
    $("#divTblCronologia").hide();
    $("#btnUpdate").attr("lang", $(obj).attr("lang").split('%%&&')[0]);
    $("#btnMarcar").attr("lang", $(obj).attr("lang").split('%%&&')[0]);
    $("#btnTerminar").attr("lang", $(obj).attr("lang").split('%%&&')[0]);
    BtnCancelarEdicion_Click();

    var fechaInicio = '---';
    var fechaFin = '---';
    $("#divMain").slideUp('slide');
    $("#divDetalleIndividuales").slideDown('slide');
    $("#spCliente").html(" Nombre:" + $(obj).attr("lang").split('%%&&')[0]);
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("OtrosRelacionados.aspx/EsRelacionadoInd", "POST", { nombreCliente: $(obj).attr("lang").split('%%&&')[0] }, function (data) {
        if (data.d) {
            $("#btnMarcar").hide();
            $("#txtCausa").attr("disabled", true);
            $("#txtRelacionadoPor").attr("disabled", true);
            peticionAjax("OtrosRelacionados.aspx/DatosINDRelacionado", "POST", { nombreCliente: $(obj).attr("lang").split('%%&&')[0] }, function (data) {
                if (data.d.indexOf("Error") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSON(data.d, false);
                        if (JSON.length > 0) {
                            $("#txtCausa").val(JSON[0]["titulo_motivo"]);
                            $("#txtCausa").attr("title", JSON[0]["DESCRIPCION"]);
                            $("#txtRelacionadoPor").val(JSON[0]["FVCClientePadre"]);
                            $("#txtRelacionadoPorMI").val(JSON[0]["FVCClientePadre"]);
                            fechaInicio = JSON[0]["FDFechaInicio"];
                            fechaFin = JSON[0]["FDFechaFin"];
                        }
                    }
                    $("#spFechaRelacion").html("Relacionado desde: " + fechaInicio);
                }
                else
                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                peticionAjax("OtrosRelacionados.aspx/DatosINDRelacionado", "POST", { nombreCliente: $(obj).attr("lang").split('%%&&')[0] }, function (data) {
                    if (data.d) {
                        $("#btnMarcar").show();
                        $("#spFechaRelacion").html($("#spFechaRelacion").html() + " hasta " + fechaFin);
                    }
                    $("#trRelacion").show();
                    LlenarGridView($(obj).attr("lang").split('%%&&')[0], 1);
                   // Waiting(false, "Espere por favor. Cargando Información...");
                });
            });
        }
        else {
            $("#btnTerminar").hide();
            $("#trRelacion").hide();
            //Waiting(false, "Espere por favor. Cargando Información..."); 
            LlenarGridView($(obj).attr("lang").split('%%&&')[0], 0);
        }
    });
    if (EsGerente) {
        $("#btnEditar").hide();
        $("#btnMarcar").hide();
        $("#btnTerminar").hide();
    }
}

function LlenarGridView(nombreCliente, flag) {
    peticionAjax("OtrosRelacionados.aspx/LlenarGridView", "POST", { flag: flag, fechaOperacion: fechaCorte, nombreCliente: nombreCliente }, function (data) {
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
    var agregarCheckDetalle = false;
    var importeConcedio = 0; var saldoActualCapital = 0; var intereses = 0; var anticipos = 0; var baseCalf = 0;
    var numNoEsCantidad = 0;
    for (var encabezados in listaDeJSON[0]) {
        if (encabezados == "FBCtaRelacionada") {
            agregarCheckDetalle = true;
            break;
        }
    }
    var cad = '<center><div class="divContenidoTabla"><table id="tblDatosDetalleCliente" class="dataGridDatos" style="width: 100%;">';
    cad += '<thead>';
    cad += '<tr>';
    cad += (agregarCheckDetalle ? '<th></th>' : '');
    for (var i = 0; i < listaEncabezados.split(',').length; i++)
        cad += '<th style="text-align: center;">' + listaEncabezados.split(',')[i] + '</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        cad += agregarCheckDetalle ? '<td style="text-align:left;" ><input class="chkEdit" type="checkbox" ' + (listaDeJSON[filas]["FBCtaRelacionada"] == "True" ? 'checked="checked"' : '') + ' disabled="disabled"></td>' : '';
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
    cad += (agregarCheckDetalle ? '<td></td>' : '');
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
    peticionAjax("OtrosRelacionados.aspx/GetCronologia", "POST", { nombreCliente: nombreCliente, fechaOperacion: $("#txtFecha").val() }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#divGdv_Crono").html(CreaTablaCronologia(JSON, "CUENTA,FECHA"));
                document.getElementById("divTblCronologia").style.width = document.getElementById("divDatosRelacionados").offsetWidth + "px";
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


function btnEditarDetalleCliente_Click() {
    $("#btnUpdate").show();
    $("#btnCancelar").show();
    $("#btnEditar").hide();
    $("#txtRelacionadoPor").attr("disabled", false);
    $("#selectCausa").show();
    $(".chkEdit").attr("disabled", false);
    $("#txtCausa").hide();
    if (document.getElementById('selectCausa').options.length == 0)
        LlenaComboCausas();
    else { 
        for (var i = 0; i < document.getElementById('selectListaCausa').options.length ; i++) {
            if ($("#txtCausa").val() == document.getElementById('selectCausa').options[i].text) {
                $("#selectCausa").val(document.getElementById('selectCausa').options[i].value);
                $("#selectListaCausa").val(document.getElementById('selectCausa').options[i].value);  
                break;
            }
        } 
    }
}

function LlenaComboCausas() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("OtrosRelacionados.aspx/GetCausas", "POST", null, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                document.getElementById('selectCausa').options.length = 0;
                document.getElementById('selectListaCausa').options.length = 0;
                var cad = '<option value="0">-- Seleccionar --</option>';
                var val = "";
                for (var i = 0; i < JSON.length; i++) {
                    if ($("#txtCausa").val() == JSON[i].dcr_titulo)
                        val = JSON[i].dcr_cve_credrelac;
                    cad += '<option value="' + JSON[i].dcr_cve_credrelac + '" title="' + JSON[i].dcr_credrelac + '" >' + JSON[i].dcr_titulo + '</option>';
                }
                $("#selectCausa").html(cad);
                $("#selectListaCausa").html(cad);
                $("#selectCausa").val(val);
                $("#selectListaCausa").val(val);
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function btnActualizarDetalleCliente_Click(obj) {
    var cadenaCheck = "";
    $('#tblDatosDetalleCliente tr').each(function () {
        if ($(this.cells[0]).find('input:checkbox').is(":checked"))
            cadenaCheck += $(this.cells[5]).html() + ",";
    });
    cadenaCheck = cadenaCheck != "" ? cadenaCheck.substring(0, cadenaCheck.length - 1) : "";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("OtrosRelacionados.aspx/ActualizarDetalleCliente", "POST", { nombreCliente: $("#btnUpdate").attr("lang"), relacionadoPor: $("#txtRelacionadoPor").val(), valorSelectCausa: $("#selectCausa").val(), checksActivos: cadenaCheck }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d == "")
                BtnCancelarEdicion_Click();
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function BtnCancelarEdicion_Click() {
    $("#btnUpdate").hide();
    $("#btnCancelar").hide();
    $("#btnEditar").show();
    $("#txtRelacionadoPor").attr("disabled", true);
    $("#selectCausa").hide();
    $(".chkEdit").attr("disabled", true);
    $("#txtCausa").show();
}

function bntRegresarMI_Click() {
    $("#divMarcarIndividuales").slideUp('slide');
    $("#divDetalleIndividuales").slideDown('slide');
}

function btnRegresarBusqueda_Click() {
    $("#btnRegresarBusqueda").hide();
    if (EsGerente && !Estatus)
        PendientesxAutorizarOrListaIndividualesSeguimiento(12, $("#txtFecha").val(), "");
    else
        PendientesxAutorizarOrListaIndividualesSeguimiento(1, $("#txtFecha").val(), "");
}

function btnTerminar_Click(obj) {
    MostrarMsj("Se va a marcar el cliente como no relacionado. ¿Desea continuar?", "Mensaje", true, false, true, "Si", "", "No", 280, 120,
            function BtnSiValoresDef() {
                $("#divVentanaMensajes").dialog("close");
                Waiting(true, "Espere por favor. Cargando Información...");
                peticionAjax("OtrosRelacionados.aspx/BtnTerminar", "POST", { nombreCliente: $(obj).attr("lang") }, function (data) {
                    if (data.d.indexOf("Error") == -1) {
                        if (data.d == "") {
                            $("#divDetalleIndividuales").slideUp('slide');
                            $("#divMain").slideDown('slide');
                        }
                    }
                    else
                        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                    Waiting(false, "Espere por favor. Cargando Información...");
                });
            }, null, function BtnNoValoresDef() { $("#divVentanaMensajes").dialog("close"); });
}

function btnMarcar_Click(obj) {
    $("#divDetalleIndividuales").slideUp('slide');
    $("#divMarcarIndividuales").slideDown('slide');
    if ($(obj).attr("lang") != null && $(obj).attr("lang") != undefined && $(obj).attr("lang") != "") {
        $("#spClienteMI").html("Nombre: " + $(obj).attr("lang"));
        document.getElementById('selectCausa').options.length == 0 ? LlenaComboCausas() : null;
    }
}

function btnMarcarMI_Click() {
    if ($("#selectCausa").val() != "0") {
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("OtrosRelacionados.aspx/btnMarcarMI_Click", "POST", { nombreCliente: $("#btnMarcar").attr("lang"), valorSeleccionadoCausa: $("#selectCausa").val(), txtRelacionadoPor: $("#txtRelacionadoPorMI").val() }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    $("#divMarcarIndividuales").slideUp('slide');
                    $("#divMain").slideDown('slide');
                }
            }
            else
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        });
    }
}

function bntRegresar_Click() {
    $("#divDetalleIndividuales").slideUp('slide');
    $("#divMain").slideDown('slide');
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
    document.getElementById("divTblCronologia").style.width = document.getElementById("divDatosRelacionados").offsetWidth + "px";
}

//---------------------------------------------------------Envio Mail
function MostrarVtnBusqueda_Click(opcionBoton) {
    var clientesToAutorizar = ""; var clientesToRechazar = "";
    $('#TblDatosClientesOtros tr').each(function () {
        if (this.cells.length > 1) {
            if ($(this.cells[1]).find('input:checkbox').length > 0) {
                if ($(this.cells[1]).find('input:checkbox').is(":checked"))
                    clientesToAutorizar += this.cells[0].innerText + ",";
                else
                    clientesToRechazar += this.cells[0].innerText + ",";
            }
        }
    });
    clientesToAutorizar = clientesToAutorizar.length > 0 ? clientesToAutorizar.substring(0, clientesToAutorizar.length - 1) : "";
    clientesToRechazar = clientesToRechazar.length > 0 ? clientesToRechazar.substring(0, clientesToRechazar.length - 1) : "";
    if (($('#TblDatosClientesOtros tr').length - 1 == clientesToAutorizar.split(',').length) || EsAnalista) {
        MostrarVtnBusqueda(opcionBoton, clientesToAutorizar, clientesToRechazar);
    }
    else {
        MostrarMsj("Los clientes NO seleccionados serán rechazados. ¿Desea Continuar? ", "Mensaje", true, true, false, "Si", "No", "", 300, 120,
        function () {
            $("#divVentanaMensajes").dialog("close");
            MostrarVtnBusqueda(opcionBoton, clientesToAutorizar, clientesToRechazar);
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
    }
}


function MostrarVtnBusqueda(opcionBoton, clientesToAutorizar, clientesToRechazar) {
    var cadena = '<div id="divBloqVtnEnvio" style="width:96%;height:84%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:70%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetallVtnEnvio" style="width:100%;height:100%;overflow: hidden;margin-top: 0px;">  ';
    cadena += '<center style="text-align: left;">Adjuntar Nota Clientes Relacionados: <span id="spNotaCliente" style="font-weight:bold;">' + opcionBoton + '</span></center></br>';
    cadena += '<div style="height: 65%;overflow: hidden;"><table style="width:100%;height: 100%;"><tr style="width:100%;height: 100%;"><td style="width:10%">Nota:</td><td style="width:90%"> <textarea cols="30" rows="2" id="txtComentario" style="font-size:10px;resize: none;background-color:White;width:90%; text-align:left;height:80px;border:x"></textarea></td></tr></table></div>';
    cadena += '</div></div>';
    cadena += "<div><table style='width:100%;height:8%;margin-left: 17%;'><tr style='height:1%'></tr><tr><td style='text-align:left;width: 50%;'></td><td style='text-align:right'><table><tr><td><input id='btnAceptarEnvio' alt='" + opcionBoton + "' type='button' class='classButton'  value='Continuar'/></td><td style='width:10px;'></td><td></input><input id='btnCancelarEnvio' type='button' class='classButton'  value='Cancelar'/></td></tr></table></td></div>";
    $("#divEnvioMail").empty();
    AgregarVtnFlotante("divEnvioMail", "", opcionBoton.toUpperCase() + " CLIENTES RELACIONADOS", "", cadena, 200, 400, false, false, "", "", null);
    $("#btnAceptarEnvio").on("click",
        function () {
            $("#divEnvioMail").dialog("close");
            Waiting(true, "Espere por favor. Cargando Información...");
            var parametros = {
                valor: (opcionBoton == "Revisión" ? 0 : 1),
                esGerente: EsGerente,
                esAnalista: EsAnalista,
                status: Estatus,
                clientesToAutorizar: clientesToAutorizar,
                clientesToRechazar: clientesToRechazar,
                fechaCorte: $("#txtFecha").val(),
                Comentario: $("#txtComentario").val()
            };
            peticionAjax('OtrosRelacionados.aspx/BtnContinuarEnvioMail_Click', "POST", parametros, function (data) {
                if (data.d == "") {
                    MostrarMsj("Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    DeterminaEstatus();
                }
                else {
                    MostrarMsj("Error " + data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    Waiting(false, "Espere por favor. Cargando Información...");
                }
            }, null);

        });
    $("#btnCancelarEnvio").on("click",
        function () {
            $("#divEnvioMail").dialog("close");
        });
}

function btnCriterioBusqueda_Click() {
    var cadena = '<div id="divBloqVtnEnvio" style="width:96%;height:84%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:50%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetallVtnEnvio" style="width:100%;height:100%;overflow: hidden;margin-top: 0px;">  ';
    cadena += '<table style="width: 99%;"><tr><td style="width:35%;text-align: left;">Fecha:</td><td style="width:62%;text-align: left;"><input type="text" id="txtFechaBusqueda" maxlength="10" style="width: 85%;font-size:10px" class="calendario"/><td></tr>'
    cadena += '<tr><td style="width:35%;text-align: left;"><span>Nombre del cliente:</span></td><td style="width:62%;text-align: left;"> <input type="text" id="txtFiltroBusqueda" style="width: 96%;font-size:10px" onkeydown="return KeyPressTXTFiltroBusqueda(event)"/></td></tr></table>';
    cadena += '</div></div>';
    cadena += "<div><table style='width:98%;'><tr style='height:1%'><span id='spanError' style='color:Red'></span></tr><tr><td style='text-align:left;width: 90%;'></td><td style='text-align:right'><input id='btnBuscarFiltro' type='button' class='classButton'  value='Buscar' onclick='btnBuscarFiltro_Click()'/></td></tr></table></div>";
    $("#divCriterioBusqueda").empty();
    AgregarVtnFlotante("divCriterioBusqueda", "", "CRITERIO DE BUSQUEDA", "", cadena, 140, 400, false, false, "", "", null);
    $(".calendario").datepicker();
    $("#txtFechaBusqueda").val($("#txtFecha").val());
}


function btnBuscarFiltro_Click() {
    if ($("#txtFiltroBusqueda").val().trim() != "" && $("#txtFechaBusqueda").val().trim() != "" && $("#txtFechaBusqueda").val().split('/').length == 3) {
        $("#divCriterioBusqueda").dialog("close");
        if ($("#txtFiltroBusqueda").val().toUpperCase() == "TODOS") {
            if (EsGerente && !Estatus)
                PendientesxAutorizarOrListaIndividualesSeguimiento(12, $("#txtFecha").val(), "");
            else
                PendientesxAutorizarOrListaIndividualesSeguimiento(1, $("#txtFecha").val(), "");
        }
        else {
            $("#btnRegresarBusqueda").show();
            PendientesxAutorizarOrListaIndividualesSeguimiento(4, $("#txtFechaBusqueda").val(), $("#txtFiltroBusqueda").val());
        }
    }
    else {
        $("#spanError").html("Ingrese la fecha y el nombre del cliente que desee buscar.");
    }
}

function KeyPressTXTFiltroBusqueda(evt) {
    if (evt.keyCode == 13) {
        //evt.keyCode = 0;
        btnBuscarFiltro_Click();
    }
}