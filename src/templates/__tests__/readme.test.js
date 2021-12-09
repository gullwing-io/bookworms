import {
  bookmark,
  bookmarkFolder,
  convertNumberIntoHeader,
  bookmarkLink,
  addTitle,
  addDescription,
  addBookwormsDescription,
} from "../readme";

// I don't like using snapshots for these tests but because of the HTML formatting its easier
describe("Templates - Readme", () => {
  describe("bookmark", () => {
    test("should return structure for Readme bookmarks", () => {
      expect(
        bookmark(
          "26/09/2021 - 6pm",
          "Bookmarks label",
          "Bookmarks description",
          "_Children markdown_"
        )
      ).toMatchSnapshot();
    });
    test("should return structure for Readme bookmarks with blank label", () => {
      expect(
        bookmark(
          "26/09/2021 - 6pm",
          "",
          "Bookmarks description",
          "_Children markdown_"
        )
      ).toMatchSnapshot();
    });
  });
  describe("bookmarkFolder", () => {
    test("should return description, header and children", () => {
      expect(
        bookmarkFolder(
          0,
          "Section label",
          "Section description",
          "_Children markdown_"
        )
      ).toMatchSnapshot();
    });
  });
  describe("convertNumberIntoHeader", () => {
    test("should return h1 mardown", () => {
      expect(convertNumberIntoHeader(0, "h1")).toEqual("# h1");
    });
    test("should return h2 mardown", () => {
      expect(convertNumberIntoHeader(1, "h2")).toEqual("## h2");
    });
    test("should return h5 mardown", () => {
      expect(convertNumberIntoHeader(4, "h5")).toEqual("##### h5");
    });
  });

  describe("bookmarkLink", () => {
    test("should return description and link", () => {
      expect(
        bookmarkLink(
          "26/09/2021 - 6pm",
          "Link label",
          "Link description",
          "https://www.testlink.com"
        )
      ).toMatchSnapshot();
    });
  });
  describe("addTitle", () => {
    test("should return title comment", () => {
      expect(addTitle("hello world")).toEqual("# hello world");
    });
    test("should return empty string", () => {
      expect(addTitle("")).toEqual("");
    });
  });
  describe("addDescription", () => {
    test("should return description comment", () => {
      expect(addDescription("hello world")).toEqual("hello world");
    });
    test("should return empty string", () => {
      expect(addDescription("")).toEqual("");
    });
  });
  describe("addBookwormsDescription", () => {
    test("should return description for file comment", () => {
      expect(addBookwormsDescription(1633027394454)).toEqual(
        "_These bookmarks were last updated on 30/09/2021, 19:43:14 using [Bookworms](https://github.com/thearegee/bookworms)_"
      );
    });
  });
});
