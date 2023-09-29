function chiTietSanPhamController($scope, $routeParams, $http, $rootScope, $localStorage) {


    $scope.maSP = $routeParams.maSP
    $scope.arrProduct = [];
    const apiProduct = "http://localhost:3000/products"
    $http.get(apiProduct)
        .then(function (response) {
            $scope.arrProduct = response.data
            $rootScope.SanPham = {
                maSP: "",
                hinhAnh: "",
                tenSanPham: "",
                giaSanPham: 0,
                giaGoc: 0,
                moTaSanPham: ""
            }

            $scope.arrProduct.forEach(element => {
                if (element.maSP === $scope.maSP) {
                    $rootScope.SanPham = element;
                }
            });
        })


    // mua sản phẩm
    $rootScope.arrProduct = [];
    $rootScope.itemProduct = {}

    $scope.soLuongGioHang = 1
    $http.get(apiProduct)
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

                            const apiGioHang = "http://localhost:3000/giohang";
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

    //nexxt slide 
    console.log(window.innerWidth)
    $scope.slide = {
        SPmoiNhat: 0,
        SPbanChay: 0,
        DungCu: 0,
        Quatang: 0,
        TinTuc: 0
    }
    $scope.nextSlide = function (arr, item, index) {

        console.log("Slide trước khi chuyển:", $scope.slide);

        if (window.innerWidth > 1000) {
            if (item < (arr.length - 5) * -300) {
                return;
            }
            item -= 300;
            console.log(item);
        } else {
            if (item < (arr.length - 2) * -300) {
                return;
            }
            item -= 300;
            console.log(item);
        }

        // Gán giá trị mới cho slide.SPmoiNhat
        if (index == 1) {
            $scope.slide.SPmoiNhat = item;
        } else if (index == 2) {
            $scope.slide.SPbanChay = item;
        } else if (index == 3) {
            $scope.slide.DungCu = item;
        } else if (index == 4) {
            $scope.slide.Quatang = item;
        } else if (index == 5) {
            $scope.slide.TinTuc = item;
        }

        console.log("Slide sau khi chuyển:", $scope.slide);
    };


    $scope.prevousSlide = function (item, index) {
        console.log("alo = " + item);
        if (item == 0) {
            // Đã ở slide đầu tiên
            return;
        }
        item += 300;
        if (index == 1) {
            $scope.slide.SPmoiNhat = item;
        } else if (index == 2) {
            $scope.slide.SPbanChay = item;
        } else if (index == 3) {
            $scope.slide.DungCu = item;
        } else if (index == 4) {
            $scope.slide.Quatang = item;
        } else if (index == 5) {
            $scope.slide.TinTuc = item;
        }
        console.log(item);
    };
}