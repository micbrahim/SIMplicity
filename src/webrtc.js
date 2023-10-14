export function initWebRTC() {
    const configuration = { 
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
        ]
    };

    const pc = new RTCPeerConnection(configuration);

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            // Handle candidate (usually you'd send this to the other peer through a signaling server)
        }
    };

    pc.ontrack = (event) => {
        const remoteAudio = document.getElementById('remoteAudio');
        if (event.streams[0] && remoteAudio.srcObject !== event.streams[0]) {
            remoteAudio.srcObject = event.streams[0];
        }
    };

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const localAudio = document.getElementById('localAudio');
        localAudio.srcObject = stream;

        stream.getTracks().forEach(track => pc.addTrack(track, stream));
    }).catch(error => {
        console.error('Error accessing media devices.', error);
    });
}
