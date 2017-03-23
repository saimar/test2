var etiquetasMeses = null;
var tituloDiapositiva = '';
var numDiapositiva = -1;
var $mytn3 = null;
var reproduciendo = false;
var timerPresentacion = null;
var intervaloMiliSeg = 5000;
function LoadMasterPage() {
    generarEtiquetasPorMes();
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    iniciarDiapositivas();
    $("#dpFechaPeriodoGral").datepicker({ beforeShowDay: renderCalendarCallback });
    ObtenerFechaActual();    
}


function datePickerFechaCalf_SelectionChange() {
    fechaP = $("#dpFechaPeriodoGral").attr("value").split('/')[2] + ',' + $("#dpFechaPeriodoGral").attr("value").split('/')[1] + ',' + $("#dpFechaPeriodoGral").attr("value").split('/')[0];
    var mesSeleccionado = $("#dpFechaPeriodoGral").attr("value").split('/')[1];
    var anioSeleccionado = $("#dpFechaPeriodoGral").attr("value").split('/')[2];
    var fechai = $("#dpFechaPeriodoGral").attr("value");    
    $('#MainContent_hfAnio').val(anioSeleccionado);
    $('#MainContent_hfMes').val(mesSeleccionado);

    //$mytn3.rebuild([{  title: "Image One", thumb: "/images/114x72/9.jpg", img: "/images/920x360/9.jpg" }, {  title: "Image Two",  thumb: "/images/114x72/9.jpg", img: "/images/920x360/9.jpg"  }, { title: "Image Three",  thumb: "/images/114x72/9.jpg",   img: "/images/920x360/9.jpg" }] , 0);
    generarEtiquetasPorMes();
    Waiting(true, "Espere por favor. Cargando Información...");
    cargarDiapositiva();
}

function iniciarDiapositivas() {
    var properties = {
//        skinDir: "skins",        
        width: 1200,
        height: 800,
//        delay: 1000,
//        //skin: "tn3e",
//        skin: "tn3-custom",
//        imageClick: "fullscreen",
//        startWithAlbums: true,
        autoplay: false,
        //timer_start: function () { $mytn3.show("next"); },
//        timerMode:"bar",
        image: {
           // type: "slide",
            load_end: function () { cargarDiapositiva(); },
//            maxZoom: 1.5,
//            crop: true,
//            clickEvent: "dblclick",
//            click:function(){$mytn3.show("next");},
            transitions: [
//            {
//                type: "blinds"
//            }, {
//                type: "grid"
//            }, 
            {
            type: 'grid'
//            ,
//                duration: 10,
//                easing: "easeInQuad",
//                gridX: 1,
//                gridY: 8,
                // flat, diagonal, circle, random
//                sort: "circle",
//                sortReverse: false,
//                diagonalStart: "bl",
                // fade, scale
//                method: "fade",
//                partDuration: 500,//10,
//                partEasing: "easeOutSine",
//                partDirection: "right"
            }]
//            ,
//            defaultTransition: {
//                type: "fade",
//                duration: 250,
//                easing: "swing"
//            }
        }
        
    };
    $mytn3 = $('.mygallery').tn3(
    properties
    ).data('tn3');
}

function nextDiapositiva() {
    $mytn3.show('next');
}

function prevDiapositiva() {
    $mytn3.show('prev');
}

function playStopPresentacion(titulo) {
    if (titulo === 'Start Slideshow') {
        reproduciendo = true;
        playPresentacion();
    }
    else {
        reproduciendo = false;
        stopPresentacion();
    }
}

function playPresentacion() {
    timerPresentacion = setInterval(function () { nextDiapositiva() }, intervaloMiliSeg);
 
}
function stopPresentacion() {
    clearInterval(timerPresentacion);
    timerPresentacion = null;
}

function ObtenerFechaActual() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("PresentacionRiesgos.aspx/GetFechaActual", "POST", null, function (data) {
        $("#dpFechaPeriodoGral").val(data.d); 
        WidtDatePicker();
        filtroFecha();
    });
}

