
/*--------------------------------------------- Carga Catalogos ----------------------------------------------------------------------*/
var tablavirtual;
var varchkact;
var varchkres;

function cargarCatalogoPais() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Proyectos.aspx/obtieneCatalogos", "POST", { TipoCat: 1 }, function (data) {
        var cad = '';
        cad += '<option value="-1">Todos</option>';
        try {
            var arrayJSON = obtenerArregloDeJSON(data.d, false);
            for (var x = 0; x < arrayJSON.length; x++) {
                if (arrayJSON[x].IdOpcion != "8") {
                    var json = arrayJSON[x];
                    cad += '<option value="' + json.IdOpcion + '">';
                    cad += json.Descripcion;
                    cad += '</option>';
                }
            }
        } catch (err) { }
        $('#slCatPais').html(cad);
        cargarCatalogoResponsable(2, true);
    }, null);
}


function cargarCatalogoResponsable(opcion, escargarInicial) {
    peticionAjax("Proyectos.aspx/obtieneCatalogos", "POST", { TipoCat: opcion }, function (data) {
        var cad = '';
        var cad2 = '';
        cad += '<option value="-1">Seleccione Responsable</option>';
        try {
            var arrayJSON = obtenerArregloDeJSON(data.d, false);
            for (var x = 0; x < arrayJSON.length; x++) {
                var json = arrayJSON[x];
                cad2 += '<option value="' + json.IdOpcion + '">';
                cad2 += json.Descripcion;
                cad2 += '</option>';
            }
        } catch (err) { }
        cad += cad2;
        $('#slCatResponsable').html(cad);
        if (cargarCatalogoDeResponsables == true) {
            Waiting(false, "Espere por favor. Cargando Información...");
            cargarCatalogoDeResponsables = false;
            $("#slCatResponsable").val(valResponsableSelect);
        }
        else if (escargarInicial == true)
            ObtienePais();
        ObtieneUsuario();
        cambiarCheck();
    }, null);
}

var LogUsuario = '';
function ObtieneUsuario() {
    peticionAjax("Proyectos.aspx/obtieneUserLog", "POST", null, function (data) {
        LogUsuario = data.d.toString();
        //LogUsuario = 662868;
        WidtDatePicker();
        ObtenrInfoI();
    }, null);
}

var idpaislogin = '';
function ObtienePais() {
    peticionAjax("Proyectos.aspx/obtienepais", "POST", null, function (data) {
        idpaislogin = data.d.toString();
    }, null);
    chkestado = 'checked="checked"';
}
/*-------------------------------------------- Obtener Tabla con Información (Bitacora) -----------------------------------------------------------------*/
function ObtenrInfoI() {
    var parametros = {
        Pais: idpaislogin,
        IdRes: LogUsuario,
        Opcion: 0,
    };
    peticionAjax("Proyectos.aspx/obtieneTabInicialFiltrada", "POST", parametros, TableroControl, TableroControl);
    document.getElementById("ChkAct").checked = true;
    document.getElementById("ChkRes").checked = true;
    varchkact = true;
    varchkres = true;
         
}
var dtopcion
var cambiaregla;
var cambio;
var datofiltro;
var chkestado;

function ChkActivos()
{    
    CheckFiltro();
    
}


function ChkRespon()
{    
    CheckFiltro();
    
}


function CheckFiltro() {
    
     dtopcion = 0; 
    

    //comienza checks
    var xdlAct = $("#ChkAct").prop("checked");
    var xdlRes = $("#ChkRes").prop("checked");
    if (xdlAct==true)
    {
        if (xdlRes==true)
        {
            var parametros = {
                Pais: idpaislogin,
                IdRes: LogUsuario,
                Opcion: dtopcion,
            };
            cambio = 2;
            Waiting(true, "Espere por favor. Cargando Información...");
            peticionAjax("Proyectos.aspx/obtieneTabInicialFiltrada", "POST", parametros, TableroControl, TableroControl);
            document.getElementById("ChkAct").checked = true;
            document.getElementById("ChkRes").checked = true;
        }
        else
        {
            var parametros = {
                Pais: idpaislogin,
                Opcion: dtopcion,
            };
            cambio = 1;
            Waiting(true, "Espere por favor. Cargando Información...");
            peticionAjax("Proyectos.aspx/obtieneTabInicial", "POST", parametros, TableroControl, TableroControl);
            document.getElementById("ChkAct").checked = true;
            document.getElementById("ChkRes").checked = false;
        }
    }
    else
    {
        if (xdlRes==true)
        {
            var parametros = {
                Pais: idpaislogin,
                IdRes: LogUsuario,
                Opcion: dtopcion,
            };
            cambio = 2;
            Waiting(true, "Espere por favor. Cargando Información...");
            peticionAjax("Proyectos.aspx/obtieneTabInicialFiltradaTodas", "POST", parametros, TableroControl, TableroControl);
            document.getElementById("ChkAct").checked = false;
            document.getElementById("ChkRes").checked = true;

        }
        else
        {
            var parametros = {
                Pais: idpaislogin,
                Opcion: dtopcion,
            };
            cambio = 1;
            Waiting(true, "Espere por favor. Cargando Información...");
            peticionAjax("Proyectos.aspx/obtieneTabInicialTodas", "POST", parametros, TableroControl, TableroControl);
            document.getElementById("ChkAct").checked = false;
            document.getElementById("ChkRes").checked = false;
        }
    }
}



function llenardatos(opcion) {
    dtopcion = opcion;
    if (cambio == 1)
    { cambiaregla = cambio; }
    CheckFiltro(cambiaregla);
}



function cambiarCheck() {    
    peticionAjax("Proyectos.aspx/cambiarCheck", "POST", null, null, null);
  
}

