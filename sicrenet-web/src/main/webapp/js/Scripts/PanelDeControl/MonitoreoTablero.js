
var opcionPeticion = "";
function ObtenerCatalogoFuentesMonitoreo() {
    var parametros = { fechaPeriodo: (PaisSelectXUser == "1" ? fechaP.replace(',', '').replace(',', '') : fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0]), peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
    opcionPeticion = "EtapaI";
    peticionAjax('PanelDeControl.aspx/ObtenerCatalogoFuentes', "POST", parametros, function ObtenerCatalogoFuentesMonitoreo_Finaliza(data) {
        if (data.d.indexOf("FSId_Fuente") != -1 || (data.d == "" && opcionPeticion == "EtapaI")) {
            if (data.d != "") {
                DefinicionGneralFuentes = new Array();
                DefinicionGneralFuentes = DevuelveArregloDefinicione(data, 1, "FSId_Fuente", "Fuente", "IdEstatus", "Fase", "Clasificacion");
                var parametrosRefreshEstatusMet = { fechaPeriodo: fechaP.split(",")[2] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[0], periodicidad: (periocidadSelectXUser), idPais: PaisSelectXUser }; 
                opcionPeticion = "EtapaII";
                peticionAjax('PanelDeControl.aspx/ObtenerCatalogoEstausMetodologias', "POST", parametrosRefreshEstatusMet, ObtenerCatalogoFuentesMonitoreo_Finaliza, ObtenerCatalogoFuentesMonitoreo_Finaliza);
            }
            else {
                var parametros = { fechaPeriodo: (PaisSelectXUser == "1" ? fechaP.replace(',', '').replace(',', '') : fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0]), peridiocidad: (periocidadSelectXUser), idPais: 1 };//Cambiar por el Pais Seleccionado Por el usuario
                opcionPeticion = "EtapaI";
                peticionAjax('PanelDeControl.aspx/ObtenerCatalogoFuentes', "POST", parametros, ObtenerCatalogoFuentesMonitoreo_Finaliza, ObtenerCatalogoFuentesMonitoreo_Finaliza);
            }
        }
        else if (data.d.indexOf("FIIdMetodologia") != -1 || (data.d == "" && opcionPeticion == "EtapaII")) {
            if (data.d != "") {
                DefinicionGneralMetodologias = new Array();
                DefinicionGneralMetodologias = DevuelveArregloDefinicione(data, 2, "FIIdMetodologia", "Metodologia", "IdEstatus", "Fase", "Clasificacion");
                var parametrosRefreshEstatusRepor = { fechaPeriodo: fechaP.split(",")[2] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[0], periodicidad: (periocidadSelectXUser), idPais: PaisSelectXUser }; 
                opcionPeticion = "EtapaIII";
                peticionAjax('PanelDeControl.aspx/ObtenerCatalogoEstausReportes', "POST", parametrosRefreshEstatusRepor, ObtenerCatalogoFuentesMonitoreo_Finaliza, ObtenerCatalogoFuentesMonitoreo_Finaliza);
            }
            else {
                var parametrosRefreshEstatusMet = { fechaPeriodo: fechaP.split(",")[2] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[0], periodicidad: (periocidadSelectXUser), idPais: 1 }; //Cambiar por el Pais Seleccionado Por el usuario
                opcionPeticion = "EtapaII";
                peticionAjax('PanelDeControl.aspx/ObtenerCatalogoEstausMetodologias', "POST", parametrosRefreshEstatusMet, ObtenerCatalogoFuentesMonitoreo_Finaliza, ObtenerCatalogoFuentesMonitoreo_Finaliza);
            }
        }
        else if (data.d.indexOf("IdReporte") != -1 || (data.d == "" && opcionPeticion == "EtapaIII")) {
            if (data.d != "") {
                DefinicionGneralReportes = new Array();
                DefinicionGneralReportes = DevuelveArregloDefinicione(data, 3, "IdReporte", "Reporte", "IdEstatus", "Fase", "Clasificacion");
                indiceDefinicionesMonitoreo = 0;
                CrearTableroMonitoreo(DefinicionGneralFuentes, DefinicionGneralMetodologias, DefinicionGneralReportes);
                setTimeout(ObtenerCatalogoFuentesMonitoreo, 3000);
            }
            else {
                var parametrosRefreshEstatusRepor = { fechaPeriodo: fechaP.split(",")[2] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[0], periodicidad: (periocidadSelectXUser), idPais: 1 }; //Cambiar por el Pais Seleccionado Por el usuario
                opcionPeticion = "EtapaIII";
                peticionAjax('PanelDeControl.aspx/ObtenerCatalogoEstausReportes', "POST", parametrosRefreshEstatusRepor, ObtenerCatalogoFuentesMonitoreo_Finaliza, ObtenerCatalogoFuentesMonitoreo_Finaliza);
            }
        }
    }, null);
}

