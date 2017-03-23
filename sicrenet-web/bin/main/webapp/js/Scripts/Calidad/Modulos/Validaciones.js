$(function ($) {
    $.datepicker.regional['es-MX'] = {
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
        dateFormat: 'yy-mm-dd',
        isRTL: false,
        startDate: '2016-04-01',
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
    };
    $.datepicker.setDefaults($.datepicker.regional['es-MX']);
    //ObtienePais();
});

function cargaIncial() {
    ObtienePais();
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    colsultaModulos();
}

/************************ Función que permite arrastrar objetos (Div para Agregar/Modificar Validaciones) ****************************/
$(function () {
    $("#popUpDiv").draggable();
});

$(document).ready(function () {
    $("#imgOver").hover(function () {
        $(this).attr('src', '../../images/Pendientes/btnCancelarPendientes1.png');//cambia de imagen en el over
    }
    , function () {
        $(this).attr('src', '../../images/Pendientes/btnCancelarPendientes.png');
    });
});



//************************************************************  Sección Descar/Carga Archivos ******************************************************

function window_pos(popUpDivVar) {
    if (typeof window.innerWidth != 'undefined') {
        viewportwidth = window.innerHeight;
    } else {
        viewportwidth = document.documentElement.clientHeight;
    }
    if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
        window_width = viewportwidth;
    } else {
        if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
            window_width = document.body.parentNode.clientWidth;
        } else {
            window_width = document.body.parentNode.scrollWidth;
        }
    }
    var popUpDiv = document.getElementById(popUpDivVar);
    window_width = window_width / 2 - 200;//200 is half popup's width
    //popUpDiv.style.left = window_width + 'px';
    popUpDiv.style.left = ($(window).width() - $('#popUpDiv').outerWidth()) / 2 + 'px';
    popUpDiv.style.top = ($(window).height() - $('#popUpDiv').outerHeight()) / 2 + 'px';
}

function popup(windowname) {
    blanket_size(windowname);
    window_pos(windowname);
    toggle('blanket');
    toggle(windowname);
}

function toggle(div_id) {
    var el = document.getElementById(div_id);
    if (el.style.display == 'none') { el.style.display = 'block'; }
    else { el.style.display = 'none'; }
}

function blanket_size(popUpDivVar) {
    if (typeof window.innerWidth != 'undefined') {
        viewportheight = window.innerHeight;
    } else {
        viewportheight = document.documentElement.clientHeight;
    }
    if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
        blanket_height = viewportheight;
    } else {
        if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
            blanket_height = document.body.parentNode.clientHeight;
        } else {
            blanket_height = document.body.parentNode.scrollHeight;
        }
    }
    var blanket = document.getElementById('blanket');
    blanket.style.height = blanket_height + 'px';
    var popUpDiv = document.getElementById(popUpDivVar);

    popUpDiv_height = blanket_height / 2 - 300;//200 is half popup's height
    //popUpDiv.style.top = popUpDiv_height + 'px';
    popUpDiv.style.top = ($(window).height() - $('#popUpDiv').outerHeight()) / 2 + 'px';
}

function verExportarArchivo() {
    $('#popUpDiv').css('width', '500px');
    $('#popUpDiv').css('height', '250px');
    popup('popUpDiv');
    $('#divTblComentarios').html('');
    $("#divTblComentarios").html(abrirVentanaArchivoDescarga());
    $("#spmTituloArchivos").html('Exportar información');
}

var CtrDatos = '';
function colsultaModulos() {
    /*El modulo de validaciones corresponde al ---- 207 ---- */
    if (CtrDatos == '') {
        var parametros = {
            Modulo: 207
        };
        peticionAjax('Validaciones.aspx/consultaModulos', "POST", parametros,
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        CtrDatos = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        habilitaControles(CtrDatos);
                    }
                }
                else alertify.success(data.d);
                Waiting(false, "Cargando Información...");
            }, null);
    }
    habilitaControles(CtrDatos);
}

function habilitaControles(datos)
{
    var control;
    for (var i = 0; i < datos.length; i++) {
        if (datos[i]["Habilitado"] == "False") {
            $('#' + datos[i]["NombreControl"]).prop('disabled', 'true');

            $('#' + datos[i]["NombreControl"] + ' input').each(function (index) {
                $(this).prop('disabled', 'true');
            })
        }
        if (datos[i]["Visible"] == "False") {
            $('#' + datos[i]["NombreControl"]).css('visibility', 'hidden');

            $('#' + datos[i]["NombreControl"] + ' input').each(function (index) {
                $(this).css('visibility', 'hidden');
            })
        }
    }
}


function abrirVentanaArchivoDescarga() {
    var cad = ' <div style="width:100%; height:150px;">';
    cad += '      <table width="100%">';
    cad += '         <tr>';
    cad += '             <td class="TituloComentario">&nbsp; Sistema';
    cad += '             </td>';
    cad += '         </tr>';
    cad += '         <tr>';
    cad += '             <td>&nbsp;</td>';
    cad += '        </tr>';

    for (var i = 0; i < listaSistema.length - 1; i++) {
        cad += '       <tr class="tdComentariopend">';
        cad += '             <td style="cursor:pointer; font: 10px Helvetica,Arial,sans-serif;" onclick="descargaArchivo(\'' + listaSistema[i]["SISTEMA"] + '\'); ">';
        cad += '                <span style="width:150; color:rgba(51, 122, 182, 1); " title="Clic para descargar">' + listaSistema[i]["SISTEMA"] + '<span>';
        cad += '                <span style="width:80; float:right; color:rgba(51, 122, 182, 1); " title="Clic para descargar">' + listaSistema[i]["NO VALIDACIONES"] + '<span>';
        cad += '             </td>';
        cad += '       </tr>';
    }
    cad += '    </table>'
    cad += '  </div>'
    return cad;
}

function descargaArchivo(obj) {
    Waiting(true, "Cargando Información...");
    var parametros = {
        sistema: obj,
        pais: nompaislogin
    };
    peticionAjax('Validaciones.aspx/exportaArchivo', "POST", parametros,
        function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                if (data.d == "") {
                    __doPostBack('exportaArchivoLista', obj);
                    alertify.success("Se descargo el archivo " + obj);
                }
                else alertify.success("Sin datos");
            }
            else alertify.success(data.d);
            Waiting(false, "Cargando Información...");
        }, null);
}

function verCargarArchivo() {
    $('#popUpDiv').css('width', '500px');
    $('#popUpDiv').css('height', '170px');

    popup('popUpDiv');
    $('#divTblComentarios').html('');
    $("#divTblComentarios").html(abrirVentanaArchivoCarga());
    $("#spmTituloArchivos").html('Importar información');

    $("#divArrastrar").css("visibility", "visible");
    //$("#tblDetalle").css("visibility", "hidden");


    $('#blanket').css('visibility', 'visible');
    $('#popUpDiv').css('visibility', 'visible');
    $('#TituloArchivos').css('visibility', 'visible');
    $('#divTblComentarios').css('visibility', 'visible');

}

function abrirVentanaArchivoCarga() {

    var cad = ' <div style="width:100%; height:120px;">';
    cad += '      <table width="100%">';
    cad += '         <tr>';
    cad += '             <td>';
    cad += '                <div id="divArrastrar" style="visibility:hidden; width:100%; height:80px; text-align:center; margin-top:-5px; position:relative;  ">' +
                                '<div style="width:480px; height:30px; top:25px; position:absolute; ">' +
                                     '<input type="file" name="AjaxUpload" id="AjaxUpload" /*onclick="limpiaContenido();"*/  onchange="enviarArchivosValidacion(this);" style="display: none;"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel">' +
                                     '<label for="AjaxUpload" id="btnSubirArchivo" class="custom-file-upload" style="float:left;"> Subir Archivo </label>' +
                                        '<span id="textoArchivo">&nbsp; <strong>Nota: </strong>Archivo en formato .xls o .xlsx</span>' +

                                '</div>' +
                                '<div id="divBloqueaSubir" style="width:470px; height:90px; position:absolute; top:0px; visibility:hidden; background-color:rgba(130, 166, 162, 0.1); border-radius:3px; "> ' +
                                    '<span class="parpadea spanMensajeProcesando" id="spanMensajeProcesando" style="top:70px; margin-left:-235px; position:absolute; text-align:center; width:100%; "> Se esta leyendo el archivo...! </span> </div>';
    //'<div style="width:100px; height:30px; text-align:center; float:right ">' +
    //   //'&nbsp;<input type="button" name="btnLoad" value="Cargar Archivo"  id="inputValidaciones" class="classButton" style="font-family:Arial;font-size:X-Small; margin-top:5px;" onclick="enviarArchivosValidacion(this)">' +
    //    //' <input id="btnCargar" style="display: none;" type="file" onchange="checkfile(this);" name="fuArchivosAdjuntos" />' +
    //'</div>' +
    cad += '                </div>';
    cad += '             </td>';
    cad += '         </tr>';
    cad += '      </table>';

    cad += '      <table id="tblDetalle" width="100%">';
    cad += '         <tr>';
    cad += '             <td class="parpadea TituloError">&nbsp; <span id="spanDetalle"></span>';
    cad += '             </td>';
    cad += '         </tr>';
    cad += '    </table>'
    cad += '  </div>';
    return cad;


}

