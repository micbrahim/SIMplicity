# Your Number Anywhere™️ Calling API Reference

This reference describes the paths and schemas of the calling API for Your Number Anywhere™️.

## Paths

<details>
  <summary><a id="start">POST /start</a></summary>
<br />
  
**Description**: start a call using the specified from/to number

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | No | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | OK | application/json | [ErrorInfo](#ErrorInfo) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfo) object |
| 401 | Unauthorized | application/json | [ErrorInfo](#ErrorInfo) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfo) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfo) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfo) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfo) object |

</details>

<details>
  <summary><a id="ringing">POST /ringing/{callId}</a></summary>
<br />
  
**Description:** update call status to ringing

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |
| callId | path | callId | Yes | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | OK | application/json | [ErrorInfo](#ErrorInfo) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfo) object |
| 401 | Unauthorized | application/json | [ErrorInfo](#ErrorInfo) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfo) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfo) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfo) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfo) object |

</details>

<details>
  <summary><a id="resume">POST /resume/{callId}</a></summary>
<br />
  
**Description:** update call status to Resume

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |
| callId | path | callId | Yes | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | OK | application/json | [ErrorInfo](#ErrorInfo) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfo) object |
| 401 | Unauthorized | application/json | [ErrorInfo](#ErrorInfo) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfo) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfo) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfo) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfo) object |

</details>

<details>
  <summary><a id="acceptResume">POST /acceptResume/{callId}</a></summary>
<br />
  
**Description:** Accept Resume request

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |
| callId | path | callId | Yes | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | OK | application/json | [ErrorInfo](#ErrorInfo) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfo) object |
| 401 | Unauthorized | application/json | [ErrorInfo](#ErrorInfo) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfo) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfo) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfo) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfo) object |

</details>

<details>
  <summary><a id="proceeding">POST /proceeding/{callId}</a></summary>
<br />
  
**Description:** update call status to Proceeding

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |
| callId | path | callId | Yes | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | OK | application/json | [ErrorInfo](#ErrorInfo) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfo) object |
| 401 | Unauthorized | application/json | [ErrorInfo](#ErrorInfo) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfo) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfo) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfo) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfo) object |

</details>

<details>
  <summary><a id="inProgress">POST /inProgress/{callId}</a></summary>
<br />
  
**Description:** update call status to InProgress

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |
| callId | path | callId | Yes | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | OK | application/json | [ErrorInfo](#ErrorInfo) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfo) object |
| 401 | Unauthorized | application/json | [ErrorInfo](#ErrorInfo) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfo) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfo) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfo) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfo) object |

</details>

<details>
  <summary><a id="hold">POST /hold/{callId}</a></summary>
<br />
  
**Description:** update call status to Hold

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |
| callId | path | callId | Yes | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | OK | application/json | [ErrorInfo](#ErrorInfo) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfo) object |
| 401 | Unauthorized | application/json | [ErrorInfo](#ErrorInfo) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfo) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfo) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfo) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfo) object |

</details>

<details>
  <summary><a id="acceptHold">POST /acceptHold/{callId}</a></summary>
<br />
  
**Description:** Accept hold request

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |
| callId | path | callId | Yes | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | OK | application/json | [ErrorInfo](#ErrorInfo) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfo) object |
| 401 | Unauthorized | application/json | [ErrorInfo](#ErrorInfo) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfo) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfo) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfo) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfo) object |

</details>

<details>
  <summary><a id="connected">POST /connected/{callId}</a></summary>
<br />
  
**Description:** update call status to Connected

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |
| callId | path | callId | Yes | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | OK | application/json | [ErrorInfo](#ErrorInfo) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfo) object |
| 401 | Unauthorized | application/json | [ErrorInfo](#ErrorInfo) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfo) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfo) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfo) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfo) object |

</details>

<details>
  <summary><a id="renegotiate">POST /renegotiate/{callId}</a></summary>
<br />
  
**Description:** update call status to for sdp renegotiation

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |
| callId | path | callId | Yes | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | OK | application/json | [ErrorInfo](#ErrorInfo) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfo) object |
| 401 | Unauthorized | application/json | [ErrorInfo](#ErrorInfo) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfo) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfo) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfo) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfo) object |

</details>

<details>
  <summary><a id="end">DELETE /end/{callId}</a></summary>
<br />
  
**Description:** end call

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |
| conference | header | conference | No | string |
| reason | header | reason for ending call | No | string |
| callId | path | callId | Yes | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | OK | application/json | [ErrorInfo](#ErrorInfo) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfo) object |
| 401 | Unauthorized | application/json | [ErrorInfo](#ErrorInfo) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfo) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfo) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfo) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfo) object |

</details>

## Schemas

<details>
  <summary><a id="CallStartRequest">CallStartRequest</a></summary>
<br />
  
Type: object

Properties: (required properties indicated with *)
| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| to* | string | Destination address/msisdn | 14254369410 |
| from* | string | Originator address/msisdn | 14254369410 |
| sdp* | string | SDP (Session Description Protocol) Offer | example |
| clientCorrelator | string | Unique identifier used for any service requests for a given call | a777980f-9e7a-4f4a-ae26-22feb3964399 |    

</details>

<details>
  <summary><a id="CallProxyError">CallProxyError</a></summary>
<br />
  
Type: object

Properties: (required properties indicated with *)
| Property | Type | Description | Default |
| -------- | ---- | ----------- | ------- |
| returnCode | integer | return code , can be different from http response code | 500 |
| status | string | status message | INTERNAL_SERVER_ERROR |

</details>

<details>
  <summary><a id="CallStartResponse">CallStartResponse</a></summary>
<br />

Description: Response for Start Call API

Type: object

Properties: (required properties indicated with *)
| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| to* | string | msisdn to call | 14254369410 |
| from* | string | msisdn calling from | 14254369410 |
| callId* | string | Unique identifier for created call | 0AEE1B58BAEEDA3EABA42B32EBB3DFE08B9CAF405EAF8EEDDEFADF20FE987F404EFC3ECE1BDE7F80BE8D |
| clientCorrelator | string | Unique identifier used for any service requests for a given call | a777980f-9e7a-4f4a-ae26-22feb3964399 |

</details>

<details>
  <summary><a id="CallStatusRequest">CallStatusRequest</a></summary>
<br />

Type: object

Properties:
| Property | Type |
| -------- | ---- |
| sdp | string |

</details>

<details>
  <summary><a id="ErrorInfo">ErrorInfo</a></summary>
<br />

Type: object

Properties:
| Property | Type |
| -------- | ---- |
| errors | array of [ErrorInfoBody](#ErrorInfoBody) objects |

</details>

<details>
  <summary><a id="ErrorInfoBody">ErrorInfoBody</a></summary>
<br />

Type: object

Properties:
| Property | Type | Description |
| -------- | ---- | ----------- |
| reasonCode | string | Error identification code |
| systemMessage | string | System message error |
| userMessage | string | Detailed error description |

</details>

<details>
  <summary><a id="SessionInvitationNotification">SessionInvitationNotification</a></summary>
<br />

Description: When MO starts the call using '/start' MT receives IncomingCallNotification over WSS. So please make sure to have the WSS open on MT. Use this schema to parse the notification. Do not include offer as part of model data to parse the json, since it has inconsistentcy to represent mediaIndicator items. 

Type: object

Properties: (required properties indicated with *)
| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| originatorAddress* | string | Address (e.g. ‘sip’ URI, ‘tel’ URI, ‘acr’ URI) of the originator | tel:+911234567890 |
| originatorName | string | Friendly name of the call originator | originator |
| receiverAddress | string | Address (e.g. ‘sip’ URI, ‘tel’ URI, ‘acr’ URI) of the originator | tel:+911234567899 |
| receiverName | string | Friendly name of the call receiver | receive |
| callObjectRef | string | The reference to the call object |  |
| sdp | string | optional. SDP |   |
| verificationStatus | TNVerificationStatus object |   |   |
| serverCorrelator | string | A correlator that the server instructs the client to use for end to end correlation. The server shall use the end to end correlator generated by the network to signal the client to use it for end to end correlation. This field can be used in the Quality-of-Experience (QoE) reports |  |

</details>

<details>
  <summary><a id="SessionStatusNotification">SessionStatusNotification</a></summary>
<br />

Description: When MO starts the call using '/start' MT receives IncomingCallNotification over WSS. MO recieves further call status notifications, e.g. Ringing, InProgress, Connected, etc. over WSS. So please make sure to have the WSS open on MO. Use this schema to parse the notification.

Type: object

Properties:
| Property | Type | Description |
| -------- | ---- | ----------- |
| status* | SessionStatus object |  |
| responseCode | integer | Indicates corresponding SIP response code, mainly used for provisional responses (status set to InProgress) |
| sdp | string | SDP |
| receiverName | string | Name of the receiver |
| receiverAddress | string | Address (e.g. ‘sip’ URI, ‘tel’ URI, ‘acr’ URI) of the receiver |
| callObjectRef | string | Call object reference in URL format |
| transferTargetName | string | Name of the participant to whom the call has been transferred |
| transferTargetAddress | string | Address of the participant to whom the call has been transferred in URL format |
| diversionAddress | string | format: URL |
| notificationReference | object | properties: epochTime (integer), notificationId (integer), sequenceNumber (integer) |
| epochTime | integer |  |
| sdpNegotiationSerializationAckRequired | string |  |
| requestError | object | properties: serviceException (NotificationException object), policyException (NotificationException object), link (Link object) |
| earlyMediaDirection | string |  |
| reason | string |  |

</details>

<details>
  <summary><a id="NotificationException">NotificationException</a></summary>
<br />

Type: object

Properties:
| Property | Type |
| -------- | ---- |
| text | string |
| messageId | string |
| variable | string |
| suggestedAction | string |

</details>

<details>
  <summary><a id="SessionStatus">SessionStatus</a></summary>
<br />

Type: string

Possible Values:
- Initial
- InProgress
- Ringing
- Proceeding
- Connected
- Terminated
- Hold
- Resume
- SessionCancelled
- Declined
- Failed
- Waiting
- NoAnswer
- NotReachable
- Busy
- Forwarded
- UpgradeToMeetingInitiated
- UpgradeToMeetingInProgress
- UpgradeToMeetingSuccess
- UpgradeToMeetingFailed

</details>


<details>
  <summary><a id="MediaDirection">MediaDirection</a></summary>
<br />

Description: The direction of the media. MUST be instantiated if “type” is equal to “audio” or “video”. The default is “SendRecv”.

Type: string

Possible Values:
- SendRecv
- SendOnly
- RecvOnly
- Inactive

</details>      

<details>
  <summary><a id="TNVerificationStatus">TNVerificationStatus</a></summary>
<br />

Description: This enumeration defines the possible values to indicate originator telephone number verification status.

Type: string

Possible Values:
- TN-Validation-Passed
- TN-Validation-Failed
- No-TN-Validation

</details>

<details>
  <summary><a id="LinkSchema">Link</a></summary>
<br />

Type: object

Properties:
| Property | Type | Description |
| -------- | ---- | ----------- |
| rel | string | Describes the relationship between the URI and the resource |
| href | string | URI in URL format |

</details>
