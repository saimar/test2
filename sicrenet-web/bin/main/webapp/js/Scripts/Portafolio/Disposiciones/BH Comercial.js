

var arrayCatalogos = new Array();
function cargaCatalogosInciales() {
    //Catalogos Clientes
    arrayCatalogos.push("TipoCartera,sltTipoCartera");
    arrayCatalogos.push("ActvidadEconomica,sltActividadEconomica");
    arrayCatalogos.push("ActvidadEconomica,sltActividadEconomicaDestCred"); ////
    arrayCatalogos.push("SectorContable,sltSectorContable");
    arrayCatalogos.push("AcreditadoRelacionado,sltAcreditadoRelacionado");
    arrayCatalogos.push("LugarRadica,sltLugarRadica");
    //arrayCatalogos.push("ActividadEconomicaDestCred,sltActividadEconomicaDestCred");////
    arrayCatalogos.push("TipoAcreditadoRelacionado,sltTipoAcreditadoRelacionado");
    arrayCatalogos.push("PersonalidadJuridica,sltPersonalidadJuridica");

    //Catalogos Lineas
    arrayCatalogos.push("TipoAltaCredito,sltTipoAltaCredito"); //17-287
    arrayCatalogos.push("TipoProducto,sltTipoProducto");

    arrayCatalogos.push("TipoOperacion,sltTipoOperacion");
    arrayCatalogos.push("DestinoCredito,sltDestinoDelCredito");

    arrayCatalogos.push("MonedaCredito,sltMonedaDeLineaCredito");
    arrayCatalogos.push("FormaDisposicion,sltFormaDisposicion");
    arrayCatalogos.push("LineaCredito,sltLineaCreditoRevocableIrrevo");
    arrayCatalogos.push("RestriccionLinea,sltRestriccionLinea");
    arrayCatalogos.push("PrelacionPago,sltPrelacionDePago");
    //-- 
    arrayCatalogos.push("CveInstOtorgante,sltClaveInstitucionOAgenciaExteriorOtorganteRecursos");
    arrayCatalogos.push("TasaInteres,sltTasaDeInteres");
    arrayCatalogos.push("OperaDifTasaReferencia,sltOperacionDiferenciaSobreTasaReferencia");
    arrayCatalogos.push("PeriodicidadPagoCapital,sltPeriodicidadPagoCapital");
    arrayCatalogos.push("PeriodicidadInteres,sltPeriodicidadPagoIntereses");
    arrayCatalogos.push("GarLeyFederal,sltGarantiaDeLeyFederal");

    arrayCatalogos.push("CaracteristicasDispCredito,sltCaracteristicasDispCredito");
    arrayCatalogos.push("TipoGarantiaReal,sltTipoGarantiaReal");
    arrayCatalogos.push("TipoBajaCredito,sltTipoBajaLinea"); //285-138
    arrayCatalogos.push("ProyectoInversionFuentePagoP,sltProyectoInversionFuentPagProp");
    arrayCatalogos.push("InstitucionBancaOtorgoF,sltInstBancaDesFondoFomOtorgFond");

    //Catalogos Disposiciones
    arrayCatalogos.push("TipoAltaCredito,sltTipoAltaDispo"); //287-17
    arrayCatalogos.push("TipoBajaCredito,sltTipoBajaCredito"); //138-285
    arrayCatalogos.push("CategoriaCredito,sltCategoriaCredito");
    arrayCatalogos.push("MonedaDisposicion,sltMonedaDispocion");

    //Catalogos Cortes
    arrayCatalogos.push("EstatusSIC,sltEstatusSICCT");
    arrayCatalogos.push("TipoEmpresa,sltTipoEmpresaCT");
    arrayCatalogos.push("LineaDispuesta,sltLineaDispuestaONoDispCT");
    arrayCatalogos.push("SituacionCredito,sltSituaciónCredito");
    arrayCatalogos.push("GradoRiesgo,sltGradoRiesgo");

    //Catalogos SP
    arrayCatalogos.push("TipoEmpresa,sltTipoEmpresaSP");
    arrayCatalogos.push("TipoObligadoSolidOAval,sltTipoObligadoSolidarioAvalSP");
    arrayCatalogos.push("TipoGarante,sltTipoGaranteSP");
    arrayCatalogos.push("MonedaGarantiaPersonal,sltMonedaGarantiaPersonalSP");

    CargaCatalogosCliente(0, "Clientes");

    // Falta Asignar el valor 0 a los Combos PI
    // data.d = "%%&&" + data.d;// EdicionDisposicion();
}

////////////////////////////////////////////////////////////////////////////------------ CLIENTES SIC

function CargaCatalogosCliente(idArregloDeCarga, opcionCargar) {
    SicreNet.Portafolio.Disposiciones.Default.GetCatalogosClientes(arrayCatalogos[idArregloDeCarga].split(',')[0], "",
        function (response) {
            if (response.value.indexOf("Error") == -1) {
                var Items = new Array();
                for (var i = 0; i < response.value.split("####|").length; i++) {
                    var JSONTemp = new Array();
                    for (var ii = 0; ii < response.value.split("####|")[i].split("%%%%|,").length; ii++) {
                        JSONTemp[response.value.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[0]] = response.value.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[1];
                    }
                    Items.push(JSONTemp);
                }
                delete Items[Items.length - 1];

                document.getElementById(arrayCatalogos[idArregloDeCarga].split(',')[1]).options.length = 0;
                if (arrayCatalogos[idArregloDeCarga].split(',')[0] != "TipoEmpresa") {
                    var opcion = new Option("-- Seleccione una opción --", -1);
                    document.getElementById(arrayCatalogos[idArregloDeCarga].split(',')[1]).options[document.getElementById(arrayCatalogos[idArregloDeCarga].split(',')[1]).options.length] = opcion;
                    document.getElementById(arrayCatalogos[idArregloDeCarga].split(',')[1]).options[document.getElementById(arrayCatalogos[idArregloDeCarga].split(',')[1]).options.length - 1].title = "-- Seleccione una opción --";
                }
                for (var i = 0; i < Items.length - 1; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Clave + "-" + Item.Descripcion, Item.Clave);
                    document.getElementById(arrayCatalogos[idArregloDeCarga].split(',')[1]).options[document.getElementById(arrayCatalogos[idArregloDeCarga].split(',')[1]).options.length] = opcion;
                    document.getElementById(arrayCatalogos[idArregloDeCarga].split(',')[1]).options[document.getElementById(arrayCatalogos[idArregloDeCarga].split(',')[1]).options.length - 1].title = Item.Clave + "-" + Item.Descripcion;
                }
            } else
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            if (idArregloDeCarga + 1 < arrayCatalogos.length)
                CargaCatalogosCliente(idArregloDeCarga + 1, opcionCargar)
            else {
                LlenarPais();
                //                $("#FiltroBuscarCliente").focus();
                //                if (opcionCargar == "DatosCliente") sltTipoEmpresa_OnChange($("#sltTipoEmpresa"), 0);
                //                else if (opcionCargar == "DatosSP") CargarDatosSP(FechaActual.split('/')[2] + FechaActual.split('/')[1] + FechaActual.split('/')[0], true);
                //                else if (opcionCargar == "DatosCorte") BuscarCortesXFecha(FechaActual.split('/')[2] + FechaActual.split('/')[1] + FechaActual.split('/')[0]);
            }
        }
    );
}

var cargandoPaisEdoLocalidadColonia = false;
function CargarPaisEdoLocalidadColonia(CP, opcionCargaCP, esCargarEvento) {
    cargandoPaisEdoLocalidadColonia = true;
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Portafolio.Disposiciones.Default.CargarPaisEdoLocalidadColonia(CP,
        function (response) {
            if (response.value.indexOf("Error") == -1 && response.value != "") {
                if (document.getElementById("sltNacionalidad" + opcionCargaCP) != null) {
                    document.getElementById("sltNacionalidad" + opcionCargaCP).options.length = 0;
                    var pais = obtenerArregloDeJSON(response.value.split('%%&&')[0], false);
                    var opcion = new Option(pais[0].fvcDescripcionPais, pais[0].idPais);
                    document.getElementById("sltNacionalidad" + opcionCargaCP).options[document.getElementById("sltNacionalidad" + opcionCargaCP).options.length] = opcion;
                    document.getElementById("sltNacionalidad" + opcionCargaCP).options[document.getElementById("sltNacionalidad" + opcionCargaCP).options.length - 1].title = pais[0].fvcDescripcionPais;
                }
                document.getElementById("sltEstado" + opcionCargaCP).options.length = 0;
                var edo = obtenerArregloDeJSON(response.value.split('%%&&')[1], false);
                opcion = new Option(edo[0].fvcDescripcionEstado, edo[0].idEstado);
                document.getElementById("sltEstado" + opcionCargaCP).options[document.getElementById("sltEstado" + opcionCargaCP).options.length] = opcion;
                document.getElementById("sltEstado" + opcionCargaCP).options[document.getElementById("sltEstado" + opcionCargaCP).options.length - 1].title = edo[0].fvcDescripcionEstado;

                document.getElementById("sltLocalidad" + opcionCargaCP).options.length = 0;
                var localidad = obtenerArregloDeJSON(response.value.split('%%&&')[2], false);
                opcion = new Option(localidad[0].fvcDescripcionLocalidad, localidad[0].idLocalidad);
                document.getElementById("sltLocalidad" + opcionCargaCP).options[document.getElementById("sltLocalidad" + opcionCargaCP).options.length] = opcion;
                document.getElementById("sltLocalidad" + opcionCargaCP).options[document.getElementById("sltLocalidad" + opcionCargaCP).options.length - 1].title = localidad[0].fvcDescripcionLocalidad;

                document.getElementById("sltColonia" + opcionCargaCP).options.length = 0;
                var colonias = obtenerArregloDeJSON(response.value.split('%%&&')[3], false);
                opcion = new Option("-- Seleccione una opción --", -1);
                document.getElementById("sltColonia" + opcionCargaCP).options[document.getElementById("sltColonia" + opcionCargaCP).options.length] = opcion;
                document.getElementById("sltColonia" + opcionCargaCP).options[document.getElementById("sltColonia" + opcionCargaCP).options.length - 1].title = "-- Seleccione una opción --";

                for (var i = 0; i < colonias.length; i++) {
                    opcion = new Option(colonias[i].fvcDescripcionColonia, colonias[i].idColonia);
                    document.getElementById("sltColonia" + opcionCargaCP).options[document.getElementById("sltColonia" + opcionCargaCP).options.length] = opcion;
                    document.getElementById("sltColonia" + opcionCargaCP).options[document.getElementById("sltColonia" + opcionCargaCP).options.length - 1].title = colonias[i].fvcDescripcionColonia;
                }
                if (coloniaAcrediatadoSIC != "") {
                    $("#sltColonia" + opcionCargaCP).val(coloniaAcrediatadoSIC);
                    if (opcionCargaCP == "DC")
                        coloniaAcrediatadoSIC = "";
                }
            }
            if (opcionCargaCP == "A" && !esCargarEvento)
                CargarPaisEdoLocalidadColonia($("#txtCP_DC").val(), "DC", false);
            if (opcionCargaCP == "DC" && !esCargarEvento)
                AsignarCamposAlnovaEdicionCliente();
            if (esCargarEvento)
                Waiting(false, "Espere por favor. Cargando Información...");
            cargandoPaisEdoLocalidadColonia = false;
        }
    );
}

var esCPCorrecto = false
function txtCP_OnkeyPress(evt, obj) {
    var availableTags = new Array();
    if ($(obj).val().length >= 2 || $(obj).val() == "0") {
        SicreNet.Portafolio.Disposiciones.Default.GetCatalogosClientes("CP", $(obj).val(),
        function (response) {
            if (response.value.indexOf("Error") == -1 && response.value != "") {
                var Items = new Array();
                for (var i = 0; i < response.value.split("####|").length; i++) {
                    var JSONTemp = new Array();
                    for (var ii = 0; ii < response.value.split("####|")[i].split("%%%%|,").length; ii++) {
                        JSONTemp[response.value.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[0]] = response.value.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[1];
                    }
                    Items.push(JSONTemp);
                }
                delete Items[Items.length - 1];
                for (var i = 0; i < Items.length - 1; i++) {
                    availableTags.push(Items[i].Clave);
                }
                $(obj).autocomplete({
                    source: availableTags
                });
                esCPCorrecto = true;
            }
            else
                esCPCorrecto = false;
            //            if (!cargandoPaisEdoLocalidadColonia && esCPCorrecto && evt.keyCode == 13 && ($(obj).val() == "0" || $(obj).val().length == 5))
            //                CargarPaisEdoLocalidadColonia($(obj).val(), $(obj).attr("id").split("_")[1], true);
        }
    );
    }
    else {
        $(obj).autocomplete({
            source: availableTags
        });
        document.getElementById("sltNacionalidad" + $(obj).attr("id").split("_")[1]) != null ? document.getElementById("sltNacionalidad" + $(obj).attr("id").split("_")[1]).options.length = 0 : null;
        document.getElementById("sltEstado" + $(obj).attr("id").split("_")[1]).options.length = 0;
        document.getElementById("sltLocalidad" + $(obj).attr("id").split("_")[1]).options.length = 0;
        document.getElementById("sltColonia" + $(obj).attr("id").split("_")[1]).options.length = 0;
        esCPCorrecto = false;
    }
    if (!cargandoPaisEdoLocalidadColonia && esCPCorrecto && evt.keyCode == 13 && ($(obj).val() == "0" || $(obj).val().length == 5))
        CargarPaisEdoLocalidadColonia($(obj).val(), $(obj).attr("id").split("_")[1], true)
}


function GuardarDatosClienteSIC() {
    if (NoVacioDatosClienteSIC()) {
        Waiting(true, "Espere por favor. Cargando Información...");

        var EditarOGuardar = '';

        if ($('#txtIdAcreditado').is(":disabled") == true) {
            EditarOGuardar = 'Editar';
        }
        else {
            EditarOGuardar = 'Guardar';
        }

        var parametrosGuardar = {
            id: $('#txtIdAcreditado').val(),
            rfc: $('#txtRfcAcreditado').val(),
            nombre: $('#txtNombreAcreditado').val(),
            tipoCartera: $('#sltTipoCartera').val(),
            actividadEconomica: $('#sltActividadEconomica').val(),
            grupoRiesgo: $('#txtGrupoRiesgo').val(),
            localidad: $('#sltLocalidadA').val(),
            municipio: $('#txtCP_A').val(),
            estado: $('#sltEstadoA').val(),
            nacionalidad: $('#sltNacionalidadA').val(),
            curp: $('#txtCURP').val(),
            lei: $('#txtLEI').val(),
            sectorContable: $('#sltSectorContable').val(),
            acreditadoRelacionado: $('#sltAcreditadoRelacionado').val(),
            lugarRadica: $('#sltLugarRadica').val(),
            entidadFinancieraOtorgante: $('#sltEntidadFinanciera').val(),

            fnFideicomitente: $('#txtFideiComitente').val(),
            fnFiduciario: $('#txtFiduciario').val(),
            fnIngresoFideicomitente: $('#txtIngresoFideicomitente').val(),
            fvcLocalidadEnDondeSeDestinariaElCredito: $('#sltLocalidadDC').val(),
            fvcMunicipioEnDondeSeDestinaraElCredito: $('#txtCP_DC').val(),
            fnEstadoenDondeseDestinaraelCredito: $('#sltEstadoDC').val(),
            fvcActividadEconomicaALaQueSeDestinaraElCredito: $('#sltActividadEconomicaDestCred').val(),
            fnTipodeAcreditadoRelacionado: $('#sltTipoAcreditadoRelacionado').val(),
            fnPersonalidadJuridiadelAcreditado: $('#sltPersonalidadJuridica').val(),
            fnDireccionCalle: $('#txtDireccionCalle').val(),
            fnDireccionNumExterior: $('#txtDireccionNumExterior').val(),
            fnDireccionNumInterior: $('#txtDireccionNumInterior').val(),

            //tipoEmpresa: valorTipoEmpresaEdicionCliente,
            //colonia: $('#sltColoniaA').val(),
            //domicilioCalle: "",
            //esAtraso: (valorTipoEmpresaEdicionCliente == "3" ? $('#sltFiltroXTipoEmpresa').val() : "0"),
            //tamañoVentas: (valorTipoEmpresaEdicionCliente == "4" ? $('#sltFiltroXTipoEmpresa').val() : "-9"),
            EditarOGuardar: EditarOGuardar
        };
        peticionAjax('Default.aspx/GuardarClienteSIC', "POST", parametrosGuardar, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    //                    var HTML = '<span style="color:Green;font-weight:bold">El cliente se ha guardado de forma correcta.</span><br /><br />';
                    //                    HTML += '<table id="ClientesEncontradosIDS" class="dataGridDatos" style="width:100%"><thead><tr><th >ID</th ><th >Nombre</th ><th >Tipo Cartera</th ><th >Estado</th ><th >RFC</th ><th ><input id="RadioEditarCliente" name="EditarCliente" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
                    //                    HTML += '<tr  style="background: rgb(198, 229, 204);" id="Cliente' + $('#txtIdAcreditado').val() + '"><td >' + $('#txtIdAcreditado').val() + '</td><td >' + $('#txtNombreAcreditado').val() + '</td><td >' + document.getElementById('sltTipoCartera').options[document.getElementById('sltTipoCartera').selectedIndex].text + '</td><td >' + document.getElementById('sltEstadoA').options[document.getElementById('sltEstadoA').selectedIndex].text + '</td><td >' + $('#txtRfcAcreditado').val() + '</td><td ><input id="RadioEditarCliente" ';
                    //                    HTML += 'checked="checked" ';
                    //                    HTML += 'name="EditarCliente" type="radio"  value="' + $('#txtIdAcreditado').val() + '" /></td></tr>';
                    //                    HTML += '</tbody></table>';
                    var HTML = devuleveTblDatosDespuesDeEdicion("Cliente", 1, new Array("ID", "Nombre", "Tipo Cartera", "Estado", "RFC", ""), new Array($('#txtIdAcreditado').val(), $('#txtNombreAcreditado').val(), document.getElementById('sltTipoCartera').options[document.getElementById('sltTipoCartera').selectedIndex].text, document.getElementById('sltEstadoA').options[document.getElementById('sltEstadoA').selectedIndex].text, $('#txtRfcAcreditado').val()), "COMERCIAL", "IDS");
                    $("#divTblReEdicionClientesSIC").html(HTML);
                    document.getElementById("ClientesEncontradosIDS").style.width = "100%";
                    $('#EditarClientesEncontrados').attr("disabled", false);
                    $('#VerLineas').attr("disabled", false);
                    LimpiarDatosClienteSIC();
                    CambiarDiv('ClientesEncotrados', 'DatosCliente', false, true);
                }
            }
            else {
                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            }
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function devuleveTblDatosDespuesDeEdicion(segmento, idSegmento, lsteEncabezados, lstValores, descFuente, prefijoIdTabla) { // cambiar el tblCortesFind
    var idTablaSegmento = idSegmento == 1 ? "ClientesEncontrados" : (idSegmento == 2 ? "LineasEncontradas" : (idSegmento == 3 ? "DisposicionesEncontradas" : "tblCortes"));
    var segmentoTemp = segmento.indexOf("X") != -1 ? segmento.substring(0, segmento.length - 1) : segmento;
    var HTML = '<fieldset style="border: 1px solid Gray; padding: 10px;"><legend style="font-weight: bold; text-align: left; font-size: 11px;">' + descFuente
    + '</legend><span style="color:Green;font-weight:bold"> ' + (segmento.indexOf("X") != -1 ? 'La ' : 'El ') + segmentoTemp + ' ' + descFuente + ' se ha guardado de forma correcta.</span><br /><br />';
    HTML += '<table id="' + idTablaSegmento + prefijoIdTabla + '" class="dataGridDatos" style="width:100%"><thead><tr>';
    for (var i = 0; i < lsteEncabezados.length; i++)
        HTML += '<th>' + lsteEncabezados[i] + '</td>';
    HTML += '</tr></thead><tbody><tr style="background: rgb(198, 229, 204);">';
    for (var i = 0; i < lstValores.length; i++)
        HTML += '<td>' + lstValores[i] + '</td>';
    HTML += '<td ><input id="RadioEditar' + segmentoTemp + '" checked="checked" ';
    HTML += 'name="Editar' + segmento + '" type="radio"  value="' + lstValores[0] + '" /></td></tr>';
    HTML += '</tbody></table> </fieldset>';
    return HTML;
}

function NoVacioDatosClienteSIC() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdAcreditado", "4. Id Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtRfcAcreditado", "5. Rfc"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNombreAcreditado", "6. Nombre Acreditado"); else return dispararReturn;
    //if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoEmpresa", "Tipo Empresa", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoCartera", "7. Tipo Cartera", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltActividadEconomica", "8. Actividad Económica", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtGrupoRiesgo", "9. Grupo Riesgo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCP_A", "CP Acreditado"); else return dispararReturn;

    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltLocalidadA", "10. Localidad Acreditado", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltEstadoA", "12. Estado Acreditado", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltNacionalidadA", "13. Nacionalidad Acreditado", true, false); else return dispararReturn;
    //if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltColoniaA", "Colonia Acreditado",  true, false); else return dispararReturn;

    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCURP", "15. CURP"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtLEI", "16. Legal Entity Identifier"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltSectorContable", "32. Sector Contable", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltAcreditadoRelacionado", "38. Acreditado Relacionado", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltLugarRadica", "154. Lugar Radica", true, false); else return dispararReturn;

    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltEntidadFinanciera", "277. Entidad Financiera Otorgante", true, false); else return dispararReturn;
    //if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltFiltroXTipoEmpresa", "Lugar Radica", true, false); else return dispararReturn;

    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFideiComitente", "282. Fideicomitente"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFiduciario", "283. Fiduciario"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIngresoFideicomitente", "284. Ingreso Fideicomitente"); else return dispararReturn;

    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCP_DC", "CP Destino del Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltLocalidadDC", "293. Localidad Destino del Crédito", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltEstadoDC", "295. Estado Destino del Crédito", true, false); else return dispararReturn;

    //if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltColoniaDC", "Colonia Destino del Crédito", true); else return dispararReturn;

    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltActividadEconomicaDestCred", "296. Actividad Económica Destino del Crédito", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoAcreditadoRelacionado", "298. Tipo Acreditado Relacionado", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltPersonalidadJuridica", "299. Personalidad Juridica", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtDireccionCalle", "279. Dirección Calle"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtDireccionNumExterior", "280. Dirección Número Exterior"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtDireccionNumInterior", "281. Dirección Número Interior"); else return dispararReturn;

    //if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCalle", "Calle"); else return dispararReturn;    
    //if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltFiltroXTipoEmpresa", (valorTipoEmpresaEdicionCliente == "2" ? "Entidad Financiera Otorgante" : (valorTipoEmpresaEdicionCliente == "3" ? "Atraso" : " Tamaño Ventas")), true); else return dispararReturn;
    return dispararReturn;
}

