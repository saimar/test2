

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
        daysOfWeekDisabled: "1,2,3,4,5,6",
        changeMonth: true,
        changeYear: true,
        maxDate: -1
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
    $("#txtFechaCorte").datepicker({ beforeShowDay: renderCalendarCallback });
});

var FechaActual = ""; var fechaTempConsultInventario = "";
function loadPageTableroReg() {
    $("#divPieNavegadoresSoportados").hide();
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    $(".periodo").datepicker();
    Waiting(true, "Cargando Información...");
    peticionAjax('TableroRegulatorios.aspx/getFechaActual', "POST", { diario: 3 },
            function (data) {
                if (data.d != "") {
                    FechaActual = data.d;
                    $("#txtFechaCorte").val(FechaActual);
                }
                GetPeriodicidad();
            }, null);
}
var PrimerCarga = true;
function GetPeriodicidad() {
    Waiting(true, "Cargando Información...");
    peticionAjax('TableroRegulatorios.aspx/GetPeriodicidad', "POST", null,
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    var JSON = obtenerArregloDeJSON(data.d, false);
                    for (var i = 0; i < JSON.length; i++) {
                        var Item = JSON[i];
                        var opcion = new Option(Item.descripcion, Item.idPeriodicidad);
                        document.getElementById('sltPeriodicidad').options[document.getElementById('sltPeriodicidad').options.length] = opcion;
                        document.getElementById('sltPeriodicidad').options[document.getElementById('sltPeriodicidad').options.length - 1].title = Item.descripcion;
                    }
                }
                else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                //$("#sltPeriodicidad").val("4");
                if (PrimerCarga) {
                    document.getElementById('sltPeriodicidad').selectedIndex = 2;
                    PrimerCarga = false;
                    var parametros = { PeriocidadSet: $("#sltPeriodicidad").val(), fechaCalMenos: '', fechaCalMas: '', aplicarMenos: false, aplicarMas: false, index: 0, fechaAnteriorMenos: '', arregloFechas: '', fechaswitch: '', fechaActualSelect: '' };
                    peticionAjax("TableroRegulatorios.aspx/GetFechasDatePickerXPeriodo", "POST", parametros,
                          function GetFechasDatePickerXPeriodo_finish(data) {
                              peticionAjax("TableroRegulatorios.aspx/GetFechasNoSelect", "POST", null,
                              function GetFechasNoSelect_finish(data) {
                                  $("#txtFechaCorte").attr("accesskey", data.d.split(":")[1]);
                                  $("#txtFechaCorte").datepicker({ beforeShowDay: renderCalendarCallback });
                                  $("#txtFechaCorte").val(data.d.split(":")[0]);
                                  cargarTablaPrincipal();
                              });
                          }, null);
                }
                cargarTablaPrincipal();
            }, null);
}

var esCargaIncial = true;
var JSONS = null;
function cargarTablaPrincipal() {
    Waiting(true, "Cargando Información...");
    peticionAjax('TableroRegulatorios.aspx/controlPaises', "POST", { idPais: tableroRegulatorio.getPais(), estatusPais: 1, opcion: 1 },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    var JSONP = obtenerArregloDeJSON(data.d, false);
                    peticionAjax('TableroRegulatorios.aspx/controlSegmentos', "POST", { descSegmento: "", opcion: 1 },
                    function (dataS) {
                        if (dataS.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                            JSONS = obtenerArregloDeJSON(dataS.d, false);
                            $("#divTblPrincipalMonReg").html(creaTablaPrincipal(JSONP, JSONS));
                            tableroRegulatorio.setWidth();
                            reSizedivTblPrincipalMonRegYReacomodoDiagonal();
                        }
                        else MostrarMsj(dataS.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    }, null);
                }
                else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                CargarEstatusSegmentos();
            }, null);
}


function creaTablaPrincipal(JSONP, JSONS) {

    var cad = '<table id="tblHome" class="dataGridDatos" style="width:98%;">';
    cad += '<thead>';
    cad += '<tr>';
    cad += '<th id="thDivision" style="text-align: center; width: 11%; font-size: 11px; text-shadow: 2px 2px 2px gray;color: White; font-weight: bold; height: 74px;">';
    cad +=
    " <div style='display:inline-block;background-size:100% 100%;width: 100%;height: 100%;'>" +
    "<div id='dvDiagonal' style='width: 1px;height: 100px;background-color: White;-ms-transform: rotate(140deg); position: absolute;margin-top: -12px;margin-left: 62px;/* IE 9 */ -webkit-transform: rotate(140deg); /* Chrome, Safari, Opera */transform: rotate(140deg);'></div>" +
    "<TABLE style='width: 100%;'><TR><TD width='50%'>&nbsp;</TD><TD width='50%' style='height: 35px;' title='Clic para Agregar País' onclick='imgAgregarPais_Click();'>País</br><img class='imgCrecer' src='../../Images/Regulatorios/Monitoreo Reg/addFlag.png' /></TD></TR>";
    cad += "<TR><TD width='50%' style='height: 35px;' title='Clic para Agregar Segmento' onclick='imgAgregarSegmento_Click();'>Segmento</br><img class='imgCrecer' src='../../Images/Regulatorios/Monitoreo Reg/addSeg.png'  /></TD><TD width='50%'>&nbsp;</TD></TR></TABLE> </div>";
    cad += '</th>';
    var escribeArray = (arrayPaises.length > 0) ? true : false;
    for (var i = 0; i < JSONP.length; i++) {
        if (JSONP[i] != null) {
            cad += '<th title="Clic para Ver Segmentos y Resumen de Envíos(' + JSONP[i].descPais + ')" style="cursor: pointer; height: 74px;" onclick="muestraResumenYSegmentoEnvio_Click(\'' + JSONP[i].idPais + '\',\'' + JSONP[i].descPais + '\',\'' + i + '\',true);">';
            cad += '<center><img class="logoBanderaMonitRegulatorios" src="../../Images/PanelDeControl/BanderasRect/' + omitirAcentos(replaceAll(JSONP[i].descPais.toLowerCase(), " ", "")) + '.gif" /></center>';
            cad += '<input id="hidden_' + JSONP[i].idPais + '" type="hidden" />';
            cad += '</th>';

            if (!escribeArray)
                arrayPaises.push(JSONP[i].idPais);
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';

    for (var i = 0; i < JSONS.length; i++) {
        cad += '<tr style="height: 40px;">';
        cad += '<td style="font-weight: bold; font-size: 11px; text-align: left; background: rgba(0, 134, 120, 0.94); color: White;" id="td_' + JSONS[i].FIIdSegmento + '">';
        cad += ' &nbsp' + JSONS[i].FVCDescripcion + ' </td>';

        for (var ii = 0; ii < JSONP.length; ii++)
            if (JSONP[ii] != null)
                cad += '<td id="td_' + JSONS[i].FIIdSegmento + '_' + JSONP[ii].idPais + '"> <div class="BarraGris" style="width:100%;height: 36px;"><div class="BarraBlanco" style="width:100%;height: 36px;"></div><div class="texto"></div></div></td>';
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table>';
    return cad;
}




function reSizedivTblPrincipalMonRegYReacomodoDiagonal(esEventoBtnRegresar) {
    var domtblHome = document.getElementById("tblHome");
    if (domtblHome) {

        if (document.getElementById("divTblPrincipalMonReg") != null && parseInt(document.getElementById("divtitulo").offsetHeight)) {
            var tamanioTotal = (parseInt(document.getElementById("divTituloMR").offsetHeight) + parseInt(document.getElementById("divtitulo").offsetHeight) + parseInt(document.getElementById("divTblPrincipalMonReg").offsetHeight))
            if (tamanioTotal >= parseInt(document.documentElement.clientHeight) - 170)
                document.getElementById("divTblPrincipalMonReg").style.height = (parseInt(document.documentElement.clientHeight) - parseInt(document.getElementById("divHeader").offsetHeight) - 150) + "px";
            else if (parseInt(domtblHome.offsetHeight) > 0)
                document.getElementById("divTblPrincipalMonReg").style.height = parseInt(document.getElementById("tblHome").offsetHeight) + 20 + "px";
        }
        document.getElementById("divTblPrincipalMonReg") != null ? document.getElementById("divTblPrincipalMonReg").style.width = (document.documentElement.clientWidth - 20) + "px" : null;
        if (document.getElementById("dvDiagonal") != null && esEventoBtnRegresar == undefined) {
            var widtdDiv = parseInt($("#thDivision").width().toString().indexOf('-') != -1 ? replaceAll($("#thDivision").width().toString(), "-", "") : $("#thDivision").width());
            $("#dvDiagonal").css("margin-left", (widtdDiv / 2 + 10) + "px");
        }
    }
}

//--------------------------------- AGREGAR PAIS
function imgAgregarPais_Click() {
    var cadena = '<div id="divBloqVtnAgregarPais" style="width:94%;height:77%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:58%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbl" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">  ';
    cadena += '<div style="text-align: center;height: 100%;"> <table width="100%"> <tr><td style="width: 100%; text-align: center"> <b>Seleccione el País a Agregar</b> </td></tr><tr style="height:5px"></tr>';
    cadena += '<tr><td style="text-align: center"><select id="sltPaises" > </select> </td> </tr><tr style="height:5px"></tr></table></div>';
    cadena += '</div></div>';
    cadena += "<table style='width:90%;height:8%;margin-left: 29px;'><tr style='height:1%'></tr><tr><td style='text-align:left'></td><td style='text-align:right'><input type='button' id='btnAgregarPais' onclick='btnAgregarPais_Click();' class='classButton'  value='Agregar'/></td>";

    $("#dvAgregarPais").empty();
    AgregarVtnFlotante("dvAgregarPais", "", "AGREGAR PAÍS", "", cadena, 150, 300, false, false, "", "", null);
    WaitingVtn("divBloqVtnAgregarPais", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax('TableroRegulatorios.aspx/controlPaises', "POST", { idPais: 0, estatusPais: 0, opcion: 1 },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSON(data.d, false);
                        for (var i = 0; i < JSON.length; i++) {
                            var opt = document.createElement('option');
                            opt.value = JSON[i].idPais;
                            opt.innerHTML = JSON[i].descPais;
                            document.getElementById('sltPaises').appendChild(opt);
                        }
                    }
                    else {
                        $("#dvAgregarPais").dialog("close");
                        MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    }
                }
                else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                WaitingVtn("divBloqVtnAgregarPais", false, false, "Cargando Información...");
            }, null);
}

function btnAgregarPais_Click() {
    WaitingVtn("divBloqVtnAgregarPais", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax('TableroRegulatorios.aspx/controlPaises', "POST", { idPais: $("#sltPaises").val(), estatusPais: 1, opcion: 2 },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    $("#dvAgregarPais").dialog("close");
                    MostrarMsj("País agregado exitosamente.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    cargarTablaPrincipal();
                }
                else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                WaitingVtn("divBloqVtnAgregarPais", false, false, "Cargando Información...");
            }, null);
}

//--------------------------------- AGREGAR SEGMENTO
function imgAgregarSegmento_Click() {
    var cadena = '<div id="divBloqVtnAgregarSegmento" style="width:94%;height:77%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:58%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbl" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">  ';
    cadena += '<div style="text-align: center;height: 100%;"> <table width="100%"> <tr><td style="width: 100%; text-align: center"> <b>Ingrese la Descripción del Segmento a Agregar</b> </td></tr><tr style="height:5px"></tr>';
    cadena += '<tr><td style="text-align: center"><input type="text" id="txtDescripcionSeg" style="width:150px"/></td> </tr><tr style="height:5px"></tr></table></div>';
    cadena += '</div></div>';
    cadena += "<table style='width:90%;height:8%;margin-left: 29px;'><tr style='height:1%'></tr><tr><td style='text-align:left'></td><td style='text-align:right'><input type='button' id='btnAgregarSegmento' onclick='btnAgregarSegmento_Click();' class='classButton'  value='Agregar'/></td>";
    $("#dvAgregarPais").empty();
    AgregarVtnFlotante("dvAgregarPais", "", "AGREGAR SEGMENTO", "", cadena, 150, 300, false, false, "", "", null);
}

function btnAgregarSegmento_Click() {
    if ($("#txtDescripcionSeg").val().trim() != "") {
        WaitingVtn("divBloqVtnAgregarSegmento", true, true, "Cargando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "8%";
        peticionAjax('TableroRegulatorios.aspx/controlSegmentos', "POST", { descSegmento: $("#txtDescripcionSeg").val(), opcion: 2 },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSON(data.d, false);
                        MostrarMsj("Existe un Segmento con la Descripción <span style='font-weight:bold;'>" + JSON[0].FVCDescripcion + "</span>", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                            WaitingVtn("divBloqVtnAgregarSegmento", false, false, "Cargando Información...");
                        });
                    }
                    else {
                        peticionAjax('TableroRegulatorios.aspx/controlSegmentos', "POST", { descSegmento: $("#txtDescripcionSeg").val(), opcion: 3 },
                        function (dataAdd) {
                            if (dataAdd.d != null && dataAdd.d.indexOf("ERRORCATCH") == -1) {
                                if (dataAdd.d == "") {
                                    $("#dvAgregarPais").dialog("close");
                                    MostrarMsj("Segmento agregado exitosamente.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                                    cargarTablaPrincipal();
                                }
                            }
                            else {
                                WaitingVtn("divBloqVtnAgregarPais", false, false, "Cargando Información...");
                                $("#dvAgregarPais").dialog("close");
                                MostrarMsj(dataAdd.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                            }
                        }, null);
                    }
                }
                else {
                    WaitingVtn("divBloqVtnAgregarPais", false, false, "Cargando Información...");
                    $("#dvAgregarPais").dialog("close");
                    MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
            }, null);
    }
    else {
        WaitingVtn("divBloqVtnAgregarSegmento", true, false, "Cargando Información...");
        MostrarMsj("Ingrese la Descripción del Segmento a Agregar", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnAgregarSegmento", false, false, "Cargando Información...");
        });
    }
}

