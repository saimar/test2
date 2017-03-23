function LlamaPeticionAjaxDeCedulaFuente(fuenteP, idTd, DefFuente) {
    Waiting(true, "Cargando Información...");
    var parametros = { fuente: fuenteP, idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/obtieneTabInicial',
                    "POST", parametros, LlamaPeticionAjaxDeCedulaFuente_Finalizada, null);
    function LlamaPeticionAjaxDeCedulaFuente_Finalizada(data) {
        var valorData = "";
        for (i = 0; i < data.d.length; i++) {
            valorData += data.d[i] == "\\" ? '#' : data.d[i];
        }
        var JSON = obtenerArregloDeJSON(valorData, false);
        if (JSON.Status != undefined) {
            //    alert("No se pudo Generar la actividad, intente mas tarde");
            return;
        }

        var cadena = '<div id="divBloqVtnCedula" style="width:97%;height:95%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvCedulasFuentes" style="width: 100%; height: 100%; overflow: hidden; text-align: center;font-size:12px">';
        cadena += '<table style="width: 100%"> <tr><td> <div id="dvCedulaFuentes" style="width: 100%">';
        cadena += generarTablaDeRegistrosCedula(JSON, fuenteP);
        cadena += '</div></td> </tr></table></div>';
        $("#divVentanaCedulas").empty();
        $("#divVentanaCedulas").html(cadena);
        Waiting(false, "Cargando Información...");
        AgregarVtnFlotante("divVentanaCedulas", idTd + '_' + fuenteP + '_' + DefFuente, "CÉDULA " + DefFuente, "", cadena, 610, 500, true, false, "Editar Cédula", "", function Guarda_EditaCedula(obj) {
            if ($(".ui-button-text").html() == 'Editar Cédula') {
                $(".ui-button-text").html('Guardar Cambios');
                $(".ui-button-text").attr("class", "ui-button-text");
                $(".ui-datepicker-trigger").removeAttr("disabled");
                CambiaAEditable();
            } else {
                guardaCedula_Modificaciones(false);
            }
        });
        $('.FechasNoEdit1').datepicker({ minDate: -0 });
        $('.FechasNoEdit2').datepicker({ minDate: -0 });
        $('.FechasEdit1').datepicker({ minDate: -0 });
        $('.FechasEdit2').datepicker({ minDate: -0 });
        $(".ui-datepicker-trigger").attr("disabled", "disabled");
        if (PerfilUser == "35" || PerfilUser == "17") {
            $("#divVentanaCedulas").parent().children(2).find('button').attr('class', 'classButtonDis');
            $("#divVentanaCedulas").parent().children(2).find('button').attr("disabled", true);
        }
        //$(".ui-button-text").hide();         
        $(".ui-dialog-buttonset").parent().append('<div id="divBloqVtnCedulaBtns" style="width:95.1%;height:6%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none;padding:5px;margin-left:5px;margin-top:-14px">');
    }
}


