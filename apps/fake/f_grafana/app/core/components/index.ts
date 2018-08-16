import {coreModule} from 'app/core/core';

// components
import {rootComponent} from './root/root';
import {headerComponent} from './header/header';

const core = coreModule
                .directive('uiRootContainer', rootComponent)
                .directive('uiHeader', headerComponent);

export default core;
