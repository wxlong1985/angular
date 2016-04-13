routerApp
    .factory('bdMapSev', function ($http) {
        var bdMap = function () {
            this.marker = '';
            this.map = new BMap.Map("mappoint-map");
            this.init();
        };
        bdMap.prototype = {
            init: function () {
                this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
                var local = new BMap.LocalSearch(this.map, {
                    renderOptions: {map: this.map}
                });
                this.map.clearOverlays();
                this.dragMarker(118.07491, 24.482206);
            },
            dragMarker: function (pointX, pointY) {
                var new_point = new BMap.Point(pointX, pointY);
                this.map.panTo(new_point);
                // 拖拽坐标
                marker = new BMap.Marker(new_point);  // 创建标注
                this.map.addOverlay(marker);              // 将标注添加到地图中
                var label = new BMap.Label("拖拽坐标确定位置", {offset: new BMap.Size(20, -10)});
                marker.setLabel(label);
                this.map.addOverlay(marker);
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                marker.enableDragging();    //可拖拽
                marker.addEventListener("dragend", function (e) {//将结果进行拼接并显示到对应的容器内
                    pointX = e.point.lng;
                    pointY = e.point.lat;
                    $('.quicklist-r .linktop .message-num').attr('data-point', pointX + ',' + pointY);
                });
            },
            dragEvent: function () {
                this.map.addEventListener("click", function (e) {
                    pointX = e.point.lng;
                    pointY = e.point.lat;
                    $('.quicklist-r .linktop .message-num').attr('data-point', pointX + ',' + pointY);
                    this.map.removeOverlay(marker);
                    dragMarker(pointX, pointY);
                });
                local.search($scope.start);
            },
            transformation: function () {

            }
        };
        return bdMap;
    })
    .service('graph', function ($http) {
        var graph = {
            marker: '',
            //绑定左边按钮事件
            initSlidelbar: function () {
            },
            //左上角工具栏事件
            initToolbar: function () {

            },
            openFlow: function () {

            },
            openWindow: function (ele) {
                var type = ele.attr('type');
                console.info(type);
                var win = $("#" + type);
                if (win) {
                    win.modal('show');
                }
            },
            init: function () {
                this.initSlidelbar();
                this.initToolbar();
            }
        };
        return graph;
    });