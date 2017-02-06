# HMAC Signature Calculation

This code snipping will calculate an HMAC signature for you.  Use it to troubleshoot other HMAC calculations.

### Steps

Use Ngrok (localhost:4040) to:

1. Grab the JSON object from the **Summary** tab.
1. From the **Headers** tab
    1. Grab the X-Authy-Signature
    1. Grab the X-Authy-Signature-Nonce
1. Edit the hmac.js variables
1. Run `node hmac.js`
1. Output will tell you if sigs match or not.

#### OneTouch Headers
Get the JSON object from here.

![Authy](https://raw.githubusercontent.com/AuthySE/hmac-calculator/master/onetouch-headers.png)

#### OneTouch Summary
Get the nonce and signature from here.

![Authy](https://raw.githubusercontent.com/AuthySE/hmac-calculator/master/onetouch-summary.png)

