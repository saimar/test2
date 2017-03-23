var Contador = 1;

function DescargaCobranza_click(objThis, nombreJob) {
    //Consultamos si se esta ejecutando el Job
    var parametrosExistJobAlnova = { nameJob: "AspDtsJobCobranzaMasivo", Tipoconexion: '164' };
    peticionAjax("PanelDeControl.aspx/DevuelveSP_ExisteJobActivo", "POST", parametrosExistJobAlnova,
        function DevuelveSP_ExisteJobActivoCob_Finish(data) {
            if (data.d == 'true') {
                alert("El proceso esta en ejecución.");
            } else {
                $("#divBloqueador").dialog("open");
                var parametros = { Opcion: (periocidadSelectXUser) == 1 ? 4 : 3, FechaCorte: $("#dpFechaPeriodoGral").attr("value") };
                peticionAjax('PanelDeControl.aspx/obtieneFaltantesCobranza', "POST", parametros, Tabla_FinalizadaCob, null);
            }
        }
    , null);
}

///*------------------------------- Tabla con Archivos Faltantes -----------------------------------------------------------*/

function Tabla_FinalizadaCob(data) {
    var cad = '';
    var JSON = obtenerArregloDeJSON(data.d, false);

    if (JSON.Status != undefined) { alert("No se pudo Generar la información, intente mas tarde"); return; }
    cad = generarTablaDeRegistrosCobranza(JSON);
    cad += '<br/><input type="button" value="Descargar Archivos" id="btnDescargaCobranza" class="classButton" onclick="EjecutaCargaCobranza();" />';
    //cad += '<br/><div id="dvMuestraErroresCobranza" class="VentanaFlotante"></div>';
    AgregarVtnFlotante("divArchivosFaltantesCobranza", "", "ARCHIVOS FALTANTES DE COBRANZA", "Seleccione los Archivos a Descargar", cad, (Contador * 30) + 90, 350, false, false, "", "", null);
    $("#divArchivosFaltantesCobranza").on("dialogclose", function (event, ui) { $("#divNombreArchivoCobranza").dialog("close"); });
    $("#divBloqueador").dialog("close");
    // MenuContextCuerpoTab();
}

function generarTablaDeRegistrosCobranza(listaDeJSON) {
    var encabezadoAux = '';
    var cad = '<center><table id="tblArchivosFCobranza" width="100%" class="dataGridDatos">';
    Contador = 1;
    cad += '<thead>';
    cad += '<tr valign="top">';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        cad += '<th valign="top">';
        cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '<th valign="top">';
    cad += '<input id="chkHeader" type="checkbox" onclick="SelectTodos(\'Encabezado\');" />';
    cad += '</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';

    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr  id="trCob_' + Contador + '" class="rowAlt" onDblClick="CambiaNombre(this);">' : '<tr  id="trCob_' + Contador + '" class="alternateRowAlt" onDblClick="CambiaNombre(this);">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td style="text-align:center">';
            cad += json[element];
            cad += '</td>';
        }
        cad += '<td style="text-align:center">';
        cad += '<input id="chkCob_' + Contador + '" type="checkbox" onclick="SelectTodos(\'Cuerpo\');" />';
        cad += '</td>';
        Contador = Contador + 1;
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}

///*-----------------------Selecciona Checkbox------------------------------------------------*/

function SelectTodos(Parte) {
    var noFilas = $('#tblArchivosFCobranza > tbody > tr').length;
    var i = 0;
    var seleccionados = 0;

    if (Parte == 'Encabezado') {
        for (i = 1; i < noFilas + 1; i++) { $("#chkHeader").is(':checked') == false ? $("#chkCob_" + i.toString()).attr('checked', false) : $("#chkCob_" + i.toString()).attr('checked', true); }
    } else {
        for (i = 1; i < noFilas + 1; i++) { $("#chkCob_" + i.toString()).is(':checked') == true ? (seleccionados = seleccionados + 1) : (seleccionados = seleccionados + 0); }
        seleccionados == noFilas ? $("#chkHeader").attr('checked', true) : $("#chkHeader").attr('checked', false);
    }
}

///*--------------------Cambiar Nombre------------------------------------------------------------------------------------------------------*/

function CambiaNombre(obj) {
    var cad = '';
    var celdas = $(obj).find('td');
    var id = $(obj).attr('id').split("_")[1];

    cad += '<table><tr><td>Nombre del Archivo: </td><td><input type="text" style="width:200px" id="tbxNombreArcCobranza" value="' + $(celdas[1]).html() + '" /></td></tr></table>';
    cad += '<br /><input type="button" value="Renombrar" id="btnModificaNombre" class="classButton" onclick="renombraArchivoCobranza(\'' + id.toString() + '\');" />';

    AgregarVtnFlotante("divNombreArchivoCobranza", "", "Editar Nombre de Archivo", "", cad, 100, 350, false, false, "", "", null);
}

