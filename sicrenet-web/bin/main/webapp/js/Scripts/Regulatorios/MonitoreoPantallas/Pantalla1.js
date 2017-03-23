function cargaMonitoreoPantalla1() {
    $("#lblMensajeHerramienta").hide();
    $("#divMainG").css("display", "block");

    var properties = {
        width: 1250,
        height: 950,
        autoplay: true,
        image: {
            load_end: function () { cargarDiapositiva(); },
            transitions: [{ type: 'grid'}]
        }
    };

    $mytn3 = $('.mygallery').tn3(properties).data('tn3');
    $($(".tn3-gallery").children()[8]).hide();
    //$mytn3.fullscreen();
    $mytn3.resize(parseInt(document.getElementById("divHeader").offsetWidth) - 30, parseInt(document.documentElement.clientHeight - 150));
    setInterval('FechaYHora()', 200);
    FechaYHora();
    cargarPaises();
}


var $mytn3 = null;
var reproduciendo = false;
var timerPresentacion = null;
$(function () {

});



function nextDiapositiva() {
    $mytn3.show('next');
}

function prevDiapositiva() {
    $mytn3.show('prev');
}

function playStopPresentacion(titulo) {
    if (titulo === 'Start Slideshow') {
        reproduciendo = true;
        playPresentacion();
    }
    else {
        reproduciendo = false;
        stopPresentacion();
    }
}

var intervaloMiliSeg = 5000;
function playPresentacion() {
    timerPresentacion = setInterval(function () { nextDiapositiva() }, intervaloMiliSeg);

}
function stopPresentacion() {
    clearInterval(timerPresentacion);
    timerPresentacion = null;
}


//----------------------------------------- 

var noDiapositiva;
function cargarDiapositiva() {
    var contenedor = $('.contenedorDiapositiva')[0];
    noDiapositiva = contenedor != undefined ? parseInt($(contenedor).attr('id').split('_')[1]) : 1;
    asignarDiapositiva();
}

function asignarDiapositiva() {

    $('#container_' + noDiapositiva).html("");
    $('#container_' + noDiapositiva).html(htmlDiapositiva('', 'Diapositiva' + noDiapositiva, noDiapositiva));
    $(".calendario").datepicker();
}

