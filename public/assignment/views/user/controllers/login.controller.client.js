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
            if(!user) {
                model.errorMessage = "User not found";
                return;
            }

            userService.findUserByCredentials(user.username, user.password)
            .then(function (response){
                _user = response.data;
                if (_user === '0'){
                    vm.errorMessage = "User not found: Unable to login";
                }
                else{
                    $location.url("/user/" + _user._id);
                }
            });
        }
    }


})();