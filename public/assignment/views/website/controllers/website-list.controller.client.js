/**
 * Created by Chuhan on 7/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.userId);
        }
        init();

    }
})();