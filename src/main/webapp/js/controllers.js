/**
 * 这里是首页模块
 */
var HomeModule = angular.module("HomeModule", []);
HomeModule.controller('HomeCtrl', function ($scope, $http) {
    $scope.redirect = ['servepointlist'];
    var req = {
        method: 'GET',
        url: GetUrl.homeinfo
    }
    $http(req).success(function (data) {
        $scope.homeinfos = data.data;
    }).error(function (data) {
        alert(data.msg)
    });
    $scope.loadRecommendInfo = function () {
        $http.get(GetUrl.homeRecommendinfo).success(function (data) {
            for (var i in data.data)
                $scope.homeinfos.recommend.data.push(data.data[i]);
        }).error(function (data) {
            alert(data.msg)
        });
    }
    $scope.loadItineraryInfo = function () {
        $http.get(GetUrl.homeItineraryinfo).success(function (data) {
            for (var i in data.data)
                $scope.homeinfos.itinerary.data.push(data.data[i]);
        }).error(function (data) {
            alert(data.msg)
        });
    }
});
/**
 * 这里是服务网点列表模块
 */
var ServePointListModule = angular.module("ServePointListModule", []);
ServePointListModule.controller('ServePointListCtrl', function ($scope, $http, bdMapSev) {
    var req = {
        method: 'GET',
        url: GetUrl.pointlist
    }
    $http(req).success(function (data) {
        $scope.pointlist = data.data;
    }).error(function (data) {
        alert(data.msg)
    });
});
/**
 * 这里是服务网点模块
 * @function $scope.bdMap {设置地图功能}
 */
var ServePointModule = angular.module("ServePointModule", []);
ServePointModule.controller('ServePointCtrl', function ($scope, $http, bdMapSev) {
    $scope.map = new bdMapSev();
});
var GraphModule = angular.module("GraphModule", []);
GraphModule.controller('GraphCtrl', function ($scope, $http) {
    MyFlow.init();
    var req = {
        method: 'GET',
        url: GetUrl.graph.toolbar
    }
    $http(req).success(function (data) {
        $scope.toolbars = data;
        $scope.title = '来自angular标题';
    }).error(function (data) {
        alert(data.msg);
    }).then(function () {
        //alert('start init');
        setTimeout(function () {
            MyFlow.initSliderButtons("item_bar");
        }, 500);
    });
    $scope.save = function () {
        MyFlow.save(GetUrl.graph.saveGraph);
    };
});


