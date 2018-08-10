import coreModule from 'app/core/core_module';

export class BilibiliCtrl {
    constructor($scope, $rootScope) {
        $scope.name = 'bilibili_ctrl';
    }
}

export function bilibiliAppDirective($location) {
    return {
        restrict: 'E',
        controller: BilibiliCtrl,
        link: (scope, elem) => {
            console.log("link in bilibili_ctrl");
        }
    }
}
coreModule.directive('bilibiliApp', bilibiliAppDirective)