$(document).ready(function () {
    $("#accordion").accordion({
});
document.getElementById("divSeleccion").style.height = "auto";
document.getElementById("divValidacionesCalidadDeInformacion").style.height = "auto";
document.getElementById("divCifrasProcesadas").style.height = "auto";
document.getElementById("divPrepararCargaInfoDetalle").style.height = "auto";
$("#hSeleccion").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
$("#hValidacionesCalidadDeInformacion").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
$("#hCifrasProcesadas").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
$("#hDescargas").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
});

var fechaActual = "";
//var Meses = ["Febrero", "Abril", "Junio", "Agosto", "Septiembre","Octubre", "Diciembre"];
var Meses = ["Febrero", "Abril", "Junio", "Agosto", "Octubre", "Diciembre"];
function ObtenerFechaActual() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('ConsumoNoRevolvente.aspx/DevuelveAñosMesActual', "POST", null, function DevuelveAñosMesActual_Finish(data1) {
        if (data1.d == "" || data1.d == null) {
            Waiting(false, "Espere por favor. Cargando Información...");
            MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            return;
        }
        document.getElementById('sltAnio').options.length = 0;
        for (var i = 0; i < data1.d.split(":")[0].split(",").length; i++) {
            var opt = document.createElement('option');
            opt.value = data1.d.split(":")[0].split(",")[i];
            opt.innerHTML = data1.d.split(":")[0].split(",")[i];
            document.getElementById('sltAnio').appendChild(opt);
        }

        document.getElementById('sltMes').options.length = 0;
        var ii = 1;

        for (var i = 1; i <= parseInt(data1.d.split(":")[2].split("/")[1]) ; i++) {
            if (i % 2 == 0) {
                var optionM = document.createElement('option');
                optionM.value = (i < 10 ? "0" + i : i);
                optionM.innerHTML = Meses[ii - 1];
                document.getElementById('sltMes').appendChild(optionM);
                ii++;
            }
        }


        //for (var i = 1; i <= parseInt(Meses.length) ; i++) {
        //    var optionM = document.createElement('option');
        //    optionM.value = devuelveValorDia(Meses[ii - 1])
        //    optionM.innerHTML = Meses[ii - 1];
        //    document.getElementById('sltMes').appendChild(optionM);
        //    ii++;
        //}


        $("#sltAnio").val((parseInt(data1.d.split(":")[0].split(",")[0]) + 1) + "");
        var mesSeleccionar = data1.d.split(":")[2].split("/")[1];
        $("#sltMes").val(mesSeleccionar);
        fechaActual = data1.d.split(":")[2];
        fechaConsulta = data1.d.split(":")[2];

        WidtDatePicker();
        verificaExisteJOBGenerandoPaquete();
        esCargaInicial = true;
        seteaEstatusIndicadores();
        $("#ImgExportarCifrasEtapaIII").hide();
        verificaNoExisteProcesoCorriendo();
    }, null);
}

function devuelveValorDia(dia) {
    var dato;
    switch (dia) {
        case "Enero":
            dato = 1;
            break;
        case "Febrero":
            dato = 2;
            break;
        case "Marzo":
            dato = 3;
            break;
        case "Abril":
            dato = 4;
            break;
        case "Mayo":
            dato = 5;
            break;
        case "Junio":
            dato = 6;
            break;
        case "Julio":
            dato = 7;
            break;
        case "Agosto":
            dato = 8;
            break;
        case "Septiembre":
            dato = 9;
            break;
        case "Octubre":
            dato = 10;
            break;
        case "Noviembre":
            dato = 11;
            break;
        case "Diciembre":
            dato = 12;
            break;
    }
    return dato;
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
//            for (var i = 0; i < data.d.split(',').length; i++)
//                $("#img" + data.d.split(',')[i].split('-')[0] + "_EsCargando" + data.d.split(',')[i].split('-')[1]).css("display", "inline");
        }
        else {
            for (var i = 0; i < strSecciones.split(',').length; i++) {
                for (var ii = 0; ii < strProductos.split(',').length; ii++)
                    $("#img" + strSecciones.split(',')[i] + "_EsCargando" + strProductos.split(',')[ii]).css("display", "none");
            }
        }
        setTimeout(verificaExisteJOBGenerandoPaquete, 1000);
    }, null);
}


var fechaConsulta = "";
function sltAnio_OnChange() {
    document.getElementById('sltMes').options.length = 0;
    var ii = 1;
    var mesesRecorrer = parseInt(fechaActual.split('/')[2]) == parseInt($("#sltAnio").val()) ? parseInt(fechaActual.split('/')[1]) : 12;
    for (var i = 1; i <= parseInt(mesesRecorrer); i++) {
        if (i % 2 == 0) {
            var optionM = document.createElement('option');
            optionM.value = (i < 10 ? "0" + i : i);
            optionM.innerHTML = Meses[ii - 1];
            document.getElementById('sltMes').appendChild(optionM);
            ii++;
        }
    }
    var mesSeleccionar = parseInt(fechaActual.split('/')[2]) == parseInt($("#sltAnio").val()) ? fechaActual.split('/')[1] : 2;
    $("#sltMes").val(mesSeleccionar);
    $('#divCifrasOficiales').html("");
    $('#divCifrasControl').html("");
    $('#divDiferencia').html("");
    $('#divBajas').html("");
    esCargaInicial = true;
    Waiting(true, "Espere por favor. Cargando Información...");
    obtenerFinMesAñoMesSelect();
}

function sltMes_OnChange() {
    $('#divCifrasOficiales').html("");
    $('#divCifrasControl').html("");
    $('#divDiferencia').html("");
    $('#divBajas').html("");
    esCargaInicial = true;
    Waiting(true, "Espere por favor. Cargando Información...");
    obtenerFinMesAñoMesSelect();
}

function obtenerFinMesAñoMesSelect() {
    CargoCifras = false;
    bloquearEtapas = false;
    desbloquearEtapas = false;
    statusPaqueteActivo = "";
    $("#imgReProcesoE1").hide();
    $("#imgReProcesoE2").hide();
    $('#divTblIncidencias').html("");
    seteaEstatusIndicadores();
    $("#btnProcesar").val("Procesar");
    $("#btnProcesar").attr("class", "classButton");
    $("#btnEjecutarValidaciones").attr("disabled", false);
    $("#ImgExportarCifrasEtapaIII").hide();
    peticionAjax('ConsumoNoRevolvente.aspx/obtenerFinMesAñoMesSelect', "POST", { anio: $("#sltAnio").val(), mes: $("#sltMes").val() },
            function (data) {
                if (data.d != "") {
                    fechaConsulta = data.d;
                    seteaEstatusIndicadores();
                    verificaNoExisteProcesoCorriendo();
                    setTimeout(verificaNoExisteProcesoCorriendo, 2000);
                }
            }, null);
    setTimeout(verificaNoExisteProcesoCorriendo, 2000);
}

