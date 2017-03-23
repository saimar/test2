
var nuevas = new Array();

var Pais = '';
var Estado = '';
var Region = '';
var EstadoFVC = '';

var Sistema = '';
var Producto = '';
var SubProducto = '';
var Descripcion = '';
var Descripcion2 = '';
var Clave = '';

var Agrupacion = '';
var Rama = '';
var Sector = '';
var SubSector = '';
var Division = '';
var Grupo = '';
var ActividadEconomica = '';

var FechaActual = '';
var Linea = '';
var Disposicion = '';

var idClienteConsultado = '';
var idLineaConsultado = '';
var idDisposicionConsultado = '';
var idpaislogin = "";

$(function () {
    //    document.getElementById("Lineas").disabled = true;
    //    document.getElementById("hLinea").disabled = true;
    $("#hCliente").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
    $("#hLinea").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
    $("#hDisposicion").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
    $("#hCorte").attr("style", "cursor:auto;background: rgb(5, 128, 113);padding: 6px;text-align: center;font-size: 11px;font-weight: bold;");
    //    var nodes = document.getElementById("Lineas").getElementsByTagName('*');
    //    for (var i = 0; i < nodes.length; i++) {
    //        nodes[i].disabled = true;
    //}
    qs();


    //if (SicreNet.SiteMaster1.GetPaisSeleccionadoXUsuario().value.split('%%&&')[0] == '1') {
        //document.getElementById("BuscadorCliente").style.display = "";
        //document.getElementById("BuscadorClienteHonduras").style.display = "none";
      //  idpaislogin = "1";
    //};
   // if (SicreNet.SiteMaster1.GetPaisSeleccionadoXUsuario().value.split('%%&&')[0] == '4') {
        //document.getElementById("BuscadorCliente").style.display = "none";
        //document.getElementById("BuscadorClienteHonduras").style.display = "";
       // idpaislogin = "4";
   // };
    // alert($("#HPaisSelectUsuario").val(idPais));   
  //  obtienepais();
    

});

function obtienepais()
{
    peticionAjax("Default.aspx/obtienepais", "POST", null, function (data) {
        idpaislogin = data.d.toString();
        var rave;
        if (idpaislogin == "4") {
            var div = document.getElementById('cambiatiporfc');
            div.innerHTML = 'NDI';
        }
        else
        {
            var div = document.getElementById('cambiatiporfc');
            div.innerHTML = 'RFC';
        }
    }, null);

}

function cambiapais() {
    peticionAjax("Default.aspx/cambiadatos", "POST", null,null, null);
}

function GetFechaActual() {
    $("#lblMensajeHerramienta").hide();
    $("#accordion").show();
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/DevuelveFecha', "POST", null, function (data) {
        FechaActual = data.d.split("/")[0] + '/' + data.d.split("/")[1] + '/' + data.d.split("/")[2];
        $(".calendario").val(FechaActual);
        //        $("#FechaNacimientoCliente").val(FechaActual);
        //        $("#FechaNacimientoCliente").val(FechaActual);
        //        $("#FechaAltaLinea").val(FechaActual);
        //        $("#FechaInicioVigenciaLinea").val(FechaActual);
        //        $("#FechaFinVigenciaLinea").val(FechaActual);
        //        $("#FechaFormalizacionDisposicion").val(FechaActual);
        //        $("#FechadeInicio").val(FechaActual);
        //        $("#FechaVencimientoDisposicion").val(FechaActual);
        //        $("#FechaValuacionGarantiaDisposicion").val(FechaActual);
        //        $("#AnioMesDiaResumen").val(FechaActual);
        //        $("#FechaUltimaSitDeudaResumen").val(FechaActual);
        //        $("#FechaRecibAntiguoImpagadoResumen").val(FechaActual);
        //        $("#FechaUltimaAmortizacionCorte").val(FechaActual);
        //        $("#FechaProximaAmortizacionCorte").val(FechaActual);
        //        $("#FechaUltimaLiquidacionCorte").val(FechaActual);
        //        $("#FechaProximaLiquidacionCorte").val(FechaActual);
        $("#FechaAltaLinea").attr("disabled", false);
        $("#MontoAutorizadoLinea").attr("disabled", false);
        $("#IdClienteLinea").attr("disabled", true);
        $("#FechaFinVigenciaLinea").attr("disabled", false);
        $("#FechaInicioVigenciaLinea").attr("disabled", false);
        $("#NumeroLinea").attr("disabled", false);
        WidtDatePicker();
        LeerPermisos();
        obtienepais();
     
    }, null);
}

var qsParm = new Array();
function qs() {
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    for (var i = 0; i < parms.length; i++) {
        var pos = parms[i].indexOf('=');
        if (pos > 0) {
            var key = parms[i].substring(0, pos);
            var val = parms[i].substring(pos + 1);
            qsParm[key] = val;
        }
    }
}

var esLoad = true;
function LeerPermisos() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LeerPermisos', "POST", null, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d == 'true' && qsParm['P']) {
                $('#EditarClientesEncontrados').val('Editar');
                $('#EditarLinea').val('Editar');
                $('#BotonEditarDisposicion').val('Editar');
                $('#EditarResumen').val('Editar');

                $('#GuardarCliente').attr("disabled", false);
                $('#GuardarLinea').attr("disabled", false);
                $('#GuardarDisposicion').attr("disabled", false);
                $('#GuardarResumen').attr("disabled", false);
            }
            else {
                $('#EditarClientesEncontrados').val('Consultar');
                $('#EditarLinea').val('Consultar');
                $('#BotonEditarDisposicion').val('Consultar');
                $('#EditarResumen').val('Consultar');
                $('#GuardarCliente').hide();
                $('#GuardarLinea').hide();
                $('#GuardarDisposicion').hide();
                $('#GuardarResumen').hide();
                $('#NuevoBuscadorCliente').hide();
                $('#NuevoClientesEncontrados').hide();
                $('#NuevaLinea').hide();
                $('#BotonNuevaDisposicion').hide();
                $('#NuevoResumen').hide();
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        if (esLoad)
            cargaCatalogosInciales();
    }, null);
}

function LlenarPais() {
    peticionAjax('Default.aspx/LlenarPais', "POST", null, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('PaisCliente').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('PaisCliente').options[document.getElementById('PaisCliente').options.length] = opcion;
                        document.getElementById('PaisCliente').options[document.getElementById('PaisCliente').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarEstado(true);
    }, null);
}

function LlenarEstado(esChange) {
    if (Pais == null)
        Pais = '';
    if (Estado == null)
        Estado = '';
    if (Pais == "")
        Pais = $('#PaisCliente').val();
    if (esChange) Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarEstado', "POST", { Pais: Pais }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('EstadoCliente').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('EstadoCliente').options[document.getElementById('EstadoCliente').options.length] = opcion;
                        document.getElementById('EstadoCliente').options[document.getElementById('EstadoCliente').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                    $("#EstadoCliente").val(Estado);
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        Pais = "";
        LlenarRegion(esChange);
    }, null);
}

function LlenarRegion(esChange) {
    if (Estado == null)
        Estado = '';
    if (Region == null)
        Region = '';
    if (Estado == "")
        Estado = $('#EstadoCliente').val();
    if (esChange) Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarRegion', "POST", { Estado: Estado }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('RegionPaisCliente').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('RegionPaisCliente').options[document.getElementById('RegionPaisCliente').options.length] = opcion;
                        document.getElementById('RegionPaisCliente').options[document.getElementById('RegionPaisCliente').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                    $("#RegionPaisCliente").val(Region);
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        Estado = "";
        if (esLoad)
            LlenarAgrupacion();
        else if (esChange)
            Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function LlenaEstadoFVC() {
    if (EstadoFVC == null) {
        EstadoFVC = '';
    }
    peticionAjax('Default.aspx/LlenarEstadoFVC', "POST", null, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('ddlEstadoFVC').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('ddlEstadoFVC').options[document.getElementById('ddlEstadoFVC').options.length] = opcion;
                        document.getElementById('ddlEstadoFVC').options[document.getElementById('ddlEstadoFVC').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }

                if (EstadoFVC != "") {
                    $('#ddlEstadoFVC').val(EstadoFVC);
                }

                $('#ddlEstadoFVC').attr("disabled", true);
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }

    }, null);
}



function LlenarAgrupacion() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarAgrupacion', "POST", null, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('AgrupacionCliente').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('AgrupacionCliente').options[document.getElementById('AgrupacionCliente').options.length] = opcion;
                        document.getElementById('AgrupacionCliente').options[document.getElementById('AgrupacionCliente').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarRama();
    }, null);
}

function LlenarRama() {
    if (Agrupacion == "")
        Agrupacion = $('#AgrupacionCliente').val();
    else
        $('#AgrupacionCliente').val(Agrupacion);

    LimitarTamanioAcreditado();
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarRama', "POST", { Agrupacion: Agrupacion }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('RamaCliente').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('RamaCliente').options[document.getElementById('RamaCliente').options.length] = opcion;
                        document.getElementById('RamaCliente').options[document.getElementById('RamaCliente').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarSector();
    }, null);
}

function LimitarTamanioAcreditado() {
    if (!$('#NumeroEmpleadosCliente').val() == "") {
        var CTA = null;
        if ($('#AgrupacionCliente').val() == 'COMERCIO') {
            if ($('#NumeroEmpleadosCliente').val() <= 5)
                CTA = 1;
            if (parseInt($('#NumeroEmpleadosCliente').val()) > 5 && parseInt($('#NumeroEmpleadosCliente').val()) <= 20)
                CTA = 2;
            if (parseInt($('#NumeroEmpleadosCliente').val()) > 20 && parseInt($('#NumeroEmpleadosCliente').val()) <= 100)
                CTA = 3;
            if (parseInt($('#NumeroEmpleadosCliente').val()) > 100)
                CTA = 4;
        }

        if ($('#AgrupacionCliente').val() == 'INDUSTRIA') {
            if (parseInt($('#NumeroEmpleadosCliente').val()) <= 30)
                CTA = 1;
            if (parseInt($('#NumeroEmpleadosCliente').val()) > 30 && parseInt($('#NumeroEmpleadosCliente').val()) <= 100)
                CTA = 2;
            if (parseInt($('#NumeroEmpleadosCliente').val()) > 100 && parseInt($('#NumeroEmpleadosCliente').val()) <= 500)
                CTA = 3;
            if (parseInt($('#NumeroEmpleadosCliente').val()) > 500)
                CTA = 4;
        }

        if ($('#AgrupacionCliente').val() == 'SERVICIOS') {
            if (parseInt($('#NumeroEmpleadosCliente').val()) <= 20)
                CTA = 1;
            if (parseInt($('#NumeroEmpleadosCliente').val()) > 20 && parseInt($('#NumeroEmpleadosCliente').val()) <= 50)
                CTA = 2;
            if (parseInt($('#NumeroEmpleadosCliente').val()) > 50 && parseInt($('#NumeroEmpleadosCliente').val()) <= 100)
                CTA = 3;
            if (parseInt($('#NumeroEmpleadosCliente').val()) > 100)
                CTA = 4;
        }
        var Seleccionado = $('#TamanoAcreditadoCliente').val();
        document.getElementById('TamanoAcreditadoCliente').options.length = 0;

        for (var i = 0; i < nuevas.length; i++) {
            if (nuevas[i].value == 0 || nuevas[i].value == 5 || nuevas[i].value == CTA) {
                var opcion = new Option(nuevas[i].text, nuevas[i].value);
                try {
                    document.getElementById('TamanoAcreditadoCliente').options[document.getElementById('TamanoAcreditadoCliente').options.length] = opcion;
                    document.getElementById('TamanoAcreditadoCliente').options[document.getElementById('TamanoAcreditadoCliente').options.length - 1].title = nuevas[i].text;
                }
                catch (e) {
                    MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                }
            }
        }

        $('#TamanoAcreditadoCliente').val(Seleccionado);
    }
}

function LlenarSector() {
    if (Rama == "")
        Rama = $('#RamaCliente').val();
    else
        $('#RamaCliente').val(Rama);
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarSector', "POST", { Rama: Rama }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('SectorCliente').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('SectorCliente').options[document.getElementById('SectorCliente').options.length] = opcion;
                        document.getElementById('SectorCliente').options[document.getElementById('SectorCliente').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarSubSector();
    }, null);
}

function LlenarSubSector() {
    if (Sector == "")
        Sector = $('#SectorCliente').val();
    else
        $('#SectorCliente').val(Sector);
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarSubSector', "POST", { Sector: Sector }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('SubSectorCliente').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('SubSectorCliente').options[document.getElementById('SubSectorCliente').options.length] = opcion;
                        document.getElementById('SubSectorCliente').options[document.getElementById('SubSectorCliente').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarDivision();
    }, null);
}


function LlenarDivision() {
    if (SubSector == "")
        SubSector = $('#SubSectorCliente').val();
    else
        $('#SubSectorCliente').val(SubSector);
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarDivision', "POST", { SubSector: SubSector }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('DivisionCliente').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('DivisionCliente').options[document.getElementById('DivisionCliente').options.length] = opcion;
                        document.getElementById('DivisionCliente').options[document.getElementById('DivisionCliente').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarGrupo();
    }, null);
}

function LlenarGrupo() {
    if (Division == "")
        Division = $('#DivisionCliente').val();
    else
        $('#DivisionCliente').val(Division);
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarGrupo', "POST", { Division: Division }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('GrupoCliente').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('GrupoCliente').options[document.getElementById('GrupoCliente').options.length] = opcion;
                        document.getElementById('GrupoCliente').options[document.getElementById('GrupoCliente').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarActividadEconomica();
    }, null);
}

function LlenarActividadEconomica() {
    if (Grupo == "")
        Grupo = $('#GrupoCliente').val();
    else
        $('#GrupoCliente').val(Grupo);
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarActividadEconomica', "POST", { Grupo: Grupo }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('ActividadEconomicaCliente').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('ActividadEconomicaCliente').options[document.getElementById('ActividadEconomicaCliente').options.length] = opcion;
                        document.getElementById('ActividadEconomicaCliente').options[document.getElementById('ActividadEconomicaCliente').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
            if (!ActividadEconomica == "")
                $('#ActividadEconomicaCliente').val(ActividadEconomica);

            Agrupacion = '';
            Rama = '';
            Sector = '';
            SubSector = '';
            Division = '';
            Grupo = '';
            ActividadEconomica = '';
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        if (esLoad)
            LlenarSistema();
        else
            Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function LlenarSistema() {
    peticionAjax('Default.aspx/LlenarSistema', "POST", null, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('SistemaDisposicion').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('SistemaDisposicion').options[document.getElementById('SistemaDisposicion').options.length] = opcion;
                        document.getElementById('SistemaDisposicion').options[document.getElementById('SistemaDisposicion').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarProducto();
    }, null);
}


function LlenarProducto(esChange) {
    if (Sistema == "")
        Sistema = $('#SistemaDisposicion').val();
    else
        $('#SistemaDisposicion').val(Sistema);
    if (esChange) Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarProducto', "POST", { Sistema: Sistema }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('ProductoDisposicion').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('ProductoDisposicion').options[document.getElementById('ProductoDisposicion').options.length] = opcion;
                        document.getElementById('ProductoDisposicion').options[document.getElementById('ProductoDisposicion').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarSubProducto();
    }, null);
}

function LlenarSubProducto(esChange) {
    if (Sistema == "")
        Sistema = $('#SistemaDisposicion').val();
    else
        $('#SistemaDisposicion').val(Sistema);

    if (Producto == "")
        Producto = $('#ProductoDisposicion').val();
    else
        $('#ProductoDisposicion').val(Producto);
    if (esChange) Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarSubProducto', "POST", { Sistema: Sistema, Producto: Producto }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('SubProductoDisposicion').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('SubProductoDisposicion').options[document.getElementById('SubProductoDisposicion').options.length] = opcion;
                        document.getElementById('SubProductoDisposicion').options[document.getElementById('SubProductoDisposicion').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarDescripcion();
    }, null);
}

function LlenarDescripcion(esChange) {
    if (Sistema == "")
        Sistema = $('#SistemaDisposicion').val();
    else
        $('#SistemaDisposicion').val(Sistema);

    if (Producto == "")
        Producto = $('#ProductoDisposicion').val();
    else
        $('#ProductoDisposicion').val(Producto);

    if (SubProducto == "")
        SubProducto = $('#SubProductoDisposicion').val();
    else
        $('#SubProductoDisposicion').val(SubProducto);
    if (esChange) Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarDescripcion', "POST", { Sistema: Sistema, Producto: Producto, SubProducto: SubProducto }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('DescripcionDisposicion').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('DescripcionDisposicion').options[document.getElementById('DescripcionDisposicion').options.length] = opcion;
                        document.getElementById('DescripcionDisposicion').options[document.getElementById('DescripcionDisposicion').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarDescripcion2();
    }, null);
}

function LlenarDescripcion2(esChange) {
    if (Sistema == "")
        Sistema = $('#SistemaDisposicion').val();
    else
        $('#SistemaDisposicion').val(Sistema);

    if (Producto == "")
        Producto = $('#ProductoDisposicion').val();
    else
        $('#ProductoDisposicion').val(Producto);

    if (SubProducto == "")
        SubProducto = $('#SubProductoDisposicion').val();
    else
        $('#SubProductoDisposicion').val(SubProducto);

    if (Descripcion == "")
        Descripcion = $('#DescripcionDisposicion').val();
    else
        $('#DescripcionDisposicion').val(Descripcion);
    if (esChange) Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarDescripcion2', "POST", { Sistema: Sistema, Producto: Producto, SubProducto: SubProducto, Descripcion: Descripcion }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('Descripcion2Disposicion').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('Descripcion2Disposicion').options[document.getElementById('Descripcion2Disposicion').options.length] = opcion;
                        document.getElementById('Descripcion2Disposicion').options[document.getElementById('Descripcion2Disposicion').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarClave();
    }, null);
}

function LlenarClave(esChange) {
    if (Sistema == "")
        Sistema = $('#SistemaDisposicion').val();
    else
        $('#SistemaDisposicion').val(Sistema);

    if (Producto == "")
        Producto = $('#ProductoDisposicion').val();
    else
        $('#ProductoDisposicion').val(Producto);

    if (SubProducto == "")
        SubProducto = $('#SubProductoDisposicion').val();
    else
        $('#SubProductoDisposicion').val(SubProducto);

    if (Descripcion == "")
        Descripcion = $('#DescripcionDisposicion').val();
    else
        $('#DescripcionDisposicion').val(Descripcion);

    if (Descripcion2 == "")
        Descripcion2 = $('#Descripcion2Disposicion').val();
    else
        $('#Descripcion2Disposicion').val(Descripcion2);
    if (esChange) Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarClave', "POST", { Sistema: Sistema, Producto: Producto, SubProducto: SubProducto, Descripcion: Descripcion, Descripcion2: Descripcion2 }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById('ClaveDisposicion').options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion = new Option(Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById('ClaveDisposicion').options[document.getElementById('ClaveDisposicion').options.length] = opcion;
                        document.getElementById('ClaveDisposicion').options[document.getElementById('ClaveDisposicion').options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        LlenarDUN();
    }, null);
}

