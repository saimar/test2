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
 
var PaisSelecXUser = "";
function LlenaCombosAñioYMes() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('CalendarioDeTrabajo.aspx/DevuelveAñosMesActual', "POST", null, function DevuelveAñosMesActual_Finish(data1) {
        if (data1.d == "" || data1.d == null) {
            Waiting(false, "Espere por favor. Cargando Información...");
            MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            return;
        }
        document.getElementById('ddl_anio').options.length = 0;
        for (var i = 0; i < data1.d.split(":")[0].split(",").length; i++) {
            var opt = document.createElement('option');
            opt.value = data1.d.split(":")[0].split(",")[i];
            opt.innerHTML = data1.d.split(":")[0].split(",")[i];
            document.getElementById('ddl_anio').appendChild(opt);
        }
        var Meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        document.getElementById('ddl_mes').options.length = 0;
        for (var i = 1; i <= parseInt(data1.d.split(":")[1]); i++) {
            var optionM = document.createElement('option');
            optionM.value = (i < 10 ? "0" + i : i);
            optionM.innerHTML = Meses[i - 1];
            document.getElementById('ddl_mes').appendChild(optionM);
        }
        $("#ddl_anio").val((parseInt(data1.d.split(":")[0].split(",")[0]) + 1) + "");
        $("#ddl_mes").val(data1.d.split(":")[1]);
        fechaActual = data1.d.split(":")[2];
        CambiaLblTitulo();
        estableceEstatus();
    }, null);
}

var periodo = "";
var editar = true;
var readOnly = '';
function CambiaLblTitulo() {
    periodo = $("#ddl_anio option:selected").val() + $("#ddl_mes option:selected").val();
    document.getElementById('lblTitulo').innerText = 'CALENDARIO DE TRABAJO RMD ' + $("#ddl_mes option:selected").html().replace(/\s/g, '').toUpperCase() + ' ' + $("#ddl_anio option:selected").html().replace(/\s/g, '').toUpperCase() + '.';
}
function ddl_Mes_Onchange() {
    CambiaLblTitulo();
    estableceEstatus();
}

function estableceEstatus() {
    Waiting(true, "Espere por favor. Cargando Información...");
    var parametros = { periodo: periodo, idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/verificaEstatus", "POST", parametros, function (data) {
        if (data.d == "Sin Datos" || data == null || data.d == null || data.d == "" || data.d.indexOf("Error") != -1) {
            Waiting(false, "Espere por favor. Cargando Información...");
            MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            return;
        }
        var arrayJSON = obtenerArregloDeJSON(data.d, false);
        if (arrayJSON[0].Column1 == 1) {
            editar = false;
            readOnly = 'disabled="disabled"';
            $('#btnGuardarCal').attr("disabled", true);
            $('#btnGuardarCal').attr('class', 'classButtonDis');
        }
        else {
            editar = true;
            readOnly = '';
            $('#btnGuardarCal').removeAttr("disabled");
            $('#btnGuardarCal').attr('class', 'classButton');
        }

        mostrarCalendario(periodo);
    }, null);

}

