/**
 * Change 'Global' to 'Examples'.
 * 
 * @ignore
 */
let globals = [];
const regex = /global$/gi;
document.querySelectorAll('h1, h2, h3, h4, h5, h6, title').forEach(function(element){
    const found = element.textContent.match(regex);
    if (found) {
        element.textContent = 'Examples';
        element.classList.add('examples-' + element.tagName.toLowerCase());
    }
});

/**
 * Bundle blocks together.
 * 
 * @ignore
 */
function formatBlocks() {
    const article = document.querySelector('article');
    const childNodes = article.querySelectorAll(':scope > *');

    let group = [];
    let groupIndex = 0;

    // Look through each node, and bundle together the ones defined by an 'h4'.
    childNodes.forEach(function(node) {

        // If we have a new h4, start a new bundle.
        if (node.tagName === 'H4') {
            if (group.length > 0) {
                groupIndex ++;
            }
            group.push(document.createElement("div"));
            group[groupIndex].classList.add('definition');
            article.insertBefore(group[groupIndex], node);
            group[groupIndex].appendChild(node);
        }

        // Only append other children if there is an h4 to assign them to.
        else if (group.length > 0) {
            group[groupIndex].appendChild(node);
        }
    });
}

/**
 * Move h4 name in to flexbox;
 * 
 * @ignore
 */
function moveNames() {
    const definitions = document.querySelectorAll('.definition');
    definitions.forEach(function(def) {
        const name = def.querySelector('.name');
        const parent = name.parentElement;
        const exampleText = parent.querySelector('.example-text');
        if (exampleText) {
            exampleText.insertBefore(name, exampleText.firstChild);
        }

        if (def) {
            bundleNonDescription(def);
        }
    });
}



/**
 * bundle non decsription nodes together;
 * 
 * @ignore
 */
function bundleNonDescription(scope) {
    const definition = scope;
    const nodes = scope.querySelectorAll(':scope > *:not(.description)');

    const container = document.createElement("div");
    container.classList.add('example-content');
    definition.appendChild(container);

    nodes.forEach(function(element) {
        container.appendChild(element);
    });
}

formatBlocks();
moveNames();