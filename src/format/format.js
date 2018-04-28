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

        for (const [key, value] of Object.entries(format)) {

            if (this.markdownElementNames.includes(value))
                yield {
                    path: path.concat([key]),
                    type: value
                };

            else if (value.type && this.markdownElementNames.includes(value.type)) {
                const count = value.count ? value.count : 1;
                for (let i = 0; i < count; i++)
                    yield {
                        path: path.concat([key]),
                        type: value.type
                    };
            }

            else if (value.format && value.type === 'object') {
                const count = value.count ? value.count : 1;
                for (let i = 0; i < count; i++)
                    for (const x of this.toPath(value.format, path.concat([key, i]))) yield x;
            }

            else if (value instanceof String)
                throw new Error(`${value} is not a valid Markdown entry in given format`);

            else
                for (const x of this.toPath(value, path.concat([key]))) yield x;
        }

    }
}