var app = angular.module('myApp');

app.directive('resultRow', function() {
    return {
        template: `	<img src="tronalddump_850x850.png">
				    <div class="text" ng-bind="quote.value"></div>
				    <div class="date" ng-bind="quote.appeared_at"></div>
	    		  `,
        restrict: 'A'
    }
});