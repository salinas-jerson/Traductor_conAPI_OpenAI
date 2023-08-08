  
//window.SpeechRecognition ||
const SpeechRecognition =  (window as any).webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResult = false;
let texto : string

export const ListenVoice = () => {
  console.log('grabando reconocido:');
    recognition.start();
    //setTimeout(() => {
    recognition.onresult = (event: any) => {
      texto = event.results[event.results.length - 1][0].transcript;
      console.log('Texto de inicio:', texto);
    };
  //}, 1000);

    //return texto;
};
export const ListenVoiceWrite = () => {
    recognition.abort();
    recognition.onresult = (event:any) => {
      texto = event.results[event.results.length - 1][0].transcript
      console.log('Texto reconocido:', texto)
    

    return new Promise<string>((resolve) => {
        recognition.start();
    
        recognition.onresult = (event: any) => {
          const texto = event.results[event.results.length - 1][0].transcript;
          resolve(texto);
        };
      });
  }
}




