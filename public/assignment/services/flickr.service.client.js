/**
 * Created by Chuhan on 8/7/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("flickrService", flickrService);


    function flickrService($http) {

        var key = "7854152c69bd10692a425c14d9dbadc8";
        var secret = "ed70711867d27831";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
        this.searchPhotos = searchPhotos;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url)
                    .then(function (data){
                        console.log(data);
                        return data;
                    });
        }
    }
})();
