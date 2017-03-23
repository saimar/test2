
function funcionLoadMasterPage() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
}

function rdbNumCta_Check(obj) {
    if ($(obj).attr("id") == "rdbNumCta") {
        $("#rdbPendientes").removeAttr("checked");
        $("#ddl_pendientes").hide();
        $("#btnBuscarPendientes").hide();
        $("#txtBuscar").show();
        $("#btnbuscar").show();
        $("#btnnuevo").show();
        $('#dgPendientesXAutorizar').slideUp('slide');
    }
    else {
        $("#rdbNumCta").removeAttr("checked");
        $("#ddl_pendientes").show();
        $("#btnBuscarPendientes").show();
        $("#txtBuscar").hide();
        $("#btnbuscar").hide();
        $("#btnnuevo").hide();
    }
    var entroAqui = "";
}

var arregloRowsPendientesXAutorizar = new Array(); var indicePagina = 1;
function btnbuscar_pendietes_Click() {
    $("#btnCancelar").attr("lang", "aa");
    if (indicePagina == 1) { arregloRowsPendientesXAutorizar = new Array(); Waiting(true, "Espere por favor. Cargando Información..."); }
    var opcionObt = $("#ddl_pendientes").val() == "2" ? "0,1" : ($("#ddl_pendientes").val() == "0" ? "0,0" : "1,1");
    var parametrosPendientesXAutorizar = { indicePag: indicePagina, numRegistros: "600", opcion1: opcionObt.split(",")[0], opcion2: opcionObt.split(",")[1] };
    peticionAjax('Default.aspx/PendientesXAutorizar', "POST", parametrosPendientesXAutorizar, function PendientesXAutorizar_Finish(data) {
        var arrayJSONPG = obtenerArregloDeJSON(data.d.split("%&&%")[0], false);
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var arreglov = new Array();
            arreglov.push(arrayJSONPG[i].Cuenta, arrayJSONPG[i].IdentificadorCNBV, arrayJSONPG[i].FDFechaCreacion, arrayJSONPG[i].FDFechaAutorizacion, "<div id='btn_" + (arrayJSONPG[i].Cuenta) + "' style='color: blue;cursor: pointer;* cursor: hand;' onclick='VerDetalleCuenta(this)'><u>Detalle</u></div>");
            arregloRowsPendientesXAutorizar.push(arreglov);
            arreglov = new Array();
        }
        arrayJSONPG = obtenerArregloDeJSON(data.d.split("%&&%")[1], false);
        if (parseInt(arrayJSONPG[0].numRows) > arregloRowsPendientesXAutorizar.length) {
            indicePagina++;
            btnbuscar_pendietes_Click();
        }
        else if (parseInt(arrayJSONPG[0].numRows) == arregloRowsPendientesXAutorizar.length) {
            $('#dgPendientesXAutorizar').slideDown('slide');
            indicePagina = 1;
            var va = "";
            initTable();
            tableActions();
            setTimeout(terminarWait, 500);
        }
    }, null);
}

var objCta = null;
function VerDetalleCuenta(obj) {
    LimpiarCampos();
    $(".ui-datepicker-trigger").attr("name", "btnVerCalendario");
    //    $("[name*='btnVerCalendario']").attr("class", "classButtonDis");
    Waiting(true, "Espere por favor. Cargando Información...");
    objCta = obj == true ? $("#txtBuscar").val() : (obj != null ? $(obj).attr("id").split("_")[1] : null);
    if (obj == true) {
        $("#btnAutorizar").hide();
        $("#btnActualizar").show();
        $("#btnAgregar").hide();
    }
    else if (obj != null) {
        $("#btnAutorizar").show();
        $("#btnActualizar").show();
        $("#btnAgregar").hide();
    }
    WidtDatePicker();
    AgregaAñosAComboAñoMes();
}

function WidtDatePicker() {
    document.getElementById("ui-datepicker-div").style.width = "168px";
    setTimeout(WidtDatePicker, 100);
}

var fechaActual = "";
function AgregaAñosAComboAñoMes() {
    peticionAjax('Default.aspx/DevuelveAñosMesActual', "POST", null, function DevuelveAñosMesActual_Finish(data1) {
        document.getElementById('ddl_anio').options.length = 0;
        for (var i = 0; i < data1.d.split(":")[0].split(",").length; i++) {
            var opt = document.createElement('option');
            opt.value = data1.d.split(":")[0].split(",")[i];
            opt.innerHTML = data1.d.split(":")[0].split(",")[i];
            document.getElementById('ddl_anio').appendChild(opt);
        }
        $("#ddl_anio").val((parseInt(data1.d.split(":")[0].split(",")[0]) + 8) + "");
        $("#ddl_mes").val(data1.d.split(":")[1]);
        fechaActual = data1.d.split(":")[2];
        DevuelveProductoHipotecario();
    }, null);
}

function DevuelveProductoHipotecario() {
    var arrayJSONPG;
    peticionAjax('Default.aspx/DevuelveProductoHipotecario', "POST", null, function DevuelveProductoHipotecario_Finish(data1) {
        arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
        document.getElementById('ddlFIPRODUCTO').options.length = 0;
        var opcion = new Option("-- Seleccione una opción --", -1);
        document.getElementById('ddlFIPRODUCTO').appendChild(opcion);
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].FSITipoCredito;
            opt.innerHTML = arrayJSONPG[i].FVCDescripcion;
            document.getElementById('ddlFIPRODUCTO').appendChild(opt);
        }
        DevuelveTipoTasaInteres();
    }, null);
}

function DevuelveTipoTasaInteres() {
    var arrayJSONPG;
    peticionAjax('Default.aspx/DevuelveTipoTasaInteres', "POST", null, function (data1) {
        arrayJSONPG = obtenerArregloDeJSON(data1.d, false);
        document.getElementById('sltTipoTasaInteresCredito').options.length = 0;
        var opcion = new Option("-- Seleccione una opción --", -1);
        document.getElementById('sltTipoTasaInteresCredito').appendChild(opcion);
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].id;
            opt.innerHTML = arrayJSONPG[i].fvcDescripcion;
            opt.lang = arrayJSONPG[i].FVCAbreviacion;
            document.getElementById('sltTipoTasaInteresCredito').appendChild(opt);
        }
        $("#sltTipoTasaInteresCredito").val(arrayJSONPG[0].id);
        DevuelveTipoDeReferencia("", true);
    }, null);
}

function DevuelveTipoDeReferencia(tasaReferenciaSelect, cargarCatalogos) {
    var arrayJSONPG;
    document.getElementById('sltTasaDeReferencia').options.length = 0;
    if ($("#sltTipoTasaInteresCredito").val() != "-1") {
        peticionAjax('Default.aspx/DevuelveTasadeReferencia', "POST", { tipoTasaInteres: document.getElementById("sltTipoTasaInteresCredito").options[$("#sltTipoTasaInteresCredito").val()].lang }, function (data1) {
            arrayJSONPG = obtenerArregloDeJSON(data1.d, false);
            document.getElementById('sltTasaDeReferencia').options.length = 0;
            var opcion = new Option("-- Seleccione una opción --", -1);
            document.getElementById('sltTasaDeReferencia').appendChild(opcion);
            for (var i = 0; i < arrayJSONPG.length; i++) {
                var opt = document.createElement('option');
                opt.value = arrayJSONPG[i].id;
                opt.innerHTML = arrayJSONPG[i].descripcion;
                document.getElementById('sltTasaDeReferencia').appendChild(opt);
            }
            $("#sltTasaDeReferencia").val(tasaReferenciaSelect);
            if (cargarCatalogos)
                DevuelveDestinoCredito();
        }, null);
    }
    else if (cargarCatalogos)
        DevuelveDestinoCredito();
}

