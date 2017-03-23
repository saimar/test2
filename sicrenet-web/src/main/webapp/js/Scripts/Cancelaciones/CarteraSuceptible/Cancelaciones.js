//---------------------------------------------------FUNCIONES INICIALES
//------------------------- ONCHANGE CALENDARIO FECHA MARCAGE (Obtener UDI`s) -------
function obtenerUDI() {
    var fechaSolicitada = $("#MainContent_tbxFechaMarcaje").val();
    if (fechaSolicitada != "" && fechaSolicitada.indexOf("/") != -1 && fechaSolicitada.split("/")[0].length == 2 && fechaSolicitada.split("/")[1].length == 2 && fechaSolicitada.split("/")[2].length == 4) {
        actualizarFechaInformacionYElaboracion();
        Waiting(true, "Cargando Información...");
        peticionAjax("Cancelaciones.aspx/obtenerUDI", "POST", { Fecha: fechaSolicitada },
                ObtenerUDIFinalizada, ObtenerUDIFinalizada);
    } else {
        $('#MainContent_tbxUDI').val("");
        MostrarMsj("Debe seleccionar una Fecha de Información valida.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
    }
}

function actualizarFechaInformacionYElaboracion() {
    if ($("#MainContent_tbxFechaMarcaje").val() != "" && $("#MainContent_txtFechaEntrega").val() != "") {
        peticionAjax("Cancelaciones.aspx/actualizarFechaInformacionYElaboracion", "POST", { idPeriodo: $("#MainContent_hfIdPeriodo").val(), idEtapa: 0, FDFechaInformacion: $("#MainContent_tbxFechaMarcaje").val(), FDFechaElaboracion: $("#MainContent_txtFechaEntrega").val() },
                function (data) {
                    var msj = data.d;
                }, null);
    }
}

function ObtenerUDIFinalizada(data) {
    Waiting(false, "Cargando Información...");
    if (data.d != "") {
        var arrayJSON = obtenerArregloDeJSON(data.d, false);
        $('#MainContent_tbxUDI').val(arrayJSON[0].FNVALOR.toString());
    }

}
//////----------------------CARGA INICIAL
function inicializarTabs() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    var tabs = [
            new Pestania($("#liTab6"), $("#divCifrasCancon")),
            new Pestania($("#liTab1"), $("#divSuceptible")),
            new Pestania($("#liTab2"), $("#divNoSuceptible")),
            new Pestania($("#liTab3"), $("#divSuceptibleFinal")),
            new Pestania($("#liTab4"), $("#divExcluidoInterfaces")),
            new Pestania($("#liTab5"), $("#divConsolidado"))];
    WidtDatePicker();
    return tabs;
}

