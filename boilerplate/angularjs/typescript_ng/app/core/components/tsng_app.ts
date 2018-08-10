import coreModule from 'app/core/core_module';

export class BilibiliCtrl {
    constructor($scope, $rootScope) {
        $scope.name = 'tsng_ctrl';
    }
}

export function tsngAppDirective($location) {
    return {
        restrict: 'E',
        controller: BilibiliCtrl,
        link: (scope, elem) => {
            console.log("link in tsng_ctrl");
        }
    }
}
coreModule.directive('tsngApp', tsngAppDirective)