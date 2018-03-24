import test from 'ava';
import 'rxjs/add/operator/toPromise';

import {CodeSpanParser} from './code_span';

test('happyFlow', t => {

    return new CodeSpanParser()
        .parse('`markdown` \n')
        .toPromise()
        .then(result => {
            t.deepEqual(result.get(), {codeSpan: 'markdown'});
        });
});
