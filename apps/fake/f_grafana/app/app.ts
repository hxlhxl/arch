
import 'angular';
import 'angular-route';
// bootstrap之前引入jQuery
import 'jquery';
// 引入bootstrap.js;该路径有webpack的resolve.modules定义
// bootstrap下载自 http://getbootstrap.com/docs/3.3/getting-started/#download
import 'vendor/bootstrap/bootstrap';

import $ from 'jquery';
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
