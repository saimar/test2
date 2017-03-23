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
    $("#accordion").accordion({ /*event: false*/
});
$(".calendario").datepicker({ beforeShowDay: renderCalendarCallback });
document.getElementById("divSeleccion").style.height = "auto";
document.getElementById("divValidacionesCalidadDeInformacion").style.height = "auto";
document.getElementById("divCifrasProcesadas").style.height = "auto";
document.getElementById("divPrepararCargaInfoDetalle").style.height = "auto";
$("#hSeleccion").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
$("#hValidacionesCalidadDeInformacion").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
$("#hCifrasProcesadas").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
$("#hDescargas").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");

});

function ObtenerFechaActual() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ConsumoRevolvente.aspx/GetFechaActualAndUser", "POST", null, function (data) {     
        $("#txtFecha").val(data.d.split('%%&&')[0]);
        // $("#txtFecha").onchange = Inicializar();
        WidtDatePicker();
        filtroFecha();
    });
}

function filtroFecha() {
    var parametrosGetFechasDatePickerXPeriodo = { fechaCalMenos: '', fechaCalMas: '', aplicarMenos: false, aplicarMas: false, index: 0, fechaAnteriorMenos: '', arregloFechas: '', fechaswitch: '' };
    peticionAjax("ConsumoRevolvente.aspx/GetFechasDatePickerFiltro", "POST", parametrosGetFechasDatePickerXPeriodo,
                      function (data) {
                          peticionAjax("ConsumoRevolvente.aspx/GetFechasNoSelect", "POST", null,
                          function (data2) {
                              $("#txtFecha").attr("accesskey", data2.d.split(":")[2]);
                              cargarCifrasControlHistorial = true;
                              CargaIndicadoresIniciales();
                          });
                      }, null);
}

function renderCalendarCallback(d) {
    var availableDates = new Array();
    var dmy = '';
    if (d.getDate() < 10) dmy += "0";
    dmy += d.getDate() + "/";
    if ((d.getMonth() + 1) <= 9)
        dmy = dmy + "0" + (d.getMonth() + 1) + "/" + d.getFullYear();
    else dmy = dmy + (d.getMonth() + 1) + "/" + d.getFullYear();
    if ($("#txtFecha").attr("accesskey") == undefined) return;
    if ($.inArray(dmy, $("#txtFecha").attr("accesskey").split(",")) != -1)
        return [true, "", ""];
    else
        return [false, "", ""];
}

function txtFecha_Onchange() {
    Waiting(true, "Espere por favor. Cargando Información...");
    cargarCifrasControlHistorial = true;
    CargaIndicadoresIniciales();
}

