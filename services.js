var app = angular.module('myApp');

app.factory('getQuotes', ['$http', function($http) {
    return function(query) {
        var url = 'http://localhost:8080/search/quote?query=' + encodeURIComponent(query);
        return $http.get(url).then(function(response) {
            return response.data._embedded.quotes;
        });
    };
}]);