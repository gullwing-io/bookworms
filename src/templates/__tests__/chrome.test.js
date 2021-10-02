import {bookmark, bookmarkFolder, bookmarkLink, addDescription, addBookwormsDescription} from '../chrome'

// I don't like using snapshots for these tests but because of the HTML formatting its easier
describe('Templates - Chrome', () => {
    describe('bookmark', () => {
        test('should return structure for Chrome bookmarks', () => {
            expect(bookmark('26/09/2021 - 6pm', 'Bookmarks label', 'Bookmarks description', '<div>Children HTML</div>')).toMatchSnapshot()
        });
    })
    describe('bookmarkFolder', () => {
        test('should return description, header and children', () => {
            expect(bookmarkFolder('26/09/2021 - 6pm', 'Section label', 'Section description', '<div>Children HTML</div>')).toMatchSnapshot()
        });
    })
    describe('bookmarkFolder', () => {
        test('should return description, header and children', () => {
            expect(bookmarkFolder('26/09/2021 - 6pm', 'Link label', 'Link description', '<div>Children HTML</div>')).toMatchSnapshot()
        });
    })
    describe('bookmarkLink', () => {
        test('should return description and link', () => {
            expect(bookmarkLink('26/09/2021 - 6pm', 'Link label', 'Link description', 'https://www.testlink.com')).toMatchSnapshot()
        });
    })
    describe('addDescription', () => {
        test('should return description comment', () => {
            expect(addDescription('hello world')).toEqual('<!-- hello world -->')
        });
        test('should return empty string', () => {
            expect(addDescription('')).toEqual('')
        });
    })
    describe('addBookwormsDescription', () => {
        test('should return description for file comment', () => {
            expect(addBookwormsDescription(1633027394454)).toEqual('<!-- These bookmarks were last updated on 30/09/2021, 19:43:14 using bookworms (https://github.com/thearegee/bookworms) -->')
        });
    })

})