var rave;
var cargarCatalogoDeResponsables = false; var valResponsableSelect = "";
function CargaInfFiltrada(cargarCatalogoResponsables) {
    cargarCatalogoDeResponsables = cargarCatalogoResponsable;
    valResponsableSelect = $("#slCatResponsable").val();
    Waiting(true, "Espere por favor. Cargando Información...");
    if ($("#slCatPais").val() == '-1') { $("#Checkbox1").attr('checked', false); HabilitaFiltros(); }
    var parametros = {
        VistaPriorizada: $("#Checkbox1").attr('checked') != undefined ? '1' : '0', //Nueva Funcionalidad
        Pais: $("#slCatPais").val(),
        Responsable: $("#slCatResponsable").val() != "-1" ? $("#slCatResponsable :selected").text() : $("#slCatResponsable").val(),
        Estado: $("#slCatEstado").val(),
        Palabra: $("#InBuscaCoincidencias").val(),
        FechaAnt: $("#datepicker3").val(),
        FechaAct: $("#datepicker4").val(),
        FechaOrdenB: '',
        Actividad: $("#slActividades").val()
    };
    peticionAjax("Proyectos.aspx/FiltrarInformacion", "POST", parametros, TableroControl, TableroControl);
}

function TableroControl(data) {
    var cad = '';
    var cad2 = '';
    var JSON = obtenerArregloDeJSONModificado(data.d, false);
    if (JSON.Status != undefined) {
        return;
    }
    tablavirtual = JSON;
    //cad2 = generarmenu(JSON);
    cad = generarTablaDeRegistrosProy(JSON);
    $('#dvTableroControl').html(cad);    
    var p = $('#dvTableroControl');
    var position = p.position();
    if (cargarCatalogoDeResponsables == true)
        cargarCatalogoResponsable(2, false);
    else
        Waiting(false, "Espere por favor. Cargando Información...");
    //document.getElementById("thAgregarAct").style.width = (parseInt(document.getElementById("tblDatosMain").offsetHeight) > parseInt(document.getElementById("divTablaMain").offsetHeight) ? "4.2%" : "2.8%");   
    tablefiltrer();
    $("#txtFechaInicio").datepicker({ minDate: -45, maxDate: "+10M +10D" });
    $("#txtFechaInicio").datepicker("option", "showAnim", "slide");
    $("#txtFechaInicio").datepicker("option", { dateFormat: "dd/mm/yy" });
}

function tablefiltrer()
{
  



    $("#tblDatosMain").tablesorter({
        widthFixed: true,
        showProcessing: true, 
        headerTemplate: '{content} {icon}',
        widgets: ['zebra', 'columns', 'filter', "uitheme", 'StickyHeaders'],
        //usNumberFormat: false,
        sortReset: true,
        // Resets the sort direction so that clicking on an unsorted column will sort in the sortInitialOrder direction.
        sortRestart: true,
        sortInitialOrder: 'desc',
        widgetOptions: {
            stickyHeaders : '',
            // number or jquery selector targeting the position:fixed element
            stickyHeaders_offset : 0,
            // added to table ID, if it exists
            stickyHeaders_cloneId : '-sticky',
            // trigger "resize" event on headers
            stickyHeaders_addResizeEvent : true,
            // if false and a caption exist, it won't be included in the sticky header
            stickyHeaders_includeCaption : true,
            // The zIndex of the stickyHeaders, allows the user to adjust this to their needs
            stickyHeaders_zIndex : 2,
            // jQuery selector or object to attach sticky header to
            stickyHeaders_attachTo: '#divTablaMain',
            // jQuery selector or object to monitor horizontal scroll position (defaults: xScroll > attachTo > window)
            stickyHeaders_xScroll : null,
            // jQuery selector or object to monitor vertical scroll position (defaults: yScroll > attachTo > window)
            stickyHeaders_yScroll : null,

            // scroll table top into view after filtering
            stickyHeaders_filteredToTop: true,

            filter_saveFilters: true,
            
            // hidden filter input/selects will resize the columns, so try to minimize the change
        
            filter_formatter: {


                // Date (one input)
                5: function ($cell, indx) {
                    return $.tablesorter.filterFormatter.uiDateCompare($cell, indx, {
                        cellText: 'Fecha', // text added before the input
                        compare: ['', '>='],
                        selected: 1,
                        // jQuery UI datepicker options
                        // defaultDate : '1/1/2014', // default date
                        changeMonth: true,
                        changeYear: true

                    });
                },

                6: function ($cell, indx) {
                    return $.tablesorter.filterFormatter.uiDateCompare($cell, indx, {
                        cellText: 'Fecha', // text added before the input
                        compare: ['', '=', '>=', '<='],
                        selected: 3,
                        // jQuery UI datepicker options
                        // defaultDate : '1/1/2014', // default date
                        changeMonth: true,
                        changeYear: true

                    });
                },

                7: function ($cell, indx) {
                    return $.tablesorter.filterFormatter.uiDateCompare($cell, indx, {
                        cellText: 'Fecha', // text added before the input
                        compare: ['', '<='],
                        selected: 1,
                        // jQuery UI datepicker options
                        // defaultDate : '1/1/2014', // default date
                        changeMonth: true,
                        changeYear: true

                    });
                },
          

            }
        }
    });

    


}

