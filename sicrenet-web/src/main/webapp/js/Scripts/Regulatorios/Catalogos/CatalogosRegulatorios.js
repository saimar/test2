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
});

function ObtenerFechaActual() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/DevuelveFechaActual", "POST", null, function (data) {
        $("#txtFechaINPC").val(data.d);
        WidtDatePicker();
        SeleccionCatalogo();
    });
}


function SeleccionCatalogo() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/SeleccionCatalogo", "POST", { valueSelect: $("#cmbCatalogoRegulatorios").val() }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            $("#divgvcatregula1").html("");
            $("#divgvcatregula2").html("");
            if (data.d.split("%%&&")[0] != "") {
                var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                if ($("#cmbCatalogoRegulatorios").val() != "RI") {
                    $("#divgvcatregula1").slideDown('slow');
                    $("#divgvcatregula2").slideUp('slow');
                    $("#divcatregula3").slideUp('slow');
                    $("#dv_INPC").slideUp('slow');
                    $("#divNewReg0").slideUp('slow');
                    $("#divNewReg1").slideUp('slow');
                    $("#divNewReg2").slideUp('slow');
                    $("#divgvcatregula1").html(CreaTablaCatalogos(JSON, false, false, $("#cmbCatalogoRegulatorios").val() == "CTSIC" ? true : false));
                }
                else {
                    $("#divgvcatregula1").slideUp('slow');
                    $("#divgvcatregula2").slideDown('slow');
                    $("#divcatregula3").slideUp('slow');
                    $("#dv_INPC").slideUp('slow');
                    $("#divNewReg0").slideUp('slow');
                    $("#divNewReg1").slideUp('slow');
                    $("#divNewReg2").slideUp('slow');
                    $("#divgvcatregula2").html(CreaTablaCatalogos(JSON, true, false, $("#cmbCatalogoRegulatorios").val() == "CTSIC" ? true : false));
                }
            }
            if (data.d.split("%%&&")[1] != "" && data.d.split("%%&&")[1] != undefined) {
                var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                if ($("#cmbCatalogoRegulatorios").val() == "TM") {
                    $("#txtFechaMoneda").val("");
                    $("#txtTipocambio").val("");
                    $("#divgvcatregula1").slideUp('slow');
                    $("#divgvcatregula2").slideUp('slow');
                    $("#divcatregula3").slideDown('slow');
                    $("#divNewReg0").slideUp('slow');
                    $("#divNewReg1").slideUp('slow');
                    $("#divNewReg2").slideUp('slow');
                    $("#dv_INPC").slideUp('slow');
                    var cad = '';
                    for (var x = 0; x < JSON.length; x++) {
                        cad += '<option value="' + JSON[x].FICveMoneda + '">';
                        cad += JSON[x].FVCDescripcion;
                        cad += '</option>';
                    }
                    $("#cmbTipoMoneda").html(cad);
                }
                else if ($("#cmbCatalogoRegulatorios").val() == "INPC") {
                    $("#divgvcatregula1").slideUp('slow');
                    $("#divgvcatregula2").slideUp('slow');
                    $("#divcatregula3").slideUp('slow');
                    $("#dv_INPC").slideDown('slow');
                    $("#divNewReg0").slideUp('slow');
                    $("#divNewReg1").slideUp('slow');
                    $("#divNewReg2").slideUp('slow');
                    $("#divgv_CatINPC").html(CreaTablaCatalogos(JSON, false, true, $("#cmbCatalogoRegulatorios").val() == "CTSIC" ? true : false));
                }
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        setTimeout(terminarWait, 700);
    }, null);
}

