
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
    loadPageTableroReg();
   
});

var FechaActual = ""; var fechaTempConsultInventario = "";
function loadPageTableroReg() {
    $(".periodo").datepicker();

    var parametrosGetFechasDatePickerXPeriodo = { PeriocidadSet: 1, fechaCalMenos: '', fechaCalMas: '', aplicarMenos: false, aplicarMas: false, index: 0, fechaAnteriorMenos: '', arregloFechas: '', fechaswitch: '' };
    peticionAjax("../../SicreNet/PanelDeControl/PanelDeControl.aspx/GetFechasDatePickerXPeriodo", "POST", parametrosGetFechasDatePickerXPeriodo,
              function GetFechasDatePickerXPeriodo_finish(data) {
                  peticionAjax("../../SicreNet/PanelDeControl/PanelDeControl.aspx/GetFechasNoSelect", "POST", null,
                  function GetFechasNoSelect_finish(data) {
                      $("#txtFechaCorte").attr("accesskey", data.d.split(":")[2]);
                      GetFechaSistemaParaPeriocidad();
                  });
              }, null);
}

function GetFechaSistemaParaPeriocidad() {
    var fechaCorteAnterior = "";
    var parametrosGFS = { PeriocidadSet: 1 };
    peticionAjax("../../SicreNet/PanelDeControl/PanelDeControl.aspx/GetFechaCorteYAnteriorXPeriocidad", "POST", parametrosGFS,
    function GetFechaSistemaParaPeriocidad_finish(data) {
        fechaP = data.d.split("%%&&")[0].split(",")[2] + "," + data.d.split("%%&&")[0].split(",")[1] + "," + data.d.split("%%&&")[0].split(",")[0];
        $("#txtFechaCorte").attr("value", fechaP.split(',')[2] + "/" + fechaP.split(',')[1] + "/" + fechaP.split(',')[0]);
    }, null);
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


$(document).ready(function () {
    $('#open').click(function () {
        $('#popup').fadeIn('slow');
        $('body').css('opacity', '0.5');
        $('.content-popup').css('height', parseInt($(window).height()) - 100 + 'px');
        $('.content-popup').css('width', '100%');
        return false;
    });

    $('#Cerrar').click(function () {
        $('#popup').fadeOut('slow');
        $('body').css('opacity', '1');
        return false;
    });
});

//function espera() {
//        var cad = ' <div id="divBloqueador2" lang="aa" class="divBloqueadorLoading" style="text-align: center; background: Gray; display: none;">';
//        cad += '        <img alt="a" src="../../Images/PanelDeControl/loading2.gif" style="height: 30px; display: block; width: 30px; margin-top: 20%; margin-left: 45%;" />';
//        cad += '        <div id="msjLoading2" style="text-align: center; color: rgb(219, 219, 219)"> </div>';
//        cad += '   </div>';
//        var styleLoading = $(".ui-widget-overlay").attr("style") + "background: #000;";
//        $(".ui-widget-overlay").attr("style", styleLoading);
//        $("#divBloqueador2").attr("lang", "ab");
//        $("#msjLoading2").html('Espere por favor. Cargando Información...!');
//        $("#divBloqueador2").show();
//    }


function agregarInfoCliente() {

        Waiting(true, "Cargando Información...");

        //if ($('#idSpanFecha').html() == '' || $('#FiltroBuscarCliente').val() == '') {
        if ($("#txtFechaCorte").val() == '' || $('#FiltroBuscarCliente').val() == '') {
            $('#FiltroBuscarCliente').css('border', '1px solid red');
             alertify.Comentario('Faltan datos para hacer la consulta', function (e) { });

            Waiting(false, "Cargando Información...");
            return;
        }


        $('#idTRTituloDisposicion').html('');               // ************** Genera los titulos de Disposición **************
        $('#idTRContenidoDisposicion').html('');            // ************** Genera las filas de Disposicion   **************
        $('#idTRContenidoInversion').html('');              // ************** Genera las filas de Inversion   **************
        $('#idTRContenidoCorte1').html('');                 // ************** Genera las filas de Inversion   **************
        $('#idTRContenidoCorte2').html('');                 // ************** Genera las filas de Inversion   **************

        $('#divDisposicion').css('visibility', 'hidden');
        $('#divDisposicion').css('height', '23px');
        $('#divDisposicion2').css('visibility', 'hidden');
        $('#divDisposicion2').css('height', '23px');

        $('#btnCaptacion1').attr('src', '../../Images/PanelDeControl/Captacion/btnSiguiente1.png');
        $('#btnCaptacion1').attr('alt', 'muestra');
        $('#btnCaptacion2').attr('src', '../../Images/PanelDeControl/Captacion/btnSiguiente1.png');
        $('#btnCaptacion2').attr('alt', 'muestra');
        $('#btnCaptacion3').attr('src', '../../Images/PanelDeControl/Captacion/btnSiguiente1.png');
        $('#btnCaptacion3').attr('alt', 'muestra');


        var parametros = {
            fecha: $("#txtFechaCorte").val().split('/')[2] + '-' + $("#txtFechaCorte").val().split('/')[1] + '-' + $("#txtFechaCorte").val().split('/')[0],
            cliente: $('#FiltroBuscarCliente').val()
        };
        peticionAjax('Consolidado.aspx/buscarCliente', "POST", parametros,
            function (data) {
                var JSON = obtenerArregloDeJSONModificado(data.d.split('-->')[0], false);
                var JSON1 = obtenerArregloDeJSONModificado(data.d.split('-->')[1], false);
                var JSON2 = obtenerArregloDeJSONModificado(data.d.split('-->')[2], false);
                var JSON3 = obtenerArregloDeJSONModificado(data.d.split('-->')[3], false);
                var JSON4 = obtenerArregloDeJSONModificado(data.d.split('-->')[4], false);

                if (JSON[0] != null) {
                    if (JSON[0]['FVCPERSONALIDAD'] == '000' && JSON1[0]['FVCPERSONALIDAD'] == '000' && JSON2[0]['FVCPERSONALIDAD'] == '000'
                        && JSON3[0]['FVCPERSONALIDAD'] == '000' && JSON4[0]['FVCPERSONALIDAD'] == '000') {
                        alertify.Comentario('La consulta no devuelve ningún dato', function (e) { });
                        Waiting(false, "Espere por favor. Cargando Información...");
                    }
                    else {

                        total = JSON.length;
                        var cadena = "";

                        /*************************************************************** Inf. General ********************************************************************/
                        /*************************************************************** Inf. General ********************************************************************/
                        /*************************************************************** Inf. General ********************************************************************/

                        $('#divInfoGeneralCliente').html(muestraInfoGeneralCliente(JSON));
                        $('#divInfoDetalleCliente').html(muestraInfoDetalleCliente(JSON));


                        /************************************************************************************************************************************************/


                        /*************************************************************** Linea ********************************************************************/
                        /*************************************************************** Linea ********************************************************************/
                        /*************************************************************** Linea ********************************************************************/

                        $('#divInfoLinea').html(muestraInfoLineas(JSON1, JSON3));

                        /************************************************************************************************************************************************/


                        /*************************************************************** Disposición ********************************************************************/
                        /*************************************************************** Disposición ********************************************************************/
                        /*************************************************************** Disposición ********************************************************************/
                        $('#divInfoDisposicion').html(muestraInfoDisposicion(JSON,JSON1,JSON3));

                        $("#idDivDisposicion3").css("width", (parseInt($(document).width()) / 2) - 30 + "px");
                        $("#idDivDisposicion4").css("width", (parseInt($(document).width()) / 2) - 30 + "px");


                        /************************************************************************************************************************************************/

                        /****************************************************************** Corte ***********************************************************************/
                        /****************************************************************** Corte ***********************************************************************/
                        /****************************************************************** Corte ***********************************************************************/

                        $('#divInfoCorte').html(muestraInfoCorte(JSON2, JSON4));

                        /************************************************************************************************************************************************/

                        $('#idDivCorte1').css('width', (parseInt($(document).width()) / 2) - 30 + 'px')
                        $('#idDivCorte2').css('width', (parseInt($(document).width()) / 2) - 30 + 'px')
                        $('#idDivCorte3').css('width', (parseInt($(document).width()) / 2) - 30 + 'px')
                        $('#idDivCorte4').css('width', (parseInt($(document).width()) / 2) - 30 + 'px')
                        
                        $("#divInfoDetalleCliente").hide();
                        $("#divMuestraLinea").hide();

                        $("#divCorteGeneral").show();
                        $("#divCorteDetalle").hide();
                        $("#divDisposicionGeneral").show();
                        $("#divDisposicionDetalle").hide();

                        $("#divMuestraDisposicion").hide();
                        
                        $("#divMuestraCorte").hide();

                        Waiting(false, "Espere por favor. Cargando Información...");
                    }
                }
                else {
                    MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    Waiting(false, "Espere por favor. Cargando Información...");
                }

            }, null);
    }

    $(window).resize(function()
    {
        $("#idDivDisposicion3").css("width", (parseInt($(document).width()) / 2) - 30  + "px");
        $("#idDivDisposicion4").css("width", (parseInt($(document).width()) / 2) - 30 + "px");

        $("#idDivCorte1").css("width", (parseInt($(document).width()) / 2) - 30 + "px");
        $("#idDivCorte2").css("width", (parseInt($(document).width()) / 2) - 30 + "px");
        $("#idDivCorte3").css("width", (parseInt($(document).width()) / 2) - 30 + "px");
        $("#idDivCorte4").css("width", (parseInt($(document).width()) / 2) - 30 + "px");
        
    });

/************************************************************ Información General ***************************************************************/

    function muestraInfoDetalle(obj)
    {
        if ($(obj).attr("id") == "idSPANInfoGeneral") {
            $("#divInfoGeneralCliente").hide();
            $("#divInfoDetalleCliente").show();
        }
        else {
            $("#divInfoGeneralCliente").show();
            $("#divInfoDetalleCliente").hide();
        }
    }

    function muestraInfoGeneralCliente(JSON) {
        var cad = '';
        cad += ' <div id="divInfoGeneralCliente" class="stlBuscarCaptacion" style=" width: 99%; border: 1px solid #d0e6e6; background-color: white; margin:5px;">';
        cad += '     <div class="stlTitulo" style=" width: 100%;">';
        cad += '         <div style=" width: 80%; vertical-align:middle; margin-top:5px; float:left; ">';
        cad += '            <span style="margin-left:25%;">  Información general del cliente  <span>';
        cad += '         </div>';
        cad += '         <div class="stlInfCaptacion contentCaptacion" style="width: 20%; text-align: right; float:right; ">';
        cad += '            <span id="idSPANInfoGeneral" onclick="muestraInfoDetalle(this);" style="margin-right:3px;" title="muestra" class="buttonCorte button-pill">Información Detalle </span>';
        cad += '         </div>';
        cad += '     </div>';
        cad += '     <table id="tblGeneralContenido" style="width: 100%; margin-top:10px; " cellpadding="1" cellspacing="1" border="0">';
        cad += '         <thead>';
        cad += '            <tr class="stlTituloGenerales">';
        cad += '                <th style="width: 15%;">';
        cad += '                    <div>Nombre</div>';
        cad += '                </th>';
        cad += '                <th style="width: 15%;">';
        cad += '                    <div>Apellido Paterno</div>';
        cad += '                </th>';
        cad += '                <th style="width: 15%;">';
        cad += '                    <div>Apellido Materno</div>';
        cad += '                </th>';
        cad += '                <th style="width: 15%;">';
        cad += '                    <div>RFC</div>';
        cad += '                </th>';
        cad += '                <th style="width: 15%;">';
        cad += '                    <div>Municipio</div>';
        cad += '                </th>';
        cad += '                <th style="width: 15%;">';
        cad += '                    <div>Estado</div>';
        cad += '                </th>';
        cad += '            </tr>';
        cad += '         </thead>';
        cad += '         <tbody>';
        cad += '            <tr class="stlContenidoGenerales">';
        if (JSON[0]["FVCPERSONALIDAD"] != "000") {
            cad += '            <td> <div>' + JSON[0]["FVCNOMBRE"] + '</div> </td>';
            cad += '            <td> <div>' + JSON[0]["FVCAPPATERNO"] + '</div> </td>';
            cad += '            <td> <div>' + JSON[0]["FVCAPMATERNO"] + '</div> </td>';
            cad += '            <td> <div>' + JSON[0]["FVCRFC"] + '</div> </td>';
            cad += '            <td> <div>' + JSON[0]["FVCDELEGACIONMPIO"] + '</div> </td>';
            cad += '            <td> <div>' + JSON[0]["FVCESTADO"] + '</div> </td>';
        }
        else {
            cad += '            <td colspan="6"/>';
        }
        cad += '            </tr>';
        cad += '         </tbody>';
        cad += '      </table>';
        cad += '  </div>';
        return cad;
    }

    function muestraInfoDetalleCliente(jSon) {
        var cad = '';
        cad += ' <div id="divInfoDetalleCliente" class="stlBuscarCaptacion" style="width: 99%; border: 1px solid #d0e6e6; background-color: white; margin:5px;">';
        cad += '     <div class="stlTitulo" style=" width: 100%;">';
        cad += '         <div style=" width: 80%; vertical-align:middle; margin-top:5px; float:left; ">';
        cad += '             <span style="margin-left:25%;">  Información detallada del cliente  <span>';
        cad += '         </div>';
        cad += '         <div class="stlInfCaptacion contentCaptacion" style="width: 20%; text-align: right; float:right; ">';
        cad += '             <span id="idSPANInfoDetalle" onclick="muestraInfoDetalle(this);" style="margin-right:3px;" title="muestra" class="buttonCorte button-pill">Información General </span>';
        cad += '         </div>';
        cad += '     </div>';

        cad += '     <table style="width: 100%;" cellpadding="1" cellspacing="1" border="0">';
        cad += '         <tr style="height: 2px;"><td colspan="4" style="height: 5px;"></td></tr>';
        cad += '         <tr class="stlTituloGenerales">';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Personalidad</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Nombre</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Apellido Paterno</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Apellido Materno</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Calle</div></td>';
        cad += '         </tr>';
        cad += '         <tr class="stlContenidoGenerales">';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCPERSONALIDAD"]) != "" ? jSon[0]["FVCPERSONALIDAD"] : "---") + '</div> </td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCNOMBRE"]) != "" ? jSon[0]["FVCNOMBRE"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCAPPATERNO"]) != "" ? jSon[0]["FVCAPPATERNO"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCAPMATERNO"]) != "" ? jSon[0]["FVCAPMATERNO"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCCALLE"]) != "" ? jSon[0]["FVCCALLE"] : "---") + '</div></td>';
        cad += '         </tr><tr style="height: 2px;"><td colspan="4" style="height: 5px;"></td></tr>';
        cad += '         <tr  class="stlTituloGenerales">';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Delegación/Municipio</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Ciudad/Población</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Número Externo</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Número Interno</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Colonia</div></td>';
        cad += '         </tr>';
        cad += '         <tr class="stlContenidoGenerales">';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCDELEGACIONMPIO"]) != "" ? jSon[0]["FVCDELEGACIONMPIO"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCCIUDADPOBLACION"]) != "" ? jSon[0]["FVCCIUDADPOBLACION"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCNUMEROEXTERIOR"]) != "" ? jSon[0]["FVCNUMEROEXTERIOR"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCNUMEROINTERIOR"]) != "" ? jSon[0]["FVCNUMEROINTERIOR"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCCOLONIA"]) != "" ? jSon[0]["FVCCOLONIA"] : "---") + '</div></td>';
        cad += '         </tr><tr style="height: 2px;"><td colspan="4" style="height: 5px;"></td></tr>';
        cad += '         <tr  class="stlTituloGenerales">';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Estado</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">RFC</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">CURP</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Código Postal</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlSpanCaptacion">Pais</div></td>';
        cad += '         </tr>';
        cad += '         <tr class="stlContenidoGenerales">';
        cad += '             <td style="width: 20%;"> <div class="stlDivCliente">' + ($.trim(jSon[0]["FVCESTADO"]) != "" ? jSon[0]["FVCESTADO"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCRFC"]) != "" ? jSon[0]["FVCRFC"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCCURP"]) != "" ? jSon[0]["FVCCURP"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCCP"]) != "" ? jSon[0]["FVCCP"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FIPAISCLIENTE"]) != "" ? jSon[0]["FIPAISCLIENTE"] : "---") + '</div></td>';
        cad += '         </tr> <tr style="height: 2px;"><td colspan="4" style="height: 5px;"></td></tr>';
        cad += '         <tr  class="stlTituloGenerales">';
        cad += '              <td style="width: 20%;"><div class="stlSpanCaptacion">Correo Electrónico</div></td>';
        cad += '              <td style="width: 20%;"><div class="stlSpanCaptacion">Fecha de Nacimiento</div></td>';
        cad += '              <td style="width: 20%;"><div class="stlSpanCaptacion">Telefono</div></td>';
        cad += '              <td style="width: 20%;"><div class="stlSpanCaptacion">Celular</div></td>';
        cad += '              <td style="width: 20%;"></td>';
        cad += '         </tr>';
        cad += '         <tr class="stlContenidoGenerales">';
        cad += '             <td style="width: 20%;"> <div class="stlDivCliente">' + ($.trim(jSon[0]["FVCCORREOELECTRONICO"]) != "" ? jSon[0]["FVCCORREOELECTRONICO"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCFECHANACIMIENTO"]) != "" ? jSon[0]["FVCFECHANACIMIENTO"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCTELEFONO"]) != "" ? jSon[0]["FVCTELEFONO"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"><div class="stlDivCliente">' + ($.trim(jSon[0]["FVCCELULAR"]) != "" ? jSon[0]["FVCCELULAR"] : "---") + '</div></td>';
        cad += '             <td style="width: 20%;"></td>';
        cad += '         </tr>';
        cad += '     </table>';
        cad += ' </div>';
        return cad;
    }

