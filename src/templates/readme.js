const bookmark = (timeDate, label, description, children) => {
    return `
# ${label}
${addDescription(description)}
${children}
${addBookwormsDescription(timeDate)}
`
}

const bookmarkFolder = (index, label, description, children) => {
    return `
${convertNumberIntoHeader(index, label)}
${addDescription(description)}
${children}
    `
}

const convertNumberIntoHeader = (index, label) => {
    const arr = ['']
    for (let i = 0; i <= index; i++) {
        arr.push('#')
    }
    return `${arr.join('')} ${label}`
}


const bookmarkLink = (label, description, href) => {
    return `
* [${label}](${href}) - ${addDescription(description)}
`
}

const addDescription = (description) => {
    if (description) {
        return `${description}`
    } else {
        return ``
    }
}

const addBookwormsDescription = (epoch) => {
    const date = new Date(epoch).toLocaleString()
    return `_These bookmarks were last updated on ${date} using [Bookworms](https://github.com/thearegee/bookworms)_`
}

export {bookmark, bookmarkFolder, convertNumberIntoHeader, bookmarkLink, addDescription, addBookwormsDescription}