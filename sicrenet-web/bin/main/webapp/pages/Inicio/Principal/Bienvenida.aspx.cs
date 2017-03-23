using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.IO;
using System.Configuration;
using Modelo;
using System.Data;
using System.Threading;

namespace SicreNet.Inicio.Principal
{
    public partial class Bienvenida : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                LabelUsuario.Text = Session["nombreuser"].ToString();
            }
            catch
            {
                LabelUsuario.Text = "Usuario NO registrado";
            }

            if (Request.Params["ArchivoPrueba"] != null)
            {
                HttpPostedFile archivo = recibirArchivo();
                CargaArchivo(archivo);
            }
            if (!IsPostBack)
                ImpersonateUsuario.accesoACompartida(@"\\" + ConfigurationManager.AppSettings["IPServidorProduccionN"].ToString() + @"\ArchivosSIC", Encripcion.Desencriptar(ConfigurationManager.AppSettings["UserServidorProduccionN"].ToString()), Encripcion.Desencriptar(ConfigurationManager.AppSettings["PswServidorProduccionN"].ToString()), Encripcion.Desencriptar(ConfigurationManager.AppSettings["DominioServidorProduccionN"].ToString()));
        }


        [WebMethod(Description = "Obtener Favoritos")]
        public static string MuestraPendientes()
        {
            string RespuestaJSON = "NO";
            try
            {
                int milliseconds = 2000;
                if (HttpContext.Current.Session["muestraPendientes"] == "Verdadero")
                {
                    RespuestaJSON = "OK";
                }
                Thread.Sleep(milliseconds);
            }
            catch (Exception ex)
            {
                RespuestaJSON = "ErrorCATCH: " + ex.Message;
            }
            return RespuestaJSON;
        }

        [WebMethod(Description = "Obtener Favoritos")]
        public static string obtenerFavoritos()
        {
            string RespuestaJSON = "";
            try
            {
                DataTable tblFavoritos = Modelo.LogSicreNetV2.obtenerFavoritos(HttpContext.Current.Session["NombreUsuario"] != null ? HttpContext.Current.Session["NombreUsuario"].ToString() : SiteMaster1.DevuelvePerfilUsuario().Split('|')[0]).Tables[0];
                if (tblFavoritos.Rows.Count > 0)
                    RespuestaJSON = SoporteJSON.DataTable_to_JSONArray(tblFavoritos) + "%%&&" + HttpContext.Current.Request.Url.Authority;
            }
            catch (Exception ex)
            {
                RespuestaJSON = "ErrorCATCH: " + ex.Message;
            }
            return RespuestaJSON;
        }

        public HttpPostedFile recibirArchivo()
        {
            if (Request.Files != null)
                if (Request.Files.Count > 0)
                {
                    HttpPostedFile file = Request.Files[0];
                    if (file != null && file.ContentLength > 0)
                        return file;
                }
            return null;
        }


        void CargaArchivo(HttpPostedFile archivo)
        {
            StreamReader lector = new StreamReader(archivo.InputStream, System.Text.Encoding.UTF7);
            //string[] columnas = Modelo.Cancelaciones.CarteraSuceptible.ProcesoCancelacion.DevuelveNombreColumnas(lector);
            //DataTable ColoDataTable = Modelo.Cancelaciones.CarteraSuceptible.ProcesoCancelacion.devuelveColumnasTablaPaso(1, "tblPsoCancelacionExtraordinaria");
            //if (columnas.Length == ColoDataTable.Rows.Count && columnas[0] == ColoDataTable.Rows[0][0].ToString() && columnas[1] == ColoDataTable.Rows[1][0].ToString()
            //    && columnas[2] == ColoDataTable.Rows[2][0].ToString() && columnas[3] == ColoDataTable.Rows[3][0].ToString())
            //{
            //    DataTable DatosArchivo = Modelo.Cancelaciones.CarteraSuceptible.Cancelaciones.TablaArchivosCancelacionExtraordinaria(lector);
            //    Session["TablaATransformar"] = "{\"StatusDeProcesoArchivo\":\"Correcto\"}";
            //    Session["MetodoAEjecutarse"] = "ProcesoAlnovaComercial";  
            //}
            //else
            //{
            //    Session["TablaATransformar"] = "{\"StatusDeProcesoArchivo\":\"Las Columnas No Coiciden\"}";
            //    Session["MetodoAEjecutarse"] = "ProcesoAlnovaComercial";
            //}

            string[] columnas = Modelo.Cancelaciones.CarteraSuceptible.ProcesoCancelacion.DevuelveNombreColumnas(lector);
            DataTable ColoDataTable = Modelo.Cancelaciones.CarteraSuceptible.ProcesoCancelacion.devuelveColumnasTablaPaso(3, "tblPasoCancelacionExcluir");
            if (columnas.Length == 4 && columnas[0] == ColoDataTable.Rows[1][0].ToString() && columnas[1] == ColoDataTable.Rows[2][0].ToString()
                && columnas[2] == ColoDataTable.Rows[3][0].ToString() && (columnas[3] == ColoDataTable.Rows[4][0].ToString() || columnas[3].ToUpper().Contains("PEDIDO")))
            {
                Modelo.Cancelaciones.CarteraSuceptible.NoSuceptible sucep = new Modelo.Cancelaciones.CarteraSuceptible.NoSuceptible();
                Boolean cargaCorrecta = sucep.CargaNoSuceptibles(lector, 201404, 0);
            }
            else
            {
                Session["TablaATransformar"] = "{\"StatusDeProcesoArchivo\":\"Las Columnas No Coiciden\"}";
                Session["MetodoAEjecutarse"] = "ProcesoAlnovaComercial";
                Response.Redirect("Respuestas.aspx");
            }
            Response.Redirect("Respuestas.aspx");

            //string respuesta = "";
            //try
            //{
            //    string Nombre = "";
            //    FileInfo FICSV = new FileInfo(archivo.FileName);
            //    Stream InfoStream = archivo.InputStream;
            //    string archivoValido = IsValidFile(FICSV);
            //    respuesta += "Bien";
            //    if (archivoValido.Split('%')[0] == "true")
            //    {
            //        Nombre = "../Upload/" + archivo.FileName;
            //        archivo.SaveAs(Server.MapPath(Nombre));
            //        string ipServer = ConfigurationManager.AppSettings["IPServidorProduccionN"].ToString();
            //        string[] ficherosCarpeta = Directory.GetFiles(@"\\" + ipServer + @"\ArchivosSIC");
            //        foreach (string ficheroActual in ficherosCarpeta)
            //            File.Delete(ficheroActual);
            //        string ruta = @"\\" + ipServer + @"\ArchivosSIC\" + archivo.FileName;
            //        System.IO.File.Move(Server.MapPath(Nombre), ruta);
            //    }
            //}
            //catch (Exception ex)
            //{
            //    respuesta += "$('#lbError').html('Error:" + ex.Message + "');";
            //}
            Response.Redirect("Respuestas.aspx");
        }

        private string IsValidFile(FileInfo FICSV)
        {
            string cad = "true%";
            //if (FICSV.FullName.Length <= 0)
            //    cad = "false%$('#lbError').html('El Archivo no fue Seleccionado.');";
            //if (FICSV.Name.Substring(FICSV.Name.Length - 3, 3) != "txt")
            //    cad = "false%$('#lbError').html('El Archivo seleccionado es Invalido.');";
            return cad;
        }
    }
}