function guardaCedula_Modificaciones(esEdicionRango) {
    //  alert("e");
    if (esEdicionRango && !compara_fecha($("#EditMasFI").val(), $("#EditMasFF").val())) {
        WaitingVtn("divBloqVtnCedula", true, false, "");
        WaitingVtn("divBloqVtnCedulaBtns", true, false, "");
        MostrarMsj("La Fecha Inicial debe de ser menor a la Fecha Final. ", "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, function () { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnCedula", false, false, ""); WaitingVtn("divBloqVtnCedulaBtns", false, false, ""); }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnCedula", false, false, "");
            WaitingVtn("divBloqVtnCedulaBtns", false, false, "");
        });
    }
    else {
        var DescTMas = '';
        var DescTMenos = '';
        var T0DD = trim($('#EditMasDD').val(), ''); var T0HH = trim($('#EditMasHH').val(), ''); var T0MM = trim($('#EditMasMM').val(), ''); var T0SS = trim($('#EditMasSS').val(), '');
        var TNDD = trim($('#EditMenosDD').val(), ''); var TNHH = trim($('#EditMenosHH').val(), ''); var TNMM = trim($('#EditMenosMM').val(), ''); var TNSS = trim($('#EditMenosSS').val(), '');

        DescTMas = (T0DD.length == 2 ? T0DD : T0DD.length == 1 ? "0" + T0DD : "00") + ',' + (T0HH.length == 2 ? T0HH : T0HH.length == 1 ? "0" + T0HH : "00") + ':' + (T0MM.length == 2 ? T0MM : T0MM.length == 1 ? "0" + T0MM : "00") + ':' + (T0SS.length == 2 ? T0SS : T0SS.length == 1 ? "0" + T0SS : "00");
        DescTMenos = (TNDD.length == 2 ? TNDD : TNDD.length == 1 ? "0" + TNDD : "00") + ',' + (TNHH.length == 2 ? TNHH : TNHH.length == 1 ? "0" + TNHH : "00") + ':' + (TNMM.length == 2 ? TNMM : TNMM.length == 1 ? "0" + TNMM : "00") + ':' + (TNSS.length == 2 ? TNSS : TNSS.length == 1 ? "0" + TNSS : "00");
        /*-----------------------------Para la Ruta -----------------------------------------*/

        var ruta = $('#RutaEdit3').val();
        var start = 0;
        var contar = 0;

        var parametros = '';
        parametros = {
            Fuente: $(".ui-button-text").attr("id").split("_")[1],
            //                Nombre: $('#lbEdit_0').val(),
            //                NombreSistema: $('#lbEdit_1').val(),
            //                Sistema: $('#lbEdit_2').val(),
            //                Origen: ruta,
            Contenido: $('#lbEdit_4').val(),
            //                Factor: $('#lbEdit_5').val(),
            //                Proceso: $('#lbEdit_6').val(),
            DescProceso: $('#lbEdit_7').val(),
            //                DescTMas: DescTMas,
            //                DescTMenos: DescTMenos,
            AreaResp: $('#lbEdit_12').val(),
            Responsable: $('#lbEdit_13').val(),
            idPais: PaisSelectXUser,
            FdFechaInicialRango: esEdicionRango ? $("#EditMasFI").val() : $("#NoEditMasFI").val(),
            FdFechaFinalRango: esEdicionRango ? $("#EditMasFF").val() : $("#NoEditMasFF").val(),
            FVCFechaHistoricoRangos: esEdicionRango ? $("#lbEdit_11").val() : $("#lb_11").val()
        }

        peticionAjax('PanelDeControl.aspx/GuardaCedula', "POST", parametros, function GuardaCedula_Finish(data) {
            if (!esEdicionRango)
                $("#divVentanaCedulas").dialog("close");
            else {
                WaitingVtn("divBloqVtnCedula", true, false, "");
                WaitingVtn("divBloqVtnCedulaBtns", true, false, "");
                CancelarEdicionRangoActivo();
                $("#NoEditMasFI").val($("#EditMasFI").val());
                $("#NoEditMasFF").val($("#EditMasFF").val());
                $("#lb_11").val($("#lbEdit_11").val());
            }
            MostrarMsj("Información Almacenda Correctamente", " AVISO " + $(".ui-button-text").attr("id").split("_")[2], false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnCedula", false, false, "");
                WaitingVtn("divBloqVtnCedulaBtns", false, false, "");
            });
        }, null);
    }
}


function CambiaAEditable() {
    /*-----------------------------CONTENIDO---------------------------------*/
    $(document.getElementById('Edit_CONTENIDO')).show();
    $(document.getElementById('CONTENIDO')).hide();
    /*-----------------------------DESCRIPCION PROCESO---------------------------------*/
    $(document.getElementById('Edit_DESCRIPCION PROCESO')).show();
    $(document.getElementById('DESCRIPCION PROCESO')).hide();
    /*-----------------------------AREA RESPONSABLE---------------------------------*/
    $(document.getElementById('Edit_AREA RESPONSABLE')).show();
    $(document.getElementById('AREA RESPONSABLE')).hide();
    /*-----------------------------RESPONSABLE---------------------------------*/
    $(document.getElementById('Edit_RESPONSABLE')).show();
    $(document.getElementById('RESPONSABLE')).hide();
    /*-----------------------------LAYOUT---------------------------------*/
    $(document.getElementById('SubirArchivoEdit')).show();
    $(document.getElementById('SubirArchivo')).hide();
    /*-----------------------------ARCHIVO MUESTRA---------------------------------*/
    $(document.getElementById('SubirArchivoEditMu')).show();
    $(document.getElementById('SubirArchivoMu')).hide();
}

