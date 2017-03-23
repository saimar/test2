
$(function () {
   
});

var perfilUsuario = ""; var esGerente = false; var esAnalista = false;
function GetPerfilUsuario() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";    
    peticionAjax("clientesind.aspx/GetPerfilUsuario", "POST", null, function (data) {
        perfilUsuario = data.d;
        if (perfilUsuario == "16")
            esAnalista = true;
        if (perfilUsuario == "17")
            esGerente = true;
        GetFechaCorte();
        WidtDatePicker();
    }, null);
}


function GetFechaCorte() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('clientesind.aspx/ObtenerFechaCorte', "POST", null, function (data) {
        $(".periodo").val(data.d);
        ValidaStatus(data.d);
    }, null);
}

//------------------------------------------- Control de Estatus ------------------------
var mostrarEdicion = false; var mostrarCheckAutorizar = false;
function ValidaStatus(fechaCorte) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('clientesind.aspx/VerificarStatus', "POST", { fecha: fechaCorte }, function (data) {
        if (data.d != "") {
            if (esAnalista && data.d.toUpperCase() == "ABIERTO") {
                // $("#divStatusTabla").show();
                mostrarEdicion = true;
                mostrarCheckAutorizar = false;
                $("#btnValidacion").show();
                $("#btnRechazar").hide();
                $("#btnAutorizar").hide();
                $("#lbStatus").html("<span style='font-weight:bold'>" + data.d + "</span>" + " (Enviar a Revisión)");

                $("#divBitacora").hide();
            }
            if (esAnalista && (data.d.toUpperCase() == "REVISION" || data.d.toUpperCase() == "REVISIÓN")) {
                mostrarEdicion = false;
                mostrarCheckAutorizar = false;
                $("#btnValidacion").hide();
                $("#btnRechazar").hide();
                $("#btnAutorizar").hide();
                $("#lbStatus").html("<span style='font-weight:bold'>" + data.d + "</span>" + " (Es Necesario Autorizar)");
                $("#divBitacora").hide();
            }
            if (esAnalista && data.d.toUpperCase() == "AUTORIZAR") {
                mostrarEdicion = false;
                mostrarCheckAutorizar = false;
                $("#btnValidacion").hide();
                $("#btnRechazar").hide();
                $("#btnAutorizar").hide();
                $("#lbStatus").html("<span style='font-weight:bold'>" + data.d + "</span>" + " (Enviar a Revisión)");
                $("#divBitacora").hide();
            }
            if (esGerente && data.d.toUpperCase() == "ABIERTO") {
                mostrarEdicion = false;
                mostrarCheckAutorizar = false;
                $("#btnValidacion").hide();
                $("#btnRechazar").hide();
                $("#btnAutorizar").hide();
                $("#lbStatus").html("<span style='font-weight:bold'>" + data.d + "</span>" + " (Enviar a Revisión)");
                $("#divBitacora").hide();
            }
            if (esGerente && (data.d.toUpperCase() == "REVISION" || data.d.toUpperCase() == "REVISIÓN")) {
                mostrarEdicion = false;
                mostrarCheckAutorizar = true;
                $("#btnValidacion").hide();
                $("#btnRechazar").show();
                $("#btnAutorizar").show();
                $("#lbStatus").html("<span style='font-weight:bold'>" + data.d + "</span>" + " (Autorizar)");
                $("#divBitacora").show();
            }
            if (esGerente && data.d.toUpperCase() == "AUTORIZAR") {
                mostrarEdicion = false;
                mostrarCheckAutorizar = true;
                $("#btnValidacion").hide();
                $("#btnRechazar").show();
                $("#btnAutorizar").hide();
                $("#lbStatus").html("<span style='font-weight:bold'>" + data.d + "</span>" + " (Autorizar)");
                $("#divBitacora").hide();
            }
            if (!esAnalista && !esGerente) {
                mostrarEdicion = false;
                mostrarCheckAutorizar = false;
                $("#btnValidacion").hide();
                $("#btnRechazar").hide();
                $("#btnAutorizar").hide();
                $("#lbStatus").html("");
                $("#divEncabezado").hide();
                $("#divBitacora").hide();
            }
        }
        else {
            mostrarEdicion = false;
            mostrarCheckAutorizar = false;
            $("#btnValidacion").hide();
            $("#btnRechazar").hide();
            $("#btnAutorizar").hide();
            $("#lbStatus").html("");
            $("#divEncabezado").hide();
            $("#divBitacora").hide();
        }
        CargarTabla(fechaCorte);
    }, null);
}
var existeEstatus2 = false;
function CargarTabla(fechaCorte) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('clientesind.aspx/leerDatos', "POST", { año: fechaCorte.split("/")[2], mes: fechaCorte.split("/")[1], dia: fechaCorte.split("/")[0], idCliente: 0, opcion: 3, nombreCliente: "" }, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        $("#divTabla").html(CrearTabla(JSON, "right"));
        $("#lbFechaPeriodo").html(fechaCorte);
        ObtenerUDI(fechaCorte);
    }, null);
}

