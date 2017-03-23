
function GetFechaSistemaParaPeriocidad() {
    var fechaCorteAnterior = "";
    document.getElementById("divPanelMain") != null ? document.getElementById("divPanelMain").style.height = (parseInt(document.documentElement.clientHeight - 190) - parseInt(document.getElementById("tblTituloMain").offsetHeight)) + "px" : null; //Calificacion/PanelDeControl.aspx                        
    document.getElementById("tdTitle").innerHTML = periocidadSelectXUser == 1 ? (esOpcionTableroXUser == "1" ? "PANEL DE CONTROL" : "MONITOREO DE PROCESOS") + " MENSUAL" : (periocidadSelectXUser == 2 ? (esOpcionTableroXUser == "1" ? "PANEL DE CONTROL" : "MONITOREO DE PROCESOS") + " SEMANAL" : (esOpcionTableroXUser == "1" ? "PANEL DE CONTROL" : "MONITOREO DE PROCESOS") + " DIARIO");
    var parametrosGFS = { PeriocidadSet: periocidadSelectXUser };
    peticionAjax("PanelDeControl.aspx/GetFechaCorteYAnteriorXPeriocidad", "POST", parametrosGFS,
    function GetFechaSistemaParaPeriocidad_finish(data) {
        Waiting(true, "Espere por favor. Cargando Información...");
        WidtDatePicker();
        CargaBtnsYChecksIntermediosXPerfil();
        fechaP = data.d.split("%%&&")[0].split(",")[2] + "," + data.d.split("%%&&")[0].split(",")[1] + "," + data.d.split("%%&&")[0].split(",")[0];
        fechaCorteAnterior = data.d.split("%%&&")[1].split(",")[2] + "," + data.d.split("%%&&")[1].split(",")[1] + "," + data.d.split("%%&&")[1].split(",")[0];
        AsignaFechaSelect();
        $("#dpFechaPeriodoGral").attr("value", fechaP.split(',')[2] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[0]);
        getLogCargaMasiva();
        GetUserLogin();
    }, null);
}

function CargaBtnsYChecksIntermediosXPerfil() {
    if (PerfilUser == "35" || PerfilUser == "17") {
        $("#btnAgendaDescargaE1").attr("disabled", true);
        $("#btnAgendaDescargaE1").attr('class', 'classButtonDis');
        $("#btnDetalleSaldosE1").attr("disabled", true);
        $("#btnDetalleSaldosE1").attr('class', 'classButtonDis');
        $("#tdOmitirCalfE2").hide();
        $("#btnAgendaProcesosE2").attr("disabled", true);
        $("#btnAgendaProcesosE2").attr('class', 'classButtonDis');
        $("#tdOmitirValidacionE2F5").hide();
        $("#btnDetalleSaldosE2").attr("disabled", true);
        $("#btnDetalleSaldosE2").attr('class', 'classButtonDis');
        $("#tdOmitirValidacionE2F6").hide();
        $("#tdInicioAutomaticoE2").hide();
        $("#btnAgendaReportes").attr("disabled", true);
        $("#btnAgendaReportes").attr('class', 'classButtonDis');
        $("#tdOmitirValidacionE3").hide();
        $("#tdEnvioAutomatico").hide();
        $("#tdInicioAutomatico").hide();
    }
}

var mostrarBtnDetalleCargaMasiva = false;
function getLogCargaMasiva() {
    var faseMasiva = parseInt(IndicePestaniaHabilitada);
    peticionAjax("PanelDeControl.aspx/obtenerLogCargaMasiva", "POST", { etapa: faseMasiva },
    function (data) {
        if (data.d != "") {
            mostrarBtnDetalleCargaMasiva = true;
            $(".divDetalleCargaMasiva").css("display","inline");
            if (document.getElementById("dvDetalleEITblCargaMasiva") != null) {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#dvDetalleEITblCargaMasiva").html(creaTablaDetalleCargaMasiva(JSON));
            }
        }
        else {
            $('#divVtnDetalleCargaMasiva').html("No Existe Descarga MASIVA en Proceso");
            mostrarBtnDetalleCargaMasiva = false;
            $(".divDetalleCargaMasiva").hide();
        }
        setTimeout(getLogCargaMasiva, 10000);
    }, null);
}

var userLogin = ""; var FechaActualSistema = "";
 function GetUserLogin() {
     
    peticionAjax("PanelDeControl.aspx/GetSession", "POST", null,
    function GetUserLogin_finish(resultUser) {
        userLogin = resultUser.d;
        peticionAjax("PanelDeControl.aspx/DevuelveFechaActual", "POST", null,
        function (dateFecha) {
            FechaActualSistema = dateFecha.d;
            if (esOpcionTableroXUser == "1") { DeteminaFechaValidaBtnMiniAgenda(); Panel.activaGetEncabezados();}
            else ObtenerCatalogoFuentesMonitoreo()
        }, null);
    }, null);
 }
 var index = 0;


var AgregarBtnMiniAgenda;
function DeteminaFechaValidaBtnMiniAgenda() {
    var parametros = { fechaT0Select: fechaP };
    peticionAjax('PanelDeControl.aspx/ValidaFechaValidaBtnMiniAgenda', "POST", parametros,
        function DeteminaFechaValidaBtnMiniAgenda_Finaliza(data) {
            AgregarBtnMiniAgenda = data.d;
            if (AgregarBtnMiniAgenda) {
                $(".classButtonDisMiniAgenda").removeAttr("disabled");
                $(".classButtonDisMiniAgenda").attr("class", "classButtonEnabledMiniAgenda");
            }
            else {
                $(".classButtonEnabledMiniAgenda").attr("disabled", "disabled");
                $(".classButtonEnabledMiniAgenda").attr("class", "classButtonDisMiniAgenda");
            }
        },
        null);
}

