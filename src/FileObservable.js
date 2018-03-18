import fs from 'fs';
import readLine from 'readline';
import {Observable} from 'rxjs/Observable';

export class FileObservable {

    static from(filePath) {

        return Observable.create(obs => {

            const lineReader = readLine.createInterface({
                input: fs.createReadStream(filePath),
                crlfDelay: Infinity
            });

            lineReader.on('line', (line) => {
                obs.next(line);
            }).on('error', (error) => {
                obs.error(error);
            }).on('close', () => {
                obs.complete();
            });
        });
    };
}