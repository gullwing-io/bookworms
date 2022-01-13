import {
  loadBookmarks,
  generateBookmarks,
  saveBookmarks,
  mergeBookmarks,
  convertBookmarks,
  checkBookmarks,
} from "../index";

describe("Checking modules are exported", () => {
  test("should return loadBookmarks", () => {
    expect(loadBookmarks).toBeDefined();
  });
  test("should return generateBookmarks", () => {
    expect(generateBookmarks).toBeDefined();
  });
  test("should return saveBookmarks", () => {
    expect(saveBookmarks).toBeDefined();
  });
  test("should return mergeBookmarks", () => {
    expect(mergeBookmarks).toBeDefined();
  });
  test("should return convertBookmarks", () => {
    expect(convertBookmarks).toBeDefined();
  });
  test("should return checkBookmarks", () => {
    expect(checkBookmarks).toBeDefined();
  });
});
