var idactividad;
function editComentario(dato,nombre) {
    var cadena = '<div id="divBloqVtndvComentarios" style="width:100%;height:95%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvComentarios" style="width:100%;height:95%;"> ';
   
    cadena += '<div id="divHistorial2" style="width:100%; height:70%; text-align:left;"></div>';
    cadena += '<div style="width:100%;height:30%;"><img src="../../Images/Portafolio/Proyectos/icono_comentarios.jpg" alt="Comentario" width="30px" height="30px" />';
    cadena += 'Introduce tu comentario :</br><textarea cols="30" rows="2" id="txtComenComentarioP" style="font: normal 9px Helvetica, Arial, sans-serif;resize: both;background-color:White;width:95%; text-align:left; height:45%" ></textarea>';
    cadena += '<br>Opcional: <input type="file" id="fuArchivosAdjuntos" name="fuArchivosAdjuntos" style="width:90%; height:20px" /></br> <input type="button" id="tblGuardar" onclick="GuardarComentario(\'' + dato + '\');" style="float: right;" value="Guardar" class="classButton"/>';
    cadena += '<br><div style="float:left;"><strong>Nota: </strong> Límite de Carga de Adjuntos <strong>30MB</strong>.</div></div></div>'
    $("#dvComentarios").empty();
    AgregarVtnFlotante("dvComentarios", "", dato+" "+nombre+" Comentarios ", "", cadena, 460, 800, false, false, "", "", null);
    ObtenerComentarios(dato);
    idactividad = dato;
}

function ObtenerComentarios(idActividad) {
    var parametros = { idActividad: parseInt(idActividad), Opcion: parseInt('2'),Comentario:'' ,idResponsable: LogUsuario, IdAdj:0 };
    peticionAjax("Proyectos.aspx/ObterComentario", "POST", parametros, ObtieneDataComentario, ObtieneDataComentario);
}

function ObtieneDataComentario(data) {
    if (data.d != "") {
        var JSON = new Array(); //= obtenerArregloDeJSON(data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''), false);
        for (var i = 0; i < data.d.split("####|").length; i++) {
            var JSONTemp = new Array();
            for (var ii = 0; ii < data.d.split("####|")[i].split("%%%%|,").length; ii++) {
                JSONTemp[data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[0]] = data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[1];
            }
            JSON.push(JSONTemp);
        }
        delete JSON[JSON.length - 1];
        //JSON = JSON.splice(JSON.length-1, 1); ;
        //cadena = "<a style='font: normal 10px Helvetica, Arial, sans-serif;cursor: pointer;'><img src='../../Images/PanelDeControl/Expander/insert.jpg' id='insert2' style ='margin-bottom:-5px' onclick=\"toggleSlide('div2',this.id,'vtnH','dvComentarios',2);\" alt='expander' /></a> <span id='insert2' style='font: normal 10px Helvetica, Arial, sans-serif;cursor: pointer;' onclick=\"toggleSlide('div2',this.id,'vtnH','dvComentarios',2); \">Historial </span><div style='height:150px;width: 650px;overflow: auto;'> <div id='div2' style=display:none;'>";
        cadena = CreaTablaComentariosAgenda(JSON);
        //cadena += "</div></div>";
        $('#divHistorial2').html(cadena);
    }
    else $("#dvComentarios").animate({ height: "250px" });
}

function CreaTablaComentariosAgenda(listaDeJSON) {
    var cad ='';
    cad += '<div class="divContenidoTabla" style="width: 100%; height:100%; overflow-y:scroll;">';
    cad += '<table class="dataGridDatos" style="width: 100%; ">';
    cad += '<tr>';
    cad += '<th style="text-align: center; width:20%">Fecha</th><th style="text-align: center; width:20%">Usuario</th><th style="text-align: center; width:60%">Comentario</th><th style="text-align: center; width:5%">Adjunto</th>';    
    cad += '</tr>';

    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element != "clear") {
                if (element == "Fecha")
                {
                    cad += '<td style="text-align:center;width:20%; word-wrap: break-word;text-align: left;">';
                    cad += json[element];
                }
                else if(element=="Usuario")
                {
                    cad += '<td style="text-align:center;width:20%; word-wrap: break-word;text-align: left;">';
                    cad += json[element];
                }
                else if (element == "FVCComentario")
                {
                    cad += '<td style="text-align:left;width:70%; word-wrap: break-word;text-align: left;">';
                    cad += json[element];
                }
                else if (element == "Adjuntos")
                {
                    cad += '<td style="text-align:left;width:5%; word-wrap: break-word;text-align: left;">';
                    cad += '<a id="aBorra" onclick="obtieneArchivoAd(\'' + json[element] + '\',\'' + idactividad + '\');" style="text-decoration: underline; color:Blue" Title="Descargar Archivo">';
                    cad += json[element];
                    cad += '</a>';
                }
                
                cad += '</td>';
            }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div>';
    return cad;
}
var LogUsuario = '';
var ravevalidacion = '';
var acv = '';

