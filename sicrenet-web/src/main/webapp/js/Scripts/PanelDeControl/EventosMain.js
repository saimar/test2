function BtnsVariasOptions_Click(objThis) {
    if ($("#" + $(objThis).attr('id').split('_')[1].split('-')[0]).attr("class") == "EstatusAmarillo") { MostrarMsj("Existe un proceso " + $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[0] + " en ejecución. Intente mas tarde. ", " AVISO " + $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[0], false, true, false, "", "Aceptar", "", 340, 140, null, null, null); return; }

    var idFuenteAValidar = $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[1];
    if (idFuenteAValidar != 12 && idFuenteAValidar != 13 && idFuenteAValidar != 14 && idFuenteAValidar != 15 && idFuenteAValidar != 17 && idFuenteAValidar != 18) {
        MostrarMsj("¿Está seguro que desea Iniciar el Proceso de <span style='font-weight:bold;'>" + $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[0] + "</span>? ", "Mensaje " + $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[0], true, true, false, "Si", "No", "", 300, 120,
        function () {
            $("#divVentanaMensajes").dialog("close");
            ValidaExisteProcesoExistente(objThis);
        }, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
    }
    else ValidaExisteProcesoExistente(objThis);
    //CasefuentesBtnsVaios(objThis);

}
function ValidaExisteProcesoExistente(objThis) {
    var parametrosJobExisteProcesoActivo = {
        idFuente: $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[1],
        idPais: parseInt(PaisSelectXUser),
        fecha: fechaP.split(",")[0] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[2]
    };
    peticionAjax('PanelDeControl.aspx/ValidaProcesoExistenteE2', "POST", parametrosJobExisteProcesoActivo,
                function ValidaProcesoExistenteE2_Finish(data) {
                    if (data.d == "0") {
                        if (PaisSelectXUser == "1") {
                            CasefuentesBtnsVaios(objThis);
                        } else {
                            CasefuentesBtnsVariosLAM(objThis);
                        }
                    }
                    else {
                        MostrarMsj("Existe un proceso de " + $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[0] + " en ejecución en el " + (data.d == "1" ? "TABLERO DE CONTROL MENSUAL" : data.d == "2" ? "TABLERO DE CONTROL SEMANAL" : "TABLERO DE CONTROL DIARIO") + ". Intente mas tarde. ", " AVISO " + $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[0], false, true, false, "", "Aceptar", "", 340, 140, null, null, null); return;
                    }
                }, null);
}

function CasefuentesBtnsVaios(objThis) {
    switch ($(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[1]) {
        case "1": /*"ALNOVA"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": EjecutaJobAlnova_Click(objThis, 1, "EjecutarJobAlnova"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "2": /*"ALNOVA COMP"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": EjecutaJobAlnova_Click(objThis, 2, "EjecutarJobAlnovaComplemento"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "3": /*"COBRANZA"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": DescargaCobranza_click(objThis, "Alnova.dbo.usp_TableroSSISCobranzaMasivo"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "4": /*"PROXIMAS FACTURAS"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": EjecutaJobAlnova_Click(objThis, 4, "EjecutarJobProximasFacturas"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "5": /*"CREDIMAX"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": NuevoReproceso_Click(objThis); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
            break;
        case "6": /*"CREDIMAX COMP"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": NuevoReproceso_Click(objThis); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
            break;
        case "7": /*"ARRMTO CRMX"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": NuevoReproceso_Click(objThis); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
            break;
        case "8": /*"ARRMTO CRMX COMP"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": NuevoReproceso_Click(objThis); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
            break;
        case "9": /*"MEDIOS DE PAGO"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": EjecutaJobAlnova_Click(objThis, 9, "EjecutarJobTDC"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "10": /*"CONTROL FITIRES"*/
            break;
        case "11": /*"INDICES Y VALORES"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": EjecutaJobAlnova_Click(objThis, 11, "EjecutarJobIndicesValores"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "12": /*"PRIMAS"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": AgregarVtnCargarFiles(objThis, 12); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "13": /*"CONCILIACION"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": AgregarVtnCargarFiles(objThis, 13); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "14": /*"GENERAL ADICIONAL"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": AgregarVtnCargarFiles(objThis, 14); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "15": /*"RSVA ADICIONAL"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": AgregarVtnCargarFiles(objThis, 15); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "16": /*"ARRMTO ALNOVA"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": EjecutaJobAlnova_Click(objThis, 16, "EjecutarJobArrmtoAlnova"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "17": /*"SIC"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": AgregarVtnCargarFiles(objThis, 17); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "18": /*"GARANTIAS"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": EjecutaJobAlnova_Click(objThis, 18, "EjecutarJobGarantias"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
        case "19": /*"CLIENTES"*/
            switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
                case "1": EjecutaJobAlnova_Click(objThis, 19, "EjecutarJobClientes"); break;
                case "2": break;
                case "3": break;
                case "4": break;
                case "5": break;
                case "6": break;
                case "7": break;
            }break;
        case "20": /*"CAPTACIÓN"*/
            switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
                case "1": EjecutaJobAlnova_Click(objThis, 20, "EjecutarJobCaptacion"); break;
                case "2": break;
                case "3": break;
                case "4": break;
                case "5": break;
                case "6": break;
                case "7": break;
            } break;
        case "21": /*"BALANZA MENSUAL"*/
            switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
                case "1": EjecutaJobGenerico_Click(objThis, 21, "EjecutarJobBalanza"); break;
                case "2": break;
                case "3": break;
                case "4": break;
                case "5": break;
                case "6": break;
                case "7": break;
            } break;

        case "22": /*"R01"*/
            switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
                case "1": EjecutaJobGenerico_Click(objThis, 22, "EjecutarJobR01"); break;
                case "2": break;
                case "3": break;
                case "4": break;
                case "5": break;
                case "6": break;
                case "7": break;
            } break;

        case "23": /*"CLIENTE PAZ"*/
            switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
                case "1": EjecutaJobClientes_Click(objThis, 23, "EjecutarJobClientesPAZ"); break;
                case "2": break;
                case "3": break;
                case "4": break;
                case "5": break;
                case "6": break;
                case "7": break;
            } break;
        case "24": /*"CLIENTE UNICO"*/
            switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
                case "1": EjecutaJobGenerico_Click(objThis, 24, "EjecutarJobClientesUNICO"); break;
                case "2": break;
                case "3": break;
                case "4": break;
                case "5": break;
                case "6": break;
                case "7": break;
            } break;
        case "30": /*"SIC"*/switch ($(objThis).attr('id').split('-')[1].split('_')[0]) {
            case "1": AgregarVtnCargarFiles(objThis, 30); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
            case "6": break;
            case "7": break;
        } break;
    }
}


