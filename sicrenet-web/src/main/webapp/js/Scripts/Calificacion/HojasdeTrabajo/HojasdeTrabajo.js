function cargaTool() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
}

function obtenerComboFechas(idSistema) {
    //$('selectFecha').options.length = 0;
    if (idSistema != '0') {
        if (idSistema != '4') {
            var parametrosJSON = {
                tipo: 1,
                cartera: idSistema,
                fechaCorte: '25/02/1900'
            };
            Waiting(true, "Cargando Información...");
            peticionAjax("HojasTrabajo.aspx/comboFechas", "POST", parametrosJSON,
                    function (data) {
                        if (data != undefined) {
                            var cad = '<option value="-1">Seleccione una Fecha</option>';
                            var arrayJSON = obtenerArregloDeJSON(data.d, false);
                            for (var i = 0; i < arrayJSON.length; i++) {
                                cad += '<option value="' + arrayJSON[i].FDFechaCorte + '">';
                                cad += arrayJSON[i].FDFechaCorte;
                                cad += '</option>';
                            }
                            $('#selectFecha').html(cad);
                            $('#selectFecha')[0].value = -1;
                            $('#dv_ComboFechas').attr("style", "display:block");
                            $('#dvGrid').attr("style", "display:none");
                            $('#dv_descarga').attr("style", "display:none");
                            $('#dv_ComboSis').attr("style", "display:none");
                            $('#dv_ComboFact').attr("style", "display:none");
                            setTimeout(terminarWait, 200);
                        }
                    },
                    function (data) {
                        setTimeout(terminarWait, 200);
                    }
                );

        } else {
            $('#selectSisN')[0].value = -1;
            $("#selectSisN").val("0");
            $('#dv_ComboSis').attr("style", "display:block");
            $('#dv_ComboFechas').attr("style", "display:none");
            $('#dvGrid').attr("style", "display:none");
            $('#dv_descarga').attr("style", "display:none");
            $('#dv_ComboFact').attr("style", "display:none");
        }
    } else {
        //alert('Selecciona una cartera valida');
        MostrarMsj("Debe seleccionar una cartera valida.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        $('#dv_ComboSis').attr("style", "display:none");
        $('#dv_ComboFechas').attr("style", "display:none");
        $('#dvGrid').attr("style", "display:none");
        $('#dv_descarga').attr("style", "display:none");
        $('#dv_ComboFact').attr("style", "display:none");
    }
}



function descargaArchivos(fecha) {
    if (fecha == "-1") {
        $('#dvBtnGenera').attr("style", "display:none");
        $('#btnDescarga').attr("style", "display:none");
        $('#dvGrid').html("");
        MostrarMsj("Selecciones una Fecha.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        return;
    }
    var TipoCart;
    var FacturaC;
    var TSistema;

    if ($('#selectSistema').val() != '4') {
        TipoCart = '1';
        TSistema = $('#selectSistema').val();
    } else {
        TipoCart = '2';
        TSistema = $('#selectSisN').val();
    }

    if ($('#selectSisN').val() != '3') {
        FacturaC = '1';
    } else {
        FacturaC = $('#selectFacturacion').val();
    }
    //apareceVent()
    if (TipoCart != '2') {

        var parametrosJSON = {
            tipo: 3,
            cartera: TSistema,
            fechaCorte: fecha
        };
        Waiting(true, "Espere por favor. Cargando Información...");
      //  Waiting(false, "Cargando Información...");
        peticionAjax("HojasTrabajo.aspx/DescargaArchivo", "POST", parametrosJSON,
            function (data) {
                $('#dvGrid').html(data.d);
                $('#dv_descarga').attr("style", "display:block");
                $('#dvGrid').attr("style", "display:block");
                $('#dvBtnGenera').attr("style", "display:block");
                $('#dvBtnDescarga').attr("style", "display:none");
                if ($('#selectSisN').val() == '1' && $('#selectSistema').val() == '4') {
                    $('#dvBtnGenera').attr("style", "display:none");
                }
                setTimeout(terminarWait, 300);
            },
            function (data) {
                setTimeout(terminarWait, 300);
            }
        );
    } else {
        var parametrosJSON = {
            tipo: 2,
            cartera: TSistema,
            facturacion: FacturaC,
            fechaCorte: fecha
        };
        Waiting(true, "Espere por favor. Cargando Información...");
        peticionAjax("HojasTrabajo.aspx/DescargaArchivoConsumo", "POST", parametrosJSON,
            function (data) {
                $('#dvGrid').html(data.d);
                $('#dv_descarga').attr("style", "display:block");
                $('#dvGrid').attr("style", "display:block");
                $('#dvBtnGenera').attr("style", "display:block");
                $('#dvBtnDescarga').attr("style", "display:none");
                if ($('#selectSisN').val() == '1' && $('#selectSistema').val() == '4') {
                    $('#dvBtnGenera').attr("style", "display:none");
                }
                setTimeout(terminarWait, 300);
            },
            function (data) {
                setTimeout(terminarWait, 300);
            }
        );
    }
}

function selecSistema(IDsistema) {
    //$('#selectFecha').options.length = 0;
    $('#dvGrid').attr("style", "display:none");
    $('#dv_descarga').attr("style", "display:none");
    $('#dvBtnGenera').attr("style", "display:none");
    $('#dvBtnDescarga').attr("style", "display:none");
    if ($('#selectSisN').val() != '0') {
        if ($('#selectSisN').val() == '3') {
            $('#dv_ComboFact').attr("style", "display:block");
            $('#dv_ComboFechas').attr("style", "display:none");
        } else {
            $('#dv_ComboFact').attr("style", "display:none");
            ObtieneFechasCredimax(IDsistema, '1');
        }
    } else {
        //alert('Seleccione una opción valida');
        MostrarMsj("Debe seleccionar una opción valida.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        $('#dv_ComboFechas').attr("style", "display:none");
    }
}

function selecALNOVA(facturacion) {
    IDsistema = $('#selectSisN').val();
    ObtieneFechasCredimax(IDsistema, facturacion);
    $('#selectFecha')[0].value = -1;
    $('#dv_ComboFact').attr("style", "display:block");
    $('#dvGrid').attr("style", "display:none");
    $('#dv_descarga').attr("style", "display:none");
    $('#dvBtnGenera').attr("style", "display:none");
    $('#dvBtnDescarga').attr("style", "display:none");
}


function ObtieneFechasCredimax(IDsistema, facturacion) {
    //$('#selectFecha').options.length = 0;
    //apareceVent();

    var parametrosJSON = {
        tipo: 1,
        cartera: IDsistema,
        factura: facturacion,
        fechaCorte: '25/02/1900'
    };

    Waiting(true, "Cargando Información...");
    peticionAjax("HojasTrabajo.aspx/comboFechasConsumo", "POST", parametrosJSON,
        function (data) {
            if (data != undefined) {
                var cad = '<option value="-1">Seleccione una Fecha</option>';
                var arrayJSON = obtenerArregloDeJSON(data.d, false);
                for (var i = 0; i < arrayJSON.length; i++) {
                    cad += '<option value="' + arrayJSON[i].fecha + '">';
                    cad += arrayJSON[i].fecha;
                    cad += '</option>';
                }
                $('#selectFecha').html(cad);
                $('#selectFecha')[0].value = -1;
                $('#dv_ComboFechas').attr("style", "display:block");
                $('#dv_ComboSis').attr("style", "display:block");
                $("#selectSisN").val("0");
                setTimeout(terminarWait, 200);
            }
        },
        function (data) {
            setTimeout(terminarWait, 200);
        }
    );

}

function GeneraFiles() {
    if ($('#selectSistema').val() != '4') {
        var cartera = $('#selectSistema').val();
        var fecha = $('#selectFecha').val();
        Waiting(true, "Cargando Información...");
        SicreNet.Calificacion.HojasdeTrabajo.HojasTrabajo.generaArchivos("2", cartera, fecha, function (response) {
            if (!response.value.startsWith('Error:')) {
                $('#dvBtnGenera').attr("style", "display:none");
                $('#dvBtnDescarga').attr("style", "display:block");
            }
            else {
                $('#dvBtnGenera').attr("style", "display:block");
                $('#dvBtnDescarga').attr("style", "display:none");
            }
            setTimeout(terminarWait, 200);

        });
    } else {//consumo
        var cartera = $('#selectSisN').val();
        var fecha = $('#selectFecha').val();
        var facturacion = $('#selectFacturacion').val();
        Waiting(true, "Cargando Información...");
        SicreNet.Calificacion.HojasdeTrabajo.HojasTrabajo.generaArchivosConsumo("3", cartera, facturacion, fecha, function (response) {
            if (!response.value.startsWith('Error:')) {
                $('#dvBtnGenera').attr("style", "display:none");
                $('#dvBtnDescarga').attr("style", "display:block");
                setTimeout(terminarWait, 200);
            }
            else {
                setTimeout(terminarWait, 200);
                var msg = response.value;
                MostrarMsj(msg.replace("Error:", ""), "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
                $('#dvBtnGenera').attr("style", "display:block");
                $('#dvBtnDescarga').attr("style", "display:none");
            }
            setTimeout(terminarWait, 200);

        });

    }

}

function btnDescarga_Click() {
    Waiting(true, "Descargando Archivo...");
    __doPostBack('descargaArchivo', true);
    //Sys.WebForms.PageRequestManager.getInstance().add_endRequest(Waiting(false, "Descargando Archivo..."));
    setTimeout(terminarWait, 6000);
}


