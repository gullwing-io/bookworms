import {fetchBookmarkConfig} from '../load-bookmarks';
import interpolateBookmarks from '../interpolate-bookmarks';

describe('interpolateBookmarks', () => {
    test('should correctly return yaml without placeholders', async () => {
        const {body} = await fetchBookmarkConfig('./demo/config/bookmarks.yaml', true);
        const interpolatedYaml = await interpolateBookmarks(body);
        expect(interpolatedYaml).toEqual(body);
    })
    test('should correctly return yaml with placeholders', async () => {
        const {body} = await fetchBookmarkConfig('./demo/config/interpolate-bookmark.template.yaml', true);
        const interpolatedYaml = await interpolateBookmarks(body);
        
        expect(interpolatedYaml).toMatchSnapshot();
    })
})