function LlenarDUN() {
    if (Sistema == "")
        Sistema = $('#SistemaDisposicion').val();
    else
        $('#SistemaDisposicion').val(Sistema);

    if (Clave == "")
        Clave = $('#ClaveDisposicion').val();
    else
        $('#ClaveDisposicion').val(Clave);

    peticionAjax('Default.aspx/LlenarDUN', "POST", { Sistema: Sistema, Clave: Clave }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Item = obtenerArregloDeJSON(data.d, false);
                $('#TipoCreditoDisposicion').val(Item[0].TipoCredito);
                $('#ClasificacionContableDisposicion').val(Item[0].ClasificacionContable);
                $('#CategoriaCreditoDisposicion').val(Item[0].CategoriaCredito);
                $('#FuenteFondeoDisposicion').val(Item[0].FuenteFondeo);
                $('#PorcentajeGarantiaFondosDisposicion').val(Item[0].PorcentajeGarantizado);
                $('#CarteraRevolventeDisposicion').val(Item[0].CarteraRevolvente);

                Sistema = '';
                Producto = '';
                SubProducto = '';
                Descripcion = '';
                Descripcion2 = '';
                Clave = '';
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        if (esLoad) {
            ArregloItemsLlenarCombo = new Array();
            indexItemsLlenarCombo = 0;
            ArregloItemsLlenarCombo.push("PersonalidadJuridicaCliente,tblPersonalidadesJuridicas,0,1,1,1");
            ArregloItemsLlenarCombo.push("GrupoEconomicoCliente,tblBaseHomGrupoEconomico,0,1,1,1");
            ArregloItemsLlenarCombo.push("TipoAcreditadoRelacionadoCliente,tblBaseHomRelClasCliente,0,1,0,1");
            ArregloItemsLlenarCombo.push("TamanoAcreditadoCliente,tblR04CatalogoTamanoAcreditado,1,2,2,1");
            ArregloItemsLlenarCombo.push("SectorEcoAcredCliente,tblBaseHomSectorEconomicoAcreditado,0,1,1,1");
            ArregloItemsLlenarCombo.push("DestinoCreditoLinea,tblBaseHomDestinoCredito,0,1,1,1");
            ArregloItemsLlenarCombo.push("DispCreditoLinea,tblBaseHomDispocisionCredito,0,1,1,1");
            ArregloItemsLlenarCombo.push("MonedaDisposicion,tblBaseHomTipoMoneda,0,1,1,1");
            ArregloItemsLlenarCombo.push("FormaAmortizacionDisposicion,tblBaseHomFormaAmortizacion,1,1,1,1");
            ArregloItemsLlenarCombo.push("PeriodicidadCapitalDisposicion,tblBaseHomPeriodicidadCapital,0,1,1,2");
            ArregloItemsLlenarCombo.push("PeriodicidadInteresDisposicon,tblBaseHomPeriodicidadInteres,0,1,1,2");
            ArregloItemsLlenarCombo.push("FrecuenciaRevisionTasaDisposicion,tblBaseHomFrecuenciaRevTasa,0,1,1,2");
            ArregloItemsLlenarCombo.push("TipoGarantiaDisposicion,tblR04CatalogoGarantias,1,2,2,1");
            ArregloItemsLlenarCombo.push("DestinoCreditoDisposicion,tblBaseHomDestinoInversion,0,1,1,1");
            ArregloItemsLlenarCombo.push("TipoFacturacionDisposicion,tblBaseHomTipoFacturacion,0,1,1,1");
            ArregloItemsLlenarCombo.push("GarantiaDisposicion,tblBaseHomTipoGarantia,0,1,1,1");
            ArregloItemsLlenarCombo.push("IndicadorFondeoDisposicion,tblBaseHomIndicadorFondeo,0,1,1,1");
            ArregloItemsLlenarCombo.push("tipoAltaDisposicion,tblBaseHomTipoAlta,0,1,1,1");
            ArregloItemsLlenarCombo.push("tipoBajaDisposicion,tblBaseHomTipoBaja,0,1,1,1");
            ArregloItemsLlenarCombo.push("TasaReferenciaResumen,tblBaseHomClausulaRevTasa,0,2,2,1");
            ArregloItemsLlenarCombo.push("SituacionCreditoResumen,tblBaseHomSituacionesCredito,0,1,1,1");
            ArregloItemsLlenarCombo.push("sltEstatusCredResAlnova,tblbasehomstatuscredito,0,1,0,1");

            LlenarCombo(ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[0], ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[1], ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[2], ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[3], ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[4], ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[5]);
        }
        else
            Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

var ArregloItemsLlenarCombo = new Array(); var indexItemsLlenarCombo = 0;
function LlenarCombo(Combo, Tabla, Clave, Descripcion, Orden, opcionCombo) {
    peticionAjax('Default.aspx/LlenarCombo', "POST", { Catalogo: Tabla, Clave: Clave, Descripcion: Descripcion, Orden: Orden }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Items = obtenerArregloDeJSON(data.d, false);
                document.getElementById(Combo).options.length = 0;

                for (var i = 0; i < Items.length; i++) {
                    var Item = Items[i];
                    var opcion;
                    opcion = opcionCombo == 1 ? new Option(Item.Descripcion, Item.Clave) : new Option(Item.Clave + ' ' + Item.Descripcion, Item.Clave);
                    try {
                        document.getElementById(Combo).options[document.getElementById(Combo).options.length] = opcion;
                        document.getElementById(Combo).options[document.getElementById(Combo).options.length - 1].title = Item.Descripcion;
                    }
                    catch (e) {
                        MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }

                if (Combo == 'TamanoAcreditadoCliente') {
                    var x = 0;
                    var elementos = document.getElementById('TamanoAcreditadoCliente').options;

                    for (var i = 0; i < elementos.length; i++) {
                        nuevas[x] = new Option();
                        nuevas[x].text = elementos[i].text;
                        nuevas[x].value = elementos[i].value;
                        x++;
                    }
                }
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
        indexItemsLlenarCombo++;
        if (indexItemsLlenarCombo < ArregloItemsLlenarCombo.length)
            LlenarCombo(ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[0], ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[1], ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[2], ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[3], ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[4], ArregloItemsLlenarCombo[indexItemsLlenarCombo].split(',')[5]);
        else {
            Waiting(false, "Espere por favor. Cargando Información...");
            esLoad = false;
        }
    }, null);
}

//////----------------------------------------------------------- EVENTOS-----------------------------------------------------

function KeyPressTXTCliente(evt) {
    if (evt.keyCode == 13) {
        //evt.keyCode = 0;
        BuscarCliente(true);
    }
}

function KeyDownAE(evt) {
    if (evt.keyCode == 13) {
        //evt.keyCode = 0;
        BuscarAE();
    }
}

//-------------------------------------------------------------------------------- FUNCIONES BTN BUSCAR
/////////////////////////////////////////////////BUSCAR X NOMBRE CLIENTE, RFC, IDCte ///////////////////
var valorFiltroBusqueda = "";
function BuscarCliente(esEventoBtn) {

    if ($('#FiltroBuscarCliente').val() != "") {
        Waiting(true, "Espere por favor. Cargando Información...");
        $('#ErrorBuscadorCliente').html("");
        var indexBuscarPor = "";
        for (indexBuscarPor = 0; indexBuscarPor < document.forms[0]["BuscarPor"].length; indexBuscarPor++) {
            if (document.forms[0]["BuscarPor"][indexBuscarPor].checked)
                break;
        }
        valorFiltroBusqueda = esEventoBtn == true ? $('#FiltroBuscarCliente').val() : valorFiltroBusqueda;

        if (document.forms[0]["BuscarPor"][indexBuscarPor].value == "Disposicion")
            BuscarPorDisposicion();
        else if (document.forms[0]["BuscarPor"][indexBuscarPor].value == "Linea")
            BuscarPorLinea();
        else {
            peticionAjax('Default.aspx/BuscarClientes', "POST", { filtrarPor: document.forms[0]["BuscarPor"][indexBuscarPor].value, valor: $('#FiltroBuscarCliente').val() }, function (data) {
                if (!data.d.startsWith('ERRORCATCH:')) {
                    if (data.d != "") {
                        var JSONClientes;
                        $('#TablaClientesEncontradosAlnova').html("");
                        $('#TablaClientesEncontradosSIC').html("");
                        $("#fieldClientesEncontradosSIC").hide();
                        $("#fieldClientesEncontradosAlnova").hide();
                        $("#divTblSaveClienteEncontrado").html("");

                        var numClientesReturnSIC = 0;
                        var numClientesReturnAlnova = 0;
                        var numCartClientesReturnAlnova = 0;
                        if (data.d.split("%%&&")[1] != "") {
                            JSONClientes = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                            numClientesReturnAlnova += JSONClientes.length;
                            $("#fieldClientesEncontradosAlnova").show();
                            var valorCarteraAnterior = "";
                            var cadenaHTML = "";
                            for (var i = 0; i < JSONClientes.length; i++) {
                                if (valorCarteraAnterior = "" || valorCarteraAnterior != JSONClientes[i].FVCCartera) {
                                    cadenaHTML += '<fieldset id="tblDatosClienteAlnova_' + JSONClientes[i].FVCCartera + '" style="border: 1px solid Gray; padding: 10px;">';
                                    cadenaHTML += '<legend style="font-weight:bold;text-align:left;"> ' + JSONClientes[i].FVCCartera + '</legend>';
                                    cadenaHTML += creaTablaRegDeBusqueda(JSONClientes, "ClientesEncontradosIDS", "Cliente", "ID", JSONClientes[i].FVCCartera);
                                    cadenaHTML += '</fieldset>';
                                    numCartClientesReturnAlnova++;
                                }
                                valorCarteraAnterior = JSONClientes[i].FVCCartera;
                            }
                            //$('#TablaClientesEncontradosAlnova').html(creaTablaRegDeBusqueda(JSONClientes, "ClientesEncontradosIDS", "Cliente", "ID"));
                            $("#TablaClientesEncontradosAlnova").html(cadenaHTML);
                            CambiarDiv('ClientesEncotrados', 'BuscadorCliente', false, true);
                        }
                        if (data.d.split("%%&&")[0] != "") {
                            $("#fieldClientesEncontradosSIC").show();
                            JSONClientes = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                            numClientesReturnSIC += JSONClientes.length;
                            $('#TablaClientesEncontradosSIC').html(creaTablaRegDeBusqueda(JSONClientes, "ClientesSICEncontradosIDS", "Cliente", "ID"));
                            $("#fieldClientesEncontradosSIC").show();
                            CambiarDiv('ClientesEncotrados', 'BuscadorCliente', false, true);
                        }
                        document.getElementById('TablaClientesEncontrados').scrollTop = 0;
                        if ((numClientesReturnSIC + numClientesReturnAlnova) == 1) {
                            document.getElementById("ClientesEncotrados").style.height = "auto";
                            document.getElementById("TablaClientesEncontrados").style.height = "auto";
                        }
                        else {
                            var valorH = (document.documentElement.clientHeight - document.getElementById("divHeader").offsetHeight);

                            var tipoBusqueda = document.forms[0]["BuscarPor"][indexBuscarPor].value;
                            if (tipoBusqueda == "RFC" || tipoBusqueda == "Nombre") {
                                valorH = valorH - 180;
                                var heightAprox = ((numClientesReturnSIC * 40) + (numClientesReturnAlnova * 40)) +
                                 (numClientesReturnSIC > 0 ? 20 : 0) +
                                 (numClientesReturnAlnova > 0 ? 20 : 0) +
                                 (numCartClientesReturnAlnova * 20);
                                if (heightAprox <= valorH)
                                    valorH = heightAprox;
                            }
                            else
                                valorH = (valorH - 50) / 4;
                            document.getElementById("ClientesEncotrados").style.height = valorH + "px";
                            document.getElementById("TablaClientesEncontrados").style.height = valorH + "px";

                        }

                        seleccionaFiltroBuscado("ClientesEncontradosIDS");
                        seleccionaFiltroBuscado("ClientesSICEncontradosIDS");
                        $(".tablesorter").tablesorter();

                        if (data.d.split("%%&&")[0] == "" && data.d.split("%%&&")[1] == "")
                            $('#ErrorBuscadorCliente').html('No hay resultados que mostrar, verifique sus criterios de busqueda.');
                        if (Linea != '')
                            BuscarLineas();
                    }
                    else
                        $('#ErrorBuscadorCliente').html('No hay resultados que mostrar, verifique sus criterios de busqueda.');
                }
                else {
                    $('#ErrorBuscadorCliente').html('No hay resultados que mostrar, verifique sus criterios de busqueda.');
                }
                if (Linea == '')
                    Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
        }

    } else {
        $('#ErrorBuscadorCliente').html('Debe escribir un filtro para la busqueda.');
        Waiting(false, "Espere por favor. Cargando Información...");
    }
}

function creaTablaRegDeBusqueda(listaDeJSON, idtabla, segmento, campoID, cartera) {
    var cad = '<table id="' + idtabla + '"  style="width: 100%;" class="tablesorter">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    if (idpaislogin == '4') {
        for (var encabezados in auxJSON) {
            if (encabezados != "FVCCartera") {
                if (encabezados == "Apellido Paterno" || encabezados == "Apellido Materno")
                {
                }
                else
                {
                    cad += '<th style="text-align: center;">';
                    cad += encabezados.toString();
                    cad += '</th>';
                }
            }
        }
    }
    else
    {
        for (var encabezados in auxJSON) {
            if (encabezados != "FVCCartera") {
                cad += '<th style="text-align: center;">';
                cad += encabezados.toString();
                cad += '</th>';
            }
        }
    }

    cad += '<th></th></tr>';
    cad += '</thead>';
    cad += '<tbody>';

    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var json = listaDeJSON[filas];
        if (cartera == "" || cartera == undefined || listaDeJSON[filas].FVCCartera == cartera) {
            cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
            for (var element in json) {
                if (element != "FVCCartera") {
                    if (idpaislogin == '4') {
                        if (element != "Apellido Paterno") {
                            if (element != "Apellido Materno") {
                                cad += '<td style="text-align:left;' + (idtabla == "ClientesSICEncontradosIDS" && (element == "Apellido Paterno" || element == "Apellido Materno") ? "background: rgba(128, 128, 128, 0.66);" : "") + '">';
                                cad += json[element];
                                cad += '</td>';
                            }
                        }
                    }
                    else
                    {
                        cad += '<td style="text-align:left;' + (idtabla == "ClientesSICEncontradosIDS" && (element == "Apellido Paterno" || element == "Apellido Materno") ? "background: rgba(128, 128, 128, 0.66);" : "") + '">';
                        cad += json[element];
                        cad += '</td>';
                    }
               }
            }
            cad += '<td style="text-align:center;"><input id="RadioEditar' + segmento + '" name="Editar' + segmento + '" type="radio" ' + ((filas == 0 || Linea == listaDeJSON[filas][campoID]) ? 'checked="checked"' : '') + '  value="' + listaDeJSON[filas][campoID] + '" /></td>';
            cad += '</tr>';
        }
    }
    cad += '</tbody>';
    cad += '</table>';
    return cad;
}
///////////////////////////////////////////////// POR DISPOSICION///////////////////

function BuscarPorDisposicion() {
    peticionAjax('Default.aspx/BuscarPorDisposicion', "POST", { Disposicion: $('#FiltroBuscarCliente').val() }, function (data) {
        if (!data.d.startsWith('ErrorCATCH:')) {
            if (data.d != "") {
                Item = obtenerArregloDeJSON(data.d, false);
                $('#FiltroBuscarCliente').val(Item[0].Cliente);
                document.forms[0]["BuscarPor"][4].checked = true;
                Linea = Item[0].Linea;
                Disposicion = Item[0].Disposicion;
                BuscarCliente(false);
            }
            else {
                $('#ErrorBuscadorCliente').html('No hay resultados que mostrar, verifique sus criterios de busqueda.');
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        }
        else {
            $('#ErrorBuscadorCliente').html("No hay resultados que mostrar, verifique sus criterios de busqueda.");
            //MostrarMsj("El filtro no devolvio resultados.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    }, null);
}

///////////////////////////////////////////////// POR LINEA///////////////////

function BuscarPorLinea() {
    peticionAjax('Default.aspx/BuscarPorLinea', "POST", { linea: $('#FiltroBuscarCliente').val() }, function (data) {
        if (!data.d.startsWith('ErrorCATCH:')) {
            if (data.d != "") {
                Item = obtenerArregloDeJSON(data.d, false);
                $('#FiltroBuscarCliente').val(Item[0].Cliente);
                document.forms[0]["BuscarPor"][4].checked = true;
                Linea = Item[0].Linea;
                BuscarCliente(false);
            }
            else {
                $('#ErrorBuscadorCliente').html('No hay resultados que mostrar, verifique sus criterios de busqueda.');
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        }
        else {
            $('#ErrorBuscadorCliente').html("No hay resultados que mostrar, verifique sus criterios de busqueda.");
            //MostrarMsj("El filtro no devolvio resultados.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    }, null);
}

/////////////////////////////////////////////////////////////// BUSCAR BTN LINEAS
function BuscarLineas() {
    if (!$('#DivClientes').is(":disabled")) {
        Waiting(true, "Espere por favor. Cargando Información...");
        CambiarDiv('LineasEncontradas', 'ClientesEncotrados', false, false);
        var irec = 0;
        for (irec = 0; irec < document.forms[0]["EditarCliente"].length; irec++) {
            if (document.forms[0]["EditarCliente"][irec].checked)
                break;
        }
        $(DatosLinea).hide();
        var idClienteBus = (document.forms[0]["EditarCliente"].length != undefined ? document.forms[0]["EditarCliente"][irec].value : document.forms[0]["EditarCliente"].value);
        peticionAjax('Default.aspx/BuscarLineas', "POST", { opcion: "1", idCliente: idClienteBus }, function (data) {
            if (!data.d.startsWith('Error:')) {
                // data.d = data.d + "%%&&" + data.d;
                if (data.d != "") {
                    idClienteConsultado = idClienteBus;

                    var JSONLineas;
                    $('#TablaLineasEncontradasSIC').html("");
                    $('#TablaLineasEncontradosAlnova').html("");
                    $("#fieldLineasEncontradasSIC").hide();
                    $("#fieldLineasEncontradasAlnova").hide();
                    $("#divTblSaveLineaEncontrada").html("");

                    var numLineasReturn = 0;
                    if (data.d.split("%%&&")[1] != "" && data.d.split("%%&&")[1] != undefined) {
                        $("#fieldLineasEncontradasAlnova").show();
                        JSONLineas = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                        numLineasReturn += JSONLineas.length;
                        $('#TablaLineasEncontradosAlnova').html(creaTablaRegDeBusqueda(JSONLineas, "LineasEncontradasNLS", "LineaX", "NumeroLinea"));
                        document.getElementById("LineasEncontradasNLS").style.width = "100%";
                    }

                    if (data.d.split("%%&&")[0] != "" && data.d.split("%%&&")[0] != undefined) {
                        $("#fieldLineasEncontradasSIC").show();
                        JSONLineas = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        numLineasReturn += JSONLineas.length;
                        $('#TablaLineasEncontradasSIC').html(creaTablaRegDeBusqueda(JSONLineas, "LineasEncontradasNLSSIC", "LineaX", "Numero de Línea"));
                    }

                    document.getElementById('TablaLineasEncontradas').scrollTop = 0;
                    if (numLineasReturn == 1) {
                        document.getElementById("LineasEncontradas").style.height = "auto";
                        document.getElementById("TablaLineasEncontradas").style.height = "auto";
                    }
                    else {
                        var valorH = (document.documentElement.clientHeight - document.getElementById("divHeader").offsetHeight);
                        valorH = (valorH - 50) / 4;
                        document.getElementById("LineasEncontradas").style.height = valorH + "px";
                        document.getElementById("TablaLineasEncontradas").style.height = valorH + "px";
                    }

                    seleccionaFiltroBuscado("LineasEncontradasNLS");
                    seleccionaFiltroBuscado("LineasEncontradasNLSSIC");
                    $("#LineasEncontradasNLS").tablesorter();
                    $("#LineasEncontradasNLSSIC").tablesorter();
                    if (data.d.split("%%&&")[0] == "" && data.d.split("%%&&")[1] == "") {
                        $("#fieldLineasEncontradasSIC").hide();
                        $("#fieldLineasEncontradasAlnova").hide();
                        $('#divTblSaveLineaEncontrada').html('No hay lineas para el cliente seleccionado.');
                        $('#EditarLinea').attr("disabled", true);
                        $('#EditarLinea').attr("class", "classButtonDis");
                        $('#VerDisposiciones').attr("disabled", true);
                        $('#VerDisposiciones').attr("class", "classButtonDis");
                        Waiting(false, "Espere por favor. Cargando Información...");
                    }
                    Linea = '';
                    if (Disposicion != '')
                        BuscarDisposiciones();
                }
                else {
                    idClienteConsultado = '';
                    $("#fieldLineasEncontradasSIC").hide();
                    $("#fieldLineasEncontradasAlnova").hide();
                    $(divTblSaveLineaEncontrada).html('No hay lineas para el cliente seleccionado.');
                    $('#EditarLinea').attr("disabled", true);
                    $('#EditarLinea').attr("class", "classButtonDis");
                    $('#VerDisposiciones').attr("disabled", true);
                    $('#VerDisposiciones').attr("class", "classButtonDis");
                }
                $("#LineasEncontradas").show();
                $('#DivCabeceraLineas').attr("disabled", false);

                var objClientesEncontrados = document.getElementById('ClientesEncontradosIDS');
                objClientesEncontrados = objClientesEncontrados == null ? document.getElementById('ClientesSICEncontradosIDS') : objClientesEncontrados;
                for (var Renglon = 0; Renglon < objClientesEncontrados.rows.length; Renglon++) {
                    if (Renglon > 0) {
                        if (objClientesEncontrados.rows[Renglon].cells[0].innerText != idClienteBus)
                            $(document.getElementById('Cliente' + objClientesEncontrados.rows[Renglon].cells[0].innerText)).hide();
                    }
                }
            }
            else
                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);

            if (Disposicion == '')
                Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}


function seleccionaFiltroBuscado(idTabla) {
    $('#' + idTabla + ' >tbody >tr').each(function () {
        var objChecked = $(this).find('input:radio')[0];
        if ($(objChecked).val() == valorFiltroBusqueda) {
            $(objChecked).attr('checked', true);
            valorFiltroBusqueda = "";
        }
    });
}
///////////////////////////////////////////////////// BUSCAR BTN DISPOSICIONES
function BuscarDisposiciones() {
    if (document.forms[0]["EditarLineaX"] == undefined)
        return;
    if (!$('#Lineas').is(":disabled")) {
        $('#BotonEditarDisposicion').attr("disabled", false);
        $('#BotonVerResumenes').attr("disabled", false);
        $('#Lineas').attr("disabled", true);
        CambiarDiv('DivDisposicionesEncontradas', 'LineasEncontradas', false, false);
        var irel = 0;
        for (irel = 0; irel < document.forms[0]["EditarLineaX"].length; irel++) {
            if (document.forms[0]["EditarLineaX"][irel].checked)
                break;
        }
        $(DivDatosDisposicion).hide();
        Waiting(true, "Espere por favor. Cargando Información...");
        var idLineaBus = (document.forms[0]["EditarLineaX"].length != undefined ? document.forms[0]["EditarLineaX"][irel].value : document.forms[0]["EditarLineaX"].value);
        peticionAjax('Default.aspx/BuscarDisposiciones', "POST", { opcion: "1", linea: idLineaBus }, function (data) {
            if (!data.d.startsWith('Error:')) {
                //data.d = "%%&&" + data.d;
                if (data.d != "") {
                    idLineaConsultado = idLineaBus;
                    var JSONDisposicion;
                    $('#TablaDisposicionesEncontradasSIC').html("");
                    $('#TablaDisposicionesEncontradasAlnova').html("");
                    $("#fieldDisposicionesEncontradasSIC").hide();
                    $("#fieldDisposicionesEncontradasAlnova").hide();
                    $("#divTblSaveDisposicionEncontrada").html("");

                    var numDisposicionesReturn = 0;
                    if (data.d.split("%%&&")[1] != "" && data.d.split("%%&&")[1] != undefined) {
                        $("#fieldDisposicionesEncontradasAlnova").show();
                        JSONDisposicion = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                        numDisposicionesReturn += JSONDisposicion.length;
                        $('#TablaDisposicionesEncontradasAlnova').html(creaTablaRegDeBusqueda(JSONDisposicion, "DisposicionesEncontradasNDS", "DisposicionX", "NumeroDisposicion"));
                        document.getElementById("DisposicionesEncontradasNDS").style.width = "100%";
                    }
                    if (data.d.split("%%&&")[0] != "" && data.d.split("%%&&")[0] != undefined) {
                        $("#fieldDisposicionesEncontradasSIC").show();
                        JSONDisposicion = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        numDisposicionesReturn += JSONDisposicion.length;
                        $('#TablaDisposicionesEncontradasSIC').html(creaTablaRegDeBusqueda(JSONDisposicion, "DisposicionesEncontradasNDSSIC", "DisposicionX", "NumeroDisposicion"));
                    }

                    if (data.d.split("%%&&")[0] == "" && data.d.split("%%&&")[1] == "") {
                        $("#fieldDisposicionesEncontradasSIC").hide();
                        $("#fieldDisposicionesEncontradasAlnova").hide();
                        $('#divTblSaveDisposicionEncontrada').html('No hay disposiciones para la linea seleccionada.');
                        $('#BotonEditarDisposicion').attr("disabled", true);
                        $('#BotonEditarDisposicion').attr("class", "classButtonDis");
                        $('#BotonVerResumenes').attr("disabled", true);
                        $('#BotonVerResumenes').attr("class", "classButtonDis");
                        Waiting(false, "Espere por favor. Cargando Información...");
                    }

                    document.getElementById('TablaDisposicionesEncontradas').scrollTop = 0;
                    if (numDisposicionesReturn == 1) {
                        document.getElementById("DivDisposicionesEncontradas").style.height = "auto";
                        document.getElementById("TablaDisposicionesEncontradas").style.height = "auto";
                    }
                    else {
                        var valorH = (document.documentElement.clientHeight - document.getElementById("divHeader").offsetHeight);
                        valorH = (valorH - 50) / 4;
                        document.getElementById("DivDisposicionesEncontradas").style.height = valorH + "px";
                        document.getElementById("TablaDisposicionesEncontradas").style.height = valorH + "px";
                    }

                    seleccionaFiltroBuscado("DisposicionesEncontradasNDS");
                    seleccionaFiltroBuscado("DisposicionesEncontradasNDSSIC");
                    $("#DisposicionesEncontradasNDS").tablesorter();
                    $("#DisposicionesEncontradasNDSSIC").tablesorter();
                    Linea = '';
                    Disposicion = '';
                }
                else {
                    idLineaConsultado = '';
                    $("#fieldDisposicionesEncontradasSIC").hide();
                    $("#fieldDisposicionesEncontradasAlnova").hide();
                    $(divTblSaveDisposicionEncontrada).html('No hay disposiciones para la linea seleccionada.');
                    $('#BotonEditarDisposicion').attr("disabled", true);
                    $('#BotonEditarDisposicion').attr("class", "classButtonDis");
                    $('#BotonVerResumenes').attr("disabled", true);
                    $('#BotonVerResumenes').attr("class", "classButtonDis");
                }
                $('#DivCabeceraDisposiciones').attr("disabled", false);

                var objLineasEncontradas = document.getElementById('LineasEncontradasNLS');
                objLineasEncontradas = objLineasEncontradas == null ? document.getElementById('LineasEncontradasNLSSIC') : objLineasEncontradas;

                for (var Renglon = 0; Renglon < objLineasEncontradas.rows.length; Renglon++) {
                    if (Renglon > 0) {
                        if (objLineasEncontradas.rows[Renglon].cells[0].innerText != idLineaBus)
                            $(document.getElementById('Linea' + objLineasEncontradas.rows[Renglon].cells[0].innerText)).hide();
                    }
                }
            }
            else {
                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            }
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}


var arregloRowsCortesResumen = new Array();
function BucaResumenNuevo() {
    $('#msgRpt').html('');
    arregloRowsCortesResumen = new Array();
    if (document.forms[0]["EditarDisposicionX"] == undefined) return;
    Waiting(true, "Espere por favor. Cargando Información...");
    $('#EditarResumen').attr("disabled", false);
    $('#DivDisposiciones').attr("disabled", true);

    var ired = 0;
    for (ired = 0; ired < document.forms[0]["EditarDisposicionX"].length; ired++) {
        if (document.forms[0]["EditarDisposicionX"][ired].checked)
            break;
    }
    $(DivDatosResumen).hide();
    var idDisposicionBus = (document.forms[0]["EditarDisposicionX"].length != undefined ? document.forms[0]["EditarDisposicionX"][ired].value : document.forms[0]["EditarDisposicionX"].value);
    peticionAjax('Default.aspx/BuscarResumenes2', "POST", { Disposicion: idDisposicionBus, Op: $('#rangoFechas').val() }, function (data) {
        Waiting(false, "Espere por favor. Cargando Información..."); // Checar XQ CATCH
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                idDisposicionConsultado = idDisposicionBus;

                arregloRowsCortesResumen = new Array();
                Registros = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                LlenaArregloDatosTabla(Registros);
                $('#tblResumenesEncontrados').html('');
                initTable("tblResumenesEncontrados");
                $('#tblResumenesEncontrados_length').css('text-align', 'left');
                $('#tblResumenesEncontrados_length select').css('width', '30%');
                $('#tblResumenesEncontrados_info').css('text-align', 'left');
                $('#tblResumenesEncontrados_paginate').css('text-align', 'left');
                $('#tblResumenesEncontrados').css('width', '100%');
                $('tr.even td').css('background', 'rgb(198, 229, 204)');

                $('#tblResumenesEncontradosSIC').html('');
                if (data.d.split("%%&&")[1] != "" && data.d.split("%%&&")[1]!= undefined) {
                    arregloRowsCortesResumen = new Array();
                    Registros = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                    LlenaArregloDatosTablaSIC(Registros);
                    $("#fieldCortesEncontradosSIC").css("display", "block");
                    initTableSIC("tblResumenesEncontradosSIC");
                    $('#tblResumenesEncontradosSIC_length').css('text-align', 'left');
                    $('#tblResumenesEncontradosSIC_length select').css('width', '30%');
                    $('#tblResumenesEncontradosSIC_info').css('text-align', 'left');
                    $('#tblResumenesEncontradosSIC_paginate').css('text-align', 'left');
                    $('#tblResumenesEncontradosSIC').css('width', '100%');
                    $('tr.even td').css('background', 'rgb(198, 229, 204)');
                }
            }
            else {
                idDisposicionConsultado = '';
                $(tblResumenesEncontrados).html('<span style="color:Red;font-weight:bold">No hay resumenes para la disposición seleccionada.</span>');
                $('#EditarResumen').attr("disabled", true);
            }
            CambiarDiv('DivResumenesEncontrados', 'DivDisposicionesEncontradas', false, false);
            $('#DivCabeceraResumenes').attr("disabled", false);

            var objDisposicionesEncontradas = document.getElementById('DisposicionesEncontradasNDS');
            objDisposicionesEncontradas = objDisposicionesEncontradas == null ? document.getElementById('DisposicionesEncontradasNDSSIC') : objDisposicionesEncontradas;

            for (var Renglon = 0; Renglon < objDisposicionesEncontradas.rows.length; Renglon++) {
                if (Renglon > 0) {
                    if (objDisposicionesEncontradas.rows[Renglon].cells[0].innerText != idDisposicionBus)
                        $('#Disposicion' + objDisposicionesEncontradas.rows[Renglon].cells[0].innerText).hide();
                }
            }
        }
        else {
            //$(TablaResumenesEncontrados).html('<span style="color:Red;font-weight:bold">' + data.d + '.</span><br /><br />');
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function LlenaArregloDatosTabla(JSON) {
    if (JSON[0] != null) {
        for (var i = 0; i < JSON.length; i++) {
            var arreglov = new Array();
            arreglov.push(
                JSON[i].AnioMesDia,
                JSON[i].Capital,
                JSON[i].Intereses,
                JSON[i].Anticipos,
                JSON[i].RiesgoTotal,
                JSON[i].CalificacionFinal,
                JSON[i].Reserva,
                JSON[i].SituacionCredito,
                JSON[i].EstatusdelCredito,
                "<input id='RadioEditarResumen' name='EditarResumenX' type='radio' value='" + JSON[i].AnioMesDia + '/' + JSON[i].NumeroDisposicion + "' " + (i == 0 ? ' checked="checked"' : ' ') + "/>"
            );
            arregloRowsCortesResumen.push(arreglov);
            arreglov = new Array();
        }
    }
}

function initTable(tabla) {
    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        "date-uk-pre": function (a) {
            var ukDatea = a.split('/');
            return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
        },

        "date-uk-asc": function (a, b) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        "date-uk-desc": function (a, b) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    });

    return $('#' + tabla).dataTable({
        "aaData": arregloRowsCortesResumen,
        "aaSorting": [[0, "desc"]],
        "aoColumns": [

            { "sTitle": "<div id='div_" + tabla + "_SortCampo1' lang='aa' onclick='CambiaImg_Click(this)'>Día - Mes - Año&nbsp<img id='Img_" + tabla + "_SortCampo1' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sType": "date-uk", "sWidth": "126px" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo2' lang='aa' onclick='CambiaImg_Click(this)'>Capital&nbsp<img id='Img_" + tabla + "_SortCampo2' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "75px" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo3' lang='aa' onclick='CambiaImg_Click(this)'>Intereses&nbsp<img id='Img_" + tabla + "_SortCampo3' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "88px" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo4' lang='aa' onclick='CambiaImg_Click(this)'>Anticipos&nbsp<img id='Img_" + tabla + "_SortCampo4' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "89px" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo5' lang='aa' onclick='CambiaImg_Click(this)'>Riesgo Total&nbsp<img id='Img_" + tabla + "_SortCampo5' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "111px" },

             { "sTitle": "<div id='div_" + tabla + "_SortCampo6' lang='aa' onclick='CambiaImg_Click(this)'>Calif. Final&nbsp<img id='Img_" + tabla + "_SortCampo6' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "101px" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo7' lang='aa' onclick='CambiaImg_Click(this)'>Reserva&nbsp<img id='Img_" + tabla + "_SortCampo7' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "82px" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo8' lang='aa' onclick='CambiaImg_Click(this)'>Situación de la Deuda&nbsp<img id='Img_" + tabla + "_SortCampo8' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "180px" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo9' lang='aa' onclick='CambiaImg_Click(this)'>Estatus del Crédito&nbsp<img id='Img_" + tabla + "_SortCampo9' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "180px" },
            { "sTitle": "", "sWidth": "18px" }

        ],
        "sPaginationType": "full_numbers",
        "iDisplayLength": 10,
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todo"]],
        "bDestroy": true
    });
}

//-------------------------------PARTE SIC
function LlenaArregloDatosTablaSIC(JSON) {
    if (JSON[0] != null) {
        for (var i = 0; i < JSON.length; i++) {
            var arreglov = new Array();
            arreglov.push(
                JSON[i].AnioMesDia,
                DevuelveCantidadSeparadaPorComas(JSON[i].Capital, false),
                DevuelveCantidadSeparadaPorComas(JSON[i].Intereses, false),
                JSON[i].CalifFinal,
                DevuelveCantidadSeparadaPorComas(JSON[i].Reserva, false),
                JSON[i].FVCSituacionCredito,
                "<input id='RadioEditarResumen' name='EditarResumenX' type='radio' value='" + JSON[i].AnioMesDia + '/' + JSON[i].FVCNumeroDeDisposicion + "' " + (i == 0 ? ' checked="checked"' : ' ') + "/>"
            );
            arregloRowsCortesResumen.push(arreglov);
            arreglov = new Array();
        }
    }
}


function initTableSIC(tabla) {
    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        "date-uk-pre": function (a) {
            var ukDatea = a.split('/');
            return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
        },

        "date-uk-asc": function (a, b) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        "date-uk-desc": function (a, b) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    });

    return $('#' + tabla).dataTable({
        "aaData": arregloRowsCortesResumen,
        "aaSorting": [[0, "desc"]],
        "aoColumns": [

            { "sTitle": "<div id='div_" + tabla + "_SortCampo1' lang='aa' onclick='CambiaImg_Click(this)'>Día - Mes - Año&nbsp<img id='Img_" + tabla + "_SortCampo1' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sType": "date-uk", "sWidth": "126px" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo2' lang='aa' onclick='CambiaImg_Click(this)'>Capital&nbsp<img id='Img_" + tabla + "_SortCampo2' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "75px" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo3' lang='aa' onclick='CambiaImg_Click(this)'>Intereses&nbsp<img id='Img_" + tabla + "_SortCampo3' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "88px" },

             { "sTitle": "<div id='div_" + tabla + "_SortCampo6' lang='aa' onclick='CambiaImg_Click(this)'>Calif. Final&nbsp<img id='Img_" + tabla + "_SortCampo6' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "101px" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo7' lang='aa' onclick='CambiaImg_Click(this)'>Reserva&nbsp<img id='Img_" + tabla + "_SortCampo7' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "82px" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo8' lang='aa' onclick='CambiaImg_Click(this)'>Situación de la Deuda&nbsp<img id='Img_" + tabla + "_SortCampo8' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>", "bSortable": "true", "sWidth": "180px" },
            { "sTitle": "", "sWidth": "18px" }

        ],
        "sPaginationType": "full_numbers",
        "iDisplayLength": 10,
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "Todo"]],
        "bDestroy": true
    });
}


function CambiaImg_Click(obj) {
    if ($(obj).attr("lang") == "aa") {
        document.getElementById('Img_' + $(obj).attr("id").split("_")[1] + "_" + $(obj).attr("id").split("_")[2]).setAttribute('src', '../../Images/Portafolio/Capbasviv/flechaOrderUp.png');
        $(obj).attr("lang", "ab");
    }
    else {
        document.getElementById('Img_' + $(obj).attr("id").split("_")[1] + "_" + $(obj).attr("id").split("_")[2]).setAttribute('src', '../../Images/Portafolio/Capbasviv/flechaOrder.png');
        $(obj).attr("lang", "aa");
    }
}

//----------------------------------------------------------------------------EDICIONES--------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////CLIENTE
var coloniaAcrediatadoSIC;
var clienteEdicionAlnova = null;
var valorAtrasoEdicionCliente = ""; var valorTipoEmpresaEdicionCliente = "";
function EdicionCliente() {
    if (idpaislogin == 1) {
        //campo de validacion para honduras y otros
        if (document.forms[0]["EditarCliente"] == undefined) return;
        $("#tblDatosClientComercial").hide();
        if ($('#DivClientes').is(":disabled") == false) {
            Waiting(true, "Espere por favor. Cargando Información...");

            var indiceCliente = 0;
            for (indiceCliente = 0; indiceCliente < document.forms[0]["EditarCliente"].length; indiceCliente++) {
                if (document.forms[0]["EditarCliente"][indiceCliente].checked)
                    break;
            }
            peticionAjax('Default.aspx/BuscarClientes', "POST", { filtrarPor: "EdicionCliente", valor: (document.forms[0]["EditarCliente"].length != undefined ? document.forms[0]["EditarCliente"][indiceCliente].value : document.forms[0]["EditarCliente"].value) },
            function (data) {
                if (!data.d.startsWith('ERRORCATCH:')) {
                    $("#tblDatosClientComercial").hide();
                    if (data.d != "") {
                        if (data.d.split("%%&&")[0] != "") {
                            Cliente = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                            $("#tblDatosClientComercial").show();
                            $("#txtIdAcreditado").attr("disabled", true);
                            $("#txtIdAcreditado").val(Cliente[0].ID);
                            $("#txtRfcAcreditado").val(Cliente[0].Rfc);
                            $("#txtNombreAcreditado").val(Cliente[0].Nombre);
                            $("#sltTipoCartera").val(Cliente[0]["Tipo Cartera Id"]);
                            $("#sltActividadEconomica").val(Cliente[0].ActEconomicaId);
                            $("#txtGrupoRiesgo").val(Cliente[0].GrupoRiesgo);

                            $("#txtCP_A").val(Cliente[0].Municipio);
                            coloniaAcrediatadoSIC = Cliente[0].Localidad;
                            CargarPaisEdoLocalidadColonia($("#txtCP_A").val(), "A", false);
                            $("#sltColoniaA").val(Cliente[0].Localidad);
                            $("#sltLocalidadA").val(Cliente[0].Localidad);
                            $("#sltMunicipioA").val(Cliente[0].ID);
                            $("#sltEstadoA").val(Cliente[0].EstadoId);
                            $("#sltNacionalidadA").val(Cliente[0].Nacionalidad);
                            $("#txtCURP").val(Cliente[0].CURP);
                            $("#txtLEI").val(Cliente[0].LEI);
                            $("#sltSectorContable").val(Cliente[0].Sector);
                            $("#sltAcreditadoRelacionado").val(Cliente[0].AcredRelacionado);
                            $("#sltLugarRadica").val(Cliente[0].Lugardonderadica);
                            $("#sltEntidadFinanciera").val(Cliente[0].Entidadfinanciera);
                            //$("#sltFiltroXTipoEmpresa").val(Cliente[0].Atraso);
                            $("#txtFideiComitente").val(Cliente[0].Fideicomitente);
                            $("#txtFiduciario").val(Cliente[0].Fiduciario);
                            $("#txtIngresoFideicomitente").val(Cliente[0].IngresoFideicomitente);

                            $("#txtCP_DC").val(Cliente[0].MunicipiodondedestinaraCred);
                            // CargarPaisEdoLocalidadColonia($("#txtCPDC").val(), "DC",false);
                            $("#sltColoniaDC").val(Cliente[0].idcolonia);
                            $("#sltLocalidadDC").val(Cliente[0].Localdondecredito);
                            $("#sltMunicipioDC").val(Cliente[0].MunicipiodondedestinaraCred);
                            $("#sltEstadoDC").val(Cliente[0].EstadodondedestinaraCred);
                            $("#sltActividadEconomicaDestCred").val(Cliente[0].ActEconomicadestinaraCred);
                            $("#sltTipoAcreditadoRelacionado").val(Cliente[0].Tipoacreditadorelacionado);
                            $("#sltPersonalidadJuridica").val(Cliente[0].PersonJuridiaAcred);
                            $("#txtDireccionCalle").val(Cliente[0].Direccioncalle);
                            $("#txtDireccionNumExterior").val(Cliente[0].Direccionnumexterior);
                            $("#txtDireccionNumInterior").val(Cliente[0].Direccionnuminterior);
                            valorTipoEmpresaEdicionCliente = Cliente[0].idTipoempresa;
                            if (Cliente[0].idTipoempresa == "2")
                                valorAtrasoEdicionCliente = Cliente[0].Entidadfinanciera;
                            else if (Cliente[0].idTipoempresa == "3")
                                valorAtrasoEdicionCliente = Cliente[0].Atraso;
                            //else
                            //valorAtrasoEdicionCliente = Cliente[0].idTamañoventas;
                            $("#txtIdAcreditado").attr("lang", Cliente[0].idTipoempresa);
                        }

                        if (data.d.split("%%&&")[1] != "")
                            clienteEdicionAlnova = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                        if (data.d.split("%%&&")[0] == "")
                            AsignarCamposAlnovaEdicionCliente();
                    }
                    else {
                        Waiting(false, "Espere por favor. Cargando Información...");
                        MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
                else {
                    Waiting(false, "Espere por favor. Cargando Información...");
                    MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                }
            }, null);
            CambiarDiv('DatosCliente', 'ClientesEncotrados', false, true);
        }
    }
    else
    {
        MostrarMsj("Opcion No disponible para este Pais", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);

    }
}

function AsignarCamposAlnovaEdicionCliente() {
    if (clienteEdicionAlnova != null) {
        $('#NumeroCliente').val(clienteEdicionAlnova[0].ID);
        $('#NumeroCliente').attr("disabled", true);
        $('#NombreCliente').val(clienteEdicionAlnova[0].Nombre);
        $('#APaternoCliente').val(clienteEdicionAlnova[0].APaterno);
        $('#AMaternoCliente').val(clienteEdicionAlnova[0].AMaterno);
        $('#FechaNacimientoCliente').val(clienteEdicionAlnova[0].FechaNacimiento);
        $('#PersonalidadJuridicaCliente').val(clienteEdicionAlnova[0].Persona);

        LlenarSexo();

        $('#SexoCliente').val(clienteEdicionAlnova[0].Sexo);
        $('#RFCCliente').val(clienteEdicionAlnova[0].RFC);
        $('#CodigoPostalCliente').val(clienteEdicionAlnova[0].CodigoPostal);
        $('#PaisCliente').val(clienteEdicionAlnova[0].Pais);

        Pais = clienteEdicionAlnova[0].Pais;
        Estado = clienteEdicionAlnova[0].Estado;
        Region = clienteEdicionAlnova[0].RegionPais;

        LlenarEstado(false);
        $('#GrupoEconomicoCliente').val(clienteEdicionAlnova[0].GrupoEconomico);
        $('#TamanoAcreditadoCliente').val(clienteEdicionAlnova[0].Tamano);

        Agrupacion = clienteEdicionAlnova[0].Agrupacion;
        Rama = clienteEdicionAlnova[0].Rama;
        Sector = clienteEdicionAlnova[0].Sector;
        SubSector = clienteEdicionAlnova[0].SubSector;
        Division = clienteEdicionAlnova[0].Division;
        Grupo = clienteEdicionAlnova[0].Grupo;
        ActividadEconomica = clienteEdicionAlnova[0].ActividadEconomica;

        LlenarAgrupacion();

        $('#TipoAcreditadoRelacionadoCliente').val(clienteEdicionAlnova[0].TipoAcreditadoRelacionado);
        $('#SectorEcoAcredCliente').val(clienteEdicionAlnova[0].SectorEcoAcredCliente);
        $('#NumeroEmpleadosCliente').val(clienteEdicionAlnova[0].NumeroEmpleados);
        $('#BuroCliente').val(clienteEdicionAlnova[0].Buro);
        $('#IngresoCliente').val(clienteEdicionAlnova[0].Ingreso);
        $('#ColoniaCliente').val(clienteEdicionAlnova[0].Colonia);
        $('#DireccionCliente').val(clienteEdicionAlnova[0].Direccion);
        $('#inpClaveMunicipio').val(clienteEdicionAlnova[0].ClaveMunicipio);
        EstadoFVC = clienteEdicionAlnova[0].EstadoFVC;

        LlenaEstadoFVC();
        clienteEdicionAlnova = null
    }
}

//////////////////////////////////////////////////////////////////////////////////////////LINEAS
function EdicionLinea() {
    if (idpaislogin == 1) {
        if (document.forms[0]["EditarLineaX"] == undefined) return;
        if ($('#Lineas').is("disabled") == false) {
            Waiting(true, "Espere por favor. Cargando Información...");

            var i = 0;
            for (i = 0; i < document.forms[0]["EditarLineaX"].length; i++) {
                if (document.forms[0]["EditarLineaX"][i].checked)
                    break;
            }
            var idLineaBusqueda = (document.forms[0]["EditarLineaX"].length != undefined ? document.forms[0]["EditarLineaX"][i].value : document.forms[0]["EditarLineaX"].value);
            peticionAjax('Default.aspx/BuscarLineas', "POST", { opcion: "2", idCliente: idLineaBusqueda }, function (data) {
                if (!data.d.startsWith('Error:')) {
                    $("#tblDatosLineaComercial").hide();
                    $("#tblDatosLineaAlnova").hide();
                    //data.d = data.d + "%%&&" + data.d;
                    if (data.d != "") {
                        if (data.d.split("%%&&")[0] != "" && data.d.split("%%&&")[0] != undefined) {
                            Registro = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                            $("#tblDatosLineaComercial").show();
                            var valorH = (document.documentElement.clientHeight - document.getElementById("divHeader").offsetHeight);
                            valorH = (valorH - 50) / 4;
                            document.getElementById("DatosLinea").style.height = (valorH + 200) + "px";


                            $('#txtIdClienteLinea').val(Registro[0].ID);
                            $("#txtIdClienteLinea").attr("disabled", true);
                            $('#txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia').val(Registro[0].NumeroDeConsultaRealizadaALaSociedadDeInformaciónCrediticia);
                            $('#txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia').attr("disabled", true);

                            $('#sltTipoAltaCredito').val(Registro[0].TipoAltaCreditoId);
                            $('#sltTipoProducto').val(Registro[0].TipoDeProductoId);
                            $('#sltTipoOperacion').val(Registro[0].TipoDeOperaciónId);

                            $('#sltDestinoDelCredito').val(Registro[0].DestinoDelCréditoId);
                            $('#txtNumeroLineaActual').val(Registro[0].NumeroDeLínea);
                            $("#txtNumeroLineaActual").attr("disabled", true);

                            var fechaGet = Registro[0].FechaAltaLinea;
                            fechaGet = (fechaGet != undefined && fechaGet != "" ? fechaGet.substring(6, 8) + "/" + fechaGet.substring(4, 6) + "/" + fechaGet.substring(0, 4) : "");
                            $('#txtFechaAltaDeLinea').val(fechaGet);
                            $('#txtIdCredLineaGrupalMultimonedaCNBV').val(Registro[0].IdCreditoLíneaGrupalOMultimonedaAsignadoMetodologíaCnbv);
                            $('#txtMontoLineaCreditoAutorizado').val(Registro[0].MontoDeLaLíneaDeCréditoAutorizado);
                            fechaGet = Registro[0].FechaMáximaParaDisponerDeLosRecursos;
                            fechaGet = (fechaGet != undefined && fechaGet != "" ? fechaGet.substring(6, 8) + "/" + fechaGet.substring(4, 6) + "/" + fechaGet.substring(0, 4) : "");
                            $('#txtFechaMaximaDisponerRecursos').val(fechaGet);
                            fechaGet = Registro[0].FechaVencimientoDeLaLíneaDeCrédito;
                            fechaGet = (fechaGet != undefined && fechaGet != "" ? fechaGet.substring(6, 8) + "/" + fechaGet.substring(4, 6) + "/" + fechaGet.substring(0, 4) : "");
                            $('#txtFechaVencimientoLineaCredito').val(fechaGet);
                            $('#sltMonedaDeLineaCredito').val(Registro[0].MonedaDeLaLíneaDeCréditoId);
                            $('#sltFormaDisposicion').val(Registro[0].FormaDeLaDisposiciónId);
                            $('#sltLineaCreditoRevocableIrrevo').val(Registro[0].LíneaDeCréditoRevocableOIrrevocableId);
                            $('#sltRestriccionLinea').val(Registro[0].RestriccionDeLaLineaId);
                            $('#sltPrelacionDePago').val(Registro[0].PrelaciónDePago_CreditoPreferenteOSubordinadoId);
                            $('#txtNumRegEnRegUnicoDeObligYEmpLocal').val(Registro[0].NúmeroRegistroEnRegistroÚnicoDeObligYEmpréstLocal);
                            $('#txtNumRegDeObligEmpEntFedMunSHCP').val(Registro[0].NúmeroRegistroEnRegistroObligYEmpréstDeEntidadesFedYMunsDeLaShcp);
                            $('#txtNumRegEnRegistroPubPropiedadYComercio').val(Registro[0].NúmeroDeRegistroEnElRegistroPúblicoDeLaPropiedadYComercio);
                            $('#txtNumRegUnicosDeGarantiasMobiliarias').val(Registro[0].NúmeroDeRegistroÚnicoDeGarantíasMobiliarias);
                            $('#sltClaveInstitucionOAgenciaExteriorOtorganteRecursos').val(Registro[0].ClaveDeInstituOAgenciaOtorganteDeLosRecursosId);
                            $('#txtPorcentajeParticFederalesComoFuentePagoCredito').val(Registro[0].PjeDeParticipacionesFederalesComprometidasComoFuenteDePagoDelCrédito);
                            $('#sltTasaDeInteres').val(Registro[0].TasaDeInterésId);
                            $('#txtDiferencialSobreTasaReferencia').val(Registro[0].DiferencialSobreTasaDeReferencia);
                            $('#sltOperacionDiferenciaSobreTasaReferencia').val(Registro[0].OperaciónDiferencialSobreTasaReferenciaId);
                            $('#txtFrecuenciaRevisionTasa').val(Registro[0].FrecuenciaRevisiónTasa);
                            $('#sltPeriodicidadPagoCapital').val(Registro[0].PeriodicidadPagoDeCapitalId);
                            $('#sltPeriodicidadPagoIntereses').val(Registro[0].PeriodicidadPagoDeInteresesId);
                            $('#txtNumMesesGraciaParaAmortizarCapital').val(Registro[0].NumeroDeMesesDeGraciaParaAmortizarCapital);
                            $('#txtNumMesesGraciaPagoInterese').val(Registro[0].NumeroDeMesesDeGraciaParaPagoDeIntereses);
                            $('#txtComisionAperturaCreditoTasa').val(Registro[0].ComisiónDeAperturaDelCrédito_Tasa);
                            $('#txtComisionAperturaCreditoMonto').val(Registro[0].ComisiónDeAperturaDelCrédito_Monto);
                            $('#txtComisionDisposicionCreditoTasa').val(Registro[0].ComisiónPorDisposiciónDelCrédito_Tasa);
                            $('#txtComisionDisposicionCreditoMonto').val(Registro[0].ComisiónPorDisposiciónDelCrédito_Monto);
                            $('#txtCostoAnualTotalMomentoOtorgamientoLineaCredCalculadaCAT').val(Registro[0].CostoAnualTotalMomentoOtorgamientoLineaCredCalculadaCAT);
                            $('#txtMontoCreditoSimpleOAutorizadoLineaCreditoSinAccesFinanci').val(Registro[0].MontoCreditoSimpleOAutorizadoLineaCreditoSinAccesFinanci);
                            $('#txtMontoPrimasAnualesTodosSegurosObligConradosAcreditado').val(Registro[0].MontoPrimasAnualesTodosSegurosObligConradosAcreditado);
                            $('#sltGarantiaDeLeyFederal').val(Registro[0].GarantíaDeLeyFederalId);
                            $('#txtNumeroLineaOrigen').val(Registro[0].IdCredAsignadoporlaInstOrigen);
                            $('#txtNumeroLineaCNBV').val(Registro[0].IdCredAsignadoporlaInstCNBV);
                            $('#txtNumeroLineaInicio').val(Registro[0].IdCredAsignadoporlaInstInicio);
                            $('#txtNumeroLineaAnterior').val(Registro[0].IdCredAsignadoporlaInstAnterior);
                            $('#sltCaracteristicasDispCredito').val(Registro[0].CaractreristicasDispCred);
                            $('#txtPorcentajeCubiertoCredito').val(Registro[0].PorcCubierto);
                            $('#txtPorcentajeCubieroGarantFondBancaDes').val(Registro[0].PorcCubiertoCredGtiaFondoBanDesarr);
                            $('#txtFondoFomentoBancoDesOtorGar').val(Registro[0].FondoFomentoBancDesarrOtorgoGtia);
                            $('#txtPorcentajeCubieroAval').val(Registro[0].PorceCubiertoAval);
                            $('#sltTipoGarantiaReal').val(Registro[0].TipoGarantiaReal);
                            $('#sltTipoBajaLinea').val(Registro[0].TipoBajaLinea);
                            fechaGet = Registro[0].FechaBAjaLinea;
                            fechaGet = (fechaGet != undefined && fechaGet != "" ? fechaGet.substring(6, 8) + "/" + fechaGet.substring(4, 6) + "/" + fechaGet.substring(0, 4) : "");
                            $('#txtFechaBajaLinea').val(fechaGet);
                            $('#sltProyectoInversionFuentPagProp').val(Registro[0].Anexo19);
                            $('#txtMontoFondeadoBancoDesarroloOFondoFomen').val(Registro[0].MontoFondeadoporBancoDesarrollo);
                            $('#sltInstBancaDesFondoFomOtorgFond').val(Registro[0].InstDesarrolloOFondoFomentootorgoelfondeo);
                        }
                        if (data.d.split("%%&&")[1] != "" && data.d.split("%%&&")[1] != undefined) {
                            Registro = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                            $("#tblDatosLineaAlnova").show();
                            document.getElementById("DatosLinea").style.height = "auto";

                            $('#NumeroLinea').val(Registro[0].NumeroLinea);
                            $('#NumeroLinea').attr("disabled", true);
                            $('#IdClienteLinea').val(Registro[0].IdCliente);
                            $("#IdClienteLinea").attr("disabled", true);
                            $('#FechaAltaLinea').val(Registro[0].FechaAlta);
                            $('#MontoAutorizadoLinea').val(Registro[0].MontoAutorizado);
                            $('#FechaInicioVigenciaLinea').val(Registro[0].FechaInicioVigencia);
                            $('#FechaFinVigenciaLinea').val(Registro[0].FechaFinVigencia);
                            $('#DispCreditoLinea').val(Registro[0].DispCredito);
                            $('#DestinoCreditoLinea').val(Registro[0].DestinoCredito);
                            $("#DispCreditoLinea").removeAttr("disabled");
                            $("#DestinoCreditoLinea").removeAttr("disabled");
                        }
                    }
                    else {
                        Waiting(false, "Espere por favor. Cargando Información...");
                        MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
                else
                    MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
            CambiarDiv('DatosLinea', 'LineasEncontradas', false, true);
        }
    }
    else
    {
        MostrarMsj("Opcion No disponible para este Pais", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
    }
}

///////////////////////////////////////////////////////////DISPOSICIONES

function EdicionDisposicion() {
    if (idpaislogin == 1) {
        if (document.forms[0]["EditarLineaX"] == undefined) return;
        if ($('#DivDisposiciones').is("disabled") == false) {
            Waiting(true, "Espere por favor. Cargando Información...");
            var i = 0;
            for (i = 0; i < document.forms[0]["EditarDisposicionX"].length; i++) {
                if (document.forms[0]["EditarDisposicionX"][i].checked)
                    break;
            }
            var idDisposicionBusqueda = (document.forms[0]["EditarDisposicionX"].length != undefined ? document.forms[0]["EditarDisposicionX"][i].value : document.forms[0]["EditarDisposicionX"].value);
            peticionAjax('Default.aspx/BuscarDisposicion', "POST", { Numero: idDisposicionBusqueda }, function (data) {
                if (!data.d.startsWith('Error:')) {
                    $("#tblDatosDisposicionComercial").hide();
                    $("#tblDatosDisposicionAlnova").hide();
                    if (data.d != "") {
                        data.d = "%%&&" + data.d;
                        if (data.d.split("%%&&")[0] != "" && data.d.split("%%&&")[0] != undefined) {
                            Registro = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                            $("#tblDatosDisposicionComercial").show();

                            $('#sltTipoAltaDispo').val(Registro[0].FNNumeroDispocision);
                            $('#sltTipoBajaCredito').val(Registro[0].FNNumeroDispocision);
                            $('#txtIdDisposicion').val(Registro[0].FNNumeroDispocision);
                            $("#txtIdDisposicion").attr("disabled", true);
                            $('#txtNumeroLineaDisposicion').val(Registro[0].FNNumeroLinea);
                            $('#txtTipoEmpresaDisp').val(Registro[0].FNNumeroDispocision);
                            $('#sltCategoriaCredito').val(Registro[0].FNNumeroDispocision);
                            var fecha1 = Registro[0].fechaDisposicion;
                            fecha1 != undefined ? $("#txtFechaDisposicionCredito").val(fecha1.substring(6, 8) + "/" + fecha1.substring(4, 6) + "/" + fecha1.substring(0, 4)) : null;
                            fecha1 = Registro[0].fechaVencimiento;
                            fecha1 != undefined ? $("#txtFechaVencimientoDisp").val(fecha1.substring(6, 8) + "/" + fecha1.substring(4, 6) + "/" + fecha1.substring(0, 4)) : null;
                            $('#sltMonedaDispocion').val(Registro[0].FIMoneda);

                            //                        $('#sltProyectoInversion').val(Registro[0].IdProyectoInv);
                            //                        $('#txtMontoFondeo').val(Registro[0].MontoFondeado);
                            //                        $('#sltInstitucionBancaDesFondoFon').val(Registro[0].idInstBancaOtorgaFondeo);
                        }
                        if (data.d.split("%%&&")[1] != "" && data.d.split("%%&&")[1] != undefined) {
                            Registro = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                            $("#tblDatosDisposicionAlnova").show();

                            $('#NumeroDisposicion').val(Registro[0].FNNumeroDispocision);
                            $('#NumeroDisposicion').attr("disabled", true);
                            $('#NumeroLineaDisposicion').val(Registro[0].FNNumeroLinea);
                            $('#FechaFormalizacionDisposicion').val(Registro[0].FDFechaFormalizacion);
                            $('#FechadeInicio').val(Registro[0].FDFechaInicioOperacion);
                            $('#EntidadOficinaCreditoDisposicion').val(Registro[0].FNEntidadOficinaCredito);
                            $('#DigitoVerificadorDisposicion').val(Registro[0].FIDigitoVer);
                            $('#MonedaDisposicion').val(Registro[0].FIMoneda);
                            $('#FormaAmortizacionDisposicion').val(Registro[0].FVCFormaAmortizacion);
                            $('#MontoAmortizacionDisposicion').val(Registro[0].FNMontoAmortizacion);
                            $('#PeriodicidadPlazoDisposicion').val(Registro[0].FVCPlazo.substring(0, 1));
                            $('#PlazoDisposicion').val(Registro[0].FVCPlazo.substring(2, 5));
                            $('#PeriodicidadCapitalDisposicion').val(Registro[0].FVCPeriodicidadCapital);
                            $('#PeriodicidadInteresDisposicon').val(Registro[0].FVCPeriodicidadInteres);
                            $('#FechaVencimientoDisposicion').val(Registro[0].FDFechaVencimiento);
                            $('#FuenteFondeoDisposicion').val(Registro[0].FVCFuenteFondeo);
                            $('#PorcentajeGarantiaFondosDisposicion').val(Registro[0].FIPorcentajeGarantizado);
                            $('#FrecuenciaRevisionTasaDisposicion').val(Registro[0].FIFrecuenciaRevisionTasa);
                            $('#PorcentajeGarantizaAvalDisposicion').val(Registro[0].FDPorcentajeGarantizadoPorAval);
                            $('#TipoGarantiaDisposicion').val(Registro[0].FVCTipoGarantiaReal);
                            $('#ValorGarantiaDisposicion').val(Registro[0].FDValorGarantia);
                            $('#FechaValuacionGarantiaDisposicion').val(Registro[0].FDFechaValuacionGarantia);
                            $('#GradoPrelacionGarantiaDisposicion').val(Registro[0].FIGradoPrelacionGarantia);
                            Sistema = Registro[0].FVCSistema;
                            Producto = Registro[0].FVCProducto;
                            SubProducto = Registro[0].FVCSubProducto;
                            Descripcion = Registro[0].FVCDescripcion;
                            Descripcion2 = Registro[0].FVCDescripcion2;
                            Clave = Registro[0].FIClave;
                            LlenarSistema();
                            $('#CarteraRevolventeDisposicion').val(Registro[0].FVCRevolvente);
                            $('#ClasificacionContableDisposicion').val(Registro[0].FVCClasificacionContable);
                            $('#DestinoCreditoDisposicion').val(Registro[0].FVCDestinoCredito);
                            $('#TipoCreditoDisposicion').val(Registro[0].FVCCategoriaCredito);

                            $('#CategoriaCreditoDisposicion').val(Registro[0].FVCCategoriaCredito);
                            $('#TipoFacturacionDisposicion').val(Registro[0].FVCTipoFacturacion);
                            $('#GarantiaDisposicion').val(Registro[0].FNGarantia);
                            $('#IndicadorFondeoDisposicion').val(Registro[0].FVCIndicadorFondeo);
                            $('#tipoAltaDisposicion').val(Registro[0].FITipoAlta);
                            $('#SucursalDisposicion').val(Registro[0].FISucursal);
                            $('#tipoBajaDisposicion').val(Registro[0].FITipoBaja);
                            $('#numeroCreditoPrecedenteDisposicion').val(Registro[0].FNNumeroCreditoPrecedente);
                            $('#formaDisolucionDisposicion').val(Registro[0].FNFormaDisolución);

                            if ($('#tipoAltaDisposicion').val() == 3 || $('#tipoBajaDisposicion').val() == 3) {
                                $('#numeroCreditoPrecedenteDisposicion').attr("disabled", false);
                                $('#tipoAltaDisposicion').attr("disabled", false);
                                $('#tipoBajaDisposicion').attr("disabled", false);
                            }
                        }
                        CambiarDiv('DivDatosDisposicion', 'DivDisposicionesEncontradas', false, true);
                    }
                    else {
                        Waiting(false, "Espere por favor. Cargando Información...");
                        MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                    }
                }
                else {
                    Waiting(false, "Espere por favor. Cargando Información...");
                    MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                }
                //Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
        }
    }
    else
    {
        MostrarMsj("Opcion No disponible para este Pais", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);

    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////RESUMEN
function EdicionResumen() {
    if(idpaislogin == 1){
        $("#tblDatosCorteComercial").hide();
        if (document.forms[0]["EditarResumenX"] == undefined) return;
        Waiting(true, "Espere por favor. Cargando Información...");
        var i = 0;
        var ident = '';
        var checkt = false;
        var len = document.forms[0]["EditarResumenX"].length;
        if (len != undefined) {
            for (i = 0; i < len; i++) {
                if (document.forms[0]["EditarResumenX"][i].checked) {
                    checkt = true;
                    break;
                }
            }
            if (checkt)
                ident = document.forms[0]["EditarResumenX"][i].value;
        } else {
            if (document.forms[0]["EditarResumenX"].checked) {
                ident = document.forms[0]["EditarResumenX"].value
                checkt = true;
            }
        }
        if (checkt) {
            //var idCorteBusqueda = (document.forms[0]["EditarDisposicionX"].length != undefined ? document.forms[0]["EditarDisposicionX"][i].value : document.forms[0]["EditarDisposicionX"].value);
            peticionAjax('Default.aspx/BuscarResumen', "POST", { Identificador: ident }, function (data) {
                if (!data.d.startsWith('Error:')) {
                    if (data.d.split("%%&&")[0] != "" && data.d.split("%%&&")[0] != undefined) {
                        Registro = obtenerArregloDeJSON(data.d.split("%%&&")[0], false);
                        $('#AnioMesDiaResumen').val(Registro[0].FSIDia + "/" + Registro[0].FSIMes + "/" + Registro[0].FSIAnio);
                        $('#AnioMesDiaResumen').attr("disabled", true);
                        $('#AnioMesDiaResumen').next().attr("disabled", true);
                        $('#NumeroDisposicionResumen').val(Registro[0].FNNumeroDispocision);
                        $('#PagoMinimoResumen').val(Registro[0].FDPagoMinimo);
                        $('#MontoAmortizacionResumen').val(Registro[0].FDMontoProxAmortizacion);
                        $('#MontoInteresePorCobrarResumen').val(Registro[0].FDMontoProxInteresPorCobrar);
                        $('#TasaInteresPorCobrarResumen').val(Registro[0].FDTasaInteresBruta);
                        $('#TipoTasaResumen').val(Registro[0].FVCTipoTasa);
                        $('#AjusteTasaReferenciaResumen').val(Registro[0].FDAjusteTasaReferencia);
                        $('#RecibosImpagadosResumen').val(Registro[0].FIReciosImpagados);
                        $('#FechaUltimaSitDeudaResumen').val(Registro[0].FDFechaUltimaSitDeuda);
                        $('#FechaRecibAntiguoImpagadoResumen').val(Registro[0].FDFechaReciboAntiguoImpa);
                        $('#DiasEstatusResumen').val(Registro[0].FIDiasStatus);
                        $('#DiasAtrasoResumen').val(Registro[0].FIDIasAtraso);
                        $('#CapitalVigenteResumen').val(Registro[0].FDCapitalVigente);
                        $('#CapitalTransitorioResumen').val(Registro[0].FDCapitalTransitorio);
                        $('#CapitalVencidoNoExigibleResumen').val(Registro[0].FDCapitalVencidoNoExigible);
                        $('#CapitalVencidoExigibleResumen').val(Registro[0].FDCapitalVencidoExigible);
                        $('#InteresDevengadoResumen').val(Registro[0].FDInteresDevengado);
                        $('#InteresVigenteResumen').val(Registro[0].FDInteresVigente);
                        $('#InteresTransitorioResumen').val(Registro[0].FDInteresTransitorio);
                        $('#InteresVencidoResumen').val(Registro[0].FDInteresVencido);
                        $('#InteresSuspendidoResumen').val(Registro[0].FDInteresSuspendido);
                        $('#InteresesFinanciadosCapitalizadosResumen').val(Registro[0].FDInteresRefinanciadoCapitalizados);
                        $('#AnticiposResumen').val(Registro[0].FNAnticipos);
                        $('#SituacionCreditoResumen').val(Registro[0].FVCSituacionCredito);
                        $('#CalificacionDeudorCNBVResumen').val(Registro[0].FVCCalDeudorCNBV);
                        $('#CalificacionOperacionCNBVPCResumen').val(Registro[0].FVCCalificacionOperacionCNBVParteCub);
                        $('#CalificacionOperacionCNBVPEResumen').val(Registro[0].FVCCalificacionOperacionCNBVParteExp);
                        $('#ReservasPreventivasPCResumen').val(Registro[0].FDReservasPreventivasParteCub);
                        $('#ReservasPreventivasPEResumen').val(Registro[0].FDReservasPreventivasParteExp);
                        $('#PorcentajeCoberturaResumen').val(Registro[0].FDPorcentajeCobertura);
                        $('#CompSemanalResumen').val(Registro[0].FVCCompSemanal);
                        $('#CompMensualResumen').val(Registro[0].FVCCompMensual);
                        $('#CompTrimestralResumen').val(Registro[0].FVCCompTrimestral);
                        $('#CompAnualResumen').val(Registro[0].FVCCompAnual);
                        $('#TasaReferenciaResumen').val(Registro[0].FVCTasaReferencia);
                        $('#AbonoPagoMinimoResumen').val(Registro[0].FDAbonoPagoMinimo);
                        $('#TipoPagoPeriodoRequeridoResumen').val(Registro[0].FVCTipoPagoPeriodoRequerido);
                        $('#CargosComisionesPeriodicasResumen').val(Registro[0].FDCargosComisionesPeriodicas);
                        $('#CargosComisionesAnualesResumen').val(Registro[0].FDCargosComisionesAnuales);
                        $('#DispocisionesAcumuladasResumen').val(Registro[0].FDDispocisionesAcumuladas);
                        $('#CapitalFechaDisolucionResumen').val(Registro[0].FDCapitalFechaDisolución);
                        $('#InteresFechaDisolucionResumen').val(Registro[0].FDInteresFechaDisolución);
                        $('#MetodologiaResumen').val(Registro[0].FIMetodologia);
                        $('#sltEstatusCredResAlnova').val(Registro[0].FCEstatusCredito);
                        if ($('#sltEstatusCredResAlnova').val() == null) {
                            $('#sltEstatusCredResAlnova').val(Registro[0].FCEstatusCredito + " ");
                            if ($('#sltEstatusCredResAlnova').val() == null)
                                document.getElementById('sltEstatusCredResAlnova').selectedIndex = 0;
                        }
                        $('#FechaUltimaAmortizacionCorte').val(Registro[0].FDFechaUltimaAmortizacion);
                        $('#FechaProximaAmortizacionCorte').val(Registro[0].FDFechaProximaAmortizacion);
                        $('#FechaUltimaLiquidacionCorte').val(Registro[0].FDFechaUltimaLiquidacion);
                        $('#FechaProximaLiquidacionCorte').val(Registro[0].FDFechaProximaLiquidacion);
                        $('#select_IdtEmpleado').val(Registro[0].FNIndEmpleado);
                        $('#txtTotalIntProyectados').val(Registro[0].FDTotIntProyectados);
                        $('#txtTotalIntNormalesPag').val(Registro[0].FDTotIntNormalesPagados);
                        $('#txtTotalInteresesMoratoriosPag').val(Registro[0].FDTotIntMoratoriosPagados);
                        CambiarDiv('DivDatosResumen', 'DivResumenesEncontrados', false, true);

                    }

                    if (data.d.split("%%&&")[1] != "" && data.d.split("%%&&")[1] != undefined) {
                        $("#tblDatosCorteComercial").show(); // HERE
                        Registro = obtenerArregloDeJSON(data.d.split("%%&&")[1], false);
                        var fechaGet = Registro[0].fnFechaDelReporte;
                        fechaGet = (fechaGet != undefined && fechaGet != "" ? fechaGet.substring(6, 8) + "/" + fechaGet.substring(4, 6) + "/" + fechaGet.substring(0, 4) : "");
                        $("#txtFechaReporteCT").val(fechaGet);
                        $("#txtIdCreditoAsignadoInstCT").val(Registro[0].fvcIdDelCréditoAsignadoPorLaInstitución);
                        $("#txtNoDisposicionCT").val(Registro[0].FVCNumeroDeDisposicion);
                        $("#sltEstatusSICCT").val(Registro[0].fvcEstatusSic);
                        $("#sltTipoEmpresaCT").val(Registro[0].fvcTipoDeEmpresa);
                        $("#sltLineaDispuestaONoDispCT").val(Registro[0].fnLineaDispuestaONoDispuesta);
                        $("#txtRespTotalInicioPerio").val(Registro[0].fnResponsabilidadTotalAlInicioDelPeriodo);
                        $("#txtMontoTotalPagEfecXAcredEnPer").val(Registro[0].fnMontoTotalPagadoEfectivamentePorElAcreditadoEnElPeriodo);
                        $("#txtMontorecQuitasCastQuebra").val(Registro[0].fnMontoReconocidoPorQuitas_CastigosYQuebrantos);
                        $("#txtMontoRecBoniYDesc").val(Registro[0].fnMontoReconocidoPorBonificacionesYDescuentos);
                        $("#txtMontoReesRenoCambOrigSinFlujoEfec").val(Registro[0].fnMontoRestructuradoRenovadoCambiosSinFlujoEfectivo);
                        $("#txtSaldoPrinAlIncPeriod").val(Registro[0].fnSaldoDelPrincipalAlInicioDelPeriodo);
                        $("#txtTasaInteresBrutaPeriodoCT").val(Registro[0].fnTasaInterésBrutaPeriodo);
                        $("#txtMontoDispuestoMesCT").val(Registro[0].FNMontoDispuestoDeLaLineaDeCréditoEnElMes);
                        $("#txtMontoPagoExigibleAcreditadoEnPeriodo").val(Registro[0].fnMontoDelPagoExigibleAlAcreditadoEnElPeriodo_IncluyeCapitalInteresesYComisiones);
                        $("#txtMontoCapitalPagadoEfecXAcredEnPeriodo").val(Registro[0].fnMontoDeCapitalPagadoEfectivamentePorElAcreditadoEnElPeriodo);
                        $("#txtMontInteresesPagEfecXAcredEnPeriodo").val(Registro[0].fnMontoDeInteresesPagadosEfectivamentePorElAcreditadoEnElPeriodo);
                        $("#txtMontComisionPagEfecXAcredEnPeriodo").val(Registro[0].fnMontoDeComisionesPagadasEfectivamentePorElAcreditadoEnElPeriodo);
                        $("#txtMontInteresesMoraYOtrosAccPagEfecXAcredEnPeriodo").val(Registro[0].fnMontoDeInteresesMoratoriosYOtrosAccesoriosPagadosEfectivamentePorElAcreditadoEnElPeriodo);
                        $("#txtMontoBonificadoInstFinanc").val(Registro[0].fnMontoBonificadoPorLaInstitucionFinanciera);
                        $("#txtSaldoDelPrincipFinalPeriodo").val(Registro[0].fnSaldoDelPrincipalAlFinalDelPeriodo);
                        $("#txtSaldoBaseCalculoInteresesFechaCortCred").val(Registro[0].fnSaldoBaseParaElCálculoDeInteresesALaFechaDeCorteDelCrédito);
                        $("#txtInteresesResultAplicarTasaASaldoBase").val(Registro[0].fnInteresesResultantesDeAplicarLaTasaAlSaldoBase);
                        $("#txtResponsabilidadTotalFinalPeriodo").val(Registro[0].fnResponsabilidadTotalAlFinalDelPeriodo);
                        $("#sltSituaciónCredito").val(Registro[0].fnSituacionDelCrédito);
                        $("#txtNoDiasVencidos").val(Registro[0].fnNúmeroDeDiasVencidos);
                        fechaGet = Registro[0].fnFechaDelUltimoPagoCompletoExigibleRealizadoPorElAcreditado;
                        fechaGet = (fechaGet != undefined && fechaGet != "" ? fechaGet.substring(6, 8) + "/" + fechaGet.substring(4, 6) + "/" + fechaGet.substring(0, 4) : "");
                        $("#txtFechaUltimoPAgCompExigRealAcred").val(fechaGet);
                        $("#txtReservasTotales").val(Registro[0].fnReservasTotales);
                        $("#txtReservasCubiertaGarantPerson").val(Registro[0].fnReservasParteCubiertaPorGarantiasPersonales);
                        $("#txtReservasNoCubiertaGarantPerson").val(Registro[0].fnReservasParteNoCubiertaPorGarantiasPersonales);
                        $("#txtSeveridadPerdidaTotal").val(Registro[0].fnSeveridadDeLaPerdidaTotal); /*FALTA ADD CAMPO A TBL*/
                        $("#txtSeveridadPerdidadParteCubiertaGarantPerson").val(Registro[0].fnSeveridadDeLaPerdidaParteCubiertaPorGarantiasPesonales); /*FALTA ADD CAMPO A TBL*/

                        $("#txtSeveridadPerdidadParteNoCubiertaGarantPerson").val(Registro[0].fnSeveridadDeLaPerdidaParteNoCubiertaPorGarantiasPesonales);
                        $("#txtExposicionIncumplimiento").val(Registro[0].fnExposicionAlIncumplimiento);
                        $("#txtExposicionIncumpParteCubGarantPerson").val(Registro[0].fnExposicionAlIncumplimientoParteCubiertaPorGarantiasPesonales);
                        $("#txtExposicionIncumpParteNoCubGarantPerson").val(Registro[0].fnExposicionAlIncumplimientoParteNoCubiertaPorGarantiasPesonales);
                        $("#txtProbabilidadIncumplientoTotal").val(Registro[0].fnProbabilidadDeIncumplimientoTotal);
                        $("#txtProbabIncumParteCubGarantPerson").val(Registro[0].fnProbabilidadDeIncumplimientoParteCubiertaPorGarantiasPersonales);
                        $("#txtProbabIncumParteNoCubGarantPerson").val(Registro[0].fnProbabilidadDeIncumplimientoParteNoCubiertaPorGarantiasPersonales);
                        $("#sltGradoRiesgo").val(Registro[0].fvcGradoDeRiesgo);
                        $("#txtReservasTotalesMetInt").val(Registro[0].fnReservasTotales_MetodologiaInterna);
                        $("#txtSeveridadPerdidaMetInt").val(Registro[0].fnSeveridadDeLaPerdida_MetodologiaInterna);
                        $("#txtExposicionIncumpMetInt").val(Registro[0].fnExposicionAlIncumplimiento_MetodologiaInterna);
                        $("#txtProbIncumMetInt").val(Registro[0].fnProbabilidadDeIncumplimiento_MetodologiaInterna);
                        $("#txtNumeroDiasUtilizadosCalculoInteresesPeriodoReportado").val(Registro[0].fnNumeroDeDiasUtilizadosParaElCalculoDeInteresesEnElPeriodoReportado);
                        $("#txtCalfMetInterna").val(Registro[0].fvcCalifMetInterna);
                        $("#txtCalifMetInternaCubierta").val(Registro[0].fvcCalifMetInternaCUB);
                        $("#txtCalfMetInternaExpuesta").val(Registro[0].fvcCalifMetInternaEXP);
                        $("#txtCalifMetCNBVCubi").val(Registro[0].fvcCalifMetCNBVCUB);
                        $("#txtCalifMetCNBVExp").val(Registro[0].fvcCalifMetCNBVEXP);
                        $("#txtReservaMetCNBVCubierta").val(Registro[0].fnReservaMetCNBVCUB);
                        $("#txtReservaMetCNBVExpuesta").val(Registro[0].fnReservaMetCNBVEXP);
                        $("#txtMontoComisionesDevengadas").val(Registro[0].fnMontoComiDeven);
                    }
                }
                else
                    MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
        } else {
            MostrarMsj('Seleccione un corte' + ".", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    }
    else
    {
        MostrarMsj("Opcion No disponible para este Pais", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);

    }
}


//-----------------------------------------------------------------------------GUARDAR--------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////CLIENTE
function GuardarDatosCliente() {
    if (($("#tblDatosClientComercial").css("display") != "none" ? NoVacioDatosClienteSIC() : true) && NoVacioDatosCliente()) {
        Waiting(true, "Espere por favor. Cargando Información...");
        var EditarOGuardar = $('#NumeroCliente').is(":disabled") == true ? 'Editar' : 'Guardar';

        var parametrosGuardar = {
            Numero: $('#NumeroCliente').val(),
            FechaAlta: DiaMesAnio_AnioMesDia(FechaActual),
            Nombre: $('#NombreCliente').val(),
            APaterno: $('#APaternoCliente').val(),
            AMaterno: $('#AMaternoCliente').val(),
            FechaNacimiento: DiaMesAnio_AnioMesDia($('#FechaNacimientoCliente').val()),
            Sexo: $('#SexoCliente').val(),
            PersonalidadJuridica: $('#PersonalidadJuridicaCliente').val(),
            RFC: $('#RFCCliente').val(),
            CodigoPostal: $('#CodigoPostalCliente').val(),
            RegionPais: $('#RegionPaisCliente').val(),
            Pais: $('#PaisCliente').val(),
            Estado: $('#EstadoCliente').val(),
            TamanoAcreditado: $('#TamanoAcreditadoCliente').val(),
            ActividadEconomica: $('#ActividadEconomicaCliente').val(),
            GrupoEconomico: $('#GrupoEconomicoCliente').val(),
            TipoAcreditadoRelacionado: $('#TipoAcreditadoRelacionadoCliente').val(),
            SectorEcoAcred: $('#SectorEcoAcredCliente').val(),
            NumeroEmpleados: $('#NumeroEmpleadosCliente').val(),
            Buro: $('#BuroCliente').val(),
            Ingreso: $('#IngresoCliente').val(),
            Direccion: $('#DireccionCliente').val(),
            Colonia: $('#ColoniaCliente').val(),
            ClaveMunFVC: $('#inpClaveMunicipio').val(),
            ClaveEstadoFVC: EstadoFVC,
            EditarOGuardar: EditarOGuardar
        };
        peticionAjax('Default.aspx/GuardarCliente', "POST", parametrosGuardar, function (data) {
            if (!data.d.startsWith('Error:')) {
                if (data.d == "") {
                    $(TablaClientesEncontradosSIC).html("");
                    $(TablaClientesEncontradosAlnova).html("");
                    $("#fieldClientesEncontradosSIC").hide();
                    $("#fieldClientesEncontradosAlnova").hide();

                    var HTML = devuleveTblDatosDespuesDeEdicion("Cliente", 1, new Array("ID", "Nombre", "Apellido Paterno", "Apellido Materno", "Personalidad Jurídica", "Estado", "RFC", ""), new Array($('#NumeroCliente').val(), $('#NombreCliente').val(), $('#APaternoCliente').val(), $('#AMaternoCliente').val(), document.getElementById('PersonalidadJuridicaCliente').options[document.getElementById('PersonalidadJuridicaCliente').selectedIndex].text, document.getElementById('EstadoCliente').options[document.getElementById('EstadoCliente').selectedIndex].text, $('#RFCCliente').val()), "ALNOVA", "IDS");
                    $(divTblSaveClienteEncontrado).html("<div id='divTblReEdicionClientesSIC'></div><div>" + HTML + "</div>");
                    document.getElementById("ClientesEncontradosIDS").style.width = "100%";
                    $('#EditarClientesEncontrados').attr("disabled", false);
                    $('VerLineas').attr("disabled", false);
                    LimpiarDatosCliente();

                    CambiarDiv('ClientesEncotrados', 'DatosCliente', false, true);
                }
            }
            else {
                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
            }
            if ($("#tblDatosClientComercial").css("display") != "none")
                GuardarDatosClienteSIC();
            else
                Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////LINEAS
function GuardarDatosLinea() {
    if (($("#tblDatosLineaComercial").css("display") != "none" ? NoVacioDatosLineaSIC() : true) && ($("#tblDatosLineaAlnova").css("display") != "none" ? NoVacioDatosLinea() : true)) {
        if ($("#tblDatosLineaAlnova").css("display") != "none") {
            Waiting(true, "Espere por favor. Cargando Información...");
            var EditarOGuardar = $('#NumeroLinea').is(":disabled") == true ? 'Editar' : 'Guardar';
            var parametrosGuardarLinea = {
                Numero: $("#NumeroLinea").val(),
                IDCliente: $("#IdClienteLinea").val(),
                FechaAlta: DiaMesAnio_AnioMesDia($('#FechaAltaLinea').val()),
                MontoAutorizado: $("#MontoAutorizadoLinea").val(),
                FechaInicioVigencia: DiaMesAnio_AnioMesDia($('#FechaInicioVigenciaLinea').val()),
                FechaFinVigencia: DiaMesAnio_AnioMesDia($('#FechaFinVigenciaLinea').val()),
                DispCredito: $("#DispCreditoLinea").val(),
                DestinoCredito: $("#DestinoCreditoLinea").val(),
                EditarOGuardar: EditarOGuardar
            };
            peticionAjax('Default.aspx/GuardarLinea', "POST", parametrosGuardarLinea, function (data) {
                if (!data.d.startsWith('Error:')) {
                    if (data.d == "") {
                        $(TablaLineasEncontradasSIC).html("");
                        $(TablaLineasEncontradosAlnova).html("");
                        $("#fieldLineasEncontradasSIC").hide();
                        $("#fieldLineasEncontradasAlnova").hide();

                        var HTML = devuleveTblDatosDespuesDeEdicion("LineaX", 2, new Array("Numero de Linea", "Monto Autorizado", "Fecha de Inicio de Vigencia", "Fecha de Fin de Vigencia", "Disposición del Crédito", ""), new Array($('#NumeroLinea').val(), $('#MontoAutorizadoLinea').val(), $('#FechaInicioVigenciaLinea').val(), $('#FechaFinVigenciaLinea').val(), document.getElementById('DispCreditoLinea').options[document.getElementById('DispCreditoLinea').selectedIndex].text), "ALNOVA", "NLS");
                        $(divTblSaveLineaEncontrada).html("<div id='divTblReEdicionLineasSIC'></div><div>" + HTML + "</div>");
                        $('#EditarLinea').attr("disabled", false);
                        $('#VerDisposiciones').attr("disabled", false);
                        LimpiarDatosLinea();
                        CambiarDiv('LineasEncontradas', 'DatosLinea', false, true);
                    }
                }
                else
                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
                Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
        }
        else if ($("#tblDatosLineaComercial").css("display") != "none")
            GuardarDatosLineaSIC();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////DISPOSICIONES
function GuardarDatosDisposicion() {
    if (($("#tblDatosDisposicionComercial").css("display") != "none" ? NoVacioDatosDisposicionesSIC() : true) && ($("#tblDatosDisposicionAlnova").css("display") != "none" ? NoVacioDatosDisposicion() : true)) {
        if ($("#tblDatosDisposicionAlnova").css("display") != "none") {

            Waiting(true, "Espere por favor. Cargando Información...");
            var EditarOGuardar = $('#NumeroDisposicion').is(":disabled") == true ? 'Editar' : 'Guardar';

            var Plazo = $('#PlazoDisposicion').val();
            while (Plazo.length < 4)
                Plazo = '0' + Plazo;
            PeriodicidadPlazo = $('#PeriodicidadPlazoDisposicion').val() + Plazo;

            var Hoy = new Date();
            var SigMes = new Date(Hoy.getFullYear(), Hoy.getMonth() + 1, 1);
            var MiliSec = SigMes.getTime() - Hoy.getTime() - (1 * 60 * 60 * 24);
            var FechaCorte = new Date();
            FechaCorte.setTime(Hoy.getTime() + MiliSec);
            var FechaFormalizacion = new Date(DiaMesAnio_AnioMesDia($('#FechaFormalizacionDisposicion').val()).replace('/', ', '));
            if ($('#numeroCreditoPrecedenteDisposicion').val() == "")
                $('#numeroCreditoPrecedenteDisposicion').val('null');

            var parametrosGuardarDisposicion = {
                Numero: $("#NumeroDisposicion").val(),
                NumeroLinea: $("#NumeroLineaDisposicion").val(),
                FechaFormalizacion: DiaMesAnio_AnioMesDia($('#FechaFormalizacionDisposicion').val()),
                FechaDeinicio: DiaMesAnio_AnioMesDia($('#FechadeInicio').val()),
                EntidadOficinaCredito: $("#EntidadOficinaCreditoDisposicion").val(),
                DigitoVerificador: $("#DigitoVerificadorDisposicion").val(),
                Moneda: $("#MonedaDisposicion").val(),
                FormaAmortizacion: $("#FormaAmortizacionDisposicion").val(),
                MontoAmortizacion: $("#MontoAmortizacionDisposicion").val(),
                Plazo: PeriodicidadPlazo,
                PeriodicidadCapital: $("#PeriodicidadCapitalDisposicion").val(),
                PeriodicidadInteres: $("#PeriodicidadInteresDisposicon").val(),
                FechaVencimiento: DiaMesAnio_AnioMesDia($('#FechaVencimientoDisposicion').val()),
                FrecuenciaRevisionTasa: $("#FrecuenciaRevisionTasaDisposicion").val(),
                PorcentajeGarantizaAval: $("#PorcentajeGarantizaAvalDisposicion").val(),
                TipoGarantia: $("#TipoGarantiaDisposicion").val(),
                ValorGarantia: $("#ValorGarantiaDisposicion").val(),
                FechaValuacionGarantia: DiaMesAnio_AnioMesDia($('#FechaValuacionGarantiaDisposicion').val()),
                GradoPrelacionGarantia: $("#GradoPrelacionGarantiaDisposicion").val(),
                Sistema: $("#SistemaDisposicion").val(),
                Clave: $("#ClaveDisposicion").val(),
                DestinoCredito: $("#DestinoCreditoDisposicion").val(),
                TipoFacturacion: $("#TipoFacturacionDisposicion").val(),
                Garantia: $("#GarantiaDisposicion").val(),
                IndicadorFondeo: $("#IndicadorFondeoDisposicion").val(),
                TipoAlta: $("#tipoAltaDisposicion").val(),
                Sucursal: $("#SucursalDisposicion").val(),
                TipoBaja: $("#tipoBajaDisposicion").val(),
                NumeroCreditoPrecedente: $("#numeroCreditoPrecedenteDisposicion").val(),
                FormaDisolucion: $("#formaDisolucionDisposicion").val(),
                EditarOGuardar: EditarOGuardar
            };

            peticionAjax('Default.aspx/GuardarDisposicion', "POST", parametrosGuardarDisposicion, function (data) {
                if (!data.d.startsWith('Error:')) {
                    if (data.d == "") {
                        $(TablaDisposicionesEncontradasSIC).html("");
                        $(TablaDisposicionesEncontradasAlnova).html("");
                        $("#fieldDisposicionesEncontradasSIC").hide();
                        $("#fieldDisposicionesEncontradasAlnova").hide();

                        var HTML = devuleveTblDatosDespuesDeEdicion("DisposicionX", 3, new Array("Numero de Disposición", "Fecha de Formalización", "Moneda", "Producto", "SubProducto", "Descripción", "Descripción 2", ""),
                        new Array($('#NumeroDisposicion').val(), $('#FechaFormalizacionDisposicion').val(), document.getElementById('MonedaDisposicion').options[document.getElementById('MonedaDisposicion').selectedIndex].text,
                        document.getElementById('ProductoDisposicion').options[document.getElementById('ProductoDisposicion').selectedIndex].text, document.getElementById('SubProductoDisposicion').options[document.getElementById('SubProductoDisposicion').selectedIndex].text,
                        document.getElementById('DescripcionDisposicion').options[document.getElementById('DescripcionDisposicion').selectedIndex].text, document.getElementById('Descripcion2Disposicion').options[document.getElementById('Descripcion2Disposicion').selectedIndex].text), "ALNOVA", "NDS");
                        $(divTblSaveDisposicionEncontrada).html("<div id='divTblReEdicionDisposicionesSIC'></div><div>" + HTML + "</div>");
                        $('#BotonEditarDisposicion').attr("disabled", false);
                        $('#BotonVerResumenes').attr("disabled", false);
                        LimpiarDatosDisposicion();
                        CambiarDiv('DivDisposicionesEncontradas', 'DivDatosDisposicion', false, true);
                    }
                }
                else
                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);

                //                if (!data.d.startsWith('Error:')) {
                //                    if (data.d == "") {
                //                        var HTML = '<span style="color:Green;font-weight:bold">La disposición se ha guardado de forma correcta.</span><br /><br />';
                //                        HTML += '<table id="DisposicionesEncontradasNDS" class="dataGridDatos"><thead><tr><th >Numero de Disposición</th ><th >Fecha de Formalización</th ><th >Moneda</th ><th >Producto</th ><th >SubProducto</th ><th >Descripción</th ><th >Descripción 2</th ><th ><input id="RadioEditarDisposicion" name="EditarDisposicionX" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
                //                        HTML += '<tr style="background: rgb(198, 229, 204);" id="Disposicion' + $('#NumeroDisposicion').val() + '"><td >' + $('#NumeroDisposicion').val() + '</td><td >' + $('#FechaFormalizacionDisposicion').val() + '</td><td >' + document.getElementById('MonedaDisposicion').options[document.getElementById('MonedaDisposicion').selectedIndex].text + '</td><td >' + 
                //                        document.getElementById('ProductoDisposicion').options[document.getElementById('ProductoDisposicion').selectedIndex].text + '</td><td >' + document.getElementById('SubProductoDisposicion').options[document.getElementById('SubProductoDisposicion').selectedIndex].text + '</td><td >' + 
                //                        document.getElementById('DescripcionDisposicion').options[document.getElementById('DescripcionDisposicion').selectedIndex].text + '</td><td >' + document.getElementById('Descripcion2Disposicion').options[document.getElementById('Descripcion2Disposicion').selectedIndex].text + '</td><td ><input id="RadioEditarDisposicion" ';
                //                        HTML += 'checked="checked" ';
                //                        HTML += 'name="EditarDisposicionX" type="radio"  value="' + $('#NumeroDisposicion').val() + '" /></td></tr>';
                //                        HTML += '</tbody></table>';
                //                        $(TablaDisposicionesEncontradas).html(HTML);
                //                        document.getElementById("DisposicionesEncontradasNDS").style.width = "100%";
                //                        $('#BotonEditarDisposicion').attr("disabled", false);
                //                        $('#BotonVerResumenes').attr("disabled", false);
                //                        LimpiarDatosDisposicion();
                //                        CambiarDiv('DivDisposicionesEncontradas', 'DivDatosDisposicion', false, true);
                //                    }
                //                }
                //                else {
                //                    //$(TablaDisposicionesEncontradas).html('<span style="color:Red;font-weight:bold">' + data.d + '.</span><br /><br />');
                //                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
                //                }
                Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
        }
        else if ($("#tblDatosDisposicionComercial").css("display") != "none")
            GuardarDatosDisposicionSIC();
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////RESUMEN
function GuardarDatosResumen() {
    if (/*($("#tblDatosCorteComercial").css("display") != "none" ? NoVacioDatosCortesSIC() : true) &&*/
     ($("#tblDatosCorteAlnova").css("display") != "none" ? NoVacioDatosResumen() : true)) {
        if ($("#tblDatosCorteAlnova").css("display") != "none") {
            // if (NoVacioDatosResumen()) {
            var EditarOGuardar = '';
            if ($('#AnioMesDiaResumen').is(":disabled") == true)
                EditarOGuardar += 'Editar';
            else
                EditarOGuardar += 'Guardar';
            Waiting(true, "Espere por favor. Cargando Información...");
            var parametrosGuardarCorte = {
                AnioMesDia: DiaMesAnio_AnioMesDia($('#AnioMesDiaResumen').val()),
                NumeroDisposicion: $("#NumeroDisposicionResumen").val(),
                PagoMinimo: $("#PagoMinimoResumen").val(),
                MontoAmortizacion: $("#MontoAmortizacionResumen").val(),
                MontoInteresPorCobrar: $("#MontoInteresePorCobrarResumen").val(),
                TasaInteresPorCobrar: $("#TasaInteresPorCobrarResumen").val(),
                TipoTasa: $("#TipoTasaResumen").val(),
                AjusteTasaReferencia: $("#AjusteTasaReferenciaResumen").val(),
                RecibosImpagados: $("#RecibosImpagadosResumen").val(),
                FechaUltimaSitDeuda: DiaMesAnio_AnioMesDia($('#FechaUltimaSitDeudaResumen').val()),
                FechaRecibAntiguoImpagado: DiaMesAnio_AnioMesDia($('#FechaRecibAntiguoImpagadoResumen').val()),
                DiasEstatus: $("#DiasEstatusResumen").val(),
                DiasAtraso: $("#DiasAtrasoResumen").val(),
                CapitalVigente: $("#CapitalVigenteResumen").val(),
                CapitalTransitorio: $("#CapitalTransitorioResumen").val(),
                CapitalVencidoNoExigible: $("#CapitalVencidoNoExigibleResumen").val(),
                CapitalVencidoExigible: $("#CapitalVencidoExigibleResumen").val(),
                InteresDevengado: $("#InteresDevengadoResumen").val(),
                InteresVigente: $("#InteresVigenteResumen").val(),
                InteresTransitorio: $("#InteresTransitorioResumen").val(),
                InteresVencido: $("#InteresVencidoResumen").val(),
                InteresSuspendido: $("#InteresSuspendidoResumen").val(),
                InteresesFinanciadosCapitalizados: $("#InteresesFinanciadosCapitalizadosResumen").val(),
                Anticipos: $("#AnticiposResumen").val(),
                SituacionCredito: $("#SituacionCreditoResumen").val(),
                CalificacionDeudorCNBV: $("#CalificacionDeudorCNBVResumen").val(),
                CalificacionOperacionCNBVPC: $("#CalificacionOperacionCNBVPCResumen").val(),
                CalificacionOperacionCNBVPE: $("#CalificacionOperacionCNBVPEResumen").val(),
                ReservasPreventivasPC: $("#ReservasPreventivasPCResumen").val(),
                ReservasPreventivasPE: $("#ReservasPreventivasPEResumen").val(),
                PorcentajeCobertura: $("#PorcentajeCoberturaResumen").val(),
                CompSemanal: $("#CompSemanalResumen").val(),
                CompMensual: $("#CompMensualResumen").val(),
                CompTrimestral: $("#CompTrimestralResumen").val(),
                CompAnual: $("#CompAnualResumen").val(),
                TasaReferencia: $("#TasaReferenciaResumen").val(),
                AbonoPagoMinimo: $("#AbonoPagoMinimoResumen").val(),
                TipoPagoPeriodoRequerido: $("#TipoPagoPeriodoRequeridoResumen").val(),
                CargosComisionesPeriodicas: $("#CargosComisionesPeriodicasResumen").val(),
                CargosComisionesAnuales: $("#CargosComisionesAnualesResumen").val(),
                DispocisionesAcumuladas: $("#DispocisionesAcumuladasResumen").val(),
                CapitalFechaDisolucion: $("#CapitalFechaDisolucionResumen").val(),
                InteresFechaDisolucion: $("#InteresFechaDisolucionResumen").val(),
                Metodologia: $("#MetodologiaResumen").val(),
                EstatusdelCredito: $("#sltEstatusCredResAlnova").val(),
                FechaUltimaAmortizacionCorte: DiaMesAnio_AnioMesDia($('#FechaUltimaAmortizacionCorte').val()),
                FechaProximaAmortizacionCorte: DiaMesAnio_AnioMesDia($('#FechaProximaAmortizacionCorte').val()),
                FechaUltimaLiquidacionCorte: DiaMesAnio_AnioMesDia($('#FechaUltimaLiquidacionCorte').val()),
                FechaProximaLiquidacionCorte: DiaMesAnio_AnioMesDia($('#FechaProximaLiquidacionCorte').val()),
                IdentificadorEmpleado: $("#select_IdtEmpleado").val(),
                EditarOGuardar: EditarOGuardar,
                fdTotalIntProyectados: $("#txtTotalIntProyectados").val(),
                fdTotalIntNormalesPag: $("#txtTotalIntNormalesPag").val(),
                fdTotalMoratoriosPag: $("#txtTotalInteresesMoratoriosPag").val()
            };

            peticionAjax('Default.aspx/GuardarCorte', "POST", parametrosGuardarCorte, function (data) {
                if (!data.d.startsWith('Error:')) {
                    if (data.d == "") {
                        var Interes = parseFloat($('#InteresDevengadoResumen').val()) + parseFloat($('#InteresVigenteResumen').val()) + parseFloat($('#InteresTransitorioResumen').val()) + parseFloat($('#InteresVencidoResumen').val());
                        //                    var HTML = '<span style="color:Green;font-weight:bold">El reporte se ha guardado de forma correcta.</span><br /><br />';
                        //                    HTML += '<table id="tblResumenFind" class="dataGridDatos"><thead><tr><th >Dia - Mes - Año</th ><th >Capital Vigente</th ><th >Capital Transitorio</th ><th >Capital Vencido No Exigible</th ><th >Capital Vencido Exigible</th ><th >Interés</th ><th >Interés Suspendido</th ><th >Situación del Crédito</th ><th ><input id="RadioEditarResumen" name="EditarResumenX" type="radio"  value="" style="display: none" /></th ><th ></th ></tr></thead><tbody style="text-align: left;">';
                        //                    HTML += '<tr style="background: rgb(198, 229, 204);"><td >' + $('#AnioMesDiaResumen').val() + '</td><td >' + $('#CapitalVigenteResumen').val() + '</td><td >' + $('#CapitalTransitorioResumen').val() + '</td><td >' + $('#CapitalVencidoNoExigibleResumen').val() + '</td><td >' + $('#CapitalVencidoExigibleResumen').val() + '</td><td >' + Interes + '</td><td >' + $('#InteresSuspendidoResumen').val() + '</td><td >' + document.getElementById('SituacionCreditoResumen').options[document.getElementById('SituacionCreditoResumen').selectedIndex].text + '</td><td >' + document.getElementById('sltEstatusCredResAlnova').options[document.getElementById('sltEstatusCredResAlnova').selectedIndex].text + '</td><td ><input id="RadioEditarResumen" ';
                        //                    HTML += 'checked="checked" ';
                        //                    HTML += 'name="EditarResumenX" type="radio"  value="' + $('#AnioMesDiaResumen').val() + '/' + $('#NumeroDisposicionResumen').val() + '" /></td></tr>';
                        //                    HTML += '</tbody></table>';
                        //                    $(TablaResumenesEncontrados).html(HTML);
                        $('#msgRpt').html('El reporte se ha guardado de forma correcta.');
                        BucaResumenNuevo();
                        //document.getElementById("tblResumenFind").style.width = "100%";
                        $('#EditarResumen').attr("disabled", false);
                        CambiarDiv('DivResumenesEncontrados', 'DivDatosResumen', false, true);
                        LimpiarDatosResumen();
                    }
                }
                else {
                    //$(DivResumenesEncontrados).html('<span style="color:Red;font-weight:bold">' + data.d + '.</span><br /><br />');
                    MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
                }
                Waiting(false, "Espere por favor. Cargando Información...");
            }, null);
        }
        else if ($("#tblDatosCorteComercial").css("display") != "none")
            GuardarDatosCorte();
    }
}

//------------------------------------------------------------------------------------BTN NUEVO----------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////CLIENTE
function FNuevoCliente() {
    //if (document.forms[0]["EditarCliente"] == undefined) return;
    //$('#tblDatosClientComercial').hide();
    //$("#tblDatosClienteAlnova").show();
    //if ($('#DivClientes').is(":disabled") == false) {
    //    CambiarDiv('DatosCliente', 'ClientesEncotrados', false, true);
    //    $("#CancelarNuevoCliente").attr("lang", "ab");
    if (idpaislogin == 1) {
        CambiarDiv('DatosCliente', 'BuscadorCliente', false, true);
        $('#CancelarNuevoCliente').attr('lang', 'aa'); $('#tblDatosClientComercial').hide();
    }
    else {
        MostrarMsj("Opcion No disponible para este Pais", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
    }

   // }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////LINEAs
function FNuevaLinea() {
    if (idpaislogin == 1) {
        if (document.forms[0]["EditarCliente"] == undefined) return;
        $("#tblDatosLineaComercial").hide();
        $("#tblDatosLineaAlnova").show();
        document.getElementById("DatosLinea").style.height = "auto";
        if ($('#Lineas').is("disabled") == false) {
            CambiarDiv('DatosLinea', 'LineasEncontradas', false, true);
            var i = 0;
            for (i = 0; i < document.forms[0]["EditarCliente"].length; i++) {
                if (document.forms[0]["EditarCliente"][i].checked)
                    break;
            }
            $('#IdClienteLinea').val(document.forms[0]["EditarCliente"][i].value);
            $('#txtIdClienteLinea').val(document.forms[0]["EditarCliente"][i].value);
            $('#txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia').attr("disabled", false);
            $('#txtNumeroDeConsultaRealizadaSociedadInformaciónCrediticia').val("");
        }
    }
    else
    {
        MostrarMsj("Opcion No disponible para este Pais", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////DISPOSICIONES
function FNuevaDisposicion() {
    if (idpaislogin == 1) {
        if (document.forms[0]["EditarLineaX"] == undefined) return;
        $("#tblDatosDisposicionComercial").hide();
        $("#tblDatosDisposicionAlnova").show();
        if ($('#DivDisposiciones').is(":disabled") == false) {
            CambiarDiv('DivDatosDisposicion', 'DivDisposicionesEncontradas', false, true);
            var i = 0;
            for (i = 0; i < document.forms[0]["EditarLineaX"].length; i++) {
                if (document.forms[0]["EditarLineaX"][i].checked)
                    break;
            }
            var idLineaBus = (document.forms[0]["EditarLineaX"].length != undefined ? document.forms[0]["EditarLineaX"][i].value : document.forms[0]["EditarLineaX"].value);
            $('#NumeroLineaDisposicion').val(idLineaBus);
        }
    }
    else
    {
        MostrarMsj("Opcion No disponible para este Pais", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);

    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////RESUMEN
function FNuevoResumen() {
    if (idpaislogin == 1) {
        if (document.forms[0]["EditarDisposicionX"] == undefined) return;
        $("#tblDatosCorteComercial").hide();
        $("#tblDatosCorteAlnova").show();
        document.getElementById("DivDatosResumen").style.height = "auto";
        if ($('#DivResumenes').attr("disabled", false)) {
            CambiarDiv('DivDatosResumen', 'DivResumenesEncontrados', false, true);
            var i = 0;
            for (i = 0; i < document.forms[0]["EditarDisposicionX"].length; i++) {
                if (document.forms[0]["EditarDisposicionX"][i].checked)
                    break;
            }
            $('#NumeroDisposicionResumen').val(document.forms[0]["EditarDisposicionX"][i].value);
        }
    }
    else {
        MostrarMsj("Opcion No disponible para este Pais", "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);

    }
}

//--------------------------------------------------------------------------------------VALIDAR  DATOS NO VACIOS
//////////////////////////////////////////////////////////////////////////////////////////////////////////CLIENTE
function NoVacioDatosCliente() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("NumeroCliente", "Número de Cliente"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("NombreCliente", "Nombre"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("APaternoCliente", "Apellido Paterno"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("AMaternoCliente", "Apellido Materno"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FechaNacimientoCliente", "Fecha de Nacimiento"); else return dispararReturn;
    var Hoy = new Date();
    var FechaNacimiento = new Date(DiaMesAnio_AnioMesDia($('#FechaNacimientoCliente').val()).replace('/', ', '));
    if (Hoy < FechaNacimiento) {
        $('#FechaNacimientoCliente').focus();
        MostrarMsj("La Fecha de Nacimiento no puede ser mayor a la fecha actual.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        return false;
    }

    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("PersonalidadJuridicaCliente", "Personalidad Jurídica"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("SexoCliente", "Sexo", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("EstadoCliente", "Estado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("RegionPaisCliente", "Localidad o Municipio", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("GrupoEconomicoCliente", "Grupo Económico", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("RFCCliente", "RFC"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CodigoPostalCliente", "Código Postal"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("TipoAcreditadoRelacionadoCliente", "Tipo de Acreditado Relacionado", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("NumeroEmpleadosCliente", "Número de Empleados"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("AgrupacionCliente", "Agrupación", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("RamaCliente", "Rama", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("SectorCliente", "Sector", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("SubSectorCliente", "Subsector", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("GrupoCliente", "Grupo", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ActividadEconomicaCliente", "Actividad Económica", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("TamanoAcreditadoCliente", "Tamaño del Acreditado", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("SectorEcoAcredCliente", "Sector Eco Acred", true, false); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("BuroCliente", "Buró de Consulta"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("IngresoCliente", "Ingreso Mensual"); else return dispararReturn;
    return dispararReturn;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////LINEA
function NoVacioDatosLinea() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("NumeroLinea", "Número de Línea"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("IdClienteLinea", "Número de Cliente"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FechaAltaLinea", "Fecha de Alta"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("MontoAutorizadoLinea", "Monto autorizado de la Línea de Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FechaInicioVigenciaLinea", "Fecha de Inicio de Vigencia"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FechaFinVigenciaLinea", "Fecha de Fin de Vigencia"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("DispCreditoLinea", "Dsip Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("DestinoCreditoLinea", "Destino del Crédito"); else return dispararReturn;
    return dispararReturn;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////DISPOSICIONES
function NoVacioDatosDisposicion() {
    var dispararReturn = true;
    dispararReturn = VerficaCadenaVaciaCampo("NumeroDisposicion", "Número de Disposición");
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("NumeroLineaDisposicion", "Número de Línea"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FechaFormalizacionDisposicion", "Fecha de Formalización"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("EntidadOficinaCreditoDisposicion", "Entidad Oficina Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("DigitoVerificadorDisposicion", "Dígito Verificador"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("MonedaDisposicion", "Moneda"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FormaAmortizacionDisposicion", "Forma de Amortización"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("MontoAmortizacionDisposicion", "Monto de Amortización"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("PeriodicidadPlazoDisposicion", "Periodicidad Plazo Disposición"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("PlazoDisposicion", "Plazo Disposición"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("PeriodicidadCapitalDisposicion", "Periodicidad de el Capital"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("PeriodicidadInteresDisposicon", "Periodicidad de el Interés"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FechaVencimientoDisposicion", "Fecha de Vencimiento"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FrecuenciaRevisionTasaDisposicion", "Frecuencia de Revisión de la Tasa"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("PorcentajeGarantizaAvalDisposicion", "Porcentaje Garantizado por el Aval"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("TipoGarantiaDisposicion", "Tipo de Garantía"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ValorGarantiaDisposicion", "Valor de la Garantía"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FechaValuacionGarantiaDisposicion", "Fecha de Valuación de la Garantía"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("GradoPrelacionGarantiaDisposicion", "Grado de Prelación"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("SistemaDisposicion", "Sistema"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ProductoDisposicion", "Producto"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("SubProductoDisposicion", "Subproducto"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("DescripcionDisposicion", "Descripción"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("Descripcion2Disposicion", "Descripción 2"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ClaveDisposicion", "Clave"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("DestinoCreditoDisposicion", "Destino del Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("TipoFacturacionDisposicion", "Tipo de Facturación"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("GarantiaDisposicion", "Garantía"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("IndicadorFondeoDisposicion", "Indicador de Fondeo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("formaDisolucionDisposicion", "Forma de Disolución"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("numeroCreditoPrecedenteDisposicion", "Crédito Presedente"); else return dispararReturn;
    return dispararReturn;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////RESUMEN
function NoVacioDatosResumen() {
    var dispararReturn = true;
    dispararReturn = VerficaCadenaVaciaCampo("AnioMesDiaResumen", "Año - Mes - Dia");
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("NumeroDisposicionResumen", "Número de Disposición"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("PagoMinimoResumen", "Pago Mínimo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("MontoAmortizacionResumen", "Monto de Amortización"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("MontoInteresePorCobrarResumen", "Monto de Intereses por Cobrar"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("TasaInteresPorCobrarResumen", "Tasa Interés por Cobrar"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("TasaReferenciaResumen", "Tasa de Referencia"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("AjusteTasaReferenciaResumen", "Ajuste en la Tasa de Referencia"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("RecibosImpagadosResumen", "Recibos Impagados"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FechaUltimaSitDeudaResumen", "Fecha Última Sit de Deuda"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FechaRecibAntiguoImpagadoResumen", "Fecha Recibo Antiguo Impagado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("DiasEstatusResumen", "Dias Estatus"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("DiasAtrasoResumen", "Dias Atraso"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CapitalVigenteResumen", "Capital Vigente"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CapitalTransitorioResumen", "Capital Transitorio"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CapitalVencidoNoExigibleResumen", "Capital Vencido no Exigible"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CapitalVencidoExigibleResumen", "Capital Vencido Exigible"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("InteresDevengadoResumen", "Interés Devengado"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("InteresVigenteResumen", "Interés Vigente"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("InteresTransitorioResumen", "Interés Transitorio"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("InteresVencidoResumen", "Interés Vencido"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("InteresSuspendidoResumen", "Interés Suspendido"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("InteresesFinanciadosCapitalizadosResumen", "Intereses Financiados Recapitalizados"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("SituacionCreditoResumen", "Situación del Crédito"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CalificacionDeudorCNBVResumen", "Calificación Deudor CNBV"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CalificacionOperacionCNBVPEResumen", "Calificación Operación CNBV"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ReservasPreventivasPCResumen", "Reservas Preventivas Parte Cubierta"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("ReservasPreventivasPEResumen", "Reservas Preventivas Parte Expuesta"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("PorcentajeCoberturaResumen", "Porcentaje de Cobertura"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CompSemanalResumen", "Comp Semanal"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CompMensualResumen", "Comp Mensual"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CompTrimestralResumen", "Comp Trimestral"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CompAnualResumen", "Comp Anual"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("TasaReferenciaResumen", "Tasa de Referencia"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("AbonoPagoMinimoResumen", "Abono Pago Mínimo"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("TipoPagoPeriodoRequeridoResumen", "Tipo Pago Periodo Requerido"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CargosComisionesPeriodicasResumen", "Cargos Comisiones Periodicas"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CargosComisionesAnualesResumen", "Cargos Comisiones Anuales"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("DispocisionesAcumuladasResumen", "Disposiciones Acumuladas"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("CapitalFechaDisolucionResumen", "Capital Fecha Disolución"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("InteresFechaDisolucionResumen", "Interés Fecha Disolución"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("MetodologiaResumen", "Metodología"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtTotalIntProyectados", "Total Intereses Proyectados"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtTotalIntNormalesPag", "Total Intereses Normales Pagados"); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("txtTotalInteresesMoratoriosPag", "Total Intereses Moratorios Pagados"); else return dispararReturn;
    return dispararReturn;
}


function NoVacioDatosClienteRFC() {
    var dispararReturn = true;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("NombreCliente", "Nombre", false, true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("APaternoCliente", "Apellido Paterno", false, true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("AMaternoCliente", "Apellido Materno", false, true); else return dispararReturn;
    if (dispararReturn) dispararReturn = VerficaCadenaVaciaCampo("FechaNacimientoCliente", "Fecha de Nacimiento", false, true); else return dispararReturn;
    return dispararReturn;
}

//function VerficaCadenaVaciaCampo(Campo, mensaje, esRFC) {
//    if ($('#' + Campo).val() == "") {
//        $('#' + Campo).focus();
//        document.getElementById(Campo).style.border = "1px solid Red";
//        MostrarMsj('El campo <span style="font-weight:bold;">' + mensaje + ' </span>' + (esRFC == true ? " es necesario para calcular el RFC" : ' no puede estar en blanco.'), "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
//        return false;
//    }
//    else { document.getElementById(Campo).style.border = "1px solid Gray"; return true; }
//}
function VerficaCadenaVaciaCampo(Campo, mensaje, esCombo, esRFC) {
    if ($('#' + Campo).val() == null || $('#' + Campo).val().trim() == "" || (esCombo && document.getElementById(Campo).options.length > 1 && $('#' + Campo).val() == "-1")) {
        $('#' + Campo).focus();
        document.getElementById(Campo).style.border = "1px solid Red";
        MostrarMsj(esCombo ? ("Seleccione una opción en el campo <span style='font-weight: bold;'>" + mensaje + "</span>") : ('El campo <span style="font-weight:bold;">' + mensaje + ' </span>' + (esRFC == true ? " es necesario para calcular el RFC" : ' no puede estar en blanco.')), "Mensaje", false, true, false, "", "Aceptar", "", 280, 140, null, null, null);
        return false;
    }
    else { document.getElementById(Campo).style.border = "1px solid Gray"; return true; }
}

//-----------------------------------------------------------Limpiar Campos----------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////CLIENTE
function LimpiarDatosCliente() {
    LimpiarCampo("NumeroCliente", "", true, true, false);
    LimpiarCampo("NombreCliente", "", true, false, false);
    LimpiarCampo("APaternoCliente", "", true, false, false);
    LimpiarCampo("AMaternoCliente", "", true, false, false);
    LimpiarCampo("FechaNacimientoCliente", FechaActual, true, false, false);
    LimpiarCampo("SexoCliente", "", false, false, true);
    LimpiarCampo("PersonalidadJuridicaCliente", "", true, false, false);
    LimpiarCampo("RFCCliente", "", true, false, false);
    LimpiarCampo("CodigoPostalCliente", "", true, false, false);
    LimpiarCampo("inpClaveMunicipio", "", true, false, false);
    LimpiarCampo("EstadoCliente", "", false, false, true);
    //LlenarRegion($('#EstadoCliente').val());
    LimpiarCampo("TamanoAcreditadoCliente", "", false, false, true);
    // LlenarAgrupacion();
    LimpiarCampo("GrupoEconomicoCliente", "", false, false, true);
    LimpiarCampo("TipoAcreditadoRelacionadoCliente", "", false, false, true);
    LimpiarCampo("NumeroEmpleadosCliente", "", true, false, false);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////LINEA
function LimpiarDatosLinea() {
    LimpiarCampo("NumeroLinea", "", true, true, false);
    //LimpiarCampo("IdClienteLinea", "", true, false, false);
    LimpiarCampo("FechaAltaLinea", FechaActual, true, false, false);
    LimpiarCampo("MontoAutorizadoLinea", "", true, false, false);
    LimpiarCampo("FechaInicioVigenciaLinea", FechaActual, true, false, false);
    LimpiarCampo("FechaFinVigenciaLinea", FechaActual, true, false, false);
    LimpiarCampo("DispCreditoLinea", "", false, false, true);
    LimpiarCampo("DestinoCreditoLinea", "", false, false, true);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////DISPOSICIONES
function LimpiarDatosDisposicion() {
    LimpiarCampo("NumeroDisposicion", "", true, true, false);
    LimpiarCampo("NumeroLineaDisposicion", "", true, false, false);
    LimpiarCampo("FechaFormalizacionDisposicion", FechaActual, true, false, false);
    LimpiarCampo("EntidadOficinaCreditoDisposicion", "", true, false, false);
    LimpiarCampo("DigitoVerificadorDisposicion", "", true, false, false);
    LimpiarCampo("MonedaDisposicion", "", false, false, true);
    LimpiarCampo("FormaAmortizacionDisposicion", "", true, false, false);
    LimpiarCampo("MontoAmortizacionDisposicion", "", true, false, false);
    LimpiarCampo("PeriodicidadPlazoDisposicion", "", false, false, true);
    LimpiarCampo("PlazoDisposicion", "", true, false, false);
    LimpiarCampo("PeriodicidadCapitalDisposicion", "", false, false, true);
    LimpiarCampo("PeriodicidadInteresDisposicon", "", false, false, true);
    LimpiarCampo("FechaVencimientoDisposicion", FechaActual, true, false, false);
    LimpiarCampo("FuenteFondeoDisposicion", "", true, true, false);
    LimpiarCampo("PorcentajeGarantiaFondosDisposicion", "", true, true, false);
    LimpiarCampo("FrecuenciaRevisionTasaDisposicion", "", true, false, false);
    LimpiarCampo("PorcentajeGarantizaAvalDisposicion", "", true, false, false);
    LimpiarCampo("TipoGarantiaDisposicion", "", false, false, true);
    LimpiarCampo("ValorGarantiaDisposicion", "", true, false, false);
    LimpiarCampo("FechaValuacionGarantiaDisposicion", FechaActual, true, false, false);
    LimpiarCampo("GradoPrelacionGarantiaDisposicion", "", true, false, false);

    Sistema = '';
    Producto = '';
    SubProducto = '';
    Descripcion = '';
    Descripcion2 = '';
    Clave = '';

    LlenarSistema();
    LimpiarCampo("CarteraRevolventeDisposicion", "", false, true, true);
    LimpiarCampo("ClasificacionContableDisposicion", "", false, true, false);
    LimpiarCampo("DestinoCreditoDisposicion", "", false, false, true);
    LimpiarCampo("CategoriaCreditoDisposicion", "", true, true, false);
    LimpiarCampo("TipoFacturacionDisposicion", "", true, false, false);
    LimpiarCampo("GarantiaDisposicion", "", false, false, true);
    LimpiarCampo("IndicadorFondeoDisposicion", "", true, false, false);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////RESUMEN
function LimpiarDatosResumen() {
    LimpiarCampo("AnioMesDiaResumen", FechaActual, true, true, false);
    $('#AnioMesDiaResumen').next().attr("disabled", false);
    LimpiarCampo("NumeroDisposicionResumen", "", true, false, false);
    LimpiarCampo("PagoMinimoResumen", "", true, false, false);
    LimpiarCampo("MontoAmortizacionResumen", "", true, false, false);
    LimpiarCampo("TasaInteresPorCobrarResumen", "", true, false, false);
    LimpiarCampo("TasaReferenciaResumen", "", false, false, true);
    LimpiarCampo("AjusteTasaReferenciaResumen", "", true, false, false);
    LimpiarCampo("RecibosImpagadosResumen", "", true, false, false);
    LimpiarCampo("FechaUltimaSitDeudaResumen", FechaActual, true, false, false);
    LimpiarCampo("FechaRecibAntiguoImpagadoResumen", FechaActual, true, false, false);
    LimpiarCampo("DiasEstatusResumen", "0", true, false, false);
    LimpiarCampo("DiasAtrasoResumen", "0", true, false, false);
    LimpiarCampo("CapitalVigenteResumen", "", true, false, false);
    LimpiarCampo("CapitalTransitorioResumen", "", true, false, false);
    LimpiarCampo("CapitalVencidoNoExigibleResumen", "", true, false, false);
    LimpiarCampo("CapitalVencidoExigibleResumen", "", true, false, false);
    LimpiarCampo("InteresDevengadoResumen", "", true, false, false);
    LimpiarCampo("InteresVigenteResumen", "", true, false, false);
    LimpiarCampo("InteresTransitorioResumen", "", true, false, false);
    LimpiarCampo("InteresVencidoResumen", "", true, false, false);
    LimpiarCampo("InteresSuspendidoResumen", "", true, false, false);
    LimpiarCampo("InteresesFinanciadosCapitalizadosResumen", "", true, false, false);
    LimpiarCampo("AnticiposResumen", "", true, false, false);
    LimpiarCampo("SituacionCreditoResumen", "", false, false, true);
    LimpiarCampo("CalificacionDeudorCNBVResumen", "", true, false, false);
    LimpiarCampo("CalificacionOperacionCNBVPCResumen", "", true, false, false);
    LimpiarCampo("CalificacionOperacionCNBVPEResumen", "", true, false, false);
    LimpiarCampo("ReservasPreventivasPCResumen", "", true, false, false);
    LimpiarCampo("ReservasPreventivasPEResumen", "", true, false, false);
    LimpiarCampo("CompSemanalResumen", "", true, false, false);
    LimpiarCampo("CompMensualResumen", "", true, false, false);
    LimpiarCampo("CompTrimestralResumen", "", true, false, false);
    LimpiarCampo("CompAnualResumen", "", true, false, false);
    LimpiarCampo("TasaReferenciaResumen", "", false, false, true);
    LimpiarCampo("AbonoPagoMinimoResumen", "", true, false, false);
    LimpiarCampo("TipoPagoPeriodoRequeridoResumen", "", true, false, false);
    LimpiarCampo("CargosComisionesPeriodicasResumen", "", true, false, false);
    LimpiarCampo("CargosComisionesAnualesResumen", "", true, false, false);
    LimpiarCampo("DispocisionesAcumuladasResumen", "", true, false, false);
    LimpiarCampo("CapitalFechaDisolucionResumen", "", true, false, false);
    LimpiarCampo("InteresFechaDisolucionResumen", "", true, false, false);
    LimpiarCampo("txtTotalIntProyectados", "", true, false, false);
    LimpiarCampo("txtTotalIntNormalesPag", "", true, false, false);
    LimpiarCampo("txtTotalInteresesMoratoriosPag", "", true, false, false);
}

function LimpiarCampo(campo, valorVal, aplicaVal, aplicaDisabled, aplicaSelectedIndex) {
    if (aplicaVal) $('#' + campo).val(valorVal);
    if (aplicaSelectedIndex) document.getElementById(campo).selectedIndex = 0;
    aplicaDisabled ? $('#' + campo).attr("disabled", true) : $('#' + campo).removeAttr("disabled");
    document.getElementById(campo).style.border = "1px solid Gray";
}

//------------------------------------------------------------------------------- BTNS REGRESAR-----------
//////////////////////////////////////////////////////////////////////////////////////////////////////////CLIENTES
function FCancelarClientesEncontrados() {
    if ($('DivClientes').is("disabled") == false)
        CambiarDiv('BuscadorCliente', 'ClientesEncotrados', false, true);
}

function FCancelarCliente(obj) {
    if ($(obj).attr('lang') == 'aa')
        CambiarDiv('BuscadorCliente', 'DatosCliente', false, true);
    else
        CambiarDiv('ClientesEncotrados', 'DatosCliente', false, true);
    $(obj).attr('lang', 'ac');
    LimpiarDatosCliente();
    LimpiarDatosClienteSIC();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////LINEAS
function FCancelarLinea() {
    CambiarDiv('LineasEncontradas', 'DatosLinea', false, true);
    LimpiarDatosLinea();
    LimpiarDatosLineaSIC();

}
function FCancelarLineasEncontradas() {
    var objClientesEncontrados = document.getElementById('ClientesEncontradosIDS');
    objClientesEncontrados = objClientesEncontrados == null ? document.getElementById('ClientesSICEncontradosIDS') : objClientesEncontrados;

    if (objClientesEncontrados == null) return;
    if ($('Lineas').is(":disabled") == false) {
        CambiarDiv('ClientesEncotrados', 'LineasEncontradas', true, true);
        $('#DivClientes').attr("disabled", false);
        for (var Renglon = 0; Renglon < objClientesEncontrados.rows.length; Renglon++) {
            if (Renglon > 0) {
                $('#Cliente' + objClientesEncontrados.rows[Renglon].cells[0].innerText).show();
            }
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////DISPOSICIONES
function FCancelarDisposicion() {
    CambiarDiv('DivDisposicionesEncontradas', 'DivDatosDisposicion', false, true);
    LimpiarDatosDisposicion();
    LimpiarDatosDisposicionSIC();
}

function FCancelarDisposicionesEncontradas() {
    var objLineasEncontradas = document.getElementById('LineasEncontradasNLS');
    objLineasEncontradas = objLineasEncontradas == null ? document.getElementById('LineasEncontradasNLSSIC') : objLineasEncontradas;

    if (objLineasEncontradas == null) return;
    if ($('DivDisposiciones').is(":disabled") == false) {
        //Effect.BlindUp($('DivDisposiciones'), { duration: 0.5, afterFinish: function () { $('DivCabeceraDisposiciones').disabled = true; } });
        CambiarDiv('LineasEncontradas', 'DivDisposicionesEncontradas', true, true);
        $('#Lineas').attr("disabled", false);
        for (var Renglon = 0; Renglon < objLineasEncontradas.rows.length; Renglon++) {
            if (Renglon > 0) {
                $('#Linea' + objLineasEncontradas.rows[Renglon].cells[0].innerText).show();
            }
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////RESUMEN
function FCancelarResumen() {
    CambiarDiv('DivResumenesEncontrados', 'DivDatosResumen', false, true);
    LimpiarDatosResumen();
    LimpiarDatosCortesSIC();
}

function FCancelarResumenesEncontrados() {
    var objDisposicionesEncontradas = document.getElementById('DisposicionesEncontradasNDS');
    objDisposicionesEncontradas = objDisposicionesEncontradas == null ? document.getElementById('DisposicionesEncontradasNDSSIC') : objDisposicionesEncontradas;

    if (objDisposicionesEncontradas == null) return;
    if ($('DivResumenes').is(":disabled") == false) {
        CambiarDiv('DivDisposicionesEncontradas', 'DivResumenesEncontrados', true, true);
        $('#DivDisposiciones').attr("disabled", false);
        if (objDisposicionesEncontradas != null) {
            for (var Renglon = 0; Renglon < objDisposicionesEncontradas.rows.length; Renglon++) {
                if (Renglon > 0) {
                    $('#Disposicion' + objDisposicionesEncontradas.rows[Renglon].cells[0].innerText).show();
                }
            }
        }
        $('#rangoFechas').val(4);
    }
}

function CambiarDiv(Mostrar, Ocultar, ocultarPadre, ocultarhijo) {
    $("#" + Mostrar).parent().slideDown('slow');
    ocultarPadre ? $("#" + Ocultar).parent().slideUp('slow') : null;

    $("#" + Mostrar).show();
    ocultarhijo ? $("#" + Ocultar).hide() : null;

    $("#" + Mostrar).attr("disabled", false);
    $("#" + Ocultar).attr("disabled", true);

    $("#" + Ocultar).find("input:button").attr("class", "classButtonDis");
    $("#" + Ocultar).find("input:button").attr("disabled", true);
    $("#" + Ocultar).find("input:radio").attr("disabled", true);

    $("#" + Mostrar).find("input:button").attr("class", "classButton");
    $("#" + Mostrar).find("input:button").attr("disabled", false);
    $("#" + Mostrar).find("input:radio").attr("disabled", false);

    if (Mostrar != "BuscadorCliente")
        document.getElementById($("#" + Mostrar).parent().attr("id")) != null ? document.getElementById($("#" + Mostrar).parent().attr("id")).style.height = "auto" : null;
    else
        document.getElementById($("#" + Mostrar).parent().attr("id")) != null ? document.getElementById($("#" + Mostrar).parent().attr("id")).style.height = "auto" : null;
}


//function CambiarDiv(Mostrar, Ocultar, ocultarPadre, ocultarhijo) {
//    $("#" + Mostrar).parent().slideDown('slow');
//    ocultarPadre ? $("#" + Ocultar).parent().slideUp('slow') : null;

//    $("#" + Mostrar).show();
//    ocultarhijo ? $("#" + Ocultar).hide() : null;

//    $("#" + Mostrar).removeAttr("disabled");
//    $("#" + Ocultar).attr("disabled", "disabled");

//    $("#" + Ocultar).find("input:button").attr("class", "classButtonDis");
//    $("#" + Ocultar).find("input:button").attr("disabled", true);

//    $("#" + Mostrar).find("input:button").attr("class", "classButton");
//    $("#" + Mostrar).find("input:button").removeAttr("disabled");
//    //$("#" + Mostrar).find("fieldset").removeAttr("disabled");

//    if (Mostrar != "BuscadorCliente")
//        document.getElementById($("#" + Mostrar).parent().attr("id")) != null ? document.getElementById($("#" + Mostrar).parent().attr("id")).style.height = "auto" : null;
//    else
//        document.getElementById($("#" + Mostrar).parent().attr("id")) != null ? document.getElementById($("#" + Mostrar).parent().attr("id")).style.height = "auto" : null;
//}


function LlenarSexo() {
    document.getElementById('SexoCliente').options.length = 0;

    if ($('#PersonalidadJuridicaCliente').val() == '301') {
        var opcion = new Option('Femenino', 'F');

        try {
            document.getElementById('SexoCliente').options[document.getElementById('SexoCliente').options.length] = opcion;
            document.getElementById('SexoCliente').options[document.getElementById('SexoCliente').options.length - 1].title = 'Femenino';
        }
        catch (e) {
            MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }

        opcion = new Option('Masculino', 'M');

        try {
            document.getElementById('SexoCliente').options[document.getElementById('SexoCliente').options.length] = opcion;
            document.getElementById('SexoCliente').options[document.getElementById('SexoCliente').options.length - 1].title = 'Masculino';
        }
        catch (e) {
            MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
    }
    else {
        var opcion = new Option('No Aplica', 'NA');

        try {
            document.getElementById('SexoCliente').options[document.getElementById('SexoCliente').options.length] = opcion;
            document.getElementById('SexoCliente').options[document.getElementById('SexoCliente').options.length - 1].title = 'No Aplica';
        }
        catch (e) {
            MostrarMsj('Error: Favor de comunicarse a la extensión 79776. ' + e + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
    }
}

function GenerarRFC() {
    if ($('#DivClientes').is(":disabled") == false) {
        if (NoVacioDatosClienteRFC()) {
            peticionAjax('Default.aspx/GenerarRFC', "POST", { Nombre: $('#NombreCliente').val(), APaterno: $('#APaternoCliente').val(), AMaterno: $('#AMaternoCliente').val(), FNacimiento: $('#FechaNacimientoCliente').val() }, function (data) {
                if (!data.d.startsWith('Error:')) {
                    if (data.d != "") {
                        $('#RFCCliente').val(data.d);
                    }
                }
                else {
                    MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                }
            }, null);
        }
    }
}

/*Codigo que obtiene el estado segun ID*/
function CambiaEstadoxClave(evt) {
    if (evt.keyCode == 13) {
        //evt.keyCode = 0;
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax('Default.aspx/BuscaEstadoxClave', "POST", { ClaveMun: $('#inpClaveMunicipio').val() }, function (data) {
            if (!data.d.startsWith('Error:')) {
                if (data.d != "") {
                    EstadoFVC = data.d;
                    LlenaEstadoFVC();
                }
            }
            else {
                MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            }
            Waiting(false, "Espere por favor. Cargando Información...");
        }, null);
    }
}

function AbrirAE() {
    CambiarDiv('DivAE', 'DatosCliente', false, true);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////BUSCAR ACTIVIDAD ECONOMICA
function BuscarAE() {
    var i = 0;
    for (i = 0; i < document.forms[0]["BuscarAEPor"].length; i++) {
        if (document.forms[0]["BuscarAEPor"][i].checked)
            break;
    }

    $('#btnBuscarAE').attr("disabled", true);

    peticionAjax('Default.aspx/BuscarActividadesEconomicas', "POST", { Filtro: $('#txtFiltroActividadesEconomicas').val(), FiltrarPor: document.forms[0]["BuscarAEPor"][i].value }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                var HTML = '';
                HTML = '<table id="TblActividadEcono" class="dataGridDatos"><thead><tr style="text-align:center;"><th >Rama</th ><th >Sector</th ><th >Actividad Económica</th ><th ><input id="RadioSelAE" name="SelAE" type="radio"  value="" style="display: none" /></th ></tr></thead><tbody style="text-align: left;">';
                Registros = obtenerArregloDeJSON(data.d, false);
                for (var i = 0; i < Registros.length; i++) {
                    var Registro = Registros[i];
                    HTML += '<tr ' + (DeterminaSiNumParImpar(i) == "Par" ? 'style="background: rgb(198, 229, 204);" ' : '') + '><td >' + Registro.Rama + '</td><td >' + Registro.Sector + '</td><td >' + Registro.ActividadEconomica + '</td><td ><input id="RadioEditarLinea" ';
                    if (i == 0)
                        HTML += 'checked="checked" ';
                    HTML += 'name="SelAE" type="radio"  value="' + Registro.Clave + '" /></td></tr>';
                }
                HTML += '</tbody></table><br /><br />';
                HTML += '<center><input id="btnRegresarAE" style="width: 81px" type="button" value="Regresar" onclick="BuscarAEC();" class="classButton"/><br /></center>';
                $(TablaActividadesEconomicas).html(HTML);
                document.getElementById("TblActividadEcono").style.width = "100%";
            }
            else
                $(TablaActividadesEconomicas).html('<span style="color:Red;font-weight:bold">No hay Actividaes Económicas que coincidan con su criterio de búsqueda.</span><br /><br /><center><input id="btnRegresarAE" style="width: 81px" type="button" value="Regresar" class="classButton" onclick="CambiarDiv(\'DatosCliente\', \'DivAE\',false,true);" /><br /></center>');
            $('#btnBuscarAE').attr("disabled", false);
        }
        else {
            $(TablaActividadesEconomicas).html('<span style="color:Red;font-weight:bold">' + data.d + '.</span><br /><br />');
            $('#btnBuscarAE').attr("disabled", false);
        }
    }, null);
}

function BuscarAEC() {
    CerrarAE();
    var i = 0;
    for (i = 0; i < document.forms[0]["SelAE"].length; i++) {
        if (document.forms[0]["SelAE"][i].checked)
            break;
    }

    peticionAjax('Default.aspx/BuscarActividadEconomica', "POST", { Clave: document.forms[0]["SelAE"][i].value }, function (data) {
        if (!data.d.startsWith('Error:')) {
            if (data.d != "") {
                Registro = obtenerArregloDeJSON(data.d, false);
                Agrupacion = Registro[0].Agrupacion;
                Rama = Registro[0].Rama;
                Sector = Registro[0].Sector;
                SubSector = Registro[0].SubSector;
                Division = Registro[0].Division;
                Grupo = Registro[0].Grupo;
                ActividadEconomica = Registro[0].Clave;
                LlenarAgrupacion();
            }
        }
        else {
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
    }, null);
}

function CerrarAE() {
    CambiarDiv('DatosCliente', 'DivAE', false, true);
}


//---------------------------------------------------- LINEAS --------------------------- 
function PrecScale(IDCampo, Prec, Scale) {
    Prec = Prec - Scale;

    if (window.event.keyCode < 46 || window.event.keyCode > 57) {
        window.event.keyCode = 0;
    }
    else {
        if (window.event.keyCode == 46) {
            if ($("#" + IDCampo).val().indexOf('.') != -1 || Scale == 0) {
                window.event.keyCode = 0;
            }
        }
        else {
            if ($("#" + IDCampo).val().indexOf('.') != -1) {
                if ($("#" + IDCampo).val().length - ($("#" + IDCampo).val().indexOf('.') + 1) >= Scale && posicionCursor(IDCampo) > $("#" + IDCampo).val().indexOf('.') || $("#" + IDCampo).val().length > Prec + Scale && posicionCursor(IDCampo) > 0) {
                    window.event.keyCode = 0;
                }
            }
            else {
                if ($("#" + IDCampo).val().length >= Prec) {
                    window.event.keyCode = 0;
                }
            }
        }
    }
}

function posicionCursor(TXT) {
    var tb = document.getElementById(TXT)
    var cursor = -1;
    // IE
    if (document.selection && (document.selection != 'undefined')) {
        var _range = document.selection.createRange();
        var contador = 0;
        while (_range.move('character', -1))
            contador++;
        cursor = contador;
    }
    // FF
    else if (tb.selectionStart >= 0)
        cursor = tb.selectionStart;

    return cursor;
}

function AnioMesDia_DiaMesAnio(AnioMesDia) {
    var arrayAnioMesDia;
    try {
        arrayAnioMesDia = $(AnioMesDia).val().split('/');
    } catch (e) {
        arrayAnioMesDia = AnioMesDia.split('/');
    }
    return arrayAnioMesDia[2] + '/' + arrayAnioMesDia[1] + '/' + arrayAnioMesDia[0];
}

function DiaMesAnio_AnioMesDia(DiaMesAnio) {
    var arrayDiaMesAnio;
    try {
        arrayDiaMesAnio = $(DiaMesAnio).val().split('/');
    } catch (e) {
        arrayDiaMesAnio = DiaMesAnio.split('/');
    }
    return arrayDiaMesAnio[2] + '/' + arrayDiaMesAnio[1] + '/' + arrayDiaMesAnio[0];
}


function CalcularDias() {
    CalcularDiasStatus();
    CalcularDiasAtraso();
}

function CalcularDiasStatus() {
    if ($('#AnioMesDiaResumen').val() != "" && $('#FechaUltimaSitDeudaResumen').val() != "") {
        var FechaCorte = new Date(DiaMesAnio_AnioMesDia($('#AnioMesDiaResumen').val()).replace('/', ', '));
        var FechaUSD = new Date(DiaMesAnio_AnioMesDia($('#FechaUltimaSitDeudaResumen').val()).replace('/', ', '));

        var MiliSecStatus = FechaCorte.getTime() - FechaUSD.getTime();
        var DiasStatus = Math.round(MiliSecStatus / (1000 * 60 * 60 * 24));

        $('#DiasEstatusResumen').val(DiasStatus);
    }
}

function CalcularDiasAtraso() {
    if ($('#AnioMesDiaResumen').val() != "" && $('#FechaRecibAntiguoImpagadoResumen').val() != "") {
        var FechaCorte = new Date(DiaMesAnio_AnioMesDia($('#AnioMesDiaResumen').val()).replace('/', ', '));
        var FechaURI = new Date(DiaMesAnio_AnioMesDia($('#FechaRecibAntiguoImpagadoResumen').val()).replace('/', ', '));

        var MiliSecAtraso = FechaCorte.getTime() - FechaURI.getTime();
        var DiasAtraso = Math.round(MiliSecAtraso / (1000 * 60 * 60 * 24));

        $('#DiasAtrasoResumen').val(DiasAtraso);
    }
}

function AnioMesDia_DiaMesAnio(AnioMesDia) {
    var arrayAnioMesDia = AnioMesDia.split('/');
    return arrayAnioMesDia[2] + '/' + arrayAnioMesDia[1] + '/' + arrayAnioMesDia[0];
}

function DiaMesAnio_AnioMesDia(DiaMesAnio) {
    var arrayDiaMesAnio = DiaMesAnio.split('/');
    return arrayDiaMesAnio[2] + '/' + arrayDiaMesAnio[1] + '/' + arrayDiaMesAnio[0];
}
