
$(function () {
    $('body').click(function () {
        if (!entroTodos) {
            ContraerListaSistemas();
            $("#imgLstSitemas").attr("lang", "aa");
        }
        else entroTodos = false;
    });

    $('#divSistemas').click(function (event) {
        event.stopPropagation();
        imgSistemas_Click();
    });
});

function CargarReportes(cargaPerfiles) {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("AdminRep8Columnas.aspx/cargarReportes", "POST", null, function (data) {
        document.getElementById("sltListaReportes").options.length = 0;
        var opcion = new Option("-- Seleccione el Reporte a Consultar --", -1);
        document.getElementById('sltListaReportes').options[document.getElementById('sltListaReportes').options.length] = opcion;
        if (data.d.indexOf("ErrorCATCH") == -1 && data.d != "") {
            var Items = obtenerArregloDeJSON(data.d, false);
            for (var i = 0; i < Items.length; i++) {
                var Item = Items[i];
                var opcion = new Option(Item.FVCNombreReporte, Item.FIIdReporte);
                document.getElementById("sltListaReportes").options[document.getElementById("sltListaReportes").options.length] = opcion;
                document.getElementById("sltListaReportes").options[document.getElementById("sltListaReportes").options.length - 1].title = Item.FVCNombreReporte;
            }
        }
        else {
            MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
        if (cargaPerfiles)
            CargarPerfiles();
        else
            Waiting(false, "Espere por favor. Cargando Información...");
    });
}


function CargarPerfiles() {
    peticionAjax("AdminRep8Columnas.aspx/cargarPerfiles", "POST", null, function (data) {
        if (data.d.indexOf("ErrorCATCH") == -1 && data.d != "") {
            var Items = obtenerArregloDeJSON(data.d, false);
            document.getElementById("sltPerfiles").options.length = 0;
            var opcion = new Option("-- Seleccione una opción --", -1);
            document.getElementById('sltPerfiles').options[document.getElementById('sltPerfiles').options.length] = opcion;
            for (var i = 0; i < Items.length; i++) {
                var Item = Items[i];
                var opcion = new Option(Item.FVCDescripcion, Item.FIIDPerfil);
                document.getElementById("sltPerfiles").options[document.getElementById("sltPerfiles").options.length] = opcion;
                document.getElementById("sltPerfiles").options[document.getElementById("sltPerfiles").options.length - 1].title = Item.FVCDescripcion;
            }
        }
        else {
            MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
        cargarSistemas();
    });
}

function cargarSistemas() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("AdminRep8Columnas.aspx/cargarSistemas", "POST", null, function (data) {
        if (data.d.indexOf("ErrorCATCH") == -1 && data.d != "") {
            $("#CheckDropDonwList").html(data.d);
        }
        else
            MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function imgSistemas_Click(obj) {
    if ($("#imgLstSitemas").attr("lang") == "aa")
        ExpandirListaSistemas();
    else
        ContraerListaSistemas();
    $("#imgLstSitemas").attr("lang", $("#imgLstSitemas").attr("lang") == "aa" ? "ab" : "aa");
}

function ExpandirListaSistemas() {
    document.getElementById('divListaReportes').style.height = 'auto';
}

function ContraerListaSistemas() {
    document.getElementById('divListaReportes').style.height = '17px';
}

var entroTodos = false;
function CheckBoxListSelect(cbControl, state) {

    var chkBoxList = document.getElementById(cbControl);
    var chkBoxCount = chkBoxList.getElementsByTagName("input");
    for (var i = 0; i < chkBoxCount.length; i++) {
        chkBoxCount[i].checked = state;
    }
    entroTodos = true;
    ExpandirListaSistemas();
    $("#imgLstSitemas").attr("lang", "ab");
    return false;
}
function chkSiemas_Click() {
    event.stopPropagation();
}

function expandAll(treeViewId) {
    var treeView = document.getElementById(treeViewId);
    var treeLinks = treeView.getElementsByTagName("a");
    var j = true;
    for (i = 0; i < treeLinks.length; i++) {
        if (treeLinks[i].firstChild.tagName == "IMG") {
            var node = treeLinks[i];
            var level = parseInt(treeLinks[i].id.substr(treeLinks[i].id.length - 1), 10);
            var childContainer = document.getElementById(treeLinks[i].id + "Nodes");
            if (j) {
                if (childContainer.style.display == "none")
                    TreeView_ToggleNode(eval(treeViewId + "_Data"), level, node, 'r', childContainer);
                j = false;
            }
            else {
                if (childContainer.style.display == "none")
                    TreeView_ToggleNode(eval(treeViewId + "_Data"), level, node, 'r', childContainer);
            }
        }
    }
}

function TreeviewExpandCollapse1Nivel(treeViewId) {
    collapseAll(treeViewId);
    var treeView = document.getElementById(treeViewId);
    if (treeView) {
        var treeLinks = treeView.getElementsByTagName('a');
        var nodeCount = treeLinks.length;
        var flag = true, i = 0;
        if (treeLinks[i].firstChild.tagName) {
            if (treeLinks[i].firstChild.tagName == "IMG") {
                var currentToggleLink = treeLinks[i];
                var childContainer = GetParentByTagName('table', currentToggleLink).nextSibling;
                if (childContainer.style.display == 'none') {
                    eval(currentToggleLink.href);
                }
            }
        }
    }
}

var bandera = false;
function ExpandiContraerArbol() {
    if (bandera == false) {
        ExpandirArbolProducto(); //Expandir
        $('#Expandir').attr("title", "Ocultar Árbol Negocio");
        bandera = true;
    }
    else {
        ContraerArbolProducto();
        $('#Expandir').attr("title", "Mostrar Árbol Negocio");
        bandera = false;
    }
}

function ExpandirArbolProducto() {
    document.getElementById('divArbolProducto').style.height = 'auto';
}

function ContraerArbolProducto() {
    document.getElementById('divArbolProducto').style.height = '17px';
}

var banFitir = false;
function ExpandiContraerArbolFitir() {
    if (banFitir == false) {
        ExpandirArbolFitir();
        $('#ExpandirFitir').attr("title", "Ocultar Árbol Fitir");
        banFitir = true;
    }
    else {
        ContraerArbolFitir();
        $('#ExpandirFitir').attr("title", "Mostrar Árbol Fitir");
        banFitir = false;
    }
}

function ExpandirArbolFitir() {
    document.getElementById('divArbolFitir').style.height = 'auto';
}

function ContraerArbolFitir() {
    document.getElementById('divArbolFitir').style.height = '17px';
}

var banSub = false;
function ExpandiContraerArbolSub() {
    if (banSub == false) {
        ExpandirArbolSubproducto();
        $('#divArbolSubProducto').attr("title", "Ocultar Árbol Fitir");
        banSub = true;
    }
    else {
        ContraerArbolSubproducto();
        $('#ExpandirFitir').attr("title", "Mostrar Árbol Fitir");
        banSub = false;
    }
}

function ExpandirArbolSubproducto() {
    document.getElementById('divArbolSubProducto').style.height = 'auto';
}

function ContraerArbolSubproducto() {
    document.getElementById('divArbolSubProducto').style.height = '17px';
}

function collapseAll(treeViewId) {
    var treeView = document.getElementById(treeViewId);
    var treeLinks = treeView.getElementsByTagName("a");
    var j = true;
    for (i = 0; i < treeLinks.length; i++) {
        if (treeLinks[i].firstChild.tagName == "IMG") {
            var node = treeLinks[i];
            var level = parseInt(treeLinks[i].id.substr(treeLinks[i].id.length - 1), 10);
            var childContainer = document.getElementById(treeLinks[i].id + "Nodes");
            if (j) {
                if (childContainer.style.display == "block")
                    TreeView_ToggleNode(eval(treeViewId + "_Data"), level, node, 'r', childContainer);
                j = false;
            }
            else {
                if (childContainer.style.display == "block")
                    TreeView_ToggleNode(eval(treeViewId + "_Data"), level, node, 'r', childContainer);
            }
        }
    }
}

// JScript File
function OnCheckBoxCheckChanged(evt) {
    var src = window.event != window.undefined ? window.event.srcElement : evt.target;
    var isChkBoxClick = (src.tagName.toLowerCase() == "input" && src.type == "checkbox");
    if (isChkBoxClick) {
        var parentTable = GetParentByTagName("table", src);
        var nxtSibling = parentTable.nextSibling;
        if (nxtSibling && nxtSibling.nodeType == 1)//verifica la existencia de valores nulos o nodos en los siguientes niveles
        {
            if (nxtSibling.tagName.toLowerCase() == "div") {
                //Selecciona o deselecciona todos los niveles 
                CheckUncheckChildren(parentTable.nextSibling, src.checked);
            }
        }
        //selecciona o deselecciona a todos los niveles
        CheckUncheckParents(src, src.checked);
    }
}

function CheckUncheckChildren(childContainer, check) {
    var childChkBoxes = childContainer.getElementsByTagName("input");
    var childChkBoxCount = childChkBoxes.length;
    for (var i = 0; i < childChkBoxCount; i++) {
        childChkBoxes[i].checked = check;
    }
}

function CheckUncheckParents(srcChild, check) {
    var parentDiv = GetParentByTagName("div", srcChild);
    var parentNodeTable = parentDiv.previousSibling;
    if (parentNodeTable) {
        var checkUncheckSwitch;

        if (check) {
            var isAllSiblingChecked = AreAllSiblingsChecked(srcChild);
            if (isAllSiblingChecked)
                checkUncheckSwitch = true;
            else
                return;
        }
        else {
            checkUncheckSwitch = false;
        }

        //        var inpElemsInParentTable = parentNodeTable.getElementsByTagName("input");
        //        if (inpElemsInParentTable.length > 0) {
        //            var parentNodeChkBox = inpElemsInParentTable[0];
        //            parentNodeChkBox.checked = checkUncheckSwitch;
        //            //Hacer la misma recursividad para todos los nodos
        //            CheckUncheckParents(parentNodeChkBox, checkUncheckSwitch);
        //        }
    }
}

function AreAllSiblingsChecked(chkBox) {
    var parentDiv = GetParentByTagName("div", chkBox);
    var childCount = parentDiv.childNodes.length;
    for (var i = 0; i < childCount; i++) {
        if (parentDiv.childNodes[i].nodeType == 1) {
            if (parentDiv.childNodes[i].tagName.toLowerCase() == "table") {
                var prevChkBox = parentDiv.childNodes[i].getElementsByTagName("input")[0];
                if (!prevChkBox.checked) {
                    return false;
                }
            }
        }
    }
    return true;
}

function GetParentByTagName(parentTagName, childElementObj) {
    var parent = childElementObj.parentNode;
    while (parent.tagName.toLowerCase() != parentTagName.toLowerCase()) {
        parent = parent.parentNode;
    }
    return parent;
}

var idReporte = "";
var lstCarteraG = new Array();
var lstNegocioG = new Array();
var lstClasificacionG = new Array();
var lstRubroG = new Array();
var lstSubPRoductoG = new Array();
var lstReferenciasNodosG = new Array();
function GuardarReporte8Col_Click() {
    AgregarLstCartera(document.getElementById("MainContent_treeViewProductos"), true, null, false);
    var lstCarteraNegocio = lstCarteraG;
    var lstNegocioNegocio = lstNegocioG;
    var lstClasificacionNegocio = lstClasificacionG;
    var lstRubroNegocio = lstRubroG;
    var lstSubPRoductoNegocio = lstSubPRoductoG;
    var lstReferenciasNodosNegocio = lstReferenciasNodosG;

    AgregarLstCartera(document.getElementById("MainContent_treeViewFitir"), true, null, false);
    var lstCarteraFitir = lstCarteraG;
    var lstClasificacionFitir = lstNegocioG;
    var lstRubroFitir = lstClasificacionG;
    var lstDescripcionFitir = lstRubroG;
    var lstFitiresFitir = lstSubPRoductoG;
    var lstReferenciasNodosFitir = lstReferenciasNodosG;

    AgregarLstCartera(document.getElementById("MainContent_treeViewSubProductos"), true, null, false);
    var lstCarteraSubProducto = lstCarteraG;
    var lstClasificacionSubProducto = lstNegocioG;
    var lstRubroSubProducto = lstClasificacionG;
    var lstSubPRoductosSubProducto = lstRubroG;
    var lstReferenciasNodosSubProducto = lstReferenciasNodosG;

    var cadenaCheck = "";
    $('#CheckBoxListSistema tr').each(function () {
        if ($(this.cells[0]).find('input:checkbox').is(":checked"))
            cadenaCheck += $($(this.cells[0]).find('input:checkbox')[0]).val() + ",";
    });
    cadenaCheck = cadenaCheck != "" ? cadenaCheck.substring(0, cadenaCheck.length - 1) : "";

    document.getElementById("txtNombreReporte").style.border = "thin solid gray";
    document.getElementById("divListaReportes").style.border = "thin solid gray";
    document.getElementById("divArbolProducto").style.border = "thin solid gray";
    document.getElementById("divArbolFitir").style.border = "thin solid gray";
    document.getElementById("divArbolSubProducto").style.border = "thin solid gray";
    document.getElementById("sltPerfiles").style.border = "thin solid gray";

    if (lstReferenciasNodosNegocio.length > 0 && lstReferenciasNodosFitir.length > 0 && lstReferenciasNodosSubProducto.length > 0 && cadenaCheck != "" && $("#txtNombreReporte").val() != "" && $("#sltPerfiles").val() != "-1") {
        Waiting(true, "Espere por favor. Cargando Información...");
        SicreNet.Portafolio.AdminRep8Columnas.AdminRep8Columnas.GuardarReporte(idReporte, $("#txtNombreReporte").val(), $("#sltPerfiles").val(), cadenaCheck,
         DevuelveCadenaConcat(lstCarteraNegocio, ','), DevuelveCadenaConcat(lstNegocioNegocio, ','), DevuelveCadenaConcat(lstClasificacionNegocio, ','), DevuelveCadenaConcat(lstRubroNegocio, ','), DevuelveCadenaConcat(lstSubPRoductoNegocio, '@'), DevuelveCadenaConcat(lstReferenciasNodosNegocio, ','),
         DevuelveCadenaConcat(lstCarteraFitir, ','), DevuelveCadenaConcat(lstClasificacionFitir, ','), DevuelveCadenaConcat(lstRubroFitir, ','), DevuelveCadenaConcat(lstDescripcionFitir, '@'), DevuelveCadenaConcat(lstFitiresFitir, '@'), DevuelveCadenaConcat(lstReferenciasNodosFitir, ','),
          DevuelveCadenaConcat(lstCarteraSubProducto, ','), DevuelveCadenaConcat(lstClasificacionSubProducto, ','), DevuelveCadenaConcat(lstRubroSubProducto, ','), DevuelveCadenaConcat(lstSubPRoductosSubProducto, '@'), DevuelveCadenaConcat(lstReferenciasNodosSubProducto, ','),
         function (response) {
             if (response.value.indexOf("ErrorCATCH") == -1 && response.value == "") {
                 btnNuevoReporte_Click();
                 CargarReportes(false);
                 MostrarMsj("Información almacenada exitosamente.", " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
             }
             else if (response.value.indexOf("ErrorCATCH") != -1) {
                 MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
                 Waiting(false, "Espere por favor. Cargando Información...");
             }
         }
        );
    }
    else {
        var msj = "";
        if ($("#txtNombreReporte").val() == "") {
            msj += "-Ingrese el campo Nombre.</br></br>";
            document.getElementById("txtNombreReporte").style.border = "thin solid red";
        }
        if ($("#sltPerfiles").val() == "-1") {
            msj += "-Seleccione una opción en el Campo Perfil.</br></br>";
            document.getElementById("sltPerfiles").style.border = "thin solid red";
        }
        if (cadenaCheck == "") {
            msj += "-Seleccione al menos un elemento del campo de Sistemas.</br></br>";
            document.getElementById("divListaReportes").style.border = "thin solid red";
        }
        if (lstReferenciasNodosNegocio.length == 0) {
            msj += "-Seleccione al menos un elemento del arbol de Negocio.</br></br>";
            document.getElementById("divArbolProducto").style.border = "thin solid red";
        }
        if (lstReferenciasNodosFitir.length == 0) {
            msj += "-Seleccione al menos un elemento del arbol de Fitir.</br></br>";
            document.getElementById("divArbolFitir").style.border = "thin solid red";
        }
        if (lstReferenciasNodosSubProducto.length == 0) {
            msj += "-Seleccione al menos un elemento del arbol de SubProducto.";
            document.getElementById("divArbolSubProducto").style.border = "thin solid red";
        }

        if (msj != "")
            MostrarMsj(msj, "Mensaje", false, true, false, "", "Aceptar", "", 250, "auto", null, null, null);
    }


}

function DevuelveCadenaConcat(lstIterar, caracter) {
    var cadena = "";
    for (var i = 0; i < lstIterar.length; i++)
        cadena += lstIterar[i] + caracter;
    cadena = cadena != "" ? cadena.substring(0, cadena.length - 1) : "";
    return cadena;
}

function AgregarLstCartera(obj, esLlenarLsts, cadenalstReferenciaNodos, esLimpiarLst) {
    lstCarteraG = new Array();
    lstNegocioG = new Array();
    lstClasificacionG = new Array();
    lstRubroG = new Array();
    lstSubPRoductoG = new Array();
    lstReferenciasNodosG = new Array();


    for (var i = 0; i < obj.children.length; i++) {
        if (obj.children[i].nodeName == "TABLE") {
            if (esLlenarLsts) {
                if (obj.children[i].getElementsByTagName("INPUT")[0].checked == true)
                    lstReferenciasNodosG.push(obj.children[i].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, ''));
            }
            else if (esLimpiarLst)
                obj.children[i].getElementsByTagName("INPUT")[0].checked = false;
            else {
                if (ExisteIdChkArbolEnLista(cadenalstReferenciaNodos, obj.children[i].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, '')))
                    obj.children[i].getElementsByTagName("INPUT")[0].checked = true;
                else
                    obj.children[i].getElementsByTagName("INPUT")[0].checked = false;
            }
        }
    }



    for (var i = 0; i < obj.children[1].children.length; i++) {
        if (obj.children[1].children[i].nodeName == "TABLE") {
            if (esLlenarLsts) {
                if (obj.children[1].children[i].getElementsByTagName("INPUT")[0].checked == true) {
                    lstCarteraG.push(obj.children[1].children[i].getElementsByTagName("INPUT")[0].title);
                    lstReferenciasNodosG.push(obj.children[1].children[i].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, ''));
                }
            }
            else if (esLimpiarLst)
                obj.children[1].children[i].getElementsByTagName("INPUT")[0].checked = false;
            else {
                if (ExisteIdChkArbolEnLista(cadenalstReferenciaNodos, obj.children[1].children[i].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, '')))
                    obj.children[1].children[i].getElementsByTagName("INPUT")[0].checked = true;
                else
                    obj.children[1].children[i].getElementsByTagName("INPUT")[0].checked = false;
            }
            if (obj.children[1].children[i + 1] != undefined) AgregarLstNegocio(obj.children[1].children[i + 1], esLlenarLsts, cadenalstReferenciaNodos, esLimpiarLst);
        }
    }
}

function AgregarLstNegocio(obj, esLlenarLsts, cadenalstReferenciaNodos, esLimpiarLst) {
    for (var ii = 0; ii < obj.children.length; ii++) {
        if (obj.children[ii].nodeName == "TABLE") {
            if (esLlenarLsts) {
                if (obj.children[ii].getElementsByTagName("INPUT")[0].checked == true) {
                    lstNegocioG.push(obj.children[ii].getElementsByTagName("INPUT")[0].title);
                    lstReferenciasNodosG.push(obj.children[ii].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, ''));
                }
            }
            else if (esLimpiarLst)
                obj.children[ii].getElementsByTagName("INPUT")[0].checked = false;
            else {
                if (ExisteIdChkArbolEnLista(cadenalstReferenciaNodos, obj.children[ii].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, '')))
                    obj.children[ii].getElementsByTagName("INPUT")[0].checked = true;
                else
                    obj.children[ii].getElementsByTagName("INPUT")[0].checked = false;
            }
            if (obj.children[ii + 1] != undefined) AgregarLstClasificacion(obj.children[ii + 1], esLlenarLsts, cadenalstReferenciaNodos, esLimpiarLst);
        }
    }
}


