var randomstring = require("randomstring");

var organization = "heatworks"
var deviceName = "mosfet8/unknown"
var accessToken = "defaultAccessToken"


console.log(`Using credential file: ${process.env.NODE_RED_CRED_FILE}`);
console.log(`Using flow file: ${process.env.NODE_RED_FLOW_FILE}`);
console.log(`Using settings file: ${process.env.NODE_RED_SETTINGS_FILE}`);

// Neccessary environment variables:
if (!("NODE_RED_CRED_FILE" in process.env)) {
    throw new Error("Credential file (NODE_RED_CRED_FILE) must be set in the environment variables.");
}
if (!("NODE_RED_FLOW_FILE" in process.env)) {
    throw new Error("Flow file (NODE_RED_FLOW_FILE) must be set in the environment variables.");
}
if (!("NODE_RED_SETTINGS_FILE" in process.env)) {
    throw new Error("Settings file (NODE_RED_SETTINGS_FILE) must be set in the environment variables.");
}

var setNodeREDSecurityKey = require("./basics.js").setNodeREDSecurityKey;
var encryptNodeRED = require("./basics.js").encryptNodeRED;
var updateFlowFile = require("./basics.js").updateFlowFile;

var randomUserKey = randomstring.generate();

setNodeREDSecurityKey(randomUserKey);

encryptNodeRED(randomUserKey, { 'd88144d2.de1c88': { user: 'HLS:AccessToken', password: accessToken } } )

updateFlowFile(organization, deviceName)