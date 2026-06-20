import type { Message } from '../types';

interface ChatPanelProps {
  messages: Message[];
  interimTranscript?: string;
}

export function ChatPanel({ messages, interimTranscript }: ChatPanelProps) {
  return (
    <div className="chat-panel">
      <div className="chat-panel__header">
        <span className="chat-panel__dot" />
        <span>CONVERSATION LOG</span>
      </div>
      <div className="chat-panel__messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message chat-message--${msg.role}`}>
            <div className="chat-message__role">
              {msg.role === 'user' ? 'YOU' : 'J.A.R.V.I.S.'}
            </div>
            <div className="chat-message__content">{msg.content}</div>
            <div className="chat-message__time">
              {msg.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        ))}
        {interimTranscript && (
          <div className="chat-message chat-message--user chat-message--interim">
            <div className="chat-message__role">YOU</div>
            <div className="chat-message__content">{interimTranscript}</div>
          </div>
        )}
      </div>
    </div>
  );
}
