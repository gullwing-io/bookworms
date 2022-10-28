import readJsYaml from "read-js-yaml";
import { writeBookmarks } from "./save-bookmarks.js";
import { generateImportBookmarkMarkup } from "./generate-bookmarks.js";

const mergedBookmark = async (
  bookmarkPaths,
  label = "Merged worms",
  description = `Multiple bookmarks merged`
) => {
  return {
    label,
    description,
    folders: await Promise.all(
      bookmarkPaths.map(async (path) => {
        const { type, body } = await readJsYaml(path);
        console.log(`Fetching ${type} bookmarks from ${path}`);
        return body;
      })
    ),
  };
};

const createBookmarks = async (
  bookmarkPaths,
  directory,
  label,
  description
) => {
  const body = await mergedBookmark(bookmarkPaths, label, description);
  const generatedBookmarks = generateImportBookmarkMarkup(body);
  generatedBookmarks.forEach(({ filename }) => {
    console.log(`Writing ${filename} to ${directory}`);
  });
  writeBookmarks(directory, generatedBookmarks);
};

export { createBookmarks, mergedBookmark };