var cargarCifrasControlHistorial = false;
function CargaIndicadoresIniciales() {
    for (var x = 1; x < 5; x++) {
        $("#spStatusEtapa_" + x).show();
        $("#spStatusEtapa_" + x).attr("class", DeterminaEstatusClassXId("0"));
        $("#spStatusEtapa_" + x).attr("title", DeterminaTitleEstatusXId("0"));
    }
    for (var x = 2; x < 5; x++)
        habilitarDeshabilitarControles(false, x);
    peticionAjax('ConsumoRevolvente.aspx/monitoreoSeleccion', "POST", { opcion: 4, fechaReporte: $("#txtFecha").val().split('/')[2] + "/" + $("#txtFecha").val().split('/')[1] + "/" + $("#txtFecha").val().split('/')[0] },
        function (data) {
            if (data.d.indexOf("ERRORCATCH") == -1) {
                if (data.d != "") {
                    var arrayJSONPG = obtenerArregloDeJSON(data.d, false);
                    for (var x = 0; x < arrayJSONPG.length; x++) {
                        $("#spStatusEtapa_" + arrayJSONPG[x].FIClave).show();
                        $("#spStatusEtapa_" + arrayJSONPG[x].FIClave).attr("class", DeterminaEstatusClassXId(arrayJSONPG[x].FIBandera));
                        $("#spStatusEtapa_" + arrayJSONPG[x].FIClave).attr("title", DeterminaTitleEstatusXId(arrayJSONPG[x].FIBandera));
                        if (x > 0 && arrayJSONPG[x - 1].FIBandera != "0")
                            habilitarDeshabilitarControles(true, arrayJSONPG[x].FIClave);
                    }
                }
            }
            //Waiting(false, "Espere por favor. Cargando Información...");
            if (cargarCifrasControlHistorial)
                cargaCifrasControl("2");
            else
                Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
}

function DeterminaEstatusClassXId(idItem) {
    var classColor = "";
    switch (idItem) {
        case "0": classColor = "EstatusGris"; break;
        case "1": classColor = "EstatusVerde"; break;
        case "2": classColor = "EstatusAmarillo"; break;
        case "3": classColor = "EstatusRojo"; break;
    }
    return classColor;
}

function DeterminaTitleEstatusXId(idItem) {
    var title = "";
    switch (idItem) {
        case "0": title = "No Iniciado"; break;
        case "1": title = "Etapa Finalizada con Éxito"; break;
        case "2": title = "Etapa Finalizada con Advertencias, pero dentro de la tolerancia"; break;
        case "3": title = "Etapa Finalizada con Errores"; break;
    }
    return title;
}

function habilitarDeshabilitarControles(esHabilitar, idControles) {
    if (esHabilitar) {
        $(".tblControls_" + idControles).find("button").removeAttr('disabled');
        $(".tblControls_" + idControles).find("input:button").removeAttr('disabled');
        $(".tblControls_" + idControles).find("input:button").attr('class', 'classButton');
        $(".tblControls_" + idControles).find("input:text").removeAttr('disabled');
        $(".tblControls_" + idControles).find("input:checkbox").removeAttr('disabled');
        document.getElementById("imgRepOperaciones").setAttribute("src", "");
        $("#imgDescargaArchivo").show();
        $("#imgDescargaArchivoDisable").hide();
    }
    else {
        $(".tblControls_" + idControles).find("button").attr('disabled', 'disabled');
        $(".tblControls_" + idControles).find("input:button").attr('disabled', 'disabled');
        $(".tblControls_" + idControles).find("input:button").attr('class', 'classButtonDis');
        $(".tblControls_" + idControles).find("input:text").attr('disabled', 'disabled');
        $(".tblControls_" + idControles).find("input:checkbox").attr('disabled', 'disabled');
        document.getElementById("imgRepOperaciones").setAttribute("src", "");
        $("#imgDescargaArchivoDisable").show();
        $("#imgDescargaArchivo").hide();
    }
}

//-------------------------------------- ETAPA I PROCESAR
function btnProcesar_Click() {
    //  CambiarDiv("divValidacionesCalidadDeInformacion", "divSeleccion");
    $("#divSeleccionPB").show();
    document.getElementById("divSeleccionPB").style.width = "0%";
    $("#divSelecccion_txt").html("Cargando... 0% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>");
    //    setTimeout(Carga1,1000);
    peticionAjax("ConsumoRevolvente.aspx/procesarSeleccion", "POST", { opcion: 2, fechaReporte: $("#txtFecha").val().split('/')[2] + $("#txtFecha").val().split('/')[1] + $("#txtFecha").val().split('/')[0] }, function (data) {
        if (data.d == "") {
            $("#imgReProceso").hide();
            cargarCifrasControlHistorial = false;
            setTimeout(CargaIndicadoresIniciales, 2000);
            setTimeout(ProgressBarSeleccion, 2000);
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    });

}

function ProgressBarSeleccion() {
    peticionAjax('ConsumoRevolvente.aspx/monitoreoSeleccion', "POST", { opcion: 3, fechaReporte: $("#txtFecha").val().split('/')[2] + "/" + $("#txtFecha").val().split('/')[1] + "/" + $("#txtFecha").val().split('/')[0] },
        function (data) {
            if (data.d.indexOf("ERRORCATCH") == -1) {
                if (data.d != "") {
                    var arrayJSONPG = data.d;
                    if (arrayJSONPG == undefined || arrayJSONPG[0] == null) return;
                    arrayJSONPG = obtenerArregloDeJSON(data.d, false);
                    var porcentajeXPaso = 100 / parseInt(arrayJSONPG.length);
                    var numListos = 0;
                    for (var x = 0; x < arrayJSONPG.length; x++) {
                        if (arrayJSONPG[x].FVCDescripcion == "Listo") numListos++;
                    }
                    var valorWhere = porcentajeXPaso * numListos;
                    document.getElementById("divSeleccionPB").style.width = valorWhere + "%";
                    $("#divSelecccion_txt").html("Cargando... " + valorWhere + "% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>");

                    if (numListos == arrayJSONPG.length) {
                        setTimeout(terminaWaitSeleccion, 4000);
                        //cargaCifrasControl("1");
                    }
                    else {
                        cargarCifrasControlHistorial = false;
                        setTimeout(ProgressBarSeleccion, 1000);
                        setTimeout(CargaIndicadoresIniciales, 2000);
                    }
                }
            }
        }, null);
}

function terminaWaitSeleccion() {
    $("#divSeleccionPB").hide();
    document.getElementById("divSeleccionPB").style.width = "0%";
    $("#divSelecccion_txt").html("Cargando... 0% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>");

    // $("#spStatusSeleccion").show(); //PENDIENTE
    //$("#spStatusSeleccion").attr("class", "EstatusVerde");
}

function CifrasProcesadas() {
    CambiarDiv('divCifrasProcesadas', 'divValidacionesCalidadDeInformacion');
}

function prepararYCargaInformacion() {
    CambiarDiv('divPrepararCargaInfoDetalle', 'divCifrasProcesadas');
}

function CambiarDiv(Mostrar, Ocultar) {
    $("#" + Ocultar).slideUp("slow");
    $("#" + Mostrar).slideDown("slow");
}

//-------------------------------------- ETAPA II VALIDACIONES

function btnEjecutarValidaciones_Click() {
    Waiting(true, "Espere por favor. Cargando Información...");
    $("#tdBottonIncidencias").attr("style", "height: 0px");
    var fechaReporte = $("#txtFecha").val().split('/')[2] + "/" + $("#txtFecha").val().split('/')[1] + "/" + $("#txtFecha").val().split('/')[0];
    peticionAjax("ConsumoRevolvente.aspx/btnEjecutarValidaciones", "POST", { opcion: 1, fechaReporte: fechaReporte }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                var arrayAgrupado = new Array();
                var arrayAgrupadoTemp = new Array();
                for (var i = 0; i < JSON.length; i++) {
                    if (i == 0 || JSON[i].Producto == JSON[i - 1].Producto) {
                        var arrayAgrupTemp2 = new Array();
                        arrayAgrupTemp2.Producto = JSON[i].Producto;
                        arrayAgrupTemp2.Clave = JSON[i].Clave;
                        arrayAgrupTemp2.Incidencias = JSON[i].Incidencias;
                        arrayAgrupTemp2.RegAfectados = JSON[i]["Registros Afectados"];
                        arrayAgrupadoTemp.push(arrayAgrupTemp2);
                        if (i == JSON.length - 1)
                            arrayAgrupado.push(arrayAgrupadoTemp);
                    }
                    else {
                        arrayAgrupado.push(arrayAgrupadoTemp);
                        arrayAgrupadoTemp = new Array();
                        var arrayAgrupTemp2 = new Array();
                        arrayAgrupTemp2.Producto = JSON[i].Producto;
                        arrayAgrupTemp2.Clave = JSON[i].Clave;
                        arrayAgrupTemp2.Incidencias = JSON[i].Incidencias;
                        arrayAgrupTemp2.RegAfectados = JSON[i]["Registros Afectados"];
                        arrayAgrupadoTemp.push(arrayAgrupTemp2);
                        if (i == JSON.length - 1)
                            arrayAgrupado.push(arrayAgrupadoTemp);
                    }
                }
                $("#divTblIncidencias").html(creaTablaIncidencias(arrayAgrupado, JSON.length, devuelveNumRegAfectadosXClasificacion(JSON, "Registros Afectados"), fechaReporte));
                document.getElementById("divValidacionesCalidadDeInformacion").style.height = "auto";
                $("#tdBottonIncidencias").attr("style", "height: 20px");
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        //Waiting(false, "Espere por favor. Cargando Información...");
        cargarCifrasControlHistorial = false;
        CargaIndicadoresIniciales();
    });

}

function creaTablaIncidencias(arrayAgrupado, totalIncidencias, totalRegAfectados, fechaReporte) {
    var cad = '<div class="divContenidoTablaIncidencias" style="width:auto;"><table id="tblIncidenciasConsumoRevolvente"  style="width: 100%;" class="dataGridDatos" >';
    cad += '<thead><tr>';
    cad += '<th style="text-align: center;width:20%;">Producto</th><th style="text-align: center;width:60%;">Incidencia</th><th style="text-align: center;width:20%;">Registros Afectados</th>';
    cad += '</tr></thead>';
    cad += '<tbody>';
    for (var i = 0; i < arrayAgrupado.length; i++) {
        cad += ((i % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + ' id="trItem_' + i + '" title="Clic para Expandir" lang="aa" onclick="expandirCollapsarSubItem(this)" style="cursor:pointer;">';
        cad += '<td> <img id="img_' + i + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif">' + arrayAgrupado[i][0].Producto + '</td><td>' + arrayAgrupado[i].length + ' Incidencias</td><td style="text-align:right;">' + devuelveNumRegAfectadosXClasificacion(arrayAgrupado[i], "RegAfectados") + '</td></tr>';
        cad += '<tr id="trSubItem_' + i + '" style="display:none"><td colspan="3"><div style="width: 99.5%;margin-left: 6px;"><table  class="dataGrid" style="width:100%;">'
        for (var ii = 0; ii < arrayAgrupado[i].length; ii++) {
            cad += '<tr><td style="width:19.5%;">' + arrayAgrupado[i][ii].Clave + '</td><td style="width:60.5%;">' + arrayAgrupado[i][ii].Incidencias + '</td><td style="width:20%;text-align:right;">' + arrayAgrupado[i][ii].RegAfectados + '</td>'
        }
        cad += '</table></div><td></tr>'
    }
    cad += '<tr class="' + (arrayAgrupado.length % 2 == 0 ? 'row' : 'alternateRow') + '"><td>Total</td><td>' + totalIncidencias + ' Incidencias</td><td style="text-align:right;color: rgb(0, 0, 255);text-decoration: underline;cursor:pointer;" title="Descargar Archivo .csv" onclick="descargarArchivoValidacionesCalidInfTXT(\'' + fechaReporte + '\',\'TotalRegAfectados\');">' + totalRegAfectados + '</br></td></tr>';
    cad += '</tbody></table>';
    return cad;
}

function expandirCollapsarSubItem(obj) {
    if ($(obj).attr("lang") == "aa") {
        $("#trSubItem_" + $(obj).attr("id").split('_')[1]).show();
        document.getElementById("img_" + $(obj).attr("id").split('_')[1]).setAttribute("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif")
        $(obj).attr("lang", "ab");
        $(obj).attr("title", "Clic para Collapsar");
    }
    else {
        $("#trSubItem_" + $(obj).attr("id").split('_')[1]).hide();
        document.getElementById("img_" + $(obj).attr("id").split('_')[1]).setAttribute("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif")
        $(obj).attr("lang", "aa");
        $(obj).attr("title", "Clic para Expandir");
    }
}

function devuelveNumRegAfectadosXClasificacion(arrayItems, nameColRegAfectados) {
    var numTotalRegAfectados = 0;
    for (var i = 0; i < arrayItems.length; i++)
        numTotalRegAfectados += parseInt(arrayItems[i][nameColRegAfectados]);
    return numTotalRegAfectados;
}

function descargarArchivoValidacionesCalidInfTXT(fechaReporte, nombre) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ConsumoRevolvente.aspx/linkRegistrosAfectadosDownloadTxt_Click", "POST", { opcion: "2", fechaReporte: fechaReporte }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "" && parseInt(data.d.split('_')[0]) > 0) {
                __doPostBack('ExportarTxtRegistrosAfectados', fechaReporte + "," + nombre);
                setTimeout(terminarWait, 10000);
            }
            else {
                MostrarMsj(data.d, "Sin Datos.", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    });
}


//----------------BTN CARGAR
function enviarArchivoAsincronamente(obj, tipoArchivo) {
    var fechaReporte = $("#txtFecha").val().split('/')[2] + "/" + $("#txtFecha").val().split('/')[1] + "/" + $("#txtFecha").val().split('/')[0];
    if (!validarExistenciaDeArchivo($(obj).parent().parent().find("input:file"), tipoArchivo)) {
        return false;
    }
    var idInputFile = $(obj).parent().parent().find("input:file").attr("id");
    var parametros = { 'subirArchivo': 'subirArchivo', 'tipoArchivo': tipoArchivo, 'fechaReporte': fechaReporte };
    return ajaxFileUpload(idInputFile, obj, parametros);
}
function validarExistenciaDeArchivo(obj, tipoArchivo) {
    var bandera = false;
    if ($(obj).val() == undefined || $(obj).val() == '' || (tipoArchivo == "1" && $(obj).val().toUpperCase().indexOf('.TXT') == -1)) {
        WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
        MostrarMsj("Debe seleccionar un archivo" + (tipoArchivo == "1" ? " .txt" : "."), "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
        });
        bandera = false;
    }
    else bandera = true;
    return bandera;
}

var seCargoFile = false;
function ajaxFileUpload(idInputFile, obj, parametros) {
    Waiting(true, "Espere por favor. Cargando Información...");
    WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
    jQuery.ajaxFileUpload
		    ({
		        url: 'ConsumoRevolvente.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaDeArchivo(data, obj, parametros.tipoArchivo);
		        }
		    });
    return false;
}

