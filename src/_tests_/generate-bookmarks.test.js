import { jest } from "@jest/globals";
import {
  generateImportBookmarkMarkup,
  traverseStructure,
  traverseFolders,
  traverseBookmarks,
  generateBookmarkFolderMarkup,
  generateBookmarkLinkMarkup,
  generateTimeStamp,
} from "../generate-bookmarks.js";

describe("generating bookmarks structure", () => {
  describe("generateImportBookmarkMarkup", () => {
    test("should return full structure for bookmarks", () => {
      jest
        .spyOn(Date.prototype, "toLocaleString")
        .mockReturnValue("30/09/2021, 19:43:14");
      const config = {
        label: "Bookmarks config",
        description: "Bookmarks config description",
        folders: [
          {
            label: "Folder 1",
            description: "Folder description 1",
            bookmarks: [
              {
                label: "Link 1",
                description: "Bookmark 1",
                href: "https://www.testlink1.com",
              },
            ],
          },
          {
            label: "Folder 2",
            description: "Folder description 2",
            folders: [
              {
                label: "Folder 2.1",
                description: "Folder description 2.1",
                bookmarks: [
                  {
                    label: "Link 2",
                    description: "Bookmark 2",
                    href: "https://www.testlink2.com",
                  },
                ],
              },
            ],
          },
        ],
        bookmarks: [
          {
            label: "Link 3",
            description: "Bookmark 3",
            href: "https://www.testlink3.com",
          },
        ],
      };
      expect(generateImportBookmarkMarkup(config)).toMatchSnapshot();
    });
  });
  describe("traverseStructure", () => {
    test("should return structure for browsers bookmarks", () => {
      Date.now = jest.fn(() => 1487076708000);
      const structure = {
        folders: [
          {
            label: "browsers folder 1",
            description: "browsers folder description 1",
            bookmarks: [
              {
                label: "browsers link 1",
                description: "browsers bookmark 1",
                href: "https://www.testlink1.com",
              },
            ],
          },
          {
            label: "browsers folder 2",
            description: "browsers folder description 2",
            folders: [
              {
                label: "browsers folder 2.1",
                description: "browsers folder description 2.1",
                bookmarks: [
                  {
                    label: "browsers link 2",
                    description: "browsers bookmark 2",
                    href: "https://www.testlink2.com",
                  },
                ],
              },
            ],
          },
        ],
        bookmarks: [
          {
            label: "browsers link 3",
            description: "browsers bookmark 3",
            href: "https://www.testlink3.com",
          },
        ],
      };
      expect(traverseStructure(structure, "browsers")).toMatchSnapshot();
    });
    test("should return structure for Readme bookmarks", () => {
      Date.now = jest.fn(() => 1487076708000);
      const structure = {
        folders: [
          {
            label: "Readme folder 1",
            description: "Readme folder description 1",
            bookmarks: [
              {
                label: "Readme link 1",
                description: "Readme bookmark 1",
                href: "https://www.testlink1.com",
              },
            ],
          },
          {
            label: "Readme folder 2",
            description: "Readme folder description 2",
            folders: [
              {
                label: "Readme folder 2.1",
                description: "Readme folder description 2.1",
                bookmarks: [
                  {
                    label: "Readme link 2",
                    description: "Readme bookmark 2",
                    href: "https://www.testlink2.com",
                  },
                ],
              },
            ],
          },
        ],
        bookmarks: [
          {
            label: "Readme link 3",
            description: "Readme bookmark 3",
            href: "https://www.testlink3.com",
          },
        ],
      };
      expect(traverseStructure(structure, "readme")).toMatchSnapshot();
    });
  });
  describe("traverseFolders", () => {
    test("should return simple structure for browsers folders", () => {
      Date.now = jest.fn(() => 1487076708000);
      const folders = [
        {
          label: "browsers folder 1",
          description: "browsers folder description 1",
        },
        {
          label: "browsers folder 2",
          description: "browsers folder description 2",
        },
      ];
      expect(traverseFolders(folders, "browsers")).toMatchSnapshot();
    });
    test("should return structure for nested browsers folders", () => {
      Date.now = jest.fn(() => 1487076708000);
      const folders = [
        {
          label: "browsers folder 1",
          description: "browsers folder description 1",
          folders: [
            {
              label: "browsers folder 1.1",
              description: "browsers folder description 1.1",
            },
          ],
        },
        {
          label: "browsers folder 2",
          description: "browsers folder description 2",
        },
      ];
      expect(traverseFolders(folders, "browsers")).toMatchSnapshot();
    });
    test("should return simple structure for Readme folders", () => {
      Date.now = jest.fn(() => 1487076708000);
      const folders = [
        {
          label: "Readme folder 1",
          description: "Readme folder description 1",
        },
        {
          label: "Readme folder 2",
          description: "Readme folder description 2",
        },
      ];
      expect(traverseFolders(folders, "readme")).toMatchSnapshot();
    });
    test("should return structure for nested Readme folders", () => {
      Date.now = jest.fn(() => 1487076708000);
      const folders = [
        {
          label: "Readme folder 1",
          description: "Readme folder description 1",
          folders: [
            {
              label: "Readme folder 1.1",
              description: "Readme folder description 1.1",
            },
          ],
        },
        {
          label: "Readme folder 2",
          description: "Readme folder description 2",
        },
      ];
      expect(traverseFolders(folders, "readme")).toMatchSnapshot();
    });
  });
  describe("traverseBookmarks", () => {
    test("should return structure for browsers links", () => {
      Date.now = jest.fn(() => 1487076708000);
      const bookmarks = [
        {
          label: "browsers link 1",
          description: "browsers bookmark 1",
          href: "https://www.testlink1.com",
        },
        {
          label: "browsers link 2",
          description: "browsers bookmark 2",
          href: "https://www.testlink2.com",
        },
      ];
      expect(traverseBookmarks(bookmarks, "browsers")).toMatchSnapshot();
    });
    test("should return structure for Readme links", () => {
      Date.now = jest.fn(() => 1487076708000);
      const bookmarks = [
        {
          label: "Readme link 1",
          description: "Readme bookmark 1",
          href: "https://www.testlink1.com",
        },
        {
          label: "Readme link 2",
          description: "Readme bookmark 2",
          href: "https://www.testlink2.com",
        },
      ];
      expect(traverseBookmarks(bookmarks, "readme")).toMatchSnapshot();
    });
  });

  describe("generateBookmarkFolderMarkup", () => {
    test("should return structure for browsers folder", () => {
      Date.now = jest.fn(() => 1487076708000);
      expect(
        generateBookmarkFolderMarkup(
          null,
          "browsers folder",
          "browsers folder description",
          "<div>Children HTML</div>",
          "browsers"
        )
      ).toMatchSnapshot();
    });
    test("should return structure for Readme folder", () => {
      Date.now = jest.fn(() => 1487076708000);
      expect(
        generateBookmarkFolderMarkup(
          0,
          "Readme folder",
          "Readme folder description",
          "_Children markdown_",
          "readme"
        )
      ).toMatchSnapshot();
    });
  });
  describe("generateBookmarkLinkMarkup", () => {
    test("should return structure for browsers link", () => {
      Date.now = jest.fn(() => 1487076708000);
      const bookmark = {
        label: "browsers link",
        description: "browsers bookmark",
        href: "https://www.testlink.com",
      };
      expect(
        generateBookmarkLinkMarkup(bookmark, "browsers")
      ).toMatchSnapshot();
    });
    test("should return structure for Readme link", () => {
      Date.now = jest.fn(() => 1487076708000);
      const bookmark = {
        label: "Readme link",
        description: "Readme bookmark",
        href: "https://www.testlink.com",
      };
      expect(generateBookmarkLinkMarkup(bookmark, "readme")).toMatchSnapshot();
    });
  });
  describe("generateTimeStamp", () => {
    test("should return timestamp", () => {
      Date.now = jest.fn(() => 1487076708000);
      expect(generateTimeStamp()).toEqual(1487076708000);
    });
  });
});