//--------------------------------- AGREGAR REPORTE 
function btnAgregarReporte_Clic() {
    var cadena = '<div id="divBloqVtnAgregarReporte" style="width:94%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:79%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbl" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">  ';
    cadena += '<div style="text-align: center;height: 100%;"> <table width="100%"> <tr style="height:5px"></tr>';
    cadena += '<tr><td style="text-align: left;">Abreviación</td><td style="text-align: left"><input type="text" id="txtAbreviacion" style="width:180px;font-size: 10px;"/></td> </tr>' +
    '<tr><td style="text-align: left;">Serie</td><td style="text-align: left"><input type="text" id="txtSerie" style="width:180px;font-size: 10px;"/></td> </tr>' +
    '<tr><td style="text-align: left;">Descripción</td><td style="text-align: left"><textarea cols="30" rows="2" id="txtDescripcion" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:182px; text-align:left; border: xx;height:25px"></textarea></td> </tr>' +
    '<tr><td style="text-align: left;">Segmento</td><td style="text-align: left"><select id="sltSegmentoAddRep" style="width:184px;font-size: 10px;"></select></td> </tr>' +
    '<tr><td style="text-align: left;">Periodicidad</td><td style="text-align: left"><select id="sltPeriodicidadAddRep" style="width:184px;font-size: 10px;" disabled="disabled"></select></td> </tr>' +
    '<tr><td style="text-align: left;">País</td><td style="text-align: left"><input type="text" id="txtPaisAddRep" style="width:180px;font-size: 10px;" disabled="disabled"/></td> </tr>' +
    '<tr><td style="text-align: left;">Tipo Información</td><td style="text-align: left"><select id="sltTipoInformacion" style="width:184px;font-size: 10px;"></select></td> </tr>' +
    '<tr><td style="text-align: left;">Tipo Reporte</td><td style="text-align: left"><select id="sltTipoReporte" style="width:184px;font-size: 10px;"></select></td> </tr>'
    + '<tr style="height:5px"></tr></table></div>';
    cadena += '</div></div>';
    cadena += "<table style='width:90%;height:8%;margin-left: 29px;'><tr style='height:1%'></tr><tr><td style='text-align:left'></td><td style='text-align:right'><input type='button' id='btnAgregarSegmento' onclick='btnVtnAgregarReporte_Click();' class='classButton'  value='Agregar'/></td>";
    $("#dvAgregarPais").empty();
    AgregarVtnFlotante("dvAgregarPais", "", "AGREGAR REPORTE", "", cadena, 270, 300, false, false, "", "", null);
    for (var i = 0; i < JSONS.length; i++) {
        var Item = JSONS[i];
        var opcion = new Option(Item.FVCDescripcion, Item.FIIdSegmento);
        document.getElementById('sltSegmentoAddRep').options[document.getElementById('sltSegmentoAddRep').options.length] = opcion;
        document.getElementById('sltSegmentoAddRep').options[document.getElementById('sltSegmentoAddRep').options.length - 1].title = Item.FVCDescripcion;
    }
    $('#sltPeriodicidad option:selected').clone().appendTo("#sltPeriodicidadAddRep");
    $("#sltPeriodicidadAddRep").val($("#sltPeriodicidad").val());
    $("#txtPaisAddRep").val($("#th_" + $("#tblDetallePais").find("input:hidden").attr("id").split("_")[1]).attr("title"));
    $("#txtPaisAddRep").attr("lang", $("#tblDetallePais").find("input:hidden").attr("id").split("_")[1]);

    WaitingVtn("divBloqVtnAgregarReporte", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax('TableroRegulatorios.aspx/controlReportes', "POST", {
        abreviacion: "", serie: "", descripcion: "", idSegmento: 0,
        idPeriodicidad: 0, idPais: 0, idTipoInf: 0, TipoReporte: "", opcion: 1
    },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        for (var i = 0; i < JSON.length; i++) {
                            var Item = JSON[i];
                            var opcion = new Option(Item.descrip, Item.idTipoInf);
                            document.getElementById('sltTipoInformacion').options[document.getElementById('sltTipoInformacion').options.length] = opcion;
                            document.getElementById('sltTipoInformacion').options[document.getElementById('sltTipoInformacion').options.length - 1].title = Item.descrip;
                        }
                        JSON = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                        for (var i = 0; i < JSON.length; i++) {
                            var Item = JSON[i];
                            var opcion = new Option(Item.tipoReporte, Item.tipoReporte);
                            document.getElementById('sltTipoReporte').options[document.getElementById('sltTipoReporte').options.length] = opcion;
                            document.getElementById('sltTipoReporte').options[document.getElementById('sltTipoReporte').options.length - 1].title = Item.tipoReporte;
                        }
                        WaitingVtn("divBloqVtnAgregarReporte", false, false, "Cargando Información...");
                    }
                    else {
                        WaitingVtn("divBloqVtnAgregarReporte", false, false, "Cargando Información...");
                        $("#dvAgregarPais").dialog("close");
                        MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    }
                }
                else {
                    WaitingVtn("divBloqVtnAgregarReporte", false, false, "Cargando Información...");
                    $("#dvAgregarPais").dialog("close");
                    MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
            }, null);
}

function btnVtnAgregarReporte_Click() {
    document.getElementById("txtAbreviacion").style.border = "1px solid Gray";
    document.getElementById("txtSerie").style.border = "1px solid Gray";
    document.getElementById("txtDescripcion").style.border = "1px solid Gray";

    if (!validaCampovacio("txtAbreviacion") && !validaCampovacio("txtSerie") && !validaCampovacio("txtDescripcion")) {
        WaitingVtn("divBloqVtnAgregarReporte", true, true, "Cargando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "10%";
        peticionAjax('TableroRegulatorios.aspx/controlReportes', "POST", {
            abreviacion: $("#txtAbreviacion").val(), serie: $("#txtSerie").val(),
            descripcion: $("#txtDescripcion").val(), idSegmento: $("#sltSegmentoAddRep").val(), idPeriodicidad: $("#sltPeriodicidadAddRep").val(),
            idPais: $("#txtPaisAddRep").attr("lang"), idTipoInf: $("#sltTipoInformacion").val(), TipoReporte: $("#sltTipoReporte").val(), opcion: 2
        },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d == "") {
                        $("#dvAgregarPais").dialog("close");
                        MostrarMsj("Reporte agregado exitosamente.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                        cargarTablaPrincipal();
                    }
                }
                else {
                    WaitingVtn("divBloqVtnAgregarReporte", true, false, "Cargando Información...");
                    MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 150, null, null, null);
                    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                        WaitingVtn("divBloqVtnAgregarReporte", false, false, "Cargando Información...");
                    });
                }
            }, null);
    }
    else {
        WaitingVtn("divBloqVtnAgregarReporte", true, false, "Cargando Información...");
        MostrarMsj("Ingrese el campo Solicitado.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnAgregarReporte", false, false, "Cargando Información...");
        });
    }
}