function GuardarComentario(idActividad) {
    var adj = $("#fuArchivosAdjuntos").val();
    var msm = "";
    if (adj != "") {
       // var rave = enviarArchivoAsincronamentecom(adj, idactividad);
    }
    else {
        msm = "<p> No tiene ningun Archivo Adjunto </p><p> Nota: En caso de no leer el archivo porfavor cierre la ventana y vuelvala a abrir </p>";
    }
    //obteniendo id usuario   

    peticionAjax("Proyectos.aspx/obtieneUserLog", "POST", null, function (data) {
        LogUsuario = data.d.toString();
        WidtDatePicker();
        //ObtenrInfoI();
    }, null);
    if ($("#txtComenComentarioP").val() == "") {
        WaitingVtn("divBloqVtndvComentarios", true, false, "");
        MostrarMsj("Ingrese el comentario.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
            WaitingVtn("divBloqVtndvComentarios", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndvComentarios", false, false, "");
        });
        return;
    }
    WaitingVtn("divBloqVtndvComentarios", true, false, "");
    MostrarMsj("" + msm + "<strong>¿Desea continuar?</strong>", "Mensaje", true, false, true, "Si", "", "No", 300, 150,
            function BtnSi() {
                $("#divVentanaMensajes").dialog("close");
                //adjuntando archivo
                if (adj != "") {
                   // setTimeout(function () { esperarUnSegundo(idActividad, adj) }, 5000);
                    var idInputFile = 'fuArchivosAdjuntos';
                    var parametros = {
                        'subirArchivo': 'subirArchivo',
                        'NoActividad': idactividad
                    };
                    $.ajaxFileUpload
                           ({
                               url: 'Proyectos.aspx',
                               fileElementId: idInputFile,
                               dataType: 'json',
                               data: parametros,
                               complete: function () {
                               },
                               success: function (data, status) {
                                   var re = data.toString().replace("<PRE>", "").replace("</PRE>", "").replace("<pre>", "").replace("</pre>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "").replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');
                                   if (re == "El archivo se ha cargado correctamente") {
                                       GuardaComentario(idactividad, adj);
                                   }
                                   else {
                                       avc = 'No se guardo el comentario con el Archivo';
                                   }
                                   reportarStatusDeSubidaAdjuntos2(data, obj, acv);
                               },
                               error: function (data) {
                                   var re = data.toString();
                               }
                           });

                }
                else {
                    GuardaComentario(idActividad, adj);
                }

            }, null, function BtnNo() { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtndvComentarios", false, false, ""); });
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtndvComentarios", false, false, "");
    });

}

var id = 0;

function GuardaComentario(idActividad,adj) {
    WaitingVtn("divBloqVtndvComentarios", true, true, "");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax("Proyectos.aspx/obtieneid", "POST", null, function (data) {
        if (adj != "") {
            id = parseInt(data.d.toString());
        }
        else {id = 0 }

        var parametros = { idActividad: parseInt(idActividad), Opcion: parseInt('1'), Comentario: $("#txtComenComentarioP").val(), idResponsable: LogUsuario, IdAdj: id };
        peticionAjax("Proyectos.aspx/grabarComentarios", "POST", parametros, function (data) {
            WaitingVtn("divBloqVtndvComentarios", false, false, "");
            //$("#dvComentarios").dialog("close");
            ObtenerComentarios(idActividad);
            $("#txtComenComentarioP").val("");
            data.d.toString() == 'true' ? CheckFiltro() : MostrarMsj("Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }, null);

    }, null);
}

function reportarStatusDeSubidaAdjuntos2(data, obj, adv) {
    data = data.toString().replace("<PRE>", "").replace("</PRE>", "").replace("<pre>", "").replace("</pre>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "").replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');

        MostrarMsj(data+" "+adv, "Mensaje", false, true, false, "", "Aceptar", "", 300, 150, null, function () {
            WaitingVtn("divBloqVtndvAdjuntos", false, false, "Subiendo Archivo");
            $("#divVentanaMensajes").dialog("close");
        }, null);


}