function EjecutaJobClientes_Click(objThis, Idfuente, namewebMethod) {
    $("#" + $(objThis).attr('id').split('_')[1].split('-')[0]).attr("class", "EstatusAmarillo");

    var parametros = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], fase: parseInt($(objThis).attr("id").split('-')[1].split('_')[0]), IdEstatus: 2, fuente: Idfuente, user: userLogin, error: "", peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/AgregaIndicadorTablero', "POST", parametros,
        function Finalizada_AgregaIndicadorTablero() {
            var parametrosJobAlnova = {
                anio: fechaP.split(',')[0],
                mes: fechaP.split(',')[1],
                dia: fechaP.split(',')[2],
                nombreFile: document.getElementById("txtNombreFile_" + Idfuente).value,
                peridiocidad: (periocidadSelectXUser),
                usuario: userLogin,
                IdFuente: Idfuente
            };
            peticionAjax('PanelDeControl.aspx/' + namewebMethod, "POST", parametrosJobAlnova,
                function LlamadaJob_Iniciada(data) {
                    if (data.d != "") MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1]).show();
                    $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1] + "_txt").show();
                    $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1]).attr("lang", "ab");
                    //valorInicialPB = 0; valorPorcentajeAnteriorArrmtoPB = 0.2; objArrmtoPB = objThis; fuentePPB = Idfuente; esLoadingPB = false; esXSucursalPB = false; esAlnovaPB = true;
                    $("#" + $(objThis).attr('id').split('_')[1].split('-')[0]).attr("class", "EstatusAmarillo");
                    ProgressBarArrmto(0, 0.2, objThis, Idfuente, false, false, true);
                }, null);
        }, null);
}


function EjecutaJobGenerico_Click(objThis, Idfuente, namewebMethod) {
    $("#" + $(objThis).attr('id').split('_')[1].split('-')[0]).attr("class", "EstatusAmarillo");
    // alert($(objThis).attr("id")); //
    //alert(parseInt($(objThis).attr("id").split('-')[1].split('_')[0]));   
    var parametros = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], fase: parseInt($(objThis).attr("id").split('-')[1].split('_')[0]), IdEstatus: 2, fuente: Idfuente, user: userLogin, error: "", peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/AgregaIndicadorTablero', "POST", parametros,
        function Finalizada_AgregaIndicadorTablero() {
            var parametrosJobAlnova = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], nombreFile: /*document.getElementById("txtNombreFile_" + Idfuente).value*/ 'BALANZA', peridiocidad: (periocidadSelectXUser), usuario: userLogin, idPais: PaisSelectXUser };
            peticionAjax('PanelDeControl.aspx/' + namewebMethod, "POST", parametrosJobAlnova,
                function LlamadaJob_Iniciada(data) {
                    if (data.d != "") MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1]).show();
                    $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1] + "_txt").show();
                    $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1]).attr("lang", "ab");
                    //valorInicialPB = 0; valorPorcentajeAnteriorArrmtoPB = 0.2; objArrmtoPB = objThis; fuentePPB = Idfuente; esLoadingPB = false; esXSucursalPB = false; esAlnovaPB = true;
                    $("#" + $(objThis).attr('id').split('_')[1].split('-')[0]).attr("class", "EstatusAmarillo");
                    ProgressBarArrmto(0, 0.2, objThis, Idfuente, false, false, true);
                }, null);
        }, null);
}


function EjecutaJobAlnova_Click(objThis, Idfuente, namewebMethod) {
    $("#" + $(objThis).attr('id').split('_')[1].split('-')[0]).attr("class", "EstatusAmarillo");

    var parametros = {
        anio: fechaP.split(',')[0],
        mes: fechaP.split(',')[1],
        dia: fechaP.split(',')[2],
        fase: parseInt($(objThis).attr("id").split('-')[1].split('_')[0]),
        IdEstatus: 2,
        fuente: Idfuente,
        user: userLogin,
        error: "",
        peridiocidad: (periocidadSelectXUser),
        idPais: PaisSelectXUser
    };

    peticionAjax('PanelDeControl.aspx/AgregaIndicadorTablero', "POST", parametros,
        function Finalizada_AgregaIndicadorTablero() {
            var parametrosJobAlnova = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], nombreFile: document.getElementById("txtNombreFile_" + Idfuente).value, peridiocidad: (periocidadSelectXUser), usuario: userLogin, idPais: PaisSelectXUser };
            peticionAjax('PanelDeControl.aspx/' + namewebMethod, "POST", parametrosJobAlnova,
                function LlamadaJob_Iniciada(data) {
                    if (data.d != "") MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1]).show();
                    $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1] + "_txt").show();
                    $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1]).attr("lang", "ab");
                    //valorInicialPB = 0; valorPorcentajeAnteriorArrmtoPB = 0.2; objArrmtoPB = objThis; fuentePPB = Idfuente; esLoadingPB = false; esXSucursalPB = false; esAlnovaPB = true;
                    ProgressBarArrmto(0, 0.2, objThis, Idfuente, false, false, true);
                }, null);
        }, null);
}


