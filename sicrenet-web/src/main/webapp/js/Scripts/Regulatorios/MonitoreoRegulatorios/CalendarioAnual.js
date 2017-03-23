//calendario anual

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
}
var Calendario = function () {
    var config = { "objFechas": "", "idPais": "", "idReporte": "", "usuario": "", calendario: '#full-year', "objfecha2": [], "timer": "", "sql": "TableroRegulatorios.aspx/GrabaFechas" };
    var htmlTags = function () {
        return '<div id="full-year" style="margin-right: 50px; margin-left: 50px;" ></div>';
    }
    var getFechas = function () {
        config.objFechas = $(config.calendario).multiDatesPicker('getDates').toString();
    }
    var confCal = {
        numberOfMonths: [3, 4],
        showWeek: false,
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        beforeShowDay: $.datepicker.noWeekends

    }
    return {
        "vista": function (p, r, u) {
            var self = this;
            var dom = document.getElementById('Calendario');
            dom.innerHTML += htmlTags();
            config.idPais = p;
            config.idReporte = r;
            config.usuario = u;
            self.datos("select");
            setTimeout(self.controlador, 300);
            self.btnSigAnt('.ui-datepicker-next');
            self.btnSigAnt('.ui-datepicker-prev');
        },
        "modelo": function () {
            return config;
        },
        "controlador": function () {
            var self = this;

            var today = new Date();
            var y = today.getFullYear();
            confCal.defaultDate = '1/1/' + y;

            if (config.objfecha2.length > 0) {
                confCal.addDates = config.objfecha2;
            }
            
            $(config.calendario).multiDatesPicker(confCal);

            $(".ui-datepicker-trigger").hide();
            $('#btnGrabar').click(function (e) {
                Calendario.datos("graba");
            });
        },
        "datos": function (opc) {
            var con = { "select": 1, "graba": 2, }
            var self = this;
            getFechas();
            peticionAjax(config.sql, "POST", { idPais: config.idPais, idReporte: config.idReporte, fechas: config.objFechas, usuario: config.usuario, opcion: con[opc] },
                function (dat) {
                    var datos = "";
                    if (dat.d != null && dat.d.indexOf("ERRORCATCH") == -1) {
                        datos = dat.d;
                        var r = datos.replaceAll("\"", "");
                        config.objfecha2 = (r === '') ? [] : r.split(',');
                    }
                }, null);
        },
        "btnSigAnt": function (btn) {
            var con = { ".ui-datepicker-prev": -12, ".ui-datepicker-next": 12, }
            $(document).on('click', btn, function () {
                var date = $(config.calendario).datepicker("getDate");
                if (!date)
                    date = new Date();
                var yy = date.getFullYear();
                var ff = new Date('1/1/' + yy);
                ff.setMonth(ff.getMonth() + con[btn]);
                $(config.calendario).datepicker("setDate", ff);
            });
        }
    }
}();