function filtroFecha() {
    var parametrosGetFechasDatePickerXPeriodo = { fechaCalMenos: '', fechaCalMas: '', aplicarMenos: false, aplicarMas: false, index: 0, fechaAnteriorMenos: '', arregloFechas: '', fechaswitch: '' };
    peticionAjax("PresentacionRiesgos.aspx/GetFechasDatePickerFiltro", "POST", parametrosGetFechasDatePickerXPeriodo,
                      function (data) {
                          peticionAjax("PresentacionRiesgos.aspx/GetFechasNoSelect", "POST", null,
                          function (data2) {
                              $("#dpFechaPeriodoGral").attr("accesskey", data2.d.split(":")[2]);
                              Waiting(false, "Espere por favor. Cargando Información...");
                          });
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
    if ($("#dpFechaPeriodoGral").attr("accesskey") == undefined) return;
    if ($.inArray(dmy, $("#dpFechaPeriodoGral").attr("accesskey").split(",")) != -1)
        return [true, "", ""];
    else
        return [false, "", ""];
}

function txtFecha_Onchange() {
    Waiting(true, "Espere por favor. Cargando Información...");
    for (var x = 1; x < 5; x++) {
        $("#spStatusEtapa_" + x).show();
        $("#spStatusEtapa_" + x).attr("class", DeterminaEstatusClassXId("0"));
    }
    cargarDiapositiva();
}

function cargarDiapositiva(obj) {

    var contenedor = $('.contenedorDiapositiva')[0];
    var noDiapositiva = parseInt($(contenedor).attr('id').split('_')[1]);
    numDiapositiva = noDiapositiva;
    //Waiting(true, "Espere por favor. Cargando Información...");    
    switch (noDiapositiva) {
        case 1:
            D1_Portada(noDiapositiva, 1); ////MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);                 
           break;     
        case 2:
            D2_Excesos(noDiapositiva);
            break;
        case 3:
            D3_LineasCreditoRCE(noDiapositiva);
            break;
        case 4:
            D4_LineasCreditoRFF(noDiapositiva);
            break;
        case 5:
            D5_ConsumoRCE(noDiapositiva);
            break;
        case 6:
            D6_ConsumoRFF(noDiapositiva);
            break;
        case 7:
            D7_LCRCEIF(noDiapositiva, 0);
            break;
        case 8:
            D7_LCRCEIF(noDiapositiva, 1);
            break;
        case 9:
            D7_LCRCEIF(noDiapositiva, 2);
            break;
        case 10:
            D7_LCRCEIF(noDiapositiva, 3);
            break;
        case 11:
            D11_LCRFFIF(noDiapositiva, 0);
            break;
        case 12:
            D11_LCRFFIF(noDiapositiva, 1);
            break;
        case 13:
            D11_LCRFFIF(noDiapositiva, 2);
            break;
        case 14:
            D11_LCRFFIF(noDiapositiva, 3);
            break;
        case 15:
            D15_ResumenConsumoRCE_2(noDiapositiva)
            break;
        case 16:
            D15_ResumenConsumoRFF_2(noDiapositiva)
            break;
        case 17:
            D17_DetalleConsumoRCEFINANCIERA(noDiapositiva, 0);
            break;
        case 18:
            D17_DetalleConsumoRCEFINANCIERA(noDiapositiva, 1);
            break;
        case 19:
            D17_DetalleConsumoRCEFINANCIERA(noDiapositiva, 2);
            break;
        case 20:
            D20_DetalleConsumoRFFFINANCIERA(noDiapositiva, 0); //MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            break;
        case 21:
            D20_DetalleConsumoRFFFINANCIERA(noDiapositiva, 1); //MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            break;
        case 22:
            D20_DetalleConsumoRFFFINANCIERA(noDiapositiva, 2); // MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            break;
        case 23:
            D21_Ultimas(noDiapositiva, 0); //MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            break;
        case 24:
            D21_Ultimas(noDiapositiva, 1); //MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            break;
        case 25:
            if (timerPresentacion !== null) { stopPresentacion(); }
            MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            if (reproduciendo == true) { playPresentacion(); }
            break;
        case 26:
            if (timerPresentacion !== null) { stopPresentacion(); }
            MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            if (reproduciendo == true) { playPresentacion(); }
            break;
        case 27:
            if (timerPresentacion !== null) { stopPresentacion(); }
            MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            if (reproduciendo == true) { playPresentacion(); }
            break;
        case 28:
            if (timerPresentacion !== null) { stopPresentacion(); }
            MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            if (reproduciendo == true) { playPresentacion(); }
            break;
        case 29:
            if (timerPresentacion !== null) { stopPresentacion(); }
            MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            if (reproduciendo == true) { playPresentacion(); }
            break;
        case 30:
            if (timerPresentacion !== null) { stopPresentacion(); }
            MostrarMsj('La Diapositiva No: ' + noDiapositiva + ' se encuentra en construcción.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            if (reproduciendo == true) { playPresentacion(); }
            break;
    }
    //Waiting(false, "Espere por favor. Cargando Información...");
    //setTimeout(terminarWait,1000);
    //terminarWait();
}


/******************************************************************* Peticiones Ajax *********************************************************************/
var financiera = '', gubernamental = '', corporativo = '';
function generarArreglos(listaDeJSON) {
    financiera = '';
    gubernamental = '';
    corporativo = '';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var json = listaDeJSON[filas];
        if (json['FVCDescripcionTipoInstitucion'].toString() == 'CORPORATIVO')
            corporativo += json['RCE'].toString().replace(',', '.') + ',';

        if (json['FVCDescripcionTipoInstitucion'].toString() == 'FINANCIERA')
            financiera += json['RCE'].toString().replace(',', '.') + ',';


        if (json['FVCDescripcionTipoInstitucion'].toString() == 'GUBERNAMENTAL')
            gubernamental += json['RCE'].toString().replace(',', '.') + ',';
    }
    corporativo = convertirArrayString2ArrayFloat(corporativo.substring(0, corporativo.length - 1).split(','));
    financiera = convertirArrayString2ArrayFloat(financiera.substring(0, financiera.length - 1).split(','));
    gubernamental = convertirArrayString2ArrayFloat(gubernamental.substring(0, gubernamental.length - 1).split(','));
    redondearDatos();
}

function generarArreglos2(listaDeJSON) {
    financiera = '';
    gubernamental = '';
    corporativo = '';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var json = listaDeJSON[filas];
        if (json['FVCDescripcionTipoInstitucion'].toString() == 'CORPORATIVO')
            corporativo += json['RFF'].toString().replace(',', '.') + ',';

        if (json['FVCDescripcionTipoInstitucion'].toString() == 'FINANCIERA')
            financiera += json['RFF'].toString().replace(',', '.') + ',';


        if (json['FVCDescripcionTipoInstitucion'].toString() == 'GUBERNAMENTAL')
            gubernamental += json['RFF'].toString().replace(',', '.') + ',';
    }
    corporativo = convertirArrayString2ArrayFloat(corporativo.substring(0, corporativo.length - 1).split(','));
    financiera = convertirArrayString2ArrayFloat(financiera.substring(0, financiera.length - 1).split(','));
    gubernamental = convertirArrayString2ArrayFloat(gubernamental.substring(0, gubernamental.length - 1).split(','));
    redondearDatos();
}

function generarArreglosConsumoRCE(listaDeJSON) {
    financiera = '';
    gubernamental = '';
    corporativo = '';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var json = listaDeJSON[filas];
        if (json['TipoInstitucion'].toString() == 'CORPORATIVO')
            corporativo += json['Consumo'].toString().replace(',', '.') + ',';

        if (json['TipoInstitucion'].toString() == 'FINANCIERA')
            financiera += json['Consumo'].toString().replace(',', '.') + ',';


        if (json['TipoInstitucion'].toString() == 'GUBERNAMENTAL')
            gubernamental += json['Consumo'].toString().replace(',', '.') + ',';
    }
    corporativo = convertirArrayString2ArrayFloat(corporativo.substring(0, corporativo.length - 1).split(','));
    financiera = convertirArrayString2ArrayFloat(financiera.substring(0, financiera.length - 1).split(','));
    gubernamental = convertirArrayString2ArrayFloat(gubernamental.substring(0, gubernamental.length - 1).split(','));
    redondearDatos();
}

