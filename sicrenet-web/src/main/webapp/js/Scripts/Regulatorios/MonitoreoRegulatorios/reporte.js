/*******************************************************************************************************************************************/
/*****************************************  script los controladores del grid regulatorio **************************************************/
/*******************************************************************************************************************************************/

function toggle(div_id) {
    var el = document.getElementById(div_id);
    if (el.style.display == 'none') { el.style.display = 'block'; }
    else { el.style.display = 'none'; }
}

function blanket_size(popUpDivVar) {
    if (typeof window.innerWidth != 'undefined') {
        viewportheight = window.innerHeight;
    } else {
        viewportheight = document.documentElement.clientHeight;
    }
    if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
        blanket_height = viewportheight;
    } else {
        if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
            blanket_height = document.body.parentNode.clientHeight;
        } else {
            blanket_height = document.body.parentNode.scrollHeight;
        }
    }
    var blanket = document.getElementById('blanket');
    blanket.style.height = blanket_height + 'px';
    var popUpDiv = document.getElementById(popUpDivVar);

    popUpDiv_height = blanket_height / 2 - 200;//200 is half popup's height
    popUpDiv.style.top = ($(window).height() - $('#popUpDiv').outerHeight()) / 2 + 'px';
}

function window_pos(popUpDivVar) {
    if (typeof window.innerWidth != 'undefined') {
        viewportwidth = window.innerHeight;
    } else {
        viewportwidth = document.documentElement.clientHeight;
    }
    if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
        window_width = viewportwidth;
    } else {
        if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
            window_width = document.body.parentNode.clientWidth;
        } else {
            window_width = document.body.parentNode.scrollWidth;
        }
    }
    var popUpDiv = document.getElementById(popUpDivVar);
    window_width = window_width / 2 - 200;//200 is half popup's width
    //popUpDiv.style.left = window_width + 'px';
    popUpDiv.style.left = ($(window).width() - $('#popUpDiv').outerWidth()) / 2 + 'px';
    popUpDiv.style.top = ($(window).height() - $('#popUpDiv').outerHeight()) / 2 + 'px';
}

function popup(windowname, titulo, contenido, footer) {
    $('#spanTitulo').html(titulo);
    $('#divTblcontenido').html(contenido);
    $('#divTblFooter').html(footer);
    $('#popUpDiv').css('width', '900px');
    $('#popUpDiv').css('height', '720px');
    $('#divTblcontenido').css('width', '900px');
    $('#divTblcontenido').css('height', '620px');
    $('#divTblcontenido').css('overflow-y', 'auto');

    blanket_size(windowname);
    window_pos(windowname);
    toggle('blanket');
    toggle(windowname);
   
    
}



$(document).ready(function () {
    $("#imgOver").hover(function () {
        $(this).attr('src', '../../images/Pendientes/btnCancelarPendientes1.png');//cambia de imagen en el over
    }
    , function () {
        $(this).attr('src', '../../images/Pendientes/btnCancelarPendientes.png');
    });
});




/*******************************************************************************************************************************************/
/*****************************************  script los controladores del grid regulatorio **************************************************/
/*******************************************************************************************************************************************/

if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(
            /\{([^{}]*)\}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
}

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();

    return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
};

Date.prototype.ddmmyyyyy = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();

    return (dd[1] ? dd : "0" + dd[0]) + "/" + (mm[1] ? mm : "0" + mm[0]) + "/" + yyyy;
};

Date.prototype.ddmmyyyyy_menos1 = function (d, fecha) {
    var Fecha = new Date();
    var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear());
    var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
    var aFecha = sFecha.split(sep);
    var fecha = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0];
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + parseInt(d));
    var anno = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    mes = (mes < 10) ? ("0" + mes) : mes;
    dia = (dia < 10) ? ("0" + dia) : dia;
    var fechaFinal = dia + sep + mes + sep + anno;
    return (fechaFinal);
};

