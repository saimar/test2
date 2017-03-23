$(function () {
    $(".VentanaFlotante").dialog({
        height: 140,
        modal: true,
        autoOpen: false,
        resizable: false,
        position: 'center', 
    });
});

$(function () {
    $(".VentanaFlotanteResize").dialog({
        height: 140,
        modal: true,
        autoOpen: false,
        resizable: true
    });
});

$(function () {
    $(".divBloqueadorLoading").dialog({
        height: 140,
        modal: true,
        autoOpen: false,
        closeOnEscape: false,
        show: "slow",
        draggable: false
    }); 
});

$(function () {
    $(".divBarPaises").dialog({
        height: 150,
        width: 600,
        modal: true,
        autoOpen: false,
        closeOnEscape: false,
        show: "slow",
        draggable: false
    }); 
});


function Waiting(mostrar, msj) {
    if (mostrar && $("#divBloqueador").attr("lang") == "aa") {
        $("#divBloqueador").parent().children(0).hide();
        $("#divBloqueador").dialog("open");
        var styleLoading = $(".ui-widget-overlay").attr("style") + "background: #000;";
        $(".ui-widget-overlay").attr("style", styleLoading);
        $("#msjLoading").html("");
        $("#msjLoading").html(msj);
        $("#divBloqueador").attr("lang", "ab");
        $("#divBloqueador").show();
        // if($(".ui-widget-overlay").attr("style")!=undefined && $(".ui-widget-overlay").attr("style").indexOf("none")!=-1)  $(".ui-widget-overlay").show() 
    }
    else if (!mostrar && $("#divBloqueador").attr("lang") == "ab") {
        $("#divBloqueador").attr("lang", "aa");
        $("#divBloqueador").dialog("close");
        //if( $(".ui-widget-overlay").attr("style")!=undefined && $(".ui-widget-overlay").attr("style").indexOf("block")!=-1)$(".ui-widget-overlay").hide();
        // clearTimeout(timeMostrarLoading);  
    }
}


function terminarWait() {
    Waiting(false, "Espere por favor. Cargando Información...");
}
function terminarWaitVtn(nameBloqueador) {
    WaitingVtn(nameBloqueador, false, false, "");
}


function AgregarVtnFlotante_DG(divVentana, IdCtrls, titulo, msj, contenido, alto, ancho, visibleSi, visibleNo, txtSi, txtNo, funcionOk) {
    var cadena = ' <div class="divVtnsFlotantes" style="width: 100%; height: 100%; overflow: hidden; text-align: center;font-size:12px">' + msj + contenido;
    //cadena += "</div>";

    $("#" + divVentana).empty();
    $("#" + divVentana).html(cadena);
    $("#" + divVentana).dialog("option", "title", titulo);
    $("#" + divVentana).dialog("option", "width", ancho);
    $("#" + divVentana).dialog("option", "height", alto);
    $("#" + divVentana).dialog("open");
    var styleLoading = $(".ui-widget-overlay").attr("style") + "background: #000;";
    $(".ui-widget-overlay").attr("style", styleLoading);
    if (visibleSi || visibleNo)
        $("#" + divVentana).dialog("option", "buttons", visibleSi && visibleNo ? [{ text: txtSi, click: funcionOk }, { text: txtNo, click: function () { $(this).dialog("close"); } }] : (visibleSi ? [{ text: txtSi, click: funcionOk }] : [{ text: txtNo, click: function () { $(this).dialog("close"); } }]));
    $(".ui-button-text").attr("id", IdCtrls);
}


function AgregarVtnFlotante(divVentana, IdCtrls, titulo, msj, contenido, alto, ancho, visibleSi, visibleNo, txtSi, txtNo, funcionOk) {
    var cadena = ' <div class="divVtnsFlotantes" style="width: 100%; height: 100%; overflow: hidden; text-align: center;font-size:12px">' + msj + contenido;
    //cadena += "</div></div>";
   
    $("#" + divVentana).empty();
    $("#" + divVentana).html(cadena);
    $("#" + divVentana).dialog("option", "title", titulo);
    $("#" + divVentana).dialog("option", "width", ancho);
    $("#" + divVentana).dialog("option", "height", alto);
    $("#" + divVentana).dialog("open");
    var styleLoading = $(".ui-widget-overlay").attr("style") + "background: #000;";
    $(".ui-widget-overlay").attr("style", styleLoading);
    if (visibleSi || visibleNo)
        $("#" + divVentana).dialog("option", "buttons", visibleSi && visibleNo ? [{ text: txtSi, click: funcionOk }, { text: txtNo, click: function () { $(this).dialog("close"); } }] : (visibleSi ? [{ text: txtSi, click: funcionOk }] : [{ text: txtNo, click: function () { $(this).dialog("close"); } }]));
    $(".ui-button-text").attr("id", IdCtrls);
}