function setValores() {
    $('#hfMes').val(parseInt($("#datepicker").val().split('/')[1]));
    $('#hfAnio').val(parseInt($("#datepicker").val().split('/')[2]));
}

function htmlDiapositiva(titulo, contenidoHTML, indiceDeDiapositiva) {
    var cad = '';tituloDiapositiva = titulo;
    cad += '<table cellpadding="0" cellspacing="0" border="0" class="tblDiapositiva" id="IDTabla">';
    cad += '<tr style="height:40px">';
    cad += '<td style="width:30%;">';
    cad += '</td>';
    cad += '<td style="width:70%; text-align:right">';
    cad += '<h3><i>Contraloría de Credito&nbsp&nbsp</i></h3>';
    cad += '</td>';
    cad += '</tr>';
    cad += '<tr class="trBaseSuperior"><td colspan="2">&nbsp</td></tr>';
    cad += '<tr class="tblBaseInferior" ><td colspan="2">&nbsp</td></tr>';
    if (titulo == '') {
        cad += '<tr style="height:560px;"><td colspan="2"><center><br /><h1>' + titulo + '</h1><br /><br />' + contenidoHTML + '<br /><br /><div id="divDiapositiva' + indiceDeDiapositiva + 'Grafica" />' + '</center></td></tr>';
        tituloDiapositiva = 'portada'
    }
    else {        
        cad += '<tr style="height:560px;"><td colspan="2"></br><center><br /><h1>' + titulo + '</h1><br />' + contenidoHTML + '<br /><div id="divDiapositiva' + indiceDeDiapositiva + 'Grafica" />' + '</center></td></tr>';
    }    
    cad += '<tr class="piePag" ><td colspan="2">&nbsp</td></tr>';
    cad += '</table>';
    return cad;
    Waiting(false, "Espere por favor. Cargando Información...");
}

