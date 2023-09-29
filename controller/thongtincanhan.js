function thongtincanhanController($scope, $http, $rootScope) {

    $rootScope.luuThayDoi = function () {
        var apiThongTinCaNhan = "http://localhost:3000/account/" + $rootScope.SaveUser.id;
        console.log(apiThongTinCaNhan)

        var thongTinCaNhan = {
            ten: $rootScope.SaveUser.ten,
            email: $rootScope.SaveUser.email,
            phone: $rootScope.SaveUser.phone
        };

        $http.patch(apiThongTinCaNhan, thongTinCaNhan)
            .then(function () {
                alert("Cập nhật thông tin thành công");
            })
            .catch(function (error) {
                console.log("Lỗi khi cập nhật thông tin:", error);
            });
    };

    $scope.doiMatKhau = function () {

        console.log($scope.matKhauCu)
        if ($scope.matKhauCu !== $rootScope.SaveUser.matkhau) {

            alert("Mật khẩu cũ không chính xác");
            return;
        }


        if ($scope.matkhau !== $scope.XacNhan) {
            alert("Vui lòng nhập đúng xác nhận mật khẩu");
            return;
        }


        var id = $rootScope.SaveUser.id
        var matkhau = $scope.matkhau;
        const apiUser = "http://localhost:3000/account";
        $http
            .patch(apiUser + "/" + id, { matkhau: matkhau })
            .then(function () {
                alert("Đổi Mật Khẩu Thành Công")
            });



    }
    //end 
}