function generarTablaDeRegistrosCedula(listaDeJSON, fuente) {
    var encabezadoAux = '';
    var cad = '<center><table id="tblContenidoproyectos" width="100%" class="dataGridDatos" style="font-size: 9px;">';

    cad += '<thead>';
    cad += '<tr style="font-size: 9px;">';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados.toString() == 'CONCEPTO') {
            cad += '<th>';
        } else {
            cad += '<th>';
        }
        cad += encabezados.toString();
        cad += '</th>';
    }

    cad += '</tr>';
    cad += '</thead>';

    cadSec = '';
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

            if (element == 'DESCRIPCION' && json["CONCEPTO"] == 'DESCARGA PREDEFINIDA T0+') {

                cad += ColocaHorasTMas(json[element]);

            } else if (element == 'DESCRIPCION' && json["CONCEPTO"] == 'ARCHIVO A DESCARGAR T-N') {

                cad += ColocaHorasTMenos(json[element]);

            } else if (element == 'DESCRIPCION' && json["CONCEPTO"] == 'RANGO ACTIVO') {

                cad += ColocaCalendariosRangoActivo(json[element]);

            } else if (element == 'DESCRIPCION' && json["CONCEPTO"] == 'ORIGEN') {

                cadSec = json["DESCRIPCION"].split('&&').join('\\');;
                while ((start = cadSec.indexOf("#", start) + 1) > 0)
                    contar++;

                for (i = 0; i < contar; i++)
                    cadSec = cadSec.replace('#', '\\');

                cad += '<div id="' + json["CONCEPTO"] + '" style="width:100%;font-size: 8px;">';
                cad += '<textarea cols="30" rows="2" id="Ruta' + Contador + '"  disabled="disabled" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:#dddddd;width:100%; text-align:left; border: none;height:25px" >' + cadSec + "</textarea>";
                cad += '</div>';

                cad += '<div id="Edit_' + json["CONCEPTO"] + '" style="width:100%;background-color:White; display:none;font-size: 8px;">';
                cad += '<textarea cols="30" rows="2" id="RutaEdit' + Contador + '"  style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:#dddddd;width:100%; text-align:left; border: none;height:25px" >' + cadSec + "</textarea>";
                cad += '</div>';

                //cad += cadSec;
            } else if (element == 'DESCRIPCION' && json["CONCEPTO"] != 'ORIGEN' && json["CONCEPTO"] != 'ARCHIVO A DESCARGAR T-N' && json["CONCEPTO"] != 'DESCARGA PREDEFINIDA T0+') {
                cad += '<div id="' + json["CONCEPTO"] + '" style="width:100%;font-size: 9px;">';
                if (filas == 0 || filas == 1 || filas == 2 || filas == 5 || filas == 6)
                    cad += '<input id="lb_' + Contador + '" value="' + json[element] + '" disabled="disabled"  style="background-color:#dddddd;width:100%; text-align:left; border: none;font-size: 9px; " />';
                else
                    cad += '<textarea cols="30" rows="' + ((filas == 4 || filas == 7) ? "4" : "2") + '" id="lb_' + Contador + '"  disabled="disabled" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:#dddddd;width:100%; text-align:left; border: none;height:25px" >' + json[element] + "</textarea>";
                cad += '</div>';

                cad += '<div id="Edit_' + json["CONCEPTO"] + '" style="width:100%;background-color:White; display:none;font-size: 9px;">';
                if (filas == 0 || filas == 1 || filas == 2 || filas == 5 || filas == 6)
                    cad += '<input id="lbEdit_' + Contador + '" value="' + json[element] + '" style="background-color:White;color:Black; width:100%; text-align:left;font-size: 9px;" />';
                else
                    cad += '<textarea cols="30" rows="' + ((filas == 4 || filas == 7) ? "3" : "2") + '" id="lbEdit_' + Contador + '" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:100%; text-align:left; border: x;height:25px" >' + json[element] + "</textarea>";
                cad += '</div>';
            } else {
                cad += json[element];
            }
            cad += '</td>';
        }
        Contador = Contador + 1;
        cad += '</tr>';
    }

    /*-----------------------------  LAYOUT -----------------------------------------------------------------*/
    cad += '<tr  class="alternateRow" style="font-size: 9px;">';
    cad += '<td  style="text-align:left; width : 250px;font-size: 9px;">LAY OUT</td><td  style="text-align:left" style="width:100%;font-size: 9px;" id="tdDownloadFileLayout_' + fuente + '" >';
    cad += '<div id="SubirArchivo" >';
    cad += '<img src="../../images/PanelDeControl/DescargaFiles.png" id="imgObtenerLayout1_' + fuente + '" style="width:25px;  height:25px; cursor:pointer;"   onclick="obtieneArchivoAd(this,1);"/>&nbsp;<span style="font-size: 9px;">DESCARGAR LAYOUT</span>';
    cad += '</div>';

    cad += '<div id="SubirArchivoEdit" style="width:100%;background-color:White; display:none;font-size: 9px;">';
    cad += '<input type="file" id="fuArchivosAdjuntos" name="fuArchivosAdjuntos" style="width:90%; height:20px; font-size: 9px" />';
    cad += '<img alt="Subir LAYOUT" id="imgSubirLayout1_' + fuente + '" src="../../images/PanelDeControl/Upfiles.png" style="width:25px;  height:25px" onclick="enviarArchivoAsincronamente(this,1);"  />';
    cad += '</div></td>';
    cad += '</tr>';

    /*----------------------------- ARCHIVO MUESTRA ------------------------------------------------------*/
    cad += '<tr  class="alternateRow" style="font-size: 9px;">';
    cad += '<td  style="text-align:left; width : 250px;font-size: 9px;">ARCHIVO MUESTRA</td><td  style="text-align:left;font-size: 9px;" id="tdDownloadFileMuestra_' + fuente + '" >';
    cad += '<div id="SubirArchivoMu" style="width:100%;font-size: 9px;" >';
    cad += '<img src="../../images/PanelDeControl/DescargaFiles.png" id="imgSubirLayout2_' + fuente + '" style="width:25px;  height:25px; cursor:pointer;" onclick="obtieneArchivoAd(this,2);" />&nbsp;<span style="font-size: 9px;">DESCARGAR ARCHIVO</span>';
    cad += '</div>';

    cad += '<div id="SubirArchivoEditMu" style="width:100%;background-color:White; display:none;font-size: 9px;">';
    cad += '<input type="file" id="fuArchivosAdjuntosMu" name="fuArchivosAdjuntos" style="width:90%; height:20px; font-size: 9px" />';
    cad += '<img alt="Subir LAYOUT" src="../../images/PanelDeControl/Upfiles.png" id="imgSubirLayout2_' + fuente + '" style="width:25px;  height:25px" onclick="enviarArchivoAsincronamente(this,2);"  />';
    cad += '</div></td>';
    cad += '</tr><tr><td></td><td> <span id="lbError" style="color:Red;"></span></td></tr>';

    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}

