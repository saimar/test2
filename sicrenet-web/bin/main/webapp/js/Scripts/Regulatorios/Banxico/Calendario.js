
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

var PaisSelecXUser = "";
var fechaActual = "";
function LlenaCombosAñioYMes() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Calendario.aspx/DevuelveAñosMesActual', "POST", null, function DevuelveAñosMesActual_Finish(data1) {
        if (data1.d == "" || data1.d == null) {
            Waiting(false, "Espere por favor. Cargando Información...");
            MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            return;
        }
        document.getElementById('sltAnio').options.length = 0;
        for (var i = 0; i < data1.d.split(":")[0].split(",").length; i++) {
            var opt = document.createElement('option');
            opt.value = data1.d.split(":")[0].split(",")[i];
            opt.innerHTML = data1.d.split(":")[0].split(",")[i];
            document.getElementById('sltAnio').appendChild(opt);
        }
        var Meses = ["Febrero", "Abril", "Junio", "Agosto", "Octubre", "Diciembre"];

        document.getElementById('sltMes').options.length = 0;
        var ii = 1;
        for (var i = 1; i <= 12; i++) {
            if (i % 2 == 0) {
                var optionM = document.createElement('option');
                optionM.value = (i < 10 ? "0" + i : i);
                optionM.innerHTML = Meses[ii - 1];
                document.getElementById('sltMes').appendChild(optionM);
                ii++;
            }
        }
        $("#sltAnio").val((parseInt(data1.d.split(":")[0].split(",")[0]) + 1) + "");
        var mesSeleccionar = data1.d.split(":")[2].split("/")[1];
        $("#sltMes").val(mesSeleccionar);
        fechaActual = data1.d.split(":")[2];
        CambiaLblTitulo();
        // estableceEstatus();
        cargaTablaCalendario();
    }, null);
}

function sltMesAnio_OnChange() {
    CambiaLblTitulo();
    cargaTablaCalendario();
}
function CambiaLblTitulo() {
    //periodo = $("#sltAnio option:selected").val() + $("#sltMes option:selected").val();
    $('#spanTitulo').html('CALENDARIO DE ENVIO INFORMACIÓN BANXICO ' + $("#sltMes option:selected").html().replace(/\s/g, '').toUpperCase() + ' ' + $("#sltAnio option:selected").html().replace(/\s/g, '').toUpperCase() + '.');
}

