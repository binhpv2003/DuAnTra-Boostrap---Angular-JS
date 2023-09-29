function adminController($scope, $http, $rootScope, $localStorage, $location) {

    $scope.arrUsers = [];
    $scope.arrChucNang = [];
    const apiUsers = "http://localhost:3000/account";
    $http.get(apiUsers)
        .then(function (response) {
            $scope.arrUsers = response.data
        })
    const apiChucNang = "http://localhost:3000/ChucNang"
    $http.get(apiChucNang)

        .then(function (response) {
            $scope.arrChucNang = response.data


        })
    $scope.arrDM = [];
    $scope.arrDanhMuc = [];
    const apiDanhMuc = "http://localhost:3000/DanhMuc"
    $http.get(apiDanhMuc)
        .then(function (response) {
            $scope.arrDM = response.data

            $scope.arrDM.forEach(element => {
                if (element.id != 0) {
                    $scope.arrDanhMuc.push(element)
                }
            });
        })
    $scope.arrDonHang = [];
    const apiDonHang = "http://localhost:3000/donhang"
    $http.get(apiDonHang)
        .then(function (response) {
            $scope.arrDonHang = response.data
        })
    $scope.Account = {
        id: 0,
        taikhoan: "",
        matkhau: "",
        ten: "",
        email: "",
        phone: "",
        quyen: 0,
        trangThai: true

    }
    $scope.viTri = -1
    $scope.onSubmit = function (event) {
        event.preventDefault();
        if ($scope.viTri == -1) {
            $http
                .post(apiUsers, $scope.Account)
                .then(function () {
                    $scope.arrUsers.push($scope.Account)
                })
                .catch(function (error) {

                    console.log(error)
                })
        } else {
            $http
                .put(apiUsers + "/" + $scope.Account.id, $scope.Account)
                .then(function () {
                    $scope.viTri = -1

                })
                .catch(function (error) {
                    console.log(error)
                })
        }

    }


    $scope.deleteUser = function (index) {
        var id = $scope.arrUsers[index].id;

        if (id != 1) {
            $http
                .delete(apiUsers + "/" + id)
                .then(function () {
                    $scope.arrUsers.splice(index, 1)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    $scope.select = function (index) {
        var id = $scope.arrUsers[index].id;
        $scope.viTri = id
        $http
            .get(apiUsers + "/" + id)
            .then(function (response) {
                $scope.Account = response.data
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    $scope.indexSelected = 1
    $scope.tenChucNang = "Quản Lý Người Dùng"

    $scope.onclick = function (index) {
        $scope.indexSelected = index + 1
        $scope.tenChucNang = $scope.arrChucNang[index].tenChucNang
        console.log($scope.indexSelected)
    }
    $scope.clearForm = function () {
        $scope.viTri = -1
        $scope.Account = {};
    }



    // CRUD sản phẩm
    $scope.arrProducts = []
    const apiProduct = "http://localhost:3000/products"
    $http.get(apiProduct)
        .then(function (response) {
            $scope.arrProducts = response.data
        })

    //tạo sp
    $scope.viTriProduct = -1
    $scope.product = {
        maSP: "",
        hinhAnh: "",
        tenSanPham: "",
        giaSanPham: 0,
        giaGoc: 0,
        soLuong: 0,
        moTaSanPham: "",
        trangThai: 1,
        danhMuc: ""
    }


    const imageInput = document.getElementById('imageInput');

    imageInput.addEventListener('change', function (event) {

        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // Lưu tên tệp vào product.hinhAnh
        $scope.product.hinhAnh = file.name;
    });
    $scope.onSubmitSanPham = function (event) {
        event.preventDefault


        if ($scope.viTriProduct == -1) {
            $http
                .post(apiProduct, $scope.product)
                .then(function () {
                    $scope.arrProducts.push($scope.product)
                })
        } else {
            $scope.viTriProduct = -1
            $http
                .put(apiProduct + "/" + $scope.product.id, $scope.product)

        }


    }

    // select 

    $scope.selectProduct = function (index) {
        var id = $scope.arrProducts[index].id
        $scope.viTriProduct = id
        $http.get(apiProduct + "/" + id)
            .then(function (response) {
                $scope.product = response.data
            })

    }

    $scope.deleteProduct = function (index) {

        var id = $scope.arrProducts[index].id
        $http
            .delete(apiProduct + "/" + id)
            .then(function () {
                $scope.arrProducts.splice(index, 1)
            })
    }


    // CRUD danh mục 
    $scope.danhmuc = {

        id: 0,
        tenDanhMuc: "",
        trangThai: false
    }
    //Add Danh Muc
    $scope.viTriDanhMuc = -1
    $scope.onSubmitDanhMuc = function (event) {
        event.preventDefault()
        if ($scope.viTriDanhMuc == -1) {
            $http
                .post(apiDanhMuc, $scope.danhMuc)
                .then(function () {
                    $scope.arrDanhMuc.push($scope.danhMuc)
                })
        } else {

            $scope.viTriDanhMuc = -1
            $http
                .put(apiDanhMuc + "/" + $scope.danhMuc.id, $scope.danhMuc)


        }


    }
    $scope.selectDanhMuc = function (index) {
        var id = $scope.arrDanhMuc[index].id
        $scope.viTriDanhMuc = index
        $http
            .get(apiDanhMuc + "/" + id)
            .then(function (response) {
                $scope.danhMuc = response.data
            })
    }
    $scope.deleteDanhMuc = function (index) {
        var id = $scope.arrDanhMuc[index].id
        $http
            .delete(apiDanhMuc + "/" + id)
            .then(function () {
                $scope.arrDanhMuc.splice(index, 1)
            })
    }

}