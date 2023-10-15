declare interface AccountLineInfo {
    msisdn: string;
    regStatus: boolean;
}

declare interface ApiStatus {
    data?: any;
    error?: any;
    headers?: Headers;
    ok: boolean;
    status: number;
    statusText: string;
}

export declare interface AudioDeviceInfo {
    groupId: string;
    label: string;
    isCurrentSelection: boolean;
}

export declare class Call {
    private callerId;
    private callManager;
    private camera;
    private cfg;
    private daasCallingApis;
    private readonly direction;
    private readonly id;
    private callMedias;
    private readonly isConferenceCall;
    private isRingTonePlaying;
    private listeners;
    private localLine;
    private readonly logger;
    private maxCallResponseWaitTimer;
    private microphone;
    private networkCallId;
    private origTime;
    private relatedSessionId;
    private remoteAudioElement;
    private remoteLine;
    private serverCorrelator;
    private speakers;
    private state;
    private toneHelper;
    constructor(id: string, initialNetworkCallId: string, direction: CallDirection, initCallMedias: CallMedia[], localLine: string, remoteLine: string, relatedSessionId: string, _instanceId: string, callerId: string, callManager: CallManager, cfg: CallManagerConfig, isConference?: boolean, serverCorrelator?: string);
    getId: () => string;
    getNetworkCallId: () => string;
    getState: () => CallState;
    getDirection: () => CallDirection;
    getCallerId: () => string;
    start: () => Promise<void>;
    isConference: () => boolean;
    isIncoming: () => boolean;
    isOutgoing: () => boolean;
    hasAudio: () => boolean;
    getMediaStream: (side: CallMediaSide, mediaType: CallMediaType) => MediaStream;
    isMediaStreamAvailable: (side: CallMediaSide, media: CallMediaType) => boolean;
    getRemoteLine: () => string;
    setRemoteLine: (line: string) => void;
    getLocalLine: () => string;
    getSpeakers: () => Device;
    getMicrophone: () => Device;
    answer: (acceptIncomingVideo?: boolean, provideOutgoingVideo?: boolean) => Promise<void>;
    end: () => Promise<void>;
    hold: () => Promise<void>;
    resume: () => Promise<void>;
    mute: () => Promise<void>;
    unmute: () => Promise<void>;
    isMuted: () => boolean;
    sendDTMF: (dtmfCodes: string) => Promise<void>;
    addCallListener: (listener: CallListener) => void;
    failureStatusReceived: (code: number) => Promise<void>;
    callStatusChanged: (statusCode: number) => void;
    getServerCorrelator: () => string;
    startRingback: () => Promise<void>;
    stopRingback: () => void;
    startRingtone: () => Promise<void>;
    stopRingtone: () => void;
    receivedCallActive: (serverCorrelator?: string) => void;
    onLocalStream: (stream: MediaStream, hasVideo: boolean) => void;
    onRemoteStream: (stream: MediaStream, hasVideo: boolean) => void;
    reconnectCall: () => Promise<boolean>;
    callRejectedRemotely: () => Promise<void>;
    callEndedRemotely: () => Promise<void>;
    receivedCallHold: () => void;
    receivedCallResume: () => void;
    mediaRemovedRemotely: (removedMediaType: CallMediaType) => void;
    mediaAddedRemotely: (addedMediaType: CallMediaType) => void;
    transferStatusChanged: (status: 'fail' | 'ok') => void;
    getAudioElements: () => MapOf<HTMLAudioElement>;
    getRTCPeerConnection: () => RTCPeerConnection;
    ignoreCall: () => void;
    setMicrophone: (newDeviceId: string) => Promise<void>;
    setSpeakers: (newDeviceId: string) => Promise<void>;
    getSpeakerVolume: () => number;
    setSpeakerVolume: (volumeLevel: number) => void;
    getAvailableAudioDevices: () => Promise<AudioDeviceInfo[]>;
    updateAudioPairByGroupId: (deviceGroupId: string) => Promise<void>;
    isOnHold: () => boolean;
    getHoldState: () => CallState | '';
    isConnected: () => boolean;
    revive: () => Promise<boolean>;
    getCallStartTime: () => number;
    private endCall;
    private updateState;
    private notifyListeners;
    private getDeviceById;
    private getCallSession;
    private playDtmfTone;
    private callHasEnded;
    private getCurrentDefaultMicrophone;
    private getDeviceList;
    private initializeDevices;
    private updateMediaDevice;
    private hasMedia;
    private addMedia;
    private removeMedia;
}

export declare type CallDirection = 'incoming' | 'outgoing';

export declare class CallFilter {
    private readonly cfg;
    constructor(cfg: CallFilterConfig);
    filter: (call: Call) => boolean;
    static fromConfig: (cfgOrInstance: CallFilterConfig | CallFilter) => CallFilter;
}

export declare interface CallFilterConfig {
    direction?: CallDirection;
    state?: CallState;
}

export declare class CallingSDK {
    private static instance;
    static getInstance: () => CallingSDK;
    getCallManager: () => CallManager;
    getVersion: () => string;
}

