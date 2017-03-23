
getSetInfo(3,0,'',0,'','','','','',1,'',0);
var hoy = '';
var userLogin = "";
function GetUserLogin() {
    peticionAjax("PanelDeControl.aspx/GetSession", "POST", null,
    function GetUserLogin_finish(resultUser) {
        userLogin = resultUser.d;
    }, null);
}

function getSetInfo(op, idRegulatorioV, columnaV, numCreditoV, campoActualizarV, fechaInicioV, fechaFinalV, usrV, comentariosV, estatusV, archivoAnexoV, idRegistroBitacoraV) {
    //$('#dvGridDatos').hide();
    Waiting(true, "Espere por favor. Cargando Información...");
    var parametros = {
        opcion: op, idRegulatorio:idRegulatorioV, columna: columnaV, numCredito: numCreditoV, campoActualizar: campoActualizarV, fechaInicio: fechaInicioV, fechaFinal: fechaFinalV, usr: usrV, comentarios: comentariosV, estatus: estatusV, archivoAnexo: archivoAnexoV, idRegistroBitacora: idRegistroBitacoraV
    };
    peticionAjax("AdministradorReg.aspx/BitacoraRegulatorios", "POST", parametros, function (data) {
        if (data.d != null && data.d.indexOf("Error") == -1) {
            var registros = obtenerArregloDeJSON(data.d, false);
            if (op === 1)
                cargaSelectorRpt(registros);
            if (op === 2)
                cargaSelectorCol(registros);
            if (op === 3)
                $("#dvGridDatos").html(registros.value == "" ? "Sin Datos" : generarTablaDeRegistrosAdminReg(registros, '', "tablaDatosReg"));
            if (op === 4)
                getSetInfo(3, 0, '', 0, '', '', '', '', '', 1, '', 0);
            if (op === 5)
                getSetInfo(3, 0, '', 0, '', '', '', '', '', 1, '', 0);
            Waiting(false, "Espere por favor. Cargando Información...");
        } else {
            Waiting(false, "Espere por favor. Cargando Información...");
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
        }
    }, null);
}

function generarTablaDeRegistrosAdminReg(listaDeJSON, alineacion, idtabla) {
    var status = '';
    var cad = '<div class="divContenidoTabla" style="width:auto;"><table id="' + idtabla + '"  style="width: 100%;" class="tablesorter">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    var indexAux = "";
    //  Encabezados
    cad += '<th style="text-align: center;">No.</th>';
    cad += '<th style="text-align: center;">Fecha de Registro</th>';
    cad += '<th style="text-align: center;">Nombre de Reporte</th>';    
    cad += '<th style="text-align: center;">Columna</th>';
    cad += '<th style="text-align: center;">NÚmero de Crédito</th>';
    cad += '<th style="text-align: center;">Original</th>';
    cad += '<th style="text-align: center;">Actualización</th>';
    cad += '<th style="text-align: center;">Fecha Inicial</th>';
    cad += '<th style="text-align: center;">Fecha Final</th>';
    cad += '<th style="text-align: center;">Usuario</th>';
    cad += '<th style="text-align: center;">Comentarios</th>';
    cad += '<th style="text-align: center;">Archivo Anexo</th>';
    cad += '<th style="text-align: center;">Estatus</th>';
    cad += '<th style="text-align: center;">Usuario Cambia Estatus</th>';
    cad += '<th style="text-align: center;"></th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        cad += '<td style="text-align:center;font-size: 9px;">' + json['FIID'] + '</td>';
        cad += '<td style="text-align:center;font-size: 9px;">' + json['FDFechaRegistro'] + '</td>';
        cad += '<td style="text-align:center;font-size: 9px;">' + json['REPDESC'] + '</td>';
        cad += '<td style="text-align:left;font-size: 9px;">' + json['COLDESC'] + '</td>';
        cad += '<td style="text-align:center;font-size: 9px;">' + json['FVCNoDeCredito'] + '</td>';
        cad += '<td style="text-align:left;font-size: 9px;">' + json['FVCOriginal'] + '</td>';
        cad += '<td style="text-align:center;font-size: 9px;">' + json['FVCActualizacion'] + '</td>';
        cad += '<td style="text-align:center;font-size: 9px;">' + json['FDFechaInicial'] + '</td>';
        cad += '<td style="text-align:centerfont-size: 9px;;">' + json['FDFechaFinal'] + '</td>';
        cad += '<td style="text-align:left;font-size: 9px;">' + json['FVCUsuario'] + '</td>';
        cad += '<td style="text-align:left;font-size: 9px;">' + json['FVCComentarios'] + '</td>';
        cad += '<td style="text-align:left;font-size: 9px;"></td>';
        status = json['FIEstatus'] == 1 ? 'Activo' : 'Eliminado';
        cad += '<td style="text-align:center;font-size: 9px;">' + status + '</td>';
        cad += '<td style="text-align:left;font-size: 9px;">' + json['FVCActualizaUsuario'] + '</td>';
        cad += '<td style="text-align:left;font-size: 9px;">';
        if(json['FIEstatus']==1)
        cad += '<img alt="Editar" id="imgBtnEdit_'+json['FIID']+'_'+ json['FIEstatus']+'" src="../../Images/Tablas/editar.gif" onclick="img_ckeck(0,this)" style="height: 20px;width: 22px;cursor:pointer;">';
        //cad += '<img alt="Agregar" id="imgBtnEdit_' + json['FIID'] + '_' + json['FIEstatus'] + '" src="../../Images/Tablas/agregar.gif"  onclick="img_ckeck(1,this)" style="height: 20px;width: 22px;">';
        cad +=  '</td>';
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div>';
    return cad;
}

