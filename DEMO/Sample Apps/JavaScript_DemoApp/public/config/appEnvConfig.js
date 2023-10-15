/////////////////////////////////////////////////////
// Client Config
////////////////////////////////////////////////////
export const clientConfig = {
  networkEnvironment: {
    cpaasURLBase: 'https://naas.t-mobile.com',
    euiURLBase: 'https://account.t-mobile.com',
    networkPingServer: 'https://digits.t-mobile.com',
  },
  clientId: 'tmon-vRbx2FkEVrQIjQ6EzXHC7fMt0yDOz3N4', // Copy and Paste CPaaS clientId between the quote marks
  clientURLBase: 'http:localhost:8080', // Paste your applications redirection URL between the quote marks
  clientSecret: 'XxbGTRreiGZ1Oesj', // Copy and Paste CPaaS secret between the quote marks
  clientPrivateKey: '-----BEGIN PRIVATE KEY-----' +
  'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC4yUq5HIoEDxzL' + 
  'Dbjceq49C/WVnErldDHubVUaQDv6oGL/43s1X/ouLdEL8rHaaAFZ/l0jAPAdh6Gt' + 
  'HXwcHRFBr1PjbF8N9nIzAwSQqwERNQHdDQvKcFzcg/N7cVczQdAmE9QMkcY+xm5X' + 
  '+zmq9TWlc3GVFFCKBArrXjbDTTjvmJc46ZgdrksMuCW33AnkFRiUmSTS03Vb39P0' +
  'pqFgWstNyQaDabUo6KdBUrU5jFv3PO0A7x/O6KdkjResBdLQkAduYn4oS3KdyewT' +
  'dXE0tLZZLzBtukkrjJf4RVqk5FCRVE6jeDPtYY10cj4v2ZMAjmltpY/QDKfsFt7G' +
  '0oRHxgWdAgMBAAECggEAGf/QcK0wShPqRDOhD/x+6X32Rt+fthscL2TYtYHWLpRE' +
  'eaaDHmZrp/WwVRMHrSg3EHd2mUc3gaAkwlvEq5v3YpuNnRERasCDHuRMzyIQW2Bu' +
  '67A7OXeHyUsThgnTcBXReJoPmtkj4I9A1UY2vfQUYTwV/hjGoDSjaKxv3hjOav96' +
  '2ln/efDBQnz9JVE54byr5UswI4aa0xpBLcVFVhY3A00xgBVHTwvQbFFwZ2DCv3ta' +
  'NL8QdxlTeEaZP7BHvpPuNDUaFs3m3PChF9S25yw4jROYVOdElZc8w39Ma8Nxhr3e' +
  'BAV56rducuSHf1nMbTsgy1TE1x+kzoC3EFhdNksBQQKBgQDI/3GI5tXVIgDUVHHz' +
  'bqmg6Bz0DF5VAKw2vv3QQOBElwwQuIDJ6QZJT9YBB5C6THGsbVwjJFuieWeaJ81O' +
  'pUe41pM0xEGmeMBZfCBr2K+Vo1/1zwP3yMSK0v8oBhodfF4x8HfRKOfJC2se2UGg' +
  '9Q6oE7zgJ6m53TQnsFTE17b+MQKBgQDrWi13Pish5m8IsnHM3Fk80VoHxxNPAXhm' +
  '/QLSFbDa519nwDoygeaLzbuJ49OJ5UJrIkt234clPtJFWDPBwC7TrwLHPeR+W6IL' +
  'ZtYDjtmhmq5m8XTIzBcjMlIqbbWJOXVa+V3IA0PnKQHynahqOpjTBfdzf7p3urjq' +
  'pDxZ5CgHLQKBgEwze8mZKgxJfeMBuMm/dJPKK9/iKIk1XhTLR9KCJgQa97oHGNxz' +
  'eayllc6CHb5jaN0kAMBZ8lugh0SMPmvIgW5z+w8QMIt6UAIc6vW4CqlCbQj12N1B' +
  'wjGXWKDF33S6R8PLFMG5Llar+4qQdy8ceNgD06FvqAsM7870LM8LsRahAoGAMyjJ' +
  'FVCYQ6g5nqRbhHKpm0TO0z38/oGNUKXTBSPd69e7r2vjurLuEJnKGHFDvIfvZiZw' +
  'TQjN8dS0FIrVxVonU7CJZBIaJzV4Bg52mxNkT3K2Un5OKo/iv63imoJ6obexwPLP' +
  '5fh/vDH30Gtg/qZ6LfTwE1VCjWAzbh4BWHD2GokCgYEAr0RRV3IRQyppQTj3vH3U' +
  'sm2K2AMvrRtQLVmeuWeoRt6KMLgQrwusioPHzlF6y8MJQjM3FOwMU3AR0EthbN92' +
  'wEiKWknMdZHUwMEHbS5LBGf4l/ZbdIX6GomNAkWz0udnR1lxiDIvULJjR8LA0SjM' +
  'lIlIpS5aYbkwoYcyv2p8kBw=' +
  '-----END PRIVATE KEY-----', // Copy and Paste CPaaS Private Key between the quote marks
}

/////////////////////////////////////////////////////
// Calling Config
////////////////////////////////////////////////////
export const callingConfig = {
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