var cargarIncidencias = false;
function verificaNoExisteProcesoCorriendo() {
    peticionAjax("ConsumoNoRevolvente.aspx/verificaExisteProcesoCorriendo", "POST", { fechaReporte: fechaConsulta.split('/')[2] + "/" + fechaConsulta.split('/')[1] + "/" + fechaConsulta.split('/')[0],
        parametrosSistemaRun: "", estatusProceso: "1", etapaProceso: "0", opcion: "1"
    },
    function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                cargarIncidencias = false;
                var JSON = obtenerArregloDeJSON(data.d, false);
                idEtapaProcesando = parseInt(JSON[0].EtapaProceso);
                $("#btnProcesar").attr("disabled", true);
                $("#btnProcesar").attr("class", "classButtonDis");
                $("#btnEjecutarValidaciones").attr("disabled", true);
                $("#btnEjecutarValidaciones").attr("class", "classButtonDis");
                $("#divPBEtapa_" + idEtapaProcesando).show();
                sistemasAPRocesarT = JSON[0].Parametros;
                document.getElementById("divPBEtapa_" + idEtapaProcesando).style.width = "0%";
                $("#divEtapa_" + idEtapaProcesando + "_txt").html("Cargando... 0% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>");
                ProgressBarSeleccion();
            }
            else {
                setTimeout(verificaNoExisteProcesoCorriendo, 2000);
                if (esCargaInicial)
                    cargarIncidencias = true;

            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        if (esCargaInicial) {
            CargaIndicadoresIniciales();
            setTimeout(verificaNoExisteProcesoCorriendo, 2000);
        }
    }, null);
}

function seteaEstatusIndicadores() {
    $('#divCifrasOficiales').html("");
    $('#divCifrasControl').html("");
    $('#divDiferencia').html("");
    $('#divBajas').html("");
    document.getElementById("divCifrasProcesadas").style.height = "auto";
    for (var x = 1; x < 5; x++) {
        $("#spStatusEtapa_" + x).show();
        $("#spStatusEtapa_" + x).attr("class", DeterminaEstatusClassXId("0"));
        $("#spStatusEtapa_" + x).attr("title", DeterminaTitleEstatusXId("0"));
    }
    statusFaseSeleccion = $("#spStatusEtapa_1").attr("class");
    for (var x = 2; x < 5; x++)
        habilitarDeshabilitarControles(false, x);
}

var statusFaseSeleccion = "";
var esCargaInicial = false;
var cargarCifrasControlHistorial = false;
var aplicarDesabilitarControlesEtapaIV = true;
var esProcesarCifras = false;
var arrayJSONInd = null;
function CargaIndicadoresIniciales() {
    peticionAjax('ConsumoNoRevolvente.aspx/verificaRegistrosEnTblPasoIncidencias', "POST", { fechaReporte: fechaConsulta.split('/')[2] + "/" + fechaConsulta.split('/')[1] + "/" + fechaConsulta.split('/')[0] },
            function (dataR) {
                arrayJSONInd = obtenerArregloDeJSON(dataR.d, false);
                var numReg = parseInt(arrayJSONInd[0].Column1);
                if (numReg > 0) $("#imgReProcesoE1").show();
                else $("#imgReProcesoE1").hide();
                if (desbloquearEtapas || numReg > 0) $("#btnProcesar").val("Actualizar");
                else $("#btnProcesar").val("Procesar");
                peticionAjax('ConsumoNoRevolvente.aspx/monitoreoSeleccion', "POST", { opcion: 3, fechaReporte: fechaConsulta.split('/')[2] + "/" + fechaConsulta.split('/')[1] + "/" + fechaConsulta.split('/')[0], sistema: '' },
            function (data) {
                if (data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var arrayClaves = new Array("", "", "", "");
                        arrayJSONInd = obtenerArregloDeJSON(data.d, false);
                        for (var x = 0; x < arrayJSONInd.length; x++) {
                            $("#spStatusEtapa_" + arrayJSONInd[x].FIClave).show();
                            $("#spStatusEtapa_" + arrayJSONInd[x].FIClave).attr("class", DeterminaEstatusClassXId(arrayJSONInd[x].FIBandera));
                            $("#spStatusEtapa_" + arrayJSONInd[x].FIClave).attr("title", DeterminaTitleEstatusXId(arrayJSONInd[x].FIBandera) + (arrayJSONInd[x].FVCError != "" ? '. Clic para Ver Detalle' : ''));
                            $("#spStatusEtapa_" + arrayJSONInd[x].FIClave).attr("alt", arrayJSONInd[x].FVCError);
                            if (arrayJSONInd[x].FIBandera != "0") {
                                habilitarDeshabilitarControles(true, arrayJSONInd[x].FIClave);
                                habilitarDeshabilitarControles(true, parseInt(arrayJSONInd[x].FIClave) + 1);
                                if ((esCargaInicial || esProcesarCifras) && parseInt(arrayJSONInd[x].FIClave) < 4) {
                                    if (parseInt(arrayJSONInd[x].FIClave) == 3) {
                                        cargarCifrasControlHistorial = true;
                                        aplicarDesabilitarControlesEtapaIV = false;
                                    }
                                    else cargarCifrasControlHistorial = false;
                                }
                            }
                        }
                        for (var x = 1; x < 5; x++) {
                            var existe = false;
                            for (var i = 0; i < arrayJSONInd.length; i++) {
                                if (parseInt(arrayJSONInd[i].FIClave) == x) {
                                    existe = true;
                                    break;
                                }
                            }
                            if (!existe && x > 1) {
                                $("#spStatusEtapa_" + x).attr("class", DeterminaEstatusClassXId("0"));
                                $("#spStatusEtapa_" + x).attr("title", DeterminaTitleEstatusXId("0"));
                                habilitarDeshabilitarControles(false, x + 1);
                            }
                        }
                        statusFaseSeleccion = $("#spStatusEtapa_1").attr("class");
                    }
                    else {
                        seteaEstatusIndicadores();
                        bloquearControlesEtapaIV();
                        if ($("#divPBEtapa_1").css("display") == "none") {
                            $("#btnProcesar").val("Procesar");
                            $("#btnProcesar").attr("class", "classButton");
                            $("#btnEjecutarValidaciones").attr("disabled", false);
                        }
                    }

                }
                if (esCargaInicial) {
                    if (cargarCifrasControlHistorial && $("#spStatusEtapa_3").attr("class") != "EstatusGris" && arrayJSONInd[0].FDFechaReporte.split('/')[1] == $("#sltMes").val() && !CargoCifras)
                        cargaCifrasControl(false);
                    else if (esCargaInicial && cargarIncidencias && $("#spStatusEtapa_2").attr("class") != "EstatusGris" && arrayJSONInd[0].FDFechaReporte != undefined && arrayJSONInd[0].FDFechaReporte.split('/')[1] == $("#sltMes").val())
                        estructurasAgrupadas();
                    else if (fechaConsulta.split('/')[1] == $("#sltMes").val())
                        obtenerTablaEtapIV();
                }
                if (cargarCifrasControlHistorial && esProcesarCifras) {
                    esProcesarCifras = false;
                    obtenerTablaEtapIV();
                }
                actualizarTablaEtapaIV();
                //Waiting(false, "Espere por favor. Cargando Información..."); 
            }, null);
            }, null);
}