export declare interface CallListener {
    onCallStateChanged?(call: Call, oldState: CallState): void;
    onTransferStatusChanged?(call: Call, newState: 'fail' | 'ok'): void;
    onTransferDetails?(call: Call, targetUri: string, targetName: string): void;
    onMediaAdded?(call: Call, media: CallMedia): void;
    onMediaRemoved?(call: Call, media: CallMedia): void;
    onLocalStream?(call: Call, stream: MediaStream, hasVideo: boolean): void;
    onRemoteStream?(call: Call, stream: MediaStream, hasVideo: boolean): void;
}

export declare class CallManager {
    private calls;
    private cfg;
    private daasCallingApis;
    private isServiceInitialized;
    private listeners;
    private readonly logger;
    private regManager;
    private static instance;
    private toneHelper;
    private ringbackToneVolume;
    private ringToneVolume;
    private constructor();
    static getInstance: () => CallManager;
    initialize: (cfg: CallManagerConfig, coreSDK: CoreSdkInterface) => Promise<CallManager>;
    clearData: () => Promise<void>;
    isInitialized: () => boolean;
    logoutCleanup: () => Promise<void>;
    addCallManagerListener: (listener: CallManagerListener) => void;
    getCallById: (callId: string) => Call;
    getCalls: (filterOrConfig: CallFilter | CallFilterConfig) => Call[];
    getAllCalls: () => Call[];
    getConnectedCalls: () => Call[];
    createOutgoingCall: (remoteNumber: string, localNumber?: string, isVideo?: boolean, relatedSessionId?: string, localInstanceId?: string, isConference?: boolean) => Call;
    startNewCall: (remoteNumber: string, localNumber?: string, isVideo?: boolean) => Promise<Call>;
    endAllCalls: (code?: number) => Promise<void>;
    reviveAllCalls: () => void;
    getRingbackToneURL: () => URI;
    getRingbackToneVolume: () => number;
    setRingbackToneVolume: (value: number) => void;
    getRingbackToneSpeakers: () => string;
    getRingToneURL: () => URI;
    getRingToneVolume: () => number;
    setRingToneVolume: (value: number) => void;
    getRingToneSpeakers: () => string;
    getMicrophoneDevice: () => string;
    getMicrophoneVolume: () => number;
    playDialPadKeyTone: (dtmfDigit: string) => Promise<void>;
    private callsListener;
    private registerCallbacks;
    private networkConnectionEventListener;
    private withCallByNetworkId;
    private onReceivedCallFailed;
    private onReceivedCallStatus;
    private onReceivedCallRejected;
    private onReceivedCallEnd;
    private onReceivedCallHold;
    private onReceivedCallResume;
    private onReceivedCallActive;
    private onLocalStream;
    private onRemoteStream;
    private onReceivedNewCall;
    private onTransferTargetDetails;
    private getRegisteredCallLines;
}

export declare interface CallManagerConfig {
    ringbackToneURL: URI;
    ringToneURL: URI;
    dtmfFolderURLPrefix: URI;
    turnServerDomain: string | undefined;
    turnServerPort: number | undefined;
    callLogStorage?: 'in-memory' | 'indexed-db';
    autoAcceptVideoUpgrade: {
        enabled: boolean;
    };
}

export declare interface CallManagerListener extends CallListener {
    onIncomingCall(call: Call): void;
}

export declare interface CallMedia {
    mediaType: CallMediaType;
    direction: CallDirection;
}

export declare type CallMediaSide = 'LOCAL' | 'REMOTE';

export declare type CallMediaType = 'audio' | 'video' | 'rtt';

export declare type CallState = 'new' | 'inprogress' | 'failed' | 'ringing' | 'connected' | 'held_locally' | 'held_remotely' | 'held_both' | 'disconnected' | 'ignore' | 'videoUpgrade' | 'merging';

export declare interface ConferenceMergeResults {
    callId1: string;
    callId2: string;
    conferenceCallId: string;
}

declare interface ConnectionErrorEvent {
    errorCode: string;
    errorSubCode: string;
    error: string;
    isOnline: boolean;
    forceErrorPageDisplay: boolean;
}

declare type ConnectionOnlineStatus = 'onLine' | 'offLine';

declare type ConnectionState = ConnectionStates.AUTHENTICATING | ConnectionStates.CONNECTED | ConnectionStates.CONNECT_FAILED | ConnectionStates.DISCONNECTED | ConnectionStates.GATHERING_ACCOUNT_INFO | ConnectionStates.OPENING_WEB_SOCKET | ConnectionStates.NEW;

declare interface ConnectionStateEvent {
    oldConnectionState?: ConnectionState;
    newConnectionState?: ConnectionState;
}

declare enum ConnectionStates {
    AUTHENTICATING = "authenticating",
    CONNECT_FAILED = "connect_failed",
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    GATHERING_ACCOUNT_INFO = "gatheringAccountInfo",
    NEW = "new",
    OPENING_WEB_SOCKET = "openingWebSocket"
}