function img_ckeck(op, obj) {
    var entro = false;
    var idregistro = (obj.id).split('_')[1];
    if(op===0){//editar
        var opOrig= (obj.id).split('_')[2] ==1?'ACTIVO':'ELIMINADO';
        var opDest = (obj.id).split('_')[2] == 1 ? 'ELIMINADO' : 'ACTIVO';
        MostrarMsj("¿Esta seguro de cambiar el estatus "+ opOrig+" a "+ opDest+"? ", "Mensaje", true, true, false, "Si", "No", "", 300, 130,
	        function () {
	            entro = true;
	            $("#divVentanaMensajes").dialog("close");
	            getSetInfo(5,0,'','','','','','','',1,'',idregistro);
	        }, function () {
	            $("#divVentanaMensajes").dialog("close");
	            $(obj).attr("checked", false); 
	        }, null);
	        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
	            if (!entro)
	                $(obj).attr("checked", false);
	        });
	} else {//agregar
    	generaDivVtn(idregistro);  
    }
}

function generaDivVtn(idRegistro) {
var cad = '';
cad += '<table style="width: 70%;" class="tablesorter" id="idtblAdd1"><tr><th style="text-align:center;width:140px;">Fecha de Registro</th><th style="text-align: center;width:170px;">Nombre del Reporte</th><th style="text-align: center;;width:260px;">Columna</th><th style="text-align: center;;width:140px;">No. de Crédito</th></tr><tr><td><span id="fechaReg"></span></td><td><select id="idNombreReporte" style="width:70px;font-size:9px"  onchange="cambiaSelectorCol();"></select></td><td><select id="idColumnaReporte" style="width:260px;font-size:9px"></select></td><td><input id="idNoCredito" type="text" style="font-size:9px" /></td></tr></table>'
    cad+= '<br />'
    //cad += '<table style="width: 100%;" class="tablesorter"><tr><th style="text-align: center;">Original</th><th style="text-align: center;">Actualización</th><th style="text-align: center;">Fecha Inicial</th><th style="text-align: center;">Fecha Final</th><th style="text-align: center;">Comentarios</th><th style="text-align: center;">Archivo Anexo</th><th style="text-align: center;">Estatus</th></tr><tr><td><input id="idOriginal" type="text"  style="font-size: 9px"/></td><td><input id="idActualizacion" type="text" style="font-size: 9px" /></td><td><input id="idFechaInicial" class="calendario" style="width: 80%;font-size: x-small" tabindex="5" size="" type="text" /></td><td><input id="idFechaFinal" type="text" class="calendario" /></td><td> <textarea id="idComentarios" cols="40" rows="3"></textarea></td>';
    cad += '<table style="width: 100%;" class="tablesorter"><tr><th style="text-align: center;">Actualización</th><th style="text-align: center;">Fecha Inicial</th><th style="text-align: center;">Fecha Final</th><th style="text-align: center;">Comentarios</th><th style="text-align: center;">Archivo Anexo</th><th style="text-align: center;">Estatus</th></tr><tr><td><input id="idActualizacion" type="text" style="font-size: 9px" /></td><td><input id="idFechaInicial" class="calendario" style="font-size: 9px" /></td><td><input id="idFechaFinal" type="text" class="calendario"  style="font-size: 9px"  /></td><td> <textarea id="idComentarios" cols="40" rows="3" style="font-size:9px"></textarea></td>';
    cad += '<td class="TextBoxArribaCentro" style="height: 25px;font: normal 10px Helvetica, Arial, sans-serif;" align="left"><div id="idCargaArchivo"><input type="file" name="AjaxUpload" id="AjaxUpload" style="font-family:Arial;font-size:X-Small;width:260px;">';
    //cad += '<td class="TextBoxArribaDerecha" style="height: 25px">&nbsp;';
    cad += '<input type="button" name="btnLoad" value="Cargar" id="idBtnCarga" class="classButton" style="font-family:Arial;font-size:X-Small;" onclick="enviarArchivoAsincronamenteCargaFile(this)"></div></td>';
    cad += '<td><span id="idEstatusA"></span></td></tr></table>';
    cad += '<br/>'
    cad += '<table style="width: 100%;"><tr><td><input type="button" id="btnGuardaReg" value="Guardar" class="classButton" onclick="guardaReg_click();" /></td></tr><tr><td><span id="spErrorINPC"></span></td></tr></table>';
    AgregarVtnFlotante("divAddReg","","Agregar nueva columna", "", cad, 250, 1100, false, false, "", "", null);
    $(".calendario").datepicker();
    var Fecha = new Date();
    hoy = (Fecha.getDate()).toString() + '/' + (((Fecha.getMonth() + 1).toString().length < 2) ? "0" + (Fecha.getMonth() + 1).toString() : (Fecha.getMonth() + 1).toString()) + '/' + Fecha.getFullYear().toString();
    $('#fechaReg').html(hoy);
    $('#idEstatusA').html('Activo');
    getSetInfo(1, 0, '', '', '', '', '', '', '', 1, '', 0); //Reportes
}

