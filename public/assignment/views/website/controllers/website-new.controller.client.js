/**
 * Created by Chuhan on 7/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);


    function websiteNewController($routeParams, $location, websiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function createWebsite(website) {
            websiteService.createWebsite(vm.userId,website);
            $location.url('/user/' +vm.userId +'/website');
        }

    }

})();