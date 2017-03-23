var total = 0;
var cadTituloAux = '';
var totalTitulo = 0;
var mostrar = false;
var mostrarHistorico = false;
var cadAux = '';
var band = false;
var fechaAux = "";
var raprocesoAux = 0;
var arrayIdsTdSemaforoN1 = new Array();
var arrayIdsTdSemaforoN2 = new Array();
var valorSemaforoN1 = "WARNING";
var valorSemaforoN2 = "WARNING";

function cargaIncialAnalisis() {
    $("#lblMensajeHerramienta").hide();
    GetValidacionesTablero();
}

function GetValidacionesTablero() {
    Waiting(true, "Cargando Información...");
    peticionAjax('AnalisisInformacion.aspx/GetValidacionesTablero', "POST", null,
            function (data) {
                var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                total = JSON.length;
                var JSONSubLista = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                if (JSON[0] != null) {
                    var cadena = "";
                    cadena = creaTablaIzquierda(JSON);
                    creaTablaDerecha(JSONSubLista, total, cadena, JSON);
                }
                else
                    MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }, null);
}

function creaTablaDerecha(JSONSubLista, total, cadena, JSON) {
    var cad = '';
    peticionAjax('AnalisisInformacion.aspx/GetValidacionesTablero_Contenido', "POST", null,
       function (data) {
           if (data.d != "" || data.d != "Error" || data.d != null) {
               var JSONListaTitulos = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
               var JSONFechas = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
               var JSONTotales = obtenerArregloDeJSON(data.d.split("%%&&")[2], false);
               totalTitulo = JSONListaTitulos.length;
               cadTituloAux = '';
               cad += '<div class="scroll_horizontal_right2" style="width:' + (parseInt($(window).width()) - 660) + 'px">';
               cad += '<div id="divTablaContenido" style="width: 68750px;">';
               cad += '<table id="tablaContenido" cellpadding="0" cellspacing="0">';
               cad += '    <thead  class="clsEstatico1">';
               //***************************** Crea el titulo del contenido derecho **********************************************
               cad += '        <tr class="propTablaTituloDerecho2">';
               for (var i = 0; i < JSONSubLista.length; i++) {
                   cadTituloAux += '            <th class="tdCA' + i + '" style = "width: 220px; height:22px; display:normal ">' + JSONSubLista[i].ID + ' ' + JSONSubLista[i].DESC + '</th>';
               }
               cad += cadTituloAux;

               cad += '        </tr>';
               cad += '    </thead>';
               cad += '    <tbody  class="clsEstatico2">';
               //******************************************************************************************************************
               var cont = 0;
               if (JSONFechas.length > 1) {
                   for (var j = 0; j < JSONFechas.length; j++) {
                       cont = 0;
                       cad += (j % 2 == 0) ? '<tr style="font: bold 11px/normal Helvetica, Arial, sans-serif; width: 220px; height: 22px; font-size-adjust: none; font-stretch: normal;" class="propTablaContenidoDerecho2">' : '<tr  style="font: bold 11px/normal Helvetica, Arial, sans-serif; width: 220px; height: 22px; font-size-adjust: none; font-stretch: normal;" class="propTablaContenidoDerecho2_1">';
                       for (var i = 0; i < JSONTotales.length; i++) {
                           if (JSONTotales[0] != null) {
                               if (JSONTotales[i].FECHA == JSONFechas[j].Fecha) {
                                   for (var x = cont; x < JSONListaTitulos.length; x++) {
                                       if (parseInt(JSONTotales[i].IDCOLUMNA) + 1 == JSONListaTitulos[x].Clave) {
                                           cad += '<td class="tdCA' + x + '" style="font: 11px Helvetica,Arial,sans-serif; cursor: pointer; font-weight:bold; width: 220px; height:22px; display:normal" onclick="btnVerReporte_Click(this,\'' + JSONTotales[i]["FECHA"] + "\',\'" + JSONFechas[j]["iProceso"] + "\',\'" + JSONTotales[i]["IDCOLUMNA"] + '\');"' + ">" + JSONTotales[i].TOTAL + '</td>';
                                           cont += 1;
                                           break;
                                       }
                                       else {
                                           cad += '<td class="tdCA' + x + '">-</td>';
                                       }
                                       cont += 1;
                                   }
                               }
                           }
                           else {
                               for (var x = 0; x < JSONListaTitulos.length; x++) {
                                   cad += '<td class="tdCA' + x + '" style="font: 11px Helvetica,Arial,sans-serif; font-weight:bold; width: 220px; height:22px; display:normal">-</td>';
                               }
                               cont = JSONListaTitulos.length;
                           }
                       }
                       if (cont < JSONListaTitulos.length) {
                           for (var aux = cont; aux < JSONListaTitulos.length; aux++) {
                               cad += '<td class="tdCA' + aux + '">-</td>';
                           }
                       }
                       cad += '</tr> \t';
                   }
               }

               cad += '<tr  style="height: 22px; font-size-adjust: none; font-stretch: normal;">';
               for (var x = 0; x < JSONListaTitulos.length; x++) {
                   cad += '<td class="tdCA' + cont + x + 1 + '" style="background:white; font: 11px Helvetica,Arial,sans-serif; font-weight:bold; width: 220px; height:22px; display:normal"></td>';
               }
               cad += '</tr>';
               cad += '    </tbody>';
               cad += '</table>';
               cad += '</div>';
               cad += '</div>';
               cad += '</div>';

               cad += ' <script type="text/javascript">';
               cad += ' Dropzone.autoDiscover = false;';

               for (var i = 0; i < total; i++) {
                   cad += ' $(document).ready(function () {';
                   cad += ' $("#dZUpload' + i + '").dropzone({';
                   cad += ' url: "DragAndDrop.ashx",';
                   cad += ' maxFiles: 10,';
                   cad += ' addRemoveLinks: true,';
                   cad += ' success: function (file, response) {';
                   cad += '          almacenaArchivoDragAndDrop()';
                   cad += ' }, error: function (file, response) {';
                   cad += '            MostrarMsj("Ocurrio un error al cargar el archivo", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);';
                   cad += ' context.Response.Write(str_image);';
                   cad += ' }';
                   cad += ' });';
                   cad += ' });';
               }

               cad += ' $(document).ready(function () {';
               cad += ' $("#tblDatosRepReg tr").hover(function () {';
               cad += ' $(this).addClass("hover");';
               cad += ' var status; status += $(this).attr("id");';
               cad += ' $.ajax({';
               cad += ' type: "POST",';
               cad += ' url: "DragAndDrop.ashx",';
               cad += ' data: { nSerie: $(this).attr("id") },';
               cad += ' dataType: "json",';
               cad += ' success: function (response) { }';
               cad += ' });';
               cad += ' }, function () { });';
               cad += ' });';
               cad += ' </script>';

               cadena += cad;

               $("#divTblCatValidaciones").html(cadena);
               refrescaInformacion();
               $(".clsEstatico2").css("max-height", screen.height - 370 + "px");
           }
           else
               MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
       }, null);
}

