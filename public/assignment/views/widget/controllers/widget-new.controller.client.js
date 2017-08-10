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

                "type":widgetType
                // "pageId" :vm.pageId

            };
            widgetService.createWidget(vm.pageId,widget)
                .then(function (response) {
                    // console.log(response);
                    var page = response.data;
                    var widgets = page.widgets;
                    var widgetId = widgets[widgets.length - 1];
                    $location.url('/user/' + vm.userId +
                        '/website/' + vm.websiteId + '/page/'+vm.pageId+ '/widget/' + widgetId);
                });

        }
    }

})();