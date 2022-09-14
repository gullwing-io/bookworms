import got from 'got';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

const fetchBookmarkConfig = async (path, asYAML = false) => {
    let type;
    let body;
    if (shouldFetchFromLocal(path)) {
        type = 'local';
        if (!asYAML) {
            body = returnResponseAsObject(fetchLocaleBookmarkYAML(path));
        } else {
            body = fetchLocaleBookmarkYAML(path);
        }
    } else {
        type = 'remote';
        if (!asYAML) {
            const response = await fetchRemoteBoomarkYMAL(path)
            body = returnResponseAsObject(response.body, response.path)
        } else {
            const reponse =  await fetchRemoteBoomarkYMAL(path)
            body = reponse.body
        }
    }
    return {
        type,
        body
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

const fetchLocaleBookmarkYAML = (path) => {
    try {
        return readFileSync(path, 'utf8');
    } catch(error) {
        // todo add tests around this error handling
        console.error(`${path} returned ${error.message}`)
        process.exit(1)
    }
}

const fetchRemoteBoomarkYMAL = async (path) =>{
    try {
        const { body, statusCode } = await got(path);
        return returnResponseOn2xx(body, statusCode, path);
    } catch (error) {
        // todo add tests around this error handling
        console.error(`${path} returned ${error.message}`)
        process.exit(1)
    }
}

const returnResponseOn2xx = (body, statusCode, path) => {
    if (statusCode >= 200 && statusCode < 300) {
        return {body, path}
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

export {fetchBookmarkConfig, shouldFetchFromLocal, fetchLocaleBookmarkYAML, fetchRemoteBoomarkYMAL, returnResponseOn2xx, returnResponseAsObject}
