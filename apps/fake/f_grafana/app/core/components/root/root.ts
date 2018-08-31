/**
 * grafana-app container directive
 *  child routes using ng-view
 */
import _ from 'lodash';
import $ from 'jquery';

export class RootCtrl {
    constructor($scope, $rootScope) {
    }
}

export function rootComponent($location) {
    return {
        restrict: 'E',
        controller: RootCtrl,
        link: (scope, elem) => {
            var sidemenuOpen;
            var body = $('body');

            $.fn.modal.Constructor.prototype.enforceFocus = function() {};

            // tooltip removal fix
            // manage page classes
            var pageClass;
            scope.$on('$routeChangeSuccess', function(evt, data) {
                if (pageClass) {
                    body.removeClass(pageClass);
                }
            })
        }
    };
}

