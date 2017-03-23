<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wfFechaHora.aspx.cs" Inherits="SicreNet.Inicio.Principal.wfFechaHora" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="../../Scripts/jquery-1.7.1.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery-ui-1.8.20.js" type="text/javascript"></script>
    <script src="../../Scripts/Utilidades/SoporteAjax.js" type="text/javascript"></script>
    <script src="../../Scripts/Utilidades/UtilidadesJavascipt.js" type="text/javascript"></script>
    <title></title>
    <script type="text/javascript">
        FechaYHoraServer();
    </script>
    <style>
        .systemDate
        {
            float: right;
            margin: 2px 0 -5px 0px;
            clear: both;
            font-size: 9px;
            color: white;
            font-weight: bold;
            padding: 7px;
        }
        
        .systemDate .day
        {
            background: black;
            border: white solid 1px;
            float: left;
            margin-right: 4px;
            padding: 1px;
        }
        
        .systemDate .time
        {
            background: black;
            border: transparent solid 1px;
            float: left;
            padding: 1px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="systemDate">
        <div id="divFecha" class="day">
            11 NOVIEMBRE 2011</div>
        <div id="divHora" class="time">
            11:11:11</div>
    </div>
    </form>
</body>
</html>
