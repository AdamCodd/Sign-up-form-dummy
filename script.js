const allinputs = document.querySelectorAll('input');
const passwordInput = document.querySelector('#password');

function validate(input) {
    let inputType = input.getAttribute('type');
    let alert = input.closest('div').nextElementSibling;
    let userInput, textError, regex;
    return function (e) {
        userInput = e.target.value;
        if (inputType === 'text' && (e.target.id === "fname" || e.target.id === "lname")) {
            regex = '^[-a-zA-Z]+$';
            textError = "You need to enter a correct name."
        }
        if (inputType === 'email') {
            regex = '^([-a-zA-Z.]+)@([-a-zA-Z.]+)\.([a-zA-Z]{2,5})$';
            textError = "You need to format your mail address like this: myemail@example.com";
        }
        if (inputType === 'tel') {
            regex = '^[0-9]{2}(?: |\.)?[0-9]{2}(?: |\.)?[0-9]{2}(?: |\.)?[0-9]{2}(?: |\.)?[0-9]{2}$';
            textError = "You need to format your phone like this: XX XX XX XX XX";
        }

        if (userInput.match(regex) === null) {
            input.classList.add('invalid');
            alert.classList.add('error');
            alert.innerHTML = textError;
        }

        /* Password matching */
        if (inputType === 'password' && e.target.id === 'password-confirm') {
            const passfield = document.querySelector('#password').value;
            const passconfirm = document.querySelector('#password-confirm').value;

            if (passfield !== passconfirm) {
                textError = '<span style="color:darkred;">Please make sure your passwords match.</span>';
                input.classList.add('invalid');
                alert.classList.add('error');
                alert.innerHTML = textError;
            }
        }
    }
}

function checkPassOnType(input) {
    let userInput;
    let inputType = input.getAttribute('type');
    return function (e) {
        userInput = e.target.value;
        let alert = input.closest('div').nextElementSibling;
        if (inputType === 'password' && e.target.id === 'password' && e.target.value.length > 0) {
            let nChars, number, nUpper, nLower, nSpecial;
            let notAllowed = false;
            nChars = number = nUpper = nLower = nSpecial = 'darkred';

            if (userInput.match('.{8,}') !== null) {
                nChars = 'darkgreen';
            }
            if (userInput.match('[0-9]') !== null) {
                number = 'darkgreen';
            }
            if (userInput.match('[A-Z]') !== null) {
                nUpper = 'darkgreen';
            }
            if (userInput.match('[a-z]') !== null) {
                nLower = 'darkgreen';
            }
            if (userInput.match('[:;,@!#%&_^$*+=-]') !== null) {
                nSpecial = 'darkgreen';
            }

            textError = `Your password should at least have <span style="color:${nChars};font-weight:bold;">8 characters</span>, <span style="color:${number};font-weight:bold;">1 number</span>, <span style="color:${nUpper};font-weight:bold;">1 uppercase character</span>, <span style="color:${nLower};font-weight:bold;">1 lowercase character</span>, <span style="color:${nSpecial};font-weight:bold;">1 special character</span>.`;

            if (userInput.match('[\'\"\<\>]') !== null) {
                notAllowed = true;
                textError = "These characters are not allowed (\", \', <, >).";
            }

            input.classList.add('invalid');
            alert.classList.add('error');
            alert.innerHTML = textError;

            if (nChars === "darkgreen" &&
                number === "darkgreen" &&
                nUpper === "darkgreen" &&
                nLower === "darkgreen" &&
                nSpecial === "darkgreen" &&
                notAllowed === false) {

                input.classList.remove('invalid');
                alert.classList.remove('error');
                alert.textContent = "";

            }
        }
    }
}

const main = document.querySelector('main');
const labelRequired = document.createElement("style");
labelRequired.innerHTML = '';
allinputs.forEach(input => {
    if (input.getAttribute('required') !== null) {
        labelRequired.innerHTML += `#${input.id} + label::after {content: "*"; font-size: 1.6rem; color: darkred;} `;
    }
    input.addEventListener('change', validate(input));
});
main.appendChild(labelRequired);

// Remove error hint on input
allinputs.forEach(input => {
    input.addEventListener('input', () => {
        let alert = input.closest('div').nextElementSibling;
        input.classList.remove('invalid');
        alert.classList.remove('error');
        alert.textContent = "";
    });
});

passwordInput.addEventListener('input', checkPassOnType(passwordInput));