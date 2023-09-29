function dangnhapController($scope, $localStorage, $http, $location) {
    $scope.arrAccount = [];

    const apiAccount = "http://localhost:3000/account"
    $http
        .get(apiAccount)
        .then(function (response) {
            $scope.arrAccount = response.data

        })

    $localStorage.check = false
    $localStorage.vaitro = false

    $scope.dangnhap = function () {
        $scope.check = false
        $scope.arrAccount.forEach(function (element) {
            if (element.taikhoan == $scope.taikhoan && element.matkhau == $scope.matkhau) {
                $localStorage.user = element
                $localStorage.check = true
                if (element.quyen == true) {
                    $localStorage.vaitro = true
                }
                check = true;
                alert("Đăng Nhập Thành Công")

                $location.path('/home');

            } else {
                check = false;
            }



        })

    }


}