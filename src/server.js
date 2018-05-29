import express from 'express';

import fs from 'fs';
import path from 'path';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
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
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/repeat';

import {MarkdownReader} from "./markdown_reader";


export class Server {

    constructor(config) {
        this.dirPath = path.resolve(config.dirPath);
    }

    start() {

        this.getResourceConfigs(this.dirPath, 5)
            .reduce(
                (app, resourceConfig) =>
                    app.get(resourceConfig.path, (req, res) => this.controller(req, res, resourceConfig)),
                express()
            )
            .subscribe(app => app.listen(9000));
    }

    controller(req, res, resourceConfig) {

        let filePathObs = Observable
            .bindNodeCallback(fs.readdir)(resourceConfig.source)
            .concatMap(fileNameList => Observable.from(fileNameList))
            .filter(name => name.endsWith('.md') && name !== 'README.md')
            .map(name => `${resourceConfig.source}/${name}`);

        let formatObs = Observable
            .bindNodeCallback(fs.readFile)(resourceConfig.format)
            .map(buff => JSON.parse(buff))
            .repeat();

        Observable
            .zip(filePathObs, formatObs)
            .map(config => MarkdownReader.fromFile(config[0], config[1]))
            .concatMap(reader => reader.read())
            .reduce((acc, value) => acc.concat(value), [])
            .subscribe(result => res.send(result));
    }


    getResourceConfigs(rootDir, deep) {

        return Observable
            .bindNodeCallback(fs.readdir)(rootDir)
            .concatMap(fileNameList => Observable.from(fileNameList))
            .map(
                name => {
                    const dir = path.resolve(rootDir, name);
                    const resourcePath = dir.replace(this.dirPath, '');

                    return {
                        source: dir,
                        format: `${dir}/${name}.format.json`,
                        path: resourcePath
                    };
                })
            .concatMap(resourceConfig => Observable.bindNodeCallback(fs.stat)(resourceConfig.source).filter(stats => stats.isDirectory()).map(bool => resourceConfig))
            .concatMap(
                resourceConfig => 1 < deep ?
                    this.getResourceConfigs(resourceConfig.source, deep - 1).merge(Observable.of(resourceConfig)) :
                    Observable.of(resourceConfig)
            )
            .filter(resourceConfig => fs.existsSync(resourceConfig.format));
    }
}