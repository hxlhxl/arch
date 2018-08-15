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
        $scope.type = 'aaa';
        $scope.filter = {
            suggText: 'xxxx'
        };
        // $scope.filter.suggText = "vscode";
        $scope.orgList = [
            {
                text: '链家',
                value: '1234-5678'
            },
            {
                text: '中原',
                value: '9087-4313'
            },
            {
                text: '恒大',
                value: '1235-9421'
            }
        ];
        window.myng = $scope;
        // appEvents.on('oauth:success', (user)=> {
        //     $scope.user = user;
        // })
    }

    getData() {
        localForage.getItem('oauth:user')
            .then(res => {
                this.$scope.user = res;
            })
            .catch(err => {
                this.$scope.user = null;
            })
            .then(() => {
                this.$scope.loading = false;
                this.$scope.$apply();
            });
    }
}

coreModule.controller('IndexCtrl', IndexCtrl);
