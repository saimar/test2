//Funcion que obtiene los datos de las tablas
//y valores de las Clasificaciónes
 
$(function ($) {
    $("#divContenedor").show();
    $("#divMostrarL").show(); 
});

function LlenaGrids() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    posicion = 0;
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.ObtenerDatosTablas(
        function (response) {
            if (response.value.indexOf("Error") == -1) {
                //                $("#divContenedor").show();
                //                $("#divMostrarL").show();                           
            } else {
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            }
            LlenaValoresClas();
        }
    );



}

function LlenaValoresClas() {
    SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.ObtieneValorClas(
        function (response) {
            if (response.value.indexOf("Error") == -1) {
                // Items = response.value.evalJSON();
                var Items = obtenerArregloDeJSON(response.value, false);
                for (var i = 0; i < Items.length - 1; i++) {
                    var Item = Items[i];
                    //var opcion = new Option(Item.A, Item.B, Item.C);
                    if (i == 0) {
                        $('#A1').val(Item.A);
                        $('#A2').val(Item.B);
                        $('#A3').val(Item.C);
                    } else if (i == 1) {
                        $('#B1').val(Item.A);
                        $('#B2').val(Item.B);
                        $('#B3').val(Item.C);
                    } else {
                        $('#C1').val(Item.A);
                        $('#C2').val(Item.B);
                        $('#C3').val(Item.C);
                    }
                }               
            } else {
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            }
            LlenaGridNA();
        }
    );
}

function LlenaGridNA() {
    SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.TablaDatosNA(
        function (response) {
            $('#divNA').html(response.value + '<br/>');
            SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.TablaDatosA(
            function (response) {
                $('#divA').html(response.value + '<br/>');
                SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.TablaDatosB(
                function (response) {
                    $('#divB').html(response.value + '<br/>');
                    SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.TablaDatosC(
                        function (response) {
                            $('#divC').html(response.value + '<br/>');
                                        $("#divContenedor").show();
                                        $("#divMostrarL").show();
                                        setTimeout(terminarWait, 500);
                        });
                });
            });
        }
    ); 
}

function evitaEventos(event) {
    window.event.cancelBubble = true;
    window.event.returnValue = false;
}

var filaA;
function comienzoMovimiento(event, id, fila, literlDiv, indiceElimina) {
    filaA = fila;
    Literal = literlDiv;
    IndexElimina = indiceElimina;

    elMovimiento = document.getElementById(id);

    elMovimiento.style.top = window.event.clientY;
    elMovimiento.style.left = window.event.clientX;
    elMovimiento.style.display = 'inline';

    anchoElemento = $(fila).width();
    altoElemento = $(fila).height();

    // Coordenadas del elemento al que se quiere añadir el tooltip
    coordenadaXElemento = $(fila).position().left;
    coordenadaYElemento = $(fila).position().top;

    // Coordenadas en las que se colocara el tooltip
    x = coordenadaXElemento + anchoElemento / 2 + 20;
    y = coordenadaYElemento + altoElemento / 2 + 10;

    document.getElementById('div1').innerHTML = '<table id="tbDatosArrastra"><tr>'; ;
    document.getElementById('div1').innerHTML += fila.innerHTML;
    document.getElementById('div1').style.top = y + "px";
    document.getElementById('div1').style.left = x + "px";
    document.getElementById('div1').innerHTML += '</tr></table>';

    cursorComienzoX = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
    cursorComienzoY = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;

    if (document.addEventListener) {  // all browsers except IE before version 9
        document.addEventListener("mousemove", enMovimiento);
        document.addEventListener("mouseup", finMovimiento);
    }
    else {
        if (document.attachEvent) {   // IE before version 9
            document.attachEvent("onmousemove", enMovimiento);
            document.attachEvent("onmouseup", finMovimiento);
        }
    }

    elComienzoX = parseInt(elMovimiento.style.left);
    elComienzoY = parseInt(elMovimiento.style.top);
    evitaEventos(event);
}

function enMovimiento(event) {
    var xActual, yActual;

    xActual = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
    yActual = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;

    elMovimiento.style.left = (elComienzoX + xActual - cursorComienzoX) + "px";
    elMovimiento.style.top = (elComienzoY + yActual - cursorComienzoY) + "px";
    //    $("#divContenedor").show();
    //    $("#divMostrarL").show();
    evitaEventos(event);
}

