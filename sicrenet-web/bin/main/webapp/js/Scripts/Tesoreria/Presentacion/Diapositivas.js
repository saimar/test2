var nombreBase = 'container_'; 
var nombreDeDiapositiva = '';

/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 1 ***********************************************************************/
/*********************************************************************************************************************************************************/

function D1_Portada(noDiapositiva, indiceTable) {
    if (timerPresentacion !== null) {stopPresentacion();}
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    var cadHTML = htmlDiapositiva('', cuerpoTabla(), 19);
    Waiting(false, "Espere por favor. Cargando Información...");
    if (reproduciendo == true) {playPresentacion();}
    $('#' + nombreDeDiapositiva).html(cadHTML);    
}

function cuerpoTabla() {    
    var mesAux = parseInt($('#MainContent_hfMes').val());
    var anioAux = parseInt($('#MainContent_hfAnio').val());

    //var cad = '<div><br/><br/><br/><i><h2>' + generaEtiquetaMes(mesAux) + ' ' + anioAux + '</h2></i>';
    var cad = '<div><span class="portada1">RIESGO DE CRÉDITO DE TESORERIA</span>'
    cad += '<br/><br/><br/><br/><i><span class="portada2">' + generaEtiquetaMes(mesAux) + ' ' + anioAux + '</span></i>';
    cad += '</br><br/><br/><br/><br/>'
    cad += '<i><span class="portada3">PORTAFOLIO DE RIESGO DE CRÉDITO DE TESORERIA</span></i>'
    cad += '</br>'
    cad += '</div>';
    return cad;    
}

/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 2 ***********************************************************************/
/*********************************************************************************************************************************************************/
function D2_Excesos(noDiapositiva) {
    Waiting(true, "Espere por favor. Cargando Información...");    
    if (timerPresentacion !== null) { stopPresentacion(); }      
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    var parametros = {
        anio: $('#MainContent_hfAnio').val(),
        mes: $('#MainContent_hfMes').val()
    };    
    peticionAjax('PresentacionRiesgos.aspx/D2_Excesos',
                "POST",
                parametros,
                D2_ExcesosFinalizada,
                    D2_ExcesosFinalizada);    
}

function D2_ExcesosFinalizada(data) {
    var arrayJSON = obtenerArregloDeJSON(data.d, false); //var arrayJSON = obtenerArregloDeJSON(data.value, false); 
    if (arrayJSON[0].SinDatos != undefined) {
        alert(arrayJSON[0].SinDatos.toString());
        //quitarDivBloqueadorGeneral();
        Waiting(false, "Espere por favor. Cargando Información...");
        if (reproduciendo == true) { playPresentacion(); }
        return;
    }
    var cadHTML = htmlDiapositiva('Excesos de Líneas de Crédito', generarTablaDeRegistrosSinFoot(arrayJSON, 2,''), 2);
    $('#' + nombreDeDiapositiva).html(cadHTML);
    Waiting(false, "Espere por favor. Cargando Información...");
    if (reproduciendo == true) { playPresentacion(); }
}

/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 3 ***********************************************************************/
/*********************************************************************************************************************************************************/

function D3_LineasCreditoRCE(noDiapositiva) {
    Waiting(true, "Espere por favor. Cargando Información...");
    if (timerPresentacion !== null) { stopPresentacion(); }
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    var parametros = {
        anio: $('#MainContent_hfAnio').val(),
        mes: $('#MainContent_hfMes').val()
    };    
    peticionAjax('PresentacionRiesgos.aspx/D3_LineasCreditoRCE',
                "POST",
                parametros,
                D3_LineasCreditoRCEFinalizada,
                D3_LineasCreditoRCEFinalizada);
}

