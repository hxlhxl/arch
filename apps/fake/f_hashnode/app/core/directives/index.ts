import {coreModule} from 'app/core/core';

// directives
import {helloworldDirective} from './helloworld/helloworld';
import {suggestionDirective} from './suggestion/suggestion';

const core = coreModule
                .directive('uiHelloworld', helloworldDirective)
                .directive('uiSuggestion', suggestionDirective);

export default core;

