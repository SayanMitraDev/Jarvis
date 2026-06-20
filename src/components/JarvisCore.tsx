import type { JarvisState } from '../types';

interface JarvisCoreProps {
  state: JarvisState;
  onClick: () => void;
}

export function JarvisCore({ state, onClick }: JarvisCoreProps) {
  return (
    <button
      className={`jarvis-core jarvis-core--${state}`}
      onClick={onClick}
      aria-label={state === 'listening' ? 'Stop listening' : 'Start listening'}
    >
      <div className="jarvis-core__ring jarvis-core__ring--1" />
      <div className="jarvis-core__ring jarvis-core__ring--2" />
      <div className="jarvis-core__ring jarvis-core__ring--3" />
      <div className="jarvis-core__orb">
        <div className="jarvis-core__orb-inner" />
        <div className="jarvis-core__orb-glow" />
      </div>
      <div className="jarvis-core__label">
        {state === 'listening' && 'LISTENING'}
        {state === 'thinking' && 'PROCESSING'}
        {state === 'speaking' && 'SPEAKING'}
        {state === 'idle' && 'READY'}
      </div>
    </button>
  );
}