var ArrayFuenteEstatus;
var arrayJSON; 
function LlenaArregloFuentes_Finaliza(data) {
   
    var DefinicionesFuentesCartera;
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
            if (arrayJSON[x].Clasificacion == 'FUENTE DE CARTERA' || arrayJSON[x].Clasificacion == 'FUENTE') {
                DefinicionesFuentesCartera.push(arrayJSON[x].Fuente + "%%%" + arrayJSON[x].FSId_Fuente + '&&' + arrayJSON[x].Clasificacion + '&&' + arrayJSON[x].EstatusBloqueo);
            }
            if (arrayJSON[x].Clasificacion == 'INSUMOS DEL PROCESO')
                DefinicionesInsumos.push(arrayJSON[x].Fuente + "%%%" + arrayJSON[x].FSId_Fuente + '&&' + arrayJSON[x].Clasificacion + '&&' + arrayJSON[x].EstatusBloqueo);
            if (arrayJSON[x].Clasificacion == 'COMPLEMENTO SICRENET')
                DefinicionesComplemento.push(arrayJSON[x].Fuente + "%%%" + arrayJSON[x].FSId_Fuente + '&&' + arrayJSON[x].Clasificacion + '&&' + arrayJSON[x].EstatusBloqueo);
            agregar = false;
        }
    }
    Definiciones = DefinicionesFuentesCartera.concat(DefinicionesInsumos, DefinicionesComplemento);
    var numeroFilas = (Definiciones.length * 2) + (DefinicionesFuentesCartera.length > 0 ? 1 : 0) + (DefinicionesInsumos.length > 0 ? 1 : 0) + (DefinicionesComplemento.length > 0 ? 1 : 0)


    if (OpcionCargada == 'Carga') {
        $("#TdFactor").html("FACTORES");
        if (index == 1) {
            CreaAcordeonVerticalFuenteTemp(numeroFilas, 10, Definiciones, 'EncabClasCarga', true);
            ObtieneRutasYNombresArchivos(false);
            Encabezados.ReSizeEncabezados();
            //ReSizeEncabezados();
        }
        CaseFasesAgregarControles(1, true);
        ActualizaEstatusCheckPadreHijosOmitir("", "");
    }
}


function DevuelveIndiceDeArreglo(fuente, JSONT2) {
    var indice = -1;
    for (var ii = 0; ii < JSONT2.length; ii++) {
        if (fuente == JSONT2[ii].FUENTE) {
            indice = ii;
            break;
        }
    }
    return indice;
}

var cadenaTotales = ""; var cadTotal1 = ""; var cadTotal2 = ""; var cadTotal3 = "";
var cadTotal4 = ""; var cadTotal5 = ""; var cadTotal6 = "";
var cadTotal7 = ""; var cadTotal8 = ""; var cadTotal9 = "";
function AgregarTablaDatosAFases(arrayG) {
    cadena1 = ""; cadenaTotales = "";
    for (var x = 0; x < arrayG.length; x++) {
        if (arrayG[x] != undefined) {
            switch (arrayG[x].FIFUENTE) {
                case "1": /*"ALNOVA"*/
                    SwitchFaseTabla(x, arrayG); break;
                case "5": /*"CREDIMAX"*/
                    SwitchFaseTabla(x, arrayG); break;
                case "7": /*"ARRMTO CRMX"*/
                    SwitchFaseTabla(x, arrayG); break;
                case "9": /*"MEDIOS DE PAGO"*/
                    SwitchFaseTabla(x, arrayG); break;
                case "16": /*"ARRMTO ALNOVA"*/
                    SwitchFaseTabla(x, arrayG); break;
                case "99": /*"Total"*/
                    switch (arrayG[x].Fase) {
                        case "1": cadTotal1 = arrayG[x].Registros + "%%%" + arrayG[x].Monto + "%&&%"; break;
                        case "2": cadTotal2 = arrayG[x].Registros + "%%%" + arrayG[x].Monto + "%&&%"; break;
                        case "3": cadTotal3 = arrayG[x].Registros + "%%%" + arrayG[x].Monto + "%&&%"; break;
                        case "4": cadTotal4 = arrayG[x].Registros + "%%%" + arrayG[x].Monto + "%&&%"; break;
                        case "5": cadTotal5 = arrayG[x].Registros + "%%%" + arrayG[x].Monto + "%&&%"; break;
                        case "6": cadTotal6 = arrayG[x].Registros + "%%%" + arrayG[x].Monto + "%&&%"; break;
                        case "7": cadTotal7 = arrayG[x].Registros + "%%%" + arrayG[x].Monto + "%&&%"; break;
                        case "8": cadTotal8 = arrayG[x].Registros + "%%%" + arrayG[x].Monto + "%&&%"; break;
                        case "9": cadTotal9 = arrayG[x].Registros + "%%%" + arrayG[x].Monto + "%&&%"; break;
                    }
                    if (cadTotal1 != "" && cadTotal2 != "" && cadTotal3 != "" && cadTotal4 != "" && cadTotal5 != "" && cadTotal6 != "" && cadTotal7 != "" && cadTotal8 != "" && cadTotal9)
                        cadenaTotales = cadTotal1 + cadTotal2 + cadTotal3 + cadTotal4 + cadTotal5 + cadTotal6 + cadTotal7 + cadTotal8 + cadTotal9;
                    break;
            }
        }
    }

    try {
        for (var i = 1; i <= 9; i++) {
            var cadena_TdPH1_Regs = "<tr><td class='Con_Gris' style='text-align:center'>Registros</td></tr>";
            var Monto = "<td> <table  cellspacing='0' cellpadding='0' style='margin-left:-5px;border:1px solid black;'> <tr><td class='Con_AzulGris' style='text-align:center'>Monto</td></tr>";
            var inicio = "<td> <table   cellspacing='0' cellpadding='0' style='margin-left:-3px;border:1px solid black;margin-top:-15px;'> <tr><td  class='Con_Gris' style='text-align:center'>Inicio</td></tr>";
            var termino = "<td> <table   cellspacing='0' cellpadding='0' style='margin-left:-3px;border:1px solid black;margin-top:-15px;'> <tr><td class='Con_AzulGris' style='text-align:center'>Fin</td></tr>";
            var Rep = "<td> <table   cellspacing='0' cellpadding='0' style='margin-left:-3px;border:1px solid black;margin-top:-15px;'> <tr><td  class='Con_Gris' style='text-align:center'>Reprocesos</td></tr>";
            var sumaRegistros = 0; var sumaMontos = 0;
            for (var ii = 0; ii < cadena1.split("!!!").length - 1; ii++) {
                cadena_TdPH1_Regs += cadena1.split("!!!")[ii].split("%%%")[i - 1].split("&&&")[0].split("---")[0];
                Monto += cadena1.split("!!!")[ii].split("%%%")[i - 1] != "" ? cadena1.split("!!!")[ii].split("%%%")[i - 1].split("&&&")[1].split("---")[0] : "0";
                inicio += cadena1.split("!!!")[ii].split("%%%")[i - 1].split("&&&")[2];
                termino += cadena1.split("!!!")[ii].split("%%%")[i - 1].split("&&&")[3];
                Rep += cadena1.split("!!!")[ii].split("%%%")[i - 1].split("&&&")[4];
            }
            Monto += "<tr><td class='" + (DeterminaSiNumParImpar(vecesEntro) == "Par" ? "Con_AzulBlanco" : "Con_AzulGris") + "'>" + cadenaTotales.split("%&&%")[i - 1].split("%%%")[1] + "</td></tr></table></td>";
            inicio += "</table></td>";
            termino += "</table></td>";
            Rep += "</table></td>";
            $("#TdPH" + i + "_Regs").html().replace($("#TdPH" + i + "_Regs").html(), "");
            $("#TdPH" + i + "_Regs").html(cadena_TdPH1_Regs + "<tr><td class='" + (DeterminaSiNumParImpar(vecesEntro) == "Par" ? "Con_Blanco" : "Con_Gris") + "'>" + cadenaTotales.split("%&&%")[i - 1].split("%%%")[0] + "</td></tr>");
            if (cadena1.split("!!!").length > 0) $("#TdHH" + i).html("<table> <tr>" + Monto + inicio + termino + Rep + "</tr></table> ");
        }
    } catch (e) {

    }
}