function reportarStatusDeSubidaDeArchivo(data, obj, tipoArchivo) {
    if (tipoArchivo == "2")
        getHistorialDescargasDatosReporte();
    else
        $("#imgReProceso").show();
    data = data.toString().replace("<pre>", "").replace("</pre>", "").replace("<PRE>", "").replace("</PRE>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "");
    if (data.indexOf('ArchivoCargado') != -1) {
        $("#divCargaAcuse").dialog("close");
        WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
        MostrarMsj("Archivo cargado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
        });
        Waiting(false, "Espere por favor. Cargando Información...");
    }
    else if (data.indexOf('ErrorCATCH') != -1) {
        WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
        MostrarMsj(data + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
        });
        Waiting(false, "Espere por favor. Cargando Información...");
    }
}

//---------------------ETAPA III CIFRAS

function cargaCifrasControl(opcion) {
    peticionAjax('ConsumoRevolvente.aspx/cifrasControl', "POST", { opcion: opcion, fechaReporte: $("#txtFecha").val().split('/')[2] + "/" + $("#txtFecha").val().split('/')[1] + "/" + $("#txtFecha").val().split('/')[0] },
        function (data) {
            if (data.d.indexOf("ERRORCATCH") == -1) {
                $("#divCifrasOficialesOrigen").html("");
                $("#divCifrasControl").html("");
                $("#divDiferencia").html("");
                if (data.d != "") {
                    var arrayJSONPG;
                    if (data.d.split("%%&&")[0] != undefined) {
                        arrayJSONPG = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        $("#divCifrasOficialesOrigen").html(crearTablaGenerica(arrayJSONPG, "tblCifrasOficialesOrigen"));
                    }
                    else $("#divCifrasOficialesOrigen").html("Sin Datos");
                    if (data.d.split("%%&&")[1] != undefined) {
                        arrayJSONPG = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                        $("#divCifrasControl").html(crearTablaGenerica(arrayJSONPG, "tblCifrasControl"));
                    }
                    else $("#divCifrasControl").html("Sin Datos");
                    if (data.d.split("%%&&")[2] != undefined) {
                        arrayJSONPG = obtenerArregloDeJSON(data.d.split("%%&&")[2], false);
                        $("#divDiferencia").html(crearTablaGenerica(arrayJSONPG, "tblDiferencia"));
                    }
                    else $("#divDiferencia").html("Sin Datos");
                }
            }
            getHistorialDescargasDatosReporte();

        }, null);
}

