import { useState, useCallback, useEffect, useRef } from 'react';

export const useVoiceInput = (onResult) => {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [error, setError] = useState(null);
    const onResultRef = useRef(onResult);
    const isListeningRef = useRef(false);

    useEffect(() => {
        onResultRef.current = onResult;
    }, [onResult]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = true;
            rec.lang = 'en-US';

            rec.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                
                console.log(`🎤 [Voice Input] Interim: "${interimTranscript}", Final: "${finalTranscript}"`);
                
                if (finalTranscript) {
                    const text = finalTranscript.trim();
                    if (text && onResultRef.current) {
                        onResultRef.current(text);
                    }
                    
                    isListeningRef.current = false;
                    setIsListening(false);
                    try { rec.stop(); } catch(e) {}
                }
            };

            rec.onaudiostart = () => console.log('🎤 [Voice Input] 🟢 Audio hardware engaged (Microphone active).');
            rec.onsoundstart = () => console.log('🎤 [Voice Input] 🔊 Sound detected (noise or voice).');
            rec.onspeechstart = () => console.log('🎤 [Voice Input] 🗣️ Speech recognized! Listening to words...');
            rec.onspeechend = () => console.log('🎤 [Voice Input] 🤐 Speech stopped.');

            rec.onerror = (event) => {
                if (event.error === 'no-speech') {
                    console.log('🎤 [Voice Input] No speech detected. Waiting...');
                    return;
                }
                
                if (event.error !== 'aborted') {
                    console.error('Speech recognition error event:', event);
                }
                
                let errorMessage = null;
                switch(event.error) {
                    case 'network':
                        errorMessage = 'Network connection lost.';
                        break;
                    case 'not-allowed':
                    case 'service-not-allowed':
                        errorMessage = 'Microphone access denied. Please allow microphone permissions.';
                        isListeningRef.current = false;
                        setIsListening(false);
                        break;
                    case 'audio-capture':
                        errorMessage = 'No microphone found. Please check your hardware.';
                        isListeningRef.current = false;
                        setIsListening(false);
                        break;
                    case 'aborted':
                        return;
                    default:
                        errorMessage = `Error: ${event.error}`;
                }
                
                if (errorMessage) {
                    setError(errorMessage);
                    setTimeout(() => setError(null), 5000);
                }
            };

            rec.onend = () => {
                console.log('🎤 [Voice Input] Listening ended (Microphone turned off).');
                if (isListeningRef.current) {
                   isListeningRef.current = false;
                   setIsListening(false);
                }
            };

            setRecognition(rec);
        }
    }, []);

    const toggleListening = useCallback(() => {
        setError(null);
        if (!recognition) {
            setError('Speech recognition not supported in this browser.');
            setTimeout(() => setError(null), 5000);
            return;
        }

        if (isListeningRef.current) {
            isListeningRef.current = false;
            recognition.stop();
            setIsListening(false);
        } else {
            try {
                console.log('🎤 [Voice Input] Starting to listen...');
                isListeningRef.current = true;
                recognition.start();
                setIsListening(true);
            } catch (err) {
                console.error('Failed to start recognition:', err);
                isListeningRef.current = false;
                setIsListening(false);
            }
        }
    }, [recognition]);

    return { isListening, toggleListening, isSupported: !!recognition, error };
};
