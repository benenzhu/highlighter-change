// Return a Map of highlights found on the page,
// with the highlight id as the key and the highlight text as the value
function getAllFound() {
    const highlights = document.querySelectorAll("h5, h1, h2, h3, h4, .highlighter--highlighted");
    const ret = [];
    for (let i = 0; i < highlights.length; i++) {
        const highlight = highlights[i];
        if (highlight.tagName !== 'SPAN') {
            ret.push([highlight.tagName, highlight.textContent]);
        } else {
            const index = highlight.getAttribute('data-highlight-id').toString();
            const content = highlight.textContent;
            let parentElem = highlight;
            const allow = ["P", "DIV", "LI"];
            while(!allow.includes(parentElem.tagName)) {
                parentElem = parentElem.parentElement;
            }
            const parent = parentElem.textContent;
            if (ret.length && ret[ret.length - 1][0] === index && parent === ret[ret.length - 1][2]) {
                ret[ret.length - 1][1] += `${content}`;
            } else {
                ret.push([index, content, parent]);
            }
        }
    }
    return ret;
}

    // return Array.from(highlights)
    // .map((highlight) => [
    //     highlight.getAttribute('data-highlight-id'),
    //     highlight.textContent.replace(/\s+/ugm, ' ').trim(),
    // ])
    // .reduce((acc, [highlightId, highlightText]) => {
    //     if (acc.has(highlightId)) {
    //         acc.set(highlightId, `${acc.get(highlightId)} ${highlightText}`);
    //     } else {
    //         acc.set(highlightId, highlightText);
    //     }
    //     return acc;
    // }, new Map()); // Use a Map instead of an object since it retains order of insertion
// }

export default getAllFound;