var DefinicionGneralFuentes = new Array();
var DefinicionGneralMetodologias = new Array();
var DefinicionGneralReportes = new Array();
var esLoadMonitoreo = true;
function DevuelveArregloDefinicione(data, opcion, campo1, campo2, campo3, campo4, campo5) {
    var DefinicionesArrayI = new Array();
    var DefinicionesArrayII = new Array();
    var DefinicionesArrayIII = new Array()
    var DefinicionGneralFuentesTemp = new Array();
    indiceMonitoreoF = 0; indiceMonitoreoM = 0; indiceMonitoreoR = 0
    entroF = false; entroM = false; entroR = false;
    var JSONMonitoreo = obtenerArregloDeJSON(data.d, false);
    var fases = opcion == 1 ? "1,2,3" : (opcion == 2 ? "4,5,6" : ("7,8,9"));
    for (var i = 0; i < JSONMonitoreo.length; i++) {
        var indiceArreglo = DevuelveIndiceDeElementoExistente(JSONMonitoreo[i][campo1], DefinicionGneralFuentesTemp);
        if (indiceArreglo == -1) {
            DefinicionGneralFuentesTemp.push(JSONMonitoreo[i][campo1] + "&&" + JSONMonitoreo[i][campo2] + "&&" + (JSONMonitoreo[i][campo4] == "0" ? "1,1,1" : (i < JSONMonitoreo.length - 1 && JSONMonitoreo[i][campo1] != JSONMonitoreo[i + 1][campo1] ? DeterminaEstatusDeFases(fases, JSONMonitoreo[i][campo4], JSONMonitoreo[i][campo3]) : JSONMonitoreo[i][campo3])) + "&&" + (JSONMonitoreo[i][campo4] == "0" ? fases : (i < JSONMonitoreo.length - 1 && JSONMonitoreo[i][campo1] != JSONMonitoreo[i + 1][campo1] ? fases : JSONMonitoreo[i][campo4])) + "&&" + JSONMonitoreo[i][campo5]);
        }
        else if (DefinicionGneralFuentesTemp[indiceArreglo].split('&&')[3].indexOf(JSONMonitoreo[i][campo4])==-1) {
            DefinicionGneralFuentesTemp[indiceArreglo] = DefinicionGneralFuentesTemp[indiceArreglo].split("&&")[0] + "&&" + DefinicionGneralFuentesTemp[indiceArreglo].split("&&")[1] + "&&" + (DefinicionGneralFuentesTemp[indiceArreglo].split("&&")[2] + "," + JSONMonitoreo[i][campo3]) + "&&" + (DefinicionGneralFuentesTemp[indiceArreglo].split("&&")[3] + "," + JSONMonitoreo[i][campo4]) + "&&" + DefinicionGneralFuentesTemp[indiceArreglo].split("&&")[4];
        }
    }
    for (var i = 0; i < DefinicionGneralFuentesTemp.length; i++) {
        var entroArreglo = false;
        if (i == 0 || (DevuelveIndexDeElementoExistente(DefinicionGneralFuentesTemp[i].split("&&")[4], DefinicionesArrayI, 4) != -1)) {
            DefinicionesArrayI.push(DefinicionGneralFuentesTemp[i]);
            entroArreglo = true;
        }
        else if (!entroArreglo && (DefinicionesArrayII.length == 0 || (DevuelveIndexDeElementoExistente(DefinicionGneralFuentesTemp[i].split("&&")[4], DefinicionesArrayII, 4) != -1))) {
            DefinicionesArrayII.push(DefinicionGneralFuentesTemp[i]);
            entroArreglo = true;
        }
        else if (!entroArreglo && (DefinicionesArrayIII.length == 0 || (DevuelveIndexDeElementoExistente(DefinicionGneralFuentesTemp[i].split("&&")[4], DefinicionesArrayIII, 4) != -1))) {
            DefinicionesArrayIII.push(DefinicionGneralFuentesTemp[i]);
            entroArreglo = true;
        }
    }
    if (opcion == 1)
        return DefinicionesArrayI.concat(DefinicionesArrayII, DefinicionesArrayIII);
    else if (opcion == 2)
        return DefinicionesArrayII.concat(DefinicionesArrayI, DefinicionesArrayIII);
    else if (opcion == 3)
        return DefinicionesArrayIII.concat(DefinicionesArrayI, DefinicionesArrayII);
}

