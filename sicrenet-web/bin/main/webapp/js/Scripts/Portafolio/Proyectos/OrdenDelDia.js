function MuestraVentanaOrden() {
    var cadena = '<div id="divBloqVtndvOrdelDelDia" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvOrdelDelDia" style="width:100%;height:100%;margin-top: 0px;">  ';
    cadena += '<table class="" style="width: 100%;"><tr> <td id="tdFiltro" style="text-align:center; width:50%;height:28px"  ><span onclick="ObtieneListaOrdenes()" class="tdEnabled"><img id="imgFiltro" alt="Lista de Ordenes" src="../../Images/Portafolio/Proyectos/FiltraInf.png" class="imgCrecerMedium"/>Mostrar Lista de Ordenes </span></td><td id="tdCrear" style="height:28px" ><span onclick="ObtienOrdenes(1)" class="tdDisabled"><img id="imgCrear" alt="Crear Orden" src="../../Images/Portafolio/Proyectos/EngranesD.png" class="imgCrecerMediumBig"/>Crear</span></td></tr></table>';
    cadena += ' <table class="dataGridDatos" style="width: 100%;height: 85%;"><tr><td colspan="2" style="text-align:center; vertical-align:middle;height:140px" ><div id="dvListaOrdenesF" style="width:100%; text-align:center;height:100%;overflow:auto"></div><div id="dvListaOrdenesF" style="width:100%; text-align:center"></div><div id="Div1" style="width:110%; text-align:center;height: 130%;overflow: auto;margin-top:' + (navigator.appName.indexOf('Explorer') != -1 ? '0px;' : '40px;') + '"></div><div id="DragDropOrden"  style="text-align:center">';
    cadena += ' <table style="width: 100%;"><tr> <td> <select id="slPaisOrden" onchange="ObtienOrdenes(0);"></select></td><td></td><td>Fecha:<input id="txtFechaOrdenDia" /></td></tr><tr><td style="width: 49%;"><div id="dvListaOrdenes"><fieldset id="box1Group" style="width: 100%;height: 130px;" class="fieldsetListBoxDeSeleccion"><legend style="font-size:10px;">Actividades Pendientes</legend><select id="slcOrigen" style="width: 301px;height: 90%;font" name="view" multiple="multiple" class="selectListBoxDeSeleccion"></select></fieldset></div></td>';
    cadena += '<td style="width: 2%;"> <img id="to2" src="../../Images/Cancelaciones/CarteraSuceptible/next.gif" alt="Seleccionar" class="btnSeleccionListBox" width="10" height="12" title="Pasar Seleccionados" /><br /><img id="allTo2" src="../../Images/Cancelaciones/CarteraSuceptible/last.gif" alt="Seleccionar todos" class="btnSeleccionListBox" width="10" height="12" title="Pasar Todos" /><br /><img id="allTo1" src="../../Images/Cancelaciones/CarteraSuceptible/first.gif" alt="Desselecionar todos"class="btnSeleccionListBox" width="10" height="12" title="Regresar Todos"/><br /><img id="to1" src="../../Images/Cancelaciones/CarteraSuceptible/prev.gif" alt="Desseleccionar" class="btnSeleccionListBox" width="15" height="12" title="Regresar Seleccionados"/></td><td style="width: 49%;"><fieldset id="box2Group" style="width: 100%;height: 130px;" class="fieldsetListBoxDeSeleccion"><legend style="font-size:10px;">Orden del Dia</legend><select id="slcDestino" style="width: 301px;height: 90%;" name="view" multiple="multiple" class="selectListBoxDeSeleccion"></select><br /></fieldset></td></tr>';
    cadena += '<tr><td colspan="3" style="text-align:center"><input type="button" id="btnGuardaEditaOrden" onclick="GuardaOrden()" class="classButton" /></td></tr></table></div></td></tr></table>';
    cadena += '</div></div>';
    $("#dvOrdelDelDia").empty();
    AgregarVtnFlotante("dvOrdelDelDia", "", "ORDEN DEL DÍA", "", cadena, 280, 655, false, false, "", "", null);
    asignarEventosListBox();
    $("#txtFechaOrdenDia").datepicker({ minDate: 0, maxDate: "+10M +10D" });
    for (var i = 1; i < document.getElementById('slCatPais').options.length; i++) {
        var opt = document.createElement('option');
        opt.value = document.getElementById('slCatPais').options[i].value;
        opt.innerHTML = document.getElementById('slCatPais').options[i].innerHTML;
        document.getElementById('slPaisOrden').appendChild(opt);
    }
    //$('#slPaisOrden').html($('#slCatPais').html());
    ObtieneListaOrdenes();
}
var esCrearOrModif = 0
//-----------------------------------------------------------Funcion paso items List Box-----------------------------------------------------------------------
function asignarEventosListBox() {

    $(function () {
        var biggest = 0;
        $(".btnSeleccionListBox").each(function (i) {
            if ($(this).width() > biggest) { biggest = $(this).width(); }
        });
        biggest += 10;
        //Mueve Un elemento de izquierda a derecha al dar doble click sobre el
        $("#box1Group select[name='view']").dblclick(function () {
            MoveSelected('box1Group', 'box2Group');
        });

        //Mueve Un elemento de derecha a izquierda al dar doble click sobre el
        $("#box2Group select[name='view']").dblclick(function () {
            MoveSelected('box2Group', 'box1Group');
        });

        //Mueve Un elemento de izquierda a derecha al dar click sobre el boton DERECHA( > )
        $("#to2").click(function () {
            MoveSelected('box1Group', 'box2Group');
        }).width(biggest);

        //Mueve Un elemento de derecha a izquierda al dar doble click sobre el boton IZQUIERDA( < )
        $("#allTo2").click(function () {
            MoveAll('box1Group', 'box2Group');
        }).width(biggest);

        //Mueve todos los elementos de izquierda a derecha al dar click sobre el boton DERECHA( >> )
        $("#allTo1").click(function () {
            MoveAll('box2Group', 'box1Group');
        }).width(biggest);

        //Mueve todos los elementos de derecha a izquierda al dar doble click sobre el boton IZQUIERDA( << )
        $("#to1").click(function () {
            MoveSelected('box2Group', 'box1Group');
        }).width(biggest);
    });
}

