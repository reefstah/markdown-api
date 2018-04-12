import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';

import 'rxjs/add/observable/from';


import {FileObservable} from "./file_observable";
import {decayCount} from "./operator/decay_count";

import {HeaderParser} from "./parser/header";
import {CodeSpanParser} from "./parser/code_span";
import {Paragraph, ParagraphParser} from "./parser/paragraph";
import {isNotBlankLine} from "./parser/blank_line";


export class MarkdownReader {

    constructor(obs) {
        this.obs = obs;
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

    static from(text) {
        const obs = Observable.from(text.split('\n'));
        return new MarkdownReader(obs);
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
}