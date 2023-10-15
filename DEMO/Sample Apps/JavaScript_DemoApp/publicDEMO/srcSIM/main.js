import { initWebRTC } from './webrtc.js';

const startCallBtn = document.getElementById('startCallBtn');
const callSection = document.getElementById('callSection');
const holdCallBtn = document.getElementById('holdCallBtn');
const resumeCallBtn = document.getElementById('resumeCallBtn');
const endCallBtn = document.getElementById('endCallBtn');

startCallBtn.addEventListener('click', () => {
    startCallBtn.disabled = true;  // Disable the button to prevent multiple clicks
    callSection.classList.remove('hidden');  // Display the call section
    initWebRTC();
})

function makeOutboundCall(){

}

holdCallBtn.addEventListener('click', () => {

})

resumeCallBtn.addEventListener('click', () => {

} )

endCallBtn.addEventListener('click', () => {
    
})
;