////http://www.epochconverter.com/
////http://unixtime.info/javascript.html
////http://foro.noticias3d.com/vbulletin/archive/index.php?t-429034.html

function cargaInicialListaIncidValid() {
    $("#lblMensajeHerramienta").hide();
    document.getElementById("divMainG").style.visibility = "visible";
    ///*
    Waiting(true, "Cargando Información...");
    peticionAjax('ListaIncidenciasValidaciones.aspx/GetListaIncidenciasValidaciones', "POST", null,
                        function (data) {
                            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                                if (data.d != "") {
                                    //*/
                                    //var data = '{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-100","FVCNombreIncidencia":"AFORO DEL CRÉDITO FUERA DE RANGO","FVCNegocio":"CREDIMAX, CENTRAL","FVCResponsable":"ALEJANDRA KARINA ROJAS GUZMAN:876737,RUBEN DIAZ CERON:706407,","FVCCorresponsable":"HIPOTECARIO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-103","FVCNombreIncidencia":"SEMANAS DE ATRASO MODELO INTERNO NEGATIVAS","FVCNegocio":"CENTRAL, CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-106","FVCNombreIncidencia":"FECHA INICIO RELACION DEL CLIENTE","FVCNegocio":"CENTRAL, CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-109","FVCNombreIncidencia":"FECHA INICIO RELACION DEL CLIENTE INCONGRUENTE","FVCNegocio":"CENTRAL, CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-112","FVCNombreIncidencia":"PORC_VIDA_HIST INCONGRUENTE","FVCNegocio":"CENTRAL, CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-115","FVCNombreIncidencia":"PRACUM_ETOACUM INCONGRUENTE","FVCNegocio":"CENTRAL, CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-118","FVCNombreIncidencia":"EXPOSICIÓN AL INCUMPLIMIENTO EN CERO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO, ESTANDAR","FVCComentario":"","FINumIncMaxAnio":"1609","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-12","FVCNombreIncidencia":"FECHA DE INICIO ANTIGUA","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"14205","FINumIncUltMes":"30","FINumIncUltCorte":"1373"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-122","FVCNombreIncidencia":"EXPOSICIÓN AL INCUMPLIMIENTO NEGATIVO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO, ESTANDAR","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-124","FVCNombreIncidencia":"PORCENTAJE DE PAGO INCONGRUENTE PARA CREDITOS CON ATRASO","FVCNegocio":"CREDIMAX, CENTRAL, MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"8","FINumIncUltMes":"8","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-16","FVCNombreIncidencia":"FECHA DE INICIO INCONGRUENTE","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-21","FVCNombreIncidencia":"FECHA DE INICIO MAYOR A LA FECHA DE VENCIMIENTO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-25","FVCNombreIncidencia":"PLAZO TOTAL DIFERENTE AL CALCULO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"500419","FINumIncUltMes":"77838","FINumIncUltCorte":"65775"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-29","FVCNombreIncidencia":"PLAZO TOTAL INCONGRUENTE","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"133637","FINumIncUltMes":"26895","FINumIncUltCorte":"15207"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-3","FVCNombreIncidencia":"FOLIO DEL CRÉDITO REPETIDO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-33","FVCNombreIncidencia":"IMPORTE ORIGINAL DEBE SER MAYOR O IGUAL AL SALDO CAPITAL ACTUAL","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"97","FINumIncUltMes":"9","FINumIncUltCorte":"9"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-38","FVCNombreIncidencia":"SALDO CAPITAL NEGATIVO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-43","FVCNombreIncidencia":"IMPORTE DE LOS INTERESES NEGATIVO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-48","FVCNombreIncidencia":"CAPITAL E INTÉRES DEL CRÉDITO NEGATIVO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-55","FVCNombreIncidencia":"SALDO DEL CRÉDITO EN CERO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-60","FVCNombreIncidencia":"SALDO DEL CRÉDITO NEGATIVO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-65","FVCNombreIncidencia":"CLASIFICACIÓN DEL CRÉDITO ERRONEA","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"338083","FINumIncUltMes":"333","FINumIncUltCorte":"591"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-70","FVCNombreIncidencia":"NÚMERO DE ATRASOS NEGATIVO","FVCNegocio":"CENTRAL, CREDIMAX, CREDITO AGIL, MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-73","FVCNombreIncidencia":"MAXIMO NÚMERO DE ATRASOS INCONGRUENTE","FVCNegocio":"CREDIMAX, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"3641","FINumIncUltMes":"0","FINumIncUltCorte":"399"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-74","FVCNombreIncidencia":"INDICADOR DE ATRASO INCONGRUENTE","FVCNegocio":"CENTRAL, CREDITO AGIL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-77","FVCNombreIncidencia":"PORCENTAJE DE PAGO NEGATIVO","FVCNegocio":"CREDIMAX, CENTRAL, MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-79","FVCNombreIncidencia":"CALCULO PORCENTAJE DE PAGO INCONGRUENTE","FVCNegocio":"CREDIMAX, CENTRAL, MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"757247","FINumIncUltMes":"170517","FINumIncUltCorte":"67518"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-80","FVCNombreIncidencia":"VOLUNTAD DE PAGO NEGATIVO","FVCNegocio":"CREDIMAX Y CENTRAL","FVCResponsable":"","FVCCorresponsable":"HIPOTECARIO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-81","FVCNombreIncidencia":"CALCULO VOLUNTAD DE PAGO INCONGRUENTE","FVCNegocio":"CREDIMAX Y CENTRAL","FVCResponsable":"","FVCCorresponsable":"HIPOTECARIO","FVCComentario":"","FINumIncMaxAnio":"1294","FINumIncUltMes":"0","FINumIncUltCorte":"19"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-84","FVCNombreIncidencia":"PLAZO REMANENTE NEGATIVO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"867467","FINumIncUltMes":"1926","FINumIncUltCorte":"902"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-85","FVCNombreIncidencia":"NUMERO DE VECES QUE EL ACREDITADO PAGA EL VALOR DEL BIEN INCONGRUENTE","FVCNegocio":"CREDIMAX, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-86","FVCNombreIncidencia":"INTEGRANTES DEL GRUPO INCONGRUENTES","FVCNegocio":"MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"1031","FINumIncUltMes":"137","FINumIncUltCorte":"828"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-87","FVCNombreIncidencia":"INTEGRANTES DEL GRUPO FUERA DE RANGO","FVCNegocio":"MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"2125855","FINumIncUltMes":"166469","FINumIncUltCorte":"163542"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-88","FVCNombreIncidencia":"INTEGRANTES DEL GRUPO DIFERNTE PARA ALGUN INTERANTE DEL GRUPO","FVCNegocio":"MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"31461","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-89","FVCNombreIncidencia":"INTEGRANTES DEL GRUPO DIFERENTE AL NUMERO DE ACREDITATOS ACTIVOS DEL GRUPO","FVCNegocio":"MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"1031","FINumIncUltMes":"137","FINumIncUltCorte":"828"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-90","FVCNombreIncidencia":"CICLOS DEL GRUPO INCONGRUENTES","FVCNegocio":"MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"6337","FINumIncUltMes":"139","FINumIncUltCorte":"831"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-91","FVCNombreIncidencia":"CICLOS DEL GRUPO DIFERENTE PARA ALGUN INTEGRANTE DEL GRUPO","FVCNegocio":"MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"79290","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-92","FVCNombreIncidencia":"GARANTIA LIQUIDA RETENIDA","FVCNegocio":"MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"265","FINumIncUltMes":"22","FINumIncUltCorte":"20"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-5-99","FVCNombreIncidencia":"VALOR DE LA VIVIENDA ACTUAL INCONGRUENTE","FVCNegocio":"CREDIMAX, CENTRAL","FVCResponsable":"","FVCCorresponsable":"HIPOTECARIO","FVCComentario":"","FINumIncMaxAnio":"28","FINumIncUltMes":"0","FINumIncUltCorte":"3"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-6-127","FVCNombreIncidencia":"FOLIO DEL CRÉDITO REACTIVADO","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"50","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-6-131","FVCNombreIncidencia":"FECHA DE INICIO DIFERENTE A LA REPORTADA EL PERIODO ANTERIOR","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-6-134","FVCNombreIncidencia":"IMPORTE ORIGINAL DIFERENTE AL PERIODO ANTERIOR","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-6-137","FVCNombreIncidencia":"SALDO CAPITAL ACTUAL MAYOR AL SALDO CAPITAL ANTERIOR","FVCNegocio":"CENTRAL, CREDIMAX, MICRONEGOCIO, CREDITO AGIL, EMPRESARIAL","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"2057540","FINumIncUltMes":"1919","FINumIncUltCorte":"128499"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-6-138","FVCNombreIncidencia":"INTEGRANTES DEL GRUPO DIFERENTE AL REPORTADO EL PERIODO ANTERIOR","FVCNegocio":"MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ALNOVA","FVCClave":"MEX-II-6-139","FVCNombreIncidencia":"CICLOS DEL GRUPO DIFERENTE AL REPORTADO EL PERIODO ANTERIOR","FVCNegocio":"MICRONEGOCIO","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"69110","FINumIncUltMes":"0","FINumIncUltCorte":"17532"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-102","FVCNombreIncidencia":"SEMANAS DE ATRASO MODELO INTERNO NEGATIVAS","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-105","FVCNombreIncidencia":"FECHA INICIO RELACION DEL CLIENTE","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"276","FINumIncUltMes":"38","FINumIncUltCorte":"4"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-108","FVCNombreIncidencia":"FECHA INICIO RELACION DEL CLIENTE INCONGRUENTE","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-11","FVCNombreIncidencia":"FECHA DE INICIO ANTIGUA","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"4","FINumIncUltMes":"2","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-111","FVCNombreIncidencia":"PORC_VIDA_HIST INCONGRUENTE","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-114","FVCNombreIncidencia":"PRACUM_ETOACUM INCONGRUENTE","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"136","FINumIncUltMes":"1","FINumIncUltCorte":"1"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-117","FVCNombreIncidencia":"EXPOSICIÓN AL INCUMPLIMIENTO EN CERO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-121","FVCNombreIncidencia":"EXPOSICIÓN AL INCUMPLIMIENTO NEGATIVO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"2","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-15","FVCNombreIncidencia":"FECHA DE INICIO INCONGRUENTE","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-2","FVCNombreIncidencia":"FOLIO DEL CRÉDITO REPETIDO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-20","FVCNombreIncidencia":"FECHA DE INICIO MAYOR A LA FECHA DE VENCIMIENTO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-24","FVCNombreIncidencia":"PLAZO TOTAL DIFERENTE AL CALCULO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"61982","FINumIncUltMes":"4922","FINumIncUltCorte":"4402"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-28","FVCNombreIncidencia":"PLAZO TOTAL INCONGRUENTE","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"61974","FINumIncUltMes":"4921","FINumIncUltCorte":"4401"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-32","FVCNombreIncidencia":"IMPORTE ORIGINAL DEBE SER MAYOR O IGUAL AL SALDO CAPITAL ACTUAL","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"2831884","FINumIncUltMes":"142786","FINumIncUltCorte":"123523"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-37","FVCNombreIncidencia":"SALDO CAPITAL NEGATIVO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"1","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-42","FVCNombreIncidencia":"IMPORTE DE LOS INTERESES NEGATIVO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-47","FVCNombreIncidencia":"CAPITAL E INTÉRES DEL CRÉDITO NEGATIVO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-51","FVCNombreIncidencia":"ANTICIPOS INCONGRUENTES","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-54","FVCNombreIncidencia":"SALDO DEL CRÉDITO EN CERO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-59","FVCNombreIncidencia":"SALDO DEL CRÉDITO NEGATIVO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-64","FVCNombreIncidencia":"CLASIFICACIÓN DEL CRÉDITO ERRONEA","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-69","FVCNombreIncidencia":"NÚMERO DE ATRASOS NEGATIVO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-7","FVCNombreIncidencia":"CREDITO ORIGEN ACTIVO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-72","FVCNombreIncidencia":"MAXIMO NÚMERO DE ATRASOS INCONGRUENTE","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"97949","FINumIncUltMes":"5475","FINumIncUltCorte":"4830"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-76","FVCNombreIncidencia":"PORCENTAJE DE PAGO NEGATIVO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-83","FVCNombreIncidencia":"SDOIMP NEGATIVO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-888","FVCNombreIncidencia":"123","FVCNegocio":"123","FVCResponsable":"123","FVCCorresponsable":"23","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-9","FVCNombreIncidencia":"CRÉDITO DESTINO DUPLICADO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-5-999","FVCNombreIncidencia":"123","FVCNegocio":"123","FVCResponsable":"123","FVCCorresponsable":"213","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-6-126","FVCNombreIncidencia":"FOLIO DEL CRÉDITO REACTIVADO","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"2750","FINumIncUltMes":"50","FINumIncUltCorte":"1532"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-6-130","FVCNombreIncidencia":"FECHA DE INICIO DIFERENTE A LA REPORTADA EL PERIODO ANTERIOR","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-6-133","FVCNombreIncidencia":"IMPORTE ORIGINAL DIFERENTE AL PERIODO ANTERIOR","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"ARRENDAMIENTO CREDIMAX","FVCClave":"MEX-II-6-136","FVCNombreIncidencia":"SALDO CAPITAL ACTUAL MAYOR AL SALDO CAPITAL ANTERIOR","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"4385722","FINumIncUltMes":"261488","FINumIncUltCorte":"243537"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-1","FVCNombreIncidencia":"FOLIO DEL CRÉDITO REPETIDO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-10","FVCNombreIncidencia":"FECHA DE INICIO ANTIGUA","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"4558","FINumIncUltMes":"365","FINumIncUltCorte":"355"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-101","FVCNombreIncidencia":"SEMANAS DE ATRASO MODELO INTERNO NEGATIVAS","FVCNegocio":"CENTRAL, CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-104","FVCNombreIncidencia":"FECHA INICIO RELACION DEL CLIENTE","FVCNegocio":"CENTRAL, CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"3185161","FINumIncUltMes":"241198","FINumIncUltCorte":"240748"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-107","FVCNombreIncidencia":"FECHA INICIO RELACION DEL CLIENTE INCONGRUENTE","FVCNegocio":"CENTRAL, CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"3185172","FINumIncUltMes":"241199","FINumIncUltCorte":"240749"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-110","FVCNombreIncidencia":"PORC_VIDA_HIST INCONGRUENTE","FVCNegocio":"CENTRAL, CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-113","FVCNombreIncidencia":"PRACUM_ETOACUM INCONGRUENTE","FVCNegocio":"CENTRAL, CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"9206","FINumIncUltMes":"376","FINumIncUltCorte":"261"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-116","FVCNombreIncidencia":"EXPOSICIÓN AL INCUMPLIMIENTO EN CERO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"172","FINumIncUltMes":"2","FINumIncUltCorte":"4"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-120","FVCNombreIncidencia":"EXPOSICIÓN AL INCUMPLIMIENTO NEGATIVO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-14","FVCNombreIncidencia":"FECHA DE INICIO INCONGRUENTE","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-19","FVCNombreIncidencia":"FECHA DE INICIO MAYOR A LA FECHA DE VENCIMIENTO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"4445","FINumIncUltMes":"676","FINumIncUltCorte":"659"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-23","FVCNombreIncidencia":"PLAZO TOTAL DIFERENTE AL CALCULO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"14615660","FINumIncUltMes":"1169441","FINumIncUltCorte":"1159759"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-27","FVCNombreIncidencia":"PLAZO TOTAL INCONGRUENTE","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"5597046","FINumIncUltMes":"550416","FINumIncUltCorte":"412684"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-31","FVCNombreIncidencia":"IMPORTE ORIGINAL DEBE SER MAYOR O IGUAL AL SALDO CAPITAL ACTUAL","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"30333","FINumIncUltMes":"1453","FINumIncUltCorte":"1234"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-36","FVCNombreIncidencia":"SALDO CAPITAL NEGATIVO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-41","FVCNombreIncidencia":"IMPORTE DE LOS INTERESES NEGATIVO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"10542","FINumIncUltMes":"80","FINumIncUltCorte":"101"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-46","FVCNombreIncidencia":"CAPITAL E INTÉRES DEL CRÉDITO NEGATIVO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"3056","FINumIncUltMes":"11","FINumIncUltCorte":"14"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-53","FVCNombreIncidencia":"SALDO DEL CRÉDITO EN CERO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"21","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-58","FVCNombreIncidencia":"SALDO DEL CRÉDITO NEGATIVO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"3056","FINumIncUltMes":"11","FINumIncUltCorte":"14"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-6","FVCNombreIncidencia":"CREDITO ORIGEN ACTIVO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-63","FVCNombreIncidencia":"CLASIFICACIÓN DEL CRÉDITO ERRONEA","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-68","FVCNombreIncidencia":"NÚMERO DE ATRASOS NEGATIVO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-71","FVCNombreIncidencia":"MAXIMO NÚMERO DE ATRASOS INCONGRUENTE","FVCNegocio":"CREDIMAX","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"3929454","FINumIncUltMes":"299777","FINumIncUltCorte":"314566"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-75","FVCNombreIncidencia":"PORCENTAJE DE PAGO NEGATIVO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-8","FVCNombreIncidencia":"CRÉDITO DESTINO DUPLICADO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"MODELO INTERNO","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-5-82","FVCNombreIncidencia":"SDOIMP NEGATIVO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-6-125","FVCNombreIncidencia":"FOLIO DEL CRÉDITO REACTIVADO","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"334490","FINumIncUltMes":"6939","FINumIncUltCorte":"239917"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-6-129","FVCNombreIncidencia":"FECHA DE INICIO DIFERENTE A LA REPORTADA EL PERIODO ANTERIOR","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"1396","FINumIncUltMes":"103","FINumIncUltCorte":"106"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-6-132","FVCNombreIncidencia":"IMPORTE ORIGINAL DIFERENTE AL PERIODO ANTERIOR","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"1792","FINumIncUltMes":"132","FINumIncUltCorte":"164"}||{"FVCSistema":"CREDIMAX","FVCClave":"MEX-II-6-135","FVCNombreIncidencia":"SALDO CAPITAL ACTUAL MAYOR AL SALDO CAPITAL ANTERIOR","FVCNegocio":"CREDIMAX, PRESTA PRENDA","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"172539842","FINumIncUltMes":"17366925","FINumIncUltCorte":"17220722"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-119","FVCNombreIncidencia":"EXPOSICIÓN AL INCUMPLIMIENTO EN CERO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"1630","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-123","FVCNombreIncidencia":"EXPOSICIÓN AL INCUMPLIMIENTO NEGATIVO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-18","FVCNombreIncidencia":"FECHA DE INICIO INCONGRUENTE","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-35","FVCNombreIncidencia":"IMPORTE ORIGINAL DEBE SER MAYOR O IGUAL AL SALDO CAPITAL ACTUAL","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"50","FINumIncUltMes":"3","FINumIncUltCorte":"4"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-40","FVCNombreIncidencia":"SALDO CAPITAL NEGATIVO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-45","FVCNombreIncidencia":"IMPORTE DE LOS INTERESES NEGATIVO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-5","FVCNombreIncidencia":"FOLIO DEL CRÉDITO REPETIDO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-50","FVCNombreIncidencia":"CAPITAL E INTÉRES DEL CRÉDITO NEGATIVO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-57","FVCNombreIncidencia":"SALDO DEL CRÉDITO EN CERO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"1630","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-62","FVCNombreIncidencia":"SALDO DEL CRÉDITO NEGATIVO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-67","FVCNombreIncidencia":"CLASIFICACIÓN DEL CRÉDITO ERRONEA","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-78","FVCNombreIncidencia":"PORCENTAJE DE PAGO NEGATIVO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-93","FVCNombreIncidencia":"NÚMERO DE IMPAGOS CONSECUTIVOS NEGATIVO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-94","FVCNombreIncidencia":"NÚMERO DE IMPAGOS CONSECUTIVOS INCONGRUENTE","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-95","FVCNombreIncidencia":"NÚMERO DE IMPAGOS OBSERVADOS EN LOS ULTIMOS 6 MESES NEGATIVO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"3163","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-96","FVCNombreIncidencia":"NÚMERO DE IMPAGOS OBSERVADOS EN LOS ULTIMOS 6 MESES INCONGRUENTE","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-97","FVCNombreIncidencia":"ANTIGÜEDAD DEL CRÉDITO INCONGRUENTE","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-5-98","FVCNombreIncidencia":"PORCENTAJE DE USO INCONGRUENTE","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"METODOLOGIA GENERAL, CONSUMO TDC","FVCComentario":"","FINumIncMaxAnio":"1","FINumIncUltMes":"1","FINumIncUltCorte":"0"}||{"FVCSistema":"MEDIOS DE PAGO","FVCClave":"MEX-II-6-128","FVCNombreIncidencia":"FOLIO DEL CRÉDITO REACTIVADO","FVCNegocio":"EMPRESARIAL, CENTRAL","FVCResponsable":"","FVCCorresponsable":"","FVCComentario":"","FINumIncMaxAnio":"0","FINumIncUltMes":"0","FINumIncUltCorte":"0"}';
                                    var JSON = obtenerArregloDeJSON(data.d, false);
                                    $("#divTblCatIncidenciasValidaciones").html(creaTblTablaIncidenciasValid(JSON, "Principal"));
                                    $("#tblIncidenciasValidacionesPrincipal").tablesorter();
                                    ///*
                                }
                                else MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                            }
                            else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                            Waiting(false, "Cargando Información...");
                        }, null);
    //*/
}