/************************************************************************************************************************************************/



/****************************************************************** Linea ***********************************************************************/

    function mostrarInfoLinea(obj) {
        if ($('#divMuestraLinea').attr('lang') == 'ocultar') {
            $('#divMuestraLinea').attr('lang', 'mostrar');
            $('#btnCaptacion1').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_2.png');
            $('#divMuestraLinea').show();
        }
        else {
            $('#divMuestraLinea').hide();
            $('#btnCaptacion1').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_1.png');
            $('#divMuestraLinea').attr('lang', 'ocultar');
        }
    }

    function muestraInfoLineas(JSON1, JSON3) {
        var cad = '';
        cad += '  <div id="divCaptacion" style=" width: 99%; border: 1px solid #d0e6e6; background-color: white; margin:5px;">';
        cad += '   <table id="tblInformacionCaptacion0" style="width: 100%;" cellpadding="0" cellspacing="0" border="0">';
        cad += '       <tr class="clsSobre" style="">';
        cad += '           <td style="width: 50%; height:28px;">';
        cad += '               <div class="stlInfCaptacion contentCaptacion" style="color: white;">Lineas</div>';
        cad += '           </td>';
        cad += '          <td style="width: 40%; height:28px;">';
        cad += '               <div class="stlInfCaptacion contentCaptacion" style="color: white;">Cuentas</div>';
        cad += '          </td>';
        cad += '          <td style="width: 10%; height:28px;">';
        cad += '              <div class="stlInfCaptacion contentCaptacion" style="text-align: right;">';
        cad += '                   <img id="btnCaptacion1"  onclick="mostrarInfoLinea(this);"  alt="muestra" src="../../Images/PanelDeControl/Captacion/btnMostrar_1.png" style="width: 15px; height: 20px; margin-right: 15px; cursor: pointer;" />';
        cad += '              </div>';
        cad += '           </td>';
        cad += '      </tr>';
        cad += '   </table>';
        cad += '  <div id="divMuestraLinea" lang="ocultar"  style="width: auto;" >';
        cad += '   <table id="tblInformacionCaptacion" style="height: 0px; width: 100%; visibility: visible;">';
        cad += '       <tr>';
        cad += '           <td style="width: 50%; vertical-align: top;">';
        cad += '              <div class="stlBuscarCaptacion" style="width: 98%; height: auto; float: left; background-color: white;">';
        cad += '                  <div class="stlBuscarCaptacion" style="width: 100%; /*overflow-y: scroll; */ height: 50px; border: 1px solid #d0e6e6; background-color: white; margin-left: 10px; margin-top: 5px;">';
        cad += '                      <table style="width: 100%;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                          <thead>';
        cad += '                               <tr class="stlTituloInfoCredito">';
        cad += '                                   <th style="width: 33%;">Canal</th>';
        cad += '                                   <th style="width: 33%;">Sucursal</th>';
        cad += '                                   <th style="width: 34%;">Pedido</th>';
        cad += '                               </tr>';
        cad += '                           </thead>';
        cad += '                           <tbody class="stlContenidoInfoCaptacion">';
        cad += '                               <tr id="idTRLineas">';
        cad += '                                     <td style="width: 33%;">' + ($.trim(JSON1[0]["FICANAL"]) != "" ? JSON1[0]["FICANAL"] : "") + '</td>';
        cad += '                                     <td style="width: 33%;">' + ($.trim(JSON1[0]["FNSUCURSAL"]) != "" ? JSON1[0]["FNSUCURSAL"] : "") + '</td>';
        cad += '                                     <td style="width: 34%;">' + ($.trim(JSON1[0]["FNPEDIDO"]) != "" ? JSON1[0]["FNPEDIDO"] : "") + '</td>';
        cad += '                               </tr>';
        cad += '                           </tbody>';
        cad += '                       </table>';
        cad += '                   </div>';
        cad += '               </div>';
        cad += '           </td>';
        cad += '           <td style="width: 50%; vertical-align: top;">';
        cad += '               <div class="stlBuscarCaptacion" style="width: 98%; float: left; background-color: white;">';
        cad += '                   <div class="stlBuscarCaptacion" style="/*overflow-y: scroll; */ height: 50px; width: 100%; border: 1px solid #d0e6e6; background-color: white; margin-left: 5px; margin-top: 5px;">';
        cad += '                       <table style="width: 100%;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                           <thead>';
        cad += '                               <tr class="stlTituloInfoCaptacion">';
        cad += '                                   <th style="width: 100%;">Número de Cuenta</th>';
        cad += '                              </tr>';
        cad += '                           </thead>';
        cad += '                           <tbody class="stlContenidoInfoCuenta">';
        cad += '                               <tr id="idTRCuentas">';
        cad += '                                   <td style="width: 100%;">' + ($.trim(JSON3[0]["NUMERO DE CUENTA"]) != "" ? JSON3[0]["NUMERO DE CUENTA"] : "---") + '</td>';
        cad += '                               </tr>';
        cad += '                           </tbody>';
        cad += '                       </table>';
        cad += '                   </div>';
        cad += '               </div>';
        cad += '           </td>';
        cad += '       </tr>';
        cad += '   </table>';
        cad += ' </div>';
        cad += ' </div>';
        return cad;

    }