function cargaInicial() {
    if ($("#MainContent_hfIdPeriodo").val() == "") {
        peticionAjax("ProcesoCancelacion.aspx/obtenerPeriodosPendientesPorTerminar", "POST", { opcion: '2' },
                function (data) {
                    if (data.d.indexOf("ERRORCATCH") == -1) {
                        if (data.d != "Sin Filas") {
                            var JSON = obtenerArregloDeJSON(data.d, false);
                            if (JSON != null && JSON[0] != null)
                                $("#MainContent_hfIdPeriodo").val(JSON[0].idPeriodo);
                        }
                    }
                    else
                        MostrarMsj(data.d, "Sin Datos.", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                    tabs = inicializarTabs();
                    cargarDeControles();
                }, null);
    }
    else {
        tabs = inicializarTabs();
        cargarDeControles();
    }
}

function Pestania(idTab, idContenido) {
    this.TAB = idTab;
    this.Contenido = idContenido;

    this.obtenerFoco = function () {
        var imagenTabs = "url('../../Images/Cancelaciones/CarteraSuceptible/ico" + $(this.TAB).attr("id").replace("liTab", "") + ".png')";
        $(".navigation").css({ 'background-image': imagenTabs });

        $(".navigation li").attr("class", "liInactiva");
        $(this.TAB).attr("class", "liActiva");

        $(".Contenidos").slideUp('slow');
        $(this.Contenido).slideDown('slow');
        $("#MainContent_hfEtapa").val(encontrarIndexDeTab(this.TAB)); //Checar ID

        if (encontrarIndexDeTab(this.TAB) == 4 || encontrarIndexDeTab(this.TAB) == 5)
            document.getElementById("ulFlujo").style.width = "955px";
        else
            document.getElementById("ulFlujo").style.width = "947px";
    }

    this.inicializar = function () {
        this.obtenerFoco();
    }

    this.BloquearControles = function () {
    } /// <reference path="Cancelaciones.js" />

}

function encontrarIndexDeTab(tab) {
    return parseInt($(tab).attr("id").replace("liTab", ""));
}

var tabTempClickeada;
function cargarDeControles(idEtapaSolicitada, tab, aplicar) {
    tabTempClickeada = tab;
    if (idEtapaSolicitada == undefined) {
        idEtapaSolicitada = 0;
        document.getElementById("ulFlujo").style.width = "947px";
    }
    var idPeriodos = $("#MainContent_hfIdPeriodo").val();
    peticionAjax("Cancelaciones.aspx/cargarDeControles", "POST", { idPeriodo: idPeriodos, idEtapa: idEtapaSolicitada, FDFechaInformacion: '1990/01/01', FDFechaElaboracion: '1990/01/01' }, cargarDeControlesFinalizada, cargarDeControlesFinalizada);
}

var esLoadInit = false;
function cargarDeControlesFinalizada(data) {
    try {
        var arrayJSON = obtenerArregloDeJSON(data.d.split('%%&&')[1], false);
        if (arrayJSON != null && arrayJSON[0] != null) {
            $("#MainContent_tbxFechaMarcaje").val(arrayJSON[0].FDFechaInformacion);
            $("#MainContent_txtFechaEntrega").val(arrayJSON[0].FDFechaElaboracion);
            if (arrayJSON[0].FDFechaInformacion != "" && !esLoadInit) {
                esLoadInit = true;
                obtenerUDI();
            }
        }
        arrayJSON = obtenerArregloDeJSON(data.d.split('%%&&')[0], false);
        var json = arrayJSON[0];
        switch (json.EtapaCancelacion.toString()) {
            case "Cifras Cancon":
                tabs[0].inicializar();
                cargaControlesTab6();
                $("#MainContent_hfEtapa").val(6);
                break;
            case "Susceptible a Cancelar":
                tabs[1].inicializar();
                cargaControlesTabs1y3(parseInt(json.statusCredimax.toString()), parseInt(json.statusArrendamientoCredimax.toString()), parseInt(json.statusAlnovaConsumo.toString()), parseInt(json.statusAlnovaVivienda.toString()), parseInt(json.statusAlnovaComercial.toString()), parseInt(json.statusTDC.toString()), parseInt(json.statusCanExtraordianria.toString()), 1);
                cargaBotonesTabs1y3(json, 1);
                $("#MainContent_hfEtapa").val(1);
                break;
            case "No Susceptible a Cancelar":
                tabs[2].inicializar();
                cargaControlesTabs2y4(json, 2);
                $("#MainContent_hfEtapa").val(2);
                break;
            case "Susceptible Final a Cancelar":
                tabs[3].inicializar();
                cargaControlesTabs1y3(parseInt(json.statusCredimax.toString()), parseInt(json.statusArrendamientoCredimax.toString()), parseInt(json.statusAlnovaConsumo.toString()), parseInt(json.statusAlnovaVivienda.toString()), parseInt(json.statusAlnovaComercial.toString()), parseInt(json.statusTDC.toString()), parseInt(json.statusCanExtraordianria.toString()), 3);
                cargaBotonesTabs1y3(json, 3);
                $("#MainContent_hfEtapa").val(3);
                break;
            case "Excluido Interfaces":
                tabs[4].inicializar();
                cargaControlesTabs2y4(json, 4);
                $("#MainContent_hfEtapa").val(4);
                break;
            case "Consolidado":
                tabs[5].inicializar();
                cargaControlesTab5(arrayJSON);
                $("#MainContent_hfEtapa").val(5);
                break;

        }
        VerificarBotonesCarteraSuceptible('divSuceptible');
        VerificarBotonesCarteraSuceptible('divSuceptibleFinal');
        HabilitarBotonesDeConsultaSuceptibles();
    }
    catch (err) {
        VerificarBotonesCarteraSuceptible('divSuceptible');
        VerificarBotonesCarteraSuceptible('divSuceptibleFinal');
        HabilitarBotonesDeConsultaSuceptibles();
        try {
            tabTempClickeada.obtenerFoco();
        }
        catch (errr) {
            tabs[0].inicializar();
            $("#MainContent_hfEtapa").val(1);
        }
    }

    if (bandera == 0) {
        $("#MainContent_hfEtapaFija").val($("#MainContent_hfEtapa").val());
        bandera = 1;
    }
    setTimeout(terminarWait, 200);
}

function VerificarBotonesCarteraSuceptible(idDiv) {
    $('#' + idDiv + ' input:checkbox').each(function (index) {
        if ($(this).is(":checked") == true)
            $(this).parent().parent().find('a').removeAttr('disabled');
        else
            $(this).parent().parent().find('a').attr('disabled', 'disabled');
    });

    HabilitarBotonFinalizar();
}

function HabilitarBotonFinalizar() {
    $('div.Contenidos div.divBotonesDeSeguimiento').each(function (index) {
        var bandera = true;
        $(this).parent().find('input:checkbox').each(function (index) {
            bandera = $(this).is(':checked') && bandera;
        });

        if (bandera) {
            $(this).find(':last-child').removeAttr('disabled')
            $(this).find(':last-child').attr('class', 'classButton');
            // $(this).find('button:last').removeAttr("disabled");
            //$(this).find('button:last').attr('class', 'classButton');
        }
        else {
            $(this).find(':last-child').attr("disabled", true);
            $(this).find(':last-child').attr('class', 'classButtonDis');
            // $(this).find('button:last').attr("disabled", true);
            //$(this).find('button:last').attr('class', 'classButtonDis');
        }
    });
}

function HabilitarBotonesDeConsultaSuceptibles() {
    $('#divSuceptible input:checkbox').click(function () {
        VerificarBotonesCarteraSuceptible('divSuceptible');
    });


    $('#divSuceptibleFinal input:checkbox').click(function () {
        VerificarBotonesCarteraSuceptible('divSuceptibleFinal');
    });

    $('#divNoSuceptible input:checkbox').click(function () {
        HabilitarBotonFinalizar();
    });

    $('#divExcluidoInterfaces input:checkbox').click(function () {
        HabilitarBotonFinalizar();
    });
}

//---------------------------------------------------------------------------------------------------------------------------------
function cargaControlesTab5(arrayJson) {
    var cad = "";
    for (var x = 0; x < arrayJson.length; x++) {
        cad += '<option value="' + arrayJson[x].FVCNombreArchivo + '">' + arrayJson[x].FVCNombreArchivo + '</option>';
    }
    $('#slcOrigen').html(cad);
}
//------------------------------------------------------------------------------------------------------------------------

function cargaControlesTabs1y3(statusCredimax, statusArrendamiento, statusConsumo, statusVivienda, statusComercial, statusTDC, statusCanExtraordianria, tab) {
    cargaControlesTabs1y3Auxiliar((tab == 1) ? "accordionCredimax" : "accordionCredimaxFinal", statusCredimax);
    cargaControlesTabs1y3Auxiliar((tab == 1) ? "accordionArmtoCredimax" : "accordionArmtoCredimaxFinal", statusArrendamiento);
    cargaControlesTabs1y3Auxiliar((tab == 1) ? "accordionConsumo" : "accordionConsumoFinal", statusConsumo);
    cargaControlesTabs1y3Auxiliar((tab == 1) ? "accordionVivienda" : "accordionViviendaFinal", statusVivienda);
    cargaControlesTabs1y3Auxiliar((tab == 1) ? "accordionComercial" : "accordionComercialFinal", statusComercial);
    cargaControlesTabs1y3Auxiliar((tab == 1) ? "accordionTDC" : "accordionTDCFinal", statusTDC);
    cargaControlesTabs1y3Auxiliar((tab == 1) ? "accordionExtraordinaria" : "accordionExtraordinariaFinal", statusCanExtraordianria);
}

function cargaControlesTabs1y3Auxiliar(idObj, status) {
    idObj = "#" + idObj;
    if (status == 1) {
        $(idObj + " a").removeAttr('disabled');
        $(idObj + " input").attr("checked", "checked");
    }
    else {
        $(idObj + " a").attr('disabled', '-1');
        $(idObj + " input").removeAttr("checked");
    }
}

function cargaBotonesTabs1y3(json, tab) {
    var divBotonesSuceptible = ['divBotonesCredimax', 'divBotonesArrendamiento', 'divBotonesConsumo', 'divBotonesVivienda', 'divBotonesComercial', 'divBotonesTDC', 'divBotonesExtraordinaria'];
    var divBotonesSuceptibleFinal = ['divBotonesCredimaxFinal', 'divBotonesArrendamientoFinal', 'divBotonesConsumoFinal', 'divBotonesViviendaFinal', 'divBotonesComercialFinal', 'divBotonesTDCFinal', 'divBotonesExtraordinariaFinal'];
    var divBotones = (tab == 1) ? divBotonesSuceptible : divBotonesSuceptibleFinal;
    cargarBotonesDeArchivo(divBotones[0], json.archivoCredimax);
    cargarBotonesDeArchivo(divBotones[1], json.archivoArrendamientoCredimax);
    cargarBotonesDeArchivo(divBotones[2], json.archivoAlnovaConsumo);
    cargarBotonesDeArchivo(divBotones[3], json.archivoAlnovaVivienda);
    cargarBotonesDeArchivo(divBotones[4], json.archivoAlnovaComercial);
    cargarBotonesDeArchivo(divBotones[5], json.archivoTDC);
    cargarBotonesDeArchivo(divBotones[6], json.archivosCancelacionExtraordianria);
}

function cargarBotonesDeArchivo(idDiv, cad) {
    if (cad == '')
        return;
    cad = reformarJSON(cad);
    var arrayJSON = obtenerArregloDeJSON(cad, false);
    $('#' + idDiv).html('<center>' + generarBotones(arrayJSON[0]) + '<center>');
}

function reformarJSON(cad) {
    var aux = cad.split('@@');
    var cadFinal = '{';
    for (var x = 0; x < aux.length - 1; x++) {
        aux[x] = '"' + aux[x] + '"';
        aux[x] = aux[x].replace('$', '":"');
        if (x < aux.length - 2)
            aux[x] = aux[x] + ",";
    }

    for (var y = 0; y < aux.length - 1; y++) {
        cadFinal += aux[y];
    }
    cadFinal += '}';
    return cadFinal;
}


function generarBotones(json) {
    var numBotones = json.length;
    var tabla = "<br /><center><table>";
    for (var element in json) {
        var esConsolidado = element.toString().indexOf("Consolidado") != -1 ? true : false;
        if ((element.toString()).indexOf("Extraordinaria") == -1) {
            tabla += "<tr><td>" + "<input type='button' style='width:200px;' onclick='pedirArchivo(\"" + json[element].toString() + "\"," + esConsolidado + ");' value='" + element.toString() + "' class='classButton' />" + "</td></tr>"
        } else {
            tabla += "<tr><td>" + "<input type='button' style='width:260px;' onclick='pedirArchivo(\"" + json[element].toString() + "\"," + esConsolidado + ");' value='" + element.toString() + "' class='classButton' />" + "</td></tr>"
        }
    }
    tabla += "</table></center>";
    return tabla;
}

function pedirArchivo(ruta2, esConsolidado) {
    if (esConsolidado) {
        WaitingVtn("divBloqVtnBotonesDescargaConsolidado", true, true, "Descargando Archivo...");
        document.getElementById("imgVtnLoading").style.marginTop = "8%";
    }
    else
        Waiting(true, "Descargando Archivo...");
    __doPostBack('pedirArchivo', ruta2);
    //Sys.WebForms.PageRequestManager.getInstance().add_endRequest(Waiting(false, "Descargando Archivo..."));
    if (esConsolidado)
        setTimeout("terminarWaitVtn('divBloqVtnBotonesDescargaConsolidado');", 2000);
    setTimeout(terminarWait, 6000);
}

//------------------------------------------------------------------------------------------------------------------------

function cargaControlesTabs2y4(json, tab) {
    var div = (tab == 2) ? 'divNoSuceptible' : 'divExcluidoInterfaces';
    var listaDeStatus = [json.statusCredimax, json.statusArrendamientoCredimax, json.statusAlnovaConsumo, json.statusAlnovaVivienda, json.statusAlnovaComercial, json.statusTDC];
    var listaDeArchivos = [json.archivoCredimax, json.archivoArrendamientoCredimax, json.archivoAlnovaConsumo, json.archivoAlnovaVivienda, json.archivoAlnovaComercial, json.archivoTDC];
    cargaControlesTabs2y4Auxiliar(div, listaDeStatus, listaDeArchivos);
}

function cargaControlesTabs2y4Auxiliar(idDivContenidoTab, listaDeStatus, listaDeArchivos) {
    idDivContenidoTab = "#" + idDivContenidoTab;
    $(idDivContenidoTab + ' input:checkbox').each(function (index) {
        if (parseInt(listaDeStatus[index]) == 1) {
            $(this).attr("checked", "checked");
        }
        else {
            $(this).removeAttr("checked");
        }
    });
}
//------------------------------------------------------------------------------------------------------------------------
function cargaControlesTab5(arrayJson) {
    var cad = "";
    for (var x = 0; x < arrayJson.length; x++) {
        cad += '<option value="' + arrayJson[x].FVCNombreArchivo + '">' + arrayJson[x].FVCNombreArchivo + '</option>';
    }
    $('#slcOrigen').html(cad);
}
//------------------------------------------------------------------------------------------------------------------------

function ObtenerFocoTab(tab) {
    Waiting(true, "Espere por favor. Cargando Información...");
    if (parseInt($("#MainContent_hfEtapaFija").val()) < encontrarIndexDeTab(tab) && encontrarIndexDeTab(tab) != 6) {
        $('#divBloquearBotones').show();
        document.getElementById("divBloquearBotones").style.height = document.getElementById("divContenidoDeTabs").offsetHeight + "px";
    }
    else if (encontrarIndexDeTab(tab) == 6)
        $('#divBloquearBotones').hide(); //Nuevo 20130618
    else
        $('#divBloquearBotones').hide();

    if (encontrarIndexDeTab(tab) == 6) //Nuevo 20130618
        cargarDeControles(encontrarIndexDeTab(tab), tabs[encontrarIndexDeTab(tab) - 6]);
    else
        cargarDeControles(encontrarIndexDeTab(tab), tabs[encontrarIndexDeTab(tab)]);

    if (encontrarIndexDeTab(tab) == 4 || encontrarIndexDeTab(tab) == 5)
        document.getElementById("ulFlujo").style.width = "955px";
    else
        document.getElementById("ulFlujo").style.width = "947px";
}

//------------------------------------------------------------------------------------------------------------------------

function cargaControlesTab6() {
    CargaPeriodo();
    setTimeout(cargaControlesTab6, 3000);
}

var Periodo = '';

//------------------------------------------------------------FUNCIONES PESTAÑAS Y EVENTOS CLICK----------------------------------------------------------------------------
//------------------------------------PESTAÑA  CIFRAS CANCON
function CargaPeriodo() {
    if ($("#MainContent_hfEtapa").val() != "6") return;
    var parametros = '';
    parametros = {
        IdPer: $(document.getElementById('MainContent_hfIdPeriodo')).val()
    }
    peticionAjax("Cancelaciones.aspx/ObtienePeriodoCan", "POST", parametros, Per, Per);
}

function Per(data) {
    if (data.d.statusText == "error") return;
    Periodo = data.d.toString();
    MonitoreaProcesos();
}


function MonitoreaProcesos() {
    var param = {
        Periodo: Periodo
    }
    peticionAjax("Cancelaciones.aspx/ProgramarCifrasCancon", "POST", param, generaTab, generaTab);
}

function generaTab(data) {
    var JSON = obtenerArregloDeJSON(data.d, false);
    if (JSON.Status != undefined) {
        MostrarMsj("No se pudo Generar la actividad, intente mas tarde.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        return;
    }
    var cad = '';
    cad = TabControlDescargasCan(JSON);
    $('#TableroControlDescargas').html('<br /><br />' + cad);
    MonitoreaCifras();
}

function MonitoreaCifras() {
    var param = { Periodo: Periodo }
    peticionAjax("Cancelaciones.aspx/CifrasControlCifrasCancon", "POST", param, generaTabCifras, generaTabCifras);
}

function generaTabCifras(data) {
    var JSON = obtenerArregloDeJSON(data.d, false);
    if (JSON.Status != undefined) {
        MostrarMsj("No se pudo Generar la actividad, intente mas tarde.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        return;
    }
    if (data.d != "") {
        var cad = '';
        cad = TabControlDescargasCan(JSON);
        $('#CifrasControlDescargasFuentes').html('<br>' + cad);
    }
}

function TabControlDescargasCan(listaDeJSON) {
    var cad = '<center><table class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados.toString() != 'FIFuente') {
            cad += '<th style="width:18%">';
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
            if (element != 'FIFuente') {
                cad += '<td>';
                if (element == 'Semaforo') {
                    if (json[element] == '1') {
                        cad += '<img style="width:18px; height:18px" src="../../Images/Grales/Semaforos/punto-gris2.png" />'; //No Iniciado
                    }
                    if (json[element] == '2') {
                        cad += '<img src="../../Images/Grales/Semaforos/punto-amarillo2.png" />'; //En Proceso
                    }
                    if (json[element] == '5') {
                        cad += '<img src="../../Images/Grales/Semaforos/punto-verde2.png" />'; //Realizado
                    }
                } else {
                    cad += format(json[element]);
                }
                cad += '</td>';
            }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}


function format(num) {
    var result = '';
    if (!isNaN(num)) {
        var partes = num.split('.');
        var number = partes[0];
        while (number.length > 3) {
            result = ',' + number.substr(number.length - 3) + result;
            number = number.substring(0, number.length - 3);
        }
        result = number + result;

        if (partes.length == 2) {
            result = result + "." + partes[1];
        }

        return result;
    }
    return num;
}

function MuestraFormularioDescargas() {
    idFuente = '';
    FechaReq = '';
    FechaDesc = '';
    HoraDesc = '';

    var cadena = '<div id="divBloqVtnFormularioDescarga" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleFormulariosDescarga" style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblFormularioDes" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">  </div></div>';
    $("#dvFormularioG").empty();
    arrayFuenteValoresChange = new Array();
    AgregarVtnFlotante("dvFormularioG", "", "DESCARGAS", "", cadena, 250, 700, false, false, "", "", null);
    WaitingVtn("divBloqVtnFormularioDescarga", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    ObtienesDatosParaFormulario();

    $("#dvFormularioG").on("dialogclose", function (event, ui) {
        if (arrayFuenteValoresChange.length > 0) {
            //$("#divVentanaAgendas").dialog("open");
            // if (!pulsoClose) {
            //pulsoClose = true; 
            //$(".ui-dialog-title").next().attr("style", "display:none");
            WaitingVtn("divBloqVtnFormularioDescarga", true, false, "");
            MostrarMsj("¿Desea guardar los cambios efectuados en Descarga? ", "Mensaje", true, true, true, "Guardar", "No Guardar", "Cancelar", 220, 120,
                            function BtnSiCambiosAgenda() {
                                $("#divVentanaMensajes").dialog("close");
                                $("#dvFormularioG").dialog("open");
                                WaitingVtn("divBloqVtnAgenda", true, true, "Guardando Información...");
                                //indiceArray = 0;
                                GuardaCalendarizacion();
                                //$(".ui-dialog-title").next().removeAttr("style");
                                // pulsoClose = false;
                            }, function BtnNoCambiosAgenda() { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnFormularioDescarga", false, false, ""); }, function BtnCancelar() { $("#divVentanaMensajes").dialog("close"); $("#dvFormularioG").dialog("open"); WaitingVtn("divBloqVtnFormularioDescarga", false, false, ""); });
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnFormularioDescarga", false, false, "");
            });
        }
        //}
    });
}

function ObtienesDatosParaFormulario() {
    WaitingVtn("divBloqVtnFormularioDescarga", true, true, "Cargando Información..."); document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var param = {
        Periodo: Periodo
    }
    peticionAjax("Cancelaciones.aspx/ProgramarCifrasCancon", "POST", param, GeneraFormularioEditable, GeneraFormularioEditable);
}

function GeneraFormularioEditable(data) {
    var JSON = obtenerArregloDeJSON(data.d, false);
    if (JSON.Status != undefined) {
        MostrarMsj("No se pudo Generar la actividad, intente mas tarde.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
        return;
    }
    var cad = ' <h3> Programar Descargas</h3><br /><br /><div id="dvFormularioDescargasFuentes">';
    cad = JsonATablaFormulario(JSON);
    cad += '</div><br />';
    cad += '<table width="100%"> <tr style="text-align: left"> <td> <input type="button" id="btnGuardaProgramacionDesc" value="Obtener valores originales"  onclick="MuestraFormularioprincipal();" class="classButton" style="margin-left:500px"/>  </td></tr>  </table>';
    $("#dvDetalleEITblFormularioDes").html(cad);
    WaitingVtn("divBloqVtnFormularioDescarga", false, false, "Cargando Información...");
    //  document.getElementById("imgVtnLoading").style.marginTop = "8%";
    ColocaCalendario();


    //DesbloquearPantalla();
}

function ColocaCalendario() {
    $(".datepicker1").datepicker({ minDate: "-5D", maxDate: "+5M +10D" });
    $(".datepicker1").datepicker("option", "showAnim", "slide");
    $(".datepicker1").datepicker("option", { dateFormat: "dd/mm/yy" });
    $('.timepicker1').timepicker({ timeFormat: 'hh:mm tt', timeOnlyTitle: 'Selecciona la hora', currentText: 'Obtener Hora', closeText: 'Aceptar' });

    // $('.timepicker1').timepicker({ 'timeFormat': 'H:i:s' });
}

function JsonATablaFormulario(listaDeJSON) {

    //BloquearPantalla();65

    var cad = '<center><table class="dataGridDatos" id="tblFormFuentesProgra">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados.toString() != 'FIFuente' && encabezados.toString() != 'Estatus' && encabezados.toString() != 'Semaforo') {
            cad += '<th style="width:' + (encabezados.toString() == "Fecha Requerida" || encabezados.toString() == "Fecha Descarga" || encabezados.toString() == "Hora Descarga" ? '25' : '10') + '%">';
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
            if (element != 'FIFuente' && element != 'Estatus' && element != 'Semaforo') {
                cad += '<td>';
                if (element == 'Fecha Requerida') {
                    cad += '<div id="dvInf' + json["FIFuente"] + '" style="display:none">';
                    cad += '<input id="inFechaRequeridaEdit' + json["FIFuente"] + '" value="' + json[element] + '" class="datepicker1" style="text-align:right" type="text"/>';
                    cad += '</div>';

                    cad += '<div id="dvEdita' + json["FIFuente"] + '" >';
                    cad += '<input id="inFechaRequerida' + json["FIFuente"] + '" disabled="disabled" value="' + json[element] + '" style="text-align:right" type="text"/>';
                    cad += '</div>';
                } else if (element == 'Fecha Descarga') {
                    cad += '<div id="dvInfFD' + json["FIFuente"] + '" style="display:none">';
                    cad += '<input id="inFechaDescEdit' + json["FIFuente"] + '" value="' + json[element] + '" class="datepicker1" style="text-align:right" type="text"/>';
                    cad += '</div>';

                    cad += '<div id="dvEditaFD' + json["FIFuente"] + '" >';
                    cad += '<input id="inFechaDesc' + json["FIFuente"] + '" disabled="disabled" value="' + json[element] + '" style="text-align:right" type="text"/>';
                    cad += '</div>';
                } else if (element == 'Hora Descarga') {
                    cad += '<div id="dvInfHD' + json["FIFuente"] + '" style="display:none">';
                    cad += '<input id="inHoraDescEdit' + json["FIFuente"] + '" value="' + json[element] + '" class="timepicker1" style="text-align:right" type="text"/>';
                    cad += '</div>';

                    cad += '<div id="dvEditaHD' + json["FIFuente"] + '" >';
                    cad += '<input id="inHoraDesc' + json["FIFuente"] + '" disabled="disabled" value="' + json[element] + '" style="text-align:right" type="text"/>';
                    cad += '</div>';
                    cad += '<img id="img_' + json["FIFuente"] + '" lang="aa"   onclick="EditarTabla(this,' + json["FIFuente"] + ', ' + json["Semaforo"] + ');" src="../../Images/PanelDeControl/edit.png" style="height: 20px;width: 15px;margin: -50% 0% 5% 93%;" class="imgCrecerSmall"/>';
                }
                else {
                    cad += format(json[element]);
                }
                cad += '</td>';
            }
        }
        //        cad += '<td>';
        //        cad += '<input type="checkbox" id="chk' + json["FIFuente"] + '" onclick="GuardaSeleccionados(' + json["FIFuente"] + ');" ';
        //        if (json["FIFuente"] != '' && json["FIFuente"] != null) {
        //            cad += 'checked="checked" ';
        //            if (json["Semaforo"] == '5') {
        //                cad += ' disabled="disabled" ';
        //            }
        //        }
        //        cad += '/>';
        //        cad += '</td>';

        //        cad += '<td>';
        //        cad += '<a id="Editar" style="text-decoration: underline; color:Blue" onclick="EditarTabla(' + json["FIFuente"] + ', ' + json["Semaforo"] + ');">Editar</a>';
        //        cad += '</td>';

        //        cad += '<td>';
        //        cad += '<img src="../../Images/PanelDeControl/refresh.png" onclick="MuestraFormularioprincipal();" title="Obtener valores originales" style="height:15px;width:15px;margin: -50% 0% 5% 40%;" />';
        //        cad += '</td>';

        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></center>';

    return cad;
}

function EditarTabla(obj, idActividad, idEstatus) {
    if ($(obj).attr("lang") == "aa") {
        if (idEstatus != '5') {
            $(document.getElementById('dvInf' + idActividad + '')).show();
            $(document.getElementById('dvEdita' + idActividad + '')).hide();

            $(document.getElementById('dvInfFD' + idActividad + '')).show();
            $(document.getElementById('dvEditaFD' + idActividad + '')).hide();

            $(document.getElementById('dvInfHD' + idActividad + '')).show();
            $(document.getElementById('dvEditaHD' + idActividad + '')).hide();

            $(document.getElementById('chk' + idActividad + '')).removeAttr("checked");
            document.getElementById($(obj).attr("id")).setAttribute('src', '../../Images/PanelDeControl/refreshG.png');
            $(obj).attr("lang", "ab");
        }
    }
    else {
        $(document.getElementById('dvInf' + idActividad + '')).hide();
        $(document.getElementById('dvEdita' + idActividad + '')).show();

        $(document.getElementById('dvInfFD' + idActividad + '')).hide();
        $(document.getElementById('dvEditaFD' + idActividad + '')).show();

        $(document.getElementById('dvInfHD' + idActividad + '')).hide();
        $(document.getElementById('dvEditaHD' + idActividad + '')).show();
        document.getElementById($(obj).attr("id")).setAttribute('src', '../../Images/PanelDeControl/edit.png');
        if ($("#inFechaRequerida" + idActividad).val() != $("#inFechaRequeridaEdit" + idActividad).val()) {
            document.getElementById("inFechaRequerida" + idActividad).style.color = "Orange";
            $("#inFechaRequerida" + idActividad).val($("#inFechaRequeridaEdit" + idActividad).val());
            AgregarItemEditadoAArreglo(idActividad);
        }
        if ($("#inFechaDesc" + idActividad).val() != $("#inFechaDescEdit" + idActividad).val()) {
            document.getElementById("inFechaDesc" + idActividad).style.color = "Orange";
            $("#inFechaDesc" + idActividad).val($("#inFechaDescEdit" + idActividad).val());
            AgregarItemEditadoAArreglo(idActividad);
        }
        if ($("#inHoraDesc" + idActividad).val() != $("#inHoraDescEdit" + idActividad).val()) {
            document.getElementById("inHoraDesc" + idActividad).style.color = "Orange";
            $("#inHoraDesc" + idActividad).val($("#inHoraDescEdit" + idActividad).val());
            AgregarItemEditadoAArreglo(idActividad);
        }
        $(obj).attr("lang", "aa");
    }
}

function AgregarItemEditadoAArreglo(idActividad) {
    if (!ExisteItemEnArreglo(idActividad, arrayFuenteValoresChange)) {
        arrayFuenteValoresChange.push(idActividad + "&&" + $("#inFechaRequeridaEdit" + idActividad).val() + "&&" + $("#inFechaDescEdit" + idActividad).val() + "&&" + $("#inHoraDescEdit" + idActividad).val());
    }
    else {
        arrayFuenteValoresChange[DevuelveIndiceDeElementoExistente(idActividad, arrayFuenteValoresChange)] = idActividad + "&&" + $("#inFechaRequeridaEdit" + idActividad).val() + "&&" + $("#inFechaDescEdit" + idActividad).val() + "&&" + $("#inHoraDescEdit" + idActividad).val();
    }
}
var arrayFuenteValoresChange;
function MuestraFormularioprincipal() {
    if (arrayFuenteValoresChange.length > 0) {
        WaitingVtn("divBloqVtnFormularioDescarga", true, false, "");
        MostrarMsj("Al obtener los valores originales se perderan los cambios realizados ¿Desea continuar? ", "Mensaje", true, false, true, "Si", "", "No", 280, 120,
            function BtnSiValoresDef() {
                $('#dvFormularioDescargasFuentes').html('');
                arrayFuenteValoresChange = new Array();
                ObtienesDatosParaFormulario();
            }, null, function BtnNoValoresDef() { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnAgenda", false, false, ""); });
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnFormularioDescarga", false, false, "");
        });
    }
    else {
        $('#dvFormularioDescargasFuentes').html('');
        arrayFuenteValoresChange = new Array();
        ObtienesDatosParaFormulario();
    }
}

function GuardaCalendarizacion() {
    var idFuente = ""; var FechaReq = ""; FechaDesc = ""; HoraDesc = "";
    for (var i = 0; i < arrayFuenteValoresChange.length; i++) {
        idFuente += arrayFuenteValoresChange[i].split("&&")[0] + ',';
        FechaReq += arrayFuenteValoresChange[i].split("&&")[1] + ',';
        FechaDesc += arrayFuenteValoresChange[i].split("&&")[2] + ',';
        HoraDesc += DeterminaHoraFormato24H(arrayFuenteValoresChange[i].split("&&")[3]) + ',';
    }
    var parametros = {
        Periodo: Periodo,
        idFuente: idFuente,
        FechaRequerida: FechaReq,
        FechaDescarga: FechaDesc,
        HoraDescarga: HoraDesc
    }
    WaitingVtn("divBloqVtnFormularioDescarga", true, true, "Guardando Información..."); document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax("Cancelaciones.aspx/GuardaProgramacionFuentes", "POST", parametros, nada, nada);

}

function DeterminaHoraFormato24H(hora) {
    var horaGet = "";
    if (parseInt(hora.split(" ")[0].split(":")[0]) >= 1 && parseInt(hora.split(" ")[0].split(":")[0]) <= 11 && hora.split(" ")[1].indexOf("pm") != -1) {
        horaGet = 12 + (parseInt(hora.split(" ")[0].split(":")[0])) + ":" + hora.split(" ")[0].split(":")[1] + " pm";
    }
    else if (parseInt(hora.split(" ")[0].split(":")[0]) == 12 && hora.split(" ")[1].indexOf("am") != -1) {
        horaGet = "0" + (12 - (parseInt(hora.split(" ")[0].split(":")[0])) + ":" + hora.split(" ")[0].split(":")[1]) + " am";
    }
    else {
        horaGet = hora;
    }
    return horaGet
}

function nada(data) {
    WaitingVtn("divBloqVtnFormularioDescarga", false, false, "Guardando Información...");
    $("#dvFormularioG").dialog("close");
    MostrarMsj(data.d.toString() + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
}
//------------------ Guarda Actividad
//function GuardaSeleccionados(IdActividadSel) {
//    idFuente += IdActividadSel + ',';
//    FechaReq += $(document.getElementById('inFechaRequeridaEdit' + IdActividadSel + '')).val() + ',';
//    FechaDesc += $(document.getElementById('inFechaDescEdit' + IdActividadSel + '')).val() + ',';
//    HoraDesc += $(document.getElementById('inHoraDescEdit' + IdActividadSel + '')).val() + ',';
//}
//-------------------------------------------------------PESTAÑA SUCEPTIBLE A CANCELAR Y NO SUCEPTIBLE FINAL A CANCELAR--------------------------------
//----------------- CLICK IMG FUENTES
var imgDeCarteraCancelada;
var carteraCancelada;
var tipoSis;
var etapaCancelacionParaComercial;
var objParaComercial;
function lanzarCancelacion(obj, etapaDeCancelacion) {
    if (!validarExistenciasDeFechas()) {
        return false;
    }
    if ($(obj).attr("alt") != "Extraordinaria") {
        objLanzarCancelacion = obj;
        if ($(obj).parent().find("input:hidden").val() != "AlnovaComercial") {
            var cadena = '<div id="divBloqVtnParamtrosCancelacion" style="width:95%;height:84%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
            cadena += '<div id="dvDetalleParametrosCancelacion" style="width:100%;height:65%;overflow: auto;text-align: left;margin-left: 2px;"> </div>';
            cadena += '<div align="right" style="font-size: small;"></br> <input type="button" value="Finalizar" class="classButton" onclick="btnFinalizarParametrosCancelacion(\'' + etapaDeCancelacion + '\');"/></div>';
            cadena += '</div>';
            $("#divCifrasControlG").empty();
            AgregarVtnFlotante("divCifrasControlG", "", "PARAMETROS " + $(obj).parent().parent().find("input:hidden").attr("class").toUpperCase(), "", cadena, 160, 300, false, false, "", "", null);

            cargarParametrosCancelacion(obj, etapaDeCancelacion);
        }
        else
            btnFinalizarParametrosCancelacion(etapaDeCancelacion);
    }
    else {
        imgDeCarteraCancelada = obj;
        if (etapaDeCancelacion == 1) {
            var cadena = '<div id="divBloqVtnCargaArchivoCancelacionExtra" style="width:98%;height:92%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
            cadena += '<div id="dvDetalleEITblCifrasControl" style="width:100%;height:95%;overflow: auto;margin-top: 5px;"> ';
            cadena += '<input type="text" style="visibility: collapse;width: 0px;height: 0px;"/> <fieldset style="border: 1px solid rgb(8, 138, 133);border-bottom: rgba(0, 0, 0, 0);"><legend style="font-weight: bold;text-align: center;">Carga Disposiciones Alnova</legend><div><input type="file" id="fuCargaDispAlnova" name="fuCargaDispAlnova" class="fileUpload" /><input type="hidden" value="DispAlnova" />';
            cadena += '&nbsp&nbsp<button id="ButtonDispAlnova" alt="ALNOVA" onclick="return enviarArchivoAsincronamente(this);" runat="server" class="classButton">Cargar</button> <button id="ButtonBorrarDispAlnova" onclick="return borrarArchivoASubir(this);" runat="server" class="classButton">Borrar</button>&nbsp&nbsp<input id="chk_Alnova" type="checkbox" onchange="chkCanceExtra_OnChange();"/></div></fieldset><br />';
            cadena += '<br /><fieldset style="border: 1px solid rgb(8, 138, 133);border-bottom: rgba(0, 0, 0, 0);"><legend style="font-weight: bold;text-align: center;">Carga Canal Sucursal Pedido Credimax</legend><div><input type="file" id="fuCargaCanalCredimax" name="fuCargaCanalCredimax" class="fileUpload" /><input type="hidden" value="CanalCredimax" />';
            cadena += '&nbsp&nbsp<button id="ButtonCanalCredimax" alt="CREDIMAX" onclick="return enviarArchivoAsincronamente(this);" runat="server" class="classButton">Cargar</button> <button id="ButtonBorrarCanalCredimax" onclick="return borrarArchivoASubir(this);" runat="server" class="classButton">Borrar</button>&nbsp&nbsp<input id="chk_Credimax" type="checkbox" onchange="chkCanceExtra_OnChange();"/></div></fieldset><br />';
            cadena += '<br /><fieldset style="border: 1px solid rgb(8, 138, 133);border-bottom: rgba(0, 0, 0, 0);"><legend style="font-weight: bold;text-align: center;">Carga Número de Contrato Medios de Pago</legend><div><input type="file" id="fuCargaContratoMediosPago" name="fuCargaContratoMediosPago" class="fileUpload" /><input type="hidden" value="ContratoMediosPago" />';
            cadena += '&nbsp&nbsp<button id="ButtonContratoMediosPago" alt="TDC" onclick="return enviarArchivoAsincronamente(this);" runat="server" class="classButton">Cargar</button> <button id="ButtonContratoMediosPago" onclick="return borrarArchivoASubir(this);" runat="server" class="classButton">Borrar</button>&nbsp&nbsp<input id="chk_TDC" type="checkbox" onchange="chkCanceExtra_OnChange();"/></div></fieldset><br />';
            cadena += '<div align="right" style="font-size: small;background: rgb(243, 246, 244);"> <strong>Nota: </strong>Archivo en formato txt separado por punto y coma (;).</div>';
            cadena += '<div align="right" style="font-size: small;"></br> <input type="button" value="Finalizar" class="classButton" onclick="btnFinalizarCancelacionExtra(1,1);"/></div>';
            cadena += '</div></div>';
            $("#divCifrasControlG").empty();
            AgregarVtnFlotante("divCifrasControlG", "", "CARGAR ARCHIVOS " + $(obj).parent().parent().find("input:hidden").attr("class").toUpperCase(), "", cadena, 320, 700, false, false, "", "", null);
            cargaEstatusSistemasCanceExtraOrdinaria();
        }
        else
            btnFinalizarCancelacionExtra(1, 3);
    }
}

function cargarParametrosCancelacion(obj, etapaDeCancelacion) {
    WaitingVtn("divBloqVtnParamtrosCancelacion", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax('Cancelaciones.aspx/SPControlParametrosLanzarCancelacion', "POST", { idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        sistema: $(obj).parent().find("input:hidden").val(), status: "0", idParametro: "0", opcion: "1"
    },
        function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                if (data.d != "") {
                    var JSON = obtenerArregloDeJSON(data.d, false);
                    var cad = '';
                    for (var i = 0; i < JSON.length; i++)
                        cad += '<input id="chk_' + JSON[i].FIIdParametro + '" style="cursor:pointer;" type="checkbox" ' + (etapaDeCancelacion == 3 ? 'disabled="disabled "' : ' ') + (JSON[i].status == '1' ? 'checked="checked"' : '')
                        + ' onchange="chkParamLanzarCan_OnChange(\'' + $(obj).parent().find("input:hidden").val() + '\',this);"/>' + JSON[i].FVCDescripcionParametro + '</br>';
                    $("#dvDetalleParametrosCancelacion").html(cad);
                    WaitingVtn("divBloqVtnParamtrosCancelacion", false, false, "Cargando Información...");
                }
            }
            else {
                MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnParamtrosCancelacion", false, false, "Cargando Información...");
                });
            }
        }, null);
}

function chkParamLanzarCan_OnChange(sistema, objThis) {
    WaitingVtn("divBloqVtnParamtrosCancelacion", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax('Cancelaciones.aspx/SPControlParametrosLanzarCancelacion', "POST", { idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        sistema: sistema, status: $(objThis).is(":checked") ? 1 : 0, idParametro: $(objThis).attr("id").split("_")[1], opcion: "2"
    },
        function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                if (data.d == "")
                    WaitingVtn("divBloqVtnParamtrosCancelacion", false, false, "Cargando Información...");
            }
            else {
                MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnParamtrosCancelacion", false, false, "Cargando Información...");
                });
            }
        }, null);
}