var arrayPaises = new Array(); 
function CargarEstatusSegmentos(event, obj, esEventoCombo, esBtnRegresarInventario) {
    //console.log("LogEnCargaEstatusSegmentos:sltPeriodicidad:" + $("#sltPeriodicidad").val());
    //cargarTablaPrincipal();html(creaTablaPrincipal(JSONP, JSONS));
    //$("#divTblPrincipalMonReg").html(creaTablaPrincipal('', JSONS));
    if ((event == undefined && obj == undefined) || changeFormatoFecha(event, obj) && $(obj).attr("lang") == "aa") {
        if (event != undefined && obj != undefined && !changeFormatoFecha(event, obj))
        { MostrarMsj("Fecha Invalida", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null); return }

        $(obj).attr("lang", "ab");
        Waiting(true, "Cargando Información...");

        if (esEventoCombo) {
            if ($("#sltPeriodicidad").val() != "1" && $("#sltPeriodicidad").val() != "6") {
                FechaActual = tableroRegulatorio.getFechaActual('1');
                $("#txtFechaCorte").val(FechaActual);
            }
            // console.log("LogEnCargaEstatusSegmentos:txtFechaCorte:" + $("#txtFechaCorte").val());
            //if ($("#sltPeriodicidad").val() != "1" && $("#sltPeriodicidad").val() != "6") {
            var parametros = { PeriocidadSet: $("#sltPeriodicidad").val(), fechaCalMenos: '', fechaCalMas: '', aplicarMenos: false, aplicarMas: false, index: 0, fechaAnteriorMenos: '', arregloFechas: '', fechaswitch: '', fechaActualSelect: '' };
            peticionAjax("TableroRegulatorios.aspx/GetFechasDatePickerXPeriodo", "POST", parametros,
                  function GetFechasDatePickerXPeriodo_finish(data) {
                      peticionAjax("TableroRegulatorios.aspx/GetFechasNoSelect", "POST", null,
                      function GetFechasNoSelect_finish(data) {
                          $("#txtFechaCorte").attr("accesskey", data.d.split(":")[1]);
                          $("#txtFechaCorte").datepicker({ beforeShowDay: renderCalendarCallback });
                          $("#txtFechaCorte").val(data.d.split(":")[0]);
                          //  console.log("revisa variables1:" + $("#txtFechaCorte").val());
                          cargarTablaPrincipal();
                      });
                  }, null);
            /*}
            else {
                //$("#txtFechaCorte").val(FechaActual);
                peticionAjax('TableroRegulatorios.aspx/getFechaActual', "POST", { diario: 1 },
                            function (data) {
                                if (data.d != "") {
                                    FechaActual = data.d;
                                    $("#txtFechaCorte").val(FechaActual);
                                }
                                // GetPeriodicidad();
                            }, null);
            }*/
        } else {

            //console.log("revisa variables2:" + $("#txtFechaCorte").val());
            if ($("#divTablaInventarios").css("display") != "none" && esBtnRegresarInventario == undefined)
                btnVerInventario_Click('0', true);
            else {

                for (var i = 0; i < arrayPaises.length; i++) {
                    for (var ii = 0; ii < 9; ii++)
                        $("#td_" + ii + "_" + arrayPaises[i]).attr("class", "EstatusGris");
                    $("#hidden_" + arrayPaises[i]).val("0,0,0,0");
                }

                peticionAjax('TableroRegulatorios.aspx/GetIndicadores', "POST", { idPeriodicidad: $("#sltPeriodicidad").val(), fechaCorte: $("#txtFechaCorte").val().split('/')[2] + $("#txtFechaCorte").val().split('/')[1] + $("#txtFechaCorte").val().split('/')[0], idPais: tableroRegulatorio.getPais() },
                function (data) {
                    if (data.d.indexOf("ERRORCATCH") == -1) {
                        if (data.d != "") {
                            var JSON = obtenerArregloDeJSON(data.d, false);

                            for (var i = 0; i < arrayPaises.length; i++) {
                                var arregloIndicadoresTemp = new Array();
                                var valorPaisAgregado = "";
                                for (var ii = 0; ii < JSON.length; ii++) {
                                    if (arrayPaises[i] == JSON[ii].idPais) {
                                        arregloIndicadoresTemp.push(JSON[ii]);
                                        valorPaisAgregado = arrayPaises[i];
                                    }
                                    if (valorPaisAgregado != "" && valorPaisAgregado != JSON[ii].idPais)
                                        break;
                                }


                                var numRepPeriodo = 0; var numRepEnviados = 0; var numRepEnAtraso = 0; var numRepNoEntragados = 0;

                                if (arregloIndicadoresTemp.length > 0) {

                                    numRepPeriodo = arregloIndicadoresTemp.length;
                                    var segmento = arregloIndicadoresTemp[0].idSegmento;
                                    var idEstatus = parseInt(arregloIndicadoresTemp[0].idEstatus);
                                    var porcentaje = parseInt(arregloIndicadoresTemp[0].Porcentaje).toString();
                                    /*
                                    for (var zz = arregloIndicadoresTemp.length; zz--;) {
                                        console.log("Arrtmp:" + arregloIndicadoresTemp[zz].idPais + "-" + arregloIndicadoresTemp[zz].idSegmento + "-" + parseInt(arregloIndicadoresTemp[zz].idEstatus) + "-" + parseInt(arregloIndicadoresTemp[zz].Porcentaje).toString());
                                    }
                                    */

                                    var ColorStatus = DeterminaEstatusMAX(arregloIndicadoresTemp, segmento);

                                    numRepEnviados = numRepEnviados + (idEstatus == 3 ? 1 : 0);
                                    numRepEnAtraso = numRepEnAtraso + (idEstatus == 4 ? 1 : 0);
                                    numRepNoEntragados = numRepNoEntragados + (idEstatus == 8 ? 1 : 0);

                                    for (var ii = 1; ii < arregloIndicadoresTemp.length; ii++) {
                                        numRepEnviados = numRepEnviados + (arregloIndicadoresTemp[ii].idEstatus == 3 ? 1 : 0);
                                        numRepEnAtraso = numRepEnAtraso + (arregloIndicadoresTemp[ii].idEstatus == 4 ? 1 : 0);
                                        numRepNoEntragados = numRepNoEntragados + (arregloIndicadoresTemp[ii].idEstatus == 8 ? 1 : 0);

                                        if (segmento == arregloIndicadoresTemp[ii].idSegmento) {
                                            porcentaje = arregloIndicadoresTemp[ii].Porcentaje;
                                        }
                                        else {
                                            $("#td_" + segmento + "_" + arrayPaises[i] + " > div > div")[1].innerHTML = porcentaje.replace(".00", "") == "0" ? "0.00%" : porcentaje + "%";
                                            $("#td_" + segmento + "_" + arrayPaises[i] + " > div > div")[0].style.width = porcentaje.replace(".00", "") == "0" ? "100%" : porcentaje.toString().replace(".00", "") + "%";
                                            $("#td_" + segmento + "_" + arrayPaises[i] + " > div > div")[0].className = ColorStatus;
                                            segmento = arregloIndicadoresTemp[ii].idSegmento;
                                            porcentaje = arregloIndicadoresTemp[ii].Porcentaje;

                                            ColorStatus = DeterminaEstatusMAX(arregloIndicadoresTemp, segmento);
                                        }
                                        if (ii == arregloIndicadoresTemp.length - 1) {
                                            var elemento_x = $("#td_" + segmento + "_" + arrayPaises[i]).id;
                                            $("#td_" + segmento + "_" + arrayPaises[i] + " > div > div")[1].innerHTML = porcentaje.replace(".00", "") == "0" ? "0.00%" : porcentaje + "%";
                                            $("#td_" + segmento + "_" + arrayPaises[i] + " > div > div")[0].style.width = porcentaje.replace(".00", "") == "0" ? "100%" : porcentaje.toString().replace(".00", "") + "%";
                                            $("#td_" + segmento + "_" + arrayPaises[i] + " > div > div")[0].className = ColorStatus;
                                        }
                                    }

                                    if (0 == arregloIndicadoresTemp.length - 1) {
                                        $("#td_" + segmento + "_" + arrayPaises[i] + " > div > div")[1].innerHTML = porcentaje.replace(".00", "") == "0" ? "0.00%" : porcentaje + "%";
                                        $("#td_" + segmento + "_" + arrayPaises[i] + " > div > div")[0].style.width = porcentaje.replace(".00", "") == "0" ? "100%" : porcentaje.toString().replace(".00", "") + "%";
                                        $("#td_" + segmento + "_" + arrayPaises[i] + " > div > div")[0].className = ColorStatus;
                                    }

                                }
                                $("#hidden_" + arrayPaises[i]).val(numRepPeriodo + "," + numRepEnviados + "," + numRepEnAtraso + "," + numRepNoEntragados);
                            }
                        }
                    }
                    else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    if (document.getElementById("divResumenYSegmentoEnvio").style.display != "none")
                        muestraResumenYSegmentoEnvio_Click(idPais2daVtn, definicionPais2daVtn, posicion2daVtn, false);
                    Waiting(false, "Cargando Información...");
                    esCargaIncial = false;
                    $(obj).attr("lang", "aa");
                }, null);
            }
        }

    }


}




function replacer(srt, p1, p2, offset, s) {
    return str + " - " + p1 + "," + p2;
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
    if (($.inArray(dmy, $("#txtFechaCorte").attr("accesskey").split(",")) != -1 /*&& (periocidadSelectXUser == "1" || periocidadSelectXUser == "2")*/) || $("#sltPeriodicidad").val() == "1" || $("#sltPeriodicidad").val() == "6" || $("#sltPeriodicidad").css("display") == "none") {
        return [true, "", ""];
    } else {
        return [false, "", ""];
    }
}

var idPais2daVtn, definicionPais2daVtn, posicion2daVtn;
function muestraResumenYSegmentoEnvio_Click(idPais, definicionPais, posicion, esEventoClick) {
     if (esEventoClick) {
        idPais2daVtn = idPais;
        definicionPais2daVtn = definicionPais;
        posicion2daVtn = posicion;
     }
   //  var ArayIndicador = ObtenerIndicadores();

    posicion = parseInt(posicion) + 1;
    var cad = '<table id="tblDetallePais" class="dataGridDatos" style="width: 100%;"><thead>';
    for (var i = 0; i < $('#tblHome >tbody >tr').length; i++) {
        if (i == 0) {
            cad += ' <tr><th style="text-align: center; width: 11%;font-size:11px;color: White">Segmento/País </th>';
            cad += ' <th id="th_' + idPais + '" title="' + definicionPais + '">' + $('#tblHome tr')[i].cells[posicion].innerHTML + ' </th> </tr></thead>';
        }
        cad += ' <tr style="height: 35px;"><td lang="aa" title="Ver Contenido Reportes Regulatorios y Estatus" style="font-weight: bold;text-shadow: 2px 1px 1px Gray;color: White;cursor:pointer;text-align:left;font-size:11px;;background: rgba(0, 134, 120, 0.94)" ' +
                    'onclick="VercontendioReportesRegYEstatus(\'' + idPais + '\',\'' + $('#tblHome >tbody >tr')[i].cells[0].id.split('_')[1] + '\',\'' + $('#tblHome >tbody >tr')[i].cells[0].textContent.replace(new RegExp('\n', 'g'), '') + '\',this)">'
                     + '<img id="Img_' + $('#tblHome >tbody >tr')[i].cells[0].id.split('_')[1] + '" src="../../Images/Portafolio/Capbasviv/flechaDerecha.png" style="vertical-align:middle;width:9px;height:9px;margin-left: 4px;">'
                    + $('#tblHome >tbody >tr')[i].cells[0].textContent + '</td>';

        cad += ' <td >'
            + '<div class="BarraGris" style="width:100%;height: 36px;">'
            + '<div class="' + $('#tblHome >tbody >tr')[i].cells[posicion].children[0].children[0].className + '" style="width:' + $('#tblHome >tbody >tr')[i].cells[posicion].children[0].children[0].style.width + ';height: 36px;"></div>'
            + '<div class="texto">' + $('#tblHome >tbody >tr')[i].cells[posicion].children[0].children[1].innerHTML + '</div>'
            + '</div>'
            + '</td></tr>'
            + '<tr ><td colspan="2" id="tdExpCollap_' + $('#tblHome >tbody >tr')[i].cells[0].id.split('_')[1] + '" style="display:none"></td></tr>';

        //cad += ' <td><progress value="22" max="100" width="100%"/> </td></tr>'
        //    + '<tr ><td colspan="2" id="tdExpCollap_' + $('#tblHome >tbody >tr')[i].cells[0].id.split('_')[1] + '" style="display:none"></td></tr>';

    }
    cad += '</table>';
    $("#divTblDatosPaisSelect").html(cad);
    $("#divHome").slideUp('slide');
    $("#divResumenYSegmentoEnvio").slideDown('slide');

    //    $("#tdDato1").html(Math.floor((Math.random() * 200) + 1));
    //    $("#tdDato2").html(Math.floor((Math.random() * 200) + 1));
    //    $("#tdDato3").html(Math.floor((Math.random() * 50) + 1));
    //    $("#tdDato4").html(Math.floor((Math.random() * 10) + 1));
    $("#tdDato1").html($("#hidden_" + idPais).val().split(',')[0]);
    $("#tdDato2").html($("#hidden_" + idPais).val().split(',')[1]);
    $("#tdDato3").html($("#hidden_" + idPais).val().split(',')[2]);
    $("#tdDato4").html($("#hidden_" + idPais).val().split(',')[3]);
    var colors = Highcharts.getOptions().colors;
    crearGrafica(['Reportes del Periodo', 'Reportes Enviados', 'Reportes en Atraso', 'Reportes no Entregados'],
             [{ y: parseFloat($("#tdDato1").html()), color: colors[1] }, { y: parseFloat($("#tdDato2").html()), color: colors[2] },
             { y: parseFloat($("#tdDato3").html()), color: colors[3] }, { y: parseFloat($("#tdDato4").html()), color: colors[4] }])
}

function VercontendioReportesRegYEstatus(idPais, idSegmento, definicionSegmento, obj) {
    //$("#divResumenYSegmentoEnvio").slideUp('slide');
    //$("#divVerContenidoReportesRegYEstatus").slideDown('slide');

    if ($(obj).attr("lang") == "aa") {
        $("#tdExpCollap_" + idSegmento).show();
        document.getElementById("Img_" + idSegmento).setAttribute("src", "../../Images/Portafolio/Capbasviv/flechaOrder.png");
        Waiting(true, "Cargando Información...");
        peticionAjax('TableroRegulatorios.aspx/GetReportesXSegmento', "POST", { idSegmento: idSegmento, idPeriodicidad: $("#sltPeriodicidad").val(), idPais: idPais, fechaCorte: $("#txtFechaCorte").val().split('/')[2] + "" + $("#txtFechaCorte").val().split('/')[1] + "" + $("#txtFechaCorte").val().split('/')[0] },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    var JSON = obtenerArregloDeJSON(data.d, false);
                    $("#tdExpCollap_" + idSegmento).html(generarTablaVerReportesRegEstatus(JSON, definicionSegmento, idPais, idSegmento));
                }
                else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                $(obj).attr("lang", "ab")
                setTimeout(terminarWait, 600);
            }, null);
    }
    else {
        $("#tdExpCollap_" + idSegmento).hide();
        document.getElementById("Img_" + idSegmento).setAttribute("src", "../../Images/Portafolio/Capbasviv/flechaDerecha.png");
        $(obj).attr("lang", "aa")
    }
}


