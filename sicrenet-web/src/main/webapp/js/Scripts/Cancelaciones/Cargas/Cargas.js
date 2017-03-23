$(document).ready(function () {
});

var Fecha = "";
function llenarAños() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/DevuelveAñosMesActual', "POST", null, function DevuelveAñosMesActual_Finish(data1) {
        Fecha = data1.d.split(":")[0] + ":" + data1.d.split(":")[1];
        var esteAño = data1.d.split(":")[0];
        var esteTrimestre = Math.ceil((parseInt(data1.d.split(":")[1]) + 1) / 3) - 1;
        var esteMes = (parseInt(data1.d.split(":")[1]) + 1) - 1;

        if (esteAño < 2013) {
            if (esteTrimestre == 0) {
                esteAño = esteAño - 1;
            }
        }
        else {
            if (esteMes == 0) {
                esteAño = esteAño - 1;
            }
        }

        document.getElementById('selectAño').options.length = 0;
        for (var i = 2008; i <= esteAño; i++) {
            var esteAñoCorto = i % 100;
            var acom = esteAñoCorto.toString();
            if (acom.length == 1) {
                acom = '0' + esteAñoCorto;
            }
            var opcion = new Option(i, acom);
            try {
                document.getElementById('selectAño').options[document.getElementById('selectAño').options.length] = opcion;
                document.getElementById('selectAño').options[document.getElementById('selectAño').options.length - 1].title = i;
            }
            catch (e) {
                MostrarMsj("Error: Favor de comunicarse a la extensión 79776." + e, "Mensaje", false, true, false, "", "Aceptar", "", 250, 150, null, null, null);
            }
        }
        document.getElementById('selectAño').selectedIndex = document.getElementById('selectAño').options.length - 1;
        llenarTrimestres();
        GetPeriodos();
    }, null);
}

function llenarTrimestres() {
    var añoSeleccionado = document.getElementById('selectAño').options[document.getElementById('selectAño').selectedIndex].text;
    var esteAño = Fecha.split(":")[0];
    var ultimoTrimestre = 4;
    var añoS = parseInt(añoSeleccionado);
    var ultimoMes = 12;
    document.getElementById('selectTrimestre').options.length = 0;

    if (añoS < 2013) {
        if (añoSeleccionado == esteAño) {
            ultimoTrimestre = Math.ceil((parseInt(Fecha.split(":")[1]) + 1) / 3) - 1;

            if (ultimoTrimestre == 0) {
                ultimoTrimestre = 4;
            }
            if (añoS == 2012) {
                ultimoTrimestre = 3;
            }
        }
        for (var i = 1; i <= ultimoTrimestre; i++) {
            var opcion = new Option(i + 'T', i + 'T');
            try {
                document.getElementById('selectTrimestre').options[document.getElementById('selectTrimestre').options.length] = opcion;
                document.getElementById('selectTrimestre').options[document.getElementById('selectTrimestre').options.length - 1].title = 'Trimestre ' + i;
            }
            catch (e) {
                MostrarMsj("Error: Favor de comunicarse a la extensión 79701." + e, "Mensaje", false, true, false, "", "Aceptar", "", 250, 150, null, null, null);
            }
        }
        if (añoS == 2012) {
            if (añoSeleccionado == esteAño) {
                ultimoMes = (parseInt(Fecha.split(":")[1]) + 1) - 1;
            }
            for (var j = 7; j <= ultimoMes; j++) {
                if (j != 8 && j != 9) {
                    var opcion2 = new Option(j + 'M', j + 'M');
                    try {
                        document.getElementById('selectTrimestre').options[document.getElementById('selectTrimestre').options.length] = opcion2;
                        document.getElementById('selectTrimestre').options[document.getElementById('selectTrimestre').options.length - 1].title = 'Mes ' + j;
                    }
                    catch (e) {
                        MostrarMsj("Error: Favor de comunicarse a la extensión 79701." + e, "Mensaje", false, true, false, "", "Aceptar", "", 250, 150, null, null, null);
                    }
                }
            }
        }
    }
    else {
        if (añoSeleccionado == esteAño) {
            ultimoMes = (parseInt(Fecha.split(":")[1]) + 1) - 1;
        }
        for (var j = 1; j <= ultimoMes; j++) {
            var opcion2 = new Option(j + 'M', j + 'M');
            try {
                document.getElementById('selectTrimestre').options[document.getElementById('selectTrimestre').options.length] = opcion2;
                document.getElementById('selectTrimestre').options[document.getElementById('selectTrimestre').options.length - 1].title = 'Mes ' + j;
            }
            catch (e) {
                MostrarMsj("Error: Favor de comunicarse a la extensión 79701." + e, "Mensaje", false, true, false, "", "Aceptar", "", 250, 150, null, null, null);
            }
        }
    }
    document.getElementById('selectTrimestre').selectedIndex = document.getElementById('selectTrimestre').options.length - 1;
}