var objLanzarCancelacion = null;
function btnFinalizarParametrosCancelacion(etapaDeCancelacion) {
    var continuarProceso = false;

    if ($(objLanzarCancelacion).parent().find("input:hidden").val() != "AlnovaComercial") {
        for (var i = 0; i < $("#dvDetalleParametrosCancelacion").find("input:checkbox").length; i++) {
            if ($($("#dvDetalleParametrosCancelacion").find("input:checkbox")[i]).is(":checked")) {
                continuarProceso = true;
                break;
            }
        }
    }
    else
        continuarProceso = true;

    if (continuarProceso) {
        var parametrosJSON = {
            tipoSistema: $(objLanzarCancelacion).parent().find("input:hidden").val(),
            fechaOperacion: $("#MainContent_txtFechaEntrega").val(),
            valorUDI: parseFloat($("#MainContent_tbxUDI").val()),
            usr: $("#MainContent_hfUsr").val(),
            opcionSuceptible: 2,
            fechaMarcaje: $("#MainContent_tbxFechaMarcaje").val(),
            etapaCancelacion: etapaDeCancelacion,
            idPeriodo: $("#MainContent_hfIdPeriodo").val(),
            escargaArchivoExcluir: false
        };

        if (parametrosJSON.tipoSistema == "AlnovaComercial") {
            objParaComercial = objLanzarCancelacion;
            etapaCancelacionParaComercial = etapaDeCancelacion;

            if (etapaDeCancelacion == 3) {
                lanzarCancelacionComercial(false);
            }
            else {
                var cadena = '<div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
                cadena += '<div id="dvDetalleEITblSubirArchivoComercial" style="width:100%;height:82%;overflow: auto;margin-top: 5px;">  </div></div>';
                $("#divSubirArchivoComercialG").empty();
                AgregarVtnFlotante("divSubirArchivoComercialG", "", "BOTONES DE DESCARGA CONSOLIDADO", "", cadena, "auto", "auto", false, false, "", "", null);
                $("#dvDetalleEITblSubirArchivoComercial").html($('#divSubirArchivoComercial').html());

            }
            return;
        }
        imgDeCarteraCancelada = objLanzarCancelacion;
        carteraCancelada = parametrosJSON.tipoSistema;
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("Cancelaciones.aspx/cancelacionSuceptible", "POST", parametrosJSON, lanzarCancelacionFinalizada, lanzarCancelacionFinalizada);

        $("#divCifrasControlG").dialog("close");
    }
    else {
        WaitingVtn("divBloqVtnParamtrosCancelacion", true, false, "Cargando Información...");
        MostrarMsj("Seleccione al menos una Opción.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnParamtrosCancelacion", false, false, "Cargando Información...");
        });
    }
}

