document.getElementById('copy').addEventListener('click', copyToClipboard);

document.getElementById('generate').addEventListener('click', function() {
    var length = document.getElementById('length').value;
    var includeUppercase = document.getElementById('uppercase').checked;
    var includeNumbers = document.getElementById('numbers').checked;
    var includeSymbols = document.getElementById('symbols').checked;

    var lowerCharset = "abcdefghijklmnopqrstuvwxyz";
    var upperCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var numberCharset = "0123456789";
    var symbolCharset = "!@#$%^&*()";
    var charset = lowerCharset + 
                  (includeUppercase ? upperCharset : '') +
                  (includeNumbers ? numberCharset : '') +
                  (includeSymbols ? symbolCharset : '');

    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    document.getElementById('password-display').innerText = retVal;

    updateStrengthIndicator(retVal);

});


function copyToClipboard() {
    var password = document.getElementById('password-display').innerText;
    navigator.clipboard.writeText(password).then(function() {
        alert('Password copied to clipboard');
    }, function(err) {
        alert('Error in copying text: ', err);
    });
}

function updateStrengthIndicator(password) {
    var strengthIndicator = document.getElementById('strength-indicator');
    var strength = getPasswordStrength(password);
    strengthIndicator.style.backgroundColor = strength.color;
    strengthIndicator.innerText = strength.text;
}

function getPasswordStrength(password) {
    var strengths = {
        0: { text: 'Weak', color: 'red' },
        1: { text: 'Medium', color: 'orange' },
        2: { text: 'Strong', color: 'green' }
    };

    var score = 0;
    if (password.length > 6) score++;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) score++;

    return strengths[score];
}