function DevuelveDestinoCredito() {
    var arrayJSONPG;
    peticionAjax('Default.aspx/DevuelveDestinoCredito', "POST", null, function DevuelveDestinoCredito_Finish(data1) {
        arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
        document.getElementById('ddlFIDESTINO').options.length = 0;
        var opcion = new Option("-- Seleccione una opción --", -1);
        document.getElementById('ddlFIDESTINO').appendChild(opcion);
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].FICveDestinoCredito;
            opt.innerHTML = arrayJSONPG[i].FVCDescripcion;
            document.getElementById('ddlFIDESTINO').appendChild(opt);
        }
        DevuelveEntidadCofinanciamiento();
    }, null);
}

function DevuelveEntidadCofinanciamiento() {
    var arrayJSONPG;
    peticionAjax('Default.aspx/DevuelveEntidadCofinanciamiento', "POST", null, function DevuelveEntidadCofinanciamiento_Finish(data1) {
        arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
        document.getElementById('ddlFDENTIDAD').options.length = 0;
        var opcion = new Option("-- Seleccione una opción --", -1);
        document.getElementById('ddlFDENTIDAD').appendChild(opcion);
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].FICveEntidad;
            opt.innerHTML = arrayJSONPG[i].FVCDescripcion;
            document.getElementById('ddlFDENTIDAD').appendChild(opt);
        }
        DevuelveSectorLaboral();
    }, null);
}

function DevuelveSectorLaboral() {
    var arrayJSONPG;
    peticionAjax('Default.aspx/DevuelveSectorLaboral', "POST", null, function DevuelveSectorLaboral_Finish(data1) {
        arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
        document.getElementById('ddlFISECTORLABORAL').options.length = 0;
        var opcion = new Option("-- Seleccione una opción --", -1);
        document.getElementById('ddlFISECTORLABORAL').appendChild(opcion);
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].FICveSector;
            opt.innerHTML = arrayJSONPG[i].FVCDescripcion;
            document.getElementById('ddlFISECTORLABORAL').appendChild(opt);
        }
        DevuelveDenominacion();
    }, null);
}

function DevuelveDenominacion() {
    var arrayJSONPG;
    peticionAjax('Default.aspx/DevuelveDenominacion', "POST", null, function DevuelveDenominacion_Finish(data1) {
        arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
        document.getElementById('ddlFIDENOMINACIONCREDITO').options.length = 0;
        var opcion = new Option("-- Seleccione una opción --", -1);
        document.getElementById('ddlFIDENOMINACIONCREDITO').appendChild(opcion);
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].FIClaveR04H;
            opt.innerHTML = arrayJSONPG[i].FVCMonedaDescOficial;
            document.getElementById('ddlFIDENOMINACIONCREDITO').appendChild(opt);
        }
        DevuelveTipoAlta();
    }, null);
}

function DevuelveTipoAlta() {
    var arrayJSONPG;
    peticionAjax('Default.aspx/DevuelveTipoAlta', "POST", null, function DevuelveTipoAlta_Finish(data1) {
        arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
        document.getElementById('ddlFITipoAlta').options.length = 0;
        var opcion = new Option("-- Seleccione una opción --", -1);
        document.getElementById('ddlFITipoAlta').appendChild(opcion);
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].FICveTipoAlta;
            opt.innerHTML = arrayJSONPG[i].FVCDescripcion;
            document.getElementById('ddlFITipoAlta').appendChild(opt);
        }
        DevuelveTipoBaja();
    }, null);
}

function DevuelveTipoBaja() {
    var arrayJSONPG;
    peticionAjax('Default.aspx/DevuelveTipoBaja', "POST", null, function DevuelveTipoBaja_Finish(data1) {
        arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
        document.getElementById('ddlFITipoBaja').options.length = 0;
        var opcion = new Option("-- Seleccione una opción --", -1);
        document.getElementById('ddlFITipoBaja').appendChild(opcion);
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].FICveTipoBaja;
            opt.innerHTML = arrayJSONPG[i].FVCDescripcion;
            document.getElementById('ddlFITipoBaja').appendChild(opt);
        }
        DevuelveTipoCompIngresos();
    }, null);
}

function DevuelveTipoCompIngresos() {
    var arrayJSONPG;
    peticionAjax('Default.aspx/DevuelveTipoCompIngresos', "POST", null, function DevuelveTipoCompIngresos_Finish(data1) {
        arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
        document.getElementById('ddlFITIPOCOMPROBACION').options.length = 0;
        var opcion = new Option("-- Seleccione una opción --", -1);
        document.getElementById('ddlFITIPOCOMPROBACION').appendChild(opcion);
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].FICveComprobacion;
            opt.innerHTML = arrayJSONPG[i].FVCDescripcion;
            document.getElementById('ddlFITIPOCOMPROBACION').appendChild(opt);
        }
        DevuelveEstados();
    }, null);
}

function DevuelveEstados() {
    var arrayJSONPG;
    peticionAjax('Default.aspx/DevuelveEstados', "POST", null, function DevuelveEstados_Finish(data1) {
        arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
        document.getElementById('ddl_estado').options.length = 0;
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].FVCEstado == "-- Seleccionar Estado --" ? "-1" : arrayJSONPG[i].FVCEstado;
            opt.innerHTML = arrayJSONPG[i].FVCEstado;
            document.getElementById('ddl_estado').appendChild(opt);
        }
        ObtieneDatosDeCuenta(objCta);
    }, null);
}



