import coreModule from '../core_module';
import {getFormUrlEncoded} from '../utils/http';

export class OauthCtrl {
    constructor($scope, $http, $location) {
        window.curLoc = $location;
        $scope.domain = "oatuh html";
        console.log($location);
        const { code = null } = $location.search();
        console.log(code);
        $http.post(
            'https://github.com/login/oauth/access_token',
            getFormUrlEncoded({
                code,
                client_id: '606abe84965df784b124',
                client_secret: '7b3788d3b5c34b6dc24dd40cf727e2e05f3a2c3a'
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
            }
        ).then(res => {
            console.log('access_token res: ', res);
            $http.get(`https://api.github.com/user?access_token=${res.access_token}`)
                .then(res => {
                    console.log('user info:', res);
                }, err => {
                    console.log("user info failed", err);
                });
        }, err => {
            console.log('access_token err:', err);
            $http.get(`https://api.github.com/user?access_token=f2dd58a58c77f8430822fded02e400be3ca1efcd`)
                .then(res => {
                    console.log('user info:', res);
                }, err => {
                    console.log("user info failed", err);
                });
            
        });
    }
}

coreModule.controller('OauthCtrl', OauthCtrl);