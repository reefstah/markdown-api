import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';


export class HeaderParser {

    constructor() {
        this.regEx = /^#[ \t]+(.+?)[ \t]*#*\n+/g;
    }

    parse(text) {
        const result = this.regEx.exec(text);
        return result ? Observable.of(new Header(result[1])) : Observable.empty();
    }
}

export class Header {

    constructor(text) {
        this.text = text;
    }

    get() {
        return {header: this.text}
    }
}