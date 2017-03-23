package com.baz.commons.util;

public class ConstantUtil {
	
	
public static final String FUENTEI = "FUENTE DE CARTERA";
public static final String FUENTEII = "INSUMOS DEL PROCESO";
public static final String FUENTEIII = "COMPLEMENTO SICRENET";
public static final String FUENTEIV = "PRECEDENTES";
public static final String FUENTEV = "CARTERA";
public static final String FUENTEVI = "POSTERIORES";
public static final String FUENTEVII = "CUBOS";
public static final String FUENTEVIII = "REPORTES REGULATORIOS";
public static final String FUENTEIX = "REPORTES INTERNOS";
public static final String ETAPA_I = "FACTORES";
public static final String ETAPA_II = "PROCESOS";
public static final String ETAPA_III = "REPORTES";
public static final String CABECERA_FUENTE = "EncabClasCarga1 ui-state-default";
public static final String CABECERA_FUENTE_AUX_ETAPAII = "EncabClasCargaAuxEtapaII ui-state-default";
public static final String CABECERA_PROCESOS = "EncabClasMet ui-state-default";
public static final String CABECERA_REPORTES = "EncabClasEtapaIII ui-state-default";
public static final String CABECERA_PANEL_FUENTE = "customPanelFuente ui-widget-header ui-widget-content";
public static final String CABECERA_PANEL_PROCESO = "customPanelProceso ui-widget-header ui-widget-content";
public static final String CABECERA_PANEL_REPORTES = "customPanelReportes ui-widget-header ui-widget-content";

public static final String ESTATUS_NO_APLICA = "EstatusBlanco ui-state-default";
public static final String COMPLEMENTO_ESTATUS_FUENTE = " ui-state-default faseFuente ui-widget-content, ui-fieldset, ui-fieldset ui-fieldset-legend";
public static final String COMPLEMENTO_ESTATUS_PROCESO = " ui-state-default faseProceso ui-widget-content ";
public static final String COMPLEMENTO_ESTATUS_REPORTES = " ui-state-default faseReportes ui-widget-content ";

public static final String  HEADERFASE = "color: #ffffff;"+
	    "text-decoration: none;"+
	    "font-family: Verdana, Geneva, sans-serif;"+
	    "font-size: 9px;"+
	    "text-shadow: 2px 1px 1px #000000;"+
	    "min-width: 200px;"+
	    "background: #8b8b8b;"+
	    "text-align: center;";

public static final String CONTENT_CARTERA = "	background: #89b5f7;  "+
	    "background: -moz-linear-gradient(left, #89b5f7 14%, #5b88cb 99%); " +
	    "background: -webkit-gradient(linear, left top, right top, color-stop(14%,#89b5f7), color-stop(99%,#5b88cb));  " +
	    "background: -webkit-linear-gradient(left, #89b5f7 14%,#5b88cb 99%); " +
	    "background: -o-linear-gradient(left, #89b5f7 14%,#5b88cb 99%);  " +
	    "background: -ms-linear-gradient(left, #89b5f7 14%,#5b88cb 99%); " +
	    "background: linear-gradient(to right, #89b5f7 14%,#5b88cb 99%); " +
	    "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#89b5f7', endColorstr='#5b88cb',GradientType=1 );  ";

public static final String ESTATUS_GRIS = "   border: #a0a0a0 solid 1px;  " +
    "border-radius: 5px;  " +
    "background: #dddddd;  " + 
    "background: -moz-linear-gradient(top, #dddddd 0%, #747474 100%);  " + 
    "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#dddddd), color-stop(100%,#747474));  " + 
    "background: -webkit-linear-gradient(top, #dddddd 0%,#747474 100%);   " +
    "background: -o-linear-gradient(top, #dddddd 0%,#747474 100%);   " +
    "background: -ms-linear-gradient(top, #dddddd 0%,#747474 100%);  " +
    "background: linear-gradient(to bottom, #dddddd 0%,#747474 100%);   " +
    "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#dddddd', endColorstr='#747474',GradientType=0 );  " ;

public static final String ESTATUS_AMARILLO = "  border: #a0a0a0 solid 1px;  " +
    "border-radius: 5px;  " +
    "background: #fdf638;   " +
    "background: -moz-linear-gradient(top, #fdf638 0%, #e1cc3d 100%);  " + 
    "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fdf638), color-stop(100%,#e1cc3d));  " + 
    "background: -webkit-linear-gradient(top, #fdf638 0%,#e1cc3d 100%);   " +
    "background: -o-linear-gradient(top, #fdf638 0%,#e1cc3d 100%);  " +
    "background: -ms-linear-gradient(top, #fdf638 0%,#e1cc3d 100%);  " +
    "background: linear-gradient(to bottom, #fdf638 0%,#e1cc3d 100%);  " +
    "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fdf638', endColorstr='#e1cc3d',GradientType=0 );  " + 
    "font-size: 5px;" +
    "text-align: center; " +
    "max-height: 8px;   " +
    "max-width: 20px;";
public static final String ESTATUS_ROJO = "    border: #a0a0a0 solid 1px;  " +
    "border-radius: 5px;  " +
    "background: #ffaeae;   " +
    "background: -moz-linear-gradient(top, #ffaeae 1%, #af2c2c 100%);  " + 
    "background: -webkit-gradient(linear, left top, left bottom, color-stop(1%,#ffaeae), color-stop(100%,#af2c2c));  " + 
    "background: -webkit-linear-gradient(top, #ffaeae 1%,#af2c2c 100%);  " +
    "background: -o-linear-gradient(top, #ffaeae 1%,#af2c2c 100%);   " +
    "background: -ms-linear-gradient(top, #ffaeae 1%,#af2c2c 100%);  " +
    "background: linear-gradient(to bottom, #ffaeae 1%,#af2c2c 100%);  " +
    "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffaeae', endColorstr='#af2c2c',GradientType=0 );  " + 
    "font-size: 5px;" +
    "text-align: center; " +
    "max-height: 8px;   " +
    "max-width: 20px;";
public static final String ESTATUS_NARANJA = "    border: #a0a0a0 solid 1px; " +
    "border-radius: 5px; " +
    "background: #ffb96b; " +
    "background: -moz-linear-gradient(top,  #ffb96b 0%, #ff8a00 100%); " + 
    "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ffb96b), color-stop(100%,#ff8a00)); " +
    "background: -webkit-linear-gradient(top,  #ffb96b 0%,#ff8a00 100%);  " +
    "background: -o-linear-gradient(top,  #ffb96b 0%,#ff8a00 100%);  " +
    "background: -ms-linear-gradient(top,  #ffb96b 0%,#ff8a00 100%); " +
    "background: linear-gradient(to bottom,  #ffb96b 0%,#ff8a00 100%); " +
    "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffb96b', endColorstr='#ff8a00',GradientType=0 ); " + 
    "font-size: 5px;" +
    "text-align: center; " +
    "max-height: 8px;   " +
    "max-width: 20px;";
public static final String ESTATUS_VERDE = "    border: #a0a0a0 solid 1px;  " +
    "border-radius: 5px;  " +
    "background: #63b211;  " +
    "background: -moz-linear-gradient(top, #63b211 1%, #30710a 99%);  " + 
    "background: -webkit-gradient(linear, left top, left bottom, color-stop(1%,#63b211), color-stop(99%,#30710a));  " + 
    "background: -webkit-linear-gradient(top, #63b211 1%,#30710a 99%);   " +
    "background: -o-linear-gradient(top, #63b211 1%,#30710a 99%);   " +
    "background: -ms-linear-gradient(top, #63b211 1%,#30710a 99%);   " +
    "background: linear-gradient(to bottom, #63b211 1%,#30710a 99%);  " +
    "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#63b211', endColorstr='#30710a',GradientType=0 );  " + 
    "font-size: 5px;" +
    "text-align: center; " +
    "max-height: 8px;   " +
    "max-width: 20px;";
public static final String ESTATUS_AZUL = "     background: #89b5f7;    " +
    "background: -moz-linear-gradient(left, #89b5f7 14%, #5b88cb 99%);   " +
    "background: -webkit-gradient(linear, left top, right top, color-stop(14%,#89b5f7), color-stop(99%,#5b88cb));    " +
    "background: -webkit-linear-gradient(left, #89b5f7 14%,#5b88cb 99%);    " +
    "background: -o-linear-gradient(left, #89b5f7 14%,#5b88cb 99%);    " +
    "background: -ms-linear-gradient(left, #89b5f7 14%,#5b88cb 99%);   " +
    "background: linear-gradient(to right, #89b5f7 14%,#5b88cb 99%);    " +
    "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#89b5f7', endColorstr='#5b88cb',GradientType=1 );"  ;
public static final String ESTATUS_MORADO = "    border: #a0a0a0 solid 1px;    " +
    "border-radius: 5px;    " +
    "background: #ae00ff;    " +
    "background: -moz-linear-gradient(top, #ae00ff 1%, #430a5b 100%);    " + 
    "background: -webkit-gradient(linear, left top, left bottom, color-stop(1%,#ae00ff), color-stop(100%,#430a5b));    " + 
    "background: -webkit-linear-gradient(top, #ae00ff 1%,#430a5b 100%);    " + 
    "background: -o-linear-gradient(top, #ae00ff 1%,#430a5b 100%);     " +
    "background: -ms-linear-gradient(top, #ae00ff 1%,#430a5b 100%);    " +
    "background: linear-gradient(to bottom, #ae00ff 1%,#430a5b 100%);    " +
    "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ae00ff', endColorstr='#430a5b',GradientType=0 );    " + 
    "font-size: 5px;" +
    "text-align: center; " +
    "max-height: 8px;   " +
    "max-width: 20px;";
public static final String ESTATUS_BLANCO = "    border: #a0a0a0 solid 1px;    " +
    "border-radius: 5px;    " +
    "background: #ffffff;    " +
    "background: -moz-linear-gradient(top, #ffffff 2%, #e1e1e1 100%);    " + 
    "background: -webkit-gradient(linear, left top, left bottom, color-stop(2%,#ffffff), color-stop(100%,#e1e1e1));    " +
    "background: -webkit-linear-gradient(top, #ffffff 2%,#e1e1e1 100%);     " +
    "background: -o-linear-gradient(top, #ffffff 2%,#e1e1e1 100%);     " +
    "background: -ms-linear-gradient(top, #ffffff 2%,#e1e1e1 100%);    " +
    "background: linear-gradient(to bottom, #ffffff 2%,#e1e1e1 100%);    " +
    "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#e1e1e1',GradientType=0 );    " + 
    "font-size: 5px;" +
    "text-align: center; " +
    "max-height: 8px;   " +
    "max-width: 20px;";
public static final String ESTATUS_NEGRO = "    border: #a0a0a0 solid 1px;     " +
    "border-radius: 5px;     " +
    "background: -moz-linear-gradient(top,  #959595 0%, #0d0d0d 46%, #010101 50%, #0a0a0a 53%, #4e4e4e 76%, #383838 87%, #1b1b1b 100%);     " + 
    "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#959595), color-stop(46%,#0d0d0d), color-stop(50%,#010101)," + 
    " color-stop(53%,#0a0a0a), color-stop(76%,#4e4e4e), color-stop(87%,#383838), color-stop(100%,#1b1b1b));     " +
    "background: -webkit-linear-gradient(top,  #959595 0%,#0d0d0d 46%,#010101 50%,#0a0a0a 53%,#4e4e4e 76%,#383838 87%,#1b1b1b 100%);      " +
    "background: -o-linear-gradient(top,  #959595 0%,#0d0d0d 46%,#010101 50%,#0a0a0a 53%,#4e4e4e 76%,#383838 87%,#1b1b1b 100%);      " +
    "background: -ms-linear-gradient(top,  #959595 0%,#0d0d0d 46%,#010101 50%,#0a0a0a 53%,#4e4e4e 76%,#383838 87%,#1b1b1b 100%);     " +
    "background: linear-gradient(to bottom,  #959595 0%,#0d0d0d 46%,#010101 50%,#0a0a0a 53%,#4e4e4e 76%,#383838 87%,#1b1b1b 100%);     " +
    "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#959595', endColorstr='#1b1b1b',GradientType=0 );      " +
    "font-size: 8px;" +
    "text-align: center; " +
    "max-height: 8px;   " +
    "max-width: 20px;";
		
public static final String TAMANO_ESTATUS_ESTILO = " font-size: 6px;" +
	 "text-align: center; " +
	 "max-height: 5px;   " +
	 "min-height: 5px;   " +
	 "min-width: 10px; " +
	 "max-width: 10px;";
public static final String CABECERA_FUENTE_ESTILO = 
	" font-size: 8px;" +
	"text-align: center; " +
	"max-height: 15px;   " +
	"max-width: 45px; " +
	"min-height: 15px;   " +
	"min-width: 45px;";
public static final String CLASS_BUTTON = "    border: 1px solid #166a48; "+
   " background: #058071; "+
   " font-family: Verdana, Geneva, sans-serif; "+
   " font-size: 9px; "+
   " color: #ffffff; "+
   " cursor: pointer; "+
   " border-radius: 5px; "+
   " text-shadow: 1px 1px 1px #000000; "+
   " padding: 5px; " + 
   "min-width: inherit;";
}

