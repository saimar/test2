var HOVER_SCALE = 2.0;
var PROXIMITY = 200.0;

$(function () {
    $(".icon_enlarge").each(function (i) {
        var dock = $(this);
        var dock_icons = dock.find("li a");
        $.each(dock_icons, function () {
            var initHeight = parseInt($(this).height());
            var initWidth = parseInt($(this).width());

            $(this).data("initWidth", initWidth);
            $(this).data("initHeight", initHeight);

            $(this).data("newWidth", initWidth * HOVER_SCALE);
            $(this).data("newHeight", initHeight * HOVER_SCALE);
        });
        //event handlers
        dock.bind("mouseleave", function (event) {
            $.each(dock_icons, function () {
                $(this).animate({ "height": $(this).data("initHeight") + "px", "width": $(this).data("initWidth") + "px" }, "fast");
            });
        });

        dock.bind("mousemove", function (event) {
            $.each(dock_icons, function () {
                var newSize = calculateDockIconSize($(this), event.pageX);

                $(this).stop();
                $(this).width(newSize[0]);
                $(this).height(newSize[1]);
            });
        });
    });
});

function calculateDockIconSize(icon, mousePosX) {
    var initWidth = parseInt($(icon).data("initWidth"));
    var initHeight = parseInt($(icon).data("initHeight"));
    var newWidth = parseInt($(icon).data("newWidth"));
    var newHeight = parseInt($(icon).data("newHeight"));

    var xProximity = Math.abs(mousePosX - $(icon).offset().left - (newWidth / 2.0));
    if (xProximity < PROXIMITY) {
        var newRatio = ((PROXIMITY - xProximity) / PROXIMITY);

        var additionalWidth = newRatio * (newWidth - initWidth);
        var additionalHeight = newRatio * (newHeight - initHeight);
        return [(initWidth + additionalWidth), (initHeight + additionalHeight)];
    } else {
        return [initWidth, initHeight];
    }
} 