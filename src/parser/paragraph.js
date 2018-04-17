import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';

export class ParagraphParser {

    constructor() {
        this.regEx = /^.*(?:\n(?!\n).*)*/
    }

    parse(text) {
        const result = this.regEx.exec(text);
        return result ? Observable.of(new Paragraph(result[0])) : Observable.empty();
    }
}

export class Paragraph {

    constructor(text) {
        this.text = text;
    }

    static get name() {
        return 'paragraph';
    }

    get name() {
        return Paragraph.name;
    }
}