function MostrarMsj(msj, titulo, visibletxtSi, visibletxtNo, visibleCancelar, txtSi, txtNo, txtCancelar, ancho, alto, funcionSi, funcionNo, funcionCancelar,divVentanaMsj) {
    var cadena = ' <div style="width: 100%; height: 100%; overflow: hidden; text-align: center;font-size:12px;text-align: left;"></br>' + msj;
    cadena += "</div>"; 
    $(divVentanaMsj==undefined ?"#divVentanaMensajes":"#"+divVentanaMsj).empty();
    $(divVentanaMsj==undefined ?"#divVentanaMensajes":"#"+divVentanaMsj).html(cadena);
    $(divVentanaMsj==undefined ?"#divVentanaMensajes":"#"+divVentanaMsj).dialog("option", "title", titulo);
    $(divVentanaMsj==undefined ?"#divVentanaMensajes":"#"+divVentanaMsj).dialog("option", "width", ancho);
    $(divVentanaMsj==undefined ?"#divVentanaMensajes":"#"+divVentanaMsj).dialog("option", "height", alto);
    $(divVentanaMsj==undefined ?"#divVentanaMensajes":"#"+divVentanaMsj).dialog("open");
    var styleLoading = $(".ui-widget-overlay").attr("style") + "background: #000;";
    $(".ui-widget-overlay").attr("style", styleLoading);
    if (visibletxtSi || visibletxtNo)
        $(divVentanaMsj==undefined ?"#divVentanaMensajes":"#"+divVentanaMsj).dialog("option", "buttons", visibletxtSi && visibletxtNo && visibleCancelar ? [{ text: txtSi, click: funcionSi }, { text: txtNo, click: (funcionNo == null ? function () { $(this).dialog("close"); } : funcionNo) }, { text: txtCancelar, click: funcionCancelar}] : (visibletxtSi && visibletxtNo ? [{ text: txtSi, click: funcionSi }, { text: txtNo, click: (funcionNo == null ? function () { $(this).dialog("close"); } : funcionNo)}] : (visibletxtSi && visibleCancelar ? [{ text: txtSi, click: funcionSi }, { text: txtCancelar, click: funcionCancelar}] : (visibletxtSi ? [{ text: txtSi, click: funcionSi}] : (visibletxtNo ? [{ text: txtNo, click: (funcionNo == null ? function () { $(this).dialog("close"); } : funcionNo)}] : [{ text: txtCancelar, click: funcionCancelar}])))));
}

function AgregarVtnFlotanteConHTML(divVentana, IdCtrls, titulo, msj, contenido, alto, ancho, visibleSi, visibleNo, txtSi, txtNo, funcionOk) {
    var cadena = ' <div class="divVtnsFlotantes" style="width: 100%; height: 100%; overflow: hidden; text-align: center;font-size:12px"></br>' + msj + contenido;
    cadena += "</div>";
   //$("#" + divVentana).empty();
    //$("#" + divVentana).html(cadena);
    $("#" + divVentana).dialog("option", "title", titulo);
    $("#" + divVentana).dialog("option", "width", ancho);
    $("#" + divVentana).dialog("option", "height", alto);
    $("#" + divVentana).dialog("open");
    var styleLoading = $(".ui-widget-overlay").attr("style") + "background: #000;";
    $(".ui-widget-overlay").attr("style", styleLoading);
    if (visibleSi || visibleNo)
        $("#" + divVentana).dialog("option", "buttons", visibleSi && visibleNo ? [{ text: txtSi, click: funcionOk }, { text: txtNo, click: function () { $(this).dialog("close"); } }] : (visibleSi ? [{ text: txtSi, click: funcionOk}] : [{ text: txtNo, click: function () { $(this).dialog("close"); } }]));
    $(".ui-button-text").attr("id", IdCtrls);

}

function WaitingVtn(idDivBloq, mostrarBloqueador, mostrarImg, txtmsj) {
    if (mostrarBloqueador) {
        $("#" + idDivBloq).show();
        $("#" + idDivBloq).html("");
        var cadena = "";
        if (mostrarImg)
            cadena += ' <img alt="a" id="imgVtnLoading" src="../../Images/PanelDeControl/loading2.gif" style="height: 30px;width: 30px; margin-top: 24%" /><div id="msjLoading" style="text-align: center; color: rgb(219, 219, 219)">' + txtmsj + '</div>';
        $("#" + idDivBloq).html(cadena);
    }
    else {
        $("#" + idDivBloq).hide();
    }
}


function ExisteItemEnArreglo(elemento, arregloIterar) {
    var existe = false;
    for (var i = 0; i < arregloIterar.length; i++) {
        if (arregloIterar[i].split('&&')[0] == elemento) {
            existe = true;
            break;
        }
    }
    return existe;
}

function DevuelveIndiceDeElementoExistente(elemento, arregloIterar) {
    var indexGet = -1;
    for (var i = 0; i < arregloIterar.length; i++) {
        if (arregloIterar[i].split('&&')[0] == elemento) {
            indexGet = i;
            break;
        }
    }
    return indexGet;
}

function DevuelveIndexDeElementoExistente(elemento, arregloIterar,posicion) {
    var indexGet = -1;
    for (var i = 0; i < arregloIterar.length; i++) {
        if (arregloIterar[i].split('&&')[posicion] == elemento) {
            indexGet = i;
            break;
        }
    }  
    return indexGet;
}