function generarmenu(listaDeJSON) {
    var encabezadoAux = '';
    var cont = 0;
    var cad = '<center><table id="tblContenidoproyectos" style="width:100%" class="dataGridDatos"><tr><td><table " style="width:100%">';
    cad += '<thead>';
    //cad += '<tr class="MenuEmerge">';           
    //        if (datofiltro == 1) {
    //            cad += '<th style="width:2%" onclick="llenardatos(1)">No.</th>';
    //            cad += '<th style="width:19%" onclick="llenardatos(3)";>Actividad</th>';
    //            cad += '<th style="width:7%" onclick="llenardatos(5)";>TipoActividad</th>';
    //            rave = 2; cad += '<th style="width:17%" onclick="llenardatos(7)";> Responsable Seguimiento </th>';
    //            cad += '<th style="width:18%" onclick="llenardatos(9)";>Responsables</th>';
    //            cad += '<th style="width:7%" onclick="llenardatos(11)";>Fecha </br> Inicio</th>';
    //            cad += '<th style="width:7%" onclick="llenardatos(13)";>Fecha </br> Compromiso</th>';
    //            cad += '<th style="width:6.5%" onclick="llenardatos(15)";>Fecha </br> Termino</th>';
    //            cad += '<th style="width:6.5%" onclick="llenardatos(17)";>Dias de </br> Atraso</th>';
    //            cad += '<th style="width:3.5%" onclick="llenardatos(19)";>Sem.</th>';
    //            cad += '<th style="width:3%" onclick="llenardatos(21)";>Comentarios</th>';
    //            cad += '<th style="width:3" onclick="llenardatos(23)";>Adjuntos</th>';
                
    //        }
    //        else {
    //            cad += '<th style="width:2%" onclick="llenardatos(0)">No.</th>';
    //            cad += '<th style="width:19%" onclick="llenardatos(2)";>Actividad</th>';
    //            cad += '<th style="width:7%" onclick="llenardatos(4)";>Tipo Actividad</th>';
    //            rave = 2; cad += '<th style="width:17%" onclick="llenardatos(6)";>Responsable Seguimiento</th>';
    //            cad += '<th style="width:18%" onclick="llenardatos(8)";>Responsables</th>';
    //            cad += '<th style="width:7%" onclick="llenardatos(10)";>Fecha </br> Inicio</th>';
    //            cad += '<th style="width:7%" onclick="llenardatos(12)";>Fecha </br> Compromiso</th>';
    //            cad += '<th style="width:6.5%" onclick="llenardatos(14)";>Fecha </br> Termino</th>';
    //            cad += '<th style="width:6.5%" onclick="llenardatos(16)";>Dias de </br> Atraso</th>';
    //            cad += '<th style="width:3.5%" onclick="llenardatos(18)";>Sem.</th>';
    //            cad += '<th style="width:3%" onclick="llenardatos(20)";>Comentarios</th>';
    //            cad += '<th style="width:3" onclick="llenardatos(22)";>Adjuntos</th>';
                
    //        }
    //cad += '</tr>';
    cad += '</thead></table></td></tr>';
    return cad;
}