function AgregarLstClasificacion(obj, esLlenarLsts, cadenalstReferenciaNodos, esLimpiarLst) {
    for (var ii = 0; ii < obj.children.length; ii++) {
        if (obj.children[ii].nodeName == "TABLE") {
            if (esLlenarLsts) {
                if (obj.children[ii].getElementsByTagName("INPUT")[0].checked == true) {
                    lstClasificacionG.push(obj.children[ii].getElementsByTagName("INPUT")[0].title);
                    lstReferenciasNodosG.push(obj.children[ii].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, ''));
                }
            }
            else if (esLimpiarLst)
                obj.children[ii].getElementsByTagName("INPUT")[0].checked = false;
            else {
                if (ExisteIdChkArbolEnLista(cadenalstReferenciaNodos, obj.children[ii].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, '')))
                    obj.children[ii].getElementsByTagName("INPUT")[0].checked = true;
                else
                    obj.children[ii].getElementsByTagName("INPUT")[0].checked = false;
            }
            if (obj.children[ii + 1] != undefined) AgregarLstRubro(obj.children[ii + 1], esLlenarLsts, cadenalstReferenciaNodos, esLimpiarLst);
        }
    }
}

function AgregarLstRubro(obj, esLlenarLsts, cadenalstReferenciaNodos, esLimpiarLst) {
    for (var ii = 0; ii < obj.children.length; ii++) {
        if (obj.children[ii].nodeName == "TABLE") {
            if (esLlenarLsts) {
                if (obj.children[ii].getElementsByTagName("INPUT")[0].checked == true) {
                    lstRubroG.push(obj.children[ii].getElementsByTagName("INPUT")[0].title);
                    lstReferenciasNodosG.push(obj.children[ii].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, ''));
                }
            }
            else if (esLimpiarLst)
                obj.children[ii].getElementsByTagName("INPUT")[0].checked = false;
            else {
                if (ExisteIdChkArbolEnLista(cadenalstReferenciaNodos, obj.children[ii].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, '')))
                    obj.children[ii].getElementsByTagName("INPUT")[0].checked = true;
                else
                    obj.children[ii].getElementsByTagName("INPUT")[0].checked = false;
            }
            if (obj.children[ii + 1] != undefined) AgregarLstSubProducto(obj.children[ii + 1], esLlenarLsts, cadenalstReferenciaNodos, esLimpiarLst);
        }
    }
}