function DevuelveIndexExisteItemEnArreglo(elemento, Defi) {
    var existe = -1;
    for (var i = 0; i < Defi.length; i++) {
        if (Defi[i].split('&&')[0] == elemento) {
            existe = i;
            break;
        }
    }
    return existe;
}


/* Agregar un nuevo evento a cualquier elemento */
function nuevoEvento(elemento, evento, funcion) {
    try {
        if (elemento.addEventListener)
            elemento.addEventListener(evento, funcion, false);
        else
            elemento.attachEvent("on" + evento, funcion);
    } catch (e) {
        //  alert("No se pudo agregar el evento\n" + e.name + " - " + e.message);
    }
}

function WidtDatePicker() {
    if(document.getElementById("ui-datepicker-div")!=null)document.getElementById("ui-datepicker-div").style.width = "168px";
    setTimeout(WidtDatePicker, 100);
}

function replaceAll(text, busca, reemplaza) {
    while (text.toString().indexOf(busca) != -1)
        text = text.toString().replace(busca, reemplaza);
    return text;
}

function generarTablaDeRegistrosSinFoot1(listaDeJSON, alineacion,idtabla) {
    var cad = '<div class="divContenidoTabla" style="width:auto;"><table id="'+idtabla+'"  style="width: 100%;" class="tablesorter">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    for (var encabezados in auxJSON) {
    if(encabezados!="clear"){
        cad +=  '<th style="text-align: center;">';
        cad += (encabezados == "FVCComentario" ? "Comentario" : encabezados.toString());
        cad += '</th>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element == "FUENTE DE CARTERA" && json[element].indexOf("TOTAL") != -1) {
                indexAux += filas.toString() + ",";
            }
        }
    }
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            //alert(element);
           if (element != 'clear' ){
            if (element == 'Monto' || element == 'Regs' || element == 'Reproceso') {
                cad += '<td style="text-align:right;">';
                cad += DevuelveCantidadSeparadaPorComas(json[element]);
            }
            else if (element == 'DIF CAP TEORICO - CAP REAL') {
                cad += '<td style="text-align:right;font-weight:bold;color:Green">';
                cad += DevuelveCantidadSeparadaPorComas(json[element]);
            }
            else {
                var cumplio = false;
                if (indexAux != "") {
                    for (var i = 0; i < indexAux.split(',').length - 1; i++) {
                        if (filas == parseInt(indexAux.split(',')[i]))
                            cumplio = true;
                    }
                }
                else cumplio = false;
               if(element =="Parametros"|| element =="IPNombreEquipo"|| element =="Ruta")
                    cad += '<td style="text-align;width: 140px;max-width: 140px;word-wrap: break-word;">';                
                else
                cad += '<td style="text-align:' + (element == "FUENTE DE CARTERA" || element == "METODOLOGíA" ? "left" : alineacion) + ';' + (cumplio ? "font-weight:bold;color:Green" : "font-weight:normal") + '">';
                cad += json[element];
            }
            cad += '</td>';
           }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div>';
    return cad;
}

var theForm = document.forms[0];
if (!theForm) {
    theForm = document.form1;
}
function __doPostBack(eventTarget, eventArgument) {
    var theForm = document.forms[0];
    if (!theForm) {
        theForm = document.form1;
    }
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}

