
import 'angular';
import 'angular-route';

import angular from 'angular';

import {coreModule} from './core/core'; // hashnode.core
import {setupNgRoutes} from './routes/routes';

export class App {
    ngModuleDependecies: any[];

    constructor() {
        this.ngModuleDependecies = [
            'hashnode.core',
            'ngRoute',
            'hashnode'
        ];
    }
    init() {

        const app = angular.module('hashnode', []);
        // app.config();
        // app.constant()

        coreModule.config(setupNgRoutes);

        angular.bootstrap(document, this.ngModuleDependecies);

        window.coreModule = coreModule;
    }
}

export default new App();
