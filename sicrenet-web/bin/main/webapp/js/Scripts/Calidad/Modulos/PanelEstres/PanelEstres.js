$(function ($) {
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        isRTL: false,
        startDate: '30/06/2008',
        showMonthAfterYear: false,
        yearSuffix: '',
        hideIfNoPrevNext: true,
        showAnim: 'slideDown',
        showOn: "both",
        showOtherMonths: true,
        showStatus: true,
        showWeek: true,
        firstDay: 1,
        numberOfMonths: 1,
        selectOtherMonths: true,
        daysOfWeekDisabled: "1,2,3,4,5,6"
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

$(document).ready(function () {
    $("#txtFechaCorte").datepicker({ beforeShowDay: renderCalendarCallback });
});

function cargaIncialPanelEstres() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("PanelEstres.aspx/DevuelveFechaActual", "POST", null, function (data) {
        $("#txtFechaCorte").val(data.d);
        WidtDatePicker();
        filtroFecha();
    });
    ObtenerCatalogoFuentesMonitoreo();
}

function renderCalendarCallback(d) {
    var availableDates = new Array();
    var dmy = '';
    if (d.getDate() < 10) dmy += "0";
    dmy += d.getDate() + "/";
    if ((d.getMonth() + 1) <= 9)
        dmy = dmy + "0" + (d.getMonth() + 1) + "/" + d.getFullYear();
    else dmy = dmy + (d.getMonth() + 1) + "/" + d.getFullYear();
    if ($("#txtFechaCorte").attr("accesskey") == undefined) return;
    if ($.inArray(dmy, $("#txtFechaCorte").attr("accesskey").split(",")) != -1)
        return [true, "", ""];
    else
        return [false, "", ""];
}


function filtroFecha() {
    var parametrosGetFechasDatePickerXPeriodo = { fechaCalMenos: '', fechaCalMas: '', aplicarMenos: false, aplicarMas: false, index: 0, fechaAnteriorMenos: '', arregloFechas: '', fechaswitch: '' };
    peticionAjax("PanelEstres.aspx/GetFechasDatePickerFiltro", "POST", parametrosGetFechasDatePickerXPeriodo,
                      function (data) {
                          peticionAjax("PanelEstres.aspx/GetFechasNoSelect", "POST", null,
                          function (data2) {
                              $("#txtFechaCorte").attr("accesskey", data2.d.split(":")[2]);
                              
                          });
                      }, null);
}

//------------------------------------------------------------------------------
var PaisSelectXUser = "";
var opcionPeticion = "";
var periocidadSelectXUser = "1";
function ObtenerCatalogoFuentesMonitoreo() {
    var parametros = { fechaPeriodo: (PaisSelectXUser == "1" ? "20120531" : "2012/05/31"), periodicidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
    opcionPeticion = "EtapaI";
    peticionAjax('PanelEstres.aspx/ObtenerCatalogoFuentes', "POST", parametros, function ObtenerCatalogoFuentesMonitoreo_Finaliza(data) {
        if (data.d.indexOf("FSId_Fuente") != -1 || (data.d == "" && opcionPeticion == "EtapaI")) {
            if (data.d != "") {
                DefinicionGneralFuentes = new Array();
                DefinicionGneralFuentes = DevuelveArregloDefinicione(data, 1, "FSId_Fuente", "Fuente", "IdEstatus", "Fase", "Clasificacion");
                var parametrosRefreshEstatusMet = { fechaPeriodo: "2012-05-31", periodicidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
                opcionPeticion = "EtapaII";
                peticionAjax('PanelEstres.aspx/ObtenerCatalogoEstausMetodologias', "POST", parametrosRefreshEstatusMet, ObtenerCatalogoFuentesMonitoreo_Finaliza, ObtenerCatalogoFuentesMonitoreo_Finaliza);
            }
            else {
                var parametros = { fechaPeriodo: (PaisSelectXUser == "1" ? "20120531" : "2012/05/31"), peridiocidad: (periocidadSelectXUser), idPais: 1 }; //Cambiar por el Pais Seleccionado Por el usuario
                opcionPeticion = "EtapaI";
                peticionAjax('PanelEstres.aspx/ObtenerCatalogoFuentes', "POST", parametros, ObtenerCatalogoFuentesMonitoreo_Finaliza, ObtenerCatalogoFuentesMonitoreo_Finaliza);
            }
        }
        else if (data.d.indexOf("FIIdMetodologia") != -1 || (data.d == "" && opcionPeticion == "EtapaII")) {
            if (data.d != "") {
                DefinicionGneralMetodologias = new Array();
                DefinicionGneralMetodologias = DevuelveArregloDefinicione(data, 2, "FIIdMetodologia", "Metodologia", "IdEstatus", "Fase", "Clasificacion");
                var parametrosRefreshEstatusRepor = { fechaPeriodo: "2012-05-31", periodicidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
                opcionPeticion = "EtapaIII";
                peticionAjax('PanelEstres.aspx/ObtenerCatalogoEstausReportes', "POST", parametrosRefreshEstatusRepor, ObtenerCatalogoFuentesMonitoreo_Finaliza, ObtenerCatalogoFuentesMonitoreo_Finaliza);
            }
            else {
                var parametrosRefreshEstatusMet = { fechaPeriodo: "2012-05-31", periodicidad: (periocidadSelectXUser), idPais: 1 }; //Cambiar por el Pais Seleccionado Por el usuario
                opcionPeticion = "EtapaII";
                peticionAjax('PanelEstres.aspx/ObtenerCatalogoEstausMetodologias', "POST", parametrosRefreshEstatusMet, ObtenerCatalogoFuentesMonitoreo_Finaliza, ObtenerCatalogoFuentesMonitoreo_Finaliza);
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
                var parametrosRefreshEstatusRepor = { fechaPeriodo: "2012-05-31", periodicidad: (periocidadSelectXUser), idPais: 1 }; //Cambiar por el Pais Seleccionado Por el usuario
                opcionPeticion = "EtapaIII";
                peticionAjax('PanelEstres.aspx/ObtenerCatalogoEstausReportes', "POST", parametrosRefreshEstatusRepor, ObtenerCatalogoFuentesMonitoreo_Finaliza, ObtenerCatalogoFuentesMonitoreo_Finaliza);
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
        else if (DefinicionGneralFuentesTemp[indiceArreglo].split('&&')[3].indexOf(JSONMonitoreo[i][campo4]) == -1) {
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
    var cadena = '<table id="TblMainPanelEstres" style="width:100%">';
    while (indiceMonitoreoF < ArrayFuentes.length)
        cadena += creaEtapaI(ArrayFuentes);

    cadena += '</table>';
    $("#divTablaMonitoreo").show();
    if (esLoadMonitoreo == true) {
        var cadEncabezado = '<div id="tblEncabezadoControlPanelEstres" style="width: 100%; overflow: hidden; white-space: nowrap;margin-top: 20px;">' +
                                '<div id="divE0Space" lang="ab" style="display: inline-block; position: relative; "> &nbsp' +
                                '</div>' +
                                '<div id="TdCI" class="EncabClasCarga" style="border: 1px solid rgb(37, 117, 236);text-shadow: black 2px 1px 1px;height:30px;width: 33.33%;display: inline-block; position: relative;text-align: center;color: #fff;font-family: sans-serif;font-weight: lighter;font-size: 12px;line-height: 30px;"><span>I </span>' +
                                '</div>' +
                                '<div id="TdCII" class="EncabClasMet" style="border: 1px solid rgb(167, 126, 38);text-shadow: black 2px 1px 1px;width: 33.33%;display: inline-block; position: relative;text-align: center;color: #fff;font-family: sans-serif;font-weight: lighter;font-size: 12px;line-height: 30px;"> <span>II </span>' +
                                '</div>' +
                                '<div id="TdCIII" class="EncabClasRep" style="border: 1px solid rgb(182, 85, 18);text-shadow: black 2px 1px 1px;width: 33.33%;display: inline-block; position: relative;text-align: center;color: #fff;font-family: sans-serif;font-weight: lighter;font-size: 12px;line-height: 30px;"><span>III</span>' +
                                '</div>' +
                            '</div>';
        cadEncabezado += '<div id="divFasesControlPanelEstres" style="width: 100%; overflow: hidden; white-space: nowrap;">' +
                                '<div id="divE1Space" lang="ab" style="display: inline-block; position: relative; "> &nbsp' +
                                '</div>' +
                                '<div id="divE1" class="EncabClasCarga" style="border: 1px solid rgb(32, 94, 187);width: 33%;display: inline-block; position: relative;white-space: pre-line;white-space: pre-line;">' +
                                    '<table style="width: 100%">' +
                                        '<tr style="color: #fff;font-family: sans-serif;font-weight: lighter;font-size: 12px;text-align: center;">' +
                                            '<td id="TdE1F_1" lang="aa" style="cursor:pointer;" onclick="ExpandirCollapsarAcordeonHorizontalFases_Click(this);" class="AcordeonAzul_1" title="Ir a Fase 1(CARGA DE FACTORES)">1<img alt="" src="../../Images/PanelDeControl/F1.png" style="margin-right: 10px; width: 30px;height: 17px;" /></td>' +
                                            '<td id="TdE1F_2" lang="aa" style="cursor:pointer;" onclick="ExpandirCollapsarAcordeonHorizontalFases_Click(this);" class="AcordeonAzul_2" title="Ir a Fase 2(VALIDACIÓN DE FUENTE)">2<img alt="" src="../../Images/PanelDeControl/icoAzul23.png" style="margin-right: 10px;width: 17px; height: 17px;" /></td>' +
                                            '<td id="TdE1F_3" lang="aa" style="cursor:pointer;" onclick="ExpandirCollapsarAcordeonHorizontalFases_Click(this);" class="AcordeonAzul_3" title="Ir a Fase 3(VALIDACIÓN DE ESTRUCTURA)">3<img alt="" src="../../Images/PanelDeControl/icoAzul23.png" style="margin-right: 10px;width: 17px; height: 17px;" /></td>' +
                                         '</tr>' +
                                     '</table>' +
                                 '</div>' +
                                 '<div id="divE2" class="EncabClasMet" style="border: 1px solid rgb(167, 126, 38);width: 33%;display: inline-block; position: relative;white-space: pre-line;white-space: pre-line;">' +
                                    '<table style="width: 100%">' +
                                        '<tr style="color: #fff;font-family: sans-serif;font-weight: lighter;font-size: 12px;text-align: center;">' +
                                            '<td id="TdE2F_4" lang="aa" style="cursor:pointer;" onclick="ExpandirCollapsarAcordeonHorizontalFases_Click(this);" class="AcordeonAmarillo_1" title="Ir a Fase 4(PROCESAMIENTO)">4<img alt="" src="../../Images/PanelDeControl/F4.png" style="margin-right: 10px; width: 30px;height: 17px;" />' +
                                            '</td>' +
                                            '<td id="TdE2F_5" lang="aa" style="cursor:pointer;" onclick="ExpandirCollapsarAcordeonHorizontalFases_Click(this);" class="AcordeonAmarillo_2" title="Ir a Fase 5(VALIDACIONES AL PROCESO)">5<img alt="" src="../../Images/PanelDeControl/icoAmarillo23.png" style="margin-right: 10px;width: 20px; height: 17px;" />' +
                                            '</td>' +
                                            '<td id="TdE2F_6" lang="aa" style="cursor:pointer;" onclick="ExpandirCollapsarAcordeonHorizontalFases_Click(this);" class="AcordeonAmarillo_3" title="Ir a Fase 6(VALIDACIONES VS ANTERIOR)">6<img alt="" src="../../Images/PanelDeControl/icoAmarillo23.png" style="margin-right: 10px;width: 20px; height: 17px;" />' +
                                            ' </td>' +
                                         '</tr>' +
                                    '</table>' +
                                 '</div>' +
                                 '<div id="divE3" class="EncabClasRep" style="border: 1px solid rgb(138, 76, 34);width: 33%;display: inline-block; position: relative;white-space: pre-line;white-space: pre-line;">' +
                                    '<table style="width: 100%">' +
                                        '<tr style="color: #fff;font-family: sans-serif;font-weight: lighter;font-size: 12px;text-align: center;">' +
                                            '<td id="TdE3F_7" lang="aa" style="cursor:pointer;" onclick="ExpandirCollapsarAcordeonHorizontalFases_Click(this);" class="AcordeonNaranja_1" title="Ir a Fase 7(REPORTERIA)">7<img alt="" src="../../Images/PanelDeControl/F7.png" style="margin-right: 10px; width: 29px;height: 17px;" />' +
                                            '</td>' +
                                            '<td id="TdE3F_8" lang="aa" style="cursor:pointer;" onclick="ExpandirCollapsarAcordeonHorizontalFases_Click(this);" class="AcordeonNaranja_2" title="Ir a Fase 8(VALIDACIONES AL REPORTE)">8<img alt="" src="../../Images/PanelDeControl/icoNaranja23.png" style="margin-right: 10px;width: 17px; height: 17px;" />' +
                                            '</td>' +
                                            '<td id="TdE3F_9" lang="aa" style="cursor:pointer;" onclick="ExpandirCollapsarAcordeonHorizontalFases_Click(this);" class="AcordeonNaranja_3" title="Ir a Fase 9(CONFIRMACION DE ENTREGA)">9<img alt="" src="../../Images/PanelDeControl/icoNaranja23.png" style="margin-right: 10px;width: 17px; height: 17px;" />' +
                                            '</td>' +
                                        '</tr>' +
                                     '</table>' +
                                  '</div>' +
                               '</div>';

        $("#divTblTableroEstres").html("");
        $("#divTblTableroEstres").html('<div id="TblencabezadoMonitoreoPanel">' +
                                                '</div>' +
                                                '<div id="divTblPanelMain" style="overflow-x:auto;height:90%;">' + cadena +
                                                  "</div>" /*+ "</br><div>" + $("#divLeyenda").html() + "</div>"*/);
        $("#TblencabezadoMonitoreoPanel").html(cadEncabezado);
        ReSizeEncabezados();
        esLoadMonitoreo = false;
    }
    Waiting(false, "Espere por favor. Cargando Información...");

}

function ReSizeEncabezados() {
    document.getElementById("divTblTableroEstres").style.height = (parseInt(document.documentElement.clientHeight - 180)) + "px";
    document.getElementById("divTblTableroEstres").style.width = (parseInt($("#shadows").width()) - 15) + "px"

    document.getElementById('divE0Space').style.width = (4 + document.getElementById('TdClasifEI_0').offsetWidth) + "px";

    document.getElementById('TdCI').style.width = (4 + document.getElementById('TdEncClasCarga_0').offsetWidth + document.getElementById('TdEncClasCarga_1').offsetWidth + document.getElementById('TdEncClasCarga_2').offsetWidth) + "px";
    document.getElementById('TdCII').style.width = (4 + document.getElementById('TdEncClasCarga_3').offsetWidth + document.getElementById('TdEncClasCarga_4').offsetWidth + document.getElementById('TdEncClasCarga_5').offsetWidth) + "px";
    document.getElementById('TdCIII').style.width = (document.getElementById('TdEncClasCarga_6').offsetWidth + document.getElementById('TdEncClasCarga_7').offsetWidth + document.getElementById('TdEncClasCarga_8').offsetWidth) + "px";

    document.getElementById('divE1Space').style.width = (4 + document.getElementById('TdClasifEI_0').offsetWidth) + "px";
    document.getElementById('divE1').style.width = (4 + document.getElementById('TdEncClasCarga_0').offsetWidth + document.getElementById('TdEncClasCarga_1').offsetWidth + document.getElementById('TdEncClasCarga_2').offsetWidth) + "px";
    document.getElementById('TdE1F_1').style.width = (document.getElementById('TdEncClasCarga_0').offsetWidth) + "px";
    document.getElementById('TdE1F_2').style.width = (document.getElementById('TdEncClasCarga_1').offsetWidth) + "px";
    document.getElementById('TdE1F_3').style.width = (document.getElementById('TdEncClasCarga_2').offsetWidth) + "px";

    document.getElementById('divE2').style.width = (4 + document.getElementById('TdEncClasCarga_3').offsetWidth + document.getElementById('TdEncClasCarga_4').offsetWidth + document.getElementById('TdEncClasCarga_5').offsetWidth) + "px";
    document.getElementById('TdE2F_4').style.width = (document.getElementById('TdEncClasCarga_3').offsetWidth) + "px";
    document.getElementById('TdE2F_5').style.width = (document.getElementById('TdEncClasCarga_4').offsetWidth) + "px";
    document.getElementById('TdE2F_6').style.width = (document.getElementById('TdEncClasCarga_5').offsetWidth) + "px";

    document.getElementById('divE3').style.width = (document.getElementById('TdEncClasCarga_6').offsetWidth + document.getElementById('TdEncClasCarga_7').offsetWidth + document.getElementById('TdEncClasCarga_8').offsetWidth) + "px";
    document.getElementById('TdE3F_7').style.width = (document.getElementById('TdEncClasCarga_6').offsetWidth) + "px";
    document.getElementById('TdE3F_8').style.width = (document.getElementById('TdEncClasCarga_7').offsetWidth) + "px";
    document.getElementById('TdE3F_9').style.width = (document.getElementById('TdEncClasCarga_8').offsetWidth) + "px";
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
function creaEtapaI(ArrayFuentes) {
    var cadena = "<tr " + (((indiceMonitoreoF > 0 && ArrayFuentes[indiceMonitoreoF].split('&&')[4] != ArrayFuentes[indiceMonitoreoF - 1].split('&&')[4]) || indiceMonitoreoF == 0) && !entroF ? " class ='EncabClasCarga' style='height:30px;font: normal 9px sans-serif;' " : " id='tr_" + (entroF ? indiceMonitoreoF : indiceMonitoreoF + 1) + "' class='TrFuenteControles' lang='aa' onclick='ExpandeCollapsaAcordeonVerticalFuente_Click(this);' style='height:30px;font: normal 9px sans-serif;cursor:pointer;'") + " >";
    if (indiceMonitoreoF < ArrayFuentes.length) {
        if (((indiceMonitoreoF > 0 && ArrayFuentes[indiceMonitoreoF].split('&&')[4] != ArrayFuentes[indiceMonitoreoF - 1].split('&&')[4]) || indiceMonitoreoF == 0) && !entroF) {
            if (casoEspecialF)
                cadena += AgregarFilaFuente(ArrayFuentes, 1, 4, indiceMonitoreoF, "EncabClasCarga") + '<td class="TdFase_4"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_5"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_6"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_7"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_8"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_9"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td>';
            if (indiceMonitoreoF < ArrayFuentes.length && !casoEspecialF) {
                cadena += '<td id="TdClasifEI_' + indiceMonitoreoF + '" class="EncabClasCarga" style="width:8%;font-weight:bold;color:white;">' + ArrayFuentes[indiceMonitoreoF].split("&&")[4] + '</td>';
                for (var i = 0; i < 9; i++)
                    cadena += '<td ' + (indiceMonitoreoF == 0 ? 'id ="TdEncClasCarga_' + i + '"' : '') + ' class="TdFase_' + (i + 1) + '" style="width:8%;font-weight:bold;' + (indiceMonitoreoF == 0 ? 'color:Transparent;' : '') + '">' + (indiceMonitoreoF == 0 ? (i == 0 ? "CARGA DE FACTORES" : (i == 1 ? "VAL. DE FUENTE" : "VAL. ESTRUCTURA")) : "") + '</td>';
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
                    cadena += AgregarFilaFuente(ArrayFuentes, 1, 4, indiceMonitoreoF, "EncabClasCarga") + '<td class="TdFase_4"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_5"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_6"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_7"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_8"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_9"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td>';
                    indiceMonitoreoF++;
                }
                else { indiceMonitoreoF--; entroF = false; }
            }
            if (indiceMonitoreoF < ArrayFuentes.length) {
                cadena += AgregarFilaFuente(ArrayFuentes, 1, 4, indiceMonitoreoF, "EncabClasCarga") + '<td class="TdFase_4"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_5"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_6"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_7"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_8"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td><td class="TdFase_9"><div class="EstatusBlanco" style="line-height: 32px;width: 99%;height: 32px;"></div></td>';
                indiceMonitoreoF++;
            }
        }
    } else {
        cadena += "<td></td><td></td><td></td><td></td>";
    }
    cadena += "</tr>";
    if (!entroF)
        cadena += AgregarFilaDeControles(ArrayFuentes[indiceMonitoreoF-1].split('&&')[0], ArrayFuentes[indiceMonitoreoF-1].split('&&')[1]);
    return cadena;
}

function AgregarFilaDeControles(idFuente, descFuente) {
    var cadena = '<tr id="trControles_' + indiceMonitoreoF + '" class="TrControles" style=" height: 80px;display:none;">' +
                '<td class="Gris_Gde" style="border-radius: 0px;"></td>' +
                '<td class="TdFase_1">' +
                    '<div class="AcordeonAzul_1" style="line-height: 80px;width: 100%;height: 80px;">' +
                        '<table class="tblControlesFase_1" style="width:100%;height:100%;display:none;">' +
                            '<tr id="trMiniAcordeon" style="width:100%;height:100%;"> ' +
                                '<td id="TdEncabezado_2Td2_1" lang="aa" style="width:5%;height:100%;cursor: pointer;" class="AcordeonAzul_1" onclick="SubAcordeon_Click(this);"> ' +
                                    '<p class="p" style="margin-top: 16px;font-size: 9px;margin-left: 14px;line-height: 0px;">CTRL DE CARGA</p>' +
                                '</td>' +
                                '<td id="TdContenido_2Td2_1" class="Gris_Gde" style="width:80px;height:97%;border-radius: 0px;">' +
                                    '<div style="height: 75px;">' +
                                    '<input type="button" value="Muestra T1" class="classButton" onclick="btnObtenerMuestre(\'' + idFuente + '\',\'' + descFuente + '\');"/> &nbsp&nbsp' +
    //'<input type="button" value="Muestra T1-1" class="classButton"/>' +
                                    '</div>' +
                                '</td>' +
                            '</tr>' +
                      '</table>' +
                    '</div>' +
                 '</td>' +
                '<td class="TdFase_2"><div class="AcordeonAzul_2" style="line-height: 80px;width: 100%;height: 80px;"></div></td>' +
                '<td class="TdFase_3"><div class="AcordeonAzul_3" style="line-height: 80px;width: 100%;height: 80px;"></div></td>' +
                '<td class="TdFase_4"><div class="AcordeonAmarillo_1" style="line-height: 80px;width: 100%;height: 80px;"></div></td>' +
                '<td class="TdFase_5"><div class="AcordeonAmarillo_2" style="line-height: 80px;width: 100%;height: 80px;"></div></td>' +
                '<td class="TdFase_6"><div class="AcordeonAmarillo_3" style="line-height: 80px;width: 100%;height: 80px;"></div></td>' +
                '<td class="TdFase_7"><div class="AcordeonNaranja_1" style="line-height: 80px;width: 100%;height: 80px;"></div></td>' +
                '<td class="TdFase_8"><div class="AcordeonNaranja_2" style="line-height: 80px;width: 100%;height: 80px;"></div></td>' +
                '<td class="TdFase_9"><div class="AcordeonNaranja_3" style="line-height: 80px;width: 100%;height: 80px;"></div></td>' +
              '</tr>';

    return cadena;
}

function ExpandirCollapsarAcordeonHorizontalFases_Click(obj) {
    var numFase = $(obj).attr("id").split('_')[1];
    for (var i = 1; i < 10; i++) {
        if ($(obj).attr("lang") == "aa") {
            if (i == numFase) {
                $(".TdFase_" + i).css("width", "30% ");
                $(".tblControlesFase_" + i).show();
                $("#TdE1F_" + i).attr("lang", "ab");
            }
            else {
                $(".TdFase_" + i).css("width", "8% ");
                $(".tblControlesFase_" + i).hide();
                $("#TdE1F_" + i).attr("lang", "aa");
            }
        }
        else {
            $(".TdFase_" + i).css("width", "8% ");
            $(".tblControlesFase_" + i).hide();
            $("#TdE1F_" + i).attr("lang", "aa");
        }
    }
    ReSizeEncabezados();
    setTimeout(ReSizeEncabezados, 500);
    setTimeout(ReSizeEncabezados, 1000);
    setTimeout(ReSizeEncabezados, 1500);
    setTimeout(ReSizeEncabezados, 2000);
}

function ExpandeCollapsaAcordeonVerticalFuente_Click(obj) {
    var valorLang = $(obj).attr("lang");
    $(".TrControles").hide();
    $(".TrFuenteControles").attr("lang", "aa");
    $(".imgFuenteControles").attr("src", "../../Images/PanelDeControl/Expander/fDerechaG.png");
    $(obj).attr("lang", valorLang);

    if ($(obj).attr("lang") == "aa") {
        $("#trControles_" + $(obj).attr("id").split('_')[1]).show();
        $("#TdImg_" + $(obj).attr("id").split('_')[1]).attr("src", "../../Images/PanelDeControl/Expander/fAbajoG.png");
        $(obj).attr("lang", "ab");
    }
    else {
        $("#trControles_" + $(obj).attr("id").split('_')[1]).hide();
        $("#TdImg_" + $(obj).attr("id").split('_')[1]).attr("src", "../../Images/PanelDeControl/Expander/fDerechaG.png");
        $(obj).attr("lang", "aa");
    }
}

function AgregarFilaFuente(arregloMonitoreoIterar, faseInicial, faseFinal, indiceDefinicionesMonitoreo, classEncabezado) {
    var cadena = '<td class="' + classEncabezado + '" style="width:8%;font-weight:bold;height: 100%;"><pre> &nbsp&nbsp&nbsp<img class="imgFuenteControles" id="TdImg_' + (indiceDefinicionesMonitoreo + 1) + '" src="../../Images/PanelDeControl/Expander/fDerechaG.png" style="vertical-align: middle; width: 15px; height: 10px;">' + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[1] + '</pre></td>';
    for (var i = faseInicial; i < faseFinal; i++) {
        var numeroFases = arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[3].split(",").length;
        if (numeroFases == 1) {
            if (arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[3].split(",")[0] == i) {
                var idTdGet = indiceDefinicionesMonitoreo + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + i;
                var classTdGet = DeterminaEstatusDeId(arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[2].split(",")[0]);
                AgregaProgressBarMonitoreo(idTdGet, classTdGet, arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0], i);
                if (esLoadMonitoreo == true)
                    cadena += '<td class="TdFase_' + i + '" style="width:8%;height: inherit;"> <div id="Td_' + idTdGet + '" class="' + classTdGet + '" style="line-height: 32px;width: 100%;height: 32px;">' + "<div id='div" + idTdGet + "' class='BarraHijoV' style='display: inline-block; position: relative; height: 100%;'></div><div id='div" + idTdGet + "_txt' class='BarraTexto' style='display: inline-block; position: relative;'>" + '</div></td>';
                else
                    $("#Td_" + idTdGet).attr("class", classTdGet);
            }
            else
                cadena += '<td class="TdFase_' + i + '" style="width:8%;height: inherit;"><div id="Td_' + indiceDefinicionesMonitoreo + "_" + i + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + '" class="EstatusGris" style="line-height: 32px;width: 99%;height: 32px;"></div></td>';
        }
        else if (numeroFases == 2) {
            if (arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[3].split(",")[0] == i) {
                var idTdGet = indiceDefinicionesMonitoreo + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + i;
                var classTdGet = DeterminaEstatusDeId(arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[2].split(",")[0]);
                AgregaProgressBarMonitoreo(idTdGet, classTdGet, arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0], i);
                if (esLoadMonitoreo)
                    cadena += '<td class="TdFase_' + i + '" style="width:8%;height: inherit;"><div id="Td_' + idTdGet + '" class="' + classTdGet + '" style="line-height: 32px;width: 100%;height: 32px;">' + "<div id='div" + idTdGet + "' class='BarraHijoV' style='display: inline-block; position: relative; height: 100%;'></div><div id='div" + idTdGet + "_txt' class='BarraTexto' style='display: inline-block; position: relative;'>" + '</div></td>';
                else
                    $("#Td_" + idTdGet).attr("class", classTdGet);
            }
            else if (arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[3].split(",")[1] == i) {
                var idTdGet = indiceDefinicionesMonitoreo + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + i;
                var classTdGet = DeterminaEstatusDeId(arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[2].split(",")[1]);
                AgregaProgressBarMonitoreo(idTdGet, classTdGet, arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0], i);
                if (esLoadMonitoreo)
                    cadena += '<td class="TdFase_' + i + '" style="width:8%;height: inherit;"><div id="Td_' + idTdGet + '" class="' + classTdGet + '" style="line-height: 32px;width: 100%;height: 32px;">' + "<div id='div" + idTdGet + "' class='BarraHijoV' style='display: inline-block; position: relative; height: 100%;'></div><div id='div" + idTdGet + "_txt' class='BarraTexto' style='display: inline-block; position: relative;'>" + '</div></td>';
                else
                    $("#Td_" + idTdGet).attr("class", classTdGet);
            }
            else
                cadena += '<td class="TdFase_' + i + '" style="width:8%;height: inherit;"><div id="Td_' + indiceDefinicionesMonitoreo + "_" + i + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + '" class="EstatusGris" style="line-height: 32px;width: 99%;height: 32px;"></div></td>';
        }
        else if (numeroFases == 3) {
            for (var ii = 0; ii < 3; ii++) {
                if (arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[3].split(",")[ii] == i) {
                    var idTdGet = indiceDefinicionesMonitoreo + "_" + arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0] + i;
                    var classTdGet = DeterminaEstatusDeId(arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[2].split(",")[ii]);
                    AgregaProgressBarMonitoreo(idTdGet, classTdGet, arregloMonitoreoIterar[indiceDefinicionesMonitoreo].split("&&")[0], i);
                    if (esLoadMonitoreo)
                        cadena += '<td class="TdFase_' + i + '" style="width:8%;height: inherit;"><div id="Td_' + idTdGet + '" class="' + classTdGet + '" style="line-height: 32px;width: 100%;height: 32px;">' + "<div id='div" + idTdGet + "' class='BarraHijoV' style='display: inline-block; position: relative; height: 100%; '></div><div id='div" + idTdGet + "_txt' class='BarraTexto' style='display: inline-block; position: relative;'>" + '</div></td>';
                    else
                        $("#Td_" + idTdGet).attr("class", classTdGet);
                }
            }
        }
    }
    return cadena;
}

function DeterminaEstatusDeId(idItem) {
    var classColor = "EstatusGris";
    switch (idItem) {
        case "1": classColor = "EstatusGris"; break;
        case "2": classColor = "EstatusAmarillo"; break;
        //case "3": classColor = "EstatusRojo"; break;                                          
        case "4": classColor = "EstatusNaranja"; break;
        case "5": classColor = "EstatusVerde"; break;
        case "6": classColor = "EstatusAzul"; break;
        case "7": classColor = "EstatusMorado"; break;
        case "8": classColor = "EstatusBlanco"; break;
        case "9": classColor = "EstatusNegro"; break;
    }
    return classColor;
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



