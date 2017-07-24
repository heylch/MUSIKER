/**
 * Created by Chuhan on 7/22/17.
 */
(function () {

    angular
        .module("WebAppMaker")
        .controller("loginController", loginController)


    function loginController($location,userService) {
        var vm = this;
        vm.login = login;

        function init() {

        }
        init();

        function login(user) {
            var user = userService.findUserByCredentials(user.username, user.password);
            if (user === null){
                vm.errorMessage = "User not found: Unable to login";
            }
            else{
                $location.url("/user/" + user._id);
            }

        }
    }


})();