

function AsignarMenuContextual() {
    $.contextMenu({
        selector: '.carpetasG',
        callback: function (key, options) {
            $('#hfCarpetaSeleccionada').val($('#hfCarpetaActual').val());
            MostrarVtnSubirFile();
        },
        items: {
            "Subir Archivo": { name: "Subir Archivo", icon: "edit" }
        }
    });

    $.contextMenu({
        selector: '.folder',
        callback: function (key, options) {
            $('#hfCarpetaSeleccionada').val($(this).find('input:hidden').val());
            MostrarVtnSubirFile();
        },
        items: {
            "Subir Archivo": { name: "Subir Archivo", icon: "edit" }
        }
    });

    $.contextMenu({
        selector: '.file',
        callback: function (key, opti) {
            $('#hfEliminarArchivo').val($(this).find('input:hidden').val());
            var archivo = $('#hfEliminarArchivo').val().split("##")[$('#hfEliminarArchivo').val().split("##").length - 1]
            MostrarMsj("¿Esta seguro que desea eliminar el archivo <span style='font-weight:bold'>'" + archivo + "'</span> ? ", "Mensaje", true, true, false, "Si", "No", "", 300, 145,
        function () {
            $("#divVentanaMensajes").dialog("close");
            borrarArchivo();
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
        },
        items: {
            "Eliminar Archivo": { name: "Eliminar Archivo", icon: "cut" }
        }
    });
}

function borrarArchivo() {
    var parametrosJSON = { archivo: $('#hfEliminarArchivo').val() };
    Waiting(true, "Espere por favor. Borrando Archivo...");
    peticionAjax("RutaCancelacionCartera.aspx/borrarArchivo", "POST", parametrosJSON, borrarArchivoFinalizada, borrarArchivoFinalizada);
}

function borrarArchivoFinalizada(data) {
    CargarTreeViewG();
}

function MostrarVtnSubirFile() {
    var cadena = '<div id="divBloqVtnActualizaResponsablesG" style="width:95%;height:80%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleFormulariosDescarga" style="width:100%;height:60%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblActualizaResponsablesG" style="width:100%;height:100%;overflow: none;margin-top: 0px;text-align: left;">  ';
    cadena += '<textarea cols="30" rows="5" id="hTitulos" disabled="disabled" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:#dddddd;width:100%; text-align:left; border: none;height:45px" > </textarea>';
    cadena += '<input type="file" id="fileUpSubirArchivo" name ="fuSubirArchivo" class="fuSubirArchivo" style="margin-top: 15px;"/>';
    cadena += '</div></div>';
    cadena += "<div><table style='width:100%;height:8%;margin-left: 12%;'><tr style='height:1%'></tr><tr><td style='text-align:left;width: 50%;'></td><td style='text-align:right'><table><tr><td>" +
    "<input type='button' onclick='return enviarArchivoAsincronamente();' class='classButton'  value='Cargar'/> " +
    "</td><td style='width:10px;'></td><td></input><input type='button' onclick='borrarArchivoASubir();' class='classButton'  value='Borrar'/></td></tr></table></td></div>";

    $("#dvSubirArchivo").empty();
    AgregarVtnFlotante("dvSubirArchivo", "", "SUBIR ARCHIVO", "", cadena, 180, 300, false, false, "", "", null);
    $('#hTitulos').html(replaceAll($('#hfCarpetaSeleccionada').val(), '##', '/'));
}

function obtenerCarpetas(path) {
    var aplicarSpan = false;
    var cadenaHtml = ""; var url = "";
    for (var i = 0; i < path.split('##').length; i++) {
        if ((path.split('##')[i] == "CARTERA_CASTIGADA" || path.split('##')[i] == "BDOficiales" || path.split('##')[i] == "Archivos") || aplicarSpan) {
            url += path.split('##')[i] + "##";
            if ((path.split('##')[i] == "CARTERA_CASTIGADA" || path.split('##')[i] == "BDOficiales" || path.split('##')[i] == "Archivos"))
                aplicarSpan = true;
            cadenaHtml += " <span class='spanColor' onclick=\"obtenerCarpetas('" + url.substring(0, url.length - 2) + "'); \" >" + path.split('##')[i] + "</span>/";
        }
        else {
            cadenaHtml += path.split('##')[i] + "/";
            url += path.split('##')[i] + "##";
        }
    }

    $('#lblRutaC').html('&nbsp&nbsp&nbsp&nbsp' + cadenaHtml.substring(0, cadenaHtml.length - 1));
    $('#hfCarpetaActual').val(path);
    var parametrosJSON = { directorio: path };
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("RutaCancelacionCartera.aspx/generarPantallaDeCarpetas", "POST", parametrosJSON, obtenerCarpetasFinalizada, obtenerCarpetasFinalizada);
}

function obtenerCarpetasFinalizada(data) {
    setTimeout(terminarWait, 500);
    $('#divCarpetas').html(data.d.toString());
}

function pedirArchivo(ruta) {
    __doPostBack('pedirArchivo', ruta);
}

function borrarArchivoASubir() {
    $("#fileUpSubirArchivo").replaceWith($("#fileUpSubirArchivo").clone());
    return false;
}

function validarExistenciaDeArchivo(obj) {
    var bandera = false;
    if ($(obj).val() == '') {
        WaitingVtn("divBloqVtnActualizaResponsablesG", true, false, "");
        MostrarMsj('Debe seleccionar un archivo.', " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, function () {
            WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnActualizaResponsablesG", false, false, "");
        });
        bandera = false;
    }
    else {
        bandera = true;
    }
    return bandera;
}

function enviarArchivoAsincronamente() {
    if (!validarExistenciaDeArchivo($('#fileUpSubirArchivo'))) {
        return false;
    }
    var parametros = { 'path': $('#hfCarpetaSeleccionada').val(),
        'subirArchivo': 'subirArchivo'
    };
    return ajaxFileUpload(parametros);
}

var archivoCargado = false;
function ajaxFileUpload(parametros) {
    $("#dvSubirArchivo").dialog("close");
    Waiting(true, "Espere por favor. Cargando Información...");
    $.ajaxFileUpload
		        ({
		            url: 'RutaCancelacionCartera.aspx',
		            fileElementId: "fileUpSubirArchivo",
		            dataType: 'json',
		            data: parametros,
		            complete: function () {
		            },
		            success: function (data, status) {
		                archivoCargado = true;
		                MostrarMsj('Archivo Subido Corectamente.', " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, function () {
		                    $("#divVentanaMensajes").dialog("close");
		                    archivoCargado = false;
		                    CargarTreeViewG();
		                }, null);
		                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
		                    if (archivoCargado == true) { CargarTreeViewG(); archivoCargado = false; }
		                });
		            }
		        });
    return false;
} 
