

function VerCedulaValidacioneEtapaII(idFuente, idValidacion, fuente, validacion, idMet, fase, esSIC) {
    WaitingVtn("divBloqVtnVerValidacionesMet", true, false, "");
    WaitingVtn("divBloqVtnVerIncidencias", true, false, "");
    var cadena = '<div id="divBloqVtnVerCedulaValidacionesMet" style="width:96%;height:95%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">'
    cadena += '<div id="dvDetalleEITblVerCedulaValidacionesMet" style="width:100%;height:97%;overflow-y: auto;overflow-x: hidden;margin-top: 0px;">  ';
    cadena += '</div></div>';
    $("#divVtnVerCedulaValidacioneMet").empty();
    AgregarVtnFlotante("divVtnVerCedulaValidacioneMet", "btnEditaCedulaVal", "CÉDULA VALIDACIONES " + fuente + validacion!="undefined"? (" (" + validacion.toUpperCase() + ")"):"", "", cadena,550, 550, false, false, "Editar Cédula", "", function GuardarEditarCedulaValidacionesEtapaII() {
        if (document.getElementById("btnEditaCedulaVal") != null) {
            $(".ui-button-text").html('Guardar Cambios');
            $(".ui-button-text").attr("id", "btnSaveCedulaVal");
            CambiaAEditableCedulaValidaciones(true);

        } else {
            GuardarCedulaValidaciones(idFuente, idValidacion, fuente, validacion);
        }
    });
    WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "40%";
    var parametrosVerVal = { IdFuente: idFuente, idValidacion: (idValidacion != "" ? idValidacion : 0), idMet: idMet, fase: fase, fechaPeriodo: fechaP.split(",")[0] + fechaP.split(",")[1] + fechaP.split(",")[2], esSIC: esSIC, periodicidad: periocidadSelectXUser };
    peticionAjax("PanelDeControl.aspx/GetTableroMuestraCedulaValidacionesEII", "POST", parametrosVerVal, function (data) {
        if (data.d == "" || data.d == null || data.d.indexOf("Error") != -1) {
            WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "Cargando Información...");
            $("#divVtnVerCedulaValidacioneMet").dialog("close");
            WaitingVtn("divBloqVtnVerValidacionesMet", true, false, "");
            WaitingVtn("divBloqVtnVerIncidencias", true, false, "");
            MostrarMsj((data.d == "" || data.d == null ? "Sin Datos." : data.d), "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
                WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
                WaitingVtn("divBloqVtnVerIncidencias", false, false, "");
                $("#divVentanaMensajes").dialog("close");
            }, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
                WaitingVtn("divBloqVtnVerIncidencias", false, false, "");
            });
            return;
        }
        var JSON = obtenerArregloDeJSON(data.d, false);
        $("#divVtnVerCedulaValidacioneMet").dialog("option", "title", "CÉDULA VALIDACIONES " + fuente + (JSON[0].DESCRIPCION != undefined && JSON[0].DESCRIPCION != "" ? " (" + JSON[0].DESCRIPCION + ")" : "") + "\"" + (validacion!="undefined"?validacion.toUpperCase():(idFuente!=undefined?idFuente.toUpperCase():"")) + "\"");                
        $("#dvDetalleEITblVerCedulaValidacionesMet").html(generarTablaDeRegistrosCedulaVal(JSON));
        $("#payments").msDropdown();
        $("#payments2").msDropdown();
        document.getElementById("payments") != null ? document.getElementById("payments").style.height = "auto" : null;
        document.getElementById("payments2_child") != null ? document.getElementById("payments2_child").style.height = "auto" : null;
        WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "Cargando Información...");
    }, null);
    $("#divVtnVerCedulaValidacioneMet").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
        WaitingVtn("divBloqVtnVerIncidencias", false, false, "");
    });
}