function creaTablaIzquierda(JSON) {
    var cad = '';

    cad += '<div class="content" style="background-color:rgba(241, 238, 238, 1); color:black; height:50px; display:inline-table; vertical-align:bottom;">';
    cad += '        <div style="margin-left:25px; margin-top:10px; display:block; float:left; vertical-align:middle; font: 20px Segoe UI, Verdana, Helvetica, Sans-Serif;">Analisis de información del archivo SIC 300</div>';
    cad += '        <div style="margin-top:15px; width:300px;float:right;">';
    cad += '            <div id="divMostrarOcultar" style="margin-right:10px; display: table-cell; float: right; vertical-align: middle; border-radius: 5px; font: 11px Segoe UI, Verdana, Helvetica, Sans-Serif; overflow: auto; height: 20px; width: 120px; text-align: center; color: white; background: rgb(5, 95, 95); cursor: pointer;" onclick="btnOcultarColumnas_Click(this);">Ocultar Columnas </div>';
    cad += '            <div style="display: table-cell; float: right; vertical-align: middle; border-radius: 5px; overflow: auto; height: 20px; width: 15px; text-align: center;"></div>';
    cad += '            <div id="divAgregarFecha" style="display: table-cell; float: right;  border-radius: 5px; font: 11px Segoe UI, Verdana, Helvetica, Sans-Serif; height: 20px; width: 90px; text-align: center; color: white; background: rgb(5, 95, 95); cursor: pointer;" onclick="btnAgregarFecha();">Agregar fecha </div>';
    cad += '        </div>';
    cad += '</div>';

    cad += '<div class="scroll_vertical2" style="width:' + (parseInt($(window).width()) - 40) + 'px; height:auto;">';
    cad += '<div class="scroll_horizontal_left2" style="height:auto; ">';
    cad += '<table id="tblDatosRepReg" style="width:570px;  height:auto; " cellpadding="0" cellspacing="0">';
    cad += '<thead  class="clsEstatico1">';
    cad += '     <tr class="propTablaTitulo2">';
    cad += '        <th style="width: 70px;">FECHA</th>';
    cad += '        <th style="width: 90px;" ><div style="display:table-cell; vertical-align:middle; border-radius: 5px;  overflow: auto;  height:20px; width: 80px; background: #309F97; cursor:pointer;"  onClick="EvaluarRecursivo(this);"> EVALUAR </div></th>';
    cad += '        <th style="width: 200px;">ULTIMO ARCHIVO CARGADO</th>';
    cad += '        <th style="width: 80px;">CARGAS ANTERIORES</th>';
    cad += '        <th style="width: 80px;">REPORTES</th>';
    cad += '        <th style="width: 80px;">TOTAL</th>';
    cad += '    </tr>';
    cad += '</thead>';
    cad += '<tbody  class="clsEstatico2">';
    for (var i = 0; i < JSON.length; i++) {
        cad += (i % 2 == 0) ? '<tr  class="propTablaContenidoDerecho2">' : '<tr  class="propTablaContenidoDerecho2_1">';
        cad += '        <td style="height:22px; width:580px;" colspan="6" >';
        cad += '           <div class="divDetalle" style="height:22px; width:580px; text-align: center;">';
        cad += '             <table class="clsContenidoArchivos" style="width:570px; text-align: center;" cellpadding="0" cellspacing="0">';
        cad += '                <tr>';
        cad += '                        <td id="td' + i + '" style="width:50px;  margin:auto; ">' + JSON[i].DESC + '</td>';
        cad += '                        <td style="width:100px; margin:auto; ">';
        cad += '                            <div id="dZUpload' + i + '" class="dropzone" style="width: 100px;  height:20px;" >';
        cad += '                                 <div class="dz-default dz-message" style="width: 100px;  height:20px;">';
        cad += '                                        <table cellpadding="0" cellspacing="0" style="height:20px; width: 100px;" border="0" >';
        cad += '                                            <tr class="row_DG" id="' + JSON[i].DESC + '">';
        cad += '                                                 <td style="text-align: center; white-space: normal; height:20px; width: 100px;">Arrastrar archivo</td>';
        cad += '                                            </tr>';
        cad += '                                        </table>';
        cad += '                                 </div>';
        cad += '                            </div>';
        cad += '                        </td>';
        cad += '                    <td id= "div' + JSON[i].ID + '" style="width:200px "></td>';
        cad += '                    <td id="Div_CargaAnterior' + JSON[i].ID + '"title="Ver incidencias anteriores" style="width:80px"></td>';
        cad += '                    <td id="Div_Reporte' + JSON[i].ID + '" title="Ver incidencias" style="width:60px"></td>';
        cad += '                    <td id="div_numero' + JSON[i].ID + '" title="Descargar todas las incidencias" style="width:50px; text-align: center;  cursor:pointer; text-decoration: underline; color: blue;"></td>';
        cad += '                </tr>';
        cad += '             </table>';
        cad += '           </div>';
        cad += '        </td>';
        cad += '    </tr>';
    }
    cad += '<tr class="propTablaContenidoDerecho2" style="height:23px; color: white; font: 11px Helvetica,Arial,sans-serif;">';
    cad += '    <td style="width: 70px; background: white;"></td>';
    cad += '    <td style="width: 90px; background: white;"></td>';
    cad += '    <td style="width: 200px; background: white;"></td>';
    cad += '    <td style="width: 80px; background: white;"></td>';
    cad += '    <td style="width: 80px; background: rgba(5, 95, 95, 1);" >Total: </td>';
    cad += '    <td id="tdTotal"style="width: 80px; background:rgba(5, 95, 95, 1); text-decoration: underline; cursor:pointer;" onclick="Descarga_todos_Registros();";>-</td>';
    cad += '</tr>';

    cad += '</tbody>';
    cad += '</table>';
    cad += '</div>';
    return cad;
}

function refrescaInformacion() {
    peticionAjax('AnalisisInformacion.aspx/refrescaInformacion', "POST", null,
               function (data) {
                   if (data.d != "") {
                       var total = 0;
                       var JSON = obtenerArregloDeJSON(data.d, false);
                       for (var filas = 0; filas < JSON.length; filas++) {
                           var fecha = JSON[filas].FechaAlta.split('/')[2].split(' ')[0] + '-' + JSON[filas].FechaAlta.split('/')[1] + '-' + JSON[filas].FechaAlta.split('/')[0]
                           $('#div' + JSON[filas].IDSic).html(parseInt(JSON[filas].FIReproceso) + 1 + ' - ' + JSON[filas].FVCNombreArchivo + JSON[filas].FVCExtension + '/' + fecha + '/' + JSON[filas].FVCTamanio);
                           $('#Div_Reporte' + JSON[filas].IDSic).html('<div style="display:table-cell; vertical-align:middle; border-radius: 5px; overflow:auto; height:20px; width: 60px; background: #309F97; color:white; cursor:pointer;" onClick="btnVerReporte_Click(this, ' + JSON[filas].fnFechaDelReporte + ', ' + JSON[filas].FIReproceso + ', -1);">Ver</div>');
                           $('#Div_CargaAnterior' + JSON[filas].IDSic).html('<div style="display:table-cell; vertical-align:middle; border-radius: 5px;  overflow: auto;  height:20px; width: 60px; background: #309F97; color:white; cursor:pointer;"  onClick="btnVerAnteriores_Click(this, ' + JSON[filas].fnFechaDelReporte + ', ' + JSON[filas].FIReproceso + ');">Ver</div>');
                           $('#div_numero' + JSON[filas].IDSic).html(JSON[filas].cantidad);
                           $('#div_numero' + JSON[filas].IDSic).attr('onClick', 'DescargaTodosRegistrosTXT(this, \'' + JSON[filas].fnFechaDelReporte + '\', \'' + JSON[filas].FIReproceso + '\');');
                           total += parseInt(JSON[filas].cantidad);
                       }
                       $('#tdTotal').html(total);
                   }
                   $('.clsEstatico2').scroll(function () {
                       $('.clsEstatico2').scrollTop($(this).scrollTop());
                   })

                   Waiting(false, "Cargando Información...");
               }, null);
}

function CreaTablaHistorialDetalle(JSON, cadena) {
    var cad = '';
    cadAux = '';
    cad += cadena;
    cad += ' <div id="divMostrarOcultarHistorico" style="display:table-cell; float: right; vertical-align:middle; border-radius: 5px; font: 11px Segoe UI, Verdana, Helvetica, Sans-Serif; overflow: auto;  height:20px; width: 120px; text-align: center; color:white; background: rgb(43, 151, 151); cursor:pointer;"  onClick="btnOcultarColumnasHistorico_Click(this);"> Ocultar Columnas </div>';
    cad += ' <div style="height:350px; width:1210px;">';

    cad += '<div class="scroll_vertical" style="width:' + (parseInt($(window).width()) - 80) + 'px; height: auto; ">';
    cad += ' <div class="scroll_horizontal_left">';
    cad += ' <table cellpadding="0" cellspacing="0" style="width:554px;">';
    cad += '      <thead class="clsEstatico3">';
    cad += '          <tr class="propTablaTitulo">';
    cad += '              <th colspan="2" style="width:410px;">' + devuelveFecha(JSON[0].FECHA) + '</th>';
    cad += '              <th style="width:90px;">Reporte</th>';
    cad += '              <th style="width:50px;">Total</th>';
    cad += '          </tr>';
    cad += '      </thead>';
    cad += '      <tbody class="clsEstatico4">';

    for (var i = 0; i < JSON.length; i++) {
        cad += (i % 2 == 0) ? '<tr class="propTablaContenidoDerecho2" style="height:21px;">' : '<tr  class="propTablaContenidoDerecho2_1" style=" height:21px;">';
        cad += '              <td style="width: 320px; height:21px; text-align:left;">' + (parseInt(JSON[i].REPROCESO) + 1) + ' ' + JSON[i].NOMBRE + '  bytes</td>';
        cad += '              <td style="width: 90px; height:21px;"><div class="btnDetalle" style="display:table-cell; vertical-align:middle; border-radius:5px; overflow:auto; height:20px; width: 85px; background: #309F97; color:white; cursor:pointer;" onClick="btnDescargarAnteriores_Click(' + JSON[i].FECHA + ', ' + JSON[i].REPROCESO + ');">Descargar</div></td>';
        cad += '              <td style="width: 90px; height:21px;"><div class="btnDetalle" style="display:table-cell; vertical-align:middle; border-radius:5px; overflow:auto; height:20px; width: 60px; background: #309F97; color:white; cursor:pointer;" onClick="btnVerReporte_Click(this,' + JSON[i].FECHA + ', ' + JSON[i].REPROCESO + ', -1);">Ver</div></td>';
        cad += '              <td style="width: 50px; height:21px;">' + JSON[i].TOTAL + '</td>';
        cadAux += JSON[i].FECHA + '$' + JSON[i].REPROCESO + '&';
        cad += '          </tr>';
    }
    cadAux = cadAux.substring(0, cadAux.length - 1);
    cad += '      </tbody>';
    cad += '  </table>';
    cad += ' </div>';
    cad += ' <div class="scroll_horizontal_right" style="width:' + (parseInt($(window).width()) - 680) + 'px">';
    cad += '  <div  id= "divTablaContenidoHistorico" style="width: 68750px;">';
    cad += '      <table id ="tablaContenidoHistorico" cellpadding="0" cellspacing="0">';
    cad += '          <thead class="clsEstatico3">';
    cad += '             <tr class="propTablaTituloDerecho2">';
    cad += cadTituloAux;
    cad += '             </tr>';
    cad += '          </thead>';
    cad += '          <tbody class="clsEstatico4">';

    creaTablaHistorialDetalle_2(cadAux, cad)
}

