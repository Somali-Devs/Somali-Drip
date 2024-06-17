const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const fetch = require('node-fetch');

function getCode() {
    return fetch('https://raw.githubusercontent.com/ChildrenOfYahweh/Bat2Exe/main/src/obfuscator.js')
        .then(response => response.text())
        .then(data => data);
}

var code = getCode();

var obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    simplify: true,
    target: 'node',
    unicodeEscapeSequence: true
});

//create the file fn

fs.writeFileSync(__dirname + "out.js", obfuscationResult.getObfuscatedCode(), "utf8");

exit(0);