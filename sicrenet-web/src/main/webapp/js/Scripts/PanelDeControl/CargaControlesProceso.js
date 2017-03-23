
var userLogin = "";
function CargaControlesProceso(arregloIterar) {
     for (var i = 0; i < arregloIterar.length; i++) {
        var numRepF4 = 0; var numRepF5 = 0; var numRepF6 = 0;
        var entroCiclo = false;
        var IdMet; var agregarReprocesoF4 = false; agregarReprocesoF5 = false; agregarReprocesoF6 = false; vecesEntro = 0; var EstatusBloqueo;
        for (var u = 0; u < ArrayMetodologiaEstatus.length; u++) {
            if (ArrayMetodologiaEstatus[u].split("&&")[0] == arregloIterar[i].split('||')[0].split('$$$')[1])
                EstatusBloqueo = ArrayMetodologiaEstatus[u].split("&&")[5];
            if (ArrayMetodologiaEstatus[u].split("&&")[0] == arregloIterar[i].split('||')[0].split('$$$')[1] && ArrayMetodologiaEstatus[u].split("&&")[1] != "0") {
                IdMet = ArrayMetodologiaEstatus[u].split("&&")[4];
                if (ArrayMetodologiaEstatus[u].split("&&")[1] == "4") { numRepF4 = ArrayMetodologiaEstatus[u].split("&&")[3]; agregarReprocesoF4 = true; }
                if (ArrayMetodologiaEstatus[u].split("&&")[1] == "5") { numRepF5 = ArrayMetodologiaEstatus[u].split("&&")[3]; agregarReprocesoF5 = true; }
                if (ArrayMetodologiaEstatus[u].split("&&")[1] == "6") { numRepF6 = ArrayMetodologiaEstatus[u].split("&&")[3]; agregarReprocesoF6 = true; }
                vecesEntro++;
                entroCiclo = true;
            }
            else if (ArrayMetodologiaEstatus[u].split("&&")[0] == arregloIterar[i].split('||')[0].split('$$$')[1] && ArrayMetodologiaEstatus[u].split("&&")[1] == "0") { entroCiclo = true; break; }
            else if (entroCiclo) break;
        }
        var clasificacion = "";
        for (var c = 0; c < DefinicionesMetodologia.length; c++) {
             if (arregloIterar[i].split('||')[0].split('$$$')[1].split("%%%")[0] + '-' + arregloIterar[i].split('||')[0].split('$$$')[1].split("%%%")[1] == DefinicionesMetodologia[c].split("%%%")[0] + '-' + DefinicionesMetodologia[c].split("%%%")[1].split('&&')[0]) {
                clasificacion = DefinicionesMetodologia[c].split("&&")[1];
                break;
            }
        }
        var indiceTdAgregar = "";
        for (var a = 0; a < arregloIterar[i].split("||")[0].length; a++) {
            if (arregloIterar[i].split("||")[0][a] != "T" && arregloIterar[i].split("||")[0][a] != "d")
                indiceTdAgregar += arregloIterar[i].split("||")[0][a];
            else
                break;
        }
        for (var ii = 1; ii < 9; ii++) {
            if (ii > 3 && ii < 7) {
                var tdObteneido = (parseInt(indiceTdAgregar) + 1) + "Td" + ii;
                escargaNew = true;
                DeterminaControlesAgregadosAProceso(tdObteneido, IndicePestaniaHabilitadaO == ii ? 0 : 1, ii == 4 ? numRepF4 : (ii == 5 ? numRepF5 : numRepF6), arregloIterar[i].split("||")[1], arregloIterar[i].split('||')[0].split('$$$')[1].split("%%%")[1], indiceTdAgregar + "Td" + ii, arregloIterar[i].split('||')[0].split('$$$')[1], ii == 4 ? agregarReprocesoF4 : (ii == 5 ? agregarReprocesoF5 : agregarReprocesoF6), EstatusBloqueo, clasificacion);
            }

        }

    }
}

function DeterminaControlesAgregadosAProceso(TdACargaCtrls, indiceOpcion, reprocesos, itemArregloFuenteCartForListBox, IdMet, TdProgressB, DefMetodologia, agregarBtnReproceso, EstatusBloqueo, clasificacion) {
    if (indiceOpcion == 0) AgregaControlesProceso_Expandido(IndicePestaniaHabilitadaO, reprocesos, TdACargaCtrls, itemArregloFuenteCartForListBox, IdMet, TdProgressB, DefMetodologia, agregarBtnReproceso, EstatusBloqueo, clasificacion)
    else AgregaControlesProceso_Collapsado(IndicePestaniaHabilitadaO, reprocesos, TdACargaCtrls, IdMet);
}


function AgregaControlesProceso_Collapsado(indicePestania, numeroBotonesRep, TdACargaCtrls, IdMet) {
    if (document.getElementById("divContenedor_" + TdACargaCtrls) == null) {
        var cadena = "<div id='divContenedor_" + TdACargaCtrls + "' lang='aa' style='width:100%;height:100%'></div>";
        $("#" + TdACargaCtrls).html(cadena);
    }

    if ($("#TablaContenidoCollapsed_" + TdACargaCtrls).html() == null) {
        var cadena = "<table id='TablaContenidoCollapsed_" + TdACargaCtrls + "' style=''>";
        cadena += "<tr><td><div class='BtnReproceso'><div class='TxtBtnReproceso'>" + numeroBotonesRep + "</div> </div></td></tr>";
        cadena += "</table>";
        $("#divContenedor_" + TdACargaCtrls).append(cadena);
    }
    else {
        var cadena = "<tr><td><div class='BtnReproceso'><div class='TxtBtnReproceso'>" + numeroBotonesRep + "</div> </div></td></tr>";
        $("#TablaContenidoCollapsed_" + TdACargaCtrls).html(cadena);
    }

    $("#TablaContenidoCollapsed_" + TdACargaCtrls).show();
    $("#TablaContenidoExpanded_" + TdACargaCtrls).hide();

}

