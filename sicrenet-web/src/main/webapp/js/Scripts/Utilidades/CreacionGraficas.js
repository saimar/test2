var chart = null;
var divRenderGeneral = '';
var imgsrc = null;
var img = null;
var html = null;

var chart2 = null;
var imgsrc2 = null;
var img2 = null;
var html2 = null;

function graficaColumnasBasica(divRender, titulo, subtitulo, categorias, datosDeSeries) {
    divRenderGeneral = divRender;
    var options = {
        chart: {
            renderTo: divRender,
            type: 'column'
        },
        credits: { enabled: false },
        title: {
            text: titulo
        },
        subtitle: {
            text: subtitulo
        },
        xAxis: {
            categories: categorias,
            labels: {
                style: {
                    fontSize:'9px'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Pesos'
            },
            labels: {
                formatter: function () {
                    return DevuelveCantidadSeparadaPorComas(this.value, false);
                },
                style: {
                    fontSize: '9px'
                }
            }
        },
        legend: {
            layout: 'vertical',
            backgroundColor: '#FFFFFF',
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 70,
            floating: false,
            shadow: true
        },
        tooltip: {
            formatter: function () {
                return '' +
                    this.x + ': ' + DevuelveCantidadSeparadaPorComas(this.y, false);
            }
        },
        plotOptions: {
            column: {

                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: datosDeSeries
    }

    chart = new Highcharts.Chart(options);

};

function ExportarAImagen1() {
    html = null;
    imgsrc = null;
    img = null;
    try {
        html = chart.getSVG();
        imgsrc = 'data:image/svg+xml;base64,' + Base64.encode(html); //imgsrc = 'data:image/svg+xml;base64,' + btoa(html);
        img = '<img src="' + imgsrc + '">';
    }
    catch (e) { 
        imgsrc = '';        
    }
    $('#' + divRenderGeneral).html(img);
    ExportarAImagen();
}

function graficaColumnasApiladas(divRender, titulo, subtitulo, categorias, datosDeSeries) {    
    chart2 = null;
    divRenderGeneral = divRender;
    var options2 = {
        chart: {
            renderTo: divRender,
            type: 'column'
        },
        credits: { enabled: false },
        title: {
            text: titulo
        },
        subtitle: {
            text: subtitulo
        },
        xAxis: {
            categories: categorias,
            labels: {
                style: {
                    fontSize: '9px'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Pesos'
            },
            stackLabels: {
                enabled: false,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            },
            labels: {
                formatter: function () {
                    return DevuelveCantidadSeparadaPorComas(this.value, false);
                },
                style: {
                    fontSize: '9px'
                }
            }

        },
        legend: {
            layout: 'vertical',
            backgroundColor: '#FFFFFF',
            align: 'right',
            verticalAlign: 'top',
            x: 0,
            y: 70,
            floating: false,
            shadow: true
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + DevuelveCantidadSeparadaPorComas(this.y, false) + '<br/>' +
                        'Total: ' + DevuelveCantidadSeparadaPorComas(this.point.stackTotal, false);
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: datosDeSeries
    }
    chart2 = new Highcharts.Chart(options2);
};

function ExportarAImagen2() {
    html2 = null;
    imgsrc2 = null;
    img2 = null;
    html2 = chart2.getSVG();
    try {
        html2 = chart2.getSVG(html2);
        //imgsrc2 = 'data:image/svg+xml;base64,' + btoa(encodeURIComponent(escape(html2)));
        imgsrc2 = 'data:image/svg+xml;base64,' + Base64.encode(html2); //imgsrc2 = 'data:image/svg+xml;base64,' + window.btoa(html2);
        img2 = '<img src="' + imgsrc2 + '">';
    } catch (e) {
        imgsrc2 = '';    
    }
    
    $('#' + divRenderGeneral).html(img2);
    ExportarAImagen();
}