function creaTablaHistorialDetalle_2(fecha, cad) {
    peticionAjax("AnalisisInformacion.aspx/tomaHistorialAnalaisisProceso", "POST", { fecha: fecha }, function (data) {
        var cAux = '';
        if (data.d == "" || data.d == null || data.d == "Sin Datos") {
            cAux += '<tr  class="propTablaContenidoDerecho2">';

            for (var x = 0; x < totalTitulo; x++) {
                cAux += '<td class="tdCA">-</td>';
            }
            cAux += '</tr> \t';
            return;
        }
        var sAux = '';
        cAux += '';
        for (var ii = 0; ii < data.d.split("%%&&").length; ii++) {
            var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[ii], false);

            if (JSON != "") {
                var aux = 0;
                var count = 0;
                cAux += (ii % 2 == 0) ? '<tr class="propTablaContenidoDerecho2">' : '<tr  class="propTablaContenidoDerecho2_1">';
                for (var i = 0; i < JSON.length; i++) {
                    if (JSON[i] != null) {
                        if (count == totalTitulo - 1) {
                            cAux += '<td class="tdCA" style="font: 10px Helvetica,Arial,sans-serif; cursor: pointer; width: 220px; height:21px; display:normal">-</td></tr>';
                        }
                        sAux = JSON[i].FECHA;
                        if (sAux != '0') {
                            if (count == totalTitulo - 1) {
                                cAux += (ii % 2 == 0) ? '<tr class="propTablaContenidoDerecho2">' : '<tr  class="propTablaContenidoDerecho2_1">';
                                count = 0;
                                band = false;
                            }
                            if (band) {
                                cAux += (ii % 2 == 0) ? '<tr class="propTablaContenidoDerecho2">' : '<tr  class="propTablaContenidoDerecho2_1">';
                                band = false;
                            }
                            for (var x = count; x < totalTitulo + 1; x++) {
                                if (JSON[i].IDCOLUMNA == x) {
                                    cAux += '<td class="tdCA" style="font: 10px Helvetica,Arial,sans-serif; cursor: pointer; width: 220px; height:21px; display:normal" onclick="btnVerReporte_Click(this,\'' + JSON[i]["FECHA"] + "\',\'" + JSON[i]["PROCESO"] + "\',\'" + JSON[i]["IDCOLUMNA"] + '\');"' + ">" + JSON[i].TOTAL + '</td>';
                                    count += 1;
                                    break;
                                }
                                else {
                                    count += 1;
                                    cAux += '<td class="tdCA" style="font: 10px Helvetica,Arial,sans-serif; cursor: pointer; width: 220px; height:21px; display:normal">-</td>';
                                }
                            }
                        }
                        else {
                            for (var j = 0; j < totalTitulo; j++)
                                cAux += '<td class="tdCA" style="font: 10px Helvetica,Arial,sans-serif; cursor: pointer; width: 220px; height:21px; display:normal">-</td>';
                            cAux += '</tr>';
                            band = true;
                        }
                    }
                }

                if (sAux != '0') {
                    for (var i = count; i < totalTitulo; i++) {
                        cAux += '<td class="tdCA" style="font: 10px Helvetica,Arial,sans-serif; cursor: pointer; width: 220px; height:21px; display:normal">-</td>';
                    }
                }
                count = 0;
            }
        }
        cAux += '</tr>';
        cad += cAux;

        cad += '          </tbody>';
        cad += '      </table>';
        cad += '  </div>';
        cad += ' </div>';
        cad += ' </div>';
        cad += ' </div>';

        var iWidth = $(window).width();
        $(".scroll_vertical").css("width", parseInt(iWidth) + "px");
        $(".scroll_vertical").css("height", parseInt($(window).height()) - 200 + "px");
        AgregarVtnFlotante("divVtnVerAnalisisInformacion2", "", "HISTORIAL DE ANALISIS DE SIC 300", "", cad, 400, parseInt(iWidth) - 50, false, false, "", "", null);
        Waiting(false, "Cargando Información...");
        $('.clsEstatico4').scroll(function () {
            $('.clsEstatico4').scrollTop($(this).scrollTop());
        })
    }, null);
}

function DescargarTxtRegistrosAfectados(idMet, idFuente, clave, negocio, fase, nombre) {
    WaitingVtn("divBloqVtnVerIncidencias", true, true, "Cargando Información...");
    peticionAjax("AnalisisInformacion.aspx/linkRegistrosAfectadosDownloadTxt_Click", "POST", { fechaPeriodo: fechaAux, idMet: idMet, idFuente: (idFuente != "" && idFuente.indexOf('-') == -1 ? idFuente : 0), clave: clave, negocio: negocio, fase: fase, reproceso: reprocesoAux }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "" && parseInt(data.d.split('_')[0]) > 0) {
                __doPostBack('ExportarTxtRegistrosAfectados', fechaAux + "," + clave + "," + nombre + "," + data.d.split('_')[1]);
                setTimeout(terminarWait, 10000);
            }
            else {
                return;
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        WaitingVtn("divBloqVtnVerIncidencias", false, false, "Cargando Información...");
    });
}

function DescargaTodosRegistrosTXT(obj, sFecha, sReproceso) {
    WaitingVtn("divBloqVtnVerIncidencias", true, true, "Cargando Información...");
    peticionAjax("AnalisisInformacion.aspx/DescargaTodos_Click", "POST", { fechaPeriodo: sFecha, reproceso: sReproceso }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "" && parseInt(data.d.split('_')[0]) > 0) {
                __doPostBack('ExportarTodosRegistrosTXT', sFecha + "," + sReproceso + "," + data.d.split('_')[1]);
                setTimeout(terminarWait, 10000);
            }
            else {
                return;
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        WaitingVtn("divBloqVtnVerIncidencias", false, false, "Cargando Información...");
    });
}

function Descarga_todos_Registros() {
    Waiting(true, "Cargando Información...");
    peticionAjax("AnalisisInformacion.aspx/Descarga_todos_registros", "POST", null, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "" && parseInt(data.d.split('_')[0]) > 0) {
                __doPostBack('Descarga_todos_registros');
                setTimeout(terminarWait, 10000);
                Waiting(false, "Cargando Información...");
            }
            else {
                return;
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Cargando Información...");
        }
    });
}


function btnAgregarFecha() {
    var meses = new Array("ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic");
    var f = new Date();
    var mes = meses[f.getMonth() - 1];

    for (var i = 0; i < total; i++)
        if ($('#td' + i).html().split('-')[0] == mes && $('#td' + i).html().split('-')[1] == (f.getFullYear()).toString().substring(2, 4)) {
            alertify.alert('Ya existe la fecha <b>' + $('#td' + i).html() + '</b>', function () { });
            return;
        }

    alertify.confirm('Se creará la fecha <b>' + mes + '-' + (f.getFullYear()).toString().substring(2, 4) + '</b>, ¿Desea continuar?', function (e) {
        if (e) {
            peticionAjax('AnalisisInformacion.aspx/creaRegistroFecha', "POST", { sFecha: mes + '-' + (f.getFullYear()).toString().substring(2, 4) },
                function (data) {
                    if (data.d == "OK") {
                        alertify.success("Se creo el registro satisfactoriamente.");
                    }
                    else {
                        alertify.success("No se pudo crear el registro, vuelva a intentarlo.");
                    }
                }, null);

        }
    });
    return false
}


function btnOcultarColumnas_Click(obj) {

    var nFilas = 0;
    nFilas = $("#tablaContenido").find('tr')[0].cells.length

    WaitingVtn("divBloqueador", true, true, "Cargando Información...");
    //$(".divEdit").show();
    //$("#divBloqueador").style("display", "normal");

    Waiting(true, "Cargando Información...");


    if (!mostrar) {
        var tamanioT = parseInt($('#divTablaContenido').css('width').replace('px', ''));
        var cadAux = false;
        for (var j = 0; j < nFilas; j++) {
            i = 0;
            cadAux = false;
            $('#tablaContenido tr').each(function () {
                var customerId = $(this).find("td").eq(j).html();
                if (customerId != "-" && customerId != null) {
                    cadAux = true;
                    return;
                }
            });
            if (cadAux == false) {
                $('#tablaContenido td:nth-child(' + (j + 1) + '),#tablaContenido  th:nth-child(' + (j + 1) + ')').hide();
                tamanioT -= 220;
            }
        }
        $('#divTablaContenido').css('width', tamanioT + 'px');
        mostrar = true;

        $('#divMostrarOcultar').html(" Mostrar Columnas ");
    }
    else {

        for (var j = 0; j < nFilas; j++) {
            $('#tablaContenido td:nth-child(' + (j + 1) + '),#tablaContenido  th:nth-child(' + (j + 1) + ')').show();
        }
        $('#divTablaContenido').css('width', nFilas * 220 + 'px');

        $('#divMostrarOcultar').html(" Ocultar Columnas ");
        mostrar = false;
    }
    Waiting(false, "Cargando Información...");
}