function getViews() {
    var vistas = {
        "Tabla": {
            "Td": function () {
                return "<td class='tddos' ><div id='{idDiv}' class='{cssNameDiv}'>{textocelda}</div></td>";
            },
            "DragDrop": function () {
                return "<div id='dZUpload_{id}' class='dropzone' style='width: 100px;  height:20px;' >";
            },
            "ColTh": function () {
                var td = "<th class='{cssNametd}' style='{thStyle}'><div id='{id}' class='{cssName}' ><div class='btnText' ></div><span class='{cssSpan}' >{textocelda}</span></div></th>"; return td;
            },
            "ColThSpan": function () {
                var td = "<th colspan='{colspan}'  class='{cssNametd}' style='{thStyle}' ><div id='{id}' class='{cssName}' class='btnText'  ><div></div><span class='{cssSpan}' >{textocelda}</span></div></th>"; return td;
            },
            "ColBandera": function () {
                var td = "<td class='{cssNametd}' ><div id='{id}' class='{cssName}'  ><div class='btnText' ><img class='logos' src='{bandera}'></div><span class='{cssSpan}' >{texto}</span></div></td>"; return td;
            },
            "Col": function () {
                var td = "<td class='{cssNametd}' ><div id='{id}' class='{cssName}'  ><div class='btnText' ></div><span class='{cssSpan}' >{textocelda}</span></div></td>";
                return td;
            },
            "ColBtn": function () {
                var td = "<td class='{cssNametd}' ><div id='{id}' class='{cssNameP} {cssName}'    ><div class='dz-message'  style='width:4px;  height:4px;'><span class='{cssSpan}' >{textocelda}</span></div></div></td>";
                return td;
            },
            "Colspan": function () {
                var td = "<td colspan='{colspan}'  class='{cssNametd}' ><div id='{id}' class='{cssName}' class='btnText'  ><div></div><span class='{cssSpan}' >{textocelda}</span></div></td>";
                return td;
            },
            "ColClickFicha": function () {
                var td = "<td class='{cssNametd}' ><div id='{id}' class='{cssName}'   onclick='mostrarFichaTecnica\u0028{var}\u0029;' ><div class='btnText'></div><span class='{cssSpan}' >{textocelda}</span></div></td>";
                return td;
            },
            "Colspanexpand": function () {
                var td = "<td colspan='{colspan}' class='expandtd' ><div id='{id}' class='{cssName}' class='expanddiv'></div></td>";
                return td;
            },
            "Rowspan": function () {
                var td = "<td rowspan='{rowspan}'  class='{cssNametd}' ><div id='{id}' class='{cssName}' class='btnText' ><div></div><span class='{cssSpan}'>{textocelda}</span></div></td>";
                return td;
            },
            "Row": function () {
                var tr = "<tr class='{cssName}' >{cols}</tr>";
                return tr;
            },
            "tHead": function () {
                return "<thead class='{cssName}'>{trs}</thead>";
            },
            "tFoot": function () {
                return "<tfoot class='{cssName}'>{trs}</tfoot>";
            },
            "tBody": function () {
                return "<tbody class='{cssName}'>{trs}</tbody>";
            },
            "GrapColor": function () {
                return "<div style='{style}%;' ><span>{texto}</span></div>";
            },
            "GrapContent": function () {
                return "<div  style='{style}' class='{cssName}'>{content}</div>";
            },
            "bandera": function () {
                return "<img class='logos' src='{img}'>";
            },
            "GrapContentV2": function () {
                return "<div class='{cssDiv}' style='width:{avg}%'><span>{dato}%</span></div>";
            },
            "GrapContentV2Cont": function () {
                return "<div id='{id}'>{grap}</div>";
            },
            "tblHija": function () {
                return "<div id='{idDivP}'><div><div>{tbl1}</div></div><div><div><div>{tbl2}</div></div></div>"
            },
            "Crea": function () {
                var t = "<table class='{css}'>{rows}</table>"
                return t;
            }
        }
    };
    return vistas;
}

var datosObjeto = (function () {    
    return {
        "get": function (f,o,x,obj) {
            var con = { "sql": "TableroRegulatoriosGrid.aspx/" }
            peticionAjax(con.sql + f, "POST", o,
                function (dat) {
                    if (dat.d != null && dat.d.indexOf("ERRORCATCH") == -1) {
                        var datos = JSON.parse(dat.d);
                        if (f === "getSegmentos") {
                            obj.model = datos;
                        }

                        if (f === "getMeses") {
                            obj.model.meses = datos;
                        }

                        if (f === "getReportes") {
                            if (!obj.model.reportes)
                                obj.model.reportes = [];

                            obj.model.reportes.push(datos);
                        }

                        if (f == "SPTableroRegulatoriosGetReportesArchivos") {
                            obj.model.reportesCargados = "";
                            obj.model.reportesCargados = datos;
                        }

                        !(x === undefined) && x();
                    }
                }, null);
        },
        "getConsulta": function (f,o,x,obj) {
            this.get(f, o,x,obj);            
        },
        "getConsultaDrag": function (f, o, x) {
            this.get(f, o, x, '', 1);
        }
    }
})();

