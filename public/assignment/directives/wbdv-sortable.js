/**
 * Created by Chuhan on 8/1/17.
 */
(function () {
    angular
        .module('wbdvDirectives',[])
        .directive("reorderWebpage", reorderWebpage);


    function reorderWebpage($http, $routeParams) {

        function linkFunction(scope, element) {
            var pageId = $routeParams["pid"];
            var startIndex = -1;
            var endIndex = -1;

            $(element).sortable({
                start: function (event, ui) {
                    startIndex =$(ui.item).index();
                },
                stop: function (event, ui) {
                    endIndex =$( ui.item).index();
                    $http.put("/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + endIndex);
                }
            });
        }
        return {

            link: linkFunction
        }
    }

})();






