

export class Helloworld {

    constructor($scope, element, attrs, $controller) {

    }
}


export function helloworldDirective() {
    return {
        restrict: 'EA',
        scope: {},
        template: require('./helloworld.html'),
        link: Helloworld
    };
}
