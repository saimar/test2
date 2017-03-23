//arregloFuenteIdTdControles
function CargaControlesReportes(arregloIterar) {
    for (var i = 0; i < arregloIterar.length; i++) {
        var numRepF7 = 0; var numRepF8 = 0; var numRepF9 = 0;
        var entroCiclo = false; var DefReporte = "";
        var IdReporte; var agregarReprocesoF7 = false; agregarReprocesoF8 = false; agregarReprocesoF9 = false; vecesEntro = 0; var EstatusBloqueo;
        for (var u = 0; u < ArrayReportesEstatus.length; u++) {
            if (ArrayReportesEstatus[u].split("&&")[0].split("%%%")[1] == arregloIterar[i].split('&&')[0])
                EstatusBloqueo = ArrayReportesEstatus[u].split("&&")[4];
            if (ArrayReportesEstatus[u].split("&&")[0].split("%%%")[1] == arregloIterar[i].split('&&')[0] && ArrayReportesEstatus[u].split("&&")[1] != "0") {
                IdReporte = ArrayReportesEstatus[u].split("&&")[4];
                if (ArrayReportesEstatus[u].split("&&")[1] == "7") { numRepF7 = ArrayReportesEstatus[u].split("&&")[3]; agregarReprocesoF7 = true; }
                if (ArrayReportesEstatus[u].split("&&")[1] == "8") { numRepF8 = ArrayReportesEstatus[u].split("&&")[3]; agregarReprocesoF8 = true; }
                if (ArrayReportesEstatus[u].split("&&")[1] == "9") { numRepF9 = ArrayReportesEstatus[u].split("&&")[3]; agregarReprocesoF9 = true; }
                vecesEntro++;
                entroCiclo = true;
                DefReporte = ArrayReportesEstatus[u].split("&&")[0].split("%%%")[0];
            }
            else if (ArrayReportesEstatus[u].split("&&")[0].split("%%%")[1] == arregloIterar[i].split('&&')[0] && ArrayReportesEstatus[u].split("&&")[1] == "0") { entroCiclo = true; DefReporte = ArrayReportesEstatus[u].split("&&")[0].split("%%%")[0]; break; }
            else if (entroCiclo) break;
        }

        var clasificacion = "";
        for (var c = 0; c < DefinicionesReporteria.length; c++) {
            if (arregloIterar[i].split('&&')[0] == DefinicionesReporteria[c].split("%%%")[1].split("&&")[0]) {
                clasificacion = DefinicionesReporteria[c].split("&&")[1];
                DefReporte = DefinicionesReporteria[c].split("%%%")[0];
                break;
            }
        }

        var itemArregloFuenteCartForListBox = new Array();
        for (var ar = 0; ar < DefinicionesAgrupacionesReportes.length; ar++) {
            if (arregloIterar[i].split('&&')[0] == DefinicionesAgrupacionesReportes[ar].split('&&')[0])
                itemArregloFuenteCartForListBox.push(DefinicionesAgrupacionesReportes[ar].split('&&')[1] + "&&" + DefinicionesAgrupacionesReportes[ar].split('&&')[2] + "&&" + DefinicionesAgrupacionesReportes[ar].split('&&')[0] + "&&" + DefinicionesAgrupacionesReportes[ar].split('&&')[3]);

        }
        for (var ii = 7; ii < 10; ii++) {
            if (ii > 6 && ii < 10) {
                var tdObtenido = (parseInt(arregloIterar[i].split("&&")[1]) + 1) + "Td" + ii;
                escargaNew = true;
                DeterminaControlesAgregadosAReportes(tdObtenido, IndicePestaniaHabilitadaO == ii ? 0 : 1, ii == 7 ? numRepF7 : (ii == 8 ? numRepF8 : numRepF9), itemArregloFuenteCartForListBox, arregloIterar[i].split('&&')[0], parseInt(arregloIterar[i].split("&&")[1]) + "Td" + ii, DefReporte, ii == 7 ? agregarReprocesoF7 : (ii == 8 ? agregarReprocesoF8 : agregarReprocesoF9), EstatusBloqueo, clasificacion);
            }
        }
    }
}

function DeterminaControlesAgregadosAReportes(TdACargaCtrls, indiceOpcion, reprocesos, itemArregloFuenteCartForListBox, IdReporte, TdProgressB, DefReporte, agregarBtnReproceso, EstatusBloqueo, clasificacion) {
    if (indiceOpcion == 0) AgregaControlesreportes_Expandido(IndicePestaniaHabilitadaO, reprocesos, TdACargaCtrls, itemArregloFuenteCartForListBox, IdReporte, TdProgressB, DefReporte, agregarBtnReproceso, EstatusBloqueo, clasificacion)
    else AgregaControlesReportes_Collapsado(IndicePestaniaHabilitadaO, reprocesos, TdACargaCtrls, IdReporte);
}