function generarTablaDeRegistrosSinFoot(listaDeJSON,noDiapositiva,tipoInstitucion) {
    var rowTotal = false;
    var numero = new Number();
    var cad = '<div class="divContenidoTabla"><table class="dataGridDatos">';
    //cad += '<tr><h4 align="right"><i>Cifras en millones de pesos&nbsp;&nbsp;</i></h4><tr>';
    if (noDiapositiva == 15 || noDiapositiva == 16) {
        if (tipoInstitucion == 'Financieras') {
            cad += '<tr><h4 align="right"><i>Cifras en millones de pesos&nbsp;&nbsp;</i></h4><tr>';
            cad += '<tr><h4 align="left">' + tipoInstitucion + '</h4><tr>';
        }
        else
            cad += '<tr><h4 align="left">' + tipoInstitucion + '</h4><tr>';
     }
    else { cad += '<tr><h4 align="right"><i>Cifras en millones de pesos&nbsp;&nbsp;</i></h4><tr>'; }
    var auxJSON = listaDeJSON[0];

    cad += '<thead>';
    if (noDiapositiva === 3 || noDiapositiva === 4 || noDiapositiva === 5 || noDiapositiva === 6) {
        cad += '<tr>';
        cad += '<th>Año Anterior</th><th>Trimestre Anterior</th><th>Mes Anterior</th><th>Fecha Actual</th><th>Clasificación Lineas Tesoreria</th><th colspan="6">Variaciones</th>';        
        cad += '</tr>';
    }

    if (noDiapositiva >= 7 && noDiapositiva <= 22) {
        cad += headTabla2(auxJSON);
    }
    else if (noDiapositiva >= 23) {
        cad += headTabla3(auxJSON);
    }
    else {
        cad += headTabla1(auxJSON);
    }    
    cad += '</thead>';    
    cad += '<tbody>';
    if (noDiapositiva >= 23) {
        cad += body1(listaDeJSON);
    }
    else {
        for (var filas = 0; filas < listaDeJSON.length; filas++) {
            var json = listaDeJSON[filas];
            if (json['Tipo de Institución'] == 'TOTAL' || json['Tipo de Institución'] == 'Total' || json['Contraparte']=='Total') {
                //cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
                cad += '<tr class="rowPie">'; //cad += '<tr>';
                rowTotal = true;
            }
            else {
                //(rowTotal == true)? '<tr class="rowPie">':
                cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
            }
            for (var element in json) {
                //(rowTotal==true)? cad+='<th style="text-align:' + (parseFloat(json[element]).toString() != "NaN" ? 'right' : 'left;') + '">' :
                cad += '<td style="text-align:' + (parseFloat(json[element]).toString() != "NaN" ? 'right;' : 'left;') + ((noDiapositiva == 12) ? 'font-size:8px;">' :'">');
                
                if (element !== 'Contraparte' && element !== 'Fecha' && element !== 'Tipo' && element !== 'Tipo de Operación' && element !== 'Divisa' && element !== 'Tipo de Institución' && element !== 'Instrumento') {
                    if (json[element] !== '') {
                        if (element === 'Mes Anterior (%)' || element === 'Trimestre Anterior (%)' || element === 'Año Anterior (%)' || element === 'Variación (%)') {
                            numero = parseFloat(json[element]);
                            cad += DevuelveCantidadSeparadaPorComas(numero.toFixed(2), false).toString() + '%';
                        }
                        else {
                            numero = parseFloat(json[element]);
                            cad += DevuelveCantidadSeparadaPorComas(numero.toFixed(2), false).toString();
                        }
                    }
                    else {
                        cad += '0';
                    }
                }
                else {
                    if (element != 'Fecha') {
                        cad += json[element];
                    }
                    else {
                        cad += json[element].split(' ')[0]
                    }
                }
                //cad += (rowTotal==true)?'</th>':'</td>';
                cad+='</td>';
            }
            cad += '</tr>';
            rowTotal = false;
        }
    }
    cad += '</tbody>';

    cad += '</table></div>';
    return cad;
}

