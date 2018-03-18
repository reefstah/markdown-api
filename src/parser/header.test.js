import test from 'ava';
import 'rxjs/add/operator/toPromise';

import {HeaderParser} from './header';

test('foo', t => {

    return new HeaderParser()
        .parse('# markdown \n')
        .toPromise()
        .then(result => {
            t.is(result[1], 'markdown');
        });
});