function SortOptions(toSortGroupID) {
    var $toSortOptions = $("#" + toSortGroupID + " select[name='view'] option");
    $toSortOptions.sort(function (a, b) {
        var aVal = a.text.toLowerCase();
        var bVal = b.text.toLowerCase();
        if (aVal < bVal) { return -1; }
        if (aVal > bVal) { return 1; }
        return 0;
    });
    $("#" + toSortGroupID + " select[name='view']").empty().append($toSortOptions);
}

function MoveSelected(fromGroupID, toGroupID) {
    $("#" + fromGroupID + " select[name='view'] option:selected").clone().appendTo("#" + toGroupID + " select[name='view']").end().end();
    $("#" + fromGroupID + " select[name='view'] option:selected").remove();
}

function MoveAll(fromGroupID, toGroupID) {
    $("#" + fromGroupID + " select[name='view'] option").attr('selected', 'selected');
    MoveSelected(fromGroupID, toGroupID);
}

function ObtieneListaOrdenes() {
    $(".imgCrecerOrdenD").hide();
    $("#tdCrear").attr("class", "tdDisabled");
    document.getElementById("imgCrear").setAttribute('src', '../../Images/Portafolio/Proyectos/EngranesD.png');
    $("#tdFiltro").attr("class", "tdEnabled");
    document.getElementById("imgFiltro").setAttribute('src', '../../Images/Portafolio/Proyectos/FiltraInf.png');

    WaitingVtn("divBloqVtndvOrdelDelDia", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    $("#dvListaOrdenesF").slideDown('slow');
    $("#DragDropOrden").slideUp('slow');
    $("#Div1").slideUp('slow');
    //$("#dvMostrarOrdenDelDia").hide();  
    var Parametros = { Opcion: 1, Pais: 0, FechaOrden: '2013/08/25', Actividades: '' };
    peticionAjax("Proyectos.aspx/ObtieneActPendientesOrden", "POST", Parametros, CargaListaOrdenes, null);
}

function CargaListaOrdenes(data) {
    if (data.d != "") {
        var arrayJSON = obtenerArregloDeJSON(data.d, false);
        var cadena = '';
        cadena = generarTablaDeRegistrosOrden(arrayJSON);
        $("#dvListaOrdenesF").html(cadena);
        WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Cargando Información...");
        $(".imgCrecerOrdenD").show();
    }
    else {
        WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Cargando Información...");
        WaitingVtn("divBloqVtndvOrdelDelDia", true, false, "Cargando Información...");
        MostrarMsj('Sin Datos.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 125, null, function () {
            WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Cargando Información...");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "");
        });
    }
}

