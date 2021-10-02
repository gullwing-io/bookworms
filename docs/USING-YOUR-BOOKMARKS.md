# Using your bookmarks

As mentioned in the top level [documentation](../README.md) you can generate bookmarks with the command:

```BASH
npx bookworms get ./my-bookmarks.yaml
```

However now you have your exports then what?

## Recommendations

You should first create a repository for your bookmark YMAL file, this will allow different people to contribute and give you all the audit controls you expect with Git. Once this is created you can generate your first exports using and then check them into the repository too.

The `readme.md` will then make it document and all the URLs will then be accessible to anyone with Git access. Then whoever has access can use the `chrome.html` file and import it into their browser.

Each time you make a change to the `YAML` you will need to rerun bookworms and check in the changes files. The next step is to add a GitHub action to remove this step but for now, this is manual.

### Importing bookmarks

You can import bookmarks into Chrome following the standard action: [https://support.google.com/chrome/answer/96816?hl=en-GB](https://support.google.com/chrome/answer/96816?hl=en-GB). 

If they have no bookmarks in their bar they will then find this structure:

```
Bookmarks Bar/
├── Bookworms/
│   ├── folder 1/
│       ├──...
│   ├── .../
├──...
```

If however they already have bookmarks in their bar it will look like this:

```
Bookmarks Bar/
├── Imports/
│   ├Bookworms/
│      ├── folder 1/
│          ├──...
│      ├── .../
├──...
```

It is worth noting that because anyone can update bookmarks and thus the `chrome.html` you might want to watch this repository and run this process again when a change comes in.