//function limpiaContenido()v
//    {
//    $('#spanDetalle').html('');
//    }

function enviarArchivosValidacion(obj) {


    $('#divBloqueaSubir').css('visibility', 'visible');
    $('#spanDetalle').html('');
    var idInputFile = 'AjaxUpload';
    var parametros = {
        'subirArchivoValidaciones': 'subirArchivoValidaciones',
    };
    ajaxCargarArchivo(idInputFile, obj, parametros);
}


var nomArchivoASubir;
function ajaxCargarArchivo(idInputFile, obj, parametros) {
    $.ajaxFileUpload
		    ({
		        url: 'Validaciones.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,

		        complete: function () {
		        },
		        success: function (data, status) {

		            reportarStatusDeSubidaAdjuntos(data, status);
		        }
		    });
}

//------------------------------------------------------------------------------------------

function acultaVentanaCarga(obj) {
    if (obj == true) {
        $('#blanket').css('visibility', 'visible');
        $('#popUpDiv').css('visibility', 'visible');
        $('#TituloArchivos').css('visibility', 'visible');
        $('#divTblComentarios').css('visibility', 'visible');
        $('#divBloqueaSubir').css('visibility', 'visible');
        $('#btnSubirArchivo').css('visibility', 'visible');
        $('#textoArchivo').css('visibility', 'visible');
    }
    else {
        $('#blanket').css('visibility', 'hidden');
        $('#popUpDiv').css('visibility', 'hidden');
        $('#TituloArchivos').css('visibility', 'hidden');
        $('#divTblComentarios').css('visibility', 'hidden');
        $('#divBloqueaSubir').css('visibility', 'hidden');
        $('#btnSubirArchivo').css('visibility', 'hidden');
        $('#textoArchivo').css('visibility', 'hidden');

        $('.ui-button-text-only').css('padding', '0px');
        $('.ui-button-text').css('padding', '0px');
    }
}

function reportarStatusDeSubidaAdjuntos(data, status) {

    peticionAjax("Validaciones.aspx/confirmaActualizarRegistros", "POST", null, function (data1) {
        if (data1.d.split('-')[0] == "OK") {
            acultaVentanaCarga(false);
            MostrarMsj("Se actualizara la información del sistema " + data1.d.split('-')[2] + " ¿Desea continuar?", "Mensaje ", true, true, false, "Si", "No", "", 300, 120,
            function () {
                acultaVentanaCarga(true);
                $('#spanMensajeProcesando').html('La información se esta actualizando...!');
                peticionAjax("Validaciones.aspx/validaAltaregistros", "POST", null, function (data2) {
                    switch (data2.d) {
                        case "OK":
                            $('#spanDetalle').html('Los datos se actualizaron correctamente');
                            $('#spanDetalle').css('color', 'rgb(0, 0, 0)');
                            $('#divBloqueaSubir').css('visibility', 'hidden');
                            break;
                        case "FALTA":
                            $('#spanDetalle').html("El archivo tiene información invalida");
                            $('#spanMensajeProcesando').html('');
                            $('#divBloqueaSubir').css('visibility', 'hidden');
                            break;
                        case "":
                            $('#spanDetalle').html("El archivo seleccionado tiene errores");
                            $('#spanMensajeProcesando').html('');
                            $('#divBloqueaSubir').css('visibility', 'hidden');
                            break;
                        default:
                            $('#spanMensajeProcesando').html('');
                            $('#spanDetalle').html(data2.d);
                            $('#spanDetalle').css('color', 'rgb(111, 0, 0)');
                            $('#divBloqueaSubir').css('visibility', 'hidden');
                            break;
                    }
                }, null);
                $("#divVentanaMensajes").dialog("close");
            }, function () {
                acultaVentanaCarga(true);
                Waiting(false, "Cargando Información...");
                $('#divBloqueaSubir').css('visibility', 'hidden');
                $("#divVentanaMensajes").dialog("close");
            }, null);



            //////alertify.confirm("Se actualizaran " + data1.d.split('-')[1] + " registros del sistema " + data1.d.split('-')[2] + " ¿Desea continuar?", function (e) {
            //////    if (e) {
            //////        $('#spanMensajeProcesando').html('La información se esta actualizando...!');
            //////        peticionAjax("Validaciones.aspx/validaAltaregistros", "POST", null, function (data2) {
            //////            switch (data2.d) {
            //////                case "OK":
            //////                    $('#spanDetalle').html('Los datos se actualizaron correctamente');
            //////                    $('#spanDetalle').css('color', 'rgb(0, 0, 0)');
            //////                    //$('#popUpDiv').css('width', '1000px');
            //////                    //$('#popUpDiv').css('height', '700px');
            //////                    //window_pos('popUpDiv');
            //////                    $('#divBloqueaSubir').css('visibility', 'hidden');

            //////                    break;
            //////                case "FALTA":
            //////                    $('#spanDetalle').html("El archivo tiene información invalida");
            //////                    $('#spanMensajeProcesando').html('');
            //////                    $('#divBloqueaSubir').css('visibility', 'hidden');
            //////                    break;
            //////                case "":
            //////                    $('#spanDetalle').html("El archivo seleccionado tiene errores");
            //////                    $('#spanMensajeProcesando').html('');
            //////                    $('#divBloqueaSubir').css('visibility', 'hidden');
            //////                    break;
            //////                default:
            //////                    $('#spanMensajeProcesando').html('');
            //////                    $('#spanDetalle').html(data2.d);
            //////                    $('#spanDetalle').css('color', 'rgb(111, 0, 0)');
            //////                    $('#divBloqueaSubir').css('visibility', 'hidden');
            //////                    break;
            //////            }
            //////        }, null);
            //////        $("#divVentanaMensajes").dialog("close");

            //////    }
            //////    else {
            //////        Waiting(false, "Cargando Información...");
            //////        $('#divBloqueaSubir').css('visibility', 'hidden');
            //////    }
            //////});

            //            function () {

            //            },
            //            function () {
            //                $("#divVentanaMensajes").dialog("close");
            //            }, null
            //         );
        }
        else {
            alert(data1.d);
        }
    }, null);
}

function validaArchivo() {
    Waiting(true, "Cargando Información...");
    peticionAjax('Validaciones.aspx/validaAlmacenaArchivo', "POST", {},
         function (data) {
             switch (data.d) {
                 case "OK":
                     alertify.confirm("Se almacenara la información del archivo. ¿Desea continuar? ", function (e) {
                         if (e) {
                             almacenaArchivoValidaciones();
                         }
                         else {
                             Waiting(false, "Cargando Información...");
                         }
                     });
                     break;
                 default:
                     alertify.success(data.d);
                     Waiting(false, "Cargando Información...");
                     break;
             }
         }, null);
}

function almacenaArchivoValidaciones() {
    peticionAjax('Validaciones.aspx/AlmacenaArchivo', "POST", {},
         function (data) {
             switch (data.d.split('-')[0]) {
                 case "OK":
                     muestraDetalleCarga(data);
                     break;
                 default:
                     Waiting(false, "Cargando Información...");
                     break;
             }
         }, null);
}

function muestraDetalleCarga(data) {
    $("#spanDetalle").html("Detalle de la información");
    var aux = data.d.split('-')[1].split('|');
    alertify.success("La información se almaceno correctamente...!");

    var detalle = "<div class='tituloArrastrarArchivo' style='height:20px; font-size: 12px;'>Nombre del Archivo: <span>" + aux[0].split(':')[1] + "</span></div>";
    detalle += "<div class='tituloArrastrarArchivo' style='height:20px; font-size: 12px;'>Número de registros: <span>" + aux[1].split(':')[1] + "</span></div>";
    detalle += "<div class='tituloArrastrarArchivo' style='height:20px; font-size: 12px;'>Autor de subida: <span>" + aux[2].split(':')[1] + "</span></div>";

    $("#divDetalleArchivo").html(detalle);
    $("#tblDetalle").css("visibility", "visible");
    $('#popUpDiv').css('height', '270px');

    Waiting(false, "Cargando Información...");
}

