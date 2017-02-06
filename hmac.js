var qs = require('qs');
var crypto = require('crypto');

/**
 * Verify HMAC
 * @param proto     http or https
 * @param hostname  domain name with an appended /
 * @param path      file path
 * @param method    POST or GET
 * @param params    JSON object of all of the POST params
 * @param nonce     Number Once
 * @param apikey    API Key
 * @param hmacsig   The X-Authy-HMAC-Signature
 * @returns {boolean}
 */
function verifyHMAC(proto, hostname, path, method, params, nonce, apikey, hmacsig) {

    var url = proto + hostname + path;
    console.log('url\n', url);
    var sorted_params = qs.stringify(params).split("&").sort().join("&").replace(/%20/g, '+');
    console.log('sorted params\n', sorted_params);
    var data = nonce + "|" + method + "|" + url + "|" + sorted_params;
    console.log('data url\n', data);
    var computed_sig = crypto.createHmac('sha256', apikey).update(data).digest('base64');
    console.log('computed sig\n', computed_sig);
    console.log('hmac sig\n', hmacsig);
    return hmacsig == computed_sig;
}

////////////////////////////////////////////////////////
//  You'll want to modify the following based upon the
//   ngrok info you see at localhost:4040
////////////////////////////////////////////////////////


/**
 * This should be the payload of the JSON request when inspecting the
 * request at localhost:4040 with ngrok.io
 */
var JSON;                                   // JSON object of all of the request params

var req_proto = 'https://';                 // or 'http://'
var req_hostname = 'yourdomain.ngrok.io';   // Your ngrok.io domain if using ngrok
var req_path = 'authy/callback';            // The path to your callback
var req_apiKey = '';                        // Your Authy API Key
var req_method = '';                        // or 'GET'
var req_nonce = '';                         // The nonce (number once) will be found in the headers of the ngrok callback
var req_hmac_sig = '';                      // Also found in the request headers

if(req_hostname !== "yourdomain.ngrk.io" && req_apiKey && req_method && req_nonce && req_hmac_sig && JSON){
    var matching = verifyHMAC(req_proto, req_hostname, req_path, req_method, json, req_nonce, req_apiKey, req_hmac_sig);
    if(matching){
        console.log("Signatures match");
    } else {
        console.log("Signatures dont match.  Did you use the correct protocol, hostname and path?");
    }
} else {
    console.log("Please update all request parameters.");
}

