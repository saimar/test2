$(function () {
    document.getElementById("divMenuModulos").style.marginTop = (navigator.appName.indexOf('Explorer') != -1 ? '0px' : '1px');
    if (navigator.appName.indexOf('Explorer') == -1) {
        document.getElementById("divFechaHora").style.margin = "7px 0 -5px 0px";
        document.getElementById("Img2").style.margin = "-1px 7px 0px 0px";
        document.getElementById("imgBandera").style.margin = "25px -130px 0px 0px";
    }

    var valor = (screen.height - document.getElementById("divHeader").offsetHeight) - 132;
    document.getElementById("shadows").style.height = valor + "px";
});