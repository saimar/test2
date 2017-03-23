function btnAgendaDescargas_Click() {
    var cadena = '<div id="divBloqVtnAgenda" style="margin-top: -11px;width:98%;height:97%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvAgenda" style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;"><table style="width:100%"> <thead style="width:100%"> ';
    cadena += '<tbody> <tr><td style="width:"> Fecha T0: <input type="text" id="txtCalendario1Mes" disabled="disabled"/></td></tr> ';
    cadena += '</tbody>  </table> <br /><div id="dvAgendaFuente" style="width:100%;height:77%;overflow: auto">  </div>' + "<table style='width:100%;height:8%;margin-top: -6px;'><tr style='height:1%'></tr><tr>" + /*" <td style='text-align:left'> <input type='checkbox' id='chkconfirmarAgenda' value='Confirmar Cambios Agenda' />Confirmar Cambios Agenda </td>" */
    "<td style='text-align:left'><input type='button' id='btnCalendarioProceso' onclick='BtnObtenerValoresDefault_Click();' class='classButton' value='Obtener Valores Por Default'/> </td><td style='text-align:right'><input type='button' id='btnCalendarioProceso' onclick='BtnCalendarioProceso_Click(this);' class='classButton'  value='Calendario de Proceso " + (periocidadSelectXUser == "1" ? "Mensual" : (periocidadSelectXUser == "2" ? "Semanal" : "Diario")) + "'/></td></div>";
    arregloItemsAguardar = new Array();
    $("#divVentanaAgendas").empty();
    $("#divVentanaAgendas").show(); $("#divVentanaAgendas").parent().show(); //$(".ui-widget-overlay").show()
    $("#divVentanaAgendas").html(cadena);
    AgregarVtnFlotante("divVentanaAgendas", "", "AGENDA  DE CARGA", "", cadena, 380, 800, false, false, "", "", null);
    $("#divVentanaAgendas").on("dialogclose", function (event, ui) {
        if (arregloItemsAguardar.length > 0) {
            //  $("#divVentanaAgendas").dialog("open");
            if (!pulsoClose) {
                pulsoClose = true; $(".ui-dialog-title").next().attr("style", "display:none");
                WaitingVtn("divBloqVtnAgenda", true, false, "");
                MostrarMsj("¿Desea guardar los cambios efectuados en la Agenda? ", "Mensaje", true, true, true, "Guardar", "No Guardar", "Cancelar", 220, 120,
                    function BtnSiCambiosAgenda() {
                        $("#divVentanaMensajes").dialog("close");
                        WaitingVtn("divBloqVtnAgenda", true, true, "Guardando Información...");
                        indiceArray = 0;
                        GuardaNewDatosRegAgenda(indiceArray);
                        $(".ui-dialog-title").next().removeAttr("style");
                        pulsoClose = false;
                    }, function BtnNoCambiosAgenda() { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnAgenda", false, false, ""); $("#divVentanaAgendas").hide(); $("#divVentanaAgendas").parent().hide(); /*$(".ui-widget-overlay").hide();*/$(".ui-dialog-title").next().removeAttr("style"); pulsoClose = false; }, function BtnCancelar() { pulsoClose = false; $(".ui-dialog-title").next().removeAttr("style"); $("#divVentanaMensajes").dialog("close"); $("#divVentanaAgendas").dialog("open"); WaitingVtn("divBloqVtnAgenda", false, false, ""); });
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnAgenda", false, false, "");
                });
            }
        }
    });
    $("#txtCalendario1Mes").attr("value", fechaP.split(',')[2] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[0]);
    WaitingVtn("divBloqVtnAgenda", true, true, "Cargando Información...");
    ObtieneDatos($("#txtCalendario1Mes"));
}

var indiceArray = 0; var pulsoClose = false;
function GuardaNewDatosRegAgenda(indice) {
    var parametros = { fechaCorte: fechaP.split(',')[0] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[2], periocidad: periocidadSelectXUser, fuente: arregloItemsAguardar[indice].split("&&")[0], DDHHMMSS: arregloItemsAguardar[indice].split("&&")[1] };
    peticionAjax('PanelDeControl.aspx/GuardaDatosEdicionDDHHMMSSAgenda', "POST", parametros,
      function GuardaDatosDDHHMMSS_Finalizada(data) {
          var arrayJSONPG = data.d;
          indiceArray++;
          if (indiceArray < arregloItemsAguardar.length) {
              GuardaNewDatosRegAgenda(indiceArray);

          }
          else {
              WaitingVtn("divBloqVtnAgenda", false, false, ""); $("#divVentanaAgendas").hide(); $("#divVentanaAgendas").parent().hide(); //$(".ui-widget-overlay").show()
              MostrarMsj("Información almacenada exitosamente. ", "Mensaje", false, true, false, "", "Aceptar", "", 250, 100, null, function () { $("#divVentanaMensajes").dialog("close"); /* $(".ui-widget-overlay").hide() */ }, null);
          }

      }, null);
}