function generarTablaDeRegistrosOrden(listaDeJSON) {
    var encabezadoAux = '';
    var cad = '<center><table style="width:100%;" class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        cad += '<th>';
        cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '<th></th><th></th><th></th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="rowAlt" style="height:25px;">' : '<tr class="alternateRowAlt" style="height:30px;">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td>';
            cad += json[element];
            cad += '</td>';
        }
        cad += '<td onclick="MuestraOrdenDia(\'' + listaDeJSON[filas]["Fecha de Orden"] + '\');" style="cursor:pointer;" class="tdEnabledColor">';
        cad += '<img src="../../Images/Portafolio/Proyectos/Vizualizar.png" width="15px" alt="Ver Orden"  class="imgCrecerOrdenD" style=""/><span>&nbsp&nbsp&nbsp&nbsp&nbsp</span> Ver Orden';
        cad += '</td>';
        cad += '<td onclick="LlenaDestino(\'' + listaDeJSON[filas]["Fecha de Orden"] + '\');" style="cursor:pointer;" class="tdEnabledColor">';
        cad += '<img src="../../Images/Portafolio/Proyectos/EditarOrden.png" width="15px" alt="Editar Orden" class="imgCrecerOrdenD" style=";"/><span>&nbsp&nbsp&nbsp&nbsp&nbsp</span>Modificar Orden';
        cad += '</td>'
        cad += '<td onclick="AgregaDestinatarios(\'' + listaDeJSON[filas]["Fecha de Orden"] + '\');" style="cursor:pointer;" class="tdEnabledColor"><img src="../../Images/Portafolio/Proyectos/enviar.png" width="15px" style="" alt="Envíar Orden" class="imgCrecerOrdenD"/><span>&nbsp&nbsp&nbsp&nbsp&nbsp</span>Envíar Orden</td>';
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}
//--------------------------------------Muestra Orden Del Dia -------------------------------------------------
var Fecha1 = '';
var Fecha2 = '';
function MuestraOrdenDia(fecha) {
    $("#dvListaOrdenesF").slideUp('slow');
    $("#DragDropOrden").slideUp('slow');
    $("#Div1").slideDown('slow');
    OdernNoOrden(fecha);
}
/*---------------------------------- Intercalar Vista Orden cn  V. Normal --------------------------------------------------------------------*/
var hideOrden_Pais = '';
var hideOrden_Responsable = '';
var hideOrden_Estado = '';
var hideOrden_FechaIni = '';
var hideOrden_FechaFin = '';
var hideOrden_Busqueda = '';

var OrdenActivada = 0;
var FechaOrdenAct = '';

function OdernNoOrden(FechaVista) {
    $("#dvOrdelDelDia").dialog("close");
    var parametros;
    if ($('#CreaOrdenDD')[0].style.display == 'block' || $('#CreaOrdenDD')[0].style.display == '') {
        $('#CerrarOrden').show();
        $('#CreaOrdenDD').hide();
        OrdenActivada = 1;
        FechaOrdenAct = FechaVista;
        parametros = { VistaPriorizada: '0', Pais: '-1', Responsable: '-1', Estado: '-1', Palabra: '', FechaAnt: '', FechaAct: '', FechaOrdenB: FechaVista };
        /*-------------------------------------------------------------*/
        hideOrden_Pais = $('#slCatPais').val();
        hideOrden_Responsable = $('#slCatResponsable').val();
        hideOrden_Estado = $('#slCatEstado').val();
        hideOrden_FechaIni = $('#datepicker3').val();
        hideOrden_FechaFin = $('#datepicker4').val();
        hideOrden_Busqueda = $('#InBuscaCoincidencias').val();
        /*-------------------------------------------------------------*/
    } else {
        $('#CerrarOrden').hide();
        $('#CreaOrdenDD').show();
        parametros = { VistaPriorizada: '0', Pais: hideOrden_Pais, Responsable: hideOrden_Responsable, Estado: hideOrden_Estado, Palabra: hideOrden_Busqueda, FechaAnt: hideOrden_FechaIni, FechaAct: hideOrden_FechaFin, FechaOrdenB: '' };
        /*-------------------------------------------------------------*/
        hideOrden_Pais = '-1';
        hideOrden_Responsable = '-1';
        hideOrden_Estado = '-1';
        hideOrden_FechaIni = '';
        hideOrden_FechaFin = '';
        hideOrden_Busqueda = '';
        OrdenActivada = 0;
        FechaOrdenAct = '';
        /*-------------------------------------------------------------*/
    }
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Proyectos.aspx/FiltrarInformacion", "POST", parametros, TableroControl, TableroControl);
}

