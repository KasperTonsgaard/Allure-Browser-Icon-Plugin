
let organized_tests = [];

function generate_html(browser_type) {
    var tag = document.createElement("div");
    tag.classList.add("tree__strut");
    tag.classList.add("browser-icon");
    tag.innerHTML = '<img class="browser-icon-img" src="/plugins/browser-icon/src/dist/static/chrome.png">';
    return tag
}

fetch('/data/suites.json')
    .then((response) => response.json())
    .then((suites) => {
        suites.children.forEach(tests => {
            tests.children.forEach(test => {
                if (test.tags.includes('chrome')) {
                    organized_tests.push(["chrome", test.uid])
                }
                if (test.tags.includes('firefox')) {
                    organized_tests.push(["firefox", test.uid])
                }
            });
        });
        console.log(organized_tests)
    });



setInterval(() => {

    organized_tests.forEach(test => {
        const element = document.querySelector("[data-uid='"+ test[1] +"']");
        if (element == null) return
        if (element.getElementsByClassName('browser-icon').length > 0) return;

        const img = generate_html(test[0])
        element.insertBefore(img, element.children[-1]);
    });

}, 1000);
