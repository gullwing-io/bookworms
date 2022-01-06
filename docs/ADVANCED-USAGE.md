# Advanced usage

The top level [README](../README.md) shows the basic `get` functionality but there are more options and ways to see Bookworms.

## Get

Create bookmarks from local or remote `YMAL`.

```BASH
$ npx bookworms get ./my-bookmarks.yaml
```

This will then generate in the `./` folder the different exports you can then use in your older tools.

```BASH
$ cd output
$ ls
browsers.html readme.md
```

You can also fetch bookmarks from a remote location and output the exports into a directory:

```BASH
$ npx bookworms get https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml -d="./output"
```

## Merge

`merge` works the same as `get` with the same options but it allows you to create bookmarks from multiple local or remote `YAML`.

```BASH
$ npx bookworms merge ./my-bookmarks.yaml ./my-company-bookmarks.yaml https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml
```

In this example Bookworms is merging together multiple bookmark `YAML` files it will be default merge them into one top level folder called "Merged worms" but you can override the label and the description with the command:

```BASH
$ npm start -- merge ./my-bookmarks.yaml ./my-company-bookmarks.yaml https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml -l="My bookmarks" -t="Bookmarks my personal bookmarks, my bookmarks from work and remote bookmarks that interest me"
```