var indiceMonitoreoF = 0; var indiceMonitoreoM = 0; var indiceMonitoreoR = 0;
function CrearTableroMonitoreo(ArrayFuentes, ArrayMetodologias, ArrayReportes) {
    var cadena = '<table style="width:100%"><tr style="width: inherit;text-align: center;color: rgb(255, 255, 255);"><td colspan="4" style="width:30%" class="EncabClasCarga">I</td><td colspan="4" style="width:30%" class="EncabClasMet">II</td><td colspan="4" class="EncabClasRep" style="width:30%">III</td></tr>';
    while (indiceMonitoreoF < ArrayFuentes.length || indiceMonitoreoM < ArrayMetodologias.length || indiceMonitoreoR < ArrayReportes.length) {
        cadena += CreaFilaMonitoreo(ArrayFuentes, ArrayMetodologias, ArrayReportes);
    }
    $("#divTablaMonitoreo").show();
    if (esLoadMonitoreo == true) {
        $("#divTablaMonitoreo").html("<div style='height:20px;'></div>" + cadena);
        esLoadMonitoreo = false;
    }
    Waiting(false, "Espere por favor. Cargando Información...");

}

function DeterminaEstatusDeFases(fases, fase, estatus) {
    var cadenaEstatus = "";
    for (var i = 0; i < fases.split(',').length; i++) {
        if (fases.split(',')[i] == fase)
            cadenaEstatus += estatus + ",";
        else
            cadenaEstatus += "1,";
    }
    cadenaEstatus = cadenaEstatus.substring(0, cadenaEstatus.length - 1);
    return cadenaEstatus;
}
var entroF = false; var entroM = false; var entroR = false; var casoEspecialF = false; var casoEspecialM = false; var casoEspecialR = false;
function CreaFilaMonitoreo(ArrayFuentes, ArrayMetodologias, ArrayReportes) {
    var cadena = "<tr style='height:30px;font: normal 9px Helvetica, Arial, sans-serif;'>";
    if (indiceMonitoreoF < ArrayFuentes.length) {
        if (((indiceMonitoreoF > 0 && ArrayFuentes[indiceMonitoreoF].split('&&')[4] != ArrayFuentes[indiceMonitoreoF - 1].split('&&')[4]) || indiceMonitoreoF == 0) && !entroF) {
            if (casoEspecialF)
                cadena += AgregarFilaFuente(ArrayFuentes, 1, 4, indiceMonitoreoF, "EncabClasCarga");
            if (indiceMonitoreoF < ArrayFuentes.length && !casoEspecialF) {
                cadena += '<td class="EncabClasCarga" style="width:8%;font-weight:bold;color:white;">' + ArrayFuentes[indiceMonitoreoF].split("&&")[4] + '</td>';
                for (var i = 0; i < 3; i++)
                    cadena += '<td class="EncabClasCarga" style="width:8%;font-weight:bold;color:white;">' + (indiceMonitoreoF == 0 ? (i == 0 ? "CARGA DE FACTORES" : (i == 1 ? "VAL. DE FUENTE" : "VAL. ESTRUCTURA")) : "") + '</td>';
                if ((indiceMonitoreoF < ArrayFuentes.length - 1 && ArrayFuentes[indiceMonitoreoF].split('&&')[4] != ArrayFuentes[indiceMonitoreoF + 1].split('&&')[4]) || indiceMonitoreoF == ArrayFuentes.length - 1)
                    casoEspecialF = true;
                else {
                    if (indiceMonitoreoF < ArrayFuentes.length - 1 || ArrayFuentes.length == 1)
                        indiceMonitoreoF++;
                    entroF = true;
                }
            }
            else if (casoEspecialF) { casoEspecialF = false; indiceMonitoreoF++; }
        }
        else {
            if (entroF) {
                if (indiceMonitoreoF == ArrayFuentes.length - 1 && ArrayFuentes.length > 2) {
                    cadena += AgregarFilaFuente(ArrayFuentes, 1, 4, indiceMonitoreoF, "EncabClasCarga");
                    indiceMonitoreoF++;
                }
                else { indiceMonitoreoF--; entroF = false; }
            }
            if (indiceMonitoreoF < ArrayFuentes.length) {
                cadena += AgregarFilaFuente(ArrayFuentes, 1, 4, indiceMonitoreoF, "EncabClasCarga");
                indiceMonitoreoF++;
            }
        }
    } else {
        cadena += "<td></td><td></td><td></td><td></td>";
    }
    if (indiceMonitoreoM < ArrayMetodologias.length) {
        if (((indiceMonitoreoM > 0 && ArrayMetodologias[indiceMonitoreoM].split('&&')[4] != ArrayMetodologias[indiceMonitoreoM - 1].split('&&')[4]) || indiceMonitoreoM == 0) && !entroM) {
            if (casoEspecialM)
                cadena += AgregarFilaFuente(ArrayMetodologias, 4, 7, indiceMonitoreoM, "EncabClasMet");
            if (indiceMonitoreoM < ArrayMetodologias.length && !casoEspecialM) {
                cadena += '<td class="EncabClasMet" style="width:8%;font-weight:bold;color:white;">' + ArrayMetodologias[indiceMonitoreoM].split("&&")[4] + '</td>';
                for (var i = 0; i < 3; i++)
                    cadena += '<td class="EncabClasMet" style="width:8%;font-weight:bold;color:white;">' + (indiceMonitoreoM == 0 ? (i == 0 ? "PROCESAMIENTO" : (i == 1 ? "VAL. AL PROCESO" : "VAL VS ANTERIOR")) : "") + '</td>';

                if ((indiceMonitoreoM < ArrayMetodologias.length - 1 && ArrayMetodologias[indiceMonitoreoM].split('&&')[4] != ArrayMetodologias[indiceMonitoreoM + 1].split('&&')[4]) || indiceMonitoreoM == ArrayMetodologias.length - 1)
                    casoEspecialM = true;
                else {
                    if (indiceMonitoreoM < ArrayMetodologias.length - 1 || ArrayMetodologias.length == 1)
                        indiceMonitoreoM++;
                    entroM = true;
                }
            }
            else if (casoEspecialM) { casoEspecialM = false; indiceMonitoreoM++; }
        }
        else {
            if (entroM) {
                if (indiceMonitoreoM == ArrayMetodologias.length - 1 && ArrayMetodologias.length > 2) {
                    cadena += AgregarFilaFuente(ArrayMetodologias, 4, 7, indiceMonitoreoM, "EncabClasMet");
                    indiceMonitoreoM++;
                }
                else { indiceMonitoreoM--; entroM = false; }
            }
            if (indiceMonitoreoM < ArrayMetodologias.length) {
                cadena += AgregarFilaFuente(ArrayMetodologias, 4, 7, indiceMonitoreoM, "EncabClasMet");
                indiceMonitoreoM++;
            }
        }
    } else {
        cadena += "<td></td><td></td><td></td><td></td>";
    }

    if (indiceMonitoreoR < ArrayReportes.length) {
        if (((indiceMonitoreoR > 0 && ArrayReportes[indiceMonitoreoR].split('&&')[4] != ArrayReportes[indiceMonitoreoR - 1].split('&&')[4]) || indiceMonitoreoR == 0) && !entroR) {
            if (casoEspecialR)
                cadena += AgregarFilaFuente(ArrayReportes, 7, 10, indiceMonitoreoR, "EncabClasRep");
            if (indiceMonitoreoR < ArrayReportes.length && !casoEspecialR) {
                cadena += '<td class="EncabClasRep" style="width:8%;font-weight:bold;color:white;">' + ArrayReportes[indiceMonitoreoR].split("&&")[4] + '</td>';
                for (var i = 0; i < 3; i++)
                    cadena += '<td class="EncabClasRep" style="width:8%;font-weight:bold;color:white;">' + (indiceMonitoreoR == 0 ? (i == 0 ? "REPORTERIA" : (i == 1 ? "VAL. AL REPORTE" : "CONF. ENTREGA")) : "") + '</td>';
                if ((indiceMonitoreoR < ArrayReportes.length - 1 && ArrayReportes[indiceMonitoreoR].split('&&')[4] != ArrayReportes[indiceMonitoreoR + 1].split('&&')[4]) || indiceMonitoreoR == ArrayReportes.length - 1)
                    casoEspecialR = true;
                else {
                    if (indiceMonitoreoR < ArrayReportes.length - 1 || ArrayReportes.length == 1)
                        indiceMonitoreoR++;
                    entroR = true;
                }
            }
            else if (casoEspecialR) { casoEspecialR = false; indiceMonitoreoR++; }
        }
        else {
            if (entroR) {
                if (indiceMonitoreoR == ArrayReportes.length - 1 && ArrayReportes.length > 2) {
                    cadena += AgregarFilaFuente(ArrayReportes, 7, 10, indiceMonitoreoR, "EncabClasRep");
                    indiceMonitoreoR++;
                }
                else { indiceMonitoreoR--; entroR = false; }
            }
            if (indiceMonitoreoR < ArrayReportes.length) {
                cadena += AgregarFilaFuente(ArrayReportes, 7, 10, indiceMonitoreoR, "EncabClasRep");
                indiceMonitoreoR++;
            }
        }
    } else {
        cadena += "<td></td><td></td><td></td><td></td>";
    }
    cadena += "</tr>";
    return cadena

}

