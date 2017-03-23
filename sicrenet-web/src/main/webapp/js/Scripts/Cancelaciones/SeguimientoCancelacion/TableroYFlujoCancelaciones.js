var PaisSelectXUser = "";
var mesAñoActual = "";
var perfil = "";
function cargarPeriodo() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("TableroYFlujo.aspx/GetAñoMesActualYPerfil", "POST", null, function (dataF) {
        mesAñoActual = dataF.d.split("%%&&")[0];
        perfil = dataF.d.split("%%&&")[1];
        CargaAñoMes();
    });
}


var JSONAM = null;
function CargaAñoMes() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('TableroYFlujo.aspx/getPeriodosSeguimientoCancelaciones', "POST", { idPais: PaisSelectXUser }, function (data1) {
        if (data1.d.indexOf("ErrorCATCH") == -1) {
            if (data1.d == "" || data1.d == null) {
                Waiting(false, "Espere por favor. Cargando Información...");
                $("#lblMensajeHerramienta").html("No Existen Periodos. Generé el Seguimiento de Cancelación en el Calendario de Trabajo");
                return;
            }
            $("#lblMensajeHerramienta").hide();
            document.getElementById("divMainG").style.visibility = "visible";
            document.getElementById('sltAnio').options.length = 0;
            JSONAM = obtenerArregloDeJSON(data1.d, false);
            var anioS = "";
            for (var i = 0; i < JSONAM.length; i++) {
                if (i == 0) anioS = JSONAM[i]["periodo"].substring(0, 4);
                if (!verificaExisteItemSltAño(JSONAM[i]["periodo"].substring(0, 4))) {
                    var opt = document.createElement('option');
                    opt.value = JSONAM[i]["periodo"].substring(0, 4);
                    opt.innerHTML = JSONAM[i]["periodo"].substring(0, 4);
                    document.getElementById('sltAnio').appendChild(opt);
                }
            }
            $("#sltAnio").val(mesAñoActual.split('/')[1]);

            SelectionChangeSltAnio_CambiarMesDeAnio($("#sltAnio").val());
        }
        else {
            MostrarMsj(data1.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    }, null);
}

function SelectionChangeSltAnio_CambiarMesDeAnio(valor) {
    var Meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    document.getElementById('sltMes').options.length = 0;
    var opcion = new Option("-- Seleccione el Mes --", -1);
    document.getElementById('sltMes').options[document.getElementById('sltMes').options.length] = opcion;
    var valorMesSelect = "";
    for (var i = 0; i < JSONAM.length; i++) {
        if (JSONAM[i]["periodo"].substring(0, 4) == valor) {
            var opt = document.createElement('option');
            opt.value = JSONAM[i]["periodo"].substring(4, 6);
            opt.innerHTML = Meses[parseInt(JSONAM[i]["periodo"].substring(4, 6)) - 1];
            document.getElementById('sltMes').appendChild(opt);
            if (i == JSONAM.length - 1)
                valorMesSelect = JSONAM[i]["periodo"].substring(4, 6)
        }
    }
    $("#sltMes").val(mesAñoActual.split('/')[0]);
    if ($("#sltMes").val() == -1) $("#sltMes").val(valorMesSelect);
    if ($("#sltMes").val() != -1)
        SelectionChangeSltAnio_CargarTabla($("#sltMes"));
    //Waiting(false, "Espere por favor. Cargando Información...");
}

function verificaExisteItemSltAño(valor) {
    var existe = false;
    for (var i = 0; i < document.getElementById('sltAnio').options.length; i++) {
        if (document.getElementById('sltAnio').options[i].value == valor) {
            existe = true;
            break;
        }
    }
    return existe;
}

function SelectionChangeSltAnio_CargarTabla(obj) {
    $("#divSeguimientoCan").hide();
    $("#lblError").html("");
    $("#AdjResultsDiv").html("");
    $("#divEncabezado").html("");
    $("#divEtapas").html("");
    if ($(obj).val() != -1) {
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("TableroYFlujo.aspx/Cargar", "POST", { actualizacion: false, numActividad: 0, semaforo: 0, idE: "", isCheck: "0", sltAño: $("#sltAnio").val(), sltMes: $("#sltMes").val(), sltMesVal: document.getElementById("sltMes").options[document.getElementById("sltMes").selectedIndex].text }, function (data) {
            if (data.d.indexOf("ErrorCATCH") == -1) {
                if (data.d.indexOf("lblError") == -1) {
                    var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                    $("#AdjResultsDiv").html(generarTablaTableroYflujo(JSON));
                    $("#divSeguimientoCan").show();
                    $("#divEtapas").html(data.d.split("%%&&")[1]);
                    AgregaEncabezadoEstaticoTableroYFlujo();
                }
                else {
                    $("#lblError").html(data.d.split(':')[1]);
                    document.getElementById("lblError").style.color = "Red";
                }
            }
            else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            setTimeout(terminarWait, 400);
            //Waiting(false, "Espere por favor. Cargando Información...");
        });
    }
    else {
        document.getElementById("lblError").style.color = "Red";
        $("#lblError").html("Seleccione un Periodo valido.");
    }
}

function generarTablaTableroYflujo(listaDeJSON) {
    var cad = '';
    cad += '<div id="divTablaMain" style="height:100%;"><table id="tblDatosMain_TableroYFlujo" style="width:100%;font-size: 11px;">';
    //    cad += '<thead>';
    //    cad += '<tr>';
    //    cad += '<th style="text-align: center;">N°</th>';
    //    cad += '<th style="text-align: center;">Actividad</th>';
    //    cad += '<th style="text-align: center;">Área Responsable</th>';
    //    cad += '<th style="text-align: center;">Fecha Límite</th>';
    //    cad += '<th style="text-align: center;"></th>';
    //    cad += '<th style="text-align: center;">Estado</th>';
    //    cad += '<th style="text-align: center;">Fecha Termino</th>';
    //    cad += '<th style="text-align: center;">Semáforo</th>';
    //    cad += '<th style="text-align: center;">Comentario</th>';
    //    cad += '</tr>';
    //    cad += '</thead>';
    cad += '<tbody>';

    if (listaDeJSON.length > 0 && listaDeJSON[0] != null) {
        for (var filas = 0; filas < listaDeJSON.length; filas++) {
            cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';

            cad += '<td style=" width:3%; text-align:center;' + (listaDeJSON[filas].Estatus == "True" ? 'background: rgb(232, 232, 232);' : '') + '">' + listaDeJSON[filas].noActividad + '</td>';
            cad += '<td style=" width:20%; text-align:left;' + (listaDeJSON[filas].Estatus == "True" ? 'background: rgb(232, 232, 232);' : '') + '" class="' + listaDeJSON[filas].classEnvioMailGral + '" title="' + listaDeJSON[filas].envioMailGral + '">' + listaDeJSON[filas].Actividad + '</td>';
            cad += '<td style=" width:20%; text-align:left;' + (listaDeJSON[filas].Estatus == "True" ? 'background: rgb(232, 232, 232);' : '') + '">' + listaDeJSON[filas].AResponsable + '</td>';
            cad += '<td style=" width:7%; text-align:center;' + (listaDeJSON[filas].Estatus == "True" ? 'background: rgb(232, 232, 232);' : '') + '">' + listaDeJSON[filas].FechaLimite + '</td>';
            cad += '<td style=" width:3%; text-align:center;cursor:alias;' + (listaDeJSON[filas].Estatus == "True" ? 'background: rgb(232, 232, 232);' : '') + '" ' + (listaDeJSON[filas].Estatus == "True" ? ' title="Estatus:Terminada." ' : ' title="Estatus:Pendiente."') + '>'
            + '<input ' + " alt='" + listaDeJSON[filas].Actividad + "' " + ' type="checkbox" ' + (listaDeJSON[filas].Estatus == "True" ? ' checked="checked" ' : ' ') /*+ (listaDeJSON[filas].Habilitar == "False" ? ' disabled="disabled" ' : '')*/
            + '  onclick="chk_OnCheck(this,\'' + listaDeJSON[filas].IDEtapa + '\',\'' + listaDeJSON[filas].FechaReal + '\',\'' + listaDeJSON[filas].noActividad + '\',\'' + listaDeJSON[filas].ID + '\',\'' + listaDeJSON[filas].IDAResponsable + '\',\'' + listaDeJSON[filas].classEnvioMailGral + '\');">' + '</td>';
            cad += '<td style=" width:7%; text-align:center;' + (listaDeJSON[filas].Estatus == "True" ? 'background: rgb(232, 232, 232);' : '') + '">' + listaDeJSON[filas].Estado + '</td>';
            cad += '<td style=" width:7%; text-align:center;' + (listaDeJSON[filas].Estatus == "True" ? 'background: rgb(232, 232, 232);' : '') + '">' + listaDeJSON[filas].FechaReal + '</td>';
            cad += '<td style=" width:3%; text-align:center;cursor:alias;' + (listaDeJSON[filas].Estatus == "True" ? 'background: rgb(232, 232, 232);' : '') + '" ' + (listaDeJSON[filas].FilePath.indexOf("rojo") != -1 ? ' title="Autorización excedida a la Fecha Límite." ' : (listaDeJSON[filas].FilePath.indexOf("verde") != -1 ? ' title="Autorización en Tiempo." ' : 'title="Pendiente por Autorizar." ')) + '>'
            + '<img src="' + listaDeJSON[filas].FilePath + '" style="height:20px;width:20px;"/>' + '</td>';
            cad += '<td style=" width:15%; text-align:left;' + (listaDeJSON[filas].Estatus == "True" ? 'background: rgb(232, 232, 232);' : '') + '">' + listaDeJSON[filas].Comentario + '</td>';
            cad += '</tr>';
        }
        cad += '</tbody>';
        cad += '</table></div>';
    }
    return cad;
}

function AgregaEncabezadoEstaticoTableroYFlujo() {
    var arrayEncabezados = new Array("N°", "Actividad", "Área Responsable", "Fecha Límite", "", "Estado", "Fecha Termino", "Semáforo", "Comentario");
    var cad = '<div id="divEncabezado"  style="">';
    cad += '<table id="tblEncabezado_TableroYFlujo" style="width: 100%;">  <tbody>';
    cad += '<tr style="font-weight: bold; text-shadow: 2px 1px 1px black; font-size: 9px;height:25px;">';
    for (var i = 0; i < arrayEncabezados.length; i++) {
        cad += '<td style="white-space: pre-wrap;text-align: center; background: rgb(0, 128, 128);color: rgb(255, 255, 255);padding-bottom: 4px;';
        cad += "width:" + (document.getElementById('tblDatosMain_TableroYFlujo').rows[0].cells[i].offsetWidth + (i == arrayEncabezados.length - 1 ? (document.getElementById("AdjResultsDiv").scrollHeight <= 458 ? -2 : 15) : "")) + "px";
        cad += '">';
        cad += arrayEncabezados[i];
        cad += '</td>';
    }
    cad += '</tr></tbody></table></div>';
    $("#divEncabezado").html(cad);
}

//function chk_OnCheck(obj, idEtapa, fecReal, idActividadConsecutivo, idActividadReal, IDAResponsable, classEnvioMailGral) {
//    var descripcionActividad = $(obj).attr("alt");
//    if (perfil != "1") {
//        var esBtnNo = false; var esBtnSi = false; var entroClose = false;
//        MostrarMsj("¿Desea cambiar el Estatus de la Actividad <span style='font-weight:bold;'>" + descripcionActividad + "</span>? ", "Mensaje SicreNet", true, false, true, "Si", "", "No", 280, 130,
//            function BtnSi() {
//                esBtnSi = true;
//                $("#divVentanaMensajes").dialog("close");
//                Waiting(true, "Espere por favor. Cargando Información...");
//                peticionAjax("TableroYFlujo.aspx/cambiarStatus_OnChecked", "POST", { isChecked: $(obj).is(":checked"), idEtapa: idEtapa, fecReal: fecReal,
//                    idActividadConsecutivo: idActividadConsecutivo, idActividadReal: idActividadReal, IDAResponsable: IDAResponsable,
//                    classEnvioMailGral: classEnvioMailGral, sltAnio: $("#sltAnio").val(), sltMes: $("#sltMes").val()
//                }, function (data) {
//                    if (data.d.indexOf("ErrorCATCH") == -1) {
//                        if (data.d == "")
//                            SelectionChangeSltAnio_CargarTabla($("#sltMes"));
//                    }
//                    else {
//                        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
//                        Waiting(false, "Espere por favor. Cargando Información...");
//                    }
//                });

//            }, null, function BtnNo() {
//                esBtnNo = true; 
//                $("#divVentanaMensajes").dialog("close");
//            });
//        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
//            if ((esBtnNo || !esBtnSi) && !entroClose) {
//                $(obj).attr("checked", $(obj).is(":checked") ? false : true);
//                entroClose = true;
//            }
//        });
//    }
//    else {
//        MostrarMsj("No tiene permiso para cambiar el Estatus de Actividades", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
//        $(obj).attr("checked", $(obj).is(":checked") ? false : true);
//    }
//}// 


function chk_OnCheck(obj, idEtapa, fecReal, idActividadConsecutivo, idActividadReal, IDAResponsable, classEnvioMailGral) {
    if (perfil != "1") {
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("TableroYFlujo.aspx/cambiarStatus_OnChecked", "POST", { isChecked: $(obj).is(":checked"), idEtapa: idEtapa, fecReal: fecReal,
            idActividadConsecutivo: idActividadConsecutivo, idActividadReal: idActividadReal, IDAResponsable: IDAResponsable,
            classEnvioMailGral: classEnvioMailGral, sltAnio: $("#sltAnio").val(), sltMes: $("#sltMes").val()
        }, function (data) {
            if (data.d.indexOf("ErrorCATCH") == -1) {
                if (data.d == "")
                    SelectionChangeSltAnio_CargarTabla($("#sltMes"));
            }
            else {
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        });
    }
    else {
        MostrarMsj("No tiene permiso para cambiar el Estatus de Actividades", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        $(obj).attr("checked", $(obj).is(":checked") ? false : true);
    }
}