var cadena1 = "";
function SwitchFaseTabla(x, arrayG) {
    var indiceSumar = x < arrayG.length - 1 ? 1 : 0;
    var esUltimo = (x == arrayG.length - 1 ? true : false);

    if ((arrayG[x].FUENTE == arrayG[x + indiceSumar].FUENTE) && arrayG[x].Fase != 0 && !esUltimo) {
        switch (arrayG[x].Fase) {
            case "1": CreaTablaFases(arrayG[x].Registros, arrayG[x].Monto, (arrayG[x].Inicio != "" ? arrayG[x].Inicio.split('-')[0] + "<span>-</span>" + arrayG[x].Inicio.split('-')[1] : "__"), (arrayG[x].Fin != "" ? arrayG[x].Fin.split('-')[0] + "<span>-<span>" + arrayG[x].Fin.split('-')[1] : "__"), (arrayG[x].Rep != "" ? arrayG[x].Rep : "__")); break;
            case "2": CreaTablaFases(arrayG[x].Registros, arrayG[x].Monto, (arrayG[x].Inicio != "" ? arrayG[x].Inicio.split('-')[0] + "<span>-</span>" + arrayG[x].Inicio.split('-')[1] : "__"), (arrayG[x].Fin != "" ? arrayG[x].Fin.split('-')[0] + "<span>-<span>" + arrayG[x].Fin.split('-')[1] : "__"), (arrayG[x].Rep != "" ? arrayG[x].Rep : "__")); break;
            case "3": CreaTablaFases(arrayG[x].Registros, arrayG[x].Monto, (arrayG[x].Inicio != "" ? arrayG[x].Inicio.split('-')[0] + "<span>-</span>" + arrayG[x].Inicio.split('-')[1] : "__"), (arrayG[x].Fin != "" ? arrayG[x].Fin.split('-')[0] + "<span>-<span>" + arrayG[x].Fin.split('-')[1] : "__"), (arrayG[x].Rep != "" ? arrayG[x].Rep : "__")); break;
            case "4": CreaTablaFases(arrayG[x].Registros, arrayG[x].Monto, (arrayG[x].Inicio != "" ? arrayG[x].Inicio.split('-')[0] + "<span>-</span>" + arrayG[x].Inicio.split('-')[1] : "__"), (arrayG[x].Fin != "" ? arrayG[x].Fin.split('-')[0] + "<span>-<span>" + arrayG[x].Fin.split('-')[1] : "__"), (arrayG[x].Rep != "" ? arrayG[x].Rep : "__")); break;
            case "5": CreaTablaFases(arrayG[x].Registros, arrayG[x].Monto, (arrayG[x].Inicio != "" ? arrayG[x].Inicio.split('-')[0] + "<span>-</span>" + arrayG[x].Inicio.split('-')[1] : "__"), (arrayG[x].Fin != "" ? arrayG[x].Fin.split('-')[0] + "<span>-<span>" + arrayG[x].Fin.split('-')[1] : "__"), (arrayG[x].Rep != "" ? arrayG[x].Rep : "__")); break;
            case "6": CreaTablaFases(arrayG[x].Registros, arrayG[x].Monto, (arrayG[x].Inicio != "" ? arrayG[x].Inicio.split('-')[0] + "<span>-</span>" + arrayG[x].Inicio.split('-')[1] : "__"), (arrayG[x].Fin != "" ? arrayG[x].Fin.split('-')[0] + "<span>-<span>" + arrayG[x].Fin.split('-')[1] : "__"), (arrayG[x].Rep != "" ? arrayG[x].Rep : "__")); break;
            case "7": CreaTablaFases(arrayG[x].Registros, arrayG[x].Monto, (arrayG[x].Inicio != "" ? arrayG[x].Inicio.split('-')[0] + "<span>-</span>" + arrayG[x].Inicio.split('-')[1] : "__"), (arrayG[x].Fin != "" ? arrayG[x].Fin.split('-')[0] + "<span>-<span>" + arrayG[x].Fin.split('-')[1] : "__"), (arrayG[x].Rep != "" ? arrayG[x].Rep : "__")); break;
            case "8": CreaTablaFases(arrayG[x].Registros, arrayG[x].Monto, (arrayG[x].Inicio != "" ? arrayG[x].Inicio.split('-')[0] + "<span>-</span>" + arrayG[x].Inicio.split('-')[1] : "__"), (arrayG[x].Fin != "" ? arrayG[x].Fin.split('-')[0] + "<span>-<span>" + arrayG[x].Fin.split('-')[1] : "__"), (arrayG[x].Rep != "" ? arrayG[x].Rep : "__")); break;
            case "9": CreaTablaFases(arrayG[x].Registros, arrayG[x].Monto, (arrayG[x].Inicio != "" ? arrayG[x].Inicio.split('-')[0] + "<span>-</span>" + arrayG[x].Inicio.split('-')[1] : "__"), (arrayG[x].Fin != "" ? arrayG[x].Fin.split('-')[0] + "<span>-<span>" + arrayG[x].Fin.split('-')[1] : "__"), (arrayG[x].Rep != "" ? arrayG[x].Rep : "__")); cadena1 += "!!!"; vecesEntro++; break;
        }
    }
    else {
        if (arrayG[x].Fase != 0) {
            CreaTablaFases(arrayG[x].Registros, arrayG[x].Monto, (arrayG[x].Inicio != "" ? arrayG[x].Inicio.split('-')[0] + "<span>-<span>" + arrayG[x].Inicio.split('-')[1] : "__"), (arrayG[x].Fin != "" ? arrayG[x].Fin.split('-')[0] + "<span>-<span>" + arrayG[x].Fin.split('-')[1] : "__"), (arrayG[x].Rep != "" ? arrayG[x].Rep : "__"));
            for (var i = parseInt(arrayG[x].Fase) + 1; i <= 9; i++) {
                CreaTablaFases("__", "__", "__", "__", "__");
            }
            cadena1 += "!!!";
            vecesEntro++;
        }
        else if (arrayG[x].Fase == 0) {
            for (var i = parseInt(arrayG[x].Fase) + 1; i <= 9; i++) {
                CreaTablaFases("__", "__", "__", "__", "__");
            }
            cadena1 += "!!!";
            vecesEntro++;
        }
    }
}

