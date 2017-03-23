function ObtenerCatalogoMetodologias() {
    var parametros = { escenario: 'Default', idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/ObtenerRelacionesProcesosCalf', "POST", parametros, LlenaArregloMetodologias_Finaliza, LlenaArregloMetodologias_Finaliza);
    index++;
    //if (OpcionCargada == 'Met') 
    ///setTimeout(ObtenerCatalogoMetodologias, 5000);
   
}
var DefinicionesMetodologia = null; var DefinicionesMetodologiaTemp = null;
function LlenaArregloMetodologias_Finaliza(data) {
     if (data.d != "") {
        LlenaAreglosMEtodologiasReportes(data);
        OpcionCargada = 'Met';
        $("#TdFactor").html("PROCESOS");
        CreaAcordeonVerticalFuenteTemp((arrayJSONMet.length * 2) + numeroClasificaciones, 10, DefinicionesMetodologia, 'EncabClasMet', true);
    }
    else {
        anteriorIdSelectPadres = anteriorIdSelectPadresDatosNoDisponibles;
        IndicePestaniaFuenteHabilitada = IndicePestaniaFuenteHabilitadaTemp;
        objetoSelectAnteriorPadre = objetoSelectAnteriorPadreTemp;
        Waiting(false, "Espere por favor. Cargando Información...");
        OpcionCargada = 'Carga';
        MostrarMsj("Información no disponible.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        IndicePestaniaHabilitada = 4;
    }
}

var DefinicionesRelaciones = new Array();
function LlenaArregloReportes_Finaliza(data) {
    if (data.d != "" && data.d.split("%&&%")[1] != "") {
        LlenaAreglosMEtodologiasReportes(data);
        OpcionCargada = 'Rep'; determinoEstatusReportes = false;
        $("#TdFactor").html("REPORTES");
        CreaAcordeonVerticalFuenteTemp((arrayJSONRep.length * 2) + numeroClasificaciones, 10, DefinicionesReporteria, 'EncabClasRep', true);
    }
    else {
        anteriorIdSelectPadres = anteriorIdSelectPadresDatosNoDisponibles;
        IndicePestaniaFuenteHabilitada = IndicePestaniaFuenteHabilitadaTemp;
        objetoSelectAnteriorPadre = objetoSelectAnteriorPadreTemp;
        Waiting(false, "Espere por favor. Cargando Información...");
        OpcionCargada = 'Carga';
        MostrarMsj("Información no disponible.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        IndicePestaniaHabilitada = 7; 
    }
}

var DefinicionesReporteria = null; var DefinicionesReporteriaTemp = null; var arrayJSONRep; var arrayJSONMet; var numeroClasificaciones = 0;
var DefinicionesAgrupacionesReportes = null; 
function LlenaAreglosMEtodologiasReportes(data) {
    DefinicionesMetodologia = new Array();
    DefinicionesMetodologiaTemp = new Array();    
    numeroClasificaciones = 0; var clasificacion = '';
    arrayJSONMet = data.d.split("%&&%")[0].split("||");
    for (var x = 0; x < arrayJSONMet.length; x++) {
        arrayJSONMet[x] = $.parseJSON(arrayJSONMet[x].toString());
        DefinicionesMetodologia.push(arrayJSONMet[x].Metodologia + '%%%' + arrayJSONMet[x].IdMet + '&&' + arrayJSONMet[x].Clasificacion + '&&' + arrayJSONMet[x].OmitirCalf + '&&' + arrayJSONMet[x].OmitirValF4 + '&&' + arrayJSONMet[x].OmitirValF5 + '&&' + arrayJSONMet[x].InicioAutomatic);
        DefinicionesMetodologiaTemp.push(arrayJSONMet[x].Metodologia + '%%%' + arrayJSONMet[x].IdMet + '&&' + arrayJSONMet[x].Clasificacion + '&&' + arrayJSONMet[x].OmitirCalf + '&&' + arrayJSONMet[x].OmitirValF4 + '&&' + arrayJSONMet[x].OmitirValF5 + '&&' + arrayJSONMet[x].InicioAutomatic);
        if (arrayJSONMet[x].Clasificacion != clasificacion)
            numeroClasificaciones++;
        clasificacion = arrayJSONMet[x].Clasificacion;
    }

    DefinicionesReporteria = new Array();
    DefinicionesReporteriaTemp = new Array();
    numeroClasificaciones = 0; clasificacion = '';
    arrayJSONRep = data.d.split("%&&%")[1].split("||");
    if (data.d.split("%&&%")[1] != "") {
        for (var x = 0; x < arrayJSONRep.length; x++) {
            arrayJSONRep[x] = $.parseJSON(arrayJSONRep[x].toString());
            DefinicionesReporteria.push(arrayJSONRep[x].Reporte + '%%%' + arrayJSONRep[x].IdReporte + '&&' + arrayJSONRep[x].Tipo + '&&' + arrayJSONRep[x].OmitirValF8 + '&&' + arrayJSONRep[x].EnvioAutomatico + '&&' + arrayJSONRep[x].InicioAutomatico);
            DefinicionesReporteriaTemp.push(arrayJSONRep[x].Reporte + '%%%' + arrayJSONRep[x].IdReporte + '&&' + arrayJSONRep[x].Tipo + '&&' + arrayJSONRep[x].OmitirValF8 + '&&' + arrayJSONRep[x].EnvioAutomatico + '&&' + arrayJSONRep[x].InicioAutomatico);
            if (arrayJSONRep[x].Tipo != clasificacion)
                numeroClasificaciones++;
            clasificacion = arrayJSONRep[x].Tipo;
        }
    }
    //Orden Cubos, Regulatorios, ReposrtesInternos
    var DefinicionesArrayI = new Array();
    var DefinicionesArrayII = new Array();
    var DefinicionesArrayIII = new Array()
    for (var i = 0; i < DefinicionesReporteriaTemp.length; i++) {
        var entroArreglo = false;
        if (i == 0 || (DevuelveIndexDeElementoExistente(DefinicionesReporteriaTemp[i].split("&&")[1], DefinicionesArrayI, 1) != -1)) {
            DefinicionesArrayI.push(DefinicionesReporteriaTemp[i]);
            entroArreglo = true;
        }
        else if (!entroArreglo && (DefinicionesArrayII.length == 0 || (DevuelveIndexDeElementoExistente(DefinicionesReporteriaTemp[i].split("&&")[1], DefinicionesArrayII, 1) != -1))) {
            DefinicionesArrayII.push(DefinicionesReporteriaTemp[i]);
            entroArreglo = true;
        }
        else if (!entroArreglo && (DefinicionesArrayIII.length == 0 || (DevuelveIndexDeElementoExistente(DefinicionesReporteriaTemp[i].split("&&")[1], DefinicionesArrayIII, 1) != -1))) {
            DefinicionesArrayIII.push(DefinicionesReporteriaTemp[i]);
            entroArreglo = true;
        }
    }
    DefinicionesReporteriaTemp = DefinicionesArrayI.concat(DefinicionesArrayIII, DefinicionesArrayII);
    DefinicionesReporteria = DefinicionesArrayI.concat(DefinicionesArrayIII, DefinicionesArrayII);

    //ColocaEstatus Check Padres   
    for (var ii = 4; ii < 7; ii++) {
        AsignaEstatusCheckPadresOmitir(ii, DefinicionesMetodologiaTemp);
    }

    var ArrayRelaciones = data.d.split("%&&%")[2].split("||"); DefinicionesRelaciones = new Array();
    for (var x = 0; x < ArrayRelaciones.length; x++) {
        ArrayRelaciones[x] = $.parseJSON(ArrayRelaciones[x].toString());
        DefinicionesRelaciones.push(ArrayRelaciones[x].Reporte + '%%%' + ArrayRelaciones[x].IdReporte + '&&' + ArrayRelaciones[x].Metodologia + '%%%' + ArrayRelaciones[x].IdMet + '&&' + ArrayRelaciones[x].Fuente + '%%%' + ArrayRelaciones[x].IdFuente);
    }

    //Agrega Agrupaciones de Reportes Cambio 14 Abril
    DefinicionesAgrupacionesReportes = new Array();
    if (data.d.split("%&&%")[3] != undefined) {
        arrayJSONRep = data.d.split("%&&%")[3].split("||");
        if (data.d.split("%&&%")[3] != "") {
            for (var x = 0; x < arrayJSONRep.length; x++) {
                arrayJSONRep[x] = $.parseJSON(arrayJSONRep[x].toString());
                DefinicionesAgrupacionesReportes.push(arrayJSONRep[x].idReporteTemporal + '&&' + arrayJSONRep[x].IdReporte + '&&' + arrayJSONRep[x].fvcTipoAgrupacion + '&&' + arrayJSONRep[x].Reporte);

            }
        }
    }
}

function AsignaEstatusCheckPadresOmitir(indicePestaña, ArrayDefiniciones) {
    var veces0 = 0; var veces1 = 0; var veces0T = 0; var veces1T = 0;
    var idPadreImg = indicePestaña == 4 ? "Calf" : (indicePestaña == 5 ? "Val1" : (indicePestaña == 6 ? "Val2" : (indicePestaña == 7 ? "" : (indicePestaña == 8 ? "Val4" : "Val5")))); //Aqui
    for (var i = 0; i < ArrayDefiniciones.length; i++) {
        if (indicePestaña != 6 && indicePestaña != 9) {
            if (ArrayDefiniciones[i].split("&&")[indicePestaña == 4 ? 2 : 3] == "0") veces0++;
            else veces1++;
        }
        else {
            if (ArrayDefiniciones[i].split("&&")[4] == "0") veces0++;
            else veces1++;
            if (ArrayDefiniciones[i].split("&&")[5] == "0") veces0T++;
            else veces1T++;
        }
    }
    if (veces0 == ArrayDefiniciones.length) $("#imgchkOmitir" + idPadreImg).attr("src", "../../Images/PanelDeControl/Expander/uncheck.png");
    else if (veces1 == ArrayDefiniciones.length) {
        $("#imgchkOmitir" + idPadreImg).attr("src", "../../Images/PanelDeControl/Expander/checkG.png");
        $("#imgchkOmitir" + idPadreImg).attr("lang", "ab");
    }
    else $("#imgchkOmitir" + idPadreImg).attr("src", "../../Images/PanelDeControl/Expander/indeterminated.png");
    if (indicePestaña == 6 || indicePestaña == 9) {
        if (veces0T == ArrayDefiniciones.length) $("#imgchkOmitirVal" + (indicePestaña == 6 ? "3" : "6")).attr("src", "../../Images/PanelDeControl/Expander/uncheck.png");
        else if (veces1T == ArrayDefiniciones.length) {
            $("#imgchkOmitirVal" + (indicePestaña == 6 ? "3" : "6")).attr("src", "../../Images/PanelDeControl/Expander/checkG.png");
            $("#imgchkOmitirVal" + (indicePestaña == 6 ? "3" : "6")).attr("lang", "ab");
        }
        else $("#imgchkOmitirVal" + (indicePestaña == 6 ? "3" : "6")).attr("src", "../../Images/PanelDeControl/Expander/indeterminated.png");
    }
}

function ObtenerCatalogoReportes() {
    var parametros = { escenario: 'Default', idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/ObtenerRelacionesProcesosCalf',
                "POST",
                parametros,
                LlenaArregloReportes_Finaliza,
                LlenaArregloReportes_Finaliza);
    index++;
    //if (OpcionCargada == 'Rep') 
    //   setTimeout(ObtenerCatalogoReportes, 5000);
    

}


var tiempoF5estatusCarga;
function F5estatusCarga() {
    if (OpcionCargada == 'Carga') return;
    RefreshEstatus(numeroFilasF5, numColumasF5, ArregloDefinicionesF5, ClassEncabezadoF5, esLoadF5, "Met");
}


function F5estatusCargaRep() {
    if (OpcionCargada == 'Carga') return;
    RefreshEstatus(numeroFilasF5, numColumasF5, ArregloDefinicionesF5, ClassEncabezadoF5, esLoadF5, "Rep");
}


var ArrayMetodologiaEstatus = new Array(); var numeroFilasF5; var numColumasF5; var ArregloDefinicionesF5; var ClassEncabezadoF5; var esLoadF5; var ArrayReportesEstatus = new Array();
function RefreshEstatus(numeroFilas, numColumas, ArregloDefiniciones, ClassEncabezado, esLoadF5, opcionCargaS) {
    var parametros = { fechaPeriodo: (PaisSelectXUser == "1" ? fechaP.replace(',', '').replace(',', '') : fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0]), peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/ObtenerCatalogoFuentes', "POST", parametros,
        function ObtenerCatalogoEstatusFuentes_Finaliza(data) {
            arrayJSON = null;
            arrayJSON = data.d.split("||");
            Definiciones = new Array();
            DefinicionesFuentesCartera = new Array();
            var DefinicionesInsumos = new Array();
            var DefinicionesComplemento = new Array();
            ArrayFuenteEstatus = new Array();
            var agregar = true;
            for (var x = 0; x < arrayJSON.length; x++) {
                arrayJSON[x] = $.parseJSON(arrayJSON[x].toString());
                agregar = true;
                ArrayFuenteEstatus.push(arrayJSON[x].Fuente + "%%%" + arrayJSON[x].FSId_Fuente + '&&' + arrayJSON[x].Fase + '&&' + arrayJSON[x].IdEstatus);
                if (agregar && !ExisteItemEnArreglo(arrayJSON[x].Fuente + "%%%" + arrayJSON[x].FSId_Fuente, Definiciones)) {
                    Definiciones.push(arrayJSON[x].Fuente + "%%%" + arrayJSON[x].FSId_Fuente + '&&' + arrayJSON[x].Clasificacion);
                    if (arrayJSON[x].Clasificacion == 'FUENTE DE CARTERA') {
                        DefinicionesFuentesCartera.push(arrayJSON[x].Fuente + "%%%" + arrayJSON[x].FSId_Fuente + '&&' + arrayJSON[x].Clasificacion);
                    }
                    if (arrayJSON[x].Clasificacion == 'INSUMOS DEL PROCESO')
                        DefinicionesInsumos.push(arrayJSON[x].Fuente + "%%%" + arrayJSON[x].FSId_Fuente + '&&' + arrayJSON[x].Clasificacion);
                    if (arrayJSON[x].Clasificacion == 'COMPLEMENTO SICRENET')
                        DefinicionesComplemento.push(arrayJSON[x].Fuente + "%%%" + arrayJSON[x].FSId_Fuente + '&&' + arrayJSON[x].Clasificacion);
                    agregar = false;
                }
            }
            Definiciones = DefinicionesFuentesCartera.concat(DefinicionesInsumos, DefinicionesComplemento);
            ArrayMetodologiaEstatus = new Array();
            var parametrosRefreshEstatusMet = { fechaPeriodo: fechaP.split(",")[2] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[0], periodicidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
            peticionAjax('PanelDeControl.aspx/ObtenerCatalogoEstausMetodologias', "POST", parametrosRefreshEstatusMet, function ObtenerCatalogoEstatusMet_Finish(dataMet) {
                var arrayJSONMetStatus = dataMet.d.split("||");
                for (var x = 0; x < arrayJSONMetStatus.length; x++) {
                    arrayJSONMetStatus[x] = $.parseJSON(arrayJSONMetStatus[x].toString());
                    ArrayMetodologiaEstatus.push(arrayJSONMetStatus[x].Metodologia + "%%%" + arrayJSONMetStatus[x].FIIdMetodologia + '&&' + arrayJSONMetStatus[x].Fase + '&&' + arrayJSONMetStatus[x].IdEstatus + '&&' + arrayJSONMetStatus[x].Rep + '&&' + arrayJSONMetStatus[x].FIIdMetodologia + '&&' + arrayJSONMetStatus[x].EstatusBloqueo);
                    if (OpcionCargada == "Met") {
                        var indexBloq = DevuelveIndexExisteItemEnArreglo(arrayJSONMetStatus[x].Metodologia + "%%%" + arrayJSONMetStatus[x].FIIdMetodologia, ArregloDefiniciones);
                        try {
                            ArregloDefiniciones[indexBloq] = ArregloDefiniciones[indexBloq].split("&&")[0] + '&&' + ArregloDefiniciones[indexBloq].split("&&")[1] + '&&' + ArregloDefiniciones[indexBloq].split("&&")[2] + '&&' +
                            ArregloDefiniciones[indexBloq].split("&&")[3] + '&&' + ArregloDefiniciones[indexBloq].split("&&")[4] + '&&' + ArregloDefiniciones[indexBloq].split("&&")[5] + '&&' + arrayJSONMetStatus[x].EstatusBloqueo;
                        } catch (e) {

                        }

                    }
                }
                if (OpcionCargada == "Rep" && opcionCargaS == "Rep") {
                    ArrayReportesEstatus = new Array();
                    var parametrosRefreshEstatusRepor = { fechaPeriodo: fechaP.split(",")[2] + "-" + fechaP.split(",")[1] + "-" + fechaP.split(",")[0], periodicidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
                    peticionAjax('PanelDeControl.aspx/ObtenerCatalogoEstausReportes', "POST", parametrosRefreshEstatusRepor, function ObtenerCatalogoEstatusRep_Finish(dataRep) {
                        if (dataRep.d != "") {
                            var arrayJSONRepStatus = dataRep.d.split("||");
                            for (var x = 0; x < arrayJSONRepStatus.length; x++) {
                                arrayJSONRepStatus[x] = $.parseJSON(arrayJSONRepStatus[x].toString());
                                ArrayReportesEstatus.push(arrayJSONRepStatus[x].Reporte + "%%%" + arrayJSONRepStatus[x].IdReporte + '&&' + arrayJSONRepStatus[x].Fase + '&&' + arrayJSONRepStatus[x].IdEstatus + '&&' + arrayJSONRepStatus[x].Rep + '&&' + arrayJSONRepStatus[x].EstatusBloqueo);
                                var indexBloq = DevuelveIndexExisteItemEnArregloP(arrayJSONRepStatus[x].Reporte, ArregloDefiniciones);
                                ArregloDefiniciones[indexBloq] = ArregloDefiniciones[indexBloq].split("&&")[0] + '&&' + ArregloDefiniciones[indexBloq].split("&&")[1] + '&&' + ArregloDefiniciones[indexBloq].split("&&")[2] + '&&' +
                    ArregloDefiniciones[indexBloq].split("&&")[3] + '&&' + ArregloDefiniciones[indexBloq].split("&&")[4] + '&&' + ArregloDefiniciones[indexBloq].split("&&")[5] + '&&' + arrayJSONRepStatus[x].EstatusBloqueo;
                            }
                            LlamadaReciprocaCargarAcordeonVertical(numeroFilas, numColumas, ArregloDefiniciones, ClassEncabezado, esLoadF5, opcionCargaS);
                        }
                    }, null);
                } else
                    LlamadaReciprocaCargarAcordeonVertical(numeroFilas, numColumas, ArregloDefiniciones, ClassEncabezado, esLoadF5, opcionCargaS);
            }, null);
        }, null);
}


function DevuelveIndexExisteItemEnArregloP(elemento, Defi) {
    var existe = -1;
    for (var i = 0; i < Defi.length; i++) {
        if (Defi[i].split('&&')[0].split('%%%')[0] == elemento) {
            existe = i;
            break;
        }
    }
    return existe;
}

function LlamadaReciprocaCargarAcordeonVertical(numeroFilas, numColumas, ArregloDefiniciones, ClassEncabezado, esLoadF5, opcionCargaS) {
    CreaAcordeonVerticalFuenteTemp(numeroFilas, numColumas, ArregloDefiniciones, ClassEncabezado, esLoadF5);
    if (llegoTermino == 3) { termino = false; llegoTermino = 0; } else termino = true;
    if (OpcionCargada == "Rep" && opcionCargaS == "Rep")
        //setTimeout(F5estatusCargaRep, 5500);
        setTimeout(F5estatusCargaRep, 15000);
    if (OpcionCargada == "Met" && opcionCargaS == "Met")
        //setTimeout(F5estatusCarga, 5500);
        setTimeout(F5estatusCarga, 15000);
}

