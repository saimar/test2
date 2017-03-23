package com.mx.bancoazteca.pld.util;

public interface IConstantesPLD {

	//Contrato Interfaz Web Services alta de clientes en Lista Negra (OFAC)
    public static final int PAIS_ID                                             = 1;
    public static final int AGENTE_ID                                           = 1;
    public static final int SUBSIDIARIA_ID                                      = 1;
    public static final int SUCURSAL_ID                                         = 1252;
    public static final int NEGOCIO_ID                                          = 19;
    public static final String USUARIO_ID                                       = "USRPLD";
    public static final int STATUS_ID                                           = 1;
    public static final int STATUS_ID_DESBLOQUEO                                = 0;
    public static final int TIPO_LISTA_ID                                       = 99;
    public static final String COMENTARIO                                       = "BLOQUEO UIF";
    public static final String COMENTARIO_DESBLOQUEO                            = "DESBLOQUEO UIF";

    //public static final String URL_WS_LISTA_OFAC_DEX                            = "http://10.81.9.32:7777/WSListaOfacDEX/services/altaClienteOFAC?wsdl";  //URL de desarrollo     
    public static final String URL_WS_LISTA_OFAC_DEX                            = "http://10.81.9.203:8007/WSListaOFACDEXMundial/services/altaClienteOFAC?wsdl"; //URL de produccion
    public static final int TIME_OUT_WS_LISTA_OFAC_DEX                          = 7000;
    public static final String SOAP_ACTION_UT_WS_LISTA_OFAC_DEX                 = "http://tempuri.org/AltaClienteOFACRequest";
    public static final String ATRIBUTOS_RESPUESTA_WS_LISTA_OFAC_DEX[]          = {"ns1:uid", "ns1:codigoMensaje", "ns1:mensaje"};
    public static final String ATRIBUTOS_RESPUESTA_WS_LISTA_OFAC_DEX_MESSAGE_ERROR = "ns1:ErrorMessage";
    public static final String ATRIBUTOS_RESPUESTA_WS_LISTA_OFAC_DEX_ERROR[]    = {"ns1:uid", "ns1:codigo", "ns1:mensaje"};
    public static final int NUM_REGISTROS_MAXIMO_EXCEL = 15000;
	
	 ////------------------------ Layouts de cargas masivas
    public static final String LAYOUT_CARGA_TIPO_CAMBIO                         = "TipoDeCambio";
    public static final String LAYOUT_CARGA_LISTAS_NEGRAS                       = "ListasNegras";
    public static final String LAYOUT_CARGA_INTERDICCIONES_LN                   = "InterdiccionesLN";
    public static final String LAYOUT_CARGA_VALIDACION_REPORTES                 = "ValidacionReportes";
    public static final String LAYOUT_CARGA_PERIODO_COMITE                      = "CargasPeComite";     //Layouts nuevos para cargas masivas 
    public static final String LAYOUT_CARGA_FECHA_FESTIVAS                      = "CargasFhFestivas";   // periodo comite y fechas festivas
    public static final int CONST_TIPO_LISTAS_NEGRAS                            = 1;
    public static final int CONST_TIPO_LISTAS_INTERDICCIONES                    = 2;
    public static final String CONST_TIPO_FECHAS_FESTIVAS						="dbo.CM_CatDiasFestivos";
    public static final String CONST_TBLA_SEGV_CARGA_PAISES						="dbo.SEGV_CatLayoutCarga";
    public static final String CONST_TBLA_SEGD_CARGA_PAISES						="dbo.SEGV_CatLayoutCarga";
    public static final String LAYOUT_CARGA_SEGV_PAISES                         = "SEGV_Paises";
    public static final String LAYOUT_CARGA_SEGD_PAISES                         = "SEGD_Paises";
    
    
    
    /**
     * *******************************************[Web Service Listas Negras
     * Internas] *****************************************
     */
    public static final String CONST_WS_COLUMNA_ACCION                          = "Acción";
    public static final String CONST_WS_COLUMNA_NOMBRES                         = "Nombre(s)";
    public static final String CONST_WS_COLUMNA_APELLIDO_PATERNO                = "Apellido Paterno";
    public static final String CONST_WS_COLUMNA_APELLIDO_MATERNO                = "Apellido Materno";
    public static final String CONST_WS_COLUMNA_FECHA_NACIMIENTO                = "Fecha Nacimiento";
    public static final String CONST_WS_COLUMNA_NACIONALIDAD                    = "Nacionalidad";
    public static final String CONST_WS_VALOR_COLUMNA_ACCION                    = "BLO";
    
    
    //...................  CATALOGOS
    
    public static final String ID_CATALOGO_ORIGENES_LN = "12";
    public static final String ID_CATALOGO_ACCIONES_LN = "16";
    public static final String ID_CATALOGO_REMESADOR_LN = "17";
    
    //........................TABLE CONTAINER ACTIONS
    public static final char SIMPLE_PAGINATION='E';
	public static final char ASCENDING_ORDERING='A';
	public static final char DESCENDING_ORDERING='D';
	public static final char SEARCH_VALUE='S';
	public static final char LAST_PAGE='L';
	public static final char FIRTS_PAGE='E';
	public static final char NEXT_PAGE='N';
	public static final char PREVIOUS_PAGE='P';
	
	public static final char RELOAD_DATA='R';
	public static final String LAYOUT_CARGA_USUARIOS		=		 "";
    
}