function BtnCalendarioProceso_Click(obj) {
    if (periocidadSelectXUser == "3") return;
    WaitingVtn("divBloqVtnAgenda", true, false, "");
    var cadena = '<div id="divBloqVtnCalendarioProceso" style="width:98%;height:95%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><span style="font-weight:bold;font-size:12px">Fechas T0 Tablero de Control ' + (periocidadSelectXUser == "1" ? "Mensual" : (periocidadSelectXUser == "2" ? "Semanal" : "Diario")) + ' </span><div id="dvCalendarioProceso style="width:100%;height:100%;overflow:auto;text-align:center;float:left;">';
    cadena += '<div id="full-year" style="margin-left: 30px;" ></div>';
    AgregarVtnFlotante("divCalendariosProcesos", "", "CALENDARIO DE PROCESO " + (periocidadSelectXUser == "1" ? "MENSUAL" : (periocidadSelectXUser == "2" ? "SEMANAL" : "DIARIO")), "", cadena, 620, 900, false, false, "", "", null);
    var today = new Date();
    var y = today.getFullYear();
    $('#full-year').multiDatesPicker({
      //  minDate: +2, // jQuery UI datepicker option
        dateFormat: "dd/mm/yy",
        addDates: $("#dpFechaPeriodoGral").attr("accesskey").split(","),
        //dateFormat: "dd/mm/yyyy",
        numberOfMonths: [3, 4]
    });
    $(".ui-datepicker-trigger").hide();

    $("#divCalendariosProcesos").on("dialogclose", function (event, ui) {
        if ($('#full-year').multiDatesPicker('getDates').toString() != $("#dpFechaPeriodoGral").attr("accesskey")) {
            WaitingVtn("divBloqVtnCalendarioProceso", true, false, "");
            MostrarMsj("¿Desea guardar los cambios efectuados en el " + "Calendario de Proceso " + (periocidadSelectXUser == "1" ? "Mensual" : (periocidadSelectXUser == "2" ? "Semanal" : "Diario")) + "? ", "Mensaje", true, true, true, "Guardar", "No Guardar", "Cancelar", 260, 140,
                    function BtnSiCambiosCalendario() {
                        $("#dpFechaPeriodoGral").attr("accesskey", $('#full-year').multiDatesPicker('getDates').toString());
                        $("#divVentanaMensajes").dialog("close");
                        WaitingVtn("divBloqVtnAgenda", false, false, "");
                        WaitingVtn("divBloqVtnCalendarioProceso", false, false, "");
                        $(".ui-datepicker-trigger").show();
                    }, function BtnNoCambiosCalendario() { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnAgenda", false, false, ""); $(".ui-datepicker-trigger").show(); }, function BtnCancelar() { $("#divVentanaMensajes").dialog("close"); $("#divCalendariosProcesos").dialog("open"); WaitingVtn("divBloqVtnCalendarioProceso", false, false, ""); $(".ui-datepicker-trigger").hide(); WaitingVtn("divBloqVtnAgenda", true, false, ""); });
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtnCalendarioProceso", false, false, "");
                WaitingVtn("divBloqVtnAgenda", false, false, "");
                $(".ui-datepicker-trigger").show();
            });
        }
        else {
            WaitingVtn("divBloqVtnAgenda", false, false, "");
            $(".ui-datepicker-trigger").show();
        }
    });
}

function terminarWaitVtn() {
    WaitingVtn("divBloqVtnCalendarioProceso", false, false, "");
}