function DeterminaEstatusClassXId(idItem) {
    var classColor = "";
    switch (idItem) {
        case "0": classColor = "EstatusGris"; break;
        case "1": classColor = "EstatusVerde"; break;
        case "2": classColor = "EstatusAmarillo"; break;
        case "3": classColor = "EstatusRojo"; break;
    }
    return classColor;
}

function DeterminaTitleEstatusXId(idItem) {
    var title = "";
    switch (idItem) {
        case "0": title = "No Iniciado"; break;
        case "1": title = "Etapa Finalizada con Éxito"; break;
        case "2": title = "Etapa Finalizada con Advertencias, pero dentro de la tolerancia"; break;
        case "3": title = "Etapa Finalizada con Errores"; break;
    }
    return title;
}

function habilitarDeshabilitarControles(esHabilitar, idControles) {
    if (esHabilitar && (!bloquearEtapas || parseInt(idControles) == 4) && $("#sltAnio").attr("disabled") != "disabled") {
        $(".tblControls_" + idControles).find("button").removeAttr('disabled');
        $(".tblControls_" + idControles).find("input:button").removeAttr('disabled');
        $(".tblControls_" + idControles).find("input:button").attr('class', 'classButton');
        $(".tblControls_" + idControles).find("input:text").removeAttr('disabled');
        $(".tblControls_" + idControles).find("input:checkbox").removeAttr('disabled');
        $("#imgDescargaArchivo").show();
        $("#imgDescargaArchivoDisable").hide();
        if (idControles == 4) {
            $(".clsImgPdf").css("display", "inline");
            $(".clsImgStatus").css("display", "inline");
        }
    }
    else {
        $(".tblControls_" + idControles).find("button").attr('disabled', 'disabled');
        $(".tblControls_" + idControles).find("input:button").attr('disabled', 'disabled');
        $(".tblControls_" + idControles).find("input:button").attr('class', 'classButtonDis');
        $(".tblControls_" + idControles).find("input:text").attr('disabled', 'disabled');
        $(".tblControls_" + idControles).find("input:checkbox").attr('disabled', 'disabled');
    }
}
//--------- Mostrar Detalle Estatus Etapas

function mostrarDetalleEtapa(obj) {
    event.cancelBubble = true;
    if ($(obj).attr("class") == "EstatusRojo" || $(obj).attr("class") == "EstatusAmarillo")
        MostrarMsj("<center><table class='dataGridDatos'><tr><th >Detalle</th><tr><tr class='row'><td style='padding: 3px;'>" + $(obj).attr("alt") + "</td></tr></table></center>", "Detalle Status", false, true, false, "", "Aceptar", "", 250, 155, null, null, null);
}


//-------------------------------------- ETAPA I PROCESAR
function btnProcesar_Click() {
    peticionAjax("ConsumoNoRevolvente.aspx/procesarFaseSeleccionPaso1", "POST", { fechaReporte: fechaConsulta.split('/')[2] + fechaConsulta.split('/')[1] + fechaConsulta.split('/')[0] }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d == "true") {
                if ($("#imgReProcesoE2").css("display") == "none") {
                    if ($("#btnProcesar").val() == "Procesar")
                        verificarInfoDeFuentes();
                    else
                        insertaEtapaProcesando("1", "1", "Alnova,ArmntoCredimax,Credimax%%&&1,2,3");
                }
                else
                    MostrarMsj("Cargar Archivo Etapa II (Validaciones Calidad de Información)", "Mensaje", false, true, false, "", "Aceptar", "", 200, 135, null, null, null);
            }
        }
        else MostrarMsj(data.d.split(':')[1], "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    }, null);
}

function verificarInfoDeFuentes() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ConsumoNoRevolvente.aspx/verificarInfoDeTodasFuentes", "POST", { fechaReporte: fechaConsulta.split('/')[2] + fechaConsulta.split('/')[1] + fechaConsulta.split('/')[0] }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                MostrarMsj("No puede ser generado el reporte, faltan los siguientes Sistemas por descargar: <br/><br/><div style='overflow-y:auto;height: 66%;'>" + CreaTablaConOtrosEncabezados(JSON, "") + "</div>", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 230, null, null, null);
            }
            else
                insertaEtapaProcesando("1", "1", "Alnova,ArmntoCredimax,Credimax%%&&1,2,3");
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function chkItems_Click(obj) {
    if ($(obj).is(":checked")) {
        if ($(obj).attr("alt") == "Todos") {
            $("#chkCredimax").attr("checked", true);
            $("#chkArmntoCredimax").attr("checked", true);
            $("#chkAlnova").attr("checked", true);
        }
        else if ($("#chkCredimax").is(":checked") && $("#chkArmntoCredimax").is(":checked") && $("#chkAlnova").is(":checked"))
            $("#chkTodos").attr("checked", true);
    }
    else {
        if ($(obj).attr("alt") == "Todos") {
            $("#chkCredimax").attr("checked", false);
            $("#chkArmntoCredimax").attr("checked", false);
            $("#chkAlnova").attr("checked", false);
        }
        else if (!$("#chkCredimax").is(":checked") || !$("#chkArmntoCredimax").is(":checked") || !$("#chkAlnova").is(":checked"))
            $("#chkTodos").attr("checked", false);
    }
}

function obtenerSistemasSeleccionados() {
    var sistemasAProcesar = "";
    var numPasosIdSistema = "";
    var i = 0;
    $('#tblSistemasAProcesar tr').each(function () {
        if (i > 0 && $(this.cells[0]).find('input:checkbox').length > 0 && $(this.cells[0]).find('input:checkbox').is(":checked")) {
            sistemasAProcesar += $(this.cells[0]).find('input:checkbox')[0].alt.split(',')[0] + ",";
            numPasosIdSistema += $(this.cells[0]).find('input:checkbox')[0].alt.split(',')[1] + ",";
        }
        i++;
    });
    if (sistemasAProcesar != "") {
        sistemasAProcesar = sistemasAProcesar.substring(0, sistemasAProcesar.length - 1);
        numPasosIdSistema = numPasosIdSistema.substring(0, numPasosIdSistema.length - 1);
        insertaEtapaProcesando("1", "1", sistemasAProcesar + "%%&&" + numPasosIdSistema);
        $("#dvVtnSistemasAProcesar").dialog("close");
    }
    else {
        WaitingVtn("divBloqVtnSistemasAProcesar", true, false, "");
        MostrarMsj("Seleccione al menos un Sistema.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 140, null, function () {
            WaitingVtn("divBloqVtnSistemasAProcesar", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnSistemasAProcesar", false, false, "");
        });
    }
}

