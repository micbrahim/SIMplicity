# Your Number Anywhere™️ - Developer Guide

This guide walks you through the steps to incorporate Your Number Anywhere™️ (YNA) voice call capabilities using a T-Mobile phone number into your application. Whether you're building a SIM call forking system, a click to call application that uses your customer's SIM line, or any other communication-based application, this document will help you build it. Let's dive in!

## Prerequisites 

Prior to using the Your Number Anywhere™️ API, you must:

- **Have an active DevEdge account.** This will be set up for you when you visit the T-Mobile booth.
- **Have an active Your Number Anywhere™️ API subscription.** You can confirm your subscription by clicking "My Account" on the DevEdge portal, and navigating to the "Software" tab as shown below.
<br/>

![](/Docs/Images/Dashboard.png)

<br/>

**3. Register an application on DevEdge.** You can create the application clicking the "manage registered apps" under the menu for the "Your Number Anywhere Calling API" software product as shown below.

<br/>

![](/Docs/Images/ManageApps.png)

![](/Docs/Images/RegisterApplication.png)

<img src="/Docs/Images/ApplicationRegistration.png" width="550">

**4. Register your redirect URI with T-Mobile.**

The redirect URL is the application URL you registered with T-Mobile during the subscription process, and is required for the OAuth authorization process. When a user completes the OAuth process, this is URL they will be returned to. Make sure you save your Client ID from the application you register, as shown below.

**Please note:** DevEdge will allow you to add the Redirect URI(s) once during the Application registration. Ensure that you are providing the URL that your application would be running on at this time. In case you want to change or add any more redirect URIs, you will have to delete existing application and create a new application with the new Redirect URI(s), since there is no option to update. However, it should not impact any attributes that your aplication will be using including client ID, Secret and keys

![](/Docs/Images/ViewAppSettings.png)

![](/Docs/Images/ClientID.png)

**5. Get your API keys.** 

