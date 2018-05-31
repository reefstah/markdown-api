import express from 'express';

import fs from 'fs';
import path from 'path';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/bindNodeCallback';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/repeat';
import 'rxjs/add/operator/do';

import {MarkdownReader} from "./markdown_reader";


export class Server {

    constructor(config) {
        this.dirPath = path.resolve(config.dirPath);
    }

    start() {

        this.getConfigs(this.dirPath, this.dirPath, 5)
            .do(console.log)
            .reduce(
                (app, config) =>
                    app.get(config.path, (req, res) => this.controller(req, res, config)),
                express()
            )
            .subscribe(app => app.listen(9000));
    }

    controller(req, res, config) {

        const filePathObs = getFilesObs(config.source);
        const formatObs = getFormatObs(config.format);

        Observable
            .zip(filePathObs, formatObs)
            .map(config => MarkdownReader.fromFile(config[0], config[1]))
            .concatMap(reader => reader.read())
            .reduce((acc, value) => acc.concat(value), [])
            .subscribe(result => res.send(result));


        function getFilesObs(source) {
            return Observable
                .bindNodeCallback(fs.readdir)(source)
                .concatMap(fileNameList => Observable.from(fileNameList))
                .filter(name => name.endsWith('.md') && name !== 'README.md')
                .map(name => `${source}/${name}`);
        }

        function getFormatObs(format) {
            return Observable
                .bindNodeCallback(fs.readFile)(format)
                .map(buff => JSON.parse(buff))
                .repeat();
        }
    }


    getConfigs(current, root, deep) {

        return Observable
            .bindNodeCallback(fs.readdir)(current)
            .concatMap(fileNameList => Observable.from(fileNameList))
            .map(name => createConfig(name, current, root))
            .concatMap(filterDirsAsync)
            // This might be over-engineered, considering removal
            .concatMap(config => decentDir(config, deep, this.getConfigs))
            .filter(config => fs.existsSync(config.format));


        function createConfig(name, current, root) {

            const dir = path.resolve(current, name);
            const resourcePath = dir.replace(root, '');

            return {
                source: dir,
                format: `${dir}/${name}.format.json`,
                path: resourcePath
            };
        }

        function filterDirsAsync(config) {
            return Observable
                .bindNodeCallback(fs.stat)(config.source)
                .filter(stats => stats.isDirectory())
                .map(() => config);
        }

        function decentDir(config, deep, recursiveFunc, root) {
            return 1 < deep ?
                recursiveFunc(config.source, root, deep - 1).merge(Observable.of(config)) :
                Observable.of(config);
        }
    }
}