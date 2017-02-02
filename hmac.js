var qs = require('qs');
var crypto = require('crypto');

/**
 * Verify HMAC
 * @param proto
 * @param hostname
 * @param url
 * @param method
 * @param params
 * @param nonce
 * @param apikey
 * @param hmacsig
 * @returns {boolean}
 */
function verifyHMAC(proto, hostname, url, method, params, nonce, apikey, hmacsig) {

    var url = proto + hostname + url;

    // Sort the params.
    var sorted_params = qs.stringify(params).split("&").sort().join("&").replace(/%20/g, '+');

    var data = nonce + "|" + method + "|" + url + "|" + sorted_params;

    var computed_sig = crypto.createHmac('sha256', apikey).update(data).digest('base64');
    console.log('computed: ', computed_sig);
    console.log('hmac:     ', hmacsig);

    return hmacsig == computed_sig;
}

////////////////////////////
//  You'll want to modify the following based upon the ngrok info you see at localhost:4040
////////////////////////////

/**
 * This should be the payload of the JSON request
 */
var params = {
    "authy_id": 23355396,
    "device_uuid": 29319688,
    "callback_action": "approval_request_status",
    "uuid": "f86232d0-cbbd-0134-bd1c-1241e5695bb0",
    "status": "approved",
    "approval_request": {
        "transaction": {
            "details": {
                "email": "josh@twilio.com"
            },
            "device_details": null,
            "device_geolocation": null,
            "device_signing_time": 1486071562,
            "encrypted": false,
            "flagged": false,
            "hidden_details": null,
            "message": "Request login to Twilio demo app",
            "reason": "",
            "requester_details": null,
            "status": "approved",
            "uuid": "f86232d0-cbbd-0134-bd1c-1241e5695bb0",
            "created_at_time": 1486071556,
            "customer_uuid": 44829
        },
        "expiration_timestamp": 1486157956,
        "logos": null,
        "app_id": "5841ae5d7c59f34dcb24cb7b"
    },
    "signature": "WiVF1jFHW4F788Cs8X+F3LIJogRqHvHHNIfajst/qnPv/39ZkONWG0mm8v82u2ZSzVSlgkKFXcfHLxY5gn+wUDoOvc24/2MG4mZKu8BPY9cmhuWQTRgGuUf40WNsO26FxdNFzrUU1J3aylhPcbPXbB5kPSIW9ZPitVHNDwY1p3jYUAO9ae3azFBVQJqhCqDnP407TJra4Qzwsn7zQafWqsY3/RHYzqoRrRyn4+q/RBfdCRRL0npLgfJ7GqkiC8sWUPlFAdbriZyRaCy3IZwCe/XRwj+7RIErQ8JP7DToPrG2lu0/7EuLzBEaw5k+7pfCoJ+MW0iLLCKf0Yk4l1qKWg=="
};

var req_proto = 'https://';  // this could also be http
var req_hostname = 'authyse.ngrok.io/';
var req_url = 'authy/callback';
var req_apiKey = "";
var req_method = 'POST'; // or 'GET'
var req_nonce = '1486071562';
var req_hmac_sig = 'ba+scT3viU7zknpdQJzjgwhhaP6+WtUBLpeVFJxBBZs=';
var matching = verifyHMAC(req_proto, req_hostname, req_url, req_method, params, req_nonce, req_apiKey, req_hmac_sig);

if(matching){
    console.log("Sigs match");
} else {
    console.log("Sigs dont match");
}