function AgregaControlesReportes_Collapsado(indicePestania, numeroBotonesRep, TdACargaCtrls, IdReporte) {
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

var arregloIdsImgsOmitirValidF8; var arregloIdsImgsEnvioAutomatico; var arregloIdsInicioAutomaticoRep;
function AgregaControlesreportes_Expandido(indicePestania, numeroBotonesRep, TdACargaCtrls, itemArregloFuenteCartForListBox, IdReporte, TdProgressB, DefReporte, agregarBtnReproceso, estatusBloqueo, clasificacion) {
    var ir= IdReporte;
    if (document.getElementById("divContenedor_" + TdACargaCtrls) == null) {
        var cadena = "<div id='divContenedor_" + TdACargaCtrls + "' lang='aa' style='width:100%;height:100%'></div>";
        $("#" + TdACargaCtrls).html(cadena);
    }
    if ($("#TablaContenidoExpanded_" + TdACargaCtrls).html() == null) {
        var cadena = "<table id='TablaContenidoExpanded_" + TdACargaCtrls + "' style='display: none;width:100%;height:100%;'><tr id='trMiniAcordeon' style='width:100%;height:100%;'> <td id='TdEncabezado_" + TdACargaCtrls + "_1' lang='aa' style='width:5%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitadaO >= 0 && IndicePestaniaHabilitadaO <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitadaO >= 4 && IndicePestaniaHabilitadaO <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'> <p class='p' style='margin-top: 28px;font-size: 9px;margin-left: 14px;'> " + (IndicePestaniaHabilitadaO == 4 ? "CTRL PROCESO" : (IndicePestaniaHabilitadaO == 7 ? "CTRL REPORTES" : "DETALLE")) + "</p></td><td id='TdContenido_" + TdACargaCtrls + "_1' class='Gris_Gde' style='width:90%;height:100%;'>";
        cadena += "<div style='height: 100%;overflow-y: auto;overflow-x: hidden;'><table  style='width:100%;' width='0' border='0'><tr><td><table width='0' border='0' id='TablaBotonesExpanded_" + TdACargaCtrls + "' >";
        cadena += "<tr><td><div style='width:350px;height:auto; overflow:auto;'><table width='0' border='0' id='TablaBotonesReprocesoExpanded_" + TdACargaCtrls + "' ><tr>";
        for (var i = numeroBotonesRep; i >= 0; i--) {
            if (agregarBtnReproceso) cadena += "<td > <div class='BtnReproceso' id='btn_" + TdACargaCtrls + "_" + IdReporte + "_" + DefReporte + "_" + i + "' onclick='HistorialReprocesosReportes_Click(this);'><div class='TxtBtnReproceso'>" + i + "</div> </div></td>";
        }
        cadena += "</tr></table></div></td></tr>";

        var statusCkeck = "";
        for (var i = 0; i < DefinicionesReporteriaTemp.length; i++) {
            if (parseInt(IdReporte) == DefinicionesReporteriaTemp.length) {
                AsignaEstatusCheckPadresOmitir(IndicePestaniaHabilitadaO, DefinicionesReporteriaTemp);
            }
            if (IdReporte == DefinicionesReporteriaTemp[i].split("&&")[0].split("%%%")[1]) {
                statusCkeck = IndicePestaniaHabilitadaO == 7 ? "" : (IndicePestaniaHabilitadaO == 8 ? DefinicionesReporteriaTemp[i].split("&&")[3] : (DefinicionesReporteriaTemp[i].split("&&")[4] + "," + DefinicionesReporteriaTemp[i].split("&&")[5]));
            }
        }
        var srcImgs = "../../Images/PanelDeControl/Expander/" + (statusCkeck.split(",")[0] == "0" ? "uncheck" : "checkG") + ".png";
        var idPadreImg = IndicePestaniaHabilitadaO == 7 ? "" : (IndicePestaniaHabilitadaO == 8 ? "Val4" : "Val5");
        if (IndicePestaniaHabilitadaO == 7) {
            if (IdReporte == 105) {
                if (itemArregloFuenteCartForListBox.length > 0)
                    cadena += "<tr>" + AgregaBtnsReportesAgrupacionProcesarIPAB(itemArregloFuenteCartForListBox, TdProgressB) + "</tr>";
                else {
                    cadena += "<tr><td style=width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;' align='left'><input type='button' id='" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "_" + clasificacion + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Iniciar Generar Reporte' onclick='btnProcesarReporte_Click(this)'/>";
                    cadena += IdReporte == "12" ? "&nbsp&nbsp&nbsp<input type='button' id='btnDescarga_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "_" + clasificacion + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Descarga Reporte' onclick='btnDescargaReporte_Click(this)'/>" : "";
                    cadena += "</td>";
                }
            }
            else {
                if (itemArregloFuenteCartForListBox.length > 0)
                    cadena += "<tr>" + AgregaBtnsReportesAgrupacionProcesar(itemArregloFuenteCartForListBox, TdProgressB) + "</tr>";
                else {
                    if (DefReporte == 'GAR 450') {
                        cadena += "<tr><td style=width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;' align='left'><input type='button' id='" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "_" + clasificacion + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Iniciar Generar Reporte' onclick='btnOpcionesBtnsListaReportes_Click(this,0, \"" + DefReporte + "\")'/>";
                        cadena += IdReporte == "12" ? "&nbsp&nbsp&nbsp<input type='button' id='btnDescarga_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "_" + clasificacion + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Descarga Reporte' onclick='btnDescargaReporte_Click(this)'/>" : "";
                        cadena += "</td>";
                    }
                    else {
                        cadena += "<tr><td style=width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;' align='left'><input type='button' id='" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "_" + clasificacion + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Iniciar Generar Reporte' onclick='btnProcesarReporte_Click(this)'/>";
                        cadena += IdReporte == "12" ? "&nbsp&nbsp&nbsp<input type='button' id='btnDescarga_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "_" + clasificacion + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Descarga Reporte' onclick='btnDescargaReporte_Click(this)'/>" : "";
                        cadena += "</td>";
                    }
                }
            }
        }

        if (IndicePestaniaHabilitadaO != 7 && PerfilUser != "35" && PerfilUser != "17" && IdReporte != 105) {
            arregloIdsImgsOmitirValidF8.push("imgchkOmitir" + idPadreImg + "_" + TdACargaCtrls + "_" + IdReporte);
            cadena += '<tr><td><table><tr><td style="width: 30%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;" align="left"> <span> &nbsp &nbsp<span> <img  src="' + srcImgs + '" id="imgchkOmitir' + idPadreImg + "_" + (TdACargaCtrls) + "_" + IdReporte + '" alt="aa" lang="' + (statusCkeck.split(",")[0] == "0" ? "aa" : "ab") + '" onclick="imgChech_ckeck(this)" style="width: 12px; height: 12px" />' + (IndicePestaniaHabilitadaO == 8 ? 'OMITIR VALIDACIÓN' : 'ENVIÓ AUTOMÁTICO') + '</td>';
        }
        if (IndicePestaniaHabilitadaO == 9 && PerfilUser != "35" && PerfilUser != "17" && IdReporte != 105) {
            arregloIdsImgsEnvioAutomatico.push("imgchkOmitir" + idPadreImg + "_" + TdACargaCtrls + "_" + IdReporte);
            srcImgs = "../../Images/PanelDeControl/Expander/" + (statusCkeck.split(",")[1] == "0" ? "uncheck" : "checkG") + ".png";
            cadena += '<td style="width: 80%; height: 50%; color: White; font: normal 9px Helvetica, Arial, sans-serif;" align="left"> <span> &nbsp &nbsp<span> <img  src="' + srcImgs + '" id="imgchkOmitirVal6_' + TdACargaCtrls + "_" + IdReporte + '" alt="aa" lang="' + (statusCkeck.split(",")[1] == "0" ? "aa" : "ab") + '" onclick="imgChech_ckeck(this)" style="width: 12px; height: 12px" />INICIO AUTOMÁTICO</td></tr></table></td></tr>';
            arregloIdsInicioAutomaticoRep.push("imgchkOmitirVal3_" + TdACargaCtrls + "_" + IdReporte);
        }

        cadena += (IndicePestaniaHabilitadaO == 8 && clasificacion == "REPORTES REGULATORIOS") ? (itemArregloFuenteCartForListBox.length > 0 ? ("</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + AgregaBtnsFase8ListaResportesAgrup(itemArregloFuenteCartForListBox, TdProgressB)) :
             ("</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + "<td  align='left'>" +
            "<input type='button' alt='" + IndicePestaniaHabilitadaO + "' id='btnVerValidacionesMet_" + IdReporte + "_" + TdACargaCtrls + "_" + DefReporte + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='btnVerValidacionesMet_Click(this)'  value='Catálogo de validaciones'/> <span> &nbsp &nbsp<span>" +
            "<input type='button' alt='" + IndicePestaniaHabilitadaO + "' id='btnEjecutarValidacionesMet_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='btnOpcionesBtnsListaReportes_Click(this,5)'  value='Ejecutar Validaciones'/><span> &nbsp &nbsp<span>" +
            "<input type='button' alt='" + IndicePestaniaHabilitadaO + "' id='btnVerIncidencias_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='verIncidencias(this);'  value='Ver Incidencias'/></td>")) : "";


        if (IndicePestaniaHabilitadaO == 9 && IdReporte == 13) {
            cadena += (IndicePestaniaHabilitadaO == 9 && clasificacion == "REPORTES REGULATORIOS") ? (itemArregloFuenteCartForListBox.length > 0 ? ("</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + AgregaBtnsFase9ListaResportesAgrupGenerarTxt(itemArregloFuenteCartForListBox, TdProgressB)) : ("</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + "<td  align='left' style='text-align: center;'>" +
                "<input type='button' id='btnGenerarTxt_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='GenerarTxt_Click(this);'  value='Administración CNR'/> <span> &nbsp &nbsp<span>")) : "";
        }
        else if (IndicePestaniaHabilitadaO == 9 && (ir == '18' || ir == '19' || ir == '20' || ir == '21' || ir == '22' || ir == '23' || ir == '24' || ir == '25' || ir == '26' || ir == '27'
                || ir == '28' || ir == '29' || ir == '30' || ir == '31' || ir == '32' || ir == '44' || ir == '45' || ir == '46' || ir == '47'
                || ir == '48' || ir == '49' || ir == '50' || ir == '51' || ir == '52' || ir == '53' || ir == '54' || ir == '55' || ir == '56'
                || ir == '57' || ir == '58' || ir == '59' || ir == '60' || ir == '61')) {
            cadena += (IndicePestaniaHabilitadaO == 9 && clasificacion == "REPORTES REGULATORIOS") ? (itemArregloFuenteCartForListBox.length > 0 ? ("</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + AgregaBtnsFase9ListaResportesAgrupGenerarTxtIPAB(itemArregloFuenteCartForListBox, TdProgressB)) : ("</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + "<td  align='left' style='text-align: center;'>" +
            "<input type='button' id='btnGenerarTxt_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='GenerarTxt_Click(this);'  value='Iniciar Generar Txt'/> <span> &nbsp &nbsp<span>" +
            "<input type='button' id='btnCargaAcuseTxt_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='VercontendioReportesRegYEstatus(" + PaisSelectXUser + ",4,this," + IdReporte + ");'  value='Cargar Acuse(s)'/></td>")) : "";
        }
        else if (IndicePestaniaHabilitadaO == 9 && IdReporte == 105) {
            cadena += (IndicePestaniaHabilitadaO == 9 && clasificacion == "REPORTES REGULATORIOS") ? (itemArregloFuenteCartForListBox.length > 0 ? ("</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + AgregaBtnsFase9ListaResportesAgrupGenerarTxtIPAB(itemArregloFuenteCartForListBox, TdProgressB)) : ("</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + "<td  align='left' style='text-align: center;'>" +
            "<input type='button' id='btnGenerarTxt_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='GenerarTxt_Click(this);'  value='Iniciar Generar Txt'/> <span> &nbsp &nbsp<span>" +
            "<input type='button' id='btnCargaAcuseTxt_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='VercontendioReportesRegYEstatus(" + PaisSelectXUser + ",4,this," + IdReporte + ");'  value='Cargar Acuse(s)'/></td>")) : "";
        }
        else {
            cadena += (IndicePestaniaHabilitadaO == 9 && clasificacion == "REPORTES REGULATORIOS") ? (itemArregloFuenteCartForListBox.length > 0 ? ("</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + AgregaBtnsFase9ListaResportesAgrupGenerarTxt(itemArregloFuenteCartForListBox, TdProgressB)) : ("</tr><tr style='width: 70%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;'>" + "<td  align='left' style='text-align: center;'>" +
                "<input type='button' id='btnGenerarTxt_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='GenerarTxt_Click(this);'  value='Iniciar Generar Txt'/> <span> &nbsp &nbsp<span>" +
                "<input type='button' id='btnCargaAcuseTxt_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='VercontendioReportesRegYEstatus(" + PaisSelectXUser + ",4,this," + IdReporte + ");'  value='Cargar Acuse(s)'/></td>")) : "";
        }
        cadena += "</tr></table></td></tr></table></td>";
        if (IndicePestaniaHabilitadaO == 4 || IndicePestaniaHabilitadaO == 7) cadena += "<td id='TdEncabezado_" + TdACargaCtrls + "_2' lang='ab' style='width:3%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitadaO >= 0 && IndicePestaniaHabilitadaO <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitadaO >= 4 && IndicePestaniaHabilitadaO <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'><p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'>" + (IndicePestaniaHabilitadaO == 4 ? "CÉDULA PROCESO" : (IndicePestaniaHabilitadaO == 7 ? "CÉDULA REPORTES" : "DETALLE")) + "</p></td><td id='TdContenido_" + TdACargaCtrls + "_2' class='Gris_Gde' style='width:0%;height:100%;'><input type='button' id='btnCedula_" + IdReporte + "_" + TdProgressB + "_" + DefReporte + "' class='classButton' value='" + (IndicePestaniaHabilitadaO == 4 ? "Cédula Proceso" : (IndicePestaniaHabilitadaO == 7 ? "Cédula Reportes" : "Cédula")) + "' onclick='btnCargaCedulaReportes_Click(this)'/></td>";
        if (IndicePestaniaHabilitadaO == 1) cadena += "<td id='TdEncabezado_" + TdACargaCtrls + "_3' lang='ab' style='width:3%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitadaO >= 0 && IndicePestaniaHabilitadaO <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitadaO >= 4 && IndicePestaniaHabilitadaO <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'><p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'> DETENER</p></td><td id='TdContenido_" + TdACargaCtrls + "_3' class='Gris_Gde' style='width:0%;height:100%;'><input type='button' class='classButton' value='Detener'/></td>";
        if (IndicePestaniaHabilitadaO == 7 && periocidadSelectXUser == 1 && (PerfilUser == "19" /*|| PerfilUser == "3"*/))
            cadena += "<td id='TdEncabezado_" + TdACargaCtrls + "_3' lang='ab' style='width:3%;height:100%;cursor: pointer;' class='AcordeonNaranja_1' onclick='SubAcordeon_Click(this);'><p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'> CERRAR PROCESOS</p></td><td id='TdContenido_" + TdACargaCtrls + "_3' class='Gris_Gde' style='width:0%;height:100%;'><input type='button' lang='" + DefReporte + "' alt='" + TdACargaCtrls + "_" + estatusBloqueo + "' id='btnCerrarProceso_" + IdReporte + "' class='classButton' value='" + (estatusBloqueo == "0" ? "Cerrar" : "Abrir") + " Proceso' onclick='return CerrarCandadoProceso_Click(event,this);'/></td>";

        cadena += "</tr></table></div> ";
        $("#divContenedor_" + TdACargaCtrls).append(cadena);
        $("#TablaContenidoExpanded_" + TdACargaCtrls).show();
        $("#TdContenido_" + TdACargaCtrls + "_2").hide();
        $("#TdContenido_" + TdACargaCtrls + "_3").hide();
    }
    else {
        if (document.getElementById("TablaBotonesReprocesoExpanded_" + TdACargaCtrls) != null) {
            var cadena = "<tr><td><table><tr>";
            for (var i = numeroBotonesRep; i >= 0; i--) {
                if (agregarBtnReproceso) cadena += "<td > <div class='BtnReproceso' id='btn_" + TdACargaCtrls + "_" + IdReporte + "_" + DefReporte + "_" + i + "' onclick='HistorialReprocesosReportes_Click(this);'><div class='TxtBtnReproceso'>" + i + "</div> </div></td>";
            }
            cadena += "</tr></table></td></tr>";
            $("#TablaBotonesReprocesoExpanded_" + TdACargaCtrls).html(cadena);
            ActualizaEstatusCheckPadreHijosOmitir(IdReporte, TdACargaCtrls);
        }
        $("#btnCerrarProceso_" + IdReporte).attr("lang", DefReporte);
        $("#btnCerrarProceso_" + IdReporte).attr("alt", TdACargaCtrls + "_" + estatusBloqueo);
        if (estatusBloqueo == "0" && PerfilUser != "35" && PerfilUser != "17") {
            $("#btnCerrarProceso_" + IdReporte).attr("value", "Cerrar Proceso");
            $('#TdContenido_' + TdACargaCtrls + "_1").find('input:button').removeAttr("disabled");
            $('#TdContenido_' + TdACargaCtrls + "_1").find('input:button').attr('class', 'classButton');
        }
        else if (estatusBloqueo == "1" || PerfilUser == "35" || PerfilUser == "17") {
            $("#btnCerrarProceso_" + IdReporte).attr("value", "Abrir Proceso");
            $('#TdContenido_' + TdACargaCtrls + "_1").find('input:button').attr("disabled", true);
            $('#TdContenido_' + TdACargaCtrls + "_1").find('input:button').attr('class', 'classButtonDis');
        }
    }
    $("#TablaContenidoCollapsed_" + TdACargaCtrls).hide();
    $("#TablaContenidoExpanded_" + TdACargaCtrls).show();
}

function AgregaBtnsReportesAgrupacionProcesar(itemArregloFuenteCartForListBox, TdProgressB) {
    var cadena = "<td><table><tr><td style='width: 47%;'><div style='color: White; font: normal 9px Helvetica, Arial, sans-serif;'>";
    cadena += itemArregloFuenteCartForListBox.length >= 2 ? "<input type='checkbox' id='chkHeader-F7_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "'" + ' onclick="chkLstReportes_Click(\'Encabezado_F7\',this);"' + "/> Todos" : "";
    cadena += "<table id='tblLstReportesAEjecutar_F7_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "'>";
    for (var i = 0; i < itemArregloFuenteCartForListBox.length; i++)
        cadena += "<tr><td style='width: 50%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;' align='left'>&nbsp&nbsp<input type='checkbox' id='chk_" + itemArregloFuenteCartForListBox[i].split('&&')[0] + "_" + TdProgressB + "_" + itemArregloFuenteCartForListBox[i].split('&&')[1] + "_" + itemArregloFuenteCartForListBox[i].split('&&')[2] + "' " + ' onclick="chkLstReportes_Click(\'Cuerpo_F7\',this);"' + "/>Reporte " + itemArregloFuenteCartForListBox[i].split('&&')[1] + "</td>";
    cadena += "</table></div></td><td style='float: left;padding: 5px 0px 13px 10px;'>" +
      "<input type='button' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Iniciar Generar Reporte(s)' id='btnProcesarLstReportes-F7_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "' onclick='btnOpcionesBtnsListaReportes_Click(this,0,\"OTROS\")'>" +
     "<div class='divDetalleCargaMasiva' style='display:" + (mostrarBtnDetalleCargaMasiva ? "inline;" : "none;") + "'><input type='button' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Detalle Generar Rep. Masiva' id='btnVerDetalleCargaMasivaEtapa3' onclick='VerDetalleCargaMasiva()' ></div></td>"
    return cadena + "</tr></table></td>";
}

function AgregaBtnsReportesAgrupacionProcesarIPAB(itemArregloFuenteCartForListBox, TdProgressB) {
    var cadena = "<td><table><tr><td style='width: 47%;'><div style='color: White; font: normal 9px Helvetica, Arial, sans-serif;'>";
    cadena += itemArregloFuenteCartForListBox.length >= 2 ? "<input type='checkbox' id='chkHeader-F7_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "'" + ' onclick="chkLstReportes_Click(\'Encabezado_F7\',this);"' + "/> Todos" : "";
    cadena += "<table id='tblLstReportesAEjecutar_F7_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "'>";
    for (var i = 0; i < itemArregloFuenteCartForListBox.length; i++)
        cadena += "<tr><td style='width: 50%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;' align='left'>&nbsp&nbsp<input type='checkbox' id='chk_" + itemArregloFuenteCartForListBox[i].split('&&')[0] + "_" + TdProgressB + "_" + itemArregloFuenteCartForListBox[i].split('&&')[1] + "_" + itemArregloFuenteCartForListBox[i].split('&&')[2] + "' " + ' onclick="chkLstReportes_Click(\'Cuerpo_F7\',this);"' + "/>Reporte " + itemArregloFuenteCartForListBox[i].split('&&')[1] + "</td>";
    cadena += "</table></div></td><td style='float: left;padding: 5px 0px 13px 10px;'>" +
     "<input type='button' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Iniciar Generar Reporte(s)' id='btnProcesarLstReportes-F7_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "' onclick='btnOpcionesBtnsListaReportes_Click(this,0,\"IPAB\")'>" +
     "<div class='divDetalleCargaMasiva' style='display:" + (mostrarBtnDetalleCargaMasiva ? "inline;" : "none;") + "'><input type='button' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Detalle Generar Rep. Masiva' id='btnVerDetalleCargaMasivaEtapa3' onclick='VerDetalleCargaMasiva()' ></div></td>"
    return cadena + "</tr></table></td>";
}

function AgregaBtnsFase8ListaResportesAgrup(itemArregloFuenteCartForListBox, TdProgressB) {
    var cadena = "<td><table style='width: 100%;'><tr style='width: 100%;'><td style='width: 30%;'><div style='color: White; font: normal 9px Helvetica, Arial, sans-serif;'>";
    cadena += itemArregloFuenteCartForListBox.length >= 2 ? "<input type='checkbox' id='chkHeader-F8_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "'" + ' onclick="chkLstReportes_Click(\'Encabezado_F8\',this);"' + "/> Todos" : "";
    cadena += "<table id='tblLstReportesAEjecutar_F8_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "'>";
    for (var i = 0; i < itemArregloFuenteCartForListBox.length; i++)
        cadena += "<tr><td style='width: 50%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;' align='left'>&nbsp&nbsp<input type='checkbox' id='chk_" + itemArregloFuenteCartForListBox[i].split('&&')[0] + "_" + TdProgressB + "_" + itemArregloFuenteCartForListBox[i].split('&&')[1] + "_" + itemArregloFuenteCartForListBox[i].split('&&')[2] + "'" + ' onclick="chkLstReportes_Click(\'Cuerpo_F8\',this);"' + "/>Reporte " + itemArregloFuenteCartForListBox[i].split('&&')[1] + "</td></tr>";
    cadena += "</table></div></td><td style='float: left;padding: 5px 0px 13px 10px;style='width: 70%;''>" +
    "<table ><tr><td></td></tr><tr><td><input type='button' alt='" + IndicePestaniaHabilitadaO + "' id='btnVerValidacionesMet-F8_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "_" + TdProgressB + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='btnOpcionesBtnsListaReportes_Click(this,1)'  value='Catálogo de validaciones' style='margin-top: -10px;'/><span>&nbsp</span></td></tr>" +
    "<tr><td><input type='button' alt='" + IndicePestaniaHabilitadaO + "' id='btnEjecutarValidacionesMet-F8_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "_" + TdProgressB + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='btnOpcionesBtnsListaReportes_Click(this,2)'  value='Ejecutar Validaciones' style='margin-top: -10px;'/>&nbsp <div class='divDetalleCargaMasiva' style='display:" + (mostrarBtnDetalleCargaMasiva ? "inline;" : "none;") + "'><input type='button' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Detalle Validaciones Masiva' onclick='VerDetalleCargaMasiva()' ></div></td></tr>" +
    "<tr><td><input type='button' alt='" + IndicePestaniaHabilitadaO + "' id='btnVerIncidencias-F8_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "_" + TdProgressB + "' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " onclick='btnOpcionesBtnsListaReportes_Click(this,3);'  value='Ver Incidencias' style='margin-top: 5px;'/></td></tr></table></td>";
    return cadena + "</tr></table></td>";
}

function AgregaBtnsFase9ListaResportesAgrupGenerarTxt(itemArregloFuenteCartForListBox, TdProgressB) {
    var cadena = "<td><table><tr><td style='width: 47%;'><div style='color: White; font: normal 9px Helvetica, Arial, sans-serif;'>";
    cadena += itemArregloFuenteCartForListBox.length >= 2 ? "<input type='checkbox' id='chkHeader-F9_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "'" + ' onclick="chkLstReportes_Click(\'Encabezado_F9\',this);"' + "/> Todos" : "";
    cadena += "<table id='tblLstReportesAEjecutar_F9_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "'>";
    for (var i = 0; i < itemArregloFuenteCartForListBox.length; i++)
        cadena += "<tr><td style='width: 50%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;' align='left'>&nbsp&nbsp<input type='checkbox' id='chk_" + itemArregloFuenteCartForListBox[i].split('&&')[0] + "_" + TdProgressB + "_" + itemArregloFuenteCartForListBox[i].split('&&')[1] + "_" + itemArregloFuenteCartForListBox[i].split('&&')[2] + "_" + itemArregloFuenteCartForListBox[i].split('&&')[3] + "' " + ' onclick="chkLstReportes_Click(\'Cuerpo_F9\',this);"' + "/>Reporte " + itemArregloFuenteCartForListBox[i].split('&&')[1] + "</td>";
    cadena += "</table></div></td><td style='float: left;padding: 5px 0px 13px 10px;'>" +
       "<input type='button' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Iniciar Generar Txt(s)' id='btnProcesarLstReportes-F9_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "' onclick='btnOpcionesBtnsListaReportes_Click(this,4,\"OTROS\")'> <span> &nbsp &nbsp<span>"
       if ((itemArregloFuenteCartForListBox[0].split('&&')[0]) != "59" ) 
        {
        cadena += "<input type='button' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Cargar Acuse(s)' id='btnProcesarLstReportes-F9_" + itemArregloFuenteCartForListBox[0].split('&&')[0] + "' onclick='VercontendioReportesRegYEstatus(" + PaisSelectXUser + ",4,this," + itemArregloFuenteCartForListBox[0].split('&&')[0] + ");'> "
       }
       cadena += "</td>"
    return cadena + "</tr></table></td>";
}

function AgregaBtnsFase9ListaResportesAgrupGenerarTxtIPAB(itemArregloFuenteCartForListBox, TdProgressB) {
    var cadena = "<td><table><tr><td style='width: 47%;'><div style='color: White; font: normal 9px Helvetica, Arial, sans-serif;'>";
    cadena += "<table id='tblLstReportesAEjecutar_F9_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "'>";
    for (var i = 0; i < itemArregloFuenteCartForListBox.length; i++)
        cadena += "<tr><td style='width: 50%; height: 10%; color: White; font: normal 9px Helvetica, Arial, sans-serif;' align='left'>&nbsp&nbsp<input type='radio' name='IPAB' id='chk_" + itemArregloFuenteCartForListBox[i].split('&&')[0] + "_" + TdProgressB + "_" + itemArregloFuenteCartForListBox[i].split('&&')[1] + "_" + itemArregloFuenteCartForListBox[i].split('&&')[2] + "_" + itemArregloFuenteCartForListBox[i].split('&&')[3] + "' " + ' onclick="chkLstReportes_ClickIPAB(\'Cuerpo_F9\',this);"' + "/>Reporte " + itemArregloFuenteCartForListBox[i].split('&&')[1] + "</td>";
    cadena += "</table></div></td><td style='float: left;padding: 5px 0px 13px 10px;'>" +
     "<input type='button' " + (PerfilUser == "35" || PerfilUser == "17" ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + " value='Iniciar Generar Txt(s)' id='btnProcesarLstReportes-F9_" + itemArregloFuenteCartForListBox[0].split('&&')[2] + "' onclick='btnOpcionesBtnsListaReportes_Click(this,4,\"IPAB\")'> <span> &nbsp &nbsp<span>"
    return cadena + "</tr></table></td>";
}

function chkLstReportes_Click(Parte, obj) {
    if (Parte.indexOf('Encabezado') != -1) {
        $('#tblLstReportesAEjecutar_' + Parte.split('_')[1] + '_' + $(obj).attr("id").split('_')[1] + ' tr').each(function () {
            $($(this.cells[0]).find('input:checkbox')[0]).attr('checked', $(obj).is(":checked"));
        });
    } else {
        var numChecked = 0;
        $('#tblLstReportesAEjecutar_' + Parte.split('_')[1] + '_' + $(obj).attr("id").split('_')[4] + ' tr').each(function () {
            if ($(this.cells[0]).find('input:checkbox').is(":checked"))
                numChecked++;
        });
        $("#chkHeader-" + Parte.split('_')[1] + '_' + $(obj).attr("id").split('_')[4]).attr('checked', $('#tblLstReportesAEjecutar_' + Parte.split('_')[1] + '_' + $(obj).attr("id").split('_')[4] + ' tr').length == numChecked ? true : false);
    }
}

function chkLstReportes_ClickIPAB(Parte, obj) {
    $("#chkHeader-" + Parte.split('_')[1] + '_' + $(obj).attr("id").split('_')[4]).attr('checked');
}


var arrarLstReportesAEcutar;
function btnOpcionesBtnsListaReportes_Click(obj, opcion, esipab) {
    if (opcion != 5) {
        if (esipab == "IPAB" && opcion == 4) {
            arrarLstReportesAEcutar = DevulveReportesSeleccionadosIPAB(obj);
        }
        else {
            arrarLstReportesAEcutar = DevulveReportesSeleccionados(obj);
        }

        if (arrarLstReportesAEcutar.length > 0) {
            if (opcion == 0) {
                MostrarMsj("¿Está seguro que desea Iniciar la Generación de los<span style='font-weight:bold;'> Reportes Seleccionados</span>? ", "Mensaje ", true, true, false, "Si", "No", "", 300, 120,
                function () {
                    $("#divVentanaMensajes").dialog("close");
                    if (esipab == "IPAB") {
                        mostrarVtnDescargaMasivaIPAB("btnProcesarListaReportes_Recursiva(", arrarLstReportesAEcutar, "Generar Reporte(s)");
                    }
                    else {
                        mostrarVtnDescargaMasiva("btnProcesarListaReportes_Recursiva(", arrarLstReportesAEcutar, "Generar Reporte(s)");
                    }

                }, function () {
                    $("#divVentanaMensajes").dialog("close");
                }, null);
            }
            if (opcion == 1)
                btnVerValidacionesMet_Click($(objSelecListaReporteF8));
            if (opcion == 2) {
                mostrarVtnDescargaMasiva("btnEjecutarValidacionesMet_Recursiva(", arrarLstReportesAEcutar, "Ejecutar Validaciones");
            }
            if (opcion == 3)
                verIncidencias_3($(objSelecListaReporteF8));
            if (opcion == 4) {
                if (esipab == "IPAB") {
                    mostrarVtnDescargaMasivaIPAB("GenerarTxt_Recursiva(\'" + $(obj).attr("id").split("_")[1] + "\',", arrarLstReportesAEcutar, "Generar Txt(s)");
                }
                else {
                    mostrarVtnDescargaMasiva("GenerarTxt_Recursiva(\'" + $(obj).attr("id").split("_")[1] + "\',", arrarLstReportesAEcutar, "Generar Txt(s)");
                }
            }
        }
        else {
            $('#tblLstReportesAEjecutar_' + $(obj).attr("id").split('_')[0].split('-')[1] + '_' + $(obj).attr("id").split('_')[1] + ' tr').each(function () {
                $(this.cells[0]).find('input:checkbox')[0].style.outline = "1px solid red";
            });
            MostrarMsj("Seleccione al menos un Reporte", "Mensaje", false, true, false, "", "Aceptar", "", 250, 125, null, null, null);
        }
    }
    else {
        arrarLstReportesAEcutar = new Array();
        arrarLstReportesAEcutar.push($(obj).attr("id"));
        btnEjecutarValidacionesMet_Recursiva(false);
    }
}

function mostrarVtnDescargaMasiva(nombreEventoBoton, arrarLstReportesAEcutar, txtOpcion) {
    var cadena = '<div id="divBloqVtnProcesaCalf" style="width:97%;height:91.5%; z-index: 100;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
        cadena += '     <div style="height: 94%;"> ' +
                            '<div id="divVentanaCargaMasivaProcesoCalfTemp" style="height: 100%;">' +
                                 '<div style="width: 100%;height: 100%;">' +
                                    '<div style="height: 97%;width: 50%;display: inline-block; position: relative;float: left;">' +
                                        '<fieldset id="fieldCargaNormalSIC" style="border: 1px solid gray; padding: 10px;height: 90%;">' +
                                            '<legend style="font-weight: bold; text-align: left; font-size: 11px;">' + txtOpcion.toUpperCase() + ' NORMAL</legend>' +
                                            '<center>' +
                                                    '<input type="button" value="Iniciar ' + txtOpcion + '" class="classButton" onclick="' + nombreEventoBoton + 'false);"/>' +
                                            '</center>' +
                                        '</fieldset>' +
                                    '</div>' +
                                    '<div style="width: 50%;height: 97%;display: inline-block; position: relative;float: right;">' +
                                        '<fieldset id="fieldCargaMasivaSIC" style="border: 1px solid gray; padding: 10px;height: 90%;">' +
                                            '<legend style="font-weight: bold; text-align: left; font-size: 11px;">' + txtOpcion.toUpperCase() + ' MASIVA</legend>' +
                                                '<div id="divCheckCargaMasiva" style="height:86%;overflow:auto;text-align: left;">';

    var agregarFecha = false;
    for (var i = 0; i < $("#dpFechaPeriodoGral").attr("accesskey").split(',').length; i++) {
        var fechaChk = $("#dpFechaPeriodoGral").attr("accesskey").split(',')[i];
        if (new Date(fechaChk.split('/')[2] + "-" + fechaChk.split('/')[1] + "-" + fechaChk.split('/')[0]) >= new Date("2013-11-30") && new Date(fechaChk.split('/')[2] + "-" + fechaChk.split('/')[1] + "-" + fechaChk.split('/')[0]) <= new Date(fechaP.split(',')[0] + "-" + fechaP.split(',')[1] + "-" + fechaP.split(',')[2]))
            agregarFecha = true;
        else
            agregarFecha = false;

        if (agregarFecha)
            cadena += fechaChk + '&nbsp&nbsp&nbsp<input type="checkbox" disabled="disabled"  checked="checked"/>' + "</br>";
    }

    cadena += '</div><input type="button" value="Iniciar ' + txtOpcion + '" class="classButton" style=" float:right;" onclick="' + nombreEventoBoton + 'true);"/></fieldset>' +
              '</div>' + '</div>'; '</div>' + '</div>';

    $("#divCargaFileComplemento").empty();
    $("#divCargaFileComplemento").html(cadena);
    AgregarVtnFlotante("divCargaFileComplemento", "", txtOpcion.toUpperCase(), "", cadena, 300, 500, false, false, "", "", null);
}


function mostrarVtnDescargaMasivaIPAB(nombreEventoBoton, arrarLstReportesAEcutar, txtOpcion) {
    var cadena = '<div id="divBloqVtnProcesaCalf" style="width:97%;height:91.5%; z-index: 100;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
    cadena += '<div style="height: 94%;"> ' +
                                '<div id="divVentanaCargaMasivaProcesoCalfTemp" style="height: 100%;">' +
                                 '<div style="width: 100%;height: 100%;">' +
                                  '<div style="height: 100%;width: 100%;display: inline-block; position: relative;float: left;">' +
                                   '<fieldset id="fieldCargaNormalSIC" style="border: 1px solid gray; padding: 10px;height: 90%;">' +
                                    '<legend style="font-weight: bold; text-align: left; font-size: 11px;">' + txtOpcion.toUpperCase() + ' NORMAL</legend>' +
                                    '<center>' +
                                        '<input type="button" value="Iniciar ' + txtOpcion + '" class="classButton" onclick="' + nombreEventoBoton + 'false);"/>' +
                                     '</center>' +
                                    '</fieldset>' +
                                   '</div>' +
                                       '<legend style="font-weight: bold; text-align: left; font-size: 11px;">'; //+
    cadena += '</div>';
    '</div>';
    '</div>' +
    '</div>';
    $("#divCargaFileComplemento").empty();
    $("#divCargaFileComplemento").html(cadena);
    AgregarVtnFlotante("divCargaFileComplemento", "", txtOpcion.toUpperCase(), "", cadena, 100, 300, false, false, "", "", null);
}

function btnProcesarListaReportes_Recursiva(esMasiva) {
    var lanzarProcesarReportes = true;
    if (esMasiva && $("#divCheckCargaMasiva").html() == "") {
        lanzarProcesarReportes = false;
        WaitingVtn("divBloqVtnProcesaCalf", true, false, "Cargando Información...");
        MostrarMsj("No hay Fechas de Corte a Descargar.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnProcesaCalf", false, false, "");
        });
    }
    if (lanzarProcesarReportes) {
        $("#divCargaFileComplemento").dialog("close");
        Waiting(true, "Espere por favor. Cargando Información...");
        var idsReportesEjecutar = "";
        for (var i = 0; i < arrarLstReportesAEcutar.length; i++)
            idsReportesEjecutar += arrarLstReportesAEcutar[i].split('_')[1] + ","
        var parametros = {
            anio: fechaP.split(',')[0],
            mes: fechaP.split(',')[1],
            dia: fechaP.split(',')[2],
            peridiocidad: periocidadSelectXUser,
            usuario: userLogin,
            idPais: PaisSelectXUser,
            idsReportes: idsReportesEjecutar + (esMasiva ? "|MASIVA" : "|")
        };

        peticionAjax("PanelDeControl.aspx/EjecutarReportesRegulatorios", "POST", parametros, function (data) {
            if (data.d.indexOf("ErrorCATCH") != -1)
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            setTimeout(terminarWait, 4000);
        }, null);
    }
}

function btnEjecutarValidacionesMet_Recursiva(esMasiva) {
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
        peticionAjax("PanelDeControl.aspx/DevuelveSP_ExisteJobActivo", "POST", { nameJob: "EjecutarValidacionesComercialFase8", Tipoconexion: '35' },
                function (result) {
                    if (result.d == "false") {
                        $("#divCargaFileComplemento").dialog("close");
                        Waiting(true, "Espere por favor. Cargando Información...");

                        var idsReportesEjecutar = "";

                        for (var i = 0; i < arrarLstReportesAEcutar.length; i++) {
                            if (arrarLstReportesAEcutar[i].split('_')[1] != undefined) {
                                idsReportesEjecutar += arrarLstReportesAEcutar[i].split('_')[1] + ","
                            }
                        }

                        var parametrosEjecutarValidaciones = { fechaPeriodo: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], periodicidad: periocidadSelectXUser, fase: 8, idsMet: idsReportesEjecutar + (esMasiva ? "|MASIVA" : "|"), usuario: userLogin };
                        peticionAjax("PanelDeControl.aspx/TableroEjecutaValidacionesMetodologias", "POST", parametrosEjecutarValidaciones, function (data) {
                            if (data.d != "GOOD")
                                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 150, null, null, null);
                            Waiting(false, "Espere por favor. Cargando Información...");
                        }, null);
                    }
                    else {
                        WaitingVtn("divBloqVtnProcesaCalf", true, false, "Cargando Información...");
                        MostrarMsj("Existe un Job En Ejecución de la Fase: 8", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
                            $("#divVentanaMensajes").dialog("close");
                        }, null);
                        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                            WaitingVtn("divBloqVtnProcesaCalf", false, false, "");
                        });
                    }
                }, null);
    }
}

