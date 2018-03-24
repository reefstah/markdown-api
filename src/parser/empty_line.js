import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';


export class EmptyLineParser {

    constructor() {
        this.regEx = /^\s*$/
    }

    parse(text) {
        const result = this.regEx.exec(text);
        return result ? Observable.of(new EmptyLine()) : Observable.empty();
    }
}

export class EmptyLine {
}