function renombraArchivoCobranza(id) {
    var celdas = $("#trCob_" + id).find('td');
    $("#tbxNombreArcCobranza").val().replace(/\s/g, "") != "" ? $(celdas[1]).html($("#tbxNombreArcCobranza").val()) : alert("No ha ingresado un nombre de Archivo para Cobranza.");
    $("#divNombreArchivoCobranza").dialog("close");
}

///*---------------------------Descarga Archivos----------------------------------------------------------------------------------*/

function EjecutaCargaCobranza() {
    var noFilas = $('#tblArchivosFCobranza > tbody > tr').length;
    var cadenaTabla = '';
    var i = 0;

    for (i = 1; i < noFilas + 1; i++) {
        if ($("#chkCob_" + i.toString()).is(':checked') == true) {
            var celdas = $("#trCob_" + i.toString()).find('td');
            cadenaTabla += $(celdas[1]).html().toString() + '&';
        }
    }

    if (cadenaTabla.length > 0) {
        $("#divBloqueador").dialog("open");
        cadenaTabla = cadenaTabla.substring(0, cadenaTabla.length - 1);
        var parametros = { FechaCorte: $("#dpFechaPeriodoGral").attr("value").toString(), NomArch: cadenaTabla, usuario: userLogin };
        peticionAjax('PanelDeControl.aspx/EjecutaCargaMasivaCobranza', "POST", parametros, EstatusCargaCobranza, null);
    } else {
        alert("Debe seleccionar almenos un archivo a Cargar.");
    }
}

///*-------------------------- Monitorea Cobranza --------------------------------------*/

function EstatusCargaCobranza(data) {
    $("#divBloqueador").dialog("close");
    $("#divArchivosFaltantesCobranza").dialog("close");
    //$("#div14Td1_txt").show();
    //document.getElementById("div14Td1_txt").innerHTML = "<img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>";    
}

//function TerminaMonitoreo(data) {
//    if (data.d == 'true') {
//        alert("El proceso esta en ejecucion");
//    } else {
//    var parametros = {
//        FechaCorte: $("#dpFechaPeriodoGral").attr("value").toString()
//    }
//        peticionAjax("PanelDeControl.aspx/EjecucionFinalCobranza", "POST", parametros, MuestraTablaErrores, null);
//    }
//}

//function MuestraTablaErrores(data) {
//    var JSON = obtenerArregloDeJSON(data.d, false);
//    if (JSON.Status != undefined) {
//        alert("No se pudo Generar la información, intente mas tarde");
//        return;
//    }

//    var cad = '';
//    cad = generaTablaFinCobranza(JSON);
//    //$("#dvMuestraErroresCobranza").html(cad);

//    AgregarVtnFlotante("divVentanaReprocesos", "", "Monitorea Cobranza", "", cad, 500, 500, false, false, "", "", null);
//}

//function generaTablaFinCobranza(listaDeJSON) {
//    var cad = '<center><table width="100%" class="dataGridDatos">';
//    cad += '<thead>';
//    cad += '<tr valign="top">';
//    var auxJSON = listaDeJSON[0];
//    for (var encabezados in auxJSON) {
//        cad += '<th valign="top">';
//        cad += encabezados.toString();
//        cad += '</th>';
//    }

//    cad += '</tr>';
//    cad += '</thead>';
//    cad += '<tbody>';

//    for (var filas = 0; filas < listaDeJSON.length; filas++) {
//        cad += (filas % 2 == 0) ? '<tr class="rowAlt">' : '<tr class="alternateRowAlt">';
//        var json = listaDeJSON[filas];
//        for (var element in json) {
//            cad += '<td style="text-align:center">';
//            cad += json[element];
//            cad += '</td>';
//        }
//        cad += '</tr>';
//    }

//    cad += '</tbody>';
//    cad += '</table></center>';

//    return cad;
//}


//function MenuContextCuerpoTab() {
//    //    $.contextMenu({
//    //        selector: '.alternateRowAlt, .rowAlt',

//    //        callback: function (key, options) {
//    //            var cad = '';
//    //            var celdas = $(this).find('td');
//    //            var id = $(this).attr('id').split("_")[1];

//    //            cad += '<table><tr><td>Nombre del Archivo: </td><td><input type="text" style="width:200px" id="tbxNombreArcCobranza" value="' + $(celdas[1]).html() + '" /></td></tr></table>';
//    //            cad += '<br /><input type="button" value="Renombrar" id="btnModificaNombre" onclick="renombraArchivoCobranza(\'' + id.toString() + '\');" />';
//    //            
//    //            AgregarVtnFlotante("divNombreArchivoCobranza", "", "Editar Nombre de Archivo", "", cad, 100, 350, false, false, "", "", null);
//    //        },
//    //        items: {
//    //            "Editar": { name: "Editar Nombre", icon: "edit" }
//    //        }
//    //    });
//}



