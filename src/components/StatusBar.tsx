import type { JarvisState } from '../types';

interface StatusBarProps {
  state: JarvisState;
  hasApiKey: boolean;
  speechSupported: boolean;
  error: string | null;
}

export function StatusBar({
  state,
  hasApiKey,
  speechSupported,
  error,
}: StatusBarProps) {
  return (
    <div className="status-bar">
      <div className="status-bar__left">
        <span className="status-bar__item">
          <span className={`status-dot status-dot--${hasApiKey ? 'ok' : 'error'}`} />
          AI CORE {hasApiKey ? 'ONLINE' : 'OFFLINE'}
        </span>
        <span className="status-bar__item">
          <span
            className={`status-dot status-dot--${speechSupported ? 'ok' : 'warn'}`}
          />
          VOICE {speechSupported ? 'READY' : 'N/A'}
        </span>
        <span className="status-bar__item">
          <span className={`status-dot status-dot--${state !== 'idle' ? 'active' : 'ok'}`} />
          STATUS: {state.toUpperCase()}
        </span>
      </div>
      {error && <div className="status-bar__error">{error}</div>}
      <div className="status-bar__right">
        <span>SYS.TIME {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
