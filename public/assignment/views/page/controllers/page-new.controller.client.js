/**
 * Created by Chuhan on 7/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);


    function pageNewController($routeParams, $location, pageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.createPage = createPage;

        function init() {
            vm.pages = pageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage(page) {
            pageService.createPage(vm.websiteId,page);
            $location.url('/user/' +vm.userId +'/website/'+vm.websiteId+'/page');
        }

    }
})();