function CasefuentesBtnsVariosLAM(objThis) {
    switch (PaisSelectXUser) {
        case "2": /*GUATEMALA*/switch ($(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[1]) {//fuente
            case "1": EjecutaJobAlnova_Click(objThis, 1, "EjecutarJobAlnova"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": NuevoReproceso_Click(objThis); break;
        } break;
        case "4": /*HONDURAS*/switch ($(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[1]) {//fuente
            case "1": EjecutaJobAlnova_Click(objThis, 1, "EjecutarJobAlnova"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
        } break;
        case "6": /*PERU*/switch ($(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[1]) {//fuente
            case "1": EjecutaJobAlnova_Click(objThis, 1, "EjecutarJobAlnova"); break;
            case "2": EjecutaJobLAM_Click(objThis, 2, "EjecutaJobLAM"); break; //RCC
            case "3": EjecutaJobLAM_Click(objThis, 3, "EjecutaJobLAM"); break; //RCD
            case "4": EjecutaJobLAM_Click(objThis, 4, "EjecutaJobLAM"); break; //RMD
            case "5": break;
        } break;
        case "7": /*PANAMA*/switch ($(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[1]) {//fuente
            case "1": break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": NuevoReproceso_Click(objThis); break;
        } break;
        case "8": /*EL SALVADOR*/switch ($(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[1]) {//fuente
            case "1": EjecutaJobAlnova_Click(objThis, 1, "EjecutarJobAlnova"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
        } break;
        case "9": /*ARGENTINA*/switch ($(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[1]) {//fuente
            case "1": break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
        } break;
        case "11": /*BRASIL*/switch ($(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[1]) {//fuente
            case "1": EjecutaJobAlnova_Click(objThis, 1, "EjecutarJobAlnova"); break;
            case "2": break;
            case "3": break;
            case "4": break;
            case "5": break;
        } break;

    }

}

function EjecutaJobLAM_Click(objThis, Idfuente, namewebMethod) {
    $("#" + $(objThis).attr('id').split('_')[1].split('-')[0]).attr("class", "EstatusAmarillo");

    var parametros = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], fase: parseInt($(objThis).attr("id").split('-')[1].split('_')[0]), IdEstatus: 2, fuente: Idfuente, user: userLogin, error: "", peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/AgregaIndicadorTablero', "POST", parametros,
        function Finalizada_AgregaIndicadorTablero() {
            var parametrosJobAlnova = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], nombreFile: document.getElementById("txtNombreFile_" + Idfuente).value, fuente: Idfuente, peridiocidad: (periocidadSelectXUser), usuario: userLogin, idPais: PaisSelectXUser };
            peticionAjax('PanelDeControl.aspx/' + namewebMethod, "POST", parametrosJobAlnova,
            function LlamadaJob_Iniciada(data) {
                if (data.d != "") MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1]).show();
                $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1] + "_txt").show();
                $("#div" + $(objThis).attr("id").split('-')[0].split('_')[1]).attr("lang", "ab");
                //valorInicialPB = 0; valorPorcentajeAnteriorArrmtoPB = 0.2; objArrmtoPB = objThis; fuentePPB = Idfuente; esLoadingPB = false; esXSucursalPB = false; esAlnovaPB = true;
                ProgressBarArrmto(0, 0.2, objThis, Idfuente, false, false, true);
            }, null);
        }, null);
}

//------------------------------------------------------CARGA ARCHIVOS COMPLEMENTO SICRENET

function enviarArchivoAsincronamenteCargaFileComplementos(objThis, idFuente) {
    if ($("#" + $(objThis).attr('id').split('_')[1].split('-')[0]).attr("class") == "EstatusAmarillo") {
        WaitingVtn("divBloqVtndivCargaFileComplemento", true, false, "");
        MostrarMsj("Existe un proceso " + $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[0] + " en ejecución. Intente mas tarde. ", " AVISO " + $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[0], false, true, false, "", "Aceptar", "", 320, 140, null, function () {
            WaitingVtn("divBloqVtndivCargaFileComplemento", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivCargaFileComplemento", false, false, "");
        });
        return;
    }

    var parametrosJobExisteProcesoActivo = {
        idFuente: $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[1],
        idPais: PaisSelectXUser,
        fecha: fechaP.split(",")[0] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[2]
    };
    peticionAjax('PanelDeControl.aspx/ValidaProcesoExistenteE2', "POST", parametrosJobExisteProcesoActivo,
                function ValidaProcesoExistenteE2_Finish(data) {
                    if (data.d == "0") {
                        if (!validarExistenciaDeArchivo($(objThis).parent().parent().find("input:file"))) {
                            $('#lbError').html('Seleccione un archivo .txt');
                            return false;
                        }
                        if (idFuente == "17") {
                            $("#divCargaFileComplemento").dialog("close");
                            MostrarMsj("Se ha lanzado la descarga del Archivo SIC.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                        }
                        WaitingVtn("divBloqVtndivCargaFileComplemento", true, true, "Cargando Archivo");
                        document.getElementById("imgVtnLoading").style.marginTop = "5%";
                        var idInputFile = $(objThis).parent().parent().find("input:file").attr("id");
                        var parametros = {
                            'subirArchivoComplementoSicreNet': 'subirArchivoComplementoSicreNet',
                            'idFuente': idFuente
                        };
                        return ajaxFileUpload(idInputFile, objThis, parametros);
                    }
                    else {
                        WaitingVtn("divBloqVtndivCargaFileComplemento", true, false, "");
                        MostrarMsj("Existe un proceso de " + $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[0] + " en ejecución en el " + (data.d == "1" ? "TABLERO DE CONTROL MENSUAL" : data.d == "2" ? "TABLERO DE CONTROL SEMANAL" : "TABLERO DE CONTROL DIARIO") + ". Intente mas tarde. ", " AVISO " + $(objThis).attr('id').split('-')[1].split('_')[2].split('&&&')[0], false, true, false, "", "Aceptar", "", 250, 120, null, function () {
                            WaitingVtn("divBloqVtndivCargaFileComplemento", false, false, "");
                            $("#divVentanaMensajes").dialog("close");
                        }, null);
                        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                            WaitingVtn("divBloqVtndivCargaFileComplemento", false, false, "");
                        });
                    }
                }, null);
}

function AgregarVtnCargarFiles(objThis, indiceItemSelect) {
    peticionAjax('PanelDeControl.aspx/setDatosDatosSIC', "POST", { fecha: fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], periodicidad: periocidadSelectXUser, idPais: PaisSelectXUser },
               function (data) {
                   var cadena = '<div id="divBloqVtndivCargaFileComplemento" style="width:98%;height:90%; z-index: 100;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div>';
                   cadena += '<div style="height: 94%;"> ' +
                               '<div id="divVentanaCargaFileUltimasFuentesTemp" style="height: 100%;">' +
                               ((indiceItemSelect == '17' || indiceItemSelect == '30') ? (
                                '<div style="width: 100%;height: 100%;">' +
                                 '<div style="height: 97%;width: 70%;display: inline-block; position: relative;float: left;">' +
                                  '<fieldset id="fieldCargaNormalSIC" style="border: 1px solid gray; padding: 10px;height: 90%;">' +
                                   '<legend style="font-weight: bold; text-align: left; font-size: 11px;">CARGA NORMAL</legend>') : '') +
                                   '<center>' +
                                       '<table border="0" cellpadding="0" cellspacing="0">' +
                                        '<tbody>' + ((indiceItemSelect == '17' || indiceItemSelect == '30') ? (
                                           '<tr>' +
                                               '<td  style="font-weight:bold;white-space: nowrap; font-size: 10px; ">' +
                                                   'Ruta: <span>' + (indiceItemSelect == 17 ? arrayNombresRutasfiles[16].split('||')[0].split('&&').join('\\') : arrayNombresRutasfiles[29].split('||')[0].split('&&').join('\\')) + '</span>' +
                                                '</td>' +
                                           '</tr>' +
                                           '<tr>' +
                                               '<td colspan="3" style="font-weight:bold;white-space: nowrap;">' +
                                                   'Nombre :<input id="txtNombreArchivoReporteriaSIC" type="text" style="width:50%;" value="' + (indiceItemSelect == 17 ? arrayNombresRutasfiles[16].split('||')[1].split('&&&')[0].split('&&').join('\\') : arrayNombresRutasfiles[29].split('||')[1].split('&&&')[0].split('&&').join('\\')) + fechaP.split(',')[0].substring(2) + fechaP.split(',')[1] + fechaP.split(',')[2] + '"/>' +
                                                '</td>' +
                                                '<td style="text-align: right;">' +
                                                   '<input type="button" value="Iniciar Descarga" class="classButton" onclick="btnIniciarDescargaSIC_Click(false, ' + indiceItemSelect + ')"/>' +
                                                '</td>' +
                                           '</tr>') : '') +
                                           '<tr> ' +



                                               '<td class="TextBoxArribaCentro" colspan="3" style="height: 25px;font: normal 10px Helvetica, Arial, sans-serif;" align="left">' +
                                                   '&nbsp;<input type="file" name="AjaxUpload" id="AjaxUpload" style="font-family:Arial;font-size:X-Small;width:441px;">' +
                                               '</td>' +
                                               '<td class="TextBoxArribaDerecha" style="height: 25px;text-align: right;">' +
                                                   '&nbsp;<input type="button" name="btnLoad" value="Cargar Archivo" id="' + $(objThis).attr("id") + '" class="classButton" style="font-family:Arial;font-size:X-Small;" onclick="enviarArchivoAsincronamenteCargaFileComplementos(this,\'' + indiceItemSelect + '\')">' +
                                               '</td>' +
                                           '</tr>' +
                                           '<tr>' +

                                           //((indiceItemSelect == '17' || indiceItemSelect == '30') ? (
                                           //    '<td class="TextBoxArribaCentro" colspan="3" style="height: 25px;font: normal 10px Helvetica, Arial, sans-serif;" align="left">' +
                                           //        '&nbsp;<input type="file" name="AjaxUpload" id="AjaxUpload" style="font-family:Arial;font-size:X-Small;width:441px;">' +
                                           //    '</td>' +
                                           //    '<td class="TextBoxArribaDerecha" style="height: 25px;text-align: right;">' +
                                           //        '&nbsp;<input type="button" name="btnLoad" value="Cargar Archivo" id="' + $(objThis).attr("id") + '" class="classButton" style="font-family:Arial;font-size:X-Small;" onclick="enviarArchivoAsincronamenteCargaFileComplementos(this,\'' + indiceItemSelect + '\')">' +
                                           //    '</td>'
                                           //    ) :
                                           //     '<td class="TextBoxArribaCentro" colspan="3" style="height: 25px;font: normal 10px Helvetica, Arial, sans-serif;" align="left">' +
                                           //    '</td>' +
                                           //    '<td class="TextBoxArribaDerecha" style="height: 25px;text-align: right;">' +
                                           //    '</td>'
                                           //    ) +

                                           //'</tr>' +
                                           //'<tr>' +
                                               '<td>' +
                                               '</td>' +
                                               '<td colspan="3">' +
                                                   '<span id="labelMsjUltimo" style="display:none">Último archivo cargado:</span><span id="lblMensaje" style="color:Green;font-size:XX-Small;"></span>' +
                                               '</td>' +
                                               '<td>' +
                                               '</td>' +
                                          '</tr>' +
                                          '<tr>' +
                                           '<td class="TextBoxCentroIzquierda" style="width: 20px; height: 20px">' +
                                               '&nbsp;' +
                                           '</td>' +
                                           '<td class="TextBoxCentroCentro" style="width: 32px">' +
                                               '&nbsp;' +
                                            '</td>' +
                                            '<td class="TextBoxCentroCentro" style="width: 20px">' +
                                               '&nbsp;' +
                                            '</td>' +
                                            '<td class="TextBoxCentroCentro" style="width: 400px">' +
                                               '<div id="divTextoMensaje"></div>' +
                                            '</td>' +
                                            '<td class="TextBoxCentroDerecha" style="width: 160px; text-align: justify;font: normal 10px Helvetica, Arial, sans-serif;">' +
                                             ((indiceItemSelect != '17' || indiceItemSelect == '30') ? '<a id="HyperLink2" style="color: rgb(0, 0, 255);" href="../../Layout/Layout%20Excel%202007.xlsx">Layout Excel 2007</a>' : '') +
                                            '</td>' +
                                          '</tr>' +
                                          '<tr>' +
                                            '<td class="TextBoxAbajoIzquierda">' +
                                               '&nbsp;' +
                                            '</td>' +
                                            '<td class="TextBoxAbajoCentro" colspan="3" style="height: 20px;font: normal 12px Helvetica, Arial, sans-serif;">&nbsp;<span id="lbError" style="color:Red;font-weight:bold;">' +
                                               '</span>' +
                                            '</td>' +
                                           '<td class="TextBoxAbajoDerecha" style="width: 160px; text-align: justify;font: normal 10px Helvetica, Arial, sans-serif;">' +
                                               ((indiceItemSelect != '17' || indiceItemSelect == '30') ? '<a id="HyperLink1" style="color: rgb(0, 0, 255);" href="../../Layout/Layout%20Excel%202003.xls">Layout Excel 2003</a>' : '') + '&nbsp;' +
                                           '</td>' +
                                         '</tr>' +
                                         '<tr>' +
                                           '<td class="TextBoxAreaBotones" colspan="5" style="height: 14px;font: normal 12px Helvetica, Arial, sans-serif;white-space:pre-wrap;text-align: right;">' +
                                               '<strong>Nota:</strong>Archivo en Formato txt, separado por ' + ((indiceItemSelect == '17' || indiceItemSelect == '30') ? 'Punto y Coma' : 'Tabuladores') + '.' +
                                           '</td>' +
                                         '</tr>' +
                                        '</tbody>' +
                                     '</table>' +
                                    '</center>' +
                                       ((indiceItemSelect == '17' || indiceItemSelect == '30') ? (
                                   '</fieldset>' +
                                  '</div>' +
                                  '<div style="width: 30%;height: 97%;display: inline-block; position: relative;float: right;">' +
                                   '<fieldset id="fieldCargaMasivaSIC" style="border: 1px solid gray; padding: 10px;height: 90%;">' +
                                      '<legend style="font-weight: bold; text-align: left; font-size: 11px;">CARGA MASIVA</legend>' +
                                       '<div id="divCheckCargaMasiva" style="height:86%;overflow:auto;text-align: left;">') : '');
                   if (indiceItemSelect == '17' || indiceItemSelect == '30') {
                       var agregarFecha = false;
                       for (var i = 0; i < $("#dpFechaPeriodoGral").attr("accesskey").split(',').length; i++) {
                           var fechaChk = $("#dpFechaPeriodoGral").attr("accesskey").split(',')[i];
                           if (new Date(fechaChk.split('/')[2] + "-" + fechaChk.split('/')[1] + "-" + fechaChk.split('/')[0]) >= new Date("2013-11-30") && new Date(fechaChk.split('/')[2] + "-" + fechaChk.split('/')[1] + "-" + fechaChk.split('/')[0]) <= new Date(fechaP.split(',')[0] + "-" + fechaP.split(',')[1] + "-" + fechaP.split(',')[2]))
                               agregarFecha = true;
                           else
                               agregarFecha = false;

                           if (agregarFecha)
                               cadena += (indiceItemSelect == '17' ? arrayNombresRutasfiles[16].split('||')[1].split('&&&')[0] : arrayNombresRutasfiles[29].split('||')[1].split('&&&')[0]) + fechaChk.split('/')[2].substring(2) + fechaChk.split('/')[1] + fechaChk.split('/')[0] + '&nbsp&nbsp&nbsp<input type="checkbox" disabled="disabled"  checked="checked"/>' + "</br>";
                       }
                   }

                   cadena += ((indiceItemSelect == '17' || indiceItemSelect == '30') ? (
                                                  '</div>' +
                                                 '<input type="button" value="Iniciar Descarga" class="classButton" style=" float:right;" onclick="btnIniciarDescargaSIC_Click(true, ' + indiceItemSelect + ')"/>' +
                                               '</fieldset>' +
                                              '</div>' +
                                             '</div>') : '');
                   cadena += '<a runat="server" id="ExpanderGrid" style="font: normal 12px Helvetica, Arial, sans-serif;color:Black;float: left;display:none" >' +
                                   ' <img src="../../Images/PanelDeControl/Expander/insert.jpg" id="insert2" style="vertical-align: middle;cursor:pointer;" onclick="toggleSlide(\'div2\',this.id,\'vtnH\',\'divCargaFileComplemento\',-1);" alt="expander" />El agrupador no cuenta con las siguientes unidades de negocio' +
                                  '</a>' +
                                   '<div id="div2" runat="server" style="display: none; overflow: auto; height: 75px;margin: 10px;width:98%">' +
                                       '<div id="tblNewUnidadesNeg"></div>' +
                                   '</div>' +
                               '</div>' +
                           '</div>';
                   $("#divCargaFileComplemento").empty();
                   $("#divCargaFileComplemento").html(cadena);
                   AgregarVtnFlotante("divCargaFileComplemento", "", "CARGA ARCHIVO " + $(objThis).attr("id").split("_")[3].split("&&&")[0], "", cadena, (indiceItemSelect == '17' || indiceItemSelect == '30') ? 250 : 200, (indiceItemSelect == '17' || indiceItemSelect == '30') ? 950 : 650, false, false, "", "", null);
               }, null);
}

function btnIniciarDescargaSIC_Click(esMasivo, idFuente) {
    var lanzarDescargaSIC = true;
    if (esMasivo && $("#divCheckCargaMasiva").html() == "") {
        lanzarDescargaSIC = false;
        WaitingVtn("divBloqVtndivCargaFileComplemento", true, false, "Cargando Información...");
        MostrarMsj("No hay Fechas de Corte a Descargar.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 135, null, function () {
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndivCargaFileComplemento", false, false, "");
        });
    }
    if (lanzarDescargaSIC) {
        $("#divCargaFileComplemento").dialog("close");
        MostrarMsj("Se ha lanzado la " + (esMasivo ? " <span style='font-weight:bold;'>DESCARGA MASIVA</span> de los Archivos SIC." : "descarga del Archivo SIC <span style='font-weight:bold;'>" + $("#txtNombreArchivoReporteriaSIC").val() + "</span>."), "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);

        var parametros = {
            anio: fechaP.split(",")[0],
            mes: fechaP.split(",")[1],
            dia: fechaP.split(",")[2],
            peridiocidad: periocidadSelectXUser,
            usuario: userLogin,
            idPais: PaisSelectXUser,
            nombreArchivo: !esMasivo ? $("#txtNombreArchivoReporteriaSIC").val() : "MASIVA",
            idFuente: idFuente
        };

        peticionAjax('PanelDeControl.aspx/EjecutarJobSICDeReporteria', "POST", parametros,
                function (data) {
                    if (data.d.indexOf("ERRORCATCH") != -1)
                        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
                    Waiting(false, "Espere por favor. Cargando Información...");
                }, null);
    }
}

var arregloSucursalesSintransmitir = null; var entroEjecutarXSucursal = false;
function EjecutaJobCredimaxPorSucursales_Click() {
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtnXSucursal", false, false, "");
        WaitingVtn("divBloqVtnXSucursalBtns", false, false, "");
    });
    if ($("#" + $(".ui-button-text").attr("id").split('_')[1].split('-')[0]).attr("class") == "EstatusAmarillo") { WaitingVtn("divBloqVtnXSucursal", true, false, ""); WaitingVtn("divBloqVtnXSucursalBtns", true, false, ""); MostrarMsj("Existe un proceso " + $(".ui-button-text").attr("id").split("_")[2].split("&&&")[0] + " en ejecución. Intente mas tarde. ", " AVISO " + $(".ui-button-text").attr("id").split("_")[2].split("&&&")[0], false, true, false, "", "Aceptar", "", 320, 120, null, function () { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnXSucursal", false, false, ""); WaitingVtn("divBloqVtnXSucursalBtns", false, false, ""); }, null); return; }

    var parametrosJobExisteProcesoActivo = {
        idFuente: $(".ui-button-text").attr("id").split("_")[2].split("&&&")[1],
        idPais: PaisSelectXUser,
        fecha: fechaP.split(",")[0] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[2]

    };
    peticionAjax('PanelDeControl.aspx/ValidaProcesoExistenteE2', "POST", parametrosJobExisteProcesoActivo,
                function ValidaProcesoExistenteE2_Finish(data) {
                    if (data.d == "0") EjecutaJobXSucursalesGral();
                    else {
                        MostrarMsj("Existe un proceso de " + $(".ui-button-text").attr("id").split("_")[2].split("&&&")[0] + " en ejecución en el " + (data.d == "1" ? "TABLERO DE CONTROL MENSUAL" : data.d == "2" ? "TABLERO DE CONTROL SEMANAL" : "TABLERO DE CONTROL DIARIO") + ". Intente mas tarde. ", " AVISO " + $(".ui-button-text").attr("id").split("_")[2].split("&&&")[0], false, true, false, "", "Aceptar", "", 320, 120, null, null, null); return;
                    }
                }, null);
}

function EjecutaJobXSucursalesGral() {
    if ($("#tablaSucursales_" + ($(".ui-button-text").attr("id").split("_")[1]) + " tr").length > 1) {
        var cadenaInput = "";
        var aregloTrue = false;
        for (var i = 1; i < $("#tablaSucursales_" + $(".ui-button-text").attr("id").split("_")[1] + " tr").length; i++) {
            for (var ii = 0; ii < 2; ii++) {
                if ($($("#tablaSucursales_" + ($(".ui-button-text").attr("id").split("_")[1]) + " tr")[i].cells[ii].firstChild).attr("value") != "")
                    cadenaInput += $($("#tablaSucursales_" + ($(".ui-button-text").attr("id").split("_")[1]) + " tr")[i].cells[ii].firstChild).attr("value") + (ii < 1 ? "&&&" : "");
                else {
                    aregloTrue = true;
                    break;
                }
            }

            cadenaInput += "%%%";
            if (aregloTrue)
                break;
        }
        if (!aregloTrue) {
            arregloSucursalesSintransmitir = new Array();
            for (var i = 0; i < cadenaInput.split('%%%').length - 1; i++) {
                arregloSucursalesSintransmitir.push(cadenaInput.split('%%%')[i].split('&&&')[0] + "," + cadenaInput.split('%%%')[i].split('&&&')[1].split('/')[0] + "," +
                cadenaInput.split('%%%')[i].split('&&&')[1].split('/')[1] + "," + cadenaInput.split('%%%')[i].split('&&&')[1].split('/')[2] + "-false");
            }
            objCheckPorSucursalCredimax = $(".ui-button-text").attr("id");
            if (objCheckPorSucursalCredimax.split("_")[2].split("&&&")[1] == "5")//CREDIMAX 
            {
                JobAejecutarFlujoNormal = "EjecutarJobCredimax"; JobAejecutarXSucursal = "EjecutarJobCredimax_X_Sucursal"; fuenteXS = 5; JobValidaXSucursal = "AspDtsJobTableroCREDIMAXF1_x_Sucursal"; JobValidaFlujoNormal = "AspDtsJobTableroCREDIMAXF1";
                Paso1EjecucionJob('AspDtsJobTableroCREDIMAXF1', 'AspDtsJobTableroCREDIMAXF1_x_Sucursal', "CREDIMAX");
            }

            if (objCheckPorSucursalCredimax.split("_")[2].split("&&&")[1] == "6")//CREDIMAX COMP
            {
                JobAejecutarFlujoNormal = "EjecutarJobCredimaxCOMP"; JobAejecutarXSucursal = "EjecutarJobCredimaxCOMP_X_Sucursal"; fuenteXS = 6; JobValidaXSucursal = "AspDtsJobTableroCREDIMAXCOMPF1_x_Sucursal"; JobValidaFlujoNormal = "AspDtsJobTableroCREDIMAXCOMPF1";
                Paso1EjecucionJob('AspDtsJobTableroCREDIMAXCOMPF1', 'AspDtsJobTableroCREDIMAXCOMPF1_x_Sucursal', "CREDIMAX COMP");
            }

            if (objCheckPorSucursalCredimax.split("_")[2].split("&&&")[1] == "7")//ARRMTO CREDIMAX
            {
                JobAejecutarFlujoNormal = "EjecutarJobArrmtoCredimax"; JobAejecutarXSucursal = "EjecutarJobArrmtoCredimax_X_Sucursal"; fuenteXS = 7; JobValidaXSucursal = "AspDtsJobTableroARMNTOCREDIMAXF1_x_Sucursal"; JobValidaFlujoNormal = "AspDtsJobTableroARMNTOCREDIMAXF1";
                Paso1EjecucionJob('AspDtsJobTableroARMNTOCREDIMAXF1', 'AspDtsJobTableroARMNTOCREDIMAXF1_x_Sucursal', "ARRMTO CREDIMAX");
            }
            if (objCheckPorSucursalCredimax.split("_")[2].split("&&&")[1] == "8")//ARRMTO CREDIMAX COMP
            {
                JobAejecutarFlujoNormal = "EjecutarJobArrmtoCredimaxCOMP"; JobAejecutarXSucursal = "EjecutarJobArrmtoCredimaxCOMP_X_Sucursal"; fuenteXS = 8; JobValidaXSucursal = "AspDtsJobTableroARMNTOCREDIMAXCOMPF1_x_Sucursal"; JobValidaFlujoNormal = "AspDtsJobTableroARMNTOCREDIMAXCOMPF1";
                Paso1EjecucionJob('AspDtsJobTableroARMNTOCREDIMAXCOMPF1', 'AspDtsJobTableroARMNTOCREDIMAXCOMPF1_x_Sucursal', "ARRMTO CREDIMAX COMP");
            }
        }
        else {
            WaitingVtn("divBloqVtnXSucursal", true, false, "");
            WaitingVtn("divBloqVtnXSucursalBtns", true, false, "");
            MostrarMsj("Ingrese el No.Sucursal y Periodo. ", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnXSucursal", false, false, ""); WaitingVtn("divBloqVtnXSucursalBtns", false, false, ""); }, null);
        }
    }
    else {
        WaitingVtn("divBloqVtnXSucursal", true, false, "");
        WaitingVtn("divBloqVtnXSucursalBtns", true, false, "");
        MostrarMsj("Ingrese las Sucursales que No Transmitieron. ", "Mensaje", false, true, false, "", "Aceptar", "", 270, 120, null, function () { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtnXSucursal", false, false, ""); WaitingVtn("divBloqVtnXSucursalBtns", false, false, ""); }, null);
    }
}

function Paso1EjecucionJob(nameJobNormal, nameJobXSucursal, nameJobTxt) {
    var parametrosExistJobCredimax = { nameJob: nameJobNormal, Tipoconexion: '65' };
    peticionAjax("PanelDeControl.aspx/DevuelveSP_ExisteJobActivo", "POST", parametrosExistJobCredimax,
                function DevuelveSP_ExisteJobActivo_Finish(result) {
                    if (result.d == "false") {
                        var parametrosExistJobCredimaxXSucursal = { nameJob: nameJobXSucursal, Tipoconexion: '65' };
                        peticionAjax("PanelDeControl.aspx/DevuelveSP_ExisteJobActivo", "POST", parametrosExistJobCredimaxXSucursal,
                        function DevuelveSP_ExisteJobActivoXS_Finish(resultXS) {
                            if (resultXS.d == "false") {
                                $("#" + $(".ui-button-text").attr("id").split('_')[1].split('-')[0]).attr("class", "EstatusAmarillo");
                                contadorPorcentajeProgBar = 0.1;
                                valorPorcentajeAnteriorArrmto = 0.2;
                                entroIfMonitoreo = 0;
                                $(document.getElementById(objCheckPorSucursalCredimax.split("%%%")[1])).attr("disabled", "disabled");
                                entroEjecutarXSucursal = true;
                                EjecutaJobCredimaxPorSucursales();
                                $("#divSucursalesSinTransmitir").dialog("close");
                            }
                            else alert("Existe un Job" + nameJobTxt + " X Sucursal En Ejecución");
                        }, null);
                    }
                    else alert("Existe un Job " + nameJobTxt + " En Ejecución");
                }, null);
}

var objCheckPorSucursalCredimax = "";
var JobAejecutarFlujoNormal; var JobAejecutarXSucursal; var fuenteXS; var JobValidaXSucursal; var JobValidaFlujoNormal;
function EjecutaJobCredimaxPorSucursales() {
    var indexS = ExisteSucursalSinProcesarJob();
    //alert("index:" + indexS);
    var parametrosExistJob = { nameJob: JobValidaXSucursal, Tipoconexion: '65' };
    peticionAjax("PanelDeControl.aspx/DevuelveSP_ExisteJobActivo", "POST", parametrosExistJob,
        function DevuelveSP_ExisteJobActivo_Finish(result) {
            // alert(result.d);
            if (result.d == "false") {
                if (indexS == 0) {
                    //$(document.getElementById("chk-1_" + $(objCheckPorSucursalCredimax).attr("id").split('_')[1])).attr("disabled", "disabled");
                    var parametrosF1E2 = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], fase: 1, IdEstatus: 2, fuente: fuenteXS, user: userLogin, error: "", peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
                    peticionAjax('PanelDeControl.aspx/AgregaIndicadorTablero', "POST", parametrosF1E2,
                    function FinalizadaF1E2_AgregaIndicadorTablero() {
                        var parametrosF2E2 = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], fase: 2, IdEstatus: 2, fuente: fuenteXS, user: userLogin, error: "", peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
                        peticionAjax('PanelDeControl.aspx/AgregaIndicadorTablero', "POST", parametrosF2E2,
                        function FinalizadaF2E2_AgregaIndicadorTablero() {
                            var parametrosF3E2 = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], fase: 3, IdEstatus: 2, fuente: fuenteXS, user: userLogin, error: "", peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
                            peticionAjax('PanelDeControl.aspx/AgregaIndicadorTablero', "POST", parametrosF3E2,
                            function FinalizadaF3E2_AgregaIndicadorTablero() {
                                PeticionAjaxJobXSucursal(indexS, objCheckPorSucursalCredimax);
                            }, null);
                        }, null);
                    }, null);
                }
                else {
                    if (indexS > 0)
                        PeticionAjaxJobXSucursal(indexS, objCheckPorSucursalCredimax);
                    else if (indexS == -1) {
                        //alert("entro," + $(objCheckPorSucursalCredimax).attr("id"));
                        var parametrosF2E5 = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], fase: 2, IdEstatus: 5, fuente: fuenteXS, user: userLogin, error: "", peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
                        peticionAjax('PanelDeControl.aspx/AgregaIndicadorTablero', "POST", parametrosF2E5,
                        function FinalizadaF2E5_AgregaIndicadorTablero() {
                            var parametrosF3E5 = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], fase: 3, IdEstatus: 5, fuente: fuenteXS, user: userLogin, error: "", peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
                            peticionAjax('PanelDeControl.aspx/AgregaIndicadorTablero', "POST", parametrosF3E5,
                            function FinalizadaF3E5_AgregaIndicadorTablero() {
                                var parametrosF1E5 = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], fase: 1, IdEstatus: 5, fuente: fuenteXS, user: userLogin, error: "", peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
                                peticionAjax('PanelDeControl.aspx/AgregaIndicadorTablero', "POST", parametrosF1E5,
                                function FinalizadaF1E5_AgregaIndicadorTablero() {
                                    $(document.getElementById(objCheckPorSucursalCredimax.split("%%%")[1])).removeAttr("disabled");
                                    ProgressBarCredimaxXSucursal(100, 100, objCheckPorSucursalCredimax, fuenteXS, false, false);
                                }, null);
                            }, null);
                        }, null);
                    }
                }
            }
            else setTimeout(EjecutaJobCredimaxPorSucursales, 5000);
        }, null);
}

