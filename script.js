const textArea = document.getElementById("text");
const voiceSelect = document.getElementById("voiceSelect");
const rate = document.getElementById("rate");
const rateValue = document.getElementById("rateValue");
const pitch = document.getElementById("pitch");
const pitchValue = document.getElementById("pitchValue");

const speakBtn = document.getElementById("speakBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const stopBtn = document.getElementById("stopBtn");

let voices = [];
let utterance;

// Load voices into dropdown
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";
    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}
speechSynthesis.onvoiceschanged = loadVoices;

// Update displayed values for sliders
rate.addEventListener("input", () => rateValue.textContent = rate.value);
pitch.addEventListener("input", () => pitchValue.textContent = pitch.value);

// Speak button
speakBtn.addEventListener("click", () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel(); // Stop previous
    }

    const text = textArea.value.trim();
    if (text === "") return alert("Please enter some text!");

    utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices[voiceSelect.value];
    utterance.voice = selectedVoice;
    utterance.rate = parseFloat(rate.value);
    utterance.pitch = parseFloat(pitch.value);

    speechSynthesis.speak(utterance);
});

// Pause
pauseBtn.addEventListener("click", () => {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause();
    }
});

// Resume
resumeBtn.addEventListener("click", () => {
    if (speechSynthesis.paused) {
        speechSynthesis.resume();
    }
});

// Stop
stopBtn.addEventListener("click", () => {
    if (speechSynthesis.speaking || speechSynthesis.paused) {
        speechSynthesis.cancel();
    }
});
