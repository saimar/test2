$(document).ready(function () {
    $("#s4").dropdownchecklist({ icon: { placement: 'right' }, maxDropHeight: 150, width: 200 });
    $(document.getElementById("s4").nextElementSibling.nextElementSibling.nextElementSibling).hide();

    $($("#ddcl-s4").children()[0]).click(function (event) {
        document.getElementById("ddcl-s4-ddw") != null ? document.getElementById("ddcl-s4-ddw").style.visibility = "visible" : null;
    });

    $("#shadows").scroll(function () {
        document.getElementById("ddcl-s4-ddw") != null ? document.getElementById("ddcl-s4-ddw").style.visibility = "collapse" : null;
    });
});

var esCargarInicial = true;
var Meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
function CargarInicial() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    txtMostrarEncabezadoCheckDropDonwList();
    CargarReportes();
}
function CargarReportes() {
    peticionAjax("Reporte8C.aspx/GetReportesXPerfil", "POST", null, function (data) {
        if (data.d.indexOf("ErrorCATCH") == -1 && data.d != "") {
            var Datos = obtenerArregloDeJSON(data.d, false);
            document.getElementById("sltReportesXPerfil").options.length = 0;
            for (var i = 0; i < Datos.length; i++) {
                var Item = Datos[i];
                var opcion = new Option(Item.FVCNombreReporte, Item.FIIdReporte);
                document.getElementById("sltReportesXPerfil").options[document.getElementById("sltReportesXPerfil").options.length] = opcion;
                document.getElementById("sltReportesXPerfil").options[document.getElementById("sltReportesXPerfil").options.length - 1].title = Item.FVCNombreReporte;
            }
        }
        else {
            MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
        CargarSltMesAño();
    });
}

function CargarSltMesAño() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Reporte8C.aspx/cargarReportes", "POST", { val: $("#sltTipoConsulta").val() }, function (data) {
        if (data.d.indexOf("ErrorCATCH") == -1 && data.d != "") {
            var anoActual = parseInt(data.d.split('%%&&')[1]);
            var semanaPasada = parseInt(data.d.split('%%&&')[0]) - 1;
            var mesActual = parseInt(data.d.split('%%&&')[2]) - 1;

            if ($("#sltAnio").val() < anoActual && $("#sltAnio").val() != null) {
                if ($("#sltTipoConsulta").val() == "0") semanaPasada = 52;
                else mesActual = 12;
            }

            if ($("#sltTipoConsulta").val() == "0") {
                document.getElementById("sltMes").options.length = 0;
                for (var i = 1; i < semanaPasada + 1; i++) {
                    var opcion = new Option(i, i);
                    document.getElementById("sltMes").options[document.getElementById("sltMes").options.length] = opcion;
                    document.getElementById("sltMes").options[document.getElementById("sltMes").options.length - 1].title = i;
                }
            }
            else if ($("#sltTipoConsulta").val() == "1") {
                document.getElementById("sltMes").options.length = 0;
                for (var i = 0; i < mesActual; i++) {
                    var opcion = new Option(Meses[i], i + 1);
                    document.getElementById("sltMes").options[document.getElementById("sltMes").options.length] = opcion;
                    document.getElementById("sltMes").options[document.getElementById("sltMes").options.length - 1].title = i + 1;
                }
            }

            if (esCargarInicial) {
                document.getElementById("sltAnio").options.length = 0;
                for (var i = 2012; i <= anoActual; i++) {
                    var opcion = new Option(i, i);
                    document.getElementById("sltAnio").options[document.getElementById("sltAnio").options.length] = opcion;
                    document.getElementById("sltAnio").options[document.getElementById("sltAnio").options.length - 1].title = i;
                }
            }
            if ($("#sltAnio").val() == anoActual || esCargarInicial) {
                if ($("#sltTipoConsulta").val() == "0") $("#sltMes").val(semanaPasada);
                else $("#sltMes").val(mesActual);
                $("#sltAnio").val(anoActual);
                esCargarInicial = false;
            }
        }
        else if (data.d.indexOf("ErrorCATCH") != -1)
            MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

var arrayMostrar;
function txtMostrarEncabezadoCheckDropDonwList() {
    var cont = 0;
    arrayMostrar = new Array();
    for (var i = 0; i < $(document.getElementById("s4").nextElementSibling.nextElementSibling).children()[0].children.length; i++) {
        if ($($($(document.getElementById("s4").nextElementSibling.nextElementSibling).children()[0].children[i]).find('input:checkbox')[0]).is(':checked')) {
            arrayMostrar[cont] = i;
            cont++;
        }
    }
    if (cont == 0) $($($("#ddcl-s4").children()[0]).children()[1]).html('Seleccione una opción');
    return cont;
}

var mostrarGen = 0;
var Datos = null;

var colorniv1 = '#8FBC8F';
var colorniv2 = '#FFFFDF';
var colorniv3 = '#DDFFBF';
var colorniv4 = '#FFFFFF';
var colorniv5 = '#ECFFDF';
var colorniv6 = '#FFF9EA';

var colSA2;
var colMA2;
var colTA2;
var colAA2;
var nomcol;
var columGen = '7%';

function tamañosColumnas() {
    if (mostrarGen == 1) {
        colSA2 = '11%';
        colMA2 = '11%';
        colTA2 = '11%';
        colAA2 = '11%';
        nomcol = '21%';
    }

    if (mostrarGen == 2) {
        colSA2 = '12%';
        colMA2 = '12%';
        colTA2 = '12%';
        colAA2 = '12%';
        nomcol = '17%';
    }
    if (mostrarGen == 3) {
        colSA2 = '13%';
        colMA2 = '13%';
        colTA2 = '13%';
        colAA2 = '13%';
        nomcol = '13%';
    }
}

var mostrar;
function btnVerReporte_Click() {
    document.getElementById("ddcl-s4").style.borderColor = "transparent";
    mostrarGen = txtMostrarEncabezadoCheckDropDonwList();
    tamañosColumnas();
    if (mostrarGen > 0) {
        mostrar = '0';
        Waiting(true, "Espere por favor. Cargando Información...");
        SicreNet.SicreNet.Rep8Columnas.Reporte8C.btnVerReporte_Click($("#sltReportesXPerfil").val(), $("#selectCifras").val(),
        $("#selectCifrasEn").val(), $("#selectMostrarPor").val(), mostrar, $("#sltTipoConsulta").val(), $("#sltMes").val(), $("#sltAnio").val(),
        function (response) {
            if (response.value.indexOf("ErrorCATCH") == -1 && response.value != "" && response.value.indexOf("SIN DATOS") == -1) {
                Datos = obtenerArregloDeJSON(response.value.split('%%&&')[0], false);
                var Name = Datos[0];
                var nomConcep = $("#selectMostrarPor :selected").text();
                var HTML = '';
                HTML = '<table style="width:100%;" cellpadding="0" cellspacing="0" class="data8c">';
                HTML += '<tr>';
                HTML += '<th colspan="10" height ="18px" style="background:#003300;  color:white; ">' + 'REPORTE: ' + Name.NomReporte.toUpperCase() + '</th>';
                HTML += '</tr>';
                HTML += '<tr>';
                HTML += '<th >AÑO <br />ANTERIOR<br />' + Name.HAñoAnt + '</th>';
                HTML += '<th >TRIMESTRE <br />ANTERIOR<br />' + Name.HTriAnt + '</th>';
                HTML += '<th >MES <br />ANTERIOR<br />' + Name.HMesAnt + '</th>';
                //                        HTML += '<th >'+Name.NomTab.toUpperCase()+'<br />'+Name.HSemAnt+'</th>';
                HTML += '<th >SEMANA <br />ANTERIOR<br />' + Name.HSemAnt + '</th>';
                HTML += '<th >FECHA <br />ACTUAL<br />' + Name.HFecAct + '</th>';
                HTML += '<th >CONCEPTO<br /><br />' + nomConcep.toUpperCase() + '</th>';
                //                        HTML += '<th >'+Name.NomTab.toUpperCase()+'<br />'+Name.HSemAnt+'</th>';	
                HTML += '<th >SEMANA <br />ANTERIOR<br />' + Name.HSemAnt + '</th>';
                HTML += '<th >MES <br />ANTERIOR<br />' + Name.HMesAnt + '</th>';
                HTML += '<th >TRIMESTRE <br />ANTERIOR<br />' + Name.HTriAnt + '</th>';
                HTML += '<th >AÑO <br />ANTERIOR<br />' + Name.HAñoAnt + '</th>';
                HTML += '</tr>';


                var AnioAnterior = 0;
                var TrimestreAnterior = 0;
                var MesAnterior = 0;
                var SemanaActual = 0;
                var FechaActual = 0;
                var SemanaAnterior = 0;
                var MesAnterior2 = 0;
                var TrimestreAnterior2 = 0;
                var AnioAnterior2 = 0;

                var Carteras = new Array();

                for (var i = 0; i < Datos.length; i++) {
                    var Dato = Datos[i];

                    AnioAnterior += parseFloat(Dato.AnioAnterior);
                    TrimestreAnterior += parseFloat(Dato.TrimestreAnterior);
                    MesAnterior += parseFloat(Dato.MesAnterior);
                    SemanaActual += parseFloat(Dato.SemanaActual);
                    FechaActual += parseFloat(Dato.FechaActual);

                    if (Carteras.indexOf(Dato.Cartera) == -1)
                        Carteras.push(Dato.Cartera);
                }

                mostrar = '0';
                SemanaAnterior = Mostrar(FechaActual, SemanaActual); // (FechaActual - SemanaActual)/SemanaActual;
                MesAnterior2 = Mostrar(FechaActual, MesAnterior); //(FechaActual - MesAnterior)/MesAnterior;
                TrimestreAnterior2 = Mostrar(FechaActual, TrimestreAnterior); //(FechaActual - TrimestreAnterior)/TrimestreAnterior;
                AnioAnterior2 = Mostrar(FechaActual, AnioAnterior); //(FechaActual - AnioAnterior)/AnioAnterior;
                arrayGen = new Array();
                for (var indiceCarteras = 0; indiceCarteras < Carteras.length; indiceCarteras++) {
                    HTML += resumenPorCartera(Carteras[indiceCarteras]);
                }

                mostrar = '2';
                SemAntVP = Mostrar(FechaActual, SemanaActual);
                MesAntVP = Mostrar(FechaActual, MesAnterior);
                TriAntVP = Mostrar(FechaActual, AnioAnterior);
                AniAntVP = Mostrar(FechaActual, AnioAnterior);

                mostrar = '1';
                SemAntVM = Mostrar(FechaActual, SemanaActual);
                MesAntVM = Mostrar(FechaActual, MesAnterior);
                TriAntVM = Mostrar(FechaActual, AnioAnterior);
                AniAntVM = Mostrar(FechaActual, AnioAnterior);

                HTML += '<tr  title="Total" style="background:#C0C0C0;">';

                HTML += '<td width="' + columGen + '" style="text-align:right; background:#C0C0C0; font-size:9px;">';
                HTML += formato(AnioAnterior);
                HTML += '</td>';

                HTML += '<td width="' + columGen + '" style="text-align:right; background:#C0C0C0; font-size:9px;">';
                HTML += formato(TrimestreAnterior);
                HTML += '</td>';

                HTML += '<td width="' + columGen + '" style="text-align:right; background:#C0C0C0; font-size:9px;">';
                HTML += formato(MesAnterior);
                HTML += '</td>';

                HTML += '<td width="' + columGen + '" style="text-align:right; background:#C0C0C0; font-size:9px;">';
                HTML += formato(SemanaActual);
                HTML += '</td>';

                HTML += '<td width="' + columGen + '" style="text-align:right; background:#C0C0C0; font-size:9px;">';
                HTML += formato(FechaActual);
                HTML += '</td>';

                HTML += '<td width="' + nomcol + '" style="padding-left:6px; text-align:left; background:#C0C0C0; font-weight: bold; font-size:10px;">';
                HTML += 'TOTAL GENERAL';
                HTML += '</td>';

                HTML += '<td width="' + colSA2 + '" style="text-align:right; background:#b5b5b5;">';
                HTML += valor(SemanaAnterior, SemAntVM, SemAntVP, '#C0C0C0');
                HTML += '</td>';

                HTML += '<td width="' + colMA2 + '" style="text-align:right; background:#b5b5b5;">';
                HTML += valor(MesAnterior2, MesAntVM, MesAntVP, '#C0C0C0');
                HTML += '</td>';

                HTML += '<td width="' + colTA2 + '" style="text-align:right; background:#b5b5b5;">';
                HTML += valor(TrimestreAnterior2, TriAntVM, TriAntVP, '#C0C0C0');
                HTML += '</td>';

                HTML += '<td width="' + colAA2 + '" style="text-align:right; background:#b5b5b5;">';
                HTML += valor(AnioAnterior2, AniAntVM, AniAntVP, '#C0C0C0');
                HTML += '</td>';

                HTML += '</tr>';

                HTML += '</table>';

                $('#divReporteFinal').html(HTML);
                mostrarGrafica(arrayGen, 'Cartera', $("#selectCifrasEn").val(), 'Todas las Carteras');
                mostrarFilas2('Grafica', 'block');
            }
            else {
                if (response.value.indexOf("ErrorCATCH") != -1)
                    MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
                else if (response.value.indexOf("SIN DATOS") != -1)
                    MostrarMsj("Sin Datos", " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        });
    }
    else {
        document.getElementById("ddcl-s4").style.border = "thin solid red";
        MostrarMsj('Debe Seleccionar al menos una opción en el campo Mostrar', "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
    }
}

function Mostrar(val1, val2) {
    var result;
    if (mostrar == '0') { result = Diferencia(val1, val2); }
    if (mostrar == '1') { result = Variacion(val1, val2); }
    if (mostrar == '2') { result = Porcentaje(val1, val2); }
    return result;
}

function Diferencia(val1, val2) {
    var result;
    result = val1 - val2;
    return result;
}

function Variacion(val1, val2) {
    var result;
    result = Diferencia(val1, val2);
    if (val2 != 0) {
        result = (result / val2);
    }
    else {
        result = 0;
    }
    return result;
}

function Porcentaje(val1, val2) {
    var result;
    result = Variacion(val1, val2) * 100;
    return result;
}

function formato(valor) {
    var resultado;
    if ($('#selectCifras').val() == '0') {
        resultado = formato_numero(valor, 0, '.', ',');
    }
    else {
        resultado = formato_numero(valor, 0, '.', ',');
    }
    return resultado;
}

function formato_numero(numero, decimales, separador_decimal, separador_miles) {
    numero = parseFloat(numero);
    if (isNaN(numero)) {
        return "";
    }

    if (decimales !== undefined) {
        // Redondeamos
        numero = numero.toFixed(decimales);
    }

    // Convertimos el punto en separador_decimal
    numero = numero.toString().replace(".", separador_decimal !== undefined ? separador_decimal : ",");

    if (separador_miles) {
        // Añadimos los separadores de miles
        var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
        while (miles.test(numero)) {
            numero = numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }

    return numero;
}

var columGen = '7%';
var tolgeneral;
var arrayGen;
function resumenPorCartera(Cartera) {
    var AnioAnterior = 0;
    var TrimestreAnterior = 0;
    var MesAnterior = 0;
    var SemanaActual = 0;
    var FechaActual = 0;
    var Fitir = 0;
    var SemanaAnterior = 0;
    var MesAnterior2 = 0;
    var TrimestreAnterior2 = 0;
    var AnioAnterior2 = 0;

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera) {
            AnioAnterior += parseFloat(Dato.AnioAnterior);
            TrimestreAnterior += parseFloat(Dato.TrimestreAnterior);
            MesAnterior += parseFloat(Dato.MesAnterior);
            SemanaActual += parseFloat(Dato.SemanaActual);
            FechaActual += parseFloat(Dato.FechaActual);
        }
    }
    arrayGen.push(Cartera.toUpperCase() + '/' + FechaActual.toString());
    mostrar = '0';
    SemanaAnterior = Mostrar(FechaActual, SemanaActual);
    MesAnterior2 = Mostrar(FechaActual, MesAnterior);
    TrimestreAnterior2 = Mostrar(FechaActual, TrimestreAnterior);
    AnioAnterior2 = Mostrar(FechaActual, AnioAnterior);

    mostrar = '2';
    SemAntVP = Mostrar(FechaActual, SemanaActual);
    MesAntVP = Mostrar(FechaActual, MesAnterior);
    TriAntVP = Mostrar(FechaActual, AnioAnterior);
    AniAntVP = Mostrar(FechaActual, AnioAnterior);

    mostrar = '1';
    SemAntVM = Mostrar(FechaActual, SemanaActual);
    MesAntVM = Mostrar(FechaActual, MesAnterior);
    TriAntVM = Mostrar(FechaActual, AnioAnterior);
    AniAntVM = Mostrar(FechaActual, AnioAnterior);

    var HTML = '<tr  title="Cartera" class="alternateRow" style=" border-bottom:none; border-top:none; cursor:pointer" onclick="mostrarFilasCartera(\'' + Cartera + '\');">';

    HTML += '<td width="' + columGen + '" style="text-align:right; font-size:9px;">';
    HTML += '<div style="float: left;"><img id ="img_' + Cartera + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif"/></div>';
    HTML += formato(AnioAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; font-size:9px;">';
    HTML += formato(TrimestreAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; font-size:9px;">';
    HTML += formato(MesAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; font-size:9px;">';
    HTML += formato(SemanaActual);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; font-size:9px;">';
    HTML += formato(FechaActual);
    HTML += '</td>';

    HTML += '<td width="' + nomcol + '" style="padding-left:6px; text-align:left; font-size:10px; color:black; font-weight: bold;">';
    HTML += Cartera.toUpperCase();
    HTML += '</td>';

    HTML += '<td width="' + colSA2 + '" style="text-align:right">';
    HTML += valor(SemanaAnterior, SemAntVM, SemAntVP, '#c6e5cc');
    HTML += '</td>';

    HTML += '<td width="' + colMA2 + '" style="text-align:right">';
    HTML += valor(MesAnterior2, MesAntVM, MesAntVP, '#c6e5cc');
    HTML += '</td>';

    HTML += '<td width="' + colTA2 + '" style="text-align:right">';
    HTML += valor(TrimestreAnterior2, TriAntVM, TriAntVP, '#c6e5cc');
    HTML += '</td>';

    HTML += '<td width="' + colAA2 + '" style="text-align:right">';
    HTML += valor(AnioAnterior2, AniAntVM, AniAntVP, '#c6e5cc');
    HTML += '</td>';

    HTML += '</tr>';

    HTML += '<tr">';

    HTML += '<tr">';
    HTML += '<td colspan="10">';
    HTML += '<div  id="' + Cartera + '" style="width:100%; display:none; cursor: pointer;">';

    HTML += '<table width="100%" cellpadding="0" cellspacing="0">';


    if ($("#selectMostrarPor").val() == '0') {
        tolgeneral = 'Descripción SubProducto';
        var Negocios = new Array();
        for (var i = 0; i < Datos.length; i++) {
            var Dato = Datos[i];

            if (Cartera == Dato.Cartera && Negocios.indexOf(Dato.Negocio) == -1)
                Negocios.push(Dato.Negocio);
        }
        for (var indiceNegocios = 0; indiceNegocios < Negocios.length; indiceNegocios++) {
            HTML += resumenPorNegocio(Cartera, Negocios[indiceNegocios]);
        }
    }
    else {

        if ($("#selectMostrarPor").val() == '1') { tolgeneral = 'Descripción Fitir'; }
        if ($("#selectMostrarPor").val() == '2') { tolgeneral = 'Descripción SubProducto'; }
        var Clasificaciones = new Array();
        for (var i = 0; i < Datos.length; i++) {
            var Dato = Datos[i];

            if (Cartera == Dato.Cartera && Clasificaciones.indexOf(Dato.Clasificacion) == -1)
                Clasificaciones.push(Dato.Clasificacion);
        }

        for (var indiceClasificaciones = 0; indiceClasificaciones < Clasificaciones.length; indiceClasificaciones++) {
            HTML += resumenPorClasificacion2(Cartera, Clasificaciones[indiceClasificaciones]);
        }
    }
    HTML += '</table>';
    HTML += '</div>';
    HTML += '</td>';
    HTML += '</tr>';
    return HTML;
}

function resumenPorNegocio(Cartera, Negocio) {
    var AnioAnterior = 0.0;
    var TrimestreAnterior = 0.0;
    var MesAnterior = 0.0;
    var SemanaActual = 0.0;
    var FechaActual = 0.0;
    var SemanaAnterior = 0.0;
    var MesAnterior2 = 0.0;
    var TrimestreAnterior2 = 0.0;
    var AnioAnterior2 = 0.0;

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Negocio == Dato.Negocio) {
            AnioAnterior += parseFloat(Dato.AnioAnterior);
            TrimestreAnterior += parseFloat(Dato.TrimestreAnterior);
            MesAnterior += parseFloat(Dato.MesAnterior);
            SemanaActual += parseFloat(Dato.SemanaActual);
            FechaActual += parseFloat(Dato.FechaActual);
        }
    }

    mostrar = '0';
    SemanaAnterior = Mostrar(FechaActual, SemanaActual); // (FechaActual - SemanaActual)/SemanaActual;
    MesAnterior2 = Mostrar(FechaActual, MesAnterior); //(FechaActual - MesAnterior)/MesAnterior;
    TrimestreAnterior2 = Mostrar(FechaActual, TrimestreAnterior); //(FechaActual - TrimestreAnterior)/TrimestreAnterior;
    AnioAnterior2 = Mostrar(FechaActual, AnioAnterior); //(FechaActual - AnioAnterior)/AnioAnterior;

    mostrar = '2';
    SemAntVP = Mostrar(FechaActual, SemanaActual);
    MesAntVP = Mostrar(FechaActual, MesAnterior);
    TriAntVP = Mostrar(FechaActual, AnioAnterior);
    AniAntVP = Mostrar(FechaActual, AnioAnterior);

    mostrar = '1';
    SemAntVM = Mostrar(FechaActual, SemanaActual);
    MesAntVM = Mostrar(FechaActual, MesAnterior);
    TriAntVM = Mostrar(FechaActual, AnioAnterior);
    AniAntVM = Mostrar(FechaActual, AnioAnterior);

    var HTML = '<tr  title="Negocio"  style="cursor:pointer" onclick="mostrarFilasNegocio(\'' + Cartera + '-' + Negocio + '\');">';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv2 + '; font-size:9px;">';
    HTML += '<div style="float: left;">&nbsp&nbsp<img id ="img_' + Cartera + '-' + Negocio + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif"/></div>';
    HTML += formato(AnioAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv2 + '; font-size:9px;">';
    HTML += formato(TrimestreAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv2 + '; font-size:9px;">';
    HTML += formato(MesAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv2 + '; font-size:9px;">';
    HTML += formato(SemanaActual);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv2 + '; font-size:9px;">';
    HTML += formato(FechaActual);
    HTML += '</td>';

    HTML += '<td width="' + nomcol + '" style="padding-left:11px; text-align:left; font-size:8px; background:' + colorniv2 + '; color:Black;">';
    HTML += Negocio.toUpperCase();
    HTML += '</td>';

    HTML += '<td width="' + colSA2 + '" style="text-align:right; background:' + colorniv2 + ';">';
    HTML += valor(SemanaAnterior, SemAntVM, SemAntVP, colorniv2);
    HTML += '</td>';

    HTML += '<td width="' + colMA2 + '" style="text-align:right; background:' + colorniv2 + ';">';
    HTML += valor(MesAnterior2, MesAntVM, MesAntVP, colorniv2);
    HTML += '</td>';

    HTML += '<td width="' + colTA2 + '" style="text-align:right; background:' + colorniv2 + ';">';
    HTML += valor(TrimestreAnterior2, TriAntVM, TriAntVP, colorniv2);
    HTML += '</td>';

    HTML += '<td width="' + colAA2 + '" style="text-align:right; background:' + colorniv2 + ';">';
    HTML += valor(AnioAnterior2, AniAntVM, AniAntVP, colorniv2);
    HTML += '</td>';

    HTML += '</tr>';

    HTML += '<tr>';

    HTML += '<tr">';
    HTML += '<td colspan="10">';
    HTML += '<div  id="' + Cartera + '-' + Negocio + '" style="width:100%; display:none; cursor: pointer;">';

    HTML += '<table width="100%" cellpadding="0" cellspacing="0">';

    var Clasificaciones = new Array();

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Negocio == Dato.Negocio && Clasificaciones.indexOf(Dato.Clasificacion) == -1)
            Clasificaciones.push(Dato.Clasificacion);
    }

    for (var indiceClasificaciones = 0; indiceClasificaciones < Clasificaciones.length; indiceClasificaciones++) {
        HTML += resumenPorClasificacion(Cartera, Negocio, Clasificaciones[indiceClasificaciones]);
    }

    HTML += '</table>';
    HTML += '</div>';
    HTML += '</td>';
    HTML += '</tr>';
    return HTML;
}

function resumenPorClasificacion(Cartera, Negocio, Clasificacion) {
    var AnioAnterior = 0.0;
    var TrimestreAnterior = 0.0;
    var MesAnterior = 0.0;
    var SemanaActual = 0.0;
    var FechaActual = 0.0;
    var SemanaAnterior = 0.0;
    var MesAnterior2 = 0.0;
    var TrimestreAnterior2 = 0.0;
    var AnioAnterior2 = 0.0;

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Negocio == Dato.Negocio && Clasificacion == Dato.Clasificacion) {
            AnioAnterior += parseFloat(Dato.AnioAnterior);
            TrimestreAnterior += parseFloat(Dato.TrimestreAnterior);
            MesAnterior += parseFloat(Dato.MesAnterior);
            SemanaActual += parseFloat(Dato.SemanaActual);
            FechaActual += parseFloat(Dato.FechaActual);
        }
    }

    mostrar = '0';
    SemanaAnterior = Mostrar(FechaActual, SemanaActual); // (FechaActual - SemanaActual)/SemanaActual;
    MesAnterior2 = Mostrar(FechaActual, MesAnterior); //(FechaActual - MesAnterior)/MesAnterior;
    TrimestreAnterior2 = Mostrar(FechaActual, TrimestreAnterior); //(FechaActual - TrimestreAnterior)/TrimestreAnterior;
    AnioAnterior2 = Mostrar(FechaActual, AnioAnterior); //(FechaActual - AnioAnterior)/AnioAnterior;

    mostrar = '2';
    SemAntVP = Mostrar(FechaActual, SemanaActual);
    MesAntVP = Mostrar(FechaActual, MesAnterior);
    TriAntVP = Mostrar(FechaActual, AnioAnterior);
    AniAntVP = Mostrar(FechaActual, AnioAnterior);

    mostrar = '1';
    SemAntVM = Mostrar(FechaActual, SemanaActual);
    MesAntVM = Mostrar(FechaActual, MesAnterior);
    TriAntVM = Mostrar(FechaActual, AnioAnterior);
    AniAntVM = Mostrar(FechaActual, AnioAnterior);


    var HTML = '<tr  title="Clasificación"  style="cursor:pointer" onclick="mostrarFilasClasificacion(\'' + Cartera + '-' + Negocio + '-' + Clasificacion + '\');">';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv3 + '; font-size:9px;">';
    HTML += '<div style="float: left;">&nbsp&nbsp&nbsp&nbsp<img id ="img_' + Cartera + '-' + Negocio + '-' + Clasificacion + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif"/></div>';
    HTML += formato(AnioAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv3 + '; font-size:9px;">';
    HTML += formato(TrimestreAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv3 + '; font-size:9px;">';
    HTML += formato(MesAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv3 + '; font-size:9px;">';
    HTML += formato(SemanaActual);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv3 + '; font-size:9px;">';
    HTML += formato(FechaActual);
    HTML += '</td>';

    HTML += '<td width="' + nomcol + '" style="padding-left:19px; text-align:left; font-size:8px; background:' + colorniv3 + '; color:Black;">';
    HTML += Clasificacion.toUpperCase();
    HTML += '</td>';

    HTML += '<td width="' + colSA2 + '" style="text-align:right; background:' + colorniv3 + ';">';
    HTML += valor(SemanaAnterior, SemAntVM, SemAntVP, colorniv3);
    HTML += '</td>';

    HTML += '<td width="' + colMA2 + '" style="text-align:right; background:' + colorniv3 + ';">';
    HTML += valor(MesAnterior2, MesAntVM, MesAntVP, colorniv3);
    HTML += '</td>';

    HTML += '<td width="' + colTA2 + '" style="text-align:right; background:' + colorniv3 + ';">';
    HTML += valor(TrimestreAnterior2, TriAntVM, TriAntVP, colorniv3);
    HTML += '</td>';

    HTML += '<td width="' + colAA2 + '" style="text-align:right; background:' + colorniv3 + ';">';
    HTML += valor(AnioAnterior2, AniAntVM, AniAntVP, colorniv3);
    HTML += '</td>';

    HTML += '</tr>';

    HTML += '<tr>';

    HTML += '<tr">';
    HTML += '<td colspan="10">';
    HTML += '<div  id="' + Cartera + '-' + Negocio + '-' + Clasificacion + '" style="width:100%; display:none; cursor: pointer;">';

    HTML += '<table width="100%" cellpadding="0" cellspacing="0">';

    var Rubros = new Array();

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Negocio == Dato.Negocio && Clasificacion == Dato.Clasificacion && Rubros.indexOf(Dato.Rubro) == -1)
            Rubros.push(Dato.Rubro);
    }

    for (var indiceRubros = 0; indiceRubros < Rubros.length; indiceRubros++) {
        HTML += resumenPorRubro(Cartera, Negocio, Clasificacion, Rubros[indiceRubros]);
    }

    HTML += '</table>';
    HTML += '</div>';
    HTML += '</td>';
    HTML += '</tr>';
    return HTML;
}

function resumenPorRubro(Cartera, Negocio, Clasificacion, Rubro) {
    var AnioAnterior = 0.0;
    var TrimestreAnterior = 0.0;
    var MesAnterior = 0.0;
    var SemanaActual = 0.0;
    var FechaActual = 0.0;
    var SemanaAnterior = 0.0;
    var MesAnterior2 = 0.0;
    var TrimestreAnterior2 = 0.0;
    var AnioAnterior2 = 0.0;

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Negocio == Dato.Negocio && Clasificacion == Dato.Clasificacion && Rubro == Dato.Rubro) {
            AnioAnterior += parseFloat(Dato.AnioAnterior);
            TrimestreAnterior += parseFloat(Dato.TrimestreAnterior);
            MesAnterior += parseFloat(Dato.MesAnterior);
            SemanaActual += parseFloat(Dato.SemanaActual);
            FechaActual += parseFloat(Dato.FechaActual);
        }
    }
    mostrar = '0';
    SemanaAnterior = Mostrar(FechaActual, SemanaActual); // (FechaActual - SemanaActual)/SemanaActual;
    MesAnterior2 = Mostrar(FechaActual, MesAnterior); //(FechaActual - MesAnterior)/MesAnterior;
    TrimestreAnterior2 = Mostrar(FechaActual, TrimestreAnterior); //(FechaActual - TrimestreAnterior)/TrimestreAnterior;
    AnioAnterior2 = Mostrar(FechaActual, AnioAnterior); //(FechaActual - AnioAnterior)/AnioAnterior;

    mostrar = '2';
    SemAntVP = Mostrar(FechaActual, SemanaActual);
    MesAntVP = Mostrar(FechaActual, MesAnterior);
    TriAntVP = Mostrar(FechaActual, AnioAnterior);
    AniAntVP = Mostrar(FechaActual, AnioAnterior);

    mostrar = '1';
    SemAntVM = Mostrar(FechaActual, SemanaActual);
    MesAntVM = Mostrar(FechaActual, MesAnterior);
    TriAntVM = Mostrar(FechaActual, AnioAnterior);
    AniAntVM = Mostrar(FechaActual, AnioAnterior);

    var HTML = '<tr  title="Rubro" style="cursor:pointer" onclick="mostrarFilasRubro(\'' + Cartera + '-' + Negocio + '-' + Clasificacion + '-' + Rubro + '\');">';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv4 + '; font-size:9px;">';
    HTML += '<div style="float: left;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img id ="img_' + Cartera + '-' + Negocio + '-' + Clasificacion + '-' + Rubro + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif"/></div>';
    HTML += formato(AnioAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv4 + '; font-size:9px;">';
    HTML += formato(TrimestreAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv4 + '; font-size:9px;">';
    HTML += formato(MesAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv4 + '; font-size:9px;">';
    HTML += formato(SemanaActual);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv4 + '; font-size:9px;">';
    HTML += formato(FechaActual);
    HTML += '</td>';

    HTML += '<td width="' + nomcol + '" style="padding-left:27px; text-align:left; font-size:8px; background:' + colorniv4 + '; color:Black;">';
    HTML += Rubro.toUpperCase();
    HTML += '</td>';

    HTML += '<td width="' + colSA2 + '" style="text-align:right; background:' + colorniv4 + ';">';
    HTML += valor(SemanaAnterior, SemAntVM, SemAntVP, colorniv4);
    HTML += '</td>';

    HTML += '<td width="' + colMA2 + '" style="text-align:right; background:' + colorniv4 + ';">';
    HTML += valor(MesAnterior2, MesAntVM, MesAntVP, colorniv4);
    HTML += '</td>';

    HTML += '<td width="' + colTA2 + '" style="text-align:right; background:' + colorniv4 + ';">';
    HTML += valor(TrimestreAnterior2, TriAntVM, TriAntVP, colorniv4);
    HTML += '</td>';

    HTML += '<td width="' + colAA2 + '" style="text-align:right; background:' + colorniv4 + ';">';
    HTML += valor(AnioAnterior2, AniAntVM, AniAntVP, colorniv4);
    HTML += '</td>';

    HTML += '</tr>';

    HTML += '<tr>';

    HTML += '<tr">';
    HTML += '<td colspan="10">';
    HTML += '<div  id="' + Cartera + '-' + Negocio + '-' + Clasificacion + '-' + Rubro + '" style="width:100%; display:none; cursor: pointer;">';

    HTML += '<table width="100%" cellpadding="0" cellspacing="0">';

    var Productos = new Array();

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Negocio == Dato.Negocio && Clasificacion == Dato.Clasificacion && Rubro == Dato.Rubro && Productos.indexOf(Dato.Producto) == -1)
            Productos.push(Dato.Producto);
    }

    for (var indiceProductos = 0; indiceProductos < Productos.length; indiceProductos++) {
        HTML += resumenPorProducto(Cartera, Negocio, Clasificacion, Rubro, Productos[indiceProductos]);
    }

    HTML += '</table>';
    HTML += '</div>';
    HTML += '</td>';
    HTML += '</tr>';
    return HTML;
}

function resumenPorProducto(Cartera, Negocio, Clasificacion, Rubro, Producto) {
    var AnioAnterior = 0.0;
    var TrimestreAnterior = 0.0;
    var MesAnterior = 0.0;
    var SemanaActual = 0.0;
    var FechaActual = 0.0;
    var SemanaAnterior = 0.0;
    var MesAnterior2 = 0.0;
    var TrimestreAnterior2 = 0.0;
    var AnioAnterior2 = 0.0;

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Negocio == Dato.Negocio && Clasificacion == Dato.Clasificacion && Rubro == Dato.Rubro && Producto == Dato.Producto) {
            mostrar = '0';
            AnioAnterior += parseFloat(Dato.AnioAnterior);
            TrimestreAnterior += parseFloat(Dato.TrimestreAnterior);
            MesAnterior += parseFloat(Dato.MesAnterior);
            SemanaActual += parseFloat(Dato.SemanaActual);
            FechaActual += parseFloat(Dato.FechaActual);
            SemanaAnterior += parseFloat(Dato.SemanaAnterior);
            MesAnterior2 += parseFloat(Dato.MesAnterior2);
            TrimestreAnterior2 += parseFloat(Dato.TrimestreAnterior2);
            AnioAnterior2 += parseFloat(Dato.AnioAnterior2);

            mostrar = '2';
            SemAntVP = parseFloat(Dato.FNSemmAntVP);
            MesAntVP = parseFloat(Dato.FNMesAntVP);
            TriAntVP = parseFloat(Dato.FNTrimestreAntVP);
            AniAntVP = parseFloat(Dato.FNAnioAntVP);

            mostrar = '1';
            SemAntVM = parseFloat(Dato.FNSemmAntVM);
            MesAntVM = parseFloat(Dato.FNMesAntVM);
            TriAntVM = parseFloat(Dato.FNTrimestreAntVM);
            AniAntVM = parseFloat(Dato.FNAnioAntVM);
        }
    }

    var HTML = '<tr  title="' + tolgeneral + '" style="cursor:pointer" onclick="mostrarFilas(\'' + Cartera + '-' + Negocio + '-' + Clasificacion + '-' + Rubro + '-' + Producto + '\');">';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv5 + '; font-size:9px;">';
    HTML += '<div style="float: left;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img id ="img_' + Cartera + '-' + Negocio + '-' + Clasificacion + '-' + Rubro + '-' + Producto + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif"/></div>';
    HTML += formato(AnioAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv5 + '; font-size:9px;">';
    HTML += formato(TrimestreAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv5 + '; font-size:9px;">';
    HTML += formato(MesAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv5 + '; font-size:9px;">';
    HTML += formato(SemanaActual);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv5 + '; font-size:9px;">';
    HTML += formato(FechaActual);
    HTML += '</td>';

    HTML += '<td width="' + nomcol + '" style="text-align:justify; padding-left:35px; text-align:left; font-size:8px; background:' + colorniv5 + '; color:Black;">';
    HTML += Producto.toUpperCase();
    HTML += '</td>';

    HTML += '<td width="' + colSA2 + '" style="text-align:right; background:' + colorniv5 + ';">';
    HTML += valor(SemanaAnterior, SemAntVM, SemAntVP, colorniv5);
    HTML += '</td>';

    HTML += '<td width="' + colMA2 + '" style="text-align:right; background:' + colorniv5 + ';">';
    HTML += valor(MesAnterior2, MesAntVM, MesAntVP, colorniv5);
    HTML += '</td>';

    HTML += '<td width="' + colTA2 + '" style="text-align:right; background:' + colorniv5 + ';">';
    HTML += valor(TrimestreAnterior2, TriAntVM, TriAntVP, colorniv5);
    HTML += '</td>';

    HTML += '<td width="' + colAA2 + '" style="text-align:right; background:' + colorniv5 + ';">';
    HTML += valor(AnioAnterior2, AniAntVM, AniAntVP, colorniv5);
    HTML += '</td>';

    HTML += '</tr>';

    HTML += '<tr>';

    HTML += '<tr">';
    HTML += '<td colspan="10">';
    HTML += '<div  id="' + Cartera + '-' + Negocio + '-' + Clasificacion + '-' + Rubro + '-' + Producto + '" style="width:100%; display:none; cursor: pointer;">';

    HTML += '<table width="100%" cellpadding="0" cellspacing="0">';

    HTML += resumenPorFitir(Cartera, Negocio, Clasificacion, Rubro, Producto);

    HTML += '</table>';

    HTML += '</div>';

    HTML += '</td>';

    HTML += '</tr>';

    return HTML;
}


function resumenPorFitir(Cartera, Negocio, Clasificacion, Rubro, Producto) {
    var AnioAnterior = 0.0;
    var TrimestreAnterior = 0.0;
    var MesAnterior = 0.0;
    var SemanaActual = 0.0;
    var FechaActual = 0.0;
    var Fitir = 0.0;
    var SemanaAnterior = 0.0;
    var MesAnterior2 = 0.0;
    var TrimestreAnterior2 = 0.0;
    var AnioAnterior2 = 0.0;

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Negocio == Dato.Negocio && Clasificacion == Dato.Clasificacion && Rubro == Dato.Rubro && Producto == Dato.Producto) {

            mostrar = '0';
            AnioAnterior += parseFloat(Dato.AnioAnterior);
            TrimestreAnterior += parseFloat(Dato.TrimestreAnterior);
            MesAnterior += parseFloat(Dato.MesAnterior);
            SemanaActual += parseFloat(Dato.SemanaActual);
            FechaActual += parseFloat(Dato.FechaActual);
            Fitir += parseFloat(Dato.Fitir);
            SemanaAnterior += parseFloat(Dato.SemanaAnterior);
            MesAnterior2 += parseFloat(Dato.MesAnterior2);
            TrimestreAnterior2 += parseFloat(Dato.TrimestreAnterior2);
            AnioAnterior2 += parseFloat(Dato.AnioAnterior2);

            mostrar = '2';
            SemAntVP = parseFloat(Dato.FNSemmAntVP);
            MesAntVP = parseFloat(Dato.FNMesAntVP);
            TriAntVP = parseFloat(Dato.FNTrimestreAntVP);
            AniAntVP = parseFloat(Dato.FNAnioAntVP);

            mostrar = '1';
            SemAntVM = parseFloat(Dato.FNSemmAntVM);
            MesAntVM = parseFloat(Dato.FNMesAntVM);
            TriAntVM = parseFloat(Dato.FNTrimestreAntVM);
            AniAntVM = parseFloat(Dato.FNAnioAntVM);
        }
    }

    var HTML = '<tr  title="Fitir">';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv6 + '; font-size:9px;">';
    HTML += formato(AnioAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv6 + '; font-size:9px;">';
    HTML += formato(TrimestreAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv6 + '; font-size:9px;">';
    HTML += formato(MesAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv6 + '; font-size:9px;">';
    HTML += formato(SemanaActual);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv6 + '; font-size:9px;">';
    HTML += formato(FechaActual);
    HTML += '</td>';

    HTML += '<td width="' + nomcol + '" style="padding-left:35px; text-align:left; background:' + colorniv6 + '; font-size:10px; color:Black;">';
    HTML += 'FITIR: ' + Fitir;
    HTML += '</td>';

    HTML += '<td width="' + colSA2 + '" style="text-align:right; background:' + colorniv6 + ';">';
    HTML += valor(SemanaAnterior, SemAntVM, SemAntVP, colorniv6);
    HTML += '</td>';

    HTML += '<td width="' + colMA2 + '" style="text-align:right; background:' + colorniv6 + ';">';
    HTML += valor(MesAnterior2, MesAntVM, MesAntVP, colorniv6);
    HTML += '</td>';

    HTML += '<td width="' + colTA2 + '" style="text-align:right; background:' + colorniv6 + ';">';
    HTML += valor(TrimestreAnterior2, TriAntVM, TriAntVP, colorniv6);
    HTML += '</td>';

    HTML += '<td width="' + colAA2 + '" style="text-align:right; background:' + colorniv6 + ';">';
    HTML += valor(AnioAnterior2, AniAntVM, AniAntVP, colorniv6);
    HTML += '</td>';

    HTML += '</tr>';

    return HTML;
}


function valor(cifra, cifraVM, cifraVP, background) {
    var cifraAlterna;
    var cifraAlternaVM;
    var cifraAlternaVP;
    var fonsize = 'font-size:15px;';

    if (mostrarGen == 1) {
        fonsize = 'font-size:11px;';
        if (arrayMostrar[0] == '0') {
            cifraAlterna = formato_numero(cifra, 0, '.', ',');
        }
        if (arrayMostrar[0] == '1') {
            cifraAlterna = formato_numero(cifraVM, 4, '.', ',');
        }
        if (arrayMostrar[0] == '2') {
            cifraAlterna = formato_numero(cifraVP, 2, '.', ',') + '%';
        }

        var imagen;
        if (cifra > -0) {
            imagen = '&nbsp;<img width="10px" height ="12px" src="../../Images/Portafolio/ValoresEIndices/fle_arriba.png" title="Positivo"/>';
        }
        else {
            imagen = '&nbsp;<img width="10px" height ="12px" src="../../Images/Portafolio/ValoresEIndices/fle_abajo.png" title="Negativo"/>';
        }

        var HTML = '';
        HTML = '<table width="100%"  cellpadding="0" cellspacing="0">';
        HTML += '<tr>';
        HTML += '<td style="width:5%; text-align:left; background:' + background + ';">';
        HTML += imagen;
        HTML += '</td>';
        HTML += '<td style="width:95%; text-align:right;' + fonsize + ' background:' + background + ';">';
        HTML += cifraAlterna;
        HTML += '</td>';
        HTML += '</tr>';
        HTML += '</table>';
    }
    if (mostrarGen == 2) {
        fonsize = 'font-size:9px;';
        if (arrayMostrar[0] == '0') {
            cifraAlterna = formato_numero(cifra, 0, '.', ',');
        }
        if (arrayMostrar[0] == '1') {
            cifraAlterna = formato_numero(cifraVM, 4, '.', ',');
        }
        if (arrayMostrar[0] == '2') {
            cifraAlterna = formato_numero(cifraVP, 2, '.', ',') + '%';
        }

        if (arrayMostrar[1] == '0') {
            cifraAlternaVM = formato_numero(cifra, 0, '.', ',');
        }
        if (arrayMostrar[1] == '1') {
            cifraAlternaVM = formato_numero(cifraVM, 4, '.', ',');
        }
        if (arrayMostrar[1] == '2') {
            cifraAlternaVM = formato_numero(cifraVP, 2, '.', ',') + '%';
        }

        if (cifra > -0) {
            imagen = '&nbsp;<img width="10px" height ="12px" src="../../Images/Portafolio/ValoresEIndices/fle_arriba.png" title="Positivo"/>';
        }
        else {
            imagen = '&nbsp;<img width="10px" height ="12px" src="../../Images/Portafolio/ValoresEIndices/fle_abajo.png" title="Negativo"/>';
        }

        var HTML = '';
        HTML = '<table width="100%"  cellpadding="0" cellspacing="0">';
        HTML += '<tr>';
        HTML += '<td  style="width:6%; text-align:left; background:' + background + ';">';
        HTML += imagen;
        HTML += '</td>';
        HTML += '<td style="padding-right:3px; width:59%; text-align:right;' + fonsize + ' background:' + background + ';">';
        HTML += cifraAlterna;
        HTML += '</td>';
        HTML += '<td style="padding-right:0px; width:35%; text-align:right;' + fonsize + ' background:' + background + ';">';
        HTML += cifraAlternaVM;
        HTML += '</td>';
        HTML += '</tr>';
        HTML += '</table>';
    }
    if (mostrarGen == 3) {
        fonsize = 'font-size:8px;';
        if (arrayMostrar[0] == '0') {
            cifraAlterna = formato_numero(cifra, 0, '.', ',');
        }
        if (arrayMostrar[0] == '1') {
            cifraAlterna = formato_numero(cifraVM, 2, '.', ',');
        }
        if (arrayMostrar[0] == '2') {
            cifraAlterna = formato_numero(cifraVP, 1, '.', ',') + '%';
        }

        if (arrayMostrar[1] == '0') {
            cifraAlternaVM = formato_numero(cifra, 0, '.', ',');
        }
        if (arrayMostrar[1] == '1') {
            cifraAlternaVM = formato_numero(cifraVM, 2, '.', ',');
        }
        if (arrayMostrar[1] == '2') {
            cifraAlternaVM = formato_numero(cifraVP, 1, '.', ',') + '%';
        }

        if (arrayMostrar[2] == '0') {
            cifraAlternaVP = formato_numero(cifra, 0, '.', ',');
        }
        if (arrayMostrar[2] == '1') {
            cifraAlternaVP = formato_numero(cifraVM, 2, '.', ',');
        }
        if (arrayMostrar[2] == '2') {
            cifraAlternaVP = formato_numero(cifraVP, 1, '.', ',') + '%';
        }

        if (cifra > -0) {
            imagen = '&nbsp;<img width="10px" height ="12px" src="../../Images/Portafolio/ValoresEIndices/fle_arriba.png" title="Positivo"/>';
        }
        else {
            imagen = '&nbsp;<img width="10px" height ="12px" src="../../Images/Portafolio/ValoresEIndices/fle_abajo.png" title="Negativo"/>';
        }

        var HTML = '';
        HTML = '<table width="100%"  cellpadding="0" cellspacing="0">';
        HTML += '<tr>';
        HTML += '<td style="width:5%; text-align:left; background:' + background + ';">';
        HTML += imagen;
        HTML += '</td>';
        HTML += '<td style="padding-right:3px; width:40%; text-align:right;' + fonsize + ' background:' + background + ';">';
        HTML += cifraAlterna;
        HTML += '</td>';
        HTML += '<td style="padding-right:5px; width:35%; text-align:right;' + fonsize + ' background:' + background + ';">';
        HTML += cifraAlternaVM;
        HTML += '</td>';
        HTML += '<td style="padding-right:0px; width:20%; text-align:right;' + fonsize + ' background:' + background + ';">';
        HTML += cifraAlternaVP;
        HTML += '</td>';
        HTML += '</tr>';
        HTML += '</table>';
    }

    return HTML;
}

function resumenPorClasificacion2(Cartera, Clasificacion) {
    var AnioAnterior = 0.0;
    var TrimestreAnterior = 0.0;
    var MesAnterior = 0.0;
    var SemanaActual = 0.0;
    var FechaActual = 0.0;
    var SemanaAnterior = 0.0;
    var MesAnterior2 = 0.0;
    var TrimestreAnterior2 = 0.0;
    var AnioAnterior2 = 0.0;

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Clasificacion == Dato.Clasificacion) {
            AnioAnterior += parseFloat(Dato.AnioAnterior);
            TrimestreAnterior += parseFloat(Dato.TrimestreAnterior);
            MesAnterior += parseFloat(Dato.MesAnterior);
            SemanaActual += parseFloat(Dato.SemanaActual);
            FechaActual += parseFloat(Dato.FechaActual);
        }
    }
    mostrar = '0';
    SemanaAnterior = Mostrar(FechaActual, SemanaActual); // (FechaActual - SemanaActual)/SemanaActual;
    MesAnterior2 = Mostrar(FechaActual, MesAnterior); //(FechaActual - MesAnterior)/MesAnterior;
    TrimestreAnterior2 = Mostrar(FechaActual, TrimestreAnterior); //(FechaActual - TrimestreAnterior)/TrimestreAnterior;
    AnioAnterior2 = Mostrar(FechaActual, AnioAnterior); //(FechaActual - AnioAnterior)/AnioAnterior;

    mostrar = '2';
    SemAntVP = Mostrar(FechaActual, SemanaActual);
    MesAntVP = Mostrar(FechaActual, MesAnterior);
    TriAntVP = Mostrar(FechaActual, AnioAnterior);
    AniAntVP = Mostrar(FechaActual, AnioAnterior);

    mostrar = '1';
    SemAntVM = Mostrar(FechaActual, SemanaActual);
    MesAntVM = Mostrar(FechaActual, MesAnterior);
    TriAntVM = Mostrar(FechaActual, AnioAnterior);
    AniAntVM = Mostrar(FechaActual, AnioAnterior);

    var HTML = '<tr  title="Clasificación"  style="cursor:pointer" onclick="mostrarFilasNegocio(\'' + Cartera + '-' + Clasificacion + '\');">';
    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv2 + '; font-size:9px;">';
    HTML += '<div style="float: left;">&nbsp&nbsp<img id ="img_' + Cartera + '-' + Clasificacion + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif"/></div>';
    HTML += formato(AnioAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv2 + '; font-size:9px;">';
    HTML += formato(TrimestreAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv2 + '; font-size:9px;">';
    HTML += formato(MesAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv2 + '; font-size:9px;">';
    HTML += formato(SemanaActual);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv2 + '; font-size:9px;">';
    HTML += formato(FechaActual);
    HTML += '</td>';

    HTML += '<td width="' + nomcol + '" style="padding-left:11px; text-align:left; font-size:8px; background:' + colorniv2 + '; color:Black;">';
    HTML += Clasificacion.toUpperCase();
    HTML += '</td>';

    HTML += '<td width="' + colSA2 + '" style="text-align:right; background:' + colorniv2 + ';">';
    HTML += valor(SemanaAnterior, SemAntVM, SemAntVP, colorniv2);
    HTML += '</td>';

    HTML += '<td width="' + colMA2 + '" style="text-align:right; background:' + colorniv2 + ';">';
    HTML += valor(MesAnterior2, MesAntVM, MesAntVP, colorniv2);
    HTML += '</td>';

    HTML += '<td width="' + colTA2 + '" style="text-align:right; background:' + colorniv2 + ';">';
    HTML += valor(TrimestreAnterior2, TriAntVM, TriAntVP, colorniv2);
    HTML += '</td>';

    HTML += '<td width="' + colAA2 + '" style="text-align:right; background:' + colorniv2 + ';">';
    HTML += valor(AnioAnterior2, AniAntVM, AniAntVP, colorniv2);
    HTML += '</td>';

    HTML += '</tr>';

    HTML += '<tr>';

    HTML += '<tr">';
    HTML += '<td colspan="10">';
    HTML += '<div  id="' + Cartera + '-' + Clasificacion + '" style="width:100%; display:none; cursor: pointer;">';

    HTML += '<table width="100%" cellpadding="0" cellspacing="0">';

    var Rubros = new Array();

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Clasificacion == Dato.Clasificacion && Rubros.indexOf(Dato.Rubro) == -1)
            Rubros.push(Dato.Rubro);
    }

    for (var indiceRubros = 0; indiceRubros < Rubros.length; indiceRubros++) {
        HTML += resumenPorRubro2(Cartera, Clasificacion, Rubros[indiceRubros]);
    }

    HTML += '</table>';
    HTML += '</div>';
    HTML += '</td>';
    HTML += '</tr>';
    return HTML;
}

function resumenPorRubro2(Cartera, Clasificacion, Rubro) {
    var AnioAnterior = 0.0;
    var TrimestreAnterior = 0.0;
    var MesAnterior = 0.0;
    var SemanaActual = 0.0;
    var FechaActual = 0.0;
    var SemanaAnterior = 0.0;
    var MesAnterior2 = 0.0;
    var TrimestreAnterior2 = 0.0;
    var AnioAnterior2 = 0.0;

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Clasificacion == Dato.Clasificacion && Rubro == Dato.Rubro) {
            AnioAnterior += parseFloat(Dato.AnioAnterior);
            TrimestreAnterior += parseFloat(Dato.TrimestreAnterior);
            MesAnterior += parseFloat(Dato.MesAnterior);
            SemanaActual += parseFloat(Dato.SemanaActual);
            FechaActual += parseFloat(Dato.FechaActual);
        }
    }
    mostrar = '0';
    SemanaAnterior = Mostrar(FechaActual, SemanaActual); // (FechaActual - SemanaActual)/SemanaActual;
    MesAnterior2 = Mostrar(FechaActual, MesAnterior); //(FechaActual - MesAnterior)/MesAnterior;
    TrimestreAnterior2 = Mostrar(FechaActual, TrimestreAnterior); //(FechaActual - TrimestreAnterior)/TrimestreAnterior;
    AnioAnterior2 = Mostrar(FechaActual, AnioAnterior); //(FechaActual - AnioAnterior)/AnioAnterior;

    mostrar = '2';
    SemAntVP = Mostrar(FechaActual, SemanaActual);
    MesAntVP = Mostrar(FechaActual, MesAnterior);
    TriAntVP = Mostrar(FechaActual, AnioAnterior);
    AniAntVP = Mostrar(FechaActual, AnioAnterior);

    mostrar = '1';
    SemAntVM = Mostrar(FechaActual, SemanaActual);
    MesAntVM = Mostrar(FechaActual, MesAnterior);
    TriAntVM = Mostrar(FechaActual, AnioAnterior);
    AniAntVM = Mostrar(FechaActual, AnioAnterior);

    var HTML = '<tr  title="Rubro" style="cursor:pointer" onclick="mostrarFilasRubro(\'' + Cartera + '-' + Clasificacion + '-' + Rubro + '\');">';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv3 + '; font-size:9px;">';
    HTML += '<div style="float: left;">&nbsp&nbsp&nbsp&nbsp<img id ="img_' + Cartera + '-' + Clasificacion + '-' + Rubro + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif"/></div>';
    HTML += formato(AnioAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv3 + '; font-size:9px;">';
    HTML += formato(TrimestreAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv3 + '; font-size:9px;">';
    HTML += formato(MesAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv3 + '; font-size:9px;">';
    HTML += formato(SemanaActual);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv3 + '; font-size:9px;">';
    HTML += formato(FechaActual);
    HTML += '</td>';

    HTML += '<td width="' + nomcol + '" style="padding-left:19px; text-align:left; font-size:8px; background:' + colorniv3 + '; color:Black;">';
    HTML += Rubro.toUpperCase();
    HTML += '</td>';

    HTML += '<td width="' + colSA2 + '" style="text-align:right; background:' + colorniv3 + ';">';
    HTML += valor(SemanaAnterior, SemAntVM, SemAntVP, colorniv3);
    HTML += '</td>';

    HTML += '<td width="' + colMA2 + '" style="text-align:right; background:' + colorniv3 + ';">';
    HTML += valor(MesAnterior2, MesAntVM, MesAntVP, colorniv3);
    HTML += '</td>';

    HTML += '<td width="' + colTA2 + '" style="text-align:right; background:' + colorniv3 + ';">';
    HTML += valor(TrimestreAnterior2, TriAntVM, TriAntVP, colorniv3);
    HTML += '</td>';

    HTML += '<td width="' + colAA2 + '" style="text-align:right; background:' + colorniv3 + ';">';
    HTML += valor(AnioAnterior2, AniAntVM, AniAntVP, colorniv3);
    HTML += '</td>';

    HTML += '</tr>';

    HTML += '<tr>';

    HTML += '<tr">';
    HTML += '<td colspan="10">';
    HTML += '<div  id="' + Cartera + '-' + Clasificacion + '-' + Rubro + '" style="width:100%; display:none; cursor: pointer;">';

    HTML += '<table width="100%" cellpadding="0" cellspacing="0">';

    var desFitir = new Array();

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Clasificacion == Dato.Clasificacion && Rubro == Dato.Rubro && desFitir.indexOf(Dato.Producto) == -1)
            desFitir.push(Dato.Producto);
    }

    for (var indicedesFitir = 0; indicedesFitir < desFitir.length; indicedesFitir++) {
        HTML += resumenPorProducto2(Cartera, Clasificacion, Rubro, desFitir[indicedesFitir]);
    }

    HTML += '</table>';

    HTML += '</div>';

    HTML += '</td>';

    HTML += '</tr>';

    return HTML;
}

function resumenPorProducto2(Cartera, Clasificacion, Rubro, Producto) {
    var AnioAnterior = 0.0;
    var TrimestreAnterior = 0.0;
    var MesAnterior = 0.0;
    var SemanaActual = 0.0;
    var FechaActual = 0.0;
    var SemanaAnterior = 0.0;
    var MesAnterior2 = 0.0;
    var TrimestreAnterior2 = 0.0;
    var AnioAnterior2 = 0.0;

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Clasificacion == Dato.Clasificacion && Rubro == Dato.Rubro && Producto == Dato.Producto) {
            mostrar = '0';
            AnioAnterior += parseFloat(Dato.AnioAnterior);
            TrimestreAnterior += parseFloat(Dato.TrimestreAnterior);
            MesAnterior += parseFloat(Dato.MesAnterior);
            SemanaActual += parseFloat(Dato.SemanaActual);
            FechaActual += parseFloat(Dato.FechaActual);
            SemanaAnterior += parseFloat(Dato.SemanaAnterior);
            MesAnterior2 += parseFloat(Dato.MesAnterior2);
            TrimestreAnterior2 += parseFloat(Dato.TrimestreAnterior2);
            AnioAnterior2 += parseFloat(Dato.AnioAnterior2);

            mostrar = '2';
            SemAntVP = parseFloat(Dato.FNSemmAntVP);
            MesAntVP = parseFloat(Dato.FNMesAntVP);
            TriAntVP = parseFloat(Dato.FNTrimestreAntVP);
            AniAntVP = parseFloat(Dato.FNAnioAntVP);

            mostrar = '1';
            SemAntVM = parseFloat(Dato.FNSemmAntVM);
            MesAntVM = parseFloat(Dato.FNMesAntVM);
            TriAntVM = parseFloat(Dato.FNTrimestreAntVM);
            AniAntVM = parseFloat(Dato.FNAnioAntVM);
        }
    }

    var HTML = '<tr  title="' + tolgeneral + '" style="cursor:pointer" onclick="mostrarFilas(\'' + Cartera + '-' + Clasificacion + '-' + Rubro + '-' + Producto + '\');">';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv4 + '; font-size:9px;">';
    HTML += '<div style="float: left;">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<img id ="img_' + Cartera + '-' + Clasificacion + '-' + Rubro + '-' + Producto + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif"/></div>';
    HTML += formato(AnioAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv4 + '; font-size:9px;">';
    HTML += formato(TrimestreAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv4 + '; font-size:9px;">';
    HTML += formato(MesAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv4 + '; font-size:9px;">';
    HTML += formato(SemanaActual);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv4 + '; font-size:9px;">';
    HTML += formato(FechaActual);
    HTML += '</td>';

    HTML += '<td width="' + nomcol + '" style="padding-left:27px; text-align:left; font-size:8px; background:' + colorniv4 + '; color:Black;">';
    HTML += Producto.toUpperCase();
    HTML += '</td>';

    HTML += '<td width="' + colSA2 + '" style="text-align:right; background:' + colorniv4 + ';">';
    HTML += valor(SemanaAnterior, SemAntVM, SemAntVP, colorniv4);
    HTML += '</td>';

    HTML += '<td width="' + colMA2 + '" style="text-align:right; background:' + colorniv4 + ';">';
    HTML += valor(MesAnterior2, MesAntVM, MesAntVP, colorniv4);
    HTML += '</td>';

    HTML += '<td width="' + colTA2 + '" style="text-align:right; background:' + colorniv4 + ';">';
    HTML += valor(TrimestreAnterior2, TriAntVM, TriAntVP, colorniv4);
    HTML += '</td>';

    HTML += '<td width="' + colAA2 + '" style="text-align:right; background:' + colorniv4 + ';">';
    HTML += valor(AnioAnterior2, AniAntVM, AniAntVP, colorniv4);
    HTML += '</td>';

    HTML += '</tr>';

    HTML += '<tr>';

    HTML += '<tr">';
    HTML += '<td colspan="10">';
    HTML += '<div  id="' + Cartera + '-' + Clasificacion + '-' + Rubro + '-' + Producto + '" style="width:100%; display:none; cursor: pointer;">';

    HTML += '<table width="100%" cellpadding="0" cellspacing="0">';

    HTML += resumenPorFitir2(Cartera, Clasificacion, Rubro, Producto);

    HTML += '</table>';

    HTML += '</div>';

    HTML += '</td>';

    HTML += '</tr>';

    return HTML;
}


function resumenPorFitir2(Cartera, Clasificacion, Rubro, Producto) {
    var AnioAnterior = 0.0;
    var TrimestreAnterior = 0.0;
    var MesAnterior = 0.0;
    var SemanaActual = 0.0;
    var FechaActual = 0.0;
    var Fitir = 0.0;
    var SemanaAnterior = 0.0;
    var MesAnterior2 = 0.0;
    var TrimestreAnterior2 = 0.0;
    var AnioAnterior2 = 0.0;

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];

        if (Cartera == Dato.Cartera && Clasificacion == Dato.Clasificacion && Rubro == Dato.Rubro && Producto == Dato.Producto) {
            mostrar = '0';
            AnioAnterior += parseFloat(Dato.AnioAnterior);
            TrimestreAnterior += parseFloat(Dato.TrimestreAnterior);
            MesAnterior += parseFloat(Dato.MesAnterior);
            SemanaActual += parseFloat(Dato.SemanaActual);
            FechaActual += parseFloat(Dato.FechaActual);
            Fitir += parseFloat(Dato.Fitir);
            SemanaAnterior += parseFloat(Dato.SemanaAnterior);
            MesAnterior2 += parseFloat(Dato.MesAnterior2);
            TrimestreAnterior2 += parseFloat(Dato.TrimestreAnterior2);
            AnioAnterior2 += parseFloat(Dato.AnioAnterior2);

            mostrar = '2';
            SemAntVP = parseFloat(Dato.FNSemmAntVP);
            MesAntVP = parseFloat(Dato.FNMesAntVP);
            TriAntVP = parseFloat(Dato.FNTrimestreAntVP);
            AniAntVP = parseFloat(Dato.FNAnioAntVP);

            mostrar = '1';
            SemAntVM = parseFloat(Dato.FNSemmAntVM);
            MesAntVM = parseFloat(Dato.FNMesAntVM);
            TriAntVM = parseFloat(Dato.FNTrimestreAntVM);
            AniAntVM = parseFloat(Dato.FNAnioAntVM);
        }
    }

    var HTML = '<tr  title="Fitir">';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv6 + '; font-size:9px;">';
    HTML += formato(AnioAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv6 + '; font-size:9px;">';
    HTML += formato(TrimestreAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv6 + '; font-size:9px;">';
    HTML += formato(MesAnterior);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv6 + '; font-size:9px;">';
    HTML += formato(SemanaActual);
    HTML += '</td>';

    HTML += '<td width="' + columGen + '" style="text-align:right; background:' + colorniv6 + '; font-size:9px;">';
    HTML += formato(FechaActual);
    HTML += '</td>';

    HTML += '<td width="' + nomcol + '" style="padding-left:27px; text-align:left; font-weight: bold; background:' + colorniv6 + '; font-size:10px; color:Black;">';
    HTML += 'FITIR:' + Fitir;
    HTML += '</td>';

    HTML += '<td width="' + colSA2 + '" style="text-align:right; background:' + colorniv6 + ';">';
    HTML += valor(SemanaAnterior, SemAntVM, SemAntVP, colorniv6);
    HTML += '</td>';

    HTML += '<td width="' + colMA2 + '" style="text-align:right; background:' + colorniv6 + ';">';
    HTML += valor(MesAnterior2, MesAntVM, MesAntVP, colorniv6);
    HTML += '</td>';

    HTML += '<td width="' + colTA2 + '" style="text-align:right; background:' + colorniv6 + ';">';
    HTML += valor(TrimestreAnterior2, TriAntVM, TriAntVP, colorniv6);
    HTML += '</td>';

    HTML += '<td width="' + colAA2 + '" style="text-align:right; background:' + colorniv6 + ';">';
    HTML += valor(AnioAnterior2, AniAntVM, AniAntVP, colorniv6);
    HTML += '</td>';
    HTML += '</tr>';
    return HTML;
}

function mostrarFilasCartera(Cartera) {

    mostrarFilas(Cartera);
    //  if (document.getElementById(Cartera).style.display != 'none') {
    arrayGen = new Array();
    var Negocios = new Array();

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];
        if ($("#selectMostrarPor").val() == '0') {
            if (Cartera == Dato.Cartera && Negocios.indexOf(Dato.Negocio) == -1)
                Negocios.push(Dato.Negocio);
        }
        else {
            if (Cartera == Dato.Cartera && Negocios.indexOf(Dato.Clasificacion) == -1)
                Negocios.push(Dato.Clasificacion);
        }
    }
    for (var indiceNegocios = 0; indiceNegocios < Negocios.length; indiceNegocios++) {
        var FechaActual = 0;
        var negocio = Negocios[indiceNegocios];
        var concepto;
        for (var i = 0; i < Datos.length; i++) {
            var Dato2 = Datos[i];
            if ($("#selectMostrarPor").val() == '0') {
                if (Cartera == Dato2.Cartera && negocio == Dato2.Negocio) {
                    FechaActual += parseFloat(Dato2.FechaActual);
                }
                concepto = 'Negocio';
            }
            else {
                if (Cartera == Dato2.Cartera && negocio == Dato2.Clasificacion) {
                    FechaActual += parseFloat(Dato2.FechaActual);
                }
                concepto = 'Clasificación';
            }
        }
        //arrayGen.push([negocio.toLowerCase() , FechaActual]);
        arrayGen.push(negocio.toLowerCase() + '/' + FechaActual.toString());
    }

    mostrarGrafica(arrayGen, concepto, $("#selectCifrasEn").val(), Cartera);
    mostrarFilas2('Grafica', 'block');
    // }
}

function mostrarFilasNegocio(Negocio) {
    mostrarFilas(Negocio);
    // if (document.getElementById(Negocio).style.display != 'none') {
    arrayGen = new Array();
    var Clasificaciones = new Array();

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];
        var comp;
        if ($("#selectMostrarPor").val() == '0') {
            comp = Dato.Cartera + '-' + Dato.Negocio;
            if (Negocio == comp && Clasificaciones.indexOf(Dato.Clasificacion) == -1)
                Clasificaciones.push(Dato.Clasificacion);
        }
        else {
            comp = Dato.Cartera + '-' + Dato.Clasificacion;
            if (Negocio == comp && Clasificaciones.indexOf(Dato.Rubro) == -1)
                Clasificaciones.push(Dato.Rubro);
        }
    }

    for (var indiceClasificaciones = 0; indiceClasificaciones < Clasificaciones.length; indiceClasificaciones++) {
        var FechaActual = 0;
        var clasificacion = Clasificaciones[indiceClasificaciones];
        for (var i = 0; i < Datos.length; i++) {
            var Dato2 = Datos[i];
            var comp;
            if ($("#selectMostrarPor").val() == '0') {
                comp = Dato2.Cartera + '-' + Dato2.Negocio;
                if (Negocio == comp && clasificacion == Dato2.Clasificacion) {
                    FechaActual += parseFloat(Dato2.FechaActual);
                }
                concepto = 'Clasificación';
            }
            else {
                comp = Dato2.Cartera + '-' + Dato2.Clasificacion;
                if (Negocio == comp && clasificacion == Dato2.Rubro) {
                    FechaActual += parseFloat(Dato2.FechaActual);
                }
                concepto = 'Rubro';
            }
        }
        //arrayGen.push([clasificacion.toLowerCase() , FechaActual]);
        arrayGen.push(clasificacion.toLowerCase() + '/' + FechaActual.toString());
    }

    mostrarGrafica(arrayGen, concepto, $("#selectCifrasEn").val(), Negocio);
    mostrarFilas2('Grafica', 'block');
    //  }
}


function mostrarFilasClasificacion(Clasificacion) {
    mostrarFilas(Clasificacion);
    //  if (document.getElementById(Clasificacion).style.display != 'none') {
    arrayGen = new Array();
    var Rubros = new Array();

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];
        var comp = Dato.Cartera + '-' + Dato.Negocio + '-' + Dato.Clasificacion;
        if (Clasificacion == comp && Rubros.indexOf(Dato.Rubro) == -1)
            Rubros.push(Dato.Rubro);
    }
    for (var indiceRubros = 0; indiceRubros < Rubros.length; indiceRubros++) {
        var FechaActual = 0;
        var rubro = Rubros[indiceRubros];
        for (var i = 0; i < Datos.length; i++) {
            var Dato2 = Datos[i];
            var comp = Dato2.Cartera + '-' + Dato2.Negocio + '-' + Dato2.Clasificacion;
            if (Clasificacion == comp && rubro == Dato2.Rubro) {
                FechaActual += parseFloat(Dato2.FechaActual);
            }
        }
        //arrayGen.push([rubro.toLowerCase() , FechaActual]);
        arrayGen.push(rubro.toLowerCase() + '/' + FechaActual.toString());
    }

    mostrarGrafica(arrayGen, 'Rubro', $("#selectCifrasEn").val(), Clasificacion);
    mostrarFilas2('Grafica', 'block');
    //  }
}