var contadorPorcentajeProgBar = 0.1; var contadorPorcentajeProgBarCredimaxComp = 0;
function PeticionAjaxJobXSucursal(indexS, objCheck) {
    // alert(arregloSucursalesSintransmitir[indexS].split('-')[0]);
    var parametrosJobXSucursal = { anio: arregloSucursalesSintransmitir[indexS].split('-')[0].split(',')[3], mes: arregloSucursalesSintransmitir[indexS].split('-')[0].split(',')[2], dia: arregloSucursalesSintransmitir[indexS].split('-')[0].split(',')[1], sucursal: arregloSucursalesSintransmitir[indexS].split('-')[0].split(',')[0], peridiocidad: (periocidadSelectXUser) };
    peticionAjax('PanelDeControl.aspx/' + JobAejecutarXSucursal,
    "POST", parametrosJobXSucursal,
        function Finalizada_EjecutarJobCredimax_X_Sucursal() {
            arregloSucursalesSintransmitir[indexS] = arregloSucursalesSintransmitir[indexS].split('-')[0] + "-true";
            //alert(arregloSucursalesSintransmitir.length);
            $("#div" + objCheck.split("-")[0]).attr("lang", "ab");
            $("#div" + objCheck.split("-")[0]).show();
            $("#div" + objCheck.split("-")[0] + "_txt").show();
            setTimeout(EjecutaJobCredimaxPorSucursales, 5000);
            if (arregloSucursalesSintransmitir.length == 1) ProgressBarCredimaxXSucursal(100, 0.1, objCheck, fuenteXS, false, true);
            else if (arregloSucursalesSintransmitir.length > 1) {
                ProgressBarCredimaxXSucursal(100, contadorPorcentajeProgBar, objCheck, fuenteXS, false, false);
                contadorPorcentajeProgBar = contadorPorcentajeProgBar + (Math.round(100 / arregloSucursalesSintransmitir.length));
            }

        }, null);
}

