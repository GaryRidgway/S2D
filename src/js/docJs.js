let globals = [];
const regex = /global$/gi;
document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(function(element){
    const found = element.textContent.match(regex);
    if (found) {
        element.textContent = 'Examples';
    }
});