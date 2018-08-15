/**
 * hashnode-app container directive
 *  child routes using ng-view
 */
import coreModule from 'app/core/core_module';

export class HashnodeCtrl {
    constructor($scope, $rootScope) {
        $scope.name = 'hashnode_ctrl';
    }
}

export function hashnodeAppDirective($location) {
    return {
        restrict: 'E',
        controller: HashnodeCtrl,
        link: (scope, elem) => {
            console.log("link in hashnode_ctrl");
        }
    };
}
coreModule.directive('hashnodeApp', hashnodeAppDirective);