function GenerarTxt_Recursiva(idObjetoTd, esMasiva) {
    var lanzarGenerarTxt = true;
    if (esMasiva && $("#divCheckCargaMasiva").html() == "") {
        lanzarGenerarTxt = false;
        WaitingVtn("divBloqVtnProcesaCalf", true, false, "Cargando Información...");
        MostrarMsj("No hay Fechas de Corte a Descargar.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnProcesaCalf", false, false, "");
        });
    }
    if (lanzarGenerarTxt) {
        var nombreReportes = "";
        var idsReportes = "";
        for (var i = 0; i < arrarLstReportesAEcutar.length; i++) {
            idsReportes += arrarLstReportesAEcutar[i].split('_')[1] + ",";
            nombreReportes += arrarLstReportesAEcutar[i].split('_')[3] + ",";
        }

        $("#divCargaFileComplemento").dialog("close");
        Waiting(true, "Espere por favor. Cargando Información...");
        $("#" + idObjetoTd).attr("class", "EstatusAmarillo");
        LanzarGenerarTxt_Recursiva(idsReportes, nombreReportes, arrarLstReportesAEcutar[0], arrarLstReportesAEcutar[0].split('_')[5], esMasiva);
    }
}

function LanzarGenerarTxt_Recursiva(idsReportes, nombreReportes, nombreCompleto, nombreAgrupacion, esMasiva) {
    var nombreReportesTemp = "";
    var cadenaIPAB = '';

    cadenaIPAB = idsReportes.substring(0, idsReportes.length - 1);

    for (var i = 0; i < nombreReportes.split(',').length - 1; i++) {
        if (nombreReportes.split(',')[i] == "R04c441") nombreReportesTemp += "R04c41,";
        else if (nombreReportes.split(',')[i] == "R04c442") nombreReportesTemp += "R04c42,";
        else if (nombreReportes.split(',')[i] == "R04c443") nombreReportesTemp += "R04c43,";
        else nombreReportesTemp += nombreReportes.split(',')[i] + ",";
    }
    Waiting(true, "Espere por favor. Cargando Información...");

    if (nombreCompleto.indexOf("IPAB") > 0) {
        Waiting(false, "Espere por favor. Cargando Información...");
        peticionAjax("PanelDeControl.aspx/VerificarJobIPAB", "POST", null, function (data) {

            if (data.d == "") {
                peticionAjax("PanelDeControl.aspx/GenerarTxtReportesRegulatoriosRecursiva", "POST", { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], peridiocidad: periocidadSelectXUser, usuario: userLogin, idPais: PaisSelectXUser, idsReportes: idsReportes, nombresReportes: nombreReportesTemp, esMasiva: esMasiva }, function (data) {
                    if (data.d.indexOf("Error") == -1) {
                        setTimeout(ExportarIPAB, 200000);
                        ExportarIPAB(idsReportes);
                        setTimeout(ExportarIPAB, 80000);
                    }
                    else {
                        peticionAjax("PanelDeControl.aspx/AgregaIndicadorEtapa2Or3Recursiva", "POST", { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], peridiocidad: periocidadSelectXUser, usuario: userLogin, idPais: PaisSelectXUser, idsReportes: idsReportes, fase: "9", estatus: "3" }, function (data) {
                            Waiting(false, "Espere por favor. Cargando Información...");

                        }, null);
                    }
                });
            }
            else {
                MostrarMsj("Ya existe otro reporte en proceso", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        });
    }
    else {
        peticionAjax("PanelDeControl.aspx/GenerarTxtReportesRegulatoriosRecursiva", "POST", { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], peridiocidad: periocidadSelectXUser, usuario: userLogin, idPais: PaisSelectXUser, idsReportes: idsReportes, nombresReportes: nombreReportesTemp, esMasiva: esMasiva }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d != "" && parseInt(data.d) > 0) {
                    __doPostBack('ExportarGenerarTxtReportesRegulatoriosRecursiva', $("#dpFechaPeriodoGral").val() + "|" + nombreAgrupacion + "|" + periocidadSelectXUser + "|" + userLogin + "|" + PaisSelectXUser + "|" + idsReportes);
                    setTimeout(terminarWait, 3000);
                }
                else {
                    Waiting(false, "Espere por favor. Cargando Información...");
                    MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                }
            }
            else {
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }

        });
    }
}



function ExportarIPAB(nombreReportes) {
    var fecha = $("#dpFechaPeriodoGral").val();
    peticionAjax("PanelDeControl.aspx/ExportarIPAB", "POST", { nombreArchivo: nombreReportes, anio: fecha.split('/')[2], mes: fecha.split('/')[1], dia: fecha.split('/')[0] }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d.indexOf("Descargar") == 0) {

                for (var i = 0; i < nombreReportes.split(',').length - 1; i++) {
                    __doPostBack('ExportarReportesIPAB', fecha.split('/')[2] + '|' + fecha.split('/')[1] + '|' + fecha.split('/')[0] + '|' + periocidadSelectXUser + '|' + PaisSelectXUser + '|' + nombreReportes + '|' + nombreReportes.split(',')[i]);
                }
                setTimeout(terminarWait, 3000);
            }
            else {
                setTimeout(ExportarIPAB, 10000);
                ExportarIPAB(nombreReportes);
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    });
}


function descargarReportesIPAB(nombreReportes) {
    __doPostBack('ExportarGenerarTxtReportesRegulatoriosRecursiva', $("#dpFechaPeriodoGral").val() + "|" + nombreAgrupacion + "|" + periocidadSelectXUser + "|" + userLogin + "|" + PaisSelectXUser + "|" + idsReportes);
}


var objSelecListaReporteF8;
function DevulveReportesSeleccionados(obj) {
    objSelecListaReporteF8 = null;
    var arrarLstReportesAEcutar = new Array();
    $('#tblLstReportesAEjecutar_' + $(obj).attr("id").split('_')[0].split('-')[1] + '_' + $(obj).attr("id").split('_')[1] + ' tr').each(function () {
        $(this.cells[0]).find('input:checkbox')[0].style.outline = "1px solid transparent";
        if ($(this.cells[0]).find('input:checkbox').is(":checked")) {
            if (arrarLstReportesAEcutar.length == 0)
                objSelecListaReporteF8 = $(this.cells[0]).find('input:checkbox')[0];
            arrarLstReportesAEcutar.push($($(this.cells[0]).find('input:checkbox')[0]).attr("id"));
        }
    });
    return arrarLstReportesAEcutar;
}

function DevulveReportesSeleccionadosIPAB(obj) {
    objSelecListaReporteF8 = null;
    var arrarLstReportesAEcutar = new Array();
    $('#tblLstReportesAEjecutar_' + $(obj).attr("id").split('_')[0].split('-')[1] + '_' + $(obj).attr("id").split('_')[1] + ' tr').each(function () {
        $(this.cells[0]).find('input:radio')[0].style.outline = "1px solid transparent";
        if ($(this.cells[0]).find('input:radio').is(":checked")) {
            if (arrarLstReportesAEcutar.length == 0)
                objSelecListaReporteF8 = $(this.cells[0]).find('input:radio')[0];
            arrarLstReportesAEcutar.push($($(this.cells[0]).find('input:radio')[0]).attr("id"));
        }
    });
    return arrarLstReportesAEcutar;
}

function HistorialReprocesosReportes_Click(obj) {
    LlamaPeticionAjaxDeHistorialReprocesosFuente($(obj).attr("id").split("_")[1].substring($(obj).attr("id").split("_")[1].length - 1), $(obj).attr("id").split("_")[2], fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(obj).attr("id").split("_")[4], $(obj).attr("id").split("_")[3].split("%%%")[0], "DevuelveSPDetalleReprocesoReportes");
}

function btnCargaCedulaReportes_Click(obj) {
    CargaCedulaReportes($(obj).attr("id").split("_")[1], $(obj).attr("id").split("_")[3]);
}

function CargaCedulaReportes(idReporte, defReporte) {
    var cadena = '<div id="divBloqVtnCedula" style="width:97%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvCedulasFuentes" style="width: 100%; height: 100%; overflow: hidden; text-align: center;font-size:12px">';
    cadena += '<table style="width: 100%"> <tr><td> <div id="dvCedulaFuentes" style="width: 100%">';
    cadena += '</div></td> </tr></table></div>';

    AgregarVtnFlotante("divVentanaCedulas", idReporte, "CÉDULA " + defReporte, "", cadena, 610, 500, true, false, "Editar Cédula", "", function Guarda_EditaCedula(obj) {
        if ($(".ui-button-text").html() == 'Editar Cédula') {
            $(".ui-button-text").html('Guardar Cambios');
            $(".ui-button-text").attr("class", "ui-button-text");
            $(".ui-datepicker-trigger").removeAttr("disabled");
        }
    });

    WaitingVtn("divBloqVtnCedula", true, true, "Cargando Información");
    WaitingVtn("divBloqVtnCedulaBtns", true, false, "");
    $($(".ui-button-text").parent().parent().find(":button")[0]).attr("class", "classButtonDis");
    $($(".ui-button-text").parent().parent().find(":button")[0]).attr("disabled", "disabled");

    peticionAjax("PanelDeControl.aspx/ObtenerDatosCedulaReporte", "POST", { idRep: idReporte, periodicidad: periocidadSelectXUser, idPais: PaisSelectXUser }, function (data) {
        if (data.d.indexOf('ErrorCATCH') == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#dvCedulaFuentes").html(creaTablaCedulaRep(idReporte, defReporte, JSON));
                $('.FechasNoEdit1').datepicker({ minDate: -0 });
                $('.FechasNoEdit2').datepicker({ minDate: -0 });
                $('.FechasEdit1').datepicker({ minDate: -0 });
                $('.FechasEdit2').datepicker({ minDate: -0 });
                $(".ui-datepicker-trigger").attr("disabled", "disabled");
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
        WaitingVtn("divBloqVtnCedula", false, false, "");
        WaitingVtn("divBloqVtnCedulaBtns", false, false, "");
    }, null);
}

function creaTablaCedulaRep(idReporte, defReporte, JSON) {
    var encabezadoAux = '';
    var cad = '<center><table id="tblCedulaReportes" width="100%" class="dataGridDatos" style="font-size: 9px;">';
    var auxJSON = JSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados.toString() == 'CONCEPTO') {
            cad += '<th>';
        } else {
            cad += '<th>';
        }
        cad += encabezados.toString();
        cad += '</th>';
    }

    cad += '</tr>';
    cad += '</thead>';

    cadSec = '';
    var i = 0;
    var contar = 0;
    var start = 0;
    var Contador = 0;

    cad += '<tbody style="font-size: 9px;">';
    for (var filas = 0; filas < JSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row" style="font-size: 9px;" >' : '<tr class="alternateRow" style="font-size: 9px;">';
        var json = JSON[filas];
        for (var element in json) {
            if (element == 'CONCEPTO') {
                cad += '<td style="text-align:left;width:30%;  height: 25x;font-size: 9px;">';
            } else {
                cad += '<td style="text-align:left;width:70%;  height: 25px;font-size: 9px;">';
            }

            cad += json[element];
            cad += '</td>';
        }
        Contador = Contador + 1;
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}

