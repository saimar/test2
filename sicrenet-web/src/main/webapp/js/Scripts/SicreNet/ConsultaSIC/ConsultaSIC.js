
var Linea = '';
var Disposicion = '';

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
    $('.calendarioSP').datepicker({ maxDate: -0 });
    $("#accordion").accordion({ event: false });
    document.getElementById("DivClientes").style.height = "auto";
    document.getElementById("Lineas").style.height = "auto";
    document.getElementById("DivDisposiciones").style.height = "auto";
    document.getElementById("DivCortes").style.height = "auto";
    $("#hCliente").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
    $("#hLinea").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
    $("#hDisposicion").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
    $("#hCorte").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
    //////// Configuracion Tab
    var activeTabIndex = -1;
    var tabNames = ["ConsultaSic", "Clientes", "Lineas", "Disposiciones", "Cortes"];

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
        if (e.target.id == "Clientes")
            CargarTablaClientes("1", '0', "divClientes");
        if (e.target.id == "Lineas")
            CargarTablaClientes("2", '0', "divLineas");
        if (e.target.id == "Disposiciones")
            CargarTablaClientes("3", '0', "divDisposiciones");
        if (e.target.id == "Cortes")
            CargarTablaClientes("4", fechaActual.split('/')[2] + fechaActual.split('/')[1] + fechaActual.split('/')[0], "divCortes");
        return false;
    });
    //Clientes
    arrayCatalogos.push("ActvidadEconomica,sltActividadEconomica");
    arrayCatalogos.push("TipoEmpresa,sltTipoEmpresa");
    arrayCatalogos.push("SectorContable,sltSectorContable");
    //Lineas
    arrayCatalogos.push("TipoAltaCredito,sltTipoAltaCredito");
    arrayCatalogos.push("TipoProducto,sltTipoProducto");
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
    //Disposiciones
    arrayCatalogos.push("CategoriaCredito,sltCategoriaCredito");
    arrayCatalogos.push("MonedaDisposicion,sltMonedaDispocion");
    arrayCatalogos.push("ProyectoInversionFuentePagoP,sltProyectoInversion");
    //-- 
    arrayCatalogos.push("InstitucionBancaOtorgoF,sltInstitucionBancaDesFondoFon");
    WidtDatePicker();
});

function txtFechaConsultaCorte_Change(evt, obj) {
    if (changeFormatoFecha(evt, obj)) {
        CargarTablaClientes("4", $(obj).val().split('/')[2] + $(obj).val().split('/')[1] + $(obj).val().split('/')[0], "divCortes");
    }
}

var fechaActual = "21/02/2014";
function GetFechaActual() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('ConsultaSIC.aspx/GetFechaActual', "POST", null, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                fechaActual = data.d;
                $("#txtFechaConsultaCorte").val(fechaActual);
                $("#txtFechaCorteEncontrados").val(fechaActual);
            }
            CargaCatalogosCliente(0, "DatosCliente");
        }
    }, null);
}


