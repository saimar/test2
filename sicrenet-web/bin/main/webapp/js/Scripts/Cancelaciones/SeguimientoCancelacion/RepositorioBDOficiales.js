$(function () {

});


function CargarTreeViewG() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Cancelaciones.SeguimientoCancelacion.RepositorioBDOficiales.CrearTreeView(
        function (response) {
            if (response.value.indexOf("Error") == -1) {
                $("#divTreeView").empty();
                $("#lblRutaC").empty();
                $("#divCarpetas").empty();
                $("#divTreeView").html(response.value);
                $("#browser").treeview();
                $("#add").click(function () {
                    var branches = $("<li><span class='folder'>New Sublist</span><ul>" +
					"<li><span class='file'>Item1</span></li>" +
					"<li><span class='file'>Item2</span></li></ul></li>").appendTo("#browser");
                    $("#browser").treeview({
                        add: branches
                    });
                    branches = $("<li class='closed'><span class='folder'>New Sublist</span><ul><li><span class='file'>Item1</span></li><li><span class='file'>Item2</span></li></ul></li>").prependTo("#folder21");
                    $("#browser").treeview({
                        add: branches
                    });
                });
                AsignarMenuContextual();
                setTimeout(terminarWait, 500);
            } else {
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            }
        }
    );
}