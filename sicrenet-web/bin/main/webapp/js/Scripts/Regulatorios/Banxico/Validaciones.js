$(function () {
    //fuantesAgrupadas();
});

function fuantesAgrupadas() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Validaciones.aspx/fuentesAgrupadas", "POST", null, function (data) {
        if (data.d.indexOf('Error') == -1) {
            var HTML = 'No hay datos que mostrar.';
            if (data.d != "") {
                HTML = '<br />';

                HTML += '<table id="tablaFuentesAgrupadas" style="width:100%;" class="dataGrid">';
                HTML += '<caption>Fuentes Agrupadas</caption>';
                HTML += '<tr><th >Origen</th><th >Incidencia</th><th >Registros Afectados</th></tr>';

                var Registros = obtenerArregloDeJSON(data.d, false);

                var Origenes = new Array();

                for (var i = 0; i < Registros.length; i++) {
                    var Registro = Registros[i];

                    if (Origenes.indexOf(Registro.Origen) == -1)
                        Origenes.push(Registro.Origen);
                }

                var pedidosTotales = 0.0;
                var incidenciasTotales = 0.0;
                var clavesTotales = "";

                for (var indiceOrigenes = 0; indiceOrigenes < Origenes.length; indiceOrigenes++) {
                    var HTML2 = '<table style="width:100%">';

                    var pedidos = 0.0;
                    var incidencias = 0.0;
                    var Claves = "";


                    for (var i = 0; i < Registros.length; i++) {
                        var Registro = Registros[i];

                        if (Origenes[indiceOrigenes] == Registro.Origen) {
                            HTML2 += '<tr>';                                                   
                            HTML2 += '<td width="25%">';
                            HTML2 += Registro.Clave;
                            HTML2 += '</td>';

                            HTML2 += '<td width="50%" style="text-align:left">';
                            HTML2 += Registro.Incidencia;
                            HTML2 += '</td>';

                            HTML2 += '<td width="25%" style="text-align:right">';
                            HTML2 += '<a onclick="pedirArchivo(\'Fecha=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '&Clave=' + Registro.Clave + '-' + Registro.Origen + '&Archivo=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '_' + Registro.Clave + '_' + Registro.Origen + '\');" href="DetalleValidaciones.aspx?Fecha=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '&Clave=' + Registro.Clave + '-' + Registro.Origen + '&Archivo=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '_' + Registro.Clave + '_' + Registro.Origen + '">' + formato_numero(Registro.Pedidos, 0, '.', ',') + '</a>';
                            //HTML2 += '<a onclick="pedirArchivo(\'Fecha=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '&Clave=' + Registro.Clave + '-' + Registro.Origen + '&Archivo=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '_' + Registro.Clave + '_' + Registro.Origen + '\');" href="#">' + formato_numero(pedidosTotales, 0, '.', ',') + '</a>';
                            Claves += Registro.Clave + '-' + Origenes[indiceOrigenes] + ',';
                            clavesTotales += Registro.Clave + '-' + Origenes[indiceOrigenes] + ',';
                            HTML2 += '</td>';

                            HTML2 += '</tr>';

                            pedidos += parseInt(Registro.Pedidos);
                            incidencias++;

                            var Año = Registro.Fecha.substring(0, 4);
                            var Mes = Registro.Fecha.substring(4, 6);
                            var Dia = Registro.Fecha.substring(6);

                            $('#divFechaFuentes').html('Fuentes agrupadas de la fecha ' + Dia + '/' + Mes + '/' + Año);
                        }
                    }

                    Claves = Claves.slice(0, Claves.length - 1);
                    clavesTotales = clavesTotales.slice(0, clavesTotales.length - 1);

                    pedidosTotales += parseInt(pedidos);
                    incidenciasTotales += parseInt(incidencias);

                    HTML2 += '</table>';                    
                    HTML += '<tr class="alternateRow" style="cursor:hand" onclick="mostrarFilas(\'' + Origenes[indiceOrigenes] + '\',this);">';
                    HTML += '<td width="25%" style="text-align: left;">';
                    HTML += '<img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/>&nbsp&nbsp';     
                    HTML += Origenes[indiceOrigenes];
                    HTML += '</td>';

                    HTML += '<td width="50%">';
                    HTML += incidencias + ' Incidencias';
                    HTML += '</td>';

                    HTML += '<td width="25%" style="text-align:right">';
                    HTML += '<a  onclick="pedirArchivo(\'Fecha=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '&Clave=' + Claves + '&Archivo=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '_' + Origenes[indiceOrigenes] + '\');" href="DetalleValidaciones.aspx?Fecha=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '&Clave=' + Claves + '&Archivo=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '_' + Origenes[indiceOrigenes] + '">' + formato_numero(pedidos, 0, '.', ',') + '</a>';
                    //HTML += '<a onclick="pedirArchivo(\'Fecha=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '&Clave=' + Claves + '&Archivo=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '_' + Origenes[indiceOrigenes] + '\');" href="#">' + formato_numero(pedidosTotales, 0, '.', ',') + '</a>';
                    HTML += '</td>';

                    HTML += '</tr>';

                    HTML += '<tr>';
                    HTML += '<td colspan="3">';
                    HTML += '<div  id="' + Origenes[indiceOrigenes] + '" style="width:100%; display:none">';

                    HTML += HTML2;

                    HTML += '</div>';
                    HTML += '</td>';
                    HTML += '</tr>';
                }

                HTML += '<tr class="alternateRow">';

                HTML += '<td width="25%" style="text-align: left;">';
                HTML += 'Total';
                HTML += '</td>';

                HTML += '<td width="50%">';
                HTML += incidenciasTotales + ' Incidencias';
                HTML += '</td>';

                HTML += '<td width="25%" style="text-align:right">';
                HTML += '<a onclick="pedirArchivo(\'Fecha=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '&Clave=' + clavesTotales + '&Archivo=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '\');" href="DetalleValidaciones.aspx?Fecha=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '&Clave=' + clavesTotales + '&Archivo=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '">' + formato_numero(pedidosTotales, 0, '.', ',') + '</a>';
                //HTML += '<a onclick="pedirArchivo(\'Fecha=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '&Clave=' + clavesTotales + '&Archivo=' + (Registro.Fecha.substring(0, 4) + "/" + Registro.Fecha.substring(4, 6) + "/" + Registro.Fecha.substring(6, 8)) + '\');" href="#">' + formato_numero(pedidosTotales, 0, '.', ',') + '</a>';
                HTML += '</td>';

                HTML += '</tr>';

                HTML += '</table>';
            }

            $('#divFuentesAgrupadasEncontradas').html(HTML);
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function mostrarFilas(Origen,obj) {
    var Fila = document.getElementById(Origen);
    if (Fila.style.display == 'none') {
        {
            $(Fila).slideDown('slow');
            $($(obj).children(0).find("img")[0]).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");      
        }
    }
    else {
        $(Fila).slideUp('slow');
        $($(obj).children(0).find("img")[0]).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
    }
}

function pedirArchivo(data) {
    event.cancelBubble = true;
    Waiting(true, "Descargando Archivo...");
    finishWaiting();
}
 
function finishWaiting() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            setTimeout(terminarWait, 1000);
        }
    }
    xmlhttp.open("GET", "ajax_info.txt", true);
    xmlhttp.send();
}