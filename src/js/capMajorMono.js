window.onload = function(event) {
    const MMs = document.querySelectorAll('h4, .stats .horizontal, .stats .vertical');
    MMs.forEach(function(element) {
        elementMajorMonoCap(element);
    });

    const codes = document.querySelectorAll('.definition code');

    codes.forEach(function(code) {
        lineCode(code);
    })
};

// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Counter_Styles/Using_CSS_counters
function lineCode(code) {
    const spans = code.querySelectorAll('span');
    spans.forEach(function(element){
        const text = element.textContent;
        const match = /\r|\n/.exec(text);
        if (match) {
            element.classList.add('line-counter');

            const count = (text.match(/\n/g) || []).length;
            if (count > 1) {
                element.classList.add('line-counter-after');
            }
        }
    });

    const last = [].slice.call(Array.from(spans).reverse()).pop();
    if (last) {
        last.classList.add('line-counter');
    }
};

function containsWhitespace(str) {
    return Boolean(str.match(/\s/));
}

function elementMajorMonoCap(element) {
    const fontFamily = css( element, 'font-family' );
    if (fontFamily === '"Major Mono Display", monospace') {
        const elText = element.textContent.toLowerCase();
        element.textContent = capCertainLetters(elText);
    }
}

// https://stackoverflow.com/a/7444724
function css( element, property ) {
    return window.getComputedStyle( element, null ).getPropertyValue( property );
}

function capCertainLetters(string) {
    const stringArray = string.split('');
    stringArray.forEach(function(char, index) {
        switch(char) {
            case 'a':
                stringArray[index] = 'A';
                break;
    
            case 'g':
                stringArray[index] = 'G';
                break;
    
            case 'h':
                stringArray[index] = 'H';
                break;
    
            case 'm':
                stringArray[index] = 'M';
                break;

            case 'r':
                stringArray[index] = 'R';
                break;

            case 'v':
                stringArray[index] = 'V';
                break;

            case 'w':
                stringArray[index] = 'W';
                break;

            case 'x':
                stringArray[index] = 'X';
                break;

            case 'z':
                stringArray[index] = 'Z';
                break;

            default:
                // body of default
        }
    });

    return(stringArray.join(''));
}