function creaTblTablaIncidenciasValid(listaDeJSON, idTabla) {
    var cad = '<center><table id="tblIncidenciasValidaciones' + idTabla + '" style="width:98%" class="tablesorter">';
    cad += '<thead>';
    cad += '<tr valign="top">';
    cad += "<th rowspan='2'>SISTEMA</th>";
    cad += "<th rowspan='2'>CLAVE</th>";
    cad += "<th rowspan='2'>NOMBRE INCIDENCIA</th>";
    cad += "<th rowspan='2'>NEGOCIO</th>";
    cad += "<th rowspan='2'>RESPONSABLE</th>";
    cad += "<th rowspan='2'>CORESPONSABLE</th>";
    cad += "<th rowspan='2' colspan='2'>ÚLTIMO COMENTARIO</th>";
    cad += "<th rowspan='1' colspan='3'>INCIDENCIAS</th>";
    cad += "<th rowspan='2'>HISTOGRAMA</th>";
    cad += '</tr>';
    cad += '<tr>';
    cad += '<th rowspan="1" colspan="1">MAXIMO EN UN AÑO</th>';
    cad += '<th rowspan="1" colspan="1">ÚLTIMO MES</th>';
    cad += '<th rowspan="1" colspan="1">ÚLTIMO CORTE</th>';
    cad += '</tr>';
    cad += '</thead>';
    cad += '<tbody>';
    for (var filas = 0; filas < listaDeJSON.length; filas++) {
        cad += ((filas % 2 == 0) ? '<tr class="row" ' : '<tr class="alternateRow" ') + ">";
        var json = listaDeJSON[filas];
        for (var element in json) {
            if (element != 'FINoComentario' && element != 'FIIdSistema') {
                if (element == "FVCNombreIncidencia") {
                    cad += '<td style="text-decoration:underline;color:blue;cursor:pointer;"  title="Clic para Ver Cédula" onclick="verCedulaCalidadValidaciones(\'' + listaDeJSON[filas].FIIdSistema + '\',\'' + listaDeJSON[filas]["FVCClave"] + '\',\'' + listaDeJSON[filas]["FVCSistema"] + '\',\'' + listaDeJSON[filas]["FVCNombreIncidencia"] + '\',false,false);" >';
                    cad += json[element];
                    cad += '</td>';
                }
                else if (element == "FVCComentario") {
                    cad += '<td colspan="1" style="text-align:left;width: 12%;">' + json[element] + '</td>';
                    cad += '<td colspan="1" style="width:3%; text-align:center"  onclick="editComentario(\'' + listaDeJSON[filas].FIIdSistema + '\',\'' + listaDeJSON[filas].FVCClave + '\',\'' + listaDeJSON[filas].FVCNombreIncidencia + '\');">';
                    cad += '<div id="imgConCom_' + listaDeJSON[filas].FVCClave + '" style="display:' + (parseInt(listaDeJSON[filas].FINoComentario) > 0 ? "inline" : "none") + '"><img src="../../Images/Portafolio/Proyectos/ConComentario.png" style="width:15px;height:13px;"  class="imgCrecer" Title="Agregar/Ver Comentario(s)"/><span id="spNumcom_' + listaDeJSON[filas].FVCClave + '" style="font-weight: bold;">' + listaDeJSON[filas].FINoComentario + '</span></div>';
                    cad += '<img id="imgSinCom_' + listaDeJSON[filas].FVCClave + '" src="../../Images/Grales/commentAdd.png" style="width:15px;height:13px;display:' + (parseInt(listaDeJSON[filas].FINoComentario) == 0 || listaDeJSON[filas].FINoComentario == "" ? "inline" : "none") + '"  class="imgCrecer" Title="Agregar Comentario"/></td>';
                    cad += '</td>';
                }
                else {
                    cad += '<td style="' + ((element == "FINumIncMaxAnio" || element == "FINumIncUltMes" || element == "FINumIncUltCorte") ? 'text-align:right;' : 'text-align:left;') + '" >';
                    cad += (element == "FINumIncMaxAnio" || element == "FINumIncUltMes" || element == "FINumIncUltCorte") ? DevuelveCantidadSeparadaPorComas(json[element]) : json[element];
                    cad += '</td>';
                }
            }
        }
        cad += '<td style="text-decoration:underline;color:blue;cursor:pointer;" onclick="VerHistograma_Click(\'' + listaDeJSON[filas].FVCClave + '\',\'' + listaDeJSON[filas].FVCSistema + '\',\'' + listaDeJSON[filas]["FVCNombreIncidencia"] + '\');"> Ver Histograma</td>';
        cad += '</tr>';
    }
    cad += '</tbody>';
    cad += '</table>';
    cad += '</center>';
    return cad;
}