function generarTablaVerReportesRegEstatus(listaDeJSON, defSegmento, idPais, idSegmento) {
    var cad = '<div  style="width:auto;"><table id="tblDatosRepReg"  style="width: 100%;" class="dataGridDatos">';
    //cad += '<thead><tr style="text-align:left;"><th style="text-align: center;" colspan="4">' + defSegmento + '</th></tr>';
    if (listaDeJSON[0] == null) {
        cad += '<tr><td style="text-align:center;">Sin Reportes</td></tr></table>';
        return cad;
    }
    cad += '<thead><tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    for (var encabezados in auxJSON) {
        if (encabezados != "FIIdReporte" && encabezados != "FINumRecarga" && encabezados != "SegAvg") {
            var width = 0;
            width = encabezados == "Serie" ? 15 : width;
            width = encabezados == "Reporte" ? 80 : width;
            width = encabezados == "Estatus" ? 5 : width;
            cad += '<th style="text-align: center;width:' + width + '%' + '">';
            cad += (encabezados == "FVCComentario" ? "Comentario" : encabezados.toString());
            cad += '</th>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += ((filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + ' onclick="mostrarFichaTecnica(\'' + idPais + '\',\'' + idSegmento + '\',\'' + listaDeJSON[filas].FIIdReporte + '\',\'' + listaDeJSON[filas].Serie + '\',\'' + $("#sltPeriodicidad").val() + '\',\'' + listaDeJSON[filas].FINumRecarga + '\');"  title="Clic para Ver Ficha Técnica" style="cursor:pointer;" >';
        var json = listaDeJSON[filas];

        cad += '      <td colspan=3">';
        cad += '           <div id="dZUpload' + omitirAcentos(replaceAll(listaDeJSON[filas].Serie, " ", "")) + '" class="dropzone" style="height:100%;" >';
        cad += '               <div class="dz-default dz-message" style="height:100%;">';
        cad += '                    <table cellpadding="0" cellspacing="0" style="height:100%; width: 100%;" border="0" >';
        cad += '                         <tr>';

        for (var element in json) {
            if (element != 'FINumRecarga') {
                switch (element) {
                    case "Estatus": cad += '        <td id="' + omitirAcentos(replaceAll(listaDeJSON[filas].Serie, " ", "")) + "&" + listaDeJSON[filas].FIIdReporte + "_" + idPais + '" style="text-align: center; width: 5%;"> <span id="span' + listaDeJSON[filas].Serie + '" class="' + DeterminaEstatusDeReporteXId(json[element]) + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></td>'; break;
                    case "Reporte": cad += '        <td id="' + omitirAcentos(replaceAll(listaDeJSON[filas].Serie, " ", "")) + "&" + listaDeJSON[filas].FIIdReporte + "_" + idPais + '" style="text-align:left;white-space: normal; width: 80%;">' + json[element] + '</td>'; break;
                        //case "Serie": cad += '          <td id="' + listaDeJSON[filas].Serie.replace(/ /g, "_") + "&" + listaDeJSON[filas].FIIdReporte + "_" + idPais + '" style="text-align:left;white-space: normal;  width: 15%;">' + json[element]; break;
                    case "Serie": cad += '          <td id="' + omitirAcentos(replaceAll(listaDeJSON[filas].Serie, " ", "")) + "&" + listaDeJSON[filas].FIIdReporte + "_" + idPais + '" style="text-align:left;white-space: normal;  width: 15%;">' + json[element] + '</td>'; break;
                        
                }
            }
        }
        cad += '                          </tr>';
        cad += '                    </table>';
        cad += '                </div>';
        cad += '           </div>';
        cad += '      </td>';
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div>';


    //cad += ' <script type="text/javascript">';
    //cad += ' Dropzone.autoDiscover = false;';

    //for (var filas = 0; filas < listaDeJSON.length; filas++) {
    //    cad += ' $(document).ready(function () {';
    //    cad += '    $("#dZUpload' + filas + '").dropzone({';
    //    //cad += '    $("#dZUpload' + omitirAcentos(replaceAll(listaDeJSON[filas].Serie, " ", "")) + '").dropzone({';
    //    cad += '            url: "DragAndDrop.ashx",';
    //    cad += '            maxFiles: 10,';
    //    cad += '            addRemoveLinks: true,';
    //    cad += '        success: function (file, response) {';
    //    cad += '            almacenaArchivoDragAndDrop()';
    //    cad += '            }, error: function (file, response) {';
    //    cad += '            MostrarMsj("Ocurrio un error al cargar el archivo", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);';
    //    cad += '            context.Response.Write(str_image);';
    //    cad += '        }';
    //    cad += '     });';
    //    cad += ' });';
    //}

    //cad += ' $(document).ready(function () {';
    //cad += '        $("#tblDatosRepReg tr td").hover(function () {';
    //cad += '            $(this).addClass("hover");';
    //cad += '            var status; status += $(this).attr("id");';
    //cad += '            $.ajax({';
    //cad += '                type: "POST",';
    //cad += '                url: "DragAndDrop.ashx",';
    //cad += '                data: { nSerie: $(this).attr("id") },';
    //cad += '                dataType: "json",';
    //cad += '                success: function (response) { }';
    //cad += '                });';
    //cad += '            }, function () { });';
    //cad += '        });';
    //cad += ' </script>';

    return cad;
}


function almacenaArchivoDragAndDrop() {
    Waiting(true, "Cargando Información...");
    peticionAjax('TableroRegulatorios.aspx/validaAlmacenaArchivo', "POST", {},
         function (data) {
             if (data.d.split('#')[0] == "Subir") {

                 MostrarMsj("Se almacenara el acuse de recibo para el reporte regulatorio: " + data.d.split('#')[1].split("%")[0] + ". ¿Desea continuar? ", "Mensaje", true, false, true, "Si", "", "No", 280, 120,
                        function BtnSi() {
                            $("#divVentanaMensajes").dialog("close");
                            var param = {
                                Serie: data.d.split('#')[1].split("%")[0],
                                Reporte: data.d.split('#')[1].split("%26")[1].split("_")[0],
                                Pais: data.d.split('#')[1].split("%26")[1].split("_")[1]
                            }
                            almacenaArchivoDragAndDrop1(param);
                        }, null,
                        function BtnNo() {
                            Waiting(false, "Cargando Información...");
                            $("#divVentanaMensajes").dialog("close");
                        });
             }
         }, null);
    Waiting(false, "Cargando Información...");
}

function almacenaArchivoDragAndDrop1(Datos) {
    var param = {
        Reporte: parseInt(Datos.Reporte),
        Pais: parseInt(Datos.Pais),
        Fecha: $("#txtFechaCorte").val().split('/')[2] + '-' + $("#txtFechaCorte").val().split('/')[1] + '-' + $("#txtFechaCorte").val().split('/')[0]
    };

    peticionAjax('TableroRegulatorios.aspx/almacenaArchivoDragAndDrop', "POST", param, function (data) {
        if (data.d.split("-")[0] == 'Error') {
            var cad = 'Error en la subida de Archivo. <br/>';
            MostrarMsj(data.d.indexOf("Error") != -1 ? cad : "Error en el Archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 350, 220, null, function () {
                entroCloseBtnAceptar = true;
                $("#divVentanaMensajes").dialog("close");
            });
        }
        else {
            var cadena = "#span" + Datos.Serie;
            $(cadena).removeClass('BarraGris');
            $(cadena).addClass('BarraVerde');
        }
    });
}

function eliminarRepetidos(arreglo) {
    var arreglo2 = arreglo;
    for (var m = 0; m < arreglo2.length; m++) {
        for (var n = 0; n < arreglo2.length; n++) {
            if (n != m) {
                if (arreglo2[m] == arreglo2[n]) {
                    //si hay términos iguales los suprime, y evalua el siguiente que ahora es el mismo término
                    arreglo2.splice(n, 1);
                    --n;
                }
            }
        }
    }
    return arreglo2;
}

function ObtenerIndicadores() {

    peticionAjax('TableroRegulatorios.aspx/GetIndicadores', "POST", { idPeriodicidad: $("#sltPeriodicidad").val(), fechaCorte: $("#txtFechaCorte").val().split('/')[2] + $("#txtFechaCorte").val().split('/')[1] + $("#txtFechaCorte").val().split('/')[0], idPais: tableroRegulatorio.getPais() },
    function (data) {
        if (data.d.indexOf("ERRORCATCH") == -1) {
            if (data.d != "") {
                var arreglo = obtenerArregloDeJSON(data.d, false);

                return arreglo;
            }
        }
    }, null);
}

function ObtenerColorStatus(idpais, idsegmento,arreglo) {
  
}

function DeterminaEstatusMAX(arreglo, segmento) {
    var Status = 0;
    var EsBlanco = 0; var EsVerde = 0; var EsAzul = 0; var EsGris = 0; var EsAmarillo = 0; var EsNaranja = 0; var EsRojo = 0; var EsMorado = 0; var EsNegro = 0;

    var queryResult = arreglo.filter(function (item) { return item.idSegmento == segmento; });

    for (var i = 0; i < queryResult.length; i++) {
        switch (queryResult[i].idEstatus) {
            case "1": EsBlanco++; break;
            case "3": EsVerde++; break;
            case "4": EsAzul++; break;
            case "5": EsGris++; break;
            case "6": EsAmarillo++; break;
            case "7": EsNaranja++; break;
            case "8": EsRojo++; break;
            case "9": EsMorado++; break;
            case "10": EsNegro++; break;
        }
    }

    if (EsBlanco >0 && Status < 1) 
        Status = 1;
    if (EsVerde > 0 && Status < 3)
        Status = 3;
    if (EsAzul > 0 && Status < 4)
        Status = 4;
    if (EsGris > 0 && Status < 5)
        Status = 5;
    if (EsAmarillo > 0 && Status < 6)
        Status = 6;
    if (EsNaranja > 0 && Status < 7)
        Status = 7;
    if (EsRojo > 0 && Status < 8)
        Status = 8;
    if (EsMorado > 0 && Status < 9)
        Status = 9;
    if (EsNegro > 0 && Status < 10)
        Status = 10;

    return DeterminaEstatusDeReporteXId(Status.toString());
}

function DeterminaEstatusDeReporteXId(idItem) {
    var classColor = "BarraBlanco";
    switch (idItem) {
        case "3": classColor = "BarraVerde"; break;
        case "4": classColor = "BarraAzul"; break;
        case "5": classColor = "BarraGris"; break;
        case "6": classColor = "BarraAmarillo"; break;
        case "7": classColor = "BarraNaranja"; break;
        case "8": classColor = "BarraRojo"; break;
        case "9": classColor = "BarraMorado"; break;
        case "10": classColor = "BarraNegro"; break;
    }
    return classColor;
}

function crearGrafica(categories, dataS) {
    var colors = Highcharts.getOptions().colors,
           categories = categories,
           data = dataS;

    function setChart(name, categories, data, color) {
        chart.xAxis[0].setCategories(categories, false);
        chart.series[0].remove(false);
        chart.addSeries({
            name: name,
            data: data
        }, false);
        chart.redraw();
    }
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'column',
            width: 500,
            height: 220
        },
        credits: { enabled: false },
        title: { text: '' },
        subtitle: { text: '' },
        legend: { enabled: false },
        xAxis: { categories: categories },
        yAxis: { title: { text: '' } },
        tooltip: {
            formatter: function () {
                return '' +
                        this.x + ': ' + this.y;
            }
        },
        series: [{ name: name, data: data, colorByPoint: true }],
        exporting: { enabled: false }
    });
}

function btnRegresar_Click() {
    reSizedivTblPrincipalMonRegYReacomodoDiagonal(true);
    $("#divResumenYSegmentoEnvio").slideUp('slide');
    $("#divResumenYSegmentoEnvio").hide();
    $("#divHome").slideDown('slide');
}

function btnRegresarVerRepRegStatus_Click() {
    $("#divVerContenidoReportesRegYEstatus").slideUp('slide');
    $("#divResumenYSegmentoEnvio").slideDown('slide');
}