function ExisteSucursalSinProcesarJob() {
    var indexS = -1;
    for (var i = 0; i < arregloSucursalesSintransmitir.length; i++) {
        if (arregloSucursalesSintransmitir[i].split('-')[1] == "false") {
            indexS = i;
            break;
        }
    }
    return indexS;
}

function NuevoReproceso_Click(obj) {
    peticionAjax('PanelDeControl.aspx/GetHoraSistema', "POST", null,
    function (data) {
        if ((parseInt(data.d.split(":")[0]) >= 20 && data.d.split(":")[3] == "p.m.") || (parseInt(data.d.split(":")[0]) <= 3 && data.d.split(":")[3] == "a.m.")) {
            $("#" + $(obj).attr('id').split('_')[1].split('-')[0]).attr("class", "EstatusAmarillo");
            switch ($(obj).attr('id').split('_')[3].split('&&&')[1]) {
                case "5": /*"CREDIMAX"*/
                    LlamaJobNuevoReproceso("AspDtsJobTableroCREDIMAXF1", "AspDtsJobTableroCREDIMAXF1_x_Sucursal", "EjecutarJobCredimax", 5, obj);
                    break;
                case "6": /*"CREDIMAX COMP"*/
                    LlamaJobNuevoReproceso("AspDtsJobTableroCREDIMAXCOMPF1", "AspDtsJobTableroCREDIMAXCOMPF1_x_Sucursal", "EjecutarJobCredimaxCOMP", 6, obj);
                    break;
                case "7": /*"ARRMTO CRMX"*/
                    LlamaJobNuevoReproceso("AspDtsJobTableroARMNTOCREDIMAXF1", "AspDtsJobTableroARMNTOCREDIMAXF1_x_Sucursal", "EjecutarJobArrmtoCredimax", 7, obj);
                    break;
                case "8": /*"ARRMTO CRMX COMP"*/
                    LlamaJobNuevoReproceso("AspDtsJobTableroARMNTOCREDIMAXCOMPF1", "AspDtsJobTableroARMNTOCREDIMAXCOMPF1_x_Sucursal", "EjecutarJobArrmtoCredimaxCOMP", 8, obj);
                    break;
            }
        }
        else {
            MostrarMsj("La descarga para " + $(obj).attr('id').split('_')[3].split('&&&')[0] + " debe de ser programada de 8:00 pm a 3:00 am", " AVISO " + $(obj).attr('id').split('_')[3].split('&&&')[0], false, true, false, "", "Aceptar", "", 300, 120, null, null, null);
        }
    }
    , null);
}