var vecesEntro = 0;
function CreaTablaFases(regs, monto, inicio, fin, rep) {
    var valoreRegs = (regs != "" ? regs : "__");
    var valoreMonto = (monto != "" ? monto : "__");
    cadena1 += "<tr><td class='" + (DeterminaSiNumParImpar(vecesEntro) == "Par" ? "Con_Blanco" : "Con_Gris") + "'>" + valoreRegs + "</td></tr>---" + (valoreRegs == "__" ? "0" : regs) + "&&&";
    cadena1 += "<tr><td class='" + (DeterminaSiNumParImpar(vecesEntro) == "Par" ? "Con_AzulBlanco" : "Con_AzulGris") + "'>" + valoreMonto + "</td></tr>---" + (valoreMonto == "__" ? "0" : monto) + "&&&";
    cadena1 += "<tr><td class='" + (DeterminaSiNumParImpar(vecesEntro) == "Par" ? "Con_Blanco" : "Con_Gris") + "'>" + inicio + "</td></tr>" + "&&&";
    cadena1 += "<tr><td class='" + (DeterminaSiNumParImpar(vecesEntro) == "Par" ? "Con_AzulBlanco" : "Con_AzulGris") + "'>" + fin + "</td></tr>" + "&&&";
    cadena1 += "<tr><td class='" + (DeterminaSiNumParImpar(vecesEntro) == "Par" ? "Con_Blanco" : "Con_Gris") + "'>" + rep + "</td></tr>" + "%%%";
}

