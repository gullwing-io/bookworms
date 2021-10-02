import { fetchBookmarkConfig } from './load-bookmarks.js'
import { writeBookmarks } from './save-bookmarks.js'
import * as chrome from './templates/chrome.js';
import * as readme from './templates/readme.js';

const createBookmarks = async (bookmarks, directory) => {
    const {type, body} = await fetchBookmarkConfig(bookmarks);
    console.log(`Fetching ${type} bookmarks from ${bookmarks}`)
    const generatedBookmarks = generateImportBookmarkMarkup(body);
    generatedBookmarks.forEach(({filename})=> {
        console.log(`Writing ${filename} to ${directory}`)
    })
    writeBookmarks(directory, generatedBookmarks);
}

const generateImportBookmarkMarkup = (config) => {
    return [
        {
            filename: 'chrome.html',
            body:chrome.bookmark(generateTimeStamp(), config.label, config.description, traverseStructure(config, 'chrome')) 
        },
        {
            filename: 'readme.md',
            body: readme.bookmark(generateTimeStamp(), config.label, config.description, traverseStructure(config, 'readme'))
        }
    ]
}

const traverseStructure = ({ bookmarks, folders }, type) => {
    const arr = [];
    if (folders) {
        arr.push(traverseFolders(folders, type))
    }
    if (bookmarks) {
        arr.push(traverseBookmarks(bookmarks, type))
    }
    return arr.join('')
}

const traverseFolders = (folders, type) => {
    const arr = [];
    folders.forEach((folder) => {
        const children = traverseStructure(folder, type);
        // todo fix the depth of folder headings for Readme
        arr.push(generateBookmarkFolderMarkup(1, folder.label, folder.description, children, type))
    })
    return arr.join('');
}

const traverseBookmarks = (bookmarks, type) => {
    const arr = [];
    bookmarks.forEach((bookmark) => {
        arr.push(generateBookmarkLinkMarkup(bookmark, type))
    })
    return arr.join('');
}

const generateBookmarkFolderMarkup = (index, label, description, children, type) => {
    switch (type) {
        case 'chrome':
            return chrome.bookmarkFolder(generateTimeStamp(), label, description, children)
        case 'readme':
            return readme.bookmarkFolder(index, label, description, children)
    }
}

const generateBookmarkLinkMarkup = (bookmark, type) => {
    switch (type) {
        case 'chrome':
            return chrome.bookmarkLink(generateTimeStamp(), bookmark.label, bookmark.description, bookmark.href)
        case 'readme':
            return readme.bookmarkLink(bookmark.label, bookmark.description, bookmark.href)
    }
}

// This might be a bit unnecessary but it might expand in the future 
const generateTimeStamp = () => {
    return Date.now()
}

export {createBookmarks, generateImportBookmarkMarkup, traverseStructure, traverseFolders, traverseBookmarks, generateBookmarkFolderMarkup, generateBookmarkLinkMarkup, generateTimeStamp}