
import 'angular';
import 'angular-route';

import angular from 'angular';

import {coreModule} from './core/core'; // bilibili.core

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
        app.controller('ErrorCtrl', []);
        coreModule.config();

        angular.bootstrap(document, this.ngModuleDependecies);
    }
}

export default new App();