function ObtieneDatosDeCuenta(Cuenta) {
    if (Cuenta != null) {
        var parametrosEditarPendientesXAutorizar = { OPC: 5, CP: 0, FNCuenta: Cuenta,
            campo1: "", campo2: "0", campo3: "0", campo4: "0", campo5: "0", campo6: "0", campo7: "", campo8: "0", campo9: "0",
            campo10: "0", campo11: "0", campo12: "0", campo13: "", campo14: "0", campo15: "0", campo16: "0", campo17: "0", campo18: "0", campo19: "0", campo20: "0", campo21: "0",
            campo22: "", campo23: "0", campo24: "0", campo25: "0", campo26: "0", campo27: "0", campo28: "0", campo29: "0", campo30: "0", campo31: "0", campo32: "0", campo33: "0", campo34: "0", campo35: "0"
        };
        peticionAjax('Default.aspx/GuardarActualizarBaseHomoVivienda', "POST", parametrosEditarPendientesXAutorizar, function EditarPendientesXAutorizar_Finish(data) {

            if (data.d == '{"SinDatos":"No se encontraron datos"}' || data.d == "") {
                MostrarMsj("El registro no existe.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () { $("#divVentanaMensajes").dialog("close"); }, null);
                Waiting(false, "Espere por favor. Cargando Información...");
                return;
            }
            $("#divCtrlBuscar").slideUp('slide');
            $("#dgPendientesXAutorizar").slideUp('slide');
            $("#divinfo").slideDown('slide');
            var arrayJSONPG = obtenerArregloDeJSON(data.d.split("%&&%")[0], false);
            $("#txtFNCuenta").val(arrayJSONPG[0].cuenta);
            $("#txbFVIDENTIFICADOR").val(arrayJSONPG[0].campo1);
            $("#ddlFIPRODUCTO").val(arrayJSONPG[0].campo2);
            $("#ddlFITipoAlta").val(arrayJSONPG[0].campo3);
            tipoAlta();
            $("#ddlFIDESTINO").val(arrayJSONPG[0].campo4);
            $("#txtbFDCOMISIONES").val(arrayJSONPG[0].campo5);
            $("#txtbFDMONTO").val(arrayJSONPG[0].campo6);
            $("#ddlFDENTIDAD").val(arrayJSONPG[0].campo7);
            $("#txtbFDMONTOSUBCUENTA").val(arrayJSONPG[0].campo8);
            $("#txtbFDMONTOCREDITO").val(arrayJSONPG[0].campo9);
            $("#ddlFDAPOYORECIBIDO").val(arrayJSONPG[0].campo10.split(".")[0]);
            $("#txtbFDVALORVIVIENDA").val(arrayJSONPG[0].campo11);
            $("#txtbFDVALORINMUEBLE").val(arrayJSONPG[0].campo12);
            $("#txtbFVCNUMEROAVALUO").val(arrayJSONPG[0].campo13);
            $("#txtbFNLOCALIDADENCUENTRA").val(arrayJSONPG[0].campo14);
            BuscaEdoMunicipioDeLocalidadDevuelta($("#txtbFNLOCALIDADENCUENTRA").val());
            var FECHAFIRMA = arrayJSONPG[0].campo15.length == 7 ? "0" + arrayJSONPG[0].campo15 : arrayJSONPG[0].campo15;
            $("#txtbFIFECHAFIRMA").val(FECHAFIRMA.length == 8 ? FECHAFIRMA.substring(0, 2) + "/" + FECHAFIRMA.substring(2, 4) + "/" + FECHAFIRMA.substring(4, 8) : FECHAFIRMA);

            var FECHAVENCIMIENTO = arrayJSONPG[0].campo16.length == 7 ? "0" + arrayJSONPG[0].campo16 : arrayJSONPG[0].campo16;
            $("#txtbFIFECHAVENCIMIENTO").val(FECHAVENCIMIENTO.length == 8 ? FECHAVENCIMIENTO.substring(0, 2) + "/" + FECHAVENCIMIENTO.substring(2, 4) + "/" + FECHAVENCIMIENTO.substring(4, 8) : FECHAVENCIMIENTO);

            $("#txtbFDIMPORTEREESTRUCTURA").val(arrayJSONPG[0].campo17);
            varFECHAFIRMA = $('#txtbFIFECHAFIRMA').val(); varFECHAVENCIMIENTO = $('#txtbFIFECHAVENCIMIENTO').val(); varIMPORTEREESTRUCTURA = $('#txtbFDIMPORTEREESTRUCTURA').val();
            $("#ddlFIDENOMINACIONCREDITO").val(arrayJSONPG[0].campo18);
            $("#txtbFDINGRESOSMENSUALES").val(arrayJSONPG[0].campo19);
            $("#ddlFITIPOCOMPROBACION").val(arrayJSONPG[0].campo20);
            $("#ddlFISECTORLABORAL").val(arrayJSONPG[0].campo21);
            $("#txtbFVCNUMEROCONSULTA").val(arrayJSONPG[0].campo22);
            $("#ddlFITipoBaja").val(arrayJSONPG[0].campo23);
            $("#txtbFDMONTOBONIFICACIONESQUITAS").val(arrayJSONPG[0].campo24);
            $("#txtbFDVALORBIEN").val(arrayJSONPG[0].campo25);
            if (arrayJSONPG[0].campo29 == "1") $("#chkbx_RecPropios").attr("checked", "checked");
            else $("#chkbx_RecPropios").removeAttr("checked");
            EnableDisable();
            if (arrayJSONPG[0].campo30 != "") $("#ddl_anio").val(arrayJSONPG[0].campo30);
            if (arrayJSONPG[0].campo31 != "") $("#ddl_mes").val(parseInt(arrayJSONPG[0].campo31) < 10 ? "0" + arrayJSONPG[0].campo31 : arrayJSONPG[0].campo31);
            $("#txb_CodigoP").val(arrayJSONPG[0].campo39);
            $("#sltTipoTasaInteresCredito").val(arrayJSONPG[0].campo40);
            DevuelveTipoDeReferencia(arrayJSONPG[0].campo41, false);
            //$("#sltTasaDeReferencia").val(arrayJSONPG[0].campo41);
            btn_buscaEdo_Click1(arrayJSONPG[0].FNCveColoniaSiti);
            setTimeout(terminarWait, 300);
        }, null);
    }
    else {
        Waiting(false, "Espere por favor. Cargando Información...");
    }
}


function BuscaEdoMunicipioDeLocalidadDevuelta(localidadencuentra) {
    var parametrosDevuelveEdoMunicipioDeLocalidad = { localidad: localidadencuentra };
    peticionAjax('Default.aspx/DevuelveEdoMunicipioDeLocalidad', "POST", parametrosDevuelveEdoMunicipioDeLocalidad, function DevuelveEdoMunicipioDeLocalidad_Finish(data1) {
        var arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
        if (data1.d == "") {
            return;
        }
        $("#ddl_estado").val(arrayJSONPG[0].FVCEstado);
        ddl_estado_SelectionChange($("#ddl_estado"), arrayJSONPG[0].FVCMunicipio);
    }, null);
}

function initTable() {
    return $('#example').dataTable({
        "aaData": arregloRowsPendientesXAutorizar,
        "aoColumns": [
            { "sTitle": "<div id='div_SortCampo1' lang='aa' onclick='CambiaImg_Click(this)'>N&#250;mero de Cuenta&nbsp<img id='Img_SortCampo1' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_SortCampo2' lang='aa' onclick='CambiaImg_Click(this)'>Identificador CNBV&nbsp<img id='Img_SortCampo2' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_SortCampo3' lang='aa' onclick='CambiaImg_Click(this)'>Fecha creaci&#243;n&nbsp<img id='Img_SortCampo3' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_SortCampo4' lang='aa' onclick='CambiaImg_Click(this)'>Fecha autorizaci&#243;n&nbsp<img id='Img_SortCampo4' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_SortCampo5' lang='aa' onclick='CambiaImg_Click(this)'>Detalle&nbsp<img id='Img_SortCampo5' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" }
        ],
        "sPaginationType": "full_numbers",
        //"sScrollY": "570px",
        //"sScrollX": "993px",
        //"iDisplayLength": 25,
        //   "iScrollLoadGap": 25,
        "bDestroy": true
    });
}

function CambiaImg_Click(obj) {
    if ($(obj).attr("lang") == "aa") {
        document.getElementById('Img_' + $(obj).attr("id").split("_")[1]).setAttribute('src', '../../Images/Portafolio/Capbasviv/flechaOrderUp.png');
        $(obj).attr("lang", "ab");
    }
    else {
        document.getElementById('Img_' + $(obj).attr("id").split("_")[1]).setAttribute('src', '../../Images/Portafolio/Capbasviv/flechaOrder.png');
        $(obj).attr("lang", "aa");
    }
}

function tableActions() {
    var oTable = initTable();
}


function ddl_estado_SelectionChange(obj, municioSelect) {
    if ($(obj).val() != "-- Seleccionar Estado --") {
        Waiting(true, "Espere por favor. Cargando Información...");
        var parametrosDevuelveMunicipios = { estado: $(obj).val() };
        peticionAjax('Default.aspx/DevuelveMunicipios', "POST", parametrosDevuelveMunicipios, function DevuelveMunicipios_Finish(data1) {
            var arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
            document.getElementById('ddl_municipio').options.length = 0;
            for (var i = 0; i < arrayJSONPG.length; i++) {
                var opt = document.createElement('option');
                opt.value = arrayJSONPG[i].FVCMunicipio == "-- Seleccionar Mpio. --" ? "-1" : arrayJSONPG[i].FVCMunicipio;
                opt.innerHTML = arrayJSONPG[i].FVCMunicipio;
                document.getElementById('ddl_municipio').appendChild(opt);
            }
            $("#ddl_municipio").val(municioSelect);
            if (municioSelect == "")
                $("#txtbFNLOCALIDADENCUENTRA").val("");
            setTimeout(terminarWait, 100);
        }, null);
    }
    else {
        document.getElementById('ddl_municipio').options.length = 0;
        var opt1 = document.createElement('option');
        opt1.innerHTML = "-- Seleccionar Mpio. --";
        document.getElementById('ddl_municipio').appendChild(opt1);
        $("#txtbFNLOCALIDADENCUENTRA").val("");
    }
}


function ddl_municipio_SelectionChange(obj) {
    if ($(obj).val() != "-- Seleccionar Mpio. --") {
        Waiting(true, "Espere por favor. Cargando Información...");
        var parametrosDevuelveClaveLocalidad = { estado: $("#ddl_estado").val(), municipio: $(obj).val() };
        peticionAjax('Default.aspx/DevuelveClaveLocalidad', "POST", parametrosDevuelveClaveLocalidad, function DevuelveClaveLocalidad_Finish(data1) {
            var arrayJSONPG = obtenerArregloDeJSON(data1.d.split("%&&%")[0], false);
            $("#txtbFNLOCALIDADENCUENTRA").val(arrayJSONPG[0].FVCClaveSiti);
            setTimeout(terminarWait, 100);
        }, null);
    }
    else $("#txtbFNLOCALIDADENCUENTRA").val("");
}

function btnCancelar_Click() {
    $("#divCtrlBuscar").slideDown('slide');
    if ($("#btnCancelar").attr("lang") == "aa") $("#dgPendientesXAutorizar").slideDown('slide');
    $("#divinfo").slideUp('slide');
}



function btnbuscar_Click() {
    if ($("#txtBuscar").val() == "") {
        MostrarMsj("Ingrese el número de cuenta", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () { $("#divVentanaMensajes").dialog("close"); }, null);
        return;
    }
    LimpiarCampos();
    $("#btnCancelar").attr("lang", "ab");
    VerDetalleCuenta(true);
}

function btnnuevo_Click() {
    LimpiarCampos();
    $("#divCtrlBuscar").slideUp('slide');
    $("#dgPendientesXAutorizar").slideUp('slide');
    $("#divinfo").slideDown('slide');
    $("#btnAutorizar").hide();
    $("#btnActualizar").hide();
    $("#btnBorrar").hide();
    $("#btnAgregar").show();
    //$("#ddlFIPRODUCTO").attr("disabled", true);
    $("#txtFNCuenta").removeAttr("disabled");
    $("#btnCancelar").attr("lang", "ab");
    VerDetalleCuenta(null);
    $("#txtbFIFECHAFIRMA").attr("disabled", "disabled");
    $("#txtbFIFECHAVENCIMIENTO").attr("disabled", "disabled");
    $("[name*='btnVerCalendario']").attr("disabled", "disabled");
    //    $("[name*='btnVerCalendario']").attr("class", "classButtonDis");
}

function CalcularID() {
    var numcuenta = document.getElementById('txtbFVCNUMEROAVALUO').value;
    if (numcuenta == '') {
        MostrarMsj("¡Es necesario un número de avalúo!", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () { $("#divVentanaMensajes").dialog("close"); }, null);
        return;
    }
    else {
        if (document.getElementById('txtbFVCNUMEROAVALUO').value.length == 17) {
            var cadena = '1';
            var mes = document.getElementById('ddl_mes').options[document.getElementById('ddl_mes').selectedIndex].value;
            cadena += document.getElementById('ddl_anio').options[document.getElementById('ddl_anio').selectedIndex].value;
            cadena += mes;
            cadena += document.getElementById('txtbFVCNUMEROAVALUO').value;
            document.getElementById('txbFVIDENTIFICADOR').value = cadena;
        }
        else {
            MostrarMsj("El número de avalúo debe contener 17 dígitos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () { $("#divVentanaMensajes").dialog("close"); }, null);
            return;
        }
    }
}

function btn_buscaEdo_Click1(codigoColonia) {
    if ($("#txb_CodigoP").val() == "") {
        MostrarMsj("Ingrese el C.P.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () { $("#divVentanaMensajes").dialog("close"); }, null);
        return;
    }
    else {
        Waiting(true, "Espere por favor. Cargando Información...");
        var parametrosbuscarEdoColonia = { OPC: 1, CP: $("#txb_CodigoP").val(), FNCuenta: "0",
            campo1: "", campo2: "0", campo3: "0", campo4: "0", campo5: "0", campo6: "0", campo7: "", campo8: "0", campo9: "0",
            campo10: "0", campo11: "0", campo12: "0", campo13: "", campo14: "0", campo15: "0", campo16: "0", campo17: "0", campo18: "0", campo19: "0", campo20: "0", campo21: "0",
            campo22: "", campo23: "0", campo24: "0", campo25: "0", campo26: "0", campo27: "0", campo28: "0", campo29: "0", campo30: "0", campo31: "0", campo32: "0", campo33: "0", campo34: "0", campo35: "0"
        };
        peticionAjax('Default.aspx/GuardarActualizarBaseHomoVivienda', "POST", parametrosbuscarEdoColonia, function parametrosbuscarEdoColonia_Finish(data) {

            if (data.d == '{"SinDatos":"No se encontraron datos"}' || data.d == "" || data.d == "%&&%") {
                //  MostrarMsj("El registro no existe.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () { $("#divVentanaMensajes").dialog("close"); }, null);
                Waiting(false, "Espere por favor. Cargando Información...");
                return;
            }
            var arrayJSONEdoColonia = obtenerArregloDeJSON(data.d.split("%&&%")[0], false);
            $("#tb_Estado").val(arrayJSONEdoColonia[0].ESTADO);
            arrayJSONEdoColonia = obtenerArregloDeJSON(data.d.split("%&&%")[1], false);
            document.getElementById('list_Colonias').options.length = 0;
            for (var i = 0; i < arrayJSONEdoColonia.length; i++) {
                if (i == 0) {
                    var opcion = new Option("-- Seleccionar una Colonia --", -1);
                    document.getElementById('list_Colonias').appendChild(opcion);
                }
                var opt = document.createElement('option');
                opt.value = arrayJSONEdoColonia[i].FNCveColoniaSiti;
                opt.innerHTML = arrayJSONEdoColonia[i].COLONIA;
                document.getElementById('list_Colonias').appendChild(opt);
            }
            $("#list_Colonias").val(codigoColonia);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function LimpiarCampos() {
    $("#chkbx_RecPropios").removeAttr("checked");
    document.getElementById('ddl_municipio').options.length = 0;
    var opcion = new Option("-- Seleccionar Mpio. --", -1);
    document.getElementById('ddl_municipio').appendChild(opcion);

    document.getElementById('list_Colonias').options.length = 0;
    opcion = new Option("-- Seleccione una Colonia --", -1);
    document.getElementById('list_Colonias').appendChild(opcion);
    $("#ddlFIPRODUCTO").attr("disabled", false);

    BorrarDatosCampo("txtFNCuenta", "");
    BorrarDatosCampo("txbFVIDENTIFICADOR", "");
    BorrarDatosCampo("ddlFIPRODUCTO", "-1");
    BorrarDatosCampo("ddlFITipoAlta", "-1");
    BorrarDatosCampo("ddlFIDESTINO", "-1");
    BorrarDatosCampo("txbFVIDENTIFICADOR", "");
    BorrarDatosCampo("txtbFDCOMISIONES", "");
    BorrarDatosCampo("txtbFDMONTO", "");
    BorrarDatosCampo("ddlFDENTIDAD", "-1");
    BorrarDatosCampo("txtbFDMONTOSUBCUENTA", "");
    BorrarDatosCampo("txtbFDMONTOCREDITO", "");
    BorrarDatosCampo("ddlFDAPOYORECIBIDO", "");
    BorrarDatosCampo("txtbFDVALORVIVIENDA", "");
    BorrarDatosCampo("txtbFDVALORINMUEBLE", "");
    BorrarDatosCampo("txtbFVCNUMEROAVALUO", "");
    BorrarDatosCampo("ddl_estado", "-1");
    BorrarDatosCampo("ddl_municipio", "-1");
    BorrarDatosCampo("txtbFNLOCALIDADENCUENTRA", "");
    BorrarDatosCampo("txtbFIFECHAFIRMA", "0");
    BorrarDatosCampo("txtbFIFECHAVENCIMIENTO", "0");
    BorrarDatosCampo("txtbFDIMPORTEREESTRUCTURA", "");
    BorrarDatosCampo("ddlFIDENOMINACIONCREDITO", "-1");
    BorrarDatosCampo("txtbFDINGRESOSMENSUALES", "");
    BorrarDatosCampo("ddlFITIPOCOMPROBACION", "-1");
    BorrarDatosCampo("ddlFISECTORLABORAL", "-1");
    BorrarDatosCampo("txtbFVCNUMEROCONSULTA", "");
    BorrarDatosCampo("txtbFVCNUMEROCONSULTA", "");
    BorrarDatosCampo("ddlFITipoBaja", "-1");
    BorrarDatosCampo("txtbFDMONTOBONIFICACIONESQUITAS", "");
    BorrarDatosCampo("txtbFDVALORBIEN", "");
    BorrarDatosCampo("sltTipoTasaInteresCredito", "-1");
    BorrarDatosCampo("sltTasaDeReferencia", "-1");
    BorrarDatosCampo("txb_CodigoP", "");
    BorrarDatosCampo("tb_Estado", "");
    BorrarDatosCampo("list_Colonias", "");
    EnableDisable();
    tipoAlta();
}

function BorrarDatosCampo(campo, valor) {
    $("#" + campo).val(valor);
    document.getElementById(campo).style.border = "1px solid Gray";
}

function NoVacioDatosPantallaCaptura() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtFNCuenta", "Número de cuenta"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txbFVIDENTIFICADOR", "Identificador del Crédito CNBV"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ddlFIPRODUCTO", "Producto hipotecario de la institución", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ddlFITipoAlta", "Tipo alta", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ddlFIDESTINO", "Destino del crédito", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFDCOMISIONES", "Comisiones y gastos de originación"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFDMONTO", "Monto del subsidio federal al frente"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ddlFDENTIDAD", "Entidad que otorgó el cofinanciamiento", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFDMONTOSUBCUENTA", "Monto de la subcuenta de vivienda"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFDMONTOCREDITO", "Monto del crédito otorgado por el cofinanciador"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ddlFDAPOYORECIBIDO", "Apoyo recibido por un bando de desarrollo", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFDVALORVIVIENDA", "Valor de la vivienda al momento de la originación"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFDVALORINMUEBLE", "Valor del inmueble según avalúo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFVCNUMEROAVALUO", "Número de avalúo del inmueble"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ddl_estado", "Estado", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ddl_municipio", "Municipio", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFNLOCALIDADENCUENTRA", "Localidad"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFIFECHAFIRMA", "Fecha de firma de la reestructura del crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFIFECHAVENCIMIENTO", "Fecha de vencimiento del crédito reestructurado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFDIMPORTEREESTRUCTURA", "Monto del Crédito Reestructurado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ddlFIDENOMINACIONCREDITO", "Denominación del crédito reestructurado", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFDINGRESOSMENSUALES", "Ingresos mensuales brutos acreditado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ddlFITIPOCOMPROBACION", "Tipo de comprobación de ingresos", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ddlFISECTORLABORAL", "Sector laboral", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFVCNUMEROCONSULTA", "Número de consulta realizada a la sociedad"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ddlFITipoBaja", "Tipo de Baja", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFDMONTOBONIFICACIONESQUITAS", "Monto de las bonificaciones"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtbFDVALORBIEN", "Valor del bien adjudicado o dado en pago"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTipoTasaInteresCredito", "Tipo de Tasa de Interés del Crédito", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("sltTasaDeReferencia", "Tasa de Referencia", true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txb_CodigoP", " C.P"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("tb_Estado", "Estado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("list_Colonias", "Colonias", true); else return dispararReturn;
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

function btnAurorizarAgregarActualizar_Click(obj) {
    if (NoVacioDatosPantallaCaptura()) {
        document.getElementById("txb_CodigoP").style.border = "1px solid Gray";
        document.getElementById("tb_Estado").style.border = "1px solid Gray";
        document.getElementById("list_Colonias").style.border = "1px solid Gray";

        Waiting(true, "Espere por favor. Guardando Información...");
        if ($("#txtFNCuenta").val() == "") {
            $("#txbFVIDENTIFICADOR").val('1' + document.getElementById('ddl_anio').options[document.getElementById('ddl_anio').selectedIndex].value + document.getElementById('ddl_mes').options[document.getElementById('ddl_mes').selectedIndex].value + $('#txtbFVCNUMEROAVALUO').val());
        }
        var parametrosAgregarActualizarRegistro = { OPC: $(obj).val() == "Agregar" ? 2 : ($(obj).val() == "Actualizar" ? 3 : 4), CP: $("#txb_CodigoP").val(), FNCuenta: $("#txtFNCuenta").val(),
            campo1: $('#txbFVIDENTIFICADOR').val() == "" ? "0" : $("#txbFVIDENTIFICADOR").val(),
            campo2: $("#ddlFIPRODUCTO").val(),
            campo3: $("#ddlFITipoAlta").val(),
            campo4: $("#ddlFIDESTINO").val(),
            campo5: $("#txtbFDCOMISIONES").val() == "" ? "0" : $("#txtbFDCOMISIONES").val(),
            campo6: $("#chkbx_RecPropios").is(':checked') ? "0" : ($("#txtbFDMONTO").val() == "" ? "0" : $("#txtbFDMONTO").val()),
            campo7: $("#chkbx_RecPropios").is(':checked') ? document.getElementById('ddlFDENTIDAD').options[1].value : $('#ddlFDENTIDAD').val(),
            campo8: $("#chkbx_RecPropios").is(':checked') ? "0" : ($("#txtbFDMONTOSUBCUENTA").val() == "" ? "0" : $('#txtbFDMONTOSUBCUENTA').val()),
            campo9: $("#chkbx_RecPropios").is(':checked') ? "0" : ($("#txtbFDMONTOCREDITO").val() == "" ? "0" : $('#txtbFDMONTOCREDITO').val()),
            campo10: $("#chkbx_RecPropios").is(':checked') ? document.getElementById('ddlFDAPOYORECIBIDO').options[0].value : $('#ddlFDAPOYORECIBIDO').val(),
            campo11: $("#txtbFDVALORVIVIENDA").val() == "" ? "0" : $('#txtbFDVALORVIVIENDA').val(),
            campo12: $("#txtbFDVALORINMUEBLE").val() == "" ? "0" : $('#txtbFDVALORINMUEBLE').val(),
            campo13: $("#txtbFVCNUMEROAVALUO").val() == "" ? "0" : $('#txtbFVCNUMEROAVALUO').val(),
            campo14: $("#txtbFNLOCALIDADENCUENTRA").val() == "" ? "0" : $('#txtbFNLOCALIDADENCUENTRA').val(),
            campo15: $("#txtbFIFECHAFIRMA").val() == "" ? "0" : ($('#txtbFIFECHAFIRMA').val().length == 10 ? $('#txtbFIFECHAFIRMA').val().split("/")[0] + $('#txtbFIFECHAFIRMA').val().split("/")[1] + $('#txtbFIFECHAFIRMA').val().split("/")[2] : "0"),
            campo16: $("#txtbFIFECHAVENCIMIENTO").val() == "" ? "0" : ($('#txtbFIFECHAVENCIMIENTO').val().length == 10 ? $('#txtbFIFECHAVENCIMIENTO').val().split("/")[0] + $('#txtbFIFECHAVENCIMIENTO').val().split("/")[1] + $('#txtbFIFECHAVENCIMIENTO').val().split("/")[2] : "0"),
            campo17: $("#txtbFDIMPORTEREESTRUCTURA").val() == "" ? "0" : $('#txtbFDIMPORTEREESTRUCTURA').val(),
            campo18: $("#ddlFIDENOMINACIONCREDITO").val(),
            campo19: $("#txtbFDINGRESOSMENSUALES").val() == "" ? "0" : $('#txtbFDINGRESOSMENSUALES').val(),
            campo20: $("#ddlFITIPOCOMPROBACION").val(),
            campo21: $("#ddlFISECTORLABORAL").val(),
            campo22: $("#txtbFVCNUMEROCONSULTA").val() == "" ? "0" : $('#txtbFVCNUMEROCONSULTA').val(),
            campo23: $("#ddlFITipoBaja").val(),
            campo24: $("#txtbFDMONTOBONIFICACIONESQUITAS").val() == "" ? "0" : $('#txtbFDMONTOBONIFICACIONESQUITAS').val(),
            campo25: $("#txtbFDVALORBIEN").val() == "" ? "0" : $('#txtbFDVALORBIEN').val(),
            campo26: "1",
            campo27: $("#chkbx_RecPropios").is(':checked') ? "1" : "0",
            campo28: $("#ddl_anio").val(),
            campo29: $("#ddl_mes").val(),
            campo30: fechaActual.split("/")[2],
            campo31: fechaActual.split("/")[1],
            campo32: fechaActual.split("/")[0],
            campo33: $("#list_Colonias").val(),
            campo34: $("#sltTipoTasaInteresCredito").val(),
            campo35: $("#sltTasaDeReferencia").val()
        };
        peticionAjax('Default.aspx/GuardarActualizarBaseHomoVivienda', "POST", parametrosAgregarActualizarRegistro, function AgregarActualizarRegistro_Finish(data) {
            if (data.d != '{"SinDatos":"No se encontraron datos"}') {
                Waiting(false, "Espere por favor. Cargando Información...");
                MostrarMsj("Información" + ($(obj).val() == "Agregar" || $(obj).val() == "Autorizar" ? " almacenada " : " actualizada ") + "exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () {
                    $("#divVentanaMensajes").dialog("close"); $("#divCtrlBuscar").slideDown('slide');
                    if ($("#btnCancelar").attr("lang") == "aa") $("#dgPendientesXAutorizar").slideDown('slide');
                    $("#divinfo").slideUp('slide');
                }, null);
            }
            else {
                Waiting(false, "Espere por favor. Cargando Información...");
                MostrarMsj("Fallo al" + ($(obj).val() == "Agregar" || $(obj).val() == "Autorizar" ? " almacenar " : " actualizar ") + "la información. Verifique.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () { $("#divVentanaMensajes").dialog("close"); }, null);
            }
        }, null);
    }
}

function EnableDisable() {
    if (document.getElementById('chkbx_RecPropios').checked == true) {
        document.getElementById('txtbFDMONTO').disabled = true;
        document.getElementById('txtbFDMONTO').value = 0;
        document.getElementById('ddlFDENTIDAD').disabled = true;
        document.getElementById('ddlFDENTIDAD').selectedIndex = 1;
        document.getElementById('ddlFDAPOYORECIBIDO').disabled = true;
        document.getElementById('ddlFDAPOYORECIBIDO').selectedIndex = 0;
        document.getElementById('txtbFDMONTOCREDITO').disabled = true;
        document.getElementById('txtbFDMONTOCREDITO').value = 0;
        document.getElementById('txtbFDMONTOSUBCUENTA').disabled = true;
        document.getElementById('txtbFDMONTOSUBCUENTA').value = 0;
    }
    else {
        document.getElementById('txtbFDMONTO').disabled = false;
        document.getElementById('ddlFDENTIDAD').disabled = false;
        document.getElementById('ddlFDAPOYORECIBIDO').disabled = false;
        document.getElementById('txtbFDMONTOCREDITO').disabled = false;
        document.getElementById('txtbFDMONTOSUBCUENTA').disabled = false;
    }
}

var varFECHAFIRMA = ""; var varFECHAVENCIMIENTO = ""; var varIMPORTEREESTRUCTURA = "";
function tipoAlta() {
    if (document.getElementById('ddlFITipoAlta').value == 3) {
        document.getElementById('txtbFIFECHAFIRMA').disabled = false;
        document.getElementById('txtbFIFECHAVENCIMIENTO').disabled = false;
        document.getElementById('txtbFDIMPORTEREESTRUCTURA').disabled = false;
        $('#ddlFIDENOMINACIONCREDITO').removeAttr("disabled");

        document.getElementById('txtbFIFECHAFIRMA').value = varFECHAFIRMA;
        document.getElementById('txtbFIFECHAVENCIMIENTO').value = varFECHAVENCIMIENTO;
        document.getElementById('txtbFDIMPORTEREESTRUCTURA').value = varIMPORTEREESTRUCTURA;
        document.getElementById('txtbFIFECHAFIRMA').style.visibility = "visible";
        document.getElementById('txtbFIFECHAVENCIMIENTO').style.visibility = "visible";
        $("#txtbFIFECHAFIRMA").removeAttr("disabled");
        $("#txtbFIFECHAVENCIMIENTO").removeAttr("disabled");
        $("[name*='btnVerCalendario']").removeAttr("disabled");
        //        $("[name*='btnVerCalendario']").attr("class", "classButton");
    }
    else {
        document.getElementById('txtbFIFECHAFIRMA').disabled = true;
        document.getElementById('txtbFIFECHAVENCIMIENTO').disabled = true;
        document.getElementById('txtbFDIMPORTEREESTRUCTURA').disabled = true;
        $("#ddlFIDENOMINACIONCREDITO").attr("disabled", "disabled");

        varFECHAFIRMA = $('#txtbFIFECHAFIRMA').val(); varFECHAVENCIMIENTO = $('#txtbFIFECHAVENCIMIENTO').val(); varIMPORTEREESTRUCTURA = $('#txtbFDIMPORTEREESTRUCTURA').val();
        document.getElementById('txtbFIFECHAFIRMA').value = 0;
        document.getElementById('txtbFIFECHAVENCIMIENTO').value = 0;
        document.getElementById('txtbFDIMPORTEREESTRUCTURA').value = 0;
        document.getElementById('ddlFIDENOMINACIONCREDITO').selectedIndex = 1;
        $("#txtbFIFECHAFIRMA").attr("disabled", "disabled");
        $("#txtbFIFECHAVENCIMIENTO").attr("disabled", "disabled");
        $("[name*='btnVerCalendario']").attr("disabled", "disabled");
        //        $("[name*='btnVerCalendario']").attr("class", "classButtonDis");
    }
}

function PrecScale(IDCampo, Prec, Scale) {
    Prec = Prec - Scale;

    if (window.event.keyCode < 46 || window.event.keyCode > 57) {
        window.event.keyCode = 0;

    }
    else {
        if (window.event.keyCode == 46) {
            if (document.getElementById(IDCampo).value.indexOf('.') != -1 || Scale == 0) {
                window.event.keyCode = 0;
            }

        }
        else {
            if (document.getElementById(IDCampo).value.indexOf('.') != -1) {
                if (document.getElementById(IDCampo).value.length - (document.getElementById(IDCampo).value.indexOf('.') + 1) >= Scale && posicionCursor(IDCampo) > document.getElementById(IDCampo).value.indexOf('.') || document.getElementById(IDCampo).value.length > Prec + Scale && posicionCursor(IDCampo) > 0) {
                    window.event.keyCode = 0;
                }
            }
            else {
                if (document.getElementById(IDCampo).value.length >= Prec) {
                    window.event.keyCode = 0;
                }
            }
        }
    }
}

function PrecScaleAlfa(IDCampo, Prec, Scale) {
    Prec = Prec - Scale;
    if (window.event.keyCode < 46 || window.event.keyCode == 60 || window.event.keyCode == 62
      || window.event.keyCode > 122) {
        window.event.keyCode = 0;
    }
    else {
        if (window.event.keyCode == 46) {
            if (document.getElementById(IDCampo).value.indexOf('.') != -1 || Scale == 0) {
                window.event.keyCode = 0;
            }
        }
        else {
            if (document.getElementById(IDCampo).value.indexOf('.') != -1) {
                if (document.getElementById(IDCampo).value.length - (document.getElementById(IDCampo).value.indexOf('.') + 1) >= Scale && posicionCursor(IDCampo) > document.getElementById(IDCampo).value.indexOf('.') || document.getElementById(IDCampo).value.length > Prec + Scale && posicionCursor(IDCampo) > 0) {
                    window.event.keyCode = 0;
                }
            }
            else {
                if (document.getElementById(IDCampo).value.length >= Prec) {
                    window.event.keyCode = 0;
                }
            }
        }
    }
}
function posicionCursor(TXT) {
    var tb = document.getElementById(TXT)
    var cursor = -1;
    // IE
    if (document.selection && (document.selection != 'undefined')) {
        var _range = document.selection.createRange();
        var contador = 0;
        while (_range.move('character', -1))
            contador++;
        cursor = contador;
    }
    // FF
    else if (tb.selectionStart >= 0)
        cursor = tb.selectionStart;
    return cursor;
}

function FilterInputNumAndAlfa(event, esAlfa) {
    var keyCode = ('which' in event) ? event.which : event.keyCode;

    isNumeric = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || (keyCode == 8 || (esAlfa ? (keyCode >= 65 && keyCode <= 90) : keyCode == 8));
    modifiers = (event.altKey || event.ctrlKey || event.shiftKey);
    return isNumeric && !modifiers;
}

/// Agregar Responsables para envio de Alertas


function MuestraDivActualizaResponsables() {
    var cadena = '<div id="divBloqVtnActualizaResponsablesGral" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleFormulariosDescargaGral" style="width:100%;height:75%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblActualizaResponsablesGral" style="width:100%;height:100%;overflow: hidden;margin-top: 0px;">  ';
    cadena += '<div id="ActualizaResponsables" style="text-align: center;height: 100%;"> <table width="100%"> <tr><td style="width: 100%; text-align: center"> <b>TABLA DE RESPONSABLES</b> </td></tr><tr style="height:5px"></tr>';
    cadena += '<tr style="height:5px"></tr></table><div id="divResponsables" style="overflow:auto;height:81%"> </div></div>';
    cadena += '</div></div>';
    cadena += "<table style='width:90%;height:8%;margin-left: 29px;'><tr style='height:1%'></tr><tr><td style='text-align:left'></td><td style='text-align:right'><input type='button' id='btnNuevoResponsable' onclick='MostrarVtnAgregarNuevoResponsable();' class='classButton'  value='Agregar Responsable'/></td>";

    $("#dvActualizaResponsablesGral").empty();
    AgregarVtnFlotante("dvActualizaResponsablesGral", "", "AGREGAR / QUITAR RESPONSABLES", "", cadena, 250, 600, false, false, "", "", null);
    WaitingVtn("divBloqVtnActualizaResponsablesGral", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";

    cargarResponsables();
    $('#ResponsablesXARea').html('');
}

function cargarResponsables() {
    WaitingVtn("divBloqVtnActualizaResponsablesGral", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var parametros = { lstNombreResponsable: '', mail: '', lstStatus: '0,', opcion: 1 };
    peticionAjax("Default.aspx/controlResponsablesCapturaVivienda", "POST", parametros, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                var cad = '';
                cad = generarTablaDeRegistrosCalend(JSON);
                $('#divResponsables').html(cad);
                var noFilas = $('#tblResponsablesEnvioAlertas > tbody > tr').length;
                if (ContadorCheck == noFilas)
                    $('#chkHeader').attr('checked', true);
            }
            else {
                $('#divResponsables').html("");
                WaitingVtn("divBloqVtnActualizaResponsablesGral", true, false, "Cargando Información...");
                MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnActualizaResponsablesGral", false, false, "Cargando Información...");
                });
                return;
            }
        }
        else
            MostrarMsj("Error:" + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        WaitingVtn("divBloqVtnActualizaResponsablesGral", false, false, "Cargando Información...");
    }, null);
}

var ContadorCheck = 0;
function generarTablaDeRegistrosCalend(listaDeJSON) {
    var cad = '<center><table id="tblResponsablesEnvioAlertas" width="100%"  class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    ContadorCheck = 0;
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados != "Aplica")
            cad += '<th>' + encabezados.toString() + '</th>';
        else
            cad += '<th>' + encabezados.toString() + '</br><input id="chkHeader" type="checkbox" onclick="SelectTodos(\'Encabezado\',\'chkHeader\');" /></th>';
    }

    cad += '</tr>';
    cad += '</thead>';

    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element != "Aplica")
                cad += '<td>' + json[element] + '</td>';
            else {
                cad += '<td style="text-align:center;"><input alt="' + listaDeJSON[filas].Responsable + '" id="chkCob_' + (filas + 1) + '" type="checkbox" ' + (json[element] == "True" ? 'checked="checked"' : '') + ' onclick="SelectTodos(\'Cuerpo\',\'chkCob_' + (filas + 1) + '\');" /></td>';
                json[element] == "True" ? ContadorCheck = ContadorCheck + 1 : ContadorCheck = ContadorCheck + 0;
            }
        }
        cad += " <td style='width:67px'><span style='text-decoration: underline;color:blue;cursor:pointer;' onclick='EliminarResponsableArea_Click(\"" + listaDeJSON[filas].Responsable + "\");'>Borrar</span></td>";
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}

function SelectTodos(Parte, idObj) {
    var strlstStatus = '';
    var strlstNameRespons = '';
    var noFilas = $('#tblResponsablesEnvioAlertas > tbody > tr').length;
    var i = 0;
    var seleccionados = 0;
    if (Parte == 'Encabezado') {
        for (i = 1; i < noFilas + 1; i++) {
            if ($("#chkHeader").is(':checked') == false) {
                $("#chkCob_" + i.toString()).attr('checked', false);
                strlstStatus += '0,';
                strlstNameRespons += $("#chkCob_" + i.toString()).attr('alt') + ','
            } else {
                $("#chkCob_" + i.toString()).attr('checked', true);
                strlstStatus += '1,';
                strlstNameRespons += $("#chkCob_" + i.toString()).attr('alt') + ',';
            }
        }
    } else {
        for (i = 1; i < noFilas + 1; i++) {
            $("#chkCob_" + i.toString()).is(':checked') == true ? (seleccionados = seleccionados + 1) : (seleccionados = seleccionados + 0);
        }
        seleccionados == noFilas ? $("#chkHeader").attr('checked', true) : $("#chkHeader").attr('checked', false);

        strlstStatus = $("#" + idObj).is(':checked') == true ? '1,' : '0,';
        strlstNameRespons = $("#" + idObj).attr('alt') + ',';
    }

    var parametros = { lstNombreResponsable: strlstNameRespons, mail: '', lstStatus: strlstStatus, opcion: 2 };
    peticionAjax("Default.aspx/controlResponsablesCapturaVivienda", "POST", parametros, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {

        }
        else
            MostrarMsj("Error:" + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        WaitingVtn("divBloqVtnActualizaResponsablesGral", false, false, "Cargando Información...");
    }, null);
}

function EliminarResponsableArea_Click(nombreResponsable) {
    WaitingVtn("divBloqVtnActualizaResponsablesGral", true, false, "Cargando Información...");
    MostrarMsj("¿Esta seguro que desea eliminar el Responsable <span style='font-weight:bold;'>" + nombreResponsable + "</span>? ", "Mensaje SicreNet", true, true, false, "Si", "No", "", 300, 145,
        function () {
            $("#divVentanaMensajes").dialog("close");
            WaitingVtn("divBloqVtnActualizaResponsablesGral", true, true, "Cargando Información...");
            document.getElementById("imgVtnLoading").style.marginTop = "8%";
            var parametros = { lstNombreResponsable: nombreResponsable, mail: '', lstStatus: '0,', opcion: 3 };
            peticionAjax("Default.aspx/controlResponsablesCapturaVivienda", "POST", parametros, function (data) {
                if (data.d.indexOf("ERRORCATCH") == -1)
                    cargarResponsables();
                else {
                    WaitingVtn("divBloqVtnActualizaResponsablesGral", false, false, "Cargando Información...");
                    MostrarMsj("Error:" + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                }
            }, null);
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtnActualizaResponsablesGral", false, false, "Cargando Información...");
    });
}

function MostrarVtnAgregarNuevoResponsable() {
    WaitingVtn("divBloqVtnActualizaResponsablesGral", true, false, "Cargando Información...");
    var cadena = '<div id="divBloqVtnAgregarResponsable" style="width:97%;height:78%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleFormulariosDescarga" style="width:100%;height:56%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblActualizaResponsablesG" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">';
    cadena += '<center><span id="spanTitulo"><b>Nuevo Responsable</b></span></center></br>' +
              '<table style="width: 100%">' +
                '<tr>' +
                    '<td style="width: 20%; text-align: left"><b>Nombre:</b>' +
                    '</td>' +
                    '<td style="width: 80%"><input id="txtNamResponsable"  type="text" maxlength="50" style="width: 80%;" />' +
                    '</td>' +
                '</tr>' +
                '<tr>' +
                    '<td style="width: 20%; text-align: left"><b>Correo:</b>' +
                    '</td>' +
                    '<td style="width: 80%"><input id="txtCorreo"  type="text" maxlength="50" style="width: 80%;" disabled="disabled"/>' +
                    '</td>' +
                '</tr>' +
             '</table>';
    cadena += '</div></div>';
    cadena += "<table style='width:90%;height:8%;margin-left: 29px;'><tr style='height:1%'></tr><tr><td style='text-align:left'></td><td style='text-align:right'><input type='button' onclick='GuardarResponsable();' class='classButton'  value='Agregar Responsable'/></td>";

    $("#dvAgregarResponsable").empty();
    AgregarVtnFlotante("dvAgregarResponsable", "", "AGREGAR RESPONSABLE", "", cadena, 150, 600, false, false, "", "", null);
    setTimeout(responsablesCedula, 1000);
    //    $(".ChangeColorCorreo").css('border', 'solid 1px gray');
    //    $(".ChangeColorNameRes").css('border', 'solid 1px gray');
    $("#dvAgregarResponsable").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtnActualizaResponsablesGral", false, false, "Guardando Información...");
    });
}

var valorName1 = "";
function responsablesCedula() {
    $("#txtNamResponsable").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: false,
        mustMatch: false
    });
    $("#txtNamResponsable").result(function (event, data, formatted) {
        $("#txtNamResponsable").val($(this).val() + ",");

        WaitingVtn("divBloqVtnAgregarResponsable", true, true, "Cargando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "6%";
        var parametros = { empleado: $(this).val().split(',')[0].split(':')[1] };
        peticionAjax("Default.aspx/obtenerCorreo", "POST", parametros, function (data) {
            if (data.d.indexOf("ERRORCATCH") == -1) {
                $("#txtCorreo").val(data.d);
                WaitingVtn("divBloqVtnAgregarResponsable", false, false, "Guardando Información...");
            }
            else {
                MostrarMsj("Error:" + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnAgregarResponsable", false, false, "Guardando Información...");
                });
            }
        }, null);
    });
}

