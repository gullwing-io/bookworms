# Bookworms

**NPX Not yet available, working on it now.**

> Centralise your bookmarks as `YAML` configuration and export them into different formats that can be used with your existing tools.

In a large company there are literally thousands of tools, development environments and HR system URLs to remember. In a start up there maybe many less but in both scenarios there is probably no authority of truth and if there is, it is often out of date. It is also a common on GitHub to see people create `readme` documents listing useful URLs on certain topic.

This tool is designed as a way to keep URLs in a consistent structure so they can generate different types of sharable files. A company can centralize all their URLs, allowing employees to having a consistent upto date experience and taxonomy or developers to share their bookmarks with other people in the community.

## Getting started

First thing you need to do is create your bookmarks `YAML` configuration, below is an example:

```YAML
label: Bookworms
description: These are sample bookmarks to teach you how bookmark works
folders:
  - label: folder 1
    description: This is to describe the folder structure
    folders:
      - label: sub folder 1
        description: This is to describe the sub folder structure
        bookmarks:
          - label: sample url 1
            description: this is used to describe the bookmark
            href: https://www.mywebsite.com
  - label: folder 2
    folders:
      - label: sub folder 2
        bookmarks:
          - label: sample url 2
            description: this is used to describe the bookmark
            href: https://www.mysecondwebsite.com
          - label: sample url 3
            description: this is used to describe the bookmark
            href: https://www.mythirdwebsite.com
      - label: sub folder 3
        bookmarks:
          - label: sample url 4
            description: this is used to describe the bookmark
            href: https://www.mysecondwebsite.com
          - label: sample url 5
            description: this is used to describe the bookmark
            href: https://www.mythirdwebsite.com
```

* `label` - The heading your bookmarks and the folder in when imported into a browser
* `description` - Generates a `HTML` comment or text within `markdown`
* `folders` - A way of grouping together bookmarks, you can nest these as deep as you like
* `bookmarks` - How you group the information for a link to URLs
* `href` - The URL you want to book mark

Once this is ready you can pass it to Bookworms using [`npx`](https://nodejs.dev/learn/the-npx-nodejs-package-runner).

```BASH
npx bookworms get ./my-bookmarks.yaml
```

This will then generate in the `./` folder the different exports you can then use in your older tools.

```BASH
$ cd output
$ ls
chrome.html readme.md
```

You can also fetch bookmarks from a remote location and output the exports into a dirrect directory:

```BASH
npx bookworms get ./https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml -d="./output"
```

## Help

If you need help using Bookworms you can run this command:

```Bash
npx bookworms --help
```

If you want to understand more about Bookworms you can read the following:

* [Using your bookmarks](./docs/USING-YOUR-BOOKMARKS.md)
* [For developers](./docs/DEVELOPERS.md)

## Todo

* Set up GitHub actions for repo to build, test and deploy in NPM
* Support multiple YMAL files and merging together
* Convert existing exported bookmarks into YAML
* Support for other browsers and tools for bookmarks
  * Safari
  * Edge
  * Firefox
  * Brave
  * Notion
  * Google docs
* Bug fix markdown generator header folder depth
* Improve documentation for using bookworms modules
* Allow users to select the exports they want or won't want

## Future

* Create GitHub action to update bookmark repos remotely
* Remove step for people to need to import files in browser
* Add the idea of public bookmarks which could genate trends