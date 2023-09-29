function sanphamController($scope, $http, $rootScope, $localStorage) {

    $scope.check = 0
    $scope.arr = [];
    $scope.arrProduct = []
    const apiProducts = "http://localhost:3000/products";
    const apiGioHang = "http://localhost:3000/giohang";
    $http.get(apiProducts)
        .then(function (response) {
            $scope.arr = response.data;
            $scope.arrProduct = $scope.arr
            $scope.count = $scope.arrProduct.length;
            $scope.onclick = function (index) {
                if ($scope.arrProduct.length > 0) {
                    $scope.arrProduct = []
                }

                $scope.arr.forEach(element => {
                    if (index === 0) {
                        $scope.arrProduct.push(element)
                    }
                    if (parseInt(element.danhMuc) === index) {

                        $scope.arrProduct.push(element)
                    }
                    $scope.count = $scope.arrProduct.length;
                });


            }

            $scope.locProduct = function () {
                console.log($scope.loc)
                if ($scope.arrProduct.length > 0) {
                    $scope.arrProduct = []
                }
                $scope.arr.forEach(element => {
                    if (parseInt($scope.loc) === 0) {
                        if (element.giaSanPham <= 500000) {
                            $scope.arrProduct.push(element)
                        }
                    } else {
                        if (element.giaSanPham > 500000) {
                            $scope.arrProduct.push(element)
                        }
                    }
                });
            }
        })
        .catch(function (error) {
            console.log(error)
        })

    $scope.arrDanhMuc = [];
    const apiDanhMuc = "http://localhost:3000/DanhMuc"
    $http.get(apiDanhMuc)
        .then(function (response) {
            $scope.arrDanhMuc = response.data
            console.log($scope.arrDanhMuc)
        })



    $rootScope.arrProduct = [];
    $rootScope.itemProduct = {}


    $http.get(apiProducts)
        .then(function (response) {
            $rootScope.arrProduct = response.data;
            //getDonHang
            $rootScope.getInfo = function (maSp, check) {
                if (check == 1) {
                    $rootScope.showBtn = true
                    $rootScope.showGioHang = false

                } else {
                    $rootScope.showBtn = false
                    $rootScope.showGioHang = true
                }
                $rootScope.arrProduct.forEach(function (element) {
                    if (element.maSP === maSp) {
                        $rootScope.itemProduct = element

                    }

                })
                $scope.soLuongGioHang = 1

                $rootScope.themGiohang = function () {

                    var check = false
                    $scope.itemGioHang = {
                        maSP: $rootScope.itemProduct.maSP,
                        hinhAnh: $rootScope.itemProduct.hinhAnh,
                        tenSanPham: $rootScope.itemProduct.tenSanPham,
                        giaSanPham: $rootScope.itemProduct.giaSanPham,
                        soLuong: $scope.soLuongGioHang
                    }

                    $rootScope.arrGioHang.forEach(function (element) {
                        if (element.maSP === $scope.itemGioHang.maSP) {

                            var id = element.id;
                            console.log(id)
                            var soLuong = element.soLuong + $scope.itemGioHang.soLuong;


                            $http
                                .patch(apiGioHang + "/" + id, { soLuong: soLuong })
                                .then(function () {
                                    $rootScope.tinhTongTien();
                                });
                            check = true
                            return
                        }
                    })
                    if (check == false) {
                        $scope.itemGioHang = {
                            maSP: $rootScope.itemProduct.maSP,
                            hinhAnh: $rootScope.itemProduct.hinhAnh,
                            tenSanPham: $rootScope.itemProduct.tenSanPham,
                            giaSanPham: $rootScope.itemProduct.giaSanPham,
                            soLuong: $scope.soLuongGioHang
                        }
                        $http
                            .post(apiGioHang, $scope.itemGioHang)
                            .then(function () {
                                $rootScope.arrGioHang.push($scope.itemGioHang)
                            })
                    }


                }

                $rootScope.muaNgay = function () {
                    $rootScope.itemMuaNgay = {
                        maSP: $rootScope.itemProduct.maSP,
                        hinhAnh: $rootScope.itemProduct.hinhAnh,
                        tenSanPham: $rootScope.itemProduct.tenSanPham,
                        giaSanPham: $rootScope.itemProduct.giaSanPham,
                        soLuong: $scope.soLuongGioHang
                    }
                    $rootScope.tongTienMuaNgay = $rootScope.itemMuaNgay.giaSanPham * $rootScope.itemMuaNgay.soLuong

                }



            }
        })


}