function LimpiarDatosClienteSIC() {
    $("#txtIdAcreditado").attr("disabled", false);
    LimpiarCampo("txtIdAcreditado", "", true, false, false);
    LimpiarCampo("txtRfcAcreditado", "", true, false, false);
    LimpiarCampo("txtNombreAcreditado", "", true, false, false);
    LimpiarCampo("sltTipoCartera", "", false, false, true);
    LimpiarCampo("sltActividadEconomica", "", false, false, true);
    LimpiarCampo("txtGrupoRiesgo", "", true, false, false);
    LimpiarCampo("txtCP_A", "", true, false, false);
    LimpiarCampo("txtCURP", "", true, false, false);

    LimpiarCampo("sltNacionalidadA", "", false, false, true);
    LimpiarCampo("sltEstadoA", "", false, false, true);
    LimpiarCampo("sltLocalidadA", "", false, false, true);
    LimpiarCampo("txtLEI", "", true, false, false);

    LimpiarCampo("sltSectorContable", "", false, false, true);
    LimpiarCampo("sltAcreditadoRelacionado", "", false, false, true);
    LimpiarCampo("sltLugarRadica", "", false, false, true);

    LimpiarCampo("sltEntidadFinanciera", "", false, false, true);
    //LimpiarCampo("sltFiltroXTipoEmpresa", "", false, false, true);
    LimpiarCampo("txtFideiComitente", "", true, false, false);
    LimpiarCampo("txtFiduciario", "", true, false, false);
    LimpiarCampo("txtIngresoFideicomitente", "", true, false, false);
    LimpiarCampo("txtCP_DC", "", true, false, false);
    LimpiarCampo("sltEstadoDC", "", false, false, true);
    LimpiarCampo("sltLocalidadDC", "", false, false, true);
    LimpiarCampo("sltActividadEconomicaDestCred", "", false, false, true);
    LimpiarCampo("sltTipoAcreditadoRelacionado", "", false, false, true);
    LimpiarCampo("sltPersonalidadJuridica", "", false, false, true);
    LimpiarCampo("txtDireccionCalle", "", true, false, false);
    LimpiarCampo("txtDireccionNumExterior", "", true, false, false);
    LimpiarCampo("txtDireccionNumInterior", "", true, false, false);
}

////////////////////////////////////////////////////////////////////////////------------ PI SIC
var arregloTipoCampoYDatoPI = new Array();
function btnVerDatosPI() {
    // if ($("#sltFiltroXTipoEmpresa").val() != "-1") {
    var FiltroXTipoEmpresaGet = "";
    if (valorTipoEmpresaEdicionCliente == "2")
        FiltroXTipoEmpresaGet = valorAtrasoEdicionCliente == "NO" ? 0 : 1;
    else if (valorTipoEmpresaEdicionCliente == "3")
        FiltroXTipoEmpresaGet = valorAtrasoEdicionCliente;
    else
        FiltroXTipoEmpresaGet = valorAtrasoEdicionCliente == "111" ? 1 : 0;
    LlenaArregloCamposAcargar("0", $("#txtIdAcreditado").attr("lang"), true, false);
    // }
    // else
    //   MostrarMsj("Seleccione una opción en el Campo" + ($("#sltTipoEmpresa").val() == "2" ? " Entidad Financiera Otorgante" : ($("#sltTipoEmpresa").val() == "3" ? " Atraso" : " Tamaño Ventas")), " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
}

var camposValoresPermitidos = "";
function LlenaArregloCamposAcargar(filtroAdicional, tipoEmpresa, cargarDatosPI, recargarFechaActual) {
    if (tipoEmpresa == -1) return;
    Waiting(true, "Espere por favor. Cargando Información...");
    var camposPI = "";
    peticionAjax('Default.aspx/ObtenerCamposVisiblesPI', "POST", { tipoEmpresa: tipoEmpresa, FiltroAdicional: filtroAdicional }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                arregloTipoCampoYDatoPI = new Array();
                var camposCargar = obtenerArregloDeJSON(data.d.split('%%&&')[0], false);
                camposPI = camposCargar[0]["fvcIdCampos"];
                var camposCargarAttr = obtenerArregloDeJSON(data.d.split('%%&&')[1], false);
                if (camposCargarAttr[0] != null) {
                    for (var i = 0; i < camposCargarAttr.length; i++)
                        arregloTipoCampoYDatoPI.push(camposCargarAttr[i]["id"] + "-" + camposCargarAttr[i]["tipoColumna"] + ";" + camposCargarAttr[i]["Tamaño"] + ";" + camposCargarAttr[i]["DescripcionColumna"] + ";" + camposCargarAttr[i]["nombreColumna"]);

                    var camposCargarValoresPermitidos = obtenerArregloDeJSON(data.d.split('%%&&')[2], false);
                    camposValoresPermitidos = camposCargarValoresPermitidos[0]["fvcCamposPI"]
                    $("#divTblCamposPI").html(GeneraTablaCamposPI(camposPI, tipoEmpresa));
                    $("#btnGuardarPI").attr("tabindex", camposPI.split(',').length + 1);
                    $("#btnCancelarPI").attr("tabindex", camposPI.split(',').length + 2);
                    CambiarDiv('DivDatosPI', 'DatosCliente', false, true);
                    $(".calendario").datepicker();
                    $('.CalendarioFC').datepicker({ maxDate: -0 });
                    for (var i = 0; i < arregloTipoCampoYDatoPI.length; i++) {
                        if (arregloTipoCampoYDatoPI[i].split('-')[0] == "144" || arregloTipoCampoYDatoPI[i].split('-')[0] == "277" || arregloTipoCampoYDatoPI[i].split('-')[0] == "290") {
                            objetoAtraso = arregloTipoCampoYDatoPI[i].split('-')[0];
                            break;
                        }
                    }
                    CargarCatalogosPI(0, filtroAdicional + "", tipoEmpresa, cargarDatosPI, recargarFechaActual);
                }
                else {
                    Waiting(false, "Espere por favor. Cargando Información...");
                    MostrarMsj("Sin Datos", " Mensaje", false, true, false, "", "Aceptar", "", 200, 130, null, null, null);
                }
            }
        }
        else {
            Waiting(false, "Espere por favor. Cargando Información...");
            MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
        }
    }, null);
}

var arrayCamposACargarDatos = new Array();
var arregloCatalogosACargarPI = new Array();
var campoFoco = "";

function GeneraTablaCamposPI(camposPI, tipoEmpresa) {
    arregloCatalogosACargarPI = new Array();
    arrayCamposACargarDatos = new Array();
    var valorH = (document.documentElement.clientHeight - document.getElementById("divHeader").offsetHeight);
    valorH = valorH - 350;

    var cadena = ' <table style="width:100%"><tr> <td style="width: 95%"><fieldset id="fsDatosPI" style="border: 1px solid Gray; padding: 10px;"> <legend style="font-weight: bold; text-align: left;">PI</legend>';
    cadena += '<div id="divControlsPI" style="overflow: auto;height:' + valorH + 'px;"><table style="width:100%;text-align: left;font-size: 11px;">';
    var numeroCampos = 0;
    for (var ii = 0; ii < camposPI.split(',').length; ii++) {
        cadena += numeroCampos == 0 ? "<tr>" : "";
        // for (var iii = 0; iii < arregloTipoCampoYDatoPI.length; iii++) {
        //if (camposPI.split(',')[ii] == arregloTipoCampoYDatoPI[ii].split('-')[0]) {
        var addCampoXTipoEmp = existeCampoXTipoEmpresa(camposPI.split(',')[ii], camposValoresPermitidos);
        cadena += '<td style="width: 25%; height: 43px;font-weight: bold;"> <span id="lblCampo' + arregloTipoCampoYDatoPI[ii].split('-')[0] + '">' + arregloTipoCampoYDatoPI[ii].split('-')[0] + ". " + arregloTipoCampoYDatoPI[ii].split('-')[1].split(';')[2] + "</span><br />";
        if (arregloTipoCampoYDatoPI[ii].split('-')[1].split(';')[0] == "Combo") {
            cadena += '<select ' + (!addCampoXTipoEmp ? 'disabled="disabled"' : '') + ' id="sltCampo' + arregloTipoCampoYDatoPI[ii].split('-')[0] + '" ' + (arregloTipoCampoYDatoPI[ii].split('-')[0] == "144" || arregloTipoCampoYDatoPI[ii].split('-')[0] == "277" || arregloTipoCampoYDatoPI[ii].split('-')[0] == "290" ? ' onchange="SltFiltroAtrasoPI_Onchange(this.value);" ' : (arregloTipoCampoYDatoPI[ii].split('-')[0] == "3" ? ' onchange="TipoEmpresaPI_OnChange(this.value);" ' : '')) + ' style="width: 90%; font-size: x-small;' + (!addCampoXTipoEmp ? 'background: rgba(139, 139, 139, 0.35);display:none;' : '') + '" tabindex="' + (ii + 1) + '"></select>';
            if (!addCampoXTipoEmp) {
                cadena += '<div id="divsltCampo' + arregloTipoCampoYDatoPI[ii].split('-')[0] + '"  style=" background: rgb(202, 202, 202);/*background: rgba(139, 139, 139, 0.35);*/ height: 12px; width: 89%; overflow: hidden; color: #006432 padding: 2px 2px 2px 2px;border: thin solid rgba(128, 128, 128, 0.36);">';
                cadena += '<div  style="float: right;"><img src="../../Images/PanelDeControl/Expander/fAbajo.png" alt="" style="width: 11px;height: 9px;margin-bottom: 1px;" lang="aa" ></div>';
                cadena += '<div style="float: left;"><span id="spSltCampo' + arregloTipoCampoYDatoPI[ii].split('-')[0] + '" style="width: 90%;font-weight: 100;"></span> </div></div>';
            }
            arregloCatalogosACargarPI.push(arregloTipoCampoYDatoPI[ii].split('-')[0]);
        }
        if (arregloTipoCampoYDatoPI[ii].split('-')[1].split(';')[0] == "Input")
            cadena += ' <input ' + (!addCampoXTipoEmp ? 'disabled="disabled"' : '') + ' id="txtCampo' + arregloTipoCampoYDatoPI[ii].split('-')[0] + '" type="text" style="width: 90%; font-size: x-small;' + (!addCampoXTipoEmp ? 'background: rgb(202, 202, 202);/*background: rgba(139, 139, 139, 0.35);*/' : '') + '" tabindex="' + (ii + 1) + '" maxlength="' + arregloTipoCampoYDatoPI[ii].split('-')[1].split(';')[1] + '"  onkeydown="return FilterInputNumAndAlfa (event,false,true)" ' + (arregloTipoCampoYDatoPI[ii].split('-')[0] == 4 ? 'disabled="disabled"' : '') + '/>';
        if (arregloTipoCampoYDatoPI[ii].split('-')[1].split(';')[0] == "InputF") {
            cadena += '<input ' + (!addCampoXTipoEmp ? 'disabled="disabled"' : '') + ' id="txtCampo' + arregloTipoCampoYDatoPI[ii].split('-')[0] + '" size="20" style="width: 80%; font-size: x-small;' + (!addCampoXTipoEmp ? 'background: rgb(202, 202, 202);/*background: rgba(139, 139, 139, 0.35);*/' : '') + '" tabindex="' + (ii + 1) + '" type="text"  class="' + (arregloTipoCampoYDatoPI[ii].split('-')[0] == "289" ? 'CalendarioFC' : 'calendario') + '" maxlength="10" ' + (arregloTipoCampoYDatoPI[ii].split('-')[0] == "289" ? ' lang="aa" onchange="OnChangeFechasCortePI(event,this)"' : ' onchange="changeFormatoFecha(event,this);" ') +
                    ' onkeyup="OnChangeFechasCortePI(event,this);" onkeypress="if (event.keyCode==13) return false;"/>';
        }
        cadena += '</td>';

        arrayCamposACargarDatos.push((arregloTipoCampoYDatoPI[ii].split('-')[1].split(';')[0] != "Combo" ? "txtCampo" : "sltCampo") + arregloTipoCampoYDatoPI[ii].split('-')[0] + ";" + arregloTipoCampoYDatoPI[ii].split('-')[1].split(';')[3] + ";" + arregloTipoCampoYDatoPI[ii].split('-')[1].split(';')[2]);

        if (ii == 0)
            campoFoco = (arregloTipoCampoYDatoPI[ii].split('-')[1].split(';')[0] != "Combo" ? "txtCampo" : "sltCampo") + arregloTipoCampoYDatoPI[ii].split('-')[0];
        //}
        //}
        numeroCampos++;
        if (ii == 3) {
            //            cadena += '<td style="width: 12%"><input id="btnGuardarPI" type="button" value="Guardar" onclick="GuardarDatosPI();" style="width: 100px; font-size: x-small; margin-top: 3px;" size="" class="classButton" tabindex="9" />';
            //            cadena += '<input id="btnCancelarPI" type="button" value="Regresar" style="width: 100px;font-size: x-small; margin-top: 3px;" size="" onclick="FCancelarPI();" class="classButton" tabindex="10" /> <br /></td>';
            cadena += '</tr>';
            numeroCampos = 0;
        }
        if (numeroCampos == 4) {
            cadena += '<td style="width: 12%; height: 43px;"></td></tr>';
            numeroCampos = 0;
        }
    }
    cadena += '</table></div></fieldset> </br><div id="divSaldosAcreditadoPI" style="width:70%;height: 88px;overflow: auto;"></div></td> <td style="width: 5%" valign="top">';
    //cadena += '<input id="btnGuardarPI" type="button" value="Guardar" onclick="GuardarDatosPI();" style="width: 100px; font-size: x-small; margin-top: 3px;" size="" class="classButton" tabindex="9" />';
    cadena += '<input id="btnCancelarPI" type="button" value="Regresar" style="width: 100px;font-size: x-small; margin-top: 3px;" size="" onclick="FCancelarPI();" class="classButton" tabindex="10" /> ';
    cadena += '<br /></td></tr> </table>';
    return cadena;
}

function existeCampoXTipoEmpresa(campo, arregloRelaciones) {
    var existe = false;
    for (var i = 0; i < arregloRelaciones.split(',').length; i++) {
        if (parseInt(arregloRelaciones.split(',')[i]) == parseInt(campo)) {
            existe = true;
            break;
        }
    }
    return existe;
}

function SltFiltroAtrasoPI_Onchange(value) {
    //RecargarHtmlPorFiltroEspecial(value, $("#sltCampo3").val(), false)
}