var arrayCatalogos = new Array();
function CargarTablaClientes(opcion, fecha, idDiv) {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.SicreNet.ConsultaSIC.ConsultaSIC.CargarTablasSIC(opcion, fecha,
        function (response) {
            if (response.value.indexOf("Error") == -1) {
                var JSON = obtenerArregloDeJSON(response.value, false);
                $("#" + idDiv).html(response.value == "" ? "Sin Datos" : generarTablaDeRegistrosSinFoot1(JSON, '', "tablaDatos" + idDiv));
                document.getElementById("tab-container").style.width = document.getElementById("divHeader").offsetWidth - 100 + "px";
                $("#" + "tablaDatos" + idDiv).tablesorter();
            } else
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    );
}

function CargaCatalogosCliente(idArregloDeCarga, opcionCargar) {
    SicreNet.SicreNet.ConsultaSIC.ConsultaSIC.GetCatalogosClientes(arrayCatalogos[idArregloDeCarga].split(',')[0], "",
        function (response) {
            if (response.value.indexOf("Error") == -1) {
                //var Items = obtenerArregloDeJSON(response.value, false);
                var Items = new Array(); //= obtenerArregloDeJSON(data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''), false);
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
                $("#FiltroBuscarCliente").focus();
                if (opcionCargar == "DatosCliente") sltTipoEmpresa_OnChange($("#sltTipoEmpresa"), 0);
                else if (opcionCargar == "DatosSP") CargarDatosSP(fechaActual.split('/')[2] + fechaActual.split('/')[1] + fechaActual.split('/')[0], true);
                else if (opcionCargar == "DatosCorte") BuscarCortesXFecha(fechaActual.split('/')[2] + fechaActual.split('/')[1] + fechaActual.split('/')[0]);
            }
        }
    );
}

function ExportarAPdf(tabla, titulo) {
    Waiting(true, "Espere por favor. Cargando Información...");
    __doPostBack('Pdf', tabla + "," + titulo);
    setTimeout(terminarWait, 4000);
}

function ExportarAExcel(tabla, titulo) {
    Waiting(true, "Espere por favor. Cargando Información...");
    __doPostBack('Excel', tabla + "," + titulo);
    setTimeout(terminarWait, 4000);
}

var TipoCartera = "";
var AcreditadoRelacionado = "";
var LugarRadica = "";
var arrayCatalogosXTipoEmpresa = new Array();
function sltTipoEmpresa_OnChange(obj, opcion) {
    arrayCatalogosXTipoEmpresa = new Array();
    if (opcion = "Cliente") {
        arrayCatalogosXTipoEmpresa.push("7,sltTipoCartera");
        arrayCatalogosXTipoEmpresa.push("38,sltAcreditadoRelacionado");
        arrayCatalogosXTipoEmpresa.push("154,sltLugarRadica");
        arrayCatalogosXTipoEmpresa.push("19,sltTipoOperacion");
        arrayCatalogosXTipoEmpresa.push("20,sltDestinoDelCredito");
    }
    Waiting(true, "Espere por favor. Cargando Información...");
    CargarCatalogodXTipoEmpresa(0, $(obj).val(), "0");

    var irec = 0;
    if (document.forms[0]["EditarCliente"] != undefined) {
        for (irec = 0; irec < document.forms[0]["EditarCliente"].length; irec++) {
            if (document.forms[0]["EditarCliente"][irec].checked)
                break;
        }
        $("#sltTipoEmpresa").val(document.forms[0]["EditarCliente"][irec].alt);
    }
    $("#txtTipoEmpresaLinea").val(document.getElementById("sltTipoEmpresa").options[document.getElementById("sltTipoEmpresa").selectedIndex].text);
    $("#txtTipoEmpresaLinea").attr("alt", $("#sltTipoEmpresa").val());
    $("#txtTipoEmpresaDisp").val(document.getElementById("sltTipoEmpresa").options[document.getElementById("sltTipoEmpresa").selectedIndex].text);
}

function CargarCatalogodXTipoEmpresa(idArreglo, idTipoEmpresa, idAtraso) {
    SicreNet.SicreNet.ConsultaSIC.ConsultaSIC.CargarCatalogodXTipoEmpresa(arrayCatalogosXTipoEmpresa[idArreglo].split(',')[0], idTipoEmpresa, idAtraso,
        function (response) {
            if (response.value.indexOf("Error") == -1) {
                document.getElementById(arrayCatalogosXTipoEmpresa[idArreglo].split(',')[1]).options.length = 0;

                var opcion = new Option("-- Seleccione una opción --", -1);
                document.getElementById(arrayCatalogosXTipoEmpresa[idArreglo].split(',')[1]).options[document.getElementById(arrayCatalogosXTipoEmpresa[idArreglo].split(',')[1]).options.length] = opcion;
                document.getElementById(arrayCatalogosXTipoEmpresa[idArreglo].split(',')[1]).options[document.getElementById(arrayCatalogosXTipoEmpresa[idArreglo].split(',')[1]).options.length - 1].title = "-- Seleccione una opción --";

                if (response.value != "") {
                    var Items = obtenerArregloDeJSON(response.value, false);
                    for (var i = 0; i < Items.length; i++) {
                        var Item = Items[i];
                        var opcion = new Option(Item.Clave + "-" + Item.Descripcion, Item.Clave);
                        document.getElementById(arrayCatalogosXTipoEmpresa[idArreglo].split(',')[1]).options[document.getElementById(arrayCatalogosXTipoEmpresa[idArreglo].split(',')[1]).options.length] = opcion;
                        document.getElementById(arrayCatalogosXTipoEmpresa[idArreglo].split(',')[1]).options[document.getElementById(arrayCatalogosXTipoEmpresa[idArreglo].split(',')[1]).options.length - 1].title = Item.Clave + "-" + Item.Descripcion;
                    }
                }
            } else
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);

            if (TipoCartera != "" && arrayCatalogosXTipoEmpresa[idArreglo].split(',')[0] == "7") {
                $("#sltTipoCartera").val(TipoCartera);
                TipoCartera = "";
            }
            if (AcreditadoRelacionado != "" && arrayCatalogosXTipoEmpresa[idArreglo].split(',')[0] == "38") {
                $("#sltAcreditadoRelacionado").val(AcreditadoRelacionado);
                AcreditadoRelacionado = "";
            }
            if (LugarRadica != "" && arrayCatalogosXTipoEmpresa[idArreglo].split(',')[0] == "154") {
                $("#sltLugarRadica").val(LugarRadica);
                LugarRadica = "";
            }
            if (idArreglo + 1 < arrayCatalogosXTipoEmpresa.length)
                CargarCatalogodXTipoEmpresa(idArreglo + 1, idTipoEmpresa, idAtraso)
            else {
                RecargarCampoAtraso("sltFiltroXTipoEmpresa", "lblFiltroXTipoEmpresa", $("#sltTipoEmpresa").val());
                $("#sltFiltroXTipoEmpresa").val(valorAtrasoEdicionCliente);
                if (valorTipoEmpresaEdicionCliente != $("#sltTipoEmpresa").val() && valorTipoEmpresaEdicionCliente != "")
                    $("#lblErrorTipoEmpresa").html("Ha cambiado el tipo de Empresa, el valor será reflejado al Guardar el Cliente");
                else
                    $("#lblErrorTipoEmpresa").html("");
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        }
    );
}
function CambiarDiv(Mostrar, Ocultar, ocultarPadre, ocultarhijo, esNuevo) {
    $("#" + Mostrar).parent().slideDown('slow');
    ocultarPadre ? $("#" + Ocultar).parent().slideUp('slow') : null;

    $("#" + Mostrar).show();
    ocultarhijo ? $("#" + Ocultar).hide() : null;

    $("#" + Mostrar).attr("disabled", false);
    $("#" + Ocultar).attr("disabled", true);

    $("#" + Ocultar).find("input:button").attr("class", "classButtonDis");
    $("#" + Ocultar).find("input:button").attr("disabled", true);

    $("#" + Mostrar).find("input:button").attr("class", "classButton");
    $("#" + Mostrar).find("input:button").attr("disabled", false);
    if (esNuevo) {
        $("#btnVerPI").attr("class", "classButtonDis");
        $("#btnVerPI").attr("disabled", true);
    }
    if (Mostrar != "BuscadorCliente")
        document.getElementById($("#" + Mostrar).parent().attr("id")) != null ? document.getElementById($("#" + Mostrar).parent().attr("id")).style.height = "auto" : null;
    else
        document.getElementById($("#" + Mostrar).parent().attr("id")) != null ? document.getElementById($("#" + Mostrar).parent().attr("id")).style.height = "auto" : null;
}

function FCancelarCliente() {
    valorTipoEmpresaEdicionCliente = "";
    CambiarDiv('ClientesEncotrados', 'DatosCliente', false, true);
    LimpiarDatosCliente();
}

function LimpiarDatosCliente() {
    $("#txtIdAcreditado").attr("disabled", false);
    $("#txtIdAcreditado").val("");
    $("#txtNombreAcreditado").val("");
    $("#txtRfcAcreditado").val("");
    $("#txtGrupoRiesgo").val("");
    $("#txtCURP").val("");
    $("#txtLEI").val("");
    $("#sltFiltroXTipoEmpresa").val("-1");
    $("#txtCP").val("");
    $("#txtCalle").val("");

    $("#sltTipoCartera").val("-1");
    $("#sltActividadEconomica").val("-1");
    $("#sltLocalidad").val("-1");
    $("#sltTipoEmpresa").val("1");
    sltTipoEmpresa_OnChange($("#sltTipoEmpresa"), 0);
    $("#sltEstado").val("-1");
    $("#sltNacionalidad").val("-1");
    $("#sltSectorContable").val("-1");
    $("#sltAcreditadoRelacionado").val("-1");
    $("#sltLugarRadica").val("-1");
    $("#sltColonia").val("-1");
    document.getElementById("txtIdAcreditado").style.border = "1px solid Gray";
    document.getElementById("txtNombreAcreditado").style.border = "1px solid Gray";
    document.getElementById("txtRfcAcreditado").style.border = "1px solid Gray";
    document.getElementById("txtGrupoRiesgo").style.border = "1px solid Gray";
    document.getElementById("txtCURP").style.border = "1px solid Gray";
    document.getElementById("txtLEI").style.border = "1px solid Gray";
    document.getElementById("sltFiltroXTipoEmpresa").style.border = "1px solid Gray";
    document.getElementById("sltTipoCartera").style.border = "1px solid Gray";
    document.getElementById("sltActividadEconomica").style.border = "1px solid Gray";
    document.getElementById("sltLocalidad").style.border = "1px solid Gray";
    document.getElementById("txtCP").style.border = "1px solid Gray";
    document.getElementById("sltEstado").style.border = "1px solid Gray";
    document.getElementById("sltNacionalidad").style.border = "1px solid Gray";
    document.getElementById("sltSectorContable").style.border = "1px solid Gray";
    document.getElementById("sltAcreditadoRelacionado").style.border = "1px solid Gray";
    document.getElementById("sltLugarRadica").style.border = "1px solid Gray";
    document.getElementById("sltTipoEmpresa").style.border = "1px solid Gray";
    document.getElementById("sltColonia").style.border = "1px solid Gray";
    document.getElementById("txtCalle").style.border = "1px solid Gray";
}

function KeyPressTXTCliente(evt) {
    if (evt.keyCode == 13)
        BuscarCliente();
}

var esCPCorrecto = false
function txtCurp_OnkeyPress(evt, obj) {
    var availableTags = new Array();
    if ($(obj).val().length >= 2 || $(obj).val() == "0") {
        SicreNet.SicreNet.ConsultaSIC.ConsultaSIC.GetCatalogosClientes("CP", $(obj).val(),
        function (response) {
            if (response.value.indexOf("Error") == -1 && response.value != "") {
                var Items = new Array(); //= obtenerArregloDeJSON(data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''), false);
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
            if (!cargandoPaisEdoLocalidadColonia && esCPCorrecto && evt.keyCode == 13 && ($(obj).val() == "0" || $(obj).val().length == 5))
                CargarPaisEdoLocalidadColonia($(obj).val());
        }
    );
    }
    else {
        $(obj).autocomplete({
            source: availableTags
        });
        document.getElementById("sltNacionalidad").options.length = 0;
        document.getElementById("sltEstado").options.length = 0;
        document.getElementById("sltLocalidad").options.length = 0;
        document.getElementById("sltColonia").options.length = 0;
        esCPCorrecto = false;
    }
    if (!cargandoPaisEdoLocalidadColonia && esCPCorrecto && evt.keyCode == 13 && ($(obj).val() == "0" || $(obj).val().length == 5))
        CargarPaisEdoLocalidadColonia($(obj).val())
}

var cargandoPaisEdoLocalidadColonia = false;
function CargarPaisEdoLocalidadColonia(CP) {
    cargandoPaisEdoLocalidadColonia = true;
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.SicreNet.ConsultaSIC.ConsultaSIC.CargarPaisEdoLocalidadColonia(CP,
        function (response) {
            if (response.value.indexOf("Error") == -1 && response.value != "") {
                document.getElementById("sltNacionalidad").options.length = 0;
                var pais = obtenerArregloDeJSON(response.value.split('%%&&')[0], false);
                var opcion = new Option(pais[0].fvcDescripcionPais, pais[0].idPais);
                document.getElementById("sltNacionalidad").options[document.getElementById("sltNacionalidad").options.length] = opcion;
                document.getElementById("sltNacionalidad").options[document.getElementById("sltNacionalidad").options.length - 1].title = pais[0].fvcDescripcionPais;

                document.getElementById("sltEstado").options.length = 0;
                var edo = obtenerArregloDeJSON(response.value.split('%%&&')[1], false);
                opcion = new Option(edo[0].fvcDescripcionEstado, edo[0].idEstado);
                document.getElementById("sltEstado").options[document.getElementById("sltEstado").options.length] = opcion;
                document.getElementById("sltEstado").options[document.getElementById("sltEstado").options.length - 1].title = edo[0].fvcDescripcionEstado;

                document.getElementById("sltLocalidad").options.length = 0;
                var localidad = obtenerArregloDeJSON(response.value.split('%%&&')[2], false);
                opcion = new Option(localidad[0].fvcDescripcionLocalidad, localidad[0].idLocalidad);
                document.getElementById("sltLocalidad").options[document.getElementById("sltLocalidad").options.length] = opcion;
                document.getElementById("sltLocalidad").options[document.getElementById("sltLocalidad").options.length - 1].title = localidad[0].fvcDescripcionLocalidad;

                document.getElementById("sltColonia").options.length = 0;
                var colonias = obtenerArregloDeJSON(response.value.split('%%&&')[3], false);
                opcion = new Option("-- Seleccione una opción --", -1);
                document.getElementById("sltColonia").options[document.getElementById("sltColonia").options.length] = opcion;
                document.getElementById("sltColonia").options[document.getElementById("sltColonia").options.length - 1].title = "-- Seleccione una opción --";

                for (var i = 0; i < colonias.length; i++) {
                    opcion = new Option(colonias[i].fvcDescripcionColonia, colonias[i].idColonia);
                    document.getElementById("sltColonia").options[document.getElementById("sltColonia").options.length] = opcion;
                    document.getElementById("sltColonia").options[document.getElementById("sltColonia").options.length - 1].title = colonias[i].fvcDescripcionColonia;

                }
                if (Colonia != "") {
                    $("#sltColonia").val(Colonia);
                    Colonia = "";
                }
            }
            Waiting(false, "Espere por favor. Cargando Información...");
            cargandoPaisEdoLocalidadColonia = false;
        }
    );
}

function BuscarCliente() {
    verBtnEdit = false;
    if ($('#FiltroBuscarCliente').val() != "") {
        Waiting(true, "Espere por favor. Cargando Información...");
        $('#ErrorBuscadorCliente').html("");
        var indexBuscarPor = "";
        for (indexBuscarPor = 0; indexBuscarPor < document.forms[0]["BuscarPor"].length; indexBuscarPor++) {
            if (document.forms[0]["BuscarPor"][indexBuscarPor].checked)
                break;
        }
        if (document.forms[0]["BuscarPor"][indexBuscarPor].value == "Disposicion") {
            BuscarPorDisposicion();
        }
        else {
            peticionAjax('ConsultaSIC.aspx/BuscarClientes', "POST", { FiltrarPor: document.forms[0]["BuscarPor"][indexBuscarPor].value, Filtro: $('#FiltroBuscarCliente').val() }, function (data) {
                if (data.d.indexOf("Error") == -1) {
                    if (data.d != "") {
                        var HTML = '';
                        HTML = '<table id="ClientesEncontradosIDS" class="dataGridDatos" ><thead><tr id="CabeceraClientes"><th >ID</th ><th >Nombre</th ><th >RFC</th ><th >Tipo Cartera</th ><th >Grupo de Riesgo</th ><th ><input id="RadioEditarCliente" name="EditarCliente" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
                        var Clientes = obtenerArregloDeJSON(data.d, false);
                        for (var i = 0; i < Clientes.length; i++) {
                            var Cliente = Clientes[i];
                            HTML += '<tr ' + (DeterminaSiNumParImpar(i) == "Par" ? 'style="background: rgba(43, 182, 165, 0.52);" ' : '') + ' id="Cliente' + Cliente.id + '"><td >' + Cliente.id + '</td><td >' + Cliente.Nombre + '</td><td >' + Cliente.Rfc + '</td><td >' + Cliente.TipoCartera + '</td><td >' + Cliente.GrupoRiesgo + '</td><td ><input id="RadioEditarCliente" ';
                            if (i == 0)
                                HTML += 'checked="checked" ';
                            HTML += 'name="EditarCliente" type="radio" lang="' + Cliente.Atraso + '"  alt="' + Cliente.idTipoempresa + '"  value="' + Cliente.id + '" /></td></tr>';
                        }
                        HTML += '</tbody></table>';
                        $('#TablaClientesEncontrados').html(HTML);
                        document.getElementById("ClientesEncontradosIDS").style.width = "100%";
                        CambiarDiv('ClientesEncotrados', 'BuscadorCliente', false, true);

                        if (Linea != '')
                            BuscarLineas();
                    }
                    else
                        $('#ErrorBuscadorCliente').html('No hay resultados que mostrar, verifique sus criterios de busqueda.');
                }
                else {
                    $('#ErrorBuscadorCliente').html('No hay resultados que mostrar, verifique sus criterios de busqueda.' + data.d);
                }
                if (Linea == '')
                    Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
        }

    } else {
        $('#ErrorBuscadorCliente').html('Debe escribir un filtro para la busqueda.');
    }
}

function FCancelarClientesEncontrados() {
    if ($('DivClientes').is("disabled") == false)
        CambiarDiv('BuscadorCliente', 'ClientesEncotrados', false, true);
}

function FNuevoClienteMain() {
    document.getElementById("sltNacionalidad").options.length = 0;
    document.getElementById("sltEstado").options.length = 0;
    document.getElementById("sltLocalidad").options.length = 0;
    document.getElementById("sltColonia").options.length = 0;
    CambiarDiv('DatosCliente', 'BuscadorCliente', false, true, true);
}

function FNuevoCliente() {
    if (document.forms[0]["EditarCliente"] == undefined) return;
    document.getElementById("sltNacionalidad").options.length = 0;
    document.getElementById("sltEstado").options.length = 0;
    document.getElementById("sltLocalidad").options.length = 0;
    document.getElementById("sltColonia").options.length = 0;
    if ($('#DivClientes').is(":disabled") == false)
        CambiarDiv('DatosCliente', 'ClientesEncotrados', false, true, true);
}

var Colonia = "";
var valorAtrasoEdicionCliente = ""; var valorTipoEmpresaEdicionCliente = "";
function EdicionCliente() {
    if (document.forms[0]["EditarCliente"] == undefined) return;
    if ($('#DivClientes').is(":disabled") == false) {
        Waiting(true, "Espere por favor. Cargando Información...");

        var indiceCliente = 0;
        for (indiceCliente = 0; indiceCliente < document.forms[0]["EditarCliente"].length; indiceCliente++) {
            if (document.forms[0]["EditarCliente"][indiceCliente].checked)
                break;
        }
        peticionAjax('ConsultaSIC.aspx/BuscarClientes', "POST", { FiltrarPor: "IDCte", Filtro: document.forms[0]["EditarCliente"][indiceCliente].value }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d != "") {
                    $("#btnVerPI").attr("class", "classButton");
                    $("#btnVerPI").attr("disabled", false);

                    var Cliente = obtenerArregloDeJSON(data.d, false);
                    $("#txtIdAcreditado").attr("disabled", true);
                    $("#btnVerPI").attr("alt", Cliente[0].id);
                    $("#txtIdAcreditado").val(Cliente[0].id);
                    $("#txtNombreAcreditado").val(Cliente[0].Nombre);
                    $("#txtRfcAcreditado").val(Cliente[0].Rfc);
                    $("#txtGrupoRiesgo").val(Cliente[0].GrupoRiesgo);
                    $("#txtCURP").val(Cliente[0].CURP);
                    $("#txtLEI").val(Cliente[0].LEI);

                    if (Cliente[0].idTipoempresa == "2")
                        valorAtrasoEdicionCliente = Cliente[0].EntidadFinanciera;
                    else if (Cliente[0].idTipoempresa == "3")
                        valorAtrasoEdicionCliente = Cliente[0].Atraso;
                    else
                        valorAtrasoEdicionCliente = Cliente[0].idTamañoVentas;

                    TipoCartera = Cliente[0].TipoCarteraId;
                    $("#sltActividadEconomica").val(Cliente[0].ActividadEconomicaId);
                    $("#sltLocalidad").val(Cliente[0].Localidad);
                    $("#txtCP").val(Cliente[0].Municipio);
                    CargarPaisEdoLocalidadColonia($("#txtCP").val());
                    Colonia = Cliente[0].idcolonia;
                    $("#sltEstado").val(Cliente[0].EstadoId);
                    $("#sltNacionalidad").val(Cliente[0].Nacionalidad);
                    $("#sltSectorContable").val(Cliente[0].Sector);
                    AcreditadoRelacionado = Cliente[0].AcredRelacionado;
                    LugarRadica = Cliente[0].LugarRadica;
                    $("#sltTipoEmpresa").val(Cliente[0].idTipoempresa);
                    valorTipoEmpresaEdicionCliente = Cliente[0].idTipoempresa;
                    $("#txtCalle").val(Cliente[0].Calle);

                    sltTipoEmpresa_OnChange($("#sltTipoEmpresa"), 0);
                    //Waiting(false, "Espere por favor. Cargando Información...");
                }
                else {
                    $("#btnVerPI").attr("class", "classButtonDis");
                    $("#btnVerPI").attr("disabled", true);
                }
            }
            else {
                Waiting(false, "Espere por favor. Cargando Información...");
                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            }
        }, null);
        CambiarDiv('DatosCliente', 'ClientesEncotrados', false, true);
    }
}

function GuardarDatosCliente() {
    if (NoVacioDatosCliente()) {
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
            localidad: $('#sltLocalidad').val(),
            municipio: $('#txtCP').val(),
            estado: $('#sltEstado').val(),
            nacionalidad: $('#sltNacionalidad').val(),
            curp: $('#txtCURP').val(),
            lei: $('#txtLEI').val(),
            sectorContable: $('#sltSectorContable').val(),
            acreditadoRelacionado: $('#sltAcreditadoRelacionado').val(),
            lugarRadica: $('#sltLugarRadica').val(),
            entidadFinancieraOtorgante: ($('#sltTipoEmpresa').val() == "2" ? $('#sltFiltroXTipoEmpresa').val() : "NO"),
            tipoEmpresa: $('#sltTipoEmpresa').val(),
            colonia: $('#sltColonia').val(),
            domicilioCalle: $('#txtCalle').val(),
            esAtraso: ($('#sltTipoEmpresa').val() == "3" ? $('#sltFiltroXTipoEmpresa').val() : "0"),
            tamañoVentas: ($('#sltTipoEmpresa').val() == "4" ? $('#sltFiltroXTipoEmpresa').val() : "-9"),
            EditarOGuardar: EditarOGuardar
        };
        peticionAjax('ConsultaSIC.aspx/GuardarCliente', "POST", parametrosGuardar, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    var HTML = '<span style="color:Green;font-weight:bold">El cliente se ha guardado de forma correcta.</span><br /><br />';
                    HTML += '<table id="ClientesEncontradosIDS" class="dataGridDatos" ><thead><tr><th >ID</th ><th >Nombre</th ><th >Tipo Cartera</th ><th >Estado</th ><th >RFC</th ><th ><input id="RadioEditarCliente" name="EditarCliente" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
                    HTML += '<tr style="background: rgba(43, 182, 165, 0.52);" id="Cliente' + $('#txtIdAcreditado').val() + '"><td >' + $('#txtIdAcreditado').val() + '</td><td >' + $('#txtNombreAcreditado').val() + '</td><td >' + document.getElementById('sltTipoCartera').options[document.getElementById('sltTipoCartera').selectedIndex].text + '</td><td >' + document.getElementById('sltEstado').options[document.getElementById('sltEstado').selectedIndex].text + '</td><td >' + $('#txtRfcAcreditado').val() + '</td><td ><input id="RadioEditarCliente" ';
                    HTML += 'checked="checked" ';
                    HTML += 'name="EditarCliente" type="radio"  value="' + $('#txtIdAcreditado').val() + '" /></td></tr>';
                    HTML += '</tbody></table>';
                    $(TablaClientesEncontrados).html(HTML);
                    document.getElementById("ClientesEncontradosIDS").style.width = "100%";
                    $('#EditarClientesEncontrados').attr("disabled", false);
                    $('#VerLineas').attr("disabled", false);
                    LimpiarDatosCliente();
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

function NoVacioDatosCliente() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdAcreditado", "Id Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNombreAcreditado", "Nombre Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtRfcAcreditado", "Rfc"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoEmpresa", "Tipo Empresa", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoCartera", "Tipo Cartera", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltActividadEconomica", "Actividad Económica", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtGrupoRiesgo", "Grupo Riesgo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCURP", "CURP"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtLEI", "Legal Entity Identifier"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCP", "CP"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltNacionalidad", "Nacionalidad", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltEstado", "Estado", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltLocalidad", "Localidad", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltColonia", "Colonia", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCalle", "Calle"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltSectorContable", "Sector Contable", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltAcreditadoRelacionado", "Acreditado Relacionado", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltLugarRadica", "Lugar Radica", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltFiltroXTipoEmpresa", ($("#sltTipoEmpresa").val() == "2" ? "Entidad Financiera Otorgante" : ($("#sltTipoEmpresa").val() == "3" ? "Atraso" : " Tamaño Ventas")), true); else return dispararReturn;
    return dispararReturn;
}

function VerficaCadenaVaciaCampo(Campo, mensaje, esCombo) {
    if ($('#' + Campo).val() == null || $('#' + Campo).val().trim() == "" || (esCombo && document.getElementById(Campo).options.length > 1 && $('#' + Campo).val() == "-1")) {
        $('#' + Campo).focus();
        document.getElementById(Campo).style.border = "1px solid Red";
        MostrarMsj(esCombo ? ("Seleccione una opción en el campo <span style='font-weight: bold;'>" + mensaje + "</span>") : ("El campo <span style='font-weight: bold;'>" + mensaje + "</span> no puede estar en blanco."), "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
        return false;
    }
    else { document.getElementById(Campo).style.border = "1px solid Gray"; return true; }
}

/////////////////////////////////////////////////////////////// LINEAS
var verBtnEditLineas = false;
function BuscarLineas() {
    if (!$('#DivClientes').is(":disabled")) {
        Waiting(true, "Espere por favor. Cargando Información...");
        CambiarDiv('LineasEncontradas', 'ClientesEncotrados', false, false);
        var irec = 0;
        for (irec = 0; irec < document.forms[0]["EditarCliente"].length; irec++) {
            if (document.forms[0]["EditarCliente"][irec].checked)
                break;
        }
        $(DatosLinea).hide();
        verBtnEditLineas = false;
        peticionAjax('ConsultaSIC.aspx/BuscarLineas', "POST", { opcion: 1, idCliente: document.forms[0]["EditarCliente"][irec].value }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d != "") {
                    verBtnEditLineas = false;
                    $("#txtIdClienteLinea").val(document.forms[0]["EditarCliente"][irec].value);
                    var HTML = '';
                    HTML = '<table id="LineasEncontradasNLS"  class="dataGridDatos" width="100%"><thead><tr id="CabeceraLineas"><th>Numero de Linea</th><th>Monto Autorizado</th><th >Fecha Maxima para Disponer Recursos</th><th >Fecha Vencimiento Línea de Crédito</th><th>Forma Disposición</th><th ><input id="RadioEditarLinea" name="EditarLineaX" type="radio"  value="" style="display: none" /></th></tr></thead><tbody style="text-align: left;">';
                    Registros = obtenerArregloDeJSON(data.d, false);
                    for (var i = 0; i < Registros.length; i++) {
                        var Registro = Registros[i];
                        HTML += '<tr ' + (DeterminaSiNumParImpar(i) == "Par" ? 'style="background: rgba(43, 182, 165, 0.52);" ' : '') + ' id="Linea' + Registro.IdDelCréditoAsignadoPorLaInstitución + '"><td >' + Registro.IdDelCréditoAsignadoPorLaInstitución + '</td><td style="padding-right: 10; text-align:right;">' + Registro.MontoDeLaLíneaDeCréditoAutorizado + '</td><td >&nbsp&nbsp' + Registro.FechaMáximaParaDisponerDeLosRecursos + '</td><td >' + Registro.FechaVencimientoDeLaLíneaDeCrédito + '</td><td >' + Registro.FormaDeLaDisposición + '</td><td ><input id="RadioEditarLinea" ';
                        if (Linea == '') {
                            if (i == 0)
                                HTML += 'checked="checked" ';
                        }
                        else {
                            if (Registro.IdDelCréditoAsignadoPorLaInstitución == Linea)
                                HTML += 'checked="checked" ';
                        }
                        HTML += 'name="EditarLineaX" type="radio"  value="' + Registro.IdDelCréditoAsignadoPorLaInstitución + '" /></td></tr>';
                    }
                    HTML += '</tbody></table>';
                    $(TablaLineasEncontradas).html(HTML);
                    document.getElementById("LineasEncontradasNLS").style.width = "100%";
                    if (Disposicion != '')
                        BuscarDisposiciones();

                }
                else {
                    $(TablaLineasEncontradas).html('<span style="font-weight:bold">No hay lineas para el cliente seleccionado.</span>');
                    verBtnEditLineas = true;
                }
                $('#EditarLinea').attr("disabled", verBtnEditLineas);
                $('#EditarLinea').attr("class", (verBtnEditLineas ? "classButtonDis" : "classButton"));
                $('#VerDisposiciones').attr("disabled", verBtnEditLineas);
                $('#VerDisposiciones').attr("class", (verBtnEditLineas ? "classButtonDis" : "classButton"));

                $("#LineasEncontradas").show();
                $('#DivCabeceraLineas').attr("disabled", false);

                for (var Renglon = 0; Renglon < document.getElementById('ClientesEncontradosIDS').rows.length; Renglon++) {
                    if (Renglon > 0) {
                        if (document.getElementById('ClientesEncontradosIDS').rows[Renglon].cells[0].textContent != document.forms[0]["EditarCliente"][irec].value) {
                            $(document.getElementById('Cliente' + document.getElementById('ClientesEncontradosIDS').rows[Renglon].cells[0].textContent)).hide();
                        }
                    }
                }
            }
            else {
                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            }
            $("#sltTipoEmpresa").val(document.forms[0]["EditarCliente"][irec].alt);
            sltTipoEmpresa_OnChange($("#sltTipoEmpresa"), 0)

            if (Disposicion == '')
                Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function FCancelarLinea() {
    CambiarDiv('LineasEncontradas', 'DatosLinea', false, true);
    LimpiarDatosLinea();
    $('#EditarLinea').attr("disabled", verBtnEditLineas);
    $('#EditarLinea').attr("class", (verBtnEditLineas ? "classButtonDis" : "classButton"));
    $('#VerDisposiciones').attr("disabled", verBtnEditLineas);
    $('#VerDisposiciones').attr("class", (verBtnEditLineas ? "classButtonDis" : "classButton"));
}
function FCancelarLineasEncontradas() {
    if (document.getElementById('ClientesEncontradosIDS') == null) return;
    if ($('Lineas').is(":disabled") == false) {
        CambiarDiv('ClientesEncotrados', 'LineasEncontradas', true, true);
        $('#DivClientes').attr("disabled", false);
        for (var Renglon = 0; Renglon < document.getElementById('ClientesEncontradosIDS').rows.length; Renglon++) {
            if (Renglon > 0) {
                $('#Cliente' + document.getElementById('ClientesEncontradosIDS').rows[Renglon].cells[0].textContent).show();
            }
        }
    }
}

function FNuevaLinea() {
    if (document.forms[0]["EditarCliente"] == undefined) return;
    if ($('#Lineas').is("disabled") == false) {
        CambiarDiv('DatosLinea', 'LineasEncontradas', false, true);
        var i = 0;
        for (i = 0; i < document.forms[0]["EditarCliente"].length; i++) {
            if (document.forms[0]["EditarCliente"][i].checked)
                break;
        }
        $('#txtIdClienteLinea').val(document.forms[0]["EditarCliente"][i].value);
    }
}

function LimpiarDatosLinea() {
    $("#txtNumeroLinea").attr("disabled", false);
    $("#txtNumeroLinea").val("");
    $("#txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia").val("");
    $("#txtIdCreditoMetCNBV").val("");
    $("#txtIdCredLineaGrupalMultimonedaCNBV").val("");
    $("#txtMontoLineaCreditoAutorizado").val("");
    $("#txtFechaMaximaDisponerRecursos").val("");
    $("#txtFechaVencimientoLineaCredito").val("");
    $("#txtNumRegEnRegUnicoDeObligYEmpLocal").val("");
    $("#txtNumRegDeObligEmpEntFedMunSHCP").val("");
    $("#txtNumRegEnRegistroPubPropiedadYComercio").val("");
    $("#txtNumRegUnicosDeGarantiasMobiliarias").val("");
    $("#txtPorcentajeParticFederalesComoFuentePagoCredito").val("");
    $("#txtDiferencialSobreTasaReferencia").val("");
    $("#txtFrecuenciaRevisionTasa").val("");
    $("#txtNumMesesGraciaParaAmortizarCapital").val("");
    $("#txtNumMesesGraciaPagoInterese").val("");
    $("#txtComisionAperturaCreditoTasa").val("");
    $("#txtComisionAperturaCreditoMonto").val("");
    $("#txtComisionDisposicionCreditoTasa").val("");
    $("#txtComisionDisposicionCreditoMonto").val("");
    $("#txtCostoAnualTotalMomentoOtorgamientoLineaCredCalculadaCAT").val("");
    $("#txtMontoCreditoSimpleOAutorizadoLineaCreditoSinAccesFinanci").val("");
    $("#txtMontoPrimasAnualesTodosSegurosObligConradosAcreditado").val("");

    $("#sltTipoAltaCredito").val("-1");
    $("#sltTipoProducto").val("-1");
    $("#sltTipoOperacion").val("-1");
    $("#sltDestinoDelCredito").val("-1");
    $("#sltMonedaDeLineaCredito").val("-1");
    $("#sltFormaDisposicion").val("-1");
    $("#sltLineaCreditoRevocableIrrevo").val("-1");
    $("#sltRestriccionLinea").val("-1");
    $("#sltPrelacionDePago").val("-1");
    $("#sltClaveInstitucionOAgenciaExteriorOtorganteRecursos").val("-1");
    $("#sltTasaDeInteres").val("-1");
    $("#sltOperacionDiferenciaSobreTasaReferencia").val("-1");
    $("#sltPeriodicidadPagoCapital").val("-1");
    $("#sltPeriodicidadPagoIntereses").val("-1");
    $("#sltGarantiaDeLeyFederal").val("-1");

    document.getElementById("txtNumeroLinea").style.border = "1px solid Gray";
    document.getElementById("txtIdClienteLinea").style.border = "1px solid Gray";
    document.getElementById("txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia").style.border = "1px solid Gray";
    document.getElementById("txtIdCreditoMetCNBV").style.border = "1px solid Gray";
    document.getElementById("txtIdCredLineaGrupalMultimonedaCNBV").style.border = "1px solid Gray";
    document.getElementById("txtMontoLineaCreditoAutorizado").style.border = "1px solid Gray";
    document.getElementById("txtFechaMaximaDisponerRecursos").style.border = "1px solid Gray";
    document.getElementById("txtFechaVencimientoLineaCredito").style.border = "1px solid Gray";
    document.getElementById("txtNumRegEnRegUnicoDeObligYEmpLocal").style.border = "1px solid Gray";
    document.getElementById("txtNumRegDeObligEmpEntFedMunSHCP").style.border = "1px solid Gray";
    document.getElementById("txtNumRegEnRegistroPubPropiedadYComercio").style.border = "1px solid Gray";
    document.getElementById("txtNumRegUnicosDeGarantiasMobiliarias").style.border = "1px solid Gray";
    document.getElementById("txtPorcentajeParticFederalesComoFuentePagoCredito").style.border = "1px solid Gray";
    document.getElementById("txtDiferencialSobreTasaReferencia").style.border = "1px solid Gray";
    document.getElementById("txtFrecuenciaRevisionTasa").style.border = "1px solid Gray";
    document.getElementById("txtNumMesesGraciaParaAmortizarCapital").style.border = "1px solid Gray";
    document.getElementById("txtNumMesesGraciaPagoInterese").style.border = "1px solid Gray";
    document.getElementById("txtComisionAperturaCreditoTasa").style.border = "1px solid Gray";
    document.getElementById("txtComisionAperturaCreditoMonto").style.border = "1px solid Gray";
    document.getElementById("txtComisionDisposicionCreditoTasa").style.border = "1px solid Gray";
    document.getElementById("txtComisionDisposicionCreditoMonto").style.border = "1px solid Gray";
    document.getElementById("txtCostoAnualTotalMomentoOtorgamientoLineaCredCalculadaCAT").style.border = "1px solid Gray";
    document.getElementById("txtMontoCreditoSimpleOAutorizadoLineaCreditoSinAccesFinanci").style.border = "1px solid Gray";
    document.getElementById("txtMontoPrimasAnualesTodosSegurosObligConradosAcreditado").style.border = "1px solid Gray";

    document.getElementById("sltTipoAltaCredito").style.border = "1px solid Gray";
    document.getElementById("sltTipoProducto").style.border = "1px solid Gray";
    document.getElementById("sltTipoOperacion").style.border = "1px solid Gray";
    document.getElementById("sltDestinoDelCredito").style.border = "1px solid Gray";
    document.getElementById("sltMonedaDeLineaCredito").style.border = "1px solid Gray";
    document.getElementById("sltFormaDisposicion").style.border = "1px solid Gray";
    document.getElementById("sltLineaCreditoRevocableIrrevo").style.border = "1px solid Gray";
    document.getElementById("sltRestriccionLinea").style.border = "1px solid Gray";
    document.getElementById("sltPrelacionDePago").style.border = "1px solid Gray";
    document.getElementById("sltClaveInstitucionOAgenciaExteriorOtorganteRecursos").style.border = "1px solid Gray";
    document.getElementById("sltTasaDeInteres").style.border = "1px solid Gray";
    document.getElementById("sltOperacionDiferenciaSobreTasaReferencia").style.border = "1px solid Gray";
    document.getElementById("sltPeriodicidadPagoCapital").style.border = "1px solid Gray";
    document.getElementById("sltPeriodicidadPagoIntereses").style.border = "1px solid Gray";
    document.getElementById("sltGarantiaDeLeyFederal").style.border = "1px solid Gray";
}

function EdicionLinea() {
    if (document.forms[0]["EditarLineaX"] == undefined) return;
    if ($('#Lineas').is("disabled") == false) {
        Waiting(true, "Espere por favor. Cargando Información...");

        var i = 0;
        for (i = 0; i < document.forms[0]["EditarLineaX"].length; i++) {
            if (document.forms[0]["EditarLineaX"][i].checked)
                break;
        }
        peticionAjax('ConsultaSIC.aspx/BuscarLineas', "POST", { opcion: 2, idCliente: document.forms[0]["EditarLineaX"][i].value }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d != "") {
                    Registro = obtenerArregloDeJSON(data.d, false);
                    $("#btnVerSP").attr("class", "classButton");
                    $("#btnVerSP").attr("disabled", false);

                    $("#txtNumeroLinea").attr("disabled", true);
                    $("#txtIdClienteLinea").attr("disabled", true);
                    $("#txtNumeroLinea").val(Registro[0].IdDelCréditoAsignadoPorLaInstitución);
                    $("#txtIdClienteLinea").val(Registro[0].IdAcred);
                    $("#sltTipoAltaCredito").val(Registro[0].TipoAltaCreditoId);
                    $("#sltTipoProducto").val(Registro[0].TipoDeProductoId);
                    $("#sltTipoOperacion").val(Registro[0].TipoDeOperaciónId);
                    $("#sltDestinoDelCredito").val(Registro[0].DestinoDelCréditoId);
                    $("#txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia").val(Registro[0].NumeroDeConsultaRealizadaALaSociedadDeInformaciónCrediticia);
                    $("#txtIdCreditoMetCNBV").val(Registro[0].IdDelCréditoAsignadoMetodologíaCnbv);
                    $("#txtIdCredLineaGrupalMultimonedaCNBV").val(Registro[0].IdCreditoLíneaGrupalOMultimonedaAsignadoMetodologíaCnbv);
                    $("#txtMontoLineaCreditoAutorizado").val(Registro[0].MontoDeLaLíneaDeCréditoAutorizado);
                    var fecha1 = Registro[0].FechaMáximaParaDisponerDeLosRecursos;
                    $("#txtFechaMaximaDisponerRecursos").val(fecha1.substring(6, 8) + "/" + fecha1.substring(4, 6) + "/" + fecha1.substring(0, 4));
                    var fecha2 = Registro[0].FechaVencimientoDeLaLíneaDeCrédito
                    $("#txtFechaVencimientoLineaCredito").val(fecha2.substring(6, 8) + "/" + fecha2.substring(4, 6) + "/" + fecha2.substring(0, 4));
                    $("#sltMonedaDeLineaCredito").val(Registro[0].MonedaDeLaLíneaDeCréditoId);
                    $("#sltFormaDisposicion").val(Registro[0].FormaDeLaDisposiciónId);
                    $("#sltLineaCreditoRevocableIrrevo").val(Registro[0].LíneaDeCréditoRevocableOIrrevocableId);
                    $("#sltRestriccionLinea").val(Registro[0].RestriccionDeLaLineaId);
                    $("#sltPrelacionDePago").val(Registro[0].PrelaciónDePago_CreditoPreferenteOSubordinadoId);
                    $("#txtNumRegEnRegUnicoDeObligYEmpLocal").val(Registro[0].NúmeroRegistroEnRegistroÚnicoDeObligYEmpréstLocal);
                    $("#txtNumRegDeObligEmpEntFedMunSHCP").val(Registro[0].NúmeroRegistroEnRegistroObligYEmpréstDeEntidadesFedYMunsDeLaShcp);
                    $("#txtNumRegEnRegistroPubPropiedadYComercio").val(Registro[0].NúmeroDeRegistroEnElRegistroPúblicoDeLaPropiedadYComercio);
                    $("#txtNumRegUnicosDeGarantiasMobiliarias").val(Registro[0].NúmeroDeRegistroÚnicoDeGarantíasMobiliarias);
                    $("#sltClaveInstitucionOAgenciaExteriorOtorganteRecursos").val(Registro[0].ClaveDeInstituOAgenciaOtorganteDeLosRecursosId);
                    $("#txtPorcentajeParticFederalesComoFuentePagoCredito").val(Registro[0].PjeDeParticipacionesFederalesComprometidasComoFuenteDePagoDelCrédito);
                    $("#sltTasaDeInteres").val(Registro[0].TasaDeInterésId);
                    $("#txtDiferencialSobreTasaReferencia").val(Registro[0].DiferencialSobreTasaDeReferencia);
                    $("#sltOperacionDiferenciaSobreTasaReferencia").val(Registro[0].OperaciónDiferencialSobreTasaReferenciaId);
                    $("#txtFrecuenciaRevisionTasa").val(Registro[0].FrecuenciaRevisiónTasa);
                    $("#sltPeriodicidadPagoCapital").val(Registro[0].PeriodicidadPagoDeCapitalId);
                    $("#sltPeriodicidadPagoIntereses").val(Registro[0].PeriodicidadPagoDeInteresesId);
                    $("#txtNumMesesGraciaParaAmortizarCapital").val(Registro[0].NumeroDeMesesDeGraciaParaAmortizarCapital);
                    $("#txtNumMesesGraciaPagoInterese").val(Registro[0].NumeroDeMesesDeGraciaParaPagoDeIntereses);
                    $("#txtComisionAperturaCreditoTasa").val(Registro[0].ComisiónDeAperturaDelCrédito_Tasa);
                    $("#txtComisionAperturaCreditoMonto").val(Registro[0].ComisiónDeAperturaDelCrédito_Monto);
                    $("#txtComisionDisposicionCreditoTasa").val(Registro[0].ComisiónPorDisposiciónDelCrédito_Tasa);
                    $("#txtComisionDisposicionCreditoMonto").val(Registro[0].ComisiónPorDisposiciónDelCrédito_Monto);
                    $("#txtCostoAnualTotalMomentoOtorgamientoLineaCredCalculadaCAT").val(Registro[0].CostoAnualTotalMomentoOtorgamientoLineaCredCalculadaCAT);
                    $("#txtMontoCreditoSimpleOAutorizadoLineaCreditoSinAccesFinanci").val(Registro[0].MontoCreditoSimpleOAutorizadoLineaCreditoSinAccesFinanci);
                    $("#txtMontoPrimasAnualesTodosSegurosObligConradosAcreditado").val(Registro[0].MontoPrimasAnualesTodosSegurosObligConradosAcreditado);
                    $("#sltGarantiaDeLeyFederal").val(Registro[0].GarantíaDeLeyFederalId);
                }
                else {
                    $("#btnVerSP").attr("class", "classButtonDis");
                    $("#btnVerSP").attr("disabled", true);
                }
            }
            else {
                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            }
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
        CambiarDiv('DatosLinea', 'LineasEncontradas', false, true);
    }
}

function GuardarDatosLinea() {
    if (NoVacioDatosLinea()) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var EditarOGuardar = '';

        if ($('#txtNumeroLinea').is(":disabled") == true)
            EditarOGuardar = 'Editar';
        else
            EditarOGuardar = 'Guardar';
        var parametrosGuardarLinea = {
            IdAcred: $("#txtIdClienteLinea").val(),
            IdDelCréditoAsignadoPorLaInstitución: $("#txtNumeroLinea").val(),
            NumeroDeConsultaRealizadaALaSociedadDeInformaciónCrediticia: $("#txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia").val(),
            TipoAltaCredito: $("#sltTipoAltaCredito").val(),
            TipoDeProducto: $("#sltTipoProducto").val(),
            TipoDeOperación: $("#sltTipoOperacion").val(),
            DestinoDelCrédito: $("#sltDestinoDelCredito").val(),
            IdDelCréditoAsignadoMetodologíaCnbv: $("#txtIdCreditoMetCNBV").val(),
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
            EditarOGuardar: EditarOGuardar
        };
        peticionAjax('ConsultaSIC.aspx/GuardarLinea', "POST", parametrosGuardarLinea, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    var HTML = '<span style="color:Green;;font-weight:bold">La Linea se ha guardado de forma correcta.</span><br /><br />';
                    HTML += '<table  id="LineasEncontradasNLS" class="dataGridDatos"><thead><tr><th >Numero de Linea</th ><th >Monto Autorizado</th ><th >Fecha Maxima de Vigencia</th ><th >Fecha Vencimiento Línea de Crédito</th ><th >Forma Disposición</th ><th ><input id="RadioEditarLinea" name="EditarLineaX" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
                    HTML += '<tr style="background: rgba(43, 182, 165, 0.52);" id="Linea' + $('#txtNumeroLinea').val() + '"><td >' + $('#txtNumeroLinea').val() + '</td><td >' + $('#txtMontoLineaCreditoAutorizado').val() + '</td><td >' + $('#txtFechaMaximaDisponerRecursos').val() + '</td><td >' + $('#txtFechaVencimientoLineaCredito').val() + '</td><td >' + document.getElementById('sltFormaDisposicion').options[document.getElementById('sltFormaDisposicion').selectedIndex].text + '</td><td ><input id="RadioEditarLinea" ';
                    HTML += 'checked="checked" ';
                    HTML += 'name="EditarLineaX" type="radio"  value="' + $('#txtNumeroLinea').val() + '" /></td></tr>';
                    HTML += '</tbody></table>';
                    $(TablaLineasEncontradas).html(HTML);
                    document.getElementById("LineasEncontradasNLS").style.width = "100%";
                    $('#EditarLinea').attr("disabled", false);
                    $('#VerDisposiciones').attr("disabled", false);
                    LimpiarDatosLinea();
                    CambiarDiv('LineasEncontradas', 'DatosLinea', false, true);
                }
            }
            else {
                $(TablaLineasEncontradas).html('<span style="color:Red;font-weight:bold">' + data.d + '.</span><br /><br />');
            }
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function NoVacioDatosLinea() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroLinea", "Número Linea de Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdClienteLinea", "Id Cliente"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoAltaCredito", "Tipo Alta del Crédito", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoProducto", "Tipo de Producto", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoOperacion", "Tipo de Operación", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltDestinoDelCredito", "Destino del Crédito", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia", "Numero De Consulta Realizada a la Sociedad de Información Crediticia"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdCreditoMetCNBV", "ID Crédito Asigando Met. CNBV"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdCredLineaGrupalMultimonedaCNBV", "ID Crédito Línea Grupal o Multimoneda Met.CNBV"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoLineaCreditoAutorizado", "Monto Línea de Crédito Autorizado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaMaximaDisponerRecursos", "Fecha Maxima para disponer recursos"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaVencimientoLineaCredito", "Fecha Vencimiento de la Línea de Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltMonedaDeLineaCredito", "Moneda de la Línea de Crédito", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltFormaDisposicion", "Forma de la Disposición", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltLineaCreditoRevocableIrrevo", "Linea de Crédito Revocable e Irrevocable", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltRestriccionLinea", "Restricción de la Línea", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltPrelacionDePago", "Prelación de Pago (Crédito Preferente o Subordinado)", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumRegEnRegUnicoDeObligYEmpLocal", "Num. Registros en el Registro Obligaciones y Emprestitos Local"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumRegDeObligEmpEntFedMunSHCP", "Num.Registros en Registro de Obligaciones y Emprestitos de Ent.Fed. y Mun. de SHCP"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumRegEnRegistroPubPropiedadYComercio", "Num. Registros en Registro Publico de Propiedad y Comercio"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumRegUnicosDeGarantiasMobiliarias", "Num. Registros Único de Garantias Mobiliarias"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltClaveInstitucionOAgenciaExteriorOtorganteRecursos", "Clave de la Institución o Agencia Del Exterior Otorgante de Recursos", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeParticFederalesComoFuentePagoCredito", "Porcentaje Participaciones Federales Como Fuente Pago del Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTasaDeInteres", "Tasa de Interés", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtDiferencialSobreTasaReferencia", "Diferencial sobre Tasa de Referencia"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltOperacionDiferenciaSobreTasaReferencia", "Operación de Diferencial sobre Tasa de Referencia", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFrecuenciaRevisionTasa", "Frecuencia Revisión Tasa"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltPeriodicidadPagoCapital", "Periodicidad Pago de Capital", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltPeriodicidadPagoIntereses", "Periodicidad Pago de Intereses", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumMesesGraciaParaAmortizarCapital", "Num. Meses de Gracia para Amortizar Capital"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumMesesGraciaPagoInterese", "Num. Meses de Gracia para Pago de Intereses"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtComisionAperturaCreditoTasa", "Comisión de Apertura del Crédito (Tasa)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtComisionAperturaCreditoMonto", "Comisión de Apertura del Crédito (Monto)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtComisionDisposicionCreditoTasa", "Comisión por Disposición del Crédito (Tasa)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtComisionDisposicionCreditoMonto", "Comisión por Disposición del Crédito (Monto)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtCostoAnualTotalMomentoOtorgamientoLineaCredCalculadaCAT", "Costo Anual Total en el Otorgamiento de la Línea de Credito Calculada por CAT"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoCreditoSimpleOAutorizadoLineaCreditoSinAccesFinanci", "Monto del Crédito Simple o Autorizado de la Línea de Crédito sin Accesorios Financieros"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoPrimasAnualesTodosSegurosObligConradosAcreditado", "Monto Primas Anuales de Todos los Seguros Obligatorios Cobrados al Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltGarantiaDeLeyFederal", "Garantía de Ley Federal", true); else return dispararReturn;
    return dispararReturn
}