function AgregarFilaFuente(arregloMonitoreoIterar, faseInicial, faseFinal, indiceDefinicionesMonitoreo, classEncabezado) {
    var cadena = '<td class="' + classEncabezado + '" style="width:8%;font-weight:bold;height: 100%;"><pre> &nbsp&nbsp&nbsp<img src="../../Images/PanelDeControl/Expander/puntos.png" style="vertical-align:middle;width:10px;height:35px">' + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[1] + '</pre></td>';
    for (var i = faseInicial; i < faseFinal; i++) {
        var numeroFases = arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[3].split(",").length;
        if (numeroFases == 1) {
            if (arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[3].split(",")[0] == i) {
                var idTdGet = indiceDefinicionesMonitoreo + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + i;
                var classTdGet = DeterminaEstatusDeId(arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[2].split(",")[0]);
                AgregaProgressBarMonitoreo(idTdGet, classTdGet, arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0], i);
                if (esLoadMonitoreo == true)
                    cadena += '<td id="Td_' + idTdGet + '" class="' + classTdGet + '" style="width:8%;height: inherit;">' + "<div id='div" + idTdGet + "' class='BarraHijoV' ></div><div id='div" + idTdGet + "_txt' class='BarraTexto'>" + '</td>';
                else
                    $("#Td_" + idTdGet).attr("class", classTdGet);
            }
            else
                cadena += '<td id="Td_' + indiceDefinicionesMonitoreo + "_" + i + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + '" class="EstatusGris" style="width:8%;height: inherit;"></td>';
        }
        else if (numeroFases == 2) {
            if (arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[3].split(",")[0] == i) {
                var idTdGet = indiceDefinicionesMonitoreo + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + i;
                var classTdGet = DeterminaEstatusDeId(arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[2].split(",")[0]);
                AgregaProgressBarMonitoreo(idTdGet, classTdGet, arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0], i);
                if (esLoadMonitoreo)
                    cadena += '<td id="Td_' + idTdGet + '" class="' + classTdGet + '" style="width:8%;height: inherit;">' + "<div id='div" + idTdGet + "' class='BarraHijoV' ></div><div id='div" + idTdGet + "_txt' class='BarraTexto'>" + '</td>';
                else
                    $("#Td_" + idTdGet).attr("class", classTdGet);
            }
            else if (arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[3].split(",")[1] == i) {
                var idTdGet = indiceDefinicionesMonitoreo + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + i;
                var classTdGet = DeterminaEstatusDeId(arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[2].split(",")[1]);
                AgregaProgressBarMonitoreo(idTdGet, classTdGet, arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0], i);
                if (esLoadMonitoreo)
                    cadena += '<td id="Td_' + idTdGet + '" class="' + classTdGet + '" style="width:8%;height: inherit;">' + "<div id='div" + idTdGet + "' class='BarraHijoV' ></div><div id='div" + idTdGet + "_txt' class='BarraTexto'>" + '</td>';
                else
                    $("#Td_" + idTdGet).attr("class", classTdGet);
            }
            else
                cadena += '<td id="Td_' + indiceDefinicionesMonitoreo + "_" + i + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + '" class="EstatusGris" style="width:8%;height: inherit;"></td>';
        }
        else if (numeroFases == 3) {
            for (var ii = 0; ii < 3; ii++) {
                if (arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[3].split(",")[ii] == i) {
                    var idTdGet = indiceDefinicionesMonitoreo + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + i;
                    var classTdGet = DeterminaEstatusDeId(arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[2].split(",")[ii]);
                    AgregaProgressBarMonitoreo(idTdGet, classTdGet, arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0], i);
                    if (esLoadMonitoreo)
                        cadena += '<td id="Td_' + idTdGet + '" class="' + classTdGet + '" style="width:8%;height: inherit;">' + "<div id='div" + idTdGet + "' class='BarraHijoV' ></div><div id='div" + idTdGet + "_txt' class='BarraTexto'>" + '</td>';
                    else
                        $("#Td_" + idTdGet).attr("class", classTdGet);
                }
            }
        }
    }
    return cadena;
}

