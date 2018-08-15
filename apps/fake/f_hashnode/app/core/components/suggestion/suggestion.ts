import {coreModule} from 'app/core/core';
import angular from 'angular';

export class SuggestionLink {

    constructor($scope, element, attrs, $controller) {
        const vm = this;
        console.log($scope);
        $scope.suggInputText = '';
        $scope.$watch('ngModel', function(text) {
            $scope.suggSelectText = $controller.$viewValue;

        });
        // $scope.$watch("items", function(items) {
        //     // if (items) {
        //     // }
        //     $scope.itemsCopy = angular.copy(items);
        // });
        $scope.$watch('suggInputText', function(text) {
            console.log(text);
            if (!text) {
                // $scope.items = $scope.$parent.items;
                $scope.itemsCopy = $scope.items;
                return;
            }
            const items = [];
            $scope.items.forEach(item => {
                if (item.text.indexOf(text) != -1) {
                    items.push(item);
                }
            });
            // $scope.items = items;
            $scope.itemsCopy = items;
            // $scope.$digest();
            $scope.$applyAsync();
            console.log($scope.itemsCopy);
        });

        $scope.select = (item) => {
            $scope.suggSelectText = item.text;
            $controller.$setViewValue(item.text);
        };
    }

    fnSelect(item) {
        console.log(item, '___+++___');
    }
}

export function suggestionDirective() {
    return {
        restrict: 'E',
        replace: true,
        template: require('./suggestion.html'),
        require: '?ngModel',
        scope: {
            // ngModel: '=',
            items: '<data'
        },
        link: SuggestionLink
    };
}

coreModule.directive('uiSuggestion', suggestionDirective);