function body1(listaDeJSON) {
    var cad = '';
    var contraAnt = '';
    var numRows = 0;
    var filaContra = 1;
    var colorFila = 0;
    var rowColor = '';
    var rowColor1 = '';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        //contraAnt = listaDeJSON[filas].Contraparte;
        if (contraAnt != listaDeJSON[filas].Contraparte) {
            contraAnt = listaDeJSON[filas].Contraparte;
            numRows = contrapartes(contraAnt, listaDeJSON);
            filaContra = 1;
        }
        //cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        cad += '<tr>';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element === 'Contraparte') {
                if (filaContra === 1) {
                    (colorFila % 2 == 0) ? rowColor = 'class="row"' : rowColor = 'class="alternateRow"';
                    cad += '<td style="text-align:' + (parseFloat(json[element]).toString() != "NaN" ? 'right' : 'left;') + '" rowspan="' + numRows + '" ' + rowColor + '>'; //
                    //cad += '<td style="text-align:' + (parseFloat(json[element]).toString() != "NaN" ? 'right' : 'left;') + '" rowspan="' + numRows + '">'; //
                    cad += json[element];
                    //filaContra++;
                    colorFila++;
                }
            }
            else {                                
                (colorFila % 2 == 0) ? rowColor = 'class="alternateRow"' : rowColor = 'class="row"';                
                cad += '<td style="text-align:' + (parseFloat(json[element]).toString() != "NaN" ? 'right' : 'left;') + '" ' + rowColor + ' >';                
                if (element === 'Instrumento') {
                    cad += json[element];
                }
                else {
                    numero = parseFloat(json[element]);
                    cad += DevuelveCantidadSeparadaPorComas(numero.toFixed(2), false).toString();
                }                
            }            
            cad += '</td>';
        }
        filaContra++;
        cad += '</tr>';
        if (filaContra === numRows + 1) {
            var totales = calculoContraAnt(contraAnt, listaDeJSON);

            cad += '<tr class="rowPie"><td style="text-align:center">Total</td><td>&nbsp;</td><td style="text-align:right">' + DevuelveCantidadSeparadaPorComas(totales[0].toFixed(2), false) + '</td>';
            cad += '<td style="text-align:right">' + DevuelveCantidadSeparadaPorComas(totales[1].toFixed(2), false) + '</td>';
            cad+= '<td style="text-align:right">' + DevuelveCantidadSeparadaPorComas(totales[2].toFixed(2),false) + '</td>';
            cad+= '<td style="text-align:right">' + DevuelveCantidadSeparadaPorComas(totales[3].toFixed(2),false) + '</td>';
            cad += '<td style="text-align:right">'+ (totales[2]- totales[0]).toFixed(2)+'</td">';
            cad += '<td style="text-align:right">'+(((totales[2]/totales[0])-1)*100).toFixed(2)+'</td>';
            cad += '<td style="text-align:right">' + (totales[3] - totales[1]).toFixed(2) + '</td>';
            cad += '<td style="text-align:right">' + (((totales[3] / totales[1]) - 1) * 100).toFixed(2) + '</td></tr>';

            totales = null;
        }
    }

    return cad;
}

