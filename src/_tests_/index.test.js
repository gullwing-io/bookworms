import { loadBookmarks, generateBookmarks, saveBookmarks } from "../index";

describe('Checking modules are exported', () => {
    test('should return loadBookmarks', () => {
        expect(loadBookmarks).toBeDefined();
    })
    test('should return generateBookmarks', () => {
        expect(generateBookmarks).toBeDefined();
    })
    test('should return saveBookmarks', () => {
        expect(saveBookmarks).toBeDefined();
    })
})