function crearTablaGenerica(listaDeJSON, idtabla) {
    var cad = '<div class="divContenidoTabla" style="width:auto;"><table id="' + idtabla + '"  style="width: 100%;" class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    for (var encabezados in auxJSON) {
        cad += '<th style="text-align: center;">';
        cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td style="text-align:' + (parseFloat(json[element]).toString() != "NaN" ? 'right' : 'left;') + '">';
            cad += parseFloat(json[element]).toString() != "NaN" ? DevuelveCantidadSeparadaPorComas(json[element]) : json[element];
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div>';
    return cad;
}

//---------------------ETAPA IV PREPARAR Y CARGAR INFO

function getHistorialDescargasDatosReporte() {
    peticionAjax('ConsumoRevolvente.aspx/getHistorialDescargasDatosReporte', "POST", { opcion: "2", fechaReporte: $("#txtFecha").val().split('/')[2] + "/" + $("#txtFecha").val().split('/')[1] + "/" + $("#txtFecha").val().split('/')[0] },
        function (data) {
            if (data.d.indexOf("ERRORCATCH") == -1) {
                if (data.d != "") {
                    if (data.d != "") {
                        var arrayJSONPG = obtenerArregloDeJSON(data.d, false);
                        if (arrayJSONPG[0] != null)
                            asignaValoresControlesHistorial(arrayJSONPG);
                    }
                }
                else {
                    asignaValoresControlesHistorial(null);
                }
            }
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
}

function asignaValoresControlesHistorial(arrayJSONPG) {
    $("#tdFormulario").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FVCFormulario);
    $("#tdPaquete").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FVCPaquete);
    $("#tdFechaInformacion").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FDFechaInformacion.split(' ')[0]);
    $("#tdFechaInicio").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FDFechaInicio.split(' ')[0]);
    $("#tdFechaEnvio").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FDFechaEnvio.split(' ')[0]);
    $("#tdUltimoMovi").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FDFechaUltimoMovimiento.split(' ')[0]);
    $("#tdUltimoMovi").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FDFechaUltimoMovimiento.split(' ')[0]);
    $("#tdNombre").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FVCNombre);
    $("#tdDescripcion").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FVCDescripcion);
    document.getElementById("imgRepOperaciones").setAttribute("src", (arrayJSONPG == null || arrayJSONPG[0].FBReportadoConOperaciones == "0" ? "../../Images/PanelDeControl/cerrar.png" : "../../Images/Grales/Correcto.png"));
    $("#tdDescargasRealizadas").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FIDescargasRealizadas);
    $("#tdFechaUltimaTransmision").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FDFechaUltimaTransmision.split(' ')[0]);
    $("#tdInicio").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FDFechaInicio.split(' ')[0]);
    $("#tdFin").html(arrayJSONPG == null ? "" : arrayJSONPG[0].FDFechaUltimaTransmision.split(' ')[0]);
}

