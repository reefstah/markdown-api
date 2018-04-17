import test from 'ava';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';


import {MarkdownReader} from "./markdown_reader";

test('happyFlow', t => {

    return MarkdownReader
        .from(SMOLL_HIPSTER_IMPSUM_TEXT, FORMAT)
        .read()
        .toPromise()
        .then(result => {
            return t.deepEqual(result, RESULT);
        });
});

const SMOLL_HIPSTER_IMPSUM_TEXT = '' +
    '# A header \n' +
    'A body';

const FORMAT = {
    header: 'header',
    body: 'paragraph'
};

const RESULT = {
    header: 'A header',
    body: 'A body'
};