function GuardarCedulaValidaciones(idFuente, idValidacion, fuente, validacion) {
    WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, true, "Guardando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "40%";
    var parametros = '';
    parametros = {
        IdFuente: idFuente,
        idValidacion: idValidacion,
        campo: $('#lbEdit_5').val(),
        estructura: $('#lbEdit_6').val() != undefined ? $('#lbEdit_6').val() : "",
        simbologia: $('#lbEdit_7').val(),
        afecta: $('#lbEdit_8').val(),
        implicaciones: $('#lbEdit_9').val(),
        envioIncidencia: $('#lbEdit_10').val(),
        responsable: $('#lbEdit_11').val(),
        enterado: $('#lbEdit_12').val(),
        requerimiento: $('#lbEdit_13').val(),
        subsidio: $('#lbEdit_14').val()
    }
    peticionAjax('PanelDeControl.aspx/EditaCedulaValidacionesEII', "POST", parametros, function GuardaCedula_Finish(data) {
        WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "Cargando Información...");
        if (data.d == "Error") {
            WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, false, "");
            MostrarMsj("Error al guardar.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
                WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "");
                $("#divVentanaMensajes").dialog("close");
            }, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "");
            });
            return;
        }
        $(".ui-button-text").attr("id", "btnEditaCedulaVal");
        $(".ui-button-text").html('Editar Cédula');
        CambiaAEditableCedulaValidaciones(false);
        $("#divVtnVerCedulaValidacioneMet").dialog("close");
        WaitingVtn("divBloqVtnVerValidacionesMet", true, false, "");
        WaitingVtn("divBloqVtnVerIncidencias", true, false, "");
        MostrarMsj("Información Almacenda Correctamente", " AVISO " + fuente + " (" + validacion.toUpperCase() + ")", false, true, false, "", "Aceptar", "", 280, 100, null, function () {
            WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
            WaitingVtn("divBloqVtnVerIncidencias", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
            WaitingVtn("divBloqVtnVerIncidencias", false, false, "");
        });
    }, null);
}

