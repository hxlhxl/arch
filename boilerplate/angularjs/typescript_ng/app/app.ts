
import 'angular';
import 'angular-route';

import angular from 'angular';

import {coreModule} from './core/core'; // myapp.core
import {setupNgRoutes} from './routes/routes';

export class App {
    ngModuleDependecies: any[];

    constructor() {
        this.ngModuleDependecies = [
            'myapp.core',
            'ngRoute',
            'myapp'
        ];
    }
    init() {

        const app = angular.module('myapp', []);
        // app.config();
        // app.constant()

        coreModule.config(setupNgRoutes);

        angular.bootstrap(document, this.ngModuleDependecies);

        window.coreModule = coreModule;
    }
}

export default new App();
