#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generateBookmarks, mergeBookmarks } from "../src/index.js";

const getCommand = {
  command: "get <bookmarks>",
  desc: "Local path or remote URL",
  handler: (argv) => {
    console.log("GETTING BOOKMARKS");
    generateBookmarks.createBookmarks(argv.bookmarks, argv.directory);
  },
};

const mergeCommand = {
  command: "merge <bookmarks..>",
  desc: "Array of paths or URLs you want to merge",
  builder: (yargs) => {
    yargs.option("t", {
      alias: "text",
      demandOption: false,
      describe: "Description of your top level bookmarks folder",
      type: "string",
    });
    yargs.option("l", {
      alias: "label",
      demandOption: false,
      describe: "Top level folder name for merged bookmarks",
      type: "string",
    });
  },
  handler: (argv) => {
    console.log("MERGING BOOKMARKS");
    mergeBookmarks.createBookmarks(
      argv.bookmarks,
      argv.directory,
      argv.label,
      argv.text
    );
  },
};

yargs(hideBin(process.argv))
  .option("d", {
    alias: "directory",
    demandOption: false,
    default: "./",
    describe: "The directory where the files are generated",
    type: "string",
  })
  .demandOption(
    ["bookmarks"],
    "You need to supply the location of your bookmarks"
  )
  .command(getCommand)
  .command(mergeCommand)
  .help().argv;