var objGenerarTxtReporte;
function GenerarTxt_Click(obj) {
    objGenerarTxtReporte = obj;
    if ($("#" + $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1, 0) + "7").attr("class") == "EstatusAmarillo" ||
     $("#" + $(obj).attr("id").split("_")[2]).attr("class") == "EstatusAmarillo" ||
     $("#" + $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1, 0) + "8").attr("class") == "EstatusAmarillo") {
        MostrarMsj("Existe un proceso del Reporte \"" + $(obj).attr("id").split('_')[3] + "\" en ejecución. Intente mas tarde. ", " AVISO " + $(obj).attr("id").split('_')[3], false, true, false, "", "Aceptar", "", 340, 140, null, null, null);
        return;
    }
    if ($(objGenerarTxtReporte).attr("id").split("_")[1] == 13) {
        esCargaInicial = true;
        obtenerTablaEtapIV();
    }
    else {
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("PanelDeControl.aspx/AgregaIndicadorEtapa2Or3", "POST", { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], peridiocidad: periocidadSelectXUser, usuario: userLogin, idPais: PaisSelectXUser, idMetOrRep: $(objGenerarTxtReporte).attr("id").split("_")[1], fase: 9 }, function (data) {
            if (data.d.indexOf("Error") == -1) {
                if (data.d == "") {

                    setTimeout(LanzarGenerarTxt_Click, 2000);
                }
            }
            else {
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        });
    }
}

function LanzarGenerarTxt_Click() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("PanelDeControl.aspx/GenerarTxtReportesRegulatorios", "POST", { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], peridiocidad: periocidadSelectXUser, usuario: userLogin, idPais: PaisSelectXUser, idReporte: $(objGenerarTxtReporte).attr("id").split("_")[1] }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "" && parseInt(data.d) > 0) {
                __doPostBack('ExportarGenerarTxtReportesRegulatorios', $("#dpFechaPeriodoGral").val() + "," + $(objGenerarTxtReporte).attr("id").split('_')[3]);
                setTimeout(terminarWait, 3000);
            }
            else {
                Waiting(false, "Espere por favor. Cargando Información...");
                MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    });
}

function btnProcesarReporte_Click(obj) {
    if ($("#" + $(obj).attr("id").split("_")[1].substring($(obj).attr("id").split("_")[1].length - 1, 0) + "8").attr("class") == "EstatusAmarillo" ||
     $("#" + $(obj).attr("id").split("_")[1]).attr("class") == "EstatusAmarillo" ||
     $("#" + $(obj).attr("id").split("_")[1].substring($(obj).attr("id").split("_")[1].length - 1, 0) + "9").attr("class") == "EstatusAmarillo") {
        MostrarMsj("Existe un proceso " + $(obj).attr("id").split('_')[2].split('%%%')[0] + " en ejecución. Intente mas tarde. ", " AVISO " + $(obj).attr("id").split('_')[2].split('%%%')[0], false, true, false, "", "Aceptar", "", 340, 140, null, null, null);
        return;
    }
    MostrarMsj("¿Está seguro que desea Iniciar la Generación de <span style='font-weight:bold;'>" + $(obj).attr("id").split('_')[2].split('%%%')[0] + "</span>? ", "Mensaje " + $(obj).attr("id").split('_')[2].split('%%%')[0], true, true, false, "Si", "No", "", 300, 120,
        function () {
            $("#divVentanaMensajes").dialog("close");
            if ($(obj).attr("id").split("_")[3] == "CUBOS") {
                peticionAjax("PanelDeControl.aspx/EjecutarJobCuboPlazos", "POST", { idReporte: $(obj).attr("id").split("_")[0], anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], peridiocidad: periocidadSelectXUser, usuario: userLogin, idPais: PaisSelectXUser }, function (data) {
                    if (data.d.indexOf("Error") != -1)
                        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                }, null);
            }
            else if ($(obj).attr("id").split("_")[3] == "REPORTES REGULATORIOS") {
                peticionAjax("PanelDeControl.aspx/EjecutarReportesRegulatorios", "POST", { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], peridiocidad: periocidadSelectXUser, usuario: userLogin, idPais: PaisSelectXUser, idsReportes: $(obj).attr("id").split("_")[0] + "|" }, function (data) {
                    if (data.d.indexOf("Error") != -1)
                        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                }, null);
            }
            else if ($(obj).attr("id").split("_")[3] == "REPORTES INTERNOS") {
                if ($(obj).attr("id").split("_")[2] == "R24") {
                    peticionAjax("PanelDeControl.aspx/EjecutarReportes", "POST", { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], periodicidad: periocidadSelectXUser, usuario: userLogin, idPais: PaisSelectXUser, idReporte: $(obj).attr("id").split("_")[0] }, function (data) {
                        if (data.d.indexOf("Error") == -1)
                            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                    }, null);
                }

            }
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
}

function btnDescargaReporte_Click(obj) {
    if ($(obj).attr("id").split("_")[1] == "12") {
        __doPostBack('ExportarR24', $("#dpFechaPeriodoGral").val());
        setTimeout(terminarWait, 3000);
    }

}

function btnAgendaReportes_Click() {
    var cadena = '<div id="divBloqVtnAgenda" style="margin-top: -11px;width:98%;height:97%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvAgenda" style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;"><table style="width:100%"> <thead style="width:100%"> ';
    cadena += '<tbody> <tr><td style="width:"> Fecha T0: <input type="text" id="txtCalendario1MesReportes" disabled="disabled"/></td></tr> ';
    cadena += '</tbody>  </table> <br /><div id="dvAgendaFuente" style="width:100%;height:77%;overflow: auto">  </div>' + "<table style='width:100%;height:8%;margin-top: -6px;'><tr style='height:1%'></tr><tr>";
    arregloItemsAguardar = new Array();
    $("#divVentanaAgendas").empty();
    $("#divVentanaAgendas").show(); $("#divVentanaAgendas").parent().show(); //$(".ui-widget-overlay").show()
    $("#divVentanaAgendas").html(cadena);
    AgregarVtnFlotante("divVentanaAgendas", "", "AGENDA  DE REPORTE", "", cadena, 380, 800, false, false, "", "", null);
    $("#divVentanaAgendas").on("dialogclose", function (event, ui) {
        if (arregloItemsAguardar.length > 0) {
            if (!pulsoClose) {
                pulsoClose = true; $(".ui-dialog-title").next().attr("style", "display:none");
                WaitingVtn("divBloqVtnAgenda", true, false, "");
                MostrarMsj("¿Desea guardar los cambios efectuados en la Agenda? ", "Mensaje", true, true, true, "Guardar", "No Guardar", "Cancelar", 220, 120,
                    function BtnSiCambiosAgenda() {
                        $("#divVentanaMensajes").dialog("close");
                        WaitingVtn("divBloqVtnAgenda", true, true, "Guardando Información...");
                        indiceArray = 0;
                        $(".ui-dialog-title").next().removeAttr("style");
                        pulsoClose = false;
                    }, function BtnNoCambiosAgenda() { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnAgenda", false, false, ""); $("#divVentanaAgendas").hide(); $("#divVentanaAgendas").parent().hide(); /*$(".ui-widget-overlay").hide();*/$(".ui-dialog-title").next().removeAttr("style"); pulsoClose = false; }, function BtnCancelar() { pulsoClose = false; $(".ui-dialog-title").next().removeAttr("style"); $("#divVentanaMensajes").dialog("close"); $("#divVentanaAgendas").dialog("open"); WaitingVtn("divBloqVtnAgenda", false, false, ""); });
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnAgenda", false, false, "");
                });
            }
        }
    });
    $("#txtCalendario1MesReportes").attr("value", fechaP.split(',')[2] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[0]);
    ObtieneDatosReportes($("#txtCalendario1MesReportes"));
}

function ObtieneDatosReportes(obj) {
    var parametros = { fdFechaCorte: $(obj).val().split('/')[2] + "/" + $(obj).val().split('/')[1] + "/" + $(obj).val().split('/')[0], periodicidad: periocidadSelectXUser, idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/ObtieneAgendaReportes', "POST", parametros, ObtieneTabla_FinalizadaReportes, null);

}

function ObtieneTabla_FinalizadaReportes(data) {
    var JSON = obtenerArregloDeJSON(data.d, false);
    if (JSON.Status != undefined) {
        alert("No se pudo Generar la actividad, intente mas tarde");
        return;
    }
    var cad = '';
    cad = generarTablaDeRegistrosAgendaReportes(JSON);
    $('#dvAgendaFuente').html(cad);
    WaitingVtn("divBloqVtnAgenda", false, false, "");
}

function generarTablaDeRegistrosAgendaReportes(listaDeJSON) {
    var encabezadoAux = '';
    var cad = '<center><table id="tblContenidoproyectos" width="100%" class="dataGridDatos">';

    cad += '<thead>';
    cad += '<tr valign="top">';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados != "id") {
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
            if (element != "id") {
                if (element == "PREDEFINIDO T0+ DD,HH:MM:SS") {
                    cad += '<td id="tdEditDDHHMMSS_' + json.id + '" lang="aa"' + /*'ondblclick="HabilitarEdicionDDHHMMSS(this)"'*/'style="width:35%;text-align:center"><div id="divOrig_' + json.id + '">';
                    cad += json[element] + "</div>";
                    cad += '<div id="divEdit_' + json.id + '" style="background-color:#dddddd;display:none">&nbsp;&nbsp;';
                    cad += 'DD <input maxlength="2" id="txtDDAgenda_' + json.id + '" value="' + json[element].split(',')[0] + '" style="background-color:White;color:Black; width:17px; text-align:center; border: none; " />&nbsp;<b>,</b>&nbsp;';
                    cad += 'HH <input maxlength="2" id="txtHHAgenda_' + json.id + '" value="' + json[element].split(',')[1].split(":")[0] + '"  style="background-color:White;color:Black; width:17px; text-align:center; border: none; " />&nbsp;<b>:</b>&nbsp;';
                    cad += 'MM <input maxlength="2" id="txtMMAgenda_' + json.id + '" value="' + json[element].split(',')[1].split(":")[1] + '"  style="background-color:White;color:Black;  width:17px; text-align:center; border: none; " />&nbsp;<b>:</b>&nbsp;';
                    cad += 'SS <input maxlength="2" id="txtSSAgenda_' + json.id + '" value="' + json[element].split(',')[1].split(":")[2] + '"  style="background-color:White;color:Black; width:17px; text-align:center; border: none; " />';
                    cad += '</div>';
                    cad += ' <img id="img_' + json.id + '" lang="aa" onclick="HabilitarEdicionDDHHMMSS(this) " src="../../Images/PanelDeControl/edit.png" style="height: 20px;width: 15px;margin: -50% 0% 2% 90%;" />' + '</td>';
                }
                else {
                    cad += '<td style="text-align:' + (element == "CARTERA" ? 'left"' : 'center"') + '>';
                    cad += json[element];
                    cad += '</td>';
                }
            }
        }
        cad += '</tr>';
    }

    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}

//---------  Ventana con reportes disponibles para cargar acuses
function VercontendioReportesRegYEstatus(idPais, idSegmento, obj, idReporte) {
    var Bimestre = RevisarBimestre(fechaP.split(',')[1]);

    if (Bimestre == false && idReporte == 33) {
        MostrarMsj('No se puede generear el reporte, no es mes bimestral.', "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
    }
    else {
        var cadena;
        Waiting(true, "Cargando Información...");
        peticionAjax('PanelDeControl.aspx/GetReportesXSegmentoTab', "POST", { idSegmento: idSegmento, idPeriodicidad: periocidadSelectXUser, idPais: PaisSelectXUser, fechaCorte: fechaP.split(',')[0] + "" + fechaP.split(',')[1] + "" + fechaP.split(',')[2], idReporte: idReporte },
                function (data) {
                    if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                        var JSON = obtenerArregloDeJSON(data.d, false);
                        cadena = generarTablaVerReportesRegEstatus(JSON, idPais, idSegmento);
                        AgregarVtnFlotante_DG("divCargaReportes", "", "Reportes relacionados", "", cadena, (45 * JSON.length) + 40, 750, false, false, "", "", null);
                    }
                    else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    $(obj).attr("lang", "ab")
                    setTimeout(terminarWait, 600);
                }, null);
    }
}

function RevisarBimestre(Mes) {
    if (Mes == 1 || Mes == 3 || Mes == 5 || Mes == 7 || Mes == 9 || Mes == 11)
        return false;
    else
        return true;
}


function generarTablaVerReportesRegEstatus(listaDeJSON, idPais, idSegmento) {
    var cad = '<div  style="width:auto;">';
    if (listaDeJSON[0] == null) {
        cad += '<table id="tblDatosRepReg"  style="width: 100%;" class="dataGridDatos">';
        cad += '<tr><td style="text-align:center;">Sin Reportes</td></tr></table> </div></div>';
        return cad;
    }
    var width = 0;
    cad += '<table id="tblDatosRepReg"  style="width: 100%;" class="dataGridDatos_DG">';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    for (var encabezados in auxJSON) {
        if (encabezados != "FIIdReporte") {
            width = 0;
            width = encabezados == "Serie" ? 10 : width;
            width = encabezados == "Reporte" ? 85 : width;
            width = encabezados == "Estatus" ? 5 : width;
            cad += '<th style="text-align: center;width:' + width + '%' + '">';
            cad += (encabezados == "FVCComentario" ? "Comentario" : encabezados.toString());
            cad += '</th>';
        }
    }
    cad += '</tr>';
    var _ID;
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        _ID = listaDeJSON[filas].Serie + '&&' + listaDeJSON[filas].FIIdReporte;
        cad += '<tr><td colspan="3"><div id="dZUpload' + filas + '" class="dropzone"><div class="dz-default dz-message">';
        cad += '<table style="width:100%;  border-collapse:collapse; border:none;" border="0">';
        cad += ((filas % 2 == 0) ? '<tr class="row_DG" ' : '<tr class="alternateRow_DG" ') + ' id="' + _ID + '" onclick="descargaArchivoAcuse_DG(' + listaDeJSON[filas].FIIdReporte + ', ' + idPais + ',\'' + _ID + '\')">';

        var json = listaDeJSON[filas];
        var width = 0;
        var cont = 1;
        for (var element in json) {
            if (element == 'Estatus') {
                width = numerowidth(cont);
                cad += '<td style="text-align: center; width:' + width + '%' + '"> <span id="Span_' + filas + '" class="' + DeterminaEstatusDeReporteXId(json[element]) + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>';
                cont += 1
            }
            else if (element != 'FIIdReporte') {
                width = numerowidth(cont);
                cad += '<td style="text-align:left; white-space: normal; width:' + width + '%' + '">';
                cad += json[element];
                cont += 1
            }
            cad += '</td>';
        }
        cad = cad.substring(0, cad.length - 5);
        cad += '</tr></table></div></div></td></tr>';
    }
    cad += '</table></div></div>';
    cad += '<script type="text/javascript"> Dropzone.autoDiscover = false;';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += '$(document).ready(function () {';
        cad += '    $("#dZUpload' + filas + '").dropzone({';
        cad += '        url: "PanelDeControl.ashx", maxFiles: 10, addRemoveLinks: true,';
        cad += '        success: function (file, response) {';
        cad += '              almacenaArchivoDragAndDrop(); ';
        cad += '               cambiarEstatusCarga(' + filas + '); ';
        cad += '            },';
        cad += '        error: function (file, response) {';
        cad += '            MostrarMsj("Ocurrio un error al cargar el archivo", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);';
        cad += '        }';
        cad += '    });';
        cad += '  });';
        cad += ' ';
    }

    cad += ' $(document).ready(function () {';
    cad += '     $("#tblDatosRepReg tr").hover(function () {';
    cad += '         $(this).addClass("hover");';
    cad += '             var status; status += $(this).attr("id");'
    cad += '             $.ajax({';
    cad += '                  type: "POST", url: "PanelDeControl.ashx", data: { nSerie: $(this).attr("id") }, dataType: "json",';
    cad += '             success: function (response) {}';
    cad += '            });';
    cad += '       }, function () {';
    cad += '   });';
    cad += ' });';
    cad += '';
    cad += '$(document).ready(function () {';
    cad += ' $("#tblDatosRepReg tr").click(function (event) {';
    cad += '     var status;';
    cad += '     status += $(this).attr("id");';
    cad += '     $.ajax({';
    cad += '             type: "POST", url: "PanelDeControl.ashx", data: { nSerie: $(this).attr("id") + "=Click" }, dataType: "json",';
    cad += '         success: function (response) {';
    cad += '    }';
    cad += ' });';
    cad += '});';
    cad += '         ';
    cad += '});';
    cad += '</script>';
    return cad;
}

function descargaArchivoAcuse_DG(idReporte, idPais, _ID) {
    peticionAjax('PanelDeControl.aspx/desacargaArchivoDragAndDrop', "POST", { reporte: idReporte, idPais: idPais, fechaCorte: $("#dpFechaPeriodoGral").val() },
        function (data) {
            if (data.d == "VERDADERO") {
                window.$.Event.cancelBubble = true;
                window.location.assign("../../Regulatorios/MonitoreoRegulatorios/Respuesta.aspx?idReporte=" + idReporte + "&&idPais=" + idPais + "&&fechaCorte=" + $("#dpFechaPeriodoGral").val().split('/')[2] + '-' + $("#dpFechaPeriodoGral").val().split('/')[1] + '-' + $("#dpFechaPeriodoGral").val().split('/')[0]);
            }
        }, null);
}

