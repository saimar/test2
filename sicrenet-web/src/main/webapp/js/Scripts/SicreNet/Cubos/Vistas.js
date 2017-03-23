
function LlenarComboVistas() {
    //document.getElementById("divMainG").style.visibility = "visible";
    //$("#samplePivotTable").html("");
    Waiting(true, "Espere por favor. Cargando Información...");
    //var SentenciaSQL = 'select non empty ( {[Fecha Corte].[Fecha Corte].[Año],[Fecha Corte].[Fecha Corte].[Mes],[Fecha Corte].[Fecha Corte].[Dia]}*[Factores].[Factores].[Tipo Factores].MEMBERS*[Status Cartera].[Estatus Cartera].[Estatus Cartera]*[Producto Contable].[Tipo Riesgo].[Tipo Riesgo]*[Producto Contable].[Fitires].[Rubro] )   on Rows, {[Measures].MEMBERS,[Measures].[GeneralNueva]}   on Columns from ReservaVectores';
    //    var parametros = {
    //        query: SentenciaSQL,
    //    };
    //    peticionAjax("Default.aspx/obtieneTabInicial", "POST", parametros, TableroControl, TableroControl);

    var alto = parseInt($("#shadows").height()) - 25;
    $("#frameCubo").css("height", alto + "px");

    Waiting(false, "Espere por favor. Cargando Información...");

}


function TableroControl(sampleData) {
    var w = screen.width*0.03;
    var wit = screen.width - w;
    var h = screen.height-(screen.height/4);
    var table = sampleData.d;
    var data = JSON.parse(table);

    var config = {
        dataSource: data,
        dataHeadersLocation: 'columns',
        theme: 'blue',
        toolbar: {
            visible: true
        },
        grandTotal: {
            rowsvisible: false,
            columnsvisible: false
        },
        subTotal: {
            visible: false,
            collapsed: false
        },
        rowSettings: {
            subTotal: {
                visible: true,
                collapsed: true,
                collapsible: true
            }
        },
        columnSettings: {
            subTotal: {
                visible: false,
                collapsed: true,
                collapsible: true
            }
        },
        fields: [
            { name: '[Fecha Corte].[Fecha Corte].[Año].[MEMBER_CAPTION]', caption: 'Año' },
            { name: '[Fecha Corte].[Fecha Corte].[Mes].[MEMBER_CAPTION]', caption: 'Mes' },
            { name: '[Fecha Corte].[Fecha Corte].[Dia].[MEMBER_CAPTION]', caption: 'Dia' },
             { name: '[Factores].[Factores].[Tipo Factores].[MEMBER_CAPTION]', caption: 'Factores' },
            { name: '[Status Cartera].[Estatus Cartera].[Estatus Cartera].[MEMBER_CAPTION]', caption: 'Estatus', sort: { order: 'desc' } },
            { name: '[Producto Contable].[Tipo Riesgo].[Tipo Riesgo].[MEMBER_CAPTION]', caption: 'TipoRiesgo' },
            { name: '[Producto Contable].[Fitires].[Cartera].[MEMBER_CAPTION]', caption: 'Cartera' },
            { name: '[Producto Contable].[Fitires].[Clasificacion].[MEMBER_CAPTION]', caption: 'Clasificacion' },
            { name: '[Producto Contable].[Fitires].[Rubro].[MEMBER_CAPTION]', caption: 'Rubro' },
            {
                name: '[Measures].[No Pedidos]', caption: 'No Pedidos', dataSettings: { formatFunc: function (value) { return Number(value).format(); } }
            },
            {
                name: '[Measures].[Capital]', caption: 'Capital', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Interes Neto]', caption: 'Interes neto', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Capital e  Int Neto]', caption: 'Cap e Int Neto', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Anticipos]', caption: 'Anticipos', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Base de Calificacion]', caption: 'Base de Calf.', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[GeneralNueva]', caption: 'General Nueva', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Adicional General]', caption: 'Adicional General', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[RsvaIntVdos]', caption: 'RsvaIntVdos', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Adicional]', caption: 'Adicional', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            //todos
            {
                name: '[Measures].[2901 Int Pag Ant]', caption: '2901 Int Pag Ant', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[IDNC Despues V]', caption: 'IDNC Despues V', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Base Proceso]', caption: 'Base Proceso', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[2901 Primas]', caption: '2901 Primas', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[CNBV SEMHOMMEN]', caption: 'CNBV SEMHOMMEN', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Riesgo]', caption: 'Riesgo', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Base de Calificacion]', caption: 'Base de Calificacion', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[General CNBV]', caption: 'General CNBV', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Modelo Interno]', caption: 'Modelo Interno', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Depósito MAZ]', caption: 'Depósito MAZ', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Primas Recuperadas]', caption: 'Primas Recuperadas', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[General CNBV96 Porciento]', caption: 'General CNBV96 Porciento', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Base Contable]', caption: 'Base Contable', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Anticipo de Capital]', caption: 'Anticipo de Capital', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },
            {
                name: '[Measures].[Anticipos de Interes]', caption: 'Anticipos de Interes', dataSettings: { formatFunc: function (value) { return Number(value).format(2); } }
            },


        //    {
        //        name: '6',
        //        caption: 'Amount',
        //        dataSettings: {
        //            aggregateFunc: 'avg',
        //            formatFunc: function(value) {
        //                return Number(value).toFixed(0);
        //            }
        //        }
        //    }
        ],
        rows: ['Estatus','TipoRiesgo', 'Cartera', 'Clasificacion', 'Rubro'],
        //columns : [ 'Class' ],
        data: ['No Pedidos', 'Capital', 'Interes neto', 'Cap e Int Neto', 'Anticipos', 'Base de Calf.', 'General Nueva', 'Adicional General', 'RsvaIntVdos', 'Adicional'],
        //preFilters : {
        //    'Clasificacion': { 'Does Not Match': 'CREDITO GRUPAL' },
        //},
        width: wit,
        height: h
    };
    
    // instantiate and show the pivot grid
    var pgridw = new orb.pgridwidget(config);
    pgridw.render(document.getElementById('samplePivotTable'));
    pgridw.refreshData(data);
    Waiting(false, "Espere por favor. Cargando Información...");
}



Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function SicrenetCubosExcel() {
    //alert('funciona');
    //document.location="../../SicreNet/Vistas/VistaCalificacion.xls";
   
   
}