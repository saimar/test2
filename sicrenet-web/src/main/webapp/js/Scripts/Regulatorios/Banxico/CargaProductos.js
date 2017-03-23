

function LoadPage() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
}


function enviarArchivoAsincronamente(obj) {
    if (!validarExistenciaDeArchivo($(obj).parent().find("input:file"))) {
        return false;
    }
    var idInputFile = $(obj).parent().find("input:file").attr("id");
    var parametros = { 'subirArchivo': 'subirArchivo' };
    return ajaxFileUpload(idInputFile, obj, parametros);
}

function validarExistenciaDeArchivo(obj) {
    var bandera = false;
    if ($(obj).val() != undefined && ($(obj).val() == '' || $(obj).val().toUpperCase().indexOf('.TXT') == -1)) {
        MostrarMsj("Debe seleccionar un archivo .txt", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
        bandera = false;
    }
    else {
        bandera = true;
    }
    return bandera;
}

function ajaxFileUpload(idInputFile, obj, parametros) {
    Waiting(true, "Espere por favor. Cargando Información...");
    $.ajaxFileUpload
		    ({
		        url: 'CargaProductos.aspx',
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

function reportarStatusDeSubidaAdjuntos(data, obj) {

    //    $("#ExpanderGrid").hide();
    //    $("#div2").hide();
    //    $('#tblNewUnidadeseg').html("");
    //    $('#lbError').html("");
    //    $('#lblMensaje').html("");
    data = data.toString().replace("<PRE>", "").replace("</PRE>", "").replace("<pre>", "").replace("</pre>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "").replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');
    //    if (data.split("%%&amp;&amp;")[0] == "CargaFileComplemento") {
    var script = document.createElement("script");
    script.innerHTML = data;
    document.body.appendChild(script);
    if ($('#hdCargarTabla').val() == "true") {
        peticionAjax("CargaProductos.aspx/GetDatosTabla", "POST", null, function (data) {
            $('#divtblDatos').html(data.d);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    } else
        Waiting(false, "Espere por favor. Cargando Información...");
    //        if (data.indexOf("nbsp") != -1) {
    //            peticionAjax("PanelDeControl.aspx/DevuelveTablaNuevasUnidadesDeNegocio", "POST", null, function (data) {
    //                $("#ExpanderGrid").show();
    //                toggleSlide('div2', 'insert2', 'vtnH', 'divCargaFileComplemento', -1);
    //                $('#tblNewUnidadesNeg').html(data.d);
    //                WaitingVtn("divBloqVtndivCargaFileComplemento", false, false, "");
    //            }, null);
    //        }
    //        else
    //            WaitingVtn("divBloqVtndivCargaFileComplemento", false, false, "");
    //    }
}