function cargaEstatusSistemasCanceExtraOrdinaria() {
    WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax('Cancelaciones.aspx/statusEtapaIICancelacionExtraOrdinaria', "POST", { opcion: 2, idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        idEtapa: $("#MainContent_hfEtapa").val(), statusAlnova: 0, statusTDC: 0, statusCredimax: 0, sistema: ""
    },
        function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                if (data.d != "") {
                    var JSON = obtenerArregloDeJSON(data.d, false);
                    $("#chk_Alnova").attr("checked", JSON[0].statusAlnova == "0" ? false : true);
                    $("#chk_Credimax").attr("checked", JSON[0].statusCredimax == "0" ? false : true);
                    $("#chk_TDC").attr("checked", JSON[0].statusTDC == "0" ? false : true);
                    WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", false, false, "Cargando Información...");
                }
            }
            else {
                MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", false, false, "Cargando Información...");
                });
            }
        }, null);
}

function chkCanceExtra_OnChange() {
    WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax('Cancelaciones.aspx/statusEtapaIICancelacionExtraOrdinaria', "POST", { opcion: 1, idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        idEtapa: $("#MainContent_hfEtapa").val(), statusAlnova: $("#chk_Alnova").is(":checked") ? 1 : 0,
        statusTDC: $("#chk_TDC").is(":checked") ? 1 : 0, statusCredimax: $("#chk_Credimax").is(":checked") ? 1 : 0, sistema: ""
    },
        function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1)
                WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", false, false, "Cargando Información...");
            else {
                MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", false, false, "Cargando Información...");
                });
            }
        }, null);
}