function BtnObtenerValoresDefault_Click() {
    WaitingVtn("divBloqVtnAgenda", true, false, "");
    MostrarMsj("Al obtener los valores por default se perderá el arreglo actual ¿Desea continuar? ", "Mensaje", true, false, true, "Si", "", "No", 280, 120,
            function BtnSiValoresDef() {
                $("#divVentanaMensajes").dialog("close");
                WaitingVtn("divBloqVtnAgenda", true, true, "Cargando valores por default...");
                var parametros = { fechaCorte: fechaP.split(',')[0] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[2], periocidadVC: periocidadSelectXUser };
                peticionAjax("PanelDeControl.aspx/GetValoresCedula", "POST", parametros,
                function GetValoresCedula_Finish(data) {
                    arregloItemsAguardar = new Array();
                    ObtieneDatos($("#txtCalendario1Mes"));
                }, null);
            }, null, function BtnNoValoresDef() { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnAgenda", false, false, ""); });
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtnAgenda", false, false, "");
    });
}

function ObtieneDatos(obj) {
    var parametros = { FechaCorte: $(obj).val().split('/')[2] + "/" + $(obj).val().split('/')[1] + "/" + $(obj).val().split('/')[0], Periodicidad: periocidadSelectXUser, idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/obtieneTabInicialAgenda', "POST", parametros, ObtieneTabla_Finalizada, null);
}

function ObtieneTabla_Finalizada(data) {
    //alert(data.toString());
    var JSON = obtenerArregloDeJSON(data.d, false);
    if (JSON.Status != undefined) {
        alert("No se pudo Generar la actividad, intente mas tarde");
        return;
    }
    var cad = '';
    cad = generarTablaDeRegistrosAgenda(JSON);
    $('#dvAgendaFuente').html(cad);
    WaitingVtn("divBloqVtnAgenda", false, false, "");
}


function generarTablaDeRegistrosAgenda(listaDeJSON) {
    var encabezadoAux = '';
    var cad = '<center><table id="tblContenidoproyectos" width="100%" class="dataGridDatos">';

    cad += '<thead>';
    cad += '<tr valign="top">';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados != "id") {
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
            if (element != "id") {
                if (element == "PREDEFINIDO T0+ DD,HH:MM:SS") {
                    cad += '<td id="tdEditDDHHMMSS_' + json.id + '" lang="aa"' + /*'ondblclick="HabilitarEdicionDDHHMMSS(this)"'*/'style="width:35%;text-align:center"><div id="divOrig_' + json.id + '">';
                    cad += json[element] + "</div>";
                    cad += '<div id="divEdit_' + json.id + '" style="background-color:#dddddd;display:none">&nbsp;&nbsp;';
                    cad += 'DD <input maxlength="2" id="txtDDAgenda_' + json.id + '" value="' + json[element].split(',')[0] + '" style="background-color:White;color:Black; width:17px; text-align:center; border: none; " />&nbsp;<b>,</b>&nbsp;';
                    cad += 'HH <input maxlength="2" id="txtHHAgenda_' + json.id + '" value="' + json[element].split(',')[1].split(":")[0] + '"  style="background-color:White;color:Black; width:17px; text-align:center; border: none; " />&nbsp;<b>:</b>&nbsp;';
                    cad += 'MM <input maxlength="2" id="txtMMAgenda_' + json.id + '" value="' + json[element].split(',')[1].split(":")[1] + '"  style="background-color:White;color:Black;  width:17px; text-align:center; border: none; " />&nbsp;<b>:</b>&nbsp;';
                    cad += 'SS <input maxlength="2" id="txtSSAgenda_' + json.id + '" value="' + json[element].split(',')[1].split(":")[2] + '"  style="background-color:White;color:Black; width:17px; text-align:center; border: none; " />';
                    cad += '</div>';
                    cad += ' <img id="img_' + json.id + '" lang="aa" onclick="HabilitarEdicionDDHHMMSS(this) " src="../../Images/PanelDeControl/edit.png" style="height: 20px;width: 15px;margin: -50% 0% 2% 90%;" />' + '</td>';
                }
                else {
                    cad += '<td style="text-align:' + (element == "CARTERA" ? 'left"' : 'center"') + '>';
                    cad += json[element];
                    cad += '</td>';
                }
            }
        }
        cad += '</tr>';
    }

    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}

