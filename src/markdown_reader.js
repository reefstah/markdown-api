import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/zip';

import 'rxjs/add/observable/from';


import {FileObservable} from "./file_observable";
import {decayCount} from "./operator/decay_count";

import {HeaderParser} from "./parser/header";
import {CodeSpanParser} from "./parser/code_span";
import {Paragraph, ParagraphParser} from "./parser/paragraph";
import {isNotBlankLine} from "./parser/blank_line";
import {Format} from "./format/format";


export class MarkdownReader {

    constructor(obs, format) {
        this.obs = obs;
        this.format = format;

        this.STACK_SIZE = 50;

        this.parsers = [
            new HeaderParser(),
            new CodeSpanParser(),
            new ParagraphParser()
        ];
    }

    static fromFile(filePath) {
        return new MarkdownReader(FileObservable.from(filePath));
    }

    static from(text, format) {
        const obs = Observable.from(text.split('\n'));
        return new MarkdownReader(obs, format);
    }

    read() {
        return this.obs
            .pipe(
                decayCount(this.STACK_SIZE)
            )
            .map(stack => stack.join('\n'))
            .filter(isNotBlankLine)
            .map(stack => this.match(stack))
            .concatAll()
            .distinctUntilChanged((markdown1, markdown2) => markdown1.text.includes(markdown2.text))
            .zip(new Format(this.format).obs(), (markdown, formatRule) => ({markdown, formatRule}))
            .reduce((acc, value) => this.reduce(acc, value), {});
    }

    match(text) {
        return Observable
            .from(this.parsers)
            .map(parser => parser.parse(text))
            .concatAll()
            .reduce((acc, curr) => {
                if (curr instanceof Paragraph) return acc;
                if (acc instanceof Paragraph) return curr;
                throw new Error(`Conflict while parsing, either ${acc} or ${curr} regular expression is incorrect.`);
            });
    }

    reduce(acc, value) {

        const {markdown, formatRule} = value;
        const {path, type} = formatRule;
        const {name, text} = markdown;

        let current = acc;


        if (name !== type)
            throw new Error(`Type mismatch expected ${type}, but got ${name} with text ${text}`);


        for (let i = 0; i < path.length - 1; i++)
            current = current[path[i]] = current[path[i]] || {};

        const lastProperty = path[path.length - 1];

        if (!current[lastProperty])
            current[lastProperty] = text;
        else if (current[lastProperty] && current[lastProperty].length)
            current[lastProperty].push(text);
        else
            current[lastProperty] = [current[lastProperty], text];

        return acc;
    }
}