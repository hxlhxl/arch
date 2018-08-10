
export function setupNgRoutes($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            // templateUrl: 'app/partials/index.html',
            template: require('app/partials/index.html'),
            controller: 'IndexCtrl',
        })
        .otherwise({
            // templateUrl: 'app/partials/error.html',
            template: require('app/partials/error.html'),
            controller: 'ErrorCtrl'
        })
}