function btnOcultarColumnasHistorico_Click() {
    Waiting(true, "Cargando Información...");
    var nFilas = 0;
    nFilas = $("#tablaContenidoHistorico").find('tr')[0].cells.length

    if (!mostrarHistorico) {
        var tamanioT = parseInt($('#divTablaContenidoHistorico').css('width').replace('px', ''));
        var cadAux = false;
        for (var j = 0; j < nFilas; j++) {
            i = 0;
            cadAux = false;
            $('#divTablaContenidoHistorico tr').each(function () {
                var customerId = $(this).find("td").eq(j).html();
                if (customerId != "-" && customerId != null) {
                    cadAux = true;
                    return;
                }
            });
            if (cadAux == false) {
                $('#tablaContenidoHistorico td:nth-child(' + (j + 1) + '),#tablaContenidoHistorico  th:nth-child(' + (j + 1) + ')').hide();
                tamanioT -= 220;
            }
        }
        $('#divTablaContenidoHistorico').css('width', tamanioT + 'px');
        mostrarHistorico = true;

        $('#divMostrarOcultarHistorico').html(" Mostrar Columnas ");
    }
    else {

        for (var j = 0; j < nFilas; j++) {
            $('#tablaContenidoHistorico td:nth-child(' + (j + 1) + '),#tablaContenidoHistorico th:nth-child(' + (j + 1) + ')').show();
        }
        $('#divTablaContenidoHistorico').css('width', nFilas * 220 + 'px');

        $('#divMostrarOcultarHistorico').html(" Ocultar Columnas ");
        mostrarHistorico = false;
    }
    Waiting(false, "Cargando Información...");
}

function EvaluarRecursivo() {
    var valido = true;
    for (var i = 0; i < total; i++)
        if ($('#div' + i).is(':empty'))
            valido = false;

    if (!valido) {
        MostrarMsj("Faltan archivos por subir.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }

    Waiting(true, "Cargando Información...");
    peticionAjax('AnalisisInformacion.aspx/EvaluarRecursivo', "POST", {},
         function (data) {

             //if (data.d.indexOf("ERRORCATCH") == -1)
             //    MostrarMsj(data.d.split(':')[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 400, 150, null, null, null);

             GetValidacionesTablero();
             Waiting(false, "Cargando Información...");

         }, null);
}

function devuelveFecha(fecha) {
    var cadena = '';
    switch (fecha.substring(4, 6)) {
        case '01': cadena = 'ENERO '; break;
        case '02': cadena = 'FEBRERO '; break;
        case '03': cadena = 'MARZO '; break;
        case '04': cadena = 'ABRIL '; break;
        case '05': cadena = 'MAYO '; break;
        case '06': cadena = 'JUNIO '; break;
        case '07': cadena = 'JULIO '; break;
        case '08': cadena = 'AGOSTO '; break;
        case '09': cadena = 'SEPTIEMBRE '; break;
        case '10': cadena = 'OCTUBRE '; break;
        case '11': cadena = 'NOVIEMBRE '; break;
        case '12': cadena = 'DICIEMBRE '; break;
    }
    cadena += fecha.substring(0, 4);
    return cadena;
}

function btnDescargarAnteriores_Click(fecha, reprocesoAux) {
    WaitingVtn("divBloqVtnVerIncidencias", true, true, "Cargando Información...");
    __doPostBack('ExportarTxtHistorial', reprocesoAux);
    WaitingVtn("divBloqVtnVerIncidencias", false, false, "Cargando Información...");
}

function btnVerAnteriores_Click(obj, sFecha) {
    Waiting(true, "Cargando Información...");
    peticionAjax('AnalisisInformacion.aspx/GetHistorialAnalisis', "POST", { fecha: sFecha },
            function (data) {
                var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                if (JSON[0] != null) {
                    $("#divbtnVerAnteriores").empty();
                    CreaTablaHistorialDetalle(JSON, "");

                }
                else
                    MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }, null);
}

function btnVerInicidenciasAnteriores_Click(obj, fecha, reproceso, iFIIDColumna) {
    fechaAux = fecha;
    reprocesoAux = reproceso;
    var cadena = '<div id="divVtnVerAnalisisInformacion" style="width:100%;height:90%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="divContenedor" style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblVerIncidenciasMet" style="width:100%;height:90%;overflow: auto;margin-top: 0px;"> </div>';
    cadena += '</div>';

    AgregarVtnFlotante("divVerIncidenciasMet", "", "ANALISIS DE INFORMACIÓN", "", cadena, 300, 650, false, false, "", "", null);
    WaitingVtn("divVtnVerAnalisisInformacion", true, true, "Cargando Información...");

    peticionAjax("AnalisisInformacion.aspx/VerReporteIncidencias", "POST", { fecha: fecha, idReproceso: reproceso, FIIDColumna: iFIIDColumna }, function (data) {
        WaitingVtn("divVtnVerAnalisisInformacion", false, true, "Cargando Información...");
        if (data.d == "" || data.d == null || data.d == "Sin Datos") {
            $('#dvDetalleEITblVerIncidenciasMet').html("Sin Incidencias");
            $("#divVerIncidenciasMet").animate({ height: "50px" });
            $("#divVerIncidenciasMet").dialog("option", "width", "300");
            return;
        }
        var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);

        var JSONSubLista = data.d.split("%%&&")[1] != undefined ? obtenerArregloDeJSON(data.d.split("%%&&")[1], false) : "";
        var JSONSubLista2 = data.d.split("%%&&")[2] != undefined ? obtenerArregloDeJSON(data.d.split("%%&&")[2], false) : "";
        if (JSONSubLista != "" && JSONSubLista2 != "") {
            $("#dvDetalleEITblVerIncidenciasMet").html(CreaTablaIncidencias(JSON, JSONSubLista, JSONSubLista2, "5", 1, fecha, reproceso));
            for (var i = 0; i < arrayIdsTdSemaforoN1.length; i++)
                $("#" + arrayIdsTdSemaforoN1[i].split("%%&&")[0]).html('<center><span class="' + (arrayIdsTdSemaforoN1[i].split("%%&&")[1] == "WARNING" ? 'EstatusNaranja' : 'EstatusRojo') + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center>');
            for (var i = 0; i < arrayIdsTdSemaforoN2.length; i++)
                $("#" + arrayIdsTdSemaforoN2[i].split("%%&&")[0]).html('<center><span class="' + (arrayIdsTdSemaforoN2[i].split("%%&&")[1] == "WARNING" ? 'EstatusNaranja' : 'EstatusRojo') + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center>');

            $("#divVerIncidenciasMet").animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 20) + "px" });
            EstablecerTamanioVtn();
        }
        else {
            $("#dvDetalleEITblVerIncidenciasMet").html(CreaTablaIncidenciasMetodologia1(JSON, $(obj).attr("id").split("_")[2].substring($(obj).attr("id").split("_")[2].length - 1), $(obj).attr("id").split("_")[1], false));
        }
    }, null);

}

function btnVerReporte_Click(obj, fecha, reproceso, iFIIDColumna) {
    fechaAux = fecha;
    reprocesoAux = reproceso;
    var cadena = '<div id="divVtnVerAnalisisInformacion" style="width:87%;height:90%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
    cadena += '   <div style="width:100%;height:95%;text-align:center;float:left;">';
    cadena += '                 <div id="dvDetalleEITblVerIncidenciasMet" style="width:100%;height:95%;overflow: auto;margin-top: 0px;"> </div>';
    //cadena += '  <div id="divBtn" style="width:100%;height:5%;"><input type="button" class="classButton" value="Descargar Todas las Incidencias" onclick="DescargaTodosRegistrosTXT(this,' + fecha + ', ' + reproceso + ');" /></div>'
    cadena += '   </div>';


    AgregarVtnFlotante("divVerIncidenciasMet", "", "ANALISIS DE INFORMACIÓN", "", cadena, 200, 730, false, false, "", "", null);
    WaitingVtn("divVtnVerAnalisisInformacion", true, true, "Cargando Información...");

    peticionAjax("AnalisisInformacion.aspx/VerReporteIncidencias", "POST", { fecha: fecha, idReproceso: reproceso, FIIDColumna: iFIIDColumna }, function (data) {
        WaitingVtn("divVtnVerAnalisisInformacion", false, true, "Cargando Información...");
        var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
        if (data.d == "" || data.d == null || data.d == "Sin Datos" || JSON[0]["REGISTROS AFECTADOS"] == "0") {
            $('#dvDetalleEITblVerIncidenciasMet').html("Sin Incidencias");
            $("#divVerIncidenciasMet").animate({ height: "auto" });
            $("#divVerIncidenciasMet").dialog("option", "width", "300");
            return;
        }
       

        var JSONSubLista = data.d.split("%%&&")[1] != undefined ? obtenerArregloDeJSON(data.d.split("%%&&")[1], false) : "";
        var JSONSubLista2 = data.d.split("%%&&")[2] != undefined ? obtenerArregloDeJSON(data.d.split("%%&&")[2], false) : "";
        if (JSONSubLista != "" && JSONSubLista2 != "") {
            $("#dvDetalleEITblVerIncidenciasMet").html(generaTablaIncidencias(JSON, JSONSubLista, JSONSubLista2, "5", 1, fecha, reproceso));
          
            EstablecerTamanioVtn();
        }
      
    }, null);
}

