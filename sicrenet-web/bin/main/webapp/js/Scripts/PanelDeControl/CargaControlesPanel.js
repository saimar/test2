
var IndicePestaniaHabilitada = 0; var objSelectAcordeon = undefined;
var OpcionCargada = ''; var historialFases = "";

var anteriorIdSelectPadresDatosNoDisponibles = ""; var IndicePestaniaFuenteHabilitadaTemp = ""; var objetoSelectAnteriorPadreTemp = null;
var objTempCarga = null;
function ExpandirCollapsarAcordeonHorizontalFases_Click(obj) {
    Waiting(true, "Espere por favor. Cargando Información...");
    objTempCarga = obj;
    anteriorIdSelectPadresDatosNoDisponibles = anteriorIdSelectPadres;
    IndicePestaniaFuenteHabilitadaTemp = IndicePestaniaFuenteHabilitada;
    objetoSelectAnteriorPadreTemp = objetoSelectAnteriorPadre;
    
    setTimeout(IniciarProcesoCarga, 300);
}

function IniciarProcesoCarga() {
    var id = $(objTempCarga).attr("id");
    if (IndicePestaniaHabilitada == id.substring(4)) {
        CollapsarPestaniaFase_AcordeonHorizontal(id, true);
    }
    else {
        if (IndicePestaniaHabilitada == 0) {
            switch ($(objTempCarga).attr("id")) {
                case 'TdPH1': if ((Definiciones == null || (historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("2") == -1 && historialFases.indexOf("3") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; index = 0; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; OpcionCargada = 'Carga'; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); Fuentes.ObtenerCatalogoFuentes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                case 'TdPH2': if ((Definiciones == null || (historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("1") == -1 && historialFases.indexOf("3") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; index = 0; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; OpcionCargada = 'Carga'; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); Fuentes.ObtenerCatalogoFuentes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                case 'TdPH3': if ((Definiciones == null || (historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("1") == -1 && historialFases.indexOf("2") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; index = 0; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; OpcionCargada = 'Carga'; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); Fuentes.ObtenerCatalogoFuentes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                case 'TdPH4': if ((DefinicionesMetodologia == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("5") == -1 && historialFases.indexOf("6") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoMetodologias(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                case 'TdPH5': if ((DefinicionesMetodologia == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("4") == -1 && historialFases.indexOf("6") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoMetodologias(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                case 'TdPH6': if ((DefinicionesMetodologia == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("4") == -1 && historialFases.indexOf("5") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoMetodologias(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                case 'TdPH7': if ((DefinicionesReporteria == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1)) && historialFases.indexOf("8") == -1 && historialFases.indexOf("9") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoReportes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                case 'TdPH8': if ((DefinicionesReporteria == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1)) && historialFases.indexOf("7") == -1 && historialFases.indexOf("9") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoReportes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                case 'TdPH9': if ((DefinicionesReporteria == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1)) && historialFases.indexOf("7") == -1 && historialFases.indexOf("8") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoReportes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
            }
        }
        else {
            if (IndicePestaniaHabilitada != id.substring(4)) {
                CollapsarPestaniaFase_AcordeonHorizontal("TdPH" + IndicePestaniaHabilitada, false);
                switch ($(objTempCarga).attr("id")) {
                    case 'TdPH1': OpcionCargada = 'Carga'; if ((Definiciones == null || (historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("2") == -1 && historialFases.indexOf("3") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; index = 0; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); Fuentes.ObtenerCatalogoFuentes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                    case 'TdPH2': OpcionCargada = 'Carga'; if ((Definiciones == null || (historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("1") == -1 && historialFases.indexOf("3") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; index = 0; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); Fuentes.ObtenerCatalogoFuentes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                    case 'TdPH3': OpcionCargada = 'Carga'; if ((Definiciones == null || (historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("1") == -1 && historialFases.indexOf("2") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; index = 0; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); Fuentes.ObtenerCatalogoFuentes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                    case 'TdPH4': OpcionCargada = 'Met'; if ((DefinicionesMetodologia == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("5") == -1 && historialFases.indexOf("6") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoMetodologias(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                    case 'TdPH5': OpcionCargada = 'Met'; if ((DefinicionesMetodologia == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("4") == -1 && historialFases.indexOf("6") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoMetodologias(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                    case 'TdPH6': OpcionCargada = 'Met'; if ((DefinicionesMetodologia == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("7") != -1 || historialFases.indexOf("8") != -1 || historialFases.indexOf("9") != -1)) && historialFases.indexOf("4") == -1 && historialFases.indexOf("5") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoMetodologias(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                    case 'TdPH7': OpcionCargada = 'Rep'; if ((DefinicionesReporteria == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1)) && historialFases.indexOf("8") == -1 && historialFases.indexOf("9") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoReportes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                    case 'TdPH8': OpcionCargada = 'Rep'; if ((DefinicionesReporteria == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1)) && historialFases.indexOf("7") == -1 && historialFases.indexOf("9") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoReportes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                    case 'TdPH9': OpcionCargada = 'Rep'; if ((DefinicionesReporteria == null || (historialFases.indexOf("1") != -1 || historialFases.indexOf("2") != -1 || historialFases.indexOf("3") != -1 || historialFases.indexOf("4") != -1 || historialFases.indexOf("5") != -1 || historialFases.indexOf("6") != -1)) && historialFases.indexOf("7") == -1 && historialFases.indexOf("8") == -1) { termino = true; historialFases = ""; objSelectAcordeon = objTempCarga; IndicePestaniaFuenteHabilitada = 0; anteriorIdSelectPadres = ''; objetoSelectAnteriorPadre = null; Waiting(true, "Espere por favor. Cargando Información..."); IndicePestaniaHabilitadaO = id.substring(4); ObtenerCatalogoReportes(); } else ExpandirPestaniaFase_AcordeonHorizontal(id, true); break;
                }
            }
        }
    }
}

var IndicePestaniaHabilitadaO = 0;
function ExpandirPestaniaFase_AcordeonHorizontal(id, entroMisma) {
    var etp1 = document.getElementById('TdEtapaUno');
    var etp2 = document.getElementById('TdEtapaDos');
    var etp3 = document.getElementById('TdEtapaTres');
    var etpctr1 = document.getElementById('TdCtrlsEtapaI');
    var etpctr2 = document.getElementById('TdCtrlsEtapaII');
    var etpctr3 = document.getElementById('TdCtrlsEtapaIII');

    historialFases += id.substring(4) + ",";
    IndicePestaniaHabilitada = id.substring(4);
    IndicePestaniaHabilitadaO = id.substring(4);
    if ($("#TdHH" + IndicePestaniaHabilitada).attr("style").split(':')[1] == " none;") {
        if (IndicePestaniaHabilitada > 0 && IndicePestaniaHabilitada <= 3) {
            etp1.style.width = "60%";
            etp2.style.width = "15%";
            etp3.style.width = "15%";
            etpctr1.style.width = "60%";
            etpctr2.style.width = "15%";
            etpctr3.style.width = "15%";
        }
        if (IndicePestaniaHabilitada > 3 && IndicePestaniaHabilitada <= 6) {
            etp1.style.width = "15%";
            etp2.style.width = "60%";
            etp3.style.width = "15%";
            etpctr1.style.width = "15%";
            etpctr2.style.width = "60%";
            etpctr3.style.width = "15%";
        }
        else if (IndicePestaniaHabilitada >= 7) {
            etp1.style.width = "15%";
            etp2.style.width = "15%";
            etp3.style.width = "60%";
            etpctr1.style.width = "15%";
            etpctr2.style.width = "15%";
            etpctr3.style.width = "60%";
        }
        etp1 = null;
        etp2 = null;
        etp3 = null;
        etpctr1 = null;;
        etpctr2 = null;
        etpctr3 = null;

        for (var i = 1; i <= 9; i++) {
            var valorWidthFase = "10%";
            if (i == IndicePestaniaHabilitada)
                valorWidthFase = "80%";
            $("#TdPH" + i).animate({ opacity: '0.9', width: valorWidthFase });
            $("#TdBtnsPH" + i).animate({ opacity: '0.9', width: valorWidthFase });
        }

        RecorreFilasExpandeHijos(2, "60%", "15%", "79%", "10%");

        $("#TdHH" + IndicePestaniaHabilitada).show();
        if (OpcionCargada == 'Carga') {
            CaseFasesAgregarControles(0, false);
            ReasignaTextoNameFile();
        }
        if (OpcionCargada == 'Met')
            CargaControlesProceso(ArrayPadreFasesFuentesProceso);
        if (OpcionCargada == 'Rep')
            CargaControlesReportes(arregloFuenteIdTdControles);
    }
    if (entroMisma)
        setTimeout(terminarWait, 500);
    Encabezados.ReSizeEncabezados();
}
function RecorreFilasExpandeHijos(indiceobjTr, porcentajeObjSelect, porcentajeObjNoSelect, porcentajeObjSelectH, porcentajeObjNoSelectH) {
    var objTblMain =  document.getElementById('tablaMain');
    if (IndicePestaniaHabilitada >= 1 && IndicePestaniaHabilitada <= 3) {
        objTblMain.children[indiceobjTr].children[1].style.width = porcentajeObjSelect;
        objTblMain.children[indiceobjTr].children[2].style.width = porcentajeObjNoSelect;
        objTblMain.children[indiceobjTr].children[3].style.width = porcentajeObjNoSelect;
    }

    if (IndicePestaniaHabilitada >= 4 && IndicePestaniaHabilitada <= 6) {
        objTblMain.children[indiceobjTr].children[1].style.width = porcentajeObjNoSelect;
        objTblMain.children[indiceobjTr].children[2].style.width = porcentajeObjSelect;
        objTblMain.children[indiceobjTr].children[3].style.width = porcentajeObjNoSelect;
    }

    if (IndicePestaniaHabilitada >= 7) {
        objTblMain.children[indiceobjTr].children[1].style.width = porcentajeObjNoSelect;
        objTblMain.children[indiceobjTr].children[2].style.width = porcentajeObjNoSelect;
        objTblMain.children[indiceobjTr].children[3].style.width = porcentajeObjSelect;
    }

    var indiceEtapaSelect = IndicePestaniaHabilitada >= 1 && IndicePestaniaHabilitada <= 3 ? 1 : (IndicePestaniaHabilitada >= 4 && IndicePestaniaHabilitada <= 6 ? 2 : 3);
    var limit = objTblMain.children[indiceobjTr].children[indiceEtapaSelect].children[0].children[0].children[0].children.length;
    for (var i = 0; i < limit ; i++) {
        var valorWidthFase = '';
        var ItemTd = objTblMain.children[indiceobjTr].children[indiceEtapaSelect].children[0].children[0].children[0].children[i];
        if (ItemTd.id == "0TdHFuentes7")
            ItemTd = objTblMain.children[indiceobjTr].children[indiceEtapaSelect].children[0].children[0].children[0].children[i];
        if (ItemTd.id.slice(ItemTd.id.length - 1) == IndicePestaniaHabilitada) {
            valorWidthFase = porcentajeObjSelectH;
            if (ItemTd.id == "1TdHFuentes7") {
                $("#" + ItemTd.id).animate({ opacity: '0.9', width: "79%" });
            }
        }
        else {
            valorWidthFase = porcentajeObjNoSelectH;

        }
        $("#" + ItemTd.id).animate({ opacity: '0.9', width: valorWidthFase });
        var ItemTd = null;
    }

    indiceobjTr++;
    if (objTblMain.children[indiceobjTr] != undefined)
        RecorreFilasExpandeHijos(indiceobjTr, porcentajeObjSelect, porcentajeObjNoSelect, porcentajeObjSelectH, porcentajeObjNoSelectH);

    objTblMain = null;
}

function CollapsarPestaniaFase_AcordeonHorizontal(id, entroMisma) {
    IndicePestaniaHabilitadaO = 0;
    var valorWidthFase = "";
    var valorWidthFaseFuente = "";

    document.getElementById('TdEtapaUno').style.width = "30%";
    document.getElementById('TdEtapaDos').style.width = "30%";
    document.getElementById('TdEtapaTres').style.width = "30%";
    document.getElementById('TdCtrlsEtapaI').style.width = "30%";
    document.getElementById('TdCtrlsEtapaII').style.width = "30%";
    document.getElementById('TdCtrlsEtapaIII').style.width = "30%";
    for (var i = 1; i <= 9; i++) {
        $("#TdPH" + i).animate({ opacity: '0.9', width: "33%" });
        $("#TdBtnsPH" + i).animate({ opacity: '0.9', width: "33%" });
    }
    RecorreFilasExpandeHijos(2, "30%", "30%", "33%", "33%");

    $("#TdHH" + IndicePestaniaHabilitada).hide();
    if (OpcionCargada == 'Carga')
        CaseFasesAgregarControles(1, false);
    if (OpcionCargada == 'Met')
        CargaControlesProceso(ArrayPadreFasesFuentesProceso);
    if (OpcionCargada == 'Rep')
        CargaControlesReportes(arregloFuenteIdTdControles);
    IndicePestaniaHabilitada = 0;
    if (entroMisma)
        setTimeout(terminarWait, 500);
    Encabezados.ReSizeEncabezados();
}

var escargaNew = false; var arrayIdsTdsWidthEstatus = new Array();
function DeterminaEstatusMetodologia(OpcionArrayEstatus, esCallReporte) {
    var verde = 0;
    for (var i = 0; i < OpcionArrayEstatus.length; i++) {
        var fase1 = ''; var fase2 = ''; var fase3 = ''; var fase4 = ''; var fase5 = ''; var fase6 = ''; var fase7 = ''; var fase8 = ''; var fase9 = '';
        for (var ii = 1; ii < OpcionArrayEstatus[i].split('||')[1].split('_&').length; ii++) {
            var faseTemp = OpcionArrayEstatus[i].split('||')[1].split('_&')[ii].split('&&')[1].split(',')[0];
            if ((fase1 == '') || (DeterminaJerarquiaColoresEstatus(faseTemp) > DeterminaJerarquiaColoresEstatus(fase1)))
                fase1 = faseTemp;

            faseTemp = OpcionArrayEstatus[i].split('||')[1].split('_&')[ii].split('&&')[1].split(',')[1];
            if ((fase2 == '') || (DeterminaJerarquiaColoresEstatus(faseTemp) > DeterminaJerarquiaColoresEstatus(fase2)))
                fase2 = faseTemp;

            faseTemp = OpcionArrayEstatus[i].split('||')[1].split('_&')[ii].split('&&')[1].split(',')[2];
            if ((fase3 == '') || (DeterminaJerarquiaColoresEstatus(faseTemp) > DeterminaJerarquiaColoresEstatus(fase3)))
                fase3 = faseTemp;

            faseTemp = OpcionArrayEstatus[i].split('||')[1].split('_&')[ii].split('&&')[1].split(',')[3];
            if ((fase4 == '') || (DeterminaJerarquiaColoresEstatus(faseTemp) > DeterminaJerarquiaColoresEstatus(fase4)))
                fase4 = faseTemp;

            faseTemp = OpcionArrayEstatus[i].split('||')[1].split('_&')[ii].split('&&')[1].split(',')[4];
            if ((fase5 == '') || (DeterminaJerarquiaColoresEstatus(faseTemp) > DeterminaJerarquiaColoresEstatus(fase5)))
                fase5 = faseTemp;

            faseTemp = OpcionArrayEstatus[i].split('||')[1].split('_&')[ii].split('&&')[1].split(',')[5];
            if ((fase6 == '') || (DeterminaJerarquiaColoresEstatus(faseTemp) > DeterminaJerarquiaColoresEstatus(fase6)))
                fase6 = faseTemp;

            faseTemp = OpcionArrayEstatus[i].split('||')[1].split('_&')[ii].split('&&')[1].split(',')[6];
            if ((fase7 == '') || (DeterminaJerarquiaColoresEstatus(faseTemp) > DeterminaJerarquiaColoresEstatus(fase7)))
                fase7 = faseTemp;
            faseTemp = OpcionArrayEstatus[i].split('||')[1].split('_&')[ii].split('&&')[1].split(',')[7];
            if ((fase8 == '') || (DeterminaJerarquiaColoresEstatus(faseTemp) > DeterminaJerarquiaColoresEstatus(fase8)))
                fase8 = faseTemp;
            faseTemp = OpcionArrayEstatus[i].split('||')[1].split('_&')[ii].split('&&')[1].split(',')[8];
            if ((fase9 == '') || (DeterminaJerarquiaColoresEstatus(faseTemp) > DeterminaJerarquiaColoresEstatus(fase9)))
                fase9 = faseTemp;
        }
        if (OpcionCargada == 'Rep' && !esCallReporte) {
            fase4 = fase4 != "EstatusBlanco" ? fase4 : "EstatusGris"; fase5 = fase5 != "EstatusBlanco" ? fase5 : "EstatusGris"; fase6 = fase6 != "EstatusBlanco" ? fase6 : "EstatusGris";
            var valorFase789 = DeterminaStatusFase456Met789Rep(OpcionArrayEstatus[i].split('||')[0].split('$$$')[1], ArrayReportesEstatus);
            if (valorFase789 != undefined) {
                fase7 = valorFase789.split(",")[0]; fase8 = valorFase789.split(",")[1]; fase9 = valorFase789.split(",")[2];
            }
            else {
                fase7 = "EstatusGris"; fase8 = "EstatusGris"; fase9 = "EstatusGris";
            }
        }
        if (OpcionCargada == 'Met' || esCallReporte) {
            //
            var valorFase456 = DeterminaStatusFase456Met789Rep(OpcionArrayEstatus[i].split('||')[0].split('$$$')[1], ArrayMetodologiaEstatus);
            if (valorFase456 != undefined) {
                fase4 = OpcionArrayEstatus[i].split('||')[0].split('##')[1] == "EsFuente" ? "EstatusBlanco" : valorFase456.split(",")[0]; fase5 = OpcionArrayEstatus[i].split('||')[0].split('##')[1] == "EsFuente" ? "EstatusBlanco" : valorFase456.split(",")[1]; fase6 = OpcionArrayEstatus[i].split('||')[0].split('##')[1] == "EsFuente" ? "EstatusBlanco" : valorFase456.split(",")[2];
            }
            else { fase4 = "EstatusGris"; fase5 = "EstatusGris"; fase6 = "EstatusGris"; }

            fase7 = "EstatusBlanco"; fase8 = "EstatusBlanco"; fase9 = "EstatusBlanco";
        }
        if (esCallReporte)
            CreaArregloREporteMetodologiaEstatus(OpcionArrayEstatus[i].split('||')[0].split('$$$')[0], fase1 + "," + fase2 + "," + fase3 + "," + fase4 + "," + fase5 + "," + fase6 + "," + fase7 + "," + fase8 + "," + fase9);
        arrayIdsTdsWidthEstatus.push(OpcionArrayEstatus[i].split('||')[0].split('$$$')[0].substring(0, OpcionArrayEstatus[i].split('||')[0].split('$$$')[0].length - 1) + "%%%" + OpcionArrayEstatus[i].split('||')[0].split('$$$')[1].split('%%%')[1] + "$$" + fase1 + "$$" + fase2 + "$$" + fase3 + "$$" + fase4 + "$$" + fase5 + "$$" + fase6 + "$$" + fase7 + "$$" + fase8 + "$$" + fase9);
    }
    if (OpcionCargada == 'Rep' && esCallReporte) {
        determinoEstatusReportes = true;
        DeterminaEstatusMetodologia(ArrayPadreReportesMedologia, false);
    }
    else if (termino) {
        AsignaClassATds();
    }
}

var termino = false; var llegoTermino = 0;
function AsignaClassATds() {
    for (var i = 0; i < arrayIdsTdsWidthEstatus.length; i++) {
        for (var ii = 1; ii < 10; ii++) {
            $("#" + arrayIdsTdsWidthEstatus[i].split("$$")[0].split("%%%")[0] + ii).attr('class', arrayIdsTdsWidthEstatus[i].split("$$")[ii] == "" ? "EstatusGris" : arrayIdsTdsWidthEstatus[i].split("$$")[ii]);
            if ((((ii >= 4 && ii <= 6) && OpcionCargada == 'Met') || ((ii >= 7 && ii <= 9) && OpcionCargada == 'Rep')) && arrayIdsTdsWidthEstatus[i].split("$$")[ii] == "EstatusAmarillo") {
                $("#div" + arrayIdsTdsWidthEstatus[i].split("$$")[0].split("%%%")[0] + ii).show();
                $("#div" + arrayIdsTdsWidthEstatus[i].split("$$")[0].split("%%%")[0] + ii + "_txt").show();
                ProgressBarArrmto(0, 0.2, arrayIdsTdsWidthEstatus[i].split("$$")[0].split("%%%")[0] + ii, arrayIdsTdsWidthEstatus[i].split("$$")[0].split("%%%")[1], true, false, false);
            }
            if ((((ii >= 4 && ii <= 6) && OpcionCargada == 'Met')) && arrayIdsTdsWidthEstatus[i].split("$$")[ii] == "EstatusNegro") {
                ProgressBarDetenerProcCalfMet(100, 100.2, arrayIdsTdsWidthEstatus[i].split("$$")[0].split("%%%")[0] + ii, arrayIdsTdsWidthEstatus[i].split("$$")[0].split("%%%")[1], true, false, false, 0);
            }
            else if (arrayIdsTdsWidthEstatus[i].split("$$")[ii] != "EstatusAmarillo") {
                $("#div" + arrayIdsTdsWidthEstatus[i].split("$$")[0].split("%%%")[0] + ii).hide();
                $("#div" + arrayIdsTdsWidthEstatus[i].split("$$")[0].split("%%%")[0] + ii + "_txt").hide();
            }
        }
    }
    if (!termino) termino = true;
    llegoTermino++;
}

function DeterminaStatusFase456Met789Rep(DefMetodologiaEval, ArrayStatusIterar) {/// Al arreglo de Id Td Agregar la metodologia
    var fase4 = 'EstatusGris'; var fase5 = 'EstatusGris'; var fase6 = 'EstatusGris';
    if (ArrayStatusIterar.length == 0 || ArrayStatusIterar.length == 1) return;
    var entroCiclo = false;
    for (var i = 0; i < ArrayStatusIterar.length; i++) {
        if (ArrayStatusIterar[i].split("&&")[0] == DefMetodologiaEval && ArrayStatusIterar[i].split("&&")[1] != "0") {
            if (ArrayStatusIterar[i].split("&&")[1] == "4" || ArrayStatusIterar[i].split("&&")[1] == "7") fase4 = DeterminaEstatusDeId(ArrayStatusIterar[i].split("&&")[2]);
            if (ArrayStatusIterar[i].split("&&")[1] == "5" || ArrayStatusIterar[i].split("&&")[1] == "8") fase5 = DeterminaEstatusDeId(ArrayStatusIterar[i].split("&&")[2]);
            if (ArrayStatusIterar[i].split("&&")[1] == "6" || ArrayStatusIterar[i].split("&&")[1] == "9") fase6 = DeterminaEstatusDeId(ArrayStatusIterar[i].split("&&")[2]);
            entroCiclo = true;
        }
        else if (ArrayStatusIterar[i].split("&&")[0] == DefMetodologiaEval && ArrayStatusIterar[i].split("&&")[1] == "0") { entroCiclo = true; break; }
        else if (entroCiclo) break;
    }
    return fase4 + "," + fase5 + "," + fase6;
}

function DeterminaJerarquiaColoresEstatus(DefinicionEstatus) {
    var GradoJerarquia = 0;
    switch (DefinicionEstatus) {
        case "EstatusNegro"    /******* DETENIDO POR EL USUARIO            */: GradoJerarquia = 9; break;
        case "EstatusMorado"   /******* REQUIERE ACTUALIZACION             */: GradoJerarquia = 8; break;
        case "EstatusRojo"     /******* ERROR                              */: GradoJerarquia = 7; break;
        case "EstatusNaranja"  /******* WARNING                            */: GradoJerarquia = 6; break;
        case "EstatusAmarillo" /******* EN PROCESO                         */: GradoJerarquia = 5; break;
        case "EstatusAzul"     /******* REALIZADO SIN CALIFICAR NI VALIDAR */: GradoJerarquia = 4; break;
        case "EstatusGris"     /******* NO INICIADO                        */: GradoJerarquia = 3; break;
        case "EstatusVerde"    /******* REALIZADO                          */: GradoJerarquia = 2; break;
        case "EstatusBlanco"   /******* NO APLICA                          */: GradoJerarquia = 1; break;
    }
    return GradoJerarquia;
}

function DeterminaEstatusDeId(idItem) {
    var classColor = "EstatusGris";
    switch (idItem) {
        case "1": classColor = "EstatusGris"; break;
        case "2": classColor = "EstatusAmarillo"; break;
        case "3": classColor = "EstatusRojo"; break;
        case "4": classColor = "EstatusNaranja"; break;
        case "5": classColor = "EstatusVerde"; break;
        case "6": classColor = "EstatusAzul"; break;
        case "7": classColor = "EstatusMorado"; break;
        case "8": classColor = "EstatusBlanco"; break;
        case "9": classColor = "EstatusNegro"; break;
    }
    return classColor;
}

var ArrayEstatusReporteMet = new Array(); var determinoEstatusReportes = false;
function CreaArregloREporteMetodologiaEstatus(idTdMetodologia, cadenaEstatusMEt) {
    for (var i = 0; i < ArrayPadreReportesMedologia.length; i++) {
        var cadena = ArrayPadreReportesMedologia[i].split('||')[0] + "||";
        for (var ii = 1; ii < ArrayPadreReportesMedologia[i].split('||')[1].split('_&').length; ii++) {
            if (ArrayPadreReportesMedologia[i].split('||')[1].split('_&')[ii] == idTdMetodologia + '&&')
                cadena += '_&' + ArrayPadreReportesMedologia[i].split('||')[1].split('_&')[ii] + cadenaEstatusMEt;
            else
                cadena += '_&' + ArrayPadreReportesMedologia[i].split('||')[1].split('_&')[ii];
        }
        ArrayPadreReportesMedologia[i] = cadena;
    }
}

var Definiciones = null; var cadebaFilaGE1 = ''; var cadebaFilaGE2 = ''; var cadebaFilaGE3 = ''; var arregloFuenteIdTdControles = new Array();
function CreaAcordeonVerticalFuenteTemp(numeroFilas, numColumas, ArregloDefiniciones, ClassEncabezado, esLoad) {
    ArrayPadreFasesFuentesProceso = new Array(); ArrayPadreReportesMedologia = new Array(); cadebaFilaGE1 = ''; cadebaFilaGE2 = ''; cadebaFilaGE3 = '';
    var indiceDefiniciones = 0;
    arrayIdsTdsWidthEstatus = new Array();
    if (esLoad) {
        arregloIdsImgsOmitirCalf = new Array(); arregloIdsImgsOmitirValidF5 = new Array(); arregloIdsImgsOmitirValidF6 = new Array(); arregloIdsInicioAutomatico = new Array();
        arregloIdsImgsOmitirValidF8 = new Array(); arregloIdsImgsEnvioAutomatico = new Array(); arregloIdsInicioAutomaticoRep = new Array();
        arregloFuenteIdTdControles = new Array(); ArregloFuentesEstatusPadre = new Array();
        CreaColumnaDefinicionFuentes_AcordeonHorizontal();
        var cadenahtmlCabecera = ' <tr id="trFaseDef" style="width: 100%; text-align: center;">' + $("#trFaseDef").html() + '</tr> <tr  id="trDefFactor" style="width: 100%">' + $("#trDefFactor").html() + "</tr>";
        $("#tablaMain").empty();
        cadenaTable = null;
        for (var ii = 0; ii < numeroFilas; ii++) {
            var nuevaFila = '';
            var nuevaFilaT = '';
            if ((ii > 0 && ArregloDefiniciones[indiceDefiniciones].split('&&')[1] != ArregloDefiniciones[indiceDefiniciones - 1].split('&&')[1]) || indiceDefiniciones == 0) {
                nuevaFila += "<tr id='" + ("Tr" + ii) + "'>";

                nuevaFilaT += "<tr id='" + ("Tr" + ii) + "''>";
                cadebaFilaGE1 = '<td id="' + ('Td' + ii) + 'TdEtapaUno" style="width: 30%;"> <table  cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-2px;margin-bottom:-2px"><tr style="width: 100%;">';
                cadebaFilaGE2 = '<td id="' + ('Td' + ii) + 'TdEtapaDos"  style="width: 30%;"> <table  cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-4px;margin-bottom:-2px"><tr style="width: 100%;">';
                cadebaFilaGE3 = '<td id="' + ('Td' + ii) + 'TdEtapaTres"  style="width: 30%;"> <table  cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-6px;margin-bottom:-2px"><tr style="width: 100%;">';
                for (var i = 0; i < numColumas; i++) {
                    var newValor = "<td id='" + (ii + "Td" + i) + "' style='width:" + (i == 0 ? "10" : "33") + "%;height:30px; font: normal 8px Helvetica, Arial, sans-serif;color: White;' class='" + ClassEncabezado + "'>" + (i == 0 ? ArregloDefiniciones[indiceDefiniciones].split('&&')[1] : '') + "</td>";
                    nuevaFila += newValor;
                    if (i == 0) nuevaFilaT += newValor;
                    if (i >= 1 && i <= 3) cadebaFilaGE1 += newValor;
                    if (i >= 4 && i <= 6) cadebaFilaGE2 += newValor;
                    if (i >= 7 && i <= 9) cadebaFilaGE3 += newValor;
                }
                nuevaFila += "</tr>";

                cadebaFilaGE1 += "</tr></table></td>";
                cadebaFilaGE2 += "</tr></table></td>";
                cadebaFilaGE3 += "</tr></table></td>";
                nuevaFilaT += cadebaFilaGE1 + cadebaFilaGE2 + cadebaFilaGE3 + "</tr>";
                ii++;
                nuevaFilaT += AgregarColumnasFases(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, esLoad);
                ii++;
                indiceDefiniciones++;
            }
            else {
                nuevaFilaT += AgregarColumnasFases(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, esLoad);
                ii++;
                nuevaFila += "</tr>";
                indiceDefiniciones++;
                if (ArregloDefiniciones.length == indiceDefiniciones)
                    ii = numeroFilas;
            }

            cadenaTable += nuevaFilaT;

        }
        $("#tablaMain").append(cadenahtmlCabecera + cadenaTable);
        estatusLangMostrarOcultarCifras != "" ? $(obj).attr("lang", estatusLangMostrarOcultarCifras) : null;
        MostrarOcultarCifras($("#divE0"), false);

        if (OpcionCargada == 'Met' || OpcionCargada == 'Rep') DeterminaEstatusMetodologia(ArrayPadreFasesFuentesProceso, true);
        if (OpcionCargada == 'Met') CargaControlesProceso(ArrayPadreFasesFuentesProceso);
        if (OpcionCargada == 'Rep') CargaControlesReportes(arregloFuenteIdTdControles);
        if (objSelectAcordeon != undefined) {
            escargaNew = true; ExpandirPestaniaFase_AcordeonHorizontal($(objSelectAcordeon).attr("id")); escargaNew = false;
        }
        objSelectAcordeon = undefined
        setTimeout(terminarWait, 1000);
        numeroFilasF5 = numeroFilas; numColumasF5 = numColumas; ArregloDefinicionesF5 = ArregloDefiniciones; ClassEncabezadoF5 = ClassEncabezado;
        if (OpcionCargada == 'Met') {
            esLoadF5 = false;
            F5estatusCarga();
        }
        else if (OpcionCargada == 'Rep') {
            esLoadF5 = false;
            F5estatusCargaRep();
        }
        expandioYEntro = false;
    }
    else {
        ArregloFuentesEstatusPadre = new Array();
        for (var ii = 0; ii < numeroFilas; ii++) {
            if ((ii > 0 && ArregloDefiniciones[indiceDefiniciones].split('&&')[1] != ArregloDefiniciones[indiceDefiniciones - 1].split('&&')[1]) || indiceDefiniciones == 0) {
                ii++;
                AgregarColumnasFases(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, esLoad);
                ii++;
                indiceDefiniciones++;
            }
            else {
                AgregarColumnasFases(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, esLoad);
                ii++;
                indiceDefiniciones++;
                if (ArregloDefiniciones.length == indiceDefiniciones)
                    ii = numeroFilas;
            }
        }
        if (OpcionCargada == 'Met') CargaControlesProceso(ArrayPadreFasesFuentesProceso);
        if (OpcionCargada == 'Rep') CargaControlesReportes(arregloFuenteIdTdControles);
        DeterminaEstatusMetodologia(ArrayPadreFasesFuentesProceso, true);
    }

    document.getElementById("tblEncabezadoControl") != null && (document.getElementById("shadows").scrollWidth >= (parseInt($("#shadows").width()))) ? document.getElementById("tblEncabezadoControl").style.width = (parseInt($("#shadows").width()) - 40) + "px" : null;
    document.getElementById("tblEncabezadoControl").style.width = document.getElementById("divPanelMain").style.width + "px";
    document.getElementById("divFasesControl") != null && (document.getElementById("shadows").scrollWidth >= (parseInt($("#shadows").width()))) ? document.getElementById("divFasesControl").style.width = (parseInt($("#shadows").width()) - 40) + "px" : null;
    document.getElementById("divFasesControl").style.width = document.getElementById("divPanelMain").style.width + "px";
    document.getElementById("divPanelMain") != null && (document.getElementById("shadows").scrollWidth >= (parseInt($("#shadows").width()))) ? document.getElementById("divPanelMain").style.width = (parseInt($("#shadows").width()) - 40) + "px" : null;

    cadenaTable = null;
}


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

var expandioYEntroPanel = false; var esResizePanel = false; var idPadreBDFuente;
function AgregarColumnasFases(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, esLoad) {

    var DefinicionesFuenteMet = new Array();
    var DefinicionesFuenteMetTemp = new Array();
    if (ClassEncabezado == 'EncabClasMet') {
        for (var i = 0; i < DefinicionesRelaciones.length; i++) {
            if (ArregloDefiniciones[indiceDefiniciones].split('&&')[0] == DefinicionesRelaciones[i].split('&&')[1]) {
                if (!ExisteItemEnArreglo(DefinicionesRelaciones[i].split('&&')[2], DefinicionesFuenteMetTemp))
                    DefinicionesFuenteMetTemp.push(DefinicionesRelaciones[i].split('&&')[2] + '&&');
            }
        }
    }

    var DefinicionesMetodolReporte = new Array();
    var DefinicionesMetodolReporteTemp = new Array();
    if (ClassEncabezado == 'EncabClasRep') {
        for (var i = 0; i < DefinicionesRelaciones.length; i++) {
            if (ArregloDefiniciones[indiceDefiniciones].split('&&')[0] == DefinicionesRelaciones[i].split('&&')[0]) {
                if (indiceDefiniciones == 5 && i == 151) {
                    var cadaa = "";
                }
                if (!ExisteItemEnArreglo(DefinicionesRelaciones[i].split('&&')[1], DefinicionesMetodolReporteTemp)) {
                    DefinicionesMetodolReporteTemp.push((DefinicionesRelaciones[i].split('&&')[1] == "%%%" ? DefinicionesRelaciones[i].split('&&')[2] : DefinicionesRelaciones[i].split('&&')[1]) + '&&');
                }
            }
        }
    }

    var nuevaFila = ''; var indiceAnterior; var PadreIdTd = ''; var nuevaFilaT = ''; var indicePAdre = ii; var DefMet = "";
    if (esLoad) {
        nuevaFila += "<tr id='" + ("Tr" + ii) + "' onclick='ExpandeCollapsaAcordeonVerticalFuente_Click(this);'>";
        nuevaFilaT = "<tr id='" + ("Tr" + ii) + "' onclick='ExpandeCollapsaAcordeonVerticalFuente_Click(this);'>";
        cadebaFilaGE1 = '<td id="' + ('Td' + ii) + 'TdEtapaUno"  onclick="ExpandeCollapsaAcordeonVerticalFuente_Click(this);" style="width: 30%;"> <table  cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-2px;margin-bottom:-2px"><tr style="width: 100%;">';
        cadebaFilaGE2 = '<td id="' + ('Td' + ii) + 'TdEtapaDos"  onclick="ExpandeCollapsaAcordeonVerticalFuente_Click(this);" style="width: 30%;"> <table  cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-4px;margin-bottom:-2px"><tr style="width: 100%;">';
        cadebaFilaGE3 = '<td id="' + ('Td' + ii) + 'TdEtapaTres"  onclick="ExpandeCollapsaAcordeonVerticalFuente_Click(this);" style="width: 30%;"> <table  cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-6px;margin-bottom:-2px"><tr style="width: 100%;">';

        for (var i = 0; i < numColumas; i++) {
            var newValor = "<td lang='" + ArregloDefiniciones[indiceDefiniciones].split('&&')[1] + "' id='" + (ii + "Td" + i) + "' " + (i > 0 ? "style='width:33%;height:30px;font-size:9px;' class='" + (OpcionCargada == "Met" && i > 6 ? 'EstatusBlanco' : 'EstatusGris') + "'" : "class='" + ClassEncabezado + "1' style='width:10%;height:30px; font: normal 8px Helvetica, Arial, sans-serif;cursor:pointer'") + ">" +
            ((DefinicionesFuenteMetTemp.length > 0 || DefinicionesMetodolReporteTemp.length > 0) && i == 0
            ? (/*periocidadSelectXUser == 1*/true
            ? (" <img lang='" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[0] + "' alt='" + (ii + 1) + "Td" + (i + 1) + "' id='" + "TdImgCandado_" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[1] + "' src='../../Images/PanelDeControl/Candados/" + (ArregloDefiniciones[indiceDefiniciones].split('&&')[2] == "0" || (OpcionCargada != 'Carga')
            ? "candadoAA1.png' style='display:none;" : "candadoAC.png' style='") + "vertical-align:middle;width:14px;height:15px;' Title='" + (ArregloDefiniciones[indiceDefiniciones].split('&&')[2] == "0"
            ? "Procesos Desbloqueados" : "Procesos Bloqueados") + "'/>") : "") + " <img id='" + "TdImg" + (ii + 1) + "' src='../../Images/PanelDeControl/Expander/fDerechaG.png'  style='vertical-align:middle;width:10px;height:15px;'/>" + "  <img id='" + "TdImgSigno" + (ii + 1) + "' src='../../Images/PanelDeControl/Expander/mas.png'  style='vertical-align:middle;width:9px;height:9px;'/> " : (i == 0
            ? (/*periocidadSelectXUser == 1*/true
            ? ("<img lang='" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[0] + "' alt='" + (ii + 1) + "Td" + (i + 1) + "' id='" + "TdImgCandado_" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[1] + "' src='../../Images/PanelDeControl/Candados/" + (ArregloDefiniciones[indiceDefiniciones].split('&&')[2] == "0" || (OpcionCargada != 'Carga')
            ? "candadoAA1.png' style='display:none;" : "candadoAC.png' style='") + "vertical-align:middle;width:14px;height:15px;' Title='" + (ArregloDefiniciones[indiceDefiniciones].split('&&')[2] == "0"
            ? "Procesos Desbloqueados" : "Procesos Bloqueados") + "'/> ") : "") + "<img id='" + "TdImg" + (ii + 1) + "'src='../../Images/PanelDeControl/Expander/fDerechaG.png'  style='vertical-align:middle;width:10px;height:15px;'/>" : '')) + ((i == 0)
            ? ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[0] : " <div id='div" + (ii + "Td" + i) + "' class='BarraHijoV' ></div><div id='div" + (ii + "Td" + i) + "_txt' class='BarraTexto'> ") + "</td>";


            nuevaFila += newValor;
            if (i == 1) {
                PadreIdTd = (ii + "Td" + i);
                DefMet = ArregloDefiniciones[indiceDefiniciones].split('&&')[0];
            }
            if (i == 0) nuevaFilaT += newValor;
            if (i >= 1 && i <= 3) cadebaFilaGE1 += newValor;
            if (i >= 4 && i <= 6) cadebaFilaGE2 += newValor;
            if (i >= 7 && i <= 9) cadebaFilaGE3 += newValor;
        }
        arregloFuenteIdTdControles.push(ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[1] + "&&" + ii);
        nuevaFila += "</tr>";
        cadebaFilaGE1 += "</tr></table></td>";
        cadebaFilaGE2 += "</tr></table></td>";
        cadebaFilaGE3 += "</tr></table></td>";
        nuevaFilaT += cadebaFilaGE1 + cadebaFilaGE2 + cadebaFilaGE3 + "</tr>";
        ii++;
        indiceAnterior = ii;
        nuevaFila += "<tr id='" + ("Tr" + ii) + "' " + " style='display: none; opacity:0;'" + " >";

        nuevaFilaT += "<tr id='" + ("Tr" + ii) + "' " + " style='display: none; opacity:0;'" + " >";
        cadebaFilaGE1 = '<td  id="' + ('Td' + ii) + 'TdEtapaUno" ' + ' style="width: 30%;height:30px;"> <table  cellspacing="0" cellpadding="0" style="width: 100%;height:100px;margin-left:-2px;margin-bottom:-2px"><tr style="width: 100%;height:100%">';
        cadebaFilaGE2 = '<td  id="' + ('Td' + ii) + 'TdEtapaDos" ' + ' style="width: 30%;height:30px;"> <table  cellspacing="0" cellpadding="0" style="width: 100%;height:100px;margin-left:-4px;margin-bottom:-2px"><tr style="width: 100%;height:100%">';
        cadebaFilaGE3 = '<td  id="' + ('Td' + ii) + 'TdEtapaTres" ' + ' style="width: 30%;height:30px;"> <table cellspacing="0" cellpadding="0" style="width: 100%;height:100px;margin-left:-6px;margin-bottom:-2px"><tr style="width: 100%;height:100%">';
        for (var i = 0; i < numColumas; i++) {
            var newValor = "<td id='" + (ii + "Td" + i) + "' " + (i > 0 ? "style='width:33%;height: 100%;font-size:6px; filter: alpha(opacity=70); opacity: 1;'" + "class='"
                    + (i > 0 && i <= 3 ? "AcordeonAzul_3'" : (i >= 4 && i <= 6 ? "AcordeonAmarillo_3'" : "AcordeonNaranja_3'")) : "class='Gris_Gde' style='width:10%;height:30px; font: normal 8px Helvetica, Arial, sans-serif;border-radius: 0px; ' ") + ">" + "</td>";
            nuevaFila += newValor;
            if (i == 0) nuevaFilaT += newValor;
            if (i >= 1 && i <= 3) cadebaFilaGE1 += newValor;
            if (i >= 4 && i <= 6) cadebaFilaGE2 += newValor;
            if (i >= 7 && i <= 9) cadebaFilaGE3 += newValor;
        }
        nuevaFila += "</tr>";
        cadebaFilaGE1 += "</tr></table></td>";
        cadebaFilaGE2 += "</tr></table></td>";
        cadebaFilaGE3 += "</tr></table></td>";
        nuevaFilaT += cadebaFilaGE1 + cadebaFilaGE2 + cadebaFilaGE3 + "</tr>";
    }
    else {
        for (var i = 1; i < 8; i++) {
            var statusBloqueo = ArregloDefiniciones[indiceDefiniciones].split('&&')[OpcionCargada != 'Carga' ? 6 : 2];
            document.getElementById("TdImgCandado_" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[1]) != null ? (document.getElementById("TdImgCandado_" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[1]).setAttribute('src', '../../Images/PanelDeControl/Candados/' + (statusBloqueo == '0' ? 'candadoAA1.png' : (statusBloqueo == '1' ? 'candadoAC.png' : '')))) : null;
            document.getElementById("TdImgCandado_" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[1]) != null ? (document.getElementById("TdImgCandado_" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[1]).setAttribute('title', (statusBloqueo == '0' ? "Procesos Desbloqueados" : (statusBloqueo == '1' ? "Procesos Bloqueados" : "")))) : null;
            document.getElementById("TdImgCandado_" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[1]) != null ? (statusBloqueo == '0' ? $("#TdImgCandado_" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[1]).hide() : (statusBloqueo == '1' ? $("#TdImgCandado_" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[1]).show() : null)) : null;

            CaseFasesAgregarControlesProceso(ArregloDefiniciones[indiceDefiniciones].split('&&')[0], i, esLoad, (ii + "Td" + i), ClassEncabezado == 'EncabClasRep' ? true : null)
            if (i == 1) {
                PadreIdTd = (ii + "Td" + i);
                DefMet = ArregloDefiniciones[indiceDefiniciones].split('&&')[0];
            }
        }
        ii++;
        indiceAnterior = ii;
    }
    idPadreBDFuente = ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[1]; /*AKRG*/
    if (ClassEncabezado == 'EncabClasMet' && DefinicionesFuenteMetTemp.length > 0) {
        var DefinicionesFuentes = new Array();
        var DefinicionesInsumos = new Array();
        var DefinicionesComplemento = new Array();
        for (var i = 0; i < DefinicionesFuenteMetTemp.length; i++) {
            for (var ii = 0; ii < Definiciones.length; ii++) {
                if (DefinicionesFuenteMetTemp[i].split('&&')[0] == Definiciones[ii].split('&&')[0]) {
                    if (Definiciones[ii].split('&&')[1] == 'FUENTE DE CARTERA')
                        DefinicionesFuentes.push(Definiciones[ii]);
                    if (Definiciones[ii].split('&&')[1] == 'INSUMOS DEL PROCESO')
                        DefinicionesInsumos.push(Definiciones[ii]);
                    if (Definiciones[ii].split('&&')[1] == 'COMPLEMENTO SICRENET')
                        DefinicionesComplemento.push(Definiciones[ii]);
                    break;
                }
            }
        }
        DefinicionesMetodolReporte = DefinicionesFuentes.concat(DefinicionesInsumos, DefinicionesComplemento);
        ArregloFuentesEstatusPadre = new Array();
        numeroFilas = (DefinicionesMetodolReporte.length * 2) + (DefinicionesFuentes.length > 0 ? 1 : 0) + (DefinicionesInsumos.length > 0 ? 1 : 0) + (DefinicionesComplemento.length > 0 ? 1 : 0);
        nuevaFilaT += CreaAcordeonVerticalFuenteTempHijos(numeroFilas, numColumas, DefinicionesMetodolReporte, 'EncabClasCarga', 'HME', indiceAnterior, false, indicePAdre, esLoad);
        ArrayPadreFasesFuentesProceso.push((PadreIdTd + "$$$" + DefMet) + "||" + ArregloFuentesEstatusPadre);
    }
    if (ClassEncabezado == 'EncabClasMet' && DefinicionesFuenteMetTemp.length == 0)
        ArrayPadreFasesFuentesProceso.push((PadreIdTd + "$$$" + DefMet) + "||" + ArregloFuentesEstatusPadre);

    if (ClassEncabezado == 'EncabClasRep' && DefinicionesMetodolReporteTemp.length > 0) {
        var DefinicionesFuentes = new Array();
        var DefinicionesInsumos = new Array();
        var DefinicionesComplemento = new Array();

        var DefinicionesCartera = new Array();
        for (var i = 0; i < DefinicionesMetodolReporteTemp.length; i++) {
            for (var ii = 0; ii < DefinicionesMetodologia.length; ii++) {
                if (DefinicionesMetodolReporteTemp[i].split('&&')[0] == DefinicionesMetodologia[ii].split('&&')[0]) {
                    if (DefinicionesMetodologia[ii].split('&&')[1] == 'CARTERA' || DefinicionesMetodologia[ii].split('&&')[1] == 'POSTERIORES')
                        DefinicionesCartera.push(DefinicionesMetodologia[ii]);
                    break;
                }
                else if (ii == DefinicionesMetodologia.length - 1) {
                    for (var iii = 0; iii < Definiciones.length; iii++) {
                        if (DefinicionesMetodolReporteTemp[i].split('&&')[0] == Definiciones[iii].split('&&')[0]) {
                            if (Definiciones[iii].split('&&')[1] == 'FUENTE DE CARTERA')
                                DefinicionesFuentes.push(Definiciones[iii] + "--EsFuente");
                            if (Definiciones[iii].split('&&')[1] == 'INSUMOS DEL PROCESO')
                                DefinicionesInsumos.push(Definiciones[iii] + "--EsFuente");
                            if (Definiciones[iii].split('&&')[1] == 'COMPLEMENTO SICRENET')
                                DefinicionesComplemento.push(Definiciones[iii] + "--EsFuente");
                            break;
                        }
                    }
                }
            }
        }
        DefinicionesMetodolReporte = DefinicionesCartera.concat(DefinicionesFuentes, DefinicionesInsumos, DefinicionesComplemento);
        ArregloHijosReportesMedologi = "";
        numeroFilas = (DefinicionesMetodolReporte.length * 2) + (DefinicionesCartera.length > 0 ? 1 : 0) + (DefinicionesFuentes.length > 0 ? 1 : 0) + (DefinicionesInsumos.length > 0 ? 1 : 0) + (DefinicionesComplemento.length > 0 ? 1 : 0);
        nuevaFilaT += CreaAcordeonVerticalFuenteTempHijos(numeroFilas, numColumas, DefinicionesMetodolReporte, 'EncabClasMet', 'HME', indiceAnterior, true, indicePAdre, esLoad);
        ArrayPadreReportesMedologia.push(PadreIdTd + "$$$" + ArregloDefiniciones[indiceDefiniciones].split('&&')[0] + "||" + ArregloHijosReportesMedologi);
    }
    return nuevaFilaT;
}

var ArrayPadreFasesFuentesProceso = new Array();
var ArrayPadreReportesMedologia = new Array(); var ArregloHijosReportesMedologi = "";
function CreaAcordeonVerticalFuenteTempHijos(numeroFilas, numColumas, ArregloDefiniciones, ClassEncabezado, PrefijoHijo, indiceAnterior, esReporte, indicePAdre, esLoad) {
    var indiceDefiniciones = 0;
    var cadenaTable = null;
    if (esLoad) {
        for (var ii = 0; ii < numeroFilas; ii++) {
            var nuevaFila = ''; var nuevaFilaT = '';
            if ((ii > 0 && ArregloDefiniciones[indiceDefiniciones].split('&&')[1] != ArregloDefiniciones[indiceDefiniciones - 1].split('&&')[1]) || indiceDefiniciones == 0) {
                nuevaFila += "<tr id='" + (indiceAnterior + "Tr" + PrefijoHijo + ii) + "'  style='display: none; opacity:0;' >";

                nuevaFilaT += "<tr id='" + (indiceAnterior + "Tr" + PrefijoHijo + ii) + "'  style='display: none; opacity:0;' >";
                cadebaFilaGE1 = '<td id="' + (indiceAnterior + 'Td' + PrefijoHijo + ii) + 'TdEtapaUno"  style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-2px;margin-bottom:-2px"><tr style="width: 100%;">';
                cadebaFilaGE2 = '<td id="' + (indiceAnterior + 'Td' + PrefijoHijo + ii) + 'TdEtapaDos"  style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-4px;margin-bottom:-2px"><tr style="width: 100%;">';
                cadebaFilaGE3 = '<td id="' + (indiceAnterior + 'Td' + PrefijoHijo + ii) + 'TdEtapaTres" style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-6px;margin-bottom:-2px"><tr style="width: 100%;">';
                for (var i = 0; i < numColumas; i++) {
                    var newValor = "<td id='" + (indicePAdre + "" + ii + "Td" + PrefijoHijo + i) + "' style='width:" + (i == 0 ? "10" : "33") + "%;height:30px; font: normal 8px Helvetica, Arial, sans-serif;color: White;' class='" + (ArregloDefiniciones[indiceDefiniciones].split("--")[1] == "EsFuente" ? "EncabClasCarga" : ClassEncabezado) + "'>" + (i == 0 ? '&nbsp&nbsp&nbsp&nbsp&nbsp' + ArregloDefiniciones[indiceDefiniciones].split("--")[0].split('&&')[1] : '') + "</td>";
                    nuevaFila += newValor;
                    if (i == 0) nuevaFilaT += newValor;
                    if (i >= 1 && i <= 3) cadebaFilaGE1 += newValor;
                    if (i >= 4 && i <= 6) cadebaFilaGE2 += newValor;
                    if (i >= 7 && i <= 9) cadebaFilaGE3 += newValor;
                }
                nuevaFila += "</tr>";
                cadebaFilaGE1 += "</tr></table></td>";
                cadebaFilaGE2 += "</tr></table></td>";
                cadebaFilaGE3 += "</tr></table></td>";
                nuevaFilaT += cadebaFilaGE1 + cadebaFilaGE2 + cadebaFilaGE3 + "</tr>";

                ii++;
                nuevaFilaT += AgregarColumnasFasesHijos(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, 'HME', indiceAnterior, esReporte, indicePAdre, esLoad);
                ii++;
                indiceDefiniciones++;
            }
            else {
                nuevaFilaT += AgregarColumnasFasesHijos(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, 'HME', indiceAnterior, esReporte, indicePAdre, esLoad);
                ii++;
                nuevaFila += "</tr>";
                indiceDefiniciones++;
                if (ArregloDefiniciones.length == indiceDefiniciones)
                    ii = numeroFilas;
            }
            cadenaTable += nuevaFilaT;
        }
    }
    else {
        for (var ii = 0; ii < numeroFilas; ii++) {
            if ((ii > 0 && ArregloDefiniciones[indiceDefiniciones].split('&&')[1] != ArregloDefiniciones[indiceDefiniciones - 1].split('&&')[1]) || indiceDefiniciones == 0) {
                ii++;
                AgregarColumnasFasesHijos(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, 'HME', indiceAnterior, esReporte, indicePAdre, esLoad);
                ii++;
                indiceDefiniciones++;
            }
            else {
                AgregarColumnasFasesHijos(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, 'HME', indiceAnterior, esReporte, indicePAdre, esLoad);
                ii++;
                indiceDefiniciones++;
                if (ArregloDefiniciones.length == indiceDefiniciones)
                    ii = numeroFilas;
            }
        }
    }
    return cadenaTable;
}

function AgregarColumnasFasesHijos(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, PrefijoHijo, indiceAnterior, esReporte, indicePAdre, esLoad) {
    var DefinicionesFuenteMet = new Array();
    var DefinicionesFuenteMetTemp = new Array();
    if (ClassEncabezado == 'EncabClasMet' && esReporte)//&& ArregloDefiniciones[indiceDefiniciones].split('&&')[0] == 'COMERCIAL - MET GRAL CNBV')
    {
        for (var i = 0; i < DefinicionesRelaciones.length; i++) {
            if (ArregloDefiniciones[indiceDefiniciones].split('&&')[0] == DefinicionesRelaciones[i].split('&&')[1]) {
                if (!ExisteItemEnArreglo(DefinicionesRelaciones[i].split('&&')[2], DefinicionesFuenteMetTemp))
                    DefinicionesFuenteMetTemp.push(DefinicionesRelaciones[i].split('&&')[2] + '&&');
            }
        }
    }
    if ((ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[0]) == "GENERAL ADICIONAL") {
        var vaa = "";
    }
    var nuevaFila = '';
    var nuevaFilaT = '';
    var indicePAdre = ii;
    var PadreIdTd = ''; var DefMet = "";
    if (esLoad) {
        nuevaFila += "<tr id='" + (indiceAnterior + "Tr" + PrefijoHijo + ii) + "' style='display: none; opacity:0;'" + (ClassEncabezado == 'EncabClasMet' && esReporte ? "onclick='ExpandeCollapsaAcordeonVerticalFuenteH_Click(this);'" : "") + ">";

        nuevaFilaT += "<tr id='" + (indiceAnterior + "Tr" + PrefijoHijo + ii) + "' style='display: none; opacity:0;'" + (ClassEncabezado == 'EncabClasMet' && esReporte && ArregloDefiniciones[indiceDefiniciones].split("--")[1] != "EsFuente" ? "onclick='ExpandeCollapsaAcordeonVerticalFuenteH_Click(this);'" : "") + ">";
        cadebaFilaGE1 = '<td id="' + (indiceAnterior + 'Td' + PrefijoHijo + ii) + 'TdEtapaUno"  style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-2px;margin-bottom:-2px"><tr style="width: 100%;margin-left:-2px">';
        cadebaFilaGE2 = '<td id="' + (indiceAnterior + 'Td' + PrefijoHijo + ii) + 'TdEtapaDos"  style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-4px;margin-bottom:-2px"><tr style="width: 100%;margin-left:-4px">';
        cadebaFilaGE3 = '<td id="' + (indiceAnterior + 'Td' + PrefijoHijo + ii) + 'TdEtapaTres" style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-6px;margin-bottom:-2px"><tr style="width: 100%;margin-left:-6px">';

        for (var i = 0; i < numColumas; i++) {
            var newValor = "<td id='" + (indicePAdre + "" + indiceAnterior + "Td" + PrefijoHijo + ii + i) + "' " + (i > 0 ? "style='width:33%;height:30px;font-size:8px;' class='" + CaseFasesAgregarControlesProceso(ArregloDefiniciones[indiceDefiniciones].split('&&')[0], i, esLoad, '') + "'" : "class='" + (ArregloDefiniciones[indiceDefiniciones].split("--")[1] == "EsFuente" ? "EncabClasCarga" : ClassEncabezado) + "1' style='width:10%;height:30px; font: normal 8px Helvetica, Arial, sans-serif;" + ((DefinicionesFuenteMetTemp.length > 0) && i == 0 ? "cursor:pointer" : "") + "'") + ">" +
           (i == 0 ? "&nbsp&nbsp&nbsp<img src='../../Images/PanelDeControl/Expander/puntos.png'  style='vertical-align:middle;width:10px;height:100%;'/>" : "") +
         ((DefinicionesFuenteMetTemp.length > 0) && i == 0 && ArregloDefiniciones[indiceDefiniciones].split("--")[1] != "EsFuente" ? "<img id='Img_" + (indiceAnterior + "Tr" + PrefijoHijo + ii) + "' src='../../Images/PanelDeControl/Expander/fDerechaG.png'  style='vertical-align:middle;width:10px;height:15px;'/>" + " <img id='ImgSigno_" + (indiceAnterior + "Tr" + PrefijoHijo + ii) + "' src='../../Images/PanelDeControl/Expander/mas.png'  style='vertical-align:middle;width:9px;height:9px;'/> " : (i == 0 && ClassEncabezado == 'EncabClasMet' && ArregloDefiniciones[indiceDefiniciones].split("--")[1] != "EsFuente" ? "<img id='" + "TdImg" + (ii + 1) + "'src='../../Images/PanelDeControl/Expander/fDerechaG.png'  style='vertical-align:middle;width:10px;height:15px;'/>" : '')) + ((i == 0) ? (ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[0]) : " <div id='div" + (indicePAdre + "" + indiceAnterior + "Td" + PrefijoHijo + ii + i) + "' class='BarraHijoV' ></div><div id='div" + (indicePAdre + "" + indiceAnterior + "Td" + PrefijoHijo + ii + i) + "_txt' class='BarraTexto'> ") + "</td>";
            nuevaFila += newValor;
            if (i == 0) nuevaFilaT += newValor;
            if (i >= 1 && i <= 3) cadebaFilaGE1 += newValor;
            if (i >= 4 && i <= 6) cadebaFilaGE2 += newValor;
            if (i >= 7 && i <= 9) cadebaFilaGE3 += newValor;

            if (i == 1) {
                PadreIdTd = (indicePAdre + "" + indiceAnterior + "Td" + PrefijoHijo + ii + i);
                DefMet = (ArregloDefiniciones[indiceDefiniciones].split('&&')[0]);
                ArregloHijosReportesMedologi += "_&" + PadreIdTd + '&&';
            }
        }
        nuevaFila += "</tr>";
        cadebaFilaGE1 += "</tr></table></td>";
        cadebaFilaGE2 += "</tr></table></td>";
        cadebaFilaGE3 += "</tr></table></td>";
        nuevaFilaT += cadebaFilaGE1 + cadebaFilaGE2 + cadebaFilaGE3 + "</tr>";
    }
    else {
        for (var i = 1; i < 8; i++) {
            CaseFasesAgregarControlesProceso(ArregloDefiniciones[indiceDefiniciones].split('&&')[0], i, esLoad, (indicePAdre + "" + indiceAnterior + "Td" + PrefijoHijo + ii + i))
            if (i == 1) {
                PadreIdTd = (indicePAdre + "" + indiceAnterior + "Td" + PrefijoHijo + ii + i);
                DefMet = (ArregloDefiniciones[indiceDefiniciones].split('&&')[0]);
                ArregloHijosReportesMedologi += "_&" + PadreIdTd + '&&';
            }
        }
    }
    ii++;
    if (ClassEncabezado == 'EncabClasMet' && DefinicionesFuenteMetTemp.length > 0 && esReporte)//&& ArregloDefiniciones[indiceDefiniciones].split('&&')[0] == 'COMERCIAL - MET GRAL CNBV') 
    {
        var DefinicionesFuentes = new Array();
        var DefinicionesInsumos = new Array();
        var DefinicionesComplemento = new Array();
        for (var i = 0; i < DefinicionesFuenteMetTemp.length; i++) {
            for (var ii = 0; ii < Definiciones.length; ii++) {
                if (DefinicionesFuenteMetTemp[i].split('&&')[0] == Definiciones[ii].split('&&')[0]) {
                    if (Definiciones[ii].split('&&')[1] == 'FUENTE DE CARTERA')
                        DefinicionesFuentes.push(Definiciones[ii]);
                    if (Definiciones[ii].split('&&')[1] == 'INSUMOS DEL PROCESO')
                        DefinicionesInsumos.push(Definiciones[ii]);
                    if (Definiciones[ii].split('&&')[1] == 'COMPLEMENTO SICRENET')
                        DefinicionesComplemento.push(Definiciones[ii]);
                    break;
                }
            }
        }
        DefinicionesFuenteMet = DefinicionesFuentes.concat(DefinicionesInsumos, DefinicionesComplemento);
        ArregloFuentesEstatusPadre = new Array();
        numeroFilas = (DefinicionesFuenteMet.length * 2) + (DefinicionesFuentes.length > 0 ? 1 : 0) + (DefinicionesInsumos.length > 0 ? 1 : 0) + (DefinicionesComplemento.length > 0 ? 1 : 0)
        nuevaFilaT += CreaAcordeonVerticalFuenteTempHijosT(numeroFilas, numColumas, DefinicionesFuenteMet, 'EncabClasCarga', 'HFuentes', indiceAnterior, indicePAdre, esLoad);
        ArrayPadreFasesFuentesProceso.push((PadreIdTd + "$$$" + DefMet) + "||" + ArregloFuentesEstatusPadre);
    }
    else if (ArregloDefiniciones[indiceDefiniciones].split("--")[1] == "EsFuente") {
        ArrayPadreFasesFuentesProceso.push((PadreIdTd + "$$$" + DefMet) + "##EsFuente||" + ArregloFuentesEstatusPadre[DevuelveIndiceDeElementoExistente("_&" + DefMet, ArregloFuentesEstatusPadre)]);
    }
    return nuevaFilaT;
}

function CreaAcordeonVerticalFuenteTempHijosT(numeroFilas, numColumas, ArregloDefiniciones, ClassEncabezado, PrefijoHijo, indiceAnterior, indicePAdre, esLoad) {
    var indiceDefiniciones = 0;
    var cadenaTable = null;
    if (esLoad) {
        for (var ii = 0; ii < numeroFilas; ii++) {
            var nuevaFila = ''; var nuevaFilaT = '';
            if ((ii > 0 && ArregloDefiniciones[indiceDefiniciones].split('&&')[1] != ArregloDefiniciones[indiceDefiniciones - 1].split('&&')[1]) || indiceDefiniciones == 0) {
                nuevaFila += "<tr id='" + (indiceAnterior + "HTr" + PrefijoHijo + indicePAdre + ii) + "'  style='display: none; opacity:0;' >";

                nuevaFilaT += "<tr id='" + (indiceAnterior + "HTr" + PrefijoHijo + indicePAdre + ii) + "'  style='display: none; opacity:0;' >";
                cadebaFilaGE1 = '<td id="' + (idPadreBDFuente + indiceAnterior + "Td" + PrefijoHijo + indicePAdre + ii) + 'TdEtapaUno"  style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-2px;margin-bottom:-2px"><tr style="width: 100%;">';
                cadebaFilaGE2 = '<td id="' + (idPadreBDFuente + indiceAnterior + "Td" + PrefijoHijo + indicePAdre + ii) + 'TdEtapaDos"  style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-4px;margin-bottom:-2px"><tr style="width: 100%;">';
                cadebaFilaGE3 = '<td id="' + (idPadreBDFuente + indiceAnterior + "Td" + PrefijoHijo + indicePAdre + ii) + 'TdEtapaTres" style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-6px;margin-bottom:-2px"><tr style="width: 100%;">';
                for (var i = 0; i < numColumas; i++) {
                    var newValor = "<td id='" + (idPadreBDFuente + indiceAnterior + "" + indicePAdre + "" + ii + "" + i + "Td" + PrefijoHijo + i) + "' style='width:10%;" + (ii == 0 ? "height:30px;" : "height:30px;") + "font: normal 8px Helvetica, Arial, sans-serif;color: White;' class='" + ClassEncabezado + "'>" + (i == 0 ? '&nbsp&nbsp&nbsp&nbsp&nbsp' + ArregloDefiniciones[indiceDefiniciones].split('&&')[1] : '') + "</td>";
                    nuevaFila += newValor;
                    if (i == 0) nuevaFilaT += newValor;
                    if (i >= 1 && i <= 3) cadebaFilaGE1 += newValor;
                    if (i >= 4 && i <= 6) cadebaFilaGE2 += newValor;
                    if (i >= 7 && i <= 9) cadebaFilaGE3 += newValor;
                }
                nuevaFila += "</tr>";
                cadebaFilaGE1 += "</tr></table></td>";
                cadebaFilaGE2 += "</tr></table></td>";
                cadebaFilaGE3 += "</tr></table></td>";
                nuevaFilaT += cadebaFilaGE1 + cadebaFilaGE2 + cadebaFilaGE3 + "</tr>";

                ii++;
                nuevaFilaT += AgregarColumnasFasesHijosT(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, 'HFuentes', indiceAnterior, indicePAdre, esLoad);
                ii++;
                indiceDefiniciones++;
            }
            else {
                nuevaFilaT += AgregarColumnasFasesHijosT(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, 'HFuentes', indiceAnterior, indicePAdre, esLoad);
                ii++;
                nuevaFila += "</tr>";
                indiceDefiniciones++;
                if (ArregloDefiniciones.length == indiceDefiniciones)
                    ii = numeroFilas;
            }
            cadenaTable += nuevaFilaT;
        }
    }
    else {
        for (var ii = 0; ii < numeroFilas; ii++) {
            if ((ii > 0 && ArregloDefiniciones[indiceDefiniciones].split('&&')[1] != ArregloDefiniciones[indiceDefiniciones - 1].split('&&')[1]) || indiceDefiniciones == 0) {
                ii++;
                AgregarColumnasFasesHijosT(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, 'HFuentes', indiceAnterior, indicePAdre, esLoad);
                ii++;
                indiceDefiniciones++;
            }
            else {
                AgregarColumnasFasesHijosT(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, 'HFuentes', indiceAnterior, indicePAdre, esLoad);
                ii++;
                indiceDefiniciones++;
                if (ArregloDefiniciones.length == indiceDefiniciones)
                    ii = numeroFilas;
            }
        }
    }
    return cadenaTable;
}

function AgregarColumnasFasesHijosT(ii, numColumas, indiceDefiniciones, ArregloDefiniciones, ClassEncabezado, PrefijoHijo, indiceAnterior, indicePAdre, esLoad) {
    var nuevaFila = ''; var nuevaFilaT = '';
    if (esLoad) {
        nuevaFila += "<tr id='" + (indiceAnterior + "HTr" + PrefijoHijo + indicePAdre + ii + indicePAdre) + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].replace(" ", "").replace(" ", "").replace(" ", "") + "'style='display: none; opacity:0;'>";

        nuevaFilaT += "<tr id='" + (indiceAnterior + "HTr" + PrefijoHijo + indicePAdre + ii + indicePAdre) + "'style='display: none; opacity:0;'>";
        cadebaFilaGE1 = '<td id="' + (idPadreBDFuente + indiceAnterior + "Td" + PrefijoHijo + indicePAdre + ii) + 'TdEtapaUno"  style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-2px;margin-bottom:-2px"><tr style="width: 100%;">';
        cadebaFilaGE2 = '<td id="' + (idPadreBDFuente + indiceAnterior + "Td" + PrefijoHijo + indicePAdre + ii) + 'TdEtapaDos"  style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-4px;margin-bottom:-2px"><tr style="width: 100%;">';
        cadebaFilaGE3 = '<td id="' + (idPadreBDFuente + indiceAnterior + "Td" + PrefijoHijo + indicePAdre + ii) + 'TdEtapaTres" style="width: 30%;"> <table cellspacing="0" cellpadding="0" style="width: 100%;margin-left:-6px;margin-bottom:-2px"><tr style="width: 100%;">';
        for (var i = 0; i < numColumas; i++) {
            var newValor = "<td id='" + (idPadreBDFuente + indiceAnterior + "" + indicePAdre + "" + ii + "Td" + PrefijoHijo + i) + "' " + (i > 0 ? "style='width:33%;height:30px;font-size:6px;' class='" + CaseFasesAgregarControlesProceso(/*AKRG*/idPadreBDFuente + ArregloDefiniciones[indiceDefiniciones].split('&&')[0], i, esLoad, '') + "'" : "class='" + ClassEncabezado + "1' style='width:10%;height:30px; font: normal 8px Helvetica, Arial, sans-serif'") + ">" + ((i == 0) ? ("&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img src='../../Images/PanelDeControl/Expander/puntos.png'  style='vertical-align:middle;width:10px;height:100%;'/>") + ArregloDefiniciones[indiceDefiniciones].split('&&')[0].split('%%%')[0] : " <div id='div" + (indiceAnterior + "" + indicePAdre + "" + ii + "Td" + PrefijoHijo + i) + "' class='BarraHijoV' ></div><div id='div" + (indiceAnterior + "" + indicePAdre + "" + ii + "Td" + PrefijoHijo + i) + "_txt' class='BarraTexto'> ") + "</td>";
            nuevaFila += newValor;
            if (i == 0) nuevaFilaT += newValor;
            if (i >= 1 && i <= 3) cadebaFilaGE1 += newValor;
            if (i >= 4 && i <= 6) cadebaFilaGE2 += newValor;
            if (i >= 7 && i <= 9) cadebaFilaGE3 += newValor;
        }
        nuevaFila += "</tr>";
        cadebaFilaGE1 += "</tr></table></td>";
        cadebaFilaGE2 += "</tr></table></td>";
        cadebaFilaGE3 += "</tr></table></td>";
        nuevaFilaT += cadebaFilaGE1 + cadebaFilaGE2 + cadebaFilaGE3 + "</tr>";
    }
    else {
        for (var i = 1; i < 10; i++)
        CaseFasesAgregarControlesProceso(ArregloDefiniciones[indiceDefiniciones].split('&&')[0], i, esLoad, (idPadreBDFuente + indiceAnterior + "" + indicePAdre + "" + ii + "Td" + PrefijoHijo + i))
    }
    return nuevaFilaT;
}

var ArregloFuentesEstatusPadre = new Array();
function CaseFasesAgregarControlesProceso(DefinicionFuenteCambio, faseCambio, esLoad, TdCambio, esReporteS) {
    var cumplio = false;
    var ClassEstatus = 'EstatusGris';

    if (esReporteS == null || esReporteS == undefined) {
        
        for (var x = 0; x < ArrayFuenteEstatus.length; x++) {
            if (ArrayFuenteEstatus[x].split('&&')[0] == DefinicionFuenteCambio) {
                if (DefinicionFuenteCambio == "ARRMTO CRMX" && TdCambio == "275TdHFuentes1") {
                    var fu = "";
                }
                cumplio = true;
                if (ArrayFuenteEstatus[x].split('&&')[1] == faseCambio) {
                    if (faseCambio <= 3) {
                        if (ArrayFuenteEstatus[x].split('&&')[2] == "1") { if (esLoad) ClassEstatus = 'EstatusGris'; else { $("#" + TdCambio).attr('class', 'EstatusGris'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayFuenteEstatus[x].split('&&')[2] == "2") { if (esLoad) ClassEstatus = 'EstatusAmarillo'; else { $("#" + TdCambio).attr('class', 'EstatusAmarillo'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayFuenteEstatus[x].split('&&')[2] == '3') { if (esLoad) ClassEstatus = 'EstatusRojo'; else { $("#" + TdCambio).attr('class', 'EstatusRojo'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayFuenteEstatus[x].split('&&')[2] == '4') { if (esLoad) ClassEstatus = 'EstatusNaranja'; else { $("#" + TdCambio).attr('class', 'EstatusNaranja'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayFuenteEstatus[x].split('&&')[2] == '5') { if (esLoad) ClassEstatus = 'EstatusVerde'; else { $("#" + TdCambio).attr('class', 'EstatusVerde'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayFuenteEstatus[x].split('&&')[2] == '6') { if (esLoad) ClassEstatus = 'EstatusAzul'; else { $("#" + TdCambio).attr('class', 'EstatusAzul'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayFuenteEstatus[x].split('&&')[2] == '7') { if (esLoad) ClassEstatus = 'EstatusMorado'; else { $("#" + TdCambio).attr('class', 'EstatusMorado'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayFuenteEstatus[x].split('&&')[2] == '8') { if (esLoad) ClassEstatus = 'EstatusBlanco'; else { $("#" + TdCambio).attr('class', 'EstatusBlanco'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayFuenteEstatus[x].split('&&')[2] == '9') { if (esLoad) ClassEstatus = 'EstatusNegro'; else { $("#" + TdCambio).attr('class', 'EstatusNegro'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayFuenteEstatus[x].split('&&')[2] == "0") { if (esLoad) ClassEstatus = 'EstatusGris'; else { $("#" + TdCambio).attr('class', 'EstatusGris'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                    }
                    else { if (esLoad) ClassEstatus = 'EstatusBlanco'; else $("#" + TdCambio).attr('class', 'EstatusBlanco'); } //Agregado
                }
                else if (faseCambio > 3) {//Agregado
                    if (esLoad) ClassEstatus = 'EstatusBlanco'; else $("#" + TdCambio).attr('class', 'EstatusBlanco');
                }
                else if (ArrayFuenteEstatus[x].split('&&')[2] == "0") {
                    if (esLoad) ClassEstatus = 'EstatusGris'; else { $("#" + TdCambio).attr('class', 'EstatusGris'); ClassEstatus = $("#" + TdCambio).attr('class'); }
                }
            }
            else if (cumplio) break;
        }

        if (!ExisteItemEnArreglo("_&" + DefinicionFuenteCambio, ArregloFuentesEstatusPadre))
            ArregloFuentesEstatusPadre.push("_&" + DefinicionFuenteCambio + "&&" + ClassEstatus);
        else {
            var index = DevuelveIndexExisteItemEnArreglo("_&" + DefinicionFuenteCambio, ArregloFuentesEstatusPadre);
            ArregloFuentesEstatusPadre[index] = ArregloFuentesEstatusPadre[index] + "," + ClassEstatus;
        }
    }
    else {
        for (var x = 0; x < ArrayReportesEstatus.length; x++) {
            if (ArrayReportesEstatus[x].split('&&')[0] == DefinicionFuenteCambio) {
                cumplio = true;
                if (ArrayReportesEstatus[x].split('&&')[1] == faseCambio) {
                    if (faseCambio >= 7) {
                        if (ArrayReportesEstatus[x].split('&&')[2] != "2") {
                            $("#div" + TdCambio).hide();
                            $("#div" + TdCambio + "_txt").hide();
                        }
                        if (ArrayReportesEstatus[x].split('&&')[2] == "1") { if (esLoad) ClassEstatus = 'EstatusGris'; else { $("#" + TdCambio).attr('class', 'EstatusGris'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayReportesEstatus[x].split('&&')[2] == "2") {
                            if (esLoad) ClassEstatus = 'EstatusAmarillo'; else { $("#" + TdCambio).attr('class', 'EstatusAmarillo'); ClassEstatus = $("#" + TdCambio).attr('class'); }
                            $("#div" + TdCambio).show();
                            $("#div" + TdCambio + "_txt").show();
                            ProgressBarArrmto(0, 0.2, TdCambio, ArrayReportesEstatus[x].split('&&')[0].split("%%%")[1], true, false, false); break;
                        }
                        if (ArrayReportesEstatus[x].split('&&')[2] == '3') {if (esLoad) ClassEstatus = 'EstatusRojo'; else { $("#" + TdCambio).attr('class', 'EstatusRojo'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayReportesEstatus[x].split('&&')[2] == '4') {if (esLoad) ClassEstatus = 'EstatusNaranja'; else { $("#" + TdCambio).attr('class', 'EstatusNaranja'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayReportesEstatus[x].split('&&')[2] == '5') {if (esLoad) ClassEstatus = 'EstatusVerde'; else { $("#" + TdCambio).attr('class', 'EstatusVerde'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayReportesEstatus[x].split('&&')[2] == '6') {if (esLoad) ClassEstatus = 'EstatusAzul'; else { $("#" + TdCambio).attr('class', 'EstatusAzul'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayReportesEstatus[x].split('&&')[2] == '7') {if (esLoad) ClassEstatus = 'EstatusMorado'; else { $("#" + TdCambio).attr('class', 'EstatusMorado'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayReportesEstatus[x].split('&&')[2] == '8') {if (esLoad) ClassEstatus = 'EstatusBlanco'; else { $("#" + TdCambio).attr('class', 'EstatusBlanco'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayReportesEstatus[x].split('&&')[2] == '9') {if (esLoad) ClassEstatus = 'EstatusNegro'; else { $("#" + TdCambio).attr('class', 'EstatusNegro'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                        if (ArrayReportesEstatus[x].split('&&')[2] == "0") {if (esLoad) ClassEstatus = 'EstatusGris'; else { $("#" + TdCambio).attr('class', 'EstatusGris'); ClassEstatus = $("#" + TdCambio).attr('class'); } break; }
                    }
                }
            }
            else if (cumplio) break;
        }
    }
    return ClassEstatus;
}

function CreaColumnaDefinicionFuentes_AcordeonHorizontal() {
    var cadena = "<pre><table id='tblDefinicionesfuentes' style='width:100%;height:100%;margin-top: 13px;' >";
    var agreoIndex = 0;
    for (var i = 0; i < Definiciones.length; i++)
        if (Definiciones[i].split('&&')[1] == 'FUENTE DE CARTERA' || Definiciones[i].split('&&')[1] == 'FUENTE') {
            agreoIndex++;
            cadena += "<tr style='width:100%;height:" + (DeterminaSiNumParImpar(i + 1) == "Par" ? "10" : "16") + "px'><td class='" + (DeterminaSiNumParImpar(i) == "Par" ? "Gris_2" : "Gris_1") + "' style='width:100%;height:10px;color:White'><div style='position: relative;margin-top:-1px;text-align: left;'><small>" + Definiciones[i].split('&&')[0].split('%%%')[0] + "</small></div></td></tr>";
        }
    cadena += "<tr style='width:100%;height:" + (DeterminaSiNumParImpar(agreoIndex) == "Par" ? "16" : "10") + "px'><td class='" + (DeterminaSiNumParImpar(agreoIndex) == "Par" ? "Gris_2" : "Gris_1") + "' style='color:White;width:100%;height:10px'> <div style='position: relative;margin-top:-13px;text-align: left;'><small>TOTAL </small></div></td></tr></table></pre>";
    $("#TdDefiniciones").html().replace($("#TdDefiniciones").html(), "");
    $("#TdDefiniciones").html(cadena);
}

var IndicePestaniaFuenteHabilitada = 0; var anteriorIdSelectPadres = ''; var objetoSelectAnteriorPadre = null;
function ExpandeCollapsaAcordeonVerticalFuente_Click(obj) {
    if (OpcionCargada == 'Rep' && objetoSelectA != null)
        CollapsarPestaniaFuente_AcordeonVerticalH(IndicePestaniaFuenteHabilitadaH, objetoSelectA);
    var id = $(obj).attr("id");
    var numero = parseInt(id.substring(2)) + 1;
    if (anteriorIdSelectPadres == $(obj).attr("id"))
        CollapsarPestaniaFuente_AcordeonVertical(numero, obj);
    else {
        if (anteriorIdSelectPadres == '')
            ExpandirPestaniaFuente_AcordeonVertical(numero, obj);
        else {
            if (anteriorIdSelectPadres != $(obj).attr("id")) {
                CollapsarPestaniaFuente_AcordeonVertical(IndicePestaniaFuenteHabilitada, objetoSelectAnteriorPadre);
                ExpandirPestaniaFuente_AcordeonVertical(numero, obj);
            }
        }
    }
    Encabezados.ReSizeEncabezados();
    setTimeout(Encabezados.ReSizeEncabezados, 10000)
}

function ExpandirPestaniaFuente_AcordeonVertical(numero, obj) {
    IndicePestaniaFuenteHabilitada = numero;
    anteriorIdSelectPadres = $(obj).attr("id");
    objetoSelectAnteriorPadre = obj;

    document.getElementById('TdImg' + numero).style.width = "15px";
    document.getElementById('TdImg' + numero).style.height = "10px";
    document.getElementById('TdImg' + numero).setAttribute('src', '../../Images/PanelDeControl/Expander/fAbajoG.png');
    if (document.getElementById('TdImgSigno' + numero) != null) document.getElementById('TdImgSigno' + numero).setAttribute('src', '../../Images/PanelDeControl/Expander/menos.png');
    $("#Tr" + numero).removeAttr("style");
    $("#Tr" + numero).animate({ opacity: '0.9', height: "100px" });
    $("#Tr" + numero).attr("style", "display: dock");
    VerificaTieneHijos("#Tr" + numero, numero + "T", "dock", numero + "H");
}

function CollapsarPestaniaFuente_AcordeonVertical(numero, obj) {

    document.getElementById('TdImg' + numero).style.width = "10px";
    document.getElementById('TdImg' + numero).style.height = "15px";

    document.getElementById('TdImg' + numero).setAttribute('src', '../../Images/PanelDeControl/Expander/fDerechaG.png');
    if (document.getElementById('TdImgSigno' + numero) != null) document.getElementById('TdImgSigno' + numero).setAttribute('src', '../../Images/PanelDeControl/Expander/mas.png');
    $("#Tr" + numero).removeAttr("style");
    $("#Tr" + numero).animate({ opacity: '0.9', height: "0px" });
    $("#Tr" + numero).attr("style", "display: none");
    anteriorIdSelectPadres = '';
    objetoSelectAnteriorPadre = null;
    IndicePestaniaFuenteHabilitada = 0;
    VerificaTieneHijos("#Tr" + numero, numero + "T", "none", numero + "H");
}

function VerificaTieneHijos(idItem, cadenaComp, opcionDespliegue, cadenaCompNo) {
    if ($(idItem).next().attr("id") != undefined && $(idItem).next().attr("id").substring(0, 3).indexOf(cadenaComp) != -1) {
        $($(idItem).next()).removeAttr("style");
        $($(idItem).next()).attr("style", "display: " + opcionDespliegue);
        VerificaTieneHijos("#" + $(idItem).next().attr("id"), cadenaComp, opcionDespliegue, cadenaCompNo);
    }
    else if ($(idItem).next().attr("id") != undefined && $(idItem).next().attr("id").substring(0, 3).indexOf(cadenaCompNo) != -1)
        VerificaTieneHijos("#" + $(idItem).next().attr("id"), cadenaComp, opcionDespliegue, cadenaCompNo);
}


var IndicePestaniaFuenteHabilitadaH = 0; var anteriorIdSelect = ''; var objetoSelectA = null;
function ExpandeCollapsaAcordeonVerticalFuenteH_Click(obj) {
    var cadenaIndice = '';
    for (var i = 0; i < $(obj).attr("id").length; i++) {
        if ($(obj).attr("id").charAt(i) != 'T')
            cadenaIndice += $(obj).attr("id").charAt(i);
        else if ($(obj).attr("id").charAt(i) == 'T')
            break;
    }
    var id = $(obj).attr("id");
    var numero = parseInt(cadenaIndice);
    if ($(obj).attr("id") == anteriorIdSelect)
        CollapsarPestaniaFuente_AcordeonVerticalH(numero, obj);
    else {
        if (anteriorIdSelect == '') { ExpandirPestaniaFuente_AcordeonVerticalH(numero, obj); }
        else {
            if ($(obj).attr("id") != anteriorIdSelect) {
                CollapsarPestaniaFuente_AcordeonVerticalH(IndicePestaniaFuenteHabilitadaH, objetoSelectA);
                ExpandirPestaniaFuente_AcordeonVerticalH(numero, obj);
            }
        }
    }
    Encabezados.ReSizeEncabezados();
    setTimeout(Encabezados.ReSizeEncabezados, 10000);
}

function ExpandirPestaniaFuente_AcordeonVerticalH(numero, obj) {
    anteriorIdSelect = $(obj).attr("id");
    IndicePestaniaFuenteHabilitadaH = numero;
    objetoSelectA = obj;
    document.getElementById('Img_' + anteriorIdSelect).style.width = "15px";
    document.getElementById('Img_' + anteriorIdSelect).style.height = "10px";
    document.getElementById('Img_' + anteriorIdSelect).setAttribute('src', '../../Images/PanelDeControl/Expander/fAbajoG.png');
    document.getElementById('ImgSigno_' + anteriorIdSelect).setAttribute('src', '../../Images/PanelDeControl/Expander/menos.png');
    if ($(obj).next().attr("style").indexOf('none') != -1) {
        $(obj).next().removeAttr("style");
        $(obj).next().animate({ opacity: '0.9', height: "23px" });
        $(obj).next().attr("style", "display: dock");
        VerificaTieneHijosH($(obj).next(), numero + "H", "dock");
    }
}

function CollapsarPestaniaFuente_AcordeonVerticalH(numero, obj) {
    document.getElementById('Img_' + anteriorIdSelect).style.width = "10px";
    document.getElementById('Img_' + anteriorIdSelect).style.height = "15px";
    document.getElementById('Img_' + anteriorIdSelect).setAttribute('src', '../../Images/PanelDeControl/Expander/fDerechaG.png');
    document.getElementById('ImgSigno_' + anteriorIdSelect).setAttribute('src', '../../Images/PanelDeControl/Expander/mas.png');
    anteriorIdSelect = '';
    IndicePestaniaFuenteHabilitadaH = 0;
    objetoSelectA = null;
    $(obj).next().removeAttr("style");
    $(obj).next().animate({ opacity: '0.9', height: "0px" });
    $(obj).next().attr("style", "display: none");
    VerificaTieneHijosH($(obj).next(), numero + "H", "none");
}

function VerificaTieneHijosH(idItem, cadenaComp, opcionDespliegue) {
    if ($(idItem).next().attr("id") != null && $(idItem).next().attr("id").substring(0, 3).indexOf(cadenaComp) != -1) {
        $(idItem).next().attr("style", "display: " + opcionDespliegue);
        VerificaTieneHijos($(idItem).next(), cadenaComp, opcionDespliegue);
    }
}


function CaseFasesAgregarControles(indiceOpcion, esLoad) {
    if (arrayJSON[0] == null || arrayJSON[0] == undefined) return;
    if ((IndicePestaniaHabilitada >= 0 && IndicePestaniaHabilitada <= 3) || (IndicePestaniaHabilitada >= 5 && IndicePestaniaHabilitada <= 6) || (IndicePestaniaHabilitada >= 8) && arregloFuenteIdTdControles.length > 0) {
        //  if (arregloFuenteIdTdControles != null || arregloFuenteIdTdControles.length != 0 || arregloFuenteIdTdControles != false) { 
        for (var x = 0; x < arrayJSON.length; x++) {
            var idnumtd = arregloFuenteIdTdControles[DevuelveIndiceDeElementoExistente(arrayJSON[x].FSId_Fuente, arregloFuenteIdTdControles)].split("&&")[1];
            document.getElementById("TdImgCandado_" + arrayJSON[x].FSId_Fuente) != null ? (document.getElementById("TdImgCandado_" + arrayJSON[x].FSId_Fuente).setAttribute('src', '../../Images/PanelDeControl/Candados/' + (arrayJSON[x].EstatusBloqueo == '0' ? 'candadoAA1.png' : 'candadoAC.png'))) : null;
            document.getElementById("TdImgCandado_" + arrayJSON[x].FSId_Fuente) != null ? (document.getElementById("TdImgCandado_" + arrayJSON[x].FSId_Fuente).setAttribute('title', (arrayJSON[x].EstatusBloqueo == '0' ? "Procesos Desbloqueados" : "Procesos Bloqueados"))) : null;
            document.getElementById("TdImgCandado_" + arrayJSON[x].FSId_Fuente) != null ? (arrayJSON[x].EstatusBloqueo == '0' ? $("#TdImgCandado_" + arrayJSON[x].FSId_Fuente).hide() : $("#TdImgCandado_" + arrayJSON[x].FSId_Fuente).show()) : null;
            switch (arrayJSON[x].FSId_Fuente) {
                case "1": //"ALNOVA":                                  
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "5": //"CREDIMAX":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "7": //"ARRMTO CRMX":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "9": //"MEDIOS DE PAGO":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "16": //"ARRMTO ALNOVA":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "2": //"ALNOVA COMP":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "3": //"COBRANZA":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "4": //"PROXIMAS FACTURAS":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "6": //"CREDIMAX COMP":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "8": //"ARRMTO CRMX COMP":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "10": //"CONTROL FITIRES":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "11": //"INDICES Y VALORES":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "12": //"PRIMAS":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "13": //"CONCILIACION":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "14": //"GENERAL ADICIONAL":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "15": //"RSVA ADICIONAL":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "17": //"SIC":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "18": //"GARANTIAS":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "19": //"CLIENTE ":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "20": //"CAPTACIÓN":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "21": //"BALANZA MENSUAL":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "22": //"R01":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "23": //"CLIENTE PAZ":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "24": //"CLIENTE UNICO":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;

                case "25": //"CLIENTE UNICO":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "26": //"CLIENTE UNICO":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "27": //"CLIENTE UNICO":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "28": //"CLIENTE UNICO":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "29": //"CLIENTE UNICO":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
                case "30": //"INSUMO RSK":
                    SwitchFase(esLoad, x, indiceOpcion, idnumtd, (parseInt(idnumtd) + 1).toString()); break;
            }
        }
        //}
    }
}



function SwitchFase(esLoad, x, indiceOpcion, numTdColor, numTdControles) {
    var indiceSumar = x < arrayJSON.length - 1 ? 1 : 0;
    var esUltimo = (x == arrayJSON.length - 1 ? true : false);

    if ((arrayJSON[x].Fuente == arrayJSON[x + indiceSumar].Fuente) && arrayJSON[x].Fase != 0 && !esUltimo) {
        switch (arrayJSON[x].Fase) {
            case "1": DeterminaControlesAgregadosAFuente(numTdColor + "Td1", numTdControles + "Td", "1", esLoad, x, IndicePestaniaHabilitadaO == 1 ? 0 : 1, arrayJSON[x].Rep, true); break;
            case "2": DeterminaControlesAgregadosAFuente(numTdColor + "Td2", numTdControles + "Td", "2", esLoad, x, IndicePestaniaHabilitadaO == 2 ? 0 : 1, arrayJSON[x].Rep, true); break;
            case "3": DeterminaControlesAgregadosAFuente(numTdColor + "Td3", numTdControles + "Td", "3", esLoad, x, IndicePestaniaHabilitadaO == 3 ? 0 : 1, arrayJSON[x].Rep, true); break;
            case "4": DeterminaControlesAgregadosAFuente(numTdColor + "Td4", numTdControles + "Td", "4", esLoad, x, IndicePestaniaHabilitadaO == 4 ? 0 : 1, arrayJSON[x].Rep, true); break;
            case "5": DeterminaControlesAgregadosAFuente(numTdColor + "Td5", numTdControles + "Td", "5", esLoad, x, IndicePestaniaHabilitadaO == 5 ? 0 : 1, arrayJSON[x].Rep, true); break;
            case "6": DeterminaControlesAgregadosAFuente(numTdColor + "Td6", numTdControles + "Td", "6", esLoad, x, IndicePestaniaHabilitadaO == 6 ? 0 : 1, arrayJSON[x].Rep, true); break;
            case "7": DeterminaControlesAgregadosAFuente(numTdColor + "Td7", numTdControles + "Td", "7", esLoad, x, IndicePestaniaHabilitadaO == 7 ? 0 : 1, arrayJSON[x].Rep, true); break;
            case "8": DeterminaControlesAgregadosAFuente(numTdColor + "Td8", numTdControles + "Td", "8", esLoad, x, IndicePestaniaHabilitadaO == 8 ? 0 : 1, arrayJSON[x].Rep, true); break;
            case "9": DeterminaControlesAgregadosAFuente(numTdColor + "Td9", numTdControles + "Td", "9", esLoad, x, IndicePestaniaHabilitadaO == 9 ? 0 : 1, arrayJSON[x].Rep, true); break;
        }
    }
    else {
        if (arrayJSON[x].Fase != 0) {
            DeterminaControlesAgregadosAFuente(numTdColor + "Td" + arrayJSON[x].Fase, numTdControles + "Td", arrayJSON[x].Fase, esLoad, x, IndicePestaniaHabilitadaO == arrayJSON[x].Fase ? 0 : 1, arrayJSON[x].Rep, true);
            for (var i = parseInt(arrayJSON[x].Fase) + 1; i <= 9; i++) {
                DeterminaControlesAgregadosAFuente(numTdColor + "Td" + i, numTdControles + "Td", i, esLoad, x, IndicePestaniaHabilitadaO == i ? 0 : 1, 0, true);
            }
        }
        else if (arrayJSON[x].Fase == 0) {
            for (var i = parseInt(arrayJSON[x].Fase) + 1; i <= 9; i++) {
                DeterminaControlesAgregadosAFuente(numTdColor + "Td" + i, numTdControles + "Td", i, esLoad, x, IndicePestaniaHabilitadaO == i ? 0 : 1, 0, false);
            }
        }
    }
}

function DeterminaControlesAgregadosAFuente(TdACambiarColor, TdCambiarControlesChildren, indiceCol, esLoad, x, indiceOpcion, reprocesos, tieneFases) {
    if (indiceOpcion == 0)
        AgregaControlesTdHijoStatus_Expandido(IndicePestaniaHabilitada, indiceCol + "_" + TdCambiarControlesChildren + "_" + arrayJSON[x].Fuente, arrayJSON[x].Rep, TdCambiarControlesChildren + indiceCol, TdACambiarColor, arrayJSON[x].FSId_Fuente, tieneFases, arrayJSON[x].EstatusBloqueo)
    else
        AgregaControlesTdHijoStatus_Collapsado(IndicePestaniaHabilitada, indiceCol + "_" + TdCambiarControlesChildren + "_" + arrayJSON[x].Fuente, arrayJSON[x].Rep, TdCambiarControlesChildren + indiceCol, TdACambiarColor);

    if (OpcionCargada == 'Carga') DeterminaColorTdFaseFuente(TdACambiarColor, indiceCol > 3 || (arrayJSON[x].FSId_Fuente > 11 && arrayJSON[x].FSId_Fuente < 16 && periocidadSelectXUser != "1") ? 8 : (indiceCol == arrayJSON[x].Fase ? arrayJSON[x].IdEstatus : 1), arrayJSON[x].FSId_Fuente);
}


function DeterminaColorTdFaseFuente(TdCambiar, IdEstatus, IdfuenteSelect) {
    switch (parseInt(IdEstatus)) {
        case 1: $("#" + TdCambiar).removeAttr("class"); $("#" + TdCambiar).attr("class", "EstatusGris");
            RestableceEstatusDivProgressB(TdCambiar);
            break;
        case 2: $("#" + TdCambiar).removeAttr("class"); $("#" + TdCambiar).attr("class", "EstatusAmarillo");
            if (IdfuenteSelect < 12 || IdfuenteSelect > 15) MostrarProgressBarFases(TdCambiar, IdfuenteSelect);
            break;
        case 3: $("#" + TdCambiar).removeAttr("class"); $("#" + TdCambiar).attr("class", "EstatusRojo");
            RestableceEstatusDivProgressB(TdCambiar);
            break;
        case 4: $("#" + TdCambiar).removeAttr("class"); $("#" + TdCambiar).attr("class", "EstatusNaranja");
            RestableceEstatusDivProgressB(TdCambiar);
            break;
        case 5: $("#" + TdCambiar).removeAttr("class"); $("#" + TdCambiar).attr("class", "EstatusVerde");
            RestableceEstatusDivProgressB(TdCambiar);
            break;
        case 6: $("#" + TdCambiar).removeAttr("class"); $("#" + TdCambiar).attr("class", "EstatusAzul");
            RestableceEstatusDivProgressB(TdCambiar);
            break;
        case 7: $("#" + TdCambiar).removeAttr("class"); $("#" + TdCambiar).attr("class", "EstatusMorado");
            RestableceEstatusDivProgressB(TdCambiar);
            break;
        case 8: $("#" + TdCambiar).removeAttr("class"); $("#" + TdCambiar).attr("class", "EstatusBlanco");
            RestableceEstatusDivProgressB(TdCambiar);
            break;
        case 9: $("#" + TdCambiar).removeAttr("class"); $("#" + TdCambiar).attr("class", "EstatusNegro");
            RestableceEstatusDivProgressB(TdCambiar);
            break;
    }
}

function RestableceEstatusDivProgressB(TdCambiar) {
    $("#div" + TdCambiar).removeAttr("lang");
    if (document.getElementById("div" + TdCambiar) != null) document.getElementById("div" + TdCambiar).style.width = "0%";
    if (document.getElementById("div" + TdCambiar + "_txt") != null) document.getElementById("div" + TdCambiar + "_txt").innerHTML = "0% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>";
    $("#div" + TdCambiar).hide();
    $("#div" + TdCambiar + "_txt").hide();
}

function MostrarProgressBarFases(TdCambiar, IdfuenteSelect) {
    if (TdCambiar.substring(TdCambiar.length - 1) == "1" && ($("#div" + TdCambiar).attr("lang") == undefined || $("#div" + TdCambiar).attr("lang") == "aa") && OpcionCargada == 'Carga') {
        $("#div" + TdCambiar).show();
        $("#div" + TdCambiar + "_txt").show();
        $("#div" + TdCambiar).attr("lang", "ab");
        ProgressBarArrmto(0, 0.2, TdCambiar, IdfuenteSelect, true, false, false);
        if (document.getElementById("btn_" + TdCambiar + "_Nuevo") != null)
            $(document.getElementById("btn_" + TdCambiar + "_Nuevo")).attr("disabled", "disabled");

    }
}

var arrayNombresRutasfiles = new Array(); var indexRutaName = 1;
function ObtieneRutasYNombresArchivos(esReload) {
    if ((indexRutaName == 1 || indexRutaName == 2 || indexRutaName == 9 || indexRutaName == 11 || indexRutaName == 16 || indexRutaName == 4 || indexRutaName == 3 || indexRutaName == 17 || indexRutaName == 18 || indexRutaName == 19 || indexRutaName == 20 || indexRutaName == 21 || indexRutaName == 23 || indexRutaName == 24 || indexRutaName == 30) && indexRutaName <= 30) {
        var parametros = { IdFuente: indexRutaName, idPais: PaisSelectXUser };
        peticionAjax('PanelDeControl.aspx/ObtieneSPRutaFileCalfInsumos',
                                    "POST", parametros,
                                    function Finalizada_SPRutaFileCalfInsumos(dataG) {
                                        if (dataG.d != "") {
                                            var p = dataG.d.toString().replace('{', '').replace('}', '').split(',')[0].split(':')[1].replace('"', '').replace('"', '')
                                            if (p != "rcc")
                                                arrayNombresRutasfiles.push(dataG.d.toString().replace('{', '').replace('}', '').split(',')[1].split(':')[1].replace('"', '').replace('"', '') + "||" + dataG.d.toString().replace('{', '').replace('}', '').split(',')[0].split(':')[1].replace('"', '').replace('"', '') + "&&&" + (indexRutaName != 11 ? fechaP.split(',')[0].substring(2) + fechaP.split(',')[1] + fechaP.split(',')[2] : ""));
                                            else if (indexRutaName == "4") {
                                                var fechaProxFact = sumaFecha(2, fechaP.split(',')[2] + '/' + fechaP.split(',')[1] + '/' + fechaP.split(',')[0])
                                                arrayNombresRutasfiles.push(dataG.d.toString().replace('{', '').replace('}', '').split(',')[1].split(':')[1].replace('"', '').replace('"', '') + "||" + dataG.d.toString().replace('{', '').replace('}', '').split(',')[0].split(':')[1].replace('"', '').replace('"', '') + "&&&" + (indexRutaName != 11 ? fechaP.split(',')[2] + '/' + fechaP.split(',')[1] + '/' + fechaP.split(',')[0] + ".txt" : ""));
                                            }
                                            else
                                                arrayNombresRutasfiles.push(dataG.d.toString().replace('{', '').replace('}', '').split(',')[1].split(':')[1].replace('"', '').replace('"', '') + "||" + dataG.d.toString().replace('{', '').replace('}', '').split(',')[0].split(':')[1].replace('"', '').replace('"', '') + "&&&" + (indexRutaName != 11 ? fechaP.split(',')[0] + fechaP.split(',')[1] + fechaP.split(',')[2] : ""));
                                        } else
                                            arrayNombresRutasfiles.push("||" + "&&&" + (indexRutaName != 11 ? fechaP.split(',')[0].substring(2) + fechaP.split(',')[1] + fechaP.split(',')[2] : ""));
                                        indexRutaName++;
                                        ObtieneRutasYNombresArchivos(esReload);
                                    }, null);
    }
    else if (indexRutaName <= 30) {
        arrayNombresRutasfiles.push("");
        //alert(indexRutaName + "aa" + Definiciones.length);
        if (indexRutaName == Definiciones.length)
            CaseFasesAgregarControles(1, true);
        indexRutaName++;
        ObtieneRutasYNombresArchivos(esReload);
    }
}

function sumaFecha(d, fecha) {
    var Fecha = new Date();
    var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear());

    var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
    var aFecha = sFecha.split(sep);

    var dias = d || 0;

    var fFecha = Date.UTC(aFecha[2], aFecha[1], aFecha[0]) + (86400000 * dias); // 86400000 son los milisegundos que tiene un día

    var fechaFinal = new Date(fFecha);

    var anno = fechaFinal.getFullYear();
    var mes = fechaFinal.getMonth();
    var dia = fechaFinal.getDate();
    var mes = (mes < 10) ? ("0" + mes) : mes;
    var dia = (dia < 10) ? ("0" + dia) : dia;
    var fechaFinal = dia + sep + mes + sep + anno;

    return (fechaFinal);
}


function AgregaControlesTdHijoStatus_Collapsado(indicePestania, IdItemSelect, numeroBotonesRep, IdTr, IdButtonNew) {
    if ($("#TablaContenidoCollapsed_" + IdTr).html() == null) {
        var indicePestaniaOtra = indicePestania == 0 ? IdTr.substring(3) : indicePestania;
        indicePestaniaOtra = indicePestaniaOtra.indexOf("d") != -1 ? indicePestaniaOtra.substring(1) : indicePestaniaOtra;
        var cadena = "<div id='divContenedor_" + IdTr + "' lang='aa' style='width:100%;height:100%'><table id='TablaContenidoCollapsed_" + IdTr + "' style='display: none;'>";
        cadena += "<tr><td><div class='BtnReproceso'><div class='TxtBtnReproceso'>" + numeroBotonesRep + "</div> </div></td></tr>";
        cadena += "</table></div>";
        $("#" + IdTr).html(cadena);
    }
    else {
        var cadena = "<tr><td><div class='BtnReproceso'><div class='TxtBtnReproceso'>" + numeroBotonesRep + "</div> </div></td></tr>";
        $("#TablaContenidoCollapsed_" + IdTr).html(cadena);
    }

    $("#TablaContenidoCollapsed_" + IdTr).show();
    $("#TablaContenidoExpanded_" + IdTr).hide();

}
function AgregaControlesTdHijoStatus_Expandido(indicePestania, IdItemSelect, numeroBotonesRep, IdTr, IdButtonNew, Idfuente, tieneFases, estatusBloqueo) {
    if (escargaNew && document.getElementById("divContenedor_" + IdTr) == null) {
        var cadena = "<div id='divContenedor_" + IdTr + "' lang='aa' style='width:100%;height:100%'></div>";
        $("#" + IdTr).html(cadena);
    }
    if ($("#divContenedor_" + IdTr).attr('lang') == 'aa' || escargaNew) {
        $("#divContenedor_" + IdTr).attr('lang', 'ab');
        $('#trMiniAcordeon').html();
        var cadena = "<table style='width:100%;height:100%;'><tr id='trMiniAcordeon' style='width:100%;height:100%;'> <td id='TdEncabezado_" + IdTr + "_1' lang='aa' style='width:5%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitada >= 0 && IndicePestaniaHabilitada <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitada >= 4 && IndicePestaniaHabilitada <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'> <p class='p' style='margin-top: 28px;font-size: 9px;margin-left: 14px;'> " + (IndicePestaniaHabilitada == 1 ? "CTRL DE CARGA" : "DETALLE") + "</p></td><td id='TdContenido_" + IdTr + "_1' class='Gris_Gde' style='width:80px;height:100%;'><div style='height:100%;overflow-y:auto;overflow-x: hidden;'>";
        cadena += "<table id='TablaContenidoExpanded_" + IdTr + "' style='display: none;width:100%;' width='0' border='0'><tr><td><div style='width:320px;height:auto; overflow:auto;'><table width='0' border='0' id='TablaBotonesExpanded_" + IdTr + "' ><tr>";
        switch (Idfuente) {
            case "1": /*"ALNOVA"***************/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 1, /*agregarBtnsReprocesos**/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/ true, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Descarga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "2": /*"ALNOVA COMP"**********/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 2, /*agregarBtnsReprocesos**/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/ true, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Descarga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "3": /*"COBRANZA"*************/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 3, /*agregarBtnsReprocesos**/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga",    "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "4": /*"PROXIMAS FACTURAS"****/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 4, /*agregarBtnsReprocesos**/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/ true, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Descarga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "5": /*"CREDIMAX"*************/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 5, /*agregarBtnsReprocesos**/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /**agregarChkXSucursal*/true, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Descarga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "6": /*"CREDIMAX COMP"********/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 6, /*agregarBtnsReprocesos**/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /**agregarChkXSucursal*/true, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Descarga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "7": /*"ARRMTO CRMX"**********/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 7, /*agregarBtnsReprocesos**/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /**agregarChkXSucursal*/true, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Descarga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "8": /*"ARRMTO CRMX COMP"*****/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 8, /*agregarBtnsReprocesos**/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /**agregarChkXSucursal*/true, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Descarga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "9": /*"MEDIOS DE PAGO"*******/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 9, /*agregarBtnsReprocesos**/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /**agregarTxtRutaNombre*/true, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Descarga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "10": /*"CONTROL FITIRES"*****/break;
            case "11": /*"INDICES Y VALORES"***/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 11, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/ true, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Descarga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "12": /*"PRIMAS"**************/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 12, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga",    "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "13": /*"CONCILIACION"********/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 13, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga",    "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "14": /*"GENERAL ADICIONAL"***/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 14, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga",    "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "15": /*"RSVA ADICIONAL"******/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 15, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga",    "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "16": /*"ARRMTO ALNOVA"*******/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 16, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/ true, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Descarga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "17": /*"SIC"*****************/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 17, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga",    "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "18": /*"GARANTIAS"***********/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 18, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/ true, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga",    "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "19": /*"CLIENTES"************/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 19, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/ true, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga",    "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "20": /*"CAPTACIÓN"***********/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 20, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/ true, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga",    "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "21": /*"BALANZA MENSUAL"*****/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 21, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga",    "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "22": /*"R01            "*****/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 22, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga",    "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "23": /*"CLIENTE PAZ    "*****/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 23, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/true, false, false, false, false, false, false, /*agregarBtnVarios */true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "24": /*"CLIENTE UNICO  "*****/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 24, /*agregarBtnsReprocesos*/false, false, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios */true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "25": /*"EMPLEADOS     "*****/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 25, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "26": /*"BLOQUEOS PLD  "*****/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 26, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "27": /*"FIDEICOMISOS  "*****/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 27, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "28":/*"BLOQUEOS OPERACIONES*/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 28, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "29": /*"CTAS LITIGIO  "*****/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 29, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
            case "30": /*"INSUMO RSK    "*****/cadena += CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, Idfuente, 30, /*agregarBtnsReprocesos*/true, true, true, false, false, false, false, /*agregarBtnNuevo*/false, false, false, false, false, false, false, /*agregarCmbReporteria*/false, false, false, false, false, false, true, /*agregarChkXSucursal*/false, false, false, false, false, false, false, /*agregarTxtRutaNombre*/false, false, false, false, false, false, false, /*agregarBtnVarios*/true, false, false, false, false, false, false, /*txtValue*/"Iniciar Carga", "Incidencias", "Incidencias", "Procesar", "Incidencias", "Incidencias", "", /*agregarBtnReporte*/false, false, false, true, false, false, false, tieneFases); break;
        }
        cadena += "</table></td></tr></table></div></td>";
        if (IndicePestaniaHabilitada == 1) {
            if (Idfuente == 22 || Idfuente == 25 || Idfuente == 26 || Idfuente == 27 || Idfuente == 28 || Idfuente == 29) /* R01  */ {
                cadena += "     <td id='TdEncabezado_" + IdTr + "_2' lang='ab' style='width:3%;height:100%;cursor: pointer;' class='AcordeonAzul_1' onclick='SubAcordeon_Click(this);'>";
                cadena += "         <p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'> CEDULA DE CARGA</p>";
                cadena += "     </td>";
                cadena += "     <td id='TdContenido_" + IdTr + "_2' class='Gris_Gde' style='width:0%;height:100%;'>";
                cadena += "        <input type='button' id='btnCedula_" + IdItemSelect + "%%%" + Idfuente + "' class='classButtonDis' value='Cédula de Carga' onclick='btnCargaCedula_Click(this)'/>";
                cadena += "     </td>";
                cadena += "     <td id='TdEncabezado_" + IdTr + "_3' lang='ab' style='width:3%; height:100%; cursor: pointer;' class='AcordeonAzul_1' onclick='SubAcordeon_Click(this);'> ";
                cadena += "         <p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'> DETENER</p>";
                cadena += "     </td>";
                cadena += "     <td id='TdContenido_" + IdTr + "_3' class='Gris_Gde' style='width:0%;height:100%;'>";
                cadena += "         <input type='button' id='btnDetenerJob_" + IdItemSelect + "%%%" + Idfuente + "%%%" + IdButtonNew + "' class='classButtonDis' value='Detener' onclick='btnDetenerDescarga_Click(this)'/>";
                cadena += "     </td>";

                if (PerfilUser == "19")
                {
                    cadena += " <td id='TdEncabezado_" + IdTr + "_4' lang='ab' style='width:3%;height:100%;cursor: pointer;' class='AcordeonAzul_1' onclick='SubAcordeon_Click(this);'>";
                    cadena += "     <p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'> CERRAR PROCESOS</p>";
                    cadena += " </td>";
                    cadena += " <td id='TdContenido_" + IdTr + "_4' class='Gris_Gde' style='width:0%;height:100%;'>";
                    cadena += "     <input type='button' lang='" + IdItemSelect.split('_')[2] + "_" + IdButtonNew + "' alt='" + IdTr + "_" + estatusBloqueo + "' id='btnCerrarProceso_" + Idfuente + "' class='classButtonDis' value='" + (estatusBloqueo == "0" ? "Cerrar" : "Abrir") + " Proceso' onclick='return CerrarCandadoProceso_Click(event,this);'/>";
                    cadena += " </td>";
                }
            }
            else {
                cadena += "<td id='TdEncabezado_" + IdTr + "_2' lang='ab' style='width:3%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitada >= 0 && IndicePestaniaHabilitada <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitada >= 4 && IndicePestaniaHabilitada <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'><p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'> CEDULA DE CARGA</p></td><td id='TdContenido_" + IdTr + "_2' class='Gris_Gde' style='width:0%;height:100%;'><input type='button' id='btnCedula_" + IdItemSelect + "%%%" + Idfuente + "' class='classButton' value='Cédula de Carga' onclick='btnCargaCedula_Click(this)'/></td>";
                if (Idfuente != "12" && Idfuente != "13" && Idfuente != "14" && Idfuente != "15" && Idfuente != "17") cadena += "<td id='TdEncabezado_" + IdTr + "_3' lang='ab' style='width:3%;height:100%;cursor: pointer;' class='" + (IndicePestaniaHabilitada >= 0 && IndicePestaniaHabilitada <= 3 ? "AcordeonAzul_1" : (IndicePestaniaHabilitada >= 4 && IndicePestaniaHabilitada <= 6 ? "AcordeonAmarillo_1" : "AcordeonNaranja_1")) + "'  onclick='SubAcordeon_Click(this);'><p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'> DETENER</p></td><td id='TdContenido_" + IdTr + "_3' class='Gris_Gde' style='width:0%;height:100%;'><input type='button' id='btnDetenerJob_" + IdItemSelect + "%%%" + Idfuente + "%%%" + IdButtonNew + "' class='classButton' value='Detener' onclick='btnDetenerDescarga_Click(this)'/></td>";
                if (IndicePestaniaHabilitada == 1 /*&& periocidadSelectXUser == 1 */ && (PerfilUser == "19" /*|| PerfilUser == "3"*/)) cadena += "<td id='TdEncabezado_" + IdTr + "_4' lang='ab' style='width:3%;height:100%;cursor: pointer;' class='AcordeonAzul_1' onclick='SubAcordeon_Click(this);'><p class='p' style='margin-top: 26px;font-size: 9px;margin-left: 14px;'> CERRAR PROCESOS</p></td><td id='TdContenido_" + IdTr + "_4' class='Gris_Gde' style='width:0%;height:100%;'><input type='button' lang='" + IdItemSelect.split('_')[2] + "_" + IdButtonNew + "' alt='" + IdTr + "_" + estatusBloqueo + "' id='btnCerrarProceso_" + Idfuente + "' class='classButton' value='" + (estatusBloqueo == "0" ? "Cerrar" : "Abrir") + " Proceso' onclick='return CerrarCandadoProceso_Click(event,this);'/></td>";
            }
        }
        cadena += "</tr></table> ";
        document.getElementById("divContenedor_" + IdTr).innerHTML = cadena;
        $("#TablaContenidoExpanded_" + IdTr).show();
        $("#TdContenido_" + IdTr + "_2").hide();
        $("#TdContenido_" + IdTr + "_3").hide();
        $("#TdContenido_" + IdTr + "_4").hide();
    }
    else {
        if (document.getElementById("TablaBotonesExpanded_" + IdTr) != null && IndicePestaniaHabilitada >= 1 && IndicePestaniaHabilitada <= 3) {
            var cadena = "<tr>";
            for (var i = numeroBotonesRep; i >= 0; i--) {
              if (tieneFases) cadena += "<td > <div class='BtnReproceso' id='btn_" + IdItemSelect + "&&&" + Idfuente + "_" + i + "' onclick='HistorialReprocesos_Click(this);'><div class='TxtBtnReproceso'>" + i + "</div> </div></td>";
            }
            cadena += "</tr>";
            $("#TablaBotonesExpanded_" + IdTr).html(cadena);
        }
    }
    $("#TablaContenidoCollapsed_" + IdTr).hide();
    $("#btnCerrarProceso_" + Idfuente).attr("alt", IdTr + "_" + estatusBloqueo);

    if (((estatusBloqueo == "0" && PerfilUser != "35" && PerfilUser != "17") || (Idfuente == 17 && (PerfilUser == "35" || PerfilUser == "17") && estatusBloqueo == "0")) && $("#" + IdButtonNew).attr("class") != "EstatusBlanco") {
        $("#btnCerrarProceso_" + Idfuente).attr("value", "Cerrar Proceso");
        $('#TdContenido_' + IdTr + "_3").find('input:button').removeAttr("disabled");
        $('#TdContenido_' + IdTr + "_3").find('input:button').attr('class', 'classButton');

        var arreglodeBotones = $('#TablaContenidoExpanded_' + IdTr).find('input:button');
        for (var i = 0; i < arreglodeBotones.length; i++) {
            if ($(arreglodeBotones[i]).attr("value").toLowerCase().indexOf("carga") != -1 && $(arreglodeBotones[i]).attr("value").toLowerCase().indexOf("archivo") == -1) {
                $(arreglodeBotones[i]).removeAttr("disabled");
                $(arreglodeBotones[i]).attr('class', 'classButton');
            }
        }
        $('#TablaContenidoExpanded_' + IdTr).find('input:checkbox').removeAttr("disabled");
    }
    else {
        $("#btnCerrarProceso_" + Idfuente).attr("value", "Abrir Proceso");
        $('#TdContenido_' + IdTr + "_3").find('input:button').attr("disabled", true);
        $('#TdContenido_' + IdTr + "_3").find('input:button').attr('class', 'classButtonDis');

        var arreglodeBotones = $('#TablaContenidoExpanded_' + IdTr).find('input:button');
        for (var i = 0; i < arreglodeBotones.length; i++) {
            if ($(arreglodeBotones[i]).attr("value").toLowerCase().indexOf("carga") != -1 && $(arreglodeBotones[i]).attr("value").toLowerCase().indexOf("archivo") == -1) {
                $(arreglodeBotones[i]).attr("disabled", true);
                $(arreglodeBotones[i]).attr('class', 'classButtonDis');
            }
        }
        $('#TablaContenidoExpanded_' + IdTr).find('input:checkbox').attr("disabled", true);
    }
}

function almacenaDragAndDropR01()
{
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('PanelDeControl.aspx/validaDragAndDropR01', "POST", { },
        function (data) {
            if (data.d.indexOf("Subir") == 0) {
                alertify.confirm('Se almacenará el archivo, ¿Desea continuar?', function (e) {
                    if (e) {
                        Waiting(false, "Cargando Información...");
                        peticionAjax('PanelDeControl.aspx/almacenaDragAndDropR01', "POST", { dia: $("#dpFechaPeriodoGral").val().split('/')[2] + $("#dpFechaPeriodoGral").val().split('/')[1] + $("#dpFechaPeriodoGral").val().split('/')[0] },
                            function (data) {
                                if (data.d == "OK") {
                                    alertify.success("Se creo el registro satisfactoriamente.");
                                }
                                else if (data.d == "ERROR-DIA") {
                                    alertify.success("Las fecha de corte no coincide con las fechas del documento...!");
                                }
                                else if (data.d.indexOf("ERROR-NULL") == 11) {
                                    alertify.success("El archivo contiene campos con valor NULL, por lo que no es posible almacenar la información");
                                }
                                else if (data.d.indexOf("ERROR-NUMEROCOLUMNAS") == 11) {
                                    alertify.success("El archivo contiene un número de columnas diferentes...!");
                                }
                                else {
                                    alertify.success("No se pudo crear el registro, vuelva a intentarlo. " + data.d);
                                }
                            }, null);
                    }
                    else {
                        Waiting(false, "Cargando Información...");
                    }
                });
            }
            else if (data.d.indexOf("Extencion") == 0) {
                alertify.Comentario('El tipo de archivo no es el correcto, debe ser .xls o .xlsx', function (e) { });
                Waiting(false, "Cargando Información...");
            }
        }, null);
}

function CerrarCandadoProceso_Click(event, obj) {
    if ($("#" + $(obj).attr("lang").split("_")[1]).attr("class") == "EstatusBlanco") {
        MostrarMsj("No es posible " + ($(obj).attr("alt").split("_")[1] == "1" ? "DESBLOQUEAR" : "BLOQUEAR") + "</span> los procesos de <span style='font-weight:bold'>" + $(obj).attr("lang").split("_")[0] + ". Estatus NO APLICA", " AVISO " + $(obj).attr("lang").split("_")[0], false, true, false, "", "Aceptar", "", 320, 120, null, null, null);
        return;
    }
    MostrarMsj("¿Desea <span style='font-weight:bold'>" + ($(obj).attr("alt").split("_")[1] == "1" ? "DESBLOQUEAR" : "BLOQUEAR") + "</span> los procesos de <span style='font-weight:bold'>" + $(obj).attr("lang").split("_")[0] + "</span>?", "Mensaje", true, true, false, "Si", "No", "", 300, 128,
        function () {
            $("#divVentanaMensajes").dialog("close");
            Waiting(true, "Espere por favor. Cargando Información...");
            peticionAjax("PanelDeControl.aspx/ModificaEstatusBloqueoProceso", "POST", { opcion: "1", idPais: PaisSelectXUser, fechaPeriodo: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], idFuente: $(obj).attr("id").split("_")[1], idEtapa: (OpcionCargada == 'Carga' ? "1" : (OpcionCargada == 'Met' ? "2" : "3")), periodicidad: periocidadSelectXUser, usuario: userLogin },
         function (dataC) {
             Waiting(false, "Espere por favor. Cargando Información...");
             $(obj).attr("value", ($(obj).attr("alt").split("_")[1] == "1" ? "Cerrar Proceso" : "Abrir Proceso"));
             document.getElementById("TdImgCandado_" + $(obj).attr("id").split("_")[1]) != null ? ($(obj).attr("alt").split("_")[1] == "1" ? $("#TdImgCandado_" + $(obj).attr("id").split("_")[1]).hide() : $("#TdImgCandado_" + $(obj).attr("id").split("_")[1]).show()) : null;
             document.getElementById("TdImgCandado_" + $(obj).attr("id").split("_")[1]) != null ? (document.getElementById("TdImgCandado_" + $(obj).attr("id").split("_")[1]).setAttribute('src', '../../Images/PanelDeControl/Candados/' + ($(obj).attr("alt").split("_")[1] == "1" ? 'candadoAA1.png' : 'candadoAC.png'))) : null;
             document.getElementById("TdImgCandado_" + $(obj).attr("id").split("_")[1]) != null ? (document.getElementById("TdImgCandado_" + $(obj).attr("id").split("_")[1]).setAttribute('title', ($(obj).attr("alt").split("_")[1] == "1" ? 'Procesos Desbloqueados' : 'Procesos Bloqueados'))) : null;
             if ($(obj).attr("alt").split("_")[1] == "1") {
                 $('#TdContenido_' + $(obj).attr("alt").split("_")[0] + (OpcionCargada == "Carga" ? "_3" : "_1")).find('input:checkbox').removeAttr("disabled");
                 $('#TdContenido_' + $(obj).attr("alt").split("_")[0] + (OpcionCargada == "Carga" ? "_3" : "_1")).find('input:button').removeAttr("disabled");
                 $('#TdContenido_' + $(obj).attr("alt").split("_")[0] + (OpcionCargada == "Carga" ? "_3" : "_1")).find('input:button').attr('class', 'classButton');

                 if (OpcionCargada == "Carga") {
                     var arreglodeBotones = $('#TablaContenidoExpanded_' + $(obj).attr("alt").split("_")[0]).find('input:button');
                     for (var i = 0; i < arreglodeBotones.length; i++) {
                         if ($(arreglodeBotones[i]).attr("value").toLowerCase().indexOf("carga") != -1 && $(arreglodeBotones[i]).attr("value").toLowerCase().indexOf("archivo") == -1) {
                             $(arreglodeBotones[i]).removeAttr("disabled");
                             $(arreglodeBotones[i]).attr('class', 'classButton');
                         }
                     }
                 }
                 OpcionCargada == "Carga" ? $('#TablaContenidoExpanded_' + $(obj).attr("alt").split("_")[0]).find('input:checkbox').removeAttr("disabled") : null;
             }
             else {
                 $('#TdContenido_' + $(obj).attr("alt").split("_")[0] + (OpcionCargada == "Carga" ? "_3" : "_1")).find('input:button').attr("disabled", true);
                 $('#TdContenido_' + $(obj).attr("alt").split("_")[0] + (OpcionCargada == "Carga" ? "_3" : "_1")).find('input:button').attr('class', 'classButtonDis');

                 if (OpcionCargada == "Carga") {
                     var arreglodeBotones = $('#TablaContenidoExpanded_' + $(obj).attr("alt").split("_")[0]).find('input:button');
                     for (var i = 0; i < arreglodeBotones.length; i++) {
                         if ($(arreglodeBotones[i]).attr("value").toLowerCase().indexOf("carga") != -1 && $(arreglodeBotones[i]).attr("value").toLowerCase().indexOf("archivo") == -1) {
                             $(arreglodeBotones[i]).attr("disabled", true);
                             $(arreglodeBotones[i]).attr('class', 'classButtonDis');
                         }
                     }
                 }
                 OpcionCargada == "Carga" ? $('#TablaContenidoExpanded_' + $(obj).attr("alt").split("_")[0]).find('input:checkbox').attr("disabled", true) : null;

             }
             $(obj).attr("alt", $(obj).attr("alt").split("_")[0] + "_" + ($(obj).attr("alt").split("_")[1] == "1" ? "0" : "1"));
         }, null);
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
}

function btnDetenerDescarga_Click(obj) {
    var id = $(obj).attr("id");
    switch ($(obj).attr("id").split("_")[3].split("%%%")[1]) {
        case "1": /*"ALNOVA"             */DetieneJobDescarga(1, obj); break;
        case "5": /*"CREDIMAX"           */DetieneJobDescarga(5, obj); break;
        case "7": /*"ARRMTO CRMX"        */DetieneJobDescarga(7, obj); break;
        case "9": /*"MEDIOS DE PAGO"     */DetieneJobDescarga(9, obj); break;
        case "16": /*"ARRMTO ALNOVA"     */DetieneJobDescarga(16, obj); break;
        case "2": /*"ALNOVA COMP"        */DetieneJobDescarga(2, obj); break;
        case "3": /*"COBRANZA"           */DetieneJobDescarga(3, obj); break;
        case "4": /*"PROXIMAS FACTURAS"  */DetieneJobDescarga(4, obj); break;
        case "6": /*"CREDIMAX COMP"      */DetieneJobDescarga(6, obj); break;
        case "8": /*"ARRMTO CRMX COMP"   */DetieneJobDescarga(8, obj); break;
        case "11": /*"INDICES Y VALORES" */DetieneJobDescarga(11, obj); break;
        case "17": /*"SIC"               */DetieneJobDescarga(17, obj); break;
        case "18": /*"GARANTIAS"         */DetieneJobDescarga(18, obj); break;
        case "19": /*"CLIENTES"          */DetieneJobDescarga(19, obj); break;
        case "20": /*"CAPTACIÓN"         */DetieneJobDescarga(20, obj); break;
        case "21": /*"BALANZA"           */DetieneJobDescarga(21, obj); break;
        case "22": /*"R01"               */DetieneJobDescarga(22, obj); break;
        case "23": /*"CLIENTE PAZ"       */DetieneJobDescarga(23, obj); break;
        case "24": /*"CLIENTE UNICO"     */DetieneJobDescarga(24, obj); break;
    }
}

var entroDetener = false;
function DetieneJobDescarga(IdFuenteObt, obj) {
    var conexion = IdFuenteObt == 1 || IdFuenteObt == 2 || IdFuenteObt == 3 || IdFuenteObt == 4 || IdFuenteObt == 9 || IdFuenteObt == 11 || IdFuenteObt == 16 || IdFuenteObt == 19 || IdFuenteObt == 20 || IdFuenteObt == 21 ? "164" : (IdFuenteObt == 5 || IdFuenteObt == 6 || IdFuenteObt == 7 || IdFuenteObt == 8 ? "65" : "");
    var indiceTdAgregar = ""; var IdTd = $(obj).attr("id").split("_")[2];
    for (var a = 0; a < IdTd.length; a++) {
        if (IdTd[a] != "T" && IdTd[a] != "d")
            indiceTdAgregar += IdTd[a];
        else
            break;
    }
    if ($("#" + (parseInt(indiceTdAgregar) - 1) + "Td" + 1).attr("class") != "EstatusAmarillo") { MostrarMsj("No es posible detener la descarga de " + $(obj).attr("id").split("_")[3].split("%%%")[0] + ".", " AVISO " + $(obj).attr("id").split("_")[3].split("%%%")[0], false, true, false, "", "Aceptar", "", 320, 120, null, null, null); return; }
    if (entroDetener) { MostrarMsj("Espere por favor. El proceso " + $(obj).attr("id").split("_")[3].split("%%%")[0] + " se esta deteniendo.", " AVISO " + $(obj).attr("id").split("_")[3].split("%%%")[0], false, true, false, "", "Aceptar", "", 320, 120, null, null, null); return; }
    entroDetener = true;
    Waiting(true, "Cargando Información...");
    var parametrosDetenerJobACTIVO = { idFuente: IdFuenteObt, Tipoconexion: conexion, idPais: PaisSelectXUser };
    peticionAjax("PanelDeControl.aspx/DetenerJobDescargas", "POST", parametrosDetenerJobACTIVO,
                function DetenerJobDescargas_Finish(data) {
                    if (data.d == "0") {
                        Waiting(false, "Cargando Información...");
                        MostrarMsj("Aún no inicia el proceso de descarga " + $(obj).attr("id").split("_")[3].split("%%%")[0] + ".", " AVISO " + $(obj).attr("id").split("_")[3].split("%%%")[0], true, true, false, "Reintentar", "Aceptar", "", 320, 120, function () { DetieneJobDescarga(IdFuenteObt, obj); $("#divVentanaMensajes").dialog("close"); }, function () { $("#divVentanaMensajes").dialog("close"); }, null);
                        entroDetener = false;
                    }
                    else {
                        var parametrosAddIndicadoresDetenerJobACTIVO = { fechaCorte: fechaP.split(',')[0] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[2], idFuente: IdFuenteObt, periodicidad: periocidadSelectXUser, user: userLogin, idPais: PaisSelectXUser };
                        peticionAjax("PanelDeControl.aspx/AgregarIndicadoresDetenerJobDescargas", "POST", parametrosAddIndicadoresDetenerJobACTIVO,
                        function AgregarIndicadoresDetenerJobDescargas_Finish() {
                            Waiting(false, "Cargando Información...");
                            entroDetener = false;
                        }, null);
                    }
                }, null);
}

function btnCargaCedula_Click(obj) {
    var idFuenteCedula = $(obj).attr("id").split("_")[3].split("%%%")[1];
    switch ($(obj).attr("id").split("_")[3].split("%%%")[1]) {
        case "1": /*"ALNOVA"               */
        case "5": /*"CREDIMAX"             */
        case "7": /*"ARRMTO CRMX"          */
        case "9": /*"MEDIOS DE PAGO"       */
        case "2": /*"ALNOVA COMP"          */
        case "3": /*"COBRANZA"             */
        case "4": /*"PROXIMAS FACTURAS"    */
        case "6": /*"CREDIMAX COMP"        */
        case "8": /*"ARRMTO CRMX COMP"     */
        case "10": /*"CONTROL FITIRES"     */
        case "11": /*"INDICES Y VALORES"   */
        case "12": /*"PRIMAS"              */
        case "13": /*"CONCILIACION"        */
        case "14": /*"GENERAL ADICIONAL"   */
        case "15": /*"RSVA ADICIONAL"      */
        case "16": /*"ARRMTO ALNOVA"       */
        case "17": /*"SIC"                 */
        case "18": /*"GARANTIAS"           */
        case "19": /*"CLIENTES"            */
        case "20": /*"CAPTACIÓN"           */
        case "21": /*"BALANZA"             */
        case "22": /*"R01"                 */
        case "23": /*"CLIENTE PAZ"         */
        case "24": /*"CLIENTE UNICO"       */
        case "25": /*"EMPLEADOS"           */
        case "26": /*"BLOQUEOS PLD"        */
        case "27": /*"FIDEICOMISOS"        */
        case "28": /*"BLOQUEOS OPERACIONES"*/
        case "29": /*"CTAS LITIGIO"        */
        case "30": /*"INSUMO RSK"          */
            LlamaPeticionAjaxDeCedulaFuente(idFuenteCedula, $(obj).attr('id').split('_')[2], $(obj).attr("id").split("_")[3].split("%%%")[0]); break;
    }
}

function SubAcordeon_Click(obj) {
    var indexObjetoSelect = $(obj).attr("id").split("_")[2];
    var numTdsAcordeon = $(obj).parent().find(OpcionCargada == "Carga" ? ".AcordeonAzul_1" : (OpcionCargada == "Met" ? ".AcordeonAmarillo_1" : ".AcordeonNaranja_1")).length;
    var indexObjetoComp = "";
    for (var i = 1; i <= numTdsAcordeon + 1; i++) {
        if (i != parseInt(indexObjetoSelect))
            indexObjetoComp += i + ",";
    }
    indexObjetoComp = indexObjetoComp.substring(0, indexObjetoComp.length - 1)
    if ($(obj).attr("lang") == "aa") {
        if ($("#TdEncabezado_" + $(obj).attr("id").split("_")[1] + "_" + indexObjetoComp.split(',')[0]).attr("lang") == "ab") {
            var tamañoExpander = 100 / (indexObjetoComp.split(',').length + 1);
            $(obj).animate({ opacity: '0.9', width: tamañoExpander + "%" });
            for (var i = 0; i < indexObjetoComp.split(',').length; i++) {
                $("#TdEncabezado_" + $(obj).attr("id").split("_")[1] + "_" + indexObjetoComp.split(',')[i]).animate({ opacity: '0.9', width: tamañoExpander + "%" });
                $("#" + "TdContenido_" + $(obj).attr("id").split("_")[1] + "_" + indexObjetoComp.split(',')[i]).hide();
            }
        }
        else $(obj).animate({ opacity: '0.9', width: "100%" });
        $("#" + "TdContenido_" + $(obj).attr("id").split("_")[1] + "_" + +indexObjetoSelect).hide();
    }
    if ($(obj).attr("lang") == "ab") {
        $(obj).animate({ opacity: '0.9', width: "5%" });
        $("#" + "TdContenido_" + $(obj).attr("id").split("_")[1] + "_" + +indexObjetoSelect).animate({ opacity: '0.9', width: "90%" });
        $("#" + "TdContenido_" + $(obj).attr("id").split("_")[1] + "_" + +indexObjetoSelect).show();
        if ($("#TdEncabezado_" + $(obj).attr("id").split("_")[1] + "_" + indexObjetoComp.split(',')[0]).attr("lang") != undefined) {
            for (var i = 0; i < indexObjetoComp.split(',').length; i++) {
                $("#TdEncabezado_" + $(obj).attr("id").split("_")[1] + "_" + indexObjetoComp.split(',')[i]).animate({ opacity: '0.9', width: "3%" });
                $("#" + "TdContenido_" + $(obj).attr("id").split("_")[1] + "_" + indexObjetoComp.split(',')[i]).hide();
                $("#TdEncabezado_" + $(obj).attr("id").split("_")[1] + "_" + indexObjetoComp.split(',')[i]).attr("lang", "ab");
            }
        }
    }
    $(obj).attr("lang", ($(obj).attr("lang") == "aa" ? "ab" : "aa"));
}

function CasesFaseFuenteExpandedP1(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, fuente, idFuente, agregarBtnsReprocesosF1, agregarBtnsReprocesosF2, agregarBtnsReprocesosF3, agregarBtnsReprocesosF4, agregarBtnsReprocesosF5, agregarBtnsReprocesosF6, agregarBtnsReprocesosF7
, agregarBtnNuevoF1, agregarBtnNuevoF2, agregarBtnNuevoF3, agregarBtnNuevoF4, agregarBtnNuevoF5, agregarBtnNuevoF6, agregarBtnNuevoF7, agregarCmbReporteriaF1, agregarCmbReporteriaF2, agregarCmbReporteriaF3, agregarCmbReporteriaF4, agregarCmbReporteriaF5, agregarCmbReporteriaF6, agregarCmbReporteriaF7
, agregarChkXSucursalF1, agregarChkXSucursalF2, agregarChkXSucursalF3, agregarChkXSucursalF4, agregarChkXSucursalF5, agregarChkXSucursalF6, agregarChkXSucursalF7, agregarTxtRutaNombreF1, agregarTxtRutaNombreF2, agregarTxtRutaNombreF3, agregarTxtRutaNombreF4, agregarTxtRutaNombreF5, agregarTxtRutaNombreF6, agregarTxtRutaNombreF7
, agregarBtnVariosF1, agregarBtnVariosF2, agregarBtnVariosF3, agregarBtnVariosF4, agregarBtnVariosF5, agregarBtnVariosF6, agregarBtnVariosF7, txtValueF1, txtValueF2, txtValueF3, txtValueF4, txtValueF5, txtValueF6, txtValueF7, agregarBtnReporteF1, agregarBtnReporteF2, agregarBtnReporteF3, agregarBtnReporteF4, agregarBtnReporteF5, agregarBtnReporteF6, agregarBtnReporteF7, tieneFases) {
    var cadena = "";
    switch (indicePestania) {
        case "1": cadena += CasesFaseFuenteExpanded(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, fuente, idFuente, agregarBtnsReprocesosF1, agregarBtnNuevoF1, agregarCmbReporteriaF1, agregarChkXSucursalF1, agregarTxtRutaNombreF1, agregarBtnVariosF1, txtValueF1, agregarBtnReporteF1, tieneFases, "0"); break;
        case "2": cadena += CasesFaseFuenteExpanded(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, fuente, idFuente, agregarBtnsReprocesosF2, agregarBtnNuevoF2, agregarCmbReporteriaF2, agregarChkXSucursalF2, agregarTxtRutaNombreF2, agregarBtnVariosF2, txtValueF2, agregarBtnReporteF2, tieneFases, "0"); break;
        case "3": cadena += CasesFaseFuenteExpanded(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, fuente, idFuente, agregarBtnsReprocesosF3, agregarBtnNuevoF3, agregarCmbReporteriaF3, agregarChkXSucursalF3, agregarTxtRutaNombreF3, agregarBtnVariosF1, txtValueF3, agregarBtnReporteF3, tieneFases, "3"); break;
        case "4": cadena += CasesFaseFuenteExpanded(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, fuente, idFuente, agregarBtnsReprocesosF4, agregarBtnNuevoF4, agregarCmbReporteriaF4, agregarChkXSucursalF4, agregarTxtRutaNombreF4, agregarBtnVariosF4, txtValueF4, agregarBtnReporteF4, tieneFases, "0"); break;
        case "5": cadena += CasesFaseFuenteExpanded(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, fuente, idFuente, agregarBtnsReprocesosF5, agregarBtnNuevoF5, agregarCmbReporteriaF5, agregarChkXSucursalF5, agregarTxtRutaNombreF5, agregarBtnVariosF5, txtValueF5, agregarBtnReporteF5, tieneFases, "0"); break;
        case "6": cadena += CasesFaseFuenteExpanded(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, fuente, idFuente, agregarBtnsReprocesosF6, agregarBtnNuevoF6, agregarCmbReporteriaF6, agregarChkXSucursalF6, agregarTxtRutaNombreF6, agregarBtnVariosF6, txtValueF6, agregarBtnReporteF6, tieneFases, "0"); break;
        case "7": cadena += CasesFaseFuenteExpanded(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, fuente, idFuente, agregarBtnsReprocesosF7, agregarBtnNuevoF7, agregarCmbReporteriaF7, agregarChkXSucursalF7, agregarTxtRutaNombreF7, agregarBtnVariosF7, txtValueF7, agregarBtnReporteF7, tieneFases, "0"); break;
    }
    return cadena;
}

function CasesFaseFuenteExpanded(indicePestania, IdItemSelect, numeroBotonesRep, IdButtonNew, fuente, idFuente, agregarBtnsReprocesos, agregarBtnNuevo, agregarCmbReporteria, agregarChkXSucursal, agregarTxtRutaNombre, agregarBtnVarios, txtValue, agregarBtnReporte, tieneFases, op) {
    var cadena = "";
    cadena += AgregarBotonesNuevoYReprocesos(agregarBtnsReprocesos, agregarBtnNuevo, numeroBotonesRep, IdButtonNew, IdItemSelect.split("_")[2], indicePestania, IdItemSelect + "&&&" + idFuente, tieneFases);
    cadena += AgregarComboReporteria(agregarCmbReporteria);
    cadena += AgregarCheckPorSucursal(agregarChkXSucursal, IdButtonNew, indicePestania, IdItemSelect.split("_")[2] + "&&&" + idFuente);
    cadena += AgregarTxtRutaNombre(agregarTxtRutaNombre, IdItemSelect, idFuente);
    cadena += AgregarBtnVarios(agregarBtnVarios, txtValue + "_" + idFuente, IdButtonNew + "-" + IdItemSelect, agregarBtnReporte, idFuente, op);
    return cadena;
}

function AgregarBotonesNuevoYReprocesos(agregarBtnsReprocesos, agregarBtnNuevo, numeroBotonesRep, IdButtonNew, fuente, indicePestania, IdItemSelect, tieneFases) {
    var cadena = "";
    if (agregarBtnsReprocesos) {
        for (var i = numeroBotonesRep; i >= 0; i--) {
            //if (i == 0 && agregarBtnNuevo) cadena += "<td ><div class='BtnNewProceso'  id='btn_" + IdButtonNew + "_Nuevo_" + fuente + "-" + indicePestania + "' onclick='NuevoReproceso_Click(this);'  onmouseover=\"mostrarTooltip(this,'Nuevo Reproceso');\"> </div></td>";
            /*else if (i > 0)*/if (tieneFases) cadena += "<td > <div class='BtnReproceso' id='btn_" + IdItemSelect + "_" + i + "' onclick='HistorialReprocesos_Click(this);'><div class='TxtBtnReproceso'>" + i + "</div> </div></td>";
        }
    }
    cadena += "</tr></table></div>";
    return cadena;
}

function AgregarCheckPorSucursal(agregarChkXSucursal, IdButtonNew, indicePestania, Deffuente) {
    var cadena = "";
    if (agregarChkXSucursal) {
        cadena += "<tr><td style='font: normal 10px Helvetica, Arial, sans-serif;'><input type='checkbox' id='chk-1_" + IdButtonNew + "-" + indicePestania + "_" + Deffuente + "' value='Por Sucursal' onclick='ShowHideVentanaDialogo_PorSucursales(this)'/>Por Sucursal </td></tr>";
    }
    return cadena;
}

var arreglotxtIdNameFile = new Array();
function AgregarTxtRutaNombre(agregarTxtRutaNombre, IdItemSelect, idFuente) {
    var cadena = "";
    cadena += "</tr><tr><td><table id='tblTxtRutaNombre' style='width: 100%;' border='0' >";
    if (agregarTxtRutaNombre) {
        cadena += "<tr><td align='left' style='font: normal 9px Helvetica, Arial, sans-serif;'>Ruta:&nbsp&nbsp" + (arrayNombresRutasfiles[idFuente - 1] != undefined ? (arrayNombresRutasfiles[idFuente - 1].split('||')[0]).split('&&').join('\\') : "") + "</td></tr>"
        cadena += " <tr><td align='left' style='font: normal 10px Helvetica, Arial, sans-serif;'>Nombre:<input type='text' id='txtNombreFile_" + idFuente + "' value='" + (arrayNombresRutasfiles[idFuente - 1] != undefined ? arrayNombresRutasfiles[idFuente - 1].split('||')[1].replace("&&&", "") : "") + "' style='color:#000000; width:280px;font: normal 10px Helvetica, Arial, sans-serif;' onfocus=\"this.value=(this.value=='Nombre Archivo...' || this.value==''? '':this.value);this.style.color='#000000'\" onblur=\"this.value=(this.value!=''?this.value:'Nombre Archivo...');this.style.color=(this.value!='' &&this.value!='Nombre Archivo...'?'#000000':'#999999')\"/> </td></tr>";
        arreglotxtIdNameFile.push("txtNombreFile_" + idFuente + "&&&" + (arrayNombresRutasfiles[idFuente - 1] != undefined ? arrayNombresRutasfiles[idFuente - 1].split('||')[1].split('&&&')[0] : "") + "&&&" + idFuente);
    }
    return cadena;
}

function AgregarBtnVarios(agregarBtnVarios, txtValue, IdButtonNew, agregarBtnReporte, idFuente, op) {
    var cadena = "";

    if (agregarBtnVarios) {
        if (op == "0") {
            if (idFuente == 22) /************ Se agrego solo para el R01  'Drag & Drop' ************/ {
                cadena += ' <tr>';
                cadena += '     <td align="center" style="width:100%">';
                cadena += '         <label for="fuArchivosAdjuntos_' + idFuente + '" class="custom-file-upload" >';
                cadena += '             <i class="fa fa-cloud-upload"></i> Subir Archivo';
                cadena += '         </label>';
                cadena += '         <input id="fuArchivosAdjuntos_' + idFuente + '" style="display: none;" type="file" onchange="checkfile(this);" name="fuArchivosAdjuntos" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" />';
                cadena += '     </td>';
                cadena += ' </tr>';
            }
            else if (idFuente == 24) {
                cadena += ' <tr>';
                //cadena += '     <td align="center" style="width:100%">';
                cadena += '     <td align="center" style="width:100%">';
                cadena += '         <div class="dropzone">';
                cadena += '             <div class="dz-default dz-message" style="line-height: 100% ">';
                cadena += '                 <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">';
                cadena += '                     <tr>';
                cadena += '                           <td style="text-align: center; white-space: normal; height:60px; width: 100%; font: 14px Segoe UI, Verdana, Helvetica, Sans-Serif;">Este proceso se actualiza en automático</td>';
                cadena += '                      </tr>';
                cadena += '                  </table>';
                cadena += '             </div>';
                cadena += '         </div>';
                cadena += '     </td>';
                cadena += '     </td>';
                cadena += ' </tr>';
            }
            else if (idFuente == 25 || idFuente == 26 || idFuente == 27 || idFuente == 28 || idFuente == 29) {
                cadena += ' <tr>';
                cadena += '     <td align="center" style="width:100%">';
                //cadena += '         <label for="fuArchivosAdjuntos_' + idFuente + '" class="custom-file-upload" >';
                //cadena += '             <i class="fa fa-cloud-upload"></i> Subir Archivo';
                //cadena += '         </label>';
                cadena += '         <input id="fuArchivosAdjuntos_' + idFuente + '" type="file" onchange="checkfile_txt(this);" name="fuArchivosAdjuntos" />';
                cadena += '     </td>';
                cadena += ' </tr>';
            } else if (idFuente == 30) {
                cadena += "<tr><td align='center' style='width:50%'><table><tr><td style='width:50%'><input type='button' id='btn_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + "' onclick='BtnsVariasOptions_Click(this);' value='" + txtValue.split("_")[0] + "' " + ((PerfilUser == "35" || PerfilUser == "30") || (periocidadSelectXUser != "1" && (IdButtonNew.split("_")[2] == "PRIMAS" || IdButtonNew.split("_")[2] == "CONCILIACION" || IdButtonNew.split("_")[2] == "GENERAL ADICIONAL" || IdButtonNew.split("_")[2] == "RSVA ADICIONAL")) ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + "/>";
                cadena += idFuente == "30"
                    ? "&nbsp&nbsp&nbsp<input type='button' id='btn_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + "' onclick='BtnsVerIncidenciasSIC_Click(this);' value='Ver Incidencias' class='classButton'/>" +
                      "&nbsp&nbsp&nbsp<input type='button' id='btn_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + "' onclick='BtnsVerValidacionesSIC_Click(this);' value='Catálogo de validaciones' class='classButton' /> " +
                      "&nbsp&nbsp&nbsp<input type='button' id='btn_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + "' onclick='verArchivoExcelSIC(" + idFuente + ");' value='Descargar Archivo' class='classButton' />"
                     + "</td>" : "";
                cadena += txtValue.split("_")[0] == "Iniciar Descarga" ? "<td align='center' style='width:50%'><input type='button'  id='btnProgramarDescarga_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + "' onclick='BtnsProgramarDescargas_Click(this);' value='Programar Descarga' " + (AgregarBtnMiniAgenda && PerfilUser != "35" && PerfilUser != "30" ? "class='classButtonEnabledMiniAgenda'" : "class='classButtonDisMiniAgenda' disabled='disabled'") + "/></td>" : "";
                cadena += "</tr></table></td></tr>";
            } 

            else {
                cadena += "<tr><td align='center' style='width:50%'><table><tr><td style='width:50%'><input type='button' id='btn_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + "' onclick='BtnsVariasOptions_Click(this);' value='" + txtValue.split("_")[0] + "' " + ((PerfilUser == "35" || PerfilUser == "17") || (periocidadSelectXUser != "1" && (IdButtonNew.split("_")[2] == "PRIMAS" || IdButtonNew.split("_")[2] == "CONCILIACION" || IdButtonNew.split("_")[2] == "GENERAL ADICIONAL" || IdButtonNew.split("_")[2] == "RSVA ADICIONAL")) ? "class='classButtonDis' disabled='disabled'" : "class='classButton'") + "/>";
                cadena += idFuente == "17" ? "&nbsp&nbsp&nbsp<input type='button' id='btn_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + "' onclick='BtnsVerIncidenciasSIC_Click(this);' value='Ver Incidencias' class='classButton'/>" +
                "&nbsp&nbsp&nbsp<input type='button' id='btn_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + "' onclick='BtnsVerValidacionesSIC_Click(this);' value='Catálogo de validaciones' class='classButton' /> " +
                "&nbsp&nbsp&nbsp<input type='button' id='btn_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + "' onclick='verArchivoExcelSIC(" + idFuente + ");' value='Descargar Archivo' class='classButton' />" +
                "&nbsp&nbsp&nbsp<input type='button'  id='btnProgramarDescarga_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + "' onclick='BtnsProgramarDescargas_Click(this);' value='Programar Descarga' " + (AgregarBtnMiniAgenda && PerfilUser != "35" && PerfilUser != "17" ? "class='classButtonEnabledMiniAgenda'" : "class='classButtonDisMiniAgenda' disabled='disabled'") + "/> " +
                "&nbsp&nbsp&nbsp<div class='divDetalleCargaMasiva'  style='display:" + (mostrarBtnDetalleCargaMasiva ? "inline;" : "none;") + "'><input type='button' id='btnVerDetalleCargaMasiva' onclick='VerDetalleCargaMasiva();' value='Detalle Carga Masiva' class='classButton' /></div>" +
                "</td>" : "";
                cadena += txtValue.split("_")[0] == "Iniciar Descarga" ? "<td align='center' style='width:50%'><input type='button'  id='btnProgramarDescarga_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + "' onclick='BtnsProgramarDescargas_Click(this);' value='Programar Descarga' " + (AgregarBtnMiniAgenda && PerfilUser != "35" && PerfilUser != "17" ? "class='classButtonEnabledMiniAgenda'" : "class='classButtonDisMiniAgenda' disabled='disabled'") + "/></td>" : "";
                cadena += "</tr></table></td></tr>";
            }
        }
        else {
            cadena += ' <tr>';
            cadena += '  <td align="center" style="width: 50%">';
            cadena += '     <table>';
            cadena += '        <tr>';
            cadena += '             <td style="width: 50%">';
            cadena += '                 <input type="button" id="btn_' + IdButtonNew + '&&&' + txtValue.split("_")[1] + '" onclick = "btnMostrarIncidenciasEtapa3_Click(this);" value= "Ver Incidencias" class="classButton" />';
            cadena += '             </td>';
            cadena += '       </tr>';
            cadena += '     </table>';
            cadena += '  </td>';
            cadena += '</tr>';
        }
    }
    else {
        cadena += txtValue.split("_")[0] == "" ? "<tr><td align='center' style='width:50%'><input type='button' id='btnProgramarDescarga_" + IdButtonNew + "&&&" + txtValue.split("_")[1] + " ' onclick='BtnsProgramarDescargas_Click(this);' value='Programar Descarga' " + (AgregarBtnMiniAgenda ? "class='classButtonEnabledMiniAgenda'" : "class='classButtonDisMiniAgenda' disabled='disabled'") + "/></td></tr>" : "";

    }
    if (agregarBtnReporte)
        cadena += "<tr><td align='center'><input type='button' id='btnReporte" + IdButtonNew + "' value='Reporte' class='classButton'/></td></tr>";
    return cadena;
}

function checkfile_txt(sender) {
    var validExts = new Array(".txt");
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
        alertify.Comentario('Debe seleccionar un archivo con extención .txt', function (e) { });
        return false;
    }
    else {
        ArchivoAsincronamente_txt(sender);
    }
}

function ArchivoAsincronamente_txt(obj) {
    var idInputFile = $(obj).parent().find("input:file").attr("id");
    var parametros = {
        'subirArchivo': 'subirArchivoR01',
        'NoActividad': 1,
        'id': $(obj).attr("id")
    };
    WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
    jQuery.ajaxFileUpload
            ({
                url: 'subirArchivosTXT.ashx',
                fileElementId: idInputFile,
                dataType: 'json',
                data: parametros,
                complete: function () {
                },
                success: function (data, status) {
                    almacenaArchivo_txt()
                }
                , error: function (file, response) {
                    alertify.Comentario('Ocurrio un error al cargar el archivo', function (e) { });
                }
            });
    return false;
}

function almacenaArchivo_txt()
{
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('PanelDeControl.aspx/almacenaArchivo_txt', "POST", {},
        function (data) {
            if (data.d.indexOf("Subir") == 0) {
                alertify.confirm('Se almacenará el archivo, ¿Desea continuar?', function (e) {
                    if (e) {
                        Waiting(false, "Cargando Información...");
                        peticionAjax('PanelDeControl.aspx/almacenaArchivo_txt_final', "POST", { dia: $("#dpFechaPeriodoGral").val().split('/')[2] + $("#dpFechaPeriodoGral").val().split('/')[1] + $("#dpFechaPeriodoGral").val().split('/')[0], peridiocidad: periocidadSelectXUser },
                            function (data)
                                {
                                if (data.d == "OK") {
                                    alertify.success("La operación se ejecuto satisfactoriamente.");
                                }
                                else if (data.d == "ERROR-DIA") {
                                    alertify.success("Las fecha de corte no coincide con las fechas del documento...!");
                                }
                                else if (data.d.indexOf("ERROR-NULL") == 11) {
                                    alertify.success("El archivo contiene campos con valor NULL, por lo que no es posible almacenar la información");
                                }
                                else if (data.d.indexOf("ERROR-NUMEROCOLUMNAS") == 11) {
                                    alertify.success("El archivo contiene un número de columnas diferentes...!");
                                }
                                else {
                                    alertify.success("No se pudo crear el registro, vuelva a intentarlo. " + data.d);
                                }
                            }, null
                         );
                    }
                    else {
                        Waiting(false, "Cargando Información...");
                    }
                });
            }
            else if (data.d.indexOf("ERROR - NUMEROCOLUMNAS")) {
                alertify.success('El archivo contiene un número de columnas diferentes...!');
                Waiting(false, "Cargando Información...");
            }
            else if (data.d.indexOf("Extencion") == 0) {
                alertify.Comentario('El tipo de archivo no es el correcto, debe ser .xls o .xlsx', function (e) { });
                Waiting(false, "Cargando Información...");
            }
        }, null);
}

function checkfile(sender) {
    var validExts = new Array(".xlsx", ".xls");
    var fileExt = sender.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
        alertify.Comentario('Debe seleccionar un archivo .xls o .xlsx', function (e) { });
        return false;
    }
    else {
        EAArchivoAsincronamente(sender);
    }
}

function EAArchivoAsincronamente(obj)
{
    var idInputFile = $(obj).parent().find("input:file").attr("id");
    var parametros = {
        'subirArchivo': 'subirArchivoR01',
        'NoActividad': 1
    };
    WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
    jQuery.ajaxFileUpload
            ({
                url: 'almacenaR01.ashx',
                fileElementId: idInputFile,
                dataType: 'json',
                data: parametros,
                complete: function () {
                },
                success: function (data, status) {
                    almacenaDragAndDropR01()
                }
                ,error : function (file, response) {
                    alertify.Comentario('Ocurrio un error al cargar el archivo', function (e) { });
                }
            });
    return false;
}

function AgregarVtnFlotante_E3(divVentana, IdCtrls, titulo, msj, contenido, alto, ancho, visibleSi, visibleNo, txtSi, txtNo, funcionOk) {
    var cadena = ' <div class="divVtnsFlotantes" style="width: 100%; height: 100%; overflow: none; text-align: center;font-size:12px">' + msj + contenido;

    $("#" + divVentana).empty();
    $("#" + divVentana).html(cadena);
    $("#" + divVentana).dialog("option", "title", titulo);
    $("#" + divVentana).dialog("option", "width", ancho);
    $("#" + divVentana).dialog("option", "height", alto);
    $("#" + divVentana).dialog("open");
    var styleLoading = $(".ui-widget-overlay").attr("style") + "background: #000;";
    $(".ui-widget-overlay").attr("style", styleLoading);
    if (visibleSi || visibleNo)
        $("#" + divVentana).dialog("option", "buttons", visibleSi && visibleNo ? [{ text: txtSi, click: funcionOk }, { text: txtNo, click: function () { $(this).dialog("close"); } }] : (visibleSi ? [{ text: txtSi, click: funcionOk }] : [{ text: txtNo, click: function () { $(this).dialog("close"); } }]));
    $(".ui-button-text").attr("id", IdCtrls);
}

function btnMostrarIncidenciasEtapa3_Click(obj)
{
    var idFaseGet = $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1);
    var cadena = '<div id="divBloqVtnVerIncidencias" style="width:100%;height:100%;background:Gray;filter: alpha(opacity=80);opacity: 0.9;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblVerIncidenciasMet" style="width:100%; height:100%; overflow: auto;margin-top: 0px;">  </div>';
    cadena += '</div>';
    $("#divVerIncidenciasMet").empty();
    AgregarVtnFlotante_E3("divVerIncidenciasMet", "", "INCIDENCIAS " + $(obj).attr("id").split("_")[3].split("&&&")[0], "", cadena, ($(obj).attr("id").split("_")[1] != "1" ? 200 : 50), ($(obj).attr("id").split("_")[1] != "1" ? 1350 : 1140), false, false, "", "", null);
    WaitingVtn("divBloqVtnVerIncidencias", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "1%";
     var idMetV = $(obj).attr("id").split("&&&")[1];
    var parametrosVerVal = { fechaPeriodo: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], idMet: $(obj).attr("id").split("&&&")[1], fase: 3 };
    peticionAjax("PanelDeControl.aspx/VerIncidenciasE3", "POST", parametrosVerVal, function (data) {
        if (data.d == "" || data.d == null || data.d.split('-')[0] == "Sin Datos") {
            $('#dvDetalleEITblVerIncidenciasMet').html("Sin Incidencias");
            $("#divVerIncidenciasMet").animate({ height: "50px" });
            $("#divVerIncidenciasMet").dialog("option", "width", "300");
            estableceTamanioVacio();
            
            return;
        }
        var JSON = obtenerArregloDeJSON(data.d.split("%&&%")[0], false);
        var JSONSubLista = data.d.split("%&&%")[1] != undefined ? obtenerArregloDeJSON(data.d.split("%&&%")[1], false) : "";
        var JSONSubLista2 = data.d.split("%&&%")[2] != undefined ? obtenerArregloDeJSON(data.d.split("%&&%")[2], false) : "";
        if (JSONSubLista != "") {

            //if (idMetV == "23" || idMetV == "19" || idMetV == "20" || idMetV == "18") {
            //    $("#dvDetalleEITblVerIncidenciasMet").html(generaTablaIncidencias_Etapa3(JSON, JSONSubLista, JSONSubLista2, $(obj).attr("id").split('_')[1], idFaseGet));

            //}

            //else {
            //    $("#dvDetalleEITblVerIncidenciasMet").html(generaTablaIncidencias_Etapa_I3(JSON, JSONSubLista, $(obj).attr("id").split('_')[1], idFaseGet));
            //}

            if (idMetV == "17") {
                $("#dvDetalleEITblVerIncidenciasMet").html(generaTablaIncidencias_Etapa_I3(JSON, JSONSubLista, $(obj).attr("id").split('_')[1], idFaseGet));
            }
            else {
                $("#dvDetalleEITblVerIncidenciasMet").html(generaTablaIncidencias_Etapa3(JSON, JSONSubLista, JSONSubLista2, $(obj).attr("id").split('_')[1], idFaseGet,19));
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
            $("#dvDetalleEITblVerIncidenciasMet").html(CreaTablaIncidenciasMetodologia_E3(JSON, $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1), $(obj).attr("id").split("_")[1], false));
        }
    }, null);
    WaitingVtn("divBloqVtnVerIncidencias", false, false, "Cargando Información...");
}

/*********************************************************************/

function generaTablaIncidencias_Etapa3(listaDeJSON, JSONSubLista, JSONSubLista2, metodologia, fase, opcion) {
    var cont = listaDeJSON.length;
    var cad = '';
    var aux = '';
    var auxBool = false;
    //var opcion = "19";

    cad += '<table style="width:1300px" id="tblIncidencias" class="dataGridDatos_PC">';

    cad += '  <tr style="font: Arial; font-size:10px; font-weight: bold; background:#4cada0; height:30px;">';
    cad += '       <td colspan="2" style="width:18px;"></td>';
    cad += '       <td colspan="2" style="width:350px;">SISTEMA</td>';
    cad += '       <td style="width:130px">REGISTROS CON ERROR</td>';
    cad += '       <td style="width:80px;">SEMAFORO</td>';
    cad += '  </tr>';

    var nombre = JSONSubLista[0]["SISTEMA"];
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
                                      ('onclick="DescargarTxtRegistrosAfectados_E5(\'' + opcion + "\',\'" + JSONSubLista2[x]["FUENTE"] + "\',\'" + JSONSubLista2[x]["CLAVE"] + "\',\'" + JSONSubLista2[x]["SISTEMA"] + "\',\'" + JSONSubLista2[x]["CLAVE"].split('-')[2] + "\',\'" + false + "\',\'" + JSONSubLista2[x]["NOMBRE"] + '\',' + false + ');"') + ">" + (registros >= 10000 ? "+ Más de " : "") + registros + "</span>"
                    cad += '     </td>';
                    cad += '     <td style="width:80px"><center><span class="' + (JSONSubLista2[x]["FVCSimbologia"] == 'WARNING' ? 'EstatusNaranja' : 'EstatusRojo') + '" title="' + JSONSubLista2[x]["SEMAFORO"] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center></td>';
                    cad += ' </tr>';
                }

            }
        }
        contAux += 1;
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
function generaTablaIncidencias_Etapa_I3(listaDeJSON, JSONSubLista, metodologia, fase, sOpcion) {
    var cont = listaDeJSON.length;
    var cad = '';
    var aux = '';

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
        cad += '     <td style="width:100px; text-align: right;">' + listaDeJSON[i]["SALDO AFECTADO"] + '</td>';
        cad += '     <td style="width:120px; text-align: right;">' + listaDeJSON[i]["PEDIDOS TOTALES"] + '</td>';
        cad += '     <td style="width:120px; text-align: right;">' + listaDeJSON[i]["SALDO TOTAL"] + '</td>';
        cad += '     <td style="width:130px; text-align: right;">' + listaDeJSON[i]["CREDITOSCONERROR"] + '</td>';
        cad += '     <td style="width:120px; text-align: right;">' + listaDeJSON[i]["SALDOCONERROR"] + '</td>';
        cad += '     <td style="width:100px; text-align: right;">' + listaDeJSON[i]["INDICEDECALIDAD"] + '</td>';
        cad += '     <td style="width:80px;  "><center><span class="' + (JSONSubLista[i]["NEGOCIO"] == "ERROR" ? "EstatusRojo" : "EstatusNaranja") + '" title="' + JSONSubLista[0]["NEGOCIO"] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center></td>';
        cad += '  </tr>';
        var contAux = 2;
        for (var x = 0; x < JSONSubLista.length; x++) {

            if (nombre == JSONSubLista[x]["SISTEMA"]) {
                if (aux.indexOf(nombre) < 0) {
                    aux += nombre;
                }
                cad += ' <tr class="' + i + 'ItemN1" style="font: Arial; font-size:10px; display: none; background:#F0F2EA; font: 9px Helvetica,Arial,sans-serif;">';
                cad += '     <td style="background:white; width:10px;"></td>';
                cad += '     <td style="background:white;"></td>';
                cad += '     <td style="width:100px; text-align:left; ">&nbsp&nbsp<span style="text-decoration: underline;  text-align:left; color: blue; cursor: pointer" title="Ver Cédula Validaciones"' +
                                   ('onclick="VerCedulaValidacioneEtapaIII(\'' + JSONSubLista[x]["FUENTE"] + "\',\'" + JSONSubLista[x]["CLAVE"].split('-')[3] + "\',\'" + JSONSubLista[x]["NEGOCIO"] + "\',\'" + JSONSubLista[x]["NOMBRE"] + "\',\'" + metodologia + "\',\'" + fase + '\',' + false + ');"') + ">" + JSONSubLista[x]["CLAVE"] + "</span>"
                cad += '     </td>'
                cad += '     <td style="width:290px; text-align: left;">' + JSONSubLista[x]["NOMBRE"] + '</td>';
                cad += '     <td style="width:130px; text-align: right;"><span style="text-decoration: underline; color: blue; cursor: pointer" title="Descargar archivo .csv"' +
                                 ('onclick="DescargarTxtRegistrosAfectados_E3(\'' + JSONSubLista[x]["FUENTE"] + "\',\'" + JSONSubLista[x]["CLAVE"] + "\',\'" + JSONSubLista[x]["CLAVE"].split('-')[2] + "\',\'" + JSONSubLista[x]["NOMBRE"] + '\');"') + ">" + JSONSubLista[x]["REGISTROS AFECTADOS"] + "</span>"
                cad += '     </td>';
                cad += '     <td style="width:100px; text-align: right;">' + JSONSubLista[x]["SALDO AFECTADO"] + '</td>';
                cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista[x]["PEDIDOS TOTALES"] + '</td>';
                cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista[x]["SALDO TOTAL"] + '</td>';
                cad += '     <td style="width:130px; text-align: right;">' + JSONSubLista[x]["CREDITOSCONERROR"] + '</td>';
                cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista[x]["SALDOCONERROR"] + '</td>';
                cad += '     <td style="width:100px; text-align: right;">' + JSONSubLista[x]["INDICEDECALIDAD"] + '</td>';
                cad += '     <td style="width:80px"><center><span class="' + (JSONSubLista[x]["SEMAFORO"] == 'WARNING' ? 'EstatusNaranja' : 'EstatusRojo') + '" title="' + JSONSubLista[x]["SEMAFORO"] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center></td>';
                cad += ' </tr>';
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
    cad += '     <td style="width:100px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["SALDO AFECTADO"] + '</td>';
    cad += '     <td style="width:120px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["PEDIDOS TOTALES"] + '</td>';
    cad += '     <td style="width:120px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["SALDO TOTAL"] + '</td>';
    cad += '     <td style="width:130px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["CREDITOSCONERROR"] + '</td>';
    cad += '     <td style="width:80px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["SALDOCONERROR"] + '</td>';
    cad += '     <td style="width:100px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["INDICEDECALIDAD"] + '</td>';
    cad += '     <td style="width:80px; background:white;"></td>';
    cad += '  </tr>';

    cad += '</table>';
    return cad;
}

function generaTablaIncidencias_Etapa_I3(listaDeJSON, JSONSubLista, metodologia, fase, sOpcion) {
    var cont = listaDeJSON.length;
    var cad = '';
    var aux = '';

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
        cad += '     <td style="width:100px; text-align: right;">' + listaDeJSON[i]["SALDO AFECTADO"] + '</td>';
        cad += '     <td style="width:120px; text-align: right;">' + listaDeJSON[i]["PEDIDOS TOTALES"] + '</td>';
        cad += '     <td style="width:120px; text-align: right;">' + listaDeJSON[i]["SALDO TOTAL"] + '</td>';
        cad += '     <td style="width:130px; text-align: right;">' + listaDeJSON[i]["CREDITOSCONERROR"] + '</td>';
        cad += '     <td style="width:120px; text-align: right;">' + listaDeJSON[i]["SALDOCONERROR"] + '</td>';
        cad += '     <td style="width:100px; text-align: right;">' + listaDeJSON[i]["INDICEDECALIDAD"] + '</td>';
        cad += '     <td style="width:80px;  "><center><span class="' + (JSONSubLista[i]["NEGOCIO"] == "ERROR" ? "EstatusRojo" : "EstatusNaranja") + '" title="' + JSONSubLista[0]["NEGOCIO"] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center></td>';
        cad += '  </tr>';
        var contAux = 2;
        for (var x = 0; x < JSONSubLista.length; x++) {

            if (nombre == JSONSubLista[x]["SISTEMA"]) {
                if (aux.indexOf(nombre) < 0) {
                    aux += nombre;
                }
                cad += ' <tr class="' + i + 'ItemN1" style="font: Arial; font-size:10px; display: none; background:#F0F2EA; font: 9px Helvetica,Arial,sans-serif;">';
                cad += '     <td style="background:white; width:10px;"></td>';
                cad += '     <td style="background:white;"></td>';
                cad += '     <td style="width:100px; text-align:left; ">&nbsp&nbsp<span style="text-decoration: underline;  text-align:left; color: blue; cursor: pointer" title="Ver Cédula Validaciones"' +
                                   ('onclick="VerCedulaValidacioneEtapaIII(\'' + JSONSubLista[x]["FUENTE"] + "\',\'" + JSONSubLista[x]["CLAVE"].split('-')[3] + "\',\'" + JSONSubLista[x]["NEGOCIO"] + "\',\'" + JSONSubLista[x]["NOMBRE"] + "\',\'" + metodologia + "\',\'" + fase + '\',' + false + ');"') + ">" + JSONSubLista[x]["CLAVE"] + "</span>"
                cad += '     </td>'
                cad += '     <td style="width:290px; text-align: left;">' + JSONSubLista[x]["NOMBRE"] + '</td>';
                cad += '     <td style="width:130px; text-align: right;"><span style="text-decoration: underline; color: blue; cursor: pointer" title="Descargar archivo .csv"' +
                                 ('onclick="DescargarTxtRegistrosAfectados_E3(\'' + JSONSubLista[x]["FUENTE"] + "\',\'" + JSONSubLista[x]["CLAVE"] + "\',\'" + JSONSubLista[x]["CLAVE"].split('-')[2] + "\',\'" + JSONSubLista[x]["NOMBRE"] + '\');"') + ">" + JSONSubLista[x]["REGISTROS AFECTADOS"] + "</span>"
                cad += '     </td>';
                cad += '     <td style="width:100px; text-align: right;">' + JSONSubLista[x]["SALDO AFECTADO"] + '</td>';
                cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista[x]["PEDIDOS TOTALES"] + '</td>';
                cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista[x]["SALDO TOTAL"] + '</td>';
                cad += '     <td style="width:130px; text-align: right;">' + JSONSubLista[x]["CREDITOSCONERROR"] + '</td>';
                cad += '     <td style="width:120px; text-align: right;">' + JSONSubLista[x]["SALDOCONERROR"] + '</td>';
                cad += '     <td style="width:100px; text-align: right;">' + JSONSubLista[x]["INDICEDECALIDAD"] + '</td>';
                cad += '     <td style="width:80px"><center><span class="' + (JSONSubLista[x]["SEMAFORO"] == 'WARNING' ? 'EstatusNaranja' : 'EstatusRojo') + '" title="' + JSONSubLista[x]["SEMAFORO"] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center></td>';
                cad += ' </tr>';
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
    cad += '     <td style="width:100px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["SALDO AFECTADO"] + '</td>';
    cad += '     <td style="width:120px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["PEDIDOS TOTALES"] + '</td>';
    cad += '     <td style="width:120px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["SALDO TOTAL"] + '</td>';
    cad += '     <td style="width:130px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["CREDITOSCONERROR"] + '</td>';
    cad += '     <td style="width:80px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["SALDOCONERROR"] + '</td>';
    cad += '     <td style="width:100px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["INDICEDECALIDAD"] + '</td>';
    cad += '     <td style="width:80px; background:white;"></td>';
    cad += '  </tr>';

    cad += '</table>';
    return cad;
}

function CreaTablaIncidenciasMetodologia_E3(listaDeJSON, fase, idMet, esSIC) {
    var encabezadoAux = '';
    var cad = '<center><table id="tblIncidencias" width="100%" class="dataGridDatos_PC">';
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
                    cad += "<span style='text-decoration: underline;color: blue;cursor:pointer' title='Descargar archivo .csv' " + ('onclick="DescargarRegistros_Txt(\'' + idMet + "\',\'" + "" + "\',\'" + listaDeJSON[filas].CLAVE + "\',\'" + "" + "\',\'" + fase + "\'," + esSIC + ",\'" + listaDeJSON[filas].NOMBRE + '\',false);"') + ">" + json[element] + "</span>";
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

//************************************************** 999999999999999999999999999999999999999 ***************************************************************

function DescargarTxtRegistrosAfectados_E3(iFuente, sClave, iFase, sNombre) {
    WaitingVtn("divBloqVtnVerIncidencias", true, true, "Cargando Información...");

    $("#divBloqVtnVerIncidencias").animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 20) + "px" });
    document.getElementById("imgVtnLoading").style.marginTop = "5%";

    var parametrosVerVal = {
        fechaPeriodo: $("#dpFechaPeriodoGral").val(),
        idFuente: iFuente,
        clave: sClave,
        fase: iFase,
    };

    peticionAjax("PanelDeControl.aspx/DescargarRegistros_Txt_Click", "POST", parametrosVerVal, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "" && parseInt(data.d.split('_')[0]) > 0) {
                __doPostBack('doPostBack_DescargarRegistros_Txt', $("#dpFechaPeriodoGral").val() + "," + sClave + "," + sNombre + "," + data.d.split('_')[1]);
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

var bCambio = true;
function MostarOcultarSubIncidencias_E5(obj) {
    if ($(obj).attr("alt") == "aa") {
        $("." + $(obj).attr("id").split("_")[1]).show();
        $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
            EstablecerTamanioVtn_E5();
    }
    else {
        $("." + $(obj).attr("id").split("_")[1]).hide();
        $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
        EstablecerTamanioVtn_E5();
    }
    $(obj).attr("alt", ($(obj).attr("alt") == "aa" ? "ab" : "aa"));
}

function EstablecerTamanioVtn_E5() {
    if (!bCambio) {
        $("#divVerIncidenciasMet").css("height", window.screen.height - 300);
        $("#divVerIncidenciasMet").parent().animate({ height: window.screen.height - 200 + "px" });
        $("#divVerIncidenciasMet").parent().animate({ height: window.screen.height - 230 + "px" });
        $("#divVerIncidenciasMet").parent().position({
            my: "center",
            at: "center",
            of: window
        });
    }
    else {
        $("#divVerIncidenciasMet").parent().animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 50) + "px" });
        $("#divVerIncidenciasMet").animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 70) + "px" });
        $("#divVerIncidenciasMet").parent().position({
            my: "center",
            at: "center",
            of: window
        });
    }
}

function estableceTamanioVacio()
{
    $("#divVerIncidenciasMet").parent().animate({ height: 200 + "px" });
    $("#divVerIncidenciasMet").parent().animate({ height:  130 + "px" });
    $("#divVerIncidenciasMet").parent().position({
        my: "center",
        at: "center",
        of: window
    });
}

/*************************************************************************/
function VerCedulaValidacioneEtapaIII(idFuente, idValidacion, fuente, validacion, idMet, fase, esSIC) {
    WaitingVtn("divBloqVtnVerValidacionesMet", true, false, "");
    WaitingVtn("divBloqVtnVerIncidencias", true, false, "");
    var cadena = '<div id="divBloqVtnVerCedulaValidacionesMet" style="width:96%;height:95%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">'
    cadena += '<div id="dvDetalleEITblVerCedulaValidacionesMet" style="width:100%;height:97%;overflow-y: auto;overflow-x: hidden;margin-top: 0px;">  ';
    cadena += '</div></div>';
    $("#divVtnVerCedulaValidacioneMet").empty();
    AgregarVtnFlotante("divVtnVerCedulaValidacioneMet", "btnEditaCedulaVal", "CÉDULA VALIDACIONES " + fuente + validacion != "undefined" ? (" (" + validacion.toUpperCase() + ")") : "", "", cadena, 550, 550, false, false, "Editar Cédula", "", function GuardarEditarCedulaValidacionesEtapaII() {
        if (document.getElementById("btnEditaCedulaVal") != null) {
            $(".ui-button-text").html('Guardar Cambios');
            $(".ui-button-text").attr("id", "btnSaveCedulaVal");
            CambiaAEditableCedulaValidaciones(true);

        } else {
            GuardarCedulaValidaciones(idFuente, idValidacion, fuente, validacion);
        }
    });
    WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "40%";
    var parametrosVerVal = {
        IdFuente: idFuente,
        idValidacion: (idValidacion != "" ? idValidacion : 0),
        idMet: idMet,
        fase: fase,
        fechaPeriodo: fechaP.split(",")[0] + fechaP.split(",")[1] + fechaP.split(",")[2],
        esSIC: esSIC,
        periodicidad: periocidadSelectXUser
    };

    peticionAjax("PanelDeControl.aspx/GetTableroMuestraCedulaValidacionesEIII", "POST", parametrosVerVal, function (data) {
        if (data.d == "" || data.d == null || data.d.indexOf("Error") != -1) {
            WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "Cargando Información...");
            $("#divVtnVerCedulaValidacioneMet").dialog("close");
            WaitingVtn("divBloqVtnVerValidacionesMet", true, false, "");
            WaitingVtn("divBloqVtnVerIncidencias", true, false, "");
            MostrarMsj((data.d == "" || data.d == null ? "Sin Datos." : data.d), "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
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
        var JSON = obtenerArregloDeJSON(data.d, false);
        $("#divVtnVerCedulaValidacioneMet").dialog("option", "title", "CÉDULA VALIDACIONES " + fuente + (JSON[0].DESCRIPCION.replace('&&', '\\') != undefined && JSON[0].DESCRIPCION.replace('&&', '\\') != "" ? " (" + JSON[0].DESCRIPCION.replace('&&', '\\') + ")" : "") + "\"" + (validacion != "undefined" ? validacion.toUpperCase() : (idFuente != undefined ? idFuente.toUpperCase() : "")) + "\"");
        $("#dvDetalleEITblVerCedulaValidacionesMet").html(generarTablaDeRegistrosCedulaVal(JSON));
        $("#payments").msDropdown();
        $("#payments2").msDropdown();
        document.getElementById("payments") != null ? document.getElementById("payments").style.height = "auto" : null;
        document.getElementById("payments2_child") != null ? document.getElementById("payments2_child").style.height = "auto" : null;
        WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "Cargando Información...");
    }, null);
    $("#divVtnVerCedulaValidacioneMet").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
        WaitingVtn("divBloqVtnVerIncidencias", false, false, "");
    });
}

function GuardarCedulaValidaciones(idFuente, idValidacion, fuente, validacion) {
    WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, true, "Guardando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "40%";
    var parametros = '';
    parametros = {
        IdFuente: idFuente,
        idValidacion: idValidacion,
        campo: $('#lbEdit_5').val(),
        estructura: $('#lbEdit_6').val() != undefined ? $('#lbEdit_6').val() : "",
        simbologia: $('#lbEdit_7').val(),
        afecta: $('#lbEdit_8').val(),
        implicaciones: $('#lbEdit_9').val(),
        envioIncidencia: $('#lbEdit_10').val(),
        responsable: $('#lbEdit_11').val(),
        enterado: $('#lbEdit_12').val(),
        requerimiento: $('#lbEdit_13').val(),
        subsidio: $('#lbEdit_14').val()
    }
    peticionAjax('PanelDeControl.aspx/EditaCedulaValidacionesEII', "POST", parametros, function GuardaCedula_Finish(data) {
        WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "Cargando Información...");
        if (data.d == "Error") {
            WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, false, "");
            MostrarMsj("Error al guardar.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
                WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "");
                $("#divVentanaMensajes").dialog("close");
            }, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "");
            });
            return;
        }
        $(".ui-button-text").attr("id", "btnEditaCedulaVal");
        $(".ui-button-text").html('Editar Cédula');
        CambiaAEditableCedulaValidaciones(false);
        $("#divVtnVerCedulaValidacioneMet").dialog("close");
        WaitingVtn("divBloqVtnVerValidacionesMet", true, false, "");
        WaitingVtn("divBloqVtnVerIncidencias", true, false, "");
        MostrarMsj("Información Almacenda Correctamente", " AVISO " + fuente + " (" + validacion.toUpperCase() + ")", false, true, false, "", "Aceptar", "", 280, 100, null, function () {
            WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
            WaitingVtn("divBloqVtnVerIncidencias", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
            WaitingVtn("divBloqVtnVerIncidencias", false, false, "");
        });
    }, null);
}

function CambiaAEditableCedulaValidaciones(esEditable) {
    if (esEditable == true) {
        $(".divInfo").hide();
        $(".divEdit").show();
    }
    else {
        $(".divInfo").show();
        $(".divEdit").hide();
    }
}

/******************************************************************************/

/*Agregado para la Carga MASIVA*/
function VerDetalleCargaMasiva() {
    var cadena = '<div id="divBloqVtnDetalleCargaMasiva" style="width:93%;height:85%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:95%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblCargaMasiva" style="width:100%;height:90%;overflow: auto;margin-top: 0px;">  </div>';
    cadena += '</div>';
    $("#divVtnDetalleCargaMasiva").empty();

    var faseMasiva = parseInt(IndicePestaniaHabilitada);
    var tituloMasiv = faseMasiva <= 3 ? 'DESCARGA' : (faseMasiva >= 4 && faseMasiva <= 6 ? 'VALIDACIONES' : 'VALIDACIONES');
    AgregarVtnFlotante("divVtnDetalleCargaMasiva", "", "DETALLE " + tituloMasiv + " MASIVA", "", cadena, 180, 200, false, false, "", "", null);
    WaitingVtn("divBloqVtnDetalleCargaMasiva", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "15%";

    peticionAjax("PanelDeControl.aspx/obtenerLogCargaMasiva", "POST", { etapa: faseMasiva }, function (data) {
        if (data.d == "" || data.d == null) {
            $('#divVtnDetalleCargaMasiva').html("No Existe " + tituloMasiv + " MASIVA en Proceso");
            $("#divVtnDetalleCargaMasiva").animate({ height: "50px" });
            $("#divVtnDetalleCargaMasiva").dialog("option", "width", "300");
        }
        else {
            var JSON = obtenerArregloDeJSON(data.d, false);
            $("#dvDetalleEITblCargaMasiva").html(creaTablaDetalleCargaMasiva(JSON));
        }
        WaitingVtn("divBloqVtnDetalleCargaMasiva", false, false, "Cargando Información...");
    }, null);
}

function creaTablaDetalleCargaMasiva(listaDeJSON) {
    var cad = '<table  class="dataGridDatos" style="width: 100%;font-size: 10px;">';
    cad += '<thead>';
    cad += '<tr>';
    for (var encabezados in listaDeJSON[0]) {
        if (encabezados != "EstatusError") {
            cad += '<th style="text-align: center;" class>';
            cad += encabezados.toString();
            cad += '</th>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element != "EstatusError") {
                cad += '<td style="text-align:' + (element != "Estatus" ? "left;" : "center;") + '">';
                cad += element == "Estatus" ? '<span ' + (json[element] == "3" ? ' title="Clic para ver Detalle" style="cursor:pointer;" onclick="mostrarDetalleEstatusCargaMasiva(this);" alt="' + listaDeJSON[filas].EstatusError + "%%&&" + listaDeJSON[filas]["Fecha Corte"] + '" ' : ' ') + 'class="' + DeterminaEstatusDeId(json[element]) + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' : json[element];
                cad += '</td>';
            }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table>';
    return cad;
}

function mostrarDetalleEstatusCargaMasiva(obj) {
    WaitingVtn("divBloqVtnVerValidacionesMet", true, false, "Cargando Información...");
    MostrarMsj("<center><table class='dataGridDatos'><tr><th >Detalle</th><tr><tr class='row'><td style='padding: 3px;'>" + $(obj).attr("alt").split("%%&&")[0] + "</td></tr></table></center>", "Detalle Estatus (" + $(obj).attr("alt").split("%%&&")[1] + ")", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
        $("#divVentanaMensajes").dialog("close");
    }, null);
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
    });
}

function verArchivoExcelSIC(idFuente) {
    var nameMesesAbrev = new Array(
        "ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
        );

    var param = {
        anio: fechaP.split(',')[0].substring(2),
        mes: fechaP.split(',')[1],
        dia: fechaP.split(',')[2],
        idFuente: idFuente
    }

    peticionAjax("PanelDeControl.aspx/ExisteArchivoSIC", "POST", param, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d == "1") {
                WaitingVtn("divBloqVtnVerIncidencias", true, true, "Cargando Información...");
                __doPostBack('DescargarArchivoSIC', fechaP.split(',')[0] + "," + fechaP.split(",")[1] + "," + nameMesesAbrev[parseInt(fechaP.split(",")[1]) - 1] + "," + fechaP.split(",")[2] + "," + idFuente);
                setTimeout(terminarWait, 10000);
            }
            else if (data.d == "0")
                MostrarMsj('No Existe el Archivo <span style="font-weight:bold;"> SIC300.D' + fechaP.split(',')[0].substring(2) + fechaP.split(',')[1] + fechaP.split(",")[2] + ' </span>', " Mensaje", false, true, false, "", "Aceptar", "", 280, 130, null, null, null);
        }
        else
            MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 130, null, null, null);
    }, null);
}

function BtnsVerIncidenciasSIC_Click(obj) {
    var cadena = '<div id="divBloqVtnVerValidacionesMet" style="width:97%;height:90%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleFormularioVerValidacionesMet" style="width:100%;height:95%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblVerValidacionesMet" style="width:100%;height:90%;overflow: auto;margin-top: 0px;">  </div>';
    cadena += '<div id="divBtn" style="width:100%;height:5%;"><input type="button" class="classButton" value="Descargar Todas las Incidencias" onclick="DescargarTxtRegistrosAfectados(17,\'\',\'\',\'\',1,true,\'Incidencias Totales\',true);" /></div>'
    cadena += '</div>';
    $("#divVtnVerValidacioneMet").empty();
    AgregarVtnFlotante("divVtnVerValidacioneMet", "", "INCIDENCIAS " + $(obj).attr("id").split("_")[3].split("%%%")[0].split("&&&")[0], "", cadena, 300, 650, false, false, "", "", null);
    WaitingVtn("divBloqVtnVerValidacionesMet", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "15%";
    var parametrosVerVal = { fechaPeriodo: fechaP.split(",")[0] + fechaP.split(",")[1] + fechaP.split(",")[2], periodicidad: periocidadSelectXUser, noColumna: 0, opcion: "1", fase: $(obj).attr("id").split('-')[1].split('_')[0] };

    peticionAjax("PanelDeControl.aspx/DatosSIC", "POST", parametrosVerVal, function (data) {
        WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "Cargando Información...");
        if (data.d == "" || data.d == null) {
            $('#dvDetalleEITblVerValidacionesMet').html("Sin Incidencias");
            $("#divVtnVerValidacioneMet").animate({ height: "50px" });
            $("#divVtnVerValidacioneMet").dialog("option", "width", "300");
            return;
        }
        var JSON = obtenerArregloDeJSON(data.d, false);
        $("#dvDetalleEITblVerValidacionesMet").html(CreaTablaIncidenciasMetodologia1(JSON, "1", "17", true));
    }, null);
}

function BtnsVerValidacionesSIC_Click(obj) {
    var cadena = '<div id="divBloqVtnVerValidacionesMet" style="width:97%;height:90%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleFormularioVerValidacionesMet" style="width:100%;height:95%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblVerValidacionesMet" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">  ';
    cadena += '</div></div>';
    $("#divVtnVerValidacioneMet").empty();
    AgregarVtnFlotante("divVtnVerValidacioneMet", "", "VALIDACIONES " + $(obj).attr("id").split("_")[3].split("%%%")[0].split("&&&")[0], "", cadena, 300, 650, false, false, "", "", null);
    WaitingVtn("divBloqVtnVerValidacionesMet", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "15%";
    var parametrosVerVal = { fase: $(obj).attr("id").split('-')[1].split('_')[0], idMet: $(obj).attr("id").split('&&&')[1], fechaPeriodo: fechaP.split(",")[0] + fechaP.split(",")[1] + fechaP.split(",")[2], periodicidad: periocidadSelectXUser };

    peticionAjax("PanelDeControl.aspx/VerValidacionesMetodologias", "POST", parametrosVerVal, function (data) {
        WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "Cargando Información...");
        if (data.d == "" || data.d == null) {
            $('#dvDetalleEITblVerValidacionesMet').html("Sin Datos");
            $("#divVtnVerValidacioneMet").animate({ height: "50px" });
            $("#divVtnVerValidacioneMet").dialog("option", "width", "300");
            return;
        }
        var JSON = obtenerArregloDeJSON(data.d, false);
        $("#dvDetalleEITblVerValidacionesMet").html(CreaTablaIncidenciasMetodologia1(JSON, "1", "17", true));
    }, null);
}

function AgregarComboReporteria(agregarCmbReporteria) {
    var cadena = '';
    if (agregarCmbReporteria) {
        cadena += '<td > <select id="sel" style="font: normal 10px Helvetica, Arial, sans-serif;">';
        cadena += ' <option value="All">Todos Por Prioridad</option> <option value="RA">Reportes A</option> <option value="RB">Reportes B</option>';
        cadena += ' <option value="RC">Reportes C</option> <option value="Anexos30">Anexos 30</option> <option value="Anexos31">Anexos 31</option>';
        cadena += ' <option value="R04C442">R04C442</option> <option value="R04C443">R04C443</option> </select> </td>';
    }
    return cadena;
}
function BtnsProgramarDescargas_Click(obj) {
    if ($("#" + $(obj).attr('id').split('_')[1].split('-')[0]).attr("class") == "EstatusAmarillo") { MostrarMsj("Existe un proceso " + $(obj).attr("id").split("&&&")[0].split("_")[3] + " en ejecución. Intente mas tarde. ", " AVISO " + $(obj).attr("id").split("&&&")[0].split("_")[3], false, true, false, "", "Aceptar", "", 320, 120, null, null, null); return; }
    var IdFuenteObt = $(obj).attr("id").split("&&&")[1];
    var conexion = IdFuenteObt == 1 || IdFuenteObt == 2 || IdFuenteObt == 3 || IdFuenteObt == 4 || IdFuenteObt == 9 || IdFuenteObt == 11 || IdFuenteObt == 16 || IdFuenteObt == 17 ? "164" : (IdFuenteObt == 5 || IdFuenteObt == 6 || IdFuenteObt == 7 || IdFuenteObt == 8 ? "65" : "");
    if (conexion != "") {
        Waiting(true, "Cargando Información...");
        var parametros = { fuente: IdFuenteObt, periodicidad: periocidadSelectXUser, idPais: PaisSelectXUser };
        peticionAjax("PanelDeControl.aspx/ConsultaControlDescargasProgramadas" + conexion, "POST", parametros,
        function ConsultaControlDescargasProgramadas_Finish(result) {
            Waiting(false, "Cargando Información...");
            if (result.d == '{"SinDatos":"No se encontraron datos"}') { MostrarMsj("Sin acceso a datos. ", "Mensaje", false, true, false, "", "Aceptar", "", 250, 100, null, function () { $("#divVentanaMensajes").dialog("close"); /* $(".ui-widget-overlay").hide() */ }, null); return; }
            if (result.d == "0&&&0&&&0") {
                AgregaVtnDescarga(IdFuenteObt, $(obj).attr("id").split("&&&")[0].split("_")[3], conexion, "");
            }
            else {
                IdFuenteProgDescarga = IdFuenteObt; muestraMsjVtnProgDesc = true;
                MostrarMsj("La última descarga para " + $(obj).attr("id").split("&&&")[0].split("_")[3] + " es:</br> Día:" + result.d.split("&&&")[0] + "</br> Hora:" + result.d.split("&&&")[1] + "</br> Inf. Solicitada:" + result.d.split("&&&")[2] + "</br> Tiempo Restante:<span id='spanTiempoRestante' style ='color:#912E3A;font-weight: bold;'>" + (result.d.split("&&&")[3].indexOf(":") != -1 ? result.d.split("&&&")[3] : "No hay descargas pendientes") + "</span></br></br> ¿Desea Reprogramarla? ", "PROGRAMAR DESCARGA " + $(obj).attr("id").split("&&&")[0].split("_")[3], true, true, false, "Si", "No", "", 330, 200,
                    function () {
                        muestraMsjVtnProgDesc = false;
                        $("#divVentanaMensajes").dialog("close");
                        AgregaVtnDescarga(IdFuenteObt, $(obj).attr("id").split("&&&")[0].split("_")[3], conexion, result.d.split("&&&")[1]);
                    }, function () {
                        muestraMsjVtnProgDesc = false;
                        $("#divVentanaMensajes").dialog("close");
                    }, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) { muestraMsjVtnProgDesc = false; });
                if (result.d.split("&&&")[3].indexOf(":") != -1) ConsultaHoraFaltanteDescarga();
            }
        }, null);
    }
}

var IdFuenteProgDescarga = 0; var tiempoForaFaltante; var muestraMsjVtnProgDesc = false;
function ConsultaHoraFaltanteDescarga() {
    if (muestraMsjVtnProgDesc) {
        var conexion = IdFuenteProgDescarga == 1 || IdFuenteProgDescarga == 2 || IdFuenteProgDescarga == 3 || IdFuenteProgDescarga == 4 || IdFuenteProgDescarga == 9 || IdFuenteProgDescarga == 11 || IdFuenteProgDescarga == 16 ? "164" : (IdFuenteProgDescarga == 5 || IdFuenteProgDescarga == 6 || IdFuenteProgDescarga == 7 || IdFuenteProgDescarga == 8 ? "65" : "");
        var parametros = { fuente: IdFuenteProgDescarga, periodicidad: periocidadSelectXUser, idPais: PaisSelectXUser };
        peticionAjax("PanelDeControl.aspx/ConsultaControlDescargasProgramadas" + conexion, "POST", parametros,
        function ConsultaControlDescargasProgramadas_Finish(result) {
            if (result.d != "0&&&0&&&0") {
                document.getElementById("spanTiempoRestante").innerHTML = result.d.split("&&&")[3].indexOf(":") != -1 ? result.d.split("&&&")[3] : "No hay descargas pendientes";
                if (result.d.split("&&&")[3].indexOf(":") != -1)
                    tiempoForaFaltante = setTimeout(ConsultaHoraFaltanteDescarga, 10000);
                else
                    clearTimeout(tiempoForaFaltante);
            }
        }, null);
    }
    else clearTimeout(tiempoForaFaltante);
}

function AgregaVtnDescarga(IdFuente, DefFuente, conexion, HHMMSS) {
    var cadena = '<div id="divBloqVtnProgDescarga" style="width:94.3%;height:76%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;"><table style="width: 100%">';
    cadena += ' <tr style="text-align: left;"><td> Fecha Requerida: </td> <td><input class="periodo" type="text" id="txtCalendarioFR" value="' + fechaP.split(',')[2] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[0] + '" style="width: 80%;"/> </td></tr><tr style="height: 5px;"></tr>';
    cadena += '<tr style="text-align: left;"><td> Hora Descarga: </td> <td style="font-weight: bold;">&nbsp;&nbsp;';
    cadena += 'HH <input maxlength="2" id="txtHH" value="00"  style="background-color:White;color:rgb(153, 153, 153); width:45px; text-align:center;border:1px solid Gray" onkeydown="return FilterInputNumAndAlfa(event, false);" onfocus="this.value=(this.value==\'00\' || trim(this.value,\'\')==\'\'? \'\':this.value);this.style.color=\'#000000\'"  onblur="this.value=(trim(this.value,\'\')!=\'\' && trim(this.value,\'\')!=\'0\'?this.value:\'00\');this.style.color=(this.value!=\'\' &&this.value!=\'00\'?\'#000000\':\'#999999\')"/>&nbsp;<b>:</b>&nbsp;';
    cadena += 'MM <input maxlength="2" id="txtMM" value="00"  style="background-color:White;color:rgb(153, 153, 153);  width:45px; text-align:center;border:1px solid Gray" onkeydown="return FilterInputNumAndAlfa(event, false);" onfocus="this.value=(this.value==\'00\' || trim(this.value,\'\')==\'\'? \'\':this.value);this.style.color=\'#000000\'"  onblur="this.value=(trim(this.value,\'\')!=\'\' && trim(this.value,\'\')!=\'0\'?this.value:\'00\');this.style.color=(this.value!=\'\' &&this.value!=\'00\'?\'#000000\':\'#999999\')"/>'; //&nbsp;<b>:</b>&nbsp;';
    cadena += '</td></tr> </table></div>';

    AgregarVtnFlotante("divProgramarDescargas", IdFuente, "PROGRAMAR DESCARGA " + DefFuente, "", cadena, 150, 330, true, false, "Programar", "", function () {
        var fechaReq = $("#txtCalendarioFR").val().split("/")[2] + "/" + $("#txtCalendarioFR").val().split("/")[1] + "/" + $("#txtCalendarioFR").val().split("/")[0];
        var T0HH = trim($('#txtHH').val(), ''); var T0MM = trim($('#txtMM').val(), ''); // var T0SS = trim($('#txtSS').val(), '');
        if (T0HH != "" || T0MM != "") {
            document.getElementById("txtHH").style.borderColor = "1px solid Gray";
            document.getElementById("txtHH").style.borderColor = "1px solid Gray";
            var horaDesc = (T0HH.length == 2 ? T0HH : T0HH.length == 1 ? "0" + T0HH : "00") + ':' + (T0MM.length == 2 ? T0MM : T0MM.length == 1 ? "0" + T0MM : "00") + ':00' //+ (T0SS.length == 2 ? T0SS : T0SS.length == 1 ? "0" + T0SS : "00");
            if (horaDesc == "00:00:00") {
                WaitingVtn("divBloqVtnProgDescarga", true, false, "", "24");
                WaitingVtn("divBloqVtnProgDescargaBtns", true, false, "", "24");
                MostrarMsj("<span style='font-weight: bold;'>HH</span> o <span style='font-weight: bold;'>MM</span> deben ser mayor a 0.", " AVISO " + DefFuente, false, true, false, "", "Aceptar", "", 280, 120, null, function () {
                    WaitingVtn("divBloqVtnProgDescarga", false, false, "");
                    WaitingVtn("divBloqVtnProgDescargaBtns", false, false, "");
                    $("#divVentanaMensajes").dialog("close");
                }, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnProgDescarga", false, false, "");
                    WaitingVtn("divBloqVtnProgDescargaBtns", false, false, "");
                });
                return;
            }
            var parametrosProgDescargaFuente = { fuente: IdFuente, fechaReqArchivo: fechaReq, horaDescarga: horaDesc, periodicidad: periocidadSelectXUser, nameFile: ($("#txtNombreFile_" + IdFuente).val() != undefined ? $("#txtNombreFile_" + IdFuente).val() : ""), usuario: userLogin, idPais: PaisSelectXUser };
            peticionAjax("PanelDeControl.aspx/ProgramaDescargasFuente" + conexion, "POST", parametrosProgDescargaFuente,
                            function ProgramaDescargasFuente_Finish(resultXS) {
                                var arrayRes = obtenerArregloDeJSON(resultXS.d, false);
                                if (arrayRes[0].Column1 == '1' || resultXS.d == "1") {
                                    $("#divProgramarDescargas").dialog("close");
                                    MostrarMsj("Se ha programado exitosamente la descarga", " AVISO " + DefFuente, false, true, false, "", "Aceptar", "", 280, 130, null, null, null);
                                }
                                else {
                                    if (arrayRes[0].Column1 == '0') {
                                        WaitingVtn("divBloqVtnProgDescarga", true, false, "", "24");
                                        WaitingVtn("divBloqVtnProgDescargaBtns", true, false, "", "24");
                                        MostrarMsj("La descarga para " + DefFuente + " debe de ser programada de 8:00 pm a 3:00 am", " AVISO " + DefFuente, false, true, false, "", "Aceptar", "", 300, 140, null, function () {
                                            WaitingVtn("divBloqVtnProgDescarga", false, false, "");
                                            WaitingVtn("divBloqVtnProgDescargaBtns", false, false, "");
                                            $("#divVentanaMensajes").dialog("close");
                                        }, null);
                                        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                                            WaitingVtn("divBloqVtnProgDescarga", false, false, "");
                                            WaitingVtn("divBloqVtnProgDescargaBtns", false, false, "");
                                        });
                                    }
                                    else {
                                        WaitingVtn("divBloqVtnProgDescarga", true, false, "", "24");
                                        WaitingVtn("divBloqVtnProgDescargaBtns", true, false, "", "24");
                                        MostrarMsj("Error al programar la descarga.", " AVISO " + DefFuente, false, true, false, "", "Aceptar", "", 280, 130, null, function () {
                                            WaitingVtn("divBloqVtnProgDescarga", false, false, "");
                                            WaitingVtn("divBloqVtnProgDescargaBtns", false, false, "");
                                            $("#divVentanaMensajes").dialog("close");
                                        }, null);
                                        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                                            WaitingVtn("divBloqVtnProgDescarga", false, false, "");
                                            WaitingVtn("divBloqVtnProgDescargaBtns", false, false, "");
                                        });
                                    }
                                }
                            }, null);
        }
        else {
            if (T0HH == "") document.getElementById("txtHH").style.border = "1px solid Red";
            if (T0MM == "") document.getElementById("txtMM").style.border = "1px solid Red";
        }
    });
    $(".ui-dialog-buttonset").parent().append('<div id="divBloqVtnProgDescargaBtns" style="width:91.2%;height:19%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none;padding:5px;margin-left:5px;margin-top:-11px">');
    $(".periodo").datepicker();
}

function AgregarFilas_AVentanaPorSucursal(obj) {
    var filaAgregar = "<tr> <td><input type='text' class='noSucursales_" + $(obj).attr("id").split('_')[1] + "' /></td>" + "<td><input type='text' class='periodo_" + $(obj).attr("id").split('_')[1] + "'/></td>" +
     "<td class='eliminar'>&nbsp;Eliminar</td></tr>";
    $("#tablaSucursales_" + $(obj).attr("id").split('_')[1]).append(filaAgregar);
    $(".periodo_" + $(obj).attr("id").split('_')[1]).datepicker();
}

var entroCloseXsucursal = false;
function ShowHideVentanaDialogo_PorSucursales(objCheck) {
    entroCloseXsucursal = false;
    if ($(objCheck).attr("checked") == "checked") {
        var cadena = '<div id="divBloqVtnXSucursal" style="width:95%;height:85%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"></div>' + "<div class='VentanitaH' style='height:82%'><table id='tablaSucursales_" + $(objCheck).attr("id").split("_")[1] + "' class='tablaSucursales'><thead><tr><th>No.Sucursal</th><th>Periodo</th><th>&nbsp;</th></tr></thead>";
        cadena += "<tbody><tr><td><input type='text' class='noSucursales_" + $(objCheck).attr("id").split("_")[1] + "' style='margin-top:5px' /></td><td><input type='text' class='periodo' style='margin-top:5px' /></td><td class='eliminar" + "'>&nbsp;Eliminar</td>";
        cadena += "</tr></tbody> </table></div> ";
        $("#divSucursalesSinTransmitir").show();
        $("#divSucursalesSinTransmitir").empty();
        $("#divSucursalesSinTransmitir").html(cadena);
        AgregarVtnFlotante("divSucursalesSinTransmitir", "btnEjecutarXSucursal%%%" + $(objCheck).attr("id"), "SUCURSALES SIN TRANSMITIR " + $(objCheck).attr("id").split("_")[2].split("&&&")[0], "", cadena, 200, 350, true, false, "Ejecutar", "", function () {
            EjecutaJobCredimaxPorSucursales_Click();
        });
        $(".periodo").datepicker();
        $(".ui-dialog-buttonset").parent().append("<div style='text-align:left;margin-top:5px'><input type='button' id='btnAgregarFilas_" + $(objCheck).attr("id").split("_")[1] + "' onclick='AgregarFilas_AVentanaPorSucursal(this)' value=' Agregar fila' class='classButton' style='padding:4px;margin-left:5px'/></div>");
        $("#divSucursalesSinTransmitir").on("dialogclose", function (event, ui) {
            if (!entroEjecutarXSucursal && !entroCloseXsucursal) { $(objCheck).removeAttr("checked"); entroCloseXsucursal = true; } else if (!entroCloseXsucursal) { entroEjecutarXSucursal = false; entroCloseXsucursal = true; }
        });
        $(".ui-dialog-buttonset").parent().append('<div id="divBloqVtnXSucursalBtns" style="width:92.3%;height:14%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none;padding:5px;margin-left:5px;margin-top:-36px">');
    }
    else {
    }
}

var esPadre = false; var idMetActualizaCheck = ''; var idMetStatusActualizaCheck = '';
function imgChech_ckeck(obj) {
    var arregloIterarChk = $(obj).attr("id").indexOf("Calf") != -1 ? arregloIdsImgsOmitirCalf : ($(obj).attr("id").indexOf("Val1") != -1 ? arregloIdsImgsOmitirValidF5 : ($(obj).attr("id").indexOf("Val2") != -1 ? arregloIdsImgsOmitirValidF6 : ($(obj).attr("id").indexOf("Val3") != -1 ? arregloIdsInicioAutomatico : ($(obj).attr("id").indexOf("Val4") != -1 ? arregloIdsImgsOmitirValidF8 : ($(obj).attr("id").indexOf("Val5") != -1 ? arregloIdsImgsEnvioAutomatico : arregloIdsInicioAutomaticoRep)))));
    if ($(obj).attr("lang") == "aa") {
        document.getElementById($(obj).attr("id")).setAttribute('src', '../../Images/PanelDeControl/Expander/checkG.png');
    }
    else if ($(obj).attr("lang") == "ab") {
        document.getElementById($(obj).attr("id")).setAttribute('src', '../../Images/PanelDeControl/Expander/uncheck.png');
    }
    else {
        if (esPadre == true) { document.getElementById($(obj).attr("id")).setAttribute('src', '../../Images/PanelDeControl/Expander/indeterminated.png'); }
        else { $("#" + $(obj).attr("id").split("_")[0]).attr("lang", "aa"); document.getElementById($(obj).attr("id")).setAttribute('src', '../../Images/PanelDeControl/Expander/checkG.png'); }
    }

    if ($(obj).attr("lang") != "ace")
        $(obj).attr("lang", ($(obj).attr("lang") == "aa" ? "ab" : "aa"));

    if ($(obj).attr("id") == $(obj).attr("id").split("_")[0] && ($(obj).attr("lang") == "aa" || $(obj).attr("lang") == "ab") && !esPadre) {
        for (var i = 0; i < arregloIterarChk.length; i++) {
            if (i == 0) {
                idMetActualizaCheck = arregloIterarChk[i].split("_")[2] + ",";
                idMetStatusActualizaCheck = $(obj).attr("lang") == "aa" ? "0" : "1" + ",";
            }
            else {
                idMetActualizaCheck += arregloIterarChk[i].split("_")[2] + ",";
                idMetStatusActualizaCheck += $(obj).attr("lang") == "aa" ? "0" : "1" + ",";
            }
            esPadre = true;
            $("#" + arregloIterarChk[i]).attr("lang", ($(obj).attr("lang") == "aa" ? "ab" : "aa"));
            imgChech_ckeck(document.getElementById(arregloIterarChk[i]));
        }
        var indexOpcionCampo = $(obj).attr("id").indexOf("Calf") != -1 ? "1" : ($(obj).attr("id").indexOf("Val1") != -1 ? "2" : ($(obj).attr("id").indexOf("Val2") != -1 ? "3" : ($(obj).attr("id").indexOf("Val3") != -1 ? "0" : ($(obj).attr("id").indexOf("Val4") != -1 ? "0" : ($(obj).attr("id").indexOf("Val5") != -1 ? "1" : "2")))));
        var indexOpcionTblCatP = $(obj).attr("id").indexOf("Calf") != -1 || $(obj).attr("id").indexOf("Val1") != -1 || $(obj).attr("id").indexOf("Val2") != -1 || $(obj).attr("id").indexOf("Val3") != -1 ? "0" : "1";
        var cadenaIdsMetRep = indexOpcionTblCatP == "0" ? GeneraCadenaIdsStatusMetRep(DefinicionesMetodologiaTemp) : GeneraCadenaIdsStatusMetRep(DefinicionesReporteriaTemp);
        ActualizaStatusCheckOmitir(idMetActualizaCheck == "" ? cadenaIdsMetRep.split("&&")[0] : idMetActualizaCheck, idMetStatusActualizaCheck == "" ? ($(obj).attr("lang") == "aa" ? cadenaIdsMetRep.split("&&")[1] : cadenaIdsMetRep.split("&&")[2]) : idMetStatusActualizaCheck, indexOpcionCampo, indexOpcionTblCatP);
    }

    else if (!esPadre) {
        var vecesAA = 0; var vecesAB = 0;
        for (var i = 0; i < arregloIterarChk.length; i++) {
            if ($("#" + arregloIterarChk[i]).attr("lang") == "aa") vecesAA++;
            else vecesAB++;
        }
        if (vecesAA == arregloIterarChk.length)
            $("#" + $(obj).attr("id").split("_")[0]).attr("lang", "ab");
        else if (vecesAB == arregloIterarChk.length)
            $("#" + $(obj).attr("id").split("_")[0]).attr("lang", "aa");
        else
            $("#" + $(obj).attr("id").split("_")[0]).attr("lang", "ace");
        esPadre = true;
        imgChech_ckeck(document.getElementById($(obj).attr("id").split("_")[0]));
        idMetActualizaCheck = $(obj).attr("id").split("_")[2] + ",";
        idMetStatusActualizaCheck = $(obj).attr("lang") == "aa" ? "0" : "1" + ",";
        var indexOpcionCampo = $(obj).attr("id").indexOf("Calf") != -1 ? "1" : ($(obj).attr("id").indexOf("Val1") != -1 ? "2" : ($(obj).attr("id").indexOf("Val2") != -1 ? "3" : ($(obj).attr("id").indexOf("Val3") != -1 ? "0" : ($(obj).attr("id").indexOf("Val4") != -1 ? "0" : ($(obj).attr("id").indexOf("Val5") != -1 ? "1" : "2")))));
        var indexOpcionTblCatP = $(obj).attr("id").indexOf("Calf") != -1 || $(obj).attr("id").indexOf("Val1") != -1 || $(obj).attr("id").indexOf("Val2") != -1 || $(obj).attr("id").indexOf("Val3") != -1 ? "0" : "1";
        ActualizaStatusCheckOmitir(idMetActualizaCheck, idMetStatusActualizaCheck, indexOpcionCampo, indexOpcionTblCatP);
    }
    esPadre = false;
}

function GeneraCadenaIdsStatusMetRep(ArrayDefMetRep) {
    var cadenaIds = ""; var cadenaStatus1 = ""; var cadenaStatus0 = "";
    for (var i = 1; i < ArrayDefMetRep.length + 1; i++) {
        cadenaIds += i + ",";
        cadenaStatus0 += "0,";
        cadenaStatus1 += "1,";
    }
    return cadenaIds + "&&" + cadenaStatus0 + "&&" + cadenaStatus1;
}

var actualizaArreglo = false;
function ActualizaStatusCheckOmitir(IdsMetP, IdsStatusMetP, opcionCampoP, OpcionTblCatP) {
    Waiting(true, "Espere por favor. Cargando Información...");
    var parametrosActualizaStatusCheckOmitir = { IdsMet: IdsMetP, IdsStatusMet: IdsStatusMetP, opcionCampo: opcionCampoP, OpcionTblCat: OpcionTblCatP };
    peticionAjax("PanelDeControl.aspx/ActualizaStatusCheckOmitir", "POST", parametrosActualizaStatusCheckOmitir,
        function ActualizaStatusCheckOmitir_finish(data) {
            idMetActualizaCheck = ''; idMetStatusActualizaCheck = '';
            ActualizaEstatusCheckPadreHijosOmitir("", "");
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
}

function DeterminaSiNumParImpar(numero) {
    var result = '';
    if (numero % 2 == 0) result = 'Par';
    else result = 'Impar';
    return result;
}