function RecargarHtmlPorFiltroEspecial(valor, tipoEmpresa, recargarFechaActual) {
    //    var FiltroXTipoEmpresaGet = "";
    //    if (tipoEmpresa == "2")
    //        FiltroXTipoEmpresaGet = valor == "NO" ? "0" : "1";
    //    else if (tipoEmpresa == "3")
    //        FiltroXTipoEmpresaGet = valor;
    //    else
    //        FiltroXTipoEmpresaGet = valor == "111" ? "1" : "0";
    //    opcionAtrasoSelect = valor;
    //    fechaAtrasoSelect = $("#txtCampo289").val();
    //    tipoEmpresaAtrasoSelect = tipoEmpresa;
    //    LlenaArregloCamposAcargar(FiltroXTipoEmpresaGet, tipoEmpresa, false, recargarFechaActual);
}
var opcionAtrasoSelect = "";
var fechaAtrasoSelect = "";
var tipoEmpresaAtrasoSelect = "";
function CargarCatalogosPI(idArregloDeCarga, idAtraso, tipoEmpresa, cargarDatosPI, recargarFechaActual) {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Portafolio.Disposiciones.Default.CargarCatalogodXTipoEmpresa(arregloCatalogosACargarPI[idArregloDeCarga], tipoEmpresa, idAtraso,
        function (response) {
            if (response.value.indexOf("Error") == -1) {

                var Items = obtenerArregloDeJSON(response.value, false);
                document.getElementById("sltCampo" + arregloCatalogosACargarPI[idArregloDeCarga]).options.length = 0;

                var opcion = new Option("-- Seleccione una opción --", -1);
                document.getElementById("sltCampo" + arregloCatalogosACargarPI[idArregloDeCarga]).options[document.getElementById("sltCampo" + arregloCatalogosACargarPI[idArregloDeCarga]).options.length] = opcion;
                document.getElementById("sltCampo" + arregloCatalogosACargarPI[idArregloDeCarga]).options[document.getElementById("sltCampo" + arregloCatalogosACargarPI[idArregloDeCarga]).options.length - 1].title = "-- Seleccione una opción --";

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    if (Item.Clave != "-9") {
                        var opcion = new Option(Item.Clave + "-" + Item.Descripcion, Item.Clave);
                        document.getElementById("sltCampo" + arregloCatalogosACargarPI[idArregloDeCarga]).options[document.getElementById("sltCampo" + arregloCatalogosACargarPI[idArregloDeCarga]).options.length] = opcion;
                        document.getElementById("sltCampo" + arregloCatalogosACargarPI[idArregloDeCarga]).options[document.getElementById("sltCampo" + arregloCatalogosACargarPI[idArregloDeCarga]).options.length - 1].title = Item.Clave + "-" + Item.Descripcion;
                    }
                }

            } //else
            //MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);

            if ((idArregloDeCarga + 1) < arregloCatalogosACargarPI.length)
                CargarCatalogosPI(idArregloDeCarga + 1, idAtraso, tipoEmpresa, cargarDatosPI, recargarFechaActual)
            else if ((idArregloDeCarga + 1) == arregloCatalogosACargarPI.length) {
                // $("#" + campoFoco).focus(); 
                RecargarCampoAtraso("sltCampo" + objetoAtraso, "lblCampo" + objetoAtraso, tipoEmpresa);
                if (cargarDatosPI)
                    ObtenerDatosPI(FechaActual, false, recargarFechaActual);
                else if (ItemsPIBuscar != null) {
                    for (var i = 0; i < arrayCamposACargarDatos.length; i++) {
                        if (arrayCamposACargarDatos[i].split(';')[0] == "txtCampo150" || arrayCamposACargarDatos[i].split(';')[0] == "txtCampo151" || arrayCamposACargarDatos[i].split(';')[0] == "txtCampo289") {
                            var fecha1 = "";
                            if (arrayCamposACargarDatos[i].split(';')[0] == "txtCampo289") {
                                fecha1 = ItemsPIBuscar[0][arrayCamposACargarDatos[i].split(';')[1]];
                                $("#" + arrayCamposACargarDatos[i].split(';')[0]).val(fecha1.substring(8, 6) + "/" + fecha1.substring(6, 4) + "/" + fecha1.substring(4, 0));
                            }
                            else {
                                fecha1 = ItemsPIBuscar[0][arrayCamposACargarDatos[i].split(';')[1]];
                                $("#" + arrayCamposACargarDatos[i].split(';')[0]).val(fecha1.substring(6, 8) + "/" + fecha1.substring(4, 6) + "/" + fecha1.substring(0, 4));
                            }
                        }
                        else {
                            if (arrayCamposACargarDatos[i].split(';')[0].indexOf("txt") != -1 && arrayCamposACargarDatos[i].split(';')[0] != "txtCampo4")
                                $("#" + arrayCamposACargarDatos[i].split(';')[0]).val(DevuelveCantidadSeparadaPorComas(ItemsPIBuscar[0][arrayCamposACargarDatos[i].split(';')[1]], false));
                            else
                                $("#" + arrayCamposACargarDatos[i].split(';')[0]).val(ItemsPIBuscar[0][arrayCamposACargarDatos[i].split(';')[1]]);
                        }
                    }
                }
                if (ItemsPIBuscar == null) {
                    $("#txtCampo4").val($("#btnVerPI").attr("alt"));
                }
                if (fechaCorteG != "" && fechaCorteG == FechaActual && recargarFechaActual) {
                    $("#sltCampo" + objetoAtraso).val(valorAtrasoEdicionCliente);
                    $("#sltCampo" + objetoAtraso).attr("disabled", true);
                    $("#sltCampo3").val(valorTipoEmpresaEdicionCliente);
                    $("#sltCampo3").attr("disabled", true);
                }
                //objetoAtraso = (tipoEmpresa == "2" ? "277" : (tipoEmpresa == "3" ? "290" : "144"));
                if (opcionAtrasoSelect != "") {
                    $("#sltCampo" + objetoAtraso).val(opcionAtrasoSelect);
                    //objetoAtraso = (tipoEmpresa == "2" ? "277" : (tipoEmpresa == "3" ? "290" : "144"));
                    $("#txtCampo289").val(fechaAtrasoSelect);
                    $("#sltCampo3").val(tipoEmpresaAtrasoSelect);
                    fechaAtrasoSelect = "";
                    opcionAtrasoSelect = "";
                    tipoEmpresaAtrasoSelect = "";
                }
                if (!cargarDatosPI)
                    Waiting(false, "Espere por favor. Cargando Información...");
            }
        }
    );
}

var objetoAtraso = "";
function TipoEmpresaPI_OnChange(value) {
    //   RecargarCampoAtraso("sltCampo" + objetoAtraso, "lblCampo" + objetoAtraso, value);
}

function RecargarCampoAtraso(campo, lblAtraso, tipoEmpresa) {
    //    document.getElementById(campo).options.length = 0;
    //    var opcion = new Option("-- Seleccione una opción --", -1);
    //    document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
    //    document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "-- Seleccione una opción --";
    //    if (tipoEmpresa == "2") {
    //        $("#" + lblAtraso).html("Entidad Financiera Otorgante");
    //        var opcion = new Option("NO", "NO");
    //        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
    //        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "NO";
    //        var opcion = new Option("SI", "SI");
    //        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
    //        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "SI";
    //    }
    //    else if (tipoEmpresa == "3") {
    //        $("#" + lblAtraso).html("Atraso");
    //        var opcion = new Option("Sin Atraso", 0);
    //        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
    //        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "Sin Atraso";
    //        var opcion = new Option("Con Atraso", 1);
    //        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
    //        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "Con Atraso";
    //    }
    //    else if (tipoEmpresa != "-1") {
    //        $("#" + lblAtraso).html("Tamaño Ventas");
    //        var opcion = new Option("Pequeños corporativos", "111");
    //        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
    //        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "Pequeños corporativos";
    //        var opcion = new Option("Corporativos", "112");
    //        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
    //        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "Corporativos";
    //        var opcion = new Option("Grandes corporativos", "113");
    //        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
    //        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "Grandes corporativos";
    //    }
}

function FCancelarPI() {
    CambiarDiv('DatosCliente', 'DivDatosPI', false, true);
}

var ItemsPIBuscar = null;
var fechaCorteG = "";
function ObtenerDatosPI(fechaCorte, cargarCatalogos, recargarFechaActual) {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Portafolio.Disposiciones.Default.CargarDatosPI($('#txtIdAcreditado').val(), fechaCorte.split('/')[2] + '-' + fechaCorte.split('/')[1] + '-' + fechaCorte.split('/')[0],
        function (response) {
            var valorH = (document.documentElement.clientHeight - document.getElementById("divHeader").offsetHeight);
            ItemsPIBuscar = null;
            var tipoEmpresa = "";
            var campoGet = "";
            if (response.value.indexOf("Error") == -1) {
                if (response.value != "") {
                    valorH = valorH - 350;
                    document.getElementById("divSaldosAcreditadoPI").style.height = "88px";
                    esEdicionPI = true;
                    ItemsPIBuscar = obtenerArregloDeJSON(response.value.split("%%&&")[0], false);
                    campoGet = (ItemsPIBuscar[0]["fvcTipoDeEmpresa"] == "2" ? "277" : (ItemsPIBuscar[0]["fvcTipoDeEmpresa"] == "3" ? "290" : "144"));
                    tipoEmpresa = ItemsPIBuscar[0]["fvcTipoDeEmpresa"];
                    if (!cargarCatalogos) {
                        for (var i = 0; i < arrayCamposACargarDatos.length; i++) {
                            if (arrayCamposACargarDatos[i].split(';')[0] == "txtCampo150" || arrayCamposACargarDatos[i].split(';')[0] == "txtCampo151" || arrayCamposACargarDatos[i].split(';')[0] == "txtCampo289") {
                                var fecha1 = "";
                                if (arrayCamposACargarDatos[i].split(';')[0] == "txtCampo289") {
                                    fecha1 = ItemsPIBuscar[0][arrayCamposACargarDatos[i].split(';')[1]];
                                    fecha1 = (fecha1 != undefined && fecha1 != "" ? fecha1.substring(6, 8) + "/" + fecha1.substring(4, 6) + "/" + fecha1.substring(0, 4) : "");
                                    $("#" + arrayCamposACargarDatos[i].split(';')[0]).val(fecha1);
                                }
                                else {
                                    fecha1 = ItemsPIBuscar[0][arrayCamposACargarDatos[i].split(';')[1]];
                                    $("#" + arrayCamposACargarDatos[i].split(';')[0]).val(fecha1.substring(6, 8) + "/" + fecha1.substring(4, 6) + "/" + fecha1.substring(0, 4));
                                }
                            }
                            else {
                                if (arrayCamposACargarDatos[i].split(';')[0].indexOf("txt") != -1 && arrayCamposACargarDatos[i].split(';')[0] != "txtCampo4")
                                    $("#" + arrayCamposACargarDatos[i].split(';')[0]).val(DevuelveCantidadSeparadaPorComas(ItemsPIBuscar[0][arrayCamposACargarDatos[i].split(';')[1]], false));
                                else {
                                    $("#" + arrayCamposACargarDatos[i].split(';')[0]).val(ItemsPIBuscar[0][arrayCamposACargarDatos[i].split(';')[1]]);
                                    $("#spSltCampo" + arrayCamposACargarDatos[i].split(';')[0].replace(/\D/g, '')).html(ItemsPIBuscar[0][arrayCamposACargarDatos[i].split(';')[1]]);
                                }

                            }
                        }
                        var JSONSaldos = obtenerArregloDeJSON(response.value.split("%%&&")[1], false);
                        $("#divSaldosAcreditadoPI").html(generarTablaDeRegistrosSinFoot(JSONSaldos, "right", "4. ID Acreditado"));
                    }
                }
                else {
                    valorH = valorH - 280;
                    document.getElementById("divSaldosAcreditadoPI").style.height = "0px";
                    LimpiarDatosPI();
                    $("#divSaldosAcreditadoPI").html("");
                    esEdicionPI = false;
                    $("#txtCampo4").val($("#btnVerPI").attr("alt"));
                    $("#txtCampo4").val($("#txtIdAcreditado").val());
                    if (fechaCorte == FechaActual) {
                        fechaCorteG = fechaCorte;
                        $("#txtCampo289").val(FechaActual);
                        RecargarCampoAtraso("sltCampo" + objetoAtraso, "lblCampo" + objetoAtraso, valorTipoEmpresaEdicionCliente);
                        if (recargarFechaActual)
                            RecargarHtmlPorFiltroEspecial(valorAtrasoEdicionCliente, valorTipoEmpresaEdicionCliente, recargarFechaActual);
                        campoGet == "" ? (valorTipoEmpresaEdicionCliente == "2" ? "277" : (valorTipoEmpresaEdicionCliente == "3" ? "290" : "144")) : campoGet;
                        //$("#sltCampo" + objetoAtraso).val(valorAtrasoEdicionCliente);
                        //$("#sltCampo" + objetoAtraso).attr("disabled", true);
                        $("#sltCampo3").val(valorTipoEmpresaEdicionCliente);
                        $("#txtCampo4").val($("#txtIdAcreditado").val());
                        // $("#sltCampo3").attr("disabled", true);
                    }
                }
            } else
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            if (fechaCorte == FechaActual) {
                $("#sltCampo" + campoGet).attr("disabled", true);
                //$("#sltCampo3").attr("disabled", true);
            }
            //objetoAtraso = campoGet;

            if (cargarCatalogos && response.value != "") {
                var setCampo = tipoEmpresa == "2" ? "fnEntidadFinancieraOtorganteASuVezDeCrédito" : (tipoEmpresa == "3" ? "FIEsAtraso" : "fnClasificaciónPorTamañoDeVentasOIngresosNetosAnuales");
                var FiltroXTipoEmpresaGet = "";
                if (tipoEmpresa == "2")
                    FiltroXTipoEmpresaGet = ItemsPIBuscar[0][setCampo] == "NO" ? "0" : "1";
                else if (tipoEmpresa == "3")
                    FiltroXTipoEmpresaGet = ItemsPIBuscar[0][setCampo];
                else
                    FiltroXTipoEmpresaGet = ItemsPIBuscar[0][setCampo] == "111" ? "1" : "0";
                if ($("#sltCampo" + objetoAtraso).val() == ItemsPIBuscar[0][setCampo])
                    CargarCatalogosPI(0, FiltroXTipoEmpresaGet, tipoEmpresa, false, recargarFechaActual);
                else
                    RecargarHtmlPorFiltroEspecial(ItemsPIBuscar[0][setCampo], tipoEmpresa, recargarFechaActual);
            }
            else if (!recargarFechaActual || response.value == "") {
                setTimeout(terminarWait, 100);
            }
            document.getElementById("divControlsPI").style.height = valorH + "px";
            $("#txtCampo289").attr("lang", "aa");
            $("#sltCampo3").attr("disabled", true);
            $("#sltCampo3").css("background", "rgba(235, 235, 228, 1)");
        }
    );
}

function OnChangeFechasCortePI(evt, obj) {
    var fechaDate = new Date(FechaActual.split('/')[2], FechaActual.split('/')[1], FechaActual.split('/')[0])
    var fechaSelect = new Date($(obj).val().split('/')[2], $(obj).val().split('/')[1], $(obj).val().split('/')[0])
    var recargarFechaActual = false;
    if (changeFormatoFecha(evt, obj) && $(obj).attr("lang") == "aa") {
        $(obj).attr("lang", "ab");
        if (fechaSelect < fechaDate) {
            $("#sltCampo" + (valorTipoEmpresaEdicionCliente == "2" ? "277" : (valorTipoEmpresaEdicionCliente == "3" ? "290" : "144"))).attr("disabled", false);
            $("#sltCampo3").attr("disabled", false);
            recargarFechaActual = false;
        }
        else {
            $("#sltCampo" + (valorTipoEmpresaEdicionCliente == "2" ? "277" : (valorTipoEmpresaEdicionCliente == "3" ? "290" : "144"))).attr("disabled", true);
            $("#sltCampo" + (valorTipoEmpresaEdicionCliente == "2" ? "277" : (valorTipoEmpresaEdicionCliente == "3" ? "290" : "144"))).val(valorAtrasoEdicionCliente);
            $("#sltCampo3").val(valorTipoEmpresaEdicionCliente);
            $("#sltCampo3").attr("disabled", true);
            recargarFechaActual = true;
        }
        for (var i = 0; i < arrayCamposACargarDatos.length; i++)
            document.getElementById(arrayCamposACargarDatos[i].split(';')[0]).style.border = "1px solid Gray";
        ObtenerDatosPI($(obj).val(), false, recargarFechaActual);
    }
}

