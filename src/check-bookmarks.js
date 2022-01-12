import { fetchBookmarkConfig } from "./load-bookmarks.js";
import { readFileSync } from "fs";
import { trimTrailingSlash } from "./save-bookmarks.js";
import { generateImportBookmarkMarkup } from "./generate-bookmarks.js"

const checkBookmarks = async (path, directory) => {
  const { type, body } = await fetchBookmarkConfig(path);
  console.log(`Fetching ${type} bookmarks from ${path}`);
  const generatedBookmarks = generateImportBookmarkMarkup(body);
  return generatedBookmarks.every((bookmark) => checkSingleBookmark(bookmark, directory));
};

const sanitizeDynamicData = (bookmarkBody) => {
  // Sanitize dates
  const dateRegexes = [
    /(ADD_DATE=")\d+(")/g,
    /(LAST_MODIFIED=")\d+(")/g,
    /(last updated on ).*( using \[Bookworms\])/g
  ]
  return dateRegexes.reduce((body, regex) => body.replaceAll(regex, "$10$2"), bookmarkBody);
}

const checkBookmarkBody = (existingBookmarkBody, generatedBookmarkBody) => {
  return sanitizeDynamicData(existingBookmarkBody) === sanitizeDynamicData(generatedBookmarkBody);
}

const checkSingleBookmark = (generatedBookmark, directory) => {
  const filename = `${trimTrailingSlash(directory)}/${generatedBookmark.filename}`;
  let existingBookmark = null;
  try {
    existingBookmark = readFileSync(filename, 'utf8');
  } catch (e) {
    console.log(`Failed to read file ${filename}`);
    return false;
  }
  return checkBookmarkBody(existingBookmark, generatedBookmark.body);
}

export { checkBookmarks, checkSingleBookmark as checkBookmark, sanitizeDynamicData, checkBookmarkBody };