function lanzarCancelacionFinalizada(data) {
    var grid = data.d.split("&&&&")[0];
    if (grid != "") {
        var arrayJSON = obtenerArregloDeJSON(grid, false);
        if (arrayJSON[0] != null && arrayJSON[0] != "" && arrayJSON[0].SinDatos != undefined) {
            MostrarMsj(arrayJSON[0].SinDatos.toString() + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
            $(imgDeCarteraCancelada).parent().parent().find('input:checkbox').removeAttr('checked');
            setTimeout(terminarWait, 200); //quitarDivBloqueadorGeneral();
            return;
        }
    }
    if (carteraCancelada == "Extraordinaria")
        $("#divCifrasControlG").dialog("close");
    var botones = data.d.split("&&&&")[1];
    var arrayJSONBotones = obtenerArregloDeJSON(botones, false);
    var divContenedorBotones = $(imgDeCarteraCancelada).parent().parent().parent().find('div.divBotonesDeDescarga');
    var codigoGenerado = '<center>' + generarBotones(arrayJSONBotones[0]) + '<center>';

    $(divContenedorBotones).html(codigoGenerado);
    $(imgDeCarteraCancelada).parent().parent().find('input:checkbox').attr('checked', 'checked');
    var idDiv = $(imgDeCarteraCancelada).parentsUntil($('div.Contenidos')).last().parent().attr('id');
    MostrarMsj("Cancelacion efectuada correctamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
    VerificarBotonesCarteraSuceptible(idDiv);
    actualizarStatusDeProceso(carteraCancelada, guardarBotones(arrayJSONBotones[0]));
}

function guardarBotones(json) {
    var cadena = '';
    for (clave in json) {
        cadena += clave + '$' + json[clave] + '@@';
    }
    return cadena;
}

function btnFinalizarCancelacionExtra(op, etapaCancela) {
    document.getElementById("chk_Alnova") != undefined ? document.getElementById("chk_Alnova").style.outline = "1px solid transparent" : null;
    document.getElementById("chk_Alnova") != undefined ? document.getElementById("chk_Credimax").style.outline = "1px solid transparent" : null;
    document.getElementById("chk_Alnova") != undefined ? document.getElementById("chk_TDC").style.outline = "1px solid transparent" : null;
    if (etapaCancela == 3 || ($("#chk_Alnova").is(":checked") || $("#chk_Credimax").is(":checked") || $("#chk_TDC").is(":checked"))) {
        if (!validarExistenciasDeFechas()) {
            return false;
        }
        var opSuceptible = 2;
        if (etapaCancela == 3)
            opSuceptible = 1;
        var parametrosJSON = {
            opcion: op,
            tipoSistema: "Extraordinaria",
            idPeriodo: $("#MainContent_hfIdPeriodo").val(),
            fechaMarcaje: $("#MainContent_tbxFechaMarcaje").val(),
            fechaOperacion: $("#MainContent_txtFechaEntrega").val(),
            valorUDI: parseFloat($("#MainContent_tbxUDI").val()),
            usr: $("#MainContent_hfUsr").val(),
            opcionSuceptible: opSuceptible,
            etapaCancelacion: etapaCancela
        };
        carteraCancelada = parametrosJSON.tipoSistema;
        // Waiting(true, "Espere por favor. Cargando Información..."); //ponerDivBloqueadorGeneral();
        if (etapaCancela == 3)
            Waiting(true, "Espere por favor. Cargando Información...");
        else {
            WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", true, true, "Lanzando Cancelación...");
            document.getElementById("imgVtnLoading").style.marginTop = "8%";
        }
        peticionAjax("Cancelaciones.aspx/cancelacionExtraordinaria", "POST", parametrosJSON, lanzarCancelacionFinalizada, lanzarCancelacionFinalizada);
    }
    else {
        document.getElementById("chk_Alnova").style.outline = "1px solid red";
        document.getElementById("chk_Credimax").style.outline = "1px solid red";
        document.getElementById("chk_TDC").style.outline = "1px solid red";
        WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", true, false, "Cargando Información...");
        MostrarMsj("El Estatus de Carga debe de estar Activo al menos en un Sistema", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", false, false, "Cargando Información...");
        });
    }
}

function lanzarCancelacionComercial(escargaArchivoExcluir) {
    if (!validarExistenciasDeFechas()) {
        return false;
    }
    var parametrosJSON = {
        tipoSistema: "AlnovaComercial",
        fechaOperacion: $("#MainContent_txtFechaEntrega").val(),
        valorUDI: parseFloat($("#MainContent_tbxUDI").val()),
        usr: $("#MainContent_hfUsr").val(),
        opcionSuceptible: 2,
        fechaMarcaje: $("#MainContent_tbxFechaMarcaje").val(),
        etapaCancelacion: etapaCancelacionParaComercial,
        idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        escargaArchivoExcluir: escargaArchivoExcluir
    };

    imgDeCarteraCancelada = objParaComercial;

    var img = $(imgDeCarteraCancelada).attr('src');
    carteraCancelada = 'AlnovaComercial';

    Waiting(true, "Espere por favor. Cargando Información..."); //ponerDivBloqueadorGeneral();
    peticionAjax("Cancelaciones.aspx/cancelacionSuceptible", "POST", parametrosJSON, lanzarCancelacionComercialFinalizada, lanzarCancelacionComercialFinalizada);
}

function lanzarCancelacionComercialFinalizada(data) {
    var grid = data.d.split("&&&&")[0];
    var arrayJSON = obtenerArregloDeJSON(grid, false);
    if (arrayJSON[0].SinDatos != undefined) {
        MostrarMsj(arrayJSON[0].SinDatos.toString() + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
        $(imgDeCarteraCancelada).parent().parent().find('input:checkbox').removeAttr('checked');
        setTimeout(terminarWait, 200); //quitarDivBloqueadorGeneral();
        $("#divSubirArchivoComercialG").dialog("close"); //$.fancybox.close(); 
        return;
    }

    var botones = data.d.split("&&&&")[1];
    var arrayJSONBotones = obtenerArregloDeJSON(botones, false);
    var divContenedorBotones = $(imgDeCarteraCancelada).parent().parent().parent().find('div.divBotonesDeDescarga');

    //var codigoGenerado = '<center>' + generarBotones(arrayJSONBotones[0]) + generarTablaDeRegistrosCancela(arrayJSON) + '<center>';
    var codigoGenerado = '<center>' + generarBotones(arrayJSONBotones[0]) + '<center>';

    $(divContenedorBotones).html(codigoGenerado);
    $(imgDeCarteraCancelada).parent().parent().find('input:checkbox').attr('checked', 'checked');

    var idDiv = $(imgDeCarteraCancelada).parentsUntil($('div.Contenidos')).last().parent().attr('id')
    VerificarBotonesCarteraSuceptible(idDiv);
    actualizarStatusDeProceso(carteraCancelada, guardarBotones(arrayJSONBotones[0]));

    MostrarMsj("Proceso Ejecutado Correctamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
    setTimeout(terminarWait, 200); //quitarDivBloqueadorGeneral();
    $("#divSubirArchivoComercialG").dialog("close"); //$.fancybox.close();
}
//------------------------ li Cifras de Control
function pedirCifrasControl(obj) {
    if (!validarExistenciasDeFechas()) {
        return false;
    }
    tipoSis = $(obj).parent().parent().find("input:hidden").val();
    var cadena = '<div id="divBloqVtnCifrasControl" style="width:99%;height:95%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
    cadena += '<div style="width:100%;height:8%;"><table style="width: 100%"><tr><td style="text-align: center; font-size: large"></td></tr><tr><td style="text-align: right"><img src="../../Images/Cancelaciones/Cargas/excelImg.jpeg" id="btlExportToExel" onclick="ExportarAExcel(\'' + tipoSis + '\');" class="imgCrecerMedium" title="Exportar a Excel"/></td></tr></table></div>';
    cadena += '<div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;" class="divFondo">';
    cadena += '<div id="dvDetalleEITblCifrasControl" style="width:100%;height:95%;overflow: auto;margin-top: 5px;">  </div></div>';

    $("#divCifrasControlG").empty();
    AgregarVtnFlotante("divCifrasControlG", "", "CIFRAS CONTROL " + $(obj).parent().parent().find("input:hidden").attr("class").toUpperCase(), "", cadena, 350, 1050, false, false, "", "", null);
    WaitingVtn("divBloqVtnCifrasControl", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";

    var parametrosJSON = {
        tipoSistema: $(obj).parent().parent().find("input:hidden").val(),
        idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        idEtapa: $("#MainContent_hfEtapa").val()
    };

    //ImprimirJSON(parametrosJSON);
    //ponerDivBloqueadorGeneral();
    peticionAjax("Cancelaciones.aspx/cifrasControl", "POST", parametrosJSON, pedirCifrasControlFinalizada, pedirCifrasControlFinalizada);
}

function pedirCifrasControlExtra(obj, etapaCancela) {
    if (!validarExistenciasDeFechas()) {
        return false;
    }
    tipoSis = 'Extraordinaria';
    var cadena = '<div id="divBloqVtnCifrasControl" style="width:99%;height:95%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
    cadena += '<div style="width:100%;height:5%;"><table style="width: 100%"><tr><td style="text-align: center; font-size: large"></td></tr><tr><td style="text-align: right"><img src="../../Images/Cancelaciones/Cargas/excelImg.jpeg" id="btlExportToExel" onclick="ExportarAExcel(\'' + tipoSis + '\');" class="imgCrecerMedium" title="Exportar a Excel"/></td></tr></table></div>';
    cadena += '<div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;" class="divFondo">';
    cadena += '<div id="dvDetalleEITblCifrasControl" style="width:100%;height:95%;overflow: auto;margin-top: 5px;">  </div></div>';
    $("#divCifrasControlG").empty();
    AgregarVtnFlotante("divCifrasControlG", "", "CIFRAS CONTROL " + $(obj).parent().parent().find("input:hidden").attr("class").toUpperCase(), "", cadena, 500, 1250, false, false, "", "", null);
    WaitingVtn("divBloqVtnCifrasControl", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var opSuceptible = 2;
    if (etapaCancela == 3)
        opSuceptible = 1;
    var parametrosJSON = {
        opcion: 3,
        tipoSistema: "Extraordinaria",
        idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        fechaMarcaje: $("#MainContent_tbxFechaMarcaje").val(),
        fechaOperacion: $("#MainContent_txtFechaEntrega").val(),
        valorUDI: parseFloat($("#MainContent_tbxUDI").val()),
        usr: $("#MainContent_hfUsr").val(),
        opcionSuceptible: opSuceptible,
        etapaCancelacion: etapaCancela
    };
    //ImprimirJSON(parametrosJSON);
    peticionAjax("Cancelaciones.aspx/cancelacionExtraordinaria", "POST", parametrosJSON, pedirCifrasControlFinalizadaEx, pedirCifrasControlFinalizadaEx);
}

function pedirCifrasControlFinalizada(data) {    //quitarDivBloqueadorGeneral();
    if (data.d != null && data.d.indexOf("SinDatos") == -1) {
        var grid = data.d.split("&&&&")[0];
        var arrayJSON = obtenerArregloDeJSON(grid, false);
        if (arrayJSON[0].SinDatos != undefined) {
            MostrarMsj(arrayJSON[0].SinDatos.toString() + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 125, null, null, null);
            $(imgDeCarteraCancelada).parent().parent().find('input:checkbox').removeAttr('checked');
            WaitingVtn("divBloqVtnCifrasControl", false, false, "Cargando Información...");
            return;
        }
        grid = data.d.split("&&&&");
        var numTablas = grid.length;
        var cad = '';
        for (var x = 0; x < numTablas - 1; x++) {
            var JSON = obtenerArregloDeJSON(grid[x], false);
            cad += generarTablaDeRegistrosCancela(JSON);
        }
        $("#dvDetalleEITblCifrasControl").html('<br /><br />' + cad);
        WaitingVtn("divBloqVtnCifrasControl", false, false, "Cargando Información...");

    }
    else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);

    //    $('#divCifrasControl').html('<br /><br />' + cad);
    //    $.fancybox({
    //        'href': '#divCifrasControl'
    //    });
}

function pedirCifrasControlFinalizadaEx(data) {    //quitarDivBloqueadorGeneral();

    var grid = data.d.split("&&&&")[0];
    var arrayJSON = obtenerArregloDeJSON(grid, false);
    if (arrayJSON[0] == null || arrayJSON[0].SinDatos != undefined) {
        MostrarMsj((arrayJSON[0] != null ? arrayJSON[0].SinDatos.toString() : "Sin Datos") + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 125, null, null, null);
        $(imgDeCarteraCancelada).parent().parent().find('input:checkbox').removeAttr('checked');
        WaitingVtn("divBloqVtnCifrasControl", false, false, "Cargando Información...");
        return;
    }
    grid = data.d.split("&&&&");
    var numTablas = grid.length;
    var cad = '';
    var existeCifras = false;
    for (var x = 0; x < numTablas - 1; x++) {
        var titulo = obtenerCabeceraJSONEx(grid[x]);
        if (titulo != "") {
            existeCifras = true;
            var JSON = obtenerArregloDeJSON(grid[x], false);
            cad += generarTablaDeRegistrosExtraordinaria(titulo, JSON);
        }
    }
    if (existeCifras)
        $("#dvDetalleEITblCifrasControl").html('<br /><br />' + cad);
    else {
        cad += generarTablaSinCifras();
        $("#dvDetalleEITblCifrasControl").html('<br /><br />' + cad);
    }
    WaitingVtn("divBloqVtnCifrasControl", false, false, "Cargando Información...");
}

function obtenerCabeceraJSONEx(datos) {
    var arrayJSON = datos.split("||");
    arrayJSON[0] = $.parseJSON(arrayJSON[0].toString());
    var title = "";
    if (arrayJSON[0].Sistema != undefined && arrayJSON[0].Cartera != undefined) {
        var sis = arrayJSON[0].Sistema;
        var car = arrayJSON[0].Cartera;
        if (sis == car)
            title = car;
        else
            title = sis + ' ' + car;
    }
    return title;
}

//------------------------li Cartera Suceptible
function mostrarBotonesDeDescarga(idDiv) {

    if (!validarExistenciasDeFechas()) {
        return false;
    }
    $('#' + idDiv).find('input:button').hide();

    var numeroBtns = 0;
    $('#' + idDiv).find('input:button').each(function (index) {

        if ($(this).val().split('Cadena').length >= 2) {
            numeroBtns++;
            $(this).show();
        }
    });

    var cadena = '<div id="divBloqVtnBotonesDescargaConsolidado" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblBotonesDescargaConsolidado" style="width:100%;height:82%;overflow: auto;margin-top: ' + (numeroBtns == 1 ? '-12' : (numeroBtns == 0 ? '5' : '-7')) + 'px;">  </div></div>';
    $("#divBotonesDescargaConsolidadoG").empty();
    AgregarVtnFlotante("divBotonesDescargaConsolidadoG", "", "CARTERA SUCEPTIBLE " + $("#" + idDiv).parent().parent().find("input:hidden").attr("class").toUpperCase(), "", cadena, numeroBtns <= 1 ? 100 : (numeroBtns == 2 ? 130 : "auto"), "auto", false, false, "", "", null);
    $("#dvDetalleEITblBotonesDescargaConsolidado").html($('#' + idDiv).html());

    //    $.fancybox({
    //        'href': '#' + idDiv
    //    });
}
//-------------------li DETALE CARTERA
function mostrarBotonesDeDescargaDetalle(idDiv) {
    if (!validarExistenciasDeFechas()) {
        return false;
    }
    $('#' + idDiv).find('input:button').hide();

    var numeroBtns = 0;
    $('#' + idDiv).find('input:button').each(function (index) {
        if ($(this).val().split('Cadena').length < 2) {
            numeroBtns++;
            $(this).show();
        }
    });


    var cadena = '<div id="divBloqVtnBotonesDescargaConsolidado" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblBotonesDescargaConsolidado" style="width:100%;height:82%;overflow: auto;margin-top:' + (numeroBtns == 1 ? '-12' : (numeroBtns == 0 ? '5' : '-7')) + 'px;">  </div></div>';
    $("#divBotonesDescargaConsolidadoG").empty();
    AgregarVtnFlotante("divBotonesDescargaConsolidadoG", "", "DETALLE CARTERA SUCEPTIBLE " + $("#" + idDiv).parent().parent().find("input:hidden").attr("class").toUpperCase(), "", cadena, numeroBtns <= 1 ? 100 : (numeroBtns == 2 ? 130 : "auto"), "auto", false, false, "", "", null);
    $("#dvDetalleEITblBotonesDescargaConsolidado").html($('#' + idDiv).html());

    //    $.fancybox({
    //        'href': '#' + idDiv
    //    });
}


//-------------------------------------------------------PESTAÑA NO SUCEPTIBLE A CANCELAR Y EXCLUIDO INTERFACES--------------------------------

//----------------BTNS CARGAR
function enviarArchivoAsincronamente(obj, funcionExitoAEjecutar) {
    if (!validarExistenciaDeArchivo($(obj).parent().find("input:file")))
        return false;
    var valorCartera = $(obj).parent().find("input:hidden").val();
    if (valorCartera == "DispAlnova" || valorCartera == "CanalCredimax" || valorCartera == "ContratoMediosPago")
        verificaExisteRegistroXSistemaEtapaIICanExtra(obj, funcionExitoAEjecutar);
    else
        llamarPeticionAjax(obj, funcionExitoAEjecutar);
}

function verificaExisteRegistroXSistemaEtapaIICanExtra(obj, funcionExitoAEjecutar) {
    WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax('Cancelaciones.aspx/statusEtapaIICancelacionExtraOrdinaria', "POST", { opcion: 4, idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        idEtapa: $("#MainContent_hfEtapa").val(), statusAlnova: 0, statusTDC: 0, statusCredimax: 0, sistema: $(obj).attr("alt")
    },
        function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                var JSON = obtenerArregloDeJSON(data.d, false);
                if (parseInt(JSON[0].numReg) == 0)
                    llamarPeticionAjax(obj, funcionExitoAEjecutar);
                else {
                    var esBtnNo = false; var esBtnSi = false; var entroClose = false;
                    WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", true, false, "Cargando Información...");
                    MostrarMsj("Los Registros Existentes del Sistema <span style='font-weight:bold;'>" + $(obj).attr("alt").toUpperCase() + "</span> se Borraran. ¿Desea Continuar?", "Mensaje SicreNet", true, true, false, "Si", "No", "", 250, 130,
                    function btnSi() {
                        esBtnSi = true;
                        $("#divVentanaMensajes").dialog("close");
                        borrarRegistroXSistemaEtapaIICanExtra(obj, funcionExitoAEjecutar);
                    },
                    function btnNo() {
                        esBtnNo = true;
                        $("#divVentanaMensajes").dialog("close");
                    }, null);
                    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                        if ((esBtnNo || !esBtnSi) && !entroClose) {
                            WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", false, false, "Cargando Información...");
                            entroClose = true;
                        }
                    });
                }
            }
            else {
                MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", false, false, "Cargando Información...");
                });
            }
        }, null);
}

