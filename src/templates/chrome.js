const bookmark = (timeDate, label, description, children) => {
    return `
    ${addBookwormsDescription()}
    <!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
        It will be read and overwritten.
        DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
${addDescription(description)}
<DL><p>
<DT><H3 ADD_DATE="${timeDate}" LAST_MODIFIED="${timeDate}">${label}</H3>
<DL><p>
    ${children}
</DL><p>
</DL><p>
    `
}

const bookmarkFolder = (timeDate, label, description, children) => {
    return `
            ${addDescription(description)}
            <DT><H3 ADD_DATE="${timeDate}" LAST_MODIFIED="${timeDate}">${label}</H3>
<DL><p>
${children}
</DL><p>
    `
}


const bookmarkLink = (time, label, description, href) => {
    return `
    ${addDescription(description)}
    <DT><A HREF="${href}" ADD_DATE="${time}">${label}</A>
    `
}

const addDescription = (description) => {
    if (description) {
        return `<!-- ${description} -->`
    } else {
        return ``
    }
}

const addBookwormsDescription = (epoch) => {
    const date = new Date(epoch).toLocaleString()
    return `<!-- These bookmarks were last updated on ${date} using bookworms (https://github.com/thearegee/bookworms) -->`
}


export {bookmark, bookmarkFolder, bookmarkLink, addDescription, addBookwormsDescription}