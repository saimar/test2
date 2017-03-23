/*******************************************************************************************************************************************/
/*****************************************  script los controladores del grid regulatorio **************************************************/
/*******************************************************************************************************************************************/

function getControlers() {
    var global = { "tPaises": "" }
    var relacion = []
    var busca = function (datos, campoBuscar, valorBuscar, variableSalida) {
        if (valorBuscar != null) {
            for (var i = datos.length; i--;) {
                if (datos[i][campoBuscar] === valorBuscar) {
                    variableSalida.push(datos[i]);
                }
            }
        }
    }
    var controladores = {
        "reporteController": {
            "getPais": function (p) { busca(arrayRel.relacion, consts.var2, p, relacion); return relacion[0].FIIdPais; },
            "consultasfecha": function (ojbsend, origen) {
                    var self = this.getGlobal().Obj;
                    Waiting(true, "Cargando Información...");
                    datosObjeto.getConsulta("getSegmentos", ojbsend,
                        function (c) {
                            datosObjeto.getConsulta("getMeses", ojbsend,
                                function () {
                                    controladores.reporteController.init(self, origen);
                                    Waiting(false, "Cargando Información...");
                                  
                                    /*************************************** 30 dias antes del inicio/ 10 dias descpues del fin ***************************************************/
                                    var today = new Date();

                                    if (selDiaInicio == false) {
                                        var fecha1 = today.ddmmyyyyy_menos1(-30, ($('#fechaini').datepicker('getDate').getDate()) + "/" + ($('#fechaini').datepicker('getDate').getMonth() + 1) + "/" + ($('#fechaini').datepicker('getDate')).getFullYear());
                                        $('#spanDesde').html(fecha1);
                                        $('#fechaini').datepicker('setDate', fecha1);
                                    }

                                    if (selDiaFin == false) {
                                        fecha1 = today.ddmmyyyyy_menos1(9, ($('#fechafin').datepicker('getDate').getDate()) + "/" + ($('#fechafin').datepicker('getDate').getMonth() + 1) + "/" + ($('#fechafin').datepicker('getDate')).getFullYear());
                                        $('#spanHasta').html(fecha1);
                                        $('#fechafin').datepicker('setDate', fecha1);
                                    }
                                    /********************************************************************************************************************/
                                },
                            self);

                    }, self);},
            "setTPaisesGlobal": function (obj) {global.tPaises = global.tPaises + obj.tPaises;},
            "delPaisesGlobal": function (obj) {global.tPaises = "";},
            "getPaisesGlobal": function (obj) {return global.tPaises;},
            "setGlobal": function (obj) {
                            if (obj.idPais) global.idPais = obj.idPais;
                            if (obj.fechaInicio) global.fechaInicio = obj.fechaInicio;
                            if (obj.fechaFin) global.fechaFin = obj.fechaFin;
                            if (obj.tPaises) global.tPaises = obj.tPaises;
                            if (obj.Objeto) global.Obj = obj.Objeto;
                            if (obj.ReporteTipo) global.ReporteTipo = obj.ReporteTipo;
                            if (obj.opcion) global.opcion = obj.opcion;
                            },
            "getGlobal": function () { return global; },
            "iniObjetos": function () {
                var self = controladores.reporteController;
                var selftGlobal = this.getGlobal().Obj;
                var selftModel = selftGlobal.model;
                var segmentos = selftModel.segmentos;
                var agrupaLista = function (b, o, c) {
                    var orderArray = [];
                    for (var bbb = b.length; bbb--;) {
                        var busca = b[bbb];
                        for (var iii = o.length; iii--;) {
                            if (o[iii][c] === busca) {
                                orderArray.push(o[iii]);
                                //break;
                            }
                        }

                    }
                    return orderArray;
                }
                window.addEventListener("resize", myfunc10);
                function myfunc10() {
                    console.log((parseInt($(window).width() - 40) + 'px'));
                    $(".tablahija").css({ "max-width": (parseInt($(window).width() - 40) + 'px') });
                }
                $(".btnTituloGraph3").css('cursor', 'pointer');
                $(".btnTituloGraph3").each(function () {
                    $(this).on("click", function () {
                        var idOld = $(this).attr("id");
                        var idArr = idOld.split("_");
                        var orderListSegmentos = [idArr[1]];
                        var PaisesSegmentos = agrupaLista(orderListSegmentos, segmentos, 'idPais')

                        PaisesSegmentos.reverse();
                        self.tabla().principalSub(PaisesSegmentos, 2, idArr[1]);
                        setSegmentos(PaisesSegmentos, idArr[1]);
                        var conte = "#data_bind_1";
                        var conte2 = "#data_bind_2";
                        //var dom = document.getElementById(conte);
                        $(conte).hide();
                        $(conte2).show();

                        $(".classButton").on("click", function () {
                            var conte = "#data_bind_1";
                            var conte2 = "#data_bind_2";
                            $(conte).show();
                            $(conte2).hide();

                            if ($('#data_bind_1').css('display') == 'block' && $('#data_bind_2').css('display') == 'none') {
                                $('#btnRegresar').css('visibility', 'collapse');
                                $('#spanTitutlo').html('MONITOREO DE ENTREGA REPORTES REGULATORIOS');
                            }
                            else {
                                $('#btnRegresar').css('visibility', 'visible');
                                $('#spanTitutlo').html('ESTATUS DE ENTREGA DE REPORTES REGULATORIOS');
                            }
                        });


                        /*********************************** Muestra boton deregreso ****************************/
                        if ($('#data_bind_1').css('display') == 'block' && $('#data_bind_2').css('display') == 'none') {
                            $('#btnRegresar').css('visibility', 'collapse');
                            $('#spanTitutlo').html('MONITOREO DE ENTREGA REPORTES REGULATORIOS');
                        }
                        else {
                            $('#btnRegresar').css('visibility', 'visible');
                            $('#spanTitutlo').html('ESTATUS DE ENTREGA DE REPORTES REGULATORIOS');
                        }
                        /*********************************** Muestra boton deregreso ****************************/

                    });
                });

                setSegmentos(segmentos, self.getGlobal().idPais);
                function setSegmentos(s, p) {

                    var segmentos = s;
                    for (var ss = segmentos.length; ss--;) {
                        var btn = "#btnGraf_";
                        var btn_div = "#graphDiv_";
                        var div = "#expanddiv_";
                        var lstBtn = "";
                        var id = segmentos[ss].id;
                        btn += id;
                        btn_div += id;
                        div += id;
                        $(div).hide();

                        lstBtn = btn + "," + btn_div;

                        $(lstBtn).each(function () {
                            $(this).css('cursor', 'pointer');
                            $(this).on("click", function () {
                                var self = controladores.reporteController;
                                var div2 = "#expanddiv_";
                                var str = this.id;
                                var strid = str.substring(str.lastIndexOf("_") + 1);
                                div2 += strid;

                                if ($(div2).is(":hidden")) {
                                    var funcionesBoton = controladores.reporteController.celda();
                                    funcionesBoton.btnClsTblHjs();
                                    Waiting(true, "Cargando Información...");
                                    datosObjeto.getConsulta("getReportes", { "idPais": p, "fechaInicio": self.getGlobal().fechaInicio, "fechaFin": self.getGlobal().fechaFin, "segmento": strid }, function () {
                                        self.tabla().hijaV2(selftGlobal, strid);
                                        myfunc10();
                                        $(".freezeHd2").scroll(function () {
                                            $(".freezeHd2").scrollTop($(this).scrollTop());
                                        });

                                        $(div2).toggle("show");
                                        //crea el formato de tabla pivot
                                        var div3 = div2 + " table";
                                        $(div3).DataTable({
                                            "scrollY": "350px",
                                            "scrollX": true,
                                            scrollCollapse: true,
                                            paging: false,
                                            fixedColumns: {
                                                leftColumns: 3

                                            },
                                            "columnDefs": [{ "visible": false, "targets": -1 }]
                                        });
                                        //agregar propiedades a los nombres de los reportes
                                        $(".tablahijaTdNomRepClave, .tablahijaTdNomRep, .tablahijaTdContador").css('cursor', 'pointer');
                                       
                                        $(".target").each(function () {
                                            var funcionesBoton = self.celda();
                                            $(this).on("click", function () {
                                                var idOld = $(this).attr("id");
                                                var idArr = idOld.split("_");
                                                var texto = idArr[6]
                                                var fFDom = document.getElementById("fchOculta");
                                                fFDom.value = texto;
                                                mostrarFichaTecnica(idArr[1], idArr[2], idArr[3], idArr[4], idArr[5], '0');
                                            });
                                        });

                                        Dropzone.options.myAwesomeDropzone = false;
                                     
                                        //funcionalidad de los botones de colores en le grid
                                        $(".target").css('cursor', 'pointer');
                                        $(".target").each(function () {
                                         Drag.ini(this);
                                        });


                                        /*************************************** Posiciona al final del DIV *******************************************/
                                        var largo = $("#DataTables_Table_0").width();
                                        if (largo == null) {
                                            largo = $("#DataTables_Table_1").width();
                                        }
                                        $('.dataTables_scrollBody').animate({ scrollLeft: largo }, '1500', 'swing');
                                        /**************************************************************************************************************/

                                        Waiting(false, "Cargando Información...");

                                    }, selftGlobal);
                                } else {
                                    $(div2).toggle("show");
                                }
                            });
                        });
                    }
                }
            },
            "iniTablas": function (ori) {
                var selftGlobal = this.getGlobal().Obj;
                var self = controladores.reporteController;
                self.tabla().init();
                self.tabla().principal2(selftGlobal, 1);
                self.iniObjetos();
            },
            "init": function (o, ori) {
                var selftGlobal = this.getGlobal().Obj;
                var selfCtrl = selftGlobal.controller[0].reporteController;
                var conte = "data_bind_" + selfCtrl.getGlobal().idPais
                var compara = selfCtrl.getGlobal().ReporteTipo;
                if (o.model) {
                    selfCtrl.tabla().init();
                    if (compara == 1) {
                        selfCtrl.tabla().principal(selftGlobal, 1);
                    } else {
                        selfCtrl.tabla().principal2(selftGlobal, 1);
                    }
                    selfCtrl.iniObjetos();
                }

            },
            "celda": function () {
                var variablesDef = { "height": "100px", "width": "100px", "clas1": "btn", "clas2": "btnsel", "velocidad": 300 }
                return {
                    "botonIni": function (e) {
                        $(e).unbind();
                        var funcionesBoton = controladores.reporteController.celda();
                        var w = $(e).width();
                        var h = $(e).height();
                        funcionesBoton.botoncierraTodos();
                        $(e).removeClass(variablesDef.clas1).addClass(variablesDef.clas2);
                        $(e)
                        .animate({
                            height: variablesDef.height
                        }, { queue: false, duration: variablesDef.velocidad })
                        .animate({ width: variablesDef.width });

                        $(e).on("click", function () {
                            funcionesBoton.botonFin(e, w, h);
                        });
                    },
                    "botonFin": function (e, w, h) {
                                var funcionesBoton = controladores.reporteController.celda();
                                $(e).removeClass(variablesDef.clas2).addClass(variablesDef.clas1);
                                $(e).css({ width: w + "px", height: h + "px" });
                                $(e).on("click", function () {
                                    funcionesBoton.botonIni(e);
                                });
                    },
                    "btnClsTblHjs": function () {
                                var jqvar = "." + "tablahija";
                                $(jqvar).hide();
                    },
                    "botoncierraTodos": function () {
                                var jqvar = "." + variablesDef.clas2;
                                $(jqvar).each(function () {
                                    $(this).click();
                                });
                    },
                    "cssCeldasHoy": function (d) {
                               return (d === "") ? tdbtn - hoy : "";
                    }
                }
            },
            "tabla": function () {
                var selfGlobal = this.getGlobal().Obj;
                var selfCtrl = selfGlobal.controller[0].reporteController;
                var selfView = selfGlobal.view[0].Tabla;
                var conte = "data_bind_" + selfCtrl.getGlobal().idPais
                var tblHijo = { "table": "", "tr": "", "td": "", "thead": "", "tbody": "", "tfoot": "" };
                var tblPadre = { "table": null, "tr": null, "td": null };
                var variablesDef = { "contenedor": conte, "clasecelda": ".btn", "meses": "" };
                var getHeadersDias = function (m) {
                    var a = selfGlobal.model.meses.meses[m].dias;
                    return a.reverse();
                }
                var getHeadersMeses = function () {
                    var meses = selfGlobal.model.meses.meses;
                    return meses.reverse();
                }
                var setColsBanderas = function (oCol) {
                    return selfView.ColBandera().supplant(oCol);
                }

                return {
                    "pintaTablaHijo": function (s, f) {
                        var ele = "expanddiv" + "_" + s;
                        var dom2 = document.getElementById(ele);
                        if (f == undefined) {
                            dom2.innerHTML = tblHijo.table;
                            tblHijo.table = "";
                        } else {
                            dom2.innerHTML = "";
                        }
                    },
                    "HeadersMeses": function () {
                        return global.meses;
                    },
                    "init": function () {
                        global.meses = getHeadersMeses();
                    }, "hijaV2": function (o, segmento) {
                        var selft = o;
                        var body = '';
                        var rows = "";

                        var getTabla = function (oRows) {
                            delRows();
                            return selft.view[0].Tabla.Crea().supplant(oRows);

                        }
                        var delCols = function () { body = ""; }
                        var delRows = function () { rows = ""; }
                        var setRows2 = function (oBody) {
                            delCols();
                            return rs = selft.view[0].Tabla.Row().supplant(oBody);
                        }
                        var setCols = function (oCol, th) {
                            if (th === undefined) {
                                body += (oCol.colspan)
                                    ? selft.view[0].Tabla.Colspan().supplant(oCol)
                                    : (oCol.rowspan) ? selft.view[0].Tabla.Rowspan().supplant(oCol) : selft.view[0].Tabla.Col().supplant(oCol);
                            } else {
                                body += (oCol.colspan)
                                   ? selft.view[0].Tabla.ColThSpan().supplant(oCol)
                                   : (oCol.rowspan) ? selft.view[0].Tabla.Rowspan().supplant(oCol) : selft.view[0].Tabla.ColTh().supplant(oCol);
                            }
                        }

                        var setColsJs = function (oCol) {
                            body += selft.view[0].Tabla.ColClickFicha().supplant(oCol);
                        }

                        var getReportes = function (n) {
                            var filasCeldas = selft.model.reportes;
                            var respuesta;
                            for (var cc = filasCeldas.length; cc--;) {
                                if (filasCeldas[cc].idSegmento == n) {
                                    respuesta = filasCeldas[cc].reportes;
                                    break;
                                }
                            }
                            return respuesta;
                        }

                        var getHeadersDiasCount = function (m) {
                            var dii = selft.model.meses.meses[m].dias;
                            return dii.length;
                        }

                        var getHeadersTitulo = function () {
                            return selft.model.meses.titulo;
                        }

                        var getColumnas = function (i) {
                            var cols = Reportes[i].fechas;
                            return cols.reverse();
                        }

                        var meses = this.HeadersMeses();

                        //aqui va el estilo de la parte derecha que no se mueve
                        setCols({ "id": "", "textocelda": " ", "thStyle": "width:500px;", "colspan": 3, "cssName": "fondoCeldaEstatica", "cssSpan": "" }, "th");

                        for (var zz = meses.length; zz--;) {
                            var diascount = meses[zz].dias;
                            setCols({ "id": "", "textocelda": meses[zz].Mes, "colspan": diascount.length, "cssName": "cabeza cabeza1", "cssSpan": "", "cssNametd": "Thija-th" }, "th");
                        }
                        //agrega filas encabezados
                        tblHijo.tr += setRows2({ "cols": body, "cssName": "" });

                        //Agrega encabezado numero de dias
                        var colspan = "2";
                        setCols({ "id": "", "textocelda": "Serie", "cssName": "cabezaTitulosDerecha", "cssSpan": "", "thStyle": "width:60px;", "cssNametd": "Thija-th Thija-th-sort" }, "th");
                        setCols({ "id": "", "textocelda": "Reporte", "cssName": "cabezaTitulosDerecha", "cssSpan": "", "thStyle": "width:50px;", "cssNametd": "Thija-th Thija-th-sort" }, "th");
                        setCols({ "id": "", "textocelda": "Pendientes", "cssName": "cabezaTitulosDerecha", "cssSpan": "", "cssNametd": "", "thStyle": "width:50px;", "cssNametd": "Thija-th Thija-th-sort" }, "th");
                        for (var zz = meses.length; zz--;) {
                            var dias = meses[zz].dias;
                            for (var zzz = dias.length; zzz--;) {
                                var dia = dias[zzz].dia;
                                var colspan = (dias[zzz].colspan == null) ? "" : dias[zzz].colspan;
                                var id = zzz + "-" + dia;
                                setCols({ "id": id, "textocelda": dia, "colspan": colspan, "cssNametd": dias[zzz].cssNametd, "cssName": "cabeza cabeza3 ", "cssSpan": "", "cssNametd": "Thija-th" });
                            }
                        }
                        tblHijo.tr += setRows2({ "cols": body, "cssName": "" })
                        //agrega filas encabezados
                        tblHijo.thead = selft.view[0].Tabla.tHead().supplant({ "cssName": "thead11", "trs": tblHijo.tr });
                        tblHijo.tr = "";

                        var Reportes = getReportes(segmento);
                        if (!Reportes)
                            var Reportes = []

                        //********************************  creafilas  ***************************************
                        for (var i = Reportes.length; i--;) {
                            var reporte = Reportes[i].nombre;
                            var columnas = getColumnas(i);
                            var colspan = "";
                            var fechaid1 = columnas[0]["fecha"];
                            var fechaid1_2 = fechaid1.split(" ");

                            // ************************************************** agrega Nombre reporte ********************************************
                            var idnvo1 = id + "_" + columnas[0]["idPais"] + "_" + segmento + "_" + Reportes[i]["idReporte"] + "_" + Reportes[i]["nombre"] + "_" + columnas[0]["periodicidad"] + "_" + fechaid1_2[0];

                            setCols({ "id": idnvo1, "textocelda": reporte, "colspan": colspan, "cssName": "tablahijaTdNomRepClave", "cssSpan": "" });
                            setCols({ "id": idnvo1, "textocelda": Reportes[i]["detalle"], "colspan": colspan, "cssName": "tablahijaTdNomRep", "cssSpan": "" });
                            setCols({ "id": idnvo1, "textocelda": Reportes[i]["reportes"], "cssNametd": "tdbtn", "colspan": colspan, "cssName": "tablahijaTdContador", "cssSpan": "" });

                            var cont = 0;
                            for (var ii = columnas.length; ii--;) {
                                var celda = columnas[ii].textocelda;
                                var id = columnas[ii].id;

                                // ************** agrega detalles reporte  verifica candidato a agregar consulta de ficha tecnica verfica botones de color ********************
                                var fechaid = columnas[ii]["fechaCorte"];
                                var fechaid2 = fechaid.split(" ");
                                var idnvo = id + "_" + columnas[ii]["idPais"] + "_" + segmento + "_" + Reportes[i]["idReporte"] + "_" + Reportes[i]["nombre"] + "_" + columnas[ii]["periodicidad"] + "_" + fechaid2[0];

                                body += selft.view[0].Tabla.ColBtn().supplant({ "id": idnvo, "textocelda": celda, "cssNameP": columnas[ii]["cssTarget"], "cssNametd": columnas[ii].cssNametd, "cssName": columnas[ii].cssName, "cssSpan": columnas[ii].cssSpan });
                                cont++;
                            }

                            var porc = i % 2;
                            if (porc === 0) {
                                tblHijo.tr += setRows2({ "cols": body, "cssName": "subTbleven" })
                            } else {
                                tblHijo.tr += setRows2({ "cols": body, "cssName": "subTblodd" })
                            }

                        }
                        tblHijo.tbody = selft.view[0].Tabla.tBody().supplant({ "cssName": "", "trs": tblHijo.tr });
                        tblHijo.tr = "";
                        tblHijo.table = getTabla({ "rows": tblHijo.thead + tblHijo.tbody });
                        tblHijo.thead = "";
                        tblHijo.tbody = "";
                        this.pintaTablaHijo(segmento);
                        body = "";
                        rows = "";
                    },
                    "hija": function (o, segmento) {
                        var selft = o;
                        var body = '';
                        var rows = "";

                        var getTabla = function (oRows) {
                            delRows();
                            return selft.view[0].Tabla.Crea().supplant(oRows);
                        }

                        var delCols = function () { body = ""; }
                        var delRows = function () { rows = ""; }
                        var setRows2 = function (oBody) {
                            delCols();
                            return rs = selft.view[0].Tabla.Row().supplant(oBody);
                        }
                        var setCols = function (oCol) {
                            body += (oCol.colspan)
                                ? selft.view[0].Tabla.Colspan().supplant(oCol)
                                : (oCol.rowspan) ? selft.view[0].Tabla.Rowspan().supplant(oCol) : selft.view[0].Tabla.Col().supplant(oCol);
                        }

                        var getReportes = function (n) {
                            var filasCeldas = selft.model.reportes;
                            var respuesta;
                            for (var cc = filasCeldas.length; cc--;) {
                                if (filasCeldas[cc].idSegmento == n) {
                                    respuesta = filasCeldas[cc].reportes;
                                    break;
                                }
                            }
                            return respuesta;
                        }

                        var getHeadersDiasCount = function (m) {
                            var dii = selft.model.meses.meses[m].dias;
                            return dii.length;
                        }

                        var getHeadersTitulo = function () {
                            return selft.model.meses.titulo;
                        }

                        var getColumnas = function (i) {
                            var cols = Reportes[i].fechas;
                            return cols.reverse();
                        }

                        var meses = this.HeadersMeses();

                        setCols({ "id": "", "textocelda": " ", "colspan": 3, "cssName": "", "cssSpan": "" });

                        for (var zz = meses.length; zz--;) {
                            var diascount = meses[zz].dias;
                            setCols({ "id": "", "textocelda": meses[zz].Mes, "colspan": diascount.length, "cssName": "cabeza cabeza1", "cssSpan": "" });
                        }

                        //**************************************************** agrega filas encabezados ***********************************************************
                        tblHijo.tr += setRows2({ "cols": body, "cssName": "" });

                        //************************************************ Agrega encabezado numero de dias *******************************************************
                        var colspan = "2";
                        setCols({ "id": "", "textocelda": "Serie", "cssName": "cabeza", "cssSpan": "" });
                        setCols({ "id": "", "textocelda": "Reporte", "cssName": "cabeza cabeza2", "cssSpan": "" });
                        setCols({ "id": "", "textocelda": "Pendientes", "cssName": "cabeza cabezaTotal", "cssSpan": "", "cssNametd": "" });
                        for (var zz = meses.length; zz--;) {
                            var dias = meses[zz].dias;
                            for (var zzz = dias.length; zzz--;) {

                                var dia = dias[zzz].dia;
                                var colspan = (dias[zzz].colspan == null) ? "" : dias[zzz].colspan;
                                var id = zzz + "-" + dia;
                                setCols({ "id": id, "textocelda": dia, "colspan": colspan, "cssNametd": dias[zzz].cssNametd, "cssName": "cabeza cabeza3 ", "cssSpan": "", "js": "" });
                            }
                        }
                        tblHijo.tr += setRows2({ "cols": body, "cssName": "" })
                        //agrega filas encabezados

                        tblHijo.thead = selft.view[0].Tabla.tHead().supplant({ "cssName": "thead11", "trs": tblHijo.tr });
                        tblHijo.tr = "";
                        var Reportes = getReportes(segmento);
                        if (!Reportes)
                            var Reportes = []

                        //creafilas

                        for (var i = Reportes.length; i--;) {

                            var idReporte = Reportes[i].nombre;
                            var reporte = Reportes[i].nombre;
                            var columnas = getColumnas(i);
                            var colspan = "";
                            //agrega Nombre reporte
                            setCols({ "id": "", "textocelda": Reportes[i]["nombre"], "colspan": colspan, "cssName": "tablahijaTdNomRepClave", "cssSpan": "" });
                            setCols({ "id": "", "textocelda": Reportes[i]["detalle"], "colspan": colspan, "cssName": "tablahijaTdNomRep", "cssSpan": "" });
                            setCols({ "id": "", "textocelda": Reportes[i]["reportes"], "cssNametd": "tdbtn", "colspan": colspan, "cssName": "", "cssSpan": "" });
                            for (var ii = columnas.length; ii--;) {
                                var celda = columnas[ii].textocelda;
                                var id = columnas[ii].id;
                                // agrega detalles reporte verifica candidato a agregar consulta de ficha tecnica
                                var js = ((columnas[ii]["estatus"] == "5") || (columnas[ii]["estatus"] == "6") || (columnas[ii]["estatus"] == "7") || (columnas[ii]["estatus"] == "8"))
                                        ? "onclick='mostrarFichaTecnica('" + columnas[ii]["idPais"] + "', " + segmento + ", '" + Reportes[i]["idReporte"] + "', '" + Reportes[i]["nombre"] + "', '" + columnas[ii]["periodicidad"] + "', '0')';"
                                        : "";
                                setCols({ "id": id, "textocelda": celda, "cssNametd": columnas[ii].cssNametd, "cssName": columnas[ii].cssName, "cssSpan": columnas[ii].cssSpan, "js": js });
                            }
                            //agregareporte
                            tblHijo.tr += setRows2({ "cols": body, "cssName": "" })
                        }
                        tblHijo.tbody = selft.view[0].Tabla.tBody().supplant({ "cssName": "", "trs": tblHijo.tr });
                        tblHijo.tr = "";
                        tblHijo.table = getTabla({ "rows": tblHijo.thead + tblHijo.tbody });
                        tblHijo.thead = "";
                        tblHijo.tbody = "";
                        pintaTablaHijo(segmento);
                        body = "";
                        rows = "";

                    },
                    "borra": function () {
                        var dom = document.getElementById(variablesDef.contenedor);
                        while (dom.firstChild) dom.removeChild(dom.firstChild);
                    },
                    "pintaTablaPrincipal": function (t, c) {
                        var conte = "data_bind_" + c;
                        var dom = document.getElementById(conte);
                        if (dom) {
                            dom.innerHTML = t;
                        }

                    


                    },
                    "principal": function (m, c) {
                        console.log("principal");
                        var selft = m;
                        var body = "";
                        var rows = "";
                        var tbl = "";

                        var ordernarLista = function (b, o, c) {
                            var orderArray = [];
                            for (var bbb = b.length; bbb--;) {
                                var busca = b[bbb];

                                for (var iii = o.length; iii--;) {

                                    if (o[iii][c] === busca) {
                                        orderArray.push(o[iii]);
                                        break;
                                    }
                                }
                            }
                            return orderArray;
                        }

                        var setHeadersRowspan = function (obj) {
                            setCols(obj);
                            setRows({ "cols": body });
                        }

                        var getHeaders = function () {
                            var fechas = selft.model[0].tabla[0].headers;
                            return fechas.reverse();
                        }

                        var getSegmentos = function () {
                            var filasCeldas = selft.model.segmentos;
                            return filasCeldas.reverse();
                        }

                        var getPaisImg = function () {
                            return selft.model.pais;
                        }

                        var setGrap = function (oBody) {
                            body += selft.view[0].Tabla.Td().supplant(oBody);
                        }

                        var setRows2 = function (oBody) {
                            delCols();
                            return rs = selft.view[0].Tabla.Row().supplant(oBody);
                        }

                        var setRows = function (oBody) {
                            rows += selft.view[0].Tabla.Row().supplant(oBody);
                            delCols();
                        }

                        var setCols2 = function (oCol) {
                            body += selft.view[0].Tabla.Colspanexpand().supplant(oCol);
                        }

                        var setCols = function (oCol) {
                            body += (oCol.colspan)
                                ? selft.view[0].Tabla.Colspan().supplant(oCol)
                                : (oCol.rowspan) ? selft.view[0].Tabla.Rowspan().supplant(oCol) : selft.view[0].Tabla.Col().supplant(oCol);
                        }

                        var getTabla = function (oRows) {
                            delRows();
                            return selft.view[0].Tabla.Crea().supplant(oRows);

                        }
                        var delCols = function () { body = ""; }
                        var delRows = function () { rows = ""; }

                        //funcion wue sirve para saber si va desplegar detalle o no
                        var getPropiedadesBtnGrafica = function (g, i, b) {
                            return ((g.length === 1) && (g[0].estatus === "0")) ? i : b + i;
                        }
                        //funcion que pinta las graficas
                        var pintaGrafica = function (a, aa) {
                            var acum = "";

                            if (a.length > 0) {

                                for (var iii = a.length; iii--;) {
                                    acum += selft.view[0].Tabla.GrapContentV2().supplant({ "cssDiv": a[iii]["cssName"], "avg": (Math.round((a[iii]["segavg"] * 100) * 100) / 100) - .5, "dato": Math.round((a[iii]["segavg"] * 100)) });
                                }
                            } else {
                                rest = 99;
                                height = "37";
                                restTxt = "";
                                acum = selft.view[0].Tabla.GrapContent().supplant({ "style": "background-color:" + aa[0].cssName + "; width:" + rest + "%; height:" + height + "px;", "cssName": aa[0].cssName, "datoContent": restTxt, "datoCss": "", "content": "" });
                            }
                            return selft.view[0].Tabla.GrapContentV2Cont().supplant({ "id": "graphCont", "grap": acum });
                        }

                        var tblFather = function () {
                            var selfModel = selfGlobal.model;
                            var colspan = "";
                            setCols({ "id": "", "textocelda": "Segmento/Pais", "colspan": colspan, "cssName": "btnTitulo1", "cssSpan": "", "cssNametd": "tduno" });
                            body += setColsBanderas({ "id": "", "texto": selfModel.segmentos[0].paisIso, "bandera": selfModel.segmentos[0].paisBandera, "colspan": colspan, "cssName": "btnTituloGraph", "cssSpan": "" });

                            setRows({ "cols": body, "cssName": "" });
                            ///escribe segmentos y grafcas
                            var seg = getSegmentos();
                            for (var yy = seg.length; yy--;) {
                                var Graf = seg[yy].graficas;
                                var orderListGraf = ["3", "4", "8", "7", "6", "5"];
                                var GrafOrder = ordernarLista(orderListGraf, Graf, 'estatus')
                                ////////escribe grafica y su fila
                                setCols({ "id": getPropiedadesBtnGrafica(Graf, seg[yy].id, "btnGraf_"), "textocelda": '&nbsp;&nbsp;' + seg[yy].nombre, "colspan": colspan, "cssName": "btnGraf", "cssSpan": "", "cssNametd": "tduno" });
                                setGrap({ "textocelda": pintaGrafica(GrafOrder, Graf), "idDiv": getPropiedadesBtnGrafica(Graf, seg[yy].id, "graphDiv_"), "cssNameDiv": "graphDiv" });
                                setRows({ "cols": body, "cssName": "" });
                                /////////escribe espacio para tabla hija
                                setCols2({ "id": "expanddiv_" + seg[yy].id, "textocelda": " ", "colspan": 2, "cssName": "tablahija" });
                                setRows({ "cols": body, "cssName": "" });
                            }

                            tbl += getTabla({ "rows": rows, "css": "trunodos" });
                            tblPadre.table = tbl;
                            return tblPadre.table;
                        }
                        this.pintaTablaPrincipal(tblFather(), c);
                    },
                    "principal2": function (m, c, p) {
                        console.log("principal2");
                        var selft = m;
                        var body = "";
                        var rows = "";
                        var tbl = "";

                        var ordernarLista = function (b, o, c) {
                            var orderArray = [];
                            for (var bbb = b.length; bbb--;) {
                                var busca = b[bbb];

                                for (var iii = o.length; iii--;) {

                                    if (o[iii][c] === busca) {
                                        orderArray.push(o[iii]);
                                        break;
                                    }
                                }

                            }
                            return orderArray;
                        }

                        var agrupaLista = function (b, o, c) {
                            var orderArray = [];
                            for (var bbb = b.length; bbb--;) {
                                var busca = b[bbb];

                                for (var iii = o.length; iii--;) {

                                    if (o[iii][c] === busca) {
                                        orderArray.push(o[iii]);
                                    }
                                }
                            }
                            return orderArray;
                        }

                        var setHeadersRowspan = function (obj) {
                            setCols(obj);
                            setRows({ "cols": body });
                        }

                        var getHeaders = function () {
                            var fechas = selft.model[0].tabla[0].headers;
                            return fechas.reverse();
                        }

                        var getSegmentos = function () {
                            var filasCeldas = selft.model.segmentos;
                            return filasCeldas.reverse();
                        }

                        var getPaisImg = function () {
                            return selft.model.pais;
                        }

                        var setGrap = function (oBody) {
                            body += selft.view[0].Tabla.Td().supplant(oBody);
                        }

                        var setRows2 = function (oBody) {
                            delCols();
                            return rs = selft.view[0].Tabla.Row().supplant(oBody);
                        }

                        var setRows = function (oBody) {
                            rows += selft.view[0].Tabla.Row().supplant(oBody);
                            delCols();
                        }

                        var setCols2 = function (oCol) {
                            body += selft.view[0].Tabla.Colspanexpand().supplant(oCol);
                        }

                        var setCols = function (oCol) {
                            body += (oCol.colspan)
                                ? selft.view[0].Tabla.Colspan().supplant(oCol)
                                : (oCol.rowspan) ? selft.view[0].Tabla.Rowspan().supplant(oCol) : selft.view[0].Tabla.Col().supplant(oCol);
                        }

                        var getTabla = function (oRows) {
                            delRows();
                            return selft.view[0].Tabla.Crea().supplant(oRows);
                        }
                        var delCols = function () { body = ""; }
                        var delRows = function () { rows = ""; }
                      
                        //funcion uqe sirve para saber si va desplegar detalle o no
                        var getPropiedadesBtnGrafica = function (g, i, b) {
                            return ((g.length === 1) && (g[0].estatus === "0")) ? i : b + i;
                        }
                        //funcion que pinta las graficas
                        var pintaGrafica = function (a, aa) {
                            var acum = "";

                            if (a.length > 0) {
                                for (var iii = a.length; iii--;) {
                                    acum += selft.view[0].Tabla.GrapContentV2().supplant({ "cssDiv": a[iii]["cssName"], "avg": (Math.round((a[iii]["segavg"] * 100) * 100) / 100) - .5, "dato": Math.round((a[iii]["segavg"] * 100)) });
                                }
                            } else {
                                rest = 99;
                                height = "37";
                                restTxt = "";
                                acum = selft.view[0].Tabla.GrapContent().supplant({ "style": "background-color:" + aa[0].cssName + "; width:" + rest + "%; height:" + height + "px;", "cssName": aa[0].cssName, "datoContent": restTxt, "datoCss": "", "content": "" });
                            }
                            return selft.view[0].Tabla.GrapContentV2Cont().supplant({ "id": "graphCont", "grap": acum });
                        }

                        //encabezados
                        var tblFather = function () {

                            var selfModel = selfGlobal.model;
                            var orderListPaises = ["1", "2", "3", "4", "6", "5"];
                            var seg = getSegmentos();
                            var PaisesOrder = ordernarLista(orderListPaises, seg, 'idPais')
                            var orderListSegmentos = ["8", "7", "6", "5", "4", "3", "2", "1"];
                            var PaisesSegmentos = agrupaLista(orderListSegmentos, seg, 'id')
                            PaisesSegmentos.reverse();
                            var colspan = "";


                            setCols({ "id": "", "textocelda": "Segmento/Pais", "colspan": colspan, "cssName": "btnTitulo1", "cssSpan": "", "cssNametd": "tduno" });
                            for (var i = PaisesOrder.length; i--;) {
                                body += setColsBanderas({ "id": "pais_" + PaisesOrder[i].idPais, "texto": PaisesOrder[i].paisIso, "bandera": PaisesOrder[i].paisBandera, "colspan": colspan, "cssName": "btnTituloGraph3", "cssSpan": "" });
                            }
                            setRows({ "cols": body, "cssName": "" });

                            var contador = 0;
                            for (var i = PaisesSegmentos.length; i--;) {
                                var Graf = PaisesSegmentos[i].graficas;
                                var orderListGraf = ["3", "4", "8", "7", "6", "5"];
                                var GrafOrder = ordernarLista(orderListGraf, Graf, 'estatus')
                                var fila2 = i % 6
                                var fila1 = contador % 6

                                if (fila1 === 0)
                                    setCols({ "id": "", "textocelda": PaisesSegmentos[i].nombre, "colspan": colspan, "cssName": "btnGraf", "cssSpan": "", "cssNametd": "tduno" });

                                setGrap({ "textocelda": pintaGrafica(GrafOrder, Graf), "idDiv": "", "cssNameDiv": "graphDiv3" });

                                if (fila2 === 0)
                                    setRows({ "cols": body, "cssName": "" });

                                contador++;
                            }
                            tbl += getTabla({ "rows": rows, "css": "trunodosEspecial" });
                            tblPadre.table = tbl;
                            return tblPadre.table;
                        }
                        this.pintaTablaPrincipal(tblFather(), c);
                    },
                    "principalSub": function (mm, c, p) {
                        console.log("principal");
                        var selft = selfGlobal;
                        var body = "";
                        var rows = "";
                        var tbl = "";

                        var ordernarLista = function (b, o, c) {
                            var orderArray = [];
                            for (var bbb = b.length; bbb--;) {
                                var busca = b[bbb];
                                for (var iii = o.length; iii--;) {
                                    if (o[iii][c] === busca) {
                                        orderArray.push(o[iii]);
                                        break;
                                    }
                                }
                            }
                            return orderArray;
                        }
                        var agrupaLista = function (b, o, c) {
                            var orderArray = [];
                            for (var bbb = b.length; bbb--;) {
                                var busca = b[bbb];
                                for (var iii = o.length; iii--;) {
                                    if (o[iii][c] === busca) {
                                        orderArray.push(o[iii]);
                                    }
                                }
                            }
                            return orderArray;
                        }

                        var setHeadersRowspan = function (obj) {
                            setCols(obj);
                            setRows({ "cols": body });
                        }

                        var getHeaders = function () {
                            var fechas = selft.model[0].tabla[0].headers;
                            return fechas.reverse();
                        }

                        var getSegmentos = function (m) {
                            var selft = m;
                            var filasCeldas = selft.model.segmentos;
                            return filasCeldas.reverse();
                        }

                        var getPaisImg = function () {
                            return selft.model.pais;
                        }

                        var setGrap = function (oBody) {
                            body += selft.view[0].Tabla.Td().supplant(oBody);
                        }

                        var setRows2 = function (oBody) {
                            delCols();
                            return rs = selft.view[0].Tabla.Row().supplant(oBody);
                        }

                        var setRows = function (oBody) {
                            rows += selft.view[0].Tabla.Row().supplant(oBody);
                            delCols();
                        }

                        var setCols2 = function (oCol) {
                            body += selft.view[0].Tabla.Colspanexpand().supplant(oCol);
                        }

                        var setCols = function (oCol) {
                            body += (oCol.colspan)
                                ? selft.view[0].Tabla.Colspan().supplant(oCol)
                                : (oCol.rowspan) ? selft.view[0].Tabla.Rowspan().supplant(oCol) : selft.view[0].Tabla.Col().supplant(oCol);
                        }

                        var getTabla = function (oRows) {
                            delRows();
                            return selft.view[0].Tabla.Crea().supplant(oRows);

                        }
                        var delCols = function () { body = ""; }
                        var delRows = function () { rows = ""; }

                        //funcion uqe sirve para saber si va desplegar detalle o no
                        var getPropiedadesBtnGrafica = function (g, i, b) {
                            return ((g.length === 1) && (g[0].estatus === "0")) ? i : b + i;
                        }
                        //funcion que pinta las graficas
                        var pintaGrafica = function (a, aa) {
                            var acum = "";

                            if (a.length > 0) {
                                for (var iii = a.length; iii--;) {
                                    acum += selft.view[0].Tabla.GrapContentV2().supplant({ "cssDiv": a[iii]["cssName"], "avg": (Math.round((a[iii]["segavg"] * 100) * 100) / 100) - .5, "dato": Math.round((a[iii]["segavg"] * 100)) });
                                }
                            } else {
                                rest = 99;
                                height = "37";
                                restTxt = "";
                                acum = selft.view[0].Tabla.GrapContent().supplant({ "style": "background-color:" + aa[0].cssName + "; width:" + rest + "%; height:" + height + "px;", "cssName": aa[0].cssName, "datoContent": restTxt, "datoCss": "", "content": "" });
                            }
                            return selft.view[0].Tabla.GrapContentV2Cont().supplant({ "id": "graphCont", "grap": acum });
                        }

                        //encabezados
                        var tblFather = function () {
                            var selfModel = mm;
                            var colspan = "";
                            setCols({ "id": "", "textocelda": "Segmento/Pais", "colspan": colspan, "cssName": "btnTitulo1", "cssSpan": "", "cssNametd": "tduno" });
                            body += setColsBanderas({ "id": "", "texto": selfModel[0]["paisIso"], "bandera": selfModel[0]["paisBandera"], "colspan": colspan, "cssName": "btnTituloGraph", "cssSpan": "" });

                            setRows({ "cols": body, "cssName": "" });
                            ///escribe segmentos y grafcas
                            var seg = selfModel;
                            for (var yy = seg.length; yy--;) {
                                var Graf = seg[yy].graficas;
                                var orderListGraf = ["3", "4", "8", "7", "6", "5"];
                                var GrafOrder = ordernarLista(orderListGraf, Graf, 'estatus')
                                ////////escribe grafica y su fila
                                setCols({ "id": getPropiedadesBtnGrafica(Graf, seg[yy].id, "btnGraf_"), "textocelda": seg[yy].nombre, "colspan": colspan, "cssName": "btnGraf", "cssSpan": "", "cssNametd": "tduno" });
                                setGrap({ "textocelda": pintaGrafica(GrafOrder, Graf), "idDiv": getPropiedadesBtnGrafica(Graf, seg[yy].id, "graphDiv_"), "cssNameDiv": "graphDiv" });
                                //setCols({ "id": "", "textocelda": " ", "colspan": colspan, "cssName": "", "cssSpan": "" });
                                setRows({ "cols": body, "cssName": "" });
                                /////////escribe espacio para tabla hija
                                setCols2({ "id": "expanddiv_" + seg[yy].id, "textocelda": " ", "colspan": 2, "cssName": "tablahija" });
                                setRows({ "cols": body, "cssName": "" });
                            }
                            tbl += getTabla({ "rows": rows, "css": "trunodos" });
                            tblPadre.table = tbl;
                            return tblPadre.table;
                        }
                        //var btn = "<input class='classButton' type='button' style='float: left; margin-left: 6px;' value='Regresar'><br/><br/>";
                        //var btn = "";
                        //this.pintaTablaPrincipal(btn + tblFather(), c);
                        $('#btnRegresar').css('visibility', 'collapse');
                        this.pintaTablaPrincipal(tblFather(), c);
                    },
                }
            }
        }
    };
    return controladores;
}