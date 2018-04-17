import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';


export class HeaderParser {

    constructor() {
        this.regEx = /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
    }

    parse(text) {
        const result = this.regEx.exec(text);
        return result ? Observable.of(new Header(result[1].length, result[2])) : Observable.empty();
    }
}

export class Header {

    constructor(value, text) {
        this.text = text;
        this.value = value;
    }

    static get name() {
        return 'header';
    }

    get name() {
        return Header.name;
    }
}