function htmlDiapositiva(titulo, contenidoHTML, indiceDeDiapositiva) {
    var cad = ''; tituloDiapositiva = titulo;
    cad += '<header>';
    cad += '<div><span class="tLeft"><b id="spNamePais_' + indiceDeDiapositiva + '"></b> <img id="imgBandera_' + indiceDeDiapositiva + '" style="  height: 19px;"> &nbsp|&nbsp<b id="bFechaActual_' + indiceDeDiapositiva + '"></b></span> <span class="tCenter" style="text-transform: uppercase;font-family: sans-serif;font-size: 18px;">Monitoreo de oficios, actividades y reportes regulatorios</span></div>';
    cad += '</header>';
    cad += '<div class="col-a' + (indiceDeDiapositiva <= 1 ? indiceDeDiapositiva : 1) + '">';
    cad += ' <h2>Oficios no entregados</h2>';
    cad += ' <div id="divTablaDatos_OficiosNoEntregado_' + indiceDeDiapositiva + '" alt="0" class="borderRight" style="/*overflow-y:auto;*/height:76%;">';
    cad += '</div> </div>';
    cad += '<div class="col-b' + (indiceDeDiapositiva <= 1 ? indiceDeDiapositiva : 1) + '">';
    cad += ' <h2>Actividades no realizadas <span id="logoSicrenet"><img src="../../Images/ImgsMasterPage/logoPantallasMon.png" style="/*height:46px;width:120px;*/"></span></h2>';
    cad += '<div id="divTablaDatos_ActividadesNoRealizadas_' + indiceDeDiapositiva + '" alt="0" class="borderLeft" style="/*overflow-y:auto;*/height: 76%;">';
    cad += ' </div>';
    cad += '</div>';
    cad += '<div class="col-a' + (indiceDeDiapositiva <= 1 ? indiceDeDiapositiva : 1) + '">'
        + ' <h2>Oficios por entregar</h2>'
        + '<div  id="divTablaDatos_OficiosXEntregar_' + indiceDeDiapositiva + '" alt="0" class="borderRight" style="/*overflow-y:auto;*/height: 76%;">';
    cad += '</div>'
        + '</div>'
        + '<div class="col-b' + (indiceDeDiapositiva <= 1 ? indiceDeDiapositiva : 1) + '">'
        + '<h2>Actividades por entregar</h2>'
        + '<div id="divTablaDatos_ActividadesXEntregar_' + indiceDeDiapositiva + '" alt="0" class="borderLeft" style="/*overflow-y:auto;*/height: 76%;">';
    cad += '</div>'
        + '</div>'
        + '<div class="col-c' + (indiceDeDiapositiva <= 1 ? indiceDeDiapositiva : 1) + '">'
        + '<h2>Regulatorios no entregados</h2> '
        + '<div id="divTablaDatos_RegulatoriosNoEntregados_' + indiceDeDiapositiva + '" alt="0" style="/*overflow-y:auto;*/height: 84%; border-right: 4px solid #3E4431;">';
    cad += '</div>'
        + '</div>'
        + '<div class="col-c' + (indiceDeDiapositiva <= 1 ? indiceDeDiapositiva : 1) + '">'
            + '<h2>Regulatorios se entregan hoy</h2>'
            + '<div id="divTablaDatos_RegulatoriosSeEntreganHoy_' + indiceDeDiapositiva + '" alt="0" style="/*overflow-y:auto;*/height: 84%; border-right: 4px solid #3E4431;">';
    cad += '</div>'
        + '</div>'
        + '<div class="col-c' + (indiceDeDiapositiva <= 1 ? indiceDeDiapositiva : 1) + '">'
        + '<h2>Regulatorios se entregan pr&oacute;ximos 7 d&iacute;as</h2>'
        + '<div id="divTablaDatos_RegulatoriosSeEntreganProximos7Dias_' + indiceDeDiapositiva + '" alt="0" style="/*overflow-y:auto;*/height: 84%; border-right: 4px solid #3E4431;">';
    cad += '</div>'
        + '</div>';

    Waiting(true, "Espere por favor. Cargando Información...");
    timerScrollTbl1 = null; timerScrollTbl2 = null; timerScrollTbl3 = null;
    setTimeout(function () { cargarCorteActual(true); }, 500);
    return cad;
}

var JSONPaises1; var JSONPaises2;
function cargarPaises() {
    peticionAjax('MonitoreoPantalla1.aspx/getPaises', "POST", { idPais: 0, estatusPais: 1, opcion: 1 },
    function (data) {
        if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
            JSONPaises1 = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
            JSONPaises2 = obtenerArregloDeJSON(data.d.split("%%&&")[2], false);
            $("#spNamePais_" + noDiapositiva).html(JSONPaises1[noDiapositiva - 1]["descPais"]);
            $("#imgBandera_" + noDiapositiva).attr("src", "../../Images/PanelDeControl/BanderasRect/" + omitirAcentos(replaceAll(JSONPaises1[noDiapositiva - 1]["descPais"].toLowerCase(), " ", "")) + ".gif");
            cargarCorteActual(false);
        }
        else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);

    }, null);
}

function cargarCorteActual(cargarReportes) {
    peticionAjax("MonitoreoPantalla1.aspx/getFechaActual", "POST", null,
            function (data) {
                $("#bFechaActual_" + noDiapositiva).html(data.d);
                if (cargarReportes)
                    MostrarReportes();
            }, null);
}