function SeCanceloAlmacenaArchivoDragAndDrop() {
    peticionAjax('PanelDeControl.aspx/SeCanceloAlmacenaArchivoDragAndDrop', "POST", {},
         function (data) {
             MostrarMsj("Se Cancelo " + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
         }, null);
}


function almacenaArchivoDragAndDrop() {
    peticionAjax('PanelDeControl.aspx/almacenaArchivoDragAndDrop', "POST", { pais: PaisSelectXUser, num: 4 },
         function (data) {
             //MostrarMsj("Se cargo correctamente el archivo." + data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
         }, null);
}


function cambiarEstatusCarga(idSpan) {
    $(document).ready(function () {
        $("#Span_" + idSpan).removeClass("EstatusGris");
        $("#Span_" + idSpan).addClass("EstatusVerde");
    });
}

function numerowidth(x) {
    var tam;
    switch (x) {
        case 1:
            tam = 10;
            break;
        case 2:
            tam = 85;
            break;
        case 3:
            tam = 5;
            break;
    }
    return tam;
}

function DeterminaEstatusDeReporteXId(idItem) {
    var classColor = "EstatusGris";
    switch (idItem) {
        case "1": classColor = "EstatusVerde"; break;
        case "2": classColor = "EstatusAmarillo"; break;
        case "3": classColor = "EstatusRojo"; break;
        case "4": classColor = "EstatusNegro"; break;
        case "5": classColor = "EstatusNaranja"; break;
    }
    return classColor;
}

// Ventana de ficha tecnica
function mostrarFichaTecnica(idPais, idSegmento, idReporte, serie, idPeriodicidad) {
    var valorHeight = parseInt(document.getElementById("shadows").style.height.substring(0, 3)) > 720 ? 730 : 590;
    var cad = '<div id="divBloqVtnFichaTecnica" style="width:98%;height:96%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
    cad += '<div style="overflow:auto;width:100%;height:93%;" id="divTblFichaTec"><center>';
    AgregarVtnFlotante("divVerFichaTecnica", "", "FICHA TÉCNICA REPORTE SERIE " + serie.toUpperCase(), "", cad, valorHeight, 900, false, false, "", "", null);
    $("#divVerFichaTecnica").attr("lang", idPeriodicidad);
    entroCloseFichatecnica = false;
    $("#divVerFichaTecnica").on("dialogclose", function (event, ui) {
        if (cargoNuevoArchivoAcuse && $("#divTablaInventarios").css("display") != "none" && !entroCloseFichatecnica) {
            entroCloseFichatecnica = true;
        }
    });
    mostrarFichaTecnicaPaso2(idPais, idSegmento, idReporte, serie, idPeriodicidad);
}

var idPaisG; var idSegmentoG; var idReporteG; var serieG; var idPeriodicidadG;
function mostrarFichaTecnicaPaso2(idPais, idSegmento, idReporte, serie, idPeriodicidad) {
    idPaisG = idPais; idSegmentoG = idSegmento; idReporteG = idReporte; serieG = serie; idPeriodicidadG = idPeriodicidad;
    WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
    peticionAjax('PanelDeControl.aspx/GetFichaTecnica', "POST", { idPais: PaisSelectXUser, idReporte: idReporte, idSegmento: idSegmento, idPeriodicidad: periocidadSelectXUser, fechaCorte: fechaP.split(',')[0] + '-' + fechaP.split(',')[1] + '-' + fechaP.split(',')[2] },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        cargoNuevoArchivoAcuse = false;
                        var JSON = obtenerArregloDeJSON(replaceAll(data.d, '\\', '/'), false);
                        $("#divTblFichaTec").html(generaTablaVerFichaTecnica(JSON, idReporte, serie));
                        $(".divEditFecha").datepicker();
                        $(".ui-datepicker-trigger").hide();
                        cargaCatalogosFichaTecnica(0);
                    }
                    else {
                        var esBtnNo = false; var esBtnSi = false; var entroClose = false;
                        WaitingVtn("divBloqVtnFichaTecnica", true, false, "Cargando Información...");
                        MostrarMsj("No existe Ficha Técnica para el Reporte Seleccionado (Serie <span style='font-weight:bold;'>" + serie.toUpperCase() + "</span>). ¿Desea realizar su Carga Inicial?", "Mensaje SicreNet", true, true, false, "Si", "No", "", 250, 130,
                        function btnSi() {
                            esBtnSi = true;
                            $("#divVentanaMensajes").dialog("close");
                            WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
                            var parametrosAdd = { idPais: idPaisG, idReporte: idReporteG, idSegmento: idSegmentoG, idPeriodicidad: periocidadSelectXUser, queryUpdate: "", opcion: "5" };
                            peticionAjax('PanelDeControl.aspx/actualizarAgregarFichaTecnica', "POST", parametrosAdd,
                            function (data2) {
                                if (data2.d != null && data2.d.indexOf("ERRORCATCH") == -1)
                                    mostrarFichaTecnicaPaso2(idPaisG, idSegmentoG, idReporteG, serieG, idPeriodicidadG);
                                else
                                    MostrarMsj(data2.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                            }, null);
                        },
                        function btnNo() {
                            esBtnNo = true;
                            $("#divVentanaMensajes").dialog("close");
                        }, null);
                        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                            if ((esBtnNo || !esBtnSi) && !entroClose) {
                                $("#divVerFichaTecnica").dialog("close");
                                entroClose = true;
                            }
                        });
                    }
                }
                else {
                    $("#divVerFichaTecnica").dialog("close");
                    WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
                    MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
            }, null);
}


var arregloCatalogosFichaTecnica = new Array();
function generaTablaVerFichaTecnica(listaJSON, idReporte, serie) {
    arregloCatalogosFichaTecnica = new Array();
    $("#btnEditar").val("Cargar Acuse");
    var cad = '<table id="tblContenidoFichaTecnica"  class="dataGridDatos" style="font-size:9px;height:90%;width:98%">';
    cad += '<thead>';
    cad += '<tr style="font-size:9px;">';

    var auxJSON = listaJSON[0];
    for (var e = 0; e < 2; e++) {
        var i = 0;
        for (var encabezados in auxJSON) {
            if (encabezados == "CONCEPTO" || encabezados == "DESCRIPCIÓN")
                cad += '<th style="width:' + (i == 0 ? '20%' : '30%') + '">' + encabezados.toString() + '</th>';
            i++;
        }
        if (e == 0)
            cad += '<th style="width:1%;background: white;border: transparent;">&nbsp&nbsp&nbsp</th>';
    }

    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody style="font-size: 9px;">';

    var contador = 0;
    var numMitadFilas = Math.round(listaJSON.length / 2);
    for (var filas = 0; filas < numMitadFilas; filas++) {
        cad += (contador % 2 == 0) ? '<tr class="row" style="font-size: 9px;" >' : '<tr class="alternateRow" style="font-size: 9px;">';
        var json = listaJSON[filas];
        var colorTd = "";
        //darkseagreen
        if (listaJSON[filas].COLOR == "1") colorTd = "background:rgba(222, 184, 135, 0.7);";
        if (listaJSON[filas].COLOR == "2") colorTd = "background:rgba(100, 149, 237, 0.55);";
        if (listaJSON[filas].COLOR == "3") colorTd = "background:darkseagreen;";
        if (listaJSON[filas].COLOR == "4") colorTd = "background:rgba(218, 165, 32, 0.67);";
        if (listaJSON[filas].COLOR == "5") colorTd = "background:rgba(165, 42, 42, 0.66);";

        var esCampoNombre = false; //listaJSON[filas].NAMECOL == 'FVCResponsableFuente' || listaJSON[filas].NAMECOL == 'FVCNombRespSistGeneInfo' || listaJSON[filas].NAMECOL == 'FVCNombRespAreaGeneRepo' || listaJSON[filas].NAMECOL == 'FVCUsuarioResponsable' ? true : false;
        for (var element in json) {
            if (element == 'CONCEPTO') {
                cad += '<td style="text-align:left;width:20%;  height: 25x;font-size: 9px;font-weight: bold;' + colorTd + 'white-space: pre-wrap;color: rgb(24, 24, 127);font-weight: 900;">';
                cad += json[element];
                cad += '</td>';
            } else if (element == 'DESCRIPCIÓN') {
                cad += '<td style="font-family: verdana;word-wrap: break-word;max-width: 222px;text-align:left;width:30%;  height: 25px;font-size: 9px;white-space: pre-wrap;' + colorTd + '">';
                cad += '<div  class="' + (listaJSON[filas].HABILITAR == '0' ? "divSE" : "divNoEdit") + '">' + (listaJSON[filas].CONTROL != "btnImg" ? json[element] : "") + '</div>';
                if (listaJSON[filas].CONTROL == "txt")
                    cad += '  <textarea lang="aa" alt="' + listaJSON[filas].NAMECOL + '" id="txt_' + listaJSON[filas].NAMECOL + '" ' + (esCampoNombre ? '' : 'class="' + (listaJSON[filas].HABILITAR == '0' ? "divSE" : "divEdit")) + '"  cols="30" rows="2" style="display:none;font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:' + (listaJSON[filas].HABILITAR == '0' ? "#dddddd" : "White") + ';width:100%; text-align:left; border: xx;height:100%;margin-bottom: 4px;" >' + json[element] + '</textarea>';
                else if (listaJSON[filas].CONTROL == "txF")
                    cad += '<input alt="' + listaJSON[filas].NAMECOL + '" id="txtF_' + listaJSON[filas].NAMECOL + '" type="txt" class="' + (listaJSON[filas].HABILITAR == '0' ? "divSEFecha" : "divEditFecha") + '" value="' + json[element] + '" style="display:none;width: 84%;height: 100%;font-size: 10px;" onchange="changeFormatoFecha(event,this);" onkeyup="changeFormatoFecha(event,this);"/>';
                else if (listaJSON[filas].CONTROL == "btnImg") {
                    cad += '<center><img id="imgDownAcuseDis_' + idReporte + '" src="../../Images/Grales/downloadFileDisabled.png" title="No se ha Cargado Acuse"  style="height: 20px;width: 20px;float:left;cursor:pointer;display:' + (parseInt(json[element]) == 0 ? 'inline' : 'none') + '">';
                    cad += '<center><img id="imgDownAcuseShow_' + idReporte + '" src="../../Images/Grales/downloadFile.png" title="Clic para Descargar Acuse" onclick="descargaArchivoAcuseF9(\'' + idReporte + '\',\'' + PaisSelectXUser + '\');" style="height: 20px;width: 20px;float:left;cursor:pointer;display:' + (parseInt(json[element]) > 0 ? 'inline' : 'none') + '">';
                    cad += '<input alt="' + listaJSON[filas].NAMECOL + '" id="btn_' + listaJSON[filas].NAMECOL + '" type="button" class="classButton" value="Cargar Acuse" style="display:none;height: 100%;font-size: 10px;" onclick="cargarAcuseF9(\'' + idReporte + '\',\'' + serie + '\',\'' + parseInt(json[element]) + '\')"/></center>';
                }
                else if (listaJSON[filas].CONTROL == "cmb") {
                    cad += '<select alt="' + listaJSON[filas].NAMECOL + '" id="slt_' + listaJSON[filas].NAMECOL + '" class="' + (listaJSON[filas].HABILITAR == '0' ? "divSE" : "divEdit") + '" style="display:none;width: 100%;height: 100%;font-size:10px;"><select/>';
                    arregloCatalogosFichaTecnica.push("slt_" + listaJSON[filas].NAMECOL + "%%&&" + json[element]);
                }
                cad += '</td>';
            }
        }
        cad += '<td style="width:1%;background: white;">&nbsp&nbsp&nbsp</td>';
        json = listaJSON[numMitadFilas + filas];
        if (json != undefined) {

            if (listaJSON[numMitadFilas + filas].COLOR == "1") colorTd = "background:rgba(222, 184, 135, 0.7);";
            if (listaJSON[numMitadFilas + filas].COLOR == "2") colorTd = "background:rgba(100, 149, 237, 0.55);";
            if (listaJSON[numMitadFilas + filas].COLOR == "3") colorTd = "background:darkseagreen;";
            if (listaJSON[numMitadFilas + filas].COLOR == "4") colorTd = "background:rgba(218, 165, 32, 0.67);";
            if (listaJSON[numMitadFilas + filas].COLOR == "5") colorTd = "background:rgba(165, 42, 42, 0.66);";
        }

        esCampoNombre = false; // listaJSON[numMitadFilas + filas].NAMECOL == 'FVCResponsableFuente' || listaJSON[numMitadFilas + filas].NAMECOL == 'FVCNombRespSistGeneInfo' || listaJSON[numMitadFilas + filas].NAMECOL == 'FVCNombRespAreaGeneRepo' || listaJSON[numMitadFilas + filas].NAMECOL == 'FVCUsuarioResponsable' ? true : false;
        for (var element in json) {
            if (element == 'CONCEPTO') {
                cad += '<td style="word-wrap: break-word;max-width: 222px;text-align:left;width:20%;  height: 25x;font-size: 9px;font-weight: bold;' + colorTd + 'white-space: pre-wrap;color:rgb(24, 24, 127);font-weight: 900;">';
                cad += json[element];
                cad += '</td>';
            } else if (element == 'DESCRIPCIÓN') {
                cad += '<td style="font-family: verdana;text-align:left;width:30%;  height: 25px;font-size: 9px;white-space: pre-wrap;' + colorTd + '">';
                cad += '<div  class="' + (listaJSON[numMitadFilas + filas].HABILITAR == '0' ? "divSE" : "divNoEdit") + '">' + (listaJSON[numMitadFilas + filas].CONTROL != "btnImg" ? json[element] : "") + '</div>';
                if (listaJSON[numMitadFilas + filas].CONTROL == "txt")
                    cad += '  <textarea lang="aa" alt="' + listaJSON[numMitadFilas + filas].NAMECOL + '" id="txt_' + listaJSON[numMitadFilas + filas].NAMECOL + '" ' + (esCampoNombre ? '' : 'class="' + (listaJSON[numMitadFilas + filas].HABILITAR == '0' ? "divSE" : "divEdit")) + '" cols="30" rows="2" style="display:none;font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:' + (listaJSON[numMitadFilas + filas].HABILITAR == '0' ? "#dddddd" : "White") + ';width:100%; text-align:left; border: xx;height:100%;margin-bottom: 4px;" >' + json[element] + '</textarea> ';
                else if (listaJSON[numMitadFilas + filas].CONTROL == "txF")
                    cad += '<input alt="' + listaJSON[numMitadFilas + filas].NAMECOL + '" type="txt" id="txtF_' + listaJSON[numMitadFilas + filas].NAMECOL + '" class="' + (listaJSON[numMitadFilas + filas].HABILITAR == '0' ? "divSEFecha" : "divEditFecha") + '" value="' + json[element] + '" style="display:none;width: 84%;height: 100%;font-size: 10px;" onchange="changeFormatoFecha(event,this);" onkeyup="changeFormatoFecha(event,this);"/>';
                else if (listaJSON[numMitadFilas + filas].CONTROL == "btnImg") {
                    cad += '<center><img id="imgDownAcuseDis_' + idReporte + '" src="../../Images/Grales/downloadFileDisabled.png" title="No se ha Cargado Acuse"  style="height: 20px;width: 20px;float:left;cursor:pointer;display:' + (parseInt(json[element]) == 0 ? 'inline' : 'none') + '">';
                    cad += '<center><img id="imgDownAcuseShow_' + idReporte + '" src="../../Images/Grales/downloadFile.png" title="Clic para Descargar Acuse" onclick="descargaArchivoAcuseF9(\'' + idReporte + '\',\'' + PaisSelectXUser + '\');" style="height: 20px;width: 20px;float:left;cursor:pointer;display:' + (parseInt(json[element]) > 0 ? 'inline' : 'none') + '">';
                    cad += '<input alt="' + listaJSON[numMitadFilas + filas].NAMECOL + '" id="btn_' + listaJSON[numMitadFilas + filas].NAMECOL + '" type="button" class="classButton" value="Cargar Acuse" style="display:block;height: 100%;font-size: 10px;" onclick="cargarAcuseF9(\'' + idReporte + '\',\'' + serie + '\',\'' + parseInt(json[element]) + '\')"/></center>';
                }
                else if (listaJSON[numMitadFilas + filas].CONTROL == "cmb") {
                    cad += '<select alt="' + listaJSON[numMitadFilas + filas].NAMECOL + '" id="slt_' + listaJSON[numMitadFilas + filas].NAMECOL + '" class="' + (listaJSON[numMitadFilas + filas].HABILITAR == '0' ? "divSE" : "divEdit") + '" style="display:none;width: 100%;height: 100%;font-size:10px;"><select/>';
                    arregloCatalogosFichaTecnica.push("slt_" + listaJSON[numMitadFilas + filas].NAMECOL + "%%&&" + json[element]);
                }
                cad += '</td>';
            }
        }
        cad += '</tr>';
        contador++;

    }
    cad += '</tbody>';
    cad += '</table>'
    return cad;
}

function cargaCatalogosFichaTecnica(idArreglo) {
    if (arregloCatalogosFichaTecnica.length > 0) {
        peticionAjax('PanelDeControl.aspx/catalogoFichaTecnica', "POST", { opcionCatalogo: arregloCatalogosFichaTecnica[idArreglo].split("%%&&")[0].split('_')[1] },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    var JSON = obtenerArregloDeJSON(data.d, false);
                    if (JSON[0] != null) {
                        document.getElementById(arregloCatalogosFichaTecnica[idArreglo].split("%%&&")[0]).options.length = 0;
                        var indexSlt = -1;
                        for (var i = 0; i < JSON.length; i++) {
                            var Item = JSON[i];
                            var opcion = new Option(Item.descrip.toUpperCase(), Item.descrip.toUpperCase());
                            document.getElementById(arregloCatalogosFichaTecnica[idArreglo].split("%%&&")[0]).options[document.getElementById(arregloCatalogosFichaTecnica[idArreglo].split("%%&&")[0]).options.length] = opcion;
                            document.getElementById(arregloCatalogosFichaTecnica[idArreglo].split("%%&&")[0]).options[document.getElementById(arregloCatalogosFichaTecnica[idArreglo].split("%%&&")[0]).options.length - 1].title = Item.descrip.toUpperCase();
                            if (Item.descrip.toUpperCase() == arregloCatalogosFichaTecnica[idArreglo].split("%%&&")[1].toUpperCase())
                                indexSlt = i;
                        }
                        document.getElementById(arregloCatalogosFichaTecnica[idArreglo].split("%%&&")[0]).selectedIndex = indexSlt;
                    }
                }
                else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                if (idArreglo + 1 < arregloCatalogosFichaTecnica.length)
                    cargaCatalogosFichaTecnica(idArreglo + 1);
                else
                    WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
            }, null);
    }
}