function btnRegresar_Click() {
    $("#divHistograma").slideUp("slide");
    $("#divTblCatIncidenciasValidaciones").slideDown("slide");
}

function VerHistograma_Click(clave, sistema, nombreIncidencias) {
    $("#container").html("");
    $("#divTblCatIncidenciasValidaciones").slideUp("slide");
    $("#divHistograma").slideDown("slide");

    ///*
    Waiting(true, "Cargando Información...");
    peticionAjax('ListaIncidenciasValidaciones.aspx/GetListaIncidenciasValHistograma', "POST", { clave: clave, sistema: sistema },
                        function (data) {
                            if (data.d != null && data.d.indexOf("ERRORCATCH") == -1) {
                                if (data.d != "") {
                                    //*/
                                    //var data = '{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-13","FVCFechaCorteReal":"30/03/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"687","FVCFechaCorte":"Mar 2014","FVCFechaCorteReal":"31/03/2014 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-14","FVCFechaCorteReal":"06/04/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-15","FVCFechaCorteReal":"13/04/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-16","FVCFechaCorteReal":"20/04/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-17","FVCFechaCorteReal":"27/04/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"766","FVCFechaCorte":"Abr 2014","FVCFechaCorteReal":"30/04/2014 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-18","FVCFechaCorteReal":"04/05/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-19","FVCFechaCorteReal":"11/05/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-20","FVCFechaCorteReal":"18/05/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-21","FVCFechaCorteReal":"25/05/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"642","FVCFechaCorte":"May 2014","FVCFechaCorteReal":"31/05/2014 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-22","FVCFechaCorteReal":"01/06/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-23","FVCFechaCorteReal":"08/06/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-24","FVCFechaCorteReal":"15/06/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-25","FVCFechaCorteReal":"22/06/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-26","FVCFechaCorteReal":"29/06/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"589","FVCFechaCorte":"Jun 2014","FVCFechaCorteReal":"30/06/2014 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-27","FVCFechaCorteReal":"06/07/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-28","FVCFechaCorteReal":"13/07/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-29","FVCFechaCorteReal":"20/07/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-30","FVCFechaCorteReal":"27/07/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"1718","FVCFechaCorte":"Jul 2014","FVCFechaCorteReal":"31/07/2014 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-31","FVCFechaCorteReal":"03/08/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-32","FVCFechaCorteReal":"10/08/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-33","FVCFechaCorteReal":"17/08/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-34","FVCFechaCorteReal":"24/08/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-35","FVCFechaCorteReal":"31/08/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"4014","FVCFechaCorte":"Ago 2014","FVCFechaCorteReal":"31/08/2014 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-36","FVCFechaCorteReal":"07/09/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-37","FVCFechaCorteReal":"14/09/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-38","FVCFechaCorteReal":"21/09/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-39","FVCFechaCorteReal":"28/09/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"7728","FVCFechaCorte":"Sep 2014","FVCFechaCorteReal":"30/09/2014 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-40","FVCFechaCorteReal":"05/10/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-41","FVCFechaCorteReal":"12/10/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-42","FVCFechaCorteReal":"19/10/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-43","FVCFechaCorteReal":"26/10/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"13346","FVCFechaCorte":"Oct 2014","FVCFechaCorteReal":"31/10/2014 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-44","FVCFechaCorteReal":"02/11/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-45","FVCFechaCorteReal":"09/11/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-46","FVCFechaCorteReal":"16/11/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-47","FVCFechaCorteReal":"23/11/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-48","FVCFechaCorteReal":"30/11/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"171","FVCFechaCorte":"Nov 2014","FVCFechaCorteReal":"30/11/2014 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-49","FVCFechaCorteReal":"07/12/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-50","FVCFechaCorteReal":"14/12/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-51","FVCFechaCorteReal":"21/12/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2014-52","FVCFechaCorteReal":"28/12/2014 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"29116","FVCFechaCorte":"Dic 2014","FVCFechaCorteReal":"31/12/2014 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-1","FVCFechaCorteReal":"04/01/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-2","FVCFechaCorteReal":"11/01/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-3","FVCFechaCorteReal":"18/01/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-4","FVCFechaCorteReal":"25/01/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"32758","FVCFechaCorte":"Ene 2015","FVCFechaCorteReal":"31/01/2015 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-5","FVCFechaCorteReal":"01/02/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-6","FVCFechaCorteReal":"08/02/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-7","FVCFechaCorteReal":"15/02/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-8","FVCFechaCorteReal":"22/02/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"26895","FVCFechaCorte":"Feb 2015","FVCFechaCorteReal":"28/02/2015 12:00:00 a.m.","FIPeriodicidad":"1"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-9","FVCFechaCorteReal":"01/03/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-10","FVCFechaCorteReal":"08/03/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-11","FVCFechaCorteReal":"15/03/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-12","FVCFechaCorteReal":"22/03/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"0","FVCFechaCorte":"2015-13","FVCFechaCorteReal":"29/03/2015 12:00:00 a.m.","FIPeriodicidad":"2"}||{"FVCClave":"MEX-II-5-29","FINumInc":"15207","FVCFechaCorte":"Mar 2015","FVCFechaCorteReal":"31/03/2015 12:00:00 a.m.","FIPeriodicidad":"1"}'
                                    var JSON = obtenerArregloDeJSON(data.d, false);

                                    var arrayCategorias = new Array();
                                    var arraySeries = new Array();
                                    var arraySeriesSemanal = new Array();
                                    var arraySeriesMensual = new Array();

                                    var arraySeriesSemanalStock = new Array();
                                    var arraySeriesMensualStock = new Array();

                                    var arraySeriesBoundStock = new Array();

                                    var colors = [{ linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, stops: [[0, Highcharts.Color('rgb(247, 111, 111)').brighten(0.3).get('rgb')], [1, Highcharts.Color('rgb(220, 54, 54)').brighten(-0.3).get('rgb')]] },
                      { linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, stops: [[0, Highcharts.Color('rgb(78, 135, 240)').brighten(0.3).get('rgb')], [1, Highcharts.Color('rgb(164, 191, 240)').brighten(-0.3).get('rgb')]] }
                     ];

                                    var numSegmentosAnio = 0;
                                    var anioSet = "";
                                    var arregloPlotLines = new Array();

                                    var numeroMaxNumInc = 0;
                                    for (var i = 0; i < JSON.length; i++) {
                                        arrayCategorias.push(JSON[i].FVCFechaCorte);

                                        //------------- 
                                        var foo = new Date(replaceAll(JSON[i].FVCFechaCorteReal.split(' ')[0], '/', '-').replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
                                        var unixtime = parseInt(foo.getTime() / 1000);
                                        if (i < 2)
                                            arraySeriesBoundStock.push([parseInt(unixtime), parseInt(JSON[i].FINumInc)]);

                                        //------------------
                                        var anioTemp = "";
                                        var dataTemp = {};
                                        if (JSON[i].FIPeriodicidad == '2') {
                                            //JSON[i].FINumInc = 10000;
                                            dataTemp.y = parseInt(JSON[i].FINumInc)
                                            dataTemp.color = parseInt(JSON[i].FINumInc) > 0 ? colors[1] : "Transparent";
                                            arraySeriesSemanal.push(dataTemp);
                                            //arraySeriesSemanal.push(parseInt(JSON[i].FINumInc));
                                            dataTemp = {};
                                            dataTemp.y = 0;
                                            dataTemp.color = "Transparent";
                                            arraySeriesMensual.push(dataTemp);
                                            //arraySeriesMensual.push(0);
                                            anioTemp = JSON[i].FVCFechaCorte.split('-')[0];
                                            arraySeriesSemanalStock.push([parseInt(unixtime), parseInt(JSON[i].FINumInc)]);
                                        }
                                        else {
                                            dataTemp.y = parseInt(JSON[i].FINumInc)
                                            dataTemp.color = parseInt(JSON[i].FINumInc) > 0 ? colors[0] : "Transparent";
                                            dataTemp.w = parseInt(JSON[i].FINumInc) > 0 ? 10 : 0;
                                            arraySeriesMensual.push(dataTemp);
                                            //arraySeriesMensual.push(parseInt(JSON[i].FINumInc));
                                            dataTemp = {};
                                            dataTemp.y = 0;
                                            dataTemp.color = "Transparent";
                                            arraySeriesSemanal.push(dataTemp);
                                            //arraySeriesSemanal.push(0);
                                            anioTemp = JSON[i].FVCFechaCorte.split(' ')[1];
                                            arraySeriesMensualStock.push([parseInt(unixtime), parseInt(JSON[i].FINumInc)]);
                                        }
                                        if (parseInt(JSON[i].FINumInc) > numeroMaxNumInc)
                                            numeroMaxNumInc = parseInt(JSON[i].FINumInc);
                                        if (i == 0)
                                            arregloPlotLines.push({ value: -0.5, width: 1.5, color: 'silver', dashStyle: 'shortdash', label: { text: anioTemp, verticalAlign: 'left', textAlign: 'left', rotation: 0, x: 0} });

                                        if (numSegmentosAnio == 0) {
                                            anioSet = anioTemp;
                                            numSegmentosAnio++;
                                        }
                                        else {
                                            if (anioSet == anioTemp)
                                                numSegmentosAnio++;
                                            else {
                                                anioSet = anioTemp;
                                                arregloPlotLines.push({ value: numSegmentosAnio - 0.5, width: 1.5, color: 'silver', dashStyle: 'shortdash', label: { text: anioSet, verticalAlign: 'left', textAlign: 'left', rotation: 0, x: 0} });
                                                numSegmentosAnio = 0;
                                            }
                                        }
                                    }

                                    arraySeries.push({ name: "Semanal", data: arraySeriesSemanal, color: colors[1] });
                                    arraySeries.push({ name: "Mensual", data: arraySeriesMensual, color: colors[0] });


                                    var arregloDataStock = new Array();
                                    arregloDataStock.push({ name: "Semanal", type: "column", data: arraySeriesSemanalStock, pointPadding: 0.4, pointPlacement: -0.2
                                    });
                                    arregloDataStock.push({ name: "Mensual", type: "column", data: arraySeriesMensualStock, pointPadding: 0.4, pointPlacement: -0.2
                                    });

                                    creaGraficaHistograma(clave, nombreIncidencias, arrayCategorias, arraySeries, arregloPlotLines, numeroMaxNumInc)

                                    // Stock HighCharts 
                                    //creaGraficaHistograma2(arrayCategorias, arraySeries, arregloPlotLines, arregloDataStock);
                                    ///*
                                }
                                else MostrarMsj("Sin Datos.", "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                            }
                            else MostrarMsj(data.d, "Mensaje SicreNet", false, true, false, "", "Aceptar", "", 250, 130, null, null, null);
                            Waiting(false, "Cargando Información...");
                        }, null);
    //*/
}


function creaGraficaHistograma(clave, nombreIncidencias, categorias, series, arregloPlotLines, numMaxNumInc) {
    var ticketIntervalTemp = DevuelveCantidadSeparadaPorComas(numMaxNumInc.toString());

    var ticketInterval = '1';
    for (var i = ticketIntervalTemp.split(',').length; i > 1; i--)
        ticketInterval += '000';

    if (numMaxNumInc <= 300000)
        ticketInterval = 500;
    if (numMaxNumInc > 30000 && numMaxNumInc <= 99000)
        ticketInterval = 10000;
    if (numMaxNumInc > 99000 && numMaxNumInc <= 999000)
        ticketInterval = 100000;

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'column',
            margin: 75,
            //            options3d: {
            //                enabled: true,
            //                alpha: 0,
            //                beta: 1,
            //                depth: 100,
            //                viewDistance: 10
            //            },
            width: 1100,
            height: 300
        },
        credits: { enabled: false },
        title: {
            text: 'HSTOGRAMA ' + clave
        },
        subtitle: {
            text: nombreIncidencias
        },
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderWidth: 1
            },

            series: {
                pointWidth: 12,
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        if (this.y == 0)
                            this.point.pointWidth = 0;
                    },
                    style: {
                        fontSize: '8px',
                        fontFamily: 'Verdana, sans-serif',
                        color: "Transparent"
                    }
                }
            }
        },
        series: series,
        xAxis: {
            categories: categorias,
            gridLineWidth: 0,
            type: 'category',
            labels: {
                rotation: -90,
                style: {
                    fontSize: '9px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            plotLines: arregloPlotLines
        },
        yAxis: [{
            tickLength: numMaxNumInc + 1000, //500000000, /*Calcular en el inter deseado*/
            tickInterval: parseInt(ticketInterval), //1000000,
            tickPosition: 'inside',
            gridLineWidth: 0.5,
            tickWidth: 0,
            title: {
                text: ''
            },
            labels: {
                style: {
                    color: '#000000'
                    /*color: '#00B050'*/
                }
            }
        }],
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 0,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        }
    }
    , function (chart) {
        //        chart.series[0].data[0].graphic.attr({
        //            width: 10
        //        });
    }
    );
}

