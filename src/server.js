import express from 'express';

import fs from 'fs';
import path from 'path';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/bindNodeCallback';

import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concatMap';


export class Server {

    constructor(config) {
        this.app = express();
        this.dirPath = config.dirPath;
    }

    start() {
        getDirConfigs(this.dirPath, 5)
            .subscribe(console.debug);
    }
}


function getDirConfigs(rootDir, deep) {

    return Observable
        .bindNodeCallback(fs.readdir)(rootDir)
        .concatMap(fileNameList => Observable.from(fileNameList))
        .map(
            name => {
                const dirPath = path.resolve(rootDir, name);
                return {path: dirPath, config: `${dirPath}/${name}.json`};
            })
        .concatMap(dirConfig => Observable.bindNodeCallback(fs.stat)(dirConfig.path).filter(stats => stats.isDirectory()).map(bool => dirConfig))
        .concatMap(
            dirConfig => 1 < deep ?
                getDirConfigs(dirConfig.path, deep - 1).merge(Observable.of(dirConfig)) :
                Observable.of(dirConfig))
        .filter(dirConfig => fs.existsSync(dirConfig.config));
}