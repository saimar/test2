package com.mx.bancoazteca.pld.jdbc;

public interface ISentenciasSQL {

	/******************* CONSULTAS COMUNES ***************************/
	public static final String STP_TRUNCATE_TABLA                               = "paTruncate";
	//public static final String STP_CONSULTA_SEGV_CATALOGO_LAYOUT                     = "SEGV_ConsultaLayoutCargaMasiva";
	//public static final String STP_CONSULTA_SEGD_CATALOGO_LAYOUT                     = "SEGD_ConsultaLayoutCargaMasiva";
	

	/********************* MODULO ALERTAS MONITOREO ***********************/
	/* VIDA */
	
	

	/* DAÑOS */
	
	
	public static final String SEGD_OPERRELEVANTES = "SEGD_ConsultaOperacionesRelevantes";
	public static final String SEGD_OPERRELEVANTES_DET = "SEGD_ConsultaOperacionesRelevantesDetalle";
	public static final String STORED_SEGD_FRACCIONADAS = "SEGD_ConsultaFraccionadas";
	

	/******************** MODULO PARAMETROS *************************/
	public static final String STP_CONSULTA_PARAMETROS_VIDA = "SEGV_ConsultaParametros";
	public static final String STP_ACTUALIZA_PARAMETROS_VIDA = "SEGV_ModificaParametros";
	public static final String STP_CONSULTA_PARAMETROS_DANIOS = "SEGD_ConsultaParametros";
	public static final String STP_ACTUALIZA_PARAMETROS_DANIOS = "SEGD_ModificaParametros";
	public static final String STP_CONSULTA_PAISES_VIDA = "SEGV_ConsultaCargaMasivaPaises";
	public static final String STP_CONSULTA_PAISES_DANIOS = "SEGD_ConsultaCargaMasivaPaises";
	public static final String STP_CARGA_MASIVA_PAISES_VIDA = "SEGV_CargaMasivaPaises";
	public static final String STP_CARGA_MASIVA_PAISES_DANIOS = "SEGD_CargaMasivaPaises";
	
	
	/******************** MODULO ANALISIS *************************/
	/* VIDA */
	public static final String STP_SEGV_ANALISIS_GENERA                   = "SEGV_GuardaAnalisis";
	public static final String STP_SEGV_ANALISIS_OBSERVACIONES            = "SEGV_ConsultaObservacionesAnalisis";
	public static final String STP_SEGV_ANALISIS_REPORTES_ENVIADOS        = "SEGV_ConsultaReportesEnviados";
	public static final String STP_SEGV_ANALISIS_COINCIDENCIA_LISTA_NEGRA = "SEGV_ConsultaCoincidenciaLN";
	public static final String STP_SEGV_ANALISIS_COINCIDENCIA_PEPS        = "SEGV_ConsultaCoincidenciaPEPs";
	public static final String STP_SEGV_ANALISIS_ULTIMOS_10_PAGOS         = "SEGV_ConsultaUltimos10Pagos";
	/* DAÑOS */
	public static final String STP_SEGD_ANALISIS_GENERA                   = "SEGD_GuardaAnalisis";
	public static final String STP_SEGD_ANALISIS_OBSERVACIONES            = "SEGD_ConsultaObservacionesAnalisis";
	public static final String STP_SEGD_ANALISIS_REPORTES_ENVIADOS        = "SEGD_ConsultaReportesEnviados";
	public static final String STP_SEGD_ANALISIS_COINCIDENCIA_LISTA_NEGRA = "SEGD_ConsultaCoincidenciaLN";
	public static final String STP_SEGD_ANALISIS_COINCIDENCIA_PEPS        = "SEGD_ConsultaCoincidenciaPEPs";
	public static final String STP_SEGD_ANALISIS_ULTIMOS_10_PAGOS         = "SEGD_ConsultaUltimos10Pagos";
	
	/******************** MODULO REPORTES *************************/
	/* VIDA */
	public static final String STORED_SEGV_CONSULTA_REPORTADO="SEGV_ConsultaSiMovimientoReportado";
	public static final String STORED_SEGV_DATOS_REPORTE = "SEGV_ConsultaDatosParaReporte";
	public static final String STORED_SEGV_GENERA_REPORTE ="SEGV_GuardaMovimientoReporte";
	public static final String STORED_SEGV_GENERA_SELECCIONADOS = "SEGV_GeneraReporte";
	public static final String STORED_SEGV_DESCARTA_REPORTE = "SEGV_EliminaReporte";
	
	public static final String STORED_SEGV_MOV_REPORTADOS = "SEGV_ConsultaMovReportados";
	public static final String STORED_SEGV_REPORTES = "SEGV_ConsultaReportes";
	public static final String STORED_SEGV_REPORTES_DET = "SEGV_ConsultaReportesDetalle";
	public static final String STORED_SEGV_REP_HISTORIAL = "SEGV_ConsultaReportesHistorial";
	public static final String STORED_SEGV_REP_HISTORIAL_DET = "SEGV_ConsultaReportesHistorialDetalle";
	public static final String STORED_SEGV_DESCARGA_REPORTE = "SEGV_ConsultaReportesDescarga";
	public static final String STORED_SEGV_HISTORIAL_EXCEL = "SEGV_ReportesHistorialExcel";
	public static final String STORED_SEGV_CAT_TIPO_REPORTE = "SEGV_ConsultaCatTiposDeReporte";
	public static final String STORED_SEGV_CAT_TRIMESTRE = "SEGV_ConsultaCatTrimestres";
	public static final String STORED_SEGV_RESPALDA_REPORTE = "SEGV_RespaldaReporte";
	
