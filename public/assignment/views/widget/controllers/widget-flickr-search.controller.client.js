/**
 * Created by Chuhan on 8/7/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("flickrImageSearchController", flickrImageSearchController);


    function flickrImageSearchController($routeParams, $location, widgetService, flickrService) {

        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.searchPhoto = searchPhoto;
        vm.selectPhoto = selectPhoto;
        vm.updatePhoto = updatePhoto;
        vm.cancelUpdate = cancelUpdate;

        widgetService
            .findWidgetById(vm.widgetId)
            .then(function (response) {
                vm.widget = response.data;
                vm.originUrl = vm.widget.url;
            });

        function searchPhoto(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    // console.log(data);
                    vm.photos = data.photos;
                });
        }



        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            vm.widget.url = url;
        }

        function updatePhoto() {
            widgetService.updateWidget(vm.widgetId,vm.widget)
                .then(function () {
                    $location.url('/user/' + vm.userId +
                        '/website/' + vm.websiteId + '/page/'+vm.pageId+ '/widget');
                })
        }

        function cancelUpdate() {
            vm.widget.url = vm.originUrl;
            $location.url('/user/' + vm.userId +
                '/website/' + vm.websiteId + '/page/'+vm.pageId+ '/widget');
        }

    }
})();