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
            vm.websites = websiteService.findWebsitesByUser(vm.userId);
            vm.website = websiteService.findWebsiteById(vm.websiteId);
            vm.websiteEdit = {
                "_id" : vm.website._id,
                "name" : vm.website.name,
                "developerId" : vm.website.developerId,
                "description" : vm.website.description
            }
        }
        init();

        function updateWebsite(website) {
            websiteService.updateWebsite(vm.websiteId, website);
            $location.url('/user/' +vm.userId +'/website');
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.websiteId);
            $location.url('/user/' +vm.userId +'/website');
        }
    }

})();
