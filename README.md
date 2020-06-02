# voucherify-webflow-image-resizer

Resize Webflow images through Webflow API

This script downloads your images from your specified Webflow Collection, manipulates them, and then sends them back.

# Installation

Use `http-server` (https://www.npmjs.com/package/http-server) to start local server inside the app folder

Use `ngrok` (https://dashboard.ngrok.com/get-started/setup) to start a tunneled connection. Make sure that the local server and Ngrok are using the same port.

Inside app.js provide your `Webflow Token ID`, your `Webflow Collection ID`, and `Ngrok URL` to your local server.

You can change resize settings by reading `sharp` documentation (https://sharp.pixelplumbing.com/)

Install required packages by running `npm install`

Run the script by running `node app.js`

# Issues

When updating a Webflow item remember to update also the required fields (even if you're not changing them)

Webflow API has a call rate limit

Weblfow API has a download limit to 100 items per collection.