function finMovimiento(event) {
    if (document.removeEventListener) {  // all browsers except IE before version 9
        document.removeEventListener("mousemove", enMovimiento, false);
        document.removeEventListener("mouseup", finMovimiento, false);
    }
    else {
        if (document.detachEvent) {   // IE before version 9
            document.detachEvent("onmousemove", enMovimiento);
            document.detachEvent("onmouseup", finMovimiento);
        }
    }
    document.getElementById('div1').style.display = 'none'; 
}

function CargaAotroGrid(idDiv) {
    var cadena;
    if (filaA != undefined && filaA != '' && Literal != idDiv) {
        Desc = filaA.getElementsByTagName('td');
        if (Desc[0] == undefined) return;
        cadena = Desc[0].innerHTML;
        cadena += ',';

        SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.ColocaDatoGrid(
            idDiv, cadena, Literal, IndexElimina,
            function (response) {
                $('#div' + idDiv + '').html(response.value);
                filaA = '';
                Elimina();
            }
        );
    } 
    return false;
}

function Elimina() {
    SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.EliminaRow(
        Literal, IndexElimina,
        function (response) {
            $('#div' + Literal + '').html(response.value + '<br/>');
        }
    );
}

function EditaValores(esEditable) {
    for (i = 1; i < 4; i++) {
        if (esEditable) $('#A' + i + '').removeAttr("disabled"); else $('#A' + i + '').attr("disabled", "disabled");
        if (esEditable) $('#B' + i + '').removeAttr("disabled"); else $('#B' + i + '').attr("disabled", "disabled");
        if (esEditable) $('#C' + i + '').removeAttr("disabled"); else $('#C' + i + '').attr("disabled", "disabled");
    }
}

function GuardaCambios() {
    Waiting(true, "Espere por favor. Cargando Información...");
    var ValoresA = $('#A1').val() + ',' + $('#A2').val() + ',' + $('#A3').val();
    var ValoresB = $('#B1').val() + ',' + $('#B2').val() + ',' + $('#B3').val();
    var ValoresC = $('#C1').val() + ',' + $('#C2').val() + ',' + $('#C3').val();

    SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.GuardaCambios(
        ValoresA, 'A',
        function (response) {
            if (response.value.indexOf("Error") == -1) {
                SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.GuardaCambios(
                    ValoresB, 'B',
                    function (response) {
                        if (response.value.indexOf("Error") == -1) {
                            SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.GuardaCambios(
                                ValoresC, 'C',
                                function (response) {
                                    if (response.value.indexOf("Error") == -1) {
                                        SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.GuardaCambios(
                                            '', 'NA',
                                            function (response) {
                                                MostrarMsj("Información almacenada exitosamente", "Mensaje", false, true, false, "", "Aceptar", "", 250, 110, null, function () { $("#divVentanaMensajes").dialog("close"); }, null);
                                                EditaValores(false);
                                                setTimeout(terminarWait, 500);
                                                // window.location.href = "EntidadesVivienda.aspx";
                                            }
                                        );
                                    } else {
                                        MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
                                    }
                                }
                            );
                        } else {
                            MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
                        }
                    }
                );
            } else {
                MostrarMsj(response.value, " Mensaje", false, true, false, "", "Aceptar", "", 280, 100, null, null, null);
            }
        }
    );
}

function changeDisplay() {
    d = document.getElementById("extra");
    if (document.getElementById('divHistorial').style.display == 'none') {
        Waiting(true, "Espere por favor. Cargando Información...");
        $("#divHistorial").animate({ opacity: '0.9', width: "100%" });
        document.getElementById('divHistorial').style.display = 'block';
        $("#divHistorial").animate({ display: "block" });
        d.innerHTML = 'Ocultar Historial';
    } else {
        d.innerHTML = 'Mostrar Historial';
        $("#divHistorial").animate({ opacity: '0', width: "0%" });
        document.getElementById('divHistorial').style.display = 'none';
    }
    setTimeout(terminarWait, 500);
    $("#divContenedor").show();
    $("#divMostrarL").show();
}

function GeneraHist(val) {
    Waiting(true, "Espere por favor. Cargando Información...");
    SicreNet.Portafolio.EntidadesyRegiones.EntidadesVivienda.GeneraHistorial(
        val,
        function (response) {
            $('#divHistorialGuardado').html(response.value);
            setTimeout(terminarWait, 500); 
        }
    );
} 
