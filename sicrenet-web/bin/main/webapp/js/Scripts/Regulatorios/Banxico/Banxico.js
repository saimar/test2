
function ObtenerFechaActual() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    peticionAjax("Default.aspx/GetFechaActualAndUser", "POST", null, function (data) {
        if (data.d.split('%%&&')[1] == "866194" || data.d.split('%%&&')[1] == "761797") {
            $("#MainContent_btnGenerar").attr("class", "classButton");
            $("#MainContent_btnGenerar").removeAttr("disabled");
        }
        else {
            $("#MainContent_btnGenerar").attr("class", "classButtonDis");
            $("#MainContent_btnGenerar").attr("disabled", "disabled");            
        }
        $("#txtFecha").val(data.d.split('%%&&')[0]);
        $("#txtFecha").onchange = Inicializar();
        WidtDatePicker();
    });
}

function Inicializar() {
    $("#hCifrasControlIniciales").attr("disabled", true);
    $("#hCifrasProcesadas").attr("disabled", true);
    $("#hDescargas").attr("disabled", true);
    document.getElementById("divCifrasControlIniciales").style.display != 'none' ? $("#divCifrasControlIniciales").slideUp("slow") : null;
    document.getElementById("divCifrasProcesadas").style.display != 'none' ? $("#divCifrasProcesadas").slideUp("slow") : null;
    document.getElementById("divDescargas").style.display != 'none' ? $("#divDescargas").slideUp("slow") : null;
}

function MostrarCifrasIniciales() {
    if ($("#txtFecha").val() == '') {
        MostrarMsj("Debe seleccionar una fecha.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
        return;
    }
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/CifrasControlIniciales", "POST", { año: $("#txtFecha").val().split("/")[2], mes: $("#txtFecha").val().split("/")[1], dia: $("#txtFecha").val().split("/")[0] }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                CambiarDiv('divCifrasControlIniciales', 'divSeleccion');
                $('#divCabeceraCifrasControlIniciales').attr("disabled", false);
                $('#divCifrasOficialesValorizado').html(data.d.split("%%%&&&")[0]);
                $('#divCifrasOficialesOrigen').html(data.d.split("%%%&&&")[1]);
                $('#divCifrasControl').html(data.d.split("%%%&&&")[2]);
                $('#divDiferencia').html(data.d.split("%%%&&&")[3]);
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function CifrasProcesadas() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/CifrasProcesadas", "POST", { año: $("#txtFecha").val().split("/")[2], mes: $("#txtFecha").val().split("/")[1], dia: $("#txtFecha").val().split("/")[0] }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                CambiarDiv('divCifrasProcesadas', 'divCifrasControlIniciales');
                $('#divCabeceraCifrasProcesadas').attr("disabled", false);
                $('#divCifrasProcesadasSeguimiento').html(data.d.split("%%%&&&")[0]);
                $('#divCifrasProcesadasReestructuras').html(data.d.split("%%%&&&")[1]);
                $('#divCifrasProcesadasBajas').html(data.d.split("%%%&&&")[2]);
            }
        }
        else {
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
        Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function Descargas() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/CifrasDescargas", "POST", { año: $("#txtFecha").val().split("/")[2], mes: $("#txtFecha").val().split("/")[1], dia: $("#txtFecha").val().split("/")[0] }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                peticionAjax("Default.aspx/VerificarArchivo", "POST", { año: $("#txtFecha").val().split("/")[2], mes: $("#txtFecha").val().split("/")[1], dia: $("#txtFecha").val().split("/")[0] }, function (data) {
                    if (data.d.indexOf("Error") == -1) {
                        if (data.d != "") {
                            $('#btnDescargar').attr("disabled", false);
                            $('#btnDescargar').attr("class", "classButton");
                            document.getElementById('btnDescargar').onclick = function () {
                                __doPostBack('DescargarZipBXC', data.d.split("%%&&")[1]);
                                setTimeout(terminarWait, 10000);

//                                downloadUrl = "http://" + data.d.split("%%&&")[0] + "/DescargasBXC/" + data.d.split("%%&&")[1];
//                                var downloadFrame = document.createElement("iframe");
//                                downloadFrame.setAttribute('src', downloadUrl);
//                                downloadFrame.setAttribute('class', "screenReaderTextWindowsOpen");
//                                document.body.appendChild(downloadFrame);
//                                $("#iframe").remove();
                            }
                        }
                        else {
                            $('#btnDescargar').attr("disabled", true);
                            $('#btnDescargar').attr("class", "classButtonDis");
                        }
                    }
                    else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                    Waiting(false, "Espere por favor. Cargando Información...");
                });
                CambiarDiv('divDescargas', 'divCifrasProcesadas');
                $('#divCabeceraDescargas').attr("disabled", false);
                $('#divCifrasDescargas').html(data.d);
            }
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    });
}

function Generar() {
    if ($('#btnDescargar').is(":disabled") == false) {
        MostrarMsj("El archivo que se encuentra actualmente guardado será sobreescrito.¿Desea continuar? ", "Mensaje", true, false, true, "Si", "", "No", 220, 155,
        function BtnSi() {
            $("#divVentanaMensajes").dialog("close");
            GenerarArchivos();
        }, null, function BtnNo() {
            $("#divVentanaMensajes").dialog("close");
        });
    }
    else {
        GenerarArchivos();
    }
}

function GenerarArchivos() {
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("Default.aspx/Generar", "POST", { año: $("#txtFecha").val().split("/")[2], mes: $("#txtFecha").val().split("/")[1], dia: $("#txtFecha").val().split("/")[0] }, function (data) {
        if (data.d.indexOf("Error") == -1) {
            if (data.d != "") {
                $('#divCabeceraDescargas').attr("disabled", false);
                __doPostBack('DescargarZipBXC', data.d.split("%%&&")[1]);
                setTimeout(terminarWait, 10000);
//                downloadUrl = "http://" + data.d.split("%%&&")[0] + "/DescargasBXC/" + data.d.split("%%&&")[1];
//                var downloadFrame = document.createElement("iframe");
//                downloadFrame.setAttribute('src', downloadUrl);
//                downloadFrame.setAttribute('class', "screenReaderTextWindowsOpen");
//                document.body.appendChild(downloadFrame);
//                $("#iframe").remove();
            }
            else MostrarMsj("Se ha producido un error en la generación de el archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        }
        else MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
        Waiting(false, "Espere por favor. Cargando Información...");
    }, null);
}

function CambiarDiv(Mostrar, Ocultar) {
    $("#" + Ocultar).slideUp("slow");
    $("#" + Mostrar).slideDown("slow");
}