var lenghtJSON = 0;
function cargaTablaCalendario() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";

    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Calendario.aspx/cargaTblCalendario", "POST", { anio: $("#sltAnio option:selected").val(), mes: $("#sltMes option:selected").val(), opcion: 1 }, function (data) {
        $("#divTblCalendario").html("");
        if (data.d.indexOf('ErrorCATCH') == -1) {
            if (data.d != "") {
                fechaActual = data.d.split("%%&&")[1];
                var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                $("#divTblCalendario").html(CreaTabla(JSON));
                $(".calendario").datepicker();
                var estatusCierre = JSON[0].EstatusCierre;
                lenghtJSON = JSON.length;
                for (var i = 0; i < JSON.length; i++) {
                    $($("#FDFechaInfo_" + i).parent().children()[1]).attr("disabled", true);
                    if (estatusCierre == "1")
                        $($("#FDLimiteEntrga_" + i).parent().children()[1]).attr("disabled", true);
                    else if (estatusCierre == "0")
                        $($("#FDLimiteEntrga_" + i).parent().children()[1]).attr("disabled", false);
                }

                if (estatusCierre == "1") {
                    $("#btnCerrarBimestre").attr("class", "classButtonDis");
                    $("#btnCerrarBimestre").attr("disabled", true);
                }
                else if (estatusCierre == "0") {
                    $("#btnCerrarBimestre").attr("class", "classButton");
                    $("#btnCerrarBimestre").attr("disabled", false);
                }
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function CreaTabla(listaDeJSON) {
    var cad = '<center><div class="divContenidoTabla"><table class="dataGridDatos" style="width: 100%;">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    var estatusCierre = auxJSON.EstatusCierre;
    for (var encabezados in auxJSON) {
        if (encabezados != "IDPaquete" && encabezados != "EstatusCierre") {
            cad += '<th style="text-align: center;" class>';
            cad += encabezados.toString();
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
            if (element != "IDPaquete" && element != "EstatusCierre") {
                cad += '<td style="text-align:left">';
                if (element == "Plazo de Entrega")
                    cad += json[element] + " días hábiles";
                else if (element == "Fecha de Información") {
                    cad += '<input class="calendario" id="FDFechaInfo_' + filas + '" type="text" value="' + fechaActual + '" style="width:80%;height:20px;" disabled="disabled"/>';
                }
                else if (element == "Fecha Limite de Entrega") {
                    cad += '<input class="calendario" id="FDLimiteEntrga_' + filas + '" type="text" alt="' + json[element] + '" value="' + json[element] + '" ' + (estatusCierre == "1" ? 'disabled="disabled"' : '') + ' style="width:80%;height:20px;"  maxlength="10" onchange="change(event,this,1,\'' + listaDeJSON[filas].IDPaquete + '\');"  onkeyup="change(event,this,1,\'' + listaDeJSON[filas].IDPaquete + '\');"  onkeypress="if (event.keyCode==13) return false;"/>';
                }
                else
                    cad += json[element];
                cad += '</td>';
            }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div></center>';
    return cad;
}

//-------------------------------Actualizar Fecha Limite Entrega
var cambiandoFecha = false;
var editar = true;
function change(e, txtFecha, opc, IdPaquete) {
    txtFechaS = txtFecha;
    if (editar == true && !cambiandoFecha && $("#divBloqueador").is(':visible') == false) {
        var key = window.event ? e.keyCode : e.which;
        var cadena = $(txtFecha).val();
        var cambio = 0;
        var direccion = false;
        if (key >= 37 && key <= 40) {
            direccion = true;
        }
        if (direccion == false) {
            if (key >= 96 && key <= 105) {
                cadena = cadena;
                cambio = 1;
            }
            else {
                if (key != 8) {
                    //cadena = cadena.substring(0,cadena.length-1);
                    cambio = 1;
                }
            }
            if (cambio == 1) {
                if (cadena.length == 2 || cadena.length == 5) {
                    cadena = cadena + '/';
                }
                //$(txtFecha).value = cadena;
                validarFechas(cadena, txtFecha);
            }
            if (cadena.length == 10) {
                _txtFecha = txtFecha;
                validarEstructuraFecha(cadena, opc, IdPaquete);
            }
        }
    }
    else {
        $("#divBloqueador").hide();
    }
}

function validarFechas(cadena, txtFecha) {
    var nuevaCadena = '';
    for (var i = 0; i < cadena.length; i++) {
        var c = cadena.charAt(i);
        if (i != 2 && i != 5) {
            if (contains(c)) {
                nuevaCadena += c;
            }
        }
        else {
            nuevaCadena += c;
        }
    }
    $(txtFecha).val(nuevaCadena);
}
var num = '0123456789';
function contains(obj) {
    for (var i = 0; i < num.length; i++) {
        if (num.charAt(i) == obj) {
            return true;
        }
    }
    return false;
}

var txtFechaS;
function validarEstructuraFecha(fecha, opc, IdPaquete) {
    var error = '';
    var sdia = fecha.charAt(0) + fecha.charAt(1);
    var smes = fecha.charAt(3) + fecha.charAt(4);
    var saño = fecha.charAt(6) + fecha.charAt(7) + fecha.charAt(8) + fecha.charAt(9);

    var dia = parseInt(sdia);
    var mes = parseInt(smes);
    var año = parseInt(saño);
    var sep1 = fecha.charAt(2);
    var sep2 = fecha.charAt(5);

    var vecesError = 0;
    if (sep1 != '/' || sep2 != '/')
    { error += 'Error en sepador de fecha debe ser: (/).</br>'; vecesError++; }
    if (dia >= 0 && dia <= 31) { }
    else { error += 'Error en el día: ' + dia + '.</br>'; vecesError++; }
    if (mes >= 0 && mes <= 12) { }
    else { error += 'Error en el mes: ' + mes + '.</br>'; vecesError++; }
    if (saño.length <= 4 && saño.length > 0) { }
    else { error += 'Error en el año: ' + saño + '.</br>'; vecesError++; }
    if (error != '' && $("#divVentanaMensajes").is(':visible') == false) {
        error += '</br>Formato: dd/mm/aaaa';
        vecesError++;
        WaitingVtn("divBloqVtnActualizaResponsablesG", true, false, "");
        MostrarMsj(error, "Mensaje", false, true, false, "", "Aceptar", "", 250, (vecesError >= 4 ? 160 : 150), null, function () {
            $(txtFechaS).focus();
            $(txtFechaS).val("");
            if ($("#divBloqVtnActualizaResponsablesG") != null && $("#divBloqVtnActualizaResponsablesG") != undefined)
                WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            $(txtFechaS).focus();
            $(txtFechaS).val("");
            if ($("#divBloqVtnActualizaResponsablesG") != null && $("#divBloqVtnActualizaResponsablesG") != undefined)
                WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        });
    }
    else if (error == '') {
        if (opc != 0) {
            fecha = saño + "/" + smes + "/" + sdia;
            cambiarFecha(fecha, opc, IdPaquete);
        }
    }
}

var cambiandoFecha = false;
function cambiarFecha(fecha, opc, IdPaquete) {
    for (var i = 0; i < lenghtJSON; i++)
        document.getElementById("FDLimiteEntrga_" + i).style.border = "1px solid Gray";
    cambiandoFecha = true;
    Waiting(true, "Espere por favor. Guardando Información...");
    var parametros = { fechaCorte: $("#sltAnio option:selected").val() + $("#sltMes option:selected").val(), fechaInformacion: fechaActual, fechaLimiteEntrega: fecha, idPaquete: IdPaquete, opcion: 2 };
    peticionAjax("Calendario.aspx/actualizarFechaLimite", "POST", parametros, function (data) {
        Waiting(false, "Espere por favor. Cargando Información...");
        setTimeout(resetVar, 500);
        if (data.d.indexOf('ErrorCATCH') == -1) {
            if (data.d != "") {
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
                $(txtFechaS).focus();
                $(txtFechaS).val($(txtFechaS).attr("alt"));
            }
            else
                $(txtFechaS).attr("alt", $(txtFechaS).val());
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            $(txtFechaS).focus();
            $(txtFechaS).val($(txtFechaS).attr("alt"));
        }
    }, null);
}

function resetVar() {
    cambiandoFecha = false;
}

function btnCerrarBimestre_Click() {
    if (!validaNoVaciasFechaLimiteEntrega()) {
        MostrarMsj("¿Desea cerrar el Bimestre <span style='font-weight:bold;'>" + $("#sltAnio option:selected").val() + $("#sltMes option:selected").val() + "</span>? ", "Mensaje SicreNet", true, false, true, "Si", "", "No", 280, 130,
        function BtnSi() {
            $("#divVentanaMensajes").dialog("close");
            Waiting(true, "Espere por favor. Cargando Información...");
            peticionAjax("Calendario.aspx/cerrarBimestre", "POST", { fechaCorte: $("#sltAnio option:selected").val() + $("#sltMes option:selected").val(), opcion: 3 },
            function (data) {
                if (data.d.indexOf("ErrorCATCH") == -1) {
                    if (data.d == "")
                        cargaTablaCalendario();
                }
                else {
                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                    Waiting(false, "Espere por favor. Cargando Información...");
                }
            });

        }, null, function BtnNo() {
            $("#divVentanaMensajes").dialog("close");
        });
    }
    else {
        MostrarMsj("El campo <span style='font-weight:bold;'>Fecha Límite de Entrega</span> no pude ir en blanco.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    }
}

function validaNoVaciasFechaLimiteEntrega() {
    var esVacia = false;
    for (var i = 0; i < lenghtJSON; i++) {
        document.getElementById("FDLimiteEntrga_" + i).style.border = "1px solid Gray";
        if ($("#FDLimiteEntrga_" + i).val() == "") {
            esVacia = true;
            $("#FDLimiteEntrga_" + i).focus();
            document.getElementById("FDLimiteEntrga_" + i).style.border = "1px solid Red";
            break;
        }
    }
    return esVacia;
}