$(function () {
    peticionAjax("Bienvenida.aspx/obtenerFavoritos", "POST", null, function (data) {
        var JSON = obtenerArregloDeJSON(data.d.split('%%&&')[0], false);
        var cad = '<center><table id="tblContentFavorites">';
        var contador = 0;
        for (var i = 1; i < 3; i++) {
            cad += '<tr> ';
            var contadorTemp = contador;
            for (var ii = 0; ii < 5; ii++) {
                if (JSON[contador] != undefined) {
                    cad += ' <td style="text-align: center;height: 25px;width:20%;" title="' + JSON[contador].ruta + '">';
                    cad += ' <a href="\\' + document.URL.split('/')[3] + '/' + JSON[contador].url + '">';
                    cad += '<img src="../../Images/Favoritos/estrella' + (10 - contador) + '.png" class="imgCrecer"  /><br />';
                    cad += '</td>';
                }
                contador++;
            }
            cad += '</tr>';
            contador = contadorTemp;
            cad += '<tr> ';
            for (var ii = 0; ii < 5; ii++) {
                if (JSON[contador] != undefined) {
                    var esItemPanel = JSON[contador].ruta.indexOf("Panel de Control") != -1 || JSON[contador].ruta.indexOf("Monitoreo de Procesos") != -1 ? true : false;
                    cad += ' <td style="text-align: center;width:20%;" title="' + JSON[contador].ruta + '">';
                    cad += ' <a href="\\' + document.URL.split('/')[3] + '/' + JSON[contador].url + '">';
                    cad += '<span   style="font-size: 9px;">' + (esItemPanel ? JSON[contador].ruta.split("/")[1] + " (" : "") + JSON[contador].descripcion + (esItemPanel ? ")" : "") + '</span> </a>';
                    cad += '</td>';
                }
                contador++;
            }
            cad += '</tr>';
        }
        cad += '</table></center>';
        document.getElementById("shadows").style.overflowX = "hidden";
        $("#divFavoritos").html(cad);
    });
});

function mostrarOcultarFavoritos(opcion) {
    if (opcion == '1') {
        $("#divFavoritos").animate({ width: "0px" });
        $("#tblContentFavorites").hide();
        $("#imgMostrarFavoritos").show();
        $("#imgOcultarFavoritos").hide();
    }
    else {
        $("#divFavoritos").animate({ width: "300px" });
        $("#tblContentFavorites").show();
        $("#imgOcultarFavoritos").show();
        $("#imgMostrarFavoritos").hide();
    }
}