using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;

namespace SicreNet.Inicio.Principal
{
    public partial class wfFechaHora : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static String obtenerHora()
        {
            Dictionary<String, String> dayDictionary = new Dictionary<string, string>() { { "Monday", "Lunes" }, { "Tuesday", "Martes" }, { "Wednesday", "Miercoles" }, { "Thursday", "Jueves" }, { "Friday", "Viernes" }, { "Saturday", "Sabado" }, { "Sunday", "Domingo" } };
            string[] montharray = new string[12] { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" };
            string dia = DateTime.Now.Day < 10 ? "0" + DateTime.Now.Day.ToString() : DateTime.Now.Day.ToString();
            string fecha = dayDictionary[DateTime.Now.DayOfWeek.ToString()] + " " + dia + " de " + montharray[DateTime.Now.Month - 1] + " de " + DateTime.Now.Year;
            string hora = "";
            string AMPM = "";
            if (DateTime.Now.Hour > 12)
            {
                hora = (DateTime.Now.Hour - 12).ToString();
                if (int.Parse(hora) < 10)
                    hora = "0" + hora;
                AMPM = "p.m";
            }
            else
            {
                hora = DateTime.Now.Hour.ToString();
                AMPM = "a.m";
            }
            string Minutos = "";
            if (DateTime.Now.Minute < 10)
                Minutos = "0" + DateTime.Now.Minute;
            else
                Minutos = DateTime.Now.Minute.ToString();
            hora = hora + ":" + Minutos + " " + AMPM;

            String respuesta = "{\"Hora\":\"" + hora + "\"}||{\"Fecha\":\"" + fecha + "\"}";
            return respuesta;
        }
    }
}