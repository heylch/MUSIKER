/**
 * Created by Chuhan on 7/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);


    function pageEditController($routeParams, $location, pageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;


        function init() {
            vm.pages = pageService.findPageByWebsiteId(vm.websiteId);
            vm.page = pageService.findPageById(vm.pageId);
            vm.pageEdit = {
                "_id" : vm.page._id,
                "name" : vm.page.name,
                "websiteId" : vm.page.websiteId,
                "description" : vm.page.description
            }

        }
        init();

        function updatePage(page) {
            pageService.updatePage(vm.pageId, page);
            $location.url('/user/' +vm.userId +'/website/'+vm.websiteId+'/page');
        }

        function deletePage() {
            pageService.deletePage(vm.pageId);
            $location.url('/user/' +vm.userId +'/website/'+vm.websiteId+'/page');
        }
    }

})();
