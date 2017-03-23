// JScript File

var FechaC = '';
function funcionLoadMasterPage() {
    Waiting(true, "Espere por favor. Cargando Información...");
    CargaPrimerDia();
    CargaAnio();
    OBTFecha();
}

function CargaPrimerDia(){
    var FechaIn = new Date();
    var Dia   = FechaIn.getDate();
    var Fecha ='';
    
    if (Dia<10)
    {
        Dia = '0'+Dia;
    }
    
    var Mes = (FechaIn.getMonth() + 1);
    
    if (Mes<10)
    {
        Mes = '0'+Mes;
    }
    
    var Año  = FechaIn.getFullYear();
    
    Fecha = Dia-1 + '/' + Mes + '/' + Año;
    
    FechaC = Fecha;    
}

function CargaAnio() {
    var Anio = new Date();
    var cad = '';
    for (var i = 2011; i <= Anio.getFullYear(); i++) {
        cad += '<option value="' + i + '">';
        cad += i;
        cad += '</option>';
    }
    $('#ddl_Anio').html(cad);
    $('#ddl_Anio')[0].value = Anio.getFullYear();
}

function CambiaPeriodo() {
    var tipo = $('#ddl_ConsultaFecha').val();
    if (tipo == 1) {
        $('#dv_Mes').attr("style", "display:none")
        CargaPrimerDia();
        OBTFecha();
    } else {
        $('#dv_Mes').attr("style", "display:block")
        OntieneMes_Anio();
    }
 }
 
 function OBTFecha(){  
    var Fecha = '';
    
   Fecha = FechaC;
   Waiting(true, "Espere por favor. Cargando Información...");

   var parametrosJSON = {
       fecha: Fecha
   };

   peticionAjax("ValoresEIndices.aspx/ObtieneFechaCalendario", "POST", parametrosJSON, 
       function (data) {
             ObtieneDatosInformativos(data.d, 1);
       },
        function (data) {
            setTimeout(terminarWait, 200);
        }
   );
 }

 function OntieneMes_Anio() {
     var valor = $('#ddl_Anio').val();
    ObtieneDatosInformativos(valor, 2);
 }
 
 function ObtieneDatosInformativos(Fecha, opcion){
     var parametrosJSON = {
         fecha: Fecha,
         Opcion: opcion
     };

     peticionAjax("ValoresEIndices.aspx/ObtieneCifrasInf", "POST", parametrosJSON,
        function (data) {
            var cad = '';
            var JSON = obtenerArregloDeJSON(data.d, false);
            if (JSON.Status != undefined) {
                return;
            }
            cad = generarTabla(JSON);
            $('#dvInfo').html(cad);
            Waiting(false, "Espere por favor. Cargando Información...");
        },
        function (data) {
            setTimeout(terminarWait, 200);
        }
    );
    
 }

function generarTabla(listaDeJSON) {
    var NombreArch = '';
    var cad = '';
    if (listaDeJSON.length > 0 && listaDeJSON[0] != null) {
        cad += '<center><table class="dataGridDatos" width="70%">';
        cad += '<thead>';
        cad += '<tr>';

        var auxJSON = listaDeJSON[0];

        for (var encabezados in auxJSON) {
            if (encabezados.toString() != '' && encabezados.toString() != 'ValidacionTC') {
                cad += '<th>';
                cad += encabezados.toString();
                cad += '</th>';
            }
        }

        cad += '</tr>';
        cad += '</thead>';

        cad += '<tbody>';
        for (var filas = 0; filas < listaDeJSON.length; filas++) {
            cad += '<tr class="rowAlt">';
            var json = listaDeJSON[filas];
            for (var element in json) {
                if (element == 'Dolar') {
                    var idimg= json['ValidacionTC'];
                    var img="";
                    cad += '<td align="right">';
                    if(idimg=="2")
                        img = '<img id="indicadorSem" src="../../Images/Portafolio/ValoresEIndices/fle_arriba.png" />';
                    else if(idimg=="1")
                        img = '<img id="indicadorSem" src="../../Images/Portafolio/ValoresEIndices/fle_abajo.png" />';
                    else
                        img = '<img id="indicadorSem" src="../../Images/Portafolio/ValoresEIndices/menos.gif" />';

                    cad += json['Dolar'] + img;
                    cad += '</td>';

                } else {
                    if (element != 'ValidacionTC') {
                        cad += '<td align="right">';
                        cad += json[element];
                        cad += '</td>';
                    }
                }
                
            }

            cad += '</tr>';
        }
        cad += '</tbody>';
        cad += '</table></center>';
    }
    return cad;
}