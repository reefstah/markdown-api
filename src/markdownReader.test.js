import test from 'ava';
import path from 'path';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';


import {MarkdownReader} from "./markdownReader";

test('happyFlow', t => {

    return MarkdownReader
        .fromFile(path.join(__dirname, '../README.md'))
        .read()
        .do(console.log)
        .toPromise()
});
