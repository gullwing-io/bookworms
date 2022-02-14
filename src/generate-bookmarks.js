import { fetchBookmarkConfig } from "./load-bookmarks.js";
import { writeBookmarks } from "./save-bookmarks.js";
import * as browsers from "./templates/browsers.js";
import * as readme from "./templates/readme.js";

const createBookmarks = async (path, directory) => {
  const { type, body } = await fetchBookmarkConfig(path);
  console.log(`Fetching ${type} bookmarks from ${path}`);
  const generatedBookmarks = generateImportBookmarkMarkup(body);
  generatedBookmarks.forEach(({ filename }) => {
    console.log(`Writing ${filename} to ${directory}`);
  });
  writeBookmarks(directory, generatedBookmarks);
};

const generateImportBookmarkMarkup = (config) => {
  return [
    {
      filename: "browsers.html",
      body: browsers.bookmark(
        generateTimeStamp(),
        config.label,
        config.description,
        traverseStructure(config, "browsers")
      ),
    },
    {
      filename: "README.md",
      body: readme.bookmark(
        generateTimeStamp(),
        config.label,
        config.description,
        traverseStructure(config, "readme")
      ),
    },
  ];
};

const traverseStructure = ({ bookmarks, folders }, type, index = 1) => {
  const arr = [];
  switch (type) {
    case "browsers":
      arr.push(traverseFolders(folders, type, index));
      arr.push(traverseBookmarks(bookmarks, type));
      break;
    case "readme":
      arr.push(traverseBookmarks(bookmarks, type));
      arr.push(traverseFolders(folders, type, index));
  }
  return arr.join("");
};

const traverseFolders = (folders, type, index = 1) => {
  const arr = [];
  if (!folders) {
    return arr;
  }

  folders.forEach((folder) => {
    const children = traverseStructure(folder, type, index + 1);
    arr.push(
      generateBookmarkFolderMarkup(
        index,
        folder.label,
        folder.description,
        children,
        type
      )
    );
  });
  return arr.join("");
};

const traverseBookmarks = (bookmarks, type) => {
  const arr = [];
  if (!bookmarks) {
    return arr;
  }

  bookmarks.forEach((bookmark) => {
    arr.push(generateBookmarkLinkMarkup(bookmark, type));
  });
  return arr.join("");
};

const generateBookmarkFolderMarkup = (
  index,
  label,
  description,
  children,
  type
) => {
  switch (type) {
    case "browsers":
      return browsers.bookmarkFolder(
        generateTimeStamp(),
        label,
        description,
        children
      );
    case "readme":
      return readme.bookmarkFolder(index, label, description, children);
  }
};

const generateBookmarkLinkMarkup = (bookmark, type) => {
  switch (type) {
    case "browsers":
      return browsers.bookmarkLink(
        generateTimeStamp(),
        bookmark.label,
        bookmark.description,
        bookmark.href
      );
    case "readme":
      return readme.bookmarkLink(
        bookmark.label,
        bookmark.description,
        bookmark.href
      );
  }
};

// This might be a bit unnecessary but it might expand in the future
const generateTimeStamp = () => {
  return Date.now();
};

export {
  createBookmarks,
  generateImportBookmarkMarkup,
  traverseStructure,
  traverseFolders,
  traverseBookmarks,
  generateBookmarkFolderMarkup,
  generateBookmarkLinkMarkup,
  generateTimeStamp,
};