function D3_LineasCreditoRCEFinalizada(data) {

    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    if (arrayJSON[0].SinDatos != undefined) {
        alert(arrayJSON[0].SinDatos.toString());
        //quitarDivBloqueadorGeneral();
        Waiting(false, "Espere por favor. Cargando Información...");
        if (reproduciendo == true) { playPresentacion(); }
        return;
    }
    var cadHTML = htmlDiapositiva('RCE-Líneas Autorizadas', generarTablaDeRegistrosSinFoot(arrayJSON,3,''), 3);
    $('#' + nombreDeDiapositiva).html(cadHTML)
    var parametros = {
        anio: $('#MainContent_hfAnio').val(),
        mes: $('#MainContent_hfMes').val()
    }    
    peticionAjax('PresentacionRiesgos.aspx/D3_LineasCreditoRCE_Grafica',
                "POST",
                parametros,
                D3_LineasCreditoRCE_GraficaFinalizada,
                D3_LineasCreditoRCE_GraficaFinalizada);
}


function D3_LineasCreditoRCE_GraficaFinalizada(data) {
    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    if (arrayJSON[0].SinDatos != undefined) {
        alert(arrayJSON[0].SinDatos.toString());
        Waiting(false, "Espere por favor. Cargando Información...");
        if (reproduciendo == true) { playPresentacion(); } //quitarDivBloqueadorGeneral();
        return;
    }

    generarArreglos(arrayJSON);
//    graficaColumnasBasica('divDiapositiva3Grafica',
//                            'Lineas de Credito RCE',
//                            'Lineas de Credito RCE',
//                            ['Junio-12', 'Julio-12', 'Agosto-12', 'Septiembre-12', 'Octubre-12', 'Noviembre-12', 'Diciembre-12', 'Enero-13'],
    //                            [{ name: 'Gubernamental', data: gubernamental }, { name: 'Corporativo', data: corporativo }, { name: 'Financiera', data: financiera}]);
    graficaColumnasBasica('divDiapositiva3Grafica',
                            'Lineas de Credito RCE',
                            'Lineas de Credito RCE',
                            etiquetasMeses,
                            [{ name: 'Gubernamental', data: gubernamental }, { name: 'Corporativo', data: corporativo }, { name: 'Financiera', data: financiera}]);
    Waiting(false, "Espere por favor. Cargando Información...");
    if (reproduciendo == true) { playPresentacion(); }
}


/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 4 ***********************************************************************/
/*********************************************************************************************************************************************************/
function D4_LineasCreditoRFF(noDiapositiva) {
    Waiting(true, "Espere por favor. Cargando Información...");
    if (timerPresentacion !== null) { stopPresentacion(); }  
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    var parametros = {
        anio: $('#MainContent_hfAnio').val(),
        mes: $('#MainContent_hfMes').val()
    };

    peticionAjax('PresentacionRiesgos.aspx/D4_LineasCreditoRFF',
                "POST",
                parametros,
                D4_LineasCreditoRFFFinalizada,
                D4_LineasCreditoRFFFinalizada);
}

function D4_LineasCreditoRFFFinalizada(data) {

    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    if (arrayJSON[0].SinDatos != undefined) {
        alert(arrayJSON[0].SinDatos.toString());
        //quitarDivBloqueadorGeneral();        
        return;
    }
    var cadHTML = htmlDiapositiva('RFF Lineas Autorizadas', generarTablaDeRegistrosSinFoot(arrayJSON,4,''), 4);
    $('#' + nombreDeDiapositiva).html(cadHTML)
    var parametros = {
        anio: $('#MainContent_hfAnio').val(),
        mes: $('#MainContent_hfMes').val()
    }

    peticionAjax('PresentacionRiesgos.aspx/D4_LineasCreditoRFF_Grafica',
                "POST",
                parametros,
                D4_LineasCreditoRFF_GraficaFinalizada,
                D4_LineasCreditoRFF_GraficaFinalizada);
}


function D4_LineasCreditoRFF_GraficaFinalizada(data) {
    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    if (arrayJSON[0].SinDatos != undefined) {
        alert(arrayJSON[0].SinDatos.toString());
        Waiting(false, "Espere por favor. Cargando Información...");
        if (reproduciendo == true) { playPresentacion(); }
        //quitarDivBloqueadorGeneral();
        return;
    }

    generarArreglos2(arrayJSON);
    graficaColumnasBasica('divDiapositiva4Grafica',
                            'Lineas de Credito RFF',
                            'Lineas de Credito RFF',
                            etiquetasMeses, //['Junio-12', 'Julio-12', 'Agosto-12', 'Septiembre-12', 'Octubre-12', 'Noviembre-12', 'Diciembre-12', 'Enero-13'],
                            [{ name: 'Gubernamental', data: gubernamental }, { name: 'Corporativo', data: corporativo }, { name: 'Financiera', data: financiera}]);
    Waiting(false, "Espere por favor. Cargando Información...");
    if (reproduciendo == true) { playPresentacion(); }
}