declare interface CoreSdkConfig {
    clientId: string;
    clientPrivateKey: string;
    clientSecret: string;
    clientURLBase: string;
    logLevel?: LogLevel;
    networkEnvironment: CpaasNetworkEnvironment;
    remoteLoggingEnabled?: boolean;
    useInMemoryStorage?: boolean;
}

declare interface CoreSdkInterface {
    getRegistrationManager(): RegistrationMgrInterface;
    getWebSocketEventsMgr(): WebSocketEventsInterface;
    getCpaasServiceAccessors(): CpaasServiceAccessors;
    getVersion(): string;
}

declare interface CpaasNetworkEnvironment {
    name?: string;
    cpaasURLBase: string;
    euiURLBase: string;
    networkPingServer: string;
}

declare interface CpaasServiceAccessors {
    cpaasDeleteFetch(url: string, headers?: any, fetchOptions?: FetchOptions): Promise<ApiStatus>;
    cpaasDeleteFetchWithData(url: string, headers: any, data: any, fetchOptions?: FetchOptions): Promise<ApiStatus>;
    cpaasGetFetch(url: string, headers?: any, fetchOptions?: FetchOptions): Promise<ApiStatus>;
    cpaasPostFetch(url: string, headers: any, data: any, fetchOptions?: FetchOptions): Promise<ApiStatus>;
    daasPostFetchWithMultipartData(url: string, headers: any, data: any, boundary: string, fetchOptions?: FetchOptions): Promise<any>;
    cpaasPutFetch(url: string, headers: any, data: any, fetchOptions?: FetchOptions): Promise<ApiStatus>;
    cpaasRawFetch(url: string, headers: any, fetchOptions?: FetchOptions): Promise<Response>;
    cpaasRootUrl: string;
}

export declare class Device {
    deviceId: string;
    groupId: string;
    label: string;
    kind: MediaDeviceKind;
    constructor(json: MediaDeviceInfo | any);
    toString(): string;
}

declare interface FetchOptions {
    clientIdParam?: string;
    doNotProcessErrors?: boolean;
    doNotSignalOnTimeout?: boolean;
    returnRawResponse?: boolean;
    sessionIdParam?: string;
    timeOut?: number;
    withCredentials?: boolean;
}

declare enum LogLevel {
    debug = 0,
    log = 1,
    info = 2,
    warn = 3,
    error = 4,
    fatal = 5
}

export declare interface MapOf<T> {
    [key: string]: T;
}

declare interface NetworkConnectionEvent {
    networkState: ConnectionOnlineStatus;
}

declare interface RegistrationMgrInterface {
    addRegManagerListener(listener: RegManagerListener): void;
    appStart(): Promise<ConnectionState>;
    cpaasSignIn(): Promise<void>;
    disconnect(): Promise<void>;
    getAllLines(): AccountLineInfo[];
    getConnectionState(): ConnectionState;
    getRegisteredLines(): AccountLineInfo[];
    getRegisteredMsisdns(): string[];
    initialize(config: CoreSdkConfig): void;
    isOnline(): boolean;
    isWebSocketConnected(): boolean;
}

declare interface RegManagerListener {
    onDoDataSync?(): void;
    onConnectionError?(event: ConnectionErrorEvent): void;
    onConnectionState?(event: ConnectionStateEvent): void;
    onNetworkConnection?(event: NetworkConnectionEvent): void;
    onWebsocketConnection?(event: WebsocketStateEvent): void;
}

export declare type URI = string;

declare type WebSocketApiEvents = 'WS_onRegisteredDevices' | 'WS_onRegistrationKickOut' | 'WS_onRegistrationSessionExpired' | 'WS_onWebsocketError' | 'WS_onWebsocketStateChange' | 'WS_onParsedPushNotification' | 'WS_chatEventNotification' | 'WS_chatMessageNotification' | 'WS_chatMessageStatusNotification' | 'WS_chatParticipantStatusNotification' | 'WS_chatSessionDataNotification' | 'WS_chatSessionInvitationNotification' | 'WS_conferenceParticipantStatusNotification' | 'WS_conferenceSessionInvitationNotification' | 'WS_fileTransferAcceptanceNotification' | 'WS_fileTransferEventNotification' | 'WS_fileTransferFileNotification' | 'WS_fileTransferSessionInvitationNotification' | 'WS_groupChatSessionInvitationNotification' | 'WS_inboundMessageNotification' | 'WS_multimediaChatMessageNotification' | 'WS_nsMsgData' | 'WS_rawMessage' | 'WS_RMP_FileTransferNotification' | 'WS_sessionInvitationNotification' | 'WS_sessionStatusNotification' | 'WS_ussdSessionEventNotification' | 'WS_vvoipSessionTransferNotification';

declare interface WebSocketEventsInterface {
    subscribe(eventName: WebSocketApiEvents, callback: (...args: any) => void, identifier: string): number;
    unsubscribe(eventName: WebSocketApiEvents, identifier: string): number;
}

declare interface WebsocketStateEvent {
    websocketState: WSConnectionState;
}

declare type WSConnectionState = 'open' | 'closed';

export { }
