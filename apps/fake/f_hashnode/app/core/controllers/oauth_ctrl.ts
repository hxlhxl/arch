import coreModule from '../core_module';
import {getFormUrlEncoded} from '../utils/http';
import {appEvents, noop} from '../core';
import localForage from "localforage";

export class OauthCtrl {
    constructor($scope, $http, $location) {
        window.curLoc = $location;
        $scope.domain = "oatuh html";
        console.log($location);
        const { code = null } = $location.search();
        console.log(code);
        $http.get(
            `/api/oauth/github?code=${code}`
        ).then(
            res => {
                if (res.data && res.data.retCode === 0) {
                    $scope.user = res.data.data;
                    console.log($scope.user, '________________');
                    localForage.setItem('oauth:user', $scope.user).then(
                        () => {
                            // appEvents.emit("oauth:success", $scope.user);
                            console.log("****************");
                            $location.path("/");
                            $location.search('');
                            $location.replace();
                            $scope.$apply();
                        }
                    ).catch(err => {
                        console.log(err);
                    });

                }
            },
            err => {
                alert("pull github userinfo failed");
            }
        );
    }
}

coreModule.controller('OauthCtrl', OauthCtrl);
