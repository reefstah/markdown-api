import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/observable/of';

import {FileObservable} from "./FileObservable";
import {DecayingObservable} from "./DecayingObservable";

import {HeaderParser} from "./parser/header";
import {CodeSpanParser} from "./parser/codeSpan";
import {Paragraph, ParagraphParser} from "./parser/paragraph";

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

    read() {
        return DecayingObservable
            .from(this.obs, this.STACK_SIZE)
            .map(stack => this.match(stack))
            .concatAll()
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