function ColocaCalendariosRangoActivo(cadena) {
    var cad = "";
    var fechas = cadena.split("//");
    var fechaInicial = fechas[0].split('-')[2] + '/' + fechas[0].split('-')[1] + '/' + fechas[0].split('-')[0];
    var fechaFinal = fechas[1].split('-')[2] + '/' + fechas[1].split('-')[1] + '/' + fechas[1].split('-')[0];

    cad += '<div id="RangoActivo" style="font-size: 9px;">';
    cad += 'Del <input class="FechasNoEdit1" maxlength="10" id="NoEditMasFI" value="' + fechaInicial + '" disabled="disabled"  style="background-color:#dddddd;width:30%; text-align:center; border: none;font-size: 9px; " />&nbsp;<b> al </b>&nbsp;';
    cad += '<input class="FechasNoEdit2" maxlength="10" id="NoEditMasFF" value="' + fechaFinal + '" disabled="disabled"  style="background-color:#dddddd;width:30%; text-align:center; border: none;font-size: 9px; " />&nbsp;<b></b>&nbsp;';
    cad += '<img lang="aa" onclick="HabilitarEdicionRangoActivo()" title="Editar Rango Activo" src="../../Images/PanelDeControl/edit.png" style="height: 20px;width: 15px;margin: -50% 0% 2% 90%;">'
    cad += '</div>';
    cad += '<div id="RangoActivoDIT" style=" display:none;font-size: 9px;" >&nbsp;<b> </b>&nbsp;';
    cad += 'Del <input class="FechasEdit1" maxlength="10" id="EditMasFI" value="' + fechaInicial + '" style="background-color:White;color:Black; width:25%; text-align:center; border: x; font-size: 9px;" />&nbsp;<b> al </b>&nbsp;';
    cad += '<input class="FechasEdit2" maxlength="10" id="EditMasFF" value="' + fechaFinal + '"  style="background-color:White;color:Black; width:25%; text-align:center; border: x;font-size: 9px; " />&nbsp;<b></b>&nbsp;';
    cad += '<img lang="aa" onclick="guardaCedula_Modificaciones(true)" title="Guardar Rango Activo" src="../../Images/PanelDeControl/guardar.png" style="height: 17px;width: 18px;">&nbsp&nbsp'
    cad += '<img lang="aa" onclick="CancelarEdicionRangoActivo() " title="Cancelar Edición Rango Activo" src="../../Images/PanelDeControl/cerrar.png" style="height: 17px;width: 18px;">'
    cad += '</div>';
    return cad;
}

