import { useCallback, useEffect, useRef, useState } from 'react';
import { sendMessage, checkHealth } from '../services/api';
import { useSpeechRecognition, useSpeechSynthesis } from './useSpeech';
import type { JarvisState, Message } from '../types';

const GREETING =
  'Good evening. J.A.R.V.I.S. online. All systems operational. How may I assist you?';

function createMessage(role: Message['role'], content: string): Message {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: new Date(),
  };
}

export function useJarvis() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [state, setState] = useState<JarvisState>('idle');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const greetedRef = useRef(false);

  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported: speechSupported,
    startListening,
    stopListening,
    clearTranscript,
  } = useSpeechRecognition();

  const { isSpeaking, speak, stopSpeaking } = useSpeechSynthesis();

  useEffect(() => {
    checkHealth().then((health) => {
      setHasApiKey(health.hasApiKey);
      if (!health.hasApiKey) {
        setError('OpenAI API key not configured. Add OPENAI_API_KEY to .env file.');
      }
    });
  }, []);

  useEffect(() => {
    if (!greetedRef.current && hasApiKey) {
      greetedRef.current = true;
      const greeting = createMessage('assistant', GREETING);
      setMessages([greeting]);
      setState('speaking');
      speak(GREETING, () => setState('idle'));
    }
  }, [hasApiKey, speak]);

  useEffect(() => {
    if (isListening) setState('listening');
    else if (isSpeaking) setState('speaking');
  }, [isListening, isSpeaking]);

  const processUserMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || !hasApiKey) return;

      setError(null);
      const userMessage = createMessage('user', text.trim());
      setMessages((prev) => [...prev, userMessage]);
      setState('thinking');

      try {
        const history = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await sendMessage(history);
        const assistantMessage = createMessage('assistant', response.message);
        setMessages((prev) => [...prev, assistantMessage]);
        setState('speaking');
        speak(response.message, () => setState('idle'));
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        setError(msg);
        setState('idle');
      }
    },
    [hasApiKey, messages, speak],
  );

  useEffect(() => {
    if (transcript && !isListening) {
      processUserMessage(transcript);
      clearTranscript();
    }
  }, [transcript, isListening, processUserMessage, clearTranscript]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      stopSpeaking();
      startListening();
    }
  }, [isListening, startListening, stopListening, stopSpeaking]);

  const sendTextMessage = useCallback(
    (text: string) => {
      stopSpeaking();
      processUserMessage(text);
    },
    [processUserMessage, stopSpeaking],
  );

  return {
    messages,
    state,
    error,
    hasApiKey,
    speechSupported,
    isListening,
    interimTranscript,
    toggleListening,
    sendTextMessage,
    stopSpeaking,
  };
}