//////////////////////////ficha tecnica
var entroCloseFichatecnica = false;
function mostrarFichaTecnica(idPais, idSegmento, idReporte, serie, idPeriodicidad, numRecarga) {
    var valorHeight = parseInt(document.getElementById("shadows").style.height.substring(0, 3)) > 720 ? 730 : 590;
    var cad = '<div id="divBloqVtnFichaTecnica" style="width:98%;height:96%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
    cad += '<div style="overflow:auto;width:100%;height:93%;" id="divTblFichaTec"><center>';
    cad += '</center></div>'
    cad += '<div id="container" style="width:100%; margin:0px; border:1px solid gray; "><div class="right" style=" float:left; width:160px; margin:0; padding-top: .5em;" ><input type="button" value="Agregar Campo" class="classButton" onclick="btnAgregarCampo_Click();"/></div><div class="center"  style="float:left; width:260px; margin:0; padding-top: .5em;"><input alt="FVCAcuseRecibo" id="btn_FVCAcuseRecibo" type="button" class="classButton" value="Cargar Acuse" onclick="cargarAcuse(\'' + idReporte + '\',\'' + serie + '\',\'' + numRecarga + '\')"/></div><div class="left1" style=" float:left; width:300px; margin:0; padding-top: .5em;"><input id="btnCal" type="button" value="Calendario de entregas" class="classButton" style="padding-left: 10px;padding-right: 10px;" onclick="VentanaCalendario.despliega(this);"/></div><div class="left2"  style=" float:left; width:150px; margin:0; padding-top: .5em;"><input id="btnEditar" type="button" value="Editar" class="classButton" onclick="btnEditarGuardarFichatecnica(this);"/></div></div>'
    //cad +='<div class="container" ><div class><input type="button" value="Agregar Campo" class="classButton" style="float:left;margin-left: 9px;" onclick="btnAgregarCampo_Click();"/></div><div><input alt="FVCAcuseRecibo" id="btn_FVCAcuseRecibo" type="button" class="classButton" value="Cargar Acuse" style="float:center;margin-left: 9px;" onclick="cargarAcuse(\'' + idReporte + '\',\'' + serie + '\',\'' + numRecarga + '\')"/></div><div><input id="btnCal" type="button" value="Calendario de entregas" class="classButton" style="padding-left: 10px;padding-right: 10px;" onclick="VentanaCalendario.despliega(this);"/><input id="btnEditar" type="button" value="Editar" class="classButton" style="float: right;padding-left: 10px;padding-right: 10px;" onclick="btnEditarGuardarFichatecnica(this);"/></div></div>';
   // cad += '</center></div><input type="button" value="Agregar Campo" class="classButton" style="float:left;margin-left: 9px;" onclick="btnAgregarCampo_Click();"/><input id="btnEditar" type="button" value="Editar" class="classButton" style="float: right;padding-left: 10px;padding-right: 10px;" onclick="btnEditarGuardarFichatecnica(this);"/>';
    AgregarVtnFlotante("divVerFichaTecnica", "", "FICHA TÉCNICA REPORTE SERIE " + serie.toUpperCase(), "", cad, valorHeight, 900, false, false, "", "", null);
    $("#divVerFichaTecnica").attr("lang", idPeriodicidad);
    setTimeout(monitoreaValorTxt, 500);
    entroCloseFichatecnica = false;
    $("#divVerFichaTecnica").on("dialogclose", function (event, ui) {
        if (cargoNuevoArchivoAcuse && $("#divTablaInventarios").css("display") != "none" && !entroCloseFichatecnica) {
            btnVerInventario_Click('0', true);
            entroCloseFichatecnica = true;
        }
    });
    mostrarFichaTecnicaPaso2(idPais, idSegmento, idReporte, serie, idPeriodicidad);
}

var idPaisG; var idSegmentoG; var idReporteG; var serieG; var idPeriodicidadG;
function mostrarFichaTecnicaPaso2(idPais, idSegmento, idReporte, serie, idPeriodicidad) {
    idPaisG = idPais; idSegmentoG = idSegmento; idReporteG = idReporte; serieG = serie; idPeriodicidadG = idPeriodicidad;
    WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "28%";
    peticionAjax('TableroRegulatorios.aspx/GetFichaTecnica', "POST", { idPais: idPais, idReporte: idReporte, idSegmento: idSegmento, idPeriodicidad: idPeriodicidad, fechaCorte: $("#txtFechaCorte").val().split('/')[2] + '-' + $("#txtFechaCorte").val().split('/')[1] + '-' + $("#txtFechaCorte").val().split('/')[0] },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        cargoNuevoArchivoAcuse = false;
                        var JSON = obtenerArregloDeJSON(replaceAll(data.d, '\\', '/'), false);
                        $("#divTblFichaTec").html(generaTablaVerFichaTecnica(JSON, idReporte, serie));
                        $(".divEditFecha").datepicker();
                        $(".ui-datepicker-trigger").hide();
                        cargaCatalogosFichaTecnica(0);
                        setTimeout(responsablesFicha, 1000);
                    }
                    else {
                        var esBtnNo = false; var esBtnSi = false; var entroClose = false;
                        WaitingVtn("divBloqVtnFichaTecnica", true, false, "Cargando Información...");
                        MostrarMsj("No existe Ficha Técnica para el Reporte Seleccionado (Serie <span style='font-weight:bold;'>" + serie.toUpperCase() + "</span>). ¿Desea realizar su Carga Inicial?", "Mensaje SicreNet", true, true, false, "Si", "No", "", 250, 130,
                        function btnSi() {
                            esBtnSi = true;
                            $("#divVentanaMensajes").dialog("close");
                            WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
                            var parametrosAdd = { idPais: idPaisG, idReporte: idReporteG, idSegmento: idSegmentoG, idPeriodicidad: $("#sltPeriodicidad").val(), queryUpdate: "", opcion: "5" };
                            peticionAjax('TableroRegulatorios.aspx/actualizarAgregarFichaTecnica', "POST", parametrosAdd,
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
    $("#btnEditar").val("Editar");
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
                    cad += '<center><img id="imgDownAcuseShow_' + idReporte + '" src="../../Images/Grales/downloadFile.png" title="Clic para Descargar Acuse" onclick="descargaArchivoAcuse(\'' + idReporte + '\',\'' + idPais2daVtn + '\');" style="height: 20px;width: 20px;float:left;cursor:pointer;display:' + (parseInt(json[element]) > 0 ? 'inline' : 'none') + '">';
                    cad += '<input alt="' + listaJSON[filas].NAMECOL + '" id="btn_' + listaJSON[filas].NAMECOL + '" type="button" class="classButton" value="Cargar Acuse" style="display:none;height: 100%;font-size: 10px;" onclick="cargarAcuse(\'' + idReporte + '\',\'' + serie + '\',\'' + parseInt(json[element]) + '\')"/></center>';
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
                    cad += '<center><img id="imgDownAcuseShow_' + idReporte + '" src="../../Images/Grales/downloadFile.png" title="Clic para Descargar Acuse" onclick="descargaArchivoAcuse(\'' + idReporte + '\',\'' + idPais2daVtn + '\');" style="height: 20px;width: 20px;float:left;cursor:pointer;display:' + (parseInt(json[element]) > 0 ? 'inline' : 'none') + '">';
                    //cad += '<input alt="' + listaJSON[numMitadFilas + filas].NAMECOL + '" id="btn_' + listaJSON[numMitadFilas + filas].NAMECOL + '" type="button" class="classButton" value="Cargar Acuse" style="display:none;height: 100%;font-size: 10px;" onclick="cargarAcuse(\'' + idReporte + '\',\'' + serie + '\',\'' + parseInt(json[element]) + '\')"/></center>';
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


function responsablesFicha() {

    //    //"../../../Portafolio/Proyectos/Handler1.ashx"

    $("#txt_FVCNombRespAreaFuenteInfo").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: false

    });
    $("#txt_FVCNombRespAreaFuenteInfo").result(function (event, data, formatted) {
        var txtFinal = "";
        for (var i = 0; i < valorName1.split(',').length - 1; i++) {
            txtFinal += valorName1.split(',')[i] + ",";
        }
        $("#txt_FVCNombRespAreaFuenteInfo").val(txtFinal + ($(this).val().split(':').length == 2 ? $(this).val() : $(this).val().split(',')[$(this).val().split(',').length - 2] + ", "));
    });


    $("#txt_FVCNombRespSistGeneInfo").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: false
    });
    $("#txt_FVCNombRespSistGeneInfo").result(function (event, data, formatted) {
        var txtFinal = "";
        for (var i = 0; i < valorName2.split(',').length - 1; i++) {
            txtFinal += valorName2.split(',')[i] + ",";
        }
        $("#txt_FVCNombRespSistGeneInfo").val(txtFinal + ($(this).val().split(':').length == 2 ? $(this).val() : $(this).val().split(',')[$(this).val().split(',').length - 2] + ", "));
    });



    $("#txt_FVCNombRespAreaGeneRepo").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: false
    });
    $("#txt_FVCNombRespAreaGeneRepo").result(function (event, data, formatted) {
        var txtFinal = "";
        for (var i = 0; i < valorName3.split(',').length - 1; i++) {
            txtFinal += valorName3.split(',')[i] + ",";
        }
        $("#txt_FVCNombRespAreaGeneRepo").val(txtFinal + ($(this).val().split(':').length == 2 ? $(this).val() : $(this).val().split(',')[$(this).val().split(',').length - 2] + ", "));
    });



    $("#txt_FVCNombRespAreaRespoEnvio").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: false
    });
    $("#txt_FVCNombRespAreaRespoEnvio").result(function (event, data, formatted) {
        var txtFinal = "";
        for (var i = 0; i < valorName4.split(',').length - 1; i++) {
            txtFinal += valorName4.split(',')[i] + ",";
        }
        $("#txt_FVCNombRespAreaRespoEnvio").val(txtFinal + ($(this).val().split(':').length == 2 ? $(this).val() : $(this).val().split(',')[$(this).val().split(',').length - 2] + ", "));
    });
}

var valorName1 = ""; var valorName2 = "";
var valorName3 = ""; var valorName4 = "";

function monitoreaValorTxt() {
    valorName1 = $("#txt_FVCNombRespAreaFuenteInfo").val();
    valorName2 = $("#txt_FVCNombRespSistGeneInfo").val();
    valorName3 = $("#txt_FVCNombRespAreaGeneRepo").val();
    valorName4 = $("#txt_FVCNombRespAreaRespoEnvio").val();
    setTimeout(monitoreaValorTxt, 100);
}



function cargaCatalogosFichaTecnica(idArreglo) {
    if (arregloCatalogosFichaTecnica.length > 0) {
        peticionAjax('TableroRegulatorios.aspx/catalogoFichaTecnica', "POST", { opcionCatalogo: arregloCatalogosFichaTecnica[idArreglo].split("%%&&")[0].split('_')[1] },
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

function btnEditarGuardarFichatecnica(obj) {

    if ($(obj).attr("value") == "Editar") {
        $(".divNoEdit").hide();
                //$("#txt_FVCResponsableFuente").css("display", "inline-block");
                //$("#txt_FVCNombRespSistGeneInfo").css("display", "inline-block");
                //$("#txt_FVCNombRespAreaGeneRepo").css("display", "inline-block");
                //$("#txt_FVCUsuarioResponsable").css("display", "inline-block");

        $(".divEdit").css("display", "inline-block");
        $(".divEditFecha").css("display", "inline-block");
        $("#tblContenidoFichaTecnica").find("input:button").css("display", "inline-block");
        $(".ui-datepicker-trigger").show();
        $(obj).attr("value", "Guardar");
    }
    else {//if (!validarCamposGuardarFichaTecnica()) {
        $(".divNoEdit").show();
                //$("#txt_FVCResponsableFuente").hide();
                //$("#txt_FVCNombRespSistGeneInfo").hide();
                //$("#txt_FVCNombRespAreaGeneRepo").hide();
                //$("#txt_FVCUsuarioResponsable").hide();

        $(".divEdit").hide();
        $(".divEditFecha").hide();
        $(".ui-datepicker-trigger").hide();
        $("#tblContenidoFichaTecnica").find("input:button").hide();
        $(obj).attr("value", "Editar");
        GuardarEdicionFichaTecnica();
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


// Falta poner borde gris  y desactivar Vtn Ficha 
function validarCamposGuardarFichaTecnica() {
    $('#tblContenidoFichaTecnica >tbody').find("select").css("border", "thin solid gray");
    $('#tblContenidoFichaTecnica >tbody').find("textarea").css("border", "thin solid gray");
    $('#tblContenidoFichaTecnica >tbody').find("input:text").css("border", "thin solid gray");
    $('#tblContenidoFichaTecnica >tbody').find("input.divEditFecha.hasDatepicker").css("border", "thin solid gray");

    for (var i = 0; i < $('#tblContenidoFichaTecnica >tbody >tr').length; i++) {
        var campoEnBlanco = false;
        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("select").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") != ""
            && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("select")[0]).val() == "") {
            campoEnBlanco = true;
            $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("select")[0]).css("border", "thin solid red");
        }

        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("textarea").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("textarea")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("textarea")[0]).attr("alt") != ""
            && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("textarea")[0]).val() == "") {
            campoEnBlanco = true;
            $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("textarea")[0]).css("border", "thin solid red");
        }

        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input:text").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("alt") != ""
            && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input:text")[0]).val() == "") {
            campoEnBlanco = true;
            $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input:text")[0]).css("border", "thin solid red");
        }

        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != ""
            && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).val() == "") {
            campoEnBlanco = true;
            $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).css("border", "thin solid red");
        }

        if (campoEnBlanco) {
            WaitingVtn("divBloqVtnFichaTecnica", true, false, "Cargando Información...");
            MostrarMsj("El Campo <span style='font-weight:bold;'>" + $($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[0]).html() + "</span> no debe ir en blanco", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
            });
            return campoEnBlanco;
        }

        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("select").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("select")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("select")[0]).attr("alt") != ""
            && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("select")[0]).val() == "") {
            campoEnBlanco = true;
            $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("select")[0]).css("border", "thin solid red");
        }
        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("textarea").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("textarea")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("textarea")[0]).attr("alt") != ""
            && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("textarea")[0]).val() == "") {
            campoEnBlanco = true;
            $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("textarea")[0]).css("border", "thin solid red");
        }
        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input:text").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input:text")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input:text")[0]).attr("alt") != ""
            && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input:text")[0]).val() == "") {
            campoEnBlanco = true;
            campoEnBlanco = true;
            $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input:text")[0]).css("border", "thin solid red");
        }
        if ($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input.divEditFecha.hasDatepicker").length > 0 && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != undefined && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != ""
            && $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input.divEditFecha.hasDatepicker")[0]).val() == "") {
            campoEnBlanco = true;
            $($($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[4]).find("input.divEditFecha.hasDatepicker")[0]).css("border", "thin solid red");
        }

        if (campoEnBlanco) {
            WaitingVtn("divBloqVtnFichaTecnica", true, false, "Cargando Información...");
            MostrarMsj("El Campo <span style='font-weight:bold;'>" + $($('#tblContenidoFichaTecnica >tbody >tr')[i].cells[3]).html() + "</span> no debe ir en blanco", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
            });
            return campoEnBlanco;
        }
    }
}

