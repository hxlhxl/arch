import {coreModule} from 'app/core/core';

// services
import {contextSrv} from './context_srv';
// services from features
import {PlaylistSrv} from 'features/playlist/playlist_srv';
const core = coreModule
                .factory('contextSrv', function() {return contextSrv;})

                .service('playlistSrv', PlaylistSrv);

export default core;
