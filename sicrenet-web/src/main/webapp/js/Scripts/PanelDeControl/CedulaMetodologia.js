

function CargaCedulaMetodologia(idMetodologia, defMetodologia) {
    var cadena = '<div id="divBloqVtnCedula" style="width:97%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvCedulasFuentes" style="width: 100%; height: 100%; overflow: hidden; text-align: center;font-size:12px">';
    cadena += '<table style="width: 100%"> <tr><td> <div id="dvCedulaFuentes" style="width: 100%">';
    cadena += '</div></td> </tr></table></div>';

    AgregarVtnFlotante("divVentanaCedulas", idMetodologia, "CÉDULA " + defMetodologia.split('%%%')[0], "", cadena, 250, 450, true, false, "Editar Cédula", "", function Guarda_EditaCedula(obj) {
        if ($(".ui-button-text").html() == 'Editar Cédula') {
            $(".ui-button-text").html('Guardar Cambios');
            $(".ui-button-text").attr("class", "ui-button-text");
            $(".ui-datepicker-trigger").removeAttr("disabled");
            CambiaAEditableCedulaMEtodologia();
        } else {
            guardaCedulaMetodologias_Modificaciones(idMetodologia);
        }
    });

    WaitingVtn("divBloqVtnCedula", true, true, "Cargando Información");
    WaitingVtn("divBloqVtnCedulaBtns", true, false, "");
    $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButtonDis");
    $($(".ui-button-text").parent().parent().find(":button")[0]).attr("disabled", "disabled");

    peticionAjax("PanelDeControl.aspx/ObtenerDatosCedulaMetodologia", "POST", { idMet: idMetodologia }, function (data) {
        if (data.d.indexOf('ErrorCATCH') == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#dvCedulaFuentes").html(creaTablaCedulaMet(idMetodologia, defMetodologia, JSON[0]));
                $('.FechasNoEdit1').datepicker({ minDate: -0 });
                $('.FechasNoEdit2').datepicker({ minDate: -0 });
                $('.FechasEdit1').datepicker({ minDate: -0 });
                $('.FechasEdit2').datepicker({ minDate: -0 });
                $(".ui-datepicker-trigger").attr("disabled", "disabled");
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
        WaitingVtn("divBloqVtnCedula", false, false, "");
        WaitingVtn("divBloqVtnCedulaBtns", false, false, "");
        $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButton");
        $($(".ui-button-text").parent().parent().find(":button")[0]).removeAttr("disabled");
    }, null);
}

function creaTablaCedulaMet(idMetodologia, defMetodologia, JSON) {
    var fechaIn = JSON.FechaInicio.split('/');
    var fechaFin = JSON.FechaFin.split('/');
    var cad = '<table class="dataGridDatos">' +
    '<tr style="font-size: 9px;"><th>CONCEPTO</th><th>DESCRIPCION</th></tr>' +
    '<tr class="alternateRow" style="font-size: 9px;"><td style="text-align:left;width:30%;  height: 25x;font-size: 9px;">NOMBRE</td><td style="text-align:left;width:70%;  height: 25px;font-size: 9px;"><div id="NOMBRE" style="width:100%;font-size: 9px;">' +
    '<input id="lb_0" value="' + defMetodologia.split('%%%')[0] + '" disabled="disabled" style="background-color:#dddddd;width:100%; text-align:left; border: none;font-size: 9px; "></div><div id="Edit_NOMBRE" style="width:100%;background-color:White; display:none;font-size: 9px;">' +
    '<input id="lbEdit_0" value="' + defMetodologia.split('%%%')[0] + '" style="background-color:White;color:Black; width:100%; text-align:left;font-size: 9px;"></div></td></tr>' +
    '<tr class="row" style="height: 25px;"><td style="width: 25%;text-align:left;">RANGO ACTIVO</td><td style="text-align:left;">';
    cad += '<div id="RangoActivo" style="font-size: 9px;">';
    cad += 'Del <input class="FechasNoEdit1" maxlength="10" id="NoEditMasFI" value="' + fechaIn[0] + '/' + fechaIn[1] + '/' + fechaIn[2] + '" disabled="disabled"  style="background-color:#dddddd;width:30%; text-align:center; border: none;font-size: 9px; " />&nbsp;<b> al </b>&nbsp;';
    cad += '<input class="FechasNoEdit2" maxlength="10" id="NoEditMasFF" value="' + fechaFin[0] + '/' + fechaFin[1] + '/' + fechaFin[2] + '" disabled="disabled"  style="background-color:#dddddd;width:30%; text-align:center; border: none;font-size: 9px; " />&nbsp;<b></b>&nbsp;';
    cad += '</div>';
    cad += '<div id="RangoActivoDIT" style=" display:none;font-size: 9px;" >&nbsp;<b> </b>&nbsp;';
    cad += 'Del <input class="FechasEdit1" maxlength="10" id="EditMasFI" value="' + fechaIn[0] + '/' + fechaIn[1] + '/' + fechaIn[2] + '" style="background-color:White;color:Black; width:30%; text-align:center; border: x; font-size: 9px;" onchange="changeFormatoFecha(event,this);" onkeyup="changeFormatoFecha(event,this);" onkeypress="if (event.keyCode==13) return false;"/>&nbsp;<b> al </b>&nbsp;';
    cad += '<input class="FechasEdit2" maxlength="10" id="EditMasFF" value="' + fechaFin[0] + '/' + fechaFin[1] + '/' + fechaFin[2] + '"  style="background-color:White;color:Black; width:30%; text-align:center; border: x;font-size: 9px; " onchange="changeFormatoFecha(event,this);" onkeyup="changeFormatoFecha(event,this);" onkeypress="if (event.keyCode==13) return false;"/>&nbsp;<b></b>&nbsp;';
    cad += '</div></td></tr>' +
           '<tr class="alternateRow" style="font-size: 9px;"><td style="text-align:left;width:30%;  height: 25x;font-size: 9px;">HISTORICO</td><td style="text-align:left;width:70%;  height: 25px;font-size: 9px;"><div id="divHistorico" style="width:100%;font-size: 9px;">' +
           '<textarea cols="30" rows="2" id="lb_11" disabled="disabled" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:#dddddd;width:100%; text-align:left; border: none;height:25px">' + JSON.Historico + '</textarea></div>' +
           '<div id="divEdit_Historico" style="width:100%;background-color:White; display:none;font-size: 9px;"><textarea cols="30" rows="2" id="lbEdit_11" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:100%; text-align:left; border: x;height:25px">' + JSON.Historico + '</textarea></div></td></tr>';
    cad += '<tr class="row"><td style="text-align:left;">ARCHIVO</td><td style="text-align:left;">' +
           '<div id="divSubirArchivo"><div id="divDownFile_' + idMetodologia + '" onclick="obtieneArchivoAd(this,3);" title="' + (JSON.nombreFile != "" ? 'Clic para Descargar Archivo \'' + JSON.nombreFile + '\'' : 'No Existe Documento Asociado') + '"><img src="../../images/PanelDeControl/DescargaFiles.png" id="imgObtenerLayout1_' + idMetodologia + '" style="width:25px;  height:25px" >&nbsp;<span style="font-size: 9px;">DESCARGAR ARCHIVO CÉDULA</span></div></div>' +
           '<div id="divSubirArchivoEdit" style="width: 100%; background-color: white; font-size: 9px;display:none"><input type="file" id="fuArchivosAdjuntos" name="fuArchivosAdjuntos" style="width:90%; height:20px; font-size: 9px">' +
           '<img alt="Subir LAYOUT" id="imgSubirLayout1_' + idMetodologia + '" src="../../images/PanelDeControl/Upfiles.png" style="width:25px;  height:25px" onclick="enviarArchivoAsincronamente(this,3);" title="Clic para Guardar Archivo"/><span id="lbError" style="color:Red;"></span>' +
           '</div></td></tr></table>';
    return cad;
}

function CambiaAEditableCedulaMEtodologia() {
    $(document.getElementById('RangoActivoDIT')).show();
    $(document.getElementById('RangoActivo')).hide();

    var cadenaHistorico = "";
    if ($("#NoEditMasFI").val() == $("#NoEditMasFF").val())
        cadenaHistorico = $("#lb_11").val() + ($("#lb_11").val() != "" ? "," : "") + $("#NoEditMasFF").val();
    else
        cadenaHistorico = $("#lb_11").val() + ($("#lb_11").val() != "" ? "," : "") + $("#NoEditMasFI").val() + " AL " + (compara_fecha($("#EditMasFF").val(), FechaActualSistema) ? $("#NoEditMasFF").val() : FechaActualSistema);
    $("#lb_11").val(cadenaHistorico);
    $("#EditMasFI").val(FechaActualSistema);
    $("#EditMasFF").val(FechaActualSistema);

    $(document.getElementById('divSubirArchivoEdit')).show();
    $(document.getElementById('divSubirArchivo')).hide();
}

function guardaCedulaMetodologias_Modificaciones(idMetodologia) {
    if ($("#fuArchivosAdjuntos").val() != '') {
        WaitingVtn("divBloqVtnCedula", true, false, "");
        WaitingVtn("divBloqVtnCedulaBtns", true, false, "");
        $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButtonDis");
        $($(".ui-button-text").parent().parent().find(":button")[0]).attr("disabled", "disabled");
        MostrarMsj('El archivo <span style="font-weight:bold;">' + $("#fuArchivosAdjuntos").val().split('\\')[2] + '</span> que Selecciono no ha sido Guardado. Para Guardarlo de click en el icno <img  src="../../images/PanelDeControl/Upfiles.png" style="width:10px;  height:10px"/>.<span style="font-weight:bold;">Si no lo Guarda,tendrá que volver a cargar el archivo</span> ¿Desea Continuar? ', "Mensaje SicreNet", true, false, true, "Si", "", "No", 280, 180,
            function BtnSi() {
                $("#divVentanaMensajes").dialog("close");
                guardarCedulaMetEnBD(idMetodologia);

            }, null, function BtnNo() {
                $("#divVentanaMensajes").dialog("close");
            });
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnCedula", false, false, "");
            WaitingVtn("divBloqVtnCedulaBtns", false, false, "");
            $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButton");
            $($(".ui-button-text").parent().parent().find(":button")[0]).removeAttr("disabled");
        });
    }
    else guardarCedulaMetEnBD(idMetodologia);
}