function borrarRegistroXSistemaEtapaIICanExtra(obj, funcionExitoAEjecutar) {
    peticionAjax('Cancelaciones.aspx/statusEtapaIICancelacionExtraOrdinaria', "POST", { opcion: 3, idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        idEtapa: $("#MainContent_hfEtapa").val(), statusAlnova: 0, statusTDC: 0, statusCredimax: 0, sistema: $(obj).attr("alt")
    },
        function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1)
                llamarPeticionAjax(obj, funcionExitoAEjecutar);
            else {
                MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", false, false, "Cargando Información...");
                });
            }
        }, null);
}

function llamarPeticionAjax(obj, funcionExitoAEjecutar) {
    var url = "Cancelaciones.aspx";
    var tipoDato = "json";
    var idInputFile = $(obj).parent().find("input:file").attr("id");
    var funcionExito = funcionExitoAEjecutar;
    var parametros = { 'idPeriodo': $("#MainContent_hfIdPeriodo").val(),
        'idEtapa': $("#MainContent_hfEtapa").val(),
        'subirArchivoCan': 'subirArchivoCan',
        'cartera': $(obj).parent().find("input:hidden").val()
    };
    return ajaxFileUpload(idInputFile, funcionExito, parametros, obj);
}

function validarExistenciaDeArchivo(obj) {
    var bandera = false;
    if ($(obj).val() == '') {
        WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", true, false, "Cargando Información...");
        MostrarMsj("Debe seleccionar un archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", false, false, "Cargando Información...");
        });
        bandera = false;
    }
    else {
        bandera = true && validarExistenciasDeFechas();
    }
    return bandera;
}


var nomArchivoASubir;
function ajaxFileUpload(idInputFile, funcionSuccess, parametros, obj) {
    var valorCartera = $(obj).parent().find("input:hidden").val();
    if (valorCartera != "DispAlnova" && valorCartera != "CanalCredimax" && valorCartera != "ContratoMediosPago")
        Waiting(true, "Espere por favor. Cargando Información..."); // ponerDivBloqueadorGeneral();
    else {
        WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", true, true, "Cargando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "8%";
    }
    if (funcionSuccess == undefined) {
        $.ajaxFileUpload
		    ({
		        url: 'Cancelaciones.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaDeArchivo(data, obj);
		        }
		    });
    }
    else {
        $.ajaxFileUpload
		    ({
		        url: 'Cancelaciones.aspx',
		        fileElementId: idInputFile,
		        dataType: 'html',
		        data: parametros,
		        complete: function (data) {
		            Waiting(false, "Espere por favor. Cargando Información...");
		        },
		        success: function (data, status) {
		            subidaComercialSuceptible(data, obj);
		        }
		    });
    }
    return false;
}

