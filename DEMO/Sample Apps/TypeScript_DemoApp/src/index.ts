import {callingConfig, clientConfig} from './config/appEnvConfig'
import {
  ConnectionErrorEvent,
  ConnectionOnlineStatus,
  ConnectionState,
  ConnectionStateEvent,
  ConnectionStates,
  CoreSDK,
  NetworkConnectionEvent,
  RegistrationMgrInterface,
  RegManagerListener,
  WebsocketStateEvent,
  WSConnectionState,
} from './coreSdkLib/cpaasCoreSDK'

import { initializeCallingSdk } from './callingSdkLib/callingLib'

export {
  endCallHandler,
  getActiveCall,
  holdCallHandler,
  makeOutgoingCall,
  muteCallHandler,
  setActiveCall,
} from './callingSdkLib/callingLib'

let coreSDK: CoreSDK
let regMgr: RegistrationMgrInterface
let haveInitializedOtherSDKs = false

///////////////////////////////////////////////
export const startApp = async (): Promise<ConnectionState> => {
  setConnectionStatusText('App Startup')

  coreSDK = CoreSDK.getInstance()
  regMgr = coreSDK.getRegistrationManager()
  // Step 1: validate the client configuration found in the ./config/appEnvConfig.js file
  if (!validateConfigurationData(clientConfig)) {
    setConnectionStatusText('Bad Config Data')
    return ConnectionStates.CONNECT_FAILED
  }

  // Step 2: Initialize the Registration Manager with the configuration data
  regMgr.initialize(clientConfig)

  // Step 3: Provide our application event listeners to the Registration Manager
  regMgr.addRegManagerListener(regManagerEventListeners)

  // Step 4: Call Registration Manager 'appStart' method
  const appState = await regMgr.appStart().catch(() => {
    setConnectionStatusText('Startup Failure')
    return ConnectionStates.CONNECT_FAILED
  })

  setNetworkConnectionText(regMgr.isOnline() ? 'onLine' : 'offLine')
  setWebsocketStatusText(regMgr.isWebSocketConnected() ? 'open' : 'closed')

  setConnectionStatusText(appState)
  if (appState === ConnectionStates.CONNECTED) {
    // get and show the account line(s) information for confirmation
    await getAllAccountLines().catch(() => undefined)
  }

  return appState
}

////////////////////////////////////////////////////
// Verify the client configuration data
function validateConfigurationData(clientConfigData: any): boolean {
  return (
    clientConfigData &&
    clientConfigData.networkEnvironment &&
    clientConfigData.networkEnvironment.cpaasURLBase &&
    clientConfigData.networkEnvironment.euiURLBase &&
    clientConfigData.networkEnvironment.networkPingServer &&
    clientConfigData.clientId &&
    clientConfigData.clientPrivateKey &&
    clientConfigData.clientSecret &&
    clientConfigData.clientURLBase
  )
}

////////////////////////////////////////////////////
// Connection Status Event Handlers
const regManagerEventListeners: RegManagerListener = {
  onConnectionError: (event: ConnectionErrorEvent): void => {
    // eslint-disable-next-line no-console
    console.warn('Connection Error', event)
  },
  onConnectionState: (event: ConnectionStateEvent): void => {
    setConnectionStatusText(event.newConnectionState)
    if (event.newConnectionState === ConnectionStates.CONNECTED && !haveInitializedOtherSDKs) {
      haveInitializedOtherSDKs = true
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!
      // This is where the Calling SDK gets initialized, after the Core SDK has Connected
      initializeCallingSdk(callingConfig, coreSDK).catch((err) => {
        // eslint-disable-next-line no-console
        console.warn('Error initializing CallingSDK', err)
      })
    }
  },
  onNetworkConnection: (event: NetworkConnectionEvent): void => {
    setNetworkConnectionText(event.networkState)
  },
  onWebsocketConnection: (event: WebsocketStateEvent): void => {
    setWebsocketStatusText(event.websocketState)
  },
}

///////////////////////////////////////////////
// Puts message text in the 'Connection Status' text box
function setConnectionStatusText(msg: string): void {
  const statusTextEle = document.getElementById('connectionStatus') as HTMLInputElement
  if (statusTextEle) {
    statusTextEle.value = msg
    if (msg === ConnectionStates.CONNECTED) {
      statusTextEle.className = 'ok'
    } else {
      statusTextEle.className = ''
    }
  }
}

///////////////////////////////////////////////
// Puts message text into the 'InfoText' text box
function setInfoText(msg: string): void {
  const infoTextBox = document.getElementById('infoText')
  if (infoTextBox) {
    infoTextBox.innerHTML = msg
  }
}

///////////////////////////////////////////////
// Displays the current network connection text
function setNetworkConnectionText(status: ConnectionOnlineStatus): void {
  const networkConStatusEle = document.getElementById('onlineStatus') as HTMLInputElement
  if (networkConStatusEle) {
    networkConStatusEle.value = status
    if (status === 'onLine') {
      networkConStatusEle.className = 'ok'
    } else {
      networkConStatusEle.className = 'error'
    }
  }
}

///////////////////////////////////////////////
// Displays the current WebSocket connection text
function setWebsocketStatusText(status: WSConnectionState): void {
  const networkConStatusEle = document.getElementById('websocketStatus') as HTMLInputElement
  if (networkConStatusEle) {
    networkConStatusEle.value = status
    if (status === 'open') {
      networkConStatusEle.className = 'ok'
    } else {
      networkConStatusEle.className = 'error'
    }
  }
}

///////////////////////////////////////////////
// Allows html button event handler to call CPaaS Sign-In
export const userSignIn = (): void => {
  if (regMgr.getConnectionState() === ConnectionStates.NEW) {
    regMgr.cpaasSignIn()
  }
}

///////////////////////////////////////////////
// Allows html button event handler to call CPaaS Sign-Out
export const userSignOut = async (): Promise<void> => {
  if (regMgr.getConnectionState() !== ConnectionStates.NEW) {
    await regMgr.disconnect()
  }
}

///////////////////////////////////////////////
// Reads and displays the account line information
export const getAllAccountLines = async (): Promise<void> => {
  let accountLinesStr = ''
  if ([ConnectionStates.CONNECTED].includes(regMgr.getConnectionState())) {
    const accountLines = regMgr.getAllLines()

    for (const line of accountLines) {
      accountLinesStr += `msisdn: ${line.msisdn}, registered: ${line.regStatus ? 'true' : 'false'}\r\n`
    }
  }
  setInfoText(accountLinesStr)
  return Promise.resolve()
}
