import {fetchBookmarkConfig, shouldFetchFromLocal, fetchLocaleBookmarkConfig, fetchRemoteBoomarkConfig,returnResponseAsJsonOn2xx, returnResponseAsObject} from '../load-bookmarks';

describe('loading bookmark config', () => {
    describe('fetchBookmarkConfig', () => {
        test('should return locale bookmarks', async () => {
            expect(await fetchBookmarkConfig('./demo/config/bookmarks.yaml')).toMatchSnapshot();
        })
        test('should return remote bookmarks', async () => {
            expect(await fetchBookmarkConfig('https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml')).toMatchSnapshot();
        })
    })
    describe('shouldFetchFromLocal', () => {
        test('should return true if path is local filesystem', () => {
            expect(shouldFetchFromLocal('./demo/config/bookmarks.yaml')).toBeTruthy();
        })
        test('should return false if path is remote http', () => {
            expect(shouldFetchFromLocal('https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml')).toBeFalsy();
        })
    })
    describe('fetchLocaleBookmarkConfig', () => {
        test('should return JSON from local YMAL', () => {
            expect(fetchLocaleBookmarkConfig('./demo/config/bookmarks.yaml')).toMatchSnapshot()
        })
    })
    describe('fetchRemoteBoomarkConfig', () => {
        test('should return JSON from http request', async () => {
            expect(await fetchRemoteBoomarkConfig('https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml')).toMatchSnapshot()
        })
    })
    describe('returnResponseAsJsonOn2xx', () => {
        test('should throw with statusCode 100', () => {
            try {
                returnResponseAsJsonOn2xx("{'hello':'world'}", 100, 'https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml')
                expect(true).toBe(false);
            } catch (error) {
                expect(error.message).toEqual('https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml returned 100')
            }
        })
        test('should throw with statusCode 300', () => {
            try {
                returnResponseAsJsonOn2xx("{'hello':'world'}", 300, 'https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml')
                expect(true).toBe(false);
            } catch (error) {
                expect(error.message).toEqual('https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml returned 300')
            }
        })
        test('should return object with string of JSON', () => {
            try {
                const response = returnResponseAsJsonOn2xx("{'hello':'world'}", 200, 'https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml')
                expect(response).toEqual({hello:"world"})
            } catch (error) {
                expect(true).toBe(false);
            }
        })
    })
    describe('returnResponseAsObject', () => {
        test('should return throw with invalid response error', () => {
            try {
                returnResponseAsObject(undefined, 'https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml');
                expect(true).toBe(false);
            } catch (error) {
                expect(error.message).toEqual('https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml returned invalid bookworms bookmarks structure')
            }
        })
        test('should return object with string of JSON', () => {
            try {
                const response = returnResponseAsObject("{'hello':'world'}", 'https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml');
                expect(response).toEqual({hello:"world"})
            } catch (error) {
                expect(true).toBe(false);
            }
        })
        test('should return object with object', () => {
            try {
                const response = returnResponseAsObject({hello:"world"}, 'https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml');
                expect(response).toEqual({hello:"world"})
            } catch (error) {
                expect(true).toBe(false);
            }
        })
        test('should return object with YAML', () => {
            try {
                const response = returnResponseAsObject(`hello: world`, 'https://raw.githubusercontent.com/thearegee/bookworms/main/demo/config/bookmarks.yaml');
                expect(response).toEqual({hello:"world"})
            } catch (error) {
                expect(true).toBe(false);
            }
        })
    })
})