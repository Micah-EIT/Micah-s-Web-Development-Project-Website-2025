function textToSpeech(textId, buttonId){
    let textElements = document.getElementsByClassName(textId);
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

function pauseTextToSpeech() {
    speechSynthesis.pause();
}