function contrapartes(contraAnt, listaDeJSON) { 
    var rows =0;
    
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        if (contraAnt === listaDeJSON[filas].Contraparte) {
            rows++
        }        
    }

    return rows;
}
function calculoContraAnt(contraAnt, listaDeJSON) {
    var datosTotal;
    var arrayAux = new Array();
    var nuevoArray = new Array();

    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var json = listaDeJSON[filas];
        if (contraAnt === listaDeJSON[filas].Contraparte) {
            arrayAux.push(listaDeJSON[filas]);
        }
    }
    nuevoArray.push(sumaColumnas('MontoNominalAnt', arrayAux));
    nuevoArray.push(sumaColumnas('ConsumoRFFANt', arrayAux));
    nuevoArray.push(sumaColumnas('MontonominalAct', arrayAux));
    nuevoArray.push(sumaColumnas('ConsumoRFFAct', arrayAux));

    return nuevoArray;
}

function sumaColumnas(nombreColumna, listaDeJSON) {
    var resultado = 0;
    for (var i = 0; i < listaDeJSON.length; i++) {
        var json = listaDeJSON[i];
        resultado += parseFloat(json[nombreColumna]);
    }
    //resultado = DevuelveCantidadSeparadaPorComas(numero.toFixed(2), false).toString()
    //return DevuelveCantidadSeparadaPorComas(resultado.toFixed(2), false);
    return resultado;
}

