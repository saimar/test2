using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace SicreNet.Inicio.Principal
{
    public partial class Respuestas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.ContentEncoding = Encoding.UTF8;
            Response.ContentType = "text/plain";
            Response.Write(Session["TablaATransformar"]);
        }
    }
}