function LlamaJobNuevoReproceso(nameJobFlujoN, nameJoxXSuc, nameWebMethod, idFuenteSelect, obj) {
    var parametrosExistJob = { nameJob: nameJobFlujoN, Tipoconexion: '65' };
    peticionAjax("PanelDeControl.aspx/DevuelveSP_ExisteJobActivo", "POST", parametrosExistJob,
            function DevuelveSP_ExisteJobActivo_Finish(result) {
                if (result.d == "false") {
                    var parametrosExistJobXS = { nameJob: nameJoxXSuc, Tipoconexion: '65' };
                    peticionAjax("PanelDeControl.aspx/DevuelveSP_ExisteJobActivo", "POST", parametrosExistJobXS,
                    function DevuelveSP_ExisteJobActivoXS_Finish(resultXS) {
                        if (resultXS.d == "false") {
                            //$(obj).attr("disabled", "disabled");
                            var parametros = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], fase: parseInt($(obj).attr("id").split('-')[1]), IdEstatus: 2, fuente: idFuenteSelect, user: userLogin, error: "", peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
                            peticionAjax('PanelDeControl.aspx/AgregaIndicadorTablero', "POST", parametros,
                            function Finalizada_AgregaIndicadorTablero() {
                                var parametrosJobCredimax = { anio: fechaP.split(',')[0], mes: fechaP.split(',')[1], dia: fechaP.split(',')[2], peridiocidad: (periocidadSelectXUser), usuario: userLogin, idPais: PaisSelectXUser };
                                peticionAjax('PanelDeControl.aspx/' + nameWebMethod, "POST", parametrosJobCredimax,
                                    function LlamadaJob_Iniciada(data) {
                                        if (data.d != "") MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                                        $("#div" + $(obj).attr("id").split('_')[1]).show();
                                        $("#div" + $(obj).attr("id").split('_')[1] + "_txt").show();
                                        valorWhereArrmto = 0.1; clearTimeout(tiempoProgressArrmto);
                                        $("#div" + $(obj).attr("id").split('_')[1]).attr("lang", "ab");
                                        //valorInicialPB = 0; valorPorcentajeAnteriorArrmtoPB = 0.2; objArrmtoPB = obj; fuentePPB = idFuenteSelect; esLoadingPB = false; esXSucursalPB = false; esAlnovaPB = false;
                                        ProgressBarArrmto(0, 0.2, obj, idFuenteSelect, false, false, false);
                                    }, null);
                            }, null);
                        }
                        else alert("Existe un Job Credimax X Sucursal En Ejecución");
                    }, null);
                }
                else alert("Existe un Job Credimax En Ejecución");
            }, null);
}