function headTabla1(auxJSON) {
    var cad = '';
    //var auxJSON = listaDeJSON[0];
    cad += '<tr>';
    for (var encabezados in auxJSON) {
        if (encabezados.toString() !== 'Mes Anterior (%)' && encabezados.toString() !== 'Trimestre Anterior (%)' && encabezados.toString() !== 'Año Anterior (%)') {

            if (encabezados.toString() === 'Dif. Mes Anterior' || encabezados.toString() === 'Dif. Trimestre Anterior' || encabezados.toString() === 'Dif. Año Anterior') {
                cad += '<th style="" colspan="2">';
            }
            else {
                cad += '<th style="">';
            }
            if (encabezados.toString() === 'Año Anterior') {
                cad += generaEtiquetaMes(parseInt($('#MainContent_hfMes').val())) + '-' + (parseInt($('#MainContent_hfAnio').val()) - 1).toString();
            }
            else if (encabezados.toString() === 'Trimestre Anterior') {
                var mesant = parseInt($('#MainContent_hfMes').val()) - 3;
                var anio = parseInt($('#MainContent_hfAnio').val());
                if (mesant === 0) {
                    mesant = 12; anio = anio - 1;
                }
                else if (mesant === -1) {
                    mesant = 11; anio = anio - 1;
                }
                else if (mesant === -2) {
                    mesant = 10; anio = anio - 1;
                }
                cad += generaEtiquetaMes(mesant) + '-' + anio.toString();
            }
            else if (encabezados.toString() === 'Mes Anterior') {
                var mesant = parseInt($('#MainContent_hfMes').val()) - 1;
                var anio = parseInt($('#MainContent_hfAnio').val());
                if (mesant === 0) { mesant = 12;anio = anio - 1;}
                cad += generaEtiquetaMes(mesant) + '-' + anio;
            }
            else if (encabezados.toString() === 'Fecha Actual' || encabezados.toString() === 'Mes Actual') {
                cad += generaEtiquetaMes(parseInt($('#MainContent_hfMes').val())) + '-' + $('#MainContent_hfAnio').val();
            }
            else if (encabezados.toString() === 'Dif. Mes Anterior' || encabezados.toString() === 'Dif. Trimestre Anterior' || encabezados.toString() === 'Dif. Año Anterior') {
                cad += encabezados.toString().split(' ')[1] + ' ' + encabezados.toString().split(' ')[2];
            }
            else {
                cad += encabezados.toString();
            }
            cad += '</th>';
        }
    }
    cad += '</tr>';
    return cad;
}

function headTabla2(auxJSON) {
    var cad = '';

    cad += '<tr>';
    for (var encabezados in auxJSON) {

        if (encabezados.toString() === 'Mes Anterior' || encabezados.toString() === 'Mes Actual' || encabezados.toString() === 'Contraparte') {
            if (encabezados.toString() === 'Mes Anterior' || encabezados.toString() === 'Mes Actual') { cad += '<th style="" rowspan="2" width="94px">'; } else {
                cad += '<th style="" rowspan="2">';
            }
            if (encabezados.toString() === 'Mes Anterior') {
                var mesant = parseInt($('#MainContent_hfMes').val()) - 1;
                var anio = parseInt($('#MainContent_hfAnio').val());
                if (mesant === 0) { mesant = 12; anio = anio - 1; }
                cad += generaEtiquetaMes(mesant) + '-' + anio;
            }
            else if (encabezados.toString() === 'Mes Actual' || encabezados.toString() === 'Mes Actual') {
                cad += generaEtiquetaMes(parseInt($('#MainContent_hfMes').val())) + '-' + $('#MainContent_hfAnio').val();
            }
            else {
                cad += encabezados.toString();
            }
            cad += '</th>';
        }
        else {
            if (encabezados.toString() === 'Variación en Pesos') {
                cad += '<th style="" colspan="2">';
                cad += 'Variación';
                cad += '</th>';
            }
        }
    }
    cad += '</tr>';

    cad += '<tr>';
    for (var encabezados in auxJSON) {        
        if (encabezados.toString() === 'Variación en Pesos') {
            cad += '<th style="" width="65px">';
            cad += '$';
            cad += '</th>';
        }
        if (encabezados.toString() === 'Variación (%)') {
            cad += '<th style="" width="65px">';
            cad += '%';
            cad += '</th>';
        }
    }
    cad += '</tr>';
    return cad;
}

