import { jest } from "@jest/globals";
import { mergedBookmark } from "../merge-bookmarks.js";

describe("merging different bookmark configs together", () => {
  describe("mergedBookmark", () => {
    test("should return merged bookmarks with default label and description", async () => {
      Date.now = jest.fn(() => 1487076708000);
      const bookmarkPaths = [
        "./demo/config/bookmarks.yaml",
        "./demo/config/bookmarks-for-merging.yaml",
      ];
      expect(await mergedBookmark(bookmarkPaths)).toMatchSnapshot();
    });
    test("should return merged bookmarks with set label and description", async () => {
      Date.now = jest.fn(() => 1487076708000);
      const bookmarkPaths = [
        "./demo/config/bookmarks.yaml",
        "./demo/config/bookmarks-for-merging.yaml",
      ];
      expect(
        await mergedBookmark(
          bookmarkPaths,
          "All my bookmarks",
          "merging different YAML files"
        )
      ).toMatchSnapshot();
    });
  });
});
