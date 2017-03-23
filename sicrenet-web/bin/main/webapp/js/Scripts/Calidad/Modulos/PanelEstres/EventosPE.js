function btnObtenerMuestre(idFuente, descFuente) {
    switch (idFuente) {
        case "7"/*ARRMTO CRMX*/: callGetMuestra(idFuente, descFuente);
            break;
        default: MostrarMsj("Sin Muestra.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
    }
}

var JSONMuestra = null;
function callGetMuestra(idFuente, descFuente) {
    Waiting(true, "Cargando Información...");
    peticionAjax('PanelEstres.aspx/GetCalidadMuestras', "POST", { idFuente: idFuente },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        JSONMuestra = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);

                        var cadena = '<div id="divBloqVtnListaCampos" style="width:98.5%;height:96%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:99%;overflow:hidden;text-align:center;float:left;">';
                        cadena += '<div id="dvDetalleEITblListaCampos" style="width:100%;height:95%;overflow: auto;">  ';
                        cadena += '</div></br><input type="button" value="Continuar" class="classButton" style="float:right;" onclick="btnContinuarMostrarMuestra(\'' + descFuente + '\')"/></div>';
                        $("#divListaCampos").empty();
                        AgregarVtnFlotante("divListaCampos", "", "LISTA CAMPOS A MOSTRAR (" + descFuente.toUpperCase() + ")", "", cadena, 780, 450, false, false, "", "", null);

                        $("#dvDetalleEITblListaCampos").html(creaTablaListaCampos(JSON));
                    }
                    else
                        MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
                else
                    MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Cargando Información...");
            }, null);
}


function creaTablaListaCampos(listaDeJSON) {
    var cad = '<center><table id="tblLstCamposMostrar" class="dataGridDatos" style="width: 98%;">';
    cad += '<thead>';
    cad += '<tr>';
    cad += '<th>Mostrar</br><input id="chkHeader" type="checkbox" onclick="SelectTodos(\'Encabezado\',\'chkHeader\');" checked="checked"/></th>';
    cad += '<th>Campo</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        cad += '<td style="text-align:center;"><input alt="' + listaDeJSON[filas].NameColumn + '" id="chkCob_' + (filas + 1) + '" type="checkbox" checked="checked" onclick="SelectTodos(\'Cuerpo\',\'chkCob_' + (filas + 1) + '\');" /></td>';
        cad += '<td style="text-align:left;">' + listaDeJSON[filas].NameColumn + '</td>';
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></center>';
    return cad;
}

function SelectTodos(Parte, idObj) {
    var strlstStatus = '';
    var strlstNameRespons = '';
    var noFilas = $('#tblLstCamposMostrar > tbody > tr').length;
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
}

function btnContinuarMostrarMuestra(descFuente) {
    var arrayListaCamposVisisbles = new Array();

    for (i = 1; i < $('#tblLstCamposMostrar > tbody > tr').length + 1; i++) {
        if ($("#chkCob_" + i.toString()).is(':checked') == true)
            arrayListaCamposVisisbles.push($("#chkCob_" + i.toString()).attr('alt'));
    }

    $("#divListaCampos").dialog("close");
    var cadena = '<div id="divBloqVtnTblMuestra" style="width:98.5%;height:97.5%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:99%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblTblMuestra" style="width:100%;height:95%;overflow: auto;">  ';
    cadena += '</div></br><input type="button" value="Guardar" class="classButton" style="float:right;" onclick="btnGuardarMuestra(\'' + descFuente + '\')"/></div>';
    $("#divListaCampos").empty();
    AgregarVtnFlotante("divListaCampos", "", "MUESTRA (" + descFuente.toUpperCase() + ")", "", cadena, 900, 1100, false, false, "", "", null);
    $("#dvDetalleEITblTblMuestra").html(creaTablaMuestra(JSONMuestra, arrayListaCamposVisisbles));
}