var valorWhereDetenerProcCalfMet = 0;
var tiempoProgressDetenerProcCalfMet;
function ProgressBarDetenerProcCalfMet(valorInicialPB, valorPorcentajeAnteriorDetenerProcCalfMetPB, objDetenerProcCalfMetPB, fuentePPB, esLoadingPB, esXSucursalPB, esAlnovaPB, numTotalNoListos) {
    if ($("#" + objDetenerProcCalfMetPB).attr("class") != "EstatusNegro") return;
    var IdDiv = esLoadingPB ? objDetenerProcCalfMetPB : (esXSucursalPB ? objDetenerProcCalfMetPB.split('_')[1].split('-')[0] : (esAlnovaPB ? $(objDetenerProcCalfMetPB).attr("id").split('_')[1].split('-')[0] : $(objDetenerProcCalfMetPB).attr("id").split('_')[1]));
    if ($("#div" + IdDiv).attr("class") != "classDetenerMet") $("#div" + IdDiv).attr("class", "classDetenerMet");
    var porcentajeObtenido = Math.round((valorInicialPB * 100) / 100);
    var valorActualWidth = parseInt(document.getElementById("div" + IdDiv).style.width.substring(0, document.getElementById("div" + IdDiv).style.width.length - 1));
    if (numTotalNoListos == 0 && porcentajeObtenido >= 100 && parseInt(valorActualWidth) >= 100) {
        if (document.getElementById("div" + IdDiv) != null) $("#div" + IdDiv).hide();
        if (document.getElementById("div" + IdDiv + "_txt") != null) $("#div" + IdDiv + "_txt").hide();
        document.getElementById("div" + IdDiv).style.width = "0%";
        if (valorActualWidth == 0) return;
    }

    if (document.getElementById("div" + IdDiv) != null && numTotalNoListos > 0 && (porcentajeObtenido >= valorActualWidth || document.getElementById("div" + IdDiv).style.width == "" || document.getElementById("div" + IdDiv).style.width == "100%" || document.getElementById("div" + IdDiv).style.width == "0%")) {
        if (document.getElementById("div" + IdDiv) != null) $("#div" + IdDiv).show();
        if (document.getElementById("div" + IdDiv + "_txt") != null) $("#div" + IdDiv + "_txt").show();
        if (document.getElementById("div" + IdDiv) != null) {
            document.getElementById("div" + IdDiv).style.width = porcentajeObtenido + "% ";
            if ($("#div" + IdDiv).attr("class") != "classDetenerMet") $("#div" + IdDiv).attr("class", "classDetenerMet");
        }
        if (document.getElementById("div" + IdDiv + "_txt") != null) {
            document.getElementById("div" + IdDiv + "_txt").style.color = "White";
            document.getElementById("div" + IdDiv + "_txt").innerHTML = "Deteniendo..." + document.getElementById("div" + IdDiv).style.width + " <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>";
        }
    }
    valorPorcentajeAnteriorDetenerProcCalfMetPB = valorInicialPB;
    var parametrosMonitoreo = { fuente: fuentePPB, fase: IdDiv.substring(IdDiv.length - 1), idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/ObtenerEstatusJobMonitoreo', "POST", parametrosMonitoreo,
        function ObtenerValorProgressArrmto(data) {
            if (data == undefined || data.d == null || data.d == "" || data.d == '{"SinDatos":"No se encontraron datos"}') return;
            var arrayJSONPG = data.d.split("||");
            if (arrayJSONPG == undefined || arrayJSONPG[0] == null) return;
            for (var x = 0; x < arrayJSONPG.length; x++)
                arrayJSONPG[x] = $.parseJSON(arrayJSONPG[x].toString());
            var porcentajeXPaso = 100 / arrayJSONPG.length;
            var numNoListos = 0;
            for (var x = 0; x < arrayJSONPG.length; x++)
                if (arrayJSONPG[x].FVCStatus == "Listo") numNoListos++;

            valorWhereDetenerProcCalfMet = porcentajeXPaso * numNoListos;
            if (numNoListos == arrayJSONPG.length) {
                if (document.getElementById("div" + IdDiv + "_txt") != null)
                    document.getElementById("div" + IdDiv + "_txt").innerHTML = "Deteniendo..." + "100% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>";

                if (document.getElementById("div" + IdDiv) != null) {
                    document.getElementById("div" + IdDiv).style.width = "100%";
                    if ($("#div" + IdDiv).attr("class") != "classDetenerMet") $("#div" + IdDiv).attr("class", "classDetenerMet");
                }
                numTotalNoListo = 0;
                clearTimeout(tiempoProgressDetenerProcCalfMet);
                if (!esLoadingPB) {
                    $(objDetenerProcCalfMetPB).removeAttr("disabled");
                    $(document.getElementById("chk-1_" + $(objDetenerProcCalfMetPB).attr("id").split('_')[1])).removeAttr("disabled");
                }
                if (document.getElementById("div" + IdDiv) != null) $("#div" + IdDiv).attr("lang", "aa");
                valorWhereDetenerProcCalfMet = 0.1; clearTimeout(tiempoProgressDetenerProcCalfMet);
            }
            else {
                valorInicialPB = valorWhereDetenerProcCalfMet;
                tiempoProgress = setTimeout(ProgressBarDetenerProcCalfMet(valorInicialPB, valorPorcentajeAnteriorDetenerProcCalfMetPB, objDetenerProcCalfMetPB, fuentePPB, esLoadingPB, esXSucursalPB, esAlnovaPB, numNoListos), 3000);
            }
        }, null);
}