function generarTablaDeRegistrosSinFoot(listaDeJSON, alineacion, nombreColumna) {
    var cad = '<div class="divContenidoTabla" style="width:auto;"><table class="dataGridDatos" style="width: 100%;">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    for (var encabezados in auxJSON) {
        if(encabezados!="clear"){
            cad += '<th style="text-align: center;" class>';
            cad += (encabezados == "FVCComentario" ? "Comentario" : encabezados.toString());
            cad +='</th>';
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var json = listaDeJSON[filas];
        for (var element in json) {
            if ((element == "FUENTE DE CARTERA" || element == "ESTATUS DEL CRÉDITO") && json[element].indexOf("TOTAL") != -1) {
                indexAux += filas.toString() + ",";
            }
        }
    }
    //Calcular el num de Filas para rowSpan
    var arrayNumItems = new Array(); var numeroitems = 0;
    if (nombreColumna != undefined) {
        for (var filas = 0; filas < listaDeJSON.length; filas++) {
            if (filas == 0 || (listaDeJSON[filas][nombreColumna] != listaDeJSON[filas - 1][nombreColumna] && listaDeJSON[filas][nombreColumna] != "")) {
                if (filas > 0) {
                    arrayNumItems.push(numeroitems);
                    numeroitems = 0;
                }
                numeroitems++;
            }
            else
                numeroitems++;
        }
        if (listaDeJSON[filas - 1][nombreColumna] == "" && filas - 1 == listaDeJSON.length - 1)
            numeroitems--;
        arrayNumItems.push(numeroitems);
    }

//    var arrayNumItems = new Array(); var numeroitems = 0;
//    for (var filas = 0; filas < listaDeJSON.length; filas++) {

//        var json = listaDeJSON[filas];
//        var i = 0;
//        for (var element in json) {
//            if ((i == 0 && filas == 0) || (i == 0 && json[element] != listaDeJSON[filas - 1].METODOLOGíA) && json[element] != "") {
//                if (filas > 0) {
//                    arrayNumItems.push(numeroitems);
//                    numeroitems = 0;
//                }
//            }
//            else if (json[element] == "" && filas == listaDeJSON.length - 1)
//                numeroitems--;
//            i++;
//        }
//        numeroitems++;
//    }
//    arrayNumItems.push(numeroitems);

    var filasRecorridas = 0;
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        var iFila = 0;
        for (var element in json) {
            //alert(element);
              if(element!="clear"){
                if (element == 'Monto' || element == 'Regs' || element == 'Reproceso' || element== '234. Saldo de la Deuda Total'/*Tabla Saldos PI Base Homologada*/) {
                    cad += '<td style="text-align:right;">';
                    cad += DevuelveCantidadSeparadaPorComas(json[element]);
                }
                else if (element == 'DIF CAP TEORICO - CAP REAL') {
                    cad += '<td style="text-align:right;font-weight:bold;color:Green">';
                    cad += DevuelveCantidadSeparadaPorComas(json[element]);
                }
                else if (((iFila == 0 && filas == 0) || (iFila == 0 && json[element] != listaDeJSON[filas - 1][nombreColumna]) && json[element] != "") && nombreColumna!=undefined) {
                    cad += '<td rowspan="' + arrayNumItems[filasRecorridas] + '" style="text-align: center;padding:2px;color:White;background:#009c96 url(../../Images/Cancelaciones/SeguimientoCancelacion/HeaderDG.gif) repeat-x"">' + json[element] + '</td>';
                    filasRecorridas++;
                }
                else if (json[element] == "CARTERA TOTAL:" || (element == "ESTATUS DEL CRÉDITO" && json[element] == "TOTAL: ")) {// (element == "METODOLOGíA" && json[element] == "") {
                    cad += '<td></td>';
                    cad += '<td style="text-align:left;font-weight:bold;color:Green">' + json[element] + '</td>';
                }
                else if (element != nombreColumna) {
                    var cumplio = false;
                    if (indexAux != "") {
                        for (var i = 0; i < indexAux.split(',').length - 1; i++) {
                            if (filas == parseInt(indexAux.split(',')[i]))
                                cumplio = true;
                        }
                    }
                    else cumplio = false;
                    cad += '<td style="text-align:' + (element == "FUENTE DE CARTERA" || element == "METODOLOGíA" || element == "ESTATUS DEL CRÉDITO" ? "left" : alineacion) + ';' + (cumplio ? "font-weight:bold;color:Green" : "font-weight:normal") + '">';
                    cad += json[element];
                }
                cad += '</td>';
                iFila++;
            }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div>';
    return cad;
} 
 
function generarTablaDeRegistrosGenerica(listaDeJSON,listaEncabezados, lstnombresColumnasMerge,lstColumnasNoVisibles, idTabla,aplicarBlueUltimaFila,widthTabla) {
    var cad = '<div id="divTablaDatos_'+idTabla+'" lang="Sumando" alt="0" dir="0_2" summary="'+lstnombresColumnasMerge+'" style="height:100%;overflow:auto;width: '+widthTabla+'%;"><table id="tblDatos_' + idTabla + '" class="dataGridDatos" style="width: 100%;font-size: 10px;">';
    cad += '<thead>';
    cad += '<tr id="trEncabezado_'+idTabla+'">';
    if(listaEncabezados!=""){
        for (var i = 0; i < listaEncabezados.split(',').length; i++) 
         cad += '<th style="text-align: center;">'+listaEncabezados.split(',')[i]+'</th>';       
     }
     else
     {
        for (var encabezados in listaDeJSON[0]) {
            if (encabezados != "clear" && DevuelveIndiceDeElementoExistenteXSplit(encabezados,lstColumnasNoVisibles)==-1) {
                cad += '<th style="text-align: center;" class>';
                cad += ( encabezados.toString());
                cad += '</th>';
            }
        }
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    cad += '<tbody>';

    var numColumnasSpan = 0;
    for (var i = 0; i < lstnombresColumnasMerge.split(",").length; i++)
        if (lstnombresColumnasMerge.split(",")[i] != "")
            numColumnasSpan++;

    var arrayNumItems = new Array(); var numeroitems = 0;
    var filaIniciaSpan = 0;
    if (lstnombresColumnasMerge != undefined) {
        for (var j = 0; j < numColumnasSpan; j++) {
            numeroitems = 0;
            for (var filas = 0; filas < listaDeJSON.length; filas++) {
                if (filas == 0 || (listaDeJSON[filas][lstnombresColumnasMerge.split(",")[j]] != listaDeJSON[filas - 1][lstnombresColumnasMerge.split(",")[j]] && listaDeJSON[filas][lstnombresColumnasMerge.split(",")[j]] != "")) {
                    if (filas > 0 && numeroitems > 0) {
                        arrayNumItems.push(lstnombresColumnasMerge.split(",")[j] + "," + listaDeJSON[filas - 1][lstnombresColumnasMerge.split(",")[j]] + "&&" + numeroitems + "," + filaIniciaSpan + ",false,1");
                        numeroitems = 0;
                    }
                    numeroitems++;
                    if ((filas == 0 || listaDeJSON[filas][lstnombresColumnasMerge.split(",")[j]] != listaDeJSON[filas - 1][lstnombresColumnasMerge.split(",")[j]]) || listaDeJSON[filas][lstnombresColumnasMerge.split(",")[j]].indexOf('Total') != -1) {
                        filaIniciaSpan = filas;
                        if (listaDeJSON[filas][lstnombresColumnasMerge.split(",")[j]].indexOf('Total') != -1 && numeroitems > 0) {
                            if (!ExisteFilaItemEnArreglo(arrayNumItems, filaIniciaSpan, listaDeJSON[filas][lstnombresColumnasMerge.split(",")[j]]))
                                arrayNumItems.push(lstnombresColumnasMerge.split(",")[j] + "," + listaDeJSON[filas][lstnombresColumnasMerge.split(",")[j]] + "&&" + numeroitems + "," + filaIniciaSpan + ",false," + (numColumnasSpan - j));
                            numeroitems = 0;
                        }
                    }
                }
                else {
                    numeroitems++;
                    if (listaDeJSON[filas][lstnombresColumnasMerge.split(",")[j]].indexOf('Total') != -1) {
                        filaIniciaSpan = filas;
                        if (!ExisteFilaItemEnArreglo(arrayNumItems, filaIniciaSpan, listaDeJSON[filas][lstnombresColumnasMerge.split(",")[j]]))
                            arrayNumItems.push(lstnombresColumnasMerge.split(",")[j] + "," + listaDeJSON[filas][lstnombresColumnasMerge.split(",")[j]] + "&&" + numeroitems + "," + filaIniciaSpan + ",false," + (numColumnasSpan - j));
                        numeroitems = 0;
                    }
                }
            }
            if (listaDeJSON[filas - 1][lstnombresColumnasMerge.split(",")[j]] == "" && filas - 1 == listaDeJSON.length - 1)
                numeroitems--;
            if (numeroitems > 0)
                arrayNumItems.push(lstnombresColumnasMerge.split(",")[j] + "," + listaDeJSON[filas - 2][lstnombresColumnasMerge.split(",")[j]] + "&&" + numeroitems + "," + filaIniciaSpan + ",false,1");
        }
    }

    var arregloColores = new Array("rgba(222, 184, 135, 0.7)", "darkseagreen", "rgba(218, 165, 32, 0.67)", "rgba(165, 42, 42, 0.66)", "rgba(100, 149, 237, 0.55)");
    var posicionColor=-1;
    var filasRecorridas = 0;
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += ((filas % 2 == 0) ? '<tr  class="row" ' : '<tr class="alternateRow" ') + (listaDeJSON[filas]["Comentario"] == "AgregadoO" ? ' style="background:none2;" lang="aa" ' : (listaDeJSON[filas]["Comentario"] == "AgregadoB" ? ' style="background:none1;" lang="ab" ' : '')) + ' id="tr_' + (filas  + '_' + idTabla) + '" ">';
        var json = listaDeJSON[filas];
        var iFila = 0;
        var esTotal = false;
        var esGranTotal = filas == listaDeJSON.length - 1 ? true : false;
        esTotal = esGranTotal ? false : esTotal;
        var agregoColSpanGranTotal = false;
        for (var element in json) {
            if(DevuelveIndiceDeElementoExistenteXSplit(element,lstColumnasNoVisibles)==-1){
            if(element=="FIValidNeg" || element=="FIValidUsr"|| element=="FIModoEstres"){
                var descCheck=(element=="FIValidNeg"?"Validación Negocio": ( element=="FIValidUsr"?"Validación Usuario":"Modo Estres"));
                cad += '<td><input type="checkbox" id="chk_'+element+'" onchange="chkCalidadValidacionesTablero_Change(this,\''+listaDeJSON[filas].FVCClave+'\');" '+(json[element]=="1"? 'checked="checked" ':' ')+'/> '+descCheck+' </td>';
            }
            else{
                    var indiceColumna = DevuelveIndexExisteItemEnArreglo(element + "," + json[element], arrayNumItems);
                    var indiceFila = indiceColumna != -1 ? buscaIndiceFilaDeArreglo(filas, arrayNumItems, element + "," + json[element]) : "-1";
                    var agregarTd = (element == lstnombresColumnasMerge.split(",")[0] || element == lstnombresColumnasMerge.split(",")[1] || (lstnombresColumnasMerge.split(",")[2] == "" ? false : element == lstnombresColumnasMerge.split(",")[2]) || (lstnombresColumnasMerge.split(",")[3] == "" ? false : element == lstnombresColumnasMerge.split(",")[3]) || (lstnombresColumnasMerge.split(",")[4] == "" ? false : element == lstnombresColumnasMerge.split(",")[4])) ? ((json[element] + "").indexOf("Total") == -1 ? true : (!agregoColSpanGranTotal ? true : false)) : true;
                    if ((parseFloat(json[element])).toString() != "NaN" && element != "" && element != "Calificación" && element != "Dispocision" /*&& element != "ID_Num"*/) {
                        cad += '<td style="'+(idTabla =="TblRAZ1"?'background:' + arregloColores[posicionColor] + ';':'')+'/*line-height: 0.5em;*/width:auto;text-align:right;' + (element != lstnombresColumnasMerge.split(",")[0] && element != lstnombresColumnasMerge.split(",")[1] && (lstnombresColumnasMerge.split(",")[2] == "" ? true : element != lstnombresColumnasMerge.split(",")[2]) && (lstnombresColumnasMerge.split(",")[3] == "" ? true : element != lstnombresColumnasMerge.split(",")[3]) && (lstnombresColumnasMerge.split(",")[4] == "" ? true : element != lstnombresColumnasMerge.split(",")[4]) ? '' : '');
                        cad += ' ' + (json[element].toString().indexOf("-") != -1&& json[element].toString().indexOf("/") == -1 ? 'font-weight: bold;color:Red;' : (esTotal ? 'font-weight: bold;color:Green;' : (esGranTotal && aplicarBlueUltimaFila ? 'font-weight: bold;color:Blue;' : ''))) + '">';
                        cad += json[element].indexOf(',') == -1 &&  json[element].indexOf('/') == -1? DevuelveCantidadSeparadaPorComas(json[element]) : json[element];
                    }
                    else if (indiceColumna != -1 && indiceFila != "-1" && filas == parseInt(indiceFila.split(',')[1]) && arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[1].split(',')[2] == "false" && element != "" /*&& element != "ID_Num"*/) {
                    posicionColor++;
                        cad += '<td valign="baseline" '+(element == lstnombresColumnasMerge.split(",")[0]? 'class="tdRowSpan_'+element+ '"':'')+' style=";' + (element != lstnombresColumnasMerge.split(",")[0] && element != lstnombresColumnasMerge.split(",")[1] && (lstnombresColumnasMerge.split(",")[2] == "" ? true : element != lstnombresColumnasMerge.split(",")[2]) && (lstnombresColumnasMerge.split(",")[3] == "" ? true : element != lstnombresColumnasMerge.split(",")[3]) && (lstnombresColumnasMerge.split(",")[4] == "" ? true : element != lstnombresColumnasMerge.split(",")[4]) ? ' ' : ' ');
                        cad += 'text-align: center;width:auto; color:White;background:#009c96 url(../../Images/Cancelaciones/SeguimientoCancelacion/HeaderDG.gif) repeat-x;" rowspan="' + arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[1].split(',')[0] + '" ' +
                            ('colspan="' + (arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[1].split(',')[3])) + '" ><span style="position: relative;top:0px">' + json[element] + '</span> </td>';
                        arrayNumItems[parseInt(indiceFila.split(',')[0])] = arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[0] + "&&" + arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[1].split(',')[0] + "," + arrayNumItems[parseInt(indiceFila.split(',')[0])].split('&&')[1].split(',')[1] + ",true";
                        agregoColSpanGranTotal = true;
                    }
                    else if (indiceColumna == -1 && element != "Comentario" && element != "clear" && element != "" /*&& element != "ID_Num"*/ && agregarTd) {
                        cad += '<td style="width:auto;'+(idTabla =="TblRAZ1"?'background:' + arregloColores[posicionColor] + ';':'')+'/*line-height: 0.5em;*/' + (element != lstnombresColumnasMerge.split(",")[0] && element != lstnombresColumnasMerge.split(",")[1] && (lstnombresColumnasMerge.split(",")[2] == "" ? true : element != lstnombresColumnasMerge.split(",")[2]) && (lstnombresColumnasMerge.split(",")[3] == "" ? true : element != lstnombresColumnasMerge.split(",")[3]) && (lstnombresColumnasMerge.split(",")[4] == "" ? true : element != lstnombresColumnasMerge.split(",")[4]) ? ' ' : '');
                        cad += 'text-align:left; '+(element=="FVCClave"?'text-decoration: underline;color: blue;cursor:pointer;':'')+'" '+
                                (element=="FVCClave"?' title="Clic para Ver Cédula" '+
                                ' onclick="verCedulaCalidadValidaciones(\''+listaDeJSON[filas]["FVCClave"]+'\',\''+listaDeJSON[filas]["FVCSistema"]+'\',\''+listaDeJSON[filas]["FVCNombre"]+'\',false);" ':'')+' >';
                        cad += json[element] != "" ? json[element] : " ";
                    }
                    cad += '</td>';
                    iFila++;
                }
            }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div>';
    return cad;
}

function AddEncabezadoEstaticoGeneric(idTabla, registroEnc, listaNoVisibles) {
    if (document.getElementById('divTablaDatos_' + idTabla) != null && document.getElementById("tblDatos_" + idTabla) != null && document.getElementById("tblDatos_" + idTabla).offsetHeight > document.getElementById('divTablaDatos_' + idTabla).offsetHeight) {
        var lstEncabezados = "";
        for (var encabezados in registroEnc) {
            if (DevuelveIndiceDeElementoExistenteXSplit(encabezados, listaNoVisibles) == -1)
                lstEncabezados += encabezados.toString() + ",";
        }
        $("#trEncabezado_" + idTabla).hide();
        $("#divEncabezadoTemp_" + idTabla).html(AgregaEncabezadoEstaticoGeneric(idTabla, lstEncabezados));
    }
}

function AgregaEncabezadoEstaticoGeneric(idTabla, lstEncabezados) {
    var cad = '<div id="divEncabezado"  style="">';
    cad += '<table id="tblEncabezado_' + idTabla + '" style="font-size: 10px;width: 99.5%;float: left;">  <tbody>';
    cad += '<tr style="color:White;height:25px; background: rgb(0, 128, 128);">';
    //    for (var i = 0; i < lstEncabezados.split(',').length - 1; i++) {
    //        cad += '<td style=" white-space: pre-wrap;text-align: center; background: rgb(0, 128, 128);color: rgb(255, 255, 255);padding-bottom: 4px;';
    //        cad += "width:" + (document.getElementById("tblDatos_" + idTabla).rows[1].cells[i].offsetWidth   /*+ (i == arrayEncabezados.length - 1 ? (document.getElementById("AdjResultsDiv").scrollHeight <= 458 ? -2 : 15) : "")*/) + "px";
    //        cad += '">';
    //        cad += lstEncabezados.split(',')[i];
    //        cad += '</td>';
    //    }
    cad += $("#trEncabezado_" + idTabla).html() + '</tr></tbody></table></div>';
    return cad;
}


function resizeEncabezadoGeneric(idTabla) {
    if (document.getElementById('divTablaDatos_' + idTabla) != null && document.getElementById("tblDatos_" + idTabla) != null && document.getElementById("tblDatos_" + idTabla).offsetHeight > document.getElementById('divTablaDatos_' + idTabla).offsetHeight) {
        $("#divEncabezadoTemp_" + idTabla).css("width", (document.getElementById("divTablaDatos_" + idTabla).offsetWidth - 5) + "px");
        for (var i = 0; i < document.getElementById("tblDatos_" + idTabla).rows[1].cells.length; i++)
            $(document.getElementById("tblEncabezado_" + idTabla).rows[0].cells[i]).css("width", (document.getElementById("tblDatos_" + idTabla).rows[1].cells[i].offsetWidth) + "px");
        setTimeout(function () { resizeEncabezadoGeneric(idTabla) }, 100);
    }
}

function buscaIndiceFilaDeArreglo(fila, arregloIterar, nameCol) {
    var indiceFila = "-1";
    for (var i = 0; i < arregloIterar.length; i++) {
        if (arregloIterar[i].split('&&')[1].split(',')[1] == fila && nameCol == arregloIterar[i].split('&&')[0]) {
            indiceFila = i + "," + arregloIterar[i].split('&&')[1].split(',')[1];
            break;
        }
    }
    return indiceFila;
}

function DevuelveIndiceDeElementoExistenteXSplit(elemento, arregloIterar) {
    var indexGet = -1;
    for (var i = 0; i < arregloIterar.split(',').length; i++) {
        if (arregloIterar.split(',')[i] == elemento) {
            indexGet = i;
            break;
        }
    }
    return indexGet;
}


function FilterInputNumAndAlfa(event, esAlfa,esDouble) {
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    isNumeric = (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || (keyCode == 8 || keyCode == 9 || (keyCode >= 35 && keyCode <= 40) || keyCode == 46) || (esAlfa ? (keyCode >= 65 && keyCode <= 90 || keyCode == 32) : /*null*/(esDouble ? (keyCode == 190 || keyCode == 8|| keyCode==109|| keyCode==110) : (keyCode == 8 ||keyCode==109)));
    modifiers = (event.altKey || event.ctrlKey || event.shiftKey);
    return isNumeric && !modifiers;
}

function DeterminaSiNumParImpar(numero) {
    var result = '';
    if (numero % 2 == 0) result = 'Par';
    else result = 'Impar';
    return result;
}


function DevuelveCantidadSeparadaPorComas(cantidad,ponersubstring) {
    var cantidadDiv = cantidad.toString().indexOf('.') != -1 ? cantidad.toString().split('.')[0] : (cantidad.toString().indexOf(',') != -1 ? cantidad.toString().split(',')[0] : cantidad.toString());
    var cantidadTemp = "";
    var cantidadTempO = "";
    for (var i = cantidadDiv.length - 1; i >= 0; i--) {
        cantidadTemp = cantidadDiv[i] + cantidadTemp;
        if (cantidadTemp.length == 3 && i > 0) {
            cantidadTempO = i>0 && cantidadDiv[i-1]!='-'?( "," + cantidadTemp + cantidadTempO):(i>0 && cantidadDiv[i-1]=='-'?(cantidadTemp + cantidadTempO):cantidadTemp);
            cantidadTemp = "";
        }
        else if (i == 0)
            cantidadTempO = cantidadTemp + cantidadTempO + (cantidad.toString().indexOf('.') != -1 ? "." + (ponersubstring==false?cantidad.toString().split('.')[1]:cantidad.toString().split('.')[1].substring(0, 2)) : (cantidad.toString().indexOf(',') != -1 ? "." + cantidad.toString().split(',')[1] : ""));
    }
    return cantidadTempO;
}

function formatNumber(num, prefix) {
    num = Math.round(parseFloat(num) * Math.pow(10, 2)) / Math.pow(10, 2)
    prefix = prefix || '';
    num += '';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '';
    splitRight = splitRight + '00';
    splitRight = splitRight.substr(0, 3);
    var regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
    }
    return prefix + splitLeft + splitRight;
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

function CreaTablaConOtrosEncabezados(listaDeJSON,listaEncabezados) {
    var cad = '<center><div class="divContenidoTabla"><table class="dataGridDatos" style="width: 70%;">';
    cad += '<thead>';
    cad += '<tr>';
    for (var i = 0; i < listaEncabezados.split(',').length; i++) 
     cad += '<th style="text-align: center;">'+listaEncabezados.split(',')[i]+'</th>'; 
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td style="text-align:center">';
            cad += '<span id="spNumEcon_' + listaDeJSON[filas]["Num_Economico"] + '">' + json[element] + '</span>';
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div></center>';
    return cad;
}



//----------- Formato Calendario
function changeFormatoFecha(e, txtFecha) {
    var esFechaCorrecta=false;
    txtFechaS = txtFecha;
    var key = window.event ? e.keyCode : e.which;
    var cadena = $(txtFecha).val();
    var cambio = 0;
    var direccion = false;
    if (key >= 37 && key <= 40) {
        direccion = true;
    }
    if (direccion == false) {
        if (key >= 96 && key <= 105) {
            cadena = cadena;
            cambio = 1;
        }
        else {
            if (key != 8) {
                //cadena = cadena.substring(0,cadena.length-1);
                cambio = 1;
            }
        }
        if (cambio == 1) {
            if (cadena.length == 2 || cadena.length == 5) {
                cadena = cadena + '/';
            }
            //$(txtFecha).value = cadena;
            validarFechasFormatoFecha(cadena, txtFecha);
        }
        if (cadena.length == 10) {
            _txtFecha = txtFecha;
            esFechaCorrecta=validarEstructuraFechaFF(cadena)!=""?false:true;
        }
    }
    return esFechaCorrecta;
}

function validarFechasFormatoFecha(cadena, txtFecha) {
    var nuevaCadena = '';
    for (var i = 0; i < cadena.length; i++) {
        var c = cadena.charAt(i);
        if (i != 2 && i != 5) {
            if (containsFF(c)) {
                nuevaCadena += c;
            }
        }
        else {
            nuevaCadena += c;
        }
    }
    $(txtFecha).val(nuevaCadena);
}
var num = '0123456789';
function containsFF(obj) {
    for (var i = 0; i < num.length; i++) {
        if (num.charAt(i) == obj) {
            return true;
        }
    }
    return false;
}

var txtFechaS;
function validarEstructuraFechaFF(fecha) {
   var error = '';
    var sdia = fecha.charAt(0) + fecha.charAt(1);
    var smes = fecha.charAt(3) + fecha.charAt(4);
    var saño = fecha.charAt(6) + fecha.charAt(7) + fecha.charAt(8) + fecha.charAt(9);

    var dia = parseInt(sdia);
    var mes = parseInt(smes);
    var año = parseInt(saño);
    var sep1 = fecha.charAt(2);
    var sep2 = fecha.charAt(5);

    var vecesError = 0;
    if (sep1 != '/' || sep2 != '/')
    { error += 'Error en sepador de fecha debe ser: (/).</br>'; vecesError++; }
    if (dia >= 0 && dia <= 31) { }
    else { error += 'Error en el día: ' + dia + '.</br>'; vecesError++; }
    if (mes >= 0 && mes <= 12) { }
    else { error += 'Error en el mes: ' + mes + '.</br>'; vecesError++; }
    if (saño.length <= 4 && saño.length > 0) { }
    else { error += 'Error en el año: ' + saño + '.</br>'; vecesError++; }
    if (error != '' && $("#divVentanaMensajes").is(':visible') == false) {
        error += '</br>Formato: dd/mm/aaaa';
        vecesError++;
        MostrarMsj(error, "Mensaje", false, true, false, "", "Aceptar", "", 250, (vecesError >= 4 ? 160 : 150), null, function () {
            $(txtFechaS).focus();
            $(txtFechaS).val("");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            $(txtFechaS).focus();
            $(txtFechaS).val("");
            $("#divVentanaMensajes").dialog("close");
        });
    }
    return error;
}

function validaCampovacio(nombreCampo) {
    if ($("#" + nombreCampo).val().trim() == "") {
        document.getElementById(nombreCampo).style.border = "1px solid Red";
        return true;
    }
    else {
        document.getElementById(nombreCampo).style.border = "1px solid Gray";
        return false;
    }
}

function omitirAcentos(text) { 
    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç"; 
     var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc"; 
    for (var i=0; i<acentos.length; i++) 
        text = text.replace(acentos.charAt(i), original.charAt(i)); 
     return text; 
 } 







