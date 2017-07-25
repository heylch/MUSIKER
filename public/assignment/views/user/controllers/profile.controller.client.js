/**
 * Created by Chuhan on 7/22/17.
 */
(function () {

angular
    .module("WebAppMaker")
    .controller("profileController", profileController);

    
    function profileController($routeParams, $location, userService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        function init() {
            vm.user = userService.findUserById(vm.userId);
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id,user);
        }        
        
        function deleteUser() {
            userService.deleteUser(vm.userId);
            $location.url('/login');
        }
        


    }
})();