//Cartera + '-' + Clasificacion + '-' + Rubro
function mostrarFilasRubro(Rubro) {
    mostrarFilas(Rubro);
    //if (document.getElementById(Rubro).style.display != 'none') {
    arrayGen = new Array();
    var Productos = new Array();
    var col;
    var concepto = 'Descripción Producto';

    for (var i = 0; i < Datos.length; i++) {
        var Dato = Datos[i];
        var comp;
        if ($("#selectMostrarPor").val() == '0') {
            comp = Dato.Cartera + '-' + Dato.Negocio + '-' + Dato.Clasificacion + '-' + Dato.Rubro;
            if (Rubro == comp && Productos.indexOf(Dato.Producto) == -1)
                Productos.push(Dato.Producto);
        }
        else {
            comp = Dato.Cartera + '-' + Dato.Clasificacion + '-' + Dato.Rubro;
            if (Rubro == comp && Productos.indexOf(Dato.Producto) == -1)
                Productos.push(Dato.Producto);
        }
    }
    for (var indiceProductos = 0; indiceProductos < Productos.length; indiceProductos++) {
        var FechaActual = 0;
        var producto = Productos[indiceProductos];
        for (var i = 0; i < Datos.length; i++) {
            var Dato2 = Datos[i];
            var comp;
            if ($("#selectMostrarPor").val() == '0') {
                comp = Dato2.Cartera + '-' + Dato2.Negocio + '-' + Dato2.Clasificacion + '-' + Dato2.Rubro;
                if (Rubro == comp && producto == Dato2.Producto) {
                    FechaActual += parseFloat(Dato2.FechaActual);
                }
                col = colorniv5;
            }
            else {
                comp = Dato2.Cartera + '-' + Dato2.Clasificacion + '-' + Dato2.Rubro;
                if (Rubro == comp && producto == Dato2.Producto) {
                    FechaActual += parseFloat(Dato2.FechaActual);
                }
                col = colorniv4;
                if ($("#selectMostrarPor").val() == '1') { concepto = 'Descripción Fitir'; }
            }
        }
        //arrayGen.push([producto.toLowerCase() , FechaActual]);
        arrayGen.push(producto.toLowerCase() + '/' + FechaActual.toString());
    }
    mostrarGrafica(arrayGen, concepto, $("#selectCifrasEn").val(), Rubro);
    mostrarFilas2('Grafica', 'block');
    //  }
}

function mostrarFilas2(obj, opcion) {
    if (opcion == 'none')
        $("#" + obj).slideUp('slow');

    else
        $("#" + obj).slideDown('slow');

}

function mostrarFilas(Renglon) {
    var Fila = document.getElementById(Renglon);
    var obj = document.getElementById("img_" + Renglon);
    if (Fila.style.display == 'none') {
        document.getElementById("img_" + Renglon).setAttribute("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
        $(Fila).show();
    }
    else {
        document.getElementById("img_" + Renglon).setAttribute("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
        $(Fila).hide();
    }
}


function mostrarGrafica(datos, concepto, cifrasEnv, tipX) {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.SicreNet.Rep8Columnas.Reporte8C.MostrarGrafica($("#selectCifras").val(), tipX, datos, concepto, cifrasEnv, function (response) {
        if (response.value.indexOf("ErrorCATCH") == -1 && response.value != "") {
            $('#divGraficaReporteFinal').html(response.value);
            mostrarFilas2("Grafica", "block");
        }
        else if (response.value.indexOf("ErrorCATCH") != -1)
            MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");

    });
}