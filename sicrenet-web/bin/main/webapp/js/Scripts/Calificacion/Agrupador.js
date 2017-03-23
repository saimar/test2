$(function () {
});

var PaisSelecXUser = "";
var perfilUsuario = "";
function GetPerfilUsuario() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    //    if (PaisSelecXUser != "1")
    //        $("#ddlVista").hide();
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/GetPerfilUsuario", "POST", { idPais: PaisSelecXUser }, function (data) {
        perfilUsuario = data.d;
        CargaSistemas();
    }, null);
}


var esLoad = true;
function CargaSistemas() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/GetSistemas', "POST", { idPais: PaisSelecXUser }, function (data) {
        var JSON = obtenerArregloDeJSON(data.d, false);
        document.getElementById('MainContent_DropDownListSistemaT').options.length = 0;
        var opt1 = document.createElement('option');
        opt1.innerHTML = "Todos";
        document.getElementById('MainContent_DropDownListSistemaT').appendChild(opt1);
        if (JSON[0] != null) {
            for (var i = 0; i < JSON.length; i++) {
                var opt = document.createElement('option');
                opt.value = JSON[i].FVCSistema;
                opt.innerHTML = JSON[i].FVCSistema;
                document.getElementById('MainContent_DropDownListSistemaT').appendChild(opt);
            }
        }
        if (PaisSelecXUser == "1")
            CargarTreeView();
        else {
            entroClose = false;
            CargarTablaAllUnidadesDeNegocio();
        }

    }, null);
}

