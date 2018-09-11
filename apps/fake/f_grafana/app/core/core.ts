
import 'app/core/controllers/all';
import coreModule from './core_module';
import appEvents from './app_events';

// services
import serviceEntry from './services';
// registerNgDirectives
import registerNgDirectives from './angular_wrappers';
// components
import componentEntry from './components';
// directives
import directiveEntry from './directives';


function noop() {}

export {
    coreModule,
    appEvents,
    noop,
    registerNgDirectives,

    // components
    componentEntry,
    // directives
    directiveEntry,
    // services
    serviceEntry,
};
