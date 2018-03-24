import test from 'ava';
import 'rxjs/add/operator/toPromise';

import {EmptyLine, EmptyLineParser} from "./empty_line";

test('happyFlow', t => {

    return new EmptyLineParser()
        .parse('\n')
        .toPromise()
        .then(result => t.true(result instanceof EmptyLine));
});
