import path from 'path';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/do';

import {FileObservable} from "./FileObservable";
import {DecayingObservable} from "./DecayingObservable";

import {HeaderParser} from "./parser/header";

export class MarkdownReader {

    constructor(obs) {
        this.obs = obs;
        this.STACK_SIZE = 50;
    }

    static fromFile(filePath) {
        return new MarkdownReader(FileObservable.from(filePath));
    }

    read() {
        return DecayingObservable
            .from(this.obs, this.STACK_SIZE)
            .map(stack => new HeaderParser().parse(stack))
            .concatAll()
    }
}

MarkdownReader
    .fromFile(path.join(__dirname, '../README.md'))
    .read()
    .subscribe(
        stack => console.log(stack),
        e => console.log(e),
        () => console.log('success')
    );