function CrearTabla(listaDeJSON, alineacion) {

    var cad = '<div class="divContenidoTabla" style="width:90%;"><table id="tblClientesIndividuales" class="dataGridDatos" style="width: 100%;">';
    cad += '<thead>';
    cad += '<tr style="background: rgb(0, 128, 128);color:White;font-weight:bold;"><td colspan="15" style="text-align:center;padding:2px;">CLIENTES INDIVIDUALES </td></tr><tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    cad += "<th></th>";
    for (var encabezados in auxJSON) {
        if (encabezados != "Status" && encabezados != "Limite Mes") {
            cad += '<th style="text-align: center;">';
            if (encabezados == "Consecutivo")
                cad += "No.";
            else if (encabezados == "ResCub")
                cad += "Reserva Cubierta";
            else if (encabezados == "ResExp")
                cad += "Reserva Expuesta";
            else if (encabezados == "ResTot")
                cad += "Reserva Total";
            else
                cad += encabezados.toString();
            cad += '</th>';
        }
    }
    if (perfilUsuario == "16" && mostrarEdicion)
        cad += "<th></th>";
    existeEstatus2 = false;
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (json[element].indexOf("TOTAL") != -1) {
                indexAux += filas.toString() + ",";
            }
        }
        if (listaDeJSON[filas]["Status"] == "2" && !existeEstatus2)
            existeEstatus2 = true;
    }
    cad += esGerente && existeEstatus2 && mostrarCheckAutorizar ? "<th></th>" : "";
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var cumplio = false;
        if (indexAux != "") {
            for (var i = 0; i < indexAux.split(',').length - 1; i++) {
                if (filas == parseInt(indexAux.split(',')[i]))
                    cumplio = true;
            }
        }
        else cumplio = false;
        cad += ((filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + (cumplio ? 'style="background:rgba(128, 128, 128, 0.41);"' : (listaDeJSON[filas]["Status"] == "2" ? 'style="background:rgb(195, 93, 93);"' : '')) + "id='tr_" + listaDeJSON[filas]["Nombre"] + "_" + listaDeJSON[filas]["Consecutivo"] + "' alt='aa'  onclick='MostarOcultarDetalleCliente(this);' " + (listaDeJSON[filas]["Status"] == "2" ? " Title='Cliente con cambios pendientes de autorizar' " : "") + ">";
        var json = listaDeJSON[filas];
        cad += !cumplio ? '<td><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>' : "<td></td>";
        for (var element in json) {
            if (element == 'Saldo al Corte' || element == 'ResCub' || element == 'ResExp' || element == 'ResTot') {
                cad += '<td style="text-align:right;' + (cumplio ? "font-weight:bold;color:Green" : "font-weight:normal") + '">';
                cad += DevuelveCantidadSeparadaPorComas(json[element]);
            }
            else if (element == 'PorcCub' || element == 'PorcExp') {
                cad += '<td style="text-align:right;' + (cumplio ? "font-weight:bold;color:Green" : "font-weight:normal") + '">';
                cad += Math.round(json[element]) + "%";
            }
            else if (element != "Status" && element != "Limite Mes") {


                cad += '<td style="text-align:' + (element == "FacCub" || element == "FacExp" ? "right" : "center") + (cumplio ? ";font-weight:bold;color:Green" : ";font-weight:normal") + ';">';
                cad += json[element];
            }
            cad += '</td>';
        }
        if (perfilUsuario == "16" && mostrarEdicion)
            cad += "<td style='text-align: center;'>" + (filas != listaDeJSON.length - 1 ? "<input type='button' value='Editar' id='" + listaDeJSON[filas]["Nombre"] + "_' class='classButton' onclick='EditarCliente(this);'/>" : "") + "</td>";

        if (esGerente && listaDeJSON[filas]["Status"] == "2" && mostrarCheckAutorizar)
            cad += '<td><input type="checkbox" alt="' + listaDeJSON[filas]["Nombre"] + '" onclick="CheckEstatus2_Click();"/></td>';
        else if (esGerente && mostrarCheckAutorizar)
            cad += "<td></td>";
        cad += '</tr>' + (filas != listaDeJSON.length - 1 ? '<tr id="tr" class="' + listaDeJSON[filas]["Consecutivo"] + '" style="display:none" ></tr>' : '');
    }
    cad += '</tbody>';

    cad += '</table></div>';
    return cad;
}
function CheckEstatus2_Click() {
    event.cancelBubble = true;
}

