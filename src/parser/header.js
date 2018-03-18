import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';


export class HeaderParser {

    constructor() {
        this.regEx = /^#[ \t]+(.+?)[ \t]*#*\n+/g;
    }

    parse(text) {
        const result = this.regEx.exec(text);
        return result ? Observable.of(result) : Observable.empty();
    }
}

// export class Header {
//
//     constructor(content, number, multiLine) {
//         this.content = content;
//         this.number = number;
//         this.multiLine = multiLine;
//     }
//
//     get isMultiLine() {
//         return this.multiLine;
//     }
//
//     toObject() {
//         const key = `h${this.number}`;
//         return {key: content};
//     }
// }