function generarTablaDeRegistrosCedulaVal(listaDeJSON) {
    var encabezadoAux = '';
    var cad = '<center><table id="tblContenidoValidacionesCedula" width="100%" class="dataGridDatos" style="font-size: 9px;height:99%">';

    cad += '<thead>';
    cad += '<tr style="font-size: 9px;">';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON)
        cad += '<th>' + encabezados.toString() + '</th>';


    cad += '</tr>';
    cad += '</thead>';

    var cadSec = '';
    var i = 0;
    var contar = 0;
    var start = 0;
    var Contador = 0;

    cad += '<tbody style="font-size: 9px;">';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row" style="font-size: 9px;" >' : '<tr class="alternateRow" style="font-size: 9px;">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element == 'CONCEPTO') {
                cad += '<td style="text-align:left;width:30%;  height: 25x;font-size: 9px;">';
            } else {
                cad += '<td style="text-align:left;width:70%;  height: 25px;font-size: 9px;">';
            }

            if (element == 'DESCRIPCION' && (json["CONCEPTO"] == 'CLAVE' || json["CONCEPTO"] == 'PAIS' || json["CONCEPTO"] == 'SISTEMA' || json["CONCEPTO"] == 'ARCHIVO' || json["CONCEPTO"] == 'ETAPA DE VALIDACION' || json["CONCEPTO"] == 'SUB ETAPA DE VALIDACION' || json["CONCEPTO"] == "CAMPO, DATO VALIDADO" || json["CONCEPTO"] == "ESTRUCTURA DE LA VALIDACION" || json["CONCEPTO"] == "ESTRUCTURA DE LA VALIDACION VALIDACION")) {

                cadSec =  json["DESCRIPCION"].split('&&').join('\\');  //cadSec = json["DESCRIPCION"];
                while ((start = cadSec.indexOf("#", start) + 1) > 0)
                    contar++;

                for (i = 0; i < contar; i++)
                    cadSec = cadSec.replace('#', '\\');

                cad += '<div id="' + json["CONCEPTO"] + '" style="width:100%;font-size: 8px;" class="divNoInfo">';
                cad += '<textarea cols="30" rows="2" id="Ruta' + Contador + '"  disabled="disabled" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:transparent;width:100%; text-align:left; border: none;height:25px;color: rgb(0, 0, 0);" >' + cadSec + "</textarea>";
                cad += '</div>';

                cad += '<div id="Edit_' + json["CONCEPTO"] + '" style="width:100%;background-color:White; display:none;font-size: 8px;" class="divNoEdit">';
                cad += '<textarea cols="30" rows="2" id="RutaEdit' + Contador + '"  style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;width:100%; text-align:left; background-color:White;border: x;height:25px" >' + cadSec + "</textarea>";
                cad += '</div>';
            } else if (element == 'DESCRIPCION') {
                cad += '<div id="' + json["CONCEPTO"] + '" style="width:100%;font-size: 9px;" class="divInfo">';
                //if (filas != 3 && filas != 4 && filas != 9 && filas != 10 && filas != 11 && filas != 12)
                //  cad += '<input id="lb_' + Contador + '" value="' + json[element] + '" disabled="disabled"  style="background-color:transparent;width:99.3%; text-align:left; border: none;font-size: 9px;height: 14px; " />';
                //else
                if (element == 'DESCRIPCION' && json["CONCEPTO"] == 'SIMBOLOGIA')
                    cad += '<div> ' + (json[element] != "" ? ('<span class="' + (json[element] == "WARNING" ? 'EstatusNaranja' : 'EstatusRojo') + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>') : '') + (json[element] != "" ? "&nbsp&nbsp" + json[element] : "SIN SIMBOLOGÍA") + '</div>'; // <select id="payments" name="payments" style="width:100%;height: auto;background-color:transparent;"   ><option data-image="../../images/PanelDeControl/warning.png" ' + (json[element] == "WARNING" ? 'selected="selected"' : '') + '>WARNING </option><option data-image="../../images/PanelDeControl/error.png" ' + (json[element] == "ERROR" ? 'selected="selected"' : '') + ' >ERROR </option></select>';
                else if (element == 'DESCRIPCION' && json["CONCEPTO"] != 'SIMBOLOGIA') {
                    var re = /&&/g;
                    cad += '<textarea cols="30" rows="' + ((filas == 4 || filas == 7) ? "4" : "2") + '" id="lb_' + Contador + '"  disabled="disabled" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:transparent;width:100%; text-align:left; border: none;height:25px;color: rgb(0, 0, 0);" >' + json[element].replace(re, '\\') + "</textarea>";
                }
                cad += '</div>';

                cad += '<div id="Edit_' + json["CONCEPTO"] + '" style="width:100%;background-color:White; display:none;font-size: 9px;" class="divEdit">';
                // if (filas != 3 && filas != 4 && filas != 9 && filas != 10 && filas != 11 && filas != 12)
                //   cad += '<input id="lbEdit_' + Contador + '" value="' + json[element] + '" style="background-color:White;color:Black; width:99.3%; text-align:left;font-size: 9px;height:14px" />';
                //else
                if (element == 'DESCRIPCION' && json["CONCEPTO"] == 'SIMBOLOGIA')
                    cad += '<select id="payments2" name="payments2" style="width:100%;height: auto"><option data-image="../../images/PanelDeControl/warning.png" ' + (json[element] == "WARNING" ? 'selected="selected"' : '') + '>WARNING </option><option data-image="../../images/PanelDeControl/error.png" ' + (json[element] == "ERROR" ? 'selected="selected"' : '') + '>ERROR </option></select>';
                else if (element == 'DESCRIPCION' && json["CONCEPTO"] != 'SIMBOLOGIA')
                    cad += '<textarea cols="30" rows="' + ((filas == 4 || filas == 7) ? "3" : "2") + '" id="lbEdit_' + Contador + '" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:100%; text-align:left; border: x;height:25px" >' + json[element].replace('&&', '\\') + "</textarea>";
                cad += '</div>';
            }
            else {
                cad += json[element];
            }
            cad += '</td>';
        }
        Contador = Contador + 1;
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}

function CambiaAEditableCedulaValidaciones(esEditable) {
    if (esEditable == true) {
        $(".divInfo").hide();
        $(".divEdit").show();
    }
    else {
        $(".divInfo").show();
        $(".divEdit").hide();
    }
}