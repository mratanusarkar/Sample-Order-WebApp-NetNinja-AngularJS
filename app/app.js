var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);
var len = 5;

myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $routeProvider
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
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
        controller: 'NinjaController'
    })
    .otherwise({
        redirectTo:'/home'
    });

}]);

myNinjaApp.run(function(){
    
});

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http){

    $scope.removeNinja = function(ninja){
        var removeIndex = $scope.ninjas.indexOf(ninja);

        if(confirm("Do you really want to delete?")){
            $scope.ninjas.splice(removeIndex, 1);
        }

        len = len - 1;
    };

    $scope.addNinja = function(){
        if($scope.newninja.name.trim()==""){
            alert("Input field of the Ninja is empty!");
        }
        else {
            if($scope.newninja.belt.trim()==""){
                $scope.newninja.belt = "white";
            }
            if($scope.newninja.rate.trim()==""){
                $scope.newninja.rate = "100";
            }
            if($scope.newninja.dp.trim()==""){
                $scope.newninja.dp = "https://via.placeholder.com/50/000000/FFFFFF/?text=No%20DP";
            }

            $scope.ninjas.push({
                name: $scope.newninja.name,
                belt: $scope.newninja.belt,
                rate: parseInt($scope.newninja.rate),
                available: true,
                thumb: $scope.newninja.dp
            });
        }
        

        $scope.newninja.name = "";
        $scope.newninja.belt = "";
        $scope.newninja.rate = "";
        $scope.newninja.dp = "";

        len = len + 1;

    };

    $scope.removeAll = function(){
        $scope.ninjas = [];
    };

    $http.get('data/ninjas.json').then(function(response){
        $scope.ninjas = response.data;
        // console.log("response.data");
        // console.log(response.data);
    });

}]);

myNinjaApp.directive('randomNinja', [function(){

    return {
        /**
         * E: elements      eg: <my-directive></my-directive>
         * A: attributes    eg: <div my-directive="somthing"></div>
         * C: classes       eg: ToDO
         * M: comments      eg: ToDO
         */
        restrict: 'E',
        scope: {
            ninjas: '=',
            title: '='
        },
        templateUrl: 'views/random.html',
        transclude: true,
        replace: true,
        controller: function($scope){
            //console.log("len = "+$scope.ninjas.length;
            //console.log($scope.ninjas);
            $scope.random = Math.floor(Math.random() * 5);
        }
    };

}]);

myNinjaApp.controller('HomeController', ['$scope', '$http', function($scope, $http){

    $http.get('data/ninjas.json').then(function(response){
        $scope.ninjas = response.data;
        console.log($scope.ninjas.length);
    });

}]);

myNinjaApp.controller('ContactController', ['$scope', '$http', '$location', function($scope, $http, $location){

    $scope.sendMessage = function(){
        $location.path('/contact-success');
    }

}]);