//-----------------------------LlenaDestino ---------------------------------------------------------
function LlenaDestino(fecha) {
    var Fecha = fecha;
    peticionAjax("Proyectos.aspx/FechaActual", "POST", { fecha: fecha },
                function RespuestaFechaSistema(data) {
                    if (data.d == "true") {
                        Fecha2 = Fecha.split('/');
                        Fecha = Fecha2[2] + Fecha2[1] + Fecha2[0];
                        $('#slPaisOrden').val(-1);
                        $('#btnGuardaEditaOrden').val('Modifica Orden del Día');
                        var Parametros = { Opcion: 5, Pais: 0, FechaOrden: fecha, Actividades: '' };
                        peticionAjax("Proyectos.aspx/ObtieneActPendientesOrden", "POST", Parametros, GeneraDestino, null);
                    } else {
                        WaitingVtn("divBloqVtndvOrdelDelDia", true, false, "Cargando Información...");
                        $(".imgCrecerOrdenD").hide();
                        MostrarMsj("No se puede Editar,  se ha cumplido el dia de revisión de la orden.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 125, null, function () {
                            WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Cargando Información...");
                            $("#divVentanaMensajes").dialog("close");
                            $(".imgCrecerOrdenD").show();
                        }, null);
                        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                            WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "");
                            $(".imgCrecerOrdenD").show();
                        });
                    }
                }, null);
}

function GeneraDestino(data) {
    var cad = "";
    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    for (var x = 0; x < arrayJSON.length; x++) {
        cad += '<option value="' + arrayJSON[x].Id + '">' + arrayJSON[x].Id + '.' + arrayJSON[x].Actividad + '(' + arrayJSON[x].Pais + ')' + '</option>';
    }
    $('#slcDestino').html(cad);
    $('#txtFechaOrdenDia').val(Fecha2[0] + '/' + Fecha2[1] + '/' + Fecha2[2]);
    ObtienOrdenes(2);
}

