/**
 * Created by Chuhan on 7/22/17.
 */
(function () {

angular
    .module("WebAppMaker")
    .controller("profileController", profileController);

    
    function profileController($routeParams, userService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        vm.updateUser = updateUser;
        vm.unregister = unregister;
        function init() {
            vm.user = userService.findUserById(vm.userId);
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._Id,user);
        }        
        
        function unregister() {
            
        }
        


    }
})();