var esEdicionPI = false;
function GuardarDatosPI() {
    if (NoVacioDatosPI()) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var parametros = {
            fvcIdDelAcreditadoAsignadoPorLaInstitución: $("#txtCampo4").val() != undefined ? replaceAll($("#txtCampo4").val(), ",", "") : "0",
            ClasificaciónPorTamañoDeVentasOIngresosNetosAnuales: $("#sltCampo144").val() != undefined ? $("#sltCampo144").val() : DeterminaValorPermitidoDeCampo("144"),
            PuntajeCrediticioTotal: $("#txtCampo145").val() != undefined ? replaceAll($("#txtCampo145").val(), ",", "") : "0",
            PuntajeCrediticioCuantitativo: $("#txtCampo146").val() != undefined ? replaceAll($("#txtCampo146").val(), ",", "") : "0",
            fnPuntajeCrediticioCualitativo: $("#txtCampo147").val() != undefined ? replaceAll($("#txtCampo147").val(), ",", "") : "0",
            fnCréditoReportadoALaSic: $("#sltCampo148").val() != undefined ? $("#sltCampo148").val() : DeterminaValorPermitidoDeCampo("148"),
            fnLaSicRegresoElReporteYSeCalificóConformeAEstaInformación_HitEnSic: $("#sltCampo149").val() != undefined ? $("#sltCampo149").val() : DeterminaValorPermitidoDeCampo("149"),
            fnFechaDeLaConsultaRealizadaALaSic: $("#txtCampo150").val() != undefined ? $("#txtCampo150").val().split('/')[2] + $("#txtCampo150").val().split('/')[1] + $("#txtCampo150").val().split('/')[0] : "0",
            fnFechaDeLosEstadosFinancierosUtilzadosParaElCálculoDeLosPuntajes: $("#txtCampo151").val() != undefined ? $("#txtCampo151").val().split('/')[2] + $("#txtCampo151").val().split('/')[1] + $("#txtCampo151").val().split('/')[0] : "0",
            fnNúmeroDeMesesTranscurridosDesdeQueSeAsignóPi100: $("#txtCampo152").val() != undefined ? replaceAll($("#txtCampo152").val(), ",", "") : "0",
            fnCumpleConCriteriosDeContabilidadGubernamental: $("#sltCampo155").val() != undefined ? $("#sltCampo155").val() : DeterminaValorPermitidoDeCampo("155"),
            fnActivoCirculante: $("#txtCampo156").val() != undefined ? replaceAll($("#txtCampo156").val(), ",", "") : "0",
            fnActivoTotalAnual: $("#txtCampo157").val() != undefined ? replaceAll($("#txtCampo157").val(), ",", "") : "0",
            fnAntigüedadEnLaSociedadDeInformaciónCrediticia: $("#txtCampo158").val() != undefined ? replaceAll($("#txtCampo158").val(), ",", "") : "0",
            fnAportacionesAlInfonavitEnElÚltimoBimestre: $("#txtCampo159").val() != undefined ? replaceAll($("#txtCampo159").val(), ",", "") : "0", fnCapitalContable: $("#txtCampo160").val() != undefined ? replaceAll($("#txtCampo160").val(), ",", "") : "0",
            fnCuentasOCréditosAbiertosConInstitucionesBancariasEnLosÚltimos12Meses: $("#txtCampo161").val() != undefined ? replaceAll($("#txtCampo161").val(), ",", "") : "0",
            fnDíasDeAtrasoConElInfonavitEnElÚltimoBimestre: $("#txtCampo162").val() != undefined ? replaceAll($("#txtCampo162").val(), ",", "") : "0",
            fnIndicadorDePersonasMoralesOFideicomiso: $("#sltCampo163").val() != undefined ? $("#sltCampo163").val() : DeterminaValorPermitidoDeCampo("163"), fnIngresosBrutosAnuales: $("#txtCampo164").val() != undefined ? replaceAll($("#txtCampo164").val(), ",", "") : "0",
            fnMontoMáximoDeCréditoOtorgadoPorInstitucionesBancariasEnLosÚltimos12MesesExpresadoEnUdis: $("#txtCampo165").val() != undefined ? replaceAll($("#txtCampo165").val(), ",", "") : "0",
            fnNúmeroDeDíasDeMoraPromedioConInstitucionesBancariasEnLosÚltimos12Meses: $("#txtCampo166").val() != undefined ? replaceAll($("#txtCampo166").val(), ",", "") : "0",
            fnNúmeroDeEmpleados: $("#txtCampo167").val() != undefined ? replaceAll($("#txtCampo167").val(), ",", "") : "0",
            fnNúmeroDeInstitucionesReportadasEnLosÚltimos12Meses: $("#txtCampo168").val() != undefined ? replaceAll($("#txtCampo168").val(), ",", "") : "0",
            fnNúmeroDeMesesDesdeElÚltimoCréditoAbiertoEnLosÚltimos12Meses: $("#txtCampo169").val() != undefined ? replaceAll($("#txtCampo169").val(), ",", "") : "0",
            fnNúmeroDePagosEnTiempoQueLaEmpresaRealizóAInstitucionesBancariasEnLosÚltimos12Meses: $("#txtCampo170").val() != undefined ? $("#txtCampo170").val() : "0",
            fnPasivoCirculante: $("#txtCampo171").val() != undefined ? $("#txtCampo171").val() : "0",
            fnPorcentajeDePagosAEntidadesComercialesCon60OMásDíasDeAtrasoEnLosÚltimos12Meses: $("#txtCampo172").val() != undefined ? replaceAll($("#txtCampo172").val(), ",", "") : "0",
            fnPorcentajeDePagosAInstitucionesBancariasCon60OMásDíasDeAtrasoEnLosÚltimos24Meses: $("#txtCampo173").val() != undefined ? replaceAll($("#txtCampo173").val(), ",", "") : "0",
            fnPorcentajeDePagosAInstitucionesBancariasCon90OMásDíasDeAtrasoEnLosÚltimos12Meses: $("#txtCampo174").val() != undefined ? replaceAll($("#txtCampo174").val(), ",", "") : "0",
            fnPorcentajeDePagosAInstitucionesBancariasDe1A29DíasDeAtrasoEnLosÚltimos12Meses: $("#txtCampo175").val() != undefined ? replaceAll($("#txtCampo175").val(), ",", "") : "0",
            fnPorcentajeDePagosEnTiempoConEntidadesFinancierasNoBancariasEnLosÚltimos12Meses: $("#txtCampo176").val() != undefined ? replaceAll($("#txtCampo176").val(), ",", "") : "0",
            fnPorcentajeDePagosEnTiempoConInstitucionesBancariasEnLosÚltimos12Meses: $("#txtCampo177").val() != undefined ? replaceAll($("#txtCampo177").val(), ",", "") : "0",
            fnPuntajeAsignadoPorAntigüedadEnSociedadesDeInformaciónCrediticia: $("#sltCampo178").val() != undefined ? $("#sltCampo178").val() : DeterminaValorPermitidoDeCampo("178"),
            fnPuntajeAsignadoPorClientes: $("#sltCampo179").val() != undefined ? $("#sltCampo179").val() : DeterminaValorPermitidoDeCampo("179"),
            fnPuntajeAsignadoPorComposiciónAccionaria: $("#sltCampo180").val() != undefined ? $("#sltCampo180").val() : DeterminaValorPermitidoDeCampo("180"),
            fnPuntajeAsignadoPorCuentasOCréditosAbiertosConInstitucionesBancariasEnLosÚltimos12Meses: $("#sltCampo181").val() != undefined ? $("#sltCampo181").val() : DeterminaValorPermitidoDeCampo("181"),
            fnPuntajeAsignadoPorDíasAtrasadosInfonavitEnElÚltimoBimestre: $("#sltCampo182").val() != undefined ? $("#sltCampo182").val() : DeterminaValorPermitidoDeCampo("182"),
            fnPuntajeAsignadoPorElMontoMáximoDeCréditoOtorgadoPorInstitucionesBancariasEnLosÚltimos12Meses: $("#sltCampo183").val() != undefined ? $("#sltCampo183").val() : DeterminaValorPermitidoDeCampo("183"),
            fnPuntajeAsignadoPorElNúmeroDeInstitucionesReportadasEnLosÚltimos12Meses: $("#sltCampo184").val() != undefined ? $("#sltCampo184").val() : DeterminaValorPermitidoDeCampo("184"),
            fnPuntajeAsignadoPorElNúmeroDeMesesDesdeElÚltimoCréditoAbiertoEnLosÚltimos12Meses: $("#sltCampo185").val() != undefined ? $("#sltCampo185").val() : DeterminaValorPermitidoDeCampo("185"),
            fnPuntajeAsignadoPorElNúmeroDePagosEnTiempoQueLaEmpresaRealizóAInstitucionesBancariasEnLosÚltimos12Meses: $("#sltCampo186").val() != undefined ? $("#sltCampo186").val() : DeterminaValorPermitidoDeCampo("186"),
            fnPuntajeAsignadoPorElPorcentajeDePagosAInstitucionesBancariasDe1A29DíasDeAtrasoEnLosÚltimos12Meses: $("#sltCampo187").val() != undefined ? $("#sltCampo187").val() : DeterminaValorPermitidoDeCampo("187"),
            fnPuntajeAsignadoPorElPorcentajeDePagosAEntidadesComercialesCon60OMásDíasDeAtrasoEnLosÚltimos12Meses: $("#sltCampo188").val() != undefined ? $("#sltCampo188").val() : DeterminaValorPermitidoDeCampo("188"),
            fnPuntajeAsignadoPorElPorcentajeDePagosAInstitucionesBancariasCon60OMásDíasDeAtrasoEnLosÚltimos24Meses: $("#sltCampo189").val() != undefined ? $("#sltCampo189").val() : DeterminaValorPermitidoDeCampo("189"),
            fnPuntajeAsignadoPorElPorcentajeDePagosAInstitucionesBancariasCon90OMásDíasDeAtrasoEnLosÚltimos12Meses: $("#sltCampo190").val() != undefined ? $("#sltCampo190").val() : DeterminaValorPermitidoDeCampo("190"),
            fnPuntajeAsignadoPorElPorcentajeDePagosEnTiempoConEntidadesFinancierasNoBancariasEnLosÚltimos12Meses: $("#sltCampo191").val() != undefined ? $("#sltCampo191").val() : DeterminaValorPermitidoDeCampo("191"),
            fnPuntajeAsignadoPorElTotalDePagosAlInfonavitEnElÚltimoBimestre: $("#sltCampo192").val() != undefined ? $("#sltCampo192").val() : DeterminaValorPermitidoDeCampo("192"),
            fnPuntajeAsignadoPorEstabilidadEconómica: $("#sltCampo193").val() != undefined ? $("#sltCampo193").val() : DeterminaValorPermitidoDeCampo("193"),
            fnPuntajeAsignadoPorEstadosFinancierosAuditados: $("#sltCampo194").val() != undefined ? $("#sltCampo194").val() : DeterminaValorPermitidoDeCampo("194"),
            fnPuntajeAsignadoPorEstructuraOrganizacional: $("#sltCampo195").val() != undefined ? $("#sltCampo195").val() : DeterminaValorPermitidoDeCampo("195"),
            fnPuntajeAsignadoPorIndependenciaDelConsejoDeAdministración: $("#sltCampo196").val() != undefined ? $("#sltCampo196").val() : DeterminaValorPermitidoDeCampo("196"),
            fnPuntajeAsignadoPorIndicadorDePersonasMoralesOFideicomiso: $("#sltCampo197").val() != undefined ? $("#sltCampo197").val() : DeterminaValorPermitidoDeCampo("197"),
            fnPuntajeAsignadoPorIntensidadYCaracterísticasDeLaCompetencia: $("#sltCampo198").val() != undefined ? $("#sltCampo198").val() : DeterminaValorPermitidoDeCampo("198"),
            fnPuntajeAsignadoPorLaRazónUafirEntreGastosFinancieros: $("#sltCampo199").val() != undefined ? $("#sltCampo199").val() : DeterminaValorPermitidoDeCampo("199"),
            fnPuntajeAsignadoPorLasAportacionesAlInfonavitEnElÚltimoBimestre: $("#sltCampo200").val() != undefined ? $("#sltCampo200").val() : DeterminaValorPermitidoDeCampo("200"),
            fnPuntajeAsignadoPorLiquidezOperativa: $("#sltCampo201").val() != undefined ? $("#sltCampo201").val() : DeterminaValorPermitidoDeCampo("201"),
            fnPuntajeAsignadoPorLosDíasDeMoraPromedioConInstitucionesBancariasEnLosÚltimos12Meses: $("#sltCampo202").val() != undefined ? $("#sltCampo202").val() : DeterminaValorPermitidoDeCampo("202"),
            fnPuntajeAsignadoPorNúmeroDeAgenciasCalificadoras: $("#sltCampo203").val() != undefined ? $("#sltCampo203").val() : DeterminaValorPermitidoDeCampo("203"),
            fnPuntajeAsignadoPorPresenciaDeQuitasCastigosYReestructurasConInstitucionesBancariasEnLosÚltimos12Meses: $("#sltCampo204").val() != undefined ? $("#sltCampo204").val() : DeterminaValorPermitidoDeCampo("204"),
            fnPuntajeAsignadoPorProcesosDeOriginaciónYAdministraciónDeCréditosEstadísticamenteDiferenciados: $("#sltCampo205").val() != undefined ? $("#sltCampo205").val() : DeterminaValorPermitidoDeCampo("205"),
            fnPuntajeAsignadoPorProveedores: $("#sltCampo206").val() != undefined ? $("#sltCampo206").val() : DeterminaValorPermitidoDeCampo("206"),
            fnPuntajeAsignadoPorRoe: $("#sltCampo207").val() != undefined ? $("#sltCampo207").val() : DeterminaValorPermitidoDeCampo("207"),
            fnPuntajeAsignadoPorRotaciónDeActivosTotales: $("#sltCampo208").val() != undefined ? $("#sltCampo208").val() : DeterminaValorPermitidoDeCampo("208"),
            fnPuntajeAsignadoPorRotaciónDeCapitalDeTrabajo: $("#sltCampo209").val() != undefined ? $("#sltCampo209").val() : DeterminaValorPermitidoDeCampo("209"),
            fnPuntajeAsignadoPorTasaDeRetenciónLaboral: $("#sltCampo210").val() != undefined ? $("#sltCampo210").val() : DeterminaValorPermitidoDeCampo("210"),
            fnPuntajeBalanceOperativoAPibLocal: $("#txtCampo211").val() != undefined ? replaceAll($("#txtCampo211").val(), ",", "") : "0",
            fnPuntajeDeudaCortoPlazoADeudaTotal: $("#txtCampo212").val() != undefined ? replaceAll($("#txtCampo212").val(), ",", "") : "0",
            fnPuntajeDeudaTotalAParticipacionesElegibles: $("#txtCampo213").val() != undefined ? replaceAll($("#txtCampo213").val(), ",", "") : "0",
            fnPuntajeEmisiónDeDeudaEnCirculaciónEnElMercadoDeValores: $("#txtCampo214").val() != undefined ? replaceAll($("#txtCampo214").val(), ",", "") : "0",
            fnPuntajeIngresosPropiosAIngresosTotales: $("#txtCampo215").val() != undefined ? replaceAll($("#txtCampo215").val(), ",", "") : "0",
            fnPuntajeIngresosTotalesAGastoCorriente: $("#txtCampo216").val() != undefined ? replaceAll($("#txtCampo216").val(), ",", "") : "0", fnPuntajeInversiónAIngresosTotales: $("#txtCampo217").val() != undefined ? replaceAll($("#txtCampo217").val(), ",", "") : "0",
            fnPuntajeNivelYEficienciaEnRecaudación: $("#txtCampo218").val() != undefined ? replaceAll($("#txtCampo218").val(), ",", "") : "0",
            fnPuntajeNúmeroDeInstitucionesCalificadorasReconocidasConformeALasPresentesDisposicionesQueOtorganCalifALaEntFedOMun: $("#txtCampo219").val() != undefined ? replaceAll($("#txtCampo219").val(), ",", "") : "0",
            fnPuntajeObligacionesContingentesDerivadasDeBeneficiosAlRetiroAIngresosTotalesAjustados: $("#txtCampo220").val() != undefined ? replaceAll($("#txtCampo220").val(), ",", "") : "0",
            fnPuntajePorcentajeDePagosEnTiempoConInstitucionesFinancierasBancarias: $("#sltCampo221").val() != undefined ? $("#sltCampo221").val() : DeterminaValorPermitidoDeCampo("221"),
            fnPuntajePresenciaDeServiciosFinancierosDeEntidadesReguladas: $("#txtCampo222").val() != undefined ? replaceAll($("#txtCampo222").val(), ",", "") : "0",
            fnPuntajeServicioDeDeudaAIngresosTotalesAjustados: $("#txtCampo223").val() != undefined ? replaceAll($("#txtCampo223").val(), ",", "") : "0",
            fnPuntajeSolidezYFlexibilidadDelMarcoNormativoEInstitucionalParaLaAprobaciónEImposiciónDeImpuestosLocales: $("#txtCampo224").val() != undefined ? replaceAll($("#txtCampo224").val(), ",", "") : "0",
            fnPuntajeSolidezYFlexibilidadDelMarcoNormativoEInstitucionalParaLaAprobaciónYEjecuciónDelPresupuesto: $("#txtCampo225").val() != undefined ? replaceAll($("#txtCampo225").val(), ",", "") : "0",
            fnPuntajeTasaDeDesempleoLocal: $("#txtCampo226").val() != undefined ? replaceAll($("#txtCampo226").val(), ",", "") : "0", fnPuntajeTransparenciaEnFinanzasPúblicasYDeudaPública: $("#txtCampo227").val() != undefined ? replaceAll($("#txtCampo227").val(), ",", "") : "0",
            fnRendimientoSobreCapital_Roe: $("#txtCampo228").val() != undefined ? replaceAll($("#txtCampo228").val(), ",", "") : "0", fnRotaciónCapitalDeTrabajo: $("#txtCampo229").val() != undefined ? replaceAll($("#txtCampo229").val(), ",", "") : "0",
            fnRotaciónDeActivosTotales: $("#txtCampo230").val() != undefined ? replaceAll($("#txtCampo230").val(), ",", "") : "0", fnSaldoDeGastosCorrientes: $("#txtCampo231").val() != undefined ? replaceAll($("#txtCampo231").val(), ",", "") : "0",
            fnSaldoDeIngresosPropios: $("#txtCampo232").val() != undefined ? replaceAll($("#txtCampo232").val(), ",", "") : "0", fnSaldoDeInversión: $("#txtCampo233").val() != undefined ? replaceAll($("#txtCampo233").val(), ",", "") : "0",
            /*fnSaldoDeLaDeudaTotal: $("#txtCampo234").val() != undefined ? replaceAll($("#txtCampo234").val(), ",", "") : "0",*/fnSaldoDeLasParticipacionesElegibles: $("#txtCampo235").val() != undefined ? replaceAll($("#txtCampo235").val(), ",", "") : "0",
            fnSaldoDeLosIngresosTotales: $("#txtCampo236").val() != undefined ? replaceAll($("#txtCampo236").val(), ",", "") : "0", fnSaldoDeLosIngresosTotalesAjustados: $("#txtCampo237").val() != undefined ? replaceAll($("#txtCampo237").val(), ",", "") : "0",
            fnSaldoDeudaCortoPlazo: $("#txtCampo238").val() != undefined ? replaceAll($("#txtCampo238").val(), ",", "") : "0", fnTasaDeRetenciónLaboral: $("#txtCampo239").val() != undefined ? replaceAll($("#txtCampo239").val(), ",", "") : "0",
            fnTotalDePagosAlInfonavitEnElÚltimoBimestre: $("#txtCampo240").val() != undefined ? replaceAll($("#txtCampo240").val(), ",", "") : "0", fnUtilidadNeta: $("#txtCampo241").val() != undefined ? replaceAll($("#txtCampo241").val(), ",", "") : "0",
            fnVentasNetasTotalesAnuales: $("#txtCampo242").val() != undefined ? replaceAll($("#txtCampo242").val(), ",", "") : "0", fnClasificaciónPorMontoDeActivos: $("#sltCampo243").val() != undefined ? $("#sltCampo243").val() : DeterminaValorPermitidoDeCampo("243"),
            fnPuntajeAsignadoPorEntidadFinancieraSujetaARegulaciónBancaria: $("#sltCampo244").val() != undefined ? $("#sltCampo244").val() : DeterminaValorPermitidoDeCampo("244"),
            fnPuntajeAsignadoPorLaProporciónDelPasivoALargoPlazoMásPasivosDeExigibilidadInmediataRespectoDeLaCarteraDeCrédito: $("#sltCampo245").val() != undefined ? $("#sltCampo245").val() : DeterminaValorPermitidoDeCampo("245"),
            fnPuntajeAsignadoPorÍndiceDeCapitalización: $("#sltCampo246").val() != undefined ? $("#sltCampo246").val() : DeterminaValorPermitidoDeCampo("246"),
            fnPuntajeAsignadoPorGastosDeAdministraciónYPromociónAIngresosTotales: $("#sltCampo247").val() != undefined ? $("#sltCampo247").val() : DeterminaValorPermitidoDeCampo("247"),
            fnPuntajeAsignadoPorCarteraVencidaACapitalContableMásReservasDerivadasDeLaCalificaciónDeCartera: $("#sltCampo248").val() != undefined ? $("#sltCampo248").val() : DeterminaValorPermitidoDeCampo("248"),
            fnPuntajeAsignadoPorMargenFinancieroAjustadoPorRiesgoEntreActivosProductivos: $("#sltCampo249").val() != undefined ? $("#sltCampo249").val() : DeterminaValorPermitidoDeCampo("249"),
            fnPuntajeAsignadoPorEmisiónDeTítulosDeDeudaEnOfertaPública: $("#sltCampo250").val() != undefined ? $("#sltCampo250").val() : DeterminaValorPermitidoDeCampo("250"),
            fnPasivoALargoPlazo: $("#txtCampo251").val() != undefined ? replaceAll($("#txtCampo251").val(), ",", "") : "0", fnPasivosDeExigibilidadInmediata: $("#txtCampo252").val() != undefined ? replaceAll($("#txtCampo252").val(), ",", "") : "0",
            fnCarteraDeCrédito: $("#txtCampo253").val() != undefined ? replaceAll($("#txtCampo253").val(), ",", "") : "0", fnUtilidadNetaDelTrimestreAnualizada: $("#txtCampo254").val() != undefined ? replaceAll($("#txtCampo254").val(), ",", "") : "0",
            fnCapitalContablePromedio: $("#txtCampo255").val() != undefined ? replaceAll($("#txtCampo255").val(), ",", "") : "0", fnCapitalNeto: $("#txtCampo256").val() != undefined ? replaceAll($("#txtCampo256").val(), ",", "") : "0",
            fnActivosSujetosARiesgo: $("#txtCampo257").val() != undefined ? replaceAll($("#txtCampo257").val(), ",", "") : "0", fnÍndiceDeCapitalización: $("#txtCampo258").val() != undefined ? replaceAll($("#txtCampo258").val(), ",", "") : "0",
            fnGastosDeAdministraciónYPromoción: $("#txtCampo259").val() != undefined ? replaceAll($("#txtCampo259").val(), ",", "") : "0", fnIngresosTotales: $("#txtCampo260").val() != undefined ? replaceAll($("#txtCampo260").val(), ",", "") : "0",
            fnCarteraVencida: $("#txtCampo261").val() != undefined ? replaceAll($("#txtCampo261").val(), ",", "") : "0", fnReservasDerivadasDeLaCalificaciónDeCartera: $("#txtCampo262").val() != undefined ? replaceAll($("#txtCampo262").val(), ",", "") : "0",
            fnMargenFinanciero: $("#txtCampo263").val() != undefined ? replaceAll($("#txtCampo263").val(), ",", "") : "0", fnEstimaciónPreventivaParaRiesgosCrediticios: $("#txtCampo264").val() != undefined ? replaceAll($("#txtCampo264").val(), ",", "") : "0",
            fnActivosProductivos: $("#txtCampo265").val() != undefined ? replaceAll($("#txtCampo265").val(), ",", "") : "0", fnPuntajeAsignadoPorSolvencia: $("#sltCampo266").val() != undefined ? $("#sltCampo266").val() : DeterminaValorPermitidoDeCampo("266"),
            fnPuntajeAsignadoPorLiquidez: $("#sltCampo267").val() != undefined ? $("#sltCampo267").val() : DeterminaValorPermitidoDeCampo("267"),
            fnPuntajeAsignadoPorNivelDeEficiencia: $("#sltCampo268").val() != undefined ? $("#sltCampo268").val() : DeterminaValorPermitidoDeCampo("268"),
            fnPuntajeAsignadoPorEmisiónDeTítulosDeDeudaEnOfertaPública_EntidadesNoOtorgantesDeCrédito: $("#sltCampo269").val() != undefined ? $("#sltCampo269").val() : DeterminaValorPermitidoDeCampo("269"),
            fnPuntajeAsignadoAEntidadesFinancierasNoBancariasSujetasARegulaciónBancaria_EntidadesNoOtorgantesDeCrédito: $("#sltCampo270").val() != undefined ? $("#sltCampo270").val() : DeterminaValorPermitidoDeCampo("270"),
            fnPuntajeAsignadoPorDiversificaciónDeLíneasDeNegocio: $("#sltCampo271").val() != undefined ? $("#sltCampo271").val() : DeterminaValorPermitidoDeCampo("271"),
            fnPuntajeAsignadoPorDiversificaciónDeTiposDeFuentesDeFinanciamiento: $("#sltCampo272").val() != undefined ? $("#sltCampo272").val() : DeterminaValorPermitidoDeCampo("272"),
            fnPuntajeAsignadoPorConcentraciónDeActivos: $("#sltCampo273").val() != undefined ? $("#sltCampo273").val() : DeterminaValorPermitidoDeCampo("273"), fnPuntajeAsignadoPorCalidadDelGobiernoCorporativo: $("#sltCampo274").val() != undefined ? $("#sltCampo274").val() : DeterminaValorPermitidoDeCampo("274"),
            fnPuntajeAsignadoPorAniosDeExperienciaDeLosFuncionariosEnLaAdministración: $("#sltCampo275").val() != undefined ? $("#sltCampo275").val() : DeterminaValorPermitidoDeCampo("275"),
            fnPuntajeAsignadoPorExistenciaDePolíticasYProcedimientos: $("#sltCampo276").val() != undefined ? $("#sltCampo276").val() : DeterminaValorPermitidoDeCampo("276"), fnPuntajeAsignadoPorROEBIS: $("#sltCampo278").val() != undefined ? $("#sltCampo278").val() : DeterminaValorPermitidoDeCampo("278"),
            FVCFechaCorte: $("#txtCampo289").val() != undefined ? $("#txtCampo289").val().split('/')[2] + '-' + $("#txtCampo289").val().split('/')[1] + '-' + $("#txtCampo289").val().split('/')[0] : "0",
            //FIEsAtraso: $("#sltCampo290").val() != undefined ? $("#sltCampo290").val() : DeterminaValorPermitidoDeCampo("290"),
            //fnEntidadFinancieraOtorganteASuVezDeCrédito: $("#sltCampo277").val() != undefined ? $("#sltCampo277").val() : DeterminaValorPermitidoDeCampo("277"),
            fvcTipoDeEmpresa: $("#sltCampo3").val() != undefined ? $("#sltCampo3").val() : DeterminaValorPermitidoDeCampo("sltCampo3"),
            opcion: esEdicionPI ? 1 : 0
        };
        peticionAjax('Default.aspx/GuardarPI', "POST", parametros, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    MostrarMsj("Información almacenada exitosamente.", " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
                    LimpiarDatosPI();
                    CambiarDiv('DatosCliente', 'DivDatosPI', false, true);
                }
            }
            else MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function DeterminaValorPermitidoDeCampo(campo) {
    var valorPermitido = "-9";
    for (var i = 0; i < camposValoresPermitidos.split(',').length; i++) {
        if (camposValoresPermitidos.split(',')[i] == campo) {
            valorPermitido = "0";
            break;
        }
    }
    return valorPermitido;
}

function NoVacioDatosPI() {
    var dispararReturn = true;
    for (var i = 0; i < arrayCamposACargarDatos.length; i++)
        if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo(arrayCamposACargarDatos[i].split(';')[0], arrayCamposACargarDatos[i].split(';')[0].replace(/\D/g, '') + ". " + arrayCamposACargarDatos[i].split(';')[2], (arrayCamposACargarDatos[i].split(';')[0].indexOf("slt") != -1 ? true : false)); else return dispararReturn;
    return dispararReturn
}


function LimpiarDatosPI() {
    for (var i = 0; i < arrayCamposACargarDatos.length; i++) {
        if (arrayCamposACargarDatos[i].split(';')[0].indexOf("sltCampo") != -1)
            $("#" + arrayCamposACargarDatos[i].split(';')[0]).val("-1");
        else if (arrayCamposACargarDatos[i].split(';')[0] != "txtCampo289")
            $("#" + arrayCamposACargarDatos[i].split(';')[0]).val("");
    }
}

////////////////////////////////////////////////////////////////////////////------------ LINEAS SIC

function GuardarDatosLineaSIC() {
    Waiting(true, "Espere por favor. Cargando Información...");
    var EditarOGuardar = $('#txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia').is(":disabled") == true ? 'Editar' : 'Guardar';

    var parametrosGuardarLinea = {
        IdAcred: $("#txtIdClienteLinea").val(),
        IdDelCréditoAsignadoPorLaInstitución: $("#txtNumeroLineaActual").val(),
        NumeroDeConsultaRealizadaALaSociedadDeInformaciónCrediticia: $("#txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia").val(),
        TipoAltaCredito: $("#sltTipoAltaCredito").val(),
        TipoDeProducto: $("#sltTipoProducto").val(),
        TipoDeOperación: $("#sltTipoOperacion").val(),
        DestinoDelCrédito: $("#sltDestinoDelCredito").val(),
        fechaAltaLinea: $("#txtFechaAltaDeLinea").val().split('/')[2] + $("#txtFechaAltaDeLinea").val().split('/')[1] + $("#txtFechaAltaDeLinea").val().split('/')[0], // ADD
        IdCreditoLíneaGrupalOMultimonedaAsignadoMetodologíaCnbv: $("#txtIdCredLineaGrupalMultimonedaCNBV").val(),
        MontoDeLaLíneaDeCréditoAutorizado: $("#txtMontoLineaCreditoAutorizado").val(),
        FechaMáximaParaDisponerDeLosRecursos: $("#txtFechaMaximaDisponerRecursos").val().split('/')[2] + $("#txtFechaMaximaDisponerRecursos").val().split('/')[1] + $("#txtFechaMaximaDisponerRecursos").val().split('/')[0],
        FechaVencimientoDeLaLíneaDeCrédito: $("#txtFechaVencimientoLineaCredito").val().split('/')[2] + $("#txtFechaVencimientoLineaCredito").val().split('/')[1] + $("#txtFechaVencimientoLineaCredito").val().split('/')[0],
        MonedaDeLaLíneaDeCrédito: $("#sltMonedaDeLineaCredito").val(),
        FormaDeLaDisposición: $("#sltFormaDisposicion").val(),
        LíneaDeCréditoRevocableOIrrevocable: $("#sltLineaCreditoRevocableIrrevo").val(),
        RestriccionDeLaLinea: $("#sltRestriccionLinea").val(),
        PrelaciónDePago_CreditoPreferenteOSubordinado: $("#sltPrelacionDePago").val(),
        NúmeroRegistroEnRegistroÚnicoDeObligYEmpréstLocal: $("#txtNumRegEnRegUnicoDeObligYEmpLocal").val(),
        NúmeroRegistroEnRegistroObligYEmpréstDeEntidadesFedYMunsDeLaShcp: $("#txtNumRegDeObligEmpEntFedMunSHCP").val(),
        NúmeroDeRegistroEnElRegistroPúblicoDeLaPropiedadYComercio: $("#txtNumRegEnRegistroPubPropiedadYComercio").val(),
        NúmeroDeRegistroÚnicoDeGarantíasMobiliarias: $("#txtNumRegUnicosDeGarantiasMobiliarias").val(),
        ClaveDeInstituOAgenciaOtorganteDeLosRecursos: $("#sltClaveInstitucionOAgenciaExteriorOtorganteRecursos").val(),
        PjeDeParticipacionesFederalesComprometidasComoFuenteDePagoDelCrédito: $("#txtPorcentajeParticFederalesComoFuentePagoCredito").val(),
        TasaDeInterés: $("#sltTasaDeInteres").val(),
        DiferencialSobreTasaDeReferencia: $("#txtDiferencialSobreTasaReferencia").val(),
        OperaciónDiferencialSobreTasaReferencia: $("#sltOperacionDiferenciaSobreTasaReferencia").val(),
        FrecuenciaRevisiónTasa: $("#txtFrecuenciaRevisionTasa").val(),
        PeriodicidadPagoDeCapital: $("#sltPeriodicidadPagoCapital").val(),
        PeriodicidadPagoDeIntereses: $("#sltPeriodicidadPagoIntereses").val(),
        NumeroDeMesesDeGraciaParaAmortizarCapital: $("#txtNumMesesGraciaParaAmortizarCapital").val(),
        NumeroDeMesesDeGraciaParaPagoDeIntereses: $("#txtNumMesesGraciaPagoInterese").val(),
        ComisiónDeAperturaDelCrédito_Tasa: $("#txtComisionAperturaCreditoTasa").val(),
        ComisiónDeAperturaDelCrédito_Monto: $("#txtComisionAperturaCreditoMonto").val(),
        ComisiónPorDisposiciónDelCrédito_Tasa: $("#txtComisionDisposicionCreditoTasa").val(),
        ComisiónPorDisposiciónDelCrédito_Monto: $("#txtComisionDisposicionCreditoMonto").val(),
        CostoAnualTotalMomentoOtorgamientoLineaCredCalculadaCAT: $("#txtCostoAnualTotalMomentoOtorgamientoLineaCredCalculadaCAT").val(),
        MontoCreditoSimpleOAutorizadoLineaCreditoSinAccesFinanci: $("#txtMontoCreditoSimpleOAutorizadoLineaCreditoSinAccesFinanci").val(),
        MontoPrimasAnualesTodosSegurosObligConradosAcreditado: $("#txtMontoPrimasAnualesTodosSegurosObligConradosAcreditado").val(),
        GarantíaDeLeyFederal: $("#sltGarantiaDeLeyFederal").val(),

        idCreditoAsignadoXInstitucionLineasSICOrigen: $("#txtNumeroLineaOrigen").val(),
        idCreditoAsignadoXInstitucionLineasSICCNBV: $("#txtNumeroLineaCNBV").val(),
        idCreditoAsignadoXInstitucionLineasSICInicio: $("#txtNumeroLineaInicio").val(),
        idCreditoAsignadoXInstitucionLineasSICAnterior: $("#txtNumeroLineaAnterior").val(),
        caractDispCred: $("#sltCaracteristicasDispCredito").val(),
        pcjCubiertoCred: $("#txtPorcentajeCubiertoCredito").val(),
        pcjCubiertoGarantFondosBancaDesarro: $("#txtPorcentajeCubieroGarantFondBancaDes").val(),
        fondoFomentoBancoDesarroOtorgoGarant: $("#txtFondoFomentoBancoDesOtorGar").val(),
        pcjCubieroAval: $("#txtPorcentajeCubieroAval").val(),
        tipoGarantReal: $("#sltTipoGarantiaReal").val(),
        tipoBajaLinea: $("#sltTipoBajaLinea").val(),
        fechaBajaLinea: $("#txtFechaBajaLinea").val().split('/')[2] + $("#txtFechaBajaLinea").val().split('/')[1] + $("#txtFechaBajaLinea").val().split('/')[0],
        proyInversionFuentePagoProp: $("#sltProyectoInversionFuentPagProp").val(),
        montoFondeadoBancoDesarroFondoFomento: $("#txtMontoFondeadoBancoDesarroloOFondoFomen").val(),
        intsBancaDesarroFondoFomOtorgoFondeo: $("#sltInstBancaDesFondoFomOtorgFond").val(),

        EditarOGuardar: EditarOGuardar
    };
    peticionAjax('Default.aspx/GuardarLineaSIC', "POST", parametrosGuardarLinea, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d == "") {
                //                    var HTML = '<span style="color:Green;;font-weight:bold">La Linea se ha guardado de forma correcta.</span><br /><br />';
                //                    HTML += '<table  id="LineasEncontradasNLS" class="dataGridDatos"><thead><tr><th >Numero de Linea</th ><th >Monto Autorizado</th ><th >Fecha Maxima de Vigencia</th ><th >Fecha Vencimiento Línea de Crédito</th ><th >Forma Disposición</th ><th ><input id="RadioEditarLinea" name="EditarLineaX" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
                //                    HTML += '<tr style="background: rgba(43, 182, 165, 0.52);" id="Linea' + $('#txtNumeroLinea').val() + '"><td >' + $('#txtNumeroLinea').val() + '</td><td >' + $('#txtMontoLineaCreditoAutorizado').val() + '</td><td >' + $('#txtFechaMaximaDisponerRecursos').val() + '</td><td >' + $('#txtFechaVencimientoLineaCredito').val() + '</td><td >' + document.getElementById('sltFormaDisposicion').options[document.getElementById('sltFormaDisposicion').selectedIndex].text + '</td><td ><input id="RadioEditarLinea" ';
                //                    HTML += 'checked="checked" ';
                //                    HTML += 'name="EditarLineaX" type="radio"  value="' + $('#txtNumeroLinea').val() + '" /></td></tr>';
                //                    HTML += '</tbody></table>';
                $(TablaLineasEncontradasSIC).html("");
                $(TablaLineasEncontradosAlnova).html("");
                $("#fieldLineasEncontradasSIC").hide();
                $("#fieldLineasEncontradasAlnova").hide();

                var HTML = devuleveTblDatosDespuesDeEdicion("LineaX", 2, new Array("Numero de Linea", "Monto Autorizado", "Fecha Maxima de Vigencia", "Fecha Vencimiento Línea de Crédito", "Forma Disposición", ""), new Array($('#txtNumeroLineaActual').val(), $('#txtMontoLineaCreditoAutorizado').val(), $('#txtFechaMaximaDisponerRecursos').val(), $('#txtFechaVencimientoLineaCredito').val(), document.getElementById('sltFormaDisposicion').options[document.getElementById('sltFormaDisposicion').selectedIndex].text), "COMERCIAL", "NLS");
                $(divTblSaveLineaEncontrada).html(HTML);
                $('#EditarLinea').attr("disabled", false);
                $('#VerDisposiciones').attr("disabled", false);
                LimpiarDatosLineaSIC();
                CambiarDiv('LineasEncontradas', 'DatosLinea', false, true);
            }
        }
        else
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function NoVacioDatosLineaSIC() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdClienteLinea", "4. ID del Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia", "14. Num Consulta Realizada a la Sociedad de Inf. Cred"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoAltaCredito", "17. Tipo Alta del Crédito(Linea)", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoProducto", "18. Tipo de Producto", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoOperacion", "19. Tipo de Operación", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltDestinoDelCredito", "20. Destino del Crédito", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroLineaActual", "21. ID Créd Asignado por la Ins(Linea SIC Actual)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaAltaDeLinea", "22. Fecha Alta de la Línea"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdCredLineaGrupalMultimonedaCNBV", "23. ID Créd Línea Grupal o Mult Met.CNBV"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoLineaCreditoAutorizado", "24. Monto Línea de Crédito Autorizado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaMaximaDisponerRecursos", "26. Fecha Maxima para disponer recursos"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaVencimientoLineaCredito", "27. Fecha Vencimiento de la Línea de Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltMonedaDeLineaCredito", "28. Moneda de la Línea de Crédito", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltFormaDisposicion", "29. Forma de la Disposición", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltLineaCreditoRevocableIrrevo", "30. Linea de Crédito Revocable e Irrevocable", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltRestriccionLinea", "31. Restricción de la Línea", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltPrelacionDePago", "33. Prelación de Pago (Créd Preferente o Subordinado)", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumRegEnRegUnicoDeObligYEmpLocal", "34. Num.Reg en Reg Obligaciones y Emprestitos Local"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumRegDeObligEmpEntFedMunSHCP", "35. Num.Reg en Reg de Obligaciones y Emprestitos de Ent.Fed y Mun.SHCP"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumRegEnRegistroPubPropiedadYComercio", "36. Num. Reg en Reg Pub. de Propiedad y Comercio"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumRegUnicosDeGarantiasMobiliarias", "37. Num. Reg Único de Garantias Mobiliarias"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltClaveInstitucionOAgenciaExteriorOtorganteRecursos", "39. Clv de la Inst o Agencia Exterior Otorgante de Recursos", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeParticFederalesComoFuentePagoCredito", "40. Pcj Participaciones Federales Como Fuente Pago Créd"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTasaDeInteres", "41. Tasa de Interés", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtDiferencialSobreTasaReferencia", "42. Diferencial sobre Tasa de Referencia"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltOperacionDiferenciaSobreTasaReferencia", "43. Operación de Diferencial sobre Tasa Ref", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFrecuenciaRevisionTasa", "44. Frecuencia Revisión Tasa"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltPeriodicidadPagoCapital", "45. Periodicidad Pago de Capital", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltPeriodicidadPagoIntereses", "46. Periodicidad Pago de Intereses", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumMesesGraciaParaAmortizarCapital", "47. Num. Meses de Gracia para Amortizar Capital"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumMesesGraciaPagoInterese", "48. Num. Meses de Gracia para Pago de Intereses"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtComisionAperturaCreditoTasa", "49. Comisión de Apertura del Crédito (Tasa)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtComisionAperturaCreditoMonto", "50. Comisión de Apertura del Crédito (Monto)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtComisionDisposicionCreditoTasa", "51. Comisión por Disposición del Créd(Tasa)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtComisionDisposicionCreditoMonto", "52. Comisión por Disposición del Créd(Monto)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCostoAnualTotalMomentoOtorgamientoLineaCredCalculadaCAT", "53. Costo Anual Total Otorgamiento Línea de Créd por CAT"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoCreditoSimpleOAutorizadoLineaCreditoSinAccesFinanci", "54. Monto Créd Simple o Autorizado de Línea de Créd sin Accesorios Financieros"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoPrimasAnualesTodosSegurosObligConradosAcreditado", "55. Monto Primas Anuales de Todos los Seguros Obligatorios Cobrados al Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltGarantiaDeLeyFederal", "153. Garantía de Ley Federal", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroLineaOrigen", "289. ID del Créd Asignado por la Institución(Linea SIC Origen)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroLineaCNBV", "290. ID del Créd Asignado por la Institución(Linea SIC CNBV)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroLineaInicio", "291. ID del Crédito Asignado por la Institución(Linea SIC Inicio)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroLineaAnterior", "292. ID del Crédito Asignado por la Institución(Linea SIC Anterior)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltCaracteristicasDispCredito", "300. Caracteristicas Disp Crédito", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeCubiertoCredito", "301. Porcentaje Cubierto Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeCubieroGarantFondBancaDes", "302. Pcj Cubierto con Garantía Fondos y Banca de Desarrollo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFondoFomentoBancoDesOtorGar", "303. Fondo de Fomento o Banco de Desarrollo Otorgó Garantía"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeCubieroAval", "304. Pcje Cubierto por el Aval"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoGarantiaReal", "305. Tipo Garantía Real", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoBajaLinea", "285. Tipo de Baja de la Linea", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaBajaLinea", "286. Fecha de Baja de Linea"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltProyectoInversionFuentPagProp", "76. Proyecto Inversión con Fuente Pago Propia(Calf Anexo 19)", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoFondeadoBancoDesarroloOFondoFomen", "77. Monto Fondeado por Banco Desarrollo o Fondo Fomento"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltInstBancaDesFondoFomOtorgFond", "78. Inst Banca Desarrollo o Fondo Fomento Otorgó Fondeo", true, false); else return dispararReturn;
    return dispararReturn;
}

