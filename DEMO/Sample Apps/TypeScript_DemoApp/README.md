# CPaaS Calling DemoApp
* This is a very simple sample application to show how the CoreSDK and CallingSDK might be integrated and accessed in a TypeScript project.
## Install Files
* Copy the distributed files to your local machine if you do not have direct access to them already.
## Building the DemoApp
* Make sure the CoreSDK files are in the coreSdkLib directory, and CallingSDK files are in the callingSdkLib directory.
* Make sure TypeScript has been installed and is accessible from the command line.
* Make sure NodeJS has been installed and is accessible on the command line to run 'npm' utilities.  Can use NodeJS v14 through V18
* Make sure you have a T-Mobile test account you can use.
* Use a code editor to configure the empty fields in the 'src/config/appEnvConfig.ts' file. Enter your particular 'clientId', 'clientSecret', etc., and save your changes.
* Run "npm install" one time to install the node modules
* Run "npm run build" or "npm run build:debug" to build the CallingDemoApp
## Running the DemoApp
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
