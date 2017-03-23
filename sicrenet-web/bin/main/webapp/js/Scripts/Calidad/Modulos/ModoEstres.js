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
        daysOfWeekDisabled: "1,2,3,4,5,6",
        changeMonth: true,
        changeYear: true,
        maxDate: -1
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});


function cargaIncial444()
{
    alert("Hola mundo");
}


function cargaIncialModoEstres() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    GetValidacionesTableroModoEstres();
}


function GetValidacionesTableroModoEstres() {
    Waiting(true, "Cargando Información...");
    peticionAjax('ModoEstres.aspx/GetValidacionesTablero', "POST", null,
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        var JSONSubLista = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                        $("#divTblCatModoEstres").html(CreaTablaIncidenciasModoEstres(JSON, JSONSubLista, "Principal"));
                    }
                    else MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
                else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Cargando Información...");
            }, null);
}

function CreaTablaIncidenciasModoEstres(listaDeJSON, JSONSubLista, idTabla) {
    var cad = '<center><table id="tblIncidencias' + idTabla + '" width="100%" class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr valign="top">';
    cad += "<th style='width:1%;'></th>";
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados != "idFuente") {
            cad += '<th valign="top" style="width:30%;">';
            cad += encabezados.toString();
            cad += '</th>';
        }
    }
    cad += "<td style='width:15%;'></td>";
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += ((filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + " alt='aa' onclick='MostarOcultarSubIncidencias(this);' id='tr_" + filas + "' style='cursor:pointer' title='Clic para Mostrar Validaciones'>";
        var json = listaDeJSON[filas];
        cad += listaDeJSON[filas]["SISTEMA"] != "TOTAL" ? '<td style="width:10px;"><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>' : "<td></td>";
        for (var element in json) {
            if (element != "idFuente") {
                cad += '<td style="' + (element == "NO VALIDACIONES" ? 'text-align:right;' : 'text-align:left;') + (element == "SISTEMA" ? 'width: 26.5%;"' : '"') + '>';
                cad += json[element];
                cad += '</td>';
            }
        }
        cad += listaDeJSON[filas]["SISTEMA"] != "TOTAL" ? '<td id="td_' + filas + '" style="background:White;"><input type="button" value="Descargar Muestra" class="classButton" onclick="btnDescargaMuestra_Click(\'' + listaDeJSON[filas].SISTEMA + '\');"/>&nbsp&nbsp<input type="button" value="Probar Validacion(es)" class="classButton" onclick="btnProbarValidaciones_Click(\'' + listaDeJSON[filas].idFuente + '\',\'' + listaDeJSON[filas].SISTEMA + '\');"/></td>' : '';
        cad += '</tr>';
        if (listaDeJSON[filas]["SISTEMA"] != "TOTAL")
            cad += '<tr id="trHijo_' + filas + '" style="display:none;" class="trAOcultar"><td colspan="3">' + CreaSubTablaIncidenciasModoEstres(JSONSubLista, listaDeJSON[filas]["SISTEMA"], "SubTabla") + '</td></tr>';
    }
    cad += '</tbody>';
    cad += '</table>';
    cad += '</center>';
    return cad;
}

function CreaSubTablaIncidenciasModoEstres(listaDeJSON, sistema, idTabla) {
    var cad = '<center><table id="tblIncidencias' + idTabla + '" class="dataGridDatos" style="width:100%;">';
    cad += '<thead>';
    cad += '<tr valign="top">';
    cad += "<td style='width:1%;'></td>";
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados != "SISTEMA" && encabezados != "CAMPO" && encabezados != "idFuente") {
            cad += '<th valign="top" style="background: rgb(5, 95, 95);width:50%;">';
            cad += encabezados.toString();
            cad += '</th>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        if (listaDeJSON[filas].SISTEMA == sistema) {
            cad += ((filas % 2 == 0) ? '<tr style="/*background:rgba(128, 128, 128, 0.14) rgba(128, 128, 128, 0.46);*/" ' : '<tr  style="/*background: rgba(255, 255, 255, 0.72); rgba(128, 128, 128, 0.14)*/" ') + "  >";
            cad += "<td style='width:1%;background:transparent;'></td>";
            var json = listaDeJSON[filas];
            for (var element in json) {
                if (element != "SISTEMA" && element != "CAMPO" && element != "idFuente") {
                    cad += '<td style="' + ((filas % 2 == 0) ? 'background:rgba(128, 128, 128, 0.14);' : 'background: rgba(255, 255, 255, 0.72); ') + 'text-align:left;' + (element == "CLAVE" ? 'text-decoration: underline;color: blue;cursor:pointer;' : '') + '"' +
                                (element == "CLAVE" ? ' title="Clic para Ver Cédula" ' +
                                ' onclick="verCedulaCalidadValidaciones(\'' + listaDeJSON[filas].idFuente + '\',\'' + listaDeJSON[filas]["CLAVE"] + '\',\'' + listaDeJSON[filas]["SISTEMA"] + '\',\'' + listaDeJSON[filas]["NOMBRE"] + '\',false,false);" ' : '') + '>';
                    cad += json[element];
                    cad += '</td>';
                }
            }
            cad += '</tr>';
        }
    }
    cad += '</tbody>';
    cad += '</table>';
    cad += '</center>';
    return cad;
}