function MostarOcultarDetalleCliente(obj) {
    if ($(obj).attr("alt") == "aa") {
        $("." + $(obj).attr("id").split("_")[2]).slideDown('slow');
        if ($("." + $(obj).attr("id").split("_")[2]).html() == "")
            CargaDetalleCliente($(obj).attr("id").split("_")[1], $(obj).attr("id").split("_")[2]);
        $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
    }
    else {

        $("." + $(obj).attr("id").split("_")[2]).slideUp('slow');
        $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
    }
    $(obj).attr("alt", ($(obj).attr("alt") == "aa" ? "ab" : "aa"));
}

function CargaDetalleCliente(NombreCliente, idClass) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('clientesind.aspx/leerDatos', "POST", { año: $(".periodo").val().split("/")[2], mes: $(".periodo").val().split("/")[1], dia: $(".periodo").val().split("/")[0], idCliente: 1, opcion: 3, nombreCliente: NombreCliente }, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        $("." + idClass).html(CreaSubTabla(JSON, "right"));
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function CreaSubTabla(listaDeJSON) {
    var cad = '<pre><td colspan="14"><div style="width:100%;overflow: auto;"><table style="width: 100%;">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    for (var encabezados in auxJSON) {
        cad += '<th style="text-align: center;background: rgba(4, 58, 58, 0.89);">';
        if (encabezados == "FDReservasPreventivasParteCub")
            cad += "ReservaPrevPartCub";
        else if (encabezados == "FDReservasPreventivasParteExp")
            cad += "ReservaPrevPartExp";
        else
            cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (json[element].indexOf("TOTAL") != -1) {
                indexAux += filas.toString() + ",";
            }
        }
    }
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var cumplio = false;
        if (indexAux != "") {
            for (var i = 0; i < indexAux.split(',').length - 1; i++) {
                if (filas == parseInt(indexAux.split(',')[i]))
                    cumplio = true;
            }
        }
        else cumplio = false;
        cad += "<tr style='background:" + ((filas % 2 == 0) ? "rgba(128, 128, 128, 0.46);'>" : "rgba(128, 128, 128, 0.14);'>");
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element == 'Capital' || element == 'Interes' || element == 'Saldo al Corte' || element == 'Anticipos' || element == 'Base Calificacion' || element == 'Valor Garantia' || element == 'FDReservasPreventivasParteCub' || element == 'FDReservasPreventivasParteExp') {
                cad += '<td style="text-align:right;' + (cumplio ? "font-weight:bold;color:Green" : "font-weight:normal") + '">';
                cad += json[element] == "0.00" ? "0" : DevuelveCantidadSeparadaPorComas(json[element]);
            }
            else if (element == 'PorcCub' || element == 'PorcExp') {
                cad += '<td style="text-align:right;' + (cumplio ? "font-weight:bold;color:Green" : "font-weight:normal") + '">';
                cad += Math.round(json[element]) + "%";
            }
            else if (element == 'FacCub' || element == 'FacExp') {
                cad += '<td style="text-align:right;' + (cumplio ? "font-weight:bold;color:Green" : "font-weight:normal") + '">';
                cad += json[element] + "%";
            }
            else {
                cad += '<td style="text-align:' + (element == "FacCub" || element == "FacExp" ? "right" : "center") + (cumplio ? ";font-weight:bold;color:Green" : ";font-weight:normal") + ';">';
                cad += json[element];
            }
            cad += '</td>';
        }

        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div></td></pre>';
    return cad;
}

//-------------------------------------------------------------EDICION---------------------------------
function EditarCliente(obj) {
    event.cancelBubble = true;
    Valor = 0; valgar = 0; ValorExp = 0; ValorPorEx = 0; ValBaseCal = 0;
    $("#tdRadio1").html('<input type="radio" id="rdbVectorNormal" lang="rdb_' + $(obj).attr("id").split("_")[0] + '" checked="checked" value="70"/>Vector Normal');
    $("#tdRadio2").html('&nbsp; &nbsp;&nbsp; <input type="radio" id="rdbVectorGuber"  lang="rdb_' + $(obj).attr("id").split("_")[0] + '" value="91"/>Vector Gubernamental');
    $("#divEditar").slideDown('slow');
    $("#divMain").slideUp('slow');
    $("#spNombre").html($(obj).attr("id").split("_")[0]);
    CargarDatosCliente($(obj).attr("id").split("_")[0]);
    $("#btnGuardarEdicion").attr("alt", $(obj).attr("id").split("_")[0]);
}

function CancelarEdicion() {
    $("#divMain").slideDown('slow');
    $("#divEditar").slideUp('slow');
}

