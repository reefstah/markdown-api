#!/usr/bin/env node

const program = require('commander');
const version = require('../package').version;
const Server = require('../dist/server');


program
    .version(version);

program
    .command('start <dir>')
    .description('starts a markdownAPI server')
    .option('-p --port <port>', 'set the port on which the server listens', value => parseInt(value, 10), 9000)
    .option('-d --deep <deep>', 'set how deep should the server go in the given directory', value => parseInt(value, 10), 7)
    .action((dir, options) => {

        new Server
            .Server(dir, options.port, options.deep)
            .start();
    });


program.parse(process.argv);