var nombreCampos = "";
function CreaTablaCatalogos(listaDeJSON, esRelacionadosInternos, esINPC, esClientesSIC) {
    var cad = '<div class="divContenidoTabla" style="width:auto;"><center><table style="' + (esRelacionadosInternos ? 'width: 99%;' : 'width: 80%;') + '"> <tr><td colspan="4" style="text-align: left;">Buscar: <input type="text" id="txtBuscarCadena" onkeyup="busquedaPalabraEnTabla();" /></td></tr></table><table class="dataGridDatos" id="tablaCatalogos" style="' + (esRelacionadosInternos ? 'width: 99%;' : 'width: 80%;') + '">';

    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    if (!esRelacionadosInternos && !esINPC && !esClientesSIC) {
        cad += '<th style="text-align: center;"> Clave</th>';
        cad += '<th style="text-align: center;"> Descripción</th>';
    }
    else if (esRelacionadosInternos) {
        cad += '<th style="text-align: center;"> Clave</th>';
        cad += '<th style="text-align: center;"> Acreditado relacionado</th>';
        cad += '<th style="text-align: center;"> Tipo acreditado relacionado</th>';
        cad += '<th style="text-align: center;"> Descripción</th>';
    }
    else if (esClientesSIC) {
        cad += '<th style="text-align: center;"> ID Cliente</th>';
        cad += '<th style="text-align: center;"> RFC</th>';
        cad += '<th style="text-align: center;"> Nombre</th>';
        cad += '<th style="text-align: center;"> Grupo Riesgo</th>';
    }
    else if (esINPC) {
        for (var encabezados in auxJSON)
            cad += '<th style="text-align: center;">' + encabezados.toString() + '</th>';
    }
    nombreCampos = "";
    for (var encabezados in auxJSON)
        nombreCampos += encabezados.toString() + "_";

    !esINPC ? (cad += '<th style="text-align: center;width:100px;"><img lang="' + (!esRelacionadosInternos && !esINPC && !esClientesSIC ? 'NoRI' : (esClientesSIC ? 'esClientesSIC' : 'SiRI')) + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.png" style="cursor:pointer" Title="Crear Nuevo" onclick="NuevoRegistro_Click(this)"/></th>') : null;
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody style="font-size: 9px;">';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        var indexCol = 0;
        for (var element in json) {
            cad += '<td style="text-align:left;' + (!esINPC ? (esRelacionadosInternos ? (indexCol == 2 || indexCol == 3 ? 'width:15%' : 'width:10%') : (indexCol == 0 ? 'width:5%' : 'width:20%')) : '') + '">';
            cad += '<span class="NoEdit_' + (esRelacionadosInternos ? 'RI' : '') + filas + '">' + json[element] + '</span>';
            !esINPC ? (cad += indexCol == 0 ? '<input id="campo' + (indexCol + (esRelacionadosInternos ? '_RI' : '_') + filas) + '" lang="' + element.toString() + '" class="Edit_' + (esRelacionadosInternos ? 'RI' : '') + filas + '" type="text" value="' + json[element] + '" style="display:none;width:99%;font-size: 9px;" disabled="disabled"/>' : '<textarea id="campo' + (indexCol + (esRelacionadosInternos ? '_RI' : '_') + filas) + '" lang="' + element.toString() + '" cols="30" rows="2" class="Edit_' + (esRelacionadosInternos ? 'RI' : '') + filas + '" type="text" style="resize: none;display:none;width:99%;font-size: 9px;">' + json[element] + '</textarea>') : null;
            cad += '</td>';
            indexCol++;
        }
        if (!esINPC) {
            cad += '<td style="text-align:center;width:10%">';
            cad += '<img id="imgEdit_' + (esRelacionadosInternos ? 'RI' : '') + filas + '" src="../../Images/PanelDeControl/edit.png" style="height:17px;width:15px;cursor:pointer" Title="Editar" onclick="EditarCampos_Click(this)"/>&nbsp&nbsp';
            cad += '<img id="imgBorrar_' + (esRelacionadosInternos ? 'RI' : '') + filas + '" src="../../Images/Grales/delete.png"/ style="height:13px;width:13px;cursor:pointer" Title="Borrar" onclick="BorrarRegistro_Click(this)">';
            cad += '<img id="imgActualizar_' + (esRelacionadosInternos ? 'RI' : '') + filas + '" lang="' + (!esRelacionadosInternos && !esINPC && !esClientesSIC ? 'NoRI' : (esClientesSIC ? 'esClientesSIC' : 'SiRI')) + '" src="../../Images/Grales/Correcto.png" style="height:15px;width:15px;display:none;cursor:pointer" Title="Actualizar" onclick="ActualizarRegistro(this)"/>&nbsp&nbsp';
            cad += '<img id="imgCancelar_' + (esRelacionadosInternos ? 'RI' : '') + filas + '" src="../../Images/Grales/Deletefile.png" style="height:15px;width:15px;display:none;cursor:pointer" Title="Cancelar" onclick="CancelarEdicion_Click(this)"/>';
            cad += "</td>";
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center></div>';
    return cad;
}

function busquedaPalabraEnTabla() {
    var tableReg = document.getElementById('tablaCatalogos');
    var searchText = document.getElementById('txtBuscarCadena').value.toLowerCase();
    for (var i = 1; i < tableReg.rows.length; i++) {
        var cellsOfRow = tableReg.rows[i].getElementsByTagName('td');
        var found = false;
        for (var j = 0; j < cellsOfRow.length && !found; j++) {
            var compareWith = cellsOfRow[j].innerHTML.toLowerCase();
            if (searchText.length == 0 || (compareWith.indexOf(searchText) > -1)) {
                found = true;
            }
        }
        if (found)
            tableReg.rows[i].style.display = '';
        else
            tableReg.rows[i].style.display = 'none';
    }
}


function EditarCampos_Click(obj) {
    $(obj).hide();
    $("#imgBorrar_" + $(obj).attr("id").split("_")[1]).hide();
    $("#imgActualizar_" + $(obj).attr("id").split("_")[1]).show();
    $("#imgCancelar_" + $(obj).attr("id").split("_")[1]).show();
    $(".NoEdit_" + $(obj).attr("id").split("_")[1]).hide();
    $(".Edit_" + $(obj).attr("id").split("_")[1]).show();
}

function CancelarEdicion_Click(obj) {
    $(obj).hide();
    $("#imgEdit_" + $(obj).attr("id").split("_")[1]).show();
    $("#imgBorrar_" + $(obj).attr("id").split("_")[1]).show();
    $("#imgActualizar_" + $(obj).attr("id").split("_")[1]).hide();
    $(".NoEdit_" + $(obj).attr("id").split("_")[1]).show();
    $(".Edit_" + $(obj).attr("id").split("_")[1]).hide();
}

function BorrarRegistro_Click(obj) {
    MostrarMsj("¿Está seguro de <span style='font-weight:bold;'>BORRAR</span> el registro?", "Mensaje", true, false, true, "Si", "", "No", 280, 120,
            function BtnSi() {
                Waiting(true, "Espere por favor. Cargando Información...");
                peticionAjax("Default.aspx/BorrarRegistro", "POST", { nombreColumna: $("#campo0_" + $(obj).attr("id").split("_")[1]).attr("lang"), ValorClave: $("#campo0_" + $(obj).attr("id").split("_")[1]).attr("value"), opcionCombo: $("#cmbCatalogoRegulatorios").val() }, function (data) {
                    if (data.d.indexOf("Error") == -1) {
                        if (data.d == "") {
                            MostrarMsj("El registro ha sido borrado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                            SeleccionCatalogo();
                        }
                    }
                    else {
                        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                        Waiting(false, "Espere por favor. Cargando Información...");
                    }
                });
            }, null, function BtnNo() { $("#divVentanaMensajes").dialog("close"); });
}

function ActualizarRegistro(obj) {
    var parametros;
    if ($(obj).attr("lang") == "NoRI")
        parametros = {
            CampoClave: $("#campo0_" + $(obj).attr("id").split("_")[1]).attr("lang"),
            ValorClave: $("#campo0_" + $(obj).attr("id").split("_")[1]).attr("value"),
            CampoAcreditRel: '', ValorAcreditRel: '', CampoTipoAcreditRel: '', ValorTipoAcreditRel: '',
            CampoDescrip: $("#campo1_" + $(obj).attr("id").split("_")[1]).attr("lang"),
            ValorDescrip: $("#campo1_" + $(obj).attr("id").split("_")[1]).val(),
            opcionTabla: $(obj).attr("lang")
        };
    else if ($(obj).attr("lang") == "esClientesSIC") 
        parametros = {
            CampoClave: $("#campo0_" + $(obj).attr("id").split("_")[1]).attr("lang"),
            ValorClave: $("#campo0_" + $(obj).attr("id").split("_")[1]).val(),
            CampoAcreditRel: $("#campo1_" + $(obj).attr("id").split("_")[1]).attr("lang"),
            ValorAcreditRel: $("#campo1_" + $(obj).attr("id").split("_")[1]).val(),
            CampoTipoAcreditRel: $("#campo2_" + $(obj).attr("id").split("_")[1]).attr("lang"),
            ValorTipoAcreditRel: $("#campo2_" + $(obj).attr("id").split("_")[1]).val(),
            CampoDescrip: $("#campo3_" + $(obj).attr("id").split("_")[1]).attr("lang"),
            ValorDescrip: $("#campo3_" + $(obj).attr("id").split("_")[1]).val(),
            opcionTabla: $(obj).attr("lang")
        };
    else
        parametros = {
            CampoClave: $("#campo0_" + $(obj).attr("id").split("_")[1]).attr("lang"),
            ValorClave: $("#campo0_" + $(obj).attr("id").split("_")[1]).val(),
            CampoAcreditRel: $("#campo1_" + $(obj).attr("id").split("_")[1]).attr("lang"),
            ValorAcreditRel: $("#campo1_" + $(obj).attr("id").split("_")[1]).val(),
            CampoTipoAcreditRel: $("#campo2_" + $(obj).attr("id").split("_")[1]).attr("lang"),
            ValorTipoAcreditRel: $("#campo2_" + $(obj).attr("id").split("_")[1]).val(),
            CampoDescrip: $("#campo3_" + $(obj).attr("id").split("_")[1]).attr("lang"),
            ValorDescrip: $("#campo3_" + $(obj).attr("id").split("_")[1]).val(),
            opcionTabla: $(obj).attr("lang")
        };
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/ActualiarRegistro", "POST", parametros, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d == "") {
                MostrarMsj("El registro ha sido actualizado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                SeleccionCatalogo();
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    });
}

function NuevoRegistro_Click(obj) {
    if ($(obj).attr("lang") == "NoRI") {
       // $("#divgvcatregula1").attr("disabled", true);
        $("#divgvcatregula1").find("textarea").attr("disabled", true);
        $("#divNewReg1").slideDown('slow');
        document.getElementById('txtNuevaClave1').style.border = "1px solid Gray";
        document.getElementById('txtNuevaDescripcion1').style.border = "1px solid Gray";
        $("#txtNuevaClave1").focus();
    }
    else if ($(obj).attr("lang") == "esClientesSIC") {
        //$("#divgvcatregula1").attr("disabled", true);
        $("#divgvcatregula1").find("textarea").attr("disabled", true);
        $("#divNewReg0").slideDown('slow');
        document.getElementById('txtIdCliente').style.border = "1px solid Gray";
        document.getElementById('txtRFC').style.border = "1px solid Gray";
        document.getElementById('txtNombreSIC').style.border = "1px solid Gray";
        document.getElementById('txtGrupoRiesgo').style.border = "1px solid Gray";
        $("#txtIdCliente").focus();
    }
    else {
        //$("#divgvcatregula2").attr("disabled", true);
        $("#divgvcatregula2").find("textarea").attr("disabled", true);
        $("#divNewReg2").slideDown('slow');
        document.getElementById('txtNuevaClave2').style.border = "1px solid Gray";
        document.getElementById('txtNuevoAcreRel2').style.border = "1px solid Gray";
        document.getElementById('txtNuevoTipAcreRel2').style.border = "1px solid Gray";
        document.getElementById('txtNuevoDescrip2').style.border = "1px solid Gray";
        $("#txtNuevaClave2").focus();
    }
    $("#txtBuscarCadena").removeAttr("disabled");
}


function GuardarNewRegistroEnCatalogoRIANDNoRI_Click(opcionGuardar) {
    if (opcionGuardar == "NoRI" && (validaCampovacio('txtNuevaClave1') | validaCampovacio('txtNuevaDescripcion1'))) {
        MostrarMsj("Ingrese los campos requeridos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }
    else if (opcionGuardar == "esClientesSIC" && (validaCampovacio('txtIdCliente') | validaCampovacio('txtRFC') | validaCampovacio('txtNombreSIC') | validaCampovacio('txtGrupoRiesgo'))) {
        MostrarMsj("Ingrese los campos requeridos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }
    else if (opcionGuardar == "RI" && (validaCampovacio('txtNuevaClave2') | validaCampovacio('txtNuevoAcreRel2') | validaCampovacio('txtNuevoTipAcreRel2') | validaCampovacio('txtNuevoDescrip2'))) {
        MostrarMsj("Ingrese los campos requeridos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }

    var parametros;
    if (opcionGuardar == "NoRI")
        parametros = {
            CampoClave: nombreCampos.split("_")[0],
            clave: $("#txtNuevaClave1").val(),
            CampoAcreditRel: '',
            AcreditadoRel: '',
            CampoTipoAcreditRel: '',
            TipoAcredRel: '',
            CampoDescrip: nombreCampos.split("_")[1],
            descripcion: $("#txtNuevaDescripcion1").val(),
            opcionTabla: opcionGuardar,
            cmbSelect: $("#cmbCatalogoRegulatorios").val()
        };
    else if (opcionGuardar == "esClientesSIC")
        parametros = {
            CampoClave: nombreCampos.split("_")[0],
            clave: $("#txtIdCliente").val(),
            CampoAcreditRel: nombreCampos.split("_")[1],
            AcreditadoRel: $("#txtRFC").val(),
            CampoTipoAcreditRel: nombreCampos.split("_")[2],
            TipoAcredRel: $("#txtNombreSIC").val(),
            CampoDescrip: nombreCampos.split("_")[2],
            descripcion: $("#txtGrupoRiesgo").val(),
            opcionTabla: opcionGuardar,
            cmbSelect: $("#cmbCatalogoRegulatorios").val()
        };
    else
        parametros = {
            CampoClave: nombreCampos.split("_")[0],
            clave: $("#txtNuevaClave2").val(),
            CampoAcreditRel: nombreCampos.split("_")[1],
            AcreditadoRel: $("#txtNuevoAcreRel2").val(),
            CampoTipoAcreditRel: nombreCampos.split("_")[2],
            TipoAcredRel: $("#txtNuevoTipAcreRel2").val(),
            CampoDescrip: nombreCampos.split("_")[3],
            descripcion: $("#txtNuevoDescrip2").val(),
            opcionTabla: opcionGuardar,
            cmbSelect: $("#cmbCatalogoRegulatorios").val()
        };
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/GuardarNewRegistroEnCatalogoRIANDNoRI", "POST", parametros, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d == "") {
                MostrarMsj("El registro ha sido agregado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                CancelarNewRegistroRIANDNoRI_Click(opcionGuardar);
                SeleccionCatalogo();
            }
            else if (data.d == "1") {
                Waiting(false, "Espere por favor. Cargando Información...");
                MostrarMsj("Existe un registro con el mismo ID de Cliente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    });
}

function CancelarNewRegistroRIANDNoRI_Click(opcionCancelar) {
    if (opcionCancelar == 'NoRI') {
        $("#divgvcatregula1").attr("disabled", false);
        $("#divgvcatregula1").find("textarea").attr("disabled", false);
        $("#divNewReg1").slideUp('slow');
        $("#txtNuevaClave1").val("");
        $("#txtNuevaDescripcion1").val("");
    }
    else if (opcionCancelar == "esClientesSIC") {
        $("#divgvcatregula1").attr("disabled", false);
        $("#divgvcatregula1").find("textarea").attr("disabled", false);
        $("#divNewReg0").slideUp('slow');
        $('#txtIdCliente').val("");
        $('#txtRFC').val("");
        $('#txtNombreSIC').val("");
        $('#txtGrupoRiesgo').val("");
    }
    else {
        $("#divgvcatregula2").attr("disabled", false);
        $("#divgvcatregula2").find("textarea").attr("disabled", false);
        $("#divNewReg2").slideUp('slow');
        $("#txtNuevaClave2").val("");
        $("#txtNuevoAcreRel2").val("");
        $("#txtNuevoTipAcreRel2").val("");
        $("#txtNuevoDescrip2").val("");
    }
}

function ObtieneValorTipoCambio_Change() {
    if ($("#txtFechaMoneda").val() != "") {
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("Default.aspx/ObtieneValorTipoCambio", "POST", { tipoMoneda: $("#cmbTipoMoneda").val(), fecha: $("#txtFechaMoneda").val().split('/')[2] + "/" + $("#txtFechaMoneda").val().split('/')[1] + "/" + $("#txtFechaMoneda").val().split('/')[0] }, function (data) {
            if (data.d.indexOf("Error") == -1)
                $("#txtTipocambio").val(data.d);
            else
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        });
    }
}

function ActualizarTipoCambio_Click() {
    if (!validaCampovacio('txtFechaMoneda') & !validaCampovacio('txtTipocambio')) {
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("Default.aspx/ActualizaInsertaTipoCambio", "POST", { tipoMoneda: $("#cmbTipoMoneda").val(), valorCambio: $("#txtTipocambio").val(), fecha: $("#txtFechaMoneda").val().split('/')[2] + "/" + $("#txtFechaMoneda").val().split('/')[1] + "/" + $("#txtFechaMoneda").val().split('/')[0] }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    SeleccionCatalogo();
                    MostrarMsj("Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
            }
            else {
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        });
    }
    else
        MostrarMsj("Ingrese los campos requeridos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
}

function GuardarINPC_Click() {
    if (!validaCampovacio('txtCapturaINPC') & !validaCampovacio('txtFechaINPC')) {
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("Default.aspx/GuardarINPC", "POST", { valorINPC: $("#txtCapturaINPC").val(), anio: $("#txtFechaINPC").val().split('/')[2], mes: $("#txtFechaINPC").val().split('/')[1], dia: $("#txtFechaINPC").val().split('/')[0] }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    SeleccionCatalogo();
                    MostrarMsj("Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
            }
            else {
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        });
    }
    else
        MostrarMsj("Ingrese los campos requeridos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
}