function creaGraficaHistograma2(categorias, series, arregloPlotLines, arregloDataSctock) {
    var chart = new Highcharts.StockChart({
        chart: {
            alignTicks: true,
            backgroundColor: 'White',

            ignoreHiddenSeries: true,
            renderTo: 'container2'
        },
        colors: ['blue', 'rgb(247, 111, 111)'],
        credits: {
            enabled: false
        },
        legend: {
            enabled: true,
            shadow: true
        },
        rangeSelector: {
            selected: 0
        },
        title: {
            text: ''
        },
        navigator: {
            height: 20,
            xAxis: {
                gridLineWidth: 1
            },
            series: {
                type: 'line'
            }
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    states: {
                        hover: { enabled: false }
                    }
                }
            }
,
            series: {
                showInLegend: true,
                stacking: 'normal'
                //                dataGrouping: {
                //                    enabled: true,
                //                    forced: true                  
                //                }
            }
        },
        xAxis: {
            ordinal: true,
            categories: categorias,
            gridLineWidth: 1,
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '9px',
                    fontFamily: 'Verdana, sans-serif'
                }
            },
            plotLines: arregloPlotLines
        },
        yAxis: [{ // Secondary yAxis
            endOnTick: true,
            alignTicks: true,
            gridLineWidth: 1,
            lineWidth: 1,
            tickWidth: 1,
            title: {
                text: ''
            },
            labels: {
                style: {
                    color: '#000000'
                    /*color: '#00B050'*/
                }
            }
        }],
        series: arregloDataSctock
    });

}