function HabilitarEdicionRangoActivo() {
    $(document.getElementById('RangoActivoDIT')).show();
    $(document.getElementById('RangoActivo')).hide();
    $(document.getElementById('Edit_HISTORICO')).show();
    $(document.getElementById('HISTORICO')).hide();
    document.getElementById("lbEdit_11").style.border = "none";
    document.getElementById("lbEdit_11").style.backgroundColor = "rgb(221, 221, 221)";

    var cadenaHistorico = "";
    if ($("#NoEditMasFI").val() == $("#NoEditMasFF").val())
        cadenaHistorico = $("#lb_11").val() + ($("#lb_11").val() != "" ? "," : "") + $("#NoEditMasFF").val();
    else
        cadenaHistorico = $("#lb_11").val() + ($("#lb_11").val() != "" ? "," : "") + $("#NoEditMasFI").val() + " AL " + (compara_fecha($("#EditMasFF").val(), FechaActualSistema) ? $("#NoEditMasFF").val() : FechaActualSistema);
    $("#lbEdit_11").val(cadenaHistorico);
    $("#EditMasFI").val(FechaActualSistema);
    $("#EditMasFF").val(FechaActualSistema);
}

function CancelarEdicionRangoActivo() {
    $(document.getElementById('RangoActivoDIT')).hide();
    $(document.getElementById('RangoActivo')).show();
    $(document.getElementById('Edit_HISTORICO')).hide();
    $(document.getElementById('HISTORICO')).show();
}

function ColocaHorasTMas(cadena) {
    var cad = '';
    var CadenaDias = cadena.split(",");
    var CaedaHoras = CadenaDias[1].split(":");

    cad += '<div id="DESCARGATMas" style="font-size: 9px;">';
    cad += 'DD <input maxlength="2" value="' + CadenaDias[0] + '" disabled="disabled"  style="background-color:#dddddd;width:17%; text-align:center; border: none;font-size: 9px; " />&nbsp;<b>,</b>&nbsp;';
    cad += 'HH <input maxlength="2" value="' + CaedaHoras[0] + '" disabled="disabled" style="background-color:#dddddd;width:17%; text-align:center; border: none;font-size: 9px; " />&nbsp;<b>:</b>&nbsp;';
    cad += 'MM <input maxlength="2" value="' + CaedaHoras[1] + '" disabled="disabled" style="background-color:#dddddd;width:17%; text-align:center; border: none;font-size: 9px; " />&nbsp;<b>:</b>&nbsp;';
    cad += 'SS<input maxlength="2" value="' + CaedaHoras[2] + '" disabled="disabled" style="background-color:#dddddd;width:17%; text-align:center; border: none; font-size: 9px;" />';
    cad += '</div>';
    cad += '<div id="DESCARGATMasDIT" style="background-color:White; display:none;font-size: 9px;" >&nbsp;<b> </b>&nbsp;';
    cad += 'DD <input maxlength="2" id="EditMasDD" value="' + CadenaDias[0] + '" style="background-color:White;color:Black; width:17%; text-align:center; border: none; font-size: 9px;" />&nbsp;<b>,</b>&nbsp;';
    cad += 'HH <input maxlength="2" id="EditMasHH" value="' + CaedaHoras[0] + '"  style="background-color:White;color:Black; width:17%; text-align:center; border: none;font-size: 9px; " />&nbsp;<b>:</b>&nbsp;';
    cad += 'MM <input maxlength="2" id="EditMasMM" value="' + CaedaHoras[1] + '"  style="background-color:White;color:Black;  width:17%; text-align:center; border: none; font-size: 9px;" />&nbsp;<b>:</b>&nbsp;';
    cad += 'SS <input maxlength="2" id="EditMasSS" value="' + CaedaHoras[2] + '"  style="background-color:White;color:Black; width:17%; text-align:center; border: none;font-size: 9px; " />';
    cad += '</div>';
    return cad;
}

