
class HeaderCtrl {
    logoName: string;
    // link: string;

    constructor($scope, private $location) {
        this.logoName = "myapp";
    }

    reloadIndex(link) {
        console.log(this.$scope, link);
        this.$location.path(link || "/");
        // return this.logoName;
    }
}

export function headerComponent() {
    return {
        restrict: 'E',
        scope: {
            link: "="
        },
        template: require('./header.html'),
        controller: HeaderCtrl,
        controllerAs: 'ctrl',
        bindToController: true
    };
}
