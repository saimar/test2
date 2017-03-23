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
        daysOfWeekDisabled: "1,2,3,4,5,6"

    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
    
  
    
});
ObtieneUsuario();
$(document).ready(function () {
    $("#datepicker3").datepicker(/*{ minDate: "-5M", maxDate: "+10M +10D" }*/);
    $("#datepicker3").datepicker("option", "showAnim", "slide");
    $("#datepicker3").datepicker("option", { dateFormat: "dd/mm/yy" });

    $("#datepicker4").datepicker(/*{ minDate: -45, maxDate: "+10M +10D" }*/);
    $("#datepicker4").datepicker("option", "showAnim", "slide");
    $("#datepicker4").datepicker("option", { dateFormat: "dd/mm/yy" });
    $("#sltSemaforo").msDropdown();
    
    cambiarHeightComboSemaforo();
    
   
    document.getElementById("ChkAct").checked = true;
    document.getElementById("ChkRes").checked = true;
});

var LogUsuario = '';
function ObtieneUsuario() {
    peticionAjax("MonitoreoOficios.aspx/obtieneUserLog", "POST", null, function (data) {
        LogUsuario = data.d.toString();
        ObtienePais();
    }, null);
}

var idpaislogin = '';
function ObtienePais() {
    peticionAjax("MonitoreoOficios.aspx/obtienepais", "POST", null, function (data) {
        idpaislogin = data.d.toString();
    }, null);   
}


function cambiarHeightComboSemaforo() {
    document.getElementById("sltSemaforo") != null ? document.getElementById("sltSemaforo").style.height = "auto" : null;
    document.getElementById("sltSemaforo_child") != null ? document.getElementById("sltSemaforo_child").style.height = "auto" : null;
    setTimeout(cambiarHeightComboSemaforo, 500);
}

function cargarCatalogoPais() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("MonitoreoOficios.aspx/obtieneCatalogos", "POST", { TipoCat: 1, idPais: "0" }, function (data) {
        if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
            var cad = '';
            var idsPaises = '';
            try {
                var arrayJSON = obtenerArregloDeJSON(data.d, false);
                for (var x = 0; x < arrayJSON.length; x++)
                    idsPaises += arrayJSON[x].IdOpcion + ',';
                cad += '<option value="' + idsPaises.substring(0, idsPaises.length - 1) + '">Todos</option>';

                for (var x = 0; x < arrayJSON.length; x++) {
                    if (arrayJSON[x].IdOpcion != "8") {
                        var json = arrayJSON[x];
                        cad += '<option value="' + json.IdOpcion + '">';
                        cad += json.Descripcion;
                        cad += '</option>';
                    }
                }
            } catch (err) { }
            $('#sltPais').html(cad);
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        cargarTipoOficio();
    }, null);
}

