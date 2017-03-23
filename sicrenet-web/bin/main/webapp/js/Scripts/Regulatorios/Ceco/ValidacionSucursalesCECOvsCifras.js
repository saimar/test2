$(function () {
    $("#accordion").accordion();
});


function ValSucCecoVSCífrasMasterPage() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
}

function validarSucursales() {
    if ($('.slcTipoValidacion').val() == "-1")
        return;
    Waiting(true, "Espere por favor. Cargando Información...");
    $('#divReporteSucursales').html("");
    peticionAjax("ValidacionSucursalesCECOvsCifras.aspx/obtenerReporte","POST",{ opcion: $('.slcTipoValidacion').val() },validarSucursalesFinalizado, validarSucursalesFinalizado);
}

function validarSucursalesFinalizado(data) {
    Waiting(false, "Espere por favor. Cargando Información...");
    if (data.d.indexOf("Error") == -1) {
        if (data.d != "") {
            var JSON = obtenerArregloDeJSON(data.d, false);
            $('#divReporteSucursales').html(generarTablaDeRegistrosSinFoot1(JSON));
        }
        else
            $('#divReporteSucursales').html("<h3>La sucursales son correctas</h3>");
    }
    else
        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    Waiting(false, "Espere por favor. Cargando Información...");
} 