function GetPeriodos() {
    peticionAjax("Default.aspx/getPeriodosCan", "POST", null, function (data) {
        var arrayJSON = obtenerArregloDeJSON(data.d, false);
        var cad = "";
        for (var x = 0; x < arrayJSON.length; x++) {
            var json = arrayJSON[x];
            cad += '<option value="' + json.IdOpcion + '">';
            cad += json.Descripcion;
            cad += '</option>';
        }
        $('#slPeriodo').html(cad);
        $("#slPeriodo").val(arrayJSON[0].IdOpcion);
        ObtenrInfoI(arrayJSON[0].IdOpcion);
    }, null);
}

function ObtenrInfoI(Periodo) {
    var parametros = { IdPeriodo: Periodo }
    peticionAjax("Default.aspx/obtieneTabInicial", "POST", parametros, function (data) {
        var arrayJSON = obtenerArregloDeJSON(data.d, false);
        var cad = '';
        cad = generarTablaDeRegistrosCargas(arrayJSON);
        $('#dvInfoValidadorCargas').html('<br /><br />' + cad);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function generarTablaDeRegistrosCargas(listaDeJSON) {
    var cad = '<center><table style="width: 90%;">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados.toString() != 'Estatus') {
            if (encabezados.toString() == 'No.')
                cad += '<th style="width:5%">';
            else if (encabezados.toString() == 'Chck' || encabezados.toString() == 'Semáforo')
                cad += '<th style="width:10%">';
            else
                cad += '<th style="width:19%">';

            cad += ((encabezados.toString() == 'Chck') ? "" : encabezados.toString());
            cad += '</th>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';

    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element != 'Estatus') {
                if (element == "Actividad")
                    cad += '<td align="left" style="heigth:25px;width: 26%;">';
                else if (element == "Chck")
                    cad += '<td align="center" style="heigth:25px;width: 10%;">';
                else
                    cad += '<td>';
                if (element == 'Chck') {
                    var isDisabled = false;
                    if (listaDeJSON[0]["Semáforo"] == '0' || listaDeJSON[1]["Semáforo"] == '0' || listaDeJSON[2]["Semáforo"] == '0')
                        isDisabled = EsDisabled(json["No."], false, false, false, true, true, true, true);
                    if (listaDeJSON[0]["Semáforo"] == '1' && listaDeJSON[1]["Semáforo"] == '1' && listaDeJSON[2]["Semáforo"] == '1')
                        isDisabled = EsDisabled(json["No."], true, true, true, (listaDeJSON[3]["No."] == "4" ? false : true), (listaDeJSON[3]["No."] == "5" ? false : true), (listaDeJSON[3]["No."] == "6" ? false : true), (listaDeJSON[3]["No."] == "7" ? false : true));
                    if (listaDeJSON[0]["Semáforo"] == '1' && listaDeJSON[1]["Semáforo"] == '1' && listaDeJSON[2]["Semáforo"] == '1' && listaDeJSON[3]["Semáforo"] == '1')
                        isDisabled = EsDisabled(json["No."], true, true, true, true, false, true, true);
                    if (listaDeJSON[0]["Semáforo"] == '1' && listaDeJSON[1]["Semáforo"] == '1' && listaDeJSON[2]["Semáforo"] == '1' && listaDeJSON[3]["Semáforo"] == '1' && listaDeJSON[4] != undefined && listaDeJSON[4]["Semáforo"] == '1')
                        isDisabled = EsDisabled(json["No."], true, true, true, true, true, false, false);
                    if (listaDeJSON[0]["Semáforo"] == '1' && listaDeJSON[1]["Semáforo"] == '1' && listaDeJSON[2]["Semáforo"] == '1' && listaDeJSON[3]["Semáforo"] == '1' && listaDeJSON[4] != undefined && listaDeJSON[4]["Semáforo"] == '1' && listaDeJSON[5] != undefined && listaDeJSON[5]["Semáforo"] == '1' && listaDeJSON[6] != undefined && listaDeJSON[6]["Semáforo"] == '1')
                        isDisabled = EsDisabled(json["No."], true, true, true, true, true, true, true);

                    cad += '<input id="chk_' + json["No."] + '" type="checkbox" ' + (listaDeJSON[filas]["Semáforo"] == '1' ? 'checked="checked" ' : '') + (isDisabled ? " disabled='disabled'" : "") + ' onclick="OnCheck_Checked(\'' + json["No."] + "\',\'" + json["Actividad"] + '\',this);" />';

                } else if (element == 'Semáforo') {
                    if (json[element] == '0')
                        cad += '<img src="../../Images/Grales/Semaforos/punto-rojo2.png" />';
                    else
                        cad += '<img src="../../Images/Grales/Semaforos/punto-verde2.png" />';
                    if (listaDeJSON[filas]["Estatus"] == '3')
                        cad += '<img src="../../Images/Cancelaciones/Cargas/warning.png" title="Clic para Ver Detalle" style="width:20px;height:20px;float: right;cursor: pointer;" onclick="VerDetalleProceso(\'' + json["No."] + "\',\'" + json["Actividad"] + '\');"/>';
                } else if (element == 'Comentario') {
                    if (json[element] == '0')
                        cad += 'Pendiente';
                    else
                        cad += 'Actividad Concluida';
                } else {
                    cad += json[element];
                }
                if ((json.Chck == '1' || (listaDeJSON[0]["Chck"] == '1' && listaDeJSON[1]["Chck"] == '1' && json["No."] == "3")) && element == 'Actividad' && (json["No."] == "3" || json["No."] == "4" || json["No."] == "6" || json["No."] == "7")) {
                    cad += '&nbsp;&nbsp;&nbsp;<img src="../../Images/Cancelaciones/Cargas/buscar.png" onclick="GetCifrasControl(\'' + json["No."] + "\',\'" + json["Actividad"] + '\')" width="12px" height="12px" class="imgCrecerSmall"/>';
                }

                if (json.Chck == '0' && element == 'Actividad' && filas == 4) {
                    cad += '<div id="pwidget" style="width:120px; height:7px; text-align:left">'
                        + ' <div id="Progressbar"style="width:120px; height:7px; text-align:left;border-radius: 5px;border: #999 solid 1px;display: none;">' +
                                '<div id="indicatorPB" style="height:7px;background: Green;width:0%;"/>' +
                           '</div>' +
                        '</div><div id="progressnum" style="width:15px; height:10px; text-align:center">&nbsp</div>';
                }
                cad += '</td>';
            }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    setTimeout(CargaInfoFiltro, 60000);
    return cad;
}

function EsDisabled(idActividad, act1, act2, act3, act4, act5, act6, act7) {
    switch (idActividad) {
        case "1": return act1; break;
        case "2": return act2; break;
        case "3": return act3; break;
        case "4": return act4; break;
        case "5": return act5; break;
        case "6": return act6; break;
        case "7": return act7; break;
    }
}

function OnCheck_Checked(idActividad, descActividad, obj) {
    if (idActividad == "1" || idActividad == "2")
        cambiarCheck(idActividad, descActividad, obj);

    if (idActividad == "3" && (!$("#chk_1").is(":checked") || !$("#chk_2").is(":checked"))) {
        $(obj).attr("checked", false);
        MostrarMsj("La Actividad 1 y 2 deben de estar Concluidas.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 125, null, null, null);
    }
    else if (idActividad == "3" && $("#chk_1").is(":checked") && $("#chk_2").is(":checked")) {
        cambiarCheck(idActividad, descActividad, obj);
    }

    if (idActividad == "4" || idActividad == "5" || idActividad == "6" || idActividad == "7") {
        if ($(obj).is(":checked")) {
            if (idActividad == "4")
                ConfirmarProcesoDeuducibilidad(idActividad, obj, descActividad);
            else if (idActividad == "5")
                ConfirmarProcesoCubo(idActividad, obj, descActividad);
            else if (idActividad == "6" || idActividad == "7")
                ConfirmarEnvioDeInformacion(idActividad, obj, descActividad);
            else if (idActividad == "8")
                ConfirmarEnvioDeInfControlNeg(idActividad, obj, descActividad);
        }
        else
            cambiarCheck(idActividad, descActividad, obj);
    }
}

function VerDetalleProceso(idActividad, descripcionAct) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/VerDetalleError', "POST", { idPeriodo: $("#slPeriodo").val(), idActividad: idActividad }, function (data) {
        if (data.d.indexOf("ErrorCATCH") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                var cadena = '<div id="divBloqVtnGetCifrasControl" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
                cadena += '<div id="dvDetalleEITblGetCifrasControl" style="width:100%;height:100%;margin-top: 0px;">  ';
                cadena += '<div style="width:100%;height:75%;overflow: auto;"><table style="width: 100%;"><tr> <td> <div id="dvDetalleProceso" > </div> </td></tr> </table></div>';
                cadena += '</div></div>';
                $("#dvCifrasControl").empty();
                AgregarVtnFlotante("dvCifrasControl", "", "DETALLE PROCESO (" + descripcionAct.toUpperCase() + ")", "", cadena, 210, 650, false, false, "", "", null);
                $("#dvDetalleProceso").html(generarTablaDeRegistrosSinFoot1(JSON));
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    }, null);
}

////////-------------------------------------------OnClick Confirmar Proceso Cubo

var entroCN = false;
function ConfirmarEnvioDeInfControlNeg(idActividad, obj, descripcionAct) {
    if ($(obj).attr('checked') == 'checked') {
        MostrarMsj("¿Esta seguro que quiere iniciar el proceso de " + descripcionAct + "? ", "Mensaje", true, true, false, "Si", "No", "", 300, 130,
        function () {
            entroCN = true;
            $("#divVentanaMensajes").dialog("close");
            MostrarMsj("En Proceso...", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            //            Waiting(true, "Espere por favor. Cargando Información...");
            //            peticionAjax('Default.aspx/ejecutaTableroCancelacionesEnvioControlNegocios', "POST", null, function (data) {
            //                if (data.d.indexOf("Error") == -1) {
            //                    if (data.d == "")
            //                        cambiarCheck(idActividad, descripcionAct, obj);
            //                }
            //                else
            //                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            //            }, null);
        }, function () {
            $("#divVentanaMensajes").dialog("close");
            $(obj).attr("checked", false);
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            if (!entroCN)
                $(obj).attr("checked", false);
        });
    }
}

////////-------------------------------------------OnClick Confirmar Proceso Cubo

var entro = false;
function ConfirmarEnvioDeInformacion(idActividad, obj, descripcionAct) {
    if ($(obj).attr('checked') == 'checked') {
        MostrarMsj("¿Esta seguro que quiere iniciar el proceso de " + descripcionAct + "? ", "Mensaje", true, true, false, "Si", "No", "", 300, 130,
        function () {
            entro = true;
            $("#divVentanaMensajes").dialog("close");
            Waiting(true, "Espere por favor. Cargando Información...");
            peticionAjax('Default.aspx/ejecutaTableroCancelacionesEnvioPCJRiesgos', "POST", { opcion: (idActividad == 6 ? 1 : 2) }, function (data) {
                if (data.d.indexOf("Error") == -1) {
                    if (data.d == "")
                        cambiarCheck(idActividad, descripcionAct, obj);
                }
                else
                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            }, null);
        }, function () {
            $("#divVentanaMensajes").dialog("close");
            $(obj).attr("checked", false);
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            if (!entro)
                $(obj).attr("checked", false);
        });
    }
}
function ConfirmarProcesoDeuducibilidad(idActividad, obj, descripcionAct) {
    if ($(obj).attr('checked') == 'checked') {
        MostrarMsj("¿Esta seguro que quiere iniciar el proceso de Deducibilidad? ", "Mensaje", true, true, false, "Si", "No", "", 300, 130,
        function () {
            entro = true;
            $("#divVentanaMensajes").dialog("close");
            Waiting(true, "Espere por favor. Cargando Información...");
            peticionAjax('Default.aspx/ejecutaProcesoDeducibilidad', "POST", { periodo: $("#slPeriodo option:selected").text() }, function (data) {
                if (data.d.indexOf("Error") == -1) {
                    if (data.d == "")
                        cambiarCheck(idActividad, descripcionAct, obj);
                }
                else
                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            }, null);
        }, function () {
            $("#divVentanaMensajes").dialog("close");
            $(obj).attr("checked", false);
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            if (!entro)
                $(obj).attr("checked", false);
        });
    }
}

////////-------------------------------------------OnClick Confirmar Proceso Cubo
var idActividadCubo; var objCubo; var descripActividadCubo;
function ConfirmarProcesoCubo(idActividad, obj, descripcionAct) {
    idActividadCubo = idActividad; objCubo = obj; descripActividadCubo = descripcionAct;
    if ($(obj).attr('checked') == 'checked') {
        MostrarMsj("¿Esta seguro que quiere iniciar el proceso de Cubo? ", "Mensaje", true, true, false, "Si", "No", "", 300, 130,
        function () {
            entro = true;
            $("#divVentanaMensajes").dialog("close");
            peticionAjax('Default.aspx/ejecutaCubo', "POST", { idPeriodo: $("#slPeriodo").val() }, function () {
                ProgressBarCargas();
            }, null);
        }, function () {
            $("#divVentanaMensajes").dialog("close");
            $(obj).attr("checked", false);
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            if (!entro)
                $(obj).attr("checked", false);
        });
    }
}

var valorCarga = 0;
var controladorValor = 0;
var tiempoProgress = 0;
function ProgressBarCargas() {
    peticionAjax('Default.aspx/ProgressBarMonitoreo', "POST", null, muestraData, muestraData);
}

function muestraData(data) {
    var arrayJSONProgress = obtenerArregloDeJSON(data.d, false);
    valorCarga = (parseInt(parseInt(arrayJSONProgress[0].id) * 100 / 5));
    $("#Progressbar").show();
    document.getElementById("indicatorPB").style.width = valorCarga + "%";
    document.getElementById("progressnum").innerHTML = valorCarga + "%";
    if (valorCarga != 100) {
        setTimeout(ProgressBarCargas, 2000);
    } else {
        if (valorCarga == 100) {
            MostrarMsj("Se ha procesado el Cubo exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            Waiting(true, "Espere por favor. Cargando Información...");
            EnviaAlerta();
        }
    }
}
function EnviaAlerta() {
    var parametrosMail = { idPeriodo: $("#slPeriodo").val() };
    peticionAjax('Default.aspx/mailActividadFin', "POST", parametrosMail, function () {
        cambiarCheck(idActividadCubo, descripActividadCubo, objCubo);
    }, null);
}

function CargaInfoFiltro() {
    // Waiting(true, "Espere por favor. Cargando Información...");
    entro = false;
    var parametros = { IdPeriodo: $("#slPeriodo").val() };
    peticionAjax("Default.aspx/obtieneTabInicial", "POST", parametros, TableroControl, TableroControl);
}

function TableroControl(data) {
    if (data.d.indexOf("Error") == -1) {
        if (data.d != "") {
            var JSON = obtenerArregloDeJSON(data.d, false);
            var cad = '';
            cad = generarTablaDeRegistrosCargas(JSON);
            $('#dvInfoValidadorCargas').html('<br /><br />' + cad);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    }
    else
        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
}

///////------------------------------------------------- onclick check
function cambiarCheck(idActividad, descripcionAct, obj) {
    var palomeado = 1;
    if ($(obj).attr('checked') == undefined)
        palomeado = 0;
    else
        palomeado = 1;

    var parametros = {
        idActividad: parseInt(idActividad),
        valor: palomeado,
        idPeriodo: $("#slPeriodo").val()
    };
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/cambiarCheck", "POST", parametros, CargaInfoFiltro, CargaInfoFiltro);
    if ((idActividad == '3' || idActividad == '4') && palomeado == 1) {
        GetCifrasControl(idActividad, descripcionAct);
    }
}

//////---------------------------------------------onclick imgBuscar

function GetCifrasControl(NoActividad, descripcionAct) {
    var cadena = '<div id="divBloqVtnGetCifrasControl" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblGetCifrasControl" style="width:100%;height:100%;margin-top: 0px;">  ';
    cadena += '<div style="width:100%;height:25%;"><table style="width: 100%"><tr><td style="text-align: center; font-size: large"> <b>Cifras Control</b></td></tr><tr><td style="text-align: right"><img src="../../Images/Cancelaciones/Cargas/excelImg.jpeg" id="btlExportToExel" onclick="__doPostBack(\'Excel\',\'\')" class="imgCrecerMedium" title="Exportar a Excel"/>';
    cadena += ' <img src="../../Images/Cancelaciones/Cargas/pdfImg.jpeg" onclick="__doPostBack(\'Pdf\',\'\')" class="imgCrecerMedium" title="Exportar a Pdf"/></td></tr></table></div>';
    cadena += '<div style="width:100%;height:75%;overflow: auto;"><table style="width: 100%;"><tr> <td> <div id="dvContenidoCifrasControl" > </div> </td></tr> </table></div>';
    cadena += '</div></div>';
    $("#dvCifrasControl").empty();
    AgregarVtnFlotante("dvCifrasControl", "", "CIFRAS CONTROL (" + descripcionAct.toUpperCase() + ")", "", cadena, 280, 650, false, false, "", "", null);
    WaitingVtn("divBloqVtnGetCifrasControl", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    PeticionAjaxGetCifrasControl(NoActividad);
}
function PeticionAjaxGetCifrasControl(NoActividad) {
    var parametros = { noActividad: NoActividad, idPeriodo: (NoActividad == 3 ? $("#slPeriodo").val() : $("#slPeriodo option:selected").text())}//"11M13"
    peticionAjax("Default.aspx/GetCifrasControl", "POST", parametros, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        SetCifrasControl(JSON, NoActividad);
    }, null);
}

function SetCifrasControl(JSON, noActividad) {
    var Sistema = '';
    var cad = '<center><table id="tblCifrasC" class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = JSON[0];
    for (var encabezados in auxJSON) {
        cad += '<th style="width:20%">';
        cad += encabezados.toString();
        cad += '</th>';
    }

    cad += '</tr>';
    cad += '</thead>';

    cad += '<tbody>';
    for (var filas = 0; filas < JSON.length - 1; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = JSON[filas];
        for (var element in json) {
            if (element != 'Cartera' && element != 'STEMA' && element != 'Fecha de Carga')
                cad += '<td style="text-align:right">';
            else
                cad += '<td style="text-align:left">';

            if (element == 'Cartera')
                Sistema = json[element];

            cad += format(json[element]);
            cad += '</td>';
        }

        if (noActividad == 3) {
            cad += '<td>';
            cad += '<a id="aBorra" onclick="BorraSistemaCifras(\'' + Sistema + '\');" style="text-decoration: underline; color:Blue">Borrar</a>';
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '<tfoot><tr class="rowPie">';
    var json = JSON[JSON.length - 1];
    var contador = 1;
    for (var element in json) {
        if (json[element] != '') {
            cad += '<td colspan="' + contador + '">';
            cad += format(json[element]);
            cad += '</td>';
            contador = 1;
        }
        else {
            contador++;
        }
    }
    cad += '</tr></tfoot>';

    cad += '</table></center>';
    WaitingVtn("divBloqVtnGetCifrasControl", false, false, "Cargando Información...");
    $('#dvContenidoCifrasControl').html(cad);
}

function format(num) {
    var result = '';
    if (!isNaN(num)) {
        var partes = num.split('.');
        var number = partes[0];
        while (number.length > 3) {
            result = ',' + number.substr(number.length - 3) + result;
            number = number.substring(0, number.length - 3);
        }
        result = number + result;

        if (partes.length == 2) {
            result = result + "." + partes[1];
        }

        return result;
    }
    //quitarDivBloqueadorGeneral();
    return num;
}

///-----------------------------onclick BorraSistemaCifras

var Trimestre = '1';
function BorraSistemaCifras(Sistema) {
    WaitingVtn("divBloqVtnGetCifrasControl", true, true, "Borrando Registros...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var parametros = { idPeriodo: $("#slPeriodo").val(), sistema: Sistema }
    peticionAjax("Default.aspx/BorraSistCifrasControl", "POST", parametros, PeticionAjaxGetCifrasControl, PeticionAjaxGetCifrasControl);
}

//--------------------------------onclick radioDescarga (Completo)
function clicRadio() {
    $('#selectAño').attr("disabled", true);
    $('#selectTrimestre').attr("disabled", true);
    Trimestre = '1';
}

//--------------------------------onclick radioDescarga (Por Corte)
function clicRadioCorte() {
    $('#selectAño').attr("disabled", false);
    $('#selectTrimestre').attr("disabled", false);
    Trimestre = $('#selectTrimestre').val() + $('#selectAño').val();
}

//------------------------------onclick boton Descarga
function descarga() {
    var myindex = document.getElementById('selectAño').selectedIndex;
    if (document.getElementById('selectTrimestre').disabled == true) {
        Trimestre = '1';
    }
    else {
        Trimestre = $('#selectTrimestre').val() + document.getElementById('selectAño')[myindex].value;
    }
    Waiting(true, "Espere por favor. Cargando Información...");
    $('#botonDescarga').val('Generando Archivo');
    var parametros = { trimestre: Trimestre }
    peticionAjax("Default.aspx/CrearArchivo", "POST", parametros, function (data) {
        if (data.d == "Error") {
            Waiting(false, "Espere por favor. Cargando Información...");
            MostrarMsj("Error al crear el archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        else {
            descargaZIP();
        }
    }, null);
}


function descargaZIP() {
    $('#botonDescarga').val('Comprimiendo Archivo');
    peticionAjax("Default.aspx/ComprimirArchivo", "POST", null, function (data) {
        if (data.d == "Error") {
            MostrarMsj("Error al comprimir el archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        else {
            $('#botonDescarga').hide();
            $('#btnDescargar').show();
            document.getElementById('btnDescargar').onclick = function () {
                $('#botonDescarga').show();
                $('#btnDescargar').hide();
                downloadUrl = "http://" + data.d + "/DescargasBXC/Cancelaciones.zip";
                var downloadFrame = document.createElement("iframe");
                downloadFrame.setAttribute('src', downloadUrl);
                downloadFrame.setAttribute('class', "screenReaderTextWindowsOpen")
                document.body.appendChild(downloadFrame);
                $("#iframe").remove();
            }
            $('#botonDescarga').val('Genera Cancelaciones');
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    }, null);
}

//----------------------------------------------------------onclick botonCargarCancelaciones_Click

function botonCargarCancelaciones_Click() {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Cancelaciones.Cargas.Default.botonCargarCancelacionesClick(
        function (response) {
            Waiting(false, "Espere por favor. Cargando Información...");
            if (response.value.startsWith('Error:')) {
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            }
        }
    );
}

//-------------------------------------------------------onclick  botonCargarDemandas_Click
function botonCargarDemandas_Click() {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Cancelaciones.Cargas.Default.botonCargarDemandasClick(
        function (response) {
            Waiting(false, "Espere por favor. Cargando Información...");
            if (response.value.startsWith('Error:')) {
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            }
        }
    );
}

//------------------------------------------------------ onclick imgMostrar e imgOcultar
function muestraInfo() {
    if (document.getElementById('dvValidadorCargas').style.display == 'none') {
        $('#dvValidadorCargas').slideDown('slow');
        $('#imgMostrar').hide();
        $('#imgOcultar').show();
    } else {
        $('#dvValidadorCargas').slideUp('slow');
        $('#imgMostrar').show();
        $('#imgOcultar').hide();
    }
}

//--------------------------------------------------------envio Archivo
function enviarArchivoAsincronamente(obj, idTipoArchivo) {
    if (!validarExistenciaDeArchivo($(obj).parent().find("input:file"))) {
        return false;
    }
    var idInputFile = $(obj).parent().find("input:file").attr("id");
    var parametros = { 'subirArchivo': 'subirArchivo', 'idTipoArchivo': idTipoArchivo };
    return ajaxFileUpload(idInputFile, obj, parametros);
}

function validarExistenciaDeArchivo(obj) {
    var bandera = false;
    if ($(obj).val() == '') {
        MostrarMsj("Debe seleccionar un archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
        bandera = false;
    }
    else {
        bandera = true;
    }
    return bandera;
}

var nomArchivoASubir;
function ajaxFileUpload(idInputFile, obj, parametros) {
    Waiting(true, "Espere por favor. Cargando Información...");
    $.ajaxFileUpload
		    ({
		        url: 'Default.aspx',
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
    data = data.toString().replace("<pre>", "").replace("</pre>", "").replace("<PRE>", "").replace("</PRE>", "");
    // var arrayJSON = obtenerArregloDeJSON(data, false);
    //var json = arrayJSON[0];
    //    if (json.StatusDeProcesoArchivo.toString() == 'Correcto')
    //        MostrarMsj("El archivo se ha cargado correctamente, con los siguientes datos:" + "\n\n" + arrayJSON[1].Respuesta.toString(), "Mensaje", false, true, false, "", "Aceptar", "", 270, 160, null, null, null);
    //    else
    //        MostrarMsj("El archivo no se ha cargado correctamente, verifique el formato de dicho archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 150, null, null, null);
    peticionAjax("Default.aspx/GetCadenaMsjError", "POST", null, function (data1) {
        document.getElementById((data1.d.split("%%%")[2] == "1" ? "labelErrorCancelacionesT" : (data1.d.split("%%%")[2] == "2" ? "labelErrorDemandasT" : "labelErrorTranspasosT"))).innerHTML = data1.d.split("%%%")[0];
        document.getElementById((data1.d.split("%%%")[2] == "1" ? "labelErrorCancelacionesT" : (data1.d.split("%%%")[2] == "2" ? "labelErrorDemandasT" : "labelErrorTranspasosT"))).style.color = data1.d.split("%%%")[1];
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}