function generarTablaDeRegistrosProy(listaDeJSON) {
    var cad = '';
    var encabezadoAux = '';
    var cont = 0;
    if (listaDeJSON.length > 0) {




        cad += '<div id="rave"><div id="divTablaMain" style=" position:relative; height:700px; overflow-y:auto" >';
        //--------------------------------------------------------------------------------------------------------style="height:98%; position:absolute;"

        //cad += '<table id="external_controls" class="tablesorter"><tbody><tr>'
        //cad += '<th style="width:2%" ><input class="search" type="search" data-column="0"></th>';
        //cad += '<th style="width:22%" ><input class="search" type="search" data-column="1"></th>';
        //cad += '<th style="width:3%" ><input class="search" type="select"></th>';
        //rave = 2; cad += '<th style="width:12%" ><input class="search" type="search" data-column="3"></th>';
        //cad += '<th style="width:18%" ><input class="search" type="search" data-column="4"></th>';
        //cad += '<th style="width:5%" ><input id="txtFechaInicio" class="search" type="search" data-column="5"></th>';
        //cad += '<th style="width:5%" ><input class="search" type="search" data-column="6"></th>';
        //cad += '<th style="width:5%" ><input class="search" type="search" data-column="7"></th>';
        //cad += '<th style="width:2%" ><input class="search" type="search" data-column="8"></th>';
        //cad += '<th style="width:3%" >Sem.</th>';
        //cad += '<th style="width:2%" ><input class="search" type="search" data-column="10"></th>';
        //cad += '<th style="width:25%" ><input class="search" type="search" data-column="11"></th>';
        //cad += '<th style="width:1%;" >Adj.</th>';
        //cad += '</table></tbody></tr>';

        cad += '<table id="tblDatosMain"  ><thead ><tr >';
      
        cad += '<th style="width:2%"  class="sorter-text filter-match">No.</th>';
        cad += '<th style="width:22%" class="sorter-text filter-match">Actividad</th>';
        cad += '<th style="width:3%" class="first-name filter-select">Tipo Actividad</th>';
        rave = 2; cad += '<th style="width:12%" class="first-name filter-select">Responsable Seguimiento</th>';
        cad += '<th style="width:18%" class="sorter-text filter-match">Responsables</th>';
        cad += '<th style="width:5%" id="rave1" class="filter_formatter" data-placeholder="Ejem. 1/18/2013">Fecha </br> Inicio</th>';
        cad += '<th style="width:5%" data-placeholder="Ejem. 1/18/2013">Fecha </br> Compromiso</th>';
        cad += '<th style="width:5%" data-placeholder="Ejem. 1/18/2013">Fecha </br> Termino</th>';
        cad += '<th style="width:2%" >Dias de </br> Atraso</th>';
        cad += '<th style="width:3%" class="first-name filter-select" >Sem.</th>';
        cad += '<th style="width:2%" >Com.</th>';
        cad += '<th style="width:25%" class="sorter-text filter-match">Ultimo Comentario</th>';
        cad += '<th style="width:1%;" class="filter-match">Adj.</th>';
        //cad += '</tr>';

        

        cad += '</tr></thead>';

        

        cad += '<tbody class="scrollable">';
        //-----------------------------------------------------------------------------------------------------
        if (listaDeJSON.length > 0 && listaDeJSON[0] != null) {
            for (var filas = 0; filas < listaDeJSON.length + 1; filas++) {
                cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
                var json = listaDeJSON[filas];
                for (var element in json) {
                    encabezadoAux = element;
                    if (element != 'Adj.') {
                        if (element != 'Com.') {
                            if (element == 'No.') {
                                cad += '<td style="width:2%; text-align:center">';
                                cad += json[element];
                            }
                            else if (element == 'Semaforo') {
                                if (json[element] == '0') {
                                    cad += '<td style="width:3%; text-align:center" Class="EstatusGris2">  ';       // </td>'; //Sin concluir
                                    cad += '<a>Gris</a>';
                                }
                                if (json[element] == '1') {
                                    cad += '<td style="width:3%; text-align:center" Class="EstatusAmarillo2">';  //</td>'; //Despues de Tiempo
                                    cad += '<a>Amarillo</a>';
                                }
                                if (json[element] == '2') {
                                    cad += '<td style="width:3%; text-align:center" Class="EstatusNaranja2">';    //</td>'; //Sin concluir
                                    cad += '<a>Naranja</a>';
                                }
                                if (json[element] == '3') {
                                    cad += '<td style="width:3%; text-align:center" Class="EstatusVerde2">';     //</td>'; //Antes de Tiempo
                                    cad += '<a>Verde</a>';
                                }
                                if (json[element] == '4') {
                                    cad += '<td style="width:3%; text-align:center" Class="EstatusAzul2">';     //</td>'; //Despues de Tiempo
                                    cad += '<a>Azul</a>';
                                }
                                if (json[element] == '5') {
                                    cad += '<td style="width:3%; text-align:center" Class="EstatusRojo2">';     //</td>'; //Despues de Tiempo
                                    cad += '<a>Rojo</a>';
                                }


                            }
                            else if (element == 'Tipo Actividad') {
                                if (json[element] == '') {
                                    cad += '<td style="width:3%; text-align:center" >---</td>'; //Fail
                            
                                }
                                if (json[element] == '1') {
                                    cad += '<td style="width:3%; text-align:center" >Ordinarias</td>'; //Ordinarias
                              
                                }
                                if (json[element] == '2') {
                                    cad += '<td style="width:3%; text-align:center" >Regulatorias</td>'; //Regulatorias
                                
                                }
                                if (json[element] == '3') {
                                    cad += '<td style="width:3%; text-align:center" >Sistemas</td>'; //Regulatorias
                            
                                }
                            }

                            else if (element == 'Fecha Inicio') {
                                cad += '<td style="width:5%; text-align:center">';
                                cad += json[element];
                            }
                            else if (element == 'Fecha Compromiso') {
                                cad += '<td style="width:5%; text-align:center">';
                                if (json[element] == '') {
                                    cad += '----';
                                }
                                cad += json[element];
                            }
                            else if (element == 'Fecha Termino') {
                                cad += '<td style="width:5%; text-align:center">';
                                if (json[element] == '') {
                                    cad += '----';
                                }
                                cad += json[element];
                            }
                            else if (element == 'Actividad') {
                                cad += '<td style="width:22%; text-align:left" display="block" onclick="EditarActividadTab(\'' + listaDeJSON[filas]["No."] + '\')" title="' + listaDeJSON[filas]["Descripcion"] +'">';

                                cad += json[element];
                            }
                            else if (element == 'Dias de Atraso') {
                                if (json[element] > 0) {
                                    cad += '<td style="width:2%; text-align:center; color:red;" >';
                                }
                                else {
                                    cad += '<td style="width:2%; text-align:center">';
                                    if (json[element] == '') {
                                        cad += '----';
                                    }
                                }
                                cad += json[element];
                            }
                            else if (element == 'Ultimo Comentario') {
                                cad += '<td style="width:25%; text-align:left">';
                                if (json[element] == '') {
                                    cad += '----';
                                }
                                cad += json[element];
                            }

                            else if (element == 'Responsable') {
                                cad += '<td style="width:12%; text-align:left">';
                                cad += json[element];
                            }
                            else if (element == 'Corresponsables') {
                                cad += '<td style="width:18%; text-align:left">';
                                if (json[element] == '') {
                                    cad += '----';
                                }
                                cad += json[element];
                            }
                            else if (element == 'Descripcion') {
                               
                            }                         
                        }                      
                        else if (element == 'Com.') {
                            cad += '<td style="width:2%; text-align:center"  onclick="editComentario(\'' + json["No."] + '\',\'' + listaDeJSON[filas]["Actividad"] + '\');" >';
                            if (json[element] != '0') {
                                cad += '<div class="imgco"><span style="font-weight: bold;">' + json[element] + '</span></div>';
                            } else {
                                cad += '0';                  
                            }
                           
                        }
                        
                        //else {
                        //    cad += json[element];
                        //}
                        cad += '</td>';
                    }
                    else if (element == 'Adj.') {
                        cad += '<td style="width:1%; text-align:center; " onclick="MenuAdjutarArchivos(\'' + json["No."] + '\',\'' + listaDeJSON[filas]["Actividad"] + '\');">';
                        if (json["Adj."] != '0') {
                            
                            cad += '<span style="font-weight: bold;">' + json[element] + '</span>';
                        } else {
                            
                            cad += json[element];
                        }
                        cad += '</td>';
                    }
                }
                  
                //<img src="../../Images/Portafolio/Proyectos/icono_comentarios.jpg" width="15px" height="13px" Title="Agregar/Ver Comentarios" style="display:none;">

                //if (json != null && encabezadoAux != 'SinDatos') {
                //    cad += '<td style="width:1%; text-align:center; " onclick="MenuAdjutarArchivos(\'' + json["No."] + '\');">';
                //    if (json["Adj."] != '0') {
                //        //cad += '<img src="../../Images/Portafolio/Proyectos/Archivado.png" width="15px" height="13px"  class="imgCrecer" Title="Cargar/Ver Anexos"/>';
                //        cad += '<span style="font-weight: bold;">' + json[element] + '</span>';
                //    } else {
                //        //cad += '<img src="../../Images/Portafolio/Proyectos/Adjuntos2.png" width="15px" height="13px"  class="imgCrecer" Title="Cargar Anexos"/>';
                //        cad += json[element];
                //    }
                //    cad += '</td>';
                //}


                cad += '</tr>';


            }


        }



    }
    else {
        var c1, c2;

        MostrarMsj("Usuario no tiene Actividades Aqui </br>Quite Algun Filtro", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
            entroCloseBtnAceptar = true;
            $("#divVentanaMensajes").dialog("close");
            WaitingVtn("divBloqVtndvFormulario", false, false, "");
        }, null);
    }
    cad += '</tbody>';
    cad += '</table></table></div></div></center>';
    return cad;
}

function HabilitaFiltros() {
    $("#slCatEstado").removeAttr('disabled');
    $("#slCatResponsable").removeAttr('disabled');
    $("#slActividades").removeAttr('disabled');
    $("#InBuscaCoincidencias").removeAttr('disabled');
    $("#datepicker3").datepicker('enable');
    $("#datepicker4").datepicker('enable');
}