function headTabla3(auxJSON) {
    var cad = '';

    cad += '<tr>';
    for (var encabezados in auxJSON) {

        if (encabezados.toString() === 'Contraparte' || encabezados.toString() === 'Instrumento') {
            cad += '<th style="" rowspan="2">';
            cad += encabezados.toString();
            cad += '</th>';
        }
        else if (encabezados.toString() === 'MontoNominalAnt') {
            cad += '<th style="" colspan="2">';
            var mesant = parseInt($('#MainContent_hfMes').val()) - 1;
            var anio = parseInt($('#MainContent_hfAnio').val());
            if (mesant === 0) { mesant = 12; anio = anio - 1; }
            cad += generaEtiquetaMes(mesant) + '-' + anio;
            cad += '</th>';
        }
        else if (encabezados.toString() === 'MontonominalAct') {
            cad += '<th style="" colspan="2">';
            cad += generaEtiquetaMes(parseInt($('#MainContent_hfMes').val())) + '-' + $('#MainContent_hfAnio').val();
            cad += '</th>';
        }
        else {
            if (encabezados.toString() === 'VariacionNominal') {
                cad += '<th style="" colspan="2">';
                cad += 'Monto Nominal';
                cad += '</th>';
            }
            if (encabezados.toString() === 'VariacionConsumo') {
                cad += '<th style="" colspan="2">';
                cad += 'Consumo RFF';
                cad += '</th>';
            }
        }
    }
    cad += '</tr>';

    cad += '<tr>';
    cad += '<th>Monto Nominal</th><th>Consumo RFF</th><th>Monto Nominal</th><th>Consumo RFF</th><th>Variacion $</th><th>Variacion %</th><th>Variacion $</th><th>Variacion %</th>';
    cad += '</tr>';
    return cad;
}

//--------- MESES

function generaEtiquetaMes(aux) {
    var mes;
    switch (aux) {
        case 1:
            mes = 'Ene';
            break;
        case 2:
            mes = 'Feb';
            break;
        case 3:
            mes = 'Mar';
            break;
        case 4:
            mes = 'Abr';
            break;
        case 5:
            mes = 'May';
            break;
        case 6:
            mes = 'Jun';
            break;
        case 7:
            mes = 'Jul';
            break;
        case 8:
            mes = 'Ago';
            break;
        case 9:
            mes = 'Sep';
            break;
        case 10:
            mes = 'Oct';
            break;
        case 11:
            mes = 'Nov';
            break;
        case 12:
            mes = 'Dic';
            break;
        default:
            mes = 0;
    }
    return mes;
}

function generarEtiquetasPorMes() {
    etiquetasMeses = null;
    etiquetasMeses = new Array();

    var etiqueta = "";
    var mesAux = parseInt($('#MainContent_hfMes').val());
    var anioAux = parseInt($('#MainContent_hfAnio').val());
    anioAux = anioAux - 1;
    for (var i = 0; i < 13; i++) {
        if (mesAux === 13) {
            mesAux = 1;
            anioAux++;
        }
        etiqueta = generaEtiquetaMes(mesAux) + '-' + anioAux;
        etiquetasMeses.push(etiqueta);
        mesAux++;
    }
}

function redondearDatos() {
    var float = new Number();

    for (var i = 0; i < gubernamental.length; i++) {
        float = parseFloat(gubernamental[i].toFixed(2));        
        gubernamental[i] = float;
    }
    for (var i = 0; i < corporativo.length; i++) {
        float = parseFloat(corporativo[i].toFixed(2));
        corporativo[i] = float;
    }
    for (var i = 0; i < financiera.length; i++) {
        float = parseFloat(financiera[i].toFixed(2));
        financiera[i] = float;
    }
}

function ExportarAImagen() {

    $('#IDTabla').tableExport({ type: 'png', escape: 'false', tableName: tituloDiapositiva });
    
}


function btnExportarAImagen(){
    if (numDiapositiva == 3 || numDiapositiva == 4) {
        ExportarAImagen1();
    }
    else if (numDiapositiva == 5 || numDiapositiva == 6) {
        ExportarAImagen2();
    }
    else {
        ExportarAImagen();
    }
}