function getData1() {// Calculo Unix epoch (or Unix time or POSIX time or Unix timestamp) -- No se usa
    var unixtime = 1301090400;

    var newDate = new Date();
    newDate.setTime(unixtime * 1000);
    dateString = newDate.toUTCString();

    var foo = new Date('31/03/2015');
    var unixtime = parseInt(foo.getTime() / 1000);
    var unixtime_to_date = new Date(unixtime * 1000);

    return [{ "name": "Semanal", "type": "column", "data": [[1391203231000, 60.16], [1393622431000, 60.16], [1396300831000, 59.96]] },
    { "name": "Mensual", "type": "column", "data": [[1391203231000, 60.16], [1393622431000, 60.16], [1396300831000, 59.96]] },
    { "name": "bounds", "type": "column", "showInLegend": false, "data": [[1391203231000, 0], [1393622431000, 0]]}];
}



//////////////////////////////////////// COMENTARIOS

function editComentario(idSistema, clave, descValidacion) {
    event.cancelBubble = true;
    var cadena = '<div id="divBloqVtndvComentarios" style="width:98%;height:88%;background:Gray;filter: alpha(opacity=80); opacity: 0.9;position:absolute;text-align: center;display:none"> </div><div style="width:100%;height:90%;overflow:hidden;text-align:center;float:left;">';
    cadena += '<div id="dvDetalleEITbldvComentarios" style="width:100%;height:100%;margin-top: 0px;">  ';
    cadena += ' <table width="100%" ><tr><td><table width="100%"><tr><td><img src="../../Images/Grales/commentAdd.png" alt="Comentario" width="30px" height="30px" /></td>';
    cadena += '<td style=" font-size:10px;font-weight:bold; vertical-align:middle;" align="left">Ingrese el comentario :</td></tr></table></td></tr><tr><td ><textarea cols="30" rows="2" id="txtComenComentarioP" style="font: normal 9px Helvetica, Arial, sans-serif;resize: none;background-color:White;width:100%; text-align:left; border: x;height:150px" ></textarea></td></tr>';
    cadena += '<tr><td style="text-align: right;"><input type="button" id="tblGuardar" onclick="GuardarComentario(\'' + idSistema + '\',\'' + clave + '\');" value="Guardar" class="classButton"/></td></tr>';
    cadena += '<tr><td class="tdEnabled" style="text-align:left;cursor:pointer"><br /><div id="divHistorial" style="width:100%;text-align:left;margin-top: -20px;"></div></td></tr></table>';
    cadena += '</div></div>';
    $("#dvComentarios").empty();
    AgregarVtnFlotante("dvComentarios", "", "COMENTARIOS " + clave + " (" + descValidacion + ")", "", cadena, 300, 650, false, false, "", "", null);
    ObtenerComentarios(idSistema, clave);
}