function MostrarReportes() {
    $("#spNamePais_" + noDiapositiva).html(JSONPaises1[noDiapositiva - 1]["descPais"]);
    $("#imgBandera_" + noDiapositiva).attr("src", "../../Images/PanelDeControl/BanderasRect/" + omitirAcentos(replaceAll(JSONPaises1[noDiapositiva - 1]["descPais"].toLowerCase(), " ", "")) + ".gif");

    peticionAjax('MonitoreoPantalla1.aspx/getMonitoreo', "POST", { idPaisOficiosYAct: /*1*/JSONPaises1[noDiapositiva - 1]["idPais"], idPaisRegulatorios: /*1*/JSONPaises2[noDiapositiva - 1]["idPais"] },
    function (data) {
        if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var JSONOficios1 = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                var JSONOficios2 = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                var JSONActividades1 = obtenerArregloDeJSON(data.d.split("%%&&")[2], false);
                var JSONActividades2 = obtenerArregloDeJSON(data.d.split("%%&&")[3], false);
                var JSONReportes1 = obtenerArregloDeJSON(data.d.split("%%&&")[4], false);
                var JSONReportes2 = obtenerArregloDeJSON(data.d.split("%%&&")[5], false);
                var JSONReportes3 = obtenerArregloDeJSON(data.d.split("%%&&")[6], false);

                $("#divTablaDatos_OficiosNoEntregado_" + noDiapositiva).html('<div id="divEncabezadoTemp_TblOficiosNoEntregados" style="width:100%"></div>' + creaTablaReporte("TblOficiosNoEntregados", JSONOficios1, new Array("Días atraso", "Fecha de Entrega", "No oficio", "Asunto", "Responsable"), "largeTable", "tdColor1" + (noDiapositiva <= 1 ? noDiapositiva : 1), "tdEncabezado1" + (noDiapositiva <= 1 ? noDiapositiva : 1)));
                $("#divTablaDatos_OficiosXEntregar_" + noDiapositiva).html('<div id="divEncabezadoTemp_TblOficiosXEntregar" style="width:100%"></div>' + creaTablaReporte("TblOficiosXEntregar", JSONOficios2, new Array("Fecha de Entrega", "No oficio", "Asunto", "Responsable"), "shortTable", "tdColor1" + (noDiapositiva <= 1 ? noDiapositiva : 1), "tdEncabezado1" + (noDiapositiva <= 1 ? noDiapositiva : 1)));

                $("#divTablaDatos_ActividadesNoRealizadas_" + noDiapositiva).html('<div id="divEncabezadoTemp_TblActividadesNoRealizadas" style="width:100%"></div>' + creaTablaReporte("TblActividadesNoRealizadas", JSONActividades1, new Array("Días atraso", "Fecha de Entrega", "No actividad", "Asunto", "Responsable"), "largeTable", "tdColor2" + (noDiapositiva <= 1 ? noDiapositiva : 1), "tdEncabezado2" + (noDiapositiva <= 1 ? noDiapositiva : 1)));
                $("#divTablaDatos_ActividadesXEntregar_" + noDiapositiva).html('<div id="divEncabezadoTemp_TblActividadesXEntregar" style="width:100%"></div>' + creaTablaReporte("TblActividadesXEntregar", JSONActividades2, new Array("Fecha de Entrega", "No actividad", "Asunto", "Responsable"), "shortTable", "tdColor2" + (noDiapositiva <= 1 ? noDiapositiva : 1), "tdEncabezado2" + (noDiapositiva <= 1 ? noDiapositiva : 1)));

                $("#divTablaDatos_RegulatoriosNoEntregados_" + noDiapositiva).html('<div id="divEncabezadoTemp_TblRegulatoriosNoEntregados" style="width:100%"></div>' + creaTablaReporte("TblRegulatoriosNoEntregados", JSONReportes1, new Array("Días atraso", "Fecha de Entrega", "No serie", "Reporte", "Responsable"), "largeTable", "tdColor3" + (noDiapositiva <= 1 ? noDiapositiva : 1), "tdEncabezado3" + (noDiapositiva <= 1 ? noDiapositiva : 1)));
                $("#divTablaDatos_RegulatoriosSeEntreganHoy_" + noDiapositiva).html('<div id="divEncabezadoTemp_TblRegulatoriosSeEntreganHoy" style="width:100%"></div>' + creaTablaReporte("TblRegulatoriosSeEntreganHoy", JSONReportes2, new Array("Fecha de Entrega", "No serie", "Reporte", "Responsable"), "shortTable", "tdColor3" + (noDiapositiva <= 1 ? noDiapositiva : 1), "tdEncabezado3" + (noDiapositiva <= 1 ? noDiapositiva : 1)));
                $("#divTablaDatos_RegulatoriosSeEntreganProximos7Dias_" + noDiapositiva).html('<div id="divEncabezadoTemp_TblRegulatoriosSeEntreganProximos7Dias" style="width:100%"></div>' + creaTablaReporte("TblRegulatoriosSeEntreganProximos7Dias", JSONReportes3, new Array("Fecha de Entrega", "No serie", "Reporte", "Responsable"), "shortTable", "tdColor3" + (noDiapositiva <= 1 ? noDiapositiva : 1), "tdEncabezado3" + (noDiapositiva <= 1 ? noDiapositiva : 1)));

                clearTimeout(timerScrollTbl1); clearTimeout(timerScrollTbl2); clearTimeout(timerScrollTbl3); clearTimeout(timerScrollTbl4);
                clearTimeout(timerScrollTbl5); clearTimeout(timerScrollTbl6); clearTimeout(timerScrollTbl7);

                timerScrollTbl1 = setTimeout(function () { scrollearTblReportesMonitoreo("TblOficiosNoEntregados") }, 4000);
                timerScrollTbl2 = setTimeout(function () { scrollearTblReportesMonitoreo("TblOficiosXEntregar") }, 4000);
                timerScrollTbl3 = setTimeout(function () { scrollearTblReportesMonitoreo("TblActividadesNoRealizadas") }, 4000);
                timerScrollTbl4 = setTimeout(function () { scrollearTblReportesMonitoreo("TblActividadesXEntregar") }, 4000);
                timerScrollTbl5 = setTimeout(function () { scrollearTblReportesMonitoreo("TblRegulatoriosNoEntregados") }, 4000);
                timerScrollTbl6 = setTimeout(function () { scrollearTblReportesMonitoreo("TblRegulatoriosSeEntreganHoy") }, 4000);
                timerScrollTbl7 = setTimeout(function () { scrollearTblReportesMonitoreo("TblRegulatoriosSeEntreganProximos7Dias") }, 4000);

                //                AddEncabezadoEstaticoReportesMonitoreo("TblOficiosNoEntregados", JSONOficios1[0], "", "#10ada7");
                //                AddEncabezadoEstaticoReportesMonitoreo("TblOficiosXEntregar", JSONOficios2[0], "", "#10ada7");
                //                AddEncabezadoEstaticoReportesMonitoreo("TblActividadesNoRealizadas", JSONActividades1[0], "", "#425b9a");
                //                AddEncabezadoEstaticoReportesMonitoreo("TblActividadesXEntregar", JSONActividades2[0], "", "#425b9a");
                //                AddEncabezadoEstaticoReportesMonitoreo("TblRegulatoriosNoEntregados", JSONReportes1[0], "", "#2c81b1");
                //                AddEncabezadoEstaticoReportesMonitoreo("TblRegulatoriosSeEntreganHoy", JSONReportes2[0], "", "#2c81b1");
                //                AddEncabezadoEstaticoReportesMonitoreo("TblRegulatoriosSeEntreganProximos7Dias", JSONReportes3[0], "", "#2c81b1");
                AddEncabezadoEstaticoReportesMonitoreo("TblOficiosNoEntregados", JSONOficios1[0], "", "tdEncabezado1" + (noDiapositiva <= 1 ? noDiapositiva : 1));
                AddEncabezadoEstaticoReportesMonitoreo("TblOficiosXEntregar", JSONOficios2[0], "", "tdEncabezado1" + (noDiapositiva <= 1 ? noDiapositiva : 1));
                AddEncabezadoEstaticoReportesMonitoreo("TblActividadesNoRealizadas", JSONActividades1[0], "", "tdEncabezado2" + (noDiapositiva <= 1 ? noDiapositiva : 1));
                AddEncabezadoEstaticoReportesMonitoreo("TblActividadesXEntregar", JSONActividades2[0], "", "tdEncabezado2" + (noDiapositiva <= 1 ? noDiapositiva : 1));
                AddEncabezadoEstaticoReportesMonitoreo("TblRegulatoriosNoEntregados", JSONReportes1[0], "", "tdEncabezado3" + (noDiapositiva <= 1 ? noDiapositiva : 1));
                AddEncabezadoEstaticoReportesMonitoreo("TblRegulatoriosSeEntreganHoy", JSONReportes2[0], "", "tdEncabezado3" + (noDiapositiva <= 1 ? noDiapositiva : 1));
                AddEncabezadoEstaticoReportesMonitoreo("TblRegulatoriosSeEntreganProximos7Dias", JSONReportes3[0], "", "tdEncabezado3" + (noDiapositiva <= 1 ? noDiapositiva : 1));


            }
        }
        else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}


