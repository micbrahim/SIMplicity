import {
  Call,
  CallingSDK,
  CallManager,
  CallManagerListener,
  CallManagerConfig,
  CallState,
  CallMedia,
} from './cpaasCallingSDK'
import { CoreSDK } from '../coreSdkLib/cpaasCoreSDK'

let callingSDK: CallingSDK
let callMgr: CallManager
let primaryActiveCall: Call

const MaxActiveCalls = 2

///////////////////////////////////////
export const initializeCallingSdk = async (
  callingCfg: CallManagerConfig,
  coreSdk: CoreSDK,
  callListener?: CallManagerListener
): Promise<void> => {
  callingSDK = CallingSDK.getInstance()
  callMgr = callingSDK.getCallManager()
  await callMgr.initialize(callingCfg, coreSdk)
  if (callListener) {
    callMgr.addCallManagerListener(callListener)
  }
  callMgr.addCallManagerListener(callManagerListener)
  const regMgr = coreSdk.getRegistrationManager()
  const lines = regMgr.getRegisteredMsisdns()
  const fromLineSelectEle = document.getElementById('fromNumberSelect') as HTMLSelectElement
  if (fromLineSelectEle) {
    let isFirst = true
    for (const line of lines) {
      const newOption = document.createElement('option')
      newOption.value = line
      newOption.innerText = line
      newOption.selected = isFirst
      fromLineSelectEle.add(newOption)
      isFirst = false
    }
  }
}

///////////////////////////////////////
const callManagerListener: CallManagerListener = {
  onIncomingCall(call: Call) {
    call.startRingtone().catch((err) => {
      console.warn('Error playing RingTone', err)
    })

    // Use the browser built-in confirmation dialog for simplicity
    const confirmAnswerAudio = window.confirm('Answer Incoming Audio Call from: ' + call.getRemoteLine())

    if (!confirmAnswerAudio) {
      call.end().catch((err) => {
        console.warn('error ending call', err)
      })
    } else {
      call
        .answer(false, false)
        .catch((err) => console.warn('error answering call', err))
        .then(() => setActiveCall(call))
    }
  },
  onCallStateChanged: (call: Call, oldState: CallState): void => {
    console.log('CallingLib onCallStateChanged', call.getNetworkCallId(), 'from ', oldState, 'to ', call.getState())
    if (primaryActiveCall && call.getNetworkCallId() === primaryActiveCall.getNetworkCallId()) {
      const callStatusEle = document.getElementById('callStatus') as HTMLInputElement
      const callState = call.getState()
      if (callStatusEle) {
        callStatusEle.value = callState
      }
      if (['disconnected', 'ended', 'failed'].includes(callState)) {
        setActiveCall(undefined)
        if (callState === 'disconnected') {
          const callButtonEle = document.getElementById('callButton')
          if (callButtonEle) {
            callButtonEle.removeAttribute('disabled')
          }
        }
      }
    }
  },
  onTransferStatusChanged: (call: Call, newState: 'fail' | 'ok'): void => {
    console.log('onTransferStatusChanged', call.getNetworkCallId(), newState)
  },
  onTransferDetails: (call: Call, targetUri: string, targetName: string): void => {
    console.log('onTransferDetails', call.getNetworkCallId(), targetUri, targetName)
  },
  onMediaAdded: (call: Call, media: CallMedia): void => {
    console.log('onMediaAdded', call.getNetworkCallId(), media)
  },
  onMediaRemoved: (call: Call, media: CallMedia): void => {
    console.log('onMediaRemoved', call.getNetworkCallId(), media)
  },
  onLocalStream: (call: Call, stream: MediaStream, hasVideo: boolean): void => {
    console.log('onLocalVideoStreamAvailable', call.getNetworkCallId(), stream, hasVideo)
  },
  onRemoteStream: (call: Call, stream: MediaStream, hasVideo: boolean): void => {
    console.log('onRemoteVideoStreamAvailable', call.getNetworkCallId(), stream, hasVideo)
  },
}

///////////////////////////////////////
// Define accessor methods so html page can get/set the active call
export const getActiveCall = (): Call => primaryActiveCall
export const setActiveCall = (call: Call): void => {
  primaryActiveCall = call
  const callStatusEle = document.getElementById('callStatus') as HTMLInputElement
  if (callStatusEle) {
    callStatusEle.value = call?.getState() || 'disconnected'
  }
}