function generaTablaIncidencias(listaDeJSON, JSONSubLista, JSONSubLista2, metodologia, fase, fecha, reproceso) {
    var cont = listaDeJSON.length;
    var cad = '';
    var aux = '';
    var auxBool = false;

    cad += '<table style="width:700px; height:auto;" id="tblIncidencias" class="dataGridDatos_PC">';

    cad += '  <tr style="font: Arial; font-size:10px; font-weight: bold; background:#4cada0; height:30px;">';
    cad += '       <td colspan="2" style="width:40px;"></td>';
    cad += '       <td colspan="2" style="width:480px;">SISTEMA</td>';
    cad += '       <td style="width:80px">REGISTROS AFECTADOS</td>';
    cad += '       <td style="width:70px;">SEMAFORO</td>';
    cad += '  </tr>';
    var cadAux = '';
    for (var i = 0; i < cont - 1; i++) {
        var nombre = listaDeJSON[i]["SISTEMA"];
        cad += '  <tr style="font: Arial; font-size:10px; background:#669EF1;  font-weight: bold; cursor: pointer;"  alt="aa" onclick="MostarOcultarSubIncidencias_E6(this);" id="tr_' + i + 'ItemN1">';
        cad += '     <td colspan="2" style="width:40px;"><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>';
        cad += '     <td colspan="2" style="width:480px;  text-align: left;">' + listaDeJSON[i]["SISTEMA"] + '</td>';
        cad += '     <td style="width:80px; text-align: right;"></td>';
        cad += '     <td style="width:70px; "></td>';
        cad += '  </tr>';
        var contAux = 2;

        for (var j = 0; j < JSONSubLista.length; j++) {
            if (nombre == JSONSubLista[j]["SISTEMA"]) {
                for (var x = 0; x < JSONSubLista2.length - 1; x++) {
                    if (cadAux.indexOf(JSONSubLista2[x]["IDCOLUMNA"]) == -1) {
                        cadAux += JSONSubLista2[x]["IDCOLUMNA"];
                        var contador = 0;
                        for (var jj = 0; jj < JSONSubLista2.length; jj++) {
                            if (JSONSubLista2[jj]["IDCOLUMNA"] == JSONSubLista2[x]["IDCOLUMNA"]) {
                                contador += parseInt(JSONSubLista2[jj]["REGISTROS AFECTADOS"]);
                            }
                        }
                        cad += '  <tr class="' + i + 'ItemN1" style="font:Arial; font-size:10px;  font-weight: bold; background:rgba(207, 228, 150, 1); display: none; cursor: pointer;" alt="aa" onclick="MostarOcultarSubIncidencias_E5(this);" id="tr_' + i + 'ItemN' + contAux + '">';
                        cad += '     <td colspan="2" style="width:20px;"><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>';
                        cad += '     <td colspan="2" style="text-align:left; "width:480px;">&nbsp&nbsp&nbsp&nbsp' + JSONSubLista2[x]["IDCOLUMNA"] + ' ' + JSONSubLista2[x]["DESCRIPCION"] + '</td>';
                        cad += '     <td style="width:80px; text-align: right;">' + contador + '</td>';
                        cad += '     <td style="width:70px;"></td>';
                        cad += '  </tr>';

                        auxBool = false;
                        for (var jj = 0; jj < JSONSubLista2.length; jj++) {
                            if (JSONSubLista2[jj]["IDCOLUMNA"] == JSONSubLista2[x]["IDCOLUMNA"]) {
                                cad += ' <tr class="' + i + 'ItemN' + contAux + '" style="font: Arial; font-size:10px; display: none; background:#F0F2EA; font: 9px Helvetica,Arial,sans-serif;">';
                                cad += '     <td style="background:white; width:20px;"></td>';
                                cad += '     <td style="background:white;" style="width:30px;"></td>';
                                cad += '     <td style="width:80px; text-align:left; ">&nbsp&nbsp<span style="text-decoration: underline;  width:80px; text-align:left; color: blue; cursor: pointer" title="Ver Cédula Validaciones"' +
                                                     ('onclick="VerCedulaValidacioneEtapaII(\'' + JSONSubLista2[jj]["FSIdFuente"] + "\',\'" + JSONSubLista2[jj]["FSIdValidacion"] + "\',\'" + JSONSubLista2[jj]["SISTEMA"] + "\',\'" + JSONSubLista2[jj].NOMBRE + "\',\'" + metodologia + "\',\'" + fase + '\',' + false + ');"') + ">" + JSONSubLista2[jj]["CLAVE"] + "</span>"
                                cad += '     </td>'
                                cad += '     <td style="width:480px; text-align: left;">' + JSONSubLista2[jj]["NOMBRE"] + '</td>';
                                cad += '     <td style="width:80px; text-align: right;"><span style="text-decoration: underline; color: blue; cursor: pointer" title="Descargar archivo .csv"' +
                                                  ('onclick="DescargarTxtRegistrosAfectados(\'' + fecha + "\',\'" + JSONSubLista2[jj]["FSIdFuente"] + "\',\'" + JSONSubLista2[jj]["CLAVE"] + "\',\'" + JSONSubLista[j]["NEGOCIO"] + "\',\'" + JSONSubLista2[jj]["CLAVE"].split('-')[2] + "\',\'" + JSONSubLista2[jj]["IDCOLUMNA"] + ' ' + JSONSubLista2[jj]["NOMBRE"] + '\',false);"') + ">" + JSONSubLista2[jj]["REGISTROS AFECTADOS"] + "</span>";
                                cad += '     </td>';
                                cad += '     <td style="width:70px"><center><span class="' + (JSONSubLista2[jj]["SEMAFORO"] == 'WARNING' ? 'EstatusNaranja' : 'EstatusRojo') + '" title="' + JSONSubLista2[jj]["SEMAFORO"] + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center></td>';
                                cad += ' </tr>';
                            }
                        }
                        contAux += 1;
                    }
                }
            }
        }
    }
    cad += '  <tr style="font:Arial; font-size:10px; font-weight:bold; background:rgba(191, 191, 191, 1); height:1px;">';
    cad += '     <td style="width:40px; background:white;" colspan="2" ></td>';
    cad += '     <td style="width:490px;" colspan="2"></td>';
    cad += '     <td style="width:80px;"></td>';
    cad += '     <td style="width:70px;"></td>';
    cad += '  </tr>';
    cad += '  <tr style="font: Arial; font-size:10px; font-weight: bold; background:rgba(205, 176, 91, 1);">';
    cad += '     <td colspan="2" style="background:white; width:40px;"></td>';
    cad += '     <td colspan="2" style="width:480px; background:white; text-align: right;">TOTAL</td>';
    cad += '     <td style="width:80px; text-align: right; background:white;">' + listaDeJSON[listaDeJSON.length - 1]["REGISTROS AFECTADOS"] + ' </td>';
    cad += '     <td style="width:70px; text-align: right; background:white;"></td>';
    cad += '  </tr>';
    cad += '</table>';
    return cad;
}

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

function MostarOcultarSubIncidencias_E6(obj) {
    if ($(obj).attr("alt") == "aa") {
        $("." + $(obj).attr("id").split("_")[1]).show();
        $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
        if (parseInt($("#divVerIncidenciasMet").parent().height()) < (parseInt(document.documentElement.clientHeight) - 550)) {
            EstablecerTamanioVtn_E5();
        }
    }
    else {
        var i = 0;
        $('#tblIncidencias tr').each(function () {
            $("." + ($(obj).attr("id").split("_")[1]).substring(0, 6) + i).hide();
            $("." + ($(obj).attr("id").split("_")[1])).attr("alt", "aa");
            if ($(this).find("td").eq(0).html().indexOf("collapse") != -1) {
                $(this).find("td").eq(0).replaceWith('<td style="width: 20px;" colspan="2"><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"></td>');
            }
            i += 1;
        });
        EstablecerTamanioVtn_E5(); 
    }
    $(obj).attr("alt", ($(obj).attr("alt") == "aa" ? "ab" : "aa"));
}