var valorWhereArrmto = 0;
var tiempoProgressArrmto;
function ProgressBarArrmto(valorInicialPB, valorPorcentajeAnteriorArrmtoPB, objArrmtoPB, fuentePPB, esLoadingPB, esXSucursalPB, esAlnovaPB) {
    var aux = (objArrmtoPB.id) ? objArrmtoPB.id : objArrmtoPB;
    var objArrmtoPB = aux;
    if ($("#" + objArrmtoPB).attr("class") != "EstatusAmarillo") return;

    var porcentajeObtenido = Math.round((valorInicialPB * 100) / 100);
    var IdDiv = esLoadingPB ? objArrmtoPB : (esXSucursalPB ? objArrmtoPB.split('_')[1].split('-')[0] : (esAlnovaPB ? $(objArrmtoPB).attr("id").split('_')[1].split('-')[0] : $(objArrmtoPB).attr("id").split('_')[1]));
    $("#div" + IdDiv).attr("class", "BarraHijoV");
    var valorActualWidth = parseInt(document.getElementById("div" + IdDiv).style.width.substring(0, document.getElementById("div" + IdDiv).style.width.length - 1));
    if (((document.getElementById("div" + IdDiv) != null && (porcentajeObtenido > valorActualWidth || document.getElementById("div" + IdDiv).style.width == "" || ((document.getElementById("div" + IdDiv).style.width == "100%" || document.getElementById("div" + IdDiv).style.width == "0%")))) && $("#" + objArrmtoPB).attr("class") == "EstatusAmarillo")) {
        if (document.getElementById("div" + IdDiv) != null) $("#div" + IdDiv).show();
        if (document.getElementById("div" + IdDiv + "_txt") != null) $("#div" + IdDiv + "_txt").show();
        if (document.getElementById("div" + IdDiv) != null) document.getElementById("div" + IdDiv).style.width = porcentajeObtenido + "% ";
        if (document.getElementById("div" + IdDiv + "_txt") != null) {
            document.getElementById("div" + IdDiv + "_txt").style.color = "Black";
            document.getElementById("div" + IdDiv + "_txt").innerHTML = porcentajeObtenido + (porcentajeObtenido == 0 ? " " : "") + "% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>";
        }
    }
    valorPorcentajeAnteriorArrmtoPB = valorInicialPB;
    var parametrosMonitoreo = { fuente: fuentePPB, fase: IdDiv.substring(IdDiv.length - 1), idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/ObtenerEstatusJobMonitoreo', "POST", parametrosMonitoreo,
        function ObtenerValorProgressArrmto(data) {
            if (data == undefined || data.d == null || data.d == "" || data.d == '{"SinDatos":"No se encontraron datos"}') return;
            var arrayJSONPG = data.d.split("||");
            if (arrayJSONPG == undefined || arrayJSONPG[0] == null) return;
            for (var x = 0; x < arrayJSONPG.length; x++)
                arrayJSONPG[x] = $.parseJSON(arrayJSONPG[x].toString());
            var porcentajeXPaso = 100 / parseInt(arrayJSONPG.length);
            var numListos = 0;
            for (var x = 0; x < arrayJSONPG.length; x++) {
                if (arrayJSONPG[x].FVCStatus == "Listo" || arrayJSONPG[x].FVCStatus == "5") numListos++;
            }

            valorWhereArrmto = porcentajeXPaso * numListos;
            if (numListos == arrayJSONPG.length) {
                if (document.getElementById("div" + IdDiv) != null) document.getElementById("div" + IdDiv).style.width = "100%";
                if (document.getElementById("div" + IdDiv + "_txt") != null) document.getElementById("div" + IdDiv + "_txt").innerHTML = "100% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>";
                clearTimeout(tiempoProgressArrmto);
                if (!esLoadingPB) {
                    $(objArrmtoPB).removeAttr("disabled");
                    $(document.getElementById("chk-1_" + $(objArrmtoPB).attr("id").split('_')[1])).removeAttr("disabled");
                }
                if (document.getElementById("div" + IdDiv) != null) $("#div" + IdDiv).attr("lang", "aa");
                valorWhereArrmto = 0.1; clearTimeout(tiempoProgressArrmto);
            }
            else {
                valorInicialPB = valorWhereArrmto;
                tiempoProgress = setTimeout(ProgressBarArrmto(valorInicialPB, valorPorcentajeAnteriorArrmtoPB, objArrmtoPB, fuentePPB, esLoadingPB, esXSucursalPB, esAlnovaPB), 3000);
            }
        }, null);
}

var valorPorcentajeAnteriorCredimaxG = 0;
function ProgressBarCredimaxXSucursal(valorFinal, valorInicial, objArrmto, fuenteP, esLoading, aplicarMetodo) {
    if (aplicarMetodo) ProgressBarArrmto(valorInicial, 0.2, objArrmto, fuenteP, esLoading, true, false);
    else {
        var porcentajeObtenido = Math.round((valorInicial * 100) / valorFinal);
        var IdDiv = objArrmto.split('_')[1].split('-')[0];
        document.getElementById("div" + IdDiv).style.width = porcentajeObtenido + "% ";
        document.getElementById("div" + IdDiv + "_txt").innerHTML = porcentajeObtenido + (porcentajeObtenido == 0 ? " " : "") + "% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>";
        valorPorcentajeAnteriorCredimaxG = valorInicial;
        if (porcentajeObtenido == 100) {
            $("#div" + IdDiv).attr("lang", "aa");
            $("#div" + IdDiv).show();
            $("#div" + IdDiv + "_txt").show();
        }
    }
}




function btnLoad_Click_funtion(obj) {
    peticionAjax('LeerArchivos.aspx/Proceso',
                "POST", null,
                function Finaliza_btnLoad_Click() {

                },
                null);
}

function OnScrollDiv(event, div) {
    document.getElementById("TdCI").style.marginLeft = (-($(event.target).scrollLeft() + ($(event.target).scrollLeft() <= 100 ? 1 : ($(event.target).scrollLeft() > 162 ? 18 : 0)))) + 'px';
    document.getElementById("divE1").style.marginLeft = (-($(event.target).scrollLeft() + ($(event.target).scrollLeft() <= 100 ? 1 : ($(event.target).scrollLeft() > 162 ? 18 : 0)))) + 'px';
}

var escargaInit = true; var estatusLangMostrarOcultarCifras = "";
function MostrarOcultarCifras(obj, cambiarAttr) {
    if (escargaInit) { alert("Entry if4 ");escargaInit = false; return; }
    if (($(obj).attr("lang") == "ab" && cambiarAttr) || ($(obj).attr("lang") == "aa" && !cambiarAttr)) {
    	alert("Entry if one4");
        $("#imgdivFasesControl").attr("src", "../Images/PanelDeControl/Expander/fDerechaG.png");
        $("#spdivFasesControl").html("Mostrar Detalle Cifras");
        $("#trFaseDef").stop().hide().animate({ opacity: 0 }, 500);
        $("#trDefFactor").stop().hide().animate({ opacity: 0 }, 500);
        $("#divPanelMain").css("max-height", (parseInt($(document).height())) -500  + "px");
    }
    else if (($(obj).attr("lang") == "aa" && cambiarAttr) || ($(obj).attr("lang") == "ab" && !cambiarAttr)) {
    	alert("Entry if two4");
    	$("#imgdivFasesControl").attr("src", "../Images/PanelDeControl/Expander/fAbajoG.png");
        $("#spdivFasesControl").html("Ocultar Detalle Cifras");
        $("#trFaseDef").stop().show().animate({ opacity: 1 }, 500);
        $("#trDefFactor").stop().show().animate({ opacity: 1 }, 500);
        $("#divPanelMain").css("max-height", (parseInt($(document).height())) -500  + "px");
    }
    cambiarAttr ? $(obj).attr("lang", $(obj).attr("lang") == "ab" ? "aa" : "ab") : null;
    estatusLangMostrarOcultarCifras = cambiarAttr ? $(obj).attr("lang") : estatusLangMostrarOcultarCifras;
    Encabezados.ReSizeEncabezados();
}

