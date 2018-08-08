
import 'angular';
import 'angular-route';

import angular from 'angular';

import {coreModule} from './core/core'; // bilibili.core
import {setupNgRoutes} from './routes/routes';

export class App {
    ngModuleDependecies: any[];

    constructor() {
        this.ngModuleDependecies = [
            'bilibili.core',
            'ngRoute',
            'bilibili'
        ]
    }
    init() {
        
        const app = angular.module('bilibili', []);
        // app.config();
        // app.constant()
        app.controller('IndexCtrl', ['$scope', function($scope) {
            $scope.name = "World!";
        }]);
        app.controller('ErrorCtrl', ['$scope', function($scope) {
            $scope.status = '404 Not Found';
        }]);
        coreModule.config(setupNgRoutes);

        angular.bootstrap(document, this.ngModuleDependecies);
    }
}

export default new App();