///////////////////////////////////////
export const makeOutgoingCall = async (
  toPhoneNumber: string,
  fromPhoneNumber?: string,
  withVideo?: boolean,
  isSecondaryCall?: boolean
): Promise<Call> => {
  if (!callMgr) {
    console.log('makeOutgoingCall called before call Manager created')
    return Promise.resolve(undefined)
  }
  const calls = callMgr.getAllCalls()
  if (calls.length >= MaxActiveCalls) {
    return Promise.reject('Already have active calls')
  }

  if (calls.length) {
    // Make sure this new request is not an accidental double click of the 'call' UI button
    for (const call of calls) {
      if (call.getRemoteLine() === toPhoneNumber && call.getLocalLine() === fromPhoneNumber) {
        return Promise.reject('Call already established')
      }
    }
  }

  console.log(
    'makeOutgoingCall, toNumber, fromNumber, withVideo, isSecondary',
    toPhoneNumber,
    fromPhoneNumber,
    withVideo,
    isSecondaryCall
  )

  const activeCallInstance = await callMgr.startNewCall(toPhoneNumber, fromPhoneNumber, withVideo).catch((err) => {
    console.warn('Error starting outgoing call', err.message)
    activeCallInstance.end().catch()
    return Promise.reject(err)
  })

  await activeCallInstance.startRingback().catch((err) => {
    console.warn('Error playing ringback tone', err)
  })
  return Promise.resolve(activeCallInstance)
}

///////////////////////////////////////
export const muteCallHandler = async (callId: string): Promise<boolean> => {
  if (!callMgr) {
    console.log('muteCallHandler called before call Manager created')
    return Promise.resolve(undefined)
  }
  const call = callMgr.getCallById(callId)
  if (call) {
    if (call.isMuted()) {
      await call.unmute()
      return Promise.resolve(false)
    } else {
      await call.mute()
      return Promise.resolve(true)
    }
  }
  console.warn('muteCallHandler Call not found', callId)
  return Promise.resolve(false)
}

///////////////////////////////////////
export const isCallMuted = (callId: string): boolean => {
  if (!callMgr) {
    console.log('muteCallHandler called before call Manager created')
    return false
  }
  const call = callMgr.getCallById(callId)
  if (call) {
    return call.isMuted()
  }
  console.warn('isCallMuted Call not found', callId)
  return false
}

///////////////////////////////////////
export const holdCallHandler = async (callId: string): Promise<boolean> => {
  if (!callMgr) {
    console.log('holdCallHandler called before call Manager created')
    return Promise.resolve(false)
  }
  const call = callMgr.getCallById(callId)
  if (call) {
    if (['held_locally', 'held_both'].includes(call.getHoldState())) {
      await call.resume()
      return Promise.resolve(false)
    } else {
      await call.hold()
      return Promise.resolve(true)
    }
  }
  console.warn('holdCallHandler Call not found', callId)
  return Promise.resolve(false)
}

///////////////////////////////////////
export const isCallOnHold = (callId: string): boolean => {
  if (!callMgr) {
    console.log('isCallOnHold called before call Manager created')
    return false
  }
  const call = callMgr.getCallById(callId)
  if (call) {
    return call.isOnHold()
  }
  console.warn('isCallOnHold Call not found', callId)
  return false
}

///////////////////////////////////////
export const endCallHandler = async (callId: string): Promise<void> => {
  if (!callMgr) {
    console.log('endCallHandler called before call Manager created')
    return Promise.resolve(undefined)
  }
  const call = callMgr.getCallById(callId)
  if (call) {
    await call.end()
  }
  console.warn('endCallHandler Call not found', callId)
}

////////////////////////////////////
// Utility Sleep function.  Delays from 1 to 10_000 ms
function sleep(sleepSeconds: number): Promise<void> {
  return new Promise((resolve) => {
    const sleepDuration = Math.min(Math.max(sleepSeconds * 1000, 1), 10_000)
    window.setTimeout(() => resolve(), sleepDuration)
  })
}