function ColocaHorasTMenos(cadena) {
    var cad = '';
    var cad = '';
    var CadenaDias = cadena.split(",");
    var CaedaHoras = CadenaDias[1].split(":");

    cad += '<div id="DESCARGATNMenos" style="font-size: 9px;">';
    cad += 'DD <input maxlength="2" value="' + CadenaDias[0] + '" disabled="disabled"  style="background-color:#dddddd;width:17%; text-align:center; border: none; font-size: 9px;" />&nbsp;<b>,</b>&nbsp;';
    cad += 'HH <input maxlength="2" value="' + CaedaHoras[0] + '" disabled="disabled" style="background-color:#dddddd;width:17%; text-align:center; border: none; font-size: 9px;" />&nbsp;<b>:</b>&nbsp;';
    cad += 'MM <input maxlength="2" value="' + CaedaHoras[1] + '" disabled="disabled" style="background-color:#dddddd;width:17%; text-align:center; border: none; font-size: 9px;" />&nbsp;<b>:</b>&nbsp;';
    cad += 'SS <input maxlength="2" value="' + CaedaHoras[2] + '" disabled="disabled" style="background-color:#dddddd;width:17%; text-align:center; border: none; font-size: 9px;" />';
    cad += '</div>';
    cad += '<div id="DESCARGARTNMenosEDIT" style="background-color:White; display:none;font-size: 9px;">&nbsp;<b>-</b>&nbsp;';
    cad += 'DD <input maxlength="2" id="EditMenosDD" value="' + CadenaDias[0] + '" style="background-color:White;color:Black; width:17%; text-align:center; border: none;font-size: 9px; " />&nbsp;<b>,</b>&nbsp;';
    cad += 'HH <input maxlength="2" id="EditMenosHH" value="' + CaedaHoras[0] + '"  style="background-color:White;color:Black; width:17%; text-align:center; border: none; font-size: 9px;" />&nbsp;<b>:</b>&nbsp;';
    cad += 'MM <input maxlength="2" id="EditMenosMM" value="' + CaedaHoras[1] + '"  style="background-color:White;color:Black;  width:17%; text-align:center; border: none;font-size: 9px; " />&nbsp;<b>:</b>&nbsp;';
    cad += 'SS <input maxlength="2" id="EditMenosSS" value="' + CaedaHoras[2] + '"  style="background-color:White;color:Black; width:17%; text-align:center; border: none;font-size: 9px; " />';
    cad += '</div>';
    return cad;
}

function ColocaCalendario() {
    $("#txtPruebaCalendario").datepicker({
        showWeek: true,
        firstDay: 1,
        numberOfMonths: 1,
        dateFormat: "dd/mm/yy",
        backgroundColor: '#C40000',
        color: '#FFF',
        onSelect: function () {
            //alert($(".ui-datepicker-month").html());
        }
    });
}

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}
function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}





/*--------------------------------- SUBIR ARCHIVO ------------------------------------------*/

function enviarArchivoAsincronamente(obj, idTipoArchivo) {

    if (!validarExistenciaDeArchivo($(obj).parent().find("input:file"))) {
        return false;
    }

    WaitingVtn("divBloqVtnCedula", true, true, "Cargando Información");
    WaitingVtn("divBloqVtnCedulaBtns", true, false, "");
    $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButtonDis");
    $($(".ui-button-text").parent().parent().find(":button")[0]).attr("disabled", "disabled");

    var idInputFile = $(obj).parent().find("input:file").attr("id");

    var parametros = {
        'subirArchivo': 'subirArchivo',
        'idFuente': $(obj).attr("id").split("_")[1],
        'idTipoArchivo': idTipoArchivo
    };
    return ajaxFileUpload(idInputFile, obj, parametros);
}

