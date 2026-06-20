import { useJarvis } from './hooks/useJarvis';
import { JarvisCore } from './components/JarvisCore';
import { ChatPanel } from './components/ChatPanel';
import { VoiceVisualizer } from './components/VoiceVisualizer';
import { StatusBar } from './components/StatusBar';
import { TextInput } from './components/TextInput';
import './App.css';

export default function App() {
  const {
    messages,
    state,
    error,
    hasApiKey,
    speechSupported,
    isListening,
    interimTranscript,
    toggleListening,
    sendTextMessage,
  } = useJarvis();

  const isBusy = state === 'thinking' || state === 'speaking';

  return (
    <div className="jarvis-app">
      <div className="jarvis-app__bg">
        <div className="jarvis-app__grid" />
        <div className="jarvis-app__glow jarvis-app__glow--1" />
        <div className="jarvis-app__glow jarvis-app__glow--2" />
      </div>

      <header className="jarvis-header">
        <div className="jarvis-header__logo">
          <span className="jarvis-header__bracket">[</span>
          J.A.R.V.I.S.
          <span className="jarvis-header__bracket">]</span>
        </div>
        <div className="jarvis-header__subtitle">
          Just A Rather Very Intelligent System
        </div>
      </header>

      <main className="jarvis-main">
        <aside className="jarvis-sidebar">
          <ChatPanel messages={messages} interimTranscript={interimTranscript} />
        </aside>

        <section className="jarvis-center">
          <VoiceVisualizer state={state} />
          <JarvisCore state={state} onClick={toggleListening} />
          <p className="jarvis-hint">
            {speechSupported
              ? isListening
                ? 'Tap the core or speak to send'
                : 'Tap the core to speak, or type below'
              : 'Voice not supported — use text input below'}
          </p>
          <TextInput onSend={sendTextMessage} disabled={isBusy || !hasApiKey} />
        </section>

        <aside className="jarvis-info">
          <div className="info-panel">
            <div className="info-panel__title">SYSTEM METRICS</div>
            <div className="info-panel__grid">
              <Metric label="CPU" value="12%" />
              <Metric label="MEMORY" value="34%" />
              <Metric label="NETWORK" value="ACTIVE" />
              <Metric label="UPTIME" value="99.9%" />
            </div>
          </div>
          <div className="info-panel">
            <div className="info-panel__title">CAPABILITIES</div>
            <ul className="info-panel__list">
              <li>Natural language conversation</li>
              <li>Voice recognition & synthesis</li>
              <li>Context-aware responses</li>
              <li>Real-time system monitoring</li>
            </ul>
          </div>
        </aside>
      </main>

      <StatusBar
        state={state}
        hasApiKey={hasApiKey}
        speechSupported={speechSupported}
        error={error}
      />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <div className="metric__label">{label}</div>
      <div className="metric__value">{value}</div>
    </div>
  );
}