/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 5 ***********************************************************************/
/*********************************************************************************************************************************************************/
function D5_ConsumoRCE(noDiapositiva) {
    Waiting(true, "Espere por favor. Cargando Información...");
    if (timerPresentacion !== null) { stopPresentacion(); } 
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    var parametros = {
        anio: $('#MainContent_hfAnio').val(),
        mes: $('#MainContent_hfMes').val()
    };

    peticionAjax('PresentacionRiesgos.aspx/D5_ConsumoRCE',
                "POST",
                parametros,
                D5_ConsumoRCEFinalizada,
                D5_ConsumoRCEFinalizada);
}

function D5_ConsumoRCEFinalizada(data) {

    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    if (arrayJSON[0].SinDatos != undefined) {
        alert(arrayJSON[0].SinDatos.toString());
        //quitarDivBloqueadorGeneral();
        return;
    }
    var cadHTML = htmlDiapositiva('RCE - Consumo BAZ México', generarTablaDeRegistrosSinFoot(arrayJSON,5,''), 5);
    $('#' + nombreDeDiapositiva).html(cadHTML)
    var parametros = {
        anio: $('#MainContent_hfAnio').val(),
        mes: $('#MainContent_hfMes').val()
    }

    peticionAjax('PresentacionRiesgos.aspx/D5_ConsumoRCE_Grafica',
                "POST",
                parametros,
                D5_ConsumoRCE_GraficaFinalizada,
                D5_ConsumoRCE_GraficaFinalizada);
}


function D5_ConsumoRCE_GraficaFinalizada(data) {
    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    if (arrayJSON[0].SinDatos != undefined) {
        alert(arrayJSON[0].SinDatos.toString());
        Waiting(false, "Espere por favor. Cargando Información...");
        if (reproduciendo == true) { playPresentacion(); }
        //quitarDivBloqueadorGeneral();
        return;
    }

    generarArreglosConsumoRCE(arrayJSON);
    graficaColumnasApiladas('divDiapositiva5Grafica', //graficaColumnasApiladas
                            'RCE – Consumo BAZ México',
                            'RCE – Consumo BAZ México',
                            etiquetasMeses, //['Junio-12', 'Julio-12', 'Agosto-12', 'Septiembre-12', 'Octubre-12', 'Noviembre-12', 'Diciembre-12', 'Enero-13'],
                            [{ name: 'Gubernamental', data: gubernamental }, { name: 'Corporativo', data: corporativo }, { name: 'Financiera', data: financiera}]);
    Waiting(false, "Espere por favor. Cargando Información...");
    if (reproduciendo == true) { playPresentacion(); }
}

/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 6 ***********************************************************************/
/*********************************************************************************************************************************************************/
function D6_ConsumoRFF(noDiapositiva) {
    Waiting(true, "Espere por favor. Cargando Información...");
    if (timerPresentacion !== null) { stopPresentacion(); }   
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    var parametros = {
        anio: $('#MainContent_hfAnio').val(),
        mes: $('#MainContent_hfMes').val()
    };

    peticionAjax('PresentacionRiesgos.aspx/D6_ConsumoRFF',
                "POST",
                parametros,
                D6_ConsumoRFFFinalizada,
                D6_ConsumoRFFFinalizada);    
}

