import {FileObservable} from "./FileObservable";

import path from 'path';
import {DecayingObservable} from "./DecayingObservable";

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
            .from(this.obs, this.STACK_SIZE);
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