function EstablecerTamanioVtn_E5() {
    $("#divVerIncidenciasMet").parent().animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 50) + "px" });
    $("#divVerIncidenciasMet").animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 70) + "px" });
    $("#divVerIncidenciasMet").parent().position({
        my: "center",
        at: "center",
        of: window
    });
}

function MostarOcultarSubIncidencias(obj) {
    if ($(obj).attr("alt") == "aa") {
        $("." + $(obj).attr("id").split("_")[1]).show();
        $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
        if (parseInt($("#divVerIncidenciasMet").parent().height()) < (parseInt(document.documentElement.clientHeight) - 550)) {
            EstablecerTamanioVtn();
        }
    }
    else {
        $("." + $(obj).attr("id").split("_")[1]).hide();
        $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
        EstablecerTamanioVtn();
    }
    $(obj).attr("alt", ($(obj).attr("alt") == "aa" ? "ab" : "aa"));
}

function EstablecerTamanioVtn() {
    $("#divVerIncidenciasMet").parent().animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 100) + "px" });
    $("#divVerIncidenciasMet").animate({ height: (parseInt(document.getElementById("tblIncidencias").offsetHeight) + 70) + "px" });
    $("#divVerIncidenciasMet").parent().position({
        my: "center",
        at: "center",
        of: window
    });
}

function CreaTablaIncidencias(listaDeJSON, JSONSubLista, JSONSubLista2, metodologia, fase, fecha, reproceso) {
    arrayIdsTdSemaforoN1 = new Array();
    arrayIdsTdSemaforoN2 = new Array();

    var cad = '<center><table id="tblIncidencias" width="100%" class="dataGridDatos">';
    cad += '<thead>';
    cad += '    <tr valign="top">';
    cad += "        <th></th>";
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        cad += '    <th valign="top">';
        cad += encabezados.toString();
        cad += '    </th>';
    }
    cad += '<th >SEMAFORO</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += ((filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + " alt='aa' onclick='MostarOcultarSubIncidencias(this);' id='tr_" + filas + "'>";
        var json = listaDeJSON[filas];
        cad += listaDeJSON[filas]["SISTEMA"] != "TOTAL:" ? '<td><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>' : "<td></td>";
        for (var element in json) {
            if (element != "FSIdFuente" && element != "FSIdValidacion") {
                cad += '<td style="' + (element == "REGISTROS AFECTADOS" ? 'text-align:right;' : 'text-align:left;') + (element == "SISTEMA" ? 'width: 26.5%;"' : '"') + '>';
                cad += json[element];
                cad += '</td>';
            }
        }
        cad += '<td id="td_' + filas + '"></td>';
        cad += '</tr>';
        if (listaDeJSON[filas]["SISTEMA"] != "TOTAL:") {
            valorSemaforoN1 = "WARNING";
            cad += CreaSubTablaIncidencias(JSONSubLista, JSONSubLista2, listaDeJSON[filas]["SISTEMA"], "", filas, true, metodologia, listaDeJSON[filas]["REGISTROS AFECTADOS"], fase);
            arrayIdsTdSemaforoN1.push("td_" + filas + "%%&&" + valorSemaforoN1);
        }
    }
    cad += '<tr class="row" aling="center" style="height:30px;"><td colspan="4" > <div id="divBtn" style="width:100%;height:16px;" aling="center"><input type="button" class="classButton" value="Descargar Todas las Incidencias" onclick="DescargaTodosRegistrosTXT(this,' + fecha + ', ' + reproceso + ');" /></div></td></tr>';
    cad += '</tbody>';
    cad += '</table>';
    cad += '</center>';

    return cad;
}

function CreaSubTablaIncidencias(listaDeJSON, JSONSubLista2, sistema, negocio, filasPadre, agregarExpandir, metodologia, regAfectados, fase) {

    var cad = '<tr class="' + filasPadre + (agregarExpandir ? "" : "ItemN2") + '" style="display:none"><td colspan="' + (agregarExpandir ? "5" : "5") + '"><table style="width: 100%;"><thead><tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    var i = 0;
    for (var encabezados in auxJSON) {
        if ((encabezados != "SISTEMA" && agregarExpandir) || (encabezados != "SISTEMA" && encabezados != "NEGOCIO" && encabezados != "FSIdFuente" && encabezados != "FSIdValidacion" && encabezados != "IdReporte" && !agregarExpandir)) {
            if (i == 0) {
                cad += agregarExpandir ? '<td></td><th style="text-align: center;background: rgb(0, 128, 128)"></th>' : '<td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>';
                cad += '<th style="text-align: center;background: rgb(0, 128, 128)">' + encabezados.toString() + '</th>';
            }
            else {
                cad += '<th style="text-align: center;background: rgb(0, 128, 128)">';
                cad += encabezados.toString();
                cad += '</th>';
            }
            i++;
        }
    }
    if (agregarExpandir)
        cad += '<th style="text-align: center;background: rgb(0, 128, 128)">SEMAFORO</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {

        var idReporte = listaDeJSON[filas].IdReporte;
        idReporte = idReporte != undefined && idReporte != "" && idReporte != null && parseInt(idReporte) != 0 ? idReporte : metodologia;

        if ((sistema == listaDeJSON[filas]["SISTEMA"] && agregarExpandir) || (!agregarExpandir && negocio == listaDeJSON[filas]["NEGOCIO"] && sistema == listaDeJSON[filas]["SISTEMA"])) {
            cad += "<tr " + (agregarExpandir ? 'style="display:none;cursor:pointer"' : '') + " class='" + filasPadre + (agregarExpandir ? "" : "ItemN2") + "'" + (agregarExpandir ? " alt='aa' onclick='MostarOcultarSubIncidencias(this);' id='tr_" + filas + "ItemN2'" : "") + ">";

            var json = listaDeJSON[filas];
            cad += agregarExpandir ? '<td></td><td><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>' : '<td>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</td>';
            for (var element in json) {
                if ((element != "SISTEMA" && agregarExpandir) || (element != "SISTEMA" && element != "NEGOCIO" && element != "FSIdFuente" && element != "FSIdValidacion" & element != "IdReporte" && !agregarExpandir)) {
                    cad += '<td style="' + (element == "REGISTROS AFECTADOS" ? 'text-align:right;' : 'text-align:left;') + (element == "CLAVE" ? "width: 27%;" : (element == "NEGOCIO" ? "width: 26%;" : (element == "NOMBRE" ? "width: 47%;" : ""))) + 'font-weight:normal;background:' + ((filas % 2 == 0 && agregarExpandir) ? "rgba(128, 128, 128, 0.46); " : (!agregarExpandir ? "rgba(128, 128, 128, 0.14);" : "rgba(128, 128, 128, 0.69);")) + '">';
                    if (element == "CLAVE")
                        cad += "<span style='text-decoration: underline;color: blue;cursor:pointer' title='Ver Cédula Validaciones' " + ('onclick="VerCedulaValidacioneEtapaII(\'' + listaDeJSON[filas].FSIdFuente + "\',\'" + listaDeJSON[filas].FSIdValidacion + "\',\'" + sistema + "\',\'" + listaDeJSON[filas].NOMBRE + "\',\'" + metodologia + "\',\'" + fase + '\',' + false + ');"') + ">" + json[element] + "</span>";
                    else if (element == "REGISTROS AFECTADOS" && !agregarExpandir)
                        cad += "<span style='text-decoration: underline;color: blue;cursor:pointer' title='Descargar archivo .csv' " + ('onclick="DescargarTxtRegistrosAfectados(\'' + idReporte + "\',\'" + listaDeJSON[filas].FSIdFuente + "\',\'" + listaDeJSON[filas].CLAVE + "\',\'" + negocio + "\',\'" + fase + "\',\'" + listaDeJSON[filas].NOMBRE + '\',false);"') + ">" + json[element] + "</span>";
                    else
                        cad += element != "SEMAFORO" ? json[element] : "<center><span class='" + (json[element] == "ERROR" ? "EstatusRojo" : "EstatusNaranja") + "' title='" + json[element] + "'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span></center>";
                }
                cad += '</td>';
            }
            if (agregarExpandir) {
                cad += '<td id="td_' + filas + "_" + filasPadre + '" style="text-align:font-weight:normal;background:' + ((filas % 2 == 0 && agregarExpandir) ? "rgba(128, 128, 128, 0.46); " : (!agregarExpandir ? "rgba(128, 128, 128, 0.14);" : "rgba(128, 128, 128, 0.69);")) + '"></td>';
            }
            if (!agregarExpandir)
                valorSemaforoN2 = listaDeJSON[filas]["SEMAFORO"] == "ERROR" && valorSemaforoN2 == "WARNING" ? listaDeJSON[filas]["SEMAFORO"] : valorSemaforoN2;

            cad += '</tr>';
            if (listaDeJSON[filas]["SISTEMA"] != "TOTAL:" && agregarExpandir) {
                valorSemaforoN2 = "WARNING";
                cad += CreaSubTablaIncidencias(JSONSubLista2, null, listaDeJSON[filas]["SISTEMA"], listaDeJSON[filas]["NEGOCIO"], filas, false, metodologia, listaDeJSON[filas]["REGISTROS AFECTADOS"], fase);
                arrayIdsTdSemaforoN2.push("td_" + filas + "_" + filasPadre + "%%&&" + valorSemaforoN2);
                valorSemaforoN1 = valorSemaforoN2 == "ERROR" && valorSemaforoN1 == "WARNING" ? valorSemaforoN2 : valorSemaforoN1;
            }
        }
    }
    if (!agregarExpandir)
        cad += '<tr><td></td><td style="background: rgba(128, 128, 128, 0.14);"></td><td style="background: rgba(128, 128, 128, 0.14);">TOTAL:</td><td style="background: rgba(128, 128, 128, 0.14);text-align: right;">' + regAfectados + '</td><td style="background: rgba(128, 128, 128, 0.14);"></td></tr>';
    cad += '</tbody></table></td></tr>';
    return cad;
}

