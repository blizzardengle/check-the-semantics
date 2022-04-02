/**
 * Run this code in the dev console on https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 * to build an object with all the HTML semantic elements.
 */

if (!Element.prototype.nearest) {
    /**
     * Search up the DOM tree for the nearest matching element. Similar to closest
     * except siblings are checked as part of the traversal.
     *
     * @param {string} selector
     * @return {element|null} The first matching element or null if not found.
     */
    Element.prototype.nearest = function (selector) {
        let check = this.previousElementSibling;
        if (!check) {
            check = this.parentElement;
            if (!check) {
                return null;
            }
        }
        if (check.nodeName === selector.toUpperCase()) {
            return check;
        }
        return check.nearest(selector);
    };
}

/**
 * Based on the HTML structure of https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 * determine what category of semantic element we are currently working on.
 *
 * @param {element} h2 The nearest h2 element to the current item being processed.
 * @param {object} meta An object representing this items category.
 * @return {void} Used only as a short circuit.
 */
function updateElementsMeta(h2, meta) {
    if (!h2) {
        return;
    }

    const heading = h2.innerText.trim().toUpperCase();
    if (heading.includes('METADATA')) {
        meta.metadata = true;
    } else if (heading.includes('OBSOLETE')) {
        meta.obsolete = true;
    } else if (heading.includes('DEPRECATED')) {
        meta.obsolete = true;
    } else if (heading.includes('SECTIONING')) {
        meta.sectioning = true;
    } else if (heading.includes('EMBEDDED')) {
        meta.embedded = true;
    } else if (heading.includes('INLINE')) {
        meta.inline = true;
    } else if (heading.includes('MULTIMEDIA')) {
        meta.multimedia = true;
    } else if (heading.includes('CONTENT')) {
        meta.content = true;
    } else if (heading.includes('DEMARCATING')) {
        meta.demarcation = true;
    } else if (heading.includes('TABLE')) {
        meta.table = true;
    } else if (heading.includes('FORM')) {
        meta.form = true;
    } else if (heading.includes('INTERACTIVE')) {
        meta.interactive = true;
    } else if (heading.includes('COMPONENTS')) {
        meta.component = true;
    }
}

const elements = {};

document.querySelectorAll('tr td:first-child code').forEach((element) => {
    const meta = {
        metadata: false,
        sectioning: false,
        content: false,
        inline: false,
        multimedia: false,
        embedded: false,
        demarcation: false,
        table: false,
        form: false,
        interactive: false,
        component: false,
        obsolete: false
    };

    const h2 = element.nearest('h2');
    updateElementsMeta(h2, meta);

    const name = element.innerText.replace(/<|>/g, '').trim().toUpperCase();
    elements[name] = meta;
});

console.log(elements);
// console.log(JSON.stringify(elements));