function LimpiarDatosLineaSIC() {
    $('#txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia').attr("disabled", false);
    LimpiarCampo("txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia", "", true, true, false);
    LimpiarCampo("sltTipoAltaCredito", "", false, false, true);
    LimpiarCampo("sltTipoProducto", "", false, false, true);
    LimpiarCampo("sltTipoOperacion", "", false, false, true);
    LimpiarCampo("sltDestinoDelCredito", "", false, false, true);
    LimpiarCampo("txtNumeroLineaActual", "", true, false, false);
    LimpiarCampo("txtFechaAltaDeLinea", "", true, false, false);
    LimpiarCampo("txtIdCredLineaGrupalMultimonedaCNBV", "", true, false, false);
    LimpiarCampo("txtMontoLineaCreditoAutorizado", "", true, false, false);
    LimpiarCampo("txtFechaMaximaDisponerRecursos", "", true, false, false);
    LimpiarCampo("txtFechaVencimientoLineaCredito", "", true, false, false);
    LimpiarCampo("sltMonedaDeLineaCredito", "", false, false, true);
    LimpiarCampo("sltFormaDisposicion", "", false, false, true);
    LimpiarCampo("sltLineaCreditoRevocableIrrevo", "", false, false, true);
    LimpiarCampo("sltRestriccionLinea", "", false, false, true);
    LimpiarCampo("sltPrelacionDePago", "", false, false, true);
    LimpiarCampo("txtNumRegEnRegUnicoDeObligYEmpLocal", "", true, false, false);
    LimpiarCampo("txtNumRegDeObligEmpEntFedMunSHCP", "", true, false, false);
    LimpiarCampo("txtNumRegEnRegistroPubPropiedadYComercio", "", true, false, false);
    LimpiarCampo("txtNumRegUnicosDeGarantiasMobiliarias", "", true, false, false);
    LimpiarCampo("sltClaveInstitucionOAgenciaExteriorOtorganteRecursos", "", false, false, true);
    LimpiarCampo("txtPorcentajeParticFederalesComoFuentePagoCredito", "", true, false, false);
    LimpiarCampo("sltTasaDeInteres", "", false, false, true);
    LimpiarCampo("txtDiferencialSobreTasaReferencia", "", true, false, false);
    LimpiarCampo("sltOperacionDiferenciaSobreTasaReferencia", "", false, false, true);
    LimpiarCampo("txtFrecuenciaRevisionTasa", "", true, false, false);
    LimpiarCampo("sltPeriodicidadPagoCapital", "", false, false, true);
    LimpiarCampo("sltPeriodicidadPagoIntereses", "", false, false, true);
    LimpiarCampo("txtNumMesesGraciaParaAmortizarCapital", "", true, false, false);
    LimpiarCampo("txtNumMesesGraciaPagoInterese", "", true, false, false);
    LimpiarCampo("txtComisionAperturaCreditoTasa", "", true, false, false);
    LimpiarCampo("txtComisionAperturaCreditoMonto", "", true, false, false);
    LimpiarCampo("txtComisionDisposicionCreditoTasa", "", true, false, false);
    LimpiarCampo("txtComisionDisposicionCreditoMonto", "", true, false, false);
    LimpiarCampo("txtCostoAnualTotalMomentoOtorgamientoLineaCredCalculadaCAT", "", true, false, false);
    LimpiarCampo("txtMontoCreditoSimpleOAutorizadoLineaCreditoSinAccesFinanci", "", true, false, false);
    LimpiarCampo("txtMontoPrimasAnualesTodosSegurosObligConradosAcreditado", "", true, false, false);
    LimpiarCampo("sltGarantiaDeLeyFederal", "", false, false, true);
    LimpiarCampo("txtNumeroLineaOrigen", "", true, false, false);
    LimpiarCampo("txtNumeroLineaCNBV", "", true, false, false);
    LimpiarCampo("txtNumeroLineaInicio", "", true, false, false);
    LimpiarCampo("txtNumeroLineaAnterior", "", true, false, false);
    LimpiarCampo("sltCaracteristicasDispCredito", "", false, false, true);
    LimpiarCampo("txtPorcentajeCubiertoCredito", "", true, false, false);
    LimpiarCampo("txtPorcentajeCubieroGarantFondBancaDes", "", true, false, false);
    LimpiarCampo("txtFondoFomentoBancoDesOtorGar", "", true, false, false);
    LimpiarCampo("txtPorcentajeCubieroAval", "", true, false, false);
    LimpiarCampo("sltTipoGarantiaReal", "", false, false, true);
    LimpiarCampo("sltTipoBajaLinea", "", false, false, true);
    LimpiarCampo("txtFechaBajaLinea", "", true, false, false);
    LimpiarCampo("sltProyectoInversionFuentPagProp", "", false, false, true);
    LimpiarCampo("txtMontoFondeadoBancoDesarroloOFondoFomen", "", true, false, false);
    LimpiarCampo("sltInstBancaDesFondoFomOtorgFond", "", false, false, true);
}


