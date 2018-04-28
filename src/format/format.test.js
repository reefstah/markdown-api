import test from 'ava';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/toArray';

import {Format} from "./format";


test('happyFlow', t => {

    const FORMAT = {
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

    const FLAT_FORMAT = [
        {path: ['title'], type: 'header'},
        {path: ['content'], type: 'paragraph'},
        {path: ['content'], type: 'paragraph'},
        {path: ['nested', 'title'], type: 'header'},
        {path: ['nested', 'content', 'summary'], type: 'paragraph'},
        {path: ['nested', 'content', 'conclusion'], type: 'paragraph'}
    ];

    return new Format(FORMAT)
        .obs()
        .toArray()
        .toPromise()
        .then(result => t.deepEqual(result, FLAT_FORMAT));
});


test('objectArrayFormat', t => {

    const FORMAT = {
        articles: {
            type: 'object',
            count: 3,
            format: {
                title: 'header',
                paragraphs: {
                    type: 'paragraph',
                    count: 3
                }
            }
        }
    };

    const FLAT_FORMAT = [
        {path: ['articles', 0, 'title'], type: 'header'},
        {path: ['articles', 0, 'paragraphs'], type: 'paragraph'},
        {path: ['articles', 0, 'paragraphs'], type: 'paragraph'},
        {path: ['articles', 0, 'paragraphs'], type: 'paragraph'},

        {path: ['articles', 1, 'title'], type: 'header'},
        {path: ['articles', 1, 'paragraphs'], type: 'paragraph'},
        {path: ['articles', 1, 'paragraphs'], type: 'paragraph'},
        {path: ['articles', 1, 'paragraphs'], type: 'paragraph'},

        {path: ['articles', 2, 'title'], type: 'header'},
        {path: ['articles', 2, 'paragraphs'], type: 'paragraph'},
        {path: ['articles', 2, 'paragraphs'], type: 'paragraph'},
        {path: ['articles', 2, 'paragraphs'], type: 'paragraph'}
    ];

    return new Format(FORMAT)
        .obs()
        .toArray()
        .toPromise()
        .then(result => t.deepEqual(result, FLAT_FORMAT));
});