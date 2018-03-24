import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';


export class CodeSpanParser {

    constructor() {
        this.regEx = /^(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/g
    }

    parse(text) {
        const result = this.regEx.exec(text);
        return result ? Observable.of(new CodeSpan(result[3])) : Observable.empty();
    }
}

export class CodeSpan {

    constructor(text) {
        this.text = text;
    }

    get() {
        return {codeSpan: this.text}
    }
}