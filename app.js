var myApp = angular.module('myApp', [
    'ngRoute',
    'myControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'search.html',
            controller: 'searchController'
        });
}]);