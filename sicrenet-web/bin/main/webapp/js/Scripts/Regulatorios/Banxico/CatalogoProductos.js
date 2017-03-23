
var numFilasTblPaso = 0;
function cargaTablaProductosBanxicoTblPaso() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("CatalogoProductos.aspx/cargaTblPaso", "POST", null, function (data) {
        $("#divTblGuardar").html("");
        if (data.d.indexOf('Error') == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                numFilasTblPaso = JSON.length;
                $("#divPendientes").show();
                $("#divTblGuardar").show();
                $("#divTblGuardar").html(crearTablaProductosBanxico(JSON, "", true));
            }
            else {
                $("#divPendientes").hide();
                $("#divTblGuardar").hide();
                numFilasTblPaso = 0;
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
        cargaTablaProductosBanxico();
    }, null);
}

function cargaTablaProductosBanxico() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("CatalogoProductos.aspx/cargaTblCatalago", "POST", null, function (data) {
        $("#divCatProdBanxico").html("");
        if (data.d.indexOf('Error') == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#divCatProductos").show();
                $("#divCatalago").show();
                var idProd = existeRegistroModificado(JSON);
                $("#divCatProdBanxico").html(crearTablaProductosBanxico(JSON, idProd, false));
                if (idProd != "")
                    $("#divIndicador").show();
                else
                    $("#divIndicador").hide();
            }
            else {
                $("#divCatProductos").hide();
                $("#divCatalago").hide();
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function existeRegistroModificado(tblProductosBbanxico) {
    var existeREgistroModificado = "";
    for (var i = 0; i < tblProductosBbanxico.length; i++) {
        if (tblProductosBbanxico[i].estatus == "Actual Cambio") {
            existeREgistroModificado = tblProductosBbanxico[i].IDprod;
            break;
        }
    }
    return existeREgistroModificado;
}

function crearTablaProductosBanxico(listaDeJSON, idProducto, esTablaPaso) {
    var cad = '<div id="divContenidoTablaProductosBXC' + (esTablaPaso ? "0" : "") + '" style="width:' + (document.getElementById("shadows").offsetWidth - 17) + "px" + ';overflow: auto;"><table style="width: 100%;font-size: 9px;" class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    cad += '<th style="text-align: center;">' + (esTablaPaso ? "O.K." : "Edición") + '</td>';
    for (var encabezados in auxJSON) {
        if (encabezados != "estatus") {
            cad += '<th style="text-align: center;' + (encabezados == 'Nombre' ? "width: 550px;" : "") + '">';
            cad += encabezados.toString();
            cad += '</th>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    var existeEdicionProducto = false;
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ';
        if (idProducto != "" && listaDeJSON[filas].IDprod == idProducto) {
            if (listaDeJSON[filas].estatus == "Actual Cambio") {
                cad += ' style="background: #CD3333" title="Producto Modificado"><td><input type="checkbox" onclick="eliminaDuplicado(this,\'' + listaDeJSON[filas].IDprod + '\',\'0\');" ' + (numFilasTblPaso > 0 ? ' disabled="disabled" ' : ' ') + '/></td>';
                existeEdicionProducto = true;
            }
            else
                cad += ' style="background: #00EE00" title="Producto Original"><td><input type="checkbox" onclick="eliminaDuplicado(this,\'' + listaDeJSON[filas].IDprod + '\',\'1\');" ' + (numFilasTblPaso > 0 ? ' disabled="disabled" ' : ' ') + '/></td>';
        }
        else if (!esTablaPaso)
            cad += '><td><input type="button" value="Editar" class="' + (existeEdicionProducto || idProducto != "" || numFilasTblPaso > 0 ? 'classButtonDis' : 'classButton') + '" ' +
            (existeEdicionProducto || idProducto != "" || numFilasTblPaso > 0 ? ' disabled="disabled" ' : ' ') + ' onclick="editarProducto(\'' + listaDeJSON[filas].IDprod + '\');" /></td>';
        else
            cad += ' ><td><input type="checkbox" title="Selecciona para Guardar"/></td>';

        var json = listaDeJSON[filas];
        var i = 0;
        for (var element in json) {
            if (element != 'estatus') {
                if (element == 'ImpMax') {
                    cad += '<td id="td_' + i + "_" + listaDeJSON[filas].IDprod + '" style="text-align:right;">';
                    cad += DevuelveCantidadSeparadaPorComas(json[element]);
                }
                else if (element == 'Nombre') {
                    cad += '<td id="td_' + i + "_" + listaDeJSON[filas].IDprod + '" style="text-align:left;width:550px;">';
                    cad += json[element];
                }
                else {
                    cad += '<td id="td_' + i + "_" + listaDeJSON[filas].IDprod + '" style="text-align:right;">';
                    cad += json[element];
                }
            }
            i++;
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div>';
    return cad;
}

function eliminaDuplicado(obj, idProd, tipoOper) {
    MostrarMsj("¿Desea Guardar el Producto seleccionado <span style='font-weight:bold;'>" + $("#td_3_" + idProd).html() + "-" + idProd + "</span> en el Catálogo? ", "Mensaje SicreNet", true, false, true, "Si", "", "No", 280, 120,
            function BtnSi() {
                $("#divVentanaMensajes").dialog("close");
                Waiting(true, "Espere por favor. Cargando Información...");
                peticionAjax("CatalogoProductos.aspx/eliminaDuplicado", "POST", { idProd: idProd, tipOper: tipoOper }, function (data) {
                    if (data.d.indexOf('ErrorCATCH') == -1 && data.d == "") {
                        cargaTablaProductosBanxico();
                    }
                    else {
                        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 255, 160, null, null, null);
                        Waiting(false, "Espere por favor. Cargando Información...");
                    }
                }, null);
            }, null, function BtnNo() {
                $("#divVentanaMensajes").dialog("close");
                $(obj).removeAttr("checked");
            });
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        $(obj).removeAttr("checked");
    });
}

function mostrarCatalago(numDiv) {
    if (document.getElementById(numDiv == 0 ? "divCargarProductos" : "divCatalagoProductos").style.display == "none") {
        $(numDiv == 0 ? "#imgCargar" : "#imgCatalago").attr("src", "../../Images/Grales/down.png");
        $(numDiv == 0 ? "#divCargarProductos" : "#divCatalagoProductos").slideDown('slow');
        document.getElementById(numDiv == 0 ? "divEncabezadoCatProdBCX0" : "divEncabezadoCatProdBCX").setAttribute("title", "Ocultar Catálogo de Productos Banxico" + (numDiv == 0 ? " Tabla Paso" : ""));
    }
    else {
        $(numDiv == 0 ? "#imgCargar" : "#imgCatalago").attr("src", "../../Images/Grales/right.png");
        $(numDiv == 0 ? "#divCargarProductos" : "#divCatalagoProductos").slideUp('slow');
        document.getElementById(numDiv == 0 ? "divEncabezadoCatProdBCX0" : "divEncabezadoCatProdBCX").setAttribute("title", "Mostrar Catálogo de Productos Banxico" + (numDiv == 0 ? " Tabla Paso" : ""));
    }
}

function editarProducto(idProd) {
    var cad = '<table   style="width:100%; font-size:10px"> <tr> <td style="text-align:left; width: 30%;">Inst:</td>';
    cad += '<td style="text-align:left;width: 70%;"><input style="width:90%" type="text" id="txtInst" maxlength="6" value="' + $("#td_0_" + idProd).html() + '"/></td> </tr>';
    cad += '<tr> <td style="text-align:left; vertical-align:middle; width: 152px; height: 20px;">ID Producto:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtIDProducto" value="' + $("#td_1_" + idProd).html() + '" disabled="disabled"/></td></tr>';
    cad += '<tr><td style="text-align:left; vertical-align:middle; width: 152px;">ID CCT:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtIDCCT" value="' + $("#td_2_" + idProd).html() + '" disabled="disabled"/></td> </tr>';
    cad += '<tr><td style="text-align:left; vertical-align:middle; width: 152px;">Nombre:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtNombre" value="' + $("#td_3_" + idProd).html() + '" disabled="disabled"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Tipo de Crédito:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtTipoCredito" maxlength="9" value="' + $("#td_4_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += ' <tr><td style="text-align:left; width: 152px;">Moneda:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtMoneda" maxlength="9" value="' + $("#td_5_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Oferta:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtOferta" maxlength="9" value="' + $("#td_6_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Modalidad:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtModalidad" maxlength="9" value="' + $("#td_7_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Tasa:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtTasa" maxlength="9" value="' + $("#td_8_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Restricción (1/0):</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtRestriccion" maxlength="9" value="' + $("#td_9_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Barrera:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtBarrera" maxlength="9" value="' + $("#td_10_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px; height: 30px;">Tipo Barrera:</td>';
    cad += '<td style="text-align:left; height: 30px;"><input style="width:90%" type="text" maxlength="9" id="txtTipoBarrera" value="' + $("#td_11_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Escala PDO:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtEscalaPDD" maxlength="9" value="' + $("#td_12_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Mecanismo de Pago:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtMecanismoPago" maxlength="9" value="' + $("#td_13_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">PlaMin:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtPlaMin" maxlength="9" value="' + $("#td_14_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">PlaMax:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtPlaMax" maxlength="9" value="' + $("#td_15_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">ImpMin:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtImpMin" maxlength="9" value="' + $("#td_16_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">ImpMax:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtImpMax" maxlength="9" value="' + $("#td_17_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Comisión:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtComision" maxlength="9" value="' + $("#td_18_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px; height: 5px;">Tipo Tasa:</td>';
    cad += '<td style="text-align:left; height: 5px;"><input style="width:90%" type="text" id="txtTipoTasa" maxlength="9" value="' + $("#td_19_" + idProd).html() + '" onkeydown="return FilterInputNumAndAlfa (event,false,false)"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Agrupa1:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtAgrupa1" maxlength="100" value="' + $("#td_20_" + idProd).html() + '"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Agrupa2:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtAgrupa2" maxlength="100" value="' + $("#td_21_" + idProd).html() + '"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Fecha 91:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" class="calendar" id="txtFecha91" maxlength="10" value="' + $("#td_22_" + idProd).html() + '" onchange="changeFormatoFecha(event,this);" onkeyup="changeFormatoFecha(event,this);" onkeypress="if (event.keyCode==13) return false;"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Fecha 92:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" class="calendar" id="txtFecha92" maxlength="10" value="' + $("#td_23_" + idProd).html() + '" onchange="changeFormatoFecha(event,this);" onkeyup="changeFormatoFecha(event,this);" onkeypress="if (event.keyCode==13) return false;"/></td></tr>';
    cad += '<tr><td style="text-align:left; width: 152px;">Llave Producto:</td>';
    cad += '<td style="text-align:left;"><input style="width:90%" type="text" id="txtLlaveProd" maxlength="50" value="' + $("#td_24_" + idProd).html() + '"/></td></tr></table> ';

    var cadena = '<div id="divBloqVtnVerValidacionesMet" style="width:97%;height:94%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:95%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblVerValidacionesMet" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">  ';
    cadena += cad + '</div></div>';

    MostrarMsj(cadena, "Editar Producto Banxico [" + $("#td_3_" + idProd).html() + "-" + idProd + "]", true, true, false, "Guardar", "Cancelar", "", 560, 670, function () {
        if ($("#txtInst").val() != $("#td_0_" + idProd).html() || $("#txtTipoCredito").val() != $("#td_4_" + idProd).html() || $("#txtMoneda").val() != $("#td_5_" + idProd).html()
        || $("#txtOferta").val() != $("#td_6_" + idProd).html() || $("#txtModalidad").val() != $("#td_7_" + idProd).html() || $("#txtTasa").val() != $("#td_8_" + idProd).html()
        || $("#txtRestriccion").val() != $("#td_9_" + idProd).html() || $("#txtBarrera").val() != $("#td_10_" + idProd).html() || $("#txtTipoBarrera").val() != $("#td_11_" + idProd).html()
        || $("#txtEscalaPDD").val() != $("#td_12_" + idProd).html() || $("#txtMecanismoPago").val() != $("#td_13_" + idProd).html() || $("#txtPlaMin").val() != $("#td_14_" + idProd).html()
        || $("#txtPlaMax").val() != $("#td_15_" + idProd).html() || $("#txtImpMin").val() != $("#td_16_" + idProd).html() || $("#txtImpMax").val() != $("#td_17_" + idProd).html()
        || $("#txtComision").val() != $("#td_18_" + idProd).html() || $("#txtTipoTasa").val() != $("#td_19_" + idProd).html() || $("#txtAgrupa1").val() != $("#td_20_" + idProd).html()
        || $("#txtAgrupa2").val() != $("#td_21_" + idProd).html() || $("#txtFecha91").val() != $("#td_22_" + idProd).html() || $("#txtFecha92").val() != $("#td_23_" + idProd).html()
        || $("#txtLlaveProd").val() != $("#td_24_" + idProd).html()) {
            WaitingVtn("divBloqVtnVerValidacionesMet", true, true, "Cargando Información...");
            document.getElementById("imgVtnLoading").style.marginTop = "35%";
            $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButtonDis");
            $($(".ui-button-text").parent().parent().find(":button")[0]).attr("disabled", "disabled");
            $($(".ui-button-text").parent().parent().find(":button")[1]).attr("class", "classButtonDis");
            $($(".ui-button-text").parent().parent().find(":button")[1]).attr("disabled", "disabled");

            var parametros = {
                FCInst: $("#txtInst").val(), FVCIdprod: $("#txtIDProducto").val(), FVCIdcc: $("#txtIDCCT").val(),
                FVCNombre: $("#txtNombre").val(), FITipoCred: $("#txtTipoCredito").val(), FIMoneda: $("#txtMoneda").val(),
                FIOferta: $("#txtOferta").val(), FIModalidad: $("#txtModalidad").val(), FITasa: $("#txtTasa").val(),
                FIRestriccion: $("#txtRestriccion").val(), FIBarrera: $("#txtBarrera").val(), FITipoBarr: $("#txtTipoBarrera").val(),
                FIEscalapdo: $("#txtEscalaPDD").val(), FIMecanismoPago: $("#txtMecanismoPago").val(), FIPlamin: $("#txtPlaMin").val(),
                FIPlamax: $("#txtPlaMax").val(), FIImpmin: $("#txtImpMin").val(), FIImpmax: parseInt(replaceAll($("#txtImpMax").val(), ',', '')),
                FIComision: $("#txtComision").val(), FITipoTasa: $("#txtTipoTasa").val(), FVCAgrupa1: $("#txtAgrupa1").val(),
                FVCAgrupa2: $("#txtAgrupa2").val(), FDFecha91: $("#txtFecha91").val(), FDFecha92: $("#txtFecha92").val(), FVCLlaveProducto: $("#txtLlaveProd").val()
            };
            peticionAjax("CatalogoProductos.aspx/GuardarEdicionProductoBanxico", "POST", parametros, function (data) {
                $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButton");
                $($(".ui-button-text").parent().parent().find(":button")[0]).removeAttr("disabled");
                $($(".ui-button-text").parent().parent().find(":button")[1]).attr("class", "classButton");
                $($(".ui-button-text").parent().parent().find(":button")[1]).removeAttr("disabled");
                WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "Cargando Información...");
                if (data.d.indexOf('ErrorCATCH') == -1 && data.d == "") {
                    $("#divEditarProductoBanxico").dialog("close");
                    cargaTablaProductosBanxico();
                }
                else
                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);

            }, null);
        }
        else
            $("#divEditarProductoBanxico").dialog("close");
    }, null, null, "divEditarProductoBanxico");
    $("#divEditarProductoBanxico").on("dialogclose", function (event, ui) {
        $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButton");
        $($(".ui-button-text").parent().parent().find(":button")[0]).removeAttr("disabled");
        $($(".ui-button-text").parent().parent().find(":button")[1]).attr("class", "classButton");
        $($(".ui-button-text").parent().parent().find(":button")[1]).removeAttr("disabled");
    });
    $(".calendar").datepicker({});
}

function GuardarRegDeTablaPasoAProductiva() {
    MostrarMsj("Los <span style='font-weight:bold;'>Registros NO Seleccionados serán Eliminados</span> ¿Desea Continuar? ", "Mensaje SicreNet", true, false, true, "Si", "", "No", 280, 120,
            function BtnSi() {
                $("#divVentanaMensajes").dialog("close");
                var cadenaIdPRodChecksNoChecks = "";
                $('#divContenidoTablaProductosBXC0 tr').each(function () {
                    if ($(this.cells[0]).find('input:checkbox').length > 0 && $(this.cells[0]).find('input:checkbox').is(":checked"))
                        cadenaIdPRodChecksNoChecks += $(this.cells[2]).html() + ";1|";
                    else if ($(this.cells[0]).find('input:checkbox').length > 0)
                        cadenaIdPRodChecksNoChecks += $(this.cells[2]).html() + ";0|";
                });
                Waiting(true, "Espere por favor. Cargando Información...");
                peticionAjax("CatalogoProductos.aspx/guardarRegistroDeTablaPasoABXC", "POST", { cadenaIdPRodChecksNoChecks: cadenaIdPRodChecksNoChecks }, function (data) {
                    if (data.d.indexOf('ErrorCATCH') == -1 && data.d == "") {
                        cargaTablaProductosBanxicoTblPaso();
                    }
                    else {
                        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
                        Waiting(false, "Espere por favor. Cargando Información...");
                    }
                }, null);
            }, null, function BtnNo() {
                $("#divVentanaMensajes").dialog("close");
            });
}