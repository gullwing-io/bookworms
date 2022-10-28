import Handlebars from "handlebars";
import asyncHelpers from "handlebars-async-helpers";

import readJsYaml from "read-js-yaml";

const hb = asyncHelpers(Handlebars);

hb.registerHelper(
  "get",
  (path, indentation) =>
    new Promise((resolve) => {
      readJsYaml(path, true)
        .then(({ body }) => {
          resolve(body.replace(/\n/g, `\n${indentation}`));
        })
        .catch(() => {
          console.error(`Bookmarks interpolation failed getting ${path}`);
          process.exit(1);
        });
    })
);

const interpolateBookmarks = async (yaml) => {
  const template = hb.compile(yaml);
  const result = await template();
  return result;
};

export default interpolateBookmarks;