function creaTablaReporte(idTabla, listaDeJSON, lstColumnas, classTabla, classColorTd, classFondoEncTh) {
    var cad = '<div id="div' + idTabla + '" style="height:100%;overflow:auto;"><table id="' + idTabla + '" class="' + classTabla + '">';
    cad += '<thead>';
    cad += '<tr id="trEncabezado_' + idTabla + '">';
    var auxJSON = listaDeJSON[0] == null ? lstColumnas : listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados != "clear") {
            cad += '<th  class="' + classFondoEncTh + '">';
            cad += listaDeJSON[0] == null ? auxJSON[encabezados] : encabezados.toString();
            cad += '</th>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += ((filas % 2 == 0) ? '<tr class="' + classColorTd + '" ' : '<tr  ') + '">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td>';
            cad += json[element];
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div>';
    return cad;
}

var timerScrollTbl1 = null; var timerScrollTbl2 = null; var timerScrollTbl3 = null;
var timerScrollTbl4 = null; var timerScrollTbl5 = null; var timerScrollTbl6 = null;
var timerScrollTbl7 = null;
function scrollearTblReportesMonitoreo(idTabla) {
    if (document.getElementById('div' + idTabla) != null && document.getElementById('div' + idTabla).scrollHeight > 0) {
        var valorScrolTopActual = parseInt($("#div" + idTabla).attr("alt"));
        if (document.getElementById('div' + idTabla).scrollTop == 0 || $("#div" + idTabla).attr("lang") == undefined)
            $("#div" + idTabla).attr("lang", "Sumando");

        if (valorScrolTopActual >= 0 && $("#div" + idTabla).attr("lang") == "Sumando") {

            document.getElementById('div' + idTabla).scrollTop = document.getElementById('div' + idTabla).scrollTop + 20;
            if (document.getElementById('div' + idTabla).scrollTop == valorScrolTopActual)
                $("#div" + idTabla).attr("lang", "Restando");
        }
        else if ($("#div" + idTabla).attr("lang") == "Restando") {
            document.getElementById('div' + idTabla).scrollTop = document.getElementById('div' + idTabla).scrollTop - 20;
            if (document.getElementById('div' + idTabla).scrollTop.toString().indexOf("-") != -1) {
                $("#div" + idTabla).attr("lang", "Sumando");
                document.getElementById('div' + idTabla).scrollTop = 0;
            }
        }
        $("#div" + idTabla).attr("alt", document.getElementById('div' + idTabla).scrollTop)

        if (idTabla == "TblOficiosNoEntregados") timerScrollTbl1 = setTimeout(function () { scrollearTblReportesMonitoreo(idTabla) }, 3000);
        if (idTabla == "TblOficiosXEntregar") timerScrollTbl2 = setTimeout(function () { scrollearTblReportesMonitoreo(idTabla) }, 3000);
        if (idTabla == "TblActividadesNoRealizadas") timerScrollTbl3 = setTimeout(function () { scrollearTblReportesMonitoreo(idTabla) }, 3000);
        if (idTabla == "TblActividadesXEntregar") timerScrollTbl4 = setTimeout(function () { scrollearTblReportesMonitoreo(idTabla) }, 3000);
        if (idTabla == "TblRegulatoriosNoEntregados") timerScrollTbl5 = setTimeout(function () { scrollearTblReportesMonitoreo(idTabla) }, 3000);
        if (idTabla == "TblRegulatoriosSeEntreganHoy") timerScrollTbl6 = setTimeout(function () { scrollearTblReportesMonitoreo(idTabla) }, 3000);
        if (idTabla == "TblRegulatoriosSeEntreganProximos7Dias") timerScrollTbl7 = setTimeout(function () { scrollearTblReportesMonitoreo(idTabla) }, 3000);
    }
}

