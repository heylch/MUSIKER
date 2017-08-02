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
            pageService.findPageByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = response.data;
                });
            pageService.findPageById(vm.pageId)
                .then(function (response) {
                    vm.page = response.data;
                    vm.pageEdit = {
                        "_id" : vm.page._id,
                        "name" : vm.page.name,
                        "websiteId" : vm.page.websiteId,
                        "description" : vm.page.description
                    }
                });
        }
        init();

        function updatePage(page) {
            pageService.updatePage(vm.pageId, page)
                .then(function () {
                    $location.url('/user/' +vm.userId +'/website/'+vm.websiteId+'/page');
                });

        }

        function deletePage() {
            pageService.deletePage(vm.pageId)
                .then(function () {
                    $location.url('/user/' +vm.userId +'/website/'+vm.websiteId+'/page');
                });

        }
    }

})();
