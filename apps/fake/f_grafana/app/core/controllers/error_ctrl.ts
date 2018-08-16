import coreModule from '../core_module';

export class ErrorCtrl {
    constructor($scope) {
        $scope.status = '404 Not Found;502 Bad Gateway;302 Permenant Moved;9999';
    }
}

coreModule.controller('ErrorCtrl', ErrorCtrl);