////////////////////////////////////////////////////////////////////////////------------ DISPOSICIONES SIC

function GuardarDatosDisposicionSIC() {
    Waiting(true, "Espere por favor. Cargando Información...");
    var EditarOGuardar = $('#txtIdDisposicion').is(":disabled") == true ? 'Editar' : 'Guardar';

    var parametrosGuardarDisposicion = {
        tipoAltaDisposicion: $("#sltTipoAltaDispo").val(),
        tipoBajeCredDisp: $("#sltTipoBajaCredito").val(),
        categoriaCredito: $("#sltCategoriaCredito").val(),
        fechaDisposicion: $("#txtFechaDisposicionCredito").val().split('/')[2] + $("#txtFechaDisposicionCredito").val().split('/')[1] + $("#txtFechaDisposicionCredito").val().split('/')[0],
        fechaVencimiento: $("#txtFechaVencimientoDisp").val().split('/')[2] + $("#txtFechaVencimientoDisp").val().split('/')[1] + $("#txtFechaVencimientoDisp").val().split('/')[0],
        monedaDisposicion: $("#sltMonedaDispocion").val(),
        numeroDisposicion: $("#txtIdDisposicion").val(),
        EditarOGuardar: EditarOGuardar
    };
    peticionAjax('Default.aspx/GuardarDisposicionSIC', "POST", parametrosGuardarDisposicion, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d == "") {
                $(TablaDisposicionesEncontradasSIC).html("");
                $(TablaDisposicionesEncontradasAlnova).html("");
                $("#fieldDisposicionesEncontradasSIC").hide();
                $("#fieldDisposicionesEncontradasAlnova").hide();

                var HTML = devuleveTblDatosDespuesDeEdicion("DisposicionX", 3, new Array("Numero de Disposición", "Fecha Disposición", "Fecha Vencimiento", "Moneda", "Proyecto Inversión Con Fuente de Pago", "Institución Banca Desarrollo Otorgó Fondeo", ""),
                 new Array($('#txtIdDisposicion').val(), $('#txtFechaDisposicionCredito').val(), $('#txtFechaVencimientoDisp').val(), document.getElementById('sltMonedaDispocion').options[document.getElementById('sltMonedaDispocion').selectedIndex].text,
                 document.getElementById('sltProyectoInversion').options[document.getElementById('sltProyectoInversion').selectedIndex].text, document.getElementById('sltInstitucionBancaDesFondoFon').options[document.getElementById('sltInstitucionBancaDesFondoFon').selectedIndex].text), "COMERCIAL", "NDS");
                $(divTblSaveDisposicionEncontrada).html(HTML);
                $('#BotonEditarDisposicion').attr("disabled", false);
                $('#BotonVerCortes').attr("disabled", false);
                LimpiarDatosDisposicionSIC();
                CambiarDiv('DivDisposicionesEncontradas', 'DivDatosDisposicion', false, true);
            }
        }
        else
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);


        //        if (!data.d.startsWith('Error:')) {
        //            if (data.d == "") {
        //                var HTML = '<span style="color:Green;font-weight:bold">La disposición se ha guardado de forma correcta.</span><br /><br />';
        //                HTML += '<table id="DisposicionesEncontradasNDS" class="dataGridDatos" ><thead><tr id="CabeceraDisposiciones"><th >Numero de Disposición</th ><th >Fecha Disposición</th ><th >Fecha Vencimiento</th ><th >Moneda</th ><th >Proyecto Inversión Con Fuente de Pago</th ><th >Institución Banca Desarrollo Otorgó Fondeo</th ><th ><input id="RadioEditarDisposicion" name="EditarDisposicionX" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
        //                HTML += '<tr style="background: rgba(43, 182, 165, 0.52);" id="Disposicion' + $('#txtIdDisposicion').val() + '"><td >' + $('#txtIdDisposicion').val() + '</td><td >' + $('#txtFechaDisposicionCredito').val() + '</td><td >' + $('#txtFechaVencimientoDisp').val() +
        //                 '</td><td >' + document.getElementById('sltMonedaDispocion').options[document.getElementById('sltMonedaDispocion').selectedIndex].text + '</td><td >' + document.getElementById('sltProyectoInversion').options[document.getElementById('sltProyectoInversion').selectedIndex].text + '</td><td >' 
        //                 + document.getElementById('sltInstitucionBancaDesFondoFon').options[document.getElementById('sltInstitucionBancaDesFondoFon').selectedIndex].text + '</td><td ><input id="RadioEditarDisposicion" ';
        //                HTML += 'checked="checked" ';
        //                HTML += 'name="EditarDisposicionX" type="radio"  value="' + $('#txtIdDisposicion').val() + '" /></td></tr>';
        //                HTML += '</tbody></table>';
        //                $(TablaDisposicionesEncontradas).html(HTML);
        //                document.getElementById("DisposicionesEncontradasNDS").style.width = "100%";
        //                $('#BotonEditarDisposicion').attr("disabled", false);
        //                $('#BotonVerCortes').attr("disabled", false);
        //                LimpiarDatosDisposicion();
        //                CambiarDiv('DivDisposicionesEncontradas', 'DivDatosDisposicion', false, true);
        //            }
        //        }
        //        else {
        //            $(TablaDisposicionesEncontradas).html('<span style="color:Red;font-weight:bold">' + data.d + '.</span><br /><br />');
        //        }
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function NoVacioDatosDisposicionesSIC() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoAltaDispo", "287. Tipo Alta de la Disposición", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoBajaCredito", "138. Tipo Baja Crédito (Disposición)", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdDisposicion", "60. Número de Disposición"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroLineaDisposicion", "21.Número de Línea"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtTipoEmpresaDisp", "3. Tipo de Empresa"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltCategoriaCredito", "56. Categoria del Crédito", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaDisposicionCredito", "57. Fecha Disposición del Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaVencimientoDisp", "58. Fecha Vencimiento de la Disposición"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltMonedaDispocion", "59. Moneda de la Disposición", true, false); else return dispararReturn;
    return dispararReturn;
}

function LimpiarDatosDisposicionSIC() {
    //$('#txtNumeroLineaDisposicion').attr("disabled", false);
    LimpiarCampo("sltTipoAltaDispo", "", false, false, true);
    LimpiarCampo("sltTipoBajaCredito", "", false, false, true);
    LimpiarCampo("txtIdDisposicion", "", true, false, false);
    LimpiarCampo("txtNumeroLineaDisposicion", "", false, true, false);
    LimpiarCampo("txtTipoEmpresaDisp", "", false, true, false);
    LimpiarCampo("sltCategoriaCredito", "", false, false, true);
    LimpiarCampo("txtFechaDisposicionCredito", FechaActual, true, false, false);
    LimpiarCampo("txtFechaVencimientoDisp", FechaActual, true, false, false);
    LimpiarCampo("sltMonedaDispocion", "", false, false, true);
}

////////////////////////////////////////////////////////////////////////////------------ CORTES SIC

function GuardarDatosCorte() {
    if (NoVacioDatosCorte()) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var parametros = {
            fnFechaDelReporte: $("#txtFechaReporteCT").val().split('/')[2] + $("#txtFechaReporteCT").val().split('/')[1] + $("#txtFechaReporteCT").val().split('/')[0],
            fvcIdDelCréditoAsignadoPorLaInstitución: $("#txtIdCreditoAsignadoInstCT").val(),
            FVCNumeroDeDisposicion: $("#txtNoDisposicionCT").val(),
            fvcEstatusSic: $("#sltEstatusSICCT").val(),
            fvcTipoDeEmpresa: $("#sltTipoEmpresaCT").val(),
            fnLineaDispuestaONoDispuesta: $("#sltLineaDispuestaONoDispCT").val(),
            fnTasaInterésBrutaPeriodo: $("#txtTasaInteresBrutaPeriodoCT").val(),
            FNMontoDispuestoDeLaLineaDeCréditoEnElMes: $("#txtMontoDispuestoMesCT").val(),
            fnMontoDelPagoExigibleAlAcreditadoEnElPeriodo_IncluyeCapitalInteresesYComisiones: $("#txtMontoPagoExigibleAcreditadoEnPeriodo").val(),
            fnMontoDeCapitalPagadoEfectivamentePorElAcreditadoEnElPeriodo: $("#txtMontoCapitalPagadoEfecXAcredEnPeriodo").val(),
            fnMontoDeInteresesPagadosEfectivamentePorElAcreditadoEnElPeriodo: $("#txtMontInteresesPagEfecXAcredEnPeriodo").val(),
            fnMontoDeComisionesPagadasEfectivamentePorElAcreditadoEnElPeriodo: $("#txtMontComisionPagEfecXAcredEnPeriodo").val(),
            fnMontoDeInteresesMoratoriosYOtrosAccesoriosPagadosEfectivamentePorElAcreditadoEnElPeriodo: $("#txtMontInteresesMoraYOtrosAccPagEfecXAcredEnPeriodo").val(),
            fnMontoBonificadoPorLaInstitucionFinanciera: $("#txtMontoBonificadoInstFinanc").val(),
            fnSaldoDelPrincipalAlFinalDelPeriodo: $("#txtSaldoDelPrincipFinalPeriodo").val(),
            fnSaldoBaseParaElCálculoDeInteresesALaFechaDeCorteDelCrédito: $("#txtSaldoBaseCalculoInteresesFechaCortCred").val(),
            fnInteresesResultantesDeAplicarLaTasaAlSaldoBase: $("#txtInteresesResultAplicarTasaASaldoBase").val(),
            fnResponsabilidadTotalAlFinalDelPeriodo: $("#txtResponsabilidadTotalFinalPeriodo").val(), fnSituacionDelCrédito: $("#sltSituaciónCredito").val(),
            fnNúmeroDeDiasVencidos: $("#txtNoDiasVencidos").val(),
            fnFechaDelUltimoPagoCompletoExigibleRealizadoPorElAcreditado: $("#txtFechaUltimoPAgCompExigRealAcred").val().split('/')[2] + $("#txtFechaUltimoPAgCompExigRealAcred").val().split('/')[1] + $("#txtFechaUltimoPAgCompExigRealAcred").val().split('/')[0],
            fnReservasTotales: $("#txtReservasTotales").val(),
            fnReservasParteCubiertaPorGarantiasPersonales: $("#txtReservasCubiertaGarantPerson").val(),
            fnReservasParteNoCubiertaPorGarantiasPersonales: $("#txtReservasNoCubiertaGarantPerson").val(),
            fnSeveridadDeLaPerdidaTotal: $("#txtSeveridadPerdidaTotal").val(),
            fnSeveridadDeLaPerdidaParteCubiertaPorGarantiasPesonales: $("#txtSeveridadPerdidadParteCubiertaGarantPerson").val(),
            fnSeveridadDeLaPerdidaParteNoCubiertaPorGarantiasPesonales: $("#txtSeveridadPerdidadParteNoCubiertaGarantPerson").val(),
            fnExposicionAlIncumplimiento: $("#txtExposicionIncumplimiento").val(),
            fnExposicionAlIncumplimientoParteCubiertaPorGarantiasPesonales: $("#txtExposicionIncumpParteCubGarantPerson").val(),
            fnExposicionAlIncumplimientoParteNoCubiertaPorGarantiasPesonales: $("#txtExposicionIncumpParteNoCubGarantPerson").val(),
            fnProbabilidadDeIncumplimientoTotal: $("#txtProbabilidadIncumplientoTotal").val(),
            fnProbabilidadDeIncumplimientoParteCubiertaPorGarantiasPersonales: $("#txtProbabIncumParteCubGarantPerson").val(),
            fnProbabilidadDeIncumplimientoParteNoCubiertaPorGarantiasPersonales: $("#txtProbabIncumParteNoCubGarantPerson").val(),
            fvcGradoDeRiesgo: $("#sltGradoRiesgo").val(),
            fnReservasTotales_MetodologiaInterna: $("#txtReservasTotalesMetInt").val(),
            fnSeveridadDeLaPerdida_MetodologiaInterna: $("#txtSeveridadPerdidaMetInt").val(),
            fnExposicionAlIncumplimiento_MetodologiaInterna: $("#txtExposicionIncumpMetInt").val(),
            fnProbabilidadDeIncumplimiento_MetodologiaInterna: $("#txtProbIncumMetInt").val(),
            fnTipoBajaCredito: $("#sltTipoBajaCredito").val(),
            fnSaldoDelPrincipalAlInicioDelPeriodo: $("#txtSaldoPrinAlIncPeriod").val(),
            fnResponsabilidadTotalAlInicioDelPeriodo: $("#txtRespTotalInicioPerio").val(),
            fnMontoTotalPagadoEfectivamentePorElAcreditadoEnElPeriodo: $("#txtMontoTotalPagEfecXAcredEnPer").val(),
            fnMontoReconocidoPorQuitas_CastigosYQuebrantos: $("#txtMontorecQuitasCastQuebra").val(),
            fnMontoReconocidoPorBonificacionesYDescuentos: $("#txtMontoRecBoniYDesc").val(),

            fnMontoReesRenoCambOrigSinFlujoEfec: $("#txtMontoReesRenoCambOrigSinFlujoEfec"),
            fnNumeroDiasUtilizadosCalculoInteresesPeriodoReportado: $("#txtNumeroDiasUtilizadosCalculoInteresesPeriodoReportado"),
            fnCalfMetInterna: $("#txtCalfMetInterna"),
            fnCalifMetInternaCubierta: $("#txtCalifMetInternaCubierta"),
            fnCalfMetInternaExpuesta: $("#txtCalfMetInternaExpuesta"),
            fnCalifMetCNBVCubi: $("#txtCalifMetCNBVCubi"),
            fnCalifMetCNBVExp: $("#txtCalifMetCNBVExp"),
            fnReservaMetCNBVCubierta: $("#txtReservaMetCNBVCubierta"),
            fnReservaMetCNBVExpuesta: $("#txtReservaMetCNBVExpuesta"),
            fnMontoComisionesDevengadas: $("#txtMontoComisionesDevengadas"),

            opcion: esEdicionCorte ? 1 : 2
        };
        peticionAjax('ConsultaSIC.aspx/GuardarCorte', "POST", parametros, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    $(TablaCortesEncontradosSIC).html("");
                    $(TablaCortesEncontradosAlnova).html("");
                    $("#fieldCortesEncontradosSIC").hide();
                    $("#fieldCortesEncontradosAlnova").hide();

                    var HTML = devuleveTblDatosDespuesDeEdicion("CorteX", 4, new Array("Fecha Corte", "Tasa Interés Bruta", "Saldo Principal al Final Per.", "Responsabilidad Total Final Per.", "Reservas Totales", ""),
                    new Array($('#txtFechaReporteCT').val(), $('#txtTasaInteresBrutaPeriodoCT').val(), $('#txtSaldoDelPrincipFinalPeriodo').val(), $('#txtResponsabilidadTotalFinalPeriodo').val(), $('#txtReservasTotales').val()), "COMERCIAL", "Find");
                    $(divTblSaveCorteEncontrado).html(HTML);
                    $('#btnEditarCorte').attr("disabled", false);
                    CambiarDiv('DivCortesEncontrados', 'DivDatosResumen', false, true);
                    LimpiarDatosCortesSIC();
                }
            }
            else MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}