var arregloIdsImgsOmitirCalf; var arregloIdsImgsOmitirValidF5; var arregloIdsImgsOmitirValidF6; var arregloIdsInicioAutomatico;
function AgregaControlesProceso_Expandido(indicePestania, numeroBotonesRep, TdACargaCtrls, itemArregloFuenteCartForListBox, IdMet, TdProgressB, DefMetodologia, agregarBtnReproceso, estatusBloqueo, clasificacion) {
    if (document.getElementById("divContenedor_" + TdACargaCtrls) == null) {
        var cadena = "<div id='divContenedor_" + TdACargaCtrls + "' lang='aa' style='width:100%;height:100%'></div>";
        $("#" + TdACargaCtrls).html(cadena);
    }
    if ($("#TablaContenidoExpanded_" + TdACargaCtrls).html() == null) {
        var cadena = "<table id='TablaContenidoExpanded_" + TdACargaCtrls + "' style='display: none;width:100%;height:100%;'><tr id='trMiniAcordeon' style='width:100%;height:100%;'>";
        if (clasificacion != "PRECEDENTES" || DefMetodologia.split("%%%")[1] == "10" || (DefMetodologia.split("%%%")[1] == "17" || (DefMetodologia.split("%%%")[1] == "18" && periocidadSelectXUser == "1"))) {
            cadena += "<td id='TdEncabezado_" + TdACargaCtrls + "_1' lang='aa' style='width:5%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitadaO >= 0 && IndicePestaniaHabilitadaO <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitadaO >= 4 && IndicePestaniaHabilitadaO <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'> <p class='p' style='margin-top: 28px;font-size: 9px;margin-left: 14px;'> " + (IndicePestaniaHabilitadaO == 4 ? "CTRL PROCESO" : (IndicePestaniaHabilitadaO == 7 ? "CTRL REPORTES" : "DETALLE")) + "</p></td><td id='TdContenido_" + TdACargaCtrls + "_1' class='Gris_Gde' style='width:90%;height:100%;'>";
            cadena += "<table  style='width:100%;' width='0' border='0'><tr><td><table width='0' border='0' id='TablaBotonesExpanded_" + TdACargaCtrls + "' >";
            if (clasificacion != "PRECEDENTES") {
                cadena += "<tr><td><div style='width:350px;height:auto; overflow:auto;'><table width='0' border='0' id='TablaBotonesReprocesoExpanded_" + TdACargaCtrls + "' ><tr>";
                for (var i = numeroBotonesRep; i >= 0; i--) {
                    if (agregarBtnReproceso) cadena += "<td > <div class='BtnReproceso' id='btn_" + TdACargaCtrls + "_" + IdMet + "_" + DefMetodologia + "_" + i + "' onclick='HistorialReprocesosProcesoCalf_Click(this);'><div class='TxtBtnReproceso'>" + i + "</div> </div></td>";
                }
                cadena += "</tr></table></div></td></tr>";

                if (clasificacion != "POSTERIORES" && PerfilUser != "35" && PerfilUser != "17") {
                    var statusCkeck = "";
                    for (var i = 0; i < DefinicionesMetodologiaTemp.length; i++) {
                        if (parseInt(IdMet) == DefinicionesMetodologiaTemp.length) {
                            AsignaEstatusCheckPadresOmitir(IndicePestaniaHabilitadaO, DefinicionesMetodologiaTemp);
                        }
                        if (IdMet == DefinicionesMetodologiaTemp[i].split("&&")[0].split("%%%")[1]) {
                            statusCkeck = IndicePestaniaHabilitadaO == 4 ? DefinicionesMetodologiaTemp[i].split("&&")[2] : (IndicePestaniaHabilitadaO == 5 ? DefinicionesMetodologiaTemp[i].split("&&")[3] : (DefinicionesMetodologiaTemp[i].split("&&")[4] + "," + DefinicionesMetodologiaTemp[i].split("&&")[5]));
                        }
                    }
                    var srcImgs = "../../Images/PanelDeControl/Expander/" + (statusCkeck.split(",")[0] == "0" ? "uncheck" : "checkG") + ".png";
                    var idPadreImg = IndicePestaniaHabilitadaO == 4 ? "Calf" : (IndicePestaniaHabilitadaO == 5 ? "Val1" : "Val2");
                    if (IndicePestaniaHabilitadaO == 4) {
                        cadena += "<tr>";
                        arregloIdsImgsOmitirCalf.push("imgchkOmitir" + idPadreImg + "_" + TdACargaCtrls + "_" + IdMet);
                    }
                    if (IndicePestaniaHabilitadaO == 5) arregloIdsImgsOmitirValidF5.push("imgchkOmitir" + idPadreImg + "_" + TdACargaCtrls + "_" + IdMet);

                    //if (DefMetodologia.indexOf("CLIENTES") == 0) {
                    //    cadena += '<td style="width: 30%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;" align="left"> <div style="display:block;") "></td>';
                    //}
                    //else {
                    cadena += '<td style="width: 30%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;" align="left"> <div style="' + (IndicePestaniaHabilitadaO == 4 ? "display:block;" : "display:none;") + '">  <img  src="' + srcImgs + '" id="imgchkOmitir' + idPadreImg + "_" + (TdACargaCtrls) + "_" + IdMet + '" alt="aa" lang="' + (statusCkeck.split(",")[0] == "0" ? "aa" : "ab") + '" onclick="imgChech_ckeck(this)" style="width: 12px; height: 12px;cursor:pointer;" />OMITIR ' + (IndicePestaniaHabilitadaO == 4 ? 'CALIFICACIÓN' : 'VALIDACIÓN') + "</div>" + (IndicePestaniaHabilitadaO == 6 ? '' : '</td>');
                    //}

                    if (IndicePestaniaHabilitadaO == 6) {
                        arregloIdsImgsOmitirValidF6.push("imgchkOmitir" + idPadreImg + "_" + TdACargaCtrls + "_" + IdMet);
                        srcImgs = "../../Images/PanelDeControl/Expander/" + (statusCkeck.split(",")[1] == "0" ? "uncheck" : "checkG") + ".png";
                        cadena += '&nbsp&nbsp&nbsp&nbsp&nbsp <img  src="' + srcImgs + '" id="imgchkOmitirVal3_' + TdACargaCtrls + "_" + IdMet + '" alt="aa" lang="' + (statusCkeck.split(",")[1] == "0" ? "aa" : "ab") + '" onclick="imgChech_ckeck(this)" style="width: 12px; height: 12px;cursor:pointer;" />INICIO AUTOMÁTICO</td>';
                        arregloIdsInicioAutomatico.push("imgchkOmitirVal3_" + TdACargaCtrls + "_" + IdMet);
                    }
                    cadena += "</tr>";
                }
            }

            if (DefMetodologia.indexOf("CLIENTES") == 0) {

                cadena += IndicePestaniaHabilitadaO == 4 && clasificacion != "POSTERIORES" ? "<tr><td style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;' align='left'><input type='button' id='" + IdMet + "_" + TdProgressB + "_" + DefMetodologia + "' class='classButton'  onclick='btnMostrar_Ficha_Click(this);'  value='Consulta Base IPAB'/></td>" : "";
            }
            else {
                console.log("clasificacion2:" + clasificacion + "-IndicePestaniaHabilitadaO:" + IndicePestaniaHabilitadaO + "-IdMet:" + IdMet + "-periocidadSelectXUser")
                cadena += IndicePestaniaHabilitadaO == 4 && clasificacion != "POSTERIORES"
                    ? "<tr><td style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;' align='left'><input type='button' id='" + IdMet + "_" + TdProgressB + "_" + DefMetodologia + "' " + (PerfilUser == "35" || PerfilUser == "17"
                                                                                                                                                                                                                                ? "class='classButtonDis' disabled='disabled'"
                                                                                                                                                                                                                                : "class='classButton'") + " onclick='ProcesarCalificacion_Click(this)'  value='" + (DefMetodologia.split("%%%")[1] == "10"
                                                                                                                                                                                                                                                                                                                     ? "Ver Agrupador" : (DefMetodologia.split("%%%")[1] == "17"
                                                                                                                                                                                                                                                                                                                                            ? "Ver INPC"
                                                                                                                                                                                                                                                                                                                                            : (DefMetodologia.split("%%%")[1] == "18"
                                                                                                                                                                                                                                                                                                                                                ? "Cargar Base Hom SIC"
                                                                                                                                                                                                                                                                                                                                                : "Iniciar Proceso Calificación"))) + "'/></td>"
                   : "";
            }

            cadena += IndicePestaniaHabilitadaO == 4 && clasificacion == "POSTERIORES"
                ? "<tr><td style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;' align='left'><input type='button' id='" + IdMet + "_" + TdProgressB + "_" + DefMetodologia + "' " + (PerfilUser == "35" || PerfilUser == "17"
                                                                                                                                                                                                                                ? "class='classButtonDis' disabled='disabled'"
                                                                                                                                                                                                                                : "class='classButton'") + " onclick='ProcesarPosteriores_Click(this)'  value='Procesar " + DefMetodologia.split("%%%")[0].toLowerCase() + "'/></td>"
            : "";

            // cadena += ((IndicePestaniaHabilitadaO == 5 || IndicePestaniaHabilitadaO == 6) && clasificacion != "PRECEDENTES") && clasificacion != "POSTERIORES"
            if (((IndicePestaniaHabilitadaO == 5 || IndicePestaniaHabilitadaO == 6) && clasificacion != "PRECEDENTES") && (IdMet == "19")) {
                cadena += "</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + "<td  align='left'>" +
            "<input type='button' alt='" + IndicePestaniaHabilitadaO + "' id='btnVerIncidencias_" + IdMet + "_" + TdProgressB + "_" + DefMetodologia + "' " + ((PerfilUser == "35" || PerfilUser == "17") && IdMet != 1 ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='verIncidencias(this);'  value='Ver Incidencias'/></td>";
            } else if (((IndicePestaniaHabilitadaO == 5 || IndicePestaniaHabilitadaO == 6) && clasificacion != "PRECEDENTES") && (IdMet != "23")) {
                cadena += "</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + "<td  align='left'>" +
            "<input type='button' alt='" + IndicePestaniaHabilitadaO + "' id='btnVerValidacionesMet_" + IdMet + "_" + TdACargaCtrls + "_" + DefMetodologia + "' " + ((PerfilUser == "35" || PerfilUser == "17") && IdMet != 1 ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='btnVerValidacionesMet_Click(this)'  value='Catálogo de validaciones'/> <span> &nbsp &nbsp<span>" +
            "<input type='button' alt='" + IndicePestaniaHabilitadaO + "' id='btnEjecutarValidacionesMet_" + IdMet + "_" + TdProgressB + "_" + DefMetodologia + "' " + ((PerfilUser == "35" || PerfilUser == "17") && IdMet != 1 ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='btnEjecutarValidacionesMet_Click(this)'  value='Ejecutar Validaciones'/><span> &nbsp &nbsp</span>" +
            (IdMet == "1" ? (" <div class='divDetalleCargaMasiva' style='display:" + (mostrarBtnDetalleCargaMasiva ? "inline;" : "none;") + "'><input type='button' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Detalle Validaciones Masiva' onclick='VerDetalleCargaMasiva()' ></div><span> &nbsp &nbsp</span> ") : " ") +
            "<input type='button' alt='" + IndicePestaniaHabilitadaO + "' id='btnVerIncidencias_" + IdMet + "_" + TdProgressB + "_" + DefMetodologia + "' " + ((PerfilUser == "35" || PerfilUser == "17") && IdMet != 1 ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='verIncidencias(this);'  value='Ver Incidencias'/></td>";
            }
            else
                cadena += "</tr></table></td></tr></table></td>";

            
        }
        if (IndicePestaniaHabilitadaO == 4) cadena += "<td id='TdEncabezado_" + TdACargaCtrls + (clasificacion != "PRECEDENTES" || DefMetodologia.split("%%%")[1] == "10" ||  DefMetodologia.split("%%%")[1] == "17" || (DefMetodologia.split("%%%")[1] == "18" && periocidadSelectXUser == "1") ? "_2' lang='ab'" : "_1' lang='aa'") + " style='width:3%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitadaO >= 0 && IndicePestaniaHabilitadaO <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitadaO >= 4 && IndicePestaniaHabilitadaO <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'><p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'>" + (IndicePestaniaHabilitadaO == 4 ? "CÉDULA PROCESO" : (IndicePestaniaHabilitadaO == 7 ? "CÉDULA REPORTES" : "DETALLE")) + "</p></td><td id='TdContenido_" + TdACargaCtrls + (clasificacion != "PRECEDENTES" || DefMetodologia.split("%%%")[1] == "10" || DefMetodologia.split("%%%")[1] == "17" || (DefMetodologia.split("%%%")[1] == "18" && periocidadSelectXUser == "1") ? "_2'" : "_1'") +
         "  class='Gris_Gde' style='width:0%;height:100%;'><input type='button' id='btnCedula_" + IdMet + "_" + TdProgressB + "_" + DefMetodologia + "' class='classButton' value='" + (IndicePestaniaHabilitadaO == 4 ? "Cédula Proceso" : (IndicePestaniaHabilitadaO == 7 ? "Cédula Reportes" : "Cédula")) + "' onclick='btnCargaCedulaProceso_Click(this)'/></td>";

        //if (IndicePestaniaHabilitadaO == 4 && clasificacion != "PRECEDENTES") cadena += "<td id='TdEncabezado_" + TdACargaCtrls + "_3' lang='ab' style='width:5%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitadaO >= 0 && IndicePestaniaHabilitadaO <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitadaO >= 4 && IndicePestaniaHabilitadaO <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'> <p class='p' style='margin-top: 28px;font-size: 9px;margin-left: 14px;'> DETENER</p></td><td id='TdContenido_" + TdACargaCtrls + "_3' class='Gris_Gde' style='width:90%;height:100%;'>&nbsp&nbsp<input type='button' id='" + IdMet + "_" + TdProgressB + "_" + DefMetodologia + "' class='classButton' value='Detener' onclick='btnDetenerProcesoMet_Click(this)'/></td>";

        if ((IdMet == "19") || (IdMet == "23") || (IdMet == "24") || (IdMet == "25")) {
            //if (IndicePestaniaHabilitadaO == 4 && clasificacion != "PRECEDENTES") cadena += "<td id='TdEncabezado_" + TdACargaCtrls + "_3' lang='ab' style='width:5%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitadaO >= 0 && IndicePestaniaHabilitadaO <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitadaO >= 4 && IndicePestaniaHabilitadaO <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'> <p class='p' style='margin-top: 28px;font-size: 9px;margin-left: 14px;'></p></td></td>";
        } else {

            if (IndicePestaniaHabilitadaO == 4 && clasificacion != "PRECEDENTES") cadena += "<td id='TdEncabezado_" + TdACargaCtrls + "_3' lang='ab' style='width:5%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitadaO >= 0 && IndicePestaniaHabilitadaO <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitadaO >= 4 && IndicePestaniaHabilitadaO <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'> <p class='p' style='margin-top: 28px;font-size: 9px;margin-left: 14px;'> DETENER</p></td><td id='TdContenido_" + TdACargaCtrls + "_3' class='Gris_Gde' style='width:90%;height:100%;'>&nbsp&nbsp<input type='button' id='" + IdMet + "_" + TdProgressB + "_" + DefMetodologia + "' class='classButton' value='Detener' onclick='btnDetenerProcesoMet_Click(this)'/></td>";

        }

        if ((IdMet == "19") || (IdMet == "23") || (IdMet == "24") || (IdMet == "25")) {
            if (IndicePestaniaHabilitadaO == 4 && clasificacion != "PRECEDENTES") cadena += "<td id='TdEncabezado_" + TdACargaCtrls + "_3' lang='ab' style='width:5%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitadaO >= 0 && IndicePestaniaHabilitadaO <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitadaO >= 4 && IndicePestaniaHabilitadaO <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'> <p class='p' style='margin-top: 28px;font-size: 9px;margin-left: 14px;'> DETENER</p></td><td id='TdContenido_" + TdACargaCtrls + "_3' class='Gris_Gde' style='width:90%;height:100%;'>&nbsp&nbsp<input type='button' id='" + IdMet + "_" + TdProgressB + "_" + DefMetodologia + "' class='classButtonDis' value='Detener' onclick='btnDetenerProcesoMet_Click(this)'/></td>";

            if (IndicePestaniaHabilitadaO == 4 && periocidadSelectXUser == 1 && (PerfilUser == "19" /*|| PerfilUser == "3"*/))
                cadena += "<td id='TdEncabezado_" + TdACargaCtrls + (clasificacion != "PRECEDENTES" || DefMetodologia.split("%%%")[1] == "10" || DefMetodologia.split("%%%")[1] == "17" || (DefMetodologia.split("%%%")[1] == "18" && periocidadSelectXUser == "1") ? "_4'" : "_2'") + " lang='ab' style='width:3%;height:100%;cursor: pointer;' class='AcordeonAmarillo_1' onclick='SubAcordeon_Click(this);'><p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'> CERRAR PROCESOS</p></td><td id='TdContenido_" + TdACargaCtrls + (clasificacion != "PRECEDENTES" || DefMetodologia.split("%%%")[1] == "10" || DefMetodologia.split("%%%")[1] == "17" || (DefMetodologia.split("%%%")[1] == "18" && periocidadSelectXUser == "1") ? "_4'" : "_2'") + "  class='Gris_Gde' style='width:0%;height:100%;'><input type='button' lang='" + DefMetodologia.split('%%%')[0] + "' alt='" + TdACargaCtrls + "_" + estatusBloqueo + "' id='btnCerrarProceso_" + IdMet + "' class='classButtonDis' value='" + (estatusBloqueo == "0" ? "Cerrar" : "Abrir") + " Proceso' onclick='return CerrarCandadoProceso_Click(event,this);'/></td>";
        }
        else {
            if (IndicePestaniaHabilitadaO == 4 && clasificacion != "PRECEDENTES") cadena += "<td id='TdEncabezado_" + TdACargaCtrls + "_3' lang='ab' style='width:5%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitadaO >= 0 && IndicePestaniaHabilitadaO <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitadaO >= 4 && IndicePestaniaHabilitadaO <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'> <p class='p' style='margin-top: 28px;font-size: 9px;margin-left: 14px;'> DETENER</p></td><td id='TdContenido_" + TdACargaCtrls + "_3' class='Gris_Gde' style='width:90%;height:100%;'>&nbsp&nbsp<input type='button' id='" + IdMet + "_" + TdProgressB + "_" + DefMetodologia + "' class='classButton' value='Detener' onclick='btnDetenerProcesoMet_Click(this)'/></td>";

            if (IndicePestaniaHabilitadaO == 4 && periocidadSelectXUser == 1 && (PerfilUser == "19" /*|| PerfilUser == "3"*/))
                cadena += "<td id='TdEncabezado_" + TdACargaCtrls + (clasificacion != "PRECEDENTES" || DefMetodologia.split("%%%")[1] == "10" || DefMetodologia.split("%%%")[1] == "17" || (DefMetodologia.split("%%%")[1] == "18" && periocidadSelectXUser == "1") ? "_4'" : "_2'") + " lang='ab' style='width:3%;height:100%;cursor: pointer;' class='AcordeonAmarillo_1' onclick='SubAcordeon_Click(this);'><p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'> CERRAR PROCESOS</p></td><td id='TdContenido_" + TdACargaCtrls + (clasificacion != "PRECEDENTES" || DefMetodologia.split("%%%")[1] == "10" || DefMetodologia.split("%%%")[1] == "17" || (DefMetodologia.split("%%%")[1] == "18" && periocidadSelectXUser == "1") ? "_4'" : "_2'") + "  class='Gris_Gde' style='width:0%;height:100%;'><input type='button' lang='" + DefMetodologia.split('%%%')[0] + "' alt='" + TdACargaCtrls + "_" + estatusBloqueo + "' id='btnCerrarProceso_" + IdMet + "' class='classButton' value='" + (estatusBloqueo == "0" ? "Cerrar" : "Abrir") + " Proceso' onclick='return CerrarCandadoProceso_Click(event,this);'/></td>";
        }
        cadena += "</tr></table> ";
        $("#divContenedor_" + TdACargaCtrls).append(cadena);
        $("#TablaContenidoExpanded_" + TdACargaCtrls).show();

        if (clasificacion != "PRECEDENTES" || DefMetodologia.split("%%%")[1] == "10" || (DefMetodologia.split("%%%")[1] == "17" || (DefMetodologia.split("%%%")[1] == "18" && periocidadSelectXUser == "1"))) {
            $("#TdContenido_" + TdACargaCtrls + "_2").hide();
            $("#TdContenido_" + TdACargaCtrls + "_3").hide();
            $("#TdContenido_" + TdACargaCtrls + "_4").hide();
        }
        else
            $("#TdContenido_" + TdACargaCtrls + "_2").hide();
    }
    else {
        if (document.getElementById("TablaBotonesReprocesoExpanded_" + TdACargaCtrls) != null) {
            var cadena = "<tr><td><table><tr>";
            for (var i = numeroBotonesRep; i >= 0; i--) {
                if (agregarBtnReproceso) cadena += "<td > <div class='BtnReproceso' id='btn_" + TdACargaCtrls + "_" + IdMet + "_" + DefMetodologia + "_" + i + "' onclick='HistorialReprocesosProcesoCalf_Click(this);'><div class='TxtBtnReproceso'>" + i + "</div> </div></td>";
            }
            cadena += "</tr></table></td></tr>";
            $("#TablaBotonesReprocesoExpanded_" + TdACargaCtrls).html(cadena);
            ActualizaEstatusCheckPadreHijosOmitir(IdMet, TdACargaCtrls);
        }
        $("#btnCerrarProceso_" + IdMet).attr("alt", TdACargaCtrls + "_" + estatusBloqueo);
        if (estatusBloqueo == "0" && PerfilUser != "35" && PerfilUser != "17") {
            $("#btnCerrarProceso_" + IdMet).attr("value", "Cerrar Proceso");
            $('#TdContenido_' + TdACargaCtrls + "_1").find('input:button').removeAttr("disabled");
            $('#TdContenido_' + TdACargaCtrls + "_1").find('input:button').attr('class', 'classButton');
        }
        else if (estatusBloqueo == "1" || ((PerfilUser == "35" || PerfilUser == "17") && IdMet != 1)) {
            $("#btnCerrarProceso_" + IdMet).attr("value", "Abrir Proceso");
            $('#TdContenido_' + TdACargaCtrls + "_1").find('input:button').attr("disabled", true);
            $('#TdContenido_' + TdACargaCtrls + "_1").find('input:button').attr('class', 'classButtonDis');
        }
    }
    $("#TablaContenidoCollapsed_" + TdACargaCtrls).hide();
    $("#TablaContenidoExpanded_" + TdACargaCtrls).show();
}

function btnMostrar_Ficha_Click(obj) {
    var cad = '';
    cad = '<div id="popup" style="display: none; height:100%;">';
    cad += '   <div class="content-popup">';
    cad += '      <table style="width:100%;">';
    cad += '         <tr>';
    cad += '            <td>';
    cad += '            </td>';
    cad += '            <td>';
    cad += '                 <div id="Cerrar" onclick="cerrarVentanaIpab();"  style="height:28px; float:right" >';
    cad += '                      <img id="btnCerrarVentanaIPAB" alt="muestra" src="../../../Images/PanelDeControl/Captacion/btnCerrar.png" style="width: 25px; height: 25px; margin-right: 5px; cursor: pointer;" />';
    cad += '                 </div>';
    cad += '            </td>';
    cad += '         </tr>';
    cad += '         <tr>';
    cad += '            <td colspan="2">';



    cad += '                 <div id="divGeneral" class="content" style="height: 100%; border: 1px solid #d0e6e6;">';
    cad += '                     <div class="stlInfCaptacion content"  style="height: 25px; color: white; font: 12px Segoe UI, Verdana, Helvetica, Sans-Serif;" >';
    cad += '                         Información del Cliente';
    cad += '                     </div>';
    cad += '                     <div id="divBuscarCaptacion" class="stlBuscarCaptacion" style="height: 60px; background-color: white;">';
    cad += '                         <table style="width: 100%;">';
    cad += '                             <tr style="text-align: center; ">';
    cad += '                                <td>';
    cad += '                                    <div style="float: left; margin-top: 10px; margin-left: 20px;  font-weight:700; font: 12px Segoe UI, Verdana, Helvetica, Sans-Serif;">Fecha de consulta: </div>';
    cad += '                                    <div style="float: left; margin-top: 10px; margin-left: 20px;  font-weight:700; font: 12px Segoe UI, Verdana, Helvetica, Sans-Serif;"><span id="idSpanFecha"></span> </div>';
    cad += '                                    <div style="float: left; margin-top: 10px; margin-left: 20px;  font-weight:700; font: 12px Segoe UI, Verdana, Helvetica, Sans-Serif;">Buscar cliente por Nombre:</div>';
    cad += '                                    <div style="float: left; vertical-align: middle; margin-top: 10px; margin-left: 5px;">';
    cad += '                                        <input id="FiltroBuscarCliente" style="margin-bottom: 2px; width: 300px; height: 15px; font: 11px Segoe UI, Verdana, Helvetica, Sans-Serif;" type="text" />';
    cad += '                                    </div>';
    cad += '                                    <div onclick="buscarInfoCliente(-1);" class="stlBotonBuscar">      Buscar      </div>';
    cad += '                                </td>';
    cad += '                             </tr>';
    cad += '                             <tr><td id="uno1" style="background-color: white; margin-left: 15px;"></td></tr>';
    cad += '                             <tr><td id="dos2" style="background-color: white; text-align: right; margin-left: 15px;"></td></tr>';
    cad += '                         </table>';
    cad += '                     </div>';
    cad += '                 </div>';

    cad += '          <div id="divContenedorGeneral" style="height: 400px; margin-top:5px; overflow-y: scroll; border: 1px solid #d0e6e6;">';

    //**************************************************************************************************************************************
    cad += '                 <div id="divCaptacion" style="height: 23px; visibility: hidden; border: 1px solid #d0e6e6; margin-top: 5px;">';
    cad += '                     <table style="width: 100%;" cellpadding="0" cellspacing="0" border="0">';
    cad += '                         <tr onclick="buscarInfoCliente(0);" style="cursor:pointer;  background-color: #1695A3;">';
    cad += '                             <td style="width: 50%;" >';
    cad += '                                 <div class="stlInfCaptacion content" style="color: white;" >Lineas</div>';
    cad += '                             </td>';
    cad += '                             <td style="width: 40%;">';
    cad += '                                <div class="stlInfCaptacion content" style="color: white;" >Cuentas</div>';
    cad += '                             </td>';
    cad += '                             <td style="width: 10%;">';
    cad += '                                <div class="stlInfCaptacion content" style="text-align: right;">';
    cad += '                                    <img id="btnCaptacion1" alt="muestra" src="../../../Images/PanelDeControl/Captacion/btnSiguiente1.png" style="width: 20px; height: 20px; margin-right: 15px; cursor: pointer;" />';
    cad += '                                 </div>';
    cad += '                             </td>';
    cad += '                         </tr>';
    cad += '                     </table>';
    cad += '                     <table id="tblInformacionCaptacion" style="height: 0px; width: 100%; visibility: collapse;">';
    cad += '                        <tr>';
    cad += '                            <td style="width: 50%; vertical-align: top;">';
    cad += '                                <div class="stlBuscarCaptacion" style="width: 98%; height: auto; float: left; background-color: white;">';
    cad += '                                   <div class="stlBuscarCaptacion" style="width: 100%; /*overflow-y: scroll;*/ height: 60px; border: 1px solid #d0e6e6; background-color: white; margin-left: 10px; margin-top: 5px;">';
    cad += '                                      <table style="width: 100%;" cellpadding="1" cellspacing="1" border="0">';
    cad += '                                           <thead>';
    cad += '                                             <tr class="stlTituloInfoCaptacion">';
    cad += '                                                 <th style="width: 33%;">Canal</th>';
    cad += '                                                 <th style="width: 33%;">Sucursal</th>';
    cad += '                                                <th style="width: 34%;">Pedido</th>';
    cad += '                                             </tr>';
    cad += '                                           </thead>';
    cad += '                                           <tbody class="stlContenidoInfoCaptacion">';
    cad += '                                               <tr id="idTRLineas"><td></td></tr>';
    cad += '                                           </tbody>';
    cad += '                                      </table>';
    cad += '                                  </div>';
    cad += '                               </div>';
    cad += '                          </td>';
    cad += '                          <td style="width: 50%; vertical-align: top;">';
    cad += '                             <div class="stlBuscarCaptacion" style="width: 98%; float: left; background-color: white;">';
    cad += '                                 <div class="stlBuscarCaptacion" style="/*overflow-y: scroll;*/ height: 60px; width: 100%; border: 1px solid #d0e6e6; background-color: white; margin-left: 5px; margin-top: 5px;">';
    cad += '                                     <table style="width: 100%;" cellpadding="1" cellspacing="1" border="0">';
    cad += '                                         <thead>';
    cad += '                                             <tr class="stlTituloInfoCaptacion">';
    cad += '                                                 <th style="width: 100%;">Número de Cuenta</th>';
    cad += '                                             </tr>';
    cad += '                                         </thead>';
    cad += '                                         <tbody class="stlContenidoInfoCaptacion">';
    cad += '                                             <tr id="idTRCuentas">  <td></td> </tr>';
    cad += '                                         </tbody>';
    cad += '                                     </table>';
    cad += '                                 </div>';
    cad += '                               </div>';
    cad += '                            </td>';
    cad += '                        </tr>';
    cad += '                     </table>';
    cad += '                 </div>';

    //**************************************************************************************************************************************
    cad += '                 <div id="divDisposicion" style="height: 23px; visibility: hidden; border: 1px solid #d0e6e6; margin-top: 5px;">';
    cad += '                    <table style="width: 100%;" cellpadding="0" cellspacing="0" border="0">';
    cad += '                        <tr onclick="buscarInfoCliente(1);" style="cursor:pointer;  background-color: #1695A3;">';
    cad += '                            <td style="width: 50%;">';
    cad += '                                <div class="stlInfCaptacion content" style="color: white;"  >Disposición</div>';
    cad += '                            </td>';
    cad += '                            <td style="width: 40%;">';
    cad += '                                <div class="stlInfCaptacion content" style="color: white;" >Inversión</div>';
    cad += '                            </td>';
    cad += '                            <td style="width: 10%;">';
    cad += '                                <div class="stlInfCaptacion content" style="text-align: right;">';
    cad += '                                    <img id="btnCaptacion2" alt="muestra" src="../../../Images/PanelDeControl/Captacion/btnSiguiente1.png" style="width: 20px; height: 20px; margin-right: 15px; cursor: pointer;" />';
    cad += '                                </div>';
    cad += '                            </td>';
    cad += '                        </tr>';
    cad += '                    </table>';
    cad += '                    <table id="tblInformacionCaptacion2" style="height: 0px; width: 100%; visibility: collapse;">';
    cad += '                        <tr>';
    cad += '                            <td style="width: 48%; vertical-align: top;">';
    cad += '                                <div id="idDivDisposicion" class="stlBuscarCaptacion" style="width: 500px; height: auto; float: left; background-color: white;">';
    cad += '                                    <div class="stlBuscarCaptacion" style="width: auto; overflow-y: scroll; height: 130px; border: 1px solid #d0e6e6; background-color: white; margin-left: 10px; margin-top: 5px;">';
    cad += '                                        <table style="width:2500px; " cellpadding="1" cellspacing="1" border="0">';
    cad += '                                           <thead>';
    cad += '                                                <tr id="idTRTituloDisposicion" class="stlTituloInfoCaptacion">';
    cad += '                                                    <th></th>';
    cad += '                                                </tr>';
    cad += '                                            </thead>';
    cad += '                                            <tbody id="idTRContenidoDisposicion" class="stlContenidoInfoCaptacion">';
    cad += '                                                <tr ><td></td></tr>';
    cad += '                                            </tbody>';
    cad += '                                        </table>';
    cad += '                                    </div>';
    cad += '                                </div>';
    cad += '                            </td>';
    cad += '                            <td style="width: 48%; vertical-align: top;">';
    cad += '                                <div id="idDivDisposicion1" class="stlBuscarCaptacion" style="width: 98%; float: left; background-color: white;">';
    cad += '                                    <div class="stlBuscarCaptacion" style="overflow-y: scroll; height: 130px; width:100%; border: 1px solid #d0e6e6; background-color: white; margin-left: 5px; margin-top: 5px;">';
    cad += '                                        <table style="width:1450px; " cellpadding="1" cellspacing="1" border="0">';
    cad += '                                            <thead>';
    cad += '                                                <tr class="stlTituloInfoCaptacion">';
    cad += '                                                    <th style="width: 100px;">Clave Cliente Alnova</th>';
    cad += '                                                    <th style="width: 80px;">Número Cuenta</th>';
    cad += '                                                    <th style="width: 80px;">Clave Producto</th>';
    cad += '                                                    <th style="width: 80px;">Cuenta Contable</th>';
    cad += '                                                    <th style="width: 80px;">Nombre Producto</th>';
    cad += '                                                    <th style="width: 80px;">Capital Cuenta</th>';
    cad += '                                                    <th style="width: 60px;">Intereses</th>';
    cad += '                                                    <th style="width: 110px;">Retención Impuestos</th>';
    cad += '                                                    <th style="width: 110px;">Saldo Neto de Cuenta</th>';
    cad += '                                                    <th style="width: 60px;">Fecha Corte</th>';
    cad += '                                                    <th style="width: 80px;">Fecha SIG Corte</th>';
    cad += '                                                    <th style="width: 110px;">Fecha Contratación</th>';
    cad += '                                                    <th style="width: 80px;">Plazo Operación</th>';
    cad += '                                                    <th style="width: 50px;">Tasa</th>';
    cad += '                                                    <th style="width: 110px;">Saldo Prom. Diario</th>';
    cad += '                                                    <th style="width: 80px;">% Titularidad</th>';
    cad += '                                                </tr>';
    cad += '                                            </thead>';
    cad += '                                            <tbody id="idTRContenidoInversion" class="stlContenidoInfoCaptacion">';
    cad += '                                                <tr><td></td></tr>';
    cad += '                                            </tbody>';
    cad += '                                        </table>';
    cad += '                                    </div>';
    cad += '                                </div>';
    cad += '                            </td>';
    cad += '                        </tr>';
    cad += '                    </table>';
    cad += '                 </div>';

    //******************************************************************************************************************************

    cad += '                 <div id="divDisposicion2" style="height: 23px; visibility: hidden; border: 1px solid #d0e6e6; margin-top: 5px;">';
    cad += '                     <table style="width: 100%;" cellpadding="0" cellspacing="0" border="0">';
    cad += '                        <tr onclick="buscarInfoCliente(2);" style="cursor:pointer;  background-color: #1695A3;">';
    cad += '                            <td style="width: 50%;">';
    cad += '                                <div class="stlInfCaptacion content" style="color: white;" >Corte</div>';
    cad += '                            </td>';
    cad += '                            <td style="width: 40%;">';
    cad += '                                <div class="stlInfCaptacion content" style="color: white;" >Corte</div>';
    cad += '                            </td>';
    cad += '                            <td style="width: 10%;">';
    cad += '                                <div class="stlInfCaptacion content" style="text-align: right;">';
    cad += '                                    <img id="btnCaptacion3" alt="muestra" src="../../../Images/PanelDeControl/Captacion/btnSiguiente1.png" style="width: 20px; height: 20px; margin-right: 15px; cursor: pointer;" />';
    cad += '                                </div>';
    cad += '                            </td>';
    cad += '                        </tr>';
    cad += '                     </table>';
    cad += '                     <table id="tblInformacionCaptacion3" style="height: 0px; width: 100%; visibility: collapse;">';
    cad += '                         <tr>';
    cad += '                             <td style="width: 48%; vertical-align: top;">';
    cad += '                                <div id="idDivCorte1" class="stlBuscarCaptacion" style="width: 98%; height: auto; float: left; background-color: white;">';
    cad += '                                    <div class="stlBuscarCaptacion" style="width: 100%; overflow-y: scroll; height: 130px; border: 1px solid #d0e6e6; background-color: white; margin-left: 10px; margin-top: 5px;">';
    cad += '                                        <table style="width:800px;" cellpadding="1" cellspacing="1" border="0">';
    cad += '                                            <thead>';
    cad += '                                               <tr id="idTRTituloCorte1" class="stlTituloInfoCaptacion" style="color: white;">';
    cad += '                                                   <th style="width: 40px;">Pedido</th>';
    cad += '                                                   <th style="width: 40px;">Cliente</th>';
    cad += '                                                   <th style="width: 40px;">Número Crédito</th>';
    cad += '                                                   <th style="width: 40px;">ID Cliente</th>';
    cad += '                                                   <th style="width: 40px;">Fecha Inicio</th>';
    cad += '                                                   <th style="width: 40px;">Fecha Último Pago</th>';
    cad += '                                                   <th style="width: 40px;">Saldo Res. Total</th>';
    cad += '                                                   <th style="width: 40px;">Capital Vigente</th>';
    cad += '                                                   <th style="width: 40px;">Capital Vencido</th>';
    cad += '                                                   <th style="width: 40px;">Interes Ordinario</th>';
    cad += '                                               </tr>';
    cad += '                                            </thead>';
    cad += '                                            <tbody id="idTRContenidoCorte1" class="stlContenidoInfoCaptacion">';
    cad += '                                                <tr style="color: white;">';
    cad += '                                                   <td></td>';
    cad += '                                                </tr>';
    cad += '                                            </tbody>';
    cad += '                                        </table>';
    cad += '                                    </div>';
    cad += '                                 </div>';
    cad += '                             </td>';
    cad += '                             <td style="width: 50%; vertical-align: top;">';
    cad += '                                <div id="idDivCorte2" class="stlBuscarCaptacion" style="width: 98%; float: left; background-color: white;">';
    cad += '                                    <div class="stlBuscarCaptacion" style="overflow-y: scroll; height: 130px; width: 100%; border: 1px solid #d0e6e6; background-color: white; margin-left: 5px; margin-top: 5px;">';
    cad += '                                        <table style="width: 1900px;" cellpadding="1" cellspacing="1" border="0">';
    cad += '                                            <thead>';
    cad += '                                                <tr class="stlTituloInfoCaptacion" style="color: white;">';
    cad += '                                                    <th style="width: 40px;">No. Cuenta</th>';
    cad += '                                                    <th style="width: 40px;">Cve. Producto</th>';
    cad += '                                                    <th style="width: 40px;">Cuenta Contable</th>';
    cad += '                                                    <th style="width: 40px;">Nombre Producto</th>';
    cad += '                                                    <th style="width: 40px;">Capital Cuenta</th>';
    cad += '                                                    <th style="width: 40px;">Intereses</th>';
    cad += '                                                    <th style="width: 40px;">Retención Impuestos</th>';
    cad += '                                                    <th style="width: 40px;">Saldo Neto Cuenta</th>';
    cad += '                                                    <th style="width: 40px;">Fecha Corte</th>';
    cad += '                                                    <th style="width: 40px;">Fecha SIG Corte</th>';
    cad += '                                                    <th style="width: 40px;">Fecha Contratación</th>';
    cad += '                                                    <th style="width: 40px;">Plazo Operación</th>';
    cad += '                                                    <th style="width: 40px;">Tasa</th>';
    cad += '                                                    <th style="width: 40px;">Saldo Prom. Diario</th>';
    cad += '                                                    <th style="width: 40px;">% Titularidad</th>';
    cad += '                                                </tr>';
    cad += '                                            </thead>';
    cad += '                                            <tbody id="idTRContenidoCorte2" class="stlContenidoInfoCaptacion">';
    cad += '                                                <tr>';
    cad += '                                                    <td></td>';
    cad += '                                                </tr>';
    cad += '                                            </tbody>';
    cad += '                                        </table>';
    cad += '                                    </div>';
    cad += '                                </div>';
    cad += '                             </td>';
    cad += '                         </tr>';
    cad += '                     </table>';
    cad += '                </div>';

    //******************************************************************************************************************************
    cad += '          </div>';

    cad += '            </td>';
    cad += '         </tr>';
    cad += '      </table>';
    cad += '   </div>';
    cad += '</div>';


    $('#divHeader').css('display', 'none');

    $('#divVentanaIPAB').css('display', 'table-cell');
    $('#divVentanaIPAB').html(cad);

    $('#popup').fadeIn('slow');
    //$('.divPanelMain').css('opacity', '0.5');
    //$('.content-popup').css('width', parseInt($(window).width()) - 40 + 'px');
    $('.content-popup').css('height', parseInt($(window).height()) - 70 + 'px');
    //$('.content-popup').css('top', '160px');
    //$('.content-popup').css('height', '100%');

    $('#idDivDisposicion').css('width', (parseInt($(window).width()) / 2) - 30 + 'px')
    $('#idDivDisposicion1').css('width', (parseInt($(window).width()) / 2) - 50 + 'px')

    $('#idDivCorte1').css('width', (parseInt($(window).width()) / 2) - 50 + 'px')
    $('#idDivCorte2').css('width', (parseInt($(window).width()) / 2) - 50 + 'px')

    $('#idSpanFecha').html($("#dpFechaPeriodoGral")); //.split('/')[]);


    //$('.content-popup').resizable();
    $(document).ready(function () {
        $("#btnCerrarVentanaIPAB").hover(function () {
            $(this).attr('src', '../../../Images/PanelDeControl/Captacion/btnCerrar1.png');//cambia de imagen en el over
        }
        , function () {
            $(this).attr('src', '../../../Images/PanelDeControl/Captacion/btnCerrar.png');
        });
    });

}

function cerrarVentanaIpab() {
    $('#popup').fadeOut('slow');
    $('body').css('opacity', '1');
    $('#divVentanaIPAB').css('display', 'none');
    $('#divHeader').css('display', '');
}

var numTotalNoListo = 0;
function btnDetenerProcesoMet_Click(obj) {
    if ($("#" + $(obj).attr("id").split("_")[1]).attr("class") != "EstatusAmarillo")
    { MostrarMsj("No es posible Detener el Proceso de Calificación de <span style='font-weight:bold;'>" + $(obj).attr("id").split("_")[2].split("%%%")[0] + ". La Metodología NO esta en Proceso.", " AVISO " + $(obj).attr("id").split("_")[2].split("%%%")[0], false, true, false, "", "Aceptar", "", 330, 140, null, null, null); return; }

    MostrarMsj("¿Está seguro que desea Detener el Proceso de Calificación de <span style='font-weight:bold;'>" + $(obj).attr("id").split("_")[2].split("%%%")[0] + "</span>? ", "Mensaje " + $(obj).attr("id").split("_")[2].split("%%%")[0], true, true, false, "Si", "No", "", 300, 120,
        function () {
            $("#divVentanaMensajes").dialog("close");
            $("#" + $(obj).attr("id").split("_")[1]).attr("class", "EstatusNegro");
            var parametrosDetenerProcesoCalfMet = { fechaCorte: fechaP.split(",")[0] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[2], idMet: $(obj).attr("id").split("_")[0], periodicidad: periocidadSelectXUser, usuario: userLogin };
            // alert(fechaP.split(",")[0] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[2] + "," + $(obj).attr("id").split("_")[0] + "," + periocidadSelectXUser + userLogin);
            peticionAjax('PanelDeControl.aspx/DetenerProcesoCalifMetodologias', "POST", parametrosDetenerProcesoCalfMet, function (data) {
                if (data.d.indexOf("ERRORCATCH") == -1) {
                    numTotalNoListo = data.d;
                    $("#div" + $(obj).attr("id").split("_")[1]).show();
                    $("#div" + $(obj).attr("id").split("_")[1] + "_txt").show();
                    ProgressBarDetenerProcCalfMet(100, 100.2, $(obj).attr("id").split("_")[1], $(obj).attr("id").split("_")[0], true, false, false, 0);
                    $("#div" + $(obj).attr("id").split("_")[1]).attr("class", "classDetenerMet");
                    document.getElementById("div" + $(obj).attr("id").split("_")[1] + "_txt").style.color = "White";
                    document.getElementById("div" + $(obj).attr("id").split("_")[1] + "_txt").innerHTML == "Deteniendo..." + document.getElementById("div" + $(obj).attr("id").split("_")[1] + "_txt").innerHTML;
                }
                else MostrarMsj(data.d, " AVISO " + $(obj).attr("id").split("_")[2].split("%%%")[0], false, true, false, "", "Aceptar", "", 340, 140, null, null, null);
            }, null);
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
}

    function btnCargaCedulaProceso_Click(obj) {
        CargaCedulaMetodologia($(obj).attr("id").split("_")[1], $(obj).attr("id").split("_")[3]);
    }

    function HistorialReprocesosProcesoCalf_Click(obj) {
        LlamaPeticionAjaxDeHistorialReprocesosFuente($(obj).attr("id").split("_")[1].substring($(obj).attr("id").split("_")[1].length - 1), $(obj).attr("id").split("_")[2], fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(obj).attr("id").split("_")[4], $(obj).attr("id").split("_")[3].split("%%%")[0], "DevuelveSPDetalleReprocesoProcesoCalf");
    }

    function ProcesarCalificacion_Click(obj) {
        if ($(obj).attr("id").split("%%%")[1] == "10") {
            window.location = window.location.protocol + "//" + window.location.host + "/SicreNetV2/Calificacion/NuevoAgrupador/Default.aspx";
        }
        else if ($(obj).attr("id").split("%%%")[1] == "17" && periocidadSelectXUser == "1") {
            var cad = '<center><table><tr><td><div id="divgv_CatINPC" style="height:192px;overflow: auto;"></div></td></tr>' +
                        '<tr><td><br />Valor INPC :<input type="text" id="txtCapturaINPC" style="font-size: 9px" onkeydown="return FilterInputNumAndAlfa(event, false,true);" />' +
                        '&nbsp;<input id="txtFechaINPC" type="text" class="calendario" style="width: 90px; font-size: 9px" disabled="disabled"/>&nbsp;' +
                        '<input type="button" id="btnGuardaINPC" value="Guardar Valor" class="classButton" onclick="GuardarINPC_Click();" />' +
                        '</td></tr><tr><td><span id="spErrorINPC"></span></td></tr></table></center>';

            var cadena = '<div id="divBloqVtnINPC" style="width:97%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvINPC" style="width: 100%; height: 100%; overflow: hidden; text-align: center;font-size:12px">';
            cadena += '<table style="width: 100%"> <tr><td> <div id="dvINPCBody" style="width: 100%">' + cad;
            cadena += '</div></td> </tr></table></div>';
            AgregarVtnFlotante("divVtnINPC", $(obj).attr("id").split("%%%")[1], "VALOR " + $(obj).attr("id").split("_")[2].split("%%%")[0], "", cadena, 305, 450, false, false, "", "", null);
            $(".calendario").datepicker({ beforeShowDay: renderCalendarCallback });
            $(".ui-datepicker-trigger").attr("disabled", "disabled");

            $("#txtFechaINPC").val($("#dpFechaPeriodoGral").attr("value"));
            CargaCatalooINPC();
        }
        else if ($(obj).attr("id").split("%%%")[1] == "18" && periocidadSelectXUser == "1") {

            var cad = '<center><table><tr><td><div id="divVtnBHSIC" style="height:192px;overflow: auto;"></div></td></tr></table></center>';
            var cadena = '<div id="divBloqVtnBaseHomSIC" style="width:97%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvBHSIC" style="width: 100%; height: 100%; overflow: hidden; text-align: center;font-size:12px">';
            cadena += '<table style="width: 100%"> <tr><td> <div id="dvBHSICBody" style="width: 100%">' + cad;
            cadena += '</div></td> </tr></table></div>';
            AgregarVtnFlotante("divVtnBHSIC", $(obj).attr("id").split("%%%")[1], $(obj).attr("id").split("_")[2].split("%%%")[0], "", cadena, 500, 700, false, false, "", "", null);
            GetIncidenciasBaseHomSIC()

        }
        else {
            var idTdExecute = $(obj).attr("id").split("_")[1].substring(0, $(obj).attr("id").split("_")[1].length - 1);

            /********************************************* Valida chk Omitir Calificación ***************************************************/
            var auxEstatus = '';
            try {
                var td = $(obj).attr("id").split('_')[1].split('Td')[1];
                var sMet = $(obj).attr("id").split('_')[2].split('%%%')[1];
                var chkOmitir = 'imgchkOmitirCalf_' + (parseInt(idTdExecute.replace('Td', '')) + 1) + 'Td' + td + '_' + sMet;

                if ($('#' + chkOmitir).attr('lang') == 'aa') {
                    if (($("#" + idTdExecute + "1").attr("class") != "EstatusVerde" && $("#" + idTdExecute + "1").attr("class") != "EstatusNaranja") || ($("#" + idTdExecute + "2").attr("class") != "EstatusVerde" && $("#" + idTdExecute + "2").attr("class") != "EstatusNaranja") || ($("#" + idTdExecute + "3").attr("class") != "EstatusVerde" && $("#" + idTdExecute + "3").attr("class") != "EstatusNaranja")) {
                        MostrarMsj("No se puede ejecutar la Calificación <span style='font-weight:bold;'>" + $(obj).attr("id").split("_")[2].split("%%%")[0] + "</span>. Las fases I,II,III deben de estar en un estatus valido.", " AVISO " + $(obj).attr("id").split("_")[2].split("%%%")[0], false, true, false, "", "Aceptar", "", 330, 140, null, null, null);
                        return;
                    }

                }
                else {
                    auxEstatus = '6';
                }
            }
            catch (e) {
                MostrarMsj("Se genero el siguiente error: " + e.message, " AVISO ", false, true, false, "", "Aceptar", "", 330, 140, null, null, null);
                return;
            }

            /********************************************************************************************************************************/

            if (document.getElementById("div" + $(obj).attr("id").split('_')[1]).style.display.indexOf("none") == -1 && $("#" + $(obj).attr("id").split('_')[1]).attr("class") == "EstatusNegro")
            { MostrarMsj("No se puede ejecutar la Calificación <span style='font-weight:bold;'>" + $(obj).attr("id").split("_")[2].split("%%%")[0] + "</span>. Se esta <span style='font-weight:bold;'>Deteniendo</span> el Proceso.", " AVISO " + $(obj).attr("id").split("_")[2].split("%%%")[0], false, true, false, "", "Aceptar", "", 330, 140, null, null, null); return; }

            MostrarMsj("¿Está seguro que desea Iniciar el Proceso de Calificación de <span style='font-weight:bold;'>" + $(obj).attr("id").split("_")[2].split("%%%")[0] + "</span>? ", "Mensaje " + $(obj).attr("id").split("_")[2].split("%%%")[0], true, true, false, "Si", "No", "", 300, 120,
            function () {
                $("#divVentanaMensajes").dialog("close");
                ValidaExisteProcesoExistenteEtapaII(obj, auxEstatus);
            }, function () {
                $("#divVentanaMensajes").dialog("close");
            }, null);
        }
    }

    function GetIncidenciasBaseHomSIC() {
        WaitingVtn("divBloqVtnBaseHomSIC", true, true, "Cargando Información");
        var parametrosRegistro = { fechaCorte: fechaP.split(",")[0] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[2]};
        peticionAjax('PanelDeControl.aspx/GetIncidenciasBaseHomSIC', "POST", parametrosRegistro,
                function (data) {
                    if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                        if (data.d != "") {
                            var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        
                            $("#divVtnBHSIC").html(generarTablaDeRegistrosSinFoot1(JSON, "", "tblincidenciasBHSIC"));
                            $("#tblincidenciasBHSIC").attr("class", "dataGridDatos");
                   
                        }
                        else MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    }
                    else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
         
                    WaitingVtn("divBloqVtnBaseHomSIC", false, false, "Cargando Información");
                }, null);
    }

    function CargaCatalooINPC() {
        WaitingVtn("divBloqVtnINPC", true, true, "Cargando Información");
        peticionAjax("../../Regulatorios/Catalogos/Default.aspx/SeleccionCatalogo", "POST", { valueSelect: "INPC" }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d.split("%%&&")[0] != "")
                    var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                if (data.d.split("%%&&")[1] != "" && data.d.split("%%&&")[1] != undefined) {
                    var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                    $("#divgv_CatINPC").html(generarTablaDeRegistrosSinFoot1(JSON, "", "tblINPC"));
                    $("#tblINPC").attr("class", "dataGridDatos");
                }
            }
            else
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            WaitingVtn("divBloqVtnINPC", false, false, "Cargando Información");
        }, null);
    }

    function GuardarINPC_Click() {
        if (!validaCampovacio('txtCapturaINPC') & !validaCampovacio('txtFechaINPC')) {
            WaitingVtn("divBloqVtnINPC", true, true, "Cargando Información");
            peticionAjax("../../Regulatorios/Catalogos/Default.aspx/GuardarINPC", "POST", { valorINPC: $("#txtCapturaINPC").val(), anio: $("#txtFechaINPC").val().split('/')[2], mes: $("#txtFechaINPC").val().split('/')[1], dia: $("#txtFechaINPC").val().split('/')[0] }, function (data) {
                if (data.d.indexOf("Error") == -1) {
                    if (data.d == "") {
                        //ActualizarEstatusINP() 
                        MostrarMsj("Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, function () {
                            $("#divVentanaMensajes").dialog("close");
                            CargaCatalooINPC();
                        }, null);
                        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                            CargaCatalooINPC();
                        });
                    }
                }
                else {
                    WaitingVtn("divBloqVtnINPC", true, false, "");
                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, function () {
                        $("#divVentanaMensajes").dialog("close");
                        WaitingVtn("divBloqVtnINPC", false, false, "");
                    }, null);
                    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                        WaitingVtn("divBloqVtnINPC", false, false, "");
                    });
                }
            });
        }
        else {
            WaitingVtn("divBloqVtnINPC", true, false, "");
            MostrarMsj("Ingrese los campos requeridos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, function () {
                $("#divVentanaMensajes").dialog("close");
                WaitingVtn("divBloqVtnINPC", false, false, "");
            }, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnINPC", false, false, "");
            });
        }
    }

    function ActualizarEstatusINP() {
        WaitingVtn("divBloqVtnINPC", true, true, "Cargando Información");
        peticionAjax("PanelDeControl.aspx/ActualizarEstatusINP", "POST", { anio: fechaP.split(",")[0], mes: fechaP.split(",")[1], dia: fechaP.split(",")[2], idMet: 17, user: userLogin, error: '', peridiocidad: periocidadSelectXUser, idPais: PaisSelectXUser }, function (data) {
            if (data.d.indexOf("ERRORCATCH") == -1) {
                if (data.d == "") {
                    MostrarMsj("Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, function () {
                        $("#divVentanaMensajes").dialog("close");
                        CargaCatalooINPC();
                    }, null);
                    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                        CargaCatalooINPC();
                    });
                }
            }
            else {
                WaitingVtn("divBloqVtnINPC", true, false, "");
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, function () {
                    $("#divVentanaMensajes").dialog("close");
                    WaitingVtn("divBloqVtnINPC", false, false, "");
                }, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnINPC", false, false, "");
                });
            }
        }, null);
    }

    function ValidaExisteProcesoExistenteEtapaII(obj, auxEstatus) {
        var parametrosExisteProcesoActivo = { idMetodologia: $(obj).attr("id").split("_")[0], fechaCorte: fechaP.split(",")[0] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[2], periodicidad: periocidadSelectXUser, idPais: PaisSelectXUser };
        peticionAjax('PanelDeControl.aspx/ValidaProcesoExistenteEtapaII', "POST", parametrosExisteProcesoActivo,
                    function (data) {
                        if (data.d == "0") {

                            if ($(obj).attr("id").split("%%%")[1] == "1") {// COMERCIAL
                                var cadena = '<div id="divBloqVtnProcesaCalf" style="width:97%;height:91.5%; z-index: 100;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
                                cadena += '<div style="height: 94%;"> ' +
                                    '<div id="divVentanaCargaMasivaProcesoCalfTemp" style="height: 100%;">' +

                                     '<div style="width: 100%;height: 100%;">' +
                                      '<div style="height: 97%;width: 50%;display: inline-block; position: relative;float: left;">' +
                                       '<fieldset id="fieldCargaNormalSIC" style="border: 1px solid gray; padding: 10px;height: 90%;">' +
                                        '<legend style="font-weight: bold; text-align: left; font-size: 11px;">PROCESAR CALIFICACIÓN NORMAL</legend>' +
                                        '<center>' +
                                            '<input type="button" value="Iniciar Procesar Calificación" class="classButton" onclick="BtnProcesarCalificacionComercial_Click(\'' + $(obj).attr("id").split("_")[1] + '\',\'' + $(obj).attr("id").split("_")[2].split("%%%")[0] + '\',\'' + $(obj).attr("id").split("_")[0] + '\',false, \'' + auxEstatus + '\');"/>' +
                                         '</center>' +
                                        '</fieldset>' +
                                       '</div>' +
                                       '<div style="width: 50%;height: 97%;display: inline-block; position: relative;float: right;">' +
                                        '<fieldset id="fieldCargaMasivaSIC" style="border: 1px solid gray; padding: 10px;height: 90%;">' +
                                           '<legend style="font-weight: bold; text-align: left; font-size: 11px;">PROCESAR CALIFICACIÓN MASIVA</legend>' +
                                            '<div id="divCheckCargaMasiva" style="height:86%;overflow:auto;text-align: left;">';

                                var agregarFecha = false;
                                for (var i = 0; i < $("#dpFechaPeriodoGral").attr("accesskey").split(',').length; i++) {
                                    var fechaChk = $("#dpFechaPeriodoGral").attr("accesskey").split(',')[i];
                                    if (new Date(fechaChk.split('/')[2] + "-" + fechaChk.split('/')[1] + "-" + fechaChk.split('/')[0]) >= new Date("2013-11-30") && new Date(fechaChk.split('/')[2] + "-" + fechaChk.split('/')[1] + "-" + fechaChk.split('/')[0]) <= new Date(fechaP.split(',')[0] + "-" + fechaP.split(',')[1] + "-" + fechaP.split(',')[2]))
                                        agregarFecha = true;
                                    else
                                        agregarFecha = false;

                                    if (agregarFecha)
                                        cadena += arrayNombresRutasfiles[16].split('||')[1].split('&&&')[0] + fechaChk.split('/')[2].substring(2) + fechaChk.split('/')[1] + fechaChk.split('/')[0] + '&nbsp&nbsp&nbsp<input type="checkbox" disabled="disabled"  checked="checked"/>' + "</br>";
                                }

                                cadena += '</div>' +
                                            '<input type="button" value="Iniciar Procesar Calificación" class="classButton" style=" float:right;" onclick="BtnProcesarCalificacionComercial_Click(\'' + $(obj).attr("id").split("_")[1] + '\',\'' + $(obj).attr("id").split("_")[2].split("%%%")[0] + '\',\'' + $(obj).attr("id").split("_")[0] + '\',true, \'' + auxEstatus + '\');"/>' +
                                        '</fieldset>' +
                                        '</div>' +
                                        '</div>';
                                '</div>' +
                                '</div>';
                                $("#divCargaFileComplemento").empty();
                                $("#divCargaFileComplemento").html(cadena);
                                AgregarVtnFlotante("divCargaFileComplemento", "", "PROCESAR CALIFICACIÓN " + $(obj).attr("id").split("_")[2].split("%%%")[0], "", cadena, 300, 500, false, false, "", "", null);

                            } else {
                                $("#" + $(obj).attr("id").split("_")[1]).attr("class", "EstatusAmarillo");
                                var parametros = { fechaCorte: fechaP.split(",")[0] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[2], fase: 4, IdEstatus: 2, idMet: $(obj).attr("id").split("_")[0], user: userLogin, error: "", peridiocidad: periocidadSelectXUser, idPais: PaisSelectXUser };
                                peticionAjax('PanelDeControl.aspx/AgregaIndicadorTableroEtapaII', "POST", parametros,
                                function Finalizada_AgregaIndicadorTablero(dataADD) {
                                    if (dataADD.d.indexOf("ERRORCATCH") == -1) {
                                        var parametrosProcesoCalfMet = { fechaPeriodo: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], IdMet: $(obj).attr("id").split("_")[0], periodicidad: (periocidadSelectXUser), user: userLogin, idPais: PaisSelectXUser };
                                        peticionAjax('PanelDeControl.aspx/ProcesaCalificacionXMet', "POST", parametrosProcesoCalfMet, function ProcesaCalificacionXMet_Finish(dataProcesoCalfMet) {
                                            $("#div" + $(obj).attr("id").split("_")[1]).show();
                                            $("#div" + $(obj).attr("id").split("_")[1] + "_txt").show();
                                            ProgressBarArrmto(0, 0.2, $(obj).attr("id").split("_")[1], $(obj).attr("id").split("_")[0], true, false, false);
                                        }, null);
                                    }
                                    else MostrarMsj(dataADD.d, " AVISO " + $(obj).attr("id").split("_")[2].split("%%%")[0], false, true, false, "", "Aceptar", "", 340, 140, null, null, null);
                                }, null);
                            }
                        }
                        else if (data.d == "1") MostrarMsj("Existe un proceso de <span style='font-weight:bold;'>" + $(obj).attr("id").split("_")[2].split("%%%")[0] + "</span> en ejecución en el " + (data.d == "1" ? "TABLERO DE CONTROL MENSUAL" : data.d == "2" ? "TABLERO DE CONTROL SEMANAL" : "TABLERO DE CONTROL DIARIO") + ". Intente mas tarde. ", " AVISO " + $(obj).attr("id").split("_")[2].split("%%%")[0], false, true, false, "", "Aceptar", "", 340, 140, null, null, null);
                        else if (data.d.indexOf("ERRORCATCH") != -1) MostrarMsj(data.d, " AVISO " + $(obj).attr("id").split("_")[2].split("%%%")[0], false, true, false, "", "Aceptar", "", 340, 140, null, null, null);

                    }, null);
    }

    function BtnProcesarCalificacionComercial_Click(idObjetoTd, descMet, idMetodologia, esMasiva, auxEstatus) {
        var lanzarProcesarCalfSIC = true;
        if (esMasiva && $("#divCheckCargaMasiva").html() == "") {
            lanzarProcesarCalfSIC = false;
            WaitingVtn("divBloqVtnProcesaCalf", true, false, "Cargando Información...");
            MostrarMsj("No hay Fechas de Corte a Descargar.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
                $("#divVentanaMensajes").dialog("close");
            }, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnProcesaCalf", false, false, "");
            });
        }
        if (lanzarProcesarCalfSIC) {
            $("#divCargaFileComplemento").dialog("close");
            Waiting(true, "Espere por favor. Cargando Información...");
            $("#" + idObjetoTd).attr("class", "EstatusAmarillo");
            var parametros = { fechaPeriodo: fechaP.split(",")[0] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[2], periodicidad: periocidadSelectXUser, user: userLogin, idPais: PaisSelectXUser, esMasiva: esMasiva };
            peticionAjax('PanelDeControl.aspx/ProcesaCalificacionComercial', "POST", parametros,
            function Finalizada_AgregaIndicadorTablero(dataADD) {
                if (dataADD.d.indexOf("ERRORCATCH") != -1)
                    MostrarMsj(data.d, " AVISO " + descMet, false, true, false, "", "Aceptar", "", 340, 140, null, null, null);
                else if (auxEstatus == '6')
                {
                    var parametros =
                        {
                            fechaCorte: fechaP.split(",")[0] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[2],
                            fase: 4,
                            IdEstatus: 6,
                            idMet: idMetodologia,
                            user: userLogin,
                            error: "",
                            peridiocidad: periocidadSelectXUser,
                            idPais: PaisSelectXUser
                        };
                    peticionAjax('PanelDeControl.aspx/AgregaIndicadorTableroEtapaII', "POST", parametros,
                    function Finalizada_AgregaIndicadorTablero(dataADD) {
                        if (dataADD.d.indexOf("ERRORCATCH") != -1) {
                            MostrarMsj(dataADD.d, " AVISO " + $(obj).attr("id").split("_")[2].split("%%%")[0], false, true, false, "", "Aceptar", "", 340, 140, null, null, null);
                        }
                    }, null);
                }
                Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
        }
    }

    function ProcesarPosteriores_Click(obj) {
        var objId = $(obj).attr("id").split("_")[0];
        if ((objId == "15") || (objId == "19") || (objId == "23") || (objId == "24") || (objId == "25")) {
            var idTdExecute = $(obj).attr("id").split("_")[1].substring(0, $(obj).attr("id").split("_")[1].length - 1);

            if ($("#" + $(obj).attr("id").split("_")[1]).attr("class") == "EstatusAmarillo") {
                MostrarMsj("No se puede ejecutar el proceso de <span style='font-weight:bold;'>" + $(obj).attr("id").split("_")[2].split("%%%")[0] + "</span>. Existe uno en ejecución", " AVISO " + $(obj).attr("id").split("_")[2].split("%%%")[0], false, true, false, "", "Aceptar", "", 330, 140, null, null, null);
                return;
            }

            MostrarMsj("¿Está seguro que desea Iniciar el Proceso <span style='font-weight:bold;'>" + $(obj).attr("id").split("_")[2].split("%%%")[0] + "</span>? ", "Mensaje " + $(obj).attr("id").split("_")[2].split("%%%")[0], true, true, false, "Si", "No", "", 300, 120,
            function () {
                $("#divVentanaMensajes").dialog("close");
                var parametrosDesemp = { anio: fechaP.split(",")[0], mes: fechaP.split(",")[1], dia: fechaP.split(",")[2], IdMet: $(obj).attr("id").split("_")[0], periodicidad: periocidadSelectXUser, user: userLogin };
                peticionAjax('PanelDeControl.aspx/ProcesarDesempeño', "POST", parametrosDesemp, function (data) {
                    if (data.d == "") {
                        if (typeof idDiv != 'undefined') {
                            document.getElementById("div" + IdDiv).style.width = "0%";

                        }
                        document.getElementById("div" + IdDiv).style.width = "0%";
                        $("#div" + $(obj).attr("id").split("_")[1]).show();
                        $("#div" + $(obj).attr("id").split("_")[1] + "_txt").show();
                        $("#" + $(obj).attr("id").split("_")[1]).attr("class", "EstatusAmarillo")
                        ProgressBarArrmto(0, 0.2, $(obj).attr("id").split("_")[1], $(obj).attr("id").split("_")[0], true, false, false);
                    }
                }, null);
            }, function () {
                $("#divVentanaMensajes").dialog("close");
            }, null);
        }
    }

    function btnVerValidacionesMet_Click(obj) {
        var cadena = '<div id="divBloqVtnVerValidacionesMet" style="width:97%;height:94%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleFormularioVerValidacionesMet" style="width:100%;height:95%;overflow:hidden;text-align:center;float:left;">';
        cadena += '<div id="dvDetalleEITblVerValidacionesMet" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">  ';
        cadena += '</div></div>';
        $("#divVtnVerValidacioneMet").empty();
        AgregarVtnFlotante("divVtnVerValidacioneMet", "", "VALIDACIONES " + $(obj).attr("id").split("_")[3].split("%%%")[0], "", cadena, 550, 650, false, false, "", "", null);
        WaitingVtn("divBloqVtnVerValidacionesMet", true, true, "Cargando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "35%";
        var parametrosVerVal = { fase: parseInt($(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1)), idMet: parseInt($(obj).attr("id").split("_")[1]), fechaPeriodo: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], periodicidad: periocidadSelectXUser };

        peticionAjax("PanelDeControl.aspx/VerValidacionesMetodologias", "POST", parametrosVerVal, function (data) {
            WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "Cargando Información...");
            if (data.d == "" || data.d == null || data.d.indexOf("Error") != -1) {
                $('#dvDetalleEITblVerValidacionesMet').html("Sin Datos");
                $("#divVtnVerValidacioneMet").animate({ height: "50px" });
                $("#divVtnVerValidacioneMet").dialog("option", "width", "300");
                return;
            }
            var JSON = obtenerArregloDeJSON(data.d, false);
            var html = generarTablaDeRegistrosVerVal(JSON, $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1), $(obj).attr("id").split("_")[1]);
            $("#dvDetalleEITblVerValidacionesMet").html(html.split("%%%%")[0]);
            $("#chkHeader").attr("checked", (parseInt(html.split("%%%%")[1]) == JSON.length ? true : false))
        }, null);
    }


    function verIncidencias(obj) {
        var idFaseGet = $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1);
        var cadena = '<div id="divBloqVtnVerIncidencias" style="width:100%;height:100%;background:Gray;filter: alpha(opacity=80);opacity: 0.9;text-align: center;display:none"> </div><div style="width:100%;height:98%;overflow:hidden;text-align:center;float:left;">';
        cadena += '<div id="dvDetalleEITblVerIncidenciasMet" style="width:100%;height:' + ($(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1) != "8" ? "94" : "70") + '%;overflow: auto;margin-top: 0px;">  </div>';

        cadena += '</div>';
        $("#divVerIncidenciasMet").empty();

        AgregarVtnFlotante("divVerIncidenciasMet", "", "INCIDENCIAS " + $(obj).attr("id").split("_")[3].split("%%%")[0], "", cadena, ($(obj).attr("id").split("_")[1] != "1" ? 200 : 550), ($(obj).attr("id").split("_")[1] != "1" ? (screen.width > 1335 ? 300 : screen.width - 60) : (screen.width > 1335 ? 300 : screen.width - 60)), false, false, "", "", null);
        WaitingVtn("divBloqVtnVerIncidencias", true, true, "Cargando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "15%";
        var idMetV = $(obj).attr("id").split("_")[1];
        var parametrosVerVal = { fechaPeriodo: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], idMet: idMetV, fase: idFaseGet };
        peticionAjax("PanelDeControl.aspx/VerIncidenciasE5", "POST", parametrosVerVal, function (data) {
            WaitingVtn("divBloqVtnVerIncidencias", false, false, "Cargando Información...");
            if (data.d == "" || data.d == null || data.d == "Sin Datos") {
                $('#dvDetalleEITblVerIncidenciasMet').html("Sin Incidencias");
                $("#divVerIncidenciasMet").animate({ height: "50px" });
                $("#divVerIncidenciasMet").dialog("option", "width", "300");
                return;
            }
            $("#divVerIncidenciasMet").dialog("option", "width", "1335");

            var JSON = obtenerArregloDeJSON(data.d.split("%&&%")[0], false);
            var JSONSubLista = data.d.split("%&&%")[1] != undefined ? obtenerArregloDeJSON(data.d.split("%&&%")[1], false) : "";
            var JSONSubLista2 = data.d.split("%&&%")[2] != undefined ? obtenerArregloDeJSON(data.d.split("%&&%")[2], false) : "";
            if (JSONSubLista != "" && JSONSubLista2 != "") {

                if ((idMetV == "19") || (idMetV == "26") || (idMetV == "27") || (idMetV == "28") || (idMetV == "29")) {
                    $("#dvDetalleEITblVerIncidenciasMet").html(generaTablaIncidencias_Etapa_I_5_Ipab(JSON, JSONSubLista, JSONSubLista2, $(obj).attr("id").split('_')[1], idFaseGet));
                } else {
                    $("#dvDetalleEITblVerIncidenciasMet").html(generaTablaIncidencias_Etapa_I_5(JSON, JSONSubLista, JSONSubLista2, $(obj).attr("id").split('_')[1], idFaseGet));
                }
                $("#divVerIncidenciasMet").animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 20) + "px" });
                if (JSONSubLista.length < 15) {
                    bCambio = true;
                    EstablecerTamanioVtn_E5();
                }
                else {
                    bCambio = false;
                    $('#divVerIncidenciasMet').css('height', '200px');
                }



            }
            else {
                $("#dvDetalleEITblVerIncidenciasMet").html(CreaTablaIncidenciasMetodologia1(JSON, $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1), $(obj).attr("id").split("_")[1], false));
            }
        }, null);
    }

    function verIncidencias_3(obj) {
        var idFaseGet = $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1);
        var cadena = '<div id="divBloqVtnVerIncidencias" style="width:100%;height:100%;background:Gray;filter: alpha(opacity=80);opacity: 0.9;text-align: center;display:none"> </div><div style="width:100%;height:98%;overflow:hidden;text-align:center;float:left;">';
        cadena += '<div id="dvDetalleEITblVerIncidenciasMet" style="width:100%;height:' + (/*$(obj).attr("id").split("_")[1] == "1" &&*/$(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1) != "8" ? "94" : "70") + '%;overflow: auto;margin-top: 0px;">  </div>';
        if (($(obj).attr("id").split("_")[1] == "1" && idFaseGet != "8") || (idFaseGet == "8" && $(obj).attr("id").split("_")[1] != "7" && $(obj).attr("id").split("_")[1] != "8" && $(obj).attr("id").split("_")[1] != "9" && $(obj).attr("id").split("_")[1] != "1" && $(obj).attr("id").split("_")[1] != "10" && $(obj).attr("id").split("_")[1] != "11"))
            cadena += '<div id="divBtn" style="width:100%;height:5%;"><input type="button" class="classButton" value="Descargar Todas las Incidencias" onclick="DescargarTxtRegistrosAfectados(' + parseInt($(obj).attr("id").split("_")[1]) + ',\'\',\'INCIDENCIASCOMPLETO\',\'\',' + parseInt($(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1)) + ',false,\'' + ($(obj).attr("id").split("_")[3].split("%%%")[0] + "_FASE_" + $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1)) + '\',false);" /></div>'//btnVerIncidencias_1_18Td5_COMERCIAL - MET GRAL CNBV%%%1

        cadena += '</div>';
        $("#divVerIncidenciasMet").empty();
        AgregarVtnFlotante("divVerIncidenciasMet", "", "INCIDENCIAS " + $(obj).attr("id").split("_")[3].split("%%%")[0], "", cadena, ($(obj).attr("id").split("_")[1] != "1" ? 250 : 550), ($(obj).attr("id").split("_")[1] != "1" ? 700 : 750), false, false, "", "", null);
        WaitingVtn("divBloqVtnVerIncidencias", true, true, "Cargando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "15%";

        var parametrosVerVal = { fechaPeriodo: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], idMet: $(obj).attr("id").split("_")[1], fase: idFaseGet };
        peticionAjax("PanelDeControl.aspx/VerIncidenciasE5", "POST", parametrosVerVal, function (data) {
            WaitingVtn("divBloqVtnVerIncidencias", false, false, "Cargando Información...");
            if (data.d == "" || data.d == null || data.d == "Sin Datos") {
                $('#dvDetalleEITblVerIncidenciasMet').html("Sin Incidencias");
                $("#divVerIncidenciasMet").animate({ height: "50px" });
                $("#divVerIncidenciasMet").dialog("option", "width", "300");
                return;
            }
            var JSON = obtenerArregloDeJSON(data.d.split("%&&%")[0], false);
            var JSONSubLista = data.d.split("%&&%")[1] != undefined ? obtenerArregloDeJSON(data.d.split("%&&%")[1], false) : "";
            var JSONSubLista2 = data.d.split("%&&%")[2] != undefined ? obtenerArregloDeJSON(data.d.split("%&&%")[2], false) : "";
            if (JSONSubLista != "" && JSONSubLista2 != "") {
                $("#dvDetalleEITblVerIncidenciasMet").html(CreaTablaIncidencias(JSON, JSONSubLista, JSONSubLista2, $(obj).attr("id").split('_')[1], idFaseGet));
                for (var i = 0; i < arrayIdsTdSemaforoN1.length; i++)
                    $("#" + arrayIdsTdSemaforoN1[i].split("%%&&")[0]).html('<center><span class="' + (arrayIdsTdSemaforoN1[i].split("%%&&")[1] == "WARNING" ? 'EstatusNaranja' : 'EstatusRojo') + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center>');
                for (var i = 0; i < arrayIdsTdSemaforoN2.length; i++)
                    $("#" + arrayIdsTdSemaforoN2[i].split("%%&&")[0]).html('<center><span class="' + (arrayIdsTdSemaforoN2[i].split("%%&&")[1] == "WARNING" ? 'EstatusNaranja' : 'EstatusRojo') + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center>');

                $("#divVerIncidenciasMet").animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 20) + "px" });
                EstablecerTamanioVtn();
            }
            else {
                $("#dvDetalleEITblVerIncidenciasMet").html(CreaTablaIncidenciasMetodologia1(JSON, $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1), $(obj).attr("id").split("_")[1], false));
            }
        }, null);
    }

    //********************************************************************************************************************************************

    var sistema = "";
    function CreaTablaIncidencias(listaDeJSON, JSONSubLista, JSONSubLista2, metodologia, fase) {
        arrayIdsTdSemaforoN1 = new Array();
        arrayIdsTdSemaforoN2 = new Array();
        var cad = '<center><table id="tblIncidencias" width="100%" class="dataGridDatos">';
        cad += '<thead>';
        cad += '<tr valign="top">';
        cad += "<th></th>";
        var auxJSON = listaDeJSON[0];
        for (var encabezados in auxJSON) {
            cad += '<th valign="top">';
            cad += encabezados.toString();
            cad += '</th>';
        }
        cad += '<th >SEMAFORO</th>';
        cad += '</tr>';
        cad += '</thead>';
        cad += '<tbody>';
        for (var filas = 0; filas < listaDeJSON.length; filas++) {
            cad += ((filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + " alt='aa' onclick='MostarOcultarSubIncidencias(this);' id='tr_" + filas + "'>";
            var json = listaDeJSON[filas];
            cad += listaDeJSON[filas]["SISTEMA"] != "TOTAL:" ? '<td><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>' : "<td></td>";
            for (var element in json) {
                if (element != "FSIdFuente" && element != "FSIdValidacion") {
                    cad += '<td style="' + (element == "REGI AFECTADOS" ? 'text-align:right;' : 'text-align:left;') + (element == "SISTEMA" ? 'width: 26.5%;"' : '"') + '>';
                    cad += json[element];
                    cad += '</td>';
                }
            }
            cad += '<td id="td_' + filas + '"></td>';
            cad += '</tr>';
            if (listaDeJSON[filas]["SISTEMA"] != "TOTAL:") {
                valorSemaforoN1 = "WARNING";
                cad += CreaSubTablaIncidencias(JSONSubLista, JSONSubLista2, listaDeJSON[filas]["SISTEMA"], "", filas, true, metodologia, listaDeJSON[filas]["REG AFECTADOS"], fase);
                arrayIdsTdSemaforoN1.push("td_" + filas + "%%&&" + valorSemaforoN1);
            }
        }
        cad += '</tbody>';
        cad += '</table>';
        cad += '</center>';
        return cad;
    }

    var arrayIdsTdSemaforoN1 = new Array();
    var arrayIdsTdSemaforoN2 = new Array();
    var valorSemaforoN1 = "WARNING";
    var valorSemaforoN2 = "WARNING";
    function CreaSubTablaIncidencias(listaDeJSON, JSONSubLista2, sistema, negocio, filasPadre, agregarExpandir, metodologia, regAfectados, fase) {

        var cad = '<tr class="' + filasPadre + (agregarExpandir ? "" : "ItemN2") + '" style="display:none"><td colspan="' + (agregarExpandir ? "5" : "5") + '"><table style="width: 100%;"><thead><tr>';
        var auxJSON = listaDeJSON[0];
        var indexAux = "";
        var i = 0;
        for (var encabezados in auxJSON) {
            if ((encabezados != "SISTEMA" && agregarExpandir) || (encabezados != "SISTEMA" && encabezados != "NEGOCIO" && encabezados != "FSIdFuente" && encabezados != "FSIdValidacion" && encabezados != "IdReporte" && !agregarExpandir)) {
                if (i == 0) {
                    cad += agregarExpandir ? '<td></td><th style="text-align: center;background: rgb(0, 128, 128)"></th>' : '<td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>';
                    cad += '<th style="text-align: center;background: rgb(0, 128, 128)">' + encabezados.toString() + '</th>';
                }
                else {
                    cad += '<th style="text-align: center;background: rgb(0, 128, 128)">';
                    cad += encabezados.toString();
                    cad += '</th>';
                }
                i++;
            }
        }
        if (agregarExpandir)
            cad += '<th style="text-align: center;background: rgb(0, 128, 128)">SEMAFORO</th>';
        cad += '</tr>';
        cad += '</thead>';
        cad += '<tbody>';
        for (var filas = 0; filas < listaDeJSON.length; filas++) {

            var idReporte = listaDeJSON[filas].IdReporte;
            idReporte = idReporte != undefined && idReporte != "" && idReporte != null && parseInt(idReporte) != 0 ? idReporte : metodologia;

            if ((sistema == listaDeJSON[filas]["SISTEMA"] && agregarExpandir) || (!agregarExpandir && negocio == listaDeJSON[filas]["NEGOCIO"] && sistema == listaDeJSON[filas]["SISTEMA"])) {
                cad += "<tr " + (agregarExpandir ? 'style="display:none;cursor:pointer"' : '') + " class='" + filasPadre + (agregarExpandir ? "" : "ItemN2") + "'" + (agregarExpandir ? " alt='aa' onclick='MostarOcultarSubIncidencias(this);' id='tr_" + filas + "ItemN2'" : "") + ">";

                var json = listaDeJSON[filas];
                cad += agregarExpandir ? '<td></td><td><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>' : '<td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>';
                for (var element in json) {
                    if ((element != "SISTEMA" && agregarExpandir) || (element != "SISTEMA" && element != "NEGOCIO" && element != "FSIdFuente" && element != "FSIdValidacion" & element != "IdReporte" && !agregarExpandir)) {
                        cad += '<td style="' + (element == "REG AFECTADOS" ? 'text-align:right;' : 'text-align:left;') + (element == "CLAVE" ? "width: 27%;" : (element == "NEGOCIO" ? "width: 26%;" : (element == "NOMBRE" ? "width: 47%;" : ""))) + 'font-weight:normal;background:' + ((filas % 2 == 0 && agregarExpandir) ? "rgba(128, 128, 128, 0.46); " : (!agregarExpandir ? "rgba(128, 128, 128, 0.14);" : "rgba(128, 128, 128, 0.69);")) + '">';
                        if (element == "CLAVE")
                            cad += "<span style='text-decoration: underline;color: blue;cursor:pointer' title='Ver Cédula Validaciones' " + ('onclick="VerCedulaValidacioneEtapaII(\'' + listaDeJSON[filas].FSIdFuente + "\',\'" + listaDeJSON[filas].FSIdValidacion + "\',\'" + sistema + "\',\'" + listaDeJSON[filas].NOMBRE + "\',\'" + metodologia + "\',\'" + fase + '\',' + false + ');"') + ">" + json[element] + "</span>";
                        else if (element == "REG AFECTADOS" && !agregarExpandir)
                            cad += "<span style='text-decoration: underline;color: blue;cursor:pointer' title='Descargar archivo .csv' " + ('onclick="DescargarTxtRegistrosAfectados(\'' + idReporte + "\',\'" + listaDeJSON[filas].FSIdFuente + "\',\'" + listaDeJSON[filas].CLAVE + "\',\'" + negocio + "\',\'" + fase + '\',' + false + ",\'" + listaDeJSON[filas].NOMBRE + '\',false);"') + ">" + json[element] + "</span>";
                        else
                            cad += element != "SEMAFORO" ? json[element] : "<center><span class='" + (json[element] == "ERROR" ? "EstatusRojo" : "EstatusNaranja") + "' title='" + json[element] + "'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center>";
                    }
                    cad += '</td>';
                }
                if (agregarExpandir) {
                    cad += '<td id="td_' + filas + "_" + filasPadre + '" style="text-align:font-weight:normal;background:' + ((filas % 2 == 0 && agregarExpandir) ? "rgba(128, 128, 128, 0.46); " : (!agregarExpandir ? "rgba(128, 128, 128, 0.14);" : "rgba(128, 128, 128, 0.69);")) + '"></td>';
                }
                if (!agregarExpandir)
                    valorSemaforoN2 = listaDeJSON[filas]["SEMAFORO"] == "ERROR" && valorSemaforoN2 == "WARNING" ? listaDeJSON[filas]["SEMAFORO"] : valorSemaforoN2;

                cad += '</tr>';
                if (listaDeJSON[filas]["SISTEMA"] != "TOTAL:" && agregarExpandir) {
                    valorSemaforoN2 = "WARNING";
                    cad += CreaSubTablaIncidencias(JSONSubLista2, null, listaDeJSON[filas]["SISTEMA"], listaDeJSON[filas]["NEGOCIO"], filas, false, metodologia, listaDeJSON[filas]["REG AFECTADOS"], fase);
                    arrayIdsTdSemaforoN2.push("td_" + filas + "_" + filasPadre + "%%&&" + valorSemaforoN2);
                    valorSemaforoN1 = valorSemaforoN2 == "ERROR" && valorSemaforoN1 == "WARNING" ? valorSemaforoN2 : valorSemaforoN1;
                }
            }
        }
        if (!agregarExpandir)
            cad += '<tr><td></td><td style="background: rgba(128, 128, 128, 0.14);"></td><td style="background: rgba(128, 128, 128, 0.14);">TOTAL:</td><td style="background: rgba(128, 128, 128, 0.14);text-align: right;">' + regAfectados + '</td><td style="background: rgba(128, 128, 128, 0.14);"></td></tr>';
        cad += '</tbody></table></td></tr>';
        return cad;
    }
    //********************************************************************************************************************************************

    function resolucionPantalla() {
        var resolucion = 0;
        resolucion = screen.width;
        return resolucion;
    }

    function generaTablaIncidencias_Etapa_I_5_Ipab(listaDeJSON, JSONSubLista, JSONSubLista2, metodologia, fase, sOpcion) {
        var cont = listaDeJSON.length;
        var cad = '';
        var aux = '';
        var auxBool = false;

        cad += '<table style="width:1300px" id="tblIncidencias" class="dataGridDatos_PC">';

        cad += '  <tr style="font: Arial; font-size:10px; font-weight: bold; background:#4cada0; height:30px;">';
        cad += '       <td colspan="2" style="width:18px;"></td>';
        cad += '       <td colspan="2" style="width:350px;">SISTEMA</td>';
        cad += '       <td style="width:130px">REGISTROS CON ERROR</td>';
        cad += '       <td style="width:80px;">SEMAFORO</td>';
        cad += '  </tr>';


        for (var i = 0; i < listaDeJSON.length; i++) {
            var nombre = listaDeJSON[i]["SISTEMA"];
            var contAux = 2;
            for (var j = 0; j < JSONSubLista.length; j++) {
                if (nombre == JSONSubLista[j]["SISTEMA"]) {
                    if (aux.indexOf(nombre) < 0) {
                        aux += nombre;
                    }
                    cad += '  <tr class="' + j + 'ItemN1" style="font:Arial; font-size:10px;  font-weight: bold; background:#669EF1;cursor: pointer;" alt="aa" onclick="MostarOcultarSubIncidencias_E5(this);" id="tr_' + j + 'ItemN' + contAux + '">';
                    cad += '     <td colspan="2"><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>';
                    cad += '     <td colspan="2" style=" text-align: left;">&nbsp&nbsp&nbsp&nbsp' + JSONSubLista[j]["SISTEMA"] + '</td>';
                    cad += '     <td style="width:130px; text-align: right;">' + JSONSubLista[j]["REGISTROS AFECTADOS"] + '</td>';
                    cad += '     <td style="width:80px;"> <center><span class="' + (JSONSubLista[j]["FVCSimbologia"] == "ERROR" ? "EstatusRojo" : "EstatusNaranja") + '" title="' + JSONSubLista[j]["SISTEMA"] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center></td>';
                    cad += '  </tr>';
                    auxBool = false;
                    for (var x = 0; x < JSONSubLista2.length; x++) {
                        var registros2 = JSONSubLista2[x]["REGISTROS AFECTADOS"];
                        var registros = parseInt(registros2);
                        if (JSONSubLista[j]["SISTEMA"] == JSONSubLista2[x]["SISTEMA"]) {
                            cad += ' <tr class="' + j + 'ItemN' + contAux + '" style="font: Arial; font-size:10px; display: none; background:#F0F2EA; font: 9px Helvetica,Arial,sans-serif;">';
                            cad += '     <td style="background:white; width:10px;"></td>';
                            cad += '     <td style="background:white;"></td>';
                            cad += '     <td style="width:500px; text-align:left; ">&nbsp&nbsp<span style="text-decoration: underline;  text-align:left; color: blue; cursor: pointer" title="Ver Cédula Validaciones"' +
                                               ('onclick="VerCedulaValidacioneEtapaIII(\'' + JSONSubLista2[x]["FUENTE"] + "\',\'" + JSONSubLista2[x]["CLAVE"].split('-')[3] + "\',\'" + JSONSubLista2[x]["SISTEMA"] + "\',\'" + JSONSubLista2[x]["NOMBRE"] + "\',\'" + metodologia + "\',\'" + fase + '\',' + false + ');"') + ">" + JSONSubLista2[x]["CLAVE"] + "</span>"
                            cad += '     </td>'
                            cad += '     <td style="width:490px; text-align: left;">' + JSONSubLista2[x]["NOMBRE"] + '</td>';
                            cad += '     <td style="width:130px; text-align: right;"><span style="text-decoration: underline; color: blue; cursor: pointer" title="Descargar archivo .csv"' +
                                              ('onclick="DescargarTxtRegistrosAfectados_E5(\'' + metodologia + "\',\'" + JSONSubLista2[x]["FUENTE"] + "\',\'" + JSONSubLista2[x]["CLAVE"] + "\',\'" + JSONSubLista2[x]["SISTEMA"] + "\',\'" + JSONSubLista2[x]["CLAVE"].split('-')[2] + "\',\'" + false + "\',\'" + JSONSubLista2[x]["NOMBRE"] + '\',' + false + ');"') + ">" + (registros >= 10000 ? "+ Más de " : "") + registros + "</span>"
                            cad += '     </td>';
                            cad += '     <td style="width:80px"><center><span class="' + (JSONSubLista2[x]["FVCSimbologia"] == 'WARNING' ? 'EstatusNaranja' : 'EstatusRojo') + '" title="' + JSONSubLista2[x]["SEMAFORO"] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center></td>';
                            cad += ' </tr>';
                        }
                    }
                }
                contAux += 1;
            }
        }
        cad += '  <tr style="font:Arial; font-size:10px; font-weight:bold; background:rgba(191, 191, 191, 1); height:1px;">';
        cad += '     <td style="width:18px;  background:white;" colspan="2" ></td>';
        cad += '     <td style="width:350px;" colspan="2"></td>';
        cad += '     <td style="width:130px;"></td>';
        cad += '     <td style="width:80px;"></td>';
        cad += '  </tr>';

        cad += '  <tr style="font: Arial; font-size:10px; font-weight: bold; background:rgba(205, 176, 91, 1);">';
        cad += '     <td colspan="2" style=" background:white;"></td>';
        cad += '     <td colspan="2" style="width:350px;  background:white; text-align: right;">TOTAL</td>';
        cad += '     <td style="width:130px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["REGISTROS AFECTADOS"] + ' </td>';
        cad += '     <td style="width:80px; background:white;"></td>';
        cad += '  </tr>';


        cad += '</table>';
        return cad;
    }

    function generaTablaIncidencias_Etapa_I_5(listaDeJSON, JSONSubLista, JSONSubLista2, metodologia, fase, sOpcion) {
        var cont = listaDeJSON.length;
        var cad = '';
        var aux = '';
        var auxBool = false;
    
        cad += '<table style="width:1300px" id="tblIncidencias" class="dataGridDatos_PC">';

        cad += '  <tr style="font: Arial; font-size:10px; font-weight: bold; background:#4cada0; height:30px;">';
        cad += '       <td colspan="2" style="width:18px;"></td>';
        cad += '       <td colspan="2" style="width:350px;">SISTEMA</td>';
        cad += '       <td style="width:130px">REGISTROS CON ERROR</td>';
        cad += '       <td style="width:100px;">SALDO CON ERROR</td>';
        cad += '       <td style="width:120px;">PEDIDOS TOTALES</td>';
        cad += '       <td style="width:120px;">SALDO TOTAL</td>';
        cad += '       <td style="width:130px;">% CREDITOS CON ERROR</td>';
        cad += '       <td style="width:120px;">% SALDO CON ERROR</td>';
        cad += '       <td style="width:100px">INDICE DE CALIDAD</td>';
        cad += '       <td style="width:80px;">SEMAFORO</td>';
        cad += '  </tr>';

        for (var i = 0; i < cont - 1; i++) {
            var nombre = listaDeJSON[i]["SISTEMA"];
            cad += '  <tr style="font: Arial; font-size:10px; background:#669EF1;  font-weight: bold; cursor: pointer;"  alt="aa" onclick="MostarOcultarSubIncidencias_E6(this);" id="tr_' + i + 'ItemN1">';
            cad += '     <td colspan="2"><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>';
            cad += '     <td colspan="2" style="width:350px;  text-align: left;">' + listaDeJSON[i]["SISTEMA"] + '</td>';
            cad += '     <td style="width:130px; text-align: right;">' + listaDeJSON[i]["REGISTROS AFECTADOS"] + ' </td>';
            cad += '     <td style="width:100px; text-align: right;">' + listaDeJSON[i]["SALDO"] + '</td>';
            cad += '     <td style="width:120px; text-align: right;">' + listaDeJSON[i]["PEDIDOS TOTALES"] + '</td>';
            cad += '     <td style="width:120px; text-align: right;">' + listaDeJSON[i]["SALDO TOTAL"] + '</td>';
            cad += '     <td style="width:130px; text-align: right;">' + listaDeJSON[i]["CREDITOSCONERROR"] + '</td>';
            cad += '     <td style="width:120px; text-align: right;">' + listaDeJSON[i]["SALDOCONERROR"] + '</td>';
            cad += '     <td style="width:100px; text-align: right;">' + listaDeJSON[i]["INDICEDECALIDAD"] + '</td>';
            cad += '     <td style="width:80px;  "><center><span class="' + (JSONSubLista[i]["NEGOCIO"] == "ERROR" ? "EstatusRojo" : "EstatusNaranja") + '" title="' + JSONSubLista[0]["NEGOCIO"] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center></td>';
            cad += '  </tr>';
            var contAux = 2;
            for (var j = 0; j < JSONSubLista.length; j++) {
           
                if (nombre == JSONSubLista[j]["SISTEMA"]) {
                    if (aux.indexOf(nombre) < 0) {
                        aux += nombre;
                    }
                    cad += '  <tr class="' + i + 'ItemN1" style="font:Arial; font-size:10px;  font-weight: bold; background:#A7CD3C; display: none; cursor: pointer;" alt="aa" onclick="MostarOcultarSubIncidencias_E5(this);" id="tr_' + i + 'ItemN' + contAux + '">';
                    cad += '     <td colspan="2"><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>';
                    cad += '     <td colspan="2" style=" text-align: left;">&nbsp&nbsp&nbsp&nbsp' + JSONSubLista[j]["NEGOCIO"] + '</td>';
                    cad += '     <td style="width:130px; text-align: right;">' + JSONSubLista[j]["REGISTROS AFECTADOS"] + '</td>';
                    cad += '     <td style="width:100px; text-align: right;">' + JSONSubLista[j]["SALDO"] + '</td>';
                    cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista[j]["PEDIDOS TOTALES"] + '</td>';
                    cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista[j]["SALDO TOTAL"] + '</td>';
                    cad += '     <td style="width:130px; text-align: right;">' + JSONSubLista[j]["CREDITOSCONERROR"] + '</td>';
                    cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista[j]["SALDOCONERROR"] + '</td>';
                    cad += '     <td style="width:100px; text-align: right;">' + JSONSubLista[j]["INDICEDECALIDAD"] + '</td>';
                    cad += '     <td style="width:80px;"> <center><span class="' + (JSONSubLista[j]["NEGOCIO"] == "ERROR" ? "EstatusRojo" : "EstatusNaranja") + '" title="' + JSONSubLista[j]["NEGOCIO"] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center></td>';
                    cad += '  </tr>';

                    auxBool = false;
              
                    for (var x = 0; x < JSONSubLista2.length - 1; x++) {
                        if (JSONSubLista[j]["SISTEMA"] == JSONSubLista2[x]["SISTEMA"] && JSONSubLista[j]["NEGOCIO"] == JSONSubLista2[x]["NEGOCIO"]) {
                            cad += ' <tr class="' + i + 'ItemN' + contAux + '" style="font: Arial; font-size:10px; display: none; background:#F0F2EA; font: 9px Helvetica,Arial,sans-serif;">';
                            cad += '     <td style="background:white; width:10px;"></td>';
                            cad += '     <td style="background:white;"></td>';
                            cad += '     <td style="width:100px; text-align:left; ">&nbsp&nbsp<span style="text-decoration: underline;  text-align:left; color: blue; cursor: pointer" title="Ver Cédula Validaciones"' +
                                               ('onclick="VerCedulaValidacioneEtapaIII(\'' + JSONSubLista2[x]["FUENTE"] + "\',\'" + JSONSubLista2[x]["CLAVE"].split('-')[3] + "\',\'" + JSONSubLista2[x]["NEGOCIO"] + "\',\'" + JSONSubLista2[x]["NOMBRE"] + "\',\'" + metodologia + "\',\'" + fase + '\',' + false + ');"') + ">" + JSONSubLista2[x]["CLAVE"] + "</span>"
                            cad += '     </td>'
                            cad += '     <td style="width:290px; text-align: left;">' + JSONSubLista2[x]["NOMBRE"] + '</td>';
                            cad += '     <td style="width:130px; text-align: right;"><span style="text-decoration: underline; color: blue; cursor: pointer" title="Descargar archivo .csv"' +
                                              ('onclick="DescargarTxtRegistrosAfectados_E5(\'' + metodologia + "\',\'" + JSONSubLista2[x]["FUENTE"] + "\',\'" + JSONSubLista2[x]["CLAVE"] + "\',\'" + JSONSubLista2[x]["NEGOCIO"] + "\',\'" + JSONSubLista2[x]["CLAVE"].split('-')[2] + "\',\'" + false + "\',\'" + JSONSubLista2[x]["NOMBRE"] + '\',' + false + ');"') + ">" + JSONSubLista2[x]["REGISTROS AFECTADOS"] + "</span>"
                            cad += '     </td>';
                            cad += '     <td style="width:100px; text-align: right;">' + JSONSubLista2[x]["SALDO"] + '</td>';
                            cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista2[x]["PEDIDOS TOTALES"] + '</td>';
                            cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista2[x]["SALDO TOTAL"] + '</td>';
                            cad += '     <td style="width:130px; text-align: right;">' + JSONSubLista2[x]["CREDITOSCONERROR"] + '</td>';
                            cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista2[x]["SALDOCONERROR"] + '</td>';
                            cad += '     <td style="width:100px; text-align: right;">' + JSONSubLista2[x]["INDICEDECALIDAD"] + '</td>';
                            cad += '     <td style="width:80px"><center><span class="' + (JSONSubLista2[x]["SEMAFORO"] == 'WARNING' ? 'EstatusNaranja' : 'EstatusRojo') + '" title="' + JSONSubLista2[x]["SEMAFORO"] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center></td>';
                            cad += ' </tr>';
                        }
                    
                    }
                }
                contAux += 1;
            }
        }

        cad += '  <tr style="font:Arial; font-size:10px; font-weight:bold; background:rgba(191, 191, 191, 1); height:1px;">';
        cad += '     <td style="width:18px;  background:white;" colspan="2" ></td>';
        cad += '     <td style="width:350px;" colspan="2"></td>';
        cad += '     <td style="width:130px;"></td>';
        cad += '     <td style="width:100px;"></td>';
        cad += '     <td style="width:120px;"></td>';
        cad += '     <td style="width:120px;"></td>';
        cad += '     <td style="width:130px;"></td>';
        cad += '     <td style="width:120px;"></td>';
        cad += '     <td style="width:100px;"></td>';
        cad += '     <td style="width:80px;"></td>';
        cad += '  </tr>';

        cad += '  <tr style="font: Arial; font-size:10px; font-weight: bold; background:rgba(205, 176, 91, 1);">';
        cad += '     <td colspan="2" style=" background:white;"></td>';
        cad += '     <td colspan="2" style="width:350px;  background:white; text-align: right;">TOTAL</td>';
        cad += '     <td style="width:130px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["REGISTROS AFECTADOS"] + ' </td>';
        cad += '     <td style="width:100px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["SALDO"] + '</td>';
        cad += '     <td style="width:120px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["PEDIDOS TOTALES"] + '</td>';
        cad += '     <td style="width:120px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["SALDO TOTAL"] + '</td>';
        cad += '     <td style="width:130px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["CREDITOSCONERROR"] + '</td>';
        cad += '     <td style="width:120px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["SALDOCONERROR"] + '</td>';
        cad += '     <td style="width:100px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["INDICEDECALIDAD"] + '</td>';
        cad += '     <td style="width:80px; background:white;"></td>';
        cad += '  </tr>';


        cad += '</table>';
        return cad;
    }

    function MostarOcultarSubIncidencias_E6(obj) {
        if ($(obj).attr("alt") == "aa") {
            $("." + $(obj).attr("id").split("_")[1]).show();
            $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
            if (parseInt($("#divVerIncidenciasMet").parent().height()) < (parseInt(document.documentElement.clientHeight) - 550)) {
                EstablecerTamanioVtn_E5();
            }
        }
        else {
            var i = 0;
            $('#tblIncidencias tr').each(function () {
                $("." + ($(obj).attr("id").split("_")[1]).substring(0, 6) + i).hide();
                $("." + ($(obj).attr("id").split("_")[1])).attr("alt", "aa");
                if ($(this).find("td").eq(0).html().indexOf("collapse") != -1) {
                    $(this).find("td").eq(0).replaceWith('<td style="width: 20px;" colspan="2"><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"></td>');
                }
                i += 1;
            });
            EstablecerTamanioVtn_E5();
        }
        $(obj).attr("alt", ($(obj).attr("alt") == "aa" ? "ab" : "aa"));
    }

    function CreaTablaIncidenciasMetodologia1(listaDeJSON, fase, idMet, esSIC) {
        var encabezadoAux = '';
        var cad = '<center><table id="tblIncidencias" width="100%" class="dataGridDatos">';
        cad += '<thead>';
        cad += '<tr valign="top">';
        var auxJSON = listaDeJSON[0]; var numeroActivados = 0;
        for (var encabezados in auxJSON) {
            if (encabezados != "FINoColumna" && encabezados != "FnConcecutivoClave" && encabezados != "CAMPO, DATO VALIDADO") {
                cad += '<th valign="top">';
                cad += encabezados.toString();
                cad += '</th>';
            }
        }
        cad += '</tr>';
        cad += '</thead>';
        cad += '<tbody>';
        for (var filas = 0; filas < listaDeJSON.length; filas++) {
            cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
            var json = listaDeJSON[filas];
            for (var element in json) {
                if (element != "FINoColumna" && element != "FnConcecutivoClave" && element != "CAMPO, DATO VALIDADO") {
                    cad += '<td style="text-align:left;"' + '>';
                    if (element == "CLAVE")
                        cad += "<span style='text-decoration: underline;color: blue;cursor:pointer' title='Ver Cédula Validaciones' " + ('onclick="VerCedulaValidacioneEtapaII(\'' + listaDeJSON[filas].CLAVE + "\',\'" + "" + "\',\'" + sistema + "\',\'" + listaDeJSON[filas].NOMBRE + "\',\'" + idMet + "\',\'" + fase + "\'," + esSIC + ');"') + ">" + json[element] + "</span>";
                    else if (element == "REGISTROS AFECTADOS")
                        cad += "<span style='text-decoration: underline;color: blue;cursor:pointer' title='Descargar archivo .csv' " + ('onclick="DescargarTxtRegistrosAfectados(\'' + idMet + "\',\'" + "" + "\',\'" + listaDeJSON[filas].CLAVE + "\',\'" + "" + "\',\'" + fase + "\'," + esSIC + ",\'" + listaDeJSON[filas].NOMBRE + '\',false);"') + ">" + json[element] + "</span>";
                    else
                        cad += json[element];
                    cad += '</td>';
                }
            }
            cad += '</tr>';
        }
        cad += '</tbody>';
        cad += '</table></center>';
        return cad;
    }

    function DescargarTxtRegistrosAfectados_E5(idMet, idFuente, clave, negocio, fase, esSIC, nombre, esSICGral) {
        WaitingVtn("divBloqVtnVerIncidencias", true, true, "Cargando Información...");
        peticionAjax("PanelDeControl.aspx/linkRegistrosAfectadosDownloadTxt_Click", "POST", { fechaPeriodo: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], idMet: idMet, idFuente: (idFuente != "" && idFuente.indexOf('-') == -1 ? idFuente : 0), clave: clave, negocio: negocio, fase: fase, esSIC: esSIC, periodicidad: periocidadSelectXUser, esSICGral: esSICGral }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d != "" && parseInt(data.d.split('_')[0]) > 0) {
                    __doPostBack('ExportarTxtRegistrosAfectados', $("#dpFechaPeriodoGral").val() + "," + clave + "," + nombre + "," + data.d.split('_')[1]);
                    setTimeout(terminarWait, 10000);
                }
                else {
                    WaitingVtn("divBloqVtnVerValidacionesMet", true, false, "");
                    MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
                        WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
                        WaitingVtn("divBloqVtnVerIncidencias", false, false, "");
                        $("#divVentanaMensajes").dialog("close");
                    }, null);
                    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                        WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
                        WaitingVtn("divBloqVtnVerIncidencias", false, false, "");
                    });
                    return;
                }
            }
            else
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            WaitingVtn("divBloqVtnVerIncidencias", false, false, "Cargando Información...");
        });
    }

    function MostarOcultarSubIncidencias(obj) {
        if ($(obj).attr("alt") == "aa") {
            $("." + $(obj).attr("id").split("_")[1]).show();
            $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
            if (parseInt($("#divVerIncidenciasMet").parent().height()) < (parseInt(document.documentElement.clientHeight) - 550)) {
                EstablecerTamanioVtn();
            }
        }
        else {
            $("." + $(obj).attr("id").split("_")[1]).hide();
            $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
            EstablecerTamanioVtn();
        }
        $(obj).attr("alt", ($(obj).attr("alt") == "aa" ? "ab" : "aa"));
    }

    function EstablecerTamanioVtn() {
        $("#divVerIncidenciasMet").parent().animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 100) + "px" });
        $("#divVerIncidenciasMet").animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 70) + "px" });
        $("#divVerIncidenciasMet").parent().position({
            my: "center",
            at: "center",
            of: window
        });
    }

    function generarTablaDeRegistrosVerVal(listaDeJSON, fase, idMet) {
        var encabezadoAux = '';
        var cad = '<center><table id="tblValidaciones" width="100%" class="dataGridDatos">';
        Contador = 1;
        cad += '<thead>';
        cad += '<tr valign="top">';
        var auxJSON = listaDeJSON[0]; var numeroActivados = 0;
        for (var encabezados in auxJSON) {
            if (encabezados != "FSIdFuente" && encabezados != "FSIdValidacion" && encabezados != "id") {
                cad += '<th valign="top">';
                cad += encabezados == "APLICA" ? encabezados.toString() + '</br><input id="chkHeader" type="checkbox" onclick="AplicaValidacion_Checked(\'Encabezado\',this);" alt="' + fase + "_" + idMet + '"/>' : encabezados.toString();
                cad += '</th>';
            }
        }
        cad += '</tr>';
        cad += '</thead>';
        cad += '<tbody>';
        for (var filas = 0; filas < listaDeJSON.length; filas++) {
            cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
            var json = listaDeJSON[filas];
            for (var element in json) {
                if (element != "FSIdFuente" && element != "FSIdValidacion" && element != "id") {
                    if (element == "APLICA") {
                        cad += '<td style="text-align:center">';
                        cad += '<input id="chkCob_' + Contador + '" type="checkbox" onclick="AplicaValidacion_Checked(\'Cuerpo\',this);"  alt="' + listaDeJSON[filas].FSIdFuente + "_" + listaDeJSON[filas].FSIdValidacion + '" ' + (listaDeJSON[filas].APLICA == "1" ? ' checked="checked" ' : '') + '/>';
                        cad += '</td>';
                        numeroActivados = listaDeJSON[filas].APLICA == "1" ? numeroActivados + 1 : numeroActivados;
                    }
                    else {
                        cad += '<td style="text-align:left;' + (element == "VALIDACIÓN" || (element == "CLAVE" && (fase == 5 || fase == 6 || fase == 7 || fase == 8)) ? 'text-decoration: underline;color: blue;" onclick="VerCedulaValidacioneEtapaII(\'' + (listaDeJSON[filas].FSIdFuente != undefined ? listaDeJSON[filas].FSIdFuente : ((fase == 8) || (fase == 5 || fase == 6 && idMet == 1) ? listaDeJSON[filas].CLAVE : listaDeJSON[filas].id)) + "\',\'" + (listaDeJSON[filas].FSIdValidacion != undefined ? listaDeJSON[filas].FSIdValidacion : "") + "\',\'" + (listaDeJSON[filas].FUENTE != undefined ? listaDeJSON[filas].FUENTE : "") + "\',\'" + listaDeJSON[filas].VALIDACIÓN + "\',\'" + idMet + "\',\'" + fase + '\',' + false + ');"' : '"') + '>';
                        cad += json[element];
                        cad += '</td>';
                    }
                }
            }

            Contador = Contador + 1;
            cad += '</tr>';
        }
        cad += '</tbody>';
        cad += '</table></center>%%%%' + numeroActivados;
        return cad;
    }

    var arrayActualizarAplicaVal;
    function AplicaValidacion_Checked(Parte, obj) {
        arrayActualizarAplicaVal = new Array();
        var noFilas = $('#tblValidaciones > tbody > tr').length;
        var i = 0;
        var seleccionados = 0;

        if (Parte == 'Encabezado') {
            for (i = 1; i < noFilas + 1; i++) {
                if ($("#chkHeader").is(':checked') == false) {
                    $("#chkCob_" + i.toString()).attr('checked', false);
                    arrayActualizarAplicaVal.push("0_" + $("#chkCob_" + i.toString()).attr('alt'));
                }
                else {
                    $("#chkCob_" + i.toString()).attr('checked', true);
                    arrayActualizarAplicaVal.push("1_" + $("#chkCob_" + i.toString()).attr('alt'));
                }
            }
        } else {
            for (i = 1; i < noFilas + 1; i++) { $("#chkCob_" + i.toString()).is(':checked') == true ? (seleccionados = seleccionados + 1) : (seleccionados = seleccionados + 0); }
            seleccionados == noFilas ? $("#chkHeader").attr('checked', true) : $("#chkHeader").attr('checked', false);
            arrayActualizarAplicaVal.push(($(obj).is(':checked') ? "1_" : "0_") + $(obj).attr('alt'));
        }
        indiceActualiza = 0;
        WaitingVtn("divBloqVtnVerValidacionesMet", true, true, "Cargando Información...");
        ActualizarAplicaVal();
    }

    var indiceActualiza = 0;
    function ActualizarAplicaVal() {
        document.getElementById("imgVtnLoading").style.marginTop = "35%";
        var parametrosVerVal = { fase: $("#chkHeader").attr("alt").split("_")[0], idMet: $("#chkHeader").attr("alt").split("_")[1],
            fechaPeriodo: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], periodicidad: periocidadSelectXUser,
            aplicaVal: arrayActualizarAplicaVal[indiceActualiza].split("_")[0], aplicaVal: arrayActualizarAplicaVal[indiceActualiza].split("_")[0],
            idFuenteValAplica: arrayActualizarAplicaVal[indiceActualiza].split("_")[1],
            idValFuenteActivada: arrayActualizarAplicaVal[indiceActualiza].split("_")[2]
        };
        peticionAjax("PanelDeControl.aspx/TableroModificaEstatusValidacionMetodologias", "POST", parametrosVerVal, function (data) {
            if (data.d == "" || data.d == null) {
                WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "Cargando Información...");
                MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                return;
            }
            if (indiceActualiza < arrayActualizarAplicaVal.length - 1) {
                indiceActualiza++;
                ActualizarAplicaVal();
            }
            else {
                WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "Cargando Información...");
            }
        }, null);
    }

    var objEjecutarValidacionesMet;
    function btnEjecutarValidacionesMet_Click(obj) {
        objEjecutarValidacionesMet = obj;
        if ($("#" + $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1, 0) + "4").attr("class") == "EstatusAmarillo" ||
         $("#" + $(obj).attr("id").split("_")[2]).attr("class") == "EstatusAmarillo" ||
         $("#" + $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1, 0) + "6").attr("class") == "EstatusAmarillo") {
            MostrarMsj("Existe un proceso " + $(obj).attr("id").split('_')[3].split('%%%')[0] + " en ejecución. Intente mas tarde. ", " AVISO " + $(obj).attr("id").split('_')[3].split('%%%')[0], false, true, false, "", "Aceptar", "", 340, 140, null, null, null);
            return;
        }

        if ($(obj).attr("id").split("%%%")[1] == "1") {
            var cadena = '<div id="divBloqVtnProcesaCalf" style="width:97%;height:91.5%; z-index: 100;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
            cadena += '<div style="height: 94%;"> ' +
                                    '<div id="divVentanaCargaMasivaProcesoCalfTemp" style="height: 100%;">' +

                                     '<div style="width: 100%;height: 100%;">' +
                                      '<div style="height: 97%;width: 50%;display: inline-block; position: relative;float: left;">' +
                                       '<fieldset id="fieldCargaNormalSIC" style="border: 1px solid gray; padding: 10px;height: 90%;">' +
                                        '<legend style="font-weight: bold; text-align: left; font-size: 11px;">EJECUTAR VALIDACIONES NORMAL</legend>' +
                                        '<center>' +
                                            '<input type="button" value="Iniciar Procesar Calificación" class="classButton" onclick="LanzarEjecutarValidaciones(false,true);"/>' +
                                         '</center>' +
                                        '</fieldset>' +
                                       '</div>' +
                                       '<div style="width: 50%;height: 97%;display: inline-block; position: relative;float: right;">' +
                                        '<fieldset id="fieldCargaMasivaSIC" style="border: 1px solid gray; padding: 10px;height: 90%;">' +
                                           '<legend style="font-weight: bold; text-align: left; font-size: 11px;">EJECUTAR VALIDACIONES MASIVA</legend>' +
                                            '<div id="divCheckCargaMasiva" style="height:86%;overflow:auto;text-align: left;">';

            var agregarFecha = false;
            for (var i = 0; i < $("#dpFechaPeriodoGral").attr("accesskey").split(',').length; i++) {
                var fechaChk = $("#dpFechaPeriodoGral").attr("accesskey").split(',')[i];
                if (new Date(fechaChk.split('/')[2] + "-" + fechaChk.split('/')[1] + "-" + fechaChk.split('/')[0]) >= new Date("2013-11-30") && new Date(fechaChk.split('/')[2] + "-" + fechaChk.split('/')[1] + "-" + fechaChk.split('/')[0]) <= new Date(fechaP.split(',')[0] + "-" + fechaP.split(',')[1] + "-" + fechaP.split(',')[2]))
                    agregarFecha = true;
                else
                    agregarFecha = false;

                if (agregarFecha)
                    cadena += arrayNombresRutasfiles[16].split('||')[1].split('&&&')[0] + fechaChk.split('/')[2].substring(2) + fechaChk.split('/')[1] + fechaChk.split('/')[0] + '&nbsp&nbsp&nbsp<input type="checkbox" disabled="disabled"  checked="checked"/>' + "</br>";
            }

            cadena += '</div>' +
                        '<input type="button" value="Iniciar Procesar Calificación" class="classButton" style=" float:right;" onclick="LanzarEjecutarValidaciones(true,true);"/>' +
                      '</fieldset>' +
                     '</div>' +
                    '</div>';
            '</div>' +
                 '</div>';
            $("#divCargaFileComplemento").empty();
            $("#divCargaFileComplemento").html(cadena);
            AgregarVtnFlotante("divCargaFileComplemento", "", "EJECUTAR VALIDACIONES " + $(obj).attr("id").split("_")[3].split("%%%")[0], "", cadena, 300, 500, false, false, "", "", null);

        } else
            LanzarEjecutarValidaciones(false,false);
    }

    function LanzarEjecutarValidaciones(esMasiva, esSIC) {
        if (esSIC) {
            var lanzarEjecutarValidaciones = true;
            if (esMasiva && $("#divCheckCargaMasiva").html() == "") {
                lanzarEjecutarValidaciones = false;
                WaitingVtn("divBloqVtnProcesaCalf", true, false, "Cargando Información...");
                MostrarMsj("No hay Fechas de Corte a Descargar.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
                    $("#divVentanaMensajes").dialog("close");
                }, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnProcesaCalf", false, false, "");
                });
            }
            if (lanzarEjecutarValidaciones) {
                var parametros = { nameJob: "EjecutarValidacionesComercialFase" + $(objEjecutarValidacionesMet).attr("id").split("_")[2].substring($(objEjecutarValidacionesMet).attr("id").split("_")[2].length - 1), Tipoconexion: '35' };
                peticionAjax("PanelDeControl.aspx/DevuelveSP_ExisteJobActivo", "POST", parametros,
                    function (result) {
                        if (result.d == "false") {
                            $("#divCargaFileComplemento").dialog("close");
                            LanzarEjecutarValidacionesPaso2(esMasiva);
                        }
                        else {
                            WaitingVtn("divBloqVtnProcesaCalf", true, false, "Cargando Información...");
                            MostrarMsj("Existe un Job En Ejecución de la Fase:" + $(objEjecutarValidacionesMet).attr("id").split("_")[2].substring($(objEjecutarValidacionesMet).attr("id").split("_")[2].length - 1), "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
                                $("#divVentanaMensajes").dialog("close");
                            }, null);
                            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                                WaitingVtn("divBloqVtnProcesaCalf", false, false, "");
                            });
                        }
                    }, null);
            }
        }
        else {
            if ($(objEjecutarValidacionesMet).attr("id").split("_")[1] == "19") {
                var parametros = { nameJob: "JobValidacionesIPAB_FaseV", Tipoconexion: '164' };
                peticionAjax("PanelDeControl.aspx/DevuelveSP_ExisteJobActivo", "POST", parametros,
                    function (result) {
                        if (result.d == "false") {
                            $("#divCargaFileComplemento").dialog("close");
                            LanzarEjecutarValidacionesPaso2(esMasiva);
                        }
                        else {
                            WaitingVtn("divBloqVtnProcesaCalf", true, false, "Cargando Información...");
                            MostrarMsj("Existe un Job En Ejecución de la Fase:" + $(objEjecutarValidacionesMet).attr("id").split("_")[2].substring($(objEjecutarValidacionesMet).attr("id").split("_")[2].length - 1), "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
                                $("#divVentanaMensajes").dialog("close");
                            }, null);
                            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                                WaitingVtn("divBloqVtnProcesaCalf", false, false, "");
                            });
                        }
                    }, null);
            }
            else
                LanzarEjecutarValidacionesPaso2(esMasiva);
        }
    }

    function LanzarEjecutarValidacionesPaso2(esMasiva) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var idMetEjeVal = $(objEjecutarValidacionesMet).attr("id").split("_")[1];
        var parametrosEjecutarValidaciones = { fechaPeriodo: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], periodicidad: periocidadSelectXUser, fase: $(objEjecutarValidacionesMet).attr("id").split("_")[2].substring($(objEjecutarValidacionesMet).attr("id").split("_")[2].length - 1), idsMet: idMetEjeVal + "," + (esMasiva ? "|MASIVA" : "|"), usuario: userLogin };
        peticionAjax("PanelDeControl.aspx/TableroEjecutaValidacionesMetodologias", "POST", parametrosEjecutarValidaciones, function (data) {
            if (data.d != "GOOD")
                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 150, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }

    function ActualizaEstatusCheckPadreHijosOmitir(IdMet, TdACargaCtrls) {
        var parametros = { escenario: 'Default', idPais: PaisSelectXUser };
        peticionAjax('PanelDeControl.aspx/ObtenerRelacionesProcesosCalf', "POST", parametros,
                function LlenaAreglosMEtodologiasReportes(data) {
                    if (data.d != "") {
                        DefinicionesMetodologiaTemp = new Array();
                        var arrayJSONMet = data.d.split("%&&%")[0].split("||");
                        for (var x = 0; x < arrayJSONMet.length; x++) {
                            arrayJSONMet[x] = $.parseJSON(arrayJSONMet[x].toString());
                            if (arrayJSONMet[x].Clasificacion == "CARTERA")
                                DefinicionesMetodologiaTemp.push(arrayJSONMet[x].Metodologia + '%%%' + arrayJSONMet[x].IdMet + '&&' + arrayJSONMet[x].Clasificacion + '&&' + arrayJSONMet[x].OmitirCalf + '&&' + arrayJSONMet[x].OmitirValF4 + '&&' + arrayJSONMet[x].OmitirValF5 + '&&' + arrayJSONMet[x].InicioAutomatic);
                        }

                        DefinicionesReporteriaTemp = new Array();
                        if (data.d.indexOf('SinDatos') == -1 && data.d.split("%&&%")[1] != "") {
                            arrayJSONRep = data.d.split("%&&%")[1].split("||");
                            for (var x = 0; x < arrayJSONRep.length; x++) {
                                arrayJSONRep[x] = $.parseJSON(arrayJSONRep[x].toString());
                                DefinicionesReporteriaTemp.push(arrayJSONRep[x].Reporte + '%%%' + arrayJSONRep[x].IdReporte + '&&' + arrayJSONRep[x].Tipo + '&&' + arrayJSONRep[x].OmitirValF8 + '&&' + arrayJSONRep[x].EnvioAutomatico + '&&' + arrayJSONRep[x].InicioAutomatico);
                            }
                        }
                        if (IndicePestaniaHabilitadaO != 0 && IndicePestaniaHabilitadaO != 1 && IndicePestaniaHabilitadaO != 2 && IndicePestaniaHabilitadaO != 3) {
                            var statusCkeck = ""; var ArrayDefiniciones = OpcionCargada == 'Met' ? DefinicionesMetodologiaTemp : DefinicionesReporteriaTemp;
                            for (var i = 0; i < ArrayDefiniciones.length; i++) {
                                if (parseInt(IdMet) == ArrayDefiniciones.length) {
                                    AsignaEstatusCheckPadresOmitir(IndicePestaniaHabilitadaO, ArrayDefiniciones);
                                }
                                if (IdMet == ArrayDefiniciones[i].split("&&")[0].split("%%%")[1]) {
                                    statusCkeck = IndicePestaniaHabilitadaO == 4 || IndicePestaniaHabilitadaO == 7 ? ArrayDefiniciones[i].split("&&")[2] : (IndicePestaniaHabilitadaO == 5 || IndicePestaniaHabilitadaO == 8 ? ArrayDefiniciones[i].split("&&")[3] : (ArrayDefiniciones[i].split("&&")[4] + "," + ArrayDefiniciones[i].split("&&")[5]));
                                }
                            }
                            var srcImgs = "../../Images/PanelDeControl/Expander/" + (statusCkeck.split(",")[0] == "0" ? "uncheck" : "checkG") + ".png";
                            var idPadreImg = IndicePestaniaHabilitadaO == 4 ? "Calf" : (IndicePestaniaHabilitadaO == 5 ? "Val1" : (IndicePestaniaHabilitadaO == 6 ? "Val2" : (IndicePestaniaHabilitadaO == 7 ? "" : (IndicePestaniaHabilitadaO == 8 ? "Val4" : "Val5")))); //Aqui
                            $("#imgchkOmitir" + idPadreImg + "_" + (TdACargaCtrls) + "_" + IdMet).attr("src", srcImgs);
                            $("#imgchkOmitir" + idPadreImg + "_" + (TdACargaCtrls) + "_" + IdMet).attr("lang", (statusCkeck.split(",")[0] == "0" ? "aa" : "ab"));
                            if (IndicePestaniaHabilitadaO == 6 || IndicePestaniaHabilitadaO == 9) {
                                srcImgs = "../../Images/PanelDeControl/Expander/" + (statusCkeck.split(",")[1] == "0" ? "uncheck" : "checkG") + ".png";
                                $("#imgchkOmitirVal" + (IndicePestaniaHabilitadaO == 6 ? "3" : "6") + "_" + (TdACargaCtrls) + "_" + IdMet).attr("src", srcImgs);
                                $("#imgchkOmitirVal" + (IndicePestaniaHabilitadaO == 6 ? "3" : "6") + "_" + (TdACargaCtrls) + "_" + IdMet).attr("lang", (statusCkeck.split(",")[1] == "0" ? "aa" : "ab"));
                            }
                        }
                        //ColocaEstatus Check Padres   
                        for (var ii = 4; ii < 7; ii++) {
                            AsignaEstatusCheckPadresOmitir(ii, DefinicionesMetodologiaTemp);
                        }
                        for (var ii = 7; ii < 10; ii++) {
                            AsignaEstatusCheckPadresOmitir(ii, DefinicionesReporteriaTemp);
                        }
                    }
                }
                , null);
    }

    function AgregaListBoxFuentesCarteraAProcesar(itemArregloFuenteCartForListBox) {
        var cadena = "<td><table style=' background: #494949'>";
        for (var i = 1; i < itemArregloFuenteCartForListBox.split("_&").length; i++) {
            var valorF1 = itemArregloFuenteCartForListBox.split("_&")[i].split("&&")[1].split(",")[0];
            var valorF2 = itemArregloFuenteCartForListBox.split("_&")[i].split("&&")[1].split(",")[0];
            var valorF3 = itemArregloFuenteCartForListBox.split("_&")[i].split("&&")[1].split(",")[0];
            var isDisabled = ((valorF1 == "EstatusVerde" || valorF1 == "EstatusNaranja") && (valorF2 == "EstatusVerde" || valorF2 == "EstatusNaranja") && (valorF3 == "EstatusVerde" || valorF3 == "EstatusNaranja")) ? false : true;

            if (ExisteItemEnArreglo(itemArregloFuenteCartForListBox.split("_&")[i].split("&&")[0], DefinicionesFuentesCartera)) {
                cadena += "<tr><td ><input type='checkbox' " + (isDisabled ? "disabled='disabled'" : "") + " />" + itemArregloFuenteCartForListBox.split("_&")[i].split("&&")[0] + "</td></tr>";
            }
        }
        return cadena + "</table></td>";
    } 
