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

function ObtenerFechaCorte() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("BitacoraClientesInd.aspx/ObtenerFechaCorte", "POST", null, function (data) {
        $("#txtFecha").val(data.d);
        WidtDatePicker();
        ObtenerTablaBitacora(data.d);
    });
}

function ObtenerTablaBitacora(fecha) {
    if ($("#txtFecha").val() == '') {
        MostrarMsj("Debe seleccionar una fecha.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("BitacoraClientesInd.aspx/ObtenerDatosBitacora", "POST", { fechaCorte: $("#txtFecha").val().split("/")[2] + "/" + $("#txtFecha").val().split("/")[1] + "/" + $("#txtFecha").val().split("/")[0],opcion:3 }, function (data) {
        if (data.d.indexOf("ErrorSP") == -1) {
            if (data.d != "") {
                $("#divTblDatosBitacora").html(data.d);
            }
        }
        else 
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function CreaTablaConOtrosEncabezadosSeguimiento(listaDeJSON, listaEncabezados) {
    var cad = '<center><div class="divContenidoTabla"><table class="dataGridDatos" style="width: 70%;">';
    cad += '<thead><tr><td>BITACORA DE NOTAS PARA CLIENTES INDIVIDUALES</td></tr>';
    cad += '<tr>';
    for (var i = 0; i < listaEncabezados.split(',').length; i++)
        cad += '<th style="text-align: center;">' + listaEncabezados.split(',')[i] + '</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element == "FIIdPerfil")
                cad += '<td style="text-align:left;" title="' + (json[element] == "16" ? "Perfil Genera" : "Autoriza") + '">' + (json[element] == "16" ? "Perfil Autoriza" : "Autoriza") + '</td>';
            else
                cad += '<td style="text-align:left;" >' + json[element] + '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div></center>';
    return cad;
}