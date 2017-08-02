/**
 * Created by Chuhan on 7/23/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);


    function websiteEditController($routeParams, $location, websiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.websiteId = $routeParams["wid"];
        vm.userId = $routeParams["uid"];

        function init() {
             websiteService.findWebsitesByUser(vm.userId)
                 .then(function (response) {
                     vm.websites = response.data;
                 });
            websiteService.findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;
                    vm.websiteEdit = {
                        "_id" : vm.website._id,
                        "name" : vm.website.name,
                        "developerId" : vm.website.developerId,
                        "description" : vm.website.description
                    }

                });

        }
        init();

        function updateWebsite(website) {
            websiteService.updateWebsite(vm.websiteId, website)
                .then(function () {
                    $location.url('/user/' +vm.userId +'/website');
                });

        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.websiteId)
                .then(function () {
                    $location.url('/user/' +vm.userId +'/website');
                });

        }
    }

})();