//------------------------Carga Tabla Calendario de Trabajo
var Datos = null;
function mostrarCalendario(periodo) {
    contador = 0;
    Waiting(true, "Espere por favor. Cargando Información...");
    var parametros = { periodo: periodo, idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/getCalendarioTrabajo", "POST", parametros, function (data) {
        if (data.d == "Sin Datos" || data == null || data.d == null || data.d == "" || data.d.indexOf("Error") != -1) {
            Waiting(false, "Espere por favor. Cargando Información...");
            MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            return;
        }
        Datos = obtenerArregloDeJSON(data.d, false);
        var HTML = '';
        HTML = '<table style="width:100%;" class="dataGrid" cellpadding="0" cellspacing="0">';
        HTML += '<tr>';
        HTML += '<th style="width:20%">ETAPAS DE FLUJO</th>';
        HTML += '<th style="width:2.8%">N°</th>';
        HTML += '<th style="width:29.8%">ACTIVIDAD</th>';
        HTML += '<th style="width:17.7%">ÁREA RESPONSABLE</th>';
        HTML += '<th style="width:16.7%">FECHA INICIO</th>';
        HTML += '<th style="width:17%">FECHA LÍMITE</th>';
        if (editar == true) {
            HTML += '<th style="width:22%"></th>';
        }
        HTML += '</tr>';

        etapasArray = new Array();
        IDetapasArray = new Array();

        for (var i = 0; i < Datos.length; i++) {
            var Dato = Datos[i];
            if (etapasArray.indexOf(Dato.etapa) == -1) {
                etapasArray.push(Dato.etapa);
                IDetapasArray.push(Dato.idEtapa);
            }
        }
        fechasInicioArray = new Array();
        fechasFinArray = new Array();
        for (var i = 0; i < etapasArray.length; i++) {
            HTML += '<tr>';
            HTML += '<td style="width:20%; vertical-align:middle; font-weight:bold; color:White; background:#009c96 url(../../Images/Cancelaciones/SeguimientoCancelacion/HeaderDG.gif) repeat-x">';
            if (editar == true) {
                HTML += '<div style="height: 21px;margin-bottom: -8%;"><img id="imgEditaResponsables" src="../../Images/PanelDeControl/edit.png" alt="" title="Edita Responsables" onclick="MuestraDivResponsables(\'' + IDetapasArray[i] + '\')" class="imgCrecer" style="cursor:pointer; float:right;position: relative;"></img></div>';
            }
            HTML += "<span>" + etapasArray[i] + "</span>";
            HTML += '</td>';
            HTML += '<td colspan="6" style="text-align:center;width:80%;">';
            HTML += getTBL(etapasArray[i], IDetapasArray[i]);

            HTML += '</td>';
            HTML += '</tr>';
        }
        if (editar == true) {
            HTML += '<tr>';
            HTML += '<th colspan="7" style="text-align:right;height:21px;" >';
            HTML += '<img id="imgAgregarEtapa" src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.png" alt="" title="Agregar Nueva Etapa" onclick="agregarEtapa();" class="imgCrecer" style="cursor:pointer; float:right;position: relative;"/>';
            HTML += '</th>';
            HTML += '</tr>';
        }
        HTML += '</table>';
        $('#divDetalle').html(HTML);
        mostrarFilas($('#divCalendarioAct'), 'block');
        colocaCalendarios();
        WidtDatePicker();
        $('#divGuardar').show();
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

var contador = 0;
function getTBL(etapa, idEtapa) {
    var HTML = '';
    HTML = '<table id="tbl' + etapa + '" style="width:100%;" cellpadding="0" cellspacing="0">';
    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];
        if (Dato.etapa == etapa) {
            contador++;
            var nameFI = 'txtFechaIni' + contador;
            var nameFF = 'txtFechaLim' + contador;
            fechasInicioArray.push(nameFI);
            fechasFinArray.push(nameFF);
            var fecha = "";
            HTML += '<tr>';
            HTML += '<td style="text-align:center; width:3%;">';
            HTML += contador;
            HTML += '</td>';
            HTML += '<td style="text-align:left; width:32%;">';
            HTML += Dato.actividad;
            HTML += '</td>';
            HTML += '<td style="text-align:left; width:19.2%;">';
            HTML += Dato.areaResponsable;
            HTML += '</td>';
            HTML += '<td style="text-align:center; width:18%;">';
            HTML += '<div id="divFechaIni' + contador + '" style="width: 100%; text-align:center; display: block"><input onchange="change(event,this,1,\'' + Dato.noActividad + '\');" class="datepicker1" id="' + nameFI + '" type="text"  maxlength="10" style="margin-left: -5px;width: 80%"" onkeyup="change(event,this,1,\'' + Dato.noActividad + '\');" value="' + Dato.fechaInicio + '" ' + readOnly + ' onkeypress="if (event.keyCode==13) return false;" /></div>';
            HTML += '</td>';
            HTML += '<td style="text-align:center; width:14%;">';
            HTML += '<div id="divFechaLim' + contador + '" style="width: 100%; text-align:center; display: block"><input class="datepicker2" id="' + nameFF + '" type="text"  style="margin-left: -5px;width: 80%" maxlength="10" onchange="change(event,this,2,\'' + Dato.noActividad + '\');" onkeyup="change(event,this,2,\'' + Dato.noActividad + '\');" value="' + Dato.fechaFin + '" ' + readOnly + ' onkeypress="if (event.keyCode==13) return false;" /></div>';
            HTML += '</td>';
            if (editar == true) {
                HTML += '<td style="text-align:right; width:5%; border-right-width:0">';
                HTML += '<div id="btnBorrarActividad' + contador + '" onclick="borrarActividad(\'' + Dato.noActividad + '_' + Dato.actividad + '\');" style="cursor: hand; color:#004824; text-decoration: underline;cursor:pointer" alt="Editar" title="Borrar Actividad">Borrar</div>';
                HTML += '<div id="btnEditarActividad' + contador + '" onclick="PantallaEditarActividad(\'' + Dato.noActividad + '\');" style="cursor: hand; color:#004824; text-decoration: underline;cursor:pointer" alt="Editar" title="Editar Actividad">Editar</div>';
                HTML += '</td>';
            }
            HTML += '</tr>';
        }
    }
    if (editar == true) {
        HTML += '<tr class="alternateRow">';
        HTML += '<td colspan="5" style="text-align:right;">';
        HTML += '';
        HTML += '</td>';
        HTML += '<td style="text-align:right; width:5%;height:13px; border-right-width:0">';
        HTML += '<img id="imgAgregar' + etapa + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.GIF" alt="" onclick="agregarActividad(\'' + etapa + '\'' + ',' + '\'' + idEtapa + '\');" title="Agregar Nueva Actividad" style="cursor:hand; float:right;" class="imgCrecerSmall"/>';
        HTML += '</td>';
        HTML += '</tr>';
    }
    HTML += '</table><div style="display:none;" id="shared_cal_holder_div"></div>';
    return HTML;
}



function change(e, txtFecha, opc, idAct) {
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
                validarEstructuraFecha(cadena, opc, idAct);
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
function validarEstructuraFecha(fecha, opc, idAct) {
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
            cambiarFecha(fecha, opc, idAct);
        }
    }
}