function almacenaArchivoDragAndDrop() {
    Waiting(true, "Cargando Información...");

    peticionAjax('AnalisisInformacion.aspx/validaAlmacenaArchivo', "POST", {},
         function (data) {
             if (data.d.split('-')[0] == "Subir") {
                 if (!ValidaArrastreArchivos_Click(data.d.split('-')[2] + '-' + data.d.split('-')[3])) {
                     MostrarMsj("Faltan archivos por subir.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                     Waiting(false, "Cargando Información...");
                     return true;
                 }
                 MostrarMsj("Se almacenara el archivo " + data.d.split('-')[1] + " en la fila " + data.d.split('-')[2] + "-" + data.d.split('-')[3] + ". ¿Desea continuar? ", "Mensaje", true, false, true, "Si", "", "No", 280, 120,
                        function BtnSi() {
                            $("#divVentanaMensajes").dialog("close");
                            almacenaArchivoDragAndDrop1();
                        }, null,
                        function BtnNo() {
                            Waiting(false, "Cargando Información...");
                            $("#divVentanaMensajes").dialog("close");
                        });
             }
             else {
                 if (data.d.split('-')[0] == "Extension") {
                     MostrarMsj("El archivo no tiene la extención correcta. " + data.d.split('-')[1] + data.d.split('-')[2], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                     Waiting(false, "Cargando Información...");
                 }
                 else {
                     MostrarMsj("La fecha no corresponde con la del contenido.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                     Waiting(false, "Cargando Información...");
                 }
             }
         }, null);
}

function almacenaArchivoDragAndDrop1() {
    peticionAjax('AnalisisInformacion.aspx/almacenaArchivoDragAndDrop', "POST", {}, function (data) {
        var JSON = obtenerArregloDeJSON(data.d);
        var json = JSON[0];    
        if (json['Error'] == 'Error') {
            var cad = 'Error en la subida de Archivo. Formato Incorrecto de Archivo <br/>';
            for (var filas = 0; filas < JSON.length + 1; filas++) {
                var json2 = JSON[filas];
                for (var element in json2) 
                {
                        if(element=='Fila')
                        cad += json2['Fila']+"<br/>";
                    }
            }
            MostrarMsj(data.d.indexOf("Error") != -1 ? cad : "Error en el Archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 350, 220, null, function () {
                entroCloseBtnAceptar = true;
                $("#divVentanaMensajes").dialog("close");
            });
            GetValidacionesTablero();
        }
        else
        {
            for (var filas = 0; filas < JSON.length; filas++) {
                var fecha = JSON[filas].FechaAlta.split('/')[2].split(' ')[0] + '-' + JSON[filas].FechaAlta.split('/')[1] + '-' + JSON[filas].FechaAlta.split('/')[0]
                $('#div' + JSON[filas].IDSic).html('<p>' + JSON[filas].FVCNombreArchivo.split(".")[0] + '/' + fecha + '/' + JSON[filas].FVCTamanio + '</p>');
            }
            GetValidacionesTablero();
        }
    });
}

function ValidaArrastreArchivos_Click(fecha) {
    var aux = true;
    //var aux1 = true;
    //$('.clsContenidoArchivos tr').each(function () {
    //    if (aux1) {
    //        if ($(this).find("td").eq(0).html() == fecha) {
    //            if (aux) 
    //                aux1 = false;
    //        }
    //        else {
    //            if ($(this).find("td").eq(3).html() != '') {
    //                aux = false;
    //                aux1 = false;
    //            }
    //        }
    //    }
    //});
    return aux;
}

function resizeTablaCalidadValidaciones() {
    var valorH = (document.documentElement.clientHeight - document.getElementById("divHeader").offsetHeight) - 100;
    document.getElementById("divTblCatValidaciones").style.height = valorH + "px";
    setTimeout(function () { resizeEncabezadoGeneric("TblCatValidaciones"); }, 10);
}

function VerCedulaValidacioneEtapaII(idFuente, idValidacion, fuente, validacion, idMet, fase, esSIC) {
    WaitingVtn("divBloqVtnVerValidacionesMet", true, false, "");
    WaitingVtn("divBloqVtnVerIncidencias", true, false, "");
    var cadena = '<div id="divBloqVtnVerCedulaValidacionesMet" style="width:96%;height:95%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">'
    cadena += '<div id="dvDetalleEITblVerCedulaValidacionesMet" style="width:100%;height:97%;overflow-y: auto;overflow-x: hidden;margin-top: 0px;">  ';
    cadena += '</div></div>';
    $("#divVtnVerAnalisisInformacion").empty();
    AgregarVtnFlotante("divVtnVerAnalisisInformacion", "btnEditaCedulaVal", "CÉDULA VALIDACIONES " + fuente + validacion != "undefined" ? (" (" + validacion.toUpperCase() + ")") : "", "", cadena, 670, 650, false, false, "Editar Cédula", "", function GuardarEditarCedulaValidacionesEtapaII() {
        if (document.getElementById("btnEditaCedulaVal") != null) {
            $(".ui-button-text").html('Guardar Cambios');
            $(".ui-button-text").attr("id", "btnSaveCedulaVal");
            CambiaAEditableCedulaValidaciones(true);

        } else {
            GuardarCedulaValidaciones(idFuente, idValidacion, fuente, validacion);
        }
    });
    WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, true, "Cargando Información...");
    //document.getElementById("imgVtnLoading").style.marginTop = "40%";
    var parametrosVerVal = { IdFuente: idFuente, idValidacion: (idValidacion != "" ? idValidacion : 0), idMet: idMet, fase: fase, fechaPeriodo: fechaAux, esSIC: esSIC, periodicidad: reprocesoAux };
    peticionAjax("AnalisisInformacion.aspx/GetTableroMuestraCedulaValidacionesEII", "POST", parametrosVerVal, function (data) {
        if (data.d == "" || data.d == null || data.d.indexOf("Error") != -1) {
            WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "Cargando Información...");
            $("#divVtnVerAnalisisInformacion").dialog("close");
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
        $("#divVtnVerAnalisisInformacion").dialog("option", "title", "CÉDULA VALIDACIONES " + fuente + (JSON[0].DESCRIPCION != undefined && JSON[0].DESCRIPCION != "" ? " (" + JSON[0].DESCRIPCION + ")" : "") + "\"" + (validacion != "undefined" ? validacion.toUpperCase() : (idFuente != undefined ? idFuente.toUpperCase() : "")) + "\"");
        $("#divVtnVerAnalisisInformacion").html(generarTablaDeRegistrosCedulaVal(JSON));
        $("#payments").msDropdown();
        $("#payments2").msDropdown();
        document.getElementById("payments") != null ? document.getElementById("payments").style.height = "auto" : null;
        document.getElementById("payments2_child") != null ? document.getElementById("payments2_child").style.height = "auto" : null;
        WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "Cargando Información...");
    }, null);
    $("#divVtnVerAnalisisInformacion").on("dialogclose", function (event, ui) {
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
    peticionAjax('AnalisisInformacion.aspx/EditaCedulaValidacionesEII', "POST", parametros, function GuardaCedula_Finish(data) {
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

function generarTablaDeRegistrosCedulaVal(listaDeJSON) {
    var encabezadoAux = '';
    var cad = '<center><table id="tblContenidoValidacionesCedula" width="100%" class="dataGridDatos" style="font-size: 9px;height:99%">';

    cad += '<thead>';
    cad += '<tr style="font-size: 9px;">';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON)
        cad += '<th>' + encabezados.toString() + '</th>';


    cad += '</tr>';
    cad += '</thead>';

    var cadSec = '';
    var i = 0;
    var contar = 0;
    var start = 0;
    var Contador = 0;
    //var cad = '';
    //        cad += '    <table style="width:950px; font-size:10px;" cellpadding="2" cellspacing="2" >';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT" style="width:100px;">NOMBRE:</td>';
    //        cad += '            <td class="tDDTablaC" colspan="7">' + listaDeJSON[5]["DESCRIPCION"] + '</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT"  style="width:100px;">DESCRIPCION:</td>';
    //        cad += '            <td class="tDDTablaC" colspan="7">' + listaDeJSON[6]["DESCRIPCION"] + '</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT"  style="width:100px;">SISTEMA:</td>';
    //        cad += '            <td style="width:315px;" class="tDDTablaC">' + listaDeJSON[2]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT"  style="width:100px;">CLAVE:</td>';
    //        cad += '            <td style="width:315px;" class="tDDTablaC">' + listaDeJSON[0]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td style="width:315px;" class="tDDTablaT">VIGENCIA DE INCIDENCIA</td>';
    //        cad += '            <td style="width:315px;" class="tDDTablaC">' + listaDeJSON[7]["DESCRIPCION"] + '</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT"  style="width:100px;">SEGMENTO:</td>';
    //        cad += '            <td style="width:315px;" class="tDDTablaC">' + listaDeJSON[10]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT"  style="width:100px;">PAIS:</td>';
    //        cad += '            <td style="width:315px;" class="tDDTablaC">' + listaDeJSON[1]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td style="width:315px;" class="tDDTablaT">SIMBOLOGIA</td>';
    //        cad += '            <td style="width:315px;" class="tDDTablaC"> <div> ' + (listaDeJSON[14]["DESCRIPCION"] != "" ? ('<span class="' + (listaDeJSON[14]["DESCRIPCION"] == "WARNING" ? 'EstatusNaranja' : 'EstatusRojo') + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>') : '') + (listaDeJSON[14]["DESCRIPCION"] != "" ? "&nbsp&nbsp" + listaDeJSON[14]["DESCRIPCION"] : "SIN SIMBOLOGÍA") + '</div></td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT"  colspan="2">ARCHIVO</td>';
    //        cad += '            <td style="width:2px;"></td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">ORIGEN</td>';
    //        cad += '            <td style="width:2px;"></td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">CAMPO, DATO VALIDADO</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>    ';
    //        cad += '            <td class="tDDTablaC"  colspan="2">' + listaDeJSON[3]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;"></td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[4]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;"></td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[12]["DESCRIPCION"] + '</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT"  colspan="2">ETAPA DE VALIDACION</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">SUB ETAPA DE VALIDACION</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">SEGMENTO</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaC"  colspan="2">' + listaDeJSON[8]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[9]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[10]["DESCRIPCION"] + '</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT"  colspan="2">PALABRAS CLAVE</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">ESTRUCTURA DE LA VALIDACION</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">AFECTA</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaC"  colspan="2">' + listaDeJSON[11]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[13]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[15]["DESCRIPCION"] + '</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT"  colspan="2">NEGOCIO AFECTADO</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">IMPLICACIONES</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">RESPONSABLE</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaC"  colspan="2">' + listaDeJSON[16]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[17]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[18]["DESCRIPCION"] + '</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT"  colspan="2">CORRESPONSABLE</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">ENTERADO</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">ENVIO DIARIO</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaC"  colspan="2">' + listaDeJSON[19]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[20]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[21]["DESCRIPCION"] + '</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT"  colspan="2">ENVIO SEMANAL</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">ENVIO QUINCENAL</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">REQUERIMIENTO</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaC"  colspan="2">' + listaDeJSON[22]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[23]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[25]["DESCRIPCION"] + '</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td colspan="8">';
    //        cad += '                <table cellpadding="2" cellspacing="2" >';
    //        cad += '                    <tr>';
    //        cad += '                        <td  class="tDDTablaT" style="width:200px; " >ENVIO MENSUAL CIERRE MENSUAL</td>';
    //        cad += '                        <td  class="tDDTablaC">' + listaDeJSON[24]["DESCRIPCION"] + '</td>';
    //        cad += '                    </tr>';
    //        cad += '                </table>';
    //        cad += '            </td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT"  colspan="2">SUBSIDIADO</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">FECHA INICIO DE SUBSIDIO</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">FECHA FIN DE SUBSIDIO</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaC"  colspan="2">' + listaDeJSON[26]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[27]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[28]["DESCRIPCION"] + '</td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaT"  colspan="2">REGLA DE SUBSIDIO</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2">AUTOR</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaT" colspan="2"></td>';
    //        cad += '        </tr>';
    //        cad += '        <tr>';
    //        cad += '            <td class="tDDTablaC"  colspan="2">' + listaDeJSON[29]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">' + listaDeJSON[30]["DESCRIPCION"] + '</td>';
    //        cad += '            <td style="width:2px;">&nbsp;</td>';
    //        cad += '            <td class="tDDTablaC" colspan="2">&nbsp;</td>';
    //        cad += '        </tr>';
    //        cad += '    </table>';

   



    cad += '<tbody style="font-size: 9px;">';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row" style="font-size: 9px;" >' : '<tr class="alternateRow" style="font-size: 9px;">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element == 'CONCEPTO') {
                cad += '<td style="text-align:left;width:30%;  height: 25x;font-size: 9px;">';
            } else {
                cad += '<td style="text-align:left;width:70%;  height: 25px;font-size: 9px;">';
            }

            if (element == 'DESCRIPCION' && (json["CONCEPTO"] == 'CLAVE' || json["CONCEPTO"] == 'PAIS' || json["CONCEPTO"] == 'SISTEMA' || json["CONCEPTO"] == 'ARCHIVO' || json["CONCEPTO"] == 'ETAPA DE VALIDACION' || json["CONCEPTO"] == 'SUB ETAPA DE VALIDACION' || json["CONCEPTO"] == "CAMPO, DATO VALIDADO" || json["CONCEPTO"] == "ESTRUCTURA DE LA VALIDACION" || json["CONCEPTO"] == "ESTRUCTURA DE LA VALIDACION VALIDACION")) {

                cadSec = json["DESCRIPCION"];
                while ((start = cadSec.indexOf("#", start) + 1) > 0)
                    contar++;

                for (i = 0; i < contar; i++)
                    cadSec = cadSec.replace('#', '\\');

                cad += '<div id="' + json["CONCEPTO"] + '" style="width:100%;font-size: 8px;" class="divNoInfo">';
                cad += '<textarea cols="30" rows="2" id="Ruta' + Contador + '"  disabled="disabled" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:transparent;width:100%; text-align:left; border: none;height:25px;color: rgb(0, 0, 0);" >' + cadSec + "</textarea>";
                cad += '</div>';

                cad += '<div id="Edit_' + json["CONCEPTO"] + '" style="width:100%;background-color:White; display:none;font-size: 8px;" class="divNoEdit">';
                cad += '<textarea cols="30" rows="2" id="RutaEdit' + Contador + '"  style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;width:100%; text-align:left; background-color:White;border: x;height:25px" >' + cadSec + "</textarea>";
                cad += '</div>';
            } else if (element == 'DESCRIPCION') {
                cad += '<div id="' + json["CONCEPTO"] + '" style="width:100%;font-size: 9px;" class="divInfo">';
                if (element == 'DESCRIPCION' && json["CONCEPTO"] == 'SIMBOLOGIA')
                    cad += '<div> ' + (json[element] != "" ? ('<span class="' + (json[element] == "WARNING" ? 'EstatusNaranja' : 'EstatusRojo') + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>') : '') + (json[element] != "" ? "&nbsp&nbsp" + json[element] : "SIN SIMBOLOGÍA") + '</div>';
                else if (element == 'DESCRIPCION' && json["CONCEPTO"] != 'SIMBOLOGIA')
                    cad += '<textarea cols="30" rows="' + ((filas == 4 || filas == 7) ? "4" : "2") + '" id="lb_' + Contador + '"  disabled="disabled" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:transparent;width:100%; text-align:left; border: none;height:25px;color: rgb(0, 0, 0);" >' + json[element] + "</textarea>";
                cad += '</div>';

                cad += '<div id="Edit_' + json["CONCEPTO"] + '" style="width:100%;background-color:White; display:none;font-size: 9px;" class="divEdit">';
                if (element == 'DESCRIPCION' && json["CONCEPTO"] == 'SIMBOLOGIA')
                    cad += '<select id="payments2" name="payments2" style="width:100%;height: auto"><option data-image="../../images/PanelDeControl/warning.png" ' + (json[element] == "WARNING" ? 'selected="selected"' : '') + '>WARNING </option><option data-image="../../images/PanelDeControl/error.png" ' + (json[element] == "ERROR" ? 'selected="selected"' : '') + '>ERROR </option></select>';
                else if (element == 'DESCRIPCION' && json["CONCEPTO"] != 'SIMBOLOGIA')
                    cad += '<textarea cols="30" rows="' + ((filas == 4 || filas == 7) ? "3" : "2") + '" id="lbEdit_' + Contador + '" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:100%; text-align:left; border: x;height:25px" >' + json[element] + "</textarea>";
                cad += '</div>';
            }
            else {
                cad += json[element];
            }
            cad += '</td>';
        }
        Contador = Contador + 1;
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
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