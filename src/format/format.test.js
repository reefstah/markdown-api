import test from 'ava';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import {Format} from "./format";


test('happyFlow', t => {

    return new Format(format)
        .obs()
        .do(console.log)
        .toPromise()
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

const markdown = "# News Article" +
    "" +
    "Some pargraph text 1" +
    "" +
    "Second paragraph 2" +
    "" +
    "## Sub management Article" +
    "" +
    "Summmary text please read paragraph" +
    "" +
    "Prelimary conclusion paragraph";

const result = {
    title: 'News Article',
    content: [
        'Some pargraph text 1',
        'Second paragraph 2'
    ],
    nested: {
        title: 'Sub management Article',
        content: {
            summary: 'Summmary text please read paragraph',
            conclusion: 'Prelimary conclusion paragraph'
        }
    }
};