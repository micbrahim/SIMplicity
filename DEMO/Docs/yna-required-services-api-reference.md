# Required Service APIs
Supplementary service APIs which are needed to successfully use Your Number Anywhere™️.

<details>
  <summary><a id="oauth-token">POST /oauth/token</a></summary>
<br />
  
**Description:** CPaaS Oauth token API

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| grant_type | query | grant type | Yes | string |
| redirect_uri | query | client registered uri | Yes | string |
| code | query | authorization code received after user logged in | Yes | string |
| Authorization | header | Authorization using client_id and client_secret as Basic Auth | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | CPaaS Token Repsonse | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfoBody) object |

</details>

<details>
  <summary><a id="account-status">GET /account/status</a></summary>
<br />
  
**Description:** Account registration Status

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | Successful client registration | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 202 | Accepted registration status request and processing, try again in some time | | |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 409 | Conflict | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfoBody) object |

</details>

<details>
  <summary><a id="account-unlink">DELETE /account/unlink</a></summary>
<br />
  
**Description:** Unlink a previously linked account

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| Authorization | header | Your access token as Bearer Token | Yes | string |
| X-Authorization | header | PoP token generated for every request | Yes | string |
| x-transaction-id | header | The transaction ID is GUID. Represents the API transaction, for use in debugging. | No | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | Successful unlink | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 400 | Invalid input | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 403 | Forbidden | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 404 | Not found | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 408 | Request Timeout | application/json | [ErrorInfo](#ErrorInfoBody) object |
| 500 | Service unavailable | application/json | [ErrorInfo](#ErrorInfoBody) object |

</details>

<details>
  <summary><a id="linkAccount">GET /account-mgmt/linkAccount</a></summary>
<br />
  
**Description:** Presents login page to partner to start process of selecting a line and register to use telephony services.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| client_id | query |  | Yes | string |
| client_secret | query |  | No | string |
| state | query |  | No | string |
| redirect_uri | query | partner's redirect uri where authcode will be returned | Yes | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | success and presents login page | application/json | [ErrorInfo](#ErrorInfoBody) object |

</details>

<details>
  <summary><a id="changeEmergencyAddress">POST /account-mgmt/changeEmergencyAddress</a></summary>
<br />
  
**Description:** Presents current e911 address and allows you to edit. If a failure-redirect-url is not provided all responses will be redirected to success-redirect-url. Authorization MUST be sent via query or header param.

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| success-redirect-url | query |  | Yes | string |
| failure-redirect-url | query |  | No | string |
| Authorization | query | Bearer Access token | No | string |

**Responses**

| Code | Description | Content Type | Schema |
| ---- | ----------- | ------------ | ------ |
| 200 | success and presents changeEmergencyAddress page | application/json | [ErrorInfo](#ErrorInfoBody) object |

</details>

## Schemas

<details>
  <summary><a id="tokenResponse">CPaaSTokenResponse</a></summary>
<br />

Type: object

Properties: (required properties indicated with *)
| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| access_token* | string | access token for the resource API calls | eyJraWQiOiI3N2I3NDExZmRhNWM0ZDI1YjA3ZjQ5NGNiY2EyZTQ0NCIsImFsZyI6IlJTMjU2IiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL2FwaS1kZXZzdGcudC1tb2JpbGUuY29tIiwiYXVkIjoiREFBU19URVNUIiwic2NvcGUiOiJvcGVuaWQgdnZtIGNoYXQiLCJjbGllbnRfaWQiOiJEQUFTX1RFU1QiLCJ1c24iOiJiNTU0MDZjMWIxOGFmZmE5IiwiaWF0IjoxNjk0NzI5NjE4LCJleHAiOjE2OTQ4MTYwMTgsInN1YiI6IlUtMTQ3NTk3MjctZThkNC00OWNlLTllZTAtZDIyMzhkM2RjYTI1In0.AnavP4NGGoG-ghZLzlwQXK |
| refresh_token* | string | Refresh token | eyJraWQiOiI3N2I3NDExZmRhNWM0ZDI1YjA3ZjQ5NGNiY2EyZTQ0NCIsImFsZyI6IlJTMjU2IiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL2FwaS1kZXZzdGcudC1tb2JpbGUuY29tIiwiYXVkIjoiREFBU19URVNUIiwic2NvcGUiOiJvcGVuaWQgdnZtIGNoYXQiLCJjbGllbnRfaWQiOiJEQUFTX1RFU1QiLCJ1c24iOiJiNTU0MDZjMWIxOGFmZmE5IiwiaWF0IjoxNjk0NzI5NjE4LCJleHAiOjE2OTQ4MTYwMTgsInN1YiI6IlUtMTQ3NTk3MjctZThkNC00OWNlLTllZTAtZDIyMzhkM2RjYTI1In0.AnavP4NGGoG-ghZLzlwQXK |
| token_type* | string | type of token | Bearer |
| expires_in* | integer | Expiry time of token | 86400 |

</details>

<details>
  <summary><a id="RegistrationInfo">RegistrationInfo</a></summary>
<br />

Description: Registered phone lines

Type: object

Properties: (required properties indicated with *)
| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| msisdn | string | Line msisdn | 4251234567 |
| regStatus | boolean | Line Registration Status | true |

</details>

<details>
  <summary><a id="RegistrationStatusResponse">RegistrationStatusResponse</a></summary>
<br />

Type: object

Properties: (required properties indicated with *)
| Property | Type | Description | Example |
| -------- | ---- | ----------- | ------- |
| returnCode | integer | Return code in int32 format | 200 |
| channelUrl | string | Channel url | wss://wrgweb1.ttn.t-mobile.com:3030/wss/channelCreateUrl/notificationchannel/v1/16F015FCC39A2509C07902B8EDC350CD799362ECA6B21B13DB2FB3BAD6E974A4/channels/mavch1/notifications |
| lines | array of RegistrationInfo objects | Registered lines |  |

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