/*----------------------------------------------- Exportacion -------------------------------------------------------------------------------*/
var OrdenActivada = 0;
function ExportaReporte(tipoArc) {
    Waiting(true, "Espere por favor. Cargando Información...");
    setTimeout(' Waiting(false, "Espere por favor. Cargando Información...");', 10000);
    OrdenActivada == 1 ? (__doPostBack(tipoArc, 'Orden del Día,' + FechaOrdenAct + ',1')) : (__doPostBack(tipoArc, 'Agenda Actividades'));
}

/*----------------------------------------------- Agregar Actividades -------------------------------------------------------------------------------*/
function AgregarActividadesTab(opcion, idActividad) {
    var cadena = '<div id="divBloqVtndvFormulario" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvFormulario" style="width:100%;height:100%;margin-top: 0px;"> ';
    cadena += '<table style="width:100%">';
    cadena += '<tr><td><table  style="width:100%" class="dataGridDatos"><thead><tr><th>Campo</th><th>Valor</th></tr></thead>';
    cadena += '<tbody style="text-align:left"><tr></tr><tr><td>Actividad:</td><td><input type="text" id="txtDescActividad" maxlength="100"  style="width:98%" /></td></tr>';
    cadena += '<tr><td>Descripcion:</td><td><textarea cols="30" rows="2" id="txtDescripcion" style="font: normal 10px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:98%; text-align:left; border: x;height:25px" ></textarea></td></tr>'
    cadena += '<tr><td>Tipo de Actividad:</td><td><select id="slIEActividades" style="width:99%" ><option value="-1">Seleccione una actividad</option><option value="1">Ordinarias</option><option value="2">Regulatorias</option><option value="3">Sistemas</option></select></td></tr>';
    cadena += '<tr><td>Responsable Seguimiento:</td><td><input id="txtResponsable"  style="width:98%" /></td></tr><tr><td>Responsables:</td><td><textarea cols="30" rows="2" id="txtCorresponsable" style="font: normal 10px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:98%; text-align:left; border: x;height:25px" ></textarea></td></tr>';
    cadena += '<tr><td>Fecha de Inicio:</td><td><input type="text" id="datepicker1"  style="width:91%" /></td></tr><tr><td>Fecha Compromiso:</td><td><input type="text" id="datepicker3"  style="width:91%" /></td></tr><tr><td>Fecha de Finalizacion:</td><td><input type="text" id="datepicker2"  style="width:91%" /></td></tr>';
    cadena += '<tr style="display:none;"><td>Estado:</td><td><select id="slEstado"  style="width:99%"><option value="-1">Seleccione un Estado</option><option value="1">Terminado</option><option value="2">Pendiente</option></select></td></tr>';
    cadena += '<tr style="display:none;"><td>Comentarios:</td><td><input type="text" maxlength="500"  style="width:98%" /></td></tr></tbody></table></td></tr>';
    cadena += '<tr style="height: 15px;"></tr><tr><td style="text-align: right;"><input type="button" id="btnGuardar" value="Guardar" class="classButton" onclick="crearActividad();"/></td></tr></table> ';

    cadena += '</div></div>';
    $("#dvFormulario").empty();
    AgregarVtnFlotante("dvFormulario", "", (opcion == "1" ? "AGREGAR" : "EDITAR") + " ACTIVIDAD", "", cadena, 280, 600, false, false, "", "", null);
    Corresponsables();

    $('#slActividades').html($('#slActividades').html());


    //Fecha Inicio
    $("#datepicker1").datepicker({ minDate: -0, maxDate: "+5M +10D" });
    $("#datepicker1").datepicker("option", "showAnim", "slide");
    $("#datepicker1").datepicker("option", { dateFormat: "dd/mm/yy" });

    //Fecha Termino
    $("#datepicker2").datepicker({ minDate: "+10M +10D", maxDate: "+10M +10D" });
    $("#datepicker2").datepicker("option", "showAnim", "slide");
    $("#datepicker2").datepicker("option", { dateFormat: "dd/mm/yy" });

    //Fecha Compromiso
    $("#datepicker3").datepicker({ minDate: "+10M +10D", maxDate: "+10M +10D" });
    $("#datepicker3").datepicker("option", "showAnim", "slide");
    $("#datepicker3").datepicker("option", { dateFormat: "dd/mm/yy" });

    opcionDeInsertado = opcion;
    idNuevaActividad = idActividad;
    if (opcion == 2) EditaActividad();
}

//------------------------------------ Crea Actividad y Edita Actividad-------------------------------------------------------------------------------------
var opcionDeInsertado; var idNuevaActividad;
function crearActividad() {
    //cambiarCheck();
    WaitingVtn("divBloqVtndvFormulario", true, true, "Guardando Información...");
    //peticionAjax("Proyectos.aspx/cambiarCheck", "POST", null, function () {
    //    ActualizarResponsablesYCorresponsables($("#txtResponsable").val() + ',', 0);
    //} , null);
    
    ActualizarResponsablesYCorresponsables($("#txtResponsable").val() + ',', 0);
}

function ActualizarResponsablesYCorresponsables(UsuariosResp, opcionActualiza) {
    var parametros = { Opcion: 1, UsuariosResp: UsuariosResp };
    peticionAjax("Proyectos.aspx/NoRegistrados", "POST", parametros,
        function ResultadosNoReg(data) {
            var ParamActCorreo = { Opcion: 2, Empleados: data.d.toString() };
            peticionAjax("Proyectos.aspx/ActualizaCorreo", "POST", ParamActCorreo,
                function AgregaNuevoActividad(dataC) {
                    dataC.d.toString() == 'true' ? (opcionActualiza == 0 ? ActualizarResponsablesYCorresponsables($("#txtCorresponsable").val(), 1) : AgreagaActFin()) : MostrarMsj("No se pudo relizar la opcion solicitada.", "Mensaje", false, true, false, "", "Aceptar", "", 200, 135, null, null, null);
                }, null);
        }, null);
}


