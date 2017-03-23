//--------------------------------------------------------envio Archivo

function CargaCECOSepomexMasterPage() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
}

function enviarArchivoAsincronamente(obj,opcionCarga) {
    if (!validarExistenciaDeArchivo($(obj).parent().find("input:file"))) {
        return false;
    }
    var idInputFile = $(obj).parent().find("input:file").attr("id");
    var parametros = { 'subirArchivo': 'subirArchivo' };
    return ajaxFileUpload(idInputFile, obj, parametros, opcionCarga);
}

function validarExistenciaDeArchivo(obj) {
    var bandera = false;
    if ($(obj).val() == '') {
        //  MostrarMsj("Debe seleccionar un archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
        $("#spErrorCargaArchivo").html("Debe seleccionar un archivo .txt");
        bandera = false;
    }
    else {
        bandera = true;
    }
    return bandera;
}

var nomArchivoASubir;
function ajaxFileUpload(idInputFile, obj, parametros, opcionCarga) {
    $("#spErrorCargaArchivo").html("");
    Waiting(true, "Espere por favor. Cargando Información...");
    $.ajaxFileUpload
		    ({
		        url: opcionCarga == '1' ? 'Carga.aspx' : (opcionCarga == '2' ? 'CargaSepomex.aspx' : 'ValidacionCP.aspx'),
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaDeArchivo(data, obj);
		        }
		    });
    return false;
}

function reportarStatusDeSubidaDeArchivo(data, obj) {
    data = data.toString().replace("<pre>", "").replace("</pre>", "").replace("<PRE>", "").replace("</PRE>", "");
    $("#spErrorCargaArchivo").html(data.split('%%&amp;&amp;')[0]);
    document.getElementById('spErrorCargaArchivo').style.color = data.split('%%&amp;&amp;')[1];
    Waiting(false, "Espere por favor. Cargando Información...");
}