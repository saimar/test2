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
    $(".calendario").datepicker(); 
});


function ObtenerFechaActual() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ValidacionCP.aspx/DevuelveFechaActual", "POST", null, function (data) {
        $("#txtFecha").val(data.d.split('%%&&')[0]);
        WidtDatePicker();
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function ValidarCecoVsAnterior() {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Regulatorios.Ceco.ValidacionCP.ObtenerMuestraSEPOMEX(
    '1', '0', '0', '0',
    function (response) {
        if (response.value.indexOf("Error") == -1) {
            if (response.value != "") {
                var JSON = obtenerArregloDeJSON(response.value, false);
                $("#divCecoSepomex").html(CreaTablaMuestraSepomex(JSON));
                $('#divCecoSepomex').show();
            }
            else {
                $('#divCecoSepomex').hide();
            }
        }
        else {
            MostrarMsj(response.value, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    }
    );
}


function CreaTablaMuestraSepomex(listaDeJSON) {
    var cad = '<center><div class="divContenidoTabla"><table class="dataGridDatos" style="width: 70%;">';
    cad += '<thead>';
    cad += '<tr>';
    cad += '<th style="text-align: center;">Numero Económico</th>';
    cad += '<th style="text-align: center;">Código Postal</th>';
    cad += '<th style="text-align: center;"></th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element == 'Num_Economico') {
                cad += '<td style="text-align:center">';
                cad += '<span id="spNumEcon_' + listaDeJSON[filas]["Num_Economico"] + '">' + json[element] + '</span>';
            }
            else {
                cad += '<td style="text-align:center">';
                cad += '<input id="txtCP_' + listaDeJSON[filas]["Num_Economico"] + '" type="text" value="' + json[element] + '" maxlength="5" onkeyup="change(event,this);" onkeypress="if (event.keyCode==13) return false;"/>';
            }
            cad += '</td>';
        }
        cad += '<td style="text-align:center"><input id="btn_' + listaDeJSON[filas]["Num_Economico"] + '" type="button" value="Actualizar CP"  class="classButton" onclick="ActualizaNumEconomic(this);"></td>';
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div></center>';
    return cad;
}

function ActualizaNumEconomic(obj) {
    var valorEconomic = $("#txtCP_" + $(obj).attr("id").split("_")[1]).val();
    if (valorEconomic != "") {
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("ValidacionCP.aspx/actualizarSepomex", "POST", { numEonomic: $("#spNumEcon_" + $(obj).attr("id").split("_")[1]).html(), valorNew: valorEconomic }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {
                    MostrarMsj("Registro actualizado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                }
            }
            else {
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            }
            Waiting(false, "Espere por favor. Cargando Información...");
        });
    }
}

function change(e, txtFecha) {
    var key = window.event ? e.keyCode : e.which;
    var cadena = $(txtFecha).val();
    var direccion = false;
    if (key >= 37 && key <= 40) {
        direccion = true;
    }
    if (direccion == false) {
        if (key >= 96 && key <= 105) {
            cadena = cadena;
            validarFecha(cadena, txtFecha);
        }
        else {
            if (key != 8) {
                validarFecha(cadena, txtFecha);
            }
        }
    }
}

var num = '0123456789';
function validarFecha(cadena, txtFecha) {
    var nuevaCadena = '';
    for (var i = 0; i < cadena.length; i++) {
        var c = cadena.charAt(i);
        if (contains(c)) {
            nuevaCadena += c;
        }
    }
    $(txtFecha).val(nuevaCadena);
}
function contains(obj) {
    for (var i = 0; i < num.length; i++) {
        if (num.charAt(i) == obj) {
            return true;
        }
    }
    return false;
}


function bajarArchivo_Click() {
    if ($("#txtFecha").val() == '') {
        MostrarMsj("Debe Establecer una Fecha de Búsqueda.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Regulatorios.Ceco.ValidacionCP.ObtenerMuestraSEPOMEX(
    '2', $("#txtFecha").val().split('/')[2], $("#txtFecha").val().split('/')[1], $("#txtFecha").val().split('/')[0],
    function (response) {
        if (response.value.indexOf("Error") == -1) {
            if (parseInt(response.value) > 0) {
                Waiting(true, "Descargando Archivo...");
                __doPostBack('pedirArchivo', "Validacion_FuentesSepomex_" + $("#txtFecha").val().split('/')[0] + "-" + $("#txtFecha").val().split('/')[1] + "-" + $("#txtFecha").val().split('/')[2] + ".txt");
                setTimeout(terminarWait, 3000);
            }
            else {
                MostrarMsj('No se encontaron Datos de Validación.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        }
        else {
            MostrarMsj(response.value, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    }
    );
}

function SubirArchivo() {
    AgregarVtnFlotante("divSubirArchivo", "", "Validación Fuentes de Información vs SEPOMEX", "", $("#divSubirArchivo").html(), 180, 650, false, false, "", "", null);
}
 