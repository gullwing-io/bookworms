const bookmark = (timeDate, label, description, children) => {
  const arr = [];
  arr.push(addTitle(label));
  if (description) {
    arr.push(`\n${description}`);
  }
  arr.push(children);
  arr.push(addBookwormsDescription(timeDate));
  return arr.join("\n");
};

const bookmarkFolder = (index, label, description, children) => {
  const arr = ["\n"];
  arr.push(convertNumberIntoHeader(index, label));
  if (description) {
    arr.push(`\n${description}`);
  }
  arr.push(children);
  return arr.join("\n");
};

const convertNumberIntoHeader = (index, label) => {
  return `${"#".repeat(index + 1)} ${label}`;
};

const bookmarkLink = (label, description, href) => {
  if (!href) {
    return ``;
  }
  return `
* [${label ? label : href}](${href}) ${addDescription(description)}
`;
};

const addTitle = (title) => {
  if (title && title !== "") {
    return `# ${title}`;
  } else {
    return ``;
  }
};

const addDescription = (description) => {
  if (description) {
    return `- ${description}`;
  } else {
    return ``;
  }
};

const addBookwormsDescription = (epoch) => {
  const date = new Date(epoch).toLocaleString();
  return `_These bookmarks were last updated on ${date} using [Bookworms](https://github.com/thearegee/bookworms)_`;
};

export {
  bookmark,
  bookmarkFolder,
  convertNumberIntoHeader,
  bookmarkLink,
  addTitle,
  addDescription,
  addBookwormsDescription,
};
