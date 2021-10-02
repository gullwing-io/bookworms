import {jest} from '@jest/globals'
import {generateImportBookmarkMarkup, traverseStructure, traverseFolders, traverseBookmarks, generateBookmarkFolderMarkup, generateBookmarkLinkMarkup, generateTimeStamp} from '../generate-bookmarks.js';

describe('generating bookmarks structure', () => {
    describe('generateImportBookmarkMarkup', () => {
        test('should return full structure for bookmarks', () => {
            Date.now = jest.fn(() => 1487076708000)
            const config = {
                label: 'Bookmarks config',
                description: 'Bookmarks config description',
                folders: [{
                    label: 'Folder 1',
                    description: 'Folder description 1',
                    bookmarks: [{
                        label: 'Link 1',
                        description: 'Bookmark 1',
                        href: 'https://www.testlink1.com'
                    }]
                },
                {
                    label: 'Folder 2',
                    description: 'Folder description 2',
                    folders: [{
                            label: 'Folder 2.1',
                            description: 'Folder description 2.1',
                            bookmarks: [{
                                label: 'Link 2',
                                description: 'Bookmark 2',
                                href: 'https://www.testlink2.com'
                            }]
                        }]
                }],
                bookmarks: [{
                    label: 'Link 3',
                    description: 'Bookmark 3',
                    href: 'https://www.testlink3.com'
                }]
            }
            expect(generateImportBookmarkMarkup(config)).toMatchSnapshot()
        });
    });
    describe('traverseStructure', () => {
        test('should return structure for Chrome bookmarks', () => {
            Date.now = jest.fn(() => 1487076708000)
            const structure = {
                folders: [{
                    label: 'Chrome folder 1',
                    description: 'Chrome folder description 1',
                    bookmarks: [{
                        label: 'Chrome link 1',
                        description: 'Chrome bookmark 1',
                        href: 'https://www.testlink1.com'
                    }]
                },
                {
                    label: 'Chrome folder 2',
                    description: 'Chrome folder description 2',
                    folders: [{
                            label: 'Chrome folder 2.1',
                            description: 'Chrome folder description 2.1',
                            bookmarks: [{
                                label: 'Chrome link 2',
                                description: 'Chrome bookmark 2',
                                href: 'https://www.testlink2.com'
                            }]
                        }]
                }],
                bookmarks: [{
                    label: 'Chrome link 3',
                    description: 'Chrome bookmark 3',
                    href: 'https://www.testlink3.com'
                }]
            }
            expect(traverseStructure(structure, 'chrome')).toMatchSnapshot()
        });
        test('should return structure for Readme bookmarks', () => {
            Date.now = jest.fn(() => 1487076708000)
            const structure = {
                folders: [{
                    label: 'Readme folder 1',
                    description: 'Readme folder description 1',
                    bookmarks: [{
                        label: 'Readme link 1',
                        description: 'Readme bookmark 1',
                        href: 'https://www.testlink1.com'
                    }]
                },
                {
                    label: 'Readme folder 2',
                    description: 'Readme folder description 2',
                    folders: [{
                            label: 'Readme folder 2.1',
                            description: 'Readme folder description 2.1',
                            bookmarks: [{
                                label: 'Readme link 2',
                                description: 'Readme bookmark 2',
                                href: 'https://www.testlink2.com'
                            }]
                        }]
                }],
                bookmarks: [{
                    label: 'Readme link 3',
                    description: 'Readme bookmark 3',
                    href: 'https://www.testlink3.com'
                }]
            }
            expect(traverseStructure(structure, 'readme')).toMatchSnapshot()
        });
    })
    describe('traverseFolders', () => {
        test('should return simple structure for Chrome folders', () => {
            Date.now = jest.fn(() => 1487076708000)
            const folders = [
                {
                    label: 'Chrome folder 1',
                    description: 'Chrome folder description 1'
                },
                {
                    label: 'Chrome folder 2',
                    description: 'Chrome folder description 2'
                }
            ]
            expect(traverseFolders(folders, 'chrome')).toMatchSnapshot()
        });
        test('should return structure for nested Chrome folders', () => {
            Date.now = jest.fn(() => 1487076708000)
            const folders = [
                {
                    label: 'Chrome folder 1',
                    description: 'Chrome folder description 1',
                    folders: [
                        {
                            label: 'Chrome folder 1.1',
                            description: 'Chrome folder description 1.1'
                        }
                    ]
                },
                {
                    label: 'Chrome folder 2',
                    description: 'Chrome folder description 2'
                }
            ]
            expect(traverseFolders(folders, 'chrome')).toMatchSnapshot()
        });
        test('should return simple structure for Readme folders', () => {
            Date.now = jest.fn(() => 1487076708000)
            const folders = [
                {
                    label: 'Readme folder 1',
                    description: 'Readme folder description 1'
                },
                {
                    label: 'Readme folder 2',
                    description: 'Readme folder description 2'
                }
            ]
            expect(traverseFolders(folders, 'readme')).toMatchSnapshot()
        });
        test('should return structure for nested Readme folders', () => {
            Date.now = jest.fn(() => 1487076708000)
            const folders = [
                {
                    label: 'Readme folder 1',
                    description: 'Readme folder description 1',
                    folders: [
                        {
                            label: 'Readme folder 1.1',
                            description: 'Readme folder description 1.1'
                        }
                    ]
                },
                {
                    label: 'Readme folder 2',
                    description: 'Readme folder description 2'
                }
            ]
            expect(traverseFolders(folders, 'readme')).toMatchSnapshot()
        });
    })
    describe('traverseBookmarks', () => {
        test('should return structure for Chrome links', () => {
            Date.now = jest.fn(() => 1487076708000)
            const bookmarks = [{
                label: 'Chrome link 1',
                description: 'Chrome bookmark 1',
                href: 'https://www.testlink1.com'
            },
            {
                label: 'Chrome link 2',
                description: 'Chrome bookmark 2',
                href: 'https://www.testlink2.com'
            }]
            expect(traverseBookmarks(bookmarks, 'chrome')).toMatchSnapshot()
        });
        test('should return structure for Readme links', () => {
            Date.now = jest.fn(() => 1487076708000)
            const bookmarks = [{
                label: 'Readme link 1',
                description: 'Readme bookmark 1',
                href: 'https://www.testlink1.com'
            },
            {
                label: 'Readme link 2',
                description: 'Readme bookmark 2',
                href: 'https://www.testlink2.com'
            }
        ]
            expect(traverseBookmarks(bookmarks, 'readme')).toMatchSnapshot()
        });
    })

    describe('generateBookmarkFolderMarkup', () => {
        test('should return structure for Chrome folder', () => {
            Date.now = jest.fn(() => 1487076708000)
            expect(generateBookmarkFolderMarkup(null, 'Chrome folder', 'Chrome folder description', '<div>Children HTML</div>', 'chrome')).toMatchSnapshot()
        });
        test('should return structure for Readme folder', () => {
            Date.now = jest.fn(() => 1487076708000)
            expect(generateBookmarkFolderMarkup(0, 'Readme folder', 'Readme folder description', '_Children markdown_', 'readme')).toMatchSnapshot()
        });
    })
    describe('generateBookmarkLinkMarkup', () => {
        test('should return structure for Chrome link', () => {
            Date.now = jest.fn(() => 1487076708000)
            const bookmark = {
                label: 'Chrome link',
                description: 'Chrome bookmark',
                href: 'https://www.testlink.com'
            }
            expect(generateBookmarkLinkMarkup(bookmark, 'chrome')).toMatchSnapshot()
        });
        test('should return structure for Readme link', () => {
            Date.now = jest.fn(() => 1487076708000)
            const bookmark = {
                label: 'Readme link',
                description: 'Readme bookmark',
                href: 'https://www.testlink.com'
            }
            expect(generateBookmarkLinkMarkup(bookmark, 'readme')).toMatchSnapshot()
        });
    })
    describe('generateTimeStamp', () => {
        test('should return timestamp', () => {
            Date.now = jest.fn(() => 1487076708000)
            expect(generateTimeStamp()).toEqual(1487076708000)
        });
    })
})