var sistemasAPRocesarT = "";
function llamadaProcesarSeleccion(sistema) {
    idEtapaProcesando = 1;
    $("#btnProcesar").attr("disabled", true);
    $("#btnProcesar").attr("class", "classButtonDis");
    $("#btnEjecutarValidaciones").attr("disabled", true);
    $("#btnEjecutarValidaciones").attr("class", "classButtonDis");

    $("#divPBEtapa_" + idEtapaProcesando).show();
    sistemasAPRocesarT = sistema + ",4";
    document.getElementById("divPBEtapa_" + idEtapaProcesando).style.width = "0%";
    $("#divEtapa_" + idEtapaProcesando + "_txt").html("Cargando... 0% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>");
    peticionAjax("ConsumoNoRevolvente.aspx/procesarFaseSeleccion", "POST", { fechaReporte: fechaConsulta.split('/')[2] + fechaConsulta.split('/')[1] + fechaConsulta.split('/')[0], sistema: sistema.split("%%&&")[0], opcion: 1 }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d == "") {
                $("#imgReProcesoE1").hide();
                setTimeout(ProgressBarSeleccion, 2000);
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    });
}

function insertaEtapaProcesando(etapa, estatusProceso, parametros) {
    if (etapa == 1)
        parametros = parametros + ",4";
    //Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ConsumoNoRevolvente.aspx/verificaExisteProcesoCorriendo", "POST", { fechaReporte: fechaConsulta.split('/')[2] + "/" + fechaConsulta.split('/')[1] + "/" + fechaConsulta.split('/')[0],
        parametrosSistemaRun: parametros, estatusProceso: estatusProceso, etapaProceso: etapa, opcion: "2"
    },
    function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d == "") {
                if (estatusProceso == "1") {
                    if (etapa == "1")
                        llamadaProcesarSeleccion(parametros);
                    if (etapa == "2")
                        btnEjecutarValidacionesPaso2_Click();
                    Waiting(false, "Espere por favor. Cargando Información...");
                }
                else if (estatusProceso == "0") {
                    if (etapa == "1")
                        Waiting(false, "Espere por favor. Cargando Información...");
                    if (etapa == "2" && !cargoEstructurasAgrup)
                        estructurasAgrupadas();
                }
            }
        }
        else {
            Waiting(false, "Espere por favor. Cargando Información...");
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
    }, null);
}

var cargoEstructurasAgrup = false;
function ProgressBarSeleccion() {
    peticionAjax('ConsumoNoRevolvente.aspx/monitoreoSeleccion', "POST", { opcion: 2, fechaReporte: fechaConsulta.split('/')[2] + "/" + fechaConsulta.split('/')[1] + "/" + fechaConsulta.split('/')[0], sistema: sistemasAPRocesarT.split("%%&&")[1] },
        function (data) {
            if (data.d.indexOf("ERRORCATCH") == -1) {
                if (data.d != "") {
                    var arrayJSONPG = data.d;
                    if (arrayJSONPG == undefined || arrayJSONPG[0] == null) return;
                    arrayJSONPG = obtenerArregloDeJSON(data.d, false);
                    var porcentajeXPaso = 100 / parseInt(arrayJSONPG.length);
                    var numListos = 0;
                    for (var x = 0; x < arrayJSONPG.length; x++) {
                        if (arrayJSONPG[x].FVCDescripcion == "Listo") numListos++;
                    }
                    var valorWhere = parseInt(porcentajeXPaso * numListos);
                    document.getElementById("divPBEtapa_" + idEtapaProcesando).style.width = valorWhere + "%";
                    $("#divEtapa_" + idEtapaProcesando + "_txt").html("Cargando... " + valorWhere + "% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>");

                    if (numListos == arrayJSONPG.length) {
                        $("#sltAnio").attr("disabled", false);
                        $("#sltMes").attr("disabled", false);
                        setTimeout(terminaWaitSeleccion, 2000);
                        setTimeout(verificaNoExisteProcesoCorriendo, 2000);
                        //setTimeout(CargaIndicadoresIniciales, 2000);
                    }
                    else {
                        $("#btnProcesar").attr("disabled", true);
                        $("#btnProcesar").attr("class", "classButtonDis");
                        $("#btnEjecutarValidaciones").attr("disabled", true);
                        $("#btnEjecutarValidaciones").attr("class", "classButtonDis");
                        $("#sltAnio").attr("disabled", true);
                        $("#sltMes").attr("disabled", true);
                        setTimeout(ProgressBarSeleccion, 2000);
                    }
                }
            }
        }, null);
}

function terminaWaitSeleccion() {
    $("#divPBEtapa_" + idEtapaProcesando).hide();
    document.getElementById("divPBEtapa_" + idEtapaProcesando).style.width = "0%";
    $("#divEtapa_" + idEtapaProcesando + "_txt").html("Cargando... 0% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>");

    $("#btnProcesar").attr("disabled", false);
    $("#btnProcesar").attr("class", "classButton");
    $("#btnEjecutarValidaciones").attr("disabled", false);
    $("#btnEjecutarValidaciones").attr("class", "classButton");

    //  insertaEtapaProcesando(idEtapaProcesando, "0", "");
}

//-------------------------------------- ETAPA II VALIDACIONES

var idEtapaProcesando = 0;
function btnEjecutarValidaciones_Click() {
    peticionAjax("ConsumoNoRevolvente.aspx/ejecutarEtapaValidacionesPaso1", "POST", { fechaReporte: fechaConsulta.split('/')[2] + fechaConsulta.split('/')[1] + fechaConsulta.split('/')[0] }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d == "true") {
                if ($("#imgReProcesoE2").css("display") == "none") {
                    $('#divCifrasOficiales').html("");
                    $('#divCifrasControl').html("");
                    $('#divDiferencia').html("");
                    $('#divBajas').html("");
                    cargoEstructurasAgrup = false;
                    idEtapaProcesando = 2;
                    $("#btnProcesar").attr("disabled", true);
                    $("#btnProcesar").attr("class", "classButtonDis");
                    $("#btnEjecutarValidaciones").attr("disabled", true);
                    $("#btnEjecutarValidaciones").attr("class", "classButtonDis");
                    $("#divPBEtapa_" + idEtapaProcesando).show();
                    sistemasAPRocesarT = "Alnova,ArmntoCredimax,Credimax%%&&5";
                    document.getElementById("divPBEtapa_" + idEtapaProcesando).style.width = "0%";
                    $("#divEtapa_" + idEtapaProcesando + "_txt").html("Cargando... 0% <img  src='../../images/PanelDeControl/loading4.gif' style='height:15px;width:15px;' class='imgLoading'/>");
                    insertaEtapaProcesando(idEtapaProcesando, "1", sistemasAPRocesarT);
                    // $("#tdBottonIncidencias").attr("style", "height: 0px");
                }
                else
                    MostrarMsj("Cargar Archivo Etapa II (Validaciones Calidad de Información)", "Mensaje", false, true, false, "", "Aceptar", "", 200, 135, null, null, null);
            }
        }
        else MostrarMsj(data.d.split(':')[1], "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    }, null);
}


function btnEjecutarValidacionesPaso2_Click() {
    var fechaReporte = fechaConsulta.split('/')[2] + fechaConsulta.split('/')[1] + fechaConsulta.split('/')[0];
    peticionAjax("ConsumoNoRevolvente.aspx/ejecutarEtapaValidaciones", "POST", { fechaReporte: fechaReporte, sistema: sistemasAPRocesarT.split("%%&&")[0], opcion: 2 }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d == "") {
                //setTimeout(CargaIndicadoresIniciales, 2000);
                setTimeout(ProgressBarSeleccion, 2000);
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        //Waiting(false, "Espere por favor. Cargando Información...");
    });
}

