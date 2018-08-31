import {coreModule} from 'app/core/core';

// directives
import {helloworldDirective} from './helloworld/helloworld';
import {footerDirective} from './footer/footer';
import {suggestionDirective} from './suggestion/suggestion';

const core = coreModule
                .directive('uiHelloworld', helloworldDirective)
                .directive('uiFooter', footerDirective)
                .directive('uiSuggestion', suggestionDirective);

export default core;