function ObtienOrdenes(Tipo) {
    Tipo != 0 ? esCrearOrModif = Tipo : null;
    $('.ui-datepicker-trigger').removeAttr('disabled')
    $(".imgCrecerOrdenD").hide();
    $("#tdCrear").attr("class", "tdEnabled");
    document.getElementById("imgCrear").setAttribute('src', '../../Images/Portafolio/Proyectos/Engranes.png');
    $("#tdFiltro").attr("class", "tdDisabled");
    document.getElementById("imgFiltro").setAttribute('src', '../../Images/Portafolio/Proyectos/FiltraInfD.png');
    WaitingVtn("divBloqVtndvOrdelDelDia", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    $("#dvListaOrdenesF").slideUp('slow');
    $("#DragDropOrden").slideDown('slow');
    $("#Div1").slideUp('slow');
    Tipo == 2 || esCrearOrModif == 2 ? $('#txtFechaOrdenDia').attr('disabled', 'disabled') : null;
    Tipo == 2 || esCrearOrModif == 2 ? $('.ui-datepicker-trigger').attr('disabled', 'disabled') : null;
    Tipo == 1 ? ($('#slcDestino').html(''), $('#txtFechaOrdenDia').val(''), $('#slPaisOrden').val(-1), $('#txtFechaOrdenDia').removeAttr('disabled'), $('#btnGuardaEditaOrden').val('Guarda Orden del Día')) : null;
    var Parametros = { Opcion: 3, Pais: $('#slPaisOrden').val(), FechaOrden: '2013/08/25', Actividades: '' };
    peticionAjax("Proyectos.aspx/ObtieneActPendientesOrden", "POST", Parametros, CargaActividadesOrden, null);
}

function CargaActividadesOrden(data) {
    var cad = "";
    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    var cadAux = '';
    var AuxiliaExiste = 0;
    LeeDestino() != '' ? cadAux = LeeDestino().split(',') : cadAux = '';
    if (arrayJSON[0] != null) {
        for (var x = 0; x < arrayJSON.length; x++) {
            if (cadAux != '') {
                AuxiliaExiste = 0;
                for (var y = 0; y < cadAux.length; y++) {
                    if (AuxiliaExiste == 0) {
                        arrayJSON[x].Id.toString() == cadAux[y].toString() ? AuxiliaExiste = 1 : AuxiliaExiste = 0;
                    } else { break; }
                }
                AuxiliaExiste == 0 ? cad += '<option value="' + arrayJSON[x].Id + '">' + arrayJSON[x].Id + '.' + arrayJSON[x].Actividad + '(' + arrayJSON[x].Pais + ')' + '</option>' : cad += '';
            } else {
                cad += '<option value="' + arrayJSON[x].Id + '">' + arrayJSON[x].Id + '.' + arrayJSON[x].Actividad + '(' + arrayJSON[x].Pais + ')' + '</option>';
            }
        }
    }
    $('#slcOrigen').html(cad);
    WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Cargando Información...");
}

function LeeDestino() {
    var cad = '';
    $('#slcDestino').find('option').each(function (index) { cad += $(this).val() + ','; });
    cad = cad.substring(0, cad.length - 1);
    return cad;
}

//---------------------Guarda Orden Dia ----------------------------------------------
function GuardaOrden() {
    var ActividadesOrden = LeeDestino();
    if ($('#txtFechaOrdenDia').val() != '' && ActividadesOrden != '') {
        WaitingVtn("divBloqVtndvOrdelDelDia", true, true, "Guardando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "8%";
        var Parametros = { Opcion: ($('#btnGuardaEditaOrden').val() == 'Modifica Orden del Día' ? 6 : 4), Pais: 0, FechaOrden: $('#txtFechaOrdenDia').val(), Actividades: ActividadesOrden };
        peticionAjax("Proyectos.aspx/ObtieneActPendientesOrden", "POST", Parametros, MensajeGuardar, null);
    } else {
        WaitingVtn("divBloqVtndvOrdelDelDia", true, false, "Cargando Información...");
        MostrarMsj('No se deben dejar campos vacios (Fecha, Orden del Dia).', "Mensaje", false, true, false, "", "Aceptar", "", 250, 125, null, function () {
            WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Cargando Información...");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "");
        });
    }
}

function MensajeGuardar(data) {
    //WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Guardando Información...");
    if (data.d == "ERROR") {
        MostrarMsj('Error al guardar.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 115, null, function () {
            WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Cargando Información...");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "");
        });
        return;
    }
    var arrayJSON = obtenerArregloDeJSON(data.d, false);
    MostrarMsj(arrayJSON[0].Mensaje.toString().split(':') + '.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 115, null, function () {
        WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Cargando Información...");
        $("#divVentanaMensajes").dialog("close");
        if (arrayJSON[0].Mensaje.toString().split(':')[0].toString() != 'Error') {
            ObtieneListaOrdenes();
        }
    }, null);
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "");
        if (arrayJSON[0].Mensaje.toString().split(':')[0].toString() != 'Error') {
            ObtieneListaOrdenes();
        }
    });
}

/*--------------------------------  Agrega Destinatarios -----------------------------------------------------------------*/
function AgregaDestinatarios(fechaOrden) {
    var cadena = '<div id="dvDestinatariosOrden" style="width:auto;height:270px;overflow:auto;text-align:center"><table><tr><td><b>Buscar Destinatario:</b><input id="txtDestinatario" style="width:464px" /> <input type="button" value="Agregar" onclick="AgregarDestinariosAlista();" class="classButton"/></td></tr>';
    cadena += '<tr><td><fieldset id="Fieldset1" class="fieldsetListBoxDeSeleccion" style="height: 115px;width:100%"><legend>Destinatarios</legend> <div id="slcDestinatarios" style="width: 100%;height: 90%;font-size:10px;overflow: auto;text-align: left;" class="selectListBoxDeSeleccion"><ul id=ulDestinarios></ul></div></fieldset></td></tr><tr><td><input type="button" value="Envíar Oden del Día" class="classButton" onclick="EnviarOrdenDiaEmail(\'' + fechaOrden + '\');"/></td></tr></table></div>';
    $("#Div1").html(cadena);
    Corresponsables();
    $(".imgCrecerOrdenD").hide();
    $("#dvListaOrdenesF").slideUp('slow');
    $("#DragDropOrden").slideUp('slow');
    $("#Div1").slideDown('slow');
    AgregarResponsablesAListaDestinatarios(fechaOrden);
}