function creaTablaMuestra(listaDeJSON, arrayListaCamposVisisbles) {
    var cad = '<center><table id="tblMuestra" class="dataGridDatos" style="width: 98%;">';
    cad += '<thead>';
    cad += '<tr>';
    for (var encabezados in listaDeJSON[0]) {
        if (encabezados != "clear") {
            cad += '<th style="text-align: center;display:' + (DevuelveIndiceDeCampoAMostrar(encabezados, arrayListaCamposVisisbles) != -1 ? 'grid;' : 'none;') + '" >';
            cad += encabezados.toString();
            cad += '</th>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';

    var tabIndexG = 100;
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element != "clear") {
                cad += '<td style="text-align:left;display:' + (DevuelveIndiceDeCampoAMostrar(element, arrayListaCamposVisisbles) != -1 ? 'grid;' : 'none;') + '">';
                cad += '<center><input id="txt_' + filas + "_" + element + '" type="text" style="width:98%" value="' + json[element] + '" tabindex="' + tabIndexG + '"/></center>';
                cad += '</td>';
                tabIndexG++;
            }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}

function DevuelveIndiceDeCampoAMostrar(elemento, arregloIterar) {
    var indexGet = -1;
    for (var i = 0; i < arregloIterar.length; i++) {
        if (arregloIterar[i] == elemento) {
            indexGet = i;
            break;
        }
    }
    return indexGet;
}


function btnGuardarMuestra(descFuente) {
    var strDatos = "";
    for (i = 1; i < $('#tblMuestra > tbody > tr').length + 1; i++) {
        for (var nameCol in JSONMuestra[0]) {
            strDatos += $("#txt_" + (i - 1) + "_" + nameCol).val() + "|";
            document.getElementById("txt_" + (i - 1) + "_" + nameCol).style.border = "1px solid Gray";
        }

        strDatos = strDatos.substring(0, strDatos.length - 1) + "°";
    }
    strDatos = strDatos.substring(0, strDatos.length - 1);


    WaitingVtn("divBloqVtnTblMuestra", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "35%";
    peticionAjax('PanelEstres.aspx/ValidarDatos', "POST", { strDatos: strDatos },
            function (data) {
                WaitingVtn("divBloqVtnTblMuestra", false, false, "Cargando Información...");
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        WaitingVtn("divBloqVtnTblMuestra", true, false, "Cargando Información...");
                        var JSON = obtenerArregloDeJSON(data.d, false);
                        var cadena = '<div id="divBloqVtnTblIncidenciasMuestra" style="width:98.5%;height:96%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:99%;overflow:hidden;text-align:center;float:left;">';
                        cadena += '<div id="dvDetalleEITblTblIncidenciasMuestra" style="width:100%;height:98%;overflow: auto;">  ';
                        cadena += '</div></div>';
                        $("#divIncidenciasMuestra").empty();
                        AgregarVtnFlotante("divIncidenciasMuestra", "", "INCIDENCIAS MUESTRA (" + descFuente.toUpperCase() + ")", "", cadena, 500, 400, false, false, "", "", null);
                        $("#dvDetalleEITblTblIncidenciasMuestra").html(creaTablaIncidencias(JSON));

                        $("#divIncidenciasMuestra").on("dialogclose", function (event, ui) {
                            WaitingVtn("divBloqVtnTblMuestra", false, false, "");
                        });
                    }
                    else
                        MostrarMsj("Datos Validados exitosamente.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
                else
                    MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }, null);
}


function creaTablaIncidencias(listaDeJSON) {
    var cad = '<center><div class="divContenidoTabla"><table class="dataGridDatos" style="width: 98%;">';
    cad += '<thead>';
    cad += '<tr>';
    for (var encabezados in listaDeJSON[0]) {
        if (encabezados != "clear") {
            cad += '<th style="text-align: center;" >';
            cad += encabezados.toString();
            cad += '</th>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        $("#txt_" + (parseInt(listaDeJSON[filas].FNFila) - 1) + "_" + listaDeJSON[filas].FVCCampo).css("border-color", "red");
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td style="text-align:left;" >';
            cad += json[element];
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div></center>';
    return cad;
}