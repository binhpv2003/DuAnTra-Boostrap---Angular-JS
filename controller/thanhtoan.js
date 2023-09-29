function thanhtoanController($scope, $http, $rootScope, $localStorage, $location) {


    const apiDonHang = "http://localhost:3000/DonHang"
    const apiSanPham = "http://localhost:3000/products"
    $scope.thanhToan = function () {

        if (!$rootScope.showBtn) {
            var currentTime = new Date();
            var randomNumber = Math.floor(Math.random() * 101);
            $scope.itemDonHang = {
                idKhachHang: $rootScope.SaveUser.id,
                maHoaDon: randomNumber,
                khachHang: $rootScope.SaveUser.ten,
                ngayDat: currentTime,
                ThanhTien: $rootScope.tongTien,
                TrangThai: true
            }

            $http
                .post(apiDonHang, $scope.itemDonHang)
                .then(function () {

                    alert("Thanh Toán Thành Công")
                    $rootScope.arrGioHang.forEach(function (eGioHang) {
                        var gioHangMaSP = eGioHang.maSP;
                        var gioHangSoLuong = eGioHang.soLuong;

                        $rootScope.arrProduct.forEach(function (eProduct) {
                            if (eProduct.maSP === gioHangMaSP) {
                                var id = eProduct.id;
                                var soLuong = eProduct.soLuong - gioHangSoLuong;

                                $http.patch(apiSanPham + "/" + id, { soLuong: soLuong })
                                    .then(function () {
                                        console.log("Cập nhật số lượng sản phẩm thành công");
                                    })
                                    .catch(function (error) {
                                        console.log("Lỗi khi cập nhật số lượng sản phẩm:", error);
                                    });
                            }
                        });
                    });
                    for (var i = 1; i <= $rootScope.soluongSP; i++) {
                        var id = i
                        $http
                            .delete(apiGioHang + "/" + id)

                    }

                });



        }
        else {

            var currentTime = new Date();
            var randomNumber = Math.floor(Math.random() * 101);
            $scope.itemDonHang = {
                idKhachHang: $rootScope.SaveUser.id,
                maHoaDon: randomNumber,
                khachHang: $rootScope.SaveUser.ten,
                ngayDat: currentTime,
                ThanhTien: $rootScope.tongTienMuaNgay,
                TrangThai: true
            }

            $http
                .post(apiDonHang, $scope.itemDonHang)
                .then(function () {
                    alert("Thanh Toán Thành Công")
                    $rootScope.arrProduct.forEach(function (element) {
                        if (element.maSP === $rootScope.itemMuaNgay.maSP) {
                            var id = element.id
                            var soLuong = element.soLuong - $rootScope.itemMuaNgay.soLuong;
                            $http
                                .patch(apiSanPham + "/" + id, { soLuong: soLuong })
                        }
                    })

                })

        }

    }


}