import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const STT = () => {
    const { transcript, listening, resetTranscript } = useSpeechRecognition();

    const toggleListening = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            resetTranscript();
        } else {
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: false });
        }
    }
    return { transcript, listening, resetTranscript };
};

export default STT;