function GuardarEdicionFichaTecnica() {

    var querySQL = "";
    for (var i = 0; i < $('#tblContenidoFichaTecnica >tbody >tr').length; i++) {
        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("select").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") != "")
            querySQL += $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") + "=\"" + $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("select")[0]).val() + "\",";
        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("textarea").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("textarea")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("textarea")[0]).attr("alt") != "")
            querySQL += $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("textarea")[0]).attr("alt") + "=\"" + $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("textarea")[0]).val() + "\",";
        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input:text").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("alt") != "") {
            var esTxtFecha = $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("id").split("_")[0] == "txtF" ? true : false;
            var valorTxt = $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input:text")[0]).val();
            querySQL += $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("alt") + "=\"" + (esTxtFecha && valorTxt != "" ? valorTxt.split('/')[2] + "/" + valorTxt.split('/')[1] + "/" + valorTxt.split('/')[0] : valorTxt) + "\",";
        }
        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != "")
            querySQL += $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") + "=\"" + $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).val() + "\",";

        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("select").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("select")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("select")[0]).attr("alt") != "")
            querySQL += $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("select")[0]).attr("alt") + "=\"" + $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("select")[0]).val() + "\",";
        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("textarea").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("textarea")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("textarea")[0]).attr("alt") != "")
            querySQL += $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("textarea")[0]).attr("alt") + "=\"" + $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("textarea")[0]).val() + "\",";
        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input:text").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input:text")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input:text")[0]).attr("alt") != "") {
            var esTxtFecha = $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input:text")[0]).attr("id").split("_")[0] == "txtF" ? true : false;
            var valorTxt = $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input:text")[0]).val();
            querySQL += $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input:text")[0]).attr("alt") + "=\"" + (esTxtFecha && valorTxt != "" ? valorTxt.split('/')[2] + "/" + valorTxt.split('/')[1] + "/" + valorTxt.split('/')[0] : valorTxt) + "\",";
        }
        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input.divEditFecha.hasDatepicker").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != "")
            querySQL += $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") + "=\"" + $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input.divEditFecha.hasDatepicker")[0]).val() + "\",";
    }

    WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "28%";
    var parametros = { idPais: idPaisG, idReporte: idReporteG, idSegmento: idSegmentoG, idPeriodicidad: $("#divVerFichaTecnica").attr("lang")/*$("#sltPeriodicidad").val()*/, queryUpdate: querySQL.substring(0, querySQL.length - 1), opcion: "4" };
    peticionAjax('TableroRegulatorios.aspx/actualizarAgregarFichaTecnica', "POST", parametros,
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    var UsuariosResp = $("#txt_FVCNombRespAreaFuenteInfo").val().indexOf(':') != -1 ? $("#txt_FVCNombRespAreaFuenteInfo").val() : "";
                    UsuariosResp += $("#txt_FVCNombRespSistGeneInfo").val().indexOf(':') != -1 ? $("#txt_FVCNombRespSistGeneInfo").val() : "";
                    UsuariosResp += $("#txt_FVCNombRespAreaGeneRepo").val().indexOf(':') != -1 ? $("#txt_FVCNombRespAreaGeneRepo").val() : "";
                    UsuariosResp += $("#txt_FVCNombRespAreaRespoEnvio").val().indexOf(':') != -1 ? $("#txt_FVCNombRespAreaRespoEnvio").val() : "";
                    ActualizarCorreoResponsables(UsuariosResp);
                }
                else {
                    MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
                }
            }, null);
}

function ActualizarCorreoResponsables(UsuariosResp) {
    var parametros = { Opcion: 1, UsuariosResp: UsuariosResp };
    peticionAjax("TableroRegulatorios.aspx/NoRegistrados", "POST", parametros,
        function (data) {
            var ParamActCorreo = { Opcion: 2, Empleados: data.d.toString() };
            peticionAjax("TableroRegulatorios.aspx/ActualizaCorreo", "POST", ParamActCorreo,
                function (dataC) {
                    if (dataC.d.toString() != 'true')
                        MostrarMsj("No se pudo relizar la opcion solicitada.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 200, 135, null, null, null);
                    mostrarFichaTecnicaPaso2(idPaisG, idSegmentoG, idReporteG, serieG, idPeriodicidadG);
                }, null);
        }, null);
}

//-----------------------------------------CARGAR ACUSES

function cargarAcuseF9(idReporte, descReporte, numCargasAcuse) {

    event.cancelBubble = true;
    if (numCargasAcuse == 0 || numCargasAcuse == undefined)
        mostarVentanaCargarAcuseF9(idReporte, descReporte);
    else {
        WaitingVtn("divBloqVtnFichaTecnica", true, false, "");
        MostrarMsj('Existe un Acuse para el Reporte <span style="font-weight:bold;">  ' + descReporte + '</span>. </br> ¿Desea Cargar un Nuevo Acuse? ', "Mensaje SicreNet", true, true, false, "Si", "No", "", 260, 145,
        function BtnSi() {
            $("#divVentanaMensajes").dialog("close");
            mostarVentanaCargarAcuseF9(idReporte, descReporte);
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        });
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnFichaTecnica", false, false, "");
        });
    }

}

function mostarVentanaCargarAcuseF9(idReporte, descReporte) {
    var cadena = '<div id="divBloqVtndivAcuse" style="width:98%;height:80%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
    cadena += '<div> <div id="divVentanaCargaAcuse"> <center> <table border="0" cellpadding="0" cellspacing="0">';
    cadena += ' <tbody> <tr>  <td style="height: 5px;">  </td>';
    cadena += ' <td class="TextBoxArribaCentro" colspan="3" style="height: 25px;font: normal 10px Helvetica, Arial, sans-serif;" align="left"> &nbsp;<input type="file" name="fuAcuse" id="fuAcuse" style="font-family:Arial;font-size:X-Small;width:441px;">';
    cadena += '</td><td class="TextBoxArribaDerecha" style="height: 25px;text-align: right;">&nbsp;';
    cadena += '<input type="button" name="btnLoad" value="Cargar Archivo" id="btnCargarAcuse" lang="' + idReporte + '" class="classButton" style="font-family:Arial;font-size:X-Small;" onclick="enviarArchivoAsincronamenteF9(this,\'' + descReporte + '\')"></td>';
    cadena += '</tr></tbody></table></center>';
    cadena += '</div></div>';
    $("#divCargaAcuse").empty();
    $("#divCargaAcuse").html(cadena);
    WaitingVtn("divBloqVtnFichaTecnica", true, false, "");
    AgregarVtnFlotante("divCargaAcuse", "", "CARGA ACUSE [" + descReporte.toUpperCase() + "]", "", cadena, 140, 700, false, false, "", "", null);
    $("#divCargaAcuse").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtnFichaTecnica", false, false, "");
    });
}

function enviarArchivoAsincronamenteF9(obj, descReporte) {
    if (!validarExistenciaDeArchivoF9($(obj).parent().parent().find("input:file"))) {
        return false;
    }

    $("#divVentanaMensajes").dialog("close");
    var idInputFile = $(obj).parent().parent().find("input:file").attr("id");
    var parametros = {
        'subirArchivoF9': 'subirArchivoF9',
        'idReporte': $(obj).attr("lang"),
        'idPais': idPaisG,
        'fechaCorte': fechaP.split(',')[0] + '-' + fechaP.split(',')[1] + '-' + fechaP.split(',')[2]
    };
    return ajaxFileUploadF9(idInputFile, obj, parametros);

    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtndivAcuse", false, false, "");
    });
}

function validarExistenciaDeArchivoF9(obj) {
    var bandera = false;
    if ($(obj).val() == undefined || $(obj).val() == '') {
        WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
        MostrarMsj("Debe seleccionar un archivo", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 110, null, function () {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
        });
        bandera = false;
    }
    else bandera = true;
    return bandera;
}

var seCargoFile = false;
function ajaxFileUploadF9(idInputFile, obj, parametros) {
    WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
    jQuery.ajaxFileUpload
		    ({
		        url: 'PanelDeControl.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaDeArchivoF9(data, obj, parametros.idPais, parametros.idReporte);
		        }
		    });
    return false;
}


var cargoNuevoArchivoAcuse = false;
function reportarStatusDeSubidaDeArchivoF9(data, obj, idPais, idReporte) {
    data = data.toString().replace("<pre>", "").replace("</pre>", "").replace("<PRE>", "").replace("</PRE>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "");
    var entroCerrar = false;
    if (data.indexOf('ArchivoCargado') != -1) {
        $("#divCargaAcuse").dialog("close");
        WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
        $("#imgDownAcuseDis_" + idReporte).hide();
        $("#imgDownAcuseShow_" + idReporte).css("display", "inline");
        cargoNuevoArchivoAcuse = true;

        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
        });

    }
    else if (data.indexOf('ErrorCATCH') != -1) {
        WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
        MostrarMsj(data + ".", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
        });
    }
}

function descargaArchivoAcuseF9(idReporte, idPais) {
    event.cancelBubble = true;
    window.location.assign("../../Regulatorios/MonitoreoRegulatorios/Respuesta.aspx?idReporte=" + idReporte + "&&idPais=" + idPais + "&&fechaCorte=" + fechaP.split(',')[0] + '-' + fechaP.split(',')[1] + '-' + fechaP.split(',')[2])
}

// ------------------- DESCARGA ARCHIVOS CNR / CARGA ACUSES -------------

var aplicarDesabilitarControlesEtapaIV = true;

