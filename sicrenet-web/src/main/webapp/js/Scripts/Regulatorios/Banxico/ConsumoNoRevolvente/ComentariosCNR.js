function editComentario(dato) {
    event.cancelBubble = true;
    var cadena = '<div id="divBloqVtndvComentarios" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvComentarios" style="width:100%;height:100%;margin-top: 0px;">  ';
    cadena += ' <table width="100%" ><tr><td><table width="100%"><tr><td><img src="../../Images/Grales/commentAdd.png" alt="Comentario" width="30px" height="30px" /></td>';
    cadena += '<td style=" font-size:10px;font-weight:bold; vertical-align:middle;" align="left">Ingrese el comentario :</td></tr></table></td></tr><tr><td ><textarea cols="30" rows="2" id="txtComenComentarioP" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:100%; text-align:left; border: x;height:150px" ></textarea></td></tr>';
    cadena += '<tr><td style="text-align: right;"><input type="button" id="tblGuardar" onclick="GuardarComentario(\'' + dato + '\',\'1\',\'\');" value="Guardar" class="classButton"/></td></tr>';
    cadena += '<tr><td class="tdEnabled" style="text-align:left;cursor:pointer"><br /><div id="divHistorial" style="width:100%;text-align:left;margin-top: -20px;"></div></td></tr></table>';
    cadena += '</div></div>';
    $("#dvComentarios").empty();
    AgregarVtnFlotante("dvComentarios", "", "COMENTARIOS", "", cadena, 300, 650, false, false, "", "", null);
    ObtenerComentarios(dato);
}

function ObtenerComentarios(idFormulario) {
    var parametros = { idFormulario: parseInt(idFormulario), fechaCorte: fechaConsulta.split('/')[2] + "-" + fechaConsulta.split('/')[1] + "-" + fechaConsulta.split('/')[0], Comentario: "", tipoComentario: 1, Opcion: 2 };
    peticionAjax("ConsumoNoRevolvente.aspx/controlComentariosAcuseCNR", "POST", parametros, ObtieneDataComentario, ObtieneDataComentario);
}

function ObtieneDataComentario(data) {
    if (data.d.indexOf("ERRORCATCH") == -1) {
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
            cadena = "<a style='font: normal 10px Helvetica, Arial, sans-serif;cursor: pointer;'><img src='../../Images/PanelDeControl/Expander/insert.jpg' id='insert2' style ='margin-bottom:-5px' onclick=\"toggleSlide('div2',this.id,'vtnH','dvComentarios',2);\" alt='expander' /></a> <span id='insert2' style='font: normal 10px Helvetica, Arial, sans-serif;cursor: pointer;' onclick=\"toggleSlide('div2',this.id,'vtnH','dvComentarios',2); \">Historial </span><div style='height:77px;overflow: auto;'> <div id='div2' style=display:none;'>";
            cadena += generarTablaDeRegistrosSinFoot(JSON, "left");
            cadena += "</div></div>";
            $('#divHistorial').html(cadena);
        }
        else $("#dvComentarios").animate({ height: "250px" });
    }
    else
        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
}

function GuardarComentario(idFormulario, tipoComentario, producto) {
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
    MostrarMsj("¿Desea continuar? ", "Mensaje", true, false, true, "Si", "", "No", 280, 120,
            function BtnSi() {
                $("#divVentanaMensajes").dialog("close");
                GuardaComentarioPaso2(idFormulario, tipoComentario, producto);
            }, null, function BtnNo() { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtndvComentarios", false, false, ""); });
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtndvComentarios", false, false, "");
    });
}

function GuardaComentarioPaso2(idFormulario, tipoComentario, producto) {
    WaitingVtn("divBloqVtndvComentarios", true, true, "");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var parametros = { idFormulario: parseInt(idFormulario), fechaCorte: fechaConsulta.split('/')[2] + "-" + fechaConsulta.split('/')[1] + "-" + fechaConsulta.split('/')[0], Comentario: $("#txtComenComentarioP").val(), tipoComentario: tipoComentario, Opcion: 1 };
    peticionAjax("ConsumoNoRevolvente.aspx/controlComentariosAcuseCNR", "POST", parametros, function (data) {
        WaitingVtn("divBloqVtndvComentarios", false, false, "");
        $("#dvComentarios").dialog("close");
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (tipoComentario == "1")
                MostrarMsj("Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            else
                reactivarPaquetePaso2(idFormulario, producto);
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    }, null);
}


//--------------------------------- COMENTARIOS REACTIVAR PAQUETE

function comentarioReactivarPaquete(idFormulario, producto) {
    $("#divVentanaMensajes").dialog("close");
    var cadena = '<div id="divBloqVtndvComentarios" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvComentarios" style="width:100%;height:100%;margin-top: 0px;">  ';
    cadena += ' <table width="100%" ><tr><td><table width="100%"><tr><td><img src="../../Images/Grales/commentAdd.png" alt="Comentario" width="30px" height="30px" /></td>';
    cadena += '<td style=" font-size:10px; vertical-align:middle;" align="left">Ingrese la razón por la cual se reactiva el Paquete <span style="font-weight:bold;">' + $("#spDescFormulario_" + idFormulario).html().toUpperCase() + '</span>:</td></tr></table></td></tr><tr><td ><textarea cols="30" rows="2" id="txtComenComentarioP" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:100%; text-align:left; border: x;height:150px" ></textarea></td></tr>';
    cadena += '<tr><td style="text-align: right;"><input type="button" id="tblGuardar" onclick="GuardarComentario(\'' + idFormulario + '\',\'2\',\'' + producto + '\');" value="Finalizar Reactivación" class="classButton"/></td></tr>';
    cadena += '</table>';
    cadena += '</div></div>';
    $("#dvComentarios").empty();
    AgregarVtnFlotante("dvComentarios", "", "COMENTARIO REACTIVACIÓN PAQUETE (" + $("#spDescFormulario_" + idFormulario).html().toUpperCase() + ")", "", cadena, 300, 650, false, false, "", "", null);
}