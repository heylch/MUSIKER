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
            userService.findUserByUsername(user.username)
                .then(function (response) {
                    var _user = response.data;
                    if(_user === "0") {
                        return userService.createUser(user)
                    } else {
                        model.error = "User already exists";
                    }
                })
                .then(function (response) {
                    var _user = response.data;
                    $location.url("/user/" + _user._id);
                });
        }
    }
})();