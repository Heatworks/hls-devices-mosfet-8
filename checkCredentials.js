var crypto = require("crypto");
var fs = require("fs")

var getNodeREDSecurityKey = require("./basics.js").getNodeREDSecurityKey

function decryptNodeRED() {
    var key = getNodeREDSecurityKey();
    //key = "tLBr}MlQ3s1g[dr4sO!#4l&";
    var data = JSON.parse(fs.readFileSync(process.env.NODE_RED_CRED_FILE, 'utf8'));    
    var encryptedCredentials = data["$"];
    //encryptedCredentials = "07177e7e9fd13c64b1afe310dc5ff0d5QfXq6yIBRLrUqtMUwjaAv0x6Pc4dtzkXDYW3dBZiWtZxKmOJsNVg4mdaDc2ytsTN5fx62rirqnp5sAQFHHj0EzvXmlwCkx2NCQfgycO0";
    //encryptedCredentials = "bcdb64884d711786b7ab360bbdaad379z/hM1IERGEdSfERqA7PylI5q5+jaMqr8X8KkNfEeYZa3B25ZKowdRpbM5zsirJX5jU9AWrmOOHrPXvb8PRprjvmSi1Xk+NpY1+0PDgq3hZoIJ8QRqExnQf704PiQfzwVc6iP9H7enn4ICmnWpDA=";
    var encryptionAlgorithm = "aes-256-ctr";
    var encryptionKey = crypto.createHash('sha256').update(key).digest();
    var initVector = new Buffer(encryptedCredentials.substring(0, 32),'hex');
    encryptedCredentials = encryptedCredentials.substring(32);
    var decipher = crypto.createDecipheriv(encryptionAlgorithm, encryptionKey, initVector);
    var decrypted = decipher.update(encryptedCredentials, 'base64', 'utf8') + decipher.final('utf8');
    return JSON.parse(decrypted)
}

console.log(JSON.stringify(decryptNodeRED()));
