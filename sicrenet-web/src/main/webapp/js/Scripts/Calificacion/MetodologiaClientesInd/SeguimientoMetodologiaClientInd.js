var EsAnalista = false;
var EsGerente = false;
var Estatus = false;
var fechaCorte = "";

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
    
});

function GetFechaCorte() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('SeguimientoMetodologiaIndividuales.aspx/ObtenerFechaCorte', "POST", null, function (data) {
        fechaCorte = data.d;
        DeterminaEsAnalista();
    }, null);
}

function DeterminaEsAnalista() {
    peticionAjax("SeguimientoMetodologiaIndividuales.aspx/DeterminaEsAnalista", "POST", null, function (data) {
        EsAnalista = data.d;
        EsGerente = EsAnalista ? false : true;
        DeterminaEstatus();
    });
}

function DeterminaEstatus() {
    peticionAjax("SeguimientoMetodologiaIndividuales.aspx/DeterminaEstatus", "POST", null, function (data) {
        Estatus = data.d;
        $("#spStatus").html(Estatus ? "Abierto" : "Cerrado");
        ValidaVistaUsuario();
        if (EsGerente && !Estatus)
            PendientesxAutorizarOrListaIndividualesSeguimiento(12);
        else
            PendientesxAutorizarOrListaIndividualesSeguimiento(1);
    });
}

function ValidaVistaUsuario() {
    if (EsGerente && !Estatus) {
        $("#btnRevision").hide();
        $("#btnAutorizar").show();
        $("#btnCriterioBusqueda").hide();
    }
    if (EsGerente && Estatus) {
        $("#btnRevision").hide();
        $("#btnAutorizar").hide();
        $("#btnCriterioBusqueda").hide();
    }

    if (EsAnalista && !Estatus) {
        $("#btnRevision").hide();
        $("#btnAutorizar").hide();
        $("#btnCriterioBusqueda").hide();
    }
    if (EsAnalista && Estatus) {
        $("#btnRevision").show();
        $("#btnAutorizar").hide();
        $("#btnCriterioBusqueda").show();
    }
}

function PendientesxAutorizarOrListaIndividualesSeguimiento(opcion) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("SeguimientoMetodologiaIndividuales.aspx/PendientesxAutorizarOrListaIndividualesSeguimiento", "POST", { opcion: opcion }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#divGridViewDatos").html(CreaTablaConOtrosEncabezadosSeguimiento(JSON, "NOMBRE DEL CLIENTE,PERSONA QUE DA LA RELACIÓN"));
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function CreaTablaConOtrosEncabezadosSeguimiento(listaDeJSON, listaEncabezados) {
    var cad = '<center><div class="divContenidoTabla"><table class="dataGridDatos" style="width: 70%;">';
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
            if (element == "DNC_NOMCLIENTE")
                cad += '<td style="text-align:left;text-decoration: underline;color: rgb(0, 0, 255);cursor:pointer;" lang="' + (listaDeJSON[filas]["DNC_NOMCLIENTE"] + '%%&&' + fechaCorte) + '" onclick="VerDetalleCliente(this);">' + json[element] + '</td>';
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
    peticionAjax("SeguimientoMetodologiaIndividuales.aspx/EsRelacionadoInd", "POST", { nombreCliente: $(obj).attr("lang").split('%%&&')[0] }, function (data) {
        if (data.d) {
            $("#btnMarcar").hide();
            $("#txtCausa").attr("disabled", true);
            $("#txtRelacionadoPor").attr("disabled", true);
            peticionAjax("SeguimientoMetodologiaIndividuales.aspx/DatosINDRelacionado", "POST", { nombreCliente: $(obj).attr("lang").split('%%&&')[0] }, function (data) {
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
                peticionAjax("SeguimientoMetodologiaIndividuales.aspx/DatosINDRelacionado", "POST", { nombreCliente: $(obj).attr("lang").split('%%&&')[0] }, function (data) {
                    if (data.d) {
                        $("#btnMarcar").show();
                        $("#spFechaRelacion").html($("#spFechaRelacion").html() + " hasta " + fechaFin);
                    }
                    LlenarGridView($(obj).attr("lang").split('%%&&')[0]);
                    //Waiting(false, "Espere por favor. Cargando Información...");
                });
            });
        }
        else {
            $("#btnTerminar").hide();
            $("#trRelacion").hide();
        }
    });
    if (EsGerente) {
        $("#btnEditar").hide();
        $("#btnMarcar").hide();
        $("#btnTerminar").hide();
    }
}

function LlenarGridView(nombreCliente) {
    var flag;
    if (document.getElementById("txtCausa").style.display != "none" || document.getElementById("selectCausa").style.display != "none")
        flag = 1;
    else
        flag = 0;
    peticionAjax("SeguimientoMetodologiaIndividuales.aspx/LlenarGridView", "POST", { flag: flag, fechaOperacion: fechaCorte, nombreCliente: nombreCliente }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#divGridViewDatosCliente").html(CreaTablaConOtrosEncabezadosDetalleSeguimiento(JSON, "ESTATUS,ID CLIENTE,Sistema,PRODUCTO,CREDITO,IMPORTE CONCEDIDO,SALDO CAPITAL,INTERESES,ANTICIPOS,BASE CALIFICACIÓN"));
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
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
        cad += agregarCheck ? '<td style="text-align:left;" ><input type="checkbox" ' + (listaDeJSON[filas]["FBCtaRelacionada"] == "True" ? 'checked="checked"' : '') + ' disabled="disabled"></td>' : '';
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

function btnEditarDetalleCliente_Click() {
    $("#btnUpdate").show();
    $("#btnCancelar").show();
    $("#btnEditar").hide();
    $("#txtRelacionadoPor").attr("disabled", false);
    $("#selectCausa").show();
    if (document.getElementById('selectCausa').options.length == 0)
        LlenaComboCausas();
    else {
        for (var i = 0; i < document.getElementById('selectListaCausa').options.length; i++) {
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
    peticionAjax("SeguimientoMetodologiaIndividuales.aspx/GetCausas", "POST", null, function (data) {
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
    peticionAjax("SeguimientoMetodologiaIndividuales.aspx/ActualizarDetalleCliente", "POST", { nombreCliente: $("#btnUpdate").attr("lang"), relacionadoPor: $("#txtRelacionadoPor").val(), valorSelectCausa: $("#selectCausa").val(), checksActivos: cadenaCheck }, function (data) {
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
}

function bntRegresarMI_Click() {
    $("#divMarcarIndividuales").slideUp('slide');
    $("#divMain").slideDown('slide');
}

function btnTerminar_Click(obj) {
    MostrarMsj("Se va a marcar el cliente como No relacionado. ¿Desea continuar?", "Mensaje", true, false, true, "Si", "", "No", 280, 120,
            function BtnSiValoresDef() {
                $("#divVentanaMensajes").dialog("close");
                Waiting(true, "Espere por favor. Cargando Información...");
                peticionAjax("SeguimientoMetodologiaIndividuales.aspx/BtnTerminar", "POST", { nombreCliente: $(obj).attr("lang") }, function (data) {
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
        peticionAjax("SeguimientoMetodologiaIndividuales.aspx/btnMarcarMI_Click", "POST", { nombreCliente: $("#btnMarcar").attr("lang"), valorSeleccionadoCausa: $("#selectCausa").val(), txtRelacionadoPor: $("#txtRelacionadoPorMI").val() }, function (data) {
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