var cambiandoFecha = false;
function cambiarFecha(fecha, opc, idAct) {
    cambiandoFecha = true;
    Waiting(true, "Espere por favor. Guardando Información...");
    var parametros = { fecha: fecha, opcion: opc, idActividad: idAct, periodo: periodo, idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/cambiarFecha", "POST", parametros, function (data) {
        Waiting(false, "Espere por favor. Cargando Información...");
        setTimeout(resetVar, 500);
        if (data.d == "Good") {
            // mostrarCalendario(periodo);            
            //document.getElementById(_txtFecha.id).focus();
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
    }, null);
}

function resetVar() {
    cambiandoFecha = false;
}


function mostrarFilas(Renglon, opcion) {
    if (opcion == 'none') {
        $(Renglon).slideUp("slow");
    }
    else {
        $(Renglon).slideDown("slow");
    }
}
function colocaCalendarios() {
    $('.datepicker1').datepicker({ minDate: -0, maxDate: "+5M +10D" });
    $('.datepicker2').datepicker({ minDate: -0, maxDate: "+10M +10D" });
    if (editar == true)
        $(".ui-datepicker-trigger").removeAttr("disabled");
    else
        $(".ui-datepicker-trigger").attr("disabled", "disabled");

}

//--------------------------- Borrar Actividad

function borrarActividad(actividad) {
    MostrarMsj("¿Desea borrar la actividad <span style='font-weight:bold'>'" + actividad.split("_")[1] + "'</span>? ", "Mensaje", true, true, false, "Si", "No", "", 300, 120,
    function () {
        $("#divVentanaMensajes").dialog("close");
        eliminaActividad(actividad.split("_")[0]);
    }, function () {
        $("#divVentanaMensajes").dialog("close");
    }, null);
}