var selDiaInicio = false;
var selDiaFin = false;

var CalendariosObjeto = (function () {
    var obj=[]
    return {
        "setObjetos": function (o) {
            obj.push(o);
        },
        "ini": function () {
            $("#fechaini").each(function () {
                $(this).datepicker({
                    onClose: function (selectedDate) {
                        var cal = (this.id == "fechaini") ? "#fechafin" : "#fechaini";
                        $(cal).datepicker("option", "minDate", selectedDate);

                        var date;
                        var date2 = $(cal).datepicker("getDate");
                        if (!date2) {

                            date = $(this).datepicker("getDate");
                            $(cal).datepicker("setDate", date);
                        }

                        date = $.datepicker.formatDate("yy-mm-dd", $(this).datepicker("getDate"));
                        date2 = $.datepicker.formatDate("yy-mm-dd", $(cal).datepicker("getDate"));

                        console.log(date); console.log(date2);

                        for (var i = obj.length; i--;) {
                            var selfGlobal = obj[i];
                            var selfCtrl = selfGlobal.controller[0].reporteController;

                            selfCtrl.setGlobal({ "fechaInicio": date, "fechaFin": date2 });
                            var ojbsend = { "idPais": selfCtrl.getGlobal().idPais, "fechaInicio": selfCtrl.getGlobal().fechaInicio, "fechaFin": selfCtrl.getGlobal().fechaFin, "opcion": selfCtrl.getGlobal().opcion }

                            selfCtrl.consultasfecha(ojbsend, "iniTablasCal");
                        }
                        selDiaInicio = true;
                        selDiaFin = true;
                    }
                });

            });

            $("#fechafin").datepicker(
                {
                    onClose: function (selectedDate) {
                        var cal = (this.id == "fechaini") ? "#fechafin" : "#fechaini";
                        $(cal).datepicker("option", "maxDate", selectedDate);

                        var date2 = $(cal).datepicker("getDate");
                        if (!date2) {
                            var date = $(this).datepicker("getDate");
                            $(cal).datepicker("setDate", date);
                        }

                        date2 = $.datepicker.formatDate("yy-mm-dd", $(this).datepicker("getDate"));
                        date = $.datepicker.formatDate("yy-mm-dd", $(cal).datepicker("getDate"));

                        console.log(date); console.log(date2);

                        for (var i = obj.length; i--;) {
                            var selfGlobal = obj[i];
                            var selfCtrl = selfGlobal.controller[0].reporteController;

                            selfCtrl.setGlobal({ "fechaInicio": date, "fechaFin": date2 });
                            var ojbsend = { "idPais": selfCtrl.getGlobal().idPais, "fechaInicio": selfCtrl.getGlobal().fechaInicio, "fechaFin": selfCtrl.getGlobal().fechaFin, "opcion": selfCtrl.getGlobal().opcion }

                            selfCtrl.consultasfecha(ojbsend, "iniTablasCal");
                        }
                        selDiaInicio = true;
                        selDiaFin = true;
                    }
                });
        }
    }
})();


var ObjRepo = function () {
    return {
        model: [],
        controller: [],
        view: []
    }
}();



