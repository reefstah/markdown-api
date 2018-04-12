import test from 'ava';
import 'rxjs/add/operator/toPromise';

import {HeaderParser} from './header';

test('happyFlow', t => {

    return new HeaderParser()
        .parse('# markdown \n')
        .toPromise()
        .then(result => {
            t.deepEqual(result.text, 'markdown');
        });
});