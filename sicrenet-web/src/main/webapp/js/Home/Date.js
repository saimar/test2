/**
 * Actuliaza la fecha en el template
 */
 setInterval('FechaYHora()', 20000);
         FechaYHora();
         $(function () {
             $(".VentanaFlotante").dialog({
                 height: 140,
                 modal: true,
                 autoOpen: false,
                 resizable: false
             });
         });
         
       function FechaYHora() {
       var mydate = new Date();
       var year = mydate.getFullYear()
       var day = mydate.getDay();
       var month = mydate.getMonth();
       var daym = mydate.getDate();
       if (daym < 10)
           daym = "0" + daym;

       var dayarray = new Array("Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado");
       var montharray = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");

       $('#divFecha').html(dayarray[day] + " " + daym + " de " + montharray[month] + " de " + year);
       var Hora = '';
       var M = '';

       if (mydate.getHours() > 12) {
           Hora = mydate.getHours() - 12;
           if (Hora < 10)
               Hora = "0" + Hora;
           M = 'p.m';
       }
       else {
           Hora = mydate.getHours();
           M = 'a.m';
       }
       var Minutos = '';
       if (mydate.getMinutes() < 10) {
           Minutos = '0' + mydate.getMinutes();
       }
       else {
           Minutos = mydate.getMinutes();
       }
       $('#divHora').html(Hora + ':' + Minutos + ' ' + M);
   }