function AgreagaActFin() {
    var parametros = {
        opcion: opcionDeInsertado, // +1 para que se coloque en el siguiente renglon
        idActividad: idNuevaActividad,
        idPais: idpaislogin,
        descActividad: $("#txtDescActividad").val(),
        idResposable: $("#txtResponsable").val() + ',',
        idCorresponsable: $("#txtCorresponsable").val(),
        fechaInicio: $("#datepicker1").val(),
        fechaFin: $("#datepicker2").val(),
        tipoActividad: $("#slIEActividades").val(),
        fechaCompromiso: $("#datepicker3").val(),
        Descripcion: $("#txtDescripcion").val(),
    };
     
    
    var entroCloseBtnAceptar = false;
    if ($("#slIEActividades").val() != -1) {
        peticionAjax("Proyectos.aspx/crearActividad", "POST", parametros, function (data) {
            WaitingVtn("divBloqVtndvFormulario", false, false, "Guardando Información...");
            $("#dvFormulario").dialog("close");
            MostrarMsj(data.d.indexOf("Status") != -1 ? data.d : "Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
                entroCloseBtnAceptar = true;
                $("#divVentanaMensajes").dialog("close");
                cambiarCheck();
            }, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                if (!entroCloseBtnAceptar);
                cambiarCheck();
                CheckFiltro();
                
            });
        }, null);
    }
    else {
        MostrarMsj("Falta Campo", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
            entroCloseBtnAceptar = true;
            $("#divVentanaMensajes").dialog("close");
            WaitingVtn("divBloqVtndvFormulario", false, false, "");
        }, null);
    }
}

//------------------------------------ ADJUNTOS-------------------------------------------------------------------------------------
var numeroAct; var actualizar = false;
function MenuAdjutarArchivos(numeroActividad,nombre) {
    numeroAct = numeroActividad;
    var cadena = '<div id="divBloqVtndvAdjuntos" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvAdjuntos" style="width:100%;height:100%;margin-top: 0px;">  ';
    cadena += '<table style="width:100%" class="dataGridDatos"><tr><td><input type="file" id="fuArchivosAdjuntos" name="fuArchivosAdjuntos" style="width:90%; height:20px" />';
    cadena += '<input id="btnCargarFile" type="button" value="Cargar" onclick="return enviarArchivoAsincronamente(this);" class="classButton"/></td></tr>';
    cadena += '<tr class="alternateRowAlt" style="width: 100%;" ><td align="right" style="font-size:small;"><strong>Nota: </strong> Límite de Carga de Adjuntos 2MB.</td></tr>';
    cadena += '<tr><td><br /> </td></tr></table><div id="dvFilesAdjuntos" style="height: 60%;overflow: auto;"> </div>';
    cadena += '</div></div>';
    $("#dvAdjuntos").empty();
    AgregarVtnFlotante("dvAdjuntos", "", numeroActividad+" "+nombre+" "+"Cargar Anexos", "", cadena, 200, 650, false, false, "", "", null);
    $("#dvAdjuntos").on("dialogclose", function (event, ui) {
      //CheckFiltro();
    });
    ObtenerArchivosAdjuntos();
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
function ObtenerArchivosAdjuntos() {
    WaitingVtn("divBloqVtndvAdjuntos", true, true, "Cargando Información");
    //document.getElementById("imgVtnLoading").style.marginTop = "6%";
    var Parametros = { opcion: 1, IdActividad: numeroAct, NomAcrhivo: '' }
    peticionAjax("Proyectos.aspx/obtieneArchivosAdjuntos", "POST", Parametros, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        if (data.d == "") { $("#dvAdjuntos").animate({ height: "100px" }); $("#divBloqVtndvAdjuntos").animate({ height: "80%" }); }
        else { $("#dvAdjuntos").animate({ height: "190px" }); $("#divBloqVtndvAdjuntos").animate({ height: "88%" }); }
        document.getElementById("imgVtnLoading").style.marginTop = "6%";
        var cad = generarTablaDeAdjuntos(JSON);
        $('#dvFilesAdjuntos').html('<br />' + cad);
        WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
    }, null);
}

function generarTablaDeAdjuntos(listaDeJSON, idActividad) {
    var NombreArch = '';
    var cad = '<center><table class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';

    var auxJSON = listaDeJSON[0];

    for (var encabezados in auxJSON) {
        cad += '<th style="width:20%">';
        cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '</tr>';
    cad += '</thead>';

    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        //cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        cad += '<tr class="rowAlt">';
        var json = listaDeJSON[filas];
        for (var element in json) {
          
            if (element == 'Fecha de Carga') {
                cad += '<td>';
                cad += json[element];
            }
            else if (element == 'Archivos Adjuntos') {
                cad += '<td class="tdEnabled">';
                cad += '<a id="aBorra" onclick="obtieneArchivoAd(\'' + json[element]+'\',\''+ numeroAct +'\');" style="text-decoration: underline; color:Blue" Title="Descargar Archivo">';
                cad += json[element];
                cad += '</a>';
            }
            else
            {
                cad += '<td>';
                cad += json[element];
            }
            cad += '</td>';
        }

        if (json != null) {
            cad += '<td style="width:4%; border-width:1" onclick="eliminaArchivo(\'' + json['Archivos Adjuntos'] + '\');" class="tdEnabled">';
            cad += '<img src="../../Images/Grales/Deletefile.png" width="15px" height="13px"  />Eliminar';
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;

}
//--------------------------------------------------------Obtiene el archivo Fisico--------------------------------------------
function obtieneArchivoAd(nombreActividades,numa) {
    window.location.assign("RespuestaAdjuntos.aspx?nomA=" + nombreActividades + "&idAcdad=" + numa);
}
//--------------------------------------------------------------Elimina Archivo ------------------------------------------------
function eliminaArchivo(nomArc) {
    WaitingVtn("divBloqVtndvAdjuntos", true, true, "Borrando Archivo");
    document.getElementById("imgVtnLoading").style.marginTop = "6%";
    var Parametros = { opcion: 4, IdActividad: numeroAct, NomAcrhivo: nomArc }
    peticionAjax("Proyectos.aspx/eliminaArchivosAdjuntos", "POST", Parametros, validaRespuesta, validaRespuesta);
}

function validaRespuesta(data) {
    WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    WaitingVtn("divBloqVtndvAdjuntos", true, false, "");
    actualizar = true;
    MostrarMsj(arrayJSON[0].Exito.toString() + ".", "Mensaje", false, true, false, "", "Aceptar", "", 200, 135, null, function () {
        WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
        $("#divVentanaMensajes").dialog("close");
        ObtenerArchivosAdjuntos();
    }, null);
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
        ObtenerArchivosAdjuntos();
    });
}

