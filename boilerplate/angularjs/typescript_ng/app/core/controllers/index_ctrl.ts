import coreModule from '../core_module';

export class IndexCtrl {
    constructor($scope) {
        $scope.name = `${appName}`;
        window.$IndexCtrl = $scope;
    }
}

coreModule.controller('IndexCtrl', IndexCtrl)