//**************************************************************************************************************************************************


var nompaislogin = '';
var idpaislogin = '';
function ObtienePais() {

    peticionAjax('Validaciones.aspx/obtienepais', "POST", null, function (data) {
        idpaislogin = data.d.toString();
        switch (idpaislogin) {
            case "1":
                nompaislogin = "MEXICO";
                break;
            case "2":
                nompaislogin = "GUATEMALA";
                break;
            case "4":
                nompaislogin = "HONDURAS";
                break;
            case "6":
                nompaislogin = "PERU";
                break;
            case "7":
                nompaislogin = "PANAMA";
                break;
            case "8":
                nompaislogin = "EL SALVADOR";
                break;
            case "11":
                nompaislogin = "BRASIL";
            default: break;

        }
        GetValidacionesTablero();
    }, null);


}

var listaSistema;

function GetValidacionesTablero() {
    Waiting(true, "Cargando Información...");
    var parametros = {
        FVCPais: nompaislogin,
    };
    peticionAjax('Validaciones.aspx/GetValidacionesTablero', "POST", parametros,
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        listaSistema = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        var JSONSubLista = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);

                        $("#divTblCatValidaciones").html(CreaTablaIncidencias(JSON, JSONSubLista, "Principal"));
                    }
                    else MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
                else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Cargando Información...");
            }, null);
}