	/* DAÑOS */
	public static final String STORED_SEGD_CONSULTA_REPORTADO="SEGD_ConsultaSiMovimientoReportado";
	public static final String STORED_SEGD_DATOS_REPORTE = "SEGD_ConsultaDatosParaReporte";
	public static final String STORED_SEGD_GENERA_REPORTE ="SEGD_GuardaMovimientoReporte";
	public static final String STORED_SEGD_GENERA_SELECCIONADOS = "SEGD_GeneraReporte";
	public static final String STORED_SEGD_DESCARTA_REPORTE = "SEGD_EliminaReporte";
	
	public static final String STORED_SEGD_MOV_REPORTADOS = "SEGD_ConsultaMovReportados";
	public static final String STORED_SEGD_REPORTES = "SEGD_ConsultaReportes";
	public static final String STORED_SEGD_REPORTES_DET = "SEGD_ConsultaReportesDetalle";
	public static final String STORED_SEGD_REP_HISTORIAL = "SEGD_ConsultaReportesHistorial";
	public static final String STORED_SEGD_REP_HISTORIAL_DET = "SEGD_ConsultaReportesHistorialDetalle";
	public static final String STORED_SEGD_DESCARGA_REPORTE = "SEGD_ConsultaReportesDescarga";
	public static final String STORED_SEGD_HISTORIAL_EXCEL = "SEGD_ReportesHistorialExcel";
	public static final String STORED_SEGD_CAT_TIPO_REPORTE = "SEGD_ConsultaCatTiposDeReporte";
	public static final String STORED_SEGD_CAT_TRIMESTRE = "SEGD_ConsultaCatTrimestres";
	public static final String STORED_SEGD_RESPALDA_REPORTE = "SEGD_RespaldaReporte";

	/******************** MODULO CENTRO DE MONITOREO *************************/
	public static final String STORED_SEGD_DASHBORAD = "SEGD_ConsultaPanelDashboard";
	public static final String STORED_SEGV_DASHBORAD = "SEGV_ConsultaPanelDashboard";
	

	public static final String STORED_CATALOGO_COLORES = "PLD_ConsultaCatColores";
	public static final String STORED_CONSULTA_GRAFICAS = "PLD_ConsultaGrafica";
	public static final String STORED_PLD_CONSULTACATALOGOSCM = "PLD_ConsultaCatalogosCM";
	public static final String STORED_CONSULTA_PROVEEDORES = "PLD_ConsultaProveedores";
	// STORED PROCEDURES DE PLANES DE REMEDIACION
	public static final String STORED_CONSULTA_PLANES_REMEDIACION = "PLD_ConsultaPlanRemediacion";
	// STORED PROCEDURES DE MONITOR ALERTAS
	public static final String CONSULTA_MONITOR_ALERTAS = "PLD_ConsultaMonitorAlertas";
	// STORED PROCEDURES DE ANALISIS
	public static final String STORED_CONSULTA_ANALISIS = "PLD_ConsultaCifrasControl";
	// STORED PROCEDURES DE CIFRAS CONTROL
	public static final String STORED_CONSULTA_CIFRAS_CONTROL = "PLD_ConsultaCifrasControl";
	// STORED PROCEDURES DE MATRIZ DE RIESGO
	public static final String STORED_CONSULTA_MATRIZ_RIESGO_LAM = "PLD_ConsultaMatrizRiesgoLAM";
	// STORED PROCEDURE CAPACITACION
	public static final String STORED_CONSULTA_CAPACITACION = "PLD_ConsultaCapacitacion";
	// STORED PROCEDURES DE PAISES IMAGENES
	public static final String STORED_CATALOGO_PAISES = "PLD_ConsultaCatPaises";
	// STORED PROCEDURES DE MATRIZ DE RIESGO
	public static final String STORED_CONSULTA_MATRIZ_RIESGO = "PLD_ConsultaMatrizRiesgo";
	// STORED PROCEDURES DE OPCIONES MAPAS
	public static final String STORED_OPCIONES_MAPAS = "PLD_ConsultaCatTipoMapas";
	// STORED PROCEDURE OBTENER DATOS DE PANEL
	public static final String PLD_CONSULTAPERSPECTIVAS = "PLD_ConsultaPerspectivas";
	// STORED PROCEDURE OBTENER DATOS DE LA TABLA DE COLORES
	public static final String PLD_CLASIFICACIONCATCOLORES = "PLD_ConsultaCatColores";
	public static final String PLD_COLORESAPLICACION = "PLD_ActualizaCatColoresAplicacion";
	
	public static final String PLD_CONSULTA_PRODUCTO_X_ID ="PLD_ConsultaNegocios";

}
