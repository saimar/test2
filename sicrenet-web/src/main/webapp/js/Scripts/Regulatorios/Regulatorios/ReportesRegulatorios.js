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
        //changeMonth: true,
        //changeYear: true, 
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

$(document).ready(function () {
    $(".periodo").datepicker();
    WidtDatePicker();
});

var JSONProceso;
function LeerPermisos() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/ObtenerProcesos", "POST", null, function (data) {
        if (data.d.indexOf("Sin Datos") == -1) {
            if (data.d != "") {
                JSONProceso = obtenerArregloDeJSON(data.d, false);
                document.getElementById('cmbAgrupacion').options.length = 0;
                document.getElementById('cmbProcesos').options.length = 0;
                for (var i = 0; i < JSONProceso.length; i++) {
                    if (i == 0 || (i > 0 && JSONProceso[i].FVCAgrupacion != JSONProceso[i - 1].FVCAgrupacion)) {
                        var opt = document.createElement('option');
                        opt.value = JSONProceso[i].FVCAgrupacion;
                        opt.innerHTML = JSONProceso[i].FVCAgrupacion;
                        document.getElementById('cmbAgrupacion').appendChild(opt);
                    }
                    if (JSONProceso[0].FVCAgrupacion == JSONProceso[i].FVCAgrupacion) {
                        var opt = document.createElement('option');
                        opt.value = JSONProceso[i].FIIDProceso;
                        opt.innerHTML = JSONProceso[i].FVCNombreProceso;
                        document.getElementById('cmbProcesos').appendChild(opt);
                    }
                }
                document.getElementById('cmbAgrupacion').selectedIndex = 0;

                $("#btnEject1").show();
                ObtenerInfoProceso();
            }
            else {
                $("#btnEject1").hide();
                $("#spErrorPermisos").html("No tiene permisos de generación de Reportes.");
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        }
        else
            Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function cmbAgrupacion_SelectionChange() {
    document.getElementById('cmbProcesos').options.length = 0;
    for (var i = 0; i < JSONProceso.length; i++) {
        if ($("#cmbAgrupacion").val() == JSONProceso[i].FVCAgrupacion) {
            var opt = document.createElement('option');
            opt.value = JSONProceso[i].FIIDProceso;
            opt.innerHTML = JSONProceso[i].FVCNombreProceso;
            document.getElementById('cmbProcesos').appendChild(opt);
        }
    }
    ObtenerInfoProceso();
}

function ObtenerInfoProceso() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/ObtenerInfoProceso", "POST", { itemSelectCmbProceso: $('#cmbProcesos').val() }, function (data) {
        if (data.d.indexOf("Sin Datos") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#divTablaInfoProcesos").html(generarTablaDeRegistrosSinFoot1(JSON));
                $("#divcompon").show();
                $("#btnEject1").show();
                for (var i = 0; i < JSON.length; i++) {
                    if (JSON[i]["Status"].indexOf("Ejecutando") != -1)
                        $("#btnEject1").hide();
                    if (JSON[i]["Status"].indexOf("Falló") != -1)
                        $("#btnGenerarTxt").hide();
                }
                if ($('#cmbProcesos').val() != "8")
                    document.getElementById("btnGenerarTxt").style.display = document.getElementById("btnEject1").style.display;
                else
                    $("#btnGenerarTxt").hide();
                if ($('#cmbProcesos').val() == "4") {
                    document.getElementById("btnValidar").style.display = document.getElementById("btnEject1").style.display;
                    document.getElementById("btnValidar35").style.display = document.getElementById("btnEject1").style.display;
                    document.getElementById("btnComparar").style.display = document.getElementById("btnEject1").style.display;
                }
                else {
                    $("#btnValidar").hide();
                    $("#btnValidar35").hide();
                    $("#btnComparar").hide();
                }
            }
            else {
                $("#btnGenerarTxt").hide();
                $("#divcompon").hide();
            }
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

//---------------------------EVENTOS

function cmbProcesos_SelectionChange() {
    $("#btnDescargar").hide();
    $("#btnDescargar2").hide();
    $("#btnDescargar3").hide();
    $("#btnDescargar4").hide();
    $("#btnGenerarTxt").hide();
    $("#spStatus").html("");
    $('#divIncidencias').html("");
    $("#divTablaInfoProcesos").html("");
    ObtenerInfoProceso();
}

function EjecutarProceso() {
    if ($("#txtFechaCorte").val() == '') {
        MostrarMsj("Debe seleccionar una fecha de corte.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }
    else {
        timer_grid = window.setInterval(ini_timer, 1000);
        var fecha = $("#txtFechaCorte").val().split('/')[2] + $("#txtFechaCorte").val().split('/')[1] + $("#txtFechaCorte").val().split('/')[0];
        var idproc = $("#cmbProcesos").val();
        var esJob = (($("#cmbAgrupacion").val() == "Comerciales" || $("#cmbAgrupacion").val() == "Vivienda" || $("#cmbAgrupacion").val() == "Otros") ? true : false);
        $('#divIncidencias').html("");

        $("#btnEject1").attr("disabled", true);
        $("#btnEject1").attr("class", "classButtonDis");
        $("#btnGenerarTxt").attr("disabled", true);
        $("#btnGenerarTxt").attr("class", "classButtonDis");

        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("Default.aspx/EjecutarProceso", "POST", { fechacorte: fecha, idproceso: idproc, esJOB: esJob }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d != "") {
                    //timer_grid = window.setInterval(ini_timer, 1000);
                    ini_timer();
                    if (!esJob) {
                        peticionAjax("Default.aspx/ActualizaFechaCorte", "POST", { fechacorte: fecha, idproceso: idproc }, function (data) { }, null);
                    }
                }
            }
            else {
                Waiting(false, "Espere por favor. Cargando Información...");
                MostrarMsj("Error al inciar el proceso de actualización.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            }
        }, null);
    }
}

var timer_grid1;
function ini_timer() {
    window.clearInterval(timer_grid);
    ObtenerInfoProc();
    //timer_grid1 = window.setTimeout(ObtenerInfoProc, 500);
}

function ObtenerInfoProc() {
    var valueproc = $('#cmbProcesos').val();
    var statusbtn = false;
    var proclisto = 0;
    var contregistros = 0;
    peticionAjax("Default.aspx/ObtenerInfoProceso", "POST", { itemSelectCmbProceso: $('#cmbProcesos').val() }, function (data) {
        proclisto = 0;
        contregistros = 0;
        try {
            Registros = obtenerArregloDeJSON(data.d, false);
        }
        catch (e) {
            MostrarMsj("Error al tratar de establecer conexión con la base de datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            return;
        }
        var HTML = '';
        HTML = '<table width="99%" cellpadding="3" cellspacing="0" Border="1" border: White 1px solid; style="border-color:White;font-family:Arial"><tr style="background-color:#008080; color:white; font-weight:bold"><td align=center>Nombre de paso</td><td align=center>Fecha de corte</td><td align=center>Status</td><td align=center>Hora comienzo</td><td align=center>Hora fin</td></tr>';

        var Fila = 1;

        for (var i = 0; i < Registros.length; i++) {
            var Registro = Registros[i];

            if (Fila == 1) HTML += '<tr style="background-color:#EEEEEE; color:Black">';
            else HTML += '<tr style="background-color:#DCDCDC; color:Black">';

            HTML += '<td width="35%">' + Registro["Nombre de Paso"] + '</td>';
            HTML += '<td align=left width="10%">' + Registro["Fecha de corte"] + '</td>';
            HTML += '<td align=left width="8%">' + Registro.Status + '</td>';
            HTML += '<td align=left width="20%">' + Registro["Hora comienzo"] + '</td>';
            HTML += '<td align=left width="20%">' + Registro["Hora fin"] + '</td>';
            HTML += '</tr>';
            Fila = Fila * -1;
            if (Registro.Status == 'Espera')
                statusbtn = true;

            if (Registro.Status == 'Listo')
                proclisto += 1;
        }

        $("#divTablaInfoProcesos").html(HTML);
        contregistros = Registros.length;
        $("#cmbProcesos").attr("disabled", statusbtn);
        $("#cmbAgrupacion").attr("disabled", statusbtn);

        $("#btnDescargar").attr("disabled", true);
        $("#btnDescargar").attr("class", "classButtonDis");
        $("#btnDescargar2").attr("disabled", true);
        $("#btnDescargar2").attr("class", "classButtonDis");
        $("#btnDescargar3").attr("disabled", true);
        $("#btnDescargar3").attr("class", "classButtonDis");
        $("#btnDescargar4").attr("disabled", true);

        if (proclisto != contregistros) {
            timer_grid1 = window.setTimeout(ObtenerInfoProc, 2000);
        }
        else {
            if (!entroBusquedaIncidencias) {
                entroBusquedaIncidencias = true;
                $("#btnEject1").attr("disabled", false);
                $("#btnEject1").attr("class", "classButton");
                $("#btnGenerarTxt").attr("disabled", false);
                $("#btnGenerarTxt").attr("class", "classButton");
                LeerIncidencias();
            }
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

var entroBusquedaIncidencias = false;
function LeerIncidencias() {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Regulatorios.Regulatorios.Default.BuscarIncidencias
        (
            $('#cmbProcesos').val(),
            function (response) {
                entroBusquedaIncidencias = false;
                if (response.value.indexOf("Error") == -1) {
                    var HTML = 'No hay incidencias.';

                    if (response.value != "") {
                        Registros = obtenerArregloDeJSON(response.value, false);

                        HTML = '<br /><div style="font-weight:bold;width:100%;text-align:center;">INCIDENCIAS</div>';
                        HTML += '<p align="left">';
                        HTML += '<span style="font-weight:bold">Periodo:</span> ' + Registros[0].Periodo + '<br />';
                        HTML += '<span style="font-weight:bold">Año:</span> ' + Registros[0].Añio + '<br />';
                        HTML += '<span style="font-weight:bold">Mes:</span> ' + Registros[0].Mes + '<br />';
                        HTML += '<span style="font-weight:bold">Dia:</span> ' + Registros[0].Día + '<br />';
                        HTML += '<br />';

                        if (Registros.length == 500) {
                            HTML += '<span style="color:Red; font-weight:bold">Alerta:</span> Se han detectado mas de 500 incidencias, favor de comunicarse a la extencion 79776.<br />';
                        }

                        HTML += '<br />';
                        HTML += '</p>';
                        HTML += '<table width="99%" cellpadding="3" cellspacing="0" Border="1" border: White 1px solid; style="border-color:White;font-family:Arial"><tr style="background-color:#008080; color:White; font-weight:bold"><td >Cuenta</td><td>Descripción</td><td >Columna</td></tr>';

                        var Fila = 1;

                        for (var i = 0; i < Registros.length; i++) {
                            var Registro = Registros[i];

                            if (Fila == 1) HTML += '<tr style="background-color:#EEEEEE; color:Black">';
                            else HTML += '<tr style="background-color:#DCDCDC; color:Black">';

                            HTML += '<td width="8%">' + Registro.Cuenta + '</td>';
                            HTML += '<td width="64%">' + Registro.Descripción + '</td>';
                            HTML += '<td width="8%">' + Registro.Columna + '</td>';
                            HTML += '</tr>';
                            Fila = Fila * -1;
                        }
                    }
                    $('#divIncidencias').html(HTML);
                }
                else
                    MostrarMsj("Error al obtener las incidencias", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        );
}

function GenerarTxtReporte() {
    $("#btnDescargar").attr("value", "Descargar");
    $("#btnDescargar").hide();
    $("#btnDescargar2").hide();
    $("#btnDescargar3").hide();
    $("#btnDescargar4").hide();
    if ($("#txtFechaCorte").val() == '') {
        MostrarMsj("Debe seleccionar una fecha de corte.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/GenerarTxtReporte", "POST", { anio: $("#txtFechaCorte").val().split("/")[2], mes: $("#txtFechaCorte").val().split("/")[1], dia: $("#txtFechaCorte").val().split("/")[0], Reporte: DevuelveReporte($('#cmbProcesos').val()), MesTexto: DevuelveMesTexto($("#txtFechaCorte").val().split("/")[1]) }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            $("#spStatus").html("Se ha generado el reporte");
            if (data.d.split(",")[0] == "R04b34") {
                $("#btnDescargar").attr("value", "Descargar R04b34");
                $("#btnDescargar2").attr("value", "Descargar R04b35");
                $("#btnDescargar2").show();
                $("#btnDescargar2").attr("disabled", false);
                $("#btnDescargar2").attr("class", "classButton");
            }
            if (data.d.split(",")[0] == "R04h92") {
                $("#btnDescargar").attr("value", "Descargar R04h92");
                $("#btnDescargar2").attr("value", "Descargar R04h92Plus");
                $("#btnDescargar2").show();
                $("#btnDescargar2").attr("disabled", false);
                $("#btnDescargar2").attr("class", "classButton");

                $("#btnDescargar3").attr("value", "Descargar R04h92Seguimiento");
                $("#btnDescargar3").show();
                $("#btnDescargar3").attr("disabled", false);
                $("#btnDescargar3").attr("class", "classButton");
            }
            if (data.d.split(",")[0] == "R04c43") {
                $("#btnDescargar").attr("value", "Descargar R04c43");
                $("#btnDescargar2").attr("value", "Descargar R04c43Plus");
                $("#btnDescargar2").show();
            }
            if (data.d.split(",")[1] == "GOOD") {
                $("#btnDescargar").show();
                $("#btnDescargar").attr("disabled", false);
                $("#btnDescargar").attr("class", "classButton");
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function DevuelveReporte(SelectValueCmbProceso) {
    var Reporte = "";
    switch (SelectValueCmbProceso) {
        case "1": break;
        case "2": Reporte = "R04h91"; break;
        case "3": Reporte = "R04h92"; break;
        case "4": Reporte = "R04b34"; break;
        case "5": Reporte = "R04c42"; break;
        case "6": Reporte = "R04c43"; break;
        case "7": Reporte = "R04h93"; break;
        case "16": Reporte = "R04c41"; break;
    }
    return Reporte;
}

function DevuelveMesTexto(mes) {
    var MesTexto = "";
    switch (mes) {
        case "01": MesTexto = "Enero"; break;
        case "02": MesTexto = "Febrero"; break;
        case "03": MesTexto = "Marzo"; break;
        case "04": MesTexto = "Abril"; break;
        case "05": MesTexto = "Mayo"; break;
        case "06": MesTexto = "Junio"; break;
        case "07": MesTexto = "Julio"; break;
        case "08": MesTexto = "Agosto"; break;
        case "09": MesTexto = "Septiembre"; break;
        case "10": MesTexto = "Octubre"; break;
        case "11": MesTexto = "Noviembre"; break;
        case "12": MesTexto = "Diciembre"; break;
    }
    return MesTexto;
}

function DescargarArchivo(obj) {
    Waiting(true, "Descargando Archivo...");
    __doPostBack('pedirArchivo', $("#txtFechaCorte").val().split("/")[2] + "," + $("#txtFechaCorte").val().split("/")[1] + "," + $("#txtFechaCorte").val().split("/")[0] + "," +
            DevuelveReporte($('#cmbProcesos').val()) + "," + DevuelveMesTexto($("#txtFechaCorte").val().split("/")[1]) + "," + $(obj).attr("id"));
    setTimeout(terminarWait, 3000);
}

 