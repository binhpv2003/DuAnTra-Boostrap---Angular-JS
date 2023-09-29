function donhangdamuaController($scope, $rootScope, $http, $location, $localStorage) {


    $scope.arrDonHang = [];
    $scope.arrDonHangUser = [];
    $rootScope.tongTienUser = 0
    const apiDonHang = "http://localhost:3000/DonHang"
    $http
        .get(apiDonHang)
        .then(function (response) {
            $scope.arrDonHang = response.data
            $scope.arrDonHang.forEach(element => {
                if (element.idKhachHang === $rootScope.SaveUser.id) {
                    $scope.arrDonHangUser.push(element)
                }
            });


            $scope.arrDonHangUser.forEach(function (e) {
                $rootScope.tongTienUser += e.ThanhTien
            })


            $scope.checkDonHang = function () {
                if ($scope.arrDonHangUser.length == 0) {
                    return false;
                }
                return true;
            };

        })

}