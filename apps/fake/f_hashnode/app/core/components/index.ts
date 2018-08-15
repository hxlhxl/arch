import {coreModule} from 'app/core/core';

// components
import {headerComponent} from './header/header';

const core = coreModule
                .directive('uiHeader', headerComponent);

export default core;
