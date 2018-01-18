import test from 'ava';

import {HeaderParser} from './header';

test('foo', t => {

    return new HeaderParser()
        .parse('#markdown')
        .then(result => {
            t.is(result, 'markdown')
        });
});