function D6_ConsumoRFFFinalizada(data) {

    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    if (arrayJSON[0].SinDatos != undefined) {
        alert(arrayJSON[0].SinDatos.toString());
        //quitarDivBloqueadorGeneral();
        return;
    }
    var cadHTML = htmlDiapositiva('RFF - Consumo BAZ México', generarTablaDeRegistrosSinFoot(arrayJSON,6,''), 6);
    $('#' + nombreDeDiapositiva).html(cadHTML)
    var parametros = {
        anio: $('#MainContent_hfAnio').val(),
        mes: $('#MainContent_hfMes').val()
    }

    peticionAjax('PresentacionRiesgos.aspx/D6_ConsumoRFF_Grafica',
                    "POST",
                    parametros,
                    D6_ConsumoRFF_GraficaFinalizada,
                    D6_ConsumoRFF_GraficaFinalizada);
}


function D6_ConsumoRFF_GraficaFinalizada(data) {
    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    if (arrayJSON[0].SinDatos != undefined) {
        alert(arrayJSON[0].SinDatos.toString());
        //quitarDivBloqueadorGeneral();
        Waiting(false, "Espere por favor. Cargando Información...");
        if (reproduciendo == true) { playPresentacion(); }
        return;
    }

    generarArreglosConsumoRCE(arrayJSON);
    graficaColumnasApiladas('divDiapositiva6Grafica', //graficaColumnasApiladas
                            'RFF – Consumo BAZ México',
                            'RFF – Consumo BAZ México',
                            etiquetasMeses, //['Junio-12', 'Julio-12', 'Agosto-12', 'Septiembre-12', 'Octubre-12', 'Noviembre-12', 'Diciembre-12', 'Enero-13'],
                            [{ name: 'Gubernamental', data: gubernamental }, { name: 'Corporativo', data: corporativo }, { name: 'Financiera', data: financiera}]);

    Waiting(false, "Espere por favor. Cargando Información...");
    if (reproduciendo == true) { playPresentacion(); }
}


/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 7,8,9,10 ***********************************************************************/
/*********************************************************************************************************************************************************/
var data_D7_LCRCEIF = null;
function D7_LCRCEIF(noDiapositiva, indiceTable) {
    Waiting(true, "Espere por favor. Cargando Información...");
    if (timerPresentacion !== null) { stopPresentacion(); }    
    data_D7_LCRCEIF = null;
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    if (data_D7_LCRCEIF == null) {
        var parametros = {
            anio: $('#MainContent_hfAnio').val(),
            mes: $('#MainContent_hfMes').val(),
            indiceTabla: indiceTable
        };
        peticionAjax('PresentacionRiesgos.aspx/D7_LCRCEIF',
                "POST",
                parametros, D7_LCRCEIFFinalizada,
                null);
    }
    else D7_LCRCEIFFinalizada();

    function D7_LCRCEIFFinalizada(data) {
        if (data_D7_LCRCEIF == null) data_D7_LCRCEIF = data;
        var arrayJSON = obtenerArregloDeJSON(data_D7_LCRCEIF.d.split("%&&%")[indiceTable], false);
        if (arrayJSON[0].SinDatos != undefined) {
            alert(arrayJSON[0].SinDatos.toString());
            Waiting(false, "Espere por favor. Cargando Información...");
            if (reproduciendo == true) { playPresentacion(); }
            return;
        }
        //var cadHTML = htmlDiapositiva('D' + noDiapositiva + '_LCRCEIF', generarTablaDeRegistrosSinFoot(arrayJSON), noDiapositiva);
        var cadHTML = '';
        switch(indiceTable){
            case 0:
                cadHTML = htmlDiapositiva('RCE - Lineas Autorizadas Financieras', generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,''), noDiapositiva);
                break;
            case 1:
                cadHTML = htmlDiapositiva('RCE - Lineas Autorizadas Financieras (Otros)', generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,''), noDiapositiva);
                break;
            case 2:
                cadHTML = htmlDiapositiva('RCE - Lineas Autorizadas Corporativas', generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,''), noDiapositiva);
                break;
            case 3:
                cadHTML = htmlDiapositiva('RCE - Lineas Autorizadas Gobierno', generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,''), noDiapositiva);
                break;
        }
        $('#' + nombreDeDiapositiva).html(cadHTML);
        Waiting(false, "Espere por favor. Cargando Información...");
        if (reproduciendo == true) { playPresentacion(); }
    }
}


