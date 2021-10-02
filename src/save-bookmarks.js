import { mkdirSync, writeFileSync } from 'fs';

const writeBookmarks = (directory, bookmarks) => {
    bookmarks.forEach(({filename, body})=> {
        try {
            mkdirSync(directory, { recursive: true});
            writeFileSync(`${trimTrailingSlash(directory)}/${filename}`, body)
        } catch (error) {
            // todo write test for this error condition
            console.error(error.message)
        }
    })
}

const trimTrailingSlash = (directory) => {
    return directory.replace(/\/$/, "");
}

export {writeBookmarks, trimTrailingSlash}