function guardarCedulaMetEnBD(idMetodologia) {
    WaitingVtn("divBloqVtnCedula", true, false, "");
    WaitingVtn("divBloqVtnCedulaBtns", true, false, "");
    $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButtonDis");
    $($(".ui-button-text").parent().parent().find(":button")[0]).attr("disabled", "disabled");
    if (!compara_fecha($("#EditMasFI").val(), $("#EditMasFF").val())) {
        MostrarMsj("La Fecha Inicial debe de ser menor a la Fecha Final. ", "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, function () { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnCedula", false, false, ""); WaitingVtn("divBloqVtnCedulaBtns", false, false, ""); }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnCedula", false, false, "");
            WaitingVtn("divBloqVtnCedulaBtns", false, false, "");
            $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButton");
            $($(".ui-button-text").parent().parent().find(":button")[0]).removeAttr("disabled");
        });
    }
    else {
        peticionAjax("PanelDeControl.aspx/ActualizarDatosCedulaMetodologia", "POST", { idMet: idMetodologia, fechaInicio: $("#EditMasFI").val().split('/')[2] + "-" + $("#EditMasFI").val().split('/')[1] + "-" + $("#EditMasFI").val().split('/')[0],
            fechaFin: $("#EditMasFF").val().split('/')[2] + "-" + $("#EditMasFF").val().split('/')[1] + "-" + $("#EditMasFF").val().split('/')[0], historicoRangos: $("#lb_11").val()
        }, function (data) {
            if (data.d.indexOf('ErrorCATCH') == -1 && data.d == "") {
                $("#divVentanaCedulas").dialog("close");
                MostrarMsj("Información Almacenda Correctamente", " AVISO " + $(".ui-button-text").attr("id").split("_")[2], false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
            }
            else {
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
                WaitingVtn("divBloqVtnCedula", false, false, "");
                WaitingVtn("divBloqVtnCedulaBtns", false, false, "");
                $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButton");
                $($(".ui-button-text").parent().parent().find(":button")[0]).removeAttr("disabled");
            }
        }, null);
    }
}

function compara_fecha(fecha, fecha2) {
    suma = new Date(fecha.substring(6, 10), fecha.substring(3, 5) - 1, fecha.substring(0, 2));
    var anio = suma.getYear();
    var mes = suma.getMonth() + 1;
    var dia = suma.getDate();
    suma2 = new Date(fecha2.substring(6, 10), fecha2.substring(3, 5) - 1, fecha2.substring(0, 2));
    var anio2 = suma2.getYear();
    var mes2 = suma2.getMonth() + 1;
    var dia2 = suma2.getDate();
    if (anio < anio2) {
        return false;
    }
    if (anio <= anio2 && mes <= mes2) {
        if (anio == anio2 && mes == mes2 && dia > dia2) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }

}

  

