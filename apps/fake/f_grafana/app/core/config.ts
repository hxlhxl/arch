import _ from 'lodash';

export interface BuildInfo {
    version: string;
    commit: string;
    isEnterprise: boolean;
    env: string;
}