///----------------------------------------------- DISPOSICIONES 
var verBtnEditDisposiciones = false;
function BuscarDisposiciones() {
    if (document.forms[0]["EditarLineaX"] == undefined)
        return;
    if (!$('#Lineas').is(":disabled")) {
        $('#BotonEditarDisposicion').attr("disabled", false);
        $('#BotonVerCortes').attr("disabled", false);
        $('#Lineas').attr("disabled", true);
        CambiarDiv('DivDisposicionesEncontradas', 'LineasEncontradas', false, false);
        var irel = 0;
        for (irel = 0; irel < document.forms[0]["EditarLineaX"].length; irel++) {
            if (document.forms[0]["EditarLineaX"][irel].checked)
                break;
        }
        $(DivDatosDisposicion).hide();
        verBtnEditDisposiciones = false;
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax('ConsultaSIC.aspx/BuscarDisposiciones', "POST", { opcion: 1, Linea: document.forms[0]["EditarLineaX"][irel].value }, function (data) {
            if (!data.d.startsWith('Error:')) {
                if (data.d != "") {
                    verBtnEditDisposiciones = false;
                    var HTML = '';
                    HTML = '<table id="DisposicionesEncontradasNDS" class="dataGridDatos" ><thead><tr id="CabeceraDisposiciones"><th >Numero de Disposición</th ><th >Fecha Disposición</th ><th >Fecha Vencimiento</th ><th >Moneda</th ><th >Proyecto Inversión Con Fuente de Pago</th ><th >Institución Banca Desarrollo Otorgó Fondeo</th ><th ><input id="RadioEditarDisposicion" name="EditarDisposicionX" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
                    Registros = obtenerArregloDeJSON(data.d, false);
                    for (var i = 0; i < Registros.length; i++) {
                        var Registro = Registros[i];

                        HTML += '<tr ' + (DeterminaSiNumParImpar(i) == "Par" ? 'style="background: rgba(43, 182, 165, 0.52);" ' : '') + 'id="Disposicion' + Registro.numeroDisposicion + '"><td >' + Registro.numeroDisposicion + '</td><td >' + Registro.fechaDisposicion + '</td><td >' + Registro.fechaVencimiento + '</td><td >' + Registro.MonedaDisposicion + '</td><td >' + Registro.ProyectoInv + '</td><td >' + Registro.InstBancaOtorgaFondeo + '</td><td ><input id="RadioEditarDisposicion" ';

                        if (Disposicion == '') {
                            if (i == 0)
                                HTML += 'checked="checked" ';
                        }
                        else {
                            if (Registro.numeroDisposicion == Disposicion)
                                HTML += 'checked="checked" ';
                        }
                        HTML += 'name="EditarDisposicionX" type="radio"  value="' + Registro.numeroDisposicion + '" /></td></tr>';
                    }
                    HTML += '</tbody></table>';

                    $(TablaDisposicionesEncontradas).html(HTML);
                    document.getElementById("DisposicionesEncontradasNDS").style.width = "100%";
                    Linea = '';
                    Disposicion = '';
                }
                else {
                    verBtnEditDisposiciones = true;
                    $(TablaDisposicionesEncontradas).html('<span style="font-weight:bold">No hay disposiciones para la linea seleccionada.</span>');
                }

                $('#BotonEditarDisposicion').attr("disabled", verBtnEditDisposiciones);
                $('#BotonEditarDisposicion').attr("class", (verBtnEditDisposiciones ? "classButtonDis" : "classButton"));
                $('#BotonVerCortes').attr("disabled", verBtnEditDisposiciones);
                $('#BotonVerCortes').attr("class", (verBtnEditDisposiciones ? "classButtonDis" : "classButton"));

                $('#DivCabeceraDisposiciones').attr("disabled", false);
                for (var Renglon = 0; Renglon < document.getElementById('LineasEncontradasNLS').rows.length; Renglon++) {
                    if (Renglon > 0) {
                        if (document.getElementById('LineasEncontradasNLS').rows[Renglon].cells[0].textContent != document.forms[0]["EditarLineaX"][irel].value) {
                            $(document.getElementById('Linea' + document.getElementById('LineasEncontradasNLS').rows[Renglon].cells[0].textContent)).hide();
                        }
                    }
                }
            }
            else
                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function FCancelarDisposicionesEncontradas() {
    if (document.getElementById('LineasEncontradasNLS') == null) return;
    if ($('DivDisposiciones').is(":disabled") == false) {
        CambiarDiv('LineasEncontradas', 'DivDisposicionesEncontradas', true, true);
        $('#Lineas').attr("disabled", false);
        for (var Renglon = 0; Renglon < document.getElementById('LineasEncontradasNLS').rows.length; Renglon++) {
            if (Renglon > 0) {
                $('#Linea' + document.getElementById('LineasEncontradasNLS').rows[Renglon].cells[0].textContent).show();
            }
        }
    }
}

function EdicionDisposicion() {
    if (document.forms[0]["EditarLineaX"] == undefined) return;
    if ($('#DivDisposiciones').is("disabled") == false) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var i = 0;
        for (i = 0; i < document.forms[0]["EditarDisposicionX"].length; i++) {
            if (document.forms[0]["EditarDisposicionX"][i].checked)
                break;
        }
        peticionAjax('ConsultaSIC.aspx/BuscarDisposiciones', "POST", { opcion: 2, Linea: document.forms[0]["EditarDisposicionX"][i].value }, function (data) {
            if (!data.d.startsWith('Error:')) {
                if (data.d != "") {
                    Registro = obtenerArregloDeJSON(data.d, false);
                    $('#txtIdDisposicion').val(Registro[0].numeroDisposicion);
                    $("#txtIdDisposicion").attr("disabled", true);
                    $('#txtNumeroLineaDisposicion').val(Registro[0].idLinea);
                    $('#sltCategoriaCredito').val(Registro[0].IdCategoriaCredito);
                    var fecha1 = Registro[0].fechaDisposicion;
                    $("#txtFechaDisposicionCredito").val(fecha1.substring(6, 8) + "/" + fecha1.substring(4, 6) + "/" + fecha1.substring(0, 4));
                    fecha1 = Registro[0].fechaVencimiento;
                    $("#txtFechaVencimientoDisp").val(fecha1.substring(6, 8) + "/" + fecha1.substring(4, 6) + "/" + fecha1.substring(0, 4));
                    $('#sltMonedaDispocion').val(Registro[0].idMonedaDisposicion);
                    $('#sltProyectoInversion').val(Registro[0].IdProyectoInv);
                    $('#txtMontoFondeo').val(Registro[0].MontoFondeado);
                    $('#sltInstitucionBancaDesFondoFon').val(Registro[0].idInstBancaOtorgaFondeo);
                    CambiarDiv('DivDatosDisposicion', 'DivDisposicionesEncontradas', false, true);
                }
            }
            else {
                $(TablaDisposicionesEncontradas).html('<span style="color:Red;font-weight:bold">' + data.d + '.</span><br /><br />');
            }
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function FCancelarDisposicion() {
    CambiarDiv('DivDisposicionesEncontradas', 'DivDatosDisposicion', false, true);
    LimpiarDatosDisposicion();
    $('#BotonEditarDisposicion').attr("disabled", verBtnEditDisposiciones);
    $('#BotonEditarDisposicion').attr("class", (verBtnEditDisposiciones ? "classButtonDis" : "classButton"));
    $('#BotonVerCortes').attr("disabled", verBtnEditDisposiciones);
    $('#BotonVerCortes').attr("class", (verBtnEditDisposiciones ? "classButtonDis" : "classButton"));
}

function FNuevaDisposicion() {
    if (document.forms[0]["EditarLineaX"] == undefined) return;
    if ($('#DivDisposiciones').is(":disabled") == false) {
        CambiarDiv('DivDatosDisposicion', 'DivDisposicionesEncontradas', false, true);
        var i = 0;
        for (i = 0; i < document.forms[0]["EditarLineaX"].length; i++) {
            if (document.forms[0]["EditarLineaX"][i].checked)
                break;
        }

        $('#txtNumeroLineaDisposicion').val(document.forms[0]["EditarLineaX"][i].value);
    }
    $("#txtIdDisposicion").attr("disabled", false);
}

function LimpiarDatosDisposicion() {
    $("#txtIdDisposicion").attr("disabled", false);
    $("#txtIdDisposicion").val("");
    $("#txtNumeroLineaDisposicion").val("");
    $("#txtFechaDisposicionCredito").val("");
    $("#txtFechaVencimientoDisp").val("");
    $("#txtMontoFondeo").val("");

    $("#sltCategoriaCredito").val("-1");
    $("#sltMonedaDispocion").val("-1");
    $("#sltProyectoInversion").val("-1");
    $("#sltInstitucionBancaDesFondoFon").val("-1");

    document.getElementById("txtIdDisposicion").style.border = "1px solid Gray";
    document.getElementById("txtNumeroLineaDisposicion").style.border = "1px solid Gray";
    document.getElementById("txtFechaDisposicionCredito").style.border = "1px solid Gray";
    document.getElementById("txtFechaVencimientoDisp").style.border = "1px solid Gray";
    document.getElementById("txtMontoFondeo").style.border = "1px solid Gray";
    document.getElementById("sltCategoriaCredito").style.border = "1px solid Gray";
    document.getElementById("sltMonedaDispocion").style.border = "1px solid Gray";
    document.getElementById("sltProyectoInversion").style.border = "1px solid Gray";
    document.getElementById("sltInstitucionBancaDesFondoFon").style.border = "1px solid Gray";
}

function GuardarDatosDisposicion() {
    if (NoVacioDatosDisposicion()) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var EditarOGuardar = '';
        if ($('#txtIdDisposicion').is(":disabled") == true)
            EditarOGuardar = 'Editar';
        else EditarOGuardar = 'Guardar';

        var parametrosGuardarDisposicion = {
            idLinea: $("#txtNumeroLineaDisposicion").val(),
            categoriaCredito: $("#sltCategoriaCredito").val(),
            fechaDisposicion: $("#txtFechaDisposicionCredito").val().split('/')[2] + $("#txtFechaDisposicionCredito").val().split('/')[1] + $("#txtFechaDisposicionCredito").val().split('/')[0],
            fechaVencimiento: $("#txtFechaVencimientoDisp").val().split('/')[2] + $("#txtFechaVencimientoDisp").val().split('/')[1] + $("#txtFechaVencimientoDisp").val().split('/')[0],
            monedaDisposicion: $("#sltMonedaDispocion").val(),
            numeroDisposicion: $("#txtIdDisposicion").val(),
            proyectoInversionFuentePag: $("#sltProyectoInversion").val(),
            montoFondeado: $("#txtMontoFondeo").val(),
            institucionBancaDesarrollo: $("#sltInstitucionBancaDesFondoFon").val(),
            EditarOGuardar: EditarOGuardar
        };
        peticionAjax('ConsultaSIC.aspx/GuardarDisposiciones', "POST", parametrosGuardarDisposicion, function (data) {
            if (!data.d.startsWith('Error:')) {
                if (data.d == "") {
                    var HTML = '<span style="color:Green;font-weight:bold">La disposición se ha guardado de forma correcta.</span><br /><br />';
                    HTML += '<table id="DisposicionesEncontradasNDS" class="dataGridDatos" ><thead><tr id="CabeceraDisposiciones"><th >Numero de Disposición</th ><th >Fecha Disposición</th ><th >Fecha Vencimiento</th ><th >Moneda</th ><th >Proyecto Inversión Con Fuente de Pago</th ><th >Institución Banca Desarrollo Otorgó Fondeo</th ><th ><input id="RadioEditarDisposicion" name="EditarDisposicionX" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
                    HTML += '<tr style="background: rgba(43, 182, 165, 0.52);" id="Disposicion' + $('#txtIdDisposicion').val() + '"><td >' + $('#txtIdDisposicion').val() + '</td><td >' + $('#txtFechaDisposicionCredito').val() + '</td><td >' + $('#txtFechaVencimientoDisp').val() + '</td><td >' + document.getElementById('sltMonedaDispocion').options[document.getElementById('sltMonedaDispocion').selectedIndex].text + '</td><td >' + document.getElementById('sltProyectoInversion').options[document.getElementById('sltProyectoInversion').selectedIndex].text + '</td><td >' + document.getElementById('sltInstitucionBancaDesFondoFon').options[document.getElementById('sltInstitucionBancaDesFondoFon').selectedIndex].text + '</td><td ><input id="RadioEditarDisposicion" ';
                    HTML += 'checked="checked" ';
                    HTML += 'name="EditarDisposicionX" type="radio"  value="' + $('#txtIdDisposicion').val() + '" /></td></tr>';
                    HTML += '</tbody></table>';
                    $(TablaDisposicionesEncontradas).html(HTML);
                    document.getElementById("DisposicionesEncontradasNDS").style.width = "100%";
                    $('#BotonEditarDisposicion').attr("disabled", false);
                    $('#BotonVerCortes').attr("disabled", false);
                    LimpiarDatosDisposicion();
                    CambiarDiv('DivDisposicionesEncontradas', 'DivDatosDisposicion', false, true);
                }
            }
            else {
                $(TablaDisposicionesEncontradas).html('<span style="color:Red;font-weight:bold">' + data.d + '.</span><br /><br />');
            }
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function NoVacioDatosDisposicion() {
    var dispararReturn = true;
    dispararReturn = VerficaCadenaVaciaCampo("txtIdDisposicion", "Número de Disposición");
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNumeroLineaDisposicion", "Número de Línea"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltCategoriaCredito", "Categoria del Crédito", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaDisposicionCredito", "Fecha Disposición del Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaVencimientoDisp", "Fecha Vencimiento de la Disposición"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltMonedaDispocion", "Moneda de la Disposición", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltProyectoInversion", "Proyecto de Inversión con Fuente de Paga Propia", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoFondeo", "Monto Fondeado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltInstitucionBancaDesFondoFon", "Institución Banca de Desarrollo o Fondo de Fomento que Otorgó Fondeo", true); else return dispararReturn;
    return dispararReturn;
}

function BuscarPorDisposicion() {
    peticionAjax('ConsultaSIC.aspx/BuscarPorDisposicion', "POST", { Disposicion: $('#FiltroBuscarCliente').val() }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                var Item = obtenerArregloDeJSON(data.d, false);
                $('#FiltroBuscarCliente').val(Item[0].idCliente);
                document.forms[0]["BuscarPor"][3].checked = true;
                Linea = Item[0].idLinea;
                Disposicion = Item[0].idDisposicion;
                BuscarCliente();
            }
            else {
                $('#ErrorBuscadorCliente').html('No hay resultados que mostrar, verifique sus criterios de busqueda.');
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        }
        else {
            $('#ErrorBuscadorCliente').html("No hay resultados que mostrar, verifique sus criterios de busqueda.");
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    }, null);
}

///////////////////////////////////////////////////////------------ PI
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
    LlenaArregloCamposAcargar(FiltroXTipoEmpresaGet, valorTipoEmpresaEdicionCliente, true, false);
    // }
    // else
    //   MostrarMsj("Seleccione una opción en el Campo" + ($("#sltTipoEmpresa").val() == "2" ? " Entidad Financiera Otorgante" : ($("#sltTipoEmpresa").val() == "3" ? " Atraso" : " Tamaño Ventas")), " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
}

var camposValoresPermitidos = "";
function LlenaArregloCamposAcargar(filtroAdicional, tipoEmpresa, cargarDatosPI, recargarFechaActual) {
    if (tipoEmpresa == -1) return;
    Waiting(true, "Espere por favor. Cargando Información...");
    var camposPI = "";
    peticionAjax('ConsultaSIC.aspx/ObtenerCamposVisiblesPI', "POST", { tipoEmpresa: tipoEmpresa, FiltroAdicional: filtroAdicional }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                arregloTipoCampoYDatoPI = new Array();
                var camposCargar = obtenerArregloDeJSON(data.d.split('%%&&')[0], false);
                camposPI = camposCargar[0]["fvcIdCampos"];
                var camposCargarAttr = obtenerArregloDeJSON(data.d.split('%%&&')[1], false);
                for (var i = 0; i < camposCargarAttr.length; i++)
                    arregloTipoCampoYDatoPI.push(camposCargarAttr[i]["id"] + "-" + camposCargarAttr[i]["tipoColumna"] + ";" + camposCargarAttr[i]["Tamaño"] + ";" + camposCargarAttr[i]["DescripcionColumna"] + ";" + camposCargarAttr[i]["nombreColumna"]);

                var camposCargarValoresPermitidos = obtenerArregloDeJSON(data.d.split('%%&&')[2], false);
                camposValoresPermitidos = camposCargarValoresPermitidos[0]["fvcCamposPI"]
                $("#DivDatosPI").html(GeneraTablaCamposPI(camposPI, tipoEmpresa));
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
    var cadena = '<table width="100%">';
    var numeroCampos = 0;
    for (var ii = 0; ii < camposPI.split(',').length; ii++) {
        cadena += numeroCampos == 0 ? "<tr>" : "";
        for (var iii = 0; iii < arregloTipoCampoYDatoPI.length; iii++) {
            if (camposPI.split(',')[ii] == arregloTipoCampoYDatoPI[iii].split('-')[0]) {
                cadena += '<td style="width: 22%; height: 43px;font-weight: bold;"> <span id="lblCampo' + arregloTipoCampoYDatoPI[iii].split('-')[0] + '">' + arregloTipoCampoYDatoPI[iii].split('-')[1].split(';')[2] + "</span><br />";
                if (arregloTipoCampoYDatoPI[iii].split('-')[1].split(';')[0] == "Combo") {
                    cadena += '<select id="sltCampo' + arregloTipoCampoYDatoPI[iii].split('-')[0] + '" ' + (arregloTipoCampoYDatoPI[iii].split('-')[0] == "144" || arregloTipoCampoYDatoPI[iii].split('-')[0] == "277" || arregloTipoCampoYDatoPI[iii].split('-')[0] == "290" ? ' onchange="SltFiltroAtrasoPI_Onchange(this.value);" ' : (arregloTipoCampoYDatoPI[iii].split('-')[0] == "3" ? ' onchange="TipoEmpresaPI_OnChange(this.value);" ' : '')) + ' style="width: 90%; font-size: x-small" tabindex="' + (ii + 1) + '"></select>';
                    arregloCatalogosACargarPI.push(arregloTipoCampoYDatoPI[iii].split('-')[0]);
                }
                if (arregloTipoCampoYDatoPI[iii].split('-')[1].split(';')[0] == "Input")
                    cadena += ' <input id="txtCampo' + arregloTipoCampoYDatoPI[iii].split('-')[0] + '" type="text" style="width: 90%; font-size: x-small" tabindex="' + (ii + 1) + '" maxlength="' + arregloTipoCampoYDatoPI[iii].split('-')[1].split(';')[1] + '"  onkeydown="return FilterInputNumAndAlfa (event,false,true)" ' + (arregloTipoCampoYDatoPI[iii].split('-')[0] == 4 ? 'disabled="disabled"' : '') + '/>';
                if (arregloTipoCampoYDatoPI[iii].split('-')[1].split(';')[0] == "InputF") {
                    cadena += '<input id="txtCampo' + arregloTipoCampoYDatoPI[iii].split('-')[0] + '" size="20" style="width: 80%; font-size: x-small" tabindex="' + (ii + 1) + '" type="text"  class="' + (arregloTipoCampoYDatoPI[iii].split('-')[0] == "289" ? 'CalendarioFC' : 'calendario') + '" maxlength="10" ' + (arregloTipoCampoYDatoPI[iii].split('-')[0] == "289" ? ' onchange="OnChangeFechasCorte(event,this)"' : ' onchange="changeFormatoFecha(event,this);" ') +
                    ' onkeyup="changeFormatoFecha(event,this);" onkeypress="if (event.keyCode==13) return false;"/>';
                }
                cadena += '</td>';

                arrayCamposACargarDatos.push((arregloTipoCampoYDatoPI[iii].split('-')[1].split(';')[0] != "Combo" ? "txtCampo" : "sltCampo") + arregloTipoCampoYDatoPI[iii].split('-')[0] + ";" + arregloTipoCampoYDatoPI[iii].split('-')[1].split(';')[3] + ";" + arregloTipoCampoYDatoPI[iii].split('-')[1].split(';')[2]);

                if (ii == 0)
                    campoFoco = (arregloTipoCampoYDatoPI[iii].split('-')[1].split(';')[0] != "Combo" ? "txtCampo" : "sltCampo") + arregloTipoCampoYDatoPI[iii].split('-')[0];
            }
        }
        numeroCampos++;
        if (ii == 3) {
            cadena += '<td style="width: 12%"><input id="btnGuardarPI" type="button" value="Guardar" onclick="GuardarDatosPI();" style="width: 100px; font-size: x-small; margin-top: 3px;" size="" class="classButton" tabindex="9" />';
            cadena += '<input id="btnCancelarPI" type="button" value="Regresar" style="width: 100px;font-size: x-small; margin-top: 3px;" size="" onclick="FCancelarPI();" class="classButton" tabindex="10" /> <br /></td>';
            cadena += '</tr>';
            numeroCampos = 0;
        }
        if (numeroCampos == 4) {
            cadena += '<td style="width: 12%; height: 43px;"></td></tr>';
            numeroCampos = 0;
        }
    }

    cadena += '</table>';
    return cadena;
}

function SltFiltroAtrasoPI_Onchange(value) {
    RecargarHtmlPorFiltroEspecial(value, $("#sltCampo3").val(), false)
}

function RecargarHtmlPorFiltroEspecial(valor, tipoEmpresa, recargarFechaActual) {
    var FiltroXTipoEmpresaGet = "";
    if (tipoEmpresa == "2")
        FiltroXTipoEmpresaGet = valor == "NO" ? "0" : "1";
    else if (tipoEmpresa == "3")
        FiltroXTipoEmpresaGet = valor;
    else
        FiltroXTipoEmpresaGet = valor == "111" ? "1" : "0";
    opcionAtrasoSelect = valor;
    fechaAtrasoSelect = $("#txtCampo289").val();
    tipoEmpresaAtrasoSelect = tipoEmpresa;
    LlenaArregloCamposAcargar(FiltroXTipoEmpresaGet, tipoEmpresa, false, recargarFechaActual);
}
var opcionAtrasoSelect = "";
var fechaAtrasoSelect = "";
var tipoEmpresaAtrasoSelect = "";
function CargarCatalogosPI(idArregloDeCarga, idAtraso, tipoEmpresa, cargarDatosPI, recargarFechaActual) {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.SicreNet.ConsultaSIC.ConsultaSIC.CargarCatalogodXTipoEmpresa(arregloCatalogosACargarPI[idArregloDeCarga], tipoEmpresa, idAtraso,
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
                    ObtenerDatosPI(fechaActual, false, recargarFechaActual);
                else if (ItemsPIBuscar != null) {
                    for (var i = 0; i < arrayCamposACargarDatos.length; i++) {
                        if (arrayCamposACargarDatos[i].split(';')[0] == "txtCampo150" || arrayCamposACargarDatos[i].split(';')[0] == "txtCampo151" || arrayCamposACargarDatos[i].split(';')[0] == "txtCampo289") {
                            var fecha1 = "";
                            if (arrayCamposACargarDatos[i].split(';')[0] == "txtCampo289") {
                                fecha1 = ItemsPIBuscar[0][arrayCamposACargarDatos[i].split(';')[1]];
                                $("#" + arrayCamposACargarDatos[i].split(';')[0]).val(fecha1.split('-')[2] + "/" + fecha1.split('-')[1] + "/" + fecha1.split('-')[0]);
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
                if (fechaCorteG != "" && fechaCorteG == fechaActual && recargarFechaActual) {
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
    RecargarCampoAtraso("sltCampo" + objetoAtraso, "lblCampo" + objetoAtraso, value);
}


function RecargarCampoAtraso(campo, lblAtraso, tipoEmpresa) {
    document.getElementById(campo).options.length = 0;
    var opcion = new Option("-- Seleccione una opción --", -1);
    document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
    document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "-- Seleccione una opción --";
    if (tipoEmpresa == "2") {
        $("#" + lblAtraso).html("Entidad Financiera Otorgante");
        var opcion = new Option("NO", "NO");
        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "NO";
        var opcion = new Option("SI", "SI");
        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "SI";
    }
    else if (tipoEmpresa == "3") {
        $("#" + lblAtraso).html("Atraso");
        var opcion = new Option("Sin Atraso", 0);
        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "Sin Atraso";
        var opcion = new Option("Con Atraso", 1);
        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "Con Atraso";
    }
    else if (tipoEmpresa != "-1") {
        $("#" + lblAtraso).html("Tamaño Ventas");
        var opcion = new Option("Pequeños corporativos", "111");
        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "Pequeños corporativos";
        var opcion = new Option("Corporativos", "112");
        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "Corporativos";
        var opcion = new Option("Grandes corporativos", "113");
        document.getElementById(campo).options[document.getElementById(campo).options.length] = opcion;
        document.getElementById(campo).options[document.getElementById(campo).options.length - 1].title = "Grandes corporativos";
    }
}

function FCancelarPI() {
    CambiarDiv('DatosCliente', 'DivDatosPI', false, true);
}

var ItemsPIBuscar = null;
var fechaCorteG = "";
function ObtenerDatosPI(fechaCorte, cargarCatalogos, recargarFechaActual) {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.SicreNet.ConsultaSIC.ConsultaSIC.CargarDatosPI($('#txtIdAcreditado').val(), fechaCorte.split('/')[2] + '-' + fechaCorte.split('/')[1] + '-' + fechaCorte.split('/')[0],
        function (response) {
            ItemsPIBuscar = null;
            var tipoEmpresa = "";
            var campoGet = "";
            if (response.value.indexOf("Error") == -1) {
                if (response.value != "") {
                    esEdicionPI = true;
                    ItemsPIBuscar = obtenerArregloDeJSON(response.value, false);
                    campoGet = (ItemsPIBuscar[0]["fvcTipoDeEmpresa"] == "2" ? "277" : (ItemsPIBuscar[0]["fvcTipoDeEmpresa"] == "3" ? "290" : "144"));
                    tipoEmpresa = ItemsPIBuscar[0]["fvcTipoDeEmpresa"];
                    if (!cargarCatalogos) {
                        for (var i = 0; i < arrayCamposACargarDatos.length; i++) {
                            if (arrayCamposACargarDatos[i].split(';')[0] == "txtCampo150" || arrayCamposACargarDatos[i].split(';')[0] == "txtCampo151" || arrayCamposACargarDatos[i].split(';')[0] == "txtCampo289") {
                                var fecha1 = "";
                                if (arrayCamposACargarDatos[i].split(';')[0] == "txtCampo289") {
                                    fecha1 = ItemsPIBuscar[0][arrayCamposACargarDatos[i].split(';')[1]];
                                    $("#" + arrayCamposACargarDatos[i].split(';')[0]).val(fecha1.split('-')[2] + "/" + fecha1.split('-')[1] + "/" + fecha1.split('-')[0]);
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
                }
                else {
                    LimpiarDatosPI();
                    esEdicionPI = false;
                    $("#txtCampo4").val($("#btnVerPI").attr("alt"));
                    if (fechaCorte == fechaActual) {
                        fechaCorteG = fechaCorte;
                        $("#txtCampo289").val(fechaActual);
                        RecargarCampoAtraso("sltCampo" + objetoAtraso, "lblCampo" + objetoAtraso, valorTipoEmpresaEdicionCliente);
                        if (recargarFechaActual)
                            RecargarHtmlPorFiltroEspecial(valorAtrasoEdicionCliente, valorTipoEmpresaEdicionCliente, recargarFechaActual);
                        campoGet == "" ? (valorTipoEmpresaEdicionCliente == "2" ? "277" : (valorTipoEmpresaEdicionCliente == "3" ? "290" : "144")) : campoGet;
                        $("#sltCampo" + objetoAtraso).val(valorAtrasoEdicionCliente);
                        $("#sltCampo" + objetoAtraso).attr("disabled", true);
                        $("#sltCampo3").val(valorTipoEmpresaEdicionCliente);
                        $("#sltCampo3").attr("disabled", true);
                    }
                }
            } else
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            if (fechaCorte == fechaActual) {
                $("#sltCampo" + campoGet).attr("disabled", true);
                $("#sltCampo3").attr("disabled", true);
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
            else if (!recargarFechaActual)
                setTimeout(terminarWait, 100);
        }
    );
}

function OnChangeFechasCorte(evt, obj) {
    var fechaDate = new Date(fechaActual.split('/')[2], fechaActual.split('/')[1], fechaActual.split('/')[0])
    var fechaSelect = new Date($(obj).val().split('/')[2], $(obj).val().split('/')[1], $(obj).val().split('/')[0])
    var recargarFechaActual = false;
    if (changeFormatoFecha(evt, obj)) {
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
        ObtenerDatosPI($(obj).val(), true, recargarFechaActual);
    }
}

var esEdicionPI = false;
function GuardarDatosPI() {
    if (NoVacioDatosPI()) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var parametros = {
            fvcIdDelAcreditadoAsignadoPorLaInstitución: $("#txtCampo4").val() != undefined ? replaceAll($("#txtCampo4").val(), ",", "") : "0",
            ClasificaciónPorTamañoDeVentasOIngresosNetosAnuales: $("#sltCampo144").val() != undefined ? $("#sltCampo144").val() : DeterminaValorPermitidoDeCampo("144"),
            PuntajeCrediticioTotal: $("#txtCampo145").val() != undefined ? replaceAll($("#txtCampo145").val(), ",", "") : "0", PuntajeCrediticioCuantitativo: $("#txtCampo146").val() != undefined ? replaceAll($("#txtCampo146").val(), ",", "") : "0",
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
            fnSaldoDeLaDeudaTotal: $("#txtCampo234").val() != undefined ? replaceAll($("#txtCampo234").val(), ",", "") : "0", fnSaldoDeLasParticipacionesElegibles: $("#txtCampo235").val() != undefined ? replaceAll($("#txtCampo235").val(), ",", "") : "0",
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
            fnPuntajeAsignadoPorConcentraciónDeActivos: $("#sltCampo273").val() != undefined ? $("#sltCampo273").val() : DeterminaValorPermitidoDeCampo("273"), fnPuntajeAsignadoPorCalidadDelGobiernoCorporativo: $("#txtCampo274").val() != undefined ? replaceAll($("#txtCampo274").val(), ",", "") : "0",
            fnPuntajeAsignadoPorAniosDeExperienciaDeLosFuncionariosEnLaAdministración: $("#txtCampo275").val() != undefined ? replaceAll($("#txtCampo275").val(), ",", "") : "0",
            fnPuntajeAsignadoPorExistenciaDePolíticasYProcedimientos: $("#txtCampo276").val() != undefined ? replaceAll($("#txtCampo276").val(), ",", "") : "0", fnPuntajeAsignadoPorROEBIS: $("#sltCampo278").val() != undefined ? $("#sltCampo278").val() : DeterminaValorPermitidoDeCampo("278"),
            FVCFechaCorte: $("#txtCampo289").val() != undefined ? $("#txtCampo289").val().split('/')[2] + '-' + $("#txtCampo289").val().split('/')[1] + '-' + $("#txtCampo289").val().split('/')[0] : "0",
            FIEsAtraso: $("#sltCampo290").val() != undefined ? $("#sltCampo290").val() : DeterminaValorPermitidoDeCampo("290"),
            fnEntidadFinancieraOtorganteASuVezDeCrédito: $("#sltCampo277").val() != undefined ? $("#sltCampo277").val() : DeterminaValorPermitidoDeCampo("277"),
            fvcTipoDeEmpresa: $("#sltCampo3").val() != undefined ? $("#sltCampo3").val() : DeterminaValorPermitidoDeCampo("sltCampo3"),
            opcion: esEdicionPI ? 1 : 0
        };
        peticionAjax('ConsultaSIC.aspx/GuardarPI', "POST", parametros, function (data) {
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
        if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo(arrayCamposACargarDatos[i].split(';')[0], arrayCamposACargarDatos[i].split(';')[2], (arrayCamposACargarDatos[i].split(';')[0].indexOf("slt") != -1 ? true : false)); else return dispararReturn;
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

///////////////////////////////////////////////////////------------ SP

function btnVerDatosSP(obj) {
    $("#txtFechaCorteSP").val(fechaActual);
    arrayCatalogos = new Array();
    arrayCatalogos.push("TipoEmpresa,sltTipoEmpresaSP");
    arrayCatalogos.push("TipoObligadoSolidOAval,sltTipoObligadoSolidarioAvalSP");
    arrayCatalogos.push("TipoGarante,sltTipoGaranteSP");
    arrayCatalogos.push("MonedaGarantiaPersonal,sltMonedaGarantiaPersonalSP");
    CargaCatalogosCliente(0, "DatosSP");
}

var esEdicionSP = false;
function CargarDatosSP(fechaCorte, DeshabilitarTE) {
    Waiting(true, "Espere por favor. Cargando Información...");
    CambiarDiv('divDatosSP', 'DatosLinea', false, true);
    $("#txtIdAcreditadoSP").val($("#txtIdClienteLinea").val());
    $("#txtIdCreditoAsignadoInstSP").val($("#txtNumeroLinea").val());
    DeshabilitarTE ? $("#sltTipoEmpresaSP").val($("#txtTipoEmpresaLinea").attr("alt")) : $("#sltTipoEmpresaSP").val("1");
    LimpiarDatosSP();
    $("#spErrorTE").html("");
    esEdicionSP = false;
    peticionAjax('ConsultaSIC.aspx/CargarDatosSP', "POST", { idCliente: $("#txtIdClienteLinea").val(), idLinea: $("#txtNumeroLinea").val(), fechaCorte: fechaCorte }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                esEdicionSP = true;
                var ItemsSPBuscar = obtenerArregloDeJSON(data.d, false);
                $("#txtFechaCorteSP").val(ItemsSPBuscar[0].fnFechaDelReporte.substring(6, 8) + "/" + ItemsSPBuscar[0].fnFechaDelReporte.substring(4, 6) + "/" + ItemsSPBuscar[0].fnFechaDelReporte.substring(0, 4));
                $("#txtIdAcreditadoSP").val(ItemsSPBuscar[0].fvcIdDelAcreditadoAsignadoPorLaInstitución);
                $("#sltTipoEmpresaSP").val(ItemsSPBuscar[0].fvcTipoDeEmpresa);
                if ($("#txtTipoEmpresaLinea").attr("alt") != ItemsSPBuscar[0].fvcTipoDeEmpresa) {
                    $("#spErrorTE").html("El Tipo Empresa 'Linea' (" + $("#txtTipoEmpresaLinea").attr("alt") + ") no coincide con el de 'SP' (" + ItemsSPBuscar[0].fvcTipoDeEmpresa + ") ");
                    $("#sltTipoEmpresaSP").val($("#txtTipoEmpresaLinea").attr("alt"));
                }

                $("#txtIdCreditoAsignadoInstSP").val(ItemsSPBuscar[0].fvcIdDelCréditoAsignadoPorLaInstitución);
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
        $("#sltTipoEmpresaSP").attr("disabled", (DeshabilitarTE ? true : false));
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function FCancelarSP() {
    CambiarDiv('DatosLinea', 'divDatosSP', false, true);
}

function OnChangeFechaSP(evt, obj) {
    var fechaDate = new Date(fechaActual.split('/')[2], fechaActual.split('/')[1], fechaActual.split('/')[0])
    var fechaSelect = new Date($(obj).val().split('/')[2], $(obj).val().split('/')[1], $(obj).val().split('/')[0])
    var DeshabilitarTE = false;
    if (changeFormatoFecha(evt, obj)) {
        if (fechaSelect < fechaDate) DeshabilitarTE = false;
        else DeshabilitarTE = true;
        CargarDatosSP($(obj).val().split('/')[2] + $(obj).val().split('/')[1] + $(obj).val().split('/')[0], DeshabilitarTE);
    }
}

function LimpiarDatosSP() {
    BorrarDatosCampo("sltTipoEmpresaSP", "1");
    BorrarDatosCampo("txtPorcentajeNoCubiertoCreditoSP", "");
    BorrarDatosCampo("txtSeveridadDPerdidaSP", "");
    BorrarDatosCampo("txtExposiciónIncumplimientoGarantiaSP", "");
    BorrarDatosCampo("txtProbabilidadIncumpAcreditadSP", "");
    BorrarDatosCampo("txtNoGarantiasRealFinanSP", "");
    BorrarDatosCampo("txtPorcentajeCoberGarantRealFinanSP", "");
    BorrarDatosCampo("txtValorContableGarantrealFinanSP", "");
    BorrarDatosCampo("txtFactorAjusteHESP", "");
    BorrarDatosCampo("txtFactorAjusteHfxSP", "");
    BorrarDatosCampo("txtFactorAjusteHCSP", "");
    BorrarDatosCampo("txtValorContableGarantrealFinanSP", "");
    BorrarDatosCampo("txtSeveridadPerdidaGRFSP", "");
    BorrarDatosCampo("txtExposicionIncumpGarantiasRealSP", "");
    BorrarDatosCampo("txtNoGarantiasRealesNoFinanSP", "");
    BorrarDatosCampo("txtPorcenCoberturaGaranRealNoFinanSP", "");
    BorrarDatosCampo("txtValorGarantiaDerechoCobroSP", "");
    BorrarDatosCampo("txtValorGarantiaBienesInmueblesSP", "");
    BorrarDatosCampo("txtValorGarantiaBienesMueblesSP", "");
    BorrarDatosCampo("txtValorGaranFideGarantAdmonPartFedAportFedSP", "");
    BorrarDatosCampo("txtValorGarantFideicomisoGatantAdmonIngPropFuentPagSP", "");
    BorrarDatosCampo("txtValorGarantiaOtrasRealesNoFinanSP", "");
    BorrarDatosCampo("txtSeveridadPerdidaAjustadaDerechosCobroSP", "");
    BorrarDatosCampo("txtSeveridadPerdidaAjustadaBienesInmueblesSP", "");
    BorrarDatosCampo("txtSeveridadPerdidaAjustadaBienesMueblesSP", "");
    BorrarDatosCampo("txtSeveridadPerdidaFideGarantAdmonPartFedAportFedSP", "");
    BorrarDatosCampo("txtSeveridadPerdidaFideGarantAdmonIngPropFuentPagSP", "");
    BorrarDatosCampo("txtSeveridadPerdidaAjustOtrasGarantRealesNoFinanSP", "");
    BorrarDatosCampo("txtTotalSeveridadPerdidaGarantRealesNFinanSP", "");
    BorrarDatosCampo("txtNoGarantRealesPersonalDerivadoCreditoSP", "");
    BorrarDatosCampo("txtPorcentajCubiertoGarantPersonSP", "");
    BorrarDatosCampo("txtNombreObligadoSolidarioAvalSP", "");
    BorrarDatosCampo("txtPorcentajeCubObligadoSolidDistEntFedMunSP", "");
    BorrarDatosCampo("sltTipoObligadoSolidarioAvalSP", "-1");
    BorrarDatosCampo("txtRFCObligadoSolidaAvalSP", "");
    BorrarDatosCampo("sltTipoGaranteSP", "-1");
    BorrarDatosCampo("txtProbabilidadIncumplientoGaranteSP", "");
    BorrarDatosCampo("txtValuacionMercadoDerivadoCreditoSP", "");
    BorrarDatosCampo("sltMonedaGarantiaPersonalSP", "-1");
    BorrarDatosCampo("txtNombreGaranteECPMSP", "");
    BorrarDatosCampo("txtNombreGarantePPSP", "");
    BorrarDatosCampo("txtPorcentajeCubEsquemaPasoMediaSP", "");
    BorrarDatosCampo("txtPorcentajeCubEsquemaPrimPerdiSP", "");
    BorrarDatosCampo("txtMontoCubEsquemaPrimPerdidasSP", "");
}

function BorrarDatosCampo(campo, valor) {
    $("#" + campo).val(valor);
    document.getElementById(campo).style.border = "1px solid Gray";
}

function NoVacioDatosSP() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaCorteSP", "Fecha Corte"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdAcreditadoSP", "ID Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoEmpresaSP", "Tipo de Empresa", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdCreditoAsignadoInstSP", "Número de Línea de Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeNoCubiertoCreditoSP", "Porcentaje No Cubierto del Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadDPerdidaSP", "Severidad de la Pérdida"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposiciónIncumplimientoGarantiaSP", "Exposición al Incumplimineto Sin Garantía"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbabilidadIncumpAcreditadSP", "Probabilidad Incumplimiento del Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNoGarantiasRealFinanSP", "No. Garantias Reales Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFactorAjusteHESP", "Factor Ajuste (HE)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFactorAjusteHfxSP", "Factor Ajuste (Hfx)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFactorAjusteHCSP", "Factor Ajuste (HC)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorContableGarantrealFinanSP", "Valor Contable Garantía Real Financiera"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaGRFSP", "Severidad de Pérdida Ajustada por Garantías Reales Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposicionIncumpGarantiasRealSP", "Exposición Incumplimiento Ajustada por Garantías Reales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNoGarantiasRealesNoFinanSP", "No. Garantías Reales No Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcenCoberturaGaranRealNoFinanSP", "Porcentaje Cobertura Garantía Real No Financiera"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGarantiaDerechoCobroSP", "Valor Garantía Con Derechos de Cobro"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGarantiaBienesInmueblesSP", "Valor Garantía Con Bienes Inmuebles"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGarantiaBienesMueblesSP", "Valor Garantía Con Bienes Muebles"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGaranFideGarantAdmonPartFedAportFedSP", "Valor Garantía Fideicomiso de Garantía y Admón con Part. Fed. y Aport. Fed como Fuente Pago"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGarantFideicomisoGatantAdmonIngPropFuentPagSP", "Valor Garantía con Fideicomiso de Garantía y Admón Ingresos Propios Fuente Pago"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValorGarantiaOtrasRealesNoFinanSP", "Valor Garantía con Otras Garantías Reales No Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaAjustadaDerechosCobroSP", "Severidad de Pérdida Ajustada por Derechos Cobro"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaAjustadaBienesInmueblesSP", "Severidad de Pérdida Ajustada por Bienes Inmuebles"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaAjustadaBienesMueblesSP", "Severidad de Pérdida Ajustada Con Bienes Muebles"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaFideGarantAdmonPartFedAportFedSP", "Severidad de Pérdida Ajustada por Fideicomiso de Garantía y Admón con Part. Fed.y Aport. Fed como Fuente Pago"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaFideGarantAdmonIngPropFuentPagSP", "Severidad de Pérdida Ajustada por Fideicomiso de Garantía y Admón Ingresos Propios Fuente Pago"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaAjustOtrasGarantRealesNoFinanSP", "Severidad de Pérdida Ajustada con Otras Garantías Reales No Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtTotalSeveridadPerdidaGarantRealesNFinanSP", "Total Severidad de Pérdida por Garantías Reales No Financieras"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNoGarantRealesPersonalDerivadoCreditoSP", "No. Garantías Reales Personal y Derivados de Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajCubiertoGarantPersonSP", "Porcentaje Cubierto con Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNombreObligadoSolidarioAvalSP", "Nombre del Obligado Solidario o Aval"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeCubObligadoSolidDistEntFedMunSP", "Porcentaje Cubierto por Obligado Solidario Distinto a Entidad Fed. y Mun."); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoObligadoSolidarioAvalSP", "Tipo del Obligado Solidario o Aval", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtRFCObligadoSolidaAvalSP", "RFC del Obligado Solidario o Aval"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoGaranteSP", "Tipo de Garante", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbabilidadIncumplientoGaranteSP", "Probabilidad de incumplimiento del Garante"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtValuacionMercadoDerivadoCreditoSP", "Valuación a Mercado del Derivado de Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltMonedaGarantiaPersonalSP", "Moneda de la Garantía Personal", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNombreGaranteECPMSP", "Nombre del Garante ECPM"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNombreGarantePPSP", "Nombre del Garante PP"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeCubEsquemaPasoMediaSP", "Porcentaje Cubierto por Esquemas de Paso y Media"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtPorcentajeCubEsquemaPrimPerdiSP", "Porcentaje Cubierto por Esquemas de Primeras Pérdidas"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoCubEsquemaPrimPerdidasSP", "Monto Cubierto por Esquemas de Primeras Pérdidas"); else return dispararReturn;
    return dispararReturn;
}

function GuardarDatosSP() {
    if (NoVacioDatosSP()) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var parametros = {
            fnFechaDelReporte: $("#txtFechaCorteSP").val().split('/')[2] + $("#txtFechaCorteSP").val().split('/')[1] + $("#txtFechaCorteSP").val().split('/')[0],
            fvcIdDelAcreditadoAsignadoPorLaInstitución: $("#txtIdAcreditadoSP").val(),
            fvcIdDelCréditoAsignadoPorLaInstitución: $("#txtIdCreditoAsignadoInstSP").val(),
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
        peticionAjax('ConsultaSIC.aspx/GuardarSP', "POST", parametros, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    MostrarMsj("Información almacenada exitosamente.", " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
                    CambiarDiv('DatosLinea', 'divDatosSP', false, true);
                }
            }
            else MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}


//////////////////////------------CORTES

function BucarCortes() {
    arrayCatalogos = new Array();
    arrayCatalogos.push("TipoEmpresa,sltTipoEmpresaCT");
    arrayCatalogos.push("EstatusSIC,sltEstatusSICCT");
    arrayCatalogos.push("LineaDispuesta,sltLineaDispuestaONoDispCT");
    arrayCatalogos.push("SituacionCredito,sltSituaciónCredito");
    arrayCatalogos.push("GradoRiesgo,sltGradoRiesgo");
    arrayCatalogos.push("TipoBajaCredito,sltTipoBajaCredito");
    CargaCatalogosCliente(0, "DatosCorte");
}

var verBtnEditCortes = false;
function BuscarCortesXFecha(fechaCorte) {
    verBtnEditCortes = false;
    if (document.forms[0]["EditarDisposicionX"] == undefined) return;
    Waiting(true, "Espere por favor. Cargando Información...");
    $('#btnEditarCorte').attr("disabled", false);
    $('#btnEditarCorte').attr("class", "classButton");
    $('#DivDisposiciones').attr("disabled", true);

    var ired = 0;
    for (ired = 0; ired < document.forms[0]["EditarDisposicionX"].length; ired++) {
        if (document.forms[0]["EditarDisposicionX"][ired].checked)
            break;
    }
    $(DivDatosCorte).hide();
    peticionAjax('ConsultaSIC.aspx/BuscarCortesXDisposicion', "POST", { disposicion: document.forms[0]["EditarDisposicionX"][ired].value, fecha: fechaCorte }, function (data) {
        CambiarDiv('DivCortesEncontrados', 'DivDisposicionesEncontradas', false, false);
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                var HTML = '';
                HTML = '<table id="tblCortesFind" class="dataGridDatos"><thead><tr><th >Fecha Corte</th ><th >Tasa Interés Bruta</th ><th >Saldo Principal al Final Per.</th ><th >Responsabilidad Total Final Per.</th ><th >Reservas Totales</th ><th ><input id="RadioEditarCorte" name="EditarCorteX" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
                Registros = obtenerArregloDeJSON(data.d, false);
                for (var i = 0; i < Registros.length; i++) {
                    var Registro = Registros[i];
                    var fechaCorteGet = Registro.fnFechaDelReporte;
                    HTML += '<tr ' + (DeterminaSiNumParImpar(i) == "Par" ? 'style="background: rgba(43, 182, 165, 0.52);" ' : '') + '><td>' + fechaCorteGet.substring(6, 8) + "/" + fechaCorteGet.substring(4, 6) + "/" + fechaCorteGet.substring(0, 4) + '</td><td style="padding-right: 10; text-align:right;" >' + Registro.fnTasaInterésBrutaPeriodo + '</td><td style="padding-right: 10; text-align:right;">' + Registro.fnSaldoDelPrincipalAlFinalDelPeriodo + '</td><td style="padding-right: 10; text-align:right;">' + Registro.fnResponsabilidadTotalAlFinalDelPeriodo + '</td><td style="padding-right: 10; text-align:right;">' + Registro.fnReservasTotales + '</td><td ><input id="RadioEditarCorte" ';
                    if (i == 0)
                        HTML += 'checked="checked" ';
                    HTML += 'name="EditarCorteX" type="radio"  value="' + Registro.fnFechaDelReporte + '%%&&' + Registro.FVCNumeroDeDisposicion + '" /></td></tr>';
                }
                HTML += '</tbody></table>';
                $(TablaCortesEncontrados).html(HTML);
                document.getElementById("tblCortesFind").style.width = "100%";
                verBtnEditCortes = false;
            }
            else {
                $(TablaCortesEncontrados).html('<span style="color:Black;font-weight:bold">No hay Cortes para la disposición seleccionada.</span>');
                verBtnEditCortes = true;
            }
            $('#btnEditarCorte').attr("disabled", verBtnEditCortes);
            $('#btnEditarCorte').attr("class", (verBtnEditCortes ? "classButtonDis" : "classButton"));

            for (var Renglon = 0; Renglon < document.getElementById('DisposicionesEncontradasNDS').rows.length; Renglon++) {
                if (Renglon > 0) {
                    if (document.getElementById('DisposicionesEncontradasNDS').rows[Renglon].cells[0].textContent != document.forms[0]["EditarDisposicionX"][ired].value) {
                        $('#Disposicion' + document.getElementById('DisposicionesEncontradasNDS').rows[Renglon].cells[0].textContent).hide();
                    }
                }
            }
        }
        else {
            $(TablaCortesEncontrados).html('<span style="color:Red;font-weight:bold">' + data.d + '.</span><br /><br />');
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function txtFechaCorteEncontrados_OnChange(evt, obj) {
    if (changeFormatoFecha(evt, obj))
        BuscarCortesXFecha($(obj).val().split('/')[2] + $(obj).val().split('/')[1] + $(obj).val().split('/')[0]);
}

function btnCancelarCorte_Click() {
    if (document.getElementById('DisposicionesEncontradasNDS') == null) return;
    if ($('DivCortes').is(":disabled") == false) {
        CambiarDiv('DivDisposicionesEncontradas', 'DivCortesEncontrados', true, true);
        $('#DivDisposiciones').attr("disabled", false);
        if (document.getElementById('DisposicionesEncontradasNDS') != null) {
            for (var Renglon = 0; Renglon < document.getElementById('DisposicionesEncontradasNDS').rows.length; Renglon++) {
                if (Renglon > 0) {
                    $('#Disposicion' + document.getElementById('DisposicionesEncontradasNDS').rows[Renglon].cells[0].textContent).show();
                }
            }
        }
    }
}

function btnNuevoCorte_Click() {
    if (document.forms[0]["EditarDisposicionX"] == undefined) return;
    if ($('#DivCortes').attr("disabled", false)) {
        CambiarDiv('DivDatosCorte', 'DivCortesEncontrados', false, true);
        var i = 0;
        for (i = 0; i < document.forms[0]["EditarDisposicionX"].length; i++) {
            if (document.forms[0]["EditarDisposicionX"][i].checked)
                break;
        }
        $('#txtNoDisposicionCT').val(document.forms[0]["EditarDisposicionX"][i].value);
        $('#txtIdCreditoAsignadoInstCT').val(document.forms[0]["EditarLineaX"][i].value);
    }
    $('#txtFechaReporteCT').attr("disabled", false);
    $('#txtFechaReporteCT').next().attr("disabled", false);
    esEdicionCorte = false;

}

function FCancelarCorte() {
    CambiarDiv('DivCortesEncontrados', 'DivDatosCorte', false, true);
    LimpiarDatosCorte();
    $('#btnEditarCorte').attr("disabled", verBtnEditCortes);
    $('#btnEditarCorte').attr("class", (verBtnEditCortes ? "classButtonDis" : "classButton"));
}

var esEdicionCorte = false;
function btnEditarCorte_Click() {
    if (document.forms[0]["EditarCorteX"] == undefined) return;
    Waiting(true, "Espere por favor. Cargando Información...");
    var i = 0;
    for (i = 0; i < document.forms[0]["EditarCorteX"].length; i++) {
        if (document.forms[0]["EditarCorteX"][i].checked)
            break;
    }
    $('#txtNoDisposicionCT').val(document.forms[0]["EditarDisposicionX"][i].value);
    $('#txtIdCreditoAsignadoInstCT').val(document.forms[0]["EditarLineaX"][i].value);
    esEdicionCorte = false;
    peticionAjax('ConsultaSIC.aspx/BuscarCortesXDisposicion', "POST", { disposicion: document.forms[0]["EditarCorteX"][i].value.split('%%&&')[1], fecha: document.forms[0]["EditarCorteX"][i].value.split('%%&&')[0] }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                esEdicionCorte = true;
                Registro = obtenerArregloDeJSON(data.d, false);
                var fecha1 = Registro[0].fnFechaDelReporte;
                $("#txtFechaReporteCT").val(fecha1.substring(6, 8) + "/" + fecha1.substring(4, 6) + "/" + fecha1.substring(0, 4));
                $('#txtFechaReporteCT').attr("disabled", true);
                $('#txtFechaReporteCT').next().attr("disabled", true);
                $('#txtIdCreditoAsignadoInstCT').val(Registro[0].fvcIdDelCréditoAsignadoPorLaInstitución);
                $('#txtNoDisposicionCT').val(Registro[0].FVCNumeroDeDisposicion);
                $('#sltEstatusSICCT').val(Registro[0].fvcEstatusSic);
                $('#sltTipoEmpresaCT').val(Registro[0].fvcTipoDeEmpresa);
                $('#sltLineaDispuestaONoDispCT').val(Registro[0].fnLineaDispuestaONoDispuesta);
                $('#txtTasaInteresBrutaPeriodoCT').val(Registro[0].fnTasaInterésBrutaPeriodo);
                $('#txtMontoDispuestoMesCT').val(Registro[0].FNMontoDispuestoDeLaLineaDeCréditoEnElMes);
                $('#txtMontoPagoExigibleAcreditadoEnPeriodo').val(Registro[0].fnMontoDelPagoExigibleAlAcreditadoEnElPeriodo_IncluyeCapitalInteresesYComisiones);
                $('#txtMontoCapitalPagadoEfecXAcredEnPeriodo').val(Registro[0].fnMontoDeCapitalPagadoEfectivamentePorElAcreditadoEnElPeriodo);
                $('#txtMontInteresesPagEfecXAcredEnPeriodo').val(Registro[0].fnMontoDeInteresesPagadosEfectivamentePorElAcreditadoEnElPeriodo);
                $('#txtMontComisionPagEfecXAcredEnPeriodo').val(Registro[0].fnMontoDeComisionesPagadasEfectivamentePorElAcreditadoEnElPeriodo);
                $('#txtMontInteresesMoraYOtrosAccPagEfecXAcredEnPeriodo').val(Registro[0].fnMontoDeInteresesMoratoriosYOtrosAccesoriosPagadosEfectivamentePorElAcreditadoEnElPeriodo);
                $('#txtMontoBonificadoInstFinanc').val(Registro[0].fnMontoBonificadoPorLaInstitucionFinanciera);
                $('#txtSaldoDelPrincipFinalPeriodo').val(Registro[0].fnSaldoDelPrincipalAlFinalDelPeriodo);
                $('#txtSaldoBaseCalculoInteresesFechaCortCred').val(Registro[0].fnSaldoBaseParaElCálculoDeInteresesALaFechaDeCorteDelCrédito);
                $('#txtInteresesResultAplicarTasaASaldoBase').val(Registro[0].fnInteresesResultantesDeAplicarLaTasaAlSaldoBase);
                $('#txtResponsabilidadTotalFinalPeriodo').val(Registro[0].fnResponsabilidadTotalAlFinalDelPeriodo);
                $('#sltSituaciónCredito').val(Registro[0].fnSituacionDelCrédito);
                $('#txtNoDiasVencidos').val(Registro[0].fnNúmeroDeDiasVencidos);
                fecha1 = Registro[0].fnFechaDelUltimoPagoCompletoExigibleRealizadoPorElAcreditado;
                $("#txtFechaUltimoPAgCompExigRealAcred").val(fecha1.substring(6, 8) + "/" + fecha1.substring(4, 6) + "/" + fecha1.substring(0, 4));
                $('#txtReservasTotales').val(Registro[0].fnReservasTotales);
                $('#txtReservasCubiertaGarantPerson').val(Registro[0].fnReservasParteCubiertaPorGarantiasPersonales);
                $('#txtReservasNoCubiertaGarantPerson').val(Registro[0].fnReservasParteNoCubiertaPorGarantiasPersonales);
                $('#txtSeveridadPerdidaTotal').val(Registro[0].fnSeveridadDeLaPerdidaTotal);
                $('#txtSeveridadPerdidadParteCubiertaGarantPerson').val(Registro[0].fnSeveridadDeLaPerdidaParteCubiertaPorGarantiasPesonales);
                $('#txtSeveridadPerdidadParteNoCubiertaGarantPerson').val(Registro[0].fnSeveridadDeLaPerdidaParteNoCubiertaPorGarantiasPesonales);
                $('#txtExposicionIncumplimiento').val(Registro[0].fnExposicionAlIncumplimiento);
                $('#txtExposicionIncumpParteCubGarantPerson').val(Registro[0].fnExposicionAlIncumplimientoParteCubiertaPorGarantiasPesonales);
                $('#txtExposicionIncumpParteNoCubGarantPerson').val(Registro[0].fnExposicionAlIncumplimientoParteNoCubiertaPorGarantiasPesonales);
                $('#txtProbabilidadIncumplientoTotal').val(Registro[0].fnProbabilidadDeIncumplimientoTotal);
                $('#txtProbabIncumParteCubGarantPerson').val(Registro[0].fnProbabilidadDeIncumplimientoParteCubiertaPorGarantiasPersonales);
                $('#txtProbabIncumParteNoCubGarantPerson').val(Registro[0].fnProbabilidadDeIncumplimientoParteNoCubiertaPorGarantiasPersonales);
                $('#sltGradoRiesgo').val(Registro[0].fvcGradoDeRiesgo);
                $('#txtReservasTotalesMetInt').val(Registro[0].fnReservasTotales_MetodologiaInterna);
                $('#txtSeveridadPerdidaMetInt').val(Registro[0].fnSeveridadDeLaPerdida_MetodologiaInterna);
                $('#txtExposicionIncumpMetInt').val(Registro[0].fnExposicionAlIncumplimiento_MetodologiaInterna);
                $('#txtProbIncumMetInt').val(Registro[0].fnProbabilidadDeIncumplimiento_MetodologiaInterna);
                $('#sltTipoBajaCredito').val(Registro[0].fnTipoBajaCredito);
                $('#txtSaldoPrinAlIncPeriod').val(Registro[0].fnSaldoDelPrincipalAlInicioDelPeriodo);
                $('#txtRespTotalInicioPerio').val(Registro[0].fnResponsabilidadTotalAlInicioDelPeriodo);
                $('#txtMontoTotalPagEfecXAcredEnPer').val(Registro[0].fnMontoTotalPagadoEfectivamentePorElAcreditadoEnElPeriodo);
                $('#txtMontorecQuitasCastQuebra').val(Registro[0].fnMontoReconocidoPorQuitas_CastigosYQuebrantos);
                $('#txtMontoRecBoniYDesc').val(Registro[0].fnMontoReconocidoPorBonificacionesYDescuentos);
                CambiarDiv('DivDatosCorte', 'DivCortesEncontrados', false, true);
            }
            else esEdicionCorte = false;
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function LimpiarDatosCorte() {
    BorrarDatosCampo("txtFechaReporteCT", "");
    BorrarDatosCampo("txtIdCreditoAsignadoInstCT", "");
    BorrarDatosCampo("txtNoDisposicionCT", "");
    BorrarDatosCampo("sltEstatusSICCT", "-1");
    BorrarDatosCampo("sltTipoEmpresaCT", "1");
    BorrarDatosCampo("sltLineaDispuestaONoDispCT", "-1");
    BorrarDatosCampo("txtTasaInteresBrutaPeriodoCT", "");
    BorrarDatosCampo("txtMontoDispuestoMesCT", "");
    BorrarDatosCampo("txtMontoPagoExigibleAcreditadoEnPeriodo", "");
    BorrarDatosCampo("txtMontoCapitalPagadoEfecXAcredEnPeriodo", "");
    BorrarDatosCampo("txtMontInteresesPagEfecXAcredEnPeriodo", "");
    BorrarDatosCampo("txtMontComisionPagEfecXAcredEnPeriodo", "");
    BorrarDatosCampo("txtMontInteresesMoraYOtrosAccPagEfecXAcredEnPeriodo", "");
    BorrarDatosCampo("txtMontoBonificadoInstFinanc", "");
    BorrarDatosCampo("txtSaldoDelPrincipFinalPeriodo", "");
    BorrarDatosCampo("txtSaldoBaseCalculoInteresesFechaCortCred", "");
    BorrarDatosCampo("txtInteresesResultAplicarTasaASaldoBase", "");
    BorrarDatosCampo("txtResponsabilidadTotalFinalPeriodo", "");
    BorrarDatosCampo("sltSituaciónCredito", "-1");
    BorrarDatosCampo("txtNoDiasVencidos", "");
    BorrarDatosCampo("txtFechaUltimoPAgCompExigRealAcred", "");
    BorrarDatosCampo("txtReservasTotales", "");
    BorrarDatosCampo("txtReservasCubiertaGarantPerson", "");
    BorrarDatosCampo("txtReservasNoCubiertaGarantPerson", "");
    BorrarDatosCampo("txtSeveridadPerdidaTotal", "");
    BorrarDatosCampo("txtSeveridadPerdidadParteCubiertaGarantPerson", "");
    BorrarDatosCampo("txtSeveridadPerdidadParteNoCubiertaGarantPerson", "");
    BorrarDatosCampo("txtExposicionIncumplimiento", "");
    BorrarDatosCampo("txtExposicionIncumpParteCubGarantPerson", "");
    BorrarDatosCampo("txtExposicionIncumpParteNoCubGarantPerson", "");
    BorrarDatosCampo("txtProbabilidadIncumplientoTotal", "");
    BorrarDatosCampo("txtProbabIncumParteCubGarantPerson", "");
    BorrarDatosCampo("txtProbabIncumParteNoCubGarantPerson", "");
    BorrarDatosCampo("sltGradoRiesgo", "-1");
    BorrarDatosCampo("txtReservasTotalesMetInt", "");
    BorrarDatosCampo("txtSeveridadPerdidaMetInt", "");
    BorrarDatosCampo("txtExposicionIncumpMetInt", "");
    BorrarDatosCampo("txtProbIncumMetInt", "");
    BorrarDatosCampo("sltTipoBajaCredito", "-1");
    BorrarDatosCampo("txtSaldoPrinAlIncPeriod", "");
    BorrarDatosCampo("txtRespTotalInicioPerio", "");
    BorrarDatosCampo("txtMontoTotalPagEfecXAcredEnPer", "");
    BorrarDatosCampo("txtMontorecQuitasCastQuebra", "");
    BorrarDatosCampo("txtMontoRecBoniYDesc", "");
}

function GuardarDatosCorte() {
    if (NoVacioDatosCorte()) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var parametros = {
            fnFechaDelReporte: $("#txtFechaReporteCT").val().split('/')[2] + $("#txtFechaReporteCT").val().split('/')[1] + $("#txtFechaReporteCT").val().split('/')[0],
            fvcIdDelCréditoAsignadoPorLaInstitución: $("#txtIdCreditoAsignadoInstCT").val(), FVCNumeroDeDisposicion: $("#txtNoDisposicionCT").val(),
            fvcEstatusSic: $("#sltEstatusSICCT").val(), fvcTipoDeEmpresa: $("#sltTipoEmpresaCT").val(), fnLineaDispuestaONoDispuesta: $("#sltLineaDispuestaONoDispCT").val(),
            fnTasaInterésBrutaPeriodo: $("#txtTasaInteresBrutaPeriodoCT").val(), FNMontoDispuestoDeLaLineaDeCréditoEnElMes: $("#txtMontoDispuestoMesCT").val(),
            fnMontoDelPagoExigibleAlAcreditadoEnElPeriodo_IncluyeCapitalInteresesYComisiones: $("#txtMontoPagoExigibleAcreditadoEnPeriodo").val(),
            fnMontoDeCapitalPagadoEfectivamentePorElAcreditadoEnElPeriodo: $("#txtMontoCapitalPagadoEfecXAcredEnPeriodo").val(),
            fnMontoDeInteresesPagadosEfectivamentePorElAcreditadoEnElPeriodo: $("#txtMontInteresesPagEfecXAcredEnPeriodo").val(),
            fnMontoDeComisionesPagadasEfectivamentePorElAcreditadoEnElPeriodo: $("#txtMontComisionPagEfecXAcredEnPeriodo").val(),
            fnMontoDeInteresesMoratoriosYOtrosAccesoriosPagadosEfectivamentePorElAcreditadoEnElPeriodo: $("#txtMontInteresesMoraYOtrosAccPagEfecXAcredEnPeriodo").val(),
            fnMontoBonificadoPorLaInstitucionFinanciera: $("#txtMontoBonificadoInstFinanc").val(), fnSaldoDelPrincipalAlFinalDelPeriodo: $("#txtSaldoDelPrincipFinalPeriodo").val(),
            fnSaldoBaseParaElCálculoDeInteresesALaFechaDeCorteDelCrédito: $("#txtSaldoBaseCalculoInteresesFechaCortCred").val(),
            fnInteresesResultantesDeAplicarLaTasaAlSaldoBase: $("#txtInteresesResultAplicarTasaASaldoBase").val(),
            fnResponsabilidadTotalAlFinalDelPeriodo: $("#txtResponsabilidadTotalFinalPeriodo").val(), fnSituacionDelCrédito: $("#sltSituaciónCredito").val(),
            fnNúmeroDeDiasVencidos: $("#txtNoDiasVencidos").val(), fnFechaDelUltimoPagoCompletoExigibleRealizadoPorElAcreditado: $("#txtFechaUltimoPAgCompExigRealAcred").val().split('/')[2] + $("#txtFechaUltimoPAgCompExigRealAcred").val().split('/')[1] + $("#txtFechaUltimoPAgCompExigRealAcred").val().split('/')[0],
            fnReservasTotales: $("#txtReservasTotales").val(), fnReservasParteCubiertaPorGarantiasPersonales: $("#txtReservasCubiertaGarantPerson").val(),
            fnReservasParteNoCubiertaPorGarantiasPersonales: $("#txtReservasNoCubiertaGarantPerson").val(), fnSeveridadDeLaPerdidaTotal: $("#txtSeveridadPerdidaTotal").val(),
            fnSeveridadDeLaPerdidaParteCubiertaPorGarantiasPesonales: $("#txtSeveridadPerdidadParteCubiertaGarantPerson").val(),
            fnSeveridadDeLaPerdidaParteNoCubiertaPorGarantiasPesonales: $("#txtSeveridadPerdidadParteNoCubiertaGarantPerson").val(),
            fnExposicionAlIncumplimiento: $("#txtExposicionIncumplimiento").val(), fnExposicionAlIncumplimientoParteCubiertaPorGarantiasPesonales: $("#txtExposicionIncumpParteCubGarantPerson").val(),
            fnExposicionAlIncumplimientoParteNoCubiertaPorGarantiasPesonales: $("#txtExposicionIncumpParteNoCubGarantPerson").val(),
            fnProbabilidadDeIncumplimientoTotal: $("#txtProbabilidadIncumplientoTotal").val(), fnProbabilidadDeIncumplimientoParteCubiertaPorGarantiasPersonales: $("#txtProbabIncumParteCubGarantPerson").val(),
            fnProbabilidadDeIncumplimientoParteNoCubiertaPorGarantiasPersonales: $("#txtProbabIncumParteNoCubGarantPerson").val(), fvcGradoDeRiesgo: $("#sltGradoRiesgo").val(),
            fnReservasTotales_MetodologiaInterna: $("#txtReservasTotalesMetInt").val(), fnSeveridadDeLaPerdida_MetodologiaInterna: $("#txtSeveridadPerdidaMetInt").val(),
            fnExposicionAlIncumplimiento_MetodologiaInterna: $("#txtExposicionIncumpMetInt").val(), fnProbabilidadDeIncumplimiento_MetodologiaInterna: $("#txtProbIncumMetInt").val(),
            fnTipoBajaCredito: $("#sltTipoBajaCredito").val(), fnSaldoDelPrincipalAlInicioDelPeriodo: $("#txtSaldoPrinAlIncPeriod").val(),
            fnResponsabilidadTotalAlInicioDelPeriodo: $("#txtRespTotalInicioPerio").val(), fnMontoTotalPagadoEfectivamentePorElAcreditadoEnElPeriodo: $("#txtMontoTotalPagEfecXAcredEnPer").val(),
            fnMontoReconocidoPorQuitas_CastigosYQuebrantos: $("#txtMontorecQuitasCastQuebra").val(), fnMontoReconocidoPorBonificacionesYDescuentos: $("#txtMontoRecBoniYDesc").val(),
            opcion: esEdicionCorte ? 1 : 2
        };
        peticionAjax('ConsultaSIC.aspx/GuardarCorte', "POST", parametros, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    var HTML = '<span style="color:Green;font-weight:bold">El Corte se ha guardado de forma correcta.</span><br /><br />';
                    HTML += '<table id="tblCortesFind" class="dataGridDatos"><thead><tr><th >Fecha Corte</th ><th >Tasa Interés Bruta</th ><th >Saldo Principal al Final Per.</th ><th >Responsabilidad Total Final Per.</th ><th >Reservas Totales</th ><th ><input id="RadioEditarCorte" name="EditarCorteX" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
                    HTML += '<tr style="background: rgba(43, 182, 165, 0.52);"><td >' + $("#txtFechaReporteCT").val() + '</td><td >' + $("#txtTasaInteresBrutaPeriodoCT").val() + '</td><td >' + $("#txtSaldoDelPrincipFinalPeriodo").val() + '</td><td >' + $("#txtResponsabilidadTotalFinalPeriodo").val() + '</td><td >' + $("#txtReservasTotales").val() + '</td><td ><input id="RadioEditarCorte" ';
                    HTML += 'checked="checked" ';
                    HTML += 'name="EditarCorteX" type="radio"  value="' + ($("#txtFechaReporteCT").val().split('/')[2] + $("#txtFechaReporteCT").val().split('/')[1] + $("#txtFechaReporteCT").val().split('/')[0]) + '%%&&' + $("#txtNoDisposicionCT").val() + '" /></td></tr>';
                    HTML += '</tbody></table>';
                    $(TablaCortesEncontrados).html(HTML);
                    document.getElementById("tblCortesFind").style.width = "100%";
                    $('#btnEditarCorte').attr("disabled", false);
                    CambiarDiv('DivCortesEncontrados', 'DivDatosCorte', false, true);
                    LimpiarDatosCorte();
                }
            }
            else MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}


function NoVacioDatosCorte() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaReporteCT", "Fecha Corte"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtIdCreditoAsignadoInstCT", "Número de Línea"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNoDisposicionCT", "Número de Disposicion"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltEstatusSICCT", "Estatus SIC", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoEmpresaCT", "Tipo Empresa", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltLineaDispuestaONoDispCT", "Línea Dispuesta o No Dispuesta", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtTasaInteresBrutaPeriodoCT", "Tasa de Interés Bruta Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoDispuestoMesCT", "Monto Dispuesto Línea Crédito en el Mes"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoPagoExigibleAcreditadoEnPeriodo", "Monto Pago Exigible al Acreditado en el Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoCapitalPagadoEfecXAcredEnPeriodo", "Monto de Capital Pagado Efectivamente por el Acreditado en el Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontInteresesPagEfecXAcredEnPeriodo", "Monto de Intereses Pagados Efectivamente por el Acreditado en el Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontComisionPagEfecXAcredEnPeriodo", "Monto de Comisiones Pagadas Efectivamente por el Acreditado en el Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontInteresesMoraYOtrosAccPagEfecXAcredEnPeriodo", "Monto de Intereses Moratorios y Otros Accesorios Pagados Efectivamente por el Acreditado en el Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoBonificadoInstFinanc", "Monto Bonificado por Institución Financiera"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSaldoDelPrincipFinalPeriodo", "Saldo del Principal al Final del Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSaldoBaseCalculoInteresesFechaCortCred", "Saldo Base para Cálculo Intereses a la Fecha Corte del Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtInteresesResultAplicarTasaASaldoBase", "Intereses Resultantes de Aplicar Tasa a Saldo Base"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtResponsabilidadTotalFinalPeriodo", "Responsabilidad Total al Final del Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltSituaciónCredito", "Situación del Crédito", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtNoDiasVencidos", "Número de Días Vencidos"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFechaUltimoPAgCompExigRealAcred", "Fecha Último Pago Completo Exigible Realizado por Acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtReservasTotales", "Reservas Totales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtReservasCubiertaGarantPerson", "Reservas Parte Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtReservasNoCubiertaGarantPerson", "Reservas Parte No Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaTotal", "Severidad de la Pérdida Total"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidadParteCubiertaGarantPerson", "Severidad de la Pérdida Parte Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidadParteNoCubiertaGarantPerson", "Severidad de la Pérdida Parte No Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposicionIncumplimiento", "Exposición al Incumplimiento"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposicionIncumpParteCubGarantPerson", "Exposición al Incumplimiento Parte Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposicionIncumpParteNoCubGarantPerson", "Exposición al Incumplimiento Parte No Cubierta por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbabilidadIncumplientoTotal", "Probabilidad Incumplimiento Total"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbabIncumParteCubGarantPerson", "Probabilidad Incumplimiento Parte Cubierta Por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbabIncumParteNoCubGarantPerson", "Probabilidad Incumplimiento Parte No Cubierta Por Garantías Personales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltGradoRiesgo", "Grado de Riesgo (Art. 129 DCGAIC)", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtReservasTotalesMetInt", "Reservas Totales(Metodología Interna)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSeveridadPerdidaMetInt", "Severidad de la Pérdida(Metodología Interna)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtExposicionIncumpMetInt", "Exposicióm al Incumplimiento(Metodología Interna)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtProbIncumMetInt", "Probabilidad Incumplimiento(Metodología Interna)"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoBajaCredito", "Tipo Baja Crédito", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtSaldoPrinAlIncPeriod", "Saldo Principal al Inicio Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtRespTotalInicioPerio", "Responsabilidad Total Inicio Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoTotalPagEfecXAcredEnPer", "Monto Total Pagado Efectivamente por el Acreditado en Periodo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontorecQuitasCastQuebra", "Monto Reconocido por Quitas,Castigos y Quebrantos"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtMontoRecBoniYDesc", "Monto Reconocido por Bonificaciones y Descuentos"); else return dispararReturn;
    return dispararReturn;
}