function CreaTablaIncidencias(listaDeJSON, JSONSubLista, idTabla) {
    var cad = '<center><table id="tblIncidencias' + idTabla + '" width="100%" class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr valign="top">';
    cad += "<th></th>";
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        cad += '<th valign="top" style="width:50%;">';
        cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += ((filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + " alt='aa' onclick='MostarOcultarSubIncidencias(this);' id='tr_" + filas + "' style='cursor:pointer' title='Clic para Mostrar Validaciones'>";
        var json = listaDeJSON[filas];
        cad += listaDeJSON[filas]["SISTEMA"] != "TOTAL" ? '<td style="width:10px;"><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>' : "<td></td>";
        for (var element in json) {
            cad += '<td style="' + (element == "NO VALIDACIONES" ? 'text-align:right;' : 'text-align:left;') + (element == "SISTEMA" ? 'width: 26.5%;"' : '"') + '>';
            cad += json[element];


            cad += '</td>';
        }
        cad += '<td id="td_' + filas + '"></td>';
        cad += '</tr>';
        if (listaDeJSON[filas]["SISTEMA"] != "TOTAL")
            cad += '<tr id="trHijo_' + filas + '" style="display:none;" class="trAOcultar"><td colspan="3">' + CreaSubTablaIncidencias(JSONSubLista, listaDeJSON[filas]["SISTEMA"], "SubTabla") + '</td></tr>';
    }
    cad += '</tbody>';
    cad += '</table>';
    cad += '</center>';
    return cad;
}

function CreaSubTablaIncidencias(listaDeJSON, sistema, idTabla) {
    var cad = '<center><table id="tblIncidencias' + idTabla + '" width="100%" class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr valign="top">';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        if (encabezados != "SISTEMA" && encabezados != "CAMPO" && encabezados != "idFuente") {
            if (encabezados.toString() == "NOMBRE") {
                cad += '<th valign="top" style="background: rgb(5, 95, 95);  width:60%;">';
                cad += encabezados.toString();
                cad += '</th>';
            }
            else {
                cad += '<th valign="top" style="background: rgb(5, 95, 95); width:10%;">';
                cad += encabezados.toString();
                cad += '</th>';
            }
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        if (listaDeJSON[filas].SISTEMA == sistema) {
            cad += ((filas % 2 == 0) ? '<tr style="background:rgba(128, 128, 128, 0.14) /*rgba(128, 128, 128, 0.46);*/" ' : '<tr  style="background: rgba(255, 255, 255, 0.72); /*rgba(128, 128, 128, 0.14)*/" ') + "  >";
            var json = listaDeJSON[filas];
            for (var element in json) {
                if (element != "SISTEMA" && element != "CAMPO" && element != "idFuente") {
                    if (element == "VALIDO NEG." || element == "VALIDO SIST" || element == "MODO ESTR") {
                        var aplicarDisabled = true;
                        if (element == "VALIDO NEG.")
                            aplicarDisabled = listaDeJSON[filas]["VALIDO NEG."] == "0" ? false : true;
                        if (element == "VALIDO SIST")
                            aplicarDisabled = listaDeJSON[filas]["VALIDO NEG."] == "0" || listaDeJSON[filas]["VALIDO SIST"] == "1" ? true : false;
                        if (element == "MODO ESTR")
                            aplicarDisabled = listaDeJSON[filas]["VALIDO SIST"] == "0" || listaDeJSON[filas]["MODO ESTR"] == "1" ? true : false;

                        var descCheck = (element == "VALIDO NEG." ? "Validación Negocio/FIValidNeg" : (element == "VALIDO SIST" ? "Validación Sistemas/FIValidUsr" : "Modo Estres/FIModoEstres"));
                        cad += '<td id="td_' + descCheck.split('/')[1] + '"><input type="checkbox" id="chk_' + filas + '_' + descCheck.split('/')[1] + '" onchange="chkCalidadValidacionesTablero_Change(this,\'' + listaDeJSON[filas].CLAVE + '\',\'' + listaDeJSON[filas].NOMBRE + '\',\'' + listaDeJSON[filas]["SISTEMA"] + '\',\'' + listaDeJSON[filas].idFuente + '\');" ' +
                         (aplicarDisabled ? ' disabled="disabled" ' : ' ') +
                         (json[element] == "1" ? ' checked="checked" ' : ' ') + '/> ' + descCheck.split('/')[0] + ' </td>';
                    }
                    else {
                        cad += '<td style="text-align:left;' + (element == "CLAVE" ? 'text-decoration: underline;color: blue;cursor:pointer;' : '') + '"' +
                                (element == "CLAVE" ? ' title="Clic para Ver Cédula" ' +
                                ' onclick="verCedulaCalidadValidaciones(\'' + listaDeJSON[filas].idFuente + '\',\'' + listaDeJSON[filas]["CLAVE"] + '\',\'' + listaDeJSON[filas]["SISTEMA"] + '\',\'' + listaDeJSON[filas]["NOMBRE"] + '\',false,true);" ' : '') + '>';
                        cad += json[element];
                        cad += '</td>';
                    }
                }
            }
            cad += '</tr>';
        }
    }
    cad += '</tbody>';
    cad += '</table>';
    cad += '</center>';
    return cad;
}

function MostarOcultarSubIncidencias(obj) {
    /*Collapsar todas las Filas*/
    var altObj = $(obj).attr("alt");
    $(".trAOcultar").hide();
    $(".row").attr("alt", "aa");
    $(".alternateRow").attr("alt", "aa");
    $($(".row").children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
    $($(".alternateRow").children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
    $(obj).attr("alt", altObj);
    /**/

    if ($(obj).attr("alt") == "aa") {
        $(obj).attr("title", "Clic para Ocultar Validaciones");
        $("#trHijo_" + $(obj).attr("id").split("_")[1]).show(); //.slideDown("slide");
        $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
    }
    else {
        $(obj).attr("title", "Clic para Mostrar Validaciones");
        $("#trHijo_" + $(obj).attr("id").split("_")[1]).hide;
        $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
    }
    $(obj).attr("alt", ($(obj).attr("alt") == "aa" ? "ab" : "aa"));
}


function chkCalidadValidacionesTablero_Change(obj, clave, descripcionValidacion, sistema, idFuente) {
    Waiting(true, "Cargando Información...");
    peticionAjax('Validaciones.aspx/actualizarCheckValidaciones', "POST", { idFuente: idFuente, clave: clave, campoUpdate: $(obj).attr("id").split('_')[2], valor: ($(obj).is(":checked") ? "1" : "0"), descripcionValidacion: descripcionValidacion, sistema: sistema },
            function (data) {
                if (data.d.indexOf("ERRORCATCH") != -1)
                    MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                else {
                    $(obj).attr("disabled", true);
                    if ($(obj).attr("id").split('_')[2] == "FIValidNeg")
                        $("#chk_" + $(obj).attr("id").split('_')[1] + "_FIValidUsr").attr("disabled", false);
                    if ($(obj).attr("id").split('_')[2] == "FIValidUsr")
                        $("#chk_" + $(obj).attr("id").split('_')[1] + "_FIModoEstres").attr("disabled", false);
                }
                Waiting(false, "Cargando Información...");
            }, null);
}

function resizeTablaCalidadValidaciones() {
    var valorH = (document.documentElement.clientHeight - document.getElementById("divHeader").offsetHeight) - 100;
    document.getElementById("divTblCatValidaciones").style.height = valorH + "px";
    setTimeout(function () { resizeEncabezadoGeneric("TblCatValidaciones"); }, 10);
}



function verCedulaCalidadValidaciones(idFuente, clave, fuente, validacion, esAgregarReg, mostrarBtnEditSave) {
    arregloCatalogosValidacionesCalidad = new Array();
    WaitingVtn("divBloqVtnVerValidacionesMet", true, false, "");
    WaitingVtn("divBloqVtnVerIncidencias", true, false, "");
    var cadena = '<div id="divBloqVtnVerCedulaValidacionesMet" style="  z-index: 100;margin-top: -13px;width:97.5%;height:98.5%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:' + (mostrarBtnEditSave ? '95' : '100') + '%;overflow:hidden;text-align:center;float:left;">'
    cadena += '<div id="dvDetalleEITblVerCedulaValidacionesMet" style="width:100%;height:97%;overflow-y: auto;overflow-x: hidden;margin-top: 0px;">  ';
    cadena += '</div></div>';
    cadena += mostrarBtnEditSave ? ('<input id="btnEditar" type="button" value="' + (!esAgregarReg ? 'Editar' : 'Guardar') + '" class="classButton" style="float: right;padding-left: 10px;padding-right: 10px;" onclick="CambiaAEditableCedulaValidaciones(this,' + esAgregarReg + ');"/>') : '';
    $("#divVtnVerCedulaValidacioneMet").empty();
    AgregarVtnFlotante("divVtnVerCedulaValidacioneMet", "", !esAgregarReg ? ("CÉDULA VALIDACIONES " + fuente + validacion != "undefined" ? (" (" + validacion.toUpperCase() + ")") : "") : fuente, "", cadena, 700, 600, false, false, "", "", null);
    WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "40%";

    setTimeout(monitoreaValorTxt, 500);
    peticionAjax("Validaciones.aspx/getCedulaValidaciones", "POST", { idFuente: idFuente, clave: clave, esAgregarReg: esAgregarReg }, function (data) {
        if (data.d == "" || data.d == null || data.d.indexOf("ERRORCATCH") != -1) {
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
        if (!esAgregarReg)
            $("#divVtnVerCedulaValidacioneMet").dialog("option", "title", "CÉDULA VALIDACIONES " + fuente + (JSON[0].DESCRIPCION != undefined && JSON[0].DESCRIPCION != "" ? " (" + JSON[0].DESCRIPCION + ")" : "") + "\"" + (validacion != "undefined" ? validacion.toUpperCase() : "") + "\"");
        $("#dvDetalleEITblVerCedulaValidacionesMet").html(generarTablaDeRegistrosCedulaVal(JSON, esAgregarReg));


        if (mostrarBtnEditSave)
            setTimeout(responsablesCedula, 1000);

        SegmentoVar = JSON[11].DESCRIPCION;
        var EtapaString = JSON[9].DESCRIPCION;
        switch (EtapaString) {
            case "I":
                EtapaVar = 1;
                break;
            case "II":
                EtapaVar = 2;
                break;
            case "III":
                EtapaVar = 3;
                break;
            default: EtapaVar = 0; break;

        }

        $("#payments").msDropdown();
        $("#payments2").msDropdown();
        $(".divEditFecha").datepicker();
        if (!esAgregarReg)
            $(".ui-datepicker-trigger").hide();

        document.getElementById("payments") != null ? document.getElementById("payments").style.height = "auto" : null;
        document.getElementById("payments2_child") != null ? document.getElementById("payments2_child").style.height = "auto" : null;
        cargaCatalogosValidacionesCalidad(0, esAgregarReg);

        $("#slt_FVCCampo").css("display", "none");

        colsultaModulos();

    }, null);
    $("#divVtnVerCedulaValidacioneMet").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtnVerValidacionesMet", false, false, "");
        WaitingVtn("divBloqVtnVerIncidencias", false, false, "");
    });
}

var arregloCatalogosValidacionesCalidad = new Array();
var cadAuxCMB = "";
function generarTablaDeRegistrosCedulaVal(listaDeJSON, esAgregarReg) {
    var encabezadoAux = '';
    var cad = '<center><table id="tblContenidoValidacionesCedula" width="100%" class="dataGridDatos" style="font-size: 9px;height:99%">';

    cad += '<thead>';
    cad += '<tr style="font-size: 9px;">';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON)
        if (encabezados == "CONCEPTO" || encabezados == "DESCRIPCION")
            cad += '<th>' + encabezados.toString() + '</th>';

    cad += '</tr>';
    cad += '</thead>';

    var cadSec = '';
    var i = 0;
    var contar = 0;
    var start = 0;
    var Contador = 0;

    cad += '<tbody style="font-size: 9px;">';
    var metodologias = "";
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        if (filas == 0 || (listaDeJSON[filas].CONCEPTO != listaDeJSON[filas - 1].CONCEPTO))
            cad += (filas % 2 == 0) ? '<tr class="row" style="font-size: 9px; height: 32px;" >' : '<tr class="alternateRow" style="font-size: 9px;  height: 32px;">';
        var json = listaDeJSON[filas];
        var colorTd = "";

        for (var element in json) {
            if (element == 'CONCEPTO' && (filas == 0 || (listaDeJSON[filas].CONCEPTO != listaDeJSON[filas - 1].CONCEPTO))) {
                if (listaDeJSON[filas].CONCEPTO == 'METODOLOGIA') {
                    cad += '<td style="text-align:left;width:20%;  height: 25x;font-weight: bold;color:Black;" id="divLstMet2">';
                } else {
                    cad += '<td style="text-align:left;width:20%;  height: 25x;font-weight: bold;color:Black; ">';
                }

                cad += json[element];
                cad += '</td>';
            } else if (element == 'DESCRIPCION') {
                cadSec = json["DESCRIPCION"];
                while ((start = cadSec.indexOf("&&", start) + 1) > 0)
                    contar++;

                for (i = 0; i < contar; i++)
                    cadSec = cadSec.replace('&&', '\\');

                if (filas == 0 || (listaDeJSON[filas].CONCEPTO != listaDeJSON[filas - 1].CONCEPTO)) {
                    cad += '<td style="font-family: verdana;word-wrap: break-word;max-width: 222px;text-align:left;width:30%;  height: 25px;font-size: 9px;' + colorTd + '">';
                    cad += !esAgregarReg && listaDeJSON[filas].CONCEPTO != 'METODOLOGIA' ? '<div  class="' + (listaDeJSON[filas].HABILITAR == '0' ? "divSE" : "divNoEdit") + '">' + (json["CONCEPTO"] == 'SIMBOLOGIA' ? (json[element] != "" ? ('<span class="' + (json[element] == "WARNING" ? 'EstatusNaranja' : 'EstatusRojo') + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>') : '') + (json[element] != "" ? "&nbsp&nbsp" + json[element] : "SIN SIMBOLOGÍA") : cadSec.split('%&')[0]) + '</div>' : '';
                }

                var esCampoNombre = false;

                if (listaDeJSON[filas].CONTROL == "txt") {
                    if (listaDeJSON[filas].HABILITAR != '0')
                        cad += '  <textarea alt="' + listaDeJSON[filas].NAMECOL + '" id="txt_' + listaDeJSON[filas].NAMECOL + '" maxlength="' + listaDeJSON[filas].LENGTH + '" ' + (esCampoNombre ? '' : 'class="' + (listaDeJSON[filas].HABILITAR == '0' ? 'divSE"' : 'divEdit"')) + '  cols="30" rows="2" style="' + (!esAgregarReg ? 'display:none;' : '') + 'font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:' + (listaDeJSON[filas].HABILITAR == '0' ? "#dddddd" : "White") + ';width:100%; text-align:left; border: xx;height:100%;margin-bottom: 4px;" >' + cadSec.split('%&')[0] + '</textarea>';
                    else
                        cad += '  <textarea alt="' + listaDeJSON[filas].NAMECOL + '" id="txt_' + listaDeJSON[filas].NAMECOL + '" maxlength="' + listaDeJSON[filas].LENGTH + '" ' + (esCampoNombre ? '' : 'class="' + (listaDeJSON[filas].HABILITAR == '0' ? 'divSE"' : 'divEdit"')) + '  cols="30" rows="2" readonly="readonly" style="' + (!esAgregarReg ? 'display:none;' : '') + 'font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:' + (listaDeJSON[filas].HABILITAR == '0' ? "#dddddd" : "White") + ';width:100%; text-align:left; border: xx;height:100%;margin-bottom: 4px;" >' + cadSec.split('%&')[0] + '</textarea>';
                }
                else if (listaDeJSON[filas].CONTROL == "txtF")
                    cad += '<input alt="' + listaDeJSON[filas].NAMECOL + '" id="txtF_' + listaDeJSON[filas].NAMECOL + '" type="txt" maxlength="' + listaDeJSON[filas].LENGTH + '" class="' + (listaDeJSON[filas].HABILITAR == '0' ? "divSEFecha" : "divEditFecha") + '" value="' + json[element] + '" style="' + (!esAgregarReg ? 'display:none;' : '') + 'width: 84%;height: 100%;font-size: 10px;" onchange="changeFormatoFecha(event,this);" onkeyup="changeFormatoFecha(event,this);"/>';
                else if (listaDeJSON[filas].CONTROL == "cmbS") {
                    cad += '<select id="payments2" alt="' + listaDeJSON[filas].NAMECOL + '" name="payments2" style="' + (!esAgregarReg ? 'display:none;' : '') + 'width:100%;height: auto"><option data-image="../../images/PanelDeControl/warning.png" ' + (json[element] == "WARNING" ? 'selected="selected"' : '') + '>WARNING </option><option data-image="../../images/PanelDeControl/error.png" ' + (!esAgregarReg && json[element] == "ERROR" ? 'selected="selected"' : '') + '>ERROR </option></select>';
                }
                else if (listaDeJSON[filas].CONTROL == "cmb") {

                    if (filas == 0 || (listaDeJSON[filas].CONCEPTO != listaDeJSON[filas - 1].CONCEPTO)) {

                        if (listaDeJSON[filas].CONCEPTO == "CAMPO, DATO VALIDADO") {
                            //if (listaDeJSON[3].DESCRIPCION.substring(0, 3) == "SIC") {
                            if (listaDeJSON[3].DESCRIPCION == "SIC 300") {
                                cad += '<div  id="div_Descripcion" style="display:none;">' + listaDeJSON[filas].DESCRIPCION + '</div>'

                                cad += '<textarea alt="' + listaDeJSON[filas].NAMECOL + '" id="txt_CampoDato" maxlength="600" cols="30" rows="2" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:white;' +
                                           'width:100%; text-align:left; border: xx; height:100%; margin-bottom: 4px;display:none; " >';
                                cad += ' </textarea> <img id="spanBoton" src="../../Images/calidad/btnAnterior.png" onclick="ocultarDatoValidado();" style="height: 20px; width: 20px; display:none; cursor:pointer; vertical-align: 10px;" /> ';
                            }

                            else {
                                /*campo, dato validado si en archivo no hay datos se pone un txt, no tiene sentido de el por que se pone. */

                                if (listaDeJSON[3].DESCRIPCION == "") {
                                    cad += '<textarea alt="' + listaDeJSON[filas].NAMECOL + '" id="txt_CampoDato" maxlength="600" cols="30" rows="2" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:white;' +
                                             'width:100%; text-align:left; border: xx; height:100%;margin-bottom: 4px;" >';
                                    cad += ' </textarea> <img id="spanBoton" src="../../Images/calidad/btnAnterior.png" onclick="ocultarDatoValidado();" style="height: 20px; width: 20px; display:none; cursor:pointer; vertical-align: 10px;" /> ';
                                }
                                else {
                                    cad += '<div  class=\"divEdit\" style="display:none;">' + listaDeJSON[filas].DESCRIPCION + '</div>'
                                    continue;
                                }
                            }
                        }
                        cad += listaDeJSON[filas].CONCEPTO == 'METODOLOGIA' ? ' <div id="divLstMet" lang="' + listaDeJSON[filas].NAMECOL + '"></div>' : '<select alt="' + listaDeJSON[filas].NAMECOL + '" id="slt_' + listaDeJSON[filas].NAMECOL + '" class="' + (listaDeJSON[filas].HABILITAR == '0' ? "divSE" : "divEdit") +
                         '" style="' + (!esAgregarReg ? 'display:none;' : '') + 'width: 100%;height: 100%;font-size:10px;" ' + (listaDeJSON[filas].CONCEPTO == 'SISTEMA' ? ' onchange="sltSistema_OnChange(this,' + esAgregarReg + ');" ' : ' ') +
                          (listaDeJSON[filas].CONCEPTO == 'CAMPO, DATO VALIDADO' ? ' onchange="sltCampoDato_OnChange(this,' + esAgregarReg + ');" ' : ' ') +
                          (listaDeJSON[filas].CONCEPTO == 'ETAPA DE VALIDACION' ? ' onchange="EtapaValidacion_OnChange(this,' + esAgregarReg + ');" ' : ' ') +
                          (listaDeJSON[filas].CONCEPTO == 'SEGMENTO' ? ' onchange="SegmentoValidacion_OnChange(this,' + esAgregarReg + ');" ' : ' ') +
                          '><select/>';

                    }

                    if (listaDeJSON[filas].CONCEPTO != 'METODOLOGIA')
                        arregloCatalogosValidacionesCalidad.push("slt_" + listaDeJSON[filas].NAMECOL + "%%&&" + json[element]);
                    else
                        metodologias += json[element] + ",";
                    if (filas == listaDeJSON.length - 1)
                        arregloCatalogosValidacionesCalidad.push("slt_" + listaDeJSON[filas].NAMECOL + "%%&&" + metodologias);

                }
                cad += '</td>';
            }
        }
        Contador = Contador + 1;
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table>';
    cad += '</center>';
    return cad;
}

function ocultarDatoValidado() {
    $("#spanBoton").css("display", "none");
    $("#slt_FVCCampo").css("display", "inline-block");
    $("#slt_FVCCampo").css("margin-bottom", "4px");
    $('#slt_FVCCampo').val('1 FECHA DEL REPORTE');
    $("#txt_CampoDato").css("display", "none");
    $("#txt_CampoDato").val('');
}

function responsablesCedula() {
    $("#txt_FVCResponsable").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: false

    });
    $("#txt_FVCResponsable").result(function (event, data, formatted) {
        var txtFinal = "";
        for (var i = 0; i < valorName1.split(',').length - 1; i++) {
            txtFinal += valorName1.split(',')[i] + ",";
        }
        $("#txt_FVCResponsable").val(txtFinal + ($(this).val().split(':').length == 2 ? $(this).val() : $(this).val().split(',')[$(this).val().split(',').length - 2] + ", "));
    });

    $("#txt_FVCCorresponsables").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: false

    });
    $("#txt_FVCCorresponsables").result(function (event, data, formatted) {
        var txtFinal = "";
        for (var i = 0; i < valorName2.split(',').length - 1; i++) {
            txtFinal += valorName2.split(',')[i] + ",";
        }
        $("#txt_FVCCorresponsables").val(txtFinal + ($(this).val().split(':').length == 2 ? $(this).val() : $(this).val().split(',')[$(this).val().split(',').length - 2] + ", "));
    });


    $("#txt_FVCEnvioD").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: false

    });
    $("#txt_FVCEnvioD").result(function (event, data, formatted) {
        var txtFinal = "";
        for (var i = 0; i < valorName3.split(',').length - 1; i++) {
            txtFinal += valorName3.split(',')[i] + ",";
        }
        $("#txt_FVCEnvioD").val(txtFinal + ($(this).val().split(':').length == 2 ? $(this).val() : $(this).val().split(',')[$(this).val().split(',').length - 2] + ", "));
    });


    $("#txt_FVCEnvioS").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: false

    });
    $("#txt_FVCEnvioS").result(function (event, data, formatted) {
        var txtFinal = "";
        for (var i = 0; i < valorName4.split(',').length - 1; i++) {
            txtFinal += valorName4.split(',')[i] + ",";
        }
        $("#txt_FVCEnvioS").val(txtFinal + ($(this).val().split(':').length == 2 ? $(this).val() : $(this).val().split(',')[$(this).val().split(',').length - 2] + ", "));
    });

    // Probar coagregar handle

    $("#txt_FVCEnvioQ").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: false

    });
    $("#txt_FVCEnvioQ").result(function (event, data, formatted) {
        var txtFinal = "";
        for (var i = 0; i < valorName5.split(',').length - 1; i++) {
            txtFinal += valorName5.split(',')[i] + ",";
        }
        $("#txt_FVCEnvioQ").val(txtFinal + ($(this).val().split(':').length == 2 ? $(this).val() : $(this).val().split(',')[$(this).val().split(',').length - 2] + ", "));
    });


    $("#txt_FVCEnvioM").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: false

    });
    $("#txt_FVCEnvioM").result(function (event, data, formatted) {
        var txtFinal = "";
        for (var i = 0; i < valorName6.split(',').length - 1; i++) {
            txtFinal += valorName6.split(',')[i] + ",";
        }
        $("#txt_FVCEnvioM").val(txtFinal + ($(this).val().split(':').length == 2 ? $(this).val() : $(this).val().split(',')[$(this).val().split(',').length - 2] + ", "));
    });


    $("#txt_FVCEnterado").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: false

    });
    $("#txt_FVCEnterado").result(function (event, data, formatted) {
        var txtFinal = "";
        for (var i = 0; i < valorName7.split(',').length - 1; i++) {
            txtFinal += valorName7.split(',')[i] + ",";
        }
        $("#txt_FVCEnterado").val(txtFinal + ($(this).val().split(':').length == 2 ? $(this).val() : $(this).val().split(',')[$(this).val().split(',').length - 2] + ", "));
    });
}

