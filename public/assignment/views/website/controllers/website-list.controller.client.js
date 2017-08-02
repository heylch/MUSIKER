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
            websiteService.findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                });
        }
        init();

    }
})();