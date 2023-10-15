import {
  CallingSDK,
} from './cpaasCallingSDK.js'

let callingSDK
let callMgr
let primaryActiveCall

const MaxActiveCalls = 2

const NoVideoImage = './images/video_off.svg'

/* /////////////////////////////////// */
export const initializeCallingSdk = async (
  callingCfg,
  coreSdk,
  callListener
) => {
  callingSDK = CallingSDK.getInstance()
  callMgr = callingSDK.getCallManager()
  await callMgr.initialize(callingCfg, coreSdk)
  if (callListener) {
    callMgr.addCallManagerListener(callListener)
  }
  callMgr.addCallManagerListener(callManagerListener)
  const regMgr = coreSdk.getRegistrationManager()
  const lines = regMgr.getRegisteredMsisdns()
  const fromLineSelectEle = document.getElementById('fromNumberSelect')
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

/* /////////////////////////////////// */
const callManagerListener = {
  onIncomingCall(call) {
    call.startRingtone().catch((err) => {
      console.warn('Error playing RingTone', err)
    })

    // /*
    // // The basic Confirm dialog is limited to two choices
    // // So if this is an incoming video call, first ask the callee if they want Video
    // // If the answer is 'yes' proceed to answer the call.
    // // If the answer is 'no' then ask if they want to still take the call as Audio-only
    // */
    // let acceptVideo = false
    // let confirmAnswerAudio = false
    // if (call.hasIncomingVideo()) {
    //   const confirmAnswerWithVideo = window.confirm('Answer Incoming Video Call from: ' + call.getRemoteLine())
    //   if (confirmAnswerWithVideo) {
    //     acceptVideo = true
    //     confirmAnswerAudio = true
    //   }
    // }

   
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
  onCallStateChanged: (call, oldState) => {
    console.log('CallingLib onCallStateChanged', call.getNetworkCallId(), 'from ', oldState, 'to ', call.getState())
    if (primaryActiveCall && call.getNetworkCallId() === primaryActiveCall.getNetworkCallId()) {
      const callStatusEle = document.getElementById('callStatus')
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
  onTransferStatusChanged: (call, newState) => {
    console.log('onTransferStatusChanged', call.getNetworkCallId(), newState)
  },
  onTransferDetails: (call, targetUri, targetName) => {
    console.log('onTransferDetails', call.getNetworkCallId(), targetUri, targetName)
  },
  onMediaAdded: (call, media) => {
    console.log('onMediaAdded', call.getNetworkCallId(), media)
  },
  onMediaRemoved: (call, media) => {
    console.log('onMediaRemoved', call.getNetworkCallId(), media)
  },
  onLocalStream: (call, stream, hasVideo) => {
    console.log('onLocalVideoStreamAvailable', call.getNetworkCallId(), stream, hasVideo)
    const localVideoEle = document.getElementById('localVideo')
    if (localVideoEle) {
      if (hasVideo) {
        const videoTracks = stream.getVideoTracks()
        if (videoTracks.length) {
          if (!localVideoEle.srcObject) {
            // only update the stream if it is already connected
            localVideoEle.autoplay = true
            localVideoEle.srcObject = stream
            localVideoEle.muted = true
            videoTracks.forEach((tr) => (tr.enabled = true))
          }
        } else {
          console.warn('Onlocal stream event indicates stream has video but no video tracks found')
        }
      } else {
        // no Video.  Hide the video display
        localVideoEle.srcObject = undefined
        localVideoEle.poster = NoVideoImage
      }
    }
  },
  onRemoteStream: (call, stream, hasVideo) => {
    console.log('onRemoteVideoStreamAvailable', call.getNetworkCallId(), stream, hasVideo)
    const remoteVideoEle = document.getElementById('remoteVideo')
    if (remoteVideoEle) {
      if (hasVideo) {
        const videoTracks = stream.getVideoTracks()
        if (videoTracks.length) {
          console.log('onRemoteVideoStreamAvailable - connecting stream')
          if (!remoteVideoEle.srcObject) {
            // only update the stream if it is already connected
            remoteVideoEle.srcObject = stream
            remoteVideoEle.autoplay = true
            remoteVideoEle.muted = true
            videoTracks.forEach((tr) => (tr.enabled = true))
          }
        } else {
          console.warn('OnRemote stream event indicates stream has video but no video tracks found')
        }
      } else {
        /* Hide the video display */
        remoteVideoEle.srcObject = undefined
        remoteVideoEle.poster = NoVideoImage
      }
    }
  },
  onVideoUpgradeRequested: (call) => {
    const acceptVideoUpgrade = window.confirm('Remote party wants to provide video.  Accept?')
    if (acceptVideoUpgrade) {
      call.acceptRemoteVideoRequest().catch()
    } else {
      call.rejectRemoteVideoRequest().catch()
    }
  },
}

/* ///////////////////////////////////
// Define accessor methods so html page can get/set the active call
*/
export const getActiveCall = () => primaryActiveCall
export const setActiveCall = (call) => {
  primaryActiveCall = call
  const callStatusEle = document.getElementById('callStatus')
  if (callStatusEle) {
    callStatusEle.value = call?.getState() || 'disconnected'
  }
}

/* /////////////////////////////////// */
export const makeOutgoingCall = async (
  toPhoneNumber,
  fromPhoneNumber,
  withVideo,
  isSecondaryCall
) => {
  if (!callMgr) {
    console.log('makeOutgoingCall called before call Manager created')
    return Promise.resolve(undefined)
  }
  const calls = callMgr.getAllCalls()
  if (calls.length >= MaxActiveCalls) {
    return Promise.reject('Already have active calls')
  }

  if (calls.length) {
    /* Make sure this new request is not an accidental double click of the 'call' UI button */
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

/* /////////////////////////////////// */
export const muteCallHandler = async (callId) => {
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

/* /////////////////////////////////// */
export const isCallMuted = (callId) => {
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

/* /////////////////////////////////// */
export const holdCallHandler = async (callId) => {
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

/* /////////////////////////////////// */
export const isCallOnHold = (callId) => {
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

/* /////////////////////////////////// */
export const endCallHandler = async (callId) => {
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