function AgregarLstSubProducto(obj, esLlenarLsts, cadenalstReferenciaNodos, esLimpiarLst) {
    for (var ii = 0; ii < obj.children.length; ii++) {
        if (obj.children[ii].nodeName == "TABLE") {
            if (esLlenarLsts) {
                if (obj.children[ii].getElementsByTagName("INPUT")[0].checked == true) {
                    lstSubPRoductoG.push(obj.children[ii].getElementsByTagName("INPUT")[0].title);
                    lstReferenciasNodosG.push(obj.children[ii].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, ''));
                }
            }
            else if (esLimpiarLst)
                obj.children[ii].getElementsByTagName("INPUT")[0].checked = false;
            else {
                if (ExisteIdChkArbolEnLista(cadenalstReferenciaNodos, obj.children[ii].getElementsByTagName("INPUT")[0].id.replace(/[^\d]/g, '')))
                    obj.children[ii].getElementsByTagName("INPUT")[0].checked = true;
                else
                    obj.children[ii].getElementsByTagName("INPUT")[0].checked = false;
            }
        }
    }
}

function btnCargarReporte_Click() {
    if ($("#sltListaReportes").val() != "-1") {
        Waiting(true, "Espere por favor. Cargando Información...");
        document.getElementById("txtNombreReporte").style.border = "thin solid gray";
        document.getElementById("divListaReportes").style.border = "thin solid gray";
        document.getElementById("divArbolProducto").style.border = "thin solid gray";
        document.getElementById("divArbolFitir").style.border = "thin solid gray";
        document.getElementById("divArbolSubProducto").style.border = "thin solid gray";
        document.getElementById("sltPerfiles").style.border = "thin solid gray";
        SicreNet.Portafolio.AdminRep8Columnas.AdminRep8Columnas.cargarReporteXId($("#sltListaReportes").val(),
        function (response) {
            if (response.value.indexOf("ErrorCATCH") == -1 && response.value != "") {
                idReporte = $("#sltListaReportes").val();
                var Items = obtenerArregloDeJSON(response.value, false);
                $("#txtNombreReporte").val(Items[0].FVCNombreReporte);
                $("#sltPerfiles").val(Items[0].FIIdPerfil);
                $('#CheckBoxListSistema tr').each(function () {
                    if (ExisteIdChkArbolEnLista(Items[0].FVCSistema, $($(this.cells[0]).find('input:checkbox')[0]).val()))
                        $($(this.cells[0]).find('input:checkbox')[0]).attr("checked", true);
                    else
                        $($(this.cells[0]).find('input:checkbox')[0]).attr("checked", false);
                });
                AgregarLstCartera(document.getElementById("MainContent_treeViewProductos"), false, Items[0].FVCReferenciaNodos, false);
                AgregarLstCartera(document.getElementById("MainContent_treeViewFitir"), false, Items[1].FVCReferenciaNodos, false);
                AgregarLstCartera(document.getElementById("MainContent_treeViewSubProductos"), false, Items[2].FVCReferenciaNodos, false);
                bandera = false;
                banFitir = false;
                banSub = false;
                ExpandiContraerArbol();
                ExpandiContraerArbolFitir();
                ExpandiContraerArbolSub();
            }
            else if (response.value.indexOf("ErrorCATCH") != -1)
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    );
    }
    else MostrarMsj("Seleccione el Reporte a Consultar", " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
}

function ExisteIdChkArbolEnLista(cadena, id) {
    var existe = false;
    for (var i = 0; i < cadena.split(",").length; i++) {
        if (id == cadena.split(",")[i]) {
            existe = true;
            break;
        }
    }
    return existe;
}

function btnNuevoReporte_Click() {
    idReporte = "";
    $("#txtNombreReporte").val("");
    $("#sltPerfiles").val("-1");
    $('#CheckBoxListSistema tr').each(function () {
        $($(this.cells[0]).find('input:checkbox')[0]).attr("checked", false);
    });
    AgregarLstCartera(document.getElementById("MainContent_treeViewProductos"), false, null, true);
    AgregarLstCartera(document.getElementById("MainContent_treeViewFitir"), false, null, true);
    AgregarLstCartera(document.getElementById("MainContent_treeViewSubProductos"), false, null, true);
    bandera = true;
    banFitir = true;
    banSub = true;
    ExpandiContraerArbol();
    ExpandiContraerArbolFitir();
    ExpandiContraerArbolSub();
}

function btnEliminar_Click() {
    if ($("#sltListaReportes").val() != "-1") {
        MostrarMsj("¿Esta seguro que desea eliminar el Reporte <span style='font-weight:bold'>'" + $("#sltListaReportes :selected").text() + "'</span> ? ", "Mensaje", true, true, false, "Si", "No", "", 300, 135,
        function () {
            $("#divVentanaMensajes").dialog("close");
            BorrarReporte();
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
    }
    else MostrarMsj("Seleccione el Reporte a Eliminar", " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
}

function BorrarReporte() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("AdminRep8Columnas.aspx/eliminarReporte", "POST", { IdReporte: $("#sltListaReportes").val() }, function (data) {
        if (data.d.indexOf("ErrorCATCH") == -1 && data.d == "") {
            MostrarMsj(" El reporte ha sido Eliminado exitosamente.", " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
            btnNuevoReporte_Click();
            CargarReportes(false);
        }
        else if (data.d.indexOf("ErrorCATCH") != -1) {
            MostrarMsj(data.d, " Mensaje", false, true, false, "", "Aceptar", "", 280, 120, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    });
}