This is your Client Secret from the application you registered. Refer to the this DevEdge [Authentication Documentation](https://devedge.t-mobile.com/documentation-hub/api-security/authentication) to understand how to create this.

Once you have completed all the necessary prerequisites, you are ready to build your application. To do so, you will use the following API services:
- **[Link Account](/Docs/yna-required-services-api-reference.md#linkAccount)**: This service takes your users through the T-Mobile's OAuth flow and allows a user to link their T-Mobile phone line for use with your application.
- **[Token](/Docs/yna-required-services-api-reference.md#oauth-token)**: This service allows the application to exchange the Auth code returned as part of Account linking for an access token that may be used with the Calling API.
- **[Account Status](/Docs/yna-required-services-api-reference.md#account-status)**: This API returns information about the phone number a user has linked for calling, and details needed to open up a WebSocket connection to the T-Mobile sysem.
- **[Unlink account](/Docs/yna-required-services-api-reference.md#account-unlink)**: This service allows your application to revoke authorization to a user's T-Mobile account and phone number.
- **[Update of E911 Address](/Docs/yna-required-services-api-reference.md#changeEmergencyAddress) (optional)**: An E911 address allows emergency services to determine the location of each phone or device, in case they need to call 911. The user must be provided with an option to update this address as needed. You application will redirect users to a web form hosted by T-Mobile in order to make these updates.
- **[YNA Calling APIs](/Docs/yna-calling-api-reference.md)**: The APIs your application will use to incorporate voice calling.

## T-Mobile User Login and line selection

Before using their phone number with YNA, customers must verify their identity with T-Mobile. Once validated, T-Mobile will offer the end user the option to select one of their lines to be used with your YNA-integrated application. When the user makes a selection, they authorize your application to use the selected line for voice call functionality.

The steps involved in this flow are described in the diagram below.

![](/Docs/Images/UserLineLinkingFlow.png)

1. **Send a GET request to /account/link**. When your user is ready to log in, use this request to retrieve the web form T-Mobile provides to allow the user to sign in with their T-Mobile login. Display this web form to the user and let them complete the authorization process.
2. **Retrieve the auth code**. When the user completes the sign-in flow, the T-Mobile system will redirect to the URI you specified when you registered your app. Your app should handle this redirect when it arrives, and retrieve the auth code that is included with it.
3. **Generate a PoP token**. Use the [TAAP library](https://devedge.t-mobile.com/documentation-hub/api-security/authentication) to get the PoP token you'll need for API requests
4. **Get your access token**. Send a GET request to /token, including the auth token you received via redirect previously. This will retrieve the access token you need for API requests.
 
## Registered phone number and WebSocket info

Once you have completed the process outlined above, your application has access to Your Number Anywhere™️ (YNA) API. Your application will now need to call the YNA API to:
- Determine which number a T-Mobile user has authorized your application to access
- Open a WebSocket connection to receive network notifications

Note: For this and all other API requests, you must authorize your request using the PoP token and access token described above, and as outlined in the [Authentication documentation](https://devedge.t-mobile.com/documentation-hub/api-security/authentication).

To get the registered phone number and WebSocket info, make a [GET request to /account/status](/Docs/yna-required-services-api-reference.md#account-status) A successful request will return the following parameters:
- **MSISDN:** This is the phone number chosen by the T-Mobile user to be used by your application. This number will be used as the sender of the call request, or included under "From" or per the [API specifications](/Docs/yna-calling-api-reference.md#start)
- **WebSocketInfo:** This is a URL to open a WebSocket connection from the client application to the T-Mobile network services. The application needs this WebSocket connection so it may receive asynchronous notifications such as 'in-coming phone call', or 'in-coming text message'. The provided WebSocket URL is typically passed as a parameter into a WebSocket class or utility, which creates the connection for the application. Once the WebSocket connection has been created, the application must 'maintain it' by sending 'ping' messages every 30 seconds to the backend server to ensure the connection is kept active. The network responds with a 'pong' if the WebSocket is still active. If the network fails to acknowledge a 'ping' with a 'pong', the application shall immediately reestablish the WebSocket. If reestablishing the WebSocket returns an error, the application shall request a new WebSocket URL from the registration API.

# Voice Calling

The sections below cover the steps necessary for an application to offer voice calling, including:
- Making an outbound call
- Accepting an incoming call
- Hold a call
- Resume a call on hold
- Media renegotiation
- Ending an active call

## Making an outbound call<a id="Outbound"></a>

This section walks you through the steps required to make outbound calls for a T-Mobile customer line using the Your Number Anywhere™️ (YNA) API.

![](/Docs/Images/OutgoingCallFlow.png)

### Familiarize yourself with WebRTC

WebRTC is a standard protocol for peer clients to exchange voice & video streams or data packets. In order to establish voice & video stream connections, each party negotiates information about the stream's encoding. The negotiation process consists of the originating side making an 'offer' and the receiving side returning an 'answer'. Negotiation may take several iterations, but it is usually completed in one offer-answer pass. Offers and answers are exchanged through 'signaling'. The signaling process is not included in the WebRTC specification. The T-Mobile network provides APIs for clients to negotiate a voice & video call offer-answer exchange. The offers and answers include a string collection of new line (\r\n) separated descriptors. This collection of strings is known as a Session Description Protocol (SDP).

For a good reference on WebRTC, please consult the [Mozilla Developer Network documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API).

### Initiating the call
- Your app should first create a new WebRTC peer connection and starts gathering ICE candidates.
- When ICE gathering is complete, set the offer (local description) on the peer connection.
- Start the call and provide the SDP offer by sending a [POST request to /start](/Docs/yna-calling-api-reference.md#start) as shown in Step 1 of the diagram above.
 
After you have initiated the call, the party receiving the call (the mobile terminator or "MT") receives and acknowledges incoming call, as shown in Step 2 of the diagram above. Additionally, your app will receive a "CallStartResponse" from the API as shown in Step 3 of the diagram.

### Acknowledge and process WebSocket Notifications
Next, as the call progresses through different statuses, your app will receive notifications through the open WebSocket connection it established previously. Specifically, when the Mobile terminator sends an "in progress" notification as shown in Step 4 above, your application will receive a corresponding notification through the WebSocket as shown in Step 5 above, which your application should acknowledge (Step 6) and then use to initiate relevant actions and communicate the current status to your user.

Similarly, when the Mobile terminator updates the call status to "ringing" as shown in Step 7, your application will receive a corresponding WebSocket notification (Step 8), and you can initiate the ringing function for your user.

### Mobile terminator accepts the call

<img src="/Docs/Images/Final-TerminatorAccept.png" width="550">

When the mobile terminator answers the call you initiated (Step 10 above), your app will receive a mobile terminator response (SDP) via the WebSocket connection (Step 11). Your app should then acknowledge the message, at which point the connection will be established, and the call is live. Once the call is connected, the media for the calls flows between the developer application and the T-Mobile Media gateway.

On the other hand, if the mobile terminator declines the call, your application will receive a call end notification instead, and the call will be ended.

## Putting a call on hold

Once a call is active, your application can request to put it on hold. This process is described in the diagram below.

<img src="/Docs/Images/Final-Holding.png" width="550">

### Initiating a call hold
First, your app should initiate the hold by sending a **POST request to /hold** on the YNA Calling API, as shown in Step 1 of the diagram above. A successful request will receive a '200 OK' response as shown in Step 2.

After the hold is accpeted (Steps 3 and 4), your app will then receive a "call held" notification via the WebSocket connection as shown in Step 5 above. It should acknowledge this notification (Step 6), and take the appropriate action to communicate the current status to your user as the call is now on hold.

### Receiving a call hold request
If the other party to a call initiates a hold request, you will first receive a hold request notification through the open websocket WebSocket connection. When this occurs, accept the hold by sending a **POST request to /acceptHold** as described in the API reference, after which the call will be placed on hold.

## Resuming a call
If you p active call is on hold, it may be resumed  as described in the diagram and subsequent steps below.

<img src="/Docs/Images/Final-Resuming.png" width="550">

### Resuming a call you put on hold
To resume a call you put on hold, first send a **POST request to /resume** as described in the API reference. This is shown in Step 1 of the diagram above, and will receive a '200 OK' response from the API if successful.

After this request has been sent, the mobile terminator will receive a call resume notification (Step 3) and accept the resumption of the call (Step 4). Your application will then receive a notification over the WebSocket connection (Step 5), which it should acknowledge (Step 6), after which the call will be resumed.

### Receiving a resume request
If the other party to a call initiated the hold, that party will have to initiate the resumption of the call. When this is done, your application will first receive a WebSocket notification. It should respond by sending a **POST request to /acceptResume** as described in the API reference. Once this is accomplished, the call will be resumed.

## Ending a call
Your application may end an active call using the Your Number Anywhere™️ API as described in the diagram and subsequent steps below.

<img src="/Docs/Images/Final-Ending.png" width="550">

To end a call, send a **DELETE request to /end** as described in the API reference. A successful response will receive a '200 OK' response (Step 1 above).

When the other party ends an active call, your application will receive a "call end" notification via the WebSocket as shown in Step 2 above, at which point it should acknowledge the notification (Step 3) and end the call for your user.

## Reciving Inbound calls

In addition to making outbound calls, your application can use the Your Number Anywhere™️ API to receive inbound calls, as described in the diagram and subsequent steps below.

![](/Docs/Images/AcceptInboundFlow.png)

<br/>

### 1. Establish a websocket connection to T-Mobile
As discussed elsewhere in this documentation, in order to receieve a call through the YNA API, you must first establish an open websocket connection with T-Mobile calling services. See [here](#Outbound) for more information on establishing a WebSocket connection.

### Recieving a call notification
Once you have established the websocket, when a call is placed (Step 1 above), you will receive a "Session Invitation Notification" through it (Step 2). Your client should acknowledge this notification (Step 3).

### Update the call status
While the call is being established, your application should keep the call's status updated so that both sides of the call are informed. This includes updating the status to:
- "In progress" - send a **POST request to /inProgress** (Step 4)
- "Ringing" - send a **POST request to /ringing/** (Step 6)

### If your user accepts the call
Your application should provide a way for the user to accept or reject the call - for example, by clicking a button in the user interface. For an inbound call, if your user accepts the call, send a **POST request to /connected** as shown in Step 9 above. A successful request will receive a 200 OK response from the API.

### If your user rejects the call
On the other hand, if your user chooses to reject or decline the call, end the call (as described here) by sending a **DELETE request to /end** as shown in Step 11. A successful request will receive a 200 OK response from the API. When this occurs, the other party will receive a call declined notification, and the call will be routed to the voicemail box for the phone number being used.

## Unlinking Accounts
The end user who have authorized your app to user their T-Mobile line with the YNA API must be able to remove their authorization from the device instance for the application. To do so, the application must invoke the Unlink Account API. The Unlink Account API ensures that:
- The user session is expired
- Any active registration of user's phone line on the network is removed
After unlink has been called, the application will not be able make any CPaaS API calls using the same access token. The user must authorize the application again using the T-Mobile OAuth process to allow the application to use the APIs again.

<img src="/Docs/Images/Final-Unlink.png" width="550">

## Managing users' signed-in instances

As a developer, you application can host a reference to the URL https://mydigits.t-mobile.com where the application users of YNA service can monitor if their account has been used to login to your application and they will have an option to Sign-out that instance from here, which will invalidate the access of user's account on your application instance.

The application user can do the following:

**Step 1: Go-to https://mydigits.t-mobile.com** 

Use any browser to access the portal using their same T-Mobile credentials used for Your Number Anywhere™️ on your application.

![](/Docs/Images/Final-Digits1.png)

**Step 2: Go to "Manage signed in devices" section**

![](/Docs/Images/Final-Digits2.png)

**Step 3: View the YNA application isntance**

This would show up here along with other application instances using YNA or DIGITS offering for same T-Mobile ID

**Step 4: Click "Sign Out"**

This will show a confirmation pop-up and the user can select "SIGN OUT" option to revoke permissions from your application instance.

![](/Docs/Images/Final-Digits3.png)