//------------------------------------------------------------------------------------------
function validarExistenciaDeArchivo(obj) {
    var bandera = false;
    if ($(obj).val() == '') {
        // alert('Debe seleccionar un archivo');
        $('#lbError').html("Seleccione un archivo.");
        //MostrarMsj("Debe seleccionar un archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
        bandera = false;
    }
    else {
        bandera = true;
    }
    return bandera;
}

//------------------------------------------------------------------------------------------
var nomArchivoASubir;
function ajaxFileUpload(idInputFile, obj, parametros) {
    $.ajaxFileUpload
		    ({
		        url: 'PanelDeControl.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaAdjuntos(data, obj);
		        }
		    });
    return false;
}

//------------------------------------------------------------------------------------------
function reportarStatusDeSubidaAdjuntos(data, obj) {
    $("#ExpanderGrid").hide();
    $("#div2").hide();
    $('#tblNewUnidadeseg').html("");
    $('#lbError').html("");
    $('#lblMensaje').html("");
    data = data.toString().replace("<PRE>", "").replace("</PRE>", "").replace("<pre>", "").replace("</pre>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "").replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');
    if (data.split("%%&amp;&amp;")[0] == "CargaFileComplemento") {
        var script = document.createElement("script");
        script.innerHTML = data.split("%%&amp;&amp;").length == 3 ? (data.split("%%&amp;&amp;")[1] + "<br />" + data.split("%%&amp;&amp;")[2]) : data.split("%%&amp;&amp;")[1];
        document.body.appendChild(script);
        if (data.indexOf("nbsp") != -1) {
            peticionAjax("PanelDeControl.aspx/DevuelveTablaNuevasUnidadesDeNegocio", "POST", null, function (data) {
                $("#ExpanderGrid").show();
                toggleSlide('div2', 'insert2', 'vtnH', 'divCargaFileComplemento', -1);
                $('#tblNewUnidadesNeg').html(data.d);
                WaitingVtn("divBloqVtnCedula", false, false, "");
            }, null);
        }
        else
            WaitingVtn("divBloqVtndivCargaFileComplemento", false, false, "");
    }
    WaitingVtn("divBloqVtnCedula", false, false, "");
    WaitingVtn("divBloqVtnCedulaBtns", false, false, "");
    $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButton");
    $($(".ui-button-text").parent().parent().find(":button")[0]).removeAttr("disabled");
}

/*--------------------------------- DESCARGAR ARCHIVO ------------------------------------------*/
//----------------------------Obtiene el archivo Fisico 
function obtieneArchivoAd(obj, idTipoArchivo) {
    var parametros = { IdFuente: $(obj).attr("id").split("_")[1], idTipoArchivo: idTipoArchivo };
    peticionAjax('Respuestas.aspx/DeterminaExisteArchivoCedulaFuente',
                    "POST", parametros, LlamaPeticionAjaxDeObtieneArchivoAd_Finalizada, null);
    function LlamaPeticionAjaxDeObtieneArchivoAd_Finalizada(data) {
        if (data.d == "true") {
            //window.location.href("Respuestas.aspx?idFuente=" + $(obj).attr("id").split("_")[1] + "&&idTipoArchivo=" + idTipoArchivo);
            window.location.assign("Respuestas.aspx?idFuente=" + $(obj).attr("id").split("_")[1] + "&&idTipoArchivo=" + idTipoArchivo)
        }
        else {
            WaitingVtn("divBloqVtnCedula", true, false, "");
            WaitingVtn("divBloqVtnCedulaBtns", true, false, "");
            $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButtonDis");
            $($(".ui-button-text").parent().parent().find(":button")[0]).attr("disabled", "disabled");
            MostrarMsj("No existe documento asociado. ", "Mensaje", false, true, false, "", "Aceptar", "", 250, 100, null, function () { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnCedula", false, false, ""); WaitingVtn("divBloqVtnCedulaBtns", false, false, ""); }, null);
        }
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnCedula", false, false, "");
            WaitingVtn("divBloqVtnCedulaBtns", false, false, "");
            $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButton");
            $($(".ui-button-text").parent().parent().find(":button")[0]).removeAttr("disabled");
        });
    }

}
function addJavascript(jsname, pos) {
    var th = document.getElementsByTagName(pos)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', jsname);
    th.appendChild(s);
}