function btnDescargaMuestra_Click(sistema) {
    event.cancelBubble = true;
    __doPostBack('DescargaMuestra', sistema);
}

function btnProbarValidaciones_Click(idSistema, sistema) {
    event.cancelBubble = true;
    entroReportarStatusSubida = false;
    var cadena = '<div id="divBloqVtndivCargaMuestra" style="width:98%;height:80%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
    cadena += '<div> <div id="divVentanaCargaMuestra"> <center> <table border="0" cellpadding="0" cellspacing="0">';
    cadena += ' <tbody> <tr>  <td style="height: 5px;">  </td>';
    cadena += ' <td class="TextBoxArribaCentro" colspan="3" style="height: 25px;font: normal 10px Helvetica, Arial, sans-serif;" align="left"> &nbsp;<input type="file" name="fuAcuse" id="fuAcuse" style="font-family:Arial;font-size:X-Small;width:441px;">';
    cadena += '</td><td class="TextBoxArribaDerecha" style="height: 25px;text-align: right;">&nbsp;';
    cadena += '<input type="button" name="btnLoad" value="Cargar Archivo" id="btnCargarMuestra"  class="classButton" style="font-family:Arial;font-size:X-Small;" onclick="enviarArchivoAsincronamente(this,\'' + idSistema + '\',\'' + sistema + '\')"></td>';
    cadena += '</tr></tbody></table></center>';
    cadena += '</div></div>';
    $("#divCargaMuestra").empty();
    AgregarVtnFlotante("divCargaMuestra", "", "CARGA MUESTRA " + sistema.toUpperCase(), "", cadena, 140, 700, false, false, "", "", null);

}

function enviarArchivoAsincronamente(obj, idFuente, sistema) {
    if (!validarExistenciaDeArchivo($(obj).parent().parent().find("input:file"))) {
        return false;
    }
    setTimeout(verificaSiEntroReporteSubidaFile, 3000)
    var idInputFile = $(obj).parent().parent().find("input:file").attr("id");
    var parametros = { 'subirArchivo': 'subirArchivo', 'sistema': sistema, 'idFuente': idFuente };
    return ajaxFileUpload(idInputFile, parametros);
}

function verificaSiEntroReporteSubidaFile() {
    //    if (!entroReportarStatusSubida)
    //        WaitingVtn("divBloqVtndivCargaMuestra", false, false, "");
}

