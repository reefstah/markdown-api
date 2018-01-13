import fs from 'fs';
import path from 'path';

class MarkdownReader {

    constructor() {
        this.filePath = path.join(__dirname, '../src/example.md');
        this.document = [];
    }



    read() {
        fs.readFile(this.filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err) {

                let name = 'paragraph';
                let buffer;

                data
                    //.split('\n')
                    .split('')
                    .forEach(char => {
                        console.log(char);


                    })


            } else {
                console.log(err);
            }
        });
    }
}

new MarkdownReader().read();