function btnAgregarCampo_Click() {
    WaitingVtn("divBloqVtnFichaTecnica", true, false, "Cargando Información...");
    var cadena = '<div id="divBloqVtnAgregarCampo" style="width:95%;height:83%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:54%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbl" style="width:100%;height:100%;overflow: auto;margin-top: 0px;">  ';
    cadena += '<div style="text-align: center;height: 100%;"> <table width="100%"> <tr style="height:5px"></tr>';
    cadena += '<tr><td style="text-align: left;">Descripción Campo</td><td style="text-align: left"><input type="text" id="txtDescripcionCampo" maxlength="90" onkeyup="txtDescCampo_OnKeyUp();" style="width:180px;font-size: 10px;"/></td> </tr>' +
    '<tr><td style="text-align: left;">Nombre Campo</td><td style="text-align: left"><input type="text" id="txtNombreCampo" disabled="disabled" style="width:180px;font-size: 10px;"/></td> </tr>' +
    '<tr style="height:5px"></tr></table></div>';
    cadena += '</div></div>';
    cadena += "<table style='width:90%;height:8%;margin-left: 29px;'><tr style='height:1%'></tr><tr><td style='text-align:left'></td><td style='text-align:right'><input type='button' id='btnAgregarCampo' onclick='btnGuardarCampoFichaTecnica_Click();' class='classButton' value='Agregar'/></td>";
    $("#dvAgregarPais").empty();
    AgregarVtnFlotante("dvAgregarPais", "", "AGREGAR CAMPO", "", cadena, 170, 300, false, false, "", "", null);
    $("#dvAgregarPais").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
    });
}

function btnGuardarCampoFichaTecnica_Click() {
    document.getElementById("txtDescripcionCampo").style.border = "1px solid Gray";
    if (!validaCampovacio("txtDescripcionCampo")) {
        WaitingVtn("divBloqVtnAgregarCampo", true, true, "Cargando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "28%";
        peticionAjax('TableroRegulatorios.aspx/controlFichaTecnica', "POST", {
            nameCampoAgregar: $("#txtNombreCampo").val(),
            descCampoAgregar: $("#txtDescripcionCampo").val()
        },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d == "") {
                        $("#dvAgregarPais").dialog("close");
                        MostrarMsj("Campo agregado exitosamente.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                        mostrarFichaTecnicaPaso2(idPaisG, idSegmentoG, idReporteG, serieG, idPeriodicidadG);
                    }
                }
                else {
                    WaitingVtn("divBloqVtnAgregarCampo", true, false, "Cargando Información...");
                    MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                        WaitingVtn("divBloqVtnAgregarCampo", false, false, "Cargando Información...");
                    });
                }
            }, null);
    }
    else {
        WaitingVtn("divBloqVtnAgregarCampo", true, false, "Cargando Información...");
        MostrarMsj("Ingrese la Descripción del Campo a Agregar.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnAgregarCampo", false, false, "Cargando Información...");
        });
    }
}

function txtDescCampo_OnKeyUp() {
    var numPalabras = $("#txtDescripcionCampo").val().split(" ").length;
    var letrasXPalabra = Math.round(25 / numPalabras);
    var cadenaComplete = "";
    for (var i = 0; i < $("#txtDescripcionCampo").val().split(" ").length; i++) {
        var cadenaaTemp = $("#txtDescripcionCampo").val().split(" ")[i];
        cadenaComplete += cadenaaTemp.length <= letrasXPalabra ? cadenaaTemp.substring(0, 1).toUpperCase() + cadenaaTemp.substring(1, cadenaaTemp.length) : cadenaaTemp.substring(0, 1).toUpperCase() + cadenaaTemp.substring(1, letrasXPalabra - 1);
    }

    $("#txtNombreCampo").val(cadenaComplete.trim() != "" ? "FVC" + cadenaComplete : "");
}

//-----------------------------------------CARGAR ACUSES

function cargarAcuse(idReporte, descReporte, numCargasAcuse) {
    event.cancelBubble = true;
    if (numCargasAcuse == 0 || numCargasAcuse == undefined)
        mostarVentanaCargarAcuse(idReporte, descReporte);
    else {
        WaitingVtn("divBloqVtnFichaTecnica", true, false, "");
        MostrarMsj('Existe un Acuse para el Reporte <span style="font-weight:bold;">  ' + descReporte + '</span>. </br> ¿Desea Cargar un Nuevo Acuse? ', "Mensaje SicreNet", true, true, false, "Si", "No", "", 260, 145,
        function BtnSi() {
            $("#divVentanaMensajes").dialog("close");
            mostarVentanaCargarAcuse(idReporte, descReporte);
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        });
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtnFichaTecnica", false, false, "");
        });
    }
}

function mostarVentanaCargarAcuse(idReporte, descReporte) {
    var cadena = '<div id="divBloqVtndivAcuse" style="width:98%;height:80%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
    cadena += '<div> <div id="divVentanaCargaAcuse"> <center> <table border="0" cellpadding="0" cellspacing="0">';
    cadena += ' <tbody> <tr>  <td style="height: 5px;">  </td>';
    cadena += ' <td class="TextBoxArribaCentro" colspan="3" style="height: 25px;font: normal 10px Helvetica, Arial, sans-serif;" align="left"> &nbsp;<input type="file" name="fuAcuse" id="fuAcuse" style="font-family:Arial;font-size:X-Small;width:441px;">';
    cadena += '</td><td class="TextBoxArribaDerecha" style="height: 25px;text-align: right;">&nbsp;';
    cadena += '<input type="button" name="btnLoad" value="Cargar Archivo" id="btnCargarAcuse" lang="' + idReporte + '" class="classButton" style="font-family:Arial;font-size:X-Small;" onclick="enviarArchivoAsincronamente(this,\'' + descReporte + '\')"></td>';
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

function enviarArchivoAsincronamente(obj, descReporte) {
    if (!validarExistenciaDeArchivo($(obj).parent().parent().find("input:file"))) {
        return false;
    }

    WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
    MostrarMsj('El Acuse del Reporte <span style="font-weight:bold;">  ' + descReporte + '</span> sera Cargado con Fecha Corte:<span style="font-weight:bold;">  ' +
    $("#txtFechaCorte").val().split('/')[2] + '-' + $("#txtFechaCorte").val().split('/')[1] + '-' + $("#txtFechaCorte").val().split('/')[0] + '</span>. </br> ¿Desea Continuar? ', "Mensaje SicreNet", true, true, false, "Si", "No", "", 280, 145,
        function BtnSi() {
            $("#divVentanaMensajes").dialog("close");
            var idInputFile = $(obj).parent().parent().find("input:file").attr("id");
            var parametros = {
                'subirArchivo': 'subirArchivo',
                'idReporte': $(obj).attr("lang"),
                'idPais': idPais2daVtn,
                'fechaCorte': $("#txtFechaCorte").val().split('/')[2] + '-' + $("#txtFechaCorte").val().split('/')[1] + '-' + $("#txtFechaCorte").val().split('/')[0]
            };
            return ajaxFileUpload(idInputFile, obj, parametros);

        }, function () {
            $("#divVentanaMensajes").dialog("close");
        });
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtndivAcuse", false, false, "");
    });
}

function validarExistenciaDeArchivo(obj) {
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
function ajaxFileUpload(idInputFile, obj, parametros) {
    WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
    jQuery.ajaxFileUpload
		    ({
		        url: 'TableroRegulatorios.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaDeArchivo(data, obj, parametros.idPais, parametros.idReporte);
		        }
		    });
    return false;
}