var valorName1 = ""; var valorName2 = "";
var valorName3 = ""; var valorName4 = "";
var valorName5 = ""; var valorName6 = "";
var valorName7 = "";

function monitoreaValorTxt() {
    valorName1 = $("#txt_FVCResponsable").val();
    valorName2 = $("#txt_FVCCorresponsables").val();
    valorName3 = $("#txt_FVCEnvioD").val();
    valorName4 = $("#txt_FVCEnvioS").val();
    valorName5 = $("#txt_FVCEnvioQ").val();
    valorName6 = $("#txt_FVCEnvioM").val();
    valorName7 = $("#txt_FVCEnterado").val();
    setTimeout(monitoreaValorTxt, 100);
}

function sltSistema_OnChange(obj, esAgregarReg) {

    $("#txt_CampoDato").css("display", "none");
    $("#slt_FVCCampo").css("display", "inline-block");
    $("#divLstMet").html("");

    switch ($("#slt_FVCSistema")[0].value) {
        case "SIC":
            $('#slt_FVCCampo').val('1 FECHA DEL REPORTE');
            arregloCatalogosValidacionesCalidad = new Array();
            arregloCatalogosValidacionesCalidad.push("slt_FVCCampo%%&&");
            cargaCatalogosValidacionesCalidad(0, esAgregarReg);
            break;
        case "GARANTIAS":
            $('#slt_FVCCampo').val('1 PERIODO');
            arregloCatalogosValidacionesCalidad = new Array();
            arregloCatalogosValidacionesCalidad.push("slt_FVCCampo%%&&");
            cargaCatalogosValidacionesCalidad(0, esAgregarReg);
            break;
        case "CLIENTES CAPTACIÓN":
            $('#slt_FVCCampo').val('1 CLIENTE ALNOVA');
            arregloCatalogosValidacionesCalidad = new Array();
            arregloCatalogosValidacionesCalidad.push("slt_FVCCampo%%&&");
            cargaCatalogosValidacionesCalidad(0, esAgregarReg);
            break;
        case "CUENTAS CAPTACIÓN":
            $('#slt_FVCCampo').val('1 FECHA');
            arregloCatalogosValidacionesCalidad = new Array();
            arregloCatalogosValidacionesCalidad.push("slt_FVCCampo%%&&");
            cargaCatalogosValidacionesCalidad(0, esAgregarReg);
            break;
        case "CLIENTES RSK":
            $('#slt_FVCCampo').val('1 CLIENTE ALNOVA');
            arregloCatalogosValidacionesCalidad = new Array();
            arregloCatalogosValidacionesCalidad.push("slt_FVCCampo%%&&");
            cargaCatalogosValidacionesCalidad(0, esAgregarReg);
            break;
        case "CLIENTE UNICO":
            $('#slt_FVCCampo').val('1 FECHA');
            arregloCatalogosValidacionesCalidad = new Array();
            arregloCatalogosValidacionesCalidad.push("slt_FVCCampo%%&&");
            cargaCatalogosValidacionesCalidad(0, esAgregarReg);
            break;
        case "REQ. CAPITAL COMERCIAL":
            $('#slt_FVCCampo').val('1 FECHA DEL REPORTE');
            arregloCatalogosValidacionesCalidad = new Array();
            arregloCatalogosValidacionesCalidad.push("slt_FVCCampo%%&&");
            cargaCatalogosValidacionesCalidad(0, esAgregarReg);
            break;
        case "BX CNR":
            $('#slt_FVCCampo').val('1 FICanal');
            arregloCatalogosValidacionesCalidad = new Array();
            arregloCatalogosValidacionesCalidad.push("slt_FVCCampo%%&&");
            cargaCatalogosValidacionesCalidad(0, esAgregarReg);
            break;
        default:
            $("#txt_CampoDato").val($("#div_Descripcion").val());
            $(".ID_CampoDato").css("display", "inline-block");
            $("#txt_CampoDato").css("display", "inline-block");
            $("#slt_FVCCampo").css("display", "none");
            $("#spanBoton").css("display", "none");
            $("#txt_CampoDato").css("width", "100%");

            arregloCatalogosValidacionesCalidad = new Array();
            arregloCatalogosValidacionesCalidad.push("slt_FIdMetodologia%%&&");
            cargaCatalogosValidacionesCalidad(0, esAgregarReg);
            break;
    }

    WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "40%";
}

