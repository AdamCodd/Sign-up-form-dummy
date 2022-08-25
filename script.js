const allinputs = document.querySelectorAll('input');

function validate(input) {
    return function (e) {
        let pattern;
        if (input.getAttribute('type') === 'email') {

        }
        if (input.getAttribute('type') === 'password') {

        }
    }
}

allinputs.forEach(input => {
    input.addEventListener('input', validate(input));
});