function eliminaActividad(idAct) {
    Waiting(true, "Espere por favor. Eliminando Registro...");
    var parametros = { idActividad: idAct, periodo: periodo, idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/eliminaActividad", "POST", parametros, function (data) {
        if (data.d == "Good") {
            mostrarCalendario(periodo);
            MostrarMsj("Registro borrado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        else {
            Waiting(false, "Espere por favor. Cargando Información...");
            MostrarMsj("Fallo al eliminar el registro.", "Error", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
    }, null);
}
/////////---------------------- Agregar Actividad

function agregarActividad(etapa, idEtapa) {
    MuestraDetalleM("AGREGAR ACTIVIDAD", 1, 0, null);
    $("#hdIdActividad").val(idEtapa);
    $('#txtEtapa').val(etapa);
    $('#txtEtapa').attr("disabled", 'true');
}

//--------------------------- Editar Actividad

function PantallaEditarActividad(objDato) {
    MuestraDetalleM("EDITAR ACTIVIDAD", 0, 0, objDato);
}

//-------------------- click imgAgregarEtapa
function agregarEtapa() {
    $('#txtEtapa').val("");
    $('#txtEtapa').readOnly = '';
    MuestraDetalleM("AGREGAR ETAPA", 2, 1, null);
    $("#hdIdActividad").val("2");
}
function ocultarSA1() {
    $("#divSelectA1").hide();
    $("#divSetA1").show();
    $("#hdIdActividad").val("1");
}
function verSA1() {
    $("#divSelectA1").show();
    $("#divSetA1").hide();
    $('#txtActividad').val('');
    $("#hdIdActividad").val("2");
}

function MuestraDetalleM(titulovtn, opcionGuardar, opcionDivVisible, objDato) {
    var cadena = '<div id="divBloqVtnActualizaResponsablesG" style="width:97%;height:83%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleFormulariosDescarga" style="width:100%;height:67%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblActualizaResponsablesG" style="width:100%;height:100%;overflow: hidden;margin-top: 0px;">  ';
    cadena += '<div id="divActividad" style="text-align: center; display: block"><table style="width: 100%; font-size: 10px"> <tr><td style="text-align: left; width: 152px;"> Etapa de Flujo:</td><td style="text-align: left;"> <input type="text" id="txtEtapa" style="width: 90%" maxlength="200" /></td> </tr>';
    cadena += ' <tr><td style="text-align: left; vertical-align: middle; width: 152px;"> Actividad:</td> <td style="text-align: left;"> <div id="divSelectA1" style="display: ' + (opcionDivVisible == 0 ? "none" : "block") + '; vertical-align: middle;"><select id="selectActividad" style="width: 90%"> </select><img id="imgCargar" src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.png"title="Agregar Nueva Área Responsable" alt="" style="cursor: pointer" onclick="ocultarSA1();" class="imgCrecerSmall"/> </div>';
    cadena += ' <div id="divSetA1" style="display: ' + (opcionDivVisible == 0 ? "block" : "none") + '; vertical-align: middle;"><input type="text" id="txtActividad" style="width: 89%" maxlength="200" /> <img id="imgCancelar" width="16px" height="16px" src="../../Images/PanelDeControl/cerrar.png" title="Cancelar" alt="" style="cursor: pointer;visibility:' + (opcionDivVisible == 0 ? "hidden" : "visible") + '" onclick="verSA1();" class="imgCrecerSmall"/></div> </td> </tr>';
    cadena += '<tr> <td style="text-align: left; vertical-align: middle; width: 152px;">Área Responsable:</td><td style="text-align: left;"><select id="ddlAresRes" style="width: 90%"> </select>  </td> </tr>';
    cadena += ' <tr> <td style="text-align: left; vertical-align: middle; width: 152px;">Fecha de Inicio:</td><td style="text-align: left;"><input id="txtFechaI" type="text" style="width: 82.5%" maxlength="10" onkeyup="change(event,this,0,0);" onkeypress="if (event.keyCode==13) return false;"  /></td> </tr>';
    cadena += '<tr> <td style="text-align: left; vertical-align: middle; width: 152px;"> Fecha Límite:</td> <td style="text-align: left;"><input id="TxtFechaL" type="text" style="width: 82.5%" maxlength="10" onkeyup="change(event,this,0,0);"onkeypress="if (event.keyCode==13) return false;"  /></td> </tr>';
    cadena += ' <tr><td height="20px"> <input id="hdIdActividad" type="hidden" /></td> </tr> </table></div>';
    cadena += '</div></div>';
    cadena += "<div><table style='width:100%;height:8%;margin-left: 12%;'><tr style='height:1%'></tr><tr><td style='text-align:left;width: 50%;'></td><td style='text-align:right'><table><tr><td><input type='button' onclick='guardarActividad(" + opcionGuardar + ");' class='classButton'  value='Guardar Edición'/></td><td style='width:10px;'></td><td></input><input type='button' onclick='quitaDetalle();' class='classButton'  value='Cancelar'/></td></tr></table></td></div>";

    $("#dvActualizaResponsablesG").empty();
    AgregarVtnFlotante("dvActualizaResponsablesG", "", titulovtn, "", cadena, 210, 550, false, false, "", "", null);
    $($("#dvDetalleEITblActualizaResponsablesG").find("input")[2]).datepicker({ minDate: -0, maxDate: "+5M +10D" });
    $($("#dvDetalleEITblActualizaResponsablesG").find("input")[3]).datepicker({ minDate: -0, maxDate: "+10M +10D" });

    if (opcionGuardar == 0) {
        for (var i = 0; i < Datos.length; i++) {
            var dato = Datos[i];
            if (dato.noActividad == objDato) {
                $("#txtActividad").val(dato.actividad);
                $("#txtEtapa").val(dato.etapa);
                $("#txtEtapa").attr("disabled", 'true');
                $("#txtFechaI").val(dato.fechaInicio);
                $("#TxtFechaL").val(dato.fechaFin);
                $("#hdIdActividad").val(dato.idEtapa + "_" + dato.noActividad + "_" + dato.areaResponsable);
            }
        }
    }
    getAreasResponsables(opcionDivVisible == 1 ? true : false);
}

function getAreasResponsables(cargarActividades) {
    WaitingVtn("divBloqVtnActualizaResponsablesG", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax("CalendarioDeTrabajo.aspx/getAreasResponsables", "POST", { idPais: PaisSelecXUser }, function (data) {
        if (data.d == "Sin Datos" || data.d == "" || data.d == null) {
            WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Cargando Información...");
            MostrarMsj("Sin a Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            return;
        }
        else {
            var arrayJSON = obtenerArregloDeJSON(data.d, false); var valueSelect = "";
            for (var i = 0; i < arrayJSON.length; i++) {
                var opt = document.createElement('option');
                opt.value = arrayJSON[i].FIAreaResponsable;
                opt.innerHTML = arrayJSON[i].FVCDescAreaResponsable;
                document.getElementById('ddlAresRes').appendChild(opt);
                if ($("#hdIdActividad").val().split("_")[2] == arrayJSON[i].FVCDescAreaResponsable)
                    valueSelect = arrayJSON[i].FIAreaResponsable;
            }
            $("#ddlAresRes").val(valueSelect);

            if (cargarActividades)
                getActividades();
            else
                WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Cargando Información...");
        }
    }, null);
}

function getActividades() {
    peticionAjax("CalendarioDeTrabajo.aspx/getActividades", "POST", { idPais: PaisSelecXUser }, function (data) {
        WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Cargando Información...");
        if (data.d != "Sin Datos" && data.d != "" && data.d != null) {
            var arrayJSON = obtenerArregloDeJSON(data.d, false);
            for (var i = 0; i < arrayJSON.length; i++) {
                var opt = document.createElement('option');
                opt.value = arrayJSON[i].FIActividad;
                opt.innerHTML = arrayJSON[i].FVCDescActividad;
                document.getElementById('selectActividad').appendChild(opt);
            }
        }
        else {
            MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            return;
        }
    }, null);
}

//---------------------------Btn Guardar 
function guardarActividad(opcionGuardar) {
    if (validarCamposNecesario(opcionGuardar == 2 ? true : false) == true) {
        if (opcionGuardar == 1) {
            guardarNuevaActividad($("#hdIdActividad").val(), $('#txtActividad').val(), $('#ddlAresRes').val(), $('#txtFechaI').val(), $('#TxtFechaL').val());
        }
        else if (opcionGuardar == 0) {
            var idAct = document.getElementById('hdIdActividad').value;
            editarActividad($("#hdIdActividad").val().split("_")[0], $('#txtActividad').val(), $('#ddlAresRes').val(), $('#txtFechaI').val(), $('#TxtFechaL').val(), $("#hdIdActividad").val().split("_")[1]);
        }
        else {
            insertaNuevaEtapa($('#txtEtapa').val(), ($("#hdIdActividad").val() == "1" ? $('#txtEtapa').val() : $('#selectActividad').val()), $('#ddlAresRes').val(), $('#txtFechaI').val(), $('#TxtFechaL').val());
        }
    }

}
function validarCamposNecesario(esEtapa) {
    var error = ''; var esCorrecto = false;
    if ($('#txtEtapa').val() == '') {
        error += 'Error: El campo "Etapa" no debe estar vacío.';
        $("#txtEtapa").css('border', 'solid 1px red');
    }
    else $("#txtEtapa").css('border', 'solid 1px gray');
    if (($('#txtActividad').val() == '' && !esEtapa) || (esEtapa && $("#hdIdActividad").val() == "1" && $('#txtActividad').val() == '')) {
        error += '</br>Error: El campo "Actividad" no debe estar vacío.';
        $("#txtActividad").css('border', 'solid 1px red');
    }
    else $("#txtActividad").css('border', 'solid 1px gray');
    if ($('#txtFechaI').val() == '') {
        error += '</br>Error: El campo "Fecha Inicio" no debe estar vacío.';
        $("#txtFechaI").css('border', 'solid 1px red');
    }
    else $("#txtFechaI").css('border', 'solid 1px gray');
    if ($('#TxtFechaL').val() == '') {
        error += '</br>Error: El campo "Fecha Límite" no debe estar vacío.';
        $("#TxtFechaL").css('border', 'solid 1px red');
    }
    else $("#TxtFechaL").css('border', 'solid 1px gray');
    if (error == '') esCorrecto = true;
    return esCorrecto;
}

///////---------------------------------Nueva Actividad
function guardarNuevaActividad(etapa, actividad, idArea, fI, fF) {
    WaitingVtn("divBloqVtnActualizaResponsablesG", true, true, "Guardando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var parametros = { etapa: etapa, actividad: actividad, idArea: idArea, periodo: periodo, fI: fI, fF: fF, idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/guardarNuevaActividad", "POST", parametros, function (data) {
        WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Guardando Información...");
        if (data.d == "Good") {
            $("#dvActualizaResponsablesG").dialog("close");
            mostrarCalendario(periodo);
            MostrarMsj("Registro agregado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        else {
            MostrarMsj("Fallo al guardar el registro.", "Error", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
    }, null);
}

//-----------------------------Editar Actividad
function editarActividad(etapa, actividad, idArea, fI, fF, idActividad) {
    WaitingVtn("divBloqVtnActualizaResponsablesG", true, true, "Guardando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var parametros = { etapa: etapa, actividad: actividad, idArea: idArea, periodo: periodo, fI: fI, fF: fF, idActividad: idActividad, idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/editaActividad", "POST", parametros, function (data) {
        WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Guardando Información...");
        if (data.d == "Good") {
            $("#dvActualizaResponsablesG").dialog("close");
            mostrarCalendario(periodo);
            MostrarMsj("Registro agregado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        else {
            MostrarMsj("Fallo al guardar el registro.", "Error", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
    }, null);
}

//-----------------------------Nueva Etapa
function insertaNuevaEtapa(etapa, actividad, idarea, fI, fF) {
    WaitingVtn("divBloqVtnActualizaResponsablesG", true, true, "Guardando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var parametros = { etapa: etapa, actividad: actividad, idArea: idarea, fI: fI, fF: fF, periodo: periodo, idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/insertaNuevaEtapa", "POST", parametros, function (data) {
        WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Guardando Información...");
        if (data.d == "Good") {
            $("#dvActualizaResponsablesG").dialog("close");
            mostrarCalendario(periodo);
            MostrarMsj("Registro agregado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        else {
            MostrarMsj("Fallo al guardar el registro.", "Error", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
    }, null);
}

function quitaDetalle() {
    mostrarFilas($('#dvDetalleCliente'), 'none');
    $("#dvActualizaResponsablesG").dialog("close");
}

//---------------------------------------Evento Click imgEditaResponsables 
function MuestraDivResponsables(idEtapa) {
    var cadena = '<div id="divBloqVtnActualizaResponsablesG" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleFormulariosDescarga" style="width:100%;height:75%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblActualizaResponsablesG" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">  ';
    cadena += '<table style="width: 100%"><tr><td style="width: 100%; text-align: center"> <b>RESPONSABLES POR AREA</b></td> </tr><tr style="height:3px;"></tr>';
    cadena += '<tr> <td style="text-align: center"><select id="slAreasResp" onchange="MuestraResponsablesAreasXEtapa();"> </select> </td></tr><tr style="height:3px;"></tr></table>';
    cadena += '<div id="divDespliegaResponsables" style="width: 100%;height: 70%;overflow: auto;"> </div>';
    cadena += '</div></div>';
    cadena += "<table style='width:90%;height:8%;margin-left: 29px;'><tr style='height:1%'></tr><tr><td style='text-align:left'></td><td style='text-align:right'><input type='button' id='btnGuardaRespXEtapa' onclick='GuardaResponsablesXEtapa();' class='classButton'  value='Guardar Selección'/></td>";
    $("#dvActualizaResponsablesG").empty();
    AgregarVtnFlotante("dvActualizaResponsablesG", "", "EDITAR RESPONSABLES", "", cadena, 280, 600, false, false, "", "", null);
    CatalogoAreaXEtapa(idEtapa);
}

function CatalogoAreaXEtapa(idEtapa) {
    WaitingVtn("divBloqVtnActualizaResponsablesG", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    IdEtapaResp = idEtapa;
    var parametros = { Opcion: 1, Etapa: idEtapa, periodo: periodo, idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/CatalogoAreaXEtapa", "POST", parametros, ImprimeAreasXeEtapa, null);
}

function ImprimeAreasXeEtapa(data) {
    var cad = '';
    cad += '<option value="-1">---------Seleccione un Área--------</option>';

    try {
        if (data.d == "" || data.d == null) {
            WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Cargando Información...");
            MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            return;
        }
        var arrayJSON = obtenerArregloDeJSON(data.d, false);
        for (var x = 0; x < arrayJSON.length; x++) {
            var json = arrayJSON[x];
            cad += '<option value="' + json.IdArea + '">';
            cad += json.Descripcion;
            cad += '</option>';
        }
    } catch (err) { }

    $('#slAreasResp').html(cad);
    $('#slAreasResp').val(arrayJSON[0].IdArea);
    MuestraResponsablesAreasXEtapa();
}

///------------------------------------Onchange Select 'slAreasResp' (Vtn Edita Responsables)
function MuestraResponsablesAreasXEtapa() {
    WaitingVtn("divBloqVtnActualizaResponsablesG", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var parametros = { Etapa: IdEtapaResp, Periodo: periodo, AreaResponsable: $('#slAreasResp').val(), idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/ResponsablesXEtapa", "POST", parametros, CargaResponsablesAreaXEtapa, null);
}

function CargaResponsablesAreaXEtapa(data) {
    var JSON = obtenerArregloDeJSON(data.d, false);
    if (data.d != '') {
        $('#btnGuardaRespXEtapa').removeAttr("disabled");
        $('#btnGuardaRespXEtapa').attr('class', 'classButton');
    }
    else {
        $('#btnGuardaRespXEtapa').attr("disabled", true);
        $('#btnGuardaRespXEtapa').attr('class', 'classButtonDis');
    }

    $('#divDespliegaResponsables').html("");
    if (data.d == "") {
        WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Cargando Información...");
        MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        return;
    }
    var cad = '';
    cad = generarTablaDeRegistrosXEtapa(JSON);
    $('#divDespliegaResponsables').html(cad);

    var noFilas = $('#tblResponXAreaEtapa > tbody > tr').length;
    if (ContadorCheck == noFilas) {
        $('#chkHeader').attr('checked', true);
    }
    WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Cargando Información...");
}
 
function generarTablaDeRegistrosXEtapa(listaDeJSON) {
    var Contador = 1;
    ContadorCheck = 0;
    var cad = '<center><table id="tblResponXAreaEtapa" width="100%"  class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados.toString() != 'Estatus') {
            cad += '<th>';
            cad += encabezados.toString();
            cad += '</th>';
        }
    }

    if (auxJSON != null) {
        cad += '<th valign="top">';
        cad += '<input id="chkHeader" type="checkbox" onclick="SelectTodos(\'Encabezado\');" />';
        cad += '</th>';
    }
    cad += '</tr>';
    cad += '</thead>';

    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="rowAlt">' : '<tr class="alternateRowAlt">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td>';
            if (element == 'Estatus') {
                cad += '<input id="chkCob_' + Contador + '" type="checkbox"';
                cad += json[element] == 1 ? ' checked="checked" ' : ' '; json[element] == 1 ? ContadorCheck = ContadorCheck + 1 : ContadorCheck = ContadorCheck + 0;
                cad += 'onclick="SelectTodos(\'Cuerpo\');" />';
            } else {
                cad += json[element];
            }
            cad += '</td>';
        }
        Contador = Contador + 1;
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}

///-----------------------Selecciona Checkbox------------------------------------------------/

function SelectTodos(Parte) {
    var noFilas = $('#tblResponXAreaEtapa > tbody > tr').length;
    var i = 0;
    var seleccionados = 0;
    if (Parte == 'Encabezado') {
        for (i = 1; i < noFilas + 1; i++) { $("#chkHeader").is(':checked') == false ? $("#chkCob_" + i.toString()).attr('checked', false) : $("#chkCob_" + i.toString()).attr('checked', true); }
    } else {
        for (i = 1; i < noFilas + 1; i++) { $("#chkCob_" + i.toString()).is(':checked') == true ? (seleccionados = seleccionados + 1) : (seleccionados = seleccionados + 0); }
        seleccionados == noFilas ? $("#chkHeader").attr('checked', true) : $("#chkHeader").attr('checked', false);
    }
}

/////////--------------------- Btn Guarda Responsables por Etapa  (Vtn Edita Responsables)
function GuardaResponsablesXEtapa() {
    var Responsables = '';
    var i = 0;
    var noFilas = $('#tblResponXAreaEtapa > tbody > tr').length;

    for (i = 1; i <= noFilas + 1; i++) {
        if ($("#chkCob_" + i.toString()).is(':checked') == true) {
            Responsables += $("#chkCob_" + i.toString()).parent().parent().children()[0].innerText;
            Responsables += ',';
        }
    }
    Responsables = Responsables.substring(0, Responsables.length - 1);
    if (Responsables != '') {
        WaitingVtn("divBloqVtnActualizaResponsablesG", true, true, "Cargando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "8%";
        var parametros = { Etapa: IdEtapaResp, Periodo: periodo, AreaResponsable: $('#slAreasResp').val(), Responsables: Responsables, idPais: PaisSelecXUser };
        peticionAjax("CalendarioDeTrabajo.aspx/GuardaResponsableXEtapa", "POST", parametros, ImprimeRespuesta, null);
    } else {
        MostrarMsj("No ha seleccionado a ningun Responsable para esta etapa.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
    }
}

function ImprimeRespuesta(data) {
    WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Cargando Información...");
    if (data.d == "") {
        MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        return;
    }
    MostrarMsj(data.d.toString() + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
    $("#dvActualizaResponsablesG").dialog("close");
}

////--------------------- hRef Actualiza Responsables

function MuestraDivActualizaResponsables() {
    var cadena = '<div id="divBloqVtnActualizaResponsablesG" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleFormulariosDescarga" style="width:100%;height:75%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblActualizaResponsablesG" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">  ';
    cadena += '<div id="ActualizaResponsables" style="text-align: center;height: 100%;"> <table width="100%"> <tr><td style="width: 100%; text-align: center"> <b>TABLA DE RESPONSABLES POR AREA</b> </td></tr><tr style="height:5px"></tr>';
    cadena += '<tr><td style="text-align: center">  <select id="slAreasResponsables" onchange="ObtieneCatResponsables();">  </select>  </select> </td> </tr><tr style="height:5px"></tr></table><div id="ResponsablesXARea" style="overflow:auto;height:64%"> </div></div>';
    cadena += '</div></div>';
    cadena += "<table style='width:90%;height:8%;margin-left: 29px;'><tr style='height:1%'></tr><tr><td style='text-align:left'></td><td style='text-align:right'><input type='button' id='btnNuevoResponsable' onclick='MostrarVtnAgregarNuevoResponsable();' class='classButton'  value='Agregar Responsable'/></td>";

    $("#dvActualizaResponsablesG").empty();
    AgregarVtnFlotante("dvActualizaResponsablesG", "", "ACTUALIZAR RESPONSABLES", "", cadena, 250, 600, false, false, "", "", null);
    WaitingVtn("divBloqVtnActualizaResponsablesG", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";

    LlenaCatAreas();
    $('#ResponsablesXARea').html('');
}


function LlenaCatAreas() {
    WaitingVtn("divBloqVtnActualizaResponsablesG", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var parametros = { Opcion: 1, idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/CatalogoAreas", "POST", parametros, CargaCatAreas, null);
}

function CargaCatAreas(data) {
    var cad = '';
    cad += '<option value="-1">---------Selecciones un Área--------</option>';
    try {
        WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Cargando Información...");
        if (data.d == "") {
            MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            return;
        }
        var arrayJSON = obtenerArregloDeJSON(data.d, false);
        for (var i = 0; i < arrayJSON.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSON[i].Id;
            opt.innerHTML = arrayJSON[i].Descripcion;
            document.getElementById('slAreasResponsables').appendChild(opt);
        }
    } catch (err) { }
    ObtieneCatResponsables();
}

function MostrarVtnAgregarNuevoResponsable() {
    var cadena = '<div id="divBloqVtnActualizaResponsablesG" style="width:97%;height:78%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleFormulariosDescarga" style="width:100%;height:60%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblActualizaResponsablesG" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">  ';
    cadena += '</div></div>';
    cadena += "<table style='width:90%;height:8%;margin-left: 29px;'><tr style='height:1%'></tr><tr><td style='text-align:left'></td><td style='text-align:right'><input type='button' onclick='GuardarResponsable();' class='classButton'  value='Agregar Responsable'/></td>";

    $("#dvActualizaResponsablesG").empty();
    AgregarVtnFlotante("dvActualizaResponsablesG", "", "AGREGAR RESPONSABLE", "", cadena, 160, 600, false, false, "", "", null);
    $(".ChangeColorCorreo").css('border', 'solid 1px gray');
    $(".ChangeColorNameRes").css('border', 'solid 1px gray');
    $("#dvDetalleEITblActualizaResponsablesG").html($("#dvFormNuevoResponsable").html());
}

function GuardarResponsable() {
    if (ValidarCamposVacios() && ValidarCorreo()) {
        WaitingVtn("divBloqVtnActualizaResponsablesG", true, true, "Guardando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "8%";
        var parametros = { Opcion: 3, AreaResp: IdAreaR, NombreResp: $($("#dvDetalleEITblActualizaResponsablesG").find("input")[0]).val(), CorreoElec: $($("#dvDetalleEITblActualizaResponsablesG").find("input")[1]).val(), idPais: PaisSelecXUser };
        peticionAjax("CalendarioDeTrabajo.aspx/CargaNuevoResponsable", "POST", parametros, NuevoResponsable, null);
    }
}

function NuevoResponsable(data) {
    WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Guardando Información...");
    MostrarMsj(data.d.toString(), "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
    $("#dvActualizaResponsablesG").dialog("close");
}

function ValidarCamposVacios() {
    var valorCorreo = $($("#dvDetalleEITblActualizaResponsablesG").find("input")[1]).val();
    var valorNombreResponsable = $($("#dvDetalleEITblActualizaResponsablesG").find("input")[0]).val();
    var esCorrectoMAil = false; var esCorrectoNAme = false; var cadenaMsj = "";

    if (valorNombreResponsable == null || valorNombreResponsable.length == 0 || /^\s+$/.test(valorNombreResponsable)) {
        $(".ChangeColorNameRes").css('border', 'solid 1px red');
        cadenaMsj += "Ingrese el Nombre";
    }
    else { $(".ChangeColorNameRes").css('border', 'solid 1px gray'); esCorrectoNAme = true; }

    if (valorCorreo == null || valorCorreo.length == 0 || /^\s+$/.test(valorCorreo)) {
        $(".ChangeColorCorreo").css('border', 'solid 1px red');
        cadenaMsj += cadenaMsj != "" ? " y el Correo Electronico" : "Ingrese el Correo Electronico";
    }
    else { $(".ChangeColorCorreo").css('border', 'solid 1px gray'); esCorrectoMAil = true; }

    if (!esCorrectoMAil || !esCorrectoNAme) {
        WaitingVtn("divBloqVtnActualizaResponsablesG", true, false, "Guardando Información...");
        MostrarMsj(cadenaMsj + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Guardando Información..."); }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Guardando Información...");
        });
    }
    return esCorrectoMAil && esCorrectoNAme ? true : false;
}

function ValidarCorreo() {
    if (/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/.test($($("#dvDetalleEITblActualizaResponsablesG").find("input")[1]).val())) {
        $(".ChangeColorCorreo").css('border', 'solid 1px gray');
        return true;
    } else {
        $(".ChangeColorCorreo").css('border', 'solid 1px red');
        WaitingVtn("divBloqVtnActualizaResponsablesG", true, false, "Guardando Información...");
        MostrarMsj("La dirección de email '<span style='color:Orange'>" + $($("#dvDetalleEITblActualizaResponsablesG").find("input")[1]).val() + "</span>' es incorrecta.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, function () { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Guardando Información..."); }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Guardando Información...");
        });
        return false;
    }
}

function ObtieneCatResponsables() {
    IdAreaR = $('#slAreasResponsables').val();
    WaitingVtn("divBloqVtnActualizaResponsablesG", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var parametros = { Opcion: 2, AreaResp: $('#slAreasResponsables').val(), idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/CatalogoResponsablesArea", "POST", parametros, CargaResponsablesArea, null);
}

function CargaResponsablesArea(data) {
    var JSON = obtenerArregloDeJSON(data.d, false);
    if (data.d == "") {
        MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        return;
    }

    var cad = '';
    cad = generarTablaDeRegistrosCalenTrab(JSON);

    $('#ResponsablesXARea').html(cad);
    WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "Cargando Información...");
}

function generarTablaDeRegistrosCalenTrab(listaDeJSON) {
    var cad = '<center><table id="tblContenidoproyectos" width="100%"  class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        cad += '<th>';
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
            cad += '<td>';
            cad += json[element];
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}


//--------------------------------BTN Generar Seguimiento Cancelación (btnGuardarCal)

function preestablecerFechas() {
    if (verificarTXTFechas() == true) {
        MostrarMsj("Existen fechas en blanco, favor de establecer fechas.", "Mensaje", false, true, false, "", "Aceptar", "", 220, 120, null, null, null);
    }
    else {
        MostrarMsj("Una vez generado el seguimiento no se podrán editar los valores del Calendario. </br></br>¿Desea Continuar? ", "Mensaje", true, true, false, "Si", "No", "", 300, 145,
        function () {
            $("#divVentanaMensajes").dialog("close");
            insertaTablero();
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
    }
}

function verificarTXTFechas() {
    var countFI = 0;
    var countFF = 0;
    for (var i = 0; i < fechasInicioArray.length; i++) {
        if ($("#" + fechasInicioArray[i]).val() == '')
            countFI++;
        if ($("#" + fechasFinArray[i]).val() == '')
            countFF++;
    }
    if (countFI > 0) {
        return true;
    }
    if (countFF > 0) {
        return true;
    }
    return false;
}

function insertaTablero() {

    Waiting(true, "Espere por favor. Guardando Información...");
    var parametros = { periodo: periodo, idPais: PaisSelecXUser };
    peticionAjax("CalendarioDeTrabajo.aspx/insertaTablero", "POST", parametros, function (data) {
        Waiting(false, "Espere por favor. Cargando Información...");
        if (data.d == "Good")
            MostrarMsj("Registro agregado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        else {
            MostrarMsj("Fallo al obtener los datos.", "Error", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
    }, null);
}
