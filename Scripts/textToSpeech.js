/** 
 * Starts or stops text to speech depending on whether text to speech is currently playing. 
 * 
 * @param {string} className the class of all the text elements that will be read aloud. 
 * 
 * @param {string} buttonId the id of the button which triggers text to speech. 
 * 
 * @returns {none}
 */
function textToSpeech(className, buttonId){
    let textElements = document.getElementsByClassName(className);
    let button = document.getElementById(buttonId);
    let text = ''

    for (let i = 0; i < textElements.length; i++) {
        text += ' '
        text += textElements[i].innerHTML;
    }

    if (button.innerHTML == '▶︎') {
        playTextToSpeech(text, buttonId);
        button.innerHTML = '❚❚';
        return;
    }
    if (button.innerHTML == '❚❚') {
        pauseTextToSpeech();
        button.innerHTML = '▶︎';
        return;
    }
}

/** 
 * Starts or resumes text to speech.  
 * 
 * @param {string} text the text that will be read aloud. 
 * 
 * @param {string} buttonId the id of the button which triggers text to speech. 
 * 
 * @returns {none}
 */
function playTextToSpeech(text, buttonId) {
    const synth = window.speechSynthesis;

    if (synth.paused) {
        speechSynthesis.resume();
    }
    else {
        utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-nz';
        utterance.pitch = 1;
        utterance.rate = 1;

        speechSynthesis.speak(utterance);
    }
        
    utterance.onend = () => {
        document.getElementById(buttonId).innerHTML = '▶︎';
    };
}

/** 
 * Pauses text to speech.  
 * 
 * @param {none} 
 * 
 * @returns {none}
 */
function pauseTextToSpeech() {
    speechSynthesis.pause();
}