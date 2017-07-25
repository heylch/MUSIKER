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
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = widgetService.findWidgetById(vm.widgetId);
            if (vm.widget.widgetType === "HEADING"){
                vm.headingEdit = {
                    "_id":vm.widget._id,
                    "widgetType":vm.widget.widgetType,
                    "size":vm.widget.size,
                    "pageId":vm.widget.pageId,
                    "text":vm.widget.text
                }
            }
            if (vm.widget.widgetType === "IMAGE"){
                vm.imageEdit = {
                    "_id":vm.widget._id,
                    "widgetType":vm.widget.widgetType,
                    "width":vm.widget.width,
                    "pageId":vm.widget.pageId,
                    "url":vm.widget.url
                }
            }
            if (vm.widget.widgetType === "YOUTUBE"){
                vm.youtubeEdit = {
                    "_id":vm.widget._id,
                    "widgetType":vm.widget.widgetType,
                    "width":vm.widget.width,
                    "pageId":vm.widget.pageId,
                    "url":vm.widget.url
                }
            }
            if (vm.widget.widgetType === "HTML"){
                vm.htmlEdit = {
                    "_id":vm.widget._id,
                    "widgetType":vm.widget.widgetType,
                    "pageId":vm.widget.pageId,
                    "text":vm.widget.text
                }
            }
        }
        init();

        function updateWidget(widget){
            widgetService.updateWidget(vm.widgetId,widget);
            $location.url('/user/' + vm.userId +
                '/website/' + vm.websiteId + '/page/'+vm.pageId+ '/widget');
        }

        function deleteWidget() {
            widgetService.deleteWidget(vm.widgetId);
            $location.url('/user/' + vm.userId +
                '/website/' + vm.websiteId + '/page/'+vm.pageId+ '/widget');
        }
    }

})();