function NoVacioDatosCortesSIC() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaReporteCT", "1. Fecha Corte"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdCreditoAsignadoInstCT", "21. Número de Línea"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNoDisposicionCT", "60. Número de Disposicion"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltEstatusSICCT", "2. Estatus SIC", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoEmpresaCT", "3. Tipo Empresa", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltLineaDispuestaONoDispCT", "25. Línea Dispuesta o No Dispuesta", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtRespTotalInicioPerio", "140. Responsabilidad Total Inicio Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoTotalPagEfecXAcredEnPer", "141. Monto Total Pagado Efectivamente por el Acreditado en Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontorecQuitasCastQuebra", "142. Monto Reconocido por Quitas,Castigos y Quebrantos"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoRecBoniYDesc", "143. Monto Reconocido por Bonificaciones y Descuentos"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoReesRenoCambOrigSinFlujoEfec", "288. Monto Reestrurado,Renovado o Cambios en Condiciones Originales sin Flujo Efectivo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSaldoPrinAlIncPeriod", "139. Saldo Del Principal al Inicio Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtTasaInteresBrutaPeriodoCT", "61. Tasa de Interés Bruta Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoDispuestoMesCT", "62. Monto Dispuesto Línea Crédito en el Mes"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoPagoExigibleAcreditadoEnPeriodo", "63. Monto del Pago Exigible al Acreditado en el Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoCapitalPagadoEfecXAcredEnPeriodo", "64. Monto de Capital Pagado Efectivamente por el Acreditado en el Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontInteresesPagEfecXAcredEnPeriodo", "65.Monto de Intereses Pagados Efectivamente por el Acreditado en el Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontComisionPagEfecXAcredEnPeriodo", "66. Monto de Comisiones Pagadas Efectivamente por el Acreditado en el Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontInteresesMoraYOtrosAccPagEfecXAcredEnPeriodo", "67. Monto de Intereses Moratorios y Otros Accesorios Pagados Efectivamente por el Acreditado en el Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoBonificadoInstFinanc", "68. Monto Bonificado por Institución Financiera"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSaldoDelPrincipFinalPeriodo", "69. Saldo del Principal al Final del Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSaldoBaseCalculoInteresesFechaCortCred", "70. Saldo Base para Cálculo Intereses a la Fecha Corte del Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtInteresesResultAplicarTasaASaldoBase", "71. Intereses Resultantes de Aplicar Tasa a Saldo Base"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtResponsabilidadTotalFinalPeriodo", "72. Responsabilidad Total al Final del Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltSituaciónCredito", "73. Situación del Crédito", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtResponsabilidadTotalFinalPeriodo", "74. Número de Días Vencidos"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaUltimoPAgCompExigRealAcred", "75. Fecha Último Pago Completo Exigible Realizado por Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtReservasTotales", "79. Reservas Totales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtReservasCubiertaGarantPerson", "80. Reservas Parte Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtReservasNoCubiertaGarantPerson", "81. Reservas Parte No Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaTotal", "82. Severidad de la Pérdida Total"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidadParteCubiertaGarantPerson", "83. Severidad de la Pérdida Parte Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidadParteNoCubiertaGarantPerson", "84. Severidad de la Pérdida Parte No Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposicionIncumplimiento", "85. Exposición al Incumplimiento"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposicionIncumpParteCubGarantPerson", "86. Exposición al Incumplimiento Parte Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposicionIncumpParteNoCubGarantPerson", "87. Exposición al Incumplimiento Parte No Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbabilidadIncumplientoTotal", "88. Probabilidad Incumplimiento Total"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbabIncumParteCubGarantPerson", "89. Probabilidad Incumplimiento Parte Cubierta Por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbabIncumParteNoCubGarantPerson", "90. Probabilidad Incumplimiento Parte No Cubierta Por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltGradoRiesgo", "91. Grado de Riesgo (Art. 129 DCGAIC)", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtReservasTotalesMetInt", "92. Reservas Totales(Metodología Interna)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaMetInt", "93. Severidad de la Pérdida(Metodología Interna)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposicionIncumpMetInt", "94. Exposicióm al Incumplimiento(Metodología Interna)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbIncumMetInt", "95. Probabilidad Incumplimiento(Metodología Interna)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroDiasUtilizadosCalculoInteresesPeriodoReportado", "297. Numero de Días Utilizados para Calculo de Intereses en Periodo Reportado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCalfMetInterna", "306. Calif. Met Interna"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCalifMetInternaCubierta", "307. Calif. Met Interna Cubierta"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCalfMetInternaExpuesta", "308. Calif. Met Interna Expuesta"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCalifMetCNBVCubi", "309. Calif. Met CNBV Cubierta"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCalifMetCNBVExp", "310. Calif. Met CNBV Expuesta"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtReservaMetCNBVCubierta", "311. Reserva Met CNBV Cubierta"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtReservaMetCNBVExpuesta", "312. Reserva Met CNBV Expuesta"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoComisionesDevengadas", "313. Monto Comisiones Devengadas"); else return dispararReturn;
    return dispararReturn;
}

function LimpiarDatosCortesSIC() {
    LimpiarCampo("txtFechaReporteCT", "", true, false, false);
    LimpiarCampo("txtIdCreditoAsignadoInstCT", "", false, true, false);
    LimpiarCampo("txtNoDisposicionCT", "", false, true, false);
    LimpiarCampo("sltEstatusSICCT", "", false, false, true);
    LimpiarCampo("sltTipoEmpresaCT", "", false, false, true);
    LimpiarCampo("sltLineaDispuestaONoDispCT", "", false, false, true);
    LimpiarCampo("txtRespTotalInicioPerio", "", true, false, false);
    LimpiarCampo("txtMontoTotalPagEfecXAcredEnPer", "", true, false, false);
    LimpiarCampo("txtMontorecQuitasCastQuebra", "", true, false, false);
    LimpiarCampo("txtMontoRecBoniYDesc", "", true, false, false);
    LimpiarCampo("txtMontoReesRenoCambOrigSinFlujoEfec", "", true, false, false);
    LimpiarCampo("txtSaldoPrinAlIncPeriod", "", true, false, false);
    LimpiarCampo("txtTasaInteresBrutaPeriodoCT", "", true, false, false);
    LimpiarCampo("txtMontoDispuestoMesCT", "", true, false, false);
    LimpiarCampo("txtMontoPagoExigibleAcreditadoEnPeriodo", "", true, false, false);
    LimpiarCampo("txtMontoCapitalPagadoEfecXAcredEnPeriodo", "", true, false, false);
    LimpiarCampo("txtMontInteresesPagEfecXAcredEnPeriodo", "", true, false, false);
    LimpiarCampo("txtMontComisionPagEfecXAcredEnPeriodo", "", true, false, false);
    LimpiarCampo("txtMontInteresesMoraYOtrosAccPagEfecXAcredEnPeriodo", "", true, false, false);
    LimpiarCampo("txtMontoBonificadoInstFinanc", "", true, false, false);
    LimpiarCampo("txtSaldoDelPrincipFinalPeriodo", "", true, false, false);
    LimpiarCampo("txtSaldoBaseCalculoInteresesFechaCortCred", "", true, false, false);
    LimpiarCampo("txtInteresesResultAplicarTasaASaldoBase", "", true, false, false);
    LimpiarCampo("txtResponsabilidadTotalFinalPeriodo", "", true, false, false);
    LimpiarCampo("sltSituaciónCredito", "", false, false, true);
    LimpiarCampo("txtNoDiasVencidos", "", true, false, false);
    LimpiarCampo("txtFechaUltimoPAgCompExigRealAcred", "", true, false, false);
    LimpiarCampo("txtReservasTotales", "", true, false, false);
    LimpiarCampo("txtReservasCubiertaGarantPerson", "", true, false, false);
    LimpiarCampo("txtReservasNoCubiertaGarantPerson", "", true, false, false);
    LimpiarCampo("txtSeveridadPerdidaTotal", "", true, false, false);
    LimpiarCampo("txtSeveridadPerdidadParteCubiertaGarantPerson", "", true, false, false);
    LimpiarCampo("txtSeveridadPerdidadParteNoCubiertaGarantPerson", "", true, false, false);
    LimpiarCampo("txtExposicionIncumplimiento", "", true, false, false);
    LimpiarCampo("txtExposicionIncumpParteCubGarantPerson", "", true, false, false);
    LimpiarCampo("txtExposicionIncumpParteNoCubGarantPerson", "", true, false, false);
    LimpiarCampo("txtProbabilidadIncumplientoTotal", "", true, false, false);
    LimpiarCampo("txtProbabIncumParteCubGarantPerson", "", true, false, false);
    LimpiarCampo("txtProbabIncumParteNoCubGarantPerson", "", true, false, false);
    LimpiarCampo("sltGradoRiesgo", "", false, false, true);
    LimpiarCampo("txtReservasTotalesMetInt", "", true, false, false);
    LimpiarCampo("txtSeveridadPerdidaMetInt", "", true, false, false);
    LimpiarCampo("txtExposicionIncumpMetInt", "", true, false, false);
    LimpiarCampo("txtProbIncumMetInt", "", true, false, false);
    LimpiarCampo("txtNumeroDiasUtilizadosCalculoInteresesPeriodoReportado", "", true, false, false);
    LimpiarCampo("txtCalfMetInterna", "", true, false, false);
    LimpiarCampo("txtCalifMetInternaCubierta", "", true, false, false);
    LimpiarCampo("txtCalfMetInternaExpuesta", "", true, false, false);
    LimpiarCampo("txtCalifMetCNBVCubi", "", true, false, false);
    LimpiarCampo("txtCalifMetCNBVExp", "", true, false, false);
    LimpiarCampo("txtReservaMetCNBVCubierta", "", true, false, false);
    LimpiarCampo("txtReservaMetCNBVExpuesta", "", true, false, false);
    LimpiarCampo("txtMontoComisionesDevengadas", "", true, false, false);
}


////////////////////////////////////////////////////////////////////////////------------ SP SIC
function btnVerDatosSP() {
    $("#txtFechaCorteSP").val(FechaActual);
    CambiarDiv('divDatosSP', 'DivDatosResumen', false, true);
    CargarDatosSP(FechaActual.split('/')[2] + FechaActual.split('/')[1] + FechaActual.split('/')[0]);
}

var esEdicionSP = false;
function CargarDatosSP(fechaCorte) {
    Waiting(true, "Espere por favor. Cargando Información...");

    //    idClienteConsultado = '08638393';
    //    idLineaConsultado = '4077';
    //    idDisposicionConsultado = '9650856836';

    $("#txtIdAcreditadoSP").val(idClienteConsultado);
    $("#txtIdCreditoAsignadoInstSP").val(idLineaConsultado);
    $("#txtNumeroDisposicionSP").val(idDisposicionConsultado);
    LimpiarDatosSPSIC();

    $("#spErrorTE").html("");
    esEdicionSP = false;

    peticionAjax('Default.aspx/CargarDatosSP', "POST", { idCliente: idClienteConsultado, idLinea: idLineaConsultado, idDisposicion: idDisposicionConsultado, fechaCorte: fechaCorte }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                esEdicionSP = true;
                var ItemsSPBuscar = obtenerArregloDeJSON(data.d, false);
                $("#txtFechaCorteSP").val(ItemsSPBuscar[0].fnFechaDelReporte.substring(6, 8) + "/" + ItemsSPBuscar[0].fnFechaDelReporte.substring(4, 6) + "/" + ItemsSPBuscar[0].fnFechaDelReporte.substring(0, 4));
                $("#txtIdAcreditadoSP").val(ItemsSPBuscar[0].fvcIdDelAcreditadoAsignadoPorLaInstitución);
                $("#txtIdCreditoAsignadoInstSP").val(ItemsSPBuscar[0].fvcIdDelCréditoAsignadoPorLaInstitución);
                $("#txtNumeroDisposicionSP").val(ItemsSPBuscar[0].FVCNumeroDeDisposicion);
                $("#sltTipoEmpresaSP").val(ItemsSPBuscar[0].fvcTipoDeEmpresa);
                //                if ($("#txtTipoEmpresaLinea").attr("alt") != ItemsSPBuscar[0].fvcTipoDeEmpresa) {
                //                    $("#spErrorTE").html("El Tipo Empresa 'Linea' (" + $("#txtTipoEmpresaLinea").attr("alt") + ") no coincide con el de 'SP' (" + ItemsSPBuscar[0].fvcTipoDeEmpresa + ") ");
                //                    $("#sltTipoEmpresaSP").val($("#txtTipoEmpresaLinea").attr("alt"));
                //                }
                $("#txtPorcentajeNoCubiertoCreditoSP").val(ItemsSPBuscar[0].fnPorcentajeNoCubiertoDelCrédito);
                $("#txtSeveridadDPerdidaSP").val(ItemsSPBuscar[0].fnSeveridadDeLaPérdida);
                $("#txtExposiciónIncumplimientoGarantiaSP").val(ItemsSPBuscar[0].fnExposiciónAlIncumplimientoSinGarantía);
                $("#txtProbabilidadIncumpAcreditadSP").val(ItemsSPBuscar[0].fnProbabilidadDeIncumplimientoDelAcreditado);
                $("#txtNoGarantiasRealFinanSP").val(ItemsSPBuscar[0].fnNúmeroDeGarantíasRealesFinancieras);
                $("#txtPorcentajeCoberGarantRealFinanSP").val(ItemsSPBuscar[0].fnPorcentajeDeCoberturaDeLaGarantíaRealFinanciera);
                $("#txtFactorAjusteHESP").val(ItemsSPBuscar[0].fnFactorDeAjuste_He);
                $("#txtFactorAjusteHfxSP").val(ItemsSPBuscar[0].fnFactorDeAjuste_Hfx);
                $("#txtFactorAjusteHCSP").val(ItemsSPBuscar[0].fnFactorDeAjuste_Hc);
                $("#txtValorContableGarantrealFinanSP").val(ItemsSPBuscar[0].fnValorContableDeLaGarantíaRealFinanciera);
                $("#txtSeveridadPerdidaGRFSP").val(ItemsSPBuscar[0].fnSeveridadDeLaPérdidaAjustadaPorGarantíasRealesFinancieras);
                $("#txtExposicionIncumpGarantiasRealSP").val(ItemsSPBuscar[0].fnExposiciónAlIncumplimientoAjustadaPorGarantíasReales);
                $("#txtNoGarantiasRealesNoFinanSP").val(ItemsSPBuscar[0].fnNúmeroDeGarantíasRealesNoFinancieras);
                $("#txtPorcenCoberturaGaranRealNoFinanSP").val(ItemsSPBuscar[0].fnPorcentajeDeCoberturaDeLaGarantíaRealNoFinanciera);
                $("#txtValorGarantiaDerechoCobroSP").val(ItemsSPBuscar[0].fnValorGarantíaConDerechosDeCobro);
                $("#txtValorGarantiaBienesInmueblesSP").val(ItemsSPBuscar[0].fnValorGarantíaConBienesInmuebles);
                $("#txtValorGarantiaBienesMueblesSP").val(ItemsSPBuscar[0].fnValorGarantíaConBienesMuebles);
                $("#txtValorGaranFideGarantAdmonPartFedAportFedSP").val(ItemsSPBuscar[0].fnValorGarantíaConFideicomisosDeGarantíaYDeAdmónConPart_Fed_YAport_Fed_ComoFuenteDePago);
                $("#txtValorGarantFideicomisoGatantAdmonIngPropFuentPagSP").val(ItemsSPBuscar[0].fnValorGarantíaConFideicomisosDeGarantíaYDeAdmónConIngresosPropiosComoFuenteDePago);
                $("#txtValorGarantiaOtrasRealesNoFinanSP").val(ItemsSPBuscar[0].fnValorGarantíaConOtrasGarantíasRealesNoFinancieras);
                $("#txtSeveridadPerdidaAjustadaDerechosCobroSP").val(ItemsSPBuscar[0].fnSeveridadDeLaPérdidaAjustadaPorDerechosDeCobro);
                $("#txtSeveridadPerdidaAjustadaBienesInmueblesSP").val(ItemsSPBuscar[0].fnSeveridadDeLaPérdidaAjustadaPorBienesInmuebles);
                $("#txtSeveridadPerdidaAjustadaBienesMueblesSP").val(ItemsSPBuscar[0].fnSeverdiadDeLaPérdidaAjustadaPorBienesMuebles);
                $("#txtSeveridadPerdidaFideGarantAdmonPartFedAportFedSP").val(ItemsSPBuscar[0].fnSeveridadDeLaPérdidaAjustadaPorFideicomisosDeGarantíaYDeAdmónConPart_Fed_YAport_FederalesComoFuenteDePago);
                $("#txtSeveridadPerdidaFideGarantAdmonIngPropFuentPagSP").val(ItemsSPBuscar[0].fnSeveridadDeLaPérdidaAjustadaPorFideicomisosDeGarantíaYDeAdmónConIngresosPropiosComoFuenteDePago);
                $("#txtSeveridadPerdidaAjustOtrasGarantRealesNoFinanSP").val(ItemsSPBuscar[0].fnSeveridadDeLaPérdidaAjustadaConOtrasGarantíasRealesNoFinancieras);
                $("#txtTotalSeveridadPerdidaGarantRealesNFinanSP").val(ItemsSPBuscar[0].fnTotalDeSeveridadDeLaPérdidaPorGarantíasRealesNoFinancieras);
                $("#txtNoGarantRealesPersonalDerivadoCreditoSP").val(ItemsSPBuscar[0].fnNúmeroDeGarantíasRealesPersonalYDerivadosDeCrédito);
                $("#txtPorcentajCubiertoGarantPersonSP").val(ItemsSPBuscar[0].fnPorcentajeCubiertoConGarantíasPersonales);
                $("#txtNombreObligadoSolidarioAvalSP").val(ItemsSPBuscar[0].fvcNombreDelObligadoSolidarioOAval);
                $("#txtPorcentajeCubObligadoSolidDistEntFedMunSP").val(ItemsSPBuscar[0].fnPorcentajeCubiertoPorObligadoSolidarioOAvalDistintoAEntidadFederativaYMunicipio);
                $("#sltTipoObligadoSolidarioAvalSP").val(ItemsSPBuscar[0].fnTipoDeObligadoSolidarioOAval);
                $("#txtRFCObligadoSolidaAvalSP").val(ItemsSPBuscar[0].fvcRfcDelObligadoSolidarioOAval);
                $("#sltTipoGaranteSP").val(ItemsSPBuscar[0].fnTipoDeGarante);
                $("#txtProbabilidadIncumplientoGaranteSP").val(ItemsSPBuscar[0].fnProbabilidadDeIncumplimientoDelGarante);
                $("#txtValuacionMercadoDerivadoCreditoSP").val(ItemsSPBuscar[0].fnValuaciónAMercadoDelDerivadoDeCrédito);
                $("#sltMonedaGarantiaPersonalSP").val(ItemsSPBuscar[0].fnMonedaDeLaGarantíaPersonal);
                $("#txtNombreGaranteECPMSP").val(ItemsSPBuscar[0].fvcNombreDelGaranteEcpm);
                $("#txtNombreGarantePPSP").val(ItemsSPBuscar[0].fvcNombreDelGarantePp);
                $("#txtPorcentajeCubEsquemaPasoMediaSP").val(ItemsSPBuscar[0].fnPorcentajeCubiertoPorEsquemasDePasoYMedida);
                $("#txtPorcentajeCubEsquemaPrimPerdiSP").val(ItemsSPBuscar[0].fnPorcentajeCubiertoPorEsquemasDePrimerasPérdidas);
                $("#txtMontoCubEsquemaPrimPerdidasSP").val(ItemsSPBuscar[0].fnMontoCubiertoPorEsquemasDePrimerasPérdidas);
            }
            else
                esEdicionSP = false;
        }
        else MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
        $("#txtFechaCorteSP").attr("lang", "aa");
    }, null);
}


