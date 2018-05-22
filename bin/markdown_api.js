#!/usr/bin/env node

const path = require('path');

const program = require('commander');
const version = require('../package').version;
const Server = require('../dist/server');

const cwd = process.cwd();

program
    .version(version);

program
    .command('start <dir>')
    .description('starts a markdownAPI server')
    .option('-c --config <path>', 'set the config path defaults to file in given direcory with same name, thus <dirName>.js')
    .option('-p --port <port>', 'set the port on which the server listens')
    .action((dir, options) => {


        new Server.Server({
            dirPath: dir
        })
            .start();
    });


program.parse(process.argv);