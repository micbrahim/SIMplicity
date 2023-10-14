import { initWebRTC } from './webrtc.js';

const startCallBtn = document.getElementById('startCallBtn');
const callSection = document.getElementById('callSection');

startCallBtn.addEventListener('click', () => {
    startCallBtn.disabled = true;  // Disable the button to prevent multiple clicks
    callSection.classList.remove('hidden');  // Display the call section
    initWebRTC();
});