var Utils = (function (window, undefined) {
    var document = window.document;
    var isNumeric = function (n) { return !isNaN(parseFloat(n)) && isFinite(n); }
    return {
        dom: function (o) { return document.getElementById(o); },
        elm: function () { return document.documentElement; },
        winHeight: function (s) { return document.documentElement.clientHeight - (s || 0); },
        setCcsMarginLeft: function (o, s) { if (this.dom(o)) { this.dom(o).style.marginLeft = s; } },
        setCcsWidth: function (o, s) { if (this.dom(o)) { this.dom(o).style.width = isNumeric(s) ? s + 'px' : s; } },
        setCcsHeight: function (o, s) { if (this.dom(o)) { this.dom(o).style.height = isNumeric(s) ? s + 'px' : s; } },
        offSetWidth: function (o, s) { return this.dom(o).offsetWidth + (s || 0); },
        offSetHeight: function (o, s) { return this.dom(o).offsetHeight + (s || 0); },
        setWidthFromOffSet: function (o, o2, s) { this.setCcsWidth(o, (this.offSetWidth(o2, s))); },
        getWidth: function (o) { return this.dom(o).style.width; },
        getHeight: function (o) { return this.dom(o).stylet.height; }

    }
}(window));

var Fuentes = (function (window, undefined) {
    return {
        ObtenerCatalogoFuentes: function () {
            var parametros = { fechaPeriodo: (PaisSelectXUser == "1" ? fechaP.replace(',', '').replace(',', '') : fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0]), peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
            peticionAjax('PanelDeControl.aspx/ObtenerCatalogoFuentes',
                        "POST",
                        parametros,
                        LlenaArregloFuentes_Finaliza,
                        LlenaArregloFuentes_Finaliza);
            index++;
        }
    }
}(window));

