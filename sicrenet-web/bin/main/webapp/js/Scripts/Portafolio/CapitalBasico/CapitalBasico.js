$(function ($) {
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        isRTL: false,
        startDate: '30/06/2008',
        showMonthAfterYear: false,
        yearSuffix: '',
        hideIfNoPrevNext: true,
        showAnim: 'slideDown',
        showOn: "both",
        showOtherMonths: true,
        showStatus: true,
        showWeek: true,
        firstDay: 1,
        numberOfMonths: 1,
        selectOtherMonths: true,
        daysOfWeekDisabled: "1,2,3,4,5,6"
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

$(function () {
    //GenerarTabla(1);
});

function GenerarTabla(opcion) {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("CapitalBasico.aspx/obtieneDatos", "POST", { opcion: opcion }, function (data) {
        $('#dvInformacion').html(data.d);
        $(".inputDate").datepicker();
        WidtDatePicker();
       if(opcion == 2)
           EnviaCorreo();
        if(opcion==1)
            Waiting(false, "Espere por favor. Cargando Información...");
    });
}

function ObtieneIndice() {
    var tabla = document.getElementById("TablaDatosInf");
    var numFilas = tabla.rows.length;
    var numCells = tabla.rows[0].cells.length;
    var Comparacion = '';

    $('#divDatoIC').html($('#inpIndiceC').val());
    $('#tbxIC').hide();
    $('#divDatoIC').show();
    $('#divDatoIC').html(formatoporciento($('#inpIndiceC').val()));
    $('#imgGuardaIC').hide();
    $('#imgEditaIC').show();

    if (numCells > 2) {
        Comparacion = Compara(unformatNumber(tabla.rows[numFilas - 1].cells[numCells - 2].innerHTML), $('#inpIndiceC').val());
    } else {
        Comparacion = '';
    }

    $('#divDatoIC').html($('#divDatoIC').html() + Comparacion);
}

function formatoporciento(num) {
    var porc = '';
    if (isNaN(num) == true || num=="") {
        porc = '0';
    } else {
        if (num < 0 || num > 100) {
            porc = '0';
        } else {
            var original = parseFloat(num);
            porc = Math.round(original * 100) / 100;
        }
    }
    return porc + '%';
}

function Compara(ValAnterior, NuevoValor) {
    var Imagen = '';

    if (ValAnterior < NuevoValor) {
        Imagen = '<img src="../../Images/Grales/fle_arriba.png" width="10px" height="11px"/>';
    }
    if (ValAnterior > NuevoValor) {
        Imagen = '<img src="../../Images/Grales/fle_abajo.png" width="10px" height="11px"/>';
    }
    if (ValAnterior == NuevoValor) {
        Imagen = '<img src="../../Images/Cancelaciones/SeguimientoCancelacion/menos.gif" width="10px" height="11px"/>';
    }

    return Imagen;
}

function unformatNumber(num) {
    return num.replace(/([^0-9\.\-])/g, '') * 1;
}

function CanbiaDIvsIndice() {
    $('#tbxIC').show();
    $('#divDatoIC').hide();
    $('#imgGuardaIC').show();
    $('#imgEditaIC').hide();
}

function CanbiaDIvsCapital() {
    $('#tbxCB').show();
    $('#imgGuardaCB').show();
    $('#divDato').hide();
    $('#imgEditaCB').hide();
}

function calculaDatos() {
    $('#tbxCB').hide();
    $('#divDato').show();
    $('#imgGuardaCB').hide();
    $('#imgEditaCB').show();

    //TablaDatosInf
    var tabla = document.getElementById("TablaDatosInf");
    var numFilas = tabla.rows.length;
    var numCells = tabla.rows[0].cells.length;
    var num;
    var numAnt;
    var Comparacion = '';

    for (var i = 1; i < numFilas - 2; i++) {
        num = $('#hd' + i + '').val() * $('#inpCifras').val();
        $('#dv' + i + '').html(currency(num, 2, [',', ',', ',', ',', '.']));

        numAnt = tabla.rows[i + 1].cells[numCells - 2].innerHTML
        numAnt = unformatNumber(numAnt);

        if (numCells > 2) {
            Comparacion = Compara(numAnt, num);
        } else {
            Comparacion = '';
        }

        $('#dv' + i + '').html($('#dv' + i + '').html() + Comparacion);
    }

    if (numCells > 2) {
        Comparacion = Compara(unformatNumber(tabla.rows[1].cells[numCells - 2].innerHTML), $('#inpCifras').val());
    } else {
        Comparacion = '';
    }

    $('#divDato').html(currency($('#inpCifras').val(), 2, [',', ',', ',', ',', '.']));
    $('#divDato').html($('#divDato').html() + Comparacion);

}

//Da el formato de moneda ademas de validar que solo sean numeros los que se ingresan
function currency(value, decimals, separators) {
    decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
    separators = separators || ['.', "'", ','];
    var number = (parseFloat(value) || 0).toFixed(decimals);
    if (number.length <= (4 + decimals))
        return number.replace('.', separators[separators.length - 1]);
    var parts = number.split(/[-.]/);
    value = parts[parts.length > 1 ? parts.length - 2 : 0];
    var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
        separators[separators.length - 1] + parts[parts.length - 1] : '');
    var start = value.length - 6;
    var idx = 0;
    while (start > -3) {
        result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
            + separators[idx] + result;
        idx = (++idx) % 2;
        start -= 3;
    }
    return (parts.length == 3 ? '-' : '') + result;
} 

function CambiaDivsFechas(noFila) {
    $('#tbxCBFec' + noFila + '').show();
    $('#divDatoFec' + noFila + '').hide();
    $("#INPFec" + noFila).datepicker();
    $('#imgEditaFechas' + noFila + '').hide();
    $('#imgGuardaFechas' + noFila + '').show();
}

function ObtenFechasDivs(noFila) {
    $('#divDatoFec' + noFila + '').html($('#INPFec' + noFila + '').val());
    $('#tbxCBFec' + noFila + '').hide();
    $('#divDatoFec' + noFila + '').show();
    $('#imgEditaFechas' + noFila + '').show();
    $('#imgGuardaFechas' + noFila + '').hide();
}

//--------------------------------------------------------------------
//------------------------------------------------ Guarda y Envia Correo
//---------------------------------------------------------------------

function GuardaDatos(){
    var Capital = $('#inpCifras').val();
    var Indice = $('#inpIndiceC').val();        
    var input = document.getElementById('tbxCB');
    input.parentNode.removeChild(input);
    
    var inputIC = document.getElementById('tbxIC');
    inputIC.parentNode.removeChild(inputIC);

    var TablaInf = $('#dvInformacion').html();

    var tabla = document.getElementById("TablaDatosInfHeader");   
    var numFilas = tabla.rows.length;  
    var Long_ihExp;
    var FechasAcum = '';  
    
    for(var i=0; i<numFilas-1;i++){
         Long_ihExp = tabla.rows[i].parentNode.getElementsByTagName('input').item(i);
         FechasAcum = FechasAcum + Long_ihExp.value + ';';
    } 
    var strLen = FechasAcum.length;
    FechasAcum = FechasAcum.slice(0,strLen-1); 
    
    Waiting(true, "Espere por favor. Cargando Información...");
    peticionAjax("CapitalBasico.aspx/Guardar", "POST", { CapitalB: Capital, IndiceC: Indice, Fechas: FechasAcum }, function (data) {
        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
        if (data.d.indexOf("Error") == -1) {
            GeneraTabla(2);
        } else {
            GeneraTabla(1);
        }
    }); 
}

function EnviaCorreo() {
    var TablaInf = $('#TablaDatosInf').clone();
    TablaInf.find('img').remove();
    TablaInf.find('input').remove();
    peticionAjax("CapitalBasico.aspx/EnviaCorreo", "POST", { TablaDatos: TablaInf[0].innerHTML }, function (data) {
        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 140, null, null, null);
        GenerarTabla(1);        
    });  
}