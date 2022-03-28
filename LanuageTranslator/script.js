let showTrans = document.getElementById("translatedBox");
let timerId;

async function translateText(inputDet){

    let inputText = document.getElementById("mainLang");
    inputText.value = inputDet;
    let inputVal = inputDet;
    let lang = document.getElementById("languages").value;

    const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
            q: inputVal,
            source: "en",
            target: lang
        }),
        headers: { "Content-Type": "application/json" }
    });

    let data = await res.json();
    data = data.translatedText;
    console.log(data);
    displayTrans(data);
}

function displayTrans(text){
    showTrans.innerHTML = null;
    let div = document.createElement("div");
    div.innerText = text;
    div.setAttribute("class", "translatedText");
    showTrans.append(div);
}

function debounce(func, delay, inputDet){
    console.log("Debounce Working");
    if(timerId){
        clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
        func(inputDet);
    }, delay);
}

function runSpeechRecognition(func, delay) {
    
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        console.log("Working");
    };
    
    recognition.onspeechend = function() {
        recognition.stop();
    }
  
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        console.log(transcript);
        debounce(func, delay, transcript);
    };
  
     // start recognition
     recognition.start();
}

export {translateText, displayTrans, debounce, runSpeechRecognition};