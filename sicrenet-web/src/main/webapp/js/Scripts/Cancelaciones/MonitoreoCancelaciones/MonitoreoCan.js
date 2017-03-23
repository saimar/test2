var PaisSelecXUser = "";
//Obtiene años
function ObtieneAniosTab() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    peticionAjax("MonitoreoCancelacion.aspx/obtieneAniosSeguimientoCan", "POST", { idPais: PaisSelecXUser }, function (data) {
        var cad = '';
        try {
            var arrayJSON = obtenerArregloDeJSON(data.d, false);
            for (var x = 0; x < arrayJSON.length; x++) {
                var json = arrayJSON[x];
                cad += '<option value="' + json.Column1 + '">';
                cad += json.Column1;
                cad += '</option>';
            }
        } catch (err) { }

        var Fecha = new Date();
        $('#slAnios').html(cad);
        $('#slAnios')[0].value = Fecha.getFullYear();
        if ($('#slAnios').val() == null)
            $('#slAnios').val(parseInt(Fecha.getFullYear()) - 1);
        ObtienePeriodosTab();
    }, null);
}

//Obtiene Periodos dependiendo del AÑo  
function ObtienePeriodosTab() {
    peticionAjax("MonitoreoCancelacion.aspx/obtienePeriodosSeguimientoCan", "POST", { Anio: $("#slAnios").val(), idPais: PaisSelecXUser }, function (data) {
        var cad = '';
        try {
            var arrayJSON = obtenerArregloDeJSON(data.d, false);
            for (var x = 0; x < arrayJSON.length; x++) {
                var json = arrayJSON[x];
                cad += '<option value="' + json.periodo + '">';
                cad += json.periodo;
                cad += '</option>';
            }
        } catch (err) { }

        var Fecha = new Date();
        $('#slPeriodo').html(cad);
        var mesSelect = (((Fecha.getMonth() + 1).toString().length < 2) ? "0" + (Fecha.getMonth() + 1).toString() : (Fecha.getMonth() + 1).toString());
        $('#slPeriodo')[0].value = Fecha.getFullYear().toString() + mesSelect;
        if ($('#slPeriodo')[0].value == "" && parseInt(mesSelect) == 1 && parseInt($('#slAnios').val()) < parseInt(Fecha.getFullYear()))
            $('#slPeriodo')[0].selectedIndex = 11;
        else if ($('#slPeriodo')[0].value == "") $('#slPeriodo')[0].selectedIndex = 0;
        ObtieneTabMonCan();
    }, null);
}

//Tabla con Encabezados Dinamicos
var JSONEtapasXPais;
function ObtieneTabMonCan() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("MonitoreoCancelacion.aspx/obtieneTabEncMonCan", "POST", { Periodo: $("#slPeriodo").val(), idPais: PaisSelecXUser }, function (data) {
        if (data.d != "" && data.d.indexOf("ERRORCATCH") == -1) {
            var cad = '';
            JSONEtapasXPais = obtenerArregloDeJSON(data.d, false);
            if (JSONEtapasXPais.Status != undefined) {
                return;
            }
            if (PaisSelecXUser != "1") {
                cad = generarTablaDeRegistrosMonCan(JSONEtapasXPais, PaisSelecXUser);
                $('#dvTableroMonCan').html(cad);
                ObtieneTabCuerpoMonCan($("#slPeriodo").val());
            }
            else
                ObtieneTabCuerpoMonCan($("#slPeriodo").val());
        }
        else {
            if (data.d.indexOf("ERRORCATCH") != -1)
                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            else
                $("#lblMensajeHerramienta").html("No Existen Periodos. Generé el Seguimiento de Cancelación en el Calendario de Trabajo");
            $('#dvTableroMonCan').html("");
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    }, null);
}