function ObtenerComentarios(idSistema, clave) {
    var parametros = { idSistema: idSistema, clave: clave, comentario: "", opcion: 2 };
    peticionAjax("ListaIncidenciasValidaciones.aspx/controlComentariosIncidenciasVal", "POST", parametros, ObtieneDataComentario, ObtieneDataComentario);
}

function ObtieneDataComentario(data) {
    if (data.d.indexOf("ERRORCATCH") == -1) {
        if (data.d != "") {
            var JSON = new Array(); //= obtenerArregloDeJSON(data.d.replace(new RegExp('\n', 'g'), '').replace(new RegExp('\r', 'g'), ''), false);
            for (var i = 0; i < data.d.split("####|").length; i++) {
                var JSONTemp = new Array();
                for (var ii = 0; ii < data.d.split("####|")[i].split("%%%%|,").length; ii++) {
                    JSONTemp[data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[0]] = data.d.split("####|")[i].split("%%%%|,")[ii].split("$$$$|:")[1];
                }
                JSON.push(JSONTemp);
            }
            delete JSON[JSON.length - 1];
            //JSON = JSON.splice(JSON.length-1, 1); ;
            cadena = "<a style='font: normal 10px Helvetica, Arial, sans-serif;cursor: pointer;'><img src='../../Images/PanelDeControl/Expander/insert.jpg' id='insert2' style ='margin-bottom:-5px' onclick=\"toggleSlide('div2',this.id,'vtnH','dvComentarios',2);\" alt='expander' /></a> <span id='insert2' style='font: normal 10px Helvetica, Arial, sans-serif;cursor: pointer;' onclick=\"toggleSlide('div2',this.id,'vtnH','dvComentarios',2); \">Historial </span><div style='height:77px;overflow: auto;'> <div id='div2' style=display:none;'>";
            cadena += generarTablaDeRegistrosSinFoot(JSON, "left");
            cadena += "</div></div>";
            $('#divHistorial').html(cadena);
        }
        else $("#dvComentarios").animate({ height: "250px" });
    }
    else
        MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
}


