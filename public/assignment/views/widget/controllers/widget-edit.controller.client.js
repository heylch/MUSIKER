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
        vm.searchFlickr = searchFlickr;


        function init() {
            widgetService.findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                    if (vm.widget.type === "HEADING"){
                        vm.headingEdit = {
                            "_id":vm.widget._id,
                            "_page":vm.widget._page,
                            "type":vm.widget.type,
                            "url":vm.widget.url,
                            "width":vm.widget.width,
                            "name":vm.widget.name,
                            "placeholder":vm.widget.placeholder,
                            "height":vm.widget.height,
                            "rows":vm.widget.rows,
                            "class":vm.widget.class,
                            "icon":vm.widget.icon,
                            "deletable":vm.widget.deletable,
                            "formated":vm.widget.formated,
                            "dateCreated": vm.widget.dateCreated,
                            "size":vm.widget.size,
                            "text":vm.widget.text
                        }
                    }
                    if (vm.widget.type === "IMAGE"){
                        vm.imageEdit = {
                            "_id":vm.widget._id,
                            "type":vm.widget.type,
                            "width":vm.widget.width,
                            "_page":vm.widget._page,
                            "url":vm.widget.url,
                            "name":vm.widget.name,
                            "placeholder":vm.widget.placeholder,
                            "height":vm.widget.height,
                            "rows":vm.widget.rows,
                            "class":vm.widget.class,
                            "icon":vm.widget.icon,
                            "deletable":vm.widget.deletable,
                            "formated":vm.widget.formated,
                            "dateCreated": vm.widget.dateCreated,
                            "size":vm.widget.size,
                            "text":vm.widget.text
                        }

                    }
                    if (vm.widget.type === "YOUTUBE"){
                        vm.youtubeEdit = {
                            "_id":vm.widget._id,
                            "type":vm.widget.type,
                            "width":vm.widget.width,
                            "_page":vm.widget._page,
                            "url":vm.widget.url,
                            "name":vm.widget.name,
                            "placeholder":vm.widget.placeholder,
                            "height":vm.widget.height,
                            "rows":vm.widget.rows,
                            "class":vm.widget.class,
                            "icon":vm.widget.icon,
                            "deletable":vm.widget.deletable,
                            "formated":vm.widget.formated,
                            "dateCreated": vm.widget.dateCreated,
                            "size":vm.widget.size,
                            "text":vm.widget.text
                        }
                    }
                    if (vm.widget.type === "HTML"){
                        vm.htmlEdit = {
                            "_id":vm.widget._id,
                            "type":vm.widget.type,
                            "_page":vm.widget._page,
                            "text":vm.widget.text,
                            "name":vm.widget.name,
                            "placeholder":vm.widget.placeholder,
                            "height":vm.widget.height,
                            "rows":vm.widget.rows,
                            "class":vm.widget.class,
                            "icon":vm.widget.icon,
                            "deletable":vm.widget.deletable,
                            "formated":vm.widget.formated,
                            "dateCreated": vm.widget.dateCreated,
                            "size":vm.widget.size,
                            "width":vm.widget.width
                        }
                    }
                    if (vm.widget.type === "TEXT"){
                        vm.textEdit = {
                            "_id":vm.widget._id,
                            "type":vm.widget.type,
                            "_page":vm.widget._page,
                            "text":vm.widget.text,
                            "name":vm.widget.name,
                            "placeholder":vm.widget.placeholder,
                            "height":vm.widget.height,
                            "rows":vm.widget.rows,
                            "class":vm.widget.class,
                            "icon":vm.widget.icon,
                            "deletable":vm.widget.deletable,
                            "formated":vm.widget.formated,
                            "dateCreated": vm.widget.dateCreated,
                            "size":vm.widget.size,
                            "width":vm.widget.width
                        }
                    }
                });
        }
        init();

        function updateWidget(widget){
            widgetService.updateWidget(vm.widgetId,widget)
                .then(function () {
                    $location.url('/user/' + vm.userId +
                        '/website/' + vm.websiteId + '/page/'+vm.pageId+ '/widget');
                });

        }

        function deleteWidget() {
            widgetService.deleteWidget(vm.widgetId)
                .then(function () {
                    $location.url('/user/' + vm.userId +
                        '/website/' + vm.websiteId + '/page/'+vm.pageId+ '/widget');
                });

        }
        function searchFlickr() {
            $location.url('/user/' + vm.userId +
                '/website/' + vm.websiteId + '/page/'+vm.pageId+ '/widget/' + vm.widgetId + '/searchflickr');
        }
    }

})();