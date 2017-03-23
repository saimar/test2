
var entroCloseFichatecnica = false;
var idPaisG; var idSegmentoG; var idReporteG; var idPeriodicidadG; var idEmpleadoG; var idSeccionG; var NoSerieG; var FechaCorteG;
var PaisSelecXUser = '';
var idAutenticado = '';
var nombreAutenticado = '';

//*********************************************************************** Código para el popUp *************************************************************************

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

    popUpDiv_height = blanket_height / 2 - 200;//200 is half popup's height
    //popUpDiv.style.top = popUpDiv_height + 'px';
    popUpDiv.style.top = ($(window).height() - $('#popUpDiv').outerHeight()) / 2 + 'px';
}

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
}

function popup(windowname) {
    blanket_size(windowname);
    window_pos(windowname);
    toggle('blanket');
    toggle(windowname);
}

//**********************************************************************************************************************************************************************

$(document).ready(function () {
    $("#imgOver").hover(function () {
        $(this).attr('src', '../../images/Pendientes/btnCancelarPendientes1.png');//cambia de imagen en el over
    }
    , function () {
        $(this).attr('src', '../../images/Pendientes/btnCancelarPendientes.png');
    });
});

$(function () {
    $("#tabs").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("#tabs li").removeClass("ui-corner-top");
});

    function SelectTab(tab, BgColorCss) {
        if (tab == "tabs-1") {
       
            cargarIncidencias();
            pintaContornoDiv('Incidencias');
        }
        else if (tab == "tabs-2") {
            cargarTablaRegulatorios();
            pintaContornoDiv('Regulatorios');
        }
        else if (tab == "tabs-3") {
            cargarOficios();
            pintaContornoDiv('Oficios');
        }
        else if (tab == "tabs-4") {
            cargarTablaActividades();
            pintaContornoDiv('Actividades');
        }
    }

    function CargarInicial() {
        cargarActividades();
        $(".dropShadowBox").css("padding-left", "0%");
        $(".dropShadowBox").css("width", "100%");
        $('.tabincIdencias').css('border', '2px solid #000000');

    }

    function pintaContornoDiv(id)
    {
        switch (id) {
            case 'Incidencias':
                $('.tabincIdencias').css('border', '3px solid #000000');
                $('.tabincIdencias').css('box-shadow', '3px -3px 3px #888888');

                $('.tabRegulatorios').css('border', '2px solid rgba(80, 136, 208, 0.45)');
                $('.tabOficios').css('border', '2px solid rgba(136, 176, 224, 0.45)');
                $('.tabActividades').css('border', '2px solid rgba(192, 216, 240, 0.45)');

                $('.tabRegulatorios').css('box-shadow', 'none');
                $('.tabOficios').css('box-shadow', 'none');
                $('.tabActividades').css('box-shadow', 'none');


                $('#tblIncidencias').css('height',  '30px');
                $('#tblRegulatorios').css('height', '29px');
                $('#tblOficios').css('height',      '29px');
                $('#tblActividades').css('height',  '29px');
                break;
            case 'Regulatorios':
                $('.tabRegulatorios').css('border', '3px solid #000000');
                $('.tabRegulatorios').css('box-shadow', '3px -3px 3px #888888');

                $('.tabincIdencias').css('border', '2px solid rgb(177, 208, 147)');
                $('.tabOficios').css('border', '2px solid rgba(136, 176, 224, 0.45)');
                $('.tabActividades').css('border', '2px solid rgba(192, 216, 240, 0.45)');

                $('.tabincIdencias').css('box-shadow', 'none');
                $('.tabOficios').css('box-shadow', 'none');
                $('.tabActividades').css('box-shadow', 'none');


                $('#tblIncidencias').css('height', '29px');
                $('#tblRegulatorios').css('height','30px');
                $('#tblOficios').css('height',     '29px');
                $('#tblActividades').css('height', '29px');

                break;
            case 'Oficios':
                $('.tabOficios').css('border', '3px solid #000000');
                $('.tabOficios').css('box-shadow', '3px -3px 3px #888888');

                $('.tabActividades').css('border', '2px solid rgba(192, 216, 240, 0.45)');
                $('.tabincIdencias').css('border', '2px solid  rgba(192, 216, 240, 0.45)');
                $('.tabRegulatorios').css('border', '2px solid rgba(80, 136, 208, 0.45)');

                $('.tabActividades').css('box-shadow', 'none');
                $('.tabincIdencias').css('box-shadow', 'none');
                $('.tabRegulatorios').css('box-shadow', 'none');


                $('#tblIncidencias').css('height', '29px');
                $('#tblRegulatorios').css('height','29px');
                $('#tblOficios').css('height',     '30px');
                $('#tblActividades').css('height', '29px');
                break;
            case 'Actividades':
                $('.tabActividades').css('border', '3px solid #000000');
                $('.tabActividades').css('box-shadow', '3px -3px 3px #888888');

                $('.tabRegulatorios').css('border', '2px solid rgba(80, 136, 208, 0.45)');
                $('.tabincIdencias').css('border', '2px solid rgba(192, 216, 240, 0.45)');
                $('.tabOficios').css('border', '2px solid rgba(136, 176, 224, 0.45)');

                $('.tabRegulatorios').css('box-shadow', 'none');
                $('.tabincIdencias').css('box-shadow', 'none');
                $('.tabOficios').css('box-shadow', 'none');

                $('#tblIncidencias').css('height',  '29px');
                $('#tblRegulatorios').css('height', '29px');
                $('#tblOficios').css('height',      '29px');
                $('#tblActividades').css('height',  '30px');
                break;
        }
    }

    function cargarActividades() {
        Waiting(true, "Cargando Información...");
   
        $(".container").css("padding-left", "5px");
        $(".container").css("padding-right", "5px");

        var l = $(window).width();
        $(".container").css("width", (parseInt(l) - 35) + "px");

        peticionAjax('Pendientes.aspx/obtieneDatosGenerales', "POST", {},
        function (data) {
            if (data.d != null && data.d.split('-')[0] != "Error") {

                idAutenticado = data.d.split('-')[0];
                nombreAutenticado = data.d.split('-')[1];
                $('#spanNombrePendientes').html(nombreAutenticado);
                peticionAjax('Pendientes.aspx/obtieneTotalesPendientes', "POST", { nResponsable: idAutenticado },
                    function (data) {
                        if (data.d != null && data.d.split('-')[0] != "Error") {
                            var JSONR = obtenerArregloDeJSONModificado(data.d.split('%%&&')[0], false);
                            // Incidencias
                            $("#responsableInc1").html(JSONR[0]["Atrasados"]);
                            $("#corresponsableInc2").html(JSONR[0]["Entrega_hoy"]);
                            $("#EnteradoInc3").html(JSONR[0]["Entrega_7"]);
                            // Regulatorios
                            $("#atrasadoReg1").html(JSONR[1]["Atrasados"]);
                            $("#entregaReg2").html(JSONR[1]["Entrega_hoy"]);
                            $("#entregaReg3").html(JSONR[1]["Entrega_7"]);
                            // Oficios
                            $("#Oficio1").html(JSONR[2]["Atrasados"]);
                            $("#Oficio2").html(JSONR[2]["Entrega_hoy"]);
                            $("#Oficio3").html(JSONR[2]["Entrega_7"]);
                            // Actividades
                            $("#entregaAct1").html(JSONR[3]["Atrasados"]);
                            $("#entregaAct2").html(JSONR[3]["Entrega_hoy"]);
                            $("#entregaAct3").html(JSONR[3]["Entrega_7"]);
                            cargarIncidencias();
                        }
                        else {
                            MostrarMsj("No hay información que mostrar", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                            Waiting(false, "Cargando Información...");
                        }
                    }, null);
            }
            else {
                MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Cargando Información...");
            }
        }, null);
    }

    //*******************************************************************************************************************************************************************************************
    //*******************************************************************************************************************************************************************************************
    //************************************************************************************* MODULO INCIDENCIAS **********************************************************************************
    //*******************************************************************************************************************************************************************************************
    //*******************************************************************************************************************************************************************************************

    function cargarIncidencias() {
        Waiting(true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/GetIncidencias', "POST", { nombre: idAutenticado },
        function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                var JSONR = obtenerArregloDeJSONModificado(data.d.split('-->')[0], false); // Responsable
                var JSONR1 = obtenerArregloDeJSONModificado(data.d.split('-->')[1], false);// Corresponsable
                var JSONR2 = obtenerArregloDeJSONModificado(data.d.split('-->')[2], false);// Enterado
                $("#divTablaRgulatorio").html(construyeDatosTablaInsidencias(JSONR, JSONR1, JSONR2));
                $("#divTablaRgulatorio").css("height", screen.height - 405 + "px");
                $("#divTablaRgulatorio").css("overflow-x", "scroll");

                $(".dropShadowBox").css("height", "100%");


                //ExportExcel(JSONR, JSONR1, JSONR2);
                //ExportExcel();
                Waiting(false, "Cargando Información...");
            }
            else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        }, null);
    }

    function ExportExcel()
    {
        Waiting(true, "Cargando Información...");

        peticionAjax('Pendientes.aspx/ExportExcel', "POST", { cadena: "" },
        function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                var JSONR = obtenerArregloDeJSONModificado(data.d.split('-->')[0], false); // Responsable

                Waiting(false, "Cargando Información...");
            }
            else {
                alertify.success("No es posible enviar el correo: " + data.d);
                //MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            }
        }, null);
    }

    function construyeDatosTablaInsidencias(JSONR, JSONR1, JSONR2) {
        var cont = 0;
        var bDato = false;
        var aux = 0;
        var cad = '';
        var formatNumber = {
            separador: ",", // separador para los miles
            sepDecimal: '.', // separador para los decimales
            formatear: function (num) {
                num += '';
                var splitStr = num.split('.');
                var splitLeft = splitStr[0];
                var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
                var regx = /(\d+)(\d{3})/;
                while (regx.test(splitLeft)) {
                    splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
                }
                return this.simbol + splitLeft + splitRight;
            },
            new: function (num, simbol) {
                this.simbol = simbol || '';
                return this.formatear(num);
            }
        }

        if (JSONR[0]["idSISTEMA"] != "000" || JSONR1[0]["idSISTEMA"] != "000" || JSONR2[0]["idSISTEMA"] != "000") {
            cad = '    <table style="width: 100%;" cellpadding="1" cellspacing="0" border="0">';
            cad += '        <tr style="width: 100%;" class="tituloTab">';
            cad += '            <td style="width: 7%; text-align:center;">Sistema</td>';
            cad += '            <td style="width: 6%; text-align:center;">Clave</td>';
            cad += '            <td style="width: 10%; text-align:center;">Nombre</td>';
            cad += '            <td style="width: 11%; text-align:center;">Descripción</td>';
            cad += '            <td style="width: 12%; text-align:center;">Responsable</td>';
            cad += '            <td style="width: 12%; text-align:center;">Corresponsable</td>';
            cad += '            <td style="width: 12%; text-align:center;">Reg. afectados / Monto</td>';
            cad += '            <td style="width: 30%; text-align:center;">Comentario</td>';
            cad += '        </tr>';
            cad += '   </table>';
        }
        else 
            cad += ' <br /><br /><br />';

        $("#divTituloContenido").html(cad);

        cad = '';
        cad += '<table id="tblRegulatorioChildren" style="width: 100%;" cellpadding="1" cellspacing="0" border="0">';

        JSONR[0]["idSISTEMA"] != "000" ? cont = parseInt(JSONR.length) - 1 : cont = 0;
        cad += '       <tr style="height:40px; ">';
        cad += '            <td> <div style="width:230px; height:40px; background-color: rgba(199, 229, 171, 1); display: table-cell; vertical-align: middle; color: black; text-align:left;"> &nbsp; &nbsp; &nbsp;<a name="Inc1" style="text-decoration:none;  font-size: 14px;" id="I1">Responsable ' + cont + '</a></div></td>';
        cad += '            <td style="background-color:white; text-align:left;"></td>';
        cad += '       </tr>';
        cad += '       <tr><td style="height:10px;"/><tr>';

        if (JSONR[0]["idSISTEMA"] != "000") {
            bDato = true;
            for (var ii = 0; ii < JSONR.length - 1; ii++) {
                cad += '   <tr>';
                cad += '      <td>';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '                <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                                <td id="' + ii + '_' + JSONR[ii]["CLAVE"] + '" style="height:25px;      width: 7%; vertical-align:left; text-align:left; ">' + JSONR[ii]["NEGOCIO"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR[ii]["CLAVE"] + '" style="text-align:left;  width: 6%;">' + JSONR[ii]["CLAVE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR[ii]["CLAVE"] + '" style="text-align:left;  width: 10%;">' + JSONR[ii]["NOMBRE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR[ii]["CLAVE"] + '" style="text-align:left;  width: 11%;">' + JSONR[ii]["DESCRIPCION"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR[ii]["CLAVE"] + '" style="text-align:left;  width: 12%;">' + JSONR[ii]["RESPONSABLE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR[ii]["CLAVE"] + '" style="text-align:left;  width: 12%;">' + JSONR[ii]["CORRESPONSABLE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR[ii]["CLAVE"] + '" style="text-align:right; width: 12%;"><div style=" width: 30%;display:table-cell; float:left; text-align:left; "><span style="color:#CC2A09; ">&nbsp;'
                    + formatNumber.new(JSONR[ii]["REGISTROSAFECTADOS"]) + '</span></div><div style="width: 70%; display:table-cell; float:right; text-align:left; ">&nbsp; <span style="color:#511207; ">' + JSONR[ii]["REGMONTO"] + '</span></div></td>';
                cad += '                                <td id="txt1Comentario' + ii + '_' + JSONR[ii]["CLAVE"] + '" style="    width: 30%; cursor: pointer;" align="left" onclick="AbrirComentariosIncidencias(this, \''
                    + JSONR[ii]["CLAVE"] + '\', \'' + JSONR[ii]["NEGOCIO"] + '\');" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">' + (JSONR[ii]["COMENTARIOS"] != "" ? JSONR[ii]["F_COMENTARIOS"] : "") + '</span>&nbsp;<span style="color:#492E09;">' + JSONR[ii]["RESPONSABLE_COMENTARIO"] + '</span>&nbsp;' + JSONR[ii]["COMENTARIOS"] + '</td>';
                cad += '                          </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;
            }
        }
        $("#responsableInc1").html(cont);

        JSONR1[0]["idSISTEMA"] != "000" ? cont = parseInt(JSONR1.length) - 1: cont = 0;
        cad += '       <tr style="height:40px;">';
        cad += '            <td> <div style="width: 230px; height:40px; background-color: rgba(199, 229, 171, 1); color:black; display: table-cell; vertical-align: middle; text-align:left; font-size: 14px;"> &nbsp; &nbsp; &nbsp;<a name="Inc2" style="text-decoration:none;" id="I2">Corresponsable ' + cont + '</a></div></td>';
        cad += '            <td style="background-color:white; text-align:left;"></td>';
        cad += '       </tr>';
        cad += '       <tr><td style="height:10px;"/><tr>';

        if (JSONR1[0]["idSISTEMA"] != "000") {
            bDato = true;
            for (var ii = 0; ii < JSONR1.length - 1; ii++) {
                cad += '   <tr>';
                cad += '      <td>';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '            <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                                <td id="' + ii + '_' + JSONR1[ii]["CLAVE"] + '" style="height:25px;      width: 7%; vertical-align:left; text-align:left; ">' + JSONR1[ii]["NEGOCIO"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR1[ii]["CLAVE"] + '" style="text-align:left;  width: 6%;">' + JSONR1[ii]["CLAVE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR1[ii]["CLAVE"] + '" style="text-align:left;  width: 10%;">' + JSONR1[ii]["NOMBRE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR1[ii]["CLAVE"] + '" style="text-align:left;  width: 11%;">' + JSONR1[ii]["DESCRIPCION"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR1[ii]["CLAVE"] + '" style="text-align:left;  width: 12%;">' + JSONR1[ii]["RESPONSABLE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR1[ii]["CLAVE"] + '" style="text-align:left;  width: 12%;">' + JSONR1[ii]["CORRESPONSABLE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR1[ii]["CLAVE"] + '" style="text-align:right; width: 12%;"><div style=" width: 30%;display:table-cell; float:left; text-align:left; "><span style="color:#CC2A09; ">&nbsp;'
                    + '                                 ' + formatNumber.new(JSONR1[ii]["REGISTROSAFECTADOS"]) + '</span></div><div style="width: 70%; display:table-cell; float:right; text-align:left; ">&nbsp; <span style="color:#511207; ">' + JSONR1[ii]["REGMONTO"] + '</span></div></td>';
                cad += '                                <td id="txt1Comentario' + ii + '_' + JSONR1[ii]["CLAVE"] + '" style="    width: 30%; cursor: pointer; "  align="left" onclick="AbrirComentariosIncidencias(this, \''
                    + '                                 ' + JSONR1[ii]["CLAVE"] + '\', \'' + JSONR1[ii]["NEGOCIO"] + '\');" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">' + (JSONR1[ii]["COMENTARIOS"] != "" ? JSONR1[ii]["F_COMENTARIOS"] : "") +
                    '                                     </span>&nbsp;<span style="color:rgba(87, 90, 97, 1);">' + JSONR1[ii]["RESPONSABLE_COMENTARIO"] + '</span>&nbsp;' + JSONR1[ii]["COMENTARIOS"] + '</td>';
                cad += '                          </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '   </tr>';
                aux += 1;
            }
        }

        $("#corresponsableInc2").html(cont);

        JSONR2[0]["idSISTEMA"] != "000" ? cont = parseInt(JSONR2.length) - 1: cont = 0;
        cad += '        <tr style="height:40px; ">';
        cad += '            <td> <div style="width:230px; height:40px; background-color: rgba(199, 229, 171, 1); color:black; display: table-cell; vertical-align: middle; text-align:left; font-size: 14px;"> &nbsp; &nbsp; &nbsp;<a name="Inc3" style="text-decoration:none;" id="I3">Enterado ' + cont + '</a></div></td>';
        cad += '            <td style="background-color:white; text-align:left;"></td>';
        cad += '        </tr>';
        cad += '        <tr><td style="height:10px;"/><tr>';

        if (JSONR2[0]["idSISTEMA"] != "000") {
            bDato = true;
            for (var ii = 0; ii < JSONR2.length -1; ii++) {
                cad += '   <tr>';
                cad += '      <td>';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '            <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                                <td id="' + ii + '_' + JSONR2[ii]["CLAVE"] + '" style="height:25px;      width: 6%; vertical-align:left; text-align:left; ">' + JSONR2[ii]["NEGOCIO"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR2[ii]["CLAVE"] + '" style="text-align:left;  width: 6%;">' + JSONR2[ii]["CLAVE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR2[ii]["CLAVE"] + '" style="text-align:left;  width: 10%;">' + JSONR2[ii]["NOMBRE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR2[ii]["CLAVE"] + '" style="text-align:left;  width: 11%;">' + JSONR2[ii]["DESCRIPCION"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR2[ii]["CLAVE"] + '" style="text-align:left;  width: 12%;">' + JSONR2[ii]["RESPONSABLE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR2[ii]["CLAVE"] + '" style="text-align:left;  width: 12%;">' + JSONR2[ii]["CORRESPONSABLE"] + '</td>';
                cad += '                                <td id="' + ii + '_' + JSONR2[ii]["CLAVE"] + '" style="text-align:right; width: 12%;"><div style=" width: 30%;display:table-cell; float:left; text-align:left; "><span style="color:#CC2A09; ">&nbsp;'
                    + formatNumber.new(JSONR2[ii]["REGISTROSAFECTADOS"]) + '</span></div><div style="width: 70%; display:table-cell; float:right; text-align:left; ">&nbsp; <span style="color:#511207; ">' + JSONR2[ii]["REGMONTO"] + '</span></div></td>';
                cad += '                                <td id="txt1Comentario' + ii + '_' + JSONR2[ii]["CLAVE"] + '" style="    width: 34.5%; cursor: pointer; "  align="left" onclick="AbrirComentariosIncidencias(this, \''
                    + JSONR2[ii]["CLAVE"] + '\', \'' + JSONR2[ii]["NEGOCIO"] + '\');" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">' + (JSONR2[ii]["COMENTARIOS"] != "" ? JSONR2[ii]["F_COMENTARIOS"] : "") + '</span>&nbsp;<span style="color:rgba(87, 90, 97, 1);">' + JSONR2[ii]["RESPONSABLE_COMENTARIO"] + '</span>&nbsp;' + JSONR2[ii]["COMENTARIOS"] + '</td>';
                cad += '                          </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;
            }
        }

        $("#EnteradoInc3").html(cont);
        var auxCad = '';
        if (!bDato) {
            auxCad += '<center><br><br><div>';
            auxCad += '<img alt="" height="96" src="../../Images/SicreNet/Pendientes/Informacion.png" ';
            auxCad += 'style="box-sizing: inherit; border: none; margin-top: 1em; display: block; float: none; margin-left: auto; margin-right: auto; color: rgb(51, 51, 51); font-size: 16px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 23.2px; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;" width="96" /><p class="intro center width-70" style="box-sizing: inherit; margin: 0px auto 1em; padding: 0px; font-size: 24px; line-height: 1.3375; font-weight: 300; width: 663.594px; display: block; float: none; color: rgb(51, 51, 51); font-style: normal; font-variant: normal; letter-spacing: normal; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">';
            auxCad += '&nbsp;</p>';
            auxCad += '<p class="intro center width-70" style="box-sizing: inherit; margin: 0px auto 1em; padding: 0px; font-size: 24px; line-height: 1.3375; font-weight: 300; width: 663.594px; display: block; float: none; color: rgb(51, 51, 51); font-family: \'Myriad Set Pro\', \'Lucida Grande\', \'Helvetica Neue\', Helvetica, Arial, Verdana, sans-serif; font-style: normal; font-variant: normal; letter-spacing: normal; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">';
            auxCad += ' Sin Pendientes</p>';
            auxCad += '</td></center>';
        }
        else {
            cad += '</table>';
            auxCad = cad;
        }
        return auxCad;
    }

    function AbrirComentariosIncidencias(obj, clave, negocio) {
        $('#popUpDiv').css('width', parseInt($(window).width()) - 100 + 'px');
        popup('popUpDiv');
        $('#divTblComentarios').html('');
   
        var txt = $(obj).attr("id");
        AbrirComentariosIncidencias2(txt, obj, clave, negocio);
    }

    function AbrirComentariosIncidencias2(txt, obj, clave, negocio) {
        WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/GetIncidenciasComentarios', "POST", { sClave: clave, sNegcio: negocio },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSONModificado(data.d, false);
                        $("#divTblComentarios").html(generaTablaComentariosIncidenciasDatos(txt, JSON, clave, negocio));
                    }
                    else {
                        $("#divTblComentarios").html(generaTablaComentariosIncidencias(txt, clave, negocio));
                    }
                }
                else {
                    $("#divVerFichaTecnica").dialog("close");
                    MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
            }, null);
        WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
    }

    function generaTablaComentariosIncidenciasDatos(txt, JSON, clave, negocio) {
        var cad = ' <div style="width:100%; height:200px;">';
        cad += '      <table width="100%">';
        cad += '         <tr>';
        cad += '             <td class="TituloComentario">&nbsp; Agregar comentarios';
        cad += '             </td>';
        cad += '         </tr>';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <textarea id="TextMessage" name="TextMessage" rows="5" cols="60" lang="aa" style="width: 100%; height: 100px;"></textarea>';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '         <tr>';
        cad += '             <td style="height:28px; vertical-align: left; ">';
        cad += '               <input type="button" value="Agregar" class="classButton" onclick="GuardaComentariosIncidencias(\'' + txt + '\',\'' + clave + '\', \'' + negocio + '\');" style="float: right;" />';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '        <tr>';
        cad += '             <td class="col-Titulo-Comentario"> &nbsp; &nbsp; Comentarios anteriores';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '    </table>'
        cad += '  </div>'
        cad += ' <div style="width:100%; height:240px; overflow-y: scroll;">';
        cad += '    <table width="100%">';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <table style="width:100%; height:100%; font-size: 11px;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                    <tr style="font-size: 11px; text-align:left; color: #3c3b3b; font-weight:600; font-family: Verdana, Geneva, sans-serif;">';
        cad += '                        <td style="height:20px; width:15%;">Fecha</td>';
        cad += '                        <td style="height:20px; width:15%;">Autor del comentario</td>';
        cad += '                        <td style="height:20px; width:70%;">Comentarios</td>';
        cad += '                    </tr>';
        for (var i = 0; i < JSON.length - 1; i++) {
            //cad += i > 0 ? '        <tr style="height:1px;" class="contenidoTab1"><td style="height:1px;"></td><tr colspan="3"></tr>' : '';
            cad += '                    <tr class="tdComentariopend">';
            cad += '                        <td style="height:20px; width:10%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(51, 122, 182, 1)">' + JSON[i]["FECHA_INGRESO"] + '</span></td>';
            cad += '                        <td style="height:20px; width:15%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(87, 90, 97, 1);" >' + JSON[i]["RESPONSABLE_COMENTARIO"] + '</span></td>';
            cad += '                        <td style="height:20px; width:75%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(51, 122, 182, 1)">' + JSON[i]["COMENTARIO"] + '</span></td>';
            cad += '                   </tr>';
        }
        cad += '                 </table>';
        cad += '             </td>';
        cad += '         </tr>';
        cad += '     </table>';
        cad += ' </div>'
        return cad;
    }

    function generaTablaComentariosIncidencias(txt, clave, negocio) {
        var cad = ' <div style="width:100%; height:160px;">';
        cad += '      <table width="100%">';
        cad += '         <tr>';
        cad += '             <td class="TituloComentario">  &nbsp&nbspAgregar comentarios';
        cad += '             </td>';
        cad += '         </tr>';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <textarea id="TextMessage" name="TextMessage" rows="5" cols="60" lang="aa" style="width: 100%; height: 100px;"></textarea>';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '         <tr>';
        cad += '             <td style="height:28px; vertical-align: left; ">';
        cad += '               <input type="button" value="Agregar" class="classButton" onclick="GuardaComentariosIncidencias(\'' + txt + '\',\'' + clave + '\', \'' + negocio + '\');" style="float: right;" />';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '    </table>'
        cad += '  </div>'
        return cad;
    }

    function GuardaComentariosIncidencias(txt, clave, negocio) {
        WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/InsertaComentariosIncidencias', "POST", { sClave: clave, sComentario: $("#TextMessage").val(), sNegocio: negocio },
           function (data) {
               if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                   var JSON = obtenerArregloDeJSONModificado(data.d, false);
                   $("#" + txt).html(JSON[0]["Fecha"] + ' ' + $("#TextMessage").val());
                   $("#TextMessage").val('');
                   $("#divTblComentarios").empty();
                   alertify.success("Se agregó un comentario");
                   AbrirComentariosIncidencias2(txt, "", clave, negocio);
               }
           }, null);
        WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
    }


    //******************************************************************************************************************************************************************************************
    //******************************************************************************************************************************************************************************************
    //***************************************************************************************** MODULO REGULATORIOS ****************************************************************************
    //******************************************************************************************************************************************************************************************
    //******************************************************************************************************************************************************************************************

    function cargarTablaRegulatorios() {
        Waiting(true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/obtieneDatosGenerales', "POST", {},
        function (data) {
            if (data.d != null && data.d.split('-')[0] != "Error") {
                cargarTabla(idAutenticado);
            }
            else {
                MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Cargando Información...");
            }
        }, null);
    }

    function cargarTabla(nombreC) {
        peticionAjax('Pendientes.aspx/GetPendientesRegulatorios', "POST", { Responsable: nombreC, idPais: PaisSelecXUser },
        function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                var JSONR = obtenerArregloDeJSONModificado(data.d.split('-->')[0], false);
                var JSONR1 = obtenerArregloDeJSONModificado(data.d.split('-->')[1], false);
                var JSONR2 = obtenerArregloDeJSONModificado(data.d.split('-->')[2], false);
                var JSONR3 = obtenerArregloDeJSONModificado(data.d.split('-->')[3], false);
                $("#divTablaRgulatorio").html(ObtenerDatosTabla(JSONR, JSONR1, JSONR2, JSONR3));
                $("#divTablaRgulatorio").css("height", screen.height - 405 + "px");
                $("#divTablaRgulatorio").css("overflow-x", "scroll");

                Waiting(false, "Cargando Información...");
            }
            else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        }, null);
    }

    function ObtenerDatosTabla(JSONR, JSONR1, JSONR2, JSONR3) {
        var cont = '';
        var bDato = false;
        var aux = 0;
        var cadena = '';
        var cad = '';

        if (JSONR[0]["FIIdPais"] != "000" || JSONR1[0]["FIIdPais"] != "000" || JSONR2[0]["FIIdPais"] != "000" || JSONR3[0]["FIIdPais"] != "000") {
            cad = '<table style="width: 100%;" cellpadding="1" cellspacing="0" border="0">';
            cad += '       <tr style="width: 100%; background-color:rgba(171, 197, 230, 1);" class="tituloTab">';
            cad += '            <td style="width: 4%;  text-align:center;">Estatus</td>';
            cad += '            <td style="width: 4%;  text-align:center;">Fecha de Reporte</td>';
            cad += '            <td style="width: 4%;  text-align:center;">Fecha de Entrega</td>';
            cad += '            <td style="width: 4%;  text-align:center;">Dias de Atraso</td>';
            cad += '            <td style="width: 8%;  text-align:center;">Segmentacion</td>';
            cad += '            <td style="width: 4%;  text-align:center;">No. Serie</td>';
            cad += '            <td style="width: 15%; text-align:center;">Reporte</td>';
            cad += '            <td style="width: 15%; text-align:center;">Responsable</td>';
            cad += '            <td style="width: 15%; text-align:center;">Corresponsable</td>';
            cad += '            <td style="width: 27%; text-align:center;">Comentario</td>';
            cad += '       </tr>';
            cad += '   </table>';
        }
        else
            cad += ' <br /><br /><br />';

        $("#divTituloContenido").html(cad);

        cad = '';
        cadena = '';
        cont = 0;
        cad += '    <table id="tblRegulatorioChildren" style="width: 100%;" cellpadding="1" cellspacing="1" border="0">';

        JSONR[0]["FIIdPais"] != "000" ? cont = parseInt(JSONR.length) - 1: cont = 0;
        cad += '        <tr  style=" height:40px; ">';
        cad += '            <td><div style="width:230px; height:40px; background-color: rgba(171, 197, 230, 1); display: table-cell; vertical-align: middle; color:black; text-align:left; font-size: 15px;"> &nbsp; &nbsp; &nbsp;<a name="Reg1" style="text-decoration:none;" id="R3">Atrasados ' + cont + '</a></div></td>';
        cad += '            <td style="background-color:white; text-align:left;"></td>';
        cad += '        </tr>';
        cad += '       <tr><td style="height:10px;"/><tr>';

        if (JSONR[0]["FIIdPais"] != "000") {
            bDato = true;
            for (var ii = 0; ii < JSONR.length -1; ii++) {
                cadena = ii + '_' + JSONR[ii]["NoSerie"] + '_' + JSONR[ii].FIIdReporte + '_' + JSONR[ii]["FIIdPais"] + '_' + JSONR[ii]["Fecha_Corte"].split('/')[2].split(' ')[0] + '-' + JSONR[ii]["Fecha_Corte"].split('/')[1] + '-' + JSONR[ii]["Fecha_Corte"].split('/')[0];
                cad += '   <tr style="width: 100%;">';
                cad += '      <td style="width: 100%;">';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '        <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                            <td id="' + cadena + '" style="height:25px;       width: 4%; vertical-align:left; text-align:left; "><div id="div' + JSONR[ii]["NoSerie"] + '" class="divEstatusRojo" style="width:40px; height:18px; " /></td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%; ">' + JSONR[ii].FechadeReporte + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%; ">' + JSONR[ii].FechadeEntrega + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%; ">' + JSONR[ii].DiasAtraso + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 8%; ">' + JSONR[ii].Segmentacion + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%; ">' + JSONR[ii].NoSerie + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:left;   width: 15%; " >' + JSONR[ii].Reporte + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 15%; ">' + JSONR[ii].Responsable + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:left;   width: 15%; ">' + JSONR[ii]["CORRESPONSABLE"] + '</td>';
                cad += '                            <td id="txt1Comentario' + cadena + '"  style="cursor: pointer; width: 27%; " align="left" onclick="AbrirComentariosRegulatorios(this, ' + JSONR[ii].FIIdPais
                cad += '                                 ,' + JSONR[ii].FIIdSegmentacion + ',' + JSONR[ii].FIIdReporte + ',' + JSONR[ii].FIIdPeriodicidad + ',\'\',2,\'' + JSONR[ii].FechadeReporte + '\',\'' + JSONR[ii].NoSerie
                                                        + '\');" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">' + JSONR[ii]["Fecha_Comentarios"] + "</span> " + '</span>&nbsp;<span style="color:rgba(87, 90, 97, 1);">' + JSONR[ii]["RESPONSABLE_COMENTARIO"] + '</span>&nbsp;' + JSONR[ii]["Comentarios"] + '</td>';
                cad += '                        </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '   </tr>';
                aux += 1;
            }
        }
        $("#atrasadoReg1").html(cont);
        cont = 0;
        cadena = '';

        JSONR1[0]["FIIdPais"] != "000" ? cont = parseInt(JSONR1.length) - 1 : cont = 0;
        cad += '    <tr style="height:40px; ">';
        cad += '        <td><div style="width:230px; height:40px; background-color: rgba(171, 197, 230, 1); color:black; display: table-cell; vertical-align: middle; text-align:left; font-size: 15px;"> &nbsp; &nbsp; &nbsp;<a name="Reg2" style="text-decoration:none;" id="R2">Entrega hoy ' + cont + '</a></div></td>';
        cad += '        <td style="background-color:white; text-align:left;"></td>';
        cad += '    </tr>';
        cad += '       <tr><td style="height:10px;"/><tr>';

        if (JSONR1[0]["FIIdPais"] != "000") {
            bDato = true;
            for (var ii = 0; ii < JSONR1.length - 1; ii++) {
                cadena = ii + '_' + JSONR1[ii]["NoSerie"] + '_' + JSONR1[ii].FIIdReporte + '_' + JSONR1[ii]["FIIdPais"] + '_' + JSONR1[ii]["Fecha_Corte"].split('/')[2].split(' ')[0] + '-' + JSONR1[ii]["Fecha_Corte"].split('/')[1] + '-' + JSONR1[ii]["Fecha_Corte"].split('/')[0];
                cad += '   <tr style="width: 100%;">';
                cad += '      <td style="width: 100%;">';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '        <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                            <td id="' + cadena + '" style="height:25px;       width: 4%; vertical-align:central; text-align:center; "><div  id="div' + JSONR1[ii]["NoSerie"] + '"  class="divEstatusNaranja" style="width:40px; height:18px; " /></td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%;  ">' + JSONR1[ii].FechadeReporte + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%;  ">' + JSONR1[ii].FechadeEntrega + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%;  ">' + JSONR1[ii].DiasAtraso + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 8%; ">' + JSONR1[ii].Segmentacion + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%; ">' + JSONR1[ii].NoSerie + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:left;   width: 15%; "  >' + JSONR1[ii].Reporte + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 15%; ">' + JSONR1[ii].Responsable + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:left;   width: 15%; ">' + JSONR[ii]["CORRESPONSABLE"] + '</td>';
                cad += '                            <td id="txt1Comentario' + cadena + '"  style="cursor: pointer; width: 27%; " align="left" onclick="AbrirComentariosRegulatorios(this, ' + JSONR1[ii].FIIdPais
                cad += '                                 ,' + JSONR1[ii].FIIdSegmentacion + ',' + JSONR1[ii].FIIdReporte + ',' + JSONR1[ii].FIIdPeriodicidad + ',\'\',2,\'' + JSONR1[ii].FechadeReporte + '\',\'' + JSONR1[ii].NoSerie
                                                        + '\');" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">' + JSONR1[ii]["Fecha_Comentarios"] + "</span> " + '</span>&nbsp;<span style="color:rgba(87, 90, 97, 1);">' + JSONR1[ii]["RESPONSABLE_COMENTARIO"] + '</span>&nbsp;' + JSONR1[ii]["Comentarios"] + '</td>';
                cad += '                        </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '  </tr>';
                aux += 1;

            }
        }
        $("#entregaReg2").html(cont);
        cadena = '';
        cont = 0;

        JSONR2[0]["FIIdPais"] != "000" ? cont = parseInt(JSONR2.length) - 1 : cont = 0;
        JSONR3[0]["FIIdPais"] != "000" ? cont += parseInt(JSONR3.length) - 1: cont += 0;
        cad += '        <tr style="height:40px; " class="contenidoTab1">';
        cad += '            <td> <div style="width:230px; height:40px; background-color:rgba(171, 197, 230, 1); color:black; display: table-cell; vertical-align: middle; text-align:left; font-size: 15px;"> &nbsp; &nbsp; &nbsp;<a name="Reg3" style="text-decoration:none;" id="R3">Entrega 7 dias ' + cont + '</a></td>';
        cad += '            <td colspan="7" style="background-color:white; text-align:left;"></td>';
        cad += '        </tr>';
        cad += '       <tr><td style="height:10px;"/><tr>';

        if (JSONR2[0]["FIIdPais"] != "000") {
            bDato = true;
            for (var ii = 0; ii < JSONR2.length - 1; ii++) {
                cadena = ii + '_' + JSONR2[ii]["NoSerie"] + '_' + JSONR2[ii].FIIdReporte + '_' + JSONR2[ii]["FIIdPais"] + '_' + JSONR2[ii]["Fecha_Corte"].split('/')[2].split(' ')[0] + '-' + JSONR2[ii]["Fecha_Corte"].split('/')[1] + '-' + JSONR2[ii]["Fecha_Corte"].split('/')[0];
                cad += '   <tr style="width: 100%;">';
                cad += '      <td style="width: 100%;">';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '        <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                            <td id="' + cadena + '" style="height:25px;       width: 4%; vertical-align:central; text-align:center; "><div id="div' + JSONR2[ii]["NoSerie"] + '" class="divEstatusAmarillo" style="width:40px; height:18px; " /></td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%;  ">' + JSONR2[ii].FechadeReporte + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%;  ">' + JSONR2[ii].FechadeEntrega + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%;  ">' + JSONR2[ii].DiasAtraso + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 8%; ">' + JSONR2[ii].Segmentacion + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 4%; ">' + JSONR2[ii].NoSerie + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:left;   width: 15%; "  >' + JSONR2[ii].Reporte + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 15%; ">' + JSONR2[ii].Responsable + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:left;   width: 15%; ">' + JSONR2[ii]["CORRESPONSABLE"] + '</td>';
                cad += '                            <td id="txt1Comentario' + cadena + '"  style="cursor: pointer; width: 27%; " align="left" onclick="AbrirComentariosRegulatorios(this, ' + JSONR2[ii].FIIdPais
                cad += '                                 ,' + JSONR2[ii].FIIdSegmentacion + ',' + JSONR2[ii].FIIdReporte + ',' + JSONR2[ii].FIIdPeriodicidad + ',\'\',2,\'' + JSONR2[ii].FechadeReporte + '\',\'' + JSONR2[ii].NoSerie
                                                        + '\');" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">' + JSONR2[ii]["Fecha_Comentarios"] + "</span> " + '</span>&nbsp;<span style="color:rgba(87, 90, 97, 1);">' + JSONR2[ii]["RESPONSABLE_COMENTARIO"] + '</span>&nbsp;' + JSONR2[ii]["Comentarios"] + '</td>';
                cad += '                        </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;

            }
        }
        cadena = '';
        if (JSONR3[0]["FIIdPais"] != "000") {
            bDato = true;
            for (var ii = 0; ii < JSONR3.length - 1; ii++) {
                cadena = ii + '_' + JSONR3[ii]["NoSerie"] + '_' + JSONR3[ii].FIIdReporte + '_' + JSONR3[ii]["FIIdPais"] + '_' + JSONR3[ii]["Fecha_Corte"].split('/')[2].split(' ')[0] + '-' + JSONR3[ii]["Fecha_Corte"].split('/')[1] + '-' + JSONR3[ii]["Fecha_Corte"].split('/')[0];
                cad += '   <tr style="width: 100%;">';
                cad += '      <td style="width: 100%;">';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '        <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                            <td id="' + cadena + '" style="height:25px; width: 100px; vertical-align:central; text-align:center; "><div id="div' + JSONR3[ii]["NoSerie"] + '" class="divEstatusGris" style="width:40px; height:18px; " /></td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 70px;  ">' + JSONR3[ii].FechadeReporte + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 70px;  ">' + JSONR3[ii].FechadeEntrega + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 80px;  ">' + JSONR3[ii].DiasAtraso + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 110px; ">' + JSONR3[ii].Segmentacion + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 100px; ">' + JSONR3[ii].NoSerie + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:left; width: 200px; "  >' + JSONR3[ii].Reporte + '</td>';
                cad += '                            <td id="' + cadena + '" style="text-align:center; width: 200px; ">' + JSONR3[ii].Responsable + '</td>';
                cad += '                            <td id="txt1Comentario' + cadena + '"  style="cursor: pointer; width: 450px; " align="left" onclick="AbrirComentariosRegulatorios(this, ' + JSONR3[ii].FIIdPais
                cad += '                                 ,' + JSONR3[ii].FIIdSegmentacion + ',' + JSONR3[ii].FIIdReporte + ',' + JSONR3[ii].FIIdPeriodicidad + ',\'\',2,\'' + JSONR3[ii].FechadeReporte + '\',\'' + JSONR3[ii].NoSerie
                                                        + '\');" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">' + JSONR3[ii]["Fecha_Comentarios"] + "</span> " + '</span>&nbsp;<span style="color:rgba(87, 90, 97, 1);">' + JSONR3[ii]["RESPONSABLE_COMENTARIO"] + '</span>&nbsp;' + JSONR3[ii]["Comentarios"] + '</td>';
                cad += '                        </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;
            }
        }

        $("#entregaReg3").html(cont);

        var auxCad = '';
        if (!bDato) {
            auxCad += '<center><br><br><div>';
            auxCad += '<img alt="" height="96" src="../../Images/SicreNet/Pendientes/Informacion.png" ';
            auxCad += 'style="box-sizing: inherit; border: none; margin-top: 1em; display: block; float: none; margin-left: auto; margin-right: auto; color: rgb(51, 51, 51); font-size: 16px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 23.2px; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;" width="96" /><p class="intro center width-70" style="box-sizing: inherit; margin: 0px auto 1em; padding: 0px; font-size: 24px; line-height: 1.3375; font-weight: 300; width: 663.594px; display: block; float: none; color: rgb(51, 51, 51); font-style: normal; font-variant: normal; letter-spacing: normal; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">';
            auxCad += '&nbsp;</p>';
            auxCad += '<p class="intro center width-70" style="box-sizing: inherit; margin: 0px auto 1em; padding: 0px; font-size: 24px; line-height: 1.3375; font-weight: 300; width: 663.594px; display: block; float: none; color: rgb(51, 51, 51); font-family: \'Myriad Set Pro\', \'Lucida Grande\', \'Helvetica Neue\', Helvetica, Arial, Verdana, sans-serif; font-style: normal; font-variant: normal; letter-spacing: normal; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">';
            auxCad += ' Sin Pendientes</p>';
            auxCad += '</td></center>';
        }
        else {
            cad += '</table>';

            cad += ' <script type="text/javascript">';
            cad += ' Dropzone.autoDiscover = false;';

            for (var i = 0; i < aux; i++) {
                cad += ' $(document).ready(function () {';
                cad += '    $("#dZUpload' + i + '").dropzone({';
                cad += '            url: "DragAndDrop.ashx",';
                cad += '            maxFiles: 10,';
                cad += '            addRemoveLinks: true,';
                cad += '        success: function (file, response) {';
                cad += '            validaAlmacenaArchivo_Regulatorios()';
                cad += '            }, error: function (file, response) {';
                cad += '            MostrarMsj("Ocurrio un error al cargar el archivo", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);';
                cad += '        }';
                cad += '     });';
                cad += ' });';
            }

            cad += ' $(document).ready(function () {';
            cad += '        $("#tblRegulatorioChildren tr td").hover(function () {';
            cad += '            $(this).addClass("hover");';
            cad += '            var status; status += $(this).attr("id");';
            cad += '            $.ajax({';
            cad += '                type: "POST",';
            cad += '                url: "DragAndDrop.ashx",';
            cad += '                data: { nSerie: $(this).attr("id") },';
            cad += '                dataType: "json",';
            cad += '                success: function (response) { }';
            cad += '                });';
            cad += '            }, function () { });';
            cad += '        });';
            cad += ' </script>';

            auxCad = cad;
        }
        return auxCad;
    }

    function validaAlmacenaArchivo_Regulatorios() {
        Waiting(true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/validaAlmacenaArchivo_Regulatorios', "POST", {},
             function (data) {
                 if (data.d.split('#')[0] == "Subir") {

                     alertify.confirm('Se almacenara el archivo para la regulación:  <b>' + data.d.split('#')[1].split("_")[1] + '</b>, ¿Desea continuar?', function (e) {
                         if (e) {
                             var param = {
                                 iReporte: data.d.split('#')[1].split("_")[2],
                                 iPais: data.d.split('#')[1].split("_")[3],
                                 sFecha: data.d.split('#')[1].split("_")[4]
                             };
                             almacenaArchivo_Regulatorios(param, data.d.split('#')[1].split("_")[1]);
                         }
                         else {
                             Waiting(false, "Cargando Información...");
                         }
                     });
                 }
             }, null);
        Waiting(false, "Cargando Información...");
    }

    function almacenaArchivo_Regulatorios(param, Datos) {
        peticionAjax('Pendientes.aspx/almacenaArchivo_Regulatorios', "POST", param, function (data) {
            if (data.d.split("-")[0] == 'Error') {
                var cad = 'Error en la subida de Archivo. <br/>';
                MostrarMsj(data.d.indexOf("Error") != -1 ? cad : "Error en el Archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 350, 220, null, function () {
                    entroCloseBtnAceptar = true;
                    $("#divVentanaMensajes").dialog("close");
                });
            }
            else {
                var cadena = "#div" + Datos;
                $(cadena).removeClass($(cadena).attr('class'));
                $(cadena).addClass('divEstatusVerde');
                alertify.success("Se agrego el archivo satisfactoriamente.");
            }
        });
    }

    function AbrirComentariosRegulatorios(obj, idPais, idSegmento, idReporte, idPeriodicidad, idEmpleado, idSeccion, FechaCorte, NoSerie) {
        //idEmpleado = $("#divVerFichaTecnica").context.cookie.split("|")[1];
        idPaisG = idPais; idSegmentoG = idSegmento; idReporteG = idReporte; idPeriodicidadG = idPeriodicidad; idEmpleadoG = idAutenticado; idSeccionG = idSeccion; FechaCorteG = FechaCorte; NoSerieG = NoSerie;
   
        $('#popUpDiv').css('width', parseInt($(window).width()) - 100 + 'px');
        popup('popUpDiv');

        var txt = $(obj).attr("id");
        AbrirComentariosRegulatorios2(txt, idPaisG, idSegmentoG, idReporteG, idPeriodicidadG, idEmpleadoG, idSeccionG, FechaCorteG, NoSerie);
    }

    function AbrirComentariosRegulatorios2(txt, idPais, idSegmento, idReporte, idPeriodicidad, idEmpleado, idSeccion, FechaCorte, NoSerie) {
        WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/GetPendientesRegulatorioComentarios', "POST", { FIIdPais: idPais, FIIdReporte: idReporte, FIIdSegmentacion: idSegmento, FIIdPeriodicidad: idPeriodicidad, FIIdEmpleado: idEmpleado, FIIdSeccion: idSeccion, FechaCorte: FechaCorte, NoSerie: NoSerie },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSONModificado(data.d, false);
                        $("#divTblComentarios").html(generaTablaComentariosDatos(txt, JSON));
                    }
                    else {
                        $("#divTblComentarios").html(generaTablaComentarios(txt));
                    }
                }
                else {
                    $("#divVerFichaTecnica").dialog("close");
                    MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
            }, null);
        WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
    }

    function generaTablaComentariosDatos(txt, JSON) {
        var cad = ' <div style="width:100%; height:200px;">';
        cad += '      <table width="100%">';
        cad += '         <tr>';
        cad += '             <td class="TituloComentario">&nbsp; &nbsp; Agregar comentarios';
        cad += '             </td>';
        cad += '         </tr>';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <textarea id="TextMessage" name="TextMessage" rows="5" cols="60" lang="aa" style="width: 100%; height: 100px;"></textarea>';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '         <tr>';
        cad += '             <td style="height:28px; vertical-align: left; ">';
        cad += '               <input type="button" value="Agregar" class="classButton" onclick="GuardaComentarios(\'' + txt + '\');" style="float: right;" />';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '        <tr>';
        cad += '             <td class="col-Titulo-Comentario"> &nbsp; &nbsp; Comentarios anteriores';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '    </table>'
        cad += '  </div>'
        cad += ' <div style="width:100%; height:240px; overflow-y: scroll;">';
        cad += '    <table width="100%">';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <table style="width:100%; height:100%; font-size: 11px;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                    <tr style="font-size: 11px; text-align:left; color: #3c3b3b; font-weight:600; font-family: Verdana, Geneva, sans-serif;">';
        cad += '                        <td style="height:20px; width:15%;">Fecha</td>';
        cad += '                        <td style="height:20px; width:15%;">Autor del comentario</td>';
        cad += '                        <td style="height:20px; width:70%;">Comentarios</td>';
        cad += '                    </tr>';
        for (var i = 0; i < JSON.length - 1; i++) {
            //cad += i > 0 ? '        <tr style="height:1px;" class="contenidoTab1"><td style="height:1px;"></td><tr colspan="3"></tr>' : '';
            cad += '                    <tr class="tdComentariopend">';
            cad += '                        <td style="height:20px; width:10%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(51, 122, 182, 1)">' + JSON[i]["fechaCreacion"] + '</span></td>';
            cad += '                        <td style="height:20px; width:15%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(177, 0, 0, 1);">' + JSON[i]["NOMBRE_RESPONSABLE"] + '</span></td>';
            cad += '                        <td style="height:20px; width:75%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(51, 122, 182, 1)">' + JSON[i]["Comentarios"] + '</span></td>';
            cad += '                   </tr>';
        }
        cad += '                 </table>';
        cad += '             </td>';
        cad += '         </tr>';
        cad += '     </table>';
        cad += ' </div>'
        return cad;
    }

    function generaTablaComentarios(txt) {
        var cad = ' <div style="width:100%; height:160px;">';
        cad += '      <table width="100%">';
        cad += '         <tr>';
        cad += '             <td class="TituloComentario"> &nbsp&nbspAgregar comentarios';
        cad += '             </td>';
        cad += '         </tr>';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <textarea id="TextMessage" name="TextMessage" rows="5" cols="60" lang="aa" style="width: 100%; height: 100px;"></textarea>';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '         <tr>';
        cad += '             <td style="height:28px; vertical-align: left; ">';
        cad += '               <input type="button" value="Agregar" class="classButton" onclick="GuardaComentarios(\'' + txt + '\');" style="float: right;" />';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '    </table>'
        cad += '  </div>'
        return cad;
    }

    function GuardaComentarios(txt) {
        WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/InsertPendientesComentarios', "POST", {
            FIIdPais: idPaisG, FIIdReporte: idReporteG, FIIdSegmentacion: idSegmentoG, FIIdPeriodicidad: idPeriodicidadG, FIIdEmpleado: idEmpleadoG
            , FIIdSeccion: idSeccionG, Comentarios: $("#TextMessage")[0].innerHTML, FechaCorte: FechaCorteG, NoSerie: NoSerieG
        },
           function (data) {
               if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                   var tiempo = new Date();
                   var hora = tiempo.getHours();
                   var minutos = tiempo.getMinutes();
                   $("#" + txt).html($.datepicker.formatDate('yy/mm/dd', new Date()) + ' ' + hora + ':' + minutos + ' ' + $("#TextMessage").val());
                   $("#TextMessage").val('');
                   $("#divTblComentarios").empty();
                   alertify.success("Se agregó un comentario");
                   AbrirComentariosRegulatorios2(txt, idPaisG, idSegmentoG, idReporteG, idPeriodicidadG, idEmpleadoG, idSeccionG, FechaCorteG, NoSerieG);
               }
               else {
                   alertify.success("No es posible agregar el comentario...!");
                   popup('popUpDiv');
               }
           }, null);
        WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
    }

    //******************************************************************************************************************************************************************************************
    //******************************************************************************************************************************************************************************************
    //*************************************************************************************** MODULO OFICIOS ***********************************************************************************
    //******************************************************************************************************************************************************************************************
    //******************************************************************************************************************************************************************************************

    function cargarOficios() {
        peticionAjax('Pendientes.aspx/GetOficios', "POST", { nombre: idAutenticado },
           function (data) {
               if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                   var JSONR = obtenerArregloDeJSONModificado(data.d.split('-->')[0], false); // Responsable
                   var JSONR1 = obtenerArregloDeJSONModificado(data.d.split('-->')[1], false);// Corresponsable
                   var JSONR2 = obtenerArregloDeJSONModificado(data.d.split('-->')[2], false);// Enterado
                   var JSONR3 = obtenerArregloDeJSONModificado(data.d.split('-->')[3], false);// Enterado
                   $("#divTablaRgulatorio").html(construyeDatosTablaOficios(JSONR, JSONR1, JSONR2, JSONR3));
                   $("#divTablaRgulatorio").css("height", screen.height - 405 + "px");
                   $("#divTablaRgulatorio").css("overflow-x", "scroll");

                   Waiting(false, "Cargando Información...");
               }
               else {
                   alertify.success("No es posible mostrar la información.");
               }
           }, null);
    }

    function construyeDatosTablaOficios(JSONR, JSONR1, JSONR2, JSONR3) {
        var cont = 0;
        var bDato = false;
        var aux = 0;
        var cad = '';

        if (JSONR[0]["ESTATUS"] != "999" || JSONR1[0]["ESTATUS"] != "999" || JSONR2[0]["ESTATUS"] != "999" || JSONR3[0]["ESTATUS"] != "999") {
            cad = ' <table style="width: 100%;" cellpadding="1" cellspacing="0" border="0">';
            cad += '        <tr style="width: 100%;  background-color: rgba(136, 176, 224, 0.45); color:black;  font-weight:400;"  class="tituloTab">';
            cad += '            <td style="width: 5%; text-align:center;">Estatus</td>';
            cad += '            <td style="width: 5%; text-align:center;">Dias atraso</td>';
            cad += '            <td style="width: 5%; text-align:center;">Fecha entrega</td>';
            cad += '            <td style="width: 7%; text-align:center;">No. Serie</td>';
            cad += '            <td style="width: 15%; text-align:center;">Reporte</td>';
            cad += '            <td style="width: 13%; text-align:center;">Responsable seguimiento</td>';
            cad += '            <td style="width: 15%; text-align:center;">Responsable</td>';
            cad += '            <td style="width: 45%; text-align:center;">Comentarios</td>';
            cad += '        </tr>';
            cad += '    </table>';
        }
        else
            cad += ' <br /><br /><br />';

        $("#divTituloContenido").html(cad);

        cad = '';
        cad += '<table id="tblRegulatorioChildren" style="width: 100%;" cellpadding="1" cellspacing="1" border="0">';
 
        JSONR[0]["ESTATUS"] != "999" ? cont = parseInt(JSONR.length) - 1: cont = 0;
        cad += '        <tr style="height:40px; ">';
        cad += '            <td><div style="width: 230px; height:40px; display: table-cell; vertical-align: middle; background-color: rgba(200, 218, 240, 1); color:black; font-weight:400; text-align:left; font-size: 15px;"> &nbsp; &nbsp; &nbsp;<a name="Ofi1" style="text-decoration:none;" id="O1">Atrasados ' + cont + '</a></div></td>';
        cad += '            <td style="background-color:white; text-align:left;"></td>';
        cad += '        </tr>';
        cad += '        <tr><td style="height:10px;"/></tr>';

        if (JSONR[0]["ESTATUS"] != "999") {
            bDato = true;
            for (var ii = 0; ii < JSONR.length - 1; ii++) {
                cad += '   <tr style="width: 100%;">';
                cad += '      <td style="width: 100%;">';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '         <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                                <td id="' + JSONR[ii]["N_OFICIO1"] + '" style="height:25px;       width: 5%; vertical-align:central; text-align:left; "><div id= "div' + JSONR[ii]["N_OFICIO1"] + '" class="divEstatusRojo" style="width:40px; height:18px; " /></td>';
                cad += '                                <td id="' + JSONR[ii]["N_OFICIO1"] + '" style="text-align:center; width: 5%;">' + JSONR[ii]["ESTATUS"] + '</td>';
                cad += '                                <td id="' + JSONR[ii]["N_OFICIO1"] + '" style="text-align:center; width: 5%;">' + JSONR[ii]["F_COMPROMISO"] + '</td>';
                cad += '                                <td id="' + JSONR[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 7%;">' + JSONR[ii]["N_OFICIO"] + '</td>';
                cad += '                                <td id="' + JSONR[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 15%;">' + JSONR[ii]["ASUNTO"] + '</td>';
                cad += '                                <td id="' + JSONR[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 13%;">' + JSONR[ii]["RESPONSABLE"] + '&nbsp&nbsp</td>';
                cad += '                                <td id="' + JSONR[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 15%;">' + JSONR[ii]["CORRESPONSABLE"] + '&nbsp&nbsp</td>';
                cad += '                                <td id="' + JSONR[ii]["N_OFICIO1"].split(' ').join('_') + '" style="cursor: pointer; width: 45%;" align="left" onclick="AbrirComentariosOficios(this, \''
                                                        + JSONR[ii]["N_OFICIO1"] + '\', \'' + JSONR[ii]["ASUNTO"] + '\');" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">' + JSONR[ii]["F_COMENTARIO"]  + "</span> " + ' &nbsp;&nbsp<span style="color:rgba(177, 0, 0, 1);">' + JSONR[ii]["N_COMENTARIO"] + '</span>&nbsp;&nbsp' + JSONR[ii]["U_COMENTARIO"] + '</td>';
                cad += '                          </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;
            }
        }

        $("#Oficio1").html(cont);

        cont = 0;
        JSONR1[0]["ESTATUS"] != "999" ? cont = parseInt(JSONR1.length) - 1 : cont = 0;
        cad += '       <tr style="height:40px; ">';
        cad += '            <td><div style="width: 230px; height:40px; display: table-cell; vertical-align: middle; background-color: rgba(200, 218, 240, 1); color:black; font-weight:400; text-align:left; font-size: 15px;"> &nbsp; &nbsp; &nbsp;<a name="Ofi2" style="text-decoration:none;" id="O2">Entrega hoy ' + cont + '</a></div></td>';
        cad += '            <td style="background-color:white; text-align:left;"></td>';
        cad += '       </tr>';
        cad += '       <tr><td style="height:10px;"/></tr>';

        if (JSONR1[0]["ESTATUS"] != "999") {
            bDato = true;
            for (var ii = 0; ii < JSONR1.length - 1; ii++) {
                cad += '   <tr style="width: 100%;">';
                cad += '      <td style="width: 100%;">';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '         <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                                <td id="' + JSONR1[ii]["N_OFICIO1"] + '" style="height:25px;       width: 5%; vertical-align:central; text-align:left; "><div id= "div' + JSONR1[ii]["N_OFICIO1"] + '" class="divEstatusNaranja" style="width:40px; height:18px; " /></td>';
                cad += '                                <td id="' + JSONR1[ii]["N_OFICIO1"] + '" style="text-align:center; width: 5%;">' + JSONR1[ii]["ESTATUS"] + '</td>';
                cad += '                                <td id="' + JSONR1[ii]["N_OFICIO1"] + '" style="text-align:center; width: 5%;">' + JSONR1[ii]["F_COMPROMISO"] + '</td>';
                cad += '                                <td id="' + JSONR1[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 7%;">' + JSONR1[ii]["N_OFICIO"] + '</td>';
                cad += '                                <td id="' + JSONR1[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 15%;">' + JSONR1[ii]["ASUNTO"] + '</td>';
                cad += '                                <td id="' + JSONR1[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 13%;">' + JSONR1[ii]["RESPONSABLE"] + '&nbsp&nbsp</td>';
                cad += '                                <td id="' + JSONR1[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 15%;">' + JSONR1[ii]["CORRESPONSABLE"] + '&nbsp&nbsp</td>';
                cad += '                                <td id="' + JSONR1[ii]["N_OFICIO1"].split(' ').join('_') + '" style="cursor: pointer; width: 45%;" align="left" onclick="AbrirComentariosOficios(this, \''
                                                         + JSONR1[ii]["N_OFICIO1"] + '\', \'' + JSONR1[ii]["ASUNTO"] + '\');" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">' + JSONR1[ii]["F_COMENTARIO"] + "</span> " + ' &nbsp;&nbsp<span style="color:rgba(177, 0, 0, 1);">' + JSONR1[ii]["N_COMENTARIO"] + '</span>&nbsp;&nbsp' + JSONR1[ii]["U_COMENTARIO"] + '</td>';
                cad += '                          </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;
            }
        }

        $("#Oficio2").html(cont);

        cont = 0;
        JSONR2[0]["ESTATUS"] != "999" ? cont = parseInt(JSONR2.length) -1 : cont = 0;
        JSONR3[0]["ESTATUS"] != "999" ? cont += parseInt(JSONR3.length) -1 : cont += 0;
        cad += '        <tr style="height:40px; ">';
        cad += '            <td><div style="width: 230px; height:40px; display: table-cell; vertical-align: middle; background-color: rgba(200, 218, 240, 1); color:black; font-weight:400; text-align:left; font-size: 15px;"> &nbsp; &nbsp; &nbsp;<a name="Ofi3" style="text-decoration:none;" id="O3">Entrega 7 días ' + cont + '</a></div></td>';
        cad += '            <td style="background-color:white; text-align:left;"></td>';
        cad += '        </tr>';
        cad += '       <tr><td style="height:10px;"/></tr>';

        if (JSONR2[0]["ESTATUS"] != "999") {
            bDato = true;
            for (var ii = 0; ii < JSONR2.length - 1; ii++) {
                cad += '   <tr style="width: 100%;">';
                cad += '      <td style="width: 100%;">';
                cad += '           <div id="dZUpload' + aux + '" class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '         <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                                <td id="' + JSONR2[ii]["N_OFICIO1"] + '" style="height:25px;       width: 5%; vertical-align:central; text-align:left; "><div id= "div' + JSONR2[ii]["N_OFICIO1"] + '" class="divEstatusAmarillo" style="width:40px; height:18px; " /></td>';
                cad += '                                <td id="' + JSONR2[ii]["N_OFICIO1"] + '" style="text-align:center; width: 5%;">' + JSONR2[ii]["ESTATUS"] + '</td>';
                cad += '                                <td id="' + JSONR2[ii]["N_OFICIO1"] + '" style="text-align:center; width: 5%;">' + JSONR2[ii]["F_COMPROMISO"] + '</td>';
                cad += '                                <td id="' + JSONR2[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 7%;">' + JSONR2[ii]["N_OFICIO"] + '</td>';
                cad += '                                <td id="' + JSONR2[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 15%;">' + JSONR2[ii]["ASUNTO"] + '</td>';
                cad += '                                <td id="' + JSONR2[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 13%;">' + JSONR2[ii]["RESPONSABLE"] + '&nbsp&nbsp</td>';
                cad += '                                <td id="' + JSONR2[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 15%;">' + JSONR2[ii]["CORRESPONSABLE"] + '&nbsp&nbsp</td>';
                cad += '                                <td id="' + JSONR2[ii]["N_OFICIO1"].split(' ').join('_') + '" style="cursor: pointer; width: 45%;" align="left" onclick="AbrirComentariosOficios(this, \''
                                                         + JSONR2[ii]["N_OFICIO1"] + '\', \'' + JSONR2[ii]["ASUNTO"] + '\');" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">' + JSONR2[ii]["F_COMENTARIO"] + "</span> " + ' &nbsp;&nbsp<span style="color:rgba(177, 0, 0, 1);">' + JSONR2[ii]["N_COMENTARIO"] + '</span>&nbsp;&nbsp' + JSONR2[ii]["U_COMENTARIO"] + '</td>';
                cad += '                          </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;
            }
        }

        if (JSONR3[0]["ESTATUS"] != "999") {
            bDato = true;
            for (var ii = 0; ii < JSONR3.length - 1; ii++) {
                cad += '   <tr style="width: 100%;">';
                cad += '      <td style="width: 100%;">';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '         <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                                <td id="' + JSONR3[ii]["N_OFICIO1"] + '" style="height:25px;       width: 5%; vertical-align:central; text-align:left; "><div id= "div' + JSONR3[ii]["N_OFICIO1"] + '" class="divEstatusGris" style="width:40px; height:18px; " /></td>';
                cad += '                                <td id="' + JSONR3[ii]["N_OFICIO1"] + '" style="text-align:center; width: 5%;">' + JSONR3[ii]["ESTATUS"] + '</td>';
                cad += '                                <td id="' + JSONR3[ii]["N_OFICIO1"] + '" style="text-align:center; width: 5%;">' + JSONR3[ii]["F_COMPROMISO"] + '</td>';
                cad += '                                <td id="' + JSONR3[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 7%;">' + JSONR3[ii]["N_OFICIO"] + '</td>';
                cad += '                                <td id="' + JSONR3[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 15%;">' + JSONR3[ii]["ASUNTO"] + '</td>';
                cad += '                                <td id="' + JSONR3[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 13%;">' + JSONR3[ii]["RESPONSABLE"] + '&nbsp&nbsp</td>';
                cad += '                                <td id="' + JSONR3[ii]["N_OFICIO1"] + '" style="text-align:left;   width: 15%;">' + JSONR3[ii]["CORRESPONSABLE"] + '&nbsp&nbsp</td>';
                cad += '                                <td id="' + JSONR3[ii]["N_OFICIO1"].split(' ').join('_') + '" style="cursor: pointer; width: 45%;" align="left" onclick="AbrirComentariosOficios(this, \''
                                                         + JSONR3[ii]["N_OFICIO1"] + '\', \'' + JSONR3[ii]["ASUNTO"] + '\');" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">' + JSONR3[ii]["F_COMENTARIO"] + "</span> " + ' &nbsp;&nbsp<span style="color:rgba(177, 0, 0, 1);">' + JSONR3[ii]["N_COMENTARIO"] + '</span>&nbsp;&nbsp' + JSONR3[ii]["U_COMENTARIO"] + '</td>';
                cad += '                          </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;
            }
        }

        $("#Oficio3").html(cont);

        var auxCad = '';
        if (!bDato) {
            auxCad += '<center><br><br><div>';
            auxCad += '<img alt="" height="96" src="../../Images/SicreNet/Pendientes/Informacion.png" ';
            auxCad += 'style="box-sizing: inherit; border: none; margin-top: 1em; display: block; float: none; margin-left: auto; margin-right: auto; color: rgb(51, 51, 51); font-size: 16px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 23.2px; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;" width="96" /><p class="intro center width-70" style="box-sizing: inherit; margin: 0px auto 1em; padding: 0px; font-size: 24px; line-height: 1.3375; font-weight: 300; width: 663.594px; display: block; float: none; color: rgb(51, 51, 51); font-style: normal; font-variant: normal; letter-spacing: normal; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">';
            auxCad += '&nbsp;</p>';
            auxCad += '<p class="intro center width-70" style="box-sizing: inherit; margin: 0px auto 1em; padding: 0px; font-size: 24px; line-height: 1.3375; font-weight: 300; width: 663.594px; display: block; float: none; color: rgb(51, 51, 51); font-family: \'Myriad Set Pro\', \'Lucida Grande\', \'Helvetica Neue\', Helvetica, Arial, Verdana, sans-serif; font-style: normal; font-variant: normal; letter-spacing: normal; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">';
            auxCad += ' Sin Pendientes</p>';
            auxCad += '</td></center>';
        }
        else {
            cad += '</table>';

            cad += ' <script type="text/javascript">';
            cad += ' Dropzone.autoDiscover = false;';

            for (var i = 0; i < aux; i++) {
                cad += ' $(document).ready(function () {';
                cad += '    $("#dZUpload' + i + '").dropzone({';
                cad += '            url: "DragAndDrop.ashx",';
                cad += '            maxFiles: 10,';
                cad += '            addRemoveLinks: true,';
                cad += '        success: function (file, response) {';
                cad += '            validaAlmacenaArchivo_Oficios()';
                cad += '            }, error: function (file, response) {';
                cad += '            MostrarMsj("Ocurrio un error al cargar el archivo", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);';
                cad += '        }';
                cad += '     });';
                cad += ' });';
            }

            cad += ' $(document).ready(function () {';
            cad += '        $("#tblRegulatorioChildren tr td").hover(function () {';
            cad += '            $(this).addClass("hover");';
            cad += '            var status; status += $(this).attr("id");';
            cad += '            $.ajax({';
            cad += '                type: "POST",';
            cad += '                url: "DragAndDrop.ashx",';
            cad += '                data: { nSerie: $(this).attr("id") },';
            cad += '                dataType: "json",';
            cad += '                success: function (response) { }';
            cad += '                });';
            cad += '            }, function () { });';
            cad += '        });';
            cad += ' </script>';

            auxCad = cad;
        }
        return auxCad;
    }

    function validaAlmacenaArchivo_Oficios()
    {
        Waiting(true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/validaAlmacenaArchivo_Oficios', "POST", {},
             function (data) {
                 if (data.d.split('#')[0] == "Subir") {

                     alertify.confirm('Se almacenara el archivo para el oficio:  <b>' + data.d.split('#')[1].split("%")[0].split('+').join(' ') + '</b>, ¿Desea continuar?', function (e) {
                         if (e) {
                             almacenaArchivo_oficios(data.d.split('#')[1].split("%")[0]);
                         }
                         else {
                             Waiting(false, "Cargando Información...");
                         }
                     });
                 }
             }, null);
        Waiting(false, "Cargando Información...");
    }

    function almacenaArchivo_oficios(Datos)
    {
        var param = { sOficio: Datos };

        peticionAjax('Pendientes.aspx/almacenaArchivo_oficios', "POST", param, function (data) {
            if (data.d.split("-")[0] == 'Error') {
                var cad = 'Error en la subida de Archivo. <br/>';
                MostrarMsj(data.d.indexOf("Error") != -1 ? cad : "Error en el Archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 350, 220, null, function () {
                    entroCloseBtnAceptar = true;
                    $("#divVentanaMensajes").dialog("close");
                });
            }
            else {
                var cadena = "#div" + Datos;
                $(cadena).removeClass($(cadena).attr('class'));
                $(cadena).addClass('divEstatusVerde');
                alertify.success("Se agrego el archivo satisfactoriamente.");
            }
        });
    }

    function AbrirComentariosOficios(obj, clave, ddddd) {
        $('#popUpDiv').css('width', parseInt($(window).width()) - 100 + 'px');
        popup('popUpDiv');

        var txt = $(obj).attr("id");
        AbrirComentariosOficios2(txt, obj, clave);
    }

    function AbrirComentariosOficios2(txt, obj, oficio) {
        WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/GetComentariosOficio', "POST", { sOficio: oficio, nResponsable: idAutenticado },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSONModificado(data.d, false);
                        $("#divTblComentarios").html(generaTablaComentariosOficiosDatos(txt, JSON, oficio));
                    }
                    else {
                        $("#divTblComentarios").html(generaTablaComentariosOficios(txt, oficio));
                    }
                }
                else {
                    $("#divVerFichaTecnica").dialog("close");
                    MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
            }, null);
        WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
    }

    function generaTablaComentariosOficiosDatos(txt, JSON, oficio) {
        var cad = ' <div style="width:100%; height:200px;">';
        cad += '      <table width="100%">';
        cad += '         <tr>';
        cad += '             <td class="TituloComentario">&nbsp; &nbsp; Agregar comentarios';
        cad += '             </td>';
        cad += '         </tr>';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <textarea id="TextMessage" name="TextMessage" rows="5" cols="60" lang="aa" style="width: 100%; height: 100px;"></textarea>';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '         <tr>';
        cad += '             <td style="height:28px; vertical-align: left; ">';
        cad += '               <input type="button" value="Agregar" class="classButton" onclick="GuardaComentariosOficios(\'' + txt + '\',\'' + oficio + '\');" style="float: right;" />';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '        <tr>';
        cad += '             <td class="col-Titulo-Comentario"> &nbsp; &nbsp; Comentarios anteriores';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '    </table>'
        cad += '  </div>'
        cad += ' <div style="width:100%; height:240px; overflow-y: scroll;">';
        cad += '    <table width="100%">';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <table style="width:100%; height:100%; font-size: 11px;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                    <tr style="font-size: 11px; text-align:left; color: #3c3b3b; font-weight:600; font-family: Verdana, Geneva, sans-serif;">';
        cad += '                        <td style="height:20px; width:15%;">Fecha</td>';
        cad += '                        <td style="height:20px; width:15%;">Autor del comentario</td>';
        cad += '                        <td style="height:20px; width:70%;">Comentarios</td>';
        cad += '                    </tr>';
        if (JSON[0]["NOMBRE"] != '999') {
            for (var i = 0; i < JSON.length - 1; i++) {
                //cad += i > 0 ? '    <tr style="height:1px;" class="contenidoTab1"><td style="height:1px;"></td><tr colspan="3"></tr>' : '';
                cad += '               <tr class="tdComentariopend">';
                cad += '                    <td style="height:20px; width:15%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(51, 122, 182, 1)">' + JSON[i]["FECHA"] + '</span></td>';
                cad += '                    <td style="height:20px; width:15%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(177, 0, 0, 1);">' + JSON[i]["NOMBRE"] + '</span></td>';
                cad += '                    <td style="height:20px; width:70%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(51, 122, 182, 1)">' + JSON[i]["COMENTARIOS"] + '</span></td>';
                cad += '               </tr>';
            }
        }
        cad += '                 </table>';
        cad += '             </td>';
        cad += '         </tr>';
        cad += '     </table>';
        cad += ' </div>'
        return cad;
    }

    function generaTablaComentariosOficios(txt, oficio) {
        var cad = ' <div style="width:100%; height:160px;">';
        cad += '      <table width="100%">';
        cad += '         <tr>';
        cad += '             <td class="TituloComentario">&nbsp; &nbsp; Agregar comentarios';
        cad += '             </td>';
        cad += '         </tr>';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <textarea id="TextMessage" name="TextMessage" rows="5" cols="60" lang="aa" style="width: 100%; height: 100px;"></textarea>';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '         <tr>';
        cad += '             <td style="height:28px; vertical-align: left; ">';
        cad += '               <input type="button" value="Agregar" class="classButton" onclick="GuardaComentariosOficios(\'' + txt + '\',\'' + oficio + '\');" style="float: right;" />';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '    </table>'
        cad += '  </div>'
        return cad;
    }

    function GuardaComentariosOficios(txt, oficio) {
        WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/InsertaComentariosOficios', "POST", { sOficio: oficio, sComentario: $("#TextMessage").val(), nResponsable: idAutenticado },
           function (data) {
               if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                   var JSON = obtenerArregloDeJSONModificado(data.d, false);
                   $("#" + txt.split(' ').join('_')).html(JSON[0]["Fecha"] + ' ' + $("#TextMessage").val());
                   $("#TextMessage").val('');
                   $("#divTblComentarios").empty();
                   alertify.success("Se agregó un comentario");
                   AbrirComentariosOficios2(txt, "", oficio);
               }
           }, null);
        WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
    }

    //*******************************************************************************************************************************************************************************************
    //*******************************************************************************************************************************************************************************************
    //*******************************************************************************************************************************************************************************************
    //****************************************************************************************** MODULO ACTIVIDADES *****************************************************************************
    //*******************************************************************************************************************************************************************************************
    //*******************************************************************************************************************************************************************************************
    function cargarTablaActividades() {
        peticionAjax('Pendientes.aspx/GetActividades', "POST", { idPais: PaisSelecXUser, Responsable: idAutenticado },
        function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                var JSONR = obtenerArregloDeJSONModificado(data.d.split('-->')[0], false); // 8  No entregado: Rojo
                var JSONR1 = obtenerArregloDeJSONModificado(data.d.split('-->')[1], false);// 7  Hoy se entrega: Naranja
                var JSONR2 = obtenerArregloDeJSONModificado(data.d.split('-->')[2], false);// 6  Mañana se entrega: Amarillo
                var JSONR3 = obtenerArregloDeJSONModificado(data.d.split('-->')[3], false);// 5  Aun no requeridos: Gris
                $("#divTablaRgulatorio").html(construyeDatosTablaActividades(JSONR, JSONR1, JSONR2, JSONR3));
                $("#divTablaRgulatorio").css("height", screen.height - 405 + "px");
                $("#divTablaRgulatorio").css("overflow-x", "scroll");

                Waiting(false, "Cargando Información...");
            }
            else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        }, null);
    }

    function construyeDatosTablaActividades(JSONR, JSONR1, JSONR2, JSONR3) {
        var cont = 0;
        var bDato = false;
        var aux = 0;
        var cad = '';

        if (JSONR[0]["ESTATUS"] != "999" || JSONR1[0]["ESTATUS"] != "999" || JSONR2[0]["ESTATUS"] != "999" || JSONR3[0]["ESTATUS"] != "999") {
            cad = '<table style="width: 100%;" cellpadding="1" cellspacing="0" border="0">';
            cad += '       <tr style="width: 100%;  background-color: rgba(221, 233, 244, 1);"  class="tituloTab">';
            cad += '            <td style="width: 5%; text-align:center;">Estatus</td>';
            cad += '            <td style="width: 5%;  text-align:center;">Fecha de Inicio</td>';
            cad += '            <td style="width: 5%;  text-align:center;">Fecha Comprometida</td>';
            cad += '            <td style="width: 5%;  text-align:center;">Dias de Atraso</td>';
            cad += '            <td style="width: 5%; text-align:center;">Clave</td>';
            cad += '            <td style="width: 15%; text-align:center;">Actividad</td>';
            cad += '            <td style="width: 15%; text-align:center;">Responsable</td>';
            cad += '            <td style="width: 15%; text-align:center;">Corresponsable</td>';
            cad += '            <td style="width: 30%; text-align:center;">Comentario</td>';
            cad += '      </tr>';
            cad += '   </table>';
        }
        else
            cad += ' <br /><br /><br />';

        $("#divTituloContenido").html(cad);

        cad = '<table style="width: 100%;" id="tblRegulatorioChildren" cellpadding="1" cellspacing="0" border="0">';

        JSONR[0]["ESTATUS"] != "999" ? cont = parseInt(JSONR.length) - 1 : cont = 0;
        cad += '        <tr style="height:40px;" >';
        cad += '            <td><div style="width:230px; height:40px; display: table-cell; vertical-align: middle; background-color: rgba(221, 233, 244, 1); color: black; text-align:left; font-size: 15px;"> &nbsp; &nbsp; &nbsp;<a name="Act1" style="text-decoration:none;" id="A1">Atrasados ' + cont + '</a></div></td>';
        cad += '            <td style="background-color:white; text-align:left;"></td>';
        cad += '        </tr>';
        cad += '        <tr><td style="height:10px;"/></tr>';

        if (JSONR[0]["ESTATUS"] != "999") {
            bDato = true;
            for (var ii = 0; ii < JSONR.length - 1; ii++) {
                cad += '   <tr style="width: 100%;">';
                cad += '      <td style="width: 100%;">';
                cad += '           <div id="dZUpload' + aux + '" class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '         <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                            <td id="' + JSONR[ii]["Clave"] + '" style="height:25px;       width: 5%; vertical-align:central; text-align:center; "><div id="div' + JSONR[ii]["Clave"] + '" class="divEstatusRojo" style="width:40px; height:18px; " /></td>';
                cad += '                            <td id="' + JSONR[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR[ii]["Fecha Inicio"] + '</td>';
                cad += '                            <td id="' + JSONR[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR[ii]["Fecha Compromiso"] + '</td>';
                cad += '                            <td id="' + JSONR[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR[ii]["Dias Atraso"] + '</td>';
                cad += '                            <td id="' + JSONR[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR[ii]["Clave"] + '</td>';
                cad += '                            <td id="' + JSONR[ii]["Clave"] + '" style="text-align:left;   width: 15%;">' + JSONR[ii]["Actividad"] + '</td>';
                cad += '                            <td id="' + JSONR[ii]["Clave"] + '" style="text-align:left;   width: 15%;" >' + JSONR[ii]["Responsable"] + '</td>';
                cad += '                            <td id="' + JSONR[ii]["Clave"] + '" style="text-align:left;   width: 15%;">' + JSONR[ii]["Corresponsable"] + '</td>';
                cad += '                            <td id="' + JSONR[ii]["Clave"] + '" style="cursor: pointer; width: 30%;" align="left" onclick="AbrirComentariosActividades(this, ' + JSONR[ii]["Clave"]
                                                    + '\);" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">'
                                                    + (JSONR[ii]["Ultimo Comentario"] != "" ? JSONR[ii]["F_Comentario"] : "") + "</span> " + ' &nbsp;&nbsp<span style="color:rgba(177, 0, 0, 1);">' + JSONR[ii]["N_COMENTARIO"] + '</span>&nbsp;&nbsp' + JSONR[ii]["Ultimo Comentario"] + '</td>';
                cad += '                          </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;
            }
        }
        $("#entregaAct1").html(cont);

        JSONR1[0]["ESTATUS"] != "999" ? cont = parseInt(JSONR1.length) - 1: cont = 0;
        cad += '        <tr style="height:40px; ">';
        cad += '            <td><div style="width:230px; height:40px; display: table-cell; vertical-align: middle; background-color: rgba(221, 233, 244, 1); color: black; text-align:left; font-size: 15px;"> &nbsp; &nbsp; &nbsp;<a name="Act2" style="text-decoration:none;" id="A2">Entrega hoy ' + cont + '</a></div></td>';
        cad += '            <td style="background-color:white; text-align:left;"></td>';
        cad += '        </tr>';
        cad += '        <tr><td style="height:10px;"/></tr>';

        if (JSONR1[0]["ESTATUS"] != "999") {
            bDato = true;
            for (var ii = 0; ii < JSONR1.length - 1; ii++) {
                cad += '   <tr  style="width: 100%;">';
                cad += '      <td  style="width: 100%;">';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table  style="width: 100%;">';
                cad += (ii % 2 == 0) ? '         <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                            <td id="' + JSONR1[ii]["Clave"] + '" style="height:25px; width: 110px; vertical-align:central; text-align:center; "><div id="div' + JSONR1[ii]["Clave"] + '" class="divEstatusNaranja" style="width:40px; height:18px; " /></td>';
                cad += '                            <td id="' + JSONR1[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR1[ii]["Fecha Inicio"] + '</td>';
                cad += '                            <td id="' + JSONR1[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR1[ii]["Fecha Compromiso"] + '</td>';
                cad += '                            <td id="' + JSONR1[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR1[ii]["Dias Atraso"] + '</td>';
                cad += '                            <td id="' + JSONR1[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR1[ii]["Clave"] + '</td>';
                cad += '                            <td id="' + JSONR1[ii]["Clave"] + '" style="text-align:left;   width: 15%;">' + JSONR1[ii]["Actividad"] + '</td>';
                cad += '                            <td id="' + JSONR1[ii]["Clave"] + '" style="text-align:left;   width: 15%;" >' + JSONR1[ii]["Responsable"] + '</td>';
                cad += '                            <td id="' + JSONR1[ii]["Clave"] + '" style="text-align:left;   width: 15%;">' + JSONR1[ii]["Corresponsable"] + '</td>';
                cad += '                            <td id="' + ii + '_' + JSONR1[ii]["Clave"] + '" style="cursor: pointer; width: 30%;" align="left" onclick="AbrirComentariosActividades(this, ' + JSONR1[ii]["Clave"]
                                                    + '\);" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">'
                                                    + (JSONR1[ii]["Ultimo Comentario"] != "" ? JSONR1[ii]["F_Comentario"] : "") + "</span> " + ' &nbsp;<span style="color:rgba(87, 90, 97, 1);">' + JSONR1[ii]["N_COMENTARIO"] + '</span>&nbsp;' + JSONR1[ii]["Ultimo Comentario"] + '</td>';
                cad += '                          </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;
            }
        }
        $("#entregaAct2").html(cont);

        JSONR2[0]["ESTATUS"] != "999" ? cont = parseInt(JSONR2.length) - 1 : cont = 0;
        JSONR3[0]["ESTATUS"] != "999" ? cont += parseInt(JSONR3.length) - 1 : cont += 0;
        cad += '        <tr style="height:40px; ">';
        cad += '            <td><div style="width:230px; height:40px; display: table-cell; vertical-align: middle; background-color: rgba(221, 233, 244, 1); color: black; text-align:left; font-size: 15px;">  &nbsp; &nbsp; &nbsp;<a name="Act3" style="text-decoration:none;" id="A3">Entrega 7 dias ' + cont + '</a></div></td>';
        cad += '            <td style="background-color:white; text-align:left;"></td>';
        cad += '        </tr>';
        cad += '        <tr><td style="height:10px;"/></tr>';

        if (JSONR2[0]["ESTATUS"] != "999") {
            bDato = true;
            for (var ii = 0; ii < JSONR2.length - 1; ii++) {
                cad += '   <tr  style="width: 100%;">';
                cad += '      <td style="width: 100%;">';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '         <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                            <td id="' + JSONR2[ii]["Clave"] + '" style="height:25px; width: 110px; vertical-align:central; text-align:center; "><div id="div' + JSONR2[ii]["Clave"] + '" class="divEstatusAmarillo" style="width:40px; height:18px; " /></td>';
                cad += '                            <td id="' + JSONR2[ii]["Clave"] + '" style="text-align:center; width: 5%;"> ' + JSONR2[ii]["Fecha Inicio"] + '</td>';
                cad += '                            <td id="' + JSONR2[ii]["Clave"] + '" style="text-align:center; width: 5%;"> ' + JSONR2[ii]["Fecha Compromiso"] + '</td>';
                cad += '                            <td id="' + JSONR2[ii]["Clave"] + '" style="text-align:center; width: 5%;"> ' + JSONR2[ii]["Dias Atraso"] + '</td>';
                cad += '                            <td id="' + JSONR2[ii]["Clave"] + '" style="text-align:center; width: 5%;"> ' + JSONR2[ii]["Clave"] + '</td>';
                cad += '                            <td id="' + JSONR2[ii]["Clave"] + '" style="text-align:left;   width: 15%;">' + JSONR2[ii]["Actividad"] + '</td>';
                cad += '                            <td id="' + JSONR2[ii]["Clave"] + '" style="text-align:left;   width: 15%;">' + JSONR2[ii]["Responsable"] + '</td>';
                cad += '                            <td id="' + JSONR2[ii]["Clave"] + '" style="text-align:left;   width: 15%;">' + JSONR2[ii]["Corresponsable"] + '</td>';
                cad += '                            <td id="' + JSONR2[ii]["Clave"] + '" style="cursor: pointer; width: 30%;" align="left" onclick="AbrirComentariosActividades(this, ' + JSONR2[ii]["Clave"]
                                                    + '\);" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">'
                                                    + (JSONR2[ii]["Ultimo Comentario"] != "" ? JSONR2[ii]["F_Comentario"] : "") + "</span> " + ' &nbsp;<span style="color:rgba(87, 90, 97, 1);">' + JSONR2[ii]["N_COMENTARIO"] + '</span>&nbsp;' + JSONR2[ii]["Ultimo Comentario"] + '</td>';
                cad += '                          </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;
            }
        }

        if (JSONR3[0]["ESTATUS"] != "999") {
            bDato = true;
            for (var ii = 0; ii < JSONR3.length - 1; ii++) {
                cad += '   <tr style="width: 100%;">';
                cad += '      <td style="width: 100%;" colspan = "9">';
                cad += '           <div id="dZUpload' + aux + '"  class="dropzone" >';
                cad += '               <div class="dz-default dz-message">';
                cad += '                    <table style="width: 100%;">';
                cad += (ii % 2 == 0) ? '         <tr style="width: 100%;"  class="contenidoTab1">' : '<tr style="width: 100%;" class="contenidoTab2">';
                cad += '                            <td id="' + JSONR3[ii]["Clave"] + '" style="height:25px; width: 110px; vertical-align:central; text-align:center; "><div id="div' + JSONR3[ii]["Clave"] + '" class="divEstatusGris" style="width:40px; height:18px; " /></td>';
                cad += '                            <td id="' + JSONR3[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR3[ii]["Fecha Inicio"] + '</td>';
                cad += '                            <td id="' + JSONR3[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR3[ii]["Fecha Compromiso"] + '</td>';
                cad += '                            <td id="' + JSONR3[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR3[ii]["Dias Atraso"] + '</td>';
                cad += '                            <td id="' + JSONR3[ii]["Clave"] + '" style="text-align:center; width: 5%;">' + JSONR3[ii]["Clave"] + '</td>';
                cad += '                            <td id="' + JSONR3[ii]["Clave"] + '" style="text-align:left;   width: 15%;">' + JSONR3[ii]["Actividad"] + '</td>';
                cad += '                            <td id="' + JSONR3[ii]["Clave"] + '" style="text-align:left;   width: 15%;" >' + JSONR3[ii]["Responsable"] + '</td>';
                cad += '                            <td id="' + JSONR3[ii]["Clave"] + '" style="text-align:left;   width: 15%;">' + JSONR3[ii]["Corresponsable"] + '</td>';
                cad += '                            <td id="' + JSONR3[ii]["Clave"] + '" style="cursor: pointer; width: 30%;" align="left" onclick="AbrirComentariosActividades(this, ' + JSONR3[ii]["Clave"]
                                                    + '\);" style="text-align:justify;" class="celltrunc"><span style="color:rgba(51, 122, 182, 1)">'
                                                    + (JSONR3[ii]["Ultimo Comentario"] != "" ? JSONR3[ii]["F_Comentario"] : "") + "</span> " + ' &nbsp;<span style="color:rgba(87, 90, 97, 1);">' + JSONR3[ii]["N_COMENTARIO"] + '</span>&nbsp;' + JSONR3[ii]["Ultimo Comentario"] + '</td>';
                cad += '                          </tr>';
                cad += '                    </table>';
                cad += '                </div>';
                cad += '           </div>';
                cad += '      </td>';
                cad += '</tr>';
                aux += 1;
            }
        }
        $("#entregaAct3").html(cont);

        var auxCad = '';
        if (!bDato) {
            auxCad += '<center><br><br><div>';
            auxCad += '<img alt="" height="96" src="../../Images/SicreNet/Pendientes/Informacion.png" ';
            auxCad += 'style="box-sizing: inherit; border: none; margin-top: 1em; display: block; float: none; margin-left: auto; margin-right: auto; color: rgb(51, 51, 51); font-size: 16px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; line-height: 23.2px; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;" width="96" /><p class="intro center width-70" style="box-sizing: inherit; margin: 0px auto 1em; padding: 0px; font-size: 24px; line-height: 1.3375; font-weight: 300; width: 663.594px; display: block; float: none; color: rgb(51, 51, 51); font-style: normal; font-variant: normal; letter-spacing: normal; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">';
            auxCad += '&nbsp;</p>';
            auxCad += '<p class="intro center width-70" style="box-sizing: inherit; margin: 0px auto 1em; padding: 0px; font-size: 24px; line-height: 1.3375; font-weight: 300; width: 663.594px; display: block; float: none; color: rgb(51, 51, 51); font-family: \'Myriad Set Pro\', \'Lucida Grande\', \'Helvetica Neue\', Helvetica, Arial, Verdana, sans-serif; font-style: normal; font-variant: normal; letter-spacing: normal; orphans: auto; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">';
            auxCad += ' Sin Pendientes</p>';
            auxCad += '</td></center>';
        }
        else {
            cad += '</table>';
            cad += ' <script type="text/javascript">';
            cad += ' Dropzone.autoDiscover = false;';

            for (var i = 0; i < aux; i++) {
                cad += ' $(document).ready(function () {';
                cad += '    $("#dZUpload' + i + '").dropzone({';
                cad += '            url: "DragAndDrop.ashx",';
                cad += '            maxFiles: 10,';
                cad += '            addRemoveLinks: true,';
                cad += '        success: function (file, response) {';
                cad += '            validaAlmacenaArchivo_Actividades()';
                cad += '            }, error: function (file, response) {';
                cad += '            MostrarMsj("Ocurrio un error al cargar el archivo", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);';
                cad += '        }';
                cad += '     });';
                cad += ' });';
            }

            cad += ' $(document).ready(function () {';
            cad += '        $("#tblRegulatorioChildren tr td").hover(function () {';
            cad += '            $(this).addClass("hover");';
            cad += '            var status; status += $(this).attr("id");';
            cad += '            $.ajax({';
            cad += '                type: "POST",';
            cad += '                url: "DragAndDrop.ashx",';
            cad += '                data: { nSerie: $(this).attr("id") },';
            cad += '                dataType: "json",';
            cad += '                success: function (response) { }';
            cad += '                });';
            cad += '            }, function () { });';
            cad += '        });';
            cad += ' </script>';

            auxCad = cad;
        }

        return auxCad;
    }

    function validaAlmacenaArchivo_Actividades() {
        Waiting(true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/validaAlmacenaArchivo_Actividades', "POST", {},
             function (data) {
                 if (data.d.split('#')[0] == "Subir") {

                     alertify.confirm('Se almacenara el archivo para la actividad:  <b>' + data.d.split('#')[1].split("%")[0] + '</b>, ¿Desea continuar?', function (e) {
                         if (e) {
                             almacenaArchivo_Actividades(data.d.split('#')[1].split("%")[0]);
                         }
                         else {
                             Waiting(false, "Cargando Información...");
                         }
                     });
                 }
             }, null);
        Waiting(false, "Cargando Información...");
    }

    function almacenaArchivo_Actividades(Datos) {
        var param = { iActividad: parseInt(Datos) };

        peticionAjax('Pendientes.aspx/almacenaArchivo_Actividades', "POST", param, function (data) {
            if (data.d.split("-")[0] == 'Error') {
                var cad = 'Error en la subida de Archivo. <br/>';
                MostrarMsj(data.d.indexOf("Error") != -1 ? cad : "Error en el Archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 350, 220, null, function () {
                    entroCloseBtnAceptar = true;
                    $("#divVentanaMensajes").dialog("close");
                });
            }
            else {
                var cadena = "#div" + Datos;
                $(cadena).removeClass($(cadena).attr('class'));
                $(cadena).addClass('divEstatusVerde');
                alertify.success("Se agrego el archivo satisfactoriamente.");
            }
        });
    }

    function AbrirComentariosActividades(obj, clave) {
        $('#popUpDiv').css('width', parseInt($(window).width()) - 100 + 'px');
        popup('popUpDiv');

        var txt = $(obj).attr("id");
        AbrirComentariosActividades2(txt, obj, clave);
    }

    function AbrirComentariosActividades2(txt, obj, clave) {
        WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/GetPendientesActividadesComentarios', "POST", { iClave: clave },
            function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    if (data.d != "") {
                        var JSON = obtenerArregloDeJSONModificado(data.d, false);
                        $("#divTblComentarios").html(generaTablaComentariosActividadesDatos(txt, JSON, clave));
                    }
                    else {
                        $("#divTblComentarios").html(generaTablaComentariosActividades(txt, clave));
                    }
                }
                else {
                    $("#divVerFichaTecnica").dialog("close");
                    MostrarMsj(data.d.split(":")[1], "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
            }, null);
        WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
    }

    function generaTablaComentariosActividadesDatos(txt, JSON, clave) {
        var cad = ' <div style="width:100%; height:200px;">';
        cad += '      <table width="100%">';
        cad += '         <tr>';
        cad += '             <td class="TituloComentario">&nbsp; &nbsp; Agregar comentarios </td>';
        cad += '         </tr>';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <textarea id="TextMessage" name="TextMessage" rows="5" cols="60" lang="aa" style="width: 100%; height: 100px;"></textarea>';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '         <tr>';
        cad += '             <td style="height:28px; vertical-align: left; ">';
        cad += '               <input type="button" value="Agregar" class="classButton" onclick="GuardaComentariosActividades(\'' + txt + '\', ' + clave + ');" style="float: right;" />';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '        <tr>';
        cad += '             <td class="col-Titulo-Comentario"> &nbsp; &nbsp; Comentarios anteriores';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '    </table>'
        cad += '  </div>'
        //cad += ' <br /><br /><br />'
        cad += ' <div style="width:100%; height:240px; overflow-y: scroll;">';
        cad += '    <table width="100%">';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <table style="width:100%; height:100%; font-size: 11px;" cellpadding="1" cellspacing="1" border="0">';
        cad += '                    <tr style="font-size: 11px; text-align:left; color: #3c3b3b; font-weight:600; font-family: Verdana, Geneva, sans-serif;">';
        cad += '                        <td style="height:20px; width:15%;">Fecha</td>';
        cad += '                        <td style="height:20px; width:15%;">Autor del comentario</td>';
        cad += '                        <td style="height:20px; width:70%;">Comentarios</td>';
        cad += '                    </tr>';
        for (var i = 0; i < JSON.length - 1; i++) {
            //cad += i > 0 ? '        <tr style="height:1px;" class="contenidoTab1"><td style="height:1px;" colspan="3"></tr>' : '';
            cad += '                <tr class="tdComentariopend">';
            cad += '                    <td style="height:20px; width:15%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(51, 122, 182, 1)">' + JSON[i]["FECHAINGRESO"] + '</span></td>';
            cad += '                    <td style="height:20px; width:15%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(177, 0, 0, 1);">' + JSON[i]["NOMBRE"] + '</span></td>';
            cad += '                    <td style="height:20px; width:70%; border-bottom: 1px solid rgba(213, 213, 213, 1); "><span style="color:rgba(51, 122, 182, 1)">' + JSON[i]["COMENTARIOS"] + '</span></td>';
            cad += '                </tr>';
        }
        cad += '                 </table>';
        cad += '             </td>';
        cad += '         </tr>';
        cad += '     </table>';
        cad += ' </div>'
        return cad;
    }

    function generaTablaComentariosActividades(txt, clave) {
        var cad = ' <div style="width:100%; height:160px;">';
        cad += '      <table width="100%">';
        cad += '         <tr>';
        cad += '             <td class="TituloComentario">&nbsp; &nbsp; Agregar comentarios </td>';
        cad += '         </tr>';
        cad += '         <tr>';
        cad += '             <td>';
        cad += '                 <textarea id="TextMessage" name="TextMessage" rows="5" cols="60" lang="aa" style="width: 100%; height: 100px;"></textarea>';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '         <tr>';
        cad += '             <td style="height:28px; vertical-align: left; ">';
        cad += '               <input type="button" value="Agregar" class="classButton" onclick="GuardaComentariosActividades(\'' + txt + '\', ' + clave + ');" style="float: right;" />';
        cad += '             </td>';
        cad += '        </tr>';
        cad += '    </table>'
        cad += '  </div>'
        return cad;
    }

    function GuardaComentariosActividades(txt, clave) {
        WaitingVtn("divBloqVtnFichaTecnica", true, true, "Cargando Información...");
        peticionAjax('Pendientes.aspx/InsertaComentariosActividades', "POST", { iClave: clave, sComentario: $("#TextMessage").val(), Responsable: parseInt(idAutenticado) },
           function (data) {
               if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                   var JSON = obtenerArregloDeJSONModificado(data.d, false);
                   $("#" + txt).html(JSON[0]["Fecha"] + ' ' + $("#TextMessage").val());
                   $("#TextMessage").val('');
                   $("#divTblComentarios").empty();
                   alertify.success("Se agregó un comentario");
                   AbrirComentariosActividades2(txt, "", clave);
               }
           }, null);
        WaitingVtn("divBloqVtnFichaTecnica", false, false, "Cargando Información...");
    }

    //*******************************************************************************************************************************************************************************************
    //*******************************************************************************************************************************************************************************************
    //*******************************************************************************************************************************************************************************************

 