function validarExistenciaDeArchivo(obj) {
    var bandera = false;
    if ($(obj).val() == undefined || $(obj).val() == '' || $(obj).val().toUpperCase().indexOf('.CSV') == -1) {
        WaitingVtn("divBloqVtndivCargaMuestra", true, false, "Cargando Información...");
        MostrarMsj("Debe seleccionar un archivo <span style='font-weight:bold;'> .csv </span>", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 110, null, function () {
            WaitingVtn("divBloqVtndivCargaMuestra", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivCargaMuestra", false, false, "");
        });
        bandera = false;
    }
    else bandera = true;
    return bandera;
}

var seCargoFile = false;
function ajaxFileUpload(idInputFile, parametros) {
    WaitingVtn("divBloqVtndivCargaMuestra", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "5%";
    jQuery.ajaxFileUpload
		    ({
		        url: 'ModoEstres.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaDeArchivo(data, parametros.idFuente, parametros.sistema);
		        }
		    });
    return false;
}

var entroReportarStatusSubida = false;
function reportarStatusDeSubidaDeArchivo(data, idFuente, sistema) {
    entroReportarStatusSubida = true;
    data = data.toString().replace("<pre>", "").replace("</pre>", "").replace("<PRE>", "").replace("</PRE>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "");

    if (data.indexOf('ArchivoCargado') != -1) {
        $("#divCargaAcuse").dialog("close");
        WaitingVtn("divBloqVtndivCargaMuestra", true, false, "Cargando Información...");
        MostrarMsj("Sin Incidencias. Archivo validado exitosamente.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
            WaitingVtn("divBloqVtndivCargaMuestra", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivCargaMuestra", false, false, "");
        });
    }
    else if (data.indexOf('ErrorCATCH') != -1) {
        WaitingVtn("divBloqVtndivCargaMuestra", true, false, "Cargando Información...");
        MostrarMsj(data + ".", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
            WaitingVtn("divBloqVtndivCargaMuestra", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivCargaMuestra", false, false, "");
        });
    }
    else {
        WaitingVtn("divBloqVtndivCargaMuestra", false, false, "");
        $("#divCargaMuestra").dialog("close");
        var cadena = '<div id="divBloqVtnVerValidacionesMet" style="width:98.5%;height:96%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:99%;overflow:hidden;text-align:center;float:left;">';
        cadena += '<div id="dvDetalleEITblIncidencias" style="width:100%;height:100%;margin-top: 0px;">  ';
        cadena += '<div style="width:100%;height:8%;"><table style="width: 100%"><tr><td style="text-align: center; font-size: large"> <b style="font-size: 14px;">INCIDENCIAS ' + sistema.toUpperCase() + '</b></td></tr>' +
        '<tr><td style="text-align: right"><img src="../../Images/Cancelaciones/Cargas/excelImg.jpeg" id="btlExportToExel" onclick="__doPostBack(\'ExcelIncidencias\',\'' + sistema.toUpperCase() + '\')" class="imgCrecerMedium" title="Descargar Incidencias ' + sistema.toUpperCase() + '"/>';
        cadena += '</td></tr></table></div>';
        cadena += '<div style="width:100%;height:90%;overflow: auto;"><table style="width: 100%;"><tr> <td> <div id="dvContenidoIncidencias" > </div> </td></tr> </table></div>';
        cadena += '</div></div>';
        $("#divMuestraIncidencias").empty();
        AgregarVtnFlotante("divMuestraIncidencias", "", "INCIDENCIAS " + sistema.toUpperCase(), "", cadena, 780, 950, false, false, "", "", null);
        //WaitingVtn("divBloqVtnIncidencias", true, true, "Cargando Información...");
        //document.getElementById("imgVtnLoading").style.marginTop = "8%";
        var JSON = obtenerArregloDeJSON(data, false);
        var lstEncabezado = "";
        for (var encabezados in JSON[0])
            lstEncabezado += /*encabezados != "FIFitir" && encabezados != "FISubproducto" */true ? (encabezados + ",") : "";
        $("#dvContenidoIncidencias").html(creaTablaIncidencias(JSON, lstEncabezado, idFuente, sistema));
    }
}


function creaTablaIncidencias(listaDeJSON, listaEncabezados, idFuente, sistema) {
    var cad = '<center><div class="divContenidoTabla"><table class="dataGridDatos" style="width: 70%;">';
    cad += '<thead>';
    cad += '<tr>';
    for (var i = 0; i < listaEncabezados.split(',').length - 1; i++)
        cad += '<th style="text-align: center;">' + listaEncabezados.split(',')[i] + '</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            //if (element != "FIFitir" && element != "FISubproducto") {
            cad += '<td style="text-align:left;' + (element == "FVCClaveValidacion" ? 'text-decoration: underline;color: blue;cursor:pointer;' : '') + '"' +
                (element == "FVCClaveValidacion" ? ' title="Clic para Ver Cédula" ' +
                ' onclick="verCedulaCalidadValidaciones(\'' + idFuente + '\',\'' + listaDeJSON[filas]["FVCClaveValidacion"] + '\',\'' + sistema + '\',\'' + listaDeJSON[filas]["FVCNombreVal"] + '\',false,false);" ' : '') + '>';
            cad += json[element];
            cad += '</td>';
            //}
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div></center>';
    return cad;
}