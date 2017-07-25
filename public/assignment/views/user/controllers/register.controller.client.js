/**
 * Created by Chuhan on 7/22/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var vm = this;
        vm.createUser = createUser;

        function init() {

        }
        init();

        function createUser(user) {
            var _user = userService.findUserByUsername(user.username);
            if(!_user) {
                userService.createUser(user);
                vm.user = userService.findUserByUsername(user.username);
                $location.url("/user/"+vm.user._id);
            } else {
                vm.error = "User already exists";
            }
        }
    }
})();