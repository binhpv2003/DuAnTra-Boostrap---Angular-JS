function giohangController($scope, $http, $rootScope, $localStorage, $location) {

    $rootScope.tinhTongTien = function () {

        $rootScope.arrGioHang.forEach(e => {
            $rootScope.tongTien += (e.giaSanPham * e.soLuong)
            console.log($rootScope.tongTien)

        });

    }

    $scope.xoaSanPham = function (index) {

        var id = $rootScope.arrGioHang[index].id
        const apiGioHang = "http://localhost:3000/giohang"
        $http
            .delete(apiGioHang + "/" + id)
            .then(function () {
                $rootScope.tongTien -= ($rootScope.arrGioHang[index].giaSanPham * $rootScope.arrGioHang[index].soLuong)
                $rootScope.arrGioHang.splice(index, 1);
                $rootScope.soluongSP -= 1
            })
    }
    $scope.checkSanPhamGioHang = function () {
        if ($rootScope.soluongSP == 0) {
            return false;
        }
        return true;
    };

    $scope.capNhatSoLuong = function (sanPham) {
        var id = sanPham.id;

        var soLuong = sanPham.soLuong;
        const apiGioHang = "http://localhost:3000/giohang";
        $http
            .patch(apiGioHang + "/" + id, { soLuong: soLuong })
            .then(function () {
                $rootScope.tinhTongTien();
            });
    };
}