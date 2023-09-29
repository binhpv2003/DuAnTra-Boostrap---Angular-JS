// Khởi tạo ứng dụng angularjs
// Khai báo thư viện phụ thuộc - dependences
var myApp = angular.module("myApp", ["ngRoute", "ngStorage"]);
myApp.run(function ($rootScope, $localStorage, $http, $location) {
    // Start login logout
    $rootScope.showMenuItem = false;
    $rootScope.showMenu = function () {
        $rootScope.showMenuItem = !$rootScope.showMenuItem;
    };

    $rootScope.SaveUser = $localStorage.user;
    $rootScope.tenUser = $rootScope.SaveUser ? $rootScope.SaveUser.ten : '';
    $rootScope.isLogin = $localStorage.check;
    $rootScope.isQuyen = $localStorage.vaitro;
    $rootScope.soluongSP = 0;
    $rootScope.tongTien = 0;
    $rootScope.arrGioHang = [];

    const apiGioHang = "http://localhost:3000/giohang";

    $http.get(apiGioHang).then(function (response) {
        $rootScope.arrGioHang = response.data;
        $rootScope.soluongSP = $rootScope.arrGioHang.length;

        $rootScope.arrGioHang.forEach(function (element) {
            $rootScope.tongTien += element.giaSanPham * element.soLuong;
        });
    });

    $rootScope.logout = function () {
        $rootScope.SaveUser = null;
        $rootScope.isLogin = false;
        $rootScope.isQuyen = null;

        $localStorage.user = null;
        $localStorage.vaitro = null;
        $localStorage.check = null;
        $rootScope.showMenuItem = false;

        alert("Đăng Xuất Thành Công");
        $location.path('/dangnhap');
    };
});
// Khởi tạo controller với app
myApp.controller("gioithieuController", gioithieuController)
myApp.controller("trangchuController", trangchuController)
myApp.controller("chiTietSanPhamController", chiTietSanPhamController)
myApp.controller("giohangController", giohangController)
myApp.controller("sanphamController", sanphamController)
myApp.controller("adminController", adminController)
myApp.controller("dangnhapController", dangnhapController)
myApp.controller("thanhtoanController", thanhtoanController)
myApp.controller("lienHeController", lienHeController)
myApp.controller("donhangdamuaController", donhangdamuaController)
myApp.controller("thongtincanhanController", thongtincanhanController)
myApp.controller("dangkyController", dangkyController)
// Cấu hình chuyển nội dung trang theo url
myApp.config(function ($routeProvider, $locationProvider) {
    // Xóa khoảng trắng
    $locationProvider.hashPrefix("");
    // Cấu hình chuyển trang
    $routeProvider
        .when("/home", {
            templateUrl: "./pages/trang-chu.html",
            controller: "trangchuController",

        })

        .when("/gioi-thieu", {
            templateUrl: "./pages/gioi-thieu.html",
            controller: "gioithieuController"
        })
        .when("/gio-hang", {
            templateUrl: "./pages/gio-hang.html",
            controller: "giohangController"
        })
        .when("/chi-tiet-sp/:maSP", {
            templateUrl: "./pages/chi-tiet-sp.html",
            controller: "chiTietSanPhamController"
        })
        .when("/lien-he", {
            templateUrl: "./pages/lien-he.html",
            controller: "lienHeController"
        })

        .when("/dangnhap", {
            templateUrl: "./pages/dangnhap.html",
            controller: "dangnhapController"
        })
        .when("/dangky", {
            templateUrl: "./pages/dangky.html",
            controller: "dangkyController"
        })
        .when("/Admin", {
            templateUrl: "./pages/admin.html",
            controller: "adminController"
        })
        .when("/tintuc", {
            templateUrl: "./pages/tintuc.html"
        })
        .when("/sanpham", {
            templateUrl: "./pages/sanpham.html",
            controller: "sanphamController"
        })
        .when("/thanhtoan", {
            templateUrl: "./pages/thanhtoan.html",
            controller: "thanhtoanController"
        })
        .when("/donhang", {
            templateUrl: "./pages/donhangdamua.html",
            controller: "donhangdamuaController"
        })
        .when("/thongtincanhan", {
            templateUrl: "./pages/thongtincanhan.html",
            controller: "thongtincanhanController"
        })

        .otherwise({
            redirectTo: "/home"
        })




})