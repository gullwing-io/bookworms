# Developers

If you want to contribute or are interested in building something with bookworms here is how to get started.

## Importing Bookworms modules

Add Bookworms into your project.

```Bash
$ npm i bookworms
```

Bookworms has all of its modules available to be imported into another project if you are interested in building on top of it. You should note that it uses [ECMAScript modules](https://nodejs.org/api/vm.html#vm_class_vm_module) which were introduced in Node 14, to take advantage of these you might want to consider the following.

Include a `.nvmrc` to use a version of node that supports [ECMAScript modules](https://nodejs.org/api/vm.html#vm_class_vm_module).

```BASH
# .nvmrc
# Used to run the correct node version
14
```

Add into your `.package.json`:

```JSON
"type": "module"
```

You can now import Bookworms into your project.

```JS
import {loadBookmarks, generateBookmarks, saveBookmarks} from 'bookworms';
```

These give you access to different functions used to generate Bookmarks.

#### `loadBookmarks`

A collection of helpers for loading bookmarks.

* `fetchBookmarkConfig(path)` - load local or remote bookmarks from path
* `shouldFetchFromLocal(path)` - undersstand if a path is local or remote
* `fetchLocaleBookmarkConfig(path)` - load bookmarks from `fs`
* `fetchRemoteBoomarkConfig(path)` - load bookmarks from `http` request
* `returnResponseAsJsonOn2xx(body, statusCode, path)` - handle non 2xx `http` responses
* `returnResponseAsObject(response, path)` - return javascript object, converting YAML or JSON

#### `generateBookmarks`

A collection of helpers for generating bookmarks.

* `createBookmarks(bookmarks, directory)` - create string of bookmarks to be used in other tools
* `generateImportBookmarkMarkup(config)` - from loaded bookmark config create the different types of exports wanted
* `traverseStructure({ bookmarks, folders }, type)` - traverse the strutcure of the bookmarks
* `traverseFolders(folders, type)` - traverse the folders within the bookmarks
* `traverseBookmarks(bookmarks, type)` - traverse the individual bookmarks within the bookmark config
* `generateBookmarkFolderMarkup(index, label, description, children, type)` - pass values into template and get back string of folder markup
* `generateBookmarkLinkMarkup(bookmark, type)` - pass values into template and get back string of bookmark markup
* `generateTimeStamp()` - generate timestamp for when Bookworms was run

#### `generateBookmarks`

A collection of helpers for saving bookmarks.

* `writeBookmarks(directory, bookmarks)` - Writing the bookmark populated templates to `fs`
* `trimTrailingSlash(directory)` - remove trailing slashes from string

## Contributing to Bookworms

If you want to add features to Bookworms you will need to know how to work with the project.

```BASH
$ git clone https://github.com/thearegee/bookworms.git
$ cd bookworms
$ nvm use
$ npm i
```

### Running the executable script

Within the `./bin` folder you have a script you can execute, which can be done in a couple of ways:

``` BASH
# Directly from node
$ node --experimental-vm-modules ./bin/index.js
# npm
$ npm start
```

All of these will return the following:

``` BASH
index.js [command]

Commands:
  index.js get <bookmarks>  Local path or remote URL

Options:
      --help       Show help                                           [boolean]
      --version    Show version number                                 [boolean]
  -d, --directory  The directory where the files are generated
                                                        [string] [default: "./"]
      --bookmarks                                                     [required]

Missing required argument: bookmarks
You need to supply the location of your bookmarks
```
You can see that there was no bookmarks passed, these are two examples you could use:

```BASH
# Remote config
$ npm start -- get https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml
# Locale config
$ npm start -- get ./demo/config/boomarks.yaml
```

by default this will export the files into `./` but if you want to change this you can with the flag `-d` or `--directory`.

```BASH
# Locale config
$ npm start -- get ./demo/config/boomarks.yaml -d="./tmp"
```

### Testing

Bookworms uses [`Jest`](https://jestjs.io/) for unit tests and will dogfood itself to ensure the remote and local YMAL generate the correct exports.

```BASH
# Single run
$ npm test
# Watched files that change
$ npm run test:watch
```