var Encabezados = (function (window, undefined) {
    function CreaEncabezado(data) {

        var JSON = obtenerArregloDeJSON(data.split("%&&%")[0], false); var JSON1 = obtenerArregloDeJSON(data.split("%&&%")[1], false); var JSON2 = obtenerArregloDeJSON(data.split("%&&%")[2], false);
        var JSON3 = obtenerArregloDeJSON(data.split("%&&%")[3], false); var JSON4 = obtenerArregloDeJSON(data.split("%&&%")[4], false); var JSON5 = obtenerArregloDeJSON(data.split("%&&%")[5], false);
        var JSON6 = obtenerArregloDeJSON(data.split("%&&%")[6], false); var JSON7 = obtenerArregloDeJSON(data.split("%&&%")[7], false); var JSON8 = obtenerArregloDeJSON(data.split("%&&%")[8], false);
        JSON = EliminaSiExistenMAsRegistroFuente(JSON, JSON1);
        JSON1 = EliminaSiExistenMAsRegistroFuente(JSON1, JSON2);
        JSON2 = EliminaSiExistenMAsRegistroFuente(JSON2, JSON1);
        JSON3 = EliminaSiExistenMAsRegistroFuente(JSON3, JSON4);
        JSON4 = EliminaSiExistenMAsRegistroFuente(JSON4, JSON5);
        JSON5 = EliminaSiExistenMAsRegistroFuente(JSON5, JSON4);
        JSON6 = EliminaSiExistenMAsRegistroFuente(JSON6, JSON7);
        JSON7 = EliminaSiExistenMAsRegistroFuente(JSON7, JSON8);
        JSON8 = EliminaSiExistenMAsRegistroFuente(JSON8, JSON7);
        var arrayG = new Array();
        for (var i = 0; i < JSON.length; i++) {
            arrayG.push(JSON[i]); arrayG.push(JSON1[i]); arrayG.push(JSON2[i]); arrayG.push(JSON3[i]);
            arrayG.push(JSON4[i]); arrayG.push(JSON5[i]); arrayG.push(JSON6[i]); arrayG.push(JSON7[i]); arrayG.push(JSON8[i]);
        }
        vecesEntro = 0;
        AgregarTablaDatosAFases(arrayG);
    }
    function EliminaSiExistenMAsRegistroFuente(JSONT, JSONT2) {
        for (var i = 0; i < JSONT.length; i++) {
            var indiceSumar = i < JSONT.length - 1 ? 1 : 0;
            if (JSONT[i].FUENTE == JSONT[i + indiceSumar].FUENTE && i < JSONT.length - 1) {
                JSONT.splice(i, 1);
            }
        }
        var arregloTemp = new Array();
        if (JSONT.length < JSONT2.length) {
            for (var i = 0; i < JSONT.length; i++) {
                if (JSONT[i].FUENTE != JSONT2[i].FUENTE) {
                    JSONT.push(JSONT2[i]);
                    for (var ii = 0; ii < JSONT2.length; ii++) {
                        if (JSONT[ii].FUENTE == JSONT2[ii].FUENTE) {
                            arregloTemp.push(JSONT[ii]);
                        }
                        else
                            arregloTemp.push(JSONT[DevuelveIndiceDeArreglo(JSONT2[ii].FUENTE, JSONT)]);
                    }
                    break;
                }
            }
        }
        return arregloTemp.length > 0 ? arregloTemp : JSONT;
    }
    var AliniacionEncabezadoControlFases = function (defCabezera, defDefiniciones, defTdCI, defEtapaUno, defTdCII, defEtapaDos, defTdCIII, defEtapaTres) {

        var variables = [{ val: null, constPx: null, diferenciaPosition: null }];
        variables[0].constPx = 'px';
        variables[0].val = (Utils.offSetWidth(defDefiniciones) > 66) ? Utils.offSetWidth(defDefiniciones, -7) : Utils.offSetWidth(defDefiniciones, variables[0].constPx);

        Utils.setCcsWidth(defCabezera, variables[0].val);

        Utils.setWidthFromOffSet(defTdCI, defEtapaUno, variables[0].constPx);
        Utils.setWidthFromOffSet(defTdCII, defEtapaDos, variables[0].constPx);
        Utils.setWidthFromOffSet(defTdCIII, defEtapaTres, variables[0].constPx);
        

        variables[0].diferenciaPosition = parseInt($('#' + defTdCI).position().left) - parseInt($('#' + defEtapaUno).position().left);
        if (variables[0].diferenciaPosition > 2 && variables[0].diferenciaPosition <= 50) {
            var x = (Utils.offSetWidth(defDefiniciones) > 65) ? Utils.offSetWidth(defDefiniciones, -17) : Utils.offSetWidth(defDefiniciones, variables[0].constPx);
            Utils.setCcsWidth(defCabezera, x);

        }
        
        variables = null;
    }
    var CambiarTamañoEncabezadoControl = function () {
        var objDomInt = [{ obj: 'TdCabecera', style: '0px' }, { obj: 'divE0', style: '0px' }, { obj: 'divPanelMain' }, { obj: 'tblTituloMain' }, { obj: 'tblEncabezadoControl' }, { obj: 'divFasesControl' }];
        var objDomIntJ = [{ obj: '#Td0TdEtapaUno' }, { obj: '#TdCI' }];
        var objDomIntWidth = [{ obj: 'TdE1F1', obj2: '0Td1' }, { obj: 'TdE1F2', obj2: '0Td2' }, { obj: 'TdE1F3', obj2: '0Td3' }, { obj: 'TdE2F1', obj2: '0Td4' }, { obj: 'TdE2F2', obj2: '0Td5' }, { obj: 'TdE2F3', obj2: '0Td6' }, { obj: 'TdE3F1', obj2: '0Td7' }, { obj: 'TdE3F2', obj2: '0Td8' }, { obj: 'TdE3F3', obj2: '0Td9' }];
        var variables = [{ diferenciaPosition: null, val: null, constPx: 'px', size: null, dom1: null }];

        
        Utils.setCcsMarginLeft(objDomInt[0].obj, objDomInt[0].style);
        Utils.setCcsMarginLeft(objDomInt[1].obj, objDomInt[1].style);

        variables[0].diferenciaPosition = parseInt(parseInt($(objDomIntJ[0].obj).position().left) - parseInt($(objDomIntJ[1].obj).position().left));
        if (variables[0].diferenciaPosition > 4 || variables[0].diferenciaPosition < 0) {
            setTimeout(this.ReSizeEncabezados, 10000);
            return;
        }

        variables[0].size = objDomIntWidth.length;
        for (var i = variables[0].size; i--;) {
            var o = objDomIntWidth[i].obj;
            var w = objDomIntWidth[i].obj2;
            Utils.setWidthFromOffSet(o, w, variables[0].constPx);
        }

        if (Utils.dom(objDomInt[2].obj)) {
            var val = (parseInt(Utils.winHeight(150)) - (parseInt(Utils.offSetHeight(objDomInt[3].obj)) + parseInt(Utils.offSetHeight(objDomInt[4].obj)) + parseInt(Utils.offSetHeight(objDomInt[5].obj)))) + variables[0].constPx;
            Utils.setCcsHeight(objDomInt[2].obj, val);
        } else {
            Utils.setCcsHeight(objDomInt[2].obj, null);
        }

        objDomInt = null; objDomIntJ = null; objDomIntWidth = null; variables = null;
    }
    return {
        GetEncabezados: function () {
            var parametrosEncabezados = { fechaPeriodo: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], peridiocidad: periocidadSelectXUser, idPais: PaisSelectXUser };
            peticionAjax("PanelDeControl.aspx/GetEncabezados", "POST", parametrosEncabezados,
                function GetEncabezados_finish(data) {
                    var JSON = obtenerArregloDeJSON(data.d.split("%&&%")[0], false);
                    if (JSON[0].SinDatos != "No se encontraron datos")
                        CreaEncabezado(data.d);
                    if (OpcionCargada == 'Carga')
                        Fuentes.ObtenerCatalogoFuentes();
                }, null);
        },
        ReSizeEncabezados: function () {
            AliniacionEncabezadoControlFases('TdCabecera', '0Td0', 'TdCI', 'Td0TdEtapaUno', 'TdCII', 'Td0TdEtapaDos', 'TdCIII', 'Td0TdEtapaTres');
            AliniacionEncabezadoControlFases('divE0', '0Td0', 'divE1', 'Td0TdEtapaUno', 'divE2', 'Td0TdEtapaDos', 'divE3', 'Td0TdEtapaTres');

            $("#tblEncabezadoControl").show();
            $("#divFasesControl").show();
            CambiarTamañoEncabezadoControl();
            setTimeout(CambiarTamañoEncabezadoControl, 10000);
        }

    }
}(window));

var Panel = (function (window, undefined) {
    var configuracion = { tiempo: 25000 }
    return {
        activaGetEncabezados: function () { Encabezados.GetEncabezados(); setInterval(Encabezados.GetEncabezados, configuracion.tiempo); }

    }
}(window));