/************************************************************************************************************************************************/


 
/*************************************************************** Disposición ********************************************************************/

    function mostrarDisposicion(obj) {
        if ($(obj).attr("id") == "idSpanDisposicionGeneral") {
            $("#divDisposicionGeneral").hide();
            $("#divDisposicionDetalle").show();
            $('#divMuestraDisposicionDetalle').show();
            $('#divMuestraDisposicionDetalle').attr('lang', 'mostrar');
            $('#btnMuestraDisposicionDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_2.png');
        }
        else {
            $("#divDisposicionGeneral").show();
            $("#divDisposicionDetalle").hide();
            $('#divMuestraDisposicion').show();
            $('#divMuestraDisposicion').attr('lang', 'mostrar');
            $('#btnMuestraDisposicion').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_2.png');
            $('#btnMuestraDisposicionDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_1.png');
        }
    }

    function mostrarInfoDisposicion(obj) {
        if ($(obj).attr("id") == "btnMuestraDisposicion") {
            if ($('#divMuestraDisposicion').attr('lang') == 'ocultar') {
                $('#divMuestraDisposicion').attr('lang', 'mostrar');
                $('#btnMuestraDisposicion').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_2.png');
                $('#divMuestraDisposicion').show();

                $('#divMuestraDisposicionDetalle').hide();
                $('#btnMuestraDisposicionDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_1.png');
                $('#divMuestraDisposicionDetalle').attr('lang', 'ocultar');
            }
            else {
                $('#divMuestraDisposicion').hide();
                $('#btnMuestraDisposicion').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_1.png');
                $('#divMuestraDisposicion').attr('lang', 'ocultar');

                $('#divMuestraDisposicionDetalle').hide();
                $('#btnMuestraDisposicionDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_1.png');
                $('#divMuestraDisposicionDetalle').attr('lang', 'ocultar');
            }
        }
        else if ($(obj).attr("id") == "btnMuestraDisposicionDetalle") {
            if ($('#divMuestraDisposicionDetalle').attr('lang') == 'ocultar') {
                $('#divMuestraDisposicionDetalle').attr('lang', 'mostrar');
                $('#btnMuestraDisposicionDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_2.png');
                $('#divMuestraDisposicionDetalle').show();
            }
            else {
                $('#divMuestraDisposicionDetalle').hide();
                $('#btnMuestraDisposicionDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_1.png');
                $('#divMuestraDisposicionDetalle').attr('lang', 'ocultar');
            }
        }
    }

    function muestraInfoDisposicion(JSON, JSON1, JSON3) {
        var cad = '';
        cad += '    <div id="divDisposicionGeneral" style="width: 99%; border: 1px solid #d0e6e6; background-color: white; margin:5px;">';
        cad += '         <table style="width: 100%;" cellpadding="0" cellspacing="0" border="0">';
        cad += '             <tr style="background-color: rgba(5, 127, 113, 1);">';
        cad += '                  <td style="width: 50%;  height:28px;">';
        cad += '                     <div class="stlInfCaptacion contentCaptacion" style="color: white;">Disposición</div>';
        cad += '                  </td>';
        cad += '                  <td style="width: 35%; height:28px;">';
        cad += '                     <div class="stlInfCaptacion contentCaptacion" style="color: white; margin-left:15%; ">Inversión</div>';
        cad += '                  </td>';
        cad += '                  <td style="width: 15%;  height:28px;">';
        cad += '                     <div class="stlInfCaptacion contentCaptacion" style="width:30px; text-align: center; float: right;">';
        cad += '                         <img id="btnMuestraDisposicion"  onclick="mostrarInfoDisposicion(this);"  alt="muestra" src="../../Images/PanelDeControl/Captacion/btnMostrar_1.png" style="width: 15px; height: 20px; margin-right: 15px; cursor: pointer;" />';
        cad += '                     </div>';
        cad += '                     <div class="stlInfCaptacion contentCaptacion" style="width:150px; text-align: right; float: right;">';
        cad += '                         <span id="idSpanDisposicionGeneral" onclick="mostrarDisposicion(this);" style="margin-right:3px;" title="muestra" class="buttonCorte button-pill">Información Detalle </span>';
        cad += '                     </div>';
        cad += '                  </td>';
        cad += '             </tr>';
        cad += '         </table>';
        cad += '         <div id="divMuestraDisposicion" lang="ocultar"  style="width: auto;" >';
        cad += '             <table id="tblInformacionCaptacion2" style="width: 100%; ">';
        cad += '                 <tr>';
        cad += '                     <td style="width: 48%; vertical-align: top;">';
        cad += '                         <div id="idDivDisposicion1" class="stlBuscarCaptacion" style="width: 99%; height: auto; float: left; background-color: white;">';
        cad += '                             <div class="stlBuscarCaptacion" style="width: auto; overflow-y: scroll; height: 80px; border: 1px solid #d0e6e6; background-color: white; margin-left: 10px; margin-top: 5px;">';
        cad += '                                 <table style="width: 100%;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                                     <thead>';
        cad += '                                         <tr class="stlTituloInfoCredito">';
        cad += '                                                <th style="width: 100px;">No. de Crédito</th>';
        cad += '                                                <th style="width: 130px;">Nombre del Acreditado</th>';
        cad += '                                                <th style="width: 100px;">Ent. Federativa</th>';
        cad += '                                                <th style="width: 100px;">Sector Económico</th>';
        cad += '                                                <th style="width: 90px;">Fecha Inicio</th>';
        cad += '                                                <th style="width: 100px;">Fecha Último Pago</th>';
        cad += '                                                <th style="width: 110px;">Fecha Vencimiento</th>';
        cad += '                                         </tr>';
        cad += '                                     </thead>';
        cad += '                                     <tbody id="idTRContenidoDisposicion11" class="stlContenidoInfoCaptacion">';
        for (var i = 0; i < JSON1.length - 1; i++) { cad += '<tr>';
            cad += '                                        <td>' + ($.trim(JSON1[i]["FVCNUMERODECREDITO"]) != "" ? JSON1[i]["FVCNUMERODECREDITO"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON1[i]["FVCNOMBREDELACREDITADO"]) != "" ? JSON1[i]["FVCNOMBREDELACREDITADO"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON1[i]["FIENTIDADFEDERATIVA"]) != "" ? JSON1[i]["FIENTIDADFEDERATIVA"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON1[i]["FISECTORECONOMICO"]) != "" ? JSON1[i]["FISECTORECONOMICO"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON1[i]["FNFECHADEINICIO"]) != "" ? JSON1[i]["FNFECHADEINICIO"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON1[i]["FNFECHADEULTIMOPAGO"]) != "" ? JSON1[i]["FNFECHADEULTIMOPAGO"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON1[i]["FNFECHAVENCIMIENTO"]) != "" ? JSON1[i]["FNFECHAVENCIMIENTO"] : "---") + '</td>';
            cad += '                                    </tr>';}
        cad += '                                     </tbody>';
        cad += '                                 </table>';
        cad += '                             </div>';
        cad += '                         </div>';
        cad += '                     </td>';
        cad += '                     <td style="width: 48%; vertical-align: top;">';
        cad += '                         <div id="idDivDisposicion2" class="stlBuscarCaptacion" style="width: 99%; float: left; background-color: white;">';
        cad += '                             <div class="stlBuscarCaptacion" style="overflow-y: scroll; height: 80px; width: 100%; border: 1px solid #d0e6e6; background-color: white; margin-left: 5px; margin-top: 5px;">';
        cad += '                                 <table style="width: 100%;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                                     <thead>';
        cad += '                                         <tr class="stlTituloInfoCaptacion">';
        cad += '                                             <th style="width: 80px;">Número Cuenta</th>';
        cad += '                                             <th style="width: 80px;">Clave Producto</th>';
        cad += '                                             <th style="width: 80px;">Cuenta Contable</th>';
        cad += '                                             <th style="width: 110px;">Saldo Neto de Cuenta</th>';
        cad += '                                             <th style="width: 60px;">Fecha Corte</th>';
        cad += '                                             <th style="width: 110px;">Fecha Contratación</th>';
        cad += '                                             <th style="width: 110px;">Saldo Prom. Diario</th>';
        cad += '                                         </tr>';
        cad += '                                     </thead>';
        cad += '                                     <tbody id="idTRContenidoInversion11" class="stlContenidoInfoCuenta">';
        for (var i = 0; i < JSON.length - 1; i++) {
            cad += '                                    <tr>';
            cad += '                                        <td>' + ($.trim(JSON[i]["NUMERO DE CUENTA"]) != "" ? JSON[i]["NUMERO DE CUENTA"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON[i]["CLAVE DEL PRODUCTO"]) != "" ? JSON[i]["CLAVE DEL PRODUCTO"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON[i]["CUENTA CONTABLE"]) != "" ? JSON[i]["CUENTA CONTABLE"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON[i]["SALDO NETO DE LA CUENTA"]) != "" ? JSON[i]["SALDO NETO DE LA CUENTA"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON[i]["FECHA DE CORTE"]) != "" ? JSON[i]["FECHA DE CORTE"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON[i]["FECHA CONTRATACION"]) != "" ? JSON[i]["FECHA CONTRATACION"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON[i]["SALDO PROM DIARIO"]) != "" ? JSON[i]["SALDO PROM DIARIO"] : "---") + '</td>';
            cad += '                                    </tr>';}
        cad += '                                     </tbody>';
        cad += '                                 </table>';
        cad += '                             </div>';
        cad += '                         </div>';
        cad += '                     </td>';
        cad += '                 </tr>';
        cad += '             </table>';
        cad += '         </div>';
        cad += '    </div>';

        cad += '    <div id="divDisposicionDetalle" style="width: auto; border: 1px solid #d0e6e6; background-color: white; margin:5px;">';
        cad += '        <table style="width: 100%;" cellpadding="0" cellspacing="0" border="0">';
        cad += '            <tr style="background-color: rgba(5, 127, 113, 1);">';
        cad += '                <td style="width: 50%;  height:28px;">';
        cad += '                    <div class="stlInfCaptacion contentCaptacion" style="color: white;">Disposición</div>';
        cad += '                </td>';
        cad += '                <td style="width: 35%;  height:28px;">';
        cad += '                    <div class="stlInfCaptacion contentCaptacion" style="color: white; margin-left:15%; ">Inversión</div>';
        cad += '                </td>';
        cad += '                <td style="width: 15%;  height:28px;">';
        cad += '                    <div class="stlInfCaptacion contentCaptacion" style="width:30px; text-align: center; float: right;">';
        cad += '                        <img id="btnMuestraDisposicionDetalle" onclick="mostrarInfoDisposicion(this);"  alt="muestra" src="../../Images/PanelDeControl/Captacion/btnMostrar_1.png" style="width: 15px; height: 20px; margin-right: 15px; cursor: pointer;" />';
        cad += '                    </div>';
        cad += '                    <div class="stlInfCaptacion contentCaptacion" style="width:150px; text-align: right; float: right;">';
        cad += '                        <span id="idSpanDisposicionDetalle" onclick="mostrarDisposicion(this);" style="margin-right:3px;" title="muestra" class="buttonCorte button-pill">Información General </span>';
        cad += '                    </div>';
        cad += '                </td>';
        cad += '            </tr>';
        cad += '        </table>';
        cad += '        <div id="divMuestraDisposicionDetalle" lang="ocultar"  style="width: auto;" >';
        cad += '             <table id="tblInformacionCaptacion3" style="height: 0px; width:100%; ">';
        cad += '                 <tr>';
        cad += '                     <td style="vertical-align: top;">';
        cad += '                         <div id="idDivDisposicion3" class="stlBuscarCaptacion" style="width:500px; height:auto; background-color:white; float:left;">';
        cad += '                             <div class="stlBuscarCaptacion" style="overflow-y:scroll; overflow-x:scroll; height:130px; width:auto; border:1px solid #d0e6e6; background-color:white; margin-left: 0px; margin-top: 5px;">';
        cad += '                                 <table style="width:auto;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                                     <thead>';
        cad += '                                         <tr id="idTRTituloDisposicion" class="stlTituloInfoCredito">';
        cad += '                                             <th style="min-width: 100px;">No. de Crédito</th>';
        cad += '                                             <th style="min-width: 100px;">Id. Cliente</th>';
        cad += '                                             <th style="min-width: 130px;">Nombre del Acreditado</th>';
        cad += '                                             <th style="min-width: 100px;">Ent. Federativa</th>';
        cad += '                                             <th style="min-width: 100px;">Sector Económico</th>';
        cad += '                                             <th style="min-width: 110px;">Tamaño Empresa</th>';
        cad += '                                             <th style="min-width: 30px;">Segmento</th>';
        cad += '                                             <th style="min-width: 90px;">Fecha Inicio</th>';
        cad += '                                             <th style="min-width: 100px;">Fecha Último Pago</th>';
        cad += '                                             <th style="min-width: 50px;">Moneda</th>';
        cad += '                                             <th style="min-width: 120px;">Saldo Resp. Total</th>';
        cad += '                                             <th style="min-width: 100px;">Capital Vigente</th>';
        cad += '                                             <th style="min-width: 100px;">Capital Vencido</th>';
        cad += '                                             <th style="min-width: 100px;">Interes Ordinario</th>';
        cad += '                                             <th style="min-width: 100px;">Interes Moratorio</th>';
        cad += '                                             <th style="min-width: 100px;">Disposición Crédito</th>';
        cad += '                                             <th style="min-width: 100px;">Plazo Total Crédito</th>';
        cad += '                                             <th style="min-width: 110px;">Fecha Vencimiento</th>';
        cad += '                                             <th style="min-width: 90px;">Linea Crédito</th>';
        cad += '                                             <th style="min-width: 150px;">Importe Origen del Crédito</th>';
        cad += '                                             <th style="min-width: 80px;">Meses Apertura</th>';
        cad += '                                             <th style="min-width: 80px;">Meses Atraso</th>';
        cad += '                                             <th style="min-width: 100px;">Severidad Perdida</th>';
        cad += '                                             <th style="min-width: 60px;">Tipo Tasa</th>';
        cad += '                                             <th style="min-width: 80px;">Tasa Referencia</th>';
        cad += '                                             <th style="min-width: 60px;">Tipo Alta</th>';
        cad += '                                             <th style="min-width: 60px;">Reservas</th>';
        cad += '                                         </tr>';
        cad += '                                     </thead>';
        cad += '                                     <tbody id="idTRContenidoDisposicion" class="stlContenidoInfoCaptacion">';
        for (var i = 0; i < JSON.length - 1; i++) {
            cad += '                                     <tr>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FVCNUMERODECREDITO"]) != "" ? JSON1[i]["FVCNUMERODECREDITO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FVCIDENTIFICADORDELCLIENTE"]) != "" ? JSON1[i]["FVCIDENTIFICADORDELCLIENTE"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FVCNOMBREDELACREDITADO"]) != "" ? JSON1[i]["FVCNOMBREDELACREDITADO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FIENTIDADFEDERATIVA"]) != "" ? JSON1[i]["FIENTIDADFEDERATIVA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FISECTORECONOMICO"]) != "" ? JSON1[i]["FISECTORECONOMICO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FITAMANIODELAEMPRESA"]) != "" ? JSON1[i]["FITAMANIODELAEMPRESA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FISEGMENTO"]) != "" ? JSON1[i]["FISEGMENTO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNFECHADEINICIO"]) != "" ? JSON1[i]["FNFECHADEINICIO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNFECHADEULTIMOPAGO"]) != "" ? JSON1[i]["FNFECHADEULTIMOPAGO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FIMONEDA"]) != "" ? JSON1[i]["FIMONEDA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNSALDOORESPTOTAL"]) != "" ? JSON1[i]["FNSALDOORESPTOTAL"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNCAPITALVIGENTE"]) != "" ? JSON1[i]["FNCAPITALVIGENTE"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNCAPITALVENCIDO"]) != "" ? JSON1[i]["FNCAPITALVENCIDO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNINTERESORDINARIO"]) != "" ? JSON1[i]["FNINTERESORDINARIO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNINTERESMORATORIO"]) != "" ? JSON1[i]["FNINTERESMORATORIO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FIDISPOSICIONCREDITO"]) != "" ? JSON1[i]["FIDISPOSICIONCREDITO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FIPLAZOTOTCREDITO"]) != "" ? JSON1[i]["FIPLAZOTOTCREDITO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNFECHAVENCIMIENTO"]) != "" ? JSON1[i]["FNFECHAVENCIMIENTO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNLINEACREDITAUTO"]) != "" ? JSON1[i]["FNLINEACREDITAUTO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNIMPORTEORIGDELCREDITO"]) != "" ? JSON1[i]["FNIMPORTEORIGDELCREDITO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FIMESESAPERTURA"]) != "" ? JSON1[i]["FIMESESAPERTURA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FIMESESATRASO"]) != "" ? JSON1[i]["FIMESESATRASO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNSEVERIDADPERDIDA"]) != "" ? JSON1[i]["FNSEVERIDADPERDIDA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FITIPOTASA"]) != "" ? JSON1[i]["FITIPOTASA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FITASAREFERENCIA"]) != "" ? JSON1[i]["FITASAREFERENCIA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FITIPOALTACRED"]) != "" ? JSON1[i]["FITIPOALTACRED"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON1[i]["FNRESERVAS"]) != "" ? JSON1[i]["FNRESERVAS"] : "---") + '</td>';
            cad += '                                     </tr>';
        }
        cad += '                                     </tbody>';
        cad += '                                 </table>';
        cad += '                             </div>';
        cad += '                         </div>';
        cad += '                         <div id="idDivDisposicion4" class="stlBuscarCaptacion" style="width:500px; background-color:white; float:right;">';
        cad += '                             <div class="stlBuscarCaptacion" style="overflow-y:scroll; overflow-x:scroll; height:130px; width:auto; border:1px solid #d0e6e6; background-color: white; margin-left: 0px; margin-top: 5px;">';
        cad += '                                 <table style="width: 1440px;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                                     <thead>';
        cad += '                                         <tr class="stlTituloInfoCaptacion">';
        cad += '                                             <th style="min-width: 110px;">Clave Cliente Alnova</th>';
        cad += '                                             <th style="min-width: 100px; ">Número Cuenta</th>';
        cad += '                                             <th style="min-width: 80px;  ">Clave Producto</th>';
        cad += '                                             <th style="min-width: 80px;  ">Cuenta Contable</th>';
        cad += '                                             <th style="min-width: 80px;  ">Nombre Producto</th>';
        cad += '                                             <th style="min-width: 80px;  ">Capital Cuenta</th>';
        cad += '                                             <th style="min-width: 60px;  ">Intereses</th>';
        cad += '                                             <th style="min-width: 110px; ">Retención Impuestos</th>';
        cad += '                                             <th style="min-width: 110px; ">Saldo Neto de Cuenta</th>';
        cad += '                                             <th style="min-width: 60px;  ">Fecha Corte</th>';
        cad += '                                             <th style="min-width: 80px;  ">Fecha SIG Corte</th>';
        cad += '                                             <th style="min-width: 110px; ">Fecha Contratación</th>';
        cad += '                                             <th style="min-width: 80px;  ">Plazo Operación</th>';
        cad += '                                             <th style="min-width: 50px;  ">Tasa</th>';
        cad += '                                             <th style="min-width: 110px; ">Saldo Prom. Diario</th>';
        cad += '                                             <th style="min-width: 80px;  ">% Titularidad</th>';
        cad += '                                         </tr>';
        cad += '                                     </thead>';
        cad += '                                     <tbody id="idTRContenidoInversion" class="stlContenidoInfoCuenta">';
       
        for (var i = 0; i < JSON3.length - 1; i++) {
            cad += '                                     <tr>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["CLAVE CLIENTE ALNOVA"]) != "" ? JSON3[i]["CLAVE CLIENTE ALNOVA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["NUMERO DE CUENTA"]) != "" ? JSON3[i]["NUMERO DE CUENTA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["CLAVE DEL PRODUCTO"]) != "" ? JSON3[i]["CLAVE DEL PRODUCTO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["CUENTA CONTABLE"]) != "" ? JSON3[i]["CUENTA CONTABLE"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["NOMBRE PRODUCTO"]) != "" ? JSON3[i]["NOMBRE PRODUCTO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["CAPITAL CUENTA"]) != "" ? JSON3[i]["CAPITAL CUENTA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["INTERESES"]) != "" ? JSON3[i]["INTERESES"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["RETENCION IMPUESTOS"]) != "" ? JSON3[i]["RETENCION IMPUESTOS"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["SALDO NETO DE LA CUENTA"]) != "" ? JSON3[i]["SALDO NETO DE LA CUENTA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["FECHA DE CORTE"]) != "" ? JSON3[i]["FECHA DE CORTE"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["FECHA SIG CORTE"]) != "" ? JSON3[i]["FECHA SIG CORTE"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["FECHA CONTRATACION"]) != "" ? JSON3[i]["FECHA CONTRATACION"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["PLAZO OPERACION"]) != "" ? JSON3[i]["PLAZO OPERACION"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["TASA"]) != "" ? JSON3[i]["TASA"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["SALDO PROM DIARIO"]) != "" ? JSON3[i]["SALDO PROM DIARIO"] : "---") + '</td>';
            cad += '                                         <td>' + ($.trim(JSON3[i]["PORCENTAJE DE TITULARIDAD"]) != "" ? JSON3[i]["PORCENTAJE DE TITULARIDAD"] : "---") + '</td>';
            cad += '                                    </tr>';
        }
        cad += '                                     </tbody>';
        cad += '                                 </table>';
        cad += '                             </div>';
        cad += '                         </div>';
        cad += '                     </td>';
        cad += '                 </tr>';
        cad += '             </table>';
        cad += '         </div>';
        cad += '    </div>';
        return cad;
    }

   
    /************************************************************************************************************************************************/

   
    /****************************************************************** Corte ***********************************************************************/
    function mostrarCortes(obj) {
        if ($(obj).attr("id") == "idSpanCortesGeneral") {
            $("#divCorteGeneral").hide();
            $("#divCorteDetalle").show();

            $('#divMuestraCorteDetalle').show();
            $('#divMuestraCorteDetalle').attr('lang', 'mostrar');
            $('#btnMuestraCorteDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_2.png');
        }
        else {
            $("#divCorteGeneral").show();
            $("#divCorteDetalle").hide();
            $('#divMuestraCorte').show();
            $('#divMuestraCorte').attr('lang', 'mostrar');
            $('#btnMuestraCorte').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_2.png');
            $('#divMuestraCorteDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_1.png');

        }
    }

    function mostrarInfoCorte(obj) {
        if ($(obj).attr("id") == "btnMuestraCorte") {
            if ($('#divMuestraCorte').attr('lang') == 'ocultar') {
                $('#divMuestraCorte').attr('lang', 'mostrar');
                $('#btnMuestraCorte').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_2.png');
                $('#divMuestraCorte').show();

                $('#divMuestraCorteDetalle').hide();
                $('#btnMuestraCorteDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_1.png');
                $('#divMuestraCorteDetalle').attr('lang', 'ocultar');
            }
            else {
                $('#divMuestraCorte').hide();
                $('#btnMuestraCorte').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_1.png');
                $('#divMuestraCorte').attr('lang', 'ocultar');

                $('#divMuestraCorteDetalle').hide();
                $('#btnMuestraCorteDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_2.png');
                $('#divMuestraCorteDetalle').attr('lang', 'ocultar');
            }
        }
        else if ($(obj).attr("id") == "btnMuestraCorteDetalle") {
            if ($('#divMuestraCorteDetalle').attr('lang') == 'ocultar') {
                $('#divMuestraCorteDetalle').attr('lang', 'mostrar');
                $('#btnMuestraCorteDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_2.png');
                $('#divMuestraCorteDetalle').show();
            }
            else {
                $('#divMuestraCorteDetalle').hide();
                $('#btnMuestraCorteDetalle').attr('src', '../../Images/PanelDeControl/Captacion/btnMostrar_1.png');
                $('#divMuestraCorteDetalle').attr('lang', 'ocultar');
            }
        }
    }

    function muestraInfoCorte(JSON2, JSON4) {
        var cad = '';
        /*                                                                       Información General Cortes                                                       */
        cad += '         <div id="divCorteGeneral" style="width: 99%; border: 1px solid #d0e6e6; background-color: white; margin:5px;">';
        cad += '             <table style="width: 100%;" cellpadding="0" cellspacing="0" border="0">';
        cad += '                 <tr style="background-color: rgba(5, 127, 113, 1);">';
        cad += '                     <td style="width: 50%;  height:28px;">';
        cad += '                         <div class="stlInfCaptacion contentCaptacion" style="color: white;">Cortes</div>';
        cad += '                     </td>';
        cad += '                     <td style="width: 35%;  height:28px;">';
        cad += '                         <div class="stlInfCaptacion contentCaptacion" style="color: white; margin-left:15%;">Cortes</div>';
        cad += '                     </td>';
        cad += '                     <td style="width: 15%;  height:28px;">';
        cad += '                        <div class="stlInfCaptacion contentCaptacion" style="width:30px; text-align: center; float: right;">';
        cad += '                            <img id="btnMuestraCorte" onclick="mostrarInfoCorte(this);"  alt="muestra" src="../../Images/PanelDeControl/Captacion/btnMostrar_1.png" style="width: 15px; height: 20px; margin-right: 15px; cursor: pointer;" />';
        cad += '                        </div>';
        cad += '                        <div class="stlInfCaptacion contentCaptacion" style="width:150px; text-align: right; float: right;">';
        cad += '                            <span id="idSpanCortesGeneral" onclick="mostrarCortes(this);" style="margin-right:3px;" title="muestra" class="buttonCorte button-pill">Información Detalle </span>';
        cad += '                        </div>';
        cad += '                     </td>';
        cad += '                 </tr>';
        cad += '             </table>';
        cad += '         <div id="divMuestraCorte" lang="ocultar"  style="width: auto;" >';
        cad += '             <table id="tblInformacionCorte2" style="width: 100%; ">';
        cad += '                 <tr>';
        cad += '                     <td style="width: 48%; vertical-align: top;">';
        cad += '                         <div id="idDivCorte1" class="stlBuscarCaptacion" style="width: 99%; height: auto; float: left; background-color: white;">';
        cad += '                             <div class="stlBuscarCaptacion" style="width: auto; overflow-y: scroll; height: 80px; border: 1px solid #d0e6e6; background-color: white; margin-left: 10px; margin-top: 5px;">';
        cad += '                                 <table style="width: 100%;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                                     <thead>';
        cad += '                                         <tr id="idTRTituloCorte1" class="stlTituloInfoCredito">';
        cad += '                                              <th style="width: 20%;">Cliente</th>';
        cad += '                                              <th style="width: 20%;">Número Crédito</th>';
        cad += '                                              <th style="width: 20%;">ID Cliente</th>';
        cad += '                                              <th style="width: 20%;">Fecha Último Pago</th>';
        cad += '                                              <th style="width: 20%;">Saldo Res. Total</th>';
        cad += '                                         </tr>';
        cad += '                                     </thead>';
        cad += '                                     <tbody id="idTRContenidoCorte1" class="stlContenidoInfoCaptacion">';
        for (var i = 0; i < JSON2.length - 1; i++) {
            cad += '                                    <tr>';
            cad += '                                        <td style="width: 40px;">' + ($.trim(JSON2[i]["FICTE"]) != "" ? JSON2[i]["FICTE"] : "---") + '</td>';
            cad += '                                        <td style="width: 40px;">' + ($.trim(JSON2[i]["FVCNUMERODECREDITO"]) != "" ? JSON2[i]["FVCNUMERODECREDITO"] : "---") + '</td>';
            cad += '                                        <td style="width: 40px;">' + ($.trim(JSON2[i]["FVCIDENTIFICADORDELCLIENTE"]) != "" ? JSON2[i]["FVCIDENTIFICADORDELCLIENTE"] : "---") + '</td>';
            cad += '                                        <td style="width: 40px;">' + ($.trim(JSON2[i]["FNFECHADEULTIMOPAGO"]) != "" ? JSON2[i]["FNFECHADEULTIMOPAGO"] : "---") + '</td>';
            cad += '                                        <td style="width: 40px;">' + ($.trim(JSON2[i]["FNSALDOORESPTOTAL"]) != "" ? JSON2[i]["FNSALDOORESPTOTAL"] : "---") + '</td>';
            cad += '                                    </tr>';
        }
        cad += '                                     </tbody>';
        cad += '                                 </table>';
        cad += '                             </div>';
        cad += '                         </div>';
        cad += '                     </td>';
        cad += '                     <td style="width: 48%; vertical-align: top;">';
        cad += '                         <div id="idDivCorte2" class="stlBuscarCaptacion" style="width: 99%; float: left; background-color: white;">';
        cad += '                             <div class="stlBuscarCaptacion" style="overflow-y: scroll; height: 80px; width: 100%; border: 1px solid #d0e6e6; background-color: white; margin-left: 5px; margin-top: 5px;">';
        cad += '                                 <table style="width: 100%;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                                     <thead>';
        cad += '                                         <tr class="stlTituloInfoCaptacion">';
        cad += '                                             <th style="width: 20%;">No. Cuenta</th>';
        cad += '                                             <th style="width: 20%;">Cve. Producto</th>';
        cad += '                                             <th style="width: 20%;">Cuenta Contable</th>';
        cad += '                                             <th style="width: 20%;">Nombre Producto</th>';
        cad += '                                             <th style="width: 20%;">Capital Cuenta</th>';
        cad += '                                         </tr>';
        cad += '                                     </thead>';
        cad += '                                     <tbody id="idTRContenidoCorte2" class="stlContenidoInfoCuenta">';
        for (var i = 0; i < JSON4.length - 1; i++) {
            cad += '                                    <tr>';
            cad += '                                        <td style="width: 40px;">' + ($.trim(JSON4[i]["NUMERO DE CUENTA"]) != "" ? JSON4[i]["NUMERO DE CUENTA"] : "---") + '</td>';
            cad += '                                        <td style="width: 40px;">' + ($.trim(JSON4[i]["CLAVE DEL PRODUCTO"]) != "" ? JSON4[i]["CLAVE DEL PRODUCTO"] : "---") + '</td>';
            cad += '                                        <td style="width: 40px;">' + ($.trim(JSON4[i]["CUENTA CONTABLE"]) != "" ? JSON4[i]["CUENTA CONTABLE"] : "---") + '</td>';
            cad += '                                        <td style="width: 40px;">' + ($.trim(JSON4[i]["NOMBRE PRODUCTO"]) != "" ? JSON4[i]["NOMBRE PRODUCTO"] : "---") + '</td>';
            cad += '                                        <td style="width: 40px;">' + ($.trim(JSON4[i]["CAPITAL CUENTA"]) != "" ? JSON4[i]["CAPITAL CUENTA"] : "---") + '</td>';
            cad += '                                    </tr>';
        }
        cad += '                                     </tbody>';
        cad += '                                 </table>';
        cad += '                             </div>';
        cad += '                         </div>';
        cad += '                     </td>';
        cad += '                 </tr>';
        cad += '             </table>';
        cad += '         </div>';
        cad += '     </div>';
        /*                                                                       Información General Cortes                                                       */
        cad += '    <div id="divCorteDetalle" style="width: auto; border: 1px solid #d0e6e6; background-color: white; margin:5px;">';
        cad += '        <table style="width: 100%;" cellpadding="0" cellspacing="0" border="0">';
        cad += '             <tr style="background-color: rgba(5, 127, 113, 1);">';
        cad += '                 <td style="width: 50%;  height:28px;">';
        cad += '                     <div class="stlInfCaptacion contentCaptacion" style="color: white;">Cortes</div>';
        cad += '                 </td>';
        cad += '                 <td style="width: 35%;  height:28px;">';
        cad += '                     <div class="stlInfCaptacion contentCaptacion" style="color: white; margin-left:15%; ">Cortes</div>';
        cad += '                 </td>';
        cad += '                 <td style="width: 15%;  height:28px;">';
        cad += '                     <div class="stlInfCaptacion contentCaptacion" style="width:30px; text-align: center; float: right;">';
        cad += '                        <img id="btnMuestraCorteDetalle"  onclick="mostrarInfoCorte(this);"  alt="muestra" src="../../Images/PanelDeControl/Captacion/btnMostrar_1.png" style="width: 15px; height: 20px; margin-right: 15px; cursor: pointer;" />';
        cad += '                     </div>';
        cad += '                     <div class="stlInfCaptacion contentCaptacion" style="width:150px; text-align: right; float: right;">';
        cad += '                        <span id="idSpanCortesDetalle" onclick="mostrarCortes(this);" title= "muestra" class="buttonCorte button-pill">Información General</span>';
        cad += '                     </div>';
        cad += '                 </td>';
        cad += '             </tr>';
        cad += '        </table>';

        cad += '    <div id="divMuestraCorteDetalle" lang="ocultar"  style="width: auto;" >';
        cad += '        <table style="height: 0px; width:100%; ">';
        cad += '             <tr>';
        cad += '                 <td style="vertical-align: top;">';
        cad += '                     <div id="idDivCorte3" class="stlBuscarCaptacion" style="width:500px; height:auto; background-color:white; float:left;">';
        cad += '                          <div class="stlBuscarCaptacion" style="overflow-y:scroll; overflow-x:scroll; height:130px; width:auto; border:1px solid #d0e6e6; background-color:white; margin-left: 0px; margin-top: 5px;">';
        cad += '                                 <table style="width:auto;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                                     <thead>';
        cad += '                                         <tr id="idTRTituloCorte" class="stlTituloInfoCredito">';
        cad += '                                             <th style="min-width: 80px;">Pedido</th>';
        cad += '                                             <th style="min-width: 80px;">Cliente</th>';
        cad += '                                             <th style="min-width: 130px;">Número Crédito</th>';
        cad += '                                             <th style="min-width: 110px;">ID Cliente</th>';
        cad += '                                             <th style="min-width: 80px;">Fecha Inicio</th>';
        cad += '                                             <th style="min-width: 120px;">Fecha Último Pago</th>';
        cad += '                                             <th style="min-width: 120px;">Saldo Res. Total</th>';
        cad += '                                             <th style="min-width: 120px;">Capital Vigente</th>';
        cad += '                                             <th style="min-width: 100px;">Capital Vencido</th>';
        cad += '                                             <th style="min-width: 120px;">Interes Ordinario</th>';
        cad += '                                         </tr>';
        cad += '                                     </thead>';
        cad += '                                     <tbody id="idTRContenidoCorte3" class="stlContenidoInfoCaptacion">';
        for (var i = 0; i < JSON2.length - 1; i++) {
            cad += '                                    <tr>';
            cad += '                                        <td>' + ($.trim(JSON2[i]["FNPEDIDO"]) != "" ? JSON2[i]["FNPEDIDO"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON2[i]["FICTE"]) != "" ? JSON2[i]["FICTE"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON2[i]["FVCNUMERODECREDITO"]) != "" ? JSON2[i]["FVCNUMERODECREDITO"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON2[i]["FVCIDENTIFICADORDELCLIENTE"]) != "" ? JSON2[i]["FVCIDENTIFICADORDELCLIENTE"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON2[i]["FNFECHADEINICIO"]) != "" ? JSON2[i]["FNFECHADEINICIO"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON2[i]["FNFECHADEULTIMOPAGO"]) != "" ? JSON2[i]["FNFECHADEULTIMOPAGO"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON2[i]["FNSALDOORESPTOTAL"]) != "" ? JSON2[i]["FNSALDOORESPTOTAL"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON2[i]["FNCAPITALVIGENTE"]) != "" ? JSON2[i]["FNCAPITALVIGENTE"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON2[i]["FNCAPITALVENCIDO"]) != "" ? JSON2[i]["FNCAPITALVENCIDO"] : "---") + '</td>';
            cad += '                                        <td>' + ($.trim(JSON2[i]["FNINTERESORDINARIO"]) != "" ? JSON2[i]["FNINTERESORDINARIO"] : "---") + '</td>';
            cad += '                                    </tr>';
        }
        cad += '                                     </tbody>';
        cad += '                                 </table>';
        cad += '                             </div>';
        cad += '                         </div>';

        cad += '                         <div id="idDivCorte4" class="stlBuscarCaptacion" style="width:500px; background-color:white; float:right;">';
        cad += '                             <div class="stlBuscarCaptacion" style="overflow-y:scroll; overflow-x:scroll; height:130px; width:auto; border:1px solid #d0e6e6; background-color: white; margin-left: 0px; margin-top: 5px;">';
        cad += '                                 <table style="width: 1440px; display: inline;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                                     <thead>';
        cad += '                                         <tr class="stlTituloInfoCaptacion">';
        cad += '                                             <th style="min-width: 110px;">Clave Cliente Alnova</th>';
        cad += '                                             <th style="min-width: 100px;">Número Cuenta</th>';
        cad += '                                             <th style="min-width: 80px;">Clave Producto</th>';
        cad += '                                             <th style="min-width: 80px;">Cuenta Contable</th>';
        cad += '                                             <th style="min-width: 80px;">Nombre Producto</th>';
        cad += '                                             <th style="min-width: 80px;">Capital Cuenta</th>';
        cad += '                                             <th style="min-width: 60px;">Intereses</th>';
        cad += '                                             <th style="min-width: 110px;">Retención Impuestos</th>';
        cad += '                                             <th style="min-width: 110px;">Saldo Neto de Cuenta</th>';
        cad += '                                             <th style="min-width: 60px;">Fecha Corte</th>';
        cad += '                                             <th style="min-width: 80px;">Fecha SIG Corte</th>';
        cad += '                                             <th style="min-width: 110px;">Fecha Contratación</th>';
        cad += '                                             <th style="min-width: 80px;">Plazo Operación</th>';
        cad += '                                             <th style="min-width: 50px;">Tasa</th>';
        cad += '                                             <th style="min-width: 110px;">Saldo Prom. Diario</th>';
        cad += '                                             <th style="min-width: 80px;">% Titularidad</th>';
        cad += '                                         </tr>';
        cad += '                                     </thead>';
        cad += '                                     <tbody id="idTRContenidoCorte4" class="stlContenidoInfoCuenta">';
        for (var i = 0; i < JSON4.length - 1; i++) {
            cad += '                                    <tr>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["CLAVE CLIENTE ALNOVA"]) != "" ? JSON4[i]["CLAVE CLIENTE ALNOVA"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["NUMERO DE CUENTA"]) != "" ? JSON4[i]["NUMERO DE CUENTA"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["CLAVE DEL PRODUCTO"]) != "" ? JSON4[i]["CLAVE DEL PRODUCTO"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["CUENTA CONTABLE"]) != "" ? JSON4[i]["CUENTA CONTABLE"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["NOMBRE PRODUCTO"]) != "" ? JSON4[i]["NOMBRE PRODUCTO"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["CAPITAL CUENTA"]) != "" ? JSON4[i]["CAPITAL CUENTA"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["INTERESES"]) != "" ? JSON4[i]["INTERESES"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["RETENCION IMPUESTOS"]) != "" ? JSON4[i]["RETENCION IMPUESTOS"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["SALDO NETO DE LA CUENTA"]) != "" ? JSON4[i]["SALDO NETO DE LA CUENTA"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["FECHA DE CORTE"]) != "" ? JSON4[i]["FECHA DE CORTE"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["FECHA SIG CORTE"]) != "" ? JSON4[i]["FECHA SIG CORTE"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["FECHA CONTRATACION"]) != "" ? JSON4[i]["FECHA CONTRATACION"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["PLAZO OPERACION"]) != "" ? JSON4[i]["PLAZO OPERACION"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["TASA"]) != "" ? JSON4[i]["TASA"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["SALDO PROM DIARIO"]) != "" ? JSON4[i]["SALDO PROM DIARIO"] : "---") + '</td>';
            cad += '                                       <td>' + ($.trim(JSON4[i]["PORCENTAJE DE TITULARIDAD"]) != "" ? JSON4[i]["PORCENTAJE DE TITULARIDAD"] : "---") + '</td>';
            cad += '                                    </tr>';
        }
        cad += '                                     </tbody>';
        cad += '                                 </table>';
        cad += '                             </div>';
        cad += '                         </div>';
        cad += '                     </td>';
        cad += '                 </tr>';
        cad += '             </table>';
        cad += '         </div>';
        cad += '    </div>';
        return cad;
    }


    /************************************************************************************************************************************************/