function AgregaProgressBarMonitoreo(idTdGet, classTdGet, idFuenteMonitoreo, fase) {
    if (($("#div" + idTdGet).attr("lang") != "entro" && classTdGet == "EstatusAmarillo") || (classTdGet == "EstatusAmarillo" && esLoadMonitoreo) || (!esLoadMonitoreo && classTdGet == "EstatusAmarillo" && $("#Td_" + idTdGet).attr("class") != "EstatusAmarillo")) {
        $("#div" + idTdGet).show();
        $("#div" + idTdGet + "_txt").show();
        if (document.getElementById("div" + idTdGet) != null)
            $("#div" + idTdGet).attr("lang", "entro");
        ProgressBarArrmto(0, 0.2, idTdGet, idFuenteMonitoreo, true, false, false);
    }
    else if (classTdGet != "EstatusAmarillo") {
        if (document.getElementById("div" + idTdGet) != null) {
            document.getElementById("div" + idTdGet).style.width = "0%";
            $("#div" + idTdGet).hide();
            $("#div" + idTdGet).attr("lang", "NoEntro");
        }
        if (document.getElementById("div" + idTdGet + "_txt") != null) {
            document.getElementById("div" + idTdGet + "_txt").innerHTML = "";
            $("#div" + idTdGet + "_txt").hide();
        }
    }
}