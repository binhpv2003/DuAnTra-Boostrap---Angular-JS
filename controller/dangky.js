function dangkyController($scope, $rootScope, $location, $localStorage, $http) {
    $scope.info = {
        taikhoan: "",
        matkhau: "",
        ten: "",
        email: "",
        phone: "",
        quyen: false,
        trangThai: true
    };
    $scope.arrAccount = [];

    const apiAccount = "http://localhost:3000/account"
    $rootScope.message = "";
    $http
        .get(apiAccount)
        .then(function (response) {

            $scope.arrAccount = response.data;
            var check = false;
            $rootScope.dangkytaikhoan = function () {

                for (var i = 0; i < $scope.arrAccount.length; i++) {
                    var element = $scope.arrAccount[i];

                    if (element.taikhoan === $scope.info.taikhoan) {
                        console.log(element)
                        check = true;
                        break;
                    } else {
                        check = false;
                    }
                }

                if (check == true) {
                    $rootScope.message = "Tài Khoản đã tồn tại"
                } else {
                    const apiUser = "http://localhost:3000/account"
                    $http
                        .post(apiUser, $scope.info)
                        .then(function () {
                            $rootScope.message = "Đăng kí thành công"
                        })
                }
            }
        });





}