function cargaCatalogosValidacionesCalidad(idArreglo, esAgregarReg) { // Checar para mandar el id de la fuente
    // var valorSistema = null
    var valorSistema = $("#slt_FVCSistema")[0].value;

    peticionAjax('Validaciones.aspx/getCatalogosValidacionesCalidad', "POST", { opcionCatalogo: arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0].split('_')[1], filtro1: valorSistema == null ? "" : $("#slt_FVCSistema")[0].value /*Cambiar id arrego para siempre poner el sistema*/, filtro2: arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0].split('_')[1] == "FVCSubEtapa" ? EtapaVar : "0" },
        function (data) {
            var cad = '';
            if (arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0].split('_')[1] == "FVCSegmento") {
                if (EtapaVar == 1) {
                    cad += '<option value="A" title="A" lang="1">A</option>';
                    cad += '<option value="B" title="B" lang="2">B</option>';
                    cad += '<option value="C" title="C" lang="3">C</option>';
                }
                if (EtapaVar == 2) {
                    cad += '<option value="D" title="D" lang="4">D</option>';
                    cad += '<option value="E" title="E" lang="5">E</option>';
                    cad += '<option value="F" title="F" lang="6">F</option>';
                }
                if (EtapaVar == 3) {
                    cad += '<option value="G" title="G" lang="7">G</option>';
                    cad += '<option value="H" title="H" lang="8">H</option>';
                    cad += '<option value="I" title="I" lang="9">I</option>';
                }
                $("#slt_FVCSegmento").html(cad);
                document.getElementById(arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0]).options.length = 0;

                $("#" + arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0]).html(cad);
            }

            if (data.d != null && data.d != "" && data.d.indexOf("ERRORCATCH") == -1) {
                var JSON = obtenerArregloDeJSON(data.d, false);
                if (JSON[0] != null) {
                    var indexSlt = -1;

                    if (arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0].split('_')[1] == "FIdMetodologia") {
                        var numItemsChecked = 0;
                        /*Ver si Todos los items Estan en Check*/
                        for (var i = 0; i < JSON.length; i++) {
                            for (var ii = 0; ii < arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[1].split(',').length - 1; ii++) {
                                if (arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[1].split(',')[ii] == JSON[i].descrip) {
                                    numItemsChecked++;
                                    break;
                                }
                            }
                        }

                        for (var i = 0; i < JSON.length; i++) {
                            if (i == 0 && JSON.length > 1)
                                //cad += ' <input type="checkbox" value="Todos" ' + (numItemsChecked == JSON.length ? ' checked="checked" ' : '') + ' id="chk-Todos" onchange="chkSistemas_OnChecked(this);"/>TODOS<br/>';
                                var existeItem = false;
                            for (var ii = 0; ii < arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[1].split(',').length - 1; ii++) {
                                if (arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[1].split(',')[ii] == JSON[i].descrip) {
                                    existeItem = true;
                                    break;
                                }
                            }

                            if (EtapaVar == 2 && (SegmentoVar == 'E' || SegmentoVar == 'F')) {
                                cad += '&nbsp&nbsp<input type="checkbox" ' + (existeItem ? ' checked="checked" ' : '') + ' value="' + JSON[i].IDReg + '" id="chk_' + JSON[i].descrip + '"  onchange="chkSistemas_OnChecked(this);"/>' + JSON[i].descrip + '<br/>';
                            }

                            existeItem = false;
                        }
                        $("#divLstMet").html(cad);
                    }

                    else {
                        document.getElementById(arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0]).options.length = 0;
                        var cad = ''
                        if (arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0] == "slt_FVCSistema") {
                            if (idpaislogin == 1) {
                                for (var i = 0; i < JSON.length; i++) {
                                    var Item = JSON[i];
                                    cad += '<option value="' + Item.descrip.toUpperCase() + '" title="' + Item.descrip.toUpperCase() + '" lang="' + Item.IDReg + '">' + Item.descrip.toUpperCase() + '</option>';
                                    if (Item.descrip.toUpperCase() == arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[1].toUpperCase())
                                        indexSlt = i;
                                }
                            }
                            else if (idpaislogin == 4) {
                                cad += '<option value="' + JSON[0].descrip.toUpperCase() + '" title="' + JSON[0].descrip.toUpperCase() + '" lang="' + JSON[0].IDReg + '">' + JSON[0].descrip.toUpperCase() + '</option>';
                            }
                        }
                        else {
                            for (var i = 0; i < JSON.length; i++) {
                                var Item = JSON[i];
                                cad += '<option value="' + Item.descrip.toUpperCase() + '" title="' + Item.descrip.toUpperCase() + '" lang="' + Item.IDReg + '">' + Item.descrip.toUpperCase() + '</option>';
                                if (Item.descrip.toUpperCase() == arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[1].toUpperCase())
                                    indexSlt = i;
                            }
                        }
                        $("#" + arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0]).html(cad);
                        if (arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0] == "slt_FVCEtapa") {
                            document.getElementById(arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0]).selectedIndex = EtapaVar - 1;
                        }
                        else {
                            document.getElementById(arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0]).selectedIndex = indexSlt != -1 ? indexSlt : 0;
                        }

                        if (arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0] == "slt_FVCPais") {
                            var nompais;
                            if (idpaislogin == 1)
                            { nompais = 0; }
                            if (idpaislogin == 4)
                            { nompais = 2; }
                            document.getElementById(arregloCatalogosValidacionesCalidad[idArreglo].split("%%&&")[0]).selectedIndex = nompais;
                        }
                    }
                }
            }
            else
                if (data.d != null && data.d != "") {
                    MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }

            if (idArreglo + 1 < arregloCatalogosValidacionesCalidad.length)
                cargaCatalogosValidacionesCalidad(idArreglo + 1, esAgregarReg);
            else {
               $("#divLstMet").find(":checkbox").attr("disabled", esAgregarReg || $(".ui-button-text").html() == "Guardar" ? false : true);
              WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "Cargando Información...");
            }

        }
            , null);
}

