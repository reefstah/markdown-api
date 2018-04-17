import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/from';


import {Paragraph} from "../parser/paragraph";
import {Header} from "../parser/header";

export class Format {

    constructor(format) {

        this.markdownElementNames = [
            Paragraph.name,
            Header.name
        ];

        this.format = format;
    }

    obs() {
        const generator = this.toPath(this.format, []);
        return Observable.from(generator);
    }

    * toPath(format, path) {

        for (let entry of Object.entries(format)) {

            let key;
            let value;

            [key, value] = entry;


            if (this.markdownElementNames.includes(value))
                yield {
                    path: path.concat([key]),
                    type: value
                };

            else if (value.type) {
                const count = value.count ? value.count : 1;
                for (let i = 0; i < count; i++)
                    yield {
                        path: path.concat([key]),
                        type: value.type
                    };
            }

            else for (const i of this.toPath(value, path.concat([key]))) yield i;
        }

    }
}