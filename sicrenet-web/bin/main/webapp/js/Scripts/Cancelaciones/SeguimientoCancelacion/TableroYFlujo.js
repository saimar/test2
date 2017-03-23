
var PaisSelectXUser = "";
var mesAñoActual = "";
var valorArgumentos = "";
function funcionLoadMasterPage() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("SeguimientoCancelacion.aspx/GetAñoMesActual", "POST", null, function (dataF) {
        mesAñoActual = dataF.d;
        peticionAjax("SeguimientoCancelacion.aspx/GetValorArgumentos", "POST", { opcion: 1 }, function (data) {
            if (data.d == "") {
                Tools.eraseCookie("esCargaTablaTableroYFlujo");
                Tools.eraseCookie("DatosCargaTablaTableroYFlujo");
                $("#MainContent_lblError").html("");
            }
            WidtDatePicker();
            CargaAñoMes();
        });
    });
}

var JSONAM = null;
function CargaAñoMes() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("SeguimientoCancelacion.aspx/GetValorArgumentos", "POST", { opcion: 2 }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            valorArgumentos = data.d;
            peticionAjax('SeguimientoCancelacion.aspx/getPeriodosSeguimientoCancelaciones', "POST", { idPais: PaisSelectXUser }, function (data1) {
                if (data1.d.indexOf("ErrorCATCH") == -1) {
                    if (data1.d == "" || data1.d == null) {
                        Waiting(false, "Espere por favor. Cargando Información...");
                        //MostrarMsj("Sin Datos.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                        $("#lblMensajeHerramienta").html("No Existen Periodos. Generé el Seguimiento de Cancelación en el Calendario de Trabajo");
                        return;
                    }
                    $("#lblMensajeHerramienta").hide();
                    document.getElementById("divMainG").style.visibility = "visible";
                    document.getElementById('sltAnio').options.length = 0;
                    JSONAM = obtenerArregloDeJSON(data1.d, false);
                    var anioS = "";
                    for (var i = 0; i < JSONAM.length; i++) {
                        if (i == 0) anioS = JSONAM[i]["periodo"].substring(0, 4);
                        if (!verificaExisteItemSltAño(JSONAM[i]["periodo"].substring(0, 4))) {
                            var opt = document.createElement('option');
                            opt.value = JSONAM[i]["periodo"].substring(0, 4);
                            opt.innerHTML = JSONAM[i]["periodo"].substring(0, 4);
                            document.getElementById('sltAnio').appendChild(opt);
                        }
                    }
                    if (valorArgumentos != "")
                        $("#sltAnio").val(valorArgumentos.split('|')[0]);
                    else
                        $("#sltAnio").val(mesAñoActual.split('/')[1]);

                    SelectionChangeSltAnio_CambiarMesDeAnio($("#sltAnio").val(), true);
                }
                else {
                    MostrarMsj(data1.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                    Waiting(false, "Espere por favor. Cargando Información...");
                }
            }, null);
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
            Waiting(false, "Espere por favor. Cargando Información...");
        }
    });
}

function SelectionChangeSltAnio_CambiarMesDeAnio(valor, escargaInicial) {
    var Meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    document.getElementById('sltMes').options.length = 0;
    var opcion = new Option("-- Seleccione el Mes --", -1);
    document.getElementById('sltMes').options[document.getElementById('sltMes').options.length] = opcion;
    var valorMesSelect = "";
    for (var i = 0; i < JSONAM.length; i++) {
        if (JSONAM[i]["periodo"].substring(0, 4) == valor) {
            var opt = document.createElement('option');
            opt.value = JSONAM[i]["periodo"].substring(4, 6);
            opt.innerHTML = Meses[parseInt(JSONAM[i]["periodo"].substring(4, 6)) - 1];
            document.getElementById('sltMes').appendChild(opt);
            if (i == JSONAM.length - 1)
                valorMesSelect = JSONAM[i]["periodo"].substring(4, 6)
        }
    }
    if (valorArgumentos != "") {
        $("#sltMes").val(valorArgumentos.split('|')[1]);
        valorArgumentos = "";
        Waiting(false, "Espere por favor. Cargando Información...");
    }
    else if (escargaInicial) {
        $("#sltMes").val(mesAñoActual.split('/')[0]);
        if ($("#sltMes").val() == -1) $("#sltMes").val(valorMesSelect);
        if ($("#sltMes").val() != -1)
            SelectionChangeSltAnio_CargarTabla($("#sltMes"));
        else
            Waiting(false, "Espere por favor. Cargando Información...");

    }
}

function verificaExisteItemSltAño(valor) {
    var existe = false;
    for (var i = 0; i < document.getElementById('sltAnio').options.length; i++) {
        if (document.getElementById('sltAnio').options[i].value == valor) {
            existe = true;
            break;
        }
    }
    return existe;
}

window.onunload = function () {
    Tools.eraseCookie("esCargaTablaTableroYFlujo");
    Tools.eraseCookie("DatosCargaTablaTableroYFlujo");
}

function SelectionChangeSltAnio_CargarTabla(obj) {
    if ($(obj).val() != -1) {
        Waiting(true, "Espere por favor. Cargando Información...");
        Tools.createCookie("esCargaTablaTableroYFlujo", "true", 0);
        Tools.createCookie("DatosCargaTablaTableroYFlujo", $("#sltAnio").val() + "|" + $(obj).val() + "|" + document.getElementById("sltMes").options[document.getElementById("sltMes").selectedIndex].text, 0);
        __doPostBack('CargaTablaTableroYFlujo', $("#sltAnio").val() + "|" + $(obj).val() + "|" + document.getElementById("sltMes").options[document.getElementById("sltMes").selectedIndex].text);
    }
    else {
        $("#MainContent_divSeguimientoCan").hide();
        document.getElementById("MainContent_lblError").style.color = "Red";
        $("#MainContent_lblError").html("Seleccione un Periodo valido.");
    }
}

function mostrar() {
    if (document.getElementById('MainContent_divSeguimientoCan').style.display == 'none')
        $('#MainContent_divSeguimientoCan').slideDown('slow');
    else $('#MainContent_divSeguimientoCan').slideUp('slow');
} 