function chkSistemas_OnChecked(obj) {
    for (var i = 0; i < $("#divLstMet").find("input:checkbox").length; i++) {
        if (obj.value == $($("#divLstMet").find("input:checkbox")[i]).attr("value"))
            $($("#divLstMet").find("input:checkbox")[i]).attr('checked', true);
        else
            $($("#divLstMet").find("input:checkbox")[i]).attr('checked', false);
    }
}

var EtapaVar = 1;
function EtapaValidacion_OnChange(obj, esAgregarReg) {
    arregloCatalogosValidacionesCalidad = new Array();
    arregloCatalogosValidacionesCalidad.push("slt_FVCSubEtapa%%&&");
    arregloCatalogosValidacionesCalidad.push("slt_FVCSegmento%%&&");
    arregloCatalogosValidacionesCalidad.push("slt_FIdMetodologia%%&&");

    switch (obj.value) {
        case "I":
            EtapaVar = 1;
            cargaCatalogosValidacionesCalidad(0, true);
            break;
        case "II":
            EtapaVar = 2;
            cargaCatalogosValidacionesCalidad(0, true);
            break;
        case "III":
            EtapaVar = 3;
            cargaCatalogosValidacionesCalidad(0, true);
            break;
        default: EtapaVar = 0; /*deletechk(false);*/ break;

    }
}

var SegmentoVar = '';
function SegmentoValidacion_OnChange(obj, esAgregarReg) {
    SegmentoVar = obj.value;

    arregloCatalogosValidacionesCalidad = new Array();
    arregloCatalogosValidacionesCalidad.push("slt_FIdMetodologia%%&&");
    cargaCatalogosValidacionesCalidad(0, esAgregarReg);
}

function sltCampoDato_OnChange(obj, esAgregarReg) {
    arregloCatalogosValidacionesCalidad = new Array();
    arregloCatalogosValidacionesCalidad.push("slt_FVCCampo%%&&");
    var valorSistema = $("#slt_FVCCampo")[0].value;
    var dato = arregloCatalogosValidacionesCalidad[0].split("%%&&")[0].split('_')[1];

    if (valorSistema == "0 OTROS") {
        $(".ID_CampoDato").css("display", "inline-block");
        $("#txt_CampoDato").css("display", "inline-block");
        $("#slt_FVCCampo").css("display", "none");
        $("#spanBoton").css("display", "inline-block");
        $("#txt_CampoDato").css("width", "90%");
        $("#txt_CampoDato").css("heigth", "100%");
    }
    else {
        $(".ID_CampoDato").css("display", "none");
        $("#txt_CampoDato").css("display", "none");
        $("#txt_CampoDato").css("width", "100%");
        $("#slt_FVCCampo").css("display", "inline-block");
        $("#spanBoton").css("display", "none");
    }
}

function CambiaAEditableCedulaValidaciones(obj, esAgregarReg) {
    if ($(obj).attr("value") == "Editar") {
        $(".divNoEdit").hide();
        $(".divEdit").css("display", "inline-block");
        $("#payments2_msdd").show();
        $("#divLstMet").find(":checkbox").attr("disabled", false);
        $(".divEditFecha").css("display", "inline-block");
        $("#tblContenidoValidacionesCedula").find("input:button").css("display", "inline-block");

        $("#slt_FVCSistema").attr({
            'class': 'divNoEdit',
            'dtyle': 'width: 100%; height: 100%; font-size: 10px; display: inline-block;',
            'disabled': 'false'
        });

        $(".ui-datepicker-trigger").show();
        $(obj).attr("value", "Guardar");
    }
    else {
        if (!validarCamposGuardarCalidadValidaciones()) {
            $(".divNoEdit").show();
            $(".divEdit").hide();
            GuardarEdicionCalidadValidaciones(esAgregarReg);
            GetValidacionesTablero();
        }
    }
}

function stringToDate(_date, _format, _delimiter) {
    if (_date != "1900-01-01") {
        var dateItems = "";
        if (_date.substring(2, 3) == "/") {
            _delimiter = _date.substring(4, 5);
            dateItems = _date.split(_delimiter);
            _date = dateItems[2] + "-" + dateItems[1] + "-" + dateItems[0];
        }
        else {
            _delimiter = _date.substring(4, 5);
            var dateItems = _date.split(_delimiter);
            _date = dateItems[2] + "-" + dateItems[1] + "-" + dateItems[0];
        }
    }
    return _date;
}


