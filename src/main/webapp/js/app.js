var routerApp = angular.module('xmTourismApp', ['ui.router', 'HomeModule', 'ServePointModule', 'ServePointListModule', 'GraphModule']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param $rootScope {[type]}
 * @param $state {[type]}
 * @param $stateParams {[type]}
 */
routerApp.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param $stateProvider {[type]}
 * @param $urlRouterProvider {[type]}
 */
routerApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/graph');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpls/home.html'
                }
            }
        })
        .state('servepointlist', {
            url: '/servepointlist',
            templateUrl: 'tpls/servepointlist.html'
        })
        .state('servepoint', {
            url: '/servepoint',
            templateUrl: 'tpls/servepoint.html'
        })
        .state('graph', {
            url: '/graph',
            templateUrl: 'tpls/test.html'
        });
});

