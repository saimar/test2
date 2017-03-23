$(document).ready(function () {
    //CatFechasSB();
});

function CatFechasSB() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    peticionAjax('GraficaSB.aspx/CatFechasSB', "POST", null, function (data1) {
        var arrayJSONPG = obtenerArregloDeJSON(data1.d, false);
        document.getElementById('ddlTrimestre1').options.length = 0;
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].FSDFechaCorte;
            opt.innerHTML = arrayJSONPG[i].FSDFechaCorte;
            document.getElementById('ddlTrimestre1').appendChild(opt);
        }
        $('#ddlTrimestre2').html($('#ddlTrimestre1').html());
        CatProductosSB();
    }, null);
}

function CatProductosSB() {
    peticionAjax('GraficaSB.aspx/CatProductosSB', "POST", null, function (data1) {
        var arrayJSONPG = obtenerArregloDeJSON(data1.d, false);
        document.getElementById('ddlProductos').options.length = 0;
        for (var i = 0; i < arrayJSONPG.length; i++) {
            var opt = document.createElement('option');
            opt.value = arrayJSONPG[i].FICveProducto;
            opt.innerHTML = arrayJSONPG[i].FVCDescProducto;
            document.getElementById('ddlProductos').appendChild(opt);
        } 
    }, null);
}