function GuardarComentario(idSistema, clave) {
    if ($("#txtComenComentarioP").val() == "") {
        WaitingVtn("divBloqVtndvComentarios", true, false, "");
        MostrarMsj("Ingrese el comentario.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, function () {
            WaitingVtn("divBloqVtndvComentarios", false, false, "");
            $("#divVentanaMensajes").dialog("close");
        }, null);
        $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
            WaitingVtn("divBloqVtndvComentarios", false, false, "");
        });
        return;
    }
    WaitingVtn("divBloqVtndvComentarios", true, false, "");
    MostrarMsj("¿Desea continuar? ", "Mensaje", true, false, true, "Si", "", "No", 280, 120,
            function BtnSi() {
                $("#divVentanaMensajes").dialog("close");
                GuardaComentarioPaso2(idSistema, clave);
            }, null, function BtnNo() { $("#divVentanaMensajes").dialog("close"); WaitingVtn("divBloqVtndvComentarios", false, false, ""); });
    $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
        WaitingVtn("divBloqVtndvComentarios", false, false, "");
    });
}

function GuardaComentarioPaso2(idSistema, clave) {
    WaitingVtn("divBloqVtndvComentarios", true, true, "");
    document.getElementById("imgVtnLoading").style.marginTop = "8%";
    var parametros = { idSistema: idSistema, clave: clave, comentario: $("#txtComenComentarioP").val(), opcion: 1 };
    var cargar = false;
    peticionAjax("ListaIncidenciasValidaciones.aspx/controlComentariosIncidenciasVal", "POST", parametros, function (data) {
        WaitingVtn("divBloqVtndvComentarios", false, false, "");
        $("#dvComentarios").dialog("close");
        if (data.d.indexOf("ERRORCATCH") == -1) {
            MostrarMsj("Información almacenada exitosamente.", "Mensaje", false, true, false, "", "Aceptar", "", 250, 120, null, null, null);
            $("#divVentanaMensajes").on("dialogclose", function (event, ui) {
                if (!cargar) {
                    cargar = true;
                    cargaInicialListaIncidValid();
                }
            });
        }
        else
            MostrarMsj(data.d, "Mensaje", false, true, false, "", "Aceptar", "", 250, 135, null, null, null);
    }, null);
}