function controCheck(obj) {
    event.cancelBubble = true;
    $(obj).children(0).attr("checked", true);
    if ($(obj).children(0).attr("id") == "rdbVectorNormal")
        $("#rdbVectorGuber").attr("checked", false);
    else
        $("#rdbVectorNormal").attr("checked", false);
    CargarTablaVectoresEdicion($(obj).children(0).attr("lang").split("_")[1]);
}
var calCub; var calExp; var FacCub; var FacExp;
function CargarDatosCliente(NombreCliente) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('clientesind.aspx/BuscarCliente', "POST", { fecha: $(".periodo").val(), NoCliente: NombreCliente }, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        $("#txtPorcentajeCub").val(JSON[0]["PorcCub"]);
        $("#txtPorcentajeExp").val(JSON[0]["PorcExp"]);
        $("#txtValorGarantia").val(JSON[0]["ValorGar"] == "" || JSON[0]["ValorGar"] == undefined ? "0" : DevuelveCantidadSeparadaPorComas(JSON[0]["ValorGar"]));
        JSON[0]["VectorAsoc"] == "70" ? $("#rdbVectorNormal").attr("checked", true) : $("#rdbVectorGuber").attr("checked", true);
        calCub = JSON[0]["CalCub"];
        calExp = JSON[0]["CalExp"];
        FacCub = JSON[0]["FacCub"];
        FacExp = JSON[0]["FacExp"];

        Valor = JSON[0]["PorcCub"];
        ValorExp = JSON[0]["PorcExp"];
        valgar = (JSON[0]["ValorGar"] == "" || JSON[0]["ValorGar"] == undefined ? "0" : JSON[0]["ValorGar"]);
        ValBaseCal = JSON[0]["Base Calificacion"];

        CargarTablaVectoresEdicion(NombreCliente);
    }, null);
}

