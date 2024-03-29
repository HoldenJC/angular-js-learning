var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate'])

myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'ContactController'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'MainController'
        })
        .otherwise({
            redirectTo: '/home'
        })
}])

myApp.directive('randomNinja', [function () {
    return {
        restrict: 'E',
        scope: {
            ninjas: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function ($scope) {
            $scope.random = Math.floor(Math.random() * 4)
        }
    }

}])

myApp.controller('MainController', ['$scope', '$http', function ($scope, $http) {

    $scope.removeNinja = function (ninja) {
        var removedNinja = $scope.ninjas.indexOf(ninja)
        $scope.ninjas.splice(removedNinja, 1)
    }

    $scope.addNinja = function (newNinja) {
        $scope.ninjas.push({
            ...$scope.newNinja,
            available: true
        })
        $scope.newNinja.name = "", $scope.newNinja.belt = "", $scope.newNinja.rate = null
    }

    $scope.removeAll = function () {
        $scope.ninjas = []
    }

    $http.get('data/ninjas.json').then(function (response) {
        console.log(response)
        $scope.ninjas = response.data
    })

}])

myApp.controller('ContactController', ['$scope', '$location', function ($scope, $location) {
    $scope.sendMessage = function () {
        $location.path('/contact-success')

    }

}])