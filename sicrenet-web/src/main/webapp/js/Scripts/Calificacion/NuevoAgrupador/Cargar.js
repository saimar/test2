$(function () {
});

var PaisSelecXUser = "";
function getFechaUltimaCarga() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Cargar.aspx/DevuelveFechaUltimaCarga", "POST", { idPais: PaisSelecXUser }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                lblError.style.color = "Green";
                $("#lblError").html("Última carga de archivo " + data.d.split("%%&&")[0] + (data.d.split("%%&&").length > 1 ? " País:" + data.d.split("%%&&")[1] : ""));
            }
        }
        else
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function CargarArchivo() {
    var cadena = '<div id="divBloqVtndivCargaFileAgrupador" style="width:98%;height:85%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
    cadena += '<div style="height: 80%;"> <div id="divVentanaCargaFileAgrupadorTemp" style="height: 100%;"> <center id="ctMain" > <table border="0" cellpadding="0" cellspacing="0">';
    cadena += ' <tbody><tr>  <td style="height: 5px;">  </td>';
    cadena += ' <td class="TextBoxArribaCentro" colspan="3" style="height: 25px;font: normal 10px Helvetica, Arial, sans-serif;" align="left"> &nbsp;<input type="file" name="AjaxUpload" id="AjaxUpload" style="font-family:Arial;font-size:X-Small;width:441px;">';
    cadena += '</td><td class="TextBoxArribaDerecha" style="height: 25px">&nbsp;';
    cadena += '<input type="button" name="btnLoad" value="Cargar Archivo" id="btnCargarArchivo" class="classButton" style="font-family:Arial;font-size:X-Small;" onclick="return enviarArchivoAsincronamente(this,true);"></td></tr>';
    cadena += '<tr><td></td><td colspan="3"><span id="labelMsjUltimo" style="display:none">Último archivo cargado:</span><span id="lblMensaje" style="color:Green;font-size:XX-Small;"></span></td><td></td></tr>';
    cadena += '<tr><td class="TextBoxCentroIzquierda" style="width: 20px; height: 20px">';
    cadena += '&nbsp;</td><td class="TextBoxCentroCentro" style="width: 32px">&nbsp;</td><td class="TextBoxCentroCentro" style="width: 20px">&nbsp;</td><td class="TextBoxCentroCentro" style="width: 400px"><div id="divTextoMensaje"></div>';
    cadena += '</td></tr><tr><td class="TextBoxAbajoIzquierda">';
    cadena += '&nbsp;</td><td class="TextBoxAbajoCentro" colspan="3" style="height: 20px;font: normal 12px Helvetica, Arial, sans-serif;">&nbsp;<span id="lblError" style="color:Red;font-weight:bold;"></span></td>';
    cadena += '</tr>';
    cadena += '<tr><td class="TextBoxAreaBotones" colspan="5" style="height: 14px;font: normal 12px Helvetica, Arial, sans-serif;white-space:pre-wrap;text-align: right;"><strong>Nota:</strong>Archivo en Formato txt, separado por Tabuladores.';
    cadena += '</td></tr>';
    cadena += '<tr><td></td><td style="width: 10%;"><a runat="server" id="ExpanderGrid" style="font: normal 12px Helvetica, Arial, sans-serif;color:Black;float: left;display:none;" >';
    cadena += ' <img src="../../Images/PanelDeControl/Expander/insert.jpg" id="insert2" style="vertical-align: middle;cursor:pointer;"';
    cadena += ' onclick="MostrarOcultarTablas(\'div2\',this.id,\'vtnH\',\'divCargaFileAgrupador\');" alt="expander" />Tablas</a></td></tr></tbody></table></center>';
    cadena += '<div id="div2" runat="server" style="display: none; overflow: auto; margin: -1px;"><div id="divTablas" ><div id="divNuevasAgrupadas" style="text-align: left; width: 100%; overflow: auto">' +
                        '</div><br /><div id="divNuevasNoAgrupadas" style="text-align: left;"></div><br /><div id="divDiferenteDescripcion" style="text-align: left;"></div></div></div>';
    cadena += '</div></div>';
    $("#divCargaFileAgrupador").empty();
    $("#divCargaFileAgrupador").html(cadena);
    AgregarVtnFlotante("divCargaFileAgrupador", "", "CARGA ARCHIVO AGRUPADOR", "", cadena, 160, 650, false, false, "", "", null);
    $("#divCargaFileAgrupador").dialog("option", "minHeight", 250);
    $("#divCargaFileAgrupador").dialog("option", "minWidth", 650);
    $("#divCargaFileAgrupador").bind("dialogresize", function (event, ui) {
        document.getElementById("div2").style.height = (parseInt(document.getElementById("divCargaFileAgrupador").offsetHeight) - parseInt(document.getElementById("ctMain").offsetHeight) - 21) + "px";
        document.getElementById("div2").style.width = (parseInt(document.getElementById("divCargaFileAgrupador").offsetWidth) - 22) + "px";
    });
    entroCloseDivCargaFileAgrupador = false;
    $("#divCargaFileAgrupador").on("dialogclose", function (event, ui) {
        if (seCargoFile && !entroCloseDivCargaFileAgrupador) {
            esLoad = true;
            seCargoFile = false;
            CargarTablaAllUnidadesDeNegocio();
        }
        entroCloseDivCargaFileAgrupador = true;
    });

    WaitingVtn("divBloqVtndivCargaFileAgrupador", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "5%";
    peticionAjax("Cargar.aspx/DevuelveFechaUltimaCarga", "POST", { idPais: PaisSelecXUser }, function (data) {
        if (data.d != "") {
            document.getElementById("lblError").style.color = "Green";
            $("#lblError").html("Última carga de archivo " + data.d.split("%%&&")[0] + (data.d.split("%%&&").length > 1 ? " País:" + data.d.split("%%&&")[1] : ""));
        }
        WaitingVtn("divBloqVtndivCargaFileAgrupador", false, false, "Cargando Información...");
    }, null);
}

var entroCloseDivCargaFileAgrupador = false;
function MostrarOcultarTablas(did, idImg, vtnH, vtnP) {
    if (document.getElementById(did).style.display == "none") {
        document.getElementById(idImg).setAttribute('src', '../../Images/PanelDeControl/Expander/remove.jpg');
        document.getElementById(did).style.display = "block";
        $("#divCargaFileAgrupador").dialog("option", "height", 250);
        document.getElementById("div2").style.height = (parseInt(document.getElementById("divCargaFileAgrupador").offsetHeight) - parseInt(document.getElementById("ctMain").offsetHeight) - 21) + "px";
        document.getElementById("div2").style.width = (parseInt(document.getElementById("divCargaFileAgrupador").offsetWidth) - 22) + "px";
    }
    else {
        document.getElementById(did).style.display = "none";
        document.getElementById(idImg).setAttribute('src', '../../Images/PanelDeControl/Expander/insert.jpg');
        $("#divCargaFileAgrupador").dialog("option", "height", 160);
        $("#divCargaFileAgrupador").dialog("option", "width", 650);
    }
    $(".divVtnsFlotantes").parent().parent().position({
        my: "center",
        at: "center",
        of: window
    });
}

//----------------BTN CARGAR
function enviarArchivoAsincronamente(obj, escargaDeAgrupador) {
    if (!validarExistenciaDeArchivo($(obj).parent().parent().find("input:file"))) {
        return false;
    }
    var idInputFile = $(obj).parent().parent().find("input:file").attr("id");
    var parametros = { 'subirArchivo': 'subirArchivo', 'idPais': PaisSelecXUser };
    return ajaxFileUpload(idInputFile, obj, parametros, escargaDeAgrupador);
}
function validarExistenciaDeArchivo(obj) {
    var bandera = false;
    if ($(obj).val() != undefined && ($(obj).val() == '' || $(obj).val().toUpperCase().indexOf('.TXT') == -1)) {
        WaitingVtn("divBloqVtndivCargaFileAgrupador", true, false, "Cargando Información...");
        MostrarMsj("Debe seleccionar un archivo .txt", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () {
            WaitingVtn("divBloqVtndivCargaFileAgrupador", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivCargaFileAgrupador", false, false, "");
        });
        bandera = false;
    }
    else {
        bandera = true;
    }
    return bandera;
}

var seCargoFile = false;
function ajaxFileUpload(idInputFile, obj, parametros, escargaDeAgrupador) {
    if (!escargaDeAgrupador)
        Waiting(true, "Espere por favor. Cargando Información...");
    else {
        WaitingVtn("divBloqVtndivCargaFileAgrupador", true, true, "Cargando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "5%";
    }
    jQuery.ajaxFileUpload
		    ({
		        url: 'Cargar.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaDeArchivo(data, obj);
		        }
		    });
    return false;
}

function reportarStatusDeSubidaDeArchivo(data, obj) {
    data = data.toString().replace("<pre>", "").replace("</pre>", "").replace("<PRE>", "").replace("</PRE>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "");

    if (data.indexOf('CargarTablas') != -1) {
        lblError.style.color = "Green";
        $("#ExpanderGrid").show();
        seCargoFile = true;
        CargarTablas();
    }
    if (data.indexOf('MostrarMsjUtilidadesPendientesAutorizar') != -1) {
        lblError.style.color = "Red";
        $("#lblError").html("No se ha podido cargar el archivo por que hay unidades pendientes de autorizar.");
        Waiting(false, "Espere por favor. Cargando Información...");
        WaitingVtn("divBloqVtndivCargaFileAgrupador", false, false, "");
        $("#ExpanderGrid").hide();
    }
    else if (data.indexOf('ErrorCATCH') != -1) {
        lblError.style.color = "Red";
        $("#lblError").html(data);
        Waiting(false, "Espere por favor. Cargando Información...");
        WaitingVtn("divBloqVtndivCargaFileAgrupador", false, false, "");
        $("#ExpanderGrid").hide();
    }
}

var opcionCargaTablas = 1;
function CargarTablas() {
    peticionAjax("Cargar.aspx/GetProductoContableAgrupadas", "POST", { opcion: opcionCargaTablas }, function (data) {
        lblError.style.color = "Green";
        var JSON = null; var spanMensaje = "";
        if (data.d != "")
            JSON = obtenerArregloDeJSON(data.d, false);
        spanMensaje = "<div style='width:100%;text-align: center;'><span style='font: normal 13px Helvetica, Arial, sans-serif;font-weight: bold;text-shadow: 2px 2px 2px rgb(128, 128, 128);'>" + (data.d != "" ? "Registros " : "No hay registros ") + (opcionCargaTablas == 1 ? "Nuevos Agrupados" : (opcionCargaTablas == 2 ? "Nuevos No Agrupados" : "con Descripción Diferente")) + " </span></div>";
        if (opcionCargaTablas == 1)
            $("#divNuevasAgrupadas").html(spanMensaje + "<br />" + (JSON != null ? generarTablaDeRegistrosSinFoot1(JSON) : ""));
        if (opcionCargaTablas == 2)
            $("#divNuevasNoAgrupadas").html(spanMensaje + "<br />" + (JSON != null ? generarTablaDeRegistrosSinFoot1(JSON) : ""));
        if (opcionCargaTablas == 3) {
            $("#divDiferenteDescripcion").html(spanMensaje + "<br />" + (JSON != null ? generarTablaDeRegistrosSinFoot1(JSON) : ""));
            $("#lblError").html("Archivo Cargado Correctamente");
        }
        opcionCargaTablas++;
        if (opcionCargaTablas < 4) {
            CargarTablas();
        }
        else {
            opcionCargaTablas = 1;
            Waiting(false, "Espere por favor. Cargando Información...");
            WaitingVtn("divBloqVtndivCargaFileAgrupador", false, false, "");
        }
    }, null)
}
 