
import 'lodash';
import 'angular';
import 'angular-route';
// bootstrap之前引入jQuery
import 'jquery';
// 引入bootstrap.js;该路径有webpack的resolve.modules定义
// bootstrap下载自 http://getbootstrap.com/docs/3.3/getting-started/#download
import 'vendor/bootstrap/bootstrap';

import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';
import angular from 'angular';
import config from 'app/core/config';

import {coreModule, registerNgDirectives} from './core/core'; // grafana.core: components/directives/services
import {setupNgRoutes} from './routes/routes';

export class App {
    registerFunctions: any;
    ngModuleDependecies: any[];
    preBootModules: any[];

    constructor() {
        this.preBootModules = [];
        this.registerFunctions = {};
        this.ngModuleDependecies = [
            'grafana.core',
            'ngRoute',
            'grafana'
        ];
    }

    useModule(module) {
        if (this.preBootModules) {
            this.preBootModules.push(module);
        } else {
            _.extend(module, this.registerFunctions);
        }
        this.ngModuleDependecies.push(module.name);
        return module;
    }

    init() {

        const app = angular.module('grafana', []);
        moment.locale(config.bootData.user.locale);

        app.config(($locationProvider, $controllerProvider, $compileProvider, $filterProvider, $httpProvider, $provide) => {
            // pre assign bindings before constructor calls; https://code.angularjs.org/1.6.6/docs/api/ng/provider/$compileProvider
            // $compileProvider.preAssignBindingsEnabled(true);    // 1.7 removed

            if (config.buildInfo.env !== 'development') {
                $compileProvider.debugInfoEnabled(false);
            }

            $httpProvider.useApplyAsync(true);

            this.registerFunctions.controller = $controllerProvider.register;
            this.registerFunctions.directive = $compileProvider.directive;
            this.registerFunctions.factory = $provide.factory;
            this.registerFunctions.service = $provide.service;
            this.registerFunctions.filter = $filterProvider.register;

            $provide.decorator('$http', ['$delegate', '$templateCache', function($delegate, $templateCache) {
                var get = $delegate.get;
                $delegate.get = function(url, config) {
                    if (url.match(/\.html$/)) {
                        // some template's already exist in the cache
                        if (!$templateCache.get(url)) {
                            url += '?v=' + new Date().getTime();
                        }
                    }
                    return get(url, config);
                };
                return $delegate;
            }]);
        });
        // app.constant()

        var module_types = ['controllers', 'directives', 'factories', 'services', 'filters', 'routes'];

        _.each(module_types, type => {
            var moduleName = 'grafana.' + type;
            this.useModule(angular.module(moduleName, []));
        });

        // makes it possible to add dynamic stuff
        this.useModule(coreModule);

        // register react angular wrappers
        coreModule.config(setupNgRoutes);
        registerNgDirectives();

        // var preBoot
        console.log(this.ngModuleDependecies, 'dependencies');
        angular.bootstrap(document, this.ngModuleDependecies);

        window.coreModule = coreModule;
    }
}

export default new App();
