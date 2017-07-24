/**
 * Created by Chuhan on 7/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);


    function widgetEditController($routeParams, $location, widgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.updateWidget = updateWidget;

        function init() {
            vm.widget = widgetService.findWidgetById(vm.widgetId);
        }
        init();

        function updateWidget(){
            widgetService.updateWidget(vm.widget);
            $location.url('/user/' + vm.userId +
                '/website/' + vm.websiteId + '/page/'+vm.pageId+ '/widget');
        }
    }

})();