var cargoNuevoArchivoAcuse = false;
function reportarStatusDeSubidaDeArchivo(data, obj, idPais, idReporte) {
    data = data.toString().replace("<pre>", "").replace("</pre>", "").replace("<PRE>", "").replace("</PRE>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "");
    var entroCerrar = false;
    if (data.indexOf('ArchivoCargado') != -1) {
        $("#divCargaAcuse").dialog("close");
        WaitingVtn("divBloqVtndivAcuse", true, false, "Cargando Información...");
        $("#imgDownAcuseDis_" + idReporte).hide();
        $("#imgDownAcuseShow_" + idReporte).css("display", "inline");
        cargoNuevoArchivoAcuse = true;
        MostrarMsj("Archivo cargado exitosamente.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
            WaitingVtn("divBloqVtndivAcuse", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
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

function descargaArchivoAcuse(idReporte, idPais) {
    event.cancelBubble = true;
    window.location.assign("Respuesta.aspx?idReporte=" + idReporte + "&&idPais=" + idPais + "&&fechaCorte=" + $("#txtFechaCorte").val().split('/')[2] + '-' + $("#txtFechaCorte").val().split('/')[1] + '-' + $("#txtFechaCorte").val().split('/')[0])
}


/////////////////////-----------------------------------------------------------------------------TABLA INVENTARIO
var statusGris = 0;
var statusNegro = 0;
var statusVerde = 0;
var statusAmarillo = 0;
var statusNaranja = 0;
var statusRojo = 0;
function btnVerInventario_Click(opcion, recargarGrafica) {
    $("#tdEstatusGris").html("NO CORRESPONDE AL PERIODO");
    $("#divResumenYSegmentoEnvio").slideUp('slide');
    $("#divResumenYSegmentoEnvio").hide();
    $("#divTablaInventarios").slideDown('slide');
    $("#divTablaInventariosMain").html("");
    $("#tblEncabezado_Inventario").html("");
    $("#divLeyendaM").html($("#tblLeyenda").html());
    $("#tblLeyenda").hide();
    $(".ui-datepicker-trigger").show();
    $("#sltPeriodicidad").hide();
    $("#spLabelPeriodicidad").hide();

    statusGris = 0;
    statusNegro = 0;
    statusVerde = 0;
    statusAmarillo = 0;
    statusNaranja = 0;
    statusRojo = 0;
    Waiting(true, "Cargando Información...");
    peticionAjax('TableroRegulatorios.aspx/GetPeriodicidad', "POST", null,
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    var JSONPeriodicidad = obtenerArregloDeJSON(data.d, false);

                    peticionAjax('TableroRegulatorios.aspx/controlSegmentos', "POST", { descSegmento: "", opcion: 1 },
                    function (dataS) {
                        if (dataS.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                            var JSONSegmentos = obtenerArregloDeJSON(dataS.d, false);

                            peticionAjax('TableroRegulatorios.aspx/GetReportesInventario', "POST", { fechaCorte: $("#txtFechaCorte").val().split('/')[2] + "-" + $("#txtFechaCorte").val().split('/')[1] + "-" + $("#txtFechaCorte").val().split('/')[0], idPais: idPais2daVtn, opcion: opcion, esEventoBtn: true },
                            function (dataI) {
                                if (dataI.d != null && dataI.d.indexOf("ERRORCATCH") == -1) {
                                    var JSONInventario = obtenerArregloDeJSON(dataI.d.split("%%&&")[0], false);
                                    $("#divTotal").html("Total " + (JSONInventario[0] == null ? 0 : JSONInventario.length));
                                    resizeTablaReportesInventariosTableroRAZ();
                                    $("#divTablaInventariosMain").html(creaTablaReportesInventario(JSONPeriodicidad, JSONSegmentos, JSONInventario));
                                    setTimeout(function () { AgregaEncabezadoEstatico(JSONPeriodicidad, JSONInventario.length); }, 100);

                                    if (document.getElementById("divTablaInventariosMain").scrollHeight <= ((document.documentElement.clientHeight - document.getElementById("divHeader").offsetHeight) - 230)) {
                                        $("#divLeyenda").css("width", "100%");
                                        $("#divEncabezado").css("width", "100%");
                                    }
                                    else {
                                        $("#divLeyenda").css("width", "98.8%");
                                        $("#divEncabezado").css("width", "98.8%");
                                    }
                                    if (opcion == 0 && dataI.d != "" && recargarGrafica) {
                                        var JSONInventarioTotales = obtenerArregloDeJSON(dataI.d.split("%%&&")[1], false);
                                        var arregloData = [];
                                        var arregloDataOrden = new Array(5, 10, 3,6,7, 8,4);
                                        for (var i = 0; i < arregloDataOrden.length; i++) {
                                            var numTotal = 0;
                                            for (var ii = 0; ii < JSONInventarioTotales.length; ii++) {
                                                if (JSONInventarioTotales[ii].estatus == arregloDataOrden[i]) {
                                                    numTotal = JSONInventarioTotales[ii].total;
                                                    break;
                                                }
                                            }
                                            arregloData.push(parseInt(numTotal));
                                        }
                                        creaGraficaPie(JSONInventario.length, arregloData);
                                        statusGris = arregloData[0];
                                       // statusNegro = arregloData[1];
                                        statusVerde = arregloData[2];
                                        statusAmarillo = arregloData[3];
                                        statusNaranja = arregloData[4];
                                        statusRojo = arregloData[5];
                                        statusAzul = arregloData[6];

                                    }
                                    if (dataI.d == "")
                                        $('#containerPie').html("");
                                    $(".spEstatusGris").html(statusGris);
                                    $(".spEstatusNegro").html(statusNegro);
                                    $(".spEstatusVerde").html(statusVerde);
                                    $(".spEstatusAmarillo").html(statusAmarillo);
                                    $(".spEstatusNaranja").html(statusNaranja);
                                    $(".spEstatusRojo").html(statusRojo);
                                    $("#txtFechaCorte").attr("lang", "aa");
                                    Waiting(false, "Cargando Información...");
                                }
                                else MostrarMsj(dataI.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                            }, null);
                        }
                        else MostrarMsj(dataS.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    }, null);
                }
                else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }, null);
}

function creaTablaReportesInventario(JSONPeriodicidad, JSONSegmentos, JSONInventario) {
    var arregloColores = new Array("rgba(222, 184, 135, 0.7)", "rgba(100, 149, 237, 0.55)", "darkseagreen", "rgba(218, 165, 32, 0.67)", "rgba(165, 42, 42, 0.66)");
    var cad = '<table id="tblReporteInventario" class="dataGridDatos" style="width:100%;">';
    if (JSONInventario.length <= 1) {
        cad += '<thead>';
        cad += '<tr><th colspan="' + (JSONPeriodicidad.length + 3) + '"><img style="width: 34px;height: 15px;box-shadow: 1.5px 1.5px 1.5px 1.5px rgb(17, 27, 18);" src="../../Images/PanelDeControl/BanderasRect/' + omitirAcentos(replaceAll(definicionPais2daVtn.toLowerCase(), " ", "")) + '.gif" title="' + definicionPais2daVtn + '"/></th></tr>';
        cad += '<tr>';
        cad += '<th rowspan="2">Segmento</th>';
        // cad += '<th rowspan="2">ID Reporte</th>';
        cad += '<th rowspan="2">Nombre Reporte</th>';
        cad += '<th colspan="' + JSONPeriodicidad.length + '">Periodicidad</th>';
        cad += '<th rowspan="2" style="width:' + (document.getElementById("tblReporteInventario") != null ? (document.getElementById("tblReporteInventario").rows[0].cells[document.getElementById("tblReporteInventario").rows[0].cells.length - 1].offsetWidth - 10) : '5') + 'px;"></th>';
        cad += '</tr><tr>';
        for (var i = 0; i < JSONPeriodicidad.length; i++)
            cad += '<th lang="' + JSONPeriodicidad[i].idPeriodicidad + '">' + JSONPeriodicidad[i].descripcion + '</th>';
        cad += '</tr></thead>';
    }
    cad += '<tbody>';
    if (JSONInventario.length > 0 && JSONInventario[0] != null) {
        var contadorReportesAdd = 0;
        var posicioSegmentoColor = -1;

        for (var i = 0; i < JSONSegmentos.length; i++) {
            var entro = false;
            for (var ii = 0; ii < JSONInventario.length; ii++) {
                if (JSONInventario[ii].IDSeg == JSONSegmentos[i].FIIdSegmento) {
                    if (!entro) {
                        cad += (contadorReportesAdd % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
                        cad += '<td rowspan="' + devuelveNumReportesXSegmento(JSONInventario, JSONSegmentos[i].FIIdSegmento) + '" style="background: #009c96 url(../../Images/Cancelaciones/SeguimientoCancelacion/HeaderDG.gif) repeat-x;background: #009c96 url(../../Images/Cancelaciones/SeguimientoCancelacion/HeaderDG.gif) repeat-x;background: #009c96 url(../../Images/Cancelaciones/SeguimientoCancelacion/HeaderDG.gif) repeat-x;background: #009c96 url(../../Images/Cancelaciones/SeguimientoCancelacion/HeaderDG.gif) repeat-x;background: #009c96 url(../../Images/Cancelaciones/SeguimientoCancelacion/HeaderDG.gif) repeat-x;color: White;text-align: center;">' + JSONSegmentos[i].FVCDescripcion + '</td>';
                        posicioSegmentoColor++;
                        posicioSegmentoColor = posicioSegmentoColor < arregloColores.length ? posicioSegmentoColor : 0;
                    }
                    else
                        cad += (contadorReportesAdd % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
                    //  cad += '<td>' + JSONInventario[ii].IDRep + '</td>';                    
                    cad += '<td style="cursor:pointer;text-align:left;background:' + arregloColores[posicioSegmentoColor] + ';" ' +
                    ' onclick="mostrarFichaTecnica(\'' + idPais2daVtn + '\',\'' + JSONInventario[ii].IDSeg + '\',\'' + JSONInventario[ii].IDRep + '\',\'' + JSONInventario[ii].descrip + '\',\'' + JSONInventario[ii].periodicidad + '\');" ' +
                    ' title="Clic para Ver Ficha Técnica" >' + JSONInventario[ii].descrip + '</td>';

                    for (var iii = 0; iii < JSONPeriodicidad.length; iii++) {
                        if (JSONPeriodicidad[iii].idPeriodicidad == JSONInventario[ii].periodicidad) {
                            var statusFinal = DeterminaEstatusDeReporteXId(JSONInventario[ii].estatus);
                            setValorNumXEstatus(statusFinal);
                            cad += '<td class="' + statusFinal + '" style="width:8%;' + (JSONInventario[ii].estatus == "-1" ? 'box-shadow: 1.5px 1.5px 1.5px 1.5px rgb(17, 27, 18);' : '') + '">' + '</td>';
                            //if (JSONInventario[ii].estatus == "-1" || JSONInventario[ii].estatus == "1") {
                            //    cad += '<td class="' + statusFinal + '" style="width:8%;">' + '</td>';
                            //}
                            //else
                            //{
                            //    cad += '<td class="' + statusFinal + '" style="width:8%; box-shadow: 1.5px 1.5px 1.5px 1.5px rgb(17, 27, 18); ">' + '</td>';
                            //}
                        }
                        else {
                            var statusFinal = DeterminaEstatusDeReporteXId("0");
                            //setValorNumXEstatus(statusFinal);
                            cad += '<td class="' + statusFinal + '" style="width:8%;">' + '</td>';
                        }

                    }
                    if (parseInt(JSONInventario[ii].Acuse) >= 1)
                        cad += '<td style="cursor:pointer;" onclick="mostrarFichaTecnica(\'' + idPais2daVtn + '\',\'' + JSONInventario[ii].IDSeg + '\',\'' + JSONInventario[ii].IDRep + '\',\'' + JSONInventario[ii].descrip + '\',\'' + JSONInventario[ii].periodicidad + '\');" ><img src="../../Images/Portafolio/Proyectos/Archivado.png" width="15px" height="13px" title="Cargar/Ver Acuse"></td>';
                    else {
                        cad += '<td style="cursor:pointer;" onclick="mostrarFichaTecnica(\'' + idPais2daVtn + '\',\'' + JSONInventario[ii].IDSeg + '\',\'' + JSONInventario[ii].IDRep + '\',\'' + JSONInventario[ii].descrip + '\',\'' + JSONInventario[ii].periodicidad + '\');"><img src="../../Images/Portafolio/Proyectos/Adjuntos2.png" width="15px" height="13px" title="Cargar Acuse"></td>';
                    }

                    cad += '</tr>';
                    entro = true;
                    contadorReportesAdd++;
                }
                if (entro && JSONInventario[ii].IDSeg != JSONSegmentos[i].FIIdSegmento)
                    break;
            }
        }
    } else
        cad += '<tr><td colspan="' + (3 + JSONPeriodicidad.length) + '" style="text-align:center;">Sin Datos</td></tr>';

    cad += '</tbody>';
    cad += '';
    cad += '';
    cad += '';
    cad += '</table>';

    return cad;
}

function setValorNumXEstatus(statusFinal) {
    switch (statusFinal) {
        case "EstatusGris": statusGris++; break;
        case "EstatusNegro": statusNegro++; break;
        case "EstatusVerde": statusVerde++; break;
        case "EstatusAmarillo": statusAmarillo++; break;
        case "EstatusNaranja": statusNaranja++; break;
        case "EstatusRojo": statusRojo++; break;
    }
}

function resizeTablaReportesInventariosTableroRAZ() {
    var valorH = (document.documentElement.clientHeight - document.getElementById("divHeader").offsetHeight) - 255;
    document.getElementById("divTablaInventariosMain").style.height = valorH + "px";

    var contadorFila = 0;
    $('#tblEncabezado_Inventario tr').each(function () {
        if (document.getElementById("tblReporteInventario") != null) {
            if (contadorFila == 1) {
                this.cells[0].style.width = (document.getElementById("tblReporteInventario").rows[0].cells[0].offsetWidth) + 'px';
                this.cells[1].style.width = (document.getElementById("tblReporteInventario").rows[0].cells[1].offsetWidth) + 'px';
                this.cells[3].style.width = (document.getElementById("tblReporteInventario").rows[0].cells[document.getElementById("tblReporteInventario").rows[0].cells.length - 1].offsetWidth - 10) + 'px';
            }
            else if (contadorFila == 2) {
                for (var i = 0; i < this.cells.length; i++)
                    this.cells[i].style.width = (document.getElementById("tblReporteInventario").rows[0].cells[i + 2].offsetWidth - 9) + 'px';
            }
        }
        contadorFila++;
    });
}


function devuelveNumReportesXSegmento(arregloReportes, valorBuscar) {
    var numReg = 0;
    for (var i = 0; i < arregloReportes.length; i++) {
        if (arregloReportes[i].IDSeg == valorBuscar)
            numReg++;
        if (numReg > 0 && arregloReportes[i].IDSeg != valorBuscar)
            break;
    }
    return numReg;
}
function btnRegresarVerTablaInventarios_Click() {
    $("#txtFechaCorte").val(fechaTempConsultInventario);
    $("#sltPeriodicidad").show();
    $("#spLabelPeriodicidad").show();
    CargarEstatusSegmentos(undefined, undefined, true, true);
    $("#tblLeyenda").show();
    $(".spEstatusGris").html("&nbsp&nbsp&nbsp");
    $(".spEstatusNegro").html("&nbsp&nbsp&nbsp");
    $(".spEstatusVerde").html("&nbsp&nbsp&nbsp");
    $(".spEstatusAmarillo").html("&nbsp&nbsp&nbsp");
    $(".spEstatusNaranja").html("&nbsp&nbsp&nbsp");
    $(".spEstatusRojo").html("&nbsp&nbsp&nbsp");

    $("#tdEstatusGris").html("SIN REPORTES");
    $("#divTablaInventarios").slideUp('slide');
    $("#divResumenYSegmentoEnvio").slideDown('slide');
}

function AgregaEncabezadoEstatico(JSONPeriodicidad, numRegInventario) {
    var cad = '';
    if (numRegInventario > 1) {
        cad = '<div id="divEncabezado_Inventario"  style="/*display: inline-block; position: relative;*/">';
        cad += '<table id="tblEncabezado_Inventario" style="width: 100%;"  class="dataGridDatos">  <tbody>';
        cad += '<tr><th colspan="' + (JSONPeriodicidad.length + 3) + '"><img style="width: 34px;height: 15px;box-shadow: 1.5px 1.5px 1.5px 1.5px rgb(17, 27, 18);" src="../../Images/PanelDeControl/BanderasRect/' + omitirAcentos(replaceAll(definicionPais2daVtn.toLowerCase(), " ", "")) + '.gif" title="' + definicionPais2daVtn + '"/></th></tr>';

        cad += '<tr style="font-weight: bold; text-shadow: 2px 1px 1px black; font-size: 9px;height:25px;">';

        cad += '<th rowspan="2" style="white-space: pre-wrap;text-align: center; color: rgb(255, 255, 255);padding-bottom: 4px;' +
       'width:' + (document.getElementById('tblReporteInventario').rows[0].cells[0].offsetWidth) + 'px;">Segmento</th>';
        // cad += '<th rowspan="2">ID Reporte</th>';
        cad += '<th rowspan="2" style="white-space: pre-wrap;text-align: center;padding-bottom: 4px;' +
       'width:' + (document.getElementById('tblReporteInventario').rows[0].cells[1].offsetWidth) + 'px;">Nombre Reporte</th>';
        cad += '<th colspan="' + JSONPeriodicidad.length + '">Periodicidad</th>';
        cad += '<th rowspan="2" style="width:' + (document.getElementById("tblReporteInventario").rows[0].cells[document.getElementById("tblReporteInventario").rows[0].cells.length - 1].offsetWidth - 10) + 'px;"></th>';
        // cad += '<th rowspan="2" style="width:5px;"></th>';

        cad += '</tr><tr>';
        for (var i = 0; i < JSONPeriodicidad.length; i++)
            cad += '<th lang="' + JSONPeriodicidad[i].idPeriodicidad + '" style="white-space: pre-wrap;text-align: center; color: rgb(255, 255, 255);padding-bottom: 4px;' +
       'width:' + (document.getElementById('tblReporteInventario').rows[0].cells[i + 2].offsetWidth - 9) + 'px;">' + JSONPeriodicidad[i].descripcion + '</th>';
        cad += '</tr></thead>';
        cad += '</tr></tbody></table></div>';
    }

    $("#divEncabezado").html(cad);
}


function creaGraficaPie(totalReportes, arregloData) {

    //var colors = ['#8E8E8E', '#2D2D2D', '#33750A', '#e1cc3d', '#ff8a00', '#B84141', '#009C96', '#FFF263', '#6AF9C4'],
    //colors = Gris,Negro,Verde,amarillo,naranja,rojo,cian?,verde azulado o algo asi   #0084ff

    var colors = [//{radialGradient: { cx: 0.3, cy: 0.3, r: 0.7 }, stops: [[0, Highcharts.Color('#8E8E8E').brighten(0.2).get('rgb')], [1, Highcharts.Color('#8E8E8E').brighten(-0.4).get('rgb')]] },
                  { linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, stops: [[0, Highcharts.Color('#8E8E8E').brighten(0.3).get('rgb')], [1, Highcharts.Color('#8E8E8E').brighten(-0.3).get('rgb')]] },
    //{radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 }, stops: [[0, Highcharts.Color('#2D2D2D').brighten(0.2).get('rgb')], [1, Highcharts.Color('#2D2D2D').brighten(-0.4).get('rgb')]] },
                  { linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, stops: [[0, Highcharts.Color('#2D2D2D').brighten(0.3).get('rgb')], [1, Highcharts.Color('#2D2D2D').brighten(-0.3).get('rgb')]] },
    //{ radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 }, stops: [[0, Highcharts.Color('#33750A').brighten(0.2).get('rgb')], [1, Highcharts.Color('#33750A').brighten(-0.4).get('rgb')]] },
                  { linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, stops: [[0, Highcharts.Color('#33750A').brighten(0.3).get('rgb')], [1, Highcharts.Color('#33750A').brighten(-0.3).get('rgb')]] },
    //{ radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 }, stops: [[0, Highcharts.Color('#e1cc3d').brighten(0.2).get('rgb')], [1, Highcharts.Color('#e1cc3d').brighten(-0.4).get('rgb')]] },
                  { linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, stops: [[0, Highcharts.Color('#e1cc3d').brighten(0.3).get('rgb')], [1, Highcharts.Color('#e1cc3d').brighten(-0.3).get('rgb')]] },
    //{ radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 }, stops: [[0, Highcharts.Color('#ff8a00').brighten(0.2).get('rgb')], [1, Highcharts.Color('#ff8a00').brighten(-0.4).get('rgb')]] },
                  { linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, stops: [[0, Highcharts.Color('#ff8a00').brighten(0.3).get('rgb')], [1, Highcharts.Color('#ff8a00').brighten(-0.3).get('rgb')]] },
    //{ radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 }, stops: [[0, Highcharts.Color('#B84141').brighten(0.2).get('rgb')], [1, Highcharts.Color('#B84141').brighten(-0.4).get('rgb')]] },
                  { linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, stops: [[0, Highcharts.Color('#B84141').brighten(0.3).get('rgb')], [1, Highcharts.Color('#B84141').brighten(-0.3).get('rgb')]] },
                  { linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, stops: [[0, Highcharts.Color('#0084ff').brighten(0.3).get('rgb')], [1, Highcharts.Color('#0084ff').brighten(-0.3).get('rgb')]] },

                  { radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 }, stops: [[0, Highcharts.Color('#009C96').brighten(0.2).get('rgb')], [1, Highcharts.Color('#009C96').brighten(-0.4).get('rgb')]] },
                  { radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 }, stops: [[0, Highcharts.Color('#FFF263').brighten(0.2).get('rgb')], [1, Highcharts.Color('#FFF263').brighten(-0.4).get('rgb')]] },
                  { radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 }, stops: [[0, Highcharts.Color('#6AF9C4').brighten(0.2).get('rgb')], [1, Highcharts.Color('#6AF9C4').brighten(-0.4).get('rgb')]] },
    ],
        categories = ['Total'],
        data = [{
            y: totalReportes,
            color: colors[6],
            drilldown: {
                name: 'Reportes Por Estatus',
                categories: ['NO CORRESPONDE PERIODO', 'NO LLEGO BATCH', 'ENTREGA EXITOSA', 'MAÑANA SE ENTREGA', 'HOY SE ENTREGA', 'NO ENVIADO', 'ENTREGADO A DESTIEMPO'],
                data: arregloData,
                color: colors[1]
            }
        }],
        browserData = [],
        versionsData = [],
        i,
        j,
        dataLen = data.length,
        drillDataLen,
        brightness;


    // Build the data arrays
    for (i = 0; i < dataLen; i += 1) {

        // add browser data
        browserData.push({
            name: categories[i],
            y: data[i].y,
            color: colors[7]
        });

        // add version data
        drillDataLen = data[i].drilldown.data.length;
        for (j = 0; j < drillDataLen; j += 1) {
            brightness = 0.2 - (j / drillDataLen) / 5;
            versionsData.push({
                name: data[i].drilldown.categories[j],
                y: data[i].drilldown.data[j],
                color: Highcharts.Color(colors[j]).brighten(brightness).get()
            });
        }
    }




    // Create the chart
    $('#containerPie').highcharts({
        chart: {
           
            type: 'pie'
        },
        title: {
            text: ''//'REPORTE POR ESTATUS'
        },
        yAxis: {
            title: {
                text: 'Total de Reportes'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '45%'],
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y} ',
                    style: {
                        fontSize: '9px'
                    }
                }
            },
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            var opcion = 0;
                            switch (this.name) {
                                case 'Total': opcion = 0;
                                    break;
                                case 'NO CORRESPONDE PERIODO': opcion = 5;
                                    break;
                                case 'NO LLEGO BATCH': opcion = 4;
                                    break;
                                case 'ENTREGA EXITOSA': opcion = 3;
                                    break;
                                case 'MAÑANA SE ENTREGA': opcion = 7;
                                    break;
                                case 'HOY SE ENTREGA': opcion = 5;
                                    break;
                                case 'NO ENVIADO': opcion = 8;
                                    break;
                                case 'ENTREGADO A DESTIEMPO': opcion = 4;
                                    break;
                            }
                            btnVerInventario_Click(opcion, false);
                        }
                    }
                }
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        exporting: { enabled: false },
        credits: { enabled: false },
        series: [{
            name: 'Reportes',
            data: browserData,
            size: '43%', //30%
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: 'white',
                distance: -30
            }
        }, {

            name: 'Reportes',
            data: versionsData,
            size: '75%', //30%
            innerSize: '50%', //15%, 
            dataLabels: {
                formatter: function () {
                    return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '' : null;
                }
            }
        }]
    });
}


