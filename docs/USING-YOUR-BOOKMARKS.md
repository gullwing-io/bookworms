# Using your bookmarks

As mentioned in the top level [documentation](../README.md) you can generate bookmarks with the command:

```BASH
npx bookworms get ./my-bookmarks.yaml
```

However now you have your exports then what?

## Recommendations

You should first create a repository for your bookmark YMAL file, this will allow different people to contribute and give you all the audit controls you expect with Git. Once this is created you can generate your first exports using and then check them into the repository too.

The `README.md` will then make it document and all the URLs will then be accessible to anyone with Git access. Then whoever has access can use the `browsers.html` file and import it into their browser.

Each time you make a change to the `YAML` you will need to rerun bookworms and check in the changes files. The next step is to add a GitHub action to remove this step but for now, this is manual.

### Integrate with Slack

You can now [integrate Bookworms directly with Slack](https://github.com/thearegee/bookworms-slack-webhook).

### Importing bookmarks into your browser

Bookmarks have a standard HTML structure for importing and exporting, Bookworms takes advantage of this. The following browsers have been tested and work successfully:

- [Chrome](https://support.google.com/chrome/answer/96816?hl=en-GB)
- [Safari](https://support.apple.com/en-gb/guide/safari/ibrw1015/mac)
- [Edge](https://support.microsoft.com/en-us/windows/move-internet-explorer-favorites-to-a-new-pc-a03f02c7-e0b9-5d8b-1857-51dd70954e47)
- [Firefox](https://support.mozilla.org/en-US/kb/import-bookmarks-html-file)
- [Brave](https://support.brave.com/hc/en-us/articles/360019782291-How-do-I-import-or-export-browsing-data-)

You can find instructions of how to import bookmarks on the links above, other browsers might also work but they have not yet been tested.

#### Example of importing bookmarks into Chrome

You can import bookmarks into Chrome following the standard action: [https://support.google.com/chrome/answer/96816?hl=en-GB](https://support.google.com/chrome/answer/96816?hl=en-GB).

If you have no bookmarks in your bookmark bar they will then follow this structure:

```
Bookmarks Bar/
├── Bookworms/
│   ├── folder 1/
│       ├──...
│   ├── .../
├──...
```

However if you already have bookmarks in in your bookmark bar it will look like this:

```
Bookmarks Bar/
├── Imports/
│   ├Bookworms/
│      ├── folder 1/
│          ├──...
│      ├── .../
├──...
```

It is worth noting that because anyone can update bookmarks and therefore the `browsers.html` you might want to watch this repository and run this process again when a change comes in.
