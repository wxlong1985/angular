routerApp
    .directive('graphtool', function ($http, graph) {
        return {
            restrict: "AE",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    //scope.$apply(attrs.graphtool)();
                    //graph.openWindow(element);
                    //MyFlow.initSliderButton(element);
                });
            }
        }
    })
    .directive('graphaction', function ($http, graph) {
        return {
            restrict: "AE",
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    flow.editor(attrs.graphaction);
                });
            }
        }
    })
    .directive('graphsubmit', function ($http, graph) {
        return {
            restrict: "AE",
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    //scope.$apply(attrs.graphtool)();
                    MyFlow.save(GetUrl.graph.saveGraph);
                });
            }
        }
    })
;
var GraphModule = angular.module("GraphModule", []);
GraphModule.directive('graphtool', function ($http, graph) {
    return {
        restrict: "AE",
        link: function (scope, element, attrs) {

            //element.bind('click', function (event) {
            //});
            //scope.$apply(attrs.graphtool)();
            //graph.openWindow(element);
            MyFlow.initSliderButton(element);
        }
    }
});