var opcionTreeView = "1";
function CargarTreeView() {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Calificacion.NuevoAgrupador.Default.CrearTreeView(
    opcionTreeView,
        function (response) {
            if (response.value.indexOf("Error") == -1) {
                $("#divTreeView_" + opcionTreeView).html(response.value);
                $("#black" + opcionTreeView).treeview({
                    persist: "location",
                    collapsed: true
                });

            } else {
                //  MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            }
            var opcionTV = parseInt(opcionTreeView) + 1;
            opcionTreeView = opcionTV + "";
            if (opcionTV == "2")
                CargarTreeView();
            if (esLoad && opcionTreeView == "3") {
                entroClose = false;
                CargarTablaAllUnidadesDeNegocio();
            }
            else if (!esLoad)
                Waiting(false, "Espere por favor. Cargando Información...");
        }
    );
}



var arregloRowsUnidadesDeNegocio = new Array();
function CargarTablaAllUnidadesDeNegocio() {
    SeleccionaVista("tabla");
    $("#selectVista").val("tabla");
    if (esLoad) {
        $("#dvUnidadesDeNegocio").hide();
        $("#divMsj").hide();
    }
    $("#tblUnidadesDeNegocio").html("");
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Calificacion.NuevoAgrupador.Default.UnidadesDeNegocioExistentes(
    $("#MainContent_DropDownListSistemaT").val(), PaisSelecXUser,
        function (response) {
            if (response.value.indexOf("Error") == -1) {
                document.getElementById("dvUnidadesDeNegocio").style.visibility = 'visible';
                document.getElementById("divMsj").style.display = 'block';
                $("#spInfo").html($("#MainContent_DropDownListSistemaT").val() == "Todos" ? "Todas Las Unidades de Negocio" : ("Todas Las Unidades de Negocio por Sistema \"" + $("#MainContent_DropDownListSistemaT").val() + "\""));
                arregloRowsUnidadesDeNegocio = new Array();
                var JSON = obtenerArregloDeJSON(response.value, false);
                LLenaAregloDatosTabla(JSON);
                $("#dvUnidadesDeNegocio").show();
                initTable("tblUnidadesDeNegocio");
                var tabla = $("#tblUnidadesDeNegocio").parent().parent().children(0).children(0);
                $("tr", tabla).each(function () {
                    this.cells[1] != undefined ? this.cells[1].style.display = 'none' : null;
                    this.cells[2] != undefined ? this.cells[2].style.display = 'none' : null;
                    this.cells[3] != undefined ? this.cells[3].style.display = 'none' : null;
                });
                $('#tblUnidadesDeNegocio tr').each(function () {
                    this.cells[1] != undefined ? this.cells[1].style.display = 'none' : null;
                    this.cells[2] != undefined ? this.cells[2].style.display = 'none' : null;
                    this.cells[3] != undefined ? this.cells[3].style.display = 'none' : null;
                });
            } else {
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            }
            if (esLoad) {
                //esLoad = false;
                CargarTablaUnidadesDeNegocioNuevas();
            }
            else
                Waiting(false, "Espere por favor. Cargando Información...");
        }
    );
}


function CargarTablaUnidadesDeNegocioNuevas() {
    $("#dvNuevas").hide();
    $("#divMsj2").hide();
    $("#tbNuevasUnidades").html("");
    SicreNet.Calificacion.NuevoAgrupador.Default.UnidadesDeNegocioNuevas(PaisSelecXUser,
        function (response) {
            if (response.value.indexOf("Error") == -1) {
                arregloRowsUnidadesDeNegocio = new Array();
                if (response.value != "") {
                    document.getElementById("dvNuevas").style.visibility = 'visible';
                    document.getElementById("divMsj2").style.display = 'block';
                    var JSON = obtenerArregloDeJSON(response.value, false);
                    LLenaAregloDatosTabla(JSON);
                    $("#dvNuevas").show();
                    initTable("tbNuevasUnidades");
                    var tabla = $("#tbNuevasUnidades").parent().parent().children(0).children(0)
                    $("tr", tabla).each(function () {
                        this.cells[1].style.display = 'none';
                        this.cells[2].style.display = 'none';
                        this.cells[3].style.display = 'none';
                    });
                    $('#tbNuevasUnidades tr').each(function () {
                        this.cells[1].style.display = 'none';
                        this.cells[2].style.display = 'none';
                        this.cells[3].style.display = 'none';
                    });
                }
            } else {
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            }
            if (esLoad) {
                esLoad = false;
                CargarTablaUnidadesDeNegocioEnAutorizacion();
            }
            else
                Waiting(false, "Espere por favor. Cargando Información...");
        }
    );
}

function CargarTablaUnidadesDeNegocioEnAutorizacion() {
    $("#dvUnidadesDeNegociooEnAutorizacion").hide();
    $("#divMsj3").hide();
    $("#tblUnidadesoEnAutorizacion").html("");
    if (perfilUsuario == "2" || perfilUsuario == "19") {
        SicreNet.Calificacion.NuevoAgrupador.Default.UnidadesDeNegocioEnAutorizacion(PaisSelecXUser,
            function (response) {
                if (response.value.indexOf("Error") == -1) {
                    arregloRowsUnidadesDeNegocio = new Array();
                    if (response.value != "") {
                        document.getElementById("dvUnidadesDeNegociooEnAutorizacion").style.visibility = 'visible';
                        document.getElementById("divMsj3").style.display = 'block';
                        $("#spInfo").html("Existen Unidades de Negocio Nuevas Pendientes de Autorizar");
                        var JSON = obtenerArregloDeJSON(response.value, false);
                        LLenaAregloDatosTabla(JSON);
                        $("#dvUnidadesDeNegociooEnAutorizacion").show();
                        initTable("tblUnidadesoEnAutorizacion");
                        var tabla = $("#tblUnidadesoEnAutorizacion").parent().parent().children(0).children(0)
                        $("tr", tabla).each(function () {
                            this.cells[1].style.display = 'none';
                        });
                        $('#tblUnidadesoEnAutorizacion tr').each(function () {
                            this.cells[1].style.display = 'none';
                        });
                    }
                } else {
                    MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
                }
                Waiting(false, "Espere por favor. Cargando Información...");
            }
        );
    }
    else
        Waiting(false, "Espere por favor. Cargando Información...");
}

function LLenaAregloDatosTabla(JSON) {
    if (JSON[0] != null) {
        for (var i = 0; i < JSON.length; i++) {
            var arreglov = new Array();
            if (PaisSelecXUser != "1") {
                arreglov.push("<input id='bnt_" + JSON[i].FIProducto + "_" + JSON[i].FISubproducto + "_" + JSON[i].FVCSISTEMA + "_" + JSON[i].FVCEtapa + "_" + JSON[i].FVCDescSubproducto + "' type=' button'class='classButton' onclick='EditarUnidadNegocio(this)' value='Editar' style='font-size: 10px;width: 30px;'/>",
                        "<input id='bntRechazar_" + JSON[i].FIProducto + "_" + JSON[i].FISubproducto + "_" + JSON[i].FVCSISTEMA + "_" + JSON[i].FVCEtapa + "_" + JSON[i].FVCDescSubproducto + "' type='button' class='classButton' value='Rechazar' style='font-size: 10px;'/>",
                        "<input id='chkAceptar_" + JSON[i].FIProducto + "_" + JSON[i].FISubproducto + "_" + JSON[i].FVCSISTEMA + "_" + JSON[i].FVCEtapa + "_" + JSON[i].FVCDescSubproducto + "' type='checkbox' style='font-size: 10px;'/>",
                        "<span style='font-size: 10px;'>" + JSON[i].FVCEtapa + "</span>",
                      JSON[i].FIProducto, JSON[i].FISubproducto, JSON[i].FVCDescSubproducto, JSON[i].FVCSISTEMA);
            }
            else {
                arreglov.push("<input id='bnt_" + JSON[i].FIFitir + "_" + JSON[i].FISubproducto + "_" + JSON[i].FVCSistema + "_" + JSON[i].FVCEtapa + "' type=' button'class='classButton' onclick='EditarUnidadNegocio(this)' value='Editar' style='font-size: 10px;width: 30px;'/>",
                        "<input id='bntRechazar_" + JSON[i].FIFitir + "_" + JSON[i].FISubproducto + "_" + JSON[i].FVCSistema + "_" + JSON[i].FVCEtapa + "' type='button' class='classButton' value='Rechazar' style='font-size: 10px;'/>",
                        "<input id='chkAceptar_" + JSON[i].FIFitir + "_" + JSON[i].FISubproducto + "_" + JSON[i].FVCSistema + "_" + JSON[i].FVCEtapa + "' type='checkbox' style='font-size: 10px;'/>",
                        "<span style='font-size: 10px;'>" + JSON[i].FVCEtapa + "</span>",
                      JSON[i].FIClaveSistema, JSON[i].FVCSistema, JSON[i].FVCCartera, JSON[i].FVCClasificacion
                    , (JSON[i].Negocio != undefined) ? JSON[i].Negocio : JSON[i].FVCNegocio, JSON[i].FVCRubro, JSON[i].FISubproducto, JSON[i].FVCDescripcionSubproducto, JSON[i].FIFitir, JSON[i].FVCDescripcionFitir
                    , JSON[i].TipoRiesgo != undefined ? JSON[i].TipoRiesgo : JSON[i].FSITipoRiesgo, JSON[i].FVCAgrup1CNBV, JSON[i].FVCAgrup2CNBV, JSON[i].FVCSegVivienda, JSON[i].FVCNT_MOD_INTERNO, JSON[i].FVCNT_REG_R24
                    , JSON[i].FVCRevolvente, JSON[i].FVCFuenteFondeo, JSON[i].FIPorcentajeGarantizado, JSON[i].CategoriaCredito != undefined ? JSON[i].CategoriaCredito : JSON[i].FSICategoriaCredito, JSON[i].FVCClasificacionContable, JSON[i].FNCuentaRegulatorio
                    , JSON[i].FNAutomatizacíon13910, JSON[i].TipoCredito != undefined ? JSON[i].TipoCredito : JSON[i].FNTipoCredito);
            }
            arregloRowsUnidadesDeNegocio.push(arreglov);
            arreglov = new Array();
        }
    }
}

function initTable(tabla) {
    if (PaisSelecXUser == "1") {
        return $('#' + tabla).dataTable({
            "aaData": arregloRowsUnidadesDeNegocio,
            "aoColumns": [
        { "sTitle": "" }, { "sTitle": "" }, { "sTitle": "" }, { "sTitle": "" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo1' lang='aa' onclick='CambiaImg_Click(this)'>Clave Sistema&nbsp<img id='Img_" + tabla + "_SortCampo1' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo2' lang='aa' onclick='CambiaImg_Click(this)'>Sistema&nbsp<img id='Img_" + tabla + "_SortCampo2' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo3' lang='aa' onclick='CambiaImg_Click(this)'>Cartera&nbsp<img id='Img_" + tabla + "_SortCampo3' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo4' lang='aa' onclick='CambiaImg_Click(this)'>Clasificaci&#243;n&nbsp<img id='Img_" + tabla + "_SortCampo4' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo5' lang='aa' onclick='CambiaImg_Click(this)'>Negocio&nbsp<img id='Img_" + tabla + "_SortCampo5' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },

             { "sTitle": "<div id='div_" + tabla + "_SortCampo6' lang='aa' onclick='CambiaImg_Click(this)'>Rubro&nbsp<img id='Img_" + tabla + "_SortCampo6' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo7' lang='aa' onclick='CambiaImg_Click(this)'>Subproducto&nbsp<img id='Img_" + tabla + "_SortCampo7' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo8' lang='aa' onclick='CambiaImg_Click(this)'>Descripcion Subproducto&nbsp<img id='Img_" + tabla + "_SortCampo8' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo9' lang='aa' onclick='CambiaImg_Click(this)'>Fitir&nbsp<img id='Img_" + tabla + "_SortCampo9' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo10' lang='aa' onclick='CambiaImg_Click(this)'>Descripcion Fitir&nbsp<img id='Img_" + tabla + "_SortCampo10' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },

            { "sTitle": "<div id='div_" + tabla + "_SortCampo11' lang='aa' onclick='CambiaImg_Click(this)'>Tipo Riesgo&nbsp<img id='Img_" + tabla + "_SortCampo11' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo12' lang='aa' onclick='CambiaImg_Click(this)'>Prod Emp&nbsp<img id='Img_" + tabla + "_SortCampo12' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo13' lang='aa' onclick='CambiaImg_Click(this)'>Agrup2 CNBV&nbsp<img id='Img_" + tabla + "_SortCampo13' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo14' lang='aa' onclick='CambiaImg_Click(this)'>Seg Vivienda&nbsp<img id='Img_" + tabla + "_SortCampo14' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo15' lang='aa' onclick='CambiaImg_Click(this)'>NT_MOD_INTERNO&nbsp<img id='Img_" + tabla + "_SortCampo15' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },

            { "sTitle": "<div id='div_" + tabla + "_SortCampo16' lang='aa' onclick='CambiaImg_Click(this)'>NT_REG_R24&nbsp<img id='Img_" + tabla + "_SortCampo16' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo17' lang='aa' onclick='CambiaImg_Click(this)'>Revolvente&nbsp<img id='Img_" + tabla + "_SortCampo17' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo18' lang='aa' onclick='CambiaImg_Click(this)'>Fuente Fondeo&nbsp<img id='Img_" + tabla + "_SortCampo18' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo19' lang='aa' onclick='CambiaImg_Click(this)'>Porcentaje Garantizado&nbsp<img id='Img_" + tabla + "_SortCampo19' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo20' lang='aa' onclick='CambiaImg_Click(this)'>Categoria Credito&nbsp<img id='Img_" + tabla + "_SortCampo20' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },

            { "sTitle": "<div id='div_" + tabla + "_SortCampo21' lang='aa' onclick='CambiaImg_Click(this)'>Clasificacion Contable&nbsp<img id='Img_" + tabla + "_SortCampo21' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo22' lang='aa' onclick='CambiaImg_Click(this)'>CAT MINIMO VIGENTE SR&nbsp<img id='Img_" + tabla + "_SortCampo22' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo23' lang='aa' onclick='CambiaImg_Click(this)'>CAT MINIMO VENCIDO&nbsp<img id='Img_" + tabla + "_SortCampo23' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo24' lang='aa' onclick='CambiaImg_Click(this)'>Tipo Credito&nbsp<img id='Img_" + tabla + "_SortCampo24' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" }
        ],
            "sPaginationType": "full_numbers",
            //"sScrollY": "50px",
            "sScrollX": "100%",
            "bDestroy": true
            // "bAutoWidth": false
        });
    }
    else {
        return $('#' + tabla).dataTable({
            "aaData": arregloRowsUnidadesDeNegocio,
            "aoColumns": [
        { "sTitle": "" }, { "sTitle": "" }, { "sTitle": "" }, { "sTitle": "" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo1' lang='aa' onclick='CambiaImg_Click(this)'>Producto&nbsp<img id='Img_" + tabla + "_SortCampo1' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo2' lang='aa' onclick='CambiaImg_Click(this)'>SubProducto&nbsp<img id='Img_" + tabla + "_SortCampo2' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo3' lang='aa' onclick='CambiaImg_Click(this)'>Descipci&#243;n&nbspSubProducto<img id='Img_" + tabla + "_SortCampo3' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" },
            { "sTitle": "<div id='div_" + tabla + "_SortCampo4' lang='aa' onclick='CambiaImg_Click(this)'>Sistema&nbsp<img id='Img_" + tabla + "_SortCampo4' src='../../Images/Portafolio/Capbasviv/flechaOrder.png' style='vertical-align:middle;width:10px;height:10px;'/></div>" }
        ],
            "sPaginationType": "full_numbers",
            //"sScrollY": "50px",
            "sScrollX": "100%",
            "bDestroy": true
            // "bAutoWidth": false
        });
    }

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

function SeleccionaVista(vista) {
    var contenedorTabla = document.getElementById('dvUnidadesDeNegocio');
    var contenedorArbol = document.getElementById("divTreeView_1");
    var contenedorArbol2 = document.getElementById("divTreeView_2");

    if ((contenedorTabla != null && contenedorTabla != undefined) && (contenedorArbol != null && contenedorArbol != undefined)) {
        if (vista == 'tabla') {
            if (contenedorTabla.style != undefined) contenedorTabla.style.visibility = 'visible';
            document.getElementById("divMsj").style.display = 'block';
            if (contenedorArbol.style != undefined) contenedorArbol.style.display = 'none';
            if (contenedorArbol2.style != undefined) contenedorArbol2.style.display = 'none';
        }
        else
            if (vista == 'arbol subproductos') {
                if (contenedorTabla.style != undefined) contenedorTabla.style.visibility = 'collapse';
                document.getElementById("divMsj").style.display = 'none';
                if (contenedorArbol.style != undefined) contenedorArbol.style.display = 'block';
                if (contenedorArbol2.style != undefined) contenedorArbol2.style.display = 'none';
            }
            else
                if (vista == 'arbol fitires') {
                    if (contenedorTabla.style != undefined) contenedorTabla.style.visibility = 'collapse';
                    document.getElementById("divMsj").style.display = 'none';
                    if (contenedorArbol.style != undefined) contenedorArbol.style.display = 'none';
                    if (contenedorArbol2.style != undefined) contenedorArbol2.style.display = 'block';
                }
}
}

function SeleccionarTodos_Click(esSelect) {
    $('#tblUnidadesoEnAutorizacion tr').each(function () {
        $(this.cells[2]).find('input:checkbox').attr('checked', esSelect);
    });
}


function InvertirSeleccion_Click() {
    $('#tblUnidadesoEnAutorizacion tr').each(function () {
        var objChecked = $(this.cells[2]).find('input:checkbox')[0];
        if ($(objChecked).is(":checked"))
            $(objChecked).attr('checked', false);
        else
            $(objChecked).attr('checked', true);
    });
}

///----------------------------------------------------------------------------EDICION--------------------------------------------------
var arregloCallCatalogos;
var idObjSelect = "";
function EditarUnidadNegocio(obj) {
    idObjSelect = $(obj).attr("id");
    if (PaisSelecXUser == "1") {
        indiceCatalogos = 0;
        $("#divMain").slideUp('slow');
        $("#divEditar").slideDown('slow');
        arregloCallCatalogos = new Array();
        arregloCallCatalogos.push("FIClaveSistema,ClaveSistema");
        arregloCallCatalogos.push("FVCSistema,Sistema");
        arregloCallCatalogos.push("FVCCartera,Cartera");
        arregloCallCatalogos.push("FVCClasificacion,Clasificacion");
        arregloCallCatalogos.push("FVCNegocio,UNegocio");
        arregloCallCatalogos.push("FVCRubro,Rubro");
        arregloCallCatalogos.push("FISubproducto,Subproducto");
        arregloCallCatalogos.push("FIFitir,Fitir");
        arregloCallCatalogos.push("FSITipoRiesgo,TipoRiesgo");
        arregloCallCatalogos.push("FVCAgrup1CNBV,Agrup1CNBV");
        arregloCallCatalogos.push("FVCAgrup2CNBV,Agrup2CNBV");
        arregloCallCatalogos.push("FVCSegVivienda,SegVivienda");
        arregloCallCatalogos.push("FVCNT_MOD_INTERNO,NT_MOD_INTERNO");
        arregloCallCatalogos.push("FVCNT_REG_R24,NT_REG_R24");
        arregloCallCatalogos.push("FVCRevolvente,Revolvente");
        arregloCallCatalogos.push("FVCFuenteFondeo,FuenteFondeo");
        arregloCallCatalogos.push("FIPorcentajeGarantizado,PorcentajeGarantizado");
        arregloCallCatalogos.push("FSICategoriaCredito,CategoriaCredito");
        arregloCallCatalogos.push("FVCClasificacionContable,ClasificacionContable");
        arregloCallCatalogos.push("FNCuentaRegulatorio,CuentaRegulatorio");
        arregloCallCatalogos.push("FNAutomatizacíon13910,Automatizacíon13910");
        arregloCallCatalogos.push("FNTipoCredito,TipoCredito");
        LlenarCombo(arregloCallCatalogos[indiceCatalogos].split(",")[0], arregloCallCatalogos[indiceCatalogos].split(",")[1]);
    }
    else {
        $("#divMain").slideUp('slow');
        $("#divEditar").slideDown('slow');
        indiceCatalogos = 0;
        arregloCallCatalogos = new Array();
        arregloCallCatalogos.push("FVCClasificacionLAM,sltClasificacion");
        LlenarCombo(arregloCallCatalogos[indiceCatalogos].split(",")[0], arregloCallCatalogos[indiceCatalogos].split(",")[1]);
    }
}

var indiceCatalogos = 0;
function LlenarCombo(campo, combo) {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax('Default.aspx/LlenarCombo', "POST", { Campo: campo }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            var JSON = obtenerArregloDeJSON(data.d, false);
            document.getElementById(combo).options.length = 0;
            for (var i = 0; i < JSON.length; i++) {
                if (JSON[i] != null) {
                    var opt = document.createElement('option');
                    opt.value = JSON[i].Clave;
                    opt.innerHTML = JSON[i].Descripcion;
                    document.getElementById(combo).appendChild(opt);
                }
            }
        }
        indiceCatalogos++;
        if (indiceCatalogos < arregloCallCatalogos.length) {
            LlenarCombo(arregloCallCatalogos[indiceCatalogos].split(",")[0], arregloCallCatalogos[indiceCatalogos].split(",")[1]);
        }
        else {
            indiceCatalogos = null;
            AsignarDatosDeEdicion();
        }
    }, null);
}

function AsignarDatosDeEdicion() {
    peticionAjax('Default.aspx/leerDatos', "POST", { Fitir: idObjSelect.split("_")[1], ClaveSubproducto: idObjSelect.split("_")[2], Sistema: idObjSelect.split("_")[3], idPais: PaisSelecXUser }, function (data) {
        if (data.d.indexOf("Error") == -1 && data.d != "") {
            var UNeg = obtenerArregloDeJSON(data.d, false);
            if (PaisSelecXUser == "1") {
                $('#ClaveSistema').val(UNeg[0].FIClaveSistema);
                $('#Sistema').val(UNeg[0].FVCSistema);
                $('#Cartera').val(UNeg[0].FVCCartera);
                $('#Clasificacion').val(UNeg[0].FVCClasificacion);
                $('#Rubro').val(UNeg[0].FVCRubro);
                $('#Subproducto').val(UNeg[0].FISubproducto);
                $('#DescripcionSubproducto').val(UNeg[0].FVCDescripcionSubproducto);
                $('#Fitir').val(UNeg[0].FIFitir);
                $('#DescripcionFitir').val(UNeg[0].FVCDescripcionFitir);
                $('#TipoRiesgo').val(UNeg[0].FSITipoRiesgo);
                $('#Agrup1CNBV').val(UNeg[0].FVCAgrup1CNBV);
                $('#Agrup2CNBV').val(UNeg[0].FVCAgrup2CNBV);
                $('#SegVivienda').val(UNeg[0].FVCSegVivienda);
                $('#NT_MOD_INTERNO').val(UNeg[0].FVCNT_MOD_INTERNO);
                $('#NT_REG_R24').val(UNeg[0].FVCNT_REG_R24);
                $('#Revolvente').val(UNeg[0].FVCRevolvente);
                $('#FuenteFondeo').val(UNeg[0].FVCFuenteFondeo);
                $('#PorcentajeGarantizado').val(UNeg[0].FIPorcentajeGarantizado);
                $('#CategoriaCredito').val(UNeg[0].FSICategoriaCredito);
                $('#ClasificacionContable').val(UNeg[0].FVCClasificacionContable);
                $('#CuentaRegulatorio').val(UNeg[0].FNCuentaRegulatorio);
                $('#Automatizacíon13910').val(UNeg[0].FNAutomatizacíon13910);
                $('#TipoCredito').val(UNeg[0].FNTipoCredito);
                $('#Tasa').val(UNeg[0].FDTasa == "" ? "0.00" : UNeg[0].FDTasa);
                $('#UNegocio').val(UNeg[0].FVCNegocio);
                $('#UNegocio').val(UNeg[0].FVCNegocio);
                $('#txtTipoRestriccion').val(UNeg[0].FVCTipoRestriccion);
            }
            else {
                $("#txtProducto").val(idObjSelect.split("_")[1]);
                $("#txtSubProducto").val(idObjSelect.split("_")[2]);
                $("#DescripcionSubproducto").val(idObjSelect.split("_")[5]);
                $("#txtSistema").val(idObjSelect.split("_")[3]);
                $("#sltClasificacion").val(UNeg[0].FVCClasificacion);
            }
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function nuevoElemento(Combo) {
    var cadena = '<div id="divBloqVtnNuevaOpcion" style="width:95%;height:85%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITblNuevaOpcion" style="width:100%;height:70%;overflow: hidden;margin-top: 0px;">  ';
    cadena += '<div style="height:100%; width:100%; background-color:Silver; text-align:center"><br />';
    cadena += 'Escriba un valor para la opción que desea agregar.<br /><br />';
    cadena += '<input id="nuevoValor" type="text" style="width: 225px" /><br />';
    cadena += '</div></div>';
    cadena += "<div><table style='width:100%;height:8%;margin-left: 12%;'><tr style='height:1%'></tr><tr><td style='text-align:left;width: 50%;'></td><td style='text-align:right'><table><tr><td><input id='btnAceptarNuevaOpcion' type='button' class='classButton'  value='Aceptar'/></td><td style='width:10px;'></td><td></input><input id='btnCancelarNuevaOpcion' type='button' class='classButton'  value='Cancelar'/></td></tr></table></td></div>";
    $("#dvNuevaOpcion").empty();
    AgregarVtnFlotante("dvNuevaOpcion", "", "NUEVA OPCIÓN", "", cadena, 180, 355, false, false, "", "", null);
    $('#btnAceptarNuevaOpcion').on("click",
        function () {
            if ($('#nuevoValor').val() != "") {
                var opcion = new Option($('#nuevoValor').val(), $('#nuevoValor').val());
                try {
                    document.getElementById(Combo).options[document.getElementById(Combo).options.length] = opcion;
                    document.getElementById(Combo).options[document.getElementById(Combo).options.length - 1].title = $('#nuevoValor').val();
                }
                catch (e) {
                }
                $("#dvNuevaOpcion").dialog("close");
                document.getElementById(Combo).selectedIndex = document.getElementById(Combo).options.length - 1;
            }
            else {
                WaitingVtn("divBloqVtnNuevaOpcion", true, false, "");
                MostrarMsj("Debe escribir un valor.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () {
                    WaitingVtn("divBloqVtnNuevaOpcion", false, false, "");
                    $('#nuevoValor').focus();
                    $("#divVentanaMensajes").dialog("close");
                }, null);
                $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                    $('#nuevoValor').focus();
                    WaitingVtn("divBloqVtnNuevaOpcion", false, false, "");
                });
            }
        });
    $("#btnCancelarNuevaOpcion").on("click",
        function () {
            $("#dvNuevaOpcion").dialog("close");
        });
}

var esMsjError = false;
function GuardarUnidadDeNegocio() {

    MostrarMsj('Información a Guardar: </br><table class="dataGridDatos" style="width: 100%;"> <tr><th>Campo</th><th>Valor</th></tr>' +
               '<tr class="row"><td><span style="font-weight:bold;">Clave Sistema:</span></td><td><span style="font-weight:bold;color:Blue">' + $('#ClaveSistema').val() + '</span></td></tr>' +
               '<tr class="alternateRow"><td><span style="font-weight:bold;">Sistema:</span></td><td><span style="font-weight:bold;color:Blue">' + $('#Sistema').val() + '</span></td></tr>' +
               '<tr class="row"><td><span style="font-weight:bold;">Cartera:</span></td><td><span style="font-weight:bold;color:Blue">' + $('#Cartera').val() + '</span></td></tr>' +
               '<tr class="alternateRow"><td><span style="font-weight:bold;">Clasificacion:</span></td><td><span style="font-weight:bold;color:Blue">' + $('#Clasificacion').val() + '</span></td></tr>' +
               '<tr class="row"><td><span style="font-weight:bold;">NT_MOD_INTERNO:</span></td><td><span style="font-weight:bold;color:Blue">' + $('#NT_MOD_INTERNO').val() + '</span></td></tr></table></br>' +
               '¿Desea Continuar?', "Mensaje SicreNet", true, true, false, "Si", "No", "", 290, 230,
        function BtnSi() {
            $("#divVentanaMensajes").dialog("close");

            //------------------------------------------------- Guardar Unidad de Negocio

            Waiting(false, "Espere por favor. Guardando Información...");
            var parametrosMexico = { Etapa: idObjSelect.split("_")[4], ClaveSistema: $('#ClaveSistema').val(), Sistema: $('#Sistema').val(),
                Cartera: $('#Cartera').val(), Clasificacion: $('#Clasificacion').val(), Rubro: $('#Rubro').val(), Subproducto: $('#Subproducto').val(),
                DescripcionSubproducto: $('#DescripcionSubproducto').val(), Fitir: $('#Fitir').val(), DescripcionFitir: $('#DescripcionFitir').val(),
                TipoRiesgo: $('#TipoRiesgo').val(), Agrup1CNBV: $('#Agrup1CNBV').val(), Agrup2CNBV: $('#Agrup2CNBV').val(), SegVivienda: $('#SegVivienda').val(),
                NT_MOD_INTERNO: $('#NT_MOD_INTERNO').val(), NT_REG_R24: $('#NT_REG_R24').val(), Revolvente: $('#Revolvente').val(), FuenteFondeo: $('#FuenteFondeo').val(),
                PorcentajeGarantizado: $('#PorcentajeGarantizado').val(), CategoriaCredito: $('#CategoriaCredito').val(), ClasificacionContable: $('#ClasificacionContable').val(), CuentaRegulatorio: $('#CuentaRegulatorio').val(),
                Automatizacíon13910: $('#Automatizacíon13910').val(), TipoCredito: $('#TipoCredito').val(), Tasa: $('#Tasa').val(), UNegocio: $('#UNegocio').val()
            , tipoRestriccion: $("#txtTipoRestriccion").val()
            };
            var parametrosLAM = { Etapa: idObjSelect.split("_")[4], producto: idObjSelect.split("_")[1], subProducto: idObjSelect.split("_")[2],
                descSubProducto: $("#DescripcionSubproducto").val(), Sistema: idObjSelect.split("_")[3], clasificacion: $("#sltClasificacion").val()
            };

            peticionAjax('Default.aspx/' + (PaisSelecXUser == "1" ? 'guardarDatosMexico' : 'guardarDatosLAM'), "POST", PaisSelecXUser == "1" ? parametrosMexico : parametrosLAM, function (data) {
                if (data.d.indexOf("Error") == -1) {
                    esMsjError = false;
                    MostrarMsj("Se han guardado los cambios, se esperará autorización para aplicarlos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, function () {
                        $("#divVentanaMensajes").dialog("close");
                    }, null);
                    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                        if (!entroClose && !esMsjError) {
                            entroClose = true;
                            CancelarEdicion();
                            esLoad = true;
                            opcionTreeView = "1";
                            if (PaisSelecXUser == "1")
                                CargarTreeView();
                            else {
                                entroClose = false;
                                CargarTablaAllUnidadesDeNegocio();
                            }
                        }
                    });
                }
                else {
                    esMsjError = true;
                    MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    Waiting(false, "Espere por favor. Guardando Información...");
                }
            }, null);

            //-------------------------------------------------
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        });
}

function CancelarEdicion() {
    esMsjError = false;
    $("#divEditar").slideUp('slow');
    $("#divMain").slideDown('slow');
}

var entroClose = false;
function ProcesarUnidadDeNegocio() {
    var lstFitires = "";
    var lstSubProductos = "";
    var lstSistemas = "";
    var lstEstado = "";
    var lstEstatusCheck = "";
    var i = 0;
    $('#tblUnidadesoEnAutorizacion tr').each(function () {
        if (i > 0) {
            lstFitires += $(this.cells[PaisSelecXUser == "1" ? 12 : 4]).html() + ",";
            lstSubProductos += $(this.cells[PaisSelecXUser == "1" ? 10 : 5]).html() + ",";
            lstSistemas += $(this.cells[PaisSelecXUser == "1" ? 5 : 7]).html() + ",";
            lstEstado += $(this.cells[2]).find('input:checkbox').attr("id").split("_")[4] + ",";
            lstEstatusCheck += ($(this.cells[2]).find('input:checkbox').attr('checked') == "checked" ? "true" : "false") + ",";
        }
        i++;
    });
    var parametros = { fitires: lstFitires, subProductos: lstSubProductos, sistemas: lstSistemas, estado: lstEstado, estatusCheck: lstEstatusCheck, idPais: parseInt(PaisSelecXUser) };
    peticionAjax('Default.aspx/ProcesarUnidadDeNegocio', "POST", parametros, function (data) {
        if (data.d.indexOf("Error") == -1) {
            esMsjError = false;
            MostrarMsj("Información almacenda exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, function () {
                $("#divVentanaMensajes").dialog("close");
            }, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                if (!entroClose && !esMsjError) {
                    entroClose = true;
                    opcionTreeView = "1";
                    esLoad = true;
                    if (PaisSelecXUser == "1")
                        CargarTreeView();
                    else {
                        entroClose = false;
                        CargarTablaAllUnidadesDeNegocio();
                    }
                }
            });
        }
        else {
            esMsjError = true;
            MostrarMsj(data.d + ".", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
            Waiting(false, "Espere por favor. Guardando Información...");
        }
    }, null);
}

function ExportarAExcel() {
    Waiting(true, "Espere por favor. Cargando Información...");
    setTimeout(' Waiting(false, "Espere por favor. Cargando Información...");', 10000);
    __doPostBack("ExcelUnidadesDeNegocio", $("#MainContent_DropDownListSistemaT").val() + ',Unidades de Negocio,' + PaisSelecXUser);
}
