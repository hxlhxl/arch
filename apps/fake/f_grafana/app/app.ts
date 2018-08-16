
import 'angular';
import 'angular-route';

import angular from 'angular';

import {coreModule} from './core/core'; // grafana.core
import {setupNgRoutes} from './routes/routes';

export class App {
    ngModuleDependecies: any[];

    constructor() {
        this.ngModuleDependecies = [
            'grafana.core',
            'ngRoute',
            'grafana'
        ];
    }
    init() {

        const app = angular.module('grafana', []);
        // app.config();
        // app.constant()

        coreModule.config(setupNgRoutes);

        angular.bootstrap(document, this.ngModuleDependecies);

        window.coreModule = coreModule;
    }
}

export default new App();