function AgregarResponsablesAListaDestinatarios(fechaOrden) {
    WaitingVtn("divBloqVtndvOrdelDelDia", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax("Proyectos.aspx/ObtenerCorreosResponsables", "POST", { fechaOrden: fechaOrden },
     function (data) {
         WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Cargando Información...");
         var JSON = obtenerArregloDeJSON(data.d, false);
         for (var i = 0; i < JSON.length; i++) {
             var cad = '<li class="liDestinatarios"><span><img class="imgDeleteLi" src="../../Images/Grales/Deletefile.png" width="15px" height="13px" Title="Borrar Destinatario"> ' + JSON[i].FVCEMail + '</span></li>';
             $('#ulDestinarios').append(cad);
         }
         $('.imgDeleteLi').live("click", function () {
             $($(this).parent().parent().get(0)).remove();
         });
         setTimeout(' WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "");', 100);
     }, null);
}

function AgregarDestinariosAlista() {
    if ($("#txtDestinatario").val() == "") return;
    WaitingVtn("divBloqVtndvOrdelDelDia", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var ParamActCorreo = { Empleados: $("#txtDestinatario").val().split(",")[0].split(":")[1] };
    peticionAjax("Proyectos.aspx/ObtenerCorreo", "POST", ParamActCorreo,
                function (dataC) {
                    WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Cargando Información...");
                    var cad = '<li class="liDestinatarios"><span><img class="imgDeleteLi" src="../../Images/Grales/Deletefile.png" width="15px" height="13px" Title="Borrar Destinatario"> ' + (dataC.d != "" ? dataC.d : $("#txtDestinatario").val().split(",")[0]) + '</span></li>';
                    $('#ulDestinarios').append(cad);
                    $("#txtDestinatario").val("");
                }, null);
    $('.imgDeleteLi').live("click", function () {
        $($(this).parent().parent().get(0)).remove();
    });
}


function EnviarOrdenDiaEmail(fechaOrden) {
    if ($(".liDestinatarios").html() == "" || $(".liDestinatarios").html() == null) {
        WaitingVtn("divBloqVtndvOrdelDelDia", true, false, "Cargando Información...");
        MostrarMsj('Ingrese los Destinatarios.', "Mensaje", false, true, false, "", "Aceptar", "", 250, 125, null, function () {
            WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "Cargando Información...");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "");
        });
        return;
    }
    var cadenaDestinatarios = "";
    $(".liDestinatarios").each(function (index) {
        cadenaDestinatarios += $(this).text() + ";";
    });

    //cadenaDestinatarios = cadenaDestinatarios.indexOf("atorresb@bancoazteca.com.mx") != -1 ? cadenaDestinatarios : (cadenaDestinatarios + "atorresb@bancoazteca.com.mx;");
    cadenaDestinatarios = cadenaDestinatarios.indexOf("vgarciaz@bancoazteca.com.mx") != -1 ? cadenaDestinatarios : (cadenaDestinatarios + "vgarciaz@bancoazteca.com.mx;");

    //cadenaDestinatarios = "vgarciaz@bancoazteca.com.mx;" + cadenaDestinatarios;
    WaitingVtn("divBloqVtndvOrdelDelDia", true, true, "Enviando Orden del Día...");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    peticionAjax("Proyectos.aspx/EnviaOrden", "POST", { fechaOrden: fechaOrden, corresponsables: cadenaDestinatarios },
     function (dataC) {
         $(".liDestinatarios").html("");
         setTimeout(' WaitingVtn("divBloqVtndvOrdelDelDia", false, false, "");', 100);
         ObtieneListaOrdenes();
     }, null);

}

/*----------------------------------------------- Corresponsables -----------------------------------------------------------------------------------------*/
function Corresponsables() {
    $("#txtResponsable").focus().autocomplete("Handler1.ashx", {
        width: 300,
        selectFirst: false
    });

    $("#txtResponsable").result(function (event, data, formatted) {
        if (data)
            $(this).parent().next().find("input").val(data[1]);
    });

    $("#txtCorresponsable").autocomplete("Handler1.ashx", {
        width: 300,
        multiple: true,
        mustMatch: true
    });

    $("#txtCorresponsable").result(function (event, data, formatted) {
        var hidden = $(this).parent().next().find(">:input");
        hidden.val((hidden.val() ? hidden.val() + ";" : hidden.val()) + data[1]);
    });

    $("#txtDestinatario").focus().autocomplete("Handler1.ashx", {
        width: 300,
        selectFirst: false
    });

    $("#txtDestinatario").result(function (event, data, formatted) {
        if (data)
            $(this).parent().next().find("input").val(data[1]);
    });
}