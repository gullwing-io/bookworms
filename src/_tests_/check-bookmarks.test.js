import { jest, describe, test, expect } from '@jest/globals'
import { generateImportBookmarkMarkup } from '../generate-bookmarks.js';
import { checkBookmarkBody } from '../check-bookmarks.js';

describe("Checking if bookmarks are up to date", () => {
    describe("checkBookmarkBody", () => {
        test("Should return true for same config in different dates", () => {
            const config = {
                label: 'Bookmarks config',
                description: 'Bookmarks config description',
                bookmarks: [{
                    label: 'Link',
                    description: 'Bookmark',
                    href: 'https://www.testlink.com'
                }]
            };
            Date.now = jest.fn(() => 1487076708000);
            const originalGeneratedBookmark = generateImportBookmarkMarkup(config);
            Date.now = jest.fn(() => 1487076709000);
            const laterGeneratedBookmark = generateImportBookmarkMarkup(config);
            for (let i = 0; i < originalGeneratedBookmark.length; i++) {
                expect(checkBookmarkBody(originalGeneratedBookmark[i].body, laterGeneratedBookmark[i].body)).toBeTruthy;
            }
        });
        test("Should return false for different configs", () => {
            const config1 = {
                label: 'Bookmarks config 1',
                description: 'Bookmarks config description',
                bookmarks: [{
                    label: 'Link',
                    description: 'Bookmark 1',
                    href: 'https://www.testlink.com'
                }]
            };
            const config2 = {
                label: 'Bookmarks config 2',
                description: 'Bookmarks config description',
                bookmarks: [{
                    label: 'Link',
                    description: 'Bookmark 2',
                    href: 'https://www.testlink.com'
                }]
            };
            Date.now = jest.fn(() => 1487076708000);
            const generatedBookmark1 = generateImportBookmarkMarkup(config1);
            const generatedBookmark2 = generateImportBookmarkMarkup(config2);
            for (let i = 0; i < generatedBookmark1.length; i++) {
                expect(checkBookmarkBody(generatedBookmark1[i].body, generatedBookmark2[i].body)).toBeFalsy;
            }
        });
    });
});
