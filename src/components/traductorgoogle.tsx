export const MyComponent = () => {
    const btnStart = document.getElementById('btnStart') as HTMLButtonElement | null;
    const btnStop = document.getElementById('btnStop') as HTMLButtonElement | null;
    const textArea = document.getElementById('textArea') as HTMLTextAreaElement | null;
  
    const recognition = new webkitSpeechRecognition();
  
    recognition.continuous = true;
    recognition.lang = 'es-ES';
    recognition.interimResult = false;
  
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        recognition.start();
      });
    }
  
    if (btnStop) {
      btnStop.addEventListener('click', () => {
        recognition.abort();
      });
    }
  
    recognition.onresult = (event) => {
      if (textArea) {
        const texto = event.results[event.results.length - 1][0].transcript;
        textArea.value = texto;
      }
    };
  
    return (
      <div>
        <button id="btnStart">Start</button>
        <button id="btnStop">Stop</button>
        <textarea id="textArea"></textarea>
      </div>
    );
  };

  
const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResult = false;
let texto = ''

export const ListenVoice = () => {
    recognition.start();

    return new Promise<string>((resolve) => {
        recognition.onresult = (event) => {
            texto = event.results[event.results.length - 1][0].transcript;
            resolve(texto);
        };
    });
};
export const ListenVoiceWrite = () => {
    recognition.abort();

    return new Promise<string>((resolve) => {
        recognition.onresult = (event) => {
            texto = event.results[event.results.length - 1][0].transcript;
            resolve(texto);
        };
    });
};



