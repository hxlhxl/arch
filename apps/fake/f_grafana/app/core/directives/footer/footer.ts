export class FooterLink {
    constructor($scope, element, attrs, $controller) {

    }
}

export function footerDirective() {
    return {
        restrict: 'AE',
        template: require('./footer.html'),
        link: FooterLink
    };
}
