declare interface AccountLineInfo {
    msisdn: string;
    regStatus: boolean;
}

export declare interface ApiStatus {
    data?: any;
    error?: any;
    headers?: Headers;
    ok: boolean;
    status: number;
    statusText: string;
}

export declare interface ConnectionErrorEvent {
    errorCode: string;
    errorSubCode: string;
    error: string;
    isOnline: boolean;
    forceErrorPageDisplay: boolean;
}

export declare type ConnectionOnlineStatus = 'onLine' | 'offLine';

export declare type ConnectionState = ConnectionStates.AUTHENTICATING | ConnectionStates.CONNECTED | ConnectionStates.CONNECT_FAILED | ConnectionStates.DISCONNECTED | ConnectionStates.GATHERING_ACCOUNT_INFO | ConnectionStates.OPENING_WEB_SOCKET | ConnectionStates.NEW;

export declare interface ConnectionStateEvent {
    oldConnectionState?: ConnectionState;
    newConnectionState?: ConnectionState;
}

export declare enum ConnectionStates {
    AUTHENTICATING = "authenticating",
    CONNECT_FAILED = "connect_failed",
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    GATHERING_ACCOUNT_INFO = "gatheringAccountInfo",
    NEW = "new",
    OPENING_WEB_SOCKET = "openingWebSocket"
}

export declare class CoreSDK implements CoreSdkInterface {
    private static instance;
    static getInstance: () => CoreSDK;
    getRegistrationManager: () => RegistrationMgrInterface;
    getWebSocketEventsMgr: () => WebSocketEventsInterface;
    getCpaasServiceAccessors: () => CpaasServiceAccessors;
    getVersion: () => string;
}

export declare interface CoreSdkConfig {
    clientId: string;
    clientPrivateKey: string;
    clientSecret: string;
    clientURLBase: string;
    logLevel?: LogLevel;
    networkEnvironment: CpaasNetworkEnvironment;
    remoteLoggingEnabled?: boolean;
    useInMemoryStorage?: boolean;
}

export declare interface CoreSdkInterface {
    getRegistrationManager(): RegistrationMgrInterface;
    getWebSocketEventsMgr(): WebSocketEventsInterface;
    getCpaasServiceAccessors(): CpaasServiceAccessors;
    getVersion(): string;
}

export declare interface CpaasNetworkEnvironment {
    name?: string;
    cpaasURLBase: string;
    euiURLBase: string;
    networkPingServer: string;
}

export declare interface CpaasServiceAccessors {
    cpaasDeleteFetch(url: string, headers?: any, fetchOptions?: FetchOptions): Promise<ApiStatus>;
    cpaasDeleteFetchWithData(url: string, headers: any, data: any, fetchOptions?: FetchOptions): Promise<ApiStatus>;
    cpaasGetFetch(url: string, headers?: any, fetchOptions?: FetchOptions): Promise<ApiStatus>;
    cpaasPostFetch(url: string, headers: any, data: any, fetchOptions?: FetchOptions): Promise<ApiStatus>;
    daasPostFetchWithMultipartData(url: string, headers: any, data: any, boundary: string, fetchOptions?: FetchOptions): Promise<any>;
    cpaasPutFetch(url: string, headers: any, data: any, fetchOptions?: FetchOptions): Promise<ApiStatus>;
    cpaasRawFetch(url: string, headers: any, fetchOptions?: FetchOptions): Promise<Response>;
    cpaasRootUrl: string;
}

export declare interface FetchOptions {
    clientIdParam?: string;
    doNotProcessErrors?: boolean;
    doNotSignalOnTimeout?: boolean;
    returnRawResponse?: boolean;
    sessionIdParam?: string;
    timeOut?: number;
    withCredentials?: boolean;
}

export declare enum LogLevel {
    debug = 0,
    log = 1,
    info = 2,
    warn = 3,
    error = 4,
    fatal = 5
}

export declare interface NetworkConnectionEvent {
    networkState: ConnectionOnlineStatus;
}

export declare interface RegisteredDevice {
    deviceId: string;
    deviceName: string;
    ourOwnDevice: boolean;
}

export declare interface RegistrationMgrInterface {
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

export declare interface RegManagerListener {
    onDoDataSync?(): void;
    onConnectionError?(event: ConnectionErrorEvent): void;
    onConnectionState?(event: ConnectionStateEvent): void;
    onNetworkConnection?(event: NetworkConnectionEvent): void;
    onWebsocketConnection?(event: WebsocketStateEvent): void;
}

export declare interface SignInParams {
    code: string;
    session_num: string;
    userId: string;
}

export declare interface TMobileWebAuthInterface {
    tmoWebSignIn(authBaseUrl: string, clientId: string, redirectUrl: string): void;
    tmoWebSignOut(authBaseUrl: string, clientId: string, redirectUrl: string): void;
    removeQueryStringParams(): void;
    getParamsFromUrl(): SignInParams;
}

export declare type WebSocketApiEvents = 'WS_onRegisteredDevices' | 'WS_onRegistrationKickOut' | 'WS_onRegistrationSessionExpired' | 'WS_onWebsocketError' | 'WS_onWebsocketStateChange' | 'WS_onParsedPushNotification' | 'WS_chatEventNotification' | 'WS_chatMessageNotification' | 'WS_chatMessageStatusNotification' | 'WS_chatParticipantStatusNotification' | 'WS_chatSessionDataNotification' | 'WS_chatSessionInvitationNotification' | 'WS_conferenceParticipantStatusNotification' | 'WS_conferenceSessionInvitationNotification' | 'WS_fileTransferAcceptanceNotification' | 'WS_fileTransferEventNotification' | 'WS_fileTransferFileNotification' | 'WS_fileTransferSessionInvitationNotification' | 'WS_groupChatSessionInvitationNotification' | 'WS_inboundMessageNotification' | 'WS_multimediaChatMessageNotification' | 'WS_nsMsgData' | 'WS_rawMessage' | 'WS_RMP_FileTransferNotification' | 'WS_sessionInvitationNotification' | 'WS_sessionStatusNotification' | 'WS_ussdSessionEventNotification' | 'WS_vvoipSessionTransferNotification';

export declare interface WebSocketEventsInterface {
    subscribe(eventName: WebSocketApiEvents, callback: (...args: any) => void, identifier: string): number;
    unsubscribe(eventName: WebSocketApiEvents, identifier: string): number;
}

export declare interface WebsocketStateEvent {
    websocketState: WSConnectionState;
}

export declare type WSConnectionState = 'open' | 'closed';

export { }
