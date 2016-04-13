$(document).ready(function () {
    // touch轮播图
    var myTouch = util.toucher($('#mycarousel')[0]);
    myTouch.on('swipeLeft', function (e) {
        $('.carousel-control.right').click();
    }).on('swipeRight', function (e) {
        $('.carousel-control.left').click();
    });
});