function obtenerTablaEtapIV() {
    peticionAjax("PanelDeControl.aspx/obtenerTablaEtapIV", "POST", {
        fechaReporte: fechaP.split(',')[0] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[2],
        opcion: "1", esCargaInicial: esCargaInicial
    },
    function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $(".clsImgPdf").css("display", "inline");
                $(".clsImgStatus").css("display", "inline");
                $("#divPrepararCargaInfoDetalle").html(crearTablaEtapaIV(JSON));
                actualizarTablaEtapaIV();
                verificaExisteJOBGenerandoPaquete();
                document.getElementById("divPrepararCargaInfoDetalle").style.height = "auto";
                document.getElementById("divPrepararCargaInfoDetalle").style.width = "auto";
                AgregarVtnFlotante("divPrepararCargaInfoDetalle", "", "Descarga Archivos CNR", "", crearTablaEtapaIV(JSON), 350, 1000, false, false, "", "", null);
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        esCargaInicial = false;
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function bloquearControlesEtapaIV() {
    $(".clsSpanSolReactS").css("display", "none");
    $(".clsSpanSolReactH").css("display", "inline");
    $(".clsImgDescargaArchivoS").css("display", "none");
    $(".clsImgDescargaArchivoH").css("display", "inline");
    $(".clsImgCrearArchivoS").css("display", "none");
    $(".clsImgCrearArchivoH").css("display", "inline");
    $(".clsImgPdf").css("display", "none");
    $(".clsImgStatus").css("display", "none");
    $(".tblControls_" + 4).find("button").attr('disabled', 'disabled');
    $(".tblControls_" + 4).find("input:button").attr('disabled', 'disabled');
    $(".tblControls_" + 4).find("input:button").attr('class', 'classButtonDis');
    $(".tblControls_" + 4).find("input:text").attr('disabled', 'disabled');
    $(".tblControls_" + 4).find("input:checkbox").attr('disabled', 'disabled');
}

var bloquearEtapas = false;
var desbloquearEtapas = false;
var statusPaqueteActivo = "";
function actualizarTablaEtapaIV() {
    peticionAjax("PanelDeControl.aspx/obtenerTablaEtapIV", "POST", {
        fechaReporte: fechaP.split(',')[0] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[2],
        opcion: "1", esCargaInicial: false
    },
    function (data) {
        statusPaqueteActivo = "-1";
        bloquearEtapas = false;
        desbloquearEtapas = false;
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var listaDeJSON = obtenerArregloDeJSON(data.d, false);
                for (var filas = 0; filas < listaDeJSON.length; filas++) {
                    $("#tdFechaUltTrans_" + listaDeJSON[filas].idFormulario).html(listaDeJSON[filas].FechaUltTrans);
                    $("#tdInicio_" + listaDeJSON[filas].idFormulario).html(listaDeJSON[filas].Inicio);
                    $("#tdFin_" + listaDeJSON[filas].idFormulario).html(listaDeJSON[filas].Fin);
                    $("#tdFechaInformacion_" + listaDeJSON[filas].idFormulario).html(listaDeJSON[filas].FechaInformacion);
                    $("#tdFechaInicio_" + listaDeJSON[filas].idFormulario).html(listaDeJSON[filas].FechaInicio);
                    $("#tdFechaEnvio_" + listaDeJSON[filas].idFormulario).html(listaDeJSON[filas].FechaEnvio);
                    $("#tdUltimoMov_" + listaDeJSON[filas].idFormulario).html(listaDeJSON[filas].UltimoMovimiento);

                    if (listaDeJSON[filas].StatusFinRegulatorio == "") {
                        $("#imgStatus_" + listaDeJSON[filas].idFormulario).attr("src", "../../Images/Grales/noFinish.png");
                        $("#imgStatus_" + listaDeJSON[filas].idFormulario).attr("title", "En Proceso");
                    }
                    else if (listaDeJSON[filas].StatusFinRegulatorio == "0") {
                        $("#imgStatus_" + listaDeJSON[filas].idFormulario).attr("src", "../../Images/Grales/listo.png");
                        $("#imgStatus_" + listaDeJSON[filas].idFormulario).attr("title", "Proceso Entregado en Tiempo");
                    }
                    else if (listaDeJSON[filas].StatusFinRegulatorio == "1") {
                        $("#imgStatus_" + listaDeJSON[filas].idFormulario).attr("src", "../../Images/Grales/listoWarning.png");
                        $("#imgStatus_" + listaDeJSON[filas].idFormulario).attr("title", "Proceso Entregado, No Hay Fecha Limite en Calendario");
                    }
                    else if (listaDeJSON[filas].StatusFinRegulatorio == "2") {
                        $("#imgStatus_" + listaDeJSON[filas].idFormulario).attr("src", "../../Images/Grales/ErrorR.png");
                        $("#imgStatus_" + listaDeJSON[filas].idFormulario).attr("title", "Proceso Entregado despues de la Fecha Límite");
                    }

                    //Imgs Descarga Acuses
                    $("#imgDescAcuse_" + listaDeJSON[filas].idFormulario).attr("src", (listaDeJSON[filas].FechaEnvio == "" ? "../../Images/Grales/pdfDisabled.png" : "../../Images/Grales/pdf.png"));
                    $("#imgDescAcuse_" + listaDeJSON[filas].idFormulario).attr("title", (listaDeJSON[filas].FechaEnvio == "" ? "No se ha Cargado Acuse" : "Descargar Acuse"));
                    $("#imgDescAcuseComp_" + listaDeJSON[filas].idFormulario).attr("src", (listaDeJSON[filas].Fin == "" ? "../../Images/Grales/pdfDisabled.png" : "../../Images/Grales/pdf.png"));
                    $("#imgDescAcuseComp_" + listaDeJSON[filas].idFormulario).attr("title", (listaDeJSON[filas].Fin == "" ? "No se ha Cargado Acuse de Revisión Completada" : "Descargar Acuse de Revisión Completada"));

                    //Imgs Generar, Descargar Archivos
                    $("#imgSeg_CRE_Show_" + listaDeJSON[filas].idFormulario).css("display", $("#spStatusEtapa_3").attr("class") != "EstatusGris" && listaDeJSON[filas].ReportadoOperSecI == "1" ? "inline" : "none");
                    $("#imgSeg_CRE_Hide_" + listaDeJSON[filas].idFormulario).css("display", $("#spStatusEtapa_3").attr("class") == "EstatusGris" || listaDeJSON[filas].ReportadoOperSecI == "0" ? "inline" : "none");
                    $("#imgSeg_DES_Hide_" + listaDeJSON[filas].idFormulario).css("display", parseInt(listaDeJSON[filas].NumDescSecI) == 0 || listaDeJSON[filas].ReportadoOperSecI == "0" ? "inline" : "none");
                    $("#imgSeg_DES_Show_" + listaDeJSON[filas].idFormulario).css("display", parseInt(listaDeJSON[filas].NumDescSecI) > 0 && listaDeJSON[filas].ReportadoOperSecI == "1" ? "inline" : "none");
                    //  if ($("#spStatusEtapa_3").attr("class") != "EstatusGris")
                    $("#imgReportadoConOperSEG_" + listaDeJSON[filas].idFormulario).attr("src", (listaDeJSON[filas].ReportadoOperSecI == "1" ? "../../Images/Grales/Correcto.png" : "../../Images/PanelDeControl/cerrar.png"));
                    $("#tdNumDesSeg_" + listaDeJSON[filas].idFormulario).html(listaDeJSON[filas].NumDescSecI);

                    $("#imgRee_CRE_Show_" + listaDeJSON[filas].idFormulario).css("display", $("#spStatusEtapa_3").attr("class") != "EstatusGris" && listaDeJSON[filas].ReportadoOperSecII == "1" ? "inline" : "none");
                    $("#imgRee_CRE_Hide_" + listaDeJSON[filas].idFormulario).css("display", $("#spStatusEtapa_3").attr("class") == "EstatusGris" || listaDeJSON[filas].ReportadoOperSecII == "0" ? "inline" : "none");
                    $("#imgRee_DES_Hide_" + listaDeJSON[filas].idFormulario).css("display", parseInt(listaDeJSON[filas].NumDescSecII) == 0 || listaDeJSON[filas].ReportadoOperSecII == "0" ? "inline" : "none");
                    $("#imgRee_DES_Show_" + listaDeJSON[filas].idFormulario).css("display", parseInt(listaDeJSON[filas].NumDescSecII) > 0 && listaDeJSON[filas].ReportadoOperSecII == "1" ? "inline" : "none");
                    // if ($("#spStatusEtapa_3").attr("class") != "EstatusGris")
                    $("#imgReportadoConOperREE_" + listaDeJSON[filas].idFormulario).attr("src", (listaDeJSON[filas].ReportadoOperSecII == "1" ? "../../Images/Grales/Correcto.png" : "../../Images/PanelDeControl/cerrar.png"));
                    $("#tdNumDesRee_" + listaDeJSON[filas].idFormulario).html(listaDeJSON[filas].NumDescSecII);

                    $("#imgBaj_CRE_Show_" + listaDeJSON[filas].idFormulario).css("display", $("#spStatusEtapa_3").attr("class") != "EstatusGris" && listaDeJSON[filas].ReportadoOperSecIII == "1" ? "inline" : "none");
                    $("#imgBaj_CRE_Hide_" + listaDeJSON[filas].idFormulario).css("display", $("#spStatusEtapa_3").attr("class") == "EstatusGris" || listaDeJSON[filas].ReportadoOperSecIII == "0" ? "inline" : "none");
                    $("#imgBaj_DES_Hide_" + listaDeJSON[filas].idFormulario).css("display", parseInt(listaDeJSON[filas].NumDescSecIII) == 0 || listaDeJSON[filas].ReportadoOperSecIII == "0" ? "inline" : "none");
                    $("#imgBaj_DES_Show_" + listaDeJSON[filas].idFormulario).css("display", parseInt(listaDeJSON[filas].NumDescSecIII) > 0 && listaDeJSON[filas].ReportadoOperSecIII == "1" ? "inline" : "none");
                    // if ($("#spStatusEtapa_3").attr("class") != "EstatusGris")
                    $("#imgReportadoConOperBAJ_" + listaDeJSON[filas].idFormulario).attr("src", (listaDeJSON[filas].ReportadoOperSecIII == "1" ? "../../Images/Grales/Correcto.png" : "../../Images/PanelDeControl/cerrar.png"));
                    $("#tdNumDesBaj_" + listaDeJSON[filas].idFormulario).html(listaDeJSON[filas].NumDescSecIII);

                    // Comentarios
                    $("#imgConCom_" + listaDeJSON[filas].idFormulario).css("display", parseInt(listaDeJSON[filas].noCom) > 0 ? "inline" : "none");
                    $("#spNumcom_" + listaDeJSON[filas].idFormulario).html(parseInt(listaDeJSON[filas].noCom) > 0 ? listaDeJSON[filas].noCom : "");
                    $("#imgSinCom_" + listaDeJSON[filas].idFormulario).css("display", parseInt(listaDeJSON[filas].noCom) == 0 || listaDeJSON[filas].noCom == "" ? "inline" : "none");


                    //Reactivar Paquetes
                    $("#imgConComReactP_" + listaDeJSON[filas].idFormulario).css("display", parseInt(listaDeJSON[filas].noComR) > 0 ? "inline" : "none");
                    $("#spNumcomReactP_" + listaDeJSON[filas].idFormulario).html(parseInt(listaDeJSON[filas].noComR) > 0 ? listaDeJSON[filas].noComR : "");

                    $("#spHide_" + listaDeJSON[filas].idFormulario).css("display", (listaDeJSON[filas].PaqueteActivo == "0" && listaDeJSON[filas].Fin == "") || parseInt(listaDeJSON[filas].PaqueteActivo) > 0 ? "inline" : "none");
                    $("#spShow_" + listaDeJSON[filas].idFormulario).css("display", (listaDeJSON[filas].PaqueteActivo == "0" && listaDeJSON[filas].Fin == "") || parseInt(listaDeJSON[filas].PaqueteActivo) > 0 ? "none" : "inline");
                    $("#spHide_" + listaDeJSON[filas].idFormulario).attr("title", parseInt(listaDeJSON[filas].PaqueteActivo) > 0 ? "Paquete Reactivado,Ejecutar Etapa I,II,II" : "Para Solcitar Reactivación debe de Cargar Acuse de Revisión Completa");
                    $("#spHide_" + listaDeJSON[filas].idFormulario).html(parseInt(listaDeJSON[filas].PaqueteActivo) > 0 ? "Paquete Reactivado,Ejecutar Etapa I,II,II" : "Solcitar Reactivación de Paquete");

                    if (!desbloquearEtapas && parseInt(listaDeJSON[filas].PaqueteActivo) > 0 && listaDeJSON[filas].Fin != "") {
                        desbloquearEtapas = true;
                        bloquearEtapas = false;
                    }
                    // obtener el estatus mayor
                    statusPaqueteActivo = parseInt(listaDeJSON[filas].PaqueteActivo) > parseInt(statusPaqueteActivo) ? listaDeJSON[filas].PaqueteActivo : statusPaqueteActivo;

                    if (!bloquearEtapas && listaDeJSON[filas].PaqueteActivo == "0" && listaDeJSON[filas].Fin != "" && !desbloquearEtapas)
                        bloquearEtapas = true;
                }
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        if (bloquearEtapas) {
            for (var x = 1; x < 4; x++)
                habilitarDeshabilitarControles(false, x);
        }
        if (desbloquearEtapas) {
            $("#btnProcesar").val("Actualizar");
            if (statusPaqueteActivo == "1")
                $("#imgReProcesoE2").show();
            else
                $("#imgReProcesoE2").hide();
        }
        else {
            if ($("#imgReProcesoE1").css("display") == "none")
                $("#btnProcesar").val("Procesar");
            $("#imgReProcesoE2").hide();
        }
    }, null);
}

function crearTablaEtapaIV(listaDeJSON) {
    var cad = '<center><div ><table class="dataGridDatos" style="width: 100%;">';
    cad += '<thead>';
    cad += '<tr>';
    cad += '<td></td>';
    cad += '<th style="text-align: center;">Formulario</th>';
    cad += '<th style="text-align: center;">Nombre del Paquete</th>';
    cad += '<th style="text-align: center;">Fecha Última Transmisión</th>';
    cad += '<th style="text-align: center;">Acuse de Recibido</th>';
    cad += '<th style="text-align: center;">Acuse de Revisión Completada</th>';
    cad += '<th style="text-align: center;">Com. Acuse</th>';
    cad += '<th style="text-align: center;"><img src="../../Images/Grales/manoSi.png" style="height: 17px;width: 18px;margin-bottom: -7px;">Inicio</th>';
    cad += '<th style="text-align: center;"><img src="../../Images/Grales/manoNo.png" style="height: 17px;width: 18px;margin-bottom: -7px;">Fin</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += '<tr id="trShow_' + filas + '" lang="aa" onclick="MostrarOcultarFila(this,\'' + listaDeJSON.length + '\');" class="alternateRow"' + /*((filas % 2 == 0) ? 'class="row" ' : 'class="alternateRow" ') + */' style="cursor:pointer;" title="Clic para Mostar Detalle Formulario">';
        cad += '<td style="background: white;">';
        if (listaDeJSON[filas].StatusFinRegulatorio == "")
            cad += '<img class="clsImgStatus" id="imgStatus_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/noFinish.png" style="height: 20px;width: 19px;" title="En Proceso">';
        else if (listaDeJSON[filas].StatusFinRegulatorio == "0")
            cad += '<img class="clsImgStatus" id="imgStatus_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/listo.png" style="height: 20px;width: 19px;" title="Proceso Entregado en Tiempo">';
        else if (listaDeJSON[filas].StatusFinRegulatorio == "1")
            cad += '<img class="clsImgStatus" id="imgStatus_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/listoWarning.png" style="height: 20px;width: 19px;" title="Proceso Entregado, No Hay Fecha Limite en Calendario">';
        else if (listaDeJSON[filas].StatusFinRegulatorio == "2")
            cad += '<img class="clsImgStatus" id="imgStatus_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/ErrorR.png" style="height: 20px;width: 19px;" title="Proceso Entregado despues de la Fecha Límite">';
        cad += '</td>';
        cad += '<td style="text-align:left;"><img id="img_' + filas + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif">&nbsp&nbsp<span id="spDescFormulario_' + listaDeJSON[filas].idFormulario + '"> CNR ' + listaDeJSON[filas].Formulario + '</span></td>';
        cad += '<td style="text-align:left;">' + listaDeJSON[filas].NombrePaquete + '</td>';
        cad += '<td style="text-align:center;" id="tdFechaUltTrans_' + listaDeJSON[filas].idFormulario + '">' + listaDeJSON[filas].FechaUltTrans + '</td>';
        cad += '<td style="text-align:center;"><img class="clsImgPdf" id="imgDescAcuse_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/' + (listaDeJSON[filas].FechaEnvio == "" ? 'pdfDisabled.png" title="No se ha Cargado Acuse" ' : 'pdf.png"  title="Descargar Acuse" onclick="descargaArchivoAcuse(\'' + listaDeJSON[filas].idFormulario + '\',1);" ') + ' style="height: 20px;width: 20px;margin-bottom: -7px;cursor:pointer;"> ' +
        ' &nbsp&nbsp<input type="button" value="Cargar Acuse" title="Cargar Acuse" class="classButton" onclick="cargarAcuseCNR(\'' + listaDeJSON[filas].idFormulario + '\',1);"></td>';
        cad += '<td style="text-align:center;"><img class="clsImgPdf" id="imgDescAcuseComp_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/' + (listaDeJSON[filas].Fin == "" ? 'pdfDisabled.png" title="No se ha Cargado Acuse de Revisión Completa" ' : 'pdf.png"  title="Descargar Acuse de Revisión Completada" onclick="descargaArchivoAcuse(\'' + listaDeJSON[filas].idFormulario + '\',2);" ') + ' style="height: 20px;width: 20px;margin-bottom: -7px;cursor:pointer;" >' +
        ' &nbsp&nbsp<input type="button" title="Cargar Acuse Completo" value="Cargar Acuse Completo" class="classButton" onclick="cargarAcuseCNR(\'' + listaDeJSON[filas].idFormulario + '\',2);"></td>';

        cad += '<td style="width:3%; text-align:center"  onclick="editComentario(\'' + listaDeJSON[filas].idFormulario + '\');">';
        cad += '<div id="imgConCom_' + listaDeJSON[filas].idFormulario + '" style="display:' + (parseInt(listaDeJSON[filas].noCom) > 0 ? "inline" : "none") + '"><img src="../../Images/Portafolio/Proyectos/ConComentario.png" style="width:15px;height:13px;"  class="imgCrecer" Title="Agregar/Ver Comentario(s)"/><span id="spNumcom_' + listaDeJSON[filas].idFormulario + '" style="font-weight: bold;">' + listaDeJSON[filas].noCom + '</span></div>';
        cad += '<img id="imgSinCom_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/commentAdd.png" style="width:15px;height:13px;display:' + (parseInt(listaDeJSON[filas].noCom) == 0 || listaDeJSON[filas].noCom == "" ? "inline" : "none") + '"  class="imgCrecer" Title="Agregar Comentario"/></td>';

        cad += '<td style="text-align:center;" id="tdInicio_' + listaDeJSON[filas].idFormulario + '">' + listaDeJSON[filas].Inicio + '</td>';
        cad += '<td style="text-align:center;" id="tdFin_' + listaDeJSON[filas].idFormulario + '">' + listaDeJSON[filas].Fin + '</td>';
        cad += '</tr>';

        cad += '<tr id="trHide_' + filas + '"  style="display:none;background: rgba(240, 255, 255, 0.75);" >';
        cad += '<td style="background: white;"></td>';
        cad += '<td colspan="8"><div><table>';
        cad += '<tr><td style="text-align:left;">Paquete:</td><td style="text-align:left;">&nbsp&nbsp' + listaDeJSON[filas].Paquete + '</td></tr>';
        cad += '<tr><td style="text-align:left;">Fecha de Información:</td><td style="text-align:left;" id="tdFechaInformacion_' + listaDeJSON[filas].idFormulario + '">&nbsp' + listaDeJSON[filas].FechaInformacion + '</td></tr>';
        cad += '<tr><td style="text-align:left;">Fecha de Inicio:</td><td style="text-align:left;" id="tdFechaInicio_' + listaDeJSON[filas].idFormulario + '">&nbsp' + listaDeJSON[filas].FechaInicio + '</td></tr>';
        cad += '<tr><td style="text-align:left;">Fecha de Envio:</td><td style="text-align:left;" id="tdFechaEnvio_' + listaDeJSON[filas].idFormulario + '">&nbsp' + listaDeJSON[filas].FechaEnvio + '</td></tr>';
        cad += '<tr><td style="text-align:left;">Último Movimiento:</td><td style="text-align:left;" id="tdUltimoMov_' + listaDeJSON[filas].idFormulario + '">&nbsp' + listaDeJSON[filas].UltimoMovimiento + '</td></tr>';
        cad += '</table>';

        cad += '<table style="width: 90%;">';
        cad += '<thead>';
        cad += '<tr>';
        cad += '<th style="text-align: center;">Nombre</th>';
        cad += '<th style="text-align: center;">Descripción</th>';
        cad += '<th style="text-align: center;">Descarga Archivo</th>';
        cad += '<th style="text-align: center;">Reportado con Operaciones</th>';
        cad += '<th style="text-align: center;">Veces Generadas</th>';
        cad += '</tr>';
        cad += '</thead>';
        cad += '<tr>';
        cad += '<td style="text-align:left;">' + listaDeJSON[filas].NombreSecI + '</td>';
        cad += '<td style="text-align:left;">' + listaDeJSON[filas].DescSecI + '</td>';

        cad += '<td style="text-align:center;">';
        cad += '<div><img id="imgSeg_CRE_Show_' + listaDeJSON[filas].idFormulario + '" class="clsImgCrearArchivoS" src="../../Images/Grales/create.png" style="height: 18px;width: 19px;cursor:pointer;display:' + ($("#spStatusEtapa_3").attr("class") != "EstatusGris" && listaDeJSON[filas].ReportadoOperSecI == "1" ? 'inline;' : 'none;') + '" title="Generar Archivo" onclick="imgGenerarArchivo_Click(this,\'' + listaDeJSON[filas].Formulario.substring(0, 3).toUpperCase() + '\',\'SEG\',\'' + listaDeJSON[filas].idFormulario + '\');">'
                   + '<img id="imgSeg_CRE_Hide_' + listaDeJSON[filas].idFormulario + '" class="clsImgCrearArchivoH" src="../../Images/Grales/createDisabled.png" style="height: 18px;width: 19px;display:' + ($("#spStatusEtapa_3").attr("class") == "EstatusGris" || listaDeJSON[filas].ReportadoOperSecI == "0" ? 'inline;' : 'none;') + '" title="Para Generar Archivo, solicitar Reactivación de Paquete">'
                   + '<img class="clsImgDescargaArchivoH" id="imgSeg_DES_Hide_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/downloadDisabled.png" style="height: 20px;width: 22px;display:' + (parseInt(listaDeJSON[filas].NumDescSecI) == 0 || listaDeJSON[filas].ReportadoOperSecI == "0" ? 'inline;' : 'none;') + '" title="Sin Archivo">'
                   + '<img class="clsImgDescargaArchivoS" id="imgSeg_DES_Show_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/download.png" style="height: 20px;width: 22px;cursor:pointer;display:' + (parseInt(listaDeJSON[filas].NumDescSecI) > 0 && listaDeJSON[filas].ReportadoOperSecI == "1" ? 'inline;' : 'none;') + '" title="Descargar Archivo" onclick="imgDescargarArchivo_Click(this,\'' + listaDeJSON[filas].Formulario.substring(0, 3).toUpperCase() + '\',\'SEG\',\'' + listaDeJSON[filas].idFormulario + '\');">';
        cad += ' <img id="imgSEG_EsCargando' + omitirAcentos(listaDeJSON[filas].Formulario.substring(0, 3).toUpperCase()) + '" src="../../Images/PanelDeControl/loading4.gif" style="height: 15px; width: 15px;display:none;" title="Generando Archivo">'
        cad += '</div></td>';

        cad += '<td style="text-align:center;"><img id="imgReportadoConOperSEG_' + listaDeJSON[filas].idFormulario + '" class="clsReporadoConOper" src="' + (listaDeJSON[filas].ReportadoOperSecI == "1" ? '../../Images/Grales/Correcto.png' : '../../Images/PanelDeControl/cerrar.png') + '" style="height: 12px;width: 12px;" ></td>';
        cad += '<td id="tdNumDesSeg_' + listaDeJSON[filas].idFormulario + '" style="text-align:center;">' + listaDeJSON[filas].NumDescSecI + '</td>';
        cad += '</tr>';
        cad += '<tr>';
        cad += '<td style="text-align:left;">' + listaDeJSON[filas].NombreSecII + '</td>';
        cad += '<td style="text-align:left;">' + listaDeJSON[filas].DescSecII + '</td>';


        cad += '<td style="text-align:center;">';
        cad += '<div><img id="imgRee_CRE_Show_' + listaDeJSON[filas].idFormulario + '" class="clsImgCrearArchivoS" src="../../Images/Grales/create.png" style="height: 18px;width: 19px;cursor:pointer;display:' + ($("#spStatusEtapa_3").attr("class") != "EstatusGris" && listaDeJSON[filas].ReportadoOperSecII == "1" ? 'inline;' : 'none;') + '" title="Generar Archivo" onclick="imgGenerarArchivo_Click(this,\'' + listaDeJSON[filas].Formulario.substring(0, 3).toUpperCase() + '\',\'REE\',\'' + listaDeJSON[filas].idFormulario + '\');">'
                   + '<img id="imgRee_CRE_Hide_' + listaDeJSON[filas].idFormulario + '" class="clsImgCrearArchivoH" src="../../Images/Grales/createDisabled.png" style="height: 18px;width: 19px;display:' + ($("#spStatusEtapa_3").attr("class") == "EstatusGris" || listaDeJSON[filas].ReportadoOperSecII == "0" ? 'inline;' : 'none;') + '" title="Para Generar Archivo, solicitar Reactivación de Paquete">'
                   + '<img class="clsImgDescargaArchivoH" id="imgRee_DES_Hide_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/downloadDisabled.png" style="height: 20px;width: 22px;display:' + (parseInt(listaDeJSON[filas].NumDescSecII) == 0 || listaDeJSON[filas].ReportadoOperSecII == "0" ? 'inline;' : 'none;') + '" title="Sin Archivo">'
                   + '<img class="clsImgDescargaArchivoS" id="imgRee_DES_Show_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/download.png" style="height: 20px;width: 22px;cursor:pointer;display:' + (parseInt(listaDeJSON[filas].NumDescSecII) > 0 && listaDeJSON[filas].ReportadoOperSecII == "1" ? 'inline;' : 'none;') + '" title="Descargar Archivo" onclick="imgDescargarArchivo_Click(this,\'' + listaDeJSON[filas].Formulario.substring(0, 3).toUpperCase() + '\',\'REE\',\'' + listaDeJSON[filas].idFormulario + '\');">';
        cad += ' <img id="imgREE_EsCargando' + omitirAcentos(listaDeJSON[filas].Formulario.substring(0, 3).toUpperCase()) + '" src="../../Images/PanelDeControl/loading4.gif" style="height: 15px; width: 15px;display:none;" title="Generando Archivo">'
        cad += '</div></td>';


        cad += '<td style="text-align:center;"><img id="imgReportadoConOperREE_' + listaDeJSON[filas].idFormulario + '" class="clsReporadoConOper" src="' + (listaDeJSON[filas].ReportadoOperSecII == "1" ? '../../Images/Grales/Correcto.png' : '../../Images/PanelDeControl/cerrar.png') + '" style="height: 12px;width: 12px;" ></td>';
        cad += '<td id="tdNumDesRee_' + listaDeJSON[filas].idFormulario + '" style="text-align:center;">' + listaDeJSON[filas].NumDescSecII + '</td>';
        cad += '</tr>';
        cad += '<tr>';
        cad += '<td style="text-align:left;">' + listaDeJSON[filas].NombreSecIII + '</td>';
        cad += '<td style="text-align:left;">' + listaDeJSON[filas].DescSecIII + '</td>';

        cad += '<td style="text-align:center;">';
        cad += '<div><img id="imgBaj_CRE_Show_' + listaDeJSON[filas].idFormulario + '" class="clsImgCrearArchivoS" src="../../Images/Grales/create.png" style="height: 18px;width: 19px;cursor:pointer;display:' + ($("#spStatusEtapa_3").attr("class") != "EstatusGris" && listaDeJSON[filas].ReportadoOperSecIII == "1" ? 'inline;' : 'none;') + '" title="Generar Archivo" onclick="imgGenerarArchivo_Click(this,\'' + listaDeJSON[filas].Formulario.substring(0, 3).toUpperCase() + '\',\'BAJ\',\'' + listaDeJSON[filas].idFormulario + '\');">'
                   + '<img id="imgBaj_CRE_Hide_' + listaDeJSON[filas].idFormulario + '" class="clsImgCrearArchivoH" src="../../Images/Grales/createDisabled.png" style="height: 18px;width: 19px;display:' + ($("#spStatusEtapa_3").attr("class") == "EstatusGris" || listaDeJSON[filas].ReportadoOperSecIII == "0" ? 'inline;' : 'none;') + '" title="Para Generar Archivo, solicitar Reactivación de Paquete">'
                   + '<img class="clsImgDescargaArchivoH" id="imgBaj_DES_Hide_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/downloadDisabled.png" style="height: 20px;width: 22px;display:' + (parseInt(listaDeJSON[filas].NumDescSecII) == 0 || listaDeJSON[filas].ReportadoOperSecIII == "0" ? 'inline;' : 'none;') + '" title="Sin Archivo">'
                   + '<img class="clsImgDescargaArchivoS" id="imgBaj_DES_Show_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/download.png" style="height: 20px;width: 22px;cursor:pointer;display:' + (parseInt(listaDeJSON[filas].NumDescSecII) > 0 && listaDeJSON[filas].ReportadoOperSecIII == "1" ? 'inline;' : 'none;') + '" title="Descargar Archivo" onclick="imgDescargarArchivo_Click(this,\'' + listaDeJSON[filas].Formulario.substring(0, 3).toUpperCase() + '\',\'BAJ\',\'' + listaDeJSON[filas].idFormulario + '\');">';
        cad += ' <img id="imgBAJ_EsCargando' + omitirAcentos(listaDeJSON[filas].Formulario.substring(0, 3).toUpperCase()) + '" src="../../Images/PanelDeControl/loading4.gif" style="height: 15px; width: 15px;display:none;" title="Generando Archivo">'
        cad += '</div></td>';

        cad += '<td style="text-align:center;"><img id="imgReportadoConOperBAJ_' + listaDeJSON[filas].idFormulario + '" class="clsReporadoConOper" src="' + (listaDeJSON[filas].ReportadoOperSecIII == "1" ? '../../Images/Grales/Correcto.png' : '../../Images/PanelDeControl/cerrar.png') + '" style="height: 12px;width:12px;" ></td>';
        cad += '<td id="tdNumDesBaj_' + listaDeJSON[filas].idFormulario + '" style="text-align:center;">' + listaDeJSON[filas].NumDescSecIII + '</td>';
        cad += '</tr>';

        cad += '</table></div></td></tr>';
        cad += '<tr style="background: #F0FFFF;"><td style="background: white;"></td><td colspan="6"></td><td class="clsTdSolicReact" colspan="2" style="text-align:right;">';
        cad += '<div id="imgConComReactP_' + listaDeJSON[filas].idFormulario + '" style="display:' + (parseInt(listaDeJSON[filas].noComR) > 0 ? "inline" : "none") + '" onclick="verComentariosReactivarPaquete(\'' + listaDeJSON[filas].idFormulario + '\');"><img src="../../Images/Portafolio/Proyectos/ConComentario.png" style="width:15px;height:13px;"  class="imgCrecer" Title="Clic para Ver Comentario(s) Reactivación de Paquete"/><span id="spNumcomReactP_' + listaDeJSON[filas].idFormulario + '" style="font-weight: bold;">' + listaDeJSON[filas].noComR + '</span></div>';


        cad += '<span class="clsSpanSolReactH" id="spHide_' + listaDeJSON[filas].idFormulario + '" style="text-align: right;color: gray;text-decoration: underline;font-size: 11px;cursor:pointer;display:' + ((listaDeJSON[filas].PaqueteActivo == "0" && listaDeJSON[filas].Fin == "") || parseInt(listaDeJSON[filas].PaqueteActivo) > 0 ? 'inline;' : 'none;') + '" title="' + (parseInt(listaDeJSON[filas].PaqueteActivo) > 0 ? "Paquete Reactivado,Ejecutar Etapa I,II,II" : "Para Solcitar Reactivación debe de Cargar Acuse de Revisión Completa") + '">' + (parseInt(listaDeJSON[filas].PaqueteActivo) > 0 ? "Paquete Reactivado,Ejecutar Etapa I,II,II" : "Solicitar Reactivación de Paquete") + '</span>';
        cad += '<span class="clsSpanSolReactS" id="spShow_' + listaDeJSON[filas].idFormulario + '" onclick="reactivarPaquete_Click(this,\'' + listaDeJSON[filas].idFormulario + '\',\'' + listaDeJSON[filas].Formulario + '\');" style="text-align: right;color: blue;text-decoration: underline;font-size: 11px;cursor:pointer;display:' + ((listaDeJSON[filas].PaqueteActivo == "0" && listaDeJSON[filas].Fin == "") || parseInt(listaDeJSON[filas].PaqueteActivo) > 0 ? 'none;' : 'inline;') + '" title="Al Reactivar el Paquete, se debe Reprocesar la Etapa I,II,III">Solicitar Reactivación de Paquete</span>';
        cad += '</td></tr>';
    }
    cad += '</tbody>';
    cad += '</table></div></center>';
    return cad;
}

function verComentariosReactivarPaquete(idFormulario) {
    Waiting(true, "Espere por favor. Cargando Información...");
    var parametros = { idFormulario: parseInt(idFormulario), fechaCorte: fechaP.split(',')[0] + "-" + fechaP.split(',')[1] + "-" + fechaP.split(',')[2], Comentario: "", tipoComentario: 2, Opcion: 2 };
    peticionAjax("PanelDeControl.aspx/controlComentariosAcuseCNR", "POST", parametros, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var JSON = new Array();
                for (var i = 0; i < data.d.split("####|").length; i++) {
                    var JSONTemp = new Array();
                    for (var ii = 0; ii < data.d.split("####|")[i].split("%%%%|,").length; ii++) {
                        JSONTemp[data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[0]] = data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[1];
                    }
                    JSON.push(JSONTemp);
                }
                delete JSON[JSON.length - 1];
                var cadena = '<div id="divBloqVtnVerComentarios" style="width:94%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:84%;overflow:hidden;text-align:center;float:left;">';
                cadena += '<div id="dvDetalleEITbl" style="width:100%;height:100%;overflow: auto;margin-top: 0px;"> </div>';
                cadena += '</div>';
                $("#divCargaAcuse").empty();
                AgregarVtnFlotante("divCargaAcuse", "", "COMENTARIOS SOLICITUD REACTIVACION PAQUETE (" + $("#spDescFormulario_" + idFormulario).html().toUpperCase() + ")", "", cadena, 150, 400, false, false, "", "", null);
                $('#dvDetalleEITbl').html(generarTablaDeRegistrosSinFoot(JSON, "left"));
            }
            else MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);

}

