/**
 * Created by Chuhan on 7/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);


    function widgetNewController($routeParams, $location, widgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.createWidget = createWidget;


        function createWidget(widgetType) {
            var widget = {
                "_id" : (new Date()).getTime() + "",
                "widgetType":widgetType,
                "pageId" :vm.pageId

            };
            widgetService.createWidget(vm.pageId,widget)
                .then(function () {
                    $location.url('/user/' + vm.userId +
                        '/website/' + vm.websiteId + '/page/'+vm.pageId+ '/widget/' + widget._id);
                });

        }
    }

})();