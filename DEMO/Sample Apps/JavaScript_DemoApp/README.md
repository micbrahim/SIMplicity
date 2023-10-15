# CPaaS pure JavaScript Calling App
* This is a very simple sample application to show how the CoreSDK and CallingSDK might be integrated and accessed in a pure JavaScript application.
## Install Files
* Copy the distributed files to your local machine if you do not have direct access to them already.
## Running the DemoApp
* Use a code or text editor to configure the empty fields in the 'public/config/appEnvConfig.ts' file. Enter your particular 'clientId', 'clientSecret', etc., then save your changes.
* Open a terminal window and change directories into 'public' a sub-directory of this project.
* Use a local web server utility to host the files in the public directory on port 8080.  There is a npm package called 'serve' that can be used.  <br>
  Or if you have python installed you can use python -m SimpleHTTPServer 8080 <br>
* Open a Chrome or Edge web browser tab and navigate to 'http:localhost:8080'.  The DemoApp page should appear. <br>
* If you encounter troubles with the browser accessing your microphone or speakers when running an 'http' site, refer to this StackOverflow article for how to enable access to devices through http access: https://stackoverflow.com/questions/47995355/chrome-is-not-letting-http-hosted-site-to-access-camera-microphone. Essentially open a new browser tab for chrome://flags/#unsafely-treat-insecure-origin-as-secure, and set this option to 'enabled'
* Click on the 'Sign In' button which will redirect the browser to the CPaaS authentication and account registration pages.  When this action completes it will<br>
  redirect the browser back to the sample app, and the 'Reg connection Status' fields will update to show connection information. <br>
* If there is a registered line appearing in the 'Account Lines' text box, you are ready to make a phone call.<br>
* Enter a phone number in the 'To' text box.
* Click on the 'Call' button.  The call initiation shall begin and update the status in the 'Call Status' text box.
* Click any of the other call buttons to perform the indicated action.