function imgGenerarArchivo_Click(obj, producto, seccion, idFormulario) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("PanelDeControl.aspx/existeIdJobGenerarPaquete", "POST", { seccion: seccion, producto: omitirAcentos(producto) }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                if (parseInt(data.d) == 0) {
                    $("#img" + seccion + "_EsCargando" + omitirAcentos(producto)).css("display", "inline");
                    var numDescargas = parseInt($("#td_" + $(obj).attr("id").split('_')[0] + "_" + $(obj).attr("id").split('_')[3]).html());
                    $("#td_" + $(obj).attr("id").split('_')[0] + "_" + $(obj).attr("id").split('_')[3]).html(numDescargas + 1);
                    peticionAjax("PanelDeControl.aspx/Generar", "POST", { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], seccion: seccion, producto: omitirAcentos(producto), idFormulario: idFormulario }, function (data) {
                        if (data.d.indexOf("ERRORCATCH") == -1) {
                            if (data.d != "") {
                                $(obj).hide();
                                $("#" + $(obj).attr("id").split('_')[0] + '_' + $(obj).attr("id").split('_')[1] + '_Hide_' + $(obj).attr("id").split('_')[3]).css("display", "inline");
                                $("#" + $(obj).attr("id").split('_')[0] + '_DES_Hide_' + $(obj).attr("id").split('_')[3]).hide();
                                $("#" + $(obj).attr("id").split('_')[0] + '_DES_Show_' + $(obj).attr("id").split('_')[3]).css("display", "inline");
                            }
                        }
                        else {
                            $("#img" + seccion + "_EsCargando" + omitirAcentos(producto)).css("display", "none");
                            MostrarMsj(data.d.split(':')[1], "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                        }
                        Waiting(false, "Espere por favor. Cargando Información...");
                    });
                }
                else {
                    MostrarMsj("El archivo <span style='font-weight:bold;'>" + fechaP.split(',')[0] + fechaP.split(',')[1] + seccion + omitirAcentos(producto) + ".zip</span> esta en Proceso de Generación.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                    Waiting(false, "Espere por favor. Cargando Información...");
                }
            }
            else Waiting(false, "Espere por favor. Cargando Información...");
        }
        else {
            MostrarMsj(data.d.split(':')[1], "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    });
}

function imgDescargarArchivo_Click(obj, producto, seccion, idFormulario) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("PanelDeControl.aspx/existeIdJobGenerarPaquete", "POST", { seccion: seccion, producto: omitirAcentos(producto) }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                if (parseInt(data.d) == 0)
                    __doPostBack('DescargarZipBXC', fechaP.split(',')[0] + "-" + fechaP.split(',')[1] + "-" + fechaP.split(',')[2] + "_" + seccion + "_" + omitirAcentos(producto) + "_" + idFormulario);
                else
                    MostrarMsj("El archivo <span style='font-weight:bold;'>" + fechaP.split(',')[0] + fechaP.split(',')[1] + seccion + omitirAcentos(producto) + ".zip</span> esta en Proceso de Generación.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            }
        }
        else
            MostrarMsj(data.d.split(':')[1], "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function reactivarPaquete_Click(obj, idFormulario, producto) {
    MostrarMsj('Al Reactivar el Paquete <span style="font-weight:bold;"> CNR ' + producto + '</span>, se debera reprocesar la Etapa I,II,II. ¿Desea continuar? ', "Mensaje", true, true, false, "Si", "No", "", 260, 145,
        function BtnSi() {
            $("#divVentanaMensajes").dialog("close");
            Waiting(true, "Espere por favor. Cargando Información...");
            peticionAjax("PanelDeControl.aspx/existePaqueteEnReactivacion", "POST",
            { fechaReporte: fechaP.split(',')[0] + "-" + fechaP.split(',')[1] + "-" + fechaP.split(',')[2], opcion: "3", idFormulario: idFormulario }, function (data) {
                if (data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d.indexOf("ExitsPaqueteR") != -1)
                        MostrarMsj('No se puede Reactivar por que el Paquete <span style="font-weight:bold;"> CNR ' + data.d.split(':')[1] + '</span> esta Reactivado. </br></br> Nota: Ejecute la Etapa I, II,III', "Mensaje", false, true, false, "", "Aceptar", "", 260, 160, null, null, null);

                    else if (data.d == "")
                        comentarioReactivarPaquete(idFormulario, producto);
                }
                else
                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
        }, function () {
            $("#divVentanaMensajes").dialog("close");

        });
}

function reactivarPaquetePaso2(idFormulario, producto) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("PanelDeControl.aspx/reactivarPaquete", "POST", { fechaReporte: fechaP.split(',')[0] + "-" + fechaP.split(',')[1] + "-" + fechaP.split(',')[2], opcion: "3", idFormulario: idFormulario, producto: producto.substring(0, 3).toUpperCase() }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d.indexOf("ExitsPaqueteR") != -1) {
                MostrarMsj('No se puede Reactivar por que el Paquete <span style="font-weight:bold;"> CNR ' + data.d.split(':')[1] + '</span> esta Reactivado. </br></br> Nota: Ejecute la Etapa I, II,III', "Mensaje", false, true, false, "", "Aceptar", "", 260, 160, null, null, null);
            }
            else if (data.d == "") {
                for (var x = 1; x < 4; x++)
                    habilitarDeshabilitarControles(true, x);
                $("#btnProcesar").val("Actualizar");
                $("#spHide_" + idFormulario).css("display", "inline");
                $("#spShow_" + idFormulario).css("display", "none");
                $("#spHide_" + idFormulario).attr("title", "Paquete Reactivado,Ejecutar Etapa I,II,II");
                $("#spHide_" + idFormulario).html("Paquete Reactivado,Ejecutar Etapa I,II,II");
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function MostrarOcultarFila(obj, lengthJson) {
    for (var i = 0; i < parseInt(lengthJson) ; i++) {
        if (parseInt($(obj).attr("id").split('_')[1]) != i) {
            $("#trHide_" + i).hide();
            $("#trShow_" + i).attr("title", "Clic para Mostar Detalle Formulario");
            $("#trShow_" + i).attr("lang", "aa");
            document.getElementById("img_" + i).setAttribute("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
        }
    }

    if ($(obj).attr("lang") == "aa") {
        $("#trHide_" + $(obj).attr("id").split('_')[1]).show();
        $("#trShow_" + $(obj).attr("id").split('_')[1]).attr("title", "Clic para Ocultar Detalle Formulario");
        document.getElementById("img_" + $(obj).attr("id").split('_')[1]).setAttribute("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
        $(obj).attr("lang", "ab");
    }
    else {
        $("#trHide_" + $(obj).attr("id").split('_')[1]).hide();
        $("#trShow_" + $(obj).attr("id").split('_')[1]).attr("title", "Clic para Mostar Detalle Formulario");
        document.getElementById("img_" + $(obj).attr("id").split('_')[1]).setAttribute("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
        $(obj).attr("lang", "aa");
    }
    document.getElementById("divPrepararCargaInfoDetalle").style.height = "auto";
}


function cargarAcuseCNR(idFormulario, idTipoArchivoAcuse) {
    event.cancelBubble = true;
    if (idTipoArchivoAcuse == "2" && $("#imgDescAcuse_" + idFormulario).attr("src").indexOf("Disabled") != -1) {
        MostrarMsj("Para cargar el Acuse de Revisión Completa del Formulario <span style='font-weight:bold;'>" + $("#spDescFormulario_" + idFormulario).html().toUpperCase() + "</span>, debe de haber cargado primero el Acuse de Recibido", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 260, 150, null, null, null);
    }
    else {
        var cadena = '<div id="divBloqVtndivAcuse" style="width:98%;height:80%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
        cadena += '<div> <div id="divVentanaCargaAcuse"> <center> <table border="0" cellpadding="0" cellspacing="0">';
        cadena += ' <tbody> <tr>  <td style="height: 5px;">  </td>';
        cadena += ' <td class="TextBoxArribaCentro" colspan="3" style="height: 25px;font: normal 10px Helvetica, Arial, sans-serif;" align="left"> &nbsp;<input type="file" name="fuAcuse" id="fuAcuse" style="font-family:Arial;font-size:X-Small;width:441px;">';
        cadena += '</td><td class="TextBoxArribaDerecha" style="height: 25px;text-align: right;">&nbsp;';
        cadena += '<input type="button" name="btnLoad" value="Cargar Archivo" id="btnCargarAcuse" lang="' + idFormulario + ',' + idTipoArchivoAcuse + '" class="classButton" style="font-family:Arial;font-size:X-Small;" onclick="enviarArchivoAsincronamente(this,\'2\')"></td>';
        cadena += '</tr></tbody></table></center>';
        cadena += '</div></div>';
        $("#divCargaAcuse").empty();
        $("#divCargaAcuse").html(cadena);
        var tituloAcuse = (idTipoArchivoAcuse == "1" ? "ACUSE " : "ACUSE DE REVISIÓN COMPLETA ");
        AgregarVtnFlotante("divCargaAcuse", "", "CARGA " + tituloAcuse + $("#spDescFormulario_" + idFormulario).html().toUpperCase(), "", cadena, 140, 700, false, false, "", "", null);
    }
}

function verificaExisteJOBGenerandoPaquete() {
    peticionAjax('ConsumoNoRevolvente.aspx/verificaExisteJOBGenerandoPaquete', "POST", null,
    function (data) {
        var strSecciones = "SEG,BAJ,REE";
        var strProductos = "NOM,PER,AUT,ABC,OTR,GRU";
        if (data.d != "") {
            for (var i = 0; i < strSecciones.split(',').length; i++) {
                for (var ii = 0; ii < strProductos.split(',').length; ii++) {
                    var existeReg = false;
                    for (var iii = 0; iii < data.d.split(',').length; iii++) {
                        if (strSecciones.split(',')[i] + "-" + strProductos.split(',')[ii] == data.d.split(',')[iii]) {
                            existeReg = true;
                            break;
                        }
                    }
                    if (!existeReg)
                        $("#img" + strSecciones.split(',')[i] + "_EsCargando" + strProductos.split(',')[ii]).css("display", "none");
                    else
                        $("#img" + strSecciones.split(',')[i] + "_EsCargando" + strProductos.split(',')[ii]).css("display", "inline");
                }
            }
        }
        else {
            for (var i = 0; i < strSecciones.split(',').length; i++) {
                for (var ii = 0; ii < strProductos.split(',').length; ii++)
                    $("#img" + strSecciones.split(',')[i] + "_EsCargando" + strProductos.split(',')[ii]).css("display", "none");
            }
        }
        setTimeout(verificaExisteJOBGenerandoPaquete, 10000);
    }, null);
}
//-------------- COMENTARIOS ------------- ////

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
    var parametros = { idFormulario: parseInt(idFormulario), fechaCorte: fechaP.split(',')[0] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[2], Comentario: "", tipoComentario: 1, Opcion: 2 };
    peticionAjax("PanelDeControl.aspx/controlComentariosAcuseCNR", "POST", parametros, ObtieneDataComentario, ObtieneDataComentario);
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
    var parametros = { idFormulario: parseInt(idFormulario), fechaCorte: fechaP.split(',')[0] + "-" + fechaP.split(',')[1] + "-" + fechaP.split(',')[2], Comentario: $("#txtComenComentarioP").val(), tipoComentario: tipoComentario, Opcion: 1 };
    peticionAjax("PanelDeControl.aspx/controlComentariosAcuseCNR", "POST", parametros, function (data) {
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
