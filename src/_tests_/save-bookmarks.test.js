import { rmSync, readFileSync } from 'fs';
import {writeBookmarks, trimTrailingSlash} from '../save-bookmarks';

describe('saving bookmarks', () => {
    describe('writeBookmarks', () => {
        test('should write bookmark files', () => {
            const path = './tmp'
            const bookmarks = [{
                filename: 'browser.html',
                body: '<div>hello world</div>'
            },
            {
                filename: 'readme.md',
                body: '_hello world_'
            }];
            writeBookmarks(path, bookmarks);
            bookmarks.forEach(({filename})=> {
                const bookmark = readFileSync(`${path}/${filename}`, 'utf8')
                expect(bookmark).toMatchSnapshot();
            });
            rmSync(path, { recursive: true });
        })
    })
    describe('trimTrailingSlash', () => {
        test('should not change path without trailing slash', () => {
            expect(trimTrailingSlash('./demo/config')).toEqual('./demo/config')
        })
        test('should change path removing trailing slash', () => {
            expect(trimTrailingSlash('./demo/config/')).toEqual('./demo/config')
        })
    })
})