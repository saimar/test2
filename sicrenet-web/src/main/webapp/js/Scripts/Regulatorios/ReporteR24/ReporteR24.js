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
    //$(".calendario").datepicker();
    $("#txtFecha").datepicker({ beforeShowDay: renderCalendarCallback });
});


function ObtenerFechaActual() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/DevuelveFechaActual", "POST", null, function (data) {
        $("#txtFecha").val(data.d);
        WidtDatePicker();
        filtroFecha();
        // Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function filtroFecha() {
    var parametrosGetFechasDatePickerXPeriodo = { fechaCalMenos: '', fechaCalMas: '', aplicarMenos: false, aplicarMas: false, index: 0, fechaAnteriorMenos: '', arregloFechas: '', fechaswitch: '' };
    peticionAjax("Default.aspx/GetFechasDatePickerFiltro", "POST", parametrosGetFechasDatePickerXPeriodo,
                      function (data) {
                          peticionAjax("Default.aspx/GetFechasNoSelect", "POST", null,
                          function (data2) {
                              $("#txtFecha").attr("accesskey", data2.d.split(":")[2]);
                              Waiting(false, "Espere por favor. Cargando Información...");
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
    peticionAjax("Default.aspx/spCargaInfoToRAZ", "POST", { anio: $("#txtFecha").val().split("/")[2], mes: $("#txtFecha").val().split("/")[1], dia: $("#txtFecha").val().split("/")[0] }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (parseInt(data.d) > 0) {
                $("#spNoReprocesos").show();
                $("#spNoReprocesos").html("No Reproceso:" + data.d);
            }
            else
                $("#spNoReprocesos").hide();
        }
        else {
            MostrarMsj("Error:" + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
    });
}

function CreaReporte() {
    if ($("#txtFecha").val() == '') {
        MostrarMsj("Debe seleccionar una fecha.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }
    txtFecha_Onchange();
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/ObtenerProcesos", "POST", { anio: $("#txtFecha").val().split("/")[2], mes: $("#txtFecha").val().split("/")[1], dia: $("#txtFecha").val().split("/")[0], path: '' }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d == "") {
                $('#dvDescarga').show();
                $('#dvDepositaServer').show();
                $('#spMensaje').html('Se ha generado el Reporte R24');
                $('#dvConenedorRep').show();
            }
        }
        else {
            $('#dvDescarga').hide();
            $('#dvDepositaServer').show();
            $('#spMensaje').html('');
            $('#dvConenedorRep').hide();
            MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function btnDescarga24_Click() {
    Waiting(true, "Descargando Archivo...");
    __doPostBack('pedirArchivo', "");
    setTimeout(terminarWait, 3000);
}


function EjecutaDTS() {
    if ($("#txtFecha").val() == '') {
        MostrarMsj("Debe seleccionar una fecha.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }

    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/spCargaInfoToRAZ", "POST", { anio: $("#txtFecha").val().split("/")[2], mes: $("#txtFecha").val().split("/")[1], dia: $("#txtFecha").val().split("/")[0] }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (parseInt(data.d) > 0) {
                Waiting(false, "Espere por favor. Cargando Información...");
                $("#spNoReprocesos").show();
                $("#spNoReprocesos").html("No Reproceso:" + data.d);
                var cadena = '<div id="divBloqVtndvComentarios" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
                cadena += '<div id="dvDetalleEITbldvComentarios" style="width:100%;height:100%;margin-top: 0px;">  ';
                cadena += ' <table style="width:100%;height: 100%;" ><tr><td><table width="100%"><tr><td><img src="../../Images/Grales/commentAdd.png" alt="Comentario" width="30px" height="30px" /></td>';
                cadena += '<td style=" font-size:10px;font-weight:bold; vertical-align:middle;" align="left">Justificacion del Reproceso :</td></tr></table></td></tr><tr><td ><textarea cols="30" rows="2" id="txtComentario" maxlength="2500" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:100%; text-align:left; border: x;height:150px" ></textarea></td></tr>';
                cadena += '<tr><td style="text-align: right;"><input type="button" id="btnContinuar" onclick="depositarInformacionEnTabla(\'\');" value="Continuar" class="classButton"/></td></tr>';
                cadena += '</table>';
                cadena += '</div></div>';
                $("#dvComentarios").empty();
                AgregarVtnFlotante("dvComentarios", "", "FECHA CORTE " + " (" + $("#txtFecha").val().split("/")[2] + "-" + $("#txtFecha").val().split("/")[1] + "-" + $("#txtFecha").val().split("/")[0] + ")", "", cadena, 300, 650, false, false, "", "", null);
            }
            else {
                $("#spNoReprocesos").hide();
                depositarInformacionEnTabla("carga inicial");
            }
        }
        else {
            MostrarMsj("Error:" + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
    });

    //    Waiting(true, "Espere por favor. Cargando Información...");
    //    peticionAjax("Default.aspx/EjecutaPackage", "POST", { anio: $("#txtFecha").val().split("/")[2], mes: $("#txtFecha").val().split("/")[1], dia: $("#txtFecha").val().split("/")[0] }, function (data) {
    //        if (data.d.indexOf("Error") == -1) {
    //            if (data.d == "")
    //                MostrarMsj("Se ha depositado el Archivo." + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    //        }
    //        else {
    //            MostrarMsj("Error al depositar Archivo." + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    //        }
    //        Waiting(false, "Espere por favor. Cargando Información...");
    //    });
}

function depositarInformacionEnTabla(observacion) {
    var continuar = false;
    if (observacion == "") {
        if ($("#txtComentario").val().trim() != "") {
            observacion = $("#txtComentario").val();
            continuar = true;
            $("#dvComentarios").dialog("close");
        }
        else {
            WaitingVtn("divBloqVtndvComentarios", true, false, "");
            MostrarMsj("Ingrese la Justificación del Reproceso", "Mensaje SicreNet", false, true, true, "", "Aceptar", "", 280, 120, null, null, function BtnNo() {
                $("#divVentanaMensajes").dialog("close");
            });
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtndvComentarios", false, false, "");
            });
        }
    }
    else
        continuar = true;

    if (continuar) {
        Waiting(true, "Espere por favor. Cargando Información...");
        //observacion = observacion == "" ? $("#txtComentario").val() : observacion;
        peticionAjax("Default.aspx/EjecutaSPRAZ", "POST", { anio: $("#txtFecha").val().split("/")[2], mes: $("#txtFecha").val().split("/")[1], dia: $("#txtFecha").val().split("/")[0], observacion: observacion }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (parseInt(data.d.split("%&")[0]) > 0)
                    MostrarMsj("Se ha depositado la información con Fecha Corte: <span style='font-weight:bold;'>" + $("#txtFecha").val().split("/")[2] + "-" + $("#txtFecha").val().split("/")[1] + "-" + $("#txtFecha").val().split("/")[0] + "</span>.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                else
                    MostrarMsj("No existe información para la fecha de Corte: <span style='font-weight:bold;'>" + $("#txtFecha").val().split("/")[2] + "-" + $("#txtFecha").val().split("/")[1] + "-" + $("#txtFecha").val().split("/")[0] + "</span>.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                if (parseInt(data.d.split("%&")[1]) > 0) {
                    $("#spNoReprocesos").show();
                    $("#spNoReprocesos").html("No Reproceso:" + data.d.split("%&")[1]);
                }
                else
                    $("#spNoReprocesos").hide();
            }
            else {
                MostrarMsj("Error al depositar la información " + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            }
            Waiting(false, "Espere por favor. Cargando Información...");
        });
    }
}