#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { generateBookmarks } from '../src/index.js'

const argv = yargs(hideBin(process.argv))
.option('d', {
    alias: 'directory',
    demandOption: false,
    default: './',
    describe: 'The directory where the files are generated',
    type: 'string'
})
.command('get <bookmarks>', 'Local path or remote URL')
.demandOption(['bookmarks'], 'You need to supply the location of your bookmarks')
.argv

generateBookmarks.createBookmarks(argv.bookmarks, argv.directory)
