function btnDetalleSaldosEtapa_Click(opcionEtapaS) {
    var cadena = '<div id="divBloqVtnDetalleSaldos" style="width:98%;height:90%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div id="dvDetalleEI" style="width:100%;height:100%;overflow:hidden;text-align:center;float:left;"><div id="divTitleTbl1"></div>';
    cadena += '<div id="dvDetalleEITbl" style="width:100%;height:40%;overflow: auto;margin-top: 5px;"> </div> <div id="divTitleTbl2"></div><div id="dvDetalleEITbl2" style="width:100%;height:40%;overflow: auto;margin-top: 10px;">  </div></div>';
    $("#divDetalleSaldosEI").empty();
    $("#divDetalleSaldosEI").show();
    $("#divDetalleSaldosEI").html(cadena);
    AgregarVtnFlotante("divDetalleSaldosEI", "", "DETALLE DE SALDOS "+ (opcionEtapaS=='1'?'CARGA DE FACTORES':'PROCESAMIENTO'), "", cadena, opcionEtapaS=='1'? 320:500, 900, false, false, "", "", null);
    WaitingVtn("divBloqVtnDetalleSaldos", true, true, "Cargando Información...");
    document.getElementById("imgVtnLoading").style.marginTop = "10%";

    SicreNet.SicreNet.PanelDeControl.PanelDeControl.CalificacionMuestraDetalleEtapa(opcionEtapaS, fechaP.split(",")[2] + "/" + fechaP.split(",")[1] + "/" + fechaP.split(",")[0], periocidadSelectXUser, PaisSelectXUser, function (response) {
        var numTablas =response.value.split("%&&%").length;
        var arrayJSONDetalleEI = obtenerArregloDeJSON(response.value.split("%&&%")[0], false);
        if (response.value == "" || arrayJSONDetalleEI.length == 1) {
            $('#dvDetalleEITbl').html("Sin Datos");
            $("#divDetalleSaldosEI").animate({ height: "50px" });
            $("#divDetalleSaldosEI").dialog("option", "width", "300");
            WaitingVtn("divBloqVtnDetalleSaldos", false, false, "Cargando Información...");
            return;
        }
        if (arrayJSONDetalleEI[0] != null) {
            var cad = '';
            cad = generarTablaDeRegistrosSinFoot(arrayJSONDetalleEI, "right", (opcionEtapaS == '1' ? "FUENTE DE CARTERA" : "FUENTE DE CARTERA"));
            $('#divTitleTbl1').html(("<center style='font-weight:bold;text-shadow: 1px 1px 1px Gray; '>" + (opcionEtapaS == '1' ? "CARTERA TOTAL" : "CARTERA TOTAL") + "</center>"));
            $('#dvDetalleEITbl').html(cad);
            if (opcionEtapaS == "2") {
                document.getElementById("dvDetalleEITbl").style.height = "35%";
                document.getElementById("dvDetalleEITbl2").style.height = "50%";
            }
        }
        if (numTablas == 2) {
            arrayJSONDetalleEI = obtenerArregloDeJSON(response.value.split("%&&%")[1], false);
            if (arrayJSONDetalleEI[0] != null) {
                var cad = '';
                cad = generarTablaDeRegistrosSinFoot(arrayJSONDetalleEI, "right", (opcionEtapaS == '1' ? "FUENTE DE CARTERA" : "METODOLOGíA"));
                $('#dvDetalleEITbl2').html(cad);
                $('#divTitleTbl2').html(("<center style='font-weight:bold;text-shadow: 1px 1px 1px Gray; '>" + (opcionEtapaS == '1' ? "CARTERA ACTIVA" : "CARTERA POR METODOLOGÍA") + "</center>"));
                $('#dvDetalleEITbl2').html(cad);
            }
        }
        else {
            document.getElementById("dvDetalleEITbl").style.height = "75%";
            $("#divDetalleSaldosEI").animate({ height: PaisSelectXUser == "1" ? (opcionEtapaS == '1' ? "220px" : "280px") : "170px" });
        }
        WaitingVtn("divBloqVtnDetalleSaldos", false, false, "Cargando Información...");

    }); 
}