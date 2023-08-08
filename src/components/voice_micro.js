const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResult = false;

let texto = ''
btnStart.addEventListener('click', () => {
    recognition.start();
});

btnStop.addEventListener('click', () => {
    recognition.abort();
});


export const ListenVoice = () => {
    recognition.start();
    
    btnStop.addEventListener('click', () => {
        recognition.abort();
    });
    
    recognition.onresult = (event) => {
        texto = event.results[event.results.length - 1][0].transcript;        
    }
    return texto
};


