import coreModule from '../core_module';

export class IndexCtrl {
    constructor($scope) {
        $scope.name = "World!fsafafsa";
        window.$IndexCtrl = $scope;
    }
}

coreModule.controller('IndexCtrl', IndexCtrl)