function GuardarEdicionCalidadValidaciones(esAgregarReg) {

    var querySQL = "";
    for (var i = 0; i < $('#tblContenidoValidacionesCedula >tbody >tr').length; i++) {
        if ($($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("textarea")[0]).attr("alt") == "FVCCampo") {

            switch ($("#slt_FVCSistema").val()) {
                case "SIC":
                    if ($($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).val() == "0 OTROS") {
                        querySQL += "FVCCampo" + "=\"" + $("#txt_CampoDato")[0].value.substring() + "°0\"|";
                    }
                    else {
                        querySQL += "FVCCampo" + "=\"" + $("#slt_FVCCampo")[0].value + "°999\"|";
                    }
                    break;
                case "GARANTIAS":
                case "REQ. CAPITAL COMERCIAL":
                case "CLIENTES CAPTACIÓN":
                case "CUENTAS CAPTACIÓN":
                case "CLIENTES RSK":
                case "CLIENTE UNICO":
                case "BX CNR":
                    querySQL += "FVCCampo" + "=\"" + $("#slt_FVCCampo")[0].value + "°999\"|";
                    break;
                default:
                    querySQL += "FVCCampo" + "=\"" + $("#txt_CampoDato").val() + "\"|";
                    break;
            }

        }
        else {
            if ($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select").length > 0 && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") != undefined && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") != "") {
                if (($($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") == 'FVCEtapa' || $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") == 'FVCSubEtapa') && !esAgregarReg) {
                    querySQL += $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") + "=\"" + $($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("div")[0].textContent + "°" + $($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("div")[0].textContent + "\"|";
                }
                else {
                    querySQL += $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") + "=\"" + $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).val() + "°" + $("#" + $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).attr("id") + " option:selected").attr("lang") + "\"|";
                }
            }
            if ($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("textarea").length > 0 && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("textarea")[0]).attr("alt") != undefined && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("textarea")[0]).attr("alt") != "") {
                var rave = $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("textarea")[0]).attr("alt") + "=\"" + $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("textarea")[0]).val() + "\"|";
                var cortar = rave.slice(0, 10);
                if (cortar == "FVCOrigen=" || cortar == "FVCArchivo") {
                    var corte = rave.split('\\').join('&');
                    querySQL += corte;
                }
                else {
                    querySQL += rave;
                }
            }
            if ($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text").length > 0 && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("alt") != undefined && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("alt") != "") {
                var esTxtFecha = $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("id").split("_")[0] == "txtF" ? true : false;
                var valorTxt = $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text")[0]).val();
                querySQL += $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("alt") + "=\"" + (esTxtFecha && valorTxt != "" ? valorTxt.split('/')[2] + "/" + valorTxt.split('/')[1] + "/" + valorTxt.split('/')[0] : valorTxt) + "\"|";

            }
            if ($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker").length > 0 && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != undefined && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != "") {
                var fechanull = $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") + "=\"" + $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).val() + "\"|";
                if (fechanull.length < 21) {
                    var cortarfecha = $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") + "=\"" + "01/01/2020" + "\"|";
                    querySQL += cortarfecha;
                }
                else {
                    querySQL += fechanull;
                }
            }
            if ($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[0].innerHTML == "METODOLOGIA") {
                var descMetodologiasSelect = '';
                for (var ii = 0; ii < $("#divLstMet").find("input:checkbox").length; ii++) {
                    if ($($("#divLstMet").find("input:checkbox")[ii]).attr("id").indexOf('Todos') == -1) {
                        if ($($("#divLstMet").find("input:checkbox")[ii]).is(":checked")) {
                            descMetodologiasSelect += $($("#divLstMet").find("input:checkbox")[ii]).attr("id").split('_')[1] + "$" + $($("#divLstMet").find("input:checkbox")[ii]).val() + '°';
                        }
                    }
                }
                if (descMetodologiasSelect == '')
                { descMetodologiasSelect = 'COMERCIAL - ANT MET CNBV$0°'; }
                querySQL += $("#divLstMet").attr("lang") + "=\"" + descMetodologiasSelect + "\"|";
            }
        }
    }

    WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, true, "Cargando Información...");
    peticionAjax('Validaciones.aspx/updateInsertValidacion', "POST", { query: querySQL, esNewValidacion: esAgregarReg },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    $(".divNoEdit").show();
                    $(".divEdit").hide();
                    $("#payments2_msdd").hide();
                    $("#divLstMet").find(":checkbox").attr("disabled", true);
                    $(".divEditFecha").hide();
                    $("#tblContenidoValidacionesCedula").find("input:button").hide();
                    $(".ui-datepicker-trigger").hide();
                    $("#btnEditar").attr("value", "Editar");
                    $("#divVtnVerCedulaValidacioneMet").dialog("close");

                    var UsuariosResp = $("#txt_FVCResponsable").val().indexOf(':') != -1 ? $("#txt_FVCResponsable").val() : "";
                    UsuariosResp += $("#txt_FVCCorresponsables").val().indexOf(':') != -1 ? $("#txt_FVCCorresponsables").val() : "";
                    UsuariosResp += $("#txt_FVCEnvioD").val().indexOf(':') != -1 ? $("#txt_FVCEnvioD").val() : "";
                    UsuariosResp += $("#txt_FVCEnvioS").val().indexOf(':') != -1 ? $("#txt_FVCEnvioS").val() : "";
                    UsuariosResp += $("#txt_FVCEnvioQ").val().indexOf(':') != -1 ? $("#txt_FVCEnvioQ").val() : "";
                    UsuariosResp += $("#txt_FVCEnvioM").val().indexOf(':') != -1 ? $("#txt_FVCEnvioM").val() : "";
                    UsuariosResp += $("#txt_FVCEnterado").val().indexOf(':') != -1 ? $("#txt_FVCEnterado").val() : "";
                    ActualizarCorreoResponsables(UsuariosResp);

                }
                else {
                    WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, false, "Cargando Información...");
                    MostrarMsj(data.d.split("%&")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
                    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                        WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "Cargando Información...");
                    });
                }
            }, null);
}

function ActualizarCorreoResponsables(UsuariosResp) {
    var parametros = { Opcion: 1, UsuariosResp: UsuariosResp };
    peticionAjax("Validaciones.aspx/NoRegistrados", "POST", parametros,
    function (data) {
        var ParamActCorreo = { Opcion: 2, Empleados: data.d.toString() };
        peticionAjax("Validaciones.aspx/ActualizaCorreo", "POST", ParamActCorreo,
            function (dataC) {
                if (dataC.d.toString() != 'true')
                    MostrarMsj("No se pudo relizar la opcion solicitada.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 200, 135, null, null, null);
                // GetValidacionesTablero(); // Descomentar cuando se agregue la opcion de agregar nuevo validación
            }, null);
    }, null);
}

function validarCamposGuardarCalidadValidaciones() {
    $('#tblContenidoValidacionesCedula >tbody').find("select").css("border", "thin solid gray");
    $('#tblContenidoValidacionesCedula >tbody').find("textarea").css("border", "thin solid gray");
    $('#tblContenidoValidacionesCedula >tbody').find("input:text").css("border", "thin solid gray");
    $('#tblContenidoValidacionesCedula >tbody').find("input.divEditFecha.hasDatepicker").css("border", "thin solid gray");

    for (var i = 0; i < $('#tblContenidoValidacionesCedula >tbody >tr').length; i++) {
        if ($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[0]).html() == 'NOMBRE' ||
            $($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[0]).html() == 'DESCRIPCION'
            ) {
            var campoEnBlanco = false;
            if ($($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).attr("alt") != undefined && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).val() == null) {
                campoEnBlanco = true;
                $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).css("border", "thin solid red");
            }
            var rave = $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("select")[0]).val();
            if ($($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("textarea")[0]).val() == "") {
                campoEnBlanco = true;
                $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("textarea")[0]).css("border", "thin solid red");
            }

            if ($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text").length > 0 && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("alt") != undefined && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text")[0]).attr("alt") != ""
            && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text")[0]).val() == "" && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text")[0]).css("display") != "none") {
                campoEnBlanco = true;
                $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input:text")[0]).css("border", "thin solid red");
            }

            if ($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker").length > 0 && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != undefined && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).attr("alt") != ""
            && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).val() == "" && $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).css("display") != "none") {
                campoEnBlanco = true;
                $($($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[1]).find("input.divEditFecha.hasDatepicker")[0]).css("border", "thin solid red");
            }

            if (campoEnBlanco) {
                WaitingVtn("divBloqVtnVerCedulaValidacionesMet", true, false, "Cargando Información...");
                MostrarMsj("El Campo <span style='font-weight:bold;'>" + $($('#tblContenidoValidacionesCedula >tbody >tr')[i].cells[0]).html() + "</span> es obligatorio", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnVerCedulaValidacionesMet", false, false, "Cargando Información...");
                });
                return campoEnBlanco;
            }
        }

    }
}