var Drag = (function () {
                var operaciones = function (o, objCssDiv, objCssSp, css, txt) {
                                    (txt == undefined)
                                    ? $(o).children().css(objCssSp)
                                    : $(o).children().html(txt);

                                    (css == "addClass")
                                    ? $(o).addClass("hover").css(objCssDiv)
                                    : $(o).removeClass("hover").css(objCssDiv);
                                };

                var tablero = function (obj) {
                                    return "<div><p>serie:" + obj.serie + "<br/>fecha:" + obj.fecha + "<br/>archivo:<br/>" + obj.file + "</p><p><button type='button' class='btnDrop'>Procesar</button><button type ='button' id='btnDropCancelar' class='btnDrop'>Cancelar</button></p><div>";
                                }

    return {
        ini: function (e) {
            self = this;
            $(e).dropzone({
                url: "DragAndDrop.ashx",
                maxFiles: 10,
                addRemoveLinks: true,
                success: function (file, response) {
                                var str = this.element.id;
                                var str2 = str.split("_");
                                var param = {
                                    Reporte: str2[3],
                                    Pais: str2[1],
                                    Fecha: str2[6]
                                };
                                self.subidaValida(param, str);
                            },
                error: function (file, response) {
                    MostrarMsj("Ocurrio un error al cargar el archivo", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                    alert(response);
                    context.Response.Write(response);
                    self.BtnCloseDrag(e.id, "cancelar");
                }
            });

            //posicionamientoarriba
            $(e).bind('dragover', function () {
                            operaciones(this, { width: "4px", height: "4px", zIndex: 3 }, { width: "4px", height: "4px", display: "inline-block" }, "addClass", "");
            });

            //deja el posisiconamiento
            $(e).bind('dragleave', function () {
                        self.close(this);
            });

            //deposita el objeto
            $(e).bind('drop', function () {

            });
        },
        close: function (o) {
                            operaciones(o, { width: "4px", height: "4px", zIndex: "auto" }, { width: "0px", height: "0px", display: "none" }, "removeClass", "");
            },

        BtnCloseDrag: function (o, btn) {
                                var self = this;
                                var jq = "#" + o;
                                var dom = document.getElementById(o);
                                //dom.innerHTML = "";
                                if (btn == undefined)
                                    dom.className = self.replaceBtnCssColor(dom.className);

                                dom.className = dom.className.replace('hover', '');
                                dom.style.width = "4px";
                                dom.style.height = "4px";
                                dom.style.zIndex = "auto";
                                dom.style.cursor = "pointer";

                                //var domClone = dom.cloneNode(true);
                                //dom.parentNode.replaceChild(domClone, dom);
                            },
        replaceBtnCssColor: function (o) {
                                var respuesta = "";
                                var self = this;
                                var arrColor = [{ css1: "rojo", css2: "azul" }, { css1: "azul", css2: "azul" }, { css1: "amarillo", css2: "verde" }, { css1: "naranja", css2: "verde" }, { css1: "gris", css2: "verde" }, { css1: "verde", css2: "verde" }]
                                arrColor.reverse();
                                for (var i = arrColor.length; i--;) {
                                    if (self.validaCSS(o, arrColor[i].css1)) {
                                        respuesta = o.replace(arrColor[i].css1, arrColor[i].css2);
                                        break;
                                    }
                                }
                                return respuesta;
                            },
        validaCSS: function (o, c) {
                                var validacion = new RegExp("(?:^|\\s)" + c + "(?!\\S)");
                                return o.match(validacion);
                            },
        subidaValida: function (param, jq) {
                            var self = this;
                            Waiting(true, "Cargando Información...");
                            peticionAjax('TableroRegulatoriosGrid.aspx/validaAlmacenaArchivo', "POST", {},
                                 function (data) {
                                     if (data.d.split('#')[0] == "Subir") {
                                         self.subidaAlmacena(param, jq);
                                     }
                                     else {
                                         alert(data.d);
                                         Waiting(false, "Cargando Información...");
                                     }
                                 }, null);
                        },
        subidaAlmacena: function (param, jq) {
                            var self = this;
                            peticionAjax('TableroRegulatoriosGrid.aspx/almacenaArchivoDragAndDrop', "POST", param, function (data) {
                                if (data.d.split("-")[0] == 'Error') {
                                    var cad = 'Error en la subida de Archivo. <br/>';
                                    MostrarMsj(data.d.indexOf("Error") != -1 ? cad : "Error en el Archivo.", "Mensaje", false, true, false, "", "Aceptar", "", 350, 220, null, function () {
                                        entroCloseBtnAceptar = true;
                                        $("#divVentanaMensajes").dialog("close");
                                    });

                                }
                                else {
                                    self.BtnCloseDrag(jq);
                                    alertify.success("El archivo se almaceno correctamente...!");
                                }
                                Waiting(false, "Cargando Información...");
                            });

                        }
    }
})();


