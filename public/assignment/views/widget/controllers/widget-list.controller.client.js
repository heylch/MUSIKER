/**
 * Created by Chuhan on 7/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController);


    function widgetListController($routeParams, $sce,widgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.trustYoutubeLink = trustYoutubeLink;
        vm.htmlText = htmlText;
        vm.trustHtmlContent = trustHtmlContent;

        function init() {
            widgetService.findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                });
        }
        init();

        function trustYoutubeLink(widget){
            var link = "https://www.youtube.com/embed/";
            var widgetLink = widget.url.split("/");
            link = link.concat(widgetLink[widgetLink.length -1] );
            return $sce.trustAsResourceUrl(link);
        }

        function htmlText(widget) {
            var length = widget.text.length;
            var text = widget.text.substr(3,length-7);
            return text;
        }

        function trustHtmlContent(html) {
            return $sce.trustAsHtml(html);
        }
    }

})();
