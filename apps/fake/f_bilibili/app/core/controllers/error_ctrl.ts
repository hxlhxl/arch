import coreModule from '../core_module';

export class ErrorCtrl {
    constructor($scope) {
        $scope.status = '404 Not Found';
    }
}

coreModule.controller('ErrorCtrl', ErrorCtrl);