function cargarTipoOficio() {
    peticionAjax("MonitoreoOficios.aspx/obtieneCatalogos", "POST", { TipoCat: 2, idPais: "0" }, function (data) {
        if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
            $('#sltTipoOficioFilter').html("");
            if (data.d != "") {
                var cad = '';
                var arrayJSON = obtenerArregloDeJSON(data.d, false);
                for (var x = 0; x < arrayJSON.length; x++) {
                    var json = arrayJSON[x];
                    cad += '<option value="' + json.IdOpcion + '">';
                    cad += json.Descripcion;
                    cad += '</option>';
                }
                $('#sltTipoOficioFilter').html(cad);
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        obtenerFechaActual();
    }, null);
}

function obtenerFechaActual() {
    peticionAjax("MonitoreoOficios.aspx/ObtenerFechaActual", "POST", null, function (data) {
        $("#datepicker3").val(data.d);
        $("#datepicker4").val(data.d);
        Waiting(true, "Espere por favor. Cargando Información...");
        //ObtieneUsuario();
        //ObtienePais();
        GetSeguimientoOficios();
    }, null);
}

function sltTipoOficioFilter_OnChange(value) {
    var oDropdown = $("#sltSemaforo").msDropdown().data("dd");
    var numItems = oDropdown.get("length");
    while (numItems > 0) {
        for (var i = 0; i < numItems; i++)
            oDropdown.remove(i);
        numItems = oDropdown.get("length");
    }
    if (value == "1") {
        var oDropdown = $("#sltSemaforo").msDropdown().data("dd");
        oDropdown.add({ text: "ENTREGADO", value: "3", image: "../../images/Grales/Semaforos/punto-verdem.png", className: "", title: 'ENTREGADO' });
        oDropdown.add({ text: "ENTREGADO A DESTIEMPO", value: "4", image: "../../images/Grales/Semaforos/punto-azulm.png", className: "", title: 'ENTREGADO A DESTIEMPO' });
        oDropdown.add({ text: "GESTIONANDO", value: "5", image: "../../images/Grales/Semaforos/punto-grism.png", className: "", title: 'GESTIONANDO' });
        oDropdown.add({ text: "MENOS DE 7 DIAS", value: "6", image: "../../images/Grales/Semaforos/punto-amarillom.png", className: "", title: 'MENOS DE 7 DIAS' });
        oDropdown.add({ text: "MENOS DE 3 DIAS", value: "7", image: "../../images/Grales/Semaforos/punto-naranjam.png", className: "", title: 'MENOS DE 3 DIAS' });
        oDropdown.add({ text: "NO ENTREGADO", value: "8", image: "../../images/Grales/Semaforos/punto-rojom.png", className: "", title: 'NO ENTREGADO' });

    }
    else {
        var oDropdown = $("#sltSemaforo").msDropdown().data("dd");
        oDropdown.add({ text: "ENTREGADO", value: "3", image: "../../images/Grales/Semaforos/punto-verdem.png", className: "", title: 'ENTREGADO' });
        oDropdown.add({ text: "ENTREGADO A DESTIEMPO", value: "4", image: "../../images/Grales/Semaforos/punto-azulm.png", className: "", title: 'ENTREGADO A DESTIEMPO' });
        oDropdown.add({ text: "GESTIONANDO", value: "5", image: "../../images/Grales/Semaforos/punto-grism.png", className: "", title: 'GESTIONANDO' });
        oDropdown.add({ text: "NO ENTREGADO", value: "8", image: "../../images/Grales/Semaforos/punto-rojom.png", className: "", title: 'NO ENTREGADO' });
    }
    oDropdown.set("selectedIndex", 0);
    Waiting(true, "Espere por favor. Cargando Información...");
    GetSeguimientoOficios();
}

function GetSeguimientoOficios() {
    var xdlAct = $("#ChkAct").prop("checked");
    var xdlRes = $("#ChkRes").prop("checked");

    if (xdlAct == true)
    {
        if (xdlRes == true)
        {
            var parametros =
                {
                    idsPaises: idpaislogin, IdRes: LogUsuario,
                };
            peticionAjax("MonitoreoOficios.aspx/GetSeguimientoOficiosFiltrados", "POST", parametros, function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    // var arrayJSON = obtenerArregloDeJSON(data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''), false);
                    data.d = data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');
                    var arrayJSON = new Array();
                    for (var i = 0; i < data.d.split("####|").length; i++) {
                        var JSONTemp = new Array();
                        for (var ii = 0; ii < data.d.split("####|")[i].split("%%%%|,").length; ii++) {
                            JSONTemp[data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[0]] = data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[1];
                        }
                        arrayJSON.push(JSONTemp);
                    }
                    delete arrayJSON[arrayJSON.length - 1];

                    $('#divTblDatosSeguimientoOficios').html(generarTablaRegistrosOficios(arrayJSON));
                    //$('#divEncabezado').html(AgregaEncabezadoEstatico(arrayJSON));
                    tablefiltrer();
                }
                else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
            document.getElementById("ChkAct").checked = true;
            document.getElementById("ChkRes").checked = true;
        }
        else
        {
            peticionAjax("MonitoreoOficios.aspx/GetSeguimientoOficios", "POST", { idsPaises: idpaislogin }, function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    // var arrayJSON = obtenerArregloDeJSON(data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''), false);
                    data.d = data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');
                    var arrayJSON = new Array();
                    for (var i = 0; i < data.d.split("####|").length; i++) {
                        var JSONTemp = new Array();
                        for (var ii = 0; ii < data.d.split("####|")[i].split("%%%%|,").length; ii++) {
                            JSONTemp[data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[0]] = data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[1];
                        }
                        arrayJSON.push(JSONTemp);
                    }
                    delete arrayJSON[arrayJSON.length - 1];

                    $('#divTblDatosSeguimientoOficios').html(generarTablaRegistrosOficios(arrayJSON));
                    //$('#divEncabezado').html(AgregaEncabezadoEstatico(arrayJSON));
                    tablefiltrer();
                }
                else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
            document.getElementById("ChkAct").checked = true;
            document.getElementById("ChkRes").checked = false;
        }
    }
    else
    {
        if (xdlRes == true) {
            peticionAjax("MonitoreoOficios.aspx/GetSeguimientoOficiosFiltradosTodas", "POST", { idsPaises: idpaislogin, IdRes: LogUsuario }, function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    // var arrayJSON = obtenerArregloDeJSON(data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''), false);
                    data.d = data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');
                    var arrayJSON = new Array();
                    for (var i = 0; i < data.d.split("####|").length; i++) {
                        var JSONTemp = new Array();
                        for (var ii = 0; ii < data.d.split("####|")[i].split("%%%%|,").length; ii++) {
                            JSONTemp[data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[0]] = data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[1];
                        }
                        arrayJSON.push(JSONTemp);
                    }
                    delete arrayJSON[arrayJSON.length - 1];

                    $('#divTblDatosSeguimientoOficios').html(generarTablaRegistrosOficios(arrayJSON));
                    //$('#divEncabezado').html(AgregaEncabezadoEstatico(arrayJSON));
                    tablefiltrer();
                }
                else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
            document.getElementById("ChkAct").checked = false;
            document.getElementById("ChkRes").checked = true;
        }
        else
        {
            peticionAjax("MonitoreoOficios.aspx/GetSeguimientoOficiosTodas", "POST", { idsPaises: idpaislogin }, function (data) {
                if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                    // var arrayJSON = obtenerArregloDeJSON(data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''), false);
                    data.d = data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');
                    var arrayJSON = new Array();
                    for (var i = 0; i < data.d.split("####|").length; i++) {
                        var JSONTemp = new Array();
                        for (var ii = 0; ii < data.d.split("####|")[i].split("%%%%|,").length; ii++) {
                            JSONTemp[data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[0]] = data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[1];
                        }
                        arrayJSON.push(JSONTemp);
                    }
                    delete arrayJSON[arrayJSON.length - 1];

                    $('#divTblDatosSeguimientoOficios').html(generarTablaRegistrosOficios(arrayJSON));
                    //$('#divEncabezado').html(AgregaEncabezadoEstatico(arrayJSON));
                    tablefiltrer();
                }
                else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
            document.getElementById("ChkAct").checked = false;
            document.getElementById("ChkRes").checked = false;
        }
    }



    



}
function tablefiltrer() {
    $("#tblDatosMain_MonitoreoOficio").tablesorter({
    widthFixed: true,
    showProcessing: true, 
    headerTemplate: '{content} {icon}',
    widgets: ['zebra', 'columns', 'filter', "uitheme", 'StickyHeaders'],
    //usNumberFormat: false,
    sortReset: true,
    sortRestart: true,
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

        filter_formatter: {


           
            7: function ($cell, indx) {
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

            8: function ($cell, indx) {
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

            9: function ($cell, indx) {
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

function generarTablaRegistrosOficios(listaDeJSON) {
    var oDropdown = $("#sltSemaforo").msDropdown().data("dd");
    var cad = '';
    cad += '<div id="rave"><div id="divTablaMain" style="height:700px;overflow:auto; position:relative;"><table id="tblDatosMain_MonitoreoOficio"><tbody>';
    //-----------------------------------------------------
    cad += '<thead ><tr >';
    cad += '<th style="width:1%"  class="sorter-text filter-match">No</th>';
    cad += '<th style="width:3%"  class="sorter-text filter-match">Nombre </br> Oficio</th>';
    cad += '<th style="width:2.5%" class="first-name filter-select">Entidad</br>Regulatoria</th>';
    cad += '<th style="width:2.5%" class="first-name filter-select">Tipo</th>';
    cad += '<th style="width:5%" class="sorter-text filter-match">Asunto</th>';
    cad += '<th style="width:10%" class="first-name filter-select">Responsable Seguimiento</th>';
    cad += '<th style="width:10%" class="first-name filter-select">Responsable</th>';
    cad += '<th style="width:3%" class="filter_formatter">Fecha de </br> Recepcion</th>';
    cad += '<th style="width:3%" class="filter_formatter">Fecha </br> Compromiso</th>';
    cad += '<th style="width:3%" class="filter_formatter">Fecha de </br> Término</th>';
    cad += '<th style="width:1%" >Dias de </br> Atraso</th>';
    cad += '<th style="width:2%" class="first-name filter-select" >Sem.</th>';
    cad += '<th style="width:1%" >Com.</th>';
    cad += '<th style="width:20%" class="sorter-text filter-match">Ultimo Comentario</th>';
    cad += '<th style="width:1%;" class="sorter-text filter-match">Adj.</th>';

    cad += '</tr></thead>';
    //--------------------------------------------------
    if (listaDeJSON.length > 0 && listaDeJSON[0] != null) {
        for (var filas = 0; filas < listaDeJSON.length - 1; filas++) {
            cad += ((filas % 2 == 0) ? '<tr class="row"> ' : '<tr class="alternateRow" >') ;
            //+(oDropdown.get("value") == "2" ? ' style="color:Red" >' : ' >')
            var json = listaDeJSON[filas];
            for (var element in json) {
                if (element != "clear") {                    
                    if (element == "Nombre Oficio")
                    {
                        cad += '<td style="width:3%; text-align:left" onclick="EditarSeguimiento(\'' + listaDeJSON[filas]["No"] + '\',\'' + listaDeJSON[filas]["Nombre Oficio"] + '\',\'' +2+ '\')">';
                        cad += json[element];
                    }
                    else if (element == "No") {
                        cad += '<td style=" width:1%; text-align:center;">';
                        cad += json[element];
                    }
                    else if (element == 'Semaforo') {
                        //cad += '<td style=" width:4%; text-align:center;">';
                        if (json[element] == '3') {
                            cad += '<td style="width:2%; text-align:center" Class="EstatusVerde2">'; //ENTREGADO
                            cad += '<a>Verde</a>';
                            cad += '</td>';
                        }
                        if (json[element] == '4') {
                            cad += '<td style="width:2%; text-align:center" Class="EstatusAzul2">'; //ENTREGADO A DESTIEMPO
                            cad += '<a>Azul</a>';
                            cad += '</td>';
                        }
                        if (json[element] == '5') {
                            cad += '<td style="width:2%; text-align:center" Class="EstatusGris2">'; //GESTIONANDO  
                            cad += '<a>Gris</a>';
                            cad += '</td>';
                        }
                        if (json[element] == '6') {
                            cad += '<td style="width:2%; text-align:center" Class="EstatusAmarillo2">'; //MENOS DE 7 DIAS  
                            cad += '<a>Amarillo</a>';
                            cad += '</td>';
                        }
                        if (json[element] == '7') {
                            cad += '<td style="width:2%; text-align:center" Class="EstatusNaranja2">'; //MENOS DE 3 DIAS
                            cad += '<a>Naranja</a>';
                            cad += '</td>';
                        }
                        if (json[element] == '8') {
                            cad += '<td style="width:2%; text-align:center" Class="EstatusRojo2">'; //NO ENTREGADO
                            cad += '<a>Rojo</a>';
                            cad += '</td>';
                        }
                    }
                    else if (element == 'Entidad Regulatoria')
                    {
                        cad += '<td style=" width:2.5%; text-align:center;">';
                        cad += json[element];
                    }
                    else if (element == 'Tipo') {
                        cad += '<td style=" width:2.5%; text-align:center;">';
                        cad += json[element];
                    }
                    else if (element == 'Fecha de Recepcion') {
                        cad += '<td style=" width:3%; text-align:center;">';
                        cad += json[element];
                    }
                    else if (element == 'Fecha Compromiso') {
                        cad += '<td style=" width:3%; text-align:center;">';
                        cad += json[element];
                    }
                    else if (element == 'Fecha de Término') {
                        cad += '<td style=" width:3%; text-align:center;">';
                        if (json[element]=="") {
                            cad += "----";
                        }
                        else {
                            cad += json[element];
                        }
                    }
                    else if (element == 'Ultimo Comentario') {
                        cad += '<td style=" width:20%; text-align:left;">';
                        if (json[element] == "") {
                            cad += "----";
                        }
                        else
                        {
                            cad += json[element];
                        }
                    }
                    else if (element == 'Responsable') {
                        cad += '<td style=" width:10%; text-align:center;">';
                        if (json[element] == "") {
                            cad += "----";
                        }
                        else {
                            cad += json[element];
                        }
                    }
                    else if (element == 'Corresponsables') {
                        cad += '<td style=" width:10%; text-align:center;">';
                        if (json[element] == "") {
                            cad += "----";
                        }
                        else {
                            cad += json[element];
                        }
                    }
                    else if (element == 'Dias de Atraso') {
                        if (json[element] > 0) {
                            cad += '<td style=" width:1%; text-align:center; color:red;">';
                        }
                        else {
                            cad += '<td style=" width:1%; text-align:center;">';
                        }
                        cad += json[element];
                    }
                    else if (element == 'Comentarios') {
                        cad += '<td style=" width:1%; text-align:center;" ' + " lang='" + json["No"] + "' " + ' onclick="editComentario(\'' + json["No"] + '' + '\',' + (parseInt(json[element]) > 0 ? true : false) + ',this,\'' + json["Nombre Oficio"] + '' + '\');">';
                        if (parseInt(json[element]) > 0) {
                            //cad += '<img src="../../Images/Portafolio/Proyectos/ConComentario.png" width="15px" height="13px"  class="imgCrecer" title="Agregar/Ver Comentario(s)"/>';
                            cad += '<span style="font-weight: bold;">'+json[element]+'</span>';
                        }
                        else {
                            //cad += '<img src="../../Images/Grales/edit.png" width="15px" height="13px"  class="imgCrecer" Title="Agregar Comentario"/>';
                            cad += json[element];
                        }
                    } else if (element == 'Adj.') {
                        cad += '<td style=" width:1%; text-align:center;" ' + " lang='" + json["No"] + "' " + ' onclick="MenuAdjutarArchivos(\'' + /*json["Numero de Oficio"]*/'' + '\',' + (parseInt(json[element]) > 0 ? true : false) + ',this,\'' + json["Nombre Oficio"] + '' + '\');">';
                        if (parseInt(json[element]) > 0)
                            cad += '<span style="font-weight: bold;">'+json[element]+'</span>';
                        else
                            cad += json[element];
                    }
                    else {
                        cad += '<td style=" width:5%; text-align:left;">';
                        cad += json[element];
                    }
                    cad += '</td>';
                }
            }
            //cad += '<td style="width:3%; text-align:center" ' + "lang='" + listaDeJSON[filas]["Numero de Oficio"] + "%%&&" + listaDeJSON[filas]["Prorroga"] + "' alt='" + listaDeJSON[filas]["Asunto"] + "' " + ' onclick="EditarSeguimiento(this,\'' + listaDeJSON[filas]["Tipo"] + '\',\'' + listaDeJSON[filas]["Pais"] + '\',\'' +
            //listaDeJSON[filas]["Entidad Regulatoria"] + '\',\'' + /* listaDeJSON[filas]["Numero de Oficio"]*/'' + '\',\'' + /*listaDeJSON[filas]["Asunto"]*/'' + '\',\'' +
            //listaDeJSON[filas]["Fecha de Recepcion"] + '\',\'' + listaDeJSON[filas]["Fecha de Entrega"] + '\',\'' + /* replaceAll(listaDeJSON[filas]["Prorroga"],'"','\'')*/'' + '\',\'' +
            //listaDeJSON[filas]["Semaforo"] + '\',\'' + listaDeJSON[filas]["Plazo"] +
            //'\')"></td>';
            cad += '</tr>';
        }
        cad += '</tbody>';
        
    }
    cad += '</table></div></div>';
    return cad;
}

function AgregaEncabezadoEstatico(listaDeJSON) {
    var cad = '<div id="divEncabezado"  style="display: inline-block; position: relative;table-layout:fixed">';
    cad += '<table id="tblEncabezado_MonitoreoOficio" style="width: 100%;table-layout:fixed">  <tbody>';
    cad += '<tr style="font-weight: bold; text-shadow: 2px 1px 1px black; font-size: 9px;height:25px;">';
    var auxJSON = listaDeJSON[0];
    var indiceColumnaEncabezado = 0;
    for (var encabezados in auxJSON) {
        if (encabezados != "" && encabezados != "clear") {
            cad += '<td style="white-space: pre-wrap;text-align: center; background: rgb(0, 128, 128);color: rgb(255, 255, 255);padding-bottom: 4px;';
            cad += "width:" + (document.getElementById('tblDatosMain_MonitoreoOficio').rows[0].cells[indiceColumnaEncabezado].offsetWidth + 0.5) + "px";
            cad += '">';
            cad += encabezados != "Chck" ? encabezados.toString() : "";
            cad += '</td>';
            indiceColumnaEncabezado++;
        }
    }
    //cad += '<th id="thAgregarAct" style="width:10%; background: rgb(0, 128, 128);" onclick="AgregarSeguimiento()"><img src="../../Images/Portafolio/Proyectos/AgregarActividad.png" class="imgCrecer" Title="Agregar Actividad" width="15px" height="13px" /></th>';
    cad += '</tr></tbody></table></div>';
    return cad;
}

function resizeEncabezadoEstaicoMonitoreoOficio() {
    for (var i = 0; i < document.getElementById('tblEncabezado_MonitoreoOficio').rows[0].cells.length; i++)
        document.getElementById('tblEncabezado_MonitoreoOficio').rows[0].cells[i].style.width = document.getElementById('tblDatosMain_MonitoreoOficio').rows[0].cells[i].offsetWidth + "px";
}

function EditarSeguimiento(obj, tipo, pais, entidadRegulatoria, numOficio, asunto, fechaRecepcion, fechaEntrega, semaforo, fechaTermino) {
    AgregarActividadesTab(obj, "2", tipo, pais, entidadRegulatoria, numOficio, asunto, fechaRecepcion, fechaEntrega, semaforo, fechaTermino);
}

function AgregarSeguimiento() {
    AgregarActividadesTab(0,"1", "")
}

function cambiarCheck(numOficio, obj) {
    numOficio = $(obj).attr("lang");
    Waiting(true, "Espere por favor. Cargando Información...");
    if ($(obj).attr('checked') != undefined) {
        var parametros = { opcion: "4", numOficio: numOficio };
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("MonitoreoOficios.aspx/actualizarSemaforo", "POST", parametros, function (data) {
            if (data.d.indexOf("ERRORCATCH") == -1) {
                GetSeguimientoOficios();
            }
            else {
                MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        }, null);
    }
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------- Agregar Actividades -------------------------------------------------------------------------------*/
function AgregarActividadesTab(no, opcion, nomoficio) {
    //numOficio = obj == null ? numOficio : $(obj).attr("lang").split("%%&&")[0];
    //prorroga = obj == null ? prorroga : $(obj).attr("lang").split("%%&&")[1];
   // asunto = obj == null ? asunto : $(obj).attr("alt");
    var cadena = '<div id="divBloqVtndvFormulario" style="width:98%;height:92%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none;z-index:1000;"> </div><div style="width:100%;height:98%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvFormulario" style="width:100%;height:100%;margin-top: 0px;"> ';
    cadena += '<table style="width:100%">';
    cadena += '<tr><td><table  style="width:100%" class="dataGridDatos"><thead><tr><th>Campo</th><th>Valor</th></tr></thead>';
    //<tr><td>Pais:</td><td><select id="slPais" ' + (opcion == "2" ? ' disabled="disabled" ' : '') + ' style="width:99%" onchange="cargarCatalogos(3, \'sltEntidadRegulatoria\', false, \'\', \'\');"></select></td></tr>
    cadena += '<tbody style="text-align:left"><tr><td>Tipo:</td><td><select id="sltTipo" maxlength="100"  style="width:99%" onchange="sltTipo_OnchangeTipoVtnEditarGuardar(this.value);"></select></td></tr>';
    cadena += '<tr><td>Entidad Regulatoria:</td><td><select id="sltEntidadRegulatoria" style="width:99%"></select></td></tr><tr><td>Nombre Oficio:</td><td><input id="txtNumOficio" style="width:98%; text-align:left;"  maxlength="20"/></td></tr>';
    cadena += '<tr><td>Asunto:</td><td><input id="txtAsunto"  style="width:98%" maxlength="70" /></td></tr>';
    cadena += '<tr><td>Responsable Seguimiento:</td><td><input id="txtResponsable"  style="width:98%" /></td></tr><tr><td>Responsables:</td><td><textarea cols="30" rows="2" id="txtCorresponsable" style="font: normal 10px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:98%; text-align:left; border: x;height:25px" ></textarea></td></tr>';
    cadena += '<tr><td>Fecha de Recepcion:</td><td><input type="text" id="datepicker1"  style="width:90%" onchange="changeFormatoFecha(event,this);" onkeyup="changeFormatoFecha(event,this);" onkeypress="if (event.keyCode==13) return false;"/></td></tr><tr><td>Fecha Compromiso:</td><td><input type="text" id="datepicker2"  style="width:90%" onchange="changeFormatoFecha(event,this);" onkeyup="changeFormatoFecha(event,this);" onkeypress="if (event.keyCode==13) return false;"/></td></tr>';
    cadena += '<tr><td>Fecha de Termino:</td><td><input type="text" id="datepicker3"   style="width:90%" /></td></tr>';
    cadena += '</tbody></table></td></tr>';
    cadena += '<tr style="height: 15px;"></tr><tr><td style="text-align: right;"><input type="button" id="btnGuardar" value="' + (opcion == "2" ? "Actualizar" : "Guardar") + '" class="classButton" ' + " lang='" + nomoficio + "' " + ' onclick="actualizarGuardarSeguimiento(this,\'' + opcion + '\',\'' + no+'' + '\');"/></td></tr></table> ';
    cadena += '</div></div>';
    $("#dvFormulario").empty();
    AgregarVtnFlotante("dvFormulario", "", "No:"+no+"  Oficio:"+nomoficio+"   "+(opcion == "1" ? "AGREGAR" : "EDITAR") + " SEGUIMIENTO", "", cadena, 320, 600, false, false, "", "", null);

    
    //$("#slPais option").filter(function () { return $(this).text() == pais; }).prop('selected', true);

    Corresponsables();


    $("#datepicker1").datepicker(/*{ minDate: -0, maxDate: "+5M +10D" }*/);
    $("#datepicker1").datepicker("option", "showAnim", "slide");
    $("#datepicker1").datepicker("option", { dateFormat: "dd/mm/yy" });

   

    if (opcion == "2") {
        $("#datepicker1").parent().find("button").attr("disabled", "disabled");
        //$("#datepicker2").parent().find("button").attr("disabled", "disabled");
        EditaActividad(no);

        $("#datepicker2").datepicker(/*{ minDate: -0, maxDate: "+10M +10D" }*/);
        $("#datepicker2").datepicker("option", "showAnim", "slide");
        $("#datepicker2").datepicker("option", { dateFormat: "dd/mm/yy" });

        $("#datepicker3").datepicker(/*{ minDate: -0, maxDate: "+10M +10D" }*/);
        $("#datepicker3").datepicker("option", "showAnim", "slide");
        $("#datepicker3").datepicker("option", { dateFormat: "dd/mm/yy" });
        
    }
    else
    {
        cargarCatalogos(2, "sltTipo", true, "", "");

        $('#datepicker2').datepick({
            multiSelect: 15,
            multiSeparator: '+',
            //monthsToShow: 3,
            //monthsToStep: 0,
            showTrigger: '#calImg'
        },
        $.datepick.regionalOptions['es']
        );

        $('#datepicker3').datepick({
            multiSelect: 15,
            multiSeparator: '+',
            //monthsToShow: 3,
            //monthsToStep: 0,
            showTrigger: '#calImg'
        },
        $.datepick.regionalOptions['es']
        );
    }
}

function EditaActividad(numOficio) {
    WaitingVtn("divBloqVtndvFormulario", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "12%";
    var parametros = { noActividad: numOficio };
    peticionAjax("MonitoreoOficios.aspx/EditarActividad", "POST", parametros, ObtieneDatosActividad, null);
}

function ObtieneDatosActividad(data) {
    var tamSelect = $('#slResponsable option').length;
    var JSON = obtenerArregloDeJSON(data.d, false);
    //$("#sltTipo").val(JSON[0].TipoOficio);
    //$("#sltEntidadRegulatoria").val(JSON[0].Entidad);
    $("#txtNumOficio").val(JSON[0].Nombre);
    $("#txtAsunto").val(JSON[0].Asunto);
    $("#datepicker1").val(JSON[0].FDFechaRecepcion);
    $("#datepicker2").val(JSON[0].FDFechaEntrega);
    $("#datepicker3").val(JSON[0].FDFechaTermino);
    $("#txtResponsable").val(JSON[0].Responsable);
    $("#txtCorresponsable").val(JSON[0].Corresponsable);

    cargarCatalogos(2, "sltTipo", true, JSON[0].TipoOficio, JSON[0].Entidad);

    var respon = JSON[0].Id;
    var datefinal = JSON[0].FDFechaTermino;
    if (respon == LogUsuario) {
        if (datefinal != "") {
            document.getElementById('datepicker3').disabled = true;
            $('#datepicker3').datepicker().datepicker('disable');

        }
    }
    else {
        document.getElementById('sltTipo').disabled = true;
        document.getElementById('txtNumOficio').disabled = true;
        document.getElementById('sltEntidadRegulatoria').disabled = true;
        document.getElementById('txtAsunto').disabled = true;
        document.getElementById('txtResponsable').disabled = true;
        document.getElementById('txtCorresponsable').disabled = true;
        document.getElementById('datepicker1').disabled = true;
        $('#datepicker1').datepicker().datepicker('disable');
        document.getElementById('datepicker3').disabled = true;
        $('#datepicker3').datepicker().datepicker('disable');
        document.getElementById('datepicker2').disabled = true;
        $('#datepicker2').datepicker().datepicker('disable');
    }

}

function sltTipo_OnchangeTipoVtnEditarGuardar(value) {
    if (value == "1") { $("#trPlazo").show(); $("#txtPlazo").val("5"); }
    else { $("#trPlazo").hide(); $("#txtPlazo").val("0"); }
}

function cargarCatalogos(opcion, campo, cargar, campoTipo, campoEntidadRegulatoria) {
    WaitingVtn("divBloqVtndvFormulario", true, true, "Guardando Información...");
    peticionAjax("MonitoreoOficios.aspx/obtieneCatalogos", "POST", { TipoCat: opcion, idPais: idpaislogin }, function (data) {
        if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
            $('#' + campo).html("");
            if (data.d != "") {
                var cad = '';
                var arrayJSON = obtenerArregloDeJSON(data.d, false);
                for (var x = 0; x < arrayJSON.length; x++) {
                    var json = arrayJSON[x];
                    cad += '<option value="' + json.IdOpcion + '">';
                    cad += json.Descripcion;
                    cad += '</option>';
                }
                $('#' + campo).html(cad);
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        if (campo == "sltTipo") {
            if (campoTipo != "")
                $("#sltTipo option").filter(function () { return $(this).text() == campoTipo; }).prop('selected', true);
            else
                $("#sltTipo").val($("#sltTipoOficioFilter").val());
        }
        else
            $("#sltEntidadRegulatoria option").filter(function () { return $(this).text() == campoEntidadRegulatoria; }).prop('selected', true);
        if (cargar)
            cargarCatalogos(3, "sltEntidadRegulatoria", false, campoTipo, campoEntidadRegulatoria);
        else {
            var tipoTemp = campoTipo == "" ? $("#sltTipoOficioFilter").val() : $("#sltTipo").val();
            if (tipoTemp == "1") $("#trPlazo").show();
            else { $("#trPlazo").hide(); $("#txtPlazo").val("0") }
            if ($("#txtPlazo").val() == "")
                $("#txtPlazo").val("5")
            WaitingVtn("divBloqVtndvFormulario", false, false, "Guardando Información...");
        }
    }, null);
}

function actualizarGuardarSeguimiento(obj, opcion, numOficio) {

    document.getElementById("sltEntidadRegulatoria").style.border = "1px solid Gray"; document.getElementById("txtNumOficio").style.border = "1px solid Gray";
    document.getElementById("txtAsunto").style.border = "1px solid Gray"; document.getElementById("datepicker1").style.border = "1px solid Gray";
    document.getElementById("datepicker2").style.border = "1px solid Gray";
    

    if (VerficaCadenaVaciaCampo("sltEntidadRegulatoria", "Entidad Regulatoria", true) && VerficaCadenaVaciaCampo("txtNumOficio", "Numero Oficio", false)
    && VerficaCadenaVaciaCampo("txtAsunto", "Asunto", false) && VerficaCadenaVaciaCampo("txtResponsable", "Responsable", false) && VerficaCadenaVaciaCampo("datepicker1", "Fecha de Recepción", false)
    && VerficaCadenaVaciaCampo("datepicker2", "Fecha deEntrega", false) //&& MuestraMsjCuandoPlazoIncorrecto($("#sltTipo").val())
        ) {

        WaitingVtn("divBloqVtndvFormulario", true, true, "Guardando Información...");
        document.getElementById("imgVtnLoading").style.marginTop = "12%";

        var tipoOficio = $("#sltTipo").val();
        var entidadReg= $("#sltEntidadRegulatoria").val();
        var nombre= $("#txtNumOficio").val();
        var asunto= $("#txtAsunto").val();
        var fechaRecepcion = $("#datepicker1").val().split('/')[2] + $("#datepicker1").val().split('/')[1] + $("#datepicker1").val().split('/')[0];
        var fechaEntrega = $("#datepicker2").val();
        var fechater = $("#datepicker3").val();
        var IdRespon = $("#txtResponsable").val() + ',';
        var IdCorres = $("#txtCorresponsable").val(); 

        var parametros = {
            opcion: opcion,
            tipoOficio: tipoOficio,
            pais: idpaislogin, //cambio aqui en pais
            entidadReg: entidadReg,
            numOficio: nombre,
            numOficioValAnterior: numOficio,
            asunto: asunto,
            fechaRecepcion: fechaRecepcion,
            fechaEntrega: fechaEntrega,
            fechaTermino: fechater,
            IdRespon: IdRespon,
            IdCorres: IdCorres,

        };
        peticionAjax("MonitoreoOficios.aspx/actualizarGuardarSeguimiento", "POST", parametros, function (data) {
            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                if (data.d != "1") {
                    WaitingVtn("divBloqVtndvFormulario", false, false, "Guardando Información...");
                    $("#dvFormulario").dialog("close");
                    Waiting(true, "Espere por favor. Cargando Información...");
                    GetSeguimientoOficios();
                    MostrarMsj("Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                }
                else {
                    WaitingVtn("divBloqVtndvFormulario", true, false, "Guardando Información...");
                    MostrarMsj("Existe un registro con ese Número de Oficio.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
                        $("#divVentanaMensajes").dialog("close");
                        WaitingVtn("divBloqVtndvFormulario", false, false, "");
                    }, null);
                }
            }
            else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        }, null);

    }
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtndvFormulario", false, false, "");
        //document.getElementById("txtPlazo_downPic").style.top = "203px";
        //document.getElementById("txtPlazo_downPic").style.left = "";
    });
}






function VerficaCadenaVaciaCampo(Campo, mensaje, esCombo) {
    if ($('#' + Campo).val() == null || $('#' + Campo).val().trim() == "" || $('#' + Campo).val().trim().indexOf("'") != -1 || (esCombo && document.getElementById(Campo).options.length > 1 && $('#' + Campo).val() == "-1")) {
        $('#' + Campo).focus();
        //document.getElementById("txtPlazo_downPic").style.top = "203px";
        //document.getElementById("txtPlazo_downPic").style.left = "";
        document.getElementById(Campo).style.border = "1px solid Red";
        WaitingVtn("divBloqVtndvFormulario", true, false, "Guardando Información...");
        if ($('#' + Campo).val().indexOf("'") != -1 && !esCombo) {
            MostrarMsj("El campo <span style='font-weight: bold;'>" + mensaje + "</span> no debe de contener caracter  <span style='font-weight: bold;'>(')</span>.",
        "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, function () {
            $("#divVentanaMensajes").dialog("close");
            WaitingVtn("divBloqVtndvFormulario", false, false, "");
        }, null);
        }
        else {
            MostrarMsj(esCombo ? ("Seleccione una opción en el campo <span style='font-weight: bold;'>" + mensaje + "</span>") : ("El campo <span style='font-weight: bold;'>" + mensaje + "</span> no puede estar en blanco."),
        "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, function () {
            $("#divVentanaMensajes").dialog("close");
            WaitingVtn("divBloqVtndvFormulario", false, false, "");
        }, null);
        }
        return false;
    }
    else { document.getElementById(Campo).style.border = "1px solid Gray"; return true; }
}

//function MuestraMsjCuandoPlazoIncorrecto(tipo) {
//    if ((parseInt($("#txtPlazo").val()) >= 5 && parseInt($("#txtPlazo").val()) <= 9999) || tipo != "1")
//        return true;
//    else {
//        WaitingVtn("divBloqVtndvFormulario", true, false, "Guardando Información...");
//        document.getElementById("txtPlazo_downPic").style.top = "203px";
//        document.getElementById("txtPlazo_downPic").style.left = "";
//        document.getElementById("txtPlazo").style.border = "1px solid Red";
//        MostrarMsj("El <span style='font-weight: bold;'>Plazo</span> debe de ser <span style='font-weight: bold;'>Mayor o Igual a 5</span> y <span style='font-weight: bold;'>Menor o Igual a 9999</span>", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, function () {
//            $("#divVentanaMensajes").dialog("close");
//            WaitingVtn("divBloqVtndvFormulario", false, false, "");
//        }, null);
//        return false;
//    }
//}
//----------------------------------------- COMENTARIOS----------------------------------------

function editComentario(dato, tieneComentario, obj,nombreoficio) {
    dato = $(obj).attr("lang");
    var cadena = '<div id="divBloqVtndvComentarios" style="width:100%;height:95%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvComentarios" style="width:100%;height:95%;"> ';

    cadena += '<div id="divHistorial2" style="width:100%; height:70%; text-align:left;"></div>';
    cadena += '<div style="width:100%;height:30%;"><img src="../../Images/Portafolio/Proyectos/icono_comentarios.jpg" alt="Comentario" width="30px" height="30px" />';
    cadena += 'Introduce tu comentario :</br><textarea cols="30" rows="2" id="txtComenComentarioP" style="font: normal 9px Helvetica, Arial, sans-serif;resize: both;background-color:White;width:95%; text-align:left; height:45%" ></textarea>';
    cadena += '<br>Opcional: <input type="file" id="fuArchivosAdjuntos" name="fuArchivosAdjuntos" style="width:90%; height:20px" /></br> <input type="button" id="tblGuardar" onclick="GuardarComentario(\'' + dato + '' + '\',this);" style="float: right;" value="Guardar" class="classButton"/>';
    cadena += '<br><div style="float:left;"><strong>Nota: </strong> Límite de Carga de Adjuntos <strong>30MB</strong>.</div></div></div>'
    $("#dvComentarios").empty();
    AgregarVtnFlotante("dvComentarios", "", "No:"+dato+"  Oficio:"+nombreoficio+"  COMENTARIOS", "", cadena,460, 800, false, false, "", "", null);
    if (tieneComentario)
        ObtenerComentarios(dato);
}

function ObtenerComentarios(numOficio) {
    WaitingVtn("divBloqVtndvComentarios", true, true, "Cargando Información...");
    var parametros = { opcion: "1", numOficio: numOficio, comentario: '',idResponsable:LogUsuario, idadj:0 };
    peticionAjax("MonitoreoOficios.aspx/controlComentariosSegOficios", "POST", parametros, function (data) {
        if (data.d != "") {
            var JSON = new Array(); //= obtenerArregloDeJSON(data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''), false);
            for (var i = 0; i < data.d.split("####|").length; i++) {
                var JSONTemp = new Array();
                for (var ii = 0; ii < data.d.split("####|")[i].split("%%%%|,").length; ii++) {
                    JSONTemp[data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[0]] = data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[1];
                }
                JSON.push(JSONTemp);
            }
            delete JSON[JSON.length - 1];
            //JSON = JSON.splice(JSON.length-1, 1); ;
            //cadena = "<a style='font: normal 10px Helvetica, Arial, sans-serif;cursor: pointer;'><img src='../../Images/PanelDeControl/Expander/insert.jpg' id='insert2' style ='margin-bottom:-5px' onclick=\"toggleSlide('div2',this.id,'vtnH','dvComentarios',2);\" alt='expander' /></a> <span id='insert2' style='font: normal 10px Helvetica, Arial, sans-serif;cursor: pointer;' onclick=\"toggleSlide('div2',this.id,'vtnH','dvComentarios',2); \">Historial </span><div style='height:150px;width: 650px;overflow: auto;'> <div id='div2' style=display:none;'>";
            cadena = CreaTablaComentariosAgenda(JSON,numOficio);
            //cadena += "</div></div>";
            $('#divHistorial2').html(cadena);
        }
        else $("#dvComentarios").animate({ height: "250px" });
        WaitingVtn("divBloqVtndvComentarios", false, false, "");
    }, null);
}

function CreaTablaComentariosAgenda(listaDeJSON,numoficio) {
    var cad = '<center><div class="divContenidoTabla"><table class="dataGridDatos" style="width: 100%;">';
    cad += '<tr>';
    cad += '<th style="text-align: center; width:20%">Fecha</th><th style="text-align: center; width:20%">Usuario</th><th style="text-align: center; width:60%">Comentario</th><th style="text-align: center; width:5%">Adjunto</th>';
    cad += '</tr>';

    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element != "clear") {
                if (element == "FechaComentario") {
                    cad += '<td style="text-align:center;max-width:"20%;" word-wrap: break-word;text-align: left;">';
                    cad += json[element];
                }
                else if (element == "Usuario") {
                    cad += '<td style="text-align:center;max-width:"20%;" word-wrap: break-word;text-align: left;">';
                    cad += json[element];
                }
                else if (element == "Comentario") {
                    cad += '<td style="text-align:left;max-width:"60%;" word-wrap: break-word;text-align: left;">';
                    cad += json[element];
                }
                else if (element == "Adjuntos") {
                    cad += '<td style="text-align:left;width:5%; word-wrap: break-word;text-align: left;">';
                    cad += '<a id="aBorra" onclick="obtieneArchivoAd2(\'' + numoficio +'' + '\',\'' + json[element] + '\',this);" style="text-decoration: underline; color:Blue" Title="Descargar Archivo">';
                    cad += json[element];
                    cad += '</a>';
                }
               
                cad += '</td>';
            }
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></div></center>';
    return cad;
}

var LogUsuario = '';
var ravevalidacion = '';
var acv = '';

function GuardarComentario(idActividad, obj) {
    //var adj = $(obj).parent().find("input:file").attr("id");
    var adj = $("#fuArchivosAdjuntos").val();
    var msm = "";
    if (adj != "") {
        // var rave = enviarArchivoAsincronamentecom(adj, idactividad);
    }
    else {
        msm = "<p> No tiene ningun Archivo Adjunto </p><p> Nota: En caso de no leer el archivo porfavor cierre la ventana y vuelvala a abrir </p>";
    }
    //obteniendo id usuario   

    function ObtieneUsuario() {
        peticionAjax("MonitoreoOficios.aspx/obtieneUserLog", "POST", null, function (data) {
            LogUsuario = data.d.toString();
        }, null);
    }
    if ($("#txtComenComentarioP").val() == "") {
        WaitingVtn("divBloqVtndvComentarios", true, false, "");
        MostrarMsj("Ingrese el comentario.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
            WaitingVtn("divBloqVtndvComentarios", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndvComentarios", false, false, "");
        });
        return;
    }
    WaitingVtn("divBloqVtndvComentarios", true, false, "");
    MostrarMsj("" + msm + "<strong>¿Desea continuar?</strong>", "Mensaje", true, false, true, "Si", "", "No", 300, 150,
            function BtnSi() {
                $("#divVentanaMensajes").dialog("close");
                //adjuntando archivo
                if (adj != "") {
                    
                    peticionAjax("MonitoreoOficios.aspx/setNumOficioCargarAdjuntos", "POST", { numOficio: idActividad }, function (data) {                                

                            var idInputFile = 'fuArchivosAdjuntos';
                            var parametros = {
                                'subirArchivo': 'subirArchivo',
                                'NumOficio': idActividad
                            };
                            $.ajaxFileUpload
                                   ({
                                       url: 'MonitoreoOficios.aspx',
                                       fileElementId: idInputFile,
                                       dataType: 'json',
                                       data: parametros,
                                       complete: function () {
                                       },
                                       success: function (data, status) {
                                           var re = data.toString().replace("<PRE>", "").replace("</PRE>", "").replace("<pre>", "").replace("</pre>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "").replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');
                                           if (re == "El archivo se ha cargado correctamente") {
                                               GuardaComentario(idActividad, adj);
                                           }
                                           else {
                                               avc = 'No se guardo el comentario con el Archivo';
                                           }
                                           reportarStatusDeSubidaAdjuntos2(data, obj, acv);
                                       },
                                       error: function (data) {
                                           var re = data.toString();
                                       }
                                   });

                        }, null);

                }
                else {
                    GuardaComentario(idActividad, adj);
                }

            }, null, function BtnNo() { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtndvComentarios", false, false, ""); });
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtndvComentarios", false, false, "");
    });
}

function reportarStatusDeSubidaAdjuntos2(data, obj, adv) {
    data = data.toString().replace("<PRE>", "").replace("</PRE>", "").replace("<pre>", "").replace("</pre>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "").replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');

    MostrarMsj(data + " " + adv, "Mensaje", false, true, false, "", "Aceptar", "", 300, 150, null, function () {
        WaitingVtn("divBloqVtndvAdjuntos", false, false, "Subiendo Archivo");
        $("#divVentanaMensajes").dialog("close");
    }, null);


}

function GuardaComentario(numOficio,adj) {
    //WaitingVtn("divBloqVtndvComentarios", true, true, "");
    //document.getElementById("imgVtnLoading").style.marginTop = "8%";

    peticionAjax("MonitoreoOficios.aspx/obtieneid", "POST", null, function (data) {
        if (adj != "") {
            id = parseInt(data.d.toString());
        }
        else {id = 0 }

        var parametros = { opcion: "2", numOficio: numOficio, comentario: $("#txtComenComentarioP").val(), idResponsable: LogUsuario, idadj: id };
                    peticionAjax("MonitoreoOficios.aspx/controlComentariosSegOficios", "POST", parametros, function (data) {
                        WaitingVtn("divBloqVtndvComentarios", false, false, "");
                        //$("#dvComentarios").dialog("close");
                        //Waiting(true, "Espere por favor. Cargando Información...");
                        GetSeguimientoOficios();
                        ObtenerComentarios(numOficio);
                        $("#txtComenComentarioP").val("");
                        MostrarMsj("Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }, null);

    }, null);
}

//------------------------------------ ADJUNTOS-------------------------------------------------------------------------------------
var actualizar = false;
function MenuAdjutarArchivos(numOficio, tieneAdjunto, obj , nombreoficio) {
    numOficio = $(obj).attr("lang");
    var cadena = '<div id="divBloqVtndvAdjuntos" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvAdjuntos" style="width:100%;height:100%;margin-top: 0px;">  ';
    cadena += '<table style="width:100%" class="dataGridDatos"><tr><td><input type="file" id="fuArchivosAdjuntos" name="fuArchivosAdjuntos" style="width:90%; height:20px" />';
    cadena += '<input id="btnCargarFile" type="button" value="Cargar" ' + " lang='" + numOficio + "' " + ' onclick="return enviarArchivoAsincronamente(this,\'' + numOficio+'' + '\');" class="classButton"/></td></tr>';
    cadena += '<tr class="alternateRowAlt" style="width: 100%;" ><td align="right" style="font-size:small;"><strong>Nota: </strong> Límite de Carga de Adjuntos 2MB.</td></tr>';
    cadena += '<tr><td><br /> </td></tr></table><div id="dvFilesAdjuntos" style="height: 60%;overflow: auto;"> </div>';
    cadena += '</div></div>';
    $("#dvAdjuntos").empty();
    AgregarVtnFlotante("dvAdjuntos", "","No:"+numOficio+"  Oficio:"+nombreoficio+ "  CARGAR ADJUNTOS", "", cadena, 200, 650, false, false, "", "", null);
    $("#dvAdjuntos").on("dialogclose", function (event, ui) {
    });
    if (tieneAdjunto)
        ObtenerArchivosAdjuntos(numOficio);
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------
function ObtenerArchivosAdjuntos(numOficio) {
    WaitingVtn("divBloqVtndvAdjuntos", true, true, "Cargando Información");
    document.getElementById("imgVtnLoading").style.marginTop = "6%";
    var Parametros = { opcion: 1, numOficio: numOficio }
    peticionAjax("MonitoreoOficios.aspx/obtieneArchivosAdjuntos", "POST", Parametros, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        if (data.d == "") { $("#dvAdjuntos").animate({ height: "100px" }); $("#divBloqVtndvAdjuntos").animate({ height: "80%" }); }
        else { $("#dvAdjuntos").animate({ height: "190px" }); $("#divBloqVtndvAdjuntos").animate({ height: "88%" }); }
        document.getElementById("imgVtnLoading") != null ? document.getElementById("imgVtnLoading").style.marginTop = "6%" : null;
        var cad = generarTablaDeAdjuntos(JSON, numOficio);
        $('#dvFilesAdjuntos').html('<br />' + cad);
        WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
        GetSeguimientoOficios();
    }, null);
}

function generarTablaDeAdjuntos(listaDeJSON, numOficio) {
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
            cad += '<td class="' + (element == 'Fecha de Carga' ? '"' : 'tdEnabled"') + '>';
            if (element == 'Fecha de Carga') {
                cad += json[element];
            } else {
                cad += '<a id="aBorra" ' + " lang='" + numOficio + "' " + ' onclick="obtieneArchivoAd(\'' + /*numOficio*/'' + '\',\'' + json[element] + '\',this);" style="text-decoration: underline; color:Blue" Title="Descargar Archivo">';
                cad += json[element];
                cad += '</a>';
            }
            cad += '</td>';
        }

        if (json != null) {
            cad += '<td style="width:4%; border-width:1" ' + " lang='" + numOficio + "' " + ' onclick="eliminaArchivo(\'' + /*numOficio*/'' + '\',\'' + json['Archivos Adjuntos'] + '\',this);" class="tdEnabled">';
            cad += '<img src="../../Images/Grales/Deletefile.png" width="15px" height="13px"  />Eliminar';
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table></center>';
    return cad;
}

function enviarArchivoAsincronamente(obj, numOficio) {
    numOficio = $(obj).attr("lang");
    if (!validarExistenciaDeArchivo($(obj).parent().find("input:file"))) { return false; }
    peticionAjax("MonitoreoOficios.aspx/setNumOficioCargarAdjuntos", "POST", { numOficio: numOficio }, function (data) {
        var idInputFile = $(obj).parent().find("input:file").attr("id");
        var parametros = {
            'subirArchivo': 'subirArchivo',
            'NumOficio': numOficio
        };
        return ajaxFileUpload(idInputFile, obj, parametros);
    }, null);
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
    WaitingVtn("divBloqVtndvAdjuntos", true, true, "Subiendo Archivo");
    document.getElementById("imgVtnLoading").style.marginTop = "6%";
    $.ajaxFileUpload
		    ({
		        url: 'MonitoreoOficios.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaAdjuntos(data, obj, parametros.NumOficio);
		        }
		    });
    return false;
}
//------------------------------------------------------------------------------------------------------------------------------------------------------
function reportarStatusDeSubidaAdjuntos(data, obj, numOficio) {
    data = data.toString().replace("<PRE>", "").replace("</PRE>", "").replace("<pre>", "").replace("</pre>", "").replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', "").replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), '');
    if (data.toString().indexOf("ERROR") == -1) {
        actualizar = true;
        MostrarMsj(data, "Mensaje", false, true, false, "", "Aceptar", "", 200, 120, null, function () {
            WaitingVtn("divBloqVtndvAdjuntos", false, false, "Subiendo Archivo");
            $("#divVentanaMensajes").dialog("close");
            ObtenerArchivosAdjuntos(numOficio);
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndvAdjuntos", false, false, "Subiendo Archivo");
            ObtenerArchivosAdjuntos(numOficio);
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
//--------------------------------------------------------Obtiene el archivo Fisico--------------------------------------------
function obtieneArchivoAd(numOficio, nombreArchivo, obj) {
    numOficio = $(obj).attr("lang");
    __doPostBack('DescargarArchivoAdjunto', numOficio + "," + nombreArchivo);
    //window.location.assign("RespuestaAdjuntos.aspx?numOficio=" + numOficio + "&nombreArchivo=" + nombreArchivo);
}

function obtieneArchivoAd2(numOficio, nombreArchivo, obj) {
    //numOficio = $(obj).attr("lang");
    __doPostBack('DescargarArchivoAdjunto', numOficio + "," + nombreArchivo);
    //window.location.assign("RespuestaAdjuntos.aspx?numOficio=" + numOficio + "&nombreArchivo=" + nombreArchivo);
}

function eliminaArchivo(numOficio, nombreArchivo, obj) {
    numOficio = $(obj).attr("lang");
    WaitingVtn("divBloqVtndvAdjuntos", true, true, "Borrando Archivo");
    document.getElementById("imgVtnLoading").style.marginTop = "6%";
    var Parametros = { opcion: 3, numOficio: numOficio, nombreArchivo: nombreArchivo }
    peticionAjax("MonitoreoOficios.aspx/eliminarArchivosAdjunto", "POST", Parametros, function (data) {
        if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
            WaitingVtn("divBloqVtndvAdjuntos", true, false, "");
            MostrarMsj("Registro eliminado exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
                WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
                $("#divVentanaMensajes").dialog("close");
                ObtenerArchivosAdjuntos(numOficio);
            }, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                WaitingVtn("divBloqVtndvAdjuntos", false, false, "");
                ObtenerArchivosAdjuntos(numOficio);
            });
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
    }, null);
} 