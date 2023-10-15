
/////////////////////////////////////////////////////
// Client Configuration Data
////////////////////////////////////////////////////
import { CoreSdkConfig, CpaasNetworkEnvironment } from '../coreSdkLib/cpaasCoreSDK'
import { CallManagerConfig } from '../callingSdkLib/cpaasCallingSDK'

export const clientConfig: CoreSdkConfig = {
  networkEnvironment: {
    cpaasURLBase: 'https://naas.t-mobile.com',
    euiURLBase: 'https://account.t-mobile.com',
    networkPingServer: 'https://digits.t-mobile.com',
  } as CpaasNetworkEnvironment,
  clientId: '', // Copy and Paste CPaaS clientId between the quote marks
  clientURLBase: '', // Paste your applications redirection URL between the quote marks
  clientSecret: '', // Copy and Paste CPaaS secret between the quote marks
  clientPrivateKey: '', // Copy and Paste CPaaS Private Key between the quote marks
}

/////////////////////////////////////////////////////
// Calling Config
////////////////////////////////////////////////////
export const callingConfig: CallManagerConfig = {
  autoAcceptVideoUpgrade: {
    enabled: false, // false by default
  },
  callLogStorage: 'indexed-db',
  dtmfFolderURLPrefix: './soundFiles/tones',
  ringbackToneURL: './soundFiles/internal_telephone_ring.ogg',
  ringToneURL: './soundFiles/T-Mobile_RingTone.ogg',
  turnServerDomain: 'stun.l.google.com',
  turnServerPort: 19302,
}
