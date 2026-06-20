import type { JarvisState } from '../types';

interface VoiceVisualizerProps {
  state: JarvisState;
}

const BAR_COUNT = 24;

export function VoiceVisualizer({ state }: VoiceVisualizerProps) {
  const isActive = state === 'listening' || state === 'speaking';

  return (
    <div className={`voice-viz ${isActive ? 'voice-viz--active' : ''}`}>
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <div
          key={i}
          className="voice-viz__bar"
          style={{
            animationDelay: `${(i * 0.05).toFixed(2)}s`,
            animationDuration: `${(0.4 + (i % 5) * 0.1).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}