var tableroRegulatorio = {};
tableroRegulatorio = (function (window, undefined) {
    var consts = { var1: "#tblHome", var2: "FIIdPaisCatalogo" }
    var relacion = []
    var sWidth = function () { return relacion[0].Width + "%"; }
    var busca = function (datos, campoBuscar, valorBuscar, variableSalida) {
        if (valorBuscar != null) {
            for (var i = datos.length; i--;) {

                if (datos[i][campoBuscar] === valorBuscar) {
                    variableSalida.push(datos[i]);
                }
            }
        }

    }
    return {
        setPais: function (p) { busca(arrayRel.relacion, consts.var2, p, relacion); },
        getPais: function () { return relacion[0].FIIdPais; },
        setWidth: function () { $(consts.var1).width(sWidth); },
        getFechaActual: function (d) { var fech = "FechaActual" + d; return relacion[0][fech]; },
        getUsuario: function () { var dom = document.getElementById('hUsr'); return dom.value; },
        getReporte: function () { return idReporteG; }
    }
}(window));





var VentanaCalendario = function () {
    var config = { "url": "/Regulatorios/MonitoreoRegulatorios/CalendarioAnual.aspx"}
    return {
        "despliega": function () {
            var self = this;
            var valorHeight = parseInt(document.getElementById("shadows").style.height.substring(0, 3)) > 730 ? 730 : 730;
            var cad = '<div id="divBloqVtnCalendarioProceso" style="width:98%;height:96%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
            cad += '<div style="overflow:none;width:98%;height:95%;" id="divTblCalendario">';
            cad += '<center  style="width:100%;height:100%;text-align: center;">'
            cad += '<iframe id="iframCal" src="' + self.getHost() + config.url;
            cad += '?p=' + tableroRegulatorio.getPais();
            cad += '&r=' + tableroRegulatorio.getReporte();
            cad += '&u=' + tableroRegulatorio.getUsuario();
            cad += '" style="width:100%;height:100%; text-align: center; border:none;" ></iframe>';
            cad +='</center>';
            cad += '</div><input id="btnCal" type="button" value="Grabar" class="classButton" style="padding-left: 10px;padding-right: 10px;" onclick="VentanaCalendario.grabar(this);"/>';

            AgregarVtnFlotante("divVerCalendario", "", "Seleccionar fechas de entregas de acuses", "", cad, valorHeight, 900, false, false, "", "", null);        
            
        },
        "getHost":function(){
            var http = location.protocol;
            var slashes = http.concat("//");
            return 'http://10.63.85.158/SicreNetV2';
            //return slashes.concat(window.location.host);
        },
        "grabar":function(){
            var self= this;            
            WaitingVtn("divBloqVtnCalendarioProceso", true, true, "Grabando Información...");
            setTimeout(self.grabarAjax, 2000);
            setTimeout(self.cerrar, 2000);
            
        },
        "cerrar":function(){
            $("#divVerCalendario").dialog("close")
        },
        "grabarAjax": function () {
            var dom = document.getElementById('iframCal');
            dom.contentWindow.Calendario.datos("graba");
        }
    }
}();