function reportarStatusDeSubidaDeArchivo(data, obj) {
    data = data.toString().replace("<pre>", "").replace("</pre>", "").replace("<PRE>", "").replace("</PRE>", "");
    if (data.indexOf('Correcto') != -1) {
        var valorCartera = $(obj).parent().find("input:hidden").val();
        if (valorCartera != "DispAlnova" && valorCartera != "CanalCredimax" && valorCartera != "ContratoMediosPago" && valorCartera != "Extraordinaria")
            lanzarCancelacionNoSuceptible(obj);
        else {
            WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", true, false, "Cargando Información...");
            MostrarMsj("Archivo Cargado Correctamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", false, false, "Cargando Información...");
            });
            if (valorCartera == "Extraordinaria")
                Waiting(false, "Espere por favor. Cargando Información...");
        }
    }
    else {
        WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", true, false, "Cargando Información...");
        MostrarMsj("El archivo no se ha cargado correctamente," + data, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnCargaArchivoCancelacionExtra", false, false, "Cargando Información...");
        });
        Waiting(false, "Espere por favor. Cargando Información...");
    }
}


function subidaComercialSuceptible(data, obj) {
    data = data.toString().replace("<PRE>", "").replace("</PRE>", "").replace("<pre>", "").replace("</pre>", "");
    if (data.indexOf('Correcto') != -1) {
        lanzarCancelacionComercial(true);
    }
    else {
        Waiting(false, "Espere por favor. Cargando Información..."); //quitarDivBloqueadorGeneral();
        MostrarMsj("El archivo no se ha cargado correctamente, verifique el formato de dicho archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
    }
}

var botonSubidaArchivosNoSuceptible;
var sitemaNosucep;
function lanzarCancelacionNoSuceptible(obj) {
    if (!validarExistenciasDeFechas()) {
        return false;
    }
    var parametrosJSON = {
        tipoSistema: $(obj).parent().find("input:hidden").val(),
        fechaOperacion: $("#MainContent_txtFechaEntrega").val(),
        valorUDI: parseFloat($("#MainContent_tbxUDI").val()),
        usr: $("#MainContent_hfUsr").val(),
        opcionSuceptible: 1,
        fechaMarcaje: $("#MainContent_tbxFechaMarcaje").val(),
        etapaCancelacion: $("#MainContent_hfEtapa").val(),
        idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        escargaArchivoExcluir: true
    };
    botonSubidaArchivosNoSuceptible = obj;
    sitemaNosucep = parametrosJSON.tipoSistema;
    Waiting(true, "Espere por favor. Cargando Información..."); //ponerDivBloqueadorGeneral();
    peticionAjax("Cancelaciones.aspx/cancelacionSuceptible", "POST", parametrosJSON, lanzarCancelacionNoSuceptibleFinalizada, lanzarCancelacionNoSuceptibleFinalizada);
}

function lanzarCancelacionNoSuceptibleFinalizada(data) {
    var grid = data.d.split("&&&&")[0];
    var arrayJSON = obtenerArregloDeJSON(grid, false);
    if (arrayJSON[0].SinDatos != undefined) {
        MostrarMsj(arrayJSON[0].SinDatos.toString() + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        $(botonSubidaArchivosNoSuceptible).parent().find('input:checkbox').removeAttr('checked');
        Waiting(false, "Espere por favor. Cargando Información..."); //quitarDivBloqueadorGeneral();
        return;
    }
    var idDiv = $(botonSubidaArchivosNoSuceptible).parentsUntil($('div.Contenidos')).last().parent().attr('id');
    $(botonSubidaArchivosNoSuceptible).parent().find('input:checkbox').attr('checked', 'checked');
    MostrarMsj("Registros excluidos exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
    VerificarBotonesCarteraSuceptible(idDiv);
    actualizarStatusDeProceso(sitemaNosucep, '');
}
//--------------------------BTNS BORRAR
function borrarArchivoASubir(obj) {
    var input = $(obj).parent().find('input:file');
    input.replaceWith(input.clone());
    return false;
}

//-------------------------------------------------------------------PESTAÑA CONSOLIDADO--------------------------------------
//-----------BTN GENERAR------------
function generarArchivoConsolidado() {
    var cad = '';
    if (!validarExistenciasDeFechas()) {
        return false;
    }

    $('#slcDestino').find('option').each(function (index) {
        cad += $(this).val() + ',';
    });
    if (cad != "") {
        Waiting(true, "Espere por favor. Cargando Información..."); //ponerDivBloqueadorGeneral();
        peticionAjax("Cancelaciones.aspx/generarArchivoConsolidado", "POST", { idPeriodo: $("#MainContent_hfIdPeriodo").val(), archivosSeleccionados: cad, fechaOperacion: $("#MainContent_txtFechaEntrega").val(), valorUDI: $("#MainContent_tbxUDI").val() },
                generarArchivoConsolidadoFinalizada, generarArchivoConsolidadoFinalizada);
    }
    else
        MostrarMsj("Debe agregar una(s) opción(es) de <span style='font-weight: bold;'>Carteras Suceptibles</span> al <span style='font-weight: bold;'>Consolidado</span>.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
}

function validarExistenciasDeFechas() {
    var bandera = false;
    var fechaInformacion = $("#MainContent_tbxFechaMarcaje").val();
    var fechaDeElaboracion = $("#MainContent_txtFechaEntrega").val();

    if (fechaInformacion != "" && fechaInformacion.indexOf("/") != -1 && fechaInformacion.split("/")[0].length == 2 && fechaInformacion.split("/")[1].length == 2 && fechaInformacion.split("/")[2].length == 4 &&
    fechaDeElaboracion != "" && fechaDeElaboracion.indexOf("/") != -1 && fechaDeElaboracion.split("/")[0].length == 2 && fechaDeElaboracion.split("/")[1].length == 2 && fechaDeElaboracion.split("/")[2].length == 4 &&
     $("#MainContent_tbxUDI").val() != '') {
        bandera = true;
        actualizarFechaInformacionYElaboracion();
    }
    else {
        if ((fechaInformacion == "" || fechaInformacion.indexOf("/") == -1 || fechaInformacion.split("/")[0].length != 2 || fechaInformacion.split("/")[1].length != 2 || fechaInformacion.split("/")[2].length != 4) &&
        (fechaDeElaboracion == "" || fechaDeElaboracion.indexOf("/") == -1 || fechaDeElaboracion.split("/")[0].length != 2 || fechaDeElaboracion.split("/")[1].length != 2 || fechaDeElaboracion.split("/")[2].length != 4)) {
            MostrarMsj("Debe seleccionar una Fecha de Información y de Elaboración valida.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        else if (fechaInformacion == "" || fechaInformacion.indexOf("/") == -1 || fechaInformacion.split("/")[0].length != 2 || fechaInformacion.split("/")[1].length != 2 || fechaInformacion.split("/")[2].length != 4) {
            MostrarMsj("Debe seleccionar una Fecha de Información valida.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        else {
            MostrarMsj("Debe seleccionar una Fecha de Elaboración valida.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        bandera = false;
    }
    return bandera;
}

function generarArchivoConsolidadoFinalizada(data) {
    setTimeout(terminarWait, 200);  // quitarDivBloqueadorGeneral();
    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    if (arrayJSON[0].SinDatos == undefined) {
        var codigoGenerado = '<center>' + generarBotones(arrayJSON[0]) + '<center>';
        $("#divDescargaConsolidado").html(codigoGenerado);
        $('#btnCifrasControlCon').removeAttr('disabled');
        $('#btnConsolidadoCon').removeAttr('disabled');
        $('#btnCifrasControlCon').attr('class', 'classButton');
        $('#btnConsolidadoCon').attr('class', 'classButton');
    }
    else MostrarMsj(arrayJSON[0].SinDatos.toString(), "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
}
///---------------------BTN CIFRAS CONTROL
function pedirCifrasControlConsolidado() {
    var cad = "";
    if (!validarExistenciasDeFechas()) {
        return false;
    }

    $('#slcDestino').find('option').each(function (index) { cad += $(this).val() + ','; });
    var cadena = '<div id="divBloqVtnCifrasControl" style="width:99%;height:95%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblCifrasControl" style="width:100%;height:82%;overflow: auto;margin-top: 5px;">  </div></div>';
    $("#divCifrasControlG").empty();
    AgregarVtnFlotante("divCifrasControlG", "", "CIFRAS CONTROL", "", cadena, 240, 700, false, false, "", "", null);
    WaitingVtn("divBloqVtnCifrasControl", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";

    var parametrosJSON = { tipoSistema: cad, idPeriodo: $("#MainContent_hfIdPeriodo").val(), idEtapa: $("#MainContent_hfEtapa").val() };
    //ponerDivBloqueadorGeneral();
    peticionAjax("Cancelaciones.aspx/cifrasControl", "POST", parametrosJSON, pedirCifrasControlConsolidadoFinalizada, pedirCifrasControlConsolidadoFinalizada);
}

function pedirCifrasControlConsolidadoFinalizada(data) {
    var grid = data.d.split("&&&&")[0];
    var arrayJSON = obtenerArregloDeJSON(grid, false);
    if (arrayJSON[0].SinDatos != undefined) {
        WaitingVtn("divBloqVtnCifrasControl", false, false, "Cargando Información...");
        MostrarMsj(arrayJSON[0].SinDatos.toString(), "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
        return;
    }
    grid = data.d.split("&&&&");
    var numTablas = grid.length;
    var cad = '';
    for (var x = 0; x < numTablas; x++) {
        var JSON = obtenerArregloDeJSON(grid[x], false);
        cad += generarTablaDeRegistrosCancela(JSON)
    }
    $("#dvDetalleEITblCifrasControl").html(cad);
    WaitingVtn("divBloqVtnCifrasControl", false, false, "Cargando Información...");

    //    $('#divVentanaMensajes').html('<br /><br />' + cad);
    //    $.fancybox({
    //        'href': '#divCifrasControl'
    //    });
}

//--------------------------------------BTN CONSOLIDADO
function mostrarBotonesDeDescargaConsolidado(idDiv) {
    if (!validarExistenciasDeFechas()) {
        return false;
    }

    var cadena = '<div id="divBloqVtnBotonesDescargaConsolidado" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblBotonesDescargaConsolidado" style="width:100%;height:82%;overflow: auto;margin-top: 5px;">  </div></div>';
    $("#divBotonesDescargaConsolidadoG").empty();
    AgregarVtnFlotante("divBotonesDescargaConsolidadoG", "", "BOTONES DE DESCARGA CONSOLIDADO", "", cadena, 240, 700, false, false, "", "", null);
    $("#dvDetalleEITblBotonesDescargaConsolidado").html($('#' + idDiv).html());
    $('#' + idDiv).find('input:button').show();
    //    $.fancybox({
    //        'href': '#' + idDiv
    //    });
}

//-- FINALIZA PROCESO CONSOLIDADO
function finalizarProcesoCanc() {
    finalProceso('FINAL', '');
}

function finalProceso(cartera, nombreArchivo) {
    if (!validarExistenciasDeFechas()) {
        return false;
    }
    var parametrosJSON = {
        idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        idEtapa: $("#MainContent_hfEtapa").val(),
        opcCartera: cartera,
        archivo: nombreArchivo
    };
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Cancelaciones.aspx/actualizarStatusDeProceso", "POST", parametrosJSON,
    function (data) {
        window.open("ProcesoCancelacion.aspx", "_self"); setTimeout(terminarWait, 200);
    },
        function (data) {
            setTimeout(terminarWait, 200);
        });
}

//----------------------------------------------------------------------BTS GRALES-------------------------------------

//---------------BTN Reiniciar Proceso

function reiniciarProceso() {
    var parametrosJSON = {
        idPeriodo: $("#MainContent_hfIdPeriodo").val()
    };

    peticionAjax("Cancelaciones.aspx/reiniciarProceso", "POST", parametrosJSON,
    function (data) { location.reload(); },
    function (data) { });
}

//--------------------------------BTN Finalizar
//------ FUNCION PARA LAS FASES 0,4
function ContinuarProcesoCancelacion() {
    if (!validarExistenciasDeFechas()) {
        return false;
    }
    actualizarStatusDeProceso('FINAL', '');
}
function actualizarStatusDeProceso(cartera, nombreArchivo) {
    var parametrosJSON = {
        idPeriodo: $("#MainContent_hfIdPeriodo").val(),
        idEtapa: $("#MainContent_hfEtapa").val(),
        opcCartera: cartera,
        archivo: nombreArchivo
    };
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Cancelaciones.aspx/actualizarStatusDeProceso", "POST", parametrosJSON,
                        function (data) {
                            if (parametrosJSON.opcCartera == 'FINAL') { window.open("Cancelaciones.aspx?fechaInformacion=" + $("#MainContent_tbxFechaMarcaje").val() + "&udi=" + $("#MainContent_tbxUDI").val() + "&fechaElaboracion=" + $("#MainContent_txtFechaEntrega").val(), "_self"); } //location.reload(); }
                            setTimeout(terminarWait, 200); //quitarDivBloqueadorGeneral();
                        },
                        function (data) {
                            setTimeout(terminarWait, 200); //quitarDivBloqueadorGeneral();
                        });
}

//---------- FUNCION PARA LAS FASES 5
function preFinalizar() {
    $('#btnFinalizarProcesoFaseConsolidado').attr('class', 'classButton');
    $('#btnFinalizarProcesoFaseConsolidado').removeAttr('disabled');
}


/******************************************* Funciones para generar HTML ***********************************************/
function generarTablaDeRegistrosCancela(listaDeJSON) {
    var cad = '<center><table class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        cad += '<th style="width:18%">';
        cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '</tr>';
    cad += '</thead>';

    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length - 1; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td>';
            cad += format(json[element]);
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '<tfoot><tr class="rowPie">';
    var json = listaDeJSON[listaDeJSON.length - 1];
    var contador = 1;
    //ImprimirJSON(json);
    for (var element in json) {
        if (json[element] != '') {
            cad += '<td colspan="' + contador + '">';
            cad += format(json[element]);
            cad += '</td>';
            contador = 1;
        }
        else {
            contador++;
        }
    }
    cad += '</tr></tfoot>';
    cad += '</table></center>';
    cad += '<br>';
    return cad;
}

function generarTablaSinCifras() {
    var cad = '<h3>Cifras de Control no disponibles</h3>';
    return cad;
}

function generarTablaDeRegistrosExtraordinaria(titulo, listaDeJSON) {
    var auxTit = '';
    var aux = '';
    var numColumn = 0;
    var cad = '<center><table class="dataGridDatos">';


    aux += '<thead>';
    aux += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados.toString() != 'Sistema' && encabezados.toString() != 'Cartera') {
            aux += '<th style="width:18%">';
            aux += encabezados.toString();
            aux += '</th>';
            numColumn++;
        }
    }
    aux += '</tr>';
    aux += '</thead>';

    auxTit += '<thead>';
    auxTit += '<tr>';
    auxTit += '<th style="width:18%" colspan=' + numColumn + '>' + titulo + '</th>';
    auxTit += '</tr>';
    auxTit += '</thead>';

    cad += auxTit + aux;
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length - 1; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element.toString() != 'Sistema' && element.toString() != 'Cartera') {
                cad += '<td>';
                cad += format(json[element]);
                cad += '</td>';
            }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '<tfoot><tr class="rowPie">';
    var json = listaDeJSON[listaDeJSON.length - 1];
    var contador = 1;
    //ImprimirJSON(json);
    for (var element in json) {
        if (json[element] != '') {
            cad += '<td colspan="' + contador + '">';
            cad += format(json[element]);
            cad += '</td>';
            contador = 1;
        }
        else {
            contador++;
        }
    }
    cad += '</tr></tfoot>';
    cad += '</table></center>';


    return cad;
}

//-----------------------------------------------------------Funcion paso items List Box-----------------------------------------------------------------------

$(function () {
    var biggest = 0;
    $(".btnSeleccionListBox").each(function (i) {
        if ($(this).width() > biggest) { biggest = $(this).width(); }
    });
    biggest += 10;
    //Mueve Un elemento de izquierda a derecha al dar doble click sobre el
    $("#box1Group select[name='view']").dblclick(function () {
        MoveSelected('box1Group', 'box2Group');
    });

    //Mueve Un elemento de derecha a izquierda al dar doble click sobre el
    $("#box2Group select[name='view']").dblclick(function () {
        MoveSelected('box2Group', 'box1Group');
    });

    //Mueve Un elemento de izquierda a derecha al dar click sobre el boton DERECHA( > )
    $("#to2").click(function () {
        MoveSelected('box1Group', 'box2Group');
    }).width(biggest);

    //Mueve Un elemento de derecha a izquierda al dar doble click sobre el boton IZQUIERDA( < )
    $("#allTo2").click(function () {
        MoveAll('box1Group', 'box2Group');
    }).width(biggest);

    //Mueve todos los elementos de izquierda a derecha al dar click sobre el boton DERECHA( >> )
    $("#allTo1").click(function () {
        MoveAll('box2Group', 'box1Group');
    }).width(biggest);

    //Mueve todos los elementos de derecha a izquierda al dar doble click sobre el boton IZQUIERDA( << )
    $("#to1").click(function () {
        MoveSelected('box2Group', 'box1Group');
    }).width(biggest);
});

function SortOptions(toSortGroupID) {
    var $toSortOptions = $("#" + toSortGroupID + " select[name='view'] option");
    $toSortOptions.sort(function (a, b) {
        var aVal = a.text.toLowerCase();
        var bVal = b.text.toLowerCase();
        if (aVal < bVal) { return -1; }
        if (aVal > bVal) { return 1; }
        return 0;
    });
    $("#" + toSortGroupID + " select[name='view']").empty().append($toSortOptions);
}

function MoveSelected(fromGroupID, toGroupID) {
    $("#" + fromGroupID + " select[name='view'] option:selected").clone().appendTo("#" + toGroupID + " select[name='view']").end().end();
    $("#" + fromGroupID + " select[name='view'] option:selected").remove();
}

function MoveAll(fromGroupID, toGroupID) {
    $("#" + fromGroupID + " select[name='view'] option").attr('selected', 'selected');
    MoveSelected(fromGroupID, toGroupID);
}

function ExportarAExcel(tipoSistema) {
    if (tipoSistema != 'Extraordinaria') {
        Waiting(true, "Espere por favor. Cargando Información...");
        setTimeout(' Waiting(false, "Espere por favor. Cargando Información...");', 10000);
        __doPostBack("ExcelCifrasControl", tipoSistema + ',' + $("#MainContent_hfIdPeriodo").val() + ',' + $("#MainContent_hfEtapa").val());
    } else {
        WaitingVtn("divBloqVtnCifrasControl", true, true, "Cargando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "8%";
        setTimeout(' WaitingVtn("divBloqVtnCifrasControl", false, false, "Cargando Información...");', 10000);
        etapaCancelacion = $("#MainContent_hfEtapa").val();
        if (etapaCancelacion == 1)
            opSuceptible = 2;
        else
            opSuceptible = 1;
        //__doPostBack("ExcelCifrasControl", tipoSistema+',12,07/02/2014,11/02/2014,5.115473,651961,2,1');   
        __doPostBack("ExcelCifrasControl", tipoSistema + ',' + $("#MainContent_hfIdPeriodo").val() + ',' + $("#MainContent_tbxFechaMarcaje").val() + ',' + $("#MainContent_txtFechaEntrega").val() + ',' + parseFloat($("#MainContent_tbxUDI").val()) + ',' + $("#MainContent_hfUsr").val() + ',' + opSuceptible + ',' + etapaCancelacion);
    }
}

///--------------------------------------------------------CIFRAS CONTROL X FASE

function btnCifrasControlXFase(etapa, descripcionEtapa) {
    var cadena = '<div id="divBloqVtnGetCifrasControl" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblGetCifrasControl" style="width:100%;height:100%;margin-top: 0px;">  ';
    cadena += '<div style="width:100%;height:25%;"><table style="width: 100%"><tr><td style="text-align: center; font-size: large"> <b>Cifras Control</b></td></tr><tr><td style="text-align: right">' +
                '<img id="btlExportToExcel" src="../../Images/Cancelaciones/Cargas/excelImg.jpeg" onclick="__doPostBack(\'ExcelCifrasControlXEtapa\',\'' + descripcionEtapa + '\')" class="imgCrecerMedium" title="Exportar a Excel"/>' +
                '<img id="btlExportToExelDisable" src="../../Images/Cancelaciones/Cargas/excelImgDisable.jpeg" class="imgCrecerMedium" title="Exportar a Excel (Sin Datos)" style="display:none"/>';
    cadena += ' <img id="idbtnExportalPDF" src="../../Images/Cancelaciones/Cargas/pdfImg.jpeg" onclick="__doPostBack(\'PdfCifrasControlXEtapa\',\'' + descripcionEtapa + '\')" class="imgCrecerMedium" title="Exportar a Pdf"/>' +
              ' <img id="idbtnExportalPDFDisable" src="../../Images/Cancelaciones/Cargas/pdfImgDisable.jpeg" class="imgCrecerMedium" title="Exportar a Pdf(Sin Datos)" style="display:none"/></td></tr></table></div>';
    cadena += '<div style="width:100%;height:75%;overflow: auto;"><table style="width: 100%;height: 100%;"><tr> <td> <div id="dvContenidoCifrasControl" style="width:100%;height: 100%;"> </div> </td></tr> </table></div>';
    cadena += '</div></div>';
    $("#dvCifrasControl").empty();
    AgregarVtnFlotante("dvCifrasControl", "", "CIFRAS CONTROL (" + descripcionEtapa.toUpperCase() + ")", "", cadena, 300, 720, false, false, "", "", null);
    WaitingVtn("divBloqVtnGetCifrasControl", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";

    peticionAjax("Cancelaciones.aspx/getCifrasControlXEtapa", "POST", { etapa: etapa, idPeriodo: /*"30"*/$("#MainContent_hfIdPeriodo").val() }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $('#dvContenidoCifrasControl').html(SetCifrasControl(JSON));
                WaitingVtn("divBloqVtnGetCifrasControl", false, false, "Cargando Información...");
            }
            else {
                $("#btlExportToExcel").hide();
                $("#btlExportToExelDisable").show();
                $("#idbtnExportalPDF").hide();
                $("#idbtnExportalPDFDisable").show();
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        WaitingVtn("divBloqVtnGetCifrasControl", false, false, "Cargando Información...");
    }, null);
}

function SetCifrasControl(JSON) {
    var Sistema = '';
    var cad = '<center><table id="tblCifrasC" class="dataGridDatos" style="width:100%;">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = JSON[0];
    for (var encabezados in auxJSON) {
        cad += '<th style="width:20%">';
        cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '</tr>';
    cad += '</thead>';

    cad += '<tbody>';
    for (var filas = 0; filas < JSON.length - 1; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = JSON[filas];
        for (var element in json) {
            if (element != 'Cartera' && element != 'Sistema' && element != 'Fecha de Carga')
                cad += '<td style="text-align:right">';
            else
                cad += '<td style="text-align:left">';

            if (element == 'Cartera')
                Sistema = json[element];

            cad += format(json[element]);
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '<tfoot><tr class="rowPie">';
    var json = JSON[JSON.length - 1];
    var contador = 1;
    for (var element in json) {
        if (json[element] != '') {
            cad += '<td colspan="' + contador + '">';
            cad += format(json[element]);
            cad += '</td>';
            contador = 1;
        }
        else
            contador++;
    }
    cad += '</tr></tfoot>';
    cad += '</table></center>';
    return cad;
}