/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 11,12,13,14 **********************************************************************/
/*********************************************************************************************************************************************************/
var data_D11_LCRFFIF = null;
function D11_LCRFFIF(noDiapositiva, indiceTable) {
    Waiting(true, "Espere por favor. Cargando Información...");
    if (timerPresentacion !== null) { stopPresentacion(); }    
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    if (data_D11_LCRFFIF == null) {
        var parametros = {
            anio: $('#MainContent_hfAnio').val(),
            mes: $('#MainContent_hfMes').val()
        };
        peticionAjax('PresentacionRiesgos.aspx/D11_LCRFFIF',
                    "POST",
                    parametros, D11_LCRFFIFFinalizada,
                    null);
    }
    else
        D11_LCRFFIFFinalizada();


    function D11_LCRFFIFFinalizada(data) {
        if (data_D11_LCRFFIF == null) data_D11_LCRFFIF = data;
        var arrayJSON = obtenerArregloDeJSON(data_D11_LCRFFIF.d.split("%&&%")[indiceTable], false);
        if (arrayJSON[0].SinDatos != undefined) {
            alert(arrayJSON[0].SinDatos.toString());
            Waiting(false, "Espere por favor. Cargando Información...");
            if (reproduciendo == true) { playPresentacion(); }
            return;
        }
        //var cadHTML = htmlDiapositiva('D' + noDiapositiva + '_LCRFFIF', generarTablaDeRegistrosSinFoot(arrayJSON), noDiapositiva);
        var cadHTML = '';
        switch(indiceTable){
            case 0:
                cadHTML = htmlDiapositiva('RFF - Lineas Autorizadas Financieras', generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,''), noDiapositiva);
                break;
            case 1:
                cadHTML = htmlDiapositiva('RFF - Lineas Autorizadas Financieras (Otros)', generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,''), noDiapositiva);
                break;
            case 2:
                cadHTML = htmlDiapositiva('RFF - Lineas Autorizadas Corporativas', generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,''), noDiapositiva);
                break;
            case 3:
                cadHTML = htmlDiapositiva('RFF - Lineas Autorizadas Gobierno', generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,''), noDiapositiva);
                break;
        }
        $('#' + nombreDeDiapositiva).html(cadHTML);
        Waiting(false, "Espere por favor. Cargando Información...");
        if (reproduciendo == true) { playPresentacion(); }
    }
}
/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 15 **********************************************************************/
/*********************************************************************************************************************************************************/
function D15_ResumenConsumoRCE_2(noDiapositiva) {
    var tipoInstitucion = new Array('Financieras', 'Coorporativo', 'Gubernamental');
    Waiting(true, "Espere por favor. Cargando Información...");
    if (timerPresentacion !== null) { stopPresentacion(); }  
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    var parametros = {
        anio: $('#MainContent_hfAnio').val(),
        mes: $('#MainContent_hfMes').val()
    };
    peticionAjax('PresentacionRiesgos.aspx/D15_ResumenConsumoRCE_2',
            "POST",
            parametros,
            function D15_ResumenConsumoRCE_2Finalizada(data) {
                var cadena = '';
                for (var i = 0; i < 3; i++) {
                    var arrayJSON = obtenerArregloDeJSON(data.d.split("%&&%")[i], false);
                    if (arrayJSON[0].SinDatos != undefined) {
                        alert(arrayJSON[0].SinDatos.toString());
                        Waiting(false, "Espere por favor. Cargando Información...");
                        if (reproduciendo == true) { playPresentacion(); }
                        return;
                    }
                    cadena += generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,tipoInstitucion[i]);
                    if (i == 2) {
                        //var cadHTML = htmlDiapositiva('D' + noDiapositiva + '_LCRFFIF', cadena, noDiapositiva);
                        var cadHTML = htmlDiapositiva('RCE - Consumo BAZ México', cadena, noDiapositiva);
                        $('#' + nombreDeDiapositiva).html(cadHTML)                        
                    }
                }
                Waiting(false, "Espere por favor. Cargando Información...");
                if (reproduciendo == true) { playPresentacion(); }
            },
            null);
}
/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 16 **********************************************************************/
/*********************************************************************************************************************************************************/
function D15_ResumenConsumoRFF_2(noDiapositiva) {
    var tipoInstitucion = new Array('Financieras', 'Coorporativo', 'Gubernamental');
    Waiting(true, "Espere por favor. Cargando Información...");
    if (timerPresentacion !== null) { stopPresentacion(); }  
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    var parametros = {
        anio: $('#MainContent_hfAnio').val(),
        mes: $('#MainContent_hfMes').val()
    };
    peticionAjax('PresentacionRiesgos.aspx/D15_ResumenConsumoRFF_2',
            "POST",
            parametros,
            function D15_ResumenConsumoRFF_2Finalizada(data) {
                var cadena = '';
                for (var i = 0; i < 3; i++) {
                    var arrayJSON = obtenerArregloDeJSON(data.d.split("%&&%")[i], false);
                    if (arrayJSON[0].SinDatos != undefined) {
                        alert(arrayJSON[0].SinDatos.toString());
                        Waiting(false, "Espere por favor. Cargando Información...");
                        if (reproduciendo == true) { playPresentacion(); }
                        return;
                    }
                    cadena += generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,tipoInstitucion[i]);
                    if (i == 2) {
                        var cadHTML = htmlDiapositiva('RFF - Consumo BAZ México', cadena, noDiapositiva);
                        $('#' + nombreDeDiapositiva).html(cadHTML)
                    }
                }
                Waiting(false, "Espere por favor. Cargando Información...");
                if (reproduciendo == true) { playPresentacion(); }
            },
            null);
}
/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 17,18,19 **********************************************************************/
/*********************************************************************************************************************************************************/
var data_D17_DetalleConsumoRCEFINANCIERA = null;
function D17_DetalleConsumoRCEFINANCIERA(noDiapositiva, indiceTable) {
    Waiting(true, "Espere por favor. Cargando Información...");
    if (timerPresentacion !== null) { stopPresentacion(); }   
    var titulo = '';
    data_D17_DetalleConsumoRCEFINANCIERA = null;
    if(indiceTable===0) titulo='Consumo RCE - Financieras';
    else if (indiceTable === 1) titulo = 'Consumo RCE - Corporativo';
    else if (indiceTable === 2) titulo = 'Consumo RCE - Gubernamental';
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    if (data_D17_DetalleConsumoRCEFINANCIERA == null) {
        var parametros = {
            anio: $('#MainContent_hfAnio').val(),
            mes: $('#MainContent_hfMes').val()
        };
        peticionAjax('PresentacionRiesgos.aspx/D17_DetalleConsumoRCEFINANCIERA',
                    "POST",
                    parametros, D17_DetalleConsumoRCEFINANCIERAFinalizada,
                    null);
    }
    else
        D17_DetalleConsumoRCEFINANCIERAFinalizada();

    function D17_DetalleConsumoRCEFINANCIERAFinalizada(data) {
        if (data_D17_DetalleConsumoRCEFINANCIERA == null) data_D17_DetalleConsumoRCEFINANCIERA = data;
        var arrayJSON = obtenerArregloDeJSON(data_D17_DetalleConsumoRCEFINANCIERA.d.split("%&&%")[indiceTable], false);
        if (arrayJSON[0].SinDatos != undefined) {
            alert(arrayJSON[0].SinDatos.toString());
            Waiting(false, "Espere por favor. Cargando Información...");
            if (reproduciendo == true) { playPresentacion(); }
            return;
        }
        //var cadHTML = htmlDiapositiva('Consumo RCE - Financieras', generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva), noDiapositiva);
        var cadHTML = htmlDiapositiva(titulo, generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,''), noDiapositiva);
        $('#' + nombreDeDiapositiva).html(cadHTML)
        Waiting(false, "Espere por favor. Cargando Información...");
        if (reproduciendo == true) { playPresentacion(); }
    }
}