// Pendiente
function GuardarResponsable() {
    if ($("#txtNamResponsable").val() == "") {
        $("#txtNamResponsable").css('border', 'solid 1px red');
        WaitingVtn("divBloqVtnAgregarResponsable", true, false, "Cargando Información...");
        MostrarMsj("Ingrese el Nombre.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnAgregarResponsable", false, false, "Guardando Información...");
        });
        return;
    }
    else
        $("#txtNamResponsable").css('border', 'solid 1px gray');

    if ($("#txtNamResponsable").val().split(',').length == 2 && $("#txtNamResponsable").val().split(',')[0].split(':').length == 2) {
        if ($("#txtCorreo").val() != "") {
            WaitingVtn("divBloqVtnAgregarResponsable", true, true, "Cargando Información...");
            document.getElementById("imgVtnLoading").style.marginTop = "8%";
            var parametros = { lstNombreResponsable: $("#txtNamResponsable").val().split(',')[0].split(':')[0], mail: '', lstStatus: '0,', opcion: 5 };
            peticionAjax("Default.aspx/controlResponsablesCapturaVivienda", "POST", parametros, function (data) {
                if (data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSON(data.d, false);
                        if (parseInt(JSON[0].NoResp) == 0)
                            AgregarResponsable();
                        else {
                            WaitingVtn("divBloqVtnAgregarResponsable", false, false, "Cargando Información...");
                            MostrarMsj("Ya existe el Responsable <span style='font-weight:bold;'>" + $("#txtNamResponsable").val().split(',')[0].split(':')[0] + "</span>", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                        }
                    }
                }
                else {
                    WaitingVtn("divBloqVtnAgregarResponsable", false, false, "Cargando Información...");
                    MostrarMsj("Error:" + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                }
            }, null);
        }
        else {
            WaitingVtn("divBloqVtnAgregarResponsable", true, false, "Guardando Información...");
            MostrarMsj("El Responsable No puede ser Agregado, debido a que no se obtuvo su Correo", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
    }
    else {
        WaitingVtn("divBloqVtnAgregarResponsable", true, false, "Guardando Información...");
        MostrarMsj("Verifique que sea Correcto el Responsable a Agregar", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    }
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtnAgregarResponsable", false, false, "Guardando Información...");
    });
}

function AgregarResponsable() {
    var parametros = { lstNombreResponsable: $("#txtNamResponsable").val().split(',')[0], mail: $("#txtCorreo").val(), lstStatus: '1,', opcion: 4 };
    peticionAjax("Default.aspx/controlResponsablesCapturaVivienda", "POST", parametros, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            $("#dvAgregarResponsable").dialog("close");
            cargarResponsables();
        }
        else {
            WaitingVtn("divBloqVtnAgregarResponsable", true, false, "Cargando Información...");
            MostrarMsj("Error:" + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnAgregarResponsable", false, false, "Guardando Información...");
            });
        }
    }, null);
}