function CargarTablaVectoresEdicion(NombreCliente) {
    var valorRadioCheck = $("#rdbVectorGuber").is(":checked") ? $("#rdbVectorGuber").attr("value") : $("#rdbVectorNormal").attr("value")
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('clientesind.aspx/DetalleVectorCliente', "POST", { NomCliente: NombreCliente, idVector: parseInt(valorRadioCheck) }, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        $("#tblTablaVectores").html(CrearTablaVectores(JSON));
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function CrearTablaVectores(listaDeJSON) {
    var cad = '<pre><div style="width:90%;"><table id="tblVectores" class="dataGridDatos" style="width: 100%;">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    cad += "<th></th>";
    cad += "<th>Calificación</th>";
    cad += "<th>Sub Calificación</th>";
    cad += "<th>Factor</th>";
    cad += "<th>Cubierto</th>";
    cad += "<th>Expuesto</th>";
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var esDiferenteCalificacion = filas == 0 ? true : (listaDeJSON[filas]["Calificacion"] != listaDeJSON[filas - 1]["Calificacion"] ? true : false);
        cad += '<tr class="class_' + listaDeJSON[filas]["Calificacion"] + '"  id="tr_"' + listaDeJSON[filas]["idRow"] + "' alt='aa' onclick='MostarOcultarVectoresCliente(this);' style='background:" + (filas % 2 == 0 ? "rgb(240, 255, 255);padding: 2px;" : "rgb(198, 229, 204);padding: 2px;") + (esDiferenteCalificacion ? "display:table-row;" : "display:none;") + "'>";
        var json = listaDeJSON[filas];
        cad += esDiferenteCalificacion ? '<td><img src="../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif"/></td>' : "<td></td>";
        cad += "<td style='text-align:left;'>" + listaDeJSON[filas]["Calificacion"] + "</td>"
        cad += "<td style='text-align:left;'>" + listaDeJSON[filas]["SubCalificacion"] + "</td>"
        cad += "<td style='text-align:center;'>" + listaDeJSON[filas]["Factor"] + "</td>"
        var esCalCub = listaDeJSON[filas]["SubCalificacion"] == calCub && listaDeJSON[filas]["Factor"] == FacCub ? true : false;
        var esCalExp = listaDeJSON[filas]["SubCalificacion"] == calExp && listaDeJSON[filas]["Factor"] == FacExp ? true : false;
        cad += "<td style='text-align:center;'><input type='radio'  id='rdbCubierto_" + listaDeJSON[filas]["idRow"] + "' onclick='ControlRadioButtonsTablaVectores(this);' " + (esCalCub ? "checked='checked'" : "") + "/></td>"
        cad += "<td style='text-align:center;'><input type='radio'  id='rdbExpuesto_" + listaDeJSON[filas]["idRow"] + "' onclick='ControlRadioButtonsTablaVectores(this);' " + (esCalExp ? "checked='checked'" : "") + "/></td>"
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div></pre>';
    return cad;
}

function MostarOcultarVectoresCliente(obj) {
    if ($(obj).attr("alt") == "aa") {
        $(".class_" + $(obj).attr("class").split("_")[1]).show();
        $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/collapse.gif");
    }
    else {

        $(".class_" + $(obj).attr("class").split("_")[1]).hide();
        $(obj).show();
        $($(obj).children(0).children(0)).attr("src", "../../Images/Cancelaciones/SeguimientoCancelacion/expand.gif");
    }
    $(obj).attr("alt", ($(obj).attr("alt") == "aa" ? "ab" : "aa"));
}

function ControlRadioButtonsTablaVectores(obj) {
    event.cancelBubble = true;
    var indiceCelda = $(obj).attr("id").split("_")[0] == "rdbCubierto" ? 4 : 5;
    $('#tblVectores tr').each(function () {
        if ($(obj).attr("id") == $(this.cells[indiceCelda]).find('input:radio').attr("id"))
            $(this.cells[indiceCelda]).find('input:radio').attr('checked', true);
        else
            $(this.cells[indiceCelda]).find('input:radio').attr('checked', false);

    });
}

///------------------------------------EVENTOS

function acceptDec(evt) {
    var key = evt.keyCode;
    return (key <= 13 || (key >= 48 && key <= 57) || key == 46);
}
function acceptNum(evt) {
    var key = evt.keyCode;
    return (key <= 13 || (key >= 48 && key <= 57));
}
function acceptNumLetr(evt) {
    var key = evt.keyCode;
    return (key <= 13 || (key >= 48 && key <= 57)) || (key > 31 && (key < 64 || key > 90) && (key < 97 || key > 122));
}

function txtPorcExp_onblur(objeto) {
    var txtPorcExp = $(objeto).val();
    if (isNaN(txtPorcExp) == true) {
        alert("Inserte una valor valido");
        txtPorcExp.focus();
        txtPorcExp.select();
    }
    else {
        if (txtPorcExp <= 100 && txtPorcExp > 0) {
            var txtFactCub = 100 - txtPorcExp;
            txtFactCub = Math.round(txtFactCub * 100) / 100
            document.getElementById('txtPorcentajeExp').value = txtFactCub;
            document.getElementById('txtValorGarantia').value = 0;
            GetValor(txtPorcExp, txtFactCub);
        }
        else {
            document.getElementById('txtPorcentajeExp').value = 100;
            document.getElementById('txtValorGarantia').value = 0;
            GetValorExp(100);
        }
    }
}

function txtvalor_garantia(objeto) {
    var txtval_garan = objeto.value.replace(/,/gi, '');
    var txtPorcCub = document.getElementById('txtPorcentajeCub').value;
    var varbase = 0.0;
    if (isNaN(txtval_garan) == true) {
        alert("Inserte un valor valido");
        txtval_garan.focus();
        txtval_garan.select();
    }
    else {
        varbase = getValgarantizado(txtval_garan);
        if (varbase != 0) {
            document.getElementById('txtPorcentajeCub').value = Math.round(((txtval_garan * 100) / varbase) * 100) / 100;
            document.getElementById('txtPorcentajeExp').value = Math.round((100 - ((txtval_garan * 100) / varbase)) * 100) / 100;
        }
        else {
            document.getElementById('txtPorcentajeCub').value = 0;
            document.getElementById('txtPorcentajeExp').value = 0;
        }
        if (txtval_garan == 0) {
            document.getElementById('txtPorcentajeExp').value = 100;
        }
    }

    Comma(txtval_garan);
}

function Comma(numberOg) {
    number = numberOg.split(".");

    if (isNaN(number[1]) == true) {
        number[1] = '00';
    }
    number[0] = '' + number[0];
    if (number[0].length > 3) {
        var mod = number[0].length % 3;
        var output = (mod > 0 ? (number[0].substring(0, mod)) : '');
        for (i = 0; i < Math.floor(number[0].length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number[0].substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number[0].substring(mod + 3 * i, mod + 3 * i + 3);
        }
        document.getElementById('txtValorGarantia').value = output + '.' + number[1];
    }
    else
        document.getElementById('txtValorGarantia').value = number[0] + '.' + number[1];
}

var Valor = 0; var valgar = 0; var ValorExp = 0; var ValorPorEx = 0; var ValBaseCal = 0;
function GetValor(valor, valorPorcentaje) {
    Valor = valor;
    valgar = 0;
    ValorExp = 100 - valor;
    ValorPorEx = valorPorcentaje;
    return 0;
}

function GetValorExp(valor) {
    ValorExp = valor;
    Valor = 0;
    valgar = 0;
    return 0;
}

function getValgarantizado(valor) {
    valgar = valor;
    Valor = Math.round(((valor * 100) / parseFloat(ValBaseCal)) * 100) / 100;
    ValorExp = Math.round((100 - ((valor * 100) / parseFloat(ValBaseCal))) * 100) / 100;
    return parseFloat(ValBaseCal);
}


/////////////////-----------------------GUARDAR CLIENTE
function GuardarclienteIndividual() {
    var valFactCub = 0; var valFactExp = 0; var valCalcub = 0; valCalExp = "0";
    $('#tblVectores tr').each(function () {
        if ($(this.cells[4]).find('input:radio').is(":checked")) {
            valFactCub = $(this.cells[3]).html();
            valCalcub = $(this.cells[2]).html();
        }
        if ($(this.cells[5]).find('input:radio').is(":checked")) {
            valFactExp = $(this.cells[3]).html();
            valCalExp = $(this.cells[2]).html();
        }
    });

    if ($("#txtPorcentajeCub").val() == "" || parseInt($("#txtPorcentajeCub").val()) == "0")
        $("#txtPorcentajeCub").val("0");
    if ($("#txtPorcentajeExp").val() == "" || parseInt($("#txtPorcentajeExp").val()) == "0")
        $("#txtPorcentajeExp").val("0");
    var parametros = {
        Date: $(".periodo").val(),
        Nombre: $("#btnGuardarEdicion").attr("alt"),
        porcCub: $("#txtPorcentajeCub").val(),
        porcExp: $("#txtPorcentajeExp").val(),
        factCub: valFactCub,
        factExp: valFactExp,
        calCub: valCalcub,
        calExp: valCalExp,
        calif: DeterminaCalificacion(valCalcub, valCalExp),
        ValGar: valgar,
        VectorAsoc: $("#rdbVectorNormal").is(":checked") ? "70" : "91"
    };
    var vaaa = "";
    if ((valCalcub != "0" && $("#txtPorcentajeCub").val() == "0") || (valCalcub == "0" && $("#txtPorcentajeCub").val() != "0")) {
        alert("¡No se puede guardar!\\n Verifique que el Porcentaje Cubierto sea mayor a 0 y tenga selección en la tabla.");
    }
    else if ((valFactExp != "0" && $("#txtPorcentajeExp").val() == "0") || (valFactExp == "0" && $("#txtPorcentajeExp").val() != "0")) {
        alert("¡No se puede guardar!\\n Verifique que el Porcentaje Expuesto sea mayor a 0 y tenga selección en la tabla.");
    }
    else {
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax('clientesind.aspx/GuardarClienteIndividual', "POST", parametros, function (data) {
            if (data.d == "GOOD") {
                CancelarEdicion();
                CargarTabla($(".periodo").val());
            }
            else
                Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function DeterminaCalificacion(calificacionCub, calificacionExp) {
    var calificacion = "";
    if (calificacionExp == calificacionCub)
        calificacion = calificacionExp
    else if (calificacionExp == "0" && calificacionCub != "0")
        calificacion = calificacionCub
    else if (calificacionCub == "0" && calificacionExp != "0")
        calificacion = calificacionExp
    else if (calificacionCub > calificacionExp)
        calificacion = calificacionCub;
    else calificacion = calificacionExp;
    return calificacion;
}

///////////////----------------------------------

function ObtenerUDI(fechaCorte) {
    peticionAjax('clientesind.aspx/obtenerUDI', "POST", { año: fechaCorte.split("/")[2], mes: fechaCorte.split("/")[1], dia: fechaCorte.split("/")[0] }, function (data) {
        $("#lbValorUdi").html(data.d.split("&&&&")[0]);
        $("#limitemespesos").html(data.d.split("&&&&")[1]);
        if (esAnalista || esGerente) {
            if (document.getElementById("divBitacora").style.display != "none")
                obtieneDatosBitacora(fechaCorte);
            else
                ValidaLlamadasFunciones(fechaCorte);
        }
        else {
            $("#btnMostarOcultarCifras").hide();
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    }, null);
}

function obtieneDatosBitacora(fechaCorte) {
    peticionAjax('clientesind.aspx/obtieneDatosBitacora', "POST", { FechaCorte: fechaCorte, Opcion: 2 }, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        $("#divBitacora").html(CreaTablaBitacora(JSON));
        ValidaLlamadasFunciones(fechaCorte);
    }, null);
}

function CreaTablaBitacora(listaDeJSON) {
    var cad = '<center><table>';
    cad += '<tr>';
    cad += '<td colspan="6" style="color:#FEFEFE;background-color:rgb(0, 128, 128);border-bottom:none;style:font-size:5px;" align="center" valign="bottom">CUADRO DE DIALOGO POR VALIDACIÓN</td>';
    cad += '</tr><tr>';
    cad += '<th scope="col" style="background: rgb(0, 128, 128);color:White">Fecha</th><th scope="col" style="background: rgb(0, 128, 128);color:White">Fecha de Corte</th><th scope="col" style="background: rgb(0, 128, 128);color:White">Usuario</th><th scope="col" style="background: rgb(0, 128, 128);color:White">Nombre del Usuario</th><th scope="col" style="background: rgb(0, 128, 128);color:White">Comentario</th>';
    cad += '</tr>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += ((filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + "id='tr_' >";
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element != "FIIdPerfil") {
                cad += '<td style="text-align:' + (element == "FacCub" || element == "FacExp" ? "right" : "center") + (";font-weight:normal") + ';">';
                cad += json[element];
                cad += '</td>';
            }
        }
        cad += '</tr>';
    }
    cad += '</table></center>';
    return cad;
}

function ValidaLlamadasFunciones(fechaCorte) {
    if (esGerente) {
        $("#btnMostarOcultarCifras").val("Ver Resumen Cifras Control");
        obtieneDatosCifrasControl(fechaCorte);
    }
    else if (esAnalista) {
        $("#btnMostarOcultarCifras").val("Ver Calificación Cartera");
        obtieneDatosCalificacionCartera(fechaCorte);
    }
    else {
        $("#btnMostarOcultarCifras").hide();
        Waiting(false, "Espere por favor. Cargando Información...");
    }
}

function obtieneDatosCifrasControl(fechaCorte) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('clientesind.aspx/obtieneDatosCifrasControl', "POST", { año: fechaCorte.split("/")[2], mes: fechaCorte.split("/")[1], dia: fechaCorte.split("/")[0], idCliente: 0, opcion: 12, nombreCliente: "" }, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        $("#divContenedorCifras").html(TablaResumenCifrasControl(JSON, 1));
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function obtieneDatosCalificacionCartera(fechaCorte) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('clientesind.aspx/obtieneDatosCalificacionCartera', "POST", { año: fechaCorte.split("/")[2], mes: fechaCorte.split("/")[1], dia: fechaCorte.split("/")[0], idCliente: 0, opcion: 13, nombreCliente: "" }, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        $("#divContenedorCifras").html(TablaResumenCifrasControl(JSON, 2));
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function TablaResumenCifrasControl(listaDeJSON, opcionTabla) {
    var cad = '<center><table>';
    if (opcionTabla == 1) {
        cad += '<tr class="Rep_EncabezadoTabla">';
        cad += '<td colspan="1" style="font-size:X-Small;border-bottom:none" align="center">   </td><td colspan="2" style="font-size:X-Small;border-bottom:none;" align="center">   </td><td colspan="6" style="font-size:X-Small;" align="center">   CALIFICACION CUBIERTA Y EXPUESTA  </td>';
        cad += '</tr><tr class="Rep_EncabezadoTabla">';
        cad += '<td rowspan="1" style="font-size:X-Small;border-top:none; border-bottom:none" align="center"> &nbsp; GRADO DE RIESGO  &nbsp; </td><td colspan="2" style="font-size:X-Small;border-top:none; vertical-align:text-top" align="center"> &nbsp; CALIFICACION DEUDOR  &nbsp;</td><td colspan="2" style="font-size:X-Small;" align="center"> &nbsp;  CUBIERTA  &nbsp; </td><td colspan="2" style="font-size:X-Small;" align="center">  &nbsp; EXPUESTA &nbsp;  </td><td style="font-size:X-Small;border-bottom:none; vertical-align:text-bottom" align="center"> &nbsp;  TOTAL CASOS  &nbsp; </td><td style="font-size:X-Small;border-bottom:none; vertical-align:text-bottom" align="center">&nbsp;   RESERVA TOTAL  &nbsp; </td>';
        cad += '</tr><tr class="Rep_EncabezadoTabla">';
        cad += '<th scope="col" style="border-top:none"></th><th scope="col"> &nbsp; CASOS &nbsp; </th><th scope="col">SDO CREDITO</th><th scope="col"> &nbsp; CASOS &nbsp; </th><th scope="col"> &nbsp; MTO RVA &nbsp; </th><th scope="col"> &nbsp; CASOS &nbsp; </th><th scope="col"> &nbsp; MTO RVA  &nbsp;</th><th scope="col" style="border-top:none"></th><th scope="col" style="border-top:none"></th>';
        cad += '</tr>';
    }
    else {
        cad += '<tr class="Rep_EncabezadoTabla"> <td align="center" colspan="8">RESUMEN DE CALIFICACIÓN DE CARTERA</td></tr>';
        cad += '<tr class="Rep_EncabezadoTabla"><td align="center" colspan="2"> </td><td align="center" colspan="3">MONTO</td><td align="center" colspan="3">RESERVA</td></tr>';
        cad += '<tr class="Rep_EncabezadoTabla" style="text-align:center"><th scope="col">RANGO</th><th scope="col">NO. CASOS <br> CALIFICADOS</th><th scope="col">CUBIERTO</th><th scope="col">EXPUESTOS</th><th scope="col">TOTAL</th><th scope="col">CUBIERTO</th><th scope="col">EXPUESTOS</th><th scope="col">TOTAL</th></tr>';
    }
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += ((filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + (filas == listaDeJSON.length - 1 ? 'style="background:rgba(128, 128, 128, 0.41);"' : '') + "id='tr_' >";
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element == 'RESERVATOTAL' || element == 'MTO_RVA_CUBIERTA' || element == 'MTO_RVA_EXPUESTA' || element == 'SDO CREDITO') {
                cad += '<td style="text-align:right;' + ("font-weight:normal") + '">';
                cad += DevuelveCantidadSeparadaPorComas(json[element]);
            }
            else if (element != "Status" && element != "Limite Mes") {
                cad += '<td style="text-align:' + (element == "FacCub" || element == "FacExp" ? "right" : "center") + (";font-weight:normal") + ';">';
                cad += json[element];
            }
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</table></center>';
    return cad;
}

function MostrarOcultarResumenCifrasControl(obj) {
    if ($(obj).attr("lang") == "aa") {
        $("#divCifrasControl").slideDown('slow');
        $(obj).attr("lang", "ab")
    }
    else {
        $("#divCifrasControl").slideUp('slow');
        $(obj).attr("lang", "aa")
    }
}
function MostrarVtnBusqueda(opcionBoton, titulo) {
    if (esAnalista && !existeEstatus2) {
        MostrarMsj("No hay información para validar.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 125, null, null, null);
        return;
    }

    var cadena = '<div id="divBloqVtnEnvio" style="width:96%;height:84%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:70%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetallVtnEnvio" style="width:100%;height:100%;overflow: hidden;margin-top: 0px;">  ';
    cadena += '<center style="text-align: left;">Adjuntar Nota: Clientes por <span id="spNotaCliente" style="font-weight:bold;">' + (esAnalista && opcionBoton == "Autorizo" ? "Autorizar" : titulo) + '</span></center></br>';
    cadena += '<div style="height: 65%;overflow: hidden;"><table style="width:100%;height: 100%;"><tr style="width:100%;height: 100%;"><td style="width:10%">Nota:</td><td style="width:90%"> <textarea cols="30" rows="2" id="txtComentario" style="font-size:10px;resize: none;background-color:White;width:90%; text-align:left;height:80px;border:x"></textarea></td></tr></table></div>';
    cadena += '</div></div>';
    cadena += "<div><table style='width:100%;height:8%;margin-left: 17%;'><tr style='height:1%'></tr><tr><td style='text-align:left;width: 50%;'></td><td style='text-align:right'><table><tr><td><input id='btnAceptarEnvio' alt='" + opcionBoton + "_" + (esAnalista && opcionBoton == "Autorizo" ? "Autorizar" : titulo) + "' type='button' class='classButton'  value='Continuar'/></td><td style='width:10px;'></td><td></input><input id='btnCancelarEnvio' type='button' class='classButton'  value='Cancelar'/></td></tr></table></td></div>";
    $("#divEnvioMail").empty();
    AgregarVtnFlotante("divEnvioMail", "", (opcionBoton == 'Validacion' ? "VALIDAR" : (opcionBoton == 'Rechazo' ? "RACHAZAR" : "AUTORIZAR")) + "  CLIENTES  INDIVIDUALES", "", cadena, 200, 400, false, false, "", "", null);
    $("#btnAceptarEnvio").on("click",
        function () {
            if (!esAnalista && !esGerente) return;
            var listaDeNombresClientes = "";
            $('#tblClientesIndividuales tr').each(function () {
                if (this.cells.length > 1) {
                    if ($(this.cells[14]).find('input:checkbox').length > 0 && $(this.cells[14]).find('input:checkbox').is(":checked")) {
                        listaDeNombresClientes = $($(this.cells[14]).find('input:checkbox')[0]).attr("alt") + ",";
                    }
                }
            });
            if (listaDeNombresClientes == "" && esGerente) {
                WaitingVtn("divBloqVtnEnvio", true, false, "");
                MostrarMsj("Debe de Seleccionar al menos un Cliente Individual.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, function () {
                    WaitingVtn("divBloqVtnEnvio", false, false, "");
                    $("#divVentanaMensajes").dialog("close");
                }, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    WaitingVtn("divBloqVtnEnvio", false, false, "");
                });
            }
            else {
                $("#divEnvioMail").dialog("close");
                Waiting(true, "Espere por favor. Cargando Información...");
                var parametros = {
                    opcionBoton: $(this).attr("alt").split("_")[0],
                    opcionPerfil: esGerente ? "1" : "2",
                    Status: $(this).attr("alt").split("_")[1],
                    comentario: $("#txtComentario").val(),
                    listaDeNombresClientes: listaDeNombresClientes,
                    año: $(".periodo").val().split("/")[2],
                    mes: $(".periodo").val().split("/")[1],
                    dia: $(".periodo").val().split("/")[0]
                };
                peticionAjax('clientesind.aspx/OpcionesBtnsContinuar', "POST", parametros, function (data) {
                    if (data.d == "GOOD") {
                        MostrarMsj("Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                        ValidaStatus($(".periodo").val());
                    }
                    else {
                        MostrarMsj("Error " + data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                        Waiting(false, "Espere por favor. Cargando Información...");
                    }
                }, null);
            }
            // 
        });
    $("#btnCancelarEnvio").on("click",
        function () {
            $("#divEnvioMail").dialog("close");
        });
}