function HistorialReprocesos_Click(objSeleccionadoReproceso) {

    //alert($(objSeleccionadoReproceso).attr('id'));
    switch ($(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[1]) {
        case "1": /*"ALNOVA"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 1, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "2": /*"ALNOVA COMP"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 2, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "3": /*"COBRANZA"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 3, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "4": /*"PROXIMAS FACTURAS"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 4, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "5": /*"CREDIMAX"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 5, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "6": /*"CREDIMAX COMP"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 6, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "7": /*"ARRMTO CRMX"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 7, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "8": /*"ARRMTO CRMX COMP"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 8, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "9": /*"MEDIOS DE PAGO"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 9, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "10": /*"CONTROL FITIRES"*/
            break;
        case "11": /*"INDICES Y VALORES"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 11, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "12": /*"PRIMAS"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 12, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "13": /*"CONCILIACION"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 13, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "14": /*"GENERAL ADICIONAL"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 14, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "15": /*"RSVA ADICIONAL"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 15, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "16": /*"ARRMTO ALNOVA"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 16, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "17": /*"SIC"*/LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 17, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "18": /*"GARANTIAS"*/ LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 18, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "19": /*"CLIENTES"*/ LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 19, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "20": /*"CAPTACIÓN"*/ LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 20, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "21": /*"BALANZA MENSUAL"*/ LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 21, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "22": /*"R01"*/ LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 22, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "23": /*"CLIENTE PAZ"*/ LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 23, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "24": /*"CLIENTE UNICO"*/ LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 24, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;
        case "30": /*"REQ. CAPITAL COMERCIAL"*/ LlamaPeticionAjaxDeHistorialReprocesosFuente($(objSeleccionadoReproceso).attr('id').split('_')[1], 30, fechaP.split(',')[0], fechaP.split(',')[1], fechaP.split(',')[2], $(objSeleccionadoReproceso).attr('id').split('_')[4], $(objSeleccionadoReproceso).attr('id').split('_')[3].split('&&&')[0], "DevuelveSPDetalleReprocesoFuenteFase");
            break;

    }
}


function LlamaPeticionAjaxDeHistorialReprocesosFuente(faseP, fuenteP, anioP, mesP, diaP, indiceTabla, DefFuente, nameWebMethod) {
    Waiting(true, "Cargando Información...");
    var parametros = { fuente: fuenteP, fase: faseP, anio: anioP, mes: mesP, dia: diaP, reproceso: parseInt(indiceTabla), peridiocidad: (periocidadSelectXUser), idPais: PaisSelectXUser };
    peticionAjax('PanelDeControl.aspx/' + nameWebMethod,
                    "POST", parametros, LlamaPeticionAjaxDeHistorialReprocesosFuente_FFinalizada, null);

    function LlamaPeticionAjaxDeHistorialReprocesosFuente_FFinalizada(data) {
        //alert("Mi valor antes de funcion:" + data.d.split("%&&%")[0]);
        //alert("Mi resulado es:" + data.d.split("%&&%")[0].replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''));

        var arrayJSONRep = obtenerArregloDeJSON(data.d.split("%&&%")[0].replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''), false);
        if (arrayJSONRep[0] == null) {
            setTimeout(terminarWait, 500);
            return;
        }

        var cadena = "<div id='vtnH' style=' width: 690px;height:100px;overflow:auto;' class='VentanitaH'>";
        cadena += generarTablaDeRegistrosSinFoot(arrayJSONRep, "left");

        var numeroReprocesos = data.d.split("%&&%")[1] != "" ? (data.d.split("%&&%")[1].split('||').length + 1) : 1;
        if (numeroReprocesos >= 2)
            cadena += "<br /><div style='width:100%;text-align:left'><a style='font: normal 10px Helvetica, Arial, sans-serif;cursor: pointer;'><img src='../../Images/PanelDeControl/Expander/insert.jpg' id='insert2' style ='margin-bottom:-5px' onclick=\"toggleSlide('div2',this.id,'vtnH','divVentanaReprocesos',0);\" alt='expander' /></a> <span id='insert2' style='font: normal 10px Helvetica, Arial, sans-serif;cursor: pointer;' onclick=\"toggleSlide('div2',this.id,'vtnH','divVentanaReprocesos',0); \">Otros Reprocesos</span> <div id='div2' style=display:none;height:" + numeroReprocesos * 19 + "px;'>";
        arrayJSONRep = obtenerArregloDeJSON(data.d.split("%&&%")[1].replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''), false);
        cadena += generarTablaDeRegistrosSinFoot(arrayJSONRep, "left");
        cadena += "</div></div></div>";
        $("#divVentanaReprocesos").show();
        $("#divVentanaReprocesos").empty();
        $("#divVentanaReprocesos").html(cadena);
        Waiting(false, "Cargando Información...");
        AgregarVtnFlotante("divVentanaReprocesos", "", "REPROCESOS " + DefFuente, "", cadena, numeroReprocesos >= 2 ? 160 : 140, 720, false, false, "", "", null);
    }
}