function imgDescargarArchivo_Click() {
    Waiting(true, "Espere por favor. Cargando Información...");
    var fechaReporte = $("#txtFecha").val().split('/')[2] + "/" + $("#txtFecha").val().split('/')[1] + "/" + $("#txtFecha").val().split('/')[0];
    peticionAjax("ConsumoRevolvente.aspx/numRegistrosReportes_Click", "POST", { opcion: "3", fechaReporte: fechaReporte }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "" && parseInt(data.d.split('_')[0]) > 0) {
                __doPostBack('descargarReporteEtapaIV', fechaReporte + "," + $("#tdNombre").html());
                setTimeout(getHistorialDescargasDatosReporte, 8000);
                setTimeout(terminarWait, 10000);
            }
            else {
                MostrarMsj(data.d, "Sin Datos.", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    });
}

function cargarAcuse() {
    var cadena = '<div id="divBloqVtndivAcuse" style="width:98%;height:80%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
    cadena += '<div> <div id="divVentanaCargaAcuse"> <center> <table border="0" cellpadding="0" cellspacing="0">';
    cadena += ' <tbody> <tr>  <td style="height: 5px;">  </td>';
    cadena += ' <td class="TextBoxArribaCentro" colspan="3" style="height: 25px;font: normal 10px Helvetica, Arial, sans-serif;" align="left"> &nbsp;<input type="file" name="fuAcuse" id="fuAcuse" style="font-family:Arial;font-size:X-Small;width:441px;">';
    cadena += '</td><td class="TextBoxArribaDerecha" style="height: 25px;text-align: right;">&nbsp;';
    cadena += '<input type="button" name="btnLoad" value="Cargar Archivo" id="btnCargarAcuse" class="classButton" style="font-family:Arial;font-size:X-Small;" onclick="enviarArchivoAsincronamente(this,\'2\')"></td>';
    cadena += '</tr></tbody></table></center>';
    cadena += '</div></div>';
    $("#divCargaAcuse").empty();
    $("#divCargaAcuse").html(cadena);
    AgregarVtnFlotante("divCargaAcuse", "", "CARGA ACUSE ", "", cadena, 140, 650, false, false, "", "", null);
}

// ---------------------PRUEBA----------------
function Carga1() {
    CargaMain("50");
    setTimeout(Carga2, 1000);
}

function Carga2() {
    CargaMain("75");
    setTimeout(Carga3, 1000);
}

function Carga3() {
    CargaMain("100");
    $("#divSeleccionPB").hide();
    CargaMain("0");
    $("#spStatusSeleccion").show();
    $("#spStatusSeleccion").attr("class", "EstatusVerde");
}

function CargaMain(width) {
    document.getElementById("divSeleccionPB").style.width = width + "%";
    $("#divSelecccion_txt").html("Cargando... " + width + "% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>");
}