function generarTablaDeRegistrosMonCan(listaDeJSON, idPais) {
    var encabezadoAux = '';
    if (listaDeJSON.length > 0 && listaDeJSON[0] != null) {
        var cad = '<table id="tblContenidoMonCan_' + idPais + '"  style="width:100%" class="dataGridDatos">';
        cad += '<thead id="thEnc" >';
        cad += '<tr class="anchoRenglon" ' + (parseInt(idPais) == 1 || PaisSelecXUser != "1" ? '' : 'style="display:none;" ') + '>';
        cad += '<th id="th_0"></th>';
        var auxJSON = listaDeJSON[0];
        for (var filas = 0; filas < listaDeJSON.length; filas++) {
            var json = listaDeJSON[filas];
            for (var element in json) {
                if (element == 'FVCEtapa') {
                    cad += '<th id="th_' + json['idEtapa'] + '">';
                    cad += json[element];
                    cad += '</th>';
                }
            }
        }
        cad += '</tr>';
        cad += '</thead>';
        cad += '<tbody id="tbCuerpo">';
        cad += '</tbody>';
        cad += '</table>';
    } else {
        cad += 'No se pudo generar la información.';
    }
    // DesbloquearPantalla();
    return cad;
}

//Cuerpo de la Tabla
function ObtieneTabCuerpoMonCan(PeriodoA) {
    peticionAjax("MonitoreoCancelacion.aspx/obtieneTabCuerpoMonCan", "POST", { Periodo: PeriodoA, idPais: PaisSelecXUser }, function (data) {
        if (data.d == "Sin Datos" || data == null || data.d == null || data.d == "" || data.d.indexOf("ERRORCATCH") != -1) {
            if ($("#slPeriodo").val() == null)
                MostrarMsj("Seleccione un periodo de consulta", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            else {
                if (data.d.indexOf("ERRORCATCH") != -1)
                    MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                else
                    $("#lblMensajeHerramienta").html("No Existen Periodos. Generé el Seguimiento de Cancelación en el Calendario de Trabajo");
            }
        } else {
            $("#lblMensajeHerramienta").hide();
            document.getElementById("divMainG").style.visibility = "visible";
            var cad = '';
            var JSON = obtenerArregloDeJSON(data.d, false);
            if (JSON.Status != undefined)
                return;
            if (PaisSelecXUser != "1")
                ColocaCuerpoTabMonCan(JSON, PaisSelecXUser);
            else {
                var lstPaises = new Array();
                for (var i = 0; i < JSON.length; i++) {
                    if (!ExistePaisEnArreglo(JSON[i].FIPais, lstPaises))
                        lstPaises.push(JSON[i].FIPais);
                }

                var cadenaGral = "";
                var lstNumEtapasXPais = new Array();
                for (var i = 0; i < lstPaises.length; i++) {
                    var JSONEtapasXPaisTemp = new Array();
                    for (var ii = 0; ii < JSONEtapasXPais.length; ii++) {
                        if (JSONEtapasXPais[ii].idPais == lstPaises[i])
                            JSONEtapasXPaisTemp.push(JSONEtapasXPais[ii]);
                    }
                    numEtapasMAyor = JSONEtapasXPaisTemp.length > numEtapasMAyor ? JSONEtapasXPaisTemp.length : numEtapasMAyor;
                    lstNumEtapasXPais.push(JSONEtapasXPaisTemp.length);
                    cadenaGral += generarTablaDeRegistrosMonCan(JSONEtapasXPaisTemp, lstPaises[i]) + "<br />";
                }

                $('#dvTableroMonCan').html(cadenaGral);
                for (var i = 0; i < lstPaises.length; i++) {
                    var JSONEstatusEtapasXPaisTemp = new Array();
                    for (var ii = 0; ii < JSON.length; ii++) {
                        if (JSON[ii].FIPais == lstPaises[i])
                            JSONEstatusEtapasXPaisTemp.push(JSON[ii]);
                    }
                    ColocaCuerpoTabMonCan(JSONEstatusEtapasXPaisTemp, lstPaises[i], lstNumEtapasXPais[i]);
                }
            }
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

var numEtapasMAyor = 0;
function ExistePaisEnArreglo(elemento, arregloIterar) {
    var existe = false;
    for (var i = 0; i < arregloIterar.length; i++) {
        if (arregloIterar[i] == elemento) {
            existe = true;
            break;
        }
    }
    return existe;
}

function ColocaCuerpoTabMonCan(listaDeJSON, idPais, numeroEtapas) {
    var cad = '';
    var PaisId;
    var ColorEstatus = '';
    if (listaDeJSON.length > 0 && listaDeJSON[0] != null) {
        for (var filas = 0; filas < listaDeJSON.length; filas++) {
            var json = listaDeJSON[filas];
            ColorEstatus = ColocaColorEstatusTbMonCan(json['FIValor']);
            if (filas == 0) {
                PaisId = json['FIPais'];
                cad += '<tr class="anchoRenglon">';
                cad += '<td id="tdP_' + PaisId + '" style="width:2%">' + ColocaBandera(PaisId) + '</td>';
            }
            if (PaisId == json['FIPais'])
                cad += '<td id="tdE_' + json['FIValor'] + '" onclick="MonyFlujo(' + json['FIPais'] + ', ' + json['FiEtapa'] + ')" ' + (filas < numeroEtapas || numeroEtapas == undefined ? 'class="' + ColorEstatus + '" ' : '') + ' style="width:10%"></td>';
            else {
                PaisId = json['FIPais'];
                cad += '</tr>';
                cad += '<tr class="anchoRenglon">';
                cad += '<td id="tdP_' + PaisId + '">' + ColocaBandera(PaisId) + '</td>';
                cad += '<td id="tdE_' + json['FIValor'] + '" onclick="MonyFlujo(' + json['FIPais'] + ', ' + json['FiEtapa'] + ')" ' + (filas < numeroEtapas ? 'class="' + ColorEstatus + '" ' : '') + ' style="width:10%"></td>';
            }
            if (numeroEtapas < numEtapasMAyor && listaDeJSON.length == numeroEtapas && filas == listaDeJSON.length - 1)
                cad += '<td style="width:10%"></td>';
            filas == listaDeJSON.length - 1 ? cad += '</tr>' : null;
        }

        $('#tblContenidoMonCan_' + idPais + ' > tbody').html(cad);
        //setTimeout(ObtieneTabMonCan, 10000);
    }
}

//Colocar Bandera del Pais
function ColocaBandera(idPais) {
    var rutaBandera = '';
    switch (parseInt(idPais)) {
        case 1:
            rutaBandera = '<img  title="México" src="../../Images/PanelDeControl/BanderasRect/mexico.gif" />';
            break;
        case 6:
            rutaBandera = '<img  title="Peru" src="../../Images/PanelDeControl/BanderasRect/peru.gif" />';
            break;
        case 7:
            rutaBandera = '<img  title="Panama" src="../../Images/PanelDeControl/BanderasRect/panama.gif" />';
            break
        case 11:
            rutaBandera = '<img  title="Brasil" src="../../Images/PanelDeControl/BanderasRect/brasil.gif" />';
            break
        case 8:
            rutaBandera = '<img  title="El Salvador" src="../../Images/PanelDeControl/BanderasRect/elsalvador.gif" />';
            break;
        case 2:
            rutaBandera = '<img  title="Guatemala" src="../../Images/PanelDeControl/BanderasRect/guatemala.gif" />';
            break;
        case 4:
            rutaBandera = '<img  title="Honduras" src="../../Images/PanelDeControl/BanderasRect/honduras.gif" />';
            break;
    }
    return rutaBandera;
}

//Coloca el estilo a cada Etapa 
function ColocaColorEstatusTbMonCan(idEstatus) {
    var ColorE = '';
    switch (parseInt(idEstatus)) {
        case 1:
            ColorE = 'EstatusGris';
            break;
        case 4:
            ColorE = 'EstatusAmarillo';
            break;
        case 3:
            ColorE = 'EstatusRojo';
            break;
        case 5:
            ColorE = 'EstatusVerde';
            break;
        case 8:
            ColorE = 'EstatusBlanco';
            break;
    }
    return ColorE;
}

//Obtenemos Tabla Monitoreo - Flujo de acuerdo al Pais y Etapa
function MonyFlujo(Pais, Etapa) {
    //alert(Pais);
    //alert(Etapa);
    peticionAjax("MonitoreoCancelacion.aspx/obtieneTabyFlujoMonCan", "POST", { Periodo: $("#slPeriodo").val(), FiPais: Pais, FiEtapa: Etapa }, function (data) {
        var cad = '';
        var JSON = obtenerArregloDeJSON(data.d, false);
        if (JSON.Status != undefined) {
            return;
        }
        cad = generarTablaMonyFlujo(JSON, Pais);
        $("#dvMonitoreoyFlujo").empty();
        AgregarVtnFlotante("dvMonitoreoyFlujo", "", "Flujo de Cancelaciónes por Etapas", "", cad, "auto", "auto", false, false, "", "", null); //overflow-y: scroll
    }, null);
}

function generarTablaMonyFlujo(listaDeJSON, Pais) {
    var NombreArch = '';
    var cad = '';
    if (listaDeJSON.length > 0 && listaDeJSON[0] != null) {
        cad += '<center><table class="dataGridDatos">';
        cad += '<thead>';
        cad += '<tr>';

        var auxJSON = listaDeJSON[0];

        for (var encabezados in auxJSON) {
            if (encabezados.toString() != '' && encabezados.toString() != 'IdEtapa' && encabezados.toString() != 'IdActividad' && encabezados.toString() != 'IdAreaResp' && encabezados.toString() != 'Declinacion') {
                cad += '<th>';
                cad += encabezados.toString();
                cad += '</th>';
            }
        }
        cad += '<th>Comentarios</th>';

        cad += '</tr>';
        cad += '</thead>';

        cad += '<tbody>';
        for (var filas = 0; filas < listaDeJSON.length; filas++) {
            cad += '<tr class="rowAlt">';
            var json = listaDeJSON[filas];
            for (var element in json) {
                if (element != 'IdEtapa' && element != 'IdActividad' && element != 'IdAreaResp' && element != 'Declinacion') {

                    var fechaHoy = new Date();
                    var month = fechaHoy.getMonth() + 1;
                    var fechaH = new Date(fechaHoy.getFullYear(), month, fechaHoy.getDate());
                    var fechaR = json['Fecha Real'].split("/");
                    var objR = new Date(fechaR[2], fechaR[1], fechaR[0]);
                    var fechaL = json['Fecha Limite'].split("/");
                    var objL = new Date(fechaL[2], fechaL[1], fechaL[0]);

                    cad += '<td>';
                    if (element != 'Area Responsable') {
                        if (element == 'Estatus') {
                            if (fechaH > objL && objR.toString() == 'Invalid Date') { cad += '<img src="../../Images/Portafolio/Proyectos/punto-rojo2.png" />'; }
                            else {
                                if (json['Estatus'] == 0 && json['Declinacion'] == 0 && objR.toString() == 'Invalid Date') { cad += '<img src="../../Images/Portafolio/Proyectos/punto-amarillo2.png" />'; }
                                //------------------------------------------------------------------------------------------------------------------------------------
                                if (json['Estatus'] == 1 && json['Declinacion'] == 0 && (objR <= objL)) { cad += '<img src="../../Images/Portafolio/Proyectos/punto-verde2.png" />'; }
                                if (json['Estatus'] == 1 && json['Declinacion'] == 0 && (objR > objL)) { cad += '<img src="../../Images/Portafolio/Proyectos/punto-rojo2.png" />'; }
                                //------------------------------------------------------------------------------------------------------------------------------------
                                if (json['Estatus'] == 1 && json['Declinacion'] == 2 && (objR <= objL)) { cad += '<img src="../../Images/Portafolio/Proyectos/punto-verde2.png" />'; }
                                if (json['Estatus'] == 1 && json['Declinacion'] == 2 && (objR > objL)) { cad += '<img src="../../Images/Portafolio/Proyectos/punto-rojo2.png" />'; }
                                //-------------------------------------------------------------------------------------------------------------------------------------
                                if (json['Estatus'] == 0 && json['Declinacion'] == 1 && (objR <= objL)) { cad += '<img src="../../Images/Portafolio/Proyectos/punto-rojo2.png" />'; }
                                if (json['Estatus'] == 0 && json['Declinacion'] == 1 && (objR > objL)) { cad += '<img src="../../Images/Portafolio/Proyectos/punto-rojo2.png" />'; }
                            }
                        } else {
                            cad += json[element];
                        }
                    } else {
                        if (json['Estatus'] == 1) {
                            cad += json[element];
                        } else {
                            cad += '<a id="aBorra" style="text-decoration: underline; color:Blue" Title="Enviar Correo de Retraso de Actividad" onclick="EnviaCorreoElectronico(this, ' + Pais + ',' + json['IdEtapa'] + ',' + json['IdAreaResp'] + ',' + json['IdActividad'] + ');">';
                            cad += json[element];
                            cad += '</a>';
                        }
                    }
                    cad += '</td>';
                }
            }

            //Comentario
            cad += '<td>';
            if (json['Estatus'] == 1 && json['Declinacion'] == 0 && (objR <= objL)) { cad += 'Concluida en Tiempo.'; }
            if (json['Estatus'] == 1 && json['Declinacion'] == 0 && (objR > objL)) { cad += 'Concluida Despues De Fecha Limite.'; }
            //------------------------------------------------------------------------------------------------------------------------------------
            if (json['Estatus'] == 1 && json['Declinacion'] == 2 && (objR <= objL)) { cad += 'Concluida en Tiempo (Corregida).'; }
            if (json['Estatus'] == 1 && json['Declinacion'] == 2 && (objR > objL)) { cad += 'Concluida Despues De Fecha Limite (Corregida).'; }
            //-------------------------------------------------------------------------------------------------------------------------------------
            if (json['Estatus'] == 0 && json['Declinacion'] == 1 && (objR <= objL)) { cad += 'Concluida en Tiempo (Declinada).'; }
            if (json['Estatus'] == 0 && json['Declinacion'] == 1 && (objR > objL)) { cad += 'Concluida Despues De Fecha Limite (Declinada).'; }
            cad += '</td>';
            cad += '</tr>';
        }
        cad += '</tbody>';
        cad += '</table></center>';
    }
    return cad;
}

//CorreoElectronico
function EnviaCorreoElectronico(obj, pais, etapa, area, actividad) {
    MostrarMsj("¿Esta seguro que desea Enviar el Correo Electronico ? ", "Mensaje", true, true, false, "Si", "No", "", 300, 135,
        function () {
            $("#divVentanaMensajes").dialog("close");
            BorrarReporte();
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);

    var Renglon = obj.parentNode.parentNode.childNodes;
    var Title = 'Actividades en Atraso';
    var Cuerpo = '';

    var fechaR = Renglon[5].outerText.split("/");
    var objR = new Date(fechaR[2], fechaR[1], fechaR[0]);
    var objA = new Date();

    Cuerpo += '<html><body>';
    Cuerpo += '<div style="width:75%; font-family:Verdana; font-size:8pt; text-align:center">';
    Cuerpo += '<table style="width:85%; font-style:normal; font-size:8pt; background-color:#FFFFFF" border="2" rules="groups" frame="hsides">';
    Cuerpo += '<CAPTION style="text-transform:none"><b>Tiene una actividad pendiente a realizar, favor de actualizar su estatus en el sistema SICRENET.</b></CAPTION>';
    Cuerpo += '<thead style="background-color:#009999; color:white"><tr><th>Etapa</th><th>Actividad</th><th>Area Responsable</th><th>Fecha Limite</th></tr></thead>';
    Cuerpo += '<tr><td style="text-align:center">' + Renglon[0].outerText + '</td><td style="text-align:center">' + Renglon[1].outerText + '</td><td style="text-align:center">' + Renglon[2].outerText + '</td><td style="text-align:center">' + Renglon[3].outerText + '</td></tr>';
    Cuerpo += '</table></div></body></html>';

    peticionAjax("MonitoreoCancelacion.aspx/CorreoFlujo", "POST", { periodo: $("#slPeriodo").val(), Pais: pais, Etapa: etapa, Area: area, Actividad: actividad, Titulo: Title, Cuerpo: Cuerpo }, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        MostrarMsj(JSON[0].Mensaje, "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
    });
}