function generarTablaDeRegistrosSinFoot(listaDeJSON, alineacion) {
    var cad = '<div class="divContenidoTabla" style="width:auto;"><table class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    for (var encabezados in auxJSON) {
        cad += '<th style="">';
        cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element == "FUENTE DE CARTERA" && json[element].indexOf("TOTAL") != -1) {
                indexAux += filas.toString() + ",";
            }
        }
    }
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            //alert(element);
            if (element == 'Monto' || element == 'Regs' || element == 'Reproceso') {
                cad += '<td style="text-align:right;">';
                cad += DevuelveCantidadSeparadaPorComas(json[element]);
            }
            else if (element == 'DIF CAP TEORICO - CAP REAL') {
                cad += '<td style="text-align:right;font-weight:bold;color:Green">';
                cad += DevuelveCantidadSeparadaPorComas(json[element]);
            }
            else {
                var cumplio = false;
                if (indexAux != "") {
                    for (var i = 0; i < indexAux.split(',').length - 1; i++) {
                        if (filas == parseInt(indexAux.split(',')[i]))
                            cumplio = true;
                    }
                }
                else cumplio = false;

                cad += '<td style="text-align:' + (element == "FUENTE DE CARTERA" || element == "METODOLOGíA" ? "left" : alineacion) + ';' + (cumplio ? "font-weight:bold;color:Green" : "font-weight:normal") + '">';
                cad += json[element];
            }
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div>';
    return cad;
}

