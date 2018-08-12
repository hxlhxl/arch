import coreModule from '../core_module';
import {appEvents, noop} from '../core';
import localForage from "localforage";

export class IndexCtrl {
    $scope: any;
    constructor($scope) {
        this.$scope = $scope;
        $scope.loading = true;
        $scope.name = "World!";
        this.getData();
        window.myng = $scope;
        // appEvents.on('oauth:success', (user)=> {
        //     $scope.user = user;
        // })
    }

    getData() {
        localForage.getItem('oauth:user')
            .then(res => {
                console.log(res, 'hahahahah')
                this.$scope.user = res;
            })
            .catch(err => {
                console.log(err, 'heheh')
                this.$scope.user = null;
            })
            .then(() => {
                this.$scope.loading = false;
                this.$scope.$apply();
            });
    }
}

coreModule.controller('IndexCtrl', IndexCtrl)