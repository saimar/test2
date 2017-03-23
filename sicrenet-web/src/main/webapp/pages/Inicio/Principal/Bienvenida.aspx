<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Bienvenida.aspx.cs" MasterPageFile="~/Site1.Master"
    Inherits="SicreNet.Inicio.Principal.Bienvenida" %>

<asp:Content ID="Content2" ContentPlaceHolderID="HeadContent" runat="server">
    <script src="../../Scripts/jquery-1.7.1.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-ui-1.8.20.js" type="text/javascript"></script>
    <script src="../../Scripts/PanelDeControl/jquery-ui-timepicker-addon.js" type="text/javascript"></script>
    <script src="../../Scripts/cookiePeriocidad.js" type="text/javascript"></script>
    <script src="../../Scripts/AjaxFileUpload/ajaxfileupload.js" type="text/javascript"></script>
    <script src="../../Scripts/Utilidades/funcionesGralesSicreNet.js" type="text/javascript"></script>
    <script src="../../Scripts/Inicio/Principal/Favoritos.js" type="text/javascript"></script>
    <script src="../../Scripts/cookiePeriocidad.js" type="text/javascript"></script>
    <link href="../../Styles/Grales.css" rel="stylesheet" type="text/css" />

    <script src="../../Scripts/SicreNet/Pendientes/pendientesIframe.js" type="text/javascript"></script>

    <script type="text/javascript">
        WFHora = "Bienvenida";
       
        function enviarArchivoAsincronamente(obj, funcionExitoAEjecutar) {
            if (!validarExistenciaDeArchivo($(obj).parent().find("input:file"))) {
                return false;
            }
            var url = "Bienvenida.aspx";
            var tipoDato = "json";
            var idInputFile = $(obj).parent().find("input:file").attr("id");
            var funcionExito = funcionExitoAEjecutar;
            var parametros = {
                'ArchivoPrueba': 'ArchivoPrueba'
            };
            return ajaxFileUpload(idInputFile, funcionExito, parametros, obj);
        }

        function validarExistenciaDeArchivo(obj) {
            var bandera = false;
            if ($(obj).val() == '') {
                MostrarMsj("Debe seleccionar un archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, null, null);
                bandera = false;
            }
            else {
                bandera = true && validarExistenciasDeFechas();
            }
            return bandera;
        }

        function validarExistenciaDeArchivo(obj) {
            var bandera = false;
            if ($(obj).val() == '') {
                // alert('Debe seleccionar un archivo');
                $('#lbError').html("Seleccione un archivo.");
                bandera = false;
            }
            else {
                bandera = true;
            }
            return bandera;
        }

        var nomArchivoASubir;
        function ajaxFileUpload(idInputFile, funcionSuccess, parametros, obj) {
            Waiting(true, "Espere por favor. Cargando Información..."); // ponerDivBloqueadorGeneral();
            $.ajaxFileUpload
		    ({
		        url: 'Bienvenida.aspx',
		        fileElementId: idInputFile,
		        dataType: 'json',
		        data: parametros,
		        complete: function () {
		        },
		        success: function (data, status) {
		            reportarStatusDeSubidaDeArchivo(data, status)
		        }
		    });
            return false;
        }

        function reportarStatusDeSubidaDeArchivo(data, obj) {
            Waiting(false, "Espere por favor. Cargando Información...");
            data = data.toString().replace("<pre>", "").replace("</pre>", "").replace("<PRE>", "").replace("</PRE>", "");
            $('#lbError').html(data);
        }

        function txtCUFormatoTxt_KeyUP(e, obj) {
            changeFormatoTxtCU(e, obj);
        }

        function changeFormatoTxtCU(e, obj) {
            var esFormatoCorrecto = true;
            var key = window.event ? e.keyCode : e.which;
            var cadena = $(obj).val();
            if (cadena.length == 4 || cadena.length == 9 || cadena.length == 14 || cadena.length == 19 || cadena.length == 24 || cadena.length == 29) {
                cadena = cadena + '-';
            }
            esFormatoCorrecto = validarFormatoTxtCU(cadena, obj);

            if (cadena.length >= 33)
                esFormatoCorrecto = validarEstructuraTxtCU(cadena) != "" ? false : true;
            return esFormatoCorrecto;
        }

        function validarFormatoTxtCU(cadena, obj) {
            var nuevaCadena = '';
            for (var i = 0; i < cadena.length; i++) {
                var c = cadena.charAt(i);
                if (i != 4 && i != 9 && i != 14 && i != 19 && i != 24 && i != 29) {
                    if (containsNumeros(c))
                        nuevaCadena += c;
                }
                else nuevaCadena += c;
            }
            $(obj).val(nuevaCadena);
            var valorReturn = cadena != nuevaCadena ? false : true;
            return valorReturn;
        }

        var num = '0123456789';
        function containsNumeros(caracter) {
            for (var i = 0; i < num.length; i++) {
                if (num.charAt(i) == caracter)
                    return true;
            }
            return false;
        }

        function validarEstructuraTxtCU(cadenaCU) {
            var error = '';
            var sep1 = cadenaCU.charAt(4);
            var sep2 = cadenaCU.charAt(9);
            var sep3 = cadenaCU.charAt(14);
            var sep4 = cadenaCU.charAt(19);
            var sep5 = cadenaCU.charAt(24);
            var sep6 = cadenaCU.charAt(29);
            if (sep1 != '-' || sep2 != '-' || sep3 != '-' || sep4 != '-' || sep5 != '-' || sep6 != '-')
                error += 'Error en sepador de fecha debe ser: (-).';
            return error;
        }


        //$(document).ready(function () {
        //    muestraPendientes();
        //});

        $(document).ready(function () {
                $("#Incidencias").hide();
        });

    </script>
    <style type="text/css">
        .spacerA
        {
            height: 150px;
        }
        
        .spacerB
        {
            height: 250px;
        }
        .wellcomeBox
        {
            background: rgb(150, 149, 149);
            font-size: 20px;
            color: rgb(255, 255, 255);
            padding: 20px;
            text-align: center;
            width: 60%;
            margin-left: -10px;
        }
        
        .wellcomeBox .TRCorner
        {
            width: 12px;
            height: 12px;
            background: url(../images/ImgsMasterPage/wellcomeCornerA.png);
            position: absolute;
            right: 0;
            top: 0;
        }
        
        .wellcomeBox .BRCorner
        {
            width: 12px;
            height: 12px;
            background: url(../images/ImgsMasterPage/wellcomeCornerB.png);
            position: absolute;
            right: 0;
            bottom: 0;
        }
        .userDataInfo
        {
            color: rgb(255, 255, 255);
            font-weight: bold;
            padding: 2px;
            background: rgb(0, 0, 0);
            border: rgb(255, 255, 255) solid 1px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <table id="tblFavoritos" style="float: right; margin-right: -1px">
        <tr>
            <td style="cursor: pointer; width: 9px;text-align: right;" title="Clic Para Mostrar Favoritos" onclick="mostrarOcultarFavoritos('2');">
                <img id="imgMostrarFavoritos" src="../../Images/PanelDeControl/Expander/fIzquierda.png"
                    class="imgCrecer" style="margin-right: -6px;  display: none;" />
            </td>
            <td>
                <div id="divFavoritos" style="width: 300px; height: 150px; float: right; background: rgba(17, 120, 92, 0.45);
                    border-radius: 5px; border: rgb(17, 120, 92) solid 2px; -webkit-box-shadow: 1.5px 1.5px 1.5px 1.5px rgb(17, 120, 92);
                    -mox-box-shadow: 1.5px 1.5px 1.5px 1.5px rgb(17, 27, 18); box-shadow: 1.5px 1.5px 1.5px 1.5px rgb(17, 120, 92);">
                </div>
            </td>
            <td style="cursor: pointer; width: 13px;" title="Clic Para Ocultar Favoritos" onclick="mostrarOcultarFavoritos('1');">
                <img id="imgOcultarFavoritos" src="../../Images/PanelDeControl/Expander/fDerecha.png"
                    class="imgCrecer" style="margin-left: -4px;" />
            </td>
        </tr>
    </table>

    <div id="saludo" style="vertical-align:middle; top:40%; display:block; position:absolute; width:100%;">
        <img src="~/Images/Login/wellcomeText.png" runat="server" />
        <div class="wellcomeBox">
            <asp:Label ID="LabelUsuario" runat="server" />
        </div>
    </div>

    <div class="spacerA">
    </div>

      <div id="Incidencias" style="width:99%; height:100%; margin-top:5px; margin-bottom:5px; margin-right:10px; visibility:collapse;">
         <iframe src="../../SicreNet/Pendientes/PendientesIframe.aspx" style="width:100%; height:100%; border:0px;"></iframe>
     </div>

    <div class="spacerB">
    </div>
    <div style="visibility: collapse">
        <input type="file" id="fuCredimax" name="fuCredimax" class="fileUpload" />
        <button id="Button12" class="classButton" onclick="return enviarArchivoAsincronamente(this);">
            Cargar
        </button>
        <span id="lbError"></span>
    </div>
    <%--    <input id="txtCU" onkeyup="txtCUFormatoTxt_KeyUP(event,this);" />--%>
</asp:Content>
