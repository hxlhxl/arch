
export class SuggestionLink {
    constructor($scope, element, attrs, $controller) {
        const vm = this;
        console.log($scope);
        $scope.suggInputText = '';
        $scope.$watch('ngModel', function(text) {
            $scope.suggSelectText = $controller.$viewValue;

        });

        $scope.$watch('suggInputText', function(text) {
            if (!text) {
                $scope.itemsCopy = $scope.items;
                return;
            }
            const items = [];
            $scope.items.forEach(item => {
                if (item.text.indexOf(text) != -1) {
                    items.push(item);
                }
            });
            $scope.itemsCopy = items;
            $scope.$applyAsync();
        });

        $scope.select = (item) => {
            $scope.suggSelectText = item.text;
            $controller.$setViewValue(item.text);
        };
    }
}

export function suggestionDirective() {
    return {
        restrict: 'E',
        replace: true,
        template: require('./suggestion.html'),
        require: '?ngModel',
        scope: {
            ngModel: '=',
            items: '<data'
        },
        link: SuggestionLink
    };
}

