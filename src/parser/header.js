import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/zip';

import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class HeaderParser {

    parse(line, reader) {

        return new Promise(function (resolve, reject) {
            if (line.startsWith('#')) {

                const startNumberObs = getHeadingNumber(line);
                const endNumberObs = getHeadingNumber(line.split('').reverse().join(''));

                const result = Observable
                    .zip(startNumberObs, endNumberObs, (startNumber, endNumber) => ({startNumber, endNumber}))
                    .map(cutInfo => line.slice(cutInfo.startNumber, line.size).slice(line.size - cutInfo.endNumber, line.size))
                    .toPromise();

                resolve(result);
            }
            reject();
        });
    }
}

function getHeadingNumber(line) {
    return Observable
        .from(line)
        .takeWhile(char => char === '#')
        .count();
}

export class Header {

    constructor(content, number, multiLine) {
        this.content = content;
        this.number = number;
        this.multiLine = multiLine;
    }

    get isMultiLine() {
        return this.multiLine;
    }

    toObject() {
        const key = `h${this.number}`;
        return {key: content};
    }
}