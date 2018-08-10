import coreModule from 'app/core/core_module';

export class BilibiliCtrl {
    constructor($scope, $rootScope) {
        $scope.name = 'hashnode_ctrl';
    }
}

export function hashnodeAppDirective($location) {
    return {
        restrict: 'E',
        controller: BilibiliCtrl,
        link: (scope, elem) => {
            console.log("link in hashnode_ctrl");
        }
    }
}
coreModule.directive('hashnodeApp', hashnodeAppDirective)