function cargaSelectorRpt(registros) {
    var options = '';
    try {
        for (var x = 0; x < registros.length; x++) {
            var json = registros[x];
            options += '<option value="' + json.FIIDReporte + '">';
            options += json.FVCNombreReporte;
            options += '</option>';
        }
    } catch (err) { }
    $('#idNombreReporte').html(options)
    var val0 = registros[0].FIIDReporte;
    getSetInfo(2, val0, '', '', '', '', '', '', '', 1, '', 0); //Columnas
}

function cargaSelectorCol(registros) {
    var options = '';
    try {
        for (var x = 0; x < registros.length; x++) {
            var json = registros[x];
            options += '<option value="' + json.FVCIDColumna + '">';
            options += json.FVCDescripcion;
            options += '</option>';
        }
    } catch (err) { }
    $('#idColumnaReporte').html(options)
}

function cambiaSelectorCol() {
    var val0 = $('#idNombreReporte').val()
    getSetInfo(2, val0, '', '', '', '', '', '', '', 1, '', 0); //Columnas
}


function enviarArchivoAsincronamenteCargaFile(objThis) {
    if (!validarExistenciaDeArchivo($(objThis).parent().parent().find("input:file"))) {
        $('#lbError').html('Seleccione un archivo .txt');
        return false;
    }
    var idInputFile = $(objThis).parent().parent().find("input:file").attr("id");
    var parametros = {
        'subirArchivo': 'subirArchivo'
    };
    return ajaxFileUpload(idInputFile, objThis, parametros);
}

function validarExistenciaDeArchivo(obj) {
    var bandera = false;
    if ($(obj).val() == '') {
        MostrarMsj("Debe seleccionar un archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
        bandera = false;
    }
    else {
        bandera = true;
    }
    return bandera;
}

var nomArchivoASubir;
function ajaxFileUpload(idInputFile, obj, parametros) {
    Waiting(true, "Espere por favor. Cargando Información...");
    $.ajaxFileUpload
		    ({
		        url: 'AdministradorReg.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            Waiting(false, "Espere por favor. Cargando Información...");
		            $('#idCargaArchivo').html('Cargado');
		        }
		    });
    return false;
}

function guardaReg_click() {
    var fechaIni = $('#idFechaInicial').val();
    var fechaFin = $('#idFechaFinal').val();
    fechaIni = fechaIni.split('/')[2] + fechaIni.split('/')[1] + fechaIni.split('/')[0];
    fechaFin = fechaFin.split('/')[2] + fechaFin.split('/')[1] + fechaFin.split('/')[0];
    getSetInfo(4, $('#idNombreReporte').val(), $('#idColumnaReporte').val(), $('#idNoCredito').val(), $('#idActualizacion').val(), fechaIni, fechaFin, '', $('#idComentarios').val(), 1, '', 0); //Reportes
}