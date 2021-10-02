import got from 'got';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

const fetchBookmarkConfig = async (path) => {
    if (shouldFetchFromLocal(path)) {
        return {
            type: 'local',
            body: fetchLocaleBookmarkConfig(path)
        }
    } else {
        return {
            type: 'remote',
            body: await fetchRemoteBoomarkConfig(path)
        }
    }
}

const shouldFetchFromLocal = (path) => {
    try {
        new URL (path);
        return false;   
    } catch (e) {
        return true;
    }
}

const fetchLocaleBookmarkConfig = (path) => {
    try {
        return returnResponseAsObject(readFileSync(path, 'utf8'));
    } catch(error) {
        // todo add tests around this error handling
        console.error(`${path} returned ${error.message}`)
        process.exit(1)
    }
}

const fetchRemoteBoomarkConfig = async (path) =>{
    try {
        const { body, statusCode } = await got(path);
        return returnResponseAsJsonOn2xx(body, statusCode, path);
    } catch (error) {
        // todo add tests around this error handling
        console.error(`${path} returned ${error.message}`)
        process.exit(1)
    }
}

const returnResponseAsJsonOn2xx = (body, statusCode, path) => {
    if (statusCode >= 200 && statusCode < 300) {
        return returnResponseAsObject(body, path)
    } else {
        throw new Error(`${path} returned ${statusCode}`)
    }
}

const returnResponseAsObject = (body, path) => {
    if (typeof body === 'object') {
        return body
    } else {
        const json = yaml.load(body);
        // this is bit gross but its what the lib returns
        if (json === "undefined") {
            try {
                return JSON.parse(response);
            } catch(e) {
                throw new Error(`${path} returned invalid bookworms bookmarks structure`)
            }
        } else {
            return json
        }
    }
}

export {fetchBookmarkConfig, shouldFetchFromLocal, fetchLocaleBookmarkConfig, fetchRemoteBoomarkConfig, returnResponseAsJsonOn2xx, returnResponseAsObject}