var objUltimoEdit = null;
function HabilitarEdicionDDHHMMSS(obj) {
    switch ($(obj).attr("lang")) {
        case "aa":
            if (objUltimoEdit != null) {
                $("#divOrig_" + $(objUltimoEdit).attr("id").split("_")[1]).show(); $("#divEdit_" + $(objUltimoEdit).attr("id").split("_")[1]).hide(); $(objUltimoEdit).attr("lang", "aa");
                GuardaDatosDDHHMMSS(objUltimoEdit)
            }
            document.getElementById($(obj).attr("id")).setAttribute('src', '../../Images/PanelDeControl/refreshG.png');
            document.getElementById($(obj).attr("id")).style.width = '20px';
            $("#divOrig_" + $(obj).attr("id").split("_")[1]).hide(); $("#divEdit_" + $(obj).attr("id").split("_")[1]).show(); $(obj).attr("lang", "ab");
            objUltimoEdit = obj;
            break;
        case "ab": $("#divOrig_" + $(obj).attr("id").split("_")[1]).show(); $("#divEdit_" + $(obj).attr("id").split("_")[1]).hide(); $(obj).attr("lang", "aa");
            GuardaDatosDDHHMMSS(obj);
            objUltimoEdit = null;
            break;
    }
}

var arregloItemsAguardar;
function GuardaDatosDDHHMMSS(obj) {

    var T0DD = trim($('#txtDDAgenda_' + $(obj).attr("id").split("_")[1]).val(), ''); var T0HH = trim($('#txtHHAgenda_' + $(obj).attr("id").split("_")[1]).val(), ''); var T0MM = trim($('#txtMMAgenda_' + $(obj).attr("id").split("_")[1]).val(), ''); var T0SS = trim($('#txtSSAgenda_' + $(obj).attr("id").split("_")[1]).val(), '');
    var DDHHMMSS = (T0DD.length == 2 ? T0DD : T0DD.length == 1 ? "0" + T0DD : "00") + ',' + (T0HH.length == 2 ? T0HH : T0HH.length == 1 ? "0" + T0HH : "00") + ':' + (T0MM.length == 2 ? T0MM : T0MM.length == 1 ? "0" + T0MM : "00") + ':' + (T0SS.length == 2 ? T0SS : T0SS.length == 1 ? "0" + T0SS : "00")
    var IdFuenteObt = parseInt($(obj).attr("id").split("_")[1]);

    if (document.getElementById("divOrig_" + $(obj).attr("id").split("_")[1]).textContent != DDHHMMSS) {
        WaitingVtn("divBloqVtnAgenda", true, true, "Recalculando Fecha Descarga..");
        var parametros = { fechaCorte: fechaP.split(',')[0] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[2], valorEdit: DDHHMMSS };
        peticionAjax("PanelDeControl.aspx/RecalculaFechaAgendaFuenteEdit", "POST", parametros,
            function RecalculaFechaAgendaFuenteEdit_Finish(resultXS) {
                $('#txtDDAgenda_' + $(obj).attr("id").split("_")[1]).attr("value", DDHHMMSS.split(",")[0]);
                $('#txtHHAgenda_' + $(obj).attr("id").split("_")[1]).attr("value", DDHHMMSS.split(",")[1].split(":")[0]);
                $('#txtMMAgenda_' + $(obj).attr("id").split("_")[1]).attr("value", DDHHMMSS.split(",")[1].split(":")[1]);
                $('#txtSSAgenda_' + $(obj).attr("id").split("_")[1]).attr("value", DDHHMMSS.split(",")[1].split(":")[2]);
                document.getElementById("divOrig_" + $(obj).attr("id").split("_")[1]).textContent = DDHHMMSS;

                $("#divOrig_" + $(obj).attr("id").split("_")[1]).attr("style", "color:Orange");
                document.getElementById($("#divOrig_" + $(obj).attr("id").split("_")[1]).parents().attr("id")).nextSibling.style.color = "Orange";
                document.getElementById($("#divOrig_" + $(obj).attr("id").split("_")[1]).parents().attr("id")).nextSibling.innerHTML = resultXS.d;
                if (ExisteItemEnArreglo(IdFuenteObt, arregloItemsAguardar))
                    arregloItemsAguardar[DevuelveIndiceDeElementoExistente(IdFuenteObt, arregloItemsAguardar)] = IdFuenteObt + "&&" + DDHHMMSS;
                else
                    arregloItemsAguardar.push(IdFuenteObt + "&&" + DDHHMMSS);
                $("#chkconfirmarAgenda").attr("checked", "checked");
                document.getElementById($(obj).attr("id")).setAttribute('src', '../../Images/PanelDeControl/edit.png');
                document.getElementById($(obj).attr("id")).style.width = '15px';
                WaitingVtn("divBloqVtnAgenda", false, false, "Recalculando Fecha Descarga..");
            }, null);
    }
    else {
        document.getElementById($(obj).attr("id")).setAttribute('src', '../../Images/PanelDeControl/edit.png');
        document.getElementById($(obj).attr("id")).style.width = '15px';
    }
}


