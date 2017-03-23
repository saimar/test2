

var PerfilUser = "";
function obtenerAnioActual() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ValidacionesEstructuras.aspx/obtenerAñoMesPerfilActual", "POST", null, function (data) {
        if (data.d.indexOf('Error') == -1) {
            PerfilUser = data.d.split('/')[2];
            for (var i = 2011; i <= parseInt(data.d.split('/')[0]); i++) {
                var opcion = new Option(i, i);
                document.getElementById('selectAnio').options[document.getElementById('selectAnio').options.length] = opcion;
                document.getElementById('selectAnio').options[document.getElementById('selectAnio').options.length - 1].title = i;
            }
            $('#selectAnio').val(data.d.split('/')[0]);
            var bimestre = (parseInt(data.d.split('/')[1]) - 1) / 2 - 1;
            if (bimestre == -1) {
                bimestre = 5
                document.getElementById('selectAnio').selectedIndex = document.getElementById('selectAnio').options.length - 2;
            }
            document.getElementById('selectBimestre').selectedIndex = bimestre;
            estructurasAgrupadas();
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    }, null);
}

function estructurasAgrupadas() {
    Waiting(true, "Espere por favor. Cargando Información...");
    $('#divEstructurasAgrupadasEncontradas').html("");
    var AnioBimestre = $('#selectAnio').val();
    var MesBimestre = $('#selectBimestre').val();

    if (MesBimestre == 13) {
        MesBimestre = 1;
        AnioBimestre = AnioBimestre + 1;
    }
    var Fecha = new Date(AnioBimestre, MesBimestre, 1);
    Fecha.setDate(Fecha.getDate() - 1);

    var Dia = (parseInt(Fecha.getDate()) < 9 ? "0" : "") + Fecha.getDate();
    var Mes = (parseInt(Fecha.getMonth()) < 9 ? "0" : "") + (Fecha.getMonth() + 1);
    var Año = Fecha.toString().split(' ')[3];
    var cadenaFecha = AnioBimestre + '-' + Mes + '-' + Dia;

    peticionAjax("ValidacionesEstructuras.aspx/EstructurasAgrupadas", "POST", { fecha: cadenaFecha }, function (data) {
        if (data.d.indexOf('Error') == -1) {
            var HTML = '<span style="font-weight:bold;">No hay datos que mostrar.</span>';
            if (data.d != "") {
                HTML = '<table id="tablaEstructurasAgrupadas" style="width:90%" class="dataGrid">';
                HTML += '<caption>Estructuras Agrupadas</caption>';
                HTML += '<tr><th >Producto</th><th >Incidencia</th><th >Registros Afectados</th></tr>';

                var Registros = obtenerArregloDeJSON(data.d, false);
                var Productos = new Array();

                for (var i = 0; i < Registros.length; i++) {
                    if (Productos.indexOf(Registros[i].Producto) == -1)
                        Productos.push(Registros[i].Producto);
                }
                var pedidosTotales = 0.0;
                var incidenciasTotales = 0.0;
                for (var indiceProductos = 0; indiceProductos < Productos.length; indiceProductos++) {
                    var pedidos = 0.0;
                    var incidencias = 0.0;
                    for (var i = 0; i < Registros.length; i++) {
                        if (Productos[indiceProductos] == Registros[i].Producto) {
                            pedidos += parseInt(Registros[i].Pedidos);
                            incidencias++;
                        }
                    }

                    pedidosTotales += parseInt(pedidos);
                    incidenciasTotales += parseInt(incidencias);
                    HTML += '<tr  style="cursor:pointer;background: rgb(192, 213, 196);" onclick="mostrarSeccionesPorProducto(\'' + Productos[indiceProductos] + '\');">';

                    HTML += '<td  style="background: rgb(192, 213, 196);width:15%">';
                    HTML += '<img id="img_' + Productos[indiceProductos] + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/>&nbsp&nbsp' + Productos[indiceProductos];
                    HTML += '</td>';

                    HTML += '<td style="background: rgb(192, 213, 196);width:70%">';
                    HTML += incidencias + ' Incidencias';
                    HTML += '</td>';

                    HTML += '<td  style="text-align:right;background: rgb(192, 213, 196);width:15%">';
                    HTML += '<span style="color: blue; text-decoration: underline;" title="Descargar Archivo(' + Registros[0].Fecha + '_' + Productos[indiceProductos] + ')" onclick="descargarTxt(\'' + cadenaFecha + '\',\'' + Productos[indiceProductos] + '\',\'' + Registros[0].Fecha + '_' + Productos[indiceProductos] + '\',0)">' + formato_numero(pedidos, 0, '.', ',') + '</span>';
                    //HTML += '<a href="DetalleEstructurasPorProducto.aspx?Fecha=' + Registros[0].Fecha + '&Clave=' + Productos[indiceProductos] + '&Archivo=' + Registros[0].Fecha + '_' + Productos[indiceProductos] + '">' + formato_numero(pedidos, 0, '.', ',') + '</a>';
                    HTML += '</td>';

                    HTML += '</tr>';

                    HTML += '<tr>';
                    HTML += '<td colspan="4" >';
                    HTML += '<div  id="' + Productos[indiceProductos] + '" style="width:100%; display:none">';

                    HTML += '</div>';
                    HTML += '</td>';
                    HTML += '</tr>';
                }
                HTML += '<tr class="alternateRow">';
                HTML += '<td style="background: rgb(192, 213, 196);width:15%;">';
                HTML += 'Total';
                HTML += '</td>';

                HTML += '<td style="background: rgb(192, 213, 196);width:70%;">';
                HTML += incidenciasTotales + ' Incidencias';
                HTML += '</td>';
                HTML += '<td style="text-align:right;background: rgb(192, 213, 196);width:15%;">';

                peticionAjax("ValidacionesEstructuras.aspx/VerificarArchivo", "POST", { fecha: cadenaFecha }, function (data1) {
                    if (data1.d.indexOf('Error') == -1) {
                        if (data1.d != "") {
                            // HTML += '<a href="DetalleEstructurasTotales.aspx?Archivo=Estructuras_' + cadenaFecha.replace("/", "").replace("/", "") + '">' + formato_numero(pedidosTotales, 0, '.', ',') + '</a>';
                            HTML += '<span style="color: blue; text-decoration: underline;cursor:pointer" title="Descargar Archivo(Estructuras_' + cadenaFecha.replace("-", "").replace("-", "") + ')" onclick="descargarTxt(\'\',\'\',\'Estructuras_' + cadenaFecha.replace("-", "").replace("-", "") + '\',3)">' + formato_numero(pedidosTotales, 0, '.', ',') + '</span>';
                        }
                        else
                            HTML += '<span id="spanDescargaArchivoShow">' + formato_numero(pedidosTotales, 0, '.', ',') + '</span><span id="spanDescargaArchivoHide" style="color: blue; text-decoration: underline;cursor:pointer;display:none" title="Descargar Archivo(Estructuras_' + cadenaFecha.replace("-", "").replace("-", "") + ')" onclick="descargarTxt(\'\',\'\',\'Estructuras_' + cadenaFecha.replace("-", "").replace("-", "") + '\',3)">' + formato_numero(pedidosTotales, 0, '.', ',') + '</span>';

                        if (PerfilUser == "19")
                            HTML += '</br><input id="botonCrearArchivo" type="button" value="Crear Archivo" onclick="crearArchivoEstructurasTXT(\'' + cadenaFecha + '\');" class="classButton" />';
                        HTML += '</td>';
                        HTML += '</tr>';
                        HTML += '</table>';
                    }
                    else
                        MostrarMsj(data1.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
                    Waiting(false, "Espere por favor. Cargando Información...");
                    $('#divEstructurasAgrupadasEncontradas').html(HTML);
                }, null);
            }
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function mostrarSeccionesPorProducto(Producto) {
    if (mostrarFilas(Producto)) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var AnioBimestre = $('#selectAnio').val();
        var MesBimestre = $('#selectBimestre').val();

        if (MesBimestre == 13) {
            MesBimestre = 1;
            AnioBimestre = AnioBimestre + 1;
        }
        var Fecha = new Date(AnioBimestre, MesBimestre, 1);
        Fecha.setDate(Fecha.getDate() - 1);

        var Dia = (parseInt(Fecha.getDate()) < 9 ? "0" : "") + Fecha.getDate();
        var Mes = (parseInt(Fecha.getMonth()) < 9 ? "0" : "") + (Fecha.getMonth() + 1);
        var Año = Fecha.toString().split(' ')[3];
        var cadenaFecha = AnioBimestre + '-' + Mes + '-' + Dia;

        peticionAjax("ValidacionesEstructuras.aspx/EstructurasAgrupadasPorProducto", "POST", { fecha: cadenaFecha, producto: Producto }, function (data) {
            if (data.d.indexOf('Error') == -1) {
                var HTML = '<span style="font-weight:bold;">No hay datos que mostrar.</span>';
                if (data.d != "") {
                    HTML = '<table id="tablaEstructurasAgrupadas' + Producto + '" style="width:100%" >';
                    var Registros = obtenerArregloDeJSON(data.d, false);
                    var Secciones = new Array();

                    for (var i = 0; i < Registros.length; i++) {
                        if (Secciones.indexOf(Registros[i].Sección) == -1)
                            Secciones.push(Registros[i].Sección);
                    }

                    var pedidosTotales = 0.0;
                    var incidenciasTotales = 0.0;
                    for (var indiceSecciones = 0; indiceSecciones < Secciones.length; indiceSecciones++) {
                        var pedidos = 0.0;
                        var incidencias = 0.0;

                        for (var i = 0; i < Registros.length; i++) {
                            if (Secciones[indiceSecciones] == Registros[i].Sección) {
                                pedidos += parseInt(Registros[i].Pedidos);
                                incidencias++;
                            }
                        }

                        HTML += '<tr class="alternateRow"  style="cursor:pointer" onclick="mostrarIncidenciasPorProductoSeccion(\'' + Producto + '\', \'' + Secciones[indiceSecciones] + '\');">';

                        HTML += '<td style="width:15%">';
                        HTML += '<img id="img_' + Producto + Secciones[indiceSecciones] + '" src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/>&nbsp&nbsp' + Secciones[indiceSecciones];
                        HTML += '</td>';

                        HTML += '<td style="width:70%;">';
                        HTML += incidencias + ' Incidencias';
                        HTML += '</td>';

                        HTML += '<td style="text-align:right;width:15%;">';
                        //HTML += '<a href="DetalleEstructurasPorSeccion.aspx?Fecha=' + Registros[0].Fecha + '&Clave=' + Secciones[indiceSecciones] + '-' + Producto + '&Archivo=' + Registros[0].Fecha + '_' + Secciones[indiceSecciones] + '_' + Producto + '">' + formato_numero(pedidos, 0, '.', ',') + '</a>';
                        HTML += '<span style="color: blue; text-decoration: underline;" title="Descargar Archivo(' + Registros[0].Fecha + '_' + Secciones[indiceSecciones] + '_' + Producto + ')" onclick="descargarTxt(\'' + cadenaFecha + '\',\'' + Secciones[indiceSecciones] + '-' + Producto + '\',\'' + Registros[0].Fecha + '_' + Secciones[indiceSecciones] + '_' + Producto + '\',1)">' + formato_numero(pedidos, 0, '.', ',') + '</span>';
                        HTML += '</td>';

                        HTML += '</tr>';

                        HTML += '<tr>';
                        HTML += '<td colspan="3">';
                        HTML += '<div  id="' + Producto + Secciones[indiceSecciones] + '" style="width:100%; display:none">';

                        HTML += '</div>';
                        HTML += '</td>';
                        HTML += '</tr>';
                    }
                    HTML += '</table>';
                }
                $("#" + Producto).html(HTML);
            }
            else
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}


function mostrarIncidenciasPorProductoSeccion(Producto, Seccion) {
    if (mostrarFilas(Producto + Seccion)) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var AnioBimestre = $('#selectAnio').val();
        var MesBimestre = $('#selectBimestre').val();

        if (MesBimestre == 13) {
            MesBimestre = 1;
            AnioBimestre = AnioBimestre + 1;
        }
        var Fecha = new Date(AnioBimestre, MesBimestre, 1);
        Fecha.setDate(Fecha.getDate() - 1);

        var Dia = (parseInt(Fecha.getDate()) < 9 ? "0" : "") + Fecha.getDate();
        var Mes = (parseInt(Fecha.getMonth()) < 9 ? "0" : "") + (Fecha.getMonth() + 1);
        var Año = Fecha.toString().split(' ')[3];
        var cadenaFecha = AnioBimestre + '-' + Mes + '-' + Dia;

        peticionAjax("ValidacionesEstructuras.aspx/estructurasAgrupadaPorFechaProductoSeccion", "POST", { fecha: cadenaFecha, producto: Producto, seccion: Seccion }, function (data) {
            if (data.d.indexOf('Error') == -1) {
                var HTML = '<span style="font-weight:bold;">No hay datos que mostrar.</span>';
                if (data.d != "") {
                    HTML = '<table id="tablaEstructurasAgrupadas' + Producto + Seccion + '" style="width:100%" >';
                    var Registros = obtenerArregloDeJSON(data.d, false);

                    for (var i = 0; i < Registros.length; i++) {
                        var Registro = Registros[i];
                        HTML += '<tr>';
                        HTML += '<td style="width:15%">';
                        HTML += Registros[i].Clave;
                        HTML += '</td>';

                        HTML += '<td style="text-align:left;width:70%;white-space: pre-wrap;">';
                        HTML += Registros[i].Incidencia;
                        HTML += '</td>';

                        HTML += '<td style="text-align:right;width:15%">';
                        //HTML += '<a href="DetalleValidacionesEstructuras.aspx?Fecha=' + Registros[i].Fecha + '&Clave=' + Registros[i].Clave + '-' + Seccion + '-' + Producto + '&Archivo=' + Registros[i].Fecha + '_' + Registros[i].Clave + '-' + Seccion + '_' + Producto + '">' + formato_numero(Registros[i].Pedidos, 0, '.', ',') + '</a>';
                        HTML += '<span style="color: blue; text-decoration: underline;cursor:pointer;" title="Descargar Archivo(' + Registros[i].Fecha + '_' + Registros[i].Clave + '-' + Seccion + '_' + Producto + ')" onclick="descargarTxt(\'' + cadenaFecha + '\',\'' + Registros[i].Clave + '-' + Seccion + '-' + Producto + '\',\'' + Registros[i].Fecha + '_' + Registros[i].Clave + '-' + Seccion + '_' + Producto + '\',2)">' + formato_numero(Registros[i].Pedidos, 0, '.', ',') + '</span>';
                        HTML += '</td>';
                        HTML += '</tr>';
                    }
                }
                $("#" + Producto + Seccion).html(HTML);
            }
            else
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function mostrarFilas(nombreFila) {
    var Fila = document.getElementById(nombreFila);

    if (Fila.style.display == 'none') {
        document.getElementById( nombreFila).style.display="inline";
        $("#img_" + nombreFila).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
        return true;
    }
    else {
        $("#" + nombreFila).hide();
        $("#img_" + nombreFila).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
        return false;
    }
}

function descargarTxt(fecha, clave, nombreArchivo, opcionDescarga) {
    event.cancelBubble = true;
    Waiting(true, "Espere por favor. Cargando Información...");
    if (opcionDescarga == 3) {
        __doPostBack('ExportarTxtRegistrosAfectadosValEstruc', nombreArchivo + "," + opcionDescarga);
        setTimeout(terminarWait, 10000);
    }
    else {
        peticionAjax("ValidacionesEstructuras.aspx/obtieneRegistroTxtDescargar", "POST", { fecha: fecha, producto: clave, opcionTxt: opcionDescarga }, function (data) {
            if (data.d.indexOf("ErrorCATCH") == -1) {
                if (data.d != "" && parseInt(data.d.split('_')[0]) > 0) {
                    __doPostBack('ExportarTxtRegistrosAfectadosValEstruc', nombreArchivo + "," + opcionDescarga);
                    setTimeout(terminarWait, 3000);
                }
                else {
                    Waiting(false, "Espere por favor. Cargando Información...");
                    MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
            }
            else {
                Waiting(false, "Espere por favor. Cargando Información...");
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
            }
        });
    }
}

function crearArchivoEstructurasTXT(fecha) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("ValidacionesEstructuras.aspx/crearArchivoEstructuras", "POST", { fecha: fecha }, function (data) {
        if (data.d == "") {
            MostrarMsj("Archivo creado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            $("#spanDescargaArchivoShow").hide();
            $("#spanDescargaArchivoHide").show();
        }
        else if (data.d.indexOf("ErrorCATCH") != -1)
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}