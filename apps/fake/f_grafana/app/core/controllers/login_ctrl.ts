import coreModule from '../core_module';

export class LoginCtrl {
    constructor($scope) {
        $scope.goto = function(link) {
            $scope.link = link;
        };
    }
}

coreModule.controller('LoginCtrl', LoginCtrl);