function AddEncabezadoEstaticoReportesMonitoreo(idTabla, registroEnc, listaNoVisibles, classFondoEnc) {
    if (document.getElementById('div' + idTabla) != null && document.getElementById(idTabla) != null && document.getElementById(idTabla).offsetHeight > document.getElementById('div' + idTabla).offsetHeight) {
        var lstEncabezados = "";
        for (var encabezados in registroEnc) {
            if (DevuelveIndiceDeElementoExistenteXSplit(encabezados, listaNoVisibles) == -1)
                lstEncabezados += encabezados.toString() + ",";
        }
        $("#trEncabezado_" + idTabla).hide();
        $("#divEncabezadoTemp_" + idTabla).html(AgregaEncabezadoEstaticoReportesMonitoreo(idTabla, lstEncabezados, classFondoEnc));
        $("#div" + idTabla).css("height", "92%"); //X Agregar Encabezado reducir tabla Arriba
    }
}


function AgregaEncabezadoEstaticoReportesMonitoreo(idTabla, lstEncabezados, classFondoEnc) { // HERE    //
    var cad = '<div id="divEncabezado"  >';
    cad += '<table id="tblEncabezado_' + idTabla + '" style="width: 100%;" class="largeTable">  ';
    cad += '<tr style="color:White;height:25px;">';
    for (var i = 0; i < lstEncabezados.split(',').length - 1; i++) {
        cad += '<th class="' + classFondoEnc + '" ';
        cad += "width:" + (document.getElementById(idTabla).rows[1].cells[i].offsetWidth   /*+ (i == arrayEncabezados.length - 1 ? (document.getElementById("AdjResultsDiv").scrollHeight <= 458 ? -2 : 15) : "")*/) + "px";
        cad += '">';
        cad += lstEncabezados.split(',')[i];
        cad += '</th>';
    }
    cad += '</tr></table></div>';
    setTimeout(function () { resizeEncabezadoReportesMonitoreo(idTabla) }, 10);
    return cad;
}


function resizeEncabezadoReportesMonitoreo(idTabla) {
    if (document.getElementById('div' + idTabla) != null && document.getElementById(idTabla) != null && document.getElementById(idTabla).offsetHeight > document.getElementById('div' + idTabla).offsetHeight) {
        $("#divEncabezadoTemp_" + idTabla).css("width", (document.getElementById("div" + idTabla).offsetWidth - 0) + "px");
        for (var i = 0; i < document.getElementById(idTabla).rows[1].cells.length; i++)
            if (document.getElementById("tblEncabezado_" + idTabla) != null)
                $(document.getElementById("tblEncabezado_" + idTabla).rows[0].cells[i]).css("width", (document.getElementById(idTabla).rows[1].cells[i].offsetWidth) + "px");
    }
}