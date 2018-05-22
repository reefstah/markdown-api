import express from 'express';

import fs from 'fs';
import path from 'path';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/merge';


export class Server {

    constructor(config) {
        this.app = express();
        this.dirPath = config.dirPath;
    }

    start() {
        readDirTree(this.dirPath, 2)
            .subscribe(console.log);
    }
}


function readDirTree(dir, deep) {

    return Observable
        .bindNodeCallback(fs.readdir)(dir)
        .map(fileNameList => Observable.from(fileNameList))
        .concatAll()
        .map(name => path.resolve(dir, name))
        .map(dirPath => Observable.bindNodeCallback(fs.stat)(dirPath).filter(stats => stats.isDirectory()).map(bool => dirPath))
        .concatAll()
        .map(dirPath => 1 < deep ? readDirTree(dirPath, deep - 1).merge(Observable.of(dirPath)) : Observable.of(dirPath))
        .concatAll()
}