function OnChangeFechaSP(evt, obj) {
    var fechaDate = new Date(FechaActual.split('/')[2], FechaActual.split('/')[1], FechaActual.split('/')[0])
    var fechaSelect = new Date($(obj).val().split('/')[2], $(obj).val().split('/')[1], $(obj).val().split('/')[0])
    if (changeFormatoFecha(evt, obj) && $(obj).attr("lang") == "aa") {
        $(obj).attr("lang", "ab");
        CargarDatosSP($(obj).val().split('/')[2] + $(obj).val().split('/')[1] + $(obj).val().split('/')[0]);
    }
}

function FCancelarSP() {
    CambiarDiv('DivDatosResumen', 'divDatosSP', false, true);
}

function GuardarDatosSP() {
    if (NoVacioDatosSPSIC()) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var parametros = {
            fnFechaDelReporte: $("#txtFechaCorteSP").val().split('/')[2] + $("#txtFechaCorteSP").val().split('/')[1] + $("#txtFechaCorteSP").val().split('/')[0],
            fvcIdDelAcreditadoAsignadoPorLaInstitución: $("#txtIdAcreditadoSP").val(),
            fvcIdDelCréditoAsignadoPorLaInstitución: $("#txtIdCreditoAsignadoInstSP").val(),
            FVCNumeroDeDisposicion: $("#txtNumeroDisposicionSP").val(),
            fnPorcentajeNoCubiertoDelCrédito: $("#txtPorcentajeNoCubiertoCreditoSP").val(),
            fnSeveridadDeLaPérdida: $("#txtSeveridadDPerdidaSP").val(),
            fnExposiciónAlIncumplimientoSinGarantía: $("#txtExposiciónIncumplimientoGarantiaSP").val(),
            fnProbabilidadDeIncumplimientoDelAcreditado: $("#txtProbabilidadIncumpAcreditadSP").val(),
            fnNúmeroDeGarantíasRealesFinancieras: $("#txtNoGarantiasRealFinanSP").val(),
            fnPorcentajeDeCoberturaDeLaGarantíaRealFinanciera: $("#txtPorcentajeCoberGarantRealFinanSP").val(),
            fnFactorDeAjuste_He: $("#txtFactorAjusteHESP").val(), fnFactorDeAjuste_Hfx: $("#txtFactorAjusteHfxSP").val(),
            fnFactorDeAjuste_Hc: $("#txtFactorAjusteHCSP").val(), fnValorContableDeLaGarantíaRealFinanciera: $("#txtValorContableGarantrealFinanSP").val(),
            fnSeveridadDeLaPérdidaAjustadaPorGarantíasRealesFinancieras: $("#txtSeveridadPerdidaGRFSP").val(),
            fnExposiciónAlIncumplimientoAjustadaPorGarantíasReales: $("#txtExposicionIncumpGarantiasRealSP").val(),
            fnNúmeroDeGarantíasRealesNoFinancieras: $("#txtNoGarantiasRealesNoFinanSP").val(),
            fnPorcentajeDeCoberturaDeLaGarantíaRealNoFinanciera: $("#txtPorcenCoberturaGaranRealNoFinanSP").val(),
            fnValorGarantíaConDerechosDeCobro: $("#txtValorGarantiaDerechoCobroSP").val(),
            fnValorGarantíaConBienesInmuebles: $("#txtValorGarantiaBienesInmueblesSP").val(),
            fnValorGarantíaConBienesMuebles: $("#txtValorGarantiaBienesMueblesSP").val(),
            fnValorGarantíaConFideicomisosDeGarantíaYDeAdmónConPart_Fed_YAport_Fed_ComoFuenteDePago: $("#txtValorGaranFideGarantAdmonPartFedAportFedSP").val(),
            fnValorGarantíaConFideicomisosDeGarantíaYDeAdmónConIngresosPropiosComoFuenteDePago: $("#txtValorGarantFideicomisoGatantAdmonIngPropFuentPagSP").val(),
            fnValorGarantíaConOtrasGarantíasRealesNoFinancieras: $("#txtValorGarantiaOtrasRealesNoFinanSP").val(),
            fnSeveridadDeLaPérdidaAjustadaPorDerechosDeCobro: $("#txtSeveridadPerdidaAjustadaDerechosCobroSP").val(),
            fnSeveridadDeLaPérdidaAjustadaPorBienesInmuebles: $("#txtSeveridadPerdidaAjustadaBienesInmueblesSP").val(),
            fnSeverdiadDeLaPérdidaAjustadaPorBienesMuebles: $("#txtSeveridadPerdidaAjustadaBienesMueblesSP").val(),
            fnSeveridadDeLaPérdidaAjustadaPorFideicomisosDeGarantíaYDeAdmónConPart_Fed_YAport_FederalesComoFuenteDePago: $("#txtSeveridadPerdidaFideGarantAdmonPartFedAportFedSP").val(),
            fnSeveridadDeLaPérdidaAjustadaPorFideicomisosDeGarantíaYDeAdmónConIngresosPropiosComoFuenteDePago: $("#txtSeveridadPerdidaFideGarantAdmonIngPropFuentPagSP").val(),
            fnSeveridadDeLaPérdidaAjustadaConOtrasGarantíasRealesNoFinancieras: $("#txtSeveridadPerdidaAjustOtrasGarantRealesNoFinanSP").val(),
            fnTotalDeSeveridadDeLaPérdidaPorGarantíasRealesNoFinancieras: $("#txtTotalSeveridadPerdidaGarantRealesNFinanSP").val(),
            fnNúmeroDeGarantíasRealesPersonalYDerivadosDeCrédito: $("#txtNoGarantRealesPersonalDerivadoCreditoSP").val(),
            fnPorcentajeCubiertoConGarantíasPersonales: $("#txtPorcentajCubiertoGarantPersonSP").val(),
            fvcNombreDelObligadoSolidarioOAval: $("#txtNombreObligadoSolidarioAvalSP").val(),
            fnPorcentajeCubiertoPorObligadoSolidarioOAvalDistintoAEntidadFederativaYMunicipio: $("#txtPorcentajeCubObligadoSolidDistEntFedMunSP").val(),
            fnTipoDeObligadoSolidarioOAval: $("#sltTipoObligadoSolidarioAvalSP").val(), fvcRfcDelObligadoSolidarioOAval: $("#txtRFCObligadoSolidaAvalSP").val(),
            fnTipoDeGarante: $("#sltTipoGaranteSP").val(), fnProbabilidadDeIncumplimientoDelGarante: $("#txtProbabilidadIncumplientoGaranteSP").val(),
            fnValuaciónAMercadoDelDerivadoDeCrédito: $("#txtValuacionMercadoDerivadoCreditoSP").val(),
            fnMonedaDeLaGarantíaPersonal: $("#sltMonedaGarantiaPersonalSP").val(),
            fvcNombreDelGaranteEcpm: $("#txtNombreGaranteECPMSP").val(), fvcNombreDelGarantePp: $("#txtNombreGarantePPSP").val(),
            fnPorcentajeCubiertoPorEsquemasDePasoYMedida: $("#txtPorcentajeCubEsquemaPasoMediaSP").val(),
            fnPorcentajeCubiertoPorEsquemasDePrimerasPérdidas: $("#txtPorcentajeCubEsquemaPrimPerdiSP").val(),
            fnMontoCubiertoPorEsquemasDePrimerasPérdidas: $("#txtMontoCubEsquemaPrimPerdidasSP").val(),
            fvcTipoDeEmpresa: $("#sltTipoEmpresaSP").val(),
            opcion: esEdicionSP ? 1 : 2
        };
        peticionAjax('Default.aspx/GuardarSP', "POST", parametros, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    MostrarMsj("Información almacenada exitosamente.", " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
                    CambiarDiv('DivDatosResumen', 'divDatosSP', false, true);
                    LimpiarDatosSPSIC();
                }
            }
            else MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function NoVacioDatosSPSIC() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaCorteSP", "1. Fecha Corte"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdAcreditadoSP", "4. ID Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdCreditoAsignadoInstSP", "21. Número de Línea de Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroDisposicionSP", "60. Número Disposición"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoEmpresaSP", "3. Tipo de Empresa", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeNoCubiertoCreditoSP", "96. Porcentaje No Cubierto del Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadDPerdidaSP", "97. Severidad de la Pérdida"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposiciónIncumplimientoGarantiaSP", "98. Exposición al Incumplimineto Sin Garantía"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbabilidadIncumpAcreditadSP", "99. Probabilidad Incumplimiento del Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNoGarantiasRealFinanSP", "100. No. Garantias Reales Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeCoberGarantRealFinanSP", "101. Porcentaje Cobertura Garantia Real Financiera"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFactorAjusteHESP", "102. Factor Ajuste (HE)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFactorAjusteHfxSP", "103. Factor Ajuste (Hfx)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFactorAjusteHCSP", "104. Factor Ajuste (HC)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorContableGarantrealFinanSP", "105. Valor Contable Garantía Real Financiera"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaGRFSP", "106. Severidad de Pérdida Ajustada por Garantías Reales Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposicionIncumpGarantiasRealSP", "107. Exposición Incumplimiento Ajustada por Garantías Reales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNoGarantiasRealesNoFinanSP", "108. No. Garantías Reales No Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcenCoberturaGaranRealNoFinanSP", "109. Porcentaje Cobertura Garantía Real No Financiera"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGarantiaDerechoCobroSP", "110. Valor Garantía Con Derechos de Cobro"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGarantiaBienesInmueblesSP", "111. Valor Garantía Con Bienes Inmuebles"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGarantiaBienesMueblesSP", "112. Valor Garantía Con Bienes Muebles"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGaranFideGarantAdmonPartFedAportFedSP", "113. Valor Garantía Fideicomiso de Garantía y Admón con Part. Fed. y Aport. Fed como Fuente Pago"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGarantFideicomisoGatantAdmonIngPropFuentPagSP", "114. Valor Garantía con Fideicomiso de Garantía y Admón Ingresos Propios Fuente Pago"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGarantiaOtrasRealesNoFinanSP", "115. Valor Garantía con Otras Garantías Reales No Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaAjustadaDerechosCobroSP", "116. Severidad de Pérdida Ajustada por Derechos Cobro"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaAjustadaBienesInmueblesSP", "117. Severidad de Pérdida Ajustada por Bienes Inmuebles"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaAjustadaBienesMueblesSP", "118. Severidad de Pérdida Ajustada Con Bienes Muebles"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaFideGarantAdmonPartFedAportFedSP", "119. Severidad de Pérdida Ajustada por Fideicomiso de Garantía y Admón con Part. Fed. y Aport. Fed como Fuente Pago"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaFideGarantAdmonIngPropFuentPagSP", "120. Severidad de Pérdida Ajustada por Fideicomiso de Garantía y Admón Ingresos Propios Fuente Pago"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaAjustOtrasGarantRealesNoFinanSP", "121. Severidad de Pérdida Ajustada con Otras Garantías Reales No Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtTotalSeveridadPerdidaGarantRealesNFinanSP", "122. Total Severidad de Pérdida por Garantías Reales No Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNoGarantRealesPersonalDerivadoCreditoSP", "123. No. Garantías Reales Personal y Derivados de Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajCubiertoGarantPersonSP", "124. Porcentaje Cubierto con Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNombreObligadoSolidarioAvalSP", "125. Nombre del Obligado Solidario o Aval"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeCubObligadoSolidDistEntFedMunSP", "126. Porcentaje Cubierto por Obligado Solidario Distinto a Entidad Fed. y Mun."); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoObligadoSolidarioAvalSP", "127. Tipo del Obligado Solidario o Aval", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtRFCObligadoSolidaAvalSP", "128. RFC del Obligado Solidario o Aval"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoGaranteSP", "129. Tipo de Garante", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbabilidadIncumplientoGaranteSP", "130. Probabilidad de incumplimiento del Garante"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValuacionMercadoDerivadoCreditoSP", "131. Valuación a Mercado del Derivado de Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltMonedaGarantiaPersonalSP", "132. Moneda de la Garantía Personal", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNombreGaranteECPMSP", "133. Nombre del Garante ECPM"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNombreGarantePPSP", "134. Nombre del Garante PP"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeCubEsquemaPasoMediaSP", "135. Porcentaje Cubierto por Esquemas de Paso y Media"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeCubEsquemaPrimPerdiSP", "136.Porcentaje Cubierto por Esquemas de Primeras Pérdidas"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoCubEsquemaPrimPerdidasSP", "137. Monto Cubierto por Esquemas de Primeras Pérdidas"); else return dispararReturn;
    return dispararReturn;
}

function LimpiarDatosSPSIC() {
    LimpiarCampo("txtFechaCorteSP", "", false, false, false);
    LimpiarCampo("txtIdAcreditadoSP", "", false, true, false);
    LimpiarCampo("txtIdCreditoAsignadoInstSP", "", false, true, false);
    LimpiarCampo("txtNumeroDisposicionSP", "", false, true, false);
    LimpiarCampo("sltTipoEmpresaSP", "", false, false, true);
    LimpiarCampo("txtPorcentajeNoCubiertoCreditoSP", "", true, false, false);
    LimpiarCampo("txtSeveridadDPerdidaSP", "", true, false, false);
    LimpiarCampo("txtExposiciónIncumplimientoGarantiaSP", "", true, false, false);
    LimpiarCampo("txtProbabilidadIncumpAcreditadSP", "", true, false, false);
    LimpiarCampo("txtNoGarantiasRealFinanSP", "", true, false, false);
    LimpiarCampo("txtPorcentajeCoberGarantRealFinanSP", "", true, false, false);
    LimpiarCampo("txtFactorAjusteHESP", "", true, false, false);
    LimpiarCampo("txtFactorAjusteHfxSP", "", true, false, false);
    LimpiarCampo("txtFactorAjusteHCSP", "", true, false, false);
    LimpiarCampo("txtValorContableGarantrealFinanSP", "", true, false, false);
    LimpiarCampo("txtSeveridadPerdidaGRFSP", "", true, false, false);
    LimpiarCampo("txtExposicionIncumpGarantiasRealSP", "", true, false, false);
    LimpiarCampo("txtNoGarantiasRealesNoFinanSP", "", true, false, false);
    LimpiarCampo("txtPorcenCoberturaGaranRealNoFinanSP", "", true, false, false);
    LimpiarCampo("txtValorGarantiaDerechoCobroSP", "", true, false, false);
    LimpiarCampo("txtValorGarantiaBienesInmueblesSP", "", true, false, false);
    LimpiarCampo("txtValorGarantiaBienesMueblesSP", "", true, false, false);
    LimpiarCampo("txtValorGaranFideGarantAdmonPartFedAportFedSP", "", true, false, false);
    LimpiarCampo("txtValorGarantFideicomisoGatantAdmonIngPropFuentPagSP", "", true, false, false);
    LimpiarCampo("txtValorGarantiaOtrasRealesNoFinanSP", "", true, false, false);
    LimpiarCampo("txtSeveridadPerdidaAjustadaDerechosCobroSP", "", true, false, false);
    LimpiarCampo("txtSeveridadPerdidaAjustadaBienesInmueblesSP", "", true, false, false);
    LimpiarCampo("txtSeveridadPerdidaAjustadaBienesMueblesSP", "", true, false, false);
    LimpiarCampo("txtSeveridadPerdidaFideGarantAdmonPartFedAportFedSP", "", true, false, false);
    LimpiarCampo("txtSeveridadPerdidaFideGarantAdmonIngPropFuentPagSP", "", true, false, false);
    LimpiarCampo("txtSeveridadPerdidaAjustOtrasGarantRealesNoFinanSP", "", true, false, false);
    LimpiarCampo("txtTotalSeveridadPerdidaGarantRealesNFinanSP", "", true, false, false);
    LimpiarCampo("txtNoGarantRealesPersonalDerivadoCreditoSP", "", true, false, false);
    LimpiarCampo("txtPorcentajCubiertoGarantPersonSP", "", true, false, false);
    LimpiarCampo("txtNombreObligadoSolidarioAvalSP", "", true, false, false);
    LimpiarCampo("txtPorcentajeCubObligadoSolidDistEntFedMunSP", "", true, false, false);
    LimpiarCampo("sltTipoObligadoSolidarioAvalSP", "", false, false, true);
    LimpiarCampo("txtRFCObligadoSolidaAvalSP", "", true, false, false);
    LimpiarCampo("sltTipoGaranteSP", "", false, false, true);
    LimpiarCampo("txtProbabilidadIncumplientoGaranteSP", "", true, false, false);
    LimpiarCampo("txtValuacionMercadoDerivadoCreditoSP", "", true, false, false);
    LimpiarCampo("sltMonedaGarantiaPersonalSP", "", false, false, true);
    LimpiarCampo("txtNombreGaranteECPMSP", "", true, false, false);
    LimpiarCampo("txtNombreGarantePPSP", "", true, false, false);
    LimpiarCampo("txtPorcentajeCubEsquemaPasoMediaSP", "", true, false, false);
    LimpiarCampo("txtPorcentajeCubEsquemaPrimPerdiSP", "", true, false, false);
    LimpiarCampo("txtMontoCubEsquemaPrimPerdidasSP", "", true, false, false);
}