function generarTablaDeRegistrosSinFoot(listaDeJSON) {
    var cad = '<div class="divContenidoTabla2"><table class="dataGridDatos">';
    cad += '<thead>';
    cad += '<tr>';
    var auxJSON = listaDeJSON[0];
    for (var encabezados in auxJSON) {
        cad += '<th style="width:18%">';
        cad += encabezados.toString();
        cad += '</th>';
    }
    cad += '</tr>';
    cad += '</thead>';

    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += (filas % 2 == 0) ? '<tr class="row">' : '<tr class="alternateRow">';
        var json = listaDeJSON[filas];
        for (var element in json) {
            cad += '<td>';
            cad += json[element];
            cad += '</td>';
        }
        cad += '</tr>';
    }
    cad += '</tbody>';

    cad += '</table></div>';
    return cad;
}