//------------------------------------------------------------------------------------------------------------------------------------------------
function enviarArchivoAsincronamente(obj) {
    if (!validarExistenciaDeArchivo($(obj).parent().find("input:file"))) { return false; }
    var idInputFile = $(obj).parent().find("input:file").attr("id");
    var parametros = {
        'subirArchivo': 'subirArchivo',
        'NoActividad': numeroAct
    };
    return ajaxFileUpload(idInputFile, obj, parametros);
}
//-------------------------------------------------------------------------------------------------------------------------------------------------
function validarExistenciaDeArchivo(obj) {
    var bandera = false;
    if ($(obj).val() == '') {
        WaitingVtn("divBloqVtndvAdjuntos", true, false, "");
        MostrarMsj("Debe seleccionar un archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 200, 120, null, function () {
            $("#divVentanaMensajes").dialog("close");
            WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
        });
    }
    else { bandera = true; }
    return bandera;
}
///-------------------------------------------------------------------------------------------------------------------------------------------------
var nomArchivoASubir;
function ajaxFileUpload(idInputFile, obj, parametros) {
  //  WaitingVtn("divBloqVtndvAdjuntos", true, true, "Subiendo Archivo");
  //  document.getElementById("imgVtnLoading").style.marginTop = "6%";
    $.ajaxFileUpload
		    ({
		        url: 'Proyectos.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaAdjuntos(data, obj);
		        }
		    });
    return false;
}
//------------------------------------------------------------------------------------------------------------------------------------------------------
function reportarStatusDeSubidaAdjuntos(data, obj) {
    data = data.toString().replace("<PRE>", "").replace("</PRE>", "").replace("<pre>", "").replace("</pre>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "").replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');
    if (data.toString().indexOf("Error") == -1) {
        actualizar = true;
        MostrarMsj(data, "Mensaje", false, true, false, "", "Aceptar", "", 200, 120, null, function () {
            WaitingVtn("divBloqVtndvAdjuntos", false, false, "Subiendo Archivo");
            $("#divVentanaMensajes").dialog("close");
            ObtenerArchivosAdjuntos();
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndvAdjuntos", false, false, "Subiendo Archivo");
            ObtenerArchivosAdjuntos();
        });
    } else {
        MostrarMsj(data.split(":")[1], "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
            $("#divVentanaMensajes").dialog("close");
            WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
        });
    }
}

//-------------------------------------------EDITAR ACTIVIDAD -----------------------------------------------------------------

function EditarActividadTab(obj) {
    AgregarActividadesTab(2, obj);
}

