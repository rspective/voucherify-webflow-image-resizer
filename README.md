# voucherify-webflow-image-resizer
Resize Webflow images through Webflow API

This script downloads your images from your specified Webflow Collection, manipulates them and then sends them back.

Use `http-server` to start local server inside app folder

Use `ngrok` (https://dashboard.ngrok.com/get-started/setup) to start tunneled connection. Make sure that the local server and Ngrok are using the same port.

Issues:

When updating an Webflow item remember to update also the requried fields (even if you're not changing them)