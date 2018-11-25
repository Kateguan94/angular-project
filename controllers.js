var myControllers = angular.module('myControllers', []);
myControllers.controller('searchController', ['$scope', 'getQuotes', function myController($scope, getQuotes) {
    var timeout;
    $scope.search = function() {
        clearTimeout(timeout);
        timeout = setTimeout(_ => {
            if ($scope.query.length < 3) return;
            getQuotes($scope.query).then(function(data) {
                $scope.quotes = data;
            });
        }, 1000);
    }
}]);