function EditaActividad() {
    WaitingVtn("divBloqVtndvFormulario", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "12%";
    var parametros = { noActividad: idNuevaActividad };
    peticionAjax("Proyectos.aspx/EditarActividad", "POST", parametros, ObtieneDatosActividad, null);
}

function ObtieneDatosActividad(data) {
    var tamSelect = $('#slResponsable option').length;
    var JSON = obtenerArregloDeJSONModificado(data.d, false);
    $("#slPais").val(JSON[0].Pais);
    $("#txtDescActividad").val(JSON[0].Descripcion);
    $("#datepicker1").val(JSON[0].FechaInicio);
    $("#datepicker3").val(JSON[0].FechaCompromiso);
    $("#datepicker2").val(JSON[0].FechaTermino);
    $("#txtResponsable").val(JSON[0].Responsable);
    $("#txtCorresponsable").val(JSON[0].Corresponsable);
    $("#slIEActividades").val(JSON[0].TipoActividad);
    $("#txtDescripcion").val(JSON[0].Descrip);
    var respon = JSON[0].Iduser;
    var datefinal = JSON[0].FechaTermino;
    if (respon == LogUsuario) {        
        if (datefinal != "") {
            document.getElementById('datepicker2').disabled = true;
            $('#datepicker2').datepicker().datepicker('disable');

        }
    }
    else
    {
        document.getElementById('txtCorresponsable').disabled = true;
        document.getElementById('txtDescripcion').disabled = true;
        document.getElementById('slIEActividades').disabled = true;
        document.getElementById('txtDescActividad').disabled = true;
        document.getElementById('txtResponsable').disabled = true;
        document.getElementById('datepicker1').disabled = true;
        $('#datepicker1').datepicker().datepicker('disable');
        document.getElementById('datepicker3').disabled = true;
        $('#datepicker3').datepicker().datepicker('disable');
        document.getElementById('datepicker2').disabled = true;
        $('#datepicker2').datepicker().datepicker('disable');
    }

    WaitingVtn("divBloqVtndvFormulario", false, false, "Cargando Información...");
}

//-----------------------------Evaluacion (Nuevo Requerimiento 22/02/2016)--------------------------------


function Evaluacion() {
    var cadena = '<div id="divBloqVtndvFormulario" style="width:98%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvFormulario" style="width:100%;height:100%;margin-top: 0px;"> ';
    cadena += '<table style="width:100%">';
    cadena += '<tr><td><table  style="width:100%" class="dataGridDatos"><thead><tr><th>Campo</th><th>Valor</th></tr></thead>';
    cadena += '<tbody style="text-align:left"><tr></tr>';
    cadena += '<tr><td>Responsable Seguimiento:</td><td style=" text-align: center"><select id="slCatResponsable" style="width: 100%; font-size: 11px" ></select></td></tr>';
    cadena += '<tr><td>Inicio:</td><td><input type="text" id="datepicker1"  style="width:90%" /></td></tr><tr><td>Fin:</td><td><input type="text" id="datepicker2"  style="width:90%" /></td></tr>';
    cadena += '<tr><td><br/> </td><td><br/> </td></tr>';
    cadena += '<tr><td><br/> </td><td><br/> </td></tr>';
    cadena += '<tr><td><br/> </td><td><br/> </td></tr>';
    cadena += '<tr><td style="text-align: left;"><input type="button" id="btnGuardar" value="Evaluar" class="classButton" onclick="EvaluarPersona();"/></td><td><input type="text" id="ResultExam" readOnly="true"></td></tr></table> ';
    cadena += '</div></div>';
    $("#dvFormulario").empty();
    AgregarVtnFlotante("dvFormulario", "", "Evaluar" + " Actividad", "", cadena, 200, 600, false, false, "", "", null);
    Corresponsables();

    $("#datepicker1").datepicker({ minDate: "+10M +10D", maxDate: "+10M +10D" });
    $("#datepicker1").datepicker("option", "showAnim", "slide");
    $("#datepicker1").datepicker("option", { dateFormat: "dd/mm/yy" });

    $("#datepicker2").datepicker({ minDate: "+10M +10D", maxDate: "+10M +10D" });
    $("#datepicker2").datepicker("option", "showAnim", "slide");
    $("#datepicker2").datepicker("option", { dateFormat: "dd/mm/yy" });
    cargarCatRes();
}
function EvaluarPersona() {
    var parametros = {
        Pais: idpaislogin,
        Responsable: $("#slCatResponsable").val(),
        FechaInicio: $("#datepicker1").val(),
        FechaFin: $("#datepicker2").val()
    };
    peticionAjax("Proyectos.aspx/crearEvaluacion", "POST", parametros, otc, fail);
}
function fail(data) { }

function otc(data) {
    var JSON = obtenerArregloDeJSON(data.d, false);
    var mjs;
    var result = JSON[0].Column1;
    if (result != "") {
        var final = (result * 10);
        if ((100 - final) > 100)
        { mjs = 100; }
        else { mjs = 100 - final }
        $("#ResultExam").val(mjs);
    }
    else {
        MostrarMsj(data.d.indexOf("Error") != -1 ? data.d : "Falta Informacion para poder Evaluar.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
            entroCloseBtnAceptar = true;
            $("#divVentanaMensajes").dialog("close");
        });
        $("#ResultExam").val("N/A");
    }
}
function cargarCatRes() {
    peticionAjax("Proyectos.aspx/obtieneCatalogos", "POST", { TipoCat: 2 }, function (data) {
        var cad = '';
        var cad2 = '';
        cad += '<option value="-1">Seleccione Responsable</option>';
        try {
            var arrayJSON = obtenerArregloDeJSON(data.d, false);
            for (var x = 0; x < arrayJSON.length; x++) {
                var json = arrayJSON[x];
                cad2 += '<option value="' + json.IdOpcion + '">';
                cad2 += json.Descripcion;
                cad2 += '</option>';
            }
        } catch (err) { }
        cad += cad2;
        $('#slCatResponsable').html(cad);
    }, null);
}


//------------------------------Parte del comentario adjunto
//function enviarArchivoAsincronamentecom(obj,idactividad) {
//   // if (!validarExistenciaDeArchivocom($(obj).parent().find("input:file"))) { return false; }
//    var idInputFile = 'fuArchivosAdjuntos';
//    var parametros = {
//        'subirArchivo': 'subirArchivo',
//        'NoActividad': idactividad
//    };
//    return ajaxFileUpload2(idInputFile, obj, parametros);
//}
////-------------------------------------Se repirten algunas funciones debido a la colision de datos, estan fueron modificacdas para soportar a comentarios
//function validarExistenciaDeArchivocom(obj) {
//    var bandera = false;
//    if ($(obj).val() == '') {
//        WaitingVtn("divBloqVtndvAdjuntos", true, false, "");
//        MostrarMsj("Debe seleccionar un archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 200, 120, null, function () {
//            $("#divVentanaMensajes").dialog("close");
//            WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
//        }, null);
//        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
//            WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
//        });
//    }
//    else { bandera = true; }
//    return bandera;
//}


//function ajaxFileUpload2(idInputFile, obj, parametros) {
//    //  WaitingVtn("divBloqVtndvAdjuntos", true, true, "Subiendo Archivo");
//    //  document.getElementById("imgVtnLoading").style.marginTop = "6%";
//    var validacion;
//    $.ajaxFileUpload
//		    ({
//		        url: 'Proyectos.aspx',
//		        fileElementId: idInputFile,
//		        dataType: 'json',
//		        data: parametros,
//		        complete: function () {
//		        },
//		        success: function (data, status) {
//		            reportarStatusDeSubidaAdjuntos2(data, obj);
//		            var re = data.toString();
//		            return re;
//		        },
//		        error: function (data) {
//		            var re = data.toString();
//		            return re;
//		        }
//		    });
//}

//function reportarStatusDeSubidaAdjuntos2(data, obj) {
//    data = data.toString().replace("<PRE>", "").replace("</PRE>", "").replace("<pre>", "").replace("</pre>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "").replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');
//    if (data.toString().indexOf("Error") == -1) {
//        actualizar = true;
//        MostrarMsj(data, "Mensaje", false, true, false, "", "Aceptar", "", 200, 120, null, function () {
//            WaitingVtn("divBloqVtndvAdjuntos", false, false, "Subiendo Archivo");
//            $("#divVentanaMensajes").dialog("close");
//            //ObtenerArchivosAdjuntos();
//        }, null);
//        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
//            WaitingVtn("divBloqVtndvAdjuntos", false, false, "Subiendo Archivo");
//           // ObtenerArchivosAdjuntos();
//        });
//    } else {
//        MostrarMsj(data.split(":")[1], "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
//            $("#divVentanaMensajes").dialog("close");
//            WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
//        }, null);
//        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
//            WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
//        });
//    }
//}
//-------------------------------------------------------------------------------------------------------------------------------------------------