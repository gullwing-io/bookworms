import { mkdirSync, writeFileSync } from "fs";

const writeBookmarks = (directory, bookmarks) => {
  bookmarks.forEach(({ filename, body }) => {
    writeBookmark(body, directory, filename);
  });
};

const writeBookmark = (content, directory, filename) => {
  try {
    mkdirSync(directory, { recursive: true });
    writeFileSync(`${trimTrailingSlash(directory)}/${filename}`, content);
  } catch (error) {
    // todo write test for this error condition
    console.error(error.message);
  }
};

const trimTrailingSlash = (directory) => {
  return directory.replace(/\/$/, "");
};

export { writeBookmarks, writeBookmark, trimTrailingSlash };