//------------------------------------------------- MOSTRAR INCIDENCIAS ETAPA II

function estructurasAgrupadas() {
    cargoEstructurasAgrup = true;
    Waiting(true, "Espere por favor. Cargando Información...");
    var cadenaFecha = fechaConsulta.split('/')[2] + "-" + fechaConsulta.split('/')[1] + "-" + fechaConsulta.split('/')[0];
    $('#divTblIncidencias').html("");
    peticionAjax("ValidacionesEstructuras.aspx/EstructurasAgrupadas", "POST", { fecha: cadenaFecha }, function (data) {
        if (data.d.indexOf('Error') == -1) {
            var HTML = '<span style="font-weight:bold;">No hay datos que mostrar.</span>';
            if (data.d != "") {
                HTML = '<table id="tablaEstructurasAgrupadas" style="width:90%" class="dataGrid">';
                HTML += '<caption>Estructuras Agrupadas</caption>';
                HTML += '<tr><th >Producto</th><th >Incidencia</th><th >Registros Afectados</th></tr>';

                var Registros = obtenerArregloDeJSON(data.d, false);
                var Productos = new Array();

                for (var i = 0; i < Registros.length; i++) {
                    if (Productos.indexOf(Registros[i].Producto) == -1)
                        Productos.push(Registros[i].Producto);
                }
                var pedidosTotales = 0.0;
                var incidenciasTotales = 0.0;
                for (var indiceProductos = 0; indiceProductos < Productos.length; indiceProductos++) {
                    var pedidos = 0.0;
                    var incidencias = 0.0;
                    for (var i = 0; i < Registros.length; i++) {
                        if (Productos[indiceProductos] == Registros[i].Producto) {
                            pedidos += parseInt(Registros[i].Pedidos);
                            incidencias++;
                        }
                    }

                    pedidosTotales += parseInt(pedidos);
                    incidenciasTotales += parseInt(incidencias);
                    HTML += '<tr  style="cursor:pointer;background: rgb(192, 213, 196);" onclick="mostrarSeccionesPorProducto(\'' + Productos[indiceProductos] + '\');">';

                    HTML += '<td  style="background: rgb(192, 213, 196);width:15%">';
                    HTML += '<img id="img_' + Productos[indiceProductos] + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/>&nbsp&nbsp' + Productos[indiceProductos];
                    HTML += '</td>';

                    HTML += '<td style="background: rgb(192, 213, 196);width:70%">';
                    HTML += incidencias + ' Incidencias';
                    HTML += '</td>';

                    HTML += '<td  style="text-align:right;background: rgb(192, 213, 196);width:15%">';
                    HTML += '<span style="color: blue; text-decoration: underline;" title="Descargar Archivo(' + Registros[0].Fecha + '_' + Productos[indiceProductos] + ')" onclick="descargarTxt(\'' + cadenaFecha + '\',\'' + Productos[indiceProductos] + '\',\'' + Registros[0].Fecha + '_' + Productos[indiceProductos] + '\',0)">' + formato_numero(pedidos, 0, '.', ',') + '</span>';
                    //HTML += '<a href="DetalleEstructurasPorProducto.aspx?Fecha=' + Registros[0].Fecha + '&Clave=' + Productos[indiceProductos] + '&Archivo=' + Registros[0].Fecha + '_' + Productos[indiceProductos] + '">' + formato_numero(pedidos, 0, '.', ',') + '</a>';
                    HTML += '</td>';

                    HTML += '</tr>';

                    HTML += '<tr>';
                    HTML += '<td colspan="4" >';
                    HTML += '<div  id="' + Productos[indiceProductos] + '" style="width:100%; display:none">';

                    HTML += '</div>';
                    HTML += '</td>';
                    HTML += '</tr>';
                }
                HTML += '<tr class="alternateRow">';
                HTML += '<td style="background: rgb(192, 213, 196);width:15%;">';
                HTML += 'Total';
                HTML += '</td>';

                HTML += '<td style="background: rgb(192, 213, 196);width:70%;">';
                HTML += incidenciasTotales + ' Incidencias';
                HTML += '</td>';
                HTML += '<td style="text-align:right;background: rgb(192, 213, 196);width:15%;">';

                peticionAjax("ValidacionesEstructuras.aspx/VerificarArchivo", "POST", { fecha: cadenaFecha }, function (data1) {
                    if (data1.d.indexOf('Error') == -1) {
                        if (data1.d != "") {
                            // HTML += '<a href="DetalleEstructurasTotales.aspx?Archivo=Estructuras_' + cadenaFecha.replace("/", "").replace("/", "") + '">' + formato_numero(pedidosTotales, 0, '.', ',') + '</a>';
                            HTML += '<span style="color: blue; text-decoration: underline;cursor:pointer" title="Descargar Archivo(Estructuras_' + cadenaFecha.replace("-", "").replace("-", "") + ')" onclick="descargarTxt(\'\',\'\',\'Estructuras_' + cadenaFecha.replace("-", "").replace("-", "") + '\',3)">' + formato_numero(pedidosTotales, 0, '.', ',') + '</span>';
                        }
                        else
                            HTML += '<span id="spanDescargaArchivoShow">' + formato_numero(pedidosTotales, 0, '.', ',') + '</span><span id="spanDescargaArchivoHide" style="color: blue; text-decoration: underline;cursor:pointer;display:none" title="Descargar Archivo(Estructuras_' + cadenaFecha.replace("-", "").replace("-", "") + ')" onclick="descargarTxt(\'\',\'\',\'Estructuras_' + cadenaFecha.replace("-", "").replace("-", "") + '\',3)">' + formato_numero(pedidosTotales, 0, '.', ',') + '</span>';

                        // if (PerfilUser == "19")
                        HTML += '</br><input id="botonCrearArchivo" type="button" value="Crear Archivo" onclick="crearArchivoEstructurasTXT(\'' + cadenaFecha + '\');" class="classButton" />';
                        HTML += '</td>';
                        HTML += '</tr>';
                        HTML += '</table>';
                    }
                    else {
                        MostrarMsj(data1.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
                        Waiting(false, "Espere por favor. Cargando Información...");
                    }
                    $('#divTblIncidencias').html(HTML);
                }, null);
            }
            else {
                $('#divTblIncidencias').html(HTML);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);

        if (esCargaInicial && fechaConsulta.split('/')[1] == $("#sltMes").val())
            obtenerTablaEtapIV();
        //Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function mostrarSeccionesPorProducto(Producto) {
    if (mostrarFilas(Producto)) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var cadenaFecha = fechaConsulta.split('/')[2] + "-" + fechaConsulta.split('/')[1] + "-" + fechaConsulta.split('/')[0];

        peticionAjax("ValidacionesEstructuras.aspx/EstructurasAgrupadasPorProducto", "POST", { fecha: cadenaFecha, producto: Producto }, function (data) {
            if (data.d.indexOf('Error') == -1) {
                var HTML = '<span style="font-weight:bold;">No hay datos que mostrar.</span>';
                if (data.d != "") {
                    HTML = '<table id="tablaEstructurasAgrupadas' + Producto + '" style="width:100%" >';
                    var Registros = obtenerArregloDeJSON(data.d, false);
                    var Secciones = new Array();

                    for (var i = 0; i < Registros.length; i++) {
                        if (Secciones.indexOf(Registros[i].Sección) == -1)
                            Secciones.push(Registros[i].Sección);
                    }

                    var pedidosTotales = 0.0;
                    var incidenciasTotales = 0.0;
                    for (var indiceSecciones = 0; indiceSecciones < Secciones.length; indiceSecciones++) {
                        var pedidos = 0.0;
                        var incidencias = 0.0;

                        for (var i = 0; i < Registros.length; i++) {
                            if (Secciones[indiceSecciones] == Registros[i].Sección) {
                                pedidos += parseInt(Registros[i].Pedidos);
                                incidencias++;
                            }
                        }

                        HTML += '<tr class="alternateRow"  style="cursor:pointer" onclick="mostrarIncidenciasPorProductoSeccion(\'' + Producto + '\', \'' + Secciones[indiceSecciones] + '\');">';

                        HTML += '<td style="width:15%">';
                        HTML += '<img id="img_' + Producto + Secciones[indiceSecciones] + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/>&nbsp&nbsp' + Secciones[indiceSecciones];
                        HTML += '</td>';

                        HTML += '<td style="width:70%;">';
                        HTML += incidencias + ' Incidencias';
                        HTML += '</td>';

                        HTML += '<td style="text-align:right;width:15%;">';
                        HTML += '<span style="color: blue; text-decoration: underline;" title="Descargar Archivo(' + Registros[0].Fecha + '_' + Secciones[indiceSecciones] + '_' + Producto + ')" onclick="descargarTxt(\'' + cadenaFecha + '\',\'' + Secciones[indiceSecciones] + '-' + Producto + '\',\'' + Registros[0].Fecha + '_' + Secciones[indiceSecciones] + '_' + Producto + '\',1)">' + formato_numero(pedidos, 0, '.', ',') + '</span>';
                        HTML += '</td>';

                        HTML += '</tr>';

                        HTML += '<tr>';
                        HTML += '<td colspan="3">';
                        HTML += '<div  id="' + Producto + Secciones[indiceSecciones] + '" style="width:100%; display:none">';

                        HTML += '</div>';
                        HTML += '</td>';
                        HTML += '</tr>';
                    }
                    HTML += '</table>';
                }
                $("#" + Producto).html(HTML);
            }
            else
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function mostrarIncidenciasPorProductoSeccion(Producto, Seccion) {
    if (mostrarFilas(Producto + Seccion)) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var cadenaFecha = fechaConsulta.split('/')[2] + "-" + fechaConsulta.split('/')[1] + "-" + fechaConsulta.split('/')[0];

        peticionAjax("ValidacionesEstructuras.aspx/estructurasAgrupadaPorFechaProductoSeccion", "POST", { fecha: cadenaFecha, producto: Producto, seccion: Seccion }, function (data) {
            if (data.d.indexOf('Error') == -1) {
                var HTML = '<span style="font-weight:bold;">No hay datos que mostrar.</span>';
                if (data.d != "") {
                    HTML = '<table id="tablaEstructurasAgrupadas' + Producto + Seccion + '" style="width:100%" >';
                    var Registros = obtenerArregloDeJSON(data.d, false);

                    for (var i = 0; i < Registros.length; i++) {
                        var Registro = Registros[i];
                        HTML += '<tr>';
                        HTML += '<td style="width:15%">';
                        HTML += Registros[i].Clave;
                        HTML += '</td>';

                        HTML += '<td style="text-align:left;width:70%;white-space: pre-wrap;">';
                        HTML += Registros[i].Incidencia;
                        HTML += '</td>';

                        HTML += '<td style="text-align:right;width:15%">';
                        HTML += '<span style="color: blue; text-decoration: underline;cursor:pointer;" title="Descargar Archivo(' + Registros[i].Fecha + '_' + Registros[i].Clave + '-' + Seccion + '_' + Producto + ')" onclick="descargarTxt(\'' + cadenaFecha + '\',\'' + Registros[i].Clave + '-' + Seccion + '-' + Producto + '\',\'' + Registros[i].Fecha + '_' + Registros[i].Clave + '-' + Seccion + '_' + Producto + '\',2)">' + formato_numero(Registros[i].Pedidos, 0, '.', ',') + '</span>';
                        HTML += '</td>';
                        HTML += '</tr>';
                    }
                }
                $("#" + Producto + Seccion).html(HTML);
            }
            else
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function mostrarFilas(nombreFila) {
    var Fila = document.getElementById(nombreFila);

    if (Fila.style.display == 'none') {
        document.getElementById(nombreFila).style.display = "inline";
        $("#img_" + nombreFila).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
        return true;
    }
    else {
        $("#" + nombreFila).hide();
        $("#img_" + nombreFila).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
        return false;
    }
}

function descargarTxt(fecha, clave, nombreArchivo, opcionDescarga) {
    event.cancelBubble = true;
    Waiting(true, "Espere por favor. Cargando Información...");
    if (opcionDescarga == 3) {
        __doPostBack('ExportarTxtRegistrosAfectadosValEstruc', nombreArchivo + "," + opcionDescarga);
        setTimeout(terminarWait, 10000);
    }
    else {
        peticionAjax("ConsumoNoRevolvente.aspx/obtieneRegistroTxtDescargar", "POST", { fecha: fecha, producto: clave, opcionTxt: opcionDescarga }, function (data) {
            if (data.d.indexOf("ErrorCATCH") == -1) {
                if (data.d != "" && parseInt(data.d.split('_')[0]) > 0) {
                    __doPostBack('ExportarTxtRegistrosAfectadosValEstruc', nombreArchivo + "," + opcionDescarga);
                    setTimeout(terminarWait, 3000);
                }
                else {
                    Waiting(false, "Espere por favor. Cargando Información...");
                    MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
            }
            else {
                Waiting(false, "Espere por favor. Cargando Información...");
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            }
        });
    }
}

function crearArchivoEstructurasTXT(fecha) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ValidacionesEstructuras.aspx/crearArchivoEstructuras", "POST", { fecha: fecha }, function (data) {
        if (data.d == "") {
            MostrarMsj("Archivo creado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            $("#spanDescargaArchivoShow").hide();
            $("#spanDescargaArchivoHide").show();
        }
        else if (data.d.indexOf("ErrorCATCH") != -1)
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

//------------------------------------------------------BTN CARGAR ETAPA II
function enviarArchivoAsincronamente(obj, tipoArchivo) {

    var fechaReporte = fechaConsulta.split('/')[2] + "/" + fechaConsulta.split('/')[1] + "/" + fechaConsulta.split('/')[0];
    if (!validarExistenciaDeArchivo($(obj).parent().parent().find("input:file"), tipoArchivo)) {
        return false;
    }
    var idFormulario = "";
    var tipoArchivoDeAcuse = "";
    if (tipoArchivo == "2") {
        idFormulario = $(obj).attr("lang").split(',')[0];
        tipoArchivoDeAcuse = $(obj).attr("lang").split(',')[1];
    }
    var idInputFile = $(obj).parent().parent().find("input:file").attr("id");
    var parametros = { 'subirArchivo': 'subirArchivo', 'tipoArchivo': tipoArchivo, 'fechaReporte': fechaReporte,
        'idFormulario': idFormulario, 'tipoArchivoDeAcuse': tipoArchivoDeAcuse
    };
    return ajaxFileUpload(idInputFile, obj, parametros);
}
function validarExistenciaDeArchivo(obj, tipoArchivo) {
    var bandera = false;
    if ($(obj).val() == undefined || $(obj).val() == '' || (tipoArchivo == "1" && $(obj).val().toUpperCase().indexOf('.TXT') == -1) || (tipoArchivo == "2" && $(obj).val().toUpperCase().indexOf('.PDF') == -1)) {
        WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
        MostrarMsj("Debe seleccionar un archivo <span style='font-weight:bold;'>" + (tipoArchivo == "1" ? " .txt" : ".pdf") + " </span>", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () {
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
function ajaxFileUpload(idInputFile, obj, parametros) {
    if (parametros.tipoArchivo == "1")
        Waiting(true, "Espere por favor. Cargando Información...");
    else
        WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
    jQuery.ajaxFileUpload
		    ({
		        url: 'ConsumoNoRevolvente.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaDeArchivo(data, obj, parametros.tipoArchivo, parametros.tipoArchivoDeAcuse, parametros.idFormulario);
		        }
		    });
    return false;
}

function reportarStatusDeSubidaDeArchivo(data, obj, tipoArchivo, tipoArchivoDeAcuse, idFormulario) {
    data = data.toString().replace("<pre>", "").replace("</pre>", "").replace("<PRE>", "").replace("</PRE>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "");
    var entroCerrar = false;
    if (data.indexOf('ArchivoCargado') != -1) {
        $("#divCargaAcuse").dialog("close");
        WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
        MostrarMsj("Archivo cargado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
            if (data.indexOf('ErrorCATCH') == -1 && !entroCerrar) {
                if (tipoArchivoDeAcuse == "2") {
                    $("#spHide_" + idFormulario).css("display", "none");
                    $("#spShow_" + idFormulario).css("display", "inline");
                }
                if (tipoArchivo == "1") {
                    $("#imgReProcesoE1").show();
                    $("#btnProcesar").val("Actualizar");
                    Waiting(true, "Espere por favor. Cargando Información...");
                    peticionAjax("ConsumoNoRevolvente.aspx/actualizarStatusReactivarPaquete", "POST", { fechaReporte: fechaConsulta.split('/')[2] + "/" + fechaConsulta.split('/')[1] + "/" + fechaConsulta.split('/')[0] },
                    function (dataA) {
                        if (dataA.d.indexOf("ERRORCATCH") == -1) {
                        }
                        else MostrarMsj(dataA.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 145, null, null, null);
                        Waiting(false, "Espere por favor. Cargando Información...");
                    }, null);
                }
                entroCerrar = true;
            }
        });

    }
    else if (data.indexOf('ErrorCATCH') != -1) {
        WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
        MostrarMsj(data + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 145, null, function () {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
            Waiting(false, "Espere por favor. Cargando Información...");
        });
    }
    if (tipoArchivo != "1")
        Waiting(false, "Espere por favor. Cargando Información...");
}

var CargoCifras = false;
function cargaCifrasControl(esEventoBoton) {
    if (fechaConsulta == '') {
        MostrarMsj("Debe seleccionar una fecha.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }
    CargoCifras = true;
    if ($("#spStatusEtapa_3").attr("class") != "EstatusGris" || esEventoBoton) {
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("ConsumoNoRevolvente.aspx/obtenerCifrasEtapaIII", "POST", { fechaReporte: fechaConsulta.split('/')[2] + "/" + fechaConsulta.split('/')[1] + "/" + fechaConsulta.split('/')[0],
            /*año: fechaConsulta.split("/")[2], mes: fechaConsulta.split("/")[1], dia: fechaConsulta.split("/")[0] */esCargaIncial: esCargaInicial
        }, function (data) {
            if (data.d.indexOf("ERRORCATCH") == -1) {
                if (data.d != "") {
                    $("#ImgExportarCifrasEtapaIII").show();
                    var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                    $('#divCifrasOficiales').html(creaTablaCifrasControl(JSON, "tbldivCifrasOficiales") /*data.d.split("%%%&&&")[1]*/);
                    $("#tbldivCifrasOficiales").attr("class", "dataGridDatos");
                    JSON = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                    $('#divCifrasControl').html(creaTablaCifrasControl(JSON, "tbldivCifrasControl"));
                    $("#tbldivCifrasControl").attr("class", "dataGridDatos");
                    JSON = obtenerArregloDeJSON(data.d.split("%%&&")[2], false);
                    $('#divDiferencia').html(creaTablaCifrasControl(JSON, "tbldivDiferencia"));
                    $("#tbldivDiferencia").attr("class", "dataGridDatos");
                    JSON = obtenerArregloDeJSON(data.d.split("%%&&")[3], false);
                    $('#divBajas').html(creaTablaCifrasControl(JSON, "tbldivBajas"));
                    $("#tbldivBajas").attr("class", "dataGridDatos");
                    $("#tbldivBajas").css("width", "50%");
                }
                else
                    $("#ImgExportarCifrasEtapaIII").hide();
            }
            else {
                MostrarMsj(data.d.split(':')[1], "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
            aplicarDesabilitarControlesEtapaIV = false;
            if (esCargaInicial)
                esProcesarCifras = true;

            if (esCargaInicial && cargarIncidencias && $("#spStatusEtapa_2").attr("class") != "EstatusGris" && arrayJSONInd[0].FDFechaReporte != undefined && arrayJSONInd[0].FDFechaReporte.split('/')[1] == $("#sltMes").val())
                estructurasAgrupadas();
            else
                obtenerTablaEtapIV();
        });
    }
    else
        Waiting(false, "Espere por favor. Cargando Información...");
}

function descargarExcelCifras() {
    __doPostBack('ExportarExcelCifras', fechaConsulta.split('/')[2] + fechaConsulta.split('/')[1] + fechaConsulta.split('/')[0]);
}

function creaTablaCifrasControl(listaDeJSON, idtabla) {
    var cad = '<div class="divContenidoTabla"><table id="' + idtabla + '" class="dataGridDatos" style="width: 100%;">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados != "clear") {
            cad += '<th style="text-align: center;">';
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
            cad += parseFloat(json[element]).toString() != "NaN" ? ('<td style="text-align:right;">' + DevuelveCantidadSeparadaPorComas(json[element])) : '<td style="text-align:left;">' + json[element];
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div>';
    return cad;
}

// ------------------------------------------------------ETAPA IV

function obtenerTablaEtapIV() {
    peticionAjax("ConsumoNoRevolvente.aspx/obtenerTablaEtapIV", "POST", { fechaReporte: fechaConsulta.split('/')[2] + "/" + fechaConsulta.split('/')[1] + "/" + fechaConsulta.split('/')[0],
        opcion: "1", esCargaInicial: esCargaInicial
    },
    function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var JSON = obtenerArregloDeJSON(data.d, false);
                $("#divPrepararCargaInfoDetalle").html(crearTablaEtapaIV(JSON));
                document.getElementById("divPrepararCargaInfoDetalle").style.height = "auto";
                if (aplicarDesabilitarControlesEtapaIV)
                    bloquearControlesEtapaIV();
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
    peticionAjax("ConsumoNoRevolvente.aspx/obtenerTablaEtapIV", "POST", { fechaReporte: fechaConsulta.split('/')[2] + "/" + fechaConsulta.split('/')[1] + "/" + fechaConsulta.split('/')[0],
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
        setTimeout(CargaIndicadoresIniciales, 2000);
    }, null);
}

function crearTablaEtapaIV(listaDeJSON) {
    var cad = '<center><div ><table class="dataGridDatos" style="width: 90%;">';
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
        ' &nbsp&nbsp<input type="button" value="Cargar Acuse" title="Cargar Acuse" class="classButton" onclick="cargarAcuse(\'' + listaDeJSON[filas].idFormulario + '\',1);"></td>';
        cad += '<td style="text-align:center;"><img class="clsImgPdf" id="imgDescAcuseComp_' + listaDeJSON[filas].idFormulario + '" src="../../Images/Grales/' + (listaDeJSON[filas].Fin == "" ? 'pdfDisabled.png" title="No se ha Cargado Acuse de Revisión Completa" ' : 'pdf.png"  title="Descargar Acuse de Revisión Completada" onclick="descargaArchivoAcuse(\'' + listaDeJSON[filas].idFormulario + '\',2);" ') + ' style="height: 20px;width: 20px;margin-bottom: -7px;cursor:pointer;" >' +
        ' &nbsp&nbsp<input type="button" title="Cargar Acuse Completo" value="Cargar Acuse Completo" class="classButton" onclick="cargarAcuse(\'' + listaDeJSON[filas].idFormulario + '\',2);"></td>';

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
    var parametros = { idFormulario: parseInt(idFormulario), fechaCorte: fechaConsulta.split('/')[2] + "-" + fechaConsulta.split('/')[1] + "-" + fechaConsulta.split('/')[0], Comentario: "", tipoComentario: 2, Opcion: 2 };
    peticionAjax("ConsumoNoRevolvente.aspx/controlComentariosAcuseCNR", "POST", parametros, function (data) {
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
    peticionAjax("ConsumoNoRevolvente.aspx/existeIdJobGenerarPaquete", "POST", { seccion: seccion, producto: omitirAcentos(producto) }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                if (parseInt(data.d) == 0) {
                    $("#img" + seccion + "_EsCargando" + omitirAcentos(producto)).css("display", "inline");
                    var numDescargas = parseInt($("#td_" + $(obj).attr("id").split('_')[0] + "_" + $(obj).attr("id").split('_')[3]).html());
                    $("#td_" + $(obj).attr("id").split('_')[0] + "_" + $(obj).attr("id").split('_')[3]).html(numDescargas + 1);
                    peticionAjax("ConsumoNoRevolvente.aspx/Generar", "POST", { anio: fechaConsulta.split('/')[2], mes: fechaConsulta.split('/')[1], dia: fechaConsulta.split('/')[0], seccion: seccion, producto: omitirAcentos(producto), idFormulario: idFormulario }, function (data) {
                        if (data.d.indexOf("ERRORCATCH") == -1) {
                            if (data.d != "") {
                                //setTimeout(mostrarLoadGenerarArchivo(producto, seccion, true), 2000);
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
                    MostrarMsj("El archivo <span style='font-weight:bold;'>" + fechaConsulta.split('/')[2] + fechaConsulta.split('/')[1] + seccion + omitirAcentos(producto) + ".zip</span> esta en Proceso de Generación.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
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

//function mostrarLoadGenerarArchivo(producto, seccion, esRecursiva) {
//    peticionAjax("ConsumoNoRevolvente.aspx/existeIdJobGenerarPaquete", "POST", { seccion: seccion, producto: omitirAcentos(producto) }, function (data) {
//        if (data.d.indexOf("ERRORCATCH") == -1) {
//            if (data.d != "") {
//                if (parseInt(data.d) == 0)
//                    $("#img" + seccion + "_EsCargando" + producto).css("display", "none");
//                else {
//                    $("#img" + seccion + "_EsCargando" + producto).css("display", "inline");
//                    if (esRecursiva) setTimeout(mostrarLoadGenerarArchivo(producto, seccion, true), 2000);
//                }
//            }
//        }
//        else
//            MostrarMsj(data.d.split(':')[1], "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
//    });
//}

function imgDescargarArchivo_Click(obj, producto, seccion, idFormulario) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ConsumoNoRevolvente.aspx/existeIdJobGenerarPaquete", "POST", { seccion: seccion, producto: omitirAcentos(producto) }, function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                if (parseInt(data.d) == 0)
                    __doPostBack('DescargarZipBXC', fechaConsulta.split('/')[2] + '-' + fechaConsulta.split('/')[1] + '-' + fechaConsulta.split('/')[0] + "_" + seccion + "_" + omitirAcentos(producto) + "_" + idFormulario);
                else
                    MostrarMsj("El archivo <span style='font-weight:bold;'>" + fechaConsulta.split('/')[2] + fechaConsulta.split('/')[1] + seccion + omitirAcentos(producto) + ".zip</span> esta en Proceso de Generación.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
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
            peticionAjax("ConsumoNoRevolvente.aspx/existePaqueteEnReactivacion", "POST",
            { fechaReporte: fechaConsulta.split('/')[2] + "-" + fechaConsulta.split('/')[1] + "-" + fechaConsulta.split('/')[0], opcion: "3", idFormulario: idFormulario }, function (data) {
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
    peticionAjax("ConsumoNoRevolvente.aspx/reactivarPaquete", "POST", { fechaReporte: fechaConsulta.split('/')[2] + "-" + fechaConsulta.split('/')[1] + "-" + fechaConsulta.split('/')[0], opcion: "3", idFormulario: idFormulario, producto: producto.substring(0, 3).toUpperCase() }, function (data) {
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
    for (var i = 0; i < parseInt(lengthJson); i++) {
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

//-- [dbo].[SP_HistorialAcusesRegCNR_Banxico]

//-----------------------------------------CARGAR ACUSES

function cargarAcuse(idFormulario, idTipoArchivoAcuse) {
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

function descargaArchivoAcuse(idFormulario, idTipoArchivo) {
    event.cancelBubble = true;
    window.location.assign("Respuesta.aspx?idFormulario=" + idFormulario + "&&idTipoArchivo=" + idTipoArchivo + "&&fechaCorte=" + fechaConsulta.split('/')[2] + "/" + fechaConsulta.split('/')[1] + "/" + fechaConsulta.split('/')[0])

}