/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 20,21,22 **********************************************************************/
/*********************************************************************************************************************************************************/
var data_D20_DetalleConsumoRFFFINANCIERA = null;
function D20_DetalleConsumoRFFFINANCIERA(noDiapositiva, indiceTable) {
    Waiting(true, "Espere por favor. Cargando Información...");
    if (timerPresentacion !== null) { stopPresentacion(); }     
    var titulo = '';
    data_D20_DetalleConsumoRFFFINANCIERA = null;
    if (indiceTable === 0) titulo = 'Consumo RFF - Financieras';
    else if (indiceTable === 1) titulo = 'Consumo RFF - Corporativo';
    else if (indiceTable === 2) titulo = 'Consumo RFF - Gubernamental';
    nombreDeDiapositiva = nombreBase + noDiapositiva;
    if (data_D20_DetalleConsumoRFFFINANCIERA == null) {
        var parametros = {
            anio: $('#MainContent_hfAnio').val(),
            mes: $('#MainContent_hfMes').val()
        };
        peticionAjax('PresentacionRiesgos.aspx/D20_DetalleConsumoRFFFINANCIERA',
                    "POST",
                    parametros, D20_DetalleConsumoRFFFINANCIERAFinalizada,
                    null);
    }
    else
        D20_DetalleConsumoRFFFINANCIERAFinalizada();

    function D20_DetalleConsumoRFFFINANCIERAFinalizada(data) {
        if (data_D20_DetalleConsumoRFFFINANCIERA == null) data_D20_DetalleConsumoRFFFINANCIERA = data;
        var arrayJSON = obtenerArregloDeJSON(data_D20_DetalleConsumoRFFFINANCIERA.d.split("%&&%")[indiceTable], false);
        if (arrayJSON[0].SinDatos != undefined) {
            alert(arrayJSON[0].SinDatos.toString());
            Waiting(false, "Espere por favor. Cargando Información...");
            if (reproduciendo == true) { playPresentacion(); }
            return;
        }
        //var cadHTML = htmlDiapositiva('Consumo RFF - Financieras', generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva), noDiapositiva);
        var cadHTML = htmlDiapositiva(titulo, generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,''), noDiapositiva);
        $('#' + nombreDeDiapositiva).html(cadHTML)
        Waiting(false, "Espere por favor. Cargando Información...");
        if (reproduciendo == true) { playPresentacion(); }
    }
}

/*********************************************************************************************************************************************************/
/******************************************************************* Diapositiva 23,24 **********************************************************************/
/*********************************************************************************************************************************************************/
var data_D21_Ultimas = null;
function D21_Ultimas(noDiapositiva, indiceTable) {
    Waiting(true, "Espere por favor. Cargando Información...");
    if (timerPresentacion !== null) { stopPresentacion(); }    
    var titulo = '';
    data_D21_Ultimas = null;

    if (indiceTable === 0) titulo = 'Detalle Derivados Financieras';
    else if (indiceTable === 1) titulo = 'Detalles Derivados Corporativo';

    nombreDeDiapositiva = nombreBase + noDiapositiva;
    if (data_D21_Ultimas == null) {
        var parametros = {
            anio: $('#MainContent_hfAnio').val(),
            mes: $('#MainContent_hfMes').val()
        };
        peticionAjax('PresentacionRiesgos.aspx/D21_Ultimas',
                    "POST",
                    parametros, D21_UltimasFinalizada,
                    null);
    }
    else
        D21_UltimasFinalizada();

    function D21_UltimasFinalizada(data) {
        if (data_D21_Ultimas == null) data_D21_Ultimas = data;
        var arrayJSON = obtenerArregloDeJSON(data_D21_Ultimas.d.split("%&&%")[indiceTable], false);
        if (arrayJSON[0].SinDatos != undefined) {
            alert(arrayJSON[0].SinDatos.toString());
            Waiting(false, "Espere por favor. Cargando Información...");
            if (reproduciendo == true) { playPresentacion(); }
            return;
        }
        //var cadHTML = htmlDiapositiva('Consumo RFF - Financieras', generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva), noDiapositiva);
        var cadHTML = htmlDiapositiva(titulo, generarTablaDeRegistrosSinFoot(arrayJSON, noDiapositiva,''), noDiapositiva);
        $('#' + nombreDeDiapositiva).html(cadHTML)
        Waiting(false, "Espere por favor. Cargando Información...");
        if (reproduciendo == true) { playPresentacion(); }
    }
}
