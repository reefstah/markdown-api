import test from 'ava';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/toArray';

import {Format} from "./format";


test('happyFlow', t => {

    return new Format(format)
        .obs()
        .toArray()
        .toPromise()
        .then(result => t.deepEqual(result, segments));
});


const segments = [
    {path: ['title'], type: 'header'},
    {path: ['content'], type: 'paragraph'},
    {path: ['content'], type: 'paragraph'},
    {path: ['nested', 'title'], type: 'header'},
    {path: ['nested', 'content', 'summary'], type: 'paragraph'},
    {path: ['nested', 'content', 'conclusion'], type: 'paragraph'}
];


const format = {
    title: 'header',
    content: {
        type: 'paragraph',
        count: 2
    },
    nested: {
        title: 'header',
        content: {
            summary: 'paragraph',
            conclusion: 'paragraph'
        }
    }
};