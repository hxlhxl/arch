/**
 * grafana-app container directive
 *  child routes using ng-view
 */

export class RootCtrl {
    constructor($scope, $rootScope) {
    }
}